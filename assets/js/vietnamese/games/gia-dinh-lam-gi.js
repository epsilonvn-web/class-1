// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// ============================================================
// MINI GAME TV1 - GIA DINH DANG LAM GI?
// Nguon: 30 tranh gia dinh Notebook da doi chieu truc tiep.
// Luat: doc cau hoi day du chu ngu - vi ngu - noi chon - dung cu - thoi gian khi tranh ho tro.
// 60 cau hoi / 30 tranh, 2 cau moi tranh.
// Layout: anh vuong ben trai, 4 dap an doc ben phai; mobile xep doc.
// ============================================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let faLifecycleToken_=0; const faLifecycleTimers_=new Set();
function faLater_(fn,ms){const token=faLifecycleToken_;const id=setTimeout(()=>{faLifecycleTimers_.delete(id);if(token!==faLifecycleToken_)return;fn();},ms);faLifecycleTimers_.add(id);return id;}
function faCancelTimers_(){faLifecycleToken_++;for(const id of faLifecycleTimers_)clearTimeout(id);faLifecycleTimers_.clear();}
const FA_SCENES = [
{id:'family_01_dinner',qs:[
['Vào buổi tối, cả gia đình đang quây quần làm gì quanh chiếc bàn ăn trong phòng bếp?','cùng ăn tối',['cùng ăn tối','cùng xem tivi','cùng dọn nhà','cùng tưới cây']],
['Trong bữa cơm tối, người bố ngồi giữa bàn đang dùng đôi đũa để làm gì?','gắp thức ăn',['gắp thức ăn','viết bài','tưới hoa','sửa xe']]
]},
{id:'family_02_garden_watering',qs:[
['Trong khu vườn đầy nắng, người ông đang cùng em bé dùng chiếc bình tưới để làm gì?','tưới hoa',['tưới hoa','rửa xe','nấu ăn','đọc báo']],
['Ngoài vườn vào ban ngày, em bé đang vui vẻ cùng ông chăm sóc những khóm hoa bằng cách nào?','cùng tưới nước cho hoa',['cùng tưới nước cho hoa','cùng quét sân','cùng hái quả','cùng đá bóng']]
]},
{id:'family_03_front_yard_car',qs:[
['Ngoài sân trước nhà trong ngày nắng, người bố đang dùng vòi nước để làm gì với chiếc ô tô màu đỏ?','rửa ô tô',['rửa ô tô','sơn ô tô','sửa xe máy','tưới cây']],
['Bên cạnh chiếc ô tô đang được rửa, bé gái đang vui đùa với những gì bay tung tóe quanh mình?','bọt nước và xà phòng',['bọt nước và xà phòng','lá cây khô','những quả bóng','những quyển sách']]
]},
{id:'family_04_living_room_tv',qs:[
['Vào buổi tối trong phòng khách, bà, mẹ và em bé đang cùng nhau làm gì trên ghế sofa?','xem tivi',['xem tivi','ăn sáng','gấp quần áo','tưới cây']],
['Trong lúc cả nhà thư giãn buổi tối, em bé đang ngồi giữa mẹ và bà để làm gì?','cùng xem chương trình trên tivi',['cùng xem chương trình trên tivi','cùng đọc báo','cùng nấu ăn','cùng rửa xe']]
]},
{id:'family_05_study_homework',qs:[
['Ban ngày trong góc học tập, hai bạn nhỏ đang ngồi bên chiếc bàn để làm gì với giấy và bút màu?','vẽ và học bài',['vẽ và học bài','nấu ăn','gấp quần áo','đánh răng']],
['Người mẹ đang đứng bên bàn học và chăm chú làm gì khi hai con đang vẽ tranh?','quan sát và động viên các con',['quan sát và động viên các con','ngủ trên ghế','rửa ô tô','đọc báo ngoài vườn']]
]},
{id:'family_06_bedtime_story',qs:[
['Trước giờ đi ngủ, người bà đang ngồi trên giường và dùng quyển sách để làm gì cho các cháu?','đọc truyện cho các cháu nghe',['đọc truyện cho các cháu nghe','dạy các cháu nấu ăn','cùng các cháu tưới cây','cùng các cháu sửa xe']],
['Trong căn phòng ấm áp buổi tối, ba bạn nhỏ đang ngồi sát bên bà để làm gì?','nghe bà kể chuyện',['nghe bà kể chuyện','xem bóng đá','ăn sáng','quét nhà']]
]},
{id:'family_07_kitchen_cooking',qs:[
['Trong căn bếp ban ngày, người mẹ đang đứng bên bồn rửa và dùng nước để làm gì với bó rau?','rửa rau',['rửa rau','tưới hoa','giặt quần áo','rửa xe']],
['Bên cạnh mẹ trong bếp, người bà đang dùng dao và thớt để làm gì với rau củ?','thái rau củ',['thái rau củ','vẽ tranh','đọc báo','chơi đàn']]
]},
{id:'family_08_pet_feeding',qs:[
['Ngoài hiên nhà, hai bạn nhỏ đang dùng các túi thức ăn để làm gì cho chú chó và chú mèo?','cho thú cưng ăn',['cho thú cưng ăn','tắm cho thú cưng','dạy thú cưng đọc sách','đưa thú cưng đi học']],
['Trong lúc chăm sóc vật nuôi ngoài hiên, bạn gái bên phải đang đổ thức ăn vào chiếc bát màu gì?','chiếc bát màu hồng',['chiếc bát màu hồng','chiếc nồi màu đen','chiếc hộp màu xanh','chiếc cốc màu trắng']]
]},
{id:'family_09_reading_balcony',qs:[
['Buổi sáng trên ban công đầy hoa, người ông đang ngồi trên ghế bập bênh và làm gì với tờ báo?','đọc báo',['đọc báo','gấp quần áo','vẽ tranh','nướng thịt']],
['Trong không gian yên tĩnh ngoài ban công, người ông đang vừa thư giãn vừa làm gì?','đọc tin trên báo',['đọc tin trên báo','rửa xe','đánh răng','chơi trốn tìm']]
]},
{id:'family_10_playing_toys',qs:[
['Trong phòng khách ban ngày, người bố đang ngồi trên thảm và dùng các khối nhiều màu để làm gì cùng em bé?','xếp khối đồ chơi',['xếp khối đồ chơi','nấu bữa tối','đọc báo','tưới hoa']],
['Em bé đang ngồi cạnh bố và chăm chú nhìn bố làm gì với những khối vuông nhiều màu?','xếp thành một tòa tháp',['xếp thành một tòa tháp','xếp quần áo vào tủ','rửa bát','chơi cầu lông']]
]},
{id:'family_11_cycling_yard',qs:[
['Ngoài sân trước nhà trong ngày nắng, bạn gái đội mũ bảo hiểm đang làm gì với chiếc xe đạp màu hồng?','đạp xe',['đạp xe','rửa xe','đẩy xe vào nhà','sửa xe']],
['Phía sau bạn đang đi xe đạp, em gái đang vui vẻ chạy theo và làm gì?','cổ vũ cho chị',['cổ vũ cho chị','ngồi đọc sách','tưới cây','nấu ăn']]
]},
{id:'family_12_bathroom_brushing',qs:[
['Buổi sáng trong phòng tắm, hai bạn nhỏ đang đứng trước gương và dùng bàn chải để làm gì?','đánh răng',['đánh răng','chải tóc','rửa quần áo','vẽ tranh']],
['Đứng trên những chiếc ghế nhỏ trước bồn rửa, hai chị em đang cùng thực hiện việc gì để giữ răng sạch sẽ?','chải răng thật sạch',['chải răng thật sạch','rửa xe thật sạch','lau bàn thật sạch','gấp quần áo thật gọn']]
]},
{id:'family_13_motorbike_school',qs:[
['Trước cổng nhà vào buổi sáng, người bố đang dùng hai tay để làm gì cho con trước khi đi học?','chỉnh quai mũ bảo hiểm',['chỉnh quai mũ bảo hiểm','buộc dây giày','chải tóc','đeo khăn quàng']],
['Bạn nhỏ mặc đồng phục và đeo ba lô đang đứng trước nhà để chuẩn bị làm gì?','đi học',['đi học','đi ngủ','đi bơi','đi mua rau']]
]},
{id:'family_14_tea_patio',qs:[
['Buổi sáng trong khu vườn nhiều hoa, ông và bà đang ngồi đối diện nhau để làm gì bên chiếc bàn tròn?','uống trà và trò chuyện',['uống trà và trò chuyện','nấu ăn','giặt quần áo','chơi bóng']],
['Người bà đang cầm chiếc tách nhỏ trong tay và cùng ông làm gì giữa khu vườn?','thưởng thức trà',['thưởng thức trà','tưới cây','đọc báo','sửa xe']]
]},
{id:'family_15_toddler_crying',qs:[
['Trong phòng khách ban ngày, người mẹ đang ôm em bé đang khóc để làm gì?','dỗ dành em bé',['dỗ dành em bé','dạy em bé đi xe đạp','cho em bé tưới cây','đưa em bé đi học']],
['Khi em bé đang buồn và khóc, người mẹ đang nhẹ nhàng đặt tay lên đầu bé để làm gì?','an ủi bé',['an ủi bé','đánh thức bé','chải tóc cho bé','đội mũ cho bé']]
]},
{id:'family_16_backyard_barbecue',qs:[
['Buổi tối ngoài sân sau, người bố đang đứng bên bếp nướng và dùng dụng cụ để làm gì?','nướng thức ăn',['nướng thức ăn','giặt quần áo','vẽ tranh','đọc báo']],
['Dưới những dây đèn buổi tối, người ông và người mẹ đang làm gì bên chiếc bàn ngoài sân?','chuẩn bị bàn ăn',['chuẩn bị bàn ăn','sửa xe đạp','đánh răng','xếp đồ chơi']]
]},
{id:'family_17_folding_clothes',qs:[
['Ngoài ban công sáng nắng, người mẹ trẻ và người bà đang cùng nhau làm gì với những chồng quần áo?','gấp quần áo',['gấp quần áo','nấu ăn','đọc truyện','rửa xe']],
['Bên chiếc giỏ đầy quần áo sạch, hai bà cháu đang cẩn thận làm gì để quần áo được gọn gàng?','xếp và gấp quần áo',['xếp và gấp quần áo','tưới và nhổ cỏ','rửa và lau xe','vẽ và tô màu']]
]},
{id:'family_18_dog_fetch',qs:[
['Ngoài vườn trong ngày nắng, hai bạn nhỏ đang chạy cùng chú chó và chơi trò gì với quả bóng màu vàng?','chơi ném bóng cho chó nhặt',['chơi ném bóng cho chó nhặt','chơi trốn tìm','chơi xếp hình','chơi đàn']],
['Chú chó đang chạy về phía quả bóng trong khi hai bạn nhỏ làm gì phía sau?','chạy theo và vui chơi cùng chó',['chạy theo và vui chơi cùng chó','ngồi đọc báo','gấp quần áo','đánh răng']]
]},
{id:'family_19_morning_exercise',qs:[
['Vào buổi sáng trong khu vườn, người ông đang chậm rãi thực hiện hoạt động gì để rèn luyện sức khỏe?','tập thể dục dưỡng sinh',['tập thể dục dưỡng sinh','nấu bữa sáng','đọc truyện','rửa ô tô']],
['Giữa bãi cỏ trước ngôi nhà, người ông đang dang tay và khuỵu chân để làm gì?','thực hiện động tác thể dục',['thực hiện động tác thể dục','buộc dây giày','tưới hoa','chơi đàn']]
]},
{id:'family_20_sleeping_toddler',qs:[
['Vào ban đêm trong phòng ngủ, em bé đang ôm chú gấu bông và làm gì trong chiếc cũi?','ngủ ngon',['ngủ ngon','ăn sáng','vẽ tranh','đánh răng']],
['Dưới ánh đèn ngủ hình cây nấm, em bé đang nằm yên để làm gì vào buổi tối?','ngủ và nghỉ ngơi',['ngủ và nghỉ ngơi','tập thể dục','chơi xe đạp','tưới cây']]
]},
{id:'family_21_livingroom_music',qs:[
['Ban ngày trong phòng khách, bạn gái đang ngồi trước cây đàn và dùng hai tay để làm gì?','chơi đàn piano',['chơi đàn piano','đánh răng','gấp quần áo','nấu ăn']],
['Người mẹ và người bà đang ngồi gần cây đàn để làm gì khi bạn nhỏ biểu diễn?','lắng nghe bạn nhỏ chơi đàn',['lắng nghe bạn nhỏ chơi đàn','xem bạn nhỏ rửa xe','cùng bạn nhỏ tưới cây','cùng bạn nhỏ đánh răng']]
]},
{id:'family_22_house_cleaning',qs:[
['Trong ngày cả nhà cùng dọn dẹp phòng khách, người bố đang dùng máy hút bụi để làm gì?','hút bụi sàn nhà',['hút bụi sàn nhà','nấu cơm','tưới hoa','đọc báo']],
['Cùng lúc bố đang hút bụi, bạn gái lớn đang dùng khăn để làm gì với chiếc bàn gỗ?','lau bàn',['lau bàn','gấp quần áo','rửa xe','đánh răng']]
]},
{id:'family_23_watering_balcony',qs:[
['Ban ngày trên ban công đầy hoa, người mẹ đang dùng chiếc bình tưới để làm gì?','tưới hoa',['tưới hoa','rửa bát','nấu ăn','đọc báo']],
['Giữa những chậu cây xanh tốt, người mẹ đang chăm sóc khu vườn nhỏ trên ban công bằng cách nào?','tưới nước cho các chậu cây',['tưới nước cho các chậu cây','quét lá dưới sân','hái rau trong bếp','sửa chiếc xe đạp']]
]},
{id:'family_24_drawing_table',qs:[
['Trong phòng học ban ngày, ba bạn nhỏ đang quây quanh chiếc bàn và làm gì với giấy, bút màu và màu vẽ?','vẽ tranh và tô màu',['vẽ tranh và tô màu','nấu ăn','đọc báo','gấp quần áo']],
['Bạn nhỏ ngồi giữa đang nhúng tay vào màu và làm gì trên tờ giấy lớn?','in dấu bàn tay',['in dấu bàn tay','viết thư','gấp máy bay giấy','lau bàn']]
]},
{id:'family_25_welcoming_father',qs:[
['Khi người bố vừa trở về nhà, hai bạn nhỏ đang chạy ra trước cửa để làm gì?','ôm và chào đón bố',['ôm và chào đón bố','rủ bố đi ngủ','nhờ bố rửa xe','nhờ bố tưới cây']],
['Trước cửa nhà vào lúc bố đi làm về, chú chó đang vui vẻ làm gì bên cạnh các bạn nhỏ?','chạy đến chào bố',['chạy đến chào bố','nằm ngủ trong giỏ','ăn thức ăn trong bát','đào đất trồng cây']]
]},
{id:'family_26_playing_hide_seek',qs:[
['Trong khu vườn đầy hoa, bạn nhỏ đứng cạnh gốc cây đang bịt mắt và đếm để chơi trò gì?','chơi trốn tìm',['chơi trốn tìm','chơi bóng','chơi đàn','chơi xếp hình']],
['Trong khi bạn nhỏ đang nhắm mắt đếm, người chị đang làm gì phía sau bụi hoa?','trốn sau bụi hoa',['trốn sau bụi hoa','tưới hoa','đọc sách','rửa xe']]
]},
{id:'family_27_breakfast_kitchen',qs:[
['Vào buổi sáng trong căn bếp, bố mẹ và hai bạn nhỏ đang quây quần bên bàn để làm gì?','ăn sáng',['ăn sáng','ăn tối','xem tivi','tắm cho em bé']],
['Trong bữa sáng gia đình, mọi người đang dùng bát, thìa và bánh mì để làm gì?','cùng ăn bữa sáng',['cùng ăn bữa sáng','cùng vẽ tranh','cùng tưới cây','cùng dọn sân']]
]},
{id:'family_28_bathtub_fun',qs:[
['Trong phòng tắm, người mẹ đang dùng khăn và nước để làm gì cho em bé trong bồn tắm?','tắm cho em bé',['tắm cho em bé','cho em bé ăn','dạy em bé vẽ','đưa em bé đi học']],
['Giữa những bọt xà phòng và các chú vịt đồ chơi, em bé đang vui vẻ làm gì cùng mẹ?','tắm trong bồn',['tắm trong bồn','ngủ trong cũi','ăn sáng','chơi ngoài sân']]
]},
{id:'family_29_stargazing_terrace',qs:[
['Vào buổi tối trên sân thượng, người ông đang hướng dẫn cháu dùng kính thiên văn để làm gì?','quan sát bầu trời và các vì sao',['quan sát bầu trời và các vì sao','tưới hoa','đọc báo','rửa xe']],
['Dưới bầu trời đầy sao và trăng lưỡi liềm, bạn nhỏ đang nhìn qua kính thiên văn để làm gì?','ngắm sao',['ngắm sao','đánh răng','gấp quần áo','nấu ăn']]
]},
{id:'family_30_full_family_portrait',qs:[
['Trước ngôi nhà vào ban ngày, cả gia đình đang đứng gần nhau và làm gì trước ống kính?','chụp ảnh gia đình',['chụp ảnh gia đình','nấu ăn','rửa xe','đánh răng']],
['Trong lúc chụp bức ảnh kỷ niệm trước nhà, nhiều thành viên đang mỉm cười và làm gì bằng tay?','vẫy tay chào',['vẫy tay chào','cầm ô che mưa','gấp quần áo','cầm bàn chải đánh răng']]
]}
].map(s=>({...s,image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc(s.id) : '')}));

