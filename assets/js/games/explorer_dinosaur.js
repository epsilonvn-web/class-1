(() => {
  "use strict";

  /* =====================================================================
     Khám phá khủng long — bản nâng cấp
     Giữ nguyên giao diện module: window.CLASS1_GAME_MODULES.dinosaurExplorer
     = { render(context), destroy() }, context.host, context.hooks.setSubBanner
     ===================================================================== */

  const CONFIG = Object.freeze({
    moduleKey: "dinosaurExplorer",
    styleId: "class1-game-dinosaur-explorer-style-v2",
    fontId: "class1-game-dinosaur-explorer-font",
    rootId: "dinosaur-explorer",
    title: "Khám phá khủng long",
    subtitle: "Cùng Cô Thỏ Hồng du hành về thế giới cổ đại",
    storageKey: "class1.dinosaurExplorer.found.v1",
    roundSize: 10
  });

  const DATA = Object.freeze({"overview": {"id": "dino-overview", "name": "Thế giới khủng long", "icon": "🦖", "subtitle": "Những sinh vật cổ đại kỳ thú", "summary": "Khủng long là một nhóm bò sát sống trên Trái Đất hàng triệu năm trước, chủ yếu trong Đại Trung Sinh. Chúng có rất nhiều kích thước và hình dạng khác nhau.", "more": "Không phải mọi sinh vật cổ đại đều là khủng long. Pterosaur bay và các bò sát biển như mosasaur không thuộc nhóm khủng long. Chim hiện đại là hậu duệ còn sống của một nhánh khủng long chân thú.", "remember": "Bé nhớ: khủng long không sống cùng con người. Ta biết về chúng chủ yếu nhờ hóa thạch.", "facts": [{"label": "Thời đại", "value": "Đại Trung Sinh"}, {"label": "Khoảng thời gian", "value": "Từ hơn 230 triệu năm trước tới 66 triệu năm trước"}, {"label": "Dấu vết", "value": "Hóa thạch"}, {"label": "Đa dạng", "value": "Ăn cỏ, ăn thịt, hai chân hoặc bốn chân"}, {"label": "Không phải khủng long", "value": "Pterosaur và mosasaur"}, {"label": "Hậu duệ còn sống", "value": "Chim"}]}, "primary": [{"id": "trex", "name": "Tyrannosaurus rex", "icon": "🦖", "subtitle": "Kẻ săn mồi lớn cuối kỷ Phấn Trắng", "summary": "Tyrannosaurus rex, thường gọi T. rex, là khủng long ăn thịt lớn sống ở Bắc Mỹ vào cuối kỷ Phấn Trắng.", "more": "T. rex đi bằng hai chân, có đầu lớn, hàm rất khỏe và những chiếc răng lớn. Hai tay trước ngắn nhưng cơ thể và chân sau rất mạnh.", "remember": "T. rex không sống cùng Stegosaurus; hai loài cách nhau hàng chục triệu năm.", "facts": [{"label": "Thức ăn", "value": "Ăn thịt"}, {"label": "Đi lại", "value": "Hai chân"}, {"label": "Thời kỳ", "value": "Cuối kỷ Phấn Trắng"}, {"label": "Điểm nổi bật", "value": "Hàm khỏe, răng lớn"}]}, {"id": "triceratops", "name": "Triceratops", "icon": "🦏", "subtitle": "Ba sừng và tấm bờm lớn", "summary": "Triceratops là khủng long ăn thực vật sống vào cuối kỷ Phấn Trắng.", "more": "Nó có ba chiếc sừng nổi bật và một tấm bờm xương lớn phía sau đầu. Triceratops đi bằng bốn chân.", "remember": "Triceratops sống cùng thời với T. rex.", "facts": [{"label": "Thức ăn", "value": "Ăn thực vật"}, {"label": "Đi lại", "value": "Bốn chân"}, {"label": "Thời kỳ", "value": "Cuối kỷ Phấn Trắng"}, {"label": "Điểm nổi bật", "value": "Ba sừng và bờm xương"}]}, {"id": "stegosaurus", "name": "Stegosaurus", "icon": "🦕", "subtitle": "Những tấm xương lớn trên lưng", "summary": "Stegosaurus là khủng long ăn thực vật sống vào cuối kỷ Jura.", "more": "Nó có hai hàng tấm xương lớn dọc lưng và các gai ở cuối đuôi. Đầu của Stegosaurus khá nhỏ so với cơ thể.", "remember": "Stegosaurus sống trước T. rex rất lâu.", "facts": [{"label": "Thức ăn", "value": "Ăn thực vật"}, {"label": "Thời kỳ", "value": "Cuối kỷ Jura"}, {"label": "Trên lưng", "value": "Các tấm xương lớn"}, {"label": "Đuôi", "value": "Có gai"}]}, {"id": "brachiosaurus", "name": "Brachiosaurus", "icon": "🦕", "subtitle": "Cổ dài, chân trước cao", "summary": "Brachiosaurus là khủng long sauropod ăn thực vật có cổ dài, sống vào cuối kỷ Jura.", "more": "Điểm nổi bật là chân trước dài hơn chân sau, làm phần vai cao. Cổ dài giúp nó với tới lá ở trên cao.", "remember": "Brachiosaurus đi bằng bốn chân và có cơ thể rất lớn.", "facts": [{"label": "Nhóm", "value": "Sauropod"}, {"label": "Thức ăn", "value": "Ăn thực vật"}, {"label": "Thời kỳ", "value": "Cuối kỷ Jura"}, {"label": "Đặc điểm", "value": "Chân trước dài hơn chân sau"}]}, {"id": "velociraptor", "name": "Velociraptor", "icon": "🪶", "subtitle": "Nhỏ, nhanh nhẹn và có lông vũ", "summary": "Velociraptor là khủng long chân thú nhỏ sống vào cuối kỷ Phấn Trắng ở châu Á.", "more": "Bằng chứng hóa thạch cho thấy nó có lông vũ. Nó có một móng cong lớn trên ngón chân thứ hai.", "remember": "Velociraptor thật nhỏ hơn rất nhiều so với hình ảnh thường thấy trong phim.", "facts": [{"label": "Kích thước", "value": "Nhỏ hơn nhiều so với người trưởng thành"}, {"label": "Thời kỳ", "value": "Cuối kỷ Phấn Trắng"}, {"label": "Cơ thể", "value": "Có lông vũ"}, {"label": "Bàn chân", "value": "Có móng cong lớn"}]}, {"id": "ankylosaurus", "name": "Ankylosaurus", "icon": "🛡️", "subtitle": "Bộ giáp xương và chùy đuôi", "summary": "Ankylosaurus là khủng long ăn thực vật sống vào cuối kỷ Phấn Trắng.", "more": "Cơ thể được bảo vệ bởi các tấm xương dưới da. Phần đuôi có chùy xương lớn có thể dùng để tự vệ.", "remember": "Ankylosaurus đi bằng bốn chân và có thân thấp, rộng.", "facts": [{"label": "Thức ăn", "value": "Ăn thực vật"}, {"label": "Bảo vệ", "value": "Giáp xương"}, {"label": "Đuôi", "value": "Có chùy xương"}, {"label": "Thời kỳ", "value": "Cuối kỷ Phấn Trắng"}]}, {"id": "parasaurolophus", "name": "Parasaurolophus", "icon": "🎺", "subtitle": "Mào dài trên đầu", "summary": "Parasaurolophus là khủng long mỏ vịt ăn thực vật sống vào cuối kỷ Phấn Trắng.", "more": "Nó có chiếc mào dài và rỗng phía sau đầu. Các nhà khoa học cho rằng chiếc mào có thể liên quan tới phát âm và nhận biết nhau.", "remember": "Parasaurolophus có thể đi bằng hai chân hoặc bốn chân.", "facts": [{"label": "Nhóm", "value": "Khủng long mỏ vịt"}, {"label": "Thức ăn", "value": "Ăn thực vật"}, {"label": "Điểm nổi bật", "value": "Mào dài rỗng"}, {"label": "Thời kỳ", "value": "Cuối kỷ Phấn Trắng"}]}, {"id": "spinosaurus", "name": "Spinosaurus", "icon": "🦖", "subtitle": "Chiếc buồm cao trên lưng", "summary": "Spinosaurus là khủng long ăn thịt sống trong kỷ Phấn Trắng ở Bắc Phi.", "more": "Nó có mõm dài giống cá sấu và các gai sống lưng rất cao tạo thành cấu trúc giống cánh buồm. Hóa thạch cho thấy nó có nhiều thích nghi với môi trường sông nước và ăn cả cá.", "remember": "Cách Spinosaurus di chuyển và sống dưới nước đến mức nào vẫn là chủ đề được nghiên cứu.", "facts": [{"label": "Thức ăn", "value": "Ăn thịt, có cả cá"}, {"label": "Thời kỳ", "value": "Kỷ Phấn Trắng"}, {"label": "Đầu", "value": "Mõm dài"}, {"label": "Điểm nổi bật", "value": "Gai lưng cao như cánh buồm"}]}, {"id": "diplodocus", "name": "Diplodocus", "icon": "🦕", "subtitle": "Cổ dài và đuôi rất dài", "summary": "Diplodocus là khủng long sauropod ăn thực vật sống vào cuối kỷ Jura ở Bắc Mỹ.", "more": "Nó có cổ dài, đầu nhỏ và chiếc đuôi rất dài. Cơ thể lớn nhưng xương có nhiều đặc điểm giúp giảm khối lượng.", "remember": "Diplodocus đi bằng bốn chân và ăn thực vật.", "facts": [{"label": "Nhóm", "value": "Sauropod"}, {"label": "Thức ăn", "value": "Ăn thực vật"}, {"label": "Thời kỳ", "value": "Cuối kỷ Jura"}, {"label": "Đặc điểm", "value": "Cổ dài và đuôi rất dài"}]}], "secondary": [{"id": "triassic", "name": "Kỷ Trias", "icon": "1️⃣", "subtitle": "Giai đoạn đầu của Đại Trung Sinh", "summary": "Kỷ Trias bắt đầu khoảng 252 triệu năm trước. Những khủng long đầu tiên xuất hiện trong kỷ này.", "more": "Lúc đầu khủng long chưa chiếm ưu thế như ở các giai đoạn sau. Các lục địa khi đó còn nối thành siêu lục địa Pangaea.", "remember": "Trias là kỷ đầu tiên trong ba kỷ của Đại Trung Sinh.", "facts": [{"label": "Thứ tự", "value": "Đầu tiên"}, {"label": "Bắt đầu", "value": "Khoảng 252 triệu năm trước"}, {"label": "Sự kiện", "value": "Khủng long đầu tiên xuất hiện"}, {"label": "Lục địa", "value": "Pangaea còn tồn tại"}]}, {"id": "jurassic", "name": "Kỷ Jura", "icon": "2️⃣", "subtitle": "Thời của nhiều khủng long khổng lồ", "summary": "Kỷ Jura diễn ra sau kỷ Trias và trước kỷ Phấn Trắng.", "more": "Nhiều sauropod cổ dài rất lớn sống trong kỷ Jura, cùng các loài như Stegosaurus. Những dạng chim sơ khai cũng xuất hiện.", "remember": "Stegosaurus và Diplodocus thuộc kỷ Jura, không sống cùng T. rex.", "facts": [{"label": "Thứ tự", "value": "Thứ hai"}, {"label": "Sau", "value": "Kỷ Trias"}, {"label": "Trước", "value": "Kỷ Phấn Trắng"}, {"label": "Loài nổi bật", "value": "Stegosaurus, Diplodocus"}]}, {"id": "cretaceous", "name": "Kỷ Phấn Trắng", "icon": "3️⃣", "subtitle": "Kỷ cuối của Đại Trung Sinh", "summary": "Kỷ Phấn Trắng kéo dài tới khoảng 66 triệu năm trước và là kỷ cuối cùng của Đại Trung Sinh.", "more": "T. rex, Triceratops, Velociraptor và Ankylosaurus sống trong kỷ này. Cuối kỷ xảy ra một sự kiện tuyệt chủng hàng loạt.", "remember": "Nhiều khủng long nổi tiếng sống ở Phấn Trắng chứ không phải cùng thời với các loài Jura.", "facts": [{"label": "Thứ tự", "value": "Cuối cùng"}, {"label": "Kết thúc", "value": "Khoảng 66 triệu năm trước"}, {"label": "Loài nổi bật", "value": "T. rex, Triceratops"}, {"label": "Cuối kỷ", "value": "Tuyệt chủng hàng loạt"}]}, {"id": "fossil", "name": "Hóa thạch", "icon": "🪨", "subtitle": "Dấu vết của sinh vật cổ", "summary": "Hóa thạch là phần còn lại hoặc dấu vết của sinh vật sống trong quá khứ được bảo tồn trong đá hoặc vật liệu khác.", "more": "Xương, răng, dấu chân, trứng, phân hóa thạch và dấu in lá đều có thể trở thành hóa thạch.", "remember": "Hóa thạch giúp ta tìm hiểu sinh vật đã sống như thế nào dù chúng đã biến mất từ rất lâu.", "facts": [{"label": "Có thể là", "value": "Xương hoặc răng"}, {"label": "Cũng có thể là", "value": "Dấu chân"}, {"label": "Nơi thường gặp", "value": "Trong các lớp đá"}, {"label": "Giúp biết", "value": "Sự sống trong quá khứ"}]}, {"id": "paleontologist", "name": "Nhà cổ sinh vật học", "icon": "🔎", "subtitle": "Người nghiên cứu sự sống cổ đại", "summary": "Nhà cổ sinh vật học nghiên cứu hóa thạch để hiểu các sinh vật và môi trường sống trong quá khứ.", "more": "Họ khai quật cẩn thận, ghi lại vị trí mẫu vật, so sánh xương và dùng nhiều phương pháp khoa học khác nhau.", "remember": "Tìm hóa thạch không giống săn kho báu; cần ghi chép và bảo tồn thông tin khoa học.", "facts": [{"label": "Nghiên cứu", "value": "Hóa thạch"}, {"label": "Mục tiêu", "value": "Hiểu sự sống cổ đại"}, {"label": "Khi khai quật", "value": "Cần cẩn thận"}, {"label": "Công việc", "value": "Ghi chép, so sánh, phân tích"}]}, {"id": "extinction", "name": "Sự tuyệt chủng cuối Phấn Trắng", "icon": "☄️", "subtitle": "Biến cố lớn khoảng 66 triệu năm trước", "summary": "Khoảng 66 triệu năm trước, một tiểu hành tinh lớn va vào Trái Đất và góp phần gây ra biến đổi môi trường nghiêm trọng.", "more": "Sự kiện này liên quan tới cuộc tuyệt chủng làm biến mất các khủng long không phải chim cùng nhiều sinh vật khác. Một số nhóm, trong đó có tổ tiên của chim hiện đại, sống sót.", "remember": "Không phải mọi dạng sống đều biến mất; chim là nhánh khủng long còn tồn tại đến hôm nay.", "facts": [{"label": "Thời điểm", "value": "Khoảng 66 triệu năm trước"}, {"label": "Nguyên nhân lớn", "value": "Va chạm tiểu hành tinh"}, {"label": "Biến mất", "value": "Khủng long không phải chim"}, {"label": "Còn sống", "value": "Nhánh dẫn tới chim hiện đại"}]}], "quiz": [{"q": "Khủng long sống chủ yếu trong đại nào?", "a": ["Đại Trung Sinh", "Đại Băng Hà hiện đại", "Thời kỳ đồ đá của con người", "Thời đại máy hơi nước"], "c": 0, "note": "Khủng long sống chủ yếu trong Đại Trung Sinh."}, {"q": "Khủng long có sống cùng con người không?", "a": ["Không", "Có, cùng thời", "Chỉ ở thành phố", "Chỉ ở châu Âu"], "c": 0, "note": "Khủng long không sống cùng con người."}, {"q": "Ta biết nhiều về khủng long nhờ gì?", "a": ["Hóa thạch", "Ảnh chụp cổ", "Phim hoạt hình", "Máy ghi âm"], "c": 0, "note": "Hóa thạch là nguồn bằng chứng quan trọng về khủng long."}, {"q": "Pterosaur bay có phải là khủng long không?", "a": ["Không", "Có", "Chỉ con nhỏ mới là khủng long", "Chỉ khi có lông"], "c": 0, "note": "Pterosaur là bò sát bay, không phải khủng long."}, {"q": "Nhóm động vật hiện đại nào là hậu duệ của một nhánh khủng long?", "a": ["Chim", "Cá voi", "Ếch", "Giun"], "c": 0, "note": "Chim hiện đại là hậu duệ của khủng long chân thú."}, {"q": "Khủng long có tất cả cùng kích thước không?", "a": ["Không, rất đa dạng", "Có, đều khổng lồ", "Đều nhỏ bằng mèo", "Đều bằng nhau"], "c": 0, "note": "Khủng long có kích thước và hình dạng rất đa dạng."}, {"q": "T. rex ăn gì?", "a": ["Thịt", "Chỉ lá cây", "Chỉ hạt", "Chỉ cỏ"], "c": 0, "note": "T. rex là khủng long ăn thịt."}, {"q": "T. rex đi chủ yếu bằng mấy chân?", "a": ["Hai chân", "Bốn chân", "Sáu chân", "Không có chân"], "c": 0, "note": "T. rex đi bằng hai chân."}, {"q": "Đặc điểm nổi bật của T. rex là gì?", "a": ["Hàm khỏe và răng lớn", "Ba sừng", "Mào dài rỗng", "Vành giáp lưng"], "c": 0, "note": "T. rex có đầu lớn, hàm khỏe và răng lớn."}, {"q": "Triceratops có bao nhiêu sừng nổi bật?", "a": ["Ba", "Một", "Hai", "Sáu"], "c": 0, "note": "Tên Triceratops gợi tới ba sừng."}, {"q": "Triceratops ăn gì?", "a": ["Thực vật", "Thịt", "Cá", "Côn trùng"], "c": 0, "note": "Triceratops là khủng long ăn thực vật."}, {"q": "Triceratops sống cùng thời với loài nào?", "a": ["T. rex", "Stegosaurus", "Diplodocus", "Brachiosaurus"], "c": 0, "note": "Triceratops và T. rex cùng sống vào cuối kỷ Phấn Trắng."}, {"q": "Stegosaurus nổi bật với gì trên lưng?", "a": ["Các tấm xương lớn", "Cánh lông vũ", "Ba sừng", "Mào rỗng"], "c": 0, "note": "Stegosaurus có hai hàng tấm xương lớn dọc lưng."}, {"q": "Stegosaurus sống trong kỷ nào?", "a": ["Jura", "Trias đầu", "Phấn Trắng cuối", "Hiện đại"], "c": 0, "note": "Stegosaurus sống vào cuối kỷ Jura."}, {"q": "Đuôi Stegosaurus có gì?", "a": ["Các gai", "Một chùy tròn", "Lông dài", "Không có gì"], "c": 0, "note": "Cuối đuôi Stegosaurus có các gai."}, {"q": "Điểm đặc biệt ở chân Brachiosaurus là gì?", "a": ["Chân trước dài hơn chân sau", "Không có chân sau", "Chân sau dài gấp đôi", "Chỉ có hai chân"], "c": 0, "note": "Brachiosaurus có chân trước dài hơn chân sau."}, {"q": "Brachiosaurus thuộc nhóm nào?", "a": ["Sauropod cổ dài", "Khủng long ba sừng", "Khủng long giáp", "Khủng long mỏ vịt"], "c": 0, "note": "Brachiosaurus là một sauropod cổ dài."}, {"q": "Velociraptor thật có kích thước thế nào so với hình ảnh trong nhiều phim?", "a": ["Nhỏ hơn nhiều", "Lớn hơn gấp mười", "Bằng cá voi", "To như Brachiosaurus"], "c": 0, "note": "Velociraptor thật nhỏ hơn rất nhiều so với hình ảnh phổ biến trong phim."}, {"q": "Bằng chứng hóa thạch cho thấy Velociraptor có gì?", "a": ["Lông vũ", "Ba sừng", "Mai cứng như rùa", "Vòi dài"], "c": 0, "note": "Velociraptor có lông vũ."}, {"q": "Velociraptor có móng cong lớn ở đâu?", "a": ["Ngón chân thứ hai", "Đầu mũi", "Đuôi", "Cánh"], "c": 0, "note": "Velociraptor có móng cong lớn ở ngón chân thứ hai."}, {"q": "Ankylosaurus có cách bảo vệ nổi bật nào?", "a": ["Giáp xương và chùy đuôi", "Cánh lớn", "Ba sừng dài", "Mào rỗng"], "c": 0, "note": "Ankylosaurus có giáp xương và chùy đuôi."}, {"q": "Ankylosaurus ăn gì?", "a": ["Thực vật", "Chỉ cá", "Thịt", "Chỉ côn trùng"], "c": 0, "note": "Ankylosaurus là khủng long ăn thực vật."}, {"q": "Parasaurolophus nổi bật với gì?", "a": ["Mào dài rỗng", "Ba sừng", "Tấm lưng lớn", "Chùy đuôi"], "c": 0, "note": "Parasaurolophus có chiếc mào dài và rỗng."}, {"q": "Parasaurolophus thuộc nhóm nào?", "a": ["Khủng long mỏ vịt", "Khủng long giáp", "Sauropod", "Pterosaur"], "c": 0, "note": "Parasaurolophus là một hadrosaur, thường gọi khủng long mỏ vịt."}, {"q": "Spinosaurus có đặc điểm nổi bật nào trên lưng?", "a": ["Các gai rất cao tạo hình như cánh buồm", "Ba sừng", "Tấm giáp tròn", "Lông đuôi dài"], "c": 0, "note": "Spinosaurus có các gai sống lưng cao tạo cấu trúc giống cánh buồm."}, {"q": "Spinosaurus có mõm giống loài nào?", "a": ["Cá sấu", "Voi", "Ngựa", "Chim sẻ"], "c": 0, "note": "Spinosaurus có mõm dài giống cá sấu."}, {"q": "Diplodocus nổi bật với đặc điểm nào?", "a": ["Cổ dài và đuôi rất dài", "Ba sừng", "Cánh lớn", "Mào trên đầu"], "c": 0, "note": "Diplodocus có cổ dài và chiếc đuôi rất dài."}, {"q": "Diplodocus ăn gì?", "a": ["Thực vật", "Thịt", "Cá", "Chỉ trứng"], "c": 0, "note": "Diplodocus là khủng long ăn thực vật."}, {"q": "Kỷ đầu tiên của Đại Trung Sinh là gì?", "a": ["Trias", "Jura", "Phấn Trắng", "Đệ Tứ"], "c": 0, "note": "Trias là kỷ đầu của Đại Trung Sinh."}, {"q": "Những khủng long đầu tiên xuất hiện trong kỷ nào?", "a": ["Trias", "Phấn Trắng", "Sau Phấn Trắng", "Hiện đại"], "c": 0, "note": "Những khủng long đầu tiên xuất hiện trong kỷ Trias."}, {"q": "Kỷ nào nằm giữa Trias và Phấn Trắng?", "a": ["Jura", "Đệ Tam", "Băng Hà", "Không có kỷ nào"], "c": 0, "note": "Jura nằm giữa Trias và Phấn Trắng."}, {"q": "Stegosaurus và Diplodocus nổi bật ở kỷ nào?", "a": ["Jura", "Phấn Trắng cuối", "Hiện đại", "Trias sớm"], "c": 0, "note": "Stegosaurus và Diplodocus sống vào cuối kỷ Jura."}, {"q": "Kỷ cuối cùng của Đại Trung Sinh là gì?", "a": ["Phấn Trắng", "Trias", "Jura", "Đá mới"], "c": 0, "note": "Phấn Trắng là kỷ cuối của Đại Trung Sinh."}, {"q": "T. rex và Triceratops sống vào thời kỳ nào?", "a": ["Cuối kỷ Phấn Trắng", "Đầu kỷ Trias", "Cuối kỷ Jura", "Sau khi con người xuất hiện"], "c": 0, "note": "Cả hai sống vào cuối kỷ Phấn Trắng."}, {"q": "Hóa thạch có thể là gì?", "a": ["Xương, răng hoặc dấu chân cổ", "Chỉ đá không có dấu vết", "Chỉ lá cây hôm nay", "Chỉ ảnh chụp"], "c": 0, "note": "Hóa thạch có thể là phần còn lại hoặc dấu vết của sinh vật cổ."}, {"q": "Ai nghiên cứu hóa thạch và sự sống cổ đại?", "a": ["Nhà cổ sinh vật học", "Phi công", "Nhạc sĩ", "Đầu bếp"], "c": 0, "note": "Nhà cổ sinh vật học nghiên cứu hóa thạch."}, {"q": "Khi khai quật hóa thạch cần làm gì?", "a": ["Cẩn thận và ghi chép vị trí", "Đào thật nhanh rồi bỏ vị trí", "Đập đá tùy ý", "Mang đi mà không ghi gì"], "c": 0, "note": "Thông tin vị trí và bối cảnh rất quan trọng trong nghiên cứu."}, {"q": "Sự kiện tuyệt chủng lớn cuối kỷ Phấn Trắng xảy ra khoảng khi nào?", "a": ["66 triệu năm trước", "600 năm trước", "6 nghìn năm trước", "Hôm qua"], "c": 0, "note": "Sự kiện này xảy ra khoảng 66 triệu năm trước."}, {"q": "Một nguyên nhân lớn góp phần vào tuyệt chủng cuối Phấn Trắng là gì?", "a": ["Va chạm tiểu hành tinh lớn", "Mưa nhẹ", "Gió mùa", "Cầu vồng"], "c": 0, "note": "Va chạm tiểu hành tinh là nguyên nhân lớn của biến cố này."}, {"q": "Có phải mọi khủng long đều biến mất hoàn toàn không?", "a": ["Không, nhánh dẫn tới chim còn sống", "Có, không còn hậu duệ nào", "Chỉ cá sống sót", "Chỉ côn trùng sống sót"], "c": 0, "note": "Chim là nhánh khủng long còn tồn tại đến ngày nay."}]});

  /* ---------- Song ngữ Tiếng Việt / English ---------- */
  const I18N_EN = {"Chim": "Birds", "Sau": "After", "Giun": "Worms", "Ba": "Three", "Hai": "Two", "Jura": "Jurassic", "Voi": "Elephant", "Trias": "Triassic", "Stegosaurus, Diplodocus": "Stegosaurus, Diplodocus", "Thế giới khủng long": "The World of Dinosaurs", "Những sinh vật cổ đại kỳ thú": "Amazing ancient creatures", "Khủng long là một nhóm bò sát sống trên Trái Đất hàng triệu năm trước, chủ yếu trong Đại Trung Sinh. Chúng có rất nhiều kích thước và hình dạng khác nhau.": "Dinosaurs were a group of reptiles that lived on Earth millions of years ago, mostly during the Mesozoic Era. They came in many different sizes and shapes.", "Không phải mọi sinh vật cổ đại đều là khủng long. Pterosaur bay và các bò sát biển như mosasaur không thuộc nhóm khủng long. Chim hiện đại là hậu duệ còn sống của một nhánh khủng long chân thú.": "Not every ancient creature was a dinosaur. Flying pterosaurs and sea reptiles like mosasaurs were not dinosaurs. Modern birds are the living descendants of one branch of meat-eating theropod dinosaurs.", "Bé nhớ: khủng long không sống cùng con người. Ta biết về chúng chủ yếu nhờ hóa thạch.": "Remember: dinosaurs did not live at the same time as people. We know about them mainly from fossils.", "khủng long không sống cùng con người. Ta biết về chúng chủ yếu nhờ hóa thạch.": "Dinosaurs did not live at the same time as people. We know about them mainly from fossils.", "Thời đại": "Era", "Đại Trung Sinh": "Mesozoic Era", "Khoảng thời gian": "Time span", "Từ hơn 230 triệu năm trước tới 66 triệu năm trước": "From over 230 million years ago to 66 million years ago", "Dấu vết": "Clues", "Hóa thạch": "Fossils", "Đa dạng": "Variety", "Ăn cỏ, ăn thịt, hai chân hoặc bốn chân": "Plant-eaters, meat-eaters, two legs or four legs", "Không phải khủng long": "Not dinosaurs", "Pterosaur và mosasaur": "Pterosaurs and mosasaurs", "Hậu duệ còn sống": "Living descendants", "Kẻ săn mồi lớn cuối kỷ Phấn Trắng": "A big hunter of the Late Cretaceous", "Tyrannosaurus rex, thường gọi T. rex, là khủng long ăn thịt lớn sống ở Bắc Mỹ vào cuối kỷ Phấn Trắng.": "Tyrannosaurus rex, often called T. rex, was a large meat-eating dinosaur that lived in North America at the end of the Cretaceous Period.", "T. rex đi bằng hai chân, có đầu lớn, hàm rất khỏe và những chiếc răng lớn. Hai tay trước ngắn nhưng cơ thể và chân sau rất mạnh.": "T. rex walked on two legs and had a huge head, very strong jaws and big teeth. Its front arms were short, but its body and back legs were very powerful.", "T. rex không sống cùng Stegosaurus; hai loài cách nhau hàng chục triệu năm.": "T. rex did not live at the same time as Stegosaurus; tens of millions of years separate them.", "Thức ăn": "Food", "Ăn thịt": "Meat-eater", "Đi lại": "Walking", "Hai chân": "Two legs", "Thời kỳ": "Period", "Cuối kỷ Phấn Trắng": "Late Cretaceous", "Điểm nổi bật": "Highlight", "Hàm khỏe, răng lớn": "Strong jaws, big teeth", "Ba sừng và tấm bờm lớn": "Three horns and a big frill", "Triceratops là khủng long ăn thực vật sống vào cuối kỷ Phấn Trắng.": "Triceratops was a plant-eating dinosaur that lived at the end of the Cretaceous Period.", "Nó có ba chiếc sừng nổi bật và một tấm bờm xương lớn phía sau đầu. Triceratops đi bằng bốn chân.": "It had three big horns and a large bony frill behind its head. Triceratops walked on four legs.", "Triceratops sống cùng thời với T. rex.": "Triceratops lived at the same time as T. rex.", "Ăn thực vật": "Plant-eater", "Bốn chân": "Four legs", "Ba sừng và bờm xương": "Three horns and a bony frill", "Những tấm xương lớn trên lưng": "Big bony plates on its back", "Stegosaurus là khủng long ăn thực vật sống vào cuối kỷ Jura.": "Stegosaurus was a plant-eating dinosaur that lived in the Late Jurassic.", "Nó có hai hàng tấm xương lớn dọc lưng và các gai ở cuối đuôi. Đầu của Stegosaurus khá nhỏ so với cơ thể.": "It had two rows of big bony plates along its back and spikes at the end of its tail. Its head was quite small for its body.", "Stegosaurus sống trước T. rex rất lâu.": "Stegosaurus lived long before T. rex.", "Cuối kỷ Jura": "Late Jurassic", "Trên lưng": "On its back", "Các tấm xương lớn": "Big bony plates", "Đuôi": "Tail", "Có gai": "Has spikes", "Cổ dài, chân trước cao": "Long neck, tall front legs", "Brachiosaurus là khủng long sauropod ăn thực vật có cổ dài, sống vào cuối kỷ Jura.": "Brachiosaurus was a long-necked, plant-eating sauropod that lived in the Late Jurassic.", "Điểm nổi bật là chân trước dài hơn chân sau, làm phần vai cao. Cổ dài giúp nó với tới lá ở trên cao.": "Its front legs were longer than its back legs, so its shoulders were high. Its long neck helped it reach leaves high up.", "Brachiosaurus đi bằng bốn chân và có cơ thể rất lớn.": "Brachiosaurus walked on four legs and had a huge body.", "Nhóm": "Group", "Đặc điểm": "Features", "Chân trước dài hơn chân sau": "Front legs longer than back legs", "Nhỏ, nhanh nhẹn và có lông vũ": "Small, quick and feathered", "Velociraptor là khủng long chân thú nhỏ sống vào cuối kỷ Phấn Trắng ở châu Á.": "Velociraptor was a small theropod dinosaur that lived in Asia at the end of the Cretaceous Period.", "Bằng chứng hóa thạch cho thấy nó có lông vũ. Nó có một móng cong lớn trên ngón chân thứ hai.": "Fossil evidence shows it had feathers. It had a big curved claw on its second toe.", "Velociraptor thật nhỏ hơn rất nhiều so với hình ảnh thường thấy trong phim.": "The real Velociraptor was much smaller than it looks in many movies.", "Kích thước": "Size", "Nhỏ hơn nhiều so với người trưởng thành": "Much smaller than a grown-up", "Cơ thể": "Body", "Có lông vũ": "Has feathers", "Bàn chân": "Feet", "Có móng cong lớn": "Has a big curved claw", "Bộ giáp xương và chùy đuôi": "Bony armor and a tail club", "Ankylosaurus là khủng long ăn thực vật sống vào cuối kỷ Phấn Trắng.": "Ankylosaurus was a plant-eating dinosaur that lived at the end of the Cretaceous Period.", "Cơ thể được bảo vệ bởi các tấm xương dưới da. Phần đuôi có chùy xương lớn có thể dùng để tự vệ.": "Its body was protected by bony plates in its skin. Its tail ended in a big bony club it could use to defend itself.", "Ankylosaurus đi bằng bốn chân và có thân thấp, rộng.": "Ankylosaurus walked on four legs and had a low, wide body.", "Bảo vệ": "Protection", "Giáp xương": "Bony armor", "Có chùy xương": "Has a bony club", "Mào dài trên đầu": "A long crest on its head", "Parasaurolophus là khủng long mỏ vịt ăn thực vật sống vào cuối kỷ Phấn Trắng.": "Parasaurolophus was a plant-eating duck-billed dinosaur that lived at the end of the Cretaceous Period.", "Nó có chiếc mào dài và rỗng phía sau đầu. Các nhà khoa học cho rằng chiếc mào có thể liên quan tới phát âm và nhận biết nhau.": "It had a long, hollow crest at the back of its head. Scientists think the crest may have helped it make sounds and recognize others.", "Parasaurolophus có thể đi bằng hai chân hoặc bốn chân.": "Parasaurolophus could walk on two legs or four legs.", "Khủng long mỏ vịt": "Duck-billed dinosaur", "Mào dài rỗng": "Long hollow crest", "Chiếc buồm cao trên lưng": "A tall sail on its back", "Spinosaurus là khủng long ăn thịt sống trong kỷ Phấn Trắng ở Bắc Phi.": "Spinosaurus was a meat-eating dinosaur that lived in North Africa during the Cretaceous Period.", "Nó có mõm dài giống cá sấu và các gai sống lưng rất cao tạo thành cấu trúc giống cánh buồm. Hóa thạch cho thấy nó có nhiều thích nghi với môi trường sông nước và ăn cả cá.": "It had a long snout like a crocodile and very tall back spines that formed a sail-like shape. Fossils show it had many adaptations for life near rivers and it also ate fish.", "Cách Spinosaurus di chuyển và sống dưới nước đến mức nào vẫn là chủ đề được nghiên cứu.": "How Spinosaurus moved and how much it lived in water are still being studied.", "Ăn thịt, có cả cá": "Meat-eater, including fish", "Kỷ Phấn Trắng": "Cretaceous Period", "Đầu": "Head", "Mõm dài": "Long snout", "Gai lưng cao như cánh buồm": "Tall back spines like a sail", "Cổ dài và đuôi rất dài": "Long neck and very long tail", "Diplodocus là khủng long sauropod ăn thực vật sống vào cuối kỷ Jura ở Bắc Mỹ.": "Diplodocus was a plant-eating sauropod that lived in North America in the Late Jurassic.", "Nó có cổ dài, đầu nhỏ và chiếc đuôi rất dài. Cơ thể lớn nhưng xương có nhiều đặc điểm giúp giảm khối lượng.": "It had a long neck, a small head and a very long tail. Its body was huge, but its bones had features that made them lighter.", "Diplodocus đi bằng bốn chân và ăn thực vật.": "Diplodocus walked on four legs and ate plants.", "Kỷ Trias": "Triassic Period", "Giai đoạn đầu của Đại Trung Sinh": "The early part of the Mesozoic Era", "Kỷ Trias bắt đầu khoảng 252 triệu năm trước. Những khủng long đầu tiên xuất hiện trong kỷ này.": "The Triassic began about 252 million years ago. The very first dinosaurs appeared during this period.", "Lúc đầu khủng long chưa chiếm ưu thế như ở các giai đoạn sau. Các lục địa khi đó còn nối thành siêu lục địa Pangaea.": "At first, dinosaurs were not yet in charge like they were later. The continents were still joined together in a supercontinent called Pangaea.", "Trias là kỷ đầu tiên trong ba kỷ của Đại Trung Sinh.": "The Triassic was the first of the three periods of the Mesozoic Era.", "Thứ tự": "Order", "Đầu tiên": "First", "Bắt đầu": "Began", "Khoảng 252 triệu năm trước": "About 252 million years ago", "Sự kiện": "Event", "Khủng long đầu tiên xuất hiện": "The first dinosaurs appeared", "Lục địa": "Continents", "Pangaea còn tồn tại": "Pangaea still existed", "Kỷ Jura": "Jurassic Period", "Thời của nhiều khủng long khổng lồ": "The time of many giant dinosaurs", "Kỷ Jura diễn ra sau kỷ Trias và trước kỷ Phấn Trắng.": "The Jurassic came after the Triassic and before the Cretaceous.", "Nhiều sauropod cổ dài rất lớn sống trong kỷ Jura, cùng các loài như Stegosaurus. Những dạng chim sơ khai cũng xuất hiện.": "Many huge long-necked sauropods lived in the Jurassic, along with animals like Stegosaurus. Early birds also appeared.", "Stegosaurus và Diplodocus thuộc kỷ Jura, không sống cùng T. rex.": "Stegosaurus and Diplodocus belong to the Jurassic; they did not live with T. rex.", "Thứ hai": "Second", "Trước": "Before", "Loài nổi bật": "Famous animals", "Kỷ cuối của Đại Trung Sinh": "The last period of the Mesozoic Era", "Kỷ Phấn Trắng kéo dài tới khoảng 66 triệu năm trước và là kỷ cuối cùng của Đại Trung Sinh.": "The Cretaceous lasted until about 66 million years ago and was the last period of the Mesozoic Era.", "T. rex, Triceratops, Velociraptor và Ankylosaurus sống trong kỷ này. Cuối kỷ xảy ra một sự kiện tuyệt chủng hàng loạt.": "T. rex, Triceratops, Velociraptor and Ankylosaurus lived in this period. At its end, a mass extinction happened.", "Nhiều khủng long nổi tiếng sống ở Phấn Trắng chứ không phải cùng thời với các loài Jura.": "Many famous dinosaurs lived in the Cretaceous, not at the same time as the Jurassic animals.", "Cuối cùng": "Last", "Kết thúc": "Ended", "Khoảng 66 triệu năm trước": "About 66 million years ago", "Cuối kỷ": "End of the period", "Tuyệt chủng hàng loạt": "Mass extinction", "Dấu vết của sinh vật cổ": "Clues of ancient life", "Hóa thạch là phần còn lại hoặc dấu vết của sinh vật sống trong quá khứ được bảo tồn trong đá hoặc vật liệu khác.": "A fossil is the remains or trace of a living thing from the past, preserved in rock or other materials.", "Xương, răng, dấu chân, trứng, phân hóa thạch và dấu in lá đều có thể trở thành hóa thạch.": "Bones, teeth, footprints, eggs, fossilized poop and leaf prints can all become fossils.", "Hóa thạch giúp ta tìm hiểu sinh vật đã sống như thế nào dù chúng đã biến mất từ rất lâu.": "Fossils help us learn how living things lived, even though they disappeared long ago.", "Có thể là": "Can be", "Xương hoặc răng": "Bones or teeth", "Cũng có thể là": "Can also be", "Dấu chân": "Footprints", "Nơi thường gặp": "Often found", "Trong các lớp đá": "In layers of rock", "Giúp biết": "Helps us learn about", "Sự sống trong quá khứ": "Life in the past", "Nhà cổ sinh vật học": "Paleontologist", "Người nghiên cứu sự sống cổ đại": "A person who studies ancient life", "Nhà cổ sinh vật học nghiên cứu hóa thạch để hiểu các sinh vật và môi trường sống trong quá khứ.": "Paleontologists study fossils to understand living things and their environments in the past.", "Họ khai quật cẩn thận, ghi lại vị trí mẫu vật, so sánh xương và dùng nhiều phương pháp khoa học khác nhau.": "They dig carefully, record where each find was, compare bones and use many different science methods.", "Tìm hóa thạch không giống săn kho báu; cần ghi chép và bảo tồn thông tin khoa học.": "Finding fossils is not like a treasure hunt; scientists must record and protect the information.", "Nghiên cứu": "Studies", "Mục tiêu": "Goal", "Hiểu sự sống cổ đại": "Understand ancient life", "Khi khai quật": "When digging", "Cần cẩn thận": "Be careful", "Công việc": "Work", "Ghi chép, so sánh, phân tích": "Recording, comparing, analyzing", "Sự tuyệt chủng cuối Phấn Trắng": "The end-Cretaceous extinction", "Biến cố lớn khoảng 66 triệu năm trước": "A huge event about 66 million years ago", "Khoảng 66 triệu năm trước, một tiểu hành tinh lớn va vào Trái Đất và góp phần gây ra biến đổi môi trường nghiêm trọng.": "About 66 million years ago, a large asteroid hit Earth and helped cause serious changes to the environment.", "Sự kiện này liên quan tới cuộc tuyệt chủng làm biến mất các khủng long không phải chim cùng nhiều sinh vật khác. Một số nhóm, trong đó có tổ tiên của chim hiện đại, sống sót.": "This event is linked to the extinction that wiped out the non-bird dinosaurs and many other living things. Some groups, including the ancestors of modern birds, survived.", "Không phải mọi dạng sống đều biến mất; chim là nhánh khủng long còn tồn tại đến hôm nay.": "Not all life disappeared; birds are the branch of dinosaurs that still lives today.", "Thời điểm": "When", "Nguyên nhân lớn": "Main cause", "Va chạm tiểu hành tinh": "Asteroid impact", "Biến mất": "Disappeared", "Khủng long không phải chim": "Non-bird dinosaurs", "Còn sống": "Survived", "Nhánh dẫn tới chim hiện đại": "The branch that led to modern birds", "Khủng long sống chủ yếu trong đại nào?": "In which era did dinosaurs mainly live?", "Đại Băng Hà hiện đại": "Modern Ice Age", "Thời kỳ đồ đá của con người": "Human Stone Age", "Thời đại máy hơi nước": "Steam engine age", "Khủng long sống chủ yếu trong Đại Trung Sinh.": "Dinosaurs lived mainly in the Mesozoic Era.", "Khủng long có sống cùng con người không?": "Did dinosaurs live at the same time as people?", "Không": "No", "Có, cùng thời": "Yes, at the same time", "Chỉ ở thành phố": "Only in cities", "Chỉ ở châu Âu": "Only in Europe", "Khủng long không sống cùng con người.": "Dinosaurs did not live at the same time as people.", "Ta biết nhiều về khủng long nhờ gì?": "How do we know so much about dinosaurs?", "Ảnh chụp cổ": "Old photos", "Phim hoạt hình": "Cartoons", "Máy ghi âm": "Tape recorders", "Hóa thạch là nguồn bằng chứng quan trọng về khủng long.": "Fossils are important evidence about dinosaurs.", "Pterosaur bay có phải là khủng long không?": "Were flying pterosaurs dinosaurs?", "Có": "Yes", "Chỉ con nhỏ mới là khủng long": "Only the small ones", "Chỉ khi có lông": "Only if they had feathers", "Pterosaur là bò sát bay, không phải khủng long.": "Pterosaurs were flying reptiles, not dinosaurs.", "Nhóm động vật hiện đại nào là hậu duệ của một nhánh khủng long?": "Which modern animal group descends from one branch of dinosaurs?", "Cá voi": "Whales", "Ếch": "Frogs", "Chim hiện đại là hậu duệ của khủng long chân thú.": "Modern birds descend from theropod dinosaurs.", "Khủng long có tất cả cùng kích thước không?": "Were all dinosaurs the same size?", "Không, rất đa dạng": "No, they were very different", "Có, đều khổng lồ": "Yes, all were giants", "Đều nhỏ bằng mèo": "All were as small as cats", "Đều bằng nhau": "All were equal", "Khủng long có kích thước và hình dạng rất đa dạng.": "Dinosaurs came in many sizes and shapes.", "T. rex ăn gì?": "What did T. rex eat?", "Thịt": "Meat", "Chỉ lá cây": "Only leaves", "Chỉ hạt": "Only seeds", "Chỉ cỏ": "Only grass", "T. rex là khủng long ăn thịt.": "T. rex was a meat-eating dinosaur.", "T. rex đi chủ yếu bằng mấy chân?": "How many legs did T. rex mainly walk on?", "Sáu chân": "Six legs", "Không có chân": "No legs", "T. rex đi bằng hai chân.": "T. rex walked on two legs.", "Đặc điểm nổi bật của T. rex là gì?": "What was special about T. rex?", "Hàm khỏe và răng lớn": "Strong jaws and big teeth", "Ba sừng": "Three horns", "Vành giáp lưng": "A ring of back armor", "T. rex có đầu lớn, hàm khỏe và răng lớn.": "T. rex had a big head, strong jaws and big teeth.", "Triceratops có bao nhiêu sừng nổi bật?": "How many big horns did Triceratops have?", "Một": "One", "Sáu": "Six", "Tên Triceratops gợi tới ba sừng.": "The name Triceratops means three horns.", "Triceratops ăn gì?": "What did Triceratops eat?", "Thực vật": "Plants", "Cá": "Fish", "Côn trùng": "Insects", "Triceratops là khủng long ăn thực vật.": "Triceratops was a plant-eating dinosaur.", "Triceratops sống cùng thời với loài nào?": "Which dinosaur lived at the same time as Triceratops?", "Triceratops và T. rex cùng sống vào cuối kỷ Phấn Trắng.": "Triceratops and T. rex both lived at the end of the Cretaceous.", "Stegosaurus nổi bật với gì trên lưng?": "What is Stegosaurus famous for on its back?", "Cánh lông vũ": "Feathered wings", "Mào rỗng": "A hollow crest", "Stegosaurus có hai hàng tấm xương lớn dọc lưng.": "Stegosaurus had two rows of big bony plates along its back.", "Stegosaurus sống trong kỷ nào?": "In which period did Stegosaurus live?", "Trias đầu": "Early Triassic", "Phấn Trắng cuối": "Late Cretaceous", "Hiện đại": "Modern times", "Stegosaurus sống vào cuối kỷ Jura.": "Stegosaurus lived in the Late Jurassic.", "Đuôi Stegosaurus có gì?": "What did Stegosaurus have on its tail?", "Các gai": "Spikes", "Một chùy tròn": "A round club", "Lông dài": "Long fur", "Không có gì": "Nothing", "Cuối đuôi Stegosaurus có các gai.": "Stegosaurus had spikes at the end of its tail.", "Điểm đặc biệt ở chân Brachiosaurus là gì?": "What was special about Brachiosaurus's legs?", "Không có chân sau": "No back legs", "Chân sau dài gấp đôi": "Back legs twice as long", "Chỉ có hai chân": "Only two legs", "Brachiosaurus có chân trước dài hơn chân sau.": "Brachiosaurus's front legs were longer than its back legs.", "Brachiosaurus thuộc nhóm nào?": "Which group does Brachiosaurus belong to?", "Sauropod cổ dài": "Long-necked sauropods", "Khủng long ba sừng": "Three-horned dinosaurs", "Khủng long giáp": "Armored dinosaurs", "Brachiosaurus là một sauropod cổ dài.": "Brachiosaurus was a long-necked sauropod.", "Velociraptor thật có kích thước thế nào so với hình ảnh trong nhiều phim?": "How big was the real Velociraptor compared to many movies?", "Nhỏ hơn nhiều": "Much smaller", "Lớn hơn gấp mười": "Ten times bigger", "Bằng cá voi": "As big as a whale", "To như Brachiosaurus": "As big as Brachiosaurus", "Velociraptor thật nhỏ hơn rất nhiều so với hình ảnh phổ biến trong phim.": "The real Velociraptor was much smaller than in popular movies.", "Bằng chứng hóa thạch cho thấy Velociraptor có gì?": "What does fossil evidence show Velociraptor had?", "Lông vũ": "Feathers", "Mai cứng như rùa": "A hard shell like a turtle", "Vòi dài": "A long trunk", "Velociraptor có lông vũ.": "Velociraptor had feathers.", "Velociraptor có móng cong lớn ở đâu?": "Where did Velociraptor have a big curved claw?", "Ngón chân thứ hai": "On its second toe", "Đầu mũi": "On its nose", "Cánh": "On its wings", "Velociraptor có móng cong lớn ở ngón chân thứ hai.": "Velociraptor had a big curved claw on its second toe.", "Ankylosaurus có cách bảo vệ nổi bật nào?": "How did Ankylosaurus protect itself?", "Giáp xương và chùy đuôi": "Bony armor and a tail club", "Cánh lớn": "Big wings", "Ba sừng dài": "Three long horns", "Ankylosaurus có giáp xương và chùy đuôi.": "Ankylosaurus had bony armor and a tail club.", "Ankylosaurus ăn gì?": "What did Ankylosaurus eat?", "Chỉ cá": "Only fish", "Chỉ côn trùng": "Only insects", "Ankylosaurus là khủng long ăn thực vật.": "Ankylosaurus was a plant-eating dinosaur.", "Parasaurolophus nổi bật với gì?": "What is Parasaurolophus famous for?", "Tấm lưng lớn": "Big back plates", "Chùy đuôi": "A tail club", "Parasaurolophus có chiếc mào dài và rỗng.": "Parasaurolophus had a long, hollow crest.", "Parasaurolophus thuộc nhóm nào?": "Which group does Parasaurolophus belong to?", "Parasaurolophus là một hadrosaur, thường gọi khủng long mỏ vịt.": "Parasaurolophus was a hadrosaur, often called a duck-billed dinosaur.", "Spinosaurus có đặc điểm nổi bật nào trên lưng?": "What special feature did Spinosaurus have on its back?", "Các gai rất cao tạo hình như cánh buồm": "Very tall spines shaped like a sail", "Tấm giáp tròn": "Round armor plates", "Lông đuôi dài": "Long tail feathers", "Spinosaurus có các gai sống lưng cao tạo cấu trúc giống cánh buồm.": "Spinosaurus had tall back spines forming a sail-like shape.", "Spinosaurus có mõm giống loài nào?": "Which animal does Spinosaurus's snout look like?", "Cá sấu": "Crocodile", "Ngựa": "Horse", "Chim sẻ": "Sparrow", "Spinosaurus có mõm dài giống cá sấu.": "Spinosaurus had a long snout like a crocodile.", "Diplodocus nổi bật với đặc điểm nào?": "What is Diplodocus famous for?", "Mào trên đầu": "A crest on its head", "Diplodocus có cổ dài và chiếc đuôi rất dài.": "Diplodocus had a long neck and a very long tail.", "Diplodocus ăn gì?": "What did Diplodocus eat?", "Chỉ trứng": "Only eggs", "Diplodocus là khủng long ăn thực vật.": "Diplodocus was a plant-eating dinosaur.", "Kỷ đầu tiên của Đại Trung Sinh là gì?": "What was the first period of the Mesozoic Era?", "Phấn Trắng": "Cretaceous", "Đệ Tứ": "Quaternary", "Trias là kỷ đầu của Đại Trung Sinh.": "The Triassic was the first period of the Mesozoic Era.", "Những khủng long đầu tiên xuất hiện trong kỷ nào?": "In which period did the first dinosaurs appear?", "Sau Phấn Trắng": "After the Cretaceous", "Những khủng long đầu tiên xuất hiện trong kỷ Trias.": "The first dinosaurs appeared in the Triassic.", "Kỷ nào nằm giữa Trias và Phấn Trắng?": "Which period came between the Triassic and the Cretaceous?", "Đệ Tam": "Tertiary", "Băng Hà": "Ice Age", "Không có kỷ nào": "There is none", "Jura nằm giữa Trias và Phấn Trắng.": "The Jurassic came between the Triassic and the Cretaceous.", "Stegosaurus và Diplodocus nổi bật ở kỷ nào?": "In which period did Stegosaurus and Diplodocus live?", "Trias sớm": "Early Triassic", "Stegosaurus và Diplodocus sống vào cuối kỷ Jura.": "Stegosaurus and Diplodocus lived in the Late Jurassic.", "Kỷ cuối cùng của Đại Trung Sinh là gì?": "What was the last period of the Mesozoic Era?", "Đá mới": "New Stone Age", "Phấn Trắng là kỷ cuối của Đại Trung Sinh.": "The Cretaceous was the last period of the Mesozoic Era.", "T. rex và Triceratops sống vào thời kỳ nào?": "When did T. rex and Triceratops live?", "Đầu kỷ Trias": "Early Triassic", "Sau khi con người xuất hiện": "After people appeared", "Cả hai sống vào cuối kỷ Phấn Trắng.": "Both lived at the end of the Cretaceous.", "Hóa thạch có thể là gì?": "What can a fossil be?", "Xương, răng hoặc dấu chân cổ": "Ancient bones, teeth or footprints", "Chỉ đá không có dấu vết": "Just rock with no traces", "Chỉ lá cây hôm nay": "Only today's leaves", "Chỉ ảnh chụp": "Only photos", "Hóa thạch có thể là phần còn lại hoặc dấu vết của sinh vật cổ.": "A fossil can be the remains or trace of an ancient living thing.", "Ai nghiên cứu hóa thạch và sự sống cổ đại?": "Who studies fossils and ancient life?", "Phi công": "Pilot", "Nhạc sĩ": "Musician", "Đầu bếp": "Chef", "Nhà cổ sinh vật học nghiên cứu hóa thạch.": "Paleontologists study fossils.", "Khi khai quật hóa thạch cần làm gì?": "What should you do when digging up fossils?", "Cẩn thận và ghi chép vị trí": "Be careful and record the location", "Đào thật nhanh rồi bỏ vị trí": "Dig fast and forget the location", "Đập đá tùy ý": "Smash the rocks anywhere", "Mang đi mà không ghi gì": "Take it away without recording anything", "Thông tin vị trí và bối cảnh rất quan trọng trong nghiên cứu.": "Information about the location and surroundings is very important for research.", "Sự kiện tuyệt chủng lớn cuối kỷ Phấn Trắng xảy ra khoảng khi nào?": "About when did the big extinction at the end of the Cretaceous happen?", "66 triệu năm trước": "66 million years ago", "600 năm trước": "600 years ago", "6 nghìn năm trước": "6 thousand years ago", "Hôm qua": "Yesterday", "Sự kiện này xảy ra khoảng 66 triệu năm trước.": "It happened about 66 million years ago.", "Một nguyên nhân lớn góp phần vào tuyệt chủng cuối Phấn Trắng là gì?": "What was one big cause of the end-Cretaceous extinction?", "Va chạm tiểu hành tinh lớn": "A large asteroid impact", "Mưa nhẹ": "Light rain", "Gió mùa": "Monsoon winds", "Cầu vồng": "A rainbow", "Va chạm tiểu hành tinh là nguyên nhân lớn của biến cố này.": "An asteroid impact was a major cause of this event.", "Có phải mọi khủng long đều biến mất hoàn toàn không?": "Did all dinosaurs disappear completely?", "Không, nhánh dẫn tới chim còn sống": "No, the branch that led to birds survived", "Có, không còn hậu duệ nào": "Yes, there are no descendants", "Chỉ cá sống sót": "Only fish survived", "Chỉ côn trùng sống sót": "Only insects survived", "Chim là nhánh khủng long còn tồn tại đến ngày nay.": "Birds are the branch of dinosaurs that still lives today.", "Khám phá khủng long": "Dinosaur Explorer", "Cùng Cô Thỏ Hồng du hành về thế giới cổ đại": "Travel back to the ancient world with Miss Pink Bunny", "252–201 triệu năm trước": "252–201 million years ago", "Khủng long đầu tiên xuất hiện ở kỷ này. Chúng còn nhỏ và chưa nhiều. Bé bấm sang kỷ Jura nhé!": "The first dinosaurs appeared in this period. They were still small and few. Tap over to the Jurassic!", "201–145 triệu năm trước": "201–145 million years ago", "Ba loài này đều sống ở kỷ Jura, trước T. rex rất lâu.": "These three all lived in the Jurassic, long before T. rex.", "145–66 triệu năm trước": "145–66 million years ago", "Các loài này cùng sống ở kỷ Phấn Trắng, nhưng không phải tất cả ở cùng một nơi, cùng một lúc.": "These animals all lived in the Cretaceous, but not all in the same place at the same time.", "⏹ Dừng đọc": "⏹ Stop reading", "Nghe cô đọc": "Listen to Teacher", "Chưa phát được giọng đọc. Con nhờ bố mẹ hoặc thầy cô kiểm tra loa và mạng, rồi bấm lại nhé.": "I couldn't play the voice. Ask a parent or teacher to check the speaker and the internet, then tap again.", "Bé nhớ nhé:": "Remember:", "🔊 Nghe cô đọc": "🔊 Listen to Teacher", "Bộ sưu tập": "Collection", "Chưa tìm thấy": "Not found yet", "Khủng long chưa tìm thấy": "Dinosaur not found yet", "Chạm vào từng con để xem nhé.": "Tap each one to take a look.", "Chọn thời kỳ": "Choose a period", "✓ Đã gặp": "✓ Met", "câu đúng": "correct", "Cô tự đọc câu hỏi": "Teacher reads the questions", "Mẹo: bấm phím 1, 2, 3, 4 để chọn đáp án.": "Tip: press 1, 2, 3, 4 to choose an answer.", "Đổi câu hỏi khác": "Try other questions", "Tuyệt vời! Con là nhà cổ sinh vật học nhí rồi!": "Amazing! You are a little paleontologist now!", "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé.": "Well done! Let's review the questions below.", "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.": "You tried hard! Let's review and play again.", "Con đúng": "You got", "câu": "questions", "Làm lại câu sai": "Retry wrong answers", "Chơi vòng mới": "Play a new round", "Đáp án đúng của các câu con chưa trả lời được:": "Correct answers to the questions you missed:", "Con chọn một đáp án nhé!": "Pick an answer!", "Chính xác!": "Correct!", "Chưa đúng rồi. Đáp án đúng là": "Not quite. The correct answer is", "Câu": "Question", "trên": "of", "Đọc câu hỏi": "Read the question", "🔊 Đọc câu hỏi": "🔊 Read the question", "Xem kết quả": "See results", "Câu tiếp theo": "Next question", "🏆 Con đã tìm đủ cả 9 loài khủng long! Giỏi quá!": "🏆 You found all 9 dinosaurs! Great job!", "🦕 Đã thêm": "🦕 Added", "vào bộ sưu tập (": "to your collection (", "Du hành thời gian": "Time Travel", "Khủng long": "Dinosaurs", "Thời đại & hóa thạch": "Eras & Fossils", "Hỏi đáp": "Quiz", "🔎 Con hãy tìm loài này trong tranh Du hành hoặc tab Khủng long nhé!": "🔎 Look for this dinosaur in the Time Travel picture or the Dinosaurs tab!", "câu.": "questions.", "Các khu vực khám phá": "Exploration areas", "🕰️ Du hành": "🕰️ Time Travel", "🦖 Khủng long": "🦖 Dinosaurs", "🪨 Thời đại & hóa thạch": "🪨 Eras & Fossils", "⭐ Hỏi đáp": "⭐ Quiz"};
  const LANG_KEY = "class1.explorer.lang";
  let LANG = (() => { try { return window.localStorage.getItem(LANG_KEY) === "en" ? "en" : "vi"; } catch (_) { return "vi"; } })();
  const I18N_KEYS = Object.keys(I18N_EN).sort((a, b) => b.length - a.length);
  const I18N_RE = new RegExp(I18N_KEYS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "gu");
  const isWordCh = (ch) => !!ch && /[\p{L}\p{N}]/u.test(ch);
  function trText(text) {
    if (LANG !== "en" || text == null) return text;
    let out = String(text).replace(I18N_RE, (m, off, str) => {
      if (isWordCh(m[0]) && isWordCh(str[off - 1])) return m;
      if (isWordCh(m[m.length - 1]) && isWordCh(str[off + m.length])) return m;
      return I18N_EN[m];
    });
    out = out.replace(/(\d),(\d{1,2})(?!\d)/g, "$1.$2").replace(/(\d)\.(\d{3})(?!\d)/g, "$1,$2").replace(/(\d)\.(\d{3})(?!\d)/g, "$1,$2");
    return out;
  }
  const TR_ATTRS = ["aria-label", "title", "placeholder"];
  function translateDom(node) {
    if (!node) return;
    const walk = (el) => {
      if (el.nodeType === 3) {
        if (el.__vi === undefined) el.__vi = el.nodeValue;
        const next = LANG === "en" ? trText(el.__vi) : el.__vi;
        if (el.nodeValue !== next) el.nodeValue = next;
        return;
      }
      if (el.nodeType !== 1 || el.tagName === "STYLE" || el.tagName === "SCRIPT" || (el.classList && el.classList.contains("gx-lang"))) return;
      for (const a of TR_ATTRS) {
        if (!el.hasAttribute(a)) continue;
        const k = "__vi_" + a;
        if (el[k] === undefined || (el.getAttribute(a) !== el[k + "_last"])) el[k] = el.getAttribute(a);
        const next = LANG === "en" ? trText(el[k]) : el[k];
        el[k + "_last"] = next;
        if (el.getAttribute(a) !== next) el.setAttribute(a, next);
      }
      el.childNodes.forEach(walk);
    };
    walk(node);
  }
  let langObserver = null, langRaf = 0;
  function watchLang(rootEl) {
    if (langObserver) langObserver.disconnect();
    if (typeof MutationObserver !== "function") return;
    langObserver = new MutationObserver(() => {
      if (LANG !== "en" || langRaf) return;
      langRaf = requestAnimationFrame(() => { langRaf = 0; if (rootEl && rootEl.isConnected) translateDom(rootEl); });
    });
    langObserver.observe(rootEl, { childList: true, subtree: true, characterData: true });
  }
  function enVoice() {
    if (!synth) return null;
    try {
      const all = synth.getVoices(), us = all.filter((v) => /^en[-_]US/i.test(v.lang));
      const female = [/aria/i, /jenny/i, /michelle/i, /ava/i, /samantha/i, /allison/i, /susan/i, /zira/i, /joanna/i, /salli/i, /emma/i, /google us english/i, /female/i];
      for (const re of female) { const v = us.find((x) => re.test(x.name || "")); if (v) return v; }
      const male = /guy|davis|tony|jason|eric|christopher|roger|andrew|brian|male|david|mark|alex|fred|daniel|tom|aaron/i;
      return us.find((v) => !male.test(v.name || "")) || us[0] || all.find((v) => /^en/i.test(v.lang)) || null;
    } catch (_) { return null; }
  }
  const LANG_CSS_ID = "class1-explorer-lang-style-v3";
  function injectLangCss() {
    if (document.getElementById(LANG_CSS_ID)) return;
    const st = document.createElement("style");
    st.id = LANG_CSS_ID;
    st.textContent = `.gx-head .gx-lang{margin-left:auto;align-self:center;display:inline-flex;gap:0;padding:3px;border:1px solid #BFDBFE;border-radius:17px;background:#fff;box-shadow:0 4px 12px rgba(59,130,246,.11);flex:none}
.gx-head .gx-lang button{font-family:inherit!important;min-height:39px;padding:.4rem .9rem;border:0;border-radius:13px;background:transparent;color:#1D4ED8!important;font-weight:800!important;font-size:16px!important;line-height:1.2!important;cursor:pointer;white-space:nowrap;transition:background .15s,color .15s}
.gx-head .gx-lang button:hover{color:#1D4ED8!important;background:#EFF6FF}
.gx-head .gx-lang button[aria-pressed="true"]{background:linear-gradient(90deg,#3B82F6,#14B8A6);color:#fff!important;box-shadow:0 3px 8px rgba(20,184,166,.18)}
.gx-head .gx-lang button:focus-visible{outline:3px solid #93C5FD;outline-offset:2px}
.gx-head .gx-lang + .gx-album{margin-left:0}
@media(max-width:760px){.gx-head .gx-lang{margin-left:auto}.gx-head .gx-lang + .gx-album{margin-left:0;width:100%}}
@media(max-width:390px){.gx-head .gx-lang{padding:3px}.gx-head .gx-lang button{padding:.35rem .65rem;font-size:14px!important;min-height:38px}}`;
    document.head.appendChild(st);
  }
  const langHtml = () => `<div class="gx-lang" role="group" aria-label="Ngôn ngữ / Language"><button type="button" data-lang="vi" aria-pressed="${LANG === "vi"}">Tiếng Việt</button><button type="button" data-lang="en" aria-pressed="${LANG === "en"}">English</button></div>`;
  function setLang(next) {
    LANG = next === "en" ? "en" : "vi";
    try { window.localStorage.setItem(LANG_KEY, LANG); } catch (_) {}
    try { stopSpeak(); } catch (_) {}
    if (!root) return;
    root.setAttribute("lang", LANG);
    root.querySelectorAll(".gx-lang [data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === LANG)));
    if (activeTab === "experience") renderStage();
    translateDom(root);
    setBanner();
  }


  /* Mỗi loài thuộc kỷ nào — dùng để xếp vào đúng bức tranh */
  const ERA_OF = Object.freeze({
    stegosaurus: "jurassic", brachiosaurus: "jurassic", diplodocus: "jurassic",
    trex: "cretaceous", triceratops: "cretaceous", velociraptor: "cretaceous",
    ankylosaurus: "cretaceous", parasaurolophus: "cretaceous", spinosaurus: "cretaceous"
  });
  const SHORT_NAME = Object.freeze({ trex: "T. rex", parasaurolophus: "Parasaurolophus" });
  const ERA_LABEL = Object.freeze({ triassic: "Kỷ Trias", jurassic: "Kỷ Jura", cretaceous: "Kỷ Phấn Trắng" });

  /* x, y = vị trí trái / đáy (%), w = chiều rộng (% bức tranh). Hàng sau đặt trước. */
  const SCENES = Object.freeze({
    triassic: {
      years: "252–201 triệu năm trước", span: 51,
      dinos: [],
      note: "Khủng long đầu tiên xuất hiện ở kỷ này. Chúng còn nhỏ và chưa nhiều. Bé bấm sang kỷ Jura nhé!"
    },
    jurassic: {
      years: "201–145 triệu năm trước", span: 56,
      dinos: [
        { id: "brachiosaurus", x: 1, y: 18, w: 42 },
        { id: "diplodocus", x: 54, y: 22, w: 43 },
        { id: "stegosaurus", x: 28, y: 3, w: 32 }
      ],
      note: "Ba loài này đều sống ở kỷ Jura, trước T. rex rất lâu."
    },
    cretaceous: {
      years: "145–66 triệu năm trước", span: 79,
      dinos: [
        { id: "parasaurolophus", x: 2, y: 34, w: 27 },
        { id: "spinosaurus", x: 34, y: 33, w: 30 },
        { id: "trex", x: 66, y: 30, w: 31 },
        { id: "triceratops", x: 3, y: 3, w: 31 },
        { id: "ankylosaurus", x: 38, y: 2, w: 28 },
        { id: "velociraptor", x: 74, y: 4, w: 21 }
      ],
      note: "Các loài này cùng sống ở kỷ Phấn Trắng, nhưng không phải tất cả ở cùng một nơi, cùng một lúc."
    }
  });

  /* ---------- Hình vẽ khủng long (SVG tự vẽ, không dùng emoji sai loài) ---------- */
  const EYE = (x, y) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#fff"/><circle cx="${x + 0.9}" cy="${y}" r="1.9" fill="#1d2420"/>`;
  const LEG = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2.4}" fill="${fill}"/>`;
  const ART = {
    trex() {
      const b = "#E0703F", d = "#A44B22", l = "#F7BE8E";
      return `
        <path d="M64 50 Q34 42 3 37 Q30 60 62 73Z" fill="${b}"/>
        <path d="M62 62 Q52 80 57 96 L68 96 Q66 84 74 70Z" fill="${d}"/><path d="M50 95h22v5H48z" fill="${d}"/>
        <ellipse cx="76" cy="58" rx="27" ry="19" transform="rotate(-14 76 58)" fill="${b}"/>
        <path d="M90 47 Q97 27 114 23 L140 25 Q149 27 149 35 L147 44 L119 46 Q108 49 101 62Z" fill="${b}"/>
        <path d="M119 46 L146 45 Q144 53 135 54 L116 52Z" fill="${l}"/>
        <path d="M123 46l2 3 2-3M129 46l2 3 2-3M135 46l2 3 2-3M141 46l1.5 3 1.5-3" fill="#fff"/>
        <path d="M78 66 Q74 82 81 96 L93 96 Q86 86 92 70Z" fill="${b}"/><path d="M77 95h22v5H75z" fill="${b}"/>
        <path d="M99 60 Q106 63 107 69" stroke="${d}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="82" cy="65" rx="16" ry="7" transform="rotate(-14 82 65)" fill="${l}" opacity=".75"/>
        <path d="M58 50q4 6 2 12M68 44q4 6 2 12M78 41q4 6 2 11" stroke="${d}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"/>
        ${EYE(131, 32)}`;
    },
    triceratops() {
      const b = "#4E9C8A", d = "#2F6B5D", f = "#F2C14E", h = "#FFF4D6";
      return `
        <path d="M40 58 Q18 60 5 70 Q22 72 42 73Z" fill="${b}"/>
        ${LEG(46, 70, 13, 28, d)}${LEG(86, 72, 13, 26, d)}
        <ellipse cx="66" cy="62" rx="35" ry="23" fill="${b}"/>
        <circle cx="108" cy="46" r="23" fill="${f}" stroke="${d}" stroke-width="2.5"/>
        <circle cx="108" cy="46" r="15" fill="#F7D57E"/>
        <path d="M100 52 Q118 43 138 55 L150 69 Q140 78 124 76 Q106 74 100 64Z" fill="${b}"/>
        <path d="M148 66 L157 73 L146 76Z" fill="${d}"/>
        <path d="M113 49 L139 21 L119 53Z" fill="${h}" stroke="${d}" stroke-width="1"/>
        <path d="M120 51 L154 28 L126 56Z" fill="${h}" stroke="${d}" stroke-width="1"/>
        <path d="M140 58 L148 47 L146 62Z" fill="${h}" stroke="${d}" stroke-width="1"/>
        ${LEG(56, 72, 13, 27, b)}${LEG(94, 74, 13, 25, b)}
        <ellipse cx="66" cy="70" rx="24" ry="8" fill="#7BC0AE" opacity=".6"/>
        ${EYE(127, 58)}`;
    },
    stegosaurus() {
      const b = "#8DB255", d = "#5E7E33", p = "#E8743B";
      const xs = [44, 56, 68, 80, 92, 104], hs = [12, 18, 23, 23, 18, 12];
      const plates = xs.map((x, i) => {
        const t = (x - 72) / 40, y = 64 - 22 * Math.sqrt(1 - t * t), hgt = hs[i];
        return `<path d="M${x - 6} ${y + 5} Q${x - 9} ${y - hgt * 0.5} ${x} ${y - hgt} Q${x + 9} ${y - hgt * 0.5} ${x + 6} ${y + 5}Z" fill="${i % 2 ? "#F29A5C" : p}" stroke="${d}" stroke-width="1.2"/>`;
      }).join("");
      return `
        ${plates}
        <path d="M36 60 Q16 56 4 48 Q18 66 38 75Z" fill="${b}"/>
        <path d="M8 50 L1 37 L13 52Z M14 54 L9 40 L19 56Z" fill="#FFF4D6" stroke="${d}" stroke-width="1"/>
        ${LEG(44, 70, 13, 28, d)}${LEG(92, 72, 11, 26, d)}
        <ellipse cx="72" cy="64" rx="40" ry="22" fill="${b}"/>
        <path d="M106 64 Q126 68 138 79 Q146 86 140 90 Q128 92 116 82Z" fill="${b}"/>
        ${LEG(54, 72, 13, 27, b)}${LEG(100, 74, 11, 25, b)}
        <ellipse cx="70" cy="74" rx="26" ry="7" fill="#B5D17F" opacity=".7"/>
        ${EYE(135, 82)}`;
    },
    brachiosaurus() {
      const b = "#7C9CC9", d = "#55759F", l = "#B9CBE6";
      return `
        <path d="M38 72 Q16 74 4 84 Q22 82 40 82Z" fill="${b}"/>
        ${LEG(38, 76, 12, 22, d)}${LEG(84, 60, 12, 38, d)}
        <ellipse cx="62" cy="68" rx="31" ry="18" transform="rotate(-18 62 68)" fill="${b}"/>
        <path d="M76 58 Q97 40 113 9 L125 12 Q111 42 92 72Z" fill="${b}"/>
        <ellipse cx="125" cy="11" rx="13" ry="7.5" fill="${b}"/>
        <ellipse cx="121" cy="5" rx="6" ry="4" fill="${b}"/>
        ${LEG(48, 76, 12, 22, b)}${LEG(92, 62, 12, 36, b)}
        <ellipse cx="66" cy="74" rx="20" ry="7" transform="rotate(-18 66 74)" fill="${l}" opacity=".75"/>
        ${EYE(126, 9)}`;
    },
    velociraptor() {
      const b = "#C98A4B", d = "#8A5A2B", a = "#3F6FB0";
      return `
        <path d="M60 51 L5 43 L7 51 L60 62Z" fill="${b}"/>
        <path d="M10 44l-3-6 7 7M20 45l-2-7 6 8M30 47l-1-7 5 8M40 48l0-7 4 8" stroke="${a}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M66 62 L58 80 L66 96" stroke="${d}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse cx="76" cy="56" rx="22" ry="12.5" fill="${b}"/>
        <path d="M92 50 Q100 36 112 35 L138 41 Q141 46 136 48 L112 50 Q104 54 98 62Z" fill="${b}"/>
        <path d="M108 36l-4-7 7 5M114 35l-1-7 4 7" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M80 64 L74 82 L82 96 L92 97" stroke="${b}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M82 92 q-6 -2 -6 -9" stroke="#3a2a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M86 56 Q94 66 106 72 L100 76 Q90 70 84 62Z" fill="${a}"/>
        <path d="M60 50 Q74 42 90 48" stroke="${a}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
        ${EYE(118, 41)}`;
    },
    ankylosaurus() {
      const b = "#B5874E", d = "#7A5A30", s = "#EBD5A8";
      const studs = [[50, 62], [64, 56], [78, 54], [92, 56], [106, 62], [57, 72], [71, 66], [85, 66], [99, 72], [78, 76]]
        .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.6" fill="${s}" stroke="${d}" stroke-width="1"/>`).join("");
      const spikes = [32, 46, 60, 74, 88, 102, 116].map((x) => `<path d="M${x} 82 L${x + 4} 92 L${x + 8} 82Z" fill="${s}" stroke="${d}" stroke-width="1"/>`).join("");
      return `
        <path d="M36 76 Q20 74 14 69" stroke="${b}" stroke-width="8" fill="none" stroke-linecap="round"/>
        <ellipse cx="11" cy="68" rx="10" ry="8" fill="${d}"/>
        ${LEG(44, 80, 12, 18, d)}${LEG(98, 80, 12, 18, d)}
        <path d="M28 84 Q32 46 76 45 Q120 46 126 84Z" fill="${b}"/>
        ${studs}${spikes}
        <path d="M116 70 Q132 64 146 73 Q148 82 138 86 L120 86Z" fill="${b}"/>
        <path d="M122 68 L126 60 L130 67Z" fill="${s}" stroke="${d}" stroke-width="1"/>
        ${LEG(56, 82, 12, 16, b)}${LEG(108, 82, 12, 16, b)}
        ${EYE(135, 74)}`;
    },
    parasaurolophus() {
      const b = "#E2A43B", d = "#A9731E", c = "#D4577A", l = "#F6D79A";
      return `
        <path d="M44 56 Q20 52 4 60 Q22 67 44 71Z" fill="${b}"/>
        <path d="M58 64 Q50 82 55 96 L66 96 Q64 84 72 70Z" fill="${d}"/><path d="M47 95h20v5H45z" fill="${d}"/>
        <path d="M95 66 L100 96" stroke="${d}" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="70" cy="60" rx="31" ry="19" transform="rotate(-10 70 60)" fill="${b}"/>
        <path d="M114 37 Q98 22 78 13" stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M89 54 Q101 36 118 35 L134 42 Q140 48 135 54 L118 54 Q106 58 98 68Z" fill="${b}"/>
        <path d="M130 42 L149 46 Q150 54 141 55 L130 54Z" fill="${l}"/>
        <path d="M74 64 Q68 82 74 96 L86 96 Q80 84 88 70Z" fill="${b}"/><path d="M71 95h20v5H69z" fill="${b}"/>
        <path d="M100 64 L106 94" stroke="${b}" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="74" cy="67" rx="18" ry="7" transform="rotate(-10 74 67)" fill="${l}" opacity=".75"/>
        ${EYE(119, 43)}`;
    },
    spinosaurus() {
      const b = "#4F7FA8", d = "#33597B", s = "#E86A5A";
      return `
        <path d="M44 60 Q48 14 72 6 Q98 10 104 58Z" fill="${s}"/>
        <path d="M56 58 L56 22M66 58 L66 12M76 58 L76 8M86 58 L87 12M96 58 L97 26" stroke="#B9473A" stroke-width="2" opacity=".6"/>
        <path d="M44 61 Q22 56 3 62 Q12 72 22 70 Q32 76 46 76Z" fill="${b}"/>
        ${LEG(56, 72, 11, 25, d)}
        <ellipse cx="74" cy="64" rx="33" ry="15" fill="${b}"/>
        <path d="M100 58 Q110 47 121 47 L156 53 L156 58 L122 62 Q112 66 104 72Z" fill="${b}"/>
        <path d="M128 59l1.5 3 1.5-3M136 58.5l1.5 3 1.5-3M144 58l1.5 3 1.5-3" fill="#fff"/>
        <path d="M98 70 Q104 74 104 80" stroke="${d}" stroke-width="4" fill="none" stroke-linecap="round"/>
        ${LEG(70, 72, 11, 25, b)}
        <ellipse cx="76" cy="71" rx="22" ry="6" fill="#86AACB" opacity=".75"/>
        ${EYE(121, 50)}`;
    },
    diplodocus() {
      const b = "#A985C4", d = "#7A5895", l = "#D3BEE3";
      return `
        <path d="M46 60 Q22 54 1 44 Q4 50 24 62 Q34 70 48 74Z" fill="${b}"/>
        ${LEG(46, 70, 11, 28, d)}${LEG(80, 70, 11, 28, d)}
        <ellipse cx="66" cy="64" rx="27" ry="16" fill="${b}"/>
        <path d="M84 56 Q110 38 135 28 L140 36 Q114 50 90 72Z" fill="${b}"/>
        <ellipse cx="143" cy="31" rx="10" ry="6" fill="${b}"/>
        ${LEG(56, 72, 11, 26, b)}${LEG(88, 72, 11, 26, b)}
        <ellipse cx="66" cy="71" rx="18" ry="6" fill="${l}" opacity=".75"/>
        ${EYE(145, 29)}`;
    }
  };
  function dinoSvg(id, extraClass = "") {
    const draw = ART[id];
    if (!draw) return "";
    return `<svg class="gx-dino-svg ${extraClass}" viewBox="0 0 160 106" aria-hidden="true" focusable="false"><ellipse cx="80" cy="100" rx="56" ry="4.5" fill="#000" opacity=".12"/>${draw()}</svg>`;
  }


  /* ---------- Phông nền 3 bức tranh ---------- */
  const conifer = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3" y="-6" width="6" height="16" fill="#6B4A2B"/><path d="M0 -70 L-16 -36 H-8 L-22 -10 H22 L8 -36 H16Z" fill="${c}"/></g>`;
  const fern = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0 0 Q-18 -14 -26 -30"/><path d="M0 0 Q-6 -22 -4 -38"/><path d="M0 0 Q10 -20 20 -32"/><path d="M0 0 Q18 -8 30 -16"/><path d="M0 0 Q-20 -2 -30 -8"/></g>`;
  const bush = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="-12" cy="-8" r="13" fill="#5E9E4A"/><circle cx="8" cy="-12" r="15" fill="#6DB055"/><circle cx="22" cy="-4" r="10" fill="#5E9E4A"/><circle cx="-6" cy="-16" r="3" fill="#F48FB1"/><circle cx="12" cy="-20" r="3" fill="#FFF"/><circle cx="20" cy="-8" r="3" fill="#F48FB1"/><circle cx="-14" cy="-4" r="3" fill="#FFF"/></g>`;
  const SCENE_BG = Object.freeze({
    triassic: `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect width="400" height="300" fill="#F7DDB0"/><circle cx="320" cy="60" r="26" fill="#FFF3C4"/>
      <path d="M0 175 Q80 140 170 168 T400 158 V300 H0Z" fill="#E3B676"/>
      <path d="M0 196 Q120 182 220 196 T400 190 V300 H0Z" fill="#D9A866"/>
      ${conifer(60, 196, 1, "#5C7F3E")}${conifer(350, 192, 0.8, "#5C7F3E")}
      <ellipse cx="260" cy="250" rx="30" ry="10" fill="#C08C52"/><ellipse cx="120" cy="270" rx="22" ry="8" fill="#C08C52"/></svg>`,
    jurassic: `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><linearGradient id="gxSkyJ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE3EC"/><stop offset="1" stop-color="#E7F4E0"/></linearGradient></defs>
      <rect width="400" height="300" fill="url(#gxSkyJ)"/>
      <path d="M0 170 Q70 120 150 160 Q230 110 310 150 Q360 130 400 145 V300 H0Z" fill="#A7CF92"/>
      ${conifer(30, 180, 1.3, "#3F7A4A")}${conifer(372, 176, 1.15, "#3F7A4A")}${conifer(330, 182, 0.8, "#4F8E57")}
      <path d="M0 186 Q200 170 400 186 V300 H0Z" fill="#8BBF6A"/>
      ${fern(20, 296, 1.2, "#4E8C3A")}${fern(380, 298, 1.3, "#4E8C3A")}${fern(200, 300, 0.8, "#5E9E4A")}</svg>`,
    cretaceous: `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><linearGradient id="gxSkyK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE0BC"/><stop offset="1" stop-color="#FCEBD2"/></linearGradient></defs>
      <rect width="400" height="300" fill="url(#gxSkyK)"/>
      <path d="M250 175 L310 70 L330 70 L390 175Z" fill="#9C7B6B"/><path d="M310 70 L330 70 L322 88 L316 84Z" fill="#E86A3A"/>
      <circle cx="318" cy="52" r="10" fill="#E8DCD4" opacity=".8"/><circle cx="330" cy="36" r="13" fill="#E8DCD4" opacity=".6"/>
      <path d="M0 176 Q100 150 200 170 T400 168 V300 H0Z" fill="#B9D27E"/>
      <path d="M0 196 Q140 186 230 200 Q320 212 400 200 V214 Q320 226 230 214 Q140 200 0 210Z" fill="#8FC9DD"/>
      <path d="M0 210 Q140 200 230 214 Q320 226 400 214 V300 H0Z" fill="#A6C866"/>
      ${bush(30, 200, 1)}${bush(380, 296, 1.2)}${bush(180, 300, 0.8)}</svg>`
  });

  /* ---------- Trạng thái ---------- */
  let controller = null;
  let root = null;
  let activeContext = null;
  let activeTab = "travel";
  let activeEra = "cretaceous";
  let selectedId = DATA.overview.id;
  let quiz = null;
  let autoRead = true;
  let toastTimer = 0;
  let found = loadFound();

  const allItems = [DATA.overview, ...DATA.primary, ...DATA.secondary];
  const byId = (id) => allItems.find((item) => item.id === id) || DATA.overview;
  const isDino = (id) => DATA.primary.some((d) => d.id === id);

  function loadFound() {
    try {
      const raw = window.localStorage.getItem(CONFIG.storageKey);
      const list = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(list) ? list : []);
    } catch (_) { return new Set(); }
  }
  function saveFound() {
    try { window.localStorage.setItem(CONFIG.storageKey, JSON.stringify([...found])); } catch (_) {}
  }

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ---------- Giọng đọc ----------
     Ưu tiên giọng tiếng Việt có sẵn trong máy (Web Speech API, chạy offline, ổn định).
     Nếu máy không có giọng Việt thì dùng Google TTS như bản cũ. */
  const tts = { audio: new Audio(), nonce: 0, queue: [], key: "" };
  tts.audio.referrerPolicy = "no-referrer";
  tts.audio.preload = "none";
  const synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
  if (synth) { try { synth.getVoices(); } catch (_) {} }

  function viVoice() {
    if (LANG === "en") return enVoice();
    if (!synth) return null;
    try { return synth.getVoices().find((v) => /^vi([-_]|$)/i.test(v.lang)) || null; } catch (_) { return null; }
  }
  function ttsUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=${LANG === "en" ? "en" : "vi"}&client=tw-ob&q=${encodeURIComponent(String(text || ""))}`;
  }
  function splitTtsText(text, maxLength = 170) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return [];
    const pieces = clean.match(/[^.!?;:]+[.!?;:]?/g) || [clean];
    const chunks = [];
    let buf = "";
    pieces.forEach((p) => {
      const part = p.trim();
      if (!part) return;
      if (!buf) buf = part;
      else if ((buf + " " + part).length <= maxLength) buf += " " + part;
      else { chunks.push(buf); buf = part; }
    });
    if (buf) chunks.push(buf);
    return chunks.flatMap((chunk) => {
      if (chunk.length <= maxLength) return [chunk];
      const out = [];
      let cur = "";
      chunk.split(" ").forEach((w) => {
        if (!cur || (cur + " " + w).length <= maxLength) cur = cur ? cur + " " + w : w;
        else { out.push(cur); cur = w; }
      });
      if (cur) out.push(cur);
      return out;
    });
  }
  function updateSpeakButtons() {
    if (!root) return;
    root.querySelectorAll(".gx-read").forEach((btn) => {
      const on = !!tts.key && btn.dataset.speakKey === tts.key;
      btn.classList.toggle("is-speaking", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.textContent = on ? "⏹ Dừng đọc" : `🔊 ${btn.dataset.label || "Nghe cô đọc"}`;
    });
  }
  function stopSpeak(refresh = true) {
    tts.nonce += 1;
    tts.queue = [];
    tts.key = "";
    try { if (synth) synth.cancel(); } catch (_) {}
    try { tts.audio.pause(); tts.audio.removeAttribute("src"); tts.audio.load(); } catch (_) {}
    if (refresh) updateSpeakButtons();
  }
  function voiceFailed(nonce) {
    if (nonce !== tts.nonce) return;
    tts.key = "";
    tts.queue = [];
    updateSpeakButtons();
    if (!root) return;
    root.querySelectorAll(".gx-voice-note").forEach((note) => {
      note.hidden = false;
      note.textContent = "Chưa phát được giọng đọc. Con nhờ bố mẹ hoặc thầy cô kiểm tra loa và mạng, rồi bấm lại nhé.";
    });
  }
  function playNext(nonce) {
    if (nonce !== tts.nonce) return;
    if (!tts.queue.length) { tts.key = ""; updateSpeakButtons(); return; }
    const chunk = tts.queue.shift();
    const voice = viVoice();
    if (voice) {
      try {
        const u = new SpeechSynthesisUtterance(chunk);
        u.voice = voice; u.lang = voice.lang; u.rate = 0.9; u.pitch = 1.08;
        u.onend = () => playNext(nonce);
        u.onerror = (e) => { if (e.error !== "interrupted" && e.error !== "canceled") voiceFailed(nonce); };
        synth.speak(u);
        return;
      } catch (_) { /* rơi xuống Google TTS */ }
    }
    try {
      tts.audio.src = ttsUrl(chunk);
      tts.audio.playbackRate = 0.96;
      const p = tts.audio.play();
      if (p && typeof p.catch === "function") p.catch(() => voiceFailed(nonce));
    } catch (_) { voiceFailed(nonce); }
  }
  /* toggle = true: bấm lại cùng nút thì dừng */
  function speak(key, text, toggle = true) {
    text = trText(text);
    if (toggle && tts.key === key) { stopSpeak(); return; }
    const chunks = splitTtsText(text);
    if (!chunks.length) return;
    stopSpeak(false);
    const nonce = tts.nonce;
    tts.key = key;
    tts.queue = chunks;
    updateSpeakButtons();
    playNext(nonce);
  }
  tts.audio.addEventListener("ended", () => playNext(tts.nonce));
  tts.audio.addEventListener("error", () => { if (tts.key) voiceFailed(tts.nonce); });

  const speechOf = (obj) => `${obj.name}. ${obj.summary} ${obj.more} Bé nhớ nhé: ${obj.remember}`;

  /* ---------- Giao diện ---------- */
  function injectAssets() {
    if (!document.getElementById(CONFIG.fontId)) {
      const link = document.createElement("link");
      link.id = CONFIG.fontId;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap&subset=vietnamese";
      document.head.appendChild(link);
    }
    if (document.getElementById(CONFIG.styleId)) return;
    const style = document.createElement("style");
    style.id = CONFIG.styleId;
    const R = `#${CONFIG.rootId}`;
    style.textContent = `
      ${R}{
        --pink:#EC4899;--purple:#8B5CF6;--blue:#3B82F6;--green:#10B981;
        --grad-main:linear-gradient(90deg,#EC4899,#8B5CF6);--grad-alt:linear-gradient(90deg,#3B82F6,#10B981);
        --sand:#FCF8FF;--bone:#FFFFFF;--line:#E9D5FF;--ink:#344054;--muted:#667085;
        --jungle:#5B216E;--fern:#047857;--fern-soft:#ECFDF5;--lava:#EC4899;--lava-soft:#FFF1F7;
        --purple-soft:#F5F3FF;--berry:#BE185D;--berry-soft:#FFF1F7;--sky:#E0F2FE;--good:#059669;--bad:#E11D48;
        font-family:"Baloo 2","Nunito","Segoe UI",system-ui,sans-serif;color:var(--ink);
        width:100%;height:min(760px,calc(100vh - 120px));min-height:640px;
        display:grid;grid-template-rows:auto auto minmax(0,1fr);
        background:radial-gradient(circle at 12% 8%,rgba(244,114,182,.12),transparent 30%),radial-gradient(circle at 88% 12%,rgba(59,130,246,.10),transparent 30%),var(--sand);border:2px solid var(--line);border-radius:28px;font-size:18px;overflow:hidden;position:relative
      }
      ${R} *{box-sizing:border-box}
      ${R} button{font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
      ${R} button:focus-visible{outline:3px solid var(--lava);outline-offset:3px}
      ${R} .gx-head{display:flex;align-items:center;gap:14px;padding:14px 20px 10px}
      ${R} .gx-logo{width:54px;height:54px;flex:0 0 54px;border-radius:18px;background:linear-gradient(135deg,#FFF1F7,#E0F2FE);display:grid;place-items:center;border:2px solid #F9A8D4}
      ${R} .gx-logo svg{width:48px}
      ${R} .gx-head h2{margin:0;color:var(--jungle);font-size:34px;line-height:1;font-weight:800}
      ${R} .gx-head p{margin:4px 0 0;color:var(--muted);font-size:17px;font-weight:600}
      ${R} .gx-album{margin-left:auto;display:flex;align-items:center;gap:10px;padding:6px 8px 6px 14px;background:var(--bone);border:2px solid var(--line);border-radius:18px}
      ${R} .gx-album-label{font-size:16px;font-weight:700;color:var(--jungle);line-height:1.1;white-space:nowrap}
      ${R} .gx-album-label b{display:block;font-size:22px;color:var(--lava)}
      ${R} .gx-album-slots{display:flex;gap:2px}
      ${R} .gx-slot{width:38px;height:28px;border:0;padding:0;background:none;border-radius:8px}
      ${R} .gx-slot svg{width:100%;height:100%}
      ${R} .gx-slot:not(.is-found) svg{filter:brightness(0);opacity:.16}
      ${R} .gx-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0 20px 12px}
      ${R} .gx-tab{min-height:56px;border:2px solid var(--line);border-radius:16px;background:var(--bone);font-size:20px;font-weight:700;color:var(--jungle);transition:background .15s,border-color .15s}
      ${R} .gx-tab:hover{border-color:#C4B5FD}
      ${R} .gx-tab[aria-selected="true"]{background:var(--grad-main);border-color:transparent;color:#fff}
      ${R} .gx-tab[data-tab="eras"][aria-selected="true"],${R} .gx-tab[data-tab="quiz"][aria-selected="true"]{background:var(--grad-alt)}
      ${R} .gx-stage{min-height:0;padding:0 20px 18px}
      ${R} .gx-split{height:100%;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(340px,1fr);gap:14px}
      ${R} .gx-card{min-height:0;background:var(--bone);border:2px solid var(--line);border-radius:22px;overflow:hidden}

      /* Cỗ máy thời gian */
      ${R} .gx-travel{display:grid;grid-template-rows:auto minmax(0,1fr)}
      ${R} .gx-timeline{display:flex;gap:4px;padding:10px;background:var(--bone);border-bottom:2px solid var(--line)}
      ${R} .gx-era{flex:var(--span) 1 0;min-width:0;min-height:58px;border:2px solid var(--line);border-radius:14px;background:#fff;padding:4px 8px;text-align:left;line-height:1.1}
      ${R} .gx-era b{display:block;font-size:19px;color:var(--jungle)}
      ${R} .gx-era small{display:block;line-height:1.15;font-size:14px;color:var(--muted);font-weight:600}
      ${R} .gx-era[aria-pressed="true"]{background:var(--lava-soft);border-color:var(--lava)}
      ${R} .gx-era[aria-pressed="true"] b{color:var(--berry)}
      ${R} .gx-scene{position:relative;min-height:0;overflow:hidden}
      ${R} .gx-scene>svg{position:absolute;inset:0;width:100%;height:100%}
      ${R} .gx-spot{position:absolute;border:0;background:none;padding:0;display:flex;flex-direction:column;align-items:center;transform-origin:50% 100%}
      ${R} .gx-spot svg{width:100%;height:auto;display:block;filter:drop-shadow(0 2px 0 rgba(255,255,255,.5))}
      ${R} .gx-spot:hover svg{transform:translateY(-3px)}
      ${R} .gx-spot svg{transition:transform .15s}
      ${R} .gx-spot.is-hop{animation:gxHop .5s ease}
      @keyframes gxHop{0%,100%{transform:translateY(0)}40%{transform:translateY(-10%)}70%{transform:translateY(0) scaleY(.96)}}
      ${R} .gx-chip{margin-top:-4px;padding:1px 10px;border-radius:999px;background:rgba(255,253,248,.94);border:2px solid var(--line);font-size:15px;font-weight:700;color:var(--jungle);white-space:nowrap}
      ${R} .gx-spot.is-found .gx-chip{border-color:#6EE7B7}
      ${R} .gx-spot.is-found .gx-chip::before{content:"✓ ";color:var(--good)}
      ${R} .gx-spot.is-selected .gx-chip{background:var(--grad-main);border-color:transparent;color:#fff}
      ${R} .gx-spot.is-selected.is-found .gx-chip::before{color:#BDF0B5}
      ${R} .gx-scene-note{position:absolute;left:12px;right:12px;top:10px;z-index:60;display:flex;gap:8px;align-items:flex-start;padding:8px 12px;border-radius:14px;background:rgba(255,255,255,.93);font-size:16px;font-weight:600;line-height:1.35;color:var(--jungle);max-width:460px}
      ${R} .gx-scene-note.is-big{top:auto;bottom:18%;left:50%;transform:translateX(-50%);width:min(88%,440px);font-size:19px;padding:14px 16px}

      /* Bảng thông tin */
      ${R} .gx-info{padding:18px 20px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#C4B5FD transparent}
      ${R} .gx-hero{height:140px;display:grid;place-items:center;margin:-4px 0 6px;border-radius:18px;background:linear-gradient(135deg,#FFF1F7,#E0F2FE)}
      ${R} .gx-hero svg{height:118px;width:auto}
      ${R} .gx-hero.is-emoji{font-size:72px;line-height:1}
      ${R} .gx-info h3{margin:0;color:var(--jungle);font-size:34px;line-height:1.1;font-weight:800}
      ${R} .gx-subtitle{margin:2px 0 8px;color:var(--berry);font-size:19px;font-weight:700}
      ${R} .gx-era-tag{display:inline-block;margin-left:6px;padding:0 8px;border-radius:999px;background:var(--sky);color:#0369A1;font-size:15px;font-weight:700;vertical-align:middle}
      ${R} .gx-read{min-height:48px;padding:0 18px;border:2px solid #6EE7B7;border-radius:14px;background:linear-gradient(90deg,#ECFDF5,#E0F2FE);color:var(--fern);font-size:18px;font-weight:700;margin:2px 0 10px}
      ${R} .gx-read.is-speaking{background:var(--grad-main);border-color:transparent;color:#fff}
      ${R} .gx-info p{margin:0 0 12px;font-size:19px;line-height:1.6;font-weight:500;max-width:62ch}
      ${R} .gx-facts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0 0}
      ${R} .gx-facts div{padding:10px 12px;border-radius:14px;background:linear-gradient(145deg,#FAF5FF,#F8FAFC);border:2px solid var(--line)}
      ${R} .gx-facts dt{font-size:15px;color:#6D28D9;font-weight:600;line-height:1.2}
      ${R} .gx-facts dd{margin:2px 0 0;font-size:17px;font-weight:700;line-height:1.35;color:var(--ink)}
      ${R} .gx-rabbit{display:flex;gap:10px;align-items:flex-start;margin-top:12px;padding:12px 14px;border-radius:16px;background:var(--berry-soft);border:2px solid #F9A8D4;color:var(--berry)}
      ${R} .gx-rabbit>span{font-size:28px;line-height:1}
      ${R} .gx-rabbit p{margin:0!important;font-size:18px!important;color:var(--berry)}
      ${R} .gx-voice-note{margin-top:10px;padding:8px 12px;border-radius:12px;background:#FFF7ED;color:#C2410C;font-size:16px;font-weight:600}

      /* Lưới thẻ */
      ${R} .gx-grid{padding:10px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(150px,1fr);gap:12px;overflow:auto}
      ${R} .gx-item{position:relative;border:2px solid var(--line);border-radius:18px;background:#fff;padding:8px 10px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;gap:2px;text-align:left;min-width:0;transition:border-color .15s,background .15s}
      ${R} .gx-item:hover{border-color:#C4B5FD}
      ${R} .gx-item.is-selected{border-color:var(--purple);background:linear-gradient(145deg,#FFF1F7,#EFF8FF);box-shadow:0 6px 16px rgba(139,92,246,.16)}
      ${R} .gx-item svg{width:100%;max-height:92px;flex:1 1 auto;min-height:0}
      ${R} .gx-item .gx-emoji{flex:1 1 auto;display:grid;place-items:center;width:100%;font-size:54px}
      ${R} .gx-item-text{display:flex;flex-direction:column;gap:2px;width:100%;min-height:5em}
      ${R} .gx-item strong{font-size:20px;line-height:1.2;color:var(--jungle);font-weight:700;overflow-wrap:anywhere}
      ${R} .gx-item small{font-size:16px;line-height:1.3;color:var(--muted);font-weight:600}
      ${R} .gx-item .gx-tick{position:absolute;top:6px;right:10px;font-size:15px;font-weight:800;color:var(--good)}

      /* Hỏi đáp */
      ${R} .gx-quiz{height:100%;display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:14px}
      ${R} .gx-quiz-main{padding:18px 20px;display:flex;flex-direction:column;min-height:0;overflow:auto}
      ${R} .gx-quiz-top{display:flex;align-items:center;gap:12px}
      ${R} .gx-dots{display:flex;gap:6px;flex-wrap:wrap}
      ${R} .gx-dot{width:24px;height:24px;border-radius:50%;background:#EDE9FE;border:2px solid transparent}
      ${R} .gx-dot.is-now{border-color:var(--lava);background:#fff}
      ${R} .gx-dot.is-right{background:var(--good)}
      ${R} .gx-dot.is-wrong{background:#FDA4AF}
      ${R} .gx-question{margin:14px 0 8px;color:var(--jungle);font-size:30px;line-height:1.3;font-weight:800}
      ${R} .gx-answers{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}
      ${R} .gx-answer{min-height:70px;padding:8px 14px;border:2px solid #D8B4FE;border-radius:18px;background:#fff;text-align:left;font-size:21px;font-weight:600;line-height:1.3;display:flex;align-items:center;gap:10px}
      ${R} .gx-answer:hover:not(:disabled){border-color:var(--pink);background:#FFF7FB}
      ${R} .gx-key{flex:0 0 38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--purple-soft);color:#6D28D9;font-weight:800}
      ${R} .gx-answer.correct{border-color:var(--green);background:#ECFDF5}
      ${R} .gx-answer.correct .gx-key{background:var(--good);color:#fff}
      ${R} .gx-answer.wrong{border-color:#FB7185;background:#FFF1F2}
      ${R} .gx-answer.wrong .gx-key{background:var(--bad);color:#fff}
      ${R} .gx-answer:disabled{cursor:default}
      ${R} .gx-answer:disabled:not(.correct):not(.wrong){opacity:.55}
      ${R} .gx-feedback{margin-top:12px;padding:10px 14px;border-radius:16px;background:var(--berry-soft);color:var(--berry);font-size:19px;font-weight:600;line-height:1.5;display:flex;gap:10px;align-items:flex-start}
      ${R} .gx-feedback.is-right{background:#ECFDF5;color:#047857}
      ${R} .gx-feedback>span:first-child{font-size:26px;line-height:1}
      ${R} .gx-quiz-actions{margin-top:auto;padding-top:12px;display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap}
      ${R} .gx-btn{min-height:54px;padding:0 24px;border:0;border-radius:16px;background:var(--grad-main);color:#fff!important;font-size:20px;box-shadow:0 5px 12px rgba(139,92,246,.22);font-weight:700}
      ${R} .gx-btn.is-soft{background:#fff;color:var(--fern)!important;border:2px solid #6EE7B7;box-shadow:none}
      ${R} .gx-btn:disabled{opacity:.4;cursor:not-allowed}
      ${R} .gx-side{padding:18px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px}
      ${R} .gx-big-score{font-size:60px;line-height:1;font-weight:800;color:var(--purple)}
      ${R} .gx-big-score small{font-size:24px;color:var(--muted)}
      ${R} .gx-side p{margin:0;font-size:17px;line-height:1.4;color:var(--muted);font-weight:600}
      ${R} .gx-toggle{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:2px solid var(--line);border-radius:16px;background:#fff;font-size:17px;font-weight:700;color:var(--jungle);text-align:left}
      ${R} .gx-switch{flex:0 0 44px;height:26px;border-radius:999px;background:#DDD6FE;position:relative;transition:background .15s}
      ${R} .gx-switch::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .15s}
      ${R} .gx-toggle[aria-checked="true"] .gx-switch{background:var(--green)}
      ${R} .gx-toggle[aria-checked="true"] .gx-switch::after{transform:translateX(18px)}
      ${R} .gx-stars{font-size:54px;letter-spacing:4px;line-height:1}
      ${R} .gx-stars .off{filter:grayscale(1);opacity:.25}
      ${R} .gx-review{margin:12px 0 0;padding:0;list-style:none;display:grid;gap:8px;text-align:left;width:100%}
      ${R} .gx-review li{padding:8px 12px;border-radius:14px;background:#fff;border:2px solid var(--line);font-size:18px;line-height:1.45}
      ${R} .gx-review b{color:var(--good)}

      ${R} .gx-toast{position:absolute;left:50%;bottom:22px;z-index:100;transform:translate(-50%,20px);opacity:0;pointer-events:none;padding:12px 18px;border-radius:18px;background:var(--grad-main);color:#fff;font-size:19px;font-weight:700;box-shadow:0 8px 24px rgba(139,92,246,.3);transition:opacity .25s,transform .25s;max-width:90%;text-align:center}
      ${R} .gx-toast.is-on{opacity:1;transform:translate(-50%,0)}

      @media(max-width:1024px){
        ${R} .gx-split{grid-template-columns:minmax(0,1fr) minmax(300px,.9fr)}
        ${R} .gx-album-slots{display:none}
      }
      @media(max-width:760px){
        ${R}{height:auto;min-height:0;border-radius:20px}
        ${R} .gx-head{padding:12px 14px 8px;flex-wrap:wrap}
        ${R} .gx-head h2{font-size:28px}
        ${R} .gx-album{margin-left:0;width:100%}
        ${R} .gx-tabs{grid-template-columns:1fr 1fr;padding:0 14px 10px}
        ${R} .gx-stage{padding:0 14px 14px}
        ${R} .gx-split,${R} .gx-quiz{grid-template-columns:1fr;height:auto}
        ${R} .gx-travel{height:auto}
        ${R} .gx-scene{height:min(104vw,460px)}
        ${R} .gx-chip{font-size:12.5px;padding:0 6px}
        ${R} .gx-scene-note{font-size:14px;padding:6px 10px}
        ${R} .gx-toast{position:fixed;bottom:16px;width:calc(100% - 32px);max-width:none;font-size:16px;padding:10px 14px}
        ${R} .gx-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:minmax(150px,auto);overflow:visible}
        ${R} .gx-info{overflow:visible}
        ${R} .gx-answers,${R} .gx-facts{grid-template-columns:1fr}
        ${R} .gx-question{font-size:25px}
        ${R} .gx-tab{font-size:17px}
        ${R} .gx-era small{display:none}
      }
      @media(prefers-reduced-motion:reduce){${R} *{animation:none!important;transition:none!important}}

      ${R}{box-sizing:border-box}
      ${R} .gx-tabs:has([data-tab="experience"]){grid-template-columns:repeat(5,minmax(0,1fr))}
      ${R} .gx-tab[data-tab="experience"][aria-selected="true"]{background:var(--grad-alt)}
      ${R} .gx-experience{height:100%;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(290px,.85fr);gap:12px;padding:12px;overflow:auto;align-items:start;background:linear-gradient(155deg,#F5F3FF,#ECFEFF)}
      ${R} .gx-ex-visual,${R} .gx-ex-panel{min-width:0;border:1px solid #DDD6FE;border-radius:20px;background:#fff;padding:13px;box-shadow:0 5px 15px rgba(76,29,149,.06)}
      ${R} .gx-ex-kicker{color:#7E22CE;font-size:15px;font-weight:800;margin:0 0 8px;line-height:1.35}
      ${R} .gx-ex-canvas{display:block;width:100%;height:auto;aspect-ratio:2/1;max-width:100%;border-radius:16px;border:1px solid #BFDBFE;background:#E0F2FE}
      ${R} .gx-ex-caption{color:#64748B;font-size:13px;margin:8px 0 0;line-height:1.4;font-weight:650}
      ${R} .gx-ex-panel h3{font-size:clamp(21px,2.2vw,27px);line-height:1.2;margin:0 0 9px;color:#6D28D9}
      ${R} .gx-ex-panel>p{font-size:16px;line-height:1.5;margin:0 0 12px;color:#334155;font-weight:650}
      ${R} .gx-ex-group{margin-top:12px;color:#334155;display:grid;gap:6px}
      ${R} .gx-ex-group strong{font-size:16px}
      ${R} .gx-ex-buttons{display:flex;flex-wrap:wrap;gap:7px}
      ${R} .gx-ex-btn{border:1px solid #BFDDFB!important;background:#fff!important;color:#1D4ED8!important;border-radius:12px;padding:9px 11px;font-size:15px;font-weight:800;min-height:42px;line-height:1.2}
      ${R} .gx-ex-btn.is-on,${R} .gx-ex-btn[aria-pressed="true"]{color:#fff!important;background:linear-gradient(90deg,#3B82F6,#14B8A6)!important;border-color:transparent!important}
      ${R} .gx-ex-range-label{font-size:16px;font-weight:800;display:grid;gap:8px;color:#334155;margin:13px 0 9px}
      ${R} .gx-ex-range-label input{accent-color:#14B8A6;width:100%;height:24px;cursor:pointer}
      ${R} .gx-ex-feedback{border:1px solid #A7F3D0;border-radius:14px;background:#ECFDF5;padding:12px;color:#047857;font-size:16px;font-weight:750;line-height:1.5;margin-top:13px;min-height:71px}
      ${R} .gx-ex-listen{margin-top:12px;border:1px solid #FBCFE8;border-radius:14px;background:linear-gradient(90deg,#FCE7F3,#EDE9FE);color:#7E22CE;font-size:16px;font-weight:800;min-height:45px;padding:9px 14px}
      @media(max-width:900px){${R} .gx-experience{grid-template-columns:minmax(0,1fr)}${R} .gx-ex-panel{margin-bottom:8px}}
      @media(max-width:760px){${R} .gx-tabs:has([data-tab="experience"]){grid-template-columns:repeat(2,minmax(0,1fr))}${R} .gx-experience{padding:8px;gap:9px}${R} .gx-ex-visual,${R} .gx-ex-panel{padding:10px}${R} .gx-ex-kicker{font-size:13px}${R} .gx-ex-panel>p{font-size:15px}}

    `;
    document.head.appendChild(style);
  }

  function detailHtml(obj) {
    const hero = ART[obj.id]
      ? `<div class="gx-hero">${dinoSvg(obj.id)}</div>`
      : `<div class="gx-hero is-emoji" aria-hidden="true">${obj.icon}</div>`;
    const tag = ERA_OF[obj.id] ? `<span class="gx-era-tag">${ERA_LABEL[ERA_OF[obj.id]]}</span>` : "";
    return `
      ${hero}
      <h3>${obj.name}</h3>
      <div class="gx-subtitle">${obj.subtitle}${tag}</div>
      <button class="gx-read" type="button" data-action="speak" data-speak-key="${obj.id}" data-label="Nghe cô đọc" aria-pressed="false">🔊 Nghe cô đọc</button>
      <p>${obj.summary}</p>
      <p>${obj.more}</p>
      <dl class="gx-facts">${obj.facts.map((f) => `<div><dt>${f.label}</dt><dd>${f.value}</dd></div>`).join("")}</dl>
      <div class="gx-rabbit"><span aria-hidden="true">🐰</span><p><b>Bé nhớ nhé:</b> ${obj.remember}</p></div>
      <div class="gx-voice-note" hidden></div>`;
  }

  function albumHtml() {
    const n = DATA.primary.filter((d) => found.has(d.id)).length;
    return `<div class="gx-album-label">Bộ sưu tập<b>${n}/${DATA.primary.length}</b></div>
      <div class="gx-album-slots">${DATA.primary.map((d) => `<button type="button" class="gx-slot ${found.has(d.id) ? "is-found" : ""}" data-dino="${d.id}" data-jump="1" title="${found.has(d.id) ? d.name : "Chưa tìm thấy"}" aria-label="${found.has(d.id) ? d.name : "Khủng long chưa tìm thấy"}">${dinoSvg(d.id)}</button>`).join("")}</div>`;
  }

  function travelHtml() {
    const scene = SCENES[activeEra];
    const eras = Object.keys(SCENES).map((key) => `<button type="button" class="gx-era" data-era="${key}" aria-pressed="${key === activeEra}" style="--span:${SCENES[key].span}"><b>${ERA_LABEL[key]}</b><small>${SCENES[key].years}</small></button>`).join("");
    const spots = scene.dinos.map((s) => {
      const d = byId(s.id);
      const cls = `${found.has(s.id) ? "is-found" : ""} ${selectedId === s.id ? "is-selected" : ""}`;
      return `<button type="button" class="gx-spot ${cls}" data-dino="${s.id}" style="left:${s.x}%;bottom:${s.y}%;width:${s.w}%;z-index:${50 - s.y}" aria-label="${d.name}">${dinoSvg(s.id)}<span class="gx-chip">${SHORT_NAME[s.id] || d.name}</span></button>`;
    }).join("");
    const big = scene.dinos.length === 0;
    const note = `<div class="gx-scene-note ${big ? "is-big" : ""}"><span aria-hidden="true">🐰</span><span>${scene.note}${big ? "" : " Chạm vào từng con để xem nhé."}</span></div>`;
    return `<div class="gx-split">
      <div class="gx-card gx-travel"><div class="gx-timeline" role="group" aria-label="Chọn thời kỳ">${eras}</div>
        <div class="gx-scene">${SCENE_BG[activeEra]}${note}${spots}</div></div>
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }

  function gridHtml(items) {
    if (!items.some((i) => i.id === selectedId)) selectedId = items[0].id;
    const cards = items.map((o) => {
      const dino = isDino(o.id);
      const pic = dino ? dinoSvg(o.id) : `<span class="gx-emoji" aria-hidden="true">${o.icon}</span>`;
      const tick = dino && found.has(o.id) ? `<span class="gx-tick">✓ Đã gặp</span>` : "";
      const sub = dino ? ERA_LABEL[ERA_OF[o.id]] : o.subtitle;
      return `<button type="button" class="gx-item ${o.id === selectedId ? "is-selected" : ""}" ${dino ? `data-dino="${o.id}"` : `data-object="${o.id}"`}>${tick}${pic}<span class="gx-item-text"><strong>${o.name}</strong><small>${sub}</small></span></button>`;
    }).join("");
    return `<div class="gx-split"><div class="gx-card gx-grid">${cards}</div><aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside></div>`;
  }

  /* ---------- Hỏi đáp: mỗi vòng 10 câu ngẫu nhiên, đáp án được xáo trộn ---------- */
  function makeRound(pool) {
    const items = shuffle(pool).slice(0, CONFIG.roundSize).map((src) => {
      const order = shuffle(src.a.map((_, i) => i));
      return { src, q: src.q, a: order.map((i) => src.a[i]), c: order.indexOf(src.c), note: src.note };
    });
    return { items, i: 0, score: 0, chosen: -1, results: [], wrong: [] };
  }
  const LETTERS = ["A", "B", "C", "D"];
  const questionSpeech = (it) => `${it.q} ${it.a.map((a, i) => `${LETTERS[i]}: ${a}.`).join(" ")}`;

  function quizHtml() {
    if (!quiz) quiz = makeRound(DATA.quiz);
    const total = quiz.items.length;
    const dots = quiz.items.map((_, k) => {
      const r = quiz.results[k];
      return `<span class="gx-dot ${r === true ? "is-right" : r === false ? "is-wrong" : k === quiz.i ? "is-now" : ""}"></span>`;
    }).join("");
    const side = `<aside class="gx-card gx-side">
        <div class="gx-big-score">${quiz.score}<small>/${total}</small></div><p>câu đúng</p>
        <button type="button" class="gx-toggle" role="switch" aria-checked="${autoRead}" data-action="toggle-read"><span class="gx-switch"></span>Cô tự đọc câu hỏi</button>
        <p>Mẹo: bấm phím 1, 2, 3, 4 để chọn đáp án.</p>
        <button type="button" class="gx-btn is-soft" data-action="new-round">Đổi câu hỏi khác</button>
      </aside>`;

    if (quiz.i >= total) {
      const ratio = quiz.score / total;
      const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
      const msg = stars === 3 ? "Tuyệt vời! Con là nhà cổ sinh vật học nhí rồi!" : stars === 2 ? "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé." : "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.";
      const review = quiz.wrong.length
        ? `<ul class="gx-review">${quiz.wrong.map((w) => `<li>${w.q}<br><b>✓ ${w.answer}</b></li>`).join("")}</ul>` : "";
      return `<div class="gx-quiz"><div class="gx-card gx-quiz-main" style="align-items:center;text-align:center">
          <div class="gx-dots">${dots}</div>
          <div class="gx-stars" style="margin-top:16px" aria-label="${stars} sao">${[1, 2, 3].map((k) => `<span class="${k <= stars ? "" : "off"}">⭐</span>`).join("")}</div>
          <h3 class="gx-question">Con đúng ${quiz.score}/${total} câu</h3>
          <div class="gx-feedback is-right" style="text-align:left"><span aria-hidden="true">🐰</span><span>${msg}</span></div>
          <div class="gx-quiz-actions" style="justify-content:center;margin-top:12px">
            ${quiz.wrong.length ? `<button type="button" class="gx-btn is-soft" data-action="retry-wrong">Làm lại câu sai</button>` : ""}
            <button type="button" class="gx-btn" data-action="new-round">Chơi vòng mới</button>
          </div>
          ${quiz.wrong.length ? `<p style="margin:14px 0 0;font-weight:700;color:var(--jungle)">Đáp án đúng của các câu con chưa trả lời được:</p>` : ""}
          ${review}</div>${side}</div>`;
    }

    const it = quiz.items[quiz.i];
    const answered = quiz.chosen >= 0;
    const answers = it.a.map((a, k) => {
      let cls = "";
      if (answered) cls = k === it.c ? "correct" : k === quiz.chosen ? "wrong" : "";
      return `<button type="button" class="gx-answer ${cls}" data-answer="${k}" ${answered ? "disabled" : ""}><span class="gx-key">${LETTERS[k]}</span><span>${a}</span></button>`;
    }).join("");
    let fb = `<div class="gx-feedback" id="gx-feedback"><span aria-hidden="true">🐰</span><span>Con chọn một đáp án nhé!</span></div>`;
    if (answered) {
      const ok = quiz.chosen === it.c;
      fb = `<div class="gx-feedback ${ok ? "is-right" : ""}" id="gx-feedback"><span aria-hidden="true">${ok ? "🌟" : "💡"}</span><span>${ok ? "Chính xác!" : `Chưa đúng rồi. Đáp án đúng là <b>${it.a[it.c]}</b>.`} ${it.note}</span></div>`;
    }
    return `<div class="gx-quiz"><div class="gx-card gx-quiz-main">
        <div class="gx-quiz-top"><div class="gx-dots" aria-label="Câu ${quiz.i + 1} trên ${total}">${dots}</div></div>
        <h3 class="gx-question">${it.q}</h3>
        <div><button class="gx-read" type="button" data-action="speak-question" data-speak-key="quiz-q" data-label="Đọc câu hỏi" aria-pressed="false">🔊 Đọc câu hỏi</button></div>
        <div class="gx-answers">${answers}</div>
        <div aria-live="polite">${fb}</div>
        <div class="gx-voice-note" hidden></div>
        <div class="gx-quiz-actions"><button type="button" class="gx-btn" data-action="next-quiz" ${answered ? "" : "disabled"}>${quiz.i === total - 1 ? "Xem kết quả" : "Câu tiếp theo"}</button></div>
      </div>${side}</div>`;
  }

  /* Epsilon Edu - interactive experience. All state is in memory; no extra storage or APIs. */
  const EX_KIND = "dinosaur";
  const exT = (vi, en) => LANG === "en" ? en : vi;
  const EX = {raf: 0, last: 0, phase: 0, running: true, speed: 55, earthDepth: 0, planet: "earth", dino: "longneck", food: "leaves", walk: 0, eat: false,
    beeX: 110, beeTarget: -1, pollenFrom: -1, visited: [], pollinated: false, carX: 75, light: "red", result: "", starPositions: []};
  function exReset() {
    stopExperience();
    Object.assign(EX, { last:0, phase:0, running:EX_KIND !== "earth", speed:55, earthDepth:0, planet:"earth", dino:"longneck",food:"leaves",walk:0,eat:false,beeX:110,beeTarget:-1,pollenFrom:-1,visited:[],pollinated:false,carX:75,light:"red",result:"" });
  }
  const exDescription = {
    space: ["🪐 Phòng thí nghiệm quỹ đạo", "🪐 Orbit Lab", "Chọn hành tinh, chỉnh tốc độ rồi quan sát đường đi quanh Mặt Trời. Các quỹ đạo được vẽ không theo tỉ lệ thật.", "Choose a planet, change the speed and watch it travel around the Sun. Orbit sizes are not to scale."],
    earth: ["🌍 Hành trình vào lòng Trái Đất", "🌍 Journey Inside Earth", "Kéo thanh khám phá từ vỏ tới lõi Trái Đất. Quan sát lớp đang đi qua và vì sao càng vào sâu càng nóng.", "Move the exploration slider from Earth's crust toward its core. See each layer and why deeper regions are much hotter."],
    dinosaur: ["🦕 Bữa ăn của khủng long", "🦕 Dinosaur Food Lab", "Chọn khủng long, chọn thức ăn rồi thử cho bạn ấy đi tới. Bé sẽ khám phá con nào ăn cây và con nào ăn thịt.", "Choose a dinosaur and a food, then let it walk over. Find out which dinosaurs ate plants and which ate meat."],
    insect: ["🐝 Ong giúp hoa tạo hạt", "🐝 How Bees Help Flowers", "Cho ong lấy phấn ở một bông hoa, rồi ghé bông khác cùng loài. Quan sát cách thụ phấn giúp cây tạo hạt.", "Collect pollen from one flower, then visit another flower of the same kind. Watch how pollination helps plants make seeds."],
    vehicle: ["🚦 Thử làm người điều khiển đèn", "🚦 Traffic Light Lab", "Chọn đỏ, vàng hoặc xanh và xem ô tô phản ứng trước vạch dừng. Đèn vàng nhắc xe giảm tốc và chuẩn bị dừng.", "Choose red, amber or green and see what the car does at the stop line. Amber tells drivers to slow down and prepare to stop."]
  };
  function exButtons(items) { return items.map(([act,val,vi,en]) => `<button type="button" class="gx-ex-btn" data-ex="${act}" data-ex-value="${val}" aria-pressed="false">${exT(vi,en)}</button>`).join(""); }
  function exControlsHtml() {
    if (EX_KIND === "space") return `<div class="gx-ex-group"><strong>${exT("Chọn hành tinh","Choose a planet")}</strong><div class="gx-ex-buttons">${exButtons([["planet","mercury","Sao Thủy","Mercury"],["planet","earth","Trái Đất","Earth"],["planet","mars","Sao Hỏa","Mars"],["planet","saturn","Sao Thổ","Saturn"]])}</div></div><label class="gx-ex-range-label">${exT("Tốc độ mô phỏng","Simulation speed")}<input data-ex-range="speed" type="range" min="15" max="100" value="${EX.speed}"></label><div class="gx-ex-buttons">${exButtons([["toggle","", "⏸ Tạm dừng / Chạy", "⏸ Pause / Play"]])}</div>`;
    if (EX_KIND === "earth") return `<label class="gx-ex-range-label">${exT("Khám phá độ sâu","Explore the depth")}<input data-ex-range="depth" type="range" min="0" max="100" value="${EX.earthDepth}"></label><div class="gx-ex-buttons">${exButtons([["layer","0","Vỏ","Crust"],["layer","35","Manti","Mantle"],["layer","75","Lõi ngoài","Outer core"],["layer","100","Lõi trong","Inner core"],["toggle","","⏸ Dừng / Tiếp","⏸ Pause / Play"]])}</div>`;
    if (EX_KIND === "dinosaur") return `<div class="gx-ex-group"><strong>${exT("Chọn khủng long","Choose a dinosaur")}</strong><div class="gx-ex-buttons">${exButtons([["dino","longneck","🦕 Cổ dài","🦕 Long-neck"],["dino","trex","🦖 Bạo chúa","🦖 T. rex"]])}</div></div><div class="gx-ex-group"><strong>${exT("Chọn bữa ăn","Choose a meal")}</strong><div class="gx-ex-buttons">${exButtons([["food","leaves","🌿 Lá cây","🌿 Leaves"],["food","meat","🍖 Thịt","🍖 Meat"],["try","","▶ Đi ăn thử","▶ Try the food"]])}</div></div>`;
    if (EX_KIND === "insect") return `<div class="gx-ex-group"><strong>${exT("Bé đưa ong tới hoa nào?","Where should the bee go?")}</strong><div class="gx-ex-buttons">${exButtons([["flower","0","🌸 Hoa 1","🌸 Flower 1"],["flower","1","🌼 Hoa 2","🌼 Flower 2"],["flower","2","🌺 Hoa 3","🌺 Flower 3"],["reset","","↻ Làm lại","↻ Reset"]])}</div></div>`;
    return `<div class="gx-ex-group"><strong>${exT("Bé chọn tín hiệu nào?","Choose a traffic light")}</strong><div class="gx-ex-buttons">${exButtons([["light","red","🔴 Đỏ","🔴 Red"],["light","yellow","🟡 Vàng","🟡 Amber"],["light","green","🟢 Xanh","🟢 Green"],["reset","","↻ Thử lại","↻ Reset"]])}</div></div><label class="gx-ex-range-label">${exT("Tốc độ xe khi đèn xanh","Car speed on green")}<input data-ex-range="speed" type="range" min="15" max="100" value="${EX.speed}"></label>`;
  }
  function exFeedbackText() {
    if (EX.result) return typeof EX.result === "object" ? exT(EX.result.vi, EX.result.en) : EX.result;
    if (EX_KIND === "space") {
      const a = {mercury:["Sao Thủy đi hết một vòng quanh Mặt Trời nhanh hơn Trái Đất.","Mercury completes an orbit around the Sun faster than Earth."],earth:["Trái Đất quay quanh Mặt Trời, đồng thời tự quay tạo ra ngày và đêm.","Earth orbits the Sun and spins on its axis, creating day and night."],mars:["Sao Hỏa ở xa Mặt Trời hơn Trái Đất và cần lâu hơn để đi hết một vòng.","Mars is farther from the Sun than Earth, so its orbit takes longer."],saturn:["Sao Thổ có vành đai và mất rất nhiều thời gian để đi hết một vòng quanh Mặt Trời.","Saturn has rings and takes much longer to orbit the Sun."]}[EX.planet];return exT(...a);
    }
    if (EX_KIND === "earth") {const d=EX.earthDepth;return d<12?exT("Vỏ là lớp ngoài mỏng, nơi chúng ta sống.","The crust is the thin outer layer where we live."):d<64?exT("Manti nằm dưới vỏ. Đá ở đây rất nóng và có thể biến dạng chậm.","The mantle lies below the crust. Its hot rock can deform very slowly."):d<90?exT("Lõi ngoài chủ yếu là sắt và niken ở trạng thái lỏng.","The outer core is made mostly of liquid iron and nickel."):exT("Lõi trong rất nóng nhưng rắn vì áp suất cực lớn.","The inner core is very hot but solid because of enormous pressure."); }
    if (EX_KIND === "dinosaur") return exT("Bé dự đoán xem khủng long này ăn lá cây hay ăn thịt nhé!", "Which food did this dinosaur eat: leaves or meat?");
    if (EX_KIND === "insect") return EX.pollinated?exT("Phấn hoa được chuyển từ hoa này sang hoa khác. Sau thụ phấn, cây có thể hình thành hạt!","Pollen moved between flowers. After pollination, a plant may form seeds!"):EX.pollenFrom>=0?exT("Ong mang phấn rồi! Bé thử đưa ong sang một bông hoa khác.","The bee has pollen! Send it to a different flower."):exT("Bé hãy cho ong ghé bông hoa thứ nhất để lấy phấn.","Let the bee visit a flower to collect pollen.");
    return EX.light==="red"?exT("Đèn đỏ: xe phải dừng trước vạch dừng.","Red light: the car must stop before the line."):EX.light==="yellow"?exT("Đèn vàng: giảm tốc và chuẩn bị dừng an toàn.","Amber light: slow down and prepare to stop safely."):exT("Đèn xanh: xe có thể đi khi phía trước an toàn.","Green light: the car may go when the way is clear.");
  }
  function experienceHtml() {
    const x=exDescription[EX_KIND];
    return `<section class="gx-experience" aria-label="${exT("Trải nghiệm để hiểu","Learn by doing")}"><div class="gx-ex-visual"><div class="gx-ex-kicker">① ${exT("Kiến thức trực quan → ② Trải nghiệm để hiểu", "Explore the facts → Learn by doing")}</div><canvas class="gx-ex-canvas" width="880" height="440" role="img" aria-label="${exT(x[0],x[1])}"></canvas><p class="gx-ex-caption">${exT("Mô phỏng minh họa, không theo kích thước hoặc thời gian thực.","Illustrative simulation, not to real-life scale or timing.")}</p></div><aside class="gx-ex-panel"><h3>${exT(x[0],x[1])}</h3><p>${exT(x[2],x[3])}</p>${exControlsHtml()}<div class="gx-ex-feedback" data-ex-feedback role="status" aria-live="polite">${exFeedbackText()}</div><button type="button" class="gx-ex-listen" data-ex="listen">🔊 ${exT("Nghe Cô Thỏ giải thích","Listen to Miss Pink Bunny")}</button></aside></section>`;
  }
  function exPoint(ctx,x,y,r,color) {ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
  function exLine(ctx,x,y,xx,yy,color,w=3) {ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(xx,yy);ctx.lineWidth=w;ctx.strokeStyle=color;ctx.stroke();}
  function exRound(ctx,x,y,w,h,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
  function exText(ctx,s,x,y,size=24,color="#fff",align="center"){ctx.fillStyle=color;ctx.font=`800 ${size}px system-ui,sans-serif`;ctx.textAlign=align;ctx.textBaseline="middle";ctx.fillText(s,x,y);}
  function exCloud(ctx,x,y,k=1){ctx.fillStyle="rgba(255,255,255,.84)";exPoint(ctx,x,y,21*k,"rgba(255,255,255,.84)");exPoint(ctx,x+22*k,y-8*k,28*k,"rgba(255,255,255,.84)");exPoint(ctx,x+47*k,y,20*k,"rgba(255,255,255,.84)");}
  function exFlower(ctx,x,y,palette,size=1){exLine(ctx,x,y+8*size,x,y+112*size,"#168047",8*size);ctx.strokeStyle="#15803d";ctx.lineWidth=4*size;ctx.beginPath();ctx.ellipse(x-15*size,y+57*size,22*size,9*size,-.7,0,Math.PI*2);ctx.stroke();for(let a=0;a<6;a++){const t=a*Math.PI/3;exPoint(ctx,x+Math.cos(t)*19*size,y+Math.sin(t)*19*size,14*size,palette)}exPoint(ctx,x,y,12*size,"#FACC15");}
  function exDrawSpace(ctx,t){
    const bg=ctx.createLinearGradient(0,0,880,440);bg.addColorStop(0,"#0C1542");bg.addColorStop(1,"#271057");ctx.fillStyle=bg;ctx.fillRect(0,0,880,440);
    for(let i=0;i<85;i++){const x=(i*307+31)%880,y=(i*113+47)%440;exPoint(ctx,x,y,1.2+(i%4)*.3,`rgba(255,255,255,${.32+.3*Math.sin(t*.5+i)})`)}
    const cx=430,cy=225;exPoint(ctx,cx,cy,57,"#F97316");exPoint(ctx,cx,cy,46,"#FBBF24");exText(ctx,exT("Mặt Trời","Sun"),cx,300,19,"#FEF3C7");
    const opts=[{name:"mercury",r:108,rr:9,color:"#B8B2A7",v:1.65},{name:"earth",r:155,rr:17,color:"#3B82F6",v:1.05},{name:"mars",r:207,rr:13,color:"#FB704A",v:.78},{name:"saturn",r:258,rr:22,color:"#F8C77F",v:.43}];
    opts.forEach((p,i)=>{ctx.beginPath();ctx.ellipse(cx,cy,p.r*1.37,p.r*.67,0,0,Math.PI*2);ctx.strokeStyle=EX.planet===p.name?"#93C5FD":"rgba(191,219,254,.23)";ctx.lineWidth=EX.planet===p.name?3:1.5;ctx.stroke();const a=-.75+t*p.v*.22,px=cx+Math.cos(a)*p.r*1.37,py=cy+Math.sin(a)*p.r*.67;exPoint(ctx,px,py,p.rr,p.color);if(p.name==="earth"){exPoint(ctx,px+Math.cos(t*2.5)*6,py+Math.sin(t*2.5)*7,p.rr*.42,"#34D399");exPoint(ctx,px-Math.sin(t*2.5)*7,py+Math.cos(t*2.5)*7,p.rr*.24,"#34D399");}if(p.name==="saturn"){ctx.beginPath();ctx.ellipse(px,py,p.rr*1.55,p.rr*.37,-.3,0,Math.PI*2);ctx.strokeStyle="#FDE68A";ctx.lineWidth=4;ctx.stroke();}if(EX.planet===p.name){ctx.beginPath();ctx.arc(px,py,p.rr+10,0,Math.PI*2);ctx.strokeStyle="#F9A8D4";ctx.lineWidth=3;ctx.stroke();exText(ctx,exT(["Sao Thủy","Trái Đất","Sao Hỏa","Sao Thổ"][i],["Mercury","Earth","Mars","Saturn"][i]),px,py-p.rr-25,17);}});
  }
  function exDrawEarth(ctx,t){
    const grad=ctx.createLinearGradient(0,0,0,440);grad.addColorStop(0,"#DBF4FF");grad.addColorStop(1,"#F5E4FF");ctx.fillStyle=grad;ctx.fillRect(0,0,880,440);exCloud(ctx,110,85,1.1);exCloud(ctx,710,100,.75);
    const cx=420,cy=226,r=173;exPoint(ctx,cx,cy,r,"#22B8BA");exPoint(ctx,cx,cy,r-16,"#F7B553");exPoint(ctx,cx,cy,118,"#F97316");exPoint(ctx,cx,cy,72,"#F6D665");exPoint(ctx,cx,cy,35,"#FEF3A3");
    for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(cx,cy,120+i*22,Math.PI*1.2,Math.PI*1.8);ctx.strokeStyle="rgba(255,255,255,.2)";ctx.lineWidth=3;ctx.stroke();}
    const drill=EX.earthDepth/100*156;exLine(ctx,cx,cy-173,cx,cy-173+drill,"#1D4ED8",7);exPoint(ctx,cx,cy-173+drill,9,"#FFFFFF");exPoint(ctx,cx,cy-173+drill,6,"#1D4ED8");
    const d=EX.earthDepth;const layer=d<12?0:d<64?1:d<90?2:3;const names=LANG==="en"?["Crust","Mantle","Outer core","Inner core"]:["Vỏ Trái Đất","Lớp manti","Lõi ngoài","Lõi trong"];
    exRound(ctx,620,154,220,48,16,"rgba(255,255,255,.93)");exText(ctx,names[layer],730,178,21,"#581C87");
    ["#22B8BA","#F7B553","#F97316","#F6D665"].forEach((c,i)=>{exPoint(ctx,645,230+i*41,11,c);exText(ctx,names[i],671,230+i*41,16,"#334155","left")});
    exText(ctx,exT("Bé đang đi sâu vào Trái Đất", "Exploring deep inside Earth"),440,32,22,"#184E77");
  }
  function exDrawDinosaur(ctx,t){
    const bg=ctx.createLinearGradient(0,0,0,440);bg.addColorStop(0,"#BEEEF9");bg.addColorStop(1,"#E1F9CC");ctx.fillStyle=bg;ctx.fillRect(0,0,880,440);exCloud(ctx,100,90);exCloud(ctx,590,68,1.1);exRound(ctx,0,340,880,100,0,"#8CD887");
    for(let i=0;i<6;i++){const x=i*165+55;exLine(ctx,x,340,x,253,"#A16207",15);exPoint(ctx,x,246,37,"#16A34A");exPoint(ctx,x+28,265,29,"#22C55E")}
    const x=110+EX.walk*5.5,y=287+Math.sin(t*6)*(EX.walk>1?3:1);ctx.save();ctx.translate(x,y);
    const color=EX.dino==="trex"?"#FB923C":"#A78BFA";
    ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-20,-19);ctx.lineTo(-127,-95);ctx.lineTo(-50,6);ctx.fill();
    exPoint(ctx,0,-52,60,color);
    if(EX.dino==="longneck"){exLine(ctx,30,-65,72,-169,color,32);exPoint(ctx,83,-168,30,color);exPoint(ctx,94,-173,5,"#1E293B");}
    else {exLine(ctx,30,-53,78,-99,color,31);exRound(ctx,59,-123,72,35,14,color);exPoint(ctx,103,-112,5,"#1E293B");exLine(ctx,32,-41,64,-22,color,9);}
    for(let i=0;i<2;i++){const foot=i===0?-23:28;exLine(ctx,foot,-10,foot+Math.sin(t*6+i*Math.PI)*10,42,"#7C3AED",17);exLine(ctx,foot+Math.sin(t*6+i*Math.PI)*10,42,foot+21,46,"#7C3AED",9);}
    ctx.restore();
    const foodX=710;exRound(ctx,654,326,148,18,7,"#65A30D");exText(ctx,EX.food==="leaves"?"🌿":"🍖",foodX,276,74,"#14532D");
    exText(ctx,exT("Thử dự đoán bữa ăn", "Guess the dinosaur's meal"),440,35,23,"#164E63");
  }
  function exDrawInsect(ctx,t){
    const bg=ctx.createLinearGradient(0,0,0,440);bg.addColorStop(0,"#D6F5FF");bg.addColorStop(1,"#E7F9D6");ctx.fillStyle=bg;ctx.fillRect(0,0,880,440);exCloud(ctx,120,65);exRound(ctx,0,345,880,95,0,"#B7E9A7");
    const xs=[190,448,695],ys=[230,195,232];["#F9A8D4","#FDA4AF","#F472B6"].forEach((c,i)=>{exFlower(ctx,xs[i],ys[i],c,1.45);if(EX.pollinated && EX.visited.includes(i)){exText(ctx,"✓",xs[i]+48,ys[i]-40,33,"#047857")}});
    const bx=EX.beeX,by=122+Math.sin(t*9)*6;ctx.save();ctx.translate(bx,by);ctx.save();ctx.rotate(-.2);ctx.fillStyle="rgba(255,255,255,.82)";ctx.beginPath();ctx.ellipse(-12,-16,19,10,-.6,0,Math.PI*2);ctx.ellipse(8,-18,19,10,.5,0,Math.PI*2);ctx.fill();ctx.restore();exPoint(ctx,0,0,23,"#FACC15");exRound(ctx,-4,-20,8,40,2,"#1E293B");exRound(ctx,9,-18,6,36,2,"#1E293B");exPoint(ctx,16,-4,3,"#fff");ctx.restore();
    if(EX.pollenFrom>=0){exPoint(ctx,bx-26,by+8,6,"#FACC15");exPoint(ctx,bx+29,by+6,5,"#FBBF24")}
    exText(ctx,exT("Ong chuyển phấn hoa", "Bees move pollen"),440,42,24,"#166534");
    if(EX.pollinated){exRound(ctx,307,355,265,53,15,"#DCFCE7");exText(ctx,exT("Hạt có thể hình thành 🌱","Seeds may form 🌱"),440,382,22,"#166534")}
  }
  function exDrawVehicle(ctx,t){
    const bg=ctx.createLinearGradient(0,0,0,440);bg.addColorStop(0,"#BEEAFD");bg.addColorStop(1,"#F0FAFF");ctx.fillStyle=bg;ctx.fillRect(0,0,880,440);exCloud(ctx,125,88);exCloud(ctx,685,74);
    for(let i=0;i<5;i++){exRound(ctx,i*196-20,145,148,156,5,["#E9D5FF","#CCFBF1","#FDE68A"][i%3]);for(let y=0;y<3;y++)for(let x=0;x<3;x++)exRound(ctx,i*196+x*36+10,169+y*35,20,20,2,"#7DD3FC")}
    exRound(ctx,0,307,880,133,0,"#475569");for(let i=0;i<8;i++)exRound(ctx,i*120+20,411,64,5,1,"#F8FAFC");
    exRound(ctx,330,307,10,113,1,"#F8FAFC");for(let i=0;i<5;i++)exRound(ctx,335+i*20,312,10,77,0,"#E2E8F0");
    exRound(ctx,363,134,11,171,2,"#64748B");exRound(ctx,341,92,55,115,16,"#1E293B");["red","yellow","green"].forEach((c,i)=>exPoint(ctx,369,114+i*35,12,EX.light===c?["#EF4444","#FACC15","#22C55E"][i]:"#475569"));
    const x=EX.carX,y=350;exRound(ctx,x,y-30,130,49,17,"#0EA5E9");exRound(ctx,x+26,y-58,76,42,14,"#38BDF8");exRound(ctx,x+37,y-50,55,25,8,"#D6F4FE");for(let i=0;i<2;i++){exPoint(ctx,x+29+i*75,y+19,20,"#1E293B");exPoint(ctx,x+29+i*75,y+19,9,"#CBD5E1")}
    exText(ctx,exT("Thử đèn giao thông", "Try the traffic lights"),440,39,24,"#075985");
  }
  function exUpdateFeedback(){
    if(!root || activeTab!=="experience")return;
    const fb=root.querySelector("[data-ex-feedback]");if(fb)fb.textContent=exFeedbackText();
    root.querySelectorAll("[data-ex]").forEach(b=>{const a=b.dataset.ex,v=b.dataset.exValue;let on=a==="planet"&&v===EX.planet||a==="layer"&&+v===EX.earthDepth||a==="dino"&&v===EX.dino||a==="food"&&v===EX.food||a==="light"&&v===EX.light;b.setAttribute("aria-pressed",String(on));b.classList.toggle("is-on",on)})
  }
  function exTick(now){
    EX.raf=0;
    if(!root || !root.isConnected || activeTab!=="experience" || document.hidden)return;
    const can=root.querySelector(".gx-ex-canvas"),ctx=can?.getContext?.("2d");if(!ctx)return;
    const dt=EX.last?Math.min((now-EX.last)/1000,.07):0;EX.last=now;
    if(EX.running){EX.phase+=dt*(EX_KIND==="space"?(EX.speed/45):1);
      if(EX_KIND==="earth" && EX.earthDepth<100){EX.earthDepth=Math.min(100,EX.earthDepth+dt*12);const s=root.querySelector('[data-ex-range="depth"]');if(s)s.value=String(Math.round(EX.earthDepth));if(Math.floor(EX.earthDepth)%6===0)exUpdateFeedback();}
      if(EX_KIND==="dinosaur" && EX.walk>0 && EX.walk<95){EX.walk=Math.min(95,EX.walk+dt*27);if(EX.walk>=95){const ok=EX.dino==="longneck"?EX.food==="leaves":EX.food==="meat";EX.result=ok?{vi:"Đúng rồi! Khủng long cổ dài ăn cây, còn khủng long bạo chúa ăn thịt.",en:"Great! Long-necked dinosaurs ate plants, while T. rex ate meat."}:{vi:"Thử lại nhé! Khủng long cổ dài ăn thực vật; khủng long bạo chúa ăn thịt.",en:"Try again! Long-necked dinosaurs ate plants; T. rex ate meat."};exUpdateFeedback();}}
      if(EX_KIND==="insect"&&EX.beeTarget>=0){const xx=[190,448,695][EX.beeTarget];EX.beeX+=(xx-EX.beeX)*Math.min(1,dt*2.8);if(Math.abs(xx-EX.beeX)<3){EX.beeX=xx;const f=EX.beeTarget;EX.beeTarget=-1;if(!EX.visited.includes(f))EX.visited.push(f);if(EX.pollenFrom<0)EX.pollenFrom=f;else if(EX.pollenFrom!==f)EX.pollinated=true;exUpdateFeedback();}}
      if(EX_KIND==="vehicle"){const target=EX.carX>330?825:EX.light==="green"?825:EX.light==="yellow"?282:292;if(EX.carX<target){const rate=EX.light==="green"||EX.carX>330?105+EX.speed*1.6:EX.light==="yellow"?45:65;EX.carX=Math.min(target,EX.carX+dt*rate);}if(EX.carX>=825){EX.carX=75;EX.light="red";exUpdateFeedback();}}
    }
    ctx.clearRect(0,0,880,440);
    if(EX_KIND==="space")exDrawSpace(ctx,EX.phase);
    else if(EX_KIND==="earth")exDrawEarth(ctx,EX.phase);
    else if(EX_KIND==="dinosaur")exDrawDinosaur(ctx,EX.phase);
    else if(EX_KIND==="insect")exDrawInsect(ctx,EX.phase);
    else exDrawVehicle(ctx,EX.phase);
    if(EX_KIND==="earth"&&EX.running&&EX.earthDepth>=100){EX.running=false;exUpdateFeedback();}
    if(root.isConnected && !document.hidden && activeTab==="experience")EX.raf=requestAnimationFrame(exTick);
  }
  function startExperience(){stopExperience();EX.last=0;EX.raf=requestAnimationFrame(exTick);exUpdateFeedback();}
  function stopExperience(){if(EX.raf)cancelAnimationFrame(EX.raf);EX.raf=0;EX.last=0;}
  function exHandleClick(a,v){
    stopSpeak(false);
    if(a==="planet"){EX.planet=v;EX.result="";}
    if(a==="toggle"){EX.running=!EX.running;EX.result="";}
    if(a==="layer"){EX.earthDepth=+v;EX.running=false;EX.result="";const s=root.querySelector('[data-ex-range="depth"]');if(s)s.value=v;}
    if(a==="dino"||a==="food"){EX[a]=v;EX.walk=0;EX.result="";}
    if(a==="try"){EX.walk=1;EX.running=true;EX.result={vi:"Bạn khủng long đang đi tới bữa ăn…",en:"The dinosaur is walking to its meal…"};}
    if(a==="flower"){EX.beeTarget=+v;EX.running=true;EX.result="";}
    if(a==="light"){EX.light=v;EX.result="";EX.running=true;}
    if(a==="reset"){exReset();startExperience();}
    if(a==="listen")speak("experience",exFeedbackText(),true);
    exUpdateFeedback();
  }


  function renderStage({ readQuestion = false } = {}) {
    if (!root) return;
    stopExperience();
    stopSpeak(false);
    const stage = root.querySelector(".gx-stage");
    let html = "";
    if (activeTab === "travel") html = travelHtml();
    else if (activeTab === "dinos") html = gridHtml(DATA.primary);
    else if (activeTab === "eras") html = gridHtml(DATA.secondary);
    else if (activeTab === "experience") html = experienceHtml();
    else html = quizHtml();
    stage.innerHTML = `<section class="gx-panel" style="height:100%">${html}</section>`;
    updateSpeakButtons();
    if (activeTab === "experience") startExperience();
    if (activeTab === "quiz" && readQuestion && autoRead && quiz && quiz.i < quiz.items.length) {
      speak("quiz-q", questionSpeech(quiz.items[quiz.i]), false);
    }
  }

  function refreshAlbum() {
    const el = root && root.querySelector(".gx-album");
    if (el) el.innerHTML = albumHtml();
  }

  function toast(text) {
    const el = root && root.querySelector(".gx-toast");
    if (!el) return;
    el.textContent = text;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 3600);
  }

  function markFound(id) {
    if (!isDino(id) || found.has(id)) return;
    found.add(id);
    saveFound();
    refreshAlbum();
    const n = found.size, total = DATA.primary.length;
    if (n === total) toast("🏆 Con đã tìm đủ cả 9 loài khủng long! Giỏi quá!");
    else toast(`🦕 Đã thêm ${byId(id).name} vào bộ sưu tập (${n}/${total})`);
  }

  const TAB_LABELS = { travel: "Du hành thời gian", dinos: "Khủng long", eras: "Thời đại & hóa thạch", quiz: "Hỏi đáp" , experience: "Trải nghiệm để hiểu"};
  function setBanner() {
    const fn0 = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    const fn = typeof fn0 === "function" ? (o) => fn0({ ...o, items: ((o && o.items) || []).map((it) => ({ ...it, title: trText(it.title) })) }) : fn0;
    if (typeof fn !== "function") return;
    fn({ items: [{ level: 2, title: CONFIG.title, action: null }, { level: 3, title: (activeTab === "experience" ? exT("Trải nghiệm để hiểu", "Learn by doing") : TAB_LABELS[activeTab]), action: null }] });
  }

  function switchTab(tab, opts) {
    stopExperience();
    activeTab = tab;
    root.querySelectorAll(".gx-tab").forEach((b) => {
      const on = b.dataset.tab === tab;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
    });
    renderStage(opts);
    setBanner();
  }

  function selectDino(id, fromScene) {
    selectedId = id;
    stopSpeak(false);
    markFound(id);
    const info = root.querySelector("#gx-info");
    if (info) { info.innerHTML = detailHtml(byId(id)); info.scrollTop = 0; }
    root.querySelectorAll("[data-dino].gx-spot, [data-dino].gx-item, [data-object].gx-item").forEach((b) => {
      b.classList.toggle("is-selected", (b.dataset.dino || b.dataset.object) === id);
    });
    if (fromScene) {
      const spot = root.querySelector(`.gx-spot[data-dino="${id}"]`);
      if (spot) { spot.classList.remove("is-hop"); void spot.offsetWidth; spot.classList.add("is-hop"); }
    }
    root.querySelectorAll(".gx-item[data-dino]").forEach((b) => {
      if (found.has(b.dataset.dino) && !b.querySelector(".gx-tick")) b.insertAdjacentHTML("afterbegin", `<span class="gx-tick">✓ Đã gặp</span>`);
    });
    root.querySelectorAll(".gx-spot").forEach((b) => b.classList.toggle("is-found", found.has(b.dataset.dino)));
    updateSpeakButtons();
  }

  function answerQuiz(k) {
    if (!quiz || quiz.i >= quiz.items.length || quiz.chosen >= 0) return;
    const it = quiz.items[quiz.i];
    quiz.chosen = k;
    const ok = k === it.c;
    quiz.results[quiz.i] = ok;
    if (ok) quiz.score += 1;
    else quiz.wrong.push({ src: it.src, q: it.q, answer: it.a[it.c] });
    renderStage();
    const next = root.querySelector('[data-action="next-quiz"]');
    if (next) next.focus({ preventScroll: true });
    if (autoRead) speak("quiz-fb", ok ? `Chính xác! ${it.note}` : `Chưa đúng rồi. Đáp án đúng là ${it.a[it.c]}. ${it.note}`, false);
  }

  function bind() {
    controller = new AbortController();
    const signal = controller.signal;

    root.addEventListener("click", (event) => {
      const t = event.target;
      const expButton = t.closest("[data-ex]");
      if (expButton) { exHandleClick(expButton.dataset.ex, expButton.dataset.exValue || ""); return; }
      const tab = t.closest(".gx-tab");
      if (tab) { switchTab(tab.dataset.tab, { readQuestion: true }); return; }

      const era = t.closest("[data-era]");
      if (era) {
        activeEra = era.dataset.era;
        selectedId = activeEra;
        renderStage();
        return;
      }

      const dino = t.closest("[data-dino]");
      if (dino) {
        const id = dino.dataset.dino;
        if (dino.dataset.jump) {
          if (!found.has(id)) { toast("🔎 Con hãy tìm loài này trong tranh Du hành hoặc tab Khủng long nhé!"); return; }
          activeEra = ERA_OF[id];
          selectedId = id;
          switchTab("travel");
          selectDino(id, true);
          return;
        }
        selectDino(id, !!dino.classList.contains("gx-spot"));
        return;
      }

      const obj = t.closest("[data-object]");
      if (obj) { selectDino(obj.dataset.object, false); return; }

      const ans = t.closest("[data-answer]");
      if (ans) { answerQuiz(Number(ans.dataset.answer)); return; }

      const action = t.closest("[data-action]");
      if (!action) return;
      const a = action.dataset.action;
      if (a === "speak") { const o = byId(action.dataset.speakKey); speak(o.id, speechOf(o)); }
      else if (a === "speak-question" && quiz) speak("quiz-q", questionSpeech(quiz.items[quiz.i]));
      else if (a === "toggle-read") {
        autoRead = !autoRead;
        action.setAttribute("aria-checked", String(autoRead));
        if (!autoRead) stopSpeak();
      } else if (a === "next-quiz" && quiz && quiz.chosen >= 0) {
        quiz.i += 1; quiz.chosen = -1;
        renderStage({ readQuestion: true });
        if (quiz.i >= quiz.items.length && autoRead) {
          speak("quiz-end", `Con đúng ${quiz.score} trên ${quiz.items.length} câu.`, false);
        }
      } else if (a === "new-round") { quiz = makeRound(DATA.quiz); renderStage({ readQuestion: true }); }
      else if (a === "retry-wrong" && quiz && quiz.wrong.length) {
        quiz = makeRound(quiz.wrong.map((w) => w.src));
        renderStage({ readQuestion: true });
      }
    }, { signal });

    /* Phím mũi tên cho thanh tab, phím 1–4 / A–D và Enter cho hỏi đáp */
    root.addEventListener("keydown", (event) => {
      const tab = event.target.closest && event.target.closest(".gx-tab");
      if (tab && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
        const tabs = [...root.querySelectorAll(".gx-tab")];
        const n = tabs.indexOf(tab) + (event.key === "ArrowRight" ? 1 : -1);
        const target = tabs[(n + tabs.length) % tabs.length];
        target.focus();
        switchTab(target.dataset.tab, { readQuestion: true });
        event.preventDefault();
      }
    }, { signal });

    document.addEventListener("keydown", (event) => {
      if (!root || !root.isConnected || activeTab !== "quiz" || !quiz) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const tag = (event.target && event.target.tagName) || "";
      if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
      const map = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
      const k = map[String(event.key).toLowerCase()];
      if (k !== undefined && quiz.chosen < 0 && quiz.i < quiz.items.length && k < quiz.items[quiz.i].a.length) {
        answerQuiz(k); event.preventDefault();
      }
    }, { signal });

    root.addEventListener("input", (event) => {
      const r = event.target.closest("[data-ex-range]");
      if (!r || activeTab !== "experience") return;
      if (r.dataset.exRange === "speed") EX.speed = +r.value;
      if (r.dataset.exRange === "depth") { EX.earthDepth = +r.value; EX.running = false; EX.result = ""; }
      exUpdateFeedback();
    }, { signal });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { stopExperience(); stopSpeak(); }
      else if (root && root.isConnected && activeTab === "experience") startExperience();
    }, { signal });
    if (synth && typeof synth.addEventListener === "function") {
      synth.addEventListener("voiceschanged", () => {}, { signal });
    }
  }

  function render(context) {
    activeContext = context;
    injectAssets();
    exReset();
    activeTab = "travel";
    activeEra = "cretaceous";
    selectedId = DATA.overview.id;
    quiz = null;
    found = loadFound();
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `
      <header class="gx-head">
        <div class="gx-logo" aria-hidden="true">${dinoSvg("brachiosaurus")}</div>
        <div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div>
        ${langHtml()}<div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="travel" type="button" aria-selected="true">🕰️ Du hành</button>
        <button class="gx-tab" role="tab" data-tab="dinos" type="button" aria-selected="false" tabindex="-1">🦖 Khủng long</button>
        <button class="gx-tab" role="tab" data-tab="eras" type="button" aria-selected="false" tabindex="-1">🪨 Thời đại & hóa thạch</button>
        <button class="gx-tab" role="tab" data-tab="quiz" type="button" aria-selected="false" tabindex="-1">⭐ Hỏi đáp</button>
              <button class="gx-tab" role="tab" data-tab="experience" type="button" aria-selected="false" tabindex="-1">🎮 ${exT("Trải nghiệm", "Experience")}</button>
      </nav>
      <div class="gx-stage"></div>
      <div class="gx-toast" role="status" aria-live="polite"></div>`;
    context.host.replaceChildren(root);
    injectLangCss();
    root.setAttribute("lang", LANG);
    root.querySelector(".gx-lang").addEventListener("click", (e) => { const b = e.target.closest("[data-lang]"); if (b && b.dataset.lang !== LANG) setLang(b.dataset.lang); });
    watchLang(root);
    renderStage();
    bind();
    setBanner();
    if (LANG === "en") translateDom(root);
  }

  function destroy() {
    stopExperience();
    if (langObserver) { langObserver.disconnect(); langObserver = null; }
    stopSpeak(false);
    clearTimeout(toastTimer);
    if (controller) controller.abort();
    controller = null;
    if (root && root.isConnected) root.remove();
    root = null;
    activeContext = null;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[CONFIG.moduleKey] = { render, destroy };
})();
