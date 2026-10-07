(() => {
  "use strict";

  /* =====================================================================
     11. Kỹ sư nhí
     Bé chọn bộ phận để lắp (thiết kế) → chạy thử → nếu chưa được thì sửa lại.
     Giao diện module: window.CLASS1_GAME_MODULES.littleEngineer = { render(context), destroy() }
     ===================================================================== */

  const MODULE_KEY = "littleEngineer";
  const GAME_NUMBER = 11;
  const GAME_TITLE = "Kỹ sư nhí";
  const STYLE_ID = "class1-games-little-engineer-style-v1";
  const STARS_KEY = "class1-little-engineer-stars";

  /* ---------- Hình các bộ phận (khung 100 x 100) ---------- */
  const INK = "#3B2314";
  const OPT = {
    pin: `<rect x="22" y="30" width="52" height="40" rx="6" fill="#22C55E"/><rect x="22" y="30" width="18" height="40" rx="6" fill="#1F2937"/><rect x="74" y="42" width="8" height="16" rx="2" fill="#9CA3AF"/><path d="M52 42 v16 M44 50 h16" stroke="#fff" stroke-width="4"/>`,
    tay: `<g transform="rotate(-15 50 50)"><rect x="16" y="34" width="68" height="32" rx="6" fill="#F9A8D4"/><rect x="56" y="34" width="28" height="32" rx="6" fill="#93C5FD"/></g>`,
    da: `<path d="M18 70 Q12 50 28 38 Q40 22 60 28 Q82 30 86 52 Q90 72 70 80 Q44 88 18 70Z" fill="#9CA3AF"/>`,
    day_dong: `<path d="M10 70 C30 20 50 90 70 40 S90 30 92 30" fill="none" stroke="#B45309" stroke-width="9"/><path d="M10 70 C30 20 50 90 70 40 S90 30 92 30" fill="none" stroke="#F59E0B" stroke-width="4"/>`,
    len: `<path d="M10 70 C30 20 50 90 70 40 S90 30 92 30" fill="none" stroke="#EC4899" stroke-width="8" stroke-dasharray="2 5"/><circle cx="20" cy="66" r="12" fill="#F9A8D4"/><path d="M12 62 q8 -6 16 0 M12 70 q8 -6 16 0" fill="none" stroke="#EC4899" stroke-width="2"/>`,
    ong_hut: `<g transform="rotate(-35 50 50)"><rect x="8" y="42" width="84" height="16" rx="8" fill="#fff"/>${[16, 32, 48, 64, 80].map((x) => `<path d="M${x} 42 l8 16" stroke="#EF4444" stroke-width="5"/>`).join("")}<rect x="8" y="42" width="84" height="16" rx="8" fill="none"/></g>`,
    banh_tron: `<circle cx="50" cy="50" r="32" fill="#1F2937"/><circle cx="50" cy="50" r="13" fill="#CBD5E1"/><circle cx="50" cy="50" r="4" fill="${INK}"/>`,
    banh_vuong: `<rect x="20" y="20" width="60" height="60" rx="4" fill="#1F2937"/><rect x="38" y="38" width="24" height="24" fill="#CBD5E1"/>`,
    banh_tg: `<path d="M50 14 L88 82 H12Z" fill="#1F2937"/><circle cx="50" cy="58" r="11" fill="#CBD5E1"/>`,
    gan_duoi: `<rect x="14" y="30" width="72" height="28" rx="8" fill="#60A5FA"/><circle cx="32" cy="66" r="12" fill="#1F2937"/><circle cx="68" cy="66" r="12" fill="#1F2937"/><path d="M50 86 V76 M44 82 L50 88 L56 82" fill="none" stroke="#10B981" stroke-width="4"/>`,
    gan_tren: `<rect x="14" y="48" width="72" height="28" rx="8" fill="#60A5FA"/><circle cx="32" cy="38" r="12" fill="#1F2937"/><circle cx="68" cy="38" r="12" fill="#1F2937"/><path d="M50 14 V24 M44 18 L50 12 L56 18" fill="none" stroke="#EF4444" stroke-width="4"/>`,
    giay: `<path d="M14 36 Q50 26 86 36 V64 Q50 54 14 64Z" fill="#fff"/><path d="M24 44 H76 M24 52 H70" stroke="#93C5FD" stroke-width="3"/>`,
    go: `<rect x="10" y="38" width="80" height="24" rx="4" fill="#B45309"/><path d="M18 46 Q34 42 50 48 T84 46 M20 56 Q40 52 60 56" fill="none" stroke="#7C2D12" stroke-width="2.5"/>`,
    day_len: `<path d="M10 50 Q50 64 90 50" fill="none" stroke="#EC4899" stroke-width="6" stroke-dasharray="2 4"/><circle cx="10" cy="50" r="5" fill="#EC4899"/><circle cx="90" cy="50" r="5" fill="#EC4899"/>`,
    co_tru: `<rect x="8" y="30" width="84" height="14" rx="3" fill="#B45309"/><rect x="42" y="44" width="16" height="44" fill="#9CA3AF"/><path d="M34 88 H66" stroke-width="5"/>`,
    khong_tru: `<rect x="8" y="30" width="84" height="14" rx="3" fill="#B45309"/><path d="M40 60 L60 80 M60 60 L40 80" stroke="#EF4444" stroke-width="6"/>`,
    vai_bong: `<path d="M16 22 Q34 16 50 22 T84 22 V80 Q66 86 50 80 T16 80Z" fill="#FDE68A"/><path d="M26 34 h48 M26 46 h48 M26 58 h48 M26 70 h48" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3 3"/>`,
    nilon: `<path d="M18 20 H82 L84 84 H16Z" fill="#E0F2FE" fill-opacity=".8"/><path d="M30 34 Q40 54 32 74 M66 30 Q60 50 70 72" fill="none" stroke="#fff" stroke-width="5"/>`,
    giay_bao: `<rect x="16" y="16" width="68" height="70" fill="#F1F5F9"/><rect x="24" y="24" width="24" height="18" fill="#94A3B8"/><path d="M54 26 H76 M54 34 H76 M24 50 H76 M24 58 H76 M24 66 H76 M24 74 H62" stroke="#64748B" stroke-width="3"/>`,
    len_ao: `<path d="M16 22 Q34 16 50 22 T84 22 V80 Q66 86 50 80 T16 80Z" fill="#C4B5FD"/><path d="M24 30 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 M24 50 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 M24 70 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0" fill="none" stroke="#7C3AED" stroke-width="2.5"/>`,
    co_mu: `<path d="M30 56 Q30 22 50 22 Q70 22 70 56 Z" fill="#38BDF8"/><circle cx="50" cy="58" r="16" fill="#C08457"/><path d="M26 56 Q50 66 74 56 L80 90 H20Z" fill="#38BDF8"/>`,
    khong_mu: `<circle cx="50" cy="42" r="16" fill="#C08457"/><circle cx="38" cy="28" r="6" fill="#C08457"/><circle cx="62" cy="28" r="6" fill="#C08457"/><path d="M26 58 Q50 66 74 58 L80 90 H20Z" fill="#38BDF8"/>`
  };
  function optSvg(id, cls = "") {
    return `<svg class="eng-ic ${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${OPT[id] || ""}</g></svg>`;
  }


  /* ---------- Bốn thử thách ---------- */
  const CHALLENGES = [
    {
      id: "circuit", emoji: "💡", tone: "amber", title: "Thắp sáng bóng đèn", desc: "Lắp mạch điện cho đèn sáng",
      intro: "Bóng đèn đang tắt. Bé hãy chọn bộ phận để lắp thành mạch điện, rồi bật công tắc xem đèn có sáng không nhé!",
      steps: [
        { key: "nguon", ask: "Chọn thứ tạo ra điện cho bóng đèn:", options: [
          { id: "pin", label: "Cục pin", ok: true, why: "Pin chứa năng lượng điện, đúng là thứ mình cần." },
          { id: "tay", label: "Cục tẩy", ok: false, why: "Cục tẩy không tạo ra điện, nên bóng đèn chưa sáng." },
          { id: "da", label: "Hòn đá", ok: false, why: "Hòn đá không tạo ra điện, nên bóng đèn chưa sáng." }] },
        { key: "day", ask: "Chọn dây để nối các bộ phận:", options: [
          { id: "len", label: "Sợi len", ok: false, why: "Sợi len không cho dòng điện đi qua, nên điện không tới được bóng đèn." },
          { id: "day_dong", label: "Dây đồng", ok: true, why: "Dây đồng là kim loại, cho dòng điện chạy qua dễ dàng." },
          { id: "ong_hut", label: "Ống hút nhựa", ok: false, why: "Ống hút làm bằng nhựa, mà nhựa không cho dòng điện đi qua." }] }
      ],
      testLabel: "🔌 Bật công tắc",
      success: "Đèn sáng rồi! Dòng điện chạy từ pin, qua dây đồng, tới bóng đèn rồi quay về pin thành một vòng khép kín.",
      remember: "Muốn đèn sáng cần có nguồn điện là pin, dây dẫn bằng kim loại, và các bộ phận nối với nhau thành một vòng kín. ⚠️ Pin nhỏ dùng để học thì an toàn, còn điện ở ổ cắm trong nhà rất nguy hiểm, bé không bao giờ tự chạm vào nhé!"
    },
    {
      id: "car", emoji: "🚗", tone: "teal", title: "Lắp xe ô tô", desc: "Chọn bánh xe cho xe chạy",
      intro: "Chiếc xe đồ chơi chưa có bánh. Bé hãy chọn bánh xe và gắn vào đúng chỗ, rồi đẩy thử xem xe có chạy không nhé!",
      steps: [
        { key: "banh", ask: "Chọn bánh xe:", options: [
          { id: "banh_vuong", label: "Bánh vuông", ok: false, why: "Bánh vuông có góc, xe bị xóc rồi kẹt lại, không lăn được." },
          { id: "banh_tron", label: "Bánh tròn", ok: true, why: "Bánh tròn lăn đều và êm trên đường." },
          { id: "banh_tg", label: "Bánh tam giác", ok: false, why: "Bánh tam giác có góc nhọn, xe chỉ nhích được một chút rồi dừng." }] },
        { key: "vitri", ask: "Gắn bánh xe ở đâu?", options: [
          { id: "gan_tren", label: "Trên nóc xe", ok: false, why: "Bánh xe ở trên nóc không chạm mặt đường, thân xe cọ xuống đất nên không chạy được." },
          { id: "gan_duoi", label: "Dưới thân xe", ok: true, why: "Bánh xe gắn dưới thân xe để chạm mặt đường và nâng xe lên." }] }
      ],
      testLabel: "👉 Đẩy thử xe",
      success: "Xe chạy bon bon rồi! Bánh xe tròn gắn dưới thân xe giúp xe lăn êm trên đường.",
      remember: "Bánh xe phải tròn và chạm mặt đường thì xe mới lăn êm. Vì thế bánh xe đạp, xe máy, ô tô đều tròn."
    },
    {
      id: "bridge", emoji: "🌉", tone: "purple", title: "Xây cầu qua suối", desc: "Làm cầu cho xe tải đi qua",
      intro: "Xe tải chở táo cần đi qua con suối. Bé hãy xây một cây cầu thật chắc, rồi cho xe chạy thử nhé!",
      steps: [
        { key: "mat", ask: "Chọn vật liệu làm mặt cầu:", options: [
          { id: "giay", label: "Tờ giấy", ok: false, why: "Tờ giấy mỏng và mềm, xe vừa đi lên là cầu sụp ngay." },
          { id: "go", label: "Tấm gỗ", ok: true, why: "Tấm gỗ cứng và chắc, đỡ được xe đi qua." },
          { id: "day_len", label: "Sợi len", ok: false, why: "Sợi len mềm, chỉ võng xuống, không có mặt phẳng để xe chạy." }] },
        { key: "tru", ask: "Có xây trụ đỡ ở giữa cầu không?", options: [
          { id: "khong_tru", label: "Không xây trụ", ok: false, why: "Không có trụ đỡ, cầu dài bị võng xuống khi xe tải nặng đi qua, chưa an toàn." },
          { id: "co_tru", label: "Xây trụ ở giữa", ok: true, why: "Trụ đỡ ở giữa giúp cầu đỡ được sức nặng của xe." }] }
      ],
      testLabel: "🚚 Cho xe chạy thử",
      success: "Xe tải đi qua cầu an toàn rồi! Mặt cầu bằng gỗ chắc chắn cùng trụ đỡ ở giữa giúp cầu không bị võng.",
      remember: "Cầu cần làm bằng vật liệu cứng, chắc và có trụ đỡ để chịu được sức nặng. Bé để ý xem, những cây cầu dài ngoài đời đều có nhiều trụ đỡ bên dưới."
    },
    {
      id: "raincoat", emoji: "☔", tone: "pink", title: "Áo mưa cho gấu bông", desc: "Chọn vật liệu không thấm nước",
      intro: "Trời sắp mưa mà gấu bông chưa có áo mưa. Bé hãy chọn vật liệu và kiểu áo, rồi cho trời mưa thử xem gấu có bị ướt không nhé!",
      steps: [
        { key: "vai", ask: "Chọn vật liệu may áo mưa:", options: [
          { id: "vai_bong", label: "Vải bông", ok: false, why: "Vải bông thấm nước, mưa một lúc là áo ướt sũng." },
          { id: "giay_bao", label: "Giấy báo", ok: false, why: "Giấy báo thấm nước rồi rách mất." },
          { id: "nilon", label: "Nilon", ok: true, why: "Nilon không thấm nước, nước mưa trượt đi hết." },
          { id: "len_ao", label: "Len", ok: false, why: "Len thấm nước nên gấu bông bị ướt." }] },
        { key: "mu", ask: "Áo mưa có mũ trùm đầu không?", options: [
          { id: "khong_mu", label: "Không có mũ", ok: false, why: "Không có mũ nên đầu gấu bông bị ướt hết." },
          { id: "co_mu", label: "Có mũ trùm đầu", ok: true, why: "Có mũ trùm đầu nên đầu gấu bông khô ráo." }] }
      ],
      testLabel: "🌧️ Cho trời mưa",
      success: "Gấu bông khô ráo dù trời mưa to! Áo mưa bằng nilon có mũ trùm đầu che mưa thật tốt.",
      remember: "Áo mưa cần làm bằng vật liệu không thấm nước như nilon, và có mũ để che đầu. Mỗi đồ vật cần được làm từ vật liệu phù hợp với công việc của nó."
    }
  ];

  /* ---------- Trạng thái ---------- */
  let activeContext = null;
  let ch = null;
  let picks = {};
  let stepIndex = 0;
  let state = "build"; /* build | test | ok | fail */
  let tries = 0;
  let failStep = -1;
  let switchOn = true;
  let timers = [];
  let muted = false;

  const esc = (v) => String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const reduceMotion = () => { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (_) { return false; } };
  function later(fn, ms) { const t = window.setTimeout(fn, reduceMotion() ? Math.min(ms, 150) : ms); timers.push(t); }
  function clearTimers() { timers.forEach((t) => window.clearTimeout(t)); timers = []; }
  const stars = (() => { try { return JSON.parse(window.localStorage.getItem(STARS_KEY) || "{}") || {}; } catch (_) { return {}; } })();
  function saveStars(id, n) { stars[id] = Math.max(stars[id] || 0, n); try { window.localStorage.setItem(STARS_KEY, JSON.stringify(stars)); } catch (_) {} }
  const starRow = (n) => `<span class="eng-stars" aria-label="${n} sao">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</span>`;
  const host = () => activeContext && activeContext.host;
  const optOf = (step, id) => step.options.find((o) => o.id === id) || null;
  const pickOpt = (k) => { const s = ch.steps[k]; return s ? optOf(s, picks[s.key]) : null; };

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
    const parts = String(text || "").replace(/⚠️/g, "").replace(/\s+/g, " ").trim().match(/[^.!?]+[.!?]?/g) || [];
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
    const n = host() && host().querySelector("#eng-voice");
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

  function setBanner(withCh) {
    const fn = activeContext && activeContext.hooks && activeContext.hooks.setSubBanner;
    if (typeof fn !== "function") return;
    const items = [{ level: 2, title: `${GAME_NUMBER}. ${GAME_TITLE}`, action: withCh ? renderHome : null }];
    if (withCh && ch) items.push({ level: 3, title: `${GAME_NUMBER}.${CHALLENGES.indexOf(ch) + 1} ${ch.title}`, action: null });
    fn({ items });
  }

  /* ---------- Cảnh lắp ráp từng thử thách (SVG 600 x 320) ---------- */
  const nest = (id, x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><g stroke="${INK}" stroke-width="${3 / s * s}" stroke-linejoin="round" stroke-linecap="round">${OPT[id] || ""}</g></g>`;
  const slotBox = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#fff" stroke="#C4B5FD" stroke-width="3" stroke-dasharray="8 6"/><text x="${x + w / 2}" y="${y + h / 2 + 12}" text-anchor="middle" font-size="34" font-weight="800" fill="#C4B5FD">?</text>`;

  function sceneCircuit() {
    const src = picks.nguon, wire = picks.day;
    const lit = state === "ok" && switchOn;
    const closed = state !== "build" && switchOn;
    const loop = "M150 90 H300 M340 90 H470 V145 M470 205 V260 H130 V200 M130 140 V90 H150";
    let wireStyle = `<path d="${loop}" fill="none" stroke="#CBD5E1" stroke-width="8" stroke-dasharray="10 10"/>`;
    if (wire === "day_dong") wireStyle = `<path d="${loop}" fill="none" stroke="#B45309" stroke-width="12"/><path d="${loop}" fill="none" stroke="#F59E0B" stroke-width="6"/>`;
    if (wire === "len") wireStyle = `<path d="${loop}" fill="none" stroke="#F9A8D4" stroke-width="12"/><path d="${loop}" fill="none" stroke="#EC4899" stroke-width="5" stroke-dasharray="3 6"/>`;
    if (wire === "ong_hut") wireStyle = `<path d="${loop}" fill="none" stroke="#fff" stroke-width="14"/><path d="${loop}" fill="none" stroke="#EF4444" stroke-width="14" stroke-dasharray="6 10"/>`;
    const flow = lit ? `<path d="${loop}" fill="none" stroke="#FDE047" stroke-width="5" stroke-dasharray="4 18" class="eng-flow"/>` : "";
    const battery = src ? nest(src, 80, 120, 1.0) : slotBox(85, 125, 90, 90);
    const glow = lit ? `<circle cx="320" cy="46" r="66" fill="#FEF08A" opacity=".55" class="eng-glow"/><g stroke="#FACC15" stroke-width="6" stroke-linecap="round">${[0, 40, 80, 100, 140, 180].map((a) => `<path d="M${320 + 46 * Math.cos(-a * Math.PI / 180)} ${46 + 46 * Math.sin(-a * Math.PI / 180)} L${320 + 64 * Math.cos(-a * Math.PI / 180)} ${46 + 64 * Math.sin(-a * Math.PI / 180)}"/>`).join("")}</g>` : "";
    const lever = closed ? `<path d="M470 205 L470 145" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>` : `<path d="M470 205 L506 152" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
    return `${wireStyle}${flow}${glow}
      <circle cx="320" cy="46" r="32" fill="${lit ? "#FEF9C3" : "#F1F5F9"}" stroke="${INK}" stroke-width="4"/>
      <path d="M308 62 Q314 36 320 56 Q326 36 332 62" fill="none" stroke="${lit ? "#F59E0B" : "#94A3B8"}" stroke-width="3"/>
      <rect x="303" y="74" width="34" height="20" rx="4" fill="#9CA3AF" stroke="${INK}" stroke-width="3"/>
      <rect x="448" y="196" width="44" height="16" rx="4" fill="#64748B" stroke="${INK}" stroke-width="3"/>${lever}
      <circle cx="470" cy="205" r="7" fill="${INK}"/><circle cx="470" cy="145" r="7" fill="${INK}"/>
      ${battery}
      <text x="130" y="300" text-anchor="middle" font-size="18" font-weight="700" fill="#6D28D9">Nguồn điện</text>
      <text x="320" y="300" text-anchor="middle" font-size="18" font-weight="700" fill="#6D28D9">Dây nối</text><text x="320" y="128" text-anchor="middle" font-size="18" font-weight="700" fill="#6D28D9">Bóng đèn</text>
      <text x="545" y="182" text-anchor="middle" font-size="18" font-weight="700" fill="#6D28D9">Công tắc</text>`;
  }

  function wheelShape(id, cx, cy, r, spin) {
    const cls = spin ? ' class="eng-spin"' : "";
    if (id === "banh_vuong") return `<g${cls}><rect x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" rx="3" fill="#1F2937"/><rect x="${cx - r / 2.5}" y="${cy - r / 2.5}" width="${r / 1.25}" height="${r / 1.25}" fill="#CBD5E1"/></g>`;
    if (id === "banh_tg") return `<g${cls}><path d="M${cx} ${cy - r * 1.15} L${cx + r} ${cy + r * 0.75} H${cx - r}Z" fill="#1F2937"/><circle cx="${cx}" cy="${cy}" r="${r / 3}" fill="#CBD5E1"/></g>`;
    return `<g${cls}><circle cx="${cx}" cy="${cy}" r="${r}" fill="#1F2937"/><circle cx="${cx}" cy="${cy}" r="${r / 2.4}" fill="#CBD5E1"/><path d="M${cx - r / 2.4} ${cy} H${cx + r / 2.4}" stroke="${INK}" stroke-width="2"/></g>`;
  }
  function sceneCar() {
    const wheel = picks.banh, top = picks.vitri === "gan_tren";
    const moving = state === "test" || state === "ok" || state === "fail";
    const bumpy = wheel !== "banh_tron" && !top;
    let anim = "";
    if (state === "test") anim = failStep >= 0 ? (bumpy ? "eng-bump" : "eng-slide") : "eng-drive";
    if (state === "ok") anim = "eng-drive-end";
    if (state === "fail") anim = bumpy ? "eng-bump-end" : "eng-slide-end";
    const bodyY = top ? 222 : 180;
    const wheels = wheel ? (top ? [wheelShape(wheel, 112, bodyY - 14, 22, false), wheelShape(wheel, 208, bodyY - 14, 22, false)]
      : [wheelShape(wheel, 112, 238, 22, wheel === "banh_tron" && anim === "eng-drive"), wheelShape(wheel, 208, 238, 22, wheel === "banh_tron" && anim === "eng-drive")]).join("") : `<g opacity=".7">${slotBox(88, 222, 46, 36)}${slotBox(184, 222, 46, 36)}</g>`;
    return `<rect x="0" y="260" width="600" height="60" fill="#D6D3D1"/><path d="M0 260 H600" stroke="#78716C" stroke-width="4"/>
      ${[40, 160, 280, 400, 520].map((x) => `<rect x="${x}" y="286" width="50" height="6" rx="3" fill="#fff"/>`).join("")}
      <g class="${anim}">
        <rect x="70" y="${bodyY}" width="180" height="40" rx="12" fill="#60A5FA" stroke="${INK}" stroke-width="4"/>
        <path d="M110 ${bodyY} L130 ${bodyY - 32} H200 L222 ${bodyY}Z" fill="#93C5FD" stroke="${INK}" stroke-width="4"/>
        <rect x="140" y="${bodyY - 24}" width="26" height="20" rx="3" fill="#E0F2FE" stroke="${INK}" stroke-width="2"/><rect x="172" y="${bodyY - 24}" width="26" height="20" rx="3" fill="#E0F2FE" stroke="${INK}" stroke-width="2"/>
        <circle cx="244" cy="${bodyY + 14}" r="6" fill="#FDE047" stroke="${INK}" stroke-width="2"/>
        ${wheels}
      </g>
      <text x="530" y="246" font-size="34" text-anchor="middle">🏁</text>`;
  }

  function sceneBridge() {
    const mat = picks.mat, tru = picks.tru === "co_tru";
    const goodDeck = mat === "go";
    const sagDeep = state === "fail" && mat && mat !== "go";
    const sagSoft = state === "fail" && mat === "go" && !tru;
    const deckY = 196;
    let deck = `<path d="M160 ${deckY} H440" stroke="#CBD5E1" stroke-width="10" stroke-dasharray="12 10"/>`;
    const sag = sagDeep ? 110 : sagSoft ? 34 : 0;
    const curve = `M160 ${deckY} Q300 ${deckY + sag * 2} 440 ${deckY}`;
    if (mat === "go") deck = `<path d="${curve}" fill="none" stroke="#7C2D12" stroke-width="20"/><path d="${curve}" fill="none" stroke="#B45309" stroke-width="14"/>`;
    if (mat === "giay") deck = `<path d="${curve}" fill="none" stroke="${INK}" stroke-width="8"/><path d="${curve}" fill="none" stroke="#fff" stroke-width="4"/>`;
    if (mat === "day_len") deck = `<path d="M160 ${deckY} Q300 ${deckY + (sag ? 230 : 70)} 440 ${deckY}" fill="none" stroke="#EC4899" stroke-width="6" stroke-dasharray="3 5"/>`;
    const pillar = tru ? `<rect x="290" y="${deckY + 10}" width="20" height="${320 - deckY - 10}" fill="#9CA3AF" stroke="${INK}" stroke-width="3"/>` : "";
    let anim = "";
    if (state === "test") anim = failStep >= 0 ? "eng-truck-stop" : "eng-truck-go";
    if (state === "ok") anim = "eng-truck-done";
    if (state === "fail") anim = "eng-truck-stopped";
    return `<rect x="170" y="230" width="260" height="90" fill="#38BDF8"/><path d="M175 250 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0" stroke="#BAE6FD" stroke-width="4" fill="none"/>
      <path d="M0 200 H175 V320 H0Z" fill="#86EFAC" stroke="${INK}" stroke-width="3"/><path d="M425 200 H600 V320 H425Z" fill="#86EFAC" stroke="${INK}" stroke-width="3"/>
      ${pillar}${deck}
      <g class="${anim}">
        <rect x="30" y="150" width="72" height="36" rx="5" fill="#F59E0B" stroke="${INK}" stroke-width="3"/>
        <circle cx="44" cy="146" r="8" fill="#EF4444" stroke="${INK}" stroke-width="2"/><circle cx="60" cy="144" r="8" fill="#EF4444" stroke="${INK}" stroke-width="2"/><circle cx="76" cy="146" r="8" fill="#EF4444" stroke="${INK}" stroke-width="2"/>
        <path d="M102 160 H124 L134 174 V186 H102Z" fill="#60A5FA" stroke="${INK}" stroke-width="3"/>
        <circle cx="50" cy="190" r="10" fill="#1F2937"/><circle cx="116" cy="190" r="10" fill="#1F2937"/>
      </g>
      ${goodDeck && tru && state === "ok" ? `<text x="300" y="130" font-size="40" text-anchor="middle">🎉</text>` : ""}`;
  }

  function sceneRaincoat() {
    const mat = picks.vai, hood = picks.mu;
    const raining = state !== "build";
    const wetBody = state === "fail" && mat && mat !== "nilon";
    const wetHead = state === "fail" && hood === "khong_mu";
    const happy = state === "ok";
    const col = { nilon: "#7DD3FC", vai_bong: "#FDE68A", giay_bao: "#E2E8F0", len_ao: "#C4B5FD" }[mat] || "#F1F5F9";
    const rain = raining ? `<g class="eng-rain">${Array.from({ length: 22 }, (_, k) => `<path d="M${120 + (k * 47) % 360} ${40 + (k * 29) % 90} l-6 18" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>`).join("")}</g>` : "";
    const coat = mat ? `<path d="M240 196 Q300 180 360 196 L384 300 H216Z" fill="${col}" stroke="${INK}" stroke-width="4"${mat === "nilon" ? ' fill-opacity=".85"' : ""}/>${mat === "len_ao" ? `<path d="M240 230 q10 8 20 0 q10 8 20 0 q10 8 20 0 q10 8 20 0 q10 8 20 0 q10 8 20 0" fill="none" stroke="#7C3AED" stroke-width="3"/>` : ""}${mat === "giay_bao" ? `<path d="M244 220 H356 M240 240 H360 M236 260 H364" stroke="#64748B" stroke-width="3"/>` : ""}`
      : `<path d="M240 196 Q300 180 360 196 L384 300 H216Z" fill="none" stroke="#C4B5FD" stroke-width="4" stroke-dasharray="10 8"/>`;
    const wet = wetBody ? `<g fill="#1E3A8A" opacity=".35"><ellipse cx="270" cy="240" rx="26" ry="18"/><ellipse cx="330" cy="268" rx="30" ry="20"/><ellipse cx="300" cy="215" rx="20" ry="12"/></g>${mat === "giay_bao" ? `<path d="M300 250 l14 22 l-10 10" fill="none" stroke="${INK}" stroke-width="4"/>` : ""}` : "";
    const hoodSvg = hood === "co_mu" ? `<path d="M244 150 Q244 82 300 82 Q356 82 356 150 Q300 138 244 150Z" fill="${mat ? col : "#F1F5F9"}" stroke="${INK}" stroke-width="4"/>` : "";
    const headDrops = wetHead ? `<g fill="#3B82F6">${[[278, 108], [300, 100], [322, 110], [286, 122]].map(([x, y]) => `<path d="M${x} ${y} q-5 8 0 11 q5 -3 0 -11Z"/>`).join("")}</g>` : "";
    const mouth = happy ? `<path d="M288 162 Q300 174 312 162" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` : state === "fail" ? `<path d="M288 170 Q300 160 312 170" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` : `<path d="M292 166 H308" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    return `<g fill="#E2E8F0" stroke="${INK}" stroke-width="3"><ellipse cx="220" cy="40" rx="60" ry="24"/><ellipse cx="300" cy="30" rx="70" ry="28"/><ellipse cx="390" cy="42" rx="58" ry="22"/></g>
      ${rain}
      <rect x="0" y="300" width="600" height="20" fill="#86EFAC"/>
      <ellipse cx="300" cy="250" rx="70" ry="60" fill="#C08457" stroke="${INK}" stroke-width="4"/>
      ${coat}${wet}
      <circle cx="252" cy="104" r="18" fill="#C08457" stroke="${INK}" stroke-width="4"/><circle cx="348" cy="104" r="18" fill="#C08457" stroke="${INK}" stroke-width="4"/>
      <circle cx="300" cy="140" r="46" fill="#C08457" stroke="${INK}" stroke-width="4"/>
      <ellipse cx="300" cy="156" rx="20" ry="14" fill="#E7C9A9"/>
      <circle cx="282" cy="132" r="5" fill="${INK}"/><circle cx="318" cy="132" r="5" fill="${INK}"/><ellipse cx="300" cy="150" rx="6" ry="4" fill="${INK}"/>
      ${mouth}${hoodSvg}${headDrops}`;
  }

  function sceneSvg() {
    const body = ch.id === "circuit" ? sceneCircuit() : ch.id === "car" ? sceneCar() : ch.id === "bridge" ? sceneBridge() : sceneRaincoat();
    return `<svg class="eng-scene" viewBox="0 0 600 320" role="img" aria-label="${esc(ch.title)}">${body}</svg>`;
  }

  /* ---------- Giao diện ---------- */
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
      .eng-page{color:#344054;font-family:"Baloo 2","Nunito","Segoe UI",system-ui,sans-serif;padding:.1rem .1rem 1rem}
      .eng-page button{font-family:inherit}
      .eng-bubble{display:flex;align-items:center;gap:.6rem;border:2px solid #F9A8D4;border-radius:18px;background:#FFF1F7;padding:.55rem .8rem;margin:0 0 .9rem;color:#BE185D;font-size:19px;font-weight:700;line-height:1.4}
      .eng-bubble .ico{font-size:30px}.eng-bubble .txt{flex:1}
      .eng-say{flex:0 0 auto;min-width:50px;min-height:50px;border-radius:14px;border:2px solid #F9A8D4;background:#fff;cursor:pointer;font-size:22px}
      .eng-say.mute{opacity:.55}
      .eng-steps{display:flex;gap:.5rem;flex-wrap:wrap;margin:0 0 .9rem}
      .eng-step{display:flex;align-items:center;gap:.4rem;border:2px solid #E9D5FF;border-radius:999px;background:#fff;padding:.2rem .9rem;font-size:17px;font-weight:700;color:#5B216E}
      .eng-step b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff;font-size:15px}
      .eng-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem}
      .eng-card{display:flex;flex-direction:column;align-items:center;gap:.25rem;border:2px solid var(--bd);background:var(--bg);border-radius:22px;padding:1rem .7rem;cursor:pointer;text-align:center;transition:transform .15s,box-shadow .15s}
      .eng-card:hover{transform:translateY(-3px);box-shadow:0 10px 22px rgba(139,92,246,.14)}
      .eng-card .big{font-size:56px;line-height:1.1}
      .eng-card h3{margin:.2rem 0 0;color:#5B216E;font-size:22px;font-weight:800;line-height:1.2}
      .eng-card p{margin:0;color:#667085;font-size:16px;font-weight:600}
      .eng-tone-teal{--bg:#ECFDF5;--bd:#99F6E4}.eng-tone-pink{--bg:#FFF1F7;--bd:#F9A8D4}.eng-tone-amber{--bg:#FFFBEB;--bd:#FDE68A}.eng-tone-purple{--bg:#F5F3FF;--bd:#D8B4FE}
      .eng-stars{color:#F59E0B;font-size:22px;letter-spacing:2px}.eng-stars .off{color:#E5E7EB}
      .eng-head{display:flex;align-items:center;gap:.7rem;flex-wrap:wrap;margin-bottom:.6rem}
      .eng-head h2{margin:0;flex:1;min-width:220px;color:#5B216E;font-size:28px;font-weight:800}
      .eng-main{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(300px,1fr);gap:1rem;align-items:start}
      .eng-stage{border:2px solid #E9D5FF;border-radius:24px;background:linear-gradient(180deg,#F0F9FF,#FFFFFF);overflow:hidden}
      .eng-scene{display:block;width:100%;height:auto}
      .eng-panel{border:2px solid #E9D5FF;border-radius:22px;background:#fff;padding:1rem;display:flex;flex-direction:column;gap:.7rem}
      .eng-track{display:flex;gap:.4rem;flex-wrap:wrap}
      .eng-chip{display:flex;align-items:center;gap:.35rem;border:2px solid #E9D5FF;border-radius:999px;padding:.15rem .7rem .15rem .3rem;background:#FAF5FF;font-size:16px;font-weight:700;color:#6D28D9;cursor:pointer}
      .eng-chip .eng-ic{width:30px;height:30px}
      .eng-chip.now{border-color:#EC4899;background:#FFF1F7}
      .eng-chip.bad{border-color:#FBBF24;background:#FFFBEB;color:#B45309}
      .eng-q{margin:0;font-size:21px;font-weight:800;color:#3B0764}
      .eng-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:.6rem}
      .eng-opt{border:3px solid #E9D5FF;border-radius:20px;background:#fff;cursor:pointer;padding:.4rem;display:flex;flex-direction:column;align-items:center;gap:.1rem;font-size:18px;font-weight:800;color:#5B216E;transition:transform .12s,border-color .12s}
      .eng-opt .eng-ic{width:70px;height:70px}
      .eng-opt:hover{transform:translateY(-2px);border-color:#C4B5FD}
      .eng-opt.picked{border-color:#EC4899;background:#FFF1F7}
      .eng-res{border-radius:18px;padding:.6rem .8rem;font-size:18px;font-weight:700;line-height:1.45}
      .eng-res.good{border:2px solid #6EE7B7;background:#ECFDF5;color:#047857}
      .eng-res.fix{border:2px solid #FCD34D;background:#FFFBEB;color:#92400E}
      .eng-res .title{display:block;font-size:22px;font-weight:800;margin-bottom:.2rem}
      .eng-actions{display:flex;gap:.6rem;flex-wrap:wrap}
      .eng-btn{min-height:56px;border-radius:16px;border:2px solid #6EE7B7;background:linear-gradient(90deg,#ECFDF5,#E0F2FE);color:#047857;padding:0 1.1rem;font-size:19px;font-weight:700;cursor:pointer}
      .eng-btn.primary{border:0;background:linear-gradient(90deg,#EC4899,#8B5CF6);color:#fff;box-shadow:0 6px 16px rgba(139,92,246,.22)}
      .eng-btn.go{border:0;background:linear-gradient(90deg,#3B82F6,#10B981);color:#fff;font-size:21px}
      .eng-btn:disabled{opacity:.45;cursor:not-allowed}
      .eng-btn:focus-visible,.eng-opt:focus-visible,.eng-card:focus-visible,.eng-say:focus-visible,.eng-chip:focus-visible{outline:3px solid #F472B6;outline-offset:2px}
      .eng-wait{font-size:19px;font-weight:700;color:#6D28D9}
      .eng-voice{margin:0;padding:.4rem .7rem;border-radius:12px;background:#FFF7ED;color:#C2410C;font-size:16px;font-weight:600}
      .eng-remember{margin-top:1rem;border:2px solid #7DD3FC;background:#F0F9FF;border-radius:18px;padding:.6rem .9rem;color:#0369A1;font-size:18px;font-weight:700;line-height:1.45}
      .eng-finish{border:2px solid #FBCFE8;border-radius:24px;background:linear-gradient(135deg,#FFF1F7,#F5F3FF);padding:1rem;text-align:center;margin-top:1rem}
      .eng-finish h3{margin:.1rem 0;color:#BE185D;font-size:26px;font-weight:800}
      .eng-finish .bigstars{font-size:42px;color:#F59E0B;letter-spacing:6px}.eng-finish .bigstars .off{color:#E5E7EB}
      /* hoạt cảnh */
      .eng-glow{animation:engGlow 1.2s ease-in-out infinite}
      @keyframes engGlow{50%{opacity:.25}}
      .eng-flow{animation:engFlow .8s linear infinite}
      @keyframes engFlow{to{stroke-dashoffset:-44}}
      .eng-spin{transform-box:fill-box;transform-origin:center;animation:engSpin .5s linear infinite}
      @keyframes engSpin{to{transform:rotate(360deg)}}
      .eng-drive{animation:engDrive 2.2s ease-out forwards}
      @keyframes engDrive{to{transform:translateX(270px)}}
      .eng-bump{animation:engBump 1.6s ease-out forwards}
      @keyframes engBump{20%{transform:translate(20px,-10px)}40%{transform:translate(36px,0)}60%{transform:translate(44px,-6px)}100%{transform:translate(48px,0)}}
      .eng-slide{animation:engSlide 1.2s ease-out forwards}
      @keyframes engSlide{to{transform:translateX(26px)}}
      .eng-drive-end{transform:translateX(270px)}.eng-bump-end{transform:translateX(48px)}.eng-slide-end{transform:translateX(26px)}
      .eng-truck-done{transform:translateX(440px)}.eng-truck-stopped{transform:translateX(52px)}
      .eng-truck-go{animation:engTruck 2.4s ease-in-out forwards}
      @keyframes engTruck{to{transform:translateX(440px)}}
      .eng-truck-stop{animation:engTruckStop 1.4s ease-out forwards}
      @keyframes engTruckStop{to{transform:translateX(52px)}}
      .eng-rain{animation:engRain .5s linear infinite}
      @keyframes engRain{from{transform:translateY(-20px)}to{transform:translateY(20px)}}
      @media(max-width:1000px){.eng-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.eng-main{grid-template-columns:1fr}}
      @media(max-width:600px){.eng-opt .eng-ic{width:56px;height:56px}.eng-opt{font-size:16px}}
      @media(prefers-reduced-motion:reduce){.eng-glow,.eng-flow,.eng-spin,.eng-rain{animation:none!important}.eng-drive,.eng-bump,.eng-slide,.eng-truck-go,.eng-truck-stop{animation-duration:.01s!important}}
    `;
    document.head.appendChild(style);
  }

  const HOME_TIP = "Kỹ sư là người thiết kế, làm thử rồi sửa cho tới khi mọi thứ hoạt động tốt. Lần đầu chưa được cũng không sao, mình sửa lại là được!";
  function renderHome() {
    clearTimers(); stopSpeak();
    ch = null;
    setBanner(false);
    const h = host(); if (!h) return;
    h.innerHTML = `
      <div class="eng-page">
        <div class="section-heading"><div><h1>🛠️ ${GAME_TITLE}</h1><p>${CHALLENGES.length} thử thách</p></div><button id="eng-back-games" class="back-btn" type="button">← Games</button></div>
        <div class="eng-bubble"><span class="ico" aria-hidden="true">🐰</span><span class="txt">${HOME_TIP}</span><button class="eng-say" id="eng-say-home" type="button" aria-label="Nghe cô đọc">🔊</button></div>
        <div class="eng-steps"><span class="eng-step"><b>1</b>✏️ Thiết kế</span><span class="eng-step"><b>2</b>▶️ Chạy thử</span><span class="eng-step"><b>3</b>🔧 Sửa lại</span></div>
        <p id="eng-voice" class="eng-voice" hidden></p>
        <div class="eng-grid">${CHALLENGES.map((c, i) => `
          <button class="eng-card eng-tone-${c.tone}" type="button" data-ch="${i}">
            <span class="big" aria-hidden="true">${c.emoji}</span>
            <h3>${i + 1}. ${esc(c.title)}</h3><p>${esc(c.desc)}</p>${starRow(stars[c.id] || 0)}
          </button>`).join("")}</div>
      </div>`;
    h.querySelector("#eng-back-games")?.addEventListener("click", () => activeContext && activeContext.back && activeContext.back());
    h.querySelector("#eng-say-home")?.addEventListener("click", () => speak(HOME_TIP, false, true));
    h.querySelectorAll("[data-ch]").forEach((b) => b.addEventListener("click", () => startCh(CHALLENGES[Number(b.dataset.ch)])));
  }

  function startCh(c) {
    clearTimers(); stopSpeak();
    ch = c; picks = {}; stepIndex = 0; state = "build"; tries = 0; failStep = -1; switchOn = true;
    renderCh(true);
  }

  function firstWrong() {
    return ch.steps.findIndex((s) => { const o = optOf(s, picks[s.key]); return !o || !o.ok; });
  }

  function renderCh(readIntro) {
    const h = host(); if (!h || !ch) return;
    setBanner(true);
    const allPicked = ch.steps.every((s) => picks[s.key]);
    const track = ch.steps.map((s, k) => {
      const o = optOf(s, picks[s.key]);
      const cls = state === "fail" && k === failStep ? "bad" : state === "build" && k === stepIndex ? "now" : "";
      return `<button type="button" class="eng-chip ${cls}" data-goto="${k}" ${state === "test" ? "disabled" : ""}>${o ? optSvg(o.id) : `<span style="width:30px;text-align:center">${k + 1}</span>`}${esc(o ? o.label : s.ask.replace(/:$/, ""))}</button>`;
    }).join("");
    let panel = "";
    if (state === "build") {
      const s = ch.steps[stepIndex];
      panel = `<p class="eng-q">✏️ ${esc(s.ask)}</p>
        <div class="eng-opts">${s.options.map((o) => `<button type="button" class="eng-opt ${picks[s.key] === o.id ? "picked" : ""}" data-opt="${o.id}">${optSvg(o.id)}${esc(o.label)}</button>`).join("")}</div>
        <div class="eng-actions"><button id="eng-test" class="eng-btn go" type="button" ${allPicked ? "" : "disabled"}>${esc(ch.testLabel)}</button></div>`;
    } else if (state === "test") {
      panel = `<p class="eng-wait">▶️ Đang chạy thử… bé nhìn kỹ nhé!</p>`;
    } else if (state === "ok") {
      panel = `<div class="eng-res good"><span class="title">🎉 Thành công!</span>${esc(ch.success)}</div>
        ${ch.id === "circuit" ? `<div class="eng-actions"><button id="eng-switch" class="eng-btn" type="button">${switchOn ? "🔌 Tắt công tắc" : "🔌 Bật công tắc"}</button></div>` : ""}
        <div class="eng-actions"><button id="eng-again-say" class="eng-btn" type="button">🔊 Nghe lại</button></div>`;
    } else {
      const bad = pickOpt(failStep);
      panel = `<div class="eng-res fix"><span class="title">🔧 Chưa được rồi!</span>${esc(bad ? bad.why : "")}<br>Bé sửa lại bộ phận này nhé!</div>
        <div class="eng-actions"><button id="eng-fix" class="eng-btn primary" type="button">🔧 Sửa lại</button><button id="eng-again-say" class="eng-btn" type="button">🔊 Nghe lại</button></div>`;
    }
    const finish = state === "ok" ? (() => {
      const n = tries <= 1 ? 3 : tries === 2 ? 2 : 1;
      saveStars(ch.id, n);
      const next = CHALLENGES[CHALLENGES.indexOf(ch) + 1];
      return `<section class="eng-finish"><h3>${tries <= 1 ? "Làm được ngay lần đầu, kỹ sư giỏi quá!" : `Bé sửa ${tries - 1} lần và đã thành công!`}</h3>
        <div class="bigstars" aria-label="${n} sao">${[1, 2, 3].map((i) => `<span class="${i <= n ? "" : "off"}">★</span>`).join("")}</div>
        <div class="eng-remember" style="text-align:left">🐰 <b>Bé nhớ nhé:</b> ${esc(ch.remember)}</div>
        <div class="eng-actions" style="justify-content:center;margin-top:.8rem">
          ${next ? `<button id="eng-next" class="eng-btn primary" type="button">▶ Thử thách tiếp: ${esc(next.title)}</button>` : ""}
          <button id="eng-replay" class="eng-btn" type="button">🔄 Làm lại</button>
          <button id="eng-list" class="eng-btn" type="button">🛠️ Chọn thử thách khác</button></div></section>`;
    })() : "";
    h.innerHTML = `
      <div class="eng-page">
        <div class="eng-head"><h2>${ch.emoji} ${esc(ch.title)}</h2>
          <button id="eng-mute" class="eng-say${muted ? " mute" : ""}" type="button" aria-label="${muted ? "Bật" : "Tắt"} giọng đọc tự động">${muted ? "🔇" : "🔈"}</button>
          <button id="eng-home" class="back-btn" type="button">← ${CHALLENGES.length} thử thách</button></div>
        ${readIntro ? `<div class="eng-bubble"><span class="ico" aria-hidden="true">🐰</span><span class="txt">${esc(ch.intro)}</span><button class="eng-say" id="eng-say-intro" type="button" aria-label="Nghe cô đọc">🔊</button></div>` : ""}
        <p id="eng-voice" class="eng-voice" hidden></p>
        <div class="eng-main">
          <div class="eng-stage">${sceneSvg()}</div>
          <div class="eng-panel" aria-live="polite"><div class="eng-track">${track}</div>${panel}</div>
        </div>
        ${finish}
      </div>`;
    bind();
    if (readIntro) speak(`${ch.intro} ${ch.steps[0].ask}`);
  }

  function bind() {
    const h = host(); if (!h) return;
    h.querySelector("#eng-home")?.addEventListener("click", renderHome);
    h.querySelector("#eng-say-intro")?.addEventListener("click", () => speak(ch.intro, false, true));
    h.querySelector("#eng-mute")?.addEventListener("click", (ev) => {
      muted = !muted; if (muted) stopSpeak();
      ev.currentTarget.textContent = muted ? "🔇" : "🔈"; ev.currentTarget.classList.toggle("mute", muted);
    });
    h.querySelectorAll("[data-goto]").forEach((b) => b.addEventListener("click", () => {
      if (state === "test") return;
      clearTimers(); state = "build"; stepIndex = Number(b.dataset.goto); renderCh(false); speak(ch.steps[stepIndex].ask);
    }));
    h.querySelectorAll("[data-opt]").forEach((b) => b.addEventListener("click", () => {
      const s = ch.steps[stepIndex];
      picks[s.key] = b.dataset.opt;
      const o = optOf(s, b.dataset.opt);
      const nextEmpty = ch.steps.findIndex((x) => !picks[x.key]);
      if (nextEmpty >= 0) { stepIndex = nextEmpty; renderCh(false); speak(`${o.label}. ${ch.steps[stepIndex].ask}`); }
      else { renderCh(false); speak(`${o.label}. Lắp xong rồi! Bé bấm nút để chạy thử nhé.`); }
    }));
    h.querySelector("#eng-test")?.addEventListener("click", runTest);
    h.querySelector("#eng-fix")?.addEventListener("click", () => { clearTimers(); state = "build"; stepIndex = Math.max(0, failStep); renderCh(false); speak(ch.steps[stepIndex].ask); });
    h.querySelector("#eng-again-say")?.addEventListener("click", () => { const bad = pickOpt(failStep); speak(state === "ok" ? ch.success : (bad ? bad.why : ""), false, true); });
    h.querySelector("#eng-switch")?.addEventListener("click", () => {
      switchOn = !switchOn; renderCh(false);
      speak(switchOn ? "Công tắc đóng lại, mạch điện thành vòng kín, đèn sáng." : "Công tắc mở ra, mạch điện bị hở, dòng điện không chạy được nên đèn tắt.");
    });
    h.querySelector("#eng-next")?.addEventListener("click", () => startCh(CHALLENGES[CHALLENGES.indexOf(ch) + 1]));
    h.querySelector("#eng-replay")?.addEventListener("click", () => startCh(ch));
    h.querySelector("#eng-list")?.addEventListener("click", renderHome);
  }

  function runTest() {
    stopSpeak();
    tries += 1;
    failStep = firstWrong();
    switchOn = true;
    state = "test";
    renderCh(false);
    later(() => {
      if (failStep < 0) { state = "ok"; renderCh(false); speak(`Thành công! ${ch.success}`); }
      else { state = "fail"; renderCh(false); const bad = pickOpt(failStep); speak(`Chưa được rồi. ${bad ? bad.why : ""} Bé sửa lại bộ phận này nhé!`); }
    }, ch.id === "circuit" ? 900 : 2300);
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    renderHome();
  }
  function destroy() {
    clearTimers(); stopSpeak();
    activeContext = null; ch = null;
  }

  window.CLASS1_GAME_MODULES = window.CLASS1_GAME_MODULES || {};
  window.CLASS1_GAME_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
