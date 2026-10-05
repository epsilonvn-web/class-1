// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// ==========================================
// MINI GAME TV1: NUOI THU CUNG
// Nhin con vat, chon dung mon an yeu thich trong 4 dap an.
// Dung: mon an bay den thu cung, tim bay, am thanh + phao hoa, sang luot moi.
// Sai: nut rung + bip bip, van tiep tuc chon.
// ==========================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let petlifeLifecycleToken_=0; const petlifeLifecycleTimers_=new Set();
function petlifeLater_(fn,ms){const token=petlifeLifecycleToken_;const id=setTimeout(()=>{petlifeLifecycleTimers_.delete(id);if(token!==petlifeLifecycleToken_)return;fn();},ms);petlifeLifecycleTimers_.add(id);return id;}
function petlifeCancelTimers_(){petlifeLifecycleToken_++;for(const id of petlifeLifecycleTimers_)clearTimeout(id);petlifeLifecycleTimers_.clear();}
let petRound = 0;
let petScore = 0;
let petStreak = 0;
let petBestStreak = 0;
let petState = 'idle';
let petTarget = null;
let petAudioCtx = null;
let petRoundToken = 0;
let petSceneDeck = [];

const PET_FOOD_POOL = [
  { word: 'xương', emoji: '🦴' }, { word: 'cá', emoji: '🐟' }, { word: 'cà rốt', emoji: '🥕' },
  { word: 'thóc', emoji: '🌾' }, { word: 'cỏ', emoji: '🌿' }, { word: 'mật hoa', emoji: '🌼' },
  { word: 'rong', emoji: '🌱' }, { word: 'chuối', emoji: '🍌' }, { word: 'hạt', emoji: '🌰' },
  { word: 'tôm', emoji: '🦐' }, { word: 'rau', emoji: '🥬' }, { word: 'ngô', emoji: '🌽' },
  { word: 'thịt', emoji: '🍖' }, { word: 'sữa', emoji: '🥛' }, { word: 'táo', emoji: '🍎' },
  { word: 'bắp cải', emoji: '🥬' }, { word: 'gạo', emoji: '🍚' }, { word: 'bánh mì', emoji: '🍞' },
  { word: 'đậu', emoji: '🫘' }, { word: 'trái cây', emoji: '🍊' }, { word: 'tre', emoji: '🎋' },
  { word: 'lá cây', emoji: '🍃' }, { word: 'côn trùng', emoji: '🐛' }, { word: 'rệp cây', emoji: '🪲' },
  { word: 'đường', emoji: '🍬' }, { word: 'lá mục', emoji: '🍂' }, { word: 'nhựa cây', emoji: '🌳' },
  { word: 'hải sản', emoji: '🦐' }, { word: 'cá nhỏ', emoji: '🐟' }, { word: 'tảo', emoji: '🌿' },
  { word: 'sinh vật phù du', emoji: '🫧' }, { word: 'mật ong', emoji: '🍯' }
];

// Mỗi con vật có một nhóm phương án nhiễu riêng.
// Tất cả phương án đều là thức ăn/thực phẩm để bé phải phân biệt thật sự,
// không dùng đồ vật hoặc hành động làm đáp án loại trừ quá dễ.
const PET_DISTRACTOR_MAP = {
  'chó': ['thịt', 'cá', 'sữa', 'bánh mì', 'cơm'],
  'mèo': ['thịt', 'sữa', 'tôm', 'bánh mì', 'trứng'],
  'thỏ': ['bắp cải', 'rau', 'táo', 'cỏ', 'ngô'],
  'gà': ['ngô', 'gạo', 'hạt', 'rau', 'đậu'],
  'trâu': ['rau', 'ngô', 'cà rốt', 'thóc', 'bắp cải'],
  'ong': ['trái cây', 'đường', 'mật ong', 'nước ngọt', 'hạt'],
  'bướm': ['trái cây', 'đường', 'mật ong', 'nước ngọt', 'rau'],
  'cá': ['tôm', 'hạt', 'rau', 'thóc', 'rong biển'],
  'vịt': ['cá', 'thóc', 'ngô', 'rong', 'hạt'],
  'khỉ': ['táo', 'trái cây', 'ngô', 'hạt', 'cà rốt'],
  'sóc': ['ngô', 'đậu', 'trái cây', 'táo', 'bánh mì'],
  'bò': ['rau', 'ngô', 'thóc', 'cà rốt', 'bắp cải'],
  'dê': ['cỏ', 'rau', 'bắp cải', 'cà rốt', 'ngô'],
  'ngựa': ['cà rốt', 'ngô', 'rau', 'thóc', 'táo'],
  'gấu trúc': ['cà rốt', 'rau', 'táo', 'cỏ', 'trái cây'],
  'chim': ['hạt', 'ngô', 'thóc', 'trái cây', 'sâu'],
  'voi': ['trái cây', 'chuối', 'ngô', 'cà rốt', 'rau'],
  'lợn': ['gạo', 'rau', 'đậu', 'cà rốt', 'trái cây']
};


