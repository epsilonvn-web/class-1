(() => {
  "use strict";

  /* =====================================================================
     Khám phá thực vật — bản nâng cấp
     Giữ nguyên giao diện module: window.CLASS1_GAME_MODULES.plantExplorer
     = { render(context), destroy() }, context.host, context.hooks.setSubBanner
     ===================================================================== */

  const CONFIG = Object.freeze({
    moduleKey: "plantExplorer",
    styleId: "class1-game-plant-explorer-style-v2",
    fontId: "class1-game-explorer-font",
    rootId: "plant-explorer",
    gameNumber: 1,
    title: "Khám phá thực vật",
    subtitle: "Cùng Cô Thỏ Hồng khám phá thế giới cây xanh",
    storageKey: "class1.plantExplorer.found.v1",
    roundSize: 10
  });

  const DATA = Object.freeze({"overview": {"id": "plant-overview", "name": "Thế giới thực vật", "subtitle": "Cây xanh sống quanh bé mỗi ngày", "summary": "Thực vật có mặt ở khắp nơi: trong vườn, ngoài đồng, trong rừng, bên bờ ao và cả ở những nơi rất khô. Mỗi loài có hình dáng khác nhau nhưng đều có những cách đặc biệt để lấy nước, nhận ánh sáng và lớn lên.", "more": "Nhiều cây dùng rễ hút nước và chất khoáng, thân nâng đỡ và vận chuyển, lá nhận ánh sáng để tạo thức ăn. Hoa, quả và hạt giúp nhiều loài thực vật sinh sản. Thực vật còn cung cấp thức ăn, bóng mát, vật liệu và nơi ở cho nhiều sinh vật.", "remember": "Bé nhớ nhé: cây cần nước, ánh sáng, không khí và điều kiện phù hợp để sống. Lá của nhiều cây tạo thức ăn nhờ ánh sáng Mặt Trời.", "facts": [{"label": "Cây cần gì?", "value": "Nước, ánh sáng, không khí và điều kiện thích hợp"}, {"label": "Rễ", "value": "Bám cây và hút nước, chất khoáng"}, {"label": "Lá", "value": "Nơi diễn ra phần lớn quá trình quang hợp"}, {"label": "Màu xanh", "value": "Do chất diệp lục ở nhiều lá"}, {"label": "Hoa – quả – hạt", "value": "Giúp nhiều loài thực vật sinh sản"}, {"label": "Vai trò", "value": "Thức ăn, ôxy, bóng mát, vật liệu và nơi sống"}]}, "primary": [{"id": "roots", "name": "Rễ", "subtitle": "Bám đất và hút nước", "summary": "Rễ thường nằm trong đất, giúp cây đứng vững và hút nước cùng chất khoáng.", "more": "Nhiều rễ phân nhánh thành mạng lưới để tiếp xúc với đất tốt hơn. Một số cây có rễ phình to để dự trữ thức ăn, như cà rốt và khoai lang.", "remember": "Rễ giống như phần neo của cây và cũng là nơi lấy nước từ đất.", "facts": [{"label": "Vị trí thường gặp", "value": "Trong đất"}, {"label": "Việc chính", "value": "Bám cây, hút nước và chất khoáng"}, {"label": "Đặc biệt", "value": "Có thể phân nhánh rất nhiều"}, {"label": "Ví dụ dự trữ", "value": "Cà rốt, khoai lang"}]}, {"id": "stem", "name": "Thân", "subtitle": "Nâng đỡ và vận chuyển", "summary": "Thân nâng lá, hoa và quả lên cao để đón ánh sáng và giúp các bộ phận kết nối với nhau.", "more": "Bên trong thân có các mô dẫn giúp chuyển nước và chất khoáng từ rễ lên trên, đồng thời chuyển chất dinh dưỡng tới nhiều bộ phận khác.", "remember": "Thân vừa là khung đỡ vừa giống như đường vận chuyển trong cây.", "facts": [{"label": "Việc chính", "value": "Nâng đỡ cây"}, {"label": "Vận chuyển", "value": "Nước, chất khoáng và chất dinh dưỡng"}, {"label": "Dạng thân", "value": "Có thân mềm hoặc thân gỗ"}, {"label": "Ví dụ", "value": "Thân lúa mềm, thân xoài hóa gỗ"}]}, {"id": "leaves", "name": "Lá", "subtitle": "Xưởng tạo thức ăn", "summary": "Lá của nhiều cây là nơi diễn ra phần lớn quá trình quang hợp.", "more": "Nhờ chất diệp lục, lá hấp thụ năng lượng ánh sáng. Cây dùng nước và khí carbon dioxide để tạo đường làm thức ăn, đồng thời giải phóng ôxy.", "remember": "Lá xanh giống như một xưởng nhỏ dùng ánh sáng để giúp cây tạo thức ăn.", "facts": [{"label": "Màu xanh", "value": "Thường do diệp lục"}, {"label": "Quang hợp cần", "value": "Ánh sáng, nước và carbon dioxide"}, {"label": "Sản phẩm", "value": "Đường làm thức ăn cho cây"}, {"label": "Khí giải phóng", "value": "Ôxy"}]}, {"id": "flower", "name": "Hoa", "subtitle": "Giúp tạo hạt ở nhiều loài", "summary": "Hoa là cơ quan sinh sản của nhiều loài thực vật có hoa.", "more": "Phấn hoa có thể được chuyển từ hoa này sang hoa khác nhờ gió hoặc động vật như ong, bướm. Sau thụ phấn và thụ tinh, một phần của hoa có thể phát triển thành quả chứa hạt.", "remember": "Ong và bướm không chỉ đẹp; chúng còn giúp thụ phấn cho nhiều loài hoa.", "facts": [{"label": "Vai trò", "value": "Sinh sản ở nhiều cây có hoa"}, {"label": "Thụ phấn", "value": "Chuyển phấn hoa"}, {"label": "Tác nhân", "value": "Gió, ong, bướm và động vật khác"}, {"label": "Sau đó", "value": "Có thể hình thành quả và hạt"}]}, {"id": "fruit", "name": "Quả", "subtitle": "Bao bọc và giúp phát tán hạt", "summary": "Ở cây có hoa, quả hình thành từ hoa sau quá trình sinh sản và thường chứa hạt.", "more": "Quả có thể bảo vệ hạt và giúp hạt đi xa. Chim, thú và con người ăn quả rồi mang hạt tới nơi khác; một số quả nhẹ hoặc nổi có thể được gió hay nước đưa đi.", "remember": "Quả không chỉ để ăn; nhiều quả còn là chiếc hộp bảo vệ hạt.", "facts": [{"label": "Nguồn gốc", "value": "Thường phát triển từ hoa"}, {"label": "Bên trong", "value": "Thường có hạt"}, {"label": "Vai trò", "value": "Bảo vệ và hỗ trợ phát tán hạt"}, {"label": "Cách phát tán", "value": "Động vật, gió hoặc nước"}]}, {"id": "seed", "name": "Hạt", "subtitle": "Bắt đầu một cây mới", "summary": "Hạt chứa phôi cây non cùng nguồn dinh dưỡng dự trữ ở nhiều loài.", "more": "Khi gặp đủ nước, không khí và nhiệt độ phù hợp, hạt có thể nảy mầm. Rễ non thường xuất hiện trước, sau đó chồi vươn lên tìm ánh sáng.", "remember": "Một hạt nhỏ có thể bắt đầu hành trình của một cây mới.", "facts": [{"label": "Bên trong", "value": "Phôi cây non và chất dự trữ"}, {"label": "Nảy mầm cần", "value": "Nước, không khí và nhiệt độ thích hợp"}, {"label": "Xuất hiện sớm", "value": "Rễ non"}, {"label": "Tiếp theo", "value": "Chồi vươn lên"}]}], "secondary": [{"id": "rice", "name": "Cây lúa", "subtitle": "Cây lương thực quen thuộc", "summary": "Lúa là một loài cỏ được trồng rộng rãi để lấy hạt làm lương thực.", "more": "Nhiều giống lúa phát triển tốt ở ruộng có nhiều nước. Hạt lúa sau khi xay bỏ vỏ trấu cho ra gạo dùng trong bữa ăn hằng ngày.", "remember": "Lúa thuộc họ cỏ; hạt lúa cho chúng ta gạo.", "facts": [{"label": "Nhóm", "value": "Cỏ"}, {"label": "Sản phẩm quen thuộc", "value": "Gạo"}, {"label": "Nơi trồng", "value": "Ruộng và vùng canh tác lúa"}, {"label": "Bộ phận thu hoạch", "value": "Hạt"}]}, {"id": "banana", "name": "Cây chuối", "subtitle": "Một loài thân thảo rất lớn", "summary": "Chuối trông giống cây thân gỗ nhưng thực ra là một loài thân thảo lớn.", "more": "Phần giống thân cây mà ta nhìn thấy chủ yếu do các bẹ lá ôm chặt vào nhau. Buồng chuối phát triển từ cụm hoa của cây.", "remember": "Chuối không có thân gỗ thật như cây xoài; phần thân lớn chủ yếu do bẹ lá tạo nên.", "facts": [{"label": "Dạng cây", "value": "Thân thảo lớn"}, {"label": "Lá", "value": "Rất to và dài"}, {"label": "Phần giống thân", "value": "Do bẹ lá xếp chặt"}, {"label": "Quả", "value": "Mọc thành buồng"}]}, {"id": "mango", "name": "Cây xoài", "subtitle": "Cây thân gỗ cho quả", "summary": "Xoài là cây thân gỗ sống nhiều năm và cho quả có hạt lớn.", "more": "Cây xoài có tán lá rộng, hoa nhỏ mọc thành chùm. Quả xoài khi chín thường mềm và thơm; bên trong có một hạt lớn.", "remember": "Xoài là cây thân gỗ; quả xoài có một hạt lớn ở giữa.", "facts": [{"label": "Dạng thân", "value": "Thân gỗ"}, {"label": "Tuổi sống", "value": "Nhiều năm"}, {"label": "Hoa", "value": "Nhỏ, thường mọc thành chùm"}, {"label": "Quả", "value": "Có hạt lớn"}]}, {"id": "coconut", "name": "Cây dừa", "subtitle": "Cây nhiệt đới cao và dẻo", "summary": "Dừa là cây một lá mầm có thân cao, lá dài dạng tàu và quả có lớp vỏ xơ.", "more": "Quả dừa có lớp vỏ xơ giúp bảo vệ hạt và có thể nổi trên nước một thời gian. Điều này giúp dừa có thể phát tán qua vùng ven biển.", "remember": "Quả dừa có lớp xơ dày và có thể nổi trên nước.", "facts": [{"label": "Khí hậu", "value": "Nhiệt đới"}, {"label": "Lá", "value": "Dài dạng tàu"}, {"label": "Quả", "value": "Có lớp vỏ xơ"}, {"label": "Phát tán", "value": "Quả có thể nổi trên nước"}]}, {"id": "lotus", "name": "Hoa sen", "subtitle": "Thực vật sống trong nước", "summary": "Sen là thực vật thủy sinh, thường mọc ở ao hồ với rễ và thân ngầm bám trong bùn.", "more": "Cuống lá và cuống hoa vươn lên từ bùn. Lá sen rộng, thường nổi hoặc vươn trên mặt nước; hoa sen có nhiều cánh và tạo gương sen chứa hạt.", "remember": "Sen sống ở nước nhưng rễ và thân ngầm bám trong bùn dưới đáy.", "facts": [{"label": "Nơi sống", "value": "Ao, hồ và vùng nước nông"}, {"label": "Rễ – thân ngầm", "value": "Trong bùn"}, {"label": "Lá", "value": "Rộng, nổi hoặc vươn trên mặt nước"}, {"label": "Hạt", "value": "Nằm trong gương sen"}]}, {"id": "sunflower", "name": "Hoa hướng dương", "subtitle": "Cụm hoa lớn màu vàng", "summary": "Thứ ta thường gọi là một bông hướng dương thực ra là một cụm gồm rất nhiều hoa nhỏ.", "more": "Các hoa nhỏ ở giữa có thể tạo hạt. Hạt hướng dương là thức ăn và cũng có thể được ép lấy dầu.", "remember": "Một bông hướng dương lớn gồm rất nhiều hoa nhỏ tụ lại.", "facts": [{"label": "Màu quen thuộc", "value": "Vàng"}, {"label": "Đầu hoa", "value": "Gồm nhiều hoa nhỏ"}, {"label": "Hạt", "value": "Dùng làm thức ăn"}, {"label": "Công dụng khác", "value": "Có thể ép lấy dầu"}]}, {"id": "cactus", "name": "Xương rồng", "subtitle": "Thích nghi với nơi khô hạn", "summary": "Nhiều loài xương rồng có thân mọng nước giúp dự trữ nước.", "more": "Lá của nhiều xương rồng biến đổi thành gai, giúp giảm mất nước và bảo vệ cây. Thân xanh có thể đảm nhiệm phần lớn việc quang hợp.", "remember": "Xương rồng dự trữ nước trong thân; gai thường là lá biến đổi.", "facts": [{"label": "Môi trường", "value": "Nhiều nơi khô hạn"}, {"label": "Dự trữ nước", "value": "Trong thân mọng"}, {"label": "Gai", "value": "Thường là lá biến đổi"}, {"label": "Quang hợp", "value": "Thân xanh đảm nhiệm phần lớn"}]}, {"id": "fern", "name": "Dương xỉ", "subtitle": "Cây không tạo hoa và hạt", "summary": "Dương xỉ là nhóm thực vật có mạch nhưng không tạo hoa hay hạt.", "more": "Dương xỉ sinh sản bằng bào tử. Ở nhiều loài, các túi bào tử nhỏ xuất hiện ở mặt dưới của lá.", "remember": "Dương xỉ không có hoa và hạt; chúng sinh sản bằng bào tử.", "facts": [{"label": "Hoa", "value": "Không có"}, {"label": "Hạt", "value": "Không có"}, {"label": "Sinh sản", "value": "Bằng bào tử"}, {"label": "Vị trí bào tử", "value": "Thường ở mặt dưới lá"}]}, {"id": "pine", "name": "Cây thông", "subtitle": "Cây hạt trần có nón", "summary": "Thông là cây thân gỗ thuộc nhóm hạt trần, thường có lá hình kim.", "more": "Thông không tạo hoa và quả giống cây xoài. Hạt của nhiều loài thông phát triển trên các vảy của nón thông.", "remember": "Thông có nón và hạt nhưng không có quả thật sự bao bọc hạt.", "facts": [{"label": "Dạng thân", "value": "Thân gỗ"}, {"label": "Lá", "value": "Thường hình kim"}, {"label": "Cấu trúc sinh sản", "value": "Nón thông"}, {"label": "Hạt", "value": "Phát triển trên vảy nón"}]}], "quiz": [{"q": "Bộ phận nào thường hút nước và chất khoáng từ đất?", "a": ["Rễ", "Hoa", "Quả", "Hạt"], "c": 0, "note": "Rễ giúp cây hút nước và chất khoáng từ đất."}, {"q": "Bộ phận nào nâng đỡ lá, hoa và quả?", "a": ["Thân", "Hạt", "Rễ con", "Phấn hoa"], "c": 0, "note": "Thân là bộ phận nâng đỡ nhiều phần của cây."}, {"q": "Ở nhiều cây, phần nào diễn ra phần lớn quá trình quang hợp?", "a": ["Lá", "Quả", "Rễ", "Hoa"], "c": 0, "note": "Lá là nơi diễn ra phần lớn quá trình quang hợp ở nhiều cây."}, {"q": "Màu xanh của nhiều lá chủ yếu liên quan tới chất nào?", "a": ["Diệp lục", "Muối ăn", "Tinh bột trắng", "Cát"], "c": 0, "note": "Diệp lục là sắc tố xanh quan trọng trong quang hợp."}, {"q": "Quang hợp cần nguồn năng lượng nào?", "a": ["Ánh sáng", "Âm thanh", "Gió mạnh", "Bóng tối"], "c": 0, "note": "Thực vật dùng năng lượng ánh sáng cho quang hợp."}, {"q": "Ngoài ánh sáng, cây dùng nước và khí nào để tạo đường trong quang hợp?", "a": ["Carbon dioxide", "Heli", "Hydro tinh khiết", "Neon"], "c": 0, "note": "Cây dùng nước và carbon dioxide trong quang hợp."}, {"q": "Khí nào được nhiều thực vật giải phóng trong quang hợp?", "a": ["Ôxy", "Khói", "Hơi xăng", "Nitơ lỏng"], "c": 0, "note": "Quang hợp giải phóng ôxy."}, {"q": "Thực vật có thể mang lại lợi ích nào?", "a": ["Thức ăn và bóng mát", "Chỉ tạo tiếng ồn", "Làm nước biển mặn", "Làm Mặt Trời nóng hơn"], "c": 0, "note": "Thực vật cho thức ăn, bóng mát, vật liệu và nơi ở cho sinh vật."}, {"q": "Rễ còn giúp cây làm gì ngoài hút nước?", "a": ["Bám chắc vào đất", "Bay lên trời", "Phát sáng", "Tạo tiếng kêu"], "c": 0, "note": "Rễ còn giúp cây bám và đứng vững."}, {"q": "Một số rễ như cà rốt có thể làm gì?", "a": ["Dự trữ thức ăn", "Tạo hoa trên trời", "Bơi trong nước", "Phát ra âm thanh"], "c": 0, "note": "Một số rễ phình to để dự trữ thức ăn."}, {"q": "Bên trong thân có mô dẫn giúp làm gì?", "a": ["Vận chuyển nước và chất dinh dưỡng", "Tạo tiếng nhạc", "Giữ quả bay lên", "Tạo ánh sáng"], "c": 0, "note": "Mô dẫn trong thân giúp vận chuyển các chất."}, {"q": "Thân xoài thuộc dạng thân nào?", "a": ["Thân gỗ", "Thân nước", "Thân không có thật", "Thân bằng đá"], "c": 0, "note": "Xoài là cây thân gỗ."}, {"q": "Lá xanh giống như xưởng nhỏ làm việc gì?", "a": ["Tạo thức ăn cho cây", "Đào đất", "Tạo hạt trực tiếp", "Bắt cá"], "c": 0, "note": "Lá dùng ánh sáng để giúp cây tạo thức ăn."}, {"q": "Hoa của nhiều loài cây có vai trò chính nào?", "a": ["Giúp sinh sản", "Hút nước", "Giữ cây dưới đất", "Làm rễ dài hơn"], "c": 0, "note": "Hoa là cơ quan sinh sản của nhiều cây có hoa."}, {"q": "Thụ phấn là sự chuyển gì?", "a": ["Phấn hoa", "Đất", "Đá", "Nước biển"], "c": 0, "note": "Thụ phấn liên quan tới việc chuyển phấn hoa."}, {"q": "Sinh vật nào có thể giúp thụ phấn cho hoa?", "a": ["Ong và bướm", "Cá mập", "Cá voi", "Giun biển sâu"], "c": 0, "note": "Ong, bướm và nhiều động vật khác giúp thụ phấn."}, {"q": "Quả thường giúp bảo vệ gì?", "a": ["Hạt", "Mây", "Rễ của cây khác", "Ánh sáng"], "c": 0, "note": "Nhiều quả bao bọc và bảo vệ hạt."}, {"q": "Hạt chứa gì để bắt đầu một cây mới?", "a": ["Phôi cây non", "Một con cá", "Một viên đá", "Nước biển"], "c": 0, "note": "Hạt chứa phôi cây non."}, {"q": "Hạt thường cần gì để nảy mầm?", "a": ["Nước, không khí và nhiệt độ phù hợp", "Chỉ bóng tối tuyệt đối", "Nước biển mặn", "Đá nóng"], "c": 0, "note": "Nảy mầm thường cần nước, không khí và nhiệt độ thích hợp."}, {"q": "Khi hạt nảy mầm, bộ phận nào thường xuất hiện sớm?", "a": ["Rễ non", "Quả chín", "Hoa lớn", "Nón thông"], "c": 0, "note": "Rễ non thường xuất hiện sớm khi hạt nảy mầm."}, {"q": "Cây lúa thuộc nhóm cây nào?", "a": ["Một loài cỏ", "Một loài thông", "Một loài dương xỉ", "Một loài xương rồng"], "c": 0, "note": "Lúa là một loài cỏ."}, {"q": "Hạt lúa sau khi xay bỏ vỏ trấu cho ra gì?", "a": ["Gạo", "Cát", "Dầu dừa", "Bào tử"], "c": 0, "note": "Hạt lúa sau khi xay cho ra gạo."}, {"q": "Cây chuối thực chất thuộc dạng nào?", "a": ["Thân thảo lớn", "Cây thân gỗ cứng", "Dương xỉ", "Cây hạt trần"], "c": 0, "note": "Chuối là một loài thân thảo rất lớn."}, {"q": "Phần trông giống thân chuối chủ yếu do gì tạo nên?", "a": ["Các bẹ lá ôm chặt", "Một khúc gỗ đặc", "Rễ nổi", "Gai xếp lại"], "c": 0, "note": "Phần giả thân chuối chủ yếu do các bẹ lá xếp chặt."}, {"q": "Cây xoài thuộc dạng nào?", "a": ["Cây thân gỗ", "Cây thủy sinh", "Cây không có hạt", "Cây chỉ sống một ngày"], "c": 0, "note": "Xoài là cây thân gỗ sống nhiều năm."}, {"q": "Quả xoài thường có đặc điểm nào?", "a": ["Có một hạt lớn", "Không có hạt", "Có nón thông", "Có bào tử dưới lá"], "c": 0, "note": "Quả xoài thường có một hạt lớn."}, {"q": "Quả dừa có lớp nào giúp bảo vệ và hỗ trợ nổi trên nước?", "a": ["Lớp vỏ xơ", "Lớp lông chim", "Lớp đá", "Lớp tuyết"], "c": 0, "note": "Lớp vỏ xơ giúp bảo vệ và có thể giúp quả dừa nổi."}, {"q": "Cây dừa thường gắn với khí hậu nào?", "a": ["Nhiệt đới", "Băng giá quanh năm", "Sa mạc cực lạnh", "Đỉnh núi tuyết"], "c": 0, "note": "Dừa là cây quen thuộc ở vùng nhiệt đới."}, {"q": "Hoa sen là loại thực vật nào?", "a": ["Thực vật thủy sinh", "Cây sa mạc", "Cây lá kim", "Cây không cần nước"], "c": 0, "note": "Sen là thực vật thủy sinh."}, {"q": "Rễ và thân ngầm của sen thường ở đâu?", "a": ["Trong bùn", "Trên mây", "Trong thân cây khác", "Trên đá khô"], "c": 0, "note": "Sen bám trong bùn dưới đáy ao hồ."}, {"q": "Một đầu hoa hướng dương lớn thực ra gồm gì?", "a": ["Rất nhiều hoa nhỏ", "Một chiếc lá duy nhất", "Một quả duy nhất", "Một rễ lớn"], "c": 0, "note": "Đầu hoa hướng dương là cụm gồm rất nhiều hoa nhỏ."}, {"q": "Hạt hướng dương có thể dùng để làm gì?", "a": ["Ăn hoặc ép lấy dầu", "Làm nước biển mặn", "Tạo tuyết", "Làm đá nở"], "c": 0, "note": "Hạt hướng dương có thể dùng làm thức ăn hoặc ép dầu."}, {"q": "Xương rồng thường dự trữ nhiều nước ở đâu?", "a": ["Trong thân mọng", "Trong gai", "Trong hoa khô", "Trong cát"], "c": 0, "note": "Nhiều xương rồng dự trữ nước trong thân."}, {"q": "Gai của nhiều loài xương rồng là bộ phận nào biến đổi?", "a": ["Lá", "Rễ", "Quả", "Hạt"], "c": 0, "note": "Ở nhiều xương rồng, gai là lá biến đổi."}, {"q": "Dương xỉ sinh sản bằng gì?", "a": ["Bào tử", "Quả xoài", "Nón thông", "Hạt lúa"], "c": 0, "note": "Dương xỉ sinh sản bằng bào tử."}, {"q": "Dương xỉ có tạo hoa và hạt không?", "a": ["Không", "Có cả hoa và quả lớn", "Chỉ có quả", "Chỉ có nón"], "c": 0, "note": "Dương xỉ không tạo hoa và hạt."}, {"q": "Cây thông thường có loại lá nào?", "a": ["Lá hình kim", "Lá sen tròn", "Lá chuối rất rộng", "Không có lá"], "c": 0, "note": "Nhiều loài thông có lá hình kim."}, {"q": "Cây thông tạo hạt trên cấu trúc nào?", "a": ["Nón thông", "Quả xoài", "Gương sen", "Buồng chuối"], "c": 0, "note": "Hạt của nhiều loài thông phát triển trên vảy nón."}, {"q": "Loài cây nào trong bài thích nghi rõ với nơi khô hạn?", "a": ["Xương rồng", "Sen", "Lúa", "Dương xỉ"], "c": 0, "note": "Xương rồng có nhiều đặc điểm thích nghi với nơi khô hạn."}, {"q": "Loài nào trong bài sống ở ao hồ và có lá rộng trên mặt nước?", "a": ["Sen", "Thông", "Xương rồng", "Xoài"], "c": 0, "note": "Sen là thực vật thủy sinh quen thuộc ở ao hồ."}]});

  /* ---------- Song ngữ Tiếng Việt / English ---------- */
  const I18N_EN = {"Hoa": "Flower", "Hoa sen": "Lotus", "Gai": "Spines", "Heli": "Helium", "Trong gai": "In the spines", "Sen": "Lotus", "Thế giới thực vật": "The World of Plants", "Cây xanh sống quanh bé mỗi ngày": "Green plants all around us every day", "Thực vật có mặt ở khắp nơi: trong vườn, ngoài đồng, trong rừng, bên bờ ao và cả ở những nơi rất khô. Mỗi loài có hình dáng khác nhau nhưng đều có những cách đặc biệt để lấy nước, nhận ánh sáng và lớn lên.": "Plants are everywhere: in gardens, fields, forests, by ponds and even in very dry places. Each kind looks different, but all have special ways to get water, catch sunlight and grow.", "Nhiều cây dùng rễ hút nước và chất khoáng, thân nâng đỡ và vận chuyển, lá nhận ánh sáng để tạo thức ăn. Hoa, quả và hạt giúp nhiều loài thực vật sinh sản. Thực vật còn cung cấp thức ăn, bóng mát, vật liệu và nơi ở cho nhiều sinh vật.": "Many plants use roots to take in water and minerals, stems to hold them up and carry things, and leaves to catch light and make food. Flowers, fruits and seeds help many plants reproduce. Plants also give food, shade, materials and homes to many living things.", "Bé nhớ nhé: cây cần nước, ánh sáng, không khí và điều kiện phù hợp để sống. Lá của nhiều cây tạo thức ăn nhờ ánh sáng Mặt Trời.": "Remember: plants need water, light, air and the right conditions to live. The leaves of many plants make food using sunlight.", "cây cần nước, ánh sáng, không khí và điều kiện phù hợp để sống. Lá của nhiều cây tạo thức ăn nhờ ánh sáng Mặt Trời.": "Plants need water, light, air and the right conditions to live. The leaves of many plants make food using sunlight.", "Cây cần gì?": "What do plants need?", "Nước, ánh sáng, không khí và điều kiện thích hợp": "Water, light, air and the right conditions", "Rễ": "Roots", "Bám cây và hút nước, chất khoáng": "Hold the plant and take in water and minerals", "Lá": "Leaves", "Nơi diễn ra phần lớn quá trình quang hợp": "Where most photosynthesis happens", "Màu xanh": "Green color", "Do chất diệp lục ở nhiều lá": "From chlorophyll in many leaves", "Hoa – quả – hạt": "Flowers, fruits, seeds", "Giúp nhiều loài thực vật sinh sản": "Help many plants reproduce", "Vai trò": "Role", "Thức ăn, ôxy, bóng mát, vật liệu và nơi sống": "Food, oxygen, shade, materials and homes", "Bám đất và hút nước": "Hold the soil and take in water", "Rễ thường nằm trong đất, giúp cây đứng vững và hút nước cùng chất khoáng.": "Roots are usually in the soil. They help the plant stand firm and take in water and minerals.", "Nhiều rễ phân nhánh thành mạng lưới để tiếp xúc với đất tốt hơn. Một số cây có rễ phình to để dự trữ thức ăn, như cà rốt và khoai lang.": "Many roots branch out into a network to touch more soil. Some plants have swollen roots that store food, like carrots and sweet potatoes.", "Rễ giống như phần neo của cây và cũng là nơi lấy nước từ đất.": "Roots are like the plant's anchor and also where it gets water from the soil.", "Vị trí thường gặp": "Usually found", "Trong đất": "In the soil", "Việc chính": "Main job", "Bám cây, hút nước và chất khoáng": "Hold the plant, take in water and minerals", "Đặc biệt": "Special", "Có thể phân nhánh rất nhiều": "Can branch out a lot", "Ví dụ dự trữ": "Storage examples", "Cà rốt, khoai lang": "Carrots, sweet potatoes", "Thân": "Stem", "Nâng đỡ và vận chuyển": "Holds up and carries", "Thân nâng lá, hoa và quả lên cao để đón ánh sáng và giúp các bộ phận kết nối với nhau.": "The stem lifts leaves, flowers and fruits up toward the light and connects the plant's parts.", "Bên trong thân có các mô dẫn giúp chuyển nước và chất khoáng từ rễ lên trên, đồng thời chuyển chất dinh dưỡng tới nhiều bộ phận khác.": "Inside the stem are tubes that carry water and minerals up from the roots and move nutrients to many other parts.", "Thân vừa là khung đỡ vừa giống như đường vận chuyển trong cây.": "The stem is both the plant's frame and its delivery road.", "Nâng đỡ cây": "Holds up the plant", "Vận chuyển": "Carries", "Nước, chất khoáng và chất dinh dưỡng": "Water, minerals and nutrients", "Dạng thân": "Stem type", "Có thân mềm hoặc thân gỗ": "Soft stems or woody stems", "Ví dụ": "Example", "Thân lúa mềm, thân xoài hóa gỗ": "Rice has a soft stem, mango has a woody stem", "Xưởng tạo thức ăn": "The food factory", "Lá của nhiều cây là nơi diễn ra phần lớn quá trình quang hợp.": "The leaves of many plants are where most photosynthesis happens.", "Nhờ chất diệp lục, lá hấp thụ năng lượng ánh sáng. Cây dùng nước và khí carbon dioxide để tạo đường làm thức ăn, đồng thời giải phóng ôxy.": "Thanks to chlorophyll, leaves soak up light energy. The plant uses water and carbon dioxide to make sugar as food and gives off oxygen.", "Lá xanh giống như một xưởng nhỏ dùng ánh sáng để giúp cây tạo thức ăn.": "A green leaf is like a little factory that uses light to help the plant make food.", "Thường do diệp lục": "Usually from chlorophyll", "Quang hợp cần": "Photosynthesis needs", "Ánh sáng, nước và carbon dioxide": "Light, water and carbon dioxide", "Sản phẩm": "Product", "Đường làm thức ăn cho cây": "Sugar as food for the plant", "Khí giải phóng": "Gas given off", "Ôxy": "Oxygen", "Giúp tạo hạt ở nhiều loài": "Helps many plants make seeds", "Hoa là cơ quan sinh sản của nhiều loài thực vật có hoa.": "Flowers are the reproductive parts of many flowering plants.", "Phấn hoa có thể được chuyển từ hoa này sang hoa khác nhờ gió hoặc động vật như ong, bướm. Sau thụ phấn và thụ tinh, một phần của hoa có thể phát triển thành quả chứa hạt.": "Pollen can be carried from one flower to another by the wind or by animals like bees and butterflies. After pollination and fertilization, part of the flower can grow into a fruit with seeds.", "Ong và bướm không chỉ đẹp; chúng còn giúp thụ phấn cho nhiều loài hoa.": "Bees and butterflies are not just pretty; they also help pollinate many flowers.", "Sinh sản ở nhiều cây có hoa": "Reproduction in many flowering plants", "Thụ phấn": "Pollination", "Chuyển phấn hoa": "Moving pollen", "Tác nhân": "Helpers", "Gió, ong, bướm và động vật khác": "Wind, bees, butterflies and other animals", "Sau đó": "Afterwards", "Có thể hình thành quả và hạt": "Can form fruits and seeds", "Quả": "Fruit", "Bao bọc và giúp phát tán hạt": "Wraps and helps spread seeds", "Ở cây có hoa, quả hình thành từ hoa sau quá trình sinh sản và thường chứa hạt.": "In flowering plants, the fruit forms from the flower after reproduction and usually holds seeds.", "Quả có thể bảo vệ hạt và giúp hạt đi xa. Chim, thú và con người ăn quả rồi mang hạt tới nơi khác; một số quả nhẹ hoặc nổi có thể được gió hay nước đưa đi.": "Fruits can protect seeds and help them travel far. Birds, animals and people eat fruit and carry the seeds to new places; some light or floating fruits are carried by wind or water.", "Quả không chỉ để ăn; nhiều quả còn là chiếc hộp bảo vệ hạt.": "Fruit is not just for eating; many fruits are boxes that protect seeds.", "Nguồn gốc": "Origin", "Thường phát triển từ hoa": "Usually grows from a flower", "Bên trong": "Inside", "Thường có hạt": "Usually has seeds", "Bảo vệ và hỗ trợ phát tán hạt": "Protects seeds and helps spread them", "Cách phát tán": "How seeds spread", "Động vật, gió hoặc nước": "Animals, wind or water", "Hạt": "Seed", "Bắt đầu một cây mới": "Starts a new plant", "Hạt chứa phôi cây non cùng nguồn dinh dưỡng dự trữ ở nhiều loài.": "In many plants, a seed holds a baby plant and stored food.", "Khi gặp đủ nước, không khí và nhiệt độ phù hợp, hạt có thể nảy mầm. Rễ non thường xuất hiện trước, sau đó chồi vươn lên tìm ánh sáng.": "With enough water, air and the right temperature, a seed can sprout. A baby root usually comes out first, then a shoot grows up toward the light.", "Một hạt nhỏ có thể bắt đầu hành trình của một cây mới.": "A tiny seed can start the journey of a new plant.", "Phôi cây non và chất dự trữ": "A baby plant and stored food", "Nảy mầm cần": "Sprouting needs", "Nước, không khí và nhiệt độ thích hợp": "Water, air and the right temperature", "Xuất hiện sớm": "Comes out first", "Rễ non": "Baby root", "Tiếp theo": "Next", "Chồi vươn lên": "A shoot grows up", "Cây lúa": "Rice plant", "Cây lương thực quen thuộc": "A familiar food crop", "Lúa là một loài cỏ được trồng rộng rãi để lấy hạt làm lương thực.": "Rice is a kind of grass grown widely for its grains, which we eat.", "Nhiều giống lúa phát triển tốt ở ruộng có nhiều nước. Hạt lúa sau khi xay bỏ vỏ trấu cho ra gạo dùng trong bữa ăn hằng ngày.": "Many kinds of rice grow well in flooded fields. After the husks are removed, rice grains become the rice we eat every day.", "Lúa thuộc họ cỏ; hạt lúa cho chúng ta gạo.": "Rice is in the grass family; its grains give us rice to eat.", "Nhóm": "Group", "Cỏ": "Grass", "Sản phẩm quen thuộc": "Familiar product", "Gạo": "Rice", "Nơi trồng": "Where it grows", "Ruộng và vùng canh tác lúa": "Rice fields and farmland", "Bộ phận thu hoạch": "Part harvested", "Cây chuối": "Banana plant", "Một loài thân thảo rất lớn": "A very big non-woody plant", "Chuối trông giống cây thân gỗ nhưng thực ra là một loài thân thảo lớn.": "A banana plant looks like a tree but is really a very big non-woody plant.", "Phần giống thân cây mà ta nhìn thấy chủ yếu do các bẹ lá ôm chặt vào nhau. Buồng chuối phát triển từ cụm hoa của cây.": "What looks like a trunk is mostly leaf bases wrapped tightly together. The bunch of bananas grows from the plant's cluster of flowers.", "Chuối không có thân gỗ thật như cây xoài; phần thân lớn chủ yếu do bẹ lá tạo nên.": "A banana plant has no real wooden trunk like a mango tree; its big stem is mostly made of leaf bases.", "Dạng cây": "Plant type", "Thân thảo lớn": "Big non-woody plant", "Rất to và dài": "Very big and long", "Phần giống thân": "Trunk-like part", "Do bẹ lá xếp chặt": "Made of tightly wrapped leaf bases", "Mọc thành buồng": "Grows in bunches", "Cây xoài": "Mango tree", "Cây thân gỗ cho quả": "A woody tree that bears fruit", "Xoài là cây thân gỗ sống nhiều năm và cho quả có hạt lớn.": "The mango is a woody tree that lives many years and bears fruit with a big seed.", "Cây xoài có tán lá rộng, hoa nhỏ mọc thành chùm. Quả xoài khi chín thường mềm và thơm; bên trong có một hạt lớn.": "Mango trees have wide crowns of leaves and small flowers in clusters. Ripe mangoes are usually soft and sweet-smelling, with one big seed inside.", "Xoài là cây thân gỗ; quả xoài có một hạt lớn ở giữa.": "The mango is a woody tree; a mango fruit has one big seed in the middle.", "Thân gỗ": "Woody stem", "Tuổi sống": "Lifespan", "Nhiều năm": "Many years", "Nhỏ, thường mọc thành chùm": "Small, usually in clusters", "Có hạt lớn": "Has a big seed", "Cây dừa": "Coconut palm", "Cây nhiệt đới cao và dẻo": "A tall, bendy tropical tree", "Dừa là cây một lá mầm có thân cao, lá dài dạng tàu và quả có lớp vỏ xơ.": "The coconut palm has a tall trunk, long feather-like leaves and fruit with a fibrous husk.", "Quả dừa có lớp vỏ xơ giúp bảo vệ hạt và có thể nổi trên nước một thời gian. Điều này giúp dừa có thể phát tán qua vùng ven biển.": "The coconut's fibrous husk protects the seed and lets it float on water for a while. This helps coconuts spread along coastlines.", "Quả dừa có lớp xơ dày và có thể nổi trên nước.": "The coconut has a thick fibrous husk and can float on water.", "Khí hậu": "Climate", "Nhiệt đới": "Tropical", "Dài dạng tàu": "Long and feather-like", "Có lớp vỏ xơ": "Has a fibrous husk", "Phát tán": "Spreading", "Quả có thể nổi trên nước": "The fruit can float on water", "Thực vật sống trong nước": "A plant that lives in water", "Sen là thực vật thủy sinh, thường mọc ở ao hồ với rễ và thân ngầm bám trong bùn.": "The lotus is a water plant that usually grows in ponds and lakes, with roots and underground stems anchored in the mud.", "Cuống lá và cuống hoa vươn lên từ bùn. Lá sen rộng, thường nổi hoặc vươn trên mặt nước; hoa sen có nhiều cánh và tạo gương sen chứa hạt.": "Leaf stalks and flower stalks rise up from the mud. Lotus leaves are wide and float on or stand above the water; the lotus flower has many petals and forms a seed pod.", "Sen sống ở nước nhưng rễ và thân ngầm bám trong bùn dưới đáy.": "The lotus lives in water, but its roots and underground stems hold onto the mud at the bottom.", "Nơi sống": "Habitat", "Ao, hồ và vùng nước nông": "Ponds, lakes and shallow water", "Rễ – thân ngầm": "Roots and underground stems", "Trong bùn": "In the mud", "Rộng, nổi hoặc vươn trên mặt nước": "Wide, floating on or above the water", "Nằm trong gương sen": "Inside the seed pod", "Hoa hướng dương": "Sunflower", "Cụm hoa lớn màu vàng": "A big yellow flower head", "Thứ ta thường gọi là một bông hướng dương thực ra là một cụm gồm rất nhiều hoa nhỏ.": "What we call one sunflower is actually a cluster of many tiny flowers.", "Các hoa nhỏ ở giữa có thể tạo hạt. Hạt hướng dương là thức ăn và cũng có thể được ép lấy dầu.": "The tiny flowers in the middle can make seeds. Sunflower seeds are food and can also be pressed for oil.", "Một bông hướng dương lớn gồm rất nhiều hoa nhỏ tụ lại.": "One big sunflower is made of many tiny flowers grouped together.", "Màu quen thuộc": "Familiar color", "Vàng": "Yellow", "Đầu hoa": "Flower head", "Gồm nhiều hoa nhỏ": "Made of many tiny flowers", "Dùng làm thức ăn": "Used as food", "Công dụng khác": "Other uses", "Có thể ép lấy dầu": "Can be pressed for oil", "Xương rồng": "Cactus", "Thích nghi với nơi khô hạn": "Adapted to dry places", "Nhiều loài xương rồng có thân mọng nước giúp dự trữ nước.": "Many cacti have juicy stems that store water.", "Lá của nhiều xương rồng biến đổi thành gai, giúp giảm mất nước và bảo vệ cây. Thân xanh có thể đảm nhiệm phần lớn việc quang hợp.": "The leaves of many cacti have turned into spines, which cut down water loss and protect the plant. The green stem can do most of the photosynthesis.", "Xương rồng dự trữ nước trong thân; gai thường là lá biến đổi.": "A cactus stores water in its stem; its spines are usually changed leaves.", "Môi trường": "Environment", "Nhiều nơi khô hạn": "Many dry places", "Dự trữ nước": "Water storage", "Trong thân mọng": "In the juicy stem", "Thường là lá biến đổi": "Usually changed leaves", "Quang hợp": "Photosynthesis", "Thân xanh đảm nhiệm phần lớn": "The green stem does most of it", "Dương xỉ": "Fern", "Cây không tạo hoa và hạt": "A plant without flowers or seeds", "Dương xỉ là nhóm thực vật có mạch nhưng không tạo hoa hay hạt.": "Ferns are plants with tubes inside, but they do not make flowers or seeds.", "Dương xỉ sinh sản bằng bào tử. Ở nhiều loài, các túi bào tử nhỏ xuất hiện ở mặt dưới của lá.": "Ferns reproduce with spores. In many kinds, tiny spore cases appear on the underside of the leaves.", "Dương xỉ không có hoa và hạt; chúng sinh sản bằng bào tử.": "Ferns have no flowers or seeds; they reproduce with spores.", "Không có": "None", "Sinh sản": "Reproduction", "Bằng bào tử": "With spores", "Vị trí bào tử": "Where the spores are", "Thường ở mặt dưới lá": "Usually under the leaves", "Cây thông": "Pine tree", "Cây hạt trần có nón": "A cone-bearing seed plant", "Thông là cây thân gỗ thuộc nhóm hạt trần, thường có lá hình kim.": "The pine is a woody tree in the conifer group, usually with needle-shaped leaves.", "Thông không tạo hoa và quả giống cây xoài. Hạt của nhiều loài thông phát triển trên các vảy của nón thông.": "Pines do not make flowers and fruits like a mango tree. The seeds of many pines grow on the scales of pine cones.", "Thông có nón và hạt nhưng không có quả thật sự bao bọc hạt.": "Pines have cones and seeds but no real fruit wrapped around the seeds.", "Thường hình kim": "Usually needle-shaped", "Cấu trúc sinh sản": "Reproductive structure", "Nón thông": "Pine cone", "Phát triển trên vảy nón": "Grow on the cone scales", "Bộ phận nào thường hút nước và chất khoáng từ đất?": "Which part usually takes in water and minerals from the soil?", "Rễ giúp cây hút nước và chất khoáng từ đất.": "Roots help the plant take in water and minerals from the soil.", "Bộ phận nào nâng đỡ lá, hoa và quả?": "Which part holds up leaves, flowers and fruits?", "Rễ con": "Small roots", "Phấn hoa": "Pollen", "Thân là bộ phận nâng đỡ nhiều phần của cây.": "The stem holds up many parts of the plant.", "Ở nhiều cây, phần nào diễn ra phần lớn quá trình quang hợp?": "In many plants, where does most photosynthesis happen?", "Lá là nơi diễn ra phần lớn quá trình quang hợp ở nhiều cây.": "Leaves are where most photosynthesis happens in many plants.", "Màu xanh của nhiều lá chủ yếu liên quan tới chất nào?": "The green color of many leaves mainly comes from what?", "Diệp lục": "Chlorophyll", "Muối ăn": "Table salt", "Tinh bột trắng": "White starch", "Cát": "Sand", "Diệp lục là sắc tố xanh quan trọng trong quang hợp.": "Chlorophyll is the green pigment that is important for photosynthesis.", "Quang hợp cần nguồn năng lượng nào?": "What energy does photosynthesis need?", "Ánh sáng": "Light", "Âm thanh": "Sound", "Gió mạnh": "Strong wind", "Bóng tối": "Darkness", "Thực vật dùng năng lượng ánh sáng cho quang hợp.": "Plants use light energy for photosynthesis.", "Ngoài ánh sáng, cây dùng nước và khí nào để tạo đường trong quang hợp?": "Besides light, which gas and water do plants use to make sugar in photosynthesis?", "Hydro tinh khiết": "Pure hydrogen", "Cây dùng nước và carbon dioxide trong quang hợp.": "Plants use water and carbon dioxide in photosynthesis.", "Khí nào được nhiều thực vật giải phóng trong quang hợp?": "Which gas do many plants give off during photosynthesis?", "Khói": "Smoke", "Hơi xăng": "Gasoline fumes", "Nitơ lỏng": "Liquid nitrogen", "Quang hợp giải phóng ôxy.": "Photosynthesis gives off oxygen.", "Thực vật có thể mang lại lợi ích nào?": "How can plants help us?", "Thức ăn và bóng mát": "Food and shade", "Chỉ tạo tiếng ồn": "They only make noise", "Làm nước biển mặn": "They make seawater salty", "Làm Mặt Trời nóng hơn": "They make the Sun hotter", "Thực vật cho thức ăn, bóng mát, vật liệu và nơi ở cho sinh vật.": "Plants give food, shade, materials and homes to living things.", "Rễ còn giúp cây làm gì ngoài hút nước?": "Besides taking in water, what else do roots help the plant do?", "Bám chắc vào đất": "Hold firmly to the soil", "Bay lên trời": "Fly into the sky", "Phát sáng": "Glow", "Tạo tiếng kêu": "Make sounds", "Rễ còn giúp cây bám và đứng vững.": "Roots also help the plant hold on and stand firm.", "Một số rễ như cà rốt có thể làm gì?": "What can some roots, like carrots, do?", "Dự trữ thức ăn": "Store food", "Tạo hoa trên trời": "Make flowers in the sky", "Bơi trong nước": "Swim in water", "Phát ra âm thanh": "Make sounds", "Một số rễ phình to để dự trữ thức ăn.": "Some roots swell up to store food.", "Bên trong thân có mô dẫn giúp làm gì?": "What do the tubes inside the stem help do?", "Vận chuyển nước và chất dinh dưỡng": "Carry water and nutrients", "Tạo tiếng nhạc": "Make music", "Giữ quả bay lên": "Keep fruit floating", "Tạo ánh sáng": "Make light", "Mô dẫn trong thân giúp vận chuyển các chất.": "The tubes in the stem help carry substances.", "Thân xoài thuộc dạng thân nào?": "What kind of stem does a mango tree have?", "Thân nước": "A watery stem", "Thân không có thật": "No real stem", "Thân bằng đá": "A stem made of stone", "Xoài là cây thân gỗ.": "The mango is a woody tree.", "Lá xanh giống như xưởng nhỏ làm việc gì?": "A green leaf is like a little factory that does what?", "Tạo thức ăn cho cây": "Makes food for the plant", "Đào đất": "Digs soil", "Tạo hạt trực tiếp": "Makes seeds directly", "Bắt cá": "Catches fish", "Lá dùng ánh sáng để giúp cây tạo thức ăn.": "Leaves use light to help the plant make food.", "Hoa của nhiều loài cây có vai trò chính nào?": "What is the main role of flowers in many plants?", "Giúp sinh sản": "Help with reproduction", "Hút nước": "Take in water", "Giữ cây dưới đất": "Hold the plant in the ground", "Làm rễ dài hơn": "Make roots longer", "Hoa là cơ quan sinh sản của nhiều cây có hoa.": "Flowers are the reproductive parts of many flowering plants.", "Thụ phấn là sự chuyển gì?": "Pollination is the moving of what?", "Đất": "Soil", "Đá": "Rocks", "Nước biển": "Seawater", "Thụ phấn liên quan tới việc chuyển phấn hoa.": "Pollination is about moving pollen.", "Sinh vật nào có thể giúp thụ phấn cho hoa?": "Which creatures can help pollinate flowers?", "Ong và bướm": "Bees and butterflies", "Cá mập": "Sharks", "Cá voi": "Whales", "Giun biển sâu": "Deep-sea worms", "Ong, bướm và nhiều động vật khác giúp thụ phấn.": "Bees, butterflies and many other animals help with pollination.", "Quả thường giúp bảo vệ gì?": "What do fruits usually help protect?", "Mây": "Clouds", "Rễ của cây khác": "Other plants' roots", "Nhiều quả bao bọc và bảo vệ hạt.": "Many fruits wrap around and protect seeds.", "Hạt chứa gì để bắt đầu một cây mới?": "What does a seed hold to start a new plant?", "Phôi cây non": "A baby plant", "Một con cá": "A fish", "Một viên đá": "A rock", "Hạt chứa phôi cây non.": "A seed holds a baby plant.", "Hạt thường cần gì để nảy mầm?": "What does a seed usually need to sprout?", "Nước, không khí và nhiệt độ phù hợp": "Water, air and the right temperature", "Chỉ bóng tối tuyệt đối": "Only total darkness", "Nước biển mặn": "Salty seawater", "Đá nóng": "Hot rocks", "Nảy mầm thường cần nước, không khí và nhiệt độ thích hợp.": "Sprouting usually needs water, air and the right temperature.", "Khi hạt nảy mầm, bộ phận nào thường xuất hiện sớm?": "When a seed sprouts, which part usually comes out first?", "Quả chín": "Ripe fruit", "Hoa lớn": "A big flower", "Rễ non thường xuất hiện sớm khi hạt nảy mầm.": "A baby root usually comes out first when a seed sprouts.", "Cây lúa thuộc nhóm cây nào?": "Which group does the rice plant belong to?", "Một loài cỏ": "A kind of grass", "Một loài thông": "A kind of pine", "Một loài dương xỉ": "A kind of fern", "Một loài xương rồng": "A kind of cactus", "Lúa là một loài cỏ.": "Rice is a kind of grass.", "Hạt lúa sau khi xay bỏ vỏ trấu cho ra gì?": "What do rice grains become after the husks are removed?", "Dầu dừa": "Coconut oil", "Bào tử": "Spores", "Hạt lúa sau khi xay cho ra gạo.": "Rice grains become the rice we eat.", "Cây chuối thực chất thuộc dạng nào?": "What kind of plant is a banana plant really?", "Cây thân gỗ cứng": "A hard woody tree", "Cây hạt trần": "A conifer", "Chuối là một loài thân thảo rất lớn.": "A banana plant is a very big non-woody plant.", "Phần trông giống thân chuối chủ yếu do gì tạo nên?": "What makes up the trunk-like part of a banana plant?", "Các bẹ lá ôm chặt": "Tightly wrapped leaf bases", "Một khúc gỗ đặc": "A solid log", "Rễ nổi": "Floating roots", "Gai xếp lại": "Stacked spines", "Phần giả thân chuối chủ yếu do các bẹ lá xếp chặt.": "The banana's fake trunk is mostly tightly wrapped leaf bases.", "Cây xoài thuộc dạng nào?": "What kind of plant is a mango tree?", "Cây thân gỗ": "A woody tree", "Cây thủy sinh": "A water plant", "Cây không có hạt": "A plant with no seeds", "Cây chỉ sống một ngày": "A plant that lives only one day", "Xoài là cây thân gỗ sống nhiều năm.": "The mango is a woody tree that lives many years.", "Quả xoài thường có đặc điểm nào?": "What is a mango fruit usually like?", "Có một hạt lớn": "It has one big seed", "Không có hạt": "It has no seeds", "Có nón thông": "It has pine cones", "Có bào tử dưới lá": "It has spores under its leaves", "Quả xoài thường có một hạt lớn.": "A mango usually has one big seed.", "Quả dừa có lớp nào giúp bảo vệ và hỗ trợ nổi trên nước?": "Which layer of a coconut protects it and helps it float on water?", "Lớp vỏ xơ": "A fibrous husk", "Lớp lông chim": "A layer of bird feathers", "Lớp đá": "A layer of rock", "Lớp tuyết": "A layer of snow", "Lớp vỏ xơ giúp bảo vệ và có thể giúp quả dừa nổi.": "The fibrous husk protects the coconut and can help it float.", "Cây dừa thường gắn với khí hậu nào?": "Which climate is the coconut palm usually linked to?", "Băng giá quanh năm": "Frozen all year", "Sa mạc cực lạnh": "Very cold desert", "Đỉnh núi tuyết": "Snowy mountain top", "Dừa là cây quen thuộc ở vùng nhiệt đới.": "The coconut palm is a familiar plant in the tropics.", "Hoa sen là loại thực vật nào?": "What kind of plant is the lotus?", "Thực vật thủy sinh": "A water plant", "Cây sa mạc": "A desert plant", "Cây lá kim": "A needle-leaf tree", "Cây không cần nước": "A plant that needs no water", "Sen là thực vật thủy sinh.": "The lotus is a water plant.", "Rễ và thân ngầm của sen thường ở đâu?": "Where are the lotus's roots and underground stems usually found?", "Trên mây": "In the clouds", "Trong thân cây khác": "Inside another plant", "Trên đá khô": "On dry rocks", "Sen bám trong bùn dưới đáy ao hồ.": "The lotus holds onto the mud at the bottom of ponds and lakes.", "Một đầu hoa hướng dương lớn thực ra gồm gì?": "What is one big sunflower head really made of?", "Rất nhiều hoa nhỏ": "Many tiny flowers", "Một chiếc lá duy nhất": "A single leaf", "Một quả duy nhất": "A single fruit", "Một rễ lớn": "One big root", "Đầu hoa hướng dương là cụm gồm rất nhiều hoa nhỏ.": "A sunflower head is a cluster of many tiny flowers.", "Hạt hướng dương có thể dùng để làm gì?": "What can sunflower seeds be used for?", "Ăn hoặc ép lấy dầu": "Eating or pressing for oil", "Tạo tuyết": "Making snow", "Làm đá nở": "Making rocks grow", "Hạt hướng dương có thể dùng làm thức ăn hoặc ép dầu.": "Sunflower seeds can be eaten or pressed for oil.", "Xương rồng thường dự trữ nhiều nước ở đâu?": "Where does a cactus usually store a lot of water?", "Trong hoa khô": "In dry flowers", "Trong cát": "In the sand", "Nhiều xương rồng dự trữ nước trong thân.": "Many cacti store water in their stems.", "Gai của nhiều loài xương rồng là bộ phận nào biến đổi?": "Cactus spines are changed versions of which part?", "Ở nhiều xương rồng, gai là lá biến đổi.": "In many cacti, spines are changed leaves.", "Dương xỉ sinh sản bằng gì?": "How do ferns reproduce?", "Quả xoài": "Mangoes", "Hạt lúa": "Rice grains", "Dương xỉ sinh sản bằng bào tử.": "Ferns reproduce with spores.", "Dương xỉ có tạo hoa và hạt không?": "Do ferns make flowers and seeds?", "Không": "No", "Có cả hoa và quả lớn": "Yes, flowers and big fruits", "Chỉ có quả": "Only fruits", "Chỉ có nón": "Only cones", "Dương xỉ không tạo hoa và hạt.": "Ferns do not make flowers or seeds.", "Cây thông thường có loại lá nào?": "What kind of leaves do pine trees usually have?", "Lá hình kim": "Needle-shaped leaves", "Lá sen tròn": "Round lotus leaves", "Lá chuối rất rộng": "Very wide banana leaves", "Không có lá": "No leaves", "Nhiều loài thông có lá hình kim.": "Many pines have needle-shaped leaves.", "Cây thông tạo hạt trên cấu trúc nào?": "On which structure do pine trees make seeds?", "Gương sen": "A lotus seed pod", "Buồng chuối": "A banana bunch", "Hạt của nhiều loài thông phát triển trên vảy nón.": "The seeds of many pines grow on cone scales.", "Loài cây nào trong bài thích nghi rõ với nơi khô hạn?": "Which plant in this lesson is clearly adapted to dry places?", "Lúa": "Rice", "Xương rồng có nhiều đặc điểm thích nghi với nơi khô hạn.": "Cacti have many features adapted to dry places.", "Loài nào trong bài sống ở ao hồ và có lá rộng trên mặt nước?": "Which plant in this lesson lives in ponds and has wide leaves on the water?", "Thông": "Pine", "Xoài": "Mango", "Sen là thực vật thủy sinh quen thuộc ở ao hồ.": "The lotus is a familiar water plant in ponds and lakes.", "Khám phá thực vật": "Plant Explorer", "Cùng Cô Thỏ Hồng khám phá thế giới cây xanh": "Explore the world of green plants with Miss Pink Bunny", "Các bộ phận của cây": "Parts of a plant", "⏹ Dừng đọc": "⏹ Stop reading", "Nghe cô đọc": "Listen to Teacher", "Chưa phát được giọng đọc. Con nhờ bố mẹ hoặc thầy cô kiểm tra loa và mạng, rồi bấm lại nhé.": "I couldn't play the voice. Ask a parent or teacher to check the speaker and the internet, then tap again.", "Bé nhớ nhé:": "Remember:", "🔊 Nghe cô đọc": "🔊 Listen to Teacher", "Sổ khám phá": "Explorer's Log", "🌱 Thực vật là gì?": "🌱 What is a plant?", "Khu vườn có 9 loài cây. Chạm vào từng cây để làm quen nhé!": "The garden has 9 kinds of plants. Tap each one to say hello!", "Cây có rễ, thân, lá, hoa, quả và hạt. Chạm vào từng bộ phận hoặc tên của nó nhé!": "A plant has roots, a stem, leaves, flowers, fruits and seeds. Tap each part or its name!", "✓ Đã xem": "✓ Seen", "câu đúng": "correct", "Cô tự đọc câu hỏi": "Teacher reads the questions", "Mẹo: bấm phím 1, 2, 3, 4 để chọn đáp án.": "Tip: press 1, 2, 3, 4 to choose an answer.", "Đổi câu hỏi khác": "Try other questions", "Tuyệt vời! Con là nhà thực vật học nhí rồi!": "Amazing! You are a little botanist now!", "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé.": "Well done! Let's review the questions below.", "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.": "You tried hard! Let's review and play again.", "Con đúng": "You got", "câu": "questions", "Làm lại câu sai": "Retry wrong answers", "Chơi vòng mới": "Play a new round", "Đáp án đúng của các câu con chưa trả lời được:": "Correct answers to the questions you missed:", "Con chọn một đáp án nhé!": "Pick an answer!", "Chính xác!": "Correct!", "Chưa đúng rồi. Đáp án đúng là": "Not quite. The correct answer is", "Câu": "Question", "trên": "of", "Đọc câu hỏi": "Read the question", "🔊 Đọc câu hỏi": "🔊 Read the question", "Xem kết quả": "See results", "Câu tiếp theo": "Next question", "🏆 Con đã khám phá hết thế giới cây xanh rồi! Giỏi quá!": "🏆 You have explored the whole world of plants! Great job!", "🌱 Đã ghi": "🌱 Added", "vào sổ khám phá (": "to your explorer's log (", "Vườn cây": "Garden", "Bộ phận cây": "Plant parts", "Cây quanh bé": "Plants around us", "Hỏi đáp": "Quiz", "câu.": "questions.", "Các khu vực khám phá": "Exploration areas", "🌳 Vườn cây": "🌳 Garden", "🌱 Bộ phận cây": "🌱 Plant parts", "🌿 Cây quanh bé": "🌿 Plants around us", "⭐ Hỏi đáp": "⭐ Quiz"};
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
    if (simTab) simTab.textContent=simL("🌱 Nuôi cây","🌱 Grow a Plant");
    if (activeTab === "sim") renderStage();
    translateDom(root);
    setBanner();
  }


  /* ---------- Hình vẽ các loài cây (khung 120 x 100) ---------- */
  const PLANT = {
    rice: () => `
      <rect x="4" y="84" width="112" height="14" rx="6" fill="#7DD3FC"/>
      <path d="M8 88 q10 -3 20 0 M44 92 q10 -3 20 0 M80 88 q10 -3 20 0" stroke="#E0F2FE" stroke-width="2" fill="none"/>
      ${[24, 48, 72, 96].map((x) => `
        <path d="M${x} 88 Q${x - 6} 50 ${x - 16} 24 M${x} 88 Q${x} 46 ${x + 2} 16 M${x} 88 Q${x + 8} 56 ${x + 18} 34" stroke="#16A34A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M${x + 2} 18 Q${x + 12} 22 ${x + 14} 40" stroke="#A16207" stroke-width="2" fill="none"/>
        ${[0, 1, 2, 3, 4].map((k) => `<ellipse cx="${x + 5 + k * 2.2}" cy="${21 + k * 4.2}" rx="2.6" ry="3.8" fill="#FACC15" transform="rotate(-20 ${x + 5 + k * 2.2} ${21 + k * 4.2})"/>`).join("")}`).join("")}`,
    banana: () => `
      <path d="M54 98 L56 40 L66 40 L68 98Z" fill="#84CC16" stroke="#4D7C0F" stroke-width="2"/>
      <path d="M58 50 L58 96 M63 46 L63 96" stroke="#4D7C0F" stroke-width="1.5" opacity=".5"/>
      <path d="M60 42 C40 18 14 18 4 32 C24 30 44 34 60 46Z" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
      <path d="M62 42 C80 14 106 14 116 26 C96 28 78 34 62 46Z" fill="#4ADE80" stroke="#15803D" stroke-width="2"/>
      <path d="M60 40 C56 16 64 4 72 2 C70 18 66 30 62 42Z" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
      <path d="M20 26 l4 6 M34 22 l3 7 M88 20 l-3 7 M102 22 l-4 6" stroke="#15803D" stroke-width="1.5"/>
      <path d="M68 46 Q80 50 82 62" stroke="#4D7C0F" stroke-width="3" fill="none"/>
      ${[0, 1, 2, 3].map((k) => `<path d="M${70 + k * 4} ${52 + k * 3} q10 2 14 -6" stroke="#FACC15" stroke-width="6" fill="none" stroke-linecap="round"/>`).join("")}
      <path d="M82 62 q4 8 0 16 q-6 -6 0 -16Z" fill="#9D174D"/>`,
    mango: () => `
      <path d="M54 98 L58 58 L50 46 M58 58 L70 44 M58 58 L64 98Z" stroke="#78350F" stroke-width="8" fill="#92400E" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="36" cy="42" r="24" fill="#16A34A"/><circle cx="62" cy="28" r="26" fill="#22C55E"/><circle cx="88" cy="44" r="22" fill="#16A34A"/><circle cx="60" cy="52" r="22" fill="#15803D"/>
      ${[[38, 56], [74, 58], [86, 36], [52, 32]].map(([x, y]) => `<path d="M${x} ${y} q8 -2 8 6 q0 8 -8 8 q-6 -4 0 -14Z" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>`).join("")}`,
    coconut: () => `
      <path d="M38 98 Q46 70 56 40 Q60 30 64 22" stroke="#A16207" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M42 90 h9 M46 78 h9 M50 66 h9 M54 54 h9 M58 42 h8" stroke="#78350F" stroke-width="2"/>
      ${["M64 22 Q40 6 14 22", "M64 22 Q44 22 26 44", "M64 22 Q86 4 112 16", "M64 22 Q90 22 104 44", "M64 22 Q64 2 80 0"].map((d) => `<path d="${d}" stroke="#16A34A" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#4ADE80" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="2 4" opacity=".9"/>`).join("")}
      <circle cx="58" cy="28" r="6" fill="#65A30D" stroke="#3F6212" stroke-width="1.5"/><circle cx="68" cy="30" r="6" fill="#65A30D" stroke="#3F6212" stroke-width="1.5"/><circle cx="63" cy="35" r="6" fill="#4D7C0F" stroke="#3F6212" stroke-width="1.5"/>`,
    lotus: () => `
      <ellipse cx="60" cy="86" rx="58" ry="13" fill="#38BDF8"/>
      <path d="M8 86 q8 -3 16 0 M90 90 q8 -3 16 0" stroke="#BAE6FD" stroke-width="2" fill="none"/>
      <path d="M22 84 Q8 84 10 78 Q14 72 30 74 L24 80Z" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
      <path d="M94 88 Q108 90 110 82 Q106 74 90 78 L96 84Z" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
      <path d="M60 84 V42 M84 84 V60" stroke="#16A34A" stroke-width="3.5"/>
      <path d="M72 62 Q84 50 98 58 Q90 64 84 62Z" fill="#4ADE80" stroke="#15803D" stroke-width="1.5"/>
      <path d="M60 44 C46 40 40 26 44 14 C52 20 56 30 60 44Z M60 44 C74 40 80 26 76 14 C68 20 64 30 60 44Z" fill="#F9A8D4" stroke="#DB2777" stroke-width="2"/>
      <path d="M60 44 C52 32 52 16 60 4 C68 16 68 32 60 44Z" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>
      <path d="M60 44 C42 46 32 38 30 30 C42 30 52 36 60 44Z M60 44 C78 46 88 38 90 30 C78 30 68 36 60 44Z" fill="#FBCFE8" stroke="#DB2777" stroke-width="2"/>`,
    sunflower: () => `
      <path d="M60 98 V40" stroke="#15803D" stroke-width="6"/>
      <path d="M60 76 Q40 62 30 70 Q42 82 60 78Z M60 64 Q80 50 92 58 Q80 72 60 66Z" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
      ${Array.from({ length: 14 }, (_, k) => `<ellipse cx="60" cy="10" rx="6" ry="13" fill="#FACC15" stroke="#CA8A04" stroke-width="1" transform="rotate(${k * 360 / 14} 60 28)"/>`).join("")}
      <circle cx="60" cy="28" r="15" fill="#78350F"/>
      ${[[54, 22], [62, 20], [68, 27], [52, 31], [60, 33], [66, 35], [58, 27]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#FDE68A"/>`).join("")}`,
    cactus: () => `
      <path d="M8 98 Q60 84 112 98Z" fill="#FCD34D"/>
      <path d="M48 96 V24 Q48 12 60 12 Q72 12 72 24 V96Z" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/>
      <path d="M48 62 H34 Q26 62 26 54 V36 Q26 28 33 28 Q40 28 40 36 V50 H48" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/>
      <path d="M72 54 H86 Q94 54 94 46 V32 Q94 24 87 24 Q80 24 80 32 V44 H72" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/>
      <path d="M54 20 V92 M60 14 V92 M66 20 V92" stroke="#15803D" stroke-width="1.5" opacity=".5"/>
      ${[[46, 30], [74, 36], [46, 48], [74, 70], [46, 76], [24, 40], [96, 36], [74, 86]].map(([x, y]) => `<path d="M${x} ${y} l${x < 60 ? -5 : 5} -3 M${x} ${y} l${x < 60 ? -5 : 5} 2" stroke="#F8FAFC" stroke-width="1.5"/>`).join("")}
      <circle cx="60" cy="10" r="6" fill="#F472B6"/><circle cx="60" cy="10" r="2.5" fill="#FDE68A"/>`,
    fern: () => `
      ${[["M60 96 Q30 70 8 64", -1], ["M60 96 Q36 56 22 30", -1], ["M60 96 Q60 50 58 14", 0], ["M60 96 Q84 56 98 30", 1], ["M60 96 Q90 70 112 64", 1]].map(([d]) => `<path d="${d}" stroke="#15803D" stroke-width="3" fill="none"/><path d="${d}" stroke="#4ADE80" stroke-width="14" fill="none" stroke-dasharray="3 3" stroke-linecap="round"/>`).join("")}
      <path d="M60 96 Q62 80 70 76 Q78 74 76 82 Q74 86 70 84" stroke="#65A30D" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="30" cy="62" r="1.6" fill="#92400E"/><circle cx="36" cy="58" r="1.6" fill="#92400E"/><circle cx="90" cy="60" r="1.6" fill="#92400E"/>`,
    pine: () => `
      <rect x="54" y="78" width="12" height="20" fill="#78350F"/>
      <path d="M60 4 L84 34 H72 L94 58 H78 L104 84 H16 L42 58 H26 L48 34 H36Z" fill="#166534" stroke="#14532D" stroke-width="2" stroke-linejoin="round"/>
      <path d="M60 10 L72 26 M44 46 L56 40 M78 46 L66 40 M34 72 L50 64 M86 72 L70 64" stroke="#22C55E" stroke-width="2" opacity=".6"/>
      <g fill="#A16207" stroke="#78350F" stroke-width="1.2"><ellipse cx="40" cy="66" rx="5" ry="7"/><ellipse cx="80" cy="70" rx="5" ry="7"/><ellipse cx="62" cy="48" rx="4.5" ry="6"/></g>`
  };
  const PLANT_BG = {
    rice: "#ECFCCB", banana: "#FEF9C3", mango: "#DCFCE7", coconut: "#E0F2FE", lotus: "#E0F2FE",
    sunflower: "#FEF3C7", cactus: "#FFF7ED", fern: "#DCFCE7", pine: "#E0F2FE"
  };
  function plantSvg(id) {
    const draw = PLANT[id];
    if (!draw) return "";
    return `<svg class="gx-plant-svg" viewBox="0 0 120 100" aria-hidden="true" focusable="false">${draw()}</svg>`;
  }

  /* ---------- Sơ đồ bộ phận cây (có cắt lớp đất để thấy rễ) ---------- */
  const PART_IDS = ["roots", "stem", "leaves", "flower", "fruit", "seed"];
  function treeParts(selected, dimOthers) {
    const op = (id) => (dimOthers && selected !== id ? ' opacity=".25"' : "");
    const g = (id, label, inner) => `<g class="gx-part ${selected === id ? "is-selected" : ""}" data-object="${id}" role="button" tabindex="0" aria-label="${label}"${op(id)}>${inner}</g>`;
    const leaf = (cx, cy, rot) => `<path d="M0 0 C18 -16 46 -14 60 0 C46 14 18 16 0 0Z" fill="#22C55E" stroke="#15803D" stroke-width="3" transform="translate(${cx} ${cy}) rotate(${rot})"/><path d="M0 0 H54" stroke="#BBF7D0" stroke-width="2.5" transform="translate(${cx} ${cy}) rotate(${rot})"/>`;
    return `
      ${g("roots", "Rễ", `<path d="M320 336 Q314 380 286 412 Q262 440 240 452 M320 336 Q326 384 352 418 Q370 442 396 456 M320 340 Q318 400 322 478 M300 384 Q276 392 258 386 M338 392 Q362 396 378 388 M318 430 Q300 446 290 468 M322 440 Q340 452 346 474" stroke="#A16207" stroke-width="8" fill="none" stroke-linecap="round"/>`)}
      ${g("stem", "Thân", `<path d="M312 336 V126 Q320 112 328 126 V336Z" fill="#65A30D" stroke="#3F6212" stroke-width="3"/><path d="M326 206 Q360 196 384 178" stroke="#65A30D" stroke-width="9" fill="none" stroke-linecap="round"/>`)}
      ${g("leaves", "Lá", `${leaf(312, 280, 200)}${leaf(328, 248, -20)}${leaf(312, 214, 205)}${leaf(328, 160, -25)}`)}
      ${g("flower", "Hoa", `${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="320" cy="76" rx="15" ry="24" fill="#F472B6" stroke="#DB2777" stroke-width="2.5" transform="rotate(${a} 320 100)"/>`).join("")}<circle cx="320" cy="100" r="13" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5"/>`)}
      ${g("fruit", "Quả", `<path d="M384 178 V190" stroke="#3F6212" stroke-width="4"/><circle cx="386" cy="212" r="24" fill="#EF4444" stroke="#B91C1C" stroke-width="3"/><ellipse cx="378" cy="204" rx="6" ry="9" fill="#FCA5A5" opacity=".8"/><path d="M386 188 q8 -8 16 -4 q-6 8 -16 4Z" fill="#22C55E"/>`)}
      ${g("seed", "Hạt", `<ellipse cx="460" cy="402" rx="20" ry="14" fill="#B45309" stroke="#78350F" stroke-width="3"/><path d="M462 390 Q466 366 456 350 M456 350 q-12 -6 -18 2 q10 6 18 -2Z M456 350 q10 -10 18 -4 q-8 8 -18 4Z" stroke="#16A34A" stroke-width="3.5" fill="#4ADE80"/><path d="M456 414 Q452 430 458 444 M462 414 Q470 428 468 440" stroke="#FEF3C7" stroke-width="3" fill="none" stroke-linecap="round"/>`)}`;
  }
  function partSvg(id) {
    return `<svg class="gx-plant-svg" viewBox="200 40 290 450" aria-hidden="true" focusable="false">
      <rect x="200" y="336" width="290" height="160" fill="#D6B98C" opacity=".5"/>${treeParts(id, true)}</svg>`;
  }
  function partsMapSvg(selected) {
    const sel = (id) => (selected === id ? "is-selected" : "");
    const tag = (id, label, ax, ay, side, ly) => {
      const left = side === "L";
      const bx = left ? -100 : 530, ex = left ? 130 : 530;
      return `<g class="gx-tag ${sel(id)}" data-object="${id}" role="button" tabindex="0" aria-label="${label}">
        <path d="M${ax} ${ay} L${ex} ${ly}" stroke="#5B216E" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
        <circle cx="${ax}" cy="${ay}" r="5" fill="#fff" stroke="#5B216E" stroke-width="2"/>
        <rect x="${bx}" y="${ly - 29}" width="230" height="58" rx="18"/><text x="${bx + 115}" y="${ly + 11}" text-anchor="middle">${label}</text></g>`;
    };
    return `<svg class="gx-map-svg" viewBox="-110 20 880 490" role="group" aria-label="Các bộ phận của cây">
      <rect x="140" y="20" width="440" height="316" rx="20" fill="#E0F2FE"/>
      <circle cx="520" cy="70" r="26" fill="#FDE68A"/>
      <rect x="140" y="336" width="440" height="170" rx="20" fill="#D6B98C"/>
      <path d="M140 336 H580" stroke="#86EFAC" stroke-width="10"/>
      <g fill="#C4A574"><circle cx="190" cy="380" r="6"/><circle cx="540" cy="470" r="8"/><circle cx="420" cy="480" r="5"/><circle cx="200" cy="470" r="7"/></g>
      ${treeParts(selected, false)}
      ${tag("flower", "Hoa", 296, 92, "L", 90)}
      ${tag("leaves", "Lá", 262, 300, "L", 230)}
      ${tag("roots", "Rễ", 270, 420, "L", 410)}
      ${tag("fruit", "Quả", 404, 212, "R", 150)}
      ${tag("stem", "Thân", 326, 300, "R", 280)}
      ${tag("seed", "Hạt", 478, 402, "R", 420)}
    </svg>`;
  }
  const PLANT_ICON = `<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><path d="M40 72 V36" stroke="#16A34A" stroke-width="6" stroke-linecap="round"/><path d="M40 46 C20 46 12 30 14 18 C30 18 40 30 40 46Z" fill="#22C55E"/><path d="M40 38 C56 38 66 24 64 12 C48 12 40 24 40 38Z" fill="#4ADE80"/><rect x="18" y="66" width="44" height="10" rx="5" fill="#A16207"/></svg>`;


  /* ---------- Khu vườn ở tab đầu ----------
     x, y = vị trí trái / đáy (%), w = chiều rộng (% bức tranh). Hàng sau đặt trước. */
  const SPOTS = [
    { id: "pine", x: 1, y: 42, w: 19 },
    { id: "mango", x: 54, y: 44, w: 23 },
    { id: "coconut", x: 78, y: 42, w: 21 },
    { id: "banana", x: 17, y: 27, w: 19 },
    { id: "sunflower", x: 44, y: 30, w: 13 },
    { id: "rice", x: 1, y: 3, w: 24 },
    { id: "lotus", x: 27, y: 2, w: 25 },
    { id: "fern", x: 55, y: 4, w: 18 },
    { id: "cactus", x: 77, y: 4, w: 16 }
  ];
  const flower = (x, y, s, petal, center) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V60" stroke="#4D7C0F" stroke-width="4"/><path d="M0 40 Q-18 30 -22 40 Q-10 46 0 40Z" fill="#65A30D"/>${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="0" cy="-12" rx="8" ry="13" fill="${petal}" transform="rotate(${a})"/>`).join("")}<circle r="8" fill="${center}"/></g>`;
  const SCENE_BG = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs><linearGradient id="gxSkyP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BAE6FD"/><stop offset="1" stop-color="#F0F9FF"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#gxSkyP)"/>
    <circle cx="360" cy="36" r="20" fill="#FDE68A"/>
    <g fill="#fff" opacity=".9"><ellipse cx="200" cy="34" rx="24" ry="8"/><ellipse cx="214" cy="28" rx="14" ry="8"/></g>
    <path d="M0 140 Q100 118 200 134 T400 128 V300 H0Z" fill="#BBF7D0"/>
    <path d="M0 168 Q200 154 400 168 V300 H0Z" fill="#86EFAC"/>
    <path d="M0 228 Q200 216 400 228 V300 H0Z" fill="#6EE7B7" opacity=".6"/>
    <path d="M300 300 Q320 262 400 258 V300Z" fill="#FDE68A" opacity=".8"/></svg>`;

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
      ${R} .gx-spot .gx-plant-svg{width:100%;height:auto;display:block}
      ${R} .gx-spot.is-selected .gx-plant-svg{filter:drop-shadow(0 0 6px rgba(236,72,153,.8))}
      ${R} .gx-logo svg{width:46px}
      ${R} .gx-grid{grid-auto-rows:auto}
      ${R} .gx-grid .gx-thumb{flex:0 0 96px;height:96px}
      ${R} .gx-grid .gx-land-item .gx-item-text{min-height:0}
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
    `;
    document.head.appendChild(style);
  }


  function heroArt(obj) {
    if (PLANT[obj.id]) return `<div class="gx-hero is-organ" style="background:${PLANT_BG[obj.id]}">${plantSvg(obj.id)}</div>`;
    if (PART_IDS.includes(obj.id)) return `<div class="gx-hero is-organ">${partSvg(obj.id)}</div>`;
    return `<div class="gx-hero is-organ" style="background:#DCFCE7">${PLANT_ICON}</div>`;
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
      return `<button type="button" class="gx-spot ${cls}" data-object="${s.id}" style="left:${s.x}%;bottom:${s.y}%;width:${s.w}%;z-index:${100 - Math.round(s.y)}" aria-label="${d.name}">${plantSvg(s.id)}<span class="gx-chip">${d.name}</span></button>`;
    }).join("");
    const what = `<button type="button" class="gx-whole ${selectedId === DATA.overview.id ? "is-selected" : ""}" data-object="${DATA.overview.id}">🌱 Thực vật là gì?</button>`;
    const note = `<div class="gx-scene-note"><span aria-hidden="true">🐰</span><span>Khu vườn có 9 loài cây. Chạm vào từng cây để làm quen nhé!</span>${what}</div>`;
    return `<div class="gx-split">
      <div class="gx-card gx-scene">${SCENE_BG}${note}${spots}</div>
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }
  function partsHtml() {
    if (!isPart(selectedId)) selectedId = DATA.primary[0].id;
    return `<div class="gx-split">
      ${mapCard("Cây có rễ, thân, lá, hoa, quả và hạt. Chạm vào từng bộ phận hoặc tên của nó nhé!", partsMapSvg(selectedId))}
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }

  function gridHtml(items) {
    if (!items.some((i) => i.id === selectedId)) selectedId = items[0].id;
    const cards = items.map((o) => {
      const tick = found.has(o.id) ? `<span class="gx-tick">✓ Đã xem</span>` : "";
      return `<button type="button" class="gx-item gx-land-item ${o.id === selectedId ? "is-selected" : ""}" data-object="${o.id}">${tick}<span class="gx-thumb" style="background:${PLANT_BG[o.id]};padding:6px">${plantSvg(o.id)}</span><span class="gx-item-text"><strong>${o.name}</strong><small>${o.subtitle}</small></span></button>`;
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
      const msg = stars === 3 ? "Tuyệt vời! Con là nhà thực vật học nhí rồi!" : stars === 2 ? "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé." : "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.";
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


  /* Trải nghiệm chăm cây: gieo hạt, tưới, ánh sáng và ngày phát triển. */
  const simPlant = { seeded:false, day:0, growth:0, moisture:35, sun:65, health:100, auto:false, raf:0, last:0, elapsed:0, phase:0, waterEffect:0 };
  const simL = (vi,en) => LANG === "en" ? en : vi;
  function simPlantInfo(){
    if(!simPlant.seeded)return {title:simL("Chưa gieo hạt", "Plant a seed first"),note:simL("Bấm “Gieo hạt” để bắt đầu. Sau đó cho cây đủ nước và ánh sáng nhé!", "Tap “Plant seed” to begin. Then give your plant enough water and sunlight!")};
    if(simPlant.moisture<25)return {title:simL("Cây cần nước!", "Your plant needs water!"),note:simL("Đất quá khô nên cây chưa lớn thêm. Bé hãy tưới nước vừa đủ.", "Dry soil slows growth. Give your plant some water.")};
    if(simPlant.sun<30)return {title:simL("Cây cần ánh sáng!", "Your plant needs sunlight!"),note:simL("Thiếu ánh sáng, cây xanh không tạo đủ thức ăn để phát triển. Hãy tăng nắng.", "Without enough light, green plants cannot make enough food to grow. Add some sunlight.")};
    const stages=[simL("Hạt trong đất", "Seed in soil"),simL("Hạt nảy mầm", "Sprouting seed"),simL("Cây non", "Seedling"),simL("Cây thêm lá", "Growing leaves"),simL("Cây trưởng thành", "Mature plant"),simL("Hoa đã nở!", "Flower in bloom!")];
    return {title:stages[Math.min(5,simPlant.growth)],note:simPlant.growth>=5?simL("Tuyệt vời! Nhờ có nước và ánh sáng, cây đã phát triển và ra hoa. Hãy thử chăm cây thêm lần nữa.","Wonderful! With water and light, your plant grew and bloomed. Try growing another one."):simL("Đất đủ ẩm và có ánh sáng. Bấm “Qua một ngày” để xem cây thay đổi!", "The soil is moist and there is light. Tap “Next day” to see what changes!")};
  }
  function simPlantHtml(){return `<div class="gx-sim"><div class="gx-sim-art"><div class="gx-sim-art-head">🌱 ${simL("Khu vườn của bé","Your growing garden")} <span class="gx-sim-pill">● ${simL("Mô phỏng","Simulation")}</span></div><canvas class="gx-sim-canvas" width="880" height="540" role="img" aria-label="${simL("Cây phát triển qua các giai đoạn khi đủ nước và nắng", "Plant growth stages with water and sunlight")}"></canvas><div class="gx-sim-bottom">📅 ${simL("Ngày", "Day")} <b data-sim-day>${simPlant.day}</b> <span>·</span> 🌱 <span data-sim-status></span></div></div>
    <div class="gx-sim-side"><h3>🐰 ${simL("Bé tự chăm một cái cây", "Grow your own plant")}</h3><p>${simL("Gieo hạt, tưới nước và điều chỉnh nắng. Mỗi lần bấm qua một ngày, bé sẽ thấy cây thay đổi nếu đủ điều kiện.", "Plant a seed, water it and adjust the sunlight. Move forward one day and watch what happens when its needs are met.")}</p>
    <label class="gx-sim-label" for="gx-plant-sun">☀️ ${simL("Ánh sáng", "Sunlight")} <strong><span data-sim-sun>${simPlant.sun}</span>%</strong></label><input id="gx-plant-sun" data-sim-input="sun" type="range" min="0" max="100" step="5" value="${simPlant.sun}">
    <div class="gx-sim-meter">💧 ${simL("Độ ẩm đất", "Soil moisture")} <strong><span data-sim-moisture>${simPlant.moisture}</span>%</strong></div><div class="gx-sim-progress"><span data-sim-waterbar style="width:${simPlant.moisture}%"></span></div>
    <div class="gx-sim-buttons"><button data-sim-action="seed">🌰 ${simL("Gieo hạt mới","Plant new seed")}</button><button data-sim-action="water">💧 ${simL("Tưới nước","Water")}</button><button class="gx-sim-primary" data-sim-action="day">⏩ ${simL("Qua một ngày","Next day")}</button><button data-sim-action="auto">${simPlant.auto?simL("⏸ Tạm dừng","⏸ Pause"):simL("▶ Tua nhanh","▶ Time-lapse")}</button></div>
    <div class="gx-sim-explain" aria-live="polite"><b data-sim-step></b><p data-sim-note></p></div><button class="gx-sim-listen" data-sim-action="listen">🔊 ${simL("Nghe Cô Thỏ giải thích","Listen to Miss Bunny")}</button>
    <p class="gx-sim-fine">${simL("Mỗi ngày là một bước minh họa, không phải tốc độ lớn thật của cây.","Each day is a learning step, not the real speed of plant growth.")}</p></div></div>`;}
  function simPlantDay(){if(!simPlant.seeded)return;simPlant.day+=1;simPlant.moisture=Math.max(0,simPlant.moisture-15);if(simPlant.moisture>=25&&simPlant.sun>=30) {simPlant.growth=Math.min(5,simPlant.growth+1);simPlant.health=Math.min(100,simPlant.health+8);} else simPlant.health=Math.max(40,simPlant.health-15);simPlantUpdate();}
  function simPlantUpdate(){if(!root||activeTab!=="sim")return;const info=simPlantInfo();for(const [sel,val] of [["[data-sim-day]",simPlant.day],["[data-sim-sun]",simPlant.sun],["[data-sim-moisture]",simPlant.moisture],["[data-sim-step]",info.title],["[data-sim-status]",info.title],["[data-sim-note]",info.note]]){const e=root.querySelector(sel);if(e&&e.textContent!==String(val))e.textContent=String(val);}const bar=root.querySelector("[data-sim-waterbar]");if(bar)bar.style.width=`${simPlant.moisture}%`;const auto=root.querySelector('[data-sim-action="auto"]');if(auto)auto.textContent=simPlant.auto?simL("⏸ Tạm dừng","⏸ Pause"):simL("▶ Tua nhanh","▶ Time-lapse");}
  function simPlantDraw(){const canvas=root&&root.querySelector(".gx-sim-canvas");if(!canvas)return;const c=canvas.getContext("2d");if(!c)return;const w=880,h=540;c.clearRect(0,0,w,h);
    const sky=c.createLinearGradient(0,0,0,445);sky.addColorStop(0,"#c2eaff");sky.addColorStop(1,"#f0fdf4");c.fillStyle=sky;c.fillRect(0,0,w,h);
    const sunX=135;const amount=simPlant.sun/100;c.fillStyle=`rgba(253,224,71,${.22+amount*.75})`;c.beginPath();c.arc(sunX,105,43+amount*15,0,Math.PI*2);c.fill();c.strokeStyle=`rgba(250,204,21,${.3+amount*.6})`;c.lineWidth=5;for(let k=0;k<12;k++){const a=k*Math.PI/6+simPlant.phase*.012;c.beginPath();c.moveTo(sunX+Math.cos(a)*67,105+Math.sin(a)*67);c.lineTo(sunX+Math.cos(a)*86,105+Math.sin(a)*86);c.stroke();}
    // Friendly clouds and tiny butterflies.
    c.fillStyle="rgba(255,255,255,.92)";for(const cx of [420,680]){const y=102+Math.sin(simPlant.phase/15+cx)*8;c.beginPath();c.ellipse(cx,y,69,27,0,0,Math.PI*2);c.ellipse(cx-31,y-17,32,24,0,0,Math.PI*2);c.ellipse(cx+22,y-20,38,31,0,0,Math.PI*2);c.fill();}
    c.fillStyle="#a7e6a5";c.beginPath();c.moveTo(0,412);c.quadraticCurveTo(220,334,440,412);c.quadraticCurveTo(620,330,880,402);c.lineTo(880,540);c.lineTo(0,540);c.fill();
    c.fillStyle="#a16207";c.fillRect(0,412,880,128);c.fillStyle="#b98040";for(let i=0;i<28;i++){c.beginPath();c.arc((i*83)%w,445+(i*67)%80,2+i%4,0,Math.PI*2);c.fill();}
    // Soil water changes the color of the surface.
    c.fillStyle=`rgba(59,130,246,${simPlant.moisture*.003})`;c.fillRect(0,412,880,128);
    if(!simPlant.seeded)return;
    const g=simPlant.growth;const sway=Math.sin(simPlant.phase/13)*4;
    // Seed and roots, then a stem and leaves.
    c.fillStyle="#92400e";c.beginPath();c.ellipse(440,433,19,12,.3,0,Math.PI*2);c.fill();
    if(g>=1){c.strokeStyle="#fef3c7";c.lineWidth=5;c.lineCap="round";c.beginPath();c.moveTo(441,435);c.lineTo(453,458);c.lineTo(445,493);c.moveTo(453,458);c.lineTo(478,477);c.stroke();}
    const hh=[0,16,100,168,222,265][g];if(g>=1){c.lineCap="round";c.strokeStyle=simPlant.health<55?"#b59c59":"#15803d";c.lineWidth=12;c.beginPath();c.moveTo(440,410);c.quadraticCurveTo(425+sway,410-hh*.5,440+sway,410-hh);c.stroke();}
    for(let j=0;j<Math.max(0,g-1)*2;j++){const yy=395-(j+1)*hh/(Math.max(1,(g-1)*2+1));const side=j%2?1:-1;const x=440+sway*(1-(410-yy)/350);c.save();c.translate(x,yy);c.rotate(side*.22+Math.sin(simPlant.phase/15+j)*.04);c.fillStyle=simPlant.health<55?"#a3a748":j%3?"#22c55e":"#4ade80";c.beginPath();c.ellipse(side*45,-16,57,20,-side*.35,0,Math.PI*2);c.fill();c.strokeStyle="#15803d";c.lineWidth=2;c.beginPath();c.moveTo(0,0);c.lineTo(side*85,-24);c.stroke();c.restore();}
    if(g>=5){const cy=410-hh-20;for(let k=0;k<8;k++){const a=k*Math.PI/4+Math.sin(simPlant.phase/19)*.03;c.fillStyle=k%2?"#fb7185":"#f472b6";c.beginPath();c.ellipse(440+Math.cos(a)*25+sway,cy+Math.sin(a)*25,24,39,a,0,Math.PI*2);c.fill();}c.fillStyle="#facc15";c.beginPath();c.arc(440+sway,cy,20,0,Math.PI*2);c.fill();}
    if(simPlant.waterEffect>0){c.fillStyle="rgba(56,189,248,.83)";for(let i=0;i<13;i++){const t=(i*71+simPlant.phase*30)%240;c.beginPath();c.ellipse(340+i*9,160+t,4,8,-.5,0,Math.PI*2);c.fill();}}
    c.font="bold 22px sans-serif";c.fillStyle="#166534";c.fillText(simL("Đủ nước + đủ nắng = cây lớn lên","Water + sunlight help plants grow"),23,515);
  }
  function simPlantFrame(now){if(!root||!root.isConnected||activeTab!=="sim"||document.hidden){simPlant.raf=0;simPlant.last=0;return;}const dt=simPlant.last?Math.min(100,now-simPlant.last):0;simPlant.last=now;simPlant.phase+=dt/35;simPlant.waterEffect=Math.max(0,simPlant.waterEffect-dt/1000);if(simPlant.auto){simPlant.elapsed+=dt;if(simPlant.elapsed>1400){simPlant.elapsed=0;simPlantDay();if(simPlant.growth>=5)simPlant.auto=false;}}simPlantDraw();simPlant.raf=requestAnimationFrame(simPlantFrame);}
  function simPlantStop(){if(simPlant.raf)cancelAnimationFrame(simPlant.raf);simPlant.raf=0;simPlant.last=0;}
  function simPlantStart(){simPlantStop();if(root&&activeTab==="sim"&&!document.hidden)simPlant.raf=requestAnimationFrame(simPlantFrame);}
  function simPlantAction(action,value){if(action==="sun")simPlant.sun=Math.max(0,Math.min(100,+value||0));else if(action==="seed"){Object.assign(simPlant,{seeded:true,day:0,growth:0,moisture:50,health:100,auto:false});}else if(action==="water"){if(!simPlant.seeded)return;simPlant.moisture=Math.min(100,simPlant.moisture+35);simPlant.waterEffect=1.5;}else if(action==="day")simPlantDay();else if(action==="auto"){if(!simPlant.seeded)return;simPlant.auto=!simPlant.auto;simPlant.elapsed=0;}else if(action==="listen"){const info=simPlantInfo();speak("sim-plant",`${info.title}. ${info.note}`);return;}simPlantUpdate();simPlantDraw();}

  function renderStage({ readQuestion = false } = {}) {
    if (!root) return;
    stopSpeak(false);
    simPlantStop();
    const stage = root.querySelector(".gx-stage");
    if (activeTab === "garden" && isPart(selectedId)) selectedId = DATA.overview.id;
    if (activeTab === "parts" && !isPart(selectedId)) selectedId = DATA.primary[0].id;
    if (activeTab === "bugs" && !isBug(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz" && activeTab !== "sim") markFound(selectedId, true);
    let html = "";
    if (activeTab === "garden") html = gardenHtml();
    else if (activeTab === "parts") html = partsHtml();
    else if (activeTab === "bugs") html = gridHtml(DATA.secondary);
    else if (activeTab === "sim") html = simPlantHtml();
    else html = quizHtml();
    stage.innerHTML = `<section class="gx-panel" style="height:100%">${html}</section>`;
    updateSpeakButtons();
    if (activeTab === "sim") { simPlantUpdate(); simPlantStart(); }
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
    if (n === total) toast("🏆 Con đã khám phá hết thế giới cây xanh rồi! Giỏi quá!");
    else toast(`🌱 Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { garden: "Vườn cây", parts: "Bộ phận cây", bugs: "Cây quanh bé", quiz: "Hỏi đáp", sim: "Thực hành" };
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

    root.addEventListener("input", (event) => {
      const i=event.target.closest("[data-sim-input]");
      if (i) simPlantAction(i.dataset.simInput,i.value);
    }, { signal });
    root.addEventListener("click", (event) => {
      const t = event.target;
      const simButton = t.closest("[data-sim-action]");
      if (simButton) { simPlantAction(simButton.dataset.simAction); return; }
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

    document.addEventListener("visibilitychange", () => { if (document.hidden) { stopSpeak(); simPlantStop(); } else if (activeTab === "sim") simPlantStart(); }, { signal });
  }

  function render(context) {
    activeContext = context;
    injectAssets();
    if (!document.getElementById(CONFIG.rootId + "-sim-style")) {
      const st=document.createElement("style");st.id=CONFIG.rootId + "-sim-style";
      st.textContent = `
      #plant-explorer{box-sizing:border-box;max-width:100%}
      /* Mô phỏng thực hành tương tác dùng chung phong cách game Khám phá. */
      #plant-explorer .gx-tabs:has([data-tab="sim"]){grid-template-columns:repeat(5,minmax(0,1fr))}
      #plant-explorer .gx-tab[data-tab="sim"][aria-selected="true"]{background:var(--grad-alt)}
      #plant-explorer .gx-sim{display:grid;grid-template-columns:minmax(0,1.06fr) minmax(310px,.94fr);gap:15px;align-items:stretch;min-width:0;max-width:100%;height:100%}
      #plant-explorer .gx-sim *{box-sizing:border-box}
      #plant-explorer .gx-sim-art{min-width:0;border:1px solid #bae6fd;border-radius:20px;overflow:hidden;background:#e0f2fe;display:flex;flex-direction:column}
      #plant-explorer .gx-sim-art-head{padding:10px 14px;background:linear-gradient(90deg,#dbeafe,#fce7f3);color:#581c87;font-size:18px;font-weight:900;display:flex;align-items:center;gap:8px;justify-content:space-between;flex-wrap:wrap}
      #plant-explorer .gx-sim-pill{border:1px solid #86efac;color:#047857;background:#ecfdf5;padding:3px 9px;font-size:12px;font-weight:900;border-radius:99px;white-space:nowrap}
      #plant-explorer .gx-sim-canvas{width:100%;height:auto;max-height:510px;display:block;aspect-ratio:880/540;object-fit:contain;flex:1;min-height:0;background:#e0f2fe}
      #plant-explorer .gx-sim-bottom{min-height:42px;padding:9px 14px;background:#fff;color:#075985;font-weight:900;font-size:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      #plant-explorer .gx-sim-side{min-width:0;max-width:100%;display:flex;flex-direction:column;gap:10px;border:1px solid #ddd6fe;border-radius:20px;padding:17px;background:linear-gradient(155deg,#fff,#fdf4ff)}
      #plant-explorer .gx-sim-side h3{font-size:clamp(19px,2vw,25px);font-weight:1000;line-height:1.24;color:#6b21a8;margin:0}
      #plant-explorer .gx-sim-side p{margin:0;color:#475569;line-height:1.48;font-weight:700;font-size:15px}
      #plant-explorer .gx-sim-label,#plant-explorer .gx-sim-meter{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap;font-size:16px;font-weight:800;color:#0f766e}
      #plant-explorer .gx-sim-label strong,#plant-explorer .gx-sim-meter strong{color:#7e22ce}
      #plant-explorer .gx-sim-side input[type="range"]{width:100%;height:28px;accent-color:#0d9488;cursor:pointer;touch-action:pan-y}
      #plant-explorer .gx-sim-progress{width:100%;height:12px;background:#e0f2fe;border-radius:99px;overflow:hidden;border:1px solid #bae6fd}
      #plant-explorer .gx-sim-progress>span{display:block;background:linear-gradient(90deg,#3b82f6,#14b8a6);height:100%;border-radius:99px;transition:width .15s}
      #plant-explorer .gx-sim-progress.is-cloud>span{background:linear-gradient(90deg,#a78bfa,#64748b)}
      #plant-explorer .gx-sim-buttons{display:flex;gap:8px;flex-wrap:wrap}
      #plant-explorer .gx-sim-buttons button,#plant-explorer .gx-sim-listen{font-family:inherit;font-size:16px;font-weight:800;min-height:43px;padding:7px 12px;border:1px solid #bfdbfe;border-radius:12px;background:#fff;color:#1d4ed8;cursor:pointer;line-height:1.25}
      #plant-explorer .gx-sim-buttons .gx-sim-primary{background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent;color:#fff}
      #plant-explorer .gx-sim-listen{background:#ecfdf5;border-color:#6ee7b7;color:#047857;align-self:flex-start}
      #plant-explorer .gx-sim-buttons button:focus-visible,#plant-explorer .gx-sim-listen:focus-visible{outline:3px solid #93c5fd;outline-offset:2px}
      #plant-explorer .gx-sim-explain{border:1px solid #f9a8d4;background:#fff1f7;border-radius:16px;padding:12px;min-height:106px}
      #plant-explorer .gx-sim-explain b{color:#be185d;font-size:18px}
      #plant-explorer .gx-sim-explain p{color:#7e225d;font-weight:700;margin-top:5px}
      #plant-explorer .gx-sim-side .gx-sim-fine{font-size:12.5px;color:#64748b}
      @media(max-width:850px){#plant-explorer .gx-tabs:has([data-tab="sim"]){grid-template-columns:repeat(3,minmax(0,1fr))}#plant-explorer .gx-sim{grid-template-columns:1fr;height:auto}#plant-explorer .gx-sim-canvas{flex:none}#plant-explorer .gx-sim-art-head{font-size:16px}}
      @media(max-width:520px){#plant-explorer .gx-tabs:has([data-tab="sim"]){grid-template-columns:repeat(2,minmax(0,1fr))}#plant-explorer .gx-sim-side{padding:12px;gap:9px}#plant-explorer .gx-sim-buttons button{font-size:14px;min-height:43px}#plant-explorer .gx-sim-art-head{padding:8px 10px}#plant-explorer .gx-sim-canvas{max-height:none}}
`;
      document.head.appendChild(st);
    }
    activeTab = "garden";
    selectedId = DATA.overview.id;
    quiz = null;
    found = loadFound();
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `
      <header class="gx-head">
        <div class="gx-logo" aria-hidden="true">${PLANT_ICON}</div>
        <div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div>
        ${langHtml()}<div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="garden" type="button" aria-selected="true">🌳 Vườn cây</button>
        <button class="gx-tab" role="tab" data-tab="parts" type="button" aria-selected="false" tabindex="-1">🌱 Bộ phận cây</button>
        <button class="gx-tab" role="tab" data-tab="bugs" type="button" aria-selected="false" tabindex="-1">🌿 Cây quanh bé</button>
        <button class="gx-tab" role="tab" data-tab="sim" type="button" aria-selected="false" tabindex="-1">🌱 Nuôi cây</button>
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
    simPlantStop();
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
