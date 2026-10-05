// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// ==========================================
// MINI GAME TV1: SAP XEP DO VAT
// Luat: 1 buc tranh + 4 do vat. Co 3 do vat dung ngu canh, 1 do vat lac cho.
// Be can chon DU 3 do vat dung. Moi lan chon dung, app doc ten do vat va danh dau da chon.
// Do vat sai KHONG DUOC CHON; neu bam nham thi rung + bip bip, van choi tiep.
// Khi chon du 3 do vat dung: phong sang, phao hoa, sang luot moi.
// ==========================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let sxlifeLifecycleToken_=0; const sxlifeLifecycleTimers_=new Set();
function sxlifeLater_(fn,ms){const token=sxlifeLifecycleToken_;const id=setTimeout(()=>{sxlifeLifecycleTimers_.delete(id);if(token!==sxlifeLifecycleToken_)return;fn();},ms);sxlifeLifecycleTimers_.add(id);return id;}
function sxlifeCancelTimers_(){sxlifeLifecycleToken_++;for(const id of sxlifeLifecycleTimers_)clearTimeout(id);sxlifeLifecycleTimers_.clear();}
let sxRound = 0;
let sxScore = 0;
let sxStreak = 0;
let sxBestStreak = 0;
let sxLocked = false;
let sxSelectedGood = new Set();
let sxCurrentGood = [];
let sxCurrentOdd = '';
let sxAudioCtx = null;
let sxSceneDeck = [];

