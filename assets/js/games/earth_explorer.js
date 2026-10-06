(() => {
  "use strict";

  const CONFIG = Object.freeze({"moduleKey":"earthExplorer","styleId":"class1-game-earth-explorer-style","rootId":"earth-explorer","gameNumber":11,"title":"Khám phá Trái Đất","subtitle":"Cùng Cô Thỏ Hồng khám phá hành tinh xanh của chúng ta","overviewId":"earth-overview","primaryTab":"Cấu tạo","secondaryTab":"Địa hình","primaryIcon":"🌍","secondaryIcon":"⛰️","logoSvg":"<svg viewBox=\"0 0 80 80\"><circle cx=\"40\" cy=\"40\" r=\"32\" fill=\"#3B82F6\"/><path d=\"M16 30q13-18 25-7t21-3v14q-12 9-19 0t-27 3zm8 24q12-7 22 0t20-5v15q-20 12-42 1z\" fill=\"#22C55E\"/></svg>"});
  const DATA = Object.freeze({"overview":{"id":"earth-overview","name":"Hành tinh Trái Đất","kicker":"KHÁM PHÁ TRÁI ĐẤT","subtitle":"Ngôi nhà xanh của chúng ta","summary":"Trái Đất là hành tinh thứ ba tính từ Mặt Trời và là ngôi nhà của con người cùng vô số sinh vật. Bề mặt có đại dương, lục địa, núi, đồng bằng, sông, hồ và rất nhiều kiểu địa hình.","more":"Trái Đất tự quay quanh trục tạo nên ngày và đêm, đồng thời chuyển động quanh Mặt Trời tạo nên một năm. Bên trong Trái Đất gồm nhiều lớp khác nhau: vỏ, lớp phủ, lõi ngoài và lõi trong.","remember":"Bé nhớ nhé: Trái Đất có nước, không khí, đất đá và điều kiện phù hợp cho sự sống.","speech":"Trái Đất là hành tinh thứ ba tính từ Mặt Trời. Khoảng bảy mươi mốt phần trăm bề mặt được nước bao phủ. Trái Đất tự quay tạo nên ngày đêm và quay quanh Mặt Trời trong khoảng ba trăm sáu mươi lăm ngày.","art":"earth","facts":[{"label":"Vị trí","value":"Hành tinh thứ 3"},{"label":"Nước bề mặt","value":"Khoảng 71%"},{"label":"Đất liền","value":"Khoảng 29%"},{"label":"Một ngày","value":"Khoảng 24 giờ"},{"label":"Một năm","value":"Khoảng 365,25 ngày"},{"label":"Vệ tinh tự nhiên","value":"Mặt Trăng"}]},"primary":[{"id":"crust","name":"Vỏ Trái Đất","kicker":"CẤU TẠO","subtitle":"Lớp ngoài cùng","summary":"Vỏ Trái Đất là lớp đá rắn mỏng ở ngoài cùng, nơi chúng ta đang sống.","more":"Vỏ đại dương thường mỏng hơn vỏ lục địa. So với kích thước cả Trái Đất, lớp vỏ rất mỏng, giống như lớp vỏ mỏng bên ngoài của một quả trứng.","remember":"Là lớp ngoài cùng, rắn và mỏng nhất.","speech":"Vỏ Trái Đất là lớp ngoài cùng nơi chúng ta sinh sống. Nó là lớp đá rắn và mỏng hơn rất nhiều so với các lớp bên dưới.","art":"crust","facts":[{"label":"Vị trí","value":"Ngoài cùng"},{"label":"Trạng thái","value":"Rắn"},{"label":"Độ dày","value":"Khoảng 5–70 km"},{"label":"Gồm","value":"Vỏ đại dương và vỏ lục địa"},{"label":"Nơi sống","value":"Con người và hầu hết sinh vật trên cạn"}]},{"id":"mantle","name":"Lớp phủ","kicker":"CẤU TẠO","subtitle":"Lớp dày nhất","summary":"Lớp phủ nằm dưới vỏ và chiếm phần lớn thể tích Trái Đất.","more":"Đá ở lớp phủ rất nóng. Phần lớn vẫn là chất rắn nhưng có thể biến dạng và chuyển động cực kỳ chậm trong thời gian dài, góp phần làm các mảng vỏ Trái Đất dịch chuyển.","remember":"Là lớp rất dày, nóng và chuyển động rất chậm.","speech":"Lớp phủ nằm dưới vỏ Trái Đất. Đây là lớp rất dày, rất nóng và vật chất bên trong có thể chuyển động rất chậm.","art":"mantle","facts":[{"label":"Vị trí","value":"Dưới vỏ"},{"label":"Độ dày","value":"Khoảng 2.900 km"},{"label":"Nhiệt độ","value":"Rất nóng"},{"label":"Vật chất","value":"Đá nóng, phần lớn ở trạng thái rắn nhưng có thể biến dạng"},{"label":"Vai trò","value":"Liên quan tới chuyển động các mảng kiến tạo"}]},{"id":"outer-core","name":"Lõi ngoài","kicker":"CẤU TẠO","subtitle":"Kim loại lỏng","summary":"Lõi ngoài nằm sâu dưới lớp phủ và chủ yếu gồm sắt cùng niken ở trạng thái lỏng.","more":"Dòng chuyển động của kim loại lỏng trong lõi ngoài giúp tạo ra từ trường Trái Đất, một lớp bảo vệ quan trọng trước nhiều hạt mang điện từ không gian.","remember":"Là lớp kim loại lỏng và góp phần tạo từ trường Trái Đất.","speech":"Lõi ngoài chủ yếu gồm sắt và niken ở trạng thái lỏng. Chuyển động của kim loại lỏng góp phần tạo nên từ trường Trái Đất.","art":"outer-core","facts":[{"label":"Vị trí","value":"Bao quanh lõi trong"},{"label":"Trạng thái","value":"Lỏng"},{"label":"Thành phần chính","value":"Sắt và niken"},{"label":"Nhiệt độ","value":"Rất cao"},{"label":"Vai trò","value":"Góp phần tạo từ trường Trái Đất"}]},{"id":"inner-core","name":"Lõi trong","kicker":"CẤU TẠO","subtitle":"Trung tâm Trái Đất","summary":"Lõi trong là phần nằm ở chính giữa Trái Đất và chủ yếu gồm sắt cùng niken.","more":"Nhiệt độ ở đây rất cao, nhưng áp suất khổng lồ khiến vật chất vẫn ở trạng thái rắn. Đây là lớp nhỏ nhất trong bốn lớp chính nhưng có mật độ rất lớn.","remember":"Nằm ở trung tâm, rất nóng nhưng vẫn rắn vì áp suất cực lớn.","speech":"Lõi trong nằm ở trung tâm Trái Đất. Dù rất nóng, áp suất cực lớn khiến sắt và niken tại đây vẫn ở trạng thái rắn.","art":"inner-core","facts":[{"label":"Vị trí","value":"Trung tâm"},{"label":"Trạng thái","value":"Rắn"},{"label":"Thành phần chính","value":"Sắt và niken"},{"label":"Nhiệt độ","value":"Rất cao"},{"label":"Áp suất","value":"Cực lớn"}]}],"secondary":[{"id":"mountain","name":"Núi","kicker":"ĐỊA HÌNH","subtitle":"Vùng đất cao","summary":"Núi là dạng địa hình nhô cao rõ rệt so với vùng xung quanh, thường có sườn dốc và đỉnh.","more":"Núi có thể hình thành do các mảng kiến tạo đẩy ép nhau, do núi lửa hoặc các quá trình địa chất kéo dài hàng triệu năm.","remember":"Núi cao hơn rõ rệt so với khu vực xung quanh và thường có sườn dốc.","speech":"Núi là vùng đất cao với sườn dốc và đỉnh. Nhiều dãy núi hình thành khi các mảng của vỏ Trái Đất chuyển động và ép vào nhau.","art":"mountain","facts":[{"label":"Đặc điểm","value":"Cao, sườn dốc"},{"label":"Bộ phận","value":"Chân núi, sườn núi, đỉnh núi"},{"label":"Hình thành","value":"Kiến tạo, núi lửa và xói mòn"},{"label":"Ví dụ","value":"Các dãy núi lớn trên lục địa"}]},{"id":"plain","name":"Đồng bằng","kicker":"ĐỊA HÌNH","subtitle":"Vùng đất tương đối bằng phẳng","summary":"Đồng bằng là vùng đất rộng, khá bằng phẳng hoặc chỉ gợn nhẹ.","more":"Nhiều đồng bằng có đất màu mỡ do phù sa sông bồi đắp, nên rất thuận lợi cho trồng trọt và xây dựng khu dân cư.","remember":"Đồng bằng thường thấp và khá bằng phẳng.","speech":"Đồng bằng là vùng đất rộng và tương đối bằng phẳng. Nhiều đồng bằng được sông bồi đắp phù sa nên đất rất màu mỡ.","art":"plain","facts":[{"label":"Đặc điểm","value":"Rộng, khá bằng phẳng"},{"label":"Độ cao","value":"Thường thấp hơn vùng núi"},{"label":"Liên hệ","value":"Nhiều nơi có sông và đất phù sa"},{"label":"Con người","value":"Thuận lợi cho nông nghiệp và đô thị"}]},{"id":"plateau","name":"Cao nguyên","kicker":"ĐỊA HÌNH","subtitle":"Cao nhưng khá bằng phẳng","summary":"Cao nguyên là vùng đất nằm cao hơn khu vực xung quanh nhưng mặt trên tương đối bằng hoặc lượn sóng.","more":"Cao nguyên khác núi ở chỗ phần trên thường rộng và khá bằng phẳng. Một số cao nguyên được hình thành từ hoạt động núi lửa cổ hoặc sự nâng lên của vỏ Trái Đất.","remember":"Cao hơn đồng bằng nhưng mặt trên thường khá rộng và bằng.","speech":"Cao nguyên là vùng đất cao nhưng bề mặt tương đối bằng phẳng hoặc lượn sóng.","art":"plateau","facts":[{"label":"Đặc điểm","value":"Cao, mặt trên khá bằng"},{"label":"So với núi","value":"Ít có đỉnh nhọn liên tục"},{"label":"Hình thành","value":"Nâng kiến tạo hoặc dung nham cổ"},{"label":"Cảnh quan","value":"Có thể có đồng cỏ, rừng, nông nghiệp"}]},{"id":"valley","name":"Thung lũng","kicker":"ĐỊA HÌNH","subtitle":"Vùng thấp giữa các vùng cao","summary":"Thung lũng là vùng đất thấp nằm giữa núi hoặc đồi, thường kéo dài thành dải.","more":"Nhiều thung lũng được sông bào mòn qua thời gian. Một số thung lũng khác được tạo bởi băng hà cổ.","remember":"Thung lũng là phần đất thấp nằm giữa các vùng cao.","speech":"Thung lũng là vùng đất thấp giữa núi hoặc đồi. Nhiều thung lũng có sông chảy qua.","art":"valley","facts":[{"label":"Đặc điểm","value":"Thấp hơn vùng xung quanh"},{"label":"Vị trí","value":"Giữa núi hoặc đồi"},{"label":"Thường có","value":"Sông hoặc suối"},{"label":"Hình thành","value":"Xói mòn của sông hoặc băng hà"}]},{"id":"river","name":"Sông","kicker":"ĐỊA HÌNH","subtitle":"Dòng nước chảy","summary":"Sông là dòng nước tự nhiên chảy từ nơi cao xuống nơi thấp và thường đổ ra hồ, biển hoặc một con sông khác.","more":"Sông vận chuyển nước và phù sa, tạo môi trường sống cho nhiều sinh vật và cung cấp nước cho con người.","remember":"Nước sông chảy theo độ dốc từ nơi cao xuống nơi thấp.","speech":"Sông là dòng nước tự nhiên chảy từ nơi cao xuống nơi thấp. Sông có thể bồi đắp phù sa và cung cấp nước cho rất nhiều sinh vật.","art":"river","facts":[{"label":"Dạng","value":"Dòng nước chảy"},{"label":"Hướng chung","value":"Từ cao xuống thấp"},{"label":"Có thể đổ vào","value":"Biển, hồ hoặc sông khác"},{"label":"Vai trò","value":"Nước, phù sa, môi trường sống"}]},{"id":"lake","name":"Hồ","kicker":"ĐỊA HÌNH","subtitle":"Khối nước nằm trong đất liền","summary":"Hồ là vùng nước được đất bao quanh phần lớn hoặc hoàn toàn.","more":"Hồ có thể là nước ngọt hoặc nước mặn. Chúng hình thành theo nhiều cách như do sông, băng hà, miệng núi lửa hoặc chuyển động của vỏ Trái Đất.","remember":"Hồ là một vùng nước nằm trong đất liền.","speech":"Hồ là vùng nước nằm trong đất liền và được đất bao quanh. Hồ có thể là nước ngọt hoặc nước mặn.","art":"lake","facts":[{"label":"Vị trí","value":"Trong đất liền"},{"label":"Nước","value":"Có thể ngọt hoặc mặn"},{"label":"Hình thành","value":"Nhiều nguyên nhân khác nhau"},{"label":"Vai trò","value":"Môi trường sống, trữ nước"}]},{"id":"island","name":"Đảo","kicker":"ĐỊA HÌNH","subtitle":"Đất được nước bao quanh","summary":"Đảo là một vùng đất được nước bao quanh ở mọi phía.","more":"Đảo có thể rất nhỏ hoặc rất lớn. Một số đảo hình thành do núi lửa, một số là phần đất cao của lục địa bị nước bao quanh.","remember":"Đảo là đất có nước bao quanh bốn phía.","speech":"Đảo là vùng đất được nước bao quanh ở mọi phía. Nhiều đảo có nguồn gốc từ núi lửa hoặc các quá trình địa chất khác.","art":"island","facts":[{"label":"Đặc điểm","value":"Đất được nước bao quanh"},{"label":"Kích thước","value":"Từ rất nhỏ tới rất lớn"},{"label":"Hình thành","value":"Có thể do núi lửa hoặc kiến tạo"},{"label":"Môi trường","value":"Có hệ sinh thái riêng"}]},{"id":"desert","name":"Sa mạc","kicker":"ĐỊA HÌNH","subtitle":"Nơi rất ít mưa","summary":"Sa mạc là vùng có lượng mưa rất ít, nên thực vật thường thưa thớt.","more":"Không phải sa mạc nào cũng nóng. Có cả sa mạc lạnh. Điểm chung quan trọng nhất là lượng mưa rất thấp.","remember":"Sa mạc được xác định chủ yếu bởi sự khô hạn, không phải chỉ bởi nhiệt độ nóng.","speech":"Sa mạc là vùng rất khô, nhận rất ít mưa. Có sa mạc nóng và cũng có sa mạc lạnh.","art":"desert","facts":[{"label":"Đặc điểm","value":"Rất ít mưa"},{"label":"Thực vật","value":"Thường thưa"},{"label":"Nhiệt độ","value":"Có thể nóng hoặc lạnh"},{"label":"Thích nghi","value":"Sinh vật cần tiết kiệm nước"}]},{"id":"volcano","name":"Núi lửa","kicker":"ĐỊA HÌNH","subtitle":"Nơi vật chất nóng có thể trào lên","summary":"Núi lửa là nơi magma, khí và vật chất từ bên trong Trái Đất có thể thoát lên bề mặt.","more":"Khi magma ra khỏi mặt đất, ta gọi nó là dung nham. Núi lửa có thể tạo ra đất đá mới và làm thay đổi cảnh quan.","remember":"Magma ở dưới đất; khi trào ra bề mặt được gọi là dung nham.","speech":"Núi lửa là nơi vật chất nóng từ bên trong Trái Đất có thể trào lên. Magma khi ra khỏi mặt đất được gọi là dung nham.","art":"volcano","facts":[{"label":"Bên dưới đất","value":"Magma"},{"label":"Ra bề mặt","value":"Dung nham"},{"label":"Có thể phun","value":"Dung nham, tro, khí"},{"label":"Vai trò","value":"Tạo đá và địa hình mới"}]}],"quiz":[{"q":"Trái Đất là hành tinh thứ mấy tính từ Mặt Trời?","a":["Thứ 1","Thứ 2","Thứ 3","Thứ 4"],"c":2,"note":"Trái Đất là hành tinh thứ 3."},{"q":"Khoảng bao nhiêu phần trăm bề mặt Trái Đất được nước bao phủ?","a":["Khoảng 29%","Khoảng 50%","Khoảng 71%","Khoảng 100%"],"c":2,"note":"Khoảng 71% bề mặt Trái Đất được nước bao phủ."},{"q":"Một ngày Trái Đất dài khoảng bao lâu?","a":["12 giờ","24 giờ","7 ngày","365 ngày"],"c":1,"note":"Trái Đất tự quay một vòng trong khoảng 24 giờ."},{"q":"Một năm Trái Đất dài khoảng bao lâu?","a":["24 giờ","30 ngày","365,25 ngày","84 năm"],"c":2,"note":"Trái Đất quay quanh Mặt Trời trong khoảng 365,25 ngày."},{"q":"Vệ tinh tự nhiên của Trái Đất là gì?","a":["Mặt Trăng","Sao Kim","Sao Hỏa","Mặt Trời"],"c":0,"note":"Mặt Trăng là vệ tinh tự nhiên của Trái Đất."},{"q":"Trái Đất tự quay quanh trục giúp tạo ra hiện tượng nào?","a":["Ngày và đêm","Núi lửa","Sông","Sa mạc"],"c":0,"note":"Sự tự quay của Trái Đất tạo nên ngày và đêm."},{"q":"Lớp nào nằm ngoài cùng Trái Đất?","a":["Lõi trong","Lõi ngoài","Lớp phủ","Vỏ Trái Đất"],"c":3,"note":"Vỏ Trái Đất là lớp ngoài cùng."},{"q":"Lớp nào nằm ở trung tâm Trái Đất?","a":["Lõi trong","Vỏ","Lớp phủ","Khí quyển"],"c":0,"note":"Lõi trong nằm ở trung tâm Trái Đất."},{"q":"Vỏ Trái Đất ở trạng thái nào?","a":["Rắn","Lỏng","Khí","Không có vật chất"],"c":0,"note":"Vỏ Trái Đất là đá rắn."},{"q":"Vỏ Trái Đất dày khoảng bao nhiêu?","a":["5–70 km","2.900 km","10.000 km","1 m"],"c":0,"note":"Vỏ dày khoảng 5–70 km."},{"q":"Con người sống chủ yếu trên lớp nào?","a":["Vỏ Trái Đất","Lõi ngoài","Lõi trong","Lớp phủ sâu"],"c":0,"note":"Chúng ta sống trên vỏ Trái Đất."},{"q":"Lớp nào dày nhất trong bốn lớp chính?","a":["Vỏ","Lớp phủ","Lõi ngoài","Lõi trong"],"c":1,"note":"Lớp phủ rất dày, khoảng 2.900 km."},{"q":"Đá trong lớp phủ thế nào?","a":["Rất nóng và có thể biến dạng chậm","Lạnh như băng","Chỉ là nước","Hoàn toàn là khí"],"c":0,"note":"Đá lớp phủ rất nóng và có thể biến dạng, chuyển động chậm."},{"q":"Lớp phủ nằm ở đâu?","a":["Dưới vỏ","Ngoài khí quyển","Trên mây","Ngoài Mặt Trăng"],"c":0,"note":"Lớp phủ nằm ngay dưới vỏ Trái Đất."},{"q":"Lõi ngoài chủ yếu ở trạng thái nào?","a":["Rắn","Lỏng","Khí","Băng"],"c":1,"note":"Lõi ngoài là kim loại lỏng."},{"q":"Lõi ngoài chủ yếu gồm kim loại nào?","a":["Sắt và niken","Vàng và bạc","Nhôm và đồng","Chì và thiếc"],"c":0,"note":"Lõi ngoài chủ yếu gồm sắt và niken."},{"q":"Chuyển động của lõi ngoài góp phần tạo ra gì?","a":["Từ trường Trái Đất","Mây","Sông","Mưa"],"c":0,"note":"Kim loại lỏng chuyển động trong lõi ngoài góp phần tạo từ trường."},{"q":"Lõi trong ở trạng thái nào?","a":["Rắn","Lỏng","Khí","Nước"],"c":0,"note":"Lõi trong vẫn rắn do áp suất cực lớn."},{"q":"Vì sao lõi trong rất nóng nhưng vẫn rắn?","a":["Do áp suất cực lớn","Do có tuyết","Do thiếu ánh sáng","Do có cây"],"c":0,"note":"Áp suất cực lớn giữ vật chất ở trạng thái rắn."},{"q":"Lõi trong nằm ở đâu?","a":["Trung tâm Trái Đất","Trên núi","Trong đại dương","Ngoài khí quyển"],"c":0,"note":"Lõi trong nằm ở trung tâm Trái Đất."},{"q":"Địa hình nào thường có sườn dốc và đỉnh?","a":["Núi","Đồng bằng","Hồ","Sông"],"c":0,"note":"Núi thường có sườn dốc và đỉnh."},{"q":"Núi có thể hình thành do điều gì?","a":["Chuyển động các mảng và hoạt động núi lửa","Mưa một ngày","Cây mọc","Gió nhẹ"],"c":0,"note":"Kiến tạo và núi lửa là các quá trình hình thành núi."},{"q":"Đồng bằng có đặc điểm nào?","a":["Khá bằng phẳng","Luôn cao nhất","Luôn khô nhất","Luôn là đảo"],"c":0,"note":"Đồng bằng là vùng rộng và khá bằng phẳng."},{"q":"Vì sao nhiều đồng bằng thuận lợi cho nông nghiệp?","a":["Có đất phù sa màu mỡ","Không có nước","Luôn có tuyết","Chỉ toàn đá"],"c":0,"note":"Nhiều đồng bằng có phù sa và đất màu mỡ."},{"q":"Cao nguyên là vùng đất như thế nào?","a":["Cao nhưng mặt trên khá bằng","Luôn thấp hơn biển","Chỉ có nước","Là dòng sông"],"c":0,"note":"Cao nguyên cao hơn vùng xung quanh nhưng mặt trên khá bằng."},{"q":"Cao nguyên khác núi ở điểm nào thường thấy?","a":["Mặt trên rộng và khá bằng","Không có đất","Luôn ngập nước","Không có đá"],"c":0,"note":"Cao nguyên thường có bề mặt rộng và khá bằng."},{"q":"Thung lũng thường nằm ở đâu?","a":["Giữa các vùng núi hoặc đồi","Trên mây","Giữa đại dương","Ngoài không gian"],"c":0,"note":"Thung lũng là vùng thấp giữa núi hoặc đồi."},{"q":"Nhiều thung lũng có gì chảy qua?","a":["Sông hoặc suối","Dung nham luôn luôn","Mây","Sao chổi"],"c":0,"note":"Nhiều thung lũng có sông hoặc suối chảy qua."},{"q":"Nước sông thường chảy theo hướng chung nào?","a":["Từ cao xuống thấp","Từ thấp lên cao","Đứng yên","Bay lên trời"],"c":0,"note":"Sông chảy theo độ dốc từ cao xuống thấp."},{"q":"Sông có thể mang theo gì và bồi đắp đồng bằng?","a":["Phù sa","Ánh sáng","Gió","Mây"],"c":0,"note":"Sông vận chuyển phù sa và có thể bồi đắp đất."},{"q":"Hồ là gì?","a":["Vùng nước nằm trong đất liền","Một đỉnh núi","Một vùng trời","Một loại cây"],"c":0,"note":"Hồ là vùng nước nằm trong đất liền."},{"q":"Hồ có thể chứa loại nước nào?","a":["Có thể nước ngọt hoặc nước mặn","Chỉ nước ngọt","Chỉ nước mặn","Không có nước"],"c":0,"note":"Tùy hồ, nước có thể ngọt hoặc mặn."},{"q":"Đảo có đặc điểm gì?","a":["Đất được nước bao quanh","Nước được đất bao quanh","Chỉ là núi","Chỉ là sa mạc"],"c":0,"note":"Đảo là vùng đất được nước bao quanh ở mọi phía."},{"q":"Một số đảo có thể hình thành từ hoạt động gì?","a":["Núi lửa","Mưa nhẹ","Cây mọc","Tuyết tan trong cốc"],"c":0,"note":"Một số đảo có nguồn gốc núi lửa."},{"q":"Điểm chung quan trọng của sa mạc là gì?","a":["Rất ít mưa","Luôn rất nóng","Luôn có tuyết","Luôn có rừng dày"],"c":0,"note":"Sa mạc được đặc trưng bởi lượng mưa rất thấp."},{"q":"Sa mạc có thể lạnh không?","a":["Có","Không bao giờ","Chỉ vào buổi trưa","Chỉ dưới biển"],"c":0,"note":"Có cả sa mạc nóng và sa mạc lạnh."},{"q":"Magma khi trào ra bề mặt được gọi là gì?","a":["Dung nham","Phù sa","Sương","Băng"],"c":0,"note":"Magma ra bề mặt được gọi là dung nham."},{"q":"Núi lửa có thể phun ra gì?","a":["Dung nham, tro và khí","Chỉ nước ngọt","Chỉ cát","Chỉ lá cây"],"c":0,"note":"Núi lửa có thể phun dung nham, tro và khí."},{"q":"Địa hình nào là đất được nước bao quanh ở mọi phía?","a":["Đảo","Hồ","Thung lũng","Đồng bằng"],"c":0,"note":"Đảo là vùng đất được nước bao quanh."},{"q":"Địa hình nào là vùng nước nằm trong đất liền?","a":["Hồ","Núi","Cao nguyên","Sa mạc"],"c":0,"note":"Hồ là vùng nước nằm trong đất liền."}]});
  const STYLE_ID = CONFIG.styleId;
  let activeContext = null;
  let root = null;
  let controller = null;
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
    let buf = "";
    sentences.forEach((piece) => {
      const part = piece.trim();
      if (!part) return;
      if (!buf) buf = part;
      else if ((buf + " " + part).length <= maxLength) buf += " " + part;
      else { chunks.push(buf); buf = part; }
    });
    if (buf) chunks.push(buf);
    return chunks.flatMap((chunk) => {
      if (chunk.length <= maxLength) return [chunk];
      const words = chunk.split(" ");
      const parts = [];
      let current = "";
      words.forEach((word) => {
        if (!current || (current + " " + word).length <= maxLength) current = current ? current + " " + word : word;
        else { parts.push(current); current = word; }
      });
      if (current) parts.push(current);
      return parts;
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

  function playNext(nonce) {
    if (nonce !== ttsNonce || !ttsQueue.length) { speakingKey = ""; updateSpeakButtons(); return; }
    const chunk = ttsQueue.shift();
    try {
      ttsAudio.pause(); ttsAudio.currentTime = 0;
      ttsAudio.src = ttsUrl(chunk);
      ttsAudio.playbackRate = 0.96;
      const p = ttsAudio.play();
      if (p && typeof p.catch === "function") p.catch(() => showVoiceNote());
    } catch (_) { showVoiceNote(); }
  }

  function speak(key, text) {
    if (speakingKey === key && !ttsAudio.paused) { stopSpeak(); return; }
    const chunks = splitTtsText(text);
    if (!chunks.length) return;
    stopSpeak(false);
    const nonce = ++ttsNonce;
    speakingKey = key;
    ttsQueue = chunks.slice();
    updateSpeakButtons();
    playNext(nonce);
  }

  ttsAudio.addEventListener("ended", () => { const n = ttsNonce; if (ttsQueue.length) playNext(n); else { speakingKey = ""; updateSpeakButtons(); } });

  function showVoiceNote() {
    speakingKey = "";
    updateSpeakButtons();
    const note = root && root.querySelector(".ex-voice-note");
    if (note) { note.hidden = false; note.textContent = "Chưa phát được giọng đọc. Con thử bấm lại hoặc kiểm tra kết nối mạng nhé."; }
  }

  function updateSpeakButtons() {
    if (!root) return;
    root.querySelectorAll(".ex-read").forEach((btn) => {
      const on = speakingKey && btn.dataset.speakKey === speakingKey && !ttsAudio.paused;
      btn.classList.toggle("is-speaking", !!on);
      btn.textContent = on ? "⏹️ Dừng đọc" : "🔊 Nghe cô đọc";
    });
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${CONFIG.rootId}{--pink:#EC4899;--purple:#8B5CF6;--blue:#3B82F6;--green:#10B981;--ink:#344054;--muted:#667085;width:100%;height:min(740px,calc(100vh - 135px));min-height:630px;border:1px solid #E9D5FF;border-radius:24px;overflow:hidden;background:radial-gradient(circle at 16% 10%,rgba(244,114,182,.14),transparent 27%),radial-gradient(circle at 84% 15%,rgba(56,189,248,.15),transparent 26%),linear-gradient(180deg,#FFFBFE,#FAF7FF 48%,#F3FBFF);box-shadow:0 10px 28px rgba(76,29,149,.08);display:grid;grid-template-rows:auto auto minmax(0,1fr);color:var(--ink)}
      #${CONFIG.rootId} *{box-sizing:border-box}
      #${CONFIG.rootId} button{font:inherit}
      .ex-head{display:flex;align-items:center;gap:12px;padding:13px 18px 9px}
      .ex-logo{width:52px;height:52px;flex:0 0 52px;border-radius:16px;background:linear-gradient(135deg,#FCE7F3,#EDE9FE);display:flex;align-items:center;justify-content:center;border:1px solid #F9A8D4;box-shadow:0 4px 12px rgba(139,92,246,.12)}
      .ex-logo svg{width:38px;height:38px}
      .ex-head h2{margin:0;color:#5B216E;font-size:28px;line-height:1.05;font-weight:950}
      .ex-head p{margin:3px 0 0;color:#667085;font-size:14px;font-weight:850}
      .ex-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0 18px 11px}
      .ex-tab{min-height:46px;border:1px solid;border-radius:15px;font-size:15px;font-weight:950;box-shadow:0 3px 8px rgba(76,29,149,.05);transition:.15s ease}
      .ex-tab:nth-child(1){background:#FFF1F7;border-color:#F9A8D4;color:#BE185D} .ex-tab:nth-child(2){background:#F5F3FF;border-color:#C4B5FD;color:#6D28D9} .ex-tab:nth-child(3){background:#EFF8FF;border-color:#7DD3FC;color:#0369A1} .ex-tab:nth-child(4){background:#ECFDF5;border-color:#86EFAC;color:#047857}
      .ex-tab.is-active{color:#fff;border-color:transparent;transform:translateY(-1px)} .ex-tab:nth-child(1).is-active,.ex-tab:nth-child(2).is-active{background:linear-gradient(90deg,#EC4899,#8B5CF6)} .ex-tab:nth-child(3).is-active,.ex-tab:nth-child(4).is-active{background:linear-gradient(90deg,#3B82F6,#10B981)}
      .ex-stage{min-height:0;padding:0 18px 16px} .ex-panel{height:100%;min-height:0}
      .ex-overview,.ex-list{height:100%;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(390px,.95fr);gap:12px}
      .ex-card{min-height:0;border:1px solid rgba(196,181,253,.76);border-radius:20px;background:rgba(255,255,255,.93);box-shadow:0 7px 18px rgba(76,29,149,.06);overflow:hidden}
      .ex-map{position:relative;min-height:0}
      .ex-map svg{width:100%;height:100%;display:block}
      .ex-map button{position:absolute;border:0;background:transparent;padding:0;cursor:pointer}
      .ex-map-tip{position:absolute;left:14px;bottom:13px;z-index:5;padding:8px 11px;border-radius:12px;background:rgba(255,255,255,.9);color:#5B216E;font-size:12.5px;font-weight:950;box-shadow:0 4px 12px rgba(15,23,42,.13)}
      .ex-info{padding:17px 18px 16px;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#C4B5FD #FAF5FF}
      .ex-info::-webkit-scrollbar{width:8px} .ex-info::-webkit-scrollbar-track{background:#FAF5FF;border-radius:999px} .ex-info::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#F9A8D4,#C4B5FD);border-radius:999px;border:2px solid #FAF5FF}
      .ex-kicker{color:#EC4899;font-size:12px;font-weight:950;letter-spacing:.07em;text-transform:uppercase} .ex-info h3{margin:4px 0 5px;color:#5B216E;font-size:28px;line-height:1.08} .ex-subtitle{color:#0369A1;font-size:13px;font-weight:950;margin-bottom:7px}
      .ex-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:4px 0 10px} .ex-read{min-height:40px;padding:0 14px;border:1px solid #A7F3D0;border-radius:12px;background:linear-gradient(90deg,#EFFCF7,#E0F2FE);color:#047857;font-size:14px;font-weight:950} .ex-read.is-speaking{color:#fff;border-color:transparent;background:linear-gradient(90deg,#EC4899,#8B5CF6)}
      .ex-info p{margin:0 0 10px;color:#475467;font-size:15.5px;line-height:1.55;font-weight:780} .ex-facts{display:grid;grid-template-columns:1fr 1fr;gap:8px} .ex-fact{padding:9px 10px;border:1px solid #E9D5FF;border-radius:13px;background:#FAF5FF} .ex-fact strong{display:block;color:#6D28D9;font-size:12.5px;line-height:1.25} .ex-fact span{display:block;margin-top:3px;color:#475467;font-size:12.5px;line-height:1.4;font-weight:820}
      .ex-rabbit{margin-top:10px;padding:10px 11px;border:1px solid #F9A8D4;border-radius:14px;background:#FFF1F7;color:#BE185D;font-size:12.5px;line-height:1.45;font-weight:900} .ex-voice-note{margin-top:8px;padding:8px;border-radius:12px;background:#FFF7ED;color:#C2410C;font-size:12px;font-weight:900}
      .ex-grid{padding:9px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:8px}
      .ex-object{min-width:0;border:1px solid #E9D5FF;border-radius:16px;background:linear-gradient(145deg,#FFF,#FAF5FF);padding:7px;display:flex;align-items:center;gap:7px;text-align:left;transition:.15s ease;box-shadow:0 3px 8px rgba(76,29,149,.05)} .ex-object:hover,.ex-object.is-selected{transform:translateY(-1px);border-color:#A855F7;box-shadow:0 7px 15px rgba(139,92,246,.13)} .ex-object.is-selected{background:linear-gradient(145deg,#FFF1F7,#F5F3FF)}
      .ex-art{width:48px;height:48px;flex:0 0 48px;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;border:1px solid #F1E8FF} .ex-art svg{width:44px;height:44px;display:block} .ex-object-copy{min-width:0} .ex-object-copy strong{display:block;color:#344054;font-size:12.5px;line-height:1.16} .ex-object-copy small{display:block;margin-top:3px;color:#667085;font-size:10.3px;font-weight:850;line-height:1.25}
      .ex-quiz{height:100%;padding:14px;display:grid;grid-template-columns:minmax(0,1.12fr) minmax(280px,.58fr);gap:12px} .ex-quiz-main{padding:17px;border:1px solid #E9D5FF;border-radius:18px;background:linear-gradient(145deg,#FFF,#FAF5FF);display:flex;flex-direction:column;min-height:0} .ex-quiz-meta{display:flex;justify-content:space-between;gap:10px;color:#667085;font-size:13px;font-weight:900} .ex-track{height:9px;border-radius:99px;background:#EDE9FE;overflow:hidden;margin:9px 0 15px} .ex-bar{height:100%;border-radius:inherit;background:linear-gradient(90deg,#EC4899,#8B5CF6,#3B82F6,#10B981)}
      .ex-question{margin:0 0 13px;color:#344054;font-size:21px;line-height:1.35;font-weight:950} .ex-answers{display:grid;grid-template-columns:1fr 1fr;gap:9px} .ex-answer{min-height:54px;padding:10px 12px;border:1.5px solid #D8B4FE;border-radius:15px;background:#fff;color:#5B216E;text-align:left;font-size:14px;font-weight:900} .ex-answer.correct{background:#ECFDF5;border-color:#10B981;color:#047857} .ex-answer.wrong{background:#FFF1F2;border-color:#FB7185;color:#BE123C} .ex-answer:disabled{cursor:default} .ex-feedback{min-height:46px;margin-top:10px;padding:9px 11px;border-radius:13px;background:#F8FAFC;color:#475467;font-size:12.8px;font-weight:850;line-height:1.45} .ex-next{margin-top:auto;align-self:flex-end;min-width:136px;min-height:42px;border:0;border-radius:13px;background:linear-gradient(90deg,#EC4899,#8B5CF6);color:#fff;font-weight:950;box-shadow:0 5px 12px rgba(139,92,246,.2)} .ex-next:disabled{opacity:.5;cursor:not-allowed}
      .ex-score{padding:16px;border:1px solid #BAE6FD;border-radius:18px;background:linear-gradient(145deg,#EFF8FF,#ECFDF5);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center} .ex-score-ring{width:112px;height:112px;border:2px dashed #7DD3FC;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:950;color:#0369A1;margin-bottom:10px} .ex-score strong{color:#047857;font-size:17px} .ex-score p{margin:5px 0 0;color:#475467;font-size:13px;font-weight:800;line-height:1.45} .ex-reset{margin-top:12px;min-height:38px;padding:0 14px;border:1px solid #86EFAC;border-radius:12px;background:#fff;color:#047857;font-weight:950}
      @media(max-width:1024px){#${CONFIG.rootId}{height:min(705px,calc(100vh - 110px));min-height:600px} .ex-head{padding:11px 14px 8px} .ex-tabs{padding:0 14px 10px} .ex-stage{padding:0 14px 14px} .ex-overview,.ex-list{grid-template-columns:minmax(0,1fr) minmax(350px,.95fr)} .ex-grid{gap:7px;padding:8px} .ex-info h3{font-size:25px} .ex-info p{font-size:14.5px}}
      @media(max-width:760px){#${CONFIG.rootId}{height:auto;min-height:0;overflow:visible} .ex-tabs{grid-template-columns:1fr 1fr} .ex-stage{min-height:600px} .ex-overview,.ex-list,.ex-quiz{grid-template-columns:1fr;grid-template-rows:minmax(320px,1fr) auto} .ex-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:none;grid-auto-rows:minmax(72px,auto);overflow:auto} .ex-facts{grid-template-columns:1fr} .ex-answers{grid-template-columns:1fr}}
      @media(prefers-reduced-motion:reduce){#${CONFIG.rootId} *{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function logoSvg() { return CONFIG.logoSvg; }

  function artSvg(key) {
    switch(key){
      case "crust": return `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="#F97316"/><circle cx="40" cy="40" r="24" fill="#F59E0B"/><circle cx="40" cy="40" r="17" fill="#FBBF24"/><circle cx="40" cy="40" r="8" fill="#FEF3C7"/><path d="M15 35q12-16 25-8t25-4" fill="none" stroke="#10B981" stroke-width="5"/></svg>`;
      case "mantle": return `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="#EA580C"/><circle cx="40" cy="40" r="12" fill="#FDBA74"/><path d="M23 40q17-18 34 0t-34 0" fill="none" stroke="#FDE68A" stroke-width="4"/></svg>`;
      case "outer-core": return `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="28" fill="#F59E0B"/><circle cx="40" cy="40" r="14" fill="#FEF3C7"/><path d="M26 24q16 8 28 0M25 56q15-9 30 0" fill="none" stroke="#F97316" stroke-width="4"/></svg>`;
      case "inner-core": return `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="25" fill="#FDE68A"/><circle cx="40" cy="40" r="13" fill="#FFF7ED"/><path d="M40 13v54M13 40h54" stroke="#F59E0B" stroke-width="3" opacity=".7"/></svg>`;
      case "mountain": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#E0F2FE"/><path d="M4 68L29 25l11 16 10-10 26 37z" fill="#64748B"/><path d="M22 38l7-13 8 12-7-3z" fill="#fff"/><path d="M0 68h80v12H0z" fill="#86EFAC"/></svg>`;
      case "plain": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#DBEAFE"/><path d="M0 45Q20 38 40 44T80 43v37H0z" fill="#86EFAC"/><path d="M0 59q20-8 40 0t40 0" fill="none" stroke="#22C55E" stroke-width="3"/></svg>`;
      case "plateau": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#E0F2FE"/><path d="M9 65l13-32h36l13 32z" fill="#B45309"/><path d="M22 33h36l-5 9H27z" fill="#84CC16"/></svg>`;
      case "valley": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#E0F2FE"/><path d="M0 66L24 25l16 24 16-24 24 41z" fill="#64748B"/><path d="M36 48q4 8 8 0v32h-8z" fill="#38BDF8"/><path d="M0 66h80v14H0z" fill="#86EFAC"/></svg>`;
      case "river": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#ECFDF5"/><path d="M44 0c-12 20 7 24-5 40S28 62 34 80" fill="none" stroke="#38BDF8" stroke-width="12"/><path d="M0 70h80v10H0z" fill="#86EFAC"/></svg>`;
      case "lake": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#ECFDF5"/><ellipse cx="40" cy="50" rx="30" ry="17" fill="#38BDF8"/><path d="M7 37q10-17 18 0m30 0q10-17 18 0" fill="#22C55E"/></svg>`;
      case "island": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#BAE6FD"/><ellipse cx="40" cy="58" rx="26" ry="9" fill="#FBBF24"/><path d="M42 55q-4-23 6-36" stroke="#92400E" stroke-width="5"/><path d="M48 20q12 0 18 9-12 2-18-2m0-7q-11-2-17 6 10 4 17 1" fill="#22C55E"/></svg>`;
      case "desert": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#FEF3C7"/><circle cx="61" cy="17" r="10" fill="#FBBF24"/><path d="M0 52q18-13 38 0t42 0v28H0z" fill="#F59E0B"/><path d="M21 57V34m0 8h-8m8 7h10" stroke="#16A34A" stroke-width="5"/></svg>`;
      case "volcano": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#E0F2FE"/><path d="M10 70L34 31h13l23 39z" fill="#78716C"/><path d="M34 31l6 11 7-11 6 9" fill="#EF4444"/><path d="M40 25q-8-10 0-17m7 20q10-8 4-18" fill="none" stroke="#94A3B8" stroke-width="5"/></svg>`;
      default:return `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="28" fill="#60A5FA"/><path d="M20 35q9-17 22-7t18-4v18q-12 9-18 0t-22 2z" fill="#22C55E"/></svg>`;
    }
  }

  function objectById(id) {
    if (id === CONFIG.overviewId) return DATA.overview;
    return [...DATA.primary, ...DATA.secondary].find((x) => x.id === id) || DATA.overview;
  }

  function detailHtml(obj) {
    return `<div class="ex-kicker">${obj.kicker}</div><h3>${obj.name}</h3><div class="ex-subtitle">${obj.subtitle}</div><div class="ex-actions"><button class="ex-read" type="button" data-action="speak" data-speak-key="${obj.id}">🔊 Nghe cô đọc</button></div><p><strong>🌟 Điều nổi bật:</strong> ${obj.summary}</p><p><strong>🔭 Khám phá thêm:</strong> ${obj.more}</p><p><strong>🧠 Bé nhớ nhé:</strong> ${obj.remember}</p><div class="ex-facts">${obj.facts.map((f) => `<div class="ex-fact"><strong>${f.label}</strong><span>${f.value}</span></div>`).join("")}</div><div class="ex-rabbit">🐰 Cô Thỏ Hồng: Con quan sát kỹ rồi sang tab Hỏi đáp để thử xem mình nhớ được bao nhiêu nhé!</div><div class="ex-voice-note" hidden></div>`;
  }

  function overviewVisualHtml() {
    return `<svg viewBox="0 0 700 500" preserveAspectRatio="xMidYMid meet" aria-label="Trái Đất và cấu tạo bên trong"><defs><radialGradient id="space" cx="50%" cy="45%"><stop offset="0" stop-color="#263B80"/><stop offset="1" stop-color="#10143D"/></radialGradient></defs><rect width="700" height="500" fill="url(#space)"/><g fill="#fff" opacity=".7"><circle cx="75" cy="75" r="2"/><circle cx="170" cy="135" r="2"/><circle cx="610" cy="90" r="2"/><circle cx="540" cy="390" r="2"/></g><circle cx="275" cy="245" r="150" fill="#3B82F6"/><path d="M165 180q45-65 92-34 15 35 52 22 30 24 15 60-42 5-61 44-38 20-75-5-24-47-23-87z" fill="#22C55E"/><path d="M305 112q58 14 85 55-25 28-52 25-6-37-33-80zM315 300q39-23 72-6-18 52-71 78-23-34-1-72z" fill="#16A34A"/><g transform="translate(470 150)"><circle cx="85" cy="95" r="90" fill="#EA580C"/><circle cx="85" cy="95" r="68" fill="#F97316"/><circle cx="85" cy="95" r="45" fill="#F59E0B"/><circle cx="85" cy="95" r="23" fill="#FEF3C7"/><path d="M85 5v180" stroke="#fff" stroke-width="3" opacity=".7"/><text x="85" y="205" fill="#fff" font-size="17" font-family="Arial" font-weight="700" text-anchor="middle">Cắt lớp bên trong Trái Đất</text></g><text x="275" y="440" fill="#fff" font-size="20" font-family="Arial" font-weight="700" text-anchor="middle">Bề mặt: nước, lục địa và nhiều dạng địa hình</text></svg><button type="button" data-object="earth-overview" style="left:7%;top:15%;width:52%;height:70%" aria-label="Tổng quan Trái Đất"></button><button type="button" data-object="crust" style="left:67%;top:25%;width:23%;height:50%" aria-label="Cấu tạo Trái Đất"></button>`;
  }

  function overviewHtml() { return `<div class="ex-overview"><div class="ex-card ex-map">${overviewVisualHtml()}<div class="ex-map-tip">👆 Chạm vào từng vùng hoặc hình để khám phá</div></div><aside class="ex-card ex-info" id="ex-info">${detailHtml(objectById(selectedId))}</aside></div>`; }

  function listHtml(items) {
    if (!items.some((x) => x.id === selectedId)) selectedId = items[0].id;
    return `<div class="ex-list"><div class="ex-card ex-grid">${items.map((obj) => `<button class="ex-object ${obj.id === selectedId ? "is-selected" : ""}" type="button" data-object="${obj.id}"><span class="ex-art">${artSvg(obj.art)}</span><span class="ex-object-copy"><strong>${obj.name}</strong><small>${obj.subtitle}</small></span></button>`).join("")}</div><aside class="ex-card ex-info" id="ex-info">${detailHtml(objectById(selectedId))}</aside></div>`;
  }

  function quizHtml() {
    if (quizIndex >= DATA.quiz.length) return `<div class="ex-quiz"><div class="ex-quiz-main" style="align-items:center;justify-content:center;text-align:center"><div style="font-size:52px">🏆</div><h3 class="ex-question">Hoàn thành chuyến khám phá!</h3><div class="ex-feedback">Con đã trả lời đúng <strong>${quizScore}/${DATA.quiz.length}</strong> câu.</div><button class="ex-next" type="button" data-action="reset-quiz" style="align-self:center;margin-top:14px">Chơi lại</button></div><aside class="ex-score"><div class="ex-score-ring">${quizScore}</div><strong>Điểm khám phá</strong><p>Con có thể quay lại các tab kiến thức, nghe Cô Thỏ Hồng đọc rồi thử lại nhé!</p></aside></div>`;
    const q = DATA.quiz[quizIndex];
    return `<div class="ex-quiz"><div class="ex-quiz-main"><div class="ex-quiz-meta"><span>Câu ${quizIndex+1}/${DATA.quiz.length}</span><span>Đúng: ${quizScore}</span></div><div class="ex-track"><div class="ex-bar" style="width:${(quizIndex/DATA.quiz.length)*100}%"></div></div><h3 class="ex-question">${q.q}</h3><div class="ex-answers">${q.a.map((a,i)=>`<button class="ex-answer" type="button" data-answer="${i}"><span style="opacity:.65;margin-right:6px">${String.fromCharCode(65+i)}.</span>${a}</button>`).join("")}</div><div class="ex-feedback" id="ex-feedback">🐰 Cô Thỏ Hồng: Con chọn một đáp án nhé!</div><button class="ex-next" type="button" data-action="next-quiz" disabled>${quizIndex===DATA.quiz.length-1?"Xem kết quả":"Câu tiếp theo →"}</button></div><aside class="ex-score"><div class="ex-score-ring">${quizScore}</div><strong>Điểm khám phá</strong><p>40 câu hỏi đều lấy từ kiến thức trong các tab của game.</p><button class="ex-reset" type="button" data-action="reset-quiz">Làm lại từ đầu</button></aside></div>`;
  }

  function renderStage() {
    if (!root) return;
    stopSpeak(false);
    const stage = root.querySelector(".ex-stage");
    if (activeTab === "overview") stage.innerHTML = `<section class="ex-panel">${overviewHtml()}</section>`;
    else if (activeTab === "primary") stage.innerHTML = `<section class="ex-panel">${listHtml(DATA.primary)}</section>`;
    else if (activeTab === "secondary") stage.innerHTML = `<section class="ex-panel">${listHtml(DATA.secondary)}</section>`;
    else stage.innerHTML = `<section class="ex-panel">${quizHtml()}</section>`;
    updateSpeakButtons();
  }

  function setBanner() {
    const fn = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof fn !== "function") return;
    const labels = {overview:"Tổng quan",primary:CONFIG.primaryTab,secondary:CONFIG.secondaryTab,quiz:"Hỏi đáp"};
    fn({items:[{level:2,title:`${CONFIG.gameNumber}. ${CONFIG.title}`,action:null},{level:3,title:labels[activeTab],action:null}]});
  }

  function bind() {
    controller = new AbortController();
    const signal = controller.signal;
    root.addEventListener("click", (event) => {
      const tab = event.target.closest(".ex-tab");
      if (tab) { activeTab = tab.dataset.tab; root.querySelectorAll(".ex-tab").forEach((b)=>b.classList.toggle("is-active",b.dataset.tab===activeTab)); renderStage(); setBanner(); return; }
      const speakBtn = event.target.closest('[data-action="speak"]');
      if (speakBtn) { const obj=objectById(speakBtn.dataset.speakKey); speak(obj.id,obj.speech); return; }
      const objectBtn = event.target.closest("[data-object]");
      if (objectBtn) { selectedId=objectBtn.dataset.object; stopSpeak(); const info=root.querySelector("#ex-info"); if(info) info.innerHTML=detailHtml(objectById(selectedId)); root.querySelectorAll(".ex-object").forEach((b)=>b.classList.toggle("is-selected",b.dataset.object===selectedId)); updateSpeakButtons(); return; }
      const answer = event.target.closest("[data-answer]");
      if (answer && activeTab === "quiz" && !quizLocked) { const q=DATA.quiz[quizIndex]; const chosen=Number(answer.dataset.answer); quizLocked=true; if(chosen===q.c) quizScore+=1; root.querySelectorAll(".ex-answer").forEach((b)=>{b.disabled=true; const i=Number(b.dataset.answer); if(i===q.c)b.classList.add("correct"); else if(i===chosen)b.classList.add("wrong");}); const feedback=root.querySelector("#ex-feedback"); if(feedback)feedback.innerHTML=chosen===q.c?`🌟 Chính xác! ${q.note}`:`💡 Chưa đúng rồi. ${q.note}`; const next=root.querySelector('[data-action="next-quiz"]'); if(next)next.disabled=false; const score=root.querySelector(".ex-score-ring"); if(score)score.textContent=String(quizScore); return; }
      const action=event.target.closest("[data-action]"); if(!action)return; if(action.dataset.action==="next-quiz"){if(!quizLocked)return;quizIndex+=1;quizLocked=false;renderStage();} else if(action.dataset.action==="reset-quiz"){quizIndex=0;quizScore=0;quizLocked=false;renderStage();}
    }, {signal});
  }

  function render(context) {
    activeContext=context; injectStyle(); activeTab="overview"; selectedId=CONFIG.overviewId; quizIndex=0; quizScore=0; quizLocked=false;
    root=document.createElement("section"); root.id=CONFIG.rootId; root.innerHTML=`<header class="ex-head"><div class="ex-logo">${logoSvg()}</div><div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div></header><nav class="ex-tabs" aria-label="Các khu vực khám phá"><button class="ex-tab is-active" data-tab="overview" type="button">🌟 Tổng quan</button><button class="ex-tab" data-tab="primary" type="button">${CONFIG.primaryIcon} ${CONFIG.primaryTab}</button><button class="ex-tab" data-tab="secondary" type="button">${CONFIG.secondaryIcon} ${CONFIG.secondaryTab}</button><button class="ex-tab" data-tab="quiz" type="button">🚀 Hỏi đáp</button></nav><div class="ex-stage"></div>`; context.host.replaceChildren(root); renderStage(); bind(); setBanner();
  }

  function destroy() { stopSpeak(false); if(controller)controller.abort(); controller=null; if(root&&root.isConnected)root.remove(); root=null; activeContext=null; }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[CONFIG.moduleKey] = {render,destroy};
})();
