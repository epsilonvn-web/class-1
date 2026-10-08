(() => {
  "use strict";

  const MODULE_KEY = "geometryArea";
  const STYLE_ID = "class1-tools-geometry-area-style";
  let activeContext = null;
  let currentShape = "rectangle";
  let activeLanguage = "vi";

  const LENGTH_UNITS = Object.freeze([
    { id: "mm", label: "Milimét", symbol: "mm", factor: 0.001 },
    { id: "cm", label: "Centimét", symbol: "cm", factor: 0.01 },
    { id: "dm", label: "Đềximét", symbol: "dm", factor: 0.1 },
    { id: "m", label: "Mét", symbol: "m", factor: 1 },
    { id: "km", label: "Kilômét", symbol: "km", factor: 1000 },
    { id: "in", label: "Inch", symbol: "in", factor: 0.0254 },
    { id: "ft", label: "Foot", symbol: "ft", factor: 0.3048 }
  ]);

  const AREA_UNITS = Object.freeze([
    { id: "mm2", label: "Milimét vuông", symbol: "mm²", factor: 1e-6 },
    { id: "cm2", label: "Centimét vuông", symbol: "cm²", factor: 1e-4 },
    { id: "dm2", label: "Đềximét vuông", symbol: "dm²", factor: 1e-2 },
    { id: "m2", label: "Mét vuông", symbol: "m²", factor: 1 },
    { id: "km2", label: "Kilômét vuông", symbol: "km²", factor: 1e6 },
    { id: "in2", label: "Inch vuông", symbol: "in²", factor: 0.00064516 },
    { id: "ft2", label: "Foot vuông", symbol: "ft²", factor: 0.09290304 },
    { id: "yd2", label: "Yard vuông", symbol: "yd²", factor: 0.83612736 },
    { id: "ha", label: "Hecta", symbol: "ha", factor: 10000 }
  ]);

  const SHAPES = Object.freeze({
    square: Object.freeze({
      icon: "⬜",
      title: "Hình vuông",
      formula: "r = 0: S = a² · r > 0: S = a² − (4 − π) × r²",
      description: "Nhập cạnh a. Có thể bo góc bằng bán kính r.",
      params: Object.freeze([
        { key: "a", label: "Cạnh a" },
        { key: "r", label: "Bán kính bo góc r", defaultValue: "0", allowZero: true, note: "r = 0: không bo góc. r ≤ a/2." }
      ])
    }),
    rectangle: Object.freeze({
      icon: "▭",
      title: "Hình chữ nhật",
      formula: "r = 0: S = a × b · r > 0: S = a × b − (4 − π) × r²",
      description: "Nhập chiều dài a, chiều rộng b và bán kính bo góc r.",
      params: Object.freeze([
        { key: "a", label: "Chiều dài a" },
        { key: "b", label: "Chiều rộng b" },
        { key: "r", label: "Bán kính bo góc r", defaultValue: "0", allowZero: true, note: "r = 0: không bo góc. r ≤ min(a,b)/2." }
      ])
    }),
    triangle: Object.freeze({
      icon: "🔺",
      title: "Hình tam giác",
      formula: "S = a × h ÷ 2",
      description: "Nhập đáy a và chiều cao h.",
      params: Object.freeze([
        { key: "a", label: "Đáy a" },
        { key: "h", label: "Chiều cao h" }
      ])
    }),
    parallelogram: Object.freeze({
      icon: "▱",
      title: "Hình bình hành",
      formula: "S = a × h",
      description: "Nhập đáy a và chiều cao h.",
      params: Object.freeze([
        { key: "a", label: "Đáy a" },
        { key: "h", label: "Chiều cao h" }
      ])
    }),
    trapezoid: Object.freeze({
      icon: "⏢",
      title: "Hình thang",
      formula: "S = (a + b) × h ÷ 2",
      description: "Nhập hai đáy a, b và chiều cao h.",
      params: Object.freeze([
        { key: "a", label: "Đáy lớn a" },
        { key: "b", label: "Đáy nhỏ b" },
        { key: "h", label: "Chiều cao h" }
      ])
    }),
    circle: Object.freeze({
      icon: "⚪",
      title: "Hình tròn",
      formula: "S = π × r²",
      description: "Nhập bán kính r.",
      params: Object.freeze([{ key: "r", label: "Bán kính r" }])
    }),
    semicircle: Object.freeze({
      icon: "◠",
      title: "Hình bán nguyệt",
      formula: "S = π × r² ÷ 2",
      description: "Nhập bán kính r của nửa hình tròn.",
      params: Object.freeze([{ key: "r", label: "Bán kính r" }])
    }),
    ellipse: Object.freeze({
      icon: "⬭",
      title: "Hình elip",
      formula: "S = π × a × b ÷ 4",
      description: "Nhập trục ngang a và trục dọc b.",
      params: Object.freeze([
        { key: "a", label: "Trục ngang a" },
        { key: "b", label: "Trục dọc b" }
      ])
    }),
    capsule: Object.freeze({
      icon: "🫘",
      title: "Hình hạt đậu",
      formula: "S = (a − b) × b + π × b² ÷ 4",
      description: "Nhập chiều dài tổng a và bề ngang b. Điều kiện: a ≥ b.",
      params: Object.freeze([
        { key: "a", label: "Chiều dài tổng a" },
        { key: "b", label: "Bề ngang b" , note: "a ≥ b để tạo hai đầu bán nguyệt."}
      ])
    }),
    roundTube: Object.freeze({
      icon: "⭕",
      title: "Ống thép tròn",
      formula: "S = π ÷ 4 × (D² − d²), với d = D − 2t",
      description: "Nhập đường kính ngoài D và độ dày thành ống t.",
      params: Object.freeze([
        { key: "D", label: "Đường kính ngoài D" },
        { key: "t", label: "Độ dày thành ống t", note: "0 < t < D/2." }
      ])
    }),
    boxTube: Object.freeze({
      icon: "▣",
      title: "Ống thép hộp",
      formula: "S = S ngoài − S trong",
      description: "Nhập kích thước ngoài a, b; độ dày thành t; và bán kính bo góc r ngoài.",
      params: Object.freeze([
        { key: "a", label: "Chiều ngang ngoài a" },
        { key: "b", label: "Chiều dọc ngoài b" },
        { key: "t", label: "Độ dày thành ống t", note: "0 < t < min(a,b)/2." },
        { key: "r", label: "Bán kính bo góc ngoài r", defaultValue: "0", allowZero: true, note: "r = 0: góc vuông. r ≤ min(a,b)/2." }
      ])
    })
  });


  // All translations are local static content; original shape data and formulas stay unchanged.
  const UI_TEXT = Object.freeze({
    vi: Object.freeze({
      heading: "📏 Tính diện tích",
      description: "Tính diện tích các hình học cơ bản và quy đổi đơn vị diện tích.",
      toolLabel: "Công cụ tính diện tích hình học cơ bản",
      shapesLabel: "Chọn hình",
      dimensionUnit: "Đơn vị tham số",
      areaUnit: "Đơn vị diện tích",
      formula: "Công thức",
      result: "Kết quả diện tích",
      displayIn: "Hiển thị theo",
      invalid: "Giá trị chưa hợp lệ",
      retry: "Nhập lại",
      innerDimensions: "Kích thước trong phải > 0",
      note: "Mặc định nhập theo <strong>mm</strong>. Dùng dấu chấm cho phần thập phân và dấu phẩy cho hàng nghìn, ví dụ 1,234.5."
    }),
    en: Object.freeze({
      heading: "📏 Area Calculator",
      description: "Calculate the area of common shapes and convert between area units.",
      toolLabel: "Geometry area calculator",
      shapesLabel: "Choose a shape",
      dimensionUnit: "Dimension unit",
      areaUnit: "Area unit",
      formula: "Formula",
      result: "Calculated area",
      displayIn: "Display in",
      invalid: "Invalid value",
      retry: "Try again",
      innerDimensions: "Inner dimensions must be > 0",
      note: "Dimensions are in <strong>mm</strong> by default. Use a period for decimals and a comma for thousands, e.g., 1,234.5."
    })
  });

  const LENGTH_LABEL_EN = Object.freeze({
    mm: "Millimeter", cm: "Centimeter", dm: "Decimeter", m: "Meter",
    km: "Kilometer", in: "Inch", ft: "Foot"
  });
  const AREA_LABEL_EN = Object.freeze({
    mm2: "Square millimeter", cm2: "Square centimeter", dm2: "Square decimeter",
    m2: "Square meter", km2: "Square kilometer", in2: "Square inch",
    ft2: "Square foot", yd2: "Square yard", ha: "Hectare"
  });

  const SHAPE_TEXT_EN = Object.freeze({
    square: {
      title: "Square",
      description: "Enter side length a. You can round the corners with radius r.",
      svg: "Square showing side a and corner radius r",
      params: { a: ["Side length a"], r: ["Corner radius r", "r = 0: square corners. r ≤ a/2."] }
    },
    rectangle: {
      title: "Rectangle",
      description: "Enter length a, width b, and corner radius r.",
      svg: "Rectangle showing a, b and corner radius r",
      params: { a: ["Length a"], b: ["Width b"], r: ["Corner radius r", "r = 0: square corners. r ≤ min(a,b)/2."] }
    },
    triangle: {
      title: "Triangle",
      description: "Enter base a and height h.",
      svg: "Triangle showing base a and height h",
      params: { a: ["Base a"], h: ["Height h"] }
    },
    parallelogram: {
      title: "Parallelogram",
      description: "Enter base a and height h.",
      svg: "Parallelogram showing base a and height h",
      params: { a: ["Base a"], h: ["Height h"] }
    },
    trapezoid: {
      title: "Trapezoid",
      description: "Enter both bases a and b, and the height h.",
      svg: "Trapezoid showing bases a, b and height h",
      params: { a: ["Longer base a"], b: ["Shorter base b"], h: ["Height h"] }
    },
    circle: {
      title: "Circle",
      description: "Enter radius r.",
      svg: "Circle showing radius r",
      params: { r: ["Radius r"] }
    },
    semicircle: {
      title: "Semicircle",
      description: "Enter radius r of the semicircle.",
      svg: "Semicircle showing radius r",
      params: { r: ["Radius r"] }
    },
    ellipse: {
      title: "Ellipse",
      description: "Enter horizontal axis length a and vertical axis length b.",
      svg: "Ellipse showing axes a and b",
      params: { a: ["Horizontal axis a"], b: ["Vertical axis b"] }
    },
    capsule: {
      title: "Capsule shape",
      description: "Enter total length a and width b. Condition: a ≥ b.",
      svg: "Capsule shape showing total length a and width b",
      params: { a: ["Total length a"], b: ["Width b", "a ≥ b to form two semicircular ends."] }
    },
    roundTube: {
      title: "Round steel tube",
      description: "Enter outer diameter D and wall thickness t.",
      formula: "S = π ÷ 4 × (D² − d²), where d = D − 2t",
      svg: "Round steel tube cross-section showing outer diameter D and wall thickness t",
      params: { D: ["Outer diameter D"], t: ["Wall thickness t", "0 < t < D/2."] }
    },
    boxTube: {
      title: "Rectangular steel tube",
      description: "Enter outer dimensions a and b, wall thickness t, and outer corner radius r.",
      formula: "S = outer area − inner area",
      svg: "Rectangular steel tube cross-section showing a, b, t and r",
      params: {
        a: ["Outer width a"], b: ["Outer height b"],
        t: ["Wall thickness t", "0 < t < min(a,b)/2."],
        r: ["Outer corner radius r", "r = 0: square corners. r ≤ min(a,b)/2."]
      }
    }
  });

  const SVG_LABEL_VI = Object.freeze({
    square: "Hình vuông minh hoạ cạnh a và bán kính bo góc r",
    rectangle: "Hình chữ nhật minh hoạ a, b và bán kính bo góc r",
    triangle: "Hình tam giác minh hoạ a và h",
    parallelogram: "Hình bình hành minh hoạ a và h",
    trapezoid: "Hình thang minh hoạ a, b và h",
    circle: "Hình tròn minh hoạ bán kính r",
    semicircle: "Hình bán nguyệt minh hoạ bán kính r",
    ellipse: "Hình elip minh hoạ a và b",
    capsule: "Hình hạt đậu minh hoạ a và b",
    roundTube: "Ống thép tròn minh hoạ đường kính ngoài D và độ dày t",
    boxTube: "Ống thép hộp minh hoạ a, b, t và r"
  });

  function currentUi() { return UI_TEXT[activeLanguage]; }
  function localizedShape(shapeId) {
    const original = SHAPES[shapeId] || SHAPES.rectangle;
    if (activeLanguage !== "en") return original;
    const en = SHAPE_TEXT_EN[shapeId];
    if (!en) return original;
    return {
      ...original,
      title: en.title,
      description: en.description,
      formula: en.formula || original.formula,
      params: original.params.map((param) => ({
        ...param,
        label: (en.params[param.key] || [param.label])[0],
        note: (en.params[param.key] || [param.label, param.note])[1] || ""
      }))
    };
  }
  function svgLabel(shapeId) {
    return activeLanguage === "en" ? SHAPE_TEXT_EN[shapeId].svg : SVG_LABEL_VI[shapeId];
  }
  function localizedUnitLabel(unit, type) {
    if (activeLanguage === "vi") return unit.label;
    return (type === "length" ? LENGTH_LABEL_EN : AREA_LABEL_EN)[unit.id] || unit.label;
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-geo-page{max-width:1040px;margin:0 auto}
      .ee-geo-heading{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:.7rem}
      .ee-geo-heading-copy{min-width:0;flex:1 1 280px}
      .ee-geo-heading-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:.55rem;margin-left:auto}
      .ee-geo-page .lang-switch{display:inline-flex;gap:4px;padding:3px;border:1px solid #BFDBFE;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:0 0 auto}
      .ee-geo-page .lang-switch button{min-height:38px;padding:0 13px;border:0;border-radius:10px;background:transparent;color:#475569;font-size:14px;font-weight:900;line-height:1.15;white-space:nowrap;cursor:pointer}
      .ee-geo-page .lang-switch button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3B82F6,#10B981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
      .ee-geo-page .lang-switch button:focus-visible{outline:3px solid rgba(59,130,246,.25);outline-offset:2px}
      .ee-geo-page .ee-geo-input,.ee-geo-page .ee-geo-select,.ee-geo-page .ee-geo-result-value{box-sizing:border-box;min-width:0;max-width:100%}
      .ee-geo-shell{border:1px solid #C4B5FD;border-radius:24px;background:linear-gradient(145deg,#FFFDFE,#F8F5FF);box-shadow:0 10px 26px rgba(76,29,149,.08);padding:1rem}
      .ee-geo-top{display:grid;grid-template-columns:1.08fr .92fr;gap:1rem;align-items:start}
      .ee-geo-panel{border:1px solid #E9D5FF;border-radius:22px;background:rgba(255,255,255,.88);padding:.95rem}
      .ee-geo-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.5rem;margin-bottom:.95rem}
      .ee-geo-tab{min-height:54px;border:1px solid #E9D5FF;border-radius:15px;background:#fff;color:#6D28D9;font-weight:950;padding:.5rem .35rem;display:flex;align-items:center;justify-content:center;gap:.38rem;text-align:center;box-shadow:0 3px 9px rgba(76,29,149,.05)}
      .ee-geo-tab:hover{background:#FAF5FF}
      .ee-geo-tab.is-active{color:#fff;border-color:#8B5CF6;background:linear-gradient(90deg,#EC4899,#8B5CF6);box-shadow:0 6px 14px rgba(124,58,237,.18)}
      .ee-geo-tab-icon{font-size:18px;line-height:1}
      .ee-geo-unit-row{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:.85rem}
      .ee-geo-label{display:block;margin:0 0 .36rem;color:#5B216E;font-size:15px;font-weight:950}
      .ee-geo-select{width:100%;height:46px;border:1.5px solid #C4B5FD;border-radius:13px;background:#FAF5FF;color:#4C1D95;padding:0 .7rem;font-size:15px;font-weight:900;outline:none}
      .ee-geo-select:focus,.ee-geo-input:focus{border-color:#8B5CF6;box-shadow:0 0 0 3px rgba(139,92,246,.10)}
      .ee-geo-params{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}
      .ee-geo-field{min-width:0}
      .ee-geo-param-note{display:block;margin:.3rem .1rem 0;color:#7C3AED;font-size:12px;font-weight:850;line-height:1.35}
      .ee-geo-input-wrap{position:relative}
      .ee-geo-input{width:100%;height:58px;border:1.5px solid #D8B4FE;border-radius:16px;background:#fff;color:#111827;padding:0 4rem 0 .85rem;font-size:24px;font-weight:950;outline:none;font-variant-numeric:tabular-nums}
      .ee-geo-input-unit{position:absolute;right:.75rem;top:50%;transform:translateY(-50%);color:#7C3AED;font-size:13px;font-weight:950;pointer-events:none}
      .ee-geo-help{margin:.8rem 0 0;padding:.72rem .8rem;border-radius:16px;background:linear-gradient(90deg,#FFF7FB,#FAF5FF);border:1px solid #F3E8FF;color:#6D28D9;font-size:15px;font-weight:900;line-height:1.5}
      .ee-geo-preview{display:flex;flex-direction:column;gap:.8rem}
      .ee-geo-figure-box{display:flex;align-items:center;justify-content:center;min-height:280px;border:1px dashed #D8B4FE;border-radius:22px;background:linear-gradient(180deg,#FFF 0%,#FCFAFF 100%);padding:.8rem}
      .ee-geo-title{margin:0;color:#4C1D95;font-size:22px;font-weight:1000}
      .ee-geo-desc{margin:.12rem 0 0;color:#667085;font-size:14px;font-weight:800;line-height:1.45}
      .ee-geo-formula{margin:.2rem 0 0;color:#6D28D9;font-size:17px;font-weight:1000}
      .ee-geo-result{display:grid;grid-template-columns:minmax(0,1fr) 210px;gap:.75rem;align-items:end;margin-top:1rem}
      .ee-geo-result-card{padding:.9rem;border-radius:20px;background:linear-gradient(145deg,#FDF7FF,#F8F2FF);border:1px solid #E9D5FF}
      .ee-geo-result-label{display:block;margin:0 0 .3rem;color:#5B216E;font-size:15px;font-weight:950}
      .ee-geo-result-value{min-height:60px;border:1.5px solid #D8B4FE;border-radius:16px;background:#fff;color:#7C3AED;padding:0 .95rem;display:flex;align-items:center;justify-content:flex-end;font-size:29px;font-weight:1000;font-variant-numeric:tabular-nums;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
      .ee-geo-convert-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.6rem;margin-top:.8rem}
      .ee-geo-convert-item{padding:.72rem .68rem;border:1px solid #E9D5FF;border-radius:16px;background:#fff;text-align:center;box-shadow:0 3px 8px rgba(76,29,149,.04)}
      .ee-geo-convert-symbol{display:block;color:#6D28D9;font-size:14px;font-weight:950;margin-bottom:.22rem}
      .ee-geo-convert-value{display:block;color:#111827;font-size:17px;font-weight:1000;line-height:1.3;font-variant-numeric:tabular-nums}
      .ee-geo-note{margin:.82rem 0 0;text-align:center;color:#667085;font-size:13px;font-weight:850;line-height:1.5}
      .ee-geo-svg{width:100%;max-width:340px;height:auto}
      .ee-geo-svg text{font-family:"Nunito","Segoe UI",Arial,sans-serif;font-weight:1000;fill:#7C3AED}
      .ee-geo-svg .shape-fill{fill:#FDE7F3;stroke:#8B5CF6;stroke-width:3}
      .ee-geo-svg .shape-fill-2{fill:#FFFFFF;stroke:#8B5CF6;stroke-width:3}
      .ee-geo-svg .guide{stroke:#A78BFA;stroke-width:2;fill:none;stroke-dasharray:6 6}
      .ee-geo-svg .arrow{stroke:#EC4899;stroke-width:3;fill:none}
      .ee-geo-svg .tip{fill:#EC4899}
      @media(max-width:900px){.ee-geo-top{grid-template-columns:1fr}}
      @media(max-width:767px){
        .ee-geo-shell{padding:.75rem;border-radius:20px}
        .ee-geo-tabs{grid-template-columns:repeat(2,minmax(0,1fr));gap:.45rem}
        .ee-geo-tab{min-height:50px;font-size:13px}
        .ee-geo-unit-row,.ee-geo-result{grid-template-columns:1fr;gap:.65rem}
        .ee-geo-params{grid-template-columns:1fr}
        .ee-geo-input{height:56px;font-size:22px}
        .ee-geo-result-value{font-size:26px;min-height:57px}
        .ee-geo-convert-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
        .ee-geo-figure-box{min-height:240px}
      }
      @media(max-width:620px){
        .ee-geo-heading-copy{flex-basis:100%}
        .ee-geo-heading-actions{width:100%;margin-left:0;justify-content:space-between}
        .ee-geo-page .lang-switch{min-width:0}
        .ee-geo-page .lang-switch button{padding:0 10px}
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

  function currentShapeConfig() {
    return SHAPES[currentShape] || SHAPES.rectangle;
  }

  function optionHtml(list, selectedId, type) {
    return list.map((item) => `<option value="${item.id}"${item.id === selectedId ? " selected" : ""}>${localizedUnitLabel(item, type)} (${item.symbol})</option>`).join("");
  }

  function renderPage(preserved = null) {
    const host = activeContext.host;
    const shape = localizedShape(currentShape);
    const ui = currentUi();
    const lengthId = lengthUnitById(preserved?.lengthUnitId || "mm").id;
    const areaId = areaUnitById(preserved?.areaUnitId || "mm2").id;
    const unitSymbol = lengthUnitById(lengthId).symbol;
    host.innerHTML = `
      <div class="ee-geo-page" lang="${activeLanguage}">
        <div class="section-heading ee-geo-heading">
          <div class="ee-geo-heading-copy"><h1>${ui.heading}</h1><p>${ui.description}</p></div>
          <div class="ee-geo-heading-actions">
            <div class="lang-switch" role="group" aria-label="Language / Ngôn ngữ">
              <button type="button" data-lang="vi" aria-pressed="${activeLanguage === "vi"}">Tiếng Việt</button>
              <button type="button" data-lang="en" aria-pressed="${activeLanguage === "en"}">English</button>
            </div>
            <button id="ee-geo-back" class="back-btn" type="button">← Tools</button>
          </div>
        </div>
        <section class="ee-geo-shell" aria-label="${ui.toolLabel}">
          <div id="ee-geo-tabs" class="ee-geo-tabs" role="group" aria-label="${ui.shapesLabel}">${renderShapeTabs()}</div>
          <div class="ee-geo-top">
            <div class="ee-geo-panel">
              <div class="ee-geo-unit-row">
                <div>
                  <label class="ee-geo-label" for="ee-geo-length-unit">${ui.dimensionUnit}</label>
                  <select id="ee-geo-length-unit" class="ee-geo-select">${optionHtml(LENGTH_UNITS, lengthId, "length")}</select>
                </div>
                <div>
                  <label class="ee-geo-label" for="ee-geo-area-unit">${ui.areaUnit}</label>
                  <select id="ee-geo-area-unit" class="ee-geo-select">${optionHtml(AREA_UNITS, areaId, "area")}</select>
                </div>
              </div>
              <div id="ee-geo-params" class="ee-geo-params">${renderParamFields(shape, unitSymbol)}</div>
              <div class="ee-geo-help">
                <div><strong>${shape.title}</strong> — ${shape.description}</div>
                <div>${ui.formula}: <strong>${shape.formula}</strong></div>
              </div>
            </div>
            <div class="ee-geo-panel ee-geo-preview">
              <div>
                <h2 class="ee-geo-title">${shape.icon} ${shape.title}</h2>
                <p class="ee-geo-desc">${shape.description}</p>
                <p class="ee-geo-formula">${shape.formula}</p>
              </div>
              <div id="ee-geo-figure" class="ee-geo-figure-box">${shapeSvg(currentShape, {})}</div>
            </div>
          </div>
          <div class="ee-geo-result">
            <div class="ee-geo-result-card">
              <label class="ee-geo-result-label">${ui.result}</label>
              <div id="ee-geo-result" class="ee-geo-result-value" aria-live="polite">—</div>
            </div>
            <div>
              <label class="ee-geo-result-label" for="ee-geo-area-unit-2">${ui.displayIn}</label>
              <select id="ee-geo-area-unit-2" class="ee-geo-select">${optionHtml(AREA_UNITS, areaId, "area")}</select>
            </div>
          </div>
          <div id="ee-geo-convert" class="ee-geo-convert-grid"></div>
          <p class="ee-geo-note">${ui.note}</p>
        </section>
      </div>`;

    // Preserve raw input text through re-rendering without injecting user values into HTML.
    if (preserved?.inputValues) {
      for (const [key, raw] of Object.entries(preserved.inputValues)) {
        const input = host.querySelector(`#ee-geo-param-${key}`);
        if (input && typeof raw === "string") input.value = raw;
      }
    }
    host.querySelector(".lang-switch")?.addEventListener("click", handleLanguageClick);
    host.querySelector("#ee-geo-back")?.addEventListener("click", () => {
      if (activeContext && typeof activeContext.back === "function") activeContext.back();
    });
    host.querySelector("#ee-geo-tabs")?.addEventListener("click", handleShapeTabClick);
    host.querySelector("#ee-geo-length-unit")?.addEventListener("change", handleLengthUnitChange);
    host.querySelector("#ee-geo-area-unit")?.addEventListener("change", syncAreaUnit);
    host.querySelector("#ee-geo-area-unit-2")?.addEventListener("change", syncAreaUnitReverse);
    host.querySelector("#ee-geo-params")?.addEventListener("input", updateResult);
    host.querySelector("#ee-geo-params")?.addEventListener("blur", handleParamBlur, true);
    updateResult();
  }

  function renderShapeTabs() {
    return Object.entries(SHAPES).map(([id, shape]) => `
      <button class="ee-geo-tab${id === currentShape ? " is-active" : ""}" type="button" data-shape="${id}" aria-pressed="${id === currentShape}">
        <span class="ee-geo-tab-icon" aria-hidden="true">${shape.icon}</span>
        <span>${localizedShape(id).title}</span>
      </button>`).join("");
  }

  function renderParamFields(shape, unitSymbol) {
    return shape.params.map((param) => `
      <div class="ee-geo-field">
        <label class="ee-geo-label" for="ee-geo-param-${param.key}">${param.label}</label>
        <div class="ee-geo-input-wrap">
          <input id="ee-geo-param-${param.key}" class="ee-geo-input" data-param="${param.key}" inputmode="decimal" autocomplete="off" value="${param.defaultValue ?? ""}" aria-label="${param.label}">
          <span class="ee-geo-input-unit">${unitSymbol}</span>
        </div>
        ${param.note ? `<span class="ee-geo-param-note">${param.note}</span>` : ""}
      </div>`).join("");
  }

  function handleLanguageClick(event) {
    const button = event.target.closest("button[data-lang]");
    if (!button) return;
    const next = button.dataset.lang;
    if (!UI_TEXT[next] || next === activeLanguage || !activeContext?.host) return;
    const host = activeContext.host;
    const inputValues = {};
    host.querySelectorAll("input[data-param]").forEach((input) => {
      if (Object.prototype.hasOwnProperty.call(currentShapeConfig().params.find((p) => p.key === input.dataset.param) || {}, "key")) {
        inputValues[input.dataset.param] = input.value;
      }
    });
    const preserved = {
      lengthUnitId: host.querySelector("#ee-geo-length-unit")?.value,
      areaUnitId: host.querySelector("#ee-geo-area-unit")?.value,
      inputValues
    };
    activeLanguage = next;
    renderPage(preserved);
  }

  function handleShapeTabClick(event) {
    const button = event.target.closest("button[data-shape]");
    if (!button) return;
    const nextShape = String(button.dataset.shape || "");
    if (!SHAPES[nextShape] || nextShape === currentShape) return;
    currentShape = nextShape;
    renderPage();
  }

  function handleLengthUnitChange() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    const unit = lengthUnitById(host.querySelector("#ee-geo-length-unit")?.value || "mm");
    host.querySelector("#ee-geo-params").innerHTML = renderParamFields(localizedShape(currentShape), unit.symbol);
    updateResult();
  }

  function syncAreaUnit() {
    const host = activeContext && activeContext.host;
    const value = host?.querySelector("#ee-geo-area-unit")?.value;
    const mirror = host?.querySelector("#ee-geo-area-unit-2");
    if (mirror && value) mirror.value = value;
    updateResult();
  }

  function syncAreaUnitReverse() {
    const host = activeContext && activeContext.host;
    const value = host?.querySelector("#ee-geo-area-unit-2")?.value;
    const mirror = host?.querySelector("#ee-geo-area-unit");
    if (mirror && value) mirror.value = value;
    updateResult();
  }

  function handleParamBlur(event) {
    const input = event.target.closest("input[data-param]");
    if (!input) return;
    const value = parseInput(input.value);
    if (value !== null && !Number.isNaN(value)) input.value = formatNumber(value);
  }

  function parseInput(raw) {
    const cleaned = String(raw || "").trim().replace(/,/g, "");
    if (!cleaned || cleaned === "-" || cleaned === "." || cleaned === "-.") return null;
    if (!/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(cleaned)) return NaN;
    const value = Number(cleaned);
    return Number.isFinite(value) ? value : NaN;
  }

  function formatNumber(value) {
    if (!Number.isFinite(value)) return "—";
    if (Object.is(value, -0) || Math.abs(value) < 1e-15) return "0";
    const abs = Math.abs(value);
    if (abs >= 1e15 || (abs > 0 && abs < 1e-10)) {
      return value.toExponential(8).replace(/\.0+e/, "e").replace(/(\.\d*?[1-9])0+e/, "$1e");
    }
    return new Intl.NumberFormat("en-US", { useGrouping: true, maximumSignificantDigits: 12 }).format(value);
  }

  function lengthUnitById(id) {
    return LENGTH_UNITS.find((item) => item.id === id) || LENGTH_UNITS[0];
  }

  function areaUnitById(id) {
    return AREA_UNITS.find((item) => item.id === id) || AREA_UNITS[0];
  }

  function roundedRectArea(a, b, r) {
    return a * b - (4 - Math.PI) * r * r;
  }

  function readParamsInMeters(shape, lengthUnit) {
    const host = activeContext && activeContext.host;
    const values = {};
    for (const param of shape.params) {
      const input = host?.querySelector(`#ee-geo-param-${param.key}`);
      const value = parseInput(input?.value ?? "");
      if (value === null) return { status: "empty" };
      if (Number.isNaN(value) || value < 0 || (!param.allowZero && value === 0)) return { status: "invalid", message: currentUi().invalid };
      values[param.key] = value * lengthUnit.factor;
    }

    const message = validateShapeValues(currentShape, values);
    if (message) return { status: "invalid", message };
    return { status: "ok", values };
  }

  function validateShapeValues(shapeId, values) {
    switch (shapeId) {
      case "square":
        if (values.r > values.a / 2) return "r ≤ a/2";
        return "";
      case "rectangle":
        if (values.r > Math.min(values.a, values.b) / 2) return "r ≤ min(a,b)/2";
        return "";
      case "capsule":
        if (values.a < values.b) return "a ≥ b";
        return "";
      case "roundTube":
        if (values.t >= values.D / 2) return "t < D/2";
        return "";
      case "boxTube": {
        if (values.t >= Math.min(values.a, values.b) / 2) return "t < min(a,b)/2";
        if (values.r > Math.min(values.a, values.b) / 2) return "r ≤ min(a,b)/2";
        const innerA = values.a - 2 * values.t;
        const innerB = values.b - 2 * values.t;
        if (innerA <= 0 || innerB <= 0) return currentUi().innerDimensions;
        return "";
      }
      default:
        return "";
    }
  }

  function areaInSquareMeters(shapeId, values) {
    switch (shapeId) {
      case "square":
        return roundedRectArea(values.a, values.a, values.r);
      case "rectangle":
        return roundedRectArea(values.a, values.b, values.r);
      case "triangle":
        return values.a * values.h / 2;
      case "parallelogram":
        return values.a * values.h;
      case "trapezoid":
        return (values.a + values.b) * values.h / 2;
      case "circle":
        return Math.PI * values.r * values.r;
      case "semicircle":
        return Math.PI * values.r * values.r / 2;
      case "ellipse":
        return Math.PI * values.a * values.b / 4;
      case "capsule":
        return (values.a - values.b) * values.b + Math.PI * values.b * values.b / 4;
      case "roundTube": {
        const innerD = values.D - 2 * values.t;
        return Math.PI * (values.D * values.D - innerD * innerD) / 4;
      }
      case "boxTube": {
        const innerA = values.a - 2 * values.t;
        const innerB = values.b - 2 * values.t;
        const innerR = Math.max(values.r - values.t, 0);
        return roundedRectArea(values.a, values.b, values.r) - roundedRectArea(innerA, innerB, innerR);
      }
      default:
        return NaN;
    }
  }

  function buildPreviewOptions() {
    const host = activeContext && activeContext.host;
    if (!host) return {};
    const val = (key) => parseInput(host.querySelector(`#ee-geo-param-${key}`)?.value ?? "");
    const scaleRadius = (r, maxR) => {
      if (!(r > 0) || !(maxR > 0)) return 0;
      return Math.max(0, Math.min(48, 48 * Math.min(r, maxR) / maxR));
    };
    if (currentShape === "square") {
      const a = val("a"); const r = val("r");
      return { radiusPx: a > 0 && r >= 0 ? scaleRadius(r, a / 2) : 0 };
    }
    if (currentShape === "rectangle") {
      const a = val("a"); const b = val("b"); const r = val("r");
      return { radiusPx: a > 0 && b > 0 && r >= 0 ? scaleRadius(r, Math.min(a, b) / 2) : 0 };
    }
    if (currentShape === "boxTube") {
      const a = val("a"); const b = val("b"); const t = val("t"); const r = val("r");
      return {
        radiusPx: a > 0 && b > 0 && r >= 0 ? scaleRadius(r, Math.min(a, b) / 2) : 0,
        wallPx: a > 0 && b > 0 && t > 0 ? Math.max(6, Math.min(26, 26 * Math.min(t, Math.min(a, b) / 2) / (Math.min(a, b) / 2))) : 12
      };
    }
    if (currentShape === "roundTube") {
      const D = val("D"); const t = val("t");
      return {
        innerRatio: D > 0 && t > 0 && t < D / 2 ? Math.max(0.1, Math.min(0.88, (D - 2 * t) / D)) : 0.55
      };
    }
    if (currentShape === "capsule") {
      const a = val("a"); const b = val("b");
      return { longShape: a > b };
    }
    return {};
  }

  function updateResult() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    const shape = currentShapeConfig();
    const areaUnit = areaUnitById(host.querySelector("#ee-geo-area-unit")?.value || "mm2");
    const lengthUnit = lengthUnitById(host.querySelector("#ee-geo-length-unit")?.value || "mm");
    const resultEl = host.querySelector("#ee-geo-result");
    const convertEl = host.querySelector("#ee-geo-convert");
    const figureEl = host.querySelector("#ee-geo-figure");
    if (!resultEl || !convertEl || !figureEl) return;

    figureEl.innerHTML = shapeSvg(currentShape, buildPreviewOptions());

    const paramRead = readParamsInMeters(shape, lengthUnit);
    if (paramRead.status === "empty") {
      resultEl.textContent = "—";
      convertEl.innerHTML = renderConversionCards(null);
      return;
    }
    if (paramRead.status === "invalid") {
      resultEl.textContent = paramRead.message || currentUi().retry;
      convertEl.innerHTML = renderConversionCards(null);
      return;
    }

    const areaM2 = areaInSquareMeters(currentShape, paramRead.values);
    const output = areaM2 / areaUnit.factor;
    resultEl.textContent = `${formatNumber(output)} ${areaUnit.symbol}`;
    convertEl.innerHTML = renderConversionCards(areaM2);
  }

  function renderConversionCards(areaM2) {
    const picks = ["mm2", "cm2", "m2", "ft2"];
    return picks.map((id) => {
      const unit = areaUnitById(id);
      const value = areaM2 == null ? "—" : formatNumber(areaM2 / unit.factor);
      return `<div class="ee-geo-convert-item"><span class="ee-geo-convert-symbol">${unit.symbol}</span><span class="ee-geo-convert-value">${value}</span></div>`;
    }).join("");
  }

  function arrowHeads(x1, y1, x2, y2) {
    const isHorizontal = y1 === y2;
    const isVertical = x1 === x2;
    if (isHorizontal) {
      return `
        <path class="arrow" d="M${x1} ${y1} H${x2}"></path>
        <path class="arrow" d="M${x1} ${y1} l8 -8"></path><path class="arrow" d="M${x1} ${y1} l8 8"></path>
        <path class="arrow" d="M${x2} ${y2} l-8 -8"></path><path class="arrow" d="M${x2} ${y2} l-8 8"></path>`;
    }
    if (isVertical) {
      return `
        <path class="arrow" d="M${x1} ${y1} V${y2}"></path>
        <path class="arrow" d="M${x1} ${y1} l-8 8"></path><path class="arrow" d="M${x1} ${y1} l8 8"></path>
        <path class="arrow" d="M${x2} ${y2} l-8 -8"></path><path class="arrow" d="M${x2} ${y2} l8 -8"></path>`;
    }
    return "";
  }

  function shapeSvg(shapeId, options = {}) {
    switch (shapeId) {
      case "square": {
        const rx = Math.max(0, Math.min(48, Number(options.radiusPx) || 0));
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <rect class="shape-fill" x="90" y="40" width="120" height="120"${rx > 0 ? ` rx="${rx}" ry="${rx}"` : ""}></rect>
            ${arrowHeads(90, 180, 210, 180)}
            <text x="150" y="201" text-anchor="middle" font-size="22">a</text>
            ${arrowHeads(70, 40, 70, 160)}
            <text x="52" y="106" text-anchor="middle" font-size="22">a</text>
            ${rx > 0 ? `<path class="guide" d="M90 ${40 + rx} A${rx} ${rx} 0 0 1 ${90 + rx} 40"></path><text x="122" y="60" font-size="18">r</text>` : `<text x="210" y="36" text-anchor="end" font-size="14">r = 0</text>`}
          </svg>`;
      }
      case "rectangle": {
        const rx = Math.max(0, Math.min(48, Number(options.radiusPx) || 0));
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <rect class="shape-fill" x="55" y="55" width="190" height="100"${rx > 0 ? ` rx="${rx}" ry="${rx}"` : ""}></rect>
            ${arrowHeads(55, 176, 245, 176)}
            <text x="150" y="198" text-anchor="middle" font-size="22">a</text>
            ${arrowHeads(35, 55, 35, 155)}
            <text x="17" y="110" text-anchor="middle" font-size="22">b</text>
            ${rx > 0 ? `<path class="guide" d="M55 ${55 + rx} A${rx} ${rx} 0 0 1 ${55 + rx} 55"></path><text x="105" y="74" font-size="18">r</text>` : `<text x="240" y="49" text-anchor="end" font-size="14">r = 0</text>`}
          </svg>`;
      }
      case "triangle":
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <polygon class="shape-fill" points="55,165 255,165 105,60"></polygon>
            <path class="guide" d="M105 60 V165"></path>
            ${arrowHeads(55, 186, 255, 186)}
            <text x="155" y="207" text-anchor="middle" font-size="22">a</text>
            ${arrowHeads(122, 60, 122, 165)}
            <text x="138" y="118" font-size="22">h</text>
          </svg>`;
      case "parallelogram":
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <polygon class="shape-fill" points="90,50 240,50 200,160 50,160"></polygon>
            <path class="guide" d="M240 50 V160"></path>
            ${arrowHeads(50, 182, 200, 182)}
            <text x="125" y="204" text-anchor="middle" font-size="22">a</text>
            ${arrowHeads(256, 50, 256, 160)}
            <text x="272" y="112" font-size="22">h</text>
          </svg>`;
      case "trapezoid":
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <polygon class="shape-fill" points="70,160 250,160 210,70 110,70"></polygon>
            <path class="guide" d="M210 70 V160"></path>
            ${arrowHeads(70, 184, 250, 184)}
            <text x="160" y="206" text-anchor="middle" font-size="22">a</text>
            ${arrowHeads(110, 50, 210, 50)}
            <text x="160" y="36" text-anchor="middle" font-size="22">b</text>
            ${arrowHeads(226, 70, 226, 160)}
            <text x="242" y="118" font-size="22">h</text>
          </svg>`;
      case "circle":
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <circle class="shape-fill" cx="160" cy="110" r="65"></circle>
            <path class="arrow" d="M160 110 L225 110"></path>
            <circle cx="160" cy="110" r="4" fill="#EC4899"></circle>
            <text x="196" y="99" font-size="22">r</text>
          </svg>`;
      case "semicircle":
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <path class="shape-fill" d="M70 150 A90 90 0 0 1 250 150 L70 150 Z"></path>
            <path class="guide" d="M160 150 V60"></path>
            <path class="arrow" d="M160 150 L230 150"></path>
            <circle cx="160" cy="150" r="4" fill="#EC4899"></circle>
            <text x="194" y="139" font-size="22">r</text>
          </svg>`;
      case "ellipse":
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <ellipse class="shape-fill" cx="160" cy="110" rx="95" ry="58"></ellipse>
            ${arrowHeads(65, 183, 255, 183)}
            <text x="160" y="205" text-anchor="middle" font-size="22">a</text>
            ${arrowHeads(160, 52, 160, 168)}
            <text x="176" y="116" font-size="22">b</text>
          </svg>`;
      case "capsule":
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <rect class="shape-fill" x="55" y="72" width="210" height="76" rx="38" ry="38"></rect>
            ${arrowHeads(55, 176, 265, 176)}
            <text x="160" y="198" text-anchor="middle" font-size="22">a</text>
            ${arrowHeads(36, 72, 36, 148)}
            <text x="20" y="114" text-anchor="middle" font-size="22">b</text>
          </svg>`;
      case "roundTube": {
        const innerRatio = Math.max(0.1, Math.min(0.88, Number(options.innerRatio) || 0.55));
        const innerR = 58 * innerRatio;
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <circle class="shape-fill" cx="160" cy="110" r="58"></circle>
            <circle class="shape-fill-2" cx="160" cy="110" r="${innerR.toFixed(2)}"></circle>
            ${arrowHeads(102, 185, 218, 185)}
            <text x="160" y="206" text-anchor="middle" font-size="22">D</text>
            <path class="arrow" d="M218 110 L${(160 + innerR).toFixed(2)} 110"></path>
            <text x="202" y="96" font-size="20">t</text>
          </svg>`;
      }
      case "boxTube": {
        const rx = Math.max(0, Math.min(46, Number(options.radiusPx) || 0));
        const wall = Math.max(6, Math.min(26, Number(options.wallPx) || 12));
        const outerX = 55, outerY = 52, outerW = 205, outerH = 110;
        const innerX = outerX + wall, innerY = outerY + wall, innerW = outerW - wall * 2, innerH = outerH - wall * 2;
        const innerR = Math.max(rx - wall, 0);
        return `
          <svg class="ee-geo-svg" viewBox="0 0 320 220" aria-label="${svgLabel(shapeId)}">
            <rect class="shape-fill" x="${outerX}" y="${outerY}" width="${outerW}" height="${outerH}"${rx > 0 ? ` rx="${rx}" ry="${rx}"` : ""}></rect>
            <rect class="shape-fill-2" x="${innerX}" y="${innerY}" width="${innerW}" height="${innerH}"${innerR > 0 ? ` rx="${innerR}" ry="${innerR}"` : ""}></rect>
            ${arrowHeads(55, 184, 260, 184)}
            <text x="158" y="205" text-anchor="middle" font-size="22">a</text>
            ${arrowHeads(34, 52, 34, 162)}
            <text x="18" y="111" text-anchor="middle" font-size="22">b</text>
            <path class="arrow" d="M260 107 H${(260 - wall).toFixed(1)}"></path>
            <text x="240" y="94" font-size="18">t</text>
            ${rx > 0 ? `<path class="guide" d="M55 ${52 + rx} A${rx} ${rx} 0 0 1 ${55 + rx} 52"></path><text x="100" y="70" font-size="18">r</text>` : `<text x="250" y="46" text-anchor="end" font-size="14">r = 0</text>`}
          </svg>`;
      }
      default:
        return "";
    }
  }

  function destroy() {
    activeContext = null;
    currentShape = "rectangle";
    activeLanguage = "vi";
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