const SX_SCENES = [
  {id:'bai_bien',label:'Bãi biển',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('bai_bien') : ''),emoji:'🖼️',good:['ô che nắng','xô cát','xẻng đồ chơi','cây dừa','mặt trời','bãi cát'],odd:['quả bóng biển','khăn tắm','ván lướt sóng','kính bơi']},
  {id:'ban_an',label:'Bàn ăn',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('ban_an') : ''),emoji:'🖼️',good:['bàn ăn','ghế','cái đĩa','cái cốc','trái cây','quả chuối'],odd:['ấm trà','khăn ăn','bát canh','lọ hoa']},
  {id:'ban_hoc',label:'Bàn học',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('ban_hoc') : ''),emoji:'🖼️',good:['bàn học','ghế','đèn học','quyển sách','bút chì','hộp bút'],odd:['cặp sách','thước kẻ','máy tính','quả địa cầu']},
  {id:'be_boi',label:'Bể bơi',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('be_boi') : ''),emoji:'🖼️',good:['bể bơi','phao vịt','phao tròn','ô che nắng','ghế nằm','mặt trời'],odd:['kính bơi','ván nhảy','quả bóng','thang bể bơi']},
  {id:'chuong_trai',label:'Chuồng trại',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('chuong_trai') : ''),emoji:'🖼️',good:['chuồng đỏ','tháp chứa thức ăn','đống rơm','con bò','con cừu','con gà'],odd:['con lợn','con ngựa','máy kéo','máng ăn']},
  {id:'cong_vien',label:'Công viên',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cong_vien') : ''),emoji:'🖼️',good:['ghế công viên','bồn hoa','lối đi','bãi cỏ','cây xanh','mặt trời'],odd:['xích đu','cầu trượt','đài phun nước','thùng rác']},
  {id:'cua_hang_tap_hoa',label:'Cửa hàng tạp hóa',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cua_hang_tap_hoa') : ''),emoji:'🖼️',good:['giá hàng','chai nước','quả táo','quả chuối','chùm nho','máy tính tiền'],odd:['ổ bánh mì','hộp trứng','quả dưa hấu','xe đẩy hàng']},
  {id:'gara_xe',label:'Ga-ra xe',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('gara_xe') : ''),emoji:'🖼️',good:['ô tô','lốp xe','cờ lê','tua vít','búa','bảng dụng cụ'],odd:['xe máy','mũ bảo hiểm','bơm xe','can xăng']},
  {id:'gia_sach',label:'Giá sách',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('gia_sach') : ''),emoji:'🖼️',good:['giá sách','quyển sách','gấu bông','tên lửa đồ chơi','vịt đồ chơi','khủng long đồ chơi'],odd:['búp bê','ô tô đồ chơi','quả bóng','máy bay đồ chơi']},
  {id:'giuong_ngu',label:'Giường ngủ',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('giuong_ngu') : ''),emoji:'🖼️',good:['giường ngủ','gối','chăn','ga giường','khung giường','ổ cắm điện'],odd:['đèn ngủ','tủ đầu giường','đồng hồ báo thức','tủ quần áo']},
  {id:'goc_do_choi',label:'Góc đồ chơi',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('goc_do_choi') : ''),emoji:'🖼️',good:['gấu bông','ô tô đồ chơi','khối xếp hình','xe tải đồ chơi','khủng long đồ chơi','hộp đồ chơi'],odd:['búp bê','máy bay đồ chơi','quả bóng','tàu hỏa đồ chơi']},
  {id:'lop_hoc',label:'Lớp học',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('lop_hoc') : ''),emoji:'🖼️',good:['bảng lớp','bàn học','ghế','cô giáo','quả địa cầu','quyển sách'],odd:['máy tính','máy chiếu','cặp sách','quạt trần']},
  {id:'nha_bep',label:'Nhà bếp',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('nha_bep') : ''),emoji:'🖼️',good:['bếp nấu','tủ lạnh','cái nồi','tủ bếp','cửa sổ','chậu cây'],odd:['chảo','ấm nước','bồn rửa bát','lò vi sóng']},
  {id:'nha_ga',label:'Nhà ga',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('nha_ga') : ''),emoji:'🖼️',good:['đoàn tàu','quầy vé','ghế băng','đồng hồ','đường ray','hành khách'],odd:['vali','loa thông báo','máy bán vé','cột biển sân ga']},
  {id:'nha_tam',label:'Nhà tắm',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('nha_tam') : ''),emoji:'🖼️',good:['bồn tắm','bồn rửa mặt','gương','khăn tắm','ghế nhỏ','vịt đồ chơi'],odd:['vòi sen','bàn chải đánh răng','xà phòng','bồn cầu']},
  {id:'phong_am_nhac',label:'Phòng âm nhạc',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_am_nhac') : ''),emoji:'🖼️',good:['đàn piano','đàn ghi-ta','bộ trống','giá nhạc','chú mèo','ghế lười'],odd:['đàn vĩ cầm','sáo','kèn trumpet','micro']},
  {id:'phong_khach',label:'Phòng khách',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_khach') : ''),emoji:'🖼️',good:['ghế sofa','bàn trà','quyển sách','quả địa cầu','gấu bông','khối xếp hình'],odd:['tivi','quạt điện','đèn bàn','lọ hoa']},
  {id:'phong_my_thuat',label:'Phòng mỹ thuật',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_my_thuat') : ''),emoji:'🖼️',good:['giá vẽ','bức tranh','cọ vẽ','bảng pha màu','ghế đẩu','xô đựng màu'],odd:['kéo','hồ dán','đất nặn','giấy màu']},
  {id:'phong_ngu',label:'Phòng ngủ',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_ngu') : ''),emoji:'🖼️',good:['giường ngủ','gối','chăn','đèn ngủ','rèm cửa','gấu bông'],odd:['tủ quần áo','đồng hồ báo thức','bàn học','quạt điện']},
  {id:'phong_the_duc',label:'Phòng thể dục',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_the_duc') : ''),emoji:'🖼️',good:['thảm tập','quả bóng rổ','dây nhảy','thang thể dục','cửa sổ','hình ngôi sao'],odd:['vợt cầu lông','quả bóng đá','cọc tiêu','vòng thể dục']},
  {id:'phong_y_te',label:'Phòng y tế',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('phong_y_te') : ''),emoji:'🖼️',good:['giường bệnh','gối','tủ thuốc','ghế đẩu','cây xanh','thước đo chiều cao'],odd:['ống nghe','nhiệt kế','băng cá nhân','xe lăn']},
  {id:'san_choi',label:'Sân chơi',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('san_choi') : ''),emoji:'🖼️',good:['cầu trượt','xích đu','bập bênh','hộp cát','xẻng đồ chơi','cây xanh'],odd:['cầu leo','đu quay','quả bóng','xe chòi chân']},
  {id:'san_truong',label:'Sân trường',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('san_truong') : ''),emoji:'🖼️',good:['trường học','cột cờ','cầu trượt','cây xanh','bãi cỏ','đồng hồ'],odd:['bập bênh','sân bóng rổ','ghế đá','xe đạp']},
  {id:'san_van_dong',label:'Sân vận động',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('san_van_dong') : ''),emoji:'🖼️',good:['quả bóng','khung thành','bảng tỉ số','ghế dự bị','sân cỏ','lá cờ'],odd:['còi trọng tài','cúp','áo cầu thủ','bóng rổ']},
  {id:'sieu_thi',label:'Siêu thị',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('sieu_thi') : ''),emoji:'🖼️',good:['quả táo','quả chuối','chùm nho','quả cam','giỏ hàng','xe đẩy'],odd:['quả dưa hấu','hộp sữa','ổ bánh mì','chai dầu ăn']},
  {id:'thu_vien',label:'Thư viện',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('thu_vien') : ''),emoji:'🖼️',good:['giá sách','quyển sách','bàn đọc sách','ghế đẩu','đệm ngồi','cửa sổ'],odd:['máy tính','đèn bàn','quả địa cầu','máy in']},
  {id:'tiem_banh',label:'Tiệm bánh',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('tiem_banh') : ''),emoji:'🖼️',good:['quầy bánh','bánh kem','bánh cupcake','máy tính tiền','ghế','chú gấu'],odd:['ổ bánh mì','bánh donut','khay bánh','tủ lạnh']},
  {id:'tram_xe_buyt',label:'Trạm xe buýt',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('tram_xe_buyt') : ''),emoji:'🖼️',good:['xe buýt','trạm chờ','ghế băng','biển chỉ đường','cây xanh','chú thỏ'],odd:['thùng rác','bảng giờ xe','xe đạp','đèn đường']},
  {id:'tu_quan_ao',label:'Tủ quần áo',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('tu_quan_ao') : ''),emoji:'🖼️',good:['tủ quần áo','áo','váy','quần yếm','áo khoác','quần áo gấp'],odd:['mũ','giày','khăn quàng','tất']},
  {id:'vuon_nha',label:'Vườn nhà',image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('vuon_nha') : ''),emoji:'🖼️',good:['ngôi nhà','hàng rào','cây xanh','hoa tulip','hoa cúc','hoa hướng dương'],odd:['bình tưới cây','xẻng làm vườn','ghế đá','xích đu']},
];

