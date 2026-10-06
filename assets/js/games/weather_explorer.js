(() => {
  "use strict";

  const CONFIG = Object.freeze({"moduleKey":"weatherExplorer","styleId":"class1-game-weather-explorer-style","rootId":"weather-explorer","title":"Khám phá thời tiết","subtitle":"Cùng Cô Thỏ Hồng quan sát bầu trời và vòng tuần hoàn nước","icon":"🌦️","overviewId":"weather-overview","primaryTab":"Hiện tượng","secondaryTab":"Vòng tuần hoàn nước","primaryIcon":"☁️","secondaryIcon":"💧","finishIcon":"🌈","sceneTip":"👆 Chạm vào các hiện tượng trên bầu trời để khám phá"});
  const DATA = Object.freeze({"overview":{"id":"weather-overview","name":"Thế giới thời tiết","icon":"🌦️","kicker":"KHÁM PHÁ THỜI TIẾT","subtitle":"Bầu trời thay đổi mỗi ngày","summary":"Thời tiết là trạng thái của không khí ở một nơi trong một khoảng thời gian. Có ngày nắng, ngày nhiều mây, ngày mưa, có gió mạnh hoặc trời lạnh.","more":"Để mô tả thời tiết, người ta quan sát nhiệt độ, mây, gió và lượng mưa. Thời tiết có thể thay đổi trong ngày nên dự báo giúp chúng ta chuẩn bị quần áo và kế hoạch phù hợp.","remember":"Bé nhớ: thời tiết không phải lúc nào cũng giống nhau. Khi có dông, bão hoặc mưa lớn, hãy làm theo hướng dẫn an toàn của người lớn.","speech":"Thế giới thời tiết. Thời tiết là trạng thái của không khí ở một nơi trong một khoảng thời gian. Có ngày nắng, ngày nhiều mây, ngày mưa, có gió mạnh hoặc trời lạnh. Để mô tả thời tiết, người ta quan sát nhiệt độ, mây, gió và lượng mưa. Thời tiết có thể thay đổi trong ngày nên dự báo giúp chúng ta chuẩn bị quần áo và kế hoạch phù hợp. Bé nhớ: thời tiết không phải lúc nào cũng giống nhau. Khi có dông, bão hoặc mưa lớn, hãy làm theo hướng dẫn an toàn của người lớn.","facts":[{"label":"Nhiệt độ","value":"Cho biết không khí nóng hay lạnh"},{"label":"Mây","value":"Gồm rất nhiều giọt nước nhỏ hoặc tinh thể băng"},{"label":"Gió","value":"Là không khí chuyển động"},{"label":"Mưa","value":"Nước từ mây rơi xuống"},{"label":"Dự báo","value":"Giúp chuẩn bị trước"},{"label":"An toàn","value":"Luôn nghe người lớn khi thời tiết nguy hiểm"}]},"primary":[{"id":"sunny","name":"Trời nắng","icon":"☀️","kicker":"HIỆN TƯỢNG THỜI TIẾT","subtitle":"Nhiều ánh sáng Mặt Trời","summary":"Khi trời nắng, Mặt Trời không bị mây dày che kín nên chúng ta nhận được nhiều ánh sáng.","more":"Nắng làm bề mặt Trái Đất ấm lên và có thể làm nước bốc hơi nhanh hơn. Bóng của đồ vật thường rõ hơn khi ánh sáng mạnh.","remember":"Ra ngoài trời nắng lâu nên đội mũ, uống đủ nước và tránh nắng gắt theo hướng dẫn của người lớn.","speech":"Trời nắng. Khi trời nắng, Mặt Trời không bị mây dày che kín nên chúng ta nhận được nhiều ánh sáng. Nắng làm bề mặt Trái Đất ấm lên và có thể làm nước bốc hơi nhanh hơn. Bóng của đồ vật thường rõ hơn khi ánh sáng mạnh. Ra ngoài trời nắng lâu nên đội mũ, uống đủ nước và tránh nắng gắt theo hướng dẫn của người lớn.","facts":[{"label":"Dấu hiệu","value":"Bầu trời sáng, nhiều ánh nắng"},{"label":"Tác động","value":"Làm bề mặt ấm lên"},{"label":"Liên quan nước","value":"Làm tăng bốc hơi"},{"label":"Bảo vệ","value":"Mũ, nước uống, nghỉ nơi râm"}]},{"id":"cloud","name":"Mây","icon":"☁️","kicker":"HIỆN TƯỢNG THỜI TIẾT","subtitle":"Những đám trắng hoặc xám trên trời","summary":"Mây hình thành khi hơi nước trong không khí lạnh đi và ngưng tụ thành vô số giọt nước rất nhỏ hoặc tinh thể băng.","more":"Có nhiều dạng mây khác nhau. Một số mây mỏng báo trời khá ổn định, còn những đám mây dông phát triển cao có thể đi kèm mưa lớn, sấm chớp.","remember":"Mây không phải là bông; đó là rất nhiều giọt nước hoặc tinh thể băng nhỏ li ti.","speech":"Mây. Mây hình thành khi hơi nước trong không khí lạnh đi và ngưng tụ thành vô số giọt nước rất nhỏ hoặc tinh thể băng. Có nhiều dạng mây khác nhau. Một số mây mỏng báo trời khá ổn định, còn những đám mây dông phát triển cao có thể đi kèm mưa lớn, sấm chớp. Mây không phải là bông; đó là rất nhiều giọt nước hoặc tinh thể băng nhỏ li ti.","facts":[{"label":"Tạo bởi","value":"Giọt nước nhỏ hoặc tinh thể băng"},{"label":"Hình thành","value":"Khi hơi nước ngưng tụ"},{"label":"Màu","value":"Có thể trắng, xám hoặc rất tối"},{"label":"Có thể mang","value":"Mưa hoặc tuyết"}]},{"id":"rain","name":"Mưa","icon":"🌧️","kicker":"HIỆN TƯỢNG THỜI TIẾT","subtitle":"Nước từ mây rơi xuống","summary":"Mưa xảy ra khi các giọt nước trong mây lớn dần và trở nên đủ nặng để rơi xuống mặt đất.","more":"Mưa cung cấp nước cho sông hồ, đất và cây cối. Mưa quá lớn trong thời gian dài có thể gây ngập nên cần theo dõi cảnh báo của người lớn.","remember":"Mưa là một phần quan trọng của vòng tuần hoàn nước.","speech":"Mưa. Mưa xảy ra khi các giọt nước trong mây lớn dần và trở nên đủ nặng để rơi xuống mặt đất. Mưa cung cấp nước cho sông hồ, đất và cây cối. Mưa quá lớn trong thời gian dài có thể gây ngập nên cần theo dõi cảnh báo của người lớn. Mưa là một phần quan trọng của vòng tuần hoàn nước.","facts":[{"label":"Nguồn","value":"Giọt nước trong mây"},{"label":"Rơi khi","value":"Giọt đủ lớn và nặng"},{"label":"Lợi ích","value":"Bổ sung nước cho đất và sinh vật"},{"label":"Mưa lớn","value":"Có thể gây ngập"}]},{"id":"wind","name":"Gió","icon":"💨","kicker":"HIỆN TƯỢNG THỜI TIẾT","subtitle":"Không khí đang chuyển động","summary":"Gió là chuyển động của không khí từ nơi có áp suất cao hơn tới nơi có áp suất thấp hơn.","more":"Gió nhẹ giúp làm mát và làm cánh diều bay. Gió rất mạnh có thể làm gãy cành cây hoặc gây nguy hiểm, nhất là trong bão.","remember":"Ta không nhìn thấy không khí nhưng có thể nhận ra gió qua lá cây, cờ hoặc tóc đang chuyển động.","speech":"Gió. Gió là chuyển động của không khí từ nơi có áp suất cao hơn tới nơi có áp suất thấp hơn. Gió nhẹ giúp làm mát và làm cánh diều bay. Gió rất mạnh có thể làm gãy cành cây hoặc gây nguy hiểm, nhất là trong bão. Ta không nhìn thấy không khí nhưng có thể nhận ra gió qua lá cây, cờ hoặc tóc đang chuyển động.","facts":[{"label":"Bản chất","value":"Không khí chuyển động"},{"label":"Nhận biết","value":"Lá, cờ, tóc chuyển động"},{"label":"Gió nhẹ","value":"Có thể làm mát"},{"label":"Gió mạnh","value":"Có thể nguy hiểm"}]},{"id":"thunderstorm","name":"Dông sấm chớp","icon":"⛈️","kicker":"HIỆN TƯỢNG THỜI TIẾT","subtitle":"Mưa, sét và tiếng sấm","summary":"Dông là cơn thời tiết có mây dông, thường kèm mưa, gió mạnh, sét và tiếng sấm.","more":"Sét là một phóng điện rất mạnh trong khí quyển. Không khí quanh đường sét nóng lên rất nhanh, giãn nở và tạo ra tiếng sấm.","remember":"Khi có sấm chớp, bé nên ở trong nhà hoặc nơi trú an toàn, tránh cây cao đơn độc và mặt nước.","speech":"Dông sấm chớp. Dông là cơn thời tiết có mây dông, thường kèm mưa, gió mạnh, sét và tiếng sấm. Sét là một phóng điện rất mạnh trong khí quyển. Không khí quanh đường sét nóng lên rất nhanh, giãn nở và tạo ra tiếng sấm. Khi có sấm chớp, bé nên ở trong nhà hoặc nơi trú an toàn, tránh cây cao đơn độc và mặt nước.","facts":[{"label":"Có thể có","value":"Mưa, gió, sét, sấm"},{"label":"Sét","value":"Phóng điện rất mạnh"},{"label":"Sấm","value":"Âm thanh do không khí giãn nở nhanh"},{"label":"An toàn","value":"Trú trong nhà hoặc nơi an toàn"}]},{"id":"rainbow","name":"Cầu vồng","icon":"🌈","kicker":"HIỆN TƯỢNG THỜI TIẾT","subtitle":"Dải màu xuất hiện khi có nắng và giọt nước","summary":"Cầu vồng có thể xuất hiện khi ánh sáng Mặt Trời đi qua các giọt nước trong không khí và bị bẻ cong, phản xạ rồi tách thành nhiều màu.","more":"Ta thường dễ thấy cầu vồng khi phía trước có mưa hoặc sương nước và Mặt Trời ở phía sau người quan sát.","remember":"Cầu vồng là ánh sáng, không phải một vật thể có thể chạm tới.","speech":"Cầu vồng. Cầu vồng có thể xuất hiện khi ánh sáng Mặt Trời đi qua các giọt nước trong không khí và bị bẻ cong, phản xạ rồi tách thành nhiều màu. Ta thường dễ thấy cầu vồng khi phía trước có mưa hoặc sương nước và Mặt Trời ở phía sau người quan sát. Cầu vồng là ánh sáng, không phải một vật thể có thể chạm tới.","facts":[{"label":"Cần","value":"Ánh sáng và giọt nước"},{"label":"Hiện tượng ánh sáng","value":"Bẻ cong, phản xạ và tách màu"},{"label":"Màu sắc","value":"Nhiều màu nối tiếp"},{"label":"Không phải","value":"Một vật thể cứng"}]},{"id":"fog","name":"Sương mù","icon":"🌫️","kicker":"HIỆN TƯỢNG THỜI TIẾT","subtitle":"Mây ở rất gần mặt đất","summary":"Sương mù là tập hợp các giọt nước rất nhỏ lơ lửng sát mặt đất, giống như một đám mây thấp.","more":"Sương mù làm tầm nhìn giảm nên người lái xe phải đi chậm và cẩn thận hơn.","remember":"Sương mù có thể làm ta nhìn mọi vật xa trở nên mờ.","speech":"Sương mù. Sương mù là tập hợp các giọt nước rất nhỏ lơ lửng sát mặt đất, giống như một đám mây thấp. Sương mù làm tầm nhìn giảm nên người lái xe phải đi chậm và cẩn thận hơn. Sương mù có thể làm ta nhìn mọi vật xa trở nên mờ.","facts":[{"label":"Vị trí","value":"Sát mặt đất"},{"label":"Thành phần","value":"Giọt nước nhỏ"},{"label":"Ảnh hưởng","value":"Giảm tầm nhìn"},{"label":"Khi di chuyển","value":"Cần chậm và cẩn thận"}]},{"id":"snow","name":"Tuyết","icon":"❄️","kicker":"HIỆN TƯỢNG THỜI TIẾT","subtitle":"Tinh thể băng rơi từ mây","summary":"Tuyết hình thành trong những đám mây đủ lạnh, nơi hơi nước biến thành các tinh thể băng.","more":"Các tinh thể băng kết hợp thành bông tuyết và rơi xuống khi đủ nặng. Nhiều vùng nhiệt đới hầu như không có tuyết ở nơi thấp.","remember":"Tuyết là nước ở thể rắn dưới dạng tinh thể băng.","speech":"Tuyết. Tuyết hình thành trong những đám mây đủ lạnh, nơi hơi nước biến thành các tinh thể băng. Các tinh thể băng kết hợp thành bông tuyết và rơi xuống khi đủ nặng. Nhiều vùng nhiệt đới hầu như không có tuyết ở nơi thấp. Tuyết là nước ở thể rắn dưới dạng tinh thể băng.","facts":[{"label":"Trạng thái","value":"Nước ở thể rắn"},{"label":"Tạo bởi","value":"Tinh thể băng"},{"label":"Cần","value":"Không khí đủ lạnh"},{"label":"Khác mưa","value":"Rơi xuống ở dạng băng"}]},{"id":"storm","name":"Bão nhiệt đới","icon":"🌀","kicker":"HIỆN TƯỢNG THỜI TIẾT","subtitle":"Hệ thống gió xoáy rất mạnh","summary":"Bão nhiệt đới hình thành trên vùng biển ấm và có thể tạo gió rất mạnh, mưa lớn cùng sóng cao.","more":"Dự báo và cảnh báo bão giúp người dân chuẩn bị. Khi có bão, trẻ em phải ở cùng người lớn và làm theo hướng dẫn của cơ quan chức năng.","remember":"Không ra ngoài xem bão. An toàn luôn quan trọng hơn việc quan sát thời tiết.","speech":"Bão nhiệt đới. Bão nhiệt đới hình thành trên vùng biển ấm và có thể tạo gió rất mạnh, mưa lớn cùng sóng cao. Dự báo và cảnh báo bão giúp người dân chuẩn bị. Khi có bão, trẻ em phải ở cùng người lớn và làm theo hướng dẫn của cơ quan chức năng. Không ra ngoài xem bão. An toàn luôn quan trọng hơn việc quan sát thời tiết.","facts":[{"label":"Hình thành","value":"Trên vùng biển ấm"},{"label":"Có thể gây","value":"Gió mạnh và mưa lớn"},{"label":"Theo dõi","value":"Dự báo và cảnh báo"},{"label":"An toàn","value":"Làm theo hướng dẫn người lớn"}]}],"secondary":[{"id":"evaporation","name":"Bốc hơi","icon":"♨️","kicker":"VÒNG TUẦN HOÀN NƯỚC","subtitle":"Nước lỏng trở thành hơi nước","summary":"Năng lượng từ Mặt Trời làm một phần nước ở biển, hồ, sông và mặt đất bốc hơi vào không khí.","more":"Bốc hơi có thể diễn ra ở nhiều nhiệt độ, không cần nước phải sôi.","remember":"Mặt Trời là nguồn năng lượng rất quan trọng giúp vòng tuần hoàn nước hoạt động.","speech":"Bốc hơi. Năng lượng từ Mặt Trời làm một phần nước ở biển, hồ, sông và mặt đất bốc hơi vào không khí. Bốc hơi có thể diễn ra ở nhiều nhiệt độ, không cần nước phải sôi. Mặt Trời là nguồn năng lượng rất quan trọng giúp vòng tuần hoàn nước hoạt động.","facts":[{"label":"Từ","value":"Nước lỏng"},{"label":"Thành","value":"Hơi nước"},{"label":"Nguồn năng lượng","value":"Chủ yếu từ Mặt Trời"},{"label":"Không cần","value":"Nước phải sôi"}]},{"id":"transpiration","name":"Thoát hơi nước ở cây","icon":"🌿","kicker":"VÒNG TUẦN HOÀN NƯỚC","subtitle":"Cây trả hơi nước về không khí","summary":"Cây hút nước từ đất qua rễ. Một phần nước đi lên lá và thoát ra không khí dưới dạng hơi nước.","more":"Quá trình này gọi là thoát hơi nước và cùng với bốc hơi góp phần đưa nước vào khí quyển.","remember":"Thực vật cũng tham gia vào vòng tuần hoàn nước.","speech":"Thoát hơi nước ở cây. Cây hút nước từ đất qua rễ. Một phần nước đi lên lá và thoát ra không khí dưới dạng hơi nước. Quá trình này gọi là thoát hơi nước và cùng với bốc hơi góp phần đưa nước vào khí quyển. Thực vật cũng tham gia vào vòng tuần hoàn nước.","facts":[{"label":"Nước vào cây","value":"Qua rễ"},{"label":"Nước thoát","value":"Chủ yếu qua lá"},{"label":"Dạng thoát","value":"Hơi nước"},{"label":"Vai trò","value":"Bổ sung hơi nước vào không khí"}]},{"id":"condensation","name":"Ngưng tụ","icon":"💧","kicker":"VÒNG TUẦN HOÀN NƯỚC","subtitle":"Hơi nước trở lại thành giọt nhỏ","summary":"Khi không khí chứa hơi nước lạnh đi đủ, hơi nước ngưng tụ thành các giọt nước nhỏ hoặc tinh thể băng.","more":"Ngưng tụ là bước quan trọng để hình thành mây và sương.","remember":"Bốc hơi và ngưng tụ là hai quá trình ngược chiều nhau.","speech":"Ngưng tụ. Khi không khí chứa hơi nước lạnh đi đủ, hơi nước ngưng tụ thành các giọt nước nhỏ hoặc tinh thể băng. Ngưng tụ là bước quan trọng để hình thành mây và sương. Bốc hơi và ngưng tụ là hai quá trình ngược chiều nhau.","facts":[{"label":"Từ","value":"Hơi nước"},{"label":"Thành","value":"Giọt nước hoặc tinh thể băng"},{"label":"Xảy ra khi","value":"Không khí lạnh đi"},{"label":"Giúp tạo","value":"Mây và sương"}]},{"id":"precipitation","name":"Giáng thủy","icon":"🌧️","kicker":"VÒNG TUẦN HOÀN NƯỚC","subtitle":"Nước từ khí quyển trở về mặt đất","summary":"Khi các giọt nước hoặc tinh thể băng trong mây đủ lớn, chúng rơi xuống dưới dạng mưa, tuyết hoặc các dạng giáng thủy khác.","more":"Đây là cách nước trong khí quyển quay trở lại mặt đất.","remember":"Mưa và tuyết đều là các dạng giáng thủy.","speech":"Giáng thủy. Khi các giọt nước hoặc tinh thể băng trong mây đủ lớn, chúng rơi xuống dưới dạng mưa, tuyết hoặc các dạng giáng thủy khác. Đây là cách nước trong khí quyển quay trở lại mặt đất. Mưa và tuyết đều là các dạng giáng thủy.","facts":[{"label":"Từ","value":"Mây"},{"label":"Về","value":"Mặt đất"},{"label":"Dạng phổ biến","value":"Mưa"},{"label":"Dạng lạnh","value":"Tuyết"}]},{"id":"runoff","name":"Dòng chảy mặt","icon":"🏞️","kicker":"VÒNG TUẦN HOÀN NƯỚC","subtitle":"Nước chảy trên bề mặt đất","summary":"Sau mưa, phần nước không thấm xuống đất có thể chảy theo sườn dốc vào suối, sông, hồ rồi ra biển.","more":"Dòng chảy mang nước từ vùng cao xuống vùng thấp.","remember":"Không phải mọi giọt mưa đều chảy trên mặt đất; một phần có thể thấm xuống đất.","speech":"Dòng chảy mặt. Sau mưa, phần nước không thấm xuống đất có thể chảy theo sườn dốc vào suối, sông, hồ rồi ra biển. Dòng chảy mang nước từ vùng cao xuống vùng thấp. Không phải mọi giọt mưa đều chảy trên mặt đất; một phần có thể thấm xuống đất.","facts":[{"label":"Sau","value":"Mưa hoặc tuyết tan"},{"label":"Hướng","value":"Từ cao xuống thấp"},{"label":"Chảy tới","value":"Suối, sông, hồ, biển"},{"label":"Một phần khác","value":"Thấm xuống đất"}]},{"id":"collection","name":"Tích tụ và lặp lại","icon":"🌊","kicker":"VÒNG TUẦN HOÀN NƯỚC","subtitle":"Nước tập trung rồi lại bốc hơi","summary":"Nước tập trung trong biển, hồ, sông, đất và băng. Từ đó, nước tiếp tục bốc hơi hoặc được cây hút lên.","more":"Vì nước liên tục di chuyển giữa mặt đất, đại dương và khí quyển nên quá trình được gọi là vòng tuần hoàn.","remember":"Vòng tuần hoàn nước không có một điểm bắt đầu duy nhất; các bước nối tiếp và lặp lại.","speech":"Tích tụ và lặp lại. Nước tập trung trong biển, hồ, sông, đất và băng. Từ đó, nước tiếp tục bốc hơi hoặc được cây hút lên. Vì nước liên tục di chuyển giữa mặt đất, đại dương và khí quyển nên quá trình được gọi là vòng tuần hoàn. Vòng tuần hoàn nước không có một điểm bắt đầu duy nhất; các bước nối tiếp và lặp lại.","facts":[{"label":"Nơi tích tụ","value":"Biển, hồ, sông, đất, băng"},{"label":"Sau đó","value":"Có thể bốc hơi"},{"label":"Tính chất","value":"Lặp đi lặp lại"},{"label":"Tên gọi","value":"Vòng tuần hoàn nước"}]}],"quiz":[{"q":"Thời tiết mô tả điều gì?","a":["Trạng thái không khí ở một nơi trong một khoảng thời gian","Tên của một hành tinh","Màu của đất","Tuổi của cây"],"c":0,"note":"Thời tiết là trạng thái của không khí tại một nơi và thời điểm."},{"q":"Yếu tố nào cho biết không khí nóng hay lạnh?","a":["Nhiệt độ","Chiều cao ngôi nhà","Màu quần áo","Số cây"],"c":0,"note":"Nhiệt độ cho biết mức nóng hoặc lạnh."},{"q":"Gió là gì?","a":["Không khí chuyển động","Nước đang chảy","Ánh sáng","Đất rung"],"c":0,"note":"Gió là không khí chuyển động."},{"q":"Mây gồm chủ yếu những gì?","a":["Giọt nước rất nhỏ hoặc tinh thể băng","Bông vải","Khói xe","Cát"],"c":0,"note":"Mây gồm vô số giọt nước nhỏ hoặc tinh thể băng."},{"q":"Dự báo thời tiết giúp ích gì?","a":["Giúp chuẩn bị trước","Làm mưa dừng lại","Làm Mặt Trời sáng hơn","Đổi hướng gió"],"c":0,"note":"Dự báo giúp chúng ta chuẩn bị quần áo và kế hoạch."},{"q":"Khi thời tiết nguy hiểm, bé nên làm gì?","a":["Nghe hướng dẫn của người lớn","Tự chạy ra ngoài xem","Leo lên mái nhà","Đứng dưới cây cao"],"c":0,"note":"An toàn nhất là làm theo hướng dẫn của người lớn."},{"q":"Khi trời nắng, điều gì thường rõ hơn?","a":["Bóng của đồ vật","Sương mù","Tuyết rơi","Sấm"],"c":0,"note":"Ánh sáng mạnh tạo bóng rõ."},{"q":"Nắng có thể làm nước làm gì nhanh hơn?","a":["Bốc hơi","Đóng băng","Biến thành đá","Tạo sấm"],"c":0,"note":"Năng lượng Mặt Trời làm nước bốc hơi nhanh hơn."},{"q":"Mây hình thành khi hơi nước làm gì?","a":["Ngưng tụ","Biến thành cát","Phát sáng","Chảy thành dầu"],"c":0,"note":"Hơi nước lạnh đi và ngưng tụ thành giọt nhỏ."},{"q":"Mây dông có thể đi kèm hiện tượng nào?","a":["Mưa lớn và sấm chớp","Chỉ nắng nhẹ","Không có gió bao giờ","Cát bay từ biển"],"c":0,"note":"Mây dông thường đi kèm mưa, gió, sét và sấm."},{"q":"Mưa xảy ra khi giọt nước trong mây thế nào?","a":["Lớn dần và đủ nặng để rơi","Biến thành ánh sáng","Nhỏ mãi không đổi","Bay lên Mặt Trời"],"c":0,"note":"Giọt nước lớn dần và rơi khi đủ nặng."},{"q":"Mưa có lợi ích nào?","a":["Bổ sung nước cho đất và sinh vật","Làm mất mọi con sông","Làm cây không cần rễ","Làm gió biến mất"],"c":0,"note":"Mưa cung cấp nước cho đất, sông hồ và sinh vật."},{"q":"Ta có thể nhận ra gió qua điều gì?","a":["Lá cây và cờ chuyển động","Màu của đá","Số cửa sổ","Bóng tối"],"c":0,"note":"Gió làm lá, cờ và tóc chuyển động."},{"q":"Gió rất mạnh có thể gây gì?","a":["Gãy cành cây và nguy hiểm","Làm mọi vật đứng yên","Làm mây biến thành đá","Làm nước không chảy"],"c":0,"note":"Gió mạnh có thể gây hư hại và nguy hiểm."},{"q":"Sét là gì?","a":["Một phóng điện rất mạnh trong khí quyển","Một loại mây trắng","Một dòng sông","Một ngôi sao"],"c":0,"note":"Sét là hiện tượng phóng điện mạnh."},{"q":"Tiếng sấm được tạo ra chủ yếu vì điều gì?","a":["Không khí quanh đường sét nóng lên và giãn nở rất nhanh","Mây va vào núi","Mưa rơi xuống lá","Gió thổi qua cửa"],"c":0,"note":"Không khí bị nung nóng cực nhanh quanh sét tạo sóng âm là tiếng sấm."},{"q":"Khi có dông sấm chớp, nơi nào an toàn hơn?","a":["Trong nhà hoặc nơi trú an toàn","Dưới cây cao đơn độc","Giữa cánh đồng trống","Dưới nước"],"c":0,"note":"Nên trú trong nhà hoặc nơi an toàn."},{"q":"Cầu vồng cần hai điều gì để dễ hình thành?","a":["Ánh sáng Mặt Trời và giọt nước","Cát và gió","Tuyết và đá","Đất và lá"],"c":0,"note":"Ánh sáng tương tác với giọt nước tạo cầu vồng."},{"q":"Cầu vồng là gì?","a":["Một hiện tượng ánh sáng","Một cây cầu thật","Một loại mây cứng","Một vật thể có thể cầm"],"c":0,"note":"Cầu vồng là hiện tượng ánh sáng."},{"q":"Sương mù giống điều gì?","a":["Một đám mây sát mặt đất","Một cơn bão trên biển","Một đám cháy","Một lớp cát"],"c":0,"note":"Sương mù là các giọt nước nhỏ lơ lửng sát mặt đất."},{"q":"Sương mù ảnh hưởng thế nào đến việc nhìn xa?","a":["Làm giảm tầm nhìn","Làm nhìn xa hơn","Không ảnh hưởng bao giờ","Làm mọi vật sáng hơn"],"c":0,"note":"Sương mù làm tầm nhìn giảm."},{"q":"Tuyết gồm chủ yếu những gì?","a":["Tinh thể băng","Giọt dầu","Hạt cát","Lá khô"],"c":0,"note":"Tuyết là nước ở dạng tinh thể băng."},{"q":"Tuyết thường hình thành khi nào?","a":["Không khí trong mây đủ lạnh","Trời rất nóng","Không có mây","Chỉ khi có gió nhẹ"],"c":0,"note":"Tuyết cần điều kiện đủ lạnh."},{"q":"Bão nhiệt đới thường hình thành ở đâu?","a":["Trên vùng biển ấm","Trong sa mạc khô","Trên mặt trăng","Trong hang"],"c":0,"note":"Bão nhiệt đới thường hình thành trên biển ấm."},{"q":"Bão có thể gây hiện tượng nào?","a":["Gió mạnh và mưa lớn","Chỉ sương nhẹ","Chỉ nắng","Không có mây"],"c":0,"note":"Bão có thể gây gió mạnh, mưa lớn và sóng cao."},{"q":"Khi có bão, bé nên làm gì?","a":["Ở cùng người lớn và làm theo hướng dẫn an toàn","Ra ngoài xem gió","Đứng gần cửa kính","Đi ra biển"],"c":0,"note":"An toàn là ưu tiên hàng đầu khi có bão."},{"q":"Bốc hơi là quá trình nước lỏng biến thành gì?","a":["Hơi nước","Đá","Đất","Mây ngay lập tức"],"c":0,"note":"Bốc hơi biến nước lỏng thành hơi nước."},{"q":"Nguồn năng lượng quan trọng cho bốc hơi trong vòng tuần hoàn nước là gì?","a":["Mặt Trời","Mặt Trăng","Đèn pin","Âm thanh"],"c":0,"note":"Năng lượng Mặt Trời giúp nước bốc hơi."},{"q":"Nước có cần sôi mới bốc hơi không?","a":["Không","Có, luôn luôn","Chỉ khi đóng băng","Chỉ ban đêm"],"c":0,"note":"Bốc hơi có thể xảy ra ở nhiều nhiệt độ."},{"q":"Thoát hơi nước ở cây xảy ra chủ yếu qua bộ phận nào?","a":["Lá","Rễ già","Quả chín","Hạt khô"],"c":0,"note":"Một phần nước thoát ra không khí qua lá."},{"q":"Ngưng tụ biến hơi nước thành gì?","a":["Giọt nước nhỏ hoặc tinh thể băng","Ánh sáng","Gió","Cát"],"c":0,"note":"Hơi nước lạnh đi và ngưng tụ."},{"q":"Ngưng tụ giúp hình thành gì?","a":["Mây và sương","Đá núi","Sóng biển","Đất"],"c":0,"note":"Ngưng tụ là bước quan trọng tạo mây và sương."},{"q":"Giáng thủy là gì?","a":["Nước từ khí quyển rơi về mặt đất","Nước bay lên trời","Gió đổi hướng","Mặt Trời lặn"],"c":0,"note":"Mưa và tuyết là các dạng giáng thủy."},{"q":"Mưa và tuyết đều thuộc nhóm nào?","a":["Giáng thủy","Bốc hơi","Gió","Ánh sáng"],"c":0,"note":"Mưa và tuyết đều là giáng thủy."},{"q":"Dòng chảy mặt thường đi theo hướng nào?","a":["Từ nơi cao xuống nơi thấp","Từ thấp lên cao","Chỉ đi ngang","Bay lên trời"],"c":0,"note":"Nước chảy theo địa hình từ cao xuống thấp."},{"q":"Sau mưa, một phần nước có thể làm gì ngoài chảy trên mặt đất?","a":["Thấm xuống đất","Biến thành lửa","Biến mất hoàn toàn","Bay ra vũ trụ"],"c":0,"note":"Một phần nước thấm vào đất."},{"q":"Nước có thể tích tụ ở đâu?","a":["Biển, hồ, sông, đất và băng","Chỉ trong mây","Chỉ trong chai","Chỉ trong cây"],"c":0,"note":"Nước được lưu trữ ở nhiều nơi."},{"q":"Vì sao gọi là vòng tuần hoàn nước?","a":["Vì nước liên tục di chuyển và các quá trình lặp lại","Vì nước chỉ đi một lần","Vì nước luôn đứng yên","Vì chỉ có mưa"],"c":0,"note":"Nước liên tục chuyển giữa mặt đất, đại dương và khí quyển."},{"q":"Thực vật có tham gia vòng tuần hoàn nước không?","a":["Có","Không bao giờ","Chỉ cây giả","Chỉ cây dưới biển"],"c":0,"note":"Cây hút nước và thoát hơi nước vào khí quyển."},{"q":"Bước nào đưa nước từ mặt đất trở lại không khí ở dạng hơi?","a":["Bốc hơi","Giáng thủy","Dòng chảy mặt","Tích tụ"],"c":0,"note":"Bốc hơi đưa nước lỏng thành hơi nước."}]});
  const SCENE_HTML = "<div class=\"gx-scene-bg\" style=\"background:linear-gradient(180deg,#7DD3FC 0%,#BAE6FD 55%,#DCFCE7 55%,#A7F3D0 100%)\"><div style=\"position:absolute;left:0;right:0;bottom:0;height:18%;background:linear-gradient(#65A30D,#15803D);opacity:.75\"></div><button class=\"gx-hotspot\" type=\"button\" data-object=\"sunny\" style=\"left:8%;top:8%;--gx-size:74px\" aria-label=\"Nắng\">\n              <span class=\"gx-hotspot-icon\">☀️</span><small>Nắng</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"cloud\" style=\"left:48%;top:10%;--gx-size:78px\" aria-label=\"Mây\">\n              <span class=\"gx-hotspot-icon\">☁️</span><small>Mây</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"rain\" style=\"left:62%;top:38%;--gx-size:82px\" aria-label=\"Mưa\">\n              <span class=\"gx-hotspot-icon\">🌧️</span><small>Mưa</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"wind\" style=\"left:15%;top:48%;--gx-size:72px\" aria-label=\"Gió\">\n              <span class=\"gx-hotspot-icon\">💨</span><small>Gió</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"rainbow\" style=\"left:38%;top:58%;--gx-size:84px\" aria-label=\"Cầu vồng\">\n              <span class=\"gx-hotspot-icon\">🌈</span><small>Cầu vồng</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"thunderstorm\" style=\"left:77%;top:12%;--gx-size:76px\" aria-label=\"Dông\">\n              <span class=\"gx-hotspot-icon\">⛈️</span><small>Dông</small>\n            </button></div>";

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