Object.assign(PET_DISTRACTOR_MAP, {
  'rùa':['cá','hạt','cỏ','tôm','trái cây'], 'chim yến phụng':['thóc','ngô','trái cây','sâu','rau'], 'chuột hamster':['ngô','thóc','trái cây','rau','bánh mì'],
  'ngỗng':['thóc','ngô','hạt','rau','cá'], 'gà tây':['ngô','gạo','hạt','rau','đậu'], 'cừu':['rau','ngô','cà rốt','thóc','bắp cải'],
  'lừa':['cà rốt','ngô','rau','thóc','táo'], 'chim công':['ngô','thóc','trái cây','sâu','rau'], 'chim cánh cụt':['tôm','hải sản','thịt','sinh vật phù du','rong'],
  'gấu Bắc Cực':['thịt','hải sản','tôm','trái cây','rong'], 'hươu cao cổ':['cỏ','trái cây','cà rốt','rau','tre'], 'sư tử':['cá','xương','tôm','trái cây','hạt'],
  'ngựa vằn':['cà rốt','ngô','rau','thóc','táo'], 'tê giác':['rau','ngô','cà rốt','thóc','bắp cải'], 'hà mã':['rau','ngô','cà rốt','thóc','trái cây'],
  'nhím':['trái cây','hạt','rau','cà rốt','thóc']
});
const PET_EXTRA_FOOD = {
  'cơm': '🍚', 'trứng': '🥚', 'đường': '🍬', 'mật ong': '🍯',
  'nước ngọt': '🥤', 'rong biển': '🌿'
};

