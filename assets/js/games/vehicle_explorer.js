(() => {
  "use strict";

  const CONFIG = Object.freeze({"moduleKey":"vehicleExplorer","styleId":"class1-game-vehicle-explorer-style","rootId":"vehicle-explorer","title":"Khám phá phương tiện","subtitle":"Cùng Cô Thỏ Hồng tìm hiểu cách chúng ta di chuyển","icon":"🚗","overviewId":"vehicle-overview","primaryTab":"Phương tiện","secondaryTab":"Hoạt động & an toàn","primaryIcon":"🚙","secondaryIcon":"🚦","finishIcon":"🚀","sceneTip":"👆 Chạm vào các phương tiện để khám phá"});
  const DATA = Object.freeze({"overview":{"id":"vehicle-overview","name":"Thế giới phương tiện","icon":"🚦","kicker":"KHÁM PHÁ PHƯƠNG TIỆN","subtitle":"Giúp con người di chuyển và vận chuyển hàng hóa","summary":"Phương tiện giúp con người đi lại và chở hàng từ nơi này tới nơi khác. Có phương tiện chạy trên đường, đường sắt, mặt nước hoặc bay trong không khí.","more":"Mỗi loại phương tiện có cấu tạo và cách hoạt động khác nhau. Xe đạp dùng sức người, ô tô và tàu có thể dùng động cơ, máy bay cần cánh tạo lực nâng, tàu thủy cần nổi trên nước.","remember":"Bé nhớ: khám phá phương tiện luôn đi cùng an toàn giao thông. Đi đúng nơi, đội mũ bảo hiểm khi cần và thắt dây an toàn theo hướng dẫn của người lớn.","speech":"Thế giới phương tiện. Phương tiện giúp con người đi lại và chở hàng từ nơi này tới nơi khác. Có phương tiện chạy trên đường, đường sắt, mặt nước hoặc bay trong không khí. Mỗi loại phương tiện có cấu tạo và cách hoạt động khác nhau. Xe đạp dùng sức người, ô tô và tàu có thể dùng động cơ, máy bay cần cánh tạo lực nâng, tàu thủy cần nổi trên nước. Bé nhớ: khám phá phương tiện luôn đi cùng an toàn giao thông. Đi đúng nơi, đội mũ bảo hiểm khi cần và thắt dây an toàn theo hướng dẫn của người lớn.","facts":[{"label":"Đường bộ","value":"Xe đạp, xe máy, ô tô, xe buýt"},{"label":"Đường sắt","value":"Tàu hỏa"},{"label":"Đường thủy","value":"Thuyền, tàu"},{"label":"Hàng không","value":"Máy bay, trực thăng"},{"label":"Năng lượng","value":"Sức người, điện hoặc nhiên liệu"},{"label":"An toàn","value":"Tuân thủ luật và hướng dẫn"}]},"primary":[{"id":"bicycle","name":"Xe đạp","icon":"🚲","kicker":"PHƯƠNG TIỆN","subtitle":"Dùng sức người và hai bánh","summary":"Xe đạp thường có hai bánh, bàn đạp, xích, phanh và tay lái.","more":"Khi đạp, lực từ chân truyền qua bàn đạp và xích để làm bánh sau quay. Người lái dùng tay lái để đổi hướng và phanh để giảm tốc.","remember":"Khi đi xe đạp, bé cần đội mũ bảo hiểm phù hợp và đi ở nơi an toàn theo hướng dẫn của người lớn.","speech":"Xe đạp. Xe đạp thường có hai bánh, bàn đạp, xích, phanh và tay lái. Khi đạp, lực từ chân truyền qua bàn đạp và xích để làm bánh sau quay. Người lái dùng tay lái để đổi hướng và phanh để giảm tốc. Khi đi xe đạp, bé cần đội mũ bảo hiểm phù hợp và đi ở nơi an toàn theo hướng dẫn của người lớn.","facts":[{"label":"Năng lượng","value":"Sức người"},{"label":"Truyền lực","value":"Bàn đạp và xích"},{"label":"Đổi hướng","value":"Tay lái"},{"label":"Giảm tốc","value":"Phanh"}]},{"id":"motorbike","name":"Xe máy","icon":"🏍️","kicker":"PHƯƠNG TIỆN","subtitle":"Phương tiện hai bánh có động cơ","summary":"Xe máy thường có hai bánh và dùng động cơ điện hoặc động cơ đốt trong để tạo lực chuyển động.","more":"Người lái điều khiển hướng bằng tay lái và giảm tốc bằng phanh. Cân bằng rất quan trọng vì xe chỉ có hai bánh.","remember":"Người đi xe máy phải đội mũ bảo hiểm đúng cách và tuân thủ quy định giao thông.","speech":"Xe máy. Xe máy thường có hai bánh và dùng động cơ điện hoặc động cơ đốt trong để tạo lực chuyển động. Người lái điều khiển hướng bằng tay lái và giảm tốc bằng phanh. Cân bằng rất quan trọng vì xe chỉ có hai bánh. Người đi xe máy phải đội mũ bảo hiểm đúng cách và tuân thủ quy định giao thông.","facts":[{"label":"Số bánh thường gặp","value":"2"},{"label":"Nguồn lực","value":"Động cơ"},{"label":"Điều khiển","value":"Tay lái"},{"label":"An toàn","value":"Mũ bảo hiểm"}]},{"id":"car","name":"Ô tô","icon":"🚗","kicker":"PHƯƠNG TIỆN","subtitle":"Bốn bánh và khoang chở người","summary":"Ô tô thường có bốn bánh, hệ thống lái, phanh và động cơ hoặc mô-tơ điện.","more":"Dây an toàn giúp giữ người ngồi đúng vị trí khi xe phanh gấp hoặc va chạm. Trẻ em cần ngồi đúng vị trí và dùng thiết bị an toàn phù hợp.","remember":"Không tự mở cửa xe khi chưa được người lớn cho phép.","speech":"Ô tô. Ô tô thường có bốn bánh, hệ thống lái, phanh và động cơ hoặc mô-tơ điện. Dây an toàn giúp giữ người ngồi đúng vị trí khi xe phanh gấp hoặc va chạm. Trẻ em cần ngồi đúng vị trí và dùng thiết bị an toàn phù hợp. Không tự mở cửa xe khi chưa được người lớn cho phép.","facts":[{"label":"Bánh thường gặp","value":"4"},{"label":"Tạo lực","value":"Động cơ hoặc mô-tơ điện"},{"label":"Đổi hướng","value":"Hệ thống lái"},{"label":"An toàn","value":"Dây an toàn"}]},{"id":"bus","name":"Xe buýt","icon":"🚌","kicker":"PHƯƠNG TIỆN","subtitle":"Chở nhiều người trên cùng tuyến","summary":"Xe buýt là phương tiện công cộng đường bộ có thể chở nhiều hành khách.","more":"Xe buýt thường dừng ở các điểm hoặc trạm quy định. Hành khách nên chờ xe ở nơi an toàn và lên xuống khi xe đã dừng hẳn.","remember":"Đi xe buýt giúp nhiều người cùng sử dụng một phương tiện.","speech":"Xe buýt. Xe buýt là phương tiện công cộng đường bộ có thể chở nhiều hành khách. Xe buýt thường dừng ở các điểm hoặc trạm quy định. Hành khách nên chờ xe ở nơi an toàn và lên xuống khi xe đã dừng hẳn. Đi xe buýt giúp nhiều người cùng sử dụng một phương tiện.","facts":[{"label":"Loại","value":"Giao thông công cộng"},{"label":"Chở","value":"Nhiều hành khách"},{"label":"Dừng","value":"Điểm/trạm quy định"},{"label":"An toàn","value":"Chờ xe dừng hẳn"}]},{"id":"train","name":"Tàu hỏa","icon":"🚆","kicker":"PHƯƠNG TIỆN","subtitle":"Chạy trên đường ray","summary":"Tàu hỏa gồm đầu máy hoặc các toa có hệ thống kéo đẩy, chạy trên hai đường ray song song.","more":"Bánh tàu được thiết kế để bám và dẫn hướng theo đường ray. Tàu có thể chở rất nhiều người hoặc hàng hóa.","remember":"Không chơi hoặc đi bộ trên đường ray. Chỉ qua đường sắt tại nơi được phép.","speech":"Tàu hỏa. Tàu hỏa gồm đầu máy hoặc các toa có hệ thống kéo đẩy, chạy trên hai đường ray song song. Bánh tàu được thiết kế để bám và dẫn hướng theo đường ray. Tàu có thể chở rất nhiều người hoặc hàng hóa. Không chơi hoặc đi bộ trên đường ray. Chỉ qua đường sắt tại nơi được phép.","facts":[{"label":"Đường chạy","value":"Đường ray"},{"label":"Bánh","value":"Được dẫn hướng bởi ray"},{"label":"Có thể chở","value":"Người và hàng"},{"label":"An toàn","value":"Không chơi trên đường ray"}]},{"id":"boat","name":"Thuyền","icon":"⛵","kicker":"PHƯƠNG TIỆN","subtitle":"Di chuyển trên mặt nước","summary":"Thuyền là phương tiện đường thủy, có thể dùng mái chèo, buồm hoặc động cơ.","more":"Thân thuyền có hình dạng giúp nó nổi và di chuyển trong nước. Áo phao là thiết bị an toàn rất quan trọng trên nhiều loại thuyền.","remember":"Khi đi thuyền, bé phải nghe hướng dẫn của người lớn và mặc áo phao phù hợp khi được yêu cầu.","speech":"Thuyền. Thuyền là phương tiện đường thủy, có thể dùng mái chèo, buồm hoặc động cơ. Thân thuyền có hình dạng giúp nó nổi và di chuyển trong nước. Áo phao là thiết bị an toàn rất quan trọng trên nhiều loại thuyền. Khi đi thuyền, bé phải nghe hướng dẫn của người lớn và mặc áo phao phù hợp khi được yêu cầu.","facts":[{"label":"Môi trường","value":"Mặt nước"},{"label":"Có thể dùng","value":"Mái chèo, buồm, động cơ"},{"label":"Nổi nhờ","value":"Hình dạng và lực nổi"},{"label":"An toàn","value":"Áo phao"}]},{"id":"ship","name":"Tàu thủy","icon":"🚢","kicker":"PHƯƠNG TIỆN","subtitle":"Phương tiện lớn trên biển và sông lớn","summary":"Tàu thủy lớn có thể chở rất nhiều hành khách hoặc hàng hóa qua sông, biển.","more":"Nhiều tàu dùng động cơ quay chân vịt để đẩy nước về sau và tạo lực đẩy tàu tiến lên. Bánh lái hoặc hệ thống điều khiển giúp đổi hướng.","remember":"Tàu thủy phải tuân theo quy tắc hàng hải và thiết bị an toàn.","speech":"Tàu thủy. Tàu thủy lớn có thể chở rất nhiều hành khách hoặc hàng hóa qua sông, biển. Nhiều tàu dùng động cơ quay chân vịt để đẩy nước về sau và tạo lực đẩy tàu tiến lên. Bánh lái hoặc hệ thống điều khiển giúp đổi hướng. Tàu thủy phải tuân theo quy tắc hàng hải và thiết bị an toàn.","facts":[{"label":"Kích thước","value":"Thường lớn hơn thuyền"},{"label":"Lực đẩy","value":"Động cơ và chân vịt"},{"label":"Đổi hướng","value":"Bánh lái/hệ thống lái"},{"label":"Chở","value":"Người hoặc hàng"}]},{"id":"airplane","name":"Máy bay","icon":"✈️","kicker":"PHƯƠNG TIỆN","subtitle":"Bay nhờ cánh và lực đẩy","summary":"Máy bay có cánh tạo lực nâng khi không khí chuyển động quanh cánh, đồng thời động cơ tạo lực đẩy.","more":"Đuôi máy bay có các bề mặt điều khiển giúp giữ ổn định và đổi hướng. Máy bay cần đường băng để cất và hạ cánh trong nhiều trường hợp.","remember":"Khi đi máy bay, hành khách phải thắt dây an toàn khi được yêu cầu.","speech":"Máy bay. Máy bay có cánh tạo lực nâng khi không khí chuyển động quanh cánh, đồng thời động cơ tạo lực đẩy. Đuôi máy bay có các bề mặt điều khiển giúp giữ ổn định và đổi hướng. Máy bay cần đường băng để cất và hạ cánh trong nhiều trường hợp. Khi đi máy bay, hành khách phải thắt dây an toàn khi được yêu cầu.","facts":[{"label":"Bay nhờ","value":"Lực nâng"},{"label":"Tạo lực đẩy","value":"Động cơ"},{"label":"Điều khiển","value":"Cánh và đuôi"},{"label":"Cất/hạ cánh","value":"Thường dùng đường băng"}]},{"id":"helicopter","name":"Trực thăng","icon":"🚁","kicker":"PHƯƠNG TIỆN","subtitle":"Cánh quạt lớn quay phía trên","summary":"Trực thăng dùng rotor chính quay nhanh để tạo lực nâng.","more":"Trực thăng có thể cất cánh và hạ cánh gần như thẳng đứng, đồng thời có thể đứng yên tương đối trên không trong một số điều kiện.","remember":"Rotor quay rất nguy hiểm, vì vậy phải luôn giữ khoảng cách và làm theo hướng dẫn an toàn.","speech":"Trực thăng. Trực thăng dùng rotor chính quay nhanh để tạo lực nâng. Trực thăng có thể cất cánh và hạ cánh gần như thẳng đứng, đồng thời có thể đứng yên tương đối trên không trong một số điều kiện. Rotor quay rất nguy hiểm, vì vậy phải luôn giữ khoảng cách và làm theo hướng dẫn an toàn.","facts":[{"label":"Tạo lực nâng","value":"Rotor chính"},{"label":"Cất cánh","value":"Có thể gần thẳng đứng"},{"label":"Khả năng","value":"Có thể bay treo"},{"label":"An toàn","value":"Tránh xa rotor"}]}],"secondary":[{"id":"wheel_axle","name":"Bánh xe và trục","icon":"⚙️","kicker":"CÁCH HOẠT ĐỘNG & AN TOÀN","subtitle":"Giúp phương tiện lăn dễ hơn","summary":"Bánh xe quay quanh trục giúp giảm ma sát trượt và làm việc di chuyển trên bề mặt thuận lợi hơn.","more":"Bánh xe xuất hiện trên xe đạp, ô tô, xe buýt và cả tàu hỏa, nhưng hình dạng và vật liệu khác nhau tùy nhiệm vụ.","remember":"Bánh xe là một trong những phát minh cơ khí quan trọng của con người.","speech":"Bánh xe và trục. Bánh xe quay quanh trục giúp giảm ma sát trượt và làm việc di chuyển trên bề mặt thuận lợi hơn. Bánh xe xuất hiện trên xe đạp, ô tô, xe buýt và cả tàu hỏa, nhưng hình dạng và vật liệu khác nhau tùy nhiệm vụ. Bánh xe là một trong những phát minh cơ khí quan trọng của con người.","facts":[{"label":"Chuyển động","value":"Quay quanh trục"},{"label":"Lợi ích","value":"Giúp di chuyển dễ hơn"},{"label":"Có trên","value":"Nhiều phương tiện"},{"label":"Khác nhau","value":"Kích thước và vật liệu"}]},{"id":"engine_motor","name":"Động cơ và mô-tơ","icon":"🔋","kicker":"CÁCH HOẠT ĐỘNG & AN TOÀN","subtitle":"Biến năng lượng thành chuyển động","summary":"Động cơ hoặc mô-tơ biến năng lượng thành lực giúp phương tiện chuyển động.","more":"Mô-tơ điện dùng điện năng. Động cơ đốt trong dùng năng lượng hóa học của nhiên liệu. Một số phương tiện dùng kết hợp nhiều nguồn năng lượng.","remember":"Không tự ý chạm vào động cơ đang hoạt động vì có thể nóng hoặc nguy hiểm.","speech":"Động cơ và mô-tơ. Động cơ hoặc mô-tơ biến năng lượng thành lực giúp phương tiện chuyển động. Mô-tơ điện dùng điện năng. Động cơ đốt trong dùng năng lượng hóa học của nhiên liệu. Một số phương tiện dùng kết hợp nhiều nguồn năng lượng. Không tự ý chạm vào động cơ đang hoạt động vì có thể nóng hoặc nguy hiểm.","facts":[{"label":"Mô-tơ điện","value":"Dùng điện"},{"label":"Động cơ đốt trong","value":"Dùng nhiên liệu"},{"label":"Mục tiêu","value":"Tạo lực chuyển động"},{"label":"An toàn","value":"Không tự chạm máy đang chạy"}]},{"id":"rail","name":"Đường ray","icon":"🛤️","kicker":"CÁCH HOẠT ĐỘNG & AN TOÀN","subtitle":"Dẫn hướng cho tàu hỏa","summary":"Hai thanh ray thép tạo đường chạy cố định cho tàu.","more":"Bánh tàu có vành đặc biệt giúp giữ bánh đi theo ray. Vì tàu rất nặng và cần quãng đường dài để dừng, đường sắt có quy tắc an toàn nghiêm ngặt.","remember":"Chỉ qua đường sắt tại nơi được phép và khi tín hiệu cho phép.","speech":"Đường ray. Hai thanh ray thép tạo đường chạy cố định cho tàu. Bánh tàu có vành đặc biệt giúp giữ bánh đi theo ray. Vì tàu rất nặng và cần quãng đường dài để dừng, đường sắt có quy tắc an toàn nghiêm ngặt. Chỉ qua đường sắt tại nơi được phép và khi tín hiệu cho phép.","facts":[{"label":"Vật liệu thường","value":"Thép"},{"label":"Vai trò","value":"Dẫn hướng"},{"label":"Tàu","value":"Khó dừng nhanh"},{"label":"Qua đường","value":"Đúng nơi và tín hiệu"}]},{"id":"float_propeller","name":"Nổi và chân vịt","icon":"🌊","kicker":"CÁCH HOẠT ĐỘNG & AN TOÀN","subtitle":"Cách nhiều tàu thuyền đi trên nước","summary":"Một vật nổi khi lực đẩy của nước có thể cân bằng trọng lượng của nó.","more":"Nhiều tàu dùng chân vịt quay để đẩy nước về phía sau, từ đó tạo lực đẩy tàu về phía trước.","remember":"Hình dạng thân tàu giúp phân bố khối lượng và di chuyển ổn định hơn.","speech":"Nổi và chân vịt. Một vật nổi khi lực đẩy của nước có thể cân bằng trọng lượng của nó. Nhiều tàu dùng chân vịt quay để đẩy nước về phía sau, từ đó tạo lực đẩy tàu về phía trước. Hình dạng thân tàu giúp phân bố khối lượng và di chuyển ổn định hơn.","facts":[{"label":"Lực quan trọng","value":"Lực nổi"},{"label":"Chân vịt","value":"Đẩy nước về sau"},{"label":"Kết quả","value":"Tàu tiến về trước"},{"label":"Thân tàu","value":"Giúp nổi và ổn định"}]},{"id":"wing_lift","name":"Cánh và lực nâng","icon":"🪽","kicker":"CÁCH HOẠT ĐỘNG & AN TOÀN","subtitle":"Giúp máy bay ở trên không","summary":"Cánh máy bay được thiết kế để tạo lực nâng khi máy bay chuyển động trong không khí.","more":"Động cơ tạo lực đẩy, còn cánh tạo phần lớn lực nâng. Phi công điều khiển nhiều bề mặt trên cánh và đuôi để đổi hướng.","remember":"Máy bay không bay chỉ vì nhẹ; nó cần đủ lực nâng và lực đẩy.","speech":"Cánh và lực nâng. Cánh máy bay được thiết kế để tạo lực nâng khi máy bay chuyển động trong không khí. Động cơ tạo lực đẩy, còn cánh tạo phần lớn lực nâng. Phi công điều khiển nhiều bề mặt trên cánh và đuôi để đổi hướng. Máy bay không bay chỉ vì nhẹ; nó cần đủ lực nâng và lực đẩy.","facts":[{"label":"Cánh","value":"Tạo lực nâng"},{"label":"Động cơ","value":"Tạo lực đẩy"},{"label":"Điều khiển","value":"Bề mặt cánh và đuôi"},{"label":"Không khí","value":"Chảy quanh cánh"}]},{"id":"traffic_safety","name":"An toàn giao thông","icon":"🚦","kicker":"CÁCH HOẠT ĐỘNG & AN TOÀN","subtitle":"Đi đúng luật để bảo vệ mọi người","summary":"Đèn tín hiệu, vạch qua đường, mũ bảo hiểm, dây an toàn và các quy tắc giao thông giúp giảm nguy cơ tai nạn.","more":"Trẻ em nên đi cùng người lớn ở nơi đông xe, qua đường tại vị trí an toàn và luôn quan sát theo hướng dẫn.","remember":"Không chạy bất ngờ xuống lòng đường và không chơi trên đường ray.","speech":"An toàn giao thông. Đèn tín hiệu, vạch qua đường, mũ bảo hiểm, dây an toàn và các quy tắc giao thông giúp giảm nguy cơ tai nạn. Trẻ em nên đi cùng người lớn ở nơi đông xe, qua đường tại vị trí an toàn và luôn quan sát theo hướng dẫn. Không chạy bất ngờ xuống lòng đường và không chơi trên đường ray.","facts":[{"label":"Xe máy/xe đạp phù hợp","value":"Đội mũ bảo hiểm"},{"label":"Ô tô","value":"Thắt dây an toàn"},{"label":"Qua đường","value":"Đúng nơi quy định"},{"label":"Đường sắt","value":"Không chơi trên ray"}]}],"quiz":[{"q":"Phương tiện giúp con người làm gì?","a":["Di chuyển và vận chuyển hàng hóa","Làm Mặt Trời mọc","Tạo mưa","Làm cây lớn"],"c":0,"note":"Phương tiện giúp đi lại và chở hàng."},{"q":"Xe đạp thường dùng nguồn năng lượng nào?","a":["Sức người","Năng lượng từ sóng biển","Chỉ gió","Hơi nước từ mây"],"c":0,"note":"Xe đạp dùng sức người qua bàn đạp."},{"q":"Tàu hỏa chạy chủ yếu trên đâu?","a":["Đường ray","Đường băng","Mặt biển","Vỉa hè"],"c":0,"note":"Tàu hỏa chạy theo đường ray."},{"q":"Máy bay thuộc nhóm phương tiện nào?","a":["Hàng không","Đường thủy","Đường sắt","Chỉ đường bộ"],"c":0,"note":"Máy bay là phương tiện hàng không."},{"q":"Thuyền và tàu thủy di chuyển chủ yếu ở đâu?","a":["Trên mặt nước","Trong đường hầm","Trên đường ray","Trên mái nhà"],"c":0,"note":"Thuyền và tàu thủy là phương tiện đường thủy."},{"q":"Khi đi phương tiện, điều gì luôn quan trọng?","a":["An toàn giao thông","Chạy nhanh nhất","Ngồi sai vị trí","Không nghe người lớn"],"c":0,"note":"An toàn phải được ưu tiên."},{"q":"Bàn đạp và xích xe đạp giúp làm gì?","a":["Truyền lực tới bánh xe","Làm còi kêu","Bật đèn giao thông","Làm mây bay"],"c":0,"note":"Bàn đạp và xích truyền lực làm bánh xe quay."},{"q":"Xe đạp đổi hướng bằng bộ phận nào?","a":["Tay lái","Yên xe","Bàn đạp","Chuông"],"c":0,"note":"Tay lái giúp đổi hướng."},{"q":"Bộ phận nào giúp xe đạp giảm tốc?","a":["Phanh","Xích","Bàn đạp","Nan hoa"],"c":0,"note":"Phanh giúp giảm tốc."},{"q":"Xe máy thường có bao nhiêu bánh?","a":["2","1","3 đôi","6"],"c":0,"note":"Xe máy thường có hai bánh."},{"q":"Xe máy tạo lực chuyển động nhờ gì?","a":["Động cơ hoặc mô-tơ","Chỉ sức gió","Dòng sông","Cánh buồm"],"c":0,"note":"Xe máy dùng động cơ hoặc mô-tơ."},{"q":"Người đi xe máy cần dùng thiết bị an toàn nào?","a":["Mũ bảo hiểm","Áo phao trên đường bộ","Kính lặn","Vây bơi"],"c":0,"note":"Mũ bảo hiểm rất quan trọng."},{"q":"Ô tô thường có bao nhiêu bánh?","a":["4","2","8 chân","1"],"c":0,"note":"Ô tô thường có bốn bánh."},{"q":"Dây an toàn trong ô tô giúp gì?","a":["Giữ người ngồi đúng vị trí khi xe dừng gấp hoặc va chạm","Làm xe bay","Tăng tốc xe","Đổi màu xe"],"c":0,"note":"Dây an toàn giúp bảo vệ người ngồi."},{"q":"Xe buýt là loại phương tiện gì?","a":["Giao thông công cộng","Tàu thủy","Máy bay","Xe chỉ chở một người"],"c":0,"note":"Xe buýt chở nhiều hành khách trên tuyến."},{"q":"Khi lên xuống xe buýt, nên đợi khi nào?","a":["Xe đã dừng hẳn","Xe đang chạy nhanh","Xe vừa rẽ","Bất cứ lúc nào"],"c":0,"note":"Nên lên xuống khi xe dừng hẳn."},{"q":"Bánh tàu hỏa được thiết kế để làm gì?","a":["Đi theo đường ray","Bay trên không","Nổi trên nước","Chạy trên cát tự do"],"c":0,"note":"Bánh tàu được dẫn hướng bởi ray."},{"q":"Có nên chơi trên đường ray không?","a":["Không","Có nếu vắng","Có vào ban đêm","Chỉ khi có người lớn"],"c":0,"note":"Không chơi hoặc đi bộ trên đường ray."},{"q":"Thuyền có thể dùng cách nào để di chuyển?","a":["Mái chèo, buồm hoặc động cơ","Chỉ cánh máy bay","Chỉ đường ray","Chỉ chân người đi bộ"],"c":0,"note":"Thuyền có nhiều cách tạo lực đẩy."},{"q":"Thiết bị an toàn quan trọng khi đi thuyền là gì?","a":["Áo phao","Mũ len","Giày trượt","Kính đọc sách"],"c":0,"note":"Áo phao là thiết bị an toàn quan trọng."},{"q":"Nhiều tàu thủy dùng gì để đẩy nước về sau?","a":["Chân vịt","Bánh xe đạp","Cánh quạt trần","Đường ray"],"c":0,"note":"Chân vịt tạo lực đẩy cho tàu."},{"q":"Bánh lái hoặc hệ thống lái tàu giúp gì?","a":["Đổi hướng","Làm nước ngọt hơn","Tạo mây","Làm tàu nhẹ đi"],"c":0,"note":"Hệ thống lái giúp đổi hướng."},{"q":"Cánh máy bay tạo chủ yếu lực nào?","a":["Lực nâng","Lực kéo xuống","Lực nổi trong nước","Lực ma sát đất"],"c":0,"note":"Cánh tạo phần lớn lực nâng."},{"q":"Động cơ máy bay tạo chủ yếu lực nào?","a":["Lực đẩy","Lực nổi","Lực hút xuống đất","Lực của đường ray"],"c":0,"note":"Động cơ tạo lực đẩy."},{"q":"Máy bay thường dùng gì để cất và hạ cánh?","a":["Đường băng","Đường ray","Vạch qua đường","Bến thuyền"],"c":0,"note":"Máy bay thường dùng đường băng."},{"q":"Trực thăng tạo lực nâng chủ yếu bằng gì?","a":["Rotor chính quay phía trên","Đường ray","Chân vịt dưới nước","Bàn đạp"],"c":0,"note":"Rotor chính tạo lực nâng."},{"q":"Trực thăng có thể làm điều gì mà máy bay cánh cố định thường không làm được?","a":["Cất cánh gần thẳng đứng","Chạy trên đường ray","Lặn dưới biển","Đi bằng bàn đạp"],"c":0,"note":"Trực thăng có thể cất và hạ cánh gần thẳng đứng."},{"q":"Có nên đứng gần rotor trực thăng đang quay không?","a":["Không","Có","Chỉ trẻ em được","Chỉ ban ngày"],"c":0,"note":"Rotor quay rất nguy hiểm."},{"q":"Bánh xe quay quanh bộ phận nào?","a":["Trục","Cánh","Râu","Cột buồm"],"c":0,"note":"Bánh xe quay quanh trục."},{"q":"Bánh xe và trục giúp ích gì?","a":["Giúp di chuyển dễ hơn","Làm xe thành tàu","Tạo mây","Làm nước đóng băng"],"c":0,"note":"Bánh xe và trục giúp phương tiện lăn."},{"q":"Mô-tơ điện dùng nguồn năng lượng nào?","a":["Điện","Chỉ gió","Chỉ ánh nắng trực tiếp không qua thiết bị","Nước mưa"],"c":0,"note":"Mô-tơ điện dùng điện năng."},{"q":"Động cơ đốt trong thường dùng gì?","a":["Nhiên liệu","Đường ray","Áo phao","Cánh buồm"],"c":0,"note":"Động cơ đốt trong dùng năng lượng hóa học từ nhiên liệu."},{"q":"Vì sao tàu hỏa cần tuân thủ nghiêm tín hiệu đường sắt?","a":["Tàu nặng và cần quãng đường dài để dừng","Tàu không có bánh","Tàu luôn bay","Ray làm bằng gỗ mềm"],"c":0,"note":"Tàu rất nặng và khó dừng nhanh."},{"q":"Một vật nổi trên nước khi lực nào đủ để cân bằng trọng lượng của nó?","a":["Lực nổi","Lực của đèn","Lực từ đường ray","Lực của còi"],"c":0,"note":"Lực nổi của nước giúp vật nổi."},{"q":"Chân vịt đẩy nước về sau thì tàu thường chuyển động thế nào?","a":["Tiến về trước","Bay lên trời","Đứng yên hoàn toàn","Chìm ngay"],"c":0,"note":"Đẩy nước về sau tạo lực đẩy tàu về trước."},{"q":"Máy bay có bay chỉ vì nhẹ không?","a":["Không, cần lực nâng và lực đẩy phù hợp","Có, chỉ cần nhẹ","Chỉ cần màu trắng","Chỉ cần nhiều cửa sổ"],"c":0,"note":"Bay cần các lực khí động học phù hợp."},{"q":"Khi ngồi ô tô, bé nên làm gì?","a":["Thắt dây an toàn phù hợp","Thò người ra cửa sổ","Đứng lên khi xe chạy","Tự mở cửa"],"c":0,"note":"Dây an toàn giúp bảo vệ hành khách."},{"q":"Qua đường nên làm gì?","a":["Qua tại nơi an toàn và theo hướng dẫn","Chạy bất ngờ xuống đường","Nhắm mắt chạy","Chơi giữa lòng đường"],"c":0,"note":"Qua đường đúng nơi và quan sát là an toàn hơn."},{"q":"Phương tiện nào trong bài đi trên ray?","a":["Tàu hỏa","Máy bay","Thuyền","Xe đạp"],"c":0,"note":"Tàu hỏa đi trên đường ray."},{"q":"Phương tiện nào trong bài có rotor lớn phía trên?","a":["Trực thăng","Xe buýt","Tàu thủy","Xe đạp"],"c":0,"note":"Trực thăng dùng rotor chính."}]});
  const SCENE_HTML = "<div class=\"gx-scene-bg\" style=\"background:linear-gradient(180deg,#BAE6FD 0%,#E0F2FE 46%,#DCFCE7 46%,#DCFCE7 63%,#9CA3AF 63%,#6B7280 76%,#7DD3FC 76%,#0EA5E9 100%)\"><div style=\"position:absolute;left:0;right:0;top:70%;height:3px;background:#E5E7EB\"></div><div style=\"position:absolute;left:0;right:0;top:72%;height:2px;background:#374151\"></div><button class=\"gx-hotspot\" type=\"button\" data-object=\"airplane\" style=\"left:58%;top:8%;--gx-size:68px\" aria-label=\"Máy bay\">\n              <span class=\"gx-hotspot-icon\">✈️</span><small>Máy bay</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"helicopter\" style=\"left:18%;top:8%;--gx-size:68px\" aria-label=\"Trực thăng\">\n              <span class=\"gx-hotspot-icon\">🚁</span><small>Trực thăng</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"bicycle\" style=\"left:10%;top:48%;--gx-size:58px\" aria-label=\"Xe đạp\">\n              <span class=\"gx-hotspot-icon\">🚲</span><small>Xe đạp</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"car\" style=\"left:42%;top:49%;--gx-size:60px\" aria-label=\"Ô tô\">\n              <span class=\"gx-hotspot-icon\">🚗</span><small>Ô tô</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"bus\" style=\"left:69%;top:47%;--gx-size:62px\" aria-label=\"Xe buýt\">\n              <span class=\"gx-hotspot-icon\">🚌</span><small>Xe buýt</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"train\" style=\"left:22%;top:67%;--gx-size:64px\" aria-label=\"Tàu hỏa\">\n              <span class=\"gx-hotspot-icon\">🚆</span><small>Tàu hỏa</small>\n            </button><button class=\"gx-hotspot\" type=\"button\" data-object=\"boat\" style=\"left:72%;top:77%;--gx-size:58px\" aria-label=\"Thuyền\">\n              <span class=\"gx-hotspot-icon\">⛵</span><small>Thuyền</small>\n            </button></div>";

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
