(() => {
  "use strict";

  const MODULE_KEY = "converter";
  const STYLE_ID = "class1-tools-converter-style";
  let activeContext = null;
  let currentGroup = "length";
  let activeLanguage = "vi";

  const UI_TEXT = Object.freeze({
    vi: Object.freeze({
      heading: "📐 Đổi đơn vị đo",
      description: "Đổi nhanh các đơn vị đo thông dụng.",
      toolLabel: "Công cụ đổi đơn vị đo",
      groupLabel: "Chọn loại đơn vị đo",
      fromUnit: "Từ đơn vị",
      toUnit: "Sang đơn vị",
      inputLabel: "Giá trị cần đổi",
      outputLabel: "Giá trị đã đổi",
      swapLabel: "Đổi vị trí hai đơn vị",
      swapTitle: "Đổi vị trí",
      quickTitle: "Đổi nhanh",
      note: "Dùng dấu chấm cho phần thập phân và dấu phẩy để phân tách hàng nghìn, ví dụ 1,234.56.",
      invalid: "Giá trị chưa hợp lệ"
    }),
    en: Object.freeze({
      heading: "📐 Unit Converter",
      description: "Quickly convert between common units of measurement.",
      toolLabel: "Unit conversion tool",
      groupLabel: "Choose a measurement category",
      fromUnit: "From unit",
      toUnit: "To unit",
      inputLabel: "Value to convert",
      outputLabel: "Converted value",
      swapLabel: "Swap the two units",
      swapTitle: "Swap units",
      quickTitle: "Quick conversions",
      note: "Use a period for decimals and a comma to separate thousands, for example 1,234.56.",
      invalid: "Invalid value"
    })
  });

  function currentUi() {
    return UI_TEXT[activeLanguage];
  }

  function unitLabel(unit) {
    return activeLanguage === "en" ? unit.labelEn : unit.label;
  }

  function unitSymbol(unit) {
    return activeLanguage === "en" && unit.symbolEn ? unit.symbolEn : unit.symbol;
  }

  const GROUPS = Object.freeze({
    length: Object.freeze({
      icon: "📏", label: "Chiều dài", labelEn: "Length", base: "m",
      units: Object.freeze([
        { id: "mm", label: "Milimét", labelEn: "Millimeter", symbol: "mm", factor: 0.001 },
        { id: "cm", label: "Centimét", labelEn: "Centimeter", symbol: "cm", factor: 0.01 },
        { id: "m", label: "Mét", labelEn: "Meter", symbol: "m", factor: 1 },
        { id: "km", label: "Kilômét", labelEn: "Kilometer", symbol: "km", factor: 1000 },
        { id: "in", label: "Inch", labelEn: "Inch", symbol: "in", factor: 0.0254 },
        { id: "ft", label: "Foot", labelEn: "Foot", symbol: "ft", factor: 0.3048 },
        { id: "yd", label: "Yard", labelEn: "Yard", symbol: "yd", factor: 0.9144 },
        { id: "mi", label: "Mile", labelEn: "Mile", symbol: "mi", factor: 1609.344 }
      ]),
      defaults: ["m", "mm"],
      quick: [["in", "m"], ["m", "mm"], ["cm", "in"], ["km", "mi"]]
    }),
    area: Object.freeze({
      icon: "◻️", label: "Diện tích", labelEn: "Area", base: "m²",
      units: Object.freeze([
        { id: "mm2", label: "Milimét vuông", labelEn: "Square millimeter", symbol: "mm²", factor: 1e-6 },
        { id: "cm2", label: "Centimét vuông", labelEn: "Square centimeter", symbol: "cm²", factor: 1e-4 },
        { id: "m2", label: "Mét vuông", labelEn: "Square meter", symbol: "m²", factor: 1 },
        { id: "km2", label: "Kilômét vuông", labelEn: "Square kilometer", symbol: "km²", factor: 1e6 },
        { id: "in2", label: "Inch vuông", labelEn: "Square inch", symbol: "in²", factor: 0.00064516 },
        { id: "ft2", label: "Foot vuông", labelEn: "Square foot", symbol: "ft²", factor: 0.09290304 },
        { id: "yd2", label: "Yard vuông", labelEn: "Square yard", symbol: "yd²", factor: 0.83612736 },
        { id: "ha", label: "Hecta", labelEn: "Hectare", symbol: "ha", factor: 10000 },
        { id: "acre", label: "Acre", labelEn: "Acre", symbol: "acre", factor: 4046.8564224 }
      ]),
      defaults: ["m2", "cm2"],
      quick: [["m2", "cm2"], ["m2", "ft2"], ["ha", "m2"], ["acre", "m2"]]
    }),
    volume: Object.freeze({
      icon: "🧪", label: "Thể tích", labelEn: "Volume", base: "L",
      units: Object.freeze([
        { id: "ml", label: "Mililít", labelEn: "Milliliter", symbol: "mL", factor: 0.001 },
        { id: "cm3", label: "Centimét khối", labelEn: "Cubic centimeter", symbol: "cm³", factor: 0.001 },
        { id: "l", label: "Lít", labelEn: "Liter", symbol: "L", factor: 1 },
        { id: "m3", label: "Mét khối", labelEn: "Cubic meter", symbol: "m³", factor: 1000 },
        { id: "in3", label: "Inch khối", labelEn: "Cubic inch", symbol: "in³", factor: 0.016387064 },
        { id: "ft3", label: "Foot khối", labelEn: "Cubic foot", symbol: "ft³", factor: 28.316846592 },
        { id: "gal_us", label: "Gallon Mỹ", labelEn: "US gallon", symbol: "US gal", factor: 3.785411784 }
      ]),
      defaults: ["l", "ml"],
      quick: [["l", "ml"], ["m3", "l"], ["in3", "cm3"], ["gal_us", "l"]]
    }),
    mass: Object.freeze({
      icon: "⚖️", label: "Khối lượng", labelEn: "Mass", base: "kg",
      units: Object.freeze([
        { id: "mg", label: "Miligam", labelEn: "Milligram", symbol: "mg", factor: 1e-6 },
        { id: "g", label: "Gam", labelEn: "Gram", symbol: "g", factor: 0.001 },
        { id: "kg", label: "Kilôgam", labelEn: "Kilogram", symbol: "kg", factor: 1 },
        { id: "t", label: "Tấn", labelEn: "Metric ton", symbol: "t", factor: 1000 },
        { id: "oz", label: "Ounce", labelEn: "Ounce", symbol: "oz", factor: 0.028349523125 },
        { id: "lb", label: "Pound", labelEn: "Pound", symbol: "lb", factor: 0.45359237 }
      ]),
      defaults: ["kg", "g"],
      quick: [["kg", "g"], ["kg", "lb"], ["lb", "kg"], ["t", "kg"]]
    }),
    temperature: Object.freeze({
      icon: "🌡️", label: "Nhiệt độ", labelEn: "Temperature", base: "°C",
      units: Object.freeze([
        { id: "c", label: "Độ C", labelEn: "Degree Celsius", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
        { id: "f", label: "Độ F", labelEn: "Degree Fahrenheit", symbol: "°F", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
        { id: "k", label: "Kelvin", labelEn: "Kelvin", symbol: "K", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 }
      ]),
      defaults: ["c", "f"],
      quick: [["c", "f"], ["f", "c"], ["c", "k"], ["k", "c"]]
    }),
    speed: Object.freeze({
      icon: "🚗", label: "Tốc độ", labelEn: "Speed", base: "m/s",
      units: Object.freeze([
        { id: "ms", label: "Mét/giây", labelEn: "Meters per second", symbol: "m/s", factor: 1 },
        { id: "kmh", label: "Kilômét/giờ", labelEn: "Kilometers per hour", symbol: "km/h", factor: 1 / 3.6 },
        { id: "mph", label: "Mile/giờ", labelEn: "Miles per hour", symbol: "mph", factor: 0.44704 },
        { id: "fts", label: "Foot/giây", labelEn: "Feet per second", symbol: "ft/s", factor: 0.3048 },
        { id: "kn", label: "Hải lý/giờ", labelEn: "Knots (nautical miles per hour)", symbol: "kn", factor: 0.5144444444444445 }
      ]),
      defaults: ["kmh", "ms"],
      quick: [["kmh", "ms"], ["ms", "kmh"], ["mph", "kmh"], ["kn", "kmh"]]
    }),
    time: Object.freeze({
      icon: "⏱️", label: "Thời gian", labelEn: "Time", base: "s",
      units: Object.freeze([
        { id: "ms", label: "Mili giây", labelEn: "Millisecond", symbol: "ms", factor: 0.001 },
        { id: "s", label: "Giây", labelEn: "Second", symbol: "s", factor: 1 },
        { id: "min", label: "Phút", labelEn: "Minute", symbol: "min", factor: 60 },
        { id: "h", label: "Giờ", labelEn: "Hour", symbol: "h", factor: 3600 },
        { id: "day", label: "Ngày", labelEn: "Day", symbol: "ngày", symbolEn: "day", factor: 86400 }
      ]),
      defaults: ["h", "min"],
      quick: [["h", "min"], ["min", "s"], ["day", "h"], ["s", "ms"]]
    }),
    pressure: Object.freeze({
      icon: "🧭", label: "Áp suất", labelEn: "Pressure", base: "Pa",
      units: Object.freeze([
        { id: "pa", label: "Pascal", labelEn: "Pascal", symbol: "Pa", factor: 1 },
        { id: "kpa", label: "Kilopascal", labelEn: "Kilopascal", symbol: "kPa", factor: 1000 },
        { id: "mpa", label: "Megapascal", labelEn: "Megapascal", symbol: "MPa", factor: 1e6 },
        { id: "bar", label: "Bar", labelEn: "Bar", symbol: "bar", factor: 1e5 },
        { id: "psi", label: "PSI", labelEn: "PSI", symbol: "psi", factor: 6894.757293168 },
        { id: "atm", label: "Atmosphere", labelEn: "Standard atmosphere", symbol: "atm", factor: 101325 }
      ]),
      defaults: ["mpa", "bar"],
      quick: [["mpa", "bar"], ["bar", "psi"], ["psi", "kpa"], ["atm", "kpa"]]
    })
  });

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-converter-page{max-width:980px;margin:0 auto}
      .ee-converter-heading{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:.7rem}
      .ee-converter-heading-copy{min-width:0;flex:1 1 280px}
      .ee-converter-heading-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:.55rem;margin-left:auto}
      .ee-converter-page .lang-switch{display:inline-flex;gap:4px;padding:3px;border:1px solid #BFDBFE;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:0 0 auto}
      .ee-converter-page .lang-switch button{min-height:38px;padding:0 13px;border:0;border-radius:10px;background:transparent;color:#475569;font-size:14px;font-weight:900;line-height:1.15;white-space:nowrap;cursor:pointer}
      .ee-converter-page .lang-switch button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3B82F6,#10B981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
      .ee-converter-page .lang-switch button:focus-visible{outline:3px solid rgba(59,130,246,.25);outline-offset:2px}
      .ee-converter-page .ee-unit-input,.ee-converter-page .ee-unit-output,.ee-converter-page .ee-unit-select{box-sizing:border-box;min-width:0;max-width:100%}
      .ee-converter-shell{border:1px solid #C4B5FD;border-radius:24px;background:linear-gradient(145deg,#FFFDFE,#F7F3FF);box-shadow:0 10px 26px rgba(76,29,149,.08);padding:1rem}
      .ee-converter-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.55rem;margin-bottom:.85rem}
      .ee-converter-tab{min-height:54px;border:1px solid #E9D5FF;border-radius:15px;background:#fff;color:#6D28D9;font-weight:950;padding:.45rem .5rem;display:flex;align-items:center;justify-content:center;gap:.38rem;box-shadow:0 3px 9px rgba(76,29,149,.05)}
      .ee-converter-tab:hover{background:#FAF5FF}
      .ee-converter-tab.is-active{color:#fff;border-color:#8B5CF6;background:linear-gradient(90deg,#A855F7,#7C3AED);box-shadow:0 6px 14px rgba(124,58,237,.18)}
      .ee-converter-tab-icon{font-size:19px;line-height:1}
      .ee-converter-work{display:grid;grid-template-columns:minmax(0,1fr) 62px minmax(0,1fr);gap:.75rem;align-items:end;padding:.9rem;border:1px solid #E9D5FF;border-radius:20px;background:rgba(255,255,255,.86)}
      .ee-unit-box{min-width:0}
      .ee-unit-label{display:block;margin:0 0 .35rem;color:#5B216E;font-size:15px;font-weight:950}
      .ee-unit-select{width:100%;height:44px;border:1.5px solid #C4B5FD;border-radius:13px;background:#FAF5FF;color:#4C1D95;padding:0 .68rem;font-size:14px;font-weight:900;outline:none}
      .ee-unit-select:focus,.ee-unit-input:focus{border-color:#8B5CF6;box-shadow:0 0 0 3px rgba(139,92,246,.10)}
      .ee-unit-value-wrap{position:relative;margin-top:.55rem}
      .ee-unit-input,.ee-unit-output{width:100%;height:62px;border:1.5px solid #D8B4FE;border-radius:16px;background:#fff;color:#111827;padding:0 4.2rem 0 .9rem;font-size:24px;font-weight:950;outline:none;font-variant-numeric:tabular-nums}
      .ee-unit-output{display:flex;align-items:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#7C3AED;background:#FCFAFF}
      .ee-unit-symbol{position:absolute;right:.8rem;top:50%;transform:translateY(-50%);max-width:3.2rem;color:#7C3AED;font-size:13px;font-weight:950;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}
      .ee-converter-swap{width:54px;height:54px;border:0;border-radius:50%;background:linear-gradient(135deg,#EC4899,#8B5CF6);color:#fff;font-size:25px;font-weight:950;box-shadow:0 7px 16px rgba(139,92,246,.20);display:flex;align-items:center;justify-content:center;margin:0 auto 4px;transition:transform .16s ease,filter .16s ease}
      .ee-converter-swap:hover{filter:brightness(1.06);transform:rotate(8deg)}
      .ee-converter-swap:active{transform:scale(.96) rotate(8deg)}
      .ee-converter-reference{margin:.7rem 0 0;padding:.62rem .75rem;border-radius:14px;background:linear-gradient(90deg,#FFF7FB,#FAF5FF);border:1px solid #F3E8FF;color:#5B216E;font-size:15px;font-weight:950;text-align:center;line-height:1.4}
      .ee-converter-quick-title{margin:.9rem 0 .45rem;color:#475467;font-size:14px;font-weight:950}
      .ee-converter-quick{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.5rem}
      .ee-converter-quick-btn{min-height:40px;border:1px solid #D8B4FE;border-radius:13px;background:#fff;color:#6D28D9;font-size:15px;font-weight:950;padding:.35rem .5rem;box-shadow:0 3px 8px rgba(76,29,149,.045)}
      .ee-converter-quick-btn:hover{background:#FAF5FF;border-color:#A78BFA}
      .ee-converter-note{margin:.72rem 0 0;text-align:center;color:#667085;font-size:14px;font-weight:850;line-height:1.45}
      @media(max-width:767px){
        .ee-converter-shell{padding:.75rem;border-radius:20px}
        .ee-converter-tabs{grid-template-columns:repeat(2,minmax(0,1fr));gap:.45rem}
        .ee-converter-tab{min-height:50px;font-size:13px}
        .ee-converter-work{grid-template-columns:1fr;gap:.55rem;padding:.7rem}
        .ee-converter-swap{width:46px;height:46px;font-size:21px;margin:.05rem auto;transform:rotate(90deg)}
        .ee-converter-swap:hover{transform:rotate(98deg)}
        .ee-unit-input,.ee-unit-output{height:57px;font-size:21px}
        .ee-converter-quick{grid-template-columns:repeat(2,minmax(0,1fr))}
      }
      @media(max-width:620px){
        .ee-converter-heading-copy{flex-basis:100%}
        .ee-converter-heading-actions{width:100%;margin-left:0;justify-content:space-between}
        .ee-converter-page .lang-switch{min-width:0}
        .ee-converter-page .lang-switch button{padding:0 10px}
      }
    `;
    document.head.appendChild(style);
  }

  function groupConfig() {
    return GROUPS[currentGroup] || GROUPS.length;
  }

  function unitById(group, id) {
    return group.units.find((unit) => unit.id === id) || group.units[0];
  }

  function optionsHtml(group, selectedId) {
    return group.units.map((unit) => `<option value="${unit.id}"${unit.id === selectedId ? " selected" : ""}>${unitLabel(unit)} (${unitSymbol(unit)})</option>`).join("");
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    if (!activeContext || !activeContext.host) return;
    renderPage();
  }

  function renderPage(preserved = null) {
    const host = activeContext.host;
    const group = groupConfig();
    const [fromDefault, toDefault] = group.defaults;
    const fromSelected = preserved && group.units.some((unit) => unit.id === preserved.fromId) ? preserved.fromId : fromDefault;
    const toSelected = preserved && group.units.some((unit) => unit.id === preserved.toId) ? preserved.toId : toDefault;
    const ui = currentUi();
    host.innerHTML = `
      <div class="ee-converter-page" lang="${activeLanguage}">
        <div class="section-heading ee-converter-heading">
          <div class="ee-converter-heading-copy"><h1>${ui.heading}</h1><p>${ui.description}</p></div>
          <div class="ee-converter-heading-actions">
            <div class="lang-switch" role="group" aria-label="Language / Ngôn ngữ">
              <button type="button" data-lang="vi" aria-pressed="${activeLanguage === "vi"}">Tiếng Việt</button>
              <button type="button" data-lang="en" aria-pressed="${activeLanguage === "en"}">English</button>
            </div>
            <button id="ee-converter-back" class="back-btn" type="button">← Tools</button>
          </div>
        </div>
        <section class="ee-converter-shell" aria-label="${ui.toolLabel}">
          <div id="ee-converter-tabs" class="ee-converter-tabs" role="group" aria-label="${ui.groupLabel}">
            ${Object.entries(GROUPS).map(([id, cfg]) => `<button class="ee-converter-tab${id === currentGroup ? " is-active" : ""}" type="button" data-group="${id}" aria-pressed="${id === currentGroup}"><span class="ee-converter-tab-icon" aria-hidden="true">${cfg.icon}</span><span>${activeLanguage === "en" ? cfg.labelEn : cfg.label}</span></button>`).join("")}
          </div>
          <div class="ee-converter-work">
            <div class="ee-unit-box">
              <label class="ee-unit-label" for="ee-converter-from-unit">${ui.fromUnit}</label>
              <select id="ee-converter-from-unit" class="ee-unit-select">${optionsHtml(group, fromSelected)}</select>
              <div class="ee-unit-value-wrap">
                <input id="ee-converter-input" class="ee-unit-input" inputmode="decimal" autocomplete="off" value="1" aria-label="${ui.inputLabel}">
                <span id="ee-converter-from-symbol" class="ee-unit-symbol"></span>
              </div>
            </div>
            <button id="ee-converter-swap" class="ee-converter-swap" type="button" aria-label="${ui.swapLabel}" title="${ui.swapTitle}">⇄</button>
            <div class="ee-unit-box">
              <label class="ee-unit-label" for="ee-converter-to-unit">${ui.toUnit}</label>
              <select id="ee-converter-to-unit" class="ee-unit-select">${optionsHtml(group, toSelected)}</select>
              <div class="ee-unit-value-wrap">
                <div id="ee-converter-output" class="ee-unit-output" role="status" aria-label="${ui.outputLabel}" aria-live="polite">0</div>
                <span id="ee-converter-to-symbol" class="ee-unit-symbol"></span>
              </div>
            </div>
          </div>
          <div id="ee-converter-reference" class="ee-converter-reference"></div>
          <div class="ee-converter-quick-title">${ui.quickTitle}</div>
          <div id="ee-converter-quick" class="ee-converter-quick"></div>
          <p class="ee-converter-note">${ui.note}</p>
        </section>
      </div>`;

    // Dữ liệu người dùng không được chèn vào innerHTML; giữ nguyên số đã nhập khi đổi ngôn ngữ.
    if (preserved && typeof preserved.inputValue === "string") {
      host.querySelector("#ee-converter-input").value = preserved.inputValue;
    }
    host.querySelector("#ee-converter-back")?.addEventListener("click", () => {
      if (activeContext && typeof activeContext.back === "function") activeContext.back();
    });
    host.querySelector(".lang-switch")?.addEventListener("click", handleLanguageClick);
    host.querySelector("#ee-converter-tabs")?.addEventListener("click", handleGroupClick);
    host.querySelector("#ee-converter-from-unit")?.addEventListener("change", updateConversion);
    host.querySelector("#ee-converter-to-unit")?.addEventListener("change", updateConversion);
    host.querySelector("#ee-converter-input")?.addEventListener("input", updateConversion);
    host.querySelector("#ee-converter-input")?.addEventListener("blur", formatInputOnBlur);
    host.querySelector("#ee-converter-swap")?.addEventListener("click", swapUnits);
    host.querySelector("#ee-converter-quick")?.addEventListener("click", handleQuickPair);
    renderQuickPairs();
    updateConversion();
  }

  function handleLanguageClick(event) {
    const button = event.target.closest("button[data-lang]");
    if (!button) return;
    const next = button.dataset.lang;
    if (!UI_TEXT[next] || next === activeLanguage || !activeContext?.host) return;
    const host = activeContext.host;
    const preserved = {
      fromId: host.querySelector("#ee-converter-from-unit")?.value,
      toId: host.querySelector("#ee-converter-to-unit")?.value,
      inputValue: host.querySelector("#ee-converter-input")?.value ?? "1"
    };
    activeLanguage = next;
    renderPage(preserved);
  }

  function handleGroupClick(event) {
    const button = event.target.closest("button[data-group]");
    if (!button) return;
    const next = String(button.dataset.group || "");
    if (!GROUPS[next] || next === currentGroup) return;
    currentGroup = next;
    renderPage();
  }

  function parseInput(raw) {
    const cleaned = String(raw || "").trim().replace(/,/g, "");
    if (!cleaned || cleaned === "-" || cleaned === "." || cleaned === "-.") return null;
    if (!/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(cleaned)) return NaN;
    const value = Number(cleaned);
    return Number.isFinite(value) ? value : NaN;
  }

  function convertValue(value, fromUnit, toUnit) {
    if (typeof fromUnit.toBase === "function" && typeof toUnit.fromBase === "function") {
      return toUnit.fromBase(fromUnit.toBase(value));
    }
    return value * Number(fromUnit.factor) / Number(toUnit.factor);
  }

  function formatNumber(value) {
    if (!Number.isFinite(value)) return "—";
    if (Object.is(value, -0) || Math.abs(value) < 1e-15) return "0";
    const abs = Math.abs(value);
    if (abs >= 1e15 || (abs > 0 && abs < 1e-10)) {
      return value.toExponential(8).replace(/\.0+e/, "e").replace(/(\.\d*?[1-9])0+e/, "$1e");
    }
    return new Intl.NumberFormat("en-US", {
      useGrouping: true,
      maximumSignificantDigits: 12
    }).format(value);
  }

  function updateConversion() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    const group = groupConfig();
    const fromSelect = host.querySelector("#ee-converter-from-unit");
    const toSelect = host.querySelector("#ee-converter-to-unit");
    const input = host.querySelector("#ee-converter-input");
    const output = host.querySelector("#ee-converter-output");
    const fromSymbol = host.querySelector("#ee-converter-from-symbol");
    const toSymbol = host.querySelector("#ee-converter-to-symbol");
    const reference = host.querySelector("#ee-converter-reference");
    if (!fromSelect || !toSelect || !input || !output) return;

    const fromUnit = unitById(group, fromSelect.value);
    const toUnit = unitById(group, toSelect.value);
    if (fromSymbol) fromSymbol.textContent = unitSymbol(fromUnit);
    if (toSymbol) toSymbol.textContent = unitSymbol(toUnit);

    const value = parseInput(input.value);
    if (value === null) {
      output.textContent = "—";
    } else if (Number.isNaN(value)) {
      output.textContent = currentUi().invalid;
    } else {
      output.textContent = formatNumber(convertValue(value, fromUnit, toUnit));
    }

    if (reference) {
      const oneConverted = convertValue(1, fromUnit, toUnit);
      reference.textContent = `1 ${unitSymbol(fromUnit)} = ${formatNumber(oneConverted)} ${unitSymbol(toUnit)}`;
    }
  }

  function formatInputOnBlur() {
    const host = activeContext && activeContext.host;
    const input = host?.querySelector("#ee-converter-input");
    if (!input) return;
    const value = parseInput(input.value);
    if (value !== null && !Number.isNaN(value)) input.value = formatNumber(value);
  }

  function swapUnits() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    const fromSelect = host.querySelector("#ee-converter-from-unit");
    const toSelect = host.querySelector("#ee-converter-to-unit");
    const input = host.querySelector("#ee-converter-input");
    const output = host.querySelector("#ee-converter-output");
    if (!fromSelect || !toSelect || !input || !output) return;
    const oldFrom = fromSelect.value;
    const oldTo = toSelect.value;
    fromSelect.value = oldTo;
    toSelect.value = oldFrom;
    const value = parseInput(input.value);
    if (value !== null && Number.isFinite(value)) {
      const group = groupConfig();
      input.value = formatNumber(convertValue(value, unitById(group, oldFrom), unitById(group, oldTo)));
    }
    updateConversion();
  }

  function renderQuickPairs() {
    const host = activeContext && activeContext.host;
    const quickHost = host?.querySelector("#ee-converter-quick");
    if (!quickHost) return;
    const group = groupConfig();
    quickHost.innerHTML = group.quick.map(([fromId, toId]) => {
      const from = unitById(group, fromId);
      const to = unitById(group, toId);
      return `<button class="ee-converter-quick-btn" type="button" data-from="${fromId}" data-to="${toId}">${unitSymbol(from)} ↔ ${unitSymbol(to)}</button>`;
    }).join("");
  }

  function handleQuickPair(event) {
    const button = event.target.closest("button[data-from][data-to]");
    if (!button) return;
    const host = activeContext && activeContext.host;
    const fromSelect = host?.querySelector("#ee-converter-from-unit");
    const toSelect = host?.querySelector("#ee-converter-to-unit");
    if (!fromSelect || !toSelect) return;
    fromSelect.value = button.dataset.from;
    toSelect.value = button.dataset.to;
    updateConversion();
  }

  function destroy() {
    activeContext = null;
    currentGroup = "length";
    activeLanguage = "vi";
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
