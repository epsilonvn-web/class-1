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

  /* ---------- Song ngữ Tiếng Việt / English ---------- */
  const I18N_EN = {"Dung nham": "Lava", "Sao Kim": "Venus", "Hành tinh Trái Đất": "Planet Earth", "Ngôi nhà xanh của chúng ta": "Our green home", "Trái Đất là hành tinh thứ ba tính từ Mặt Trời và là ngôi nhà của con người cùng vô số sinh vật. Bề mặt có đại dương, lục địa, núi, đồng bằng, sông, hồ và rất nhiều kiểu địa hình.": "Earth is the third planet from the Sun and the home of people and countless living things. Its surface has oceans, continents, mountains, plains, rivers, lakes and many other landforms.", "Trái Đất tự quay quanh trục tạo nên ngày và đêm, đồng thời chuyển động quanh Mặt Trời tạo nên một năm. Bên trong Trái Đất gồm nhiều lớp khác nhau: vỏ, lớp phủ, lõi ngoài và lõi trong.": "Earth spins on its axis, which gives us day and night, and it travels around the Sun, which gives us a year. Inside, Earth has several layers: the crust, the mantle, the outer core and the inner core.", "Bé nhớ nhé: Trái Đất có nước, không khí, đất đá và điều kiện phù hợp cho sự sống.": "Remember: Earth has water, air, land and the right conditions for life.", "Trái Đất có nước, không khí, đất đá và điều kiện phù hợp cho sự sống.": "Earth has water, air, land and the right conditions for life.", "Vị trí": "Position", "Hành tinh thứ 3": "3rd planet", "Nước bề mặt": "Surface water", "Khoảng 71%": "About 71%", "Đất liền": "Land", "Khoảng 29%": "About 29%", "Một ngày": "One day", "Khoảng 24 giờ": "About 24 hours", "Một năm": "One year", "Khoảng 365,25 ngày": "About 365.25 days", "Vệ tinh tự nhiên": "Natural satellite", "Mặt Trăng": "The Moon", "Vỏ Trái Đất": "Earth's Crust", "Lớp ngoài cùng": "The outermost layer", "Vỏ Trái Đất là lớp đá rắn mỏng ở ngoài cùng, nơi chúng ta đang sống.": "The crust is the thin outer layer of solid rock where we live.", "Vỏ đại dương thường mỏng hơn vỏ lục địa. So với kích thước cả Trái Đất, lớp vỏ rất mỏng, giống như lớp vỏ mỏng bên ngoài của một quả trứng.": "Ocean crust is usually thinner than continental crust. Compared with the whole Earth, the crust is very thin, like the thin shell of an egg.", "Là lớp ngoài cùng, rắn và mỏng nhất.": "It is the outermost, solid and thinnest layer.", "Ngoài cùng": "Outermost", "Trạng thái": "State", "Rắn": "Solid", "Độ dày": "Thickness", "Khoảng 5–70 km": "About 5–70 km", "Gồm": "Made of", "Vỏ đại dương và vỏ lục địa": "Ocean crust and continental crust", "Nơi sống": "Who lives here", "Con người và hầu hết sinh vật trên cạn": "People and most land creatures", "Lớp phủ": "Mantle", "Lớp dày nhất": "The thickest layer", "Lớp phủ nằm dưới vỏ và chiếm phần lớn thể tích Trái Đất.": "The mantle lies under the crust and makes up most of Earth's volume.", "Đá ở lớp phủ rất nóng. Phần lớn vẫn là chất rắn nhưng có thể biến dạng và chuyển động cực kỳ chậm trong thời gian dài, góp phần làm các mảng vỏ Trái Đất dịch chuyển.": "Rock in the mantle is very hot. Most of it is still solid, but it can bend and move extremely slowly over a long time, which helps Earth's plates move.", "Là lớp rất dày, nóng và chuyển động rất chậm.": "A very thick, hot layer that moves very slowly.", "Dưới vỏ": "Under the crust", "Khoảng 2.900 km": "About 2,900 km", "Nhiệt độ": "Temperature", "Rất nóng": "Very hot", "Vật chất": "Material", "Đá nóng, phần lớn ở trạng thái rắn nhưng có thể biến dạng": "Hot rock, mostly solid but able to bend", "Vai trò": "Role", "Liên quan tới chuyển động các mảng kiến tạo": "Linked to the movement of tectonic plates", "Lõi ngoài": "Outer Core", "Kim loại lỏng": "Liquid metal", "Lõi ngoài nằm sâu dưới lớp phủ và chủ yếu gồm sắt cùng niken ở trạng thái lỏng.": "The outer core lies deep under the mantle and is made mostly of liquid iron and nickel.", "Dòng chuyển động của kim loại lỏng trong lõi ngoài giúp tạo ra từ trường Trái Đất, một lớp bảo vệ quan trọng trước nhiều hạt mang điện từ không gian.": "The flowing liquid metal in the outer core helps create Earth's magnetic field, an important shield against many charged particles from space.", "Là lớp kim loại lỏng và góp phần tạo từ trường Trái Đất.": "A layer of liquid metal that helps create Earth's magnetic field.", "Bao quanh lõi trong": "Surrounds the inner core", "Lỏng": "Liquid", "Thành phần chính": "Main ingredients", "Sắt và niken": "Iron and nickel", "Rất cao": "Very high", "Góp phần tạo từ trường Trái Đất": "Helps create Earth's magnetic field", "Lõi trong": "Inner Core", "Trung tâm Trái Đất": "The center of Earth", "Lõi trong là phần nằm ở chính giữa Trái Đất và chủ yếu gồm sắt cùng niken.": "The inner core is right in the middle of Earth and is made mostly of iron and nickel.", "Nhiệt độ ở đây rất cao, nhưng áp suất khổng lồ khiến vật chất vẫn ở trạng thái rắn. Đây là lớp nhỏ nhất trong bốn lớp chính nhưng có mật độ rất lớn.": "It is extremely hot here, but the huge pressure keeps the material solid. It is the smallest of the four main layers but very dense.", "Nằm ở trung tâm, rất nóng nhưng vẫn rắn vì áp suất cực lớn.": "At the center, very hot but still solid because of the huge pressure.", "Trung tâm": "Center", "Áp suất": "Pressure", "Cực lớn": "Enormous", "Núi": "Mountain", "Vùng đất cao": "High land", "Núi là dạng địa hình nhô cao rõ rệt so với vùng xung quanh, thường có sườn dốc và đỉnh.": "A mountain is a landform that rises clearly above the land around it, usually with steep slopes and a peak.", "Núi có thể hình thành do các mảng kiến tạo đẩy ép nhau, do núi lửa hoặc các quá trình địa chất kéo dài hàng triệu năm.": "Mountains can form when tectonic plates push against each other, from volcanoes, or through geological processes lasting millions of years.", "Núi cao hơn rõ rệt so với khu vực xung quanh và thường có sườn dốc.": "Mountains are clearly higher than the land around them and usually have steep slopes.", "Đặc điểm": "Features", "Cao, sườn dốc": "High, steep slopes", "Bộ phận": "Parts", "Chân núi, sườn núi, đỉnh núi": "Foot, slope and peak", "Hình thành": "How it forms", "Kiến tạo, núi lửa và xói mòn": "Plate movement, volcanoes and erosion", "Ví dụ": "Example", "Các dãy núi lớn trên lục địa": "Big mountain ranges on the continents", "Đồng bằng": "Plain", "Vùng đất tương đối bằng phẳng": "Fairly flat land", "Đồng bằng là vùng đất rộng, khá bằng phẳng hoặc chỉ gợn nhẹ.": "A plain is a wide area of land that is fairly flat or only gently rolling.", "Nhiều đồng bằng có đất màu mỡ do phù sa sông bồi đắp, nên rất thuận lợi cho trồng trọt và xây dựng khu dân cư.": "Many plains have rich soil built up by river mud, so they are great for farming and building towns.", "Đồng bằng thường thấp và khá bằng phẳng.": "Plains are usually low and fairly flat.", "Rộng, khá bằng phẳng": "Wide and fairly flat", "Độ cao": "Height", "Thường thấp hơn vùng núi": "Usually lower than mountains", "Liên hệ": "Connection", "Nhiều nơi có sông và đất phù sa": "Many have rivers and river mud", "Con người": "People", "Thuận lợi cho nông nghiệp và đô thị": "Good for farming and cities", "Cao nguyên": "Plateau", "Cao nhưng khá bằng phẳng": "High but fairly flat", "Cao nguyên là vùng đất nằm cao hơn khu vực xung quanh nhưng mặt trên tương đối bằng hoặc lượn sóng.": "A plateau is land that is higher than the area around it, but its top is fairly flat or gently rolling.", "Cao nguyên khác núi ở chỗ phần trên thường rộng và khá bằng phẳng. Một số cao nguyên được hình thành từ hoạt động núi lửa cổ hoặc sự nâng lên của vỏ Trái Đất.": "A plateau is different from a mountain because its top is usually wide and fairly flat. Some plateaus formed from ancient volcanoes or from the crust being pushed up.", "Cao hơn đồng bằng nhưng mặt trên thường khá rộng và bằng.": "Higher than plains, but the top is usually wide and flat.", "Cao, mặt trên khá bằng": "High, with a fairly flat top", "So với núi": "Compared with mountains", "Ít có đỉnh nhọn liên tục": "Rarely has a row of sharp peaks", "Nâng kiến tạo hoặc dung nham cổ": "Uplift of the crust or ancient lava", "Cảnh quan": "Landscape", "Có thể có đồng cỏ, rừng, nông nghiệp": "May have grasslands, forests, farms", "Thung lũng": "Valley", "Vùng thấp giữa các vùng cao": "Low land between high places", "Thung lũng là vùng đất thấp nằm giữa núi hoặc đồi, thường kéo dài thành dải.": "A valley is low land between mountains or hills, often stretching out in a long strip.", "Nhiều thung lũng được sông bào mòn qua thời gian. Một số thung lũng khác được tạo bởi băng hà cổ.": "Many valleys were carved by rivers over time. Others were shaped by ancient glaciers.", "Thung lũng là phần đất thấp nằm giữa các vùng cao.": "A valley is low land between higher areas.", "Thấp hơn vùng xung quanh": "Lower than the land around it", "Giữa núi hoặc đồi": "Between mountains or hills", "Thường có": "Often has", "Sông hoặc suối": "A river or stream", "Xói mòn của sông hoặc băng hà": "Erosion by rivers or glaciers", "Sông": "River", "Dòng nước chảy": "Flowing water", "Sông là dòng nước tự nhiên chảy từ nơi cao xuống nơi thấp và thường đổ ra hồ, biển hoặc một con sông khác.": "A river is natural water that flows from high places to low places and usually empties into a lake, the sea or another river.", "Sông vận chuyển nước và phù sa, tạo môi trường sống cho nhiều sinh vật và cung cấp nước cho con người.": "Rivers carry water and mud, give many creatures a home and provide water for people.", "Nước sông chảy theo độ dốc từ nơi cao xuống nơi thấp.": "River water flows downhill from high places to low places.", "Dạng": "Type", "Hướng chung": "General direction", "Từ cao xuống thấp": "From high to low", "Có thể đổ vào": "Can flow into", "Biển, hồ hoặc sông khác": "The sea, a lake or another river", "Nước, phù sa, môi trường sống": "Water, mud, a place to live", "Hồ": "Lake", "Khối nước nằm trong đất liền": "A body of water on land", "Hồ là vùng nước được đất bao quanh phần lớn hoặc hoàn toàn.": "A lake is water that is mostly or completely surrounded by land.", "Hồ có thể là nước ngọt hoặc nước mặn. Chúng hình thành theo nhiều cách như do sông, băng hà, miệng núi lửa hoặc chuyển động của vỏ Trái Đất.": "Lakes can be fresh or salty. They form in many ways, such as from rivers, glaciers, volcano craters or movements of Earth's crust.", "Hồ là một vùng nước nằm trong đất liền.": "A lake is an area of water on land.", "Trong đất liền": "On land", "Nước": "Water", "Có thể ngọt hoặc mặn": "Can be fresh or salty", "Nhiều nguyên nhân khác nhau": "Many different causes", "Môi trường sống, trữ nước": "Habitat and water storage", "Đảo": "Island", "Đất được nước bao quanh": "Land surrounded by water", "Đảo là một vùng đất được nước bao quanh ở mọi phía.": "An island is land surrounded by water on all sides.", "Đảo có thể rất nhỏ hoặc rất lớn. Một số đảo hình thành do núi lửa, một số là phần đất cao của lục địa bị nước bao quanh.": "Islands can be very small or very large. Some form from volcanoes, and some are high parts of a continent surrounded by water.", "Đảo là đất có nước bao quanh bốn phía.": "An island is land with water all around it.", "Kích thước": "Size", "Từ rất nhỏ tới rất lớn": "From tiny to huge", "Có thể do núi lửa hoặc kiến tạo": "Can come from volcanoes or plate movement", "Môi trường": "Environment", "Có hệ sinh thái riêng": "Has its own ecosystem", "Sa mạc": "Desert", "Nơi rất ít mưa": "A place with very little rain", "Sa mạc là vùng có lượng mưa rất ít, nên thực vật thường thưa thớt.": "A desert is an area with very little rain, so plants are usually sparse.", "Không phải sa mạc nào cũng nóng. Có cả sa mạc lạnh. Điểm chung quan trọng nhất là lượng mưa rất thấp.": "Not every desert is hot. There are cold deserts too. What they all share is very little rain.", "Sa mạc được xác định chủ yếu bởi sự khô hạn, không phải chỉ bởi nhiệt độ nóng.": "A desert is defined mainly by dryness, not just by heat.", "Rất ít mưa": "Very little rain", "Thực vật": "Plants", "Thường thưa": "Usually sparse", "Có thể nóng hoặc lạnh": "Can be hot or cold", "Thích nghi": "Adaptation", "Sinh vật cần tiết kiệm nước": "Living things must save water", "Núi lửa": "Volcano", "Nơi vật chất nóng có thể trào lên": "Where hot material can burst out", "Núi lửa là nơi magma, khí và vật chất từ bên trong Trái Đất có thể thoát lên bề mặt.": "A volcano is a place where magma, gas and material from inside Earth can escape to the surface.", "Khi magma ra khỏi mặt đất, ta gọi nó là dung nham. Núi lửa có thể tạo ra đất đá mới và làm thay đổi cảnh quan.": "When magma comes out of the ground, we call it lava. Volcanoes can make new rock and land and change the landscape.", "Magma ở dưới đất; khi trào ra bề mặt được gọi là dung nham.": "Magma is underground; when it comes out onto the surface it is called lava.", "Bên dưới đất": "Underground", "Ra bề mặt": "At the surface", "Có thể phun": "Can erupt", "Dung nham, tro, khí": "Lava, ash, gas", "Tạo đá và địa hình mới": "Makes new rock and landforms", "Trái Đất là hành tinh thứ mấy tính từ Mặt Trời?": "Which planet from the Sun is Earth?", "Thứ 1": "1st", "Thứ 2": "2nd", "Thứ 3": "3rd", "Thứ 4": "4th", "Trái Đất là hành tinh thứ 3.": "Earth is the 3rd planet.", "Khoảng bao nhiêu phần trăm bề mặt Trái Đất được nước bao phủ?": "About what percent of Earth's surface is covered by water?", "Khoảng 50%": "About 50%", "Khoảng 100%": "About 100%", "Khoảng 71% bề mặt Trái Đất được nước bao phủ.": "About 71% of Earth's surface is covered by water.", "Một ngày Trái Đất dài khoảng bao lâu?": "About how long is one day on Earth?", "12 giờ": "12 hours", "24 giờ": "24 hours", "7 ngày": "7 days", "365 ngày": "365 days", "Trái Đất tự quay một vòng trong khoảng 24 giờ.": "Earth spins around once in about 24 hours.", "Một năm Trái Đất dài khoảng bao lâu?": "About how long is one year on Earth?", "30 ngày": "30 days", "365,25 ngày": "365.25 days", "84 năm": "84 years", "Trái Đất quay quanh Mặt Trời trong khoảng 365,25 ngày.": "Earth goes around the Sun in about 365.25 days.", "Vệ tinh tự nhiên của Trái Đất là gì?": "What is Earth's natural satellite?", "Sao Hỏa": "Mars", "Mặt Trời": "The Sun", "Mặt Trăng là vệ tinh tự nhiên của Trái Đất.": "The Moon is Earth's natural satellite.", "Trái Đất tự quay quanh trục giúp tạo ra hiện tượng nào?": "Earth spinning on its axis causes what?", "Ngày và đêm": "Day and night", "Sự tự quay của Trái Đất tạo nên ngày và đêm.": "Earth's spinning gives us day and night.", "Lớp nào nằm ngoài cùng Trái Đất?": "Which layer is the outermost layer of Earth?", "Vỏ Trái Đất là lớp ngoài cùng.": "The crust is the outermost layer.", "Lớp nào nằm ở trung tâm Trái Đất?": "Which layer is at the center of Earth?", "Vỏ": "Crust", "Khí quyển": "Atmosphere", "Lõi trong nằm ở trung tâm Trái Đất.": "The inner core is at the center of Earth.", "Vỏ Trái Đất ở trạng thái nào?": "What state is Earth's crust in?", "Khí": "Gas", "Không có vật chất": "No material at all", "Vỏ Trái Đất là đá rắn.": "Earth's crust is solid rock.", "Vỏ Trái Đất dày khoảng bao nhiêu?": "About how thick is Earth's crust?", "Vỏ dày khoảng 5–70 km.": "The crust is about 5–70 km thick.", "Con người sống chủ yếu trên lớp nào?": "Which layer do people mainly live on?", "Lớp phủ sâu": "The deep mantle", "Chúng ta sống trên vỏ Trái Đất.": "We live on Earth's crust.", "Lớp nào dày nhất trong bốn lớp chính?": "Which of the four main layers is the thickest?", "Lớp phủ rất dày, khoảng 2.900 km.": "The mantle is very thick, about 2,900 km.", "Đá trong lớp phủ thế nào?": "What is the rock in the mantle like?", "Rất nóng và có thể biến dạng chậm": "Very hot and able to bend slowly", "Lạnh như băng": "Cold as ice", "Chỉ là nước": "Just water", "Hoàn toàn là khí": "Completely gas", "Đá lớp phủ rất nóng và có thể biến dạng, chuyển động chậm.": "Mantle rock is very hot and can bend and move slowly.", "Lớp phủ nằm ở đâu?": "Where is the mantle?", "Ngoài khí quyển": "Outside the atmosphere", "Trên mây": "Above the clouds", "Ngoài Mặt Trăng": "Outside the Moon", "Lớp phủ nằm ngay dưới vỏ Trái Đất.": "The mantle is just under Earth's crust.", "Lõi ngoài chủ yếu ở trạng thái nào?": "What state is the outer core mostly in?", "Băng": "Ice", "Lõi ngoài là kim loại lỏng.": "The outer core is liquid metal.", "Lõi ngoài chủ yếu gồm kim loại nào?": "Which metals is the outer core mostly made of?", "Vàng và bạc": "Gold and silver", "Nhôm và đồng": "Aluminum and copper", "Chì và thiếc": "Lead and tin", "Lõi ngoài chủ yếu gồm sắt và niken.": "The outer core is mostly iron and nickel.", "Chuyển động của lõi ngoài góp phần tạo ra gì?": "What does the moving outer core help create?", "Từ trường Trái Đất": "Earth's magnetic field", "Mây": "Clouds", "Mưa": "Rain", "Kim loại lỏng chuyển động trong lõi ngoài góp phần tạo từ trường.": "Liquid metal moving in the outer core helps create the magnetic field.", "Lõi trong ở trạng thái nào?": "What state is the inner core in?", "Lõi trong vẫn rắn do áp suất cực lớn.": "The inner core stays solid because of the enormous pressure.", "Vì sao lõi trong rất nóng nhưng vẫn rắn?": "Why is the inner core very hot but still solid?", "Do áp suất cực lớn": "Because of the enormous pressure", "Do có tuyết": "Because of snow", "Do thiếu ánh sáng": "Because there is no light", "Do có cây": "Because of trees", "Áp suất cực lớn giữ vật chất ở trạng thái rắn.": "Huge pressure keeps the material solid.", "Lõi trong nằm ở đâu?": "Where is the inner core?", "Trên núi": "On a mountain", "Trong đại dương": "In the ocean", "Địa hình nào thường có sườn dốc và đỉnh?": "Which landform usually has steep slopes and a peak?", "Núi thường có sườn dốc và đỉnh.": "Mountains usually have steep slopes and a peak.", "Núi có thể hình thành do điều gì?": "How can mountains form?", "Chuyển động các mảng và hoạt động núi lửa": "Plate movement and volcanoes", "Mưa một ngày": "One day of rain", "Cây mọc": "Growing trees", "Gió nhẹ": "A gentle breeze", "Kiến tạo và núi lửa là các quá trình hình thành núi.": "Plate movement and volcanoes are ways mountains form.", "Đồng bằng có đặc điểm nào?": "What is a plain like?", "Khá bằng phẳng": "Fairly flat", "Luôn cao nhất": "Always the highest", "Luôn khô nhất": "Always the driest", "Luôn là đảo": "Always an island", "Đồng bằng là vùng rộng và khá bằng phẳng.": "A plain is wide and fairly flat.", "Vì sao nhiều đồng bằng thuận lợi cho nông nghiệp?": "Why are many plains good for farming?", "Có đất phù sa màu mỡ": "They have rich river soil", "Không có nước": "They have no water", "Luôn có tuyết": "They always have snow", "Chỉ toàn đá": "They are all rock", "Nhiều đồng bằng có phù sa và đất màu mỡ.": "Many plains have river mud and rich soil.", "Cao nguyên là vùng đất như thế nào?": "What kind of land is a plateau?", "Cao nhưng mặt trên khá bằng": "High but with a fairly flat top", "Luôn thấp hơn biển": "Always lower than the sea", "Chỉ có nước": "Only water", "Là dòng sông": "It is a river", "Cao nguyên cao hơn vùng xung quanh nhưng mặt trên khá bằng.": "A plateau is higher than the land around it, with a fairly flat top.", "Cao nguyên khác núi ở điểm nào thường thấy?": "How is a plateau usually different from a mountain?", "Mặt trên rộng và khá bằng": "Its top is wide and fairly flat", "Không có đất": "It has no soil", "Luôn ngập nước": "It is always flooded", "Không có đá": "It has no rock", "Cao nguyên thường có bề mặt rộng và khá bằng.": "A plateau usually has a wide, fairly flat top.", "Thung lũng thường nằm ở đâu?": "Where is a valley usually found?", "Giữa các vùng núi hoặc đồi": "Between mountains or hills", "Giữa đại dương": "In the middle of the ocean", "Ngoài không gian": "In outer space", "Thung lũng là vùng thấp giữa núi hoặc đồi.": "A valley is low land between mountains or hills.", "Nhiều thung lũng có gì chảy qua?": "What flows through many valleys?", "Dung nham luôn luôn": "Always lava", "Sao chổi": "Comets", "Nhiều thung lũng có sông hoặc suối chảy qua.": "Many valleys have a river or stream flowing through them.", "Nước sông thường chảy theo hướng chung nào?": "Which way does river water usually flow?", "Từ thấp lên cao": "From low to high", "Đứng yên": "It stays still", "Bay lên trời": "Up into the sky", "Sông chảy theo độ dốc từ cao xuống thấp.": "Rivers flow downhill from high to low.", "Sông có thể mang theo gì và bồi đắp đồng bằng?": "What can rivers carry that builds up plains?", "Phù sa": "River mud", "Ánh sáng": "Light", "Gió": "Wind", "Sông vận chuyển phù sa và có thể bồi đắp đất.": "Rivers carry mud and can build up land.", "Hồ là gì?": "What is a lake?", "Vùng nước nằm trong đất liền": "An area of water on land", "Một đỉnh núi": "A mountain peak", "Một vùng trời": "An area of sky", "Một loại cây": "A kind of tree", "Hồ là vùng nước nằm trong đất liền.": "A lake is an area of water on land.", "Hồ có thể chứa loại nước nào?": "What kind of water can a lake hold?", "Có thể nước ngọt hoặc nước mặn": "Fresh or salt water", "Chỉ nước ngọt": "Only fresh water", "Chỉ nước mặn": "Only salt water", "Tùy hồ, nước có thể ngọt hoặc mặn.": "Depending on the lake, the water can be fresh or salty.", "Đảo có đặc điểm gì?": "What is an island like?", "Nước được đất bao quanh": "Water surrounded by land", "Chỉ là núi": "Only a mountain", "Chỉ là sa mạc": "Only a desert", "Đảo là vùng đất được nước bao quanh ở mọi phía.": "An island is land surrounded by water on all sides.", "Một số đảo có thể hình thành từ hoạt động gì?": "Some islands can form from what activity?", "Mưa nhẹ": "Light rain", "Tuyết tan trong cốc": "Snow melting in a cup", "Một số đảo có nguồn gốc núi lửa.": "Some islands come from volcanoes.", "Điểm chung quan trọng của sa mạc là gì?": "What do all deserts have in common?", "Luôn rất nóng": "Always very hot", "Luôn có rừng dày": "Always thick forest", "Sa mạc được đặc trưng bởi lượng mưa rất thấp.": "Deserts have very little rain.", "Sa mạc có thể lạnh không?": "Can a desert be cold?", "Có": "Yes", "Không bao giờ": "Never", "Chỉ vào buổi trưa": "Only at noon", "Chỉ dưới biển": "Only under the sea", "Có cả sa mạc nóng và sa mạc lạnh.": "There are both hot deserts and cold deserts.", "Magma khi trào ra bề mặt được gọi là gì?": "What is magma called when it comes out onto the surface?", "Sương": "Dew", "Magma ra bề mặt được gọi là dung nham.": "Magma at the surface is called lava.", "Núi lửa có thể phun ra gì?": "What can a volcano erupt?", "Dung nham, tro và khí": "Lava, ash and gas", "Chỉ cát": "Only sand", "Chỉ lá cây": "Only leaves", "Núi lửa có thể phun dung nham, tro và khí.": "Volcanoes can erupt lava, ash and gas.", "Địa hình nào là đất được nước bao quanh ở mọi phía?": "Which landform is land surrounded by water on all sides?", "Đảo là vùng đất được nước bao quanh.": "An island is land surrounded by water.", "Địa hình nào là vùng nước nằm trong đất liền?": "Which landform is an area of water on land?", "Khám phá Trái Đất": "Earth Explorer", "Cùng Cô Thỏ Hồng khám phá hành tinh xanh của chúng ta": "Explore our blue planet with Miss Pink Bunny", "đến ~2.900 km": "to ~2,900 km", "đến ~5.150 km": "to ~5,150 km", "Các lớp bên trong Trái Đất": "Earth's inner layers", "⏹ Dừng đọc": "⏹ Stop reading", "Nghe cô đọc": "Listen to Teacher", "Chưa phát được giọng đọc. Con nhờ bố mẹ hoặc thầy cô kiểm tra loa và mạng, rồi bấm lại nhé.": "I couldn't play the voice. Ask a parent or teacher to check the speaker and the internet, then tap again.", "Bé nhớ nhé:": "Remember:", "🔊 Nghe cô đọc": "🔊 Listen to Teacher", "Sổ khám phá": "Explorer's Log", "Trái Đất": "Earth", "Trái Đất có rất nhiều dạng địa hình. Chạm vào từng nơi để khám phá nhé!": "Earth has many kinds of landforms. Tap each place to explore!", "Tưởng tượng mình cắt đôi Trái Đất như cắt quả trứng. Chạm vào từng lớp nhé!": "Imagine cutting Earth in half like an egg. Tap each layer!", "Lớp vỏ được vẽ dày hơn thật cho dễ nhìn. Thật ra nó rất mỏng, như vỏ quả trứng.": "The crust is drawn thicker than it really is so it is easy to see. It is actually very thin, like an eggshell.", "✓ Đã xem": "✓ Seen", "câu đúng": "correct", "Cô tự đọc câu hỏi": "Teacher reads the questions", "Mẹo: bấm phím 1, 2, 3, 4 để chọn đáp án.": "Tip: press 1, 2, 3, 4 to choose an answer.", "Đổi câu hỏi khác": "Try other questions", "Tuyệt vời! Con là nhà thám hiểm Trái Đất nhí rồi!": "Amazing! You are a little Earth explorer now!", "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé.": "Well done! Let's review the questions below.", "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.": "You tried hard! Let's review and play again.", "Con đúng": "You got", "câu": "questions", "Làm lại câu sai": "Retry wrong answers", "Chơi vòng mới": "Play a new round", "Đáp án đúng của các câu con chưa trả lời được:": "Correct answers to the questions you missed:", "Con chọn một đáp án nhé!": "Pick an answer!", "Chính xác!": "Correct!", "Chưa đúng rồi. Đáp án đúng là": "Not quite. The correct answer is", "Câu": "Question", "trên": "of", "Đọc câu hỏi": "Read the question", "🔊 Đọc câu hỏi": "🔊 Read the question", "Xem kết quả": "See results", "Câu tiếp theo": "Next question", "🏆 Con đã khám phá hết Trái Đất rồi! Giỏi quá!": "🏆 You have explored all of Earth! Great job!", "🌍 Đã ghi": "🌍 Added", "vào sổ khám phá (": "to your explorer's log (", "Khám phá": "Explore", "Cấu tạo": "Layers", "Địa hình": "Landforms", "Hỏi đáp": "Quiz", "câu.": "questions.", "Các khu vực khám phá": "Exploration areas", "🔭 Khám phá": "🔭 Explore", "🌍 Cấu tạo": "🌍 Layers", "⛰️ Địa hình": "⛰️ Landforms", "⭐ Hỏi đáp": "⭐ Quiz"};
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


  /* Epsilon Edu - interactive experience. All state is in memory; no extra storage or APIs. */
  const EX_KIND = "earth";
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
    if (activeTab === "layers" && !isLayer(selectedId)) selectedId = DATA.primary[0].id;
    if (activeTab === "lands" && !isLand(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz") markFound(selectedId, true);
    let html = "";
    if (activeTab === "explore") html = exploreHtml();
    else if (activeTab === "layers") html = layersHtml();
    else if (activeTab === "lands") html = gridHtml(DATA.secondary);
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

  const TAB_LABELS = { explore: "Khám phá", layers: "Cấu tạo", lands: "Địa hình", quiz: "Hỏi đáp" , experience: "Trải nghiệm để hiểu"};
  function setBanner() {
    const fn0 = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    const fn = typeof fn0 === "function" ? (o) => fn0({ ...o, items: ((o && o.items) || []).map((it) => ({ ...it, title: trText(it.title) })) }) : fn0;
    if (typeof fn !== "function") return;
    fn({ items: [{ level: 2, title: `${CONFIG.gameNumber}. ${CONFIG.title}`, action: null }, { level: 3, title: (activeTab === "experience" ? exT("Trải nghiệm để hiểu", "Learn by doing") : TAB_LABELS[activeTab]), action: null }] });
  }

  function switchTab(tab, opts) {
    stopExperience();
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
      const expButton = t.closest("[data-ex]");
      if (expButton) { exHandleClick(expButton.dataset.ex, expButton.dataset.exValue || ""); return; }
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
  }

  function render(context) {
    activeContext = context;
    injectAssets();
    exReset();
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
        ${langHtml()}<div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="explore" type="button" aria-selected="true">🔭 Khám phá</button>
        <button class="gx-tab" role="tab" data-tab="layers" type="button" aria-selected="false" tabindex="-1">🌍 Cấu tạo</button>
        <button class="gx-tab" role="tab" data-tab="lands" type="button" aria-selected="false" tabindex="-1">⛰️ Địa hình</button>
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
