(() => {
  "use strict";

  /* =====================================================================
     12. Phân loại rác
     Bé chạm vào một món rác, rồi chạm vào thùng đúng loại.
     Giao diện module: window.CLASS1_GAME_MODULES.wasteSorting = { render(context), destroy() }
     ===================================================================== */

  const MODULE_KEY = "wasteSorting";
  const GAME_NUMBER = 12;
  const GAME_TITLE = "Phân loại rác";
  const STYLE_ID = "class1-games-waste-sorting-style-v1";
  const STARS_KEY = "class1-waste-sorting-stars";
  const PER_BATCH = 4;

  /* ---------- Hình đồ vật (khung 100 x 100) ---------- */
  const INK = "#3B2314";
  const ICON = {
    vo_chuoi: `<path d="M50 30 C44 50 36 66 18 78 C30 82 44 72 50 56 C56 72 70 82 82 78 C64 66 56 50 50 30Z" fill="#FACC15"/><path d="M50 30 C46 48 50 60 50 70 C50 60 54 48 50 30Z" fill="#FDE68A"/><rect x="45" y="16" width="10" height="16" rx="3" fill="#A16207"/><path d="M18 78 l-4 4 M82 78 l4 4" stroke-width="5"/>`,
    loi_tao: `<path d="M38 22 Q50 30 62 22 Q58 40 58 50 Q58 62 62 78 Q50 70 38 78 Q42 62 42 50 Q42 40 38 22Z" fill="#FEF3C7"/><path d="M38 22 Q28 30 32 44 M62 22 Q72 30 68 44 M38 78 Q28 70 32 58 M62 78 Q72 70 68 58" fill="#EF4444" stroke-width="3"/><path d="M50 22 V10" stroke-width="4"/><circle cx="47" cy="46" r="2.5" fill="#7C2D12" stroke="none"/><circle cx="53" cy="54" r="2.5" fill="#7C2D12" stroke="none"/>`,
    vo_trung: `<path d="M14 62 Q14 86 38 86 Q56 86 56 62 L50 56 L44 64 L38 54 L30 62 L22 54Z" fill="#FFF7ED"/><path d="M48 46 Q48 22 68 22 Q88 22 88 46 L82 52 L76 44 L70 54 L62 44 L54 52Z" fill="#FFF7ED"/>`,
    la_kho: `<path d="M16 82 C18 40 50 16 86 14 C82 52 58 82 16 82Z" fill="#D97706"/><path d="M20 78 L80 20 M40 60 l-4 -14 M54 46 l-2 -14 M48 52 l14 2" fill="none" stroke-width="3"/><path d="M70 40 l6 6 M30 64 l-4 6" stroke="#92400E" stroke-width="3"/>`,
    com_thua: `<path d="M14 50 Q50 98 86 50Z" fill="#93C5FD"/><path d="M20 50 Q50 24 80 50Z" fill="#fff"/><path d="M10 50 H90" stroke-width="3"/>${[[34, 44], [46, 38], [58, 42], [66, 46], [40, 48]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2" fill="#F8FAFC" stroke-width="1.2"/>`).join("")}`,
    xuong_ca: `<path d="M18 50 H80" stroke-width="5"/><path d="M80 50 L94 38 M80 50 L94 62" stroke-width="5"/>${[30, 42, 54, 66].map((x) => `<path d="M${x} 50 L${x - 6} 34 M${x} 50 L${x - 6} 66" stroke-width="4"/>`).join("")}<circle cx="16" cy="50" r="9" fill="#E5E7EB"/><circle cx="14" cy="48" r="2" fill="${INK}" stroke="none"/>`,
    chai_nhua: `<path d="M42 10 H58 V20 Q70 26 70 40 V84 Q70 92 62 92 H38 Q30 92 30 84 V40 Q30 26 42 20Z" fill="#BAE6FD" fill-opacity=".9"/><rect x="40" y="6" width="20" height="8" rx="2" fill="#2563EB"/><rect x="30" y="50" width="40" height="18" fill="#60A5FA"/><path d="M38 30 V44" stroke="#fff" stroke-width="5"/>`,
    lon_nhom: `<rect x="28" y="18" width="44" height="66" rx="8" fill="#EF4444"/><ellipse cx="50" cy="18" rx="22" ry="5" fill="#E5E7EB"/><path d="M34 40 Q50 50 66 40" fill="none" stroke="#fff" stroke-width="5"/><path d="M46 16 h8" stroke-width="3"/>`,
    bao_cu: `<path d="M12 24 H72 V82 H12Z" fill="#F1F5F9"/><path d="M72 30 H86 V82 Q86 88 80 88 H18 Q12 88 12 82" fill="#E2E8F0"/><rect x="20" y="32" width="24" height="18" fill="#94A3B8"/><path d="M50 34 H66 M50 42 H66 M20 58 H66 M20 66 H66 M20 74 H54" stroke="#64748B" stroke-width="3"/>`,
    thung_carton: `<path d="M14 38 L50 26 L86 38 V78 L50 90 L14 78Z" fill="#D6A867"/><path d="M14 38 L50 50 L86 38 M50 50 V90" fill="none" stroke-width="3"/><path d="M14 38 L28 24 L64 14 L50 26" fill="#E7C08B"/><path d="M58 60 h14" stroke="#92400E" stroke-width="3"/>`,
    chai_thuy_tinh: `<path d="M44 8 H56 V28 Q70 36 70 52 V86 Q70 92 64 92 H36 Q30 92 30 86 V52 Q30 36 44 28Z" fill="#22C55E" fill-opacity=".85"/><rect x="42" y="6" width="16" height="8" rx="2" fill="#15803D"/><rect x="34" y="58" width="32" height="18" rx="2" fill="#FEF3C7"/><path d="M38 40 V54" stroke="#BBF7D0" stroke-width="5"/>`,
    hop_sua: `<path d="M30 30 L50 14 L70 30 V88 H30Z" fill="#fff"/><path d="M30 30 H70" stroke-width="3"/><rect x="30" y="48" width="40" height="24" fill="#60A5FA"/><path d="M42 58 q8 -8 16 0 q-8 8 -16 0Z" fill="#fff" stroke-width="2"/><rect x="56" y="8" width="5" height="16" fill="#F472B6"/>`,
    giay_an: `<path d="M24 60 Q16 40 32 30 Q40 16 56 24 Q74 18 80 36 Q90 54 76 66 Q70 82 50 78 Q30 84 24 60Z" fill="#fff"/><path d="M36 40 q8 6 4 14 M56 34 q-4 10 6 16 M44 62 q10 -4 18 4" fill="none" stroke="#CBD5E1" stroke-width="3"/><circle cx="62" cy="58" r="5" fill="#FDE68A" stroke="none"/>`,
    goi_bimbim: `<path d="M24 18 L76 18 L72 82 L28 82Z" fill="#F97316"/><path d="M22 18 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 M28 82 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6" fill="none" stroke-width="2.5"/><circle cx="50" cy="48" r="14" fill="#FDE047"/><path d="M36 30 V70" stroke="#FDBA74" stroke-width="4"/>`,
    tui_nilon_ban: `<path d="M24 28 H76 L80 88 H20Z" fill="#E0F2FE" fill-opacity=".85"/><path d="M34 28 Q34 12 42 12 M66 28 Q66 12 58 12" fill="none" stroke-width="3"/><ellipse cx="40" cy="60" rx="8" ry="6" fill="#A16207" opacity=".5" stroke="none"/><ellipse cx="62" cy="72" rx="10" ry="6" fill="#A16207" opacity=".45" stroke="none"/><ellipse cx="58" cy="46" rx="5" ry="4" fill="#A16207" opacity=".4" stroke="none"/>`,
    ong_hut: `<g transform="rotate(-35 50 50)"><rect x="8" y="42" width="84" height="14" rx="7" fill="#fff"/>${[16, 32, 48, 64, 80].map((x) => `<path d="M${x} 42 l8 14" stroke="#EC4899" stroke-width="5"/>`).join("")}<rect x="8" y="42" width="84" height="14" rx="7" fill="none"/></g>`,
    ban_chai: `<g transform="rotate(-30 50 50)"><rect x="10" y="46" width="64" height="12" rx="6" fill="#38BDF8"/><rect x="66" y="40" width="26" height="14" rx="3" fill="#E0F2FE"/>${[70, 76, 82, 88].map((x) => `<path d="M${x} 40 V30" stroke="#94A3B8" stroke-width="4"/>`).join("")}</g>`,
    pin: `<rect x="22" y="30" width="52" height="40" rx="6" fill="#22C55E"/><rect x="22" y="30" width="18" height="40" rx="6" fill="#1F2937"/><rect x="74" y="42" width="8" height="16" rx="2" fill="#9CA3AF"/><path d="M52 42 v16 M44 50 h16" stroke="#fff" stroke-width="4"/>`,
    bong_den: `<circle cx="50" cy="40" r="26" fill="#F1F5F9"/><path d="M40 52 Q46 30 50 46 Q54 30 60 52" fill="none" stroke="#94A3B8" stroke-width="3"/><rect x="38" y="64" width="24" height="18" rx="3" fill="#9CA3AF"/><path d="M38 70 H62 M38 76 H62" stroke-width="2"/><path d="M60 22 L52 38 L62 36 L54 52" fill="none" stroke="#EF4444" stroke-width="3"/>`,
    binh_xit: `<rect x="32" y="26" width="36" height="64" rx="8" fill="#FBBF24"/><rect x="40" y="12" width="20" height="14" rx="3" fill="#9CA3AF"/><rect x="46" y="6" width="10" height="8" rx="2" fill="#EF4444"/><path d="M32 46 H68 M32 72 H68" stroke-width="3"/><path d="M44 54 l12 12 M56 54 l-12 12" stroke="#B91C1C" stroke-width="4"/>`
  };
  function iconSvg(id, cls = "") {
    return `<svg class="ws-ic ${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${ICON[id] || ""}</g></svg>`;
  }
  /* Thùng rác */
  function binSvg(color, dark, symbol) {
    return `<svg class="ws-bin-svg" viewBox="0 0 120 130" aria-hidden="true" focusable="false"><g stroke="${INK}" stroke-width="4" stroke-linejoin="round">
      <path d="M18 34 H102 L94 122 H26Z" fill="${color}"/>
      <rect class="ws-lid" x="10" y="20" width="100" height="16" rx="6" fill="${dark}"/>
      <rect x="48" y="10" width="24" height="12" rx="4" fill="${dark}"/>
      <path d="M42 54 V108 M60 54 V108 M78 54 V108" stroke="${dark}" stroke-width="3" opacity=".45"/></g>
      <circle cx="60" cy="78" r="24" fill="#fff" opacity=".92"/><text x="60" y="89" text-anchor="middle" font-size="30">${symbol}</text></svg>`;
  }


  /* ---------- Các thùng rác ---------- */
  const BINS = {
    huu_co: { label: "Rác hữu cơ", short: "hữu cơ", color: "#4ADE80", dark: "#15803D", symbol: "🍌", hint: "thức ăn thừa, vỏ trái cây, lá cây" },
    tai_che: { label: "Rác tái chế", short: "tái chế", color: "#60A5FA", dark: "#1D4ED8", symbol: "♻️", hint: "giấy, chai nhựa, lon, chai thủy tinh" },
    con_lai: { label: "Rác còn lại", short: "còn lại", color: "#9CA3AF", dark: "#4B5563", symbol: "🗑️", hint: "đồ bẩn, đồ không tái chế được" },
    nguy_hai: { label: "Pin & đồ nguy hại", short: "nguy hại", color: "#F87171", dark: "#B91C1C", symbol: "⚠️", hint: "pin, bóng đèn hỏng, bình xịt" }
  };

  /* ---------- Các món rác ---------- */
  const ITEMS = {
    vo_chuoi: { name: "Vỏ chuối", bin: "huu_co", why: "Vỏ chuối là rác hữu cơ. Nó có thể được ủ thành phân bón cho cây." },
    loi_tao: { name: "Lõi táo", bin: "huu_co", why: "Lõi táo là phần thừa của trái cây, thuộc rác hữu cơ." },
    vo_trung: { name: "Vỏ trứng", bin: "huu_co", why: "Vỏ trứng là rác hữu cơ, có thể ủ làm phân bón." },
    la_kho: { name: "Lá cây khô", bin: "huu_co", why: "Lá cây khô là rác hữu cơ, sẽ mục ra và làm đất tốt hơn." },
    com_thua: { name: "Cơm thừa", bin: "huu_co", why: "Cơm thừa là thức ăn thừa, bỏ vào thùng rác hữu cơ. Nhưng tốt nhất là mình lấy vừa đủ ăn để không thừa nhé!" },
    xuong_ca: { name: "Xương cá", bin: "huu_co", why: "Xương cá là phần thừa của thức ăn, thuộc rác hữu cơ." },
    chai_nhua: { name: "Chai nhựa", bin: "tai_che", why: "Chai nhựa có thể tái chế thành đồ nhựa mới, thậm chí làm thành sợi vải để may áo." },
    lon_nhom: { name: "Lon nhôm", bin: "tai_che", why: "Lon nhôm có thể nấu chảy để làm thành lon mới, tái chế được rất nhiều lần." },
    bao_cu: { name: "Báo cũ", bin: "tai_che", why: "Giấy báo cũ có thể tái chế thành giấy mới." },
    thung_carton: { name: "Thùng các-tông", bin: "tai_che", why: "Thùng các-tông là giấy, tái chế được. Bé gấp dẹt thùng lại cho gọn nhé." },
    chai_thuy_tinh: { name: "Chai thủy tinh", bin: "tai_che", why: "Chai thủy tinh có thể tái chế thành chai lọ mới. Chai vỡ thì nhờ người lớn gói lại cẩn thận." },
    hop_sua: { name: "Hộp sữa giấy", bin: "tai_che", why: "Hộp sữa giấy tái chế được. Bé uống hết, tráng qua nước và ép dẹt hộp lại nhé." },
    giay_an: { name: "Giấy ăn đã dùng", bin: "con_lai", why: "Giấy ăn đã dùng bị bẩn nên không tái chế được, bỏ vào thùng rác còn lại." },
    goi_bimbim: { name: "Vỏ gói bim bim", bin: "con_lai", why: "Vỏ gói bim bim làm từ nhiều lớp dính vào nhau, rất khó tái chế, nên là rác còn lại." },
    tui_nilon_ban: { name: "Túi nilon bẩn", bin: "con_lai", why: "Túi nilon đã bẩn thì khó tái chế, bỏ vào rác còn lại. Đi chợ, mình nên mang túi vải để dùng nhiều lần." },
    ong_hut: { name: "Ống hút nhựa", bin: "con_lai", why: "Ống hút nhựa nhỏ và đã dùng nên là rác còn lại. Mình có thể dùng ống hút giấy, tre hoặc uống trực tiếp từ cốc." },
    ban_chai: { name: "Bàn chải cũ", bin: "con_lai", why: "Bàn chải đánh răng cũ làm từ nhiều chất liệu dính vào nhau, là rác còn lại." },
    pin: { name: "Pin cũ", bin: "nguy_hai", why: "Pin cũ có chất độc hại, không được bỏ chung với rác khác. Mình mang pin đến điểm thu gom pin nhé." },
    bong_den: { name: "Bóng đèn hỏng", bin: "nguy_hai", why: "Bóng đèn hỏng có thể vỡ và có chất độc hại, cần được thu gom riêng. Bé nhờ người lớn cầm giúp nhé." },
    binh_xit: { name: "Bình xịt muỗi đã hết", bin: "nguy_hai", why: "Bình xịt muỗi có hóa chất và khí nén bên trong, cần được thu gom riêng, không bỏ vào lửa." }
  };

  const LEVELS = [
    { id: "l1", title: "Cấp 1: Hai thùng rác", bins: ["huu_co", "tai_che"], items: ["vo_chuoi", "loi_tao", "vo_trung", "la_kho", "chai_nhua", "lon_nhom", "bao_cu", "thung_carton"],
      intro: "Thùng xanh lá đựng rác hữu cơ như thức ăn thừa, vỏ trái cây. Thùng xanh dương đựng rác tái chế như giấy, chai nhựa, lon. Bé chạm vào một món rác rồi chạm vào thùng đúng nhé!" },
    { id: "l2", title: "Cấp 2: Ba thùng rác", bins: ["huu_co", "tai_che", "con_lai"], items: ["com_thua", "xuong_ca", "chai_thuy_tinh", "hop_sua", "giay_an", "goi_bimbim", "tui_nilon_ban", "ong_hut", "vo_chuoi", "chai_nhua"],
      intro: "Có thêm thùng màu xám đựng rác còn lại: những đồ đã bẩn hoặc không tái chế được. Bé suy nghĩ kỹ rồi chọn thùng nhé!" },
    { id: "l3", title: "Cấp 3: Bốn thùng rác", bins: ["huu_co", "tai_che", "con_lai", "nguy_hai"], items: ["pin", "bong_den", "binh_xit", "ban_chai", "la_kho", "lon_nhom", "hop_sua", "giay_an", "xuong_ca", "bao_cu"],
      intro: "Có thêm thùng màu đỏ dành cho pin và đồ nguy hại. Những thứ này có chất độc, phải thu gom riêng để không làm hại đất và nước." }
  ];

  /* Rác sau khi phân loại sẽ đi đâu */
  const AFTER = [
    { from: "chai_nhua", to: "👕", text: "Chai nhựa có thể thành sợi vải may áo" },
    { from: "lon_nhom", to: "🥫", text: "Lon nhôm thành lon mới" },
    { from: "bao_cu", to: "📒", text: "Giấy cũ thành giấy mới" },
    { from: "vo_chuoi", to: "🌱", text: "Rác hữu cơ thành phân bón cho cây" },
    { from: "pin", to: "🏭", text: "Pin cũ được xử lý riêng để không làm bẩn đất, nước" }
  ];

  /* ---------- Trạng thái ---------- */
  let activeContext = null;
  let level = null;
  let queue = [];
  let onField = [];
  let selected = "";
  let mistakes = 0;
  let sorted = [];
  let busy = false;
  let timers = [];
  let muted = false;

  const esc = (v) => String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const reduceMotion = () => { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (_) { return false; } };
  function later(fn, ms) { const t = window.setTimeout(fn, reduceMotion() ? Math.min(ms, 120) : ms); timers.push(t); }
  function clearTimers() { timers.forEach((t) => window.clearTimeout(t)); timers = []; }
  function shuffle(list) { const a = list.slice(); for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const stars = (() => { try { return JSON.parse(window.localStorage.getItem(STARS_KEY) || "{}") || {}; } catch (_) { return {}; } })();
  function saveStars(id, n) { stars[id] = Math.max(stars[id] || 0, n); try { window.localStorage.setItem(STARS_KEY, JSON.stringify(stars)); } catch (_) {} }
  const starRow = (n) => `<span class="ws-stars" aria-label="${n} sao">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</span>`;
  const host = () => activeContext && activeContext.host;

  /* ---------- Giọng đọc ---------- */
  const ttsAudio = new Audio();
  ttsAudio.referrerPolicy = "no-referrer";
  ttsAudio.preload = "none";
  let ttsNonce = 0;
  let ttsQueue = [];
  const synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
  if (synth) { try { synth.getVoices(); } catch (_) {} }
  function viVoice() { if (!synth) return null; try { return synth.getVoices().find((v) => /^vi([-_]|$)/i.test(v.lang)) || null; } catch (_) { return null; } }
  function splitText(text, max = 170) {
    const parts = String(text || "").replace(/\s+/g, " ").trim().match(/[^.!?]+[.!?]?/g) || [];
    const out = []; let buf = "";
    parts.forEach((p) => { const s = p.trim(); if (!s) return; if (!buf) buf = s; else if ((buf + " " + s).length <= max) buf += " " + s; else { out.push(buf); buf = s; } });
    if (buf) out.push(buf);
    return out;
  }
  function stopSpeak() {
    ttsNonce += 1; ttsQueue = [];
    try { if (synth) synth.cancel(); } catch (_) {}
    try { ttsAudio.pause(); ttsAudio.removeAttribute("src"); ttsAudio.load(); } catch (_) {}
  }
  function voiceFail(quiet) {
    if (quiet) return;
    const n = host() && host().querySelector("#ws-voice");
    if (n) { n.hidden = false; n.textContent = "Chưa phát được giọng đọc. Con nhờ người lớn kiểm tra loa và mạng nhé."; }
  }
  function playNext(nonce, quiet) {
    if (nonce !== ttsNonce || !ttsQueue.length) return;
    const chunk = ttsQueue.shift();
    const voice = viVoice();
    if (voice) {
      try {
        const u = new SpeechSynthesisUtterance(chunk);
        u.voice = voice; u.lang = voice.lang; u.rate = 0.92; u.pitch = 1.08;
        u.onend = () => playNext(nonce, true);
        u.onerror = (e) => { if (nonce === ttsNonce && e.error !== "interrupted" && e.error !== "canceled") voiceFail(quiet); };
        synth.speak(u); return;
      } catch (_) { /* dùng Google */ }
    }
    try {
      ttsAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      ttsAudio.playbackRate = 0.96;
      const p = ttsAudio.play();
      if (p && p.catch) p.catch(() => { if (nonce === ttsNonce) voiceFail(quiet); });
    } catch (_) { voiceFail(quiet); }
  }
  ttsAudio.addEventListener("ended", () => { if (ttsQueue.length) playNext(ttsNonce, true); });
  function speak(text, quiet = true, force = false) {
    if (muted && !force) return;
    const chunks = splitText(text); if (!chunks.length) return;
    stopSpeak();
    const nonce = ++ttsNonce; ttsQueue = chunks; playNext(nonce, quiet);
  }

  function setBanner(withLevel) {
    const fn = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof fn !== "function") return;
    const items = [{ level: 2, title: `${GAME_NUMBER}. ${GAME_TITLE}`, action: withLevel ? renderHome : null }];
    if (withLevel && level) items.push({ level: 3, title: `${GAME_NUMBER}.${LEVELS.indexOf(level) + 1} ${level.title.replace(/^Cấp \d+: /, "")}`, action: null });
    fn({ items });
  }

  function ensureStyles() {
    if (!document.getElementById("class1-game-explorer-font")) {
      const link = document.createElement("link");
      link.id = "class1-game-explorer-font"; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap&subset=vietnamese";
      document.head.appendChild(link);
    }
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ws-page{color:#344054;font-family:"Baloo 2","Nunito","Segoe UI",system-ui,sans-serif;padding:.1rem .1rem 1rem}
      .ws-page button{font-family:inherit}
      .ws-bubble{display:flex;align-items:center;gap:.6rem;border:2px solid #F9A8D4;border-radius:18px;background:#FFF1F7;padding:.55rem .8rem;margin:0 0 .9rem;color:#BE185D;font-size:19px;font-weight:700;line-height:1.4}
      .ws-bubble .ico{font-size:30px}.ws-bubble .txt{flex:1}
      .ws-say{flex:0 0 auto;min-width:50px;min-height:50px;border-radius:14px;border:2px solid #F9A8D4;background:#fff;cursor:pointer;font-size:22px}
      .ws-say.mute{opacity:.55}
      .ws-levels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.8rem}
      .ws-level{display:flex;flex-direction:column;align-items:center;gap:.3rem;border:2px solid #E9D5FF;border-radius:22px;background:#fff;padding:1rem .7rem;cursor:pointer;text-align:center;transition:transform .15s,box-shadow .15s}
      .ws-level:hover{transform:translateY(-3px);box-shadow:0 10px 22px rgba(139,92,246,.14)}
      .ws-level h3{margin:0;color:#5B216E;font-size:22px;font-weight:800}
      .ws-level .mini{display:flex;gap:.3rem;justify-content:center}
      .ws-level .mini .ws-bin-svg{width:52px}
      .ws-stars{color:#F59E0B;font-size:22px;letter-spacing:2px}.ws-stars .off{color:#E5E7EB}
      .ws-after{margin-top:1rem;border:2px dashed #6EE7B7;border-radius:22px;background:#F0FDF4;padding:.8rem}
      .ws-after h3{margin:0 0 .5rem;color:#047857;font-size:21px;font-weight:800}
      .ws-after-row{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.6rem}
      .ws-after-card{display:flex;flex-direction:column;align-items:center;gap:.2rem;background:#fff;border:2px solid #A7F3D0;border-radius:16px;padding:.5rem;text-align:center;font-size:15.5px;font-weight:700;color:#065F46;line-height:1.3}
      .ws-after-card .pair{display:flex;align-items:center;gap:.2rem;font-size:30px}
      .ws-after-card .ws-ic{width:44px;height:44px}
      .ws-head{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap;margin-bottom:.6rem}
      .ws-head h2{margin:0;flex:1;min-width:220px;color:#5B216E;font-size:27px;font-weight:800}
      .ws-progress{display:flex;align-items:center;gap:.5rem;font-size:17px;font-weight:700;color:#6D28D9}
      .ws-bar{width:160px;height:14px;border-radius:999px;background:#EDE9FE;overflow:hidden}.ws-bar span{display:block;height:100%;background:linear-gradient(90deg,#3B82F6,#10B981);transition:width .4s}
      .ws-field{position:relative;min-height:190px;border-radius:24px;border:2px solid #BBF7D0;background:linear-gradient(180deg,#E0F2FE 0,#E0F2FE 30%,#BBF7D0 30%,#86EFAC 100%);padding:1rem;display:flex;align-items:flex-end;justify-content:center;gap:1rem;flex-wrap:wrap}
      .ws-item{display:flex;flex-direction:column;align-items:center;gap:.1rem;border:3px solid transparent;border-radius:20px;background:rgba(255,255,255,.88);padding:.4rem .6rem;cursor:pointer;font-size:17px;font-weight:800;color:#3B0764;transition:transform .2s,border-color .15s,opacity .4s;min-width:112px}
      .ws-item .ws-ic{width:80px;height:80px}
      .ws-item:hover{transform:translateY(-3px)}
      .ws-item.sel{border-color:#EC4899;background:#FFF1F7;transform:translateY(-12px) scale(1.06);box-shadow:0 10px 18px rgba(236,72,153,.25)}
      .ws-item.gone{opacity:0;transform:translateY(60px) scale(.4)}
      .ws-item.bounce{animation:wsBounce .5s}
      @keyframes wsBounce{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
      .ws-bins{margin-top:.9rem;display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:.7rem}
      .ws-bin{display:flex;flex-direction:column;align-items:center;gap:.1rem;border:3px solid #E9D5FF;border-radius:22px;background:#fff;padding:.5rem .3rem;cursor:pointer;transition:transform .15s,border-color .15s}
      .ws-bin .ws-bin-svg{width:96px;height:auto}
      .ws-bin strong{font-size:19px;font-weight:800;color:#3B0764}
      .ws-bin small{font-size:14px;font-weight:600;color:#667085;line-height:1.25;text-align:center}
      .ws-bin.ready{border-color:#C4B5FD}
      .ws-bin.ready:hover{transform:translateY(-3px);border-color:#EC4899}
      .ws-bin.eat .ws-lid{transform-box:fill-box;transform-origin:left bottom;animation:wsLid .6s}
      @keyframes wsLid{40%{transform:rotate(-28deg)}}
      .ws-bin.no{animation:wsBounce .5s;border-color:#F87171}
      .ws-fb{margin-top:.8rem;display:flex;align-items:center;gap:.6rem;border-radius:18px;padding:.6rem .8rem;font-size:18px;font-weight:700;line-height:1.45;border:2px solid #E9D5FF;background:#fff;color:#5B216E;min-height:60px}
      .ws-fb .ico{font-size:28px}
      .ws-fb.good{border-color:#6EE7B7;background:#ECFDF5;color:#047857}
      .ws-fb.bad{border-color:#FCD34D;background:#FFFBEB;color:#92400E}
      .ws-btn{min-height:54px;border-radius:16px;border:2px solid #6EE7B7;background:linear-gradient(90deg,#ECFDF5,#E0F2FE);color:#047857;padding:0 1.1rem;font-size:19px;font-weight:700;cursor:pointer}
      .ws-btn.primary{border:0;background:linear-gradient(90deg,#EC4899,#8B5CF6);color:#fff;box-shadow:0 6px 16px rgba(139,92,246,.22)}
      .ws-btn:focus-visible,.ws-item:focus-visible,.ws-bin:focus-visible,.ws-level:focus-visible,.ws-say:focus-visible{outline:3px solid #F472B6;outline-offset:2px}
      .ws-voice{margin:0 0 .6rem;padding:.4rem .7rem;border-radius:12px;background:#FFF7ED;color:#C2410C;font-size:16px;font-weight:600}
      .ws-finish{border:2px solid #FBCFE8;border-radius:24px;background:linear-gradient(135deg,#FFF1F7,#F5F3FF);padding:1rem;text-align:center}
      .ws-finish .big{font-size:56px;line-height:1.1}
      .ws-finish h2{margin:.2rem 0;color:#BE185D;font-size:29px;font-weight:800}
      .ws-finish .bigstars{font-size:44px;color:#F59E0B;letter-spacing:6px}.ws-finish .bigstars .off{color:#E5E7EB}
      .ws-actions{display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center;margin-top:.8rem}
      .ws-sortcols{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:.6rem;margin-top:1rem}
      .ws-sortcol{border-radius:16px;background:#fff;border:2px solid #EDE9FE;padding:.4rem}
      .ws-sortcol h4{margin:0 0 .3rem;font-size:16px;font-weight:800;text-align:center}
      .ws-sortcol .row{display:flex;flex-wrap:wrap;gap:.25rem;justify-content:center}
      .ws-sortcol .ws-ic{width:44px;height:44px}
      @media(max-width:1000px){.ws-levels{grid-template-columns:1fr}.ws-after-row{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:700px){.ws-bins{grid-template-columns:repeat(2,minmax(0,1fr))}.ws-item{min-width:92px;font-size:15px}.ws-item .ws-ic{width:64px;height:64px}.ws-bin .ws-bin-svg{width:72px}.ws-sortcols{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(prefers-reduced-motion:reduce){.ws-item,.ws-bin{transition:none}.ws-item.bounce,.ws-bin.no,.ws-bin.eat .ws-lid{animation:none}}
    `;
    document.head.appendChild(style);
  }

  /* ---------- Trang chọn cấp ---------- */
  const HOME_TIP = "Phân loại rác giúp rác được tái chế thành đồ mới, rác hữu cơ thành phân bón, và giữ cho đất, nước luôn sạch. Mình cùng tập nhé!";
  function renderHome() {
    clearTimers(); stopSpeak();
    level = null;
    setBanner(false);
    const h = host(); if (!h) return;
    h.innerHTML = `
      <div class="ws-page">
        <div class="section-heading"><div><h1>♻️ ${GAME_TITLE}</h1><p>${LEVELS.length} cấp</p></div><button id="ws-back-games" class="back-btn" type="button">← Games</button></div>
        <div class="ws-bubble"><span class="ico" aria-hidden="true">🐰</span><span class="txt">${HOME_TIP}</span><button class="ws-say" id="ws-say-home" type="button" aria-label="Nghe cô đọc">🔊</button></div>
        <p id="ws-voice" class="ws-voice" hidden></p>
        <div class="ws-levels">${LEVELS.map((l, i) => `
          <button class="ws-level" type="button" data-level="${i}">
            <div class="mini" aria-hidden="true">${l.bins.map((b) => binSvg(BINS[b].color, BINS[b].dark, BINS[b].symbol)).join("")}</div>
            <h3>${esc(l.title)}</h3>${starRow(stars[l.id] || 0)}
          </button>`).join("")}</div>
        <section class="ws-after"><h3>🌍 Rác sau khi phân loại sẽ đi đâu?</h3>
          <div class="ws-after-row">${AFTER.map((a) => `<div class="ws-after-card"><span class="pair">${iconSvg(a.from)}<span aria-hidden="true">➜</span><span>${a.to}</span></span>${esc(a.text)}</div>`).join("")}</div></section>
      </div>`;
    h.querySelector("#ws-back-games")?.addEventListener("click", () => activeContext && activeContext.back && activeContext.back());
    h.querySelector("#ws-say-home")?.addEventListener("click", () => speak(HOME_TIP, false, true));
    h.querySelectorAll("[data-level]").forEach((b) => b.addEventListener("click", () => startLevel(LEVELS[Number(b.dataset.level)])));
  }

  function startLevel(l) {
    clearTimers(); stopSpeak();
    level = l; queue = shuffle(l.items); onField = []; selected = ""; mistakes = 0; sorted = []; busy = false;
    refill();
    renderLevel(true);
  }
  function refill() { while (onField.length < PER_BATCH && queue.length) onField.push(queue.shift()); }

  function renderLevel(readIntro) {
    const h = host(); if (!h || !level) return;
    setBanner(true);
    const total = level.items.length;
    h.innerHTML = `
      <div class="ws-page">
        <div class="ws-head"><h2>♻️ ${esc(level.title)}</h2>
          <div class="ws-progress"><div class="ws-bar"><span style="width:${(sorted.length / total) * 100}%"></span></div>${sorted.length}/${total}</div>
          <button id="ws-mute" class="ws-say${muted ? " mute" : ""}" type="button" aria-label="${muted ? "Bật" : "Tắt"} giọng đọc tự động">${muted ? "🔇" : "🔈"}</button>
          <button id="ws-home" class="back-btn" type="button">← ${LEVELS.length} cấp</button></div>
        ${readIntro ? `<div class="ws-bubble"><span class="ico" aria-hidden="true">🐰</span><span class="txt">${esc(level.intro)}</span><button class="ws-say" id="ws-say-intro" type="button" aria-label="Nghe cô đọc">🔊</button></div>` : ""}
        <p id="ws-voice" class="ws-voice" hidden></p>
        <div class="ws-field" aria-label="Các món rác cần phân loại">${onField.map((id) => `<button type="button" class="ws-item${selected === id ? " sel" : ""}" data-item="${id}" aria-pressed="${selected === id}">${iconSvg(id)}${esc(ITEMS[id].name)}</button>`).join("")}</div>
        <div class="ws-bins" style="--n:${level.bins.length}">${level.bins.map((b) => `<button type="button" class="ws-bin${selected ? " ready" : ""}" data-bin="${b}">${binSvg(BINS[b].color, BINS[b].dark, BINS[b].symbol)}<strong>${esc(BINS[b].label)}</strong><small>${esc(BINS[b].hint)}</small></button>`).join("")}</div>
        <div id="ws-fb" class="ws-fb" aria-live="polite"><span class="ico" aria-hidden="true">👆</span><span>${selected ? `Bé chọn thùng cho “${esc(ITEMS[selected].name)}” nhé!` : "Bé chạm vào một món rác trước nhé!"}</span></div>
      </div>`;
    bind();
    if (readIntro) speak(level.intro);
  }

  function feedback(kind, icon, text) {
    const n = host() && host().querySelector("#ws-fb");
    if (n) { n.className = `ws-fb ${kind}`; n.innerHTML = `<span class="ico" aria-hidden="true">${icon}</span><span>${esc(text)}</span>`; }
  }

  function bind() {
    const h = host(); if (!h) return;
    h.querySelector("#ws-home")?.addEventListener("click", renderHome);
    h.querySelector("#ws-say-intro")?.addEventListener("click", () => speak(level.intro, false, true));
    h.querySelector("#ws-mute")?.addEventListener("click", (ev) => {
      muted = !muted; if (muted) stopSpeak();
      ev.currentTarget.textContent = muted ? "🔇" : "🔈"; ev.currentTarget.classList.toggle("mute", muted);
    });
    h.querySelectorAll("[data-item]").forEach((b) => b.addEventListener("click", () => {
      if (busy) return;
      selected = selected === b.dataset.item ? "" : b.dataset.item;
      h.querySelectorAll("[data-item]").forEach((x) => { const on = x.dataset.item === selected; x.classList.toggle("sel", on); x.setAttribute("aria-pressed", String(on)); });
      h.querySelectorAll("[data-bin]").forEach((x) => x.classList.toggle("ready", !!selected));
      if (selected) { feedback("", "👇", `Bé chọn thùng cho “${ITEMS[selected].name}” nhé!`); speak(ITEMS[selected].name); }
      else feedback("", "👆", "Bé chạm vào một món rác trước nhé!");
    }));
    h.querySelectorAll("[data-bin]").forEach((b) => b.addEventListener("click", () => dropInto(b.dataset.bin)));
  }

  function dropInto(binId) {
    const h = host(); if (!h || busy) return;
    if (!selected) { feedback("bad", "👆", "Bé chạm vào một món rác trước, rồi mới chọn thùng nhé!"); speak("Bé chạm vào một món rác trước nhé!"); return; }
    const id = selected, it = ITEMS[id];
    const itemEl = h.querySelector(`[data-item="${id}"]`);
    const binEl = h.querySelector(`[data-bin="${binId}"]`);
    if (it.bin === binId) {
      busy = true;
      itemEl?.classList.add("gone");
      binEl?.classList.add("eat");
      feedback("good", "🎉", `Đúng rồi! ${it.why}`);
      speak(`Đúng rồi! ${it.why}`);
      sorted.push(id);
      later(() => {
        onField = onField.filter((x) => x !== id);
        selected = ""; busy = false;
        refill();
        if (!onField.length) { renderFinish(); return; }
        renderLevel(false);
        feedback("good", "🎉", `Đúng rồi! ${it.why}`);
      }, 900);
    } else {
      mistakes += 1;
      binEl?.classList.remove("no"); void (binEl && binEl.offsetWidth); binEl?.classList.add("no");
      itemEl?.classList.remove("bounce"); void (itemEl && itemEl.offsetWidth); itemEl?.classList.add("bounce");
      later(() => { binEl?.classList.remove("no"); itemEl?.classList.remove("bounce"); }, 550);
      const right = BINS[it.bin];
      const msg = `Chưa đúng rồi. ${it.name} là rác ${right.short}, bỏ vào thùng ${right.label.toLowerCase()} nhé!`;
      feedback("bad", "🤔", msg);
      speak(msg);
    }
  }

  function renderFinish() {
    clearTimers();
    const h = host(); if (!h || !level) return;
    setBanner(true);
    const n = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    saveStars(level.id, n);
    const next = LEVELS[LEVELS.indexOf(level) + 1];
    h.innerHTML = `
      <div class="ws-page">
        <section class="ws-finish"><div class="big" aria-hidden="true">♻️🐰🌍</div>
          <h2>${mistakes === 0 ? "Phân loại đúng hết, giỏi quá!" : "Bé đã phân loại xong!"}</h2>
          <div class="bigstars" aria-label="${n} sao">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</div>
          <div class="ws-sortcols" style="--n:${level.bins.length}">${level.bins.map((b) => `<div class="ws-sortcol"><h4 style="color:${BINS[b].dark}">${BINS[b].symbol} ${esc(BINS[b].label)}</h4><div class="row">${level.items.filter((id) => ITEMS[id].bin === b).map((id) => `<span title="${esc(ITEMS[id].name)}">${iconSvg(id)}</span>`).join("")}</div></div>`).join("")}</div>
          <div class="ws-actions">
            ${next ? `<button id="ws-next" class="ws-btn primary" type="button">▶ ${esc(next.title)}</button>` : ""}
            <button id="ws-replay" class="ws-btn" type="button">🔄 Chơi lại</button>
            <button id="ws-list" class="ws-btn" type="button">♻️ Chọn cấp khác</button>
          </div>
        </section>
        <section class="ws-after"><h3>🌍 Rác sau khi phân loại sẽ đi đâu?</h3>
          <div class="ws-after-row">${AFTER.map((a) => `<div class="ws-after-card"><span class="pair">${iconSvg(a.from)}<span aria-hidden="true">➜</span><span>${a.to}</span></span>${esc(a.text)}</div>`).join("")}</div></section>
        <p id="ws-voice" class="ws-voice" hidden></p>
      </div>`;
    speak(mistakes === 0 ? "Phân loại đúng hết, giỏi quá! Nhờ bé phân loại, rác sẽ được tái chế thành đồ mới." : "Bé đã phân loại xong! Nhờ bé phân loại, rác sẽ được tái chế thành đồ mới.");
    h.querySelector("#ws-next")?.addEventListener("click", () => startLevel(next));
    h.querySelector("#ws-replay")?.addEventListener("click", () => startLevel(level));
    h.querySelector("#ws-list")?.addEventListener("click", renderHome);
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    renderHome();
  }
  function destroy() {
    clearTimers(); stopSpeak();
    activeContext = null; level = null;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