// Ngân hàng đúng 30 tranh đã được đối chiếu trực tiếp từ ảnh nguồn. Mỗi tranh có thể sinh nhiều câu hỏi,
// mỗi câu vẫn giữ NGUYÊN luật chơi: chọn món ăn phù hợp cho con vật được hỏi.
// Vì vậy một tranh có 4-5 con vật có thể được dùng lại 4-5 lần với các con vật khác nhau.
const PET_SCENES = [
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('gia_suc_nong_trai_1') : ''), scene:'Gia súc nông trại', animals:[['bò','cỏ','🐄'],['trâu','cỏ','🐃'],['lợn','ngô','🐷'],['cừu','cỏ','🐑'],['dê','cỏ','🐐'],['ngựa','cỏ','🐴']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('gia_suc_nong_trai_2') : ''), scene:'Vật nuôi nông trại', animals:[['lừa','cỏ','🫏'],['thỏ','cà rốt','🐰'],['vịt','thóc','🦆'],['gà','thóc','🐔'],['ngỗng','cỏ','🪿']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('thu_cung_trong_nha_1') : ''), scene:'Thú cưng trong nhà', animals:[['chó','xương','🐶'],['mèo','cá','🐱'],['chim yến phụng','hạt','🐦'],['chuột hamster','hạt','🐹'],['rùa','rau','🐢']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('thu_cung_trong_nha_2') : ''), scene:'Thú cưng trong nhà', animals:[['mèo','cá','🐱'],['chó','xương','🐶'],['thỏ','cà rốt','🐰'],['cá vàng','rong','🐟'],['nhím','côn trùng','🦔']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('hoang_da_dong_co_1') : ''), scene:'Động vật đồng cỏ', animals:[['sư tử','thịt','🦁'],['hươu cao cổ','lá cây','🦒'],['ngựa vằn','cỏ','🦓'],['voi','trái cây','🐘'],['tê giác','cỏ','🦏']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('hoang_da_dong_co_2') : ''), scene:'Động vật đồng cỏ', animals:[['linh dương','cỏ','🦌'],['đà điểu','hạt','🐦'],['hà mã','cỏ','🦛'],['linh cẩu','thịt','🐕'],['thỏ rừng','cỏ','🐇']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('hoang_da_rung_xanh_1') : ''), scene:'Động vật rừng xanh', animals:[['hổ','thịt','🐯'],['báo hoa mai','thịt','🐆'],['khỉ','trái cây','🐒'],['gấu','mật ong','🐻'],['sóc','hạt','🐿️']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('hoang_da_rung_xanh_2') : ''), scene:'Động vật rừng xanh', animals:[['cáo đỏ','thịt','🦊'],['nai','cỏ','🦌'],['gấu trúc','tre','🐼'],['gấu mèo','trái cây','🦝'],['nhím','côn trùng','🦔']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('dong_vat_rung_nhiet_doi') : ''), scene:'Rừng mưa nhiệt đới', animals:[['tắc kè hoa','côn trùng','🦎'],['con lười','lá cây','🦥'],['chim toucan','trái cây','🐦'],['ếch cây','côn trùng','🐸'],['báo đốm','thịt','🐆']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('dong_vat_vung_cuc') : ''), scene:'Động vật vùng cực', animals:[['cáo Bắc Cực','thịt','🦊'],['thỏ Bắc Cực','cỏ','🐇'],['cú tuyết','thịt','🦉'],['gấu Bắc Cực','cá','🐻‍❄️'],['tuần lộc','cỏ','🦌']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('dai_duong_san_ho_1') : ''), scene:'Rạn san hô', animals:[['cá heo','cá','🐬'],['rùa biển','rong','🐢'],['cá hề','sinh vật phù du','🐠'],['sao biển','hải sản','⭐'],['bạch tuộc','tôm','🐙']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('dai_duong_san_ho_2') : ''), scene:'Rạn san hô', animals:[['cá mập','cá','🦈'],['cá đuối','hải sản','🐟'],['cua biển','tảo','🦀'],['tôm hùm','cá nhỏ','🦞'],['cá ngừ','cá nhỏ','🐟']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('dai_duong_day_bien') : ''), scene:'Đáy biển', animals:[['mực','cá nhỏ','🦑'],['sứa biển','sinh vật phù du','🪼'],['cá ngựa','sinh vật phù du','🐠'],['ốc biển','tảo','🐌'],['cá voi','sinh vật phù du','🐋']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('sinh_vat_bien_xinh_dep') : ''), scene:'Bạn bè biển cả', animals:[['cá thần tiên','sinh vật phù du','🐠'],['cá nóc','hải sản','🐡'],['sò biển','sinh vật phù du','🐚'],['hải sâm','tảo','🌊'],['cá bống','tôm','🐟']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('dai_duong_cuc_nam') : ''), scene:'Bạn bè vùng cực', animals:[['chim cánh cụt','cá','🐧'],['hải cẩu','cá','🦭'],['cá voi sát thủ','cá','🐋'],['gấu Bắc Cực','cá','🐻‍❄️'],['hải mã','hải sản','🦭']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cac_loai_chim_khu_vuon') : ''), scene:'Chim khu vườn', animals:[['chim sẻ','hạt','🐦'],['chim bồ câu','hạt','🕊️'],['chim họa mi','côn trùng','🐦'],['chim gõ kiến','côn trùng','🐦'],['chim hút mật','mật hoa','🐦']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cac_loai_chim_nhiet_doi') : ''), scene:'Chim nhiệt đới', animals:[['chim vẹt','trái cây','🦜'],['chim hồng hạc','tôm','🦩'],['chim toucan','trái cây','🐦'],['chim công','hạt','🦚'],['chim bói cá','cá','🐦']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cac_loai_chim_san_moi') : ''), scene:'Chim săn mồi', animals:[['đại bàng','thịt','🦅'],['chim cú mèo','thịt','🦉'],['chim diều hâu','thịt','🦅'],['chim cò','cá','🪶'],['chim ưng','thịt','🦅']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('gia_cam_nong_trai') : ''), scene:'Gia cầm nông trại', animals:[['gà trống','thóc','🐓'],['gà mái','thóc','🐔'],['gà con','thóc','🐤'],['vịt xiêm','thóc','🦆'],['ngỗng','cỏ','🪿'],['gà tây','thóc','🦃']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('chim_nuoc_dam_lay') : ''), scene:'Chim nước đầm lầy', animals:[['thiên nga','rong','🦢'],['cò trắng','cá','🪶'],['chim bồ nông','cá','🐦'],['chim bói cá','cá','🐦'],['vịt trời','thóc','🦆']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('khung_long_rung_xanh_1') : ''), scene:'Khủng long rừng xanh', animals:[['khủng long bạo chúa','thịt','🦖'],['khủng long cổ dài','lá cây','🦕'],['khủng long ba sừng','lá cây','🦕'],['khủng long bay','cá','🦖'],['khủng long giáp','lá cây','🦕']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('khung_long_rung_xanh_2') : ''), scene:'Những người bạn khủng long', animals:[['khủng long gai','thịt','🦖'],['khủng long phiến sừng','lá cây','🦕'],['khủng long săn mồi','thịt','🦖'],['khủng long mỏ vịt','lá cây','🦕'],['khủng long con','lá cây','🦕']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('khung_long_dam_lay') : ''), scene:'Khủng long đầm lầy', animals:[['khủng long cổ dài dưới nước','cá','🦕'],['khủng long cổ dài','lá cây','🦕'],['khủng long bay','cá','🦖'],['khủng long mào','lá cây','🦕'],['khủng long nhỏ','côn trùng','🦖']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('sinh_vat_tien_su') : ''), scene:'Sinh vật thời tiền sử', animals:[['voi ma mút','cỏ','🦣'],['hổ răng kiếm','thịt','🐯'],['chim dodo','trái cây','🐦'],['tê tê cổ đại','côn trùng','🦔'],['hươu thời băng hà','cỏ','🦌']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('the_gioi_khung_long_con') : ''), scene:'Thế giới khủng long con', animals:[['khủng long bạo chúa con','thịt','🦖'],['khủng long cổ dài con','lá cây','🦕'],['khủng long bay con','cá','🦖'],['khủng long ba sừng con','lá cây','🦕'],['khủng long phiến sừng con','lá cây','🦕']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_trung_khu_vuon_1') : ''), scene:'Côn trùng khu vườn', animals:[['bướm','mật hoa','🦋'],['ong mật','mật hoa','🐝'],['chuồn chuồn','côn trùng','🪰'],['bọ rùa','rệp cây','🐞'],['kiến','đường','🐜']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_trung_khu_vuon_2') : ''), scene:'Côn trùng khu vườn', animals:[['châu chấu','lá cây','🦗'],['bọ ngựa','côn trùng','🦗'],['dế mèn','lá cây','🦗'],['đom đóm','côn trùng','✨'],['bọ cánh cứng','lá cây','🪲']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('sinh_vat_ao_ho') : ''), scene:'Sinh vật ao hồ', animals:[['ếch xanh','côn trùng','🐸'],['nòng nọc','tảo','🐟'],['cua đồng','tảo','🦀'],['ốc nhồi','lá cây','🐌'],['cá rô','côn trùng','🐟']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_trung_sao_sang') : ''), scene:'Khu vườn ban đêm', animals:[['bọ rùa','rệp cây','🐞'],['sâu đo','lá cây','🐛'],['thạch sùng','côn trùng','🦎'],['cuốn chiếu','lá mục','🐛'],['ve sầu','nhựa cây','🪰']] },
  { image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('khu_vuon_con_trung') : ''), scene:'Khu vườn côn trùng', animals:[['bướm','mật hoa','🦋'],['ong mật','mật hoa','🐝'],['bọ rùa','rệp cây','🐞'],['ốc sên','lá cây','🐌'],['châu chấu','lá cây','🦗']] }
];

