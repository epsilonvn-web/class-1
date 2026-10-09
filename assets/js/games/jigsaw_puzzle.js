(() => {
  "use strict";

  const MODULE_KEY = "jigsawPuzzle";
  const STYLE_ID = "class1-games-jigsaw-puzzle-style";
  const CATALOG_URL = "assets/data/shared_image_catalog.json?v=6";
  const GAME_NUMBER = 2;

  const LEVELS = Object.freeze([
    Object.freeze({ id: 1, rows: 2, cols: 2, pieces: 4, label: "Làm quen", images: Object.freeze(["bai_bien", "quay_trai_cay_ro_rang", "traffic_04_motorbike_helmet", "ban_an"]) }),
    Object.freeze({ id: 2, rows: 2, cols: 3, pieces: 6, label: "Rất dễ", images: Object.freeze(["traffic_26_child_car_seat", "noi_chon_washing_window", "san_choi_hai_nhom", "family_18_dog_fetch"]) }),
    Object.freeze({ id: 3, rows: 3, cols: 3, pieces: 9, label: "Dễ", images: Object.freeze(["traffic_06_bicycle_safety", "family_08_pet_feeding", "family_02_garden_watering", "san_bong_tre_em"]) }),
    Object.freeze({ id: 4, rows: 3, cols: 4, pieces: 12, label: "Dễ +", images: Object.freeze(["canh_dong_tha_dieu", "family_03_front_yard_car", "hoang_da_dong_co_2", "noi_chon_gate"]) }),
    Object.freeze({ id: 5, rows: 4, cols: 4, pieces: 16, label: "Vừa", images: Object.freeze(["san_choi", "traffic_19_on_train", "vuon_nha", "goc_do_choi"]) }),
    Object.freeze({ id: 6, rows: 4, cols: 5, pieces: 20, label: "Vừa +", images: Object.freeze(["kien_va_chim_bo_cau", "family_11_cycling_yard", "family_24_drawing_table", "dv_doi_tai_xau_xi"]) }),
    Object.freeze({ id: 7, rows: 4, cols: 6, pieces: 24, label: "Khá", images: Object.freeze(["dv_sinh_nhat_voi_con", "noi_chon_zoo", "chim_hot_trong_vuon", "family_30_full_family_portrait"]) }),
    Object.freeze({ id: 8, rows: 5, cols: 6, pieces: 30, label: "Khá +", images: Object.freeze(["tet_gia_dinh", "khung_long_rung_xanh_2", "phong_khach", "phong_my_thuat"]) }),
    Object.freeze({ id: 9, rows: 6, cols: 6, pieces: 36, label: "Thử thách", images: Object.freeze(["traffic_03_green_light", "lop_hoc", "nn_lon_len_ban_lam_gi", "mall_28_spilled_drink"]) })
  ]);

  let activeContext = null;
  let catalog = null;
  let catalogPromise = null;
  let catalogAbort = null;
  let currentLevelId = 0;
  let currentImageId = "";
  let timerHandle = 0;
  let resizeHandle = 0;
  let game = null;

  const esc = (value) => String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

  // Shared Vietnamese / English presentation (image IDs remain unchanged).
  let language = "vi";
  let languageObserver = null;
  let voiceNonce = 0;
  let voiceAudio = null;
  let lastVoiceKey = "";
  let lastVoiceAt = 0;
  const localizedNodes = new WeakMap();
  const EN = Object.freeze({
    "Xưởng Xếp Hình":"Jigsaw Puzzle Workshop", "Tranh":"Picture", "Xếp hình":"Jigsaw puzzle",
    "Cấp":"Level", "9 cấp":"9 levels", "9 cấp độ":"9 levels", "36 bức tranh • 9 cấp độ • kéo thả các mảnh ghép thật.":"36 pictures • 9 levels • drag and drop real jigsaw pieces.",
    "9 cấp × 4 tranh":"9 levels × 4 pictures", "Mỗi cấp tăng dần số mảnh. Bé có thể bật hình mẫu khi cần, hoặc tắt hình mẫu để rèn quan sát và trí nhớ.":"Each level has more pieces. Turn the guide picture on when you need help, or turn it off to practice observation and memory.",
    "Cô Thỏ Hồng nhắc bé":"Miss Pink Bunny's tip", "Nhìn màu sắc, đường nét và góc ảnh trước; ghép từ những mảnh dễ nhận ra nhất nhé!":"Look at colors, shapes, and corners first. Start with the easiest pieces!",
    "Làm quen":"Getting started", "Rất dễ":"Very easy", "Dễ":"Easy", "Dễ +":"Easy +", "Vừa":"Medium", "Vừa +":"Medium +", "Khá":"Hard", "Khá +":"Hard +", "Thử thách":"Challenge",
    "mảnh":"pieces", "4 tranh →":"4 pictures →", "Chọn 1 trong 4 bức tranh.":"Choose one of the four pictures.",
    "Kéo mảnh vào đúng vị trí.":"Drag each piece into the correct place.",
    "Chọn tranh":"Choose picture", "Ẩn hình mẫu":"Hide guide", "Hiện hình mẫu":"Show guide", "Xáo mảnh":"Shuffle pieces", "Làm lại":"Restart",
    "Các mảnh ghép":"Puzzle pieces", "mảnh còn lại":"pieces left", "Cách chơi:":"How to play:",
    "kéo mảnh vào gần đúng vị trí để mảnh tự khớp. Trên màn hình cảm ứng, bé cũng có thể chạm chọn một mảnh rồi chạm vào đúng ô trên bảng.":"Drag a piece near its matching spot and it will snap into place. On a touchscreen, you can also select a piece and tap the right square on the board.",
    "Hình mẫu đang bật để bé dễ làm quen.":"The guide picture is on to help you get started.", "Thử thách bắt đầu! Bé có thể bật hình mẫu nếu cần.":"Challenge started! Turn on the guide picture if you need help.",
    "Đã bật hình mẫu mờ.":"Guide picture is on.", "Đã tắt hình mẫu. Bé thử nhớ bức tranh nhé!":"Guide picture is off. Try to remember the picture!",
    "Cô Thỏ đã xáo lại các mảnh chưa ghép.":"Miss Bunny shuffled the remaining pieces.", "Các mảnh đã được xáo lại. Bé bắt đầu nhé!":"Pieces reshuffled. Have fun!",
    "Đã chọn một mảnh. Bé có thể kéo vào bảng hoặc chạm đúng ô cần đặt.":"Piece selected. Drag it to the board or tap its matching square.",
    "Đúng rồi! Mảnh ghép đã khớp ✨":"That's right! The piece fits! ✨", "Chưa khớp rồi. Bé thử nhìn màu và vị trí của mảnh nhé!":"Not quite! Look at the piece's color and position.",
    "Ô này chưa đúng với mảnh đang chọn. Bé thử chỗ khác nhé!":"This is not the right spot. Try another square!",
    "Tất cả mảnh đã vào đúng vị trí 🎉":"All pieces are in the right place! 🎉", "Hoàn thành bức tranh.":"Picture completed.",
    "Bé ghép xong rồi!":"You did it!", "Ghép lại":"Play again", "Chọn tranh khác":"Choose another picture", "Tranh hoàn chỉnh":"Completed picture",
    "Chưa đọc được kho ảnh dùng chung.":"Unable to load the shared picture catalog.",
    "Anh kiểm tra file ":"Please check the file ", " rồi thử lại nhé.":" and try again.",
    "Chưa tải được ảnh từ kho dùng chung.":"Unable to load this picture.",
    "Game chỉ tham chiếu đúng ":"This game only uses ", " trong catalog. Anh kiểm tra file ảnh tại đường dẫn catalog rồi thử lại nhé.":" from the catalog. Please check the picture file path and try again.",
    "Đang đọc 36 tranh từ kho ảnh dùng chung…":"Loading 36 pictures from the shared catalog…", "Đang chuẩn bị các mảnh ghép…":"Preparing puzzle pieces…", "Đang tải…":"Loading…",
    "Bảng xếp hình":"Puzzle board", "Tranh xếp hình":"Puzzle picture", "Thiếu imageId:":"Missing imageId:",
    "Mảnh ghép":"Piece", "Ẩn":"Hide", "Hiện":"Show", "hình mẫu":"guide", "Kéo mảnh vào đúng vị trí.":"Drag pieces to the correct positions.", "Cô Thỏ Hồng khen bé quan sát rất giỏi.":"Miss Pink Bunny is proud of your observation skills.", "Đọc hướng dẫn":"Read instructions", "Nghe hướng dẫn":"Listen to instructions", "Dừng đọc":"Stop audio"
  });
  const EN_PATTERNS = [
    [/^(.+) • Chọn 1 trong 4 bức tranh\.$/, (_,a)=>`${translateVi(a)} • Choose one of four pictures.`],
    [/^Cấp (\d+) — (\d+) mảnh$/, (_,a,b)=>`Level ${a} — ${b} pieces`],
    [/^Cấp (\d+)$/,(_,a)=>`Level ${a}`],
    [/^← Cấp (\d+)$/,(_,a)=>`← Level ${a}`],
    [/^← 9 cấp$/,()=>"← 9 levels"],
    [/^← Chọn tranh$/,()=>"← Choose picture"],
    [/^👁 (Ẩn|Hiện) hình mẫu$/,(_,a)=>`👁 ${a === "Ẩn" ? "Hide" : "Show"} guide`],
    [/^🔀 Xáo mảnh$/,()=>"🔀 Shuffle pieces"],
    [/^↻ Làm lại$/,()=>"↻ Restart"],
    [/^↻ Ghép lại$/,()=>"↻ Play again"],
    [/^🖼 Chọn tranh khác$/,()=>"🖼 Choose another picture"],
    [/^🧩 Các mảnh ghép$/,()=>"🧩 Puzzle pieces"],
    [/^(\d+) mảnh$/,(_,a)=>`${a} pieces`],
    [/^(\d+) mảnh còn lại$/,(_,a)=>`${a} pieces left`],
    [/^(\d+) mảnh • (.+)$/,(_,a,b)=>`${a} pieces • ${translateVi(b)}`],
    [/^Cấp (\d+) • (\d+) mảnh • Kéo mảnh vào đúng vị trí\.$/,(_,a,b)=>`Level ${a} • ${b} pieces • Drag each piece into place.`],
    [/^(.+) • Chọn 1 trong 4 bức tranh\.$/,(_,a)=>`${translateVi(a)} • Choose one of four pictures.`],
    [/^Mảnh ghép (\d+)$/,(_,a)=>`Puzzle piece ${a}`],
    [/^Bé đã hoàn thành (\d+) mảnh trong (.+)\.$/,(_,a,b)=>`You completed ${a} pieces in ${b}.`],
  ];
  function translateVi(value) {
    const txt = String(value || "");
    if (Object.prototype.hasOwnProperty.call(EN, txt)) return EN[txt];
    for (const [pattern, callback] of EN_PATTERNS) if (pattern.test(txt)) return txt.replace(pattern, callback);
    return txt;
  }
  function syncLanguage() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (node.parentElement && node.parentElement.closest("script,style,.ee-jig-language-toggle")) continue;
      const existing = localizedNodes.get(node);
      const baseline = existing && node.nodeValue === existing.last ? existing.original : (node.nodeValue || "");
      const out = language === "en" ? translateVi(baseline) : baseline;
      if (node.nodeValue !== out) node.nodeValue = out;
      localizedNodes.set(node, { original: baseline, last: out });
    }
    host.querySelectorAll("[data-jig-language]").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.jigLanguage === language ? "true" : "false");
    });
    host.querySelectorAll("[data-jig-speech]").forEach((button) => {
      const original = button.dataset.jigSpeech || "";
      const wanted = `🔊 ${language === "en" ? "Listen to instructions" : "Nghe hướng dẫn"}`;
      if (button.textContent !== wanted) button.textContent = wanted;
      button.setAttribute("aria-label", language === "en" ? "Listen to instructions" : "Nghe hướng dẫn");
      button.dataset.jigSpeech = original;
    });
    // Prefer catalog English metadata instead of translating educational picture names.
    host.querySelectorAll("[data-jig-image-title]").forEach((node) => {
      const id = node.dataset.jigImageTitle;
      const meta = imageMeta(id);
      if (!meta) return;
      const index = node.dataset.jigImageNumber || "";
      const title = language === "en" ? (meta.name_en || meta.nameEn || meta.title_en || (index ? `Picture ${index}` : "Picture")) : (meta.name_vi || "Tranh");
      const wanted = `${index ? index + " " : ""}${title}`;
      if (node.textContent !== wanted) node.textContent = wanted;
    });
  }
  function stopSpeech() {
    voiceNonce++;
    if (voiceAudio) { try { voiceAudio.pause(); voiceAudio.removeAttribute("src"); voiceAudio.load(); } catch (_) {} }
    voiceAudio = null;
  }
  function speakInstructions(text) {
    const message = String(text || "").trim();
    if (!message || typeof Audio !== "function") return;
    const key = `${language}:${message}`;
    if (lastVoiceKey === key && Date.now() - lastVoiceAt < 300) return;
    lastVoiceKey = key; lastVoiceAt = Date.now();
    stopSpeech();
    const nonce = voiceNonce;
    const audio = new Audio();
    voiceAudio = audio;
    audio.preload = "none";
    audio.referrerPolicy = "no-referrer";
    audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${language === "en" ? "en-US" : "vi"}&q=${encodeURIComponent(message)}`;
    audio.onerror = () => {
      if (nonce === voiceNonce && activeContext && activeContext.host) showStatus(language === "en" ? "Audio is unavailable. Please try again later." : "Chưa phát được âm thanh. Bé thử lại sau nhé!");
    };
    audio.play().catch(() => {
      if (nonce === voiceNonce && activeContext && activeContext.host) showStatus(language === "en" ? "Tap Listen again to play audio." : "Bé bấm Nghe hướng dẫn lần nữa nhé!");
    });
  }
  function languageTools() {
    return `<div class="ee-jig-language-toggle" role="group" aria-label="Language / Ngôn ngữ"><button type="button" data-jig-language="vi" aria-pressed="${language === "vi"}">Tiếng Việt</button><button type="button" data-jig-language="en" aria-pressed="${language === "en"}">English</button></div>`;
  }
  function connectLanguageControls() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.querySelectorAll("[data-jig-language]").forEach((button) => button.addEventListener("click", () => {
      if (button.dataset.jigLanguage === language) return;
      stopSpeech(); language = button.dataset.jigLanguage;
      syncLanguage();
      setCurrentBanner();
    }));
    host.querySelectorAll("[data-jig-speech]").forEach((button) => button.addEventListener("click", () => {
      speakInstructions(language === "en" ? (button.dataset.jigSpeechEn || "") : (button.dataset.jigSpeech || ""));
    }));
    syncLanguage();
  }
  function setCurrentBanner() {
    if (currentLevelId && currentImageId) {
      const lvl = levelById(currentLevelId); if (lvl) setImageBanner(lvl, currentImageId);
    } else if (currentLevelId) {
      const lvl = levelById(currentLevelId); if (lvl) setLevelBanner(lvl);
    } else setRegistryBanner();
  }
  function observeLanguage() {
    if (languageObserver) languageObserver.disconnect();
    if (!activeContext || !activeContext.host || typeof MutationObserver !== "function") return;
    languageObserver = new MutationObserver(() => syncLanguage());
    languageObserver.observe(activeContext.host, {childList:true, subtree:true, characterData:true});
  }

  function ensureStyles() {
    const previousStyle = document.getElementById(STYLE_ID);
    if (previousStyle) previousStyle.remove();
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-jig-page{color:#1f2937}
      .ee-jig-page .section-heading{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
      .ee-jig-heading-actions{display:flex;align-items:center;justify-content:flex-end;gap:12px;flex:0 0 auto;margin-left:auto;flex-wrap:nowrap}
      .ee-jig-language-toggle{display:flex;align-items:center;gap:3px;padding:3px;border:1px solid #bfdbfe;border-radius:15px;background:#fff;box-shadow:0 4px 12px rgba(79,70,229,.08);white-space:nowrap}
      .ee-jig-language-toggle button{appearance:none;-webkit-appearance:none;border:0;background:transparent;color:#334155;border-radius:11px;min-height:36px;padding:8px 13px;font-family:inherit;font-size:14px;line-height:1.2;font-weight:800;cursor:pointer;transition:background .15s ease,color .15s ease}
      .ee-jig-language-toggle button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#14b8a6);box-shadow:0 3px 10px rgba(20,184,166,.17)}
      .ee-jig-language-toggle button:focus-visible{outline:2px solid #7c3aed;outline-offset:2px}
      .ee-jig-heading-actions>.back-btn{margin:0;white-space:nowrap}
      @media(max-width:650px){.ee-jig-heading-actions{width:100%;justify-content:flex-end;gap:8px}.ee-jig-language-toggle button{padding:7px 10px;font-size:13px}}

      .ee-jig-hero{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1rem;align-items:center;margin:.7rem 0 1rem;padding:1rem 1.1rem;border:1px solid #e9d5ff;border-radius:22px;background:linear-gradient(135deg,#fdf2f8,#f5f3ff)}
      .ee-jig-hero h2{margin:0 0 .35rem;color:#5b21b6;font-size:22px}
      .ee-jig-hero p{margin:0;color:#475569;font-size:16px;font-weight:800;line-height:1.5}
      .ee-jig-bunny{display:flex;align-items:center;gap:.6rem;min-width:210px;padding:.8rem .9rem;border:1px solid #bae6fd;border-radius:18px;background:#f0f9ff;color:#0c4a6e}
      .ee-jig-bunny .icon{font-size:34px;line-height:1}
      .ee-jig-bunny strong{display:block;font-size:15px}
      .ee-jig-bunny span{display:block;font-size:13px;font-weight:800;line-height:1.4}
      .ee-jig-level-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.9rem}
      .ee-jig-level-card{min-width:0;border:1px solid #e5e7eb;border-radius:20px;background:#fff;padding:.85rem;text-align:left;cursor:pointer;box-shadow:0 8px 22px rgba(15,23,42,.05);transition:transform .16s,box-shadow .16s,border-color .16s;font-family:inherit}
      .ee-jig-level-card:nth-child(4n+1){background:#FDF2F8;border-color:#FBCFE8}
      .ee-jig-level-card:nth-child(4n+2){background:#ECFDF5;border-color:#A7F3D0}
      .ee-jig-level-card:nth-child(4n+3){background:#F5F3FF;border-color:#DDD6FE}
      .ee-jig-level-card:nth-child(4n+4){background:#FFFBEB;border-color:#FDE68A}
      .ee-jig-level-card:hover{transform:translateY(-2px);box-shadow:0 12px 25px rgba(124,58,237,.1);border-color:#c4b5fd}
      .ee-jig-level-head{display:flex;align-items:center;justify-content:space-between;gap:.6rem;margin-bottom:.7rem}
      .ee-jig-level-head strong{font-size:18px}
      .ee-jig-level-card:nth-child(4n+1) .ee-jig-level-head strong{color:#BE185D}
      .ee-jig-level-card:nth-child(4n+2) .ee-jig-level-head strong{color:#047857}
      .ee-jig-level-card:nth-child(4n+3) .ee-jig-level-head strong{color:#6D28D9}
      .ee-jig-level-card:nth-child(4n+4) .ee-jig-level-head strong{color:#B45309}
      .ee-jig-badge{display:inline-flex;align-items:center;justify-content:center;min-height:28px;padding:.25rem .62rem;border-radius:999px;font-size:12px;font-weight:1000}
      .ee-jig-level-card:nth-child(4n+1) .ee-jig-badge{background:#FFF1F2;border:1px solid #FDA4AF;color:#BE123C}
      .ee-jig-level-card:nth-child(4n+2) .ee-jig-badge{background:#F0FDFA;border:1px solid #99F6E4;color:#0F766E}
      .ee-jig-level-card:nth-child(4n+3) .ee-jig-badge{background:#FAF5FF;border:1px solid #D8B4FE;color:#7E22CE}
      .ee-jig-level-card:nth-child(4n+4) .ee-jig-badge{background:#FFF7ED;border:1px solid #FCD34D;color:#B45309}
      .ee-jig-thumbs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.42rem}
      .ee-jig-thumb{position:relative;aspect-ratio:1/1;border-radius:12px;overflow:hidden;background:#f8fafc;border:1px solid #e2e8f0;min-width:0}
      .ee-jig-thumb img{width:100%;height:100%;object-fit:cover;display:block}
      .ee-jig-level-foot{display:flex;justify-content:space-between;gap:.5rem;margin-top:.7rem;color:#64748b;font-size:13px;font-weight:900}
      .ee-jig-image-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
      .ee-jig-image-card{min-width:0;border:1px solid #e5e7eb;border-radius:22px;background:#fff;padding:.7rem;text-align:left;cursor:pointer;font-family:inherit;box-shadow:0 10px 24px rgba(15,23,42,.05)}
      .ee-jig-image-card:nth-child(4n+1){background:#FDF2F8;border-color:#FBCFE8}
      .ee-jig-image-card:nth-child(4n+2){background:#ECFDF5;border-color:#A7F3D0}
      .ee-jig-image-card:nth-child(4n+3){background:#F5F3FF;border-color:#DDD6FE}
      .ee-jig-image-card:nth-child(4n+4){background:#FFFBEB;border-color:#FDE68A}
      .ee-jig-image-card:hover{border-color:#c4b5fd;box-shadow:0 12px 28px rgba(124,58,237,.1)}
      .ee-jig-image-card img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:16px;display:block;background:#f8fafc}
      .ee-jig-image-card h3{margin:.7rem .2rem .25rem;color:#5b21b6;font-size:18px;line-height:1.3}
      .ee-jig-image-card p{margin:0 .2rem .45rem;color:#64748b;font-size:14px;font-weight:800;line-height:1.4}
      .ee-jig-game-head{display:flex;align-items:flex-start;justify-content:space-between;gap:.8rem;flex-wrap:wrap;margin:.35rem 0 .8rem}
      .ee-jig-title h1{margin:0;color:#4c1d95;font-size:26px;line-height:1.2}
      .ee-jig-title p{margin:.28rem 0 0;color:#64748b;font-size:15px;font-weight:800}
      .ee-jig-stats{display:flex;gap:.45rem;flex-wrap:wrap}
      .ee-jig-stat{min-height:38px;display:inline-flex;align-items:center;gap:.35rem;padding:.45rem .7rem;border-radius:12px;background:#fff;border:1px solid #e5e7eb;color:#475569;font-size:13px;font-weight:1000}
      .ee-jig-toolbar{display:flex;gap:.55rem;flex-wrap:wrap;margin-bottom:.8rem}
      .ee-jig-btn{min-height:42px;padding:.58rem .88rem;border-radius:13px;border:1px solid #d8b4fe;background:#fff;color:#6d28d9;font-family:inherit;font-size:14px;font-weight:1000;cursor:pointer}
      .ee-jig-btn.primary{border:none;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 7px 16px rgba(139,92,246,.18)}
      .ee-jig-btn.teal{border-color:#99f6e4;color:#0f766e;background:#f0fdfa}
      .ee-jig-work{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:1rem;align-items:start}
      .ee-jig-board-card,.ee-jig-tray-card{border:1px solid #e5e7eb;border-radius:22px;background:#fff;padding:.8rem;box-shadow:0 10px 24px rgba(15,23,42,.05);min-width:0}
      .ee-jig-board-shell{position:relative;margin:auto;max-width:100%;padding:20px;border-radius:18px;background:linear-gradient(135deg,#faf5ff,#f0fdfa);border:1px solid #e9d5ff;overflow:visible}
      .ee-jig-board{position:relative;margin:auto;background:#fff;border:1px solid #cbd5e1;border-radius:8px;overflow:visible;touch-action:manipulation;box-shadow:inset 0 0 0 1px rgba(255,255,255,.7)}
      .ee-jig-guide{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;opacity:.17;pointer-events:none;transition:opacity .18s}
      .ee-jig-guide.off{opacity:0}
      .ee-jig-grid{position:absolute;inset:0;pointer-events:none;opacity:.32}
      .ee-jig-placed{position:absolute;z-index:3;pointer-events:none}
      .ee-jig-tray-title{display:flex;align-items:center;justify-content:space-between;gap:.5rem;margin-bottom:.6rem}
      .ee-jig-tray-title strong{color:#334155;font-size:16px}
      .ee-jig-tray-title span{color:#64748b;font-size:12px;font-weight:900}
      .ee-jig-tray{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.5rem;max-height:590px;overflow:auto;padding:.15rem;align-items:center}
      .ee-jig-piece-btn{min-width:0;min-height:64px;border:1px solid transparent;border-radius:12px;background:#f8fafc;padding:.18rem;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;font-family:inherit;position:relative}
      .ee-jig-piece-btn:hover{background:#f5f3ff;border-color:#ddd6fe}
      .ee-jig-piece-btn.selected{background:#fdf2f8;border-color:#f9a8d4;box-shadow:0 0 0 2px rgba(236,72,153,.12)}
      .ee-jig-piece-btn canvas{display:block;max-width:100%;height:auto;filter:drop-shadow(0 3px 3px rgba(15,23,42,.16));pointer-events:none}
      .ee-jig-piece-btn:active{cursor:grabbing}
      .ee-jig-help{margin-top:.75rem;padding:.72rem .8rem;border-radius:15px;border:1px solid #fde68a;background:#fffbeb;color:#92400e;font-size:13px;font-weight:900;line-height:1.45}
      .ee-jig-status{min-height:26px;margin:.55rem 0 0;color:#0f766e;font-size:14px;font-weight:1000;text-align:center}
      .ee-jig-float{position:fixed;z-index:9999;pointer-events:none;filter:drop-shadow(0 9px 8px rgba(15,23,42,.28));transform:translate(-50%,-50%)}
      .ee-jig-finish{padding:1.1rem;border:1px solid #fbcfe8;border-radius:22px;background:linear-gradient(135deg,#fdf2f8,#f5f3ff);text-align:center}
      .ee-jig-finish img{display:block;width:min(520px,100%);max-height:420px;object-fit:contain;margin:.7rem auto;border-radius:18px;border:1px solid #e5e7eb;background:#fff}
      .ee-jig-finish h2{margin:.2rem 0;color:#be185d;font-size:26px}
      .ee-jig-finish p{margin:.4rem auto;color:#475569;font-size:16px;font-weight:800;line-height:1.5;max-width:680px}
      .ee-jig-actions{display:flex;justify-content:center;gap:.6rem;flex-wrap:wrap;margin-top:.8rem}
      .ee-jig-empty{padding:1rem;border:1px dashed #cbd5e1;border-radius:16px;background:#f8fafc;color:#64748b;text-align:center;font-weight:900}
      @media(max-width:1050px){.ee-jig-work{grid-template-columns:1fr}.ee-jig-tray{grid-template-columns:repeat(5,minmax(0,1fr));max-height:none}}
      @media(max-width:820px){.ee-jig-level-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ee-jig-image-grid{grid-template-columns:1fr}.ee-jig-hero{grid-template-columns:1fr}.ee-jig-bunny{min-width:0}.ee-jig-tray{grid-template-columns:repeat(4,minmax(0,1fr))}}
      @media(max-width:520px){.ee-jig-level-grid{grid-template-columns:1fr}.ee-jig-tray{grid-template-columns:repeat(3,minmax(0,1fr))}.ee-jig-board-shell{padding:13px}.ee-jig-title h1{font-size:22px}.ee-jig-toolbar .ee-jig-btn{flex:1 1 calc(50% - .3rem)}}
      @media(prefers-reduced-motion:reduce){.ee-jig-level-card,.ee-jig-guide{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function clearTimer() {
    if (timerHandle) window.clearInterval(timerHandle);
    timerHandle = 0;
  }

  function clearResize() {
    if (resizeHandle) window.clearTimeout(resizeHandle);
    resizeHandle = 0;
  }

  function cleanupGame() {
    stopSpeech();
    clearTimer();
    clearResize();
    if (game && game.resizeHandler) window.removeEventListener("resize", game.resizeHandler);
    if (game && game.dragCleanup) game.dragCleanup();
    game = null;
  }

  function levelById(id) {
    return LEVELS.find((level) => level.id === Number(id)) || null;
  }

  function imageMeta(imageId) {
    return catalog && catalog.images && catalog.images[imageId] ? catalog.images[imageId] : null;
  }

  function loadCatalog() {
    if (catalog && catalog.images) return Promise.resolve(catalog);
    if (catalogPromise) return catalogPromise;
    catalogAbort = typeof AbortController === "function" ? new AbortController() : null;
    const options = catalogAbort ? { signal: catalogAbort.signal, cache: "no-store" } : { cache: "no-store" };
    catalogPromise = fetch(CATALOG_URL, options)
      .then((response) => {
        if (!response.ok) throw new Error("CATALOG_HTTP");
        return response.json();
      })
      .then((data) => {
        if (!data || !data.images || typeof data.images !== "object") throw new Error("CATALOG_INVALID");
        catalog = data;
        return catalog;
      })
      .finally(() => {
        catalogPromise = null;
        catalogAbort = null;
      });
    return catalogPromise;
  }

  function setBanner(items) {
    const hook = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof hook === "function") hook({ items });
  }

  function setRegistryBanner() {
    setBanner([{ level: 2, title: `${GAME_NUMBER}. Xưởng Xếp Hình`, action: null }]);
  }

  function setLevelBanner(level) {
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. Xưởng Xếp Hình`, action: () => renderRegistry() },
      { level: 3, title: `${GAME_NUMBER}.${level.id} Cấp ${level.id}`, action: null }
    ]);
  }

  function setImageBanner(level, imageId) {
    const imageIndex = Math.max(0, level.images.indexOf(imageId));
    const meta = imageMeta(imageId);
    setBanner([
      { level: 2, title: `${GAME_NUMBER}. Xưởng Xếp Hình`, action: () => renderRegistry() },
      { level: 3, title: `${GAME_NUMBER}.${level.id} Cấp ${level.id}`, action: () => renderLevel(level) },
      { level: 4, title: `${GAME_NUMBER}.${level.id}.${imageIndex + 1} ${meta ? meta.name_vi : "Tranh"}`, action: null }
    ]);
  }

  function renderLoading(message) {
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `<div class="empty-panel"><div><span class="inline-spinner" aria-hidden="true"></span><strong>${esc(message || "Đang tải…")}</strong></div></div>`;
  }

  function renderLoadError() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-jig-page">
        <div class="section-heading"><div><h1>🧩 Xưởng Xếp Hình</h1><p>Chưa đọc được kho ảnh dùng chung.</p></div><div class="ee-jig-heading-actions">${languageTools()}<button id="ee-jig-back-games" class="back-btn" type="button">← Games</button></div></div>
        <div class="ee-jig-empty">Anh kiểm tra file <strong>assets/data/shared_image_catalog.json</strong> rồi thử lại nhé.</div>
      </div>`;
    connectLanguageControls();
    host.querySelector("#ee-jig-back-games")?.addEventListener("click", () => activeContext && activeContext.back && activeContext.back());
  }

  function thumbHtml(imageId) {
    const meta = imageMeta(imageId);
    if (!meta || !meta.src) return `<div class="ee-jig-thumb" title="Thiếu imageId ${esc(imageId)}"></div>`;
    return `<div class="ee-jig-thumb"><img src="${esc(meta.src)}" alt="${esc(meta.alt_vi || meta.name_vi || "Tranh xếp hình")}" loading="lazy"></div>`;
  }

  function renderRegistry() {
    cleanupGame();
    currentLevelId = 0;
    currentImageId = "";
    setRegistryBanner();
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-jig-page">
        <div class="section-heading">
          <div><h1>🧩 Xưởng Xếp Hình</h1><p>36 bức tranh • 9 cấp độ • kéo thả các mảnh ghép thật.</p></div>
          <div class="ee-jig-heading-actions">${languageTools()}<button id="ee-jig-back-games" class="back-btn" type="button">← Games</button></div>
        </div>
        <div class="ee-jig-hero">
          <div><h2>9 cấp × 4 tranh</h2><p>Mỗi cấp tăng dần số mảnh. Bé có thể bật hình mẫu khi cần, hoặc tắt hình mẫu để rèn quan sát và trí nhớ.</p></div>
          <div class="ee-jig-bunny"><span class="icon" aria-hidden="true">🐰</span><div><strong>Cô Thỏ Hồng nhắc bé</strong><span>Nhìn màu sắc, đường nét và góc ảnh trước; ghép từ những mảnh dễ nhận ra nhất nhé!</span><button class="ee-jig-btn teal" type="button" data-jig-speech="Nhìn màu sắc, đường nét và góc ảnh trước; ghép từ những mảnh dễ nhận ra nhất nhé!" data-jig-speech-en="Look at colors, shapes, and corners first. Start with the easiest pieces!">🔊 Nghe hướng dẫn</button></div></div>
        </div>
        <div class="ee-jig-level-grid">
          ${LEVELS.map((level) => `
            <button class="ee-jig-level-card" data-level="${level.id}" type="button">
              <div class="ee-jig-level-head"><strong>Cấp ${level.id}</strong><span class="ee-jig-badge">${level.pieces} mảnh</span></div>
              <div class="ee-jig-thumbs">${level.images.map(thumbHtml).join("")}</div>
              <div class="ee-jig-level-foot"><span>${esc(level.label)}</span><span>4 tranh →</span></div>
            </button>`).join("")}
        </div>
      </div>`;
    connectLanguageControls();
    host.querySelector("#ee-jig-back-games")?.addEventListener("click", () => activeContext && activeContext.back && activeContext.back());
    host.querySelectorAll("[data-level]").forEach((button) => button.addEventListener("click", () => {
      const level = levelById(button.dataset.level);
      if (level) renderLevel(level);
    }));
  }

  function renderLevel(level) {
    cleanupGame();
    currentLevelId = level.id;
    currentImageId = "";
    setLevelBanner(level);
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-jig-page">
        <div class="section-heading">
          <div><h1>🧩 Cấp ${level.id} — ${level.pieces} mảnh</h1><p>${esc(level.label)} • Chọn 1 trong 4 bức tranh.</p></div>
          <div class="ee-jig-heading-actions">${languageTools()}<button id="ee-jig-back-levels" class="back-btn" type="button">← 9 cấp</button></div>
        </div>
        <div class="ee-jig-image-grid">
          ${level.images.map((imageId, index) => {
            const meta = imageMeta(imageId);
            if (!meta || !meta.src) {
              return `<div class="ee-jig-empty">Thiếu imageId: ${esc(imageId)}</div>`;
            }
            return `<button class="ee-jig-image-card" data-image="${esc(imageId)}" type="button">
              <img src="${esc(meta.src)}" alt="${esc(meta.alt_vi || meta.name_vi || "Tranh xếp hình")}" loading="lazy">
              <h3 data-jig-image-title="${esc(imageId)}" data-jig-image-number="${GAME_NUMBER}.${level.id}.${index + 1}">${GAME_NUMBER}.${level.id}.${index + 1} ${esc(meta.name_vi || "Tranh")}</h3>
              <p>${level.pieces} mảnh • ${esc(level.label)}</p>
            </button>`;
          }).join("")}
        </div>
      </div>`;
    connectLanguageControls();
    host.querySelector("#ee-jig-back-levels")?.addEventListener("click", renderRegistry);
    host.querySelectorAll("[data-image]").forEach((button) => button.addEventListener("click", () => {
      const imageId = String(button.dataset.image || "");
      if (imageMeta(imageId)) startPuzzle(level, imageId);
    }));
  }

  function seededRandom(seedText) {
    let seed = 2166136261 >>> 0;
    for (let i = 0; i < seedText.length; i += 1) {
      seed ^= seedText.charCodeAt(i);
      seed = Math.imul(seed, 16777619) >>> 0;
    }
    return () => {
      seed += 0x6D2B79F5;
      let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildEdges(rows, cols, seed) {
    const rand = seededRandom(seed);
    const vertical = Array.from({ length: rows }, () => Array(Math.max(0, cols - 1)).fill(0));
    const horizontal = Array.from({ length: Math.max(0, rows - 1) }, () => Array(cols).fill(0));
    vertical.forEach((row) => row.forEach((_, index) => { row[index] = rand() > .5 ? 1 : -1; }));
    horizontal.forEach((row) => row.forEach((_, index) => { row[index] = rand() > .5 ? 1 : -1; }));
    return { vertical, horizontal };
  }

  function pieceEdges(edgeMap, row, col, rows, cols) {
    return {
      top: row === 0 ? 0 : -edgeMap.horizontal[row - 1][col],
      right: col === cols - 1 ? 0 : edgeMap.vertical[row][col],
      bottom: row === rows - 1 ? 0 : edgeMap.horizontal[row][col],
      left: col === 0 ? 0 : -edgeMap.vertical[row][col - 1]
    };
  }

  function pointAlong(x1, y1, x2, y2, t) {
    return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t };
  }

  function edgePoint(point, nx, ny, amount) {
    return { x: point.x + nx * amount, y: point.y + ny * amount };
  }

  function drawEdge(ctx, x1, y1, x2, y2, sign, depth) {
    if (!sign) {
      ctx.lineTo(x2, y2);
      return;
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = dy / len;
    const ny = -dx / len;
    const p35 = pointAlong(x1, y1, x2, y2, .34);
    const p41 = pointAlong(x1, y1, x2, y2, .41);
    const p50 = pointAlong(x1, y1, x2, y2, .50);
    const p59 = pointAlong(x1, y1, x2, y2, .59);
    const p66 = pointAlong(x1, y1, x2, y2, .66);
    const d = depth * sign;
    ctx.lineTo(p35.x, p35.y);
    const c1 = edgePoint(p41, nx, ny, d * .12);
    const c2 = edgePoint(p41, nx, ny, d * .92);
    const mid = edgePoint(p50, nx, ny, d);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, mid.x, mid.y);
    const c3 = edgePoint(p59, nx, ny, d * .92);
    const c4 = edgePoint(p59, nx, ny, d * .12);
    ctx.bezierCurveTo(c3.x, c3.y, c4.x, c4.y, p66.x, p66.y);
    ctx.lineTo(x2, y2);
  }

  function makePiecePath(ctx, cellW, cellH, margin, edges, depth) {
    const x0 = margin;
    const y0 = margin;
    const x1 = margin + cellW;
    const y1 = margin + cellH;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    drawEdge(ctx, x0, y0, x1, y0, edges.top, depth);
    drawEdge(ctx, x1, y0, x1, y1, edges.right, depth);
    drawEdge(ctx, x1, y1, x0, y1, edges.bottom, depth);
    drawEdge(ctx, x0, y1, x0, y0, edges.left, depth);
    ctx.closePath();
  }

  function drawPieceCanvas(piece, options = {}) {
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const depth = Math.max(5, Math.min(piece.cellW, piece.cellH) * .22);
    const margin = Math.ceil(depth + 4);
    const width = Math.ceil(piece.cellW + margin * 2);
    const height = Math.ceil(piece.cellH + margin * 2);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.save();
    makePiecePath(ctx, piece.cellW, piece.cellH, margin, piece.edges, depth);
    ctx.clip();
    ctx.drawImage(piece.image, margin - piece.col * piece.cellW, margin - piece.row * piece.cellH, piece.boardW, piece.boardH);
    if (options.dim) {
      ctx.fillStyle = "rgba(255,255,255,.18)";
      ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();
    ctx.save();
    makePiecePath(ctx, piece.cellW, piece.cellH, margin, piece.edges, depth);
    ctx.strokeStyle = options.placed ? "rgba(124,58,237,.42)" : "rgba(51,65,85,.7)";
    ctx.lineWidth = options.placed ? 1.1 : 1.6;
    ctx.stroke();
    ctx.restore();
    canvas.dataset.margin = String(margin);
    return canvas;
  }

  function shuffle(array, seed) {
    const out = array.slice();
    const rand = seededRandom(seed);
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.floor(seconds || 0));
    const minutes = Math.floor(safe / 60);
    const rest = safe % 60;
    return `${minutes}:${String(rest).padStart(2, "0")}`;
  }

  function buildGridOverlay(rows, cols) {
    return `
      <svg class="ee-jig-grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        ${Array.from({ length: Math.max(0, cols - 1) }, (_, i) => `<line x1="${((i + 1) / cols) * 100}" y1="0" x2="${((i + 1) / cols) * 100}" y2="100" stroke="#94a3b8" stroke-width=".25" stroke-dasharray="1 1"/>`).join("")}
        ${Array.from({ length: Math.max(0, rows - 1) }, (_, i) => `<line x1="0" y1="${((i + 1) / rows) * 100}" x2="100" y2="${((i + 1) / rows) * 100}" stroke="#94a3b8" stroke-width=".25" stroke-dasharray="1 1"/>`).join("")}
      </svg>`;
  }

  function showStatus(text) {
    if (!game || !game.statusEl) return;
    game.statusEl.textContent = text || "";
  }

  function updateStats() {
    if (!game) return;
    if (game.progressEl) game.progressEl.textContent = `${game.solved.size}/${game.level.pieces}`;
    if (game.remainingEl) game.remainingEl.textContent = `${game.level.pieces - game.solved.size} mảnh còn lại`;
  }

  function drawTray() {
    if (!game || !game.trayEl) return;
    const tray = game.trayEl;
    tray.replaceChildren();
    const unsolved = game.order.filter((id) => !game.solved.has(id));
    if (!unsolved.length) {
      const done = document.createElement("div");
      done.className = "ee-jig-empty";
      done.textContent = "Tất cả mảnh đã vào đúng vị trí 🎉";
      tray.appendChild(done);
      return;
    }
    unsolved.forEach((pieceId) => {
      const piece = game.pieces.get(pieceId);
      if (!piece) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `ee-jig-piece-btn${game.selectedId === pieceId ? " selected" : ""}`;
      button.dataset.piece = pieceId;
      button.setAttribute("aria-label", `Mảnh ghép ${piece.index + 1}`);
      const scale = Math.min(1, 82 / Math.max(piece.cellW, piece.cellH));
      const canvas = drawPieceCanvas(piece, { dim: false });
      const cssW = parseFloat(canvas.style.width) * scale;
      const cssH = parseFloat(canvas.style.height) * scale;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      button.appendChild(canvas);
      button.addEventListener("click", () => {
        if (!game || game.dragMoved) return;
        game.selectedId = game.selectedId === pieceId ? "" : pieceId;
        drawTray();
        showStatus(game.selectedId ? "Đã chọn một mảnh. Bé có thể kéo vào bảng hoặc chạm đúng ô cần đặt." : "");
      });
      button.addEventListener("pointerdown", (event) => beginDrag(event, pieceId, button));
      tray.appendChild(button);
    });
  }

  function placePiece(pieceId) {
    if (!game || game.solved.has(pieceId)) return;
    const piece = game.pieces.get(pieceId);
    if (!piece) return;
    game.solved.add(pieceId);
    game.selectedId = "";
    const canvas = drawPieceCanvas(piece, { placed: true });
    const margin = Number(canvas.dataset.margin || 0);
    canvas.className = "ee-jig-placed";
    canvas.style.left = `${piece.col * piece.cellW - margin}px`;
    canvas.style.top = `${piece.row * piece.cellH - margin}px`;
    game.boardEl.appendChild(canvas);
    drawTray();
    updateStats();
    showStatus("Đúng rồi! Mảnh ghép đã khớp ✨");
    if (game.solved.size >= game.level.pieces) finishPuzzle();
  }

  function canSnapAtClientPoint(piece, clientX, clientY) {
    if (!game || !piece) return false;
    const rect = game.boardEl.getBoundingClientRect();
    const targetX = rect.left + (piece.col + .5) * piece.cellW;
    const targetY = rect.top + (piece.row + .5) * piece.cellH;
    const threshold = Math.max(24, Math.min(piece.cellW, piece.cellH) * .58);
    return Math.hypot(clientX - targetX, clientY - targetY) <= threshold;
  }

  function beginDrag(event, pieceId, sourceButton) {
    if (!game || game.solved.has(pieceId) || event.button > 0) return;
    const piece = game.pieces.get(pieceId);
    if (!piece) return;
    game.dragMoved = false;
    const startX = event.clientX;
    const startY = event.clientY;
    const sourceRect = sourceButton.getBoundingClientRect();
    const float = document.createElement("div");
    float.className = "ee-jig-float";
    const canvas = drawPieceCanvas(piece);
    const scale = Math.min(1.1, Math.max(.72, sourceRect.width / Math.max(1, parseFloat(canvas.style.width))));
    canvas.style.width = `${parseFloat(canvas.style.width) * scale}px`;
    canvas.style.height = `${parseFloat(canvas.style.height) * scale}px`;
    float.appendChild(canvas);
    document.body.appendChild(float);
    sourceButton.style.visibility = "hidden";

    const moveFloat = (x, y) => {
      float.style.left = `${x}px`;
      float.style.top = `${y}px`;
    };
    moveFloat(startX, startY);

    const onMove = (moveEvent) => {
      if (!game) return;
      if (Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY) > 6) game.dragMoved = true;
      moveFloat(moveEvent.clientX, moveEvent.clientY);
    };
    const onUp = (upEvent) => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
      float.remove();
      if (!game) return;
      if (canSnapAtClientPoint(piece, upEvent.clientX, upEvent.clientY)) {
        placePiece(pieceId);
      } else {
        sourceButton.style.visibility = "";
        if (game.dragMoved) showStatus("Chưa khớp rồi. Bé thử nhìn màu và vị trí của mảnh nhé!");
      }
      window.setTimeout(() => { if (game) game.dragMoved = false; }, 0);
    };
    const onCancel = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
      float.remove();
      sourceButton.style.visibility = "";
      if (game) game.dragMoved = false;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointercancel", onCancel, { passive: true });
    game.dragCleanup = onCancel;
  }

  function boardClick(event) {
    if (!game || !game.selectedId) return;
    const piece = game.pieces.get(game.selectedId);
    if (!piece) return;
    if (canSnapAtClientPoint(piece, event.clientX, event.clientY)) {
      placePiece(piece.id);
    } else {
      showStatus("Ô này chưa đúng với mảnh đang chọn. Bé thử chỗ khác nhé!");
    }
  }

  function computeBoardSize(image) {
    const host = activeContext && activeContext.host;
    const available = host ? Math.max(280, Math.min(720, host.clientWidth - 380)) : 620;
    const mobile = window.innerWidth <= 1050;
    const maxW = mobile && host ? Math.max(260, Math.min(720, host.clientWidth - 42)) : available;
    const aspect = image.naturalWidth / Math.max(1, image.naturalHeight);
    let boardW = maxW;
    let boardH = boardW / aspect;
    const maxH = 610;
    if (boardH > maxH) {
      boardH = maxH;
      boardW = boardH * aspect;
    }
    return { boardW: Math.round(boardW), boardH: Math.round(boardH) };
  }

  function renderPiecesForCurrentSize() {
    if (!game) return;
    const { boardW, boardH } = computeBoardSize(game.image);
    game.boardW = boardW;
    game.boardH = boardH;
    game.boardEl.style.width = `${boardW}px`;
    game.boardEl.style.height = `${boardH}px`;
    game.guideEl.src = game.meta.src;
    game.cellW = boardW / game.level.cols;
    game.cellH = boardH / game.level.rows;
    game.boardEl.querySelectorAll(".ee-jig-placed").forEach((node) => node.remove());
    game.pieces.clear();
    let index = 0;
    for (let row = 0; row < game.level.rows; row += 1) {
      for (let col = 0; col < game.level.cols; col += 1) {
        const id = `${row}:${col}`;
        game.pieces.set(id, {
          id, index, row, col,
          cellW: game.cellW,
          cellH: game.cellH,
          boardW,
          boardH,
          image: game.image,
          edges: pieceEdges(game.edgeMap, row, col, game.level.rows, game.level.cols)
        });
        index += 1;
      }
    }
    game.solved.forEach((pieceId) => {
      const piece = game.pieces.get(pieceId);
      if (!piece) return;
      const canvas = drawPieceCanvas(piece, { placed: true });
      const margin = Number(canvas.dataset.margin || 0);
      canvas.className = "ee-jig-placed";
      canvas.style.left = `${piece.col * piece.cellW - margin}px`;
      canvas.style.top = `${piece.row * piece.cellH - margin}px`;
      game.boardEl.appendChild(canvas);
    });
    drawTray();
  }

  function startTimer() {
    clearTimer();
    if (!game) return;
    game.startedAt = Date.now();
    game.elapsedBefore = 0;
    const update = () => {
      if (!game || !game.timeEl) return;
      const seconds = game.elapsedBefore + Math.floor((Date.now() - game.startedAt) / 1000);
      game.timeEl.textContent = formatTime(seconds);
    };
    update();
    timerHandle = window.setInterval(update, 1000);
  }

  function currentElapsedSeconds() {
    if (!game) return 0;
    return game.elapsedBefore + Math.floor((Date.now() - game.startedAt) / 1000);
  }

  function resetPuzzle() {
    if (!game) return;
    game.solved.clear();
    game.selectedId = "";
    game.order = shuffle(Array.from(game.pieces.keys()), `${game.imageId}:level${game.level.id}:shuffle:${Date.now()}`);
    game.boardEl.querySelectorAll(".ee-jig-placed").forEach((node) => node.remove());
    game.guideOn = game.level.id <= 4;
    game.guideEl.classList.toggle("off", !game.guideOn);
    const guideBtn = activeContext && activeContext.host && activeContext.host.querySelector("#ee-jig-guide-toggle");
    if (guideBtn) guideBtn.textContent = game.guideOn ? "👁 Ẩn hình mẫu" : "👁 Hiện hình mẫu";
    drawTray();
    updateStats();
    showStatus("Các mảnh đã được xáo lại. Bé bắt đầu nhé!");
    startTimer();
  }

  function finishPuzzle() {
    if (!game) return;
    clearTimer();
    const elapsed = currentElapsedSeconds();
    const snapshot = {
      level: game.level,
      imageId: game.imageId,
      meta: game.meta,
      elapsed
    };
    cleanupGame();
    const host = activeContext && activeContext.host;
    if (!host) return;
    setImageBanner(snapshot.level, snapshot.imageId);
    host.innerHTML = `
      <div class="ee-jig-page">
        <div class="section-heading"><div><h1>🧩 <span data-jig-image-title="${esc(snapshot.imageId)}">${esc(snapshot.meta.name_vi || "Xếp hình")}</span></h1><p>Hoàn thành bức tranh.</p></div><div class="ee-jig-heading-actions">${languageTools()}<button id="ee-jig-finish-level" class="back-btn" type="button">← Cấp ${snapshot.level.id}</button></div></div>
        <div class="ee-jig-finish">
          <div style="font-size:54px;line-height:1">🎉</div>
          <h2>Bé ghép xong rồi!</h2>
          <p>${language === "en" ? "Miss Pink Bunny is proud of your keen eyes! You completed" : "Cô Thỏ Hồng khen bé quan sát rất giỏi. Bé đã hoàn thành"} <strong>${snapshot.level.pieces} ${language === "en" ? "pieces" : "mảnh"}</strong> ${language === "en" ? "in" : "trong"} <strong>${formatTime(snapshot.elapsed)}</strong>.</p>
          <img src="${esc(snapshot.meta.src)}" alt="${esc(snapshot.meta.alt_vi || snapshot.meta.name_vi || "Tranh hoàn chỉnh")}">
          <div class="ee-jig-actions">
            <button id="ee-jig-play-again" class="ee-jig-btn primary" type="button">↻ Ghép lại</button>
            <button id="ee-jig-other-image" class="ee-jig-btn teal" type="button">🖼 Chọn tranh khác</button>
            <button id="ee-jig-all-levels" class="ee-jig-btn" type="button">9 cấp độ</button>
          </div>
        </div>
      </div>`;
    connectLanguageControls();
    host.querySelector("#ee-jig-finish-level")?.addEventListener("click", () => renderLevel(snapshot.level));
    host.querySelector("#ee-jig-play-again")?.addEventListener("click", () => startPuzzle(snapshot.level, snapshot.imageId));
    host.querySelector("#ee-jig-other-image")?.addEventListener("click", () => renderLevel(snapshot.level));
    host.querySelector("#ee-jig-all-levels")?.addEventListener("click", renderRegistry);
  }

  function renderGameScreen(level, imageId, image) {
    cleanupGame();
    currentLevelId = level.id;
    currentImageId = imageId;
    const meta = imageMeta(imageId);
    if (!meta) return renderLevel(level);
    setImageBanner(level, imageId);
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = `
      <div class="ee-jig-page">
        <div class="ee-jig-game-head">
          <div class="ee-jig-title"><h1>🧩 <span data-jig-image-title="${esc(imageId)}">${esc(meta.name_vi || "Xếp hình")}</span></h1><p>Cấp ${level.id} • ${level.pieces} mảnh • Kéo mảnh vào đúng vị trí.</p></div>
          <div class="ee-jig-stats">
            <div class="ee-jig-stat">✅ <span id="ee-jig-progress">0/${level.pieces}</span></div>
            <div class="ee-jig-stat">⏱ <span id="ee-jig-time">0:00</span></div>
          </div>
        </div>
        <div class="ee-jig-toolbar">
          <div class="ee-jig-heading-actions">${languageTools()}<button id="ee-jig-back-images" class="ee-jig-btn" type="button">← Chọn tranh</button></div>
        </div>
        <div class="ee-jig-toolbar">
          <button id="ee-jig-guide-toggle" class="ee-jig-btn teal" type="button">👁 ${level.id <= 4 ? "Ẩn" : "Hiện"} hình mẫu</button>
          <button id="ee-jig-shuffle" class="ee-jig-btn" type="button">🔀 Xáo mảnh</button>
          <button id="ee-jig-reset" class="ee-jig-btn primary" type="button">↻ Làm lại</button>
        </div>
        <div class="ee-jig-work">
          <section class="ee-jig-board-card">
            <div class="ee-jig-board-shell">
              <div id="ee-jig-board" class="ee-jig-board" aria-label="Bảng xếp hình">
                <img id="ee-jig-guide" class="ee-jig-guide${level.id <= 4 ? "" : " off"}" src="${esc(meta.src)}" alt="" aria-hidden="true">
                ${buildGridOverlay(level.rows, level.cols)}
              </div>
            </div>
            <div id="ee-jig-status" class="ee-jig-status" aria-live="polite"></div>
          </section>
          <aside class="ee-jig-tray-card">
            <div class="ee-jig-tray-title"><strong>🧩 Các mảnh ghép</strong><span id="ee-jig-remaining">${level.pieces} mảnh còn lại</span></div>
            <div id="ee-jig-tray" class="ee-jig-tray"></div>
            <div class="ee-jig-help">🐰 <strong>Cách chơi:</strong> kéo mảnh vào gần đúng vị trí để mảnh tự khớp. Trên màn hình cảm ứng, bé cũng có thể chạm chọn một mảnh rồi chạm vào đúng ô trên bảng.<div style="margin-top:8px"><button class="ee-jig-btn teal" type="button" data-jig-speech="Kéo mảnh vào gần đúng vị trí để mảnh tự khớp. Trên màn hình cảm ứng, bé cũng có thể chạm chọn một mảnh rồi chạm vào đúng ô trên bảng." data-jig-speech-en="Drag a piece near its matching spot and it will snap into place. On a touchscreen, select a piece and tap the matching square on the board.">🔊 Nghe hướng dẫn</button></div></div>
          </aside>
        </div>
      </div>`;

    const edgeMap = buildEdges(level.rows, level.cols, `${imageId}:level:${level.id}`);
    game = {
      level, imageId, meta, image, edgeMap,
      boardW: 0, boardH: 0, cellW: 0, cellH: 0,
      pieces: new Map(), solved: new Set(), selectedId: "",
      order: [], guideOn: level.id <= 4,
      boardEl: host.querySelector("#ee-jig-board"),
      guideEl: host.querySelector("#ee-jig-guide"),
      trayEl: host.querySelector("#ee-jig-tray"),
      progressEl: host.querySelector("#ee-jig-progress"),
      timeEl: host.querySelector("#ee-jig-time"),
      remainingEl: host.querySelector("#ee-jig-remaining"),
      statusEl: host.querySelector("#ee-jig-status"),
      dragMoved: false,
      dragCleanup: null,
      startedAt: Date.now(),
      elapsedBefore: 0,
      resizeHandler: null
    };
    renderPiecesForCurrentSize();
    game.order = shuffle(Array.from(game.pieces.keys()), `${imageId}:level${level.id}:first`);
    drawTray();
    updateStats();
    startTimer();
    showStatus(level.id <= 4 ? "Hình mẫu đang bật để bé dễ làm quen." : "Thử thách bắt đầu! Bé có thể bật hình mẫu nếu cần.");

    game.boardEl.addEventListener("click", boardClick);
    connectLanguageControls();
    host.querySelector("#ee-jig-back-images")?.addEventListener("click", () => renderLevel(level));
    host.querySelector("#ee-jig-guide-toggle")?.addEventListener("click", (event) => {
      if (!game) return;
      game.guideOn = !game.guideOn;
      game.guideEl.classList.toggle("off", !game.guideOn);
      event.currentTarget.textContent = game.guideOn ? "👁 Ẩn hình mẫu" : "👁 Hiện hình mẫu";
      showStatus(game.guideOn ? "Đã bật hình mẫu mờ." : "Đã tắt hình mẫu. Bé thử nhớ bức tranh nhé!");
    });
    host.querySelector("#ee-jig-shuffle")?.addEventListener("click", () => {
      if (!game) return;
      game.order = shuffle(game.order, `${imageId}:${Date.now()}`);
      drawTray();
      showStatus("Cô Thỏ đã xáo lại các mảnh chưa ghép.");
    });
    host.querySelector("#ee-jig-reset")?.addEventListener("click", resetPuzzle);

    game.resizeHandler = () => {
      clearResize();
      resizeHandle = window.setTimeout(() => {
        if (game) renderPiecesForCurrentSize();
      }, 180);
    };
    window.addEventListener("resize", game.resizeHandler, { passive: true });
  }

  function startPuzzle(level, imageId) {
    const meta = imageMeta(imageId);
    if (!meta || !meta.src) return;
    cleanupGame();
    currentLevelId = level.id;
    currentImageId = imageId;
    setImageBanner(level, imageId);
    renderLoading("Đang chuẩn bị các mảnh ghép…");
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (!activeContext || currentLevelId !== level.id || currentImageId !== imageId) return;
      renderGameScreen(level, imageId, image);
    };
    image.onerror = () => {
      const host = activeContext && activeContext.host;
      if (!host || currentLevelId !== level.id || currentImageId !== imageId) return;
      host.innerHTML = `
        <div class="ee-jig-page">
          <div class="section-heading"><div><h1>🧩 <span data-jig-image-title="${esc(imageId)}">${esc(meta.name_vi || "Xếp hình")}</span></h1><p>Chưa tải được ảnh từ kho dùng chung.</p></div><div class="ee-jig-heading-actions">${languageTools()}<button id="ee-jig-image-back" class="back-btn" type="button">← Cấp ${level.id}</button></div></div>
          <div class="ee-jig-empty">Game chỉ tham chiếu đúng <strong>imageId</strong> trong catalog. Anh kiểm tra file ảnh tại đường dẫn catalog rồi thử lại nhé.</div>
        </div>`;
      connectLanguageControls();
    host.querySelector("#ee-jig-image-back")?.addEventListener("click", () => renderLevel(level));
    };
    image.src = meta.src;
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    cleanupGame();
    observeLanguage();
    currentLevelId = 0;
    currentImageId = "";
    setRegistryBanner();
    renderLoading("Đang đọc 36 tranh từ kho ảnh dùng chung…");
    loadCatalog().then(() => {
      if (!activeContext) return;
      renderRegistry();
    }).catch((error) => {
      if (!activeContext || (error && error.name === "AbortError")) return;
      console.error("[Class1 jigsaw catalog]", error);
      renderLoadError();
    });
  }

  function destroy() {
    stopSpeech();
    if (languageObserver) languageObserver.disconnect();
    languageObserver = null;
    cleanupGame();
    if (catalogAbort) {
      try { catalogAbort.abort(); } catch (_) {}
    }
    catalogAbort = null;
    catalogPromise = null;
    activeContext = null;
    currentLevelId = 0;
    currentImageId = "";
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
