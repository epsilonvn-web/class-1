(() => {
  "use strict";

  /* =====================================================================
     10. Phòng thí nghiệm tí hon
     Bé đoán trước kết quả, xem thí nghiệm chạy, rồi nghe Cô Thỏ giải thích.
     Giao diện module: window.CLASS1_GAME_MODULES.tinyLab = { render(context), destroy() }
     ===================================================================== */

  const MODULE_KEY = "tinyLab";
  const GAME_NUMBER = 10;
  const GAME_TITLE = "Phòng thí nghiệm tí hon";
  const STYLE_ID = "class1-games-tiny-lab-style-v3";
  const STARS_KEY = "class1-tiny-lab-stars";

  /* ---------- Hình đồ vật (khung 100 x 100, nét viền nâu đậm) ---------- */
  const INK = "#3B2314";
  const ICON = {
    da: `<path d="M18 70 Q12 50 28 38 Q40 22 60 28 Q82 30 86 52 Q90 72 70 80 Q44 88 18 70Z" fill="#9CA3AF"/><path d="M36 46 q8 -6 16 0 M58 62 q6 -4 12 0" fill="none" stroke-width="3" opacity=".5"/>`,
    la: `<path d="M16 82 C18 40 50 16 86 14 C82 52 58 82 16 82Z" fill="#4ADE80"/><path d="M20 78 L80 20 M40 60 l-4 -14 M54 46 l-2 -14 M48 52 l14 2 M62 38 l12 2" fill="none" stroke-width="3"/>`,
    tao: `<path d="M50 30 C36 18 14 24 16 48 C18 74 36 88 50 82 C64 88 82 74 84 48 C86 24 64 18 50 30Z" fill="#EF4444"/><path d="M50 30 Q52 18 58 12" fill="none" stroke-width="4"/><path d="M56 18 Q72 8 78 20 Q66 26 56 18Z" fill="#4ADE80"/><ellipse cx="34" cy="44" rx="6" ry="10" fill="#FCA5A5" stroke="none"/>`,
    chia_khoa: `<circle cx="30" cy="40" r="18" fill="#FBBF24"/><circle cx="30" cy="40" r="7" fill="#fff"/><path d="M46 46 L86 66 L80 76 L74 72 L70 80 L62 76 L66 68 L42 56Z" fill="#FBBF24"/>`,
    but_chi: `<g transform="rotate(-40 50 50)"><rect x="14" y="40" width="58" height="20" fill="#FACC15"/><path d="M72 40 L92 50 L72 60Z" fill="#F5DEB3"/><path d="M86 47 L92 50 L86 53Z" fill="${INK}"/><rect x="6" y="40" width="10" height="20" rx="3" fill="#F9A8D4"/><path d="M14 47 H72 M14 53 H72" stroke-width="2" opacity=".5"/></g>`,
    trung: `<ellipse cx="50" cy="54" rx="28" ry="36" fill="#FEF3C7"/><ellipse cx="40" cy="40" rx="6" ry="10" fill="#fff" stroke="none"/>`,
    bong: `<circle cx="50" cy="50" r="36" fill="#fff"/><path d="M50 14 A36 36 0 0 1 86 50 L50 50Z" fill="#EF4444"/><path d="M50 86 A36 36 0 0 1 14 50 L50 50Z" fill="#3B82F6"/><path d="M14 50 A36 36 0 0 1 50 14 L50 50Z" fill="#FACC15"/><circle cx="50" cy="50" r="36" fill="none"/><circle cx="50" cy="50" r="6" fill="#fff"/>`,
    thia: `<ellipse cx="34" cy="34" rx="16" ry="22" transform="rotate(-40 34 34)" fill="#E5E7EB"/><path d="M44 46 L84 86" stroke-width="10"/><path d="M44 46 L84 86" stroke="#E5E7EB" stroke-width="5"/><ellipse cx="30" cy="28" rx="5" ry="9" transform="rotate(-40 30 28)" fill="#fff" stroke="none"/>`,
    kep_giay: `<path d="M40 82 V26 Q40 14 52 14 Q64 14 64 26 V70 Q64 78 56 78 Q48 78 48 70 V32" fill="none" stroke="#6B7280" stroke-width="7"/><path d="M40 82 V26 Q40 14 52 14 Q64 14 64 26 V70 Q64 78 56 78 Q48 78 48 70 V32" fill="none" stroke="#D1D5DB" stroke-width="3"/>`,
    dinh: `<rect x="30" y="14" width="40" height="10" rx="4" fill="#9CA3AF"/><path d="M45 24 H55 V76 L50 90 L45 76Z" fill="#9CA3AF"/><path d="M49 28 V74" stroke="#E5E7EB" stroke-width="2"/>`,
    cuc_tay: `<g transform="rotate(-15 50 50)"><rect x="16" y="34" width="68" height="32" rx="6" fill="#F9A8D4"/><rect x="56" y="34" width="28" height="32" rx="6" fill="#93C5FD"/></g>`,
    lon_nhom: `<rect x="28" y="18" width="44" height="66" rx="8" fill="#EF4444"/><path d="M30 20 Q50 12 70 20" fill="#D1D5DB"/><path d="M34 40 Q50 50 66 40" fill="none" stroke="#fff" stroke-width="5"/><ellipse cx="50" cy="18" rx="22" ry="5" fill="#E5E7EB"/><path d="M46 16 h8" stroke-width="3"/>`,
    oc_vit: `<path d="M30 20 H70 L64 32 H36Z" fill="#9CA3AF"/><path d="M42 32 H58 V78 L50 90 L42 78Z" fill="#9CA3AF"/><path d="M42 40 L58 46 M42 50 L58 56 M42 60 L58 66 M42 70 L58 76" stroke-width="2.5"/><path d="M50 22 V30" stroke-width="3"/>`,
    giay: `<path d="M24 12 H66 L80 26 V88 H24Z" fill="#fff"/><path d="M66 12 V26 H80" fill="#E5E7EB"/><path d="M32 40 H72 M32 52 H72 M32 64 H72 M32 76 H60" stroke="#93C5FD" stroke-width="3"/>`,
    nap_chai: `<path d="${Array.from({ length: 42 }, (_, k) => { const a = (k / 42) * Math.PI * 2; const r = k % 2 ? 33 : 38; return `${k ? "L" : "M"}${(50 + r * Math.cos(a)).toFixed(1)} ${(50 + r * Math.sin(a)).toFixed(1)}`; }).join(" ")}Z" fill="#DC2626"/><circle cx="50" cy="50" r="26" fill="#F87171"/><circle cx="50" cy="50" r="12" fill="#FECACA" stroke="none"/>`,
    muoi: `<path d="M14 62 Q50 98 86 62Z" fill="#E0F2FE"/><path d="M24 62 Q50 30 76 62Z" fill="#fff"/>${[[36, 54], [46, 48], [56, 52], [64, 58], [42, 58], [52, 42]].map(([x, y]) => `<rect x="${x}" y="${y}" width="5" height="5" fill="#CBD5E1" stroke="none"/>`).join("")}<path d="M10 62 H90" stroke-width="3"/>`,
    duong: `<path d="M14 66 Q50 98 86 66Z" fill="#FCE7F3"/>${[[28, 46], [46, 40], [64, 46], [37, 56], [55, 56]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="14" rx="2" fill="#fff"/>`).join("")}<path d="M10 66 H90" stroke-width="3"/>`,
    cat: `<path d="M14 62 Q50 98 86 62Z" fill="#E0F2FE"/><path d="M22 62 Q50 28 78 62Z" fill="#E7C98A"/>${[[38, 52], [50, 44], [60, 54], [46, 58]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#A16207" stroke="none"/>`).join("")}<path d="M10 62 H90" stroke-width="3"/>`,
    soi: `<path d="M14 66 Q50 98 86 66Z" fill="#E0F2FE"/><ellipse cx="34" cy="58" rx="12" ry="9" fill="#9CA3AF"/><ellipse cx="56" cy="54" rx="13" ry="10" fill="#D1D5DB"/><ellipse cx="70" cy="62" rx="9" ry="7" fill="#78716C"/><path d="M10 66 H90" stroke-width="3"/>`,
    ca_phe: `<path d="M14 62 Q50 98 86 62Z" fill="#E0F2FE"/><path d="M22 62 Q50 28 78 62Z" fill="#7C4A21"/><path d="M10 62 H90" stroke-width="3"/>`,
    gao: `<path d="M14 62 Q50 98 86 62Z" fill="#E0F2FE"/><path d="M22 62 Q50 30 78 62Z" fill="#FFFBEB"/>${[[36, 54, 20], [48, 46, -30], [58, 54, 40], [44, 57, 70], [64, 59, -10]].map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="2.5" transform="rotate(${a} ${x} ${y})" fill="#fff" stroke-width="1.5"/>`).join("")}<path d="M10 62 H90" stroke-width="3"/>`,
    dau_an: `<path d="M40 10 H60 V22 L68 32 V84 Q68 90 62 90 H38 Q32 90 32 84 V32 L40 22Z" fill="#FDE68A"/><rect x="40" y="6" width="20" height="8" rx="2" fill="#16A34A"/><rect x="36" y="48" width="28" height="22" rx="3" fill="#fff"/><path d="M44 56 q6 -8 12 0 q-6 8 -12 0Z" fill="#84CC16" stroke-width="1.5"/>`,
    kinh: `<rect x="18" y="12" width="64" height="76" rx="4" fill="#E0F2FE" fill-opacity=".7"/><path d="M28 30 L46 18 M28 44 L58 22 M60 80 L74 70" stroke="#fff" stroke-width="5"/>`,
    nilon: `<path d="M24 24 H76 L80 88 H20Z" fill="#F0F9FF" fill-opacity=".6"/><path d="M34 24 Q34 10 42 10 M66 24 Q66 10 58 10" fill="none" stroke-width="3"/><path d="M30 40 Q40 60 32 80 M66 36 Q60 56 70 78" fill="none" stroke="#BAE6FD" stroke-width="3"/>`,
    giay_nen: `<rect x="18" y="12" width="64" height="76" rx="3" fill="#F8FAFC"/><rect x="18" y="12" width="64" height="76" rx="3" fill="#E2E8F0" fill-opacity=".6"/><path d="M28 30 H72 M28 46 H72 M28 62 H72" stroke="#fff" stroke-width="6" opacity=".7"/>`,
    vai: `<path d="M16 18 Q34 12 50 18 T84 18 V84 Q66 90 50 84 T16 84Z" fill="#FBCFE8" fill-opacity=".85"/><path d="M28 18 V84 M44 18 V84 M60 18 V84 M74 18 V84" stroke="#F9A8D4" stroke-width="2" opacity=".8"/>`,
    bia: `<rect x="16" y="14" width="68" height="72" rx="3" fill="#D6A867"/><path d="M16 30 H84" stroke="#B07A3C" stroke-width="3"/><path d="M30 50 h20 M30 60 h30" stroke="#B07A3C" stroke-width="3"/>`,
    go: `<rect x="16" y="14" width="68" height="72" rx="4" fill="#B45309"/><path d="M26 22 Q40 34 26 50 Q14 64 30 80 M50 18 Q60 40 52 60 Q46 74 56 84 M70 20 Q78 36 70 52" fill="none" stroke="#7C2D12" stroke-width="2.5"/>`,
    nam_cham: `<path d="M20 18 H44 V58 Q44 70 50 70 Q56 70 56 58 V18 H80 V58 Q80 92 50 92 Q20 92 20 58Z" fill="#EF4444"/><rect x="20" y="18" width="24" height="16" fill="#D1D5DB"/><rect x="56" y="18" width="24" height="16" fill="#D1D5DB"/>`
  };
  function iconSvg(id, cls = "") {
    return `<svg class="lab-ic ${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${ICON[id] || ""}</g></svg>`;
  }


  /* ---------- Bốn thí nghiệm ---------- */
  const EXPERIMENTS = [
    {
      id: "float", emoji: "💧", tone: "teal", title: "Chìm hay nổi?",
      desc: "Thả đồ vật vào bể nước",
      intro: "Cô Thỏ có một bể nước to. Mình sẽ thả từng đồ vật vào bể. Trước khi thả, bé đoán xem nó sẽ chìm hay nổi nhé!",
      ask: (n) => `Theo bé, ${n} sẽ chìm hay nổi?`,
      choices: [{ id: "sink", icon: "⬇️", label: "Chìm" }, { id: "float", icon: "⬆️", label: "Nổi" }],
      items: [
        { id: "da", name: "hòn đá", answer: "sink", why: "Hòn đá chìm xuống đáy, vì đá rất đặc và nặng so với kích thước của nó." },
        { id: "la", name: "chiếc lá", answer: "float", why: "Chiếc lá nhẹ và mỏng nên nằm êm trên mặt nước." },
        { id: "tao", name: "quả táo", answer: "float", why: "Quả táo nổi! Bên trong quả táo có rất nhiều bọt không khí nhỏ li ti giúp táo nổi lên." },
        { id: "chia_khoa", name: "chiếc chìa khóa", answer: "sink", why: "Chìa khóa làm bằng kim loại, nhỏ mà nặng, nên chìm ngay xuống đáy." },
        { id: "but_chi", name: "cây bút chì", answer: "float", why: "Bút chì làm bằng gỗ. Gỗ nhẹ nên bút chì nổi trên mặt nước." },
        { id: "trung", name: "quả trứng", answer: "sink", why: "Quả trứng chìm trong nước thường. Nhưng nếu hòa thật nhiều muối vào nước, quả trứng lại nổi lên đấy!" },
        { id: "bong", name: "quả bóng nhựa", answer: "float", why: "Quả bóng chứa đầy không khí bên trong, nên dù bé ấn xuống, nó vẫn nổi lên." },
        { id: "thia", name: "chiếc thìa kim loại", answer: "sink", why: "Chiếc thìa bằng kim loại nên chìm xuống đáy bể." }
      ],
      remember: "Vật nhẹ, xốp hoặc chứa nhiều không khí thường nổi. Vật đặc và nặng so với kích thước của nó thường chìm."
    },
    {
      id: "magnet", emoji: "🧲", tone: "pink", title: "Nam châm hút gì?",
      desc: "Đưa nam châm lại gần đồ vật",
      intro: "Đây là một chiếc nam châm. Nam châm hút được một số đồ vật, nhưng không phải tất cả đâu. Bé đoán trước rồi mình cùng thử nhé!",
      ask: (n) => `Theo bé, nam châm có hút ${n} không?`,
      choices: [{ id: "yes", icon: "🧲", label: "Hút" }, { id: "no", icon: "🚫", label: "Không hút" }],
      items: [
        { id: "kep_giay", name: "chiếc kẹp giấy", answer: "yes", why: "Kẹp giấy làm bằng sắt, nên nam châm hút dính ngay." },
        { id: "but_chi", name: "cây bút chì", answer: "no", why: "Bút chì làm bằng gỗ. Nam châm không hút gỗ." },
        { id: "dinh", name: "chiếc đinh sắt", answer: "yes", why: "Chiếc đinh làm bằng sắt, nam châm hút rất mạnh." },
        { id: "cuc_tay", name: "cục tẩy", answer: "no", why: "Cục tẩy làm bằng cao su, nam châm không hút cao su." },
        { id: "lon_nhom", name: "lon nước ngọt", answer: "no", why: "Bất ngờ chưa! Lon nước ngọt là kim loại, nhưng làm bằng nhôm, mà nam châm không hút nhôm." },
        { id: "oc_vit", name: "con ốc vít sắt", answer: "yes", why: "Con ốc vít này làm bằng sắt, nên bị nam châm hút về." },
        { id: "giay", name: "tờ giấy", answer: "no", why: "Tờ giấy không bị nam châm hút." },
        { id: "nap_chai", name: "chiếc nắp chai", answer: "yes", why: "Nắp chai làm bằng một lớp thép mỏng, có sắt bên trong, nên nam châm hút được." }
      ],
      remember: "Nam châm hút những đồ vật bằng sắt, thép. Nam châm không hút gỗ, nhựa, giấy, cao su, và cũng không hút nhôm."
    },
    {
      id: "dissolve", emoji: "🥄", tone: "amber", title: "Tan hay không tan?",
      desc: "Khuấy đồ vật vào cốc nước",
      intro: "Cô Thỏ có một cốc nước trong. Mình sẽ cho từng thứ vào rồi khuấy đều. Bé đoán xem nó có tan vào nước không nhé!",
      ask: (n) => `Theo bé, ${n} có tan trong nước không?`,
      choices: [{ id: "yes", icon: "✨", label: "Tan" }, { id: "no", icon: "🪨", label: "Không tan" }],
      items: [
        { id: "muoi", name: "muối", answer: "yes", fx: "clear", why: "Muối tan hết vào nước, không nhìn thấy hạt muối nữa, nhưng nước có vị mặn. Ở phòng thí nghiệm, mình không nếm thử khi chưa được người lớn cho phép nhé!" },
        { id: "cat", name: "cát", answer: "no", fx: "settle", why: "Cát không tan. Khuấy xong một lúc, cát lắng xuống đáy cốc." },
        { id: "duong", name: "đường", answer: "yes", fx: "clear", why: "Đường tan vào nước, làm nước có vị ngọt. Nước càng ấm, đường tan càng nhanh." },
        { id: "soi", name: "sỏi", answer: "no", fx: "settle", why: "Sỏi không tan, nằm im dưới đáy cốc." },
        { id: "ca_phe", name: "bột cà phê hòa tan", answer: "yes", fx: "brown", why: "Bột cà phê hòa tan tan vào nước và làm nước chuyển sang màu nâu." },
        { id: "dau_an", name: "dầu ăn", answer: "no", fx: "oil", why: "Dầu ăn không tan trong nước. Dầu nhẹ hơn nước nên nổi thành một lớp trên mặt." },
        { id: "gao", name: "hạt gạo", answer: "no", fx: "settle", why: "Hạt gạo không tan, chìm xuống đáy cốc." }
      ],
      remember: "Muối, đường tan vào nước. Cát, sỏi, gạo không tan mà lắng xuống đáy. Dầu ăn không tan mà nổi lên trên."
    },
    {
      id: "light", emoji: "🔦", tone: "purple", title: "Ánh sáng đi qua không?",
      desc: "Chiếu đèn pin qua đồ vật",
      intro: "Cô Thỏ bật đèn pin chiếu lên bức tường. Mình sẽ đặt từng đồ vật vào giữa. Bé đoán xem ánh sáng có đi qua được không nhé!",
      ask: (n) => `Theo bé, ánh sáng có đi qua ${n} không?`,
      choices: [{ id: "all", icon: "☀️", label: "Đi qua hết" }, { id: "some", icon: "🌥️", label: "Đi qua một ít" }, { id: "none", icon: "🌑", label: "Không đi qua" }],
      items: [
        { id: "kinh", name: "tấm kính", answer: "all", why: "Tấm kính trong suốt, ánh sáng đi qua gần như hết. Vì thế cửa sổ làm bằng kính để ánh sáng chiếu vào nhà." },
        { id: "bia", name: "tấm bìa cứng", answer: "none", why: "Tấm bìa chặn ánh sáng lại và tạo ra một cái bóng trên tường." },
        { id: "giay_nen", name: "tờ giấy nến", answer: "some", why: "Giấy nến cho một ít ánh sáng đi qua, nhìn qua thấy mờ mờ. Đó là vật trong mờ." },
        { id: "nilon", name: "chiếc túi nilon trong", answer: "all", why: "Túi nilon trong suốt nên ánh sáng đi qua được gần hết." },
        { id: "go", name: "tấm gỗ", answer: "none", why: "Tấm gỗ không cho ánh sáng đi qua, nên phía sau tấm gỗ là bóng tối." },
        { id: "vai", name: "tấm vải mỏng", answer: "some", why: "Vải mỏng cho một ít ánh sáng xuyên qua, giống chiếc rèm cửa mỏng vào buổi sáng." }
      ],
      remember: "Vật trong suốt cho ánh sáng đi qua hết. Vật trong mờ cho một ít ánh sáng đi qua. Vật không cho ánh sáng đi qua sẽ tạo ra bóng."
    }
  ];

  /* ---------- Trạng thái ---------- */
  let activeContext = null;
  let exp = null;
  let order = [];
  let step = 0;
  let phase = "predict";
  let guess = "";
  let results = [];
  let timers = [];
  let muted = false;

  const esc = (v) => String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  const reduceMotion = () => { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (_) { return false; } };
  function later(fn, ms) { const t = window.setTimeout(fn, reduceMotion() ? Math.min(ms, 120) : ms); timers.push(t); }
  function clearTimers() { timers.forEach((t) => window.clearTimeout(t)); timers = []; }
  function shuffle(list) { const a = list.slice(); for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const stars = (() => { try { return JSON.parse(window.localStorage.getItem(STARS_KEY) || "{}") || {}; } catch (_) { return {}; } })();
  function saveStars(id, n) { stars[id] = Math.max(stars[id] || 0, n); try { window.localStorage.setItem(STARS_KEY, JSON.stringify(stars)); } catch (_) {} }
  const starRow = (n) => `<span class="lab-stars" aria-label="${n} sao">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</span>`;
  const host = () => activeContext && activeContext.host;

  /* ---------- Giọng đọc: ưu tiên giọng Việt trong máy, không có thì dùng Google ---------- */
  const ttsAudio = new Audio();
  ttsAudio.referrerPolicy = "no-referrer";
  ttsAudio.preload = "none";
  let ttsNonce = 0;
  let ttsQueue = [];
  // Google TTS only; no implicit browser-voice substitution.
  function splitText(text, max = 170) {
    const sentences = String(text || "").replace(/\s+/g, " ").trim().match(/[^.!?]+[.!?]?/g) || [];
    const units = [];
    for (const sentence of sentences) {
      const clean = sentence.trim();
      if (!clean) continue;
      if (clean.length <= max) { units.push(clean); continue; }
      let part = "";
      for (const word of clean.split(" ")) {
        if (!word) continue;
        if (part && (part + " " + word).length > max) { units.push(part); part = ""; }
        if (word.length > max) {
          if (part) { units.push(part); part = ""; }
          for (let j = 0; j < word.length; j += max) units.push(word.slice(j, j + max));
        } else part = part ? part + " " + word : word;
      }
      if (part) units.push(part);
    }
    const result = []; let buffer = "";
    for (const unit of units) {
      if (buffer && (buffer + " " + unit).length > max) { result.push(buffer); buffer = ""; }
      buffer = buffer ? buffer + " " + unit : unit;
    }
    if (buffer) result.push(buffer);
    return result;
  }
  function stopSpeak() {
    ttsNonce += 1; ttsQueue = [];
    ttsAudio.onended = null; ttsAudio.onerror = null;
    try { ttsAudio.pause(); ttsAudio.removeAttribute("src"); ttsAudio.load(); } catch (_) {}
  }
  function voiceFail(quiet) {
    const n = host()?.querySelector("#lab-voice");
    if (n) { n.hidden = false; n.textContent = tr("Chưa phát được giọng đọc. Con nhờ người lớn kiểm tra loa và mạng nhé.", "Audio isn't available right now. Please ask an adult to check the connection."); }
  }
  function playNext(nonce, quiet) {
    if (nonce !== ttsNonce || !ttsQueue.length) return;
    const chunk = ttsQueue.shift();
    ttsAudio.onended = () => { if (nonce === ttsNonce) playNext(nonce, quiet); };
    ttsAudio.onerror = () => { if (nonce === ttsNonce) { ttsQueue = []; voiceFail(quiet); } };
    try {
      ttsAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${isEn() ? "en-US" : "vi"}&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      ttsAudio.playbackRate = 0.96;
      const p = ttsAudio.play();
      if (p?.catch) p.catch(() => { if (nonce === ttsNonce) { ttsQueue = []; voiceFail(quiet); } });
    } catch (_) { if (nonce === ttsNonce) { ttsQueue = []; voiceFail(quiet); } }
  }
  function speak(text, quiet = true, force = false) {
    if (muted && !force) return;
    const chunks = splitText(text); if (!chunks.length) return;
    stopSpeak(); ttsQueue = chunks; playNext(ttsNonce, quiet);
  }

  function setBanner(withExp) {
    const fn = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof fn !== "function") return;
    const items = [{ level: 2, title: `${GAME_NUMBER}. ${tr(GAME_TITLE, "Tiny Science Lab")}`, action: withExp ? renderHome : null }];
    if (withExp && exp) items.push({ level: 3, title: `${GAME_NUMBER}.${EXPERIMENTS.indexOf(exp) + 1} ${viewExp(exp).title}`, action: null });
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
      .lab-toolbar{display:flex;justify-content:flex-end;align-items:center;gap:.65rem;flex-wrap:nowrap;margin:0}
      .lab-langs{display:inline-flex;gap:0;padding:3px;border:1px solid #BFDBFE;border-radius:17px;background:#fff;box-shadow:0 4px 12px rgba(59,130,246,.11)}
      .lab-langs button{font:inherit;min-height:39px;padding:.4rem .9rem;border:0;border-radius:13px;background:transparent;color:#1D4ED8;font-weight:800;font-size:16px;cursor:pointer;white-space:nowrap}
      .lab-langs button.on{background:linear-gradient(90deg,#3B82F6,#14B8A6);color:#fff;box-shadow:0 3px 8px rgba(20,184,166,.18)}
      .lab-exit{min-height:46px;padding:.6rem .95rem;border:0;border-radius:15px;background:linear-gradient(90deg,#EC4899,#8B5CF6);box-shadow:0 5px 12px rgba(139,92,246,.18);color:#fff;font:inherit;font-size:16px;font-weight:800;cursor:pointer;white-space:nowrap}
      .lab-langs button:focus-visible,.lab-exit:focus-visible{outline:3px solid #93C5FD;outline-offset:2px}
      @media(max-width:390px){.lab-toolbar{gap:.4rem}.lab-langs button{padding:.35rem .65rem;font-size:14px}.lab-exit{font-size:14px;min-height:42px;padding:.5rem .75rem}}
      .lab-page .lab-topline{display:flex;align-items:center;justify-content:space-between;gap:.6rem 1rem;flex-wrap:wrap;margin:0 0 .65rem}
      .lab-page .lab-topline>.lab-toolbar{margin-left:auto}
      .lab-page .lab-head>.lab-toolbar{margin-left:auto}
      .lab-page .lab-finish>.lab-toolbar{margin:0 0 .35rem}
      .lab-page{color:#344054;font-family:"Baloo 2","Nunito","Segoe UI",system-ui,sans-serif;padding:.1rem .1rem 1rem}
      .lab-page button{font-family:inherit}
      .lab-bubble{display:flex;align-items:center;gap:.6rem;border:2px solid #F9A8D4;border-radius:18px;background:#FFF1F7;padding:.55rem .8rem;margin:0 0 .9rem;color:#BE185D;font-size:19px;font-weight:700;line-height:1.4}
      .lab-bubble .ico{font-size:30px}.lab-bubble .txt{flex:1}
      .lab-say{flex:0 0 auto;min-width:50px;min-height:50px;border-radius:14px;border:2px solid #F9A8D4;background:#fff;cursor:pointer;font-size:22px}
      .lab-say.mute{opacity:.55}
      .lab-steps{display:flex;gap:.5rem;flex-wrap:wrap;margin:0 0 .9rem}
      .lab-step{display:flex;align-items:center;gap:.4rem;border:2px solid #E9D5FF;border-radius:999px;background:#fff;padding:.2rem .9rem;font-size:17px;font-weight:700;color:#5B216E}
      .lab-step b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff;font-size:15px}
      .lab-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem}
      .lab-card{display:flex;flex-direction:column;align-items:center;gap:.25rem;border:2px solid var(--bd);background:var(--bg);border-radius:22px;padding:1rem .7rem;cursor:pointer;text-align:center;transition:transform .15s,box-shadow .15s}
      .lab-card:hover{transform:translateY(-3px);box-shadow:0 10px 22px rgba(139,92,246,.14)}
      .lab-card .big{font-size:56px;line-height:1.1}
      .lab-card h3{margin:.2rem 0 0;color:#5B216E;font-size:22px;font-weight:800;line-height:1.2}
      .lab-card p{margin:0;color:#667085;font-size:16px;font-weight:600}
      .lab-tone-teal{--bg:#ECFDF5;--bd:#99F6E4}.lab-tone-pink{--bg:#FFF1F7;--bd:#F9A8D4}.lab-tone-amber{--bg:#FFFBEB;--bd:#FDE68A}.lab-tone-purple{--bg:#F5F3FF;--bd:#D8B4FE}
      .lab-stars{color:#F59E0B;font-size:22px;letter-spacing:2px}.lab-stars .off{color:#E5E7EB}
      .lab-head{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap;margin-bottom:.6rem}
      .lab-head h2{margin:0;flex:1;min-width:220px;color:#5B216E;font-size:28px;font-weight:800}
      .lab-dots{display:flex;gap:6px}.lab-dots span{width:20px;height:20px;border-radius:50%;background:#EDE9FE}.lab-dots span.ok{background:#10B981}.lab-dots span.bad{background:#FBBF24}.lab-dots span.now{background:#fff;border:3px solid #EC4899}
      .lab-main{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(300px,1fr);gap:1rem;align-items:start}
      .lab-panel{border:2px solid #E9D5FF;border-radius:22px;background:#fff;padding:1rem;display:flex;flex-direction:column;gap:.7rem}
      .lab-item{display:flex;align-items:center;gap:.8rem}
      .lab-item .lab-ic{width:84px;height:84px;flex:0 0 84px;border-radius:18px;background:#F5F3FF}
      .lab-item strong{font-size:28px;color:#5B216E;font-weight:800;line-height:1.2}
      .lab-q{margin:0;font-size:21px;font-weight:700;color:#3B0764;line-height:1.4}
      .lab-choices{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:.6rem}
      .lab-choice{min-height:84px;border:3px solid #E9D5FF;border-radius:20px;background:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.1rem;font-size:19px;font-weight:800;color:#5B216E;transition:transform .12s,border-color .12s}
      .lab-choice .i{font-size:30px;line-height:1}
      .lab-choice:hover:not(:disabled){transform:translateY(-2px);border-color:#C4B5FD}
      .lab-choice.picked{border-color:#EC4899;background:#FFF1F7}
      .lab-choice.right{border-color:#10B981;background:#ECFDF5}
      .lab-choice:disabled{cursor:default}
      .lab-res{border-radius:18px;padding:.6rem .8rem;font-size:18px;font-weight:700;line-height:1.45}
      .lab-res.good{border:2px solid #6EE7B7;background:#ECFDF5;color:#047857}
      .lab-res.try{border:2px solid #FCD34D;background:#FFFBEB;color:#92400E}
      .lab-res .title{display:block;font-size:22px;font-weight:800;margin-bottom:.2rem}
      .lab-wait{font-size:19px;font-weight:700;color:#6D28D9}
      .lab-actions{display:flex;gap:.6rem;flex-wrap:wrap}
      .lab-btn{min-height:54px;border-radius:16px;border:2px solid #6EE7B7;background:linear-gradient(90deg,#ECFDF5,#E0F2FE);color:#047857;padding:0 1.1rem;font-size:19px;font-weight:700;cursor:pointer}
      .lab-btn.primary{border:0;background:linear-gradient(90deg,#EC4899,#8B5CF6);color:#fff;box-shadow:0 6px 16px rgba(139,92,246,.22)}
      .lab-btn:focus-visible,.lab-choice:focus-visible,.lab-card:focus-visible,.lab-say:focus-visible{outline:3px solid #F472B6;outline-offset:2px}
      .lab-voice{margin:0;padding:.4rem .7rem;border-radius:12px;background:#FFF7ED;color:#C2410C;font-size:16px;font-weight:600}
      .lab-note{margin-top:1rem;border:2px dashed #C4B5FD;border-radius:22px;background:#FFFDF7;padding:.8rem}
      .lab-note h3{margin:0 0 .5rem;color:#5B216E;font-size:20px;font-weight:800}
      .lab-cols{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:.6rem}
      .lab-col{border-radius:16px;background:#fff;border:2px solid #EDE9FE;padding:.4rem;min-height:92px}
      .lab-col h4{margin:0 0 .3rem;font-size:17px;font-weight:800;color:#6D28D9;text-align:center}
      .lab-col .row{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center}
      .lab-col .lab-ic{width:52px;height:52px;border-radius:12px;background:#F5F3FF}
      .lab-col .lab-ic.miss{outline:3px solid #FBBF24}
      /* ---------- Sân khấu thí nghiệm ---------- */
      .lab-stage{position:relative;height:340px;border-radius:24px;overflow:hidden;border:2px solid #E9D5FF;background:linear-gradient(180deg,#F5F3FF,#FFFFFF 60%)}
      .lab-stage .lab-ic{position:absolute;width:76px;height:76px}
      .lab-stage .tag{position:absolute;left:50%;top:10px;transform:translateX(-50%);background:#fff;border:2px solid #E9D5FF;border-radius:999px;padding:.1rem .9rem;font-size:17px;font-weight:800;color:#5B216E;white-space:nowrap;z-index:5}
      .lab-stage .bench{position:absolute;left:0;right:0;bottom:0;height:9%;background:#D6B98C;border-top:4px solid #B08B57}
      .tank{position:absolute;left:18%;width:64%;top:24%;bottom:9%;border:4px solid #7DD3FC;border-top:0;border-radius:0 0 18px 18px;background:rgba(224,242,254,.35)}
      .tank .water{position:absolute;left:0;right:0;top:26%;bottom:0;background:linear-gradient(180deg,#7DD3FC,#38BDF8);opacity:.75;border-radius:0 0 14px 14px}
      .ripple{position:absolute;left:50%;width:30px;height:10px;border:3px solid #fff;border-radius:50%;transform:translateX(-50%);opacity:0}
      .ripple.on{animation:labRipple .9s ease-out}
      @keyframes labRipple{0%{opacity:1;width:20px}100%{opacity:0;width:200px;height:30px}}
      .mover{transition:top 1.1s cubic-bezier(.4,.1,.3,1),left .9s ease,opacity .6s ease,transform .6s ease}
      .bob{animation:labBob 1.6s ease-in-out infinite}
      @keyframes labBob{50%{transform:translate(-50%,6px) rotate(3deg)}}
      .shake{animation:labShake .5s}
      @keyframes labShake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
      .glass{position:absolute;left:34%;width:32%;top:30%;bottom:9%;border:4px solid #94A3B8;border-top:0;border-radius:0 0 22px 22px;background:rgba(241,245,249,.5);overflow:hidden}
      .glass .water{position:absolute;left:0;right:0;top:16%;bottom:0;background:#BAE6FD;opacity:.75;transition:background 1.4s ease}
      .glass .oil{position:absolute;left:0;right:0;top:16%;height:0;background:#FDE047;opacity:.9;transition:height 1.2s ease}
      .grain{position:absolute;width:9px;height:9px;border-radius:50%;transition:top 1.3s ease,opacity 1.4s ease}
      .spoon{position:absolute;left:58%;top:22%;width:10px;height:56%;background:#9CA3AF;border-radius:6px;transform-origin:50% 0;opacity:0;transition:opacity .3s}
      .spoon.stir{opacity:1;animation:labStir .45s ease-in-out 4 alternate}
      @keyframes labStir{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}
      .torch{position:absolute;left:3%;top:42%;font-size:56px;line-height:1;transform:scaleX(-1)}
      .beam{position:absolute;height:30%;top:37%;background:linear-gradient(90deg,rgba(253,224,71,.85),rgba(254,240,138,.55));clip-path:polygon(0 35%,100% 0,100% 100%,0 65%);opacity:0;transition:opacity .6s ease}
      .wall{position:absolute;right:3%;width:9%;top:14%;bottom:9%;background:#E5E7EB;border-radius:10px;border:3px solid #CBD5E1}
      .wall .spot{position:absolute;left:12%;right:12%;top:30%;height:38%;border-radius:50%;background:#FDE047;opacity:0;transition:opacity .6s ease}
      .wall .shadow{position:absolute;left:12%;right:12%;top:30%;height:38%;border-radius:12px;background:#374151;opacity:0;transition:opacity .6s ease}
      .magnet{position:absolute;top:44%;font-size:0}
      .table-line{position:absolute;left:6%;right:6%;top:72%;height:6px;border-radius:4px;background:#C4B5FD}
      .spark{position:absolute;font-size:28px;opacity:0;transition:opacity .3s}
      .lab-finish{border:2px solid #FBCFE8;border-radius:24px;background:linear-gradient(135deg,#FFF1F7,#F5F3FF);padding:1.1rem;text-align:center}
      .lab-finish .big{font-size:58px;line-height:1.1}
      .lab-finish h2{margin:.2rem 0;color:#BE185D;font-size:30px;font-weight:800}
      .lab-finish .bigstars{font-size:46px;color:#F59E0B;letter-spacing:6px}.lab-finish .bigstars .off{color:#E5E7EB}
      .lab-remember{margin:.8rem auto;max-width:760px;border:2px solid #7DD3FC;background:#F0F9FF;border-radius:18px;padding:.6rem .9rem;color:#0369A1;font-size:19px;font-weight:700;line-height:1.45;text-align:left}
      @media(max-width:1000px){.lab-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lab-main{grid-template-columns:1fr}}
      @media(max-width:600px){.lab-stage{height:280px}.lab-stage .lab-ic{width:60px;height:60px}.lab-choice{min-height:72px;font-size:17px}.lab-item strong{font-size:22px}.lab-cols{grid-template-columns:1fr}}
      @media(prefers-reduced-motion:reduce){.mover,.grain,.beam,.glass .water,.glass .oil{transition:none!important}.bob,.spoon.stir,.ripple.on,.shake{animation:none!important}}
    `;
    document.head.appendChild(style);
  }

  /* ---------- Trang chọn thí nghiệm ---------- */
  let language = "vi";
  const isEn = () => language === "en";
  const tr = (vi, en) => isEn() ? en : vi;
  function languageBar() {
    return `<div class="lab-toolbar"><div class="lab-langs" role="group" aria-label="Language"><button type="button" data-lab-lang="vi" class="${isEn() ? "" : "on"}" aria-pressed="${!isEn()}">Tiếng Việt</button><button type="button" data-lab-lang="en" class="${isEn() ? "on" : ""}" aria-pressed="${isEn()}">English</button></div><button type="button" data-lab-exit class="lab-exit">← Games</button></div>`;
  }
  function bindLanguageBar() {
    const h = host(); if (!h) return;
    h.querySelectorAll("[data-lab-lang]").forEach((b) => b.addEventListener("click", () => {
      const next = b.dataset.labLang;
      if (next === language || !["vi", "en"].includes(next)) return;
      clearTimers(); stopSpeak();
      language = next;
      if (phase === "test") { phase = "predict"; guess = ""; }
      if (!exp) renderHome();
      else if (host().querySelector(".lab-finish")) renderFinish(false);
      else renderExp(false);
    }));
    h.querySelector("[data-lab-exit]")?.addEventListener("click", () => { clearTimers(); stopSpeak(); activeContext?.back?.(); });
  }

  const HOME_TIP = "Nhà khoa học luôn đoán trước, rồi làm thử, rồi giải thích. Đoán sai cũng không sao, mình học được điều mới!";
  const EN_EXPERIMENTS = Object.freeze({"float":{"title":"Sink or float?","desc":"Drop objects into a water tank","intro":"Bunny has a big tank of water. We will drop an object in. Can you guess if it will sink or float?","remember":"Things that are less dense than water, or contain enough trapped air, often float. Denser objects usually sink.","ask":"Do you think {name} will sink or float?","choices":{"sink":"Sink","float":"Float"},"items":{"da":["a rock","The rock sinks to the bottom because it is denser than water."],"la":["a leaf","This thin, light leaf stays on top of the water."],"tao":["an apple","An apple floats because it has many tiny air spaces inside."],"chia_khoa":["a key","This metal key is denser than water, so it sinks."],"but_chi":["a pencil","A wooden pencil floats because this wood is less dense than water."],"trung":["an egg","This egg sinks in plain water. It may float if enough salt is mixed into the water!"],"bong":["a plastic ball","The ball has air inside, so it floats back up when pushed down."],"thia":["a metal spoon","The metal spoon is denser than water, so it sinks."]}},"magnet":{"title":"What sticks to a magnet?","desc":"Bring a magnet close to different objects","intro":"Here is a magnet. It attracts some things but not everything. Make a guess, then let us test it!","remember":"Magnets attract iron and many types of steel. They do not attract wood, paper, rubber, plastic, or aluminum.","ask":"Will the magnet attract {name}?","choices":{"yes":"Attracts","no":"Does not attract"},"items":{"kep_giay":["a paper clip","This paper clip contains iron, so the magnet attracts it."],"but_chi":["a pencil","The wooden pencil does not stick to the magnet."],"dinh":["an iron nail","The iron nail is strongly attracted to the magnet."],"cuc_tay":["an eraser","Rubber is not attracted to a magnet."],"lon_nhom":["an aluminum can","Surprise! This can is metal, but aluminum is not attracted to an ordinary magnet."],"oc_vit":["an iron screw","This iron screw sticks to the magnet."],"giay":["a sheet of paper","Paper is not attracted to a magnet."],"nap_chai":["a steel bottle cap","This steel cap contains iron, so the magnet attracts it."]}},"dissolve":{"title":"Does it dissolve?","desc":"Stir different things into water","intro":"Bunny has a glass of clear water. Let us add something and stir it. Will it dissolve? Make a guess first!","remember":"Salt and sugar dissolve in water. Sand, pebbles, and rice do not. Oil does not dissolve and forms a layer on top.","ask":"Will {name} dissolve in water?","choices":{"yes":"Dissolves","no":"Does not dissolve"},"items":{"muoi":["salt","The salt dissolves and becomes invisible, but it is still in the water. Never taste lab materials without an adult saying it is safe!"],"cat":["sand","Sand does not dissolve. After stirring, it settles at the bottom."],"duong":["sugar","Sugar dissolves in water. It usually dissolves faster in warmer water."],"soi":["pebbles","Pebbles do not dissolve. They stay at the bottom of the glass."],"ca_phe":["instant coffee","Instant coffee dissolves and turns the water brown."],"dau_an":["cooking oil","Oil does not dissolve in water. It is less dense, so it forms a layer on top."],"gao":["rice","Rice does not dissolve. The grains sink to the bottom."]}},"light":{"title":"Can light pass through?","desc":"Shine a flashlight through objects","intro":"Bunny is shining a flashlight at a wall. Let us put objects in its path. Can light pass through them?","remember":"Transparent materials let most light pass through. Translucent materials let some light through. Opaque materials block light and cast shadows.","ask":"Can light pass through {name}?","choices":{"all":"Most light","some":"Some light","none":"No light"},"items":{"kinh":["a glass pane","Clear glass lets almost all light pass through. That is why windows let sunlight inside."],"bia":["cardboard","Cardboard blocks light and makes a shadow on the wall."],"giay_nen":["wax paper","Wax paper lets some light through, but objects behind it look blurry. It is translucent."],"nilon":["a clear plastic bag","Clear plastic lets most light pass through."],"go":["a wooden board","Wood blocks the light, leaving a shadow behind it."],"vai":["thin fabric","Thin fabric lets some light pass through, like a light curtain in the morning."]}}});
  const viewExp = (e) => isEn() ? { ...e, ...EN_EXPERIMENTS[e.id] } : e;
  const viewItem = (it) => isEn() ? { ...it, name: EN_EXPERIMENTS[exp.id].items[it.id]?.[0] || it.name, why: EN_EXPERIMENTS[exp.id].items[it.id]?.[1] || it.why } : it;
  const viewChoice = (choice) => isEn() ? { ...choice, label: EN_EXPERIMENTS[exp.id].choices[choice.id] || choice.label } : choice;
  const ask = (it) => isEn() ? EN_EXPERIMENTS[exp.id].ask.replace("{name}", viewItem(it).name) : exp.ask(it.name);
  const homeTip = () => tr(HOME_TIP, "Scientists make predictions, try experiments, and explain what happened. A wrong guess helps us learn something new!");

  function renderHome() {
    clearTimers(); stopSpeak();
    exp = null;
    setBanner(false);
    const h = host(); if (!h) return;
    h.innerHTML = `
      <div class="lab-page">
        <div class="section-heading lab-topline"><div><h1>🔬 ${tr(GAME_TITLE, "Tiny Science Lab")}</h1><p>${EXPERIMENTS.length} ${tr("thí nghiệm", "experiments")}</p></div>${languageBar()}</div>
        <div class="lab-bubble"><span class="ico" aria-hidden="true">🐰</span><span class="txt">${esc(homeTip())}</span><button class="lab-say" id="lab-say-home" type="button" aria-label="${tr("Nghe cô đọc", "Listen to Bunny")}">🔊</button></div>
        <div class="lab-steps"><span class="lab-step"><b>1</b>🤔 ${tr("Đoán", "Predict")}</span><span class="lab-step"><b>2</b>🧪 ${tr("Làm thử", "Test")}</span><span class="lab-step"><b>3</b>📒 ${tr("Ghi vào sổ", "Record")}</span></div>
        <p id="lab-voice" class="lab-voice" hidden></p>
        <div class="lab-grid">${EXPERIMENTS.map((e, i) => `
          <button class="lab-card lab-tone-${e.tone}" type="button" data-exp="${i}">
            <span class="big" aria-hidden="true">${e.emoji}</span>
            <h3>${i + 1}. ${esc(viewExp(e).title)}</h3><p>${esc(viewExp(e).desc)}</p>${starRow(stars[e.id] || 0)}
          </button>`).join("")}</div>
      </div>`;
    bindLanguageBar();
    h.querySelector("#lab-say-home")?.addEventListener("click", () => speak(homeTip(), false, true));
    h.querySelectorAll("[data-exp]").forEach((b) => b.addEventListener("click", () => startExp(EXPERIMENTS[Number(b.dataset.exp)])));
  }

  function startExp(e) {
    clearTimers(); stopSpeak();
    exp = e; order = shuffle(e.items); step = 0; phase = "predict"; guess = ""; results = [];
    renderExp(true);
  }

  const item = () => order[step];
  const choiceOf = (id) => exp.choices.find((c) => c.id === id) || exp.choices[0];

  /* ---------- Sân khấu từng loại thí nghiệm ---------- */
  function stageHtml(it) {
    const ic = (cls, style) => `<div class="mover ${cls}" id="lab-obj" style="${style}">${iconSvg(it.id)}</div>`;
    if (exp.id === "float") {
      return `<div class="tank"><div class="water"></div></div><div class="ripple" id="lab-ripple" style="top:calc(24% + (91% - 24%) * .26 - 5px)"></div>
        <div class="mover" id="lab-obj" style="position:absolute;left:50%;top:13%;transform:translateX(-50%);width:76px;height:76px">${iconSvg(it.id).replace('class="lab-ic ', 'style="position:static;width:76px;height:76px" class="lab-ic ')}</div><div class="bench"></div>`;
    }
    if (exp.id === "magnet") {
      return `<div class="table-line"></div>
        <div class="mover" id="lab-mag" style="position:absolute;left:-22%;top:40%;width:92px;height:92px;transform:rotate(90deg)">${iconSvg("nam_cham").replace('class="lab-ic ', 'style="position:static;width:92px;height:92px" class="lab-ic ')}</div>
        <div class="mover" id="lab-obj" style="position:absolute;left:66%;top:46%;width:76px;height:76px">${iconSvg(it.id).replace('class="lab-ic ', 'style="position:static;width:76px;height:76px" class="lab-ic ')}</div>
        <span class="spark" id="lab-spark" style="left:47%;top:34%">✨</span><div class="bench"></div>`;
    }
    if (exp.id === "dissolve") {
      return `<div class="glass" id="lab-glass"><div class="water" id="lab-water"></div><div class="oil" id="lab-oil"></div><div id="lab-grains"></div></div>
        <div class="spoon" id="lab-spoon"></div>
        <div class="mover" id="lab-obj" style="position:absolute;left:50%;top:12%;transform:translateX(-50%);width:76px;height:76px">${iconSvg(it.id).replace('class="lab-ic ', 'style="position:static;width:76px;height:76px" class="lab-ic ')}</div><div class="bench"></div>`;
    }
    return `<div class="torch" aria-hidden="true">🔦</div>
      <div class="beam" id="lab-beam1" style="left:13%;width:31%"></div><div class="beam" id="lab-beam2" style="left:58%;width:30%"></div>
      <div class="wall"><div class="spot" id="lab-spot"></div><div class="shadow" id="lab-shadow"></div></div>
      <div class="mover" id="lab-obj" style="position:absolute;left:43%;top:-30%;width:15%;height:52%">${iconSvg(it.id).replace('class="lab-ic ', 'preserveAspectRatio="none" style="position:static;width:100%;height:100%" class="lab-ic ')}</div><div class="bench"></div>`;
  }

  /* Chạy thí nghiệm, gọi done() khi xong */
  function runTest(it, done) {
    const h = host(); if (!h) return;
    const $ = (id) => h.querySelector(id);
    const obj = $("#lab-obj");
    if (exp.id === "float") {
      obj.style.top = "26%";
      later(() => { $("#lab-ripple")?.classList.add("on"); }, 500);
      later(() => {
        if (it.answer === "float") { obj.style.top = "calc(24% + 67% * .26 - 46px)"; later(() => obj.classList.add("bob"), 1100); }
        else obj.style.top = "calc(91% - 80px)";
      }, 650);
      later(done, 2000);
      return;
    }
    if (exp.id === "magnet") {
      const mag = $("#lab-mag");
      mag.style.left = "24%";
      later(() => {
        if (it.answer === "yes") { obj.style.left = "calc(24% + 84px)"; later(() => { const s = $("#lab-spark"); if (s) s.style.opacity = "1"; }, 700); }
        else { obj.classList.add("shake"); }
      }, 950);
      later(done, 2200);
      return;
    }
    if (exp.id === "dissolve") {
      obj.style.top = "26%"; obj.style.opacity = "0";
      const colors = { muoi: "#fff", duong: "#fff", cat: "#D6A867", soi: "#9CA3AF", ca_phe: "#7C4A21", dau_an: "#FDE047", gao: "#FFFBEB" };
      const g = $("#lab-grains");
      later(() => {
        if (it.fx === "oil") { $("#lab-oil").style.height = "14%"; return; }
        g.innerHTML = Array.from({ length: 14 }, (_, k) => `<span class="grain" style="left:${10 + ((k * 37) % 80)}%;top:${22 + ((k * 23) % 40)}%;background:${colors[it.id] || "#fff"};border:1px solid rgba(0,0,0,.25)"></span>`).join("");
      }, 500);
      later(() => $("#lab-spoon")?.classList.add("stir"), 700);
      later(() => {
        const grains = g.querySelectorAll(".grain");
        if (it.fx === "settle") grains.forEach((el, k) => { el.style.top = `${86 + (k % 3) * 3}%`; });
        if (it.fx === "clear" || it.fx === "brown") grains.forEach((el) => { el.style.opacity = "0"; });
        if (it.fx === "brown") $("#lab-water").style.background = "#B45309";
      }, 2400);
      later(done, 3600);
      return;
    }
    obj.style.top = "26%";
    later(() => { $("#lab-beam1").style.opacity = "1"; }, 800);
    later(() => {
      const b2 = $("#lab-beam2"), spot = $("#lab-spot"), shadow = $("#lab-shadow");
      if (it.answer === "all") { b2.style.opacity = "1"; spot.style.opacity = "1"; }
      else if (it.answer === "some") { b2.style.opacity = ".35"; spot.style.opacity = ".4"; }
      else { shadow.style.opacity = ".85"; }
    }, 1400);
    later(done, 2300);
  }

  /* ---------- Màn thí nghiệm ---------- */
  function notebookHtml() {
    return `<section class="lab-note"><h3>📒 ${tr("Sổ thí nghiệm của bé", "My science notebook")}</h3>
      <div class="lab-cols" style="--n:${exp.choices.length}">${exp.choices.map((c) => `<div class="lab-col"><h4>${c.icon} ${esc(viewChoice(c).label)}</h4><div class="row">${results.filter((r) => r.item.answer === c.id).map((r) => `<span title="${esc(viewItem(r.item).name)}">${iconSvg(r.item.id, r.ok ? "" : "miss")}</span>`).join("")}</div></div>`).join("")}</div></section>`;
  }

  function renderExp(readIntro) {
    stopSpeak();
    const h = host(); if (!h || !exp) return;
    setBanner(true);
    const it = item();
    const dots = order.map((_, k) => `<span class="${k < results.length ? (results[k].ok ? "ok" : "bad") : k === step ? "now" : ""}"></span>`).join("");
    let panel = "";
    if (phase === "predict") {
      panel = `<div class="lab-item">${iconSvg(it.id)}<strong>${esc(cap(viewItem(it).name))}</strong></div>
        <p class="lab-q">🤔 ${esc(ask(it))}</p>
        <div class="lab-choices" style="--n:${exp.choices.length}">${exp.choices.map((c) => `<button type="button" class="lab-choice" data-choice="${c.id}"><span class="i" aria-hidden="true">${c.icon}</span>${esc(viewChoice(c).label)}</button>`).join("")}</div>`;
    } else if (phase === "test") {
      panel = `<div class="lab-item">${iconSvg(it.id)}<strong>${esc(cap(viewItem(it).name))}</strong></div>
        <p class="lab-q">${tr("Bé đoán:", "Your guess:")} <b>${choiceOf(guess).icon} ${esc(viewChoice(choiceOf(guess)).label)}</b></p>
        <p class="lab-wait">🧪 ${tr("Cô Thỏ đang làm thử… bé nhìn kỹ nhé!", "Bunny is testing it. Watch closely!")}</p>`;
    } else {
      const ok = guess === it.answer;
      const res = choiceOf(it.answer);
      panel = `<div class="lab-item">${iconSvg(it.id)}<strong>${esc(cap(viewItem(it).name))}</strong></div>
        <div class="lab-res ${ok ? "good" : "try"}"><span class="title">${res.icon} ${esc(viewChoice(res).label)}!</span>${ok ? tr("🎉 Bé đoán đúng rồi!", "🎉 Great guess!") : tr("🤔 Chưa đúng rồi. Nhà khoa học cũng hay đoán sai, rồi thử để biết đấy!", "🤔 Not quite. Scientists learn by testing their guesses!")}<br>${esc(viewItem(it).why)}</div>
        <div class="lab-actions"><button id="lab-again-say" class="lab-btn" type="button">🔊 ${tr("Nghe lại", "Listen again")}</button><button id="lab-next" class="lab-btn primary" type="button">${step < order.length - 1 ? tr("Đồ vật tiếp theo →", "Next object →") : tr("Xem sổ thí nghiệm 📒", "View notebook 📒")}</button></div>`;
    }
    h.innerHTML = `
      <div class="lab-page">
        <div class="lab-head"><h2>${exp.emoji} ${esc(viewExp(exp).title)}</h2><div class="lab-dots" aria-label="${tr("Đồ vật", "Object")} ${step + 1} ${tr("trên", "of")} ${order.length}">${dots}</div>
          <button id="lab-mute" class="lab-say${muted ? " mute" : ""}" type="button" aria-label="${muted ? tr("Bật", "Enable") : tr("Tắt", "Disable")} ${tr("giọng đọc tự động", "automatic voice")}">${muted ? "🔇" : "🔈"}</button>
          <button id="lab-home" class="back-btn" type="button">← ${EXPERIMENTS.length} ${tr("thí nghiệm", "experiments")}</button>${languageBar()}</div>
        ${readIntro ? `<div class="lab-bubble"><span class="ico" aria-hidden="true">🐰</span><span class="txt">${esc(viewExp(exp).intro)}</span><button class="lab-say" id="lab-say-intro" type="button" aria-label="${tr("Nghe cô đọc", "Listen to Bunny")}">🔊</button></div>` : ""}
        <p id="lab-voice" class="lab-voice" hidden></p>
        <div class="lab-main">
          <div class="lab-stage" id="lab-stage"><span class="tag">${esc(cap(viewItem(it).name))}</span>${stageHtml(it)}</div>
          <div class="lab-panel" aria-live="polite">${panel}</div>
        </div>
        ${results.length ? notebookHtml() : ""}
      </div>`;
    bindLanguageBar();
    h.querySelector("#lab-home")?.addEventListener("click", renderHome);
    h.querySelector("#lab-say-intro")?.addEventListener("click", () => speak(viewExp(exp).intro, false, true));
    h.querySelector("#lab-mute")?.addEventListener("click", (ev) => {
      muted = !muted; if (muted) stopSpeak();
      ev.currentTarget.textContent = muted ? "🔇" : "🔈"; ev.currentTarget.classList.toggle("mute", muted);
    });
    h.querySelectorAll("[data-choice]").forEach((b) => b.addEventListener("click", () => {
      if (phase !== "predict") return;
      guess = b.dataset.choice; phase = "test"; stopSpeak();
      renderExp(false);
      runTest(it, () => {
        phase = "result";
        results.push({ item: it, ok: guess === it.answer });
        renderResultKeepStage(it);
      });
    }));
    if (phase === "result") bindResultActions(it);
    if (phase === "predict") speak(readIntro ? `${viewExp(exp).intro} ${ask(it)}` : ask(it));
  }

  /* Hiện kết quả nhưng giữ nguyên sân khấu đang ở trạng thái cuối của thí nghiệm */
  function renderResultKeepStage(it) {
    const h = host(); if (!h) return;
    const stage = h.querySelector("#lab-stage");
    const keep = stage ? stage.innerHTML : "";
    renderExp(false);
    const st = h.querySelector("#lab-stage");
    if (st && keep) st.innerHTML = keep;
    const ok = guess === it.answer;
    speak(`${ok ? tr("Bé đoán đúng rồi!", "Great guess!") : tr("Chưa đúng rồi.", "Not quite.")} ${cap(viewItem(it).name)}: ${viewChoice(choiceOf(it.answer)).label}. ${viewItem(it).why}`);
  }
  function bindResultActions(it) {
    const h = host(); if (!h) return;
    h.querySelector("#lab-again-say")?.addEventListener("click", () => speak(viewItem(it).why, false, true));
    h.querySelector("#lab-next")?.addEventListener("click", () => {
      clearTimers(); stopSpeak();
      if (step < order.length - 1) { step += 1; phase = "predict"; guess = ""; renderExp(false); }
      else renderFinish();
    });
  }

  function renderFinish(announce = true) {
    clearTimers(); stopSpeak();
    const h = host(); if (!h || !exp) return;
    setBanner(true);
    const right = results.filter((r) => r.ok).length;
    const n = right === results.length ? 3 : right / results.length >= 0.6 ? 2 : 1;
    saveStars(exp.id, n);
    const idx = EXPERIMENTS.indexOf(exp);
    const next = EXPERIMENTS[idx + 1];
    h.innerHTML = `
      <div class="lab-page">
        <section class="lab-finish">${languageBar()}<div class="big" aria-hidden="true">🔬🐰✨</div>
          <h2>${tr("Bé đoán đúng", "You guessed correctly")} ${right}/${results.length} ${tr("lần!", "times!")}</h2>
          <div class="bigstars" aria-label="${n} sao">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</div>
          <div class="lab-remember">🐰 <b>${tr("Bé nhớ nhé:", "Remember:")}</b> ${esc(viewExp(exp).remember)}</div>
          <div class="lab-actions" style="justify-content:center">
            ${next ? `<button id="lab-next-exp" class="lab-btn primary" type="button">▶ ${tr("Thí nghiệm tiếp:", "Next experiment:")} ${esc(viewExp(next).title)}</button>` : ""}
            <button id="lab-replay" class="lab-btn" type="button">🔄 ${tr("Làm lại", "Try again")}</button>
            <button id="lab-list" class="lab-btn" type="button">🔬 ${tr("Chọn thí nghiệm khác", "Choose experiment")}</button>
          </div>
        </section>
        ${notebookHtml()}
        <p id="lab-voice" class="lab-voice" hidden></p>
      </div>`;
    bindLanguageBar();
    if (announce) speak(tr(`Bé đoán đúng ${right} trên ${results.length} lần. Bé nhớ nhé: ${exp.remember}`, `You guessed correctly ${right} out of ${results.length} times. Remember: ${viewExp(exp).remember}`));
    h.querySelector("#lab-next-exp")?.addEventListener("click", () => startExp(next));
    h.querySelector("#lab-replay")?.addEventListener("click", () => startExp(exp));
    h.querySelector("#lab-list")?.addEventListener("click", renderHome);
  }

  function render(context) {
    activeContext = context || null;
    language = "vi";
    ensureStyles();
    renderHome();
  }
  function destroy() {
    clearTimers(); stopSpeak();
    activeContext = null; exp = null;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
