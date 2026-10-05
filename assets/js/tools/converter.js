(() => {
  "use strict";

  const MODULE_KEY = "converter";
  const STYLE_ID = "class1-tools-converter-style";
  let activeContext = null;
  let currentGroup = "length";

  const GROUPS = Object.freeze({
    length: Object.freeze({
      icon: "📏", label: "Chiều dài", base: "m",
      units: Object.freeze([
        { id: "mm", label: "Milimét", symbol: "mm", factor: 0.001 },
        { id: "cm", label: "Centimét", symbol: "cm", factor: 0.01 },
        { id: "m", label: "Mét", symbol: "m", factor: 1 },
        { id: "km", label: "Kilômét", symbol: "km", factor: 1000 },
        { id: "in", label: "Inch", symbol: "in", factor: 0.0254 },
        { id: "ft", label: "Foot", symbol: "ft", factor: 0.3048 },
        { id: "yd", label: "Yard", symbol: "yd", factor: 0.9144 },
        { id: "mi", label: "Mile", symbol: "mi", factor: 1609.344 }
      ]),
      defaults: ["m", "mm"],
      quick: [["in", "m"], ["m", "mm"], ["cm", "in"], ["km", "mi"]]
    }),
    area: Object.freeze({
      icon: "◻️", label: "Diện tích", base: "m²",
      units: Object.freeze([
        { id: "mm2", label: "Milimét vuông", symbol: "mm²", factor: 1e-6 },
        { id: "cm2", label: "Centimét vuông", symbol: "cm²", factor: 1e-4 },
        { id: "m2", label: "Mét vuông", symbol: "m²", factor: 1 },
        { id: "km2", label: "Kilômét vuông", symbol: "km²", factor: 1e6 },
        { id: "in2", label: "Inch vuông", symbol: "in²", factor: 0.00064516 },
        { id: "ft2", label: "Foot vuông", symbol: "ft²", factor: 0.09290304 },
        { id: "yd2", label: "Yard vuông", symbol: "yd²", factor: 0.83612736 },
        { id: "ha", label: "Hecta", symbol: "ha", factor: 10000 },
        { id: "acre", label: "Acre", symbol: "acre", factor: 4046.8564224 }
      ]),
      defaults: ["m2", "cm2"],
      quick: [["m2", "cm2"], ["m2", "ft2"], ["ha", "m2"], ["acre", "m2"]]
    }),
    volume: Object.freeze({
      icon: "🧪", label: "Thể tích", base: "L",
      units: Object.freeze([
        { id: "ml", label: "Mililít", symbol: "mL", factor: 0.001 },
        { id: "cm3", label: "Centimét khối", symbol: "cm³", factor: 0.001 },
        { id: "l", label: "Lít", symbol: "L", factor: 1 },
        { id: "m3", label: "Mét khối", symbol: "m³", factor: 1000 },
        { id: "in3", label: "Inch khối", symbol: "in³", factor: 0.016387064 },
        { id: "ft3", label: "Foot khối", symbol: "ft³", factor: 28.316846592 },
        { id: "gal_us", label: "Gallon Mỹ", symbol: "US gal", factor: 3.785411784 }
      ]),
      defaults: ["l", "ml"],
      quick: [["l", "ml"], ["m3", "l"], ["in3", "cm3"], ["gal_us", "l"]]
    }),
    mass: Object.freeze({
      icon: "⚖️", label: "Khối lượng", base: "kg",
      units: Object.freeze([
        { id: "mg", label: "Miligam", symbol: "mg", factor: 1e-6 },
        { id: "g", label: "Gam", symbol: "g", factor: 0.001 },
        { id: "kg", label: "Kilôgam", symbol: "kg", factor: 1 },
        { id: "t", label: "Tấn", symbol: "t", factor: 1000 },
        { id: "oz", label: "Ounce", symbol: "oz", factor: 0.028349523125 },
        { id: "lb", label: "Pound", symbol: "lb", factor: 0.45359237 }
      ]),
      defaults: ["kg", "g"],
      quick: [["kg", "g"], ["kg", "lb"], ["lb", "kg"], ["t", "kg"]]
    }),
    temperature: Object.freeze({
      icon: "🌡️", label: "Nhiệt độ", base: "°C",
      units: Object.freeze([
        { id: "c", label: "Độ C", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
        { id: "f", label: "Độ F", symbol: "°F", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
        { id: "k", label: "Kelvin", symbol: "K", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 }
      ]),
      defaults: ["c", "f"],
      quick: [["c", "f"], ["f", "c"], ["c", "k"], ["k", "c"]]
    }),
    speed: Object.freeze({
      icon: "🚗", label: "Tốc độ", base: "m/s",
      units: Object.freeze([
        { id: "ms", label: "Mét/giây", symbol: "m/s", factor: 1 },
        { id: "kmh", label: "Kilômét/giờ", symbol: "km/h", factor: 1 / 3.6 },
        { id: "mph", label: "Mile/giờ", symbol: "mph", factor: 0.44704 },
        { id: "fts", label: "Foot/giây", symbol: "ft/s", factor: 0.3048 },
        { id: "kn", label: "Hải lý/giờ", symbol: "kn", factor: 0.5144444444444445 }
      ]),
      defaults: ["kmh", "ms"],
      quick: [["kmh", "ms"], ["ms", "kmh"], ["mph", "kmh"], ["kn", "kmh"]]
    }),
    time: Object.freeze({
      icon: "⏱️", label: "Thời gian", base: "s",
      units: Object.freeze([
        { id: "ms", label: "Mili giây", symbol: "ms", factor: 0.001 },
        { id: "s", label: "Giây", symbol: "s", factor: 1 },
        { id: "min", label: "Phút", symbol: "min", factor: 60 },
        { id: "h", label: "Giờ", symbol: "h", factor: 3600 },
        { id: "day", label: "Ngày", symbol: "ngày", factor: 86400 }
      ]),
      defaults: ["h", "min"],
      quick: [["h", "min"], ["min", "s"], ["day", "h"], ["s", "ms"]]
    }),
    pressure: Object.freeze({
      icon: "🧭", label: "Áp suất", base: "Pa",
      units: Object.freeze([
        { id: "pa", label: "Pascal", symbol: "Pa", factor: 1 },
        { id: "kpa", label: "Kilopascal", symbol: "kPa", factor: 1000 },
        { id: "mpa", label: "Megapascal", symbol: "MPa", factor: 1e6 },
        { id: "bar", label: "Bar", symbol: "bar", factor: 1e5 },
        { id: "psi", label: "PSI", symbol: "psi", factor: 6894.757293168 },
        { id: "atm", label: "Atmosphere", symbol: "atm", factor: 101325 }
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
    return group.units.map((unit) => `<option value="${unit.id}"${unit.id === selectedId ? " selected" : ""}>${unit.label} (${unit.symbol})</option>`).join("");
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    if (!activeContext || !activeContext.host) return;
    renderPage();
  }

  function renderPage() {
    const host = activeContext.host;
    const group = groupConfig();
    const [fromDefault, toDefault] = group.defaults;
    host.innerHTML = `
      <div class="ee-converter-page">
        <div class="section-heading">
          <div><h1>📐 Đổi đơn vị đo</h1><p>Đổi nhanh các đơn vị đo thông dụng.</p></div>
          <button id="ee-converter-back" class="back-btn" type="button">← Tools</button>
        </div>
        <section class="ee-converter-shell" aria-label="Công cụ đổi đơn vị đo">
          <div id="ee-converter-tabs" class="ee-converter-tabs">
            ${Object.entries(GROUPS).map(([id, cfg]) => `<button class="ee-converter-tab${id === currentGroup ? " is-active" : ""}" type="button" data-group="${id}"><span class="ee-converter-tab-icon" aria-hidden="true">${cfg.icon}</span><span>${cfg.label}</span></button>`).join("")}
          </div>
          <div class="ee-converter-work">
            <div class="ee-unit-box">
              <label class="ee-unit-label" for="ee-converter-from-unit">Từ đơn vị</label>
              <select id="ee-converter-from-unit" class="ee-unit-select">${optionsHtml(group, fromDefault)}</select>
              <div class="ee-unit-value-wrap">
                <input id="ee-converter-input" class="ee-unit-input" inputmode="decimal" autocomplete="off" value="1" aria-label="Giá trị cần đổi">
                <span id="ee-converter-from-symbol" class="ee-unit-symbol"></span>
              </div>
            </div>
            <button id="ee-converter-swap" class="ee-converter-swap" type="button" aria-label="Đổi vị trí hai đơn vị" title="Đổi vị trí">⇄</button>
            <div class="ee-unit-box">
              <label class="ee-unit-label" for="ee-converter-to-unit">Sang đơn vị</label>
              <select id="ee-converter-to-unit" class="ee-unit-select">${optionsHtml(group, toDefault)}</select>
              <div class="ee-unit-value-wrap">
                <div id="ee-converter-output" class="ee-unit-output" aria-live="polite">0</div>
                <span id="ee-converter-to-symbol" class="ee-unit-symbol"></span>
              </div>
            </div>
          </div>
          <div id="ee-converter-reference" class="ee-converter-reference"></div>
          <div class="ee-converter-quick-title">Đổi nhanh</div>
          <div id="ee-converter-quick" class="ee-converter-quick"></div>
          <p class="ee-converter-note">Dùng dấu chấm cho phần thập phân và dấu phẩy để phân tách hàng nghìn, ví dụ 1,234.56.</p>
        </section>
      </div>`;

    host.querySelector("#ee-converter-back")?.addEventListener("click", () => {
      if (activeContext && typeof activeContext.back === "function") activeContext.back();
    });
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
    if (fromSymbol) fromSymbol.textContent = fromUnit.symbol;
    if (toSymbol) toSymbol.textContent = toUnit.symbol;

    const value = parseInput(input.value);
    if (value === null) {
      output.textContent = "—";
    } else if (Number.isNaN(value)) {
      output.textContent = "Giá trị chưa hợp lệ";
    } else {
      output.textContent = formatNumber(convertValue(value, fromUnit, toUnit));
    }

    if (reference) {
      const oneConverted = convertValue(1, fromUnit, toUnit);
      reference.textContent = `1 ${fromUnit.symbol} = ${formatNumber(oneConverted)} ${toUnit.symbol}`;
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
    fromSelect.value = toSelect.value;
    toSelect.value = oldFrom;
    if (output.textContent && output.textContent !== "—" && output.textContent !== "Giá trị chưa hợp lệ") {
      input.value = output.textContent;
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
      return `<button class="ee-converter-quick-btn" type="button" data-from="${fromId}" data-to="${toId}">${from.symbol} ↔ ${to.symbol}</button>`;
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
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