function petBuildQuestionBank(){
  const bank=[];
  PET_SCENES.forEach(scene=>{
    scene.animals.forEach((a,idx)=>{
      bank.push({
        name:a[0],
        label:a[0],
        food:a[1],
        emoji:a[2] || '🐾',
        image:scene.image,
        scene:scene.scene,
        sceneAnimalIndex:idx
      });
    });
  });
  return bank;
}

const PET_ANIMALS = petBuildQuestionBank();

function petEnsureStyles() {
  if (document.getElementById('pet-game-styles')) return;
  const style = document.createElement('style');
  style.id = 'pet-game-styles';
  style.textContent = `
    @keyframes petFloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}
    @keyframes petHappy{0%{transform:scale(1)}25%{transform:scale(1.13) rotate(-5deg)}50%{transform:scale(1.08) rotate(5deg)}75%{transform:scale(1.13) rotate(-3deg)}100%{transform:scale(1)}}
    @keyframes petSad{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
    @keyframes petFoodFly{0%{transform:translate(0,0) scale(1) rotate(0);opacity:1}70%{transform:translate(var(--pet-fly-x),var(--pet-fly-y)) scale(1.2) rotate(14deg);opacity:1}100%{transform:translate(var(--pet-fly-x),var(--pet-fly-y)) scale(.45) rotate(22deg);opacity:0}}
    @keyframes petHeart{0%{transform:translate(-50%,0) scale(.45);opacity:0}25%{opacity:1;transform:translate(-50%,-10px) scale(1.15)}100%{opacity:0;transform:translate(-50%,-92px) scale(.9)}}
    @keyframes petSparkle{0%,100%{opacity:.18;transform:scale(.7) rotate(0)}50%{opacity:.85;transform:scale(1.25) rotate(18deg)}}
    @keyframes petCloudA{0%,100%{transform:translateX(-16px)}50%{transform:translateX(25px) translateY(-5px)}}
    @keyframes petCloudB{0%,100%{transform:translateX(18px)}50%{transform:translateX(-24px) translateY(5px)}}
    @keyframes petPop{0%{transform:scale(.55);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1);opacity:1}}
    @keyframes petWrong{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
    @keyframes petCombo{0%{transform:translate(-50%,-20%) scale(.4);opacity:0}35%{transform:translate(-50%,-50%) scale(1.18);opacity:1}75%{transform:translate(-50%,-70%) scale(1);opacity:1}100%{transform:translate(-50%,-95%) scale(.85);opacity:0}}
    @keyframes petBirdFly{0%{transform:translateX(-14vw) translateY(0) scale(.9);opacity:0}8%{opacity:.75}45%{transform:translateX(42vw) translateY(-12px) scale(1)}70%{transform:translateX(70vw) translateY(8px) scale(.92)}100%{transform:translateX(112vw) translateY(-8px) scale(.86);opacity:0}}
    @keyframes petLeafFall{0%{transform:translate3d(0,-55px,0) rotate(0deg);opacity:0}10%{opacity:.8}45%{transform:translate3d(28px,180px,0) rotate(170deg)}75%{transform:translate3d(-14px,330px,0) rotate(290deg)}100%{transform:translate3d(18px,540px,0) rotate(430deg);opacity:0}}
    @keyframes petRunIn{0%{transform:translateX(-95px) scale(.82) rotate(-4deg);opacity:0}48%{transform:translateX(16px) scale(1.05) rotate(3deg);opacity:1}72%{transform:translateX(-7px) scale(.98) rotate(-2deg)}100%{transform:translateX(0) scale(1) rotate(0);opacity:1}}
    @keyframes petCelebrateHop{0%{transform:translateY(0) scale(1)}30%{transform:translateY(-18px) scale(1.06) rotate(-3deg)}55%{transform:translateY(0) scale(1.02) rotate(3deg)}75%{transform:translateY(-9px) scale(1.05)}100%{transform:translateY(0) scale(1)}}
    .pet-stage{position:relative;overflow:hidden;background:linear-gradient(180deg,#eff6ff 0%,#fdf2f8 48%,#ecfdf5 100%)}
    .pet-main-layout{display:grid;grid-template-columns:410px minmax(0,1fr);gap:12px;align-items:stretch}
    .pet-visual-panel{display:flex;flex-direction:column;justify-content:center;min-width:0}
    .pet-answer-panel{display:flex;flex-direction:column;justify-content:center;min-width:0}
    .pet-animal-wrap{position:relative;width:100%;aspect-ratio:1/1;display:block;animation:petFloat 2.4s ease-in-out infinite;overflow:hidden}
    .pet-animal-image{display:block;width:100%;height:100%;aspect-ratio:1/1;object-fit:cover;border:0;border-radius:0;background:transparent;padding:0;box-shadow:none;user-select:none;pointer-events:none}
    .pet-animal-fallback{width:100%;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;font-size:168px;line-height:1;filter:drop-shadow(0 12px 9px rgba(15,23,42,.13))}
    .pet-scene-label{position:absolute;left:12px;bottom:12px;z-index:5;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.95);border:1px solid #fbcfe8;color:#db2777;font-weight:900;font-size:16px;box-shadow:0 4px 12px rgba(15,23,42,.08)}
    #pet-food-grid{display:grid;grid-template-columns:1fr;gap:10px;width:100%}
    .pet-food-btn{min-height:58px!important;display:flex;align-items:center;justify-content:flex-start;gap:14px;text-align:left}
    .pet-food-btn .pet-food-emoji{font-size:32px;line-height:1;flex:0 0 auto}
    .pet-food-btn .pet-food-word{font-size:16px;line-height:1.2}
    .pet-animal-happy{animation:petHappy .62s ease-out 1!important}
    .pet-animal-sad{animation:petSad .35s linear 1!important}
    .pet-food-btn{transition:transform .14s,box-shadow .14s,filter .14s;touch-action:manipulation;user-select:none}
    .pet-food-btn:hover{transform:translateY(-3px) scale(1.025);box-shadow:0 10px 24px rgba(15,23,42,.12)}
    .pet-food-wrong{animation:petWrong .3s linear 1;background:#ffe4e6!important;border-color:#fb7185!important;color:#be123c!important}
    .pet-flying-food{position:fixed;z-index:200;pointer-events:none;animation:petFoodFly .72s cubic-bezier(.18,.78,.25,1) forwards}
    .pet-heart-burst{position:absolute;left:50%;top:44%;z-index:50;font-size:38px;pointer-events:none;animation:petHeart 1s ease-out forwards}
    .pet-combo{position:absolute;left:50%;top:45%;z-index:60;font-weight:1000;font-size:28px;color:#f43f5e;text-shadow:0 3px 0 white,0 8px 18px rgba(244,63,94,.2);pointer-events:none;animation:petCombo 1s ease-out forwards}
    .pet-sparkle{position:absolute;pointer-events:none;animation:petSparkle 2.1s ease-in-out infinite}
    .pet-cloud{position:absolute;opacity:.48;pointer-events:none;filter:drop-shadow(0 6px 9px rgba(148,163,184,.12))}
    .pet-cloud-a{animation:petCloudA 7s ease-in-out infinite}.pet-cloud-b{animation:petCloudB 8.2s ease-in-out infinite}
    .pet-round-pop{animation:petRunIn .52s cubic-bezier(.2,.8,.2,1)}
    .pet-celebrate-hop{animation:petCelebrateHop .72s ease-out 1!important}
    .pet-bird{position:absolute;left:0;pointer-events:none;z-index:1;opacity:.72;animation:petBirdFly 12s linear infinite;filter:drop-shadow(0 3px 4px rgba(15,23,42,.08))}
    .pet-leaf{position:absolute;top:-45px;pointer-events:none;z-index:1;opacity:.72;animation:petLeafFall 8s linear infinite;filter:drop-shadow(0 3px 3px rgba(15,23,42,.06))}
    @media(max-width:900px){.pet-main-layout{grid-template-columns:350px minmax(0,1fr);gap:10px}.pet-animal-fallback{font-size:145px}.pet-food-btn{min-height:52px!important}}
    @media(max-width:700px){.pet-main-layout{grid-template-columns:1fr}.pet-animal-wrap{max-width:420px;width:100%;justify-self:start}.pet-animal-fallback{font-size:100px}#pet-food-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.pet-food-btn{min-height:48px!important;justify-content:center;text-align:center;gap:8px}.pet-food-btn .pet-food-emoji{font-size:28px}.pet-food-btn .pet-food-word{font-size:14px}.pet-scene-label{font-size:14px;padding:6px 11px}}
  `;
  document.head.appendChild(style);
}

function petShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function petAudio() {
  if (!petAudioCtx) petAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (petAudioCtx.state === 'suspended') petAudioCtx.resume().catch(() => {});
  return petAudioCtx;
}

function petTone(freq, duration, type = 'sine', gain = 0.07, delay = 0) {
  try {
    const ctx = petAudio();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
    g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + delay + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + duration + 0.02);
  } catch (e) {}
}

function petCorrectSound() {
  petTone(660,.13,'sine',.075,0); petTone(880,.16,'sine',.075,.11); petTone(1100,.19,'sine',.07,.23);
}
function petWrongSound() { petTone(210,.11,'square',.045,0); petTone(170,.12,'square',.04,.14); }

function petFoodInfo(word) {
  return PET_FOOD_POOL.find(x => x.word === word) || { word, emoji: PET_EXTRA_FOOD[word] || '🍽️' };
}

function petRefillSceneDeck() {
  let nextDeck = petShuffle(PET_SCENES);
  const lastImage = petTarget && petTarget.image;
  if (lastImage && nextDeck.length > 1 && nextDeck[0].image === lastImage) {
    [nextDeck[0], nextDeck[1]] = [nextDeck[1], nextDeck[0]];
  }
  petSceneDeck = nextDeck;
}

function petPickRound() {
  if (!petSceneDeck.length) petRefillSceneDeck();
  const scene = petSceneDeck.shift() || PET_SCENES[0];
  const animal = petShuffle(scene.animals)[0];
  petTarget = {
    name: animal[0], food: animal[1], emoji: animal[2], label: animal[0],
    scene: scene.scene, image: scene.image
  };

  const correct = petFoodInfo(petTarget.food);
  const preferredWords = (PET_DISTRACTOR_MAP[petTarget.name] || []).filter(word => word !== correct.word);
  const preferred = petShuffle(preferredWords).slice(0, 3).map(petFoodInfo);
  const used = new Set([correct.word, ...preferred.map(x => x.word)]);
  const fallback = petShuffle(PET_FOOD_POOL.filter(x => !used.has(x.word))).slice(0, Math.max(0, 3 - preferred.length));
  return petShuffle([correct, ...preferred, ...fallback].slice(0, 4));
}

