(() => {
  "use strict";

  /* =====================================================================
     Khám phá vũ trụ — bản nâng cấp
     Giữ nguyên giao diện module: window.CLASS1_GAME_MODULES.spaceExplorer
     = { render(context), destroy() }, context.host, context.hooks.setSubBanner
     ===================================================================== */

  const CONFIG = Object.freeze({
    moduleKey: "spaceExplorer",
    styleId: "class1-game-space-explorer-style-v2",
    fontId: "class1-game-explorer-font",
    rootId: "space-explorer",
    gameNumber: 7,
    title: "Khám phá vũ trụ",
    subtitle: "Cùng Cô Thỏ Hồng du hành qua Hệ Mặt Trời",
    storageKey: "class1.spaceExplorer.found.v1",
    roundSize: 10
  });

  const DATA = Object.freeze({"overview": {"id": "solar-system", "name": "Hệ Mặt Trời", "subtitle": "Ngôi nhà vũ trụ của chúng ta", "summary": "Hệ Mặt Trời gồm Mặt Trời ở trung tâm và rất nhiều thiên thể chuyển động xung quanh. Có 8 hành tinh chính, cùng nhiều vệ tinh, tiểu hành tinh, sao chổi và bụi khí trong không gian.", "more": "Bốn hành tinh gần Mặt Trời là Sao Thủy, Sao Kim, Trái Đất và Sao Hỏa. Bốn hành tinh phía xa là Sao Mộc, Sao Thổ, Sao Thiên Vương và Sao Hải Vương. Mặt Trời cung cấp ánh sáng và nhiệt cho toàn bộ Hệ Mặt Trời.", "remember": "Mặt Trời ở trung tâm. Có 8 hành tinh chính quay quanh Mặt Trời, và Trái Đất là hành tinh thứ 3.", "facts": [{"label": "Trung tâm", "value": "Mặt Trời"}, {"label": "Hành tinh", "value": "8 hành tinh chính"}, {"label": "Nhóm gần", "value": "Thủy, Kim, Trái Đất, Hỏa"}, {"label": "Nhóm xa", "value": "Mộc, Thổ, Thiên Vương, Hải Vương"}, {"label": "Vệ tinh", "value": "Rất nhiều vệ tinh tự nhiên"}, {"label": "Điều thú vị", "value": "Trái Đất là hành tinh duy nhất đã biết có sự sống"}]}, "primary": [{"id": "mercury", "name": "Sao Thủy", "subtitle": "Hành tinh thứ 1 tính từ Mặt Trời", "summary": "Một năm trên Sao Thủy chỉ dài khoảng 88 ngày Trái Đất.", "more": "Sao Thủy khá nhỏ và có bề mặt nhiều hố va chạm. Vì ở gần Mặt Trời nên sự chênh lệch nhiệt độ giữa ngày và đêm rất lớn.", "remember": "Sao Thủy gần Mặt Trời nhất và không có vệ tinh.", "facts": [{"label": "Vị trí", "value": "Thứ 1 từ Mặt Trời"}, {"label": "Loại", "value": "Hành tinh đá"}, {"label": "Nhiệt độ", "value": "Rất nóng ban ngày, rất lạnh ban đêm"}, {"label": "Vệ tinh", "value": "Không có vệ tinh tự nhiên"}]}, {"id": "venus", "name": "Sao Kim", "subtitle": "Hành tinh thứ 2 tính từ Mặt Trời", "summary": "Sao Kim có lớp mây dày bao phủ và quay rất chậm.", "more": "Dù không gần Mặt Trời nhất, Sao Kim lại là hành tinh nóng nhất vì lớp khí quyển dày giữ nhiệt rất mạnh.", "remember": "Sao Kim là hành tinh nóng nhất, dù không phải gần Mặt Trời nhất.", "facts": [{"label": "Vị trí", "value": "Thứ 2 từ Mặt Trời"}, {"label": "Loại", "value": "Hành tinh đá"}, {"label": "Nhiệt độ", "value": "Rất nóng, nóng nhất Hệ Mặt Trời"}, {"label": "Vệ tinh", "value": "Không có vệ tinh tự nhiên"}]}, {"id": "earth", "name": "Trái Đất", "subtitle": "Hành tinh thứ 3 tính từ Mặt Trời", "summary": "Trái Đất có nước lỏng, không khí và là ngôi nhà của chúng ta.", "more": "Trái Đất có đại dương, lục địa và bầu khí quyển giúp duy trì sự sống. Đây là hành tinh duy nhất mà con người đang sinh sống.", "remember": "Trái Đất là ngôi nhà của chúng ta, có nước lỏng, không khí và Mặt Trăng.", "facts": [{"label": "Vị trí", "value": "Thứ 3 từ Mặt Trời"}, {"label": "Loại", "value": "Hành tinh đá"}, {"label": "Nhiệt độ", "value": "Phù hợp cho sự sống"}, {"label": "Vệ tinh", "value": "1 vệ tinh là Mặt Trăng"}]}, {"id": "mars", "name": "Sao Hỏa", "subtitle": "Hành tinh thứ 4 tính từ Mặt Trời", "summary": "Sao Hỏa có màu đỏ vì bề mặt chứa nhiều oxit sắt.", "more": "Sao Hỏa thường được gọi là Hành tinh Đỏ. Nhiều tàu thăm dò đã được gửi tới Sao Hỏa để tìm hiểu xem nơi này có từng có nước hay không.", "remember": "Sao Hỏa là Hành tinh Đỏ và có 2 vệ tinh nhỏ.", "facts": [{"label": "Vị trí", "value": "Thứ 4 từ Mặt Trời"}, {"label": "Loại", "value": "Hành tinh đá"}, {"label": "Nhiệt độ", "value": "Lạnh và khô"}, {"label": "Vệ tinh", "value": "2 vệ tinh là Phobos và Deimos"}]}, {"id": "jupiter", "name": "Sao Mộc", "subtitle": "Hành tinh thứ 5 tính từ Mặt Trời", "summary": "Sao Mộc là hành tinh lớn nhất trong Hệ Mặt Trời.", "more": "Sao Mộc khổng lồ đến mức bên trong nó có thể chứa rất nhiều Trái Đất. Hành tinh này nổi tiếng với những dải mây lớn và Vết Đỏ Lớn.", "remember": "Sao Mộc là hành tinh lớn nhất và có Vết Đỏ Lớn.", "facts": [{"label": "Vị trí", "value": "Thứ 5 từ Mặt Trời"}, {"label": "Loại", "value": "Hành tinh khí khổng lồ"}, {"label": "Nhiệt độ", "value": "Rất lạnh ở tầng mây"}, {"label": "Vệ tinh", "value": "Có rất nhiều vệ tinh; nổi bật là Io, Europa, Ganymede, Callisto"}]}, {"id": "saturn", "name": "Sao Thổ", "subtitle": "Hành tinh thứ 6 tính từ Mặt Trời", "summary": "Sao Thổ nổi tiếng với hệ vành đai sáng đẹp gồm băng và đá.", "more": "Các vành đai của Sao Thổ rất rộng và đẹp mắt. Chúng được tạo từ vô số mảnh băng, đá và bụi quay quanh hành tinh.", "remember": "Sao Thổ có vành đai đẹp làm từ băng, đá và bụi.", "facts": [{"label": "Vị trí", "value": "Thứ 6 từ Mặt Trời"}, {"label": "Loại", "value": "Hành tinh khí khổng lồ"}, {"label": "Nhiệt độ", "value": "Rất lạnh"}, {"label": "Vệ tinh", "value": "Có nhiều vệ tinh; nổi bật là Titan và Enceladus"}]}, {"id": "uranus", "name": "Sao Thiên Vương", "subtitle": "Hành tinh thứ 7 tính từ Mặt Trời", "summary": "Sao Thiên Vương quay nghiêng gần như nằm ngang.", "more": "Sao Thiên Vương có màu xanh nhạt do khí trong khí quyển. Trục quay rất nghiêng khiến hành tinh này trông rất đặc biệt.", "remember": "Sao Thiên Vương quay nghiêng gần như nằm ngang.", "facts": [{"label": "Vị trí", "value": "Thứ 7 từ Mặt Trời"}, {"label": "Loại", "value": "Hành tinh băng khổng lồ"}, {"label": "Nhiệt độ", "value": "Rất lạnh"}, {"label": "Vệ tinh", "value": "Có nhiều vệ tinh; nổi bật là Titania, Oberon và Miranda"}]}, {"id": "neptune", "name": "Sao Hải Vương", "subtitle": "Hành tinh thứ 8 tính từ Mặt Trời", "summary": "Sao Hải Vương có những cơn gió rất mạnh trong khí quyển.", "more": "Sao Hải Vương có màu xanh đậm rất đẹp. Đây là hành tinh xa Mặt Trời nhất trong 8 hành tinh chính của Hệ Mặt Trời.", "remember": "Sao Hải Vương xa Mặt Trời nhất trong 8 hành tinh và có gió rất mạnh.", "facts": [{"label": "Vị trí", "value": "Thứ 8 từ Mặt Trời"}, {"label": "Loại", "value": "Hành tinh băng khổng lồ"}, {"label": "Nhiệt độ", "value": "Rất lạnh và có gió mạnh"}, {"label": "Vệ tinh", "value": "Có nhiều vệ tinh; nổi bật là Triton"}]}], "secondary": [{"id": "moon", "name": "Mặt Trăng", "parent": "earth", "subtitle": "Vệ tinh của Trái Đất", "summary": "Mặt Trăng là vệ tinh tự nhiên của Trái Đất và phản chiếu ánh sáng Mặt Trời.", "more": "Mặt Trăng giúp tạo nên hiện tượng thủy triều và là thiên thể con người đã đặt chân tới.", "remember": "Mặt Trăng không tự phát sáng; nó phản chiếu ánh sáng Mặt Trời.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Trái Đất"}]}, {"id": "phobos", "name": "Phobos", "parent": "mars", "subtitle": "Vệ tinh của Sao Hỏa", "summary": "Phobos là vệ tinh lớn hơn trong hai vệ tinh nhỏ của Sao Hỏa.", "more": "Phobos có hình dạng không tròn đều và quay khá gần Sao Hỏa.", "remember": "Phobos là vệ tinh lớn hơn trong hai vệ tinh của Sao Hỏa.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Hỏa"}]}, {"id": "deimos", "name": "Deimos", "parent": "mars", "subtitle": "Vệ tinh của Sao Hỏa", "summary": "Deimos là vệ tinh nhỏ, có hình dạng không tròn đều.", "more": "Deimos nhỏ hơn Phobos và cũng quay quanh Sao Hỏa.", "remember": "Deimos là vệ tinh nhỏ hơn của Sao Hỏa.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Hỏa"}]}, {"id": "io", "name": "Io", "parent": "jupiter", "subtitle": "Vệ tinh của Sao Mộc", "summary": "Io là một thế giới có hoạt động núi lửa rất mạnh.", "more": "Io là một trong những vệ tinh nổi bật nhất của Sao Mộc.", "remember": "Io có rất nhiều núi lửa hoạt động.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Mộc"}]}, {"id": "europa", "name": "Europa", "parent": "jupiter", "subtitle": "Vệ tinh của Sao Mộc", "summary": "Europa có bề mặt phủ băng và bên dưới có thể có đại dương nước lỏng.", "more": "Europa là một trong những nơi các nhà khoa học rất muốn nghiên cứu để tìm hiểu khả năng có sự sống.", "remember": "Europa phủ băng, bên dưới có thể có đại dương.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Mộc"}]}, {"id": "ganymede", "name": "Ganymede", "parent": "jupiter", "subtitle": "Vệ tinh của Sao Mộc", "summary": "Ganymede là vệ tinh lớn nhất trong Hệ Mặt Trời.", "more": "Ganymede còn lớn hơn cả hành tinh Sao Thủy.", "remember": "Ganymede là vệ tinh lớn nhất Hệ Mặt Trời.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Mộc"}]}, {"id": "callisto", "name": "Callisto", "parent": "jupiter", "subtitle": "Vệ tinh của Sao Mộc", "summary": "Callisto có bề mặt với rất nhiều hố va chạm cổ xưa.", "more": "Callisto là một trong những vệ tinh lớn của Sao Mộc.", "remember": "Callisto có rất nhiều hố va chạm cổ xưa.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Mộc"}]}, {"id": "titan", "name": "Titan", "parent": "saturn", "subtitle": "Vệ tinh của Sao Thổ", "summary": "Titan có khí quyển dày và những hồ chứa hydrocarbon lỏng.", "more": "Titan là vệ tinh lớn nhất của Sao Thổ và là một thế giới rất đặc biệt.", "remember": "Titan là vệ tinh lớn nhất của Sao Thổ và có khí quyển dày.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Thổ"}]}, {"id": "enceladus", "name": "Enceladus", "parent": "saturn", "subtitle": "Vệ tinh của Sao Thổ", "summary": "Enceladus có lớp băng sáng và các tia vật chất phun ra từ vùng cực nam.", "more": "Vệ tinh này khiến các nhà khoa học rất chú ý vì có thể có nước lỏng bên dưới lớp băng.", "remember": "Enceladus có lớp băng sáng và tia vật chất phun ra.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Thổ"}]}, {"id": "miranda", "name": "Miranda", "parent": "uranus", "subtitle": "Vệ tinh của Sao Thiên Vương", "summary": "Miranda có bề mặt rất gồ ghề với nhiều vách và hẻm lớn.", "more": "Miranda là một trong những vệ tinh thú vị của Sao Thiên Vương.", "remember": "Miranda có bề mặt rất gồ ghề.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Thiên Vương"}]}, {"id": "titania", "name": "Titania", "parent": "uranus", "subtitle": "Vệ tinh của Sao Thiên Vương", "summary": "Titania là vệ tinh lớn nhất của Sao Thiên Vương.", "more": "Titania có kích thước lớn hơn nhiều vệ tinh khác của hành tinh này.", "remember": "Titania là vệ tinh lớn nhất của Sao Thiên Vương.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Thiên Vương"}]}, {"id": "oberon", "name": "Oberon", "parent": "uranus", "subtitle": "Vệ tinh của Sao Thiên Vương", "summary": "Oberon là một vệ tinh lớn có bề mặt nhiều hố va chạm.", "more": "Oberon là một trong những vệ tinh xa hơn của Sao Thiên Vương.", "remember": "Oberon có bề mặt nhiều hố va chạm.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Thiên Vương"}]}, {"id": "triton", "name": "Triton", "parent": "neptune", "subtitle": "Vệ tinh của Sao Hải Vương", "summary": "Triton quay quanh Sao Hải Vương theo hướng ngược với nhiều vệ tinh lớn khác.", "more": "Triton là vệ tinh nổi bật nhất của Sao Hải Vương.", "remember": "Triton quay ngược hướng so với nhiều vệ tinh lớn khác.", "facts": [{"label": "Loại", "value": "Vệ tinh tự nhiên"}, {"label": "Quay quanh", "value": "Sao Hải Vương"}]}], "quiz": [{"q": "Hành tinh nào gần Mặt Trời nhất?", "a": ["Sao Thủy", "Trái Đất", "Sao Mộc", "Sao Hải Vương"], "c": 0, "note": "Sao Thủy là hành tinh gần Mặt Trời nhất."}, {"q": "Hành tinh nào là ngôi nhà của chúng ta?", "a": ["Sao Kim", "Sao Hỏa", "Trái Đất", "Sao Thổ"], "c": 2, "note": "Chúng ta đang sống trên Trái Đất."}, {"q": "Hành tinh nào lớn nhất Hệ Mặt Trời?", "a": ["Sao Mộc", "Sao Thủy", "Sao Kim", "Sao Hỏa"], "c": 0, "note": "Sao Mộc là hành tinh lớn nhất."}, {"q": "Hành tinh nào nổi tiếng với hệ vành đai sáng đẹp?", "a": ["Sao Hải Vương", "Sao Thổ", "Sao Kim", "Trái Đất"], "c": 1, "note": "Sao Thổ có hệ vành đai rất nổi bật."}, {"q": "Vệ tinh tự nhiên của Trái Đất là gì?", "a": ["Titan", "Europa", "Mặt Trăng", "Triton"], "c": 2, "note": "Mặt Trăng là vệ tinh tự nhiên của Trái Đất."}, {"q": "Phobos và Deimos quay quanh hành tinh nào?", "a": ["Sao Hỏa", "Sao Mộc", "Sao Thổ", "Sao Kim"], "c": 0, "note": "Phobos và Deimos là hai vệ tinh của Sao Hỏa."}, {"q": "Ganymede quay quanh hành tinh nào?", "a": ["Trái Đất", "Sao Mộc", "Sao Thiên Vương", "Sao Hải Vương"], "c": 1, "note": "Ganymede là một trong những vệ tinh nổi tiếng của Sao Mộc."}, {"q": "Titan là vệ tinh nổi bật của hành tinh nào?", "a": ["Sao Thủy", "Sao Thổ", "Sao Kim", "Sao Hỏa"], "c": 1, "note": "Titan là vệ tinh lớn nhất của Sao Thổ."}, {"q": "Hành tinh nào quay nghiêng gần như nằm ngang?", "a": ["Sao Thiên Vương", "Sao Hỏa", "Sao Mộc", "Trái Đất"], "c": 0, "note": "Sao Thiên Vương có trục quay nghiêng rất đặc biệt."}, {"q": "Hành tinh nào xa Mặt Trời nhất trong 8 hành tinh?", "a": ["Sao Thổ", "Sao Hải Vương", "Sao Hỏa", "Sao Kim"], "c": 1, "note": "Sao Hải Vương đứng thứ 8 tính từ Mặt Trời."}, {"q": "Europa có điểm gì rất thú vị?", "a": ["Có vành đai lớn", "Bề mặt băng và có thể có đại dương bên dưới", "Là hành tinh lớn nhất", "Không quay quanh hành tinh nào"], "c": 1, "note": "Europa có bề mặt băng; bên dưới có thể tồn tại đại dương nước lỏng."}, {"q": "Vì sao ta nhìn thấy Mặt Trăng sáng?", "a": ["Mặt Trăng tự phát sáng mạnh như Mặt Trời", "Mặt Trăng phản chiếu ánh sáng Mặt Trời", "Do đèn từ Trái Đất", "Do các ngôi sao chiếu vào"], "c": 1, "note": "Mặt Trăng không tự phát sáng như Mặt Trời; ta thấy nó nhờ ánh sáng Mặt Trời phản chiếu."}, {"q": "Ở trung tâm Hệ Mặt Trời là gì?", "a": ["Mặt Trời", "Trái Đất", "Mặt Trăng", "Sao Mộc"], "c": 0, "note": "Mặt Trời ở trung tâm Hệ Mặt Trời."}, {"q": "Hệ Mặt Trời có bao nhiêu hành tinh chính?", "a": ["8", "5", "10", "12"], "c": 0, "note": "Hệ Mặt Trời có 8 hành tinh chính."}, {"q": "Trái Đất là hành tinh thứ mấy tính từ Mặt Trời?", "a": ["Thứ 3", "Thứ 1", "Thứ 5", "Thứ 8"], "c": 0, "note": "Trái Đất là hành tinh thứ 3."}, {"q": "Hành tinh nào nóng nhất Hệ Mặt Trời?", "a": ["Sao Kim", "Sao Thủy", "Sao Hỏa", "Sao Hải Vương"], "c": 0, "note": "Sao Kim nóng nhất vì lớp khí quyển dày giữ nhiệt rất mạnh."}, {"q": "Vì sao Sao Hỏa có màu đỏ?", "a": ["Bề mặt có nhiều oxit sắt", "Được sơn màu đỏ", "Có nhiều lửa", "Phản chiếu Sao Mộc"], "c": 0, "note": "Bề mặt Sao Hỏa chứa nhiều oxit sắt nên có màu đỏ."}, {"q": "Sao Hỏa còn được gọi là gì?", "a": ["Hành tinh Đỏ", "Hành tinh Xanh", "Hành tinh Băng", "Hành tinh Vành đai"], "c": 0, "note": "Sao Hỏa thường được gọi là Hành tinh Đỏ."}, {"q": "Sao Hỏa có mấy vệ tinh?", "a": ["2", "0", "1", "8"], "c": 0, "note": "Sao Hỏa có 2 vệ tinh là Phobos và Deimos."}, {"q": "Một năm trên Sao Thủy dài khoảng bao lâu?", "a": ["88 ngày Trái Đất", "365 ngày", "1 ngày", "10 năm"], "c": 0, "note": "Sao Thủy đi hết một vòng quanh Mặt Trời trong khoảng 88 ngày Trái Đất."}, {"q": "Vết Đỏ Lớn nằm trên hành tinh nào?", "a": ["Sao Mộc", "Sao Hỏa", "Trái Đất", "Sao Kim"], "c": 0, "note": "Sao Mộc nổi tiếng với Vết Đỏ Lớn."}, {"q": "Vành đai của Sao Thổ được tạo từ gì?", "a": ["Băng, đá và bụi", "Lửa", "Nước biển", "Mây trắng như Trái Đất"], "c": 0, "note": "Vành đai Sao Thổ gồm vô số mảnh băng, đá và bụi."}, {"q": "Hành tinh nào có những cơn gió rất mạnh và màu xanh đậm?", "a": ["Sao Hải Vương", "Sao Thủy", "Sao Hỏa", "Sao Kim"], "c": 0, "note": "Sao Hải Vương có màu xanh đậm và gió rất mạnh."}, {"q": "Vệ tinh nào có rất nhiều núi lửa hoạt động?", "a": ["Io", "Mặt Trăng", "Deimos", "Oberon"], "c": 0, "note": "Io, vệ tinh của Sao Mộc, có hoạt động núi lửa rất mạnh."}, {"q": "Vệ tinh nào lớn nhất Hệ Mặt Trời?", "a": ["Ganymede", "Mặt Trăng", "Phobos", "Miranda"], "c": 0, "note": "Ganymede là vệ tinh lớn nhất, còn lớn hơn Sao Thủy."}, {"q": "Titan có điều gì đặc biệt?", "a": ["Có khí quyển dày", "Có vành đai lớn", "Tự phát sáng", "Là hành tinh"], "c": 0, "note": "Titan có khí quyển dày và các hồ hydrocarbon lỏng."}, {"q": "Triton quay quanh hành tinh nào?", "a": ["Sao Hải Vương", "Sao Mộc", "Trái Đất", "Sao Hỏa"], "c": 0, "note": "Triton là vệ tinh nổi bật nhất của Sao Hải Vương."}, {"q": "Mặt Trăng giúp tạo nên hiện tượng nào trên Trái Đất?", "a": ["Thủy triều", "Động đất", "Cầu vồng", "Tuyết rơi"], "c": 0, "note": "Mặt Trăng góp phần tạo nên thủy triều."}, {"q": "Bốn hành tinh gần Mặt Trời thuộc loại nào?", "a": ["Hành tinh đá", "Hành tinh khí khổng lồ", "Hành tinh băng khổng lồ", "Ngôi sao"], "c": 0, "note": "Sao Thủy, Sao Kim, Trái Đất và Sao Hỏa là hành tinh đá."}, {"q": "Sao Mộc và Sao Thổ thuộc loại hành tinh nào?", "a": ["Hành tinh khí khổng lồ", "Hành tinh đá", "Vệ tinh", "Sao chổi"], "c": 0, "note": "Sao Mộc và Sao Thổ là hành tinh khí khổng lồ."}]});

  /* ---------- Song ngữ Tiếng Việt / English ---------- */
  const I18N_EN = {"Sao Kim": "Venus", "Quay quanh": "Orbits", "Hệ Mặt Trời": "The Solar System", "Ngôi nhà vũ trụ của chúng ta": "Our home in space", "Hệ Mặt Trời gồm Mặt Trời ở trung tâm và rất nhiều thiên thể chuyển động xung quanh. Có 8 hành tinh chính, cùng nhiều vệ tinh, tiểu hành tinh, sao chổi và bụi khí trong không gian.": "The Solar System has the Sun at its center and many objects moving around it. There are 8 main planets, plus many moons, asteroids, comets and dust and gas in space.", "Bốn hành tinh gần Mặt Trời là Sao Thủy, Sao Kim, Trái Đất và Sao Hỏa. Bốn hành tinh phía xa là Sao Mộc, Sao Thổ, Sao Thiên Vương và Sao Hải Vương. Mặt Trời cung cấp ánh sáng và nhiệt cho toàn bộ Hệ Mặt Trời.": "The four planets closest to the Sun are Mercury, Venus, Earth and Mars. The four farther planets are Jupiter, Saturn, Uranus and Neptune. The Sun gives light and heat to the whole Solar System.", "Mặt Trời ở trung tâm. Có 8 hành tinh chính quay quanh Mặt Trời, và Trái Đất là hành tinh thứ 3.": "The Sun is at the center. 8 main planets go around the Sun, and Earth is the 3rd planet.", "Trung tâm": "Center", "Mặt Trời": "The Sun", "Hành tinh": "Planets", "8 hành tinh chính": "8 main planets", "Nhóm gần": "Inner group", "Thủy, Kim, Trái Đất, Hỏa": "Mercury, Venus, Earth, Mars", "Nhóm xa": "Outer group", "Mộc, Thổ, Thiên Vương, Hải Vương": "Jupiter, Saturn, Uranus, Neptune", "Vệ tinh": "Moons", "Rất nhiều vệ tinh tự nhiên": "Many natural moons", "Điều thú vị": "Fun fact", "Trái Đất là hành tinh duy nhất đã biết có sự sống": "Earth is the only planet known to have life", "Sao Thủy": "Mercury", "Hành tinh thứ 1 tính từ Mặt Trời": "The 1st planet from the Sun", "Một năm trên Sao Thủy chỉ dài khoảng 88 ngày Trái Đất.": "A year on Mercury lasts only about 88 Earth days.", "Sao Thủy khá nhỏ và có bề mặt nhiều hố va chạm. Vì ở gần Mặt Trời nên sự chênh lệch nhiệt độ giữa ngày và đêm rất lớn.": "Mercury is quite small and its surface is covered in craters. Because it is close to the Sun, the temperature difference between day and night is huge.", "Sao Thủy gần Mặt Trời nhất và không có vệ tinh.": "Mercury is closest to the Sun and has no moons.", "Vị trí": "Position", "Thứ 1 từ Mặt Trời": "1st from the Sun", "Loại": "Type", "Hành tinh đá": "Rocky planet", "Nhiệt độ": "Temperature", "Rất nóng ban ngày, rất lạnh ban đêm": "Very hot by day, very cold at night", "Không có vệ tinh tự nhiên": "No natural moons", "Hành tinh thứ 2 tính từ Mặt Trời": "The 2nd planet from the Sun", "Sao Kim có lớp mây dày bao phủ và quay rất chậm.": "Venus is covered in thick clouds and spins very slowly.", "Dù không gần Mặt Trời nhất, Sao Kim lại là hành tinh nóng nhất vì lớp khí quyển dày giữ nhiệt rất mạnh.": "Even though it is not closest to the Sun, Venus is the hottest planet because its thick atmosphere traps heat very strongly.", "Sao Kim là hành tinh nóng nhất, dù không phải gần Mặt Trời nhất.": "Venus is the hottest planet, even though it is not the closest to the Sun.", "Thứ 2 từ Mặt Trời": "2nd from the Sun", "Rất nóng, nóng nhất Hệ Mặt Trời": "Very hot, the hottest in the Solar System", "Trái Đất": "Earth", "Hành tinh thứ 3 tính từ Mặt Trời": "The 3rd planet from the Sun", "Trái Đất có nước lỏng, không khí và là ngôi nhà của chúng ta.": "Earth has liquid water and air, and it is our home.", "Trái Đất có đại dương, lục địa và bầu khí quyển giúp duy trì sự sống. Đây là hành tinh duy nhất mà con người đang sinh sống.": "Earth has oceans, continents and an atmosphere that support life. It is the only planet where people live.", "Trái Đất là ngôi nhà của chúng ta, có nước lỏng, không khí và Mặt Trăng.": "Earth is our home, with liquid water, air and the Moon.", "Thứ 3 từ Mặt Trời": "3rd from the Sun", "Phù hợp cho sự sống": "Just right for life", "1 vệ tinh là Mặt Trăng": "1 moon: the Moon", "Sao Hỏa": "Mars", "Hành tinh thứ 4 tính từ Mặt Trời": "The 4th planet from the Sun", "Sao Hỏa có màu đỏ vì bề mặt chứa nhiều oxit sắt.": "Mars looks red because its surface has lots of iron oxide (rust).", "Sao Hỏa thường được gọi là Hành tinh Đỏ. Nhiều tàu thăm dò đã được gửi tới Sao Hỏa để tìm hiểu xem nơi này có từng có nước hay không.": "Mars is often called the Red Planet. Many space probes have been sent to Mars to find out whether it once had water.", "Sao Hỏa là Hành tinh Đỏ và có 2 vệ tinh nhỏ.": "Mars is the Red Planet and has 2 small moons.", "Thứ 4 từ Mặt Trời": "4th from the Sun", "Lạnh và khô": "Cold and dry", "2 vệ tinh là Phobos và Deimos": "2 moons: Phobos and Deimos", "Sao Mộc": "Jupiter", "Hành tinh thứ 5 tính từ Mặt Trời": "The 5th planet from the Sun", "Sao Mộc là hành tinh lớn nhất trong Hệ Mặt Trời.": "Jupiter is the largest planet in the Solar System.", "Sao Mộc khổng lồ đến mức bên trong nó có thể chứa rất nhiều Trái Đất. Hành tinh này nổi tiếng với những dải mây lớn và Vết Đỏ Lớn.": "Jupiter is so huge that many Earths could fit inside it. It is famous for its big cloud bands and the Great Red Spot.", "Sao Mộc là hành tinh lớn nhất và có Vết Đỏ Lớn.": "Jupiter is the largest planet and has the Great Red Spot.", "Thứ 5 từ Mặt Trời": "5th from the Sun", "Hành tinh khí khổng lồ": "Gas giant", "Rất lạnh ở tầng mây": "Very cold at the cloud tops", "Có rất nhiều vệ tinh; nổi bật là Io, Europa, Ganymede, Callisto": "Has many moons; famous ones are Io, Europa, Ganymede, Callisto", "Sao Thổ": "Saturn", "Hành tinh thứ 6 tính từ Mặt Trời": "The 6th planet from the Sun", "Sao Thổ nổi tiếng với hệ vành đai sáng đẹp gồm băng và đá.": "Saturn is famous for its bright, beautiful rings of ice and rock.", "Các vành đai của Sao Thổ rất rộng và đẹp mắt. Chúng được tạo từ vô số mảnh băng, đá và bụi quay quanh hành tinh.": "Saturn's rings are very wide and beautiful. They are made of countless pieces of ice, rock and dust circling the planet.", "Sao Thổ có vành đai đẹp làm từ băng, đá và bụi.": "Saturn has beautiful rings made of ice, rock and dust.", "Thứ 6 từ Mặt Trời": "6th from the Sun", "Rất lạnh": "Very cold", "Có nhiều vệ tinh; nổi bật là Titan và Enceladus": "Has many moons; famous ones are Titan and Enceladus", "Sao Thiên Vương": "Uranus", "Hành tinh thứ 7 tính từ Mặt Trời": "The 7th planet from the Sun", "Sao Thiên Vương quay nghiêng gần như nằm ngang.": "Uranus spins tipped over, almost lying on its side.", "Sao Thiên Vương có màu xanh nhạt do khí trong khí quyển. Trục quay rất nghiêng khiến hành tinh này trông rất đặc biệt.": "Uranus is pale blue because of the gases in its atmosphere. Its axis is tilted so much that the planet looks very special.", "Thứ 7 từ Mặt Trời": "7th from the Sun", "Hành tinh băng khổng lồ": "Ice giant", "Có nhiều vệ tinh; nổi bật là Titania, Oberon và Miranda": "Has many moons; famous ones are Titania, Oberon and Miranda", "Sao Hải Vương": "Neptune", "Hành tinh thứ 8 tính từ Mặt Trời": "The 8th planet from the Sun", "Sao Hải Vương có những cơn gió rất mạnh trong khí quyển.": "Neptune has very strong winds in its atmosphere.", "Sao Hải Vương có màu xanh đậm rất đẹp. Đây là hành tinh xa Mặt Trời nhất trong 8 hành tinh chính của Hệ Mặt Trời.": "Neptune is a beautiful deep blue. It is the farthest from the Sun of the 8 main planets in the Solar System.", "Sao Hải Vương xa Mặt Trời nhất trong 8 hành tinh và có gió rất mạnh.": "Neptune is the farthest of the 8 planets from the Sun and has very strong winds.", "Thứ 8 từ Mặt Trời": "8th from the Sun", "Rất lạnh và có gió mạnh": "Very cold and windy", "Có nhiều vệ tinh; nổi bật là Triton": "Has many moons; the most famous is Triton", "Mặt Trăng": "The Moon", "Vệ tinh của Trái Đất": "Earth's moon", "Mặt Trăng là vệ tinh tự nhiên của Trái Đất và phản chiếu ánh sáng Mặt Trời.": "The Moon is Earth's natural satellite and reflects sunlight.", "Mặt Trăng giúp tạo nên hiện tượng thủy triều và là thiên thể con người đã đặt chân tới.": "The Moon helps cause the tides, and it is the only place in space where people have walked.", "Mặt Trăng không tự phát sáng; nó phản chiếu ánh sáng Mặt Trời.": "The Moon does not make its own light; it reflects sunlight.", "Vệ tinh tự nhiên": "Natural satellite", "Vệ tinh của Sao Hỏa": "Moon of Mars", "Phobos là vệ tinh lớn hơn trong hai vệ tinh nhỏ của Sao Hỏa.": "Phobos is the bigger of Mars's two small moons.", "Phobos có hình dạng không tròn đều và quay khá gần Sao Hỏa.": "Phobos has an uneven shape and orbits quite close to Mars.", "Phobos là vệ tinh lớn hơn trong hai vệ tinh của Sao Hỏa.": "Phobos is the bigger of Mars's two moons.", "Deimos là vệ tinh nhỏ, có hình dạng không tròn đều.": "Deimos is a small moon with an uneven shape.", "Deimos nhỏ hơn Phobos và cũng quay quanh Sao Hỏa.": "Deimos is smaller than Phobos and also goes around Mars.", "Deimos là vệ tinh nhỏ hơn của Sao Hỏa.": "Deimos is the smaller moon of Mars.", "Vệ tinh của Sao Mộc": "Moon of Jupiter", "Io là một thế giới có hoạt động núi lửa rất mạnh.": "Io is a world with very powerful volcanoes.", "Io là một trong những vệ tinh nổi bật nhất của Sao Mộc.": "Io is one of Jupiter's most famous moons.", "Io có rất nhiều núi lửa hoạt động.": "Io has lots of active volcanoes.", "Europa có bề mặt phủ băng và bên dưới có thể có đại dương nước lỏng.": "Europa has an icy surface and may have an ocean of liquid water underneath.", "Europa là một trong những nơi các nhà khoa học rất muốn nghiên cứu để tìm hiểu khả năng có sự sống.": "Europa is one of the places scientists most want to study to learn whether life could exist there.", "Europa phủ băng, bên dưới có thể có đại dương.": "Europa is covered in ice and may have an ocean underneath.", "Ganymede là vệ tinh lớn nhất trong Hệ Mặt Trời.": "Ganymede is the largest moon in the Solar System.", "Ganymede còn lớn hơn cả hành tinh Sao Thủy.": "Ganymede is even bigger than the planet Mercury.", "Ganymede là vệ tinh lớn nhất Hệ Mặt Trời.": "Ganymede is the largest moon in the Solar System.", "Callisto có bề mặt với rất nhiều hố va chạm cổ xưa.": "Callisto's surface has lots of very old craters.", "Callisto là một trong những vệ tinh lớn của Sao Mộc.": "Callisto is one of Jupiter's big moons.", "Callisto có rất nhiều hố va chạm cổ xưa.": "Callisto has lots of very old craters.", "Vệ tinh của Sao Thổ": "Moon of Saturn", "Titan có khí quyển dày và những hồ chứa hydrocarbon lỏng.": "Titan has a thick atmosphere and lakes of liquid hydrocarbons.", "Titan là vệ tinh lớn nhất của Sao Thổ và là một thế giới rất đặc biệt.": "Titan is Saturn's largest moon and a very special world.", "Titan là vệ tinh lớn nhất của Sao Thổ và có khí quyển dày.": "Titan is Saturn's largest moon and has a thick atmosphere.", "Enceladus có lớp băng sáng và các tia vật chất phun ra từ vùng cực nam.": "Enceladus has a bright icy surface and jets of material shooting out near its south pole.", "Vệ tinh này khiến các nhà khoa học rất chú ý vì có thể có nước lỏng bên dưới lớp băng.": "This moon interests scientists a lot because there may be liquid water under its ice.", "Enceladus có lớp băng sáng và tia vật chất phun ra.": "Enceladus has bright ice and jets of material shooting out.", "Vệ tinh của Sao Thiên Vương": "Moon of Uranus", "Miranda có bề mặt rất gồ ghề với nhiều vách và hẻm lớn.": "Miranda has a very rugged surface with big cliffs and canyons.", "Miranda là một trong những vệ tinh thú vị của Sao Thiên Vương.": "Miranda is one of the interesting moons of Uranus.", "Miranda có bề mặt rất gồ ghề.": "Miranda has a very rugged surface.", "Titania là vệ tinh lớn nhất của Sao Thiên Vương.": "Titania is the largest moon of Uranus.", "Titania có kích thước lớn hơn nhiều vệ tinh khác của hành tinh này.": "Titania is bigger than many of this planet's other moons.", "Oberon là một vệ tinh lớn có bề mặt nhiều hố va chạm.": "Oberon is a big moon with lots of craters on its surface.", "Oberon là một trong những vệ tinh xa hơn của Sao Thiên Vương.": "Oberon is one of the farther moons of Uranus.", "Oberon có bề mặt nhiều hố va chạm.": "Oberon has lots of craters on its surface.", "Vệ tinh của Sao Hải Vương": "Moon of Neptune", "Triton quay quanh Sao Hải Vương theo hướng ngược với nhiều vệ tinh lớn khác.": "Triton goes around Neptune in the opposite direction from many other big moons.", "Triton là vệ tinh nổi bật nhất của Sao Hải Vương.": "Triton is Neptune's most famous moon.", "Triton quay ngược hướng so với nhiều vệ tinh lớn khác.": "Triton orbits in the opposite direction from many other big moons.", "Hành tinh nào gần Mặt Trời nhất?": "Which planet is closest to the Sun?", "Sao Thủy là hành tinh gần Mặt Trời nhất.": "Mercury is the planet closest to the Sun.", "Hành tinh nào là ngôi nhà của chúng ta?": "Which planet is our home?", "Chúng ta đang sống trên Trái Đất.": "We live on Earth.", "Hành tinh nào lớn nhất Hệ Mặt Trời?": "Which planet is the largest in the Solar System?", "Sao Mộc là hành tinh lớn nhất.": "Jupiter is the largest planet.", "Hành tinh nào nổi tiếng với hệ vành đai sáng đẹp?": "Which planet is famous for its bright, beautiful rings?", "Sao Thổ có hệ vành đai rất nổi bật.": "Saturn has very famous rings.", "Vệ tinh tự nhiên của Trái Đất là gì?": "What is Earth's natural satellite?", "Mặt Trăng là vệ tinh tự nhiên của Trái Đất.": "The Moon is Earth's natural satellite.", "Phobos và Deimos quay quanh hành tinh nào?": "Which planet do Phobos and Deimos go around?", "Phobos và Deimos là hai vệ tinh của Sao Hỏa.": "Phobos and Deimos are the two moons of Mars.", "Ganymede quay quanh hành tinh nào?": "Which planet does Ganymede go around?", "Ganymede là một trong những vệ tinh nổi tiếng của Sao Mộc.": "Ganymede is one of Jupiter's famous moons.", "Titan là vệ tinh nổi bật của hành tinh nào?": "Titan is a famous moon of which planet?", "Titan là vệ tinh lớn nhất của Sao Thổ.": "Titan is Saturn's largest moon.", "Hành tinh nào quay nghiêng gần như nằm ngang?": "Which planet spins tipped over, almost on its side?", "Sao Thiên Vương có trục quay nghiêng rất đặc biệt.": "Uranus has a very unusual tilted axis.", "Hành tinh nào xa Mặt Trời nhất trong 8 hành tinh?": "Which of the 8 planets is farthest from the Sun?", "Sao Hải Vương đứng thứ 8 tính từ Mặt Trời.": "Neptune is the 8th planet from the Sun.", "Europa có điểm gì rất thú vị?": "What is very interesting about Europa?", "Có vành đai lớn": "It has big rings", "Bề mặt băng và có thể có đại dương bên dưới": "An icy surface and maybe an ocean underneath", "Là hành tinh lớn nhất": "It is the largest planet", "Không quay quanh hành tinh nào": "It does not go around any planet", "Europa có bề mặt băng; bên dưới có thể tồn tại đại dương nước lỏng.": "Europa has an icy surface; there may be an ocean of liquid water underneath.", "Vì sao ta nhìn thấy Mặt Trăng sáng?": "Why can we see the Moon shining?", "Mặt Trăng tự phát sáng mạnh như Mặt Trời": "The Moon makes its own strong light like the Sun", "Mặt Trăng phản chiếu ánh sáng Mặt Trời": "The Moon reflects sunlight", "Do đèn từ Trái Đất": "Because of lamps on Earth", "Do các ngôi sao chiếu vào": "Because stars shine on it", "Mặt Trăng không tự phát sáng như Mặt Trời; ta thấy nó nhờ ánh sáng Mặt Trời phản chiếu.": "The Moon does not make its own light like the Sun; we see it because it reflects sunlight.", "Ở trung tâm Hệ Mặt Trời là gì?": "What is at the center of the Solar System?", "Mặt Trời ở trung tâm Hệ Mặt Trời.": "The Sun is at the center of the Solar System.", "Hệ Mặt Trời có bao nhiêu hành tinh chính?": "How many main planets are in the Solar System?", "Hệ Mặt Trời có 8 hành tinh chính.": "The Solar System has 8 main planets.", "Trái Đất là hành tinh thứ mấy tính từ Mặt Trời?": "Which planet from the Sun is Earth?", "Thứ 3": "3rd", "Thứ 1": "1st", "Thứ 5": "5th", "Thứ 8": "8th", "Trái Đất là hành tinh thứ 3.": "Earth is the 3rd planet.", "Hành tinh nào nóng nhất Hệ Mặt Trời?": "Which planet is the hottest in the Solar System?", "Sao Kim nóng nhất vì lớp khí quyển dày giữ nhiệt rất mạnh.": "Venus is the hottest because its thick atmosphere traps heat very strongly.", "Vì sao Sao Hỏa có màu đỏ?": "Why is Mars red?", "Bề mặt có nhiều oxit sắt": "Its surface has lots of iron oxide", "Được sơn màu đỏ": "It was painted red", "Có nhiều lửa": "It has lots of fire", "Phản chiếu Sao Mộc": "It reflects Jupiter", "Bề mặt Sao Hỏa chứa nhiều oxit sắt nên có màu đỏ.": "The surface of Mars has lots of iron oxide, so it looks red.", "Sao Hỏa còn được gọi là gì?": "What is another name for Mars?", "Hành tinh Đỏ": "The Red Planet", "Hành tinh Xanh": "The Blue Planet", "Hành tinh Băng": "The Ice Planet", "Hành tinh Vành đai": "The Ringed Planet", "Sao Hỏa thường được gọi là Hành tinh Đỏ.": "Mars is often called the Red Planet.", "Sao Hỏa có mấy vệ tinh?": "How many moons does Mars have?", "Sao Hỏa có 2 vệ tinh là Phobos và Deimos.": "Mars has 2 moons: Phobos and Deimos.", "Một năm trên Sao Thủy dài khoảng bao lâu?": "About how long is a year on Mercury?", "88 ngày Trái Đất": "88 Earth days", "365 ngày": "365 days", "1 ngày": "1 day", "10 năm": "10 years", "Sao Thủy đi hết một vòng quanh Mặt Trời trong khoảng 88 ngày Trái Đất.": "Mercury goes around the Sun in about 88 Earth days.", "Vết Đỏ Lớn nằm trên hành tinh nào?": "Which planet has the Great Red Spot?", "Sao Mộc nổi tiếng với Vết Đỏ Lớn.": "Jupiter is famous for the Great Red Spot.", "Vành đai của Sao Thổ được tạo từ gì?": "What are Saturn's rings made of?", "Băng, đá và bụi": "Ice, rock and dust", "Lửa": "Fire", "Nước biển": "Seawater", "Mây trắng như Trái Đất": "White clouds like Earth's", "Vành đai Sao Thổ gồm vô số mảnh băng, đá và bụi.": "Saturn's rings are made of countless pieces of ice, rock and dust.", "Hành tinh nào có những cơn gió rất mạnh và màu xanh đậm?": "Which planet has very strong winds and a deep blue color?", "Sao Hải Vương có màu xanh đậm và gió rất mạnh.": "Neptune is deep blue and has very strong winds.", "Vệ tinh nào có rất nhiều núi lửa hoạt động?": "Which moon has lots of active volcanoes?", "Io, vệ tinh của Sao Mộc, có hoạt động núi lửa rất mạnh.": "Io, a moon of Jupiter, has very powerful volcanoes.", "Vệ tinh nào lớn nhất Hệ Mặt Trời?": "Which moon is the largest in the Solar System?", "Ganymede là vệ tinh lớn nhất, còn lớn hơn Sao Thủy.": "Ganymede is the largest moon, even bigger than Mercury.", "Titan có điều gì đặc biệt?": "What is special about Titan?", "Có khí quyển dày": "It has a thick atmosphere", "Tự phát sáng": "It makes its own light", "Là hành tinh": "It is a planet", "Titan có khí quyển dày và các hồ hydrocarbon lỏng.": "Titan has a thick atmosphere and lakes of liquid hydrocarbons.", "Triton quay quanh hành tinh nào?": "Which planet does Triton go around?", "Mặt Trăng giúp tạo nên hiện tượng nào trên Trái Đất?": "Which effect on Earth does the Moon help cause?", "Thủy triều": "Tides", "Động đất": "Earthquakes", "Cầu vồng": "Rainbows", "Tuyết rơi": "Snowfall", "Mặt Trăng góp phần tạo nên thủy triều.": "The Moon helps cause the tides.", "Bốn hành tinh gần Mặt Trời thuộc loại nào?": "What kind of planets are the four planets closest to the Sun?", "Ngôi sao": "Stars", "Sao Thủy, Sao Kim, Trái Đất và Sao Hỏa là hành tinh đá.": "Mercury, Venus, Earth and Mars are rocky planets.", "Sao Mộc và Sao Thổ thuộc loại hành tinh nào?": "What kind of planets are Jupiter and Saturn?", "Sao chổi": "Comets", "Sao Mộc và Sao Thổ là hành tinh khí khổng lồ.": "Jupiter and Saturn are gas giants.", "Khám phá vũ trụ": "Space Explorer", "Cùng Cô Thỏ Hồng du hành qua Hệ Mặt Trời": "Travel through the Solar System with Miss Pink Bunny", "Mặt Trời và Hệ Mặt Trời": "The Sun and the Solar System", "⏹ Dừng đọc": "⏹ Stop reading", "Nghe cô đọc": "Listen to Teacher", "Chưa phát được giọng đọc. Con nhờ bố mẹ hoặc thầy cô kiểm tra loa và mạng, rồi bấm lại nhé.": "I couldn't play the voice. Ask a parent or teacher to check the speaker and the internet, then tap again.", "Bé nhớ nhé:": "Remember:", "🔊 Nghe cô đọc": "🔊 Listen to Teacher", "Sổ khám phá": "Explorer's Log", "Chạm vào Mặt Trời hoặc từng hành tinh nhé! Hình không đúng kích thước thật.": "Tap the Sun or each planet! The picture is not drawn to real size.", "✓ Đã xem": "✓ Seen", "câu đúng": "correct", "Cô tự đọc câu hỏi": "Teacher reads the questions", "Mẹo: bấm phím 1, 2, 3, 4 để chọn đáp án.": "Tip: press 1, 2, 3, 4 to choose an answer.", "Đổi câu hỏi khác": "Try other questions", "Tuyệt vời! Con là nhà du hành vũ trụ nhí rồi!": "Amazing! You are a little space traveler now!", "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé.": "Well done! Let's review the questions below.", "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.": "You tried hard! Let's review and play again.", "Con đúng": "You got", "câu": "questions", "Làm lại câu sai": "Retry wrong answers", "Chơi vòng mới": "Play a new round", "Đáp án đúng của các câu con chưa trả lời được:": "Correct answers to the questions you missed:", "Con chọn một đáp án nhé!": "Pick an answer!", "Chính xác!": "Correct!", "Chưa đúng rồi. Đáp án đúng là": "Not quite. The correct answer is", "Câu": "Question", "trên": "of", "Đọc câu hỏi": "Read the question", "🔊 Đọc câu hỏi": "🔊 Read the question", "Xem kết quả": "See results", "Câu tiếp theo": "Next question", "🏆 Con đã du hành khắp Hệ Mặt Trời rồi! Giỏi quá!": "🏆 You have traveled all over the Solar System! Great job!", "🚀 Đã ghi": "🚀 Added", "vào sổ khám phá (": "to your explorer's log (", "Các hành tinh": "Planets", "Các vệ tinh": "Moons", "Hỏi đáp": "Quiz", "câu.": "questions.", "Các khu vực khám phá": "Exploration areas", "☀️ Hệ Mặt Trời": "☀️ Solar System", "🪐 Hành tinh": "🪐 Planets", "🌙 Vệ tinh": "🌙 Moons", "⭐ Hỏi đáp": "⭐ Quiz"};
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
    if (activeTab === "experience") renderStage();
    translateDom(root);
    setBanner();
  }


  /* ---------- Hình vẽ hành tinh & vệ tinh (khung 120 x 100, tâm 60,50) ---------- */
  const shade = (r) => `<circle cx="60" cy="50" r="${r}" fill="none"/><path d="M${60 + r * 0.2} ${50 - r} A${r} ${r} 0 0 1 ${60 + r * 0.2} ${50 + r} A${r * 0.8} ${r} 0 0 0 ${60 + r * 0.2} ${50 - r}Z" fill="#0F172A" opacity=".22"/><circle cx="${60 - r * 0.38}" cy="${50 - r * 0.4}" r="${r * 0.28}" fill="#fff" opacity=".22"/>`;
  const ball = (r, fill, inner = "") => `<clipPath id="gxc${r}"><circle cx="60" cy="50" r="${r}"/></clipPath><circle cx="60" cy="50" r="${r}" fill="${fill}"/><g clip-path="url(#gxc${r})">${inner}</g>${shade(r)}`;
  const crater = (x, y, r, c = "#000") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".18"/>`;
  const SKY = {
    mercury: () => ball(34, "#A8A29E", crater(48, 40, 6) + crater(70, 60, 8) + crater(66, 32, 4) + crater(46, 64, 5) + crater(78, 44, 3)),
    venus: () => ball(36, "#FCD34D", `<path d="M20 38 Q60 26 100 40 M18 54 Q60 44 102 58 M24 70 Q60 62 96 72" stroke="#FDE68A" stroke-width="6" fill="none"/><path d="M30 46 Q60 36 92 50" stroke="#F59E0B" stroke-width="3" fill="none" opacity=".6"/>`),
    earth: () => ball(36, "#3B82F6", `<path d="M30 26 Q44 18 56 26 Q60 36 50 42 Q40 46 36 58 Q28 50 26 40Z M64 52 Q78 46 90 54 Q92 68 80 76 Q70 72 66 64Z M70 22 Q80 20 86 28 Q78 32 70 28Z" fill="#22C55E"/><path d="M36 30 Q60 24 80 34" stroke="#fff" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/><path d="M44 72 Q60 66 74 70" stroke="#fff" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>`),
    mars: () => ball(32, "#DC5B33", `<path d="M44 20 Q60 14 76 20 L72 26 Q60 22 48 26Z" fill="#fff" opacity=".9"/><path d="M34 46 Q48 40 56 50 Q50 60 38 56Z M66 58 Q80 54 86 62 Q78 70 68 66Z" fill="#9A3412" opacity=".6"/>`),
    jupiter: () => ball(40, "#E7C08B", `<rect x="10" y="22" width="100" height="7" fill="#B07A4A"/><rect x="10" y="36" width="100" height="5" fill="#F5DEB3"/><rect x="10" y="46" width="100" height="8" fill="#A16207" opacity=".7"/><rect x="10" y="62" width="100" height="6" fill="#C2884F"/><rect x="10" y="74" width="100" height="5" fill="#B07A4A"/><ellipse cx="74" cy="62" rx="10" ry="6" fill="#C2410C" stroke="#9A3412" stroke-width="1.5"/>`),
    saturn: () => `<ellipse cx="60" cy="50" rx="56" ry="15" fill="none" stroke="#D6B98C" stroke-width="7" transform="rotate(-16 60 50)"/>${ball(30, "#EBCB8B", `<rect x="20" y="34" width="80" height="6" fill="#D4A55C"/><rect x="20" y="48" width="80" height="5" fill="#F5E1B5"/><rect x="20" y="60" width="80" height="6" fill="#C9984F"/>`)}<path d="M8 62 A56 15 -16 0 0 112 34" transform="rotate(0)" fill="none" stroke="#E9D5A5" stroke-width="7" opacity=".95"/><path d="M8 62 A56 15 -16 0 0 112 34" fill="none" stroke="#B08B57" stroke-width="2"/>`,
    uranus: () => `<ellipse cx="60" cy="50" rx="10" ry="43" fill="none" stroke="#BAE6FD" stroke-width="3" transform="rotate(8 60 50)"/>${ball(30, "#7DD3E8", `<rect x="52" y="10" width="8" height="80" fill="#A5F3FC" opacity=".5" transform="rotate(8 60 50)"/>`)}<path d="M60 7 A10 43 8 0 1 66 93" fill="none" stroke="#E0F2FE" stroke-width="3" transform="rotate(8 60 50)"/>`,
    neptune: () => ball(30, "#2563EB", `<path d="M30 40 Q60 34 90 42 M28 60 Q60 54 92 62" stroke="#60A5FA" stroke-width="3" fill="none"/><ellipse cx="68" cy="50" rx="7" ry="4" fill="#1E3A8A"/><path d="M58 46 q8 -4 18 0" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>`),
    moon: () => ball(30, "#D6D3D1", crater(48, 42, 7) + crater(68, 58, 9) + crater(70, 34, 4) + crater(48, 64, 4)),
    phobos: () => `<path d="M30 52 Q28 30 52 28 Q76 24 88 40 Q96 58 78 70 Q56 80 38 70 Q30 64 30 52Z" fill="#8B7D6B" stroke="#57534E" stroke-width="2"/>${crater(54, 46, 8)}${crater(74, 58, 4)}${crater(42, 60, 3)}`,
    deimos: () => `<path d="M40 50 Q40 34 56 34 Q74 32 80 46 Q84 62 68 68 Q50 72 42 62Z" fill="#A8998A" stroke="#78716C" stroke-width="2"/>${crater(58, 46, 4)}${crater(68, 58, 3)}`,
    io: () => ball(30, "#FDE047", `<circle cx="46" cy="40" r="5" fill="#EA580C"/><circle cx="70" cy="56" r="6" fill="#B45309"/><circle cx="58" cy="66" r="4" fill="#F97316"/><circle cx="72" cy="36" r="3" fill="#78350F"/><circle cx="42" cy="58" r="3" fill="#FFF7ED"/>`),
    europa: () => ball(30, "#F5EBDC", `<path d="M30 30 L90 70 M40 76 L80 22 M28 52 Q60 46 92 54" stroke="#B45309" stroke-width="2" fill="none" opacity=".55"/>`),
    ganymede: () => ball(34, "#9C8F80", `<path d="M30 30 Q50 40 44 60 Q34 64 28 54Z M62 26 Q84 30 88 52 Q74 50 64 40Z" fill="#6B5F55"/><path d="M50 70 Q66 64 80 74" stroke="#D6D3D1" stroke-width="3" fill="none"/>`),
    callisto: () => ball(32, "#57534E", `<circle cx="46" cy="40" r="3" fill="#E7E5E4"/><circle cx="70" cy="56" r="4" fill="#E7E5E4"/><circle cx="60" cy="34" r="2" fill="#E7E5E4"/><circle cx="50" cy="66" r="2.5" fill="#E7E5E4"/><circle cx="78" cy="40" r="2" fill="#E7E5E4"/><circle cx="38" cy="54" r="2" fill="#E7E5E4"/>`),
    titan: () => `<circle cx="60" cy="50" r="36" fill="#FDBA74" opacity=".35"/>${ball(31, "#F59E0B", `<rect x="20" y="36" width="80" height="6" fill="#FCD34D" opacity=".5"/><rect x="20" y="56" width="80" height="5" fill="#D97706" opacity=".5"/>`)}`,
    enceladus: () => `${ball(28, "#F8FAFC", `<path d="M44 66 L56 52 M52 70 L64 54 M60 72 L72 58" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>`)}<path d="M54 80 L48 98 M60 80 L60 99 M66 80 L72 98" stroke="#E0F2FE" stroke-width="3" stroke-linecap="round" opacity=".8"/>`,
    miranda: () => ball(28, "#B8B2AA", `<path d="M36 34 L56 44 L44 56 L64 64 L54 78 M64 26 L80 44 L70 52" stroke="#78716C" stroke-width="3" fill="none" stroke-linejoin="round"/>`),
    titania: () => ball(31, "#C9B8A6", crater(48, 42, 5) + crater(70, 60, 6) + `<path d="M40 60 Q56 54 66 70" stroke="#8B7D6B" stroke-width="2.5" fill="none"/>`),
    oberon: () => ball(30, "#8B7F76", crater(50, 40, 6) + crater(70, 54, 7) + crater(46, 62, 4) + `<circle cx="68" cy="36" r="2.5" fill="#F5F5F4"/>`),
    triton: () => ball(29, "#F0D5D0", `<path d="M30 58 Q60 50 90 60 L90 80 L30 80Z" fill="#F9A8D4" opacity=".55"/><circle cx="50" cy="40" r="2" fill="#78716C"/><circle cx="66" cy="34" r="2" fill="#78716C"/><circle cx="72" cy="46" r="1.6" fill="#78716C"/>`)
  };
  /* Mỗi SVG có id clipPath riêng để không đụng nhau giữa các hình */
  let skyUid = 0;
  function skySvg(id) {
    const draw = SKY[id];
    if (!draw) return "";
    skyUid += 1;
    const html = draw().replace(/gxc(\d+)/g, `gxc$1_${skyUid}`);
    return `<svg class="gx-sky-svg" viewBox="0 0 120 100" aria-hidden="true" focusable="false">${html}</svg>`;
  }
  const SUN_SVG = `<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false"><circle cx="40" cy="40" r="34" fill="#FDE68A"/><circle cx="40" cy="40" r="26" fill="#FBBF24"/><circle cx="40" cy="40" r="18" fill="#F59E0B" opacity=".6"/></svg>`;

  /* ---------- Sơ đồ Hệ Mặt Trời (không đúng tỉ lệ) — khung ngang cho to, rõ ---------- */
  const ORBITS = [
    { id: "mercury", r: 270, a: -30, s: 26 },
    { id: "venus", r: 330, a: 30, s: 34 },
    { id: "earth", r: 395, a: -12, s: 36 },
    { id: "mars", r: 455, a: 11, s: 30 },
    { id: "jupiter", r: 562, a: -16, s: 70 },
    { id: "saturn", r: 680, a: 10, s: 64 },
    { id: "uranus", r: 800, a: -11, s: 48 },
    { id: "neptune", r: 912, a: 9, s: 46 }
  ];
  const tw = (s) => Math.round(s.length * 15.5 + 36);
  function solarMapSvg(selected, names) {
    const W = 960, H = 520, cx = -120, cy = 260;
    const orbits = ORBITS.map((o) => `<circle cx="${cx}" cy="${cy}" r="${o.r}" fill="none" stroke="#C4B5FD" stroke-width="2" stroke-dasharray="4 8" opacity=".5"/>`).join("");
    const belt = Array.from({ length: 60 }, (_, k) => {
      const ang = (-32 + k * 1.1) * Math.PI / 180, rr = 508 + ((k * 37) % 17) - 8;
      return `<circle cx="${(cx + rr * Math.cos(ang)).toFixed(1)}" cy="${(cy + rr * Math.sin(ang)).toFixed(1)}" r="${1.8 + (k % 3) * 0.8}" fill="#A8A29E" opacity=".75"/>`;
    }).join("");
    const planets = ORBITS.map((o) => {
      const ang = o.a * Math.PI / 180;
      const x = cx + o.r * Math.cos(ang), y = cy + o.r * Math.sin(ang);
      const w = o.s * 2.4, h = w * 100 / 120;
      const on = selected === o.id;
      const name = names[o.id], tagW = tw(name), tagY = y + o.s * 0.85 + 6;
      return `<g class="gx-part ${on ? "is-selected" : ""}" data-object="${o.id}" role="button" tabindex="0" aria-label="${name}">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${o.s + 16}" fill="transparent"/>
        <svg x="${(x - w / 2).toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" viewBox="0 0 120 100" overflow="visible">${SKY[o.id]().replace(/gxc(\d+)/g, `gxc$1_m${o.id}`)}</svg>
        <rect class="gx-pl-tag" x="${(x - tagW / 2).toFixed(1)}" y="${tagY.toFixed(1)}" width="${tagW}" height="46" rx="23"/>
        <text class="gx-pl-name" x="${x.toFixed(1)}" y="${(tagY + 32).toFixed(1)}" text-anchor="middle">${name}</text></g>`;
    }).join("");
    const stars = Array.from({ length: 70 }, (_, k) => `<circle cx="${(k * 137) % W}" cy="${(k * 71) % H}" r="${k % 4 === 0 ? 2.2 : 1.2}" fill="#fff" opacity="${0.35 + (k % 3) * 0.2}"/>`).join("");
    return `<svg class="gx-map-svg gx-solar" viewBox="0 0 ${W} ${H}" role="group" aria-label="Hệ Mặt Trời">
      <defs><clipPath id="gxSolarClip"><rect width="${W}" height="${H}" rx="24"/></clipPath></defs>
      <g clip-path="url(#gxSolarClip)">
      <rect width="${W}" height="${H}" rx="24" fill="#1E1B4B"/>${stars}${orbits}${belt}
      <g class="gx-part gx-sun ${selected === "solar-system" ? "is-selected" : ""}" data-object="solar-system" role="button" tabindex="0" aria-label="Mặt Trời và Hệ Mặt Trời">
        <circle cx="${cx}" cy="${cy}" r="252" fill="#FBBF24" opacity=".3"/><circle cx="${cx}" cy="${cy}" r="226" fill="#FBBF24"/><circle cx="${cx}" cy="${cy}" r="190" fill="#F59E0B" opacity=".55"/>
        <rect class="gx-pl-tag" x="14" y="${cy - 24}" width="${tw("Mặt Trời")}" height="48" rx="24"/><text class="gx-pl-name" x="${14 + tw("Mặt Trời") / 2}" y="${cy + 10}" text-anchor="middle">Mặt Trời</text></g>
      ${planets}
      </g>
    </svg>`;
  }


  /* ---------- Khu vườn ở tab đầu ----------
     x, y = vị trí trái / đáy (%), w = chiều rộng (% bức tranh). Hàng sau đặt trước. */
  /* ---------- Trạng thái ---------- */
  let controller = null;
  let root = null;
  let activeContext = null;
  let activeTab = "system";
  let selectedId = DATA.overview.id;
  let quiz = null;
  let autoRead = true;
  let toastTimer = 0;
  let found = loadFound();

  const allItems = [DATA.overview, ...DATA.primary, ...DATA.secondary];
  const byId = (id) => allItems.find((item) => item.id === id) || DATA.overview;
  const isPlanet = (id) => DATA.primary.some((d) => d.id === id);
  const isMoon = (id) => DATA.secondary.some((d) => d.id === id);
  const PLANET_NAMES = Object.fromEntries(DATA.primary.map((p) => [p.id, p.name]));
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
      ${R} .gx-tab[data-tab="moons"][aria-selected="true"],${R} .gx-tab[data-tab="quiz"][aria-selected="true"]{background:var(--grad-alt)}
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
      ${R} .gx-hero.is-space{background:radial-gradient(circle at 30% 30%,#312E81,#1E1B4B)}
      ${R} .gx-thumb.is-space{background:radial-gradient(circle at 30% 30%,#312E81,#1E1B4B);padding:6px}
      ${R} .gx-group{grid-column:1/-1;display:flex;align-items:center;gap:8px;margin-top:6px;font-size:19px;font-weight:700;color:var(--jungle)}
      ${R} .gx-group-icon{width:44px;height:36px;flex:0 0 44px;border-radius:10px;background:#1E1B4B;display:grid;place-items:center}
      ${R} .gx-group-icon svg{width:40px;height:34px}
      ${R} .gx-solar .gx-part{cursor:pointer;outline:none}
      ${R} .gx-pl-tag{fill:#fff;opacity:.94}
      ${R} .gx-split.gx-split-wide{grid-template-columns:minmax(0,1.75fr) minmax(320px,1fr)}
      ${R} .gx-pl-name{font:700 28px "Baloo 2","Nunito",system-ui,sans-serif;fill:#5B216E}
      ${R} .gx-solar .gx-part.is-selected .gx-pl-tag{fill:#EC4899;opacity:1}
      ${R} .gx-solar .gx-part.is-selected .gx-pl-name{fill:#fff}
      ${R} .gx-solar .gx-part:not(.gx-sun):hover>svg,${R} .gx-solar .gx-part:not(.gx-sun):focus-visible>svg{filter:drop-shadow(0 0 6px rgba(196,181,253,.9))}
      ${R} .gx-solar .gx-part.is-selected:not(.gx-sun){filter:none}
      ${R} .gx-solar .gx-part.is-selected:not(.gx-sun)>svg{filter:drop-shadow(0 0 6px #F9A8D4) drop-shadow(0 0 12px rgba(236,72,153,.7))}
      ${R} .gx-spot.is-selected .gx-sky-svg{filter:drop-shadow(0 0 6px rgba(236,72,153,.8))}
      ${R} .gx-logo svg{width:46px}
      ${R} .gx-grid{grid-auto-rows:auto}
      ${R} .gx-grid .gx-thumb{flex:0 0 96px;height:96px}
      ${R} .gx-thumb.is-space svg{width:100%;height:100%}
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

      ${R}{box-sizing:border-box}
      ${R} .gx-tabs:has([data-tab="experience"]){grid-template-columns:repeat(5,minmax(0,1fr))}
      ${R} .gx-tab[data-tab="experience"][aria-selected="true"]{background:var(--grad-alt)}
      ${R} .gx-experience{height:100%;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(290px,.85fr);gap:12px;padding:12px;overflow:auto;align-items:start;background:linear-gradient(155deg,#F5F3FF,#ECFEFF)}
      ${R} .gx-ex-visual,${R} .gx-ex-panel{min-width:0;border:1px solid #DDD6FE;border-radius:20px;background:#fff;padding:13px;box-shadow:0 5px 15px rgba(76,29,149,.06)}
      ${R} .gx-ex-kicker{color:#7E22CE;font-size:15px;font-weight:800;margin:0 0 8px;line-height:1.35}
      ${R} .gx-ex-canvas{display:block;width:100%;height:auto;aspect-ratio:2/1;max-width:100%;border-radius:16px;border:1px solid #BFDBFE;background:#E0F2FE}
      ${R} .gx-ex-caption{color:#64748B;font-size:13px;margin:8px 0 0;line-height:1.4;font-weight:650}
      ${R} .gx-ex-panel h3{font-size:clamp(21px,2.2vw,27px);line-height:1.2;margin:0 0 9px;color:#6D28D9}
      ${R} .gx-ex-panel>p{font-size:16px;line-height:1.5;margin:0 0 12px;color:#334155;font-weight:650}
      ${R} .gx-ex-group{margin-top:12px;color:#334155;display:grid;gap:6px}
      ${R} .gx-ex-group strong{font-size:16px}
      ${R} .gx-ex-buttons{display:flex;flex-wrap:wrap;gap:7px}
      ${R} .gx-ex-btn{border:1px solid #BFDDFB!important;background:#fff!important;color:#1D4ED8!important;border-radius:12px;padding:9px 11px;font-size:15px;font-weight:800;min-height:42px;line-height:1.2}
      ${R} .gx-ex-btn.is-on,${R} .gx-ex-btn[aria-pressed="true"]{color:#fff!important;background:linear-gradient(90deg,#3B82F6,#14B8A6)!important;border-color:transparent!important}
      ${R} .gx-ex-range-label{font-size:16px;font-weight:800;display:grid;gap:8px;color:#334155;margin:13px 0 9px}
      ${R} .gx-ex-range-label input{accent-color:#14B8A6;width:100%;height:24px;cursor:pointer}
      ${R} .gx-ex-feedback{border:1px solid #A7F3D0;border-radius:14px;background:#ECFDF5;padding:12px;color:#047857;font-size:16px;font-weight:750;line-height:1.5;margin-top:13px;min-height:71px}
      ${R} .gx-ex-listen{margin-top:12px;border:1px solid #FBCFE8;border-radius:14px;background:linear-gradient(90deg,#FCE7F3,#EDE9FE);color:#7E22CE;font-size:16px;font-weight:800;min-height:45px;padding:9px 14px}
      @media(max-width:900px){${R} .gx-experience{grid-template-columns:minmax(0,1fr)}${R} .gx-ex-panel{margin-bottom:8px}}
      @media(max-width:760px){${R} .gx-tabs:has([data-tab="experience"]){grid-template-columns:repeat(2,minmax(0,1fr))}${R} .gx-experience{padding:8px;gap:9px}${R} .gx-ex-visual,${R} .gx-ex-panel{padding:10px}${R} .gx-ex-kicker{font-size:13px}${R} .gx-ex-panel>p{font-size:15px}}

    `;
    document.head.appendChild(style);
  }


  function heroArt(obj) {
    if (SKY[obj.id]) return `<div class="gx-hero is-organ is-space">${skySvg(obj.id)}</div>`;
    return `<div class="gx-hero is-organ is-space">${SUN_SVG}</div>`;
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
  function systemHtml() {
    if (isMoon(selectedId)) selectedId = DATA.overview.id;
    return `<div class="gx-split gx-split-wide">
      ${mapCard("Chạm vào Mặt Trời hoặc từng hành tinh nhé! Hình không đúng kích thước thật.", solarMapSvg(selectedId, PLANET_NAMES))}
      <aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside>
    </div>`;
  }
  function itemCard(o) {
    const tick = found.has(o.id) ? `<span class="gx-tick">✓ Đã xem</span>` : "";
    return `<button type="button" class="gx-item gx-land-item ${o.id === selectedId ? "is-selected" : ""}" data-object="${o.id}">${tick}<span class="gx-thumb is-space">${skySvg(o.id)}</span><span class="gx-item-text"><strong>${o.name}</strong><small>${o.subtitle}</small></span></button>`;
  }
  function moonsHtml() {
    if (!isMoon(selectedId)) selectedId = DATA.secondary[0].id;
    const groups = DATA.primary.filter((p) => DATA.secondary.some((m) => m.parent === p.id)).map((p) =>
      `<div class="gx-group"><span class="gx-group-icon">${skySvg(p.id)}</span>Quay quanh ${p.name}</div>${DATA.secondary.filter((m) => m.parent === p.id).map(itemCard).join("")}`).join("");
    return `<div class="gx-split"><div class="gx-card gx-grid">${groups}</div><aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside></div>`;
  }

  function gridHtml(items) {
    if (!items.some((i) => i.id === selectedId)) selectedId = items[0].id;
    return `<div class="gx-split"><div class="gx-card gx-grid">${items.map(itemCard).join("")}</div><aside class="gx-card gx-info" id="gx-info" aria-live="polite">${detailHtml(byId(selectedId))}</aside></div>`;
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
      const msg = stars === 3 ? "Tuyệt vời! Con là nhà du hành vũ trụ nhí rồi!" : stars === 2 ? "Giỏi lắm! Con ôn lại mấy câu dưới đây nhé." : "Con đã cố gắng! Mình cùng ôn lại rồi chơi tiếp nhé.";
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


  /* Epsilon Edu - interactive experience. All state is in memory; no extra storage or APIs. */
  const EX_KIND = "space";
  const exT = (vi, en) => LANG === "en" ? en : vi;
  const EX = {raf: 0, last: 0, phase: 0, running: true, speed: 55, earthDepth: 0, planet: "earth", dino: "longneck", food: "leaves", walk: 0, eat: false,
    beeX: 110, beeTarget: -1, pollenFrom: -1, visited: [], pollinated: false, carX: 75, light: "red", result: "", starPositions: []};
  function exReset() {
    stopExperience();
    Object.assign(EX, { last:0, phase:0, running:EX_KIND !== "earth", speed:55, earthDepth:0, planet:"earth", dino:"longneck",food:"leaves",walk:0,eat:false,beeX:110,beeTarget:-1,pollenFrom:-1,visited:[],pollinated:false,carX:75,light:"red",result:"" });
  }
  const exDescription = {
    space: ["🪐 Phòng thí nghiệm quỹ đạo", "🪐 Orbit Lab", "Chọn hành tinh, chỉnh tốc độ rồi quan sát đường đi quanh Mặt Trời. Các quỹ đạo được vẽ không theo tỉ lệ thật.", "Choose a planet, change the speed and watch it travel around the Sun. Orbit sizes are not to scale."],
    earth: ["🌍 Hành trình vào lòng Trái Đất", "🌍 Journey Inside Earth", "Kéo thanh khám phá từ vỏ tới lõi Trái Đất. Quan sát lớp đang đi qua và vì sao càng vào sâu càng nóng.", "Move the exploration slider from Earth's crust toward its core. See each layer and why deeper regions are much hotter."],
    dinosaur: ["🦕 Bữa ăn của khủng long", "🦕 Dinosaur Food Lab", "Chọn khủng long, chọn thức ăn rồi thử cho bạn ấy đi tới. Bé sẽ khám phá con nào ăn cây và con nào ăn thịt.", "Choose a dinosaur and a food, then let it walk over. Find out which dinosaurs ate plants and which ate meat."],
    insect: ["🐝 Ong giúp hoa tạo hạt", "🐝 How Bees Help Flowers", "Cho ong lấy phấn ở một bông hoa, rồi ghé bông khác cùng loài. Quan sát cách thụ phấn giúp cây tạo hạt.", "Collect pollen from one flower, then visit another flower of the same kind. Watch how pollination helps plants make seeds."],
    vehicle: ["🚦 Thử làm người điều khiển đèn", "🚦 Traffic Light Lab", "Chọn đỏ, vàng hoặc xanh và xem ô tô phản ứng trước vạch dừng. Đèn vàng nhắc xe giảm tốc và chuẩn bị dừng.", "Choose red, amber or green and see what the car does at the stop line. Amber tells drivers to slow down and prepare to stop."]
  };
  function exButtons(items) { return items.map(([act,val,vi,en]) => `<button type="button" class="gx-ex-btn" data-ex="${act}" data-ex-value="${val}" aria-pressed="false">${exT(vi,en)}</button>`).join(""); }
  function exControlsHtml() {
    if (EX_KIND === "space") return `<div class="gx-ex-group"><strong>${exT("Chọn hành tinh","Choose a planet")}</strong><div class="gx-ex-buttons">${exButtons([["planet","mercury","Sao Thủy","Mercury"],["planet","earth","Trái Đất","Earth"],["planet","mars","Sao Hỏa","Mars"],["planet","saturn","Sao Thổ","Saturn"]])}</div></div><label class="gx-ex-range-label">${exT("Tốc độ mô phỏng","Simulation speed")}<input data-ex-range="speed" type="range" min="15" max="100" value="${EX.speed}"></label><div class="gx-ex-buttons">${exButtons([["toggle","", "⏸ Tạm dừng / Chạy", "⏸ Pause / Play"]])}</div>`;
    if (EX_KIND === "earth") return `<label class="gx-ex-range-label">${exT("Khám phá độ sâu","Explore the depth")}<input data-ex-range="depth" type="range" min="0" max="100" value="${EX.earthDepth}"></label><div class="gx-ex-buttons">${exButtons([["layer","0","Vỏ","Crust"],["layer","35","Manti","Mantle"],["layer","75","Lõi ngoài","Outer core"],["layer","100","Lõi trong","Inner core"],["toggle","","⏸ Dừng / Tiếp","⏸ Pause / Play"]])}</div>`;
    if (EX_KIND === "dinosaur") return `<div class="gx-ex-group"><strong>${exT("Chọn khủng long","Choose a dinosaur")}</strong><div class="gx-ex-buttons">${exButtons([["dino","longneck","🦕 Cổ dài","🦕 Long-neck"],["dino","trex","🦖 Bạo chúa","🦖 T. rex"]])}</div></div><div class="gx-ex-group"><strong>${exT("Chọn bữa ăn","Choose a meal")}</strong><div class="gx-ex-buttons">${exButtons([["food","leaves","🌿 Lá cây","🌿 Leaves"],["food","meat","🍖 Thịt","🍖 Meat"],["try","","▶ Đi ăn thử","▶ Try the food"]])}</div></div>`;
    if (EX_KIND === "insect") return `<div class="gx-ex-group"><strong>${exT("Bé đưa ong tới hoa nào?","Where should the bee go?")}</strong><div class="gx-ex-buttons">${exButtons([["flower","0","🌸 Hoa 1","🌸 Flower 1"],["flower","1","🌼 Hoa 2","🌼 Flower 2"],["flower","2","🌺 Hoa 3","🌺 Flower 3"],["reset","","↻ Làm lại","↻ Reset"]])}</div></div>`;
    return `<div class="gx-ex-group"><strong>${exT("Bé chọn tín hiệu nào?","Choose a traffic light")}</strong><div class="gx-ex-buttons">${exButtons([["light","red","🔴 Đỏ","🔴 Red"],["light","yellow","🟡 Vàng","🟡 Amber"],["light","green","🟢 Xanh","🟢 Green"],["reset","","↻ Thử lại","↻ Reset"]])}</div></div><label class="gx-ex-range-label">${exT("Tốc độ xe khi đèn xanh","Car speed on green")}<input data-ex-range="speed" type="range" min="15" max="100" value="${EX.speed}"></label>`;
  }
  function exFeedbackText() {
    if (EX.result) return typeof EX.result === "object" ? exT(EX.result.vi, EX.result.en) : EX.result;
    if (EX_KIND === "space") {
      const a = {mercury:["Sao Thủy đi hết một vòng quanh Mặt Trời nhanh hơn Trái Đất.","Mercury completes an orbit around the Sun faster than Earth."],earth:["Trái Đất quay quanh Mặt Trời, đồng thời tự quay tạo ra ngày và đêm.","Earth orbits the Sun and spins on its axis, creating day and night."],mars:["Sao Hỏa ở xa Mặt Trời hơn Trái Đất và cần lâu hơn để đi hết một vòng.","Mars is farther from the Sun than Earth, so its orbit takes longer."],saturn:["Sao Thổ có vành đai và mất rất nhiều thời gian để đi hết một vòng quanh Mặt Trời.","Saturn has rings and takes much longer to orbit the Sun."]}[EX.planet];return exT(...a);
    }
    if (EX_KIND === "earth") {const d=EX.earthDepth;return d<12?exT("Vỏ là lớp ngoài mỏng, nơi chúng ta sống.","The crust is the thin outer layer where we live."):d<64?exT("Manti nằm dưới vỏ. Đá ở đây rất nóng và có thể biến dạng chậm.","The mantle lies below the crust. Its hot rock can deform very slowly."):d<90?exT("Lõi ngoài chủ yếu là sắt và niken ở trạng thái lỏng.","The outer core is made mostly of liquid iron and nickel."):exT("Lõi trong rất nóng nhưng rắn vì áp suất cực lớn.","The inner core is very hot but solid because of enormous pressure."); }
    if (EX_KIND === "dinosaur") return exT("Bé dự đoán xem khủng long này ăn lá cây hay ăn thịt nhé!", "Which food did this dinosaur eat: leaves or meat?");
    if (EX_KIND === "insect") return EX.pollinated?exT("Phấn hoa được chuyển từ hoa này sang hoa khác. Sau thụ phấn, cây có thể hình thành hạt!","Pollen moved between flowers. After pollination, a plant may form seeds!"):EX.pollenFrom>=0?exT("Ong mang phấn rồi! Bé thử đưa ong sang một bông hoa khác.","The bee has pollen! Send it to a different flower."):exT("Bé hãy cho ong ghé bông hoa thứ nhất để lấy phấn.","Let the bee visit a flower to collect pollen.");
    return EX.light==="red"?exT("Đèn đỏ: xe phải dừng trước vạch dừng.","Red light: the car must stop before the line."):EX.light==="yellow"?exT("Đèn vàng: giảm tốc và chuẩn bị dừng an toàn.","Amber light: slow down and prepare to stop safely."):exT("Đèn xanh: xe có thể đi khi phía trước an toàn.","Green light: the car may go when the way is clear.");
  }
  function experienceHtml() {
    const x=exDescription[EX_KIND];
    return `<section class="gx-experience" aria-label="${exT("Trải nghiệm để hiểu","Learn by doing")}"><div class="gx-ex-visual"><div class="gx-ex-kicker">① ${exT("Kiến thức trực quan → ② Trải nghiệm để hiểu", "Explore the facts → Learn by doing")}</div><canvas class="gx-ex-canvas" width="880" height="440" role="img" aria-label="${exT(x[0],x[1])}"></canvas><p class="gx-ex-caption">${exT("Mô phỏng minh họa, không theo kích thước hoặc thời gian thực.","Illustrative simulation, not to real-life scale or timing.")}</p></div><aside class="gx-ex-panel"><h3>${exT(x[0],x[1])}</h3><p>${exT(x[2],x[3])}</p>${exControlsHtml()}<div class="gx-ex-feedback" data-ex-feedback role="status" aria-live="polite">${exFeedbackText()}</div><button type="button" class="gx-ex-listen" data-ex="listen">🔊 ${exT("Nghe Cô Thỏ giải thích","Listen to Miss Pink Bunny")}</button></aside></section>`;
  }
  function exPoint(ctx,x,y,r,color) {ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
  function exLine(ctx,x,y,xx,yy,color,w=3) {ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(xx,yy);ctx.lineWidth=w;ctx.strokeStyle=color;ctx.stroke();}
  function exRound(ctx,x,y,w,h,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
  function exText(ctx,s,x,y,size=24,color="#fff",align="center"){ctx.fillStyle=color;ctx.font=`800 ${size}px system-ui,sans-serif`;ctx.textAlign=align;ctx.textBaseline="middle";ctx.fillText(s,x,y);}
  function exCloud(ctx,x,y,k=1){ctx.fillStyle="rgba(255,255,255,.84)";exPoint(ctx,x,y,21*k,"rgba(255,255,255,.84)");exPoint(ctx,x+22*k,y-8*k,28*k,"rgba(255,255,255,.84)");exPoint(ctx,x+47*k,y,20*k,"rgba(255,255,255,.84)");}
  function exFlower(ctx,x,y,palette,size=1){exLine(ctx,x,y+8*size,x,y+112*size,"#168047",8*size);ctx.strokeStyle="#15803d";ctx.lineWidth=4*size;ctx.beginPath();ctx.ellipse(x-15*size,y+57*size,22*size,9*size,-.7,0,Math.PI*2);ctx.stroke();for(let a=0;a<6;a++){const t=a*Math.PI/3;exPoint(ctx,x+Math.cos(t)*19*size,y+Math.sin(t)*19*size,14*size,palette)}exPoint(ctx,x,y,12*size,"#FACC15");}
  function exDrawSpace(ctx,t){
    const bg=ctx.createLinearGradient(0,0,880,440);bg.addColorStop(0,"#0C1542");bg.addColorStop(1,"#271057");ctx.fillStyle=bg;ctx.fillRect(0,0,880,440);
    for(let i=0;i<85;i++){const x=(i*307+31)%880,y=(i*113+47)%440;exPoint(ctx,x,y,1.2+(i%4)*.3,`rgba(255,255,255,${.32+.3*Math.sin(t*.5+i)})`)}
    const cx=430,cy=225;exPoint(ctx,cx,cy,57,"#F97316");exPoint(ctx,cx,cy,46,"#FBBF24");exText(ctx,exT("Mặt Trời","Sun"),cx,300,19,"#FEF3C7");
    const opts=[{name:"mercury",r:108,rr:9,color:"#B8B2A7",v:1.65},{name:"earth",r:155,rr:17,color:"#3B82F6",v:1.05},{name:"mars",r:207,rr:13,color:"#FB704A",v:.78},{name:"saturn",r:258,rr:22,color:"#F8C77F",v:.43}];
    opts.forEach((p,i)=>{ctx.beginPath();ctx.ellipse(cx,cy,p.r*1.37,p.r*.67,0,0,Math.PI*2);ctx.strokeStyle=EX.planet===p.name?"#93C5FD":"rgba(191,219,254,.23)";ctx.lineWidth=EX.planet===p.name?3:1.5;ctx.stroke();const a=-.75+t*p.v*.22,px=cx+Math.cos(a)*p.r*1.37,py=cy+Math.sin(a)*p.r*.67;exPoint(ctx,px,py,p.rr,p.color);if(p.name==="earth"){exPoint(ctx,px+Math.cos(t*2.5)*6,py+Math.sin(t*2.5)*7,p.rr*.42,"#34D399");exPoint(ctx,px-Math.sin(t*2.5)*7,py+Math.cos(t*2.5)*7,p.rr*.24,"#34D399");}if(p.name==="saturn"){ctx.beginPath();ctx.ellipse(px,py,p.rr*1.55,p.rr*.37,-.3,0,Math.PI*2);ctx.strokeStyle="#FDE68A";ctx.lineWidth=4;ctx.stroke();}if(EX.planet===p.name){ctx.beginPath();ctx.arc(px,py,p.rr+10,0,Math.PI*2);ctx.strokeStyle="#F9A8D4";ctx.lineWidth=3;ctx.stroke();exText(ctx,exT(["Sao Thủy","Trái Đất","Sao Hỏa","Sao Thổ"][i],["Mercury","Earth","Mars","Saturn"][i]),px,py-p.rr-25,17);}});
  }
  function exDrawEarth(ctx,t){
    const grad=ctx.createLinearGradient(0,0,0,440);grad.addColorStop(0,"#DBF4FF");grad.addColorStop(1,"#F5E4FF");ctx.fillStyle=grad;ctx.fillRect(0,0,880,440);exCloud(ctx,110,85,1.1);exCloud(ctx,710,100,.75);
    const cx=420,cy=226,r=173;exPoint(ctx,cx,cy,r,"#22B8BA");exPoint(ctx,cx,cy,r-16,"#F7B553");exPoint(ctx,cx,cy,118,"#F97316");exPoint(ctx,cx,cy,72,"#F6D665");exPoint(ctx,cx,cy,35,"#FEF3A3");
    for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(cx,cy,120+i*22,Math.PI*1.2,Math.PI*1.8);ctx.strokeStyle="rgba(255,255,255,.2)";ctx.lineWidth=3;ctx.stroke();}
    const drill=EX.earthDepth/100*156;exLine(ctx,cx,cy-173,cx,cy-173+drill,"#1D4ED8",7);exPoint(ctx,cx,cy-173+drill,9,"#FFFFFF");exPoint(ctx,cx,cy-173+drill,6,"#1D4ED8");
    const d=EX.earthDepth;const layer=d<12?0:d<64?1:d<90?2:3;const names=LANG==="en"?["Crust","Mantle","Outer core","Inner core"]:["Vỏ Trái Đất","Lớp manti","Lõi ngoài","Lõi trong"];
    exRound(ctx,620,154,220,48,16,"rgba(255,255,255,.93)");exText(ctx,names[layer],730,178,21,"#581C87");
    ["#22B8BA","#F7B553","#F97316","#F6D665"].forEach((c,i)=>{exPoint(ctx,645,230+i*41,11,c);exText(ctx,names[i],671,230+i*41,16,"#334155","left")});
    exText(ctx,exT("Bé đang đi sâu vào Trái Đất", "Exploring deep inside Earth"),440,32,22,"#184E77");
  }
  function exDrawDinosaur(ctx,t){
    const bg=ctx.createLinearGradient(0,0,0,440);bg.addColorStop(0,"#BEEEF9");bg.addColorStop(1,"#E1F9CC");ctx.fillStyle=bg;ctx.fillRect(0,0,880,440);exCloud(ctx,100,90);exCloud(ctx,590,68,1.1);exRound(ctx,0,340,880,100,0,"#8CD887");
    for(let i=0;i<6;i++){const x=i*165+55;exLine(ctx,x,340,x,253,"#A16207",15);exPoint(ctx,x,246,37,"#16A34A");exPoint(ctx,x+28,265,29,"#22C55E")}
    const x=110+EX.walk*5.5,y=287+Math.sin(t*6)*(EX.walk>1?3:1);ctx.save();ctx.translate(x,y);
    const color=EX.dino==="trex"?"#FB923C":"#A78BFA";
    ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-20,-19);ctx.lineTo(-127,-95);ctx.lineTo(-50,6);ctx.fill();
    exPoint(ctx,0,-52,60,color);
    if(EX.dino==="longneck"){exLine(ctx,30,-65,72,-169,color,32);exPoint(ctx,83,-168,30,color);exPoint(ctx,94,-173,5,"#1E293B");}
    else {exLine(ctx,30,-53,78,-99,color,31);exRound(ctx,59,-123,72,35,14,color);exPoint(ctx,103,-112,5,"#1E293B");exLine(ctx,32,-41,64,-22,color,9);}
    for(let i=0;i<2;i++){const foot=i===0?-23:28;exLine(ctx,foot,-10,foot+Math.sin(t*6+i*Math.PI)*10,42,"#7C3AED",17);exLine(ctx,foot+Math.sin(t*6+i*Math.PI)*10,42,foot+21,46,"#7C3AED",9);}
    ctx.restore();
    const foodX=710;exRound(ctx,654,326,148,18,7,"#65A30D");exText(ctx,EX.food==="leaves"?"🌿":"🍖",foodX,276,74,"#14532D");
    exText(ctx,exT("Thử dự đoán bữa ăn", "Guess the dinosaur's meal"),440,35,23,"#164E63");
  }
  function exDrawInsect(ctx,t){
    const bg=ctx.createLinearGradient(0,0,0,440);bg.addColorStop(0,"#D6F5FF");bg.addColorStop(1,"#E7F9D6");ctx.fillStyle=bg;ctx.fillRect(0,0,880,440);exCloud(ctx,120,65);exRound(ctx,0,345,880,95,0,"#B7E9A7");
    const xs=[190,448,695],ys=[230,195,232];["#F9A8D4","#FDA4AF","#F472B6"].forEach((c,i)=>{exFlower(ctx,xs[i],ys[i],c,1.45);if(EX.pollinated && EX.visited.includes(i)){exText(ctx,"✓",xs[i]+48,ys[i]-40,33,"#047857")}});
    const bx=EX.beeX,by=122+Math.sin(t*9)*6;ctx.save();ctx.translate(bx,by);ctx.save();ctx.rotate(-.2);ctx.fillStyle="rgba(255,255,255,.82)";ctx.beginPath();ctx.ellipse(-12,-16,19,10,-.6,0,Math.PI*2);ctx.ellipse(8,-18,19,10,.5,0,Math.PI*2);ctx.fill();ctx.restore();exPoint(ctx,0,0,23,"#FACC15");exRound(ctx,-4,-20,8,40,2,"#1E293B");exRound(ctx,9,-18,6,36,2,"#1E293B");exPoint(ctx,16,-4,3,"#fff");ctx.restore();
    if(EX.pollenFrom>=0){exPoint(ctx,bx-26,by+8,6,"#FACC15");exPoint(ctx,bx+29,by+6,5,"#FBBF24")}
    exText(ctx,exT("Ong chuyển phấn hoa", "Bees move pollen"),440,42,24,"#166534");
    if(EX.pollinated){exRound(ctx,307,355,265,53,15,"#DCFCE7");exText(ctx,exT("Hạt có thể hình thành 🌱","Seeds may form 🌱"),440,382,22,"#166534")}
  }
  function exDrawVehicle(ctx,t){
    const bg=ctx.createLinearGradient(0,0,0,440);bg.addColorStop(0,"#BEEAFD");bg.addColorStop(1,"#F0FAFF");ctx.fillStyle=bg;ctx.fillRect(0,0,880,440);exCloud(ctx,125,88);exCloud(ctx,685,74);
    for(let i=0;i<5;i++){exRound(ctx,i*196-20,145,148,156,5,["#E9D5FF","#CCFBF1","#FDE68A"][i%3]);for(let y=0;y<3;y++)for(let x=0;x<3;x++)exRound(ctx,i*196+x*36+10,169+y*35,20,20,2,"#7DD3FC")}
    exRound(ctx,0,307,880,133,0,"#475569");for(let i=0;i<8;i++)exRound(ctx,i*120+20,411,64,5,1,"#F8FAFC");
    exRound(ctx,330,307,10,113,1,"#F8FAFC");for(let i=0;i<5;i++)exRound(ctx,335+i*20,312,10,77,0,"#E2E8F0");
    exRound(ctx,363,134,11,171,2,"#64748B");exRound(ctx,341,92,55,115,16,"#1E293B");["red","yellow","green"].forEach((c,i)=>exPoint(ctx,369,114+i*35,12,EX.light===c?["#EF4444","#FACC15","#22C55E"][i]:"#475569"));
    const x=EX.carX,y=350;exRound(ctx,x,y-30,130,49,17,"#0EA5E9");exRound(ctx,x+26,y-58,76,42,14,"#38BDF8");exRound(ctx,x+37,y-50,55,25,8,"#D6F4FE");for(let i=0;i<2;i++){exPoint(ctx,x+29+i*75,y+19,20,"#1E293B");exPoint(ctx,x+29+i*75,y+19,9,"#CBD5E1")}
    exText(ctx,exT("Thử đèn giao thông", "Try the traffic lights"),440,39,24,"#075985");
  }
  function exUpdateFeedback(){
    if(!root || activeTab!=="experience")return;
    const fb=root.querySelector("[data-ex-feedback]");if(fb)fb.textContent=exFeedbackText();
    root.querySelectorAll("[data-ex]").forEach(b=>{const a=b.dataset.ex,v=b.dataset.exValue;let on=a==="planet"&&v===EX.planet||a==="layer"&&+v===EX.earthDepth||a==="dino"&&v===EX.dino||a==="food"&&v===EX.food||a==="light"&&v===EX.light;b.setAttribute("aria-pressed",String(on));b.classList.toggle("is-on",on)})
  }
  function exTick(now){
    EX.raf=0;
    if(!root || !root.isConnected || activeTab!=="experience" || document.hidden)return;
    const can=root.querySelector(".gx-ex-canvas"),ctx=can?.getContext?.("2d");if(!ctx)return;
    const dt=EX.last?Math.min((now-EX.last)/1000,.07):0;EX.last=now;
    if(EX.running){EX.phase+=dt*(EX_KIND==="space"?(EX.speed/45):1);
      if(EX_KIND==="earth" && EX.earthDepth<100){EX.earthDepth=Math.min(100,EX.earthDepth+dt*12);const s=root.querySelector('[data-ex-range="depth"]');if(s)s.value=String(Math.round(EX.earthDepth));if(Math.floor(EX.earthDepth)%6===0)exUpdateFeedback();}
      if(EX_KIND==="dinosaur" && EX.walk>0 && EX.walk<95){EX.walk=Math.min(95,EX.walk+dt*27);if(EX.walk>=95){const ok=EX.dino==="longneck"?EX.food==="leaves":EX.food==="meat";EX.result=ok?{vi:"Đúng rồi! Khủng long cổ dài ăn cây, còn khủng long bạo chúa ăn thịt.",en:"Great! Long-necked dinosaurs ate plants, while T. rex ate meat."}:{vi:"Thử lại nhé! Khủng long cổ dài ăn thực vật; khủng long bạo chúa ăn thịt.",en:"Try again! Long-necked dinosaurs ate plants; T. rex ate meat."};exUpdateFeedback();}}
      if(EX_KIND==="insect"&&EX.beeTarget>=0){const xx=[190,448,695][EX.beeTarget];EX.beeX+=(xx-EX.beeX)*Math.min(1,dt*2.8);if(Math.abs(xx-EX.beeX)<3){EX.beeX=xx;const f=EX.beeTarget;EX.beeTarget=-1;if(!EX.visited.includes(f))EX.visited.push(f);if(EX.pollenFrom<0)EX.pollenFrom=f;else if(EX.pollenFrom!==f)EX.pollinated=true;exUpdateFeedback();}}
      if(EX_KIND==="vehicle"){const target=EX.carX>330?825:EX.light==="green"?825:EX.light==="yellow"?282:292;if(EX.carX<target){const rate=EX.light==="green"||EX.carX>330?105+EX.speed*1.6:EX.light==="yellow"?45:65;EX.carX=Math.min(target,EX.carX+dt*rate);}if(EX.carX>=825){EX.carX=75;EX.light="red";exUpdateFeedback();}}
    }
    ctx.clearRect(0,0,880,440);
    if(EX_KIND==="space")exDrawSpace(ctx,EX.phase);
    else if(EX_KIND==="earth")exDrawEarth(ctx,EX.phase);
    else if(EX_KIND==="dinosaur")exDrawDinosaur(ctx,EX.phase);
    else if(EX_KIND==="insect")exDrawInsect(ctx,EX.phase);
    else exDrawVehicle(ctx,EX.phase);
    if(EX_KIND==="earth"&&EX.running&&EX.earthDepth>=100){EX.running=false;exUpdateFeedback();}
    if(root.isConnected && !document.hidden && activeTab==="experience")EX.raf=requestAnimationFrame(exTick);
  }
  function startExperience(){stopExperience();EX.last=0;EX.raf=requestAnimationFrame(exTick);exUpdateFeedback();}
  function stopExperience(){if(EX.raf)cancelAnimationFrame(EX.raf);EX.raf=0;EX.last=0;}
  function exHandleClick(a,v){
    stopSpeak(false);
    if(a==="planet"){EX.planet=v;EX.result="";}
    if(a==="toggle"){EX.running=!EX.running;EX.result="";}
    if(a==="layer"){EX.earthDepth=+v;EX.running=false;EX.result="";const s=root.querySelector('[data-ex-range="depth"]');if(s)s.value=v;}
    if(a==="dino"||a==="food"){EX[a]=v;EX.walk=0;EX.result="";}
    if(a==="try"){EX.walk=1;EX.running=true;EX.result={vi:"Bạn khủng long đang đi tới bữa ăn…",en:"The dinosaur is walking to its meal…"};}
    if(a==="flower"){EX.beeTarget=+v;EX.running=true;EX.result="";}
    if(a==="light"){EX.light=v;EX.result="";EX.running=true;}
    if(a==="reset"){exReset();startExperience();}
    if(a==="listen")speak("experience",exFeedbackText(),true);
    exUpdateFeedback();
  }


  function renderStage({ readQuestion = false } = {}) {
    if (!root) return;
    stopExperience();
    stopSpeak(false);
    const stage = root.querySelector(".gx-stage");
    if (activeTab === "system" && isMoon(selectedId)) selectedId = DATA.overview.id;
    if (activeTab === "planets" && !isPlanet(selectedId)) selectedId = "earth";
    if (activeTab === "moons" && !isMoon(selectedId)) selectedId = DATA.secondary[0].id;
    if (activeTab !== "quiz") markFound(selectedId, true);
    let html = "";
    if (activeTab === "system") html = systemHtml();
    else if (activeTab === "planets") html = gridHtml(DATA.primary);
    else if (activeTab === "moons") html = moonsHtml();
    else if (activeTab === "experience") html = experienceHtml();
    else html = quizHtml();
    stage.innerHTML = `<section class="gx-panel" style="height:100%">${html}</section>`;
    updateSpeakButtons();
    if (activeTab === "experience") startExperience();
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
    if (n === total) toast("🏆 Con đã du hành khắp Hệ Mặt Trời rồi! Giỏi quá!");
    else toast(`🚀 Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { system: "Hệ Mặt Trời", planets: "Các hành tinh", moons: "Các vệ tinh", quiz: "Hỏi đáp" , experience: "Trải nghiệm để hiểu"};
  function setBanner() {
    const fn0 = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    const fn = typeof fn0 === "function" ? (o) => fn0({ ...o, items: ((o && o.items) || []).map((it) => ({ ...it, title: trText(it.title) })) }) : fn0;
    if (typeof fn !== "function") return;
    fn({ items: [{ level: 2, title: `${CONFIG.gameNumber}. ${CONFIG.title}`, action: null }, { level: 3, title: (activeTab === "experience" ? exT("Trải nghiệm để hiểu", "Learn by doing") : TAB_LABELS[activeTab]), action: null }] });
  }

  function switchTab(tab, opts) {
    stopExperience();
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
      const expButton = t.closest("[data-ex]");
      if (expButton) { exHandleClick(expButton.dataset.ex, expButton.dataset.exValue || ""); return; }
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

    root.addEventListener("input", (event) => {
      const r = event.target.closest("[data-ex-range]");
      if (!r || activeTab !== "experience") return;
      if (r.dataset.exRange === "speed") EX.speed = +r.value;
      if (r.dataset.exRange === "depth") { EX.earthDepth = +r.value; EX.running = false; EX.result = ""; }
      exUpdateFeedback();
    }, { signal });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { stopExperience(); stopSpeak(); }
      else if (root && root.isConnected && activeTab === "experience") startExperience();
    }, { signal });
  }

  function render(context) {
    activeContext = context;
    injectAssets();
    exReset();
    activeTab = "system";
    selectedId = DATA.overview.id;
    quiz = null;
    found = loadFound();
    root = document.createElement("section");
    root.id = CONFIG.rootId;
    root.innerHTML = `
      <header class="gx-head">
        <div class="gx-logo" aria-hidden="true">${skySvg("saturn")}</div>
        <div><h2>${CONFIG.title}</h2><p>${CONFIG.subtitle}</p></div>
        ${langHtml()}<div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="system" type="button" aria-selected="true">☀️ Hệ Mặt Trời</button>
        <button class="gx-tab" role="tab" data-tab="planets" type="button" aria-selected="false" tabindex="-1">🪐 Hành tinh</button>
        <button class="gx-tab" role="tab" data-tab="moons" type="button" aria-selected="false" tabindex="-1">🌙 Vệ tinh</button>
        <button class="gx-tab" role="tab" data-tab="quiz" type="button" aria-selected="false" tabindex="-1">⭐ Hỏi đáp</button>
              <button class="gx-tab" role="tab" data-tab="experience" type="button" aria-selected="false" tabindex="-1">🎮 ${exT("Trải nghiệm", "Experience")}</button>
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
    stopExperience();
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
