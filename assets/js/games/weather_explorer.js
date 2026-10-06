(() => {
  "use strict";

  /* =====================================================================
     Khám phá thời tiết — bản nâng cấp
     Giữ nguyên giao diện module: window.CLASS1_GAME_MODULES.weatherExplorer
     = { render(context), destroy() }, context.host, context.hooks.setSubBanner
     ===================================================================== */

  const CONFIG = Object.freeze({
    moduleKey: "weatherExplorer",
    styleId: "class1-game-weather-explorer-style-v2",
    fontId: "class1-game-explorer-font",
    rootId: "weather-explorer",
    title: "Khám phá thời tiết",
    subtitle: "Cùng Cô Thỏ Hồng quan sát bầu trời và vòng tuần hoàn nước",
    storageKey: "class1.weatherExplorer.found.v1",
    roundSize: 10
  });

  const DATA = Object.freeze({"overview": {"id": "weather-overview", "name": "Thế giới thời tiết", "subtitle": "Bầu trời thay đổi mỗi ngày", "summary": "Thời tiết là trạng thái của không khí ở một nơi trong một khoảng thời gian. Có ngày nắng, ngày nhiều mây, ngày mưa, có gió mạnh hoặc trời lạnh.", "more": "Để mô tả thời tiết, người ta quan sát nhiệt độ, mây, gió và lượng mưa. Thời tiết có thể thay đổi trong ngày nên dự báo giúp chúng ta chuẩn bị quần áo và kế hoạch phù hợp.", "remember": "Bé nhớ: thời tiết không phải lúc nào cũng giống nhau. Khi có dông, bão hoặc mưa lớn, hãy làm theo hướng dẫn an toàn của người lớn.", "facts": [{"label": "Nhiệt độ", "value": "Cho biết không khí nóng hay lạnh"}, {"label": "Mây", "value": "Gồm rất nhiều giọt nước nhỏ hoặc tinh thể băng"}, {"label": "Gió", "value": "Là không khí chuyển động"}, {"label": "Mưa", "value": "Nước từ mây rơi xuống"}, {"label": "Dự báo", "value": "Giúp chuẩn bị trước"}, {"label": "An toàn", "value": "Luôn nghe người lớn khi thời tiết nguy hiểm"}]}, "primary": [{"id": "sunny", "name": "Trời nắng", "subtitle": "Nhiều ánh sáng Mặt Trời", "summary": "Khi trời nắng, Mặt Trời không bị mây dày che kín nên chúng ta nhận được nhiều ánh sáng.", "more": "Nắng làm bề mặt Trái Đất ấm lên và có thể làm nước bốc hơi nhanh hơn. Bóng của đồ vật thường rõ hơn khi ánh sáng mạnh.", "remember": "Ra ngoài trời nắng lâu nên đội mũ, uống đủ nước và tránh nắng gắt theo hướng dẫn của người lớn.", "facts": [{"label": "Dấu hiệu", "value": "Bầu trời sáng, nhiều ánh nắng"}, {"label": "Tác động", "value": "Làm bề mặt ấm lên"}, {"label": "Liên quan nước", "value": "Làm tăng bốc hơi"}, {"label": "Bảo vệ", "value": "Mũ, nước uống, nghỉ nơi râm"}]}, {"id": "cloud", "name": "Mây", "subtitle": "Những đám trắng hoặc xám trên trời", "summary": "Mây hình thành khi hơi nước trong không khí lạnh đi và ngưng tụ thành vô số giọt nước rất nhỏ hoặc tinh thể băng.", "more": "Có nhiều dạng mây khác nhau. Một số mây mỏng báo trời khá ổn định, còn những đám mây dông phát triển cao có thể đi kèm mưa lớn, sấm chớp.", "remember": "Mây không phải là bông; đó là rất nhiều giọt nước hoặc tinh thể băng nhỏ li ti.", "facts": [{"label": "Tạo bởi", "value": "Giọt nước nhỏ hoặc tinh thể băng"}, {"label": "Hình thành", "value": "Khi hơi nước ngưng tụ"}, {"label": "Màu", "value": "Có thể trắng, xám hoặc rất tối"}, {"label": "Có thể mang", "value": "Mưa hoặc tuyết"}]}, {"id": "rain", "name": "Mưa", "subtitle": "Nước từ mây rơi xuống", "summary": "Mưa xảy ra khi các giọt nước trong mây lớn dần và trở nên đủ nặng để rơi xuống mặt đất.", "more": "Mưa cung cấp nước cho sông hồ, đất và cây cối. Mưa quá lớn trong thời gian dài có thể gây ngập nên cần theo dõi cảnh báo của người lớn.", "remember": "Mưa là một phần quan trọng của vòng tuần hoàn nước.", "facts": [{"label": "Nguồn", "value": "Giọt nước trong mây"}, {"label": "Rơi khi", "value": "Giọt đủ lớn và nặng"}, {"label": "Lợi ích", "value": "Bổ sung nước cho đất và sinh vật"}, {"label": "Mưa lớn", "value": "Có thể gây ngập"}]}, {"id": "wind", "name": "Gió", "subtitle": "Không khí đang chuyển động", "summary": "Gió là chuyển động của không khí từ nơi có áp suất cao hơn tới nơi có áp suất thấp hơn.", "more": "Gió nhẹ giúp làm mát và làm cánh diều bay. Gió rất mạnh có thể làm gãy cành cây hoặc gây nguy hiểm, nhất là trong bão.", "remember": "Ta không nhìn thấy không khí nhưng có thể nhận ra gió qua lá cây, cờ hoặc tóc đang chuyển động.", "facts": [{"label": "Bản chất", "value": "Không khí chuyển động"}, {"label": "Nhận biết", "value": "Lá, cờ, tóc chuyển động"}, {"label": "Gió nhẹ", "value": "Có thể làm mát"}, {"label": "Gió mạnh", "value": "Có thể nguy hiểm"}]}, {"id": "thunderstorm", "name": "Dông sấm chớp", "subtitle": "Mưa, sét và tiếng sấm", "summary": "Dông là cơn thời tiết có mây dông, thường kèm mưa, gió mạnh, sét và tiếng sấm.", "more": "Sét là một phóng điện rất mạnh trong khí quyển. Không khí quanh đường sét nóng lên rất nhanh, giãn nở và tạo ra tiếng sấm.", "remember": "Khi có sấm chớp, bé nên ở trong nhà hoặc nơi trú an toàn, tránh cây cao đơn độc và mặt nước.", "facts": [{"label": "Có thể có", "value": "Mưa, gió, sét, sấm"}, {"label": "Sét", "value": "Phóng điện rất mạnh"}, {"label": "Sấm", "value": "Âm thanh do không khí giãn nở nhanh"}, {"label": "An toàn", "value": "Trú trong nhà hoặc nơi an toàn"}]}, {"id": "rainbow", "name": "Cầu vồng", "subtitle": "Dải màu xuất hiện khi có nắng và giọt nước", "summary": "Cầu vồng có thể xuất hiện khi ánh sáng Mặt Trời đi qua các giọt nước trong không khí và bị bẻ cong, phản xạ rồi tách thành nhiều màu.", "more": "Ta thường dễ thấy cầu vồng khi phía trước có mưa hoặc sương nước và Mặt Trời ở phía sau người quan sát.", "remember": "Cầu vồng là ánh sáng, không phải một vật thể có thể chạm tới.", "facts": [{"label": "Cần", "value": "Ánh sáng và giọt nước"}, {"label": "Hiện tượng ánh sáng", "value": "Bẻ cong, phản xạ và tách màu"}, {"label": "Màu sắc", "value": "Nhiều màu nối tiếp"}, {"label": "Không phải", "value": "Một vật thể cứng"}]}, {"id": "fog", "name": "Sương mù", "subtitle": "Mây ở rất gần mặt đất", "summary": "Sương mù là tập hợp các giọt nước rất nhỏ lơ lửng sát mặt đất, giống như một đám mây thấp.", "more": "Sương mù làm tầm nhìn giảm nên người lái xe phải đi chậm và cẩn thận hơn.", "remember": "Sương mù có thể làm ta nhìn mọi vật xa trở nên mờ.", "facts": [{"label": "Vị trí", "value": "Sát mặt đất"}, {"label": "Thành phần", "value": "Giọt nước nhỏ"}, {"label": "Ảnh hưởng", "value": "Giảm tầm nhìn"}, {"label": "Khi di chuyển", "value": "Cần chậm và cẩn thận"}]}, {"id": "snow", "name": "Tuyết", "subtitle": "Tinh thể băng rơi từ mây", "summary": "Tuyết hình thành trong những đám mây đủ lạnh, nơi hơi nước biến thành các tinh thể băng.", "more": "Các tinh thể băng kết hợp thành bông tuyết và rơi xuống khi đủ nặng. Nhiều vùng nhiệt đới hầu như không có tuyết ở nơi thấp.", "remember": "Tuyết là nước ở thể rắn dưới dạng tinh thể băng.", "facts": [{"label": "Trạng thái", "value": "Nước ở thể rắn"}, {"label": "Tạo bởi", "value": "Tinh thể băng"}, {"label": "Cần", "value": "Không khí đủ lạnh"}, {"label": "Khác mưa", "value": "Rơi xuống ở dạng băng"}]}, {"id": "storm", "name": "Bão nhiệt đới", "subtitle": "Hệ thống gió xoáy rất mạnh", "summary": "Bão nhiệt đới hình thành trên vùng biển ấm và có thể tạo gió rất mạnh, mưa lớn cùng sóng cao.", "more": "Dự báo và cảnh báo bão giúp người dân chuẩn bị. Khi có bão, trẻ em phải ở cùng người lớn và làm theo hướng dẫn của cơ quan chức năng.", "remember": "Không ra ngoài xem bão. An toàn luôn quan trọng hơn việc quan sát thời tiết.", "facts": [{"label": "Hình thành", "value": "Trên vùng biển ấm"}, {"label": "Có thể gây", "value": "Gió mạnh và mưa lớn"}, {"label": "Theo dõi", "value": "Dự báo và cảnh báo"}, {"label": "An toàn", "value": "Làm theo hướng dẫn người lớn"}]}], "secondary": [{"id": "evaporation", "name": "Bốc hơi", "subtitle": "Nước lỏng trở thành hơi nước", "summary": "Năng lượng từ Mặt Trời làm một phần nước ở biển, hồ, sông và mặt đất bốc hơi vào không khí.", "more": "Bốc hơi có thể diễn ra ở nhiều nhiệt độ, không cần nước phải sôi.", "remember": "Mặt Trời là nguồn năng lượng rất quan trọng giúp vòng tuần hoàn nước hoạt động.", "facts": [{"label": "Từ", "value": "Nước lỏng"}, {"label": "Thành", "value": "Hơi nước"}, {"label": "Nguồn năng lượng", "value": "Chủ yếu từ Mặt Trời"}, {"label": "Không cần", "value": "Nước phải sôi"}]}, {"id": "transpiration", "name": "Thoát hơi nước ở cây", "subtitle": "Cây trả hơi nước về không khí", "summary": "Cây hút nước từ đất qua rễ. Một phần nước đi lên lá và thoát ra không khí dưới dạng hơi nước.", "more": "Quá trình này gọi là thoát hơi nước và cùng với bốc hơi góp phần đưa nước vào khí quyển.", "remember": "Thực vật cũng tham gia vào vòng tuần hoàn nước.", "facts": [{"label": "Nước vào cây", "value": "Qua rễ"}, {"label": "Nước thoát", "value": "Chủ yếu qua lá"}, {"label": "Dạng thoát", "value": "Hơi nước"}, {"label": "Vai trò", "value": "Bổ sung hơi nước vào không khí"}]}, {"id": "condensation", "name": "Ngưng tụ", "subtitle": "Hơi nước trở lại thành giọt nhỏ", "summary": "Khi không khí chứa hơi nước lạnh đi đủ, hơi nước ngưng tụ thành các giọt nước nhỏ hoặc tinh thể băng.", "more": "Ngưng tụ là bước quan trọng để hình thành mây và sương.", "remember": "Bốc hơi và ngưng tụ là hai quá trình ngược chiều nhau.", "facts": [{"label": "Từ", "value": "Hơi nước"}, {"label": "Thành", "value": "Giọt nước hoặc tinh thể băng"}, {"label": "Xảy ra khi", "value": "Không khí lạnh đi"}, {"label": "Giúp tạo", "value": "Mây và sương"}]}, {"id": "precipitation", "name": "Giáng thủy", "subtitle": "Nước từ khí quyển trở về mặt đất", "summary": "Khi các giọt nước hoặc tinh thể băng trong mây đủ lớn, chúng rơi xuống dưới dạng mưa, tuyết hoặc các dạng giáng thủy khác.", "more": "Đây là cách nước trong khí quyển quay trở lại mặt đất.", "remember": "Mưa và tuyết đều là các dạng giáng thủy.", "facts": [{"label": "Từ", "value": "Mây"}, {"label": "Về", "value": "Mặt đất"}, {"label": "Dạng phổ biến", "value": "Mưa"}, {"label": "Dạng lạnh", "value": "Tuyết"}]}, {"id": "runoff", "name": "Dòng chảy mặt", "subtitle": "Nước chảy trên bề mặt đất", "summary": "Sau mưa, phần nước không thấm xuống đất có thể chảy theo sườn dốc vào suối, sông, hồ rồi ra biển.", "more": "Dòng chảy mang nước từ vùng cao xuống vùng thấp.", "remember": "Không phải mọi giọt mưa đều chảy trên mặt đất; một phần có thể thấm xuống đất.", "facts": [{"label": "Sau", "value": "Mưa hoặc tuyết tan"}, {"label": "Hướng", "value": "Từ cao xuống thấp"}, {"label": "Chảy tới", "value": "Suối, sông, hồ, biển"}, {"label": "Một phần khác", "value": "Thấm xuống đất"}]}, {"id": "collection", "name": "Tích tụ và lặp lại", "subtitle": "Nước tập trung rồi lại bốc hơi", "summary": "Nước tập trung trong biển, hồ, sông, đất và băng. Từ đó, nước tiếp tục bốc hơi hoặc được cây hút lên.", "more": "Vì nước liên tục di chuyển giữa mặt đất, đại dương và khí quyển nên quá trình được gọi là vòng tuần hoàn.", "remember": "Vòng tuần hoàn nước không có một điểm bắt đầu duy nhất; các bước nối tiếp và lặp lại.", "facts": [{"label": "Nơi tích tụ", "value": "Biển, hồ, sông, đất, băng"}, {"label": "Sau đó", "value": "Có thể bốc hơi"}, {"label": "Tính chất", "value": "Lặp đi lặp lại"}, {"label": "Tên gọi", "value": "Vòng tuần hoàn nước"}]}], "quiz": [{"q": "Thời tiết mô tả điều gì?", "a": ["Trạng thái không khí ở một nơi trong một khoảng thời gian", "Tên của một hành tinh", "Màu của đất", "Tuổi của cây"], "c": 0, "note": "Thời tiết là trạng thái của không khí tại một nơi và thời điểm."}, {"q": "Yếu tố nào cho biết không khí nóng hay lạnh?", "a": ["Nhiệt độ", "Chiều cao ngôi nhà", "Màu quần áo", "Số cây"], "c": 0, "note": "Nhiệt độ cho biết mức nóng hoặc lạnh."}, {"q": "Gió là gì?", "a": ["Không khí chuyển động", "Nước đang chảy", "Ánh sáng", "Đất rung"], "c": 0, "note": "Gió là không khí chuyển động."}, {"q": "Mây gồm chủ yếu những gì?", "a": ["Giọt nước rất nhỏ hoặc tinh thể băng", "Bông vải", "Khói xe", "Cát"], "c": 0, "note": "Mây gồm vô số giọt nước nhỏ hoặc tinh thể băng."}, {"q": "Dự báo thời tiết giúp ích gì?", "a": ["Giúp chuẩn bị trước", "Làm mưa dừng lại", "Làm Mặt Trời sáng hơn", "Đổi hướng gió"], "c": 0, "note": "Dự báo giúp chúng ta chuẩn bị quần áo và kế hoạch."}, {"q": "Khi thời tiết nguy hiểm, bé nên làm gì?", "a": ["Nghe hướng dẫn của người lớn", "Tự chạy ra ngoài xem", "Leo lên mái nhà", "Đứng dưới cây cao"], "c": 0, "note": "An toàn nhất là làm theo hướng dẫn của người lớn."}, {"q": "Khi trời nắng, điều gì thường rõ hơn?", "a": ["Bóng của đồ vật", "Sương mù", "Tuyết rơi", "Sấm"], "c": 0, "note": "Ánh sáng mạnh tạo bóng rõ."}, {"q": "Nắng có thể làm nước làm gì nhanh hơn?", "a": ["Bốc hơi", "Đóng băng", "Biến thành đá", "Tạo sấm"], "c": 0, "note": "Năng lượng Mặt Trời làm nước bốc hơi nhanh hơn."}, {"q": "Mây hình thành khi hơi nước làm gì?", "a": ["Ngưng tụ", "Biến thành cát", "Phát sáng", "Chảy thành dầu"], "c": 0, "note": "Hơi nước lạnh đi và ngưng tụ thành giọt nhỏ."}, {"q": "Mây dông có thể đi kèm hiện tượng nào?", "a": ["Mưa lớn và sấm chớp", "Chỉ nắng nhẹ", "Không có gió bao giờ", "Cát bay từ biển"], "c": 0, "note": "Mây dông thường đi kèm mưa, gió, sét và sấm."}, {"q": "Mưa xảy ra khi giọt nước trong mây thế nào?", "a": ["Lớn dần và đủ nặng để rơi", "Biến thành ánh sáng", "Nhỏ mãi không đổi", "Bay lên Mặt Trời"], "c": 0, "note": "Giọt nước lớn dần và rơi khi đủ nặng."}, {"q": "Mưa có lợi ích nào?", "a": ["Bổ sung nước cho đất và sinh vật", "Làm mất mọi con sông", "Làm cây không cần rễ", "Làm gió biến mất"], "c": 0, "note": "Mưa cung cấp nước cho đất, sông hồ và sinh vật."}, {"q": "Ta có thể nhận ra gió qua điều gì?", "a": ["Lá cây và cờ chuyển động", "Màu của đá", "Số cửa sổ", "Bóng tối"], "c": 0, "note": "Gió làm lá, cờ và tóc chuyển động."}, {"q": "Gió rất mạnh có thể gây gì?", "a": ["Gãy cành cây và nguy hiểm", "Làm mọi vật đứng yên", "Làm mây biến thành đá", "Làm nước không chảy"], "c": 0, "note": "Gió mạnh có thể gây hư hại và nguy hiểm."}, {"q": "Sét là gì?", "a": ["Một phóng điện rất mạnh trong khí quyển", "Một loại mây trắng", "Một dòng sông", "Một ngôi sao"], "c": 0, "note": "Sét là hiện tượng phóng điện mạnh."}, {"q": "Tiếng sấm được tạo ra chủ yếu vì điều gì?", "a": ["Không khí quanh đường sét nóng lên và giãn nở rất nhanh", "Mây va vào núi", "Mưa rơi xuống lá", "Gió thổi qua cửa"], "c": 0, "note": "Không khí bị nung nóng cực nhanh quanh sét tạo sóng âm là tiếng sấm."}, {"q": "Khi có dông sấm chớp, nơi nào an toàn hơn?", "a": ["Trong nhà hoặc nơi trú an toàn", "Dưới cây cao đơn độc", "Giữa cánh đồng trống", "Dưới nước"], "c": 0, "note": "Nên trú trong nhà hoặc nơi an toàn."}, {"q": "Cầu vồng cần hai điều gì để dễ hình thành?", "a": ["Ánh sáng Mặt Trời và giọt nước", "Cát và gió", "Tuyết và đá", "Đất và lá"], "c": 0, "note": "Ánh sáng tương tác với giọt nước tạo cầu vồng."}, {"q": "Cầu vồng là gì?", "a": ["Một hiện tượng ánh sáng", "Một cây cầu thật", "Một loại mây cứng", "Một vật thể có thể cầm"], "c": 0, "note": "Cầu vồng là hiện tượng ánh sáng."}, {"q": "Sương mù giống điều gì?", "a": ["Một đám mây sát mặt đất", "Một cơn bão trên biển", "Một đám cháy", "Một lớp cát"], "c": 0, "note": "Sương mù là các giọt nước nhỏ lơ lửng sát mặt đất."}, {"q": "Sương mù ảnh hưởng thế nào đến việc nhìn xa?", "a": ["Làm giảm tầm nhìn", "Làm nhìn xa hơn", "Không ảnh hưởng bao giờ", "Làm mọi vật sáng hơn"], "c": 0, "note": "Sương mù làm tầm nhìn giảm."}, {"q": "Tuyết gồm chủ yếu những gì?", "a": ["Tinh thể băng", "Giọt dầu", "Hạt cát", "Lá khô"], "c": 0, "note": "Tuyết là nước ở dạng tinh thể băng."}, {"q": "Tuyết thường hình thành khi nào?", "a": ["Không khí trong mây đủ lạnh", "Trời rất nóng", "Không có mây", "Chỉ khi có gió nhẹ"], "c": 0, "note": "Tuyết cần điều kiện đủ lạnh."}, {"q": "Bão nhiệt đới thường hình thành ở đâu?", "a": ["Trên vùng biển ấm", "Trong sa mạc khô", "Trên mặt trăng", "Trong hang"], "c": 0, "note": "Bão nhiệt đới thường hình thành trên biển ấm."}, {"q": "Bão có thể gây hiện tượng nào?", "a": ["Gió mạnh và mưa lớn", "Chỉ sương nhẹ", "Chỉ nắng", "Không có mây"], "c": 0, "note": "Bão có thể gây gió mạnh, mưa lớn và sóng cao."}, {"q": "Khi có bão, bé nên làm gì?", "a": ["Ở cùng người lớn và làm theo hướng dẫn an toàn", "Ra ngoài xem gió", "Đứng gần cửa kính", "Đi ra biển"], "c": 0, "note": "An toàn là ưu tiên hàng đầu khi có bão."}, {"q": "Bốc hơi là quá trình nước lỏng biến thành gì?", "a": ["Hơi nước", "Đá", "Đất", "Mây ngay lập tức"], "c": 0, "note": "Bốc hơi biến nước lỏng thành hơi nước."}, {"q": "Nguồn năng lượng quan trọng cho bốc hơi trong vòng tuần hoàn nước là gì?", "a": ["Mặt Trời", "Mặt Trăng", "Đèn pin", "Âm thanh"], "c": 0, "note": "Năng lượng Mặt Trời giúp nước bốc hơi."}, {"q": "Nước có cần sôi mới bốc hơi không?", "a": ["Không", "Có, luôn luôn", "Chỉ khi đóng băng", "Chỉ ban đêm"], "c": 0, "note": "Bốc hơi có thể xảy ra ở nhiều nhiệt độ."}, {"q": "Thoát hơi nước ở cây xảy ra chủ yếu qua bộ phận nào?", "a": ["Lá", "Rễ già", "Quả chín", "Hạt khô"], "c": 0, "note": "Một phần nước thoát ra không khí qua lá."}, {"q": "Ngưng tụ biến hơi nước thành gì?", "a": ["Giọt nước nhỏ hoặc tinh thể băng", "Ánh sáng", "Gió", "Cát"], "c": 0, "note": "Hơi nước lạnh đi và ngưng tụ."}, {"q": "Ngưng tụ giúp hình thành gì?", "a": ["Mây và sương", "Đá núi", "Sóng biển", "Đất"], "c": 0, "note": "Ngưng tụ là bước quan trọng tạo mây và sương."}, {"q": "Giáng thủy là gì?", "a": ["Nước từ khí quyển rơi về mặt đất", "Nước bay lên trời", "Gió đổi hướng", "Mặt Trời lặn"], "c": 0, "note": "Mưa và tuyết là các dạng giáng thủy."}, {"q": "Mưa và tuyết đều thuộc nhóm nào?", "a": ["Giáng thủy", "Bốc hơi", "Gió", "Ánh sáng"], "c": 0, "note": "Mưa và tuyết đều là giáng thủy."}, {"q": "Dòng chảy mặt thường đi theo hướng nào?", "a": ["Từ nơi cao xuống nơi thấp", "Từ thấp lên cao", "Chỉ đi ngang", "Bay lên trời"], "c": 0, "note": "Nước chảy theo địa hình từ cao xuống thấp."}, {"q": "Sau mưa, một phần nước có thể làm gì ngoài chảy trên mặt đất?", "a": ["Thấm xuống đất", "Biến thành lửa", "Biến mất hoàn toàn", "Bay ra vũ trụ"], "c": 0, "note": "Một phần nước thấm vào đất."}, {"q": "Nước có thể tích tụ ở đâu?", "a": ["Biển, hồ, sông, đất và băng", "Chỉ trong mây", "Chỉ trong chai", "Chỉ trong cây"], "c": 0, "note": "Nước được lưu trữ ở nhiều nơi."}, {"q": "Vì sao gọi là vòng tuần hoàn nước?", "a": ["Vì nước liên tục di chuyển và các quá trình lặp lại", "Vì nước chỉ đi một lần", "Vì nước luôn đứng yên", "Vì chỉ có mưa"], "c": 0, "note": "Nước liên tục chuyển giữa mặt đất, đại dương và khí quyển."}, {"q": "Thực vật có tham gia vòng tuần hoàn nước không?", "a": ["Có", "Không bao giờ", "Chỉ cây giả", "Chỉ cây dưới biển"], "c": 0, "note": "Cây hút nước và thoát hơi nước vào khí quyển."}, {"q": "Bước nào đưa nước từ mặt đất trở lại không khí ở dạng hơi?", "a": ["Bốc hơi", "Giáng thủy", "Dòng chảy mặt", "Tích tụ"], "c": 0, "note": "Bốc hơi đưa nước lỏng thành hơi nước."}]});

  /* ---------- Biểu tượng thời tiết (khung 120 x 100) ---------- */
  const cloudPath = (x, y, s, fill, stroke = "none") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 14 Q-44 -6 -24 -8 Q-20 -28 0 -26 Q16 -40 30 -22 Q48 -22 46 -2 Q56 4 48 14Z" fill="${fill}" stroke="${stroke}" stroke-width="${stroke === "none" ? 0 : 3 / s}"/></g>`;
  const sunShape = (x, y, r) => `<g transform="translate(${x} ${y})">${Array.from({ length: 12 }, (_, k) => `<path d="M0 ${-r - 6} V${-r - 16}" stroke="#F59E0B" stroke-width="${r / 6}" stroke-linecap="round" transform="rotate(${k * 30})"/>`).join("")}<circle r="${r}" fill="#FBBF24"/><circle r="${r * 0.72}" fill="#FDE047"/></g>`;
  const ICON = {
    sunny: () => sunShape(60, 50, 24),
    cloud: () => `${sunShape(38, 38, 14)}${cloudPath(66, 60, 1.05, "#F8FAFC", "#94A3B8")}`,
    rain: () => `${cloudPath(60, 40, 1, "#94A3B8", "#475569")}${[34, 48, 62, 76, 90].map((x, k) => `<path d="M${x} ${62 + (k % 2) * 6} l-5 14" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>`).join("")}`,
    wind: () => `<path d="M10 36 H70 Q86 36 86 24 Q86 14 76 14 Q68 14 68 22 M10 54 H96 Q110 54 110 66 Q110 78 98 78 Q90 78 90 70 M18 72 H60" stroke="#38BDF8" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M84 40 q8 -8 16 0 q-8 6 -16 0Z" fill="#22C55E"/>`,
    thunderstorm: () => `${cloudPath(60, 36, 1.05, "#475569", "#1E293B")}<path d="M62 54 L48 76 H60 L52 98 L76 68 H64 L72 54Z" fill="#FACC15" stroke="#A16207" stroke-width="2" stroke-linejoin="round"/><path d="M30 60 l-5 12 M90 60 l-5 12" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>`,
    rainbow: () => `${["#EF4444", "#F97316", "#FACC15", "#22C55E", "#3B82F6", "#6366F1", "#A855F7"].map((c, k) => `<path d="M${10 + k * 5} 86 A${50 - k * 5} ${50 - k * 5} 0 0 1 ${110 - k * 5} 86" stroke="${c}" stroke-width="5" fill="none"/>`).join("")}${cloudPath(22, 82, 0.5, "#fff", "#CBD5E1")}${cloudPath(98, 82, 0.5, "#fff", "#CBD5E1")}`,
    fog: () => `${cloudPath(60, 34, 0.9, "#E2E8F0", "#94A3B8")}${[56, 68, 80, 92].map((y, k) => `<path d="M${12 + (k % 2) * 10} ${y} H${108 - (k % 2) * 8}" stroke="#94A3B8" stroke-width="6" stroke-linecap="round" opacity="${0.9 - k * 0.15}"/>`).join("")}`,
    snow: () => `${cloudPath(60, 36, 1, "#E0F2FE", "#7DD3FC")}${[[36, 70], [60, 84], [84, 70]].map(([x, y]) => `<g transform="translate(${x} ${y})" stroke="#38BDF8" stroke-width="3" stroke-linecap="round">${[0, 60, 120].map((a) => `<path d="M0 -9 V9" transform="rotate(${a})"/>`).join("")}</g>`).join("")}`,
    storm: () => `<g transform="translate(60 50)">${[0, 120, 240].map((a) => `<path d="M0 0 Q30 -6 40 -30" stroke="#64748B" stroke-width="12" fill="none" stroke-linecap="round" transform="rotate(${a})"/>`).join("")}<circle r="10" fill="#E0F2FE" stroke="#475569" stroke-width="3"/></g>`,
    evaporation: () => `<path d="M0 78 Q30 70 60 78 T120 78 V100 H0Z" fill="#38BDF8"/>${sunShape(98, 22, 12)}${[30, 54, 78].map((x) => `<path d="M${x} 70 q-6 -8 0 -16 q6 -8 0 -16 q-6 -8 0 -16" stroke="#7DD3FC" stroke-width="4" fill="none" stroke-linecap="round"/>`).join("")}`,
    transpiration: () => `<rect x="54" y="62" width="12" height="34" fill="#92400E"/><circle cx="60" cy="50" r="26" fill="#22C55E"/><circle cx="44" cy="58" r="14" fill="#16A34A"/><circle cx="76" cy="58" r="14" fill="#16A34A"/>${[40, 60, 80].map((x) => `<path d="M${x} 26 q-5 -6 0 -12 q5 -6 0 -12" stroke="#7DD3FC" stroke-width="3.5" fill="none" stroke-linecap="round"/>`).join("")}`,
    condensation: () => `${[30, 60, 90].map((x) => `<path d="M${x} 96 q-5 -6 0 -12 q5 -6 0 -12" stroke="#7DD3FC" stroke-width="3.5" fill="none" stroke-linecap="round"/>`).join("")}${cloudPath(60, 40, 1.05, "#F8FAFC", "#94A3B8")}<circle cx="44" cy="40" r="3" fill="#60A5FA"/><circle cx="60" cy="34" r="3" fill="#60A5FA"/><circle cx="74" cy="42" r="3" fill="#60A5FA"/>`,
    precipitation: () => `${cloudPath(60, 32, 1, "#94A3B8", "#475569")}${[38, 56, 74, 92].map((x) => `<path d="M${x} 56 l-4 12" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>`).join("")}<g transform="translate(48 86)" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round">${[0, 60, 120].map((a) => `<path d="M0 -6 V6" transform="rotate(${a})"/>`).join("")}</g><g transform="translate(76 86)" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round">${[0, 60, 120].map((a) => `<path d="M0 -6 V6" transform="rotate(${a})"/>`).join("")}</g>`,
    runoff: () => `<path d="M0 30 L40 10 L80 40 L120 30 V100 H0Z" fill="#86EFAC"/><path d="M40 14 Q50 40 36 56 Q22 72 50 84 Q80 96 120 92" stroke="#38BDF8" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M42 30 l4 8 M40 62 l6 4 M80 92 l8 0" stroke="#1D4ED8" stroke-width="3" stroke-linecap="round"/>`,
    collection: () => `<path d="M0 54 Q30 46 60 54 T120 54 V100 H0Z" fill="#38BDF8"/><path d="M0 70 Q30 62 60 70 T120 70" stroke="#BAE6FD" stroke-width="3" fill="none"/><path d="M80 54 L96 20 L112 54Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2"/><path d="M60 50 q0 -14 0 -26" stroke="#7DD3FC" stroke-width="3" stroke-dasharray="3 4"/><path d="M54 30 L60 20 L66 30" stroke="#7DD3FC" stroke-width="3" fill="none"/>`
  };
  const ICON_BG = {
    sunny: "#FEF9C3", cloud: "#E0F2FE", rain: "#DBEAFE", wind: "#ECFEFF", thunderstorm: "#E2E8F0", rainbow: "#FDF4FF", fog: "#F1F5F9", snow: "#F0F9FF", storm: "#E2E8F0",
    evaporation: "#E0F2FE", transpiration: "#DCFCE7", condensation: "#F0F9FF", precipitation: "#DBEAFE", runoff: "#ECFDF5", collection: "#E0F2FE"
  };
  function iconSvg(id) {
    const draw = ICON[id];
    if (!draw) return "";
    return `<svg class="gx-w-svg" viewBox="0 0 120 100" aria-hidden="true" focusable="false">${draw()}</svg>`;
  }

  /* ---------- Cửa sổ thời tiết: một khung cảnh đổi theo hiện tượng được chọn ---------- */
  const SKY_COLORS = {
    sunny: ["#38BDF8", "#BAE6FD"], cloud: ["#7DD3FC", "#E0F2FE"], rain: ["#64748B", "#CBD5E1"], wind: ["#38BDF8", "#E0F2FE"],
    thunderstorm: ["#1E293B", "#475569"], rainbow: ["#60A5FA", "#E0F2FE"], fog: ["#CBD5E1", "#F1F5F9"], snow: ["#BAE6FD", "#F8FAFC"], storm: ["#0F172A", "#334155"]
  };
  function weatherSceneSvg(w) {
    const [top, bottom] = SKY_COLORS[w] || ["#7DD3FC", "#E0F2FE"];
    const dark = ["rain", "thunderstorm", "storm"].includes(w);
    const snowy = w === "snow";
    const lean = w === "wind" ? -14 : w === "storm" ? -24 : 0;
    const grass = snowy ? "#F8FAFC" : dark ? "#4D7C0F" : "#86EFAC";
    const hill = snowy ? "#E2E8F0" : dark ? "#3F6212" : "#4ADE80";
    let sky = "";
    if (w === "sunny") sky = sunShape(470, 90, 46);
    if (w === "cloud") sky = sunShape(450, 80, 34) + cloudPath(420, 110, 1.9, "#F8FAFC", "#CBD5E1") + cloudPath(170, 90, 1.5, "#fff", "#CBD5E1") + cloudPath(300, 60, 1.1, "#F1F5F9", "#CBD5E1");
    if (w === "rain") sky = cloudPath(160, 80, 2, "#94A3B8", "#64748B") + cloudPath(420, 70, 2.3, "#94A3B8", "#64748B");
    if (w === "wind") sky = sunShape(500, 70, 30) + cloudPath(180, 70, 1.2, "#fff") + `<g class="gx-anim-wind">${[120, 170, 220].map((y, k) => `<path d="M${60 + k * 40} ${y} H${300 + k * 30} q30 0 30 -18 q0 -14 -14 -14" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>`).join("")}</g>`;
    if (w === "thunderstorm") sky = cloudPath(200, 80, 2.4, "#475569", "#1E293B") + cloudPath(430, 90, 2.1, "#334155", "#0F172A") + `<path class="gx-anim-bolt" d="M330 120 L290 200 H320 L296 280 L370 180 H336 L360 120Z" fill="#FDE047" stroke="#CA8A04" stroke-width="3" stroke-linejoin="round"/>`;
    /* Cầu vồng: Mặt Trời ở sau lưng người xem nên không vẽ Mặt Trời trong khung */
    if (w === "rainbow") sky = ["#EF4444", "#F97316", "#FACC15", "#22C55E", "#3B82F6", "#6366F1", "#A855F7"].map((c, k) => `<path d="M${200 + k * 9} 300 A${170 - k * 9} ${170 - k * 9} 0 0 1 ${540 - k * 9} 300" stroke="${c}" stroke-width="9" fill="none" opacity=".9"/>`).join("") + cloudPath(500, 70, 1.4, "#CBD5E1", "#94A3B8");
    if (w === "fog") sky = `<circle cx="470" cy="90" r="36" fill="#F8FAFC" opacity=".8"/>`;
    if (w === "snow") sky = cloudPath(200, 70, 1.8, "#F1F5F9", "#CBD5E1") + cloudPath(440, 80, 2, "#E2E8F0", "#CBD5E1");
    if (w === "storm") sky = `<g transform="translate(300 90)">${[0, 72, 144, 216, 288].map((a) => `<path d="M0 0 Q80 -10 120 -70" stroke="#64748B" stroke-width="34" fill="none" stroke-linecap="round" opacity=".9" transform="rotate(${a})"/>`).join("")}<circle r="20" fill="#1E293B"/></g>`;
    const drops = (n, color, len) => `<g class="gx-anim-rain">${Array.from({ length: n }, (_, k) => `<path d="M${(k * 53) % 600} ${(k * 37) % 300} l-${len / 3} ${len}" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity=".75"/>`).join("")}</g>`;
    let fx = "";
    if (w === "rain") fx = drops(60, "#2563EB", 22);
    if (w === "thunderstorm") fx = drops(50, "#93C5FD", 22);
    if (w === "storm") fx = drops(80, "#93C5FD", 26);
    if (w === "rainbow") fx = `<g opacity=".6">${Array.from({ length: 14 }, (_, k) => `<path d="M${460 + (k * 23) % 140} ${120 + (k * 41) % 160} l-4 14" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round"/>`).join("")}</g>`;
    if (w === "snow") fx = `<g class="gx-anim-snow">${Array.from({ length: 46 }, (_, k) => `<circle cx="${(k * 61) % 600}" cy="${(k * 43) % 340}" r="${3 + (k % 3)}" fill="#fff" stroke="#BAE6FD" stroke-width="1"/>`).join("")}</g>`;
    if (w === "fog") fx = [210, 250, 290, 330, 370].map((y, k) => `<rect x="-20" y="${y}" width="640" height="34" rx="17" fill="#F8FAFC" opacity="${0.55 + (k % 2) * 0.15}"/>`).join("");
    const waves = w === "storm" ? `<path d="M380 340 Q420 300 460 340 T540 340 T620 340 V400 H380Z" fill="#1D4ED8"/><path d="M380 340 Q420 300 460 340 T540 340 T620 340" stroke="#BFDBFE" stroke-width="5" fill="none"/>` : `<path d="M400 360 Q450 352 500 360 T600 360 V400 H400Z" fill="${dark ? "#1E40AF" : snowy ? "#BAE6FD" : "#38BDF8"}"/>`;
    const roof = snowy ? "#F8FAFC" : "#DC2626";
    const shadow = w === "sunny" ? `<ellipse cx="140" cy="352" rx="60" ry="10" fill="#15803D" opacity=".45"/>` : "";
    const kite = w === "wind" ? `<path d="M480 150 L506 176 L480 214 L454 176Z" fill="#EC4899" stroke="#9D174D" stroke-width="3"/><path d="M480 214 Q470 260 430 300 Q400 320 330 330" stroke="#475569" stroke-width="2" fill="none"/><path d="M482 222 l10 10 M476 236 l-10 8" stroke="#F472B6" stroke-width="4"/>` : "";
    const leaves = w === "wind" || w === "storm" ? Array.from({ length: 6 }, (_, k) => `<ellipse cx="${200 + k * 42}" cy="${200 + (k % 3) * 24}" rx="8" ry="4" fill="#22C55E" transform="rotate(${k * 30} ${200 + k * 42} ${200 + (k % 3) * 24})"/>`).join("") : "";
    return `<svg class="gx-map-svg gx-weather-scene" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="gxWSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
      <rect width="600" height="400" fill="url(#gxWSky)"/>
      ${sky}
      <path d="M0 290 Q120 230 240 280 Q340 240 460 280 Q540 260 600 270 V400 H0Z" fill="${hill}"/>
      <path d="M0 330 Q300 310 600 330 V400 H0Z" fill="${grass}"/>
      ${waves}${shadow}
      <g transform="rotate(${lean} 140 350)"><rect x="132" y="270" width="16" height="80" fill="#92400E"/><circle cx="140" cy="250" r="44" fill="${snowy ? "#E2E8F0" : "#16A34A"}"/><circle cx="112" cy="270" r="26" fill="${snowy ? "#F8FAFC" : "#22C55E"}"/><circle cx="168" cy="270" r="26" fill="${snowy ? "#F1F5F9" : "#15803D"}"/></g>
      <rect x="250" y="290" width="90" height="62" fill="#FEF3C7" stroke="#B45309" stroke-width="3"/><path d="M240 294 L295 250 L350 294Z" fill="${roof}" stroke="#7F1D1D" stroke-width="3"/>
      <rect x="284" y="314" width="22" height="38" fill="#92400E"/><rect x="258" y="304" width="20" height="18" fill="${dark || w === "fog" ? "#FDE68A" : "#BAE6FD"}" stroke="#B45309" stroke-width="2"/>
      ${kite}${leaves}${fx}
    </svg>`;
  }

  /* ---------- Sơ đồ vòng tuần hoàn nước (bấm được từng bước) ---------- */
  function cycleMapSvg(selected) {
    const sel = (id) => (selected === id ? "is-selected" : "");
    const tag = (id, label, x, y) => `<rect class="gx-step-tag" x="${x - label.length * 8 - 22}" y="${y - 26}" width="${label.length * 16 + 44}" height="52" rx="26"/><text class="gx-step-name" x="${x}" y="${y + 10}" text-anchor="middle">${label}</text>`;
    const wavy = (x, y1, y2) => { let d = `M${x} ${y1}`; for (let y = y1; y > y2; y -= 24) d += " q-9 -6 0 -12 q9 -6 0 -12"; return `<path d="${d}" stroke="#7DD3FC" stroke-width="5" fill="none" stroke-linecap="round"/>`; };
    const arrowHead = (x, y) => `<path d="M${x - 10} ${y + 10} L${x} ${y - 4} L${x + 10} ${y + 10}" stroke="#0EA5E9" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    return `<svg class="gx-map-svg gx-cycle" viewBox="0 0 900 520" role="group" aria-label="Vòng tuần hoàn nước">
      <defs><linearGradient id="gxCSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DD3FC"/><stop offset="1" stop-color="#F0F9FF"/></linearGradient>
      <marker id="gxCArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#8B5CF6"/></marker></defs>
      <rect width="900" height="520" rx="24" fill="url(#gxCSky)"/>
      ${sunShape(80, 80, 38)}
      <path d="M380 400 L560 300 L700 160 L780 120 L900 210 V520 H380Z" fill="#4ADE80"/>
      <path d="M700 160 L780 120 L840 160 L800 170 L760 150 L730 175Z" fill="#F8FAFC"/>
      <path d="M380 400 Q600 380 900 410 V520 H380Z" fill="#22C55E"/>
      <path d="M585 120 H660" stroke="#8B5CF6" stroke-width="5" stroke-dasharray="10 8" marker-end="url(#gxCArrow)"/>
      <g class="gx-step ${sel("collection")}" data-object="collection" role="button" tabindex="0" aria-label="Tích tụ">
        <path d="M0 400 H400 Q390 440 380 520 H0Z" fill="#38BDF8"/><path d="M20 430 Q60 422 100 430 T180 430 T260 430 T340 430" stroke="#BAE6FD" stroke-width="4" fill="none"/>
        ${tag("collection", "Tích tụ", 170, 476)}</g>
      <g class="gx-step ${sel("evaporation")}" data-object="evaporation" role="button" tabindex="0" aria-label="Bốc hơi">
        <rect x="150" y="220" width="200" height="180" fill="transparent"/>
        ${[180, 250, 320].map((x) => wavy(x, 392, 260) + arrowHead(x, 250)).join("")}
        ${tag("evaporation", "Bốc hơi", 250, 210)}</g>
      <g class="gx-step ${sel("transpiration")}" data-object="transpiration" role="button" tabindex="0" aria-label="Thoát hơi nước ở cây">
        <rect x="478" y="330" width="18" height="70" fill="#92400E"/><circle cx="487" cy="320" r="36" fill="#16A34A"/><circle cx="462" cy="338" r="22" fill="#15803D"/><circle cx="512" cy="338" r="22" fill="#15803D"/>
        ${[470, 504].map((x) => wavy(x, 282, 236) + arrowHead(x, 226)).join("")}
        ${tag("transpiration", "Thoát hơi", 487, 450)}</g>
      <g class="gx-step ${sel("condensation")}" data-object="condensation" role="button" tabindex="0" aria-label="Ngưng tụ">
        ${cloudPath(470, 140, 2.1, "#F8FAFC", "#94A3B8")}
        ${tag("condensation", "Ngưng tụ", 470, 70)}</g>
      <g class="gx-step ${sel("precipitation")}" data-object="precipitation" role="button" tabindex="0" aria-label="Giáng thủy">
        ${cloudPath(760, 80, 1.9, "#94A3B8", "#475569")}
        ${Array.from({ length: 10 }, (_, k) => `<path d="M${700 + (k % 5) * 30} ${120 + Math.floor(k / 5) * 40} l-6 22" stroke="#2563EB" stroke-width="4" stroke-linecap="round"/>`).join("")}
        ${tag("precipitation", "Giáng thủy", 640, 236)}</g>
      <g class="gx-step ${sel("runoff")}" data-object="runoff" role="button" tabindex="0" aria-label="Dòng chảy mặt">
        <path d="M800 210 Q770 280 690 320 Q600 360 520 384 Q450 402 390 410" stroke="#0EA5E9" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M800 210 Q770 280 690 320 Q600 360 520 384 Q450 402 390 410" stroke="#7DD3FC" stroke-width="4" fill="none" stroke-dasharray="10 12"/>
        ${tag("runoff", "Dòng chảy", 700, 360)}</g>
    </svg>`;
  }


  /* ---------- Khu vườn ở tab đầu ----------
     x, y = vị trí trái / đáy (%), w = chiều rộng (% bức tranh). Hàng sau đặt trước. */
  /* ---------- Trạng thái ---------- */
  let controller = null;
  let root = null;
  let activeContext = null;
  let activeTab = "sky";
  let selectedId = DATA.overview.id;
  let quiz = null;
  let autoRead = true;
  let toastTimer = 0;
  let found = loadFound();

  const allItems = [DATA.overview, ...DATA.primary, ...DATA.secondary];
  const byId = (id) => allItems.find((item) => item.id === id) || DATA.overview;
  const isWeather = (id) => DATA.primary.some((d) => d.id === id);
  const isStep = (id) => DATA.secondary.some((d) => d.id === id);
  let sceneWeather = "cloud";
  const CHIP_NAME = { sunny: "Nắng", cloud: "Mây", rain: "Mưa", wind: "Gió", thunderstorm: "Dông", rainbow: "Cầu vồng", fog: "Sương mù", snow: "Tuyết", storm: "Bão" };
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
      ${R} .gx-tab[data-tab="cycle"][aria-selected="true"],${R} .gx-tab[data-tab="quiz"][aria-selected="true"]{background:var(--grad-alt)}
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
      ${R} .gx-split.gx-split-wide{grid-template-columns:minmax(0,1.6fr) minmax(320px,1fr)}
      ${R} .gx-skycard{display:flex;flex-direction:column;gap:8px;padding:12px;background:linear-gradient(180deg,#FFFFFF,#F5F3FF)}
      ${R} .gx-wscene{flex:1 1 auto;min-height:0;border-radius:18px;overflow:hidden;background:#BAE6FD}
      ${R} .gx-wscene svg{width:100%;height:100%;display:block}
      ${R} .gx-wscene.is-fade{animation:gxFade .45s ease}
      @keyframes gxFade{from{opacity:.25}to{opacity:1}}
      ${R} .gx-anim-rain{animation:gxRain .7s linear infinite}
      @keyframes gxRain{from{transform:translate(4px,-14px)}to{transform:translate(-4px,14px)}}
      ${R} .gx-anim-snow{animation:gxSnow 3s linear infinite}
      @keyframes gxSnow{from{transform:translateY(-10px)}to{transform:translateY(10px)}}
      ${R} .gx-wchips{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));gap:6px}
      ${R} .gx-wchip{position:relative;display:flex;flex-direction:column;align-items:center;gap:0;padding:4px 2px 6px;border:2px solid var(--line);border-radius:14px;background:#fff;font-size:14px;font-weight:700;color:var(--jungle);line-height:1.1;text-align:center}
      ${R} .gx-wchip:hover{border-color:#C4B5FD}
      ${R} .gx-wchip.is-selected{border-color:transparent;background:var(--grad-main);color:#fff}
      ${R} .gx-wchip.is-found::after{content:"✓";position:absolute;top:2px;right:6px;font-size:12px;color:var(--good)}
      ${R} .gx-wchip.is-selected.is-found::after{color:#BBF7D0}
      ${R} .gx-wchip-icon{width:100%;max-width:56px;aspect-ratio:120/100;display:block}
      ${R} .gx-wchip-icon svg{width:100%;height:100%}
      ${R} .gx-step{cursor:pointer;outline:none}
      ${R} .gx-step-tag{fill:#fff;stroke:#E9D5FF;stroke-width:3}
      ${R} .gx-step:hover .gx-step-tag,${R} .gx-step:focus-visible .gx-step-tag{stroke:#C4B5FD;stroke-width:4}
      ${R} .gx-step.is-selected .gx-step-tag{fill:#EC4899;stroke:#EC4899}
      ${R} .gx-step.is-selected .gx-step-name{fill:#fff}
      ${R} .gx-step-name{font:700 27px "Baloo 2","Nunito",system-ui,sans-serif;fill:#5B216E}
      ${R} .gx-spot.is-selected .gx-w-svg{filter:drop-shadow(0 0 6px rgba(236,72,153,.8))}
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
        ${R} .gx-split.gx-split-wide{grid-template-columns:1fr}
        ${R} .gx-wscene{height:62vw}
        ${R} .gx-wchips{grid-template-columns:repeat(5,minmax(0,1fr))}
        ${R} .gx-skycard{height:auto}
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
    if (ICON[obj.id]) return `<div class="gx-hero is-organ" style="background:${ICON_BG[obj.id]}">${iconSvg(obj.id)}</div>`;
    return `<div class="gx-hero is-organ" style="background:${ICON_BG.cloud}">${iconSvg("cloud")}</div>`;
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
  function skyHtml() {
    if (isStep(selectedId)) selectedId = DATA.overview.id;
    if (isWeather(selectedId)) sceneWeather = selectedId;
    const chips = DATA.primary.map((o) => `<button type="button" class="gx-wchip ${o.id === selectedId ? "is-selected" : ""} ${found.has(o.id) ? "is-found" : ""}" data-object="${o.id}" aria-label="${o.name}"><span class="gx-wchip-icon">${iconSvg(o.id)}</span><span>${CHIP_NAME[o.id] || o.name}</span></button>`).join("");
    const what = `<button type="button" class="gx-whole ${selectedId === DATA.overview.id ? "is-selected" : ""}" data-object="${DATA.overview.id}">🌦️ Thời tiết là gì?</button>`;
    return `<div class="gx-split gx-split-wide">
      <div class="gx-card gx-skycard">
        <div class="gx-scene-note is-static"><span aria-hidden="true">🐰</span><span>Chọn một kiểu thời tiết, khung cảnh sẽ đổi theo!</span>${what}</div>
        <div class="gx-wscene">${weatherSceneSvg(sceneWeather)}</div>
        <div class="gx-wchips" role="group" aria-label="Các kiểu thời tiết">${chips}</div>
      </div>
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }
  function cycleHtml() {
    if (!isStep(selectedId)) selectedId = DATA.secondary[0].id;
    return `<div class="gx-split gx-split-wide">
      ${mapCard("Nước đi một vòng không bao giờ dừng. Chạm vào từng bước nhé!", cycleMapSvg(selectedId))}
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }

  function gridHtml(items) {
    if (!items.some((i) => i.id === selectedId)) selectedId = items[0].id;
    const cards = items.map((o) => {
      const tick = found.has(o.id) ? `<span class="gx-tick">✓ Đã xem</span>` : "";
      return `<button type="button" class="gx-item gx-land-item ${o.id === selectedId ? "is-selected" : ""}" data-object="${o.id}">${tick}<span class="gx-thumb" style="background:${ICON_BG[o.id]};padding:6px">${iconSvg(o.id)}</span><span class="gx-item-text"><strong>${o.name}</strong><small>${o.subtitle}</small></span></button>`;
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
      const msg = stars === 3 ? "Tuyệt vời! Con là nhà dự báo thời tiết nhí rồi!" : stars === 2 ? "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé." : "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.";
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
    if (activeTab === "sky" && isStep(selectedId)) selectedId = DATA.overview.id;
    if (activeTab === "weathers" && !isWeather(selectedId)) selectedId = DATA.primary[0].id;
    if (activeTab === "cycle" && !isStep(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz") markFound(selectedId, true);
    let html = "";
    if (activeTab === "sky") html = skyHtml();
    else if (activeTab === "weathers") html = gridHtml(DATA.primary);
    else if (activeTab === "cycle") html = cycleHtml();
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
    if (n === total) toast("🏆 Con đã khám phá hết bầu trời rồi! Giỏi quá!");
    else toast(`🌦️ Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { sky: "Bầu trời", weathers: "Hiện tượng", cycle: "Vòng tuần hoàn nước", quiz: "Hỏi đáp" };
  function setBanner() {
    const fn = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof fn !== "function") return;
    fn({ items: [{ level: 2, title: CONFIG.title, action: null }, { level: 3, title: TAB_LABELS[activeTab], action: null }] });
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
    if (activeTab === "sky" && isWeather(id) && sceneWeather !== id) {
      sceneWeather = id;
      const sceneEl = root.querySelector(".gx-wscene");
      if (sceneEl) { sceneEl.innerHTML = weatherSceneSvg(id); sceneEl.classList.remove("is-fade"); void sceneEl.offsetWidth; sceneEl.classList.add("is-fade"); }
    }
    root.querySelectorAll(".gx-wchip").forEach((c) => c.classList.toggle("is-found", found.has(c.dataset.object)));
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
    activeTab = "sky";
    sceneWeather = "cloud";
    selectedId = DATA.overview.id;
    quiz = null;
    found = loadFound();
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `
      <header class="gx-head">
        <div class="gx-logo" aria-hidden="true">${iconSvg("cloud")}</div>
        <div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div>
        <div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="sky" type="button" aria-selected="true">🌤️ Bầu trời</button>
        <button class="gx-tab" role="tab" data-tab="weathers" type="button" aria-selected="false" tabindex="-1">☁️ Hiện tượng</button>
        <button class="gx-tab" role="tab" data-tab="cycle" type="button" aria-selected="false" tabindex="-1">💧 Vòng tuần hoàn nước</button>
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
