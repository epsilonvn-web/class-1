// QUY TAC VONG ANH: moi chu ky phai di het 30 anh, khong lap anh trong cung chu ky; het 30 anh moi tron lai cho chu ky moi.
// ============================================================
// MINI GAME TV1 - AI MAC GI?
// Nguon: 30 tranh gia dinh Notebook da doi chieu truc tiep.
// Luat: quan sat tranh, doc cau hoi day du ngu canh, chon dung trang phuc/mau sac.
// 60 cau hoi / 30 tranh, 2 cau moi tranh.
// Layout: anh vuong ben trai, 4 dap an doc ben phai; mobile xep doc.
// ============================================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let fwLifecycleToken_=0; const fwLifecycleTimers_=new Set();
function fwLater_(fn,ms){const token=fwLifecycleToken_;const id=setTimeout(()=>{fwLifecycleTimers_.delete(id);if(token!==fwLifecycleToken_)return;fn();},ms);fwLifecycleTimers_.add(id);return id;}
function fwCancelTimers_(){fwLifecycleToken_++;for(const id of fwLifecycleTimers_)clearTimeout(id);fwLifecycleTimers_.clear();}
const FW_SCENES = [
  {id:'family_01_dinner',qs:[
    ['Trong bữa cơm gia đình buổi tối, người mẹ ngồi bên phải bàn ăn đang mặc áo màu gì?','màu hồng',['màu hồng','màu xanh dương','màu vàng','màu tím']],
    ['Người bố ngồi giữa bàn ăn, đang dùng đũa gắp thức ăn, mặc chiếc áo màu gì?','màu xanh nhạt',['màu xanh nhạt','màu đỏ','màu đen','màu cam']]
  ]},
  {id:'family_02_garden_watering',qs:[
    ['Trong khu vườn đầy nắng, em bé đang cùng ông tưới hoa mặc trang phục gì?','quần yếm xanh',['quần yếm xanh','váy hồng','áo khoác đỏ','quần short vàng']],
    ['Người ông đang cúi xuống giúp em bé tưới hoa mặc áo có họa tiết gì?','áo kẻ ô',['áo kẻ ô','áo sọc ngang','áo chấm bi','áo hoa']]
  ]},
  {id:'family_03_front_yard_car',qs:[
    ['Ngoài sân trước nhà, người bố đang rửa chiếc ô tô màu đỏ mặc quần màu gì?','màu vàng nâu',['màu vàng nâu','màu xanh lá','màu tím','màu đỏ']],
    ['Bé gái đang vui đùa bên chiếc ô tô ngoài sân mặc váy có họa tiết gì?','váy hoa',['váy hoa','váy kẻ ô','váy chấm bi','váy sọc ngang']]
  ]},
  {id:'family_04_living_room_tv',qs:[
    ['Buổi tối trong phòng khách, người bà đang ngồi trên ghế sofa xem tivi mặc áo khoác màu gì?','màu tím nhạt',['màu tím nhạt','màu đỏ','màu xanh lá','màu vàng']],
    ['Người mẹ ngồi cạnh em bé trên ghế sofa vào buổi tối đang mặc áo màu gì?','màu be',['màu be','màu hồng đậm','màu xanh dương','màu cam']]
  ]},
  {id:'family_05_study_homework',qs:[
    ['Trong góc học tập ban ngày, bạn gái lớn đang ngồi vẽ cùng em nhỏ mặc áo màu gì?','màu xanh nhạt',['màu xanh nhạt','màu đỏ','màu vàng','màu tím']],
    ['Người mẹ đang đứng bên bàn học quan sát hai con mặc áo khoác màu gì?','màu be',['màu be','màu xanh lá','màu đỏ','màu tím']]
  ]},
  {id:'family_06_bedtime_story',qs:[
    ['Trước giờ đi ngủ, bạn gái ngồi bên trái bà và cùng nghe đọc truyện đang mặc đồ màu gì?','màu xanh nhạt',['màu xanh nhạt','màu đỏ','màu vàng','màu cam']],
    ['Bạn gái ngồi bên phải bà trên giường, đang nghe kể chuyện trước giờ ngủ, mặc bộ đồ màu gì?','màu hồng',['màu hồng','màu xanh lá','màu đen','màu vàng']]
  ]},
  {id:'family_07_kitchen_cooking',qs:[
    ['Trong căn bếp sáng sủa, người mẹ đang rửa rau ở bồn nước mặc thêm món đồ gì bên ngoài áo?','tạp dề',['tạp dề','áo mưa','khăn quàng cổ','mũ len']],
    ['Người bà đang thái rau bên bàn bếp mặc áo khoác màu gì?','màu xanh lá',['màu xanh lá','màu đỏ','màu tím','màu đen']]
  ]},
  {id:'family_08_pet_feeding',qs:[
    ['Ngoài hiên nhà, bạn gái bên trái đang đổ thức ăn cho chú chó mặc áo có họa tiết gì?','áo sọc ngang',['áo sọc ngang','áo chấm bi','áo kẻ ô','áo hoa']],
    ['Bạn gái bên phải đang cho mèo ăn ngoài hiên mặc loại quần gì?','quần yếm xanh',['quần yếm xanh','quần short đỏ','váy vàng','quần dài đen']]
  ]},
  {id:'family_09_reading_balcony',qs:[
    ['Buổi sáng trên ban công đầy hoa, người ông đang ngồi đọc báo mặc áo màu gì?','màu xám nâu',['màu xám nâu','màu đỏ','màu xanh dương','màu vàng']],
    ['Người ông đang ngồi trên ghế bập bênh đọc báo mang loại kính gì?','kính gọng tròn',['kính gọng tròn','kính râm','kính bơi','không đeo kính']]
  ]},
  {id:'family_10_playing_toys',qs:[
    ['Trong phòng khách, người bố đang ngồi xếp khối đồ chơi cùng em bé mặc áo màu gì?','màu xanh dương',['màu xanh dương','màu đỏ','màu vàng','màu tím']],
    ['Em bé đang ngồi cạnh bố chơi các khối màu mặc loại quần gì?','quần yếm xanh',['quần yếm xanh','quần short đỏ','váy hồng','quần đen']]
  ]},
  {id:'family_11_cycling_yard',qs:[
    ['Ngoài sân trước nhà trong ngày nắng, bạn gái đang đi xe đạp mặc áo màu gì?','màu vàng',['màu vàng','màu xanh lá','màu tím','màu đen']],
    ['Bạn gái đang đạp chiếc xe màu hồng đội mũ bảo hiểm màu gì?','màu hồng tím',['màu hồng tím','màu xanh lá','màu vàng','màu đen']]
  ]},
  {id:'family_12_bathroom_brushing',qs:[
    ['Trong phòng tắm, bạn gái lớn đang đứng trước gương đánh răng mặc áo có họa tiết gì?','áo sọc xanh trắng',['áo sọc xanh trắng','áo hoa đỏ','áo chấm bi vàng','áo kẻ ô nâu']],
    ['Em gái tóc vàng đang đứng trên ghế đánh răng mặc chiếc váy màu gì?','màu vàng',['màu vàng','màu xanh dương','màu đỏ','màu tím']]
  ]},
  {id:'family_13_motorbike_school',qs:[
    ['Trước cổng nhà vào buổi sáng, bạn nhỏ chuẩn bị đi học mặc váy đồng phục màu gì?','màu xanh dương',['màu xanh dương','màu đỏ','màu vàng','màu xanh lá']],
    ['Người bố đang chỉnh quai mũ bảo hiểm cho con trước khi đi học mặc quần màu gì?','màu nâu',['màu nâu','màu đỏ','màu tím','màu trắng']]
  ]},
  {id:'family_14_tea_patio',qs:[
    ['Trong khu vườn buổi sáng, người ông đang ngồi uống trà mặc áo len không tay màu gì?','màu be nâu',['màu be nâu','màu đỏ','màu xanh dương','màu tím']],
    ['Người bà đang ngồi uống trà đối diện ông mặc áo khoác có họa tiết gì?','họa tiết hoa',['họa tiết hoa','sọc ngang','kẻ ô','chấm bi lớn']]
  ]},
  {id:'family_15_toddler_crying',qs:[
    ['Trong phòng khách, người mẹ đang ôm em bé khóc mặc áo len màu gì?','màu be',['màu be','màu đỏ','màu xanh lá','màu tím']],
    ['Em bé đang được mẹ ôm và dỗ dành mặc bộ đồ có họa tiết gì?','sọc xanh trắng',['sọc xanh trắng','hoa đỏ','kẻ ô nâu','chấm bi vàng']]
  ]},
  {id:'family_16_backyard_barbecue',qs:[
    ['Buổi tối ngoài sân sau, người bố đang đứng nướng đồ ăn mặc thêm món đồ gì phía trước áo?','tạp dề',['tạp dề','áo khoác','khăn choàng','ba lô']],
    ['Người mẹ đang bày bàn ăn dưới những dây đèn buổi tối mặc váy màu gì?','màu xanh tím',['màu xanh tím','màu vàng','màu đỏ','màu xanh lá']]
  ]},
  {id:'family_17_folding_clothes',qs:[
    ['Ngoài ban công sáng nắng, người mẹ trẻ đang cùng bà gấp quần áo mặc áo màu gì?','màu vàng',['màu vàng','màu đỏ','màu tím','màu xanh lá']],
    ['Người bà đang cầm chồng quần áo đã gấp mặc áo khoác màu gì?','màu hồng đỏ',['màu hồng đỏ','màu xanh dương','màu vàng','màu đen']]
  ]},
  {id:'family_18_dog_fetch',qs:[
    ['Ngoài vườn trong ngày nắng, bạn gái bên trái đang chơi với chú chó mặc loại váy gì?','váy yếm xanh',['váy yếm xanh','váy đỏ','váy vàng chấm bi','váy đen']],
    ['Bạn gái đang chạy phía sau quả bóng màu vàng mặc áo màu gì?','màu hồng',['màu hồng','màu xanh lá','màu tím','màu đen']]
  ]},
  {id:'family_19_morning_exercise',qs:[
    ['Buổi sáng trong khu vườn, người ông đang tập thể dục mặc bộ quần áo màu gì?','màu xám',['màu xám','màu đỏ','màu vàng','màu xanh lá']],
    ['Người ông đang tập những động tác chậm rãi ngoài vườn mang loại giày màu gì?','giày màu xám',['giày màu xám','giày đỏ','giày vàng','giày xanh lá']]
  ]},
  {id:'family_20_sleeping_toddler',qs:[
    ['Buổi tối trong phòng ngủ, em bé đang ôm gấu bông và ngủ mặc bộ đồ gì?','đồ ngủ sọc xanh trắng',['đồ ngủ sọc xanh trắng','váy đỏ','quần yếm xanh','áo khoác vàng']],
    ['Em bé đang ngủ trong chiếc cũi gỗ mặc quần áo có màu chủ đạo nào?','xanh nhạt và trắng',['xanh nhạt và trắng','đỏ và đen','vàng và tím','xanh lá và cam']]
  ]},
  {id:'family_21_livingroom_music',qs:[
    ['Trong phòng khách ban ngày, bạn gái đang ngồi chơi đàn piano mặc chiếc váy màu gì?','màu vàng',['màu vàng','màu xanh dương','màu đỏ','màu tím']],
    ['Người mẹ đang ngồi nghe con chơi đàn mặc áo màu gì?','màu xanh dương',['màu xanh dương','màu đỏ','màu vàng','màu xanh lá']]
  ]},
  {id:'family_22_house_cleaning',qs:[
    ['Trong ngày cả nhà cùng dọn dẹp, người bố đang cầm máy hút bụi mặc áo khoác có họa tiết gì?','áo kẻ ô',['áo kẻ ô','áo chấm bi','áo hoa','áo sọc ngang']],
    ['Bạn nhỏ đang cất đồ chơi vào hộp ở bên phải phòng khách mặc loại quần gì?','quần yếm xanh',['quần yếm xanh','quần short đỏ','váy vàng','quần đen']]
  ]},
  {id:'family_23_watering_balcony',qs:[
    ['Ngoài ban công đầy hoa vào ban ngày, người mẹ đang tưới cây mặc loại quần gì?','quần yếm xanh',['quần yếm xanh','váy đỏ','quần short vàng','quần đen']],
    ['Người mẹ đang cầm bình tưới hoa trên ban công đi đôi giày màu gì?','màu hồng',['màu hồng','màu xanh lá','màu đen','màu vàng']]
  ]},
  {id:'family_24_drawing_table',qs:[
    ['Trong phòng học, bạn gái ngồi giữa bàn và đang in màu bằng bàn tay mặc loại quần gì?','quần yếm xanh',['quần yếm xanh','váy đỏ','quần short vàng','quần đen']],
    ['Bạn gái ngồi bên trái đang vẽ mặt trời bằng bút màu mặc áo màu gì?','màu xanh nhạt',['màu xanh nhạt','màu đỏ','màu vàng','màu tím']]
  ]},
  {id:'family_25_welcoming_father',qs:[
    ['Khi bố vừa trở về nhà, bạn gái đang ôm bố ở bên trái mặc áo màu gì?','màu hồng',['màu hồng','màu vàng','màu xanh lá','màu đen']],
    ['Người bố vừa đi làm về và đang đứng trước cửa nhà mặc áo khoác kiểu gì?','áo vest',['áo vest','áo mưa','áo phao','áo len cổ lọ']]
  ]},
  {id:'family_26_playing_hide_seek',qs:[
    ['Trong khu vườn, bạn nhỏ đang bịt mắt đếm khi chơi trốn tìm mặc loại quần gì?','quần yếm xanh',['quần yếm xanh','váy đỏ','quần short vàng','quần đen']],
    ['Người ông đang ngồi trên ghế quan sát các cháu chơi trốn tìm mặc áo khoác màu gì?','màu nâu',['màu nâu','màu đỏ','màu vàng','màu xanh dương']]
  ]},
  {id:'family_27_breakfast_kitchen',qs:[
    ['Trong bữa sáng ở nhà, người mẹ ngồi cạnh bố mặc áo khoác màu gì?','màu vàng nhạt',['màu vàng nhạt','màu đỏ','màu tím','màu xanh lá']],
    ['Bạn gái ngồi bên phải bàn ăn sáng mặc áo màu gì?','màu hồng',['màu hồng','màu xanh dương','màu vàng','màu đen']]
  ]},
  {id:'family_28_bathtub_fun',qs:[
    ['Trong phòng tắm, người mẹ đang tắm cho em bé mặc áo có họa tiết gì?','áo sọc ngang',['áo sọc ngang','áo hoa','áo chấm bi','áo kẻ ô']],
    ['Người mẹ đang dùng khăn tắm cho em bé có chiếc khăn màu gì vắt trên vai?','màu trắng',['màu trắng','màu đỏ','màu xanh lá','màu tím']]
  ]},
  {id:'family_29_stargazing_terrace',qs:[
    ['Buổi tối trên sân thượng, bạn gái đang quan sát bầu trời qua kính thiên văn mặc áo khoác màu gì?','màu xanh đậm',['màu xanh đậm','màu đỏ','màu vàng','màu trắng']],
    ['Người ông đang đứng cạnh cháu ngắm sao trong đêm mặc áo len màu gì?','màu be nâu',['màu be nâu','màu đỏ','màu xanh lá','màu tím']]
  ]},
  {id:'family_30_full_family_portrait',qs:[
    ['Trong bức ảnh cả gia đình đứng trước ngôi nhà, người ông bên trái mặc áo len màu gì?','màu xanh lá',['màu xanh lá','màu đỏ','màu tím','màu đen']],
    ['Bạn gái nhỏ đứng phía trước bên phải trong bức ảnh gia đình mặc chiếc váy màu gì?','màu hồng',['màu hồng','màu xanh dương','màu vàng','màu đen']]
  ]}
].map(s=>({...s,image:(typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc(s.id) : '')}));

