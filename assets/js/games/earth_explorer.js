(() => {
  "use strict";

  /* =====================================================================
     Khám phá Trái Đất — bản nâng cấp
     Giữ nguyên giao diện module: window.CLASS1_GAME_MODULES.earthExplorer
     = { render(context), destroy() }, context.host, context.hooks.setSubBanner
     ===================================================================== */

  const CONFIG = Object.freeze({
    moduleKey: "earthExplorer",
    styleId: "class1-game-earth-explorer-style-v2",
    fontId: "class1-game-explorer-font",
    rootId: "earth-explorer",
    gameNumber: 11,
    title: "Khám phá Trái Đất",
    subtitle: "Cùng Cô Thỏ Hồng khám phá hành tinh xanh của chúng ta",
    storageKey: "class1.earthExplorer.found.v1",
    roundSize: 10
  });

  const DATA = Object.freeze({"overview": {"id": "earth-overview", "name": "Hành tinh Trái Đất", "subtitle": "Ngôi nhà xanh của chúng ta", "summary": "Trái Đất là hành tinh thứ ba tính từ Mặt Trời và là ngôi nhà của con người cùng vô số sinh vật. Bề mặt có đại dương, lục địa, núi, đồng bằng, sông, hồ và rất nhiều kiểu địa hình.", "more": "Trái Đất tự quay quanh trục tạo nên ngày và đêm, đồng thời chuyển động quanh Mặt Trời tạo nên một năm. Bên trong Trái Đất gồm nhiều lớp khác nhau: vỏ, lớp phủ, lõi ngoài và lõi trong.", "remember": "Bé nhớ nhé: Trái Đất có nước, không khí, đất đá và điều kiện phù hợp cho sự sống.", "facts": [{"label": "Vị trí", "value": "Hành tinh thứ 3"}, {"label": "Nước bề mặt", "value": "Khoảng 71%"}, {"label": "Đất liền", "value": "Khoảng 29%"}, {"label": "Một ngày", "value": "Khoảng 24 giờ"}, {"label": "Một năm", "value": "Khoảng 365,25 ngày"}, {"label": "Vệ tinh tự nhiên", "value": "Mặt Trăng"}]}, "primary": [{"id": "crust", "name": "Vỏ Trái Đất", "subtitle": "Lớp ngoài cùng", "summary": "Vỏ Trái Đất là lớp đá rắn mỏng ở ngoài cùng, nơi chúng ta đang sống.", "more": "Vỏ đại dương thường mỏng hơn vỏ lục địa. So với kích thước cả Trái Đất, lớp vỏ rất mỏng, giống như lớp vỏ mỏng bên ngoài của một quả trứng.", "remember": "Là lớp ngoài cùng, rắn và mỏng nhất.", "facts": [{"label": "Vị trí", "value": "Ngoài cùng"}, {"label": "Trạng thái", "value": "Rắn"}, {"label": "Độ dày", "value": "Khoảng 5–70 km"}, {"label": "Gồm", "value": "Vỏ đại dương và vỏ lục địa"}, {"label": "Nơi sống", "value": "Con người và hầu hết sinh vật trên cạn"}]}, {"id": "mantle", "name": "Lớp phủ", "subtitle": "Lớp dày nhất", "summary": "Lớp phủ nằm dưới vỏ và chiếm phần lớn thể tích Trái Đất.", "more": "Đá ở lớp phủ rất nóng. Phần lớn vẫn là chất rắn nhưng có thể biến dạng và chuyển động cực kỳ chậm trong thời gian dài, góp phần làm các mảng vỏ Trái Đất dịch chuyển.", "remember": "Là lớp rất dày, nóng và chuyển động rất chậm.", "facts": [{"label": "Vị trí", "value": "Dưới vỏ"}, {"label": "Độ dày", "value": "Khoảng 2.900 km"}, {"label": "Nhiệt độ", "value": "Rất nóng"}, {"label": "Vật chất", "value": "Đá nóng, phần lớn ở trạng thái rắn nhưng có thể biến dạng"}, {"label": "Vai trò", "value": "Liên quan tới chuyển động các mảng kiến tạo"}]}, {"id": "outer-core", "name": "Lõi ngoài", "subtitle": "Kim loại lỏng", "summary": "Lõi ngoài nằm sâu dưới lớp phủ và chủ yếu gồm sắt cùng niken ở trạng thái lỏng.", "more": "Dòng chuyển động của kim loại lỏng trong lõi ngoài giúp tạo ra từ trường Trái Đất, một lớp bảo vệ quan trọng trước nhiều hạt mang điện từ không gian.", "remember": "Là lớp kim loại lỏng và góp phần tạo từ trường Trái Đất.", "facts": [{"label": "Vị trí", "value": "Bao quanh lõi trong"}, {"label": "Trạng thái", "value": "Lỏng"}, {"label": "Thành phần chính", "value": "Sắt và niken"}, {"label": "Nhiệt độ", "value": "Rất cao"}, {"label": "Vai trò", "value": "Góp phần tạo từ trường Trái Đất"}]}, {"id": "inner-core", "name": "Lõi trong", "subtitle": "Trung tâm Trái Đất", "summary": "Lõi trong là phần nằm ở chính giữa Trái Đất và chủ yếu gồm sắt cùng niken.", "more": "Nhiệt độ ở đây rất cao, nhưng áp suất khổng lồ khiến vật chất vẫn ở trạng thái rắn. Đây là lớp nhỏ nhất trong bốn lớp chính nhưng có mật độ rất lớn.", "remember": "Nằm ở trung tâm, rất nóng nhưng vẫn rắn vì áp suất cực lớn.", "facts": [{"label": "Vị trí", "value": "Trung tâm"}, {"label": "Trạng thái", "value": "Rắn"}, {"label": "Thành phần chính", "value": "Sắt và niken"}, {"label": "Nhiệt độ", "value": "Rất cao"}, {"label": "Áp suất", "value": "Cực lớn"}]}], "secondary": [{"id": "mountain", "name": "Núi", "subtitle": "Vùng đất cao", "summary": "Núi là dạng địa hình nhô cao rõ rệt so với vùng xung quanh, thường có sườn dốc và đỉnh.", "more": "Núi có thể hình thành do các mảng kiến tạo đẩy ép nhau, do núi lửa hoặc các quá trình địa chất kéo dài hàng triệu năm.", "remember": "Núi cao hơn rõ rệt so với khu vực xung quanh và thường có sườn dốc.", "facts": [{"label": "Đặc điểm", "value": "Cao, sườn dốc"}, {"label": "Bộ phận", "value": "Chân núi, sườn núi, đỉnh núi"}, {"label": "Hình thành", "value": "Kiến tạo, núi lửa và xói mòn"}, {"label": "Ví dụ", "value": "Các dãy núi lớn trên lục địa"}]}, {"id": "plain", "name": "Đồng bằng", "subtitle": "Vùng đất tương đối bằng phẳng", "summary": "Đồng bằng là vùng đất rộng, khá bằng phẳng hoặc chỉ gợn nhẹ.", "more": "Nhiều đồng bằng có đất màu mỡ do phù sa sông bồi đắp, nên rất thuận lợi cho trồng trọt và xây dựng khu dân cư.", "remember": "Đồng bằng thường thấp và khá bằng phẳng.", "facts": [{"label": "Đặc điểm", "value": "Rộng, khá bằng phẳng"}, {"label": "Độ cao", "value": "Thường thấp hơn vùng núi"}, {"label": "Liên hệ", "value": "Nhiều nơi có sông và đất phù sa"}, {"label": "Con người", "value": "Thuận lợi cho nông nghiệp và đô thị"}]}, {"id": "plateau", "name": "Cao nguyên", "subtitle": "Cao nhưng khá bằng phẳng", "summary": "Cao nguyên là vùng đất nằm cao hơn khu vực xung quanh nhưng mặt trên tương đối bằng hoặc lượn sóng.", "more": "Cao nguyên khác núi ở chỗ phần trên thường rộng và khá bằng phẳng. Một số cao nguyên được hình thành từ hoạt động núi lửa cổ hoặc sự nâng lên của vỏ Trái Đất.", "remember": "Cao hơn đồng bằng nhưng mặt trên thường khá rộng và bằng.", "facts": [{"label": "Đặc điểm", "value": "Cao, mặt trên khá bằng"}, {"label": "So với núi", "value": "Ít có đỉnh nhọn liên tục"}, {"label": "Hình thành", "value": "Nâng kiến tạo hoặc dung nham cổ"}, {"label": "Cảnh quan", "value": "Có thể có đồng cỏ, rừng, nông nghiệp"}]}, {"id": "valley", "name": "Thung lũng", "subtitle": "Vùng thấp giữa các vùng cao", "summary": "Thung lũng là vùng đất thấp nằm giữa núi hoặc đồi, thường kéo dài thành dải.", "more": "Nhiều thung lũng được sông bào mòn qua thời gian. Một số thung lũng khác được tạo bởi băng hà cổ.", "remember": "Thung lũng là phần đất thấp nằm giữa các vùng cao.", "facts": [{"label": "Đặc điểm", "value": "Thấp hơn vùng xung quanh"}, {"label": "Vị trí", "value": "Giữa núi hoặc đồi"}, {"label": "Thường có", "value": "Sông hoặc suối"}, {"label": "Hình thành", "value": "Xói mòn của sông hoặc băng hà"}]}, {"id": "river", "name": "Sông", "subtitle": "Dòng nước chảy", "summary": "Sông là dòng nước tự nhiên chảy từ nơi cao xuống nơi thấp và thường đổ ra hồ, biển hoặc một con sông khác.", "more": "Sông vận chuyển nước và phù sa, tạo môi trường sống cho nhiều sinh vật và cung cấp nước cho con người.", "remember": "Nước sông chảy theo độ dốc từ nơi cao xuống nơi thấp.", "facts": [{"label": "Dạng", "value": "Dòng nước chảy"}, {"label": "Hướng chung", "value": "Từ cao xuống thấp"}, {"label": "Có thể đổ vào", "value": "Biển, hồ hoặc sông khác"}, {"label": "Vai trò", "value": "Nước, phù sa, môi trường sống"}]}, {"id": "lake", "name": "Hồ", "subtitle": "Khối nước nằm trong đất liền", "summary": "Hồ là vùng nước được đất bao quanh phần lớn hoặc hoàn toàn.", "more": "Hồ có thể là nước ngọt hoặc nước mặn. Chúng hình thành theo nhiều cách như do sông, băng hà, miệng núi lửa hoặc chuyển động của vỏ Trái Đất.", "remember": "Hồ là một vùng nước nằm trong đất liền.", "facts": [{"label": "Vị trí", "value": "Trong đất liền"}, {"label": "Nước", "value": "Có thể ngọt hoặc mặn"}, {"label": "Hình thành", "value": "Nhiều nguyên nhân khác nhau"}, {"label": "Vai trò", "value": "Môi trường sống, trữ nước"}]}, {"id": "island", "name": "Đảo", "subtitle": "Đất được nước bao quanh", "summary": "Đảo là một vùng đất được nước bao quanh ở mọi phía.", "more": "Đảo có thể rất nhỏ hoặc rất lớn. Một số đảo hình thành do núi lửa, một số là phần đất cao của lục địa bị nước bao quanh.", "remember": "Đảo là đất có nước bao quanh bốn phía.", "facts": [{"label": "Đặc điểm", "value": "Đất được nước bao quanh"}, {"label": "Kích thước", "value": "Từ rất nhỏ tới rất lớn"}, {"label": "Hình thành", "value": "Có thể do núi lửa hoặc kiến tạo"}, {"label": "Môi trường", "value": "Có hệ sinh thái riêng"}]}, {"id": "desert", "name": "Sa mạc", "subtitle": "Nơi rất ít mưa", "summary": "Sa mạc là vùng có lượng mưa rất ít, nên thực vật thường thưa thớt.", "more": "Không phải sa mạc nào cũng nóng. Có cả sa mạc lạnh. Điểm chung quan trọng nhất là lượng mưa rất thấp.", "remember": "Sa mạc được xác định chủ yếu bởi sự khô hạn, không phải chỉ bởi nhiệt độ nóng.", "facts": [{"label": "Đặc điểm", "value": "Rất ít mưa"}, {"label": "Thực vật", "value": "Thường thưa"}, {"label": "Nhiệt độ", "value": "Có thể nóng hoặc lạnh"}, {"label": "Thích nghi", "value": "Sinh vật cần tiết kiệm nước"}]}, {"id": "volcano", "name": "Núi lửa", "subtitle": "Nơi vật chất nóng có thể trào lên", "summary": "Núi lửa là nơi magma, khí và vật chất từ bên trong Trái Đất có thể thoát lên bề mặt.", "more": "Khi magma ra khỏi mặt đất, ta gọi nó là dung nham. Núi lửa có thể tạo ra đất đá mới và làm thay đổi cảnh quan.", "remember": "Magma ở dưới đất; khi trào ra bề mặt được gọi là dung nham.", "facts": [{"label": "Bên dưới đất", "value": "Magma"}, {"label": "Ra bề mặt", "value": "Dung nham"}, {"label": "Có thể phun", "value": "Dung nham, tro, khí"}, {"label": "Vai trò", "value": "Tạo đá và địa hình mới"}]}], "quiz": [{"q": "Trái Đất là hành tinh thứ mấy tính từ Mặt Trời?", "a": ["Thứ 1", "Thứ 2", "Thứ 3", "Thứ 4"], "c": 2, "note": "Trái Đất là hành tinh thứ 3."}, {"q": "Khoảng bao nhiêu phần trăm bề mặt Trái Đất được nước bao phủ?", "a": ["Khoảng 29%", "Khoảng 50%", "Khoảng 71%", "Khoảng 100%"], "c": 2, "note": "Khoảng 71% bề mặt Trái Đất được nước bao phủ."}, {"q": "Một ngày Trái Đất dài khoảng bao lâu?", "a": ["12 giờ", "24 giờ", "7 ngày", "365 ngày"], "c": 1, "note": "Trái Đất tự quay một vòng trong khoảng 24 giờ."}, {"q": "Một năm Trái Đất dài khoảng bao lâu?", "a": ["24 giờ", "30 ngày", "365,25 ngày", "84 năm"], "c": 2, "note": "Trái Đất quay quanh Mặt Trời trong khoảng 365,25 ngày."}, {"q": "Vệ tinh tự nhiên của Trái Đất là gì?", "a": ["Mặt Trăng", "Sao Kim", "Sao Hỏa", "Mặt Trời"], "c": 0, "note": "Mặt Trăng là vệ tinh tự nhiên của Trái Đất."}, {"q": "Trái Đất tự quay quanh trục giúp tạo ra hiện tượng nào?", "a": ["Ngày và đêm", "Núi lửa", "Sông", "Sa mạc"], "c": 0, "note": "Sự tự quay của Trái Đất tạo nên ngày và đêm."}, {"q": "Lớp nào nằm ngoài cùng Trái Đất?", "a": ["Lõi trong", "Lõi ngoài", "Lớp phủ", "Vỏ Trái Đất"], "c": 3, "note": "Vỏ Trái Đất là lớp ngoài cùng."}, {"q": "Lớp nào nằm ở trung tâm Trái Đất?", "a": ["Lõi trong", "Vỏ", "Lớp phủ", "Khí quyển"], "c": 0, "note": "Lõi trong nằm ở trung tâm Trái Đất."}, {"q": "Vỏ Trái Đất ở trạng thái nào?", "a": ["Rắn", "Lỏng", "Khí", "Không có vật chất"], "c": 0, "note": "Vỏ Trái Đất là đá rắn."}, {"q": "Vỏ Trái Đất dày khoảng bao nhiêu?", "a": ["5–70 km", "2.900 km", "10.000 km", "1 m"], "c": 0, "note": "Vỏ dày khoảng 5–70 km."}, {"q": "Con người sống chủ yếu trên lớp nào?", "a": ["Vỏ Trái Đất", "Lõi ngoài", "Lõi trong", "Lớp phủ sâu"], "c": 0, "note": "Chúng ta sống trên vỏ Trái Đất."}, {"q": "Lớp nào dày nhất trong bốn lớp chính?", "a": ["Vỏ", "Lớp phủ", "Lõi ngoài", "Lõi trong"], "c": 1, "note": "Lớp phủ rất dày, khoảng 2.900 km."}, {"q": "Đá trong lớp phủ thế nào?", "a": ["Rất nóng và có thể biến dạng chậm", "Lạnh như băng", "Chỉ là nước", "Hoàn toàn là khí"], "c": 0, "note": "Đá lớp phủ rất nóng và có thể biến dạng, chuyển động chậm."}, {"q": "Lớp phủ nằm ở đâu?", "a": ["Dưới vỏ", "Ngoài khí quyển", "Trên mây", "Ngoài Mặt Trăng"], "c": 0, "note": "Lớp phủ nằm ngay dưới vỏ Trái Đất."}, {"q": "Lõi ngoài chủ yếu ở trạng thái nào?", "a": ["Rắn", "Lỏng", "Khí", "Băng"], "c": 1, "note": "Lõi ngoài là kim loại lỏng."}, {"q": "Lõi ngoài chủ yếu gồm kim loại nào?", "a": ["Sắt và niken", "Vàng và bạc", "Nhôm và đồng", "Chì và thiếc"], "c": 0, "note": "Lõi ngoài chủ yếu gồm sắt và niken."}, {"q": "Chuyển động của lõi ngoài góp phần tạo ra gì?", "a": ["Từ trường Trái Đất", "Mây", "Sông", "Mưa"], "c": 0, "note": "Kim loại lỏng chuyển động trong lõi ngoài góp phần tạo từ trường."}, {"q": "Lõi trong ở trạng thái nào?", "a": ["Rắn", "Lỏng", "Khí", "Nước"], "c": 0, "note": "Lõi trong vẫn rắn do áp suất cực lớn."}, {"q": "Vì sao lõi trong rất nóng nhưng vẫn rắn?", "a": ["Do áp suất cực lớn", "Do có tuyết", "Do thiếu ánh sáng", "Do có cây"], "c": 0, "note": "Áp suất cực lớn giữ vật chất ở trạng thái rắn."}, {"q": "Lõi trong nằm ở đâu?", "a": ["Trung tâm Trái Đất", "Trên núi", "Trong đại dương", "Ngoài khí quyển"], "c": 0, "note": "Lõi trong nằm ở trung tâm Trái Đất."}, {"q": "Địa hình nào thường có sườn dốc và đỉnh?", "a": ["Núi", "Đồng bằng", "Hồ", "Sông"], "c": 0, "note": "Núi thường có sườn dốc và đỉnh."}, {"q": "Núi có thể hình thành do điều gì?", "a": ["Chuyển động các mảng và hoạt động núi lửa", "Mưa một ngày", "Cây mọc", "Gió nhẹ"], "c": 0, "note": "Kiến tạo và núi lửa là các quá trình hình thành núi."}, {"q": "Đồng bằng có đặc điểm nào?", "a": ["Khá bằng phẳng", "Luôn cao nhất", "Luôn khô nhất", "Luôn là đảo"], "c": 0, "note": "Đồng bằng là vùng rộng và khá bằng phẳng."}, {"q": "Vì sao nhiều đồng bằng thuận lợi cho nông nghiệp?", "a": ["Có đất phù sa màu mỡ", "Không có nước", "Luôn có tuyết", "Chỉ toàn đá"], "c": 0, "note": "Nhiều đồng bằng có phù sa và đất màu mỡ."}, {"q": "Cao nguyên là vùng đất như thế nào?", "a": ["Cao nhưng mặt trên khá bằng", "Luôn thấp hơn biển", "Chỉ có nước", "Là dòng sông"], "c": 0, "note": "Cao nguyên cao hơn vùng xung quanh nhưng mặt trên khá bằng."}, {"q": "Cao nguyên khác núi ở điểm nào thường thấy?", "a": ["Mặt trên rộng và khá bằng", "Không có đất", "Luôn ngập nước", "Không có đá"], "c": 0, "note": "Cao nguyên thường có bề mặt rộng và khá bằng."}, {"q": "Thung lũng thường nằm ở đâu?", "a": ["Giữa các vùng núi hoặc đồi", "Trên mây", "Giữa đại dương", "Ngoài không gian"], "c": 0, "note": "Thung lũng là vùng thấp giữa núi hoặc đồi."}, {"q": "Nhiều thung lũng có gì chảy qua?", "a": ["Sông hoặc suối", "Dung nham luôn luôn", "Mây", "Sao chổi"], "c": 0, "note": "Nhiều thung lũng có sông hoặc suối chảy qua."}, {"q": "Nước sông thường chảy theo hướng chung nào?", "a": ["Từ cao xuống thấp", "Từ thấp lên cao", "Đứng yên", "Bay lên trời"], "c": 0, "note": "Sông chảy theo độ dốc từ cao xuống thấp."}, {"q": "Sông có thể mang theo gì và bồi đắp đồng bằng?", "a": ["Phù sa", "Ánh sáng", "Gió", "Mây"], "c": 0, "note": "Sông vận chuyển phù sa và có thể bồi đắp đất."}, {"q": "Hồ là gì?", "a": ["Vùng nước nằm trong đất liền", "Một đỉnh núi", "Một vùng trời", "Một loại cây"], "c": 0, "note": "Hồ là vùng nước nằm trong đất liền."}, {"q": "Hồ có thể chứa loại nước nào?", "a": ["Có thể nước ngọt hoặc nước mặn", "Chỉ nước ngọt", "Chỉ nước mặn", "Không có nước"], "c": 0, "note": "Tùy hồ, nước có thể ngọt hoặc mặn."}, {"q": "Đảo có đặc điểm gì?", "a": ["Đất được nước bao quanh", "Nước được đất bao quanh", "Chỉ là núi", "Chỉ là sa mạc"], "c": 0, "note": "Đảo là vùng đất được nước bao quanh ở mọi phía."}, {"q": "Một số đảo có thể hình thành từ hoạt động gì?", "a": ["Núi lửa", "Mưa nhẹ", "Cây mọc", "Tuyết tan trong cốc"], "c": 0, "note": "Một số đảo có nguồn gốc núi lửa."}, {"q": "Điểm chung quan trọng của sa mạc là gì?", "a": ["Rất ít mưa", "Luôn rất nóng", "Luôn có tuyết", "Luôn có rừng dày"], "c": 0, "note": "Sa mạc được đặc trưng bởi lượng mưa rất thấp."}, {"q": "Sa mạc có thể lạnh không?", "a": ["Có", "Không bao giờ", "Chỉ vào buổi trưa", "Chỉ dưới biển"], "c": 0, "note": "Có cả sa mạc nóng và sa mạc lạnh."}, {"q": "Magma khi trào ra bề mặt được gọi là gì?", "a": ["Dung nham", "Phù sa", "Sương", "Băng"], "c": 0, "note": "Magma ra bề mặt được gọi là dung nham."}, {"q": "Núi lửa có thể phun ra gì?", "a": ["Dung nham, tro và khí", "Chỉ nước ngọt", "Chỉ cát", "Chỉ lá cây"], "c": 0, "note": "Núi lửa có thể phun dung nham, tro và khí."}, {"q": "Địa hình nào là đất được nước bao quanh ở mọi phía?", "a": ["Đảo", "Hồ", "Thung lũng", "Đồng bằng"], "c": 0, "note": "Đảo là vùng đất được nước bao quanh."}, {"q": "Địa hình nào là vùng nước nằm trong đất liền?", "a": ["Hồ", "Núi", "Cao nguyên", "Sa mạc"], "c": 0, "note": "Hồ là vùng nước nằm trong đất liền."}]});

  /* ---------- Hình vẽ địa hình (mỗi hình đứng riêng được, có thể thêm nền) ---------- */
  const LAND = {
    mountain: () => `
      <path d="M2 98 L46 22 L66 52 L92 10 L150 98Z" fill="#7C8BA1"/>
      <path d="M92 10 L150 98 L112 98 L96 60Z" fill="#64748B"/>
      <path d="M46 22 L58 43 L50 39 L42 44 L36 39Z" fill="#fff"/>
      <path d="M92 10 L106 32 L98 28 L90 34 L82 28Z" fill="#fff"/>
      <path class="gx-ground" d="M0 92 Q40 84 80 92 T160 90 V104 H0Z" fill="#6DBE6A"/>`,
    volcano: () => `
      <path d="M58 22 Q56 10 66 6 Q70 0 80 4 Q92 0 96 10 Q104 14 98 22Z" fill="#CBD5E1"/>
      <path d="M8 100 L60 32 L96 32 L152 100Z" fill="#78716C"/>
      <path d="M96 32 L152 100 L120 100 L92 48Z" fill="#57534E"/>
      <path d="M60 32 L96 32 L90 40 L84 36 L78 44 L72 36 L66 41Z" fill="#EF4444"/>
      <path d="M78 40 Q74 58 80 72 Q84 84 78 98" stroke="#F97316" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path class="gx-ground" d="M0 96 Q80 90 160 96 V104 H0Z" fill="#6DBE6A"/>`,
    plateau: () => `
      <path d="M0 98 L22 40 L140 40 L160 98Z" fill="#B45309"/>
      <path d="M22 40 L140 40 L160 98 L132 98 L118 52 L30 52 L24 98 L0 98Z" fill="#92400E" opacity=".45"/>
      <path d="M18 42 Q22 34 30 34 L132 34 Q140 34 144 42 L140 46 L22 46Z" fill="#84CC16"/>
      <circle cx="54" cy="31" r="5" fill="#4D7C0F"/><circle cx="100" cy="30" r="6" fill="#4D7C0F"/><circle cx="110" cy="32" r="4" fill="#65A30D"/>
      <path class="gx-ground" d="M0 94 Q80 88 160 94 V104 H0Z" fill="#6DBE6A"/>`,
    valley: () => `
      <path d="M0 98 L0 30 L28 14 L70 86 L90 86 L132 14 L160 30 L160 98Z" fill="#7C8BA1"/>
      <path d="M28 14 L70 86 L50 86 L20 40Z" fill="#94A3B8"/>
      <path d="M0 98 L0 60 Q40 70 68 86 L92 86 Q120 70 160 60 V98Z" fill="#6DBE6A"/>
      <path d="M80 86 Q74 92 82 98 Q88 102 82 106" stroke="#38BDF8" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M68 86 L92 86" stroke="#38BDF8" stroke-width="5" stroke-linecap="round"/>`,
    river: () => `
      <path d="M4 98 Q10 40 50 34 Q96 30 112 10 Q150 4 156 40 Q160 80 150 98Z" fill="#8BC97A"/>
      <path d="M128 6 Q118 30 92 40 Q50 54 62 72 Q74 90 46 102" stroke="#2F9BE0" stroke-width="18" fill="none" stroke-linecap="round"/>
      <path d="M128 6 Q118 30 92 40 Q50 54 62 72 Q74 90 46 102" stroke="#7DD3FC" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="6 10"/>
      <circle cx="26" cy="70" r="9" fill="#4D9A3F"/><circle cx="140" cy="66" r="10" fill="#4D9A3F"/>`,
    lake: () => `
      <ellipse cx="80" cy="70" rx="78" ry="32" fill="#8BC97A"/>
      <ellipse cx="80" cy="70" rx="56" ry="20" fill="#38BDF8"/>
      <path d="M50 66 q8 -4 16 0 M88 76 q8 -4 16 0" stroke="#E0F2FE" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M16 62 v-14 M20 62 v-18 M24 62 v-12" stroke="#3F7A2E" stroke-width="3" stroke-linecap="round"/>
      <circle cx="140" cy="56" r="10" fill="#4D9A3F"/><rect x="138" y="58" width="4" height="12" fill="#7C4A21"/>`,
    island: () => `
      <ellipse cx="80" cy="84" rx="80" ry="20" fill="#38BDF8"/>
      <path d="M8 86 q10 -4 20 0 M120 92 q10 -4 20 0" stroke="#BAE6FD" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="80" cy="78" rx="42" ry="12" fill="#FCD34D"/>
      <path d="M58 76 Q62 60 80 58 Q98 60 102 76Z" fill="#6DBE6A"/>
      <path d="M84 72 Q80 48 90 28" stroke="#92400E" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M90 28 Q106 22 116 34 Q104 32 90 30Z M90 28 Q74 20 64 32 Q78 30 90 30Z M90 28 Q100 12 114 14 Q100 22 90 30Z" fill="#16A34A"/>`,
    desert: () => `
      <circle class="gx-ground" cx="132" cy="18" r="12" fill="#FBBF24"/>
      <path d="M0 98 Q30 52 70 70 Q104 40 160 66 V98Z" fill="#F59E0B"/>
      <path d="M0 98 Q40 74 80 86 Q120 70 160 84 V98Z" fill="#FCD34D"/>
      <path d="M42 84 V54 M42 66 H32 V58 M42 72 H52 V62" stroke="#16A34A" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    plain: () => `
      <path d="M0 50 Q80 42 160 50 Q162 80 150 98 L10 98 Q-2 80 0 50Z" fill="#9BD67F"/>
      <path d="M0 62 Q80 56 160 62 M0 74 Q80 68 160 74 M0 86 Q80 80 160 86" stroke="#6DBE6A" stroke-width="3" fill="none"/>
      <path d="M108 50 Q90 66 112 78 Q132 88 116 100" stroke="#38BDF8" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M28 48 h20 v-12 l-10 -8 l-10 8z" fill="#FFF7ED" stroke="#B45309" stroke-width="1.5"/><path d="M26 37 l12 -10 l12 10" fill="none" stroke="#DC2626" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="70" cy="44" r="6" fill="#4D9A3F"/><circle cx="148" cy="44" r="6" fill="#4D9A3F"/>`
  };
  const LAND_BG = { mountain: "#E0F2FE", volcano: "#FDE7D9", plateau: "#E0F2FE", valley: "#E0F2FE", river: "#ECFDF5", lake: "#ECFDF5", island: "#BAE6FD", desert: "#FEF3C7", plain: "#DBEAFE" };
  function landSvg(id, withBg = false) {
    const draw = LAND[id];
    if (!draw) return "";
    const bg = withBg ? `<rect x="-4" y="-4" width="168" height="114" fill="${LAND_BG[id]}"/>` : "";
    return `<svg class="gx-land-svg" viewBox="0 0 160 104" aria-hidden="true" focusable="false"${withBg ? ' preserveAspectRatio="xMidYMid slice"' : ""}>${bg}${draw()}</svg>`;
  }

  /* ---------- Các lớp bên trong Trái Đất ----------
     Bán kính tỉ lệ gần đúng; riêng lớp vỏ được vẽ dày hơn thật cho dễ nhìn. */
  const LAYERS = [
    { id: "crust", r: 210, color: "#8B5A2B", label: "Vỏ", depth: "5–70 km" },
    { id: "mantle", r: 198, color: "#E2552C", label: "Lớp phủ", depth: "đến ~2.900 km" },
    { id: "outer-core", r: 115, color: "#F59E0B", label: "Lõi ngoài", depth: "đến ~5.150 km" },
    { id: "inner-core", r: 40, color: "#FDE68A", label: "Lõi trong", depth: "~6.370 km" }
  ];
  const semi = (cx, cy, r) => `M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}Z`;
  /* Hình nhỏ: hình tròn cắt đôi, lớp được chọn sáng lên */
  function layerSvg(id) {
    const cx = 80, cy = 96, k = 0.36;
    const parts = LAYERS.map((L) => {
      const dim = id && L.id !== id;
      return `<path d="${semi(cx, cy, L.r * k)}" fill="${L.color}" opacity="${dim ? 0.28 : 1}"/>`;
    }).join("");
    return `<svg class="gx-land-svg" viewBox="0 0 160 104" aria-hidden="true" focusable="false">
      <path d="${semi(cx, cy, 210 * k + 3)}" fill="#3B82F6" opacity="${id && id !== "crust" ? 0.28 : 1}"/>${parts}
      <path d="M${cx - 76} ${cy} H${cx + 76}" stroke="#fff" stroke-width="2"/></svg>`;
  }
  /* Hình lớn ở tab Cấu tạo: từng lớp bấm được */
  function bigLayersSvg(selected) {
    const cx = 240, cy = 400;
    const rings = LAYERS.map((L) => `
      <g class="gx-layer ${selected === L.id ? "is-selected" : ""}" data-object="${L.id}" role="button" tabindex="0" aria-label="${L.label}">
        <path d="${semi(cx, cy, L.r)}" fill="${L.color}"/>
      </g>`).join("");
    const labelY = { crust: 118, mantle: 196, "outer-core": 280, "inner-core": 364 };
    const anchor = { crust: [cx + 120, cy - 171], mantle: [cx + 110, cy - 130], "outer-core": [cx + 70, cy - 70], "inner-core": [cx + 22, cy - 30] };
    const labels = LAYERS.map((L) => {
      const [ax, ay] = anchor[L.id];
      const y = labelY[L.id];
      return `<g class="gx-layer-label ${selected === L.id ? "is-selected" : ""}" data-object="${L.id}" role="button" tabindex="0" aria-label="${L.label}">
        <path d="M${ax} ${ay} L470 ${y}" stroke="#5B216E" stroke-width="2" fill="none" stroke-dasharray="4 4"/>
        <circle cx="${ax}" cy="${ay}" r="5" fill="#fff" stroke="#5B216E" stroke-width="2"/>
        <rect x="470" y="${y - 24}" width="178" height="48" rx="14"/>
        <text x="486" y="${y - 3}" class="t1">${L.label}</text><text x="486" y="${y + 15}" class="t2">${L.depth}</text>
      </g>`;
    }).join("");
    return `<svg class="gx-layers-svg" viewBox="0 80 660 330" role="group" aria-label="Các lớp bên trong Trái Đất">
      <path d="${semi(cx, cy, 214)}" fill="#3B82F6"/>
      <path d="M${cx - 214} ${cy} A214 214 0 0 1 ${cx - 120} ${cy - 177} L${cx - 110} ${cy - 165} A200 200 0 0 0 ${cx - 200} ${cy}Z" fill="#22C55E"/>
      <path d="M${cx + 60} ${cy - 205} A214 214 0 0 1 ${cx + 170} ${cy - 130} L${cx + 158} ${cy - 122} A200 200 0 0 0 ${cx + 56} ${cy - 192}Z" fill="#22C55E"/>
      ${rings}
      <g transform="translate(${cx - 8} ${cy - 236})"><rect x="0" y="10" width="16" height="12" fill="#FFF7ED" stroke="#B45309"/><path d="M-2 12 L8 2 L18 12" fill="#DC2626"/><circle cx="26" cy="12" r="7" fill="#16A34A"/><rect x="25" y="14" width="3" height="8" fill="#7C4A21"/></g>
      <path d="M${cx - 214} ${cy} H${cx + 214}" stroke="#fff" stroke-width="3"/>
      ${labels}
    </svg>`;
  }
  const EARTH_ICON = `<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><circle cx="40" cy="40" r="32" fill="#3B82F6"/><path d="M16 30q13-18 25-7t21-3v14q-12 9-19 0t-27 3zm8 24q12-7 22 0t20-5v15q-20 12-42 1z" fill="#22C55E"/><circle cx="40" cy="40" r="32" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/></svg>`;


  /* ---------- Bức tranh phong cảnh ở tab Khám phá ----------
     x, y = vị trí trái / đáy (%), w = chiều rộng (% bức tranh). Hàng sau đặt trước. */
  const SPOTS = [
    { id: "mountain", x: 1, y: 44, w: 27 },
    { id: "volcano", x: 27, y: 46, w: 23 },
    { id: "plateau", x: 50, y: 45, w: 24 },
    { id: "valley", x: 74, y: 44, w: 25 },
    { id: "river", x: 2, y: 22, w: 25 },
    { id: "lake", x: 31, y: 24, w: 23 },
    { id: "desert", x: 58, y: 22, w: 25 },
    { id: "plain", x: 3, y: 1, w: 32 },
    { id: "island", x: 58, y: 0, w: 36 }
  ];
  const SCENE_BG = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs><linearGradient id="exSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE3FB"/><stop offset="1" stop-color="#EAF6FF"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#exSky)"/>
    <circle cx="44" cy="40" r="20" fill="#FDE68A"/><circle cx="44" cy="40" r="28" fill="#FDE68A" opacity=".35"/>
    <g fill="#fff" opacity=".9"><ellipse cx="150" cy="40" rx="26" ry="9"/><ellipse cx="166" cy="34" rx="16" ry="9"/><ellipse cx="270" cy="58" rx="22" ry="7"/></g>
    <path d="M0 150 Q60 120 130 140 Q210 112 290 136 Q350 120 400 132 V300 H0Z" fill="#B7E0A3"/>
    <path d="M0 170 Q200 156 400 170 V300 H0Z" fill="#9BD67F"/>
    <path d="M200 300 Q250 250 330 248 Q370 246 400 236 V300Z" fill="#7CC7EE"/>
    <path d="M222 288 Q262 260 330 256 Q368 254 400 246" stroke="#FDE68A" stroke-width="6" fill="none" opacity=".8"/></svg>`;

  /* ---------- Trạng thái ---------- */
  let controller = null;
  let root = null;
  let activeContext = null;
  let activeTab = "explore";
  let selectedId = DATA.overview.id;
  let quiz = null;
  let autoRead = true;
  let toastTimer = 0;
  let found = loadFound();

  const allItems = [DATA.overview, ...DATA.primary, ...DATA.secondary];
  const byId = (id) => allItems.find((item) => item.id === id) || DATA.overview;
  const isLayer = (id) => DATA.primary.some((d) => d.id === id);
  const isLand = (id) => DATA.secondary.some((d) => d.id === id);
  const COLLECTIBLE = [...DATA.primary, ...DATA.secondary].map((d) => d.id);

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
    if (!synth) return null;
    try { return synth.getVoices().find((v) => /^vi([-_]|$)/i.test(v.lang)) || null; } catch (_) { return null; }
  }
  function ttsUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(String(text || ""))}`;
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


  const speechOf = (obj) => `${obj.name}. ${obj.summary} ${obj.more} ${/^bé nhớ/i.test(obj.remember) ? obj.remember : "Bé nhớ nhé: " + obj.remember}`;

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
      ${R} .gx-tab[data-tab="lands"][aria-selected="true"],${R} .gx-tab[data-tab="quiz"][aria-selected="true"]{background:var(--grad-alt)}
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

      ${R} .gx-progress{width:120px;height:12px;border-radius:999px;background:#EDE9FE;overflow:hidden}
      ${R} .gx-progress span{display:block;height:100%;border-radius:999px;background:var(--grad-main);transition:width .4s}
      ${R} .gx-logo svg{width:44px}
      ${R} .gx-globe{left:auto!important;right:3%;top:4%;width:12%;min-width:64px;max-width:96px;z-index:55}
      ${R} .gx-globe svg{width:100%}
      ${R} .gx-scene-note{right:auto;max-width:min(70%,460px)}
      ${R} .gx-spot .gx-land-svg{width:100%;height:auto;display:block}
      ${R} .gx-spot.is-selected .gx-land-svg,${R} .gx-spot.is-selected>svg{filter:drop-shadow(0 0 6px rgba(236,72,153,.75))}
      ${R} .gx-hero.is-land{overflow:hidden;padding:8px 0 0}
      ${R} .gx-hero.is-land svg{height:100%;width:auto}
      ${R} .gx-spot .gx-ground{display:none}
      ${R} .gx-hero.is-earth svg{height:110px;width:110px}
      ${R} .gx-layers{display:flex;flex-direction:column;padding:12px;gap:8px;background:linear-gradient(180deg,#FFFFFF,#F5F3FF)}
      ${R} .gx-scene-note.is-static{position:static;max-width:none}
      ${R} .gx-layers-wrap{flex:1 1 auto;min-height:0;display:grid;place-items:center}
      ${R} .gx-layers-svg{width:100%;height:100%;max-height:100%}
      ${R} .gx-layer{cursor:pointer;outline:none}
      ${R} .gx-layer path{transition:filter .15s}
      ${R} .gx-layer:hover path,${R} .gx-layer:focus-visible path{filter:brightness(1.12)}
      ${R} .gx-layer.is-selected path{stroke:#EC4899;stroke-width:5}
      ${R} .gx-layer-label{cursor:pointer;outline:none}
      ${R} .gx-layer-label rect{fill:#fff;stroke:#E9D5FF;stroke-width:2}
      ${R} .gx-layer-label:hover rect,${R} .gx-layer-label:focus-visible rect{stroke:#C4B5FD}
      ${R} .gx-layer-label.is-selected rect{fill:#FFF1F7;stroke:#EC4899;stroke-width:3}
      ${R} .gx-layer-label .t1{font:700 20px "Baloo 2","Nunito",system-ui,sans-serif;fill:#5B216E}
      ${R} .gx-layer-label .t2{font:600 15px "Baloo 2","Nunito",system-ui,sans-serif;fill:#667085}
      ${R} .gx-layers-foot{margin:0;font-size:15px;color:var(--muted);font-weight:600;text-align:center}
      ${R} .gx-thumb{display:block;width:100%;flex:1 1 auto;min-height:0;border-radius:12px;overflow:hidden}
      ${R} .gx-thumb svg{width:100%!important;height:100%!important;max-height:none!important;display:block}
      ${R} .gx-land-item{justify-content:flex-start;gap:6px}
      ${R} .gx-land-item .gx-item-text{min-height:3.4em}
      ${R} .gx-land-item .gx-tick{z-index:2;background:#fff;padding:0 8px;border-radius:999px;top:10px;right:12px}
      @media(max-width:1024px){
        ${R} .gx-split{grid-template-columns:minmax(0,1fr) minmax(300px,.9fr)}
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
        ${R} .gx-layers{height:auto}
        ${R} .gx-layers-svg{height:auto}
        ${R} .gx-progress{flex:1}
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
    `;
    document.head.appendChild(style);
  }


  function heroArt(obj) {
    if (isLand(obj.id)) return `<div class="gx-hero is-land" style="background:${LAND_BG[obj.id]}">${landSvg(obj.id)}</div>`;
    if (isLayer(obj.id)) return `<div class="gx-hero">${layerSvg(obj.id)}</div>`;
    return `<div class="gx-hero is-earth">${EARTH_ICON}</div>`;
  }

  function detailHtml(obj) {
    const remember = obj.remember.replace(/^Bé nhớ nhé:\s*/i, "");
    return `
      ${heroArt(obj)}
      <h3>${obj.name}</h3>
      <div class="gx-subtitle">${obj.subtitle}</div>
      <button class="gx-read" type="button" data-action="speak" data-speak-key="${obj.id}" data-label="Nghe cô đọc" aria-pressed="false">🔊 Nghe cô đọc</button>
      <p>${obj.summary}</p>
      <p>${obj.more}</p>
      <dl class="gx-facts">${obj.facts.map((f) => `<div><dt>${f.label}</dt><dd>${f.value}</dd></div>`).join("")}</dl>
      <div class="gx-rabbit"><span aria-hidden="true">🐰</span><p><b>Bé nhớ nhé:</b> ${remember}</p></div>
      <div class="gx-voice-note" hidden></div>`;
  }

  function albumHtml() {
    const n = COLLECTIBLE.filter((id) => found.has(id)).length;
    return `<div class="gx-album-label">Sổ khám phá<b>${n}/${COLLECTIBLE.length}</b></div>
      <div class="gx-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${COLLECTIBLE.length}" aria-valuenow="${n}"><span style="width:${(n / COLLECTIBLE.length) * 100}%"></span></div>`;
  }

  function exploreHtml() {
    const spots = SPOTS.map((s) => {
      const d = byId(s.id);
      const cls = `${found.has(s.id) ? "is-found" : ""} ${selectedId === s.id ? "is-selected" : ""}`;
      return `<button type="button" class="gx-spot ${cls}" data-object="${s.id}" style="left:${s.x}%;bottom:${s.y}%;width:${s.w}%;z-index:${50 - s.y}" aria-label="${d.name}">${landSvg(s.id)}<span class="gx-chip">${d.name}</span></button>`;
    }).join("");
    const globe = `<button type="button" class="gx-spot gx-globe ${selectedId === DATA.overview.id ? "is-selected" : ""}" data-object="${DATA.overview.id}" aria-label="${DATA.overview.name}">${EARTH_ICON}<span class="gx-chip">Trái Đất</span></button>`;
    const note = `<div class="gx-scene-note"><span aria-hidden="true">🐰</span><span>Trái Đất có rất nhiều dạng địa hình. Chạm vào từng nơi để khám phá nhé!</span></div>`;
    return `<div class="gx-split">
      <div class="gx-card gx-scene">${SCENE_BG}${note}${globe}${spots}</div>
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }

  function layersHtml() {
    if (!isLayer(selectedId)) selectedId = DATA.primary[0].id;
    return `<div class="gx-split">
      <div class="gx-card gx-layers">
        <div class="gx-scene-note is-static"><span aria-hidden="true">🐰</span><span>Tưởng tượng mình cắt đôi Trái Đất như cắt quả trứng. Chạm vào từng lớp nhé!</span></div>
        <div class="gx-layers-wrap">${bigLayersSvg(selectedId)}</div>
        <p class="gx-layers-foot">Lớp vỏ được vẽ dày hơn thật cho dễ nhìn. Thật ra nó rất mỏng, như vỏ quả trứng.</p>
      </div>
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }

  function gridHtml(items) {
    if (!items.some((i) => i.id === selectedId)) selectedId = items[0].id;
    const cards = items.map((o) => {
      const tick = found.has(o.id) ? `<span class="gx-tick">✓ Đã xem</span>` : "";
      return `<button type="button" class="gx-item gx-land-item ${o.id === selectedId ? "is-selected" : ""}" data-object="${o.id}">${tick}<span class="gx-thumb">${landSvg(o.id, true)}</span><span class="gx-item-text"><strong>${o.name}</strong><small>${o.subtitle}</small></span></button>`;
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
      const msg = stars === 3 ? "Tuyệt vời! Con là nhà thám hiểm Trái Đất nhí rồi!" : stars === 2 ? "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé." : "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.";
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


  function renderStage({ readQuestion = false } = {}) {
    if (!root) return;
    stopSpeak(false);
    const stage = root.querySelector(".gx-stage");
    if (activeTab === "layers" && !isLayer(selectedId)) selectedId = DATA.primary[0].id;
    if (activeTab === "lands" && !isLand(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz") markFound(selectedId, true);
    let html = "";
    if (activeTab === "explore") html = exploreHtml();
    else if (activeTab === "layers") html = layersHtml();
    else if (activeTab === "lands") html = gridHtml(DATA.secondary);
    else html = quizHtml();
    stage.innerHTML = `<section class="gx-panel" style="height:100%">${html}</section>`;
    updateSpeakButtons();
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

  function markFound(id, quiet = false) {
    if (!COLLECTIBLE.includes(id) || found.has(id)) return;
    found.add(id);
    saveFound();
    refreshAlbum();
    if (quiet) return;
    const n = COLLECTIBLE.filter((x) => found.has(x)).length, total = COLLECTIBLE.length;
    if (n === total) toast("🏆 Con đã khám phá hết Trái Đất rồi! Giỏi quá!");
    else toast(`🌍 Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { explore: "Khám phá", layers: "Cấu tạo", lands: "Địa hình", quiz: "Hỏi đáp" };
  function setBanner() {
    const fn = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof fn !== "function") return;
    fn({ items: [{ level: 2, title: `${CONFIG.gameNumber}. ${CONFIG.title}`, action: null }, { level: 3, title: TAB_LABELS[activeTab], action: null }] });
  }

  function switchTab(tab, opts) {
    activeTab = tab;
    const tst = root.querySelector(".gx-toast");
    if (tst) tst.classList.remove("is-on");
    root.querySelectorAll(".gx-tab").forEach((b) => {
      const on = b.dataset.tab === tab;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
    });
    renderStage(opts);
    setBanner();
  }

  function selectObject(id) {
    selectedId = id;
    stopSpeak(false);
    markFound(id);
    const info = root.querySelector("#gx-info");
    if (info) { info.innerHTML = detailHtml(byId(id)); info.scrollTop = 0; }
    root.querySelectorAll("[data-object]").forEach((b) => {
      b.classList.toggle("is-selected", b.dataset.object === id);
      if (b.classList.contains("gx-spot")) b.classList.toggle("is-found", found.has(b.dataset.object));
      if (b.classList.contains("gx-item") && found.has(b.dataset.object) && !b.querySelector(".gx-tick")) {
        b.insertAdjacentHTML("afterbegin", `<span class="gx-tick">✓ Đã xem</span>`);
      }
    });
    const spot = root.querySelector(`.gx-spot[data-object="${id}"]`);
    if (spot) { spot.classList.remove("is-hop"); void spot.offsetWidth; spot.classList.add("is-hop"); }
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
      const tab = t.closest(".gx-tab");
      if (tab) { switchTab(tab.dataset.tab, { readQuestion: true }); return; }

      const obj = t.closest("[data-object]");
      if (obj) { selectObject(obj.dataset.object); return; }

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
        if (quiz.i >= quiz.items.length && autoRead) speak("quiz-end", `Con đúng ${quiz.score} trên ${quiz.items.length} câu.`, false);
      } else if (a === "new-round") { quiz = makeRound(DATA.quiz); renderStage({ readQuestion: true }); }
      else if (a === "retry-wrong" && quiz && quiz.wrong.length) {
        quiz = makeRound(quiz.wrong.map((w) => w.src));
        renderStage({ readQuestion: true });
      }
    }, { signal });

    root.addEventListener("keydown", (event) => {
      const t = event.target;
      /* Các lớp trong hình SVG: Enter / Space để chọn */
      if (t.closest && t.closest("svg [data-object]") && (event.key === "Enter" || event.key === " ")) {
        selectObject(t.closest("[data-object]").dataset.object);
        event.preventDefault();
        return;
      }
      const tab = t.closest && t.closest(".gx-tab");
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

    document.addEventListener("visibilitychange", () => { if (document.hidden) stopSpeak(); }, { signal });
  }

  function render(context) {
    activeContext = context;
    injectAssets();
    activeTab = "explore";
    selectedId = DATA.overview.id;
    quiz = null;
    found = loadFound();
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `
      <header class="gx-head">
        <div class="gx-logo" aria-hidden="true">${EARTH_ICON}</div>
        <div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div>
        <div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="explore" type="button" aria-selected="true">🔭 Khám phá</button>
        <button class="gx-tab" role="tab" data-tab="layers" type="button" aria-selected="false" tabindex="-1">🌍 Cấu tạo</button>
        <button class="gx-tab" role="tab" data-tab="lands" type="button" aria-selected="false" tabindex="-1">⛰️ Địa hình</button>
        <button class="gx-tab" role="tab" data-tab="quiz" type="button" aria-selected="false" tabindex="-1">⭐ Hỏi đáp</button>
      </nav>
      <div class="gx-stage"></div>
      <div class="gx-toast" role="status" aria-live="polite"></div>`;
    context.host.replaceChildren(root);
    renderStage();
    bind();
    setBanner();
  }

  function destroy() {
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