const SX_ITEM_EMOJI = {
  'ghế sofa':'🛋️','tivi':'📺','bàn trà':'🪵','đèn bàn':'💡','quạt điện':'🌀','lọ hoa':'💐',
  'bàn chải đánh răng':'🪥','nồi cơm điện':'🍚','gối ngủ':'🛏️','vòi sen':'🚿','giường ngủ':'🛏️','gối':'🛏️','chăn':'🧣','tủ quần áo':'👚','đèn ngủ':'💡','đồng hồ báo thức':'⏰',
  'chảo':'🍳','bồn rửa bát':'🚰','tivi phòng khách':'📺','nồi':'🍲','tủ lạnh':'🧊','bếp':'🔥','ấm nước':'🫖','bát đĩa':'🍽️','cặp sách':'🎒',
  'khăn tắm':'🧻','xà phòng':'🧼','chậu rửa':'🚰','gương':'🪞','quyển vở':'📒','quyển sách':'📚','truyện tranh':'📖','từ điển':'📕','hộp bút':'🖍️','sổ tay':'📓','đèn đọc sách':'💡',
  'dép đi mưa':'🩴','áo':'👕','quần':'👖','váy':'👗','mũ':'🧢','khăn':'🧣','tất':'🧦','bát':'🥣','ga giường':'🛏️','gấu bông':'🧸','màn':'🦟','bát ăn cơm':'🥣','bàn học':'🪑','xẻng':'🛠️',
  'đĩa':'🍽️','thìa':'🥄','đũa':'🥢','cốc nước':'🥛','khăn ăn':'🧻','bút chì':'✏️','thước kẻ':'📏','cục tẩy':'🧽','đèn học':'💡',
  'bảng':'🟩','ghế':'🪑','sách':'📚','bút':'🖊️','thước':'📏','bồn tắm':'🛁','cầu trượt':'🛝','xích đu':'🎠','quả bóng':'⚽','bập bênh':'🎢','dây nhảy':'➰','xe chòi chân':'🛴',
  'cây xanh':'🌳','chậu hoa':'🪴','bình tưới':'🚿','xẻng nhỏ':'🛠️','ghế đá':'🪑','hàng rào':'🚧','tivi':'📺',

  'bàn đọc sách':'📖',
  'cột cờ':'🚩',
  'ghế đá':'🪑',
  'quả bóng':'⚽',
  'búp bê':'🧸',
  'ô tô đồ chơi':'🚗',
  'khối xếp hình':'🧱',
  'chai nước':'🧴',
  'gói bánh':'🍪',
  'hộp sữa':'🥛',
  'giường bệnh':'🛏️',
  'hộp thuốc':'💊',
  'ống nghe':'🩺',
  'ô tô':'🚗',
  'xe máy':'🏍️',
  'mũ bảo hiểm':'⛑️',
  'con gà':'🐔',
  'con bò':'🐄',
  'con lợn':'🐷',
  'con cá':'🐟',
  'thùng rác':'🗑️',

  'giá sách':'📚','ghế ngồi':'🪑','đệm ngồi':'🟣','cửa sổ':'🪟','máy tính':'💻','quả địa cầu':'🌍',
  'trường học':'🏫','bãi cỏ':'🌱','cây xanh':'🌳','xe đạp':'🚲',
  'xe tải đồ chơi':'🚚','khủng long đồ chơi':'🦖','hộp đồ chơi':'🧺','máy bay đồ chơi':'✈️',
  'quả táo':'🍎','quả chuối':'🍌','chùm nho':'🍇','ổ bánh mì':'🥖','quả trứng':'🥚','quả dưa hấu':'🍉',
  'gối trắng':'🛏️','ghế đẩu':'🪑','bàn nhỏ':'🪑','chậu cây':'🪴','nhiệt kế':'🌡️','băng gạc':'🩹',
  'cờ lê':'🔧','bánh xe':'🛞','tủ dụng cụ':'🧰','mũ bảo hiểm':'⛑️','bơm xe đạp':'🚲',
  'con cừu':'🐑','đống rơm':'🌾','chuồng đỏ':'🏠','hàng rào':'🚧',
  'bãi cỏ':'🌱','lối đi':'🛤️','mặt trời':'☀️',
};


