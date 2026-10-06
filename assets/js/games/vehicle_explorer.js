(() => {
  "use strict";

  /* =====================================================================
     Khám phá phương tiện — bản nâng cấp
     Giữ nguyên giao diện module: window.CLASS1_GAME_MODULES.vehicleExplorer
     = { render(context), destroy() }, context.host, context.hooks.setSubBanner
     ===================================================================== */

  const CONFIG = Object.freeze({
    moduleKey: "vehicleExplorer",
    styleId: "class1-game-vehicle-explorer-style-v2",
    fontId: "class1-game-explorer-font",
    rootId: "vehicle-explorer",
    title: "Khám phá phương tiện",
    subtitle: "Cùng Cô Thỏ Hồng tìm hiểu cách chúng ta di chuyển",
    storageKey: "class1.vehicleExplorer.found.v1",
    roundSize: 10
  });

  const DATA = Object.freeze({"overview": {"id": "vehicle-overview", "name": "Thế giới phương tiện", "subtitle": "Giúp con người di chuyển và vận chuyển hàng hóa", "summary": "Phương tiện giúp con người đi lại và chở hàng từ nơi này tới nơi khác. Có phương tiện chạy trên đường, đường sắt, mặt nước hoặc bay trong không khí.", "more": "Mỗi loại phương tiện có cấu tạo và cách hoạt động khác nhau. Xe đạp dùng sức người, ô tô và tàu có thể dùng động cơ, máy bay cần cánh tạo lực nâng, tàu thủy cần nổi trên nước.", "remember": "Bé nhớ: khám phá phương tiện luôn đi cùng an toàn giao thông. Đi đúng nơi, đội mũ bảo hiểm khi cần và thắt dây an toàn theo hướng dẫn của người lớn.", "facts": [{"label": "Đường bộ", "value": "Xe đạp, xe máy, ô tô, xe buýt"}, {"label": "Đường sắt", "value": "Tàu hỏa"}, {"label": "Đường thủy", "value": "Thuyền, tàu"}, {"label": "Hàng không", "value": "Máy bay, trực thăng"}, {"label": "Năng lượng", "value": "Sức người, điện hoặc nhiên liệu"}, {"label": "An toàn", "value": "Tuân thủ luật và hướng dẫn"}]}, "primary": [{"id": "bicycle", "name": "Xe đạp", "subtitle": "Dùng sức người và hai bánh", "summary": "Xe đạp thường có hai bánh, bàn đạp, xích, phanh và tay lái.", "more": "Khi đạp, lực từ chân truyền qua bàn đạp và xích để làm bánh sau quay. Người lái dùng tay lái để đổi hướng và phanh để giảm tốc.", "remember": "Khi đi xe đạp, bé cần đội mũ bảo hiểm phù hợp và đi ở nơi an toàn theo hướng dẫn của người lớn.", "facts": [{"label": "Năng lượng", "value": "Sức người"}, {"label": "Truyền lực", "value": "Bàn đạp và xích"}, {"label": "Đổi hướng", "value": "Tay lái"}, {"label": "Giảm tốc", "value": "Phanh"}]}, {"id": "motorbike", "name": "Xe máy", "subtitle": "Phương tiện hai bánh có động cơ", "summary": "Xe máy thường có hai bánh và dùng động cơ điện hoặc động cơ đốt trong để tạo lực chuyển động.", "more": "Người lái điều khiển hướng bằng tay lái và giảm tốc bằng phanh. Cân bằng rất quan trọng vì xe chỉ có hai bánh.", "remember": "Người đi xe máy phải đội mũ bảo hiểm đúng cách và tuân thủ quy định giao thông.", "facts": [{"label": "Số bánh thường gặp", "value": "2"}, {"label": "Nguồn lực", "value": "Động cơ"}, {"label": "Điều khiển", "value": "Tay lái"}, {"label": "An toàn", "value": "Mũ bảo hiểm"}]}, {"id": "car", "name": "Ô tô", "subtitle": "Bốn bánh và khoang chở người", "summary": "Ô tô thường có bốn bánh, hệ thống lái, phanh và động cơ hoặc mô-tơ điện.", "more": "Dây an toàn giúp giữ người ngồi đúng vị trí khi xe phanh gấp hoặc va chạm. Trẻ em cần ngồi đúng vị trí và dùng thiết bị an toàn phù hợp.", "remember": "Không tự mở cửa xe khi chưa được người lớn cho phép.", "facts": [{"label": "Bánh thường gặp", "value": "4"}, {"label": "Tạo lực", "value": "Động cơ hoặc mô-tơ điện"}, {"label": "Đổi hướng", "value": "Hệ thống lái"}, {"label": "An toàn", "value": "Dây an toàn"}]}, {"id": "bus", "name": "Xe buýt", "subtitle": "Chở nhiều người trên cùng tuyến", "summary": "Xe buýt là phương tiện công cộng đường bộ có thể chở nhiều hành khách.", "more": "Xe buýt thường dừng ở các điểm hoặc trạm quy định. Hành khách nên chờ xe ở nơi an toàn và lên xuống khi xe đã dừng hẳn.", "remember": "Đi xe buýt giúp nhiều người cùng sử dụng một phương tiện.", "facts": [{"label": "Loại", "value": "Giao thông công cộng"}, {"label": "Chở", "value": "Nhiều hành khách"}, {"label": "Dừng", "value": "Điểm/trạm quy định"}, {"label": "An toàn", "value": "Chờ xe dừng hẳn"}]}, {"id": "train", "name": "Tàu hỏa", "subtitle": "Chạy trên đường ray", "summary": "Tàu hỏa gồm đầu máy hoặc các toa có hệ thống kéo đẩy, chạy trên hai đường ray song song.", "more": "Bánh tàu được thiết kế để bám và dẫn hướng theo đường ray. Tàu có thể chở rất nhiều người hoặc hàng hóa.", "remember": "Không chơi hoặc đi bộ trên đường ray. Chỉ qua đường sắt tại nơi được phép.", "facts": [{"label": "Đường chạy", "value": "Đường ray"}, {"label": "Bánh", "value": "Được dẫn hướng bởi ray"}, {"label": "Có thể chở", "value": "Người và hàng"}, {"label": "An toàn", "value": "Không chơi trên đường ray"}]}, {"id": "boat", "name": "Thuyền", "subtitle": "Di chuyển trên mặt nước", "summary": "Thuyền là phương tiện đường thủy, có thể dùng mái chèo, buồm hoặc động cơ.", "more": "Thân thuyền có hình dạng giúp nó nổi và di chuyển trong nước. Áo phao là thiết bị an toàn rất quan trọng trên nhiều loại thuyền.", "remember": "Khi đi thuyền, bé phải nghe hướng dẫn của người lớn và mặc áo phao phù hợp khi được yêu cầu.", "facts": [{"label": "Môi trường", "value": "Mặt nước"}, {"label": "Có thể dùng", "value": "Mái chèo, buồm, động cơ"}, {"label": "Nổi nhờ", "value": "Hình dạng và lực nổi"}, {"label": "An toàn", "value": "Áo phao"}]}, {"id": "ship", "name": "Tàu thủy", "subtitle": "Phương tiện lớn trên biển và sông lớn", "summary": "Tàu thủy lớn có thể chở rất nhiều hành khách hoặc hàng hóa qua sông, biển.", "more": "Nhiều tàu dùng động cơ quay chân vịt để đẩy nước về sau và tạo lực đẩy tàu tiến lên. Bánh lái hoặc hệ thống điều khiển giúp đổi hướng.", "remember": "Tàu thủy phải tuân theo quy tắc hàng hải và thiết bị an toàn.", "facts": [{"label": "Kích thước", "value": "Thường lớn hơn thuyền"}, {"label": "Lực đẩy", "value": "Động cơ và chân vịt"}, {"label": "Đổi hướng", "value": "Bánh lái/hệ thống lái"}, {"label": "Chở", "value": "Người hoặc hàng"}]}, {"id": "airplane", "name": "Máy bay", "subtitle": "Bay nhờ cánh và lực đẩy", "summary": "Máy bay có cánh tạo lực nâng khi không khí chuyển động quanh cánh, đồng thời động cơ tạo lực đẩy.", "more": "Đuôi máy bay có các bề mặt điều khiển giúp giữ ổn định và đổi hướng. Máy bay cần đường băng để cất và hạ cánh trong nhiều trường hợp.", "remember": "Khi đi máy bay, hành khách phải thắt dây an toàn khi được yêu cầu.", "facts": [{"label": "Bay nhờ", "value": "Lực nâng"}, {"label": "Tạo lực đẩy", "value": "Động cơ"}, {"label": "Điều khiển", "value": "Cánh và đuôi"}, {"label": "Cất/hạ cánh", "value": "Thường dùng đường băng"}]}, {"id": "helicopter", "name": "Trực thăng", "subtitle": "Cánh quạt lớn quay phía trên", "summary": "Trực thăng dùng rotor chính quay nhanh để tạo lực nâng.", "more": "Trực thăng có thể cất cánh và hạ cánh gần như thẳng đứng, đồng thời có thể đứng yên tương đối trên không trong một số điều kiện.", "remember": "Rotor quay rất nguy hiểm, vì vậy phải luôn giữ khoảng cách và làm theo hướng dẫn an toàn.", "facts": [{"label": "Tạo lực nâng", "value": "Rotor chính"}, {"label": "Cất cánh", "value": "Có thể gần thẳng đứng"}, {"label": "Khả năng", "value": "Có thể bay treo"}, {"label": "An toàn", "value": "Tránh xa rotor"}]}], "secondary": [{"id": "wheel_axle", "name": "Bánh xe và trục", "subtitle": "Giúp phương tiện lăn dễ hơn", "summary": "Bánh xe quay quanh trục giúp giảm ma sát trượt và làm việc di chuyển trên bề mặt thuận lợi hơn.", "more": "Bánh xe xuất hiện trên xe đạp, ô tô, xe buýt và cả tàu hỏa, nhưng hình dạng và vật liệu khác nhau tùy nhiệm vụ.", "remember": "Bánh xe là một trong những phát minh cơ khí quan trọng của con người.", "facts": [{"label": "Chuyển động", "value": "Quay quanh trục"}, {"label": "Lợi ích", "value": "Giúp di chuyển dễ hơn"}, {"label": "Có trên", "value": "Nhiều phương tiện"}, {"label": "Khác nhau", "value": "Kích thước và vật liệu"}]}, {"id": "engine_motor", "name": "Động cơ và mô-tơ", "subtitle": "Biến năng lượng thành chuyển động", "summary": "Động cơ hoặc mô-tơ biến năng lượng thành lực giúp phương tiện chuyển động.", "more": "Mô-tơ điện dùng điện năng. Động cơ đốt trong dùng năng lượng hóa học của nhiên liệu. Một số phương tiện dùng kết hợp nhiều nguồn năng lượng.", "remember": "Không tự ý chạm vào động cơ đang hoạt động vì có thể nóng hoặc nguy hiểm.", "facts": [{"label": "Mô-tơ điện", "value": "Dùng điện"}, {"label": "Động cơ đốt trong", "value": "Dùng nhiên liệu"}, {"label": "Mục tiêu", "value": "Tạo lực chuyển động"}, {"label": "An toàn", "value": "Không tự chạm máy đang chạy"}]}, {"id": "rail", "name": "Đường ray", "subtitle": "Dẫn hướng cho tàu hỏa", "summary": "Hai thanh ray thép tạo đường chạy cố định cho tàu.", "more": "Bánh tàu có vành đặc biệt giúp giữ bánh đi theo ray. Vì tàu rất nặng và cần quãng đường dài để dừng, đường sắt có quy tắc an toàn nghiêm ngặt.", "remember": "Chỉ qua đường sắt tại nơi được phép và khi tín hiệu cho phép.", "facts": [{"label": "Vật liệu thường", "value": "Thép"}, {"label": "Vai trò", "value": "Dẫn hướng"}, {"label": "Tàu", "value": "Khó dừng nhanh"}, {"label": "Qua đường", "value": "Đúng nơi và tín hiệu"}]}, {"id": "float_propeller", "name": "Nổi và chân vịt", "subtitle": "Cách nhiều tàu thuyền đi trên nước", "summary": "Một vật nổi khi lực đẩy của nước có thể cân bằng trọng lượng của nó.", "more": "Nhiều tàu dùng chân vịt quay để đẩy nước về phía sau, từ đó tạo lực đẩy tàu về phía trước.", "remember": "Hình dạng thân tàu giúp phân bố khối lượng và di chuyển ổn định hơn.", "facts": [{"label": "Lực quan trọng", "value": "Lực nổi"}, {"label": "Chân vịt", "value": "Đẩy nước về sau"}, {"label": "Kết quả", "value": "Tàu tiến về trước"}, {"label": "Thân tàu", "value": "Giúp nổi và ổn định"}]}, {"id": "wing_lift", "name": "Cánh và lực nâng", "subtitle": "Giúp máy bay ở trên không", "summary": "Cánh máy bay được thiết kế để tạo lực nâng khi máy bay chuyển động trong không khí.", "more": "Động cơ tạo lực đẩy, còn cánh tạo phần lớn lực nâng. Phi công điều khiển nhiều bề mặt trên cánh và đuôi để đổi hướng.", "remember": "Máy bay không bay chỉ vì nhẹ; nó cần đủ lực nâng và lực đẩy.", "facts": [{"label": "Cánh", "value": "Tạo lực nâng"}, {"label": "Động cơ", "value": "Tạo lực đẩy"}, {"label": "Điều khiển", "value": "Bề mặt cánh và đuôi"}, {"label": "Không khí", "value": "Chảy quanh cánh"}]}, {"id": "traffic_safety", "name": "An toàn giao thông", "subtitle": "Đi đúng luật để bảo vệ mọi người", "summary": "Đèn tín hiệu, vạch qua đường, mũ bảo hiểm, dây an toàn và các quy tắc giao thông giúp giảm nguy cơ tai nạn.", "more": "Trẻ em nên đi cùng người lớn ở nơi đông xe, qua đường tại vị trí an toàn và luôn quan sát theo hướng dẫn.", "remember": "Không chạy bất ngờ xuống lòng đường và không chơi trên đường ray.", "facts": [{"label": "Xe máy/xe đạp phù hợp", "value": "Đội mũ bảo hiểm"}, {"label": "Ô tô", "value": "Thắt dây an toàn"}, {"label": "Qua đường", "value": "Đúng nơi quy định"}, {"label": "Đường sắt", "value": "Không chơi trên ray"}]}], "quiz": [{"q": "Phương tiện giúp con người làm gì?", "a": ["Di chuyển và vận chuyển hàng hóa", "Làm Mặt Trời mọc", "Tạo mưa", "Làm cây lớn"], "c": 0, "note": "Phương tiện giúp đi lại và chở hàng."}, {"q": "Xe đạp thường dùng nguồn năng lượng nào?", "a": ["Sức người", "Năng lượng từ sóng biển", "Chỉ gió", "Hơi nước từ mây"], "c": 0, "note": "Xe đạp dùng sức người qua bàn đạp."}, {"q": "Tàu hỏa chạy chủ yếu trên đâu?", "a": ["Đường ray", "Đường băng", "Mặt biển", "Vỉa hè"], "c": 0, "note": "Tàu hỏa chạy theo đường ray."}, {"q": "Máy bay thuộc nhóm phương tiện nào?", "a": ["Hàng không", "Đường thủy", "Đường sắt", "Chỉ đường bộ"], "c": 0, "note": "Máy bay là phương tiện hàng không."}, {"q": "Thuyền và tàu thủy di chuyển chủ yếu ở đâu?", "a": ["Trên mặt nước", "Trong đường hầm", "Trên đường ray", "Trên mái nhà"], "c": 0, "note": "Thuyền và tàu thủy là phương tiện đường thủy."}, {"q": "Khi đi phương tiện, điều gì luôn quan trọng?", "a": ["An toàn giao thông", "Chạy nhanh nhất", "Ngồi sai vị trí", "Không nghe người lớn"], "c": 0, "note": "An toàn phải được ưu tiên."}, {"q": "Bàn đạp và xích xe đạp giúp làm gì?", "a": ["Truyền lực tới bánh xe", "Làm còi kêu", "Bật đèn giao thông", "Làm mây bay"], "c": 0, "note": "Bàn đạp và xích truyền lực làm bánh xe quay."}, {"q": "Xe đạp đổi hướng bằng bộ phận nào?", "a": ["Tay lái", "Yên xe", "Bàn đạp", "Chuông"], "c": 0, "note": "Tay lái giúp đổi hướng."}, {"q": "Bộ phận nào giúp xe đạp giảm tốc?", "a": ["Phanh", "Xích", "Bàn đạp", "Nan hoa"], "c": 0, "note": "Phanh giúp giảm tốc."}, {"q": "Xe máy thường có bao nhiêu bánh?", "a": ["2", "1", "3 đôi", "6"], "c": 0, "note": "Xe máy thường có hai bánh."}, {"q": "Xe máy tạo lực chuyển động nhờ gì?", "a": ["Động cơ hoặc mô-tơ", "Chỉ sức gió", "Dòng sông", "Cánh buồm"], "c": 0, "note": "Xe máy dùng động cơ hoặc mô-tơ."}, {"q": "Người đi xe máy cần dùng thiết bị an toàn nào?", "a": ["Mũ bảo hiểm", "Áo phao trên đường bộ", "Kính lặn", "Vây bơi"], "c": 0, "note": "Mũ bảo hiểm rất quan trọng."}, {"q": "Ô tô thường có bao nhiêu bánh?", "a": ["4", "2", "8 chân", "1"], "c": 0, "note": "Ô tô thường có bốn bánh."}, {"q": "Dây an toàn trong ô tô giúp gì?", "a": ["Giữ người ngồi đúng vị trí khi xe dừng gấp hoặc va chạm", "Làm xe bay", "Tăng tốc xe", "Đổi màu xe"], "c": 0, "note": "Dây an toàn giúp bảo vệ người ngồi."}, {"q": "Xe buýt là loại phương tiện gì?", "a": ["Giao thông công cộng", "Tàu thủy", "Máy bay", "Xe chỉ chở một người"], "c": 0, "note": "Xe buýt chở nhiều hành khách trên tuyến."}, {"q": "Khi lên xuống xe buýt, nên đợi khi nào?", "a": ["Xe đã dừng hẳn", "Xe đang chạy nhanh", "Xe vừa rẽ", "Bất cứ lúc nào"], "c": 0, "note": "Nên lên xuống khi xe dừng hẳn."}, {"q": "Bánh tàu hỏa được thiết kế để làm gì?", "a": ["Đi theo đường ray", "Bay trên không", "Nổi trên nước", "Chạy trên cát tự do"], "c": 0, "note": "Bánh tàu được dẫn hướng bởi ray."}, {"q": "Có nên chơi trên đường ray không?", "a": ["Không", "Có nếu vắng", "Có vào ban đêm", "Chỉ khi có người lớn"], "c": 0, "note": "Không chơi hoặc đi bộ trên đường ray."}, {"q": "Thuyền có thể dùng cách nào để di chuyển?", "a": ["Mái chèo, buồm hoặc động cơ", "Chỉ cánh máy bay", "Chỉ đường ray", "Chỉ chân người đi bộ"], "c": 0, "note": "Thuyền có nhiều cách tạo lực đẩy."}, {"q": "Thiết bị an toàn quan trọng khi đi thuyền là gì?", "a": ["Áo phao", "Mũ len", "Giày trượt", "Kính đọc sách"], "c": 0, "note": "Áo phao là thiết bị an toàn quan trọng."}, {"q": "Nhiều tàu thủy dùng gì để đẩy nước về sau?", "a": ["Chân vịt", "Bánh xe đạp", "Cánh quạt trần", "Đường ray"], "c": 0, "note": "Chân vịt tạo lực đẩy cho tàu."}, {"q": "Bánh lái hoặc hệ thống lái tàu giúp gì?", "a": ["Đổi hướng", "Làm nước ngọt hơn", "Tạo mây", "Làm tàu nhẹ đi"], "c": 0, "note": "Hệ thống lái giúp đổi hướng."}, {"q": "Cánh máy bay tạo chủ yếu lực nào?", "a": ["Lực nâng", "Lực kéo xuống", "Lực nổi trong nước", "Lực ma sát đất"], "c": 0, "note": "Cánh tạo phần lớn lực nâng."}, {"q": "Động cơ máy bay tạo chủ yếu lực nào?", "a": ["Lực đẩy", "Lực nổi", "Lực hút xuống đất", "Lực của đường ray"], "c": 0, "note": "Động cơ tạo lực đẩy."}, {"q": "Máy bay thường dùng gì để cất và hạ cánh?", "a": ["Đường băng", "Đường ray", "Vạch qua đường", "Bến thuyền"], "c": 0, "note": "Máy bay thường dùng đường băng."}, {"q": "Trực thăng tạo lực nâng chủ yếu bằng gì?", "a": ["Rotor chính quay phía trên", "Đường ray", "Chân vịt dưới nước", "Bàn đạp"], "c": 0, "note": "Rotor chính tạo lực nâng."}, {"q": "Trực thăng có thể làm điều gì mà máy bay cánh cố định thường không làm được?", "a": ["Cất cánh gần thẳng đứng", "Chạy trên đường ray", "Lặn dưới biển", "Đi bằng bàn đạp"], "c": 0, "note": "Trực thăng có thể cất và hạ cánh gần thẳng đứng."}, {"q": "Có nên đứng gần rotor trực thăng đang quay không?", "a": ["Không", "Có", "Chỉ trẻ em được", "Chỉ ban ngày"], "c": 0, "note": "Rotor quay rất nguy hiểm."}, {"q": "Bánh xe quay quanh bộ phận nào?", "a": ["Trục", "Cánh", "Râu", "Cột buồm"], "c": 0, "note": "Bánh xe quay quanh trục."}, {"q": "Bánh xe và trục giúp ích gì?", "a": ["Giúp di chuyển dễ hơn", "Làm xe thành tàu", "Tạo mây", "Làm nước đóng băng"], "c": 0, "note": "Bánh xe và trục giúp phương tiện lăn."}, {"q": "Mô-tơ điện dùng nguồn năng lượng nào?", "a": ["Điện", "Chỉ gió", "Chỉ ánh nắng trực tiếp không qua thiết bị", "Nước mưa"], "c": 0, "note": "Mô-tơ điện dùng điện năng."}, {"q": "Động cơ đốt trong thường dùng gì?", "a": ["Nhiên liệu", "Đường ray", "Áo phao", "Cánh buồm"], "c": 0, "note": "Động cơ đốt trong dùng năng lượng hóa học từ nhiên liệu."}, {"q": "Vì sao tàu hỏa cần tuân thủ nghiêm tín hiệu đường sắt?", "a": ["Tàu nặng và cần quãng đường dài để dừng", "Tàu không có bánh", "Tàu luôn bay", "Ray làm bằng gỗ mềm"], "c": 0, "note": "Tàu rất nặng và khó dừng nhanh."}, {"q": "Một vật nổi trên nước khi lực nào đủ để cân bằng trọng lượng của nó?", "a": ["Lực nổi", "Lực của đèn", "Lực từ đường ray", "Lực của còi"], "c": 0, "note": "Lực nổi của nước giúp vật nổi."}, {"q": "Chân vịt đẩy nước về sau thì tàu thường chuyển động thế nào?", "a": ["Tiến về trước", "Bay lên trời", "Đứng yên hoàn toàn", "Chìm ngay"], "c": 0, "note": "Đẩy nước về sau tạo lực đẩy tàu về trước."}, {"q": "Máy bay có bay chỉ vì nhẹ không?", "a": ["Không, cần lực nâng và lực đẩy phù hợp", "Có, chỉ cần nhẹ", "Chỉ cần màu trắng", "Chỉ cần nhiều cửa sổ"], "c": 0, "note": "Bay cần các lực khí động học phù hợp."}, {"q": "Khi ngồi ô tô, bé nên làm gì?", "a": ["Thắt dây an toàn phù hợp", "Thò người ra cửa sổ", "Đứng lên khi xe chạy", "Tự mở cửa"], "c": 0, "note": "Dây an toàn giúp bảo vệ hành khách."}, {"q": "Qua đường nên làm gì?", "a": ["Qua tại nơi an toàn và theo hướng dẫn", "Chạy bất ngờ xuống đường", "Nhắm mắt chạy", "Chơi giữa lòng đường"], "c": 0, "note": "Qua đường đúng nơi và quan sát là an toàn hơn."}, {"q": "Phương tiện nào trong bài đi trên ray?", "a": ["Tàu hỏa", "Máy bay", "Thuyền", "Xe đạp"], "c": 0, "note": "Tàu hỏa đi trên đường ray."}, {"q": "Phương tiện nào trong bài có rotor lớn phía trên?", "a": ["Trực thăng", "Xe buýt", "Tàu thủy", "Xe đạp"], "c": 0, "note": "Trực thăng dùng rotor chính."}]});

  /* ---------- Hình vẽ phương tiện & nguyên lý (khung 120 x 100) ---------- */
  const wheel = (x, y, r, tire = "#1F2937", hub = "#CBD5E1") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${tire}"/><circle cx="${x}" cy="${y}" r="${r * 0.5}" fill="${hub}"/><circle cx="${x}" cy="${y}" r="${r * 0.18}" fill="${tire}"/>`;
  const ART = {
    bicycle: () => `
      <circle cx="30" cy="70" r="20" fill="none" stroke="#1F2937" stroke-width="4"/><circle cx="90" cy="70" r="20" fill="none" stroke="#1F2937" stroke-width="4"/>
      <path d="M30 70 L14 70 M30 70 L22 58 M90 70 L98 58 M30 70 L82 70 M90 70 L106 76" stroke="#94A3B8" stroke-width="1.2"/>
      <path d="M30 70 L52 70 L80 40 L46 40 Z M52 70 L42 30 M80 40 L90 70 M80 40 L76 26 L86 22" stroke="#EC4899" stroke-width="4.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M34 28 H50" stroke="#1F2937" stroke-width="6" stroke-linecap="round"/>
      <circle cx="52" cy="70" r="6" fill="none" stroke="#475569" stroke-width="2.5"/><path d="M52 64 L30 66 M52 76 L30 74" stroke="#475569" stroke-width="1.5"/>
      <path d="M52 70 l6 8 h5" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    motorbike: () => `
      ${wheel(28, 72, 16)}${wheel(92, 72, 16)}
      <path d="M28 72 L46 52 H76 L92 72" stroke="#475569" stroke-width="4" fill="none"/>
      <path d="M38 50 Q44 38 62 40 L82 40 Q90 42 88 54 L70 60 H46Z" fill="#EF4444" stroke="#991B1B" stroke-width="2"/>
      <path d="M40 40 Q50 32 66 36" stroke="#1F2937" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M82 40 L90 24 L100 22" stroke="#1F2937" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M90 32 L102 34 L100 42 Z" fill="#FDE68A" stroke="#CA8A04" stroke-width="1.5"/>
      <rect x="50" y="56" width="20" height="12" rx="3" fill="#64748B"/><path d="M42 66 L20 64" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>`,
    car: () => `
      <path d="M8 70 V56 Q8 48 18 46 L34 44 L46 28 Q50 24 58 24 H82 Q90 24 94 30 L104 44 Q114 46 114 56 V70Z" fill="#EF4444" stroke="#991B1B" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M50 30 H66 V44 H40Z M72 30 H84 Q88 30 90 34 L96 44 H72Z" fill="#BAE6FD" stroke="#0369A1" stroke-width="1.5"/>
      <path d="M68 46 V66" stroke="#991B1B" stroke-width="1.5"/><path d="M58 52 h6 M86 52 h6" stroke="#991B1B" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="106" y="52" width="8" height="6" rx="2" fill="#FDE68A"/><rect x="8" y="52" width="6" height="6" rx="2" fill="#FCA5A5"/>
      ${wheel(32, 72, 12)}${wheel(90, 72, 12)}`,
    bus: () => `
      <rect x="6" y="20" width="108" height="54" rx="10" fill="#FACC15" stroke="#A16207" stroke-width="2.5"/>
      ${[12, 34, 56, 78].map((x) => `<rect x="${x}" y="28" width="18" height="16" rx="3" fill="#BAE6FD" stroke="#0369A1" stroke-width="1.5"/>`).join("")}
      <rect x="98" y="28" width="12" height="36" rx="3" fill="#BAE6FD" stroke="#0369A1" stroke-width="1.5"/><path d="M104 28 V64" stroke="#0369A1" stroke-width="1.5"/>
      <rect x="6" y="50" width="108" height="5" fill="#F97316"/>
      <rect x="40" y="10" width="40" height="10" rx="3" fill="#1F2937"/><text x="60" y="18" text-anchor="middle" font-size="8" font-weight="700" fill="#FDE68A" font-family="sans-serif">BUÝT</text>
      ${wheel(28, 76, 11)}${wheel(88, 76, 11)}`,
    train: () => `
      <path d="M0 90 H120" stroke="#78716C" stroke-width="3"/>
      <rect x="66" y="34" width="50" height="44" rx="5" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/>
      ${[72, 92].map((x) => `<rect x="${x}" y="40" width="16" height="13" rx="2" fill="#BAE6FD" stroke="#0369A1" stroke-width="1.2"/>`).join("")}
      <path d="M8 78 V40 Q8 30 18 30 H44 L56 22 V78Z" fill="#3B82F6" stroke="#1E3A8A" stroke-width="2.5"/>
      <rect x="14" y="36" width="20" height="16" rx="3" fill="#BAE6FD" stroke="#1E3A8A" stroke-width="1.5"/>
      <rect x="38" y="12" width="10" height="12" fill="#1E3A8A"/><circle cx="12" cy="64" r="4" fill="#FDE68A"/>
      <rect x="56" y="64" width="12" height="4" fill="#475569"/>
      ${wheel(20, 82, 7, "#334155")}${wheel(44, 82, 7, "#334155")}${wheel(80, 82, 7, "#334155")}${wheel(104, 82, 7, "#334155")}`,
    boat: () => `
      <path d="M0 84 Q30 78 60 84 T120 84 V100 H0Z" fill="#38BDF8"/>
      <path d="M58 12 V70" stroke="#78350F" stroke-width="3.5"/>
      <path d="M60 14 L96 64 H60Z" fill="#fff" stroke="#94A3B8" stroke-width="2"/><path d="M56 22 L30 64 H56Z" fill="#F9A8D4" stroke="#DB2777" stroke-width="2"/>
      <path d="M58 10 l12 4 l-12 4Z" fill="#EF4444"/>
      <path d="M16 68 H104 L92 86 H28Z" fill="#B45309" stroke="#78350F" stroke-width="2.5"/>
      <path d="M22 74 H98" stroke="#FDE68A" stroke-width="2.5"/>`,
    ship: () => `
      <path d="M0 84 Q30 78 60 84 T120 84 V100 H0Z" fill="#38BDF8"/>
      <rect x="70" y="14" width="12" height="20" fill="#EF4444" stroke="#991B1B" stroke-width="2"/><rect x="70" y="14" width="12" height="5" fill="#1F2937"/>
      <rect x="40" y="32" width="58" height="16" rx="2" fill="#fff" stroke="#94A3B8" stroke-width="2"/>
      <rect x="48" y="24" width="20" height="9" fill="#fff" stroke="#94A3B8" stroke-width="2"/>
      ${[46, 56, 66, 76, 86].map((x) => `<rect x="${x}" y="36" width="6" height="6" rx="1" fill="#38BDF8"/>`).join("")}
      <path d="M4 48 H116 L104 84 H18Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="2.5"/>
      <path d="M8 58 H113" stroke="#EF4444" stroke-width="4"/>
      ${[24, 40, 56, 72, 88].map((x) => `<circle cx="${x}" cy="68" r="3" fill="#BAE6FD"/>`).join("")}`,
    airplane: () => `
      <path d="M6 52 Q8 40 22 40 H90 Q114 42 116 54 Q114 64 96 64 H22 Q8 64 6 52Z" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
      <path d="M8 46 L4 18 H16 L30 42Z" fill="#3B82F6" stroke="#1E3A8A" stroke-width="2"/>
      <path d="M52 58 L36 90 H50 L74 58Z" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
      <path d="M52 46 L42 30 H52 L66 46Z" fill="#CBD5E1" stroke="#475569" stroke-width="1.5"/>
      <rect x="44" y="72" width="16" height="8" rx="4" fill="#475569"/>
      ${[30, 40, 50, 60, 70, 80].map((x) => `<circle cx="${x}" cy="50" r="2.6" fill="#38BDF8"/>`).join("")}
      <path d="M98 44 Q108 46 112 52 H98Z" fill="#38BDF8" stroke="#0369A1" stroke-width="1.5"/>
      <path d="M22 60 H96" stroke="#EC4899" stroke-width="3"/>`,
    helicopter: () => `
      <path d="M10 22 H110" stroke="#334155" stroke-width="4" stroke-linecap="round"/><rect x="56" y="22" width="8" height="10" fill="#334155"/>
      <path d="M30 50 H6" stroke="#F97316" stroke-width="7" stroke-linecap="round"/>
      <circle cx="6" cy="50" r="10" fill="none" stroke="#334155" stroke-width="2.5" stroke-dasharray="4 3"/>
      <path d="M30 40 Q34 32 54 32 H76 Q100 32 104 52 Q104 66 86 68 H44 Q30 66 30 54Z" fill="#F97316" stroke="#C2410C" stroke-width="2.5"/>
      <path d="M78 36 Q96 38 99 52 H78Z" fill="#BAE6FD" stroke="#0369A1" stroke-width="1.5"/>
      <rect x="54" y="40" width="16" height="12" rx="2" fill="#BAE6FD" stroke="#0369A1" stroke-width="1.5"/>
      <path d="M48 68 V78 M84 68 V78 M38 80 H96" stroke="#334155" stroke-width="4" stroke-linecap="round"/>`,
    wheel_axle: () => `
      <rect x="10" y="46" width="100" height="8" rx="4" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
      <circle cx="60" cy="50" r="36" fill="#1F2937"/><circle cx="60" cy="50" r="26" fill="#E2E8F0"/>
      ${[0, 45, 90, 135].map((a) => `<path d="M60 26 V74" stroke="#64748B" stroke-width="3" transform="rotate(${a} 60 50)"/>`).join("")}
      <circle cx="60" cy="50" r="7" fill="#475569"/>
      <path d="M100 18 A44 44 0 0 1 110 44" stroke="#EC4899" stroke-width="4" fill="none" stroke-linecap="round" marker-end="url(#gxArrowV)"/>`,
    engine_motor: () => `
      <rect x="8" y="40" width="30" height="40" rx="5" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/><rect x="17" y="34" width="12" height="6" fill="#15803D"/>
      <path d="M25 48 L18 62 H26 L21 74 L32 58 H24 L29 48Z" fill="#FDE68A"/>
      <path d="M38 56 H52 M38 66 H52" stroke="#EF4444" stroke-width="3"/>
      <rect x="52" y="40" width="40" height="40" rx="8" fill="#64748B" stroke="#334155" stroke-width="2.5"/>
      <path d="M58 46 V74 M66 46 V74 M74 46 V74 M82 46 V74" stroke="#94A3B8" stroke-width="2"/>
      <rect x="92" y="56" width="10" height="8" fill="#475569"/>
      <g transform="translate(108 60)"><circle r="10" fill="#FACC15" stroke="#A16207" stroke-width="2"/>${[0, 60, 120, 180, 240, 300].map((a) => `<rect x="-3" y="-14" width="6" height="6" fill="#FACC15" stroke="#A16207" stroke-width="1.5" transform="rotate(${a})"/>`).join("")}<circle r="3" fill="#A16207"/></g>`,
    rail: () => `
      <path d="M40 8 L8 96 M80 8 L112 96" stroke="#64748B" stroke-width="5"/>
      ${[[38, 14, 82], [33, 30, 87], [27, 46, 93], [21, 62, 99], [15, 78, 105], [10, 92, 110]].map(([a, y, b]) => `<path d="M${a - 4} ${y} H${b + 4}" stroke="#92400E" stroke-width="${3 + y / 20}"/>`).join("")}
      <path d="M40 8 L8 96 M80 8 L112 96" stroke="#94A3B8" stroke-width="3"/>
      <circle cx="100" cy="56" r="13" fill="#334155"/><circle cx="100" cy="56" r="5" fill="#CBD5E1"/><path d="M87 62 Q100 74 113 62" stroke="#EC4899" stroke-width="3" fill="none"/>`,
    float_propeller: () => `
      <path d="M0 50 Q30 44 60 50 T120 50 V100 H0Z" fill="#7DD3FC"/>
      <path d="M14 34 H96 L86 62 H24Z" fill="#B45309" stroke="#78350F" stroke-width="2.5"/>
      <path d="M50 92 V68" stroke="#16A34A" stroke-width="4" marker-end="url(#gxArrowG)"/>
      <text x="56" y="88" font-size="10" font-weight="700" fill="#166534" font-family="sans-serif">lực nổi</text>
      <path d="M24 58 H14" stroke="#475569" stroke-width="3"/>
      <ellipse cx="10" cy="52" rx="3" ry="8" fill="#FACC15" stroke="#A16207" stroke-width="1.5"/><ellipse cx="10" cy="64" rx="3" ry="8" fill="#FACC15" stroke="#A16207" stroke-width="1.5"/>
      <path d="M6 72 Q2 78 6 84 M4 80 Q0 86 4 92" stroke="#0369A1" stroke-width="2" fill="none"/>
      <path d="M96 22 H116" stroke="#EC4899" stroke-width="4" marker-end="url(#gxArrowV)"/>`,
    wing_lift: () => `
      ${[30, 44, 72, 86].map((y, k) => `<path d="M2 ${y} Q60 ${y + (k < 2 ? -14 : -4)} 118 ${y}" stroke="#7DD3FC" stroke-width="2.5" fill="none" stroke-dasharray="6 5"/>`).join("")}
      <path d="M14 60 Q30 40 70 44 Q100 48 112 60 Q80 64 14 60Z" fill="#CBD5E1" stroke="#475569" stroke-width="2.5"/>
      <path d="M60 46 V16" stroke="#16A34A" stroke-width="5" marker-end="url(#gxArrowG)"/>
      <text x="66" y="28" font-size="11" font-weight="700" fill="#166534" font-family="sans-serif">lực nâng</text>`,
    traffic_safety: () => `
      <rect x="10" y="8" width="26" height="64" rx="8" fill="#1F2937"/><circle cx="23" cy="22" r="7" fill="#EF4444"/><circle cx="23" cy="40" r="7" fill="#FACC15" opacity=".4"/><circle cx="23" cy="58" r="7" fill="#22C55E" opacity=".4"/>
      <rect x="20" y="72" width="6" height="24" fill="#475569"/>
      <rect x="44" y="70" width="72" height="28" fill="#6B7280"/>
      ${[48, 62, 76, 90, 104].map((x) => `<rect x="${x}" y="72" width="8" height="24" fill="#fff"/>`).join("")}
      <path d="M58 52 Q58 26 82 26 Q106 26 106 52Z" fill="#EC4899" stroke="#9D174D" stroke-width="2.5"/>
      <path d="M58 52 H110" stroke="#9D174D" stroke-width="4" stroke-linecap="round"/><path d="M70 34 Q82 30 94 34" stroke="#FBCFE8" stroke-width="3" fill="none"/>`
  };
  const ART_BG = {
    bicycle: "#FCE7F3", motorbike: "#FEE2E2", car: "#FEE2E2", bus: "#FEF9C3", train: "#DBEAFE", boat: "#E0F2FE", ship: "#E0F2FE", airplane: "#E0F2FE", helicopter: "#FFEDD5",
    wheel_axle: "#F1F5F9", engine_motor: "#ECFDF5", rail: "#F5F5F4", float_propeller: "#E0F2FE", wing_lift: "#F0F9FF", traffic_safety: "#FFF1F7"
  };
  const MARKERS = `<defs><marker id="gxArrowV" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#EC4899"/></marker><marker id="gxArrowG" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#16A34A"/></marker></defs>`;
  let artUid = 0;
  function artSvg(id) {
    const draw = ART[id];
    if (!draw) return "";
    artUid += 1;
    const html = (MARKERS + draw()).replace(/gxArrow([VG])/g, `gxArrow$1_${artUid}`);
    return `<svg class="gx-v-svg" viewBox="0 0 120 100" aria-hidden="true" focusable="false">${html}</svg>`;
  }

  /* ---------- Thành phố ở tab đầu ----------
     Các dải nền (theo % chiều cao): trời 0–36, cỏ 36–42, đường 42–62, cỏ 62–64, đường ray 64–74, nước 74–100. */
  const SPOTS = [
    { id: "helicopter", x: 4, y: 66, w: 22 },
    { id: "airplane", x: 44, y: 70, w: 30 },
    { id: "bicycle", x: 4, y: 48, w: 14 },
    { id: "bus", x: 42, y: 47, w: 23 },
    { id: "car", x: 17, y: 37, w: 18 },
    { id: "motorbike", x: 36, y: 37, w: 14 },
    { id: "train", x: 67, y: 23, w: 31 },
    { id: "boat", x: 10, y: 3, w: 18 },
    { id: "ship", x: 36, y: 1, w: 28 }
  ];
  const CITY_BG = `<svg viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
    <rect width="400" height="108" fill="#BAE6FD"/>
    <rect y="108" width="400" height="18" fill="#86EFAC"/>
    <rect y="126" width="400" height="60" fill="#6B7280"/>
    <path d="M0 156 H400" stroke="#F8FAFC" stroke-width="2.5" stroke-dasharray="16 12"/>
    <path d="M0 128 H400 M0 184 H400" stroke="#D1D5DB" stroke-width="1.5"/>
    <rect y="186" width="400" height="6" fill="#86EFAC"/>
    <rect y="192" width="400" height="30" fill="#D6B98C"/>
    <path d="${Array.from({ length: 40 }, (_, k) => `M${k * 10 + 3} 196 V220`).join(" ")}" stroke="#92400E" stroke-width="3"/>
    <path d="M0 202 H400 M0 214 H400" stroke="#64748B" stroke-width="2.5"/>
    <rect y="222" width="400" height="78" fill="#38BDF8"/>
    <path d="M0 232 Q20 228 40 232 T80 232 T120 232 T160 232 T200 232 T240 232 T280 232 T320 232 T360 232 T400 232" stroke="#BAE6FD" stroke-width="1.5" fill="none"/></svg>`;
  const CITY_DECOR = `<span class="gx-sun"></span><span class="gx-cloud" style="left:30%;top:16%"></span><span class="gx-cloud" style="left:78%;top:20%;transform:scale(.8)"></span>`;


  /* ---------- Khu vườn ở tab đầu ----------
     x, y = vị trí trái / đáy (%), w = chiều rộng (% bức tranh). Hàng sau đặt trước. */
  /* ---------- Trạng thái ---------- */
  let controller = null;
  let root = null;
  let activeContext = null;
  let activeTab = "city";
  let selectedId = DATA.overview.id;
  let quiz = null;
  let autoRead = true;
  let toastTimer = 0;
  let found = loadFound();

  const allItems = [DATA.overview, ...DATA.primary, ...DATA.secondary];
  const byId = (id) => allItems.find((item) => item.id === id) || DATA.overview;
  const isVehicle = (id) => DATA.primary.some((d) => d.id === id);
  const isTopic = (id) => DATA.secondary.some((d) => d.id === id);
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
      ${R} .gx-tab[data-tab="topics"][aria-selected="true"],${R} .gx-tab[data-tab="quiz"][aria-selected="true"]{background:var(--grad-alt)}
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
      ${R} .gx-spot .gx-v-svg{width:100%;height:auto;display:block}
      ${R} .gx-city>svg{position:absolute;inset:0;width:100%;height:100%}
      ${R} .gx-city .gx-city-note{background:transparent;padding:0;left:10px;top:10px;right:auto}
      ${R} .gx-sun{position:absolute;right:5%;top:4%;width:56px;height:56px;border-radius:50%;background:#FDE68A;box-shadow:0 0 0 10px rgba(253,230,138,.35);pointer-events:none}
      ${R} .gx-cloud{position:absolute;width:90px;height:26px;border-radius:20px;background:#fff;opacity:.9;pointer-events:none}
      ${R} .gx-cloud::before{content:"";position:absolute;left:18px;top:-14px;width:44px;height:34px;border-radius:50%;background:#fff}
      ${R} .gx-spot.is-selected .gx-v-svg{filter:drop-shadow(0 0 6px rgba(236,72,153,.8))}
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
    if (ART[obj.id]) return `<div class="gx-hero is-organ" style="background:${ART_BG[obj.id]}">${artSvg(obj.id)}</div>`;
    return `<div class="gx-hero is-organ" style="background:${ART_BG.traffic_safety}">${artSvg("traffic_safety")}</div>`;
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
      return `<button type="button" class="gx-spot ${cls}" data-object="${s.id}" style="left:${s.x}%;bottom:${s.y}%;width:${s.w}%;z-index:${100 - Math.round(s.y)}" aria-label="${d.name}">${artSvg(s.id)}<span class="gx-chip">${d.name}</span></button>`;
    }).join("");
    const what = `<button type="button" class="gx-whole ${selectedId === DATA.overview.id ? "is-selected" : ""}" data-object="${DATA.overview.id}">🚦 Phương tiện là gì?</button>`;
    const note = `<div class="gx-scene-note gx-city-note">${what}</div>`;
    return `<div class="gx-split">
      <div class="gx-card gx-scene gx-city">${CITY_BG}${CITY_DECOR}${note}${spots}</div>
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }
  function gridHtml(items) {
    if (!items.some((i) => i.id === selectedId)) selectedId = items[0].id;
    const cards = items.map((o) => {
      const tick = found.has(o.id) ? `<span class="gx-tick">✓ Đã xem</span>` : "";
      return `<button type="button" class="gx-item gx-land-item ${o.id === selectedId ? "is-selected" : ""}" data-object="${o.id}">${tick}<span class="gx-thumb" style="background:${ART_BG[o.id]};padding:6px">${artSvg(o.id)}</span><span class="gx-item-text"><strong>${o.name}</strong><small>${o.subtitle}</small></span></button>`;
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
      const msg = stars === 3 ? "Tuyệt vời! Con là người tham gia giao thông nhí giỏi rồi!" : stars === 2 ? "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé." : "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.";
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
    if (activeTab === "city" && isTopic(selectedId)) selectedId = DATA.overview.id;
    if (activeTab === "vehicles" && !isVehicle(selectedId)) selectedId = DATA.primary[0].id;
    if (activeTab === "topics" && !isTopic(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz") markFound(selectedId, true);
    let html = "";
    if (activeTab === "city") html = gardenHtml();
    else if (activeTab === "vehicles") html = gridHtml(DATA.primary);
    else if (activeTab === "topics") html = gridHtml(DATA.secondary);
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
    if (n === total) toast("🏆 Con đã khám phá hết các phương tiện rồi! Giỏi quá!");
    else toast(`🚗 Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { city: "Thành phố", vehicles: "Phương tiện", topics: "Hoạt động & an toàn", quiz: "Hỏi đáp" };
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
    activeTab = "city";
    selectedId = DATA.overview.id;
    quiz = null;
    found = loadFound();
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `
      <header class="gx-head">
        <div class="gx-logo" aria-hidden="true">${artSvg("car")}</div>
        <div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div>
        <div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="city" type="button" aria-selected="true">🏙️ Thành phố</button>
        <button class="gx-tab" role="tab" data-tab="vehicles" type="button" aria-selected="false" tabindex="-1">🚗 Phương tiện</button>
        <button class="gx-tab" role="tab" data-tab="topics" type="button" aria-selected="false" tabindex="-1">🚦 Hoạt động & an toàn</button>
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
