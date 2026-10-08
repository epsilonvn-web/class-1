(() => {
  "use strict";

  const MODULE_KEY = "colorMixer";
  const STYLE_ID = "class1-tools-color-mixer-style";
  let activeContext = null;
  let activeMode = "rgb";
  let activeLanguage = "vi";

  const state = {
    rgb: { r: 100, g: 40, b: 60 },
    cmyk: { c: 60, m: 20, y: 0, k: 0 }
  };

  const MODE_CONFIG = Object.freeze({
    rgb: Object.freeze({
      title: "RGB",
      subtitle: "Hệ màu ánh sáng — phối Đỏ, Xanh lục và Xanh lam theo tỷ lệ.",
      subtitleEn: "Light color system — mix red, green, and blue in different proportions.",
      components: Object.freeze([
        { key: "r", short: "R", name: "Đỏ", nameEn: "Red", css: "#EF4444" },
        { key: "g", short: "G", name: "Xanh lục", nameEn: "Green", css: "#22C55E" },
        { key: "b", short: "B", name: "Xanh lam", nameEn: "Blue", css: "#3B82F6" }
      ])
    }),
    cmyk: Object.freeze({
      title: "CMYK",
      subtitle: "Hệ màu in — phối Cyan, Magenta, Yellow và Key (đen) theo tỷ lệ.",
      subtitleEn: "Print color system — combine cyan, magenta, yellow, and black (key) in different proportions.",
      components: Object.freeze([
        { key: "c", short: "C", name: "Xanh lơ (Cyan)", nameEn: "Cyan", css: "#00B7EB" },
        { key: "m", short: "M", name: "Hồng cánh sen (Magenta)", nameEn: "Magenta", css: "#EC008C" },
        { key: "y", short: "Y", name: "Vàng (Yellow)", nameEn: "Yellow", css: "#FFD400" },
        { key: "k", short: "K", name: "Đen (Key)", nameEn: "Black (Key)", css: "#111827" }
      ])
    })
  });

  const PAINT_NAMES = Object.freeze([
    ["#FFFFFF", "Trắng tuyết", "Snow White"], ["#FAF7F0", "Trắng ngọc trai", "Pearl White"], ["#F5E6D3", "Kem sữa", "Cream"],
    ["#E8D5B7", "Be cát", "Sandy Beige"], ["#D6C2A8", "Be ấm", "Warm Beige"], ["#FFF1B8", "Vàng kem", "Cream Yellow"],
    ["#FDE047", "Vàng nắng", "Sunny Yellow"], ["#FACC15", "Vàng rực", "Bright Yellow"], ["#EAB308", "Vàng mật ong", "Honey Yellow"],
    ["#F59E0B", "Hổ phách", "Amber"], ["#FDBA74", "Cam đào nhạt", "Light Peach Orange"], ["#FB923C", "Cam đào", "Peach Orange"],
    ["#F97316", "Cam quýt", "Tangerine Orange"], ["#EA580C", "Cam đất", "Burnt Orange"], ["#FCA5A5", "Đỏ phấn", "Soft Red"],
    ["#FB7185", "Hồng san hô", "Coral Pink"], ["#F43F5E", "Đỏ san hô", "Coral Red"], ["#EF4444", "Đỏ tươi", "Bright Red"],
    ["#DC2626", "Đỏ son", "Vermilion Red"], ["#991B1B", "Đỏ rượu vang", "Wine Red"], ["#FCE7F3", "Hồng sương", "Misty Pink"],
    ["#F9A8D4", "Hồng phấn", "Powder Pink"], ["#F472B6", "Hồng anh đào", "Cherry Pink"], ["#EC4899", "Hồng sen", "Lotus Pink"],
    ["#DB2777", "Hồng cánh sen", "Magenta Pink"], ["#9D174D", "Hồng mận", "Plum Pink"], ["#F5D0FE", "Tím phấn", "Powder Purple"],
    ["#D8B4FE", "Tím oải hương", "Lavender"], ["#C084FC", "Tím hoa cà", "Lilac"], ["#A855F7", "Tím thạch anh", "Amethyst"],
    ["#7C3AED", "Tím violet", "Violet"], ["#5B21B6", "Tím hoàng gia", "Royal Purple"], ["#4C1D95", "Tím mận đậm", "Deep Plum Purple"],
    ["#E0F2FE", "Xanh băng", "Ice Blue"], ["#BAE6FD", "Xanh trời nhạt", "Light Sky Blue"], ["#7DD3FC", "Xanh trời dịu", "Soft Sky Blue"],
    ["#38BDF8", "Xanh da trời", "Sky Blue"], ["#0EA5E9", "Xanh biển sáng", "Bright Ocean Blue"], ["#0284C7", "Xanh đại dương", "Ocean Blue"],
    ["#2563EB", "Xanh lam", "Blue"], ["#1D4ED8", "Xanh cobalt", "Cobalt Blue"], ["#1E3A8A", "Xanh navy", "Navy Blue"],
    ["#CFFAFE", "Xanh cyan nhạt", "Light Cyan"], ["#67E8F9", "Xanh cyan dịu", "Soft Cyan"], ["#22D3EE", "Xanh cyan", "Cyan"],
    ["#0891B2", "Xanh biển ngọc", "Turquoise Blue"], ["#155E75", "Xanh teal đậm", "Deep Teal"], ["#CCFBF1", "Xanh bạc hà", "Mint"],
    ["#99F6E4", "Xanh ngọc nhạt", "Light Aqua"], ["#5EEAD4", "Xanh ngọc dịu", "Soft Aqua"], ["#14B8A6", "Xanh ngọc", "Aqua"],
    ["#0F766E", "Xanh cổ vịt", "Teal"], ["#DCFCE7", "Xanh lá sương", "Misty Green"], ["#BBF7D0", "Xanh lá non", "Spring Green"],
    ["#86EFAC", "Xanh ngọc lá", "Jade Green"], ["#4ADE80", "Xanh lá tươi", "Bright Green"], ["#22C55E", "Xanh lá", "Green"],
    ["#16A34A", "Xanh cây", "Leaf Green"], ["#15803D", "Xanh rừng", "Forest Green"], ["#D9F99D", "Xanh chanh nhạt", "Light Lime Green"],
    ["#A3E635", "Xanh chanh", "Lime Green"], ["#84CC16", "Xanh olive sáng", "Light Olive Green"], ["#4D7C0F", "Xanh olive", "Olive Green"],
    ["#FED7AA", "Cam kem", "Cream Orange"], ["#D6B38A", "Nâu be", "Beige Brown"], ["#A16207", "Nâu vàng", "Golden Brown"],
    ["#92400E", "Nâu hổ phách", "Amber Brown"], ["#78350F", "Nâu đất", "Earth Brown"], ["#5C4033", "Nâu cacao", "Cocoa Brown"],
    ["#F8FAFC", "Trắng lạnh", "Cool White"], ["#E2E8F0", "Xám bạc", "Silver Gray"], ["#CBD5E1", "Xám sương", "Misty Gray"],
    ["#94A3B8", "Xám khói", "Smoky Gray"], ["#64748B", "Xám đá", "Stone Gray"], ["#475569", "Xám chì", "Slate Gray"],
    ["#334155", "Xám than", "Charcoal Gray"], ["#1F2937", "Than chì", "Graphite"], ["#111827", "Đen than", "Coal Black"], ["#000000", "Đen tuyền", "Jet Black"]
  ].map(([hex, name, nameEn]) => Object.freeze({ hex, name, nameEn, rgb: hexToRgb(hex) })));

  const UI_TEXT = Object.freeze({
    vi: Object.freeze({
      heading: "🎨 Phối màu",
      introduction: "Phối màu theo tỷ lệ trong hai hệ RGB và CMYK.",
      toolDescription: "Công cụ phối màu RGB và CMYK",
      chooseSystem: "Chọn hệ màu",
      basicColors: "màu cơ bản",
      normalizationHelp: "Giá trị là tỷ lệ tương đối; hệ thống tự chuẩn hóa thành phần lớn nhất về 100%.",
      ratioLabel: "Tỷ lệ nhập",
      normalizedLabel: "Chuẩn hóa",
      componentRatio: "Tỷ lệ",
      componentRatioNumber: "Tỷ lệ bằng số",
      reset: "↺ Đặt lại",
      suggestedName: "Tên màu gợi ý kiểu thẻ sơn",
      hexCode: "Mã HEX",
      epsilonCode: "Mã thẻ Epsilon",
      copyHex: "Sao chép HEX",
      copyRgb: "Sao chép RGB",
      copyCmyk: "Sao chép CMYK",
      copied: "Đã sao chép mã màu.",
      copyFailed: "Không thể sao chép tự động. Anh/chị có thể chọn mã màu để sao chép.",
      note: "Lưu ý: đây là mô phỏng màu số theo RGB/CMYK. Màu sơn thực tế có thể lệch do bề mặt, chất màu, ánh sáng và màn hình. Tên màu là tên gợi ý gần nhất, không phải mã thương mại của một hãng sơn cụ thể."
    }),
    en: Object.freeze({
      heading: "🎨 Color Mixer",
      introduction: "Mix colors in different proportions using RGB and CMYK.",
      toolDescription: "RGB and CMYK color mixer",
      chooseSystem: "Choose a color system",
      basicColors: "base colors",
      normalizationHelp: "Values are relative proportions; the largest component is automatically normalized to 100%.",
      ratioLabel: "Input ratio",
      normalizedLabel: "Normalized",
      componentRatio: "Percentage of",
      componentRatioNumber: "Enter percentage of",
      reset: "↺ Reset",
      suggestedName: "Suggested paint-style color name",
      hexCode: "HEX code",
      epsilonCode: "Epsilon color code",
      copyHex: "Copy HEX",
      copyRgb: "Copy RGB",
      copyCmyk: "Copy CMYK",
      copied: "Color code copied.",
      copyFailed: "Automatic copying is unavailable. Please select and copy the color code manually.",
      note: "Note: this is a digital RGB/CMYK color simulation. Real paint can look different depending on the surface, pigment, lighting, and display. The suggested color name is the nearest match, not a commercial paint code."
    })
  });

  function currentUi() { return UI_TEXT[activeLanguage]; }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-color-page{max-width:1040px;margin:0 auto}
      .ee-color-heading{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:.7rem}
      .ee-color-heading-copy{min-width:0;flex:1 1 280px}
      .ee-color-heading-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:.55rem;margin-left:auto}
      .ee-color-page .lang-switch{display:inline-flex;gap:4px;padding:3px;border:1px solid #BFDBFE;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:0 0 auto}
      .ee-color-page .lang-switch button{min-height:38px;padding:0 13px;border:0;border-radius:10px;background:transparent;color:#475569;font-size:14px;font-weight:900;line-height:1.15;white-space:nowrap;cursor:pointer}
      .ee-color-page .lang-switch button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3B82F6,#10B981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
      .ee-color-page .lang-switch button:focus-visible{outline:3px solid rgba(59,130,246,.25);outline-offset:2px}
      .ee-color-shell{border:1px solid #C4B5FD;border-radius:24px;background:linear-gradient(145deg,#FFFDFE,#F8F5FF);box-shadow:0 10px 26px rgba(76,29,149,.08);padding:1rem}
      .ee-color-tabs{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin-bottom:.9rem}
      .ee-color-tab{min-height:54px;border:1px solid #E9D5FF;border-radius:16px;background:#fff;color:#6D28D9;font-size:18px;font-weight:1000;padding:.5rem .8rem;box-shadow:0 3px 9px rgba(76,29,149,.05)}
      .ee-color-tab:hover{background:#FAF5FF}
      .ee-color-tab.is-active{color:#fff;border-color:#8B5CF6;background:linear-gradient(90deg,#EC4899,#8B5CF6);box-shadow:0 6px 14px rgba(124,58,237,.18)}
      .ee-color-work{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(330px,.95fr);gap:1rem;align-items:stretch}
      .ee-color-panel{border:1px solid #E9D5FF;border-radius:22px;background:rgba(255,255,255,.9);padding:.95rem}
      .ee-color-mode-title{margin:0;color:#4C1D95;font-size:23px;font-weight:1000}
      .ee-color-mode-desc{margin:.2rem 0 .85rem;color:#667085;font-size:16px;font-weight:800;line-height:1.45}
      .ee-color-components{display:grid;gap:.62rem}
      .ee-color-component{display:grid;grid-template-columns:minmax(135px,.75fr) minmax(0,1fr) 84px;gap:.7rem;align-items:center;padding:.68rem .72rem;border:1px solid #E9D5FF;border-radius:16px;background:#fff}
      .ee-color-component-name{display:flex;align-items:center;gap:.55rem;min-width:0;color:#344054;font-size:16px;font-weight:950}
      .ee-color-chip{width:30px;height:30px;flex:0 0 30px;border-radius:10px;border:2px solid rgba(255,255,255,.92);box-shadow:0 0 0 1px rgba(76,29,149,.12),0 3px 8px rgba(15,23,42,.08)}
      .ee-color-short{display:inline-flex;min-width:28px;height:26px;align-items:center;justify-content:center;border-radius:8px;background:#FAF5FF;color:#7C3AED;font-size:13px;font-weight:1000}
      .ee-color-range{width:100%;accent-color:#8B5CF6}
      .ee-color-value-wrap{position:relative;min-width:0}
      .ee-color-value{box-sizing:border-box;min-width:0;max-width:100%;width:100%;height:44px;border:1.5px solid #D8B4FE;border-radius:12px;background:#FAF5FF;color:#4C1D95;padding:0 30px 0 .62rem;font-size:18px;font-weight:1000;outline:none;text-align:right;font-variant-numeric:tabular-nums}
      .ee-color-value:focus{border-color:#8B5CF6;box-shadow:0 0 0 3px rgba(139,92,246,.10)}
      .ee-color-percent{position:absolute;right:9px;top:50%;transform:translateY(-50%);color:#7C3AED;font-size:14px;font-weight:950;pointer-events:none}
      .ee-color-ratio{margin:.72rem 0 0;padding:.66rem .76rem;border:1px solid #F3E8FF;border-radius:14px;background:linear-gradient(90deg,#FFF7FB,#FAF5FF);color:#5B216E;text-align:center;font-size:17px;font-weight:950}
      .ee-color-actions{display:flex;justify-content:flex-end;gap:.5rem;margin-top:.65rem}
      .ee-color-reset{min-height:40px;border:1px solid #D8B4FE;border-radius:12px;background:#fff;color:#7C3AED;padding:0 .8rem;font-size:14px;font-weight:950}
      .ee-color-result-panel{display:flex;flex-direction:column;gap:.7rem}
      .ee-color-swatch{position:relative;min-height:205px;border-radius:22px;border:1px solid rgba(15,23,42,.10);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 8px 20px rgba(15,23,42,.09);display:flex;align-items:flex-end;padding:.9rem;overflow:hidden;transition:background .18s ease}
      .ee-color-swatch::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(0,0,0,.08));pointer-events:none}
      .ee-color-swatch-label{position:relative;z-index:1;max-width:100%;padding:.52rem .68rem;border-radius:14px;background:rgba(255,255,255,.84);backdrop-filter:blur(5px);box-shadow:0 3px 9px rgba(15,23,42,.10)}
      .ee-color-swatch-label strong{display:block;color:#111827;font-size:22px;font-weight:1000;line-height:1.15}
      .ee-color-swatch-label span{display:block;margin-top:.12rem;color:#475467;font-size:14px;font-weight:900}
      .ee-color-info{display:grid;grid-template-columns:1fr 1fr;gap:.55rem}
      .ee-color-info-card{min-width:0;padding:.68rem;border:1px solid #E9D5FF;border-radius:15px;background:#fff}
      .ee-color-info-card span{display:block;color:#667085;font-size:13.5px;font-weight:900;margin-bottom:.2rem}
      .ee-color-info-card strong{display:block;color:#4C1D95;font-size:17px;font-weight:1000;line-height:1.3;overflow-wrap:anywhere;font-variant-numeric:tabular-nums}
      .ee-color-name-card{padding:.72rem .8rem;border:1px solid #F9A8D4;border-radius:16px;background:linear-gradient(90deg,#FFF7FB,#FAF5FF)}
      .ee-color-name-card span{display:block;color:#667085;font-size:14px;font-weight:850}
      .ee-color-name-card strong{display:block;margin-top:.2rem;color:#BE185D;font-size:23px;font-weight:1000}
      .ee-color-copy-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.5rem}
      .ee-color-copy{min-height:42px;border:1px solid #D8B4FE;border-radius:12px;background:#fff;color:#6D28D9;font-size:14px;font-weight:950;padding:.35rem .45rem}
      .ee-color-copy:hover{background:#FAF5FF}
      .ee-color-note{margin:.85rem 0 0;padding:.72rem .82rem;border-radius:14px;background:#FFFBEB;border:1px solid #FDE68A;color:#92400E;font-size:14px;font-weight:800;line-height:1.45}
      @media(max-width:860px){.ee-color-work{grid-template-columns:1fr}.ee-color-swatch{min-height:180px}}
      @media(max-width:620px){
        .ee-color-heading-copy{flex-basis:100%}
        .ee-color-heading-actions{width:100%;margin-left:0;justify-content:space-between}
        .ee-color-shell{padding:.75rem;border-radius:20px}
        .ee-color-tab{min-height:50px;font-size:16px}
        .ee-color-component{grid-template-columns:1fr 78px;gap:.5rem}
        .ee-color-component-name{grid-column:1/-1}
        .ee-color-range{min-width:0}
        .ee-color-info{grid-template-columns:1fr}
        .ee-color-copy-row{grid-template-columns:1fr}
        .ee-color-page .lang-switch{min-width:0}
        .ee-color-page .lang-switch button{padding:0 10px}
      }
    `;
    document.head.appendChild(style);
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    if (!activeContext || !activeContext.host) return;
    renderPage();
  }

  function renderPage() {
    const host = activeContext.host;
    const ui = currentUi();
    host.innerHTML = `
      <div class="ee-color-page" lang="${activeLanguage}">
        <div class="section-heading ee-color-heading">
          <div class="ee-color-heading-copy"><h1>${ui.heading}</h1><p>${ui.introduction}</p></div>
          <div class="ee-color-heading-actions">
            <div class="lang-switch" role="group" aria-label="Language / Ngôn ngữ">
              <button type="button" data-lang="vi" aria-pressed="${activeLanguage === "vi"}">Tiếng Việt</button>
              <button type="button" data-lang="en" aria-pressed="${activeLanguage === "en"}">English</button>
            </div>
            <button id="ee-color-back" class="back-btn" type="button">← Tools</button>
          </div>
        </div>
        <section class="ee-color-shell" aria-label="${ui.toolDescription}">
          <div class="ee-color-tabs" role="tablist" aria-label="${ui.chooseSystem}">
            <button class="ee-color-tab${activeMode === "rgb" ? " is-active" : ""}" type="button" role="tab" aria-selected="${activeMode === "rgb"}" data-mode="rgb">🌈 RGB</button>
            <button class="ee-color-tab${activeMode === "cmyk" ? " is-active" : ""}" type="button" role="tab" aria-selected="${activeMode === "cmyk"}" data-mode="cmyk">🖨️ CMYK</button>
          </div>
          <div class="ee-color-work">
            <div class="ee-color-panel">
              <h2 id="ee-color-mode-title" class="ee-color-mode-title"></h2>
              <p id="ee-color-mode-desc" class="ee-color-mode-desc"></p>
              <div id="ee-color-components" class="ee-color-components"></div>
              <div id="ee-color-ratio" class="ee-color-ratio"></div>
              <div class="ee-color-actions"><button id="ee-color-reset" class="ee-color-reset" type="button">${ui.reset}</button></div>
            </div>
            <div class="ee-color-panel ee-color-result-panel">
              <div id="ee-color-swatch" class="ee-color-swatch">
                <div class="ee-color-swatch-label"><strong id="ee-color-swatch-name"></strong><span id="ee-color-swatch-code"></span></div>
              </div>
              <div class="ee-color-name-card"><span>${ui.suggestedName}</span><strong id="ee-color-name"></strong></div>
              <div class="ee-color-info">
                <div class="ee-color-info-card"><span>${ui.hexCode}</span><strong id="ee-color-hex"></strong></div>
                <div class="ee-color-info-card"><span>RGB</span><strong id="ee-color-rgb"></strong></div>
                <div class="ee-color-info-card"><span>CMYK</span><strong id="ee-color-cmyk"></strong></div>
                <div class="ee-color-info-card"><span>${ui.epsilonCode}</span><strong id="ee-color-ee-code"></strong></div>
              </div>
              <div class="ee-color-copy-row">
                <button class="ee-color-copy" type="button" data-copy="hex">${ui.copyHex}</button>
                <button class="ee-color-copy" type="button" data-copy="rgb">${ui.copyRgb}</button>
                <button class="ee-color-copy" type="button" data-copy="cmyk">${ui.copyCmyk}</button>
              </div>
            </div>
          </div>
          <p class="ee-color-note">${ui.note}</p>
        </section>
      </div>`;

    host.querySelector("#ee-color-back")?.addEventListener("click", () => {
      if (activeContext && typeof activeContext.back === "function") activeContext.back();
    });
    host.querySelector(".lang-switch")?.addEventListener("click", handleLanguageClick);
    host.querySelector(".ee-color-tabs")?.addEventListener("click", handleModeClick);
    host.querySelector("#ee-color-components")?.addEventListener("input", handleComponentInput);
    host.querySelector("#ee-color-components")?.addEventListener("change", handleComponentInput);
    host.querySelector("#ee-color-reset")?.addEventListener("click", resetMode);
    host.querySelector(".ee-color-copy-row")?.addEventListener("click", handleCopy);
    renderMode();
  }

  function handleLanguageClick(event) {
    const button = event.target.closest("button[data-lang]");
    if (!button) return;
    const next = button.dataset.lang === "en" ? "en" : "vi";
    if (next === activeLanguage) return;
    // Keep sliders, color ratios and the selected color system unchanged.
    activeLanguage = next;
    renderPage();
    const selected = activeContext?.host?.querySelector(`button[data-lang="${activeLanguage}"]`);
    if (selected && typeof selected.focus === "function") selected.focus({ preventScroll: true });
  }

  function handleModeClick(event) {
    const button = event.target.closest("button[data-mode]");
    if (!button) return;
    const next = button.dataset.mode;
    if (!MODE_CONFIG[next] || next === activeMode) return;
    activeMode = next;
    activeContext.host.querySelectorAll(".ee-color-tab").forEach((item) => {
      const selected = item.dataset.mode === activeMode;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    renderMode();
  }

  function renderMode() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    const cfg = MODE_CONFIG[activeMode];
    const ui = currentUi();
    host.querySelector("#ee-color-mode-title").textContent = `${cfg.title} — ${ui.basicColors}`;
    host.querySelector("#ee-color-mode-desc").textContent = `${activeLanguage === "en" ? cfg.subtitleEn : cfg.subtitle} ${ui.normalizationHelp}`;
    host.querySelector("#ee-color-components").innerHTML = cfg.components.map((item) => componentHtml(item, state[activeMode][item.key])).join("");
    updateColor();
  }

  function componentHtml(item, value) {
    const name = activeLanguage === "en" ? item.nameEn : item.name;
    const ui = currentUi();
    return `
      <div class="ee-color-component" data-component="${item.key}">
        <div class="ee-color-component-name">
          <span class="ee-color-chip" style="background:${item.css}"></span>
          <span class="ee-color-short">${item.short}</span>
          <span>${name}</span>
        </div>
        <input class="ee-color-range" type="range" min="0" max="100" step="1" value="${value}" data-role="range" data-key="${item.key}" aria-label="${ui.componentRatio} ${name}">
        <div class="ee-color-value-wrap">
          <input class="ee-color-value" type="number" min="0" max="100" step="1" value="${value}" data-role="number" data-key="${item.key}" aria-label="${ui.componentRatioNumber} ${name}">
          <span class="ee-color-percent">%</span>
        </div>
      </div>`;
  }

  function handleComponentInput(event) {
    const input = event.target.closest("input[data-key]");
    if (!input) return;
    const key = input.dataset.key;
    const value = clampPercent(input.value);
    state[activeMode][key] = value;
    const row = input.closest("[data-component]");
    const other = row?.querySelector(input.dataset.role === "range" ? 'input[data-role="number"]' : 'input[data-role="range"]');
    if (other) other.value = String(value);
    if (input.dataset.role === "number" && input.value !== "") input.value = String(value);
    updateColor();
  }

  function clampPercent(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(100, n));
  }

  function normalizedPercentages(values, keys) {
    const nums = keys.map((key) => clampPercent(values[key]));
    const max = Math.max(...nums);
    if (max <= 0) return keys.reduce((acc, key) => { acc[key] = 0; return acc; }, {});
    return keys.reduce((acc, key, index) => {
      acc[key] = nums[index] / max * 100;
      return acc;
    }, {});
  }

  function rgbFromCurrentMode() {
    if (activeMode === "rgb") {
      const p = normalizedPercentages(state.rgb, ["r", "g", "b"]);
      return {
        r: Math.round(255 * p.r / 100),
        g: Math.round(255 * p.g / 100),
        b: Math.round(255 * p.b / 100)
      };
    }
    const p = normalizedPercentages(state.cmyk, ["c", "m", "y", "k"]);
    const c = p.c / 100, m = p.m / 100, y = p.y / 100, k = p.k / 100;
    return {
      r: Math.round(255 * (1 - c) * (1 - k)),
      g: Math.round(255 * (1 - m) * (1 - k)),
      b: Math.round(255 * (1 - y) * (1 - k))
    };
  }

  function rgbToCmyk(rgb) {
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const k = 1 - Math.max(r, g, b);
    if (k >= 0.999999) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: (1 - r - k) / (1 - k) * 100,
      m: (1 - g - k) / (1 - k) * 100,
      y: (1 - b - k) / (1 - k) * 100,
      k: k * 100
    };
  }

  function updateColor() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    const cfg = MODE_CONFIG[activeMode];
    const keys = cfg.components.map((item) => item.key);
    const normalized = normalizedPercentages(state[activeMode], keys);
    const rgb = rgbFromCurrentMode();
    const cmyk = rgbToCmyk(rgb);
    const hex = rgbToHex(rgb);
    const colorName = nearestPaintName(rgb);
    const ratioText = keys.map((key) => `${key.toUpperCase()} ${formatPct(state[activeMode][key])}`).join(" : ");
    const normalizedText = keys.map((key) => `${key.toUpperCase()} ${formatPct(normalized[key])}%`).join(" · ");

    const ui = currentUi();
    host.querySelector("#ee-color-ratio").textContent = `${ui.ratioLabel}: ${ratioText}  →  ${ui.normalizedLabel}: ${normalizedText}`;
    host.querySelector("#ee-color-swatch").style.background = hex;
    host.querySelector("#ee-color-swatch-name").textContent = colorName;
    host.querySelector("#ee-color-swatch-code").textContent = hex;
    host.querySelector("#ee-color-name").textContent = colorName;
    host.querySelector("#ee-color-hex").textContent = hex;
    host.querySelector("#ee-color-rgb").textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    host.querySelector("#ee-color-cmyk").textContent = `C ${formatPct(cmyk.c)}% · M ${formatPct(cmyk.m)}% · Y ${formatPct(cmyk.y)}% · K ${formatPct(cmyk.k)}%`;
    host.querySelector("#ee-color-ee-code").textContent = `EE-${hex.slice(1)}`;

    const label = host.querySelector(".ee-color-swatch-label");
    if (label) {
      const light = perceivedLightness(rgb) > 155;
      label.style.background = light ? "rgba(255,255,255,.86)" : "rgba(255,255,255,.90)";
    }
  }

  function formatPct(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return "0";
    const rounded = Math.round(n * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }

  function resetMode() {
    if (activeMode === "rgb") state.rgb = { r: 100, g: 40, b: 60 };
    else state.cmyk = { c: 60, m: 20, y: 0, k: 0 };
    renderMode();
  }

  function handleCopy(event) {
    const button = event.target.closest("button[data-copy]");
    if (!button) return;
    const host = activeContext && activeContext.host;
    if (!host) return;
    let text = "";
    if (button.dataset.copy === "hex") text = host.querySelector("#ee-color-hex")?.textContent || "";
    if (button.dataset.copy === "rgb") text = host.querySelector("#ee-color-rgb")?.textContent || "";
    if (button.dataset.copy === "cmyk") text = host.querySelector("#ee-color-cmyk")?.textContent || "";
    if (!text) return;
    copyText(text).then(() => showToast(currentUi().copied), () => showToast(currentUi().copyFailed));
  }

  function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        ok ? resolve() : reject(new Error("COPY_FAILED"));
      } catch (error) { reject(error); }
    });
  }

  function showToast(message) {
    if (activeContext && activeContext.hooks && typeof activeContext.hooks.showToast === "function") {
      activeContext.hooks.showToast(String(message || ""));
    }
  }

  function rgbToHex(rgb) {
    const part = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0").toUpperCase();
    return `#${part(rgb.r)}${part(rgb.g)}${part(rgb.b)}`;
  }

  function hexToRgb(hex) {
    const clean = String(hex || "").replace("#", "");
    return {
      r: parseInt(clean.slice(0, 2), 16) || 0,
      g: parseInt(clean.slice(2, 4), 16) || 0,
      b: parseInt(clean.slice(4, 6), 16) || 0
    };
  }

  function nearestPaintName(rgb) {
    let best = PAINT_NAMES[0];
    let bestDistance = Infinity;
    for (const item of PAINT_NAMES) {
      const dr = rgb.r - item.rgb.r;
      const dg = rgb.g - item.rgb.g;
      const db = rgb.b - item.rgb.b;
      const distance = 0.30 * dr * dr + 0.59 * dg * dg + 0.11 * db * db;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = item;
      }
    }
    return activeLanguage === "en" ? best.nameEn : best.name;
  }

  function perceivedLightness(rgb) {
    return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  }

  function destroy() {
    activeContext = null;
    activeMode = "rgb";
    activeLanguage = "vi";
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
