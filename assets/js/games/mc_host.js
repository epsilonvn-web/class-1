(() => {
  "use strict";

  const MODULE_KEY = "mcHost";
  const STYLE_ID = "class1-games-mc-host-style";
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

  function programById(id) {
    return PROGRAMS.find((item) => item.id === id) || null;
  }

  function stopTimers() {
    window.clearTimeout(countdownTimer);
    window.clearTimeout(stageTimer);
    countdownTimer = 0;
    stageTimer = 0;
  }

  function stopNarration() {
    audioNonce += 1;
    speechUtterance = null;
    fallbackQueue = [];
    fallbackQueueIndex = 0;
    try {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    } catch (_) {}
    try {
      if (narrationAudio) {
        narrationAudio.pause();
        narrationAudio.currentTime = 0;
        narrationAudio.removeAttribute("src");
        narrationAudio.load();
      }
    } catch (_) {}
  }

  function stopEverything() {
    stopTimers();
    stopNarration();
    stageRunning = false;
    stagePaused = false;
  }

  function cleanSpeechText(value) {
    return String(value || "")
      .replace(/[🎒🎂🎵📚🎨🐘⚽🌳🧧👩‍🏫🌟🏆😊👀🔊⏸🙌👉🎤🎉🕯️🔢🎁⭐👏✨🧠❤️⚡🤝🏃🏅🌱🗑️💧🌿❓🙏🌸🎲📸🌷🐾🦁🌊👂]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function banMaiVoice() {
    if (!("speechSynthesis" in window) || typeof window.speechSynthesis.getVoices !== "function") return null;
    const voices = window.speechSynthesis.getVoices() || [];
    return voices.find((voice) => /ban\s*mai/i.test(String(voice.name || ""))) || null;
  }

  function vietnameseVoice() {
    if (!("speechSynthesis" in window) || typeof window.speechSynthesis.getVoices !== "function") return null;
    const voices = window.speechSynthesis.getVoices() || [];
    return voices.find((voice) => /^vi(?:-|$)/i.test(String(voice.lang || ""))) || null;
  }

  function ttsFallbackUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(text)}`;
  }

  function setVoiceStatus(message) {
    const host = activeContext && activeContext.host;
    const node = host && host.querySelector("#ee-mc-voice-status");
    if (node) node.textContent = message;
  }

  function speak(text) {
    const clean = cleanSpeechText(text);
    if (!clean) return;
    stopNarration();
    const nonce = audioNonce;
    const preferred = banMaiVoice();
    if (preferred && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function") {
      try {
        const utterance = new window.SpeechSynthesisUtterance(clean);
        utterance.lang = "vi-VN";
        utterance.voice = preferred;
        utterance.rate = 0.96;
        utterance.pitch = 1.06;
        utterance.volume = 1;
        utterance.onend = () => { if (nonce === audioNonce) speechUtterance = null; };
        utterance.onerror = () => {
          if (nonce !== audioNonce) return;
          speakFallback(clean, nonce);
        };
        speechUtterance = utterance;
        setVoiceStatus("Đang dùng giọng Ban Mai trên thiết bị.");
        window.speechSynthesis.speak(utterance);
        return;
      } catch (_) {}
    }
    speakFallback(clean, nonce);
  }

function splitSpeechChunks(text, maxLength = 170) {
    const source = String(text || "").replace(/\s+/g, " ").trim();
    if (!source) return [];
    const sentences = source.match(/[^.!?]+[.!?]?/g) || [source];
    const chunks = [];
    let current = "";
    const pushCurrent = () => {
      const value = current.trim();
      if (value) chunks.push(value);
      current = "";
    };
    sentences.forEach((sentence) => {
      const cleanSentence = sentence.trim();
      if (!cleanSentence) return;
      if (cleanSentence.length <= maxLength) {
        const joined = current ? `${current} ${cleanSentence}` : cleanSentence;
        if (joined.length <= maxLength) current = joined;
        else { pushCurrent(); current = cleanSentence; }
        return;
      }
      pushCurrent();
      const words = cleanSentence.split(/\s+/);
      let part = "";
      words.forEach((word) => {
        const joined = part ? `${part} ${word}` : word;
        if (joined.length > maxLength && part) {
          chunks.push(part);
          part = word;
        } else {
          part = joined;
        }
      });
      if (part) chunks.push(part);
    });
    pushCurrent();
    return chunks;
  }

  function speakFallback(text, nonce) {
    if (!narrationAudio || nonce !== audioNonce) return;
    fallbackQueue = splitSpeechChunks(text);
    fallbackQueueIndex = 0;
    if (!fallbackQueue.length) return;
    setVoiceStatus("Thiết bị chưa có giọng Ban Mai — đang dùng giọng tiếng Việt dự phòng.");
    playNextFallbackChunk(nonce);
  }

  function playNextFallbackChunk(nonce) {
    if (!narrationAudio || nonce !== audioNonce) return;
    const chunk = fallbackQueue[fallbackQueueIndex];
    if (!chunk) return;
    try {
      narrationAudio.pause();
      narrationAudio.currentTime = 0;
      narrationAudio.src = ttsFallbackUrl(chunk);
      narrationAudio.playbackRate = 0.96;
      narrationAudio.onended = () => {
        if (nonce !== audioNonce) return;
        fallbackQueueIndex += 1;
        if (fallbackQueueIndex < fallbackQueue.length) playNextFallbackChunk(nonce);
      };
      narrationAudio.onerror = () => {
        if (nonce === audioNonce) setVoiceStatus("Chưa phát được âm thanh. Bé vẫn có thể đọc theo phần chữ.");
      };
      const promise = narrationAudio.play();
      if (promise && typeof promise.catch === "function") promise.catch(() => {
        if (nonce === audioNonce) setVoiceStatus("Chưa phát được âm thanh. Bé vẫn có thể đọc theo phần chữ.");
      });
    } catch (_) {
      setVoiceStatus("Chưa phát được âm thanh. Bé vẫn có thể đọc theo phần chữ.");
    }
  }

  function setBanner(program = null, segmentItem = null) {
    const setSubBanner = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof setSubBanner !== "function") return;
    const items = [{ level: 2, title: `${GAME_NUMBER}. Tập làm MC`, action: program ? renderRegistry : null }];
    if (program) {
      const index = Math.max(0, PROGRAMS.indexOf(program));
      items.push({ level: 3, title: `${GAME_NUMBER}.${index + 1} ${program.title}`, action: segmentItem ? () => renderProgramIntro(program) : null });
    }
    if (program && segmentItem) {
      items.push({ level: 4, title: `${GAME_NUMBER}.${PROGRAMS.indexOf(program) + 1}.${currentSegmentIndex + 1} ${segmentItem.title}` });
    }
    setSubBanner({ items });
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-mc-page{width:100%;max-width:82rem;margin:0 auto;color:#334155;font-family:inherit}
      .ee-mc-head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:1rem}
      .ee-mc-head h1{margin:0;font-size:clamp(24px,3vw,36px);line-height:1.1;color:#7e22ce;font-weight:1000}
      .ee-mc-head p{margin:.35rem 0 0;font-size:16px;font-weight:800;color:#64748b;line-height:1.5}
      .ee-mc-back,.ee-mc-btn{min-height:44px;border:1px solid #e9d5ff;border-radius:14px;background:#fff;padding:.72rem 1rem;font:inherit;font-size:15px;font-weight:1000;color:#6d28d9;cursor:pointer;box-shadow:0 3px 10px rgba(76,29,149,.08)}
      .ee-mc-btn.primary{border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 16px rgba(139,92,246,.22)}
      .ee-mc-btn.teal{border:0;color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981)}
      .ee-mc-btn:disabled{opacity:.45;cursor:not-allowed}
      .ee-mc-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem}
      .ee-mc-card{min-width:0;border:1px solid var(--mc-border);background:var(--mc-bg);border-radius:18px;padding:1rem;text-align:left;cursor:pointer;font:inherit;color:#334155;box-shadow:0 5px 14px rgba(76,29,149,.07);transition:transform .16s,box-shadow .16s}
      .ee-mc-card:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(76,29,149,.12)}
      .ee-mc-card .icon{font-size:34px;line-height:1}
      .ee-mc-card h2{margin:.65rem 0 .35rem;font-size:18px;line-height:1.25;font-weight:1000;color:var(--mc-title);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      .ee-mc-card p{margin:0;color:#64748b;font-size:14px;font-weight:800;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      .ee-mc-badge{display:inline-flex;margin-top:.65rem;border:1px solid var(--mc-border);background:rgba(255,255,255,.72);color:var(--mc-title);border-radius:999px;padding:.3rem .55rem;font-size:12px;font-weight:1000}
      .ee-mc-tone-pink{--mc-bg:#fff1f7;--mc-border:#f9a8d4;--mc-title:#be185d}.ee-mc-tone-purple{--mc-bg:#f7f1ff;--mc-border:#d8b4fe;--mc-title:#7e22ce}.ee-mc-tone-teal{--mc-bg:#effcf8;--mc-border:#99f6e4;--mc-title:#0f766e}.ee-mc-tone-amber{--mc-bg:#fff9e8;--mc-border:#fde68a;--mc-title:#b45309}
      .ee-mc-intro{border:1px solid #eadcff;border-radius:22px;background:linear-gradient(135deg,#fff7fb,#f6f1ff);padding:1.05rem;box-shadow:0 6px 18px rgba(76,29,149,.08)}
      .ee-mc-intro-top{display:grid;grid-template-columns:minmax(220px,.82fr) minmax(0,1.4fr);gap:1rem;align-items:stretch}
      .ee-mc-stage-preview{border:1px solid #f9a8d4;border-radius:18px;min-height:260px;background:linear-gradient(#fff8fb,#f8edff);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center;padding:1rem}
      .ee-mc-curtain{position:absolute;top:0;bottom:0;width:26%;background:linear-gradient(90deg,#be185d,#ec4899);opacity:.9}.ee-mc-curtain.left{left:0;clip-path:polygon(0 0,100% 0,70% 100%,0 100%)}.ee-mc-curtain.right{right:0;clip-path:polygon(0 0,100% 0,100% 100%,30% 100%)}
      .ee-mc-stage-core{position:relative;z-index:2}.ee-mc-stage-core .big{font-size:64px}.ee-mc-stage-core strong{display:block;margin-top:.45rem;font-size:22px;color:#7e22ce}.ee-mc-stage-core span{display:block;margin-top:.25rem;font-size:14px;font-weight:900;color:#64748b}
      .ee-mc-guide{border:1px solid #d8b4fe;border-radius:18px;background:#fff;padding:1rem}.ee-mc-guide h2{margin:0 0 .55rem;color:#7e22ce;font-size:22px;font-weight:1000}.ee-mc-guide p{margin:0;color:#475569;font-size:16px;font-weight:800;line-height:1.65}.ee-mc-guide-actions{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1rem}.ee-mc-voice{margin-top:.65rem;color:#64748b;font-size:13px;font-weight:900}
      .ee-mc-skills{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.55rem;margin-top:1rem}.ee-mc-skill{border:1px solid #e9d5ff;border-radius:14px;background:#fff;padding:.75rem;text-align:center;font-size:13px;font-weight:1000;color:#6d28d9}
      .ee-mc-outline{margin-top:1rem;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.65rem}.ee-mc-outline button{border:1px solid #e2e8f0;background:#fff;border-radius:14px;padding:.75rem;text-align:left;font:inherit;cursor:pointer}.ee-mc-outline strong{display:block;color:#334155;font-size:14px}.ee-mc-outline span{display:block;margin-top:.2rem;color:#64748b;font-size:12px;font-weight:800}
      .ee-mc-practice{display:grid;grid-template-columns:minmax(280px,.8fr) minmax(0,1.35fr);gap:1rem;align-items:stretch}
      .ee-mc-stage{border:1px solid #f9a8d4;border-radius:22px;background:linear-gradient(180deg,#fff7fb,#f3e8ff);min-height:430px;position:relative;overflow:hidden;padding:1rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.ee-mc-stage:after{content:"";position:absolute;left:10%;right:10%;bottom:38px;height:14px;border-radius:50%;background:rgba(124,58,237,.12)}
      .ee-mc-stage .spot{position:absolute;top:-60px;width:190px;height:260px;background:linear-gradient(rgba(255,255,255,.9),rgba(255,255,255,0));clip-path:polygon(40% 0,60% 0,100% 100%,0 100%);opacity:.65}.ee-mc-stage .spot.a{left:5%;transform:rotate(10deg)}.ee-mc-stage .spot.b{right:5%;transform:rotate(-10deg)}
      .ee-mc-stage-icon{font-size:82px;position:relative;z-index:2}.ee-mc-stage h2{position:relative;z-index:2;margin:.5rem 0 .25rem;color:#7e22ce;font-size:24px}.ee-mc-stage p{position:relative;z-index:2;margin:0;color:#64748b;font-size:15px;font-weight:900}.ee-mc-focus{position:relative;z-index:2;margin-top:1rem;border:1px solid #d8b4fe;border-radius:999px;background:#fff;padding:.5rem .75rem;color:#6d28d9;font-size:13px;font-weight:1000}
      .ee-mc-script{border:1px solid #e9d5ff;border-radius:22px;background:#fff;padding:1rem;box-shadow:0 5px 16px rgba(76,29,149,.07);display:flex;flex-direction:column;min-width:0}.ee-mc-progress{display:flex;align-items:center;gap:.65rem}.ee-mc-progress strong{font-size:14px;color:#7e22ce;white-space:nowrap}.ee-mc-track{height:10px;background:#f1e8ff;border-radius:999px;overflow:hidden;flex:1}.ee-mc-track span{display:block;height:100%;background:linear-gradient(90deg,#ec4899,#8b5cf6);border-radius:inherit}.ee-mc-script h2{margin:.9rem 0 .35rem;color:#334155;font-size:clamp(22px,2.7vw,32px);font-weight:1000}.ee-mc-cue{display:inline-flex;align-self:flex-start;border:1px solid #fde68a;background:#fffbeb;color:#92400e;border-radius:999px;padding:.4rem .65rem;font-size:13px;font-weight:1000}.ee-mc-copy{margin:.9rem 0 0;font-size:clamp(20px,2.35vw,29px);font-weight:900;line-height:1.65;color:#1f2937}.ee-mc-tip{margin-top:1rem;border:1px solid #99f6e4;background:#f0fdfa;border-radius:15px;padding:.75rem .85rem;color:#0f766e;font-size:14px;font-weight:900;line-height:1.5}.ee-mc-script-actions{display:flex;flex-wrap:wrap;gap:.55rem;margin-top:1rem}.ee-mc-nav{display:grid;grid-template-columns:1fr auto 1fr;gap:.6rem;align-items:center;margin-top:auto;padding-top:1rem}.ee-mc-nav .count{height:44px;min-width:72px;border:1px solid #e9d5ff;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:1000;color:#7e22ce;background:#faf5ff}.ee-mc-nav .ee-mc-btn:last-child{justify-self:stretch}.ee-mc-nav .ee-mc-btn:first-child{justify-self:stretch}
      .ee-mc-stage-mode{border:1px solid #d8b4fe;border-radius:24px;background:linear-gradient(180deg,#1e1b4b,#312e81);color:#fff;padding:1rem;overflow:hidden;position:relative;min-height:520px}.ee-mc-stage-mode .lights{position:absolute;inset:0;background:radial-gradient(circle at 20% 0,rgba(251,207,232,.32),transparent 30%),radial-gradient(circle at 80% 0,rgba(167,243,208,.26),transparent 30%);pointer-events:none}.ee-mc-live-head,.ee-mc-live-body,.ee-mc-live-controls{position:relative;z-index:2}.ee-mc-live-head{display:flex;align-items:center;justify-content:space-between;gap:.8rem;flex-wrap:wrap}.ee-mc-live-head h2{margin:0;font-size:22px}.ee-mc-live-badge{border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:.4rem .65rem;font-size:13px;font-weight:1000;background:rgba(255,255,255,.1)}.ee-mc-live-body{max-width:900px;margin:2.1rem auto 1.5rem;text-align:center}.ee-mc-live-icon{font-size:72px}.ee-mc-live-title{margin:.5rem 0 .35rem;font-size:18px;font-weight:1000;color:#fbcfe8}.ee-mc-live-text{font-size:clamp(26px,3.3vw,42px);font-weight:900;line-height:1.55;text-wrap:balance}.ee-mc-live-cue{margin-top:1rem;font-size:14px;font-weight:900;color:#fde68a}.ee-mc-live-controls{display:flex;justify-content:center;gap:.6rem;flex-wrap:wrap}.ee-mc-stage-mode .ee-mc-btn{background:rgba(255,255,255,.95)}.ee-mc-countdown{font-size:96px;font-weight:1000;color:#f9a8d4;text-shadow:0 0 32px rgba(236,72,153,.45)}
      .ee-mc-finish{border:1px solid #d8b4fe;border-radius:24px;background:linear-gradient(135deg,#fff7fb,#f4f0ff);padding:1.2rem;text-align:center}.ee-mc-finish .big{font-size:64px}.ee-mc-finish h2{margin:.35rem 0;color:#7e22ce;font-size:30px}.ee-mc-finish p{margin:.35rem auto;color:#475569;max-width:760px;font-size:16px;font-weight:800;line-height:1.6}.ee-mc-selfcheck{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.6rem;max-width:900px;margin:1rem auto}.ee-mc-check{border:1px solid #e9d5ff;background:#fff;border-radius:15px;padding:.75rem;font:inherit;font-size:13px;font-weight:1000;color:#6d28d9;cursor:pointer}.ee-mc-check.done{background:#ecfdf5;border-color:#6ee7b7;color:#047857}.ee-mc-finish-actions{display:flex;justify-content:center;gap:.6rem;flex-wrap:wrap;margin-top:1rem}
      @media(max-width:1000px){.ee-mc-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.ee-mc-intro-top,.ee-mc-practice{grid-template-columns:1fr}.ee-mc-stage{min-height:300px}.ee-mc-skills{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:767px){.ee-mc-head{align-items:center}.ee-mc-head h1{font-size:24px}.ee-mc-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem}.ee-mc-card{padding:.8rem}.ee-mc-card h2{font-size:16px}.ee-mc-outline{grid-template-columns:1fr}.ee-mc-skills,.ee-mc-selfcheck{grid-template-columns:repeat(2,minmax(0,1fr))}.ee-mc-copy{font-size:20px;line-height:1.6}.ee-mc-stage-mode{min-height:440px}.ee-mc-live-text{font-size:26px}.ee-mc-nav{gap:.4rem}.ee-mc-nav .ee-mc-btn{padding:.65rem .55rem;font-size:13px}}
    `;
    document.head.appendChild(style);
  }

  function renderRegistry() {
    stopEverything();
    currentProgramId = "";
    currentSegmentIndex = 0;
    stageMode = false;
    setBanner();
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-mc-page">
        <div class="ee-mc-head"><div><h1>🎤 Tập làm MC</h1><p>12 chương trình để bé luyện nói rõ, biết dẫn dắt và tự tin trước khán giả.</p></div></div>
        <div class="ee-mc-grid">
          ${PROGRAMS.map((program, index) => `
            <button class="ee-mc-card ee-mc-tone-${esc(program.tone)}" data-mc-program="${esc(program.id)}" type="button">
              <span class="icon" aria-hidden="true">${program.icon}</span>
              <h2>${index + 1}. ${esc(program.title)}</h2>
              <p>${esc(program.focus)}</p>
              <span class="ee-mc-badge">6 phần dẫn</span>
            </button>`).join("")}
        </div>
      </div>`;
    host.querySelectorAll("[data-mc-program]").forEach((button) => {
      button.addEventListener("click", () => {
        const program = programById(button.dataset.mcProgram);
        if (program) renderProgramIntro(program);
      });
    });
  }

  function renderProgramIntro(program) {
    stopEverything();
    currentProgramId = program.id;
    currentSegmentIndex = 0;
    stageMode = false;
    setBanner(program);
    const host = activeContext && activeContext.host;
    if (!host) return;
    const index = PROGRAMS.indexOf(program) + 1;
    host.innerHTML = `
      <div class="ee-mc-page">
        <div class="ee-mc-head"><div><h1>${program.icon} ${esc(program.title)}</h1><p>Chương trình ${GAME_NUMBER}.${index} · ${program.segments.length} phần dẫn.</p></div><button id="ee-mc-back" class="ee-mc-back" type="button">← 12 chương trình</button></div>
        <section class="ee-mc-intro">
          <div class="ee-mc-intro-top">
            <div class="ee-mc-stage-preview"><div class="ee-mc-curtain left"></div><div class="ee-mc-curtain right"></div><div class="ee-mc-stage-core"><div class="big">🎤🐰</div><strong>${esc(program.title)}</strong><span>MC nhí cùng Cô Thỏ Hồng</span></div></div>
            <div class="ee-mc-guide">
              <h2>🐰 Cô Thỏ hướng dẫn</h2>
              <p>${esc(program.guide)}</p>
              <div class="ee-mc-guide-actions"><button id="ee-mc-listen-guide" class="ee-mc-btn" type="button">🔊 Nghe Cô Thỏ hướng dẫn</button><button id="ee-mc-start" class="ee-mc-btn primary" type="button">🎤 Bắt đầu tập dẫn</button><button id="ee-mc-stage-now" class="ee-mc-btn teal" type="button">🎭 Lên sân khấu</button></div>
              <div id="ee-mc-voice-status" class="ee-mc-voice">Ưu tiên giọng Ban Mai khi thiết bị có sẵn.</div>
            </div>
          </div>
          <div class="ee-mc-skills"><div class="ee-mc-skill">😊 Nụ cười</div><div class="ee-mc-skill">🔊 Giọng rõ</div><div class="ee-mc-skill">⏸ Nghỉ đúng chỗ</div><div class="ee-mc-skill">👀 Nhìn khán giả</div><div class="ee-mc-skill">🙌 Tự tin</div></div>
          <div class="ee-mc-outline">${program.segments.map((item, segIndex) => `<button data-mc-segment="${segIndex}" type="button"><strong>${segIndex + 1}. ${esc(item.title)}</strong><span>${esc(item.cue)}</span></button>`).join("")}</div>
        </section>
      </div>`;
    host.querySelector("#ee-mc-back")?.addEventListener("click", renderRegistry);
    host.querySelector("#ee-mc-listen-guide")?.addEventListener("click", () => speak(program.guide));
    host.querySelector("#ee-mc-start")?.addEventListener("click", () => { currentSegmentIndex = 0; renderPractice(program); });
    host.querySelector("#ee-mc-stage-now")?.addEventListener("click", () => { currentSegmentIndex = 0; renderStage(program); });
    host.querySelectorAll("[data-mc-segment]").forEach((button) => {
      button.addEventListener("click", () => {
        currentSegmentIndex = Math.max(0, Math.min(program.segments.length - 1, Number(button.dataset.mcSegment) || 0));
        renderPractice(program);
      });
    });
  }

  function renderPractice(program) {
    stopEverything();
    stageMode = false;
    const item = program.segments[currentSegmentIndex] || program.segments[0];
    setBanner(program, item);
    const host = activeContext && activeContext.host;
    if (!host) return;
    const progress = Math.round(((currentSegmentIndex + 1) / program.segments.length) * 100);
    host.innerHTML = `
      <div class="ee-mc-page">
        <div class="ee-mc-head"><div><h1>🎤 ${esc(program.title)}</h1><p>Tập từng đoạn trước khi lên sân khấu.</p></div><button id="ee-mc-practice-back" class="ee-mc-back" type="button">← Chuẩn bị</button></div>
        <div class="ee-mc-practice">
          <section class="ee-mc-stage"><div class="spot a"></div><div class="spot b"></div><div class="ee-mc-stage-icon">${program.icon} 🎤</div><h2>MC nhí đang tập</h2><p>${esc(program.title)}</p><div class="ee-mc-focus">Kỹ năng: ${esc(program.focus)}</div></section>
          <section class="ee-mc-script">
            <div class="ee-mc-progress"><strong>Phần ${currentSegmentIndex + 1}/${program.segments.length}</strong><div class="ee-mc-track"><span style="width:${progress}%"></span></div></div>
            <h2>${esc(item.title)}</h2>
            <div class="ee-mc-cue">${esc(item.cue)}</div>
            <p class="ee-mc-copy">${esc(item.text)}</p>
            <div class="ee-mc-tip">🐰 <strong>Cô Thỏ mách bé:</strong> ${esc(item.tip)}</div>
            <div class="ee-mc-script-actions"><button id="ee-mc-listen" class="ee-mc-btn" type="button">🔊 Cô Thỏ đọc mẫu</button><button id="ee-mc-stop" class="ee-mc-btn" type="button">⏹ Dừng âm thanh</button><button id="ee-mc-go-stage" class="ee-mc-btn teal" type="button">🎭 Lên sân khấu</button><span id="ee-mc-voice-status" class="ee-mc-voice">Ưu tiên giọng Ban Mai khi thiết bị có sẵn.</span></div>
            <div class="ee-mc-nav"><button id="ee-mc-prev" class="ee-mc-btn" type="button" ${currentSegmentIndex === 0 ? "disabled" : ""}>← Đoạn trước</button><div class="count">${currentSegmentIndex + 1}/${program.segments.length}</div><button id="ee-mc-next" class="ee-mc-btn primary" type="button">${currentSegmentIndex === program.segments.length - 1 ? "Luyện xong ✓" : "Đoạn tiếp →"}</button></div>
          </section>
        </div>
      </div>`;
    host.querySelector("#ee-mc-practice-back")?.addEventListener("click", () => renderProgramIntro(program));
    host.querySelector("#ee-mc-listen")?.addEventListener("click", () => speak(`${item.title}. ${item.text}. ${item.tip}`));
    host.querySelector("#ee-mc-stop")?.addEventListener("click", stopNarration);
    host.querySelector("#ee-mc-go-stage")?.addEventListener("click", () => renderStage(program));
    host.querySelector("#ee-mc-prev")?.addEventListener("click", () => { if (currentSegmentIndex > 0) { currentSegmentIndex -= 1; renderPractice(program); } });
    host.querySelector("#ee-mc-next")?.addEventListener("click", () => {
      if (currentSegmentIndex < program.segments.length - 1) {
        currentSegmentIndex += 1;
        renderPractice(program);
      } else {
        renderStage(program);
      }
    });
  }

  function stageDelay(text) {
    const words = cleanSpeechText(text).split(/\s+/).filter(Boolean).length;
    const rates = { slow: 620, medium: 500, fast: 390 };
    return Math.max(7000, Math.min(19000, words * (rates[stageSpeed] || rates.medium)));
  }

function renderStage(program) {
    stopEverything();
    stageMode = true;
    currentSegmentIndex = Math.max(0, Math.min(program.segments.length - 1, currentSegmentIndex));
    const item = program.segments[currentSegmentIndex];
    setBanner(program, item);
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-mc-page">
        <div class="ee-mc-head"><div><h1>🎭 Sân khấu MC nhí</h1><p>${esc(program.title)} · Cô Thỏ sẽ không đọc khi bé đang biểu diễn.</p></div><button id="ee-mc-stage-back" class="ee-mc-back" type="button">← Tập dẫn</button></div>
        <section class="ee-mc-stage-mode">
          <div class="lights"></div>
          <div class="ee-mc-live-head"><h2>${program.icon} ${esc(program.title)}</h2><div id="ee-mc-live-badge" class="ee-mc-live-badge">Teleprompter · ${currentSegmentIndex + 1}/${program.segments.length}</div></div>
          <div class="ee-mc-live-body"><div class="ee-mc-live-icon">🎤</div><div id="ee-mc-live-title" class="ee-mc-live-title">${esc(item.title)}</div><div id="ee-mc-live-text" class="ee-mc-live-text">${esc(item.text)}</div><div id="ee-mc-live-cue" class="ee-mc-live-cue">${esc(item.cue)}</div></div>
          <div class="ee-mc-live-controls"><select id="ee-mc-speed" class="ee-mc-btn" aria-label="Tốc độ teleprompter"><option value="slow" ${stageSpeed === "slow" ? "selected" : ""}>Chậm</option><option value="medium" ${stageSpeed === "medium" ? "selected" : ""}>Vừa</option><option value="fast" ${stageSpeed === "fast" ? "selected" : ""}>Nhanh</option></select><button id="ee-mc-countdown" class="ee-mc-btn primary" type="button">3–2–1 Bắt đầu</button><button id="ee-mc-live-prev" class="ee-mc-btn" type="button" ${currentSegmentIndex === 0 ? "disabled" : ""}>← Đoạn trước</button><button id="ee-mc-live-next" class="ee-mc-btn" type="button">Đoạn tiếp →</button></div>
        </section>
      </div>`;
    host.querySelector("#ee-mc-stage-back")?.addEventListener("click", () => renderPractice(program));
    host.querySelector("#ee-mc-speed")?.addEventListener("change", (event) => {
      stageSpeed = event.target.value || "medium";
      if (stageRunning && !stagePaused) scheduleStageAdvance(program);
    });
    host.querySelector("#ee-mc-countdown")?.addEventListener("click", () => {
      if (stageRunning) toggleStagePause(program);
      else startCountdown(program);
    });
    host.querySelector("#ee-mc-live-prev")?.addEventListener("click", () => {
      if (currentSegmentIndex <= 0) return;
      currentSegmentIndex -= 1;
      updateStageView(program);
      if (stageRunning && !stagePaused) scheduleStageAdvance(program);
    });
    host.querySelector("#ee-mc-live-next")?.addEventListener("click", () => {
      if (currentSegmentIndex < program.segments.length - 1) {
        currentSegmentIndex += 1;
        updateStageView(program);
        if (stageRunning && !stagePaused) scheduleStageAdvance(program);
      } else {
        renderFinish(program);
      }
    });
  }

  function updateStageView(program) {
    const host = activeContext && activeContext.host;
    if (!host || !stageMode) return;
    const item = program.segments[currentSegmentIndex];
    if (!item) return;
    setBanner(program, item);
    const title = host.querySelector("#ee-mc-live-title");
    const text = host.querySelector("#ee-mc-live-text");
    const cue = host.querySelector("#ee-mc-live-cue");
    const badge = host.querySelector("#ee-mc-live-badge");
    const prev = host.querySelector("#ee-mc-live-prev");
    const next = host.querySelector("#ee-mc-live-next");
    if (title) title.textContent = item.title;
    if (text) text.textContent = item.text;
    if (cue) cue.textContent = item.cue;
    if (badge) badge.textContent = `Teleprompter · ${currentSegmentIndex + 1}/${program.segments.length}`;
    if (prev) prev.disabled = currentSegmentIndex === 0;
    if (next) next.textContent = currentSegmentIndex === program.segments.length - 1 ? "Hoàn thành 🎉" : "Đoạn tiếp →";
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
        body.innerHTML = `<div class="ee-mc-countdown">${number}</div><div class="ee-mc-live-cue">Hít một hơi · Mỉm cười · Nhìn khán giả</div>`;
        number -= 1;
        countdownTimer = window.setTimeout(tick, 900);
        return;
      }
      body.innerHTML = `<div class="ee-mc-live-icon">🎤</div><div id="ee-mc-live-title" class="ee-mc-live-title"></div><div id="ee-mc-live-text" class="ee-mc-live-text"></div><div id="ee-mc-live-cue" class="ee-mc-live-cue"></div>`;
      stageRunning = true;
      stagePaused = false;
      button.disabled = false;
      button.textContent = "⏸ Tạm dừng";
      updateStageView(program);
      scheduleStageAdvance(program);
    };
    tick();
  }

  function scheduleStageAdvance(program) {
    window.clearTimeout(stageTimer);
    stageTimer = 0;
    if (!stageRunning || stagePaused || !stageMode) return;
    const item = program.segments[currentSegmentIndex];
    if (!item) return;
    stageTimer = window.setTimeout(() => {
      if (!activeContext || !stageMode || !stageRunning || stagePaused) return;
      if (currentSegmentIndex < program.segments.length - 1) {
        currentSegmentIndex += 1;
        updateStageView(program);
        scheduleStageAdvance(program);
      } else {
        renderFinish(program);
      }
    }, stageDelay(item.text));
  }

  function toggleStagePause(program) {
    const host = activeContext && activeContext.host;
    const button = host && host.querySelector("#ee-mc-countdown");
    if (!button || !stageRunning) return;
    stagePaused = !stagePaused;
    window.clearTimeout(stageTimer);
    stageTimer = 0;
    if (stagePaused) {
      button.textContent = "▶ Tiếp tục";
    } else {
      button.textContent = "⏸ Tạm dừng";
      scheduleStageAdvance(program);
    }
  }
  function renderFinish(program) {
    stopEverything();
    stageMode = false;
    setBanner(program);
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-mc-page">
        <div class="ee-mc-head"><div><h1>🏆 Hoàn thành chương trình</h1><p>${esc(program.title)}</p></div></div>
        <section class="ee-mc-finish"><div class="big">🎤🐰✨</div><h2>MC nhí đã hoàn thành!</h2><p>Cô Thỏ Hồng rất vui vì bé đã dẫn hết chương trình. Bé không cần nói giống hệt Cô Thỏ; điều quan trọng là nói rõ, biết nghỉ, nhìn khán giả và giữ sự tự tin.</p><div class="ee-mc-selfcheck"><button class="ee-mc-check" type="button">😊 Em đã mỉm cười</button><button class="ee-mc-check" type="button">🔊 Em nói rõ</button><button class="ee-mc-check" type="button">⏸ Em biết nghỉ</button><button class="ee-mc-check" type="button">👀 Em nhìn khán giả</button><button class="ee-mc-check" type="button">🙌 Em tự tin</button></div><div class="ee-mc-finish-actions"><button id="ee-mc-again" class="ee-mc-btn primary" type="button">Dẫn lại chương trình</button><button id="ee-mc-other" class="ee-mc-btn" type="button">Chọn chương trình khác</button></div></section>
      </div>`;
    host.querySelectorAll(".ee-mc-check").forEach((button) => button.addEventListener("click", () => button.classList.toggle("done")));
    host.querySelector("#ee-mc-again")?.addEventListener("click", () => { currentSegmentIndex = 0; renderPractice(program); });
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
    activeContext = null;
    currentProgramId = "";
    currentSegmentIndex = 0;
    stageMode = false;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();