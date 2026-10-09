(() => {
  "use strict";

  const CLASS1_DATA = window.CLASS1_DATA;
  if (!CLASS1_DATA) throw new Error("CLASS1_DATA_MISSING");

  const {
    API_URL,
    TOKEN_STORAGE_KEY,
    API_TIMEOUT_MS,
    INSTALL_FLAG_KEY,
    HOME_TABS,
    ADMIN_HOME_TAB,
    SUBJECTS,
    SUBJECT_TABS,
    AVATARS,
    GREETINGS,
    PREVIEW_TONES,
    EE_CLASS_SITES
  } = CLASS1_DATA;

  // AI Lab là module giá trị gia tăng dùng chung, đặt ngay bên phải Tools.
  const AI_LAB_HOME_TAB = Object.freeze({ id: "aiLab", icon: "🤖", label: "AI Lab", tone: "blue", badge: "AI" });
  const HOME_TABS_WITH_AI = Object.freeze((() => {
    if (HOME_TABS.some((tab) => tab.id === AI_LAB_HOME_TAB.id)) return [...HOME_TABS];
    const tabs = [...HOME_TABS];
    const toolsIndex = tabs.findIndex((tab) => tab.id === "tools");
    const contactIndex = tabs.findIndex((tab) => tab.id === "contact");
    const insertAt = toolsIndex >= 0 ? toolsIndex + 1 : (contactIndex >= 0 ? contactIndex : tabs.length);
    tabs.splice(insertAt, 0, AI_LAB_HOME_TAB);
    return tabs;
  })());


  // Module học theo môn: chỉ nạp khi người dùng thực sự mở môn đó.
  const SUBJECT_MODULE_SCRIPTS = Object.freeze({
    math: "assets/js/math/toan_app.js?v=class1-math-2",
    vietnamese: "assets/js/vietnamese/tv_app.js?v=class1-tv-1",
    english: "assets/js/english/ta_app.js?v=class1-ta-1"
  });
  // Games/Tools/AI Lab ngoài Trang chủ: mỗi module con là một file JS độc lập và chỉ tải khi mở.
  const TOOL_CATALOG = Object.freeze([
    Object.freeze({ id: "calculator", icon: "🧮", title: "Calculator", description: "Máy tính khoa học Epsilon Edu.", badge: "Công cụ", tone: "purple" }),
    Object.freeze({ id: "converter", icon: "📐", title: "Đổi đơn vị đo", description: "Đổi nhanh các đơn vị đo thông dụng.", badge: "Công cụ", tone: "teal" }),
    Object.freeze({ id: "geometryArea", icon: "📏", title: "Tính diện tích", description: "Tính diện tích các hình học cơ bản.", badge: "Công cụ", tone: "pink" }),
    Object.freeze({ id: "colorMixer", icon: "🎨", title: "Phối màu", description: "Phối màu theo hệ RGB và CMYK.", badge: "Công cụ", tone: "amber" }),
    Object.freeze({ id: "calendarRoman", icon: "📅", title: "Lịch, khoảng ngày và số La Mã", description: "Xem lịch, tính khoảng ngày và đổi số La Mã.", badge: "Công cụ", tone: "blue" }),
    Object.freeze({ id: "mathTables", icon: "🔢", title: "Bảng cộng trừ nhân chia", description: "Xem bảng tính và luyện tập phép tính.", badge: "Công cụ", tone: "teal" }),
    Object.freeze({ id: "learningClock", icon: "🕐", title: "Đồng hồ học xem giờ", description: "Học đọc giờ, quay kim và luyện tập.", badge: "Công cụ", tone: "purple" }),
    Object.freeze({ id: "solarSystem", icon: "🪐", title: "Hệ Mặt Trời", description: "Khám phá Hệ Mặt Trời, ngày - đêm và các mùa bằng mô phỏng tương tác.", badge: "Khoa học", tone: "blue" }),
    Object.freeze({ id: "moon", icon: "🌙", title: "Mặt Trăng", description: "Khám phá các pha Mặt Trăng, nhật thực, nguyệt thực và thủy triều bằng mô phỏng tương tác.", badge: "Khoa học", tone: "blue" }),
    Object.freeze({ id: "waterCycle", icon: "💧", title: "Vòng tuần hoàn của nước", description: "Khám phá vòng tuần hoàn, ba thể của nước và cách làm sạch nước bằng mô phỏng tương tác.", badge: "Khoa học", tone: "teal" }),
    Object.freeze({ id: "lifeCycle", icon: "🦋", title: "Vòng đời sinh vật", description: "Khám phá vòng đời bướm, ếch và quá trình cây đậu lớn lên bằng mô phỏng tương tác.", badge: "Khoa học", tone: "green" }),
    Object.freeze({ id: "humanBody", icon: "🫀", title: "Cơ thể em", description: "Khám phá hệ tiêu hóa, hô hấp, tim và mạch máu bằng mô phỏng tương tác.", badge: "Khoa học", tone: "pink" }),
    Object.freeze({ id: "nutrition", icon: "🥗", title: "Ăn uống lành mạnh", description: "Bày đĩa ăn cân bằng, tìm hiểu tháp dinh dưỡng và lượng đường trong đồ uống.", badge: "Dinh dưỡng", tone: "green" }),
    Object.freeze({ id: "fiveSenses", icon: "👀", title: "5 giác quan", description: "Khám phá mắt, tai, mũi, lưỡi và da qua các hoạt động quan sát, nghe, ngửi, nếm và chạm.", badge: "Cơ thể", tone: "indigo" }),
    Object.freeze({ id: "natureAround", icon: "🌿", title: "Thiên nhiên quanh em", description: "Khám phá chuỗi thức ăn, bóng nắng trong ngày và cách cầu vồng hình thành bằng mô phỏng tương tác.", badge: "Khoa học", tone: "green" }),
    Object.freeze({ id: "earthMotion", icon: "🌍", title: "Trái Đất chuyển động", description: "Khám phá múi giờ, Trái Đất quay và gió mùa Việt Nam bằng mô phỏng tương tác.", badge: "Thiên văn", tone: "blue" }),
    Object.freeze({ id: "earthChanges", icon: "🌋", title: "Trái Đất biến đổi", description: "Khám phá núi lửa, động đất, các mảng kiến tạo và sự bồi tụ đồng bằng bằng mô phỏng tương tác.", badge: "Thiên nhiên", tone: "coral" }),
    Object.freeze({ id: "vnHistory", icon: "📜", title: "Lịch sử Việt Nam", description: "Dòng thời gian, trận Bạch Đằng và trống đồng.", badge: "Lịch sử", tone: "amber" }),
    Object.freeze({ id: "vietnamMap", icon: "🗺️", title: "Bản đồ Việt Nam", description: "Khám phá tỉnh thành, vùng miền và luyện tập trực tiếp trên bản đồ Việt Nam.", badge: "Địa lý", tone: "green" }),
    Object.freeze({ id: "inventions", icon: "💡", title: "Những phát minh", description: "Thử bánh xe, giấy, la bàn, bóng đèn và điện thoại.", badge: "Công nghệ", tone: "indigo" }),
    Object.freeze({ id: "bunnyCoding", icon: "🐰", title: "Lập trình cùng Thỏ Hồng", description: "Xếp khối lệnh đưa Thỏ Hồng tới cà rốt và làm quen tư duy lập trình.", badge: "Lập trình", tone: "purple" }),
    Object.freeze({ id: "circuitLab", icon: "💡", title: "Mạch điện vui", description: "Lắp mạch điện, bật sáng bóng đèn và khám phá vật dẫn điện - cách điện.", badge: "Khoa học", tone: "amber" }),
    Object.freeze({ id: "homeSafety", icon: "🏠", title: "An toàn ở nhà", description: "Tìm mối nguy trong nhà, học sơ cứu và cách thoát hiểm khi có cháy.", badge: "Kỹ năng", tone: "rose" }),
    Object.freeze({ id: "trafficSafety", icon: "🚦", title: "An toàn giao thông", description: "Khám phá biển báo, đèn tín hiệu và luyện cách tham gia giao thông an toàn.", badge: "Kỹ năng", tone: "green" }),
    Object.freeze({ id: "virtualPiano", icon: "🎹", title: "Đàn ảo - Bé học nốt nhạc", description: "Chơi đàn, học nốt nhạc, luyện nghe và gõ nhịp bằng tương tác trực tiếp.", badge: "Âm nhạc", tone: "pink" }),
    Object.freeze({ id: "vnInstruments", icon: "🎶", title: "Nhạc cụ dân tộc", description: "Chơi thử đàn bầu, đàn tranh, sáo trúc, đàn t’rưng và trống.", badge: "Âm nhạc", tone: "pink" }),
    Object.freeze({ id: "typingTenFingers", icon: "⌨️", title: "Luyện gõ 10 ngón", description: "Luyện đặt đúng ngón tay, tăng độ chính xác và tốc độ gõ bàn phím.", badge: "Tin học", tone: "blue" }),
    Object.freeze({ id: "lineDiagram", icon: "📏", title: "Sơ đồ đoạn thẳng", description: "Vẽ sơ đồ và giải từng bước các dạng toán có lời văn.", badge: "Toán học", tone: "teal" })
  ]);
  // Các thư mục chỉ phục vụ điều hướng Tools, không thay đổi vị trí file JS.
  // Mỗi công cụ thuộc đúng một nhóm; có thể bổ sung tới tối đa 12 nhóm khi cần.
  const TOOL_GROUPS = Object.freeze([
    Object.freeze({ id: "math", icon: "🧮", title: "Toán", tone: "purple", ids: Object.freeze(["calculator", "converter", "geometryArea", "mathTables", "learningClock", "calendarRoman", "lineDiagram"]) }),
    Object.freeze({ id: "earthSpace", icon: "🌍", title: "Trái Đất và thiên văn", tone: "blue", ids: Object.freeze(["solarSystem", "moon", "earthMotion", "earthChanges"]) }),
    Object.freeze({ id: "naturalScience", icon: "🔬", title: "Khoa học tự nhiên", tone: "teal", ids: Object.freeze(["waterCycle", "lifeCycle", "natureAround", "circuitLab"]) }),
    Object.freeze({ id: "socialScience", icon: "🏛️", title: "Khoa học xã hội", tone: "green", ids: Object.freeze(["vietnamMap", "vnHistory"]) }),
    Object.freeze({ id: "technology", icon: "💻", title: "Tin học và công nghệ", tone: "blue", ids: Object.freeze(["bunnyCoding", "typingTenFingers", "inventions"]) }),
    Object.freeze({ id: "arts", icon: "🎨", title: "Nghệ thuật", tone: "pink", ids: Object.freeze(["colorMixer", "virtualPiano", "vnInstruments"]) }),
    Object.freeze({ id: "lifeSkills", icon: "🚦", title: "Kỹ năng sống", tone: "amber", ids: Object.freeze(["trafficSafety", "homeSafety"]) }),
    Object.freeze({ id: "bodyNutrition", icon: "🫀", title: "Cơ thể và dinh dưỡng", tone: "pink", ids: Object.freeze(["humanBody", "fiveSenses", "nutrition"]) })
  ]);

  // 10 tông pastel cố định cho Tools: không trùng màu các card sát nhau.
  // Palette áp dụng trên giao diện, không thay dữ liệu và JS từng công cụ.
  const TOOL_CARD_TONES = Object.freeze(["purple", "teal", "coral", "green", "amber", "blue", "rose", "indigo", "lime", "pink"]);

  function toolCardTone(index, offset = 0) {
    return TOOL_CARD_TONES[(index + offset) % TOOL_CARD_TONES.length];
  }

  function ensureToolsCardPaletteStyles() {
    if (document.getElementById("class1-tools-card-palette")) return;
    const style = document.createElement("style");
    style.id = "class1-tools-card-palette";
    // Bốn tông mới bổ sung vào sáu tông có sẵn của chương trình.
    style.textContent = `
      .card-grid.home-feature-grid .content-card.home-feature-card[data-tone="coral"]{
        background:linear-gradient(145deg,#fffcf9,#fff1e9);border-color:#fdba98;color:#9a3412;
      }
      .card-grid.home-feature-grid .content-card.home-feature-card[data-tone="rose"]{
        background:linear-gradient(145deg,#fffafc,#ffe9ef);border-color:#fda4af;color:#9f1239;
      }
      .card-grid.home-feature-grid .content-card.home-feature-card[data-tone="indigo"]{
        background:linear-gradient(145deg,#fdfdff,#eef2ff);border-color:#c7d2fe;color:#3730a3;
      }
      .card-grid.home-feature-grid .content-card.home-feature-card[data-tone="lime"]{
        background:linear-gradient(145deg,#fdfff9,#f1f9db);border-color:#bef264;color:#3f6212;
      }
    `;
    document.head.appendChild(style);
  }

  const AI_LAB_CATALOG = Object.freeze([
    Object.freeze({ id: "aiSafety", icon: "🛡️", title: "AI là gì? Dùng AI an toàn", description: "Tìm hiểu AI ở quanh ta và luyện các nguyên tắc sử dụng AI an toàn, có trách nhiệm.", tone: "blue" }),
    Object.freeze({ id: "teachAI", icon: "🤖", title: "Bé dạy AI nhận hình", description: "Tự tạo dữ liệu mẫu, huấn luyện và thử xem AI nhận ra hình mới như thế nào.", badge: "AI", tone: "blue" }),
    Object.freeze({ id: "aiBias", icon: "⚖️", title: "AI có thiên vị không?", description: "Thay đổi dữ liệu huấn luyện và quan sát cách dữ liệu lệch có thể làm mô hình đưa ra kết quả lệch.", badge: "AI", tone: "pink" }),
    Object.freeze({ id: "aiClustering", icon: "🍬", title: "Máy tự chia nhóm", description: "Rắc kẹo lên bàn và quan sát máy tự gom những viên giống nhau thành nhóm mà không cần ai dạy trước.", badge: "AI", tone: "purple" }),
    Object.freeze({ id: "aiPrediction", icon: "🔮", title: "Máy dự đoán", description: "Cho máy xem dữ liệu, tìm quy luật và thử dự đoán điều chưa xảy ra từ những gì đã quan sát.", badge: "AI", tone: "blue" }),
    Object.freeze({ id: "aiBunnyLearns", icon: "🐰", title: "Thỏ Hồng tự học tìm đường", description: "Quan sát Thỏ Hồng học bằng thử và sai, ghi nhớ phần thưởng và tự tìm đường tốt hơn.", badge: "AI", tone: "purple" }),
    Object.freeze({ id: "aiNeuralMini", icon: "🧠", title: "Mạng nơ-ron mini", description: "Quan sát tín hiệu đi qua mạng nhỏ, thay đổi đầu vào và dạy mạng bằng từng ví dụ tương tác.", badge: "AI", tone: "amber" }),
    Object.freeze({ id: "aiPixelVision", icon: "👁️", title: "AI nhìn bằng pixel", description: "Vẽ trên lưới pixel, thêm nhiễu và xem mô hình nhận dạng mẫu từ dữ liệu hình ảnh đơn giản.", badge: "AI", tone: "teal" }),
    Object.freeze({ id: "aiSound", icon: "🎧", title: "AI nghe âm thanh", description: "Nghe âm tổng hợp, xem dạng sóng và khám phá cách đặc trưng âm thanh giúp máy phân loại tín hiệu.", badge: "AI", tone: "green" }),
    Object.freeze({ id: "aiKindWords", icon: "💬", title: "Dạy AI hiểu lời nói tử tế", description: "Dạy máy phân biệt lời nói tử tế và lời nói làm bạn buồn từ các ví dụ.", badge: "AI", tone: "green" }),
    Object.freeze({ id: "aiRecommender", icon: "🎯", title: "AI gợi ý cho bạn", description: "Chấm điểm sở thích rồi xem hệ gợi ý tìm nội dung phù hợp từ các tín hiệu bạn cung cấp.", badge: "AI", tone: "purple" }),
    Object.freeze({ id: "aiPathfinding", icon: "🗺️", title: "AI chỉ đường", description: "Vẽ khu phố rồi so sánh cách máy tìm mò và tìm thông minh để chọn đường đi ngắn nhất.", badge: "AI", tone: "green" }),
    Object.freeze({ id: "aiTicTacToe", icon: "⭕", title: "Cờ caro với AI", description: "Đấu cờ caro 3×3 và quan sát cách AI tính trước các nước đi để ra quyết định.", badge: "AI", tone: "teal" }),
    Object.freeze({ id: "aiAnimalGuess", icon: "🐾", title: "Máy đoán con vật", description: "Nghĩ về một con vật, trả lời câu hỏi và dạy máy thêm kiến thức khi máy đoán sai.", badge: "AI", tone: "amber" }),
    Object.freeze({ id: "aiMusicComposer", icon: "🎵", title: "AI sáng tác nhạc", description: "Cho máy học các giai điệu rồi quan sát cách AI tự tạo một bản nhạc mới.", badge: "AI", tone: "pink" }),
    Object.freeze({ id: "aiAnomaly", icon: "🔍", title: "AI tìm điều bất thường", description: "Quan sát dữ liệu cảm biến và thử cách mô hình khoanh vùng những điểm khác xa phần lớn dữ liệu.", badge: "AI", tone: "blue" }),
    Object.freeze({ id: "aiRealOrMachine", icon: "🕵️", title: "Thật hay do máy tạo?", description: "Làm thám tử phân biệt nội dung do người viết và do máy tạo, rồi học cách kiểm tra thông tin.", badge: "AI", tone: "amber" }),
    // Giấy chứng nhận AI luôn là mục cuối. Khi thêm lab mới, đặt trước mục này.
    Object.freeze({ id: "aiCertificate", icon: "🏅", title: "Giấy chứng nhận AI", description: "Hoàn thành hoạt động, vượt thử thách và tạo giấy chứng nhận Nhà khoa học AI nhí.", tone: "purple" })
  ]);

  const AI_LAB_GROUPS = Object.freeze([
    Object.freeze({ id: "intro", icon: "🚪", title: "Nhập môn", tone: "blue", ids: Object.freeze(["aiSafety", "teachAI"]) }),
    Object.freeze({ id: "learning", icon: "🧠", title: "Máy học thế nào", tone: "purple", ids: Object.freeze(["aiBias", "aiClustering", "aiPrediction", "aiBunnyLearns", "aiNeuralMini"]) }),
    Object.freeze({ id: "perception", icon: "👁️", title: "Máy nhìn, nghe, hiểu", tone: "teal", ids: Object.freeze(["aiPixelVision", "aiSound", "aiKindWords"]) }),
    Object.freeze({ id: "aroundUs", icon: "🎮", title: "AI quanh ta", tone: "green", ids: Object.freeze(["aiRecommender", "aiPathfinding", "aiTicTacToe", "aiAnimalGuess", "aiMusicComposer", "aiAnomaly"]) }),
    Object.freeze({ id: "responsibility", icon: "🛡️", title: "AI và trách nhiệm", tone: "amber", ids: Object.freeze(["aiRealOrMachine", "aiCertificate"]) })
  ]);

  const WORLD_EXPLORER_GROUP_ID = "worldExplorer";
  const WORLD_EXPLORER_ITEMS = Object.freeze([
    Object.freeze({ id: "spaceExplorer", icon: "🪐", title: "Khám phá vũ trụ", description: "Khám phá Hệ Mặt Trời, các hành tinh, vệ tinh và những điều kỳ thú ngoài không gian.", tone: "purple" }),
    Object.freeze({ id: "oceanExplorer", icon: "🌊", title: "Khám phá đại dương", description: "Khám phá các tầng biển, sinh vật đại dương và những bí mật dưới lòng nước.", tone: "blue" }),
    Object.freeze({ id: "earthExplorer", icon: "🌍", title: "Khám phá Trái Đất", description: "Khám phá cấu tạo Trái Đất, địa hình và những hiện tượng thiên nhiên quanh bé.", tone: "teal" }),
    Object.freeze({ id: "humanBodyExplorer", icon: "🫀", title: "Khám phá cơ thể người", description: "Khám phá các cơ quan, giác quan và cách cơ thể bé hoạt động mỗi ngày.", tone: "pink" }),
    Object.freeze({ id: "plantExplorer", icon: "🌿", title: "Khám phá thực vật", description: "Khám phá các bộ phận của cây, những loài cây quanh bé và cách thực vật sống, lớn lên.", tone: "green" }),
    Object.freeze({ id: "weatherExplorer", icon: "🌦️", title: "Khám phá thời tiết", description: "Khám phá nắng, mây, mưa, gió, cầu vồng và vòng tuần hoàn của nước.", tone: "blue" }),
    Object.freeze({ id: "dinosaurExplorer", icon: "🦕", title: "Khám phá khủng long", description: "Khám phá các loài khủng long, hóa thạch và thế giới cổ đại hàng triệu năm trước.", tone: "amber" }),
    Object.freeze({ id: "insectExplorer", icon: "🐞", title: "Khám phá côn trùng", description: "Khám phá cấu tạo, vòng đời và những loài côn trùng quen thuộc quanh bé.", tone: "green" }),
    Object.freeze({ id: "vehicleExplorer", icon: "🚗", title: "Khám phá phương tiện", description: "Khám phá phương tiện đường bộ, đường sắt, đường thủy, hàng không và cách di chuyển an toàn.", tone: "purple" })
  ]);

  const GAME_CATALOG = Object.freeze([
    Object.freeze({ id: "paperFolding", icon: "🛩️", title: "Xưởng Gấp Giấy", description: "Gấp từng bước cùng Cô Thỏ Hồng.", badge: "Thủ công", tone: "pink" }),
    Object.freeze({ id: "jigsawPuzzle", icon: "🧩", title: "Xưởng Xếp Hình", description: "Ghép tranh qua nhiều cấp độ.", badge: "Quan sát", tone: "purple" }),
    Object.freeze({ id: "worldExplorer", icon: "🧭", title: "Bé khám phá", description: "", badge: "Khám phá", tone: "teal" }),
    Object.freeze({ id: "rabbitDrawing", icon: "🖍️", title: "Cô Thỏ Hồng dạy vẽ", description: "Vẽ tranh đơn giản theo từng bước.", badge: "Mỹ thuật", tone: "teal" }),
    Object.freeze({ id: "animalWorld", icon: "🐾", title: "Thế giới động vật", description: "Khám phá thế giới động vật cùng Cô Thỏ Hồng.", badge: "Khám phá", tone: "amber" }),
    Object.freeze({ id: "mcHost", icon: "🎤", title: "Tập làm MC", description: "Tập dẫn chương trình cùng Cô Thỏ Hồng.", badge: "Kỹ năng", tone: "pink" }),
    Object.freeze({ id: "missingPiece", icon: "🔗", title: "Mảnh ghép còn thiếu", description: "Ghép các cặp liên tưởng qua nhiều cấp độ.", badge: "Tư duy", tone: "purple" }),
    Object.freeze({ id: "lifeCycle", icon: "🌱", title: "Vòng đời kỳ diệu", description: "Sắp xếp các giai đoạn vòng đời của sinh vật và thiên nhiên.", badge: "Khám phá", tone: "green" }),
    Object.freeze({ id: "spotDifference", icon: "🔍", title: "Tìm điểm khác nhau", description: "Quan sát hai bức tranh và tìm những điểm khác biệt qua nhiều màn.", badge: "Quan sát", tone: "amber" }),
    Object.freeze({ id: "tinyLab", icon: "🔬", title: "Phòng thí nghiệm tí hon", description: "Đoán trước kết quả, quan sát thí nghiệm và nghe Cô Thỏ giải thích.", badge: "Khoa học", tone: "blue" }),
    Object.freeze({ id: "littleEngineer", icon: "🛠️", title: "Kỹ sư nhí", description: "Lắp ráp, chạy thử và sửa thiết kế qua các thử thách.", badge: "Kỹ thuật", tone: "purple" }),
    Object.freeze({ id: "wasteSorting", icon: "♻️", title: "Phân loại rác", description: "Phân loại rác đúng thùng qua nhiều cấp độ.", badge: "Môi trường", tone: "green" })
  ]);
  const HOME_FEATURE_SCRIPTS = Object.freeze({
    aiLab: Object.freeze({
      teachAI: "assets/js/ai-lab/be-day-ai.js?v=class1-be-day-ai-2",
      aiKindWords: "assets/js/ai-lab/ai-loi-noi-tu-te.js?v=class1-ai-kind-words-1",
      aiMusicComposer: "assets/js/ai-lab/ai-sang-tac-nhac.js?v=class1-ai-music-1",
      aiBunnyLearns: "assets/js/ai-lab/tho-hong-tu-hoc.js?v=class1-ai-bunny-learns-1",
      aiAnimalGuess: "assets/js/ai-lab/may-doan-con-vat.js?v=class1-ai-animal-guess-1",
      aiTicTacToe: "assets/js/ai-lab/co-caro-ai.js?v=class1-ai-tic-tac-toe-1",
      aiClustering: "assets/js/ai-lab/may-tu-chia-nhom.js?v=class1-ai-clustering-1",
      aiPrediction: "assets/js/ai-lab/may-du-doan.js?v=class1-ai-prediction-1",
      aiPathfinding: "assets/js/ai-lab/ai-chi-duong.js?v=class1-ai-pathfinding-1",
      aiRealOrMachine: "assets/js/ai-lab/that-hay-may-tao.js?v=class1-ai-real-or-machine-1",
      aiBias: "assets/js/ai-lab/ai-thien-vi.js?v=class1-ai-bias-1",
      aiRecommender: "assets/js/ai-lab/ai-goi-y.js?v=class1-ai-recommender-1",
      aiAnomaly: "assets/js/ai-lab/ai-tim-bat-thuong.js?v=class1-ai-anomaly-2",
      aiPixelVision: "assets/js/ai-lab/ai-nhin-pixel.js?v=class1-ai-pixel-vision-1",
      aiSound: "assets/js/ai-lab/ai-nghe-am-thanh.js?v=class1-ai-sound-1",
      aiNeuralMini: "assets/js/ai-lab/mang-no-ron-mini.js?v=class1-ai-neural-mini-1",
      aiSafety: "assets/js/ai-lab/ai-an-toan.js?v=class1-ai-safety-1",
      aiCertificate: "assets/js/ai-lab/giay-chung-nhan-ai.js?v=class1-ai-certificate-2"
    }),
    tools: Object.freeze({
      calculator: "assets/js/tools/calculator.js?v=class1-calculator-2",
      converter: "assets/js/tools/converter.js?v=class1-converter-1",
      geometryArea: "assets/js/tools/geometry_area.js?v=class1-geometry-area-1",
      colorMixer: "assets/js/tools/color_mixer.js?v=class1-color-mixer-1",
      calendarRoman: "assets/js/tools/lich-la-ma.js?v=class1-lich-la-ma-1",
      mathTables: "assets/js/tools/bang-tinh.js?v=class1-bang-tinh-1",
      learningClock: "assets/js/tools/dong-ho.js?v=class1-dong-ho-1",
      solarSystem: "assets/js/tools/he-mat-troi.js?v=class1-he-mat-troi-1",
      moon: "assets/js/tools/mat-trang.js?v=class1-mat-trang-1",
      waterCycle: "assets/js/tools/vong-tuan-hoan-nuoc.js?v=class1-vong-tuan-hoan-nuoc-1",
      lifeCycle: "assets/js/tools/vong-doi-sinh-vat.js?v=class1-vong-doi-sinh-vat-1",
      humanBody: "assets/js/tools/co-the-em.js?v=class1-co-the-em-1",
      nutrition: "assets/js/tools/an-uong-lanh-manh.js?v=class1-an-uong-lanh-manh-1",
      fiveSenses: "assets/js/tools/nam-giac-quan.js?v=class1-nam-giac-quan-1",
      natureAround: "assets/js/tools/thien-nhien-quanh-em.js?v=class1-thien-nhien-quanh-em-1",
      earthMotion: "assets/js/tools/trai-dat-chuyen-dong.js?v=class1-trai-dat-chuyen-dong-1",
      earthChanges: "assets/js/tools/trai-dat-bien-doi.js?v=class1-trai-dat-bien-doi-1",
      vnHistory: "assets/js/tools/lich-su-viet-nam.js?v=class1-lich-su-viet-nam-1",
      vietnamMap: "assets/js/tools/ban-do-viet-nam.js?v=class1-ban-do-viet-nam-1",
      inventions: "assets/js/tools/phat-minh.js?v=class1-phat-minh-1",
      bunnyCoding: "assets/js/tools/lap-trinh-tho-hong.js?v=class1-lap-trinh-tho-hong-1",
      circuitLab: "assets/js/tools/mach-dien.js?v=class1-mach-dien-1",
      homeSafety: "assets/js/tools/an-toan-o-nha.js?v=class1-an-toan-o-nha-1",
      trafficSafety: "assets/js/tools/an-toan-giao-thong.js?v=class1-an-toan-giao-thong-1",
      virtualPiano: "assets/js/tools/dan-ao.js?v=class1-dan-ao-1",
      vnInstruments: "assets/js/tools/nhac-cu-dan-toc.js?v=class1-nhac-cu-dan-toc-1",
      typingTenFingers: "assets/js/tools/luyen-go-10-ngon.js?v=class1-luyen-go-10-ngon-1",
      lineDiagram: "assets/js/tools/so-do-doan-thang.js?v=class1-so-do-doan-thang-1"
    }),
    games: Object.freeze({
      paperFolding: "assets/js/games/paper_folding.js?v=class1-paper-folding-6",
      jigsawPuzzle: "assets/js/games/jigsaw_puzzle.js?v=class1-jigsaw-puzzle-2",
      rabbitDrawing: "assets/js/games/rabbit_drawing.js?v=class1-rabbit-drawing-2",
      animalWorld: "assets/js/games/animal_world.js?v=class1-animal-world-1",
      mcHost: "assets/js/games/mc_host.js?v=class1-mc-host-1",
      missingPiece: "assets/js/games/missing_piece.js?v=class1-missing-piece-1",
      spaceExplorer: "assets/js/games/explorer_space.js?v=class1-space-explorer-2",
      lifeCycle: "assets/js/games/life_cycle.js?v=class1-life-cycle-1",
      spotDifference: "assets/js/games/spot_difference.js?v=class1-spot-difference-1",
      tinyLab: "assets/js/games/tiny_lab.js?v=class1-tiny-lab-1",
      littleEngineer: "assets/js/games/little_engineer.js?v=class1-little-engineer-1",
      wasteSorting: "assets/js/games/waste_sorting.js?v=class1-waste-sorting-1",
      oceanExplorer: "assets/js/games/explorer_ocean.js?v=class1-ocean-explorer-2",
      earthExplorer: "assets/js/games/explorer_earth.js?v=class1-earth-explorer-2",
      humanBodyExplorer: "assets/js/games/explorer_human_body.js?v=class1-human-body-explorer-2",
      plantExplorer: "assets/js/games/explorer_plant.js?v=class1-plant-explorer-2",
      weatherExplorer: "assets/js/games/explorer_weather.js?v=class1-weather-explorer-2",
      dinosaurExplorer: "assets/js/games/explorer_dinosaur.js?v=class1-dinosaur-explorer-2",
      insectExplorer: "assets/js/games/explorer_insect.js?v=class1-insect-explorer-2",
      vehicleExplorer: "assets/js/games/explorer_vehicle.js?v=class1-vehicle-explorer-2"
    })
  });
  const subjectModuleLoads = new Map();
  const homeFeatureLoads = new Map();

  const state = {
    screen: "home",
    homeTab: "class1",
    aiLabGroupFilter: "all",
    contactTab: "intro",
    homeFeatureId: null,
    homeFeatureGroupId: null,
    homeFeatureBanner: null,
    subjectId: null,
    subjectTab: "discover",
    profileSubjectId: null,
    detail: null,
    installPrompt: window.__class1InstallPrompt || null,
    auth: {
      ready: false,
      token: null,
      user: null,
      access: emptyAccess(),
      requests: [],
      notices: []
    },
    profile: {
      subjectId: null,
      loading: false,
      data: null,
      failed: false
    },
    account: {
      view: "overview",
      visibleNotices: [],
      requestSubjectId: ""
    },
    admin: {
      loading: false,
      loaded: false,
      overview: null,
      requests: [],
      users: [],
      tab: "requests",
      pendingCount: 0,
      badgeLoading: false,
      badgeUpdatedAt: 0,
      userQuery: "",
      userFilter: "all",
      userSort: "id-asc",
      accessQuery: ""
    }
  };

  const adminRequestBusy = new Map();

  const el = {
    nav: document.getElementById("primary-nav"),
    homeButton: document.getElementById("home-button"),
    content: document.getElementById("content-stage"),
    mainBanner: document.getElementById("main-banner"),
    subBanner: document.getElementById("sub-banner"),
    subPill: document.getElementById("sub-pill"),
    homeVipNotice: document.getElementById("home-vip-notice"),
    scoreBox: document.getElementById("score-box"),
    installButton: document.getElementById("install-button"),
    accountButton: document.getElementById("account-button"),
    authModal: document.getElementById("auth-modal"),
    authClose: document.getElementById("auth-close"),
    authLater: document.getElementById("auth-later"),
    authTabs: document.getElementById("auth-tabs"),
    authTabLogin: document.getElementById("auth-tab-login"),
    authTabRegister: document.getElementById("auth-tab-register"),
    loginForm: document.getElementById("login-form"),
    registerForm: document.getElementById("register-form"),
    loginSubmit: document.getElementById("login-submit"),
    registerSubmit: document.getElementById("register-submit"),
    dialog: document.getElementById("app-dialog"),
    dialogIcon: document.getElementById("dialog-icon"),
    dialogTitle: document.getElementById("dialog-title"),
    dialogMessage: document.getElementById("dialog-message"),
    dialogOk: document.getElementById("dialog-ok"),
    dialogSecondary: document.getElementById("dialog-secondary"),
    toast: document.getElementById("toast")
  };

  let dialogPrimaryHandler = null;
  let dialogSecondaryHandler = null;
  let dialogTertiaryHandler = null;
  let dialogTertiaryButton = null;
  let toastTimer = 0;

  const class1GreetingAudio = new Audio();
  class1GreetingAudio.referrerPolicy = "no-referrer";
  class1GreetingAudio.preload = "none";
  let pendingGreetingText = "";
  let greetingPlayNonce = 0;

  function greetingNameFromFullName(name) {
    const raw = String(name || "").replace(/\s+/g, " ").trim();
    if (!raw) return "bé";
    const parts = raw.split(" ").filter(Boolean);
    if (parts.length <= 1) return parts[0] || "bé";

    const previous = String(parts[parts.length - 2] || "").toLocaleLowerCase("vi-VN");
    if (previous === "thị" || previous === "văn") {
      return parts[parts.length - 1];
    }
    return parts.slice(-2).join(" ");
  }

  function randomGreeting(name) {
    const list = Array.isArray(GREETINGS) && GREETINGS.length
      ? GREETINGS
      : ["Chào {name}! Cô Thỏ Hồng rất vui được gặp bé. Mình cùng bắt đầu nhé!"];
    const template = String(list[Math.floor(Math.random() * list.length)] || list[0]);
    const displayName = greetingNameFromFullName(name);
    return template.replace(/\{name\}/g, displayName);
  }

  function stopWelcomeGreeting(clearPending = true) {
    greetingPlayNonce += 1;
    if (clearPending) pendingGreetingText = "";
    try {
      class1GreetingAudio.pause();
      class1GreetingAudio.currentTime = 0;
      class1GreetingAudio.removeAttribute("src");
      class1GreetingAudio.load();
    } catch (_) {}
  }

  function greetingTtsUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(text)}`;
  }

  async function playWelcomeGreetingText(text) {
    const cleanText = String(text || "").replace(/\s+/g, " ").trim();
    if (!cleanText) return false;
    const nonce = ++greetingPlayNonce;
    pendingGreetingText = cleanText;
    try {
      class1GreetingAudio.pause();
      class1GreetingAudio.currentTime = 0;
      class1GreetingAudio.src = greetingTtsUrl(cleanText);
      class1GreetingAudio.playbackRate = 0.96;
      await class1GreetingAudio.play();
      if (nonce !== greetingPlayNonce) return false;
      pendingGreetingText = "";
      return true;
    } catch (_) {
      // Trình duyệt có thể chặn tự phát khi vừa mở trang. Giữ câu chào
      // để phát ở tương tác hợp lệ đầu tiên thay vì hiện chữ lên màn hình.
      if (nonce === greetingPlayNonce) pendingGreetingText = cleanText;
      return false;
    }
  }

  function showWelcomeGreeting(name) {
    const text = randomGreeting(name);
    window.setTimeout(() => { void playWelcomeGreetingText(text); }, 180);
  }

  function retryPendingGreeting(event) {
    if (!pendingGreetingText) return;
    const target = event && event.target instanceof Element ? event.target : null;
    // Nếu bé đang mở/nhập form tài khoản thì chưa phát câu chào khách. Sau khi
    // đăng nhập thành công, câu chào mới sẽ dùng đúng tên bé.
    if (target && target.closest("#account-button, #auth-modal")) return;
    const text = pendingGreetingText;
    void playWelcomeGreetingText(text);
  }

  function emptyAccess() {
    const out = {};
    SUBJECTS.forEach((subject) => {
      out[subject.id] = { type: "regular", startAt: "", endAt: "" };
    });
    return out;
  }

  function currentSubject() {
    return SUBJECTS.find((item) => item.id === state.subjectId) || SUBJECTS[0];
  }

  function subjectByFrontId(subjectId) {
    return SUBJECTS.find((item) => item.id === subjectId) || null;
  }


  function homeFeatureRegistry(kind) {
    if (kind === "tools" || kind === "aiLab") return window.CLASS1_TOOL_MODULES || null;
    if (kind === "games") return window.CLASS1_GAME_MODULES || null;
    return null;
  }

  function loadedHomeFeatureModule(kind, featureId) {
    const registry = homeFeatureRegistry(kind);
    return registry && registry[featureId] ? registry[featureId] : null;
  }

  function homeFeatureScript(kind, featureId) {
    const group = HOME_FEATURE_SCRIPTS[kind];
    return group && group[featureId] ? group[featureId] : "";
  }

  function ensureHomeFeatureModule(kind, featureId) {
    const existing = loadedHomeFeatureModule(kind, featureId);
    if (existing) return Promise.resolve(existing);
    const src = homeFeatureScript(kind, featureId);
    if (!src) return Promise.resolve(null);
    const loadKey = `${kind}:${featureId}`;
    if (homeFeatureLoads.has(loadKey)) return homeFeatureLoads.get(loadKey);

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.homeFeature = loadKey;
      script.onload = () => {
        const module = loadedHomeFeatureModule(kind, featureId);
        if (!module) {
          homeFeatureLoads.delete(loadKey);
          reject(new Error(`HOME_FEATURE_MISSING:${loadKey}`));
          return;
        }
        resolve(module);
      };
      script.onerror = () => {
        homeFeatureLoads.delete(loadKey);
        reject(new Error(`HOME_FEATURE_LOAD_FAILED:${loadKey}`));
      };
      document.head.appendChild(script);
    });
    homeFeatureLoads.set(loadKey, promise);
    return promise;
  }

  function destroyActiveHomeFeature() {
    if (!state.homeFeatureId || !state.homeTab) return;
    const module = loadedHomeFeatureModule(state.homeTab, state.homeFeatureId);
    if (module && typeof module.destroy === "function") {
      try { module.destroy(); } catch (_) {}
    }
  }

  function ensureHomeFeatureBannerStyles() {
    if (document.getElementById("class1-home-feature-banner-style")) return;
    const style = document.createElement("style");
    style.id = "class1-home-feature-banner-style";
    style.textContent = `
      #sub-pill.home-sub-breadcrumbs{
        min-width:0!important;
        width:auto!important;
        max-width:calc(100% - 1rem)!important;
        min-height:0!important;
        padding:0!important;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        box-shadow:none!important;
        backdrop-filter:none!important;
        -webkit-backdrop-filter:none!important;
        display:flex!important;
        align-items:center!important;
        gap:.34rem!important;
        overflow-x:auto!important;
        overflow-y:hidden!important;
        scrollbar-width:none!important;
        white-space:nowrap!important;
      }
      #sub-pill.home-sub-breadcrumbs::-webkit-scrollbar{display:none!important}
      #sub-pill.home-sub-breadcrumbs .home-breadcrumb-sep{
        flex:0 0 auto;color:#c084fc;font-size:16px;font-weight:900;
      }
      #sub-pill.home-sub-breadcrumbs .home-breadcrumb-tab{
        flex:0 0 auto;height:38px;max-width:min(430px,42vw);padding:0 16px;border-radius:13px;
        display:inline-flex;align-items:center;justify-content:center;overflow:hidden;text-overflow:ellipsis;
        white-space:nowrap;font-size:16px;font-weight:900;line-height:1;box-shadow:0 2px 7px rgba(76,29,149,.08);
        cursor:default;font-family:inherit;
      }
      #sub-pill.home-sub-breadcrumbs button.home-breadcrumb-tab{
        cursor:pointer;transition:background .16s,border-color .16s,box-shadow .16s,transform .16s;
      }
      #sub-pill.home-sub-breadcrumbs button.home-breadcrumb-tab:hover{
        transform:translateY(-1px);box-shadow:0 4px 11px rgba(76,29,149,.13);
      }
      #sub-pill.home-sub-breadcrumbs .home-breadcrumb-level2{
        color:#be185d;border:1.5px solid #f9a8d4;background:rgba(255,255,255,.78);
      }
      #sub-pill.home-sub-breadcrumbs .home-breadcrumb-level3{
        color:#7e22ce;border:1.5px solid #d8b4fe;background:rgba(255,255,255,.72);
      }
      #sub-pill.home-sub-breadcrumbs .home-breadcrumb-level4{
        color:#b45309;border:1.5px solid #fde68a;background:rgba(255,255,255,.72);
      }
      @media(max-width:767px){
        #sub-pill.home-sub-breadcrumbs{max-width:calc(100% - .35rem)!important;gap:.22rem!important}
        #sub-pill.home-sub-breadcrumbs .home-breadcrumb-tab{height:32px;max-width:68vw;padding:0 11px;font-size:16px;border-radius:11px}
        #sub-pill.home-sub-breadcrumbs .home-breadcrumb-sep{font-size:16px}
      }
    `;
    document.head.appendChild(style);
  }

  function resetHomeFeatureBreadcrumbPill() {
    if (!el.subPill) return;
    el.subPill.classList.remove("home-sub-breadcrumbs");
    el.subPill.removeAttribute("aria-label");
    el.subPill.removeAttribute("title");
  }

  function activeToolGroup() {
    return TOOL_GROUPS.find((group) => group.id === state.homeFeatureGroupId) || null;
  }

  function backToToolGroup() {
    destroyActiveHomeFeature();
    state.homeFeatureId = null;
    state.homeFeatureBanner = null;
    render();
    focusContent();
  }

  function homeFeatureContext(kind, featureId) {
    const toolGroup = kind === "tools" ? activeToolGroup() : null;
    const isWorldExplorerChild = kind === "games"
      && state.homeFeatureGroupId === WORLD_EXPLORER_GROUP_ID
      && WORLD_EXPLORER_ITEMS.some((item) => item.id === featureId);

    const backToWorldExplorerGroup = () => {
      destroyActiveHomeFeature();
      state.homeFeatureId = null;
      state.homeFeatureBanner = {
        items: [{ level: 2, title: "3. Bé khám phá", action: null }]
      };
      render();
      focusContent();
    };

    const setSubBanner = (banner) => {
      if (state.screen !== "home" || state.homeTab !== kind || state.homeFeatureId !== featureId) return;
      const rawItems = banner && Array.isArray(banner.items) ? banner.items : [];
      let items = rawItems.map((item, index) => ({
        title: String(item && item.title || "").trim(),
        level: Math.min(4, Math.max(2, Number(item && item.level || (index + 2)) || 2)),
        action: item && typeof item.action === "function" ? item.action : null
      })).filter((item) => item.title);

      if (isWorldExplorerChild) {
        const child = WORLD_EXPLORER_ITEMS.find((item) => item.id === featureId) || null;
        const childIndex = child ? WORLD_EXPLORER_ITEMS.indexOf(child) : -1;
        const nestedItems = items.slice(1).map((item) => ({
          ...item,
          level: Math.min(4, Math.max(4, Number(item.level || 4)))
        }));
        items = [
          { level: 2, title: "3. Bé khám phá", action: backToWorldExplorerGroup },
          ...(child ? [{ level: 3, title: `3.${childIndex + 1} ${child.title}`, action: null }] : []),
          ...nestedItems
        ];
      } else if (toolGroup && toolGroup.ids.includes(featureId)) {
        const feature = TOOL_CATALOG.find((item) => item.id === featureId) || null;
        const groupIndex = TOOL_GROUPS.indexOf(toolGroup);
        const toolIndex = toolGroup.ids.indexOf(featureId);
        const nestedItems = items.slice(1).map((item) => ({ ...item, level: 4 }));
        items = [
          { level: 2, title: `${groupIndex + 1}. ${toolGroup.title}`, action: backToToolGroup },
          { level: 3, title: `${toolIndex + 1}. ${feature ? feature.title : "Công cụ"}`, action: null },
          ...nestedItems
        ];
      } else if (kind === "games" && items.length) {
        const currentFeature = GAME_CATALOG.find((item) => item.id === featureId) || null;
        if (currentFeature && items[0].level === 2) {
          const currentIndex = GAME_CATALOG.indexOf(currentFeature);
          items[0].title = `${currentIndex + 1}. ${currentFeature.title}`;
        }
      }

      if (!banner || (!items.length && !String(banner.title || "").trim())) {
        state.homeFeatureBanner = toolGroup ? defaultHomeFeatureBanner(kind, featureId) : null;
      } else {
        state.homeFeatureBanner = {
          icon: String(banner.icon || "").trim(),
          title: String(banner.title || "").trim(),
          items
        };
      }
      renderBanner();
    };

    return {
      host: el.content,
      kind,
      featureId,
      hooks: { showToast, showDialog, setSubBanner },
      back: () => {
        destroyActiveHomeFeature();
        state.homeFeatureId = null;
        state.homeFeatureBanner = isWorldExplorerChild
          ? { items: [{ level: 2, title: "3. Bé khám phá", action: null }] }
          : null;
        if (!isWorldExplorerChild && !toolGroup) state.homeFeatureGroupId = null;
        render();
        focusContent();
      }
    };
  }

  function defaultHomeFeatureBanner(kind, featureId) {
    const toolGroup = kind === "tools" ? activeToolGroup() : null;
    if (toolGroup && toolGroup.ids.includes(featureId)) {
      const feature = TOOL_CATALOG.find((item) => item.id === featureId);
      return {
        items: [
          { level: 2, title: `${TOOL_GROUPS.indexOf(toolGroup) + 1}. ${toolGroup.title}`, action: backToToolGroup },
          { level: 3, title: `${toolGroup.ids.indexOf(featureId) + 1}. ${feature ? feature.title : "Công cụ"}`, action: null }
        ]
      };
    }
    if (
      kind === "games"
      && state.homeFeatureGroupId === WORLD_EXPLORER_GROUP_ID
      && WORLD_EXPLORER_ITEMS.some((item) => item.id === featureId)
    ) {
      const child = WORLD_EXPLORER_ITEMS.find((item) => item.id === featureId);
      const childIndex = child ? WORLD_EXPLORER_ITEMS.indexOf(child) : -1;
      return {
        items: [
          {
            level: 2,
            title: "3. Bé khám phá",
            action: () => {
              destroyActiveHomeFeature();
              state.homeFeatureId = null;
              state.homeFeatureBanner = {
                items: [{ level: 2, title: "3. Bé khám phá", action: null }]
              };
              render();
              focusContent();
            }
          },
          { level: 3, title: child ? `3.${childIndex + 1} ${child.title}` : "Khám phá", action: null }
        ]
      };
    }

    const catalog = kind === "games" ? GAME_CATALOG : kind === "tools" ? TOOL_CATALOG : kind === "aiLab" ? AI_LAB_CATALOG : [];
    const feature = catalog.find((item) => item.id === featureId) || null;
    if (!feature) return null;
    const index = Math.max(0, catalog.indexOf(feature));
    return {
      items: [{ level: 2, title: `${index + 1}. ${feature.title}`, action: null }]
    };
  }

  function renderLoadedHomeFeature(module, kind, featureId) {
    if (!module || typeof module.render !== "function") return false;

    // Giống cơ chế shell Toán: ngay khi mở một Tool/Game, banner phụ phản ánh
    // đúng cấp nội dung hiện tại. Module con có thể ghi đè thêm level 3/4 khi đi sâu.
    if (state.screen === "home" && state.homeTab === kind && state.homeFeatureId === featureId) {
      const initialBanner = defaultHomeFeatureBanner(kind, featureId);
      if (initialBanner) {
        state.homeFeatureBanner = initialBanner;
        renderBanner();
      }
    }

    Promise.resolve(module.render(homeFeatureContext(kind, featureId))).catch((err) => {
      console.error("[Class1 home feature]", err);
      el.content.innerHTML = `<div class="empty-panel"><div><strong>Chưa mở được ${escapeHtml(featureId)}</strong>Vui lòng kiểm tra file module và thử lại.</div></div>`;
    });
    return true;
  }

  function renderHomeFeatureOrLoading(kind, featureId) {
    const src = homeFeatureScript(kind, featureId);
    if (!src) return false;
    const existing = loadedHomeFeatureModule(kind, featureId);
    if (existing) return renderLoadedHomeFeature(existing, kind, featureId);

    el.content.innerHTML = `<div class="empty-panel"><div><span class="inline-spinner" aria-hidden="true"></span><strong>Đang tải ${escapeHtml(featureId)}…</strong></div></div>`;
    ensureHomeFeatureModule(kind, featureId).then((module) => {
      if (state.screen === "home" && state.homeTab === kind && state.homeFeatureId === featureId) {
        renderLoadedHomeFeature(module, kind, featureId);
      }
    }).catch((err) => {
      if (state.screen !== "home" || state.homeTab !== kind || state.homeFeatureId !== featureId) return;
      console.error("[Class1 home feature loader]", err);
      el.content.innerHTML = `<div class="empty-panel"><div><strong>Chưa tải được ${escapeHtml(featureId)}</strong>Kiểm tra file ${escapeHtml(src)} và thử lại.</div></div>`;
    });
    return true;
  }

  function loadedSubjectModule(subjectId) {
    return window.CLASS1_SUBJECT_MODULES && window.CLASS1_SUBJECT_MODULES[subjectId]
      ? window.CLASS1_SUBJECT_MODULES[subjectId]
      : null;
  }

  function ensureSubjectModule(subjectId) {
    const existing = loadedSubjectModule(subjectId);
    if (existing) return Promise.resolve(existing);
    const src = SUBJECT_MODULE_SCRIPTS[subjectId];
    if (!src) return Promise.resolve(null);
    if (subjectModuleLoads.has(subjectId)) return subjectModuleLoads.get(subjectId);

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.subjectModule = subjectId;
      script.onload = () => {
        const module = loadedSubjectModule(subjectId);
        if (!module) {
          subjectModuleLoads.delete(subjectId);
          reject(new Error(`SUBJECT_MODULE_MISSING:${subjectId}`));
          return;
        }
        resolve(module);
      };
      script.onerror = () => {
        subjectModuleLoads.delete(subjectId);
        reject(new Error(`SUBJECT_MODULE_LOAD_FAILED:${subjectId}`));
      };
      document.head.appendChild(script);
    });
    subjectModuleLoads.set(subjectId, promise);
    return promise;
  }

  function destroySubjectModule(subjectId) {
    const module = loadedSubjectModule(subjectId);
    if (module && typeof module.destroy === "function") {
      try { module.destroy(); } catch (_) {}
    }
  }

  function setScoreBox(correct, wrong) {
    if (!el.scoreBox) return;
    const strong = el.scoreBox.querySelectorAll("strong");
    if (strong[0]) strong[0].textContent = String(Number(correct || 0));
    if (strong[1]) strong[1].textContent = String(Number(wrong || 0));
  }

  const PREMIUM_HELP_ZALO_URL_ = "https://zalo.me/0865749402";

  function ensurePremiumLearningGate_() {
    let modal = document.getElementById("class1-premium-learning-gate");
    if (modal) return modal;

    if (!document.getElementById("class1-premium-learning-gate-style")) {
      const style = document.createElement("style");
      style.id = "class1-premium-learning-gate-style";
      style.textContent = `
        #class1-premium-learning-gate{position:fixed;inset:0;z-index:240;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(15,23,42,.52);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
        #class1-premium-learning-gate.hidden{display:none!important}
        #class1-premium-learning-gate .premium-gate-card{width:min(94vw,640px);overflow:hidden;border:1px solid #f9a8d4;border-radius:26px;background:#fff;box-shadow:0 26px 78px rgba(76,29,149,.28)}
        #class1-premium-learning-gate .premium-gate-body{padding:24px 24px 18px;text-align:center;background:linear-gradient(145deg,#fff7fb,#faf5ff 55%,#effcf8)}
        #class1-premium-learning-gate .premium-gate-icon{width:64px;height:64px;margin:0 auto 12px;border-radius:20px;display:flex;align-items:center;justify-content:center;border:1px solid #f9a8d4;background:#fff;font-size:32px;box-shadow:0 6px 18px rgba(236,72,153,.12)}
        #class1-premium-learning-gate .premium-gate-title{margin:0;color:#7e22ce;font-size:21px;line-height:1.25;font-weight:950}
        #class1-premium-learning-gate .premium-gate-message{margin:10px auto 0;max-width:590px;color:#475467;font-size:16px;line-height:1.65;font-weight:850;white-space:pre-line}
        #class1-premium-learning-gate .premium-gate-actions{display:grid;grid-template-columns:1.2fr 1fr .8fr;gap:9px;padding:14px 16px 16px;border-top:1px solid #fce7f3;background:#fff}
        #class1-premium-learning-gate .premium-gate-btn{min-height:46px;border-radius:14px;padding:8px 12px;font-size:16px;line-height:1.25;font-weight:950;transition:transform .15s ease,box-shadow .15s ease,filter .15s ease}
        #class1-premium-learning-gate .premium-gate-btn:active{transform:translateY(1px)}
        #class1-premium-learning-gate .premium-gate-vip{border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 16px rgba(139,92,246,.2)}
        #class1-premium-learning-gate .premium-gate-contact{border:1px solid #67e8f9;color:#0369a1;background:linear-gradient(90deg,#eff6ff,#ecfdf5)}
        #class1-premium-learning-gate .premium-gate-later{border:1px solid #e2e8f0;color:#64748b;background:#f8fafc}
        @media(max-width:680px){#class1-premium-learning-gate .premium-gate-actions{grid-template-columns:1fr}#class1-premium-learning-gate .premium-gate-card{width:min(94vw,430px)}#class1-premium-learning-gate .premium-gate-message{max-width:100%}}
      `;
      document.head.appendChild(style);
    }

    modal = document.createElement("div");
    modal.id = "class1-premium-learning-gate";
    modal.className = "hidden";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "premium-gate-title");
    modal.innerHTML = `
      <div class="premium-gate-card">
        <div class="premium-gate-body">
          <div class="premium-gate-icon" aria-hidden="true">🐰</div>
          <h3 class="premium-gate-title" id="premium-gate-title">Quyền học VIP</h3>
          <p class="premium-gate-message" id="premium-gate-message"></p>
        </div>
        <div class="premium-gate-actions">
          <button class="premium-gate-btn premium-gate-vip" id="premium-gate-vip" type="button">Đăng ký quyền học VIP</button>
          <button class="premium-gate-btn premium-gate-contact" id="premium-gate-contact" type="button">Liên hệ Admin</button>
          <button class="premium-gate-btn premium-gate-later" id="premium-gate-later" type="button">Để sau nhé</button>
        </div>
      </div>`;
    modal.addEventListener("click", (event) => {
      if (event.target === modal) hidePremiumLearningGate_();
    });
    document.body.appendChild(modal);
    return modal;
  }

  function hidePremiumLearningGate_() {
    document.getElementById("class1-premium-learning-gate")?.classList.add("hidden");
  }

  function openPremiumAdminZalo_() {
    const popup = window.open(PREMIUM_HELP_ZALO_URL_, "_blank", "noopener,noreferrer");
    if (popup) popup.opener = null;
  }

  function configurePremiumLearningGate_(mode = "premium") {
    const modal = ensurePremiumLearningGate_();
    const title = modal.querySelector("#premium-gate-title");
    const message = modal.querySelector("#premium-gate-message");
    const vip = modal.querySelector("#premium-gate-vip");
    const contact = modal.querySelector("#premium-gate-contact");
    const later = modal.querySelector("#premium-gate-later");

    if (mode === "need-id") {
      title.textContent = "Bé cần có ID trước nhé";
      message.textContent = "Trước hết bé cần đăng kí ID để đăng ký quyền học VIP.\nSau khi có ID, bé có thể gửi yêu cầu quyền học ngay trong tài khoản.";
      vip.textContent = "Đăng ký ID";
      vip.onclick = () => { hidePremiumLearningGate_(); openAuth("register"); };
    } else {
      title.textContent = "Quyền học VIP";
      message.textContent = "Bé hãy đăng kí quyền học VIP để được trải nghiệm nội dung\u00A0này\nHãy liên hệ admin để được hỗ trợ";
      vip.textContent = "Đăng ký quyền học VIP";
      vip.onclick = () => {
        if (!state.auth.ready) {
          showToast("Đang kiểm tra phiên đăng nhập…");
          return;
        }
        if (!state.auth.user) {
          configurePremiumLearningGate_("need-id");
          return;
        }
        hidePremiumLearningGate_();
        openAccountPage("request");
      };
    }

    contact.onclick = () => openPremiumAdminZalo_();
    later.onclick = () => hidePremiumLearningGate_();
    modal.classList.remove("hidden");
    window.requestAnimationFrame(() => vip.focus());
    return false;
  }

  function showPremiumLearningGate(featureName = "nội dung này") {
    if (hasPremiumAccess(state.subjectId)) return true;
    return configurePremiumLearningGate_("premium");
  }

  function subjectModuleContext() {
    const user = state.auth.user ? Object.freeze({
      userId: String(state.auth.user.userId || ""),
      name: String(state.auth.user.name || ""),
      role: String(state.auth.user.role || "student") === "admin" ? "admin" : "student",
      avatarEmoji: String(state.auth.user.avatarEmoji || "🐰"),
      createdAt: state.auth.user.createdAt || ""
    }) : null;
    return {
      host: el.content,
      subject: currentSubject(),
      tabId: state.subjectTab,
      accessType: accessTypeFor(state.subjectId),
      user,
      isAuthenticated: !!(state.auth.token && user),
      apiRequest(action, payload = {}, options = {}) {
        return apiRequest(action, payload, options);
      },
      openAuth(mode = "login") {
        openAuth(mode === "register" ? "register" : "login");
      },
      openAccount(view = "overview") {
        return openAccountPage(view === "request" ? "request" : "overview");
      },
      requestPremiumAccess(featureName = "nội dung này") {
        return showPremiumLearningGate(featureName);
      },
      hooks: {
        setDetail(title) {
          state.detail = title ? { title: String(title), tabLabel: (SUBJECT_TABS.find((t) => t.id === state.subjectTab) || SUBJECT_TABS[0]).label } : null;
          renderBanner();
        },
        clearDetail() {
          state.detail = null;
          renderBanner();
        },
        showToast,
        showDialog,
        setScore: setScoreBox
      }
    };
  }

  function renderLoadedSubjectModule(module) {
    if (!module || typeof module.render !== "function") return false;
    Promise.resolve(module.render(subjectModuleContext())).catch((err) => {
      console.error("[Class1 subject module]", err);
      el.content.innerHTML = `<div class="empty-panel"><div><strong>Chưa mở được nội dung môn học</strong>Vui lòng kiểm tra file module và thử lại.</div></div>`;
    });
    return true;
  }

  function renderSubjectModuleOrLoading() {
    const subjectId = state.subjectId;
    if (!SUBJECT_MODULE_SCRIPTS[subjectId]) return false;
    const existing = loadedSubjectModule(subjectId);
    if (existing) return renderLoadedSubjectModule(existing);

    el.content.innerHTML = `<div class="empty-panel"><div><span class="inline-spinner" aria-hidden="true"></span><strong>Đang tải ${escapeHtml(currentSubject().fullLabel)}…</strong></div></div>`;
    ensureSubjectModule(subjectId).then((module) => {
      if (state.screen === "subject" && state.subjectId === subjectId) renderLoadedSubjectModule(module);
    }).catch((err) => {
      if (state.screen !== "subject" || state.subjectId !== subjectId) return;
      console.error("[Class1 module loader]", err);
      el.content.innerHTML = `<div class="empty-panel"><div><strong>Chưa tải được ${escapeHtml(currentSubject().fullLabel)}</strong>Kiểm tra file ${escapeHtml(SUBJECT_MODULE_SCRIPTS[subjectId] || "module môn học")} và thử lại.</div></div>`;
    });
    return true;
  }

  function normalizeAccess(raw) {
    const out = emptyAccess();
    SUBJECTS.forEach((subject) => {
      const item = raw && raw[subject.apiId] ? raw[subject.apiId] : null;
      if (!item) return;
      const type = ["trial", "vip"].includes(String(item.type || "").toLowerCase()) ? String(item.type).toLowerCase() : "regular";
      out[subject.id] = {
        type,
        startAt: item.startAt || "",
        endAt: item.endAt || ""
      };
    });
    return out;
  }

  function normalizeAccessNotices(raw) {
    if (!Array.isArray(raw)) return [];
    return raw.map((item) => {
      const subject = SUBJECTS.find((entry) => entry.apiId === String(item && item.subjectId || ""));
      const type = String(item && item.type || "").toLowerCase();
      if (!subject || !["trial", "vip"].includes(type)) return null;
      return {
        subjectId: subject.apiId,
        frontId: subject.id,
        fullLabel: subject.fullLabel,
        type,
        endAt: item.endAt || "",
        updatedAt: item.updatedAt || ""
      };
    }).filter(Boolean).sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
  }

  function accessTypeFor(subjectId) {
    if (state.auth.user && state.auth.user.role === "admin") return "admin";
    const item = state.auth.access[subjectId] || { type: "regular", endAt: "" };
    if ((item.type === "trial" || item.type === "vip") && item.endAt) {
      const end = new Date(item.endAt);
      if (!Number.isNaN(end.getTime()) && end.getTime() <= Date.now()) return "regular";
    }
    return item.type || "regular";
  }

  function hasPremiumAccess(subjectId) {
    const type = accessTypeFor(subjectId);
    return type === "admin" || type === "trial" || type === "vip";
  }

  // Games ở Trang chủ đang mở miễn phí cho mọi người; chỉ thay đổi khi có quyết định phát hành mới.

  function openAdminZalo() {
    const win = window.open("https://zalo.me/0865749402", "_blank", "noopener,noreferrer");
    if (win) win.opener = null;
  }

  function onPremiumVipRegister() {
    if (!state.auth.ready) {
      showToast("Đang kiểm tra phiên đăng nhập…");
      return;
    }
    if (!state.auth.user) {
      showDialog({
        title: "Bé cần có tài khoản trước nhé!",
        message: "Trước hết bé cần đăng kí ID Lớp 1, sau đó mới có thể đăng ký quyền học VIP.",
        icon: "🐰",
        primaryLabel: "Đăng ký ID",
        secondaryLabel: "Để sau nhé",
        onPrimary: () => openAuth("register"),
        onSecondary: hideDialog
      });
      return;
    }
    openAccountPage("request");
  }

  function showPremiumLockedDialog() {
    showDialog({
      title: "Nội dung dành cho Trial / VIP",
      message: "Bé hãy đăng kí quyền học VIP để được trải nghiệm nội dung\u00A0này\nHãy liên hệ admin để được hỗ trợ",
      icon: "🔒",
      primaryLabel: "Đăng ký quyền học VIP",
      secondaryLabel: "Liên hệ Admin",
      tertiaryLabel: "Để sau nhé",
      onPrimary: onPremiumVipRegister,
      onSecondary: () => {
        hideDialog();
        openAdminZalo();
      },
      onTertiary: hideDialog
    });
  }

  function readStoredToken() {
    try {
      const token = String(window.localStorage.getItem(TOKEN_STORAGE_KEY) || "").trim();
      if (token) return token;
    } catch (_) {}
    try {
      return String(window.sessionStorage.getItem(TOKEN_STORAGE_KEY) || "").trim();
    } catch (_) {
      return "";
    }
  }

  function storeToken(token) {
    let stored = false;
    try {
      if (token) {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
        stored = String(window.localStorage.getItem(TOKEN_STORAGE_KEY) || "") === String(token);
      } else {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        stored = true;
      }
    } catch (_) {}

    // Fallback cho môi trường trình duyệt chặn localStorage. sessionStorage vẫn sống qua F5.
    try {
      if (token && !stored) window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
      else window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (_) {}
    return stored;
  }

  function applyAuthData(data, token) {
    const user = data && data.user ? data.user : null;
    if (!user || !user.userId) throw new Error("INVALID_AUTH_RESPONSE");
    state.auth.token = token || data.token || state.auth.token;
    state.auth.user = {
      userId: String(user.userId || ""),
      name: String(user.name || ""),
      role: String(user.role || "student").toLowerCase() === "admin" ? "admin" : "student",
      avatarEmoji: AVATARS.includes(String(user.avatarEmoji || "")) ? String(user.avatarEmoji) : "🐰",
      createdAt: user.createdAt || ""
    };
    state.auth.access = normalizeAccess(data.access || {});
    state.auth.notices = normalizeAccessNotices(data.notices || []);
    state.auth.ready = true;
    if (state.auth.token) storeToken(state.auth.token);
    updateAccountButton();
    if (state.auth.user.role === "admin") {
      window.setTimeout(() => refreshAdminPendingBadge(true), 0);
    }
  }

  function clearAuthState() {
    storeToken("");
    state.auth.token = null;
    state.auth.user = null;
    state.auth.access = emptyAccess();
    state.auth.requests = [];
    state.auth.notices = [];
    state.auth.ready = true;
    state.profile = { subjectId: null, loading: false, data: null, failed: false };
    state.account = { view: "overview", visibleNotices: [], requestSubjectId: "" };
    state.admin = {
      loading: false,
      loaded: false,
      overview: null,
      requests: [],
      users: [],
      tab: "requests",
      pendingCount: 0,
      badgeLoading: false,
      badgeUpdatedAt: 0,
      userQuery: "",
      userFilter: "all",
      userSort: "id-asc",
      accessQuery: ""
    };
    adminRequestBusy.clear();
    updateAccountButton();
  }

  class ApiError extends Error {
    constructor(message, code, kind) {
      super(message || "REQUEST_FAILED");
      this.name = "ApiError";
      this.code = code || "REQUEST_FAILED";
      this.kind = kind || "server";
    }
  }

  async function apiRequest(action, payload = {}, options = {}) {
    const req = Object.assign({ action }, payload || {});
    const token = options.token !== undefined ? options.token : state.auth.token;
    if (options.auth !== false && token) req.token = token;

    const controller = typeof AbortController === "function" ? new AbortController() : null;
    const timeoutId = controller ? window.setTimeout(() => controller.abort(), API_TIMEOUT_MS) : 0;
    let response;
    try {
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(req),
        cache: "no-store",
        credentials: "omit",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        signal: controller ? controller.signal : undefined
      });
    } catch (_) {
      throw new ApiError("NETWORK_ERROR", "NETWORK_ERROR", "network");
    } finally {
      if (timeoutId) window.clearTimeout(timeoutId);
    }

    let data;
    try {
      data = await response.json();
    } catch (_) {
      throw new ApiError("INVALID_SERVER_RESPONSE", "SERVER_ERROR", "server");
    }

    if (!data || data.ok !== true) {
      const err = new ApiError(String((data && data.error) || "REQUEST_DENIED"), String((data && data.code) || "REQUEST_DENIED"), "server");
      if (err.code === "UNAUTHORIZED" && options.keepSessionOnUnauthorized !== true) {
        clearAuthState();
      }
      throw err;
    }
    return data.data || {};
  }

  function friendlyError(err, context) {
    const code = err && err.code ? err.code : "";
    if (context === "login") {
      if (code === "RATE_LIMITED") return "Bạn đã thử đăng nhập nhiều lần. Vui lòng thử lại sau.";
      return "Chưa đăng nhập được. Vui lòng kiểm tra ID, mật khẩu và thử lại.";
    }
    if (context === "register") {
      if (code === "INVALID_REGISTRATION_REQUEST") return "Trang đăng ký cần được cập nhật. Vui lòng tải lại trang rồi thử lại.";
      if (code === "RATE_LIMITED") return "Bạn thao tác quá nhanh. Vui lòng thử đăng ký lại sau.";
      if (code === "INVALID_PASSWORD") return "Mật khẩu cần từ 6 đến 128 ký tự.";
      if (code === "INVALID_INPUT") return "Họ và tên chưa hợp lệ. Vui lòng kiểm tra lại.";
      return "Chưa tạo được tài khoản. Vui lòng thử lại.";
    }
    if (code === "UNAUTHORIZED") return "Phiên đăng nhập không còn hiệu lực. Vui lòng đăng nhập lại.";
    if (code === "FORBIDDEN") return "Tài khoản không có quyền thực hiện thao tác này.";
    if (code === "RATE_LIMITED") return "Bạn thao tác quá nhanh. Vui lòng thử lại sau.";
    if (code === "REQUEST_EXISTS") return "Đã có yêu cầu đang chờ cho một môn đã chọn.";
    if (code === "ACCESS_ALREADY_ACTIVE") return "Một môn đã chọn đang có quyền học còn hiệu lực.";
    if (code === "ACCOUNT_NOT_FOUND") return "Tài khoản không còn tồn tại.";
    return "Chưa thực hiện được. Vui lòng thử lại.";
  }

  async function bootstrapAuth() {
    const token = readStoredToken();
    if (!token) {
      state.auth.ready = true;
      updateAccountButton();
      render();
      showWelcomeGreeting("bé");
      return;
    }

    state.auth.token = token;
    state.auth.ready = false;
    updateAccountButton(true);

    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const data = await apiRequest("sessionVerify", {}, {
          token,
          auth: true,
          keepSessionOnUnauthorized: true
        });
        applyAuthData(data, token);
        state.auth.ready = true;
        render();
        showWelcomeGreeting(state.auth.user && state.auth.user.name);
        return;
      } catch (err) {
        lastError = err;
        if (err && (err.code === "UNAUTHORIZED" || err.code === "ACCOUNT_NOT_FOUND")) {
          clearAuthState();
          state.auth.ready = true;
          render();
          return;
        }
        if (attempt < 2) {
          await new Promise((resolve) => window.setTimeout(resolve, 900 * (attempt + 1)));
        }
      }
    }

    // Lỗi mạng/server tạm thời không được biến thành logout. Giữ token để lần tải sau
    // còn xác minh lại, nhưng không coi trạng thái client là đã đăng nhập khi server chưa xác nhận.
    state.auth.token = token;
    state.auth.user = null;
    state.auth.access = emptyAccess();
    state.auth.ready = true;
    updateAccountButton();
    render();
    if (lastError) showToast("Chưa xác minh được phiên đăng nhập. Vui lòng thử lại sau.");
  }

  function setScreen(screen) {
    if (state.screen === "home" && screen !== "home") destroyActiveHomeFeature();
    if (screen !== "home") {
      state.homeFeatureId = null;
      state.homeFeatureGroupId = null;
      state.homeFeatureBanner = null;
    }
    state.screen = screen;
    state.detail = null;
    render();
  }

  function goHome() {
    stopWelcomeGreeting();
    if (state.screen === "subject" && state.subjectId) destroySubjectModule(state.subjectId);
    if (state.screen === "home") destroyActiveHomeFeature();
    state.account.visibleNotices = [];
    state.screen = "home";
    state.homeTab = "class1";
    state.homeFeatureId = null;
    state.homeFeatureGroupId = null;
    state.homeFeatureBanner = null;
    state.subjectId = null;
    state.subjectTab = "discover";
    state.profileSubjectId = null;
    state.detail = null;
    render();
    focusContent();
  }

  function openHomeTab(tabId) {
    stopWelcomeGreeting();
    if (state.screen === "subject" && state.subjectId) destroySubjectModule(state.subjectId);
    if (state.screen === "home") destroyActiveHomeFeature();
    state.account.visibleNotices = [];
    state.screen = "home";
    state.homeTab = HOME_TABS_WITH_AI.some((t) => t.id === tabId) ? tabId : "class1";
    if (state.homeTab === "contact") state.contactTab = "intro";
    state.homeFeatureId = null;
    state.homeFeatureGroupId = null;
    state.homeFeatureBanner = null;
    state.subjectId = null;
    state.profileSubjectId = null;
    state.detail = null;
    render();
    focusContent();
  }

  function openSubject(subjectId) {
    stopWelcomeGreeting();
    if (state.screen === "home") destroyActiveHomeFeature();
    state.account.visibleNotices = [];
    const previousSubjectId = state.screen === "subject" ? state.subjectId : null;
    const subject = subjectByFrontId(subjectId);
    if (!subject) return;
    if (previousSubjectId && previousSubjectId !== subject.id) destroySubjectModule(previousSubjectId);
    state.screen = "subject";
    state.homeFeatureId = null;
    state.homeFeatureGroupId = null;
    state.homeFeatureBanner = null;
    state.subjectId = subject.id;
    state.subjectTab = "discover";
    state.profileSubjectId = null;
    state.detail = null;
    render();
    focusContent();
  }

  async function openLearningProfile(subjectId) {
    if (state.screen === "home") destroyActiveHomeFeature();
    if (state.screen === "subject" && state.subjectId) destroySubjectModule(state.subjectId);
    state.account.visibleNotices = [];
    const subject = subjectByFrontId(subjectId);
    if (!subject) return;
    if (!state.auth.ready) {
      showToast("Đang kiểm tra phiên đăng nhập…");
      return;
    }
    if (!state.auth.user) {
      showToast("Đăng nhập để xem Hồ sơ học tập.");
      openAuth("login");
      return;
    }

    state.screen = "profile";
    state.homeTab = "class1";
    state.subjectId = null;
    state.profileSubjectId = subject.id;
    state.detail = null;
    state.profile = { subjectId: subject.id, loading: true, data: null, failed: false };
    render();
    focusContent();

    try {
      const data = await apiRequest("learningProfileGet", { subjectId: subject.apiId });
      if (state.screen === "profile" && state.profileSubjectId === subject.id) {
        state.profile = { subjectId: subject.id, loading: false, data, failed: false };
        render();
      }
    } catch (err) {
      if (state.screen === "profile" && state.profileSubjectId === subject.id) {
        state.profile = { subjectId: subject.id, loading: false, data: null, failed: true };
        render();
        showToast(friendlyError(err));
      }
    }
  }

  function openSubjectTab(tabId) {
    stopWelcomeGreeting();
    if (!SUBJECT_TABS.some((t) => t.id === tabId)) return;

    // Regular/Khách được mở catalog để xem nội dung có gì.
    // Trial/VIP chỉ kiểm tra khi bắt đầu học/chơi/thi nội dung thực tế.
    state.screen = "subject";
    state.subjectTab = tabId;
    state.detail = null;
    setScoreBox(0, 0);
    render();
    focusContent();
  }

  function openDetail(index) {
    const tab = SUBJECT_TABS.find((t) => t.id === state.subjectTab) || SUBJECT_TABS[0];
    const title = state.subjectTab === "exams"
      ? ["Học kỳ I", "Học kỳ II", "Học sinh giỏi"][index % 3]
      : state.subjectTab === "games"
        ? `Game ${index + 1}`
        : state.subjectTab === "lessons"
          ? `Bài học ${index + 1}`
          : state.subjectTab === "exercises"
            ? `Bài tập ${index + 1}`
            : state.subjectTab === "review"
              ? `Ôn tập ${index + 1}`
              : `Mục khám phá ${index + 1}`;

    state.detail = { title, tabLabel: tab.label };
    render();
    focusContent();
  }

  function render() {
    renderNav();
    renderBanner();
    renderContent();
    updateHomeVipNoticeVisibility();
    el.scoreBox.classList.toggle("hidden", state.screen !== "subject");
    updateInstallVisibility();
    updateAccountButton();
  }

  function homeTabsForCurrentUser() {
    if (!state.auth.user || state.auth.user.role !== "admin") return HOME_TABS_WITH_AI;
    const contactIndex = HOME_TABS_WITH_AI.findIndex((tab) => tab.id === "contact");
    if (contactIndex < 0) return [...HOME_TABS_WITH_AI, ADMIN_HOME_TAB];
    return [
      ...HOME_TABS_WITH_AI.slice(0, contactIndex + 1),
      ADMIN_HOME_TAB,
      ...HOME_TABS_WITH_AI.slice(contactIndex + 1)
    ];
  }

  function renderNav() {
    const tabs = state.screen === "subject" ? SUBJECT_TABS : homeTabsForCurrentUser();
    el.nav.replaceChildren();

    tabs.forEach((tab, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `nav-tab tone-${tab.tone}`;
      button.dataset.id = tab.id;

      const active = state.screen === "subject"
        ? state.subjectTab === tab.id
        : state.screen === "admin"
          ? tab.id === "admin"
          : state.homeTab === tab.id;

      if (active) button.classList.add("is-active");

      const displayLabel = state.screen === "subject" && index === 0
        ? currentSubject().label
        : tab.label;

      const icon = document.createElement("span");
      icon.className = "tab-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = tab.icon;

      const label = document.createElement("span");
      label.textContent = displayLabel;
      button.append(icon, label);

      if (tab.badge) {
        const badge = document.createElement("span");
        badge.className = "nav-ai-badge";
        badge.textContent = String(tab.badge);
        badge.setAttribute("aria-label", `Nhãn ${tab.badge}`);
        button.appendChild(badge);
      }

      if (tab.id === "admin" && state.auth.user && state.auth.user.role === "admin" && Number(state.admin.pendingCount || 0) > 0) {
        const badge = document.createElement("span");
        badge.className = "nav-alert-badge";
        badge.textContent = String(Math.min(99, Number(state.admin.pendingCount || 0)));
        badge.setAttribute("aria-label", `${state.admin.pendingCount} yêu cầu đang chờ`);
        button.appendChild(badge);
      }

      if (state.screen === "subject" && tab.id !== "discover" && !hasPremiumAccess(state.subjectId)) {
        button.classList.add("is-locked");
        button.title = "Cần Trial/VIP của môn";
      }

      button.addEventListener("click", () => {
        if (state.screen === "subject") {
          openSubjectTab(tab.id);
          return;
        }
        if (tab.id === "admin") {
          openAdmin();
          return;
        }
        openHomeTab(tab.id);
      });
      el.nav.appendChild(button);
    });
  }

  function renderBanner() {
    ensureHomeFeatureBannerStyles();
    resetHomeFeatureBreadcrumbPill();

    const subjectDetailMode = state.screen === "subject" && !!state.detail;
    const homeFeatureMode = state.screen === "home"
      && (state.homeTab === "games" || state.homeTab === "tools" || state.homeTab === "aiLab")
      && (!!state.homeFeatureId || !!state.homeFeatureGroupId);
    const detailMode = subjectDetailMode || homeFeatureMode;

    el.mainBanner.classList.toggle("hidden", detailMode);
    el.subBanner.classList.toggle("hidden", !detailMode);

    if (!detailMode) return;
    if (subjectDetailMode) {
      el.subPill.textContent = `🌸 ${state.detail.title}`;
      return;
    }

    const catalog = state.homeTab === "games" ? GAME_CATALOG : state.homeTab === "tools" ? TOOL_CATALOG : AI_LAB_CATALOG;
    const feature = catalog.find((item) => item.id === state.homeFeatureId) || null;
    const fallback = state.homeTab === "games" ? "Games" : state.homeTab === "tools" ? "Tools" : "AI Lab";
    const nested = state.homeFeatureBanner;

    if (nested && Array.isArray(nested.items) && nested.items.length) {
      el.subPill.classList.add("home-sub-breadcrumbs");
      el.subPill.setAttribute("aria-label", `Điều hướng ${fallback}`);
      el.subPill.title = nested.items.map((item) => item.title).join(" › ");
      el.subPill.replaceChildren();

      nested.items.forEach((item, index) => {
        if (index) {
          const sep = document.createElement("span");
          sep.className = "home-breadcrumb-sep";
          sep.setAttribute("aria-hidden", "true");
          sep.textContent = "›";
          el.subPill.appendChild(sep);
        }
        const clickable = typeof item.action === "function";
        const node = document.createElement(clickable ? "button" : "span");
        if (clickable) node.type = "button";
        node.className = `home-breadcrumb-tab home-breadcrumb-level${item.level || 2}`;
        node.textContent = item.title;
        node.title = item.title;
        if (clickable) {
          node.setAttribute("aria-label", `Quay lại ${item.title}`);
          node.addEventListener("click", () => {
            if (state.screen !== "home" || !state.homeFeatureId) return;
            item.action();
          });
        }
        el.subPill.appendChild(node);
      });
      return;
    }

    if (state.homeTab === "tools" && !state.homeFeatureId && activeToolGroup()) {
      const group = activeToolGroup();
      el.subPill.classList.add("home-sub-breadcrumbs");
      el.subPill.setAttribute("aria-label", "Điều hướng Tools");
      const node = document.createElement("span");
      node.className = "home-breadcrumb-tab home-breadcrumb-level2";
      node.textContent = `${TOOL_GROUPS.indexOf(group) + 1}. ${group.title}`;
      node.title = group.title;
      el.subPill.replaceChildren(node);
      return;
    }

    if (state.homeTab === "games" && state.homeFeatureGroupId === WORLD_EXPLORER_GROUP_ID && !state.homeFeatureId) {
      el.subPill.classList.add("home-sub-breadcrumbs");
      el.subPill.setAttribute("aria-label", "Điều hướng Games");
      const node = document.createElement("span");
      node.className = "home-breadcrumb-tab home-breadcrumb-level2";
      node.textContent = "3. Bé khám phá";
      node.title = "Bé khám phá";
      el.subPill.replaceChildren(node);
      return;
    }

    if (feature) {
      const featureIndex = Math.max(0, catalog.indexOf(feature));
      el.subPill.classList.add("home-sub-breadcrumbs");
      el.subPill.setAttribute("aria-label", `Điều hướng ${fallback}`);
      const node = document.createElement("span");
      node.className = "home-breadcrumb-tab home-breadcrumb-level2";
      node.textContent = `${featureIndex + 1}. ${feature.title}`;
      node.title = feature.title;
      el.subPill.replaceChildren(node);
      return;
    }

    const icon = nested && nested.icon ? nested.icon : (state.homeTab === "games" ? "🎮" : state.homeTab === "tools" ? "🧰" : "🤖");
    const title = nested && nested.title ? nested.title : fallback;
    el.subPill.textContent = `${icon} ${title}`;
  }

  function renderContent() {
    if (state.screen === "home") return renderHomeContent();
    if (state.screen === "profile") return renderLearningProfile();
    if (state.screen === "account") return renderAccountPage();
    if (state.screen === "admin") return renderAdmin();
    if (state.screen === "subject" && SUBJECT_MODULE_SCRIPTS[state.subjectId]) return renderSubjectContent();
    if (state.detail) return renderDetailContent();
    renderSubjectContent();
  }


  function updateHomeVipNoticeVisibility() {
    if (!el.homeVipNotice) return;
    const isTopLevelHome = state.screen === "home" && !state.homeFeatureId && !state.homeFeatureGroupId;
    const isAdmin = !!(state.auth.user && state.auth.user.role === "admin");
    const vipCount = state.auth.user
      ? SUBJECTS.reduce((count, subject) => count + (accessTypeFor(subject.id) === "vip" ? 1 : 0), 0)
      : 0;
    const hasAllThreeVip = vipCount >= SUBJECTS.length;

    // Đây chỉ là thông báo tĩnh. Vẫn hiện nếu mới có VIP 1-2 môn hoặc đang Trial/Regular.
    // Chỉ ẩn khi Admin hoặc đã có đủ VIP ở cả ba môn.
    el.homeVipNotice.classList.toggle("hidden", !isTopLevelHome || isAdmin || hasAllThreeVip);
  }

  function renderHomeContent() {
    switch (state.homeTab) {
      case "epsilon": renderEpsilonTab(); break;
      case "games": renderGamesTab(); break;
      case "tools": renderToolsTab(); break;
      case "aiLab": renderAILabTab(); break;
      case "contact": renderContactTab(); break;
      case "class1":
      default: renderClass1Tab(); break;
    }
  }

  function onVipRegisterAction() {
    if (!state.auth.ready) {
      showToast("Đang kiểm tra phiên đăng nhập…");
      return;
    }
    if (!state.auth.user) {
      openAuth("register");
      return;
    }
    if (state.auth.user.role === "admin") {
      openAccountPage("overview");
      return;
    }
    openAccountPage("request");
  }

  function renderWorldExplorerGroup() {
    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>🧭 Bé khám phá</h1></div>
      </div>
      <style>
        .world-explorer-grid{
          width:100%;
          grid-template-columns:repeat(3,minmax(0,1fr))!important;
          justify-content:stretch!important;
          align-items:stretch;
        }
        .world-explorer-grid .home-feature-card{
          width:100%!important;
          max-width:none!important;
          min-width:0;
        }
        @media (max-width:900px){
          .world-explorer-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}
        }
        @media (max-width:560px){
          .world-explorer-grid{grid-template-columns:1fr!important;}
        }
      </style>
      <div class="card-grid home-feature-grid world-explorer-grid">
        ${WORLD_EXPLORER_ITEMS.map((item, index) => {
          return `
          <button class="content-card home-feature-card" data-tone="${escapeHtml(item.tone || "purple")}" data-world-explorer-child="${escapeHtml(item.id)}" type="button" aria-label="${escapeHtml(`${index + 1}. ${item.title}`)}">
            <div class="card-top">
              <span class="card-icon" aria-hidden="true">${item.icon}</span>
              <div class="card-copy">
                <h2 class="card-title">${index + 1}. ${escapeHtml(item.title)}</h2>
                <p class="card-desc">${escapeHtml(item.description || "")}</p>
              </div>
            </div>
          </button>`;
        }).join("")}
      </div>`;

    el.content.querySelectorAll("[data-world-explorer-child]").forEach((button) => {
      button.addEventListener("click", () => {
        const featureId = String(button.dataset.worldExplorerChild || "");
        if (!featureId || !homeFeatureScript("games", featureId)) return;
        state.homeFeatureId = featureId;
        state.homeFeatureBanner = null;
        render();
        focusContent();
      });
    });
  }

  function renderToolsFolders() {
    const counts = new Map(TOOL_CATALOG.map((tool) => [tool.id, tool]));
    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>🧰 Tools</h1><p>Chọn chủ đề để khám phá các công cụ học tập.</p></div>
      </div>
      <style>
        .tools-folder-grid{width:100%;grid-template-columns:repeat(3,minmax(0,1fr))!important;align-items:stretch}
        .tools-folder-grid .tools-folder-card{width:100%!important;max-width:none!important;min-width:0}
        .tools-folder-card .card-title{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .tools-folder-card .card-desc{font-weight:800!important}
        @media(max-width:900px){.tools-folder-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
        @media(max-width:560px){.tools-folder-grid{grid-template-columns:1fr!important}}
      </style>
      <div class="card-grid home-feature-grid tools-folder-grid" aria-label="8 thư mục chủ đề Tools">
        ${TOOL_GROUPS.map((group, index) => {
          const count = group.ids.filter((id) => counts.has(id)).length;
          return `
            <button class="content-card home-feature-card tools-folder-card" type="button" data-tone="${toolCardTone(index)}" data-tool-group="${escapeHtml(group.id)}" aria-label="Mở ${escapeHtml(group.title)}, ${count} công cụ">
              <div class="card-top">
                <span class="card-icon" aria-hidden="true">${group.icon}</span>
                <div class="card-copy">
                  <h2 class="card-title">${index + 1}. ${escapeHtml(group.title)}</h2>
                  <p class="card-desc">${count} công cụ</p>
                </div>
              </div>
            </button>`;
        }).join("")}
      </div>`;

    el.content.querySelectorAll("[data-tool-group]").forEach((button) => {
      button.addEventListener("click", () => {
        const groupId = String(button.dataset.toolGroup || "");
        if (!TOOL_GROUPS.some((group) => group.id === groupId)) return;
        state.homeFeatureGroupId = groupId;
        state.homeFeatureId = null;
        state.homeFeatureBanner = null;
        render();
        focusContent();
      });
    });
  }

  function renderHomeFeatureCatalog(kind, icon, title, description, catalog) {
    if (kind === "tools" && !state.homeFeatureId) {
      const group = activeToolGroup();
      if (!group) {
        renderToolsFolders();
        return;
      }
      catalog = group.ids.map((id) => TOOL_CATALOG.find((item) => item.id === id)).filter(Boolean);
      icon = group.icon;
      title = group.title;
      description = `${catalog.length} công cụ trong chủ đề này.`;
    }
    if (
      kind === "games"
      && state.homeFeatureGroupId === WORLD_EXPLORER_GROUP_ID
      && !state.homeFeatureId
    ) {
      renderWorldExplorerGroup();
      return;
    }

    if (state.homeFeatureId) {
      if (!renderHomeFeatureOrLoading(kind, state.homeFeatureId)) {
        renderEmptyHomeTab(icon, title, "Module này chưa có file JS tương ứng.");
      }
      return;
    }

    if (!catalog.length) {
      renderEmptyHomeTab(icon, title, description);
      return;
    }

    const useFullWidthCatalogGrid = kind === "games" || kind === "tools" || kind === "aiLab";
    const catalogGridClass = useFullWidthCatalogGrid ? " games-catalog-grid" : "";
    const catalogGridStyle = useFullWidthCatalogGrid ? `
      <style>
        .games-catalog-grid{
          width:100%;
          grid-template-columns:repeat(3,minmax(0,1fr))!important;
          justify-content:stretch!important;
          align-items:stretch;
        }
        .games-catalog-grid .home-feature-card{
          width:100%!important;
          max-width:none!important;
          min-width:0;
        }
        .home-feature-title-row{
          display:flex;
          align-items:center;
          gap:8px;
          min-width:0;
        }
        .home-feature-title-row .card-title{
          min-width:0;
        }
        .home-feature-card .card-desc{
          font-weight:750!important;
        }
        .home-feature-ai-badge{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          flex:0 0 auto;
          min-height:24px;
          padding:2px 9px;
          border:1px solid #bfdbfe;
          border-radius:999px;
          background:linear-gradient(90deg,#ec4899 0%,#8b5cf6 55%,#3b82f6 100%);
          color:#fff;
          font-size:12px;
          line-height:1;
          font-weight:900;
          box-shadow:0 3px 9px rgba(99,102,241,.18);
          white-space:nowrap;
        }
        .home-feature-access-note{
          margin:5px 0 0!important;
          color:#7c3aed!important;
          font-size:15px!important;
          line-height:1.35;
          font-weight:900!important;
        }
        .ai-lab-filters{
          display:flex;
          flex-wrap:wrap;
          align-items:center;
          gap:8px;
          width:100%;
          margin:0 0 14px;
        }
        .ai-lab-filter-btn{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          min-height:38px;
          padding:7px 14px;
          border:1px solid #ddd6fe;
          border-radius:999px;
          background:#fff;
          color:#6b21a8;
          box-shadow:0 2px 6px rgba(76,29,149,.04);
          font:inherit;
          font-size:14px;
          line-height:1.2;
          font-weight:850;
          white-space:nowrap;
          cursor:pointer;
          transition:background .18s,border-color .18s,box-shadow .18s,color .18s;
        }
        .ai-lab-filter-btn:hover{
          border-color:#c084fc;
          background:#faf5ff;
        }
        .ai-lab-filter-btn:focus-visible{
          outline:3px solid #93c5fd;
          outline-offset:2px;
        }
        .ai-lab-filter-btn.is-active{
          border-color:#a855f7;
          background:linear-gradient(90deg,#ec4899,#a855f7);
          box-shadow:0 4px 10px rgba(168,85,247,.19);
          color:#fff;
        }
        .ai-lab-filter-btn.is-active:hover{
          background:linear-gradient(90deg,#db2777,#9333ea);
        }
        .ai-lab-group[hidden]{display:none!important;}
        .ai-lab-groups{
          display:grid;
          gap:18px;
          width:100%;
        }
        .ai-lab-group{
          display:grid;
          gap:8px;
          min-width:0;
        }
        .ai-lab-group-head{
          min-height:42px;
          padding:7px 12px;
          border:1px solid #e9d5ff;
          border-radius:14px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          background:#faf5ff;
          color:#6d28d9;
          box-shadow:0 3px 9px rgba(76,29,149,.05);
        }
        .ai-lab-group-head h2{
          margin:0;
          font-size:18px;
          line-height:1.2;
          font-weight:950;
          color:currentColor;
        }
        .ai-lab-group-head span{
          flex:0 0 auto;
          min-height:25px;
          padding:3px 9px;
          border-radius:999px;
          background:rgba(255,255,255,.82);
          color:currentColor;
          font-size:13px;
          line-height:1;
          font-weight:900;
          display:inline-flex;
          align-items:center;
          justify-content:center;
        }
        .ai-lab-group[data-group-tone="blue"] .ai-lab-group-head{background:#eff8ff;border-color:#bae6fd;color:#0369a1;}
        .ai-lab-group[data-group-tone="purple"] .ai-lab-group-head{background:#faf5ff;border-color:#d8b4fe;color:#6d28d9;}
        .ai-lab-group[data-group-tone="teal"] .ai-lab-group-head{background:#f0fdfa;border-color:#99f6e4;color:#0f766e;}
        .ai-lab-group[data-group-tone="green"] .ai-lab-group-head{background:#ecfdf5;border-color:#a7f3d0;color:#047857;}
        .ai-lab-group[data-group-tone="amber"] .ai-lab-group-head{background:#fffbeb;border-color:#fde68a;color:#a16207;}
        .ai-lab-group-grid{
          margin:0;
        }
        @media (max-width:900px){
          .games-catalog-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}
        }
        @media (max-width:560px){
          .ai-lab-filters{
            flex-wrap:nowrap;
            overflow-x:auto;
            padding:3px 1px 8px;
            margin-bottom:10px;
            scrollbar-width:thin;
            -webkit-overflow-scrolling:touch;
          }
          .ai-lab-filter-btn{flex:0 0 auto;min-height:40px;}
          .ai-lab-groups{gap:14px;}
          .ai-lab-group-head{min-height:38px;padding:6px 10px;border-radius:12px;}
          .ai-lab-group-head h2{font-size:16px;}
          .ai-lab-group-head span{font-size:12px;min-height:23px;padding:2px 8px;}
        }
        @media (max-width:560px){
          .games-catalog-grid{grid-template-columns:1fr!important;}
        }
      </style>` : "";

    const catalogIndex = new Map(catalog.map((item, index) => [item.id, { item, index }]));
    const activeAILabGroup = AI_LAB_GROUPS.some((group) => group.id === state.aiLabGroupFilter)
      ? state.aiLabGroupFilter : "all";
    const aiLabFilterHtml = kind === "aiLab" ? `
      <nav class="ai-lab-filters" aria-label="Chọn chủ đề AI Lab">
        ${[{ id: "all", title: "Tất cả" }, ...AI_LAB_GROUPS].map((group) => `
          <button type="button" class="ai-lab-filter-btn${activeAILabGroup === group.id ? " is-active" : ""}"
            data-ai-lab-filter="${escapeHtml(group.id)}"
            aria-pressed="${activeAILabGroup === group.id ? "true" : "false"}">${escapeHtml(group.title)}</button>`).join("")}
      </nav>` : "";
    const toolToneOffset = kind === "tools" ? Math.max(0, TOOL_GROUPS.findIndex((group) => group.id === state.homeFeatureGroupId)) : 0;
    const featureCardHtml = (item, index) => `
      <button class="content-card home-feature-card" data-tone="${escapeHtml(kind === "tools" ? toolCardTone(index, toolToneOffset) : (item.tone || "purple"))}" data-home-feature="${escapeHtml(item.id)}" type="button">
        <div class="card-top">
          <span class="card-icon" aria-hidden="true">${item.icon}</span>
          <div class="card-copy">
            <div class="home-feature-title-row">
              <h2 class="card-title">${index + 1}. ${escapeHtml(item.title)}</h2>
              ${kind === "aiLab" && item.badge ? `<span class="home-feature-ai-badge">✨ ${escapeHtml(item.badge)}</span>` : ""}
            </div>
            ${item.description ? `<p class="card-desc">${escapeHtml(item.description)}</p>` : ""}
          </div>
        </div>
      </button>`;

    const catalogMarkup = kind === "aiLab"
      ? `${aiLabFilterHtml}<div class="ai-lab-groups">
          ${AI_LAB_GROUPS.map((group) => {
            const groupItems = group.ids.map((id) => catalogIndex.get(id)).filter(Boolean);
            return `
              <section class="ai-lab-group" data-ai-lab-group="${escapeHtml(group.id)}" data-group-tone="${escapeHtml(group.tone)}" aria-labelledby="ai-lab-group-${escapeHtml(group.id)}"${activeAILabGroup !== "all" && activeAILabGroup !== group.id ? " hidden" : ""}>
                <div class="ai-lab-group-head">
                  <h2 id="ai-lab-group-${escapeHtml(group.id)}">${group.icon} ${escapeHtml(group.title)}</h2>
                  <span>${groupItems.length} ${groupItems.length === 1 ? "lab" : "lab"}</span>
                </div>
                <div class="card-grid home-feature-grid games-catalog-grid ai-lab-group-grid">
                  ${groupItems.map(({ item, index }) => featureCardHtml(item, index)).join("")}
                </div>
              </section>`;
          }).join("")}
        </div>`
      : `<div class="card-grid home-feature-grid${catalogGridClass}">
          ${catalog.map((item, index) => featureCardHtml(item, index)).join("")}
        </div>`;

    el.content.innerHTML = `
      <div class="section-heading">
        <div>
          <h1>${icon} ${escapeHtml(title)}</h1>
          <p>${escapeHtml(description)}</p>
        </div>
        ${kind === "tools" ? '<button type="button" id="tools-folder-back" class="back-btn">← Tools</button>' : ""}
      </div>
      ${catalogGridStyle}
      ${catalogMarkup}`;

    document.getElementById("tools-folder-back")?.addEventListener("click", () => {
      state.homeFeatureGroupId = null;
      state.homeFeatureBanner = null;
      render();
      focusContent();
    });

    if (kind === "aiLab") {
      const filterButtons = [...el.content.querySelectorAll("[data-ai-lab-filter]")];
      const groups = [...el.content.querySelectorAll("[data-ai-lab-group]")];
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const groupId = button.dataset.aiLabFilter;
          if (groupId !== "all" && !AI_LAB_GROUPS.some((group) => group.id === groupId)) return;
          state.aiLabGroupFilter = groupId;
          filterButtons.forEach((filterButton) => {
            const selected = filterButton.dataset.aiLabFilter === groupId;
            filterButton.classList.toggle("is-active", selected);
            filterButton.setAttribute("aria-pressed", String(selected));
          });
          groups.forEach((group) => {
            group.hidden = groupId !== "all" && group.dataset.aiLabGroup !== groupId;
          });
        });
      });
    }

    el.content.querySelectorAll("[data-home-feature]").forEach((button) => {
      button.addEventListener("click", () => {
        const featureId = String(button.dataset.homeFeature || "");
        if (!featureId) return;

        if (kind === "games" && featureId === WORLD_EXPLORER_GROUP_ID) {
          state.homeFeatureGroupId = WORLD_EXPLORER_GROUP_ID;
          state.homeFeatureId = null;
          state.homeFeatureBanner = {
            items: [{ level: 2, title: "3. Bé khám phá", action: null }]
          };
          render();
          focusContent();
          return;
        }

        if (!homeFeatureScript(kind, featureId)) return;
        if (kind !== "tools") state.homeFeatureGroupId = null;
        state.homeFeatureId = featureId;
        state.homeFeatureBanner = null;
        render();
        focusContent();
      });
    });
  }

  function renderToolsTab() {
    ensureToolsCardPaletteStyles();
    renderHomeFeatureCatalog("tools", "🧰", "Tools", "Các công cụ tiện ích của Epsilon Edu.", TOOL_CATALOG);
  }

  function renderAILabTab() {
    renderHomeFeatureCatalog("aiLab", "🤖", "AI Lab", "Khám phá AI bằng trải nghiệm: tự tạo dữ liệu, huấn luyện, thử nghiệm và quan sát cách AI học.", AI_LAB_CATALOG);
  }

  function renderGamesTab() {
    renderHomeFeatureCatalog("games", "🎮", "Games", "Các trò chơi và hoạt động sáng tạo của Epsilon Edu.", GAME_CATALOG);
  }

  function accessBadge(subjectId) {
    const type = accessTypeFor(subjectId);
    if (type === "admin") return "Admin";
    if (type === "vip") return "VIP";
    if (type === "trial") return "Trial";
    return state.auth.user ? "Regular" : "Vào môn học";
  }

  function renderClass1Tab() {
    const pendingApiIds = new Set();
    (state.auth.requests || []).forEach((request) => (request.subjectIds || []).forEach((id) => pendingApiIds.add(String(id))));

    const cards = SUBJECTS.map((subject) => {
      const accessType = accessTypeFor(subject.id);
      const accessLabel = accessBadge(subject.id);
      const isAdmin = !!(state.auth.user && state.auth.user.role === "admin");
      const isVip = accessType === "vip";
      const hasPendingVip = pendingApiIds.has(subject.apiId);
      const showVipRequest = !isAdmin && !isVip;
      const badgeTone = accessType === "vip" ? "vip" : accessType === "trial" ? "trial" : accessType === "admin" ? "admin" : "regular";

      return `
      <div class="subject-column">
        <button class="content-card subject-card class1-subject-card" data-tone="${subject.tone}" data-subject="${subject.id}" type="button">
          <span class="subject-access-badge ${badgeTone}">${escapeHtml(accessLabel)}</span>
          <div class="card-top">
            <span class="card-icon" aria-hidden="true">${subject.icon}</span>
            <div class="card-copy">
              <h2 class="card-title">${escapeHtml(subject.fullLabel)}</h2>
              <p class="card-desc">${escapeHtml(subject.description)}</p>
            </div>
          </div>
        </button>

        <button class="subject-profile-card" data-tone="${subject.tone}" data-profile-subject="${subject.id}" type="button" aria-label="Mở Hồ sơ học tập ${escapeHtml(subject.fullLabel)}">
          <span class="subject-profile-icon" aria-hidden="true">📊</span>
          <span class="subject-profile-copy">
            <span class="subject-profile-title">Hồ sơ học tập</span>
            <span class="subject-profile-note">${state.auth.user ? "Xem tiến trình của bé" : "Đăng nhập để xem"}</span>
          </span>
        </button>

        ${showVipRequest ? `<button class="subject-vip-request-button${hasPendingVip ? " has-pending" : ""}" data-vip-subject="${subject.id}" type="button">${hasPendingVip ? "Đang chờ duyệt VIP" : "Đăng ký quyền học VIP"}</button>` : ""}
      </div>`;
    }).join("");

    el.content.innerHTML = `
      <style>
        .class1-subject-card{position:relative;min-height:128px!important;padding:.95rem 1rem!important;}
        .class1-subject-card .card-top{padding-right:84px;}
        .subject-access-badge{
          position:absolute;top:11px;right:11px;z-index:2;min-height:28px;padding:3px 10px;border:1px solid;border-radius:999px;
          display:inline-flex;align-items:center;justify-content:center;background:#fff;font-size:15px;line-height:1;font-weight:950;white-space:nowrap;
          box-shadow:0 3px 8px rgba(76,29,149,.07);
        }
        .subject-access-badge.vip{color:#6d28d9;border-color:#c4b5fd;background:#f5f3ff;}
        .subject-access-badge.trial{color:#0369a1;border-color:#7dd3fc;background:#eff8ff;}
        .subject-access-badge.regular{color:#047857;border-color:#86efac;background:#f0fdf4;}
        .subject-access-badge.admin{color:#be185d;border-color:#f9a8d4;background:#fff1f7;}
        .subject-vip-request-button{
          width:100%;min-height:42px;border:0;border-radius:14px;padding:.55rem .75rem;color:#fff;
          background:linear-gradient(90deg,#ec4899,#a855f7,#7c3aed);font-size:16px;font-weight:950;line-height:1.2;
          box-shadow:0 5px 13px rgba(139,92,246,.16);
        }
        .subject-vip-request-button.has-pending{background:linear-gradient(90deg,#94a3b8,#64748b);}
        @media(max-width:767px){
          .class1-subject-card{min-height:118px!important;padding:.82rem .85rem!important;}
          .class1-subject-card .card-top{padding-right:72px;}
          .subject-access-badge{top:9px;right:9px;min-height:26px;padding:3px 8px;font-size:14px;}
          .subject-vip-request-button{min-height:40px;font-size:15px;}
        }
      </style>
      <div class="section-heading">
        <div>
          <h1>🌟 Lớp 1</h1>
          <p>Chọn môn học để bắt đầu.</p>
        </div>
      </div>
      <section class="subject-grid" aria-label="Ba môn học Lớp 1">${cards}</section>
    `;

    el.content.querySelectorAll("[data-subject]").forEach((card) => {
      card.addEventListener("click", () => openSubject(card.dataset.subject));
    });
    el.content.querySelectorAll("[data-profile-subject]").forEach((card) => {
      card.addEventListener("click", () => openLearningProfile(card.dataset.profileSubject));
    });
    el.content.querySelectorAll("[data-vip-subject]").forEach((button) => {
      button.addEventListener("click", () => {
        const subjectId = String(button.dataset.vipSubject || "");
        if (!subjectId) return;
        if (!state.auth.ready) {
          showToast("Đang kiểm tra phiên đăng nhập…");
          return;
        }
        if (!state.auth.user) {
          openAuth("register");
          return;
        }
        openAccountPage("request", subjectId);
      });
    });
  }

  function renderLearningProfile() {
    const subject = subjectByFrontId(state.profileSubjectId) || SUBJECTS[0];
    const profileState = state.profile;

    let body = "";
    if (profileState.loading) {
      body = `<div class="empty-panel"><div><span class="inline-spinner" aria-hidden="true"></span><strong>Đang tải Hồ sơ học tập…</strong></div></div>`;
    } else if (profileState.failed) {
      body = `
        <div class="learning-profile-empty">
          <strong>🐰 Chưa tải được Hồ sơ học tập</strong>
          Vui lòng thử lại sau.
        </div>`;
    } else {
      const summary = profileState.data && profileState.data.summary ? profileState.data.summary : null;
      const attempts = summary ? Number(summary.attempts || 0) : 0;
      const correct = summary ? Number(summary.correct || 0) : 0;
      const wrong = summary ? Number(summary.wrong || 0) : 0;
      const mastery = summary && summary.mastery != null ? `${Number(summary.mastery)}%` : "Chưa đủ dữ liệu";
      const independence = summary && summary.independentPercent != null ? `${Number(summary.independentPercent)}%` : "Chưa đủ dữ liệu";

      body = `
        <section class="learning-profile-grid" aria-label="Tổng quan Hồ sơ học tập ${escapeHtml(subject.fullLabel)}">
          <div class="learning-profile-stat"><div class="stat-icon">🎯</div><strong>Đã luyện</strong><span>${attempts ? `${attempts} lượt` : "Chưa đủ dữ liệu"}</span></div>
          <div class="learning-profile-stat"><div class="stat-icon">🌟</div><strong>Đang làm tốt</strong><span>${attempts ? `${correct} lượt đúng` : "Chưa đủ dữ liệu"}</span></div>
          <div class="learning-profile-stat"><div class="stat-icon">🌱</div><strong>Cần luyện thêm</strong><span>${attempts ? `${wrong} lượt cần xem lại` : "Chưa đủ dữ liệu"}</span></div>
          <div class="learning-profile-stat"><div class="stat-icon">🧠</div><strong>Mức tự học</strong><span>${independence}</span></div>
        </section>
        <div class="learning-profile-empty">
          <strong>${attempts ? `Mức thành thạo tham khảo: ${mastery}` : "🐰 Cô Thỏ Hồng đang chờ thêm dữ liệu học tập"}</strong>
          ${attempts ? "Hồ sơ này phục vụ hỗ trợ học thích ứng, không phải khung đánh giá 6 năng lực chính thức." : "Khi bé bắt đầu luyện tập, hồ sơ sẽ dần cho biết phần bé đang làm tốt, phần cần ôn lại và mức độ tự làm của bé."}
        </div>`;
    }

    el.content.innerHTML = `
      <div class="section-heading">
        <div>
          <h1>📊 Hồ sơ học tập · ${escapeHtml(subject.fullLabel)}</h1>
          <p>Theo dõi quá trình luyện tập và mức độ tự học của bé.</p>
        </div>
        <button id="profile-back-button" class="back-btn" type="button">← Lớp 1</button>
      </div>
      ${body}
    `;
    document.getElementById("profile-back-button")?.addEventListener("click", () => openHomeTab("class1"));
  }

  function renderEpsilonTab() {
    const grades = Array.from({ length: 9 }, (_, i) => i + 1);
    const cards = grades.map((grade, index) => {
      const url = EE_CLASS_SITES[grade] || "";
      const available = Boolean(url);
      return `
        <button class="content-card" data-tone="${PREVIEW_TONES[index % PREVIEW_TONES.length]}" data-grade="${grade}" type="button">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true">🏫</span>
            <div class="card-copy">
              <h2 class="card-title">Lớp ${grade}</h2>
              <p class="card-desc">${available ? `Epsilon Edu Lớp ${grade}.` : "Lớp này chưa triển khai."}</p>
            </div>
          </div>
          <div class="card-foot">
            <span class="badge">${available ? "Mở website" : "Chưa mở"}</span>
          </div>
        </button>
      `;
    }).join("");

    el.content.innerHTML = `
      <div class="section-heading"><div><h1>🌐 Epsilon Edu</h1><p>Danh mục website Lớp 1 đến Lớp 9.</p></div></div>
      <section class="home-link-grid" aria-label="Danh sách lớp">${cards}</section>
    `;

    el.content.querySelectorAll("[data-grade]").forEach((card) => {
      card.addEventListener("click", () => {
        const grade = Number(card.dataset.grade);
        const url = EE_CLASS_SITES[grade] || "";
        if (!url) {
          showToast(`Website Lớp ${grade} hiện chưa được triển khai.`);
          return;
        }
        const opened = window.open(url, "_blank", "noopener,noreferrer");
        if (!opened) showToast(`Trình duyệt đang chặn cửa sổ mới của Lớp ${grade}.`);
      });
    });
  }

  function renderEmptyHomeTab(icon, title, message) {
    el.content.innerHTML = `
      <div class="section-heading"><div><h1>${icon} ${escapeHtml(title)}</h1><p>Khung giao diện đã sẵn sàng.</p></div></div>
      <div class="empty-panel"><div><strong>Chưa có nội dung</strong>${escapeHtml(message)}</div></div>
    `;
  }

  function renderContactTab() {
    const activeView = ["intro", "vip", "contact"].includes(state.contactTab) ? state.contactTab : "intro";
    const gradeLinks = Array.from({ length: 9 }, (_, index) => {
      const grade = index + 1;
      const url = String(EE_CLASS_SITES[grade] || "").trim();
      if (!url) {
        return `<span class="contact-grade-link is-unavailable" aria-label="Lớp ${grade} đang cập nhật">Lớp ${grade}</span>`;
      }
      return `<a class="contact-grade-link${grade === 1 ? " is-current" : ""}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="Mở Epsilon Edu Lớp ${grade}">🏫 Lớp ${grade}</a>`;
    }).join("");

    const introPanel = `
      <div class="contact-panel contact-intro-panel" role="tabpanel" aria-label="Giới thiệu chương trình">
        <div class="contact-hero">
          <div class="contact-hero-icon" aria-hidden="true">🐰</div>
          <div class="contact-hero-copy">
            <h2>Epsilon Edu - Tiến bộ từng ngày</h2>
            <p>Epsilon Edu là không gian học tập và trải nghiệm dành cho học sinh. Ở Lớp 1, Cô Thỏ Hồng đồng hành cùng bé trong Toán, Tiếng Việt và Tiếng Anh; bên cạnh đó còn có Games, Tools và hệ sinh thái các lớp học được liên kết trong Epsilon Edu.</p>
          </div>
        </div>

        <div class="contact-intro-grid">
          <button class="contact-intro-card tone-purple" type="button" data-intro-home-tab="class1" aria-label="Khám phá chương trình học Lớp 1">
            <span class="contact-intro-icon" aria-hidden="true">📚</span>
            <div><strong>Chương trình học Lớp 1</strong><span>Toán, Tiếng Việt và Tiếng Anh được tổ chức theo Khám phá, Bài học, Bài tập, Ôn tập, Đề thi và Mini games để bé học từng bước rõ ràng.</span></div>
          </button>
          <div class="contact-intro-card tone-pink">
            <span class="contact-intro-icon" aria-hidden="true">🌱</span>
            <div><strong>Tự học và tiến bộ mỗi ngày</strong><span>Bé có thể luyện tập thường xuyên, xem lại quá trình học và từng bước hình thành thói quen tự học độc lập.</span></div>
          </div>
          <button class="contact-intro-card tone-blue" type="button" data-intro-home-tab="epsilon" aria-label="Mở hệ sinh thái Epsilon Edu">
            <span class="contact-intro-icon" aria-hidden="true">🌐</span>
            <div><strong>Hệ sinh thái Epsilon Edu</strong><span>Từ Lớp 1, bé có thể đi tới các chương trình Lớp 2, Lớp 3 và những lớp tiếp theo qua các liên kết của Epsilon Edu.</span></div>
          </button>
        </div>

        <div class="contact-experience-head">
          <div>
            <h3>🎈 Hoạt động trải nghiệm nổi bật</h3>
            <p>Games và Tools không chỉ là phần phụ, mà là không gian để bé chơi, khám phá, tương tác và vận dụng điều đã học theo cách tự nhiên.</p>
          </div>
        </div>

        <div class="contact-experience-grid">
          <button class="contact-experience-card games" type="button" data-intro-home-tab="games" aria-label="Khám phá Games">
            <span class="contact-experience-icon" aria-hidden="true">🎮</span>
            <span class="contact-experience-copy"><strong>Games - Học qua trải nghiệm</strong><span>Các trò chơi rèn quan sát, ghi nhớ, tư duy, sáng tạo và kỹ năng tương tác. Bé vừa chơi vừa củng cố kiến thức, tạo hứng thú và chủ động khám phá.</span></span>
            <span class="contact-experience-go" aria-hidden="true">→</span>
          </button>
          <button class="contact-experience-card tools" type="button" data-intro-home-tab="tools" aria-label="Khám phá Tools">
            <span class="contact-experience-icon" aria-hidden="true">🧰</span>
            <span class="contact-experience-copy"><strong>Tools - Công cụ khám phá</strong><span>Các công cụ trực quan giúp bé thử nghiệm, đo lường, tính toán và khám phá những ý tưởng học tập theo cách thực hành, nhanh và thú vị.</span></span>
            <span class="contact-experience-go" aria-hidden="true">→</span>
          </button>
        </div>

        <div class="contact-ee-section">
          <h3>🏫 Các chương trình trong Epsilon Edu</h3>
          <p>Bé có thể mở trực tiếp các lớp đã triển khai bên dưới. Những lớp đang tiếp tục xây dựng sẽ được cập nhật dần trong hệ sinh thái Epsilon Edu.</p>
          <div class="contact-grade-links" aria-label="Liên kết các lớp trong Epsilon Edu">${gradeLinks}</div>
        </div>

        <div class="contact-footer-note"><span aria-hidden="true">✨</span><span>Học kiến thức - luyện kỹ năng - trải nghiệm - khám phá cùng Epsilon Edu</span><span aria-hidden="true">✨</span></div>
      </div>`;

    const vipPanel = `
      <div class="contact-panel contact-vip-panel" role="tabpanel" aria-label="Quyền học VIP">
        <div class="contact-vip-hero">
          <div class="contact-vip-hero-icon" aria-hidden="true">👑</div>
          <div class="contact-vip-hero-copy">
            <span class="contact-vip-kicker">EPSILON EDU VIP</span>
            <h2>Quyền học VIP - Mở trọn trải nghiệm học tập</h2>
            <p>Dành cho gia đình muốn bé học đầy đủ nội dung, luyện tập nhiều hơn và sử dụng trọn vẹn các hoạt động trải nghiệm của Epsilon Edu.</p>
          </div>
        </div>

        <div class="contact-vip-benefits" aria-label="Quyền lợi VIP">
          <div class="contact-vip-benefit tone-purple">
            <span class="contact-vip-benefit-icon" aria-hidden="true">📚</span>
            <div><strong>Mở đầy đủ nội dung VIP của môn</strong><span>Bé được học các phần Premium của môn đã đăng ký như Bài học, Bài tập, Ôn tập, Đề thi và Mini games.</span></div>
          </div>
          <div class="contact-vip-benefit tone-pink">
            <span class="contact-vip-benefit-icon" aria-hidden="true">📈</span>
            <div><strong>Học nhiều hơn - theo dõi tiến bộ tốt hơn</strong><span>Tài khoản được duy trì hồ sơ học tập để bé và gia đình dễ theo dõi quá trình luyện tập, kết quả và sự tiến bộ theo thời gian.</span></div>
          </div>
          <div class="contact-vip-benefit tone-green">
            <span class="contact-vip-benefit-icon" aria-hidden="true">🎮</span>
            <div><strong>Games &amp; Tools - trải nghiệm đầy đủ hơn</strong><span>Khi cơ chế giới hạn Games và Tools được áp dụng, tài khoản thường mở 2 mục đầu tiên; VIP sẽ được mở đầy đủ các nội dung trải nghiệm theo chính sách của chương trình.</span></div>
          </div>
          <div class="contact-vip-benefit tone-blue">
            <span class="contact-vip-benefit-icon" aria-hidden="true">🌟</span>
            <div><strong>Khám phá - quyền truy cập mở rộng</strong><span>Sắp tới, phần Khám phá của 3 môn dự kiến giới hạn tài khoản thường ở 2 mục đầu. VIP của môn đã đăng ký sẽ được mở đầy đủ phần Khám phá.</span></div>
          </div>
        </div>

        <div class="contact-vip-pricing" aria-label="Biểu phí quyền học VIP">
          <div class="contact-vip-pricing-head">
            <div><span class="contact-vip-pricing-icon" aria-hidden="true">💎</span><div><h3>Biểu phí quyền học VIP</h3><p>Đăng ký theo năm, lựa chọn theo nhu cầu học của bé.</p></div></div>
          </div>
          <div class="contact-vip-price-grid">
            <div class="contact-vip-price-card single">
              <span class="contact-vip-price-badge">1 môn</span>
              <strong>80.000đ</strong>
              <span>/ môn / năm</span>
              <small>Phù hợp khi bé tập trung vào một môn học.</small>
            </div>
            <div class="contact-vip-price-card bundle">
              <span class="contact-vip-price-badge">Ưu đãi 3 môn</span>
              <strong>210.000đ</strong>
              <span>/ 3 môn / năm</span>
              <small>Mở quyền VIP cho Toán, Tiếng Việt và Tiếng Anh cùng lúc.</small>
            </div>
          </div>
          <button class="contact-vip-action" type="button" data-contact-vip-action>
            <span aria-hidden="true">👑</span><span>Đăng ký quyền học VIP</span><span aria-hidden="true">→</span>
          </button>
        </div>

        <div class="contact-vip-note"><span aria-hidden="true">🐰</span><span>VIP giúp bé học sâu hơn, luyện tập nhiều hơn và có thêm những trải nghiệm thú vị trong Epsilon Edu.</span><span aria-hidden="true">✨</span></div>
      </div>`;

    const contactPanel = `
      <div class="contact-panel contact-info-panel" role="tabpanel" aria-label="Thông tin liên hệ">
        <div class="contact-hero">
          <div class="contact-hero-icon" aria-hidden="true">💌</div>
          <div class="contact-hero-copy">
            <h2>Thông tin liên hệ</h2>
            <p>Kết nối với Epsilon Edu khi cần hỗ trợ tài khoản, quyền học hoặc chương trình.</p>
          </div>
        </div>

        <div class="contact-grid">
          <a class="contact-card email" href="mailto:epsilon.vn@gmail.com" aria-label="Gửi email tới epsilon.vn@gmail.com">
            <span class="contact-card-icon" aria-hidden="true">📧</span>
            <span class="contact-card-copy">
              <span class="contact-card-label">Email</span>
              <span class="contact-card-value">epsilon.vn@gmail.com</span>
              <span class="contact-card-note">Nhấn để mở ứng dụng gửi email</span>
            </span>
            <span class="contact-card-arrow" aria-hidden="true"><span>→</span></span>
          </a>

          <a class="contact-card zalo" href="https://zalo.me/0865749402" target="_blank" rel="noopener noreferrer" aria-label="Liên hệ Zalo 0865 749 402">
            <span class="contact-card-icon" aria-hidden="true">💬</span>
            <span class="contact-card-copy">
              <span class="contact-card-label">Zalo</span>
              <span class="contact-card-value">0865.749.402</span>
              <span class="contact-card-note">Nhấn để mở Zalo và liên hệ trực tiếp</span>
            </span>
            <span class="contact-card-arrow" aria-hidden="true"><span>→</span></span>
          </a>
        </div>

        <div class="contact-footer-note"><span aria-hidden="true">✨</span><span>Cảm ơn bé và gia đình đã đồng hành cùng Epsilon Edu</span><span aria-hidden="true">✨</span></div>
      </div>`;

    el.content.innerHTML = `
      <section class="contact-page" aria-label="Giới thiệu và liên hệ Epsilon Edu">
        <div class="section-heading">
          <div>
            <h1>💌 Liên hệ</h1>
            <p>Giới thiệu chương trình, quyền học VIP và thông tin kết nối với Epsilon Edu.</p>
          </div>
        </div>

        <div class="contact-subtabs" role="tablist" aria-label="Giới thiệu, quyền học VIP và thông tin liên hệ">
          <button class="contact-subtab ${activeView === "intro" ? "is-active" : ""}" type="button" role="tab" aria-selected="${activeView === "intro"}" data-contact-view="intro">
            <span aria-hidden="true">🌟</span><span>Giới thiệu chương trình</span>
          </button>
          <button class="contact-subtab ${activeView === "vip" ? "is-active" : ""}" type="button" role="tab" aria-selected="${activeView === "vip"}" data-contact-view="vip">
            <span aria-hidden="true">👑</span><span>Quyền học VIP</span>
          </button>
          <button class="contact-subtab ${activeView === "contact" ? "is-active" : ""}" type="button" role="tab" aria-selected="${activeView === "contact"}" data-contact-view="contact">
            <span aria-hidden="true">💬</span><span>Thông tin liên hệ</span>
          </button>
        </div>

        ${activeView === "contact" ? contactPanel : activeView === "vip" ? vipPanel : introPanel}
      </section>
    `;

    el.content.querySelectorAll("[data-contact-view]").forEach((button) => {
      button.addEventListener("click", () => {
        const requestedView = String(button.dataset.contactView || "intro");
        const nextView = ["intro", "vip", "contact"].includes(requestedView) ? requestedView : "intro";
        if (state.contactTab === nextView) return;
        state.contactTab = nextView;
        renderContactTab();
      });
    });

    el.content.querySelector("[data-contact-vip-action]")?.addEventListener("click", onVipRegisterAction);

    el.content.querySelectorAll("[data-intro-home-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = String(button.dataset.introHomeTab || "");
        if (!HOME_TABS_WITH_AI.some((tab) => tab.id === tabId)) return;
        openHomeTab(tabId);
      });
    });
  }

  function renderSubjectContent() {
    if (renderSubjectModuleOrLoading()) return;
    const subject = currentSubject();
    const tab = SUBJECT_TABS.find((item) => item.id === state.subjectTab) || SUBJECT_TABS[0];
    const count = state.subjectTab === "games" ? 12 : state.subjectTab === "exams" ? 3 : 8;
    const cards = Array.from({ length: count }, (_, index) => {
      const tone = PREVIEW_TONES[index % PREVIEW_TONES.length];
      const meta = previewMeta(state.subjectTab, index);
      return `
        <button class="content-card" data-tone="${tone}" data-preview-index="${index}" type="button">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true">${meta.icon}</span>
            <div class="card-copy">
              <h2 class="card-title">${escapeHtml(meta.title)}</h2>
              <p class="card-desc">${escapeHtml(meta.description)}</p>
            </div>
          </div>
          <div class="card-foot"><span class="badge">${escapeHtml(meta.badge)}</span><span class="arrow"><span>→</span></span></div>
        </button>`;
    }).join("");

    const heading = state.subjectTab === "discover"
      ? `${subject.icon} ${subject.fullLabel}`
      : `${tab.icon} ${tab.label} · ${subject.fullLabel}`;

    const access = accessTypeFor(subject.id);
    const accessText = access === "admin" ? "Admin" : access.charAt(0).toUpperCase() + access.slice(1);

    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>${heading}</h1><p>Khung hiển thị đang chờ nạp học liệu thật · Quyền môn: ${escapeHtml(accessText)}</p></div>
      </div>
      <section class="card-grid" aria-label="${escapeHtml(tab.label)}">${cards}</section>
    `;

    el.content.querySelectorAll("[data-preview-index]").forEach((card) => {
      card.addEventListener("click", () => openDetail(Number(card.dataset.previewIndex)));
    });
  }

  function previewMeta(tabId, index) {
    const n = index + 1;
    if (tabId === "games") return { icon: "🎮", title: `Game ${n}`, description: "Nội dung game sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    if (tabId === "exams") {
      const names = ["Học kỳ I", "Học kỳ II", "Học sinh giỏi"];
      return { icon: "🏆", title: names[index % 3], description: "Bộ đề sẽ bổ sung sau.", badge: "Chưa có dữ liệu" };
    }
    if (tabId === "lessons") return { icon: "📖", title: `Bài học ${n}`, description: "Học liệu sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    if (tabId === "exercises") return { icon: "✏️", title: `Bài tập ${n}`, description: "Bộ 20 câu sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    if (tabId === "review") return { icon: "🧠", title: `Ôn tập ${n}`, description: "Nội dung sẽ bổ sung sau.", badge: "Mẫu giao diện" };
    return { icon: "🌟", title: `Mục khám phá ${n}`, description: "Học liệu sẽ bổ sung sau.", badge: "Mẫu giao diện" };
  }

  function renderDetailContent() {
    const subject = currentSubject();
    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>${subject.icon} ${escapeHtml(state.detail.title)}</h1><p>${escapeHtml(subject.fullLabel)} · ${escapeHtml(state.detail.tabLabel)}</p></div>
        <button id="back-to-list" class="back-btn" type="button">← Quay lại</button>
      </div>
      <div class="detail-panel"><div class="empty-panel"><div><strong>Khung mục học đã sẵn sàng</strong>Học liệu, bài giảng và tương tác sẽ được bổ sung ở bước tiếp theo.</div></div></div>
    `;
    document.getElementById("back-to-list").addEventListener("click", () => {
      state.detail = null;
      render();
      focusContent();
    });
  }

  function openAuth(mode = "login") {
    if (state.auth.user) {
      closeAuth();
      openAccountPage();
      return;
    }
    const safeMode = mode === "register" ? "register" : "login";
    switchAuthView(safeMode);
    el.authModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => {
      const target = safeMode === "register"
        ? document.getElementById("register-name")
        : document.getElementById("login-id");
      target?.focus();
    }, 50);
  }

  function closeAuth() {
    el.authModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function switchAuthView(mode) {
    const register = mode === "register";
    el.authTabs.classList.remove("hidden");
    el.authTabLogin.classList.toggle("is-active", !register);
    el.authTabRegister.classList.toggle("is-active", register);
    el.loginForm.classList.toggle("hidden", register);
    el.registerForm.classList.toggle("hidden", !register);
    el.authLater.textContent = "Để sau nhé";
  }

  function updateAccountButton(verifying = false) {
    if (!el.accountButton) return;

    const avatar = document.createElement("span");
    avatar.className = "user-btn-avatar";
    avatar.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "user-btn-name";

    el.accountButton.classList.remove("is-guest-auth");

    if (verifying || !state.auth.ready) {
      avatar.textContent = "🐰";
      label.textContent = "Đang tải";
      el.accountButton.title = "Đang kiểm tra phiên đăng nhập";
      el.accountButton.setAttribute("aria-label", "Đang kiểm tra tài khoản");
    } else if (state.auth.user) {
      avatar.textContent = state.auth.user.avatarEmoji || "🐰";
      label.textContent = state.auth.user.name || "Tài khoản";
      el.accountButton.title = `${state.auth.user.name} · ${state.auth.user.userId}${state.auth.user.role === "admin" ? " · Admin" : ""}`;
      el.accountButton.setAttribute("aria-label", `Tài khoản ${state.auth.user.name}${state.auth.user.role === "admin" ? ", Admin" : ""}`);
      if (state.auth.user.role === "admin") {
        const roleBadge = document.createElement("span");
        roleBadge.className = "user-btn-role-badge";
        roleBadge.textContent = "Admin";
        el.accountButton.replaceChildren(avatar, label, roleBadge);
        return;
      }
      const noticeCount = Number((state.auth.notices || []).length || 0);
      if (noticeCount > 0) {
        const noticeBadge = document.createElement("span");
        noticeBadge.className = "user-notice-badge";
        noticeBadge.textContent = String(Math.min(99, noticeCount));
        noticeBadge.setAttribute("aria-label", `${noticeCount} thông báo quyền học mới`);
        el.accountButton.replaceChildren(avatar, label, noticeBadge);
        return;
      }
    } else {
      el.accountButton.classList.add("is-guest-auth");
      label.classList.add("guest-auth-label");
      const registerLine = document.createElement("span");
      registerLine.className = "guest-auth-line";
      registerLine.textContent = "Đăng ký";
      const loginLine = document.createElement("span");
      loginLine.className = "guest-auth-line";
      loginLine.textContent = "Đăng nhập";
      label.replaceChildren(registerLine, loginLine);
      el.accountButton.title = "Đăng ký hoặc Đăng nhập";
      el.accountButton.setAttribute("aria-label", "Đăng ký hoặc Đăng nhập");
      el.accountButton.replaceChildren(label);
      return;
    }

    el.accountButton.replaceChildren(avatar, label);
  }

  async function openAccountPage(view = "overview", requestSubjectId = "") {
    if (state.screen === "subject" && state.subjectId) destroySubjectModule(state.subjectId);
    if (!state.auth.user) {
      openAuth("login");
      return;
    }
    state.screen = "account";
    state.account.view = view === "request" ? "request" : "overview";
    state.account.requestSubjectId = state.account.view === "request" && SUBJECTS.some((subject) => subject.id === requestSubjectId)
      ? String(requestSubjectId)
      : "";
    state.homeTab = "class1";
    state.subjectId = null;
    state.profileSubjectId = null;
    state.detail = null;
    render();
    focusContent();
    await refreshAccessState(true);
    if (state.screen === "account" && state.account.view === "overview") {
      await markVisibleAccessNoticesSeen();
    }
  }

  async function refreshAccessState(rerenderAccount = false) {
    if (!state.auth.user || !state.auth.token) return;
    try {
      const data = await apiRequest("accessStateGet");
      if (data.user && data.user.userId) {
        state.auth.user = {
          userId: String(data.user.userId || ""),
          name: String(data.user.name || ""),
          role: String(data.user.role || "student").toLowerCase() === "admin" ? "admin" : "student",
          avatarEmoji: AVATARS.includes(String(data.user.avatarEmoji || "")) ? String(data.user.avatarEmoji) : "🐰",
          createdAt: data.user.createdAt || ""
        };
      }
      state.auth.access = normalizeAccess(data.access || {});
      state.auth.requests = Array.isArray(data.requests) ? data.requests : [];
      state.auth.notices = normalizeAccessNotices(data.notices || []);
      updateAccountButton();
      if (rerenderAccount && state.screen === "account") render();
      if (state.screen === "home" || state.screen === "subject") render();
    } catch (err) {
      if (err.code === "UNAUTHORIZED") {
        if (state.screen === "account") goHome();
        render();
        showToast("Phiên đăng nhập không còn hiệu lực. Vui lòng đăng nhập lại.");
      } else if (rerenderAccount) {
        showToast(friendlyError(err));
      }
    }
  }

  function accessNoticeTone(frontId) {
    if (frontId === "math") return "blue";
    if (frontId === "vietnamese") return "pink";
    return "purple";
  }

  function currentAccountNotices() {
    const visible = Array.isArray(state.account.visibleNotices) ? state.account.visibleNotices : [];
    return visible.length ? visible : (state.auth.notices || []);
  }

  function accountAccessNoticesHtml() {
    const notices = currentAccountNotices();
    if (!notices.length) return "";
    const items = notices.map((notice) => {
      const tone = accessNoticeTone(notice.frontId);
      const label = notice.type === "vip" ? "VIP" : "Trial";
      const endText = formatDate(notice.endAt);
      const detail = endText ? `Có hiệu lực đến ${endText}.` : "Quyền học đã được kích hoạt.";
      return `<div class="account-access-notice notice-${tone}"><span class="account-access-notice-icon" aria-hidden="true">🎉</span><div><strong>${escapeHtml(notice.fullLabel)} đã được cấp ${escapeHtml(label)}</strong><span>${escapeHtml(detail)}</span></div></div>`;
    }).join("");
    return `<section class="account-notice-panel" aria-label="Thông báo quyền học mới"><div class="account-notice-heading"><div><h2>🔔 Thông báo quyền học mới</h2><p>Quyền học vừa được Admin cập nhật cho tài khoản.</p></div><span class="account-notice-count">${notices.length}</span></div><div class="account-notice-list">${items}</div></section>`;
  }

  async function markVisibleAccessNoticesSeen() {
    const notices = Array.isArray(state.auth.notices) ? state.auth.notices.slice() : [];
    if (!notices.length || !state.auth.user || state.auth.user.role === "admin") return;

    state.account.visibleNotices = notices;
    if (state.screen === "account" && state.account.view === "overview") render();

    const latestMs = notices.reduce((max, notice) => {
      const ms = new Date(notice.updatedAt || 0).getTime();
      return Number.isNaN(ms) ? max : Math.max(max, ms);
    }, 0);
    if (!latestMs) return;

    try {
      const data = await apiRequest("accessNoticesMarkSeen", { seenThrough: new Date(latestMs).toISOString() });
      state.auth.notices = normalizeAccessNotices(data.notices || []);
      updateAccountButton();
    } catch (err) {
      // Nếu đánh dấu đã xem tạm lỗi, giữ badge để người dùng không mất thông báo.
      if (err && err.code === "UNAUTHORIZED") showToast(friendlyError(err));
    }
  }

  async function refreshUserNoticeBadge() {
    if (!state.auth.user || !state.auth.token || state.auth.user.role === "admin") return;
    try {
      const data = await apiRequest("sessionVerify");
      state.auth.notices = normalizeAccessNotices(data.notices || []);
      updateAccountButton();
    } catch (err) {
      if (err && err.code === "UNAUTHORIZED") {
        clearAuthState();
        render();
      }
    }
  }

  function accountAccessRowsHtml() {
    return SUBJECTS.map((subject) => {
      const access = state.auth.access[subject.id] || { type: "regular", endAt: "" };
      const type = accessTypeFor(subject.id);
      const label = type === "admin" ? "Admin" : type.charAt(0).toUpperCase() + type.slice(1);
      return `<div class="account-access-row"><div><strong>${escapeHtml(subject.fullLabel)}</strong><span>${escapeHtml(accessExpiryText(type, access.endAt))}</span></div><span class="access-chip access-${escapeHtml(type)}">${escapeHtml(label)}</span></div>`;
    }).join("");
  }

  function accountRequestsHtml() {
    if (!state.auth.requests.length) return `<div class="account-request-empty">Chưa có yêu cầu quyền học đang chờ.</div>`;
    return state.auth.requests.map((request) => {
      const subjectLabels = (request.subjectIds || []).map(apiIdToLabel).filter(Boolean).join(", ");
      const created = formatDate(request.createdAt);
      const detail = `${subjectLabels || "Quyền học"} · ${String(request.accessType || "vip").toUpperCase()}${created ? ` · Gửi ${created}` : ""}`;
      return `<div class="account-request-item"><div><strong>Đang chờ Admin duyệt</strong><span>${escapeHtml(detail)}</span></div><button class="mini-action danger" type="button" data-cancel-request="${escapeHtml(request.requestId)}">Hủy</button></div>`;
    }).join("");
  }

  function renderAccountPage() {
    const user = state.auth.user;
    if (!user) {
      state.screen = "home";
      render();
      openAuth("login");
      return;
    }
    if (state.account.view === "request") return renderAccessRequestPage();

    const avatarButtons = AVATARS.map((avatar) => `<button class="account-avatar-choice${avatar === user.avatarEmoji ? " selected" : ""}" type="button" data-account-avatar="${escapeHtml(avatar)}" aria-label="Chọn avatar ${escapeHtml(avatar)}" aria-pressed="${avatar === user.avatarEmoji ? "true" : "false"}">${escapeHtml(avatar)}</button>`).join("");
    const isAdmin = user.role === "admin";
    const createdText = formatDate(user.createdAt);
    const adminButtonClass = isAdmin ? "secondary-action" : "secondary-action hidden";
    const requestButtonClass = isAdmin ? "primary-action hidden" : "primary-action";
    const hasPendingRequests = Array.isArray(state.auth.requests) && state.auth.requests.length > 0;
    const requestSection = isAdmin ? "" : `
        <section class="account-section">
          <h2>Yêu cầu đang chờ</h2>
          <div class="account-requests">${accountRequestsHtml()}</div>
          ${hasPendingRequests ? `<button id="account-pending-contact" class="primary-action account-pending-contact" type="button">💬 Liên hệ admin để được duyệt ngay</button>` : ""}
        </section>`;

    el.content.innerHTML = `
      <div class="section-heading">
        <div><h1>👤 Tài khoản</h1><p>Thông tin cá nhân và quyền học của Lớp 1.</p></div>
        <button id="account-back" class="back-btn" type="button">← Lớp 1</button>
      </div>
      <style>
        .account-pending-contact{width:100%;min-height:48px;margin-top:.8rem;font-size:16px!important;font-weight:950!important;}
      </style>
      <section class="account-page" aria-label="Tài khoản đang đăng nhập">
        <div class="account-page-hero">
          <div class="account-page-avatar" aria-hidden="true">${escapeHtml(user.avatarEmoji || "🐰")}</div>
          <div class="account-hero-copy">
            <div class="account-hero-name-row"><strong>${escapeHtml(user.name || "Tài khoản Lớp 1")}</strong>${isAdmin ? `<span class="account-role-chip is-admin">Admin</span>` : ""}</div>
            <div class="account-id-row"><span>ID đăng nhập: <b>${escapeHtml(user.userId || "")}</b></span><button id="account-copy-id" class="mini-action" type="button">Sao chép ID</button></div>
            ${createdText ? `<small>Tạo tài khoản: ${escapeHtml(createdText)}</small>` : ""}
          </div>
        </div>

        ${accountAccessNoticesHtml()}

        <div class="account-page-grid">
          <section class="account-section">
            <h2>Thông tin tài khoản</h2>
            <p>Có thể sửa lại họ tên nếu lúc đăng ký nhập nhầm. ID đăng nhập không thay đổi.</p>
            <div class="account-field-block">
              <label class="account-field-label" for="account-name-input">Họ và tên học sinh</label>
              <div class="account-inline-control">
                <input id="account-name-input" type="text" maxlength="80" autocomplete="name" value="${escapeHtml(user.name || "")}">
                <button id="account-name-save" class="mini-action" type="button">Lưu tên</button>
              </div>
            </div>
            <div class="account-field-block">
              <span class="account-field-label">Avatar</span>
              <div id="account-avatar-picker" class="account-avatar-picker" role="group" aria-label="Chọn avatar">${avatarButtons}</div>
              <div class="account-avatar-save-row">
                <span id="account-avatar-selected-text" class="account-avatar-selected-text">Đang chọn: ${escapeHtml(user.avatarEmoji || "🐰")}</span>
                <button id="account-avatar-save" class="mini-action" type="button">Lưu avatar</button>
              </div>
            </div>
          </section>

          <section class="account-section">
            <h2>Quyền học theo môn</h2>
            <p>${isAdmin ? "Tài khoản Admin có quyền quản lý toàn bộ ba môn." : "Regular chỉ dùng nội dung Free trong Khám phá; Trial/VIP mở nội dung Premium của từng môn."}</p>
            <div class="account-access-list">${accountAccessRowsHtml()}</div>
          </section>
        </div>

        ${requestSection}

        <div class="account-page-actions${isAdmin ? " is-admin" : ""}">
          <button id="account-request-button" class="${requestButtonClass}" type="button">Đăng ký quyền học</button>
          <button id="account-admin-button" class="${adminButtonClass}" type="button">Quản lý</button>
          <button id="account-logout-button" class="secondary-action" type="button">Đăng xuất</button>
        </div>
      </section>`;

    document.getElementById("account-back")?.addEventListener("click", goHome);
    document.getElementById("account-copy-id")?.addEventListener("click", async () => {
      const copied = await copyText(user.userId || "");
      showToast(copied ? "Đã sao chép ID đăng nhập." : `ID đăng nhập: ${user.userId || ""}`);
    });
    document.getElementById("account-request-button")?.addEventListener("click", () => openAccountPage("request"));
    document.getElementById("account-pending-contact")?.addEventListener("click", openAdminZalo);
    document.getElementById("account-admin-button")?.addEventListener("click", openAdmin);
    document.getElementById("account-logout-button")?.addEventListener("click", onLogout);
    el.content.querySelectorAll("[data-account-avatar]").forEach((button) => {
      button.addEventListener("click", () => {
        const avatarEmoji = button.dataset.accountAvatar || "🐰";
        el.content.querySelectorAll("[data-account-avatar]").forEach((item) => {
          const selected = item === button;
          item.classList.toggle("selected", selected);
          item.setAttribute("aria-pressed", selected ? "true" : "false");
        });
        const status = document.getElementById("account-avatar-selected-text");
        if (status) status.textContent = `Đang chọn: ${avatarEmoji}`;
      });
    });
    document.getElementById("account-avatar-save")?.addEventListener("click", onAvatarSave);
    document.getElementById("account-name-save")?.addEventListener("click", onNameSave);
    el.content.querySelectorAll("[data-cancel-request]").forEach((button) => {
      button.addEventListener("click", () => cancelAccessRequest(button.dataset.cancelRequest, button));
    });
  }

  function renderAccessRequestPage() {
    if (!state.auth.user) return openAuth("login");
    if (state.auth.user.role === "admin") {
      state.account.view = "overview";
      render();
      showToast("Tài khoản Admin không cần đăng ký quyền học.");
      return;
    }

    const pendingApiIds = new Set();
    state.auth.requests.forEach((r) => (r.subjectIds || []).forEach((id) => pendingApiIds.add(id)));
    const requestedSubjectId = String(state.account.requestSubjectId || "");
    let eligibleCount = 0;
    const choices = SUBJECTS.map((subject) => {
      const type = accessTypeFor(subject.id);
      const alreadyVip = type === "vip" || type === "admin";
      const pending = pendingApiIds.has(subject.apiId);
      const disabled = alreadyVip || pending;
      const checked = !disabled && requestedSubjectId === subject.id;
      if (!disabled) eligibleCount += 1;
      const note = alreadyVip
        ? "Đang có VIP"
        : pending
          ? "Đang chờ duyệt"
          : type === "trial"
            ? "Đang Trial · Có thể đăng ký VIP"
            : "Có thể đăng ký VIP";
      return `<label class="subject-choice${disabled ? " is-disabled" : ""}"><input type="checkbox" name="subject-choice" value="${escapeHtml(subject.apiId)}"${disabled ? " disabled" : ""}${checked ? " checked" : ""}><span><strong>${escapeHtml(subject.fullLabel)}</strong><small>${note}</small></span></label>`;
    }).join("");

    const body = eligibleCount > 0 ? `
        <p class="access-request-note">Bạn cần liên hệ với admin để thanh toán biểu phí quyền học VIP và được duyệt</p>
        <form id="access-request-form" class="form-stack" novalidate>
          <div class="subject-choice-list">${choices}</div>
          <div class="access-request-summary-grid" role="status" aria-live="polite">
            <div id="access-request-selection-summary" class="access-request-summary-card selection">Bạn chưa chọn môn nào</div>
            <div id="access-request-price-summary" class="access-request-summary-card price">Tổng tiền thanh toán 0k/năm</div>
          </div>
          <div class="vip-request-actions" role="group" aria-label="Tùy chọn đăng ký quyền học VIP">
            <button id="access-request-vip-info" class="vip-request-action vip-request-info" type="button">Biểu phí và quyền lợi VIP</button>
            <button id="access-request-admin-contact" class="vip-request-action vip-request-contact" type="button">Liên hệ admin</button>
            <button id="access-request-submit" class="primary-action vip-request-submit" type="submit">Gửi yêu cầu VIP</button>
          </div>
        </form>` : `
        <div class="account-request-empty">Hiện không còn môn nào có thể gửi yêu cầu mới. Môn đã có quyền hoặc đang chờ duyệt sẽ không gửi trùng.</div>`;

    el.content.innerHTML = `
      <style>
        .vip-request-heading h1{font-size:clamp(24px,2.2vw,30px)!important;}
        .vip-request-heading p{font-size:16px!important;line-height:1.45!important;font-weight:800!important;}
        .account-request-page .access-request-note{font-size:16px!important;line-height:1.55!important;font-weight:850!important;}
        .account-request-page .subject-choice strong{font-size:17px!important;line-height:1.3!important;font-weight:900!important;}
        .account-request-page .subject-choice small{font-size:16px!important;line-height:1.4!important;font-weight:800!important;}
        .access-request-summary-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.65rem;margin-top:.05rem}
        .access-request-summary-card{min-height:48px;display:flex;align-items:center;justify-content:center;padding:.65rem .8rem;border:1px solid;border-radius:14px;font-size:16px!important;line-height:1.35!important;font-weight:900!important;text-align:center}
        .access-request-summary-card.selection{border-color:#d8b4fe;background:linear-gradient(90deg,#faf5ff,#fdf2f8);color:#6d28d9}
        .access-request-summary-card.price{border-color:#67e8f9;background:linear-gradient(90deg,#eff6ff,#ecfdf5);color:#0369a1}
        .vip-request-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.65rem;margin-top:.1rem}
        .vip-request-actions button{width:100%;min-width:0;min-height:52px;margin:0!important;border-radius:14px;padding:.7rem .8rem;font-family:inherit;font-size:16px!important;font-weight:950;line-height:1.25}
        .vip-request-info{border:0;color:#fff;background:linear-gradient(90deg,#38bdf8,#3b82f6);box-shadow:0 6px 16px rgba(59,130,246,.20)}
        .vip-request-contact{border:0;color:#fff;background:linear-gradient(90deg,#34d399,#10b981);box-shadow:0 6px 16px rgba(16,185,129,.20)}
        .vip-request-submit{border:0!important;color:#fff!important;background:linear-gradient(90deg,#a855f7,#7c3aed)!important;box-shadow:0 6px 16px rgba(124,58,237,.22)}
        @media(max-width:720px){
          .access-request-summary-grid{grid-template-columns:1fr}
          .vip-request-actions{grid-template-columns:1fr}
          .account-request-page .subject-choice strong{font-size:16px!important}
          .account-request-page .subject-choice small{font-size:16px!important}
        }
      </style>
      <div class="section-heading vip-request-heading">
        <div><h1>🌟 Đăng ký quyền học</h1><p>Đăng ký VIP theo từng môn.</p></div>
        <button id="access-request-back" class="back-btn" type="button">← Tài khoản</button>
      </div>
      <section class="account-request-page account-section">${body}</section>`;

    document.getElementById("access-request-back")?.addEventListener("click", () => openAccountPage("overview"));
    document.getElementById("access-request-vip-info")?.addEventListener("click", () => {
      openHomeTab("contact");
      state.contactTab = "vip";
      render();
      focusContent();
    });
    document.getElementById("access-request-admin-contact")?.addEventListener("click", openAdminZalo);
    const form = document.getElementById("access-request-form");
    form?.addEventListener("submit", onAccessRequestSubmit);
    const updateSummary = () => {
      if (!form) return;
      const count = form.querySelectorAll('input[name="subject-choice"]:checked').length;
      const selectionSummary = document.getElementById("access-request-selection-summary");
      const priceSummary = document.getElementById("access-request-price-summary");
      const submit = document.getElementById("access-request-submit");
      const priceByCount = { 0: "0k/năm", 1: "80k/năm", 2: "160k/năm", 3: "210k/năm" };
      if (selectionSummary) selectionSummary.textContent = count ? `Bạn đã chọn ${count} môn` : "Bạn chưa chọn môn nào";
      if (priceSummary) priceSummary.textContent = `Tổng tiền thanh toán ${priceByCount[count] || "0k/năm"}`;
      if (submit) submit.textContent = count ? `Gửi yêu cầu VIP · ${count} môn` : "Gửi yêu cầu VIP";
    };
    form?.querySelectorAll('input[name="subject-choice"]').forEach((input) => input.addEventListener("change", updateSummary));
    updateSummary();
  }

  async function cancelAccessRequest(requestId, button) {
    const safeRequestId = String(requestId || "").trim();
    if (!safeRequestId) return showToast("Yêu cầu không hợp lệ.");

    const removePendingLocally = () => {
      state.auth.requests = (state.auth.requests || []).filter((item) => String(item.requestId || "") !== safeRequestId);
      if (state.screen === "account") render();
    };

    setButtonBusy(button, true, "Đang hủy…");
    try {
      await apiRequest("accessRequestCancel", { requestId: safeRequestId });
      removePendingLocally();
      // Đồng bộ lại từ server sau khi UI đã phản hồi ngay. Nếu refresh tạm lỗi,
      // thao tác hủy vẫn không bị báo thất bại giả vì backend đã xác nhận thành công.
      await refreshAccessState(false);
      if (state.screen === "account") render();
      showToast("Đã hủy yêu cầu quyền học.");
    } catch (err) {
      // Một POST có thể đã ghi thành công ở server nhưng phản hồi về client bị lỗi mạng/timeout.
      // Khi đó xác minh lại bằng API đọc trước khi kết luận thất bại.
      if (err && err.code !== "UNAUTHORIZED" && err.code !== "FORBIDDEN") {
        try {
          const data = await apiRequest("accessStateGet");
          if (data.user && data.user.userId) {
            state.auth.user = {
              userId: String(data.user.userId || ""),
              name: String(data.user.name || ""),
              role: String(data.user.role || "student").toLowerCase() === "admin" ? "admin" : "student",
              avatarEmoji: AVATARS.includes(String(data.user.avatarEmoji || "")) ? String(data.user.avatarEmoji) : "🐰",
              createdAt: data.user.createdAt || ""
            };
          }
          state.auth.access = normalizeAccess(data.access || {});
          state.auth.requests = Array.isArray(data.requests) ? data.requests : [];
          const stillPending = state.auth.requests.some((item) => String(item.requestId || "") === safeRequestId);
          updateAccountButton();
          if (!stillPending) {
            if (state.screen === "account") render();
            showToast("Đã hủy yêu cầu quyền học.");
            return;
          }
        } catch (_) {
          // Không che lỗi gốc nếu cả bước xác minh lại cũng thất bại.
        }
      }

      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  function accessExpiryText(type, endAt) {
    if (type === "admin") return "Quyền Admin";
    if (type === "regular") return "Nội dung Free trong Khám phá";
    const formatted = formatDate(endAt);
    return formatted ? `Đến ${formatted}` : "Đang có hiệu lực";
  }

  function apiIdToLabel(apiId) {
    const subject = SUBJECTS.find((s) => s.apiId === apiId);
    return subject ? subject.fullLabel : "";
  }

  function validateRegistration() {
    const name = document.getElementById("register-name").value.trim();
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("register-confirm").value;
    if (!name) return "Vui lòng nhập họ và tên học sinh.";
    if (name.length > 80) return "Họ và tên tối đa 80 ký tự.";
    if (password.length < 6 || password.length > 128) return "Mật khẩu cần từ 6 đến 128 ký tự.";
    if (password !== confirm) return "Hai lần nhập mật khẩu chưa trùng nhau.";
    return "";
  }

  async function onLoginSubmit(event) {
    event.preventDefault();
    const id = document.getElementById("login-id").value.trim().toUpperCase();
    const password = document.getElementById("login-password").value;
    if (!id || !password) return showToast("Vui lòng nhập ID và mật khẩu.");

    setButtonBusy(el.loginSubmit, true, "Đang đăng nhập…");
    try {
      const data = await apiRequest("login", { userId: id, password }, { auth: false });
      applyAuthData(data, data.token);
      document.getElementById("login-password").value = "";
      closeAuth();
      render();
      showWelcomeGreeting(state.auth.user && state.auth.user.name);
    } catch (err) {
      showToast(friendlyError(err, "login"));
    } finally {
      setButtonBusy(el.loginSubmit, false);
    }
  }

  // Một lần đăng ký dùng cùng một ID ngẫu nhiên qua các lần thử lại (kể cả F5
  // trong cùng tab). Chỉ lưu ID yêu cầu kỹ thuật, tuyệt đối không lưu mật khẩu.
  const REGISTRATION_PENDING_ID_KEY = "class1.registration.pendingRequestId.v1";
  let registrationPendingId = "";
  let registrationBusy = false;

  function clearPendingRegistrationId() {
    registrationPendingId = "";
    try { window.sessionStorage.removeItem(REGISTRATION_PENDING_ID_KEY); } catch (_) {}
  }

  function pendingRegistrationId() {
    if (registrationPendingId) return registrationPendingId;
    try {
      const previous = String(window.sessionStorage.getItem(REGISTRATION_PENDING_ID_KEY) || "");
      if (/^[a-f0-9]{32}$/.test(previous)) {
        registrationPendingId = previous;
        return previous;
      }
    } catch (_) {}
    // Không dùng Date.now/Math.random để tạo mã yêu cầu có thể đoán được.
    if (!window.crypto || typeof window.crypto.getRandomValues !== "function") {
      throw new Error("SECURE_RANDOM_UNAVAILABLE");
    }
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    registrationPendingId = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    try { window.sessionStorage.setItem(REGISTRATION_PENDING_ID_KEY, registrationPendingId); } catch (_) {}
    return registrationPendingId;
  }

  async function onRegisterSubmit(event) {
    event.preventDefault();
    if (registrationBusy) return;
    const error = validateRegistration();
    if (error) return showToast(error);

    const name = document.getElementById("register-name").value.trim();
    const password = document.getElementById("register-password").value;
    registrationBusy = true;
    setButtonBusy(el.registerSubmit, true, "Đang đăng ký…");
    try {
      const registrationRequestId = pendingRegistrationId();
      const data = await apiRequest("register", { name, password, registrationRequestId }, { auth: false });
      applyAuthData(data, data.token);
      clearPendingRegistrationId(); // Chỉ xóa khi đã xác nhận nhận lại tài khoản từ server.
      document.getElementById("register-password").value = "";
      document.getElementById("register-confirm").value = "";
      closeAuth();
      render();
      const userId = state.auth.user.userId;
      showDialog({
        title: "Cô Thỏ Hồng: Con đã có tài khoản rồi!",
        message: `Tên: ${state.auth.user.name}\nID đăng nhập: ${userId}\n\nCon nhớ lưu lại ID này để đăng nhập lần sau nhé.`,
        icon: "🎉",
        primaryLabel: "Vào học",
        secondaryLabel: "Sao chép ID",
        onPrimary: () => showWelcomeGreeting(state.auth.user && state.auth.user.name),
        onSecondary: async () => {
          const copied = await copyText(userId);
          showToast(copied ? "Đã sao chép ID." : `ID của bạn: ${userId}`);
        }
      });
    } catch (err) {
      if (err && err.code === "REGISTER_REQUEST_CONFLICT") {
        // Không tự cấp ID yêu cầu mới: lần đầu có thể đã ghi tài khoản thành công.
        showDialog({
          title: "Thông tin đăng ký chưa khớp",
          message: "Có thể tài khoản đã được tạo ở lần đăng ký trước. Nếu đang thử lại, hãy dùng đúng tên và mật khẩu ban đầu. Chỉ chọn đăng ký mới khi thực sự muốn tạo tài khoản khác.",
          icon: "🐰",
          primaryLabel: "Kiểm tra lại",
          secondaryLabel: "Đăng ký tài khoản khác",
          onSecondary: () => {
            clearPendingRegistrationId();
            el.registerForm.reset();
            hideDialog();
            document.getElementById("register-name")?.focus();
          }
        });
      } else if (err && err.message === "SECURE_RANDOM_UNAVAILABLE") {
        showToast("Trình duyệt chưa hỗ trợ đăng ký an toàn. Vui lòng dùng trình duyệt mới hơn.");
      } else {
        // Không xóa ID khi timeout/lỗi mạng/lỗi server: retry phải trở về đúng tài khoản cũ.
        showToast(err && err.kind === "network"
          ? "Chưa nhận được kết quả đăng ký. Bé hãy giữ nguyên thông tin và thử lại nhé."
          : friendlyError(err, "register"));
      }
    } finally {
      registrationBusy = false;
      setButtonBusy(el.registerSubmit, false);
    }
  }

  async function onAccessRequestSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector('button[type="submit"]');
    const subjectIds = Array.from(form.querySelectorAll('input[name="subject-choice"]:checked')).map((input) => input.value);
    if (subjectIds.length < 1 || subjectIds.length > 3) return showToast("Vui lòng chọn từ 1 đến 3 môn.");

    setButtonBusy(submit, true, "Đang gửi…");
    try {
      await apiRequest("accessRequestCreate", { subjectIds, accessType: "vip" });
      await refreshAccessState(false);
      state.account.view = "overview";
      state.account.requestSubjectId = "";
      render();
      showToast("Đã gửi yêu cầu. Vui lòng chờ Admin duyệt.");
    } catch (err) {
      showToast(friendlyError(err));
    } finally {
      if (state.screen === "account" && state.account.view === "request") setButtonBusy(submit, false);
    }
  }

  async function onAvatarSave() {
    const selected = document.querySelector(".account-avatar-choice.selected[data-account-avatar]");
    const button = document.getElementById("account-avatar-save");
    if (!selected || !button) return;
    const avatarEmoji = selected.dataset.accountAvatar || "🐰";
    if (!AVATARS.includes(avatarEmoji)) {
      showToast("Avatar không hợp lệ.");
      return;
    }
    setButtonBusy(button, true, "Đang lưu…");
    try {
      const data = await apiRequest("avatarUpdate", { avatarEmoji });
      if (data.user) {
        state.auth.user.avatarEmoji = AVATARS.includes(data.user.avatarEmoji) ? data.user.avatarEmoji : "🐰";
        updateAccountButton();
      }
      if (state.screen === "account") render();
      showToast("Đã cập nhật avatar.");
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  async function onNameSave() {
    const input = document.getElementById("account-name-input");
    const button = document.getElementById("account-name-save");
    if (!input || !button) return;
    const name = input.value.trim();
    if (!name) return showToast("Vui lòng nhập họ và tên học sinh.");
    if (name.length > 80) return showToast("Họ và tên tối đa 80 ký tự.");
    if (name === state.auth.user.name) return showToast("Tên hiện tại chưa thay đổi.");

    setButtonBusy(button, true, "Đang lưu…");
    try {
      const data = await apiRequest("profileNameUpdate", { name });
      if (data.user && data.user.userId === state.auth.user.userId) {
        state.auth.user.name = String(data.user.name || name);
        updateAccountButton();
      }
      if (state.screen === "account") render();
      showToast("Đã cập nhật họ tên.");
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  function onLogout() {
    showDialog({
      title: "Đăng xuất tài khoản?",
      message: "Bạn sẽ cần nhập lại ID và mật khẩu để đăng nhập lần sau.",
      icon: "👋",
      primaryLabel: "Đăng xuất",
      secondaryLabel: "Ở lại",
      onPrimary: performLogout,
      onSecondary: hideDialog
    });
  }

  async function performLogout() {
    stopWelcomeGreeting();
    const button = document.getElementById("account-logout-button");
    if (!state.auth.token) {
      clearAuthState();
      goHome();
      return;
    }
    setButtonBusy(button, true, "Đang đăng xuất…");
    try {
      await apiRequest("logout");
      clearAuthState();
      goHome();
      showToast("Đã đăng xuất.");
    } catch (err) {
      if (err.code === "UNAUTHORIZED") {
        clearAuthState();
        goHome();
        showToast("Phiên đăng nhập đã kết thúc.");
      } else {
        setButtonBusy(button, false);
        showToast("Chưa đăng xuất được. Vui lòng thử lại.");
      }
    }
  }

  function openAdmin() {
    if (state.screen === "subject" && state.subjectId) destroySubjectModule(state.subjectId);
    if (!state.auth.user || state.auth.user.role !== "admin") return;
    state.screen = "admin";
    state.homeTab = "admin";
    state.subjectId = null;
    state.detail = null;
    state.admin.tab = "requests";
    state.admin.loading = true;
    render();
    focusContent();
    loadAdminData();
  }

  async function refreshAdminPendingBadge(force = false) {
    if (!state.auth.user || state.auth.user.role !== "admin" || !state.auth.token) return;
    const now = Date.now();
    if (state.admin.badgeLoading) return;
    if (!force && state.admin.badgeUpdatedAt && now - state.admin.badgeUpdatedAt < 30000) return;
    state.admin.badgeLoading = true;
    try {
      const data = await apiRequest("adminAccessRequestsList");
      const rows = Array.isArray(data.requests) ? data.requests : [];
      state.admin.requests = rows;
      state.admin.pendingCount = rows.length;
      state.admin.badgeUpdatedAt = Date.now();
      if (state.admin.overview) state.admin.overview.pendingRequests = rows.length;
      renderNav();
      if (state.screen === "admin" && state.admin.loaded && state.admin.tab === "requests") renderAdmin();
    } catch (err) {
      if (err.code === "UNAUTHORIZED" || err.code === "FORBIDDEN") return;
    } finally {
      state.admin.badgeLoading = false;
    }
  }

  async function loadAdminData() {
    if (!state.auth.user || state.auth.user.role !== "admin") return;
    state.admin.loading = true;
    render();
    try {
      const [overviewData, requestData, userData] = await Promise.all([
        apiRequest("adminOverviewGet"),
        apiRequest("adminAccessRequestsList"),
        apiRequest("adminUsersList")
      ]);
      state.admin.overview = overviewData;
      state.admin.requests = Array.isArray(requestData.requests) ? requestData.requests : [];
      state.admin.users = Array.isArray(userData.users) ? userData.users : [];
      state.admin.pendingCount = state.admin.requests.length;
      state.admin.badgeUpdatedAt = Date.now();
      state.admin.loaded = true;
    } catch (err) {
      state.admin.loaded = false;
      showToast(friendlyError(err));
      if (err.code === "UNAUTHORIZED" || err.code === "FORBIDDEN") goHome();
    } finally {
      state.admin.loading = false;
      if (state.screen === "admin") render();
      else renderNav();
    }
  }

  function adminUserClass(user) {
    const role = String(user.role || "student").toLowerCase();
    const access = normalizeAccess(user.access || {});
    const hasVip = SUBJECTS.some((subject) => access[subject.id]?.type === "vip");
    const hasTrial = SUBJECTS.some((subject) => access[subject.id]?.type === "trial");
    const isAdmin = role === "admin";
    return { role, access, isAdmin, hasVip, hasTrial, isRegular: !isAdmin && !hasVip && !hasTrial };
  }

  function renderAdminAccessChips(user) {
    const info = adminUserClass(user);
    if (info.isAdmin) return `<span class="admin-chip admin">ADMIN · toàn bộ ba môn</span>`;
    const chips = SUBJECTS.map((subject) => {
      const item = info.access[subject.id] || { type: "regular", endAt: "" };
      if (item.type !== "vip" && item.type !== "trial") return "";
      const date = formatDate(item.endAt);
      return `<span class="admin-chip ${escapeHtml(item.type)}">${escapeHtml(subject.fullLabel)} · ${escapeHtml(item.type.toUpperCase())}${date ? ` · ${escapeHtml(date)}` : ""}</span>`;
    }).filter(Boolean).join("");
    return chips || `<span class="admin-regular-label">Regular · chưa có quyền Trial/VIP</span>`;
  }

  function renderAdminUserRow(user) {
    const info = adminUserClass(user);
    const rowClass = info.isAdmin ? "is-admin" : (info.hasVip ? "has-vip" : (info.hasTrial ? "has-trial" : "is-regular"));
    const badge = info.isAdmin
      ? `<span class="account-type-badge admin">ADMIN</span>`
      : info.hasVip
        ? `<span class="account-type-badge vip">VIP</span>`
        : info.hasTrial
          ? `<span class="account-type-badge trial">TRIAL</span>`
          : "";
    const created = formatDate(user.createdAt);
    const recent = user.lastLearningAt ? ` · Học gần nhất ${escapeHtml(formatDate(user.lastLearningAt))}` : "";
    return `<div class="admin-user-row ${rowClass}">
      <div class="admin-user-primary"><span class="admin-list-avatar">${escapeHtml(user.avatarEmoji || "🐰")}</span><div><div class="admin-user-id">${escapeHtml(user.userId)} ${badge}</div><div class="admin-user-name">${escapeHtml(user.name || "")}</div></div></div>
      <div class="admin-user-meta-block"><div class="admin-user-role">${info.isAdmin ? "Admin" : "Học sinh"}</div><div class="admin-user-meta">${created ? `Tạo ${escapeHtml(created)}` : ""}${recent}</div></div>
      <div class="admin-access-chips">${renderAdminAccessChips(user)}</div>
    </div>`;
  }

  function filterAndSortAdminUsers() {
    const query = String(state.admin.userQuery || "").trim().toLowerCase();
    const type = state.admin.userFilter || "all";
    const mode = state.admin.userSort || "id-asc";
    const rows = state.admin.users.filter((user) => {
      const info = adminUserClass(user);
      const matchesQuery = !query || `${user.userId || ""} ${user.name || ""}`.toLowerCase().includes(query);
      let matchesType = true;
      if (type === "admin") matchesType = info.isAdmin;
      if (type === "vip") matchesType = info.hasVip;
      if (type === "trial") matchesType = info.hasTrial;
      if (type === "regular") matchesType = info.isRegular;
      return matchesQuery && matchesType;
    });

    return rows.sort((a, b) => {
      const ai = adminUserClass(a);
      const bi = adminUserClass(b);
      const rank = (info) => {
        if (mode === "admin-first") return info.isAdmin ? 0 : 1;
        if (mode === "vip-first") return info.hasVip ? 0 : 1;
        if (mode === "trial-first") return info.hasTrial ? 0 : 1;
        if (mode === "regular-first") return info.isRegular ? 0 : 1;
        return 0;
      };
      if (["admin-first", "vip-first", "trial-first", "regular-first"].includes(mode)) {
        const diff = rank(ai) - rank(bi);
        if (diff) return diff;
      }
      if (mode === "id-desc") return String(b.userId || "").localeCompare(String(a.userId || ""), "vi", { numeric: true });
      if (mode === "name-asc") return String(a.name || "").localeCompare(String(b.name || ""), "vi");
      if (mode === "name-desc") return String(b.name || "").localeCompare(String(a.name || ""), "vi");
      if (mode === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (mode === "oldest") return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      return String(a.userId || "").localeCompare(String(b.userId || ""), "vi", { numeric: true });
    });
  }

  function adminSubjectToneClass(apiId) {
    const id = String(apiId || "").trim().toLowerCase();
    if (id === "toan") return "subject-math";
    if (id === "tv") return "subject-vietnamese";
    if (id === "ta") return "subject-english";
    return "";
  }

  function renderAdminRequestSubjects(subjectIds) {
    return (Array.isArray(subjectIds) ? subjectIds : []).map((apiId) => {
      const label = apiIdToLabel(apiId);
      if (!label) return "";
      return `<span class="admin-request-subject ${adminSubjectToneClass(apiId)}">${escapeHtml(label)}</span>`;
    }).filter(Boolean).join('<span class="admin-request-subject-sep">,</span>');
  }

  function renderAdminRequestsTab() {
    const rows = state.admin.requests;
    const subjectCount = new Set(rows.flatMap((r) => Array.isArray(r.subjectIds) ? r.subjectIds : [])).size;
    const summaryText = rows.length
      ? `Có ${rows.length} yêu cầu ở ${subjectCount || 1} môn học đang chờ duyệt.`
      : "Hiện không có yêu cầu nào đang chờ duyệt.";
    const requests = rows.length ? rows.map((request) => {
      const subjectsHtml = renderAdminRequestSubjects(request.subjectIds);
      const busyDecision = adminRequestBusy.get(String(request.requestId || "")) || "";
      const isBusy = !!busyDecision;
      const disabledAttr = isBusy ? ' disabled aria-disabled="true"' : "";
      const vipLabel = busyDecision === "approve-vip" ? '<span class="spinner" aria-hidden="true"></span><span>Đang duyệt VIP…</span>' : "Duyệt VIP";
      const trialLabel = busyDecision === "approve-trial" ? '<span class="spinner" aria-hidden="true"></span><span>Đang duyệt Trial…</span>' : "Duyệt Trial";
      const rejectLabel = busyDecision === "reject" ? '<span class="spinner" aria-hidden="true"></span><span>Đang từ chối…</span>' : "Từ chối";
      return `<div class="admin-request pending${isBusy ? " is-busy" : ""}" data-request-id="${escapeHtml(request.requestId)}"${isBusy ? ' aria-busy="true"' : ""}>
        <div class="admin-request-main">
          <div class="admin-request-title"><strong>${escapeHtml(request.name || request.userId)}</strong><span class="admin-chip pending">CHỜ DUYỆT</span></div>
          <div class="admin-muted admin-request-meta"><span>${escapeHtml(request.userId)}</span><span class="admin-request-dot">·</span>${subjectsHtml || `<span>Chưa xác định môn</span>`}</div>
          <div class="admin-muted">Yêu cầu ${escapeHtml(String(request.accessType || "vip").toUpperCase())} · gửi ${escapeHtml(formatDateTime(request.createdAt) || "")}</div>
          ${request.note ? `<div class="admin-muted">Ghi chú: ${escapeHtml(request.note)}</div>` : ""}
        </div>
        <div class="admin-request-actions">
          <button class="mini-action approve-vip" data-request-decision="approve-vip" type="button"${disabledAttr}>${vipLabel}</button>
          <button class="mini-action approve-trial" data-request-decision="approve-trial" type="button"${disabledAttr}>${trialLabel}</button>
          <button class="mini-action danger" data-request-decision="reject" type="button"${disabledAttr}>${rejectLabel}</button>
        </div>
      </div>`;
    }).join("") : `<div class="admin-empty">Không có yêu cầu chờ xử lý.</div>`;

    return `<div class="admin-summary"><div><strong>${escapeHtml(summaryText)}</strong><div class="admin-muted">Mặc định mở tab này để Admin thấy ngay việc cần xử lý.</div></div><button id="admin-refresh" class="mini-action" type="button">Làm mới</button></div><div class="admin-table">${requests}</div>`;
  }

  function renderAdminUsersTab() {
    const rows = filterAndSortAdminUsers();
    const filters = [
      ["all", "Tất cả", ""], ["admin", "Admin", "admin"], ["vip", "VIP", "vip"], ["trial", "Trial", "trial"], ["regular", "Regular", "regular"]
    ].map(([value, label, cls]) => `<button type="button" class="admin-filter-chip ${cls}${state.admin.userFilter === value ? " active" : ""}" data-user-filter="${value}">#${label}</button>`).join("");
    const list = rows.length ? rows.slice(0, 100).map(renderAdminUserRow).join("") : `<div class="admin-empty">Không tìm thấy người dùng phù hợp với bộ lọc hiện tại.</div>`;
    return `<div class="admin-summary"><div><strong><span class="admin-user-count">${rows.length}</span> / ${state.admin.users.length} tài khoản</strong><div class="admin-muted">Tìm kiếm, lọc bằng hashtag và sắp xếp tức thời.</div></div><div class="admin-user-tools"><input id="admin-user-search" aria-label="Tìm người dùng" placeholder="Tìm tên hoặc UserId" value="${escapeHtml(state.admin.userQuery)}"><select id="admin-user-sort" aria-label="Sắp xếp người dùng"><option value="id-asc"${state.admin.userSort === "id-asc" ? " selected" : ""}>UserId tăng dần</option><option value="id-desc"${state.admin.userSort === "id-desc" ? " selected" : ""}>UserId giảm dần</option><option value="name-asc"${state.admin.userSort === "name-asc" ? " selected" : ""}>Tên A → Z</option><option value="name-desc"${state.admin.userSort === "name-desc" ? " selected" : ""}>Tên Z → A</option><option value="newest"${state.admin.userSort === "newest" ? " selected" : ""}>Mới đăng ký trước</option><option value="oldest"${state.admin.userSort === "oldest" ? " selected" : ""}>Cũ đăng ký trước</option><option value="admin-first"${state.admin.userSort === "admin-first" ? " selected" : ""}>Admin trước</option><option value="vip-first"${state.admin.userSort === "vip-first" ? " selected" : ""}>VIP trước</option><option value="trial-first"${state.admin.userSort === "trial-first" ? " selected" : ""}>Trial trước</option><option value="regular-first"${state.admin.userSort === "regular-first" ? " selected" : ""}>Regular trước</option></select></div></div><div class="admin-user-filters">${filters}</div><div class="admin-filter-note">Lớp 1 chỉ quản lý tài khoản của website Lớp 1; không có email/lớp hành chính trong hồ sơ.</div><div class="admin-table admin-user-table">${list}</div>`;
  }

  function renderAdminAccessTab() {
    const query = String(state.admin.accessQuery || "").trim().toLowerCase();
    const rows = state.admin.users.filter((user) => !query || `${user.userId || ""} ${user.name || ""}`.toLowerCase().includes(query)).slice(0, 100);
    const list = rows.length ? rows.map(renderAdminUserCard).join("") : `<div class="admin-empty">Không tìm thấy tài khoản phù hợp.</div>`;
    return `<div class="admin-summary"><div><strong>Quyền học theo môn</strong><div class="admin-muted">Cấp hoặc thu hồi Trial/VIP riêng cho Toán 1, Tiếng Việt 1 và Tiếng Anh 1. Reset mật khẩu cũng thực hiện tại đây.</div></div><div class="admin-user-tools"><input id="admin-access-search" aria-label="Tìm tài khoản để sửa quyền" placeholder="Tìm tên hoặc UserId" value="${escapeHtml(state.admin.accessQuery)}"></div></div><div class="admin-table admin-access-management">${list}</div>`;
  }

  function renderAdminOverviewTab() {
    const o = state.admin.overview || {};
    const classified = state.admin.users.map(adminUserClass);
    const usersWithVip = classified.filter((x) => x.hasVip).length;
    const usersWithTrial = classified.filter((x) => x.hasTrial).length;
    const regularOnly = classified.filter((x) => x.isRegular).length;
    const cards = [
      ["Tổng tài khoản", Number(o.totalUsers || state.admin.users.length || 0)],
      ["Học sinh", Number(o.studentUsers || 0)],
      ["Admin", Number(o.adminUsers || 0)],
      ["Chỉ Regular", regularOnly],
      ["Có VIP", usersWithVip],
      ["Có Trial", usersWithTrial],
      ["Yêu cầu chờ", Number(state.admin.pendingCount || 0)],
      ["Hoạt động 30 ngày", Number(o.active30Days || 0)]
    ].map(([label, value]) => `<div class="admin-stat"><strong>${escapeHtml(String(value))}</strong><small>${escapeHtml(label)}</small></div>`).join("");

    const subjectRows = SUBJECTS.map((subject) => {
      const s = o.subjectAccess && o.subjectAccess[subject.apiId] ? o.subjectAccess[subject.apiId] : { vip: 0, trial: 0, total: 0 };
      return `<div class="admin-subject-row"><strong>${escapeHtml(subject.fullLabel)}</strong><span class="admin-chip vip">VIP ${Number(s.vip || 0)}</span><span class="admin-chip trial">Trial ${Number(s.trial || 0)}</span><span class="admin-muted">Tổng ${Number(s.total || 0)}</span></div>`;
    }).join("");
    return `<div class="admin-stat-grid overview">${cards}</div><div class="admin-summary"><div><strong>Phân bố quyền theo môn</strong><div class="admin-muted">Một học sinh có thể đồng thời có VIP ở môn này và Trial ở môn khác.</div></div></div><div class="admin-table">${subjectRows}</div>`;
  }

  function renderAdmin() {
    if (!state.auth.user || state.auth.user.role !== "admin") {
      goHome();
      return;
    }

    if (state.admin.loading && !state.admin.loaded) {
      el.content.innerHTML = `<div class="section-heading"><div><h1>🛡️ Quản lý Lớp 1</h1><p>Đang tải dữ liệu quản lý…</p></div><button id="admin-back" class="back-btn" type="button">← Lớp 1</button></div><div class="empty-panel"><div><span class="inline-spinner" aria-hidden="true"></span><strong>Đang tải…</strong></div></div>`;
      document.getElementById("admin-back")?.addEventListener("click", goHome);
      return;
    }

    const tabs = [
      ["requests", "Yêu cầu", state.admin.pendingCount],
      ["users", "Người dùng", null],
      ["access", "Quyền học", null],
      ["overview", "Tổng quan", null]
    ].map(([id, label, count]) => `<button class="admin-tab${state.admin.tab === id ? " active" : ""}" type="button" data-admin-tab="${id}">${label}${count !== null ? ` <span class="admin-tab-count">${Number(count || 0)}</span>` : ""}</button>`).join("");

    let body = renderAdminRequestsTab();
    if (state.admin.tab === "users") body = renderAdminUsersTab();
    if (state.admin.tab === "access") body = renderAdminAccessTab();
    if (state.admin.tab === "overview") body = renderAdminOverviewTab();

    el.content.innerHTML = `<div class="section-heading"><div><h1>🛡️ Quản lý Lớp 1</h1><p>Quản lý yêu cầu, người dùng và quyền học trong một khu vực riêng.</p></div><button id="admin-back" class="back-btn" type="button">← Lớp 1</button></div><div class="admin-tabs" role="tablist" aria-label="Chức năng quản lý">${tabs}</div><section class="admin-workspace">${body}</section>`;

    document.getElementById("admin-back")?.addEventListener("click", goHome);
    document.getElementById("admin-refresh")?.addEventListener("click", loadAdminData);
    el.content.querySelectorAll("[data-admin-tab]").forEach((button) => button.addEventListener("click", () => {
      const next = String(button.dataset.adminTab || "requests");
      if (!["requests", "users", "access", "overview"].includes(next)) return;
      state.admin.tab = next;
      renderAdmin();
    }));

    el.content.querySelectorAll("[data-request-decision]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest("[data-request-id]");
        resolveAccessRequest(card?.dataset.requestId || "", button.dataset.requestDecision, button);
      });
    });

    const userSearch = document.getElementById("admin-user-search");
    userSearch?.addEventListener("input", () => {
      state.admin.userQuery = userSearch.value;
      renderAdmin();
      const next = document.getElementById("admin-user-search");
      if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length); }
    });
    document.getElementById("admin-user-sort")?.addEventListener("change", (event) => {
      state.admin.userSort = event.target.value || "id-asc";
      renderAdmin();
    });
    el.content.querySelectorAll("[data-user-filter]").forEach((button) => button.addEventListener("click", () => {
      state.admin.userFilter = button.dataset.userFilter || "all";
      renderAdmin();
    }));

    const accessSearch = document.getElementById("admin-access-search");
    accessSearch?.addEventListener("input", () => {
      state.admin.accessQuery = accessSearch.value;
      renderAdmin();
      const next = document.getElementById("admin-access-search");
      if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length); }
    });

    el.content.querySelectorAll("[data-save-access]").forEach((button) => button.addEventListener("click", () => saveAdminAccess(button)));
    el.content.querySelectorAll("[data-reset-password]").forEach((button) => button.addEventListener("click", () => resetAdminPassword(button)));
  }

  function renderAdminUserCard(user) {
    const role = String(user.role || "student");
    const access = normalizeAccess(user.access || {});
    const controls = role === "admin"
      ? `<div class="admin-note">Tài khoản Admin có quyền quản lý toàn bộ ba môn. Quyền Admin luôn được backend kiểm tra lại trước mỗi thao tác.</div>`
      : `<div class="admin-user-controls admin-user-controls-compact">
          <div class="admin-access-fields-grid">
            ${SUBJECTS.map((subject) => {
              const type = access[subject.id]?.type || "regular";
              const expiry = access[subject.id]?.endAt ? formatDate(access[subject.id].endAt) : "";
              const toneClass = adminSubjectToneClass(subject.apiId);
              return `<div class="admin-access-field ${toneClass}"><label><span>${escapeHtml(subject.label)}</span><small>${expiry ? `Hết hạn ${escapeHtml(expiry)}` : "Regular"}</small></label><select data-access-select="${subject.apiId}" aria-label="Quyền ${escapeHtml(subject.label)}"><option value="regular"${type === "regular" ? " selected" : ""}>Regular</option><option value="trial"${type === "trial" ? " selected" : ""}>Trial</option><option value="vip"${type === "vip" ? " selected" : ""}>VIP</option></select></div>`;
            }).join("")}
            <div class="admin-access-field admin-password-field"><label><span>Mật khẩu mới</span><small>6–128 ký tự</small></label><input type="password" minlength="6" maxlength="128" autocomplete="new-password" data-reset-input="${escapeHtml(user.userId)}" placeholder="Nhập mật khẩu"></div>
          </div>
          <div class="admin-access-actions-grid">
            ${SUBJECTS.map((subject) => `<button class="mini-action admin-access-action ${adminSubjectToneClass(subject.apiId)}" type="button" data-save-access="${subject.apiId}" data-user-id="${escapeHtml(user.userId)}">Lưu ${escapeHtml(subject.label)}</button>`).join("")}
            <button class="mini-action admin-access-action admin-password-action" type="button" data-reset-password="1" data-user-id="${escapeHtml(user.userId)}">Reset mật khẩu</button>
          </div>
        </div>`;

    return `<article class="admin-user-card" data-user-card="${escapeHtml(user.userId)}"><div class="admin-user-head"><div><strong>${escapeHtml(user.avatarEmoji || "🐰")} ${escapeHtml(user.userId)} · ${escapeHtml(user.name || "")}</strong>${user.lastLearningAt ? `<span>Học gần nhất ${escapeHtml(formatDate(user.lastLearningAt))}</span>` : ""}</div><span class="access-chip access-${role === "admin" ? "admin" : "regular"}">${role === "admin" ? "Admin" : "Student"}</span></div>${controls}</article>`;
  }

  async function resolveAccessRequest(requestId, decision, button) {
    requestId = String(requestId || "");
    if (!requestId || !["approve-vip", "approve-trial", "reject"].includes(decision)) return;
    if (adminRequestBusy.has(requestId)) return;

    const isApprove = decision !== "reject";
    const grantAccessType = decision === "approve-trial" ? "trial" : (decision === "approve-vip" ? "vip" : "");
    const label = decision === "approve-vip"
      ? "Đang duyệt VIP…"
      : decision === "approve-trial"
        ? "Đang duyệt Trial…"
        : "Đang từ chối…";

    adminRequestBusy.set(requestId, decision);
    const card = button?.closest("[data-request-id]");
    card?.setAttribute("aria-busy", "true");
    card?.querySelectorAll("[data-request-decision]").forEach((actionButton) => {
      actionButton.disabled = true;
      actionButton.setAttribute("aria-disabled", "true");
    });
    setButtonBusy(button, true, label);

    try {
      const payload = isApprove
        ? { requestId, decision: "approve", grantAccessType }
        : { requestId, decision: "reject" };
      const data = await apiRequest("adminAccessRequestResolve", payload);
      if (data.orphaned) showToast("Tài khoản đã bị xóa; yêu cầu đã được đóng.");
      else if (isApprove) showToast(grantAccessType === "trial" ? "Đã duyệt Trial 30 ngày." : "Đã duyệt VIP 1 năm.");
      else showToast("Đã từ chối yêu cầu.");

      // Giữ khóa cho tới khi trạng thái yêu cầu được tải lại từ backend.
      await loadAdminData();
      adminRequestBusy.delete(requestId);
    } catch (err) {
      adminRequestBusy.delete(requestId);
      if (state.screen === "admin" && state.admin.tab === "requests") renderAdmin();
      showToast(friendlyError(err));
    }
  }

  async function saveAdminAccess(button) {
    const card = button.closest("[data-user-card]");
    const userId = button.dataset.userId || card?.dataset.userCard || "";
    const subjectId = button.dataset.saveAccess || "";
    const select = card?.querySelector(`[data-access-select="${subjectId}"]`);
    if (!userId || !subjectId || !select) return;
    setButtonBusy(button, true, "Đang lưu…");
    try {
      await apiRequest("adminSetSubjectAccess", { userId, subjectId, accessType: select.value });
      showToast("Đã cập nhật quyền môn.");
      await loadAdminData();
      state.admin.tab = "access";
      renderAdmin();
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  async function resetAdminPassword(button) {
    const card = button.closest("[data-user-card]");
    const userId = button.dataset.userId || "";
    const input = card?.querySelector(`[data-reset-input="${cssEscape(userId)}"]`);
    const newPassword = input ? input.value : "";
    if (newPassword.length < 6 || newPassword.length > 128) return showToast("Mật khẩu mới cần từ 6 đến 128 ký tự.");

    setButtonBusy(button, true, "Đang reset…");
    try {
      await apiRequest("adminResetPassword", { userId, newPassword });
      if (input) input.value = "";
      showToast("Đã reset mật khẩu và thu hồi các phiên cũ của tài khoản.");
      setButtonBusy(button, false);
    } catch (err) {
      setButtonBusy(button, false);
      showToast(friendlyError(err));
    }
  }

  function setButtonBusy(button, busy, label) {
    if (!button) return;
    if (busy) {
      if (!button.dataset.originalLabel) button.dataset.originalLabel = button.textContent;
      button.disabled = true;
      button.replaceChildren();
      const spinner = document.createElement("span");
      spinner.className = "spinner";
      spinner.setAttribute("aria-hidden", "true");
      const text = document.createElement("span");
      text.textContent = label;
      button.append(spinner, text);
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalLabel || "OK";
      delete button.dataset.originalLabel;
    }
  }

  function ensureDialogTertiaryButton() {
    if (dialogTertiaryButton && dialogTertiaryButton.isConnected) return dialogTertiaryButton;
    const actions = el.dialogOk && el.dialogOk.parentElement;
    if (!actions) return null;
    const button = document.createElement("button");
    button.id = "dialog-tertiary";
    button.className = "secondary-action hidden";
    button.type = "button";
    button.addEventListener("click", async () => {
      const handler = dialogTertiaryHandler;
      if (handler) await handler();
      else hideDialog();
    });
    actions.appendChild(button);
    dialogTertiaryButton = button;

    if (!document.getElementById("class1-dialog-three-actions-style")) {
      const style = document.createElement("style");
      style.id = "class1-dialog-three-actions-style";
      style.textContent = `
        .dialog-actions.has-three-actions{grid-template-columns:repeat(3,minmax(0,1fr));}
        .dialog-actions.has-three-actions #dialog-ok{order:1;}
        .dialog-actions.has-three-actions #dialog-secondary{order:2;border-color:#BAE6FD;background:#EFF8FF;color:#0369A1;}
        .dialog-actions.has-three-actions #dialog-tertiary{order:3;}
        .dialog-actions.has-three-actions button{min-width:0;padding-left:.5rem;padding-right:.5rem;}
        @media(max-width:640px){.dialog-actions.has-three-actions{grid-template-columns:1fr;}}
      `;
      document.head.appendChild(style);
    }
    return button;
  }

  function showDialog(options) {
    const opts = typeof options === "string" ? { title: options } : (options || {});
    el.dialogTitle.textContent = opts.title || "Thông báo";
    el.dialogMessage.textContent = opts.message || "";
    el.dialogIcon.textContent = opts.icon || "🐰";
    el.dialogOk.textContent = opts.primaryLabel || "OK";
    dialogPrimaryHandler = typeof opts.onPrimary === "function" ? opts.onPrimary : null;
    dialogSecondaryHandler = typeof opts.onSecondary === "function" ? opts.onSecondary : null;
    dialogTertiaryHandler = typeof opts.onTertiary === "function" ? opts.onTertiary : null;

    const hasSecondary = !!opts.secondaryLabel;
    el.dialogSecondary.classList.toggle("hidden", !hasSecondary);
    el.dialogSecondary.textContent = opts.secondaryLabel || "";

    const tertiary = ensureDialogTertiaryButton();
    const hasTertiary = !!opts.tertiaryLabel;
    if (tertiary) {
      tertiary.classList.toggle("hidden", !hasTertiary);
      tertiary.textContent = opts.tertiaryLabel || "";
      tertiary.parentElement?.classList.toggle("has-three-actions", hasTertiary);
    }

    el.dialog.classList.remove("hidden");
  }

  function hideDialog() {
    el.dialog.classList.add("hidden");
    dialogPrimaryHandler = null;
    dialogSecondaryHandler = null;
    dialogTertiaryHandler = null;
    if (dialogTertiaryButton) dialogTertiaryButton.classList.add("hidden");
    const actions = el.dialogOk && el.dialogOk.parentElement;
    actions?.classList.remove("has-three-actions");
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    el.toast.textContent = message;
    el.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => el.toast.classList.remove("is-visible"), 2600);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      return false;
    }
  }

  function focusContent() {
    window.requestAnimationFrame(() => {
      el.content.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function getInstallEnvironment() {
    const ua = navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isMac = /macintosh|mac os x/i.test(ua);
    const isWindows = /windows/i.test(ua);
    const isFirefox = /firefox\//i.test(ua);
    const isEdge = /edg\//i.test(ua);
    const isChromium = /chrome|chromium|crios/i.test(ua) || isEdge;
    const isSafari = /safari/i.test(ua) && !/chrome|chromium|crios|edg|opr|firefox/i.test(ua);
    return { isIOS, isMac, isWindows, isFirefox, isEdge, isChromium, isSafari };
  }

  function isStandalonePwa() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function readInstallFlag() {
    try { return localStorage.getItem(INSTALL_FLAG_KEY) === "1"; }
    catch (_) { return false; }
  }

  function writeInstallFlag(installed) {
    try {
      if (installed) localStorage.setItem(INSTALL_FLAG_KEY, "1");
      else localStorage.removeItem(INSTALL_FLAG_KEY);
    } catch (_) {}
  }

  async function detectInstalledPwa() {
    if (isStandalonePwa()) {
      writeInstallFlag(true);
      return true;
    }

    // Chrome/Edge mới có thể xác định PWA cùng origin đã được cài, kể cả khi
    // người dùng đang mở website trong tab trình duyệt thay vì cửa sổ app.
    if (typeof navigator.getInstalledRelatedApps === "function") {
      try {
        const related = await navigator.getInstalledRelatedApps();
        const installed = Array.isArray(related) && related.some((app) => app && app.platform === "webapp");
        writeInstallFlag(installed);
        return installed;
      } catch (_) {
        // Trình duyệt/nguồn hiện tại không hỗ trợ kiểm tra; dùng cờ local làm fallback UX.
      }
    }

    return readInstallFlag();
  }

  async function handleInstall() {
    if (await detectInstalledPwa()) {
      showToast("Lớp 1 đã được cài trên thiết bị này.");
      updateInstallVisibility();
      return;
    }

    if (typeof navigator.install === "function") {
      try {
        await navigator.install();
        writeInstallFlag(true);
        showToast("Đang mở trình cài Lớp 1…");
      } catch (_) {}
      updateInstallVisibility();
      return;
    }

    if (state.installPrompt) {
      const promptEvent = state.installPrompt;
      state.installPrompt = null;
      window.__class1InstallPrompt = null;
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice.catch(() => null);
        if (choice && choice.outcome === "accepted") {
          writeInstallFlag(true);
          showToast("Đang cài Lớp 1…");
        }
      } catch (_) {}
      updateInstallVisibility();
      return;
    }

    const env = getInstallEnvironment();
    if (env.isIOS) {
      showDialog({ title: "Cài App", message: "Mở menu Chia sẻ của trình duyệt, chọn “Thêm vào Màn hình chính”, rồi xác nhận để cài Lớp 1.", icon: "📱" });
      return;
    }
    if (env.isFirefox && env.isWindows) {
      showDialog({ title: "Cài App", message: "Trên Firefox Windows, hãy dùng chức năng cài ứng dụng web của trình duyệt nếu được hỗ trợ.", icon: "🖥️" });
      return;
    }
    if (env.isSafari && env.isMac) {
      showDialog({ title: "Cài App", message: "Trên Safari, chọn Tệp (File) → Thêm vào Dock (Add to Dock), rồi xác nhận để cài Lớp 1.", icon: "🖥️" });
      return;
    }
    if (env.isChromium) {
      showDialog({ title: "Cài App", message: "Chrome chưa cấp hộp cài trực tiếp cho phiên này. Hãy dùng biểu tượng cài trên thanh địa chỉ hoặc mục cài ứng dụng trong menu Chrome.", icon: "🖥️" });
      return;
    }
    showDialog({ title: "Cài App", message: "Trình duyệt này chưa hỗ trợ mở hộp cài trực tiếp. Hãy dùng chức năng thêm trang web thành ứng dụng của trình duyệt.", icon: "📲" });
  }

  async function updateInstallVisibility() {
    // Nút mặc định ẩn trong HTML. Với Chromium desktop, chỉ hiện khi chính
    // trình duyệt phát beforeinstallprompt (nghĩa là app đang thực sự có thể cài).
    // Sau khi đã cài, Chrome không phát lại sự kiện này ở lần tải trang kế tiếp,
    // nên nút tự ẩn kể cả khi website được mở trong tab Chrome bình thường.
    const installed = await detectInstalledPwa();
    if (installed) {
      el.installButton.classList.add("hidden");
      return;
    }

    const env = getInstallEnvironment();
    if (env.isChromium) {
      el.installButton.classList.toggle("hidden", !state.installPrompt);
      return;
    }

    // iOS/Safari/Firefox không dùng beforeinstallprompt ổn định; vẫn giữ nút
    // để mở hướng dẫn cài thủ công theo đúng đặc tả.
    el.installButton.classList.remove("hidden");
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  }

  function formatDateTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(String(value));
    return String(value).replace(/[^A-Za-z0-9_-]/g, "\\$&");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  el.homeButton.addEventListener("click", goHome);
  el.accountButton.addEventListener("click", () => state.auth.user ? openAccountPage() : openAuth("login"));
  el.authClose.addEventListener("click", closeAuth);
  el.authLater.addEventListener("click", closeAuth);
  el.authTabLogin.addEventListener("click", () => switchAuthView("login"));
  el.authTabRegister.addEventListener("click", () => switchAuthView("register"));
  el.loginForm.addEventListener("submit", onLoginSubmit);
  el.registerForm.addEventListener("submit", onRegisterSubmit);
  el.installButton.addEventListener("click", handleInstall);
  document.addEventListener("pointerdown", retryPendingGreeting, { passive: true });
  document.addEventListener("keydown", retryPendingGreeting);

  el.dialogOk.addEventListener("click", () => {
    const handler = dialogPrimaryHandler;
    hideDialog();
    if (handler) handler();
  });
  el.dialogSecondary.addEventListener("click", async () => {
    const handler = dialogSecondaryHandler;
    if (handler) await handler();
  });

  el.authModal.addEventListener("click", (event) => {
    if (event.target === el.authModal) closeAuth();
  });
  el.dialog.addEventListener("click", (event) => {
    if (event.target === el.dialog) hideDialog();
  });

  window.addEventListener("class1-install-ready", () => {
    if (window.__class1InstallPrompt) {
      state.installPrompt = window.__class1InstallPrompt;
      updateInstallVisibility();
    }
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    // Nếu sự kiện này xuất hiện thì trình duyệt đang coi app là chưa cài.
    writeInstallFlag(false);
    state.installPrompt = event;
    window.__class1InstallPrompt = event;
    updateInstallVisibility();
  });

  window.addEventListener("appinstalled", () => {
    writeInstallFlag(true);
    state.installPrompt = null;
    window.__class1InstallPrompt = null;
    updateInstallVisibility();
    showToast("Đã cài App.");
  });

  window.addEventListener("focus", () => {
    refreshAdminPendingBadge(false);
    refreshUserNoticeBadge();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refreshAdminPendingBadge(false);
      refreshUserNoticeBadge();
    }
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js", { updateViaCache: "none" })
        .then((registration) => registration.update().catch(() => {}))
        .catch(() => {});
    });
  }

  updateInstallVisibility();
  updateAccountButton(true);
  render();
  bootstrapAuth();
})();
