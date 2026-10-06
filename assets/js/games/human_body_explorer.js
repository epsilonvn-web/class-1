(() => {
  "use strict";

  const CONFIG = Object.freeze({"moduleKey":"humanBodyExplorer","styleId":"class1-game-human-body-explorer-style","rootId":"human-body-explorer","gameNumber":12,"title":"Khám phá cơ thể người","subtitle":"Cùng Cô Thỏ Hồng tìm hiểu cơ thể tuyệt vời của chúng ta","overviewId":"body-overview","primaryTab":"Cơ quan","secondaryTab":"5 giác quan","primaryIcon":"🫀","secondaryIcon":"👁️","logoSvg":"<svg viewBox=\"0 0 80 80\"><circle cx=\"40\" cy=\"17\" r=\"10\" fill=\"#FDBA74\"/><path d=\"M28 30h24l6 29-9 3-3 15H34l-3-15-9-3z\" fill=\"#F9A8D4\"/><path d=\"M29 34L15 58m36-24 14 24\" stroke=\"#FDBA74\" stroke-width=\"8\" stroke-linecap=\"round\"/><path d=\"M36 38c-8 1-9 10-3 14 5 4 7 5 7 5s4-1 8-5c6-5 4-13-4-14-3 0-4 2-4 4-1-2-2-4-4-4z\" fill=\"#FB7185\"/></svg>"});
  const DATA = Object.freeze({"overview":{"id":"body-overview","name":"Cơ thể của chúng ta","kicker":"KHÁM PHÁ CƠ THỂ NGƯỜI","subtitle":"Nhiều bộ phận cùng làm việc","summary":"Cơ thể người gồm nhiều cơ quan và hệ cơ quan cùng phối hợp để chúng ta suy nghĩ, thở, vận động, tiêu hóa thức ăn, cảm nhận thế giới và lớn lên mỗi ngày.","more":"Não nhận và xử lý thông tin; tim bơm máu; phổi trao đổi khí; hệ tiêu hóa xử lý thức ăn; thận giúp lọc máu; các giác quan giúp chúng ta nhìn, nghe, ngửi, nếm và cảm nhận sự chạm.","remember":"Bé nhớ nhé: không có cơ quan nào làm việc một mình. Cơ thể khỏe mạnh là nhờ nhiều bộ phận phối hợp với nhau.","speech":"Cơ thể người có nhiều cơ quan cùng làm việc. Não giúp điều khiển cơ thể, tim bơm máu, phổi giúp trao đổi khí, hệ tiêu hóa xử lý thức ăn và năm giác quan giúp chúng ta cảm nhận thế giới xung quanh.","art":"body","facts":[{"label":"Điều khiển","value":"Não và hệ thần kinh"},{"label":"Bơm máu","value":"Tim"},{"label":"Trao đổi khí","value":"Phổi"},{"label":"Tiêu hóa","value":"Dạ dày và ruột"},{"label":"Lọc máu","value":"Thận"},{"label":"Cảm nhận","value":"5 giác quan"}]},"primary":[{"id":"brain","name":"Não","kicker":"CƠ QUAN","subtitle":"Trung tâm điều khiển","summary":"Não nằm trong hộp sọ và là trung tâm rất quan trọng của hệ thần kinh.","more":"Não giúp chúng ta suy nghĩ, ghi nhớ, học tập, cảm nhận và điều khiển nhiều hoạt động của cơ thể. Não nhận thông tin từ các giác quan rồi đưa ra phản ứng phù hợp.","remember":"Não giúp suy nghĩ, ghi nhớ và điều khiển nhiều hoạt động.","speech":"Não nằm trong hộp sọ. Não giúp chúng ta suy nghĩ, học tập, ghi nhớ và điều khiển nhiều hoạt động của cơ thể.","art":"brain","facts":[{"label":"Vị trí","value":"Trong hộp sọ"},{"label":"Vai trò","value":"Xử lý thông tin và điều khiển"},{"label":"Làm việc với","value":"Các dây thần kinh và giác quan"},{"label":"Giúp chúng ta","value":"Suy nghĩ, học, nhớ, vận động"}]},{"id":"heart","name":"Tim","kicker":"CƠ QUAN","subtitle":"Máy bơm của cơ thể","summary":"Tim là một cơ quan bằng cơ, co bóp liên tục để đẩy máu đi khắp cơ thể.","more":"Máu mang ôxy và chất dinh dưỡng tới các tế bào rồi mang nhiều chất thải đi khỏi chúng. Tim có bốn ngăn và hoạt động cả ngày lẫn đêm.","remember":"Tim co bóp để bơm máu đi khắp cơ thể.","speech":"Tim là một cơ quan bằng cơ. Tim co bóp liên tục để bơm máu đi khắp cơ thể, mang ôxy và chất dinh dưỡng tới các tế bào.","art":"heart","facts":[{"label":"Vị trí","value":"Trong lồng ngực, hơi lệch trái"},{"label":"Vai trò","value":"Bơm máu"},{"label":"Số ngăn","value":"4 ngăn"},{"label":"Hoạt động","value":"Co bóp liên tục"}]},{"id":"lungs","name":"Phổi","kicker":"CƠ QUAN","subtitle":"Trao đổi khí","summary":"Hai lá phổi nằm trong lồng ngực và làm việc cùng hệ hô hấp.","more":"Khi hít vào, không khí đi vào phổi. Ôxy từ không khí đi vào máu, còn carbon dioxide từ máu được đưa ra ngoài khi chúng ta thở ra.","remember":"Phổi giúp đưa ôxy vào cơ thể và thải carbon dioxide ra ngoài.","speech":"Phổi nằm trong lồng ngực. Khi chúng ta hít thở, phổi giúp ôxy đi vào máu và đưa carbon dioxide ra ngoài.","art":"lungs","facts":[{"label":"Vị trí","value":"Trong lồng ngực"},{"label":"Số lượng","value":"2 lá phổi"},{"label":"Vai trò","value":"Trao đổi khí"},{"label":"Khí cơ thể cần","value":"Ôxy"},{"label":"Khí thải ra","value":"Carbon dioxide"}]},{"id":"stomach","name":"Dạ dày","kicker":"CƠ QUAN","subtitle":"Túi trộn thức ăn","summary":"Dạ dày là một cơ quan của hệ tiêu hóa, nhận thức ăn sau khi chúng ta nuốt.","more":"Dạ dày co bóp và trộn thức ăn với dịch tiêu hóa, biến thức ăn thành hỗn hợp mềm hơn trước khi chuyển xuống ruột non.","remember":"Dạ dày trộn và nghiền thức ăn bằng co bóp cùng dịch tiêu hóa.","speech":"Dạ dày thuộc hệ tiêu hóa. Nó co bóp và trộn thức ăn với dịch tiêu hóa trước khi chuyển thức ăn xuống ruột non.","art":"stomach","facts":[{"label":"Hệ","value":"Tiêu hóa"},{"label":"Nhận thức ăn từ","value":"Thực quản"},{"label":"Vai trò","value":"Trộn, co bóp và tiêu hóa một phần"},{"label":"Chuyển tiếp tới","value":"Ruột non"}]},{"id":"liver","name":"Gan","kicker":"CƠ QUAN","subtitle":"Nhà máy hóa học lớn","summary":"Gan là một cơ quan lớn nằm ở phần trên bên phải của bụng.","more":"Gan thực hiện rất nhiều nhiệm vụ: xử lý chất dinh dưỡng, dự trữ năng lượng, tạo mật giúp tiêu hóa chất béo và giúp cơ thể xử lý nhiều chất trong máu.","remember":"Gan làm rất nhiều việc, trong đó có tạo mật và xử lý chất dinh dưỡng.","speech":"Gan là một cơ quan lớn trong bụng. Gan xử lý chất dinh dưỡng, dự trữ năng lượng và tạo mật giúp cơ thể tiêu hóa chất béo.","art":"liver","facts":[{"label":"Vị trí","value":"Phần trên bên phải bụng"},{"label":"Vai trò","value":"Xử lý chất dinh dưỡng"},{"label":"Tạo","value":"Mật"},{"label":"Dự trữ","value":"Một phần năng lượng và chất dinh dưỡng"}]},{"id":"small-intestine","name":"Ruột non","kicker":"CƠ QUAN","subtitle":"Hấp thu phần lớn chất dinh dưỡng","summary":"Ruột non là một ống dài cuộn nhiều vòng trong bụng.","more":"Tại đây thức ăn tiếp tục được tiêu hóa và phần lớn chất dinh dưỡng được hấp thu qua thành ruột vào cơ thể.","remember":"Ruột non là nơi hấp thu phần lớn chất dinh dưỡng từ thức ăn.","speech":"Ruột non là một ống dài cuộn trong bụng. Đây là nơi thức ăn tiếp tục được tiêu hóa và phần lớn chất dinh dưỡng được hấp thu.","art":"small-intestine","facts":[{"label":"Hệ","value":"Tiêu hóa"},{"label":"Nằm sau","value":"Dạ dày"},{"label":"Vai trò chính","value":"Tiêu hóa tiếp và hấp thu chất dinh dưỡng"},{"label":"Hình dạng","value":"Ống dài cuộn nhiều vòng"}]},{"id":"large-intestine","name":"Ruột già","kicker":"CƠ QUAN","subtitle":"Hấp thu nước và tạo phân","summary":"Ruột già nhận phần thức ăn còn lại sau ruột non.","more":"Ruột già hấp thu thêm nước và một số chất, đồng thời biến phần còn lại thành phân để cơ thể đào thải ra ngoài.","remember":"Ruột già hấp thu thêm nước từ phần thức ăn còn lại.","speech":"Ruột già thuộc hệ tiêu hóa. Nó hấp thu thêm nước và giúp tạo phân từ phần thức ăn cơ thể không dùng hết.","art":"large-intestine","facts":[{"label":"Hệ","value":"Tiêu hóa"},{"label":"Nằm sau","value":"Ruột non"},{"label":"Vai trò","value":"Hấp thu thêm nước"},{"label":"Kết quả","value":"Tạo phân từ phần còn lại"}]},{"id":"kidneys","name":"Thận","kicker":"CƠ QUAN","subtitle":"Bộ lọc của cơ thể","summary":"Hai quả thận nằm ở phía sau bụng, mỗi bên cột sống một quả.","more":"Thận lọc máu, loại bỏ nhiều chất thải và nước dư để tạo nước tiểu. Thận cũng giúp cân bằng nước và muối khoáng trong cơ thể.","remember":"Có 2 quả thận; chúng lọc máu và tạo nước tiểu.","speech":"Thận là hai cơ quan giúp lọc máu. Chúng loại bỏ chất thải và nước dư để tạo nước tiểu, đồng thời giúp cân bằng nước và muối trong cơ thể.","art":"kidneys","facts":[{"label":"Số lượng","value":"2"},{"label":"Vị trí","value":"Phía sau bụng, hai bên cột sống"},{"label":"Vai trò","value":"Lọc máu"},{"label":"Tạo","value":"Nước tiểu"},{"label":"Giúp cân bằng","value":"Nước và muối khoáng"}]},{"id":"skin","name":"Da","kicker":"CƠ QUAN","subtitle":"Lớp bảo vệ lớn nhất","summary":"Da bao phủ bên ngoài cơ thể và là cơ quan lớn nhất của con người.","more":"Da giúp bảo vệ cơ thể khỏi môi trường, hạn chế mất nước, hỗ trợ điều hòa nhiệt độ và chứa nhiều thụ thể giúp ta cảm nhận nóng, lạnh, chạm và đau.","remember":"Da vừa bảo vệ cơ thể vừa giúp chúng ta cảm nhận sự chạm và nhiệt độ.","speech":"Da là cơ quan lớn nhất và bao phủ bên ngoài cơ thể. Da giúp bảo vệ, điều hòa nhiệt và cảm nhận sự chạm, nóng, lạnh.","art":"skin","facts":[{"label":"Vị trí","value":"Bao phủ toàn cơ thể"},{"label":"Vai trò","value":"Bảo vệ"},{"label":"Điều hòa","value":"Nhiệt độ"},{"label":"Giác quan","value":"Xúc giác"},{"label":"Cảm nhận","value":"Chạm, nóng, lạnh, đau"}]}],"secondary":[{"id":"eyes","name":"Mắt","kicker":"5 GIÁC QUAN","subtitle":"Thị giác – nhìn","summary":"Mắt nhận ánh sáng từ môi trường và gửi tín hiệu về não để tạo nên hình ảnh chúng ta nhìn thấy.","more":"Đồng tử thay đổi kích thước để kiểm soát lượng ánh sáng đi vào. Võng mạc ở phía sau mắt chứa các tế bào nhạy sáng.","remember":"Mắt giúp nhìn; não giúp xử lý tín hiệu để ta hiểu hình ảnh.","speech":"Mắt là cơ quan của thị giác. Mắt nhận ánh sáng rồi gửi tín hiệu tới não để chúng ta nhìn thấy thế giới.","art":"eyes","facts":[{"label":"Giác quan","value":"Thị giác"},{"label":"Cảm nhận","value":"Ánh sáng, màu sắc, hình dạng"},{"label":"Gửi tín hiệu tới","value":"Não"},{"label":"Bộ phận điều chỉnh ánh sáng","value":"Đồng tử"}]},{"id":"ears","name":"Tai","kicker":"5 GIÁC QUAN","subtitle":"Thính giác – nghe","summary":"Tai thu nhận sóng âm trong không khí và biến chúng thành tín hiệu gửi tới não.","more":"Tai trong còn giúp cơ thể giữ thăng bằng. Vì vậy tai không chỉ quan trọng với nghe mà còn hỗ trợ chúng ta đứng và di chuyển ổn định.","remember":"Tai giúp nghe và tai trong còn tham gia giữ thăng bằng.","speech":"Tai là cơ quan của thính giác. Tai nhận âm thanh và gửi tín hiệu tới não. Tai trong còn giúp giữ thăng bằng.","art":"ears","facts":[{"label":"Giác quan","value":"Thính giác"},{"label":"Cảm nhận","value":"Âm thanh"},{"label":"Gửi tín hiệu tới","value":"Não"},{"label":"Tai trong","value":"Giúp giữ thăng bằng"}]},{"id":"nose","name":"Mũi","kicker":"5 GIÁC QUAN","subtitle":"Khứu giác – ngửi","summary":"Mũi chứa các tế bào có thể nhận biết nhiều phân tử mùi khác nhau trong không khí.","more":"Khứu giác liên quan chặt chẽ với vị giác. Khi bị nghẹt mũi, thức ăn thường có cảm giác kém ngon hơn vì ta ngửi mùi kém.","remember":"Mũi giúp ngửi và phối hợp với lưỡi để cảm nhận hương vị thức ăn.","speech":"Mũi là cơ quan của khứu giác. Mũi giúp chúng ta ngửi mùi và khứu giác còn phối hợp với vị giác khi ăn.","art":"nose","facts":[{"label":"Giác quan","value":"Khứu giác"},{"label":"Cảm nhận","value":"Mùi"},{"label":"Phối hợp nhiều với","value":"Vị giác"},{"label":"Tín hiệu gửi tới","value":"Não"}]},{"id":"tongue","name":"Lưỡi","kicker":"5 GIÁC QUAN","subtitle":"Vị giác – nếm","summary":"Lưỡi có nhiều nụ vị giác giúp nhận biết các vị cơ bản trong thức ăn.","more":"Các vị cơ bản thường được nhắc tới gồm ngọt, chua, mặn, đắng và umami. Mùi từ mũi cũng góp phần rất lớn vào cảm giác hương vị.","remember":"Lưỡi giúp nếm; mũi cũng góp phần làm nên hương vị khi ăn.","speech":"Lưỡi giúp chúng ta nếm thức ăn. Các nụ vị giác nhận biết những vị cơ bản như ngọt, chua, mặn, đắng và umami.","art":"tongue","facts":[{"label":"Giác quan","value":"Vị giác"},{"label":"Cảm nhận","value":"Vị"},{"label":"Vị cơ bản","value":"Ngọt, chua, mặn, đắng, umami"},{"label":"Phối hợp nhiều với","value":"Mũi"}]},{"id":"touch","name":"Da – xúc giác","kicker":"5 GIÁC QUAN","subtitle":"Xúc giác – chạm","summary":"Các thụ thể trong da giúp chúng ta cảm nhận sự chạm, áp lực, rung, nóng, lạnh và đau.","more":"Nhờ xúc giác, chúng ta biết một vật mềm hay cứng, nóng hay lạnh và có thể phản ứng nhanh khi chạm phải vật gây đau.","remember":"Da không chỉ bảo vệ mà còn là cơ quan quan trọng của xúc giác.","speech":"Da giúp chúng ta cảm nhận sự chạm, áp lực, nóng, lạnh và đau. Đó là xúc giác.","art":"touch","facts":[{"label":"Giác quan","value":"Xúc giác"},{"label":"Cơ quan","value":"Da"},{"label":"Cảm nhận","value":"Chạm, áp lực, rung, nóng, lạnh, đau"},{"label":"Vai trò","value":"Giúp phản ứng với môi trường"}]}],"quiz":[{"q":"Cơ quan nào giúp điều khiển nhiều hoạt động của cơ thể?","a":["Não","Dạ dày","Thận","Gan"],"c":0,"note":"Não là trung tâm quan trọng của hệ thần kinh."},{"q":"Cơ quan nào bơm máu đi khắp cơ thể?","a":["Phổi","Tim","Ruột non","Mũi"],"c":1,"note":"Tim co bóp để bơm máu."},{"q":"Cơ quan nào giúp trao đổi ôxy và carbon dioxide?","a":["Phổi","Gan","Dạ dày","Da"],"c":0,"note":"Phổi giúp trao đổi khí."},{"q":"Hệ nào xử lý thức ăn?","a":["Hệ tiêu hóa","Hệ Mặt Trời","Hệ thống sông","Hệ âm thanh"],"c":0,"note":"Hệ tiêu hóa xử lý thức ăn."},{"q":"Cơ quan nào lọc máu và tạo nước tiểu?","a":["Thận","Mắt","Tim","Lưỡi"],"c":0,"note":"Thận lọc máu và tạo nước tiểu."},{"q":"Cơ quan lớn nhất của cơ thể là gì?","a":["Da","Tim","Não","Dạ dày"],"c":0,"note":"Da là cơ quan lớn nhất của cơ thể người."},{"q":"Cơ thể hoạt động tốt nhờ điều gì?","a":["Nhiều cơ quan phối hợp với nhau","Chỉ riêng tim","Chỉ riêng não","Chỉ riêng phổi"],"c":0,"note":"Các cơ quan và hệ cơ quan phối hợp với nhau."},{"q":"Não nằm ở đâu?","a":["Trong hộp sọ","Trong bàn chân","Trong dạ dày","Ngoài cơ thể"],"c":0,"note":"Não nằm trong hộp sọ."},{"q":"Não giúp chúng ta làm gì?","a":["Suy nghĩ và ghi nhớ","Lọc máu","Nhai thức ăn","Bơm máu"],"c":0,"note":"Não giúp suy nghĩ, học tập và ghi nhớ."},{"q":"Tim chủ yếu được cấu tạo bởi loại mô nào?","a":["Cơ","Xương","Tóc","Men răng"],"c":0,"note":"Tim là một cơ quan bằng cơ."},{"q":"Tim có bao nhiêu ngăn?","a":["2","3","4","8"],"c":2,"note":"Tim người có 4 ngăn."},{"q":"Con người có mấy lá phổi?","a":["1","2","3","4"],"c":1,"note":"Chúng ta có hai lá phổi."},{"q":"Khí nào cơ thể lấy vào từ không khí?","a":["Ôxy","Carbon dioxide","Khói","Hơi dầu"],"c":0,"note":"Phổi giúp ôxy đi vào máu."},{"q":"Dạ dày nhận thức ăn từ đâu?","a":["Thực quản","Phổi","Thận","Tai"],"c":0,"note":"Thức ăn đi qua thực quản tới dạ dày."},{"q":"Dạ dày làm gì với thức ăn?","a":["Co bóp và trộn với dịch tiêu hóa","Bơm máu","Tạo âm thanh","Nhìn màu sắc"],"c":0,"note":"Dạ dày trộn thức ăn với dịch tiêu hóa."},{"q":"Gan nằm chủ yếu ở đâu?","a":["Phần trên bên phải bụng","Trong đầu","Trong bàn tay","Trong tai"],"c":0,"note":"Gan nằm ở phần trên bên phải của bụng."},{"q":"Gan tạo chất nào giúp tiêu hóa chất béo?","a":["Mật","Nước mắt","Mồ hôi","Không khí"],"c":0,"note":"Gan tạo mật."},{"q":"Phần lớn chất dinh dưỡng được hấp thu ở đâu?","a":["Ruột non","Tai","Tim","Da"],"c":0,"note":"Ruột non hấp thu phần lớn chất dinh dưỡng."},{"q":"Ruột non nằm sau cơ quan nào trong đường tiêu hóa?","a":["Dạ dày","Phổi","Mũi","Não"],"c":0,"note":"Thức ăn từ dạ dày đi xuống ruột non."},{"q":"Ruột già hấp thu thêm gì?","a":["Nước","Ánh sáng","Âm thanh","Không khí"],"c":0,"note":"Ruột già hấp thu thêm nước."},{"q":"Ruột già nằm sau phần nào của hệ tiêu hóa?","a":["Ruột non","Não","Tim","Phổi"],"c":0,"note":"Phần còn lại từ ruột non đi tới ruột già."},{"q":"Con người thường có bao nhiêu quả thận?","a":["1","2","3","4"],"c":1,"note":"Thông thường có hai quả thận."},{"q":"Thận giúp cân bằng gì trong cơ thể?","a":["Nước và muối khoáng","Âm thanh","Ánh sáng","Màu tóc"],"c":0,"note":"Thận giúp cân bằng nước và muối khoáng."},{"q":"Da giúp bảo vệ điều gì?","a":["Cơ thể","Mặt Trời","Đại dương","Mây"],"c":0,"note":"Da là lớp bảo vệ bên ngoài cơ thể."},{"q":"Da giúp cảm nhận điều gì?","a":["Chạm, nóng, lạnh","Âm thanh từ xa","Mùi bằng mũi","Vị bằng lưỡi"],"c":0,"note":"Da chứa các thụ thể xúc giác."},{"q":"Mắt là cơ quan của giác quan nào?","a":["Thị giác","Thính giác","Khứu giác","Vị giác"],"c":0,"note":"Mắt là cơ quan của thị giác."},{"q":"Mắt nhận loại tín hiệu nào từ môi trường?","a":["Ánh sáng","Mùi","Vị","Nước tiểu"],"c":0,"note":"Mắt nhận ánh sáng."},{"q":"Tín hiệu từ mắt được gửi tới đâu để xử lý?","a":["Não","Dạ dày","Gan","Thận"],"c":0,"note":"Não xử lý tín hiệu từ mắt."},{"q":"Tai là cơ quan của giác quan nào?","a":["Thính giác","Thị giác","Vị giác","Khứu giác"],"c":0,"note":"Tai là cơ quan của thính giác."},{"q":"Tai nhận gì từ môi trường?","a":["Sóng âm","Ánh sáng","Vị","Màu"],"c":0,"note":"Tai thu nhận sóng âm."},{"q":"Tai trong còn giúp cơ thể làm gì?","a":["Giữ thăng bằng","Tiêu hóa","Bơm máu","Lọc máu"],"c":0,"note":"Tai trong giúp giữ thăng bằng."},{"q":"Mũi là cơ quan của giác quan nào?","a":["Khứu giác","Thị giác","Thính giác","Xúc giác"],"c":0,"note":"Mũi là cơ quan của khứu giác."},{"q":"Mũi giúp ta cảm nhận gì?","a":["Mùi","Ánh sáng","Âm thanh","Nhiệt độ cơ thể"],"c":0,"note":"Mũi giúp nhận biết mùi."},{"q":"Khứu giác phối hợp mạnh với giác quan nào khi ăn?","a":["Vị giác","Thị giác","Thính giác","Xúc giác chân"],"c":0,"note":"Mùi và vị cùng góp phần tạo cảm giác hương vị."},{"q":"Lưỡi là cơ quan chính của giác quan nào?","a":["Vị giác","Thính giác","Thị giác","Khứu giác"],"c":0,"note":"Lưỡi có các nụ vị giác."},{"q":"Vị nào sau đây là một vị cơ bản?","a":["Ngọt","Ồn","Sáng","Mềm"],"c":0,"note":"Ngọt là một vị cơ bản."},{"q":"Mùi từ mũi có ảnh hưởng tới cảm giác hương vị không?","a":["Có","Không bao giờ","Chỉ khi ngủ","Chỉ dưới nước"],"c":0,"note":"Khứu giác đóng vai trò lớn trong cảm nhận hương vị."},{"q":"Cơ quan chính của xúc giác là gì?","a":["Da","Tim","Gan","Phổi"],"c":0,"note":"Da là cơ quan quan trọng của xúc giác."},{"q":"Xúc giác giúp cảm nhận điều nào?","a":["Chạm và nhiệt độ","Chỉ màu sắc","Chỉ âm thanh","Chỉ mùi"],"c":0,"note":"Xúc giác cảm nhận chạm, áp lực, nóng, lạnh và đau."},{"q":"Cảm giác đau có ích ở điểm nào?","a":["Cảnh báo cơ thể về nguy cơ tổn thương","Giúp nhìn rõ hơn","Giúp nghe to hơn","Tạo nước tiểu"],"c":0,"note":"Đau là một tín hiệu giúp cơ thể nhận biết nguy cơ tổn thương."}]});
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
      .ex-tab{min-height:46px;border:1px solid;border-radius:15px;font-size:15px;font-weight:950!important;box-shadow:0 3px 8px rgba(76,29,149,.05);transition:.15s ease}
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
      case "brain":return `<svg viewBox="0 0 80 80"><path d="M24 51c-13-4-12-22-3-27-2-11 13-17 20-9 10-9 23-1 22 10 10 5 8 20 1 24-5 9-18 12-25 6-5 3-9 3-14-1z" fill="#F9A8D4" stroke="#DB2777" stroke-width="2"/><path d="M31 24q9 6 3 14m13-19q-7 8 0 15m9 5q-9 2-8 11" fill="none" stroke="#BE185D" stroke-width="2"/></svg>`;
      case "heart":return `<svg viewBox="0 0 80 80"><path d="M40 66C9 47 13 20 29 18c7-1 11 4 11 9 1-6 5-10 12-10 18 1 21 28-12 49z" fill="#FB7185" stroke="#BE123C" stroke-width="2"/><path d="M37 18v-8m7 9 5-10" stroke="#BE123C" stroke-width="4"/></svg>`;
      case "lungs":return `<svg viewBox="0 0 80 80"><path d="M37 18v45M43 18v45" stroke="#94A3B8" stroke-width="4"/><path d="M35 30c-18-7-23 7-20 24 3 13 11 17 20 11zM45 30c18-7 23 7 20 24-3 13-11 17-20 11z" fill="#FCA5A5" stroke="#EF4444" stroke-width="2"/></svg>`;
      case "stomach":return `<svg viewBox="0 0 80 80"><path d="M32 12c0 18-4 19-9 28-6 11 0 27 15 30 17 3 31-8 28-24-2-9-10-11-18-8-8 3-9-9-8-26z" fill="#FDBA74" stroke="#EA580C" stroke-width="2"/></svg>`;
      case "liver":return `<svg viewBox="0 0 80 80"><path d="M13 32c13-20 45-21 57-5 7 10 2 23-11 28-17 7-33 5-44-3-7-6-8-13-2-20z" fill="#B45309" stroke="#7C2D12" stroke-width="2"/></svg>`;
      case "small-intestine":return `<svg viewBox="0 0 80 80"><rect x="13" y="13" width="54" height="54" rx="14" fill="#FDE2E8" stroke="#F472B6" stroke-width="4"/><path d="M27 25q25 0 25 9t-25 9q-8 0-8 8t26 8" fill="none" stroke="#DB2777" stroke-width="5" stroke-linecap="round"/></svg>`;
      case "large-intestine":return `<svg viewBox="0 0 80 80"><path d="M20 18h40v44H20z" fill="none" stroke="#A855F7" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M29 29h22v23H29" fill="none" stroke="#E9D5FF" stroke-width="4"/></svg>`;
      case "kidneys":return `<svg viewBox="0 0 80 80"><path d="M29 18c-14 2-18 18-12 30 4 9 12 10 18 4 6-6 1-16-2-23-2-5 0-8-4-11zM51 18c14 2 18 18 12 30-4 9-12 10-18 4-6-6-1-16 2-23 2-5 0-8 4-11z" fill="#C084FC" stroke="#7E22CE" stroke-width="2"/><path d="M33 49v18m14-18v18" stroke="#F9A8D4" stroke-width="3"/></svg>`;
      case "skin":return `<svg viewBox="0 0 80 80"><rect x="10" y="15" width="60" height="18" rx="7" fill="#FDBA74"/><rect x="10" y="33" width="60" height="16" fill="#FCA5A5"/><rect x="10" y="49" width="60" height="16" rx="6" fill="#FDE68A"/><path d="M25 15q0-13 8-13m22 13q0-10 7-13" stroke="#7C2D12" stroke-width="2"/></svg>`;
      case "eyes":return `<svg viewBox="0 0 80 80"><path d="M8 40q32-28 64 0-32 28-64 0z" fill="#fff" stroke="#64748B" stroke-width="2"/><circle cx="40" cy="40" r="14" fill="#60A5FA"/><circle cx="40" cy="40" r="7" fill="#111827"/><circle cx="35" cy="34" r="3" fill="#fff"/></svg>`;
      case "ears":return `<svg viewBox="0 0 80 80"><path d="M48 13c-20-7-34 8-31 25 2 11 11 13 14 22 2 7 11 9 17 3 7-7 0-12 3-20 2-6 10-8 10-17 0-7-5-11-13-13z" fill="#FDBA74" stroke="#EA580C" stroke-width="2"/><path d="M45 28c-11-6-19 8-10 15 7 5-4 13 5 15" fill="none" stroke="#C2410C" stroke-width="3"/></svg>`;
      case "nose":return `<svg viewBox="0 0 80 80"><path d="M42 12c-2 15-3 24-10 37-5 9 1 17 10 15 6 5 15 3 17-4" fill="#FDBA74" stroke="#EA580C" stroke-width="3"/><circle cx="48" cy="58" r="2"/><circle cx="38" cy="58" r="2"/></svg>`;
      case "tongue":return `<svg viewBox="0 0 80 80"><path d="M14 30q26 18 52 0-2 33-26 36-24-3-26-36z" fill="#FCA5A5" stroke="#BE123C" stroke-width="2"/><path d="M40 42v21" stroke="#DB2777" stroke-width="2"/></svg>`;
      case "touch":return `<svg viewBox="0 0 80 80"><path d="M29 61V27c0-7 9-7 9 0v17-26c0-7 9-7 9 0v26-22c0-7 9-7 9 0v24-15c0-7 9-7 9 0v21c0 15-13 21-23 18-8-2-13-4-20-10-7-6-1-14 6-9l9 6" fill="#FDBA74" stroke="#C2410C" stroke-width="2"/></svg>`;
      default:return `<svg viewBox="0 0 80 80"><circle cx="40" cy="20" r="11" fill="#FDBA74"/><path d="M27 34h26l6 33H21z" fill="#60A5FA"/></svg>`;
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
    return `<svg viewBox="0 0 700 500" preserveAspectRatio="xMidYMid meet" aria-label="Sơ đồ cơ thể người"><defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1F7"/><stop offset="1" stop-color="#EFF8FF"/></linearGradient></defs><rect width="700" height="500" fill="url(#hg)"/><g transform="translate(210 30)"><circle cx="120" cy="55" r="42" fill="#FDBA74"/><path d="M82 108q38-28 76 0l28 140-22 7-8 180H84l-8-180-22-7z" fill="#FDE2E8" stroke="#F9A8D4" stroke-width="3"/><path d="M80 125L32 270m128-145 48 145" stroke="#FDBA74" stroke-width="22" stroke-linecap="round"/><path d="M100 434L88 486m64-52 12 52" stroke="#FDBA74" stroke-width="22" stroke-linecap="round"/><path d="M100 45q20-18 40 0" fill="#F9A8D4"/><path d="M120 120c-17 1-22 18-14 30 7 9 14 11 14 11s9-2 15-11c8-12 2-29-15-30z" fill="#FB7185"/><path d="M88 150c-22-8-32 12-27 35 4 17 15 21 27 13zM152 150c22-8 32 12 27 35-4 17-15 21-27 13z" fill="#FCA5A5"/><path d="M110 196c0 18-4 19-9 29-5 10 1 22 13 24 15 2 25-7 23-20-2-7-8-10-15-7-5 2-5-12-4-26z" fill="#FDBA74"/><path d="M84 247c13-12 57-13 73 1 9 9 1 22-12 25-27 7-51 1-60-8-6-6-6-12-1-18z" fill="#B45309"/><path d="M93 282q27-13 54 0v84H93z" fill="none" stroke="#A855F7" stroke-width="8"/></g><g fill="#5B216E" font-family="Arial" font-weight="700" font-size="17"><text x="25" y="70">Não</text><text x="25" y="145">Tim</text><text x="25" y="205">Phổi</text><text x="535" y="190">Dạ dày</text><text x="535" y="260">Gan</text><text x="535" y="330">Ruột</text></g><g stroke="#A855F7" stroke-width="2"><path d="M65 65L310 80"/><path d="M65 140L330 160"/><path d="M65 200L290 205"/><path d="M525 185L335 250"/><path d="M525 255L310 285"/><path d="M525 325L330 350"/></g></svg><button type="button" data-object="brain" style="left:38%;top:8%;width:18%;height:17%" aria-label="Não"></button><button type="button" data-object="heart" style="left:44%;top:27%;width:12%;height:14%" aria-label="Tim"></button><button type="button" data-object="lungs" style="left:35%;top:30%;width:27%;height:18%" aria-label="Phổi"></button><button type="button" data-object="stomach" style="left:45%;top:45%;width:15%;height:15%" aria-label="Dạ dày"></button><button type="button" data-object="liver" style="left:38%;top:53%;width:25%;height:13%" aria-label="Gan"></button><button type="button" data-object="small-intestine" style="left:39%;top:61%;width:25%;height:18%" aria-label="Ruột non"></button>`;
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
