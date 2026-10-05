(() => {
  "use strict";

  const MODULE_KEY = "paperFolding";
  const STYLE_ID = "class1-games-paper-folding-style";

  let activeContext = null;
  let currentProductId = "";
  let currentVariantId = "";
  let currentStepIndex = 0;
  const completedVariants = new Set();
  const BUNNY_RULES = Object.freeze([
    "Điều 1: Đặt giấy trên mặt bàn phẳng.",
    "Điều 2: Canh mép trước, miết nếp sau.",
    "Điều 3: Nếp sai thì mở ra và làm lại, không cần vội.",
    "Điều 4: Các bước mở túi hoặc gấp ngược nên nhờ người lớn hỗ trợ lần đầu."
  ]);

  let narrationNonce = 0;
  let currentUtterance = null;
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

  const step = (title, instruction, before, after, guide = "", tip = "") => Object.freeze({
    title, instruction, before, after, guide, tip
  });

  function bunnyTtsUrl(text) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(text)}`;
  }

  function pickVietnameseVoice() {
    if (!("speechSynthesis" in window) || typeof window.speechSynthesis.getVoices !== "function") return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) return null;
    return voices.find((voice) => /^vi/i.test(String(voice.lang || "")))
      || voices.find((voice) => /ban mai|mai/i.test(String(voice.name || "").toLocaleLowerCase("vi-VN")))
      || voices.find((voice) => /female|woman|nữ|nữ/i.test(String(voice.name || "").toLocaleLowerCase("vi-VN")))
      || voices[0]
      || null;
  }

  function stopNarration() {
    narrationNonce += 1;
    currentUtterance = null;
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

  function speakWithAudio(text, nonce) {
    if (!narrationAudio) return false;
    try {
      narrationAudio.pause();
      narrationAudio.currentTime = 0;
      narrationAudio.src = bunnyTtsUrl(text);
      narrationAudio.playbackRate = 0.98;
      const playPromise = narrationAudio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      return nonce === narrationNonce;
    } catch (_) {
      return false;
    }
  }

  function speakNarration(text) {
    const cleanText = String(text || "").replace(/\s+/g, " ").trim();
    if (!cleanText) return false;
    stopNarration();
    const nonce = narrationNonce;
    try {
      if ("speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function") {
        const utterance = new window.SpeechSynthesisUtterance(cleanText);
        utterance.lang = "vi-VN";
        utterance.rate = 1;
        utterance.pitch = 1.08;
        utterance.volume = 1;
        const voice = pickVietnameseVoice();
        if (voice) utterance.voice = voice;
        utterance.onend = () => {
          if (nonce === narrationNonce) currentUtterance = null;
        };
        utterance.onerror = () => {
          if (nonce === narrationNonce) speakWithAudio(cleanText, nonce);
        };
        currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        return true;
      }
    } catch (_) {}
    return speakWithAudio(cleanText, nonce);
  }

  function stepNarrationText(variant, stepItem, index) {
    if (!variant || !stepItem) return "";
    const parts = [
      `Cô Thỏ Hồng hướng dẫn ${variant.title}.`,
      `Bước ${index + 1} trên ${variant.steps.length}: ${stepItem.title}.`,
      stepItem.instruction
    ];
    if (stepItem.tip) parts.push(`Cô Thỏ mách bé: ${stepItem.tip}`);
    parts.push("Khi làm xong bước này, bé bấm Em làm xong để sang bước tiếp theo nhé.");
    return parts.join(" ");
  }

  function bunnyRulesNarrationText() {
    return `Cô Thỏ Hồng có ${BUNNY_RULES.length} điều nhắc bé. ${BUNNY_RULES.join(" ")}`;
  }

  const PROJECTS = Object.freeze([
    Object.freeze({
      id: "plane", icon: "✈️", title: "Máy bay", tone: "purple",
      description: "Gấp máy bay bay nhanh, bay xa hoặc lượn lâu.",
      variants: Object.freeze([
        Object.freeze({
          id: "dart", title: "Máy bay phi tiêu", difficulty: "Dễ", time: "5–7 phút",
          paper: "1 tờ A4 (21 × 29,7 cm)", color: "Giấy thường 70–100 gsm",
          result: "Máy bay mũi nhọn, bay nhanh và thẳng.", challenge: "Đánh dấu vạch xuất phát rồi thử 3 lần xem lần nào bay xa nhất.",
          steps: Object.freeze([
            step("Tạo đường giữa", "Đặt giấy dọc. Gấp đôi theo chiều dài, miết nếp rồi mở ra.", "rectPortrait", "rectCenter", "fold-v", "Đường giữa càng thẳng, hai cánh càng cân."),
            step("Gấp hai góc trên", "Đưa hai góc trên vào đúng đường giữa để tạo một mũi tam giác.", "rectCenter", "planeNose1", "corners-in"),
            step("Thu mũi lần hai", "Gấp hai cạnh xiên mới vào đường giữa. Mũi máy bay sẽ dài và nhọn hơn.", "planeNose1", "planeNose2", "sides-in"),
            step("Gập thân máy bay", "Gập cả hình theo đường giữa, để các nếp gấp nằm ở phía ngoài.", "planeNose2", "planeFolded", "fold-v"),
            step("Tạo cánh thứ nhất", "Gấp một cạnh dài xuống, chừa thân máy bay khoảng hai ngón tay.", "planeFolded", "planeWing1", "top-down"),
            step("Tạo cánh thứ hai", "Lật sang mặt còn lại và gấp cánh thứ hai trùng với cánh thứ nhất.", "planeWing1", "planeDart", "flip"),
            step("Mở cánh và cân chỉnh", "Mở hai cánh gần ngang nhau. Vuốt nhẹ sống giữa và kiểm tra hai bên đối xứng.", "planeDart", "planeDart", "open", "Cầm ở phần bụng, phóng nhẹ theo phương ngang.")
          ])
        }),
        Object.freeze({
          id: "distance", title: "Máy bay bay xa", difficulty: "Vừa", time: "7–10 phút",
          paper: "1 tờ A4", color: "Giấy 80–100 gsm",
          result: "Cánh rộng hơn, thân chắc, phù hợp thi bay xa.", challenge: "Điều chỉnh hai mép cánh cong lên 2–3 mm rồi thử lại đường bay.",
          steps: Object.freeze([
            step("Tạo đường giữa", "Gấp đôi tờ A4 theo chiều dài rồi mở ra.", "rectPortrait", "rectCenter", "fold-v"),
            step("Gấp hai góc trên", "Đưa hai góc trên vào đường giữa.", "rectCenter", "planeNose1", "corners-in"),
            step("Gập mũi xuống", "Gập phần tam giác phía trên xuống khoảng một phần ba tờ giấy.", "planeNose1", "planeShield", "top-down"),
            step("Gấp góc vào giữa", "Gấp hai góc trên mới vào đường giữa, để lại một mũi tam giác nhỏ phía dưới.", "planeShield", "planeLock", "corners-in"),
            step("Khóa hai nếp gấp", "Gập mũi tam giác nhỏ lên để giữ hai mép vừa gấp.", "planeLock", "planeLocked", "bottom-up"),
            step("Gập đôi thân", "Gập theo đường giữa, phần khóa nằm ở bên ngoài.", "planeLocked", "planeFoldedWide", "fold-v"),
            step("Tạo hai cánh rộng", "Gấp hai cánh xuống sao cho mép cánh gần song song với đáy thân.", "planeFoldedWide", "planeDistance", "top-down"),
            step("Bẻ mép ổn định", "Bẻ nhẹ 5–8 mm ở mép sau của hai cánh lên trên.", "planeDistance", "planeDistanceTabs", "bottom-up", "Hai mép bẻ phải gần bằng nhau để máy bay không lệch hướng.")
          ])
        }),
        Object.freeze({
          id: "glider", title: "Máy bay lượn", difficulty: "Vừa", time: "8–10 phút",
          paper: "1 tờ A4", color: "Giấy nhẹ 70–80 gsm",
          result: "Mũi tù và cánh rất rộng để lượn chậm.", challenge: "Thử phóng rất nhẹ từ ngang vai và quan sát máy bay lượn.",
          steps: Object.freeze([
            step("Đánh dấu đường giữa", "Gấp đôi theo chiều dài rồi mở ra.", "rectPortrait", "rectCenter", "fold-v"),
            step("Đưa góc vào giữa", "Gấp hai góc trên vào đường giữa.", "rectCenter", "planeNose1", "corners-in"),
            step("Hạ mũi", "Gấp cả phần mũi tam giác xuống, chừa khoảng 5 cm tới mép dưới.", "planeNose1", "planeShield", "top-down"),
            step("Tạo mũi tù", "Gấp hai góc mới vào giữa nhưng không ép sát hoàn toàn, để đầu máy bay rộng hơn.", "planeShield", "gliderNose", "corners-in"),
            step("Khóa mũi", "Gập tam giác nhỏ bên dưới lên để khóa hai mép.", "gliderNose", "planeLocked", "bottom-up"),
            step("Gập đôi", "Gập toàn bộ theo đường giữa.", "planeLocked", "planeFoldedWide", "fold-v"),
            step("Tạo cánh lớn", "Gấp cánh xuống, để thân chỉ cao khoảng 2 cm. Làm tương tự phía kia.", "planeFoldedWide", "planeGlider", "top-down"),
            step("Nâng đầu cánh", "Bẻ hai đầu cánh lên khoảng 1 cm để máy bay ổn định hơn.", "planeGlider", "planeGliderTabs", "bottom-up", "Nếu máy bay chúi xuống, nâng mép sau cánh lên một chút.")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "boat", icon: "⛵", title: "Thuyền", tone: "teal",
      description: "Từ tờ giấy chữ nhật thành chiếc thuyền có thể mở đáy.",
      variants: Object.freeze([
        Object.freeze({
          id: "classic", title: "Thuyền giấy cổ điển", difficulty: "Dễ", time: "7–9 phút",
          paper: "1 tờ A4", color: "Giấy thường hoặc giấy màu một mặt",
          result: "Thuyền giấy có đáy mở và hai mũi nhọn.", challenge: "Đặt thuyền lên chậu nước nông và xem thuyền giữ thăng bằng thế nào.",
          steps: Object.freeze([
            step("Gấp đôi tờ giấy", "Đặt giấy ngang và gấp đôi từ trên xuống dưới.", "rectLandscape", "rectHalf", "fold-h"),
            step("Đánh dấu giữa", "Gấp đôi nhẹ từ trái sang phải rồi mở lại để biết chính giữa.", "rectHalf", "rectHalfCenter", "fold-v"),
            step("Gấp hai góc", "Đưa hai góc trên vào đường giữa để tạo mái tam giác.", "rectHalfCenter", "boatHat", "corners-in"),
            step("Gập mép dưới", "Gấp lớp mép dưới phía trước lên sát chân tam giác. Lật và gấp lớp còn lại.", "boatHat", "boatHatLocked", "bottom-up"),
            step("Mở thành hình thoi", "Luồn tay vào đáy, kéo hai bên ra rồi ép phẳng thành hình thoi.", "boatHatLocked", "boatDiamond", "open"),
            step("Gấp góc dưới lên", "Gấp góc dưới lớp trước lên đỉnh. Lật lại và làm tương tự.", "boatDiamond", "boatSmallDiamond", "bottom-up"),
            step("Mở hình thoi lần nữa", "Mở phần đáy và ép phẳng để được hình thoi nhỏ hơn.", "boatSmallDiamond", "boatDiamond2", "open"),
            step("Kéo hai mũi", "Cầm hai góc trên, kéo nhẹ sang hai bên rồi mở phần đáy.", "boatDiamond2", "boatFinal", "pull", "Miết đáy vừa đủ; giấy quá mỏng sẽ mềm nhanh khi gặp nước.")
          ])
        }),
        Object.freeze({
          id: "sail", title: "Thuyền buồm đơn giản", difficulty: "Dễ", time: "5–7 phút",
          paper: "1 tờ giấy vuông", color: "Giấy vuông 15 × 15 cm",
          result: "Thuyền nhỏ có cánh buồm tam giác.", challenge: "Trang trí một biểu tượng nhỏ lên cánh buồm trước khi gấp.",
          steps: Object.freeze([
            step("Tạo đường chéo", "Gấp tờ giấy vuông theo đường chéo rồi mở ra.", "square", "squareDiag", "fold-diag-r"),
            step("Tạo tam giác", "Gấp đôi theo đường chéo để thành tam giác.", "squareDiag", "triangle", "fold-diag-r"),
            step("Gập đáy lên", "Gấp một dải nhỏ ở cạnh đáy lên để tạo thân thuyền.", "triangle", "sailBoatBase", "bottom-up"),
            step("Tạo cánh buồm", "Gấp một góc tam giác xuống lệch sang một bên.", "sailBoatBase", "sailBoat", "top-down"),
            step("Mở chân thuyền", "Tách nhẹ phần đáy để thuyền đứng được trên mặt phẳng.", "sailBoat", "sailBoatOpen", "open"),
            step("Cân chỉnh", "Dựng cánh buồm và vuốt lại các nếp để thuyền đứng cân.", "sailBoatOpen", "sailBoatOpen", "pull", "Có thể dùng giấy hai màu để cánh buồm và thân khác màu.")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "camera", icon: "📷", title: "Máy ảnh", tone: "amber",
      description: "Gấp máy ảnh giấy có hai cánh bật vui mắt.",
      variants: Object.freeze([
        Object.freeze({
          id: "snap", title: "Máy ảnh bật", difficulty: "Vừa", time: "10–12 phút",
          paper: "1 tờ giấy vuông", color: "Giấy 15 × 15 cm, không quá dày",
          result: "Máy ảnh giấy có phần giữa giống ống kính và hai cánh bật.", challenge: "Vẽ một vòng tròn nhỏ ở giữa làm ống kính và trang trí nút chụp.",
          steps: Object.freeze([
            step("Tạo hai đường giữa", "Gấp đôi theo chiều ngang và dọc, miết nếp rồi mở ra.", "square", "squareCross", "fold-cross"),
            step("Gấp bốn góc vào tâm", "Đưa lần lượt bốn góc của tờ giấy vào đúng tâm.", "squareCross", "blintz", "corners-center"),
            step("Lật mặt giấy", "Lật toàn bộ hình sang mặt sau.", "blintz", "blintzBack", "flip"),
            step("Gấp góc vào tâm lần hai", "Tiếp tục đưa bốn góc mới vào tâm.", "blintzBack", "blintzSmall", "corners-center"),
            step("Mở hai túi đối diện", "Lật mặt. Chọn hai ô đối diện, kéo phần giấy bên trong ra thành hai hình chữ nhật.", "blintzSmall", "cameraFlaps", "open"),
            step("Gập đôi phần giữa", "Gập phần giữa theo nếp có sẵn để hai cánh vừa mở nằm ra hai bên.", "cameraFlaps", "cameraBody", "fold-h"),
            step("Tạo khóa", "Luồn hai đầu nhỏ vào nhau ở phía sau để thân máy ảnh giữ chắc.", "cameraBody", "cameraLocked", "pull"),
            step("Mở ống kính", "Nhấn nhẹ phần giữa rồi mở hai cánh để tạo dáng máy ảnh.", "cameraLocked", "cameraFinal", "open", "Không kéo mạnh vì phần khóa bằng giấy có thể rách.")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "crane", icon: "🐦", title: "Hạc giấy", tone: "purple",
      description: "Bài gấp khéo tay với nền chim cơ bản và cổ dài.",
      variants: Object.freeze([
        Object.freeze({
          id: "crane-basic", title: "Hạc cơ bản", difficulty: "Khéo tay", time: "15–20 phút",
          paper: "1 tờ giấy vuông", color: "Giấy origami 15 × 15 cm",
          result: "Hạc giấy có đầu, cổ, đuôi và hai cánh.", challenge: "Gấp thêm một con nhỏ hơn và đặt hai con cạnh nhau.",
          steps: Object.freeze([
            step("Tạo nếp chéo", "Gấp hai đường chéo của hình vuông rồi mở ra.", "square", "squareX", "fold-diag-both"),
            step("Tạo nếp ngang dọc", "Gấp đôi ngang và dọc rồi mở ra.", "squareX", "squareGrid", "fold-cross"),
            step("Ép thành hình vuông nhỏ", "Đưa hai cạnh bên vào trong theo nếp có sẵn, ép xuống thành hình vuông nhỏ.", "squareGrid", "birdSquare", "collapse"),
            step("Tạo dáng cánh diều", "Gấp hai mép lớp trên vào đường giữa, gấp đỉnh xuống để đánh dấu nếp.", "birdSquare", "birdKite", "sides-in"),
            step("Mở cánh lên", "Mở hai mép vừa gấp. Kéo lớp giấy dưới lên, ép hai cạnh vào giữa thành hình thoi dài.", "birdKite", "birdLongDiamond", "open"),
            step("Làm mặt còn lại", "Lật hình và lặp lại thao tác để hai mặt giống nhau.", "birdLongDiamond", "birdBase", "flip"),
            step("Thu cổ và đuôi", "Gấp hai mép dưới vào giữa để hai chân dài và mảnh hơn.", "birdBase", "birdNeckBase", "sides-in"),
            step("Gấp ngược hai chân", "Gấp ngược một chân lên làm cổ, chân còn lại làm đuôi.", "birdNeckBase", "birdNeckTail", "reverse"),
            step("Tạo đầu", "Gấp ngược một đoạn nhỏ ở đầu cổ để tạo mỏ.", "birdNeckTail", "craneHead", "reverse"),
            step("Hạ hai cánh", "Gấp hai cánh xuống hai bên và chỉnh thân hạc.", "craneHead", "craneFinal", "top-down", "Gấp chậm ở bước gấp ngược; dùng móng tay miết nếp trước sẽ dễ hơn.")
          ])
        }),
        Object.freeze({
          id: "flap", title: "Chim vỗ cánh", difficulty: "Khéo tay", time: "15–20 phút",
          paper: "1 tờ giấy vuông", color: "Giấy origami mỏng",
          result: "Chim giấy có thể chuyển động cánh khi kéo nhẹ đuôi.", challenge: "Giữ phần ngực và kéo đuôi thật nhẹ để thử chuyển động cánh.",
          steps: Object.freeze([
            step("Tạo nếp nền", "Gấp hai đường chéo và hai đường giữa, sau đó mở ra.", "square", "squareGrid", "fold-diag-both"),
            step("Ép vuông nhỏ", "Ép giấy theo các nếp thành hình vuông nhỏ.", "squareGrid", "birdSquare", "collapse"),
            step("Gấp cánh diều", "Đưa hai cạnh lớp trên vào đường giữa.", "birdSquare", "birdKite", "sides-in"),
            step("Kéo lớp dưới lên", "Mở nếp và kéo lớp dưới lên thành hình thoi dài.", "birdKite", "birdLongDiamond", "open"),
            step("Lặp lại mặt sau", "Lật và làm tương tự để được nền chim.", "birdLongDiamond", "birdBase", "flip"),
            step("Tạo cổ", "Gấp một chân dài lên bằng nếp gấp ngược.", "birdBase", "birdNeckTail", "reverse"),
            step("Tạo đầu", "Gấp ngược đầu cổ một đoạn nhỏ.", "birdNeckTail", "craneHead", "reverse"),
            step("Tạo cánh chuyển động", "Chỉ gập một cánh xuống vừa phải, cánh kia giữ tự do hơn.", "craneHead", "flapBird", "top-down"),
            step("Hoàn thiện", "Cầm thân bằng hai ngón tay, kéo đuôi rất nhẹ để cánh chuyển động.", "flapBird", "flapBird", "pull", "Đừng giật mạnh; nếp gấp mềm sẽ cho chuyển động mượt hơn.")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "frog", icon: "🐸", title: "Ếch", tone: "teal",
      description: "Gấp chú ếch có thể bật nhảy bằng một cú bấm nhẹ.",
      variants: Object.freeze([
        Object.freeze({
          id: "jump", title: "Ếch nhảy", difficulty: "Vừa", time: "10–12 phút",
          paper: "1 tờ giấy chữ nhật", color: "Giấy khoảng 10 × 15 cm",
          result: "Chú ếch có chân lò xo để bật nhảy.", challenge: "Kẻ một vạch đích và thử cho ếch nhảy qua vạch.",
          steps: Object.freeze([
            step("Tạo nếp chữ X", "Ở nửa trên tờ giấy, gấp chéo hai góc để tạo hai nếp chéo rồi mở ra.", "rectPortrait", "frogX", "fold-diag-both"),
            step("Ép đầu thành tam giác", "Đẩy hai cạnh vào trong theo nếp để phần đầu thành tam giác.", "frogX", "frogTriangle", "collapse"),
            step("Tạo chân trước", "Gấp hai góc tam giác lên chếch sang hai bên.", "frogTriangle", "frogFrontLegs", "bottom-up"),
            step("Thu thân", "Gấp hai cạnh phần thân dưới vào đường giữa.", "frogFrontLegs", "frogBody", "sides-in"),
            step("Gập thân lên", "Gấp phần đáy lên gần sát đầu ếch.", "frogBody", "frogFoldUp", "bottom-up"),
            step("Tạo lò xo", "Gấp phần vừa đưa lên ngược xuống một nửa để tạo nếp chữ Z.", "frogFoldUp", "frogSpring", "top-down"),
            step("Mở chân", "Bẻ nhẹ hai chân trước ra hai bên và chỉnh thân cân.", "frogSpring", "frogFinal", "open"),
            step("Thử nhảy", "Ấn nhẹ vào phần lưng sau rồi thả tay nhanh.", "frogFinal", "frogFinal", "press", "Mặt bàn phẳng giúp ếch bật rõ hơn.")
          ])
        }),
        Object.freeze({
          id: "face", title: "Mặt ếch", difficulty: "Dễ", time: "4–5 phút",
          paper: "1 tờ giấy vuông", color: "Giấy xanh 12–15 cm",
          result: "Khuôn mặt ếch đơn giản để bé vẽ mắt và miệng.", challenge: "Vẽ hai biểu cảm khác nhau cho hai chú ếch.",
          steps: Object.freeze([
            step("Gấp thành tam giác", "Gấp tờ giấy vuông theo đường chéo.", "square", "triangle", "fold-diag-r"),
            step("Tạo hai mắt", "Gấp hai góc dưới của tam giác chếch lên hai bên.", "triangle", "frogFaceEyes", "bottom-up"),
            step("Tạo cằm", "Gấp đỉnh trên xuống một đoạn nhỏ.", "frogFaceEyes", "frogFace", "top-down"),
            step("Hoàn thiện", "Lật mặt trước, vẽ mắt, mũi và miệng cho chú ếch.", "frogFace", "frogFaceFinal", "flip", "Dùng bút sáp hoặc bút chì màu để giấy không bị thấm.")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "fish", icon: "🐟", title: "Cá", tone: "pink",
      description: "Gấp cá đơn giản rồi trang trí vảy và mắt.",
      variants: Object.freeze([
        Object.freeze({
          id: "simple-fish", title: "Cá đơn giản", difficulty: "Dễ", time: "5–6 phút",
          paper: "1 tờ giấy vuông", color: "Giấy hai màu càng đẹp",
          result: "Cá thân tam giác có đuôi xòe.", challenge: "Làm một đàn cá 3 kích thước khác nhau.",
          steps: Object.freeze([
            step("Gấp tam giác", "Gấp tờ giấy vuông theo đường chéo.", "square", "triangle", "fold-diag-r"),
            step("Đánh dấu giữa", "Gấp tam giác làm đôi rồi mở ra để biết trục giữa.", "triangle", "triangleCenter", "fold-v"),
            step("Tạo đuôi", "Gấp hai góc đáy chéo về phía sau, chồng nhẹ lên nhau.", "triangleCenter", "fishTail", "sides-in"),
            step("Tạo đầu", "Gập đầu nhọn phía trước vào một chút để bớt sắc.", "fishTail", "fishBody", "tip-in"),
            step("Hoàn thiện", "Vẽ mắt, vảy và đường mang cá.", "fishBody", "fishFinal", "decorate", "Gấp nhiều màu rồi treo bằng sợi chỉ thành một đàn cá.")
          ])
        }),
        Object.freeze({
          id: "tropical", title: "Cá nhiệt đới", difficulty: "Vừa", time: "8–10 phút",
          paper: "1 tờ giấy vuông", color: "Giấy màu 15 × 15 cm",
          result: "Cá thân rộng với đuôi nổi bật.", challenge: "Dùng bút màu tạo các sọc khác nhau trên thân cá.",
          steps: Object.freeze([
            step("Tạo nếp chéo", "Gấp hai đường chéo rồi mở ra.", "square", "squareX", "fold-diag-both"),
            step("Gấp thành tam giác", "Gấp theo một đường chéo.", "squareX", "triangle", "fold-diag-r"),
            step("Gấp hai góc lên", "Đưa hai góc đáy lên gần đỉnh để tạo hình thoi.", "triangle", "fishDiamond", "bottom-up"),
            step("Lật mặt", "Lật toàn bộ hình sang mặt sau.", "fishDiamond", "fishDiamondBack", "flip"),
            step("Tạo thân", "Gấp hai mép bên vào giữa một chút.", "fishDiamondBack", "fishWideBody", "sides-in"),
            step("Tạo đuôi", "Gấp phần sau ra ngoài theo nếp chéo.", "fishWideBody", "fishTropical", "reverse"),
            step("Hoàn thiện", "Vẽ mắt và họa tiết trên thân.", "fishTropical", "fishTropicalFinal", "decorate")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "cat", icon: "🐱", title: "Mèo", tone: "purple",
      description: "Gấp mặt mèo hoặc mèo ngồi từ giấy vuông.",
      variants: Object.freeze([
        Object.freeze({
          id: "cat-face", title: "Mặt mèo", difficulty: "Dễ", time: "4–5 phút",
          paper: "1 tờ giấy vuông", color: "Giấy 12–15 cm",
          result: "Mặt mèo có hai tai nhọn.", challenge: "Vẽ mỗi chú mèo một biểu cảm khác nhau.",
          steps: Object.freeze([
            step("Gấp tam giác", "Gấp tờ giấy vuông theo đường chéo.", "square", "triangle", "fold-diag-r"),
            step("Gập đỉnh xuống", "Gấp đỉnh tam giác xuống khoảng một phần ba.", "triangle", "catHeadBase", "top-down"),
            step("Dựng hai tai", "Gấp hai góc dưới chếch lên hai bên.", "catHeadBase", "catEars", "bottom-up"),
            step("Bo cằm", "Gấp góc dưới lên một đoạn nhỏ.", "catEars", "catFace", "bottom-up"),
            step("Vẽ khuôn mặt", "Lật mặt và vẽ mắt, mũi, ria mèo.", "catFace", "catFaceFinal", "decorate")
          ])
        }),
        Object.freeze({
          id: "cat-sit", title: "Mèo ngồi", difficulty: "Vừa", time: "8–10 phút",
          paper: "1 tờ giấy vuông", color: "Giấy 15 × 15 cm",
          result: "Mèo ngồi với tai, thân và đuôi đơn giản.", challenge: "Gấp hai chú mèo màu khác nhau thành một cặp.",
          steps: Object.freeze([
            step("Gấp chéo", "Gấp tờ giấy thành tam giác.", "square", "triangle", "fold-diag-r"),
            step("Tạo thân dài", "Gấp hai mép cạnh vào đường giữa để tạo hình cánh diều.", "triangle", "kite", "sides-in"),
            step("Tạo đầu", "Gấp đỉnh trên xuống khoảng một phần tư chiều dài.", "kite", "catBodyHead", "top-down"),
            step("Tạo tai", "Gấp hai góc nhỏ trên đầu chếch ra ngoài.", "catBodyHead", "catBodyEars", "pull"),
            step("Tạo chân", "Gấp phần đáy lên rồi gấp ngược xuống một đoạn nhỏ.", "catBodyEars", "catBodyLegs", "bottom-up"),
            step("Tạo đuôi", "Bẻ một góc phía dưới sang bên bằng nếp gấp ngược.", "catBodyLegs", "catSit", "reverse"),
            step("Hoàn thiện", "Vẽ khuôn mặt và các vệt lông.", "catSit", "catSitFinal", "decorate")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "dog", icon: "🐶", title: "Chó", tone: "amber",
      description: "Gấp chú chó tai cụp rất dễ nhận ra.",
      variants: Object.freeze([
        Object.freeze({
          id: "dog-face", title: "Mặt chó", difficulty: "Dễ", time: "4–5 phút",
          paper: "1 tờ giấy vuông", color: "Giấy nâu, vàng hoặc màu bé thích",
          result: "Mặt chó với hai tai cụp.", challenge: "Vẽ đốm lông khác nhau cho từng chú chó.",
          steps: Object.freeze([
            step("Gấp tam giác", "Gấp tờ giấy vuông theo đường chéo.", "square", "triangle", "fold-diag-r"),
            step("Tạo tai trái", "Gấp góc trái của tam giác chếch xuống.", "triangle", "dogEar1", "top-down"),
            step("Tạo tai phải", "Gấp góc phải chếch xuống tương tự.", "dogEar1", "dogEars", "top-down"),
            step("Tạo mõm", "Gấp góc dưới lên một đoạn nhỏ.", "dogEars", "dogFace", "bottom-up"),
            step("Vẽ khuôn mặt", "Vẽ mắt, mũi và miệng cho chú chó.", "dogFace", "dogFaceFinal", "decorate")
          ])
        }),
        Object.freeze({
          id: "dog-body", title: "Chó đứng", difficulty: "Vừa", time: "8–10 phút",
          paper: "1 tờ giấy vuông", color: "Giấy 15 × 15 cm",
          result: "Chú chó có thân, đầu và đuôi.", challenge: "Gấp thêm một chú nhỏ làm chó con.",
          steps: Object.freeze([
            step("Gấp tam giác", "Gấp tờ giấy theo đường chéo.", "square", "triangle", "fold-diag-r"),
            step("Tạo thân", "Gấp một cạnh dài vào trong để thân hẹp hơn.", "triangle", "dogBodyBase", "sides-in"),
            step("Tạo đầu", "Gấp một đầu tam giác lên bằng nếp gấp ngược.", "dogBodyBase", "dogBodyHead", "reverse"),
            step("Tạo mõm", "Gấp đầu nhọn xuống một đoạn nhỏ.", "dogBodyHead", "dogBodyMuzzle", "top-down"),
            step("Tạo chân", "Gấp phần đáy lên rồi mở nhẹ để tạo chân đứng.", "dogBodyMuzzle", "dogBodyLegs", "bottom-up"),
            step("Tạo đuôi", "Gấp góc sau chếch lên.", "dogBodyLegs", "dogStanding", "bottom-up"),
            step("Hoàn thiện", "Vẽ mắt, mũi và trang trí lông.", "dogStanding", "dogStandingFinal", "decorate")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "tulip", icon: "🌷", title: "Hoa tulip", tone: "pink",
      description: "Gấp bông tulip và cuống lá để ghép thành một bông hoa.",
      variants: Object.freeze([
        Object.freeze({
          id: "flower", title: "Bông tulip", difficulty: "Dễ", time: "5–7 phút",
          paper: "1 tờ giấy vuông", color: "Giấy màu đỏ, hồng, vàng…",
          result: "Bông tulip ba cánh đơn giản.", challenge: "Gấp 3 bông màu khác nhau thành một bó hoa.",
          steps: Object.freeze([
            step("Gấp tam giác", "Gấp tờ giấy vuông theo đường chéo.", "square", "triangle", "fold-diag-r"),
            step("Tạo cánh trái", "Gấp góc trái lên chếch qua đường giữa.", "triangle", "tulipLeft", "bottom-up"),
            step("Tạo cánh phải", "Gấp góc phải lên chếch qua đường giữa, hơi chồng lên cánh trái.", "tulipLeft", "tulipPetals", "bottom-up"),
            step("Bo đáy hoa", "Gập hai góc nhỏ phía dưới vào sau để bông hoa tròn hơn.", "tulipPetals", "tulipFinal", "tip-in"),
            step("Hoàn thiện", "Lật mặt trước và vuốt lại ba cánh hoa.", "tulipFinal", "tulipFinal", "flip")
          ])
        }),
        Object.freeze({
          id: "flower-stem", title: "Tulip có cuống", difficulty: "Vừa", time: "10–12 phút",
          paper: "2 tờ giấy vuông", color: "1 tờ màu hoa + 1 tờ xanh",
          result: "Bông tulip ghép với cuống và lá.", challenge: "Làm một bình hoa giấy nhỏ bằng 3–5 bông.",
          steps: Object.freeze([
            step("Gấp bông hoa", "Gấp bông tulip theo 4 bước cơ bản: tam giác, hai cánh lên, bo đáy.", "triangle", "tulipFinal", "bottom-up"),
            step("Tạo nếp chéo cho cuống", "Lấy tờ xanh, gấp theo đường chéo rồi mở ra.", "squareGreen", "squareDiagGreen", "fold-diag-r"),
            step("Gấp hai mép vào giữa", "Gấp hai cạnh kề nhau vào đường chéo để tạo hình cánh diều.", "squareDiagGreen", "stemKite", "sides-in"),
            step("Thu cuống", "Tiếp tục gấp hai mép dài vào giữa để thân hẹp hơn.", "stemKite", "stemNarrow", "sides-in"),
            step("Gập đôi", "Gập hình theo chiều dài.", "stemNarrow", "stemFold", "fold-v"),
            step("Tạo lá", "Kéo lớp ngoài chếch sang một bên để tạo chiếc lá.", "stemFold", "stemLeaf", "pull"),
            step("Ghép hoa", "Luồn đầu cuống vào khe nhỏ phía sau bông tulip.", "stemLeaf", "tulipStem", "pull", "Nếu cuống lỏng, chỉ cần luồn sâu hơn; không cần keo.")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "heart", icon: "❤️", title: "Trái tim", tone: "pink",
      description: "Gấp trái tim phẳng hoặc trái tim có túi nhỏ.",
      variants: Object.freeze([
        Object.freeze({
          id: "heart-basic", title: "Trái tim cơ bản", difficulty: "Dễ", time: "6–8 phút",
          paper: "1 tờ giấy vuông", color: "Giấy hồng hoặc đỏ",
          result: "Trái tim phẳng để làm thiệp hoặc trang trí.", challenge: "Viết một lời nhắn ngắn lên mặt sau trước khi tặng.",
          steps: Object.freeze([
            step("Tạo hai đường giữa", "Gấp đôi ngang và dọc rồi mở ra.", "square", "squareCross", "fold-cross"),
            step("Gấp mép dưới lên giữa", "Đưa cạnh dưới lên đường ngang giữa.", "squareCross", "heartHalf", "bottom-up"),
            step("Lật giấy", "Lật toàn bộ sang mặt sau.", "heartHalf", "heartHalfBack", "flip"),
            step("Tạo mũi dưới", "Gấp hai góc dưới vào đường dọc giữa.", "heartHalfBack", "heartPoint", "corners-in"),
            step("Lật lại", "Lật sang mặt trước.", "heartPoint", "heartPointFront", "flip"),
            step("Gấp hai cạnh vào giữa", "Thu hai mép bên vào đường giữa.", "heartPointFront", "heartTall", "sides-in"),
            step("Tạo hai vai tim", "Gập hai góc trên xuống và bo các góc nhọn vào sau.", "heartTall", "heartFinal", "top-down"),
            step("Hoàn thiện", "Lật mặt trước và chỉnh hai nửa trái tim cân nhau.", "heartFinal", "heartFinal", "flip")
          ])
        }),
        Object.freeze({
          id: "heart-pocket", title: "Trái tim có túi", difficulty: "Vừa", time: "8–10 phút",
          paper: "1 tờ giấy vuông", color: "Giấy hai mặt",
          result: "Trái tim có khe nhỏ để cài lời nhắn.", challenge: "Viết một mẩu giấy nhỏ rồi cài vào túi tim.",
          steps: Object.freeze([
            step("Tạo đường giữa", "Gấp đôi ngang và dọc rồi mở ra.", "square", "squareCross", "fold-cross"),
            step("Gấp hai mép vào giữa", "Đưa cạnh trên và dưới vào đường ngang giữa.", "squareCross", "heartBand", "sides-in"),
            step("Lật mặt", "Lật hình sang mặt sau.", "heartBand", "heartBandBack", "flip"),
            step("Tạo mũi dưới", "Gấp hai góc dưới vào đường dọc giữa.", "heartBandBack", "heartPoint", "corners-in"),
            step("Mở hai túi trên", "Kéo nhẹ hai lớp ở phía trên ra hai bên.", "heartPoint", "heartPocketOpen", "open"),
            step("Bo vai tim", "Gập các góc nhọn phía trên vào sau.", "heartPocketOpen", "heartPocket", "tip-in"),
            step("Hoàn thiện", "Lật mặt trước; khe ở giữa chính là túi nhỏ.", "heartPocket", "heartPocketFinal", "flip")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "box", icon: "📦", title: "Hộp giấy", tone: "teal",
      description: "Tạo hộp nhỏ để đựng hạt, kẹp tóc hoặc đồ chơi nhẹ.",
      variants: Object.freeze([
        Object.freeze({
          id: "open-box", title: "Hộp mở", difficulty: "Khéo tay", time: "12–15 phút",
          paper: "1 tờ giấy vuông", color: "Giấy 18 × 18 cm, hơi cứng",
          result: "Hộp vuông mở miệng, không cần keo.", challenge: "Gấp thêm một hộp khác nhỏ hơn để phân loại đồ dùng.",
          steps: Object.freeze([
            step("Tạo hai đường giữa", "Gấp đôi ngang và dọc rồi mở ra.", "square", "squareCross", "fold-cross"),
            step("Đưa bốn góc vào tâm", "Gấp cả bốn góc đúng vào tâm hình vuông.", "squareCross", "blintz", "corners-center"),
            step("Gấp hai cạnh vào giữa", "Gấp cạnh trên và dưới vào đường giữa rồi mở ra.", "blintz", "boxBandH", "sides-in"),
            step("Gấp hai cạnh còn lại", "Gấp cạnh trái và phải vào giữa rồi mở ra.", "boxBandH", "boxGrid", "sides-in"),
            step("Mở hai đầu", "Mở hai góc đối diện ra ngoài, giữ hai góc còn lại gập vào tâm.", "boxGrid", "boxOpenEnds", "open"),
            step("Dựng hai thành bên", "Gấp hai cạnh dài lên theo các nếp đã tạo.", "boxOpenEnds", "boxWalls", "bottom-up"),
            step("Khóa đầu thứ nhất", "Nâng đầu giấy lên, ép hai góc vào trong rồi gập đầu xuống đáy hộp.", "boxWalls", "boxOneEnd", "collapse"),
            step("Khóa đầu thứ hai", "Làm tương tự ở đầu còn lại.", "boxOneEnd", "boxOpen", "collapse", "Miết nếp ở bốn cạnh đáy giúp hộp đứng vuông hơn.")
          ])
        }),
        Object.freeze({
          id: "box-lid", title: "Hộp có nắp", difficulty: "Khéo tay", time: "20–25 phút",
          paper: "2 tờ giấy vuông", color: "Hai tờ cùng cỡ; tờ nắp gấp lỏng hơn một chút",
          result: "Một hộp đáy và một nắp rời.", challenge: "Trang trí ký hiệu riêng trên nắp để làm hộp quà nhỏ.",
          steps: Object.freeze([
            step("Gấp phần đáy", "Dùng tờ thứ nhất, gấp hộp mở theo các nếp tâm và bốn góc.", "square", "boxOpen", "corners-center"),
            step("Chuẩn bị tờ nắp", "Lấy tờ thứ hai, tạo hai đường giữa.", "squareAlt", "squareCrossAlt", "fold-cross"),
            step("Gấp góc gần tâm", "Gấp bốn góc về phía tâm nhưng chừa cách tâm khoảng 2–3 mm.", "squareCrossAlt", "boxLidLoose", "corners-center"),
            step("Tạo nếp thành nắp", "Gấp hai cặp cạnh vào gần giữa rồi mở ra để tạo lưới nếp.", "boxLidLoose", "boxLidGrid", "sides-in"),
            step("Mở hai đầu", "Mở hai góc đối diện.", "boxLidGrid", "boxLidEnds", "open"),
            step("Dựng thành", "Dựng hai cạnh bên theo nếp.", "boxLidEnds", "boxLidWalls", "bottom-up"),
            step("Khóa hai đầu", "Gập từng đầu xuống đáy như hộp mở.", "boxLidWalls", "boxLid", "collapse"),
            step("Thử nắp", "Đặt nắp lên hộp đáy. Nếu quá chặt, nới nhẹ bốn cạnh nắp.", "boxLid", "boxWithLid", "pull")
          ])
        })
      ])
    }),
    Object.freeze({
      id: "crown", icon: "👑", title: "Mũ & vương miện", tone: "amber",
      description: "Gấp mũ giấy và vương miện để bé đội chơi.",
      variants: Object.freeze([
        Object.freeze({
          id: "hat", title: "Mũ giấy", difficulty: "Dễ", time: "6–8 phút",
          paper: "1 tờ giấy chữ nhật lớn", color: "Giấy báo sạch hoặc giấy khổ A3",
          result: "Mũ tam giác có vành gập.", challenge: "Trang trí biểu tượng riêng ở mặt trước của mũ.",
          steps: Object.freeze([
            step("Gấp đôi giấy", "Đặt giấy ngang và gấp đôi từ trên xuống.", "rectLandscape", "rectHalf", "fold-h"),
            step("Đánh dấu giữa", "Gấp đôi trái–phải nhẹ rồi mở ra.", "rectHalf", "rectHalfCenter", "fold-v"),
            step("Tạo mái mũ", "Gấp hai góc trên vào đường giữa.", "rectHalfCenter", "boatHat", "corners-in"),
            step("Gấp vành trước", "Gấp mép dưới phía trước lên.", "boatHat", "hatBrim1", "bottom-up"),
            step("Gấp vành sau", "Lật lại và gấp mép dưới còn lại lên.", "hatBrim1", "hatBrim2", "bottom-up"),
            step("Mở mũ", "Tách nhẹ hai lớp ở đáy và mở ra thành mũ.", "hatBrim2", "hatFinal", "open", "Nếu đội trên đầu, cần dùng giấy lớn hơn A4.")
          ])
        }),
        Object.freeze({
          id: "crown", title: "Vương miện", difficulty: "Vừa", time: "8–10 phút",
          paper: "1 tờ giấy chữ nhật dài", color: "Giấy màu vàng; có thể nối 2 tờ nếu cần đội",
          result: "Vương miện có các chóp nhọn.", challenge: "Vẽ đá quý bằng bút màu lên từng chóp.",
          steps: Object.freeze([
            step("Gấp dải dài", "Gấp tờ giấy theo chiều dài để được một dải chắc hơn.", "rectLandscape", "crownBand", "fold-h"),
            step("Đánh dấu các đoạn", "Gấp zíc zắc nhẹ để chia dải thành các phần gần bằng nhau rồi mở ra.", "crownBand", "crownMarks", "accordion"),
            step("Tạo chóp thứ nhất", "Gấp một góc trên xuống tạo tam giác, sau đó gấp ngược lên.", "crownMarks", "crownOne", "reverse"),
            step("Tạo các chóp tiếp", "Lặp lại theo các vạch để tạo dãy chóp.", "crownOne", "crownPeaks", "accordion"),
            step("Khóa hai đầu", "Luồn hoặc gập hai đầu dải vào nhau để tạo vòng.", "crownPeaks", "crownRing", "pull"),
            step("Dựng chóp", "Mở vòng và dựng các chóp hướng lên.", "crownRing", "crownFinal", "open", "Đo vòng đầu trước; vương miện nên rộng hơn một chút để đội thoải mái.")
          ])
        })
      ])
    })
  ]);

  const SHAPE_NAMES = Object.freeze({
    rectPortrait: "Tờ giấy A4 đặt dọc", rectCenter: "Giấy có nếp giữa", rectLandscape: "Tờ giấy đặt ngang",
    rectHalf: "Giấy đã gấp đôi", rectHalfCenter: "Nửa tờ giấy có đường giữa", square: "Tờ giấy vuông",
    squareAlt: "Tờ giấy vuông thứ hai", squareGreen: "Tờ giấy vuông màu xanh", squareDiag: "Giấy có nếp chéo",
    squareDiagGreen: "Giấy xanh có nếp chéo", squareCross: "Giấy có nếp ngang dọc", squareCrossAlt: "Giấy thứ hai có nếp giữa",
    squareX: "Giấy có hai nếp chéo", squareGrid: "Giấy có đủ nếp nền", triangle: "Tam giác gấp đôi",
    triangleCenter: "Tam giác có trục giữa", kite: "Hình cánh diều", blintz: "Bốn góc vào tâm"
  });

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-fold-page{max-width:1180px;margin:0 auto;padding-bottom:1rem}
      .ee-fold-page *{box-sizing:border-box}
      .ee-fold-page button,.ee-fold-page select{font-family:inherit}
      .ee-fold-page .section-heading{margin-bottom:.8rem;align-items:center}
      .ee-fold-intro{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(280px,.6fr);gap:.9rem;margin:.3rem 0 1rem}
      .ee-fold-hero,.ee-fold-bunny{border:1px solid #E9D5FF;border-radius:22px;background:linear-gradient(135deg,#FDF2F8 0%,#F5F3FF 100%);padding:1rem 1.1rem;box-shadow:0 10px 24px rgba(124,58,237,.08)}
      .ee-fold-hero h2{margin:0 0 .35rem;color:#6D28D9;font-size:22px;line-height:1.2}
      .ee-fold-hero p{margin:0;color:#4B5563;font-size:16px;font-weight:800;line-height:1.55}
      .ee-fold-bunny{display:flex;gap:.75rem;align-items:center;background:linear-gradient(135deg,#ECFDF5 0%,#EFF6FF 100%);border-color:#A7F3D0}
      .ee-fold-bunny-icon{font-size:40px;line-height:1}
      .ee-fold-bunny strong{display:block;color:#047857;font-size:17px;margin-bottom:.2rem}
      .ee-fold-bunny span{color:#475569;font-size:14px;font-weight:800;line-height:1.45}
      .ee-fold-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem}
      .ee-fold-card{border:1px solid var(--fold-border,#E9D5FF);border-radius:20px;background:var(--fold-bg,#FAF5FF);padding:.9rem;text-align:left;min-height:150px;display:flex;flex-direction:column;gap:.55rem;box-shadow:0 8px 18px rgba(15,23,42,.06);transition:transform .14s ease,box-shadow .14s ease}
      .ee-fold-card:hover{transform:translateY(-2px);box-shadow:0 12px 22px rgba(15,23,42,.1)}
      .ee-fold-card[data-tone="purple"]{--fold-bg:#FAF5FF;--fold-border:#DDD6FE;--fold-ink:#6D28D9}
      .ee-fold-card[data-tone="teal"]{--fold-bg:#F0FDFA;--fold-border:#99F6E4;--fold-ink:#0F766E}
      .ee-fold-card[data-tone="pink"]{--fold-bg:#FDF2F8;--fold-border:#FBCFE8;--fold-ink:#BE185D}
      .ee-fold-card[data-tone="amber"]{--fold-bg:#FFFBEB;--fold-border:#FDE68A;--fold-ink:#B45309}
      .ee-fold-card-top{display:flex;align-items:center;gap:.65rem}
      .ee-fold-card-icon{font-size:34px;line-height:1}
      .ee-fold-card h3{margin:0;color:var(--fold-ink,#6D28D9);font-size:18px;line-height:1.22}
      .ee-fold-card p{margin:0;color:#475569;font-size:14px;font-weight:800;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      .ee-fold-card-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:.5rem;color:#64748B;font-size:12px;font-weight:900}
      .ee-fold-chip{display:inline-flex;align-items:center;gap:.25rem;border-radius:999px;border:1px solid var(--fold-border,#E9D5FF);background:#fff;padding:.28rem .55rem;color:var(--fold-ink,#6D28D9)}
      .ee-fold-done{color:#059669}
      .ee-fold-variant-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.85rem}
      .ee-fold-variant{border:1px solid #E5E7EB;border-radius:20px;background:#fff;padding:1rem;text-align:left;box-shadow:0 8px 20px rgba(15,23,42,.06);min-height:190px;display:flex;flex-direction:column;gap:.6rem}
      .ee-fold-variant:hover{border-color:#C4B5FD;box-shadow:0 12px 24px rgba(124,58,237,.1)}
      .ee-fold-variant h3{margin:0;color:#5B21B6;font-size:19px;line-height:1.25}
      .ee-fold-variant p{margin:0;color:#475569;font-size:14px;font-weight:800;line-height:1.45}
      .ee-fold-meta{display:flex;gap:.45rem;flex-wrap:wrap}
      .ee-fold-meta span{border-radius:999px;background:#F8FAFC;border:1px solid #E2E8F0;padding:.3rem .55rem;color:#475569;font-size:12px;font-weight:900}
      .ee-fold-variant-action{margin-top:auto;color:#7C3AED;font-size:14px;font-weight:1000}
      .ee-fold-workshop{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(330px,.65fr);gap:1rem}
      .ee-fold-main,.ee-fold-side{min-width:0}
      .ee-fold-prep{border:1px solid #E9D5FF;border-radius:20px;background:#FAF5FF;padding:.9rem 1rem;margin-bottom:.8rem}
      .ee-fold-prep-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.65rem}
      .ee-fold-prep-item{background:#fff;border:1px solid #E9D5FF;border-radius:15px;padding:.7rem}
      .ee-fold-prep-item span{display:block;color:#7C3AED;font-size:12px;font-weight:1000;text-transform:uppercase;letter-spacing:.03em;margin-bottom:.2rem}
      .ee-fold-prep-item strong{display:block;color:#1F2937;font-size:14px;line-height:1.35}
      .ee-fold-step-card{border:1px solid #E2E8F0;border-radius:22px;background:#fff;box-shadow:0 12px 28px rgba(15,23,42,.07);overflow:hidden}
      .ee-fold-progress{display:flex;align-items:center;justify-content:space-between;gap:.8rem;padding:.78rem 1rem;border-bottom:1px solid #EDE9FE;background:linear-gradient(90deg,#FDF2F8,#F5F3FF)}
      .ee-fold-progress strong{color:#6D28D9;font-size:16px}
      .ee-fold-progress-track{flex:1;max-width:460px;height:10px;border-radius:999px;background:#EDE9FE;overflow:hidden}
      .ee-fold-progress-bar{height:100%;border-radius:inherit;background:linear-gradient(90deg,#EC4899,#8B5CF6);transition:width .2s ease}
      .ee-fold-step-copy{padding:1rem 1.05rem .2rem}
      .ee-fold-step-copy h2{margin:0 0 .3rem;color:#111827;font-size:23px;line-height:1.25}
      .ee-fold-step-copy p{margin:0;color:#374151;font-size:17px;font-weight:800;line-height:1.55}
      .ee-fold-audio-tools{display:flex;flex-wrap:wrap;gap:.55rem;padding:0 1.05rem .1rem}
      .ee-fold-audio-btn{display:inline-flex;align-items:center;justify-content:center;gap:.35rem;min-height:40px;border-radius:12px;border:1px solid #D8B4FE;background:#fff;color:#6D28D9;padding:.6rem .85rem;font-size:14px;font-weight:1000;cursor:pointer}
      .ee-fold-audio-btn.stop{border-color:#FBCFE8;color:#BE185D;background:#FFF1F2}
      .ee-fold-diagram-wrap{padding:.85rem 1rem 1rem}
      .ee-fold-diagram-grid{display:grid;grid-template-columns:1fr 40px 1fr;align-items:center;gap:.35rem}
      .ee-fold-diagram-panel{border:1px solid #E2E8F0;border-radius:18px;background:linear-gradient(180deg,#FFFFFF 0%,#FFFEFA 100%);padding:.6rem;min-width:0}
      .ee-fold-diagram-label{text-align:center;color:#64748B;font-size:12px;font-weight:1000;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.2rem}
      .ee-fold-svg{display:block;width:100%;height:auto;max-height:300px}
      .ee-fold-next-arrow{text-align:center;font-size:30px;color:#A855F7;font-weight:1000}
      .ee-fold-tip{margin:.1rem 1rem 1rem;border-radius:15px;background:#ECFDF5;border:1px solid #A7F3D0;padding:.72rem .8rem;color:#065F46;font-size:14px;font-weight:900;line-height:1.45}
      .ee-fold-controls{display:grid;grid-template-columns:1fr auto 1fr;gap:.55rem;align-items:center;padding:.85rem 1rem 1rem}
      .ee-fold-btn{min-height:46px;border:none;border-radius:14px;padding:.7rem .95rem;font-size:15px;font-weight:1000;cursor:pointer}
      .ee-fold-btn.primary{background:linear-gradient(90deg,#EC4899,#8B5CF6);color:#fff;box-shadow:0 8px 16px rgba(168,85,247,.18)}
      .ee-fold-btn.secondary{background:#F8FAFC;border:1px solid #CBD5E1;color:#334155}
      .ee-fold-btn:disabled{opacity:.45;cursor:default}
      .ee-fold-count{min-width:92px;text-align:center;color:#6D28D9;font-size:14px;font-weight:1000}
      .ee-fold-side-card{border:1px solid #E2E8F0;border-radius:20px;background:#fff;padding:.9rem;margin-bottom:.8rem;box-shadow:0 8px 18px rgba(15,23,42,.05)}
      .ee-fold-side-card h3{margin:0 0 .55rem;color:#5B21B6;font-size:17px}
      .ee-fold-side-card p,.ee-fold-side-card li{color:#475569;font-size:14px;font-weight:800;line-height:1.5}
      .ee-fold-side-card p{margin:.3rem 0}
      .ee-fold-side-card ul{margin:.35rem 0 0;padding-left:1.2rem}
      .ee-fold-side-card li strong{color:#334155}
      .ee-fold-legend{display:grid;grid-template-columns:1fr 1fr;gap:.45rem}
      .ee-fold-legend div{border-radius:13px;background:#F8FAFC;border:1px solid #E2E8F0;padding:.55rem;color:#475569;font-size:12px;font-weight:900;line-height:1.35}
      .ee-fold-finish{border:1px solid #FBCFE8;border-radius:24px;background:linear-gradient(135deg,#FDF2F8,#F5F3FF);padding:1.2rem;text-align:center;box-shadow:0 16px 30px rgba(236,72,153,.1)}
      .ee-fold-finish-icon{font-size:58px;line-height:1;margin-bottom:.3rem}
      .ee-fold-finish h2{margin:.2rem 0;color:#BE185D;font-size:26px}
      .ee-fold-finish p{margin:.4rem auto;color:#475569;font-size:16px;font-weight:800;line-height:1.5;max-width:680px}
      .ee-fold-finish-actions{display:flex;justify-content:center;gap:.6rem;flex-wrap:wrap;margin-top:1rem}
      .ee-fold-breadcrumb{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;margin:-.15rem 0 .7rem;color:#64748B;font-size:13px;font-weight:900}
      .ee-fold-breadcrumb button{border:none;background:none;padding:0;color:#7C3AED;font:inherit;cursor:pointer}
      .ee-fold-note{margin-top:.8rem;color:#6B7280;font-size:12px;font-weight:800;line-height:1.45}
      @media(max-width:980px){
        .ee-fold-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
        .ee-fold-workshop{grid-template-columns:1fr}
        .ee-fold-side{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
        .ee-fold-side-card{margin:0}
      }
      @media(max-width:760px){
        .ee-fold-intro{grid-template-columns:1fr}
        .ee-fold-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.65rem}
        .ee-fold-variant-grid{grid-template-columns:1fr}
        .ee-fold-prep-grid{grid-template-columns:1fr}
        .ee-fold-diagram-grid{grid-template-columns:1fr;gap:.55rem}
        .ee-fold-next-arrow{transform:rotate(90deg);font-size:24px}
        .ee-fold-side{grid-template-columns:1fr}
        .ee-fold-step-copy h2{font-size:21px}
        .ee-fold-step-copy p{font-size:16px}
        .ee-fold-audio-tools{padding:0 1rem .1rem}
      }
      @media(max-width:460px){
        .ee-fold-grid{grid-template-columns:1fr}
        .ee-fold-audio-tools{flex-direction:column}
        .ee-fold-audio-btn{width:100%}
        .ee-fold-controls{grid-template-columns:1fr 1fr}
        .ee-fold-count{grid-column:1 / -1;grid-row:1;text-align:center}
        .ee-fold-controls .ee-fold-btn:first-child{grid-column:1;grid-row:2}
        .ee-fold-controls .ee-fold-btn:last-child{grid-column:2;grid-row:2}
      }
    `;
    document.head.appendChild(style);
  }

  function setSubBanner(items) {
    const setter = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof setter !== "function") return;
    const list = Array.isArray(items) ? items.filter(Boolean) : [];
    setter(list.length ? { items: list } : null);
  }

  function gameRootCrumb(action = null) {
    return { level: 2, title: "1. Xưởng Gấp Giấy", action };
  }

  function projectCrumb(project, action = null) {
    return { level: 3, title: `1.${projectNumber(project)} ${project.title}`, action };
  }

  function variantCrumb(project, variant) {
    return { level: 4, title: `${variantNumber(project, variant)} ${variant.title}` };
  }

  function projectById(id) {
    return PROJECTS.find((item) => item.id === id) || null;
  }

  function variantById(project, id) {
    return project && project.variants.find((item) => item.id === id) || null;
  }

  function projectNumber(project) {
    const index = PROJECTS.indexOf(project);
    return index >= 0 ? index + 1 : 1;
  }

  function variantNumber(project, variant) {
    if (!project || !variant) return "1.1.1";
    const projectIndex = PROJECTS.indexOf(project);
    const variantIndex = project.variants.indexOf(variant);
    const a = projectIndex >= 0 ? projectIndex + 1 : 1;
    const b = variantIndex >= 0 ? variantIndex + 1 : 1;
    return `1.${a}.${b}`;
  }

  function registryHtml() {
    const totalVariants = PROJECTS.reduce((sum, project) => sum + project.variants.length, 0);
    return `
      <div class="ee-fold-page">
        <div class="section-heading">
          <div><h1>🛩️ Xưởng Gấp Giấy</h1><p>Gấp từng bước cùng Cô Thỏ Hồng.</p></div>
          <button id="ee-fold-back-games" class="back-btn" type="button">← Games</button>
        </div>
        <div class="ee-fold-intro">
          <section class="ee-fold-hero">
            <h2>12 món • ${totalVariants} kiểu gấp</h2>
            <p>Chọn món bé thích, chuẩn bị đúng loại giấy rồi làm từng bước. Mỗi bước đều có hình <strong>trước → sau</strong>, đường gấp, mũi tên hướng dẫn và nút nghe Cô Thỏ Hồng đọc từng bước.</p>
          </section>
          <aside class="ee-fold-bunny"><span class="ee-fold-bunny-icon" aria-hidden="true">🐰</span><div><strong>Cô Thỏ Hồng nhắc bé</strong><span>Gấp chậm, miết nếp rõ và luôn so hai bên cho cân. Không cần làm thật nhanh đâu nhé!</span></div></aside>
        </div>
        <div class="ee-fold-grid">
          ${PROJECTS.map((project, index) => {
            const done = project.variants.filter((variant) => completedVariants.has(`${project.id}:${variant.id}`)).length;
            return `
              <button class="ee-fold-card" data-tone="${esc(project.tone)}" data-project="${esc(project.id)}" type="button">
                <div class="ee-fold-card-top"><span class="ee-fold-card-icon" aria-hidden="true">${project.icon}</span><h3>${index + 1}. ${esc(project.title)}</h3></div>
                <p>${esc(project.description)}</p>
                <div class="ee-fold-card-foot"><span class="ee-fold-chip">${project.variants.length} kiểu gấp</span>${done ? `<span class="ee-fold-done">✓ ${done} hoàn thành</span>` : `<span>Chọn để bắt đầu →</span>`}</div>
              </button>`;
          }).join("")}
        </div>
        <p class="ee-fold-note">Hình minh họa trong game là sơ đồ vector hướng dẫn nếp gấp. Với các mẫu “Khéo tay”, bé nên làm lần đầu cùng người lớn để quen thao tác mở túi và gấp ngược.</p>
      </div>`;
  }

  function variantsHtml(project) {
    return `
      <div class="ee-fold-page">
        <div class="section-heading">
          <div><h1>${project.icon} ${esc(project.title)}</h1><p>${esc(project.description)}</p></div>
          <button id="ee-fold-back-list" class="back-btn" type="button">← 12 món</button>
        </div>
        <div class="ee-fold-breadcrumb"><button type="button" data-crumb="home">Xưởng Gấp Giấy</button><span>›</span><strong>${esc(project.title)}</strong></div>
        <div class="ee-fold-variant-grid">
          ${project.variants.map((variant) => {
            const done = completedVariants.has(`${project.id}:${variant.id}`);
            return `
              <button class="ee-fold-variant" data-variant="${esc(variant.id)}" type="button">
                <div class="ee-fold-meta"><span>${esc(variant.difficulty)}</span><span>⏱ ${esc(variant.time)}</span><span>${variant.steps.length} bước</span></div>
                <h3>${esc(variant.title)} ${done ? "✓" : ""}</h3>
                <p><strong>Giấy:</strong> ${esc(variant.paper)}</p>
                <p>${esc(variant.result)}</p>
                <div class="ee-fold-variant-action">Xem hướng dẫn từng bước →</div>
              </button>`;
          }).join("")}
        </div>
      </div>`;
  }

  function shapeBody(name) {
    const paper = "#F9A8D4";
    const paper2 = "#FBCFE8";
    const back = "#FDE68A";
    const green = "#86EFAC";
    const edge = "#7C3AED";
    const dark = "#334155";
    const common = `stroke="${edge}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
    const pale = `fill="${paper2}" ${common}`;
    const fill = `fill="${paper}" ${common}`;
    const fillBack = `fill="${back}" ${common}`;
    const fillGreen = `fill="${green}" ${common}`;
    const line = `stroke="${dark}" stroke-width="3" stroke-linecap="round" fill="none"`;

    const simple = {
      rectPortrait: `<rect x="98" y="22" width="124" height="186" rx="3" ${fill}/>` ,
      rectCenter: `<rect x="98" y="22" width="124" height="186" rx="3" ${fill}/><line x1="160" y1="24" x2="160" y2="206" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      rectLandscape: `<rect x="55" y="52" width="210" height="126" rx="3" ${fill}/>` ,
      rectHalf: `<rect x="55" y="82" width="210" height="82" rx="3" ${fill}/>` ,
      rectHalfCenter: `<rect x="55" y="82" width="210" height="82" rx="3" ${fill}/><line x1="160" y1="84" x2="160" y2="162" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      square: `<rect x="75" y="35" width="170" height="170" rx="3" ${fill}/>` ,
      squareAlt: `<rect x="75" y="35" width="170" height="170" rx="3" ${fillBack}/>` ,
      squareGreen: `<rect x="75" y="35" width="170" height="170" rx="3" ${fillGreen}/>` ,
      squareDiag: `<rect x="75" y="35" width="170" height="170" rx="3" ${fill}/><line x1="78" y1="202" x2="242" y2="38" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      squareDiagGreen: `<rect x="75" y="35" width="170" height="170" rx="3" ${fillGreen}/><line x1="78" y1="202" x2="242" y2="38" stroke="#047857" stroke-width="2" stroke-dasharray="7 6"/>`,
      squareCross: `<rect x="75" y="35" width="170" height="170" rx="3" ${fill}/><path d="M160 37V203M77 120H243" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      squareCrossAlt: `<rect x="75" y="35" width="170" height="170" rx="3" ${fillBack}/><path d="M160 37V203M77 120H243" stroke="#B45309" stroke-width="2" stroke-dasharray="7 6"/>`,
      squareX: `<rect x="75" y="35" width="170" height="170" rx="3" ${fill}/><path d="M77 37L243 203M243 37L77 203" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      squareGrid: `<rect x="75" y="35" width="170" height="170" rx="3" ${fill}/><path d="M160 37V203M77 120H243M77 37L243 203M243 37L77 203" stroke="#A855F7" stroke-width="1.7" stroke-dasharray="6 5"/>`,
      triangle: `<polygon points="160,36 62,198 258,198" ${fill}/>` ,
      triangleCenter: `<polygon points="160,36 62,198 258,198" ${fill}/><line x1="160" y1="39" x2="160" y2="196" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      kite: `<polygon points="160,26 235,110 160,210 85,110" ${fill}/><line x1="160" y1="28" x2="160" y2="208" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      blintz: `<polygon points="160,42 236,118 160,194 84,118" ${fill}/><path d="M84 118L160 118L160 42M236 118L160 118L160 194" stroke="#C084FC" stroke-width="2" fill="none"/>`
    };
    if (simple[name]) return simple[name];

    const shapes = {
      planeNose1: `<path d="M98 208V88L160 24L222 88V208Z" ${fill}/><path d="M98 88H222M98 88L160 24L222 88" stroke="#C084FC" stroke-width="2.4" fill="none"/><path d="M160 26V206" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      planeNose2: `<path d="M118 208L136 104L160 24L184 104L202 208Z" ${fill}/><path d="M136 104L160 74L184 104M160 26V206" stroke="#C084FC" stroke-width="2.2" fill="none"/>`,
      planeShield: `<path d="M98 198V94L160 122L222 94V198Z" ${fill}/><polygon points="98,94 160,30 222,94 160,122" ${fillBack}/><path d="M98 94L160 122L222 94" stroke="#C084FC" stroke-width="2.2" fill="none"/>` ,
      planeLock: `<path d="M110 205V96L145 68L160 116L175 68L210 96V205Z" ${fill}/><path d="M145 68L160 116L175 68M110 96L160 116L210 96" stroke="#C084FC" stroke-width="2" fill="none"/><polygon points="145,116 160,136 175,116 160,98" ${fillBack}/>` ,
      planeLocked: `<path d="M110 205V96L145 68L160 116L175 68L210 96V205Z" ${fill}/><path d="M145 68L160 116L175 68M110 96L160 116L210 96" stroke="#C084FC" stroke-width="2" fill="none"/><polygon points="145,116 160,90 175,116" ${fillBack}/>` ,
      gliderNose: `<path d="M105 205V100L138 74L160 106L182 74L215 100V205Z" ${fill}/><path d="M138 74L160 106L182 74M105 100L160 120L215 100" stroke="#C084FC" stroke-width="2" fill="none"/><polygon points="145,115 160,132 175,115" ${fillBack}/>` ,
      planeFolded: `<path d="M160 22L204 208L160 182L116 208Z" ${fill}/><path d="M160 22L160 182" stroke="#5B21B6" stroke-width="4"/><path d="M160 78L184 134L160 126" stroke="#C084FC" stroke-width="2" fill="none"/>`,
      planeFoldedWide: `<path d="M160 28L222 206L160 178L98 206Z" ${fill}/><line x1="160" y1="30" x2="160" y2="178" stroke="#5B21B6" stroke-width="4"/><path d="M160 88L196 146L160 134" stroke="#C084FC" stroke-width="2" fill="none"/>`,
      planeWing1: `<path d="M160 24L202 206L160 172L62 186L118 92Z" ${fill}/><path d="M160 24L160 172M118 92L160 118L202 206" stroke="#5B21B6" stroke-width="3" fill="none"/>` ,
      planeDart: `<path d="M160 24L258 190L160 170L62 190Z" ${fill}/><path d="M160 24L160 170" ${line}/><path d="M62 190L160 146L258 190" stroke="#C084FC" stroke-width="2.2" fill="none"/>` ,
      planeDistance: `<path d="M160 34L270 185L160 168L50 185Z" ${fill}/><path d="M160 34L160 168" ${line}/><path d="M50 185L160 150L270 185" stroke="#C084FC" stroke-width="2.2" fill="none"/>` ,
      planeDistanceTabs: `<path d="M160 34L270 185L160 168L50 185Z" ${fill}/><path d="M160 34L160 168" ${line}/><path d="M50 185L160 150L270 185" stroke="#C084FC" stroke-width="2.2" fill="none"/><path d="M58 176L84 164M262 176L236 164" stroke="#0F766E" stroke-width="5"/>`,
      planeGlider: `<path d="M160 52L280 175L160 162L40 175Z" ${fill}/><path d="M160 52L160 162" ${line}/><path d="M40 175L160 144L280 175" stroke="#C084FC" stroke-width="2.2" fill="none"/>` ,
      planeGliderTabs: `<path d="M160 52L280 175L160 162L40 175Z" ${fill}/><path d="M160 52L160 162" ${line}/><path d="M40 175L160 144L280 175" stroke="#C084FC" stroke-width="2.2" fill="none"/><path d="M48 166L74 152M272 166L246 152" stroke="#0F766E" stroke-width="5"/>`,
      boatHat: `<path d="M65 186H255L226 92L160 40L94 92Z" ${fill}/><path d="M94 92L160 92L226 92M65 186H255" stroke="#C084FC" stroke-width="2.2" fill="none"/>` ,
      boatHatLocked: `<path d="M55 190H265L228 90L160 38L92 90Z" ${fill}/><rect x="55" y="168" width="210" height="28" ${fillBack}/><path d="M92 90L160 90L228 90" stroke="#C084FC" stroke-width="2.2" fill="none"/>` ,
      boatDiamond: `<polygon points="160,28 260,118 160,208 60,118" ${fill}/><path d="M60 118H260M160 28V208" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      boatSmallDiamond: `<polygon points="160,45 238,118 160,191 82,118" ${fill}/><polygon points="160,45 160,118 82,118" ${fillBack}/><path d="M82 118H238" stroke="#C084FC" stroke-width="2"/>` ,
      boatDiamond2: `<polygon points="160,42 242,118 160,194 78,118" ${fill}/><path d="M160 43V193M78 118H242" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      boatFinal: `<path d="M48 130L112 190H208L272 130L225 142L160 72L95 142Z" ${fill}/><path d="M112 190H208M95 142H225M160 72V142" stroke="#5B21B6" stroke-width="3" fill="none"/>` ,
      sailBoatBase: `<polygon points="160,38 62,188 258,188" ${fill}/><rect x="62" y="168" width="196" height="26" ${fillBack}/><path d="M62 168H258" stroke="#C084FC" stroke-width="2"/>` ,
      sailBoat: `<path d="M65 184H255L160 50L148 150Z" ${fill}/><rect x="65" y="165" width="190" height="26" ${fillBack}/><path d="M148 150L160 50L192 166" stroke="#5B21B6" stroke-width="3" fill="none"/>` ,
      sailBoatOpen: `<path d="M58 178L88 196H232L262 178L160 46L145 158Z" ${fill}/><path d="M88 196H232M145 158L160 46L194 174" stroke="#5B21B6" stroke-width="3" fill="none"/>` ,
      blintzBack: `<polygon points="160,42 236,118 160,194 84,118" ${fillBack}/><path d="M84 118L160 118L160 42M236 118L160 118L160 194" stroke="#D97706" stroke-width="2" fill="none"/>`,
      blintzSmall: `<polygon points="160,60 218,118 160,176 102,118" ${fill}/><path d="M102 118H218M160 60V176" stroke="#C084FC" stroke-width="2"/>`,
      cameraFlaps: `<rect x="108" y="72" width="104" height="92" rx="8" ${fill}/><path d="M108 72L76 100V146L108 164M212 72L244 100V146L212 164" stroke="#C084FC" stroke-width="2.4" fill="none"/><rect x="58" y="92" width="50" height="54" rx="6" ${fillBack}/><rect x="212" y="92" width="50" height="54" rx="6" ${fillBack}/>` ,
      cameraBody: `<rect x="72" y="82" width="176" height="92" rx="12" ${fill}/><path d="M92 82H228M92 174H228" stroke="#C084FC" stroke-width="2" fill="none"/><rect x="48" y="100" width="42" height="56" rx="6" ${fillBack}/><rect x="230" y="100" width="42" height="56" rx="6" ${fillBack}/>` ,
      cameraLocked: `<rect x="72" y="82" width="176" height="92" rx="12" ${fill}/><circle cx="160" cy="128" r="30" ${fillBack}/><circle cx="160" cy="128" r="15" fill="#fff" ${common}/><rect x="208" y="70" width="24" height="12" rx="4" ${fillBack}/>` ,
      cameraFinal: `<rect x="62" y="80" width="196" height="100" rx="16" ${fill}/><circle cx="160" cy="130" r="36" ${fillBack}/><circle cx="160" cy="130" r="19" fill="#fff" ${common}/><circle cx="160" cy="130" r="8" fill="#E2E8F0" stroke="#334155" stroke-width="2"/><rect x="208" y="62" width="34" height="18" rx="5" ${fillBack}/><rect x="88" y="66" width="32" height="14" rx="5" ${fillBack}/>` ,
      birdSquare: `<polygon points="160,44 236,120 160,196 84,120" ${fill}/><path d="M84 120H236M160 44V196M84 120L160 120L236 120" stroke="#C084FC" stroke-width="2" fill="none"/>`,
      birdKite: `<polygon points="160,28 214,118 160,205 106,118" ${fill}/><path d="M106 118L160 84L214 118M160 30V203" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6" fill="none"/>`,
      birdLongDiamond: `<polygon points="160,18 220,120 160,218 100,120" ${fill}/><path d="M100 120L160 92L220 120M160 20V216" stroke="#A855F7" stroke-width="2" fill="none"/>`,
      birdBase: `<path d="M160 18L215 116L190 218L160 138L130 218L105 116Z" ${fill}/><path d="M105 116L160 138L215 116M130 218L160 138L190 218" stroke="#C084FC" stroke-width="2" fill="none"/>` ,
      birdNeckBase: `<path d="M160 32L205 112L184 218L160 132L136 218L115 112Z" ${fill}/><path d="M115 112L160 132L205 112M136 218L160 132L184 218" ${line}/>` ,
      birdNeckTail: `<path d="M160 118L112 40L132 208L160 140L188 208L220 52L160 118Z" ${fill}/><path d="M160 118L132 208M160 118L188 208" stroke="#C084FC" stroke-width="2" fill="none"/>` ,
      craneHead: `<path d="M160 118L112 42L126 66L132 208L160 140L188 208L220 52Z" ${fill}/><path d="M160 118L132 208M160 118L188 208" stroke="#C084FC" stroke-width="2" fill="none"/><polygon points="112,42 91,55 126,66" ${fillBack}/>` ,
      craneFinal: `<path d="M160 126L92 52L124 110L42 154L140 150L160 202L180 150L278 154L196 110L224 64Z" ${fill}/><path d="M140 150L160 126L180 150" stroke="#C084FC" stroke-width="2" fill="none"/><polygon points="92,52 76,62 124,110" ${fillBack}/>` ,
      flapBird: `<path d="M160 126L96 58L126 112L48 166L144 148L160 204L176 148L272 166L194 112L224 64Z" ${fill}/><path d="M144 148L160 126L176 148" stroke="#C084FC" stroke-width="2" fill="none"/><polygon points="96,58 80,68 126,112" ${fillBack}/>` ,
      frogX: `<rect x="100" y="28" width="120" height="184" ${fill}/><path d="M100 28L220 120M220 28L100 120" stroke="#A855F7" stroke-width="2" stroke-dasharray="7 6"/>`,
      frogTriangle: `<path d="M100 212V120L160 38L220 120V212Z" ${fill}/><polygon points="100,120 160,38 220,120" ${fillBack}/>` ,
      frogFrontLegs: `<path d="M104 210V122L160 42L216 122V210Z" ${fill}/><path d="M160 95L112 78M160 95L208 78" ${line}/>` ,
      frogBody: `<path d="M120 210L130 118L160 50L190 118L200 210Z" ${fill}/><path d="M160 94L120 80M160 94L200 80" ${line}/>` ,
      frogFoldUp: `<path d="M120 162L160 44L200 162L190 202H130Z" ${fill}/>` ,
      frogSpring: `<path d="M120 158L160 42L200 158L184 190L160 168L136 190Z" ${fill}/><path d="M136 190L160 168L184 190" ${line}/>` ,
      frogFinal: `<path d="M100 142L124 102L144 116L160 78L176 116L196 102L220 142L194 168L184 198L160 176L136 198L126 168Z" ${fill}/><circle cx="142" cy="112" r="7" fill="#fff" stroke="#334155" stroke-width="2"/><circle cx="178" cy="112" r="7" fill="#fff" stroke="#334155" stroke-width="2"/>`,
      frogFaceEyes: `<polygon points="160,48 62,188 258,188" ${fill}/><path d="M95 170L126 108M225 170L194 108" ${line}/>` ,
      frogFace: `<path d="M92 176L126 108L160 52L194 108L228 176Z" ${fill}/>` ,
      frogFaceFinal: `<path d="M92 176L126 108L160 52L194 108L228 176Z" ${fill}/><circle cx="132" cy="120" r="10" fill="#fff" stroke="#334155" stroke-width="2"/><circle cx="188" cy="120" r="10" fill="#fff" stroke="#334155" stroke-width="2"/><path d="M135 155Q160 172 185 155" ${line}/>` ,
      fishTail: `<path d="M86 120L160 42L234 120L190 176L238 194L184 200L160 198L136 200L82 194L130 176Z" ${fill}/>` ,
      fishBody: `<path d="M92 120Q138 62 194 86L244 58L228 122L244 184L194 154Q138 178 92 120Z" ${fill}/>` ,
      fishFinal: `<path d="M92 120Q138 62 194 86L244 58L228 122L244 184L194 154Q138 178 92 120Z" ${fill}/><circle cx="126" cy="112" r="7" fill="#fff" stroke="#334155" stroke-width="2"/><path d="M150 88Q160 120 150 152M175 83Q186 120 175 157" stroke="#BE185D" stroke-width="3" fill="none"/>`,
      fishDiamond: `<polygon points="160,40 232,120 160,200 88,120" ${fill}/>` ,
      fishDiamondBack: `<polygon points="160,40 232,120 160,200 88,120" ${fillBack}/>` ,
      fishWideBody: `<path d="M94 120L138 62L202 84L230 120L202 156L138 178Z" ${fill}/>` ,
      fishTropical: `<path d="M82 120Q135 64 200 90L258 54L234 120L258 186L200 150Q135 176 82 120Z" ${fill}/>` ,
      fishTropicalFinal: `<path d="M82 120Q135 64 200 90L258 54L234 120L258 186L200 150Q135 176 82 120Z" ${fill}/><circle cx="122" cy="108" r="7" fill="#fff" stroke="#334155" stroke-width="2"/><path d="M150 82L170 158M178 83L196 151" stroke="#0F766E" stroke-width="4"/>`,
      catHeadBase: `<polygon points="160,76 78,188 242,188" ${fill}/><polygon points="160,76 126,118 194,118" ${fillBack}/>` ,
      catEars: `<path d="M92 185L112 98L148 126L160 84L172 126L208 98L228 185Z" ${fill}/>` ,
      catFace: `<path d="M92 185L112 98L148 126L160 84L172 126L208 98L228 185L160 202Z" ${fill}/>` ,
      catFaceFinal: `<path d="M92 185L112 98L148 126L160 84L172 126L208 98L228 185L160 202Z" ${fill}/><circle cx="137" cy="151" r="6" fill="#334155"/><circle cx="183" cy="151" r="6" fill="#334155"/><path d="M160 160L154 168H166Z" fill="#BE185D"/><path d="M118 170L148 167M202 170L172 167" ${line}/>` ,
      catBodyHead: `<path d="M160 28L214 110L188 200L132 200L106 110Z" ${fill}/><polygon points="128,96 160,68 192,96 160,124" ${fillBack}/>` ,
      catBodyEars: `<path d="M122 86L132 48L154 76L166 76L188 48L198 86L190 198H130Z" ${fill}/>` ,
      catBodyLegs: `<path d="M122 86L132 48L154 76L166 76L188 48L198 86L190 170L208 202L160 184L112 202L130 170Z" ${fill}/>` ,
      catSit: `<path d="M122 86L132 48L154 76L166 76L188 48L198 86L190 170L208 202L160 184L112 202L130 170Z" ${fill}/><path d="M190 164Q250 174 230 110" ${line}/>` ,
      catSitFinal: `<path d="M122 86L132 48L154 76L166 76L188 48L198 86L190 170L208 202L160 184L112 202L130 170Z" ${fill}/><path d="M190 164Q250 174 230 110" ${line}/><circle cx="146" cy="98" r="5" fill="#334155"/><circle cx="174" cy="98" r="5" fill="#334155"/>`,
      dogEar1: `<polygon points="160,50 64,192 256,192" ${fill}/><polygon points="64,192 112,104 136,146" ${fillBack}/>` ,
      dogEars: `<polygon points="160,50 64,192 256,192" ${fill}/><polygon points="64,192 112,104 136,146" ${fillBack}/><polygon points="256,192 208,104 184,146" ${fillBack}/>` ,
      dogFace: `<path d="M88 184L112 104L138 146L160 74L182 146L208 104L232 184L160 204Z" ${fill}/>` ,
      dogFaceFinal: `<path d="M88 184L112 104L138 146L160 74L182 146L208 104L232 184L160 204Z" ${fill}/><circle cx="140" cy="150" r="6" fill="#334155"/><circle cx="180" cy="150" r="6" fill="#334155"/><ellipse cx="160" cy="171" rx="10" ry="7" fill="#334155"/>`,
      dogBodyBase: `<path d="M72 172L158 52L248 172L188 178L160 206L132 178Z" ${fill}/>` ,
      dogBodyHead: `<path d="M82 170L142 82L170 38L198 88L244 170L186 176L160 204L132 176Z" ${fill}/>` ,
      dogBodyMuzzle: `<path d="M82 170L142 82L170 55L198 88L244 170L186 176L160 204L132 176Z" ${fill}/><polygon points="170,55 152,78 183,82" ${fillBack}/>` ,
      dogBodyLegs: `<path d="M82 160L142 82L170 55L198 88L244 160L212 194L184 176L160 204L136 176L108 194Z" ${fill}/>` ,
      dogStanding: `<path d="M82 160L142 82L170 55L198 88L230 150L268 128L240 176L212 194L184 176L160 204L136 176L108 194Z" ${fill}/>` ,
      dogStandingFinal: `<path d="M82 160L142 82L170 55L198 88L230 150L268 128L240 176L212 194L184 176L160 204L136 176L108 194Z" ${fill}/><circle cx="176" cy="90" r="5" fill="#334155"/>`,
      tulipLeft: `<polygon points="160,48 76,190 244,190" ${fill}/><polygon points="76,190 126,108 160,190" ${fillBack}/>` ,
      tulipPetals: `<path d="M72 190L124 106L160 154L196 106L248 190L160 204Z" ${fill}/>` ,
      tulipFinal: `<path d="M84 180L112 92L160 132L208 92L236 180L160 204Z" ${fill}/>` ,
      stemKite: `<polygon points="160,26 210,114 160,210 110,114" ${fillGreen}/>` ,
      stemNarrow: `<polygon points="160,26 186,114 160,210 134,114" ${fillGreen}/>` ,
      stemFold: `<path d="M160 28L178 116L160 210L142 116Z" ${fillGreen}/>` ,
      stemLeaf: `<path d="M160 30L174 112L242 154L174 166L160 210L146 166L78 154L146 112Z" ${fillGreen}/>` ,
      tulipStem: `<path d="M160 88L172 210H148Z" ${fillGreen}/><path d="M84 112L116 24L160 66L204 24L236 112L160 138Z" ${fill}/><path d="M160 150L218 178L168 182" ${fillGreen}/>` ,
      heartHalf: `<rect x="76" y="76" width="168" height="128" ${fill}/><rect x="76" y="140" width="168" height="64" ${fillBack}/>` ,
      heartHalfBack: `<rect x="76" y="76" width="168" height="128" ${fillBack}/><rect x="76" y="140" width="168" height="64" ${fill}/>` ,
      heartPoint: `<path d="M84 92H236L160 208Z" ${fill}/>` ,
      heartPointFront: `<path d="M84 92H236L160 208Z" ${fillBack}/>` ,
      heartTall: `<path d="M112 54H208L222 116L160 210L98 116Z" ${fill}/>` ,
      heartFinal: `<path d="M160 204L82 126Q58 86 94 62Q128 42 160 78Q192 42 226 62Q262 86 238 126Z" ${fill}/>` ,
      heartBand: `<rect x="74" y="72" width="172" height="96" ${fill}/><rect x="74" y="96" width="172" height="48" ${fillBack}/>` ,
      heartBandBack: `<rect x="74" y="72" width="172" height="96" ${fillBack}/><rect x="74" y="96" width="172" height="48" ${fill}/>` ,
      heartPocketOpen: `<path d="M160 206L88 132L104 72L160 116L216 72L232 132Z" ${fill}/><path d="M104 72L160 116L216 72" ${line}/>` ,
      heartPocket: `<path d="M160 204L82 126Q60 90 98 64Q130 46 160 82Q190 46 222 64Q260 90 238 126Z" ${fill}/><path d="M112 112H208" stroke="#BE185D" stroke-width="3"/>`,
      heartPocketFinal: `<path d="M160 204L82 126Q60 90 98 64Q130 46 160 82Q190 46 222 64Q260 90 238 126Z" ${fill}/><path d="M112 112H208" stroke="#BE185D" stroke-width="3"/><rect x="130" y="96" width="60" height="34" rx="4" fill="#fff" stroke="#BE185D" stroke-width="2"/>`,
      boxBandH: `<polygon points="160,42 236,118 160,194 84,118" ${fill}/><path d="M98 104H222M98 132H222" stroke="#A855F7" stroke-width="2" stroke-dasharray="6 5"/>`,
      boxGrid: `<rect x="76" y="36" width="168" height="168" ${fill}/><path d="M118 36V204M202 36V204M76 78H244M76 162H244" stroke="#A855F7" stroke-width="2" stroke-dasharray="6 5"/>`,
      boxOpenEnds: `<path d="M52 120L118 78H202L268 120L202 162H118Z" ${fill}/><path d="M118 78V162M202 78V162" ${line}/>` ,
      boxWalls: `<path d="M90 82L118 56H202L230 82V176L202 202H118L90 176Z" ${fill}/><rect x="118" y="82" width="84" height="94" fill="#fff" stroke="#7C3AED" stroke-width="3"/>`,
      boxOneEnd: `<path d="M96 78L118 60H202L228 82V176L202 198H118L96 176Z" ${fill}/><rect x="118" y="82" width="84" height="94" fill="#fff" stroke="#7C3AED" stroke-width="3"/><polygon points="118,82 160,116 202,82" ${fillBack}/>` ,
      boxOpen: `<path d="M92 76L116 52H204L228 76V178L204 202H116L92 178Z" ${fill}/><rect x="116" y="76" width="88" height="102" fill="#fff" stroke="#7C3AED" stroke-width="3"/>`,
      boxLidLoose: `<polygon points="160,48 230,118 160,188 90,118" ${fillBack}/><circle cx="160" cy="118" r="4" fill="#B45309"/>`,
      boxLidGrid: `<rect x="76" y="36" width="168" height="168" ${fillBack}/><path d="M116 36V204M204 36V204M76 76H244M76 164H244" stroke="#B45309" stroke-width="2" stroke-dasharray="6 5"/>`,
      boxLidEnds: `<path d="M48 120L116 76H204L272 120L204 164H116Z" ${fillBack}/>` ,
      boxLidWalls: `<path d="M88 78L116 52H204L232 78V178L204 204H116L88 178Z" ${fillBack}/><rect x="116" y="78" width="88" height="100" fill="#fff" stroke="#B45309" stroke-width="3"/>`,
      boxLid: `<path d="M92 76L116 52H204L228 76V178L204 202H116L92 178Z" ${fillBack}/><rect x="116" y="76" width="88" height="102" fill="#fff" stroke="#B45309" stroke-width="3"/>`,
      boxWithLid: `<rect x="100" y="92" width="120" height="96" rx="8" ${fill}/><path d="M88 90L112 64H208L232 90L218 110H102Z" ${fillBack}/>` ,
      crownBand: `<rect x="50" y="90" width="220" height="70" ${fillBack}/>` ,
      crownMarks: `<rect x="50" y="90" width="220" height="70" ${fillBack}/><path d="M94 90V160M138 90V160M182 90V160M226 90V160" stroke="#B45309" stroke-width="2" stroke-dasharray="6 5"/>`,
      crownOne: `<path d="M50 160V90L94 128L138 90V160Z" ${fillBack}/>` ,
      crownPeaks: `<path d="M42 172V100L78 62L114 100L150 62L186 100L222 62L258 100V172Z" ${fillBack}/>` ,
      crownRing: `<path d="M74 164Q160 210 246 164V96Q160 52 74 96Z" ${fillBack}/><path d="M74 96L105 66L136 102L167 60L198 102L229 66L246 96" ${line}/>` ,
      crownFinal: `<path d="M74 174Q160 212 246 174V108L218 62L190 104L160 48L130 104L102 62L74 108Z" ${fillBack}/>` ,
      hatBrim1: `<path d="M62 186H258L226 90L160 40L94 90Z" ${fill}/><rect x="62" y="166" width="196" height="30" ${fillBack}/>` ,
      hatBrim2: `<path d="M56 188H264L226 90L160 40L94 90Z" ${fill}/><rect x="56" y="164" width="208" height="34" ${fillBack}/>` ,
      hatFinal: `<path d="M60 178L100 92L160 38L220 92L260 178L220 198H100Z" ${fill}/><path d="M100 178H220" ${line}/>` ,
    };
    return shapes[name] || `<rect x="78" y="38" width="164" height="164" rx="4" ${pale}/><text x="160" y="124" text-anchor="middle" fill="#6D28D9" font-size="16" font-weight="900">${esc(SHAPE_NAMES[name] || "Nếp gấp")}</text>`;
  }

  function guideBody(type) {
    const dash = `stroke="#475569" stroke-width="2.5" stroke-dasharray="8 7" fill="none"`;
    const arrow = `stroke="#DB2777" stroke-width="4" fill="none" stroke-linecap="round" marker-end="url(#foldArrow)"`;
    const guides = {
      "fold-v": `<line x1="160" y1="30" x2="160" y2="210" ${dash}/><path d="M86 128C108 92 130 92 151 118" ${arrow}/>` ,
      "fold-h": `<line x1="55" y1="120" x2="265" y2="120" ${dash}/><path d="M158 52C194 74 194 92 164 112" ${arrow}/>` ,
      "fold-cross": `<path d="M160 32V208M60 120H260" ${dash}/><path d="M80 70Q120 86 150 112" ${arrow}/>` ,
      "fold-diag-r": `<line x1="78" y1="202" x2="242" y2="38" ${dash}/><path d="M78 60Q120 70 148 105" ${arrow}/>` ,
      "fold-diag-both": `<path d="M78 38L242 202M242 38L78 202" ${dash}/><path d="M62 85Q110 95 146 118" ${arrow}/>` ,
      "corners-in": `<line x1="160" y1="34" x2="160" y2="208" ${dash}/><path d="M92 54C110 68 126 84 151 108M228 54C210 68 194 84 169 108" ${arrow}/>` ,
      "corners-center": `<path d="M70 54Q106 74 148 112M250 54Q214 74 172 112M70 190Q108 164 148 128M250 190Q212 164 172 128" ${arrow}/>` ,
      "sides-in": `<line x1="160" y1="28" x2="160" y2="212" ${dash}/><path d="M84 120C112 112 126 112 148 120M236 120C208 112 194 112 172 120" ${arrow}/>` ,
      "top-down": `<line x1="68" y1="118" x2="252" y2="118" ${dash}/><path d="M160 46C178 68 182 88 164 114" ${arrow}/>` ,
      "bottom-up": `<line x1="68" y1="122" x2="252" y2="122" ${dash}/><path d="M160 202C142 176 138 156 156 130" ${arrow}/>` ,
      "tip-in": `<path d="M160 45Q188 76 164 103" ${arrow}/>` ,
      "flip": `<path d="M65 118Q160 30 255 118" ${arrow}/><text x="160" y="54" text-anchor="middle" fill="#BE185D" font-size="13" font-weight="900">Lật mặt</text>` ,
      "open": `<path d="M158 118C128 96 102 92 74 104M162 118C192 96 218 92 246 104" ${arrow}/><text x="160" y="62" text-anchor="middle" fill="#BE185D" font-size="13" font-weight="900">Mở túi rồi ép phẳng</text>` ,
      "pull": `<path d="M144 120C114 120 92 120 70 120M176 120C206 120 228 120 250 120" ${arrow}/><text x="160" y="64" text-anchor="middle" fill="#BE185D" font-size="13" font-weight="900">Kéo thật nhẹ</text>` ,
      "collapse": `<path d="M68 120Q110 110 146 120M252 120Q210 110 174 120" ${arrow}/><path d="M160 48Q180 82 160 108" ${arrow}/><text x="160" y="58" text-anchor="middle" fill="#BE185D" font-size="13" font-weight="900">Ép nếp vào trong</text>` ,
      "reverse": `<path d="M142 176Q118 132 146 94Q176 64 188 102" ${arrow}/><text x="208" y="80" text-anchor="middle" fill="#BE185D" font-size="13" font-weight="900">Gấp ngược</text>` ,
      "press": `<path d="M160 44V96" ${arrow}/><text x="160" y="35" text-anchor="middle" fill="#BE185D" font-size="13" font-weight="900">Ấn rồi thả</text>` ,
      "decorate": `<text x="160" y="45" text-anchor="middle" fill="#BE185D" font-size="15" font-weight="1000">✎ Vẽ trang trí</text>` ,
      "accordion": `<path d="M80 80L110 110L140 80L170 110L200 80L230 110" ${arrow}/>`
    };
    return guides[type] || "";
  }

  function guideHintText(type) {
    const hints = {
      "fold-v": "Canh hai mép dọc trùng nhau rồi mới miết nếp giữa.",
      "fold-h": "Canh mép trên và mép dưới khít nhau trước khi vuốt nếp.",
      "fold-cross": "Hai nếp giữa chỉ dùng để định tâm; gấp nhẹ rồi mở ra là đủ.",
      "fold-diag-r": "Canh đúng hai góc chéo chạm nhau để đường chéo thật thẳng.",
      "fold-diag-both": "Làm lần lượt từng đường chéo, mở ra sau mỗi lần để tạo nếp chuẩn.",
      "corners-in": "Hai góc gấp vào phải chạm đúng đường giữa và cân đối hai bên.",
      "corners-center": "Bốn góc cùng hướng vào tâm; đầu nhọn của góc nên chạm đúng điểm giữa.",
      "sides-in": "Vuốt từ đầu nhọn xuống cuối nếp để hai cạnh ép thẳng và không bị lệch.",
      "top-down": "Gấp phần trên xuống theo nếp ngang, giữ hai góc trái phải cân nhau.",
      "bottom-up": "Nâng phần dưới lên và miết từ giữa ra hai bên để mép phẳng đều.",
      "tip-in": "Chỉ gập đầu nhọn một đoạn ngắn để bớt sắc, không gập quá sâu.",
      "flip": "Lật cả mô hình sang mặt sau, giữ nguyên chiều trên – dưới như hình minh họa.",
      "open": "Tách nhẹ hai lớp giấy, mở túi rồi ép phẳng lại theo hình mới.",
      "pull": "Kéo hai đầu thật nhẹ và dừng lại khi hình mở đủ, tránh giật mạnh làm rách giấy.",
      "collapse": "Dùng các nếp đã có để ép giấy tự khép vào trong, rồi miết các cạnh mới.",
      "reverse": "Miết nếp trước, mở nhẹ chân giấy rồi bẻ ngược vào trong theo đường đã đánh dấu.",
      "press": "Ấn ở giữa phần lò xo hoặc lưng mô hình rồi thả tay nhanh.",
      "decorate": "Sau khi gấp xong, bé mới vẽ mắt, hoa văn hoặc trang trí thêm.",
      "accordion": "Gấp lên xuống xen kẽ theo từng dải bằng nhau để tạo nếp quạt."
    };
    return hints[type] || "Quan sát kỹ hình trước và hình sau; các nét đứt là nếp gấp, mũi tên cho biết hướng gập giấy.";
  }

  function diagramSvg(shape, guide = "", label = "") {
    return `
      <svg class="ee-fold-svg" viewBox="0 0 320 240" role="img" aria-label="${esc(label || SHAPE_NAMES[shape] || "Sơ đồ gấp giấy")}">
        <defs>
          <marker id="foldArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L6,3 z" fill="#DB2777"/></marker>
          <filter id="paperShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#64748B" flood-opacity=".14"/></filter>
        </defs>
        <rect x="5" y="5" width="310" height="230" rx="18" fill="#FFFEFA"/>
        <g filter="url(#paperShadow)">${shapeBody(shape)}</g>
        <g>${guideBody(guide)}</g>
      </svg>`;
  }

  function workshopHtml(project, variant) {
    const stepItem = variant.steps[currentStepIndex];
    const progress = Math.round(((currentStepIndex + 1) / variant.steps.length) * 100);
    return `
      <div class="ee-fold-page">
        <div class="section-heading">
          <div><h1>${project.icon} ${esc(variant.title)}</h1><p>${esc(variant.result)}</p></div>
          <button id="ee-fold-back-variants" class="back-btn" type="button">← ${esc(project.title)}</button>
        </div>
        <div class="ee-fold-breadcrumb"><button type="button" data-crumb="home">Xưởng Gấp Giấy</button><span>›</span><button type="button" data-crumb="project">${esc(project.title)}</button><span>›</span><strong>${esc(variant.title)}</strong></div>
        <div class="ee-fold-prep">
          <div class="ee-fold-prep-grid">
            <div class="ee-fold-prep-item"><span>Chuẩn bị</span><strong>${esc(variant.paper)}</strong></div>
            <div class="ee-fold-prep-item"><span>Loại giấy</span><strong>${esc(variant.color)}</strong></div>
            <div class="ee-fold-prep-item"><span>Độ khó • thời gian</span><strong>${esc(variant.difficulty)} • ${esc(variant.time)}</strong></div>
          </div>
        </div>
        <div class="ee-fold-workshop">
          <main class="ee-fold-main">
            <section class="ee-fold-step-card">
              <div class="ee-fold-progress"><strong>Bước ${currentStepIndex + 1}/${variant.steps.length}</strong><div class="ee-fold-progress-track" aria-hidden="true"><div class="ee-fold-progress-bar" style="width:${progress}%"></div></div></div>
              <div class="ee-fold-step-copy"><h2>${esc(stepItem.title)}</h2><p>${esc(stepItem.instruction)}</p></div>
              <div class="ee-fold-audio-tools">
                <button id="ee-fold-read-step" class="ee-fold-audio-btn" type="button">🔊 Nghe bước này</button>
                <button id="ee-fold-read-rules" class="ee-fold-audio-btn" type="button">🐰 Nghe ${BUNNY_RULES.length} điều Cô Thỏ Hồng</button>
                <button id="ee-fold-stop-audio" class="ee-fold-audio-btn stop" type="button">⏹ Dừng âm thanh</button>
              </div>
              <div class="ee-fold-diagram-wrap">
                <div class="ee-fold-diagram-grid">
                  <div class="ee-fold-diagram-panel"><div class="ee-fold-diagram-label">Trước khi gấp</div>${diagramSvg(stepItem.before, stepItem.guide, `Trước bước ${currentStepIndex + 1}`)}</div>
                  <div class="ee-fold-next-arrow" aria-hidden="true">→</div>
                  <div class="ee-fold-diagram-panel"><div class="ee-fold-diagram-label">Sau khi gấp</div>${diagramSvg(stepItem.after, "", `Sau bước ${currentStepIndex + 1}`)}</div>
                </div>
              </div>
              ${stepItem.tip ? `<div class="ee-fold-tip">🐰 <strong>Cô Thỏ mách bé:</strong> ${esc(stepItem.tip)}</div>` : ""}
              <div class="ee-fold-visual-note">🔎 <strong>Mẹo nhìn hình:</strong> ${esc(guideHintText(stepItem.guide))}</div>
              <div class="ee-fold-controls">
                <button id="ee-fold-prev" class="ee-fold-btn secondary" type="button" ${currentStepIndex === 0 ? "disabled" : ""}>← Bước trước</button>
                <div class="ee-fold-count">${currentStepIndex + 1} / ${variant.steps.length}</div>
                <button id="ee-fold-next" class="ee-fold-btn primary" type="button">${currentStepIndex === variant.steps.length - 1 ? "Hoàn thành 🎉" : "Em làm xong →"}</button>
              </div>
            </section>
          </main>
          <aside class="ee-fold-side">
            <section class="ee-fold-side-card"><h3>📐 Ký hiệu cần nhớ</h3><div class="ee-fold-legend"><div>┄┄ <strong>Nét đứt</strong><br>Đường sẽ gấp</div><div>➜ <strong>Mũi tên hồng</strong><br>Hướng đưa giấy</div><div>↔ <strong>Mở / kéo</strong><br>Tách nhẹ hai lớp</div><div>↶ <strong>Gấp ngược</strong><br>Miết nếp trước rồi đổi hướng</div></div></section>
            <section class="ee-fold-side-card"><h3>🐰 Cô Thỏ Hồng</h3><ul>${BUNNY_RULES.map((item) => `<li><strong>${esc(item.split(":")[0])}:</strong> ${esc(item.split(":").slice(1).join(":").trim())}</li>`).join("")}</ul></section>
            <section class="ee-fold-side-card"><h3>⭐ Thử thách sau khi gấp</h3><p>${esc(variant.challenge)}</p></section>
          </aside>
        </div>
      </div>`;
  }

  function finishHtml(project, variant) {
    return `
      <div class="ee-fold-page">
        <div class="section-heading">
          <div><h1>${project.icon} ${esc(variant.title)}</h1><p>Hoàn thành sản phẩm.</p></div>
          <button id="ee-fold-finish-back" class="back-btn" type="button">← ${esc(project.title)}</button>
        </div>
        <section class="ee-fold-finish">
          <div class="ee-fold-finish-icon" aria-hidden="true">🎉</div>
          <h2>Bé gấp xong rồi!</h2>
          <p><strong>${esc(variant.title)}</strong> đã hoàn thành. Bây giờ bé có thể chỉnh các nếp cho cân, trang trí thêm và thử thử thách nhỏ bên dưới.</p>
          <div style="max-width:430px;margin:.8rem auto">${diagramSvg(variant.steps[variant.steps.length - 1].after, "", variant.title)}</div>
          <p>⭐ <strong>Thử thách:</strong> ${esc(variant.challenge)}</p>
          <div class="ee-fold-finish-actions">
            <button id="ee-fold-again" class="ee-fold-btn secondary" type="button">↻ Gấp lại từ đầu</button>
            <button id="ee-fold-other" class="ee-fold-btn primary" type="button">Chọn kiểu khác →</button>
          </div>
        </section>
      </div>`;
  }

  function bindCommonBreadcrumb(host, project) {
    host.querySelectorAll("[data-crumb='home']").forEach((button) => button.addEventListener("click", () => {
      currentProductId = "";
      currentVariantId = "";
      currentStepIndex = 0;
      renderCurrent();
    }));
    host.querySelectorAll("[data-crumb='project']").forEach((button) => button.addEventListener("click", () => {
      currentVariantId = "";
      currentStepIndex = 0;
      renderVariants(project);
    }));
  }

  function renderRegistry() {
    stopNarration();
    setSubBanner([gameRootCrumb()]);
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = registryHtml();
    host.querySelector("#ee-fold-back-games")?.addEventListener("click", () => {
      if (activeContext && typeof activeContext.back === "function") activeContext.back();
    });
    host.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => {
      currentProductId = String(button.dataset.project || "");
      currentVariantId = "";
      currentStepIndex = 0;
      const project = projectById(currentProductId);
      if (project) renderVariants(project);
    }));
  }

  function renderVariants(project) {
    stopNarration();
    if (project) setSubBanner([gameRootCrumb(() => renderRegistry()), projectCrumb(project)]);
    const host = activeContext && activeContext.host;
    if (!host || !project) return;
    host.innerHTML = variantsHtml(project);
    host.querySelector("#ee-fold-back-list")?.addEventListener("click", () => {
      currentProductId = "";
      currentVariantId = "";
      renderRegistry();
    });
    bindCommonBreadcrumb(host, project);
    host.querySelectorAll("[data-variant]").forEach((button) => button.addEventListener("click", () => {
      currentVariantId = String(button.dataset.variant || "");
      currentStepIndex = 0;
      const variant = variantById(project, currentVariantId);
      if (variant) renderWorkshop(project, variant);
    }));
  }

  function renderWorkshop(project, variant) {
    stopNarration();
    if (project && variant) setSubBanner([gameRootCrumb(() => renderRegistry()), projectCrumb(project, () => renderVariants(project)), variantCrumb(project, variant)]);
    const host = activeContext && activeContext.host;
    if (!host || !project || !variant) return;
    const stepItem = variant.steps[currentStepIndex] || variant.steps[0] || null;
    host.innerHTML = workshopHtml(project, variant);
    host.querySelector("#ee-fold-back-variants")?.addEventListener("click", () => {
      currentVariantId = "";
      currentStepIndex = 0;
      renderVariants(project);
    });
    bindCommonBreadcrumb(host, project);
    host.querySelector("#ee-fold-read-step")?.addEventListener("click", () => {
      speakNarration(stepNarrationText(variant, stepItem, currentStepIndex));
    });
    host.querySelector("#ee-fold-read-rules")?.addEventListener("click", () => {
      speakNarration(bunnyRulesNarrationText());
    });
    host.querySelector("#ee-fold-stop-audio")?.addEventListener("click", () => {
      stopNarration();
    });
    host.querySelector("#ee-fold-prev")?.addEventListener("click", () => {
      if (currentStepIndex <= 0) return;
      currentStepIndex -= 1;
      renderWorkshop(project, variant);
    });
    host.querySelector("#ee-fold-next")?.addEventListener("click", () => {
      if (currentStepIndex < variant.steps.length - 1) {
        currentStepIndex += 1;
        renderWorkshop(project, variant);
        return;
      }
      completedVariants.add(`${project.id}:${variant.id}`);
      renderFinish(project, variant);
    });
  }

  function renderFinish(project, variant) {
    stopNarration();
    if (project && variant) setSubBanner([gameRootCrumb(() => renderRegistry()), projectCrumb(project, () => renderVariants(project)), variantCrumb(project, variant)]);
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = finishHtml(project, variant);
    host.querySelector("#ee-fold-finish-back")?.addEventListener("click", () => renderVariants(project));
    host.querySelector("#ee-fold-again")?.addEventListener("click", () => {
      currentStepIndex = 0;
      renderWorkshop(project, variant);
    });
    host.querySelector("#ee-fold-other")?.addEventListener("click", () => {
      currentVariantId = "";
      currentStepIndex = 0;
      renderVariants(project);
    });
  }

  function renderCurrent() {
    const project = projectById(currentProductId);
    if (!project) return renderRegistry();
    const variant = variantById(project, currentVariantId);
    if (!variant) return renderVariants(project);
    renderWorkshop(project, variant);
  }

  function render(context) {
    stopNarration();
    activeContext = context || null;
    ensureStyles();
    currentProductId = "";
    currentVariantId = "";
    currentStepIndex = 0;
    renderRegistry();
  }

  function destroy() {
    stopNarration();
    activeContext = null;
    currentProductId = "";
    currentVariantId = "";
    currentStepIndex = 0;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
