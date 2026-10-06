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
    const stage = root.querySelector(".gx-stage");
    if (activeTab === "zones" && !isZone(selectedId)) selectedId = DATA.primary[0].id;
    if (activeTab === "creatures" && !isCreature(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz") markFound(selectedId, true);
    let html = "";
    if (activeTab === "dive") html = diveHtml();
    else if (activeTab === "zones") html = zonesHtml();
    else if (activeTab === "creatures") html = gridHtml(DATA.secondary);
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
    if (n === total) toast("🏆 Con đã khám phá hết đại dương rồi! Giỏi quá!");
    else toast(`🐠 Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { dive: "Lặn biển", zones: "Tầng biển", creatures: "Sinh vật", quiz: "Hỏi đáp" };
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

    document.addEventListener("visibilitychange", () => { if (document.hidden) stopSpeak(); }, { signal });
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
        <div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="dive" type="button" aria-selected="true">🤿 Lặn biển</button>
        <button class="gx-tab" role="tab" data-tab="zones" type="button" aria-selected="false" tabindex="-1">🌊 Tầng biển</button>
        <button class="gx-tab" role="tab" data-tab="creatures" type="button" aria-selected="false" tabindex="-1">🐳 Sinh vật</button>
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