let faDeck=[],faRound=0,faScore=0,faStreak=0,faBest=0,faLocked=false,faCurrent=null;
function faShuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function faBuildDeck(){faDeck=faShuffle(FA_SCENES);if(faCurrent&&faDeck.length>1&&faDeck[0].id===faCurrent.scene.id){[faDeck[0],faDeck[1]]=[faDeck[1],faDeck[0]];}}
function faNext(){if(!faDeck.length)faBuildDeck();const scene=faDeck.shift();const q=faShuffle(scene.qs)[0];faCurrent={scene,q};faRound++;faLocked=false;faRender();}
function faEnsureStyles(){if(document.getElementById('family-action-style'))return;const s=document.createElement('style');s.id='family-action-style';s.textContent=`
@keyframes faShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}@keyframes faGlow{0%,100%{box-shadow:none}50%{box-shadow:0 0 28px rgba(16,185,129,.3)}}.fa-shake{animation:faShake .3s ease}.fa-correct{animation:faGlow .65s ease}.fa-main-layout{display:grid;grid-template-columns:minmax(300px,410px) minmax(0,1fr);gap:14px;align-items:stretch}.fa-picture-wrap{position:relative;aspect-ratio:1/1;width:100%;overflow:hidden}.fa-picture{width:100%;height:100%;object-fit:cover;display:block}.fa-options{display:grid;grid-template-columns:1fr;gap:10px;align-content:center}.fa-option{min-height:58px}@media(max-width:900px){.fa-main-layout{grid-template-columns:minmax(260px,350px) minmax(0,1fr);gap:10px}.fa-option{min-height:54px}}@media(max-width:700px){.fa-main-layout{grid-template-columns:1fr}.fa-picture-wrap{max-width:430px;margin:0 auto}.fa-options{grid-template-columns:1fr 1fr}.fa-option{min-height:50px}}@media(max-width:460px){.fa-options{grid-template-columns:1fr}}
`;document.head.appendChild(s);}
function startFamilyActionGame(){faCancelTimers_();faEnsureStyles();faDeck=[];faRound=0;faScore=0;faStreak=0;faBest=0;faLocked=false;faCurrent=null;faNext();}
function faRender(){const box=document.getElementById('game-play-container');if(!box||!faCurrent)return;const [question,correct,rawOptions]=faCurrent.q;const options=faShuffle(rawOptions);const palettes=['bg-pink-50 border-pink-200 hover:bg-pink-100','bg-sky-50 border-sky-200 hover:bg-sky-100','bg-amber-50 border-amber-200 hover:bg-amber-100','bg-emerald-50 border-emerald-200 hover:bg-emerald-100'];box.innerHTML=`<div class="rounded-[28px] border-2 border-pink-100 bg-gradient-to-b from-sky-50/70 via-pink-50/50 to-emerald-50/60 p-2.5 md:p-3"><div class="flex items-center justify-between gap-2 mb-2"><div class="flex items-center gap-2 min-w-0"><span class="px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 font-black text-xs md:text-sm shrink-0">🏡 Lượt ${faRound}</span><div class="font-black text-teal-700 text-sm md:text-lg leading-tight">${question}</div></div><div class="flex gap-1.5 shrink-0"><span class="px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs md:text-sm">⭐ ${faScore}</span><span class="px-2.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs md:text-sm">🔥 x${faStreak}</span><span class="px-2.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 font-black text-xs md:text-sm">🏆 ${faBest}</span></div></div><div class="fa-main-layout"><div class="fa-picture-wrap"><img class="fa-picture" src="${faCurrent.scene.image}" alt="Tranh hoạt động gia đình"></div><div class="fa-options">${options.map((op,i)=>`<button class="fa-option px-4 py-2.5 rounded-2xl border-2 ${palettes[i]} text-slate-700 font-black text-sm md:text-base shadow-sm transition-all" data-answer="${op.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" onclick="faChoose(this)">${op}</button>`).join('')}<div id="fa-feedback" class="min-h-[28px] flex items-center justify-center text-center text-xs md:text-sm font-black text-slate-500">👀 Bé đọc kỹ cả người, nơi chốn, thời gian và dụng cụ trong câu hỏi nhé!</div></div></div></div>`;if(typeof speakVietnamese==='function')faLater_(()=>speakVietnamese(question,0.93),150);}
function faChoose(btn){if(faLocked||!faCurrent)return;const answer=btn.dataset.answer;const correct=faCurrent.q[1];if(answer===correct){faLocked=true;faScore+=10+Math.min(faStreak,5)*2;faStreak++;faBest=Math.max(faBest,faStreak);btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800','fa-correct');const fb=document.getElementById('fa-feedback');if(fb)fb.innerHTML=`🎉 Chính xác! <span class="text-emerald-700 ml-1">${correct}</span>`;if(typeof playAudio==='function')playAudio('correct');if(typeof confetti==='function')confetti({particleCount:50,spread:65,origin:{y:.72}});if(typeof speakVietnamese==='function')speakVietnamese(`${correct}. Chính xác!`,1.0);faLater_(faNext,1200);}else{faStreak=0;btn.classList.add('fa-shake','border-rose-400','bg-rose-50');faLater_(()=>btn.classList.remove('fa-shake','border-rose-400','bg-rose-50'),360);const fb=document.getElementById('fa-feedback');if(fb)fb.textContent='🔎 Chưa đúng rồi. Bé đọc lại câu hỏi và quan sát hoạt động trong tranh nhé!';if(typeof playAudio==='function')playAudio('wrong');}}
window.startFamilyActionGame=startFamilyActionGame;window.faChoose=faChoose;

function stopFamilyActionGame(){faCancelTimers_(); try{ faLocked=true; }catch(_){} try{ if(typeof stopSpeaking==='function') stopSpeaking(); }catch(_){} }
window.stopFamilyActionGame=stopFamilyActionGame;
