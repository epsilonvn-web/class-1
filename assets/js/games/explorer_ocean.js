(() => {
  "use strict";

  /* =====================================================================
     Khám phá đại dương — bản nâng cấp
     Giữ nguyên giao diện module: window.CLASS1_GAME_MODULES.oceanExplorer
     = { render(context), destroy() }, context.host, context.hooks.setSubBanner
     ===================================================================== */

  const CONFIG = Object.freeze({
    moduleKey: "oceanExplorer",
    styleId: "class1-game-ocean-explorer-style-v2",
    fontId: "class1-game-explorer-font",
    rootId: "ocean-explorer",
    gameNumber: 10,
    title: "Khám phá đại dương",
    subtitle: "Cùng Cô Thỏ Hồng lặn xuống thế giới dưới biển",
    storageKey: "class1.oceanExplorer.found.v1",
    roundSize: 10
  });

  const DATA = Object.freeze({"overview": {"id": "ocean-overview", "name": "Đại dương xanh", "subtitle": "Phần lớn bề mặt Trái Đất là nước biển", "summary": "Đại dương là một thế giới khổng lồ gồm nước mặn, từ vùng mặt biển ngập nắng tới những rãnh sâu tối đen. Nơi đây là nhà của vô số sinh vật, từ sinh vật phù du rất nhỏ tới cá voi xanh khổng lồ.", "more": "Các đại dương giúp điều hòa khí hậu, tham gia vòng tuần hoàn nước và tạo ra một phần lớn lượng ôxy trong khí quyển nhờ các sinh vật quang hợp nhỏ bé sống gần mặt biển. Càng xuống sâu, ánh sáng càng ít, nhiệt độ thường giảm và áp suất tăng mạnh.", "remember": "Bé nhớ nhé: biển không chỉ có cá. Đại dương còn có động vật có vú, bò sát, thân mềm, sứa, san hô và vô số sinh vật li ti.", "facts": [{"label": "Bao phủ Trái Đất", "value": "Khoảng 71% bề mặt"}, {"label": "Nước", "value": "Chủ yếu là nước mặn"}, {"label": "Độ sâu trung bình", "value": "Khoảng 3,7 km"}, {"label": "Ánh sáng", "value": "Mạnh ở gần mặt biển, yếu dần khi xuống sâu"}, {"label": "Vai trò", "value": "Điều hòa khí hậu và vòng tuần hoàn nước"}, {"label": "Sự sống", "value": "Từ sinh vật phù du tới cá voi xanh"}]}, "primary": [{"id": "sunlight-zone", "name": "Tầng ánh sáng", "subtitle": "0–200 m", "summary": "Đây là lớp nước gần mặt biển, nhận được nhiều ánh sáng Mặt Trời nhất.", "more": "Ánh sáng đủ mạnh để tảo và thực vật phù du quang hợp. Vì vậy đây là vùng có rất nhiều sinh vật và cũng là nơi ta thường thấy san hô, rùa biển, cá heo và nhiều loài cá.", "remember": "Có nhiều ánh sáng nhất và là vùng dễ quang hợp nhất.", "facts": [{"label": "Độ sâu", "value": "0–200 m"}, {"label": "Ánh sáng", "value": "Nhiều"}, {"label": "Nhiệt độ", "value": "Ấm hơn các tầng sâu"}, {"label": "Quang hợp", "value": "Có thể diễn ra"}, {"label": "Sinh vật tiêu biểu", "value": "Cá, san hô, rùa biển, cá heo"}]}, {"id": "twilight-zone", "name": "Tầng chạng vạng", "subtitle": "200–1.000 m", "summary": "Ánh sáng ở đây rất yếu, giống như buổi chạng vạng kéo dài.", "more": "Không còn đủ ánh sáng cho thực vật quang hợp tốt. Nhiều sinh vật có mắt lớn hoặc cơ thể phát sáng để tìm bạn, dụ mồi hoặc tránh kẻ săn mồi.", "remember": "Ánh sáng yếu, chưa tối hoàn toàn và có nhiều sinh vật phát sáng.", "facts": [{"label": "Độ sâu", "value": "200–1.000 m"}, {"label": "Ánh sáng", "value": "Rất yếu"}, {"label": "Quang hợp", "value": "Hầu như không"}, {"label": "Đặc điểm", "value": "Nhiều sinh vật di chuyển lên xuống theo ngày đêm"}, {"label": "Sinh vật tiêu biểu", "value": "Cá đèn lồng, mực"}]}, {"id": "midnight-zone", "name": "Tầng nửa đêm", "subtitle": "1.000–4.000 m", "summary": "Đây là vùng không còn ánh sáng Mặt Trời chiếu tới.", "more": "Nước lạnh, áp suất lớn và thức ăn khan hiếm. Nhiều sinh vật tạo ánh sáng sinh học của riêng mình. Một số loài có miệng lớn để tận dụng cơ hội bắt mồi hiếm hoi.", "remember": "Không có ánh sáng Mặt Trời; sinh vật phải thích nghi với lạnh, tối và áp suất lớn.", "facts": [{"label": "Độ sâu", "value": "1.000–4.000 m"}, {"label": "Ánh sáng", "value": "Không có ánh sáng Mặt Trời"}, {"label": "Nhiệt độ", "value": "Lạnh"}, {"label": "Áp suất", "value": "Rất lớn"}, {"label": "Sinh vật tiêu biểu", "value": "Cá cần câu, mực biển sâu"}]}, {"id": "abyss-zone", "name": "Tầng vực thẳm", "subtitle": "4.000–6.000 m", "summary": "Một vùng biển sâu rộng lớn, tối hoàn toàn và gần đóng băng.", "more": "Đáy biển ở đây thường là những đồng bằng sâu phủ bùn mịn. Dù điều kiện rất khắc nghiệt, vẫn có hải sâm, sao biển, giáp xác và nhiều sinh vật nhỏ sinh sống.", "remember": "Rất sâu, rất lạnh, rất tối nhưng vẫn có sự sống.", "facts": [{"label": "Độ sâu", "value": "4.000–6.000 m"}, {"label": "Ánh sáng", "value": "Không có"}, {"label": "Nhiệt độ", "value": "Gần 0–4°C"}, {"label": "Đáy biển", "value": "Nhiều vùng đồng bằng sâu"}, {"label": "Sinh vật tiêu biểu", "value": "Hải sâm, sao biển, giáp xác"}]}, {"id": "trench-zone", "name": "Rãnh đại dương", "subtitle": "Sâu hơn 6.000 m", "summary": "Đây là những khe sâu nhất của đáy đại dương.", "more": "Một số rãnh sâu hơn 10 km. Áp suất khổng lồ nhưng các nhà khoa học vẫn tìm thấy vi sinh vật, giáp xác nhỏ và những loài cá đặc biệt ở một số khu vực.", "remember": "Là vùng sâu nhất đại dương; rãnh Mariana có nơi sâu hơn 10 km.", "facts": [{"label": "Độ sâu", "value": "Trên 6.000 m"}, {"label": "Ánh sáng", "value": "Không có"}, {"label": "Áp suất", "value": "Cực lớn"}, {"label": "Ví dụ", "value": "Rãnh Mariana"}, {"label": "Sự sống", "value": "Vẫn có sinh vật thích nghi đặc biệt"}]}], "secondary": [{"id": "blue-whale", "name": "Cá voi xanh", "subtitle": "Động vật có vú lớn nhất", "summary": "Cá voi xanh là động vật lớn nhất từng được biết tới trên Trái Đất.", "more": "Cá voi xanh sống ở đại dương rộng, ăn chủ yếu là nhuyễn thể krill rất nhỏ. Dù sống dưới nước, nó là động vật có vú nên phải ngoi lên mặt biển để thở bằng phổi.", "remember": "Rất lớn nhưng thức ăn chính lại là krill rất nhỏ; thở bằng phổi.", "facts": [{"label": "Kích thước", "value": "Có thể dài khoảng 24–30 m"}, {"label": "Nơi sống", "value": "Đại dương rộng"}, {"label": "Thức ăn", "value": "Krill"}, {"label": "Hô hấp", "value": "Bằng phổi"}, {"label": "Di chuyển", "value": "Bơi bằng đuôi theo nhịp lên xuống"}, {"label": "Nhóm", "value": "Động vật có vú"}]}, {"id": "dolphin", "name": "Cá heo", "subtitle": "Động vật có vú thông minh", "summary": "Cá heo là động vật có vú sống ở biển, nổi tiếng vì khả năng giao tiếp và định vị bằng âm thanh.", "more": "Cá heo thường sống theo nhóm. Chúng phát ra âm thanh và nghe tiếng vọng để tìm vật thể, con mồi và định hướng trong nước.", "remember": "Cá heo không phải cá; chúng là động vật có vú và phải thở không khí.", "facts": [{"label": "Nơi sống", "value": "Nhiều vùng biển và đại dương"}, {"label": "Thức ăn", "value": "Cá và mực"}, {"label": "Hô hấp", "value": "Bằng phổi"}, {"label": "Đặc biệt", "value": "Dùng âm thanh và tiếng vọng"}, {"label": "Xã hội", "value": "Thường sống theo nhóm"}, {"label": "Nhóm", "value": "Động vật có vú"}]}, {"id": "sea-turtle", "name": "Rùa biển", "subtitle": "Bò sát sống ở biển", "summary": "Rùa biển dành phần lớn cuộc đời ở biển nhưng rùa cái phải lên bãi cát để đẻ trứng.", "more": "Rùa biển bơi bằng bốn chi biến đổi thành mái chèo. Chúng thở bằng phổi nên vẫn phải ngoi lên mặt nước lấy không khí.", "remember": "Sống ở biển nhưng đẻ trứng trên bãi cát và thở bằng phổi.", "facts": [{"label": "Nhóm", "value": "Bò sát"}, {"label": "Hô hấp", "value": "Bằng phổi"}, {"label": "Di chuyển", "value": "Bơi bằng các chi dạng mái chèo"}, {"label": "Sinh sản", "value": "Đẻ trứng trên bãi cát"}, {"label": "Thức ăn", "value": "Tùy loài: cỏ biển, sứa, động vật nhỏ"}]}, {"id": "great-white", "name": "Cá mập trắng", "subtitle": "Cá săn mồi lớn", "summary": "Cá mập trắng là một loài cá lớn, có thân hình khỏe và nhiều hàng răng sắc.", "more": "Cá mập thở bằng mang, không phải bằng phổi. Cơ thể thuôn giúp bơi nhanh, còn nhiều giác quan giúp chúng tìm con mồi trong đại dương.", "remember": "Là cá nên thở bằng mang; không phải động vật có vú.", "facts": [{"label": "Nhóm", "value": "Cá"}, {"label": "Hô hấp", "value": "Bằng mang"}, {"label": "Nơi sống", "value": "Biển ven bờ và đại dương"}, {"label": "Thức ăn", "value": "Cá, hải cẩu và động vật biển khác"}, {"label": "Đặc biệt", "value": "Nhiều giác quan nhạy"}]}, {"id": "octopus", "name": "Bạch tuộc", "subtitle": "Thân mềm tám tay", "summary": "Bạch tuộc có tám tay linh hoạt với rất nhiều giác hút.", "more": "Bạch tuộc có thể đổi màu và hoa văn da để ngụy trang hoặc giao tiếp. Nó rất khéo léo, có khả năng giải quyết nhiều bài toán đơn giản và có ba trái tim.", "remember": "Có 8 tay, 3 trái tim và khả năng đổi màu rất đặc biệt.", "facts": [{"label": "Nhóm", "value": "Động vật thân mềm"}, {"label": "Số tay", "value": "8"}, {"label": "Hô hấp", "value": "Bằng mang"}, {"label": "Đặc biệt", "value": "Có thể đổi màu"}, {"label": "Số tim", "value": "3"}, {"label": "Thức ăn", "value": "Cua, tôm, cá nhỏ"}]}, {"id": "clownfish", "name": "Cá hề", "subtitle": "Bạn của hải quỳ", "summary": "Cá hề thường sống giữa các xúc tu của hải quỳ ở vùng biển nhiệt đới.", "more": "Lớp nhầy trên da giúp cá hề sống gần hải quỳ mà không bị chích như nhiều loài cá khác. Hai bên có thể mang lại lợi ích cho nhau.", "remember": "Cá hề nổi tiếng vì sống gần hải quỳ ở rạn san hô.", "facts": [{"label": "Nhóm", "value": "Cá"}, {"label": "Hô hấp", "value": "Bằng mang"}, {"label": "Nơi sống", "value": "Rạn san hô nhiệt đới"}, {"label": "Bạn đồng hành", "value": "Hải quỳ"}, {"label": "Thức ăn", "value": "Động vật nhỏ và tảo"}]}, {"id": "jellyfish", "name": "Sứa", "subtitle": "Cơ thể mềm như thạch", "summary": "Sứa có cơ thể mềm, phần lớn là nước và thường có các xúc tu.", "more": "Sứa không có xương, không có tim và não giống động vật có xương sống. Một mạng thần kinh đơn giản giúp cơ thể phản ứng với môi trường.", "remember": "Cơ thể phần lớn là nước, không có xương và có xúc tu.", "facts": [{"label": "Cơ thể", "value": "Phần lớn là nước"}, {"label": "Xương", "value": "Không có"}, {"label": "Nơi sống", "value": "Từ mặt biển tới biển sâu, tùy loài"}, {"label": "Di chuyển", "value": "Co bóp cơ thể và trôi theo dòng nước"}, {"label": "Thức ăn", "value": "Sinh vật phù du, trứng cá, cá nhỏ"}]}, {"id": "anglerfish", "name": "Cá cần câu", "subtitle": "Thợ săn biển sâu", "summary": "Một số cá cần câu biển sâu có phần phát sáng giống chiếc 'cần câu' trước miệng.", "more": "Trong nơi tối đen, ánh sáng nhỏ này có thể giúp thu hút con mồi lại gần. Nhiều loài có miệng lớn và răng dài để tận dụng thức ăn hiếm hoi.", "remember": "Sống ở biển sâu và dùng ánh sáng sinh học để hỗ trợ săn mồi.", "facts": [{"label": "Nơi sống", "value": "Biển sâu"}, {"label": "Ánh sáng", "value": "Tự phát sáng sinh học ở một số loài"}, {"label": "Thức ăn", "value": "Cá và sinh vật nhỏ"}, {"label": "Đặc biệt", "value": "Có phần giống cần câu trước miệng"}, {"label": "Môi trường", "value": "Tối, lạnh, áp suất lớn"}]}, {"id": "giant-squid", "name": "Mực khổng lồ", "subtitle": "Mực biển sâu bí ẩn", "summary": "Mực khổng lồ là một loài mực lớn sống ở vùng biển sâu và rất hiếm khi được nhìn thấy còn sống.", "more": "Nó có đôi mắt rất lớn giúp thu nhận ánh sáng yếu, cùng các tay và xúc tu dài để bắt mồi. Cá nhà táng là một trong những kẻ săn mồi của mực khổng lồ.", "remember": "Sống ở biển sâu, có mắt rất lớn và xúc tu dài.", "facts": [{"label": "Nơi sống", "value": "Biển sâu"}, {"label": "Đặc biệt", "value": "Đôi mắt rất lớn"}, {"label": "Cơ thể", "value": "Tay và xúc tu dài"}, {"label": "Hô hấp", "value": "Bằng mang"}, {"label": "Thức ăn", "value": "Cá và các loài mực khác"}]}], "quiz": [{"q": "Khoảng bao nhiêu phần trăm bề mặt Trái Đất được đại dương bao phủ?", "a": ["Khoảng 20%", "Khoảng 50%", "Khoảng 71%", "Khoảng 95%"], "c": 2, "note": "Đại dương bao phủ khoảng 71% bề mặt Trái Đất."}, {"q": "Nước trong đại dương chủ yếu là loại nước nào?", "a": ["Nước ngọt", "Nước mặn", "Nước có đường", "Nước tinh khiết"], "c": 1, "note": "Đại dương chủ yếu là nước mặn."}, {"q": "Càng xuống sâu trong đại dương thì ánh sáng thường thay đổi thế nào?", "a": ["Mạnh dần", "Yếu dần", "Không thay đổi", "Biến thành màu đỏ"], "c": 1, "note": "Ánh sáng giảm dần khi xuống sâu."}, {"q": "Càng xuống sâu, áp suất nước thường thế nào?", "a": ["Giảm dần", "Tăng dần", "Không đổi", "Biến mất"], "c": 1, "note": "Áp suất tăng mạnh khi độ sâu tăng."}, {"q": "Tầng nào nhận nhiều ánh sáng Mặt Trời nhất?", "a": ["Tầng ánh sáng", "Tầng nửa đêm", "Tầng vực thẳm", "Rãnh đại dương"], "c": 0, "note": "Tầng ánh sáng ở gần mặt biển nhận nhiều ánh sáng nhất."}, {"q": "Tầng chạng vạng nằm khoảng ở độ sâu nào?", "a": ["0–20 m", "200–1.000 m", "4.000–6.000 m", "Trên 10.000 m"], "c": 1, "note": "Tầng chạng vạng nằm khoảng 200–1.000 m."}, {"q": "Tầng nào không còn ánh sáng Mặt Trời và nằm khoảng 1.000–4.000 m?", "a": ["Tầng ánh sáng", "Tầng chạng vạng", "Tầng nửa đêm", "Mặt biển"], "c": 2, "note": "Tầng nửa đêm nằm khoảng 1.000–4.000 m."}, {"q": "Tầng vực thẳm thường nằm ở độ sâu nào?", "a": ["4.000–6.000 m", "0–200 m", "200–500 m", "Khoảng 50 m"], "c": 0, "note": "Tầng vực thẳm nằm khoảng 4.000–6.000 m."}, {"q": "Rãnh đại dương thường sâu hơn mốc nào?", "a": ["200 m", "1.000 m", "6.000 m", "100 m"], "c": 2, "note": "Rãnh đại dương thường sâu hơn 6.000 m."}, {"q": "Rãnh Mariana là ví dụ của gì?", "a": ["Một rạn san hô", "Một rãnh đại dương rất sâu", "Một hòn đảo", "Một con sông"], "c": 1, "note": "Rãnh Mariana là một rãnh đại dương rất sâu."}, {"q": "Cá voi xanh thở bằng gì?", "a": ["Mang", "Phổi", "Da", "Không cần thở"], "c": 1, "note": "Cá voi xanh là động vật có vú nên thở bằng phổi."}, {"q": "Thức ăn chính của cá voi xanh là gì?", "a": ["Krill", "Cỏ biển", "San hô", "Rong biển"], "c": 0, "note": "Cá voi xanh ăn chủ yếu là krill rất nhỏ."}, {"q": "Cá voi xanh thuộc nhóm nào?", "a": ["Cá", "Bò sát", "Động vật có vú", "Thân mềm"], "c": 2, "note": "Cá voi xanh là động vật có vú."}, {"q": "Cá heo thuộc nhóm nào?", "a": ["Động vật có vú", "Cá", "Thân mềm", "Bò sát"], "c": 0, "note": "Cá heo là động vật có vú."}, {"q": "Cá heo có thể dùng gì để định hướng?", "a": ["Mùi hoa", "Âm thanh và tiếng vọng", "Ánh sáng Mặt Trời", "Cánh"], "c": 1, "note": "Cá heo có thể dùng âm thanh và tiếng vọng để định hướng."}, {"q": "Cá heo thở bằng gì?", "a": ["Mang", "Phổi", "Da", "Vây"], "c": 1, "note": "Cá heo thở không khí bằng phổi."}, {"q": "Rùa biển thở bằng gì?", "a": ["Mang", "Phổi", "Da", "Vỏ"], "c": 1, "note": "Rùa biển là bò sát và thở bằng phổi."}, {"q": "Rùa biển cái thường đẻ trứng ở đâu?", "a": ["Trên bãi cát", "Giữa tầng nửa đêm", "Trong rạn san hô", "Trên cây"], "c": 0, "note": "Rùa biển cái lên bãi cát để đẻ trứng."}, {"q": "Các chi của rùa biển giúp nó làm gì?", "a": ["Bay", "Bơi như mái chèo", "Leo cây", "Đào mỏ"], "c": 1, "note": "Các chi của rùa biển thích nghi để bơi."}, {"q": "Cá mập trắng thở bằng gì?", "a": ["Phổi", "Mang", "Da", "Mũi"], "c": 1, "note": "Cá mập trắng là cá nên thở bằng mang."}, {"q": "Cá mập trắng thuộc nhóm nào?", "a": ["Cá", "Động vật có vú", "Bò sát", "Chim"], "c": 0, "note": "Cá mập trắng là một loài cá."}, {"q": "Thân hình thuôn giúp cá mập làm gì?", "a": ["Bơi hiệu quả", "Bay cao", "Sống trên cạn", "Quang hợp"], "c": 0, "note": "Thân thuôn giúp cá mập bơi hiệu quả trong nước."}, {"q": "Bạch tuộc có bao nhiêu tay?", "a": ["4", "6", "8", "10"], "c": 2, "note": "Bạch tuộc có 8 tay."}, {"q": "Bạch tuộc có bao nhiêu trái tim?", "a": ["1", "2", "3", "8"], "c": 2, "note": "Bạch tuộc có 3 trái tim."}, {"q": "Khả năng nào giúp bạch tuộc ngụy trang?", "a": ["Đổi màu và hoa văn da", "Mọc cánh", "Phát tiếng chuông", "Đào cát bằng vỏ"], "c": 0, "note": "Bạch tuộc có thể thay đổi màu và hoa văn da."}, {"q": "Cá hề thường sống gần sinh vật nào?", "a": ["Hải quỳ", "Cá voi", "Mực khổng lồ", "Rùa biển"], "c": 0, "note": "Cá hề nổi tiếng vì sống gần hải quỳ."}, {"q": "Cá hề thường sống ở môi trường nào?", "a": ["Rạn san hô nhiệt đới", "Sa mạc", "Sông băng", "Đỉnh núi"], "c": 0, "note": "Cá hề thường sống ở rạn san hô nhiệt đới."}, {"q": "Cá hề thở bằng gì?", "a": ["Phổi", "Mang", "Da", "Lông"], "c": 1, "note": "Cá hề là cá nên thở bằng mang."}, {"q": "Cơ thể sứa phần lớn là gì?", "a": ["Đá", "Nước", "Xương", "Gỗ"], "c": 1, "note": "Cơ thể sứa phần lớn là nước."}, {"q": "Sứa có xương không?", "a": ["Có rất nhiều", "Không có", "Chỉ có một xương", "Chỉ có xương ở đuôi"], "c": 1, "note": "Sứa không có xương."}, {"q": "Nhiều loài sứa dùng bộ phận nào để bắt thức ăn?", "a": ["Xúc tu", "Cánh", "Chân móng", "Mỏ"], "c": 0, "note": "Nhiều loài sứa dùng xúc tu để bắt thức ăn."}, {"q": "Cá cần câu biển sâu sống ở nơi thế nào?", "a": ["Rất sáng", "Rất tối", "Trên cạn", "Trong rừng"], "c": 1, "note": "Cá cần câu biển sâu sống ở vùng nước tối."}, {"q": "Một số cá cần câu dùng gì để thu hút con mồi?", "a": ["Bộ phận phát sáng", "Cánh màu đỏ", "Tiếng chuông", "Lá cây"], "c": 0, "note": "Một số cá cần câu có bộ phận phát sáng trước miệng."}, {"q": "Cá cần câu biển sâu phải thích nghi với điều kiện nào?", "a": ["Tối, lạnh và áp suất lớn", "Nóng khô như sa mạc", "Không có nước", "Không có trọng lực"], "c": 0, "note": "Biển sâu tối, lạnh và có áp suất lớn."}, {"q": "Mực khổng lồ thường sống ở đâu?", "a": ["Biển sâu", "Sa mạc", "Đồng cỏ", "Sông nhỏ"], "c": 0, "note": "Mực khổng lồ sống ở vùng biển sâu."}, {"q": "Đặc điểm nào của mực khổng lồ giúp thu nhận ánh sáng yếu?", "a": ["Đôi mắt rất lớn", "Vỏ cứng", "Cánh dài", "Sừng"], "c": 0, "note": "Mực khổng lồ có đôi mắt rất lớn."}, {"q": "Mực khổng lồ thở bằng gì?", "a": ["Phổi", "Mang", "Da khô", "Lông"], "c": 1, "note": "Mực khổng lồ là động vật thân mềm sống dưới nước và thở bằng mang."}, {"q": "Tầng nào có điều kiện thuận lợi nhất cho quang hợp?", "a": ["Tầng ánh sáng", "Tầng nửa đêm", "Tầng vực thẳm", "Rãnh đại dương"], "c": 0, "note": "Tầng ánh sáng nhận đủ ánh sáng cho quang hợp."}, {"q": "Sinh vật nào trong bài có ba trái tim?", "a": ["Bạch tuộc", "Cá heo", "Rùa biển", "Cá hề"], "c": 0, "note": "Bạch tuộc có ba trái tim."}, {"q": "Sinh vật nào là động vật lớn nhất trong bài?", "a": ["Cá voi xanh", "Cá hề", "Sứa", "Cá cần câu"], "c": 0, "note": "Cá voi xanh là động vật lớn nhất được biết tới."}]});

  /* ---------- Song ngữ Tiếng Việt / English ---------- */
  const I18N_EN = {"Mang": "Gills", "Da": "Skin", "Bay": "Fly", "Chim": "Bird", "Bay cao": "Fly high", "Đại dương xanh": "The Blue Ocean", "Phần lớn bề mặt Trái Đất là nước biển": "Most of Earth's surface is seawater", "Đại dương là một thế giới khổng lồ gồm nước mặn, từ vùng mặt biển ngập nắng tới những rãnh sâu tối đen. Nơi đây là nhà của vô số sinh vật, từ sinh vật phù du rất nhỏ tới cá voi xanh khổng lồ.": "The ocean is a giant world of salt water, from sunny surface waters down to deep, pitch-dark trenches. It is home to countless living things, from tiny plankton to the enormous blue whale.", "Các đại dương giúp điều hòa khí hậu, tham gia vòng tuần hoàn nước và tạo ra một phần lớn lượng ôxy trong khí quyển nhờ các sinh vật quang hợp nhỏ bé sống gần mặt biển. Càng xuống sâu, ánh sáng càng ít, nhiệt độ thường giảm và áp suất tăng mạnh.": "The oceans help control the climate, take part in the water cycle and make much of the oxygen in the air, thanks to tiny living things near the surface that use sunlight to make food. The deeper you go, the less light there is, the colder it usually gets and the stronger the water pressure becomes.", "Bé nhớ nhé: biển không chỉ có cá. Đại dương còn có động vật có vú, bò sát, thân mềm, sứa, san hô và vô số sinh vật li ti.": "Remember: the sea is not just fish. The ocean also has mammals, reptiles, mollusks, jellyfish, corals and countless tiny creatures.", "biển không chỉ có cá. Đại dương còn có động vật có vú, bò sát, thân mềm, sứa, san hô và vô số sinh vật li ti.": "The sea is not just fish. The ocean also has mammals, reptiles, mollusks, jellyfish, corals and countless tiny creatures.", "Bao phủ Trái Đất": "Covers Earth", "Khoảng 71% bề mặt": "About 71% of the surface", "Nước": "Water", "Chủ yếu là nước mặn": "Mostly salt water", "Độ sâu trung bình": "Average depth", "Khoảng 3,7 km": "About 3.7 km", "Ánh sáng": "Light", "Mạnh ở gần mặt biển, yếu dần khi xuống sâu": "Strong near the surface, weaker as you go deeper", "Vai trò": "Role", "Điều hòa khí hậu và vòng tuần hoàn nước": "Controls climate and the water cycle", "Sự sống": "Life", "Từ sinh vật phù du tới cá voi xanh": "From plankton to the blue whale", "Tầng ánh sáng": "Sunlight Zone", "Đây là lớp nước gần mặt biển, nhận được nhiều ánh sáng Mặt Trời nhất.": "This is the layer of water near the surface that gets the most sunlight.", "Ánh sáng đủ mạnh để tảo và thực vật phù du quang hợp. Vì vậy đây là vùng có rất nhiều sinh vật và cũng là nơi ta thường thấy san hô, rùa biển, cá heo và nhiều loài cá.": "Light is strong enough for algae and plant plankton to make food. That is why this zone is full of life, and where we often see corals, sea turtles, dolphins and many kinds of fish.", "Có nhiều ánh sáng nhất và là vùng dễ quang hợp nhất.": "It has the most light and is the best zone for making food from sunlight.", "Độ sâu": "Depth", "Nhiều": "Lots", "Nhiệt độ": "Temperature", "Ấm hơn các tầng sâu": "Warmer than the deeper zones", "Quang hợp": "Photosynthesis", "Có thể diễn ra": "Can happen", "Sinh vật tiêu biểu": "Typical creatures", "Cá, san hô, rùa biển, cá heo": "Fish, corals, sea turtles, dolphins", "Tầng chạng vạng": "Twilight Zone", "Ánh sáng ở đây rất yếu, giống như buổi chạng vạng kéo dài.": "Light here is very weak, like a long, dim evening.", "Không còn đủ ánh sáng cho thực vật quang hợp tốt. Nhiều sinh vật có mắt lớn hoặc cơ thể phát sáng để tìm bạn, dụ mồi hoặc tránh kẻ săn mồi.": "There is not enough light for plants to make food well. Many creatures have big eyes or bodies that glow, to find partners, lure prey or hide from hunters.", "Ánh sáng yếu, chưa tối hoàn toàn và có nhiều sinh vật phát sáng.": "Weak light, not completely dark, with many glowing creatures.", "Rất yếu": "Very weak", "Hầu như không": "Almost none", "Đặc điểm": "Special feature", "Nhiều sinh vật di chuyển lên xuống theo ngày đêm": "Many creatures move up and down with day and night", "Cá đèn lồng, mực": "Lanternfish, squid", "Tầng nửa đêm": "Midnight Zone", "Đây là vùng không còn ánh sáng Mặt Trời chiếu tới.": "No sunlight reaches this zone.", "Nước lạnh, áp suất lớn và thức ăn khan hiếm. Nhiều sinh vật tạo ánh sáng sinh học của riêng mình. Một số loài có miệng lớn để tận dụng cơ hội bắt mồi hiếm hoi.": "The water is cold, the pressure is strong and food is scarce. Many creatures make their own light. Some have huge mouths so they never miss a rare meal.", "Không có ánh sáng Mặt Trời; sinh vật phải thích nghi với lạnh, tối và áp suất lớn.": "No sunlight; creatures must cope with cold, darkness and strong pressure.", "Không có ánh sáng Mặt Trời": "No sunlight", "Lạnh": "Cold", "Áp suất": "Pressure", "Rất lớn": "Very strong", "Cá cần câu, mực biển sâu": "Anglerfish, deep-sea squid", "Tầng vực thẳm": "Abyssal Zone", "Một vùng biển sâu rộng lớn, tối hoàn toàn và gần đóng băng.": "A huge deep-sea area, completely dark and almost freezing.", "Đáy biển ở đây thường là những đồng bằng sâu phủ bùn mịn. Dù điều kiện rất khắc nghiệt, vẫn có hải sâm, sao biển, giáp xác và nhiều sinh vật nhỏ sinh sống.": "The seafloor here is often a deep, flat plain covered with fine mud. Even though life is very hard, sea cucumbers, sea stars, crustaceans and many small creatures still live here.", "Rất sâu, rất lạnh, rất tối nhưng vẫn có sự sống.": "Very deep, very cold, very dark, but there is still life.", "Không có": "None", "Gần 0–4°C": "About 0–4°C", "Đáy biển": "Seafloor", "Nhiều vùng đồng bằng sâu": "Many deep plains", "Hải sâm, sao biển, giáp xác": "Sea cucumbers, sea stars, crustaceans", "Rãnh đại dương": "Ocean Trench", "Sâu hơn 6.000 m": "Deeper than 6,000 m", "Đây là những khe sâu nhất của đáy đại dương.": "These are the deepest cracks in the ocean floor.", "Một số rãnh sâu hơn 10 km. Áp suất khổng lồ nhưng các nhà khoa học vẫn tìm thấy vi sinh vật, giáp xác nhỏ và những loài cá đặc biệt ở một số khu vực.": "Some trenches are deeper than 10 km. The pressure is enormous, yet scientists have still found microbes, small crustaceans and special fish in some places.", "Là vùng sâu nhất đại dương; rãnh Mariana có nơi sâu hơn 10 km.": "The deepest part of the ocean; parts of the Mariana Trench are deeper than 10 km.", "Trên 6.000 m": "Over 6,000 m", "Cực lớn": "Extremely strong", "Ví dụ": "Example", "Rãnh Mariana": "Mariana Trench", "Vẫn có sinh vật thích nghi đặc biệt": "Some specially adapted creatures still live here", "Cá voi xanh": "Blue Whale", "Động vật có vú lớn nhất": "The biggest mammal", "Cá voi xanh là động vật lớn nhất từng được biết tới trên Trái Đất.": "The blue whale is the largest animal ever known on Earth.", "Cá voi xanh sống ở đại dương rộng, ăn chủ yếu là nhuyễn thể krill rất nhỏ. Dù sống dưới nước, nó là động vật có vú nên phải ngoi lên mặt biển để thở bằng phổi.": "Blue whales live in the open ocean and eat mostly tiny krill. Even though they live in water, they are mammals, so they must come up to the surface to breathe with lungs.", "Rất lớn nhưng thức ăn chính lại là krill rất nhỏ; thở bằng phổi.": "Huge, but its main food is tiny krill; it breathes with lungs.", "Kích thước": "Size", "Có thể dài khoảng 24–30 m": "Can be about 24–30 m long", "Nơi sống": "Habitat", "Đại dương rộng": "Open ocean", "Thức ăn": "Food", "Hô hấp": "Breathing", "Bằng phổi": "With lungs", "Di chuyển": "Movement", "Bơi bằng đuôi theo nhịp lên xuống": "Swims by moving its tail up and down", "Nhóm": "Group", "Động vật có vú": "Mammal", "Cá heo": "Dolphin", "Động vật có vú thông minh": "A clever mammal", "Cá heo là động vật có vú sống ở biển, nổi tiếng vì khả năng giao tiếp và định vị bằng âm thanh.": "Dolphins are mammals that live in the sea, famous for how they communicate and find their way using sound.", "Cá heo thường sống theo nhóm. Chúng phát ra âm thanh và nghe tiếng vọng để tìm vật thể, con mồi và định hướng trong nước.": "Dolphins usually live in groups. They make sounds and listen to the echoes to find objects, catch prey and find their way in the water.", "Cá heo không phải cá; chúng là động vật có vú và phải thở không khí.": "Dolphins are not fish; they are mammals and must breathe air.", "Nhiều vùng biển và đại dương": "Many seas and oceans", "Cá và mực": "Fish and squid", "Đặc biệt": "Special", "Dùng âm thanh và tiếng vọng": "Uses sound and echoes", "Xã hội": "Social life", "Thường sống theo nhóm": "Usually lives in groups", "Rùa biển": "Sea Turtle", "Bò sát sống ở biển": "A reptile that lives in the sea", "Rùa biển dành phần lớn cuộc đời ở biển nhưng rùa cái phải lên bãi cát để đẻ trứng.": "Sea turtles spend most of their lives at sea, but females must crawl onto sandy beaches to lay eggs.", "Rùa biển bơi bằng bốn chi biến đổi thành mái chèo. Chúng thở bằng phổi nên vẫn phải ngoi lên mặt nước lấy không khí.": "Sea turtles swim with four legs shaped like paddles. They breathe with lungs, so they still have to come up for air.", "Sống ở biển nhưng đẻ trứng trên bãi cát và thở bằng phổi.": "Lives in the sea but lays eggs on the beach and breathes with lungs.", "Bò sát": "Reptile", "Bơi bằng các chi dạng mái chèo": "Swims with paddle-like flippers", "Sinh sản": "Reproduction", "Đẻ trứng trên bãi cát": "Lays eggs on sandy beaches", "Tùy loài: cỏ biển, sứa, động vật nhỏ": "Depends on the species: seagrass, jellyfish, small animals", "Cá mập trắng": "Great White Shark", "Cá săn mồi lớn": "A big hunting fish", "Cá mập trắng là một loài cá lớn, có thân hình khỏe và nhiều hàng răng sắc.": "The great white shark is a large fish with a strong body and many rows of sharp teeth.", "Cá mập thở bằng mang, không phải bằng phổi. Cơ thể thuôn giúp bơi nhanh, còn nhiều giác quan giúp chúng tìm con mồi trong đại dương.": "Sharks breathe with gills, not lungs. Their smooth, pointed body helps them swim fast, and their many senses help them find prey in the ocean.", "Là cá nên thở bằng mang; không phải động vật có vú.": "It is a fish, so it breathes with gills; it is not a mammal.", "Cá": "Fish", "Bằng mang": "With gills", "Biển ven bờ và đại dương": "Coasts and open ocean", "Cá, hải cẩu và động vật biển khác": "Fish, seals and other sea animals", "Nhiều giác quan nhạy": "Many sharp senses", "Bạch tuộc": "Octopus", "Thân mềm tám tay": "An eight-armed mollusk", "Bạch tuộc có tám tay linh hoạt với rất nhiều giác hút.": "The octopus has eight flexible arms with lots of suckers.", "Bạch tuộc có thể đổi màu và hoa văn da để ngụy trang hoặc giao tiếp. Nó rất khéo léo, có khả năng giải quyết nhiều bài toán đơn giản và có ba trái tim.": "An octopus can change the color and pattern of its skin to hide or to communicate. It is very clever, can solve simple puzzles and has three hearts.", "Có 8 tay, 3 trái tim và khả năng đổi màu rất đặc biệt.": "It has 8 arms, 3 hearts and an amazing ability to change color.", "Động vật thân mềm": "Mollusk", "Số tay": "Number of arms", "Có thể đổi màu": "Can change color", "Số tim": "Number of hearts", "Cua, tôm, cá nhỏ": "Crabs, shrimp, small fish", "Cá hề": "Clownfish", "Bạn của hải quỳ": "Friend of the sea anemone", "Cá hề thường sống giữa các xúc tu của hải quỳ ở vùng biển nhiệt đới.": "Clownfish often live among the tentacles of sea anemones in warm tropical seas.", "Lớp nhầy trên da giúp cá hề sống gần hải quỳ mà không bị chích như nhiều loài cá khác. Hai bên có thể mang lại lợi ích cho nhau.": "A layer of slime on its skin lets the clownfish live near the anemone without getting stung like other fish. Both of them can help each other.", "Cá hề nổi tiếng vì sống gần hải quỳ ở rạn san hô.": "Clownfish are famous for living with sea anemones on coral reefs.", "Rạn san hô nhiệt đới": "Tropical coral reefs", "Bạn đồng hành": "Partner", "Hải quỳ": "Sea anemone", "Động vật nhỏ và tảo": "Small animals and algae", "Sứa": "Jellyfish", "Cơ thể mềm như thạch": "A soft, jelly-like body", "Sứa có cơ thể mềm, phần lớn là nước và thường có các xúc tu.": "Jellyfish have soft bodies that are mostly water, and usually have tentacles.", "Sứa không có xương, không có tim và não giống động vật có xương sống. Một mạng thần kinh đơn giản giúp cơ thể phản ứng với môi trường.": "Jellyfish have no bones, no heart and no brain like animals with backbones. A simple net of nerves helps their bodies react to what is around them.", "Cơ thể phần lớn là nước, không có xương và có xúc tu.": "Its body is mostly water, has no bones and has tentacles.", "Cơ thể": "Body", "Phần lớn là nước": "Mostly water", "Xương": "Bones", "Từ mặt biển tới biển sâu, tùy loài": "From the surface to the deep sea, depending on the species", "Co bóp cơ thể và trôi theo dòng nước": "Squeezes its body and drifts with the current", "Sinh vật phù du, trứng cá, cá nhỏ": "Plankton, fish eggs, small fish", "Cá cần câu": "Anglerfish", "Thợ săn biển sâu": "A deep-sea hunter", "Một số cá cần câu biển sâu có phần phát sáng giống chiếc 'cần câu' trước miệng.": "Some deep-sea anglerfish have a glowing part that looks like a 'fishing rod' in front of their mouth.", "Trong nơi tối đen, ánh sáng nhỏ này có thể giúp thu hút con mồi lại gần. Nhiều loài có miệng lớn và răng dài để tận dụng thức ăn hiếm hoi.": "In the pitch-dark water, this little light can attract prey to come closer. Many kinds have big mouths and long teeth so they never miss a rare meal.", "Sống ở biển sâu và dùng ánh sáng sinh học để hỗ trợ săn mồi.": "Lives in the deep sea and uses its own light to help it hunt.", "Biển sâu": "Deep sea", "Tự phát sáng sinh học ở một số loài": "Some kinds make their own light", "Cá và sinh vật nhỏ": "Fish and small creatures", "Có phần giống cần câu trước miệng": "Has a fishing-rod-like part in front of its mouth", "Môi trường": "Environment", "Tối, lạnh, áp suất lớn": "Dark, cold, strong pressure", "Mực khổng lồ": "Giant Squid", "Mực biển sâu bí ẩn": "A mysterious deep-sea squid", "Mực khổng lồ là một loài mực lớn sống ở vùng biển sâu và rất hiếm khi được nhìn thấy còn sống.": "The giant squid is a huge squid that lives in the deep sea and is very rarely seen alive.", "Nó có đôi mắt rất lớn giúp thu nhận ánh sáng yếu, cùng các tay và xúc tu dài để bắt mồi. Cá nhà táng là một trong những kẻ săn mồi của mực khổng lồ.": "It has enormous eyes to catch faint light, and long arms and tentacles to grab prey. The sperm whale is one of the giant squid's predators.", "Sống ở biển sâu, có mắt rất lớn và xúc tu dài.": "Lives in the deep sea, has huge eyes and long tentacles.", "Đôi mắt rất lớn": "Very large eyes", "Tay và xúc tu dài": "Long arms and tentacles", "Cá và các loài mực khác": "Fish and other squid", "Khoảng bao nhiêu phần trăm bề mặt Trái Đất được đại dương bao phủ?": "About what percent of Earth's surface is covered by the ocean?", "Khoảng 20%": "About 20%", "Khoảng 50%": "About 50%", "Khoảng 71%": "About 71%", "Khoảng 95%": "About 95%", "Đại dương bao phủ khoảng 71% bề mặt Trái Đất.": "The ocean covers about 71% of Earth's surface.", "Nước trong đại dương chủ yếu là loại nước nào?": "What kind of water is mostly in the ocean?", "Nước ngọt": "Fresh water", "Nước mặn": "Salt water", "Nước có đường": "Sugary water", "Nước tinh khiết": "Pure water", "Đại dương chủ yếu là nước mặn.": "The ocean is mostly salt water.", "Càng xuống sâu trong đại dương thì ánh sáng thường thay đổi thế nào?": "How does light usually change as you go deeper into the ocean?", "Mạnh dần": "It gets stronger", "Yếu dần": "It gets weaker", "Không thay đổi": "It does not change", "Biến thành màu đỏ": "It turns red", "Ánh sáng giảm dần khi xuống sâu.": "Light fades as you go deeper.", "Càng xuống sâu, áp suất nước thường thế nào?": "How does water pressure usually change as you go deeper?", "Giảm dần": "It goes down", "Tăng dần": "It goes up", "Không đổi": "It stays the same", "Biến mất": "It disappears", "Áp suất tăng mạnh khi độ sâu tăng.": "Pressure rises a lot as depth increases.", "Tầng nào nhận nhiều ánh sáng Mặt Trời nhất?": "Which zone gets the most sunlight?", "Tầng ánh sáng ở gần mặt biển nhận nhiều ánh sáng nhất.": "The sunlight zone near the surface gets the most light.", "Tầng chạng vạng nằm khoảng ở độ sâu nào?": "About how deep is the twilight zone?", "Trên 10.000 m": "Over 10,000 m", "Tầng chạng vạng nằm khoảng 200–1.000 m.": "The twilight zone is about 200–1,000 m deep.", "Tầng nào không còn ánh sáng Mặt Trời và nằm khoảng 1.000–4.000 m?": "Which zone has no sunlight and is about 1,000–4,000 m deep?", "Mặt biển": "Sea surface", "Tầng nửa đêm nằm khoảng 1.000–4.000 m.": "The midnight zone is about 1,000–4,000 m deep.", "Tầng vực thẳm thường nằm ở độ sâu nào?": "About how deep is the abyssal zone?", "Khoảng 50 m": "About 50 m", "Tầng vực thẳm nằm khoảng 4.000–6.000 m.": "The abyssal zone is about 4,000–6,000 m deep.", "Rãnh đại dương thường sâu hơn mốc nào?": "Ocean trenches are usually deeper than what depth?", "Rãnh đại dương thường sâu hơn 6.000 m.": "Ocean trenches are usually deeper than 6,000 m.", "Rãnh Mariana là ví dụ của gì?": "The Mariana Trench is an example of what?", "Một rạn san hô": "A coral reef", "Một rãnh đại dương rất sâu": "A very deep ocean trench", "Một hòn đảo": "An island", "Một con sông": "A river", "Rãnh Mariana là một rãnh đại dương rất sâu.": "The Mariana Trench is a very deep ocean trench.", "Cá voi xanh thở bằng gì?": "How does a blue whale breathe?", "Phổi": "Lungs", "Không cần thở": "It does not need to breathe", "Cá voi xanh là động vật có vú nên thở bằng phổi.": "The blue whale is a mammal, so it breathes with lungs.", "Thức ăn chính của cá voi xanh là gì?": "What is the blue whale's main food?", "Cỏ biển": "Seagrass", "San hô": "Coral", "Rong biển": "Seaweed", "Cá voi xanh ăn chủ yếu là krill rất nhỏ.": "Blue whales eat mostly tiny krill.", "Cá voi xanh thuộc nhóm nào?": "Which group does the blue whale belong to?", "Thân mềm": "Mollusks", "Cá voi xanh là động vật có vú.": "The blue whale is a mammal.", "Cá heo thuộc nhóm nào?": "Which group does the dolphin belong to?", "Cá heo là động vật có vú.": "The dolphin is a mammal.", "Cá heo có thể dùng gì để định hướng?": "What can dolphins use to find their way?", "Mùi hoa": "The smell of flowers", "Âm thanh và tiếng vọng": "Sound and echoes", "Ánh sáng Mặt Trời": "Sunlight", "Cánh": "Wings", "Cá heo có thể dùng âm thanh và tiếng vọng để định hướng.": "Dolphins can use sound and echoes to find their way.", "Cá heo thở bằng gì?": "How does a dolphin breathe?", "Vây": "Fins", "Cá heo thở không khí bằng phổi.": "Dolphins breathe air with lungs.", "Rùa biển thở bằng gì?": "How does a sea turtle breathe?", "Vỏ": "Shell", "Rùa biển là bò sát và thở bằng phổi.": "Sea turtles are reptiles and breathe with lungs.", "Rùa biển cái thường đẻ trứng ở đâu?": "Where do female sea turtles usually lay their eggs?", "Trên bãi cát": "On sandy beaches", "Giữa tầng nửa đêm": "In the midnight zone", "Trong rạn san hô": "In coral reefs", "Trên cây": "In trees", "Rùa biển cái lên bãi cát để đẻ trứng.": "Female sea turtles crawl onto sandy beaches to lay eggs.", "Các chi của rùa biển giúp nó làm gì?": "What do a sea turtle's legs help it do?", "Bơi như mái chèo": "Swim like paddles", "Leo cây": "Climb trees", "Đào mỏ": "Dig with a beak", "Các chi của rùa biển thích nghi để bơi.": "Sea turtle legs are shaped for swimming.", "Cá mập trắng thở bằng gì?": "How does a great white shark breathe?", "Mũi": "Nose", "Cá mập trắng là cá nên thở bằng mang.": "The great white shark is a fish, so it breathes with gills.", "Cá mập trắng thuộc nhóm nào?": "Which group does the great white shark belong to?", "Cá mập trắng là một loài cá.": "The great white shark is a kind of fish.", "Thân hình thuôn giúp cá mập làm gì?": "What does a shark's smooth, pointed body help it do?", "Bơi hiệu quả": "Swim well", "Sống trên cạn": "Live on land", "Thân thuôn giúp cá mập bơi hiệu quả trong nước.": "Its smooth body helps the shark swim well in water.", "Bạch tuộc có bao nhiêu tay?": "How many arms does an octopus have?", "Bạch tuộc có 8 tay.": "An octopus has 8 arms.", "Bạch tuộc có bao nhiêu trái tim?": "How many hearts does an octopus have?", "Bạch tuộc có 3 trái tim.": "An octopus has 3 hearts.", "Khả năng nào giúp bạch tuộc ngụy trang?": "Which ability helps an octopus hide?", "Đổi màu và hoa văn da": "Changing skin color and pattern", "Mọc cánh": "Growing wings", "Phát tiếng chuông": "Ringing like a bell", "Đào cát bằng vỏ": "Digging sand with a shell", "Bạch tuộc có thể thay đổi màu và hoa văn da.": "An octopus can change the color and pattern of its skin.", "Cá hề thường sống gần sinh vật nào?": "Which creature do clownfish usually live near?", "Cá voi": "Whale", "Cá hề nổi tiếng vì sống gần hải quỳ.": "Clownfish are famous for living near sea anemones.", "Cá hề thường sống ở môi trường nào?": "Where do clownfish usually live?", "Sa mạc": "Desert", "Sông băng": "Glacier", "Đỉnh núi": "Mountain top", "Cá hề thường sống ở rạn san hô nhiệt đới.": "Clownfish usually live on tropical coral reefs.", "Cá hề thở bằng gì?": "How does a clownfish breathe?", "Lông": "Fur", "Cá hề là cá nên thở bằng mang.": "The clownfish is a fish, so it breathes with gills.", "Cơ thể sứa phần lớn là gì?": "What is a jellyfish's body mostly made of?", "Đá": "Rock", "Gỗ": "Wood", "Cơ thể sứa phần lớn là nước.": "A jellyfish's body is mostly water.", "Sứa có xương không?": "Does a jellyfish have bones?", "Có rất nhiều": "Lots of them", "Chỉ có một xương": "Only one bone", "Chỉ có xương ở đuôi": "Only in its tail", "Sứa không có xương.": "Jellyfish have no bones.", "Nhiều loài sứa dùng bộ phận nào để bắt thức ăn?": "Which body part do many jellyfish use to catch food?", "Xúc tu": "Tentacles", "Chân móng": "Clawed feet", "Mỏ": "Beak", "Nhiều loài sứa dùng xúc tu để bắt thức ăn.": "Many jellyfish use their tentacles to catch food.", "Cá cần câu biển sâu sống ở nơi thế nào?": "What kind of place do deep-sea anglerfish live in?", "Rất sáng": "Very bright", "Rất tối": "Very dark", "Trên cạn": "On land", "Trong rừng": "In a forest", "Cá cần câu biển sâu sống ở vùng nước tối.": "Deep-sea anglerfish live in dark water.", "Một số cá cần câu dùng gì để thu hút con mồi?": "What do some anglerfish use to attract prey?", "Bộ phận phát sáng": "A glowing part", "Cánh màu đỏ": "Red wings", "Tiếng chuông": "A bell sound", "Lá cây": "Leaves", "Một số cá cần câu có bộ phận phát sáng trước miệng.": "Some anglerfish have a glowing part in front of their mouth.", "Cá cần câu biển sâu phải thích nghi với điều kiện nào?": "What conditions must deep-sea anglerfish cope with?", "Tối, lạnh và áp suất lớn": "Dark, cold and strong pressure", "Nóng khô như sa mạc": "Hot and dry like a desert", "Không có nước": "No water", "Không có trọng lực": "No gravity", "Biển sâu tối, lạnh và có áp suất lớn.": "The deep sea is dark, cold and has strong pressure.", "Mực khổng lồ thường sống ở đâu?": "Where does the giant squid usually live?", "Đồng cỏ": "Grassland", "Sông nhỏ": "Small river", "Mực khổng lồ sống ở vùng biển sâu.": "The giant squid lives in the deep sea.", "Đặc điểm nào của mực khổng lồ giúp thu nhận ánh sáng yếu?": "Which feature helps the giant squid catch faint light?", "Vỏ cứng": "Hard shell", "Cánh dài": "Long wings", "Sừng": "Horns", "Mực khổng lồ có đôi mắt rất lớn.": "The giant squid has very large eyes.", "Mực khổng lồ thở bằng gì?": "How does the giant squid breathe?", "Da khô": "Dry skin", "Mực khổng lồ là động vật thân mềm sống dưới nước và thở bằng mang.": "The giant squid is a mollusk that lives in water and breathes with gills.", "Tầng nào có điều kiện thuận lợi nhất cho quang hợp?": "Which zone is best for photosynthesis?", "Tầng ánh sáng nhận đủ ánh sáng cho quang hợp.": "The sunlight zone gets enough light for photosynthesis.", "Sinh vật nào trong bài có ba trái tim?": "Which creature in this lesson has three hearts?", "Bạch tuộc có ba trái tim.": "The octopus has three hearts.", "Sinh vật nào là động vật lớn nhất trong bài?": "Which creature is the largest animal in this lesson?", "Cá voi xanh là động vật lớn nhất được biết tới.": "The blue whale is the largest animal ever known.", "Khám phá đại dương": "Ocean Explorer", "Cùng Cô Thỏ Hồng lặn xuống thế giới dưới biển": "Dive into the underwater world with Miss Pink Bunny", "sâu hơn 6.000 m": "deeper than 6,000 m", "Các tầng đại dương": "Ocean zones", "⏹ Dừng đọc": "⏹ Stop reading", "Nghe cô đọc": "Listen to Teacher", "Chưa phát được giọng đọc. Con nhờ bố mẹ hoặc thầy cô kiểm tra loa và mạng, rồi bấm lại nhé.": "I couldn't play the voice. Ask a parent or teacher to check the speaker and the internet, then tap again.", "Bé nhớ nhé:": "Remember:", "🔊 Nghe cô đọc": "🔊 Listen to Teacher", "Sổ khám phá": "Explorer's Log", "🌊 Đại dương là gì?": "🌊 What is the ocean?", "Càng xuống sâu, nước càng tối, càng lạnh và áp suất càng lớn. Chạm vào từng tầng nhé!": "The deeper you go, the darker and colder the water and the stronger the pressure. Tap each zone!", "✓ Đã xem": "✓ Seen", "câu đúng": "correct", "Cô tự đọc câu hỏi": "Teacher reads the questions", "Mẹo: bấm phím 1, 2, 3, 4 để chọn đáp án.": "Tip: press 1, 2, 3, 4 to choose an answer.", "Đổi câu hỏi khác": "Try other questions", "Tuyệt vời! Con là nhà thám hiểm đại dương nhí rồi!": "Amazing! You are a little ocean explorer now!", "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé.": "Well done! Let's review the questions below.", "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.": "You tried hard! Let's review and play again.", "Con đúng": "You got", "câu": "questions", "Làm lại câu sai": "Retry wrong answers", "Chơi vòng mới": "Play a new round", "Đáp án đúng của các câu con chưa trả lời được:": "Correct answers to the questions you missed:", "Con chọn một đáp án nhé!": "Pick an answer!", "Chính xác!": "Correct!", "Chưa đúng rồi. Đáp án đúng là": "Not quite. The correct answer is", "Câu": "Question", "trên": "of", "Đọc câu hỏi": "Read the question", "🔊 Đọc câu hỏi": "🔊 Read the question", "Xem kết quả": "See results", "Câu tiếp theo": "Next question", "🏆 Con đã khám phá hết đại dương rồi! Giỏi quá!": "🏆 You have explored the whole ocean! Great job!", "🐠 Đã ghi": "🐠 Added", "vào sổ khám phá (": "to your explorer's log (", "Lặn biển": "Dive", "Tầng biển": "Ocean Zones", "Sinh vật": "Creatures", "Hỏi đáp": "Quiz", "câu.": "questions.", "Các khu vực khám phá": "Exploration areas", "🤿 Lặn biển": "🤿 Dive", "🌊 Tầng biển": "🌊 Ocean Zones", "🐳 Sinh vật": "🐳 Creatures", "⭐ Hỏi đáp": "⭐ Quiz"};
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
      if (el.nodeType !== 1 || el.tagName === "STYLE" || el.tagName === "SCRIPT" || (el.classList && el.classList.contains("gx-lang") || el.classList.contains("gx-sub-sim"))) return;
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
    const subTab = root.querySelector('[data-tab="submarine"]');
    if (subTab) subTab.textContent = `🚤 ${subLocal("Tàu ngầm", "Submarine")}`;
    if (activeTab === "submarine") renderStage();
    translateDom(root);
    setBanner();
  }


  /* ---------- Hình vẽ sinh vật biển (khung 120 x 100) ---------- */
  const EYE = (x, y, r = 3.4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x + r * 0.25}" cy="${y}" r="${r * 0.55}" fill="#0F172A"/>`;
  const SEA = {
    "blue-whale": () => `
      <path d="M90 22 q-4 -12 -10 -16 M90 22 q2 -14 8 -18 M90 22 q6 -10 14 -10" stroke="#BAE6FD" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M4 44 Q2 28 14 40 Q8 50 16 58 Q4 60 4 44Z" fill="#1D4ED8"/>
      <path d="M12 50 Q30 26 70 28 Q104 30 114 52 Q116 70 90 74 Q50 80 24 64 Q14 58 12 50Z" fill="#3B82F6" stroke="#1E3A8A" stroke-width="2.5"/>
      <path d="M40 66 Q72 76 104 64 Q100 74 86 76 Q56 80 40 66Z" fill="#BFDBFE"/>
      <path d="M58 70 v6 M68 71 v7 M78 71 v7 M88 70 v6" stroke="#93C5FD" stroke-width="2"/>
      <path d="M64 70 Q60 84 72 88 Q74 78 70 70Z" fill="#1D4ED8"/>
      <path d="M96 62 q8 2 14 -2" stroke="#1E3A8A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      ${EYE(94, 52, 3.2)}`,
    dolphin: () => `
      <path d="M6 40 L16 50 L6 62 L22 56Z" fill="#64748B"/>
      <path d="M20 54 Q40 30 76 34 Q94 36 102 46 L118 50 L104 56 Q90 66 60 66 Q34 66 20 54Z" fill="#94A3B8" stroke="#475569" stroke-width="2.5"/>
      <path d="M56 36 Q58 18 72 14 Q66 26 70 36Z" fill="#64748B"/>
      <path d="M40 62 Q66 72 100 56 Q90 66 60 68 Q46 68 40 62Z" fill="#E2E8F0"/>
      <path d="M62 64 Q60 78 70 82 Q72 72 70 64Z" fill="#64748B"/>
      <path d="M104 52 q4 2 10 0" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
      ${EYE(92, 46, 3)}`,
    "sea-turtle": () => `
      <path d="M34 30 Q14 14 8 24 Q14 36 34 40Z M86 30 Q106 14 112 24 Q106 36 86 40Z M38 72 Q22 86 16 80 Q20 70 38 64Z M82 72 Q98 86 104 80 Q100 70 82 64Z" fill="#4ADE80" stroke="#15803D" stroke-width="2.5"/>
      <ellipse cx="60" cy="12" rx="11" ry="10" fill="#4ADE80" stroke="#15803D" stroke-width="2.5"/>
      <circle cx="55" cy="10" r="2.2" fill="#0F172A"/><circle cx="65" cy="10" r="2.2" fill="#0F172A"/>
      <path d="M56 88 L60 98 L64 88Z" fill="#4ADE80"/>
      <ellipse cx="60" cy="52" rx="32" ry="38" fill="#A16207" stroke="#713F12" stroke-width="3"/>
      <path d="M60 22 L74 36 L74 60 L60 74 L46 60 L46 36Z" fill="#CA8A04" stroke="#713F12" stroke-width="2"/>
      <path d="M46 36 L32 30 M74 36 L88 30 M46 60 L32 68 M74 60 L88 68 M60 74 V88 M60 22 V16" stroke="#713F12" stroke-width="2"/>`,
    "great-white": () => `
      <path d="M4 30 L18 48 L6 70 L26 54Z" fill="#64748B"/>
      <path d="M22 52 Q46 30 84 34 Q106 38 116 52 Q104 64 84 66 Q46 70 22 52Z" fill="#94A3B8" stroke="#334155" stroke-width="2.5"/>
      <path d="M58 34 L66 10 L78 36Z" fill="#64748B" stroke="#334155" stroke-width="2"/>
      <path d="M34 58 Q70 72 110 56 Q104 64 84 66 Q50 70 34 58Z" fill="#F1F5F9"/>
      <path d="M62 62 L56 80 L74 64Z" fill="#64748B"/>
      <path d="M92 58 L112 56 L96 62Z" fill="#7F1D1D"/><path d="M95 58 l2 3 2 -3 M101 57.5 l2 3 2 -3 M107 57 l1.5 3 1.5 -3" fill="#fff"/>
      <path d="M78 44 v10 M82 44 v10 M86 45 v9" stroke="#475569" stroke-width="1.6"/>
      ${EYE(98, 46, 2.8)}`,
    octopus: () => `
      ${[18, 30, 42, 54, 66, 78, 90, 102].map((x, i) => `<path d="M${50 + i * 3} 54 Q${x - 6} 76 ${x} 92" stroke="#EC4899" stroke-width="7" fill="none" stroke-linecap="round"/>`).join("")}
      <ellipse cx="60" cy="38" rx="30" ry="30" fill="#F472B6" stroke="#BE185D" stroke-width="2.5"/>
      <circle cx="50" cy="20" r="5" fill="#FBCFE8"/><circle cx="74" cy="28" r="4" fill="#FBCFE8"/>
      ${EYE(50, 44, 5)}${EYE(70, 44, 5)}
      <path d="M54 56 q6 4 12 0" stroke="#9D174D" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    clownfish: () => `
      <path d="M4 34 Q20 50 4 66 L22 56 L22 44Z" fill="#F97316" stroke="#1F2937" stroke-width="2.5"/>
      <ellipse cx="60" cy="50" rx="42" ry="26" fill="#FB923C" stroke="#1F2937" stroke-width="2.5"/>
      <path d="M46 26 Q40 50 46 74 L58 76 Q52 50 58 24Z M78 28 Q72 50 78 72 L88 68 Q84 50 88 32Z M26 34 Q22 50 26 66 L32 70 Q28 50 32 30Z" fill="#fff" stroke="#1F2937" stroke-width="2"/>
      <path d="M52 24 Q60 10 74 22" fill="#F97316" stroke="#1F2937" stroke-width="2.5"/>
      <path d="M60 70 Q64 84 74 78" fill="#F97316" stroke="#1F2937" stroke-width="2.5"/>
      ${EYE(92, 44, 4.5)}`,
    jellyfish: () => `
      <path d="M30 50 Q34 70 26 92 M44 52 Q50 72 42 96 M60 52 Q56 74 62 96 M76 52 Q70 72 78 94 M90 50 Q86 70 94 90" stroke="#F0ABFC" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M48 52 Q52 66 46 78 M60 52 Q66 68 58 82 M72 52 Q68 66 74 78" stroke="#E879F9" stroke-width="6" fill="none" stroke-linecap="round" opacity=".8"/>
      <path d="M18 52 Q18 10 60 10 Q102 10 102 52 Q90 46 80 52 Q70 46 60 52 Q50 46 40 52 Q30 46 18 52Z" fill="#F5D0FE" stroke="#C026D3" stroke-width="2.5" opacity=".95"/>
      <path d="M34 34 Q40 20 54 18" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
      ${EYE(50, 36, 3)}${EYE(70, 36, 3)}`,
    anglerfish: () => `
      <path d="M62 22 Q70 2 92 6 Q100 8 98 16" stroke="#475569" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="98" cy="18" r="10" fill="#FDE047" opacity=".35"/><circle cx="98" cy="18" r="5.5" fill="#FDE047"/>
      <path d="M6 36 L22 50 L6 66Z" fill="#334155"/>
      <path d="M20 50 Q28 22 64 22 Q100 24 106 48 Q108 76 70 80 Q30 82 20 50Z" fill="#475569" stroke="#0F172A" stroke-width="2.5"/>
      <path d="M68 56 Q90 46 108 52 Q104 72 74 74 Q66 66 68 56Z" fill="#0F172A"/>
      <path d="M74 56 l3 7 3 -7 l3 7 3 -7 l3 7 3 -7 l3 7 3 -7 M78 72 l3 -7 3 7 l3 -7 3 7 l3 -7 3 7" stroke="#F8FAFC" stroke-width="1.8" fill="none" stroke-linejoin="round"/>
      <circle cx="74" cy="38" r="7" fill="#F8FAFC"/><circle cx="75" cy="38" r="3.5" fill="#0F172A"/>`,
    "giant-squid": () => `
      ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${46 + i * 6} 70 Q${36 + i * 10} 86 ${30 + i * 12} 98" stroke="#DC2626" stroke-width="5" fill="none" stroke-linecap="round"/>`).join("")}
      <path d="M58 70 Q46 90 20 96 M66 70 Q80 92 110 94" stroke="#B91C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="20" cy="96" r="4" fill="#B91C1C"/><circle cx="110" cy="94" r="4" fill="#B91C1C"/>
      <path d="M60 4 L88 30 Q86 64 74 72 L46 72 Q34 64 32 30Z" fill="#EF4444" stroke="#991B1B" stroke-width="2.5"/>
      <path d="M60 4 L36 22 L32 30 L46 26Z M60 4 L84 22 L88 30 L74 26Z" fill="#F87171"/>
      <circle cx="48" cy="54" r="9" fill="#fff" stroke="#991B1B" stroke-width="2"/><circle cx="48" cy="54" r="5" fill="#0F172A"/>
      <circle cx="72" cy="54" r="9" fill="#fff" stroke="#991B1B" stroke-width="2"/><circle cx="72" cy="54" r="5" fill="#0F172A"/>`
  };
  const SEA_BG = {
    "blue-whale": "#DBEAFE", dolphin: "#E0F2FE", "sea-turtle": "#DCFCE7", "great-white": "#E0F2FE", octopus: "#FCE7F3",
    clownfish: "#FFEDD5", jellyfish: "#F5F3FF", anglerfish: "#1E293B", "giant-squid": "#1E3A8A"
  };
  function seaSvg(id) {
    const draw = SEA[id];
    if (!draw) return "";
    return `<svg class="gx-sea-svg" viewBox="0 0 120 100" aria-hidden="true" focusable="false">${draw()}</svg>`;
  }

  /* ---------- Các tầng biển ---------- */
  const ZONES = [
    { id: "sunlight-zone", label: "Tầng ánh sáng", depth: "0–200 m", top: 0, h: 30, color: "#38BDF8", dark: "#0EA5E9", text: "#0C4A6E" },
    { id: "twilight-zone", label: "Tầng chạng vạng", depth: "200–1.000 m", top: 30, h: 20, color: "#2563EB", dark: "#1D4ED8", text: "#fff" },
    { id: "midnight-zone", label: "Tầng nửa đêm", depth: "1.000–4.000 m", top: 50, h: 20, color: "#1E3A8A", dark: "#172554", text: "#fff" },
    { id: "abyss-zone", label: "Tầng vực thẳm", depth: "4.000–6.000 m", top: 70, h: 16, color: "#0F172A", dark: "#020617", text: "#fff" },
    { id: "trench-zone", label: "Rãnh đại dương", depth: "sâu hơn 6.000 m", top: 86, h: 14, color: "#020617", dark: "#000", text: "#fff" }
  ];
  /* Hình nhỏ cho bảng thông tin: cột nước, tầng được chọn sáng lên */
  function zoneSvg(id) {
    const bands = ZONES.map((z) => {
      const on = z.id === id;
      return `<rect x="${on ? 40 : 52}" y="${4 + z.top * 0.92}" width="${on ? 140 : 116}" height="${z.h * 0.92}" rx="${on ? 6 : 0}" fill="${z.color}" ${on ? 'stroke="#EC4899" stroke-width="3"' : 'opacity=".45"'}/>`;
    }).join("");
    const sel = ZONES.find((z) => z.id === id);
    const tag = sel ? `<text x="196" y="${4 + (sel.top + sel.h / 2) * 0.92 + 5}" class="gx-zone-mini">${sel.depth}</text>` : "";
    return `<svg class="gx-sea-svg" viewBox="0 0 320 100" aria-hidden="true" focusable="false">
      <path d="M52 4 q14 -5 29 0 t29 0 t29 0 t29 0" stroke="#7DD3FC" stroke-width="2" fill="none"/>${bands}${tag}</svg>`;
  }
  /* Hình lớn ở tab Tầng biển */
  function zonesMapSvg(selected) {
    const H = 430, Y0 = 50, W0 = 190, W = 260;
    const bands = ZONES.map((z) => {
      const y = Y0 + (z.top / 100) * H, h = (z.h / 100) * H;
      const on = selected === z.id;
      return `<g class="gx-band ${on ? "is-selected" : ""}" data-object="${z.id}" role="button" tabindex="0" aria-label="${z.label}, ${z.depth}">
        <rect x="${W0}" y="${y}" width="${W}" height="${h}" fill="${z.color}"/>
        <rect class="gx-band-ring" x="${W0 + 3}" y="${y + 3}" width="${W - 6}" height="${h - 6}" fill="none" stroke="#EC4899" stroke-width="6" rx="6"/>
        <text x="${W0 - 14}" y="${y + h / 2 + 9}" text-anchor="end" class="gx-depth">${z.depth}</text>
        <path d="M${W0 + W} ${y + h / 2} L540 ${y + h / 2}" stroke="#5B216E" stroke-width="2" stroke-dasharray="4 4"/>
        <rect class="gx-zone-tag" x="540" y="${y + h / 2 - 29}" width="300" height="58" rx="18"/>
        <text x="690" y="${y + h / 2 + 11}" text-anchor="middle" class="gx-zone-name">${z.label}</text></g>`;
    }).join("");
    const seabed = `<path d="M${W0} ${Y0 + H * 0.86} L${W0 + 70} ${Y0 + H * 0.86} L${W0 + 110} ${Y0 + H} L${W0 + 150} ${Y0 + H} L${W0 + 180} ${Y0 + H * 0.86} L${W0 + W} ${Y0 + H * 0.86} V${Y0 + H + 10} H${W0}Z" fill="#78716C" opacity=".85" pointer-events="none"/>`;
    return `<svg class="gx-map-svg" viewBox="-60 0 920 500" role="group" aria-label="Các tầng đại dương">
      <circle cx="${W0 + 40}" cy="22" r="16" fill="#FBBF24"/>
      <path d="M${W0} ${Y0} q16 -8 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0" stroke="#7DD3FC" stroke-width="4" fill="none"/>
      ${bands}${seabed}
      <g pointer-events="none" transform="translate(${W0 + 150} ${Y0 + 120}) scale(.55)"><ellipse cx="40" cy="30" rx="40" ry="20" fill="#FACC15" stroke="#A16207" stroke-width="3"/><circle cx="30" cy="28" r="7" fill="#BAE6FD" stroke="#A16207" stroke-width="2"/><circle cx="52" cy="28" r="7" fill="#BAE6FD" stroke="#A16207" stroke-width="2"/><rect x="34" y="2" width="12" height="12" fill="#FACC15" stroke="#A16207" stroke-width="2"/></g>
      <text x="${W0 - 14}" y="${Y0 - 8}" text-anchor="end" class="gx-depth">Độ sâu</text>
    </svg>`;
  }

  /* ---------- Cảnh lặn biển ở tab đầu ---------- */
  /* Trong cảnh lặn, tầng ánh sáng được vẽ cao hơn để đủ chỗ cho nhiều sinh vật */
  const DIVE_ZONES = { "sunlight-zone": [0, 38], "twilight-zone": [38, 18], "midnight-zone": [56, 18], "abyss-zone": [74, 14], "trench-zone": [88, 12] };
  const SPOTS = [
    { id: "blue-whale", x: 30, top: 6, w: 25 },
    { id: "dolphin", x: 70, top: 2, w: 16 },
    { id: "clownfish", x: 21, top: 25, w: 9 },
    { id: "great-white", x: 58, top: 22, w: 19 },
    { id: "sea-turtle", x: 6, top: 15, w: 10 },
    { id: "octopus", x: 84, top: 26, w: 11 },
    { id: "jellyfish", x: 30, top: 41, w: 9 },
    { id: "giant-squid", x: 72, top: 56, w: 15 },
    { id: "anglerfish", x: 42, top: 61, w: 14 }
  ];
  function diveBg() {
    const bands = ZONES.map((z) => { const [top, h] = DIVE_ZONES[z.id]; return `<rect x="0" y="${top * 6}" width="400" height="${h * 6}" fill="${z.color}"/>`; }).join("");
    return `<svg viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true">${bands}
      <path d="M0 6 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#E0F2FE" stroke-width="5" fill="none"/>
      <path d="M0 528 L120 528 L170 600 L250 600 L300 528 L400 528 V600 H0Z" fill="#292524" opacity=".9"/>
      <path d="M0 528 Q60 518 120 528 M300 528 Q350 518 400 528" stroke="#57534E" stroke-width="4" fill="none"/></svg>`;
  }
  const DIVE_DECOR = `
    <span class="gx-decor" style="left:2%;top:29%;width:15%"><svg viewBox="0 0 100 60" aria-hidden="true"><path d="M10 60 V30 Q10 20 18 22 Q22 10 30 20 V60Z" fill="#FB7185"/><path d="M40 60 V24 Q44 8 52 24 V60Z" fill="#F472B6"/><path d="M60 60 Q56 34 70 28 Q84 34 80 60Z" fill="#FDBA74"/><path d="M84 60 V36 Q90 26 96 36 V60Z" fill="#C084FC"/></svg></span>
    <span class="gx-decor" style="left:60%;top:80%;width:7%"><svg viewBox="0 0 40 30" aria-hidden="true"><path d="M20 2 L24 12 L36 12 L26 18 L30 28 L20 22 L10 28 L14 18 L4 12 L16 12Z" fill="#FB923C"/></svg></span>
    <span class="gx-decor" style="left:30%;top:83%;width:10%"><svg viewBox="0 0 50 20" aria-hidden="true"><ellipse cx="25" cy="12" rx="22" ry="7" fill="#A8A29E"/><circle cx="10" cy="8" r="2" fill="#78716C"/><circle cx="22" cy="6" r="2" fill="#78716C"/><circle cx="34" cy="7" r="2" fill="#78716C"/></svg></span>
    <span class="gx-glow" style="left:24%;top:46%"></span><span class="gx-glow" style="left:88%;top:44%"></span><span class="gx-glow" style="left:30%;top:68%"></span><span class="gx-glow" style="left:64%;top:70%"></span>`;
  const OCEAN_ICON = `<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><circle cx="40" cy="40" r="34" fill="#E0F2FE"/><path d="M8 44q15-10 31 0t33 0v20H8z" fill="#38BDF8"/><path d="M18 38c10-10 25-12 34-3l12-5-5 9 6 8-13-5c-9 8-24 8-34-4z" fill="#3B82F6"/></svg>`;


  /* ===== Mô phỏng tàu ngầm: hiển thị minh họa, không phải đo độ sâu thực ===== */
  const SUB_MAX_DEPTH = 6500;
  const SUB_STOPS = [50, 550, 2200, 4800, 6300];
  const SUB_INFO = [
    { from: 0, to: 200, id: "sunlight-zone", color: "#38BDF8",
      vi: "Có ánh sáng Mặt Trời. Tảo và sinh vật phù du có thể quang hợp; nhiều loài sống ở đây.",
      en: "Sunlight reaches this zone. Algae and plankton can photosynthesize, and many animals live here.",
      faunaVi: "Cá, rùa biển, cá heo", faunaEn: "Fish, sea turtles, dolphins" },
    { from: 200, to: 1000, id: "twilight-zone", color: "#2563EB",
      vi: "Ánh sáng rất yếu, không đủ cho quang hợp. Một số sinh vật có mắt lớn hoặc phát sáng.",
      en: "Sunlight is faint and too weak for photosynthesis. Some animals have big eyes or make light.",
      faunaVi: "Cá đèn lồng, mực", faunaEn: "Lanternfish, squid" },
    { from: 1000, to: 4000, id: "midnight-zone", color: "#1E3A8A",
      vi: "Không có ánh sáng Mặt Trời. Nhiều sinh vật dựa vào ánh sáng sinh học và thức ăn từ phía trên.",
      en: "No sunlight reaches this zone. Some animals glow and depend on food sinking from above.",
      faunaVi: "Cá phát sáng, mực biển sâu", faunaEn: "Glowing fish, deep-sea squid" },
    { from: 4000, to: 6000, id: "abyss-zone", color: "#0F172A",
      vi: "Nước rất tối, lạnh và chịu áp suất lớn. Sinh vật phải thích nghi với môi trường khắc nghiệt.",
      en: "This water is very dark, cold, and under great pressure. Animals need special adaptations.",
      faunaVi: "Hải sâm và động vật đáy biển", faunaEn: "Sea cucumbers and seabed animals" },
    { from: 6000, to: 6501, id: "trench-zone", color: "#020617",
      vi: "Rãnh biển sâu hơn 6.000 m: tối hoàn toàn, áp suất cực lớn. Một số sinh vật đặc biệt vẫn sống được ở đây.",
      en: "Trenches are deeper than 6,000 m: no sunlight and enormous pressure, yet some animals survive.",
      faunaVi: "Động vật nhỏ thích nghi với áp suất", faunaEn: "Small pressure-adapted animals" }
  ];
  const sub = { depth: 50, exactDepth: 50, running: false, raf: 0, last: 0, phase: 0, canvas: null, visited: new Set([0]) };
  const subLocal = (vi, en) => LANG === "en" ? en : vi;
  const subZoneIndex = (d) => d >= 6000 ? 4 : d >= 4000 ? 3 : d >= 1000 ? 2 : d >= 200 ? 1 : 0;
  const subMeters = (d) => `${Math.round(d).toLocaleString(LANG === "en" ? "en-US" : "vi-VN")} m`;
  const subZoneTitle = (i) => LANG === "en" ? trText(byId(SUB_INFO[i].id).name) : byId(SUB_INFO[i].id).name;

  function submarineHtml() {
    const i = subZoneIndex(sub.depth);
    const chips = SUB_INFO.map((z, k) => `<button class="gx-sub-zone ${i === k ? "selected" : ""}" type="button" data-sub-stop="${k}" aria-pressed="${i === k}"><span class="gx-sub-indicator" style="background:${z.color}"></span>${subZoneTitle(k)}</button>`).join("");
    return `<div class="gx-sub-sim" aria-label="${subLocal("Mô phỏng lặn biển", "Underwater diving simulation")}">
       <div class="gx-card gx-sub-visual">
         <div class="gx-sub-visual-top"><strong>🚤 ${subLocal("Tự lái tàu ngầm", "Pilot a submarine")}</strong><span class="gx-sub-live">● ${subLocal("Mô phỏng", "Simulation")}</span></div>
         <div class="gx-sub-canvas-wrap"><canvas class="gx-sub-canvas" width="900" height="520" role="img" aria-label="${subLocal("Tàu ngầm và những sinh vật trong tầng biển đang chọn", "A submarine and sea life in the selected ocean zone")}"></canvas><div class="gx-sub-meter"><span>🌊 ${subLocal("Độ sâu", "Depth")}</span><b data-sub-depth>${subMeters(sub.depth)}</b></div><div class="gx-sub-zone-tag" data-sub-zone-tag>${subZoneTitle(i)}</div></div>
         <div class="gx-sub-bottom"><span>🐰 ${subLocal("Bé thử lặn sâu hơn: ánh sáng thay đổi thế nào?", "Dive deeper: what happens to the sunlight?")}</span><span class="gx-sub-note">${subLocal("Hình mô phỏng, không theo tỉ lệ", "Illustration, not to scale")}</span></div>
       </div>
       <aside class="gx-card gx-sub-controls">
         <h3>🧭 ${subLocal("Khám phá độ sâu", "Explore the depths")}</h3>
         <p class="gx-sub-intro">${subLocal("Kéo thanh hoặc bấm vào một tầng biển. Bé có thể cho tàu tự lặn và tạm dừng bất cứ lúc nào.", "Move the slider or choose a zone. Let the submarine dive by itself, or pause whenever you like.")}</p>
         <label class="gx-sub-slider-label" for="gx-sub-depth-input">${subLocal("Điều khiển độ sâu", "Depth control")} <b data-sub-depth-label>${subMeters(sub.depth)}</b></label>
         <input id="gx-sub-depth-input" class="gx-sub-slider" data-sub-depth-input type="range" min="0" max="6500" step="10" value="${sub.depth}" />
         <div class="gx-sub-actions"><button type="button" data-sub-action="shallower">⬆ ${subLocal("Lên 200 m", "Up 200 m")}</button><button type="button" data-sub-action="deeper">⬇ ${subLocal("Xuống 200 m", "Down 200 m")}</button><button type="button" class="gx-sub-autoplay" data-sub-action="autoplay">▶ ${subLocal("Tự lặn", "Auto dive")}</button></div>
         <div class="gx-sub-zones" aria-label="${subLocal("Chọn tầng biển", "Choose an ocean zone")}">${chips}</div>
         <div class="gx-sub-fact"><div class="gx-sub-fact-head"><b>🐰 <span data-sub-zone-title>${subZoneTitle(i)}</span></b><button type="button" class="gx-sub-voice" data-sub-action="listen">🔊 ${subLocal("Nghe Cô Thỏ", "Listen to Bunny")}</button></div>
           <p data-sub-fact>${subLocal(SUB_INFO[i].vi,SUB_INFO[i].en)}</p>
           <p class="gx-sub-fauna">🐠 <b>${subLocal("Ví dụ sinh vật:", "Example animals:")}</b> <span data-sub-fauna>${subLocal(SUB_INFO[i].faunaVi,SUB_INFO[i].faunaEn)}</span></p>
         </div>
         <p class="gx-sub-lesson">💡 ${subLocal("Con rút ra điều gì? Càng xuống sâu, ánh sáng Mặt Trời càng giảm. Biển sâu còn chịu áp suất lớn hơn.", "What did you discover? Sunlight fades as you dive deeper, and water pressure increases.")}</p>
       </aside>
     </div>`;
  }

  function stopSubmarineAnimation() {
    if (sub.raf) cancelAnimationFrame(sub.raf);
    sub.raf = 0; sub.last = 0; sub.running = false; sub.canvas = null;
  }
  function refreshSubControls() {
    if (!root || activeTab !== "submarine") return;
    const container = root.querySelector(".gx-sub-sim");
    if (!container) return;
    const i = subZoneIndex(sub.depth), z = SUB_INFO[i];
    const setText = (selector, value) => { const el = container.querySelector(selector); if (el) el.textContent = value; };
    setText("[data-sub-depth]", subMeters(sub.depth));
    setText("[data-sub-depth-label]", subMeters(sub.depth));
    setText("[data-sub-zone-tag]", subZoneTitle(i));
    setText("[data-sub-zone-title]", subZoneTitle(i));
    setText("[data-sub-fact]", subLocal(z.vi,z.en));
    setText("[data-sub-fauna]", subLocal(z.faunaVi,z.faunaEn));
    const slider=container.querySelector("[data-sub-depth-input]");
    if(slider) { slider.value=String(Math.round(sub.depth/10)*10); slider.style.setProperty("--depth-progress", `${(sub.depth/SUB_MAX_DEPTH)*100}%`); }
    container.querySelectorAll("[data-sub-stop]").forEach((b) => { const on = +b.dataset.subStop === i; b.classList.toggle("selected",on); b.setAttribute("aria-pressed", String(on)); });
    const auto=container.querySelector('[data-sub-action="autoplay"]');
    if(auto) auto.textContent = sub.running ? `⏸ ${subLocal("Tạm dừng","Pause")}` : `▶ ${subLocal("Tự lặn","Auto dive")}`;
  }
  function setSubDepth(value) {
    const next = Math.max(0,Math.min(SUB_MAX_DEPTH,Math.round(Number(value) / 10) * 10));
    if (!Number.isFinite(next)) return;
    const before = subZoneIndex(sub.depth);
    sub.depth = next;
    if (!sub.running) sub.exactDepth=next;
    const after = subZoneIndex(next);
    sub.visited.add(after);
    if (after !== before) stopSpeak(false);
    refreshSubControls();
    if (!sub.raf) drawSubmarine();
  }

  const subColorStops = [
    [71,201,241,20,104,188], [26,91,157,12,45,98], [7,32,80,3,17,44],
    [5,16,40,2,8,25], [3,10,24,1,4,17]
  ];
  function subFish(ctx, x,y,scale,phase, color, flip=1) {
    ctx.save(); ctx.translate(x,y + Math.sin(phase)*7*scale); ctx.scale(scale*flip,scale);
    ctx.fillStyle=color; ctx.beginPath(); ctx.ellipse(0,0,28,13,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath(); ctx.moveTo(-22,0);ctx.lineTo(-45,-17);ctx.lineTo(-43,17);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(-4,-9);ctx.lineTo(8,-21);ctx.lineTo(15,-9);ctx.closePath();ctx.fill();
    ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(18,-3,3.1,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#15233f";ctx.beginPath();ctx.arc(19,-3,1.4,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  function subJelly(ctx,x,y,s,phase) {
    ctx.save();ctx.translate(x,y + Math.sin(phase)*10);ctx.scale(s,s);
    ctx.fillStyle="rgba(252,171,250,.86)";ctx.beginPath();ctx.ellipse(0,0,30,22,0,Math.PI,Math.PI*2);ctx.lineTo(30,2);ctx.quadraticCurveTo(0,10,-30,2);ctx.closePath();ctx.fill();
    ctx.strokeStyle="rgba(232,200,255,.75)";ctx.lineWidth=3;
    for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*10,5);ctx.bezierCurveTo(i*10+9,23,i*10-8,38+Math.sin(phase+i)*8,i*10,54);ctx.stroke();}ctx.restore();
  }
  function subShark(ctx,x,y,scale,t) {
    ctx.save();ctx.translate(x,y + Math.sin(t)*8);ctx.scale(scale,scale);
    ctx.fillStyle="#879fbe";ctx.beginPath();ctx.moveTo(-68,0);ctx.quadraticCurveTo(0,-22,67,-4);ctx.quadraticCurveTo(5,28,-68,0);ctx.fill();
    ctx.beginPath();ctx.moveTo(-57,-1);ctx.lineTo(-88,-23);ctx.lineTo(-78,2);ctx.lineTo(-90,26);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(-6,-13);ctx.lineTo(7,-45);ctx.lineTo(25,-11);ctx.closePath();ctx.fill();
    ctx.fillStyle="#ebf4ff";ctx.beginPath();ctx.moveTo(-55,3);ctx.quadraticCurveTo(0,23,51,4);ctx.quadraticCurveTo(8,22,-55,3);ctx.fill();
    ctx.fillStyle="#12213d";ctx.beginPath();ctx.arc(38,-5,3,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  function subTurtle(ctx,x,y,s,phase) {
    ctx.save();ctx.translate(x,y + Math.sin(phase)*6);ctx.scale(s,s);
    ctx.fillStyle="#2e9d97";for (const [x,y,r] of [[-33,-14,-.45],[-33,15,.5],[25,-20,.5],[25,19,-.45]]) {ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.beginPath();ctx.ellipse(0,0,17,9,0,0,Math.PI*2);ctx.fill();ctx.restore();}
    ctx.fillStyle="#76c5b1";ctx.beginPath();ctx.ellipse(32,-2,16,12,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#378e71";ctx.beginPath();ctx.ellipse(-7,0,39,26,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#9ee5b5";ctx.lineWidth=3;ctx.stroke();
    ctx.fillStyle="#b9f6d4";ctx.beginPath();ctx.arc(39,-6,3,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  function drawSubmarine() {
    const canvas=sub.canvas;if(!canvas || !canvas.isConnected) return;
    const ctx=canvas.getContext("2d");if(!ctx)return;
    const w=900,h=520,depth=sub.depth,idx=subZoneIndex(depth),palette=subColorStops[idx],t=sub.phase;
    // Stable logical coordinate system; canvas is scaled to the element width by CSS.
    ctx.clearRect(0,0,w,h);
    const bg=ctx.createLinearGradient(0,0,0,h);
    bg.addColorStop(0,`rgb(${palette[0]},${palette[1]},${palette[2]})`);
    bg.addColorStop(1,`rgb(${palette[3]},${palette[4]},${palette[5]})`);
    ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
    // Sun rays disappear naturally with depth.
    const light = Math.max(0,1-depth/950);
    if(light>0){ctx.save();ctx.globalAlpha=light*.36;ctx.fillStyle="#fffef5";
      for(let k=0;k<8;k++){const x=k*138-90+Math.sin(t*.15+k)*16;ctx.beginPath();ctx.moveTo(x,-20);ctx.lineTo(x+95,-20);ctx.lineTo(x+175,520);ctx.lineTo(x-35,520);ctx.fill();}ctx.restore();}
    // Moving particulate water; subtle enough not to distract reading.
    for(let k=0;k<45;k++){
      const x=(k*163 + 39 + Math.sin(t*.31+k*2)*21)%w;
      const y=(k*109+Math.cos(t*.24+k)*12+h)%h;
      const r=1.2+(k%4)*.35;ctx.fillStyle=idx<2?"rgba(222,252,255,.25)":"rgba(129,196,255,.18)";
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
    }
    if(idx===0){
      // Coral is associated only with the shallow sunlit scene.
      for(let k=0;k<11;k++){const x=k*100+26;ctx.strokeStyle=k%2?"#fd8b98":"#ffa270";ctx.lineCap="round";ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(x,530);ctx.lineTo(x,460);ctx.lineTo(x-17,438);ctx.moveTo(x,478);ctx.lineTo(x+18,454);ctx.stroke();}
      subTurtle(ctx,695+Math.sin(t*.35)*55,138,1.05,t);
      for(let k=0;k<6;k++) subFish(ctx,(k*160+t*(13+k)%1080)%1040-60,170+(k%4)*62,.65+(k%3)*.15,t*.7+k,["#fbbf24","#93f4ec","#ffb4b0"][k%3],1);
      subShark(ctx,745-Math.sin(t*.3)*60,350,.70,t);
    } else if (idx===1){
      for(let k=0;k<5;k++) subFish(ctx,(k*230+t*13)%1110-105,105+k*77,.72,t+k,"#7eb5e0");
      subJelly(ctx,660+Math.sin(t*.4)*50,230,1.1,t);
    } else if (idx===2){
      for(let k=0;k<7;k++){const x=120+k*115+Math.sin(t*.6+k)*24,y=95+(k*59)%345;
        ctx.fillStyle="rgba(108,241,255,.10)";ctx.beginPath();ctx.arc(x,y,18,0,Math.PI*2);ctx.fill();
        subFish(ctx,x,y,.45,t+k,"#4587ad",k%2?1:-1);
        ctx.fillStyle="#a8fff3";ctx.beginPath();ctx.arc(x+9,y-2,3,0,Math.PI*2);ctx.fill();}
      subJelly(ctx,735+Math.sin(t*.5)*30,230,.9,t);
    } else if(idx===3){
      ctx.fillStyle="#192c4d";ctx.beginPath();ctx.moveTo(0,465);for(let k=0;k<=9;k++)ctx.lineTo(k*110,440+Math.sin(k*2)*34);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
      subJelly(ctx,760,215,.82,t);
      for(let k=0;k<10;k++){ctx.fillStyle=`rgba(120,255,225,${.18+.13*Math.sin(t+k)})`;ctx.beginPath();ctx.arc(85+k*77,420+(k%3)*27,2.2,0,Math.PI*2);ctx.fill();}
    } else {
      ctx.fillStyle="#17243c";ctx.beginPath();ctx.moveTo(0,460);for(let k=0;k<=9;k++)ctx.lineTo(k*104,460+Math.sin(k*2.4)*24);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
      // Tiny glowing creatures, not an invented large species in trenches.
      for(let k=0;k<12;k++){const x=80+k*74+Math.sin(t*.33+k)*7,y=390+(k%4)*22;
        const glow=ctx.createRadialGradient(x,y,0,x,y,13);glow.addColorStop(0,"rgba(138,245,231,.85)");glow.addColorStop(1,"rgba(138,245,231,0)");ctx.fillStyle=glow;ctx.fillRect(x-13,y-13,26,26);}
    }
    // Sonar rings and lamp ahead of the submarine.
    const lamp=ctx.createRadialGradient(560,249,0,560,249,245);
    lamp.addColorStop(0,idx<2?"rgba(255,246,182,.40)":"rgba(158,239,255,.40)");lamp.addColorStop(1,"rgba(158,239,255,0)");
    ctx.fillStyle=lamp;ctx.beginPath();ctx.moveTo(523,244);ctx.lineTo(900,70);ctx.lineTo(900,415);ctx.closePath();ctx.fill();
    ctx.save();ctx.translate(412,256+Math.sin(t*1.7)*4);
    ctx.fillStyle="#163d7a";ctx.beginPath();ctx.moveTo(-103,-15);ctx.lineTo(-160,-36);ctx.lineTo(-160,32);ctx.lineTo(-103,18);ctx.closePath();ctx.fill();
    ctx.fillStyle="#e5ad2f";ctx.beginPath();ctx.ellipse(0,5,132,64,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#ffd459";ctx.beginPath();ctx.ellipse(-4,-3,128,57,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#e0a237";ctx.fillRect(-34,-70,73,16);ctx.fillStyle="#ffd459";ctx.fillRect(-12,-92,30,33);
    ctx.fillStyle="#fff2a7";ctx.fillRect(0,-112,10,23);
    ctx.fillStyle="#1a5d96";for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(-64+k*67,-5,24,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#f7ac4a";ctx.lineWidth=7;ctx.stroke();ctx.fillStyle="rgba(157,238,255,.55)";ctx.beginPath();ctx.arc(-70+k*67,-11,8,0,Math.PI*2);ctx.fill();ctx.fillStyle="#1a5d96";}
    ctx.fillStyle="#fff3c2";ctx.beginPath();ctx.ellipse(128,0,9,17,0,0,Math.PI*2);ctx.fill();
    ctx.translate(-152,3);ctx.rotate(t*4);ctx.strokeStyle="#cbe8ff";ctx.lineWidth=8;ctx.lineCap="round";for(let k=0;k<3;k++){ctx.rotate(Math.PI*2/3);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-28);ctx.stroke();}ctx.restore();
    // Air bubbles from the stern.
    for(let k=0;k<9;k++){const p=(t*.28+k*.137)%1,x=252-p*180,y=290-p*170+Math.sin(t+k)*9;
      ctx.strokeStyle="rgba(204,250,255,.48)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,3+k%3*2.2,0,Math.PI*2);ctx.stroke();}
  }
  function startSubmarineAnimation() {
    sub.canvas=root && root.querySelector(".gx-sub-canvas");sub.last=0;
    refreshSubControls();
    if (!sub.canvas) return;
    drawSubmarine();
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame=(now)=>{
      if (!root || !root.isConnected || activeTab!=="submarine" || document.hidden) {sub.raf=0;sub.last=0;return;}
      const dt=sub.last ? Math.min(.06,(now-sub.last)/1000) : 0;sub.last=now;
      sub.phase+=dt;
      if(sub.running){sub.exactDepth=Math.min(SUB_MAX_DEPTH,sub.exactDepth+dt*360);
        const next=sub.exactDepth;
        if(next>=SUB_MAX_DEPTH)sub.running=false;
        if(Math.round(next/10)*10!==sub.depth || !sub.running) setSubDepth(next);
      }
      drawSubmarine();sub.raf=requestAnimationFrame(frame);
    };
    sub.raf=requestAnimationFrame(frame);
  }

  /* ---------- Trạng thái ---------- */
  let controller = null;
  let root = null;
  let activeContext = null;
  let activeTab = "dive";
  let selectedId = DATA.overview.id;
  let quiz = null;
  let autoRead = true;
  let toastTimer = 0;
  let found = loadFound();

  const allItems = [DATA.overview, ...DATA.primary, ...DATA.secondary];
  const byId = (id) => allItems.find((item) => item.id === id) || DATA.overview;
  const isZone = (id) => DATA.primary.some((d) => d.id === id);
  const isCreature = (id) => DATA.secondary.some((d) => d.id === id);
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
        width:100%;box-sizing:border-box;height:min(760px,calc(100vh - 120px));min-height:640px;
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
      ${R} .gx-tab[data-tab="creatures"][aria-selected="true"],${R} .gx-tab[data-tab="quiz"][aria-selected="true"]{background:var(--grad-alt)}
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
      ${R} .gx-logo svg{width:46px}
      ${R} .gx-dive .gx-zone{position:absolute;left:0;width:100%;border:0;padding:6px 8px;background:transparent;z-index:1;display:flex;align-items:flex-start;justify-content:flex-start}
      ${R} .gx-dive .gx-zone:hover{background:rgba(255,255,255,.08)}
      ${R} .gx-dive .gx-zone.is-selected{box-shadow:inset 0 0 0 5px #EC4899;background:rgba(236,72,153,.08)}
      ${R} .gx-zone-chip{margin-top:0;font-size:14px!important}
      ${R} .gx-zone.is-found .gx-zone-chip{border-color:#6EE7B7}
      ${R} .gx-zone.is-found .gx-zone-chip::before{content:"✓ ";color:var(--good)}
      ${R} .gx-zone.is-selected .gx-zone-chip{background:var(--grad-main);border-color:transparent;color:#fff}
      ${R} .gx-decor{position:absolute;z-index:2;pointer-events:none}
      ${R} .gx-decor svg{width:100%;height:auto;display:block}
      ${R} .gx-glow{position:absolute;z-index:2;width:6px;height:6px;border-radius:50%;background:#67E8F9;box-shadow:0 0 10px 4px rgba(103,232,249,.6);pointer-events:none}
      ${R} .gx-ocean-what{position:absolute;left:10px;top:12px;z-index:120}
      ${R} .gx-spot .gx-sea-svg{width:100%;height:auto;display:block}
      ${R} .gx-spot.is-selected .gx-sea-svg{filter:drop-shadow(0 0 6px rgba(236,72,153,.9))}
      ${R} .gx-hero.is-zone{background:linear-gradient(135deg,#FFF1F7,#E0F2FE)}
      ${R} .gx-hero.is-zone svg{width:100%;height:100%}
      ${R} .gx-zone-mini{font:700 17px "Baloo 2","Nunito",system-ui,sans-serif;fill:#5B216E}
      ${R} .gx-band{cursor:pointer;outline:none}
      ${R} .gx-band-ring{display:none}
      ${R} .gx-band.is-selected .gx-band-ring{display:inline}
      ${R} .gx-band:hover>rect:first-child,${R} .gx-band:focus-visible>rect:first-child{filter:brightness(1.2)}
      ${R} .gx-zone-tag{fill:#fff;stroke:#E9D5FF;stroke-width:3}
      ${R} .gx-band:hover .gx-zone-tag{stroke:#C4B5FD}
      ${R} .gx-band.is-selected .gx-zone-tag{fill:#FFF1F7;stroke:#EC4899}
      ${R} .gx-zone-name{font:700 30px "Baloo 2","Nunito",system-ui,sans-serif;fill:#5B216E}
      ${R} .gx-depth{font:700 22px "Baloo 2","Nunito",system-ui,sans-serif;fill:#5B216E}
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
        ${R} .gx-zone-chip{font-size:11px!important}
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
      /* Mô phỏng tàu ngầm: tách biệt với bốn chế độ hiện có */
      ${R} .gx-tabs:has([data-tab="submarine"]){grid-template-columns:repeat(5,minmax(0,1fr))}
      ${R} .gx-tab[data-tab="submarine"][aria-selected="true"]{background:var(--grad-alt)}
      ${R} .gx-sub-sim{height:100%;min-height:0;display:grid;grid-template-columns:minmax(0,1.4fr) minmax(305px,.85fr);gap:14px}
      ${R} .gx-sub-visual{display:flex;flex-direction:column;background:#f0f9ff}
      ${R} .gx-sub-visual-top{display:flex;justify-content:space-between;align-items:center;padding:10px 15px;gap:10px;color:#0c4a6e;background:linear-gradient(90deg,#e0f2fe,#ecfdf5)}
      ${R} .gx-sub-visual-top strong{font-size:20px;font-weight:800}
      ${R} .gx-sub-live{font-size:13px;color:#0369a1;background:#fff;border:1px solid #bae6fd;border-radius:999px;padding:2px 8px;white-space:nowrap}
      ${R} .gx-sub-canvas-wrap{position:relative;min-height:0;flex:1;background:#0f447a;overflow:hidden}
      ${R} .gx-sub-canvas{width:100%;height:100%;display:block;object-fit:fill}
      ${R} .gx-sub-meter,${R} .gx-sub-zone-tag{position:absolute;background:rgba(255,255,255,.93);border:1px solid rgba(186,230,253,.95);border-radius:14px;padding:6px 12px;color:#164e63;box-shadow:0 6px 22px rgba(8,47,73,.16);pointer-events:none}
      ${R} .gx-sub-meter{top:12px;left:12px;display:flex;flex-direction:column;gap:0;font-size:15px}
      ${R} .gx-sub-meter b{font-size:26px;line-height:1.1;color:#1d4ed8}
      ${R} .gx-sub-zone-tag{right:12px;bottom:12px;font-size:18px;font-weight:800;max-width:80%}
      ${R} .gx-sub-bottom{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;padding:9px 14px;background:#f0f9ff;font-size:15px;font-weight:700;color:#075985}
      ${R} .gx-sub-note{font-size:12px;color:#64748b;font-weight:600}
      ${R} .gx-sub-controls{display:flex;flex-direction:column;gap:10px;padding:13px 15px;overflow:auto}
      ${R} .gx-sub-controls h3{font-size:23px;line-height:1.16;color:#5b216e;margin:0}
      ${R} .gx-sub-intro{font-size:15px;line-height:1.4;margin:0;color:#475569}
      ${R} .gx-sub-slider-label{font-size:16px;font-weight:800;color:#075985;display:flex;align-items:center;justify-content:space-between;gap:5px}
      ${R} .gx-sub-slider-label b{font-size:20px;color:#7e22ce}
      ${R} .gx-sub-slider{width:100%;height:16px;min-height:16px;accent-color:#3b82f6;cursor:pointer;margin:0}
      ${R} .gx-sub-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px}
      ${R} .gx-sub-actions button,${R} .gx-sub-voice{min-height:42px;border:1px solid #bae6fd;background:#eff6ff;border-radius:12px;padding:6px;color:#075985;font-size:15px;font-weight:800}
      ${R} .gx-sub-actions .gx-sub-autoplay{grid-column:span 2;border:0;color:#fff;background:var(--grad-main)}
      ${R} .gx-sub-zones{display:flex;flex-wrap:wrap;gap:6px}
      ${R} .gx-sub-zone{display:inline-flex;align-items:center;gap:5px;border:1px solid #c4b5fd;border-radius:11px;background:#faf5ff;padding:6px 9px;font-size:13.5px;font-weight:750;color:#6d28d9;min-height:38px}
      ${R} .gx-sub-zone.selected{border-color:#3b82f6;background:#dbeafe;color:#1e40af}
      ${R} .gx-sub-indicator{width:10px;height:10px;border-radius:50%;flex:0 0 10px;border:1px solid rgba(0,0,0,.12)}
      ${R} .gx-sub-fact{background:#fff1f7;border:1px solid #f9a8d4;border-radius:15px;padding:10px 12px}
      ${R} .gx-sub-fact-head{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:space-between}
      ${R} .gx-sub-fact-head b{color:#9d174d;font-size:17px}
      ${R} .gx-sub-voice{min-height:36px;border-color:#f9a8d4;background:#fff;color:#be185d;padding:4px 8px;font-size:14px}
      ${R} .gx-sub-fact p{font-size:16px;line-height:1.42;margin:8px 0 0;color:#831843}
      ${R} .gx-sub-fact .gx-sub-fauna{color:#075985}
      ${R} .gx-sub-lesson{margin:0;font-size:15px;line-height:1.4;padding:8px 10px;background:#ecfdf5;border-radius:12px;color:#047857}
      @media(max-width:760px){${R} .gx-tabs:has([data-tab="submarine"]){grid-template-columns:repeat(2,minmax(0,1fr))}${R} .gx-sub-sim{grid-template-columns:1fr;height:auto}${R} .gx-sub-canvas-wrap{height:min(61vw,340px);min-height:230px;flex:none}${R} .gx-sub-controls{overflow:visible}}
      @media(min-width:761px) and (max-width:1040px){${R} .gx-sub-sim{grid-template-columns:minmax(0,1.1fr) minmax(265px,.9fr)}${R} .gx-sub-controls{padding:10px}}
      @media(prefers-reduced-motion:reduce){${R} *{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }


  function heroArt(obj) {
    if (SEA[obj.id]) return `<div class="gx-hero is-organ" style="background:${SEA_BG[obj.id]}">${seaSvg(obj.id)}</div>`;
    if (isZone(obj.id)) return `<div class="gx-hero is-organ is-zone">${zoneSvg(obj.id)}</div>`;
    return `<div class="gx-hero is-organ" style="background:#E0F2FE">${OCEAN_ICON}</div>`;
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
  function diveHtml() {
    const bands = ZONES.map((z, k) => {
      const d = byId(z.id);
      const [top, h] = DIVE_ZONES[z.id];
      const cls = `${found.has(z.id) ? "is-found" : ""} ${selectedId === z.id ? "is-selected" : ""}`;
      return `<button type="button" class="gx-zone ${cls}" data-object="${z.id}" style="top:${top}%;height:${h}%" aria-label="${d.name}, ${z.depth}"><span class="gx-chip gx-zone-chip" style="${k === 0 ? "margin-top:50px" : ""}">${d.name}</span></button>`;
    }).join("");
    const spots = SPOTS.map((s) => {
      const d = byId(s.id);
      const cls = `${found.has(s.id) ? "is-found" : ""} ${selectedId === s.id ? "is-selected" : ""}`;
      return `<button type="button" class="gx-spot ${cls}" data-object="${s.id}" style="left:${s.x}%;top:${s.top}%;width:${s.w}%;z-index:${20 + s.top}" aria-label="${d.name}">${seaSvg(s.id)}<span class="gx-chip">${d.name}</span></button>`;
    }).join("");
    const what = `<button type="button" class="gx-whole gx-ocean-what ${selectedId === DATA.overview.id ? "is-selected" : ""}" data-object="${DATA.overview.id}">🌊 Đại dương là gì?</button>`;
    return `<div class="gx-split">
      <div class="gx-card gx-scene gx-dive">${diveBg()}${bands}${DIVE_DECOR}${spots}${what}</div>
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }
  function zonesHtml() {
    if (!isZone(selectedId)) selectedId = DATA.primary[0].id;
    return `<div class="gx-split">
      ${mapCard("Càng xuống sâu, nước càng tối, càng lạnh và áp suất càng lớn. Chạm vào từng tầng nhé!", zonesMapSvg(selectedId))}
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }

  function gridHtml(items) {
    if (!items.some((i) => i.id === selectedId)) selectedId = items[0].id;
    const cards = items.map((o) => {
      const tick = found.has(o.id) ? `<span class="gx-tick">✓ Đã xem</span>` : "";
      return `<button type="button" class="gx-item gx-land-item ${o.id === selectedId ? "is-selected" : ""}" data-object="${o.id}">${tick}<span class="gx-thumb" style="background:${SEA_BG[o.id]};padding:6px">${seaSvg(o.id)}</span><span class="gx-item-text"><strong>${o.name}</strong><small>${o.subtitle}</small></span></button>`;
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
      const msg = stars === 3 ? "Tuyệt vời! Con là nhà thám hiểm đại dương nhí rồi!" : stars === 2 ? "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé." : "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.";
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
    stopSubmarineAnimation();
    const stage = root.querySelector(".gx-stage");
    if (activeTab === "zones" && !isZone(selectedId)) selectedId = DATA.primary[0].id;
    if (activeTab === "creatures" && !isCreature(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz" && activeTab !== "submarine") markFound(selectedId, true);
    let html = "";
    if (activeTab === "dive") html = diveHtml();
    else if (activeTab === "zones") html = zonesHtml();
    else if (activeTab === "creatures") html = gridHtml(DATA.secondary);
    else if (activeTab === "submarine") html = submarineHtml();
    else html = quizHtml();
    stage.innerHTML = `<section class="gx-panel" style="height:100%">${html}</section>`;
    updateSpeakButtons();
    if (activeTab === "submarine") startSubmarineAnimation();
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
    if (n === total) toast("🏆 Con đã khám phá hết đại dương rồi! Giỏi quá!");
    else toast(`🐠 Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { dive: "Lặn biển", zones: "Tầng biển", creatures: "Sinh vật", quiz: "Hỏi đáp", submarine: "Tàu ngầm" };
  function setBanner() {
    const fn0 = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    const fn = typeof fn0 === "function" ? (o) => fn0({ ...o, items: ((o && o.items) || []).map((it) => ({ ...it, title: trText(it.title) })) }) : fn0;
    if (typeof fn !== "function") return;
    fn({ items: [{ level: 2, title: `${CONFIG.gameNumber}. ${CONFIG.title}`, action: null }, { level: 3, title: activeTab === "submarine" ? subLocal("Tàu ngầm", "Submarine") : TAB_LABELS[activeTab], action: null }] });
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
      if (b.classList.contains("gx-spot") || b.classList.contains("gx-zone")) b.classList.toggle("is-found", found.has(b.dataset.object));
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
      const tab = t.closest(".gx-tab");
      if (tab) { switchTab(tab.dataset.tab, { readQuestion: true }); return; }
      const subStop=t.closest("[data-sub-stop]");
      if(subStop){sub.running=false;setSubDepth(SUB_STOPS[Number(subStop.dataset.subStop)]);return;}
      const subAction=t.closest("[data-sub-action]");
      if(subAction){
        const action=subAction.dataset.subAction;
        if(action==="deeper" || action==="shallower"){sub.running=false;setSubDepth(sub.depth+(action==="deeper"?200:-200));}
        else if(action==="autoplay"){sub.running=!sub.running;if(sub.running && sub.depth>=SUB_MAX_DEPTH)setSubDepth(0);sub.exactDepth=sub.depth;refreshSubControls();}
        else if(action==="listen"){const i=subZoneIndex(sub.depth), z=SUB_INFO[i];speak("submarine-info", `${subZoneTitle(i)}. ${subLocal(z.vi,z.en)}`,true);}
        return;
      }

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

    root.addEventListener("input", (event) => {
      if (event.target.matches && event.target.matches("[data-sub-depth-input]")) {sub.running=false;setSubDepth(+event.target.value);}
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

    document.addEventListener("visibilitychange", () => { if (document.hidden) {stopSpeak();stopSubmarineAnimation();} else if (activeTab === "submarine" && root && root.isConnected) startSubmarineAnimation(); }, { signal });
  }

  function render(context) {
    activeContext = context;
    injectAssets();
    activeTab = "dive";
    selectedId = DATA.overview.id;
    quiz = null;
    found = loadFound();
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `
      <header class="gx-head">
        <div class="gx-logo" aria-hidden="true">${OCEAN_ICON}</div>
        <div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div>
        ${langHtml()}<div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="dive" type="button" aria-selected="true">🤿 Lặn biển</button>
        <button class="gx-tab" role="tab" data-tab="zones" type="button" aria-selected="false" tabindex="-1">🌊 Tầng biển</button>
        <button class="gx-tab" role="tab" data-tab="creatures" type="button" aria-selected="false" tabindex="-1">🐳 Sinh vật</button>
        <button class="gx-tab" role="tab" data-tab="quiz" type="button" aria-selected="false" tabindex="-1">⭐ Hỏi đáp</button>
        <button class="gx-tab" role="tab" data-tab="submarine" type="button" aria-selected="false" tabindex="-1">🚤 ${subLocal("Tàu ngầm", "Submarine")}</button>
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
    if (langObserver) { langObserver.disconnect(); langObserver = null; }
    stopSpeak(false);
    stopSubmarineAnimation();
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