function petImageCandidates(base) {
  const raw = String(base || '').trim();
  if (!raw) return [];
  if (/\.(?:png|jpe?g|webp|gif)$/i.test(raw)) return [raw];
  return [raw + '.jpg', raw + '.jpeg', raw + '.png', raw + '.webp'];
}

function petTryNextImage(img) {
  if (!img) return;
  let list = [];
  try { list = JSON.parse(img.dataset.candidates || '[]'); } catch (e) {}
  const nextIndex = Number(img.dataset.candidateIndex || 0) + 1;
  if (nextIndex < list.length) {
    img.dataset.candidateIndex = String(nextIndex);
    img.src = list[nextIndex];
    return;
  }
  const fallback = img.dataset.fallback || '🐾';
  const div = document.createElement('div');
  div.id = 'pet-animal-image';
  div.className = 'pet-animal-fallback';
  div.textContent = fallback;
  img.replaceWith(div);
}

function petAnimalHtml(a) {
  if (!a.image) {
    return `<div id="pet-animal-wrap" class="pet-animal-wrap pet-round-pop"><div id="pet-animal-image" class="pet-animal-fallback">${a.emoji || '🐾'}</div><div class="pet-scene-label">${a.scene || ''}</div></div>`;
  }
  const candidates = petImageCandidates(a.image);
  const firstSrc = candidates[0] || '';
  const safeCandidates = JSON.stringify(candidates).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const safeFallback = String(a.emoji || '🐾').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return `<div id="pet-animal-wrap" class="pet-animal-wrap pet-round-pop">
    <img id="pet-animal-image" src="${firstSrc}" alt="${a.label}" class="pet-animal-image" data-candidates="${safeCandidates}" data-candidate-index="0" data-fallback="${safeFallback}" onerror="petTryNextImage(this)">
    <div class="pet-scene-label">${a.scene || ''}</div>
  </div>`;
}

