(() => {
  "use strict";

  const CONFIG = Object.freeze({"moduleKey":"insectExplorer","styleId":"class1-game-insect-explorer-style","rootId":"insect-explorer","title":"Khám phá côn trùng","subtitle":"Cùng Cô Thỏ Hồng quan sát thế giới nhỏ bé quanh mình","icon":"🐞","overviewId":"insect-overview","primaryTab":"Cấu tạo","secondaryTab":"Côn trùng quanh bé","primaryIcon":"🔎","secondaryIcon":"🐝","finishIcon":"🦋","sceneTip":"👆 Chạm vào các côn trùng trong khu vườn để khám phá"});
  const DATA = Object.freeze({"overview":{"id":"insect-overview","name":"Thế giới côn trùng","icon":"🐞","kicker":"KHÁM PHÁ CÔN TRÙNG","subtitle":"Những sinh vật nhỏ nhưng vô cùng đa dạng","summary":"Côn trùng là nhóm động vật không xương sống rất đa dạng. Một côn trùng trưởng thành điển hình có ba phần cơ thể: đầu, ngực và bụng; đồng thời có sáu chân.","more":"Nhiều côn trùng có cánh, nhưng không phải loài nào cũng bay. Chúng có thể thụ phấn cho hoa, phân hủy vật chất, làm thức ăn cho sinh vật khác hoặc đôi khi gây hại.","remember":"Bé nhớ: nhện có tám chân nên không phải côn trùng. Khi gặp côn trùng lạ, không nên tự ý chạm vào.","speech":"Thế giới côn trùng. Côn trùng là nhóm động vật không xương sống rất đa dạng. Một côn trùng trưởng thành điển hình có ba phần cơ thể: đầu, ngực và bụng; đồng thời có sáu chân. Nhiều côn trùng có cánh, nhưng không phải loài nào cũng bay. Chúng có thể thụ phấn cho hoa, phân hủy vật chất, làm thức ăn cho sinh vật khác hoặc đôi khi gây hại. Bé nhớ: nhện có tám chân nên không phải côn trùng. Khi gặp côn trùng lạ, không nên tự ý chạm vào.","facts":[{"label":"Cơ thể","value":"Đầu – ngực – bụng"},{"label":"Số chân","value":"6 chân ở con trưởng thành"},{"label":"Râu","value":"Thường có một đôi"},{"label":"Cánh","value":"Nhiều loài có, nhưng không phải tất cả"},{"label":"Vai trò","value":"Thụ phấn, phân hủy, làm thức ăn"},{"label":"Không phải côn trùng","value":"Nhện"}]},"primary":[{"id":"head","name":"Đầu","icon":"🧠","kicker":"CẤU TẠO CÔN TRÙNG","subtitle":"Nơi có mắt, miệng và râu","summary":"Phần đầu của côn trùng mang nhiều cơ quan cảm giác và bộ phận miệng.","more":"Hình dạng miệng khác nhau tùy cách ăn: bướm có vòi hút, châu chấu có miệng nhai, muỗi có vòi chích hút.","remember":"Đầu giúp côn trùng quan sát, ngửi, chạm và tìm thức ăn.","speech":"Đầu. Phần đầu của côn trùng mang nhiều cơ quan cảm giác và bộ phận miệng. Hình dạng miệng khác nhau tùy cách ăn: bướm có vòi hút, châu chấu có miệng nhai, muỗi có vòi chích hút. Đầu giúp côn trùng quan sát, ngửi, chạm và tìm thức ăn.","facts":[{"label":"Có thể có","value":"Mắt"},{"label":"Có","value":"Một đôi râu"},{"label":"Miệng","value":"Khác nhau theo cách ăn"},{"label":"Vai trò","value":"Cảm nhận môi trường"}]},{"id":"thorax","name":"Ngực","icon":"🦵","kicker":"CẤU TẠO CÔN TRÙNG","subtitle":"Nơi gắn sáu chân và thường cả cánh","summary":"Phần ngực của côn trùng gồm ba đốt và mang ba đôi chân.","more":"Ở nhiều loài, cánh cũng gắn vào phần ngực. Các cơ lớn trong ngực giúp chân và cánh hoạt động.","remember":"Muốn tìm sáu chân của côn trùng, hãy nhìn phần ngực.","speech":"Ngực. Phần ngực của côn trùng gồm ba đốt và mang ba đôi chân. Ở nhiều loài, cánh cũng gắn vào phần ngực. Các cơ lớn trong ngực giúp chân và cánh hoạt động. Muốn tìm sáu chân của côn trùng, hãy nhìn phần ngực.","facts":[{"label":"Số đốt","value":"3"},{"label":"Chân","value":"3 đôi = 6 chân"},{"label":"Cánh","value":"Thường gắn ở ngực"},{"label":"Chức năng","value":"Vận động"}]},{"id":"abdomen","name":"Bụng","icon":"🟤","kicker":"CẤU TẠO CÔN TRÙNG","subtitle":"Nơi chứa nhiều cơ quan bên trong","summary":"Phần bụng nằm sau ngực và chứa nhiều cơ quan tiêu hóa, bài tiết và sinh sản.","more":"Dọc cơ thể nhiều côn trùng có các lỗ thở nhỏ gọi là lỗ thở, kết nối với hệ thống ống khí.","remember":"Côn trùng không thở bằng phổi giống con người.","speech":"Bụng. Phần bụng nằm sau ngực và chứa nhiều cơ quan tiêu hóa, bài tiết và sinh sản. Dọc cơ thể nhiều côn trùng có các lỗ thở nhỏ gọi là lỗ thở, kết nối với hệ thống ống khí. Côn trùng không thở bằng phổi giống con người.","facts":[{"label":"Vị trí","value":"Sau phần ngực"},{"label":"Chứa","value":"Nhiều cơ quan bên trong"},{"label":"Hô hấp","value":"Qua hệ thống ống khí"},{"label":"Lỗ thở","value":"Các lỗ nhỏ trên cơ thể"}]},{"id":"legs","name":"Sáu chân","icon":"6️⃣","kicker":"CẤU TẠO CÔN TRÙNG","subtitle":"Ba đôi chân gắn ở ngực","summary":"Côn trùng trưởng thành có ba đôi chân, tổng cộng sáu chân.","more":"Chân có thể thích nghi theo lối sống: châu chấu có chân sau khỏe để nhảy, bọ ngựa có chân trước để giữ mồi, bọ nước có chân thích hợp để bơi.","remember":"Sáu chân là dấu hiệu rất quan trọng để nhận biết côn trùng.","speech":"Sáu chân. Côn trùng trưởng thành có ba đôi chân, tổng cộng sáu chân. Chân có thể thích nghi theo lối sống: châu chấu có chân sau khỏe để nhảy, bọ ngựa có chân trước để giữ mồi, bọ nước có chân thích hợp để bơi. Sáu chân là dấu hiệu rất quan trọng để nhận biết côn trùng.","facts":[{"label":"Tổng số","value":"6"},{"label":"Số đôi","value":"3 đôi"},{"label":"Gắn ở","value":"Ngực"},{"label":"Có thể thích nghi","value":"Nhảy, bơi, giữ mồi"}]},{"id":"antennae","name":"Râu","icon":"📡","kicker":"CẤU TẠO CÔN TRÙNG","subtitle":"Cơ quan cảm giác ở đầu","summary":"Côn trùng thường có một đôi râu trên đầu.","more":"Râu giúp cảm nhận mùi, rung động, tiếp xúc và nhiều tín hiệu khác trong môi trường. Hình dạng râu rất đa dạng giữa các loài.","remember":"Râu không phải là chân; chúng là cơ quan cảm giác.","speech":"Râu. Côn trùng thường có một đôi râu trên đầu. Râu giúp cảm nhận mùi, rung động, tiếp xúc và nhiều tín hiệu khác trong môi trường. Hình dạng râu rất đa dạng giữa các loài. Râu không phải là chân; chúng là cơ quan cảm giác.","facts":[{"label":"Số lượng","value":"Một đôi"},{"label":"Vị trí","value":"Trên đầu"},{"label":"Cảm nhận","value":"Mùi và tiếp xúc"},{"label":"Hình dạng","value":"Rất đa dạng"}]},{"id":"metamorphosis","name":"Biến thái","icon":"🔄","kicker":"CẤU TẠO CÔN TRÙNG","subtitle":"Cơ thể thay đổi qua các giai đoạn","summary":"Nhiều côn trùng thay đổi hình dạng rất rõ khi lớn lên.","more":"Bướm và bọ cánh cứng trải qua biến thái hoàn toàn: trứng → ấu trùng → nhộng → trưởng thành. Châu chấu trải qua biến thái không hoàn toàn: trứng → con non → trưởng thành.","remember":"Không phải mọi côn trùng đều có giai đoạn nhộng.","speech":"Biến thái. Nhiều côn trùng thay đổi hình dạng rất rõ khi lớn lên. Bướm và bọ cánh cứng trải qua biến thái hoàn toàn: trứng → ấu trùng → nhộng → trưởng thành. Châu chấu trải qua biến thái không hoàn toàn: trứng → con non → trưởng thành. Không phải mọi côn trùng đều có giai đoạn nhộng.","facts":[{"label":"Biến thái hoàn toàn","value":"Có giai đoạn nhộng"},{"label":"Ví dụ hoàn toàn","value":"Bướm, bọ cánh cứng"},{"label":"Không hoàn toàn","value":"Không có nhộng"},{"label":"Ví dụ","value":"Châu chấu"}]}],"secondary":[{"id":"bee","name":"Ong mật","icon":"🐝","kicker":"CÔN TRÙNG QUANH BÉ","subtitle":"Loài thụ phấn sống theo đàn","summary":"Ong mật sống trong đàn có tổ chức và thu mật hoa cùng phấn hoa từ hoa.","more":"Khi ghé thăm hoa, ong có thể mang phấn từ hoa này sang hoa khác, giúp nhiều cây thụ phấn. Ong mật còn tạo mật để dự trữ thức ăn cho đàn.","remember":"Quan sát ong từ khoảng cách an toàn và không chọc phá tổ ong.","speech":"Ong mật. Ong mật sống trong đàn có tổ chức và thu mật hoa cùng phấn hoa từ hoa. Khi ghé thăm hoa, ong có thể mang phấn từ hoa này sang hoa khác, giúp nhiều cây thụ phấn. Ong mật còn tạo mật để dự trữ thức ăn cho đàn. Quan sát ong từ khoảng cách an toàn và không chọc phá tổ ong.","facts":[{"label":"Sống","value":"Theo đàn"},{"label":"Thu từ hoa","value":"Mật hoa và phấn hoa"},{"label":"Vai trò","value":"Thụ phấn"},{"label":"Sản phẩm","value":"Mật ong"}]},{"id":"butterfly","name":"Bướm","icon":"🦋","kicker":"CÔN TRÙNG QUANH BÉ","subtitle":"Cánh nhiều màu và vòi hút dài","summary":"Bướm trưởng thành thường có hai đôi cánh phủ những vảy rất nhỏ.","more":"Bướm dùng vòi hút dài để hút mật hoa. Vòng đời thường gồm trứng, sâu bướm, nhộng và bướm trưởng thành.","remember":"Sâu bướm và bướm trưởng thành trông rất khác nhau vì biến thái hoàn toàn.","speech":"Bướm. Bướm trưởng thành thường có hai đôi cánh phủ những vảy rất nhỏ. Bướm dùng vòi hút dài để hút mật hoa. Vòng đời thường gồm trứng, sâu bướm, nhộng và bướm trưởng thành. Sâu bướm và bướm trưởng thành trông rất khác nhau vì biến thái hoàn toàn.","facts":[{"label":"Cánh","value":"Hai đôi"},{"label":"Miệng","value":"Vòi hút"},{"label":"Ấu trùng","value":"Sâu bướm"},{"label":"Vòng đời","value":"Có giai đoạn nhộng"}]},{"id":"ant","name":"Kiến","icon":"🐜","kicker":"CÔN TRÙNG QUANH BÉ","subtitle":"Nhỏ bé nhưng làm việc theo đàn","summary":"Kiến sống thành đàn với nhiều cá thể có nhiệm vụ khác nhau.","more":"Kiến giao tiếp bằng hóa chất gọi là pheromone. Nhiều loài để lại đường mùi giúp các con khác tìm thức ăn.","remember":"Không phải mọi con kiến đều có cánh; kiến sinh sản ở một số giai đoạn có thể có cánh.","speech":"Kiến. Kiến sống thành đàn với nhiều cá thể có nhiệm vụ khác nhau. Kiến giao tiếp bằng hóa chất gọi là pheromone. Nhiều loài để lại đường mùi giúp các con khác tìm thức ăn. Không phải mọi con kiến đều có cánh; kiến sinh sản ở một số giai đoạn có thể có cánh.","facts":[{"label":"Sống","value":"Theo đàn"},{"label":"Giao tiếp","value":"Pheromone"},{"label":"Tìm đường","value":"Có thể theo đường mùi"},{"label":"Cánh","value":"Không phải cá thể nào cũng có"}]},{"id":"ladybug","name":"Bọ rùa","icon":"🐞","kicker":"CÔN TRÙNG QUANH BÉ","subtitle":"Một loài bọ cánh cứng có ích","summary":"Bọ rùa thuộc nhóm bọ cánh cứng. Nhiều loài có màu đỏ, cam hoặc vàng với các đốm.","more":"Cả ấu trùng và trưởng thành của nhiều loài bọ rùa ăn rệp cây, vì vậy chúng có thể giúp bảo vệ cây.","remember":"Số đốm không dùng để xác định tuổi của bọ rùa.","speech":"Bọ rùa. Bọ rùa thuộc nhóm bọ cánh cứng. Nhiều loài có màu đỏ, cam hoặc vàng với các đốm. Cả ấu trùng và trưởng thành của nhiều loài bọ rùa ăn rệp cây, vì vậy chúng có thể giúp bảo vệ cây. Số đốm không dùng để xác định tuổi của bọ rùa.","facts":[{"label":"Nhóm","value":"Bọ cánh cứng"},{"label":"Màu","value":"Thường đỏ, cam hoặc vàng"},{"label":"Thức ăn nhiều loài","value":"Rệp cây"},{"label":"Điều sai","value":"Số đốm không phải tuổi"}]},{"id":"dragonfly","name":"Chuồn chuồn","icon":"🪰","kicker":"CÔN TRÙNG QUANH BÉ","subtitle":"Thợ săn bay nhanh gần ao hồ","summary":"Chuồn chuồn trưởng thành có hai đôi cánh lớn và mắt kép rất phát triển.","more":"Giai đoạn ấu trùng sống dưới nước và săn các sinh vật nhỏ. Khi trưởng thành, chuồn chuồn bắt nhiều côn trùng khác khi đang bay.","remember":"Chuồn chuồn có vòng đời gắn cả với nước và không khí.","speech":"Chuồn chuồn. Chuồn chuồn trưởng thành có hai đôi cánh lớn và mắt kép rất phát triển. Giai đoạn ấu trùng sống dưới nước và săn các sinh vật nhỏ. Khi trưởng thành, chuồn chuồn bắt nhiều côn trùng khác khi đang bay. Chuồn chuồn có vòng đời gắn cả với nước và không khí.","facts":[{"label":"Cánh","value":"Hai đôi"},{"label":"Mắt","value":"Mắt kép lớn"},{"label":"Ấu trùng","value":"Sống dưới nước"},{"label":"Thức ăn","value":"Săn côn trùng khác"}]},{"id":"grasshopper","name":"Châu chấu","icon":"🦗","kicker":"CÔN TRÙNG QUANH BÉ","subtitle":"Đôi chân sau rất khỏe để nhảy","summary":"Châu chấu có chân sau dài và khỏe, thích nghi tốt với việc nhảy.","more":"Châu chấu có biến thái không hoàn toàn: con non trông giống bản nhỏ của trưởng thành nhưng chưa phát triển đầy đủ cánh và cơ quan sinh sản.","remember":"Châu chấu không có giai đoạn nhộng.","speech":"Châu chấu. Châu chấu có chân sau dài và khỏe, thích nghi tốt với việc nhảy. Châu chấu có biến thái không hoàn toàn: con non trông giống bản nhỏ của trưởng thành nhưng chưa phát triển đầy đủ cánh và cơ quan sinh sản. Châu chấu không có giai đoạn nhộng.","facts":[{"label":"Chân sau","value":"Dài và khỏe"},{"label":"Di chuyển","value":"Nhảy tốt"},{"label":"Biến thái","value":"Không hoàn toàn"},{"label":"Nhộng","value":"Không có"}]},{"id":"mosquito","name":"Muỗi","icon":"🦟","kicker":"CÔN TRÙNG QUANH BÉ","subtitle":"Vòng đời có giai đoạn sống trong nước","summary":"Ấu trùng muỗi sống trong nước. Muỗi trưởng thành có một đôi cánh hoạt động.","more":"Ở nhiều loài, muỗi cái hút máu để lấy chất dinh dưỡng cần cho việc tạo trứng, còn cả đực và cái đều có thể hút mật hoa.","remember":"Tránh nước đọng quanh nhà giúp giảm nơi muỗi sinh sản.","speech":"Muỗi. Ấu trùng muỗi sống trong nước. Muỗi trưởng thành có một đôi cánh hoạt động. Ở nhiều loài, muỗi cái hút máu để lấy chất dinh dưỡng cần cho việc tạo trứng, còn cả đực và cái đều có thể hút mật hoa. Tránh nước đọng quanh nhà giúp giảm nơi muỗi sinh sản.","facts":[{"label":"Ấu trùng","value":"Sống trong nước"},{"label":"Cánh hoạt động","value":"Một đôi"},{"label":"Muỗi cái nhiều loài","value":"Có thể hút máu"},{"label":"Phòng tránh","value":"Giảm nước đọng"}]},{"id":"beetle","name":"Bọ cánh cứng","icon":"🪲","kicker":"CÔN TRÙNG QUANH BÉ","subtitle":"Cánh trước cứng như chiếc khiên","summary":"Bọ cánh cứng có đôi cánh trước biến đổi thành lớp cứng gọi là cánh cứng.","more":"Lớp cánh cứng bảo vệ đôi cánh bay mỏng và phần bụng. Nhóm bọ cánh cứng rất đa dạng về hình dạng và thức ăn.","remember":"Bọ rùa cũng là một loại bọ cánh cứng.","speech":"Bọ cánh cứng. Bọ cánh cứng có đôi cánh trước biến đổi thành lớp cứng gọi là cánh cứng. Lớp cánh cứng bảo vệ đôi cánh bay mỏng và phần bụng. Nhóm bọ cánh cứng rất đa dạng về hình dạng và thức ăn. Bọ rùa cũng là một loại bọ cánh cứng.","facts":[{"label":"Cánh trước","value":"Cứng, bảo vệ"},{"label":"Cánh bay","value":"Nằm phía dưới"},{"label":"Đa dạng","value":"Rất nhiều hình dạng"},{"label":"Ví dụ","value":"Bọ rùa"}]},{"id":"mantis","name":"Bọ ngựa","icon":"🦗","kicker":"CÔN TRÙNG QUANH BÉ","subtitle":"Đôi chân trước chuyên giữ con mồi","summary":"Bọ ngựa là côn trùng săn mồi có hai chân trước lớn, gập lại để chộp và giữ con mồi.","more":"Đầu bọ ngựa có thể xoay khá linh hoạt, giúp nó quan sát xung quanh.","remember":"Bọ ngựa thường săn các côn trùng khác.","speech":"Bọ ngựa. Bọ ngựa là côn trùng săn mồi có hai chân trước lớn, gập lại để chộp và giữ con mồi. Đầu bọ ngựa có thể xoay khá linh hoạt, giúp nó quan sát xung quanh. Bọ ngựa thường săn các côn trùng khác.","facts":[{"label":"Thức ăn","value":"Côn trùng khác"},{"label":"Chân trước","value":"Chuyên chộp mồi"},{"label":"Đầu","value":"Xoay linh hoạt"},{"label":"Kiểu sống","value":"Săn mồi"}]}],"quiz":[{"q":"Côn trùng trưởng thành điển hình có mấy phần cơ thể chính?","a":["Ba: đầu, ngực, bụng","Hai","Bốn","Sáu"],"c":0,"note":"Côn trùng có ba phần cơ thể chính: đầu, ngực và bụng."},{"q":"Côn trùng trưởng thành có bao nhiêu chân?","a":["6","8","4","10"],"c":0,"note":"Côn trùng có ba đôi chân, tổng cộng sáu chân."},{"q":"Nhện có phải côn trùng không?","a":["Không","Có","Chỉ nhện nhỏ","Chỉ nhện có mạng"],"c":0,"note":"Nhện có tám chân và thuộc nhóm khác."},{"q":"Côn trùng thường có bao nhiêu đôi râu?","a":["Một đôi","Hai đôi","Ba đôi","Không có"],"c":0,"note":"Côn trùng thường có một đôi râu."},{"q":"Có phải mọi côn trùng đều bay được không?","a":["Không","Có","Chỉ ban đêm","Chỉ khi trời nóng"],"c":0,"note":"Không phải mọi côn trùng đều có cánh hoặc bay được."},{"q":"Côn trùng có thể giúp cây bằng cách nào?","a":["Thụ phấn","Làm Mặt Trời sáng hơn","Tạo đá","Làm đất biến mất"],"c":0,"note":"Nhiều côn trùng giúp thụ phấn cho hoa."},{"q":"Khi gặp côn trùng lạ, bé nên làm gì?","a":["Không tự ý chạm vào","Bắt ngay bằng tay","Chọc tổ","Đưa sát mặt"],"c":0,"note":"Nên quan sát an toàn và hỏi người lớn."},{"q":"Phần đầu côn trùng thường có gì?","a":["Mắt, miệng và râu","Sáu chân","Tất cả cánh","Chùy đuôi"],"c":0,"note":"Đầu mang nhiều cơ quan cảm giác và miệng."},{"q":"Bướm trưởng thành dùng bộ phận nào để hút mật?","a":["Vòi hút","Chùy đuôi","Rễ","Móng chân"],"c":0,"note":"Bướm có vòi hút dài."},{"q":"Sáu chân của côn trùng gắn vào phần nào?","a":["Ngực","Đầu","Bụng","Râu"],"c":0,"note":"Ba đôi chân gắn ở ngực."},{"q":"Cánh của nhiều côn trùng gắn chủ yếu ở đâu?","a":["Ngực","Đầu","Bụng cuối","Râu"],"c":0,"note":"Cánh của nhiều loài gắn vào phần ngực."},{"q":"Phần bụng của côn trùng chứa gì?","a":["Nhiều cơ quan bên trong","Tất cả sáu chân","Hai đôi râu","Mỏ chim"],"c":0,"note":"Bụng chứa nhiều cơ quan tiêu hóa, bài tiết và sinh sản."},{"q":"Côn trùng có thở bằng phổi giống người không?","a":["Không","Có hoàn toàn giống","Chỉ ong có phổi","Chỉ bướm có phổi"],"c":0,"note":"Côn trùng dùng hệ thống ống khí."},{"q":"Ba đôi chân bằng tổng cộng bao nhiêu chân?","a":["6","3","8","12"],"c":0,"note":"Ba đôi là sáu chân."},{"q":"Chân sau của châu chấu thích nghi tốt cho việc gì?","a":["Nhảy","Bơi xa biển","Đào hang sâu như chuột","Bay không cần cánh"],"c":0,"note":"Châu chấu có chân sau dài và khỏe để nhảy."},{"q":"Râu côn trùng có vai trò gì?","a":["Cảm nhận mùi và tiếp xúc","Dùng để đi bộ","Dùng thay cánh","Chỉ để trang trí"],"c":0,"note":"Râu là cơ quan cảm giác."},{"q":"Biến thái hoàn toàn có giai đoạn nào mà biến thái không hoàn toàn không có?","a":["Nhộng","Trứng","Con trưởng thành","Con non"],"c":0,"note":"Biến thái hoàn toàn có giai đoạn nhộng."},{"q":"Bướm trải qua kiểu biến thái nào?","a":["Hoàn toàn","Không hoàn toàn","Không thay đổi","Chỉ thay màu"],"c":0,"note":"Bướm có trứng, sâu bướm, nhộng và trưởng thành."},{"q":"Châu chấu có giai đoạn nhộng không?","a":["Không","Có","Chỉ vào mùa đông","Chỉ con đực"],"c":0,"note":"Châu chấu biến thái không hoàn toàn nên không có nhộng."},{"q":"Ong mật sống như thế nào?","a":["Theo đàn","Luôn sống một mình","Dưới biển","Trong đá"],"c":0,"note":"Ong mật sống theo đàn có tổ chức."},{"q":"Ong mật lấy gì từ hoa?","a":["Mật hoa và phấn hoa","Cát","Đá","Nước biển"],"c":0,"note":"Ong thu mật hoa và phấn hoa."},{"q":"Ong mật giúp nhiều cây bằng việc gì?","a":["Thụ phấn","Làm rễ dài hơn","Làm trời mưa","Tạo tuyết"],"c":0,"note":"Ong là loài thụ phấn quan trọng."},{"q":"Ấu trùng của bướm thường gọi là gì?","a":["Sâu bướm","Nhộng trưởng thành","Kiến con","Muỗi con"],"c":0,"note":"Ấu trùng bướm là sâu bướm."},{"q":"Bướm trưởng thành thường có mấy đôi cánh?","a":["Hai đôi","Một đôi","Ba đôi","Không có"],"c":0,"note":"Bướm có hai đôi cánh."},{"q":"Kiến giao tiếp nhiều bằng gì?","a":["Pheromone hóa học","Ánh sáng laser","Tiếng hát lớn","Nước"],"c":0,"note":"Kiến dùng nhiều tín hiệu hóa học."},{"q":"Bọ rùa thuộc nhóm nào?","a":["Bọ cánh cứng","Bướm","Chuồn chuồn","Muỗi"],"c":0,"note":"Bọ rùa là một loại bọ cánh cứng."},{"q":"Nhiều bọ rùa ăn loài nào có thể gây hại cho cây?","a":["Rệp cây","Cá","Ếch","Chim"],"c":0,"note":"Nhiều loài bọ rùa ăn rệp."},{"q":"Số đốm trên bọ rùa có cho biết tuổi của nó không?","a":["Không","Có chính xác","Chỉ ở con đực","Chỉ mùa hè"],"c":0,"note":"Số đốm không phải cách xác định tuổi."},{"q":"Ấu trùng chuồn chuồn sống ở đâu?","a":["Dưới nước","Trên mây","Trong sa mạc khô","Trong tổ chim"],"c":0,"note":"Giai đoạn ấu trùng chuồn chuồn sống dưới nước."},{"q":"Chuồn chuồn trưởng thành ăn gì?","a":["Nhiều côn trùng khác","Chỉ cỏ","Chỉ hạt","Chỉ nước"],"c":0,"note":"Chuồn chuồn là loài săn mồi."},{"q":"Châu chấu có kiểu biến thái nào?","a":["Không hoàn toàn","Hoàn toàn có nhộng","Không lớn lên","Không có trứng"],"c":0,"note":"Châu chấu biến thái không hoàn toàn."},{"q":"Ấu trùng muỗi thường sống ở đâu?","a":["Trong nước","Trong lửa","Trên mây","Trong thân cây khô luôn"],"c":0,"note":"Ấu trùng muỗi sống trong nước."},{"q":"Cách nào giúp giảm nơi muỗi sinh sản quanh nhà?","a":["Giảm nước đọng","Để nhiều chậu nước hở","Tưới nước vào mọi vật rỗng","Không cần làm gì"],"c":0,"note":"Loại bỏ nước đọng giúp giảm nơi muỗi đẻ trứng."},{"q":"Đôi cánh trước cứng của bọ cánh cứng có tác dụng gì?","a":["Bảo vệ cánh bay và bụng","Dùng để hút mật","Dùng làm râu","Dùng để đào rễ cây luôn"],"c":0,"note":"Cánh trước cứng bảo vệ phần bên dưới."},{"q":"Bọ rùa có phải bọ cánh cứng không?","a":["Có","Không","Chỉ khi không có đốm","Chỉ khi màu đỏ"],"c":0,"note":"Bọ rùa thuộc bộ bọ cánh cứng."},{"q":"Bọ ngựa dùng chân trước lớn để làm gì?","a":["Chộp và giữ con mồi","Bơi","Đào đất như xẻng","Hút mật"],"c":0,"note":"Chân trước của bọ ngựa thích nghi để bắt mồi."},{"q":"Bọ ngựa thường ăn gì?","a":["Côn trùng khác","Chỉ lá cây","Chỉ hạt","Chỉ mật hoa"],"c":0,"note":"Bọ ngựa là loài săn mồi."},{"q":"Côn trùng nào trong bài có mắt kép rất lớn và ấu trùng sống dưới nước?","a":["Chuồn chuồn","Kiến","Bọ rùa","Bọ ngựa"],"c":0,"note":"Chuồn chuồn có mắt kép lớn và giai đoạn non dưới nước."},{"q":"Côn trùng nào trong bài có chân sau khỏe để nhảy?","a":["Châu chấu","Ong mật","Bướm","Muỗi"],"c":0,"note":"Châu chấu có chân sau thích nghi cho việc nhảy."},{"q":"Côn trùng nào trong bài sống theo đàn và có thể để lại đường mùi tìm thức ăn?","a":["Kiến","Bướm","Chuồn chuồn","Bọ ngựa"],"c":0,"note":"Kiến dùng pheromone để giao tiếp và định đường."}]});
  const SCENE_HTML = "<div class=\"gx-scene-bg\" style=\"background:linear-gradient(180deg,#BAE6FD 0%,#E0F2FE 42%,#DCFCE7 42%,#86EFAC 100%)\"><div style=\"position:absolute;left:8%;bottom:4%;font-size:95px\">🌻</div><div style=\"position:absolute;right:8%;bottom:5%;font-size:90px\">🌸</div><div style=\"position:absolute;left:38%;bottom:3%;font-size:86px\">🌿</div><button class=\"gx-hotspot\" type=\"button\" data-object=\"bee\" style=\"left:18%;top:18%;--gx-size:62px\" aria-label=\"Ong\">\n              <span class=\"gx-hotspot-icon\">🐝</span><small>Ong</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"butterfly\" style=\"left:58%;top:12%;--gx-size:72px\" aria-label=\"Bướm\">\n              <span class=\"gx-hotspot-icon\">🦋</span><small>Bướm</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"ladybug\" style=\"left:72%;top:55%;--gx-size:58px\" aria-label=\"Bọ rùa\">\n              <span class=\"gx-hotspot-icon\">🐞</span><small>Bọ rùa</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"dragonfly\" style=\"left:40%;top:38%;--gx-size:64px\" aria-label=\"Chuồn chuồn\">\n              <span class=\"gx-hotspot-icon\">🪰</span><small>Chuồn chuồn</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"grasshopper\" style=\"left:20%;top:60%;--gx-size:62px\" aria-label=\"Châu chấu\">\n              <span class=\"gx-hotspot-icon\">🦗</span><small>Châu chấu</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"ant\" style=\"left:50%;top:68%;--gx-size:54px\" aria-label=\"Kiến\">\n              <span class=\"gx-hotspot-icon\">🐜</span><small>Kiến</small>\n            </button></div>";

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
