(() => {
  "use strict";

  const CONFIG = Object.freeze({"moduleKey":"dinosaurExplorer","styleId":"class1-game-dinosaur-explorer-style","rootId":"dinosaur-explorer","title":"Khám phá khủng long","subtitle":"Cùng Cô Thỏ Hồng du hành về thế giới cổ đại","icon":"🦕","overviewId":"dino-overview","primaryTab":"Khủng long","secondaryTab":"Thời đại & hóa thạch","primaryIcon":"🦖","secondaryIcon":"🪨","finishIcon":"🦖","sceneTip":"👆 Chạm vào các khủng long để khám phá"});
  const DATA = Object.freeze({"overview":{"id":"dino-overview","name":"Thế giới khủng long","icon":"🦖","kicker":"KHÁM PHÁ KHỦNG LONG","subtitle":"Những sinh vật cổ đại kỳ thú","summary":"Khủng long là một nhóm bò sát sống trên Trái Đất hàng triệu năm trước, chủ yếu trong Đại Trung Sinh. Chúng có rất nhiều kích thước và hình dạng khác nhau.","more":"Không phải mọi sinh vật cổ đại đều là khủng long. Pterosaur bay và các bò sát biển như mosasaur không thuộc nhóm khủng long. Chim hiện đại là hậu duệ còn sống của một nhánh khủng long chân thú.","remember":"Bé nhớ: khủng long không sống cùng con người. Ta biết về chúng chủ yếu nhờ hóa thạch.","speech":"Thế giới khủng long. Khủng long là một nhóm bò sát sống trên Trái Đất hàng triệu năm trước, chủ yếu trong Đại Trung Sinh. Chúng có rất nhiều kích thước và hình dạng khác nhau. Không phải mọi sinh vật cổ đại đều là khủng long. Pterosaur bay và các bò sát biển như mosasaur không thuộc nhóm khủng long. Chim hiện đại là hậu duệ còn sống của một nhánh khủng long chân thú. Bé nhớ: khủng long không sống cùng con người. Ta biết về chúng chủ yếu nhờ hóa thạch.","facts":[{"label":"Thời đại","value":"Đại Trung Sinh"},{"label":"Khoảng thời gian","value":"Từ hơn 230 triệu năm trước tới 66 triệu năm trước"},{"label":"Dấu vết","value":"Hóa thạch"},{"label":"Đa dạng","value":"Ăn cỏ, ăn thịt, hai chân hoặc bốn chân"},{"label":"Không phải khủng long","value":"Pterosaur và mosasaur"},{"label":"Hậu duệ còn sống","value":"Chim"}]},"primary":[{"id":"trex","name":"Tyrannosaurus rex","icon":"🦖","kicker":"KHỦNG LONG","subtitle":"Kẻ săn mồi lớn cuối kỷ Phấn Trắng","summary":"Tyrannosaurus rex, thường gọi T. rex, là khủng long ăn thịt lớn sống ở Bắc Mỹ vào cuối kỷ Phấn Trắng.","more":"T. rex đi bằng hai chân, có đầu lớn, hàm rất khỏe và những chiếc răng lớn. Hai tay trước ngắn nhưng cơ thể và chân sau rất mạnh.","remember":"T. rex không sống cùng Stegosaurus; hai loài cách nhau hàng chục triệu năm.","speech":"Tyrannosaurus rex. Tyrannosaurus rex, thường gọi T. rex, là khủng long ăn thịt lớn sống ở Bắc Mỹ vào cuối kỷ Phấn Trắng. T. rex đi bằng hai chân, có đầu lớn, hàm rất khỏe và những chiếc răng lớn. Hai tay trước ngắn nhưng cơ thể và chân sau rất mạnh. T. rex không sống cùng Stegosaurus; hai loài cách nhau hàng chục triệu năm.","facts":[{"label":"Thức ăn","value":"Ăn thịt"},{"label":"Đi lại","value":"Hai chân"},{"label":"Thời kỳ","value":"Cuối kỷ Phấn Trắng"},{"label":"Điểm nổi bật","value":"Hàm khỏe, răng lớn"}]},{"id":"triceratops","name":"Triceratops","icon":"🦏","kicker":"KHỦNG LONG","subtitle":"Ba sừng và tấm bờm lớn","summary":"Triceratops là khủng long ăn thực vật sống vào cuối kỷ Phấn Trắng.","more":"Nó có ba chiếc sừng nổi bật và một tấm bờm xương lớn phía sau đầu. Triceratops đi bằng bốn chân.","remember":"Triceratops sống cùng thời với T. rex.","speech":"Triceratops. Triceratops là khủng long ăn thực vật sống vào cuối kỷ Phấn Trắng. Nó có ba chiếc sừng nổi bật và một tấm bờm xương lớn phía sau đầu. Triceratops đi bằng bốn chân. Triceratops sống cùng thời với T. rex.","facts":[{"label":"Thức ăn","value":"Ăn thực vật"},{"label":"Đi lại","value":"Bốn chân"},{"label":"Thời kỳ","value":"Cuối kỷ Phấn Trắng"},{"label":"Điểm nổi bật","value":"Ba sừng và bờm xương"}]},{"id":"stegosaurus","name":"Stegosaurus","icon":"🦕","kicker":"KHỦNG LONG","subtitle":"Những tấm xương lớn trên lưng","summary":"Stegosaurus là khủng long ăn thực vật sống vào cuối kỷ Jura.","more":"Nó có hai hàng tấm xương lớn dọc lưng và các gai ở cuối đuôi. Đầu của Stegosaurus khá nhỏ so với cơ thể.","remember":"Stegosaurus sống trước T. rex rất lâu.","speech":"Stegosaurus. Stegosaurus là khủng long ăn thực vật sống vào cuối kỷ Jura. Nó có hai hàng tấm xương lớn dọc lưng và các gai ở cuối đuôi. Đầu của Stegosaurus khá nhỏ so với cơ thể. Stegosaurus sống trước T. rex rất lâu.","facts":[{"label":"Thức ăn","value":"Ăn thực vật"},{"label":"Thời kỳ","value":"Cuối kỷ Jura"},{"label":"Trên lưng","value":"Các tấm xương lớn"},{"label":"Đuôi","value":"Có gai"}]},{"id":"brachiosaurus","name":"Brachiosaurus","icon":"🦕","kicker":"KHỦNG LONG","subtitle":"Cổ dài, chân trước cao","summary":"Brachiosaurus là khủng long sauropod ăn thực vật có cổ dài, sống vào cuối kỷ Jura.","more":"Điểm nổi bật là chân trước dài hơn chân sau, làm phần vai cao. Cổ dài giúp nó với tới lá ở trên cao.","remember":"Brachiosaurus đi bằng bốn chân và có cơ thể rất lớn.","speech":"Brachiosaurus. Brachiosaurus là khủng long sauropod ăn thực vật có cổ dài, sống vào cuối kỷ Jura. Điểm nổi bật là chân trước dài hơn chân sau, làm phần vai cao. Cổ dài giúp nó với tới lá ở trên cao. Brachiosaurus đi bằng bốn chân và có cơ thể rất lớn.","facts":[{"label":"Nhóm","value":"Sauropod"},{"label":"Thức ăn","value":"Ăn thực vật"},{"label":"Thời kỳ","value":"Cuối kỷ Jura"},{"label":"Đặc điểm","value":"Chân trước dài hơn chân sau"}]},{"id":"velociraptor","name":"Velociraptor","icon":"🪶","kicker":"KHỦNG LONG","subtitle":"Nhỏ, nhanh nhẹn và có lông vũ","summary":"Velociraptor là khủng long chân thú nhỏ sống vào cuối kỷ Phấn Trắng ở châu Á.","more":"Bằng chứng hóa thạch cho thấy nó có lông vũ. Nó có một móng cong lớn trên ngón chân thứ hai.","remember":"Velociraptor thật nhỏ hơn rất nhiều so với hình ảnh thường thấy trong phim.","speech":"Velociraptor. Velociraptor là khủng long chân thú nhỏ sống vào cuối kỷ Phấn Trắng ở châu Á. Bằng chứng hóa thạch cho thấy nó có lông vũ. Nó có một móng cong lớn trên ngón chân thứ hai. Velociraptor thật nhỏ hơn rất nhiều so với hình ảnh thường thấy trong phim.","facts":[{"label":"Kích thước","value":"Nhỏ hơn nhiều so với người trưởng thành"},{"label":"Thời kỳ","value":"Cuối kỷ Phấn Trắng"},{"label":"Cơ thể","value":"Có lông vũ"},{"label":"Bàn chân","value":"Có móng cong lớn"}]},{"id":"ankylosaurus","name":"Ankylosaurus","icon":"🛡️","kicker":"KHỦNG LONG","subtitle":"Bộ giáp xương và chùy đuôi","summary":"Ankylosaurus là khủng long ăn thực vật sống vào cuối kỷ Phấn Trắng.","more":"Cơ thể được bảo vệ bởi các tấm xương dưới da. Phần đuôi có chùy xương lớn có thể dùng để tự vệ.","remember":"Ankylosaurus đi bằng bốn chân và có thân thấp, rộng.","speech":"Ankylosaurus. Ankylosaurus là khủng long ăn thực vật sống vào cuối kỷ Phấn Trắng. Cơ thể được bảo vệ bởi các tấm xương dưới da. Phần đuôi có chùy xương lớn có thể dùng để tự vệ. Ankylosaurus đi bằng bốn chân và có thân thấp, rộng.","facts":[{"label":"Thức ăn","value":"Ăn thực vật"},{"label":"Bảo vệ","value":"Giáp xương"},{"label":"Đuôi","value":"Có chùy xương"},{"label":"Thời kỳ","value":"Cuối kỷ Phấn Trắng"}]},{"id":"parasaurolophus","name":"Parasaurolophus","icon":"🎺","kicker":"KHỦNG LONG","subtitle":"Mào dài trên đầu","summary":"Parasaurolophus là khủng long mỏ vịt ăn thực vật sống vào cuối kỷ Phấn Trắng.","more":"Nó có chiếc mào dài và rỗng phía sau đầu. Các nhà khoa học cho rằng chiếc mào có thể liên quan tới phát âm và nhận biết nhau.","remember":"Parasaurolophus có thể đi bằng hai chân hoặc bốn chân.","speech":"Parasaurolophus. Parasaurolophus là khủng long mỏ vịt ăn thực vật sống vào cuối kỷ Phấn Trắng. Nó có chiếc mào dài và rỗng phía sau đầu. Các nhà khoa học cho rằng chiếc mào có thể liên quan tới phát âm và nhận biết nhau. Parasaurolophus có thể đi bằng hai chân hoặc bốn chân.","facts":[{"label":"Nhóm","value":"Khủng long mỏ vịt"},{"label":"Thức ăn","value":"Ăn thực vật"},{"label":"Điểm nổi bật","value":"Mào dài rỗng"},{"label":"Thời kỳ","value":"Cuối kỷ Phấn Trắng"}]},{"id":"spinosaurus","name":"Spinosaurus","icon":"🦖","kicker":"KHỦNG LONG","subtitle":"Chiếc buồm cao trên lưng","summary":"Spinosaurus là khủng long ăn thịt sống trong kỷ Phấn Trắng ở Bắc Phi.","more":"Nó có mõm dài giống cá sấu và các gai sống lưng rất cao tạo thành cấu trúc giống cánh buồm. Hóa thạch cho thấy nó có nhiều thích nghi với môi trường sông nước và ăn cả cá.","remember":"Cách Spinosaurus di chuyển và sống dưới nước đến mức nào vẫn là chủ đề được nghiên cứu.","speech":"Spinosaurus. Spinosaurus là khủng long ăn thịt sống trong kỷ Phấn Trắng ở Bắc Phi. Nó có mõm dài giống cá sấu và các gai sống lưng rất cao tạo thành cấu trúc giống cánh buồm. Hóa thạch cho thấy nó có nhiều thích nghi với môi trường sông nước và ăn cả cá. Cách Spinosaurus di chuyển và sống dưới nước đến mức nào vẫn là chủ đề được nghiên cứu.","facts":[{"label":"Thức ăn","value":"Ăn thịt, có cả cá"},{"label":"Thời kỳ","value":"Kỷ Phấn Trắng"},{"label":"Đầu","value":"Mõm dài"},{"label":"Điểm nổi bật","value":"Gai lưng cao như cánh buồm"}]},{"id":"diplodocus","name":"Diplodocus","icon":"🦕","kicker":"KHỦNG LONG","subtitle":"Cổ dài và đuôi rất dài","summary":"Diplodocus là khủng long sauropod ăn thực vật sống vào cuối kỷ Jura ở Bắc Mỹ.","more":"Nó có cổ dài, đầu nhỏ và chiếc đuôi rất dài. Cơ thể lớn nhưng xương có nhiều đặc điểm giúp giảm khối lượng.","remember":"Diplodocus đi bằng bốn chân và ăn thực vật.","speech":"Diplodocus. Diplodocus là khủng long sauropod ăn thực vật sống vào cuối kỷ Jura ở Bắc Mỹ. Nó có cổ dài, đầu nhỏ và chiếc đuôi rất dài. Cơ thể lớn nhưng xương có nhiều đặc điểm giúp giảm khối lượng. Diplodocus đi bằng bốn chân và ăn thực vật.","facts":[{"label":"Nhóm","value":"Sauropod"},{"label":"Thức ăn","value":"Ăn thực vật"},{"label":"Thời kỳ","value":"Cuối kỷ Jura"},{"label":"Đặc điểm","value":"Cổ dài và đuôi rất dài"}]}],"secondary":[{"id":"triassic","name":"Kỷ Trias","icon":"1️⃣","kicker":"THỜI ĐẠI & HÓA THẠCH","subtitle":"Giai đoạn đầu của Đại Trung Sinh","summary":"Kỷ Trias bắt đầu khoảng 252 triệu năm trước. Những khủng long đầu tiên xuất hiện trong kỷ này.","more":"Lúc đầu khủng long chưa chiếm ưu thế như ở các giai đoạn sau. Các lục địa khi đó còn nối thành siêu lục địa Pangaea.","remember":"Trias là kỷ đầu tiên trong ba kỷ của Đại Trung Sinh.","speech":"Kỷ Trias. Kỷ Trias bắt đầu khoảng 252 triệu năm trước. Những khủng long đầu tiên xuất hiện trong kỷ này. Lúc đầu khủng long chưa chiếm ưu thế như ở các giai đoạn sau. Các lục địa khi đó còn nối thành siêu lục địa Pangaea. Trias là kỷ đầu tiên trong ba kỷ của Đại Trung Sinh.","facts":[{"label":"Thứ tự","value":"Đầu tiên"},{"label":"Bắt đầu","value":"Khoảng 252 triệu năm trước"},{"label":"Sự kiện","value":"Khủng long đầu tiên xuất hiện"},{"label":"Lục địa","value":"Pangaea còn tồn tại"}]},{"id":"jurassic","name":"Kỷ Jura","icon":"2️⃣","kicker":"THỜI ĐẠI & HÓA THẠCH","subtitle":"Thời của nhiều khủng long khổng lồ","summary":"Kỷ Jura diễn ra sau kỷ Trias và trước kỷ Phấn Trắng.","more":"Nhiều sauropod cổ dài rất lớn sống trong kỷ Jura, cùng các loài như Stegosaurus. Những dạng chim sơ khai cũng xuất hiện.","remember":"Stegosaurus và Diplodocus thuộc kỷ Jura, không sống cùng T. rex.","speech":"Kỷ Jura. Kỷ Jura diễn ra sau kỷ Trias và trước kỷ Phấn Trắng. Nhiều sauropod cổ dài rất lớn sống trong kỷ Jura, cùng các loài như Stegosaurus. Những dạng chim sơ khai cũng xuất hiện. Stegosaurus và Diplodocus thuộc kỷ Jura, không sống cùng T. rex.","facts":[{"label":"Thứ tự","value":"Thứ hai"},{"label":"Sau","value":"Kỷ Trias"},{"label":"Trước","value":"Kỷ Phấn Trắng"},{"label":"Loài nổi bật","value":"Stegosaurus, Diplodocus"}]},{"id":"cretaceous","name":"Kỷ Phấn Trắng","icon":"3️⃣","kicker":"THỜI ĐẠI & HÓA THẠCH","subtitle":"Kỷ cuối của Đại Trung Sinh","summary":"Kỷ Phấn Trắng kéo dài tới khoảng 66 triệu năm trước và là kỷ cuối cùng của Đại Trung Sinh.","more":"T. rex, Triceratops, Velociraptor và Ankylosaurus sống trong kỷ này. Cuối kỷ xảy ra một sự kiện tuyệt chủng hàng loạt.","remember":"Nhiều khủng long nổi tiếng sống ở Phấn Trắng chứ không phải cùng thời với các loài Jura.","speech":"Kỷ Phấn Trắng. Kỷ Phấn Trắng kéo dài tới khoảng 66 triệu năm trước và là kỷ cuối cùng của Đại Trung Sinh. T. rex, Triceratops, Velociraptor và Ankylosaurus sống trong kỷ này. Cuối kỷ xảy ra một sự kiện tuyệt chủng hàng loạt. Nhiều khủng long nổi tiếng sống ở Phấn Trắng chứ không phải cùng thời với các loài Jura.","facts":[{"label":"Thứ tự","value":"Cuối cùng"},{"label":"Kết thúc","value":"Khoảng 66 triệu năm trước"},{"label":"Loài nổi bật","value":"T. rex, Triceratops"},{"label":"Cuối kỷ","value":"Tuyệt chủng hàng loạt"}]},{"id":"fossil","name":"Hóa thạch","icon":"🪨","kicker":"THỜI ĐẠI & HÓA THẠCH","subtitle":"Dấu vết của sinh vật cổ","summary":"Hóa thạch là phần còn lại hoặc dấu vết của sinh vật sống trong quá khứ được bảo tồn trong đá hoặc vật liệu khác.","more":"Xương, răng, dấu chân, trứng, phân hóa thạch và dấu in lá đều có thể trở thành hóa thạch.","remember":"Hóa thạch giúp ta tìm hiểu sinh vật đã sống như thế nào dù chúng đã biến mất từ rất lâu.","speech":"Hóa thạch. Hóa thạch là phần còn lại hoặc dấu vết của sinh vật sống trong quá khứ được bảo tồn trong đá hoặc vật liệu khác. Xương, răng, dấu chân, trứng, phân hóa thạch và dấu in lá đều có thể trở thành hóa thạch. Hóa thạch giúp ta tìm hiểu sinh vật đã sống như thế nào dù chúng đã biến mất từ rất lâu.","facts":[{"label":"Có thể là","value":"Xương hoặc răng"},{"label":"Cũng có thể là","value":"Dấu chân"},{"label":"Nơi thường gặp","value":"Trong các lớp đá"},{"label":"Giúp biết","value":"Sự sống trong quá khứ"}]},{"id":"paleontologist","name":"Nhà cổ sinh vật học","icon":"🔎","kicker":"THỜI ĐẠI & HÓA THẠCH","subtitle":"Người nghiên cứu sự sống cổ đại","summary":"Nhà cổ sinh vật học nghiên cứu hóa thạch để hiểu các sinh vật và môi trường sống trong quá khứ.","more":"Họ khai quật cẩn thận, ghi lại vị trí mẫu vật, so sánh xương và dùng nhiều phương pháp khoa học khác nhau.","remember":"Tìm hóa thạch không giống săn kho báu; cần ghi chép và bảo tồn thông tin khoa học.","speech":"Nhà cổ sinh vật học. Nhà cổ sinh vật học nghiên cứu hóa thạch để hiểu các sinh vật và môi trường sống trong quá khứ. Họ khai quật cẩn thận, ghi lại vị trí mẫu vật, so sánh xương và dùng nhiều phương pháp khoa học khác nhau. Tìm hóa thạch không giống săn kho báu; cần ghi chép và bảo tồn thông tin khoa học.","facts":[{"label":"Nghiên cứu","value":"Hóa thạch"},{"label":"Mục tiêu","value":"Hiểu sự sống cổ đại"},{"label":"Khi khai quật","value":"Cần cẩn thận"},{"label":"Công việc","value":"Ghi chép, so sánh, phân tích"}]},{"id":"extinction","name":"Sự tuyệt chủng cuối Phấn Trắng","icon":"☄️","kicker":"THỜI ĐẠI & HÓA THẠCH","subtitle":"Biến cố lớn khoảng 66 triệu năm trước","summary":"Khoảng 66 triệu năm trước, một tiểu hành tinh lớn va vào Trái Đất và góp phần gây ra biến đổi môi trường nghiêm trọng.","more":"Sự kiện này liên quan tới cuộc tuyệt chủng làm biến mất các khủng long không phải chim cùng nhiều sinh vật khác. Một số nhóm, trong đó có tổ tiên của chim hiện đại, sống sót.","remember":"Không phải mọi dạng sống đều biến mất; chim là nhánh khủng long còn tồn tại đến hôm nay.","speech":"Sự tuyệt chủng cuối Phấn Trắng. Khoảng 66 triệu năm trước, một tiểu hành tinh lớn va vào Trái Đất và góp phần gây ra biến đổi môi trường nghiêm trọng. Sự kiện này liên quan tới cuộc tuyệt chủng làm biến mất các khủng long không phải chim cùng nhiều sinh vật khác. Một số nhóm, trong đó có tổ tiên của chim hiện đại, sống sót. Không phải mọi dạng sống đều biến mất; chim là nhánh khủng long còn tồn tại đến hôm nay.","facts":[{"label":"Thời điểm","value":"Khoảng 66 triệu năm trước"},{"label":"Nguyên nhân lớn","value":"Va chạm tiểu hành tinh"},{"label":"Biến mất","value":"Khủng long không phải chim"},{"label":"Còn sống","value":"Nhánh dẫn tới chim hiện đại"}]}],"quiz":[{"q":"Khủng long sống chủ yếu trong đại nào?","a":["Đại Trung Sinh","Đại Băng Hà hiện đại","Thời kỳ đồ đá của con người","Thời đại máy hơi nước"],"c":0,"note":"Khủng long sống chủ yếu trong Đại Trung Sinh."},{"q":"Khủng long có sống cùng con người không?","a":["Không","Có, cùng thời","Chỉ ở thành phố","Chỉ ở châu Âu"],"c":0,"note":"Khủng long không sống cùng con người."},{"q":"Ta biết nhiều về khủng long nhờ gì?","a":["Hóa thạch","Ảnh chụp cổ","Phim hoạt hình","Máy ghi âm"],"c":0,"note":"Hóa thạch là nguồn bằng chứng quan trọng về khủng long."},{"q":"Pterosaur bay có phải là khủng long không?","a":["Không","Có","Chỉ con nhỏ mới là khủng long","Chỉ khi có lông"],"c":0,"note":"Pterosaur là bò sát bay, không phải khủng long."},{"q":"Nhóm động vật hiện đại nào là hậu duệ của một nhánh khủng long?","a":["Chim","Cá voi","Ếch","Giun"],"c":0,"note":"Chim hiện đại là hậu duệ của khủng long chân thú."},{"q":"Khủng long có tất cả cùng kích thước không?","a":["Không, rất đa dạng","Có, đều khổng lồ","Đều nhỏ bằng mèo","Đều bằng nhau"],"c":0,"note":"Khủng long có kích thước và hình dạng rất đa dạng."},{"q":"T. rex ăn gì?","a":["Thịt","Chỉ lá cây","Chỉ hạt","Chỉ cỏ"],"c":0,"note":"T. rex là khủng long ăn thịt."},{"q":"T. rex đi chủ yếu bằng mấy chân?","a":["Hai chân","Bốn chân","Sáu chân","Không có chân"],"c":0,"note":"T. rex đi bằng hai chân."},{"q":"Đặc điểm nổi bật của T. rex là gì?","a":["Hàm khỏe và răng lớn","Ba sừng","Mào dài rỗng","Vành giáp lưng"],"c":0,"note":"T. rex có đầu lớn, hàm khỏe và răng lớn."},{"q":"Triceratops có bao nhiêu sừng nổi bật?","a":["Ba","Một","Hai","Sáu"],"c":0,"note":"Tên Triceratops gợi tới ba sừng."},{"q":"Triceratops ăn gì?","a":["Thực vật","Thịt","Cá","Côn trùng"],"c":0,"note":"Triceratops là khủng long ăn thực vật."},{"q":"Triceratops sống cùng thời với loài nào?","a":["T. rex","Stegosaurus","Diplodocus","Brachiosaurus"],"c":0,"note":"Triceratops và T. rex cùng sống vào cuối kỷ Phấn Trắng."},{"q":"Stegosaurus nổi bật với gì trên lưng?","a":["Các tấm xương lớn","Cánh lông vũ","Ba sừng","Mào rỗng"],"c":0,"note":"Stegosaurus có hai hàng tấm xương lớn dọc lưng."},{"q":"Stegosaurus sống trong kỷ nào?","a":["Jura","Trias đầu","Phấn Trắng cuối","Hiện đại"],"c":0,"note":"Stegosaurus sống vào cuối kỷ Jura."},{"q":"Đuôi Stegosaurus có gì?","a":["Các gai","Một chùy tròn","Lông dài","Không có gì"],"c":0,"note":"Cuối đuôi Stegosaurus có các gai."},{"q":"Điểm đặc biệt ở chân Brachiosaurus là gì?","a":["Chân trước dài hơn chân sau","Không có chân sau","Chân sau dài gấp đôi","Chỉ có hai chân"],"c":0,"note":"Brachiosaurus có chân trước dài hơn chân sau."},{"q":"Brachiosaurus thuộc nhóm nào?","a":["Sauropod cổ dài","Khủng long ba sừng","Khủng long giáp","Khủng long mỏ vịt"],"c":0,"note":"Brachiosaurus là một sauropod cổ dài."},{"q":"Velociraptor thật có kích thước thế nào so với hình ảnh trong nhiều phim?","a":["Nhỏ hơn nhiều","Lớn hơn gấp mười","Bằng cá voi","To như Brachiosaurus"],"c":0,"note":"Velociraptor thật nhỏ hơn rất nhiều so với hình ảnh phổ biến trong phim."},{"q":"Bằng chứng hóa thạch cho thấy Velociraptor có gì?","a":["Lông vũ","Ba sừng","Mai cứng như rùa","Vòi dài"],"c":0,"note":"Velociraptor có lông vũ."},{"q":"Velociraptor có móng cong lớn ở đâu?","a":["Ngón chân thứ hai","Đầu mũi","Đuôi","Cánh"],"c":0,"note":"Velociraptor có móng cong lớn ở ngón chân thứ hai."},{"q":"Ankylosaurus có cách bảo vệ nổi bật nào?","a":["Giáp xương và chùy đuôi","Cánh lớn","Ba sừng dài","Mào rỗng"],"c":0,"note":"Ankylosaurus có giáp xương và chùy đuôi."},{"q":"Ankylosaurus ăn gì?","a":["Thực vật","Chỉ cá","Thịt","Chỉ côn trùng"],"c":0,"note":"Ankylosaurus là khủng long ăn thực vật."},{"q":"Parasaurolophus nổi bật với gì?","a":["Mào dài rỗng","Ba sừng","Tấm lưng lớn","Chùy đuôi"],"c":0,"note":"Parasaurolophus có chiếc mào dài và rỗng."},{"q":"Parasaurolophus thuộc nhóm nào?","a":["Khủng long mỏ vịt","Khủng long giáp","Sauropod","Pterosaur"],"c":0,"note":"Parasaurolophus là một hadrosaur, thường gọi khủng long mỏ vịt."},{"q":"Spinosaurus có đặc điểm nổi bật nào trên lưng?","a":["Các gai rất cao tạo hình như cánh buồm","Ba sừng","Tấm giáp tròn","Lông đuôi dài"],"c":0,"note":"Spinosaurus có các gai sống lưng cao tạo cấu trúc giống cánh buồm."},{"q":"Spinosaurus có mõm giống loài nào?","a":["Cá sấu","Voi","Ngựa","Chim sẻ"],"c":0,"note":"Spinosaurus có mõm dài giống cá sấu."},{"q":"Diplodocus nổi bật với đặc điểm nào?","a":["Cổ dài và đuôi rất dài","Ba sừng","Cánh lớn","Mào trên đầu"],"c":0,"note":"Diplodocus có cổ dài và chiếc đuôi rất dài."},{"q":"Diplodocus ăn gì?","a":["Thực vật","Thịt","Cá","Chỉ trứng"],"c":0,"note":"Diplodocus là khủng long ăn thực vật."},{"q":"Kỷ đầu tiên của Đại Trung Sinh là gì?","a":["Trias","Jura","Phấn Trắng","Đệ Tứ"],"c":0,"note":"Trias là kỷ đầu của Đại Trung Sinh."},{"q":"Những khủng long đầu tiên xuất hiện trong kỷ nào?","a":["Trias","Phấn Trắng","Sau Phấn Trắng","Hiện đại"],"c":0,"note":"Những khủng long đầu tiên xuất hiện trong kỷ Trias."},{"q":"Kỷ nào nằm giữa Trias và Phấn Trắng?","a":["Jura","Đệ Tam","Băng Hà","Không có kỷ nào"],"c":0,"note":"Jura nằm giữa Trias và Phấn Trắng."},{"q":"Stegosaurus và Diplodocus nổi bật ở kỷ nào?","a":["Jura","Phấn Trắng cuối","Hiện đại","Trias sớm"],"c":0,"note":"Stegosaurus và Diplodocus sống vào cuối kỷ Jura."},{"q":"Kỷ cuối cùng của Đại Trung Sinh là gì?","a":["Phấn Trắng","Trias","Jura","Đá mới"],"c":0,"note":"Phấn Trắng là kỷ cuối của Đại Trung Sinh."},{"q":"T. rex và Triceratops sống vào thời kỳ nào?","a":["Cuối kỷ Phấn Trắng","Đầu kỷ Trias","Cuối kỷ Jura","Sau khi con người xuất hiện"],"c":0,"note":"Cả hai sống vào cuối kỷ Phấn Trắng."},{"q":"Hóa thạch có thể là gì?","a":["Xương, răng hoặc dấu chân cổ","Chỉ đá không có dấu vết","Chỉ lá cây hôm nay","Chỉ ảnh chụp"],"c":0,"note":"Hóa thạch có thể là phần còn lại hoặc dấu vết của sinh vật cổ."},{"q":"Ai nghiên cứu hóa thạch và sự sống cổ đại?","a":["Nhà cổ sinh vật học","Phi công","Nhạc sĩ","Đầu bếp"],"c":0,"note":"Nhà cổ sinh vật học nghiên cứu hóa thạch."},{"q":"Khi khai quật hóa thạch cần làm gì?","a":["Cẩn thận và ghi chép vị trí","Đào thật nhanh rồi bỏ vị trí","Đập đá tùy ý","Mang đi mà không ghi gì"],"c":0,"note":"Thông tin vị trí và bối cảnh rất quan trọng trong nghiên cứu."},{"q":"Sự kiện tuyệt chủng lớn cuối kỷ Phấn Trắng xảy ra khoảng khi nào?","a":["66 triệu năm trước","600 năm trước","6 nghìn năm trước","Hôm qua"],"c":0,"note":"Sự kiện này xảy ra khoảng 66 triệu năm trước."},{"q":"Một nguyên nhân lớn góp phần vào tuyệt chủng cuối Phấn Trắng là gì?","a":["Va chạm tiểu hành tinh lớn","Mưa nhẹ","Gió mùa","Cầu vồng"],"c":0,"note":"Va chạm tiểu hành tinh là nguyên nhân lớn của biến cố này."},{"q":"Có phải mọi khủng long đều biến mất hoàn toàn không?","a":["Không, nhánh dẫn tới chim còn sống","Có, không còn hậu duệ nào","Chỉ cá sống sót","Chỉ côn trùng sống sót"],"c":0,"note":"Chim là nhánh khủng long còn tồn tại đến ngày nay."}]});
  const SCENE_HTML = "<div class=\"gx-scene-bg\" style=\"background:linear-gradient(180deg,#FDE68A 0%,#FED7AA 48%,#DCFCE7 48%,#86EFAC 100%)\"><div style=\"position:absolute;left:5%;bottom:12%;font-size:72px;opacity:.55\">🌴</div><div style=\"position:absolute;right:4%;bottom:8%;font-size:82px;opacity:.6\">🌿</div><div style=\"position:absolute;right:16%;top:8%;font-size:62px;opacity:.35\">🌋</div><button class=\"gx-hotspot\" type=\"button\" data-object=\"trex\" style=\"left:58%;top:28%;--gx-size:86px\" aria-label=\"T. rex\">\n              <span class=\"gx-hotspot-icon\">🦖</span><small>T. rex</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"brachiosaurus\" style=\"left:12%;top:22%;--gx-size:92px\" aria-label=\"Brachiosaurus\">\n              <span class=\"gx-hotspot-icon\">🦕</span><small>Brachiosaurus</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"triceratops\" style=\"left:36%;top:58%;--gx-size:72px\" aria-label=\"Triceratops\">\n              <span class=\"gx-hotspot-icon\">🦏</span><small>Triceratops</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"stegosaurus\" style=\"left:70%;top:60%;--gx-size:76px\" aria-label=\"Stegosaurus\">\n              <span class=\"gx-hotspot-icon\">🦕</span><small>Stegosaurus</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"velociraptor\" style=\"left:30%;top:16%;--gx-size:62px\" aria-label=\"Velociraptor\">\n              <span class=\"gx-hotspot-icon\">🪶</span><small>Velociraptor</small>\n            </button></div>";

  let controller = null;
  let root = null;
  let activeContext = null;
  let activeTab = "overview";
  let selectedId = CONFIG.overviewId;
  let quizIndex = 0;
  let quizScore = 0;
  let quizLocked = false;

  const ttsAudio = new Audio();
  ttsAudio.referrerPolicy = "no-referrer";
  ttsAudio.preload = "none";
  let ttsNonce = 0;
  let ttsQueue = [];
  let speakingKey = "";

  function ttsUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(String(text || ""))}`;
  }

  function splitTtsText(text, maxLength = 170) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return [];
    const sentences = clean.match(/[^.!?;,:]+[.!?;,:]?/g) || [clean];
    const chunks = [];
    let buffer = "";
    sentences.forEach((piece) => {
      const part = piece.trim();
      if (!part) return;
      if (!buffer) buffer = part;
      else if ((buffer + " " + part).length <= maxLength) buffer += " " + part;
      else {
        chunks.push(buffer);
        buffer = part;
      }
    });
    if (buffer) chunks.push(buffer);
    return chunks.flatMap((chunk) => {
      if (chunk.length <= maxLength) return [chunk];
      const words = chunk.split(" ");
      const parts = [];
      let current = "";
      words.forEach((word) => {
        if (!current || (current + " " + word).length <= maxLength) current = current ? current + " " + word : word;
        else {
          parts.push(current);
          current = word;
        }
      });
      if (current) parts.push(current);
      return parts;
    });
  }

  function updateSpeakButtons() {
    if (!root) return;
    root.querySelectorAll(".gx-read").forEach((btn) => {
      const on = speakingKey && btn.dataset.speakKey === speakingKey && !ttsAudio.paused;
      btn.classList.toggle("is-speaking", !!on);
      btn.textContent = on ? "⏹️ Dừng đọc" : "🔊 Nghe cô đọc";
    });
  }

  function stopSpeak(refresh = true) {
    ttsNonce += 1;
    ttsQueue = [];
    speakingKey = "";
    try {
      ttsAudio.pause();
      ttsAudio.currentTime = 0;
      ttsAudio.removeAttribute("src");
      ttsAudio.load();
    } catch (_) {}
    if (refresh) updateSpeakButtons();
  }

  function showVoiceNote() {
    speakingKey = "";
    updateSpeakButtons();
    const note = root && root.querySelector(".gx-voice-note");
    if (note) {
      note.hidden = false;
      note.textContent = "Chưa phát được giọng đọc. Con thử bấm lại hoặc kiểm tra kết nối mạng nhé.";
    }
  }

  function playNext(nonce) {
    if (nonce !== ttsNonce || !ttsQueue.length) {
      speakingKey = "";
      updateSpeakButtons();
      return;
    }
    const chunk = ttsQueue.shift();
    try {
      ttsAudio.pause();
      ttsAudio.currentTime = 0;
      ttsAudio.src = ttsUrl(chunk);
      ttsAudio.playbackRate = 0.96;
      const promise = ttsAudio.play();
      if (promise && typeof promise.catch === "function") promise.catch(showVoiceNote);
    } catch (_) {
      showVoiceNote();
    }
  }

  function speak(key, text) {
    if (speakingKey === key && !ttsAudio.paused) {
      stopSpeak();
      return;
    }
    const chunks = splitTtsText(text);
    if (!chunks.length) return;
    stopSpeak(false);
    const nonce = ++ttsNonce;
    speakingKey = key;
    ttsQueue = chunks.slice();
    updateSpeakButtons();
    playNext(nonce);
  }

  ttsAudio.addEventListener("ended", () => {
    const nonce = ttsNonce;
    if (ttsQueue.length) playNext(nonce);
    else {
      speakingKey = "";
      updateSpeakButtons();
    }
  });

  function injectStyle() {
    if (document.getElementById(CONFIG.styleId)) return;
    const style = document.createElement("style");
    style.id = CONFIG.styleId;
    style.textContent = `
      #${CONFIG.rootId}{
        --gx-pink:#EC4899;--gx-purple:#8B5CF6;--gx-blue:#3B82F6;--gx-green:#10B981;--gx-ink:#344054;
        width:100%;height:min(740px,calc(100vh - 135px));min-height:630px;
        border:1px solid #E9D5FF;border-radius:24px;overflow:hidden;
        background:
          radial-gradient(circle at 14% 10%,rgba(244,114,182,.12),transparent 28%),
          radial-gradient(circle at 85% 15%,rgba(59,130,246,.12),transparent 27%),
          linear-gradient(180deg,#FFFCFE,#FAF8FF 50%,#F5FBFF);
        box-shadow:0 10px 28px rgba(76,29,149,.08);
        display:grid;grid-template-rows:auto auto minmax(0,1fr);color:var(--gx-ink)
      }
      #${CONFIG.rootId} *{box-sizing:border-box}
      #${CONFIG.rootId} button{font:inherit}
      .gx-head{display:flex;align-items:center;gap:12px;padding:13px 18px 9px}
      .gx-logo{width:52px;height:52px;flex:0 0 52px;border-radius:16px;background:linear-gradient(135deg,#FFF1F7,#E0F2FE);display:flex;align-items:center;justify-content:center;border:1px solid #F9A8D4;box-shadow:0 4px 12px rgba(139,92,246,.12);font-size:31px}
      .gx-head h2{margin:0;color:#5B216E;font-size:28px;line-height:1.05;font-weight:950}
      .gx-head p{margin:3px 0 0;color:#667085;font-size:14px;font-weight:850}
      .gx-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0 18px 11px}
      .gx-tab{min-height:46px;border:1px solid;border-radius:15px;font-size:15px;font-weight:950!important;box-shadow:0 3px 8px rgba(76,29,149,.05);transition:.15s ease}
      .gx-tab:nth-child(1){background:#FFF1F7;border-color:#F9A8D4;color:#BE185D}
      .gx-tab:nth-child(2){background:#F5F3FF;border-color:#C4B5FD;color:#6D28D9}
      .gx-tab:nth-child(3){background:#EFF8FF;border-color:#7DD3FC;color:#0369A1}
      .gx-tab:nth-child(4){background:#ECFDF5;border-color:#86EFAC;color:#047857}
      .gx-tab.is-active{color:#fff;border-color:transparent;transform:translateY(-1px)}
      .gx-tab:nth-child(1).is-active,.gx-tab:nth-child(2).is-active{background:linear-gradient(90deg,#EC4899,#8B5CF6)}
      .gx-tab:nth-child(3).is-active,.gx-tab:nth-child(4).is-active{background:linear-gradient(90deg,#3B82F6,#10B981)}
      .gx-stage{min-height:0;padding:0 18px 16px}
      .gx-panel{height:100%;min-height:0}
      .gx-overview,.gx-list{height:100%;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(390px,1fr);gap:12px}
      .gx-card{min-height:0;border:1px solid rgba(196,181,253,.76);border-radius:20px;background:rgba(255,255,255,.94);box-shadow:0 7px 18px rgba(76,29,149,.06);overflow:hidden}
      .gx-scene{position:relative;min-height:0;overflow:hidden}
      .gx-scene-bg{position:absolute;inset:0;overflow:hidden}
      .gx-hotspot{position:absolute;z-index:3;border:0;background:rgba(255,255,255,.78);min-width:74px;min-height:72px;padding:6px 8px;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:#5B216E;font-weight:950;box-shadow:0 5px 14px rgba(15,23,42,.12);backdrop-filter:blur(2px);transform:translate(-50%,-50%);transition:.15s ease}
      .gx-hotspot:hover,.gx-hotspot:focus-visible{transform:translate(-50%,-50%) scale(1.05);outline:3px solid rgba(236,72,153,.34);outline-offset:2px}
      .gx-hotspot-icon{font-size:var(--gx-size,58px);line-height:1}
      .gx-hotspot small{font-size:11px;line-height:1.1}
      .gx-map-tip{position:absolute;left:14px;bottom:13px;z-index:5;padding:8px 11px;border-radius:12px;background:rgba(255,255,255,.93);color:#5B216E;font-size:12.5px;font-weight:950;box-shadow:0 4px 12px rgba(15,23,42,.13)}
      .gx-info{padding:17px 18px 16px;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#C4B5FD #FAF5FF}
      .gx-info::-webkit-scrollbar{width:8px}.gx-info::-webkit-scrollbar-track{background:#FAF5FF;border-radius:999px}.gx-info::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#F9A8D4,#C4B5FD,#7DD3FC);border-radius:999px;border:2px solid #FAF5FF}
      .gx-kicker{color:#EC4899;font-size:12px;font-weight:950;letter-spacing:.07em;text-transform:uppercase}
      .gx-info h3{margin:4px 0 5px;color:#5B216E;font-size:28px;line-height:1.08}
      .gx-subtitle{color:#0369A1;font-size:13px;font-weight:950;margin-bottom:7px}
      .gx-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:4px 0 10px}
      .gx-read{min-height:40px;padding:0 14px;border:1px solid #86EFAC;border-radius:12px;background:linear-gradient(90deg,#ECFDF5,#E0F2FE);color:#047857;font-size:14px;font-weight:950}
      .gx-read.is-speaking{color:#fff;border-color:transparent;background:linear-gradient(90deg,#EC4899,#8B5CF6)}
      .gx-info p{margin:0 0 10px;color:#475467;font-size:15.5px;line-height:1.55;font-weight:780}
      .gx-facts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .gx-fact{padding:9px 10px;border:1px solid #E9D5FF;border-radius:13px;background:linear-gradient(145deg,#FAF5FF,#F8FAFC)}
      .gx-fact strong{display:block;color:#6D28D9;font-size:12.5px;line-height:1.25}
      .gx-fact span{display:block;margin-top:3px;color:#475467;font-size:12.5px;line-height:1.4;font-weight:820}
      .gx-rabbit{margin-top:10px;padding:10px 11px;border:1px solid #F9A8D4;border-radius:14px;background:#FFF1F7;color:#BE185D;font-size:12.5px;line-height:1.45;font-weight:900}
      .gx-voice-note{margin-top:8px;padding:8px;border-radius:12px;background:#FFF7ED;color:#C2410C;font-size:12px;font-weight:900}
      .gx-grid{padding:9px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(102px,1fr);gap:8px;overflow:auto}
      .gx-object{border:1px solid #E9D5FF;border-radius:16px;background:linear-gradient(145deg,#FFF,#FAF5FF);padding:8px;display:flex;align-items:center;gap:8px;text-align:left;min-width:0;transition:.15s ease;box-shadow:0 3px 8px rgba(76,29,149,.05)}
      .gx-object:hover,.gx-object.is-selected{transform:translateY(-1px);border-color:#A855F7;box-shadow:0 7px 15px rgba(139,92,246,.14)}
      .gx-object.is-selected{background:linear-gradient(145deg,#FFF1F7,#EFF8FF)}
      .gx-art{width:54px;height:54px;flex:0 0 54px;border-radius:16px;background:rgba(255,255,255,.82);display:flex;align-items:center;justify-content:center;font-size:34px;box-shadow:inset 0 0 0 1px rgba(196,181,253,.45)}
      .gx-object-copy{min-width:0}.gx-object-copy strong{display:block;color:#344054;font-size:13px;line-height:1.18}.gx-object-copy small{display:block;margin-top:3px;color:#667085;font-size:10.5px;font-weight:800;line-height:1.25}
      .gx-quiz{height:100%;display:grid;grid-template-columns:minmax(0,1.12fr) minmax(275px,.55fr);gap:12px}
      .gx-quiz-main{padding:18px;border:1px solid #E9D5FF;border-radius:19px;background:rgba(255,255,255,.95);display:flex;flex-direction:column;min-height:0}
      .gx-quiz-meta{display:flex;justify-content:space-between;gap:10px;color:#667085;font-size:13px;font-weight:900}
      .gx-track{height:9px;border-radius:999px;background:#EDE9FE;overflow:hidden;margin:9px 0 16px}.gx-bar{height:100%;background:linear-gradient(90deg,#EC4899,#8B5CF6,#3B82F6,#10B981)}
      .gx-question{margin:0 0 14px;color:#344054;font-size:22px;line-height:1.35;font-weight:950}
      .gx-answers{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .gx-answer{min-height:56px;padding:10px 12px;border:1.5px solid #D8B4FE;border-radius:15px;background:#fff;color:#5B216E;text-align:left;font-size:15px;font-weight:900}
      .gx-answer.correct{background:#ECFDF5;border-color:#10B981;color:#047857}.gx-answer.wrong{background:#FFF1F2;border-color:#FB7185;color:#BE123C}.gx-answer:disabled{cursor:default}
      .gx-feedback{min-height:48px;margin-top:11px;padding:10px 12px;border-radius:13px;background:#F8FAFC;color:#475467;font-size:13px;font-weight:850;line-height:1.5}
      .gx-next{margin-top:auto;align-self:flex-end;min-width:136px;min-height:42px;border:0;border-radius:13px;background:linear-gradient(90deg,#EC4899,#8B5CF6);color:#fff;font-weight:950;box-shadow:0 5px 12px rgba(139,92,246,.2)}
      .gx-next:disabled{opacity:.5;cursor:not-allowed}
      .gx-score{padding:16px;border:1px solid #BAE6FD;border-radius:18px;background:linear-gradient(145deg,#EFF8FF,#ECFDF5);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
      .gx-score-ring{width:112px;height:112px;border:2px dashed #7DD3FC;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#0369A1;font-size:35px;font-weight:950;margin-bottom:10px}
      .gx-score strong{color:#047857;font-size:17px}.gx-score p{margin:5px 0 0;color:#475467;font-size:13px;font-weight:800;line-height:1.45}
      .gx-reset{margin-top:12px;min-height:38px;padding:0 14px;border:1px solid #86EFAC;border-radius:12px;background:#fff;color:#047857;font-weight:950}
      @media(max-width:1024px){
        #${CONFIG.rootId}{height:min(705px,calc(100vh - 110px));min-height:600px}
        .gx-head{padding:12px 14px 9px}.gx-tabs{padding:0 14px 10px}.gx-stage{padding:0 14px 14px}
        .gx-overview,.gx-list{grid-template-columns:minmax(0,1fr) minmax(330px,.95fr)}
        .gx-grid{grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(96px,1fr)}
      }
      @media(max-width:760px){
        #${CONFIG.rootId}{height:auto;min-height:0;overflow:visible}
        .gx-tabs{grid-template-columns:1fr 1fr}.gx-stage{min-height:590px}
        .gx-overview,.gx-list,.gx-quiz{grid-template-columns:1fr;grid-template-rows:minmax(330px,1fr) auto}
        .gx-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:minmax(80px,auto)}
        .gx-answers{grid-template-columns:1fr}.gx-facts{grid-template-columns:1fr}
      }
      @media(prefers-reduced-motion:reduce){#${CONFIG.rootId} *{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function objectById(id) {
    return [DATA.overview, ...DATA.primary, ...DATA.secondary].find((item) => item.id === id) || DATA.overview;
  }

  function detailHtml(obj) {
    return `
      <div class="gx-kicker">${obj.kicker}</div>
      <h3>${obj.name}</h3>
      <div class="gx-subtitle">${obj.subtitle}</div>
      <div class="gx-actions"><button class="gx-read" type="button" data-action="speak" data-speak-key="${obj.id}">🔊 Nghe cô đọc</button></div>
      <p><strong>🌟 Điều nổi bật:</strong> ${obj.summary}</p>
      <p><strong>🔭 Khám phá thêm:</strong> ${obj.more}</p>
      <p><strong>🧠 Bé nhớ nhé:</strong> ${obj.remember}</p>
      <div class="gx-facts">${obj.facts.map((fact) => `<div class="gx-fact"><strong>${fact.label}</strong><span>${fact.value}</span></div>`).join("")}</div>
      <div class="gx-rabbit">🐰 Cô Thỏ Hồng: Con chạm vào từng mục, nghe cô đọc rồi sang tab Hỏi đáp để kiểm tra kiến thức nhé!</div>
      <div class="gx-voice-note" hidden></div>
    `;
  }

  function overviewHtml() {
    return `<div class="gx-overview"><div class="gx-card gx-scene">${SCENE_HTML}<div class="gx-map-tip">${CONFIG.sceneTip}</div></div><aside class="gx-card gx-info" id="gx-info">${detailHtml(objectById(selectedId))}</aside></div>`;
  }

  function listHtml(items) {
    if (!items.some((item) => item.id === selectedId)) selectedId = items[0].id;
    return `<div class="gx-list">
      <div class="gx-card gx-grid">${items.map((obj) => `<button class="gx-object ${obj.id === selectedId ? "is-selected" : ""}" type="button" data-object="${obj.id}"><span class="gx-art">${obj.icon}</span><span class="gx-object-copy"><strong>${obj.name}</strong><small>${obj.subtitle}</small></span></button>`).join("")}</div>
      <aside class="gx-card gx-info" id="gx-info">${detailHtml(objectById(selectedId))}</aside>
    </div>`;
  }

  function quizHtml() {
    if (quizIndex >= DATA.quiz.length) {
      return `<div class="gx-quiz"><div class="gx-quiz-main" style="align-items:center;justify-content:center;text-align:center"><div style="font-size:54px">${CONFIG.finishIcon}</div><h3 class="gx-question">Hoàn thành chuyến khám phá!</h3><div class="gx-feedback">Con đã trả lời đúng <strong>${quizScore}/${DATA.quiz.length}</strong> câu.</div><button class="gx-next" type="button" data-action="reset-quiz" style="align-self:center;margin-top:14px">Chơi lại</button></div><aside class="gx-score"><div class="gx-score-ring">${quizScore}</div><strong>Điểm khám phá</strong><p>Con có thể quay lại các tab kiến thức, nghe Cô Thỏ Hồng đọc rồi thử lại nhé!</p></aside></div>`;
    }
    const current = DATA.quiz[quizIndex];
    return `<div class="gx-quiz"><div class="gx-quiz-main"><div class="gx-quiz-meta"><span>Câu ${quizIndex + 1}/${DATA.quiz.length}</span><span>Đúng: ${quizScore}</span></div><div class="gx-track"><div class="gx-bar" style="width:${(quizIndex / DATA.quiz.length) * 100}%"></div></div><h3 class="gx-question">${current.q}</h3><div class="gx-answers">${current.a.map((answer, index) => `<button class="gx-answer" type="button" data-answer="${index}"><span style="opacity:.65;margin-right:6px">${String.fromCharCode(65 + index)}.</span>${answer}</button>`).join("")}</div><div class="gx-feedback" id="gx-feedback">🐰 Cô Thỏ Hồng: Con chọn một đáp án nhé!</div><button class="gx-next" type="button" data-action="next-quiz" disabled>${quizIndex === DATA.quiz.length - 1 ? "Xem kết quả" : "Câu tiếp theo →"}</button></div><aside class="gx-score"><div class="gx-score-ring">${quizScore}</div><strong>Điểm khám phá</strong><p>40 câu hỏi đều lấy từ kiến thức con vừa khám phá trong game.</p><button class="gx-reset" type="button" data-action="reset-quiz">Làm lại từ đầu</button></aside></div>`;
  }

  function renderStage() {
    if (!root) return;
    stopSpeak(false);
    const stage = root.querySelector(".gx-stage");
    if (activeTab === "overview") stage.innerHTML = `<section class="gx-panel">${overviewHtml()}</section>`;
    else if (activeTab === "primary") stage.innerHTML = `<section class="gx-panel">${listHtml(DATA.primary)}</section>`;
    else if (activeTab === "secondary") stage.innerHTML = `<section class="gx-panel">${listHtml(DATA.secondary)}</section>`;
    else stage.innerHTML = `<section class="gx-panel">${quizHtml()}</section>`;
    updateSpeakButtons();
  }

  function setBanner() {
    const fn = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof fn !== "function") return;
    const labels = {overview:"Tổng quan", primary:CONFIG.primaryTab, secondary:CONFIG.secondaryTab, quiz:"Hỏi đáp"};
    fn({items:[{level:2,title:CONFIG.title,action:null},{level:3,title:labels[activeTab],action:null}]});
  }

  function bind() {
    controller = new AbortController();
    const signal = controller.signal;
    root.addEventListener("click", (event) => {
      const tab = event.target.closest(".gx-tab");
      if (tab) {
        activeTab = tab.dataset.tab;
        if (activeTab === "overview") selectedId = CONFIG.overviewId;
        root.querySelectorAll(".gx-tab").forEach((button) => button.classList.toggle("is-active", button.dataset.tab === activeTab));
        renderStage();
        setBanner();
        return;
      }

      const speakBtn = event.target.closest('[data-action="speak"]');
      if (speakBtn) {
        const obj = objectById(speakBtn.dataset.speakKey);
        speak(obj.id, obj.speech);
        return;
      }

      const objectBtn = event.target.closest("[data-object]");
      if (objectBtn) {
        selectedId = objectBtn.dataset.object;
        stopSpeak();
        const info = root.querySelector("#gx-info");
        if (info) info.innerHTML = detailHtml(objectById(selectedId));
        root.querySelectorAll(".gx-object").forEach((button) => button.classList.toggle("is-selected", button.dataset.object === selectedId));
        updateSpeakButtons();
        return;
      }

      const answer = event.target.closest("[data-answer]");
      if (answer && activeTab === "quiz" && !quizLocked) {
        const current = DATA.quiz[quizIndex];
        const chosen = Number(answer.dataset.answer);
        quizLocked = true;
        if (chosen === current.c) quizScore += 1;
        root.querySelectorAll(".gx-answer").forEach((button) => {
          button.disabled = true;
          const index = Number(button.dataset.answer);
          if (index === current.c) button.classList.add("correct");
          else if (index === chosen) button.classList.add("wrong");
        });
        const feedback = root.querySelector("#gx-feedback");
        if (feedback) feedback.innerHTML = chosen === current.c ? `🌟 Chính xác! ${current.note}` : `💡 Chưa đúng rồi. ${current.note}`;
        const next = root.querySelector('[data-action="next-quiz"]');
        if (next) next.disabled = false;
        const score = root.querySelector(".gx-score-ring");
        if (score) score.textContent = String(quizScore);
        return;
      }

      const action = event.target.closest("[data-action]");
      if (!action) return;
      if (action.dataset.action === "next-quiz") {
        if (!quizLocked) return;
        quizIndex += 1;
        quizLocked = false;
        renderStage();
      } else if (action.dataset.action === "reset-quiz") {
        quizIndex = 0;
        quizScore = 0;
        quizLocked = false;
        renderStage();
      }
    }, {signal});
  }

  function render(context) {
    activeContext = context;
    injectStyle();
    activeTab = "overview";
    selectedId = CONFIG.overviewId;
    quizIndex = 0;
    quizScore = 0;
    quizLocked = false;
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `<header class="gx-head"><div class="gx-logo">${CONFIG.icon}</div><div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div></header><nav class="gx-tabs" aria-label="Các khu vực khám phá"><button class="gx-tab is-active" data-tab="overview" type="button">🌟 Tổng quan</button><button class="gx-tab" data-tab="primary" type="button">${CONFIG.primaryIcon} ${CONFIG.primaryTab}</button><button class="gx-tab" data-tab="secondary" type="button">${CONFIG.secondaryIcon} ${CONFIG.secondaryTab}</button><button class="gx-tab" data-tab="quiz" type="button">🚀 Hỏi đáp</button></nav><div class="gx-stage"></div>`;
    context.host.replaceChildren(root);
    renderStage();
    bind();
    setBanner();
  }

  function destroy() {
    stopSpeak(false);
    if (controller) controller.abort();
    controller = null;
    if (root && root.isConnected) root.remove();
    root = null;
    activeContext = null;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[CONFIG.moduleKey] = {render, destroy};
})();