function startPetFeedingGame() {petlifeCancelTimers_();
  petEnsureStyles();
  petRound = 0; petScore = 0; petStreak = 0; petBestStreak = 0; petState = 'playing'; petTarget = null; petSceneDeck = []; petRoundToken += 1;
  const box = document.getElementById('game-play-container');
  if (!box) return;
  box.innerHTML = `
    <div class="pet-stage rounded-[28px] border-2 border-pink-200 shadow-sm p-3 md:p-4">
      <div class="pet-cloud pet-cloud-a text-5xl" style="left:7%;top:9%">☁️</div>
      <div class="pet-cloud pet-cloud-b text-4xl" style="right:8%;top:15%">☁️</div>
      <div class="pet-sparkle text-xl" style="left:18%;top:34%">✨</div>
      <div class="pet-sparkle text-lg" style="right:19%;top:31%;animation-delay:.8s">⭐</div>
      <div class="relative z-10">
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="px-3 py-1.5 bg-white/90 border border-pink-200 rounded-full text-xs md:text-sm font-black text-pink-600 shrink-0">🐾 Lượt <span id="pet-round">1</span></div>
          <div id="pet-question" class="flex-1 text-center text-sm md:text-lg font-black text-pink-600 leading-tight px-1"></div>
          <div class="flex gap-2 shrink-0">
            <span class="px-3 py-1.5 bg-white/90 border border-amber-200 rounded-full text-xs md:text-sm font-black text-amber-600">🔥 <span id="pet-streak">0</span></span>
            <span class="px-3 py-1.5 bg-white/90 border border-emerald-200 rounded-full text-xs md:text-sm font-black text-emerald-600">⭐ <span id="pet-score">0</span></span>
            <span class="px-3 py-1.5 bg-white/90 border border-purple-200 rounded-full text-xs md:text-sm font-black text-purple-600">🏆 <span id="pet-best">0</span></span>
          </div>
        </div>
        <div class="pet-main-layout">
          <div class="pet-visual-panel"><div id="pet-animal-zone"></div></div>
          <div class="pet-answer-panel">
            <div id="pet-food-grid"></div>
            <div id="pet-feedback" class="text-center mt-3 min-h-[28px] text-xs md:text-sm font-black text-slate-500">🍽️ Bé chọn món ăn phù hợp nhé!</div>
          </div>
        </div>
      </div>
    </div>`;
  petNextRound();
}

function petNextRound() {
  if (petState !== 'playing') return;
  petRound += 1;
  const token = ++petRoundToken;
  const options = petPickRound();
  document.getElementById('pet-round').textContent = petRound;
  document.getElementById('pet-score').textContent = petScore;
  document.getElementById('pet-streak').textContent = petStreak;
  document.getElementById('pet-best').textContent = petBestStreak;
  const zone = document.getElementById('pet-animal-zone');
  if (zone) zone.innerHTML = petAnimalHtml(petTarget);
  const q = document.getElementById('pet-question');
  if (q) q.textContent = `${petTarget.label} trong tranh thích ăn gì?`;
  const grid = document.getElementById('pet-food-grid');
  if (grid) grid.innerHTML = options.map((f, idx) => `
    <button class="pet-food-btn rounded-[20px] border-2 bg-white ${['border-pink-200','border-sky-200','border-amber-200','border-emerald-200'][idx]} shadow-sm px-4 py-2 font-black text-slate-700" data-food="${f.word}" onclick="petChooseFood(this,'${f.word.replace(/'/g,"\'")}')">
      <span class="pet-food-emoji">${f.emoji}</span><span class="pet-food-word">${f.word}</span>
    </button>`).join('');
  const feedback = document.getElementById('pet-feedback');
  if (feedback) feedback.textContent = '🍽️ Bé chọn món ăn phù hợp cho con vật được hỏi nhé!';
  if (typeof speakVietnamese === 'function') {
    petlifeLater_(() => {
      if (token === petRoundToken && petState === 'playing') speakVietnamese(`${petTarget.label} trong tranh thích ăn gì?`, .96);
    }, 160);
  }
  petlifeLater_(() => { if (token === petRoundToken && petState === 'playing') document.getElementById('pet-animal-wrap')?.classList.remove('pet-round-pop'); }, 380);
}

