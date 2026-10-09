(() => {
  "use strict";

  /* =====================================================================
     Khám phá cơ thể người — bản nâng cấp
     Giữ nguyên giao diện module: window.CLASS1_GAME_MODULES.humanBodyExplorer
     = { render(context), destroy() }, context.host, context.hooks.setSubBanner
     ===================================================================== */

  const CONFIG = Object.freeze({
    moduleKey: "humanBodyExplorer",
    styleId: "class1-game-human-body-explorer-style-v2",
    fontId: "class1-game-explorer-font",
    rootId: "human-body-explorer",
    gameNumber: 12,
    title: "Khám phá cơ thể người",
    subtitle: "Cùng Cô Thỏ Hồng tìm hiểu cơ thể tuyệt vời của chúng ta",
    storageKey: "class1.humanBodyExplorer.found.v1",
    roundSize: 10
  });

  const DATA = Object.freeze({"overview": {"id": "body-overview", "name": "Cơ thể của chúng ta", "subtitle": "Nhiều bộ phận cùng làm việc", "summary": "Cơ thể người gồm nhiều cơ quan và hệ cơ quan cùng phối hợp để chúng ta suy nghĩ, thở, vận động, tiêu hóa thức ăn, cảm nhận thế giới và lớn lên mỗi ngày.", "more": "Não nhận và xử lý thông tin; tim bơm máu; phổi trao đổi khí; hệ tiêu hóa xử lý thức ăn; thận giúp lọc máu; các giác quan giúp chúng ta nhìn, nghe, ngửi, nếm và cảm nhận sự chạm.", "remember": "Bé nhớ nhé: không có cơ quan nào làm việc một mình. Cơ thể khỏe mạnh là nhờ nhiều bộ phận phối hợp với nhau.", "facts": [{"label": "Điều khiển", "value": "Não và hệ thần kinh"}, {"label": "Bơm máu", "value": "Tim"}, {"label": "Trao đổi khí", "value": "Phổi"}, {"label": "Tiêu hóa", "value": "Dạ dày và ruột"}, {"label": "Lọc máu", "value": "Thận"}, {"label": "Cảm nhận", "value": "5 giác quan"}]}, "primary": [{"id": "brain", "name": "Não", "subtitle": "Trung tâm điều khiển", "summary": "Não nằm trong hộp sọ và là trung tâm rất quan trọng của hệ thần kinh.", "more": "Não giúp chúng ta suy nghĩ, ghi nhớ, học tập, cảm nhận và điều khiển nhiều hoạt động của cơ thể. Não nhận thông tin từ các giác quan rồi đưa ra phản ứng phù hợp.", "remember": "Não giúp suy nghĩ, ghi nhớ và điều khiển nhiều hoạt động.", "facts": [{"label": "Vị trí", "value": "Trong hộp sọ"}, {"label": "Vai trò", "value": "Xử lý thông tin và điều khiển"}, {"label": "Làm việc với", "value": "Các dây thần kinh và giác quan"}, {"label": "Giúp chúng ta", "value": "Suy nghĩ, học, nhớ, vận động"}]}, {"id": "heart", "name": "Tim", "subtitle": "Máy bơm của cơ thể", "summary": "Tim là một cơ quan bằng cơ, co bóp liên tục để đẩy máu đi khắp cơ thể.", "more": "Máu mang ôxy và chất dinh dưỡng tới các tế bào rồi mang nhiều chất thải đi khỏi chúng. Tim có bốn ngăn và hoạt động cả ngày lẫn đêm.", "remember": "Tim co bóp để bơm máu đi khắp cơ thể.", "facts": [{"label": "Vị trí", "value": "Trong lồng ngực, hơi lệch trái"}, {"label": "Vai trò", "value": "Bơm máu"}, {"label": "Số ngăn", "value": "4 ngăn"}, {"label": "Hoạt động", "value": "Co bóp liên tục"}]}, {"id": "lungs", "name": "Phổi", "subtitle": "Trao đổi khí", "summary": "Hai lá phổi nằm trong lồng ngực và làm việc cùng hệ hô hấp.", "more": "Khi hít vào, không khí đi vào phổi. Ôxy từ không khí đi vào máu, còn carbon dioxide từ máu được đưa ra ngoài khi chúng ta thở ra.", "remember": "Phổi giúp đưa ôxy vào cơ thể và thải carbon dioxide ra ngoài.", "facts": [{"label": "Vị trí", "value": "Trong lồng ngực"}, {"label": "Số lượng", "value": "2 lá phổi"}, {"label": "Vai trò", "value": "Trao đổi khí"}, {"label": "Khí cơ thể cần", "value": "Ôxy"}, {"label": "Khí thải ra", "value": "Carbon dioxide"}]}, {"id": "stomach", "name": "Dạ dày", "subtitle": "Túi trộn thức ăn", "summary": "Dạ dày là một cơ quan của hệ tiêu hóa, nhận thức ăn sau khi chúng ta nuốt.", "more": "Dạ dày co bóp và trộn thức ăn với dịch tiêu hóa, biến thức ăn thành hỗn hợp mềm hơn trước khi chuyển xuống ruột non.", "remember": "Dạ dày trộn và nghiền thức ăn bằng co bóp cùng dịch tiêu hóa.", "facts": [{"label": "Hệ", "value": "Tiêu hóa"}, {"label": "Nhận thức ăn từ", "value": "Thực quản"}, {"label": "Vai trò", "value": "Trộn, co bóp và tiêu hóa một phần"}, {"label": "Chuyển tiếp tới", "value": "Ruột non"}]}, {"id": "liver", "name": "Gan", "subtitle": "Nhà máy hóa học lớn", "summary": "Gan là một cơ quan lớn nằm ở phần trên bên phải của bụng.", "more": "Gan thực hiện rất nhiều nhiệm vụ: xử lý chất dinh dưỡng, dự trữ năng lượng, tạo mật giúp tiêu hóa chất béo và giúp cơ thể xử lý nhiều chất trong máu.", "remember": "Gan làm rất nhiều việc, trong đó có tạo mật và xử lý chất dinh dưỡng.", "facts": [{"label": "Vị trí", "value": "Phần trên bên phải bụng"}, {"label": "Vai trò", "value": "Xử lý chất dinh dưỡng"}, {"label": "Tạo", "value": "Mật"}, {"label": "Dự trữ", "value": "Một phần năng lượng và chất dinh dưỡng"}]}, {"id": "small-intestine", "name": "Ruột non", "subtitle": "Hấp thu phần lớn chất dinh dưỡng", "summary": "Ruột non là một ống dài cuộn nhiều vòng trong bụng.", "more": "Tại đây thức ăn tiếp tục được tiêu hóa và phần lớn chất dinh dưỡng được hấp thu qua thành ruột vào cơ thể.", "remember": "Ruột non là nơi hấp thu phần lớn chất dinh dưỡng từ thức ăn.", "facts": [{"label": "Hệ", "value": "Tiêu hóa"}, {"label": "Nằm sau", "value": "Dạ dày"}, {"label": "Vai trò chính", "value": "Tiêu hóa tiếp và hấp thu chất dinh dưỡng"}, {"label": "Hình dạng", "value": "Ống dài cuộn nhiều vòng"}]}, {"id": "large-intestine", "name": "Ruột già", "subtitle": "Hấp thu nước và tạo phân", "summary": "Ruột già nhận phần thức ăn còn lại sau ruột non.", "more": "Ruột già hấp thu thêm nước và một số chất, đồng thời biến phần còn lại thành phân để cơ thể đào thải ra ngoài.", "remember": "Ruột già hấp thu thêm nước từ phần thức ăn còn lại.", "facts": [{"label": "Hệ", "value": "Tiêu hóa"}, {"label": "Nằm sau", "value": "Ruột non"}, {"label": "Vai trò", "value": "Hấp thu thêm nước"}, {"label": "Kết quả", "value": "Tạo phân từ phần còn lại"}]}, {"id": "kidneys", "name": "Thận", "subtitle": "Bộ lọc của cơ thể", "summary": "Hai quả thận nằm ở phía sau bụng, mỗi bên cột sống một quả.", "more": "Thận lọc máu, loại bỏ nhiều chất thải và nước dư để tạo nước tiểu. Thận cũng giúp cân bằng nước và muối khoáng trong cơ thể.", "remember": "Có 2 quả thận; chúng lọc máu và tạo nước tiểu.", "facts": [{"label": "Số lượng", "value": "2"}, {"label": "Vị trí", "value": "Phía sau bụng, hai bên cột sống"}, {"label": "Vai trò", "value": "Lọc máu"}, {"label": "Tạo", "value": "Nước tiểu"}, {"label": "Giúp cân bằng", "value": "Nước và muối khoáng"}]}, {"id": "skin", "name": "Da", "subtitle": "Lớp bảo vệ lớn nhất", "summary": "Da bao phủ bên ngoài cơ thể và là cơ quan lớn nhất của con người.", "more": "Da giúp bảo vệ cơ thể khỏi môi trường, hạn chế mất nước, hỗ trợ điều hòa nhiệt độ và chứa nhiều thụ thể giúp ta cảm nhận nóng, lạnh, chạm và đau.", "remember": "Da vừa bảo vệ cơ thể vừa giúp chúng ta cảm nhận sự chạm và nhiệt độ.", "facts": [{"label": "Vị trí", "value": "Bao phủ toàn cơ thể"}, {"label": "Vai trò", "value": "Bảo vệ"}, {"label": "Điều hòa", "value": "Nhiệt độ"}, {"label": "Giác quan", "value": "Xúc giác"}, {"label": "Cảm nhận", "value": "Chạm, nóng, lạnh, đau"}]}], "secondary": [{"id": "eyes", "name": "Mắt", "subtitle": "Thị giác – nhìn", "summary": "Mắt nhận ánh sáng từ môi trường và gửi tín hiệu về não để tạo nên hình ảnh chúng ta nhìn thấy.", "more": "Đồng tử thay đổi kích thước để kiểm soát lượng ánh sáng đi vào. Võng mạc ở phía sau mắt chứa các tế bào nhạy sáng.", "remember": "Mắt giúp nhìn; não giúp xử lý tín hiệu để ta hiểu hình ảnh.", "facts": [{"label": "Giác quan", "value": "Thị giác"}, {"label": "Cảm nhận", "value": "Ánh sáng, màu sắc, hình dạng"}, {"label": "Gửi tín hiệu tới", "value": "Não"}, {"label": "Bộ phận điều chỉnh ánh sáng", "value": "Đồng tử"}]}, {"id": "ears", "name": "Tai", "subtitle": "Thính giác – nghe", "summary": "Tai thu nhận sóng âm trong không khí và biến chúng thành tín hiệu gửi tới não.", "more": "Tai trong còn giúp cơ thể giữ thăng bằng. Vì vậy tai không chỉ quan trọng với nghe mà còn hỗ trợ chúng ta đứng và di chuyển ổn định.", "remember": "Tai giúp nghe và tai trong còn tham gia giữ thăng bằng.", "facts": [{"label": "Giác quan", "value": "Thính giác"}, {"label": "Cảm nhận", "value": "Âm thanh"}, {"label": "Gửi tín hiệu tới", "value": "Não"}, {"label": "Tai trong", "value": "Giúp giữ thăng bằng"}]}, {"id": "nose", "name": "Mũi", "subtitle": "Khứu giác – ngửi", "summary": "Mũi chứa các tế bào có thể nhận biết nhiều phân tử mùi khác nhau trong không khí.", "more": "Khứu giác liên quan chặt chẽ với vị giác. Khi bị nghẹt mũi, thức ăn thường có cảm giác kém ngon hơn vì ta ngửi mùi kém.", "remember": "Mũi giúp ngửi và phối hợp với lưỡi để cảm nhận hương vị thức ăn.", "facts": [{"label": "Giác quan", "value": "Khứu giác"}, {"label": "Cảm nhận", "value": "Mùi"}, {"label": "Phối hợp nhiều với", "value": "Vị giác"}, {"label": "Tín hiệu gửi tới", "value": "Não"}]}, {"id": "tongue", "name": "Lưỡi", "subtitle": "Vị giác – nếm", "summary": "Lưỡi có nhiều nụ vị giác giúp nhận biết các vị cơ bản trong thức ăn.", "more": "Các vị cơ bản thường được nhắc tới gồm ngọt, chua, mặn, đắng và umami. Mùi từ mũi cũng góp phần rất lớn vào cảm giác hương vị.", "remember": "Lưỡi giúp nếm; mũi cũng góp phần làm nên hương vị khi ăn.", "facts": [{"label": "Giác quan", "value": "Vị giác"}, {"label": "Cảm nhận", "value": "Vị"}, {"label": "Vị cơ bản", "value": "Ngọt, chua, mặn, đắng, umami"}, {"label": "Phối hợp nhiều với", "value": "Mũi"}]}, {"id": "touch", "name": "Da – xúc giác", "subtitle": "Xúc giác – chạm", "summary": "Các thụ thể trong da giúp chúng ta cảm nhận sự chạm, áp lực, rung, nóng, lạnh và đau.", "more": "Nhờ xúc giác, chúng ta biết một vật mềm hay cứng, nóng hay lạnh và có thể phản ứng nhanh khi chạm phải vật gây đau.", "remember": "Da không chỉ bảo vệ mà còn là cơ quan quan trọng của xúc giác.", "facts": [{"label": "Giác quan", "value": "Xúc giác"}, {"label": "Cơ quan", "value": "Da"}, {"label": "Cảm nhận", "value": "Chạm, áp lực, rung, nóng, lạnh, đau"}, {"label": "Vai trò", "value": "Giúp phản ứng với môi trường"}]}], "quiz": [{"q": "Cơ quan nào giúp điều khiển nhiều hoạt động của cơ thể?", "a": ["Não", "Dạ dày", "Thận", "Gan"], "c": 0, "note": "Não là trung tâm quan trọng của hệ thần kinh."}, {"q": "Cơ quan nào bơm máu đi khắp cơ thể?", "a": ["Phổi", "Tim", "Ruột non", "Mũi"], "c": 1, "note": "Tim co bóp để bơm máu."}, {"q": "Cơ quan nào giúp trao đổi ôxy và carbon dioxide?", "a": ["Phổi", "Gan", "Dạ dày", "Da"], "c": 0, "note": "Phổi giúp trao đổi khí."}, {"q": "Hệ nào xử lý thức ăn?", "a": ["Hệ tiêu hóa", "Hệ Mặt Trời", "Hệ thống sông", "Hệ âm thanh"], "c": 0, "note": "Hệ tiêu hóa xử lý thức ăn."}, {"q": "Cơ quan nào lọc máu và tạo nước tiểu?", "a": ["Thận", "Mắt", "Tim", "Lưỡi"], "c": 0, "note": "Thận lọc máu và tạo nước tiểu."}, {"q": "Cơ quan lớn nhất của cơ thể là gì?", "a": ["Da", "Tim", "Não", "Dạ dày"], "c": 0, "note": "Da là cơ quan lớn nhất của cơ thể người."}, {"q": "Cơ thể hoạt động tốt nhờ điều gì?", "a": ["Nhiều cơ quan phối hợp với nhau", "Chỉ riêng tim", "Chỉ riêng não", "Chỉ riêng phổi"], "c": 0, "note": "Các cơ quan và hệ cơ quan phối hợp với nhau."}, {"q": "Não nằm ở đâu?", "a": ["Trong hộp sọ", "Trong bàn chân", "Trong dạ dày", "Ngoài cơ thể"], "c": 0, "note": "Não nằm trong hộp sọ."}, {"q": "Não giúp chúng ta làm gì?", "a": ["Suy nghĩ và ghi nhớ", "Lọc máu", "Nhai thức ăn", "Bơm máu"], "c": 0, "note": "Não giúp suy nghĩ, học tập và ghi nhớ."}, {"q": "Tim chủ yếu được cấu tạo bởi loại mô nào?", "a": ["Cơ", "Xương", "Tóc", "Men răng"], "c": 0, "note": "Tim là một cơ quan bằng cơ."}, {"q": "Tim có bao nhiêu ngăn?", "a": ["2", "3", "4", "8"], "c": 2, "note": "Tim người có 4 ngăn."}, {"q": "Con người có mấy lá phổi?", "a": ["1", "2", "3", "4"], "c": 1, "note": "Chúng ta có hai lá phổi."}, {"q": "Khí nào cơ thể lấy vào từ không khí?", "a": ["Ôxy", "Carbon dioxide", "Khói", "Hơi dầu"], "c": 0, "note": "Phổi giúp ôxy đi vào máu."}, {"q": "Dạ dày nhận thức ăn từ đâu?", "a": ["Thực quản", "Phổi", "Thận", "Tai"], "c": 0, "note": "Thức ăn đi qua thực quản tới dạ dày."}, {"q": "Dạ dày làm gì với thức ăn?", "a": ["Co bóp và trộn với dịch tiêu hóa", "Bơm máu", "Tạo âm thanh", "Nhìn màu sắc"], "c": 0, "note": "Dạ dày trộn thức ăn với dịch tiêu hóa."}, {"q": "Gan nằm chủ yếu ở đâu?", "a": ["Phần trên bên phải bụng", "Trong đầu", "Trong bàn tay", "Trong tai"], "c": 0, "note": "Gan nằm ở phần trên bên phải của bụng."}, {"q": "Gan tạo chất nào giúp tiêu hóa chất béo?", "a": ["Mật", "Nước mắt", "Mồ hôi", "Không khí"], "c": 0, "note": "Gan tạo mật."}, {"q": "Phần lớn chất dinh dưỡng được hấp thu ở đâu?", "a": ["Ruột non", "Tai", "Tim", "Da"], "c": 0, "note": "Ruột non hấp thu phần lớn chất dinh dưỡng."}, {"q": "Ruột non nằm sau cơ quan nào trong đường tiêu hóa?", "a": ["Dạ dày", "Phổi", "Mũi", "Não"], "c": 0, "note": "Thức ăn từ dạ dày đi xuống ruột non."}, {"q": "Ruột già hấp thu thêm gì?", "a": ["Nước", "Ánh sáng", "Âm thanh", "Không khí"], "c": 0, "note": "Ruột già hấp thu thêm nước."}, {"q": "Ruột già nằm sau phần nào của hệ tiêu hóa?", "a": ["Ruột non", "Não", "Tim", "Phổi"], "c": 0, "note": "Phần còn lại từ ruột non đi tới ruột già."}, {"q": "Con người thường có bao nhiêu quả thận?", "a": ["1", "2", "3", "4"], "c": 1, "note": "Thông thường có hai quả thận."}, {"q": "Thận giúp cân bằng gì trong cơ thể?", "a": ["Nước và muối khoáng", "Âm thanh", "Ánh sáng", "Màu tóc"], "c": 0, "note": "Thận giúp cân bằng nước và muối khoáng."}, {"q": "Da giúp bảo vệ điều gì?", "a": ["Cơ thể", "Mặt Trời", "Đại dương", "Mây"], "c": 0, "note": "Da là lớp bảo vệ bên ngoài cơ thể."}, {"q": "Da giúp cảm nhận điều gì?", "a": ["Chạm, nóng, lạnh", "Âm thanh từ xa", "Mùi bằng mũi", "Vị bằng lưỡi"], "c": 0, "note": "Da chứa các thụ thể xúc giác."}, {"q": "Mắt là cơ quan của giác quan nào?", "a": ["Thị giác", "Thính giác", "Khứu giác", "Vị giác"], "c": 0, "note": "Mắt là cơ quan của thị giác."}, {"q": "Mắt nhận loại tín hiệu nào từ môi trường?", "a": ["Ánh sáng", "Mùi", "Vị", "Nước tiểu"], "c": 0, "note": "Mắt nhận ánh sáng."}, {"q": "Tín hiệu từ mắt được gửi tới đâu để xử lý?", "a": ["Não", "Dạ dày", "Gan", "Thận"], "c": 0, "note": "Não xử lý tín hiệu từ mắt."}, {"q": "Tai là cơ quan của giác quan nào?", "a": ["Thính giác", "Thị giác", "Vị giác", "Khứu giác"], "c": 0, "note": "Tai là cơ quan của thính giác."}, {"q": "Tai nhận gì từ môi trường?", "a": ["Sóng âm", "Ánh sáng", "Vị", "Màu"], "c": 0, "note": "Tai thu nhận sóng âm."}, {"q": "Tai trong còn giúp cơ thể làm gì?", "a": ["Giữ thăng bằng", "Tiêu hóa", "Bơm máu", "Lọc máu"], "c": 0, "note": "Tai trong giúp giữ thăng bằng."}, {"q": "Mũi là cơ quan của giác quan nào?", "a": ["Khứu giác", "Thị giác", "Thính giác", "Xúc giác"], "c": 0, "note": "Mũi là cơ quan của khứu giác."}, {"q": "Mũi giúp ta cảm nhận gì?", "a": ["Mùi", "Ánh sáng", "Âm thanh", "Nhiệt độ cơ thể"], "c": 0, "note": "Mũi giúp nhận biết mùi."}, {"q": "Khứu giác phối hợp mạnh với giác quan nào khi ăn?", "a": ["Vị giác", "Thị giác", "Thính giác", "Xúc giác chân"], "c": 0, "note": "Mùi và vị cùng góp phần tạo cảm giác hương vị."}, {"q": "Lưỡi là cơ quan chính của giác quan nào?", "a": ["Vị giác", "Thính giác", "Thị giác", "Khứu giác"], "c": 0, "note": "Lưỡi có các nụ vị giác."}, {"q": "Vị nào sau đây là một vị cơ bản?", "a": ["Ngọt", "Ồn", "Sáng", "Mềm"], "c": 0, "note": "Ngọt là một vị cơ bản."}, {"q": "Mùi từ mũi có ảnh hưởng tới cảm giác hương vị không?", "a": ["Có", "Không bao giờ", "Chỉ khi ngủ", "Chỉ dưới nước"], "c": 0, "note": "Khứu giác đóng vai trò lớn trong cảm nhận hương vị."}, {"q": "Cơ quan chính của xúc giác là gì?", "a": ["Da", "Tim", "Gan", "Phổi"], "c": 0, "note": "Da là cơ quan quan trọng của xúc giác."}, {"q": "Xúc giác giúp cảm nhận điều nào?", "a": ["Chạm và nhiệt độ", "Chỉ màu sắc", "Chỉ âm thanh", "Chỉ mùi"], "c": 0, "note": "Xúc giác cảm nhận chạm, áp lực, nóng, lạnh và đau."}, {"q": "Cảm giác đau có ích ở điểm nào?", "a": ["Cảnh báo cơ thể về nguy cơ tổn thương", "Giúp nhìn rõ hơn", "Giúp nghe to hơn", "Tạo nước tiểu"], "c": 0, "note": "Đau là một tín hiệu giúp cơ thể nhận biết nguy cơ tổn thương."}]});

  /* ---------- Song ngữ Tiếng Việt / English ---------- */
  const I18N_EN = {"Tim": "Heart", "Gan": "Liver", "Da": "Skin", "Tai": "Ears", "Tai trong": "Inner ear", "Trong tai": "In the ear", "Cơ thể của chúng ta": "Our Body", "Nhiều bộ phận cùng làm việc": "Many parts working together", "Cơ thể người gồm nhiều cơ quan và hệ cơ quan cùng phối hợp để chúng ta suy nghĩ, thở, vận động, tiêu hóa thức ăn, cảm nhận thế giới và lớn lên mỗi ngày.": "The human body has many organs and organ systems that work together so we can think, breathe, move, digest food, sense the world and grow every day.", "Não nhận và xử lý thông tin; tim bơm máu; phổi trao đổi khí; hệ tiêu hóa xử lý thức ăn; thận giúp lọc máu; các giác quan giúp chúng ta nhìn, nghe, ngửi, nếm và cảm nhận sự chạm.": "The brain receives and handles information; the heart pumps blood; the lungs swap gases; the digestive system breaks down food; the kidneys clean the blood; and our senses help us see, hear, smell, taste and feel touch.", "Bé nhớ nhé: không có cơ quan nào làm việc một mình. Cơ thể khỏe mạnh là nhờ nhiều bộ phận phối hợp với nhau.": "Remember: no organ works alone. A healthy body comes from many parts working together.", "không có cơ quan nào làm việc một mình. Cơ thể khỏe mạnh là nhờ nhiều bộ phận phối hợp với nhau.": "No organ works alone. A healthy body comes from many parts working together.", "Điều khiển": "Control", "Não và hệ thần kinh": "Brain and nervous system", "Bơm máu": "Pumps blood", "Trao đổi khí": "Gas exchange", "Phổi": "Lungs", "Tiêu hóa": "Digestion", "Dạ dày và ruột": "Stomach and intestines", "Lọc máu": "Cleans blood", "Thận": "Kidneys", "Cảm nhận": "Sensing", "5 giác quan": "5 senses", "Não": "Brain", "Trung tâm điều khiển": "The control center", "Não nằm trong hộp sọ và là trung tâm rất quan trọng của hệ thần kinh.": "The brain sits inside the skull and is a very important center of the nervous system.", "Não giúp chúng ta suy nghĩ, ghi nhớ, học tập, cảm nhận và điều khiển nhiều hoạt động của cơ thể. Não nhận thông tin từ các giác quan rồi đưa ra phản ứng phù hợp.": "The brain helps us think, remember, learn, feel and control many things the body does. It receives information from the senses and decides how to respond.", "Não giúp suy nghĩ, ghi nhớ và điều khiển nhiều hoạt động.": "The brain helps us think, remember and control many activities.", "Vị trí": "Location", "Trong hộp sọ": "Inside the skull", "Vai trò": "Role", "Xử lý thông tin và điều khiển": "Handles information and gives commands", "Làm việc với": "Works with", "Các dây thần kinh và giác quan": "Nerves and senses", "Giúp chúng ta": "Helps us", "Suy nghĩ, học, nhớ, vận động": "Think, learn, remember, move", "Máy bơm của cơ thể": "The body's pump", "Tim là một cơ quan bằng cơ, co bóp liên tục để đẩy máu đi khắp cơ thể.": "The heart is a muscle that squeezes again and again to push blood all around the body.", "Máu mang ôxy và chất dinh dưỡng tới các tế bào rồi mang nhiều chất thải đi khỏi chúng. Tim có bốn ngăn và hoạt động cả ngày lẫn đêm.": "Blood carries oxygen and nutrients to the cells and takes many wastes away. The heart has four chambers and works day and night.", "Tim co bóp để bơm máu đi khắp cơ thể.": "The heart squeezes to pump blood all around the body.", "Trong lồng ngực, hơi lệch trái": "In the chest, slightly to the left", "Số ngăn": "Chambers", "4 ngăn": "4 chambers", "Hoạt động": "Activity", "Co bóp liên tục": "Squeezes nonstop", "Hai lá phổi nằm trong lồng ngực và làm việc cùng hệ hô hấp.": "The two lungs are in the chest and work with the breathing system.", "Khi hít vào, không khí đi vào phổi. Ôxy từ không khí đi vào máu, còn carbon dioxide từ máu được đưa ra ngoài khi chúng ta thở ra.": "When we breathe in, air goes into the lungs. Oxygen from the air goes into the blood, and carbon dioxide from the blood leaves when we breathe out.", "Phổi giúp đưa ôxy vào cơ thể và thải carbon dioxide ra ngoài.": "The lungs bring oxygen into the body and send carbon dioxide out.", "Trong lồng ngực": "In the chest", "Số lượng": "How many", "2 lá phổi": "2 lungs", "Khí cơ thể cần": "Gas the body needs", "Ôxy": "Oxygen", "Khí thải ra": "Gas breathed out", "Dạ dày": "Stomach", "Túi trộn thức ăn": "The food mixer", "Dạ dày là một cơ quan của hệ tiêu hóa, nhận thức ăn sau khi chúng ta nuốt.": "The stomach is an organ of the digestive system that receives food after we swallow.", "Dạ dày co bóp và trộn thức ăn với dịch tiêu hóa, biến thức ăn thành hỗn hợp mềm hơn trước khi chuyển xuống ruột non.": "The stomach squeezes and mixes food with digestive juices, turning it into a softer mixture before it moves into the small intestine.", "Dạ dày trộn và nghiền thức ăn bằng co bóp cùng dịch tiêu hóa.": "The stomach mixes and mashes food by squeezing and with digestive juices.", "Hệ": "System", "Nhận thức ăn từ": "Gets food from", "Thực quản": "Esophagus", "Trộn, co bóp và tiêu hóa một phần": "Mixes, squeezes and partly digests", "Chuyển tiếp tới": "Passes food to", "Ruột non": "Small intestine", "Nhà máy hóa học lớn": "A big chemical factory", "Gan là một cơ quan lớn nằm ở phần trên bên phải của bụng.": "The liver is a large organ in the upper right part of the belly.", "Gan thực hiện rất nhiều nhiệm vụ: xử lý chất dinh dưỡng, dự trữ năng lượng, tạo mật giúp tiêu hóa chất béo và giúp cơ thể xử lý nhiều chất trong máu.": "The liver has many jobs: it processes nutrients, stores energy, makes bile to help digest fats and helps the body deal with many substances in the blood.", "Gan làm rất nhiều việc, trong đó có tạo mật và xử lý chất dinh dưỡng.": "The liver does many jobs, including making bile and processing nutrients.", "Phần trên bên phải bụng": "Upper right part of the belly", "Xử lý chất dinh dưỡng": "Processes nutrients", "Tạo": "Makes", "Mật": "Bile", "Dự trữ": "Stores", "Một phần năng lượng và chất dinh dưỡng": "Some energy and nutrients", "Hấp thu phần lớn chất dinh dưỡng": "Absorbs most nutrients", "Ruột non là một ống dài cuộn nhiều vòng trong bụng.": "The small intestine is a long tube coiled up many times in the belly.", "Tại đây thức ăn tiếp tục được tiêu hóa và phần lớn chất dinh dưỡng được hấp thu qua thành ruột vào cơ thể.": "Here food keeps being digested, and most nutrients pass through the intestine wall into the body.", "Ruột non là nơi hấp thu phần lớn chất dinh dưỡng từ thức ăn.": "The small intestine is where most nutrients from food are absorbed.", "Nằm sau": "Comes after", "Vai trò chính": "Main role", "Tiêu hóa tiếp và hấp thu chất dinh dưỡng": "Keeps digesting and absorbs nutrients", "Hình dạng": "Shape", "Ống dài cuộn nhiều vòng": "A long, coiled tube", "Ruột già": "Large intestine", "Hấp thu nước và tạo phân": "Absorbs water and makes poop", "Ruột già nhận phần thức ăn còn lại sau ruột non.": "The large intestine receives the food left over after the small intestine.", "Ruột già hấp thu thêm nước và một số chất, đồng thời biến phần còn lại thành phân để cơ thể đào thải ra ngoài.": "The large intestine absorbs more water and some substances, and turns what is left into poop for the body to get rid of.", "Ruột già hấp thu thêm nước từ phần thức ăn còn lại.": "The large intestine absorbs more water from leftover food.", "Hấp thu thêm nước": "Absorbs more water", "Kết quả": "Result", "Tạo phân từ phần còn lại": "Makes poop from what is left", "Bộ lọc của cơ thể": "The body's filter", "Hai quả thận nằm ở phía sau bụng, mỗi bên cột sống một quả.": "The two kidneys are at the back of the belly, one on each side of the spine.", "Thận lọc máu, loại bỏ nhiều chất thải và nước dư để tạo nước tiểu. Thận cũng giúp cân bằng nước và muối khoáng trong cơ thể.": "The kidneys filter the blood, removing many wastes and extra water to make urine. They also help balance water and minerals in the body.", "Có 2 quả thận; chúng lọc máu và tạo nước tiểu.": "We have 2 kidneys; they filter blood and make urine.", "Phía sau bụng, hai bên cột sống": "At the back of the belly, on both sides of the spine", "Nước tiểu": "Urine", "Giúp cân bằng": "Helps balance", "Nước và muối khoáng": "Water and minerals", "Lớp bảo vệ lớn nhất": "The biggest protective layer", "Da bao phủ bên ngoài cơ thể và là cơ quan lớn nhất của con người.": "Skin covers the outside of the body and is the largest human organ.", "Da giúp bảo vệ cơ thể khỏi môi trường, hạn chế mất nước, hỗ trợ điều hòa nhiệt độ và chứa nhiều thụ thể giúp ta cảm nhận nóng, lạnh, chạm và đau.": "Skin protects the body from the outside world, keeps water in, helps control body temperature and has many sensors that let us feel hot, cold, touch and pain.", "Da vừa bảo vệ cơ thể vừa giúp chúng ta cảm nhận sự chạm và nhiệt độ.": "Skin protects the body and also helps us feel touch and temperature.", "Bao phủ toàn cơ thể": "Covers the whole body", "Bảo vệ": "Protects", "Điều hòa": "Controls", "Nhiệt độ": "Temperature", "Giác quan": "Sense", "Xúc giác": "Touch", "Chạm, nóng, lạnh, đau": "Touch, hot, cold, pain", "Mắt": "Eyes", "Thị giác – nhìn": "Sight: seeing", "Mắt nhận ánh sáng từ môi trường và gửi tín hiệu về não để tạo nên hình ảnh chúng ta nhìn thấy.": "The eyes take in light from around us and send signals to the brain to make the pictures we see.", "Đồng tử thay đổi kích thước để kiểm soát lượng ánh sáng đi vào. Võng mạc ở phía sau mắt chứa các tế bào nhạy sáng.": "The pupil changes size to control how much light gets in. The retina at the back of the eye has cells that sense light.", "Mắt giúp nhìn; não giúp xử lý tín hiệu để ta hiểu hình ảnh.": "The eyes help us see; the brain processes the signals so we understand the picture.", "Thị giác": "Sight", "Ánh sáng, màu sắc, hình dạng": "Light, colors, shapes", "Gửi tín hiệu tới": "Sends signals to", "Bộ phận điều chỉnh ánh sáng": "Part that controls light", "Đồng tử": "Pupil", "Thính giác – nghe": "Hearing: listening", "Tai thu nhận sóng âm trong không khí và biến chúng thành tín hiệu gửi tới não.": "The ears catch sound waves in the air and turn them into signals sent to the brain.", "Tai trong còn giúp cơ thể giữ thăng bằng. Vì vậy tai không chỉ quan trọng với nghe mà còn hỗ trợ chúng ta đứng và di chuyển ổn định.": "The inner ear also helps the body keep its balance. So ears are not only for hearing, they also help us stand and move steadily.", "Tai giúp nghe và tai trong còn tham gia giữ thăng bằng.": "The ears help us hear, and the inner ear also helps with balance.", "Thính giác": "Hearing", "Âm thanh": "Sounds", "Giúp giữ thăng bằng": "Helps keep balance", "Mũi": "Nose", "Khứu giác – ngửi": "Smell: sniffing", "Mũi chứa các tế bào có thể nhận biết nhiều phân tử mùi khác nhau trong không khí.": "The nose has cells that can detect many different smell molecules in the air.", "Khứu giác liên quan chặt chẽ với vị giác. Khi bị nghẹt mũi, thức ăn thường có cảm giác kém ngon hơn vì ta ngửi mùi kém.": "Smell is closely linked to taste. When your nose is stuffy, food often seems less tasty because you cannot smell it well.", "Mũi giúp ngửi và phối hợp với lưỡi để cảm nhận hương vị thức ăn.": "The nose helps us smell and works with the tongue to sense the flavor of food.", "Khứu giác": "Smell", "Mùi": "Scents", "Phối hợp nhiều với": "Works closely with", "Vị giác": "Taste", "Tín hiệu gửi tới": "Signals go to", "Lưỡi": "Tongue", "Vị giác – nếm": "Taste: tasting", "Lưỡi có nhiều nụ vị giác giúp nhận biết các vị cơ bản trong thức ăn.": "The tongue has many taste buds that sense the basic tastes in food.", "Các vị cơ bản thường được nhắc tới gồm ngọt, chua, mặn, đắng và umami. Mùi từ mũi cũng góp phần rất lớn vào cảm giác hương vị.": "The basic tastes usually mentioned are sweet, sour, salty, bitter and umami. Smells from the nose also add a lot to flavor.", "Lưỡi giúp nếm; mũi cũng góp phần làm nên hương vị khi ăn.": "The tongue helps us taste; the nose also adds to the flavor when we eat.", "Vị": "Tastes", "Vị cơ bản": "Basic tastes", "Ngọt, chua, mặn, đắng, umami": "Sweet, sour, salty, bitter, umami", "Da – xúc giác": "Skin: touch", "Xúc giác – chạm": "Touch: feeling", "Các thụ thể trong da giúp chúng ta cảm nhận sự chạm, áp lực, rung, nóng, lạnh và đau.": "Sensors in the skin let us feel touch, pressure, vibration, hot, cold and pain.", "Nhờ xúc giác, chúng ta biết một vật mềm hay cứng, nóng hay lạnh và có thể phản ứng nhanh khi chạm phải vật gây đau.": "Thanks to touch, we know if something is soft or hard, hot or cold, and we can react fast when we touch something that hurts.", "Da không chỉ bảo vệ mà còn là cơ quan quan trọng của xúc giác.": "Skin not only protects us but is also an important organ for touch.", "Cơ quan": "Organ", "Chạm, áp lực, rung, nóng, lạnh, đau": "Touch, pressure, vibration, hot, cold, pain", "Giúp phản ứng với môi trường": "Helps us react to the world", "Cơ quan nào giúp điều khiển nhiều hoạt động của cơ thể?": "Which organ helps control many of the body's activities?", "Não là trung tâm quan trọng của hệ thần kinh.": "The brain is an important center of the nervous system.", "Cơ quan nào bơm máu đi khắp cơ thể?": "Which organ pumps blood all around the body?", "Tim co bóp để bơm máu.": "The heart squeezes to pump blood.", "Cơ quan nào giúp trao đổi ôxy và carbon dioxide?": "Which organ swaps oxygen and carbon dioxide?", "Phổi giúp trao đổi khí.": "The lungs swap gases.", "Hệ nào xử lý thức ăn?": "Which system breaks down food?", "Hệ tiêu hóa": "Digestive system", "Hệ Mặt Trời": "Solar System", "Hệ thống sông": "River system", "Hệ âm thanh": "Sound system", "Hệ tiêu hóa xử lý thức ăn.": "The digestive system breaks down food.", "Cơ quan nào lọc máu và tạo nước tiểu?": "Which organ filters blood and makes urine?", "Thận lọc máu và tạo nước tiểu.": "The kidneys filter blood and make urine.", "Cơ quan lớn nhất của cơ thể là gì?": "What is the largest organ of the body?", "Da là cơ quan lớn nhất của cơ thể người.": "Skin is the largest organ of the human body.", "Cơ thể hoạt động tốt nhờ điều gì?": "What makes the body work well?", "Nhiều cơ quan phối hợp với nhau": "Many organs working together", "Chỉ riêng tim": "Only the heart", "Chỉ riêng não": "Only the brain", "Chỉ riêng phổi": "Only the lungs", "Các cơ quan và hệ cơ quan phối hợp với nhau.": "Organs and organ systems work together.", "Não nằm ở đâu?": "Where is the brain?", "Trong bàn chân": "In the foot", "Trong dạ dày": "In the stomach", "Ngoài cơ thể": "Outside the body", "Não nằm trong hộp sọ.": "The brain is inside the skull.", "Não giúp chúng ta làm gì?": "What does the brain help us do?", "Suy nghĩ và ghi nhớ": "Think and remember", "Nhai thức ăn": "Chew food", "Não giúp suy nghĩ, học tập và ghi nhớ.": "The brain helps us think, learn and remember.", "Tim chủ yếu được cấu tạo bởi loại mô nào?": "What kind of tissue is the heart mostly made of?", "Cơ": "Muscle", "Xương": "Bone", "Tóc": "Hair", "Men răng": "Tooth enamel", "Tim là một cơ quan bằng cơ.": "The heart is an organ made of muscle.", "Tim có bao nhiêu ngăn?": "How many chambers does the heart have?", "Tim người có 4 ngăn.": "The human heart has 4 chambers.", "Con người có mấy lá phổi?": "How many lungs do people have?", "Chúng ta có hai lá phổi.": "We have two lungs.", "Khí nào cơ thể lấy vào từ không khí?": "Which gas does the body take in from the air?", "Khói": "Smoke", "Hơi dầu": "Oil fumes", "Phổi giúp ôxy đi vào máu.": "The lungs help oxygen get into the blood.", "Dạ dày nhận thức ăn từ đâu?": "Where does the stomach get food from?", "Thức ăn đi qua thực quản tới dạ dày.": "Food goes through the esophagus to the stomach.", "Dạ dày làm gì với thức ăn?": "What does the stomach do with food?", "Co bóp và trộn với dịch tiêu hóa": "Squeezes it and mixes it with digestive juices", "Tạo âm thanh": "Makes sounds", "Nhìn màu sắc": "Sees colors", "Dạ dày trộn thức ăn với dịch tiêu hóa.": "The stomach mixes food with digestive juices.", "Gan nằm chủ yếu ở đâu?": "Where is the liver mainly found?", "Trong đầu": "In the head", "Trong bàn tay": "In the hand", "Gan nằm ở phần trên bên phải của bụng.": "The liver is in the upper right part of the belly.", "Gan tạo chất nào giúp tiêu hóa chất béo?": "What does the liver make to help digest fat?", "Nước mắt": "Tears", "Mồ hôi": "Sweat", "Không khí": "Air", "Gan tạo mật.": "The liver makes bile.", "Phần lớn chất dinh dưỡng được hấp thu ở đâu?": "Where are most nutrients absorbed?", "Ruột non hấp thu phần lớn chất dinh dưỡng.": "The small intestine absorbs most nutrients.", "Ruột non nằm sau cơ quan nào trong đường tiêu hóa?": "Which organ does the small intestine come after in the digestive tract?", "Thức ăn từ dạ dày đi xuống ruột non.": "Food goes from the stomach down to the small intestine.", "Ruột già hấp thu thêm gì?": "What does the large intestine absorb more of?", "Nước": "Water", "Ánh sáng": "Light", "Ruột già hấp thu thêm nước.": "The large intestine absorbs more water.", "Ruột già nằm sau phần nào của hệ tiêu hóa?": "Which part of the digestive system does the large intestine come after?", "Phần còn lại từ ruột non đi tới ruột già.": "What is left from the small intestine goes to the large intestine.", "Con người thường có bao nhiêu quả thận?": "How many kidneys do people usually have?", "Thông thường có hai quả thận.": "People usually have two kidneys.", "Thận giúp cân bằng gì trong cơ thể?": "What do the kidneys help balance in the body?", "Màu tóc": "Hair color", "Thận giúp cân bằng nước và muối khoáng.": "The kidneys help balance water and minerals.", "Da giúp bảo vệ điều gì?": "What does skin help protect?", "Cơ thể": "The body", "Mặt Trời": "The Sun", "Đại dương": "The ocean", "Mây": "Clouds", "Da là lớp bảo vệ bên ngoài cơ thể.": "Skin is the protective outer layer of the body.", "Da giúp cảm nhận điều gì?": "What does skin help us feel?", "Chạm, nóng, lạnh": "Touch, hot, cold", "Âm thanh từ xa": "Faraway sounds", "Mùi bằng mũi": "Smells with the nose", "Vị bằng lưỡi": "Tastes with the tongue", "Da chứa các thụ thể xúc giác.": "Skin has touch sensors.", "Mắt là cơ quan của giác quan nào?": "Which sense do the eyes belong to?", "Mắt là cơ quan của thị giác.": "The eyes are the organ of sight.", "Mắt nhận loại tín hiệu nào từ môi trường?": "What kind of signal do the eyes take in from around us?", "Mắt nhận ánh sáng.": "The eyes take in light.", "Tín hiệu từ mắt được gửi tới đâu để xử lý?": "Where are signals from the eyes sent to be processed?", "Não xử lý tín hiệu từ mắt.": "The brain processes signals from the eyes.", "Tai là cơ quan của giác quan nào?": "Which sense do the ears belong to?", "Tai là cơ quan của thính giác.": "The ears are the organ of hearing.", "Tai nhận gì từ môi trường?": "What do the ears take in from around us?", "Sóng âm": "Sound waves", "Màu": "Colors", "Tai thu nhận sóng âm.": "The ears catch sound waves.", "Tai trong còn giúp cơ thể làm gì?": "What else does the inner ear help the body do?", "Giữ thăng bằng": "Keep balance", "Tai trong giúp giữ thăng bằng.": "The inner ear helps keep balance.", "Mũi là cơ quan của giác quan nào?": "Which sense does the nose belong to?", "Mũi là cơ quan của khứu giác.": "The nose is the organ of smell.", "Mũi giúp ta cảm nhận gì?": "What does the nose help us sense?", "Nhiệt độ cơ thể": "Body temperature", "Mũi giúp nhận biết mùi.": "The nose helps us detect smells.", "Khứu giác phối hợp mạnh với giác quan nào khi ăn?": "Which sense does smell work closely with when we eat?", "Xúc giác chân": "Touch in the feet", "Mùi và vị cùng góp phần tạo cảm giác hương vị.": "Smell and taste together make flavor.", "Lưỡi là cơ quan chính của giác quan nào?": "Which sense is the tongue the main organ of?", "Lưỡi có các nụ vị giác.": "The tongue has taste buds.", "Vị nào sau đây là một vị cơ bản?": "Which of these is a basic taste?", "Ngọt": "Sweet", "Ồn": "Noisy", "Sáng": "Bright", "Mềm": "Soft", "Ngọt là một vị cơ bản.": "Sweet is a basic taste.", "Mùi từ mũi có ảnh hưởng tới cảm giác hương vị không?": "Do smells from the nose affect flavor?", "Có": "Yes", "Không bao giờ": "Never", "Chỉ khi ngủ": "Only when sleeping", "Chỉ dưới nước": "Only underwater", "Khứu giác đóng vai trò lớn trong cảm nhận hương vị.": "Smell plays a big part in sensing flavor.", "Cơ quan chính của xúc giác là gì?": "What is the main organ of touch?", "Da là cơ quan quan trọng của xúc giác.": "Skin is an important organ of touch.", "Xúc giác giúp cảm nhận điều nào?": "What can touch help us sense?", "Chạm và nhiệt độ": "Touch and temperature", "Chỉ màu sắc": "Only colors", "Chỉ âm thanh": "Only sounds", "Chỉ mùi": "Only smells", "Xúc giác cảm nhận chạm, áp lực, nóng, lạnh và đau.": "Touch senses contact, pressure, hot, cold and pain.", "Cảm giác đau có ích ở điểm nào?": "How is feeling pain useful?", "Cảnh báo cơ thể về nguy cơ tổn thương": "It warns the body about possible injury", "Giúp nhìn rõ hơn": "It helps us see better", "Giúp nghe to hơn": "It helps us hear louder", "Tạo nước tiểu": "It makes urine", "Đau là một tín hiệu giúp cơ thể nhận biết nguy cơ tổn thương.": "Pain is a signal that helps the body notice possible injury.", "Khám phá cơ thể người": "Human Body Explorer", "Cùng Cô Thỏ Hồng tìm hiểu cơ thể tuyệt vời của chúng ta": "Learn about our amazing body with Miss Pink Bunny", "nằm phía sau": "behind", "Các cơ quan trong cơ thể": "Organs of the body", "Năm giác quan": "The five senses", "Mắt – nhìn": "Eyes: seeing", "Lưỡi – nếm": "Tongue: tasting", "Mũi – ngửi": "Nose: smelling", "Da – chạm": "Skin: touching", "⏹ Dừng đọc": "⏹ Stop reading", "Nghe cô đọc": "Listen to Teacher", "Chưa phát được giọng đọc. Con nhờ bố mẹ hoặc thầy cô kiểm tra loa và mạng, rồi bấm lại nhé.": "I couldn't play the voice. Ask a parent or teacher to check the speaker and the internet, then tap again.", "Bé nhớ nhé:": "Remember:", "🔊 Nghe cô đọc": "🔊 Listen to Teacher", "Sổ khám phá": "Explorer's Log", "👤 Cả cơ thể": "👤 Whole body", "Chạm vào từng cơ quan hoặc tên của nó. Chạm vào chỗ trống trên người để xem về da nhé! Hình mờ là cơ quan nằm phía sau.": "Tap each organ or its name. Tap an empty spot on the body to learn about skin! Faded shapes are organs that sit behind.", "Chúng ta có 5 giác quan. Chạm vào mắt, tai, mũi, lưỡi hoặc bàn tay nhé!": "We have 5 senses. Tap the eyes, ears, nose, tongue or hand!", "✓ Đã xem": "✓ Seen", "câu đúng": "correct", "Cô tự đọc câu hỏi": "Teacher reads the questions", "Mẹo: bấm phím 1, 2, 3, 4 để chọn đáp án.": "Tip: press 1, 2, 3, 4 to choose an answer.", "Đổi câu hỏi khác": "Try other questions", "Tuyệt vời! Con là bác sĩ nhí rồi!": "Amazing! You are a little doctor now!", "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé.": "Well done! Let's review the questions below.", "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.": "You tried hard! Let's review and play again.", "Con đúng": "You got", "câu": "questions", "Làm lại câu sai": "Retry wrong answers", "Chơi vòng mới": "Play a new round", "Đáp án đúng của các câu con chưa trả lời được:": "Correct answers to the questions you missed:", "Con chọn một đáp án nhé!": "Pick an answer!", "Chính xác!": "Correct!", "Chưa đúng rồi. Đáp án đúng là": "Not quite. The correct answer is", "Câu": "Question", "trên": "of", "Đọc câu hỏi": "Read the question", "🔊 Đọc câu hỏi": "🔊 Read the question", "Xem kết quả": "See results", "Câu tiếp theo": "Next question", "🏆 Con đã khám phá hết cơ thể mình rồi! Giỏi quá!": "🏆 You have explored your whole body! Great job!", "🩺 Đã ghi": "🩺 Added", "vào sổ khám phá (": "to your explorer's log (", "Hỏi đáp": "Quiz", "câu.": "questions.", "Các khu vực khám phá": "Exploration areas", "🧍 Cơ thể": "🧍 Body", "🫀 Cơ quan": "🫀 Organs", "👀 5 giác quan": "👀 5 Senses", "⭐ Hỏi đáp": "⭐ Quiz"};
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
    const simTab = root.querySelector('[data-tab="sim"]');
    if (simTab) simTab.textContent=simL("🫁 Nhịp thở","🫁 Breathing");
    if (activeTab === "sim") renderStage();
    translateDom(root);
    setBanner();
  }


  /* ---------- Hình vẽ cơ quan & giác quan (khung 120 x 100) ---------- */
  const ORGAN = {
    brain: () => `
      <path d="M60 18 C40 8 16 18 19 40 C6 47 9 70 27 74 C33 87 53 88 60 78 C67 88 87 87 93 74 C111 70 114 47 101 40 C104 18 80 8 60 18Z" fill="#F9A8D4" stroke="#DB2777" stroke-width="3"/>
      <path d="M60 20 V78" stroke="#DB2777" stroke-width="3"/>
      <path d="M32 34 q10 4 8 14 M24 56 q12 -2 16 8 M44 22 q-2 10 8 14 M88 34 q-10 4 -8 14 M96 56 q-12 -2 -16 8 M76 22 q2 10 -8 14" stroke="#DB2777" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    heart: () => `
      <path d="M52 30 V14 Q52 6 61 6 Q71 6 71 16 V26" stroke="#DC2626" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M42 30 V12" stroke="#3B82F6" stroke-width="8" stroke-linecap="round"/>
      <path d="M60 92 C20 66 14 38 32 28 C45 21 56 29 60 38 C64 29 75 21 88 28 C106 38 100 66 60 92Z" fill="#F43F5E" stroke="#BE123C" stroke-width="3"/>
      <path d="M44 42 q6 -6 12 0" stroke="#FECDD3" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    lungs: () => `
      <path d="M53 30 C30 24 14 50 16 76 C18 94 40 96 55 84Z" fill="#FDA4AF" stroke="#E11D48" stroke-width="3"/>
      <path d="M67 30 C90 24 106 50 104 76 C102 94 80 96 65 84Z" fill="#FDA4AF" stroke="#E11D48" stroke-width="3"/>
      <path d="M60 4 V40 M60 40 L44 52 M60 40 L76 52" stroke="#94A3B8" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M30 60 q6 8 14 6 M90 60 q-6 8 -14 6" stroke="#E11D48" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".6"/>`,
    stomach: () => `
      <path d="M52 2 V24" stroke="#FB923C" stroke-width="10" stroke-linecap="round"/>
      <path d="M46 22 C46 40 28 44 28 62 C28 86 56 96 80 86 C102 78 106 56 93 46 C84 39 72 45 66 52 C60 58 57 44 58 22Z" fill="#FDBA74" stroke="#EA580C" stroke-width="3"/>
      <path d="M40 66 q10 10 26 6" stroke="#EA580C" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".6"/>`,
    liver: () => `
      <path d="M8 40 C18 16 70 12 108 24 C116 28 114 38 106 44 C82 64 50 82 24 76 C10 72 2 54 8 40Z" fill="#B45309" stroke="#7C2D12" stroke-width="3"/>
      <path d="M62 22 Q58 44 66 60" stroke="#7C2D12" stroke-width="2.5" fill="none" opacity=".6"/>
      <ellipse cx="70" cy="66" rx="8" ry="6" fill="#4ADE80" stroke="#15803D" stroke-width="2"/>`,
    "small-intestine": () => `
      <path d="M26 22 H94 Q104 22 104 32 Q104 42 94 42 H26 Q16 42 16 52 Q16 62 26 62 H94 Q104 62 104 72 Q104 82 94 82 H44" stroke="#DB2777" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26 22 H94 Q104 22 104 32 Q104 42 94 42 H26 Q16 42 16 52 Q16 62 26 62 H94 Q104 62 104 72 Q104 82 94 82 H44" stroke="#F9A8D4" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    "large-intestine": () => `
      <path d="M26 94 V26 Q26 12 40 12 H80 Q94 12 94 26 V76 Q94 88 82 88 H62" stroke="#7E22CE" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26 94 V26 Q26 12 40 12 H80 Q94 12 94 26 V76 Q94 88 82 88 H62" stroke="#C084FC" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26 94 V26 Q26 12 40 12 H80 Q94 12 94 26 V76 Q94 88 82 88 H62" stroke="#E9D5FF" stroke-width="3" fill="none" stroke-dasharray="3 9" stroke-linecap="round"/>`,
    kidneys: () => `
      <path d="M38 14 C18 14 12 38 16 56 C20 76 40 80 46 64 C50 54 40 48 42 38 C44 28 52 16 38 14Z" fill="#C084FC" stroke="#7E22CE" stroke-width="3"/>
      <path d="M82 14 C102 14 108 38 104 56 C100 76 80 80 74 64 C70 54 80 48 78 38 C76 28 68 16 82 14Z" fill="#C084FC" stroke="#7E22CE" stroke-width="3"/>
      <path d="M44 62 Q52 80 56 96 M76 62 Q68 80 64 96" stroke="#FBBF24" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    skin: () => `
      <path d="M8 30 Q30 22 60 30 T112 30 V44 H8Z" fill="#FDBA74"/>
      <rect x="8" y="44" width="104" height="24" fill="#FCA5A5"/>
      <rect x="8" y="68" width="104" height="24" rx="4" fill="#FDE68A"/>
      <path d="M30 28 l-4 -20 M54 30 l2 -22 M86 28 l4 -18" stroke="#7C2D12" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M30 28 V58 M54 30 V60 M86 28 V56" stroke="#B45309" stroke-width="2" opacity=".5"/>
      <path d="M70 52 q-5 7 0 9 q5 -2 0 -9Z" fill="#7DD3FC" stroke="#0284C7" stroke-width="1.5"/>`,
    eyes: () => `
      <path d="M8 52 Q60 6 112 52 Q60 98 8 52Z" fill="#fff" stroke="#475569" stroke-width="3"/>
      <circle cx="60" cy="52" r="20" fill="#3B82F6"/><circle cx="60" cy="52" r="9" fill="#111827"/><circle cx="53" cy="45" r="5" fill="#fff"/>
      <path d="M26 30 l-6 -10 M44 20 l-3 -12 M60 17 v-12 M76 20 l3 -12 M94 30 l6 -10" stroke="#475569" stroke-width="3" stroke-linecap="round"/>`,
    ears: () => `
      <path d="M52 10 C26 4 12 26 18 48 C22 62 34 64 36 76 C38 90 54 94 60 82 C64 72 56 66 60 56 C64 46 76 40 74 26 C72 16 64 12 52 10Z" fill="#FDBA74" stroke="#C2410C" stroke-width="3"/>
      <path d="M52 26 C38 22 32 38 40 46 C46 52 40 60 46 64" stroke="#C2410C" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M86 36 q8 14 0 28 M98 28 q14 22 0 44" stroke="#8B5CF6" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    nose: () => `
      <path d="M50 8 C48 30 40 48 30 62 C22 74 30 86 44 84 C50 92 64 92 70 84 C82 86 88 74 80 64" fill="#FDBA74" stroke="#C2410C" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="44" cy="76" rx="5" ry="3" fill="#9A3412"/><ellipse cx="66" cy="76" rx="5" ry="3" fill="#9A3412"/>
      <path d="M92 20 q-6 8 0 14 q6 6 0 14 M104 26 q-6 8 0 14 q6 6 0 14" stroke="#8B5CF6" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="102" cy="82" r="7" fill="#F472B6"/><circle cx="102" cy="82" r="3" fill="#FDE68A"/>`,
    tongue: () => `
      <path d="M10 34 Q60 4 110 34 Q104 92 60 94 Q16 92 10 34Z" fill="#9F1239"/>
      <path d="M18 34 Q60 22 102 34 V40 Q60 30 18 40Z" fill="#fff"/>
      <path d="M30 56 Q60 44 90 56 Q90 86 60 88 Q30 86 30 56Z" fill="#FB7185"/>
      <path d="M60 52 V80" stroke="#E11D48" stroke-width="2.5"/>
      <circle cx="46" cy="64" r="2.5" fill="#FECDD3"/><circle cx="74" cy="64" r="2.5" fill="#FECDD3"/><circle cx="50" cy="76" r="2.5" fill="#FECDD3"/><circle cx="70" cy="76" r="2.5" fill="#FECDD3"/>`,
    touch: () => `
      <path d="M40 94 V44 Q40 36 47 36 Q54 36 54 44 V26 Q54 18 61 18 Q68 18 68 26 V30 Q68 22 75 22 Q82 22 82 30 V38 Q82 30 89 30 Q96 30 96 38 V68 Q96 92 72 96 Q52 98 40 94Z M40 60 L28 50 Q20 44 16 52 Q14 58 22 64 L40 80" fill="#FDBA74" stroke="#C2410C" stroke-width="3" stroke-linejoin="round"/>
      <path d="M61 6 v-4 M48 10 l-3 -3 M74 10 l3 -3" stroke="#EC4899" stroke-width="3" stroke-linecap="round"/>`
  };
  const ORGAN_BG = {
    brain: "#FFF1F7", heart: "#FFF1F2", lungs: "#FFF1F2", stomach: "#FFF7ED", liver: "#FEF3C7",
    "small-intestine": "#FDF2F8", "large-intestine": "#F5F3FF", kidneys: "#F5F3FF", skin: "#FFF7ED",
    eyes: "#E0F2FE", ears: "#F5F3FF", nose: "#FFF7ED", tongue: "#FFF1F2", touch: "#ECFDF5"
  };
  function organSvg(id, withBg = false) {
    const draw = ORGAN[id];
    if (!draw) return "";
    const bg = withBg ? `<rect x="-20" y="-10" width="160" height="120" fill="${ORGAN_BG[id]}"/>` : "";
    return `<svg class="gx-organ-svg" viewBox="0 0 120 100" aria-hidden="true" focusable="false"${withBg ? ' preserveAspectRatio="xMidYMid slice"' : ""}>${bg}${draw()}</svg>`;
  }
  /* đặt một hình cơ quan (120x100) vào hộp x,y,w,h trong sơ đồ lớn */
  const place = (id, x, y, w, h) => `<g transform="translate(${x} ${y}) scale(${w / 120} ${h / 100})">${ORGAN[id]()}</g>`;

  /* ---------- Sơ đồ cơ thể (nhìn từ phía trước: bên phải hình là bên trái của bạn nhỏ) ---------- */
  const BODY_PARTS = [
    { id: "kidneys", box: [250, 318, 140, 60], label: "Thận", sub: "nằm phía sau", side: "L", ly: 380, anchor: [276, 350], back: true },
    { id: "lungs", box: [242, 160, 156, 124], label: "Phổi", side: "L", ly: 190, anchor: [262, 232] },
    { id: "liver", box: [246, 276, 96, 66], label: "Gan", side: "L", ly: 284, anchor: [262, 300] },
    { id: "stomach", box: [322, 270, 74, 70], label: "Dạ dày", side: "R", ly: 310, anchor: [376, 312] },
    { id: "large-intestine", box: [272, 362, 96, 84], label: "Ruột già", side: "L", ly: 480, anchor: [293, 420] },
    { id: "small-intestine", box: [292, 382, 56, 48], label: "Ruột non", side: "R", ly: 450, anchor: [334, 404] },
    { id: "heart", box: [310, 206, 58, 52], label: "Tim", side: "R", ly: 220, anchor: [352, 232] },
    { id: "brain", box: [270, 34, 100, 78], label: "Não", side: "L", ly: 80, anchor: [286, 70] }
  ];
  function bodyMapSvg(selected) {
    const sel = (id) => (selected === id ? "is-selected" : "");
    const organs = BODY_PARTS.map((p) => {
      const [x, y, w, h] = p.box;
      return `<g class="gx-part ${p.back ? "is-back" : ""} ${sel(p.id)}" data-object="${p.id}" role="button" tabindex="0" aria-label="${p.label}${p.sub ? ", " + p.sub : ""}">${place(p.id, x, y, w, h)}</g>`;
    }).join("");
    const labelFor = (p) => {
      const [ax, ay] = p.anchor;
      const left = p.side === "L";
      const bx = left ? -100 : 510, ex = left ? 130 : 510;
      return `<g class="gx-tag ${sel(p.id)}" data-object="${p.id}" role="button" tabindex="0" aria-label="${p.label}${p.sub ? ", " + p.sub : ""}">
        <path d="M${ax} ${ay} L${ex} ${p.ly}" stroke="#5B216E" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
        <circle cx="${ax}" cy="${ay}" r="5" fill="#fff" stroke="#5B216E" stroke-width="2"/>
        ${p.sub
          ? `<rect x="${bx}" y="${p.ly - 38}" width="230" height="76" rx="18"/><text x="${bx + 115}" y="${p.ly - 2}" text-anchor="middle">${p.label}</text><text class="sub" x="${bx + 115}" y="${p.ly + 26}" text-anchor="middle">${p.sub}</text>`
          : `<rect x="${bx}" y="${p.ly - 29}" width="230" height="58" rx="18"/><text x="${bx + 115}" y="${p.ly + 11}" text-anchor="middle">${p.label}</text>`}</g>`;
    };
    const skinTag = `<g class="gx-tag ${sel("skin")}" data-object="skin" role="button" tabindex="0" aria-label="Da">
        <path d="M410 150 L510 128" stroke="#5B216E" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
        <circle cx="410" cy="150" r="5" fill="#fff" stroke="#5B216E" stroke-width="2"/>
        <rect x="510" y="99" width="230" height="58" rx="18"/><text x="625" y="139" text-anchor="middle">Da</text></g>`;
    return `<svg class="gx-map-svg" viewBox="-110 0 860 560" role="group" aria-label="Các cơ quan trong cơ thể">
      <g class="gx-part gx-skin ${sel("skin")}" data-object="skin" role="button" tabindex="-1" aria-label="Da">
        <path d="M320 132 C266 132 238 150 236 186 L214 330 Q210 352 226 354 Q240 356 244 336 L254 260 L254 444 L262 540 Q264 556 282 554 Q298 552 298 536 L304 452 L336 452 L342 536 Q342 552 358 554 Q376 556 378 540 L386 444 L386 260 L396 336 Q400 356 414 354 Q430 352 426 330 L404 186 C402 150 374 132 320 132Z" fill="#FED7AA" stroke="#FDBA74" stroke-width="3"/>
        <rect x="302" y="118" width="36" height="22" fill="#FED7AA"/>
        <circle cx="320" cy="74" r="58" fill="#FED7AA" stroke="#FDBA74" stroke-width="3"/>
      </g>
      <path d="M262 70 Q258 14 320 14 Q382 14 378 70 Q366 34 320 32 Q274 34 262 70Z" fill="#7C2D12"/>
      <path d="M300 150 Q320 168 340 150" stroke="#FDBA74" stroke-width="3" fill="none"/>
      ${organs}
      ${BODY_PARTS.map(labelFor).join("")}${skinTag}
    </svg>`;
  }

  /* ---------- Khuôn mặt 5 giác quan ---------- */
  function faceMapSvg(selected) {
    const sel = (id) => (selected === id ? "is-selected" : "");
    const tag = (id, label, ax, ay, bx, by) => {
      const ex = bx < 320 ? bx + 230 : bx;
      return `<g class="gx-tag ${sel(id)}" data-object="${id}" role="button" tabindex="0" aria-label="${label}">
        <path d="M${ax} ${ay} L${ex} ${by}" stroke="#5B216E" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
        <circle cx="${ax}" cy="${ay}" r="5" fill="#fff" stroke="#5B216E" stroke-width="2"/>
        <rect x="${bx}" y="${by - 29}" width="230" height="58" rx="18"/><text x="${bx + 115}" y="${by + 11}" text-anchor="middle">${label}</text></g>`;
    };
    return `<svg class="gx-map-svg" viewBox="-110 20 860 440" role="group" aria-label="Năm giác quan">
      <g class="gx-part ${sel("ears")}" data-object="ears" role="button" tabindex="0" aria-label="Tai">
        <ellipse cx="190" cy="214" rx="30" ry="44" fill="#FDBA74" stroke="#F59E0B" stroke-width="3"/><path d="M198 192 q-16 6 -8 22 q8 10 -2 22" stroke="#C2410C" stroke-width="3" fill="none"/>
        <ellipse cx="450" cy="214" rx="30" ry="44" fill="#FDBA74" stroke="#F59E0B" stroke-width="3"/><path d="M442 192 q16 6 8 22 q-8 10 2 22" stroke="#C2410C" stroke-width="3" fill="none"/>
      </g>
      <ellipse cx="320" cy="214" rx="132" ry="150" fill="#FED7AA" stroke="#FDBA74" stroke-width="3"/>
      <path d="M188 170 Q188 52 320 52 Q452 52 452 170 Q430 104 360 96 Q330 120 270 104 Q206 116 188 170Z" fill="#7C2D12"/>
      <circle cx="250" cy="262" r="16" fill="#FDA4AF" opacity=".6"/><circle cx="390" cy="262" r="16" fill="#FDA4AF" opacity=".6"/>
      <g class="gx-part ${sel("eyes")}" data-object="eyes" role="button" tabindex="0" aria-label="Mắt">
        <ellipse cx="270" cy="196" rx="30" ry="22" fill="#fff" stroke="#475569" stroke-width="3"/><circle cx="270" cy="198" r="13" fill="#3B82F6"/><circle cx="270" cy="198" r="6" fill="#111827"/><circle cx="265" cy="193" r="3" fill="#fff"/>
        <ellipse cx="370" cy="196" rx="30" ry="22" fill="#fff" stroke="#475569" stroke-width="3"/><circle cx="370" cy="198" r="13" fill="#3B82F6"/><circle cx="370" cy="198" r="6" fill="#111827"/><circle cx="365" cy="193" r="3" fill="#fff"/>
      </g>
      <g class="gx-part ${sel("nose")}" data-object="nose" role="button" tabindex="0" aria-label="Mũi">
        <path d="M320 212 C318 236 306 248 300 256 Q298 270 314 268 Q320 274 326 268 Q342 270 340 256 C334 248 322 236 320 212Z" fill="#FDBA74" stroke="#C2410C" stroke-width="3" stroke-linejoin="round"/>
      </g>
      <g class="gx-part ${sel("tongue")}" data-object="tongue" role="button" tabindex="0" aria-label="Lưỡi">
        <path d="M272 296 Q320 286 368 296 Q360 344 320 346 Q280 344 272 296Z" fill="#9F1239"/>
        <path d="M290 318 Q320 306 350 318 Q350 342 320 344 Q290 342 290 318Z" fill="#FB7185"/><path d="M320 316 V338" stroke="#E11D48" stroke-width="2"/>
      </g>
      <g class="gx-part ${sel("touch")}" data-object="touch" role="button" tabindex="0" aria-label="Da">
        <g transform="translate(470 330) scale(1.05)">${ORGAN.touch()}</g>
      </g>
      ${tag("eyes", "Mắt – nhìn", 246, 196, -100, 120)}
      ${tag("ears", "Tai – nghe", 168, 230, -100, 260)}
      ${tag("tongue", "Lưỡi – nếm", 290, 330, -100, 400)}
      ${tag("nose", "Mũi – ngửi", 336, 250, 510, 150)}
      ${tag("touch", "Da – chạm", 560, 360, 510, 290)}
    </svg>`;
  }
  const BODY_ICON = `<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><circle cx="40" cy="17" r="10" fill="#FDBA74"/><path d="M28 30h24l6 29-9 3-3 15H34l-3-15-9-3z" fill="#F9A8D4"/><path d="M29 34L15 58m36-24 14 24" stroke="#FDBA74" stroke-width="8" stroke-linecap="round"/><path d="M36 38c-8 1-9 10-3 14 5 4 7 5 7 5s4-1 8-5c6-5 4-13-4-14-3 0-4 2-4 4-1-2-2-4-4-4z" fill="#FB7185"/></svg>`;


  /* ---------- Trạng thái ---------- */
  let controller = null;
  let root = null;
  let activeContext = null;
  let activeTab = "body";
  let selectedId = DATA.overview.id;
  let quiz = null;
  let autoRead = true;
  let toastTimer = 0;
  let found = loadFound();

  const allItems = [DATA.overview, ...DATA.primary, ...DATA.secondary];
  const byId = (id) => allItems.find((item) => item.id === id) || DATA.overview;
  const isOrgan = (id) => DATA.primary.some((d) => d.id === id);
  const isSense = (id) => DATA.secondary.some((d) => d.id === id);
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
      ${R} .gx-tab[data-tab="senses"][aria-selected="true"],${R} .gx-tab[data-tab="quiz"][aria-selected="true"]{background:var(--grad-alt)}
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
      ${R} .gx-hero.is-icon svg{height:110px;width:110px}
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
    `;
    document.head.appendChild(style);
  }


  function heroArt(obj) {
    if (ORGAN[obj.id]) return `<div class="gx-hero is-organ" style="background:${ORGAN_BG[obj.id]}">${organSvg(obj.id)}</div>`;
    return `<div class="gx-hero is-icon">${BODY_ICON}</div>`;
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
  function bodyHtml() {
    const whole = `<button type="button" class="gx-whole ${selectedId === DATA.overview.id ? "is-selected" : ""}" data-object="${DATA.overview.id}">👤 Cả cơ thể</button>`;
    return `<div class="gx-split">
      ${mapCard("Chạm vào từng cơ quan hoặc tên của nó. Chạm vào chỗ trống trên người để xem về da nhé! Hình mờ là cơ quan nằm phía sau.", bodyMapSvg(selectedId), whole)}
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }
  function sensesHtml() {
    if (!isSense(selectedId)) selectedId = DATA.secondary[0].id;
    return `<div class="gx-split">
      ${mapCard("Chúng ta có 5 giác quan. Chạm vào mắt, tai, mũi, lưỡi hoặc bàn tay nhé!", faceMapSvg(selectedId))}
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }

  function gridHtml(items) {
    if (!items.some((i) => i.id === selectedId)) selectedId = items[0].id;
    const cards = items.map((o) => {
      const tick = found.has(o.id) ? `<span class="gx-tick">✓ Đã xem</span>` : "";
      return `<button type="button" class="gx-item gx-land-item ${o.id === selectedId ? "is-selected" : ""}" data-object="${o.id}">${tick}<span class="gx-thumb" style="background:${ORGAN_BG[o.id]};padding:6px">${organSvg(o.id)}</span><span class="gx-item-text"><strong>${o.name}</strong><small>${o.subtitle}</small></span></button>`;
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
      const msg = stars === 3 ? "Tuyệt vời! Con là bác sĩ nhí rồi!" : stars === 2 ? "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé." : "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.";
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


  /* Trải nghiệm thực hành: nhịp thở và nhịp tim. Chỉ là minh họa sư phạm. */
  const simHuman = { rate: 12, running: true, phase: 0, last: 0, raf: 0 };
  const simL = (vi, en) => LANG === "en" ? en : vi;
  function simHumanInfo() {
    const breathingIn = Math.sin(simHuman.phase) >= 0;
    return {
      label: breathingIn ? simL("Hít vào", "Breathe in") : simL("Thở ra", "Breathe out"),
      note: breathingIn
        ? simL("Cơ hoành hạ xuống, lồng ngực nở ra và không khí đi vào phổi.", "The diaphragm moves down, your chest expands and air enters the lungs.")
        : simL("Cơ hoành nâng lên, lồng ngực nhỏ lại và không khí được đẩy ra.", "The diaphragm moves up, your chest gets smaller and air moves out.")
    };
  }
  function simHumanHtml() {
    return `<div class="gx-sim"><div class="gx-sim-art"><div class="gx-sim-art-head">❤️ ${simL("Cơ thể hoạt động", "How our body works")} <span class="gx-sim-pill">● ${simL("Mô phỏng", "Simulation")}</span></div>
      <canvas class="gx-sim-canvas" width="880" height="540" role="img" aria-label="${simL("Hình phổi hít thở và tim co bóp", "Animated lungs breathing and a beating heart")}"></canvas>
      <div class="gx-sim-bottom">🫁 <span data-sim-status></span> <span data-sim-rate></span></div></div>
      <div class="gx-sim-side"><h3>🫁 ${simL("Bé điều khiển nhịp thở", "Control your breathing")}</h3>
      <p>${simL("Chạm nút hoặc kéo thanh để nhìn phổi phồng lên, xẹp xuống. Tim vẫn đập để bơm máu đi khắp cơ thể.", "Press a button or move the slider to watch the lungs expand and relax. The heart keeps pumping blood around the body.")}</p>
      <label class="gx-sim-label" for="gx-human-rate">${simL("Nhịp thở mô phỏng", "Simulated breathing rate")} <strong><span data-sim-rate-value>${simHuman.rate}</span> ${simL("lần/phút", "breaths/min")}</strong></label>
      <input id="gx-human-rate" data-sim-input="rate" type="range" min="8" max="20" step="1" value="${simHuman.rate}">
      <div class="gx-sim-buttons"><button class="gx-sim-primary" data-sim-action="toggle">${simHuman.running ? simL("⏸ Tạm dừng", "⏸ Pause") : simL("▶ Tiếp tục", "▶ Play")}</button>
      <button data-sim-action="inhale">${simL("⬇ Hít vào", "⬇ Breathe in")}</button><button data-sim-action="exhale">${simL("⬆ Thở ra", "⬆ Breathe out")}</button></div>
      <div class="gx-sim-explain" aria-live="polite"><b data-sim-step></b><p data-sim-note></p></div>
      <button class="gx-sim-listen" data-sim-action="listen">🔊 ${simL("Nghe Cô Thỏ giải thích", "Listen to Miss Bunny")}</button>
      <p class="gx-sim-fine">${simL("Đây là hình minh họa, không phải đo nhịp thở hoặc nhịp tim thật.", "This is an illustration, not a real breathing or heart-rate measurement.")}</p></div></div>`;
  }
  function simHumanDraw() {
    if (!root || activeTab !== "sim") return;
    const canvas = root.querySelector(".gx-sim-canvas"); if (!canvas) return;
    const c = canvas.getContext("2d"); if (!c) return;
    const w = 880, h = 540; c.clearRect(0,0,w,h);
    const grad=c.createLinearGradient(0,0,w,h); grad.addColorStop(0,"#e0f2fe"); grad.addColorStop(1,"#fce7f3"); c.fillStyle=grad; c.fillRect(0,0,w,h);
    for(let i=0;i<24;i++){c.fillStyle=`rgba(255,255,255,${.14+(i%4)*.08})`;c.beginPath();c.arc((i*173+51)%w,(i*139+37)%h,7+i%6*6,0,Math.PI*2);c.fill();}
    c.fillStyle="rgba(255,255,255,.66)";c.beginPath();c.roundRect(215,38,450,470,150);c.fill();
    c.strokeStyle="#f5b6ca";c.lineWidth=14;c.lineCap="round";c.beginPath();c.moveTo(440,105);c.lineTo(440,212);c.stroke();
    const expand=.82+Math.max(0,Math.sin(simHuman.phase))*.21;
    function lung(cx,flip){c.save();c.translate(cx,295);c.scale(expand,expand);c.beginPath();c.moveTo(0,-96);c.bezierCurveTo(flip*115,-162,flip*152,-55,flip*146,65);c.bezierCurveTo(flip*141,151,flip*30,165,0,103);c.bezierCurveTo(flip*19,15,flip*8,-40,0,-96);c.closePath();let g=c.createLinearGradient(-155,-120,155,135);g.addColorStop(0,"#ff95bc");g.addColorStop(1,"#f472b6");c.fillStyle=g;c.strokeStyle="#db2777";c.lineWidth=5;c.fill();c.stroke();c.strokeStyle="rgba(255,255,255,.8)";c.lineWidth=9;c.beginPath();c.moveTo(15*flip,-66);c.lineTo(80*flip,10);c.moveTo(45*flip,-5);c.lineTo(102*flip,-25);c.moveTo(65*flip,35);c.lineTo(111*flip,76);c.stroke();c.restore();}
    c.strokeStyle="#f7a8c2";c.lineWidth=16;c.beginPath();c.moveTo(440,190);c.lineTo(382,228);c.moveTo(440,190);c.lineTo(498,228);c.stroke();lung(422,-1);lung(458,1);
    c.strokeStyle="#7c3aed";c.lineWidth=5;c.beginPath();const y=437+Math.sin(simHuman.phase)*22;c.moveTo(275,y+25);c.quadraticCurveTo(440,y-35,605,y+25);c.stroke();
    // Beating heart follows a gentle second rhythm, independently of respiration.
    const heartScale=1+.065*Math.pow(Math.max(0,Math.sin(simHuman.phase*5)),8);
    c.save();c.translate(440,338);c.scale(heartScale,heartScale);c.fillStyle="#ef4444";c.strokeStyle="#be123c";c.lineWidth=4;c.beginPath();c.moveTo(0,29);c.bezierCurveTo(-60,-15,-54,-55,0,-31);c.bezierCurveTo(54,-55,60,-15,0,29);c.fill();c.stroke();c.restore();
    const incoming=Math.sin(simHuman.phase)>=0;
    for(let i=0;i<7;i++){let t=(simHuman.phase/(Math.PI*2)*1.3+i/7)%1;t=(t+1)%1;const yy=incoming?138+t*85:223-t*85;c.fillStyle=incoming?"#38bdf8":"#a78bfa";c.beginPath();c.arc(440+(i%3-1)*10,yy,3+i%2,0,Math.PI*2);c.fill();}
    c.fillStyle="#6b21a8";c.font="bold 23px sans-serif";c.textAlign="center";c.fillText("🫁",140,87);c.fillText("❤️",725,87);
    const info=simHumanInfo(); const status=root.querySelector("[data-sim-status]"); if(status&&status.textContent!==info.label)status.textContent=info.label;
    const step=root.querySelector("[data-sim-step]");if(step&&step.textContent!==info.label)step.textContent=info.label;
    const note=root.querySelector("[data-sim-note]");if(note&&note.textContent!==info.note)note.textContent=info.note;
    const rate=root.querySelector("[data-sim-rate]");if(rate){const t=`· ${simHuman.rate} ${simL("lần/phút", "breaths/min")}`;if(rate.textContent!==t)rate.textContent=t;}
  }
  function simHumanFrame(time) {
    if (!root || !root.isConnected || activeTab!=="sim" || document.hidden) {simHuman.raf=0;simHuman.last=0;return;}
    if(simHuman.running && simHuman.last){const dt=Math.min(100,time-simHuman.last);simHuman.phase+=(dt/1000)*(Math.PI*2*simHuman.rate/60);}
    simHuman.last=time;simHumanDraw();simHuman.raf=requestAnimationFrame(simHumanFrame);
  }
  function simHumanStop(){if(simHuman.raf)cancelAnimationFrame(simHuman.raf);simHuman.raf=0;simHuman.last=0;}
  function simHumanStart(){simHumanStop();if(root&&activeTab==="sim"&&!document.hidden)simHuman.raf=requestAnimationFrame(simHumanFrame);}
  function simHumanAction(action,value){
    if(action==="rate")simHuman.rate=Math.max(8,Math.min(20,Number(value)||12));
    else if(action==="toggle")simHuman.running=!simHuman.running;
    else if(action==="inhale"){simHuman.running=false;simHuman.phase=Math.PI/2;}
    else if(action==="exhale"){simHuman.running=false;simHuman.phase=Math.PI*1.5;}
    else if(action==="listen"){const info=simHumanInfo();speak("sim-human",`${simL("Bài học về nhịp thở.","Our breathing lesson.")} ${info.note} ${simL("Tim liên tục co bóp để bơm máu đi khắp cơ thể.","The heart keeps beating to pump blood around the body.")}`);return;}
    const rate=root.querySelector("[data-sim-rate-value]");if(rate)rate.textContent=simHuman.rate;
    const toggle=root.querySelector('[data-sim-action="toggle"]');if(toggle)toggle.textContent=simHuman.running?simL("⏸ Tạm dừng","⏸ Pause"):simL("▶ Tiếp tục","▶ Play");
    simHumanDraw();
  }

  function renderStage({ readQuestion = false } = {}) {
    if (!root) return;
    stopSpeak(false);
    simHumanStop();
    const stage = root.querySelector(".gx-stage");
    if (activeTab === "body" && isSense(selectedId)) selectedId = DATA.overview.id;
    if (activeTab === "organs" && !isOrgan(selectedId)) selectedId = DATA.primary[0].id;
    if (activeTab === "senses" && !isSense(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz" && activeTab !== "sim") markFound(selectedId, true);
    let html = "";
    if (activeTab === "body") html = bodyHtml();
    else if (activeTab === "organs") html = gridHtml(DATA.primary);
    else if (activeTab === "senses") html = sensesHtml();
    else if (activeTab === "sim") html = simHumanHtml();
    else html = quizHtml();
    stage.innerHTML = `<section class="gx-panel" style="height:100%">${html}</section>`;
    updateSpeakButtons();
    if (activeTab === "sim") { simHumanDraw(); simHumanStart(); }
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
    if (n === total) toast("🏆 Con đã khám phá hết cơ thể mình rồi! Giỏi quá!");
    else toast(`🩺 Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { body: "Cơ thể", organs: "Cơ quan", senses: "5 giác quan", quiz: "Hỏi đáp", sim: "Thực hành" };
  function setBanner() {
    const fn0 = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    const fn = typeof fn0 === "function" ? (o) => fn0({ ...o, items: ((o && o.items) || []).map((it) => ({ ...it, title: trText(it.title) })) }) : fn0;
    if (typeof fn !== "function") return;
    fn({ items: [{ level: 2, title: `${CONFIG.gameNumber}. ${CONFIG.title}`, action: null }, { level: 3, title: activeTab === "sim" ? simL("Thực hành", "Simulation") : TAB_LABELS[activeTab], action: null }] });
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

    root.addEventListener("input", (event) => {
      const i=event.target.closest("[data-sim-input]");
      if (i) simHumanAction(i.dataset.simInput,i.value);
    }, { signal });
    root.addEventListener("click", (event) => {
      const t = event.target;
      const simButton = t.closest("[data-sim-action]");
      if (simButton) { simHumanAction(simButton.dataset.simAction); return; }
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

    document.addEventListener("visibilitychange", () => { if (document.hidden) { stopSpeak(); simHumanStop(); } else if (activeTab === "sim") simHumanStart(); }, { signal });
  }

  function render(context) {
    activeContext = context;
    injectAssets();
    if (!document.getElementById(CONFIG.rootId + "-sim-style")) {
      const st=document.createElement("style");st.id=CONFIG.rootId + "-sim-style";
      st.textContent = `
      #human-body-explorer{box-sizing:border-box;max-width:100%}
      /* Mô phỏng thực hành tương tác dùng chung phong cách game Khám phá. */
      #human-body-explorer .gx-tabs:has([data-tab="sim"]){grid-template-columns:repeat(5,minmax(0,1fr))}
      #human-body-explorer .gx-tab[data-tab="sim"][aria-selected="true"]{background:var(--grad-alt)}
      #human-body-explorer .gx-sim{display:grid;grid-template-columns:minmax(0,1.06fr) minmax(310px,.94fr);gap:15px;align-items:stretch;min-width:0;max-width:100%;height:100%}
      #human-body-explorer .gx-sim *{box-sizing:border-box}
      #human-body-explorer .gx-sim-art{min-width:0;border:1px solid #bae6fd;border-radius:20px;overflow:hidden;background:#e0f2fe;display:flex;flex-direction:column}
      #human-body-explorer .gx-sim-art-head{padding:10px 14px;background:linear-gradient(90deg,#dbeafe,#fce7f3);color:#581c87;font-size:18px;font-weight:900;display:flex;align-items:center;gap:8px;justify-content:space-between;flex-wrap:wrap}
      #human-body-explorer .gx-sim-pill{border:1px solid #86efac;color:#047857;background:#ecfdf5;padding:3px 9px;font-size:12px;font-weight:900;border-radius:99px;white-space:nowrap}
      #human-body-explorer .gx-sim-canvas{width:100%;height:auto;max-height:510px;display:block;aspect-ratio:880/540;object-fit:contain;flex:1;min-height:0;background:#e0f2fe}
      #human-body-explorer .gx-sim-bottom{min-height:42px;padding:9px 14px;background:#fff;color:#075985;font-weight:900;font-size:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      #human-body-explorer .gx-sim-side{min-width:0;max-width:100%;display:flex;flex-direction:column;gap:10px;border:1px solid #ddd6fe;border-radius:20px;padding:17px;background:linear-gradient(155deg,#fff,#fdf4ff)}
      #human-body-explorer .gx-sim-side h3{font-size:clamp(19px,2vw,25px);font-weight:1000;line-height:1.24;color:#6b21a8;margin:0}
      #human-body-explorer .gx-sim-side p{margin:0;color:#475569;line-height:1.48;font-weight:700;font-size:15px}
      #human-body-explorer .gx-sim-label,#human-body-explorer .gx-sim-meter{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;font-size:16px;font-weight:800;color:#0f766e}
      #human-body-explorer .gx-sim-label strong,#human-body-explorer .gx-sim-meter strong{color:#7e22ce}
      #human-body-explorer .gx-sim-side input[type="range"]{width:100%;height:28px;accent-color:#0d9488;cursor:pointer;touch-action:pan-y}
      #human-body-explorer .gx-sim-progress{width:100%;height:12px;background:#e0f2fe;border-radius:99px;overflow:hidden;border:1px solid #bae6fd}
      #human-body-explorer .gx-sim-progress>span{display:block;background:linear-gradient(90deg,#3b82f6,#14b8a6);height:100%;border-radius:99px;transition:width .15s}
      #human-body-explorer .gx-sim-progress.is-cloud>span{background:linear-gradient(90deg,#a78bfa,#64748b)}
      #human-body-explorer .gx-sim-buttons{display:flex;gap:8px;flex-wrap:wrap}
      #human-body-explorer .gx-sim-buttons button,#human-body-explorer .gx-sim-listen{font-family:inherit;font-size:16px;font-weight:800;min-height:43px;padding:7px 12px;border:1px solid #bfdbfe;border-radius:12px;background:#fff;color:#1d4ed8;cursor:pointer;line-height:1.25}
      #human-body-explorer .gx-sim-buttons .gx-sim-primary{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}
      #human-body-explorer .gx-sim-listen{background:#ecfdf5;border-color:#6ee7b7;color:#047857;align-self:flex-start}
      #human-body-explorer .gx-sim-buttons button:focus-visible,#human-body-explorer .gx-sim-listen:focus-visible{outline:3px solid #93c5fd;outline-offset:2px}
      #human-body-explorer .gx-sim-explain{border:1px solid #f9a8d4;background:#fff1f7;border-radius:16px;padding:12px;min-height:106px}
      #human-body-explorer .gx-sim-explain b{color:#be185d;font-size:18px}
      #human-body-explorer .gx-sim-explain p{color:#7e225d;font-weight:700;margin-top:5px}
      #human-body-explorer .gx-sim-side .gx-sim-fine{font-size:12.5px;color:#64748b}
      @media(max-width:850px){#human-body-explorer .gx-tabs:has([data-tab="sim"]){grid-template-columns:repeat(3,minmax(0,1fr))}#human-body-explorer .gx-sim{grid-template-columns:1fr;height:auto}#human-body-explorer .gx-sim-canvas{flex:none}#human-body-explorer .gx-sim-art-head{font-size:16px}}
      @media(max-width:520px){#human-body-explorer .gx-tabs:has([data-tab="sim"]){grid-template-columns:repeat(2,minmax(0,1fr))}#human-body-explorer .gx-sim-side{padding:12px;gap:9px}#human-body-explorer .gx-sim-buttons button{font-size:14px;min-height:43px}#human-body-explorer .gx-sim-art-head{padding:8px 10px}#human-body-explorer .gx-sim-canvas{max-height:none}}
`;
      document.head.appendChild(st);
    }
    activeTab = "body";
    selectedId = DATA.overview.id;
    quiz = null;
    found = loadFound();
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `
      <header class="gx-head">
        <div class="gx-logo" aria-hidden="true">${BODY_ICON}</div>
        <div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div>
        ${langHtml()}<div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="body" type="button" aria-selected="true">🧍 Cơ thể</button>
        <button class="gx-tab" role="tab" data-tab="organs" type="button" aria-selected="false" tabindex="-1">🫀 Cơ quan</button>
        <button class="gx-tab" role="tab" data-tab="senses" type="button" aria-selected="false" tabindex="-1">👀 5 giác quan</button>
        <button class="gx-tab" role="tab" data-tab="sim" type="button" aria-selected="false" tabindex="-1">🫁 Nhịp thở</button>
        <button class="gx-tab" role="tab" data-tab="quiz" type="button" aria-selected="false" tabindex="-1">⭐ Hỏi đáp</button>
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
    simHumanStop();
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