Object.assign(SX_ITEM_EMOJI, {
  'bàn ăn':'🍽️','trái cây':'🍎','khung giường':'🛏️','ổ cắm điện':'🔌','áo khoác':'🧥','ngăn kéo':'🗄️','tủ gỗ':'🗄️',
  'tên lửa đồ chơi':'🚀','vịt đồ chơi':'🦆','cái quạt':'🪭','chú gấu':'🧸','tấm thẻ':'🃏','bong bóng thoại':'💬','cặp sách':'🎒','chữ cái':'🔤','bút màu':'🖍️',
  'trang sách':'📄','bìa sách':'📕','hình vẽ':'🖼️','ghế sofa':'🛋️','bàn trà':'🪵','quả địa cầu':'🌍','đàn piano':'🎹','đàn ghi-ta':'🎸','trống':'🥁','giá nhạc':'🎼','chú mèo':'🐱','ghế lười':'🪑',
  'giá vẽ':'🎨','bức tranh':'🖼️','cọ vẽ':'🖌️','hộp màu':'🎨','xô đựng màu':'🪣','thảm tập':'🤸','quả bóng rổ':'🏀','thang thể dục':'🪜','hình ngôi sao':'⭐',
  'tủ thuốc':'🩹','thước đo chiều cao':'📏','bếp nấu':'🍳','tủ bếp':'🗄️','bồn rửa mặt':'🚰','ghế nhỏ':'🪑','giá hàng':'🛒','máy tính tiền':'🧾','chùm nho':'🍇','giỏ hàng':'🧺','xe đẩy':'🛒',
  'quầy bánh':'🧁','bánh kem':'🎂','bánh cupcake':'🧁','xe buýt':'🚌','trạm chờ':'🚏','ghế băng':'🪑','biển chỉ đường':'🪧','đoàn tàu':'🚂','quầy vé':'🎫','đường ray':'🛤️','hành khách':'🧍',
  'khung thành':'🥅','bảng tỉ số':'🔢','ghế dự bị':'🪑','sân cỏ':'🌱','lá cờ':'🚩','cô giáo':'👩‍🏫','bể bơi':'🏊','phao vịt':'🦆','ô che nắng':'☂️','ghế nằm':'🪑','phao tròn':'⭕','bảng dụng cụ':'🧰','cửa ga-ra':'🚪','hộp cát':'🏖️'
});

function sxShuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function sxEnsureStyles(){
  if(document.getElementById('sx-game-styles')) return;
  const style=document.createElement('style');
  style.id='sx-game-styles';
  style.textContent=`
    @keyframes sxCloud{0%{transform:translateX(-18vw)}100%{transform:translateX(110vw)}}
    @keyframes sxBird{0%{transform:translateX(-12vw) translateY(0)}50%{transform:translateX(50vw) translateY(-12px)}100%{transform:translateX(112vw) translateY(4px)}}
    @keyframes sxLeaf{0%{transform:translateY(-50px) rotate(0);opacity:0}10%{opacity:.75}100%{transform:translateY(540px) rotate(420deg);opacity:0}}
    @keyframes sxPop{0%{transform:scale(.78);opacity:0}70%{transform:scale(1.05);opacity:1}100%{transform:scale(1);opacity:1}}
    @keyframes sxWrong{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
    @keyframes sxLiftGood{0%{transform:translateY(0) scale(1)}55%{transform:translateY(-12px) scale(1.08)}100%{transform:translateY(0) scale(1)}}
    @keyframes sxGlow{0%{box-shadow:0 0 0 rgba(34,197,94,0)}50%{box-shadow:0 0 38px rgba(34,197,94,.45)}100%{box-shadow:0 0 0 rgba(34,197,94,0)}}
    @keyframes sxCombo{0%{transform:translate(-50%,-20%) scale(.5);opacity:0}40%{transform:translate(-50%,-55%) scale(1.2);opacity:1}100%{transform:translate(-50%,-95%) scale(.9);opacity:0}}
    .sx-stage{position:relative;overflow:hidden;background:linear-gradient(180deg,#eff6ff 0%,#fdf2f8 52%,#ecfdf5 100%)}
    .sx-scene-card{position:relative;background:transparent;border:0;border-radius:0;overflow:hidden;box-shadow:none;animation:sxPop .45s ease-out}
    .sx-scene-card.sx-correct{animation:sxGlow .85s ease-out}
    .sx-round-layout{display:grid;grid-template-columns:400px minmax(0,1fr);gap:12px;align-items:stretch}
    .sx-scene-img{display:block;width:100%;aspect-ratio:1/1;height:auto;object-fit:cover;background:transparent}
    .sx-scene-fallback{width:100%;aspect-ratio:1/1;height:auto;display:flex;align-items:center;justify-content:center;font-size:128px;background:linear-gradient(180deg,#fef3c7,#dbeafe)}
    .sx-options-column{display:grid;grid-template-columns:1fr;gap:10px;align-content:center}
    .sx-option{transition:transform .14s,box-shadow .14s,background .14s;min-height:66px;user-select:none;touch-action:manipulation}
    .sx-option:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 22px rgba(15,23,42,.12)}
    .sx-wrong{animation:sxWrong .32s linear;background:#fee2e2!important;border-color:#fb7185!important;color:#be123c!important}
    .sx-good-picked{animation:sxLiftGood .45s ease-out!important;background:#dcfce7!important;border-color:#22c55e!important;color:#15803d!important;box-shadow:0 0 0 3px rgba(34,197,94,.12),0 10px 22px rgba(34,197,94,.18)!important}
    .sx-cloud,.sx-bird,.sx-leaf{position:absolute;pointer-events:none;z-index:1}
    .sx-cloud{font-size:42px;opacity:.42;animation:sxCloud 18s linear infinite}
    .sx-bird{font-size:30px;opacity:.7;animation:sxBird 11s linear infinite}
    .sx-leaf{top:-45px;font-size:22px;opacity:.7;animation:sxLeaf 8s linear infinite}
    .sx-combo{position:absolute;left:50%;top:44%;z-index:30;font-size:30px;font-weight:1000;color:#f43f5e;text-shadow:0 3px 0 #fff;animation:sxCombo 1s ease-out forwards;pointer-events:none}
    @media(max-width:900px){.sx-round-layout{grid-template-columns:340px minmax(0,1fr);gap:10px}.sx-scene-img,.sx-scene-fallback{height:auto}.sx-option{min-height:58px}.sx-stage{padding:8px!important}}
    @media(max-width:700px){.sx-round-layout{grid-template-columns:1fr}.sx-scene-img,.sx-scene-fallback{height:auto}.sx-options-column{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.sx-option{min-height:50px}}
  `;
  document.head.appendChild(style);
}