function petChooseFood(btn, word) {
  if (petState !== 'playing' || !petTarget) return;
  const correctWord = petTarget.food;
  if (word !== correctWord) {
    petStreak = 0;
    document.getElementById('pet-streak').textContent = petStreak;
    btn.classList.remove('pet-food-wrong'); void btn.offsetWidth; btn.classList.add('pet-food-wrong');
    const animal = document.getElementById('pet-animal-wrap');
    if (animal) { animal.classList.remove('pet-animal-sad'); void animal.offsetWidth; animal.classList.add('pet-animal-sad'); }
    petWrongSound();
    const feedback = document.getElementById('pet-feedback');
    if (feedback) feedback.textContent = `😅 ${petTarget.label} chưa thích món này đâu, thử lại nhé!`;
    petlifeLater_(() => btn.classList.remove('pet-food-wrong'), 430);
    return;
  }

  petState = 'transition';
  petScore += 10 + Math.min(petStreak * 2, 20);
  petStreak += 1; petBestStreak = Math.max(petBestStreak, petStreak);
  document.getElementById('pet-score').textContent = petScore;
  document.getElementById('pet-streak').textContent = petStreak;
  document.getElementById('pet-best').textContent = petBestStreak;
  document.querySelectorAll('.pet-food-btn').forEach(b => b.disabled = true);
  petCorrectSound();
  petAnimateFoodToAnimal(btn);
  const animal = document.getElementById('pet-animal-wrap');
  petlifeLater_(() => { if (animal) { animal.classList.remove('pet-animal-happy'); void animal.offsetWidth; animal.classList.add('pet-animal-happy','pet-celebrate-hop'); } }, 280);
  petShowHearts();
  if (typeof confetti === 'function') confetti({ particleCount: petStreak >= 3 ? 70 : 38, spread: petStreak >= 3 ? 75 : 55, origin: { y: .52 } });
  if (petStreak >= 2) petShowCombo();
  const feedback = document.getElementById('pet-feedback');
  if (feedback) feedback.textContent = `🎉 Chính xác! ${petTarget.label} rất thích ${word}!`;
  petlifeLater_(() => { petState = 'playing'; petNextRound(); }, 1180);
}

function petAnimateFoodToAnimal(btn) {
  const target = document.getElementById('pet-animal-image') || document.getElementById('pet-animal-wrap');
  if (!btn || !target) return;
  const br = btn.getBoundingClientRect(), tr = target.getBoundingClientRect();
  const foodWord = btn.getAttribute('data-food') || '';
  const info = petFoodInfo(foodWord);
  const fly = document.createElement('div');
  fly.className = 'pet-flying-food text-5xl'; fly.textContent = info.emoji;
  fly.style.left = `${br.left + br.width/2 - 24}px`; fly.style.top = `${br.top + br.height/2 - 24}px`;
  fly.style.setProperty('--pet-fly-x', `${(tr.left + tr.width/2) - (br.left + br.width/2)}px`);
  fly.style.setProperty('--pet-fly-y', `${(tr.top + tr.height/2) - (br.top + br.height/2)}px`);
  document.body.appendChild(fly); petlifeLater_(() => fly.remove(), 780);
}

function petShowHearts() {
  const stage = document.querySelector('.pet-stage'); if (!stage) return;
  ['💖','💕','💗'].forEach((h,i) => {
    const el = document.createElement('div'); el.className = 'pet-heart-burst'; el.textContent = h;
    el.style.left = `${46 + i*4}%`; el.style.animationDelay = `${i*.1}s`; stage.appendChild(el); petlifeLater_(() => el.remove(), 1250);
  });
}

function petShowCombo() {
  const stage = document.querySelector('.pet-stage'); if (!stage) return;
  const el = document.createElement('div'); el.className = 'pet-combo'; el.textContent = `🔥 Combo x${petStreak}!`;
  stage.appendChild(el); petlifeLater_(() => el.remove(), 1100);
}

function stopPetFeedingGame() {petlifeCancelTimers_();
  petState = 'idle'; petRoundToken += 1;
}

if(typeof stopPetFeedingGame==='function') window.stopPetFeedingGame=stopPetFeedingGame;
