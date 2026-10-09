(() => {
  "use strict";

  const MODULE_KEY = "mcHost";
  const STYLE_ID = "class1-games-mc-host-style-v2";
  const GAME_NUMBER = 5;

  let activeContext = null;
  let currentProgramId = "";
  let currentSegmentIndex = 0;
  let stageMode = false;
  let stageRunning = false;
  let stagePaused = false;
  let stageSpeed = "medium";
  let countdownTimer = 0;
  let stageTimer = 0;
  let audioNonce = 0;
  let speechUtterance = null;
  let fallbackQueue = [];
  let fallbackQueueIndex = 0;

  const narrationAudio = typeof Audio === "function" ? new Audio() : null;
  if (narrationAudio) {
    narrationAudio.preload = "none";
    narrationAudio.referrerPolicy = "no-referrer";
  }

  const esc = (value) => String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const segment = (title, cue, text, tip) => Object.freeze({ title, cue, text, tip });

  const PROGRAMS = Object.freeze([
    Object.freeze({
      id: "morning", icon: "🎒", title: "Chào buổi sáng ở lớp", tone: "pink", focus: "Giọng rõ và nụ cười",
      guide: "Hôm nay bé sẽ làm MC mở đầu một buổi học. Cô Thỏ Hồng muốn bé nói vừa đủ chậm, mỉm cười khi chào và nhìn các bạn sau mỗi câu quan trọng.",
      segments: Object.freeze([
        segment("Lời chào", "😊 Mỉm cười · 👀 Nhìn khán giả", "Xin chào cô giáo và tất cả các bạn! Em rất vui được gặp mọi người trong một buổi sáng thật tươi vui. Chúng mình cùng bắt đầu ngày mới bằng một nụ cười thật đẹp nhé!", "Nói câu chào đầu tiên thật sáng và rõ."),
        segment("Giới thiệu buổi học", "🔊 Giọng rõ · ⏸ Nghỉ nhẹ", "Hôm nay lớp mình sẽ cùng học, cùng khám phá và cùng giúp đỡ nhau. Mỗi câu trả lời đều là một cố gắng đáng quý, vì vậy chúng mình hãy mạnh dạn giơ tay và chia sẻ ý kiến nhé.", "Nghỉ một nhịp sau từ 'hôm nay'."),
        segment("Khởi động", "🙌 Động tác tay · 😊 Vui vẻ", "Trước khi vào bài, chúng mình cùng khởi động một chút nào! Mời các bạn ngồi ngay ngắn, hít một hơi thật sâu, rồi cùng vươn vai để cơ thể tỉnh táo hơn.", "Có thể làm động tác vươn vai cùng các bạn."),
        segment("Mời cô giáo", "👀 Nhìn cô giáo · 🎤 Trang trọng", "Và bây giờ, chúng mình đã sẵn sàng rồi. Em xin kính mời cô giáo bắt đầu bài học ngày hôm nay. Cả lớp cùng dành một tràng vỗ tay thật vui để chào đón cô ạ!", "Giọng trang trọng hơn một chút ở câu mời cô."),
        segment("Chuyển hoạt động", "⏸ Nghỉ đúng chỗ · 👉 Chuyển ý", "Sau phần học đầu tiên, chúng mình sẽ cùng bước sang một hoạt động mới. Các bạn hãy chuẩn bị đồ dùng thật nhanh và nhớ giữ bàn học gọn gàng nhé.", "Nhấn vào cụm 'hoạt động mới'."),
        segment("Kết buổi", "😊 Mỉm cười · 👋 Chào", "Buổi học của chúng mình đến đây là kết thúc. Cảm ơn cô giáo và các bạn đã cùng nhau tạo nên một giờ học thật vui. Chúc mọi người có một ngày học tập thật nhiều niềm vui!", "Kết thúc chậm, rõ và mỉm cười.")
      ])
    }),
    Object.freeze({
      id: "birthday", icon: "🎂", title: "Sinh nhật của bạn", tone: "amber", focus: "Giọng vui và biết giao lưu",
      guide: "MC sinh nhật cần làm cho nhân vật chính cảm thấy thật đặc biệt. Bé hãy nói bằng giọng vui, biết mời mọi người vỗ tay và nhớ dành một lời chúc ấm áp cho bạn.",
      segments: Object.freeze([
        segment("Chào khách mời", "😊 Tươi vui · 👋 Vẫy tay", "Xin chào tất cả các bạn! Hôm nay chúng mình có mặt ở đây để cùng dự một ngày thật đặc biệt. Bé có đoán được đó là ngày gì không? Đúng rồi, hôm nay là ngày sinh nhật của một người bạn rất đáng yêu!", "Dừng một chút trước câu 'Đúng rồi'."),
        segment("Chào nhân vật chính", "🎉 Hào hứng · 👀 Nhìn bạn", "Xin mời nhân vật chính của buổi tiệc bước lên nào! Chúng mình hãy dành một tràng vỗ tay thật lớn để chào đón bạn. Chúc bạn luôn vui vẻ, khỏe mạnh và có thật nhiều điều thú vị trong tuổi mới.", "Nhìn về phía bạn khi nói lời chúc."),
        segment("Mời thổi nến", "🕯️ Chậm lại · 🔢 Đếm cùng", "Chiếc bánh sinh nhật đã sẵn sàng rồi. Mời bạn đứng trước bánh, nhắm mắt lại và nghĩ về một điều ước thật đẹp. Cả nhà mình cùng đếm nhé: ba, hai, một... thổi nến nào!", "Đếm chậm để mọi người cùng tham gia."),
        segment("Mời hát", "🎵 Có nhịp · 😊 Vui vẻ", "Và bây giờ là bài hát mà sinh nhật nào cũng không thể thiếu. Mời tất cả chúng mình cùng hát thật vui để gửi lời chúc đến bạn nhé!", "Có thể vỗ tay theo nhịp khi giới thiệu."),
        segment("Mời nhận quà", "🎁 Ấm áp · 👀 Nhìn mọi người", "Những món quà nhỏ đang chờ được trao tới bạn. Mỗi món quà đều chứa một lời chúc và tình cảm của mọi người. Xin mời các bạn lần lượt lên tặng quà và chụp một bức ảnh thật vui cùng nhân vật chính.", "Nói nhẹ nhàng, không cần quá nhanh."),
        segment("Kết tiệc", "👋 Chào · ❤️ Ấm áp", "Cảm ơn tất cả mọi người đã cùng nhau tạo nên một buổi sinh nhật thật đáng nhớ. Chúc nhân vật chính của chúng ta luôn có thật nhiều nụ cười. Bây giờ, mời cả nhà cùng thưởng thức bánh và tiếp tục vui chơi nhé!", "Kết bằng giọng mời gọi thật vui.")
      ])
    }),
    Object.freeze({
      id: "music", icon: "🎵", title: "Chương trình văn nghệ", tone: "purple", focus: "Nhấn giọng khi giới thiệu tiết mục",
      guide: "Khi dẫn văn nghệ, MC phải giúp khán giả háo hức trước khi tiết mục bắt đầu. Bé hãy nhấn vào tên tiết mục, tên người biểu diễn và nói câu chuyển tiết mục thật tự nhiên.",
      segments: Object.freeze([
        segment("Mở màn", "🎤 Trang trọng · 😊 Tươi vui", "Kính thưa thầy cô và các bạn! Chương trình văn nghệ của chúng ta xin được bắt đầu. Hôm nay, sân khấu nhỏ này sẽ có những tiếng hát, điệu múa và rất nhiều nụ cười dành tặng tất cả mọi người.", "Câu đầu nói rõ và trang trọng."),
        segment("Giới thiệu tiết mục 1", "⭐ Nhấn tên tiết mục · 👀 Nhìn khán giả", "Mở đầu chương trình là một tiết mục thật vui tươi. Xin mời quý vị cùng thưởng thức phần biểu diễn đầu tiên và dành một tràng pháo tay thật lớn để cổ vũ cho các bạn nhỏ của chúng ta!", "Tăng năng lượng ở câu mời vỗ tay."),
        segment("Cảm ơn và chuyển tiết mục", "👏 Khen ngợi · ⏸ Nghỉ nhẹ", "Một phần biểu diễn thật đáng yêu phải không ạ? Xin cảm ơn các bạn đã mang đến những phút giây thật vui. Và ngay sau đây, sân khấu sẽ tiếp tục với một tiết mục có màu sắc hoàn toàn khác.", "Nghỉ một nhịp trước 'Và ngay sau đây'."),
        segment("Giới thiệu tiết mục 2", "🎵 Có cảm xúc · 👉 Hướng sân khấu", "Tiết mục tiếp theo sẽ đưa chúng ta đến với một giai điệu nhẹ nhàng và trong trẻo. Xin mời tất cả mọi người cùng lắng nghe, và đừng quên cổ vũ cho người biểu diễn nhé!", "Nói chậm hơn một chút để tạo chờ đợi."),
        segment("Giao lưu", "😊 Thân thiện · 🙌 Mời khán giả", "Các bạn khán giả ơi, mọi người thấy chương trình hôm nay thế nào? Nếu thấy vui, chúng mình cùng giơ hai tay lên và vỗ tay thật lớn nhé! Cảm ơn sự cổ vũ rất nhiệt tình của tất cả các bạn.", "Dừng lại để khán giả có thời gian phản ứng."),
        segment("Bế mạc", "❤️ Ấm áp · 👋 Chào", "Chương trình văn nghệ đến đây xin được khép lại. Cảm ơn thầy cô, các bạn biểu diễn và tất cả khán giả đã cùng tạo nên một buổi gặp gỡ thật nhiều màu sắc. Xin chào và hẹn gặp lại!", "Câu cuối nói chậm, nhìn khán giả và chào.")
      ])
    }),
    Object.freeze({
      id: "books", icon: "📚", title: "Ngày hội đọc sách", tone: "teal", focus: "Giọng kể cuốn hút",
      guide: "Ngày hội đọc sách cần một MC biết khơi gợi sự tò mò. Bé hãy nói như đang mở cánh cửa bước vào một thế giới mới, đặc biệt ở những câu nhắc tới nhân vật và câu chuyện.",
      segments: Object.freeze([
        segment("Chào ngày hội", "📚 Háo hức · 😊 Mỉm cười", "Xin chào thầy cô và các bạn! Hôm nay chúng mình sẽ cùng bước vào một ngày hội rất đặc biệt, nơi mỗi cuốn sách giống như một cánh cửa nhỏ dẫn đến những thế giới thật kỳ diệu.", "Nhấn giọng ở từ 'cánh cửa nhỏ'."),
        segment("Mời khám phá sách", "👀 Nhìn khán giả · ✨ Gợi tò mò", "Có cuốn sách đưa chúng ta xuống đáy đại dương, có cuốn lại đưa chúng ta lên tận các vì sao. Có câu chuyện khiến ta bật cười, và cũng có câu chuyện làm ta muốn ôm thật chặt người mình yêu quý.", "Mỗi vế nói với một sắc thái khác nhau."),
        segment("Giới thiệu góc đọc", "👉 Chỉ hướng · 🔊 Rõ ràng", "Ở khu vực bên trái là góc truyện tranh và truyện cổ tích. Phía bên phải là những cuốn sách khám phá thiên nhiên, khoa học và thế giới quanh ta. Các bạn có thể chọn một cuốn mình thích và ngồi đọc thật thoải mái.", "Nhìn sang từng phía khi giới thiệu."),
        segment("Mời bạn chia sẻ", "🎤 Thân thiện · ⏸ Chờ bạn", "Bây giờ, chúng mình sẽ nghe một người bạn giới thiệu cuốn sách mà bạn ấy yêu thích. Xin mời bạn bước lên và kể cho cả lớp biết điều gì trong cuốn sách đã làm bạn nhớ nhất nhé.", "Sau câu mời, dừng để nhường sân khấu."),
        segment("Thử thách nhỏ", "🧠 Vui vẻ · 🙌 Tương tác", "Trước khi kết thúc, Cô Thỏ có một thử thách nhỏ: bé hãy nhớ tên một nhân vật mà mình thích nhất hôm nay. Một lát nữa, thử kể cho bạn bên cạnh nghe vì sao bé thích nhân vật ấy nhé!", "Nói như đang giao một nhiệm vụ bí mật."),
        segment("Lời kết", "❤️ Dịu dàng · 👋 Chào", "Ngày hội đọc sách của chúng mình sắp khép lại, nhưng những câu chuyện thì vẫn còn ở lại. Mong rằng mỗi ngày bé sẽ dành một chút thời gian cho sách, để trí tưởng tượng được bay thật xa. Xin chào và hẹn gặp lại!", "Giọng chậm và ấm ở hai câu cuối.")
      ])
    }),
    Object.freeze({
      id: "art", icon: "🎨", title: "Triển lãm tranh của bé", tone: "pink", focus: "Miêu tả sinh động",
      guide: "MC triển lãm cần giúp người xem muốn dừng lại trước từng bức tranh. Bé hãy dùng giọng nhẹ nhàng, biết miêu tả màu sắc và luôn tôn trọng sự khác nhau trong cách vẽ của mỗi bạn.",
      segments: Object.freeze([
        segment("Mở cửa triển lãm", "🎨 Dịu dàng · 😊 Mỉm cười", "Xin chào tất cả mọi người đến với triển lãm tranh của các họa sĩ nhí! Hôm nay, mỗi bức tranh trên tường đều mang theo một ý tưởng, một câu chuyện và một thế giới riêng của người vẽ.", "Nói câu cuối chậm để tạo cảm giác khám phá."),
        segment("Mời quan sát", "👀 Quan sát · 🎨 Nhấn màu sắc", "Khi xem tranh, chúng mình hãy thử nhìn thật kỹ màu sắc, đường nét và những chi tiết nhỏ. Có bạn thích màu rực rỡ, có bạn thích màu thật nhẹ, nhưng mỗi cách thể hiện đều có nét đẹp riêng.", "Nhấn vào từ 'mỗi cách thể hiện'."),
        segment("Giới thiệu tranh 1", "👉 Chỉ tranh · ✨ Gợi tò mò", "Trước mắt chúng ta là một bức tranh đầy màu sắc. Bé thử đoán xem điều gì đang xảy ra trong tranh nhé. Có thể người vẽ đã muốn kể một câu chuyện mà chỉ khi quan sát thật kỹ chúng ta mới nhận ra.", "Để khán giả có một nhịp nhìn tranh."),
        segment("Mời tác giả chia sẻ", "🎤 Thân thiện · 👀 Nhìn bạn", "Và bây giờ, xin mời họa sĩ nhí của bức tranh này chia sẻ một chút về tác phẩm của mình. Bạn đã bắt đầu từ ý tưởng nào, và chi tiết nào trong tranh là điều bạn thích nhất?", "Hỏi chậm, như đang trò chuyện."),
        segment("Khen sự sáng tạo", "👏 Khích lệ · 😊 Tươi vui", "Cảm ơn bạn vì một phần chia sẻ rất thú vị. Mỗi bức tranh không cần giống hệt ngoài đời. Điều tuyệt vời nhất là chúng ta đã dùng trí tưởng tượng để tạo ra một điều chưa từng có trước đó.", "Nói câu cuối thật khích lệ."),
        segment("Khép triển lãm", "❤️ Ấm áp · 👋 Chào", "Triển lãm tranh của chúng mình đến đây xin được khép lại. Cảm ơn các họa sĩ nhí và tất cả người xem đã dành thời gian cho những ý tưởng đầy màu sắc. Hẹn gặp lại ở một triển lãm mới nhé!", "Kết thúc nhẹ nhàng như một lời mời.")
      ])
    }),
    Object.freeze({
      id: "animals", icon: "🐘", title: "Khám phá thế giới động vật", tone: "amber", focus: "Kể chuyện và tạo bất ngờ",
      guide: "Trong chương trình này, bé là MC của một chuyến tham quan động vật. Hãy kể như đang dẫn bạn bè đi qua từng khu vực, luôn để lại một câu hỏi nhỏ khiến khán giả muốn biết thêm.",
      segments: Object.freeze([
        segment("Chào chuyến khám phá", "🐾 Bí ẩn · 😊 Mỉm cười", "Xin chào các nhà thám hiểm nhí! Hôm nay chúng mình sẽ cùng bước vào thế giới động vật, nơi có những người bạn biết bay, biết bơi, biết chạy thật nhanh và thậm chí có loài còn ngủ theo cách rất đặc biệt.", "Giọng bí ẩn hơn ở câu cuối."),
        segment("Khu đồng cỏ", "🦁 Mạnh mẽ · 👀 Nhìn khán giả", "Điểm dừng đầu tiên là vùng đồng cỏ rộng lớn. Ở đây có những chú sư tử oai vệ, hươu cao cổ với chiếc cổ thật dài và những đàn ngựa vằn mang bộ sọc không con nào hoàn toàn giống con nào.", "Nhấn từng tên con vật rõ ràng."),
        segment("Khu đại dương", "🌊 Êm hơn · ✨ Gợi tò mò", "Rời đồng cỏ, chúng mình cùng lặn xuống đại dương xanh nhé. Dưới nước có cá heo thông minh, rùa biển chậm rãi và những đàn cá nhiều màu bơi qua các rạn san hô như một bức tranh đang chuyển động.", "Giọng mềm hơn để tạo cảm giác dưới nước."),
        segment("Khu rừng", "🌳 Kể chuyện · 👂 Lắng nghe", "Bây giờ hãy bước thật nhẹ vào khu rừng. Bé có nghe tiếng chim không? Trên cành có thể là một chú sóc, phía xa có thể có nai đang tìm lá non. Khu rừng luôn có những âm thanh nhỏ chờ người quan sát tinh ý nhận ra.", "Hạ giọng ở câu hỏi 'Bé có nghe tiếng chim không?'."),
        segment("Câu hỏi khán giả", "🙌 Tương tác · ❓ Hỏi vui", "Nếu được chọn làm bạn với một con vật trong chuyến đi hôm nay, bé sẽ chọn con nào? Hãy nghĩ thật nhanh và thử nói cho người ngồi bên cạnh biết lý do nhé!", "Dừng để khán giả có thời gian trả lời."),
        segment("Kết chuyến tham quan", "❤️ Yêu thiên nhiên · 👋 Chào", "Chuyến khám phá của chúng mình đến đây tạm dừng. Mỗi loài vật đều có một cách sống riêng và đều là một phần quan trọng của thiên nhiên. Hãy cùng yêu quý và bảo vệ những người bạn đặc biệt ấy nhé!", "Kết bằng giọng ấm áp và chắc chắn.")
      ])
    }),
    Object.freeze({
      id: "sports", icon: "⚽", title: "Ngày hội thể thao", tone: "teal", focus: "Năng lượng và nhịp điệu",
      guide: "MC thể thao cần truyền năng lượng nhưng vẫn nói rõ. Bé hãy tăng giọng ở lúc cổ vũ, sau đó chậm lại khi nhắc luật chơi và an toàn.",
      segments: Object.freeze([
        segment("Khai mạc", "⚡ Năng lượng · 🙌 Cổ vũ", "Xin chào tất cả các vận động viên nhí! Ngày hội thể thao của chúng ta chính thức bắt đầu. Hôm nay sẽ có thật nhiều tiếng cười, những bước chạy nhanh và những màn phối hợp thật tuyệt vời.", "Mở đầu mạnh mẽ, không hét quá to."),
        segment("Nhắc tinh thần thi đấu", "🤝 Thân thiện · 🔊 Rõ ràng", "Trước khi thi đấu, chúng mình cùng nhớ một điều rất quan trọng: cố gắng hết sức nhưng luôn vui vẻ và tôn trọng bạn bè. Thắng hay chưa thắng đều không quan trọng bằng việc chúng ta đã dám thử.", "Chậm lại ở câu nhắc tinh thần."),
        segment("Giới thiệu môn thi", "🏃 Nhấn tên môn · 👉 Hướng sân", "Nội dung đầu tiên là phần thi chạy. Các vận động viên hãy vào vị trí, kiểm tra dây giày và lắng nghe hiệu lệnh. Khán giả đã sẵn sàng cổ vũ chưa nào?", "Tăng giọng ở câu hỏi cuối."),
        segment("Cổ vũ", "👏 Có nhịp · 😊 Vui", "Các bạn đang chạy rất cố gắng! Cố lên, cố lên! Dù về đích ở vị trí nào, mỗi bạn đều xứng đáng nhận một tràng pháo tay vì đã hoàn thành thử thách của mình.", "Câu 'Cố lên' có nhịp nhưng không nói quá nhanh."),
        segment("Trao lời khen", "🏅 Ấm áp · 👀 Nhìn vận động viên", "Xin chúc mừng tất cả các vận động viên. Chúng mình đã thấy những bước chạy nhanh, những nụ cười và cả tinh thần không bỏ cuộc. Đó chính là điều đẹp nhất của ngày hội hôm nay.", "Nhấn vào cụm 'không bỏ cuộc'."),
        segment("Bế mạc", "🎉 Vui vẻ · 👋 Chào", "Ngày hội thể thao xin được khép lại. Cảm ơn các vận động viên và khán giả đã tạo nên một sân chơi thật sôi động. Chúc tất cả chúng mình luôn khỏe mạnh và yêu thích vận động mỗi ngày!", "Kết bằng giọng khỏe khoắn, vui tươi.")
      ])
    }),
    Object.freeze({
      id: "green", icon: "🌳", title: "Ngày hội bảo vệ môi trường", tone: "teal", focus: "Giọng rõ và truyền cảm hứng",
      guide: "Chương trình môi trường cần lời dẫn gần gũi, không lên lớp. Bé hãy kể từ những việc rất nhỏ: bỏ rác đúng chỗ, tiết kiệm nước và chăm cây.",
      segments: Object.freeze([
        segment("Chào ngày xanh", "🌱 Nhẹ nhàng · 😊 Mỉm cười", "Xin chào các bạn đến với Ngày hội Xanh! Hôm nay chúng mình sẽ cùng khám phá những việc rất nhỏ nhưng có thể giúp sân trường, ngôi nhà và Trái Đất của chúng ta sạch đẹp hơn mỗi ngày.", "Nhấn vào cụm 'việc rất nhỏ'."),
        segment("Câu chuyện chiếc rác nhỏ", "🗑️ Kể chuyện · 👀 Nhìn khán giả", "Một mẩu giấy nhỏ nằm trên sân có vẻ chẳng đáng kể. Nhưng nếu ai cũng nghĩ như vậy, chẳng bao lâu sân trường sẽ đầy rác. Chỉ cần một bàn tay cúi xuống nhặt lên, nơi đó đã sạch hơn một chút rồi.", "Nói câu cuối bằng giọng khích lệ."),
        segment("Tiết kiệm nước", "💧 Dịu dàng · ⏸ Nghỉ nhẹ", "Nước rất quý. Khi đánh răng, chúng mình có thể khóa vòi lúc chưa cần dùng. Khi tưới cây, chỉ cần lượng nước vừa đủ. Mỗi giọt nước được tiết kiệm đều là một món quà nhỏ cho thiên nhiên.", "Nghỉ nhẹ giữa mỗi ví dụ."),
        segment("Chăm cây", "🌿 Ấm áp · 🙌 Mời cùng làm", "Một cái cây cần thời gian để lớn lên. Chúng mình có thể tưới cây, không bẻ cành và nhắc nhau giữ gìn những bồn hoa. Một ngày nào đó, chính bóng mát của cây sẽ lại che nắng cho chúng ta.", "Câu cuối nói chậm và ấm."),
        segment("Thử thách xanh", "❓ Tương tác · ✨ Gợi ý", "Bé thử chọn một việc xanh mà mình có thể làm ngay hôm nay nhé. Có thể là nhặt một mẩu rác, tắt một bóng đèn không cần thiết hoặc chăm một chậu cây nhỏ.", "Dừng để khán giả suy nghĩ."),
        segment("Lời hứa nhỏ", "❤️ Truyền cảm hứng · 👋 Chào", "Ngày hội Xanh khép lại bằng một lời hứa thật đơn giản: mỗi ngày làm một việc tốt cho môi trường. Khi rất nhiều việc nhỏ được nối lại với nhau, chúng ta sẽ tạo nên một thay đổi thật lớn.", "Nhấn vào cụm 'rất nhiều việc nhỏ'.")
      ])
    }),
    Object.freeze({
      id: "tet", icon: "🧧", title: "Vui Tết cùng gia đình", tone: "amber", focus: "Giọng ấm áp và lễ phép",
      guide: "Dẫn chương trình ngày Tết cần vừa vui vừa ấm. Bé hãy nói chậm ở lời chúc, vui hơn ở phần trò chơi và nhớ dùng lời xưng hô thật lễ phép.",
      segments: Object.freeze([
        segment("Chào năm mới", "🧧 Tươi vui · 🙏 Lễ phép", "Kính chào ông bà, bố mẹ và tất cả mọi người! Một năm mới lại đến, mang theo những ngày sum họp, những lời chúc tốt đẹp và thật nhiều nụ cười. Chúc cả gia đình mình một năm mới bình an và vui vẻ!", "Lời chúc nói chậm, rõ và lễ phép."),
        segment("Kể về ngày Tết", "🌸 Kể chuyện · 😊 Mỉm cười", "Ngày Tết có những cành hoa rực rỡ, mâm cơm gia đình và những cuộc gặp gỡ mà ai cũng mong chờ. Đây là dịp để chúng ta dành thời gian bên nhau và hỏi thăm những người mình yêu quý.", "Giọng ấm ở câu nói về gia đình."),
        segment("Mời chúc Tết", "🙏 Trang trọng · 👀 Nhìn người lớn", "Bây giờ, xin mời các bạn nhỏ cùng gửi lời chúc đến ông bà và bố mẹ. Chúng mình có thể chúc sức khỏe, niềm vui và cảm ơn mọi người vì đã luôn yêu thương, chăm sóc chúng ta.", "Nói chậm và nhìn người mình đang chúc."),
        segment("Mời trò chơi", "🎲 Vui vẻ · 🙌 Mời tham gia", "Sau những lời chúc thật ấm áp, chúng ta cùng chơi một trò chơi nhỏ nhé! Mời cả nhà chia thành các đội và chuẩn bị tinh thần cho những tiếng cười thật lớn.", "Tăng năng lượng rõ rệt ở phần trò chơi."),
        segment("Mời chụp ảnh", "📸 Tươi vui · 👉 Hướng dẫn", "Trước khi chương trình kết thúc, xin mời cả gia đình đứng gần nhau để chụp một bức ảnh đầu năm. Mọi người cùng nhìn vào máy ảnh, cười thật tươi và giữ lại khoảnh khắc sum họp này nhé!", "Đếm 1, 2, 3 nếu muốn tạo không khí."),
        segment("Kết chương trình", "❤️ Ấm áp · 👋 Chào", "Cảm ơn cả gia đình đã cùng nhau tạo nên một khoảng thời gian thật vui. Chúc mọi người năm mới nhiều sức khỏe, nhiều yêu thương và mỗi ngày đều có một điều đáng để mỉm cười. Chúc mừng năm mới!", "Câu 'Chúc mừng năm mới' nói thật rạng rỡ.")
      ])
    }),
    Object.freeze({
      id: "teachers", icon: "👩‍🏫", title: "Lời chúc thầy cô", tone: "purple", focus: "Giọng chân thành và trang trọng",
      guide: "Bài dẫn này không cần nói quá lớn. Điều quan trọng là sự chân thành. Bé hãy nhìn thầy cô, nói chậm và để lời cảm ơn được nghe thật rõ.",
      segments: Object.freeze([
        segment("Lời chào", "🙏 Trang trọng · 😊 Mỉm cười", "Kính thưa các thầy cô giáo và các bạn! Hôm nay chúng em rất vui khi có dịp gửi đến thầy cô những lời cảm ơn từ trái tim của mình.", "Nói chậm hơn ngày thường một chút."),
        segment("Nhắc về lớp học", "📚 Chân thành · 👀 Nhìn thầy cô", "Mỗi ngày đến lớp, chúng em được học thêm những điều mới. Có bài thật dễ, cũng có bài khiến chúng em phải suy nghĩ rất lâu. Và luôn có thầy cô ở bên hướng dẫn để chúng em hiểu hơn từng chút một.", "Nhấn vào cụm 'từng chút một'."),
        segment("Lời cảm ơn", "❤️ Ấm áp · ⏸ Nghỉ nhẹ", "Chúng em cảm ơn thầy cô vì những lời nhắc nhở, những lần kiên nhẫn giảng lại và cả những nụ cười động viên khi chúng em cố gắng. Những điều nhỏ ấy làm mỗi ngày đến trường trở nên thật đáng nhớ.", "Nghỉ nhẹ sau từ 'cảm ơn'."),
        segment("Mời tặng hoa", "🌷 Trang trọng · 👉 Mời", "Và bây giờ, xin mời đại diện các bạn nhỏ lên gửi tặng thầy cô những bông hoa tươi thắm. Đây là món quà nhỏ thay cho lời biết ơn thật lớn của chúng em.", "Nói rõ câu mời và lùi lại nhường sân khấu."),
        segment("Lời chúc", "✨ Sáng rõ · 😊 Mỉm cười", "Chúng em kính chúc thầy cô luôn mạnh khỏe, vui vẻ và có thật nhiều niềm vui trong công việc. Mong rằng mỗi ngày đến lớp, thầy cô cũng sẽ nhận được thật nhiều nụ cười từ học trò.", "Giữ giọng ấm, không đọc quá nhanh."),
        segment("Kết", "🙏 Cúi chào nhẹ · 👋 Chào", "Một lần nữa, chúng em xin gửi lời cảm ơn chân thành đến các thầy cô. Chương trình nhỏ của chúng em xin được khép lại tại đây. Kính chúc thầy cô và các bạn một ngày thật vui!", "Có thể cúi chào nhẹ khi kết thúc.")
      ])
    }),
    Object.freeze({
      id: "friend", icon: "🌟", title: "Giới thiệu một người bạn", tone: "pink", focus: "Nói tự nhiên như trò chuyện",
      guide: "Khi giới thiệu bạn, MC không cần nói kiểu sân khấu quá trang trọng. Hãy kể như đang giúp mọi người làm quen với một người bạn mới, dùng những điều tích cực và cụ thể.",
      segments: Object.freeze([
        segment("Mở đầu", "😊 Thân thiện · 👀 Nhìn khán giả", "Xin chào mọi người! Hôm nay em muốn giới thiệu với các bạn một người bạn rất đáng mến. Bạn ấy có nhiều điều thú vị mà có thể chúng mình chưa biết hết đâu nhé!", "Giọng tự nhiên như đang kể chuyện."),
        segment("Điều dễ nhận ra", "👀 Quan sát · ✨ Miêu tả", "Điều em thường nhớ nhất ở bạn là nụ cười rất tươi. Khi gặp mọi người, bạn thường chào trước và luôn cố gắng làm cho những người xung quanh cảm thấy vui vẻ.", "Có thể thay chi tiết bằng điều thật về người bạn của bé."),
        segment("Sở thích", "🎨 Vui vẻ · 🔊 Rõ ràng", "Bạn có một sở thích mà em thấy rất thú vị. Khi làm điều mình thích, bạn tập trung và hào hứng đến mức có thể kể rất nhiều chuyện về nó. Em nghĩ sở thích ấy làm bạn trở nên thật đặc biệt.", "Nhấn vào cụm 'thật đặc biệt'."),
        segment("Một việc tốt", "❤️ Ấm áp · ⏸ Nghỉ nhẹ", "Có một lần em cần giúp đỡ và bạn đã ở bên. Có thể đó chỉ là một việc nhỏ, nhưng em vẫn nhớ vì nó làm em cảm thấy mình không phải tự xoay xở một mình.", "Giọng chậm và chân thành."),
        segment("Mời bạn chào", "🎤 Mời bạn · 👋 Vẫy tay", "Bây giờ, em xin mời người bạn của mình gửi lời chào đến mọi người. Các bạn hãy cùng dành một tràng vỗ tay thật vui để chào đón bạn nhé!", "Sau câu mời, nhường sân khấu cho bạn."),
        segment("Kết", "😊 Tươi vui · 🤝 Tình bạn", "Cảm ơn mọi người đã lắng nghe. Em mong rằng chúng mình sẽ luôn biết nhìn thấy những điều tốt đẹp ở bạn bè và cùng nhau tạo nên thật nhiều kỷ niệm vui trong lớp học.", "Kết nhẹ nhàng, không cần quá trang trọng.")
      ])
    }),
    Object.freeze({
      id: "talent", icon: "🏆", title: "MC nhí tài năng", tone: "purple", focus: "Kết hợp đủ kỹ năng MC",
      guide: "Đây là chương trình tổng hợp. Bé sẽ phải chào, giới thiệu, chuyển nội dung, giao lưu và kết chương trình. Hãy nhớ: nói rõ, nghỉ đúng chỗ, nhìn khán giả và giữ nụ cười tự nhiên.",
      segments: Object.freeze([
        segment("Mở màn", "🎤 Tự tin · 😊 Mỉm cười", "Xin chào tất cả mọi người đến với chương trình MC nhí tài năng! Hôm nay chúng ta sẽ cùng đi qua nhiều phần thật vui, từ câu chuyện, âm nhạc đến những thử thách nhỏ dành cho khán giả.", "Bắt đầu bằng giọng tự tin nhưng không quá nhanh."),
        segment("Giới thiệu nội dung", "👉 Chuyển ý · 🔊 Rõ ràng", "Chương trình hôm nay có ba phần. Đầu tiên là một câu chuyện ngắn, tiếp theo là tiết mục biểu diễn, và cuối cùng là phần giao lưu bất ngờ. Bé đã sẵn sàng đồng hành cùng em chưa nào?", "Liệt kê ba phần thật rõ."),
        segment("Chuyển từ kể chuyện sang biểu diễn", "⏸ Nghỉ nhẹ · ⭐ Tạo chờ đợi", "Câu chuyện vừa rồi đã khép lại với một điều thật đáng nhớ. Nhưng chương trình vẫn còn một bất ngờ đang chờ phía sau. Xin mời mọi người hướng mắt lên sân khấu để đến với phần biểu diễn tiếp theo!", "Dừng một nhịp trước từ 'Nhưng'."),
        segment("Giao lưu khán giả", "🙌 Tương tác · ❓ Câu hỏi", "Khán giả của chúng ta vẫn còn rất nhiều năng lượng phải không ạ? Em có một câu hỏi nhỏ: phần nào của chương trình làm bé thích nhất? Hãy giơ tay thật cao để em nhìn thấy nhé!", "Sau câu hỏi phải chờ, không nói tiếp ngay."),
        segment("Cảm ơn", "❤️ Chân thành · 👀 Nhìn khán giả", "Cảm ơn tất cả mọi người đã lắng nghe, cổ vũ và cùng tham gia. Một MC sẽ không thể có một chương trình vui nếu thiếu những khán giả tuyệt vời như các bạn.", "Câu cảm ơn nói thật chân thành."),
        segment("Kết thúc", "🏆 Tự tin · 👋 Chào", "Chương trình MC nhí tài năng xin được khép lại tại đây. Em chúc mọi người luôn tự tin nói lên suy nghĩ của mình, biết lắng nghe người khác và mang nụ cười đến mỗi nơi mình xuất hiện. Xin chào và hẹn gặp lại!", "Đây là phần tổng kết: chậm, rõ, nhìn khán giả.")
      ])
    })
  ]);

  // English copy is authored locally, never machine-translated at runtime.
  const EN_PROGRAMS = Object.freeze({"morning":{"title":"A cheerful morning at school","focus":"Speak clearly and smile","guide":"Smile as you greet your class. Pause gently and look at your friends.","segments":[{"title":"Welcome","text":"Hello, teacher and friends! I am happy to see you this lovely morning. Let us begin our day with a big smile!","tip":"Smile and speak clearly."},{"title":"Our school day","text":"Today we will learn new things, explore together, and help one another. Every answer is a brave try. Please raise your hand and share your ideas!","tip":"Pause after “Today”."},{"title":"Warm up","text":"Before we start, let us warm up! Sit up straight, take a deep breath, and stretch your arms high. Are you ready?","tip":"Stretch with your friends."},{"title":"Invite the teacher","text":"We are ready to learn now. Dear teacher, please begin today’s lesson. Everyone, let us give our teacher a big round of applause!","tip":"Use a polite and respectful voice."},{"title":"Next activity","text":"We have finished our first activity. Now it is time to try something new. Please get your things ready and keep your desks tidy.","tip":"Emphasize “something new”."},{"title":"Goodbye","text":"Our class is coming to an end. Thank you, teacher and friends, for a wonderful time together. Have a happy day of learning!","tip":"Finish slowly with a smile."}]},"birthday":{"title":"A friend’s birthday","focus":"A happy, friendly voice","guide":"Make the birthday child feel special. Invite everyone to clap and share kind wishes.","segments":[{"title":"Welcome, everyone","text":"Hello, everyone! Today is a very special day. Can you guess why? Yes! We are celebrating our wonderful friend’s birthday!","tip":"Pause before the answer."},{"title":"Welcome our friend","text":"Here comes our special birthday star! Please give our friend a big hand. We wish you happiness, good health, and many exciting adventures!","tip":"Look toward your friend."},{"title":"Blow out candles","text":"The birthday cake is ready. Close your eyes and make a lovely wish. Everyone, count with me: three, two, one! Blow out the candles!","tip":"Count slowly together."},{"title":"Time to sing","text":"Now it is time for a birthday song! Everyone, please sing along and send our friend your happiest wishes.","tip":"Clap along to the rhythm."},{"title":"Give the gifts","text":"We have some lovely gifts for our friend. Every gift carries a warm wish. Please come forward one by one and smile for a photo!","tip":"Speak warmly and gently."},{"title":"End the party","text":"Thank you for making this birthday so special. We hope our friend keeps smiling all year long. Now let us enjoy the cake and have fun together!","tip":"End with a cheerful invitation."}]},"music":{"title":"Our music show","focus":"Introduce acts with excitement","guide":"Help your audience look forward to every performance. Say each performer’s name clearly.","segments":[{"title":"Opening","text":"Dear teachers and friends, welcome to our music show! Today we will share songs, dances, and lots of happy smiles. Let the show begin!","tip":"Start clearly and politely."},{"title":"First performance","text":"Our first performance will be full of joy! Please welcome our young performers with a huge round of applause. Enjoy the show!","tip":"Sound excited as you invite applause."},{"title":"Thank you and next act","text":"What a wonderful performance! Thank you to our talented friends. Next, we have another exciting act waiting for you!","tip":"Pause before “Next”."},{"title":"Second performance","text":"Our next song is soft and beautiful. Please sit comfortably, listen carefully, and give our performer a warm welcome!","tip":"Slow down to build excitement."},{"title":"Audience time","text":"Hello, everyone! Are you enjoying the show? If you are happy, raise your hands and clap together. Thank you for cheering us on!","tip":"Let the audience answer."},{"title":"Closing","text":"Our music show is coming to an end. Thank you to our teachers, performers, and lovely audience. Goodbye, and see you again soon!","tip":"Speak slowly at the end."}]},"books":{"title":"Book festival","focus":"Tell stories with wonder","guide":"Use your voice to open the door to exciting worlds inside books.","segments":[{"title":"Welcome to the festival","text":"Hello, teachers and friends! Welcome to our book festival. Every book is like a little door to an amazing new world.","tip":"Stress “little door”."},{"title":"Explore stories","text":"Some books take us deep into the ocean. Other books bring us to the stars. Every story has something wonderful to discover!","tip":"Give each idea a different feeling."},{"title":"Reading corners","text":"On the left, we have picture books and fairy tales. On the right, we have books about nature and science. Please choose a book and enjoy reading!","tip":"Look left and right as you speak."},{"title":"Invite a reader","text":"Now let us hear from a friend about a favorite book. Please come up and tell us what makes your book special!","tip":"Pause and make room for the speaker."},{"title":"Little challenge","text":"Before we finish, here is a fun challenge. Remember your favorite character from today. Can you tell a friend why you like that character?","tip":"Make it sound like a secret mission."},{"title":"Goodbye","text":"Our book festival is ending, but the stories can stay with us. Read a little every day and let your imagination fly. See you next time!","tip":"End gently and warmly."}]},"art":{"title":"Our art exhibition","focus":"Describe with imagination","guide":"Help visitors notice colors and shapes. Every artist has a different way to create.","segments":[{"title":"Welcome to the gallery","text":"Welcome to our young artists’ exhibition! Each picture has its own colors, ideas, and story. Let us look carefully and enjoy the art.","tip":"Pause to create curiosity."},{"title":"Look closely","text":"Look at the colors, lines, and tiny details. Some artists love bright colors. Others use soft colors. Every picture is special in its own way!","tip":"Emphasize “every picture”."},{"title":"Our first picture","text":"Here is a colorful picture. What do you think is happening? Look closely and imagine the story the artist wants to share.","tip":"Let everyone look at the picture."},{"title":"Meet the artist","text":"Please welcome our young artist! Can you tell us how you got your idea? What is your favorite part of your picture?","tip":"Ask kindly and slowly."},{"title":"Celebrate creativity","text":"Thank you for sharing your artwork! A great picture does not have to look exactly like real life. Our imagination makes every creation special.","tip":"Sound encouraging."},{"title":"Closing the gallery","text":"Our art exhibition is ending. Thank you to our young artists and everyone who visited today. We hope to see you at our next exhibition!","tip":"Finish with a warm invitation."}]},"animals":{"title":"Exploring the animal world","focus":"Tell exciting stories","guide":"You are guiding a tour through nature. Share amazing animal facts and ask curious questions.","segments":[{"title":"Welcome, explorers","text":"Hello, young explorers! Today we are visiting the animal world. We will meet animals that fly, swim, run, and sleep in surprising ways.","tip":"Sound curious and mysterious."},{"title":"The grasslands","text":"Our first stop is the grassland. Look at the strong lions, tall giraffes, and striped zebras! Every animal has a special way to survive.","tip":"Say animal names clearly."},{"title":"The ocean","text":"Now let us dive into the blue ocean. Dolphins swim and play, sea turtles glide along, and colorful fish swim around coral reefs. What can you see?","tip":"Use a gentle ocean voice."},{"title":"The forest","text":"Let us walk quietly through the forest. Can you hear the birds? A squirrel may be hiding in a tree. There are many little sounds to discover.","tip":"Lower your voice for the question."},{"title":"Question for everyone","text":"Which animal would you choose as a friend? Think for a moment and tell someone next to you why you picked it!","tip":"Pause for answers."},{"title":"End our trip","text":"Our animal adventure is ending. Every animal is important to nature. Let us love animals and protect their homes. Goodbye, explorers!","tip":"End with a warm, confident voice."}]},"sports":{"title":"Sports day","focus":"Bring energy and rhythm","guide":"Cheer loudly but speak clearly. Slow down to explain the rules and safety.","segments":[{"title":"Opening ceremony","text":"Hello, young athletes! Welcome to sports day! We will run, play, laugh, and work together. Let the fun begin!","tip":"Be energetic without shouting."},{"title":"Play fairly","text":"Before we play, remember this: always try your best and be kind. Winning is fun, but being brave and respectful matters even more.","tip":"Slow down for the key message."},{"title":"First event","text":"Our first event is the running race. Runners, please take your places, check your shoes, and listen for the signal. Audience, are you ready?","tip":"Emphasize the event name."},{"title":"Cheer together","text":"Go, go, go! Our friends are running so well! Everyone deserves a big clap for trying hard and crossing the finish line.","tip":"Cheer with a steady rhythm."},{"title":"Congratulations","text":"Well done, everyone! We saw fast running, big smiles, and great teamwork. Your courage and effort made today special.","tip":"Stress “great teamwork”."},{"title":"Closing ceremony","text":"Sports day has come to an end. Thank you, athletes and audience, for a wonderful day. Stay healthy and keep moving every day!","tip":"Finish with a strong, happy voice."}]},"green":{"title":"Our green planet day","focus":"Speak with care and hope","guide":"Show how small actions, like saving water and planting trees, can help nature.","segments":[{"title":"Welcome to green day","text":"Hello, friends! Welcome to Green Day! Today we will discover small ways to keep our school, our homes, and our planet clean and beautiful.","tip":"Emphasize “small ways”."},{"title":"A little piece of litter","text":"One tiny piece of paper on the ground may look small. But if everyone leaves litter behind, our playground becomes dirty. Let us pick it up!","tip":"End in an encouraging voice."},{"title":"Save water","text":"Water is precious. Turn off the tap while brushing your teeth. Give plants the water they need, but do not waste it. Every drop matters!","tip":"Pause after each example."},{"title":"Care for trees","text":"A tree needs time to grow. We can water it, protect its branches, and take care of the flowers. One day, its shade will keep us cool.","tip":"Speak slowly and warmly."},{"title":"Green challenge","text":"Choose one green action for today! You could pick up litter, switch off an unused light, or water a little plant. What will you do?","tip":"Wait for the audience to think."},{"title":"Our promise","text":"Let us make a simple promise: do one good thing for nature every day. Many small actions can make a big difference. Thank you, everyone!","tip":"Emphasize “big difference”."}]},"tet":{"title":"Happy Lunar New Year","focus":"Warm and polite wishes","guide":"Speak warmly to your family. Slow down for wishes and brighten your voice for games.","segments":[{"title":"Happy new year","text":"Dear grandparents, parents, and family, happy Lunar New Year! A new year brings family time, kind wishes, and many smiles. I wish everyone good health and joy!","tip":"Speak politely and clearly."},{"title":"The New Year holiday","text":"During Tet, we see bright flowers and share special meals. We visit our loved ones and spend time together. These moments make our family happy.","tip":"Use a warm family voice."},{"title":"Share your wishes","text":"Now it is time to share our New Year wishes. Let us wish our grandparents and parents good health and happiness. Thank you for always loving us!","tip":"Look at the people you wish well."},{"title":"Family game","text":"After those lovely wishes, let us play a fun family game! Please make your teams and get ready to laugh and cheer together!","tip":"Use a playful voice."},{"title":"Family photo","text":"Before we finish, let us take a family photo. Stand close together, look at the camera, and smile! Ready? One, two, three!","tip":"Count clearly before the photo."},{"title":"Happy ending","text":"Thank you, everyone, for this wonderful time together. May the new year bring love, health, and many happy memories. Happy New Year!","tip":"Make the last wish bright and cheerful."}]},"teachers":{"title":"A thank-you to teachers","focus":"Speak sincerely and politely","guide":"Look at your teachers and speak from the heart. Say thank you clearly.","segments":[{"title":"Welcome","text":"Dear teachers and friends, hello! Today we are happy to say thank you to our wonderful teachers.","tip":"Speak slowly and politely."},{"title":"Our classroom","text":"Every day at school, we learn something new. Some lessons are easy, and some are hard. Our teachers help us understand, little by little.","tip":"Emphasize “little by little”."},{"title":"Thank you","text":"Thank you, teachers, for your patience, kind words, and encouraging smiles. You help us keep trying and make school a happy place.","tip":"Pause after “Thank you”."},{"title":"Present flowers","text":"Now, please welcome our friends to present these beautiful flowers to our teachers. They are a small gift to show our great thanks.","tip":"Step back after inviting the students."},{"title":"Our wishes","text":"We wish our teachers good health, happiness, and many wonderful school days. We hope you smile as much as we do!","tip":"Keep your voice soft and warm."},{"title":"Closing","text":"Once again, thank you to all our teachers. Our little program is coming to an end. Have a lovely day, everyone!","tip":"Bow gently if you wish."}]},"friend":{"title":"Introducing a friend","focus":"Speak like a friendly chat","guide":"Share kind, true details about a friend in a natural voice.","segments":[{"title":"Hello, everyone","text":"Hello, everyone! Today I want to introduce a very special friend. There is so much we can learn about each other!","tip":"Speak naturally."},{"title":"A lovely smile","text":"The first thing I notice about my friend is a bright smile. My friend likes to greet people and help everyone feel welcome.","tip":"Use a real detail about your own friend."},{"title":"A fun hobby","text":"My friend has a hobby that is very interesting. When doing this favorite activity, my friend feels happy and excited. What do you love to do?","tip":"Emphasize what makes your friend special."},{"title":"A kind action","text":"One day, I needed some help and my friend was there for me. Even a small act of kindness can mean a lot. I still remember it.","tip":"Speak slowly and sincerely."},{"title":"Say hello","text":"Now I would like to invite my friend to say hello. Please welcome my friend with a big round of applause!","tip":"Leave room for your friend to speak."},{"title":"Thank you","text":"Thank you, everyone, for listening. Let us notice the good in our friends and make more happy memories together. Goodbye!","tip":"End in a friendly voice."}]},"talent":{"title":"Young MC talent show","focus":"Use all your MC skills","guide":"Greet, introduce, invite, and close confidently. Remember to smile and make eye contact.","segments":[{"title":"Opening","text":"Hello, everyone! Welcome to our Young MC Talent Show! Today we have stories, music, and fun surprises for our audience.","tip":"Begin confidently, but not too fast."},{"title":"Today’s program","text":"Our show has three parts. First, a short story. Next, a fun performance. Finally, a surprise question for everyone. Are you ready?","tip":"Make all three parts clear."},{"title":"Next performance","text":"Our story has come to an end, but a new surprise is waiting! Please look toward the stage and get ready for our next performance.","tip":"Pause before “but”."},{"title":"Talk to the audience","text":"Hello, audience! Are you still full of energy? Which part of the show did you enjoy the most? Raise your hand and tell us!","tip":"Wait for answers."},{"title":"Thank everyone","text":"Thank you for listening, cheering, and joining us. A happy show needs a wonderful audience like you. We are glad you are here!","tip":"Sound sincere."},{"title":"Closing","text":"Our Young MC Talent Show is ending. Keep speaking bravely, listening kindly, and sharing your smiles with others. Goodbye, and see you soon!","tip":"Finish slowly and look at the audience."}]}});
  let language = "vi";
  const isEn = () => language === "en";
  const tr = (vi, en) => isEn() ? en : vi;
  const displayProgram = (p) => {
    if (!p || !isEn() || !EN_PROGRAMS[p.id]) return p;
    const e = EN_PROGRAMS[p.id];
    return { ...p, ...e, segments: p.segments.map((seg, i) => ({ ...seg,
      title: e.segments[i]?.title || seg.title,
      text: e.segments[i]?.text || seg.text,
      tip: e.segments[i]?.tip || seg.tip,
      cue: "😊 Smile · 👀 Eye contact" })) };
  };
  function languageControls() {
    return `<div class="ee-mc-header-actions"><div class="ee-mc-languages" role="group" aria-label="Language"><button type="button" data-mc-lang="vi" class="${!isEn() ? "on" : ""}" aria-pressed="${!isEn()}">Tiếng Việt</button><button type="button" data-mc-lang="en" class="${isEn() ? "on" : ""}" aria-pressed="${isEn()}">English</button></div><button type="button" class="ee-mc-btn primary" data-mc-exit>← Games</button></div>`;
  }
  function bindLanguages() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.querySelectorAll("[data-mc-lang]").forEach((button) => button.addEventListener("click", () => {
      const next = button.dataset.mcLang;
      if (!/^(vi|en)$/.test(next) || next === language) return;
      stopEverything(); clearRecording(); language = next;
      const program = programById(currentProgramId);
      if (!program) renderRegistry();
      else if (stageMode) renderStage(program);
      else if (host.querySelector(".ee-mc-prac")) renderPractice(program);
      else if (host.querySelector(".ee-mc-finish")) renderFinish(program, false);
      else renderProgramIntro(program);
    }));
    host.querySelector("[data-mc-exit]")?.addEventListener("click", () => {
      stopEverything(); clearRecording(); activeContext?.back?.();
    });
  }
  /* =====================================================================
     Giao diện mới: tập từng câu, chữ to, cô đọc mẫu, bé thu giọng và nghe lại.
     ===================================================================== */
  const DONE_KEY = "class1-mc-host-done";
  let sentenceIndex = 0;
  let mediaRecorder = null;
  let recordChunks = [];
  let recordUrl = "";
  let recordStream = null;
  let recording = false;
  let playbackAudio = null;

  const doneSet = (() => { try { return new Set(JSON.parse(window.localStorage.getItem(DONE_KEY) || "[]")); } catch (_) { return new Set(); } })();
  function markDone(id) {
    doneSet.add(id);
    try { window.localStorage.setItem(DONE_KEY, JSON.stringify([...doneSet])); } catch (_) {}
  }

  /* Tách đoạn dẫn thành từng câu để bé tập */
  function sentencesOf(text) {
    return String(text || "").replace(/\s+/g, " ").trim().match(/[^.!?…]+(?:[.!?…]+["”']?|$)/g)?.map((s) => s.trim()).filter(Boolean) || [String(text || "")];
  }
  const cuesOf = (cue) => String(cue || "").split("·").map((c) => c.trim()).filter(Boolean);

  function programById(id) {
    return PROGRAMS.find((item) => item.id === id) || null;
  }

  function stopTimers() {
    window.clearTimeout(countdownTimer);
    window.clearTimeout(stageTimer);
    countdownTimer = 0;
    stageTimer = 0;
  }

  /* ---------- Thu giọng của bé ---------- */
  const canRecord = () => typeof window !== "undefined" && typeof window.MediaRecorder === "function" && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function";
  function clearRecording() {
    if (recordUrl) { try { URL.revokeObjectURL(recordUrl); } catch (_) {} }
    recordUrl = "";
  }
  function stopRecording() {
    if (playbackAudio) { try { playbackAudio.pause(); playbackAudio.src = ""; } catch (_) {} playbackAudio = null; }
    if (mediaRecorder && mediaRecorder.state !== "inactive") { try { mediaRecorder.stop(); } catch (_) {} }
    if (recordStream) { recordStream.getTracks().forEach((t) => { try { t.stop(); } catch (_) {} }); }
    recordStream = null;
    recording = false;
  }
  async function toggleRecording(onChange) {
    if (recording) { stopRecording(); return; }
    stopNarration();
    try {
      recordStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (_) {
      setVoiceStatus(tr("Chưa mở được micro. Con nhờ người lớn cho phép dùng micro nhé.", "Microphone unavailable. Please ask an adult for permission."));
      return;
    }
    clearRecording();
    recordChunks = [];
    try { mediaRecorder = new MediaRecorder(recordStream); } catch (_) { setVoiceStatus(tr("Máy này chưa thu được âm thanh.", "Recording is not supported on this device.")); stopRecording(); return; }
    mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size) recordChunks.push(e.data); };
    mediaRecorder.onstop = () => {
      if (recordChunks.length) recordUrl = URL.createObjectURL(new Blob(recordChunks, { type: mediaRecorder.mimeType || "audio/webm" }));
      recording = false;
      onChange();
    };
    mediaRecorder.start();
    recording = true;
    onChange();
    /* Tự dừng sau 30 giây để không thu quá dài */
    window.setTimeout(() => { if (recording) stopRecording(); }, 30000);
  }
  function playRecording() {
    if (!recordUrl) return;
    stopNarration();
    try { if (playbackAudio) { playbackAudio.pause(); playbackAudio.src = ""; } playbackAudio = new Audio(recordUrl); playbackAudio.play().catch(() => {}); } catch (_) {}
  }

  /* ---------- Giọng đọc mẫu ---------- */
  function stopNarration() {
    audioNonce += 1;
    speechUtterance = null;
    fallbackQueue = [];
    fallbackQueueIndex = 0;

    try {
      if (narrationAudio) {
        narrationAudio.pause();
        narrationAudio.removeAttribute("src");
        narrationAudio.load();
      }
    } catch (_) {}
  }

  function stopEverything() {
    stopTimers();
    stopNarration();
    stopRecording();
    stageRunning = false;
    stagePaused = false;
  }

  function cleanSpeechText(value) {
    return String(value || "").replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, " ").replace(/\s+/g, " ").trim();
  }

  // Google TTS only. Browser speechSynthesis is not used.
  function ttsFallbackUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=${isEn() ? "en" : "vi"}&client=tw-ob&q=${encodeURIComponent(text)}`;
  }

  function setVoiceStatus(message) {
    const host = activeContext && activeContext.host;
    const node = host && host.querySelector("#ee-mc-voice-status");
    if (node) { node.hidden = !message; node.textContent = message || ""; }
  }

  function splitSpeechChunks(text, maxLength = 170) {
    const out = [];
    let cur = "";
    sentencesOf(text).forEach((s) => {
      if (!cur) cur = s;
      else if ((cur + " " + s).length <= maxLength) cur += " " + s;
      else { out.push(cur); cur = s; }
    });
    if (cur) out.push(cur);
    return out.flatMap((c) => {
      if (c.length <= maxLength) return [c];
      const parts = []; let buf = "";
      c.split(" ").forEach((w) => { if (!buf || (buf + " " + w).length <= maxLength) buf = buf ? buf + " " + w : w; else { parts.push(buf); buf = w; } });
      if (buf) parts.push(buf);
      return parts;
    });
  }

  let lastSpeechKey = "", lastSpeechAt = 0;
  function speak(text, onEnd) {
    const clean = cleanSpeechText(text);
    if (!clean || !narrationAudio) return;
    const key = language + ":" + clean;
    if (key === lastSpeechKey && Date.now() - lastSpeechAt < 280) return;
    lastSpeechKey = key; lastSpeechAt = Date.now();
    stopNarration();
    const nonce = audioNonce;
    const done = () => { if (nonce === audioNonce && typeof onEnd === "function") onEnd(); };
    speakFallback(clean, nonce, done);
  }

  function speakFallback(text, nonce, done) {
    if (!narrationAudio || nonce !== audioNonce) return;
    fallbackQueue = splitSpeechChunks(text);
    fallbackQueueIndex = 0;
    if (!fallbackQueue.length) return;
    playNextFallbackChunk(nonce, done);
  }

  function playNextFallbackChunk(nonce, done) {
    if (!narrationAudio || nonce !== audioNonce) return;
    const chunk = fallbackQueue[fallbackQueueIndex];
    if (!chunk) return;
    const fail = () => { if (nonce === audioNonce) setVoiceStatus(tr("Chưa phát được giọng đọc. Con nhờ người lớn kiểm tra loa và mạng nhé.", "Audio is unavailable. Please ask an adult to check your connection.")); };
    try {
      narrationAudio.src = ttsFallbackUrl(chunk);
      narrationAudio.playbackRate = 0.96;
      narrationAudio.onended = () => {
        if (nonce !== audioNonce) return;
        fallbackQueueIndex += 1;
        if (fallbackQueueIndex < fallbackQueue.length) playNextFallbackChunk(nonce, done);
        else if (done) done();
      };
      narrationAudio.onerror = fail;
      const promise = narrationAudio.play();
      if (promise && typeof promise.catch === "function") promise.catch(fail);
    } catch (_) { fail(); }
  }

  function setBanner(program = null, segmentItem = null) {
    const setSubBanner = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof setSubBanner !== "function") return;
    const items = [{ level: 2, title: `${GAME_NUMBER}. ${tr("Tập làm MC", "Be a Young MC")}`, action: program ? renderRegistry : null }];
    if (program) {
      const index = Math.max(0, PROGRAMS.indexOf(program));
      items.push({ level: 3, title: `${GAME_NUMBER}.${index + 1} ${displayProgram(program).title}`, action: segmentItem ? () => renderProgramIntro(program) : null });
    }
    if (program && segmentItem) {
      items.push({ level: 4, title: `${GAME_NUMBER}.${PROGRAMS.indexOf(program) + 1}.${currentSegmentIndex + 1} ${segmentItem.title}` });
    }
    setSubBanner({ items });
  }

  function ensureStyles() {
    if (!document.getElementById("class1-game-explorer-font")) {
      const link = document.createElement("link");
      link.id = "class1-game-explorer-font";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap&subset=vietnamese";
      document.head.appendChild(link);
    }
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-mc-page{width:100%;max-width:82rem;margin:0 auto;color:#344054;font-family:"Baloo 2","Nunito","Segoe UI",system-ui,sans-serif}
      .ee-mc-page button{font-family:inherit}
      .ee-mc-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:.8rem;flex-wrap:wrap}
      .ee-mc-head h1{margin:0;font-size:clamp(26px,3vw,36px);line-height:1.15;color:#5B216E;font-weight:800}
      .ee-mc-head p{margin:.2rem 0 0;font-size:17px;font-weight:600;color:#667085}
      .ee-mc-header-actions{display:flex;justify-content:flex-end;align-items:center;gap:.8rem;flex-wrap:wrap;margin:0 0 1rem}
      .ee-mc-languages{display:inline-flex;align-items:center;gap:0;padding:4px;border:2px solid #BFDBFE;border-radius:18px;background:#fff;box-shadow:0 6px 16px rgba(59,130,246,.12)}
      .ee-mc-languages button{min-height:40px;border:0;background:transparent;padding:.45rem 1rem;border-radius:14px;font-size:17px;font-weight:800;color:#1E3A8A;cursor:pointer;white-space:nowrap;font-family:inherit}
      .ee-mc-languages button.on{background:linear-gradient(90deg,#60A5FA,#14B8A6);color:#fff;box-shadow:0 4px 10px rgba(20,184,166,.22)}
      .ee-mc-languages button:focus-visible{outline:3px solid #93C5FD;outline-offset:2px}
      .ee-mc-btn{min-height:52px;border:2px solid #E9D5FF;border-radius:16px;background:#fff;padding:.4rem 1rem;font-size:18px;font-weight:700;color:#5B216E;cursor:pointer}
      .ee-mc-btn:hover:not(:disabled){border-color:#C4B5FD}
      .ee-mc-btn.primary{border:0;color:#fff;background:linear-gradient(90deg,#EC4899,#8B5CF6);box-shadow:0 6px 16px rgba(139,92,246,.22)}
      .ee-mc-btn.teal{border:0;color:#fff;background:linear-gradient(90deg,#3B82F6,#10B981)}
      .ee-mc-btn.soft{border-color:#6EE7B7;background:linear-gradient(90deg,#ECFDF5,#E0F2FE);color:#047857}
      .ee-mc-btn.rec{border-color:#FDA4AF;background:#FFF1F2;color:#BE123C}
      .ee-mc-btn.rec.on{border-color:#E11D48;background:#E11D48;color:#fff;animation:eeMcPulse 1.2s infinite}
      @keyframes eeMcPulse{50%{box-shadow:0 0 0 8px rgba(225,29,72,.18)}}
      .ee-mc-btn:disabled{opacity:.4;cursor:not-allowed}
      .ee-mc-btn:focus-visible,.ee-mc-card:focus-visible,.ee-mc-part:focus-visible,.ee-mc-sent:focus-visible{outline:3px solid #F472B6;outline-offset:2px}
      .ee-mc-voice{margin:.5rem 0 0;padding:.4rem .7rem;border-radius:12px;background:#FFF7ED;color:#C2410C;font-size:16px;font-weight:600}
      .ee-mc-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem}
      .ee-mc-card{position:relative;min-width:0;border:2px solid var(--mc-border);background:var(--mc-bg);border-radius:20px;padding:.9rem;text-align:left;cursor:pointer;color:#344054;transition:transform .16s,box-shadow .16s}
      .ee-mc-card:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(76,29,149,.12)}
      .ee-mc-card .icon{font-size:40px;line-height:1}
      .ee-mc-card h2{margin:.5rem 0 .2rem;font-size:20px;line-height:1.25;font-weight:800;color:var(--mc-title)}
      .ee-mc-card p{margin:0;color:#667085;font-size:15.5px;font-weight:600;line-height:1.35}
      .ee-mc-card .done{position:absolute;right:10px;top:10px;padding:0 .55rem;border-radius:999px;background:#10B981;color:#fff;font-size:14px;font-weight:700}
      .ee-mc-tone-pink{--mc-bg:#FFF1F7;--mc-border:#F9A8D4;--mc-title:#BE185D}.ee-mc-tone-purple{--mc-bg:#F5F3FF;--mc-border:#D8B4FE;--mc-title:#6D28D9}.ee-mc-tone-teal{--mc-bg:#ECFDF5;--mc-border:#99F6E4;--mc-title:#0F766E}.ee-mc-tone-amber{--mc-bg:#FFFBEB;--mc-border:#FDE68A;--mc-title:#B45309}
      .ee-mc-intro{display:grid;grid-template-columns:minmax(220px,.7fr) minmax(0,1.3fr);gap:1rem;align-items:stretch}
      .ee-mc-preview{border:2px solid #F9A8D4;border-radius:22px;min-height:240px;background:linear-gradient(#FFF8FB,#F8EDFF);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center;padding:1rem}
      .ee-mc-curtain{position:absolute;top:0;bottom:0;width:24%;background:linear-gradient(90deg,#BE185D,#EC4899);opacity:.9}.ee-mc-curtain.left{left:0;clip-path:polygon(0 0,100% 0,70% 100%,0 100%)}.ee-mc-curtain.right{right:0;clip-path:polygon(0 0,100% 0,100% 100%,30% 100%)}
      .ee-mc-preview .core{position:relative;z-index:2;font-size:70px;line-height:1}
      .ee-mc-guide{border:2px solid #E9D5FF;border-radius:22px;background:#fff;padding:1rem;display:flex;flex-direction:column;gap:.7rem}
      .ee-mc-bubble{display:flex;align-items:center;gap:.6rem;border:2px solid #F9A8D4;border-radius:18px;background:#FFF1F7;padding:.55rem .8rem;color:#BE185D;font-size:19px;font-weight:700;line-height:1.4}
      .ee-mc-bubble .ico{font-size:30px}.ee-mc-bubble .txt{flex:1}
      .ee-mc-say{flex:0 0 auto;min-width:50px;min-height:50px;border-radius:14px;border:2px solid #F9A8D4;background:#fff;cursor:pointer;font-size:22px}
      .ee-mc-skills{display:flex;flex-wrap:wrap;gap:.4rem}
      .ee-mc-skill{border:2px solid #E9D5FF;border-radius:999px;background:#FAF5FF;padding:.15rem .75rem;font-size:16px;font-weight:700;color:#6D28D9}
      .ee-mc-actions{display:flex;flex-wrap:wrap;gap:.6rem}
      .ee-mc-parts{margin-top:1rem;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:.6rem}
      .ee-mc-part{display:flex;flex-direction:column;align-items:center;gap:.15rem;border:2px solid #E9D5FF;border-radius:18px;background:#fff;padding:.6rem .4rem;cursor:pointer;text-align:center;color:#5B216E}
      .ee-mc-part:hover{border-color:#C4B5FD}
      .ee-mc-part .n{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff;font-size:18px;font-weight:800}
      .ee-mc-part .e{font-size:24px;line-height:1.2}
      .ee-mc-part strong{font-size:16px;font-weight:700;line-height:1.2}
      .ee-mc-prac{border:2px solid #E9D5FF;border-radius:24px;background:#fff;padding:1rem;display:flex;flex-direction:column;gap:.8rem}
      .ee-mc-prac-top{display:flex;align-items:center;gap:.8rem;flex-wrap:wrap}
      .ee-mc-prac-top h2{margin:0;font-size:26px;font-weight:800;color:#5B216E;flex:1;min-width:200px}
      .ee-mc-dots{display:flex;gap:6px}
      .ee-mc-dots span{width:22px;height:22px;border-radius:50%;background:#EDE9FE}
      .ee-mc-dots span.on{background:linear-gradient(135deg,#EC4899,#8B5CF6)}
      .ee-mc-dots span.past{background:#10B981}
      .ee-mc-cues{display:flex;flex-wrap:wrap;gap:.4rem}
      .ee-mc-cue{border:2px solid #FDE68A;border-radius:999px;background:#FFFBEB;color:#B45309;padding:.1rem .8rem;font-size:17px;font-weight:700}
      .ee-mc-sents{display:flex;flex-direction:column;gap:.5rem}
      .ee-mc-sent{display:flex;align-items:flex-start;gap:.6rem;border:2px solid transparent;border-radius:18px;background:#FAFAFA;padding:.5rem .8rem;text-align:left;cursor:pointer;color:#98A2B3;font-size:19px;font-weight:600;line-height:1.45;transition:background .15s,color .15s}
      .ee-mc-sent .k{flex:0 0 30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#EDE9FE;color:#6D28D9;font-size:16px;font-weight:800;margin-top:.15rem}
      .ee-mc-sent.done{color:#475467;background:#F0FDF4}.ee-mc-sent.done .k{background:#10B981;color:#fff}
      .ee-mc-sent.now{border-color:#EC4899;background:#FFF1F7;color:#3B0764;font-size:clamp(22px,2.6vw,30px);font-weight:800;line-height:1.4}
      .ee-mc-sent.now .k{background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff;flex-basis:36px;height:36px;font-size:19px}
      .ee-mc-sent.speaking{background:#FEF9C3;border-color:#FACC15}
      .ee-mc-tip{border:2px solid #7DD3FC;border-radius:16px;background:#F0F9FF;padding:.5rem .8rem;color:#0369A1;font-size:17px;font-weight:700}
      .ee-mc-tools{display:flex;flex-wrap:wrap;gap:.5rem}
      .ee-mc-nav{display:flex;gap:.6rem;justify-content:space-between;flex-wrap:wrap;border-top:2px dashed #EDE9FE;padding-top:.7rem}
      .ee-mc-stage-mode{border-radius:26px;background:linear-gradient(180deg,#1E1B4B,#312E81);color:#fff;padding:1rem 1.2rem;position:relative;overflow:hidden;min-height:520px;display:flex;flex-direction:column}
      .ee-mc-stage-mode .lights{position:absolute;inset:0;background:radial-gradient(circle at 20% 0,rgba(251,207,232,.32),transparent 30%),radial-gradient(circle at 80% 0,rgba(165,243,252,.25),transparent 30%);pointer-events:none}
      .ee-mc-live-head{position:relative;display:flex;align-items:center;justify-content:space-between;gap:.8rem;flex-wrap:wrap}
      .ee-mc-live-head h2{margin:0;font-size:24px;font-weight:800}
      .ee-mc-live-badge{border:2px solid rgba(255,255,255,.35);border-radius:999px;padding:.1rem .8rem;font-size:16px;font-weight:700;background:rgba(255,255,255,.1)}
      .ee-mc-live-body{position:relative;flex:1;max-width:980px;margin:1.2rem auto;text-align:center;display:flex;flex-direction:column;justify-content:center;gap:.6rem}
      .ee-mc-live-title{font-size:20px;font-weight:800;color:#FBCFE8}
      .ee-mc-live-text{font-size:clamp(24px,3vw,38px);font-weight:700;line-height:1.5}
      .ee-mc-live-text span{color:rgba(255,255,255,.35);transition:color .3s}
      .ee-mc-live-text span.now{color:#FDE68A}
      .ee-mc-live-text span.past{color:rgba(255,255,255,.6)}
      .ee-mc-live-cue{font-size:18px;font-weight:700;color:#FDE68A}
      .ee-mc-countdown{font-size:120px;font-weight:800;line-height:1;color:#FDE68A}
      .ee-mc-live-controls{position:relative;display:flex;justify-content:center;gap:.6rem;flex-wrap:wrap}
      .ee-mc-stage-mode .ee-mc-btn{background:#fff;color:#3B0764;border-color:#fff}
      .ee-mc-stage-mode .ee-mc-btn.primary{background:linear-gradient(90deg,#EC4899,#8B5CF6);color:#fff}
      .ee-mc-speed{display:inline-flex;border-radius:16px;overflow:hidden;border:2px solid #fff}
      .ee-mc-speed button{min-height:48px;border:0;background:rgba(255,255,255,.12);color:#fff;padding:0 .9rem;font-size:17px;font-weight:700;cursor:pointer}
      .ee-mc-speed button.on{background:#fff;color:#3B0764}
      .ee-mc-finish{border:2px solid #FBCFE8;border-radius:24px;background:linear-gradient(135deg,#FFF1F7,#F5F3FF);padding:1.2rem;text-align:center}
      .ee-mc-finish .big{font-size:64px;line-height:1.1}
      .ee-mc-finish h2{margin:.3rem 0;color:#BE185D;font-size:32px;font-weight:800}
      .ee-mc-finish p{margin:.2rem 0 .8rem;color:#5B216E;font-size:19px;font-weight:700}
      .ee-mc-selfcheck{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.6rem;max-width:900px;margin:0 auto 1rem}
      .ee-mc-check{border:2px solid #E9D5FF;background:#fff;border-radius:18px;padding:.6rem .4rem;font-size:17px;font-weight:700;color:#6D28D9;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:.1rem}
      .ee-mc-check .e{font-size:32px;line-height:1.1}
      .ee-mc-check.done{background:#ECFDF5;border-color:#6EE7B7;color:#047857}
      .ee-mc-finish-actions{display:flex;justify-content:center;gap:.6rem;flex-wrap:wrap}
      @media(max-width:1000px){.ee-mc-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.ee-mc-intro{grid-template-columns:1fr}.ee-mc-preview{min-height:160px}.ee-mc-parts{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:700px){.ee-mc-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem}.ee-mc-card h2{font-size:17px}.ee-mc-card p{display:none}.ee-mc-parts{grid-template-columns:repeat(2,minmax(0,1fr))}.ee-mc-selfcheck{grid-template-columns:repeat(3,minmax(0,1fr))}.ee-mc-sent{font-size:17px}.ee-mc-stage-mode{min-height:440px;padding:.8rem}}
      @media(prefers-reduced-motion:reduce){.ee-mc-btn.rec.on{animation:none}.ee-mc-live-text span{transition:none}}
    `;
    document.head.appendChild(style);
  }

  /* ---------- Danh sách chương trình ---------- */
  function renderRegistry() {
    stopEverything();
    clearRecording();
    currentProgramId = "";
    currentSegmentIndex = 0;
    stageMode = false;
    setBanner();
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-mc-page">${languageControls()}
        <div class="ee-mc-head"><div><h1>🎤 ${tr("Tập làm MC", "Be a Young MC")}</h1><p>${tr("12 chương trình", "12 programs")} • ${doneSet.size} ${tr("đã hoàn thành", "completed")}</p></div></div>
        <div class="ee-mc-grid">
          ${PROGRAMS.map((program, index) => `
            <button class="ee-mc-card ee-mc-tone-${esc(program.tone)}" data-mc-program="${esc(program.id)}" type="button">
              ${doneSet.has(program.id) ? `<span class="done">${tr("✓ Đã dẫn", "✓ Completed")}</span>` : ""}
              <span class="icon" aria-hidden="true">${program.icon}</span>
              <h2>${index + 1}. ${esc(displayProgram(program).title)}</h2>
              <p>${esc(displayProgram(program).focus)}</p>
            </button>`).join("")}
        </div>
      </div>`;
    bindLanguages();
    host.querySelectorAll("[data-mc-program]").forEach((button) => {
      button.addEventListener("click", () => {
        const program = programById(button.dataset.mcProgram);
        if (program) renderProgramIntro(program);
      });
    });
  }

  /* ---------- Trang chuẩn bị ---------- */
  function renderProgramIntro(program) {
    stopEverything();
    currentProgramId = program.id;
    currentSegmentIndex = 0;
    stageMode = false;
    setBanner(program);
    const host = activeContext && activeContext.host;
    if (!host) return;
    const firstSentence = sentencesOf(displayProgram(program).guide)[0];
    host.innerHTML = `
      <div class="ee-mc-page">${languageControls()}
        <div class="ee-mc-head"><div><h1>${program.icon} ${esc(displayProgram(program).title)}</h1><p>${displayProgram(program).segments.length} ${tr("phần dẫn", "segments")}</p></div><button id="ee-mc-back" class="ee-mc-btn" type="button">← ${tr("12 chương trình", "12 programs")}</button></div>
        <section class="ee-mc-intro">
          <div class="ee-mc-preview"><div class="ee-mc-curtain left"></div><div class="ee-mc-curtain right"></div><div class="core" aria-hidden="true">🎤🐰</div></div>
          <div class="ee-mc-guide">
            <div class="ee-mc-bubble"><span class="ico" aria-hidden="true">🐰</span><span class="txt">${esc(firstSentence)}</span><button id="ee-mc-listen-guide" class="ee-mc-say" type="button" aria-label="${tr("Nghe Cô Thỏ hướng dẫn", "Listen to Bunny’s instructions")}">🔊</button></div>
            <div class="ee-mc-skills"><span class="ee-mc-skill">😊 ${tr("Nụ cười", "Smile")}</span><span class="ee-mc-skill">🔊 ${tr("Giọng rõ", "Clear voice")}</span><span class="ee-mc-skill">⏸ ${tr("Nghỉ đúng chỗ", "Pause")}</span><span class="ee-mc-skill">👀 ${tr("Nhìn khán giả", "Eye contact")}</span><span class="ee-mc-skill">🙌 ${tr("Tự tin", "Confidence")}</span></div>
            <div class="ee-mc-actions"><button id="ee-mc-start" class="ee-mc-btn primary" type="button">🎤 ${tr("Tập từng câu", "Practice sentences")}</button><button id="ee-mc-stage-now" class="ee-mc-btn teal" type="button">🎭 ${tr("Lên sân khấu", "On stage")}</button></div>
            <p id="ee-mc-voice-status" class="ee-mc-voice" hidden></p>
          </div>
        </section>
        <div class="ee-mc-parts">${displayProgram(program).segments.map((item, i) => `<button class="ee-mc-part" data-mc-segment="${i}" type="button"><span class="n">${i + 1}</span><span class="e" aria-hidden="true">${esc(cuesOf(item.cue)[0] || "").split(" ")[0]}</span><strong>${esc(item.title)}</strong></button>`).join("")}</div>
      </div>`;
    bindLanguages();
    host.querySelector("#ee-mc-back")?.addEventListener("click", renderRegistry);
    host.querySelector("#ee-mc-listen-guide")?.addEventListener("click", () => speak(displayProgram(program).guide));
    host.querySelector("#ee-mc-start")?.addEventListener("click", () => { currentSegmentIndex = 0; sentenceIndex = 0; renderPractice(program); });
    host.querySelector("#ee-mc-stage-now")?.addEventListener("click", () => { currentSegmentIndex = 0; renderStage(program); });
    host.querySelectorAll("[data-mc-segment]").forEach((button) => button.addEventListener("click", () => {
      currentSegmentIndex = Math.max(0, Math.min(displayProgram(program).segments.length - 1, Number(button.dataset.mcSegment) || 0));
      sentenceIndex = 0;
      renderPractice(program);
    }));
  }

  /* ---------- Tập từng câu ---------- */
  function renderPractice(program) {
    stopEverything();
    stageMode = false;
    const item = displayProgram(program).segments[currentSegmentIndex] || displayProgram(program).segments[0];
    const sents = sentencesOf(displayProgram(program).segments[currentSegmentIndex].text);
    sentenceIndex = Math.max(0, Math.min(sents.length - 1, sentenceIndex));
    setBanner(program, item);
    const host = activeContext && activeContext.host;
    if (!host) return;
    const last = currentSegmentIndex === displayProgram(program).segments.length - 1;
    const lastSent = sentenceIndex === sents.length - 1;
    host.innerHTML = `
      <div class="ee-mc-page">${languageControls()}
        <div class="ee-mc-head"><div><h1>${program.icon} ${esc(displayProgram(program).title)}</h1></div><button id="ee-mc-practice-back" class="ee-mc-btn" type="button">${tr("← Chuẩn bị","\u2190 Prepare")}</button></div>
        <section class="ee-mc-prac">
          <div class="ee-mc-prac-top"><h2>${currentSegmentIndex + 1}. ${esc(displayProgram(program).segments[currentSegmentIndex].title)}</h2>
            <div class="ee-mc-dots" aria-label="Phần ${currentSegmentIndex + 1} trên ${displayProgram(program).segments.length}">${displayProgram(program).segments.map((_, i) => `<span class="${i === currentSegmentIndex ? "on" : i < currentSegmentIndex ? "past" : ""}"></span>`).join("")}</div></div>
          <div class="ee-mc-cues">${cuesOf(displayProgram(program).segments[currentSegmentIndex].cue).map((c) => `<span class="ee-mc-cue">${esc(c)}</span>`).join("")}</div>
          <div class="ee-mc-sents">${sents.map((s, i) => `<button type="button" class="ee-mc-sent ${i === sentenceIndex ? "now" : i < sentenceIndex ? "done" : ""}" data-sent="${i}"><span class="k">${i + 1}</span><span>${esc(s)}</span></button>`).join("")}</div>
          <div class="ee-mc-tools">
            <button id="ee-mc-listen" class="ee-mc-btn soft" type="button">${tr("🔊 Cô đọc câu này","\ud83d\udd0a Listen to this sentence")}</button>
            ${canRecord() ? `<button id="ee-mc-rec" class="ee-mc-btn rec${recording ? " on" : ""}" type="button">${recording ? tr("⏹ Dừng thu","\u23f9 Stop recording") : tr("🎙️ Bé nói thử","\ud83c\udf99\ufe0f Record my voice")}</button>
            <button id="ee-mc-play" class="ee-mc-btn" type="button" ${recordUrl ? "" : "disabled"}>${tr("▶ Nghe lại giọng bé","\u25b6 Play my recording")}</button>` : ""}
            <button id="ee-mc-next-sent" class="ee-mc-btn primary" type="button">${lastSent ? tr("✓ Xong đoạn này","\u2713 Finish this part") : tr("Câu tiếp →","Next sentence \u2192")}</button>
          </div>
          <div class="ee-mc-tip">🐰 ${esc(displayProgram(program).segments[currentSegmentIndex].tip)}</div>
          <p id="ee-mc-voice-status" class="ee-mc-voice" hidden></p>
          <div class="ee-mc-nav">
            <button id="ee-mc-prev" class="ee-mc-btn" type="button" ${currentSegmentIndex === 0 ? "disabled" : ""}>${tr("← Đoạn trước","\u2190 Previous part")}</button>
            <button id="ee-mc-listen-all" class="ee-mc-btn soft" type="button">${tr("🔊 Nghe cả đoạn","\ud83d\udd0a Listen to the whole part")}</button>
            <button id="ee-mc-next" class="ee-mc-btn ${last ? "teal" : ""}" type="button">${last ? tr("🎭 Lên sân khấu","\ud83c\udfad On stage") : tr("Đoạn tiếp →","Next part \u2192")}</button>
          </div>
        </section>
      </div>`;
    const markSpeaking = (i, on) => host.querySelector(`[data-sent="${i}"]`)?.classList.toggle("speaking", on);
    const readSentence = (i) => { markSpeaking(i, true); speak(sents[i], () => markSpeaking(i, false)); };
    const goSentence = (i) => { stopNarration(); stopRecording(); clearRecording(); sentenceIndex = i; renderPractice(program); };
    bindLanguages();
    host.querySelector("#ee-mc-practice-back")?.addEventListener("click", () => renderProgramIntro(program));
    host.querySelector("#ee-mc-listen")?.addEventListener("click", () => readSentence(sentenceIndex));
    host.querySelector("#ee-mc-listen-all")?.addEventListener("click", () => speak(displayProgram(program).segments[currentSegmentIndex].text));
    host.querySelectorAll("[data-sent]").forEach((b) => b.addEventListener("click", () => {
      const i = Number(b.dataset.sent);
      if (i === sentenceIndex) readSentence(i); else goSentence(i);
    }));
    host.querySelector("#ee-mc-rec")?.addEventListener("click", () => toggleRecording(() => {
      const rec = host.querySelector("#ee-mc-rec");
      const play = host.querySelector("#ee-mc-play");
      if (rec) { rec.classList.toggle("on", recording); rec.textContent = recording ? tr("⏹ Dừng thu","\u23f9 Stop recording") : tr("🎙️ Bé nói thử","\ud83c\udf99\ufe0f Record my voice"); }
      if (play) play.disabled = !recordUrl;
    }));
    host.querySelector("#ee-mc-play")?.addEventListener("click", playRecording);
    host.querySelector("#ee-mc-next-sent")?.addEventListener("click", () => {
      if (!lastSent) goSentence(sentenceIndex + 1);
      else if (!last) { currentSegmentIndex += 1; goSentence(0); }
      else renderStage(program);
    });
    host.querySelector("#ee-mc-prev")?.addEventListener("click", () => { if (currentSegmentIndex > 0) { currentSegmentIndex -= 1; goSentence(0); } });
    host.querySelector("#ee-mc-next")?.addEventListener("click", () => {
      if (!last) { currentSegmentIndex += 1; goSentence(0); } else renderStage(program);
    });
  }

  /* ---------- Sân khấu: chữ chạy theo từng câu ---------- */
  function sentenceDelay(text) {
    const words = cleanSpeechText(text).split(/\s+/).filter(Boolean).length;
    const rates = { slow: 720, medium: 560, fast: 430 };
    return Math.max(2600, words * (rates[stageSpeed] || rates.medium) + 900);
  }

  function renderStage(program) {
    stopEverything();
    stageMode = true;
    sentenceIndex = 0;
    currentSegmentIndex = Math.max(0, Math.min(displayProgram(program).segments.length - 1, currentSegmentIndex));
    const item = displayProgram(program).segments[currentSegmentIndex];
    setBanner(program, item);
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-mc-page">${languageControls()}
        <div class="ee-mc-head"><div><h1>${tr("🎭 Sân khấu MC nhí","\ud83c\udfad Young MC stage")}</h1><p>${tr("Cô Thỏ không đọc khi bé biểu diễn. Câu màu vàng là câu bé đang nói.","Bunny stays quiet while you perform. Yellow shows your current sentence.")}</p></div><button id="ee-mc-stage-back" class="ee-mc-btn" type="button">${tr("← Tập dẫn","\u2190 Practice")}</button></div>
        <section class="ee-mc-stage-mode">
          <div class="lights"></div>
          <div class="ee-mc-live-head"><h2>${program.icon} ${esc(displayProgram(program).title)}</h2><div id="ee-mc-live-badge" class="ee-mc-live-badge"></div></div>
          <div class="ee-mc-live-body"></div>
          <div class="ee-mc-live-controls">
            <div class="ee-mc-speed" role="group" aria-label="${tr("Tốc độ chữ chạy","Reading pace")}">${[["slow", tr("🐢 Chậm","🐢 Slow")], ["medium", tr("Vừa","Medium")], ["fast", tr("🐇 Nhanh","🐇 Fast")]].map(([k, l]) => `<button type="button" data-speed="${k}" class="${stageSpeed === k ? "on" : ""}">${l}</button>`).join("")}</div>
            <button id="ee-mc-live-prev" class="ee-mc-btn" type="button">${tr("← Đoạn trước","\u2190 Previous part")}</button>
            <button id="ee-mc-countdown" class="ee-mc-btn primary" type="button">${tr("▶ Bắt đầu","\u25b6 Start")}</button>
            <button id="ee-mc-live-next" class="ee-mc-btn" type="button">${tr("Đoạn tiếp →","Next part \u2192")}</button>
          </div>
        </section>
      </div>`;
    updateStageView(program);
    bindLanguages();
    host.querySelector("#ee-mc-stage-back")?.addEventListener("click", () => { sentenceIndex = 0; renderPractice(program); });
    host.querySelectorAll("[data-speed]").forEach((b) => b.addEventListener("click", () => {
      stageSpeed = b.dataset.speed;
      host.querySelectorAll("[data-speed]").forEach((x) => x.classList.toggle("on", x === b));
      if (stageRunning && !stagePaused) scheduleStageAdvance(program);
    }));
    host.querySelector("#ee-mc-countdown")?.addEventListener("click", () => { if (stageRunning) toggleStagePause(program); else startCountdown(program); });
    host.querySelector("#ee-mc-live-prev")?.addEventListener("click", () => {
      if (currentSegmentIndex <= 0) return;
      currentSegmentIndex -= 1; sentenceIndex = 0;
      updateStageView(program);
      if (stageRunning && !stagePaused) scheduleStageAdvance(program);
    });
    host.querySelector("#ee-mc-live-next")?.addEventListener("click", () => {
      if (currentSegmentIndex < displayProgram(program).segments.length - 1) {
        currentSegmentIndex += 1; sentenceIndex = 0;
        updateStageView(program);
        if (stageRunning && !stagePaused) scheduleStageAdvance(program);
      } else renderFinish(program);
    });
  }

  function updateStageView(program) {
    const host = activeContext && activeContext.host;
    if (!host || !stageMode) return;
    const item = displayProgram(program).segments[currentSegmentIndex];
    if (!item) return;
    setBanner(program, item);
    const sents = sentencesOf(displayProgram(program).segments[currentSegmentIndex].text);
    const body = host.querySelector(".ee-mc-live-body");
    if (body) body.innerHTML = `<div class="ee-mc-live-title">${currentSegmentIndex + 1}. ${esc(displayProgram(program).segments[currentSegmentIndex].title)}</div>
      <div class="ee-mc-live-text">${sents.map((s, i) => `<span class="${stageRunning ? (i === sentenceIndex ? "now" : i < sentenceIndex ? "past" : "") : "now"}">${esc(s)}</span>`).join(" ")}</div>
      <div class="ee-mc-live-cue">${esc(displayProgram(program).segments[currentSegmentIndex].cue)}</div>`;
    const badge = host.querySelector("#ee-mc-live-badge");
    if (badge) badge.textContent = `${tr("Phần", "Part")} ${currentSegmentIndex + 1}/${displayProgram(program).segments.length}`;
    const prev = host.querySelector("#ee-mc-live-prev");
    const next = host.querySelector("#ee-mc-live-next");
    if (prev) prev.disabled = currentSegmentIndex === 0;
    if (next) next.textContent = currentSegmentIndex === displayProgram(program).segments.length - 1 ? tr("Hoàn thành 🎉", "Completed 🎉") : tr("Đoạn tiếp →", "Next part →");
  }

  function startCountdown(program) {
    stopTimers();
    stopNarration();
    const host = activeContext && activeContext.host;
    const body = host && host.querySelector(".ee-mc-live-body");
    const button = host && host.querySelector("#ee-mc-countdown");
    if (!body || !button || stageRunning) return;
    button.disabled = true;
    let number = 3;
    const tick = () => {
      if (!activeContext || !stageMode) return;
      if (number > 0) {
        body.innerHTML = `<div class="ee-mc-countdown">${number}</div><div class="ee-mc-live-cue">${tr("Hít một hơi · Mỉm cười · Nhìn khán giả", "Take a breath · Smile · Look at your audience")}</div>`;
        number -= 1;
        countdownTimer = window.setTimeout(tick, 900);
        return;
      }
      stageRunning = true;
      stagePaused = false;
      sentenceIndex = 0;
      button.disabled = false;
      button.textContent = tr("⏸ Tạm dừng", "⏸ Pause");
      updateStageView(program);
      scheduleStageAdvance(program);
    };
    tick();
  }

  function scheduleStageAdvance(program) {
    window.clearTimeout(stageTimer);
    stageTimer = 0;
    if (!stageRunning || stagePaused || !stageMode) return;
    const item = displayProgram(program).segments[currentSegmentIndex];
    if (!item) return;
    const sents = sentencesOf(item.text);
    stageTimer = window.setTimeout(() => {
      if (!activeContext || !stageMode || !stageRunning || stagePaused) return;
      if (sentenceIndex < sents.length - 1) sentenceIndex += 1;
      else if (currentSegmentIndex < displayProgram(program).segments.length - 1) { currentSegmentIndex += 1; sentenceIndex = 0; }
      else { renderFinish(program); return; }
      updateStageView(program);
      scheduleStageAdvance(program);
    }, sentenceDelay(sents[sentenceIndex] || item.text));
  }

  function toggleStagePause(program) {
    const host = activeContext && activeContext.host;
    const button = host && host.querySelector("#ee-mc-countdown");
    if (!button || !stageRunning) return;
    stagePaused = !stagePaused;
    window.clearTimeout(stageTimer);
    stageTimer = 0;
    button.textContent = stagePaused ? tr("▶ Tiếp tục", "▶ Resume") : tr("⏸ Tạm dừng", "⏸ Pause");
    if (!stagePaused) scheduleStageAdvance(program);
  }

  /* ---------- Hoàn thành ---------- */
  function renderFinish(program, celebrate = true) {
    stopEverything();
    stageMode = false;
    if (celebrate) markDone(program.id);
    setBanner(program);
    const host = activeContext && activeContext.host;
    if (!host) return;
    const checks = [["😊", tr("Mỉm cười","Smile")], ["🔊", tr("Nói rõ","Speak clearly")], ["⏸", tr("Biết nghỉ","Pause well")], ["👀", tr("Nhìn khán giả","Eye contact")], ["🙌", tr("Tự tin","Confidence")]];
    host.innerHTML = `
      <div class="ee-mc-page">${languageControls()}
        <section class="ee-mc-finish"><div class="big" aria-hidden="true">🎤🐰✨</div><h2>${tr("MC nhí giỏi quá!", "Wonderful job, young MC!")}</h2>
          <p>${tr("Hôm nay bé đã làm được những gì? Chạm để tô sáng nhé!", "What did you do well today? Tap to celebrate!")}</p>
          <div class="ee-mc-selfcheck">${checks.map(([e, t]) => `<button class="ee-mc-check" type="button" aria-pressed="false"><span class="e" aria-hidden="true">${e}</span>${t}</button>`).join("")}</div>
          <div class="ee-mc-finish-actions"><button id="ee-mc-again" class="ee-mc-btn primary" type="button">${tr("🔄 Dẫn lại","\ud83d\udd04 Try again")}</button><button id="ee-mc-other" class="ee-mc-btn" type="button">${tr("📚 Chương trình khác","\ud83d\udcda Other programs")}</button></div>
        </section>
      </div>`;
    if (celebrate) speak(tr("MC nhí giỏi quá! Hôm nay bé đã làm được những gì? Chạm để tô sáng nhé!", "Wonderful job, young MC! What did you do well today?"));
    bindLanguages();
    host.querySelectorAll(".ee-mc-check").forEach((button) => button.addEventListener("click", () => {
      const on = button.classList.toggle("done");
      button.setAttribute("aria-pressed", String(on));
    }));
    host.querySelector("#ee-mc-again")?.addEventListener("click", () => { currentSegmentIndex = 0; sentenceIndex = 0; renderPractice(program); });
    host.querySelector("#ee-mc-other")?.addEventListener("click", renderRegistry);
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    currentProgramId = "";
    currentSegmentIndex = 0;
    stageMode = false;
    stageSpeed = "medium";
    renderRegistry();
  }

  function destroy() {
    stopEverything();
    clearRecording();
    activeContext = null;
    currentProgramId = "";
    currentSegmentIndex = 0;
    stageMode = false;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