function sxAudio(){
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!sxAudioCtx&&AC) sxAudioCtx=new AC();
  if(sxAudioCtx&&sxAudioCtx.state==='suspended') sxAudioCtx.resume();
  return sxAudioCtx;
}
function sxTone(freq,dur=.12,type='sine',gain=.055,delay=0){
  const c=sxAudio(); if(!c) return;
  const o=c.createOscillator(), g=c.createGain();
  o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(c.destination);
  const t=c.currentTime+delay;o.start(t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.stop(t+dur);
}
function sxCorrectSound(){ sxTone(660,.12,'sine',.06,0); sxTone(880,.14,'sine',.055,.11); sxTone(1100,.18,'triangle',.05,.22); }
function sxWrongSound(){ sxTone(180,.09,'square',.045,0); sxTone(150,.09,'square',.04,.12); }

function sxBuildSceneDeck(){
  const validScenes = SX_SCENES.filter(scene =>
    scene &&
    Array.isArray(scene.good) && scene.good.length >= 3 &&
    Array.isArray(scene.odd) && scene.odd.length >= 1
  );
  if(!validScenes.length) throw new Error('Không có dữ liệu cảnh hợp lệ cho game Sắp xếp đồ vật.');
  sxSceneDeck = sxShuffle(validScenes);
}
function sxPickRound(){
  if(!sxSceneDeck.length) sxBuildSceneDeck();
  const scene=sxSceneDeck.shift();
  const good=sxShuffle(scene.good).slice(0,3);
  const odd=scene.odd[Math.floor(Math.random()*scene.odd.length)];
  return {scene,options:sxShuffle([...good,odd]),odd};
}

function startObjectSortingGame(){sxlifeCancelTimers_();
  sxEnsureStyles();
  sxRound=0;sxScore=0;sxStreak=0;sxBestStreak=0;sxLocked=false;sxSelectedGood=new Set();sxCurrentGood=[];sxCurrentOdd='';sxSceneDeck=[];
  const box=document.getElementById('game-play-container'); if(!box) return;
  box.innerHTML=`
    <div class="sx-stage rounded-[28px] border-2 border-pink-100 p-2.5 md:p-3 min-h-[430px]">
      <div class="sx-cloud" style="top:18px;left:-70px;animation-delay:-5s">☁️</div>
      <div class="sx-cloud" style="top:70px;left:-120px;animation-delay:-11s;font-size:30px">☁️</div>
      <div class="sx-bird" style="top:58px;left:-70px;animation-delay:-3s">🕊️</div>
      <div class="sx-leaf" style="left:12%;animation-delay:-2s">🍂</div><div class="sx-leaf" style="left:74%;animation-delay:-5s">🍁</div>
      <div class="relative z-10">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="text-sm md:text-base font-black text-purple-700">🧺 Chọn 3 đồ vật đúng với bức tranh!</div>
          <div class="flex gap-2 text-xs md:text-sm font-black">
            <span class="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">⭐ <span id="sx-score">0</span></span>
            <span class="px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">🔥 x<span id="sx-streak">0</span></span>
            <span class="px-3 py-1.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">🏆 <span id="sx-best">0</span></span>
          </div>
        </div>
        <div id="sx-round-area"></div>
      </div>
    </div>`;
  sxNextRound();
}

function sxNextRound(){
  sxLocked=false;sxRound++;sxSelectedGood=new Set();
  const data=sxPickRound();
  sxCurrentGood=data.options.filter(x=>x!==data.odd);
  sxCurrentOdd=data.odd;
  const area=document.getElementById('sx-round-area'); if(!area) return;
  area.dataset.odd=data.odd;
  area.innerHTML=`
    <div class="sx-round-layout">
      <div id="sx-scene-card" class="sx-scene-card">
        <img class="sx-scene-img" src="${data.scene.image}" alt="${data.scene.label}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="sx-scene-fallback" style="display:none">${data.scene.emoji}</div>
        <div class="absolute left-3 bottom-3 px-4 py-2 rounded-full bg-white/95 border border-pink-200 text-pink-700 font-black text-base md:text-lg shadow-sm">${data.scene.label}</div>
      </div>
      <div class="sx-options-column">
        ${data.options.map((word,idx)=>{
          const pastel=[
            'bg-pink-50/80 border-pink-200 hover:bg-pink-100',
            'bg-sky-50/80 border-sky-200 hover:bg-sky-100',
            'bg-amber-50/80 border-amber-200 hover:bg-amber-100',
            'bg-emerald-50/80 border-emerald-200 hover:bg-emerald-100'
          ][idx%4];
          return `<button class="sx-option px-3 py-2 md:px-4 md:py-2.5 rounded-2xl border-2 ${pastel} text-slate-700 font-black text-sm md:text-base flex items-center justify-center gap-2.5 shadow-sm" onclick="sxChooseObject(this,'${word.replace(/'/g,"\'")}')"><span class="text-2xl md:text-3xl shrink-0">${SX_ITEM_EMOJI[word]||'📦'}</span><span class="leading-tight">${word}</span></button>`;
        }).join('')}
      </div>
    </div>`;

  // Đọc câu hướng dẫn theo đúng bối cảnh của từng bức tranh.
  if(typeof speakVietnamese==='function'){
    try{ speakVietnamese(`Bé hãy sắp xếp đồ vật cho ${data.scene.label} nhé!`,0.96); }catch(e){}
  }
}

function sxChooseObject(btn,word){
  if(sxLocked) return;
  if(sxSelectedGood.has(word)) return;

  const isGood=sxCurrentGood.includes(word);
  if(!isGood){
    sxStreak=0; sxUpdateHud(); sxWrongSound();
    btn.classList.remove('sx-wrong'); void btn.offsetWidth; btn.classList.add('sx-wrong');
    sxlifeLater_(()=>btn.classList.remove('sx-wrong'),450);
    return;
  }

  sxSelectedGood.add(word);
  sxScore+=10;
  btn.classList.add('sx-good-picked');
  btn.disabled=true;
  btn.innerHTML += '<span class="text-emerald-600 text-xs font-black">✓ Đúng</span>';
  sxCorrectSound();

  // Doc ro ten do vat vua duoc chon.
  if(typeof speakVietnamese==='function'){
    try{ speakVietnamese(word,0.96); }catch(e){}
  }

  const picked=sxSelectedGood.size;

  if(picked<3){
    if(typeof confetti==='function') confetti({particleCount:18,spread:42,origin:{y:.78}});
    return;
  }

  sxLocked=true;
  sxStreak++;
  sxBestStreak=Math.max(sxBestStreak,sxStreak);
  sxScore+=20;
  sxUpdateHud();
  document.getElementById('sx-scene-card')?.classList.add('sx-correct');
  const stage=document.querySelector('.sx-stage');
  if(stage){
    const combo=document.createElement('div');
    combo.className='sx-combo';
    combo.textContent=sxStreak>=2?`🔥 Combo x${sxStreak}!`:'✨ Đủ 3 đồ vật!';
    stage.appendChild(combo);
    sxlifeLater_(()=>combo.remove(),1050);
  }
  if(typeof confetti==='function') confetti({particleCount:sxStreak>=5?100:62,spread:74,origin:{y:.62}});
  sxTone(1320,.2,'triangle',.05,.32);
  sxlifeLater_(sxNextRound,1100);
}
function sxUpdateHud(){
  const s=document.getElementById('sx-score'),st=document.getElementById('sx-streak'),b=document.getElementById('sx-best');
  if(s)s.textContent=sxScore;if(st)st.textContent=sxStreak;if(b)b.textContent=sxBestStreak;
}

window.startObjectSortingGame=startObjectSortingGame;
window.sxChooseObject=sxChooseObject;

function stopObjectSortingGame(){sxlifeCancelTimers_(); try{ sxLocked=true; }catch(_){} try{ if(typeof stopSpeaking==='function') stopSpeaking(); }catch(_){} }
window.stopObjectSortingGame=stopObjectSortingGame;
