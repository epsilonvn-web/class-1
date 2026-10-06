(() => {
  "use strict";

  const CONFIG = Object.freeze({"moduleKey":"oceanExplorer","styleId":"class1-game-ocean-explorer-style","rootId":"ocean-explorer","gameNumber":10,"title":"Khám phá đại dương","subtitle":"Cùng Cô Thỏ Hồng lặn xuống thế giới dưới biển","overviewId":"ocean-overview","primaryTab":"Tầng biển","secondaryTab":"Sinh vật","primaryIcon":"🌊","secondaryIcon":"🐳","logoSvg":"<svg viewBox=\"0 0 80 80\"><circle cx=\"40\" cy=\"40\" r=\"34\" fill=\"#E0F2FE\"/><path d=\"M8 44q15-10 31 0t33 0v20H8z\" fill=\"#38BDF8\"/><path d=\"M18 38c10-10 25-12 34-3l12-5-5 9 6 8-13-5c-9 8-24 8-34-4z\" fill=\"#3B82F6\"/></svg>"});
  const DATA = Object.freeze({"overview":{"id":"ocean-overview","name":"Đại dương xanh","kicker":"KHÁM PHÁ ĐẠI DƯƠNG","subtitle":"Phần lớn bề mặt Trái Đất là nước biển","summary":"Đại dương là một thế giới khổng lồ gồm nước mặn, từ vùng mặt biển ngập nắng tới những rãnh sâu tối đen. Nơi đây là nhà của vô số sinh vật, từ sinh vật phù du rất nhỏ tới cá voi xanh khổng lồ.","more":"Các đại dương giúp điều hòa khí hậu, tham gia vòng tuần hoàn nước và tạo ra một phần lớn lượng ôxy trong khí quyển nhờ các sinh vật quang hợp nhỏ bé sống gần mặt biển. Càng xuống sâu, ánh sáng càng ít, nhiệt độ thường giảm và áp suất tăng mạnh.","remember":"Bé nhớ nhé: biển không chỉ có cá. Đại dương còn có động vật có vú, bò sát, thân mềm, sứa, san hô và vô số sinh vật li ti.","speech":"Đại dương bao phủ khoảng bảy mươi mốt phần trăm bề mặt Trái Đất. Gần mặt biển có nhiều ánh sáng. Càng xuống sâu, nước càng tối và áp suất càng lớn. Đại dương là nhà của rất nhiều sinh vật và có vai trò quan trọng với khí hậu của Trái Đất.","art":"ocean","facts":[{"label":"Bao phủ Trái Đất","value":"Khoảng 71% bề mặt"},{"label":"Nước","value":"Chủ yếu là nước mặn"},{"label":"Độ sâu trung bình","value":"Khoảng 3,7 km"},{"label":"Ánh sáng","value":"Mạnh ở gần mặt biển, yếu dần khi xuống sâu"},{"label":"Vai trò","value":"Điều hòa khí hậu và vòng tuần hoàn nước"},{"label":"Sự sống","value":"Từ sinh vật phù du tới cá voi xanh"}]},"primary":[{"id":"sunlight-zone","name":"Tầng ánh sáng","kicker":"TẦNG BIỂN","subtitle":"0–200 m","summary":"Đây là lớp nước gần mặt biển, nhận được nhiều ánh sáng Mặt Trời nhất.","more":"Ánh sáng đủ mạnh để tảo và thực vật phù du quang hợp. Vì vậy đây là vùng có rất nhiều sinh vật và cũng là nơi ta thường thấy san hô, rùa biển, cá heo và nhiều loài cá.","remember":"Có nhiều ánh sáng nhất và là vùng dễ quang hợp nhất.","speech":"Tầng ánh sáng nằm từ mặt biển xuống khoảng hai trăm mét. Đây là vùng nhận nhiều ánh sáng Mặt Trời nhất nên có rất nhiều sinh vật và hoạt động quang hợp.","art":"zone-sunlight","facts":[{"label":"Độ sâu","value":"0–200 m"},{"label":"Ánh sáng","value":"Nhiều"},{"label":"Nhiệt độ","value":"Ấm hơn các tầng sâu"},{"label":"Quang hợp","value":"Có thể diễn ra"},{"label":"Sinh vật tiêu biểu","value":"Cá, san hô, rùa biển, cá heo"}]},{"id":"twilight-zone","name":"Tầng chạng vạng","kicker":"TẦNG BIỂN","subtitle":"200–1.000 m","summary":"Ánh sáng ở đây rất yếu, giống như buổi chạng vạng kéo dài.","more":"Không còn đủ ánh sáng cho thực vật quang hợp tốt. Nhiều sinh vật có mắt lớn hoặc cơ thể phát sáng để tìm bạn, dụ mồi hoặc tránh kẻ săn mồi.","remember":"Ánh sáng yếu, chưa tối hoàn toàn và có nhiều sinh vật phát sáng.","speech":"Tầng chạng vạng nằm từ khoảng hai trăm đến một nghìn mét. Ánh sáng rất yếu và nhiều sinh vật có những cách đặc biệt để sống trong bóng tối.","art":"zone-twilight","facts":[{"label":"Độ sâu","value":"200–1.000 m"},{"label":"Ánh sáng","value":"Rất yếu"},{"label":"Quang hợp","value":"Hầu như không"},{"label":"Đặc điểm","value":"Nhiều sinh vật di chuyển lên xuống theo ngày đêm"},{"label":"Sinh vật tiêu biểu","value":"Cá đèn lồng, mực"}]},{"id":"midnight-zone","name":"Tầng nửa đêm","kicker":"TẦNG BIỂN","subtitle":"1.000–4.000 m","summary":"Đây là vùng không còn ánh sáng Mặt Trời chiếu tới.","more":"Nước lạnh, áp suất lớn và thức ăn khan hiếm. Nhiều sinh vật tạo ánh sáng sinh học của riêng mình. Một số loài có miệng lớn để tận dụng cơ hội bắt mồi hiếm hoi.","remember":"Không có ánh sáng Mặt Trời; sinh vật phải thích nghi với lạnh, tối và áp suất lớn.","speech":"Tầng nửa đêm nằm từ khoảng một nghìn đến bốn nghìn mét. Ở đây không có ánh sáng Mặt Trời, nước lạnh và áp suất rất lớn.","art":"zone-midnight","facts":[{"label":"Độ sâu","value":"1.000–4.000 m"},{"label":"Ánh sáng","value":"Không có ánh sáng Mặt Trời"},{"label":"Nhiệt độ","value":"Lạnh"},{"label":"Áp suất","value":"Rất lớn"},{"label":"Sinh vật tiêu biểu","value":"Cá cần câu, mực biển sâu"}]},{"id":"abyss-zone","name":"Tầng vực thẳm","kicker":"TẦNG BIỂN","subtitle":"4.000–6.000 m","summary":"Một vùng biển sâu rộng lớn, tối hoàn toàn và gần đóng băng.","more":"Đáy biển ở đây thường là những đồng bằng sâu phủ bùn mịn. Dù điều kiện rất khắc nghiệt, vẫn có hải sâm, sao biển, giáp xác và nhiều sinh vật nhỏ sinh sống.","remember":"Rất sâu, rất lạnh, rất tối nhưng vẫn có sự sống.","speech":"Tầng vực thẳm nằm từ khoảng bốn nghìn đến sáu nghìn mét. Nơi đây tối hoàn toàn, rất lạnh và áp suất cực lớn nhưng vẫn có nhiều sinh vật thích nghi được.","art":"zone-abyss","facts":[{"label":"Độ sâu","value":"4.000–6.000 m"},{"label":"Ánh sáng","value":"Không có"},{"label":"Nhiệt độ","value":"Gần 0–4°C"},{"label":"Đáy biển","value":"Nhiều vùng đồng bằng sâu"},{"label":"Sinh vật tiêu biểu","value":"Hải sâm, sao biển, giáp xác"}]},{"id":"trench-zone","name":"Rãnh đại dương","kicker":"TẦNG BIỂN","subtitle":"Sâu hơn 6.000 m","summary":"Đây là những khe sâu nhất của đáy đại dương.","more":"Một số rãnh sâu hơn 10 km. Áp suất khổng lồ nhưng các nhà khoa học vẫn tìm thấy vi sinh vật, giáp xác nhỏ và những loài cá đặc biệt ở một số khu vực.","remember":"Là vùng sâu nhất đại dương; rãnh Mariana có nơi sâu hơn 10 km.","speech":"Rãnh đại dương là những vùng sâu nhất của biển, thường sâu hơn sáu nghìn mét. Có nơi sâu hơn mười kilomet và áp suất rất lớn.","art":"zone-trench","facts":[{"label":"Độ sâu","value":"Trên 6.000 m"},{"label":"Ánh sáng","value":"Không có"},{"label":"Áp suất","value":"Cực lớn"},{"label":"Ví dụ","value":"Rãnh Mariana"},{"label":"Sự sống","value":"Vẫn có sinh vật thích nghi đặc biệt"}]}],"secondary":[{"id":"blue-whale","name":"Cá voi xanh","kicker":"SINH VẬT","subtitle":"Động vật có vú lớn nhất","summary":"Cá voi xanh là động vật lớn nhất từng được biết tới trên Trái Đất.","more":"Cá voi xanh sống ở đại dương rộng, ăn chủ yếu là nhuyễn thể krill rất nhỏ. Dù sống dưới nước, nó là động vật có vú nên phải ngoi lên mặt biển để thở bằng phổi.","remember":"Rất lớn nhưng thức ăn chính lại là krill rất nhỏ; thở bằng phổi.","speech":"Cá voi xanh là động vật lớn nhất. Nó ăn chủ yếu là krill và phải ngoi lên mặt biển để thở bằng phổi.","art":"whale","facts":[{"label":"Kích thước","value":"Có thể dài khoảng 24–30 m"},{"label":"Nơi sống","value":"Đại dương rộng"},{"label":"Thức ăn","value":"Krill"},{"label":"Hô hấp","value":"Bằng phổi"},{"label":"Di chuyển","value":"Bơi bằng đuôi theo nhịp lên xuống"},{"label":"Nhóm","value":"Động vật có vú"}]},{"id":"dolphin","name":"Cá heo","kicker":"SINH VẬT","subtitle":"Động vật có vú thông minh","summary":"Cá heo là động vật có vú sống ở biển, nổi tiếng vì khả năng giao tiếp và định vị bằng âm thanh.","more":"Cá heo thường sống theo nhóm. Chúng phát ra âm thanh và nghe tiếng vọng để tìm vật thể, con mồi và định hướng trong nước.","remember":"Cá heo không phải cá; chúng là động vật có vú và phải thở không khí.","speech":"Cá heo là động vật có vú sống ở biển. Chúng thở bằng phổi và có thể dùng âm thanh cùng tiếng vọng để định hướng.","art":"dolphin","facts":[{"label":"Nơi sống","value":"Nhiều vùng biển và đại dương"},{"label":"Thức ăn","value":"Cá và mực"},{"label":"Hô hấp","value":"Bằng phổi"},{"label":"Đặc biệt","value":"Dùng âm thanh và tiếng vọng"},{"label":"Xã hội","value":"Thường sống theo nhóm"},{"label":"Nhóm","value":"Động vật có vú"}]},{"id":"sea-turtle","name":"Rùa biển","kicker":"SINH VẬT","subtitle":"Bò sát sống ở biển","summary":"Rùa biển dành phần lớn cuộc đời ở biển nhưng rùa cái phải lên bãi cát để đẻ trứng.","more":"Rùa biển bơi bằng bốn chi biến đổi thành mái chèo. Chúng thở bằng phổi nên vẫn phải ngoi lên mặt nước lấy không khí.","remember":"Sống ở biển nhưng đẻ trứng trên bãi cát và thở bằng phổi.","speech":"Rùa biển là bò sát sống phần lớn dưới biển. Nó thở bằng phổi và rùa cái lên bãi cát để đẻ trứng.","art":"turtle","facts":[{"label":"Nhóm","value":"Bò sát"},{"label":"Hô hấp","value":"Bằng phổi"},{"label":"Di chuyển","value":"Bơi bằng các chi dạng mái chèo"},{"label":"Sinh sản","value":"Đẻ trứng trên bãi cát"},{"label":"Thức ăn","value":"Tùy loài: cỏ biển, sứa, động vật nhỏ"}]},{"id":"great-white","name":"Cá mập trắng","kicker":"SINH VẬT","subtitle":"Cá săn mồi lớn","summary":"Cá mập trắng là một loài cá lớn, có thân hình khỏe và nhiều hàng răng sắc.","more":"Cá mập thở bằng mang, không phải bằng phổi. Cơ thể thuôn giúp bơi nhanh, còn nhiều giác quan giúp chúng tìm con mồi trong đại dương.","remember":"Là cá nên thở bằng mang; không phải động vật có vú.","speech":"Cá mập trắng là một loài cá lớn. Nó thở bằng mang và có cơ thể thuôn để bơi hiệu quả trong nước.","art":"shark","facts":[{"label":"Nhóm","value":"Cá"},{"label":"Hô hấp","value":"Bằng mang"},{"label":"Nơi sống","value":"Biển ven bờ và đại dương"},{"label":"Thức ăn","value":"Cá, hải cẩu và động vật biển khác"},{"label":"Đặc biệt","value":"Nhiều giác quan nhạy"}]},{"id":"octopus","name":"Bạch tuộc","kicker":"SINH VẬT","subtitle":"Thân mềm tám tay","summary":"Bạch tuộc có tám tay linh hoạt với rất nhiều giác hút.","more":"Bạch tuộc có thể đổi màu và hoa văn da để ngụy trang hoặc giao tiếp. Nó rất khéo léo, có khả năng giải quyết nhiều bài toán đơn giản và có ba trái tim.","remember":"Có 8 tay, 3 trái tim và khả năng đổi màu rất đặc biệt.","speech":"Bạch tuộc là động vật thân mềm có tám tay. Nó có thể đổi màu để ngụy trang và có ba trái tim.","art":"octopus","facts":[{"label":"Nhóm","value":"Động vật thân mềm"},{"label":"Số tay","value":"8"},{"label":"Hô hấp","value":"Bằng mang"},{"label":"Đặc biệt","value":"Có thể đổi màu"},{"label":"Số tim","value":"3"},{"label":"Thức ăn","value":"Cua, tôm, cá nhỏ"}]},{"id":"clownfish","name":"Cá hề","kicker":"SINH VẬT","subtitle":"Bạn của hải quỳ","summary":"Cá hề thường sống giữa các xúc tu của hải quỳ ở vùng biển nhiệt đới.","more":"Lớp nhầy trên da giúp cá hề sống gần hải quỳ mà không bị chích như nhiều loài cá khác. Hai bên có thể mang lại lợi ích cho nhau.","remember":"Cá hề nổi tiếng vì sống gần hải quỳ ở rạn san hô.","speech":"Cá hề là loài cá nhỏ thường sống cùng hải quỳ ở rạn san hô nhiệt đới và thở bằng mang.","art":"clownfish","facts":[{"label":"Nhóm","value":"Cá"},{"label":"Hô hấp","value":"Bằng mang"},{"label":"Nơi sống","value":"Rạn san hô nhiệt đới"},{"label":"Bạn đồng hành","value":"Hải quỳ"},{"label":"Thức ăn","value":"Động vật nhỏ và tảo"}]},{"id":"jellyfish","name":"Sứa","kicker":"SINH VẬT","subtitle":"Cơ thể mềm như thạch","summary":"Sứa có cơ thể mềm, phần lớn là nước và thường có các xúc tu.","more":"Sứa không có xương, không có tim và não giống động vật có xương sống. Một mạng thần kinh đơn giản giúp cơ thể phản ứng với môi trường.","remember":"Cơ thể phần lớn là nước, không có xương và có xúc tu.","speech":"Sứa có cơ thể mềm, phần lớn là nước. Nó không có xương và nhiều loài có xúc tu để bắt thức ăn.","art":"jellyfish","facts":[{"label":"Cơ thể","value":"Phần lớn là nước"},{"label":"Xương","value":"Không có"},{"label":"Nơi sống","value":"Từ mặt biển tới biển sâu, tùy loài"},{"label":"Di chuyển","value":"Co bóp cơ thể và trôi theo dòng nước"},{"label":"Thức ăn","value":"Sinh vật phù du, trứng cá, cá nhỏ"}]},{"id":"anglerfish","name":"Cá cần câu","kicker":"SINH VẬT","subtitle":"Thợ săn biển sâu","summary":"Một số cá cần câu biển sâu có phần phát sáng giống chiếc 'cần câu' trước miệng.","more":"Trong nơi tối đen, ánh sáng nhỏ này có thể giúp thu hút con mồi lại gần. Nhiều loài có miệng lớn và răng dài để tận dụng thức ăn hiếm hoi.","remember":"Sống ở biển sâu và dùng ánh sáng sinh học để hỗ trợ săn mồi.","speech":"Cá cần câu biển sâu sống trong vùng rất tối. Một số loài có bộ phận phát sáng trước miệng để thu hút con mồi.","art":"angler","facts":[{"label":"Nơi sống","value":"Biển sâu"},{"label":"Ánh sáng","value":"Tự phát sáng sinh học ở một số loài"},{"label":"Thức ăn","value":"Cá và sinh vật nhỏ"},{"label":"Đặc biệt","value":"Có phần giống cần câu trước miệng"},{"label":"Môi trường","value":"Tối, lạnh, áp suất lớn"}]},{"id":"giant-squid","name":"Mực khổng lồ","kicker":"SINH VẬT","subtitle":"Mực biển sâu bí ẩn","summary":"Mực khổng lồ là một loài mực lớn sống ở vùng biển sâu và rất hiếm khi được nhìn thấy còn sống.","more":"Nó có đôi mắt rất lớn giúp thu nhận ánh sáng yếu, cùng các tay và xúc tu dài để bắt mồi. Cá nhà táng là một trong những kẻ săn mồi của mực khổng lồ.","remember":"Sống ở biển sâu, có mắt rất lớn và xúc tu dài.","speech":"Mực khổng lồ sống ở biển sâu. Nó có đôi mắt rất lớn và những xúc tu dài để tìm và bắt con mồi.","art":"squid","facts":[{"label":"Nơi sống","value":"Biển sâu"},{"label":"Đặc biệt","value":"Đôi mắt rất lớn"},{"label":"Cơ thể","value":"Tay và xúc tu dài"},{"label":"Hô hấp","value":"Bằng mang"},{"label":"Thức ăn","value":"Cá và các loài mực khác"}]}],"quiz":[{"q":"Khoảng bao nhiêu phần trăm bề mặt Trái Đất được đại dương bao phủ?","a":["Khoảng 20%","Khoảng 50%","Khoảng 71%","Khoảng 95%"],"c":2,"note":"Đại dương bao phủ khoảng 71% bề mặt Trái Đất."},{"q":"Nước trong đại dương chủ yếu là loại nước nào?","a":["Nước ngọt","Nước mặn","Nước có đường","Nước tinh khiết"],"c":1,"note":"Đại dương chủ yếu là nước mặn."},{"q":"Càng xuống sâu trong đại dương thì ánh sáng thường thay đổi thế nào?","a":["Mạnh dần","Yếu dần","Không thay đổi","Biến thành màu đỏ"],"c":1,"note":"Ánh sáng giảm dần khi xuống sâu."},{"q":"Càng xuống sâu, áp suất nước thường thế nào?","a":["Giảm dần","Tăng dần","Không đổi","Biến mất"],"c":1,"note":"Áp suất tăng mạnh khi độ sâu tăng."},{"q":"Tầng nào nhận nhiều ánh sáng Mặt Trời nhất?","a":["Tầng ánh sáng","Tầng nửa đêm","Tầng vực thẳm","Rãnh đại dương"],"c":0,"note":"Tầng ánh sáng ở gần mặt biển nhận nhiều ánh sáng nhất."},{"q":"Tầng chạng vạng nằm khoảng ở độ sâu nào?","a":["0–20 m","200–1.000 m","4.000–6.000 m","Trên 10.000 m"],"c":1,"note":"Tầng chạng vạng nằm khoảng 200–1.000 m."},{"q":"Tầng nào không còn ánh sáng Mặt Trời và nằm khoảng 1.000–4.000 m?","a":["Tầng ánh sáng","Tầng chạng vạng","Tầng nửa đêm","Mặt biển"],"c":2,"note":"Tầng nửa đêm nằm khoảng 1.000–4.000 m."},{"q":"Tầng vực thẳm thường nằm ở độ sâu nào?","a":["4.000–6.000 m","0–200 m","200–500 m","Khoảng 50 m"],"c":0,"note":"Tầng vực thẳm nằm khoảng 4.000–6.000 m."},{"q":"Rãnh đại dương thường sâu hơn mốc nào?","a":["200 m","1.000 m","6.000 m","100 m"],"c":2,"note":"Rãnh đại dương thường sâu hơn 6.000 m."},{"q":"Rãnh Mariana là ví dụ của gì?","a":["Một rạn san hô","Một rãnh đại dương rất sâu","Một hòn đảo","Một con sông"],"c":1,"note":"Rãnh Mariana là một rãnh đại dương rất sâu."},{"q":"Cá voi xanh thở bằng gì?","a":["Mang","Phổi","Da","Không cần thở"],"c":1,"note":"Cá voi xanh là động vật có vú nên thở bằng phổi."},{"q":"Thức ăn chính của cá voi xanh là gì?","a":["Krill","Cỏ biển","San hô","Rong biển"],"c":0,"note":"Cá voi xanh ăn chủ yếu là krill rất nhỏ."},{"q":"Cá voi xanh thuộc nhóm nào?","a":["Cá","Bò sát","Động vật có vú","Thân mềm"],"c":2,"note":"Cá voi xanh là động vật có vú."},{"q":"Cá heo thuộc nhóm nào?","a":["Động vật có vú","Cá","Thân mềm","Bò sát"],"c":0,"note":"Cá heo là động vật có vú."},{"q":"Cá heo có thể dùng gì để định hướng?","a":["Mùi hoa","Âm thanh và tiếng vọng","Ánh sáng Mặt Trời","Cánh"],"c":1,"note":"Cá heo có thể dùng âm thanh và tiếng vọng để định hướng."},{"q":"Cá heo thở bằng gì?","a":["Mang","Phổi","Da","Vây"],"c":1,"note":"Cá heo thở không khí bằng phổi."},{"q":"Rùa biển thở bằng gì?","a":["Mang","Phổi","Da","Vỏ"],"c":1,"note":"Rùa biển là bò sát và thở bằng phổi."},{"q":"Rùa biển cái thường đẻ trứng ở đâu?","a":["Trên bãi cát","Giữa tầng nửa đêm","Trong rạn san hô","Trên cây"],"c":0,"note":"Rùa biển cái lên bãi cát để đẻ trứng."},{"q":"Các chi của rùa biển giúp nó làm gì?","a":["Bay","Bơi như mái chèo","Leo cây","Đào mỏ"],"c":1,"note":"Các chi của rùa biển thích nghi để bơi."},{"q":"Cá mập trắng thở bằng gì?","a":["Phổi","Mang","Da","Mũi"],"c":1,"note":"Cá mập trắng là cá nên thở bằng mang."},{"q":"Cá mập trắng thuộc nhóm nào?","a":["Cá","Động vật có vú","Bò sát","Chim"],"c":0,"note":"Cá mập trắng là một loài cá."},{"q":"Thân hình thuôn giúp cá mập làm gì?","a":["Bơi hiệu quả","Bay cao","Sống trên cạn","Quang hợp"],"c":0,"note":"Thân thuôn giúp cá mập bơi hiệu quả trong nước."},{"q":"Bạch tuộc có bao nhiêu tay?","a":["4","6","8","10"],"c":2,"note":"Bạch tuộc có 8 tay."},{"q":"Bạch tuộc có bao nhiêu trái tim?","a":["1","2","3","8"],"c":2,"note":"Bạch tuộc có 3 trái tim."},{"q":"Khả năng nào giúp bạch tuộc ngụy trang?","a":["Đổi màu và hoa văn da","Mọc cánh","Phát tiếng chuông","Đào cát bằng vỏ"],"c":0,"note":"Bạch tuộc có thể thay đổi màu và hoa văn da."},{"q":"Cá hề thường sống gần sinh vật nào?","a":["Hải quỳ","Cá voi","Mực khổng lồ","Rùa biển"],"c":0,"note":"Cá hề nổi tiếng vì sống gần hải quỳ."},{"q":"Cá hề thường sống ở môi trường nào?","a":["Rạn san hô nhiệt đới","Sa mạc","Sông băng","Đỉnh núi"],"c":0,"note":"Cá hề thường sống ở rạn san hô nhiệt đới."},{"q":"Cá hề thở bằng gì?","a":["Phổi","Mang","Da","Lông"],"c":1,"note":"Cá hề là cá nên thở bằng mang."},{"q":"Cơ thể sứa phần lớn là gì?","a":["Đá","Nước","Xương","Gỗ"],"c":1,"note":"Cơ thể sứa phần lớn là nước."},{"q":"Sứa có xương không?","a":["Có rất nhiều","Không có","Chỉ có một xương","Chỉ có xương ở đuôi"],"c":1,"note":"Sứa không có xương."},{"q":"Nhiều loài sứa dùng bộ phận nào để bắt thức ăn?","a":["Xúc tu","Cánh","Chân móng","Mỏ"],"c":0,"note":"Nhiều loài sứa dùng xúc tu để bắt thức ăn."},{"q":"Cá cần câu biển sâu sống ở nơi thế nào?","a":["Rất sáng","Rất tối","Trên cạn","Trong rừng"],"c":1,"note":"Cá cần câu biển sâu sống ở vùng nước tối."},{"q":"Một số cá cần câu dùng gì để thu hút con mồi?","a":["Bộ phận phát sáng","Cánh màu đỏ","Tiếng chuông","Lá cây"],"c":0,"note":"Một số cá cần câu có bộ phận phát sáng trước miệng."},{"q":"Cá cần câu biển sâu phải thích nghi với điều kiện nào?","a":["Tối, lạnh và áp suất lớn","Nóng khô như sa mạc","Không có nước","Không có trọng lực"],"c":0,"note":"Biển sâu tối, lạnh và có áp suất lớn."},{"q":"Mực khổng lồ thường sống ở đâu?","a":["Biển sâu","Sa mạc","Đồng cỏ","Sông nhỏ"],"c":0,"note":"Mực khổng lồ sống ở vùng biển sâu."},{"q":"Đặc điểm nào của mực khổng lồ giúp thu nhận ánh sáng yếu?","a":["Đôi mắt rất lớn","Vỏ cứng","Cánh dài","Sừng"],"c":0,"note":"Mực khổng lồ có đôi mắt rất lớn."},{"q":"Mực khổng lồ thở bằng gì?","a":["Phổi","Mang","Da khô","Lông"],"c":1,"note":"Mực khổng lồ là động vật thân mềm sống dưới nước và thở bằng mang."},{"q":"Tầng nào có điều kiện thuận lợi nhất cho quang hợp?","a":["Tầng ánh sáng","Tầng nửa đêm","Tầng vực thẳm","Rãnh đại dương"],"c":0,"note":"Tầng ánh sáng nhận đủ ánh sáng cho quang hợp."},{"q":"Sinh vật nào trong bài có ba trái tim?","a":["Bạch tuộc","Cá heo","Rùa biển","Cá hề"],"c":0,"note":"Bạch tuộc có ba trái tim."},{"q":"Sinh vật nào là động vật lớn nhất trong bài?","a":["Cá voi xanh","Cá hề","Sứa","Cá cần câu"],"c":0,"note":"Cá voi xanh là động vật lớn nhất được biết tới."}]});
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
      case "zone-sunlight": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#E0F2FE"/><circle cx="17" cy="17" r="9" fill="#FBBF24"/><path d="M0 42 Q18 35 38 42 T80 42 V80 H0Z" fill="#38BDF8"/><path d="M14 58q10-9 20 0t20 0" fill="none" stroke="#fff" stroke-width="3"/></svg>`;
      case "zone-twilight": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#1D4ED8"/><path d="M0 22h80v58H0z" fill="#1E40AF"/><circle cx="22" cy="48" r="3" fill="#67E8F9"/><circle cx="52" cy="59" r="2" fill="#A7F3D0"/><path d="M15 35h50" stroke="#93C5FD" stroke-width="2" opacity=".5"/></svg>`;
      case "zone-midnight": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#172554"/><circle cx="55" cy="37" r="4" fill="#67E8F9"/><path d="M26 44c12-11 26-8 30 0-8 8-22 10-30 0z" fill="#334155"/><circle cx="48" cy="42" r="2" fill="#FDE68A"/></svg>`;
      case "zone-abyss": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#0F172A"/><path d="M0 62 Q20 55 40 62 T80 62 V80 H0Z" fill="#1E293B"/><circle cx="20" cy="44" r="2" fill="#5EEAD4"/><circle cx="58" cy="30" r="2" fill="#C4B5FD"/></svg>`;
      case "zone-trench": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#020617"/><path d="M0 40 L20 34 L31 70 L43 72 L58 35 L80 40 V80 H0Z" fill="#172554"/><circle cx="41" cy="62" r="2" fill="#67E8F9"/></svg>`;
      case "whale": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#E0F2FE"/><path d="M12 43c12-17 42-18 54-4l10-7-3 13 3 10-11-6C50 61 25 59 12 43z" fill="#3B82F6"/><circle cx="55" cy="39" r="2" fill="#172554"/></svg>`;
      case "dolphin": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#E0F2FE"/><path d="M12 45c17-18 35-20 49-8l13-2-9 8c-7 13-30 20-45 11l-8 5 3-11z" fill="#64748B"/><path d="M40 37l8-12 4 13" fill="#64748B"/><circle cx="58" cy="38" r="2" fill="#111827"/></svg>`;
      case "turtle": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#ECFDF5"/><ellipse cx="40" cy="43" rx="20" ry="15" fill="#10B981"/><path d="M24 35l-12-8 4 14m40-6 12-8-4 14M25 51l-11 9 4-14m37 5 11 9-4-14" fill="#34D399"/><circle cx="62" cy="43" r="7" fill="#34D399"/></svg>`;
      case "shark": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#E0F2FE"/><path d="M10 43c16-13 39-16 55-5l11-8-4 13 5 11-13-7c-17 10-39 7-54-4z" fill="#64748B"/><path d="M39 34l8-14 5 16" fill="#64748B"/><circle cx="58" cy="39" r="2" fill="#111827"/></svg>`;
      case "octopus": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#FAE8FF"/><circle cx="40" cy="31" r="18" fill="#C084FC"/><path d="M25 44c-10 15 0 23 7 10m3-9c-6 19 5 24 9 8m3-8c4 18 15 16 11 3m-4-3c15 12 20 1 9-5" fill="none" stroke="#A855F7" stroke-width="6" stroke-linecap="round"/><circle cx="34" cy="29" r="2"/><circle cx="46" cy="29" r="2"/></svg>`;
      case "clownfish": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#FEF3C7"/><path d="M15 42c11-14 35-16 48-2l12-7-4 10 4 10-13-7c-13 12-37 10-47-4z" fill="#F97316"/><path d="M30 31v24m19-25v24" stroke="#fff" stroke-width="7"/><circle cx="57" cy="39" r="2"/></svg>`;
      case "jellyfish": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#FCE7F3"/><path d="M20 39a20 20 0 0140 0z" fill="#F472B6"/><path d="M24 39c0 19 8 22 8 8m8-8c0 24 8 23 8 6m8-6c0 18 8 20 8 5" fill="none" stroke="#DB2777" stroke-width="4" stroke-linecap="round"/></svg>`;
      case "angler": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#172554"/><path d="M15 45c10-16 33-19 48-6l12-5-5 10 4 10-12-6c-15 11-36 9-47-3z" fill="#475569"/><path d="M46 33q6-18 16-11" fill="none" stroke="#94A3B8" stroke-width="2"/><circle cx="63" cy="22" r="4" fill="#FDE68A"/><circle cx="55" cy="39" r="2" fill="#fff"/></svg>`;
      case "squid": return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#E0E7FF"/><path d="M27 18q13-13 26 0l-4 32H31z" fill="#818CF8"/><circle cx="35" cy="30" r="5" fill="#fff"/><circle cx="45" cy="30" r="5" fill="#fff"/><path d="M32 49c-11 18-3 23 2 8m4-8c-5 21 4 24 7 7m2-7c3 18 12 18 8 2" fill="none" stroke="#6366F1" stroke-width="4" stroke-linecap="round"/></svg>`;
      default: return `<svg viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="#EFF6FF"/><circle cx="40" cy="40" r="20" fill="#38BDF8"/></svg>`;
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
    return `<svg viewBox="0 0 700 500" preserveAspectRatio="none" aria-label="Mặt cắt các tầng đại dương"><defs><linearGradient id="og" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DD3FC"/><stop offset=".28" stop-color="#2563EB"/><stop offset=".58" stop-color="#1E3A8A"/><stop offset="1" stop-color="#020617"/></linearGradient></defs><rect width="700" height="500" fill="url(#og)"/><circle cx="80" cy="52" r="28" fill="#FBBF24"/><g fill="#fff" opacity=".45"><circle cx="200" cy="70" r="3"/><circle cx="350" cy="105" r="2"/><circle cx="560" cy="90" r="3"/></g><g stroke="rgba(255,255,255,.4)" stroke-width="2"><line x1="0" y1="130" x2="700" y2="130"/><line x1="0" y1="230" x2="700" y2="230"/><line x1="0" y1="350" x2="700" y2="350"/><line x1="0" y1="430" x2="700" y2="430"/></g><g fill="#fff" font-family="Arial" font-weight="700" font-size="18"><text x="22" y="105">0–200 m · Tầng ánh sáng</text><text x="22" y="205">200–1.000 m · Tầng chạng vạng</text><text x="22" y="325">1.000–4.000 m · Tầng nửa đêm</text><text x="22" y="410">4.000–6.000 m · Tầng vực thẳm</text><text x="22" y="482">Rãnh sâu &gt; 6.000 m</text></g><path d="M0 455 L120 438 L220 465 L330 445 L425 478 L515 437 L700 455 V500 H0Z" fill="#0F172A"/><g fill="#BAE6FD"><path d="M420 85c30-22 74-19 94 4l34-14-13 23 16 20-38-9c-23 21-64 20-93-3z"/><path d="M170 180c21-14 48-12 62 3l24-9-9 17 11 14-26-7c-15 15-41 14-62-3z" opacity=".7"/></g><circle cx="535" cy="288" r="5" fill="#67E8F9"/><circle cx="575" cy="315" r="4" fill="#A7F3D0"/><circle cx="480" cy="390" r="4" fill="#C4B5FD"/></svg><button type="button" data-object="sunlight-zone" style="left:0;top:0;width:100%;height:26%" aria-label="Tầng ánh sáng"></button><button type="button" data-object="twilight-zone" style="left:0;top:26%;width:100%;height:20%" aria-label="Tầng chạng vạng"></button><button type="button" data-object="midnight-zone" style="left:0;top:46%;width:100%;height:24%" aria-label="Tầng nửa đêm"></button><button type="button" data-object="abyss-zone" style="left:0;top:70%;width:100%;height:16%" aria-label="Tầng vực thẳm"></button><button type="button" data-object="trench-zone" style="left:0;top:86%;width:100%;height:14%" aria-label="Rãnh đại dương"></button>`;
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
