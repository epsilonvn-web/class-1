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


  function renderStage({ readQuestion = false } = {}) {
    if (!root) return;
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
    if (n === total) toast("🏆 Con đã du hành khắp Hệ Mặt Trời rồi! Giỏi quá!");
    else toast(`🚀 Đã ghi ${byId(id).name} vào sổ khám phá (${n}/${total})`);
  }

  const TAB_LABELS = { system: "Hệ Mặt Trời", planets: "Các hành tinh", moons: "Các vệ tinh", quiz: "Hỏi đáp" };
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
        <div class="gx-album">${albumHtml()}</div>
      </header>
      <nav class="gx-tabs" role="tablist" aria-label="Các khu vực khám phá">
        <button class="gx-tab" role="tab" data-tab="system" type="button" aria-selected="true">☀️ Hệ Mặt Trời</button>
        <button class="gx-tab" role="tab" data-tab="planets" type="button" aria-selected="false" tabindex="-1">🪐 Hành tinh</button>
        <button class="gx-tab" role="tab" data-tab="moons" type="button" aria-selected="false" tabindex="-1">🌙 Vệ tinh</button>
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
