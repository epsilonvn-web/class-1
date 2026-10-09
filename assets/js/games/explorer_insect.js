(() => {
  "use strict";

  /* =====================================================================
     Khám phá côn trùng — bản nâng cấp
     Giữ nguyên giao diện module: window.CLASS1_GAME_MODULES.insectExplorer
     = { render(context), destroy() }, context.host, context.hooks.setSubBanner
     ===================================================================== */

  const CONFIG = Object.freeze({
    moduleKey: "insectExplorer",
    styleId: "class1-game-insect-explorer-style-v2",
    fontId: "class1-game-explorer-font",
    rootId: "insect-explorer",
    title: "Khám phá côn trùng",
    subtitle: "Cùng Cô Thỏ Hồng quan sát thế giới nhỏ bé quanh mình",
    storageKey: "class1.insectExplorer.found.v1",
    roundSize: 10
  });

  const DATA = Object.freeze({"overview": {"id": "insect-overview", "name": "Thế giới côn trùng", "subtitle": "Những sinh vật nhỏ nhưng vô cùng đa dạng", "summary": "Côn trùng là nhóm động vật không xương sống rất đa dạng. Một côn trùng trưởng thành điển hình có ba phần cơ thể: đầu, ngực và bụng; đồng thời có sáu chân.", "more": "Nhiều côn trùng có cánh, nhưng không phải loài nào cũng bay. Chúng có thể thụ phấn cho hoa, phân hủy vật chất, làm thức ăn cho sinh vật khác hoặc đôi khi gây hại.", "remember": "Bé nhớ: nhện có tám chân nên không phải côn trùng. Khi gặp côn trùng lạ, không nên tự ý chạm vào.", "facts": [{"label": "Cơ thể", "value": "Đầu – ngực – bụng"}, {"label": "Số chân", "value": "6 chân ở con trưởng thành"}, {"label": "Râu", "value": "Thường có một đôi"}, {"label": "Cánh", "value": "Nhiều loài có, nhưng không phải tất cả"}, {"label": "Vai trò", "value": "Thụ phấn, phân hủy, làm thức ăn"}, {"label": "Không phải côn trùng", "value": "Nhện"}]}, "primary": [{"id": "head", "name": "Đầu", "subtitle": "Nơi có mắt, miệng và râu", "summary": "Phần đầu của côn trùng mang nhiều cơ quan cảm giác và bộ phận miệng.", "more": "Hình dạng miệng khác nhau tùy cách ăn: bướm có vòi hút, châu chấu có miệng nhai, muỗi có vòi chích hút.", "remember": "Đầu giúp côn trùng quan sát, ngửi, chạm và tìm thức ăn.", "facts": [{"label": "Có thể có", "value": "Mắt"}, {"label": "Có", "value": "Một đôi râu"}, {"label": "Miệng", "value": "Khác nhau theo cách ăn"}, {"label": "Vai trò", "value": "Cảm nhận môi trường"}]}, {"id": "thorax", "name": "Ngực", "subtitle": "Nơi gắn sáu chân và thường cả cánh", "summary": "Phần ngực của côn trùng gồm ba đốt và mang ba đôi chân.", "more": "Ở nhiều loài, cánh cũng gắn vào phần ngực. Các cơ lớn trong ngực giúp chân và cánh hoạt động.", "remember": "Muốn tìm sáu chân của côn trùng, hãy nhìn phần ngực.", "facts": [{"label": "Số đốt", "value": "3"}, {"label": "Chân", "value": "3 đôi = 6 chân"}, {"label": "Cánh", "value": "Thường gắn ở ngực"}, {"label": "Chức năng", "value": "Vận động"}]}, {"id": "abdomen", "name": "Bụng", "subtitle": "Nơi chứa nhiều cơ quan bên trong", "summary": "Phần bụng nằm sau ngực và chứa nhiều cơ quan tiêu hóa, bài tiết và sinh sản.", "more": "Dọc cơ thể nhiều côn trùng có các lỗ thở nhỏ gọi là lỗ thở, kết nối với hệ thống ống khí.", "remember": "Côn trùng không thở bằng phổi giống con người.", "facts": [{"label": "Vị trí", "value": "Sau phần ngực"}, {"label": "Chứa", "value": "Nhiều cơ quan bên trong"}, {"label": "Hô hấp", "value": "Qua hệ thống ống khí"}, {"label": "Lỗ thở", "value": "Các lỗ nhỏ trên cơ thể"}]}, {"id": "legs", "name": "Sáu chân", "subtitle": "Ba đôi chân gắn ở ngực", "summary": "Côn trùng trưởng thành có ba đôi chân, tổng cộng sáu chân.", "more": "Chân có thể thích nghi theo lối sống: châu chấu có chân sau khỏe để nhảy, bọ ngựa có chân trước để giữ mồi, bọ nước có chân thích hợp để bơi.", "remember": "Sáu chân là dấu hiệu rất quan trọng để nhận biết côn trùng.", "facts": [{"label": "Tổng số", "value": "6"}, {"label": "Số đôi", "value": "3 đôi"}, {"label": "Gắn ở", "value": "Ngực"}, {"label": "Có thể thích nghi", "value": "Nhảy, bơi, giữ mồi"}]}, {"id": "antennae", "name": "Râu", "subtitle": "Cơ quan cảm giác ở đầu", "summary": "Côn trùng thường có một đôi râu trên đầu.", "more": "Râu giúp cảm nhận mùi, rung động, tiếp xúc và nhiều tín hiệu khác trong môi trường. Hình dạng râu rất đa dạng giữa các loài.", "remember": "Râu không phải là chân; chúng là cơ quan cảm giác.", "facts": [{"label": "Số lượng", "value": "Một đôi"}, {"label": "Vị trí", "value": "Trên đầu"}, {"label": "Cảm nhận", "value": "Mùi và tiếp xúc"}, {"label": "Hình dạng", "value": "Rất đa dạng"}]}, {"id": "metamorphosis", "name": "Biến thái", "subtitle": "Cơ thể thay đổi qua các giai đoạn", "summary": "Nhiều côn trùng thay đổi hình dạng rất rõ khi lớn lên.", "more": "Bướm và bọ cánh cứng trải qua biến thái hoàn toàn: trứng → ấu trùng → nhộng → trưởng thành. Châu chấu trải qua biến thái không hoàn toàn: trứng → con non → trưởng thành.", "remember": "Không phải mọi côn trùng đều có giai đoạn nhộng.", "facts": [{"label": "Biến thái hoàn toàn", "value": "Có giai đoạn nhộng"}, {"label": "Ví dụ hoàn toàn", "value": "Bướm, bọ cánh cứng"}, {"label": "Không hoàn toàn", "value": "Không có nhộng"}, {"label": "Ví dụ", "value": "Châu chấu"}]}], "secondary": [{"id": "bee", "name": "Ong mật", "subtitle": "Loài thụ phấn sống theo đàn", "summary": "Ong mật sống trong đàn có tổ chức và thu mật hoa cùng phấn hoa từ hoa.", "more": "Khi ghé thăm hoa, ong có thể mang phấn từ hoa này sang hoa khác, giúp nhiều cây thụ phấn. Ong mật còn tạo mật để dự trữ thức ăn cho đàn.", "remember": "Quan sát ong từ khoảng cách an toàn và không chọc phá tổ ong.", "facts": [{"label": "Sống", "value": "Theo đàn"}, {"label": "Thu từ hoa", "value": "Mật hoa và phấn hoa"}, {"label": "Vai trò", "value": "Thụ phấn"}, {"label": "Sản phẩm", "value": "Mật ong"}]}, {"id": "butterfly", "name": "Bướm", "subtitle": "Cánh nhiều màu và vòi hút dài", "summary": "Bướm trưởng thành thường có hai đôi cánh phủ những vảy rất nhỏ.", "more": "Bướm dùng vòi hút dài để hút mật hoa. Vòng đời thường gồm trứng, sâu bướm, nhộng và bướm trưởng thành.", "remember": "Sâu bướm và bướm trưởng thành trông rất khác nhau vì biến thái hoàn toàn.", "facts": [{"label": "Cánh", "value": "Hai đôi"}, {"label": "Miệng", "value": "Vòi hút"}, {"label": "Ấu trùng", "value": "Sâu bướm"}, {"label": "Vòng đời", "value": "Có giai đoạn nhộng"}]}, {"id": "ant", "name": "Kiến", "subtitle": "Nhỏ bé nhưng làm việc theo đàn", "summary": "Kiến sống thành đàn với nhiều cá thể có nhiệm vụ khác nhau.", "more": "Kiến giao tiếp bằng hóa chất gọi là pheromone. Nhiều loài để lại đường mùi giúp các con khác tìm thức ăn.", "remember": "Không phải mọi con kiến đều có cánh; kiến sinh sản ở một số giai đoạn có thể có cánh.", "facts": [{"label": "Sống", "value": "Theo đàn"}, {"label": "Giao tiếp", "value": "Pheromone"}, {"label": "Tìm đường", "value": "Có thể theo đường mùi"}, {"label": "Cánh", "value": "Không phải cá thể nào cũng có"}]}, {"id": "ladybug", "name": "Bọ rùa", "subtitle": "Một loài bọ cánh cứng có ích", "summary": "Bọ rùa thuộc nhóm bọ cánh cứng. Nhiều loài có màu đỏ, cam hoặc vàng với các đốm.", "more": "Cả ấu trùng và trưởng thành của nhiều loài bọ rùa ăn rệp cây, vì vậy chúng có thể giúp bảo vệ cây.", "remember": "Số đốm không dùng để xác định tuổi của bọ rùa.", "facts": [{"label": "Nhóm", "value": "Bọ cánh cứng"}, {"label": "Màu", "value": "Thường đỏ, cam hoặc vàng"}, {"label": "Thức ăn nhiều loài", "value": "Rệp cây"}, {"label": "Điều sai", "value": "Số đốm không phải tuổi"}]}, {"id": "dragonfly", "name": "Chuồn chuồn", "subtitle": "Thợ săn bay nhanh gần ao hồ", "summary": "Chuồn chuồn trưởng thành có hai đôi cánh lớn và mắt kép rất phát triển.", "more": "Giai đoạn ấu trùng sống dưới nước và săn các sinh vật nhỏ. Khi trưởng thành, chuồn chuồn bắt nhiều côn trùng khác khi đang bay.", "remember": "Chuồn chuồn có vòng đời gắn cả với nước và không khí.", "facts": [{"label": "Cánh", "value": "Hai đôi"}, {"label": "Mắt", "value": "Mắt kép lớn"}, {"label": "Ấu trùng", "value": "Sống dưới nước"}, {"label": "Thức ăn", "value": "Săn côn trùng khác"}]}, {"id": "grasshopper", "name": "Châu chấu", "subtitle": "Đôi chân sau rất khỏe để nhảy", "summary": "Châu chấu có chân sau dài và khỏe, thích nghi tốt với việc nhảy.", "more": "Châu chấu có biến thái không hoàn toàn: con non trông giống bản nhỏ của trưởng thành nhưng chưa phát triển đầy đủ cánh và cơ quan sinh sản.", "remember": "Châu chấu không có giai đoạn nhộng.", "facts": [{"label": "Chân sau", "value": "Dài và khỏe"}, {"label": "Di chuyển", "value": "Nhảy tốt"}, {"label": "Biến thái", "value": "Không hoàn toàn"}, {"label": "Nhộng", "value": "Không có"}]}, {"id": "mosquito", "name": "Muỗi", "subtitle": "Vòng đời có giai đoạn sống trong nước", "summary": "Ấu trùng muỗi sống trong nước. Muỗi trưởng thành có một đôi cánh hoạt động.", "more": "Ở nhiều loài, muỗi cái hút máu để lấy chất dinh dưỡng cần cho việc tạo trứng, còn cả đực và cái đều có thể hút mật hoa.", "remember": "Tránh nước đọng quanh nhà giúp giảm nơi muỗi sinh sản.", "facts": [{"label": "Ấu trùng", "value": "Sống trong nước"}, {"label": "Cánh hoạt động", "value": "Một đôi"}, {"label": "Muỗi cái nhiều loài", "value": "Có thể hút máu"}, {"label": "Phòng tránh", "value": "Giảm nước đọng"}]}, {"id": "beetle", "name": "Bọ cánh cứng", "subtitle": "Cánh trước cứng như chiếc khiên", "summary": "Bọ cánh cứng có đôi cánh trước biến đổi thành lớp cứng gọi là cánh cứng.", "more": "Lớp cánh cứng bảo vệ đôi cánh bay mỏng và phần bụng. Nhóm bọ cánh cứng rất đa dạng về hình dạng và thức ăn.", "remember": "Bọ rùa cũng là một loại bọ cánh cứng.", "facts": [{"label": "Cánh trước", "value": "Cứng, bảo vệ"}, {"label": "Cánh bay", "value": "Nằm phía dưới"}, {"label": "Đa dạng", "value": "Rất nhiều hình dạng"}, {"label": "Ví dụ", "value": "Bọ rùa"}]}, {"id": "mantis", "name": "Bọ ngựa", "subtitle": "Đôi chân trước chuyên giữ con mồi", "summary": "Bọ ngựa là côn trùng săn mồi có hai chân trước lớn, gập lại để chộp và giữ con mồi.", "more": "Đầu bọ ngựa có thể xoay khá linh hoạt, giúp nó quan sát xung quanh.", "remember": "Bọ ngựa thường săn các côn trùng khác.", "facts": [{"label": "Thức ăn", "value": "Côn trùng khác"}, {"label": "Chân trước", "value": "Chuyên chộp mồi"}, {"label": "Đầu", "value": "Xoay linh hoạt"}, {"label": "Kiểu sống", "value": "Săn mồi"}]}], "quiz": [{"q": "Côn trùng trưởng thành điển hình có mấy phần cơ thể chính?", "a": ["Ba: đầu, ngực, bụng", "Hai", "Bốn", "Sáu"], "c": 0, "note": "Côn trùng có ba phần cơ thể chính: đầu, ngực và bụng."}, {"q": "Côn trùng trưởng thành có bao nhiêu chân?", "a": ["6", "8", "4", "10"], "c": 0, "note": "Côn trùng có ba đôi chân, tổng cộng sáu chân."}, {"q": "Nhện có phải côn trùng không?", "a": ["Không", "Có", "Chỉ nhện nhỏ", "Chỉ nhện có mạng"], "c": 0, "note": "Nhện có tám chân và thuộc nhóm khác."}, {"q": "Côn trùng thường có bao nhiêu đôi râu?", "a": ["Một đôi", "Hai đôi", "Ba đôi", "Không có"], "c": 0, "note": "Côn trùng thường có một đôi râu."}, {"q": "Có phải mọi côn trùng đều bay được không?", "a": ["Không", "Có", "Chỉ ban đêm", "Chỉ khi trời nóng"], "c": 0, "note": "Không phải mọi côn trùng đều có cánh hoặc bay được."}, {"q": "Côn trùng có thể giúp cây bằng cách nào?", "a": ["Thụ phấn", "Làm Mặt Trời sáng hơn", "Tạo đá", "Làm đất biến mất"], "c": 0, "note": "Nhiều côn trùng giúp thụ phấn cho hoa."}, {"q": "Khi gặp côn trùng lạ, bé nên làm gì?", "a": ["Không tự ý chạm vào", "Bắt ngay bằng tay", "Chọc tổ", "Đưa sát mặt"], "c": 0, "note": "Nên quan sát an toàn và hỏi người lớn."}, {"q": "Phần đầu côn trùng thường có gì?", "a": ["Mắt, miệng và râu", "Sáu chân", "Tất cả cánh", "Chùy đuôi"], "c": 0, "note": "Đầu mang nhiều cơ quan cảm giác và miệng."}, {"q": "Bướm trưởng thành dùng bộ phận nào để hút mật?", "a": ["Vòi hút", "Chùy đuôi", "Rễ", "Móng chân"], "c": 0, "note": "Bướm có vòi hút dài."}, {"q": "Sáu chân của côn trùng gắn vào phần nào?", "a": ["Ngực", "Đầu", "Bụng", "Râu"], "c": 0, "note": "Ba đôi chân gắn ở ngực."}, {"q": "Cánh của nhiều côn trùng gắn chủ yếu ở đâu?", "a": ["Ngực", "Đầu", "Bụng cuối", "Râu"], "c": 0, "note": "Cánh của nhiều loài gắn vào phần ngực."}, {"q": "Phần bụng của côn trùng chứa gì?", "a": ["Nhiều cơ quan bên trong", "Tất cả sáu chân", "Hai đôi râu", "Mỏ chim"], "c": 0, "note": "Bụng chứa nhiều cơ quan tiêu hóa, bài tiết và sinh sản."}, {"q": "Côn trùng có thở bằng phổi giống người không?", "a": ["Không", "Có hoàn toàn giống", "Chỉ ong có phổi", "Chỉ bướm có phổi"], "c": 0, "note": "Côn trùng dùng hệ thống ống khí."}, {"q": "Ba đôi chân bằng tổng cộng bao nhiêu chân?", "a": ["6", "3", "8", "12"], "c": 0, "note": "Ba đôi là sáu chân."}, {"q": "Chân sau của châu chấu thích nghi tốt cho việc gì?", "a": ["Nhảy", "Bơi xa biển", "Đào hang sâu như chuột", "Bay không cần cánh"], "c": 0, "note": "Châu chấu có chân sau dài và khỏe để nhảy."}, {"q": "Râu côn trùng có vai trò gì?", "a": ["Cảm nhận mùi và tiếp xúc", "Dùng để đi bộ", "Dùng thay cánh", "Chỉ để trang trí"], "c": 0, "note": "Râu là cơ quan cảm giác."}, {"q": "Biến thái hoàn toàn có giai đoạn nào mà biến thái không hoàn toàn không có?", "a": ["Nhộng", "Trứng", "Con trưởng thành", "Con non"], "c": 0, "note": "Biến thái hoàn toàn có giai đoạn nhộng."}, {"q": "Bướm trải qua kiểu biến thái nào?", "a": ["Hoàn toàn", "Không hoàn toàn", "Không thay đổi", "Chỉ thay màu"], "c": 0, "note": "Bướm có trứng, sâu bướm, nhộng và trưởng thành."}, {"q": "Châu chấu có giai đoạn nhộng không?", "a": ["Không", "Có", "Chỉ vào mùa đông", "Chỉ con đực"], "c": 0, "note": "Châu chấu biến thái không hoàn toàn nên không có nhộng."}, {"q": "Ong mật sống như thế nào?", "a": ["Theo đàn", "Luôn sống một mình", "Dưới biển", "Trong đá"], "c": 0, "note": "Ong mật sống theo đàn có tổ chức."}, {"q": "Ong mật lấy gì từ hoa?", "a": ["Mật hoa và phấn hoa", "Cát", "Đá", "Nước biển"], "c": 0, "note": "Ong thu mật hoa và phấn hoa."}, {"q": "Ong mật giúp nhiều cây bằng việc gì?", "a": ["Thụ phấn", "Làm rễ dài hơn", "Làm trời mưa", "Tạo tuyết"], "c": 0, "note": "Ong là loài thụ phấn quan trọng."}, {"q": "Ấu trùng của bướm thường gọi là gì?", "a": ["Sâu bướm", "Nhộng trưởng thành", "Kiến con", "Muỗi con"], "c": 0, "note": "Ấu trùng bướm là sâu bướm."}, {"q": "Bướm trưởng thành thường có mấy đôi cánh?", "a": ["Hai đôi", "Một đôi", "Ba đôi", "Không có"], "c": 0, "note": "Bướm có hai đôi cánh."}, {"q": "Kiến giao tiếp nhiều bằng gì?", "a": ["Pheromone hóa học", "Ánh sáng laser", "Tiếng hát lớn", "Nước"], "c": 0, "note": "Kiến dùng nhiều tín hiệu hóa học."}, {"q": "Bọ rùa thuộc nhóm nào?", "a": ["Bọ cánh cứng", "Bướm", "Chuồn chuồn", "Muỗi"], "c": 0, "note": "Bọ rùa là một loại bọ cánh cứng."}, {"q": "Nhiều bọ rùa ăn loài nào có thể gây hại cho cây?", "a": ["Rệp cây", "Cá", "Ếch", "Chim"], "c": 0, "note": "Nhiều loài bọ rùa ăn rệp."}, {"q": "Số đốm trên bọ rùa có cho biết tuổi của nó không?", "a": ["Không", "Có chính xác", "Chỉ ở con đực", "Chỉ mùa hè"], "c": 0, "note": "Số đốm không phải cách xác định tuổi."}, {"q": "Ấu trùng chuồn chuồn sống ở đâu?", "a": ["Dưới nước", "Trên mây", "Trong sa mạc khô", "Trong tổ chim"], "c": 0, "note": "Giai đoạn ấu trùng chuồn chuồn sống dưới nước."}, {"q": "Chuồn chuồn trưởng thành ăn gì?", "a": ["Nhiều côn trùng khác", "Chỉ cỏ", "Chỉ hạt", "Chỉ nước"], "c": 0, "note": "Chuồn chuồn là loài săn mồi."}, {"q": "Châu chấu có kiểu biến thái nào?", "a": ["Không hoàn toàn", "Hoàn toàn có nhộng", "Không lớn lên", "Không có trứng"], "c": 0, "note": "Châu chấu biến thái không hoàn toàn."}, {"q": "Ấu trùng muỗi thường sống ở đâu?", "a": ["Trong nước", "Trong lửa", "Trên mây", "Trong thân cây khô luôn"], "c": 0, "note": "Ấu trùng muỗi sống trong nước."}, {"q": "Cách nào giúp giảm nơi muỗi sinh sản quanh nhà?", "a": ["Giảm nước đọng", "Để nhiều chậu nước hở", "Tưới nước vào mọi vật rỗng", "Không cần làm gì"], "c": 0, "note": "Loại bỏ nước đọng giúp giảm nơi muỗi đẻ trứng."}, {"q": "Đôi cánh trước cứng của bọ cánh cứng có tác dụng gì?", "a": ["Bảo vệ cánh bay và bụng", "Dùng để hút mật", "Dùng làm râu", "Dùng để đào rễ cây luôn"], "c": 0, "note": "Cánh trước cứng bảo vệ phần bên dưới."}, {"q": "Bọ rùa có phải bọ cánh cứng không?", "a": ["Có", "Không", "Chỉ khi không có đốm", "Chỉ khi màu đỏ"], "c": 0, "note": "Bọ rùa thuộc bộ bọ cánh cứng."}, {"q": "Bọ ngựa dùng chân trước lớn để làm gì?", "a": ["Chộp và giữ con mồi", "Bơi", "Đào đất như xẻng", "Hút mật"], "c": 0, "note": "Chân trước của bọ ngựa thích nghi để bắt mồi."}, {"q": "Bọ ngựa thường ăn gì?", "a": ["Côn trùng khác", "Chỉ lá cây", "Chỉ hạt", "Chỉ mật hoa"], "c": 0, "note": "Bọ ngựa là loài săn mồi."}, {"q": "Côn trùng nào trong bài có mắt kép rất lớn và ấu trùng sống dưới nước?", "a": ["Chuồn chuồn", "Kiến", "Bọ rùa", "Bọ ngựa"], "c": 0, "note": "Chuồn chuồn có mắt kép lớn và giai đoạn non dưới nước."}, {"q": "Côn trùng nào trong bài có chân sau khỏe để nhảy?", "a": ["Châu chấu", "Ong mật", "Bướm", "Muỗi"], "c": 0, "note": "Châu chấu có chân sau thích nghi cho việc nhảy."}, {"q": "Côn trùng nào trong bài sống theo đàn và có thể để lại đường mùi tìm thức ăn?", "a": ["Kiến", "Bướm", "Chuồn chuồn", "Bọ ngựa"], "c": 0, "note": "Kiến dùng pheromone để giao tiếp và định đường."}]});

  /* ---------- Song ngữ Tiếng Việt / English ---------- */
  const I18N_EN = {"Hai": "Two", "Con non": "Nymph", "Chim": "Birds", "Thế giới côn trùng": "The World of Insects", "Những sinh vật nhỏ nhưng vô cùng đa dạng": "Small creatures with amazing variety", "Côn trùng là nhóm động vật không xương sống rất đa dạng. Một côn trùng trưởng thành điển hình có ba phần cơ thể: đầu, ngực và bụng; đồng thời có sáu chân.": "Insects are a very diverse group of animals without backbones. A typical adult insect has three body parts, the head, thorax and abdomen, and six legs.", "Nhiều côn trùng có cánh, nhưng không phải loài nào cũng bay. Chúng có thể thụ phấn cho hoa, phân hủy vật chất, làm thức ăn cho sinh vật khác hoặc đôi khi gây hại.": "Many insects have wings, but not all of them fly. They can pollinate flowers, break down dead material, become food for other creatures, or sometimes cause harm.", "Bé nhớ: nhện có tám chân nên không phải côn trùng. Khi gặp côn trùng lạ, không nên tự ý chạm vào.": "Remember: spiders have eight legs, so they are not insects. When you see an unfamiliar insect, don't touch it on your own.", "nhện có tám chân nên không phải côn trùng. Khi gặp côn trùng lạ, không nên tự ý chạm vào.": "Spiders have eight legs, so they are not insects. When you see an unfamiliar insect, don't touch it on your own.", "Cơ thể": "Body", "Đầu – ngực – bụng": "Head, thorax, abdomen", "Số chân": "Number of legs", "6 chân ở con trưởng thành": "6 legs in adults", "Râu": "Antennae", "Thường có một đôi": "Usually one pair", "Cánh": "Wings", "Nhiều loài có, nhưng không phải tất cả": "Many have them, but not all", "Vai trò": "Role", "Thụ phấn, phân hủy, làm thức ăn": "Pollinating, breaking things down, being food", "Không phải côn trùng": "Not an insect", "Nhện": "Spider", "Đầu": "Head", "Nơi có mắt, miệng và râu": "Where the eyes, mouth and antennae are", "Phần đầu của côn trùng mang nhiều cơ quan cảm giác và bộ phận miệng.": "An insect's head carries many sense organs and mouthparts.", "Hình dạng miệng khác nhau tùy cách ăn: bướm có vòi hút, châu chấu có miệng nhai, muỗi có vòi chích hút.": "The mouth is shaped differently depending on how the insect eats: butterflies have a sucking tube, grasshoppers have chewing mouths, mosquitoes have a piercing, sucking tube.", "Đầu giúp côn trùng quan sát, ngửi, chạm và tìm thức ăn.": "The head helps an insect look, smell, touch and find food.", "Có thể có": "Can have", "Mắt": "Eyes", "Có": "Yes", "Một đôi râu": "One pair of antennae", "Miệng": "Mouth", "Khác nhau theo cách ăn": "Different for each way of eating", "Cảm nhận môi trường": "Senses the surroundings", "Ngực": "Thorax", "Nơi gắn sáu chân và thường cả cánh": "Where the six legs and usually the wings attach", "Phần ngực của côn trùng gồm ba đốt và mang ba đôi chân.": "An insect's thorax has three segments and carries three pairs of legs.", "Ở nhiều loài, cánh cũng gắn vào phần ngực. Các cơ lớn trong ngực giúp chân và cánh hoạt động.": "In many insects, the wings also attach to the thorax. Big muscles inside the thorax move the legs and wings.", "Muốn tìm sáu chân của côn trùng, hãy nhìn phần ngực.": "To find an insect's six legs, look at the thorax.", "Số đốt": "Segments", "Chân": "Legs", "3 đôi = 6 chân": "3 pairs = 6 legs", "Thường gắn ở ngực": "Usually attached to the thorax", "Chức năng": "Function", "Vận động": "Movement", "Bụng": "Abdomen", "Nơi chứa nhiều cơ quan bên trong": "Where many inner organs are", "Phần bụng nằm sau ngực và chứa nhiều cơ quan tiêu hóa, bài tiết và sinh sản.": "The abdomen is behind the thorax and holds many organs for digestion, getting rid of waste and making babies.", "Dọc cơ thể nhiều côn trùng có các lỗ thở nhỏ gọi là lỗ thở, kết nối với hệ thống ống khí.": "Along the bodies of many insects are tiny breathing holes called spiracles, connected to a system of air tubes.", "Côn trùng không thở bằng phổi giống con người.": "Insects do not breathe with lungs like people do.", "Vị trí": "Position", "Sau phần ngực": "Behind the thorax", "Chứa": "Contains", "Nhiều cơ quan bên trong": "Many inner organs", "Hô hấp": "Breathing", "Qua hệ thống ống khí": "Through a system of air tubes", "Lỗ thở": "Spiracles", "Các lỗ nhỏ trên cơ thể": "Tiny holes on the body", "Sáu chân": "Six legs", "Ba đôi chân gắn ở ngực": "Three pairs of legs on the thorax", "Côn trùng trưởng thành có ba đôi chân, tổng cộng sáu chân.": "Adult insects have three pairs of legs, six legs in total.", "Chân có thể thích nghi theo lối sống: châu chấu có chân sau khỏe để nhảy, bọ ngựa có chân trước để giữ mồi, bọ nước có chân thích hợp để bơi.": "Legs can be adapted to how an insect lives: grasshoppers have strong back legs for jumping, mantises have front legs for holding prey, water beetles have legs for swimming.", "Sáu chân là dấu hiệu rất quan trọng để nhận biết côn trùng.": "Six legs are a very important clue for spotting an insect.", "Tổng số": "Total", "Số đôi": "Pairs", "3 đôi": "3 pairs", "Gắn ở": "Attached to", "Có thể thích nghi": "Can be adapted for", "Nhảy, bơi, giữ mồi": "Jumping, swimming, holding prey", "Cơ quan cảm giác ở đầu": "Sense organs on the head", "Côn trùng thường có một đôi râu trên đầu.": "Insects usually have one pair of antennae on their head.", "Râu giúp cảm nhận mùi, rung động, tiếp xúc và nhiều tín hiệu khác trong môi trường. Hình dạng râu rất đa dạng giữa các loài.": "Antennae help sense smells, vibrations, touch and many other signals around them. Antennae come in many different shapes.", "Râu không phải là chân; chúng là cơ quan cảm giác.": "Antennae are not legs; they are sense organs.", "Số lượng": "How many", "Một đôi": "One pair", "Trên đầu": "On the head", "Cảm nhận": "Senses", "Mùi và tiếp xúc": "Smell and touch", "Hình dạng": "Shape", "Rất đa dạng": "Very varied", "Biến thái": "Metamorphosis", "Cơ thể thay đổi qua các giai đoạn": "The body changes through stages", "Nhiều côn trùng thay đổi hình dạng rất rõ khi lớn lên.": "Many insects change shape a lot as they grow.", "Bướm và bọ cánh cứng trải qua biến thái hoàn toàn: trứng → ấu trùng → nhộng → trưởng thành. Châu chấu trải qua biến thái không hoàn toàn: trứng → con non → trưởng thành.": "Butterflies and beetles go through complete metamorphosis: egg → larva → pupa → adult. Grasshoppers go through incomplete metamorphosis: egg → nymph → adult.", "Không phải mọi côn trùng đều có giai đoạn nhộng.": "Not every insect has a pupa stage.", "Biến thái hoàn toàn": "Complete metamorphosis", "Có giai đoạn nhộng": "Has a pupa stage", "Ví dụ hoàn toàn": "Complete examples", "Bướm, bọ cánh cứng": "Butterflies, beetles", "Không hoàn toàn": "Incomplete", "Không có nhộng": "No pupa", "Ví dụ": "Example", "Châu chấu": "Grasshopper", "Ong mật": "Honeybee", "Loài thụ phấn sống theo đàn": "A pollinator that lives in a colony", "Ong mật sống trong đàn có tổ chức và thu mật hoa cùng phấn hoa từ hoa.": "Honeybees live in organized colonies and collect nectar and pollen from flowers.", "Khi ghé thăm hoa, ong có thể mang phấn từ hoa này sang hoa khác, giúp nhiều cây thụ phấn. Ong mật còn tạo mật để dự trữ thức ăn cho đàn.": "When bees visit flowers, they can carry pollen from one flower to another, helping many plants get pollinated. Honeybees also make honey to store food for the colony.", "Quan sát ong từ khoảng cách an toàn và không chọc phá tổ ong.": "Watch bees from a safe distance and never poke a beehive.", "Sống": "Lives", "Theo đàn": "In a colony", "Thu từ hoa": "Collects from flowers", "Mật hoa và phấn hoa": "Nectar and pollen", "Thụ phấn": "Pollination", "Sản phẩm": "Product", "Mật ong": "Honey", "Bướm": "Butterfly", "Cánh nhiều màu và vòi hút dài": "Colorful wings and a long sucking tube", "Bướm trưởng thành thường có hai đôi cánh phủ những vảy rất nhỏ.": "Adult butterflies usually have two pairs of wings covered in very tiny scales.", "Bướm dùng vòi hút dài để hút mật hoa. Vòng đời thường gồm trứng, sâu bướm, nhộng và bướm trưởng thành.": "Butterflies use a long sucking tube to drink nectar. Their life cycle usually has an egg, a caterpillar, a pupa and an adult butterfly.", "Sâu bướm và bướm trưởng thành trông rất khác nhau vì biến thái hoàn toàn.": "Caterpillars and adult butterflies look very different because of complete metamorphosis.", "Hai đôi": "Two pairs", "Vòi hút": "Sucking tube", "Ấu trùng": "Larva", "Sâu bướm": "Caterpillar", "Vòng đời": "Life cycle", "Kiến": "Ant", "Nhỏ bé nhưng làm việc theo đàn": "Tiny but works as a team", "Kiến sống thành đàn với nhiều cá thể có nhiệm vụ khác nhau.": "Ants live in colonies where different ants have different jobs.", "Kiến giao tiếp bằng hóa chất gọi là pheromone. Nhiều loài để lại đường mùi giúp các con khác tìm thức ăn.": "Ants communicate with chemicals called pheromones. Many kinds leave scent trails that help other ants find food.", "Không phải mọi con kiến đều có cánh; kiến sinh sản ở một số giai đoạn có thể có cánh.": "Not every ant has wings; ants that make babies may have wings at some stages.", "Giao tiếp": "Communication", "Tìm đường": "Finding the way", "Có thể theo đường mùi": "Can follow scent trails", "Không phải cá thể nào cũng có": "Not every ant has them", "Bọ rùa": "Ladybug", "Một loài bọ cánh cứng có ích": "A helpful beetle", "Bọ rùa thuộc nhóm bọ cánh cứng. Nhiều loài có màu đỏ, cam hoặc vàng với các đốm.": "Ladybugs belong to the beetle group. Many are red, orange or yellow with spots.", "Cả ấu trùng và trưởng thành của nhiều loài bọ rùa ăn rệp cây, vì vậy chúng có thể giúp bảo vệ cây.": "Both the larvae and adults of many ladybugs eat aphids, so they can help protect plants.", "Số đốm không dùng để xác định tuổi của bọ rùa.": "The number of spots does not tell a ladybug's age.", "Nhóm": "Group", "Bọ cánh cứng": "Beetles", "Màu": "Color", "Thường đỏ, cam hoặc vàng": "Usually red, orange or yellow", "Thức ăn nhiều loài": "Food for many kinds", "Rệp cây": "Aphids", "Điều sai": "Myth", "Số đốm không phải tuổi": "Spots do not show age", "Chuồn chuồn": "Dragonfly", "Thợ săn bay nhanh gần ao hồ": "A fast flying hunter near ponds", "Chuồn chuồn trưởng thành có hai đôi cánh lớn và mắt kép rất phát triển.": "Adult dragonflies have two pairs of big wings and very well-developed compound eyes.", "Giai đoạn ấu trùng sống dưới nước và săn các sinh vật nhỏ. Khi trưởng thành, chuồn chuồn bắt nhiều côn trùng khác khi đang bay.": "The young live underwater and hunt small creatures. As adults, dragonflies catch many other insects while flying.", "Chuồn chuồn có vòng đời gắn cả với nước và không khí.": "A dragonfly's life cycle involves both water and air.", "Mắt kép lớn": "Big compound eyes", "Sống dưới nước": "Lives underwater", "Thức ăn": "Food", "Săn côn trùng khác": "Hunts other insects", "Đôi chân sau rất khỏe để nhảy": "Very strong back legs for jumping", "Châu chấu có chân sau dài và khỏe, thích nghi tốt với việc nhảy.": "Grasshoppers have long, strong back legs that are great for jumping.", "Châu chấu có biến thái không hoàn toàn: con non trông giống bản nhỏ của trưởng thành nhưng chưa phát triển đầy đủ cánh và cơ quan sinh sản.": "Grasshoppers have incomplete metamorphosis: the young look like small adults but do not yet have full wings or body parts for making babies.", "Châu chấu không có giai đoạn nhộng.": "Grasshoppers have no pupa stage.", "Chân sau": "Back legs", "Dài và khỏe": "Long and strong", "Di chuyển": "Movement", "Nhảy tốt": "Good at jumping", "Nhộng": "Pupa", "Không có": "None", "Muỗi": "Mosquito", "Vòng đời có giai đoạn sống trong nước": "Its life cycle has a stage in water", "Ấu trùng muỗi sống trong nước. Muỗi trưởng thành có một đôi cánh hoạt động.": "Mosquito larvae live in water. Adult mosquitoes have one pair of working wings.", "Ở nhiều loài, muỗi cái hút máu để lấy chất dinh dưỡng cần cho việc tạo trứng, còn cả đực và cái đều có thể hút mật hoa.": "In many kinds, female mosquitoes drink blood to get nutrients for making eggs, while both males and females can drink nectar.", "Tránh nước đọng quanh nhà giúp giảm nơi muỗi sinh sản.": "Removing standing water around the house helps cut down places where mosquitoes breed.", "Sống trong nước": "Lives in water", "Cánh hoạt động": "Working wings", "Muỗi cái nhiều loài": "Females of many kinds", "Có thể hút máu": "May drink blood", "Phòng tránh": "Prevention", "Giảm nước đọng": "Remove standing water", "Cánh trước cứng như chiếc khiên": "Hard front wings like a shield", "Bọ cánh cứng có đôi cánh trước biến đổi thành lớp cứng gọi là cánh cứng.": "Beetles have front wings that have turned into a hard covering.", "Lớp cánh cứng bảo vệ đôi cánh bay mỏng và phần bụng. Nhóm bọ cánh cứng rất đa dạng về hình dạng và thức ăn.": "The hard covering protects the thin flying wings and the abdomen. Beetles come in a huge variety of shapes and foods.", "Bọ rùa cũng là một loại bọ cánh cứng.": "Ladybugs are also a kind of beetle.", "Cánh trước": "Front wings", "Cứng, bảo vệ": "Hard, protective", "Cánh bay": "Flying wings", "Nằm phía dưới": "Underneath", "Đa dạng": "Variety", "Rất nhiều hình dạng": "Many, many shapes", "Bọ ngựa": "Praying mantis", "Đôi chân trước chuyên giữ con mồi": "Front legs made for holding prey", "Bọ ngựa là côn trùng săn mồi có hai chân trước lớn, gập lại để chộp và giữ con mồi.": "The praying mantis is a hunting insect with two big front legs that fold to grab and hold prey.", "Đầu bọ ngựa có thể xoay khá linh hoạt, giúp nó quan sát xung quanh.": "A mantis can turn its head quite freely, which helps it watch what is around it.", "Bọ ngựa thường săn các côn trùng khác.": "Praying mantises usually hunt other insects.", "Côn trùng khác": "Other insects", "Chân trước": "Front legs", "Chuyên chộp mồi": "Made for grabbing prey", "Xoay linh hoạt": "Turns freely", "Kiểu sống": "Lifestyle", "Săn mồi": "Hunter", "Côn trùng trưởng thành điển hình có mấy phần cơ thể chính?": "How many main body parts does a typical adult insect have?", "Ba: đầu, ngực, bụng": "Three: head, thorax, abdomen", "Bốn": "Four", "Sáu": "Six", "Côn trùng có ba phần cơ thể chính: đầu, ngực và bụng.": "Insects have three main body parts: head, thorax and abdomen.", "Côn trùng trưởng thành có bao nhiêu chân?": "How many legs does an adult insect have?", "Côn trùng có ba đôi chân, tổng cộng sáu chân.": "Insects have three pairs of legs, six legs in total.", "Nhện có phải côn trùng không?": "Is a spider an insect?", "Không": "No", "Chỉ nhện nhỏ": "Only small spiders", "Chỉ nhện có mạng": "Only spiders with webs", "Nhện có tám chân và thuộc nhóm khác.": "Spiders have eight legs and belong to a different group.", "Côn trùng thường có bao nhiêu đôi râu?": "How many pairs of antennae do insects usually have?", "Ba đôi": "Three pairs", "Côn trùng thường có một đôi râu.": "Insects usually have one pair of antennae.", "Có phải mọi côn trùng đều bay được không?": "Can all insects fly?", "Chỉ ban đêm": "Only at night", "Chỉ khi trời nóng": "Only when it is hot", "Không phải mọi côn trùng đều có cánh hoặc bay được.": "Not every insect has wings or can fly.", "Côn trùng có thể giúp cây bằng cách nào?": "How can insects help plants?", "Làm Mặt Trời sáng hơn": "Make the Sun brighter", "Tạo đá": "Make rocks", "Làm đất biến mất": "Make soil disappear", "Nhiều côn trùng giúp thụ phấn cho hoa.": "Many insects help pollinate flowers.", "Khi gặp côn trùng lạ, bé nên làm gì?": "What should you do when you see an unfamiliar insect?", "Không tự ý chạm vào": "Don't touch it on your own", "Bắt ngay bằng tay": "Grab it with your hand", "Chọc tổ": "Poke its nest", "Đưa sát mặt": "Hold it close to your face", "Nên quan sát an toàn và hỏi người lớn.": "Watch it safely and ask a grown-up.", "Phần đầu côn trùng thường có gì?": "What is usually on an insect's head?", "Mắt, miệng và râu": "Eyes, mouth and antennae", "Tất cả cánh": "All the wings", "Chùy đuôi": "A tail club", "Đầu mang nhiều cơ quan cảm giác và miệng.": "The head has many sense organs and the mouth.", "Bướm trưởng thành dùng bộ phận nào để hút mật?": "Which body part does an adult butterfly use to drink nectar?", "Rễ": "Roots", "Móng chân": "Claws", "Bướm có vòi hút dài.": "Butterflies have a long sucking tube.", "Sáu chân của côn trùng gắn vào phần nào?": "Which part are an insect's six legs attached to?", "Ba đôi chân gắn ở ngực.": "The three pairs of legs are attached to the thorax.", "Cánh của nhiều côn trùng gắn chủ yếu ở đâu?": "Where are the wings of many insects mainly attached?", "Bụng cuối": "The end of the abdomen", "Cánh của nhiều loài gắn vào phần ngực.": "The wings of many insects attach to the thorax.", "Phần bụng của côn trùng chứa gì?": "What is inside an insect's abdomen?", "Tất cả sáu chân": "All six legs", "Hai đôi râu": "Two pairs of antennae", "Mỏ chim": "A bird's beak", "Bụng chứa nhiều cơ quan tiêu hóa, bài tiết và sinh sản.": "The abdomen holds many organs for digestion, waste and making babies.", "Côn trùng có thở bằng phổi giống người không?": "Do insects breathe with lungs like people?", "Có hoàn toàn giống": "Yes, exactly the same", "Chỉ ong có phổi": "Only bees have lungs", "Chỉ bướm có phổi": "Only butterflies have lungs", "Côn trùng dùng hệ thống ống khí.": "Insects use a system of air tubes.", "Ba đôi chân bằng tổng cộng bao nhiêu chân?": "Three pairs of legs make how many legs in total?", "Ba đôi là sáu chân.": "Three pairs make six legs.", "Chân sau của châu chấu thích nghi tốt cho việc gì?": "What are a grasshopper's back legs good for?", "Nhảy": "Jumping", "Bơi xa biển": "Swimming across the sea", "Đào hang sâu như chuột": "Digging deep holes like a mouse", "Bay không cần cánh": "Flying without wings", "Châu chấu có chân sau dài và khỏe để nhảy.": "Grasshoppers have long, strong back legs for jumping.", "Râu côn trùng có vai trò gì?": "What do an insect's antennae do?", "Cảm nhận mùi và tiếp xúc": "Sense smell and touch", "Dùng để đi bộ": "Used for walking", "Dùng thay cánh": "Used instead of wings", "Chỉ để trang trí": "Just for decoration", "Râu là cơ quan cảm giác.": "Antennae are sense organs.", "Biến thái hoàn toàn có giai đoạn nào mà biến thái không hoàn toàn không có?": "Which stage does complete metamorphosis have that incomplete metamorphosis does not?", "Trứng": "Egg", "Con trưởng thành": "Adult", "Biến thái hoàn toàn có giai đoạn nhộng.": "Complete metamorphosis has a pupa stage.", "Bướm trải qua kiểu biến thái nào?": "Which kind of metamorphosis do butterflies go through?", "Hoàn toàn": "Complete", "Không thay đổi": "No change", "Chỉ thay màu": "Only a color change", "Bướm có trứng, sâu bướm, nhộng và trưởng thành.": "Butterflies have an egg, a caterpillar, a pupa and an adult.", "Châu chấu có giai đoạn nhộng không?": "Do grasshoppers have a pupa stage?", "Chỉ vào mùa đông": "Only in winter", "Chỉ con đực": "Only males", "Châu chấu biến thái không hoàn toàn nên không có nhộng.": "Grasshoppers have incomplete metamorphosis, so there is no pupa.", "Ong mật sống như thế nào?": "How do honeybees live?", "Luôn sống một mình": "Always alone", "Dưới biển": "Under the sea", "Trong đá": "Inside rocks", "Ong mật sống theo đàn có tổ chức.": "Honeybees live in organized colonies.", "Ong mật lấy gì từ hoa?": "What do honeybees collect from flowers?", "Cát": "Sand", "Đá": "Rocks", "Nước biển": "Seawater", "Ong thu mật hoa và phấn hoa.": "Bees collect nectar and pollen.", "Ong mật giúp nhiều cây bằng việc gì?": "How do honeybees help many plants?", "Làm rễ dài hơn": "Make roots longer", "Làm trời mưa": "Make it rain", "Tạo tuyết": "Make snow", "Ong là loài thụ phấn quan trọng.": "Bees are important pollinators.", "Ấu trùng của bướm thường gọi là gì?": "What is a butterfly larva usually called?", "Nhộng trưởng thành": "Adult pupa", "Kiến con": "Baby ant", "Muỗi con": "Baby mosquito", "Ấu trùng bướm là sâu bướm.": "A butterfly larva is a caterpillar.", "Bướm trưởng thành thường có mấy đôi cánh?": "How many pairs of wings do adult butterflies usually have?", "Bướm có hai đôi cánh.": "Butterflies have two pairs of wings.", "Kiến giao tiếp nhiều bằng gì?": "What do ants mostly use to communicate?", "Pheromone hóa học": "Chemical pheromones", "Ánh sáng laser": "Laser light", "Tiếng hát lớn": "Loud singing", "Nước": "Water", "Kiến dùng nhiều tín hiệu hóa học.": "Ants use many chemical signals.", "Bọ rùa thuộc nhóm nào?": "Which group do ladybugs belong to?", "Bọ rùa là một loại bọ cánh cứng.": "The ladybug is a kind of beetle.", "Nhiều bọ rùa ăn loài nào có thể gây hại cho cây?": "Many ladybugs eat which creature that can harm plants?", "Cá": "Fish", "Ếch": "Frogs", "Nhiều loài bọ rùa ăn rệp.": "Many ladybugs eat aphids.", "Số đốm trên bọ rùa có cho biết tuổi của nó không?": "Does the number of spots tell a ladybug's age?", "Có chính xác": "Yes, exactly", "Chỉ ở con đực": "Only in males", "Chỉ mùa hè": "Only in summer", "Số đốm không phải cách xác định tuổi.": "The number of spots is not a way to tell age.", "Ấu trùng chuồn chuồn sống ở đâu?": "Where do dragonfly larvae live?", "Dưới nước": "Underwater", "Trên mây": "In the clouds", "Trong sa mạc khô": "In a dry desert", "Trong tổ chim": "In a bird's nest", "Giai đoạn ấu trùng chuồn chuồn sống dưới nước.": "The young stage of dragonflies lives underwater.", "Chuồn chuồn trưởng thành ăn gì?": "What do adult dragonflies eat?", "Nhiều côn trùng khác": "Many other insects", "Chỉ cỏ": "Only grass", "Chỉ hạt": "Only seeds", "Chỉ nước": "Only water", "Chuồn chuồn là loài săn mồi.": "Dragonflies are hunters.", "Châu chấu có kiểu biến thái nào?": "What kind of metamorphosis do grasshoppers have?", "Hoàn toàn có nhộng": "Complete, with a pupa", "Không lớn lên": "They do not grow", "Không có trứng": "They have no eggs", "Châu chấu biến thái không hoàn toàn.": "Grasshoppers have incomplete metamorphosis.", "Ấu trùng muỗi thường sống ở đâu?": "Where do mosquito larvae usually live?", "Trong nước": "In water", "Trong lửa": "In fire", "Trong thân cây khô luôn": "Always inside dry tree trunks", "Ấu trùng muỗi sống trong nước.": "Mosquito larvae live in water.", "Cách nào giúp giảm nơi muỗi sinh sản quanh nhà?": "How can we cut down places where mosquitoes breed around the house?", "Để nhiều chậu nước hở": "Leave lots of open water pots", "Tưới nước vào mọi vật rỗng": "Pour water into every hollow thing", "Không cần làm gì": "Do nothing", "Loại bỏ nước đọng giúp giảm nơi muỗi đẻ trứng.": "Removing standing water cuts down places where mosquitoes lay eggs.", "Đôi cánh trước cứng của bọ cánh cứng có tác dụng gì?": "What are a beetle's hard front wings for?", "Bảo vệ cánh bay và bụng": "Protecting the flying wings and abdomen", "Dùng để hút mật": "Drinking nectar", "Dùng làm râu": "Being antennae", "Dùng để đào rễ cây luôn": "Always digging up roots", "Cánh trước cứng bảo vệ phần bên dưới.": "The hard front wings protect the parts underneath.", "Bọ rùa có phải bọ cánh cứng không?": "Is a ladybug a beetle?", "Chỉ khi không có đốm": "Only when it has no spots", "Chỉ khi màu đỏ": "Only when it is red", "Bọ rùa thuộc bộ bọ cánh cứng.": "Ladybugs belong to the beetle group.", "Bọ ngựa dùng chân trước lớn để làm gì?": "What does a praying mantis use its big front legs for?", "Chộp và giữ con mồi": "Grabbing and holding prey", "Bơi": "Swimming", "Đào đất như xẻng": "Digging soil like a shovel", "Hút mật": "Drinking nectar", "Chân trước của bọ ngựa thích nghi để bắt mồi.": "A mantis's front legs are adapted for catching prey.", "Bọ ngựa thường ăn gì?": "What do praying mantises usually eat?", "Chỉ lá cây": "Only leaves", "Chỉ mật hoa": "Only nectar", "Bọ ngựa là loài săn mồi.": "Praying mantises are hunters.", "Côn trùng nào trong bài có mắt kép rất lớn và ấu trùng sống dưới nước?": "Which insect in this lesson has very big compound eyes and young that live underwater?", "Chuồn chuồn có mắt kép lớn và giai đoạn non dưới nước.": "Dragonflies have big compound eyes and a young stage underwater.", "Côn trùng nào trong bài có chân sau khỏe để nhảy?": "Which insect in this lesson has strong back legs for jumping?", "Châu chấu có chân sau thích nghi cho việc nhảy.": "Grasshoppers have back legs adapted for jumping.", "Côn trùng nào trong bài sống theo đàn và có thể để lại đường mùi tìm thức ăn?": "Which insect in this lesson lives in a colony and can leave scent trails to find food?", "Kiến dùng pheromone để giao tiếp và định đường.": "Ants use pheromones to communicate and find the way.", "Khám phá côn trùng": "Insect Explorer", "Cùng Cô Thỏ Hồng quan sát thế giới nhỏ bé quanh mình": "Look at the tiny world around us with Miss Pink Bunny", "Cấu tạo côn trùng": "Insect body parts", "1. Trứng": "1. Egg", "2. Sâu": "2. Caterpillar", "3. Nhộng": "3. Pupa", "4. Bướm": "4. Butterfly", "⏹ Dừng đọc": "⏹ Stop reading", "Nghe cô đọc": "Listen to Teacher", "Chưa phát được giọng đọc. Con nhờ bố mẹ hoặc thầy cô kiểm tra loa và mạng, rồi bấm lại nhé.": "I couldn't play the voice. Ask a parent or teacher to check the speaker and the internet, then tap again.", "Bé nhớ nhé:": "Remember:", "🔊 Nghe cô đọc": "🔊 Listen to Teacher", "Sổ khám phá": "Explorer's Log", "🔎 Côn trùng là gì?": "🔎 What is an insect?", "Khu vườn có 9 loài côn trùng. Chạm vào từng con để làm quen nhé!": "The garden has 9 kinds of insects. Tap each one to say hello!", "🔄 Vòng đời": "🔄 Life cycle", "Côn trùng có 3 phần: đầu, ngực, bụng. Chạm vào từng phần hoặc tên của nó nhé!": "Insects have 3 parts: head, thorax, abdomen. Tap each part or its name!", "✓ Đã xem": "✓ Seen", "câu đúng": "correct", "Cô tự đọc câu hỏi": "Teacher reads the questions", "Mẹo: bấm phím 1, 2, 3, 4 để chọn đáp án.": "Tip: press 1, 2, 3, 4 to choose an answer.", "Đổi câu hỏi khác": "Try other questions", "Tuyệt vời! Con là nhà côn trùng học nhí rồi!": "Amazing! You are a little insect scientist now!", "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé.": "Well done! Let's review the questions below.", "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.": "You tried hard! Let's review and play again.", "Con đúng": "You got", "câu": "questions", "Làm lại câu sai": "Retry wrong answers", "Chơi vòng mới": "Play a new round", "Đáp án đúng của các câu con chưa trả lời được:": "Correct answers to the questions you missed:", "Con chọn một đáp án nhé!": "Pick an answer!", "Chính xác!": "Correct!", "Chưa đúng rồi. Đáp án đúng là": "Not quite. The correct answer is", "Câu": "Question", "trên": "of", "Đọc câu hỏi": "Read the question", "🔊 Đọc câu hỏi": "🔊 Read the question", "Xem kết quả": "See results", "Câu tiếp theo": "Next question", "🏆 Con đã khám phá hết thế giới côn trùng rồi! Giỏi quá!": "🏆 You have explored the whole insect world! Great job!", "🐞 Đã ghi": "🐞 Added", "vào sổ khám phá (": "to your explorer's log (", "Khu vườn": "Garden", "Cấu tạo": "Body parts", "Côn trùng quanh bé": "Insects around us", "Hỏi đáp": "Quiz", "câu.": "questions.", "Các khu vực khám phá": "Exploration areas", "🌼 Khu vườn": "🌼 Garden", "🔎 Cấu tạo": "🔎 Body parts", "🐝 Côn trùng quanh bé": "🐝 Insects around us", "⭐ Hỏi đáp": "⭐ Quiz"};
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


  /* ---------- Hình vẽ côn trùng (khung 120 x 100) ---------- */
  const EYE = (x, y, r = 3.2) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x + r * 0.25}" cy="${y}" r="${r * 0.55}" fill="#111827"/>`;
  const BUG = {
    bee: () => `
      <ellipse cx="52" cy="30" rx="22" ry="13" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="2" opacity=".9" transform="rotate(-20 52 30)"/>
      <ellipse cx="70" cy="28" rx="16" ry="10" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="2" opacity=".9" transform="rotate(15 70 28)"/>
      <path d="M40 66 l-6 14 M56 70 l-2 16 M72 68 l4 14" stroke="#1F2937" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 54 L8 56 L22 60Z" fill="#1F2937"/>
      <ellipse cx="54" cy="56" rx="32" ry="20" fill="#FACC15" stroke="#1F2937" stroke-width="2.5"/>
      <path d="M40 38 Q36 56 40 74 M54 36 Q50 56 54 76 M68 38 Q64 56 68 74" stroke="#1F2937" stroke-width="7" fill="none"/>
      <circle cx="92" cy="52" r="15" fill="#1F2937"/>
      <path d="M96 40 Q100 24 108 20 M90 38 Q88 22 94 14" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      ${EYE(97, 50, 4)}`,
    butterfly: () => `
      <path d="M58 46 C40 10 10 10 12 34 C14 52 36 54 58 50Z" fill="#A855F7" stroke="#6B21A8" stroke-width="2.5"/>
      <path d="M62 46 C80 10 110 10 108 34 C106 52 84 54 62 50Z" fill="#A855F7" stroke="#6B21A8" stroke-width="2.5"/>
      <path d="M58 52 C36 54 22 70 30 84 C38 94 54 80 58 58Z" fill="#F472B6" stroke="#9D174D" stroke-width="2.5"/>
      <path d="M62 52 C84 54 98 70 90 84 C82 94 66 80 62 58Z" fill="#F472B6" stroke="#9D174D" stroke-width="2.5"/>
      <circle cx="32" cy="32" r="7" fill="#FDE68A"/><circle cx="88" cy="32" r="7" fill="#FDE68A"/><circle cx="40" cy="74" r="5" fill="#fff"/><circle cx="80" cy="74" r="5" fill="#fff"/>
      <rect x="56" y="34" width="8" height="48" rx="4" fill="#1F2937"/>
      <path d="M58 36 Q50 18 44 12 M62 36 Q70 18 76 12" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="12" r="3" fill="#1F2937"/><circle cx="76" cy="12" r="3" fill="#1F2937"/>`,
    ant: () => `
      <path d="M44 60 L30 84 M54 62 L52 88 M62 60 L74 86 M46 60 L24 70 M58 60 L66 74" stroke="#3F2A1D" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="24" cy="56" rx="20" ry="15" fill="#7C2D12"/>
      <ellipse cx="54" cy="54" rx="13" ry="9" fill="#9A3412"/>
      <circle cx="84" cy="48" r="13" fill="#7C2D12"/>
      <path d="M90 38 L96 22 L108 18 M84 36 L86 22 L96 12" stroke="#3F2A1D" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M94 58 l8 4" stroke="#3F2A1D" stroke-width="3" stroke-linecap="round"/>
      ${EYE(89, 45, 3.5)}`,
    ladybug: () => `
      <path d="M36 42 l-16 -8 M34 58 l-18 2 M38 74 l-16 10 M84 42 l16 -8 M86 58 l18 2 M82 74 l16 10" stroke="#1F2937" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M46 20 Q40 6 32 6 M74 20 Q80 6 88 6" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="60" cy="24" rx="17" ry="12" fill="#1F2937"/>
      <circle cx="52" cy="20" r="4" fill="#fff"/><circle cx="68" cy="20" r="4" fill="#fff"/>
      <ellipse cx="60" cy="60" rx="34" ry="34" fill="#EF4444" stroke="#991B1B" stroke-width="2.5"/>
      <path d="M60 28 V94" stroke="#1F2937" stroke-width="3"/>
      <circle cx="44" cy="46" r="7" fill="#1F2937"/><circle cx="76" cy="46" r="7" fill="#1F2937"/><circle cx="40" cy="70" r="6" fill="#1F2937"/><circle cx="80" cy="70" r="6" fill="#1F2937"/><circle cx="54" cy="84" r="4.5" fill="#1F2937"/><circle cx="66" cy="84" r="4.5" fill="#1F2937"/>
      <ellipse cx="46" cy="38" rx="8" ry="4" fill="#fff" opacity=".35" transform="rotate(-30 46 38)"/>`,
    dragonfly: () => `
      <ellipse cx="34" cy="36" rx="30" ry="9" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2" opacity=".9" transform="rotate(-12 34 36)"/>
      <ellipse cx="86" cy="36" rx="30" ry="9" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2" opacity=".9" transform="rotate(12 86 36)"/>
      <ellipse cx="34" cy="52" rx="28" ry="8" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2" opacity=".9" transform="rotate(10 34 52)"/>
      <ellipse cx="86" cy="52" rx="28" ry="8" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2" opacity=".9" transform="rotate(-10 86 52)"/>
      <rect x="56" y="44" width="8" height="54" rx="4" fill="#0EA5E9"/>
      <path d="M57 54 h6 M57 62 h6 M57 70 h6 M57 78 h6 M57 86 h6" stroke="#075985" stroke-width="2"/>
      <ellipse cx="60" cy="40" rx="9" ry="12" fill="#0284C7"/>
      <circle cx="52" cy="22" r="9" fill="#22C55E" stroke="#15803D" stroke-width="2"/><circle cx="68" cy="22" r="9" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
      <circle cx="50" cy="19" r="3" fill="#fff" opacity=".7"/><circle cx="66" cy="19" r="3" fill="#fff" opacity=".7"/>`,
    grasshopper: () => `
      <path d="M44 56 L30 40 L12 84 M50 60 L44 86" stroke="#4D7C0F" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 58 Q40 40 82 48 Q92 52 88 62 Q50 72 12 64Z" fill="#84CC16" stroke="#3F6212" stroke-width="2.5"/>
      <path d="M18 56 Q46 44 72 50" stroke="#3F6212" stroke-width="2" fill="none" opacity=".6"/>
      <path d="M70 62 L66 86 M78 60 L84 84" stroke="#3F6212" stroke-width="4" stroke-linecap="round"/>
      <path d="M40 54 Q38 40 50 30 Q60 26 58 40 L50 62Z" fill="#65A30D" stroke="#3F6212" stroke-width="2.5"/>
      <path d="M50 30 L46 46 L36 88" stroke="#3F6212" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="96" cy="50" rx="14" ry="12" fill="#84CC16" stroke="#3F6212" stroke-width="2.5"/>
      <path d="M100 40 Q108 14 118 6 M96 39 Q98 14 106 4" stroke="#3F6212" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      ${EYE(100, 46, 4)}`,
    mosquito: () => `
      <ellipse cx="52" cy="34" rx="26" ry="8" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2" opacity=".95" transform="rotate(-25 52 34)"/>
      <path d="M58 54 L44 70 L36 96 M64 56 L60 74 L62 98 M70 54 L82 70 L96 94 M60 52 L40 60 L20 80" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="38" cy="50" rx="24" ry="6" fill="#64748B" transform="rotate(-8 38 50)"/>
      <path d="M18 50 h40" stroke="#94A3B8" stroke-width="2" stroke-dasharray="3 5"/>
      <ellipse cx="66" cy="50" rx="10" ry="8" fill="#475569"/>
      <circle cx="80" cy="48" r="7" fill="#334155"/>
      <path d="M86 50 L112 62" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M82 42 q8 -10 16 -12 M80 42 q4 -12 10 -16" stroke="#334155" stroke-width="2" fill="none" stroke-linecap="round"/>
      ${EYE(82, 46, 2.6)}`,
    beetle: () => `
      <path d="M36 42 l-18 -10 M32 60 l-20 0 M36 78 l-16 14 M84 42 l18 -10 M88 60 l20 0 M84 78 l16 14" stroke="#1F2937" stroke-width="4" stroke-linecap="round"/>
      <path d="M50 14 Q44 2 36 4 M70 14 Q76 2 84 4" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="60" cy="20" rx="13" ry="9" fill="#1E293B"/>
      <path d="M40 30 Q60 22 80 30 L80 38 Q60 34 40 38Z" fill="#0F766E" stroke="#134E4A" stroke-width="2"/>
      <path d="M40 38 Q60 32 80 38 Q92 66 74 92 Q60 100 46 92 Q28 66 40 38Z" fill="#14B8A6" stroke="#134E4A" stroke-width="2.5"/>
      <path d="M60 36 V96" stroke="#134E4A" stroke-width="3"/>
      <path d="M48 46 Q44 64 50 84" stroke="#99F6E4" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>`,
    mantis: () => `
      <path d="M40 66 L30 90 M50 66 L58 92 M44 66 L20 82" stroke="#3F6212" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M6 64 Q20 52 50 58 Q58 62 52 68 Q24 74 6 64Z" fill="#86EFAC" stroke="#166534" stroke-width="2.5"/>
      <path d="M10 62 Q26 54 48 60" stroke="#166534" stroke-width="2" fill="none" opacity=".5"/>
      <path d="M50 62 Q64 50 78 34" stroke="#4ADE80" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M50 62 Q64 50 78 34" stroke="#166534" stroke-width="2" fill="none" stroke-linecap="round" opacity=".4"/>
      <path d="M74 40 L94 50 L84 62 M72 44 L90 56 L80 68" stroke="#22C55E" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M72 30 L94 22 L84 40Z" fill="#4ADE80" stroke="#166534" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M88 24 Q100 10 112 8 M84 24 Q90 8 98 2" stroke="#166534" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="91" cy="25" r="3.5" fill="#FDE047" stroke="#166534" stroke-width="1"/><circle cx="76" cy="29" r="3.5" fill="#FDE047" stroke="#166534" stroke-width="1"/>`
  };
  const BUG_BG = {
    bee: "#FEF9C3", butterfly: "#FAE8FF", ant: "#FFEDD5", ladybug: "#FEE2E2", dragonfly: "#E0F2FE",
    grasshopper: "#ECFCCB", mosquito: "#F1F5F9", beetle: "#CCFBF1", mantis: "#DCFCE7"
  };
  function bugSvg(id) {
    const draw = BUG[id];
    if (!draw) return "";
    return `<svg class="gx-bug-svg" viewBox="0 0 120 100" aria-hidden="true" focusable="false">${draw()}</svg>`;
  }

  /* ---------- Sơ đồ cấu tạo côn trùng (nhìn từ trên xuống) ---------- */
  const PART_IDS = ["antennae", "head", "thorax", "abdomen", "legs"];
  function insectBody(selected, dimOthers) {
    const op = (id) => (dimOthers && selected !== id ? ' opacity=".3"' : "");
    const cls = (id) => `gx-part ${selected === id ? "is-selected" : ""}`;
    const legs = [
      "M290 190 L240 170 L200 120", "M288 218 L230 222 L190 236", "M292 246 L246 290 L214 352",
      "M350 190 L400 170 L440 120", "M352 218 L410 222 L450 236", "M348 246 L394 290 L426 352"
    ].map((d) => `<path d="${d}" stroke="#7C2D12" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join("");
    return `
      <g class="${cls("legs")}" data-object="legs" role="button" tabindex="0" aria-label="Sáu chân"${op("legs")}>${legs}
        <path d="M200 120 l-12 -8 M190 236 l-14 2 M214 352 l-6 14 M440 120 l12 -8 M450 236 l14 2 M426 352 l6 14" stroke="#7C2D12" stroke-width="7" stroke-linecap="round"/></g>
      <g class="${cls("antennae")}" data-object="antennae" role="button" tabindex="0" aria-label="Râu"${op("antennae")}>
        <path d="M304 96 Q286 52 246 30" stroke="#3F2A1D" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M336 96 Q354 52 394 30" stroke="#3F2A1D" stroke-width="8" fill="none" stroke-linecap="round"/>
        <circle cx="246" cy="30" r="8" fill="#3F2A1D"/><circle cx="394" cy="30" r="8" fill="#3F2A1D"/></g>
      <g class="${cls("abdomen")}" data-object="abdomen" role="button" tabindex="0" aria-label="Bụng"${op("abdomen")}>
        <ellipse cx="320" cy="364" rx="64" ry="104" fill="#F59E0B" stroke="#B45309" stroke-width="4"/>
        <path d="M262 316 Q320 330 378 316 M258 352 Q320 368 382 352 M260 388 Q320 404 380 388 M270 424 Q320 438 370 424" stroke="#B45309" stroke-width="4" fill="none"/></g>
      <g class="${cls("thorax")}" data-object="thorax" role="button" tabindex="0" aria-label="Ngực"${op("thorax")}>
        <path d="M300 200 Q230 210 196 280 Q236 300 306 236Z M340 200 Q410 210 444 280 Q404 300 334 236Z" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="3" opacity=".85"/>
        <ellipse cx="320" cy="218" rx="40" ry="50" fill="#FB923C" stroke="#C2410C" stroke-width="4"/>
        <path d="M284 202 H356 M284 236 H356" stroke="#C2410C" stroke-width="3" opacity=".6"/></g>
      <g class="${cls("head")}" data-object="head" role="button" tabindex="0" aria-label="Đầu"${op("head")}>
        <circle cx="320" cy="128" r="40" fill="#FDBA74" stroke="#C2410C" stroke-width="4"/>
        <ellipse cx="298" cy="120" rx="12" ry="15" fill="#1F2937"/><ellipse cx="342" cy="120" rx="12" ry="15" fill="#1F2937"/>
        <circle cx="294" cy="114" r="4" fill="#fff"/><circle cx="338" cy="114" r="4" fill="#fff"/>
        <path d="M308 156 Q320 164 332 156" stroke="#7C2D12" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
  }
  /* Hình nhỏ cho bảng thông tin: bộ phận được chọn sáng, phần khác mờ */
  function partSvg(id) {
    return `<svg class="gx-bug-svg" viewBox="170 10 300 470" aria-hidden="true" focusable="false">${insectBody(id, true)}</svg>`;
  }
  function partsMapSvg(selected) {
    const sel = (id) => (selected === id ? "is-selected" : "");
    const tag = (id, label, ax, ay, side, ly) => {
      const left = side === "L";
      const bx = left ? -100 : 510, ex = left ? 130 : 510;
      return `<g class="gx-tag ${sel(id)}" data-object="${id}" role="button" tabindex="0" aria-label="${label}">
        <path d="M${ax} ${ay} L${ex} ${ly}" stroke="#5B216E" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
        <circle cx="${ax}" cy="${ay}" r="5" fill="#fff" stroke="#5B216E" stroke-width="2"/>
        <rect x="${bx}" y="${ly - 29}" width="230" height="58" rx="18"/><text x="${bx + 115}" y="${ly + 11}" text-anchor="middle">${label}</text></g>`;
    };
    return `<svg class="gx-map-svg" viewBox="-110 0 860 490" role="group" aria-label="Cấu tạo côn trùng">
      ${insectBody(selected, false)}
      ${tag("antennae", "Râu", 262, 40, "L", 50)}
      ${tag("head", "Đầu", 286, 140, "L", 160)}
      ${tag("legs", "Sáu chân", 214, 300, "L", 330)}
      ${tag("thorax", "Ngực", 352, 220, "R", 200)}
      ${tag("abdomen", "Bụng", 372, 380, "R", 380)}
    </svg>`;
  }

  /* ---------- Vòng đời bướm (biến thái hoàn toàn) ---------- */
  function lifeCycleSvg() {
    const arrow = (d) => `<path d="${d}" stroke="#8B5CF6" stroke-width="4" fill="none" stroke-linecap="round" marker-end="url(#gxArrow)"/>`;
    const label = (x, y, t) => `<text x="${x}" y="${y}" text-anchor="middle" class="gx-lc-text">${t}</text>`;
    return `<svg class="gx-bug-svg" viewBox="0 0 320 210" aria-hidden="true" focusable="false">
      <defs><marker id="gxArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#8B5CF6"/></marker></defs>
      <g transform="translate(118 8)"><path d="M4 40 Q42 0 80 34 Q42 56 4 40Z" fill="#86EFAC" stroke="#15803D" stroke-width="2"/>
        <circle cx="34" cy="30" r="5" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1.5"/><circle cx="44" cy="28" r="5" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1.5"/><circle cx="40" cy="38" r="5" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1.5"/></g>
      ${label(160, 70, "1. Trứng")}
      <g transform="translate(232 82)"><circle cx="10" cy="20" r="9" fill="#4ADE80"/><circle cx="24" cy="18" r="9" fill="#22C55E"/><circle cx="38" cy="20" r="9" fill="#4ADE80"/><circle cx="52" cy="18" r="9" fill="#22C55E"/><circle cx="66" cy="16" r="10" fill="#15803D"/><circle cx="69" cy="13" r="2.5" fill="#fff"/></g>
      ${label(270, 132, "2. Sâu")}
      <g transform="translate(140 132)"><path d="M20 0 V8" stroke="#78350F" stroke-width="3"/><path d="M20 8 C6 14 6 50 20 60 C34 50 34 14 20 8Z" fill="#A3E635" stroke="#4D7C0F" stroke-width="2"/><path d="M12 26 h16 M12 38 h16" stroke="#4D7C0F" stroke-width="1.5"/></g>
      ${label(160, 206, "3. Nhộng")}
      <g transform="translate(8 74) scale(.62)">${BUG.butterfly()}</g>
      ${label(46, 146, "4. Bướm")}
      ${arrow("M206 40 Q250 46 262 74")}${arrow("M250 140 Q226 176 190 180")}${arrow("M130 176 Q80 170 64 154")}${arrow("M48 76 Q60 40 112 32")}
    </svg>`;
  }


  /* ---------- Khu vườn ở tab đầu ----------
     x, y = vị trí trái / đáy (%), w = chiều rộng (% bức tranh). Hàng sau đặt trước. */
  const SPOTS = [
    { id: "bee", x: 16, y: 58, w: 15 },
    { id: "butterfly", x: 40, y: 62, w: 17 },
    { id: "mosquito", x: 82, y: 64, w: 13 },
    { id: "dragonfly", x: 64, y: 40, w: 20 },
    { id: "mantis", x: 2, y: 22, w: 22 },
    { id: "grasshopper", x: 28, y: 26, w: 20 },
    { id: "ladybug", x: 52, y: 22, w: 12 },
    { id: "ant", x: 30, y: 3, w: 14 },
    { id: "beetle", x: 64, y: 3, w: 13 }
  ];
  const flower = (x, y, s, petal, center) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V60" stroke="#4D7C0F" stroke-width="4"/><path d="M0 40 Q-18 30 -22 40 Q-10 46 0 40Z" fill="#65A30D"/>${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="0" cy="-12" rx="8" ry="13" fill="${petal}" transform="rotate(${a})"/>`).join("")}<circle r="8" fill="${center}"/></g>`;
  const SCENE_BG = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs><linearGradient id="gxSkyI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BAE6FD"/><stop offset="1" stop-color="#F0F9FF"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#gxSkyI)"/>
    <circle cx="360" cy="36" r="20" fill="#FDE68A"/>
    <g fill="#fff" opacity=".9"><ellipse cx="90" cy="34" rx="24" ry="8"/><ellipse cx="104" cy="28" rx="14" ry="8"/></g>
    <path d="M0 150 Q100 132 200 146 T400 140 V300 H0Z" fill="#BBF7D0"/>
    <path d="M0 176 Q200 162 400 176 V300 H0Z" fill="#86EFAC"/>
    <ellipse cx="320" cy="214" rx="90" ry="26" fill="#7DD3FC"/><ellipse cx="320" cy="214" rx="70" ry="16" fill="#BAE6FD" opacity=".6"/>
    <path d="M232 214 v-26 M240 216 v-34 M248 214 v-22" stroke="#4D7C0F" stroke-width="3" stroke-linecap="round"/>
    ${flower(30, 150, 1.1, "#FACC15", "#92400E")}${flower(150, 156, .9, "#F472B6", "#FDE68A")}${flower(196, 166, .7, "#C084FC", "#FDE68A")}${flower(386, 178, .9, "#FB7185", "#FDE68A")}
    <path d="M0 300 Q40 250 60 300 M90 300 Q110 256 140 300 M200 300 Q226 262 250 300" stroke="#4ADE80" stroke-width="6" fill="none"/></svg>`;

  /* ---------- Trạng thái ---------- */
  let controller = null;
  let root = null;
  let activeContext = null;
  let activeTab = "garden";
  let selectedId = DATA.overview.id;
  let quiz = null;
  let autoRead = true;
  let toastTimer = 0;
  let found = loadFound();

  const allItems = [DATA.overview, ...DATA.primary, ...DATA.secondary];
  const byId = (id) => allItems.find((item) => item.id === id) || DATA.overview;
  const isPart = (id) => DATA.primary.some((d) => d.id === id);
  const isBug = (id) => DATA.secondary.some((d) => d.id === id);
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
      ${R} .gx-tab[data-tab="bugs"][aria-selected="true"],${R} .gx-tab[data-tab="quiz"][aria-selected="true"]{background:var(--grad-alt)}
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
      ${R} .gx-hero.is-organ{overflow:hidden;padding:10px 0}
      ${R} .gx-hero.is-organ svg{height:100%;width:auto}
      ${R} .gx-hero.is-cycle{height:auto;padding:8px;background:linear-gradient(135deg,#FFF1F7,#E0F2FE)}
      ${R} .gx-hero.is-cycle svg{width:100%;max-width:380px;height:auto}
      ${R} .gx-lc-text{font:700 16px "Baloo 2","Nunito",system-ui,sans-serif;fill:#5B216E}
      ${R} .gx-scene .gx-scene-note{align-items:center;max-width:min(94%,620px);z-index:120}
      ${R} .gx-scene .gx-scene-note>span:nth-child(2){flex:1}
      ${R} .gx-spot .gx-bug-svg{width:100%;height:auto;display:block}
      ${R} .gx-spot.is-selected .gx-bug-svg{filter:drop-shadow(0 0 6px rgba(236,72,153,.8))}
      ${R} .gx-logo .gx-bug-svg{width:46px}
      ${R} .gx-mapcard{display:flex;flex-direction:column;padding:12px;gap:8px;background:linear-gradient(180deg,#FFFFFF,#F5F3FF)}
      ${R} .gx-scene-note.is-static{position:static;max-width:none;align-items:center}
      ${R} .gx-scene-note.is-static>span:nth-child(2){flex:1}
      ${R} .gx-whole{flex:0 0 auto;min-height:40px;padding:0 14px;border:2px solid var(--line);border-radius:12px;background:#fff;font-size:16px;font-weight:700;color:var(--jungle)}
      ${R} .gx-whole.is-selected{background:var(--grad-main);border-color:transparent;color:#fff}
      ${R} .gx-map-wrap{flex:1 1 auto;min-height:0;display:grid;place-items:center}
      ${R} .gx-map-svg{width:100%;height:100%;max-height:100%}
      ${R} .gx-part{cursor:pointer;outline:none;transform-box:fill-box;transform-origin:center}
      ${R} .gx-part:not(.gx-skin):hover,${R} .gx-part:not(.gx-skin):focus-visible{filter:drop-shadow(0 0 5px rgba(139,92,246,.7))}
      ${R} .gx-part.is-selected:not(.gx-skin){filter:drop-shadow(0 0 4px #EC4899) drop-shadow(0 0 8px rgba(236,72,153,.6))}
      ${R} .gx-skin.is-selected>path,${R} .gx-skin.is-selected>circle{stroke:#EC4899;stroke-width:5}
      ${R} .gx-part.is-pop{animation:gxPop .45s ease}
      @keyframes gxPop{0%,100%{transform:scale(1)}45%{transform:scale(1.12)}}
      ${R} .gx-tag{cursor:pointer;outline:none}
      ${R} .gx-tag rect{fill:#fff;stroke:#E9D5FF;stroke-width:3}
      ${R} .gx-tag:hover rect,${R} .gx-tag:focus-visible rect{stroke:#C4B5FD;stroke-width:3}
      ${R} .gx-tag.is-selected rect{fill:#FFF1F7;stroke:#EC4899;stroke-width:3}
      ${R} .gx-tag text{font:700 32px "Baloo 2","Nunito",system-ui,sans-serif;fill:#5B216E}
      ${R} .gx-tag text.sub{font:600 21px "Baloo 2","Nunito",system-ui,sans-serif;fill:#667085}
      ${R} .gx-part.is-back{opacity:.55}
      ${R} .gx-part.is-back path{stroke-dasharray:6 4}
      ${R} .gx-part.is-back:hover,${R} .gx-part.is-back:focus-visible,${R} .gx-part.is-back.is-selected{opacity:1}
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
        ${R} .gx-mapcard{height:auto}
        ${R} .gx-map-svg{height:auto}
        ${R} .gx-progress{flex:1}
        ${R} .gx-scene-note.is-static{flex-wrap:wrap}
        ${R} .gx-scene{height:min(128vw,520px)}
        ${R} .gx-scene .gx-scene-note{left:8px;right:auto;top:8px;padding:4px}
        ${R} .gx-scene .gx-scene-note>span{display:none}
        ${R} .gx-scene-note.is-static>span:nth-child(2){flex:1 1 calc(100% - 40px)}
        ${R} .gx-whole{margin-left:auto}
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
    if (BUG[obj.id]) return `<div class="gx-hero is-organ" style="background:${BUG_BG[obj.id]}">${bugSvg(obj.id)}</div>`;
    if (obj.id === "metamorphosis") return `<div class="gx-hero is-cycle">${lifeCycleSvg()}</div>`;
    if (PART_IDS.includes(obj.id)) return `<div class="gx-hero is-organ">${partSvg(obj.id)}</div>`;
    return `<div class="gx-hero is-organ" style="background:${BUG_BG.ladybug}">${bugSvg("ladybug")}</div>`;
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

  function mapCard(note, svg, extra = "") {
    return `<div class="gx-card gx-mapcard">
        <div class="gx-scene-note is-static"><span aria-hidden="true">🐰</span><span>${note}</span>${extra}</div>
        <div class="gx-map-wrap">${svg}</div>
      </div>`;
  }
  function gardenHtml() {
    const spots = SPOTS.map((s) => {
      const d = byId(s.id);
      const cls = `${found.has(s.id) ? "is-found" : ""} ${selectedId === s.id ? "is-selected" : ""}`;
      return `<button type="button" class="gx-spot ${cls}" data-object="${s.id}" style="left:${s.x}%;bottom:${s.y}%;width:${s.w}%;z-index:${100 - Math.round(s.y)}" aria-label="${d.name}">${bugSvg(s.id)}<span class="gx-chip">${d.name}</span></button>`;
    }).join("");
    const what = `<button type="button" class="gx-whole ${selectedId === DATA.overview.id ? "is-selected" : ""}" data-object="${DATA.overview.id}">🔎 Côn trùng là gì?</button>`;
    const note = `<div class="gx-scene-note"><span aria-hidden="true">🐰</span><span>Khu vườn có 9 loài côn trùng. Chạm vào từng con để làm quen nhé!</span>${what}</div>`;
    return `<div class="gx-split">
      <div class="gx-card gx-scene">${SCENE_BG}${note}${spots}</div>
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }
  function partsHtml() {
    if (!isPart(selectedId)) selectedId = DATA.primary[0].id;
    const cycle = `<button type="button" class="gx-whole ${selectedId === "metamorphosis" ? "is-selected" : ""}" data-object="metamorphosis">🔄 Vòng đời</button>`;
    return `<div class="gx-split">
      ${mapCard("Côn trùng có 3 phần: đầu, ngực, bụng. Chạm vào từng phần hoặc tên của nó nhé!", partsMapSvg(selectedId), cycle)}
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }

  function gridHtml(items) {
    if (!items.some((i) => i.id === selectedId)) selectedId = items[0].id;
    const cards = items.map((o) => {
      const tick = found.has(o.id) ? `<span class="gx-tick">✓ Đã xem</span>` : "";
      return `<button type="button" class="gx-item gx-land-item ${o.id === selectedId ? "is-selected" : ""}" data-object="${o.id}">${tick}<span class="gx-thumb" style="background:${BUG_BG[o.id]};padding:6px">${bugSvg(o.id)}</span><span class="gx-item-text"><strong>${o.name}</strong><small>${o.subtitle}</small></span></button>`;
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
      const msg = stars === 3 ? "Tuyệt vời! Con là nhà côn trùng học nhí rồi!" : stars === 2 ? "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé." : "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.";
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
  const EX_KIND = "insect";
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
    if (activeTab === "garden" && isPart(selectedId)) selectedId = DATA.overview.id;
    if (activeTab === "parts" && !isPart(selectedId)) selectedId = DATA.primary[0].id;
    if (activeTab === "bugs" && !isBug(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz") markFound(selectedId, true);
    let html = "";
    if (activeTab === "garden") html = gardenHtml();
    else if (activeTab === "parts") html = partsHtml();
    else if (activeTab === "bugs") html = gridHtml(DATA.secondary);
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
    if (n === total) toast("🏆 Con đã khám phá hết thế giới côn trùng rồi! Giỏi quá!");
    else toast(`🐞 Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { garden: "Khu vườn", parts: "Cấu tạo", bugs: "Côn trùng quanh bé", quiz: "Hỏi đáp" , experience: "Trải nghiệm để hiểu"};
  function setBanner() {
    const fn0 = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    const fn = typeof fn0 === "function" ? (o) => fn0({ ...o, items: ((o && o.items) || []).map((it) => ({ ...it, title: trText(it.title) })) }) : fn0;
    if (typeof fn !== "function") return;
    fn({ items: [{ level: 2, title: CONFIG.title, action: null }, { level: 3, title: (activeTab === "experience" ? exT("Trải nghiệm để hiểu", "Learn by doing") : TAB_LABELS[activeTab]), action: null }] });
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
    root.querySelectorAll(`.gx-part[data-object="${id}"]`).forEach((part) => {
      if (part.classList.contains("gx-skin")) return;
      part.classList.remove("is-pop"); void part.getBoundingClientRect(); part.classList.add("is-pop");
    });
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
      /* Các bộ phận trong hình SVG: Enter / Space để chọn */
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
    activeTab = "garden";
    selectedId = DATA.overview.id;
    quiz = null;
    found = loadFound();
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `
      <header class="gx-head">
        <div class="gx-logo" aria-hidden="true">${bugSvg("ladybug")}</div>
        <div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div>
        ${langHtml()}<div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="garden" type="button" aria-selected="true">🌼 Khu vườn</button>
        <button class="gx-tab" role="tab" data-tab="parts" type="button" aria-selected="false" tabindex="-1">🔎 Cấu tạo</button>
        <button class="gx-tab" role="tab" data-tab="bugs" type="button" aria-selected="false" tabindex="-1">🐝 Côn trùng quanh bé</button>
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