let fwDeck=[],fwRound=0,fwScore=0,fwStreak=0,fwBest=0,fwLocked=false,fwCurrent=null;
function fwShuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function fwBuildDeck(){fwDeck=fwShuffle(FW_SCENES);if(fwCurrent&&fwDeck.length>1&&fwDeck[0].id===fwCurrent.scene.id){[fwDeck[0],fwDeck[1]]=[fwDeck[1],fwDeck[0]];}}
function fwNext(){if(!fwDeck.length)fwBuildDeck();const scene=fwDeck.shift();const q=fwShuffle(scene.qs)[0];fwCurrent={scene,q};fwRound++;fwLocked=false;fwRender();}
function fwEnsureStyles(){if(document.getElementById('family-wear-style'))return;const s=document.createElement('style');s.id='family-wear-style';s.textContent=`
@keyframes fwShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}
@keyframes fwGlow{0%,100%{box-shadow:none}50%{box-shadow:0 0 28px rgba(16,185,129,.3)}}
.fw-shake{animation:fwShake .3s ease}.fw-correct{animation:fwGlow .65s ease}
.fw-main-layout{display:grid;grid-template-columns:minmax(300px,410px) minmax(0,1fr);gap:14px;align-items:stretch}.fw-picture-wrap{position:relative;aspect-ratio:1/1;width:100%;overflow:hidden}.fw-picture{width:100%;height:100%;object-fit:cover;display:block}.fw-options{display:grid;grid-template-columns:1fr;gap:10px;align-content:center}.fw-option{min-height:58px}
@media(max-width:900px){.fw-main-layout{grid-template-columns:minmax(260px,350px) minmax(0,1fr);gap:10px}.fw-option{min-height:54px}}@media(max-width:700px){.fw-main-layout{grid-template-columns:1fr}.fw-picture-wrap{max-width:430px;margin:0 auto}.fw-options{grid-template-columns:1fr 1fr}.fw-option{min-height:50px}}@media(max-width:460px){.fw-options{grid-template-columns:1fr}}
`;document.head.appendChild(s);}
function startFamilyClothesGame(){fwCancelTimers_();fwEnsureStyles();fwDeck=[];fwRound=0;fwScore=0;fwStreak=0;fwBest=0;fwLocked=false;fwCurrent=null;fwNext();}
function fwRender(){const box=document.getElementById('game-play-container');if(!box||!fwCurrent)return;const [question,correct,rawOptions]=fwCurrent.q;const options=fwShuffle(rawOptions);const palettes=['bg-pink-50 border-pink-200 hover:bg-pink-100','bg-sky-50 border-sky-200 hover:bg-sky-100','bg-amber-50 border-amber-200 hover:bg-amber-100','bg-emerald-50 border-emerald-200 hover:bg-emerald-100'];box.innerHTML=`
<div class="rounded-[28px] border-2 border-pink-100 bg-gradient-to-b from-sky-50/70 via-pink-50/50 to-emerald-50/60 p-2.5 md:p-3"><div class="flex items-center justify-between gap-2 mb-2"><div class="flex items-center gap-2 min-w-0"><span class="px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 font-black text-xs md:text-sm shrink-0">👕 Lượt ${fwRound}</span><div class="font-black text-teal-700 text-sm md:text-lg leading-tight">${question}</div></div><div class="flex gap-1.5 shrink-0"><span class="px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs md:text-sm">⭐ ${fwScore}</span><span class="px-2.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-xs md:text-sm">🔥 x${fwStreak}</span><span class="px-2.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-600 font-black text-xs md:text-sm">🏆 ${fwBest}</span></div></div><div class="fw-main-layout"><div class="fw-picture-wrap"><img class="fw-picture" src="${fwCurrent.scene.image}" alt="Tranh gia đình"></div><div class="fw-options">${options.map((op,i)=>`<button class="fw-option px-4 py-2.5 rounded-2xl border-2 ${palettes[i]} text-slate-700 font-black text-sm md:text-base shadow-sm transition-all" data-answer="${op.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" onclick="fwChoose(this)">${op}</button>`).join('')}<div id="fw-feedback" class="min-h-[28px] flex items-center justify-center text-center text-xs md:text-sm font-black text-slate-500">👀 Bé quan sát thật kỹ trang phục và màu sắc trong tranh nhé!</div></div></div></div>`;if(typeof speakVietnamese==='function')fwLater_(()=>speakVietnamese(question,0.94),150);}
function fwChoose(btn){if(fwLocked||!fwCurrent)return;const answer=btn.dataset.answer;const correct=fwCurrent.q[1];if(answer===correct){fwLocked=true;fwScore+=10+Math.min(fwStreak,5)*2;fwStreak++;fwBest=Math.max(fwBest,fwStreak);btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800','fw-correct');const fb=document.getElementById('fw-feedback');if(fb)fb.innerHTML=`🎉 Chính xác! <span class="text-emerald-700 ml-1">${correct}</span>`;if(typeof playAudio==='function')playAudio('correct');if(typeof confetti==='function')confetti({particleCount:50,spread:65,origin:{y:.72}});if(typeof speakVietnamese==='function')speakVietnamese(`${correct}. Chính xác!`,1.0);fwLater_(fwNext,1200);}else{fwStreak=0;btn.classList.add('fw-shake','border-rose-400','bg-rose-50');fwLater_(()=>btn.classList.remove('fw-shake','border-rose-400','bg-rose-50'),360);const fb=document.getElementById('fw-feedback');if(fb)fb.textContent='🔎 Chưa đúng rồi. Bé nhìn lại trang phục của nhân vật nhé!';if(typeof playAudio==='function')playAudio('wrong');}}
window.startFamilyClothesGame=startFamilyClothesGame;window.fwChoose=fwChoose;

function stopFamilyClothesGame(){fwCancelTimers_(); try{ fwLocked=true; }catch(_){} try{ if(typeof stopSpeaking==='function') stopSpeaking(); }catch(_){} }
window.stopFamilyClothesGame=stopFamilyClothesGame;
