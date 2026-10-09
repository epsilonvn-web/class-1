/* Epsilon Edu - Tool: Vong tuan hoan cua nuoc (Water)
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Gom 3 phan: Vong tuan hoan cua nuoc, Ba the cua nuoc, Lam sach nuoc.
 * Dang ky: window.CLASS1_TOOL_MODULES.waterCycle = { render(context), destroy() }
 */
(() => {
  "use strict";

  const TOOL_ID = "waterCycle";
  let activeCleanup = null;

  const CSS = `
.water-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.water-tool *{box-sizing:border-box}.water-tool button,.water-tool input{font:inherit}.water-tool button{cursor:pointer}.water-tool .hidden{display:none!important}
.water-tool button:focus-visible,.water-tool canvas:focus-visible,.water-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.water-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.water-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.water-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.water-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.water-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.water-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.water-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.water-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.water-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.water-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.water-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.water-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.water-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.water-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.water-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.water-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.water-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.water-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.water-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.water-panel{width:100%}.water-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.water-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.water-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.water-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.water-tool .card-head.compact{margin-bottom:9px}
.water-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.water-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.water-tool .btn,.water-tool .soft-btn,.water-tool .segmented button,.water-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.water-tool .btn:hover,.water-tool .soft-btn:hover,.water-tool .segmented button:hover,.water-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.water-tool .btn{padding:0 12px}.water-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.water-tool .segmented{display:flex;gap:7px;margin:0}.water-tool .segmented button{padding:0 13px}
.water-tool .segmented button[aria-pressed="true"],.water-tool .soft-btn[aria-pressed="true"],.water-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.water-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.water-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.water-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.water-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.water-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.water-tool .range-control input{width:100%;accent-color:#8b5cf6}.water-tool .range-control b{color:#7c3aed;font-size:13px}
.water-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.water-tool .soft-btn{padding:0 12px}
.water-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.water-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.water-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.water-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.water-tool .info-title{display:flex;align-items:center;gap:10px}.water-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.water-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.water-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.water-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.water-tool .facts{display:grid;gap:6px;margin-top:10px}.water-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.water-tool .facts b{color:#7c3aed;font-size:13.5px}.water-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.water-tool .fun,.water-tool .warn,.water-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.water-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.water-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.water-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.water-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.water-tool .state-big.up{color:#0f766e}.water-tool .state-big.down{color:#b45309}
.water-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.water-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.water-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.water-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.water-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.water-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.water-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.water-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.water-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.water-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.water-tool .qopt:hover{filter:brightness(.985)}.water-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.water-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.water-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.water-tool .qfb,.water-tool .score{font-size:13px;font-weight:900}.water-tool .qfb.ok{color:#15803d}.water-tool .qfb.no{color:#be123c}.water-tool .score{color:#7c3aed}
.water-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.water-grid{grid-template-columns:1fr;align-items:start}.water-side{grid-template-rows:auto auto;height:auto}.water-tool .control-grid{grid-template-columns:1fr}.water-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.water-hero{flex-wrap:wrap;padding:12px}.water-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.water-tabs{grid-template-columns:1fr}.water-tabs .tab{min-height:40px}.water-card{padding:11px;border-radius:18px}.water-tool .card-head{align-items:flex-start;flex-direction:column}.water-tool .head-actions{width:100%;justify-content:space-between}.water-tool .head-actions .segmented{flex:1;min-width:0}.water-tool .head-actions .segmented button{flex:1;padding:0 8px}.water-tool .qopts{grid-template-columns:1fr}.water-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.water-tool *{transition:none!important}}

.water-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.water-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.water-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.water-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.water-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.water-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.water-tool .checklist{display:grid;gap:6px;margin-top:10px}
.water-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.water-tool .checklist .ok{color:#15803d}.water-tool .checklist .no{color:#be123c}.water-tool .checklist .wait{color:#94a3b8}
.water-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.water-tool .process span{flex:1}.water-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.water-tool .process .on{color:#0284c7}.water-tool .process i.on{color:#ec4899}
@media(max-width:640px){.water-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.water-tool .slider-pair{grid-template-columns:1fr}}
`;

  const HTML = `
<section class="water-tool" data-water-tool>
  <div class="water-hero">
    <div class="water-hero-icon" aria-hidden="true">💧</div>
    <div>
      <p class="water-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="water-lead" data-t="lead"></p>
    </div>
    <div class="water-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="wAudioNotice" class="water-audio-notice hidden" role="status" aria-live="polite"></div>

  <div class="water-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="cycle" data-t="tabCycle"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="states" data-t="tabStates"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="filter" data-t="tabFilter"></button>
  </div>

  <!-- ===== 1. VÒNG TUẦN HOÀN ===== -->
  <section id="w-cycle" class="water-panel" role="tabpanel">
    <div class="water-grid">
      <article class="water-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="cycleH"></h2></div>
          <div class="head-actions">
            <button id="cyTrack" class="soft-btn" type="button" aria-pressed="true" data-t="track"></button>
            <button id="cyPlay" class="btn main" type="button"></button>
          </div>
        </div>
        <div class="canvas-wrap"><canvas id="cCycle" role="img" data-ta="cycleCanvas"></canvas></div>
        <p id="cyHud" class="hud" aria-live="polite"></p>
        <div id="cyStages" class="stage-row" role="group" data-ta="stagesLabel"></div>
        <div class="slider-pair">
          <label class="range-control"><span data-t="sunL"></span><input id="cySun" type="range" min="0" max="100" value="60" step="1"><b id="cySunTxt"></b></label>
          <label class="range-control"><span data-t="windL"></span><input id="cyWind" type="range" min="0" max="100" value="45" step="1"><b id="cyWindTxt"></b></label>
        </div>
      </article>
      <div class="water-side">
        <aside class="water-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeHome"></span><h2 data-t="potH"></h2></div></div>
          <div class="canvas-wrap"><canvas id="cPot" role="img" data-ta="potCanvas"></canvas></div>
          <div id="cyInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qCycle" class="water-card quiz-card"></article>
      </div>
    </div>
  </section>

  <!-- ===== 2. BA THỂ CỦA NƯỚC ===== -->
  <section id="w-states" class="water-panel hidden" role="tabpanel">
    <div class="water-grid">
      <article class="water-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="statesH"></h2></div>
          <div class="head-actions">
            <div class="segmented" role="group" data-ta="autoLabel">
              <button id="stHeat" type="button" aria-pressed="false" data-t="heat"></button>
              <button id="stCool" type="button" aria-pressed="false" data-t="cool"></button>
            </div>
          </div>
        </div>
        <div class="canvas-wrap"><canvas id="cStates" role="img" data-ta="statesCanvas"></canvas></div>
        <p id="stHud" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="tempL"></span><input id="stTemp" type="range" min="-20" max="120" value="-10" step="1"><b id="stTempTxt"></b></label>
        <div class="preset-row" role="group" data-ta="tempPick">
          <button type="button" data-temp="-10" data-t="pIce"></button>
          <button type="button" data-temp="25" data-t="pWater"></button>
          <button type="button" data-temp="110" data-t="pSteam"></button>
        </div>
      </article>
      <div class="water-side">
        <aside class="water-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeNow"></span><h2 data-t="stateInfoH"></h2></div></div>
          <div id="stInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qStates" class="water-card quiz-card"></article>
      </div>
    </div>
  </section>

  <!-- ===== 3. LÀM SẠCH NƯỚC ===== -->
  <section id="w-filter" class="water-panel hidden" role="tabpanel">
    <div class="water-grid">
      <article class="water-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeLab"></span><h2 data-t="filterH"></h2></div>
          <div class="head-actions">
            <button id="flReset" class="btn" type="button" data-t="reset"></button>
            <button id="flPour" class="btn main" type="button" data-t="pour"></button>
          </div>
        </div>
        <div class="canvas-wrap"><canvas id="cFilter" role="img" data-ta="filterCanvas"></canvas></div>
        <p id="flHud" class="hud" aria-live="polite"></p>
        <div id="flLayers" class="toggle-row" style="justify-content:flex-start" role="group" data-ta="layersLabel"></div>
        <div class="preset-row"><button id="flBoil" type="button" data-t="boil"></button></div>
      </article>
      <div class="water-side">
        <aside class="water-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeResult"></span><h2 data-t="cupH"></h2></div></div>
          <div id="flInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qFilter" class="water-card quiz-card"></article>
      </div>
    </div>
  </section>
</section>`;

  function render(context = {}) {
    if (activeCleanup) { try { activeCleanup(); } catch (_) {} activeCleanup = null; }
    const host = context.host;
    if (!(host instanceof Element)) return;
    host.innerHTML = `<style>${CSS}</style>${HTML}`;
    const root = host.querySelector("[data-water-tool]");
    if (!root) return;
    activeCleanup = initWaterTool(root, context);
  }

  function destroy() {
    if (!activeCleanup) return;
    try { activeCleanup(); } catch (_) {}
    activeCleanup = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[TOOL_ID] = Object.freeze({ render, destroy });

  function initWaterTool(root, context) {
    const TAU = Math.PI * 2;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const rand = (a, b) => a + Math.random() * (b - a);
    const $ = (id) => root.querySelector(`#${id}`);
    const reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const cleanupFns = [];
    let destroyed = false;
    let rafId = 0;
    let lang = (context && context.lang === "en") ? "en" : "vi";
    const T = (vi, en) => (lang === "en" ? en : vi);
    const L = (o) => o[lang] || o.vi;

    /* ---------- chữ tĩnh song ngữ ---------- */
    const STR = {
      kicker: ['Epsilon Edu · Khoa học trực quan', 'Epsilon Edu · Visual Science'],
      title: ['Vòng tuần hoàn của nước', 'The Water Cycle'],
      lead: ['Theo chân một giọt nước đi từ biển lên mây rồi về lại biển, xem nước đổi thể khi nóng lạnh và tự làm bình lọc nước.',
             'Follow a water drop from the sea to the clouds and back, watch water change state as it heats and cools, and build a water filter.'],
      tabsLabel: ['Các nội dung về nước', 'Water sections'],
      tabCycle: ['💧 Vòng tuần hoàn', '💧 Water cycle'],
      tabStates: ['🧊 Ba thể của nước', '🧊 States of water'],
      tabFilter: ['🚰 Làm sạch nước', '🚰 Cleaning water'],
      eyeSim: ['Mô phỏng', 'Simulation'],
      cycleH: ['Hành trình của giọt nước', 'A water drop’s journey'],
      cycleCanvas: ['Biển, mây, núi và sông: nước bay hơi, tạo mây, mưa và chảy về biển', 'Sea, clouds, mountain and river: water evaporates, forms clouds, rains and flows back'],
      track: ['💧 Theo dõi giọt nước', '💧 Follow the drop'],
      stagesLabel: ['Các bước của vòng tuần hoàn', 'Steps of the water cycle'],
      sunL: ['Nắng', 'Sunshine'],
      windL: ['Gió thổi vào đất liền', 'Wind toward land'],
      eyeHome: ['Ngay trong nhà em', 'Right at home'],
      potH: ['Vòng tuần hoàn trong nồi nước', 'A water cycle in a cooking pot'],
      potCanvas: ['Nồi nước đun nóng: hơi nước bốc lên, đọng ở nắp rồi nhỏ giọt xuống', 'A heated pot: steam rises, collects on the lid and drips back'],
      statesH: ['Nước đổi thể theo nhiệt độ', 'Water changes with temperature'],
      statesCanvas: ['Các hạt nước ở thể rắn, lỏng và khí', 'Water particles as a solid, liquid and gas'],
      autoLabel: ['Đun nóng hoặc làm lạnh tự động', 'Heat or cool automatically'],
      heat: ['🔥 Đun nóng', '🔥 Heat'],
      cool: ['❄️ Làm lạnh', '❄️ Cool'],
      tempL: ['Kéo để chỉnh nhiệt độ', 'Drag to set the temperature'],
      tempPick: ['Chọn nhanh nhiệt độ', 'Quick temperatures'],
      pIce: ['🧊 −10°C', '🧊 −10°C'],
      pWater: ['💧 25°C', '💧 25°C'],
      pSteam: ['♨️ 110°C', '♨️ 110°C'],
      eyeNow: ['Đang quan sát', 'Now watching'],
      stateInfoH: ['Thể của nước', 'State of water'],
      eyeLab: ['Thí nghiệm', 'Experiment'],
      filterH: ['Bình lọc nước từ chai nhựa', 'A plastic-bottle water filter'],
      filterCanvas: ['Nước bẩn chảy qua các lớp sỏi, cát, than và bông', 'Dirty water flowing through gravel, sand, charcoal and cotton'],
      pour: ['🌧️ Đổ nước bẩn', '🌧️ Pour dirty water'],
      reset: ['↺ Làm lại', '↺ Start over'],
      layersLabel: ['Bật hoặc tắt từng lớp lọc', 'Turn each filter layer on or off'],
      boil: ['🔥 Đun sôi nước trong cốc', '🔥 Boil the water in the cup'],
      eyeResult: ['Kết quả', 'Result'],
      cupH: ['Nước trong cốc', 'Water in the cup']
    };
    function applyStatic() {
      const k = lang === 'en' ? 1 : 0;
      root.querySelectorAll('[data-t]').forEach((el) => { const s = STR[el.dataset.t]; if (s) el.textContent = s[k]; });
      root.querySelectorAll('[data-ta]').forEach((el) => { const s = STR[el.dataset.ta]; if (s) el.setAttribute('aria-label', s[k]); });
      root.setAttribute('lang', lang);
    }

    /* ---------- giọng đọc: luôn dùng Google TTS cho cả tiếng Việt và tiếng Anh (giống các tool Class 1) ---------- */
    // Google Translate TTS, matching the approved Class 1 tools in both languages.
    // It does not expose a verified fixed female/US voice ID.
    const googleTtsUrl = (text, language) =>
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=${language === 'en' ? 'en' : 'vi'}&client=tw-ob&q=${encodeURIComponent(text)}`;
    let audio = null, speechVersion = 0, lastSpeech = null;
    const audioNotice = $('wAudioNotice');
    function noticeAudio(message = '') {
      audioNotice.textContent = message;
      audioNotice.classList.toggle('hidden', !message);
    }
    function stopAudioElement() {
      if (!audio) return;
      const old = audio;
      audio = null;
      try {
        old.onerror = null;
        old.onplaying = null;
        old.onended = null;
        old.pause();
        old.currentTime = 0;
        old.removeAttribute('src');
        old.load();
      } catch (_) {}
    }
    function cancelSpeech() {
      ++speechVersion;
      lastSpeech = null;
      stopAudioElement();
      noticeAudio();
    }
    // The Translate TTS endpoint can reject long phrases, so use a short sequential queue.
    function splitSpeech(text) {
      let rest = text.replace(/\s+/g, ' ').trim();
      const parts = [];
      const limit = 175;
      while (rest.length > limit) {
        const piece = rest.slice(0, limit);
        let cut = -1;
        for (const marker of ['. ', '! ', '? ', '; ', ', ']) {
          const at = piece.lastIndexOf(marker);
          if (at >= 90) cut = Math.max(cut, at + marker.length);
        }
        if (cut < 0) cut = piece.lastIndexOf(' ');
        if (cut < 1) cut = limit;
        parts.push(rest.slice(0, cut).trim());
        rest = rest.slice(cut).trim();
      }
      if (rest) parts.push(rest);
      return parts;
    }
    function speak(value) {
      const text = String(value || '').replace(/\s+/g, ' ').trim();
      if (!text || destroyed) return;
      const time = Date.now();
      if (lastSpeech && lastSpeech.text === text && lastSpeech.lang === lang && time - lastSpeech.time < 260) return;
      cancelSpeech();
      const version = speechVersion, language = lang;
      lastSpeech = { text, lang: language, time };
      if (typeof window.Audio !== 'function') {
        lastSpeech = null;
        noticeAudio(T('Trình duyệt này chưa hỗ trợ phát âm thanh.', 'Audio is unavailable in this browser.'));
        return;
      }
      const parts = splitSpeech(text);
      const current = () => !destroyed && version === speechVersion && lang === language;
      const failed = (player) => {
        if (!current() || (player && audio !== player)) return;
        lastSpeech = null;
        stopAudioElement();
        noticeAudio(language === 'en'
          ? 'Google English audio is unavailable. Please try listening again.'
          : 'Chưa phát được Google TTS tiếng Việt. Bé hãy bấm nghe lại nhé!');
      };
      function playPart(index) {
        if (!current()) return;
        stopAudioElement();
        if (index >= parts.length) { noticeAudio(); return; }
        try {
          const player = new window.Audio();
          audio = player;
          player.referrerPolicy = 'no-referrer';
          player.preload = 'none';
          player.onerror = () => failed(player);
          player.onplaying = () => { if (current() && audio === player) noticeAudio(); };
          player.onended = () => { if (current() && audio === player) playPart(index + 1); };
          player.src = googleTtsUrl(parts[index], language);
          player.playbackRate = language === 'en' ? 1 : .96;
          noticeAudio(language === 'en' ? 'Loading Google voice…' : 'Đang tải giọng đọc…');
          const pending = player.play();
          if (pending && typeof pending.catch === 'function') pending.catch(() => failed(player));
        } catch (_) { failed(); }
      }
      playPart(0);
    }

    /* ---------- canvas co giãn theo khung ---------- */
    function makeCanvas(id, ratio, onResize) {
      const c = $(id);
      if (!c) throw new Error(`WATER_CANVAS_MISSING:${id}`);
      const ctx = c.getContext('2d');
      const o = { c, ctx, w: 0, h: 0 };
      const fit = () => {
        if (destroyed || !c.isConnected) return;
        const pe = c.parentElement; if (!pe) return;
        const cs = getComputedStyle(pe);
        const w = Math.floor(pe.clientWidth - parseFloat(cs.paddingLeft || 0) - parseFloat(cs.paddingRight || 0));
        if (w <= 0 || Math.abs(w - o.w) < 1) return;
        const h = Math.round(ratio(w)), dpr = Math.min(window.devicePixelRatio || 1, 2);
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); c.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); o.w = w; o.h = h;
        dirty = true; if (onResize) onResize();
      };
      o.fit = fit;
      if (typeof ResizeObserver === 'function') {
        const ro = new ResizeObserver(fit); ro.observe(c.parentElement); cleanupFns.push(() => ro.disconnect());
      } else {
        window.addEventListener('resize', fit); cleanupFns.push(() => window.removeEventListener('resize', fit));
      }
      return o;
    }
    const localPoint = (c, e) => { const r = c.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

    /* ---------- vẽ chung ---------- */
    function hex2rgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
    function mix(a, b, t) { const A = hex2rgb(a), B = hex2rgb(b); t = clamp(t, 0, 1); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`; }
    function makeStars(n) { return Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + .3, a: Math.random() * .6 + .3, p: Math.random() * TAU })); }
    function drawStars(ctx, w, h, stars, alpha = 1, t = 0) {
      for (const s of stars) {
        const tw = reduceMotion ? 1 : (.75 + .25 * Math.sin(t * 1.7 + s.p));
        ctx.globalAlpha = s.a * alpha * tw; ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, TAU); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function drawSun(ctx, x, y, r, glowAlpha = .55) {
      const g = ctx.createRadialGradient(x, y, r * .6, x, y, r * 2.1);
      g.addColorStop(0, `rgba(255,200,60,${glowAlpha})`); g.addColorStop(1, 'rgba(255,170,40,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, TAU); ctx.fill();
      const b = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r);
      b.addColorStop(0, '#fff6b0'); b.addColorStop(.6, '#ffd23f'); b.addColorStop(1, '#ff9f1c');
      ctx.fillStyle = b; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    }
    function arrow(ctx, x1, y1, x2, y2, color, width = 2, head = 8) {
      const ang = Math.atan2(y2 - y1, x2 - x1);
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(ang) * head * .6, y2 - Math.sin(ang) * head * .6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - head * Math.cos(ang - .45), y2 - head * Math.sin(ang - .45));
      ctx.lineTo(x2 - head * Math.cos(ang + .45), y2 - head * Math.sin(ang + .45)); ctx.closePath(); ctx.fill();
    }
    function label(ctx, text, x, y, color = '#e2e8f0', size = 12, align = 'center', weight = 800) {
      ctx.font = `${weight} ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      ctx.textAlign = align; ctx.textBaseline = 'middle';
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(8,12,40,.75)'; ctx.strokeText(text, x, y);
      ctx.fillStyle = color; ctx.fillText(text, x, y);
    }
    function polygon(ctx, pts) { ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.closePath(); }

    const playText = (on) => (on ? T('⏸ Tạm dừng', '⏸ Pause') : T('▶ Chạy', '▶ Play'));

    /* ---------- đố vui ---------- */
    function makeQuiz(el, lists) {
      let order = [], i = 0, ok = 0, total = 0, done = false, picked = null, choiceOrder = [];
      const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
      const list = () => lists[lang] || lists.vi;
      function draw(preserve = false) {
        if (i >= order.length) { order = shuffle(list().map((_, k) => k)); i = 0; }
        if (!preserve) { done = false; picked = null; choiceOrder = shuffle([0, 1, 2, 3]); }
        const q = list()[order[i]];
        el.innerHTML = `<h2>🎯 ${T('Đố vui', 'Quiz')}</h2><p class="qtext"></p><div class="qopts"></div>
          <div class="qfoot"><span class="qfb" aria-live="assertive"></span><span class="score">${T('Đúng', 'Correct')} ${ok} / ${total}</span></div>`;
        el.querySelector('.qtext').textContent = q.q;
        const box = el.querySelector('.qopts'), fb = el.querySelector('.qfb');
        const showAnswer = () => {
          [...box.children].forEach((b) => { const k = +b.dataset.answer; if (k === picked) b.classList.add(k === 0 ? 'ok' : 'no'); if (k === 0 && picked !== 0) b.classList.add('ok'); });
          fb.textContent = picked === 0 ? T('Đúng rồi! 🎉', 'Correct! 🎉') : T('Chưa đúng rồi.', 'Not quite.');
          fb.className = 'qfb ' + (picked === 0 ? 'ok' : 'no');
          const p = document.createElement('p'); p.className = 'muted'; p.style.margin = '8px 0 0'; p.textContent = '💡 ' + q.why; el.appendChild(p);
          const nx = document.createElement('button'); nx.type = 'button'; nx.className = 'btn main'; nx.style.marginTop = '10px'; nx.textContent = T('Câu tiếp theo', 'Next question');
          nx.onclick = () => { cancelSpeech(); i++; draw(); }; el.appendChild(nx);
        };
        choiceOrder.forEach((k, idx) => {
          const b = document.createElement('button'); b.type = 'button'; b.className = 'qopt opt-' + (idx + 1); b.textContent = q.a[k]; b.dataset.answer = k;
          b.onclick = () => { if (done) return; cancelSpeech(); done = true; picked = k; total++; if (k === 0) ok++; el.querySelector('.score').textContent = `${T('Đúng', 'Correct')} ${ok} / ${total}`; showAnswer(); };
          box.appendChild(b);
        });
        if (done) showAnswer();
      }
      draw();
      return { refresh: () => draw(true) };
    }

    let dirty = true, clock = 0;

    // chữ trên nền sáng (không viền)
    function textLight(ctx, text, x, y, color = '#334155', size = 12, align = 'center', weight = 800) {
      ctx.font = `${weight} ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(text, x, y);
    }
    function pill(ctx, text, x, y, on, size = 12) {
      ctx.font = `900 ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      const tw = ctx.measureText(text).width + 16, th = size + 10;
      ctx.fillStyle = on ? 'rgba(236,72,153,.92)' : 'rgba(255,255,255,.78)';
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x - tw / 2, y - th / 2, tw, th, th / 2); else ctx.rect(x - tw / 2, y - th / 2, tw, th); ctx.fill();
      ctx.fillStyle = on ? '#fff' : '#0f3c63'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y + .5);
    }
    // giọt nước có mặt cười
    function drawDropFace(ctx, x, y, r, kind) {
      ctx.save();
      ctx.fillStyle = 'rgba(236,72,153,.25)'; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, TAU); ctx.fill();
      if (kind === 'vapor' || kind === 'cloud') {
        ctx.fillStyle = 'rgba(255,255,255,.96)';
        ctx.beginPath(); ctx.arc(x, y, r * 1.15, 0, TAU); ctx.arc(x - r * .8, y + r * .3, r * .7, 0, TAU); ctx.arc(x + r * .8, y + r * .3, r * .7, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r * 1.15, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
      } else {
        const g = ctx.createLinearGradient(x, y - r * 1.7, x, y + r);
        g.addColorStop(0, '#7dd3fc'); g.addColorStop(1, '#0284c7');
        ctx.fillStyle = g; ctx.beginPath();
        ctx.moveTo(x, y - r * 1.75);
        ctx.bezierCurveTo(x + r * .4, y - r * 1.1, x + r, y - r * .5, x + r, y);
        ctx.arc(x, y, r, 0, Math.PI);
        ctx.bezierCurveTo(x - r, y - r * .5, x - r * .4, y - r * 1.1, x, y - r * 1.75);
        ctx.fill();
        ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 1.6; ctx.stroke();
      }
      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); ctx.arc(x - r * .35, y - r * .1, r * .15, 0, TAU); ctx.arc(x + r * .35, y - r * .1, r * .15, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y + r * .15, r * .32, .2 * Math.PI, .8 * Math.PI); ctx.stroke();
      ctx.restore();
    }
    function drawCloud(ctx, x, y, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x - r * .55, y + r * .15, r * .55, 0, TAU);
      ctx.arc(x + r * .55, y + r * .15, r * .6, 0, TAU);
      ctx.arc(x - r * .1, y - r * .2, r * .7, 0, TAU);
      ctx.arc(x + r * .35, y - r * .3, r * .5, 0, TAU);
      ctx.fill();
      ctx.fillRect(x - r * 1.05, y + r * .1, r * 2.2, r * .62);
    }

    /* =====================================================================
       1. VÒNG TUẦN HOÀN CỦA NƯỚC
       Biển bên trái, núi bên phải. Nắng làm nước bay hơi, gió đẩy mây vào
       đất liền, mây gặp núi thì mưa, nước chảy theo sông về lại biển.
       ===================================================================== */
    const STAGES = [
      { key: 'vapor', emo: '💨',
        vi: { name: 'Bay hơi', desc: 'Mặt Trời làm nóng nước biển, sông, hồ. Nước biến thành hơi nước nhẹ bay lên cao. Hơi nước rất nhỏ nên mắt ta không nhìn thấy.', life: 'Quần áo phơi nắng mau khô, vũng nước sau cơn mưa biến mất: đó là nước đã bay hơi.' },
        en: { name: 'Evaporation', desc: 'The Sun warms the sea, rivers and lakes. Water turns into light water vapour that rises high. Vapour is too tiny to see.', life: 'Clothes dry in the sun and puddles vanish after rain: the water has evaporated.' } },
      { key: 'cloud', emo: '☁️',
        vi: { name: 'Ngưng tụ', desc: 'Càng lên cao trời càng lạnh. Hơi nước gặp lạnh biến thành những giọt nước li ti. Rất nhiều giọt li ti tụ lại thành đám mây.', life: 'Hơi nước đọng thành giọt dưới nắp nồi, hay mặt ngoài cốc nước đá bị "đổ mồ hôi".' },
        en: { name: 'Condensation', desc: 'The higher you go, the colder it gets. Cold vapour turns into tiny droplets. Millions of droplets gather into a cloud.', life: 'Drops form under a pot lid, and a glass of iced water “sweats” on the outside.' } },
      { key: 'rain', emo: '🌧️',
        vi: { name: 'Mưa', desc: 'Các giọt nước trong mây nhập lại, to và nặng dần rồi rơi xuống thành mưa. Ở nơi rất lạnh, nước có thể rơi xuống thành tuyết hoặc mưa đá.', life: 'Mây càng đen là càng chứa nhiều nước: sắp có mưa to đấy!' },
        en: { name: 'Precipitation', desc: 'Droplets in the cloud join up, grow heavy and fall as rain. Where it is very cold, water can fall as snow or hail.', life: 'The darker the cloud, the more water it holds: heavy rain is coming!' } },
      { key: 'flow', emo: '🏞️',
        vi: { name: 'Chảy về biển', desc: 'Nước mưa chảy thành suối, sông rồi đổ ra biển. Một phần thấm xuống đất thành nước ngầm. Rồi vòng tuần hoàn lại bắt đầu.', life: 'Nước ngầm là nguồn nước giếng ở nhiều vùng quê Việt Nam.' },
        en: { name: 'Collection', desc: 'Rainwater runs into streams and rivers and back to the sea. Some soaks into the ground as groundwater. Then the cycle starts again.', life: 'Groundwater fills the wells in many Vietnamese villages.' } }
    ];
    const TR_STAGE = { sea: 3, vapor: 0, cloud: 1, rain: 2, flow: 3 };
    const cyC = makeCanvas('cCycle', (w) => clamp(w * .64, 290, 540), () => cyRescale());
    const potC = makeCanvas('cPot', (w) => clamp(w * .58, 170, 240));
    let cyPlaying = !reduceMotion, cyTracking = true, cyStageSel = 3, cyWarm = false;
    let vapors = [], clouds = [], drops = [], flows = [], grounds = [], splashes = [], cySpawn = 0;
    let cyW = 0, cyH = 0;
    const tracker = { state: 'sea', x: 0, y: 0, t: 0, cloud: null, ox: 0, oy: 0, laps: 0 };
    const sunK = () => .25 + (+$('cySun').value / 100) * 1.5;
    const windK = () => +$('cyWind').value / 100;
    function cyGeom() { const w = cyC.w || 640, h = cyC.h || 400; return { w, h, sea: h * .74, seaEnd: w * .4, peakX: w * .8, peakH: h * .44, cloudY: h * .2 }; }
    function landH(g, x) {
      const m = g.peakH * Math.exp(-(((x - g.peakX) / (g.w * .15)) ** 2));
      const s = clamp((x - g.seaEnd) / (g.w * .06), 0, 1);
      return m + s * s * (3 - 2 * s) * g.h * .035;
    }
    const groundY = (g, x) => (x < g.seaEnd ? g.sea : g.sea - landH(g, x));
    const cloudR = (c) => Math.min((cyC.h || 400) * .1, 11 + Math.sqrt(Math.max(0, c.water)) * 4.2);
    function cyRescale() {
      if (cyW && cyH && cyC.w) {
        const sx = cyC.w / cyW, sy = cyC.h / cyH;
        for (const arr of [vapors, clouds, drops, splashes, [tracker]]) for (const p of arr) { p.x *= sx; p.y *= sy; if (p.top) p.top *= sy; if (p.vy) p.vy *= sy; }
        for (const p of flows) p.x *= sx;
        for (const p of grounds) { p.x *= sx; p.d *= sy; }
      }
      cyW = cyC.w; cyH = cyC.h;
    }
    function joinCloud(g, x, amt) {
      let c = clouds.find((k) => Math.abs(k.x - x) < cloudR(k) + 14);
      if (!c) { c = { x, y: g.cloudY + rand(-.02, .02) * g.h, water: 0, raining: false, spent: false, acc: 0 }; clouds.push(c); }
      c.water += amt;
      return c;
    }
    function setTr(s) {
      tracker.state = s; tracker.t = 0;
      if (cyTracking) { const i = TR_STAGE[s]; if (i !== cyStageSel) { cyStageSel = i; cyInfo(); } }
    }
    function cyStep(dt) {
      const g = cyGeom(), sk = sunK(), wk = windK();
      cySpawn += dt * 14 * sk;
      while (cySpawn >= 1) {
        cySpawn--;
        if (vapors.length < 200) vapors.push({ x: rand(g.w * .03, g.seaEnd - 8), y: g.sea - 2, vy: -rand(.1, .16) * g.h, ph: rand(0, TAU), top: g.cloudY + rand(-.03, .03) * g.h });
      }
      for (const v of vapors) { v.y += v.vy * dt; v.x += (wk * .05 * g.w + Math.sin(clock * 2 + v.ph) * 6) * dt; }
      vapors = vapors.filter((v) => { if (v.y <= v.top) { joinCloud(g, v.x, 1); return false; } return true; });

      const stopX = g.peakX - g.w * .07;
      for (const c of clouds) {
        if (c.x < stopX) c.x = Math.min(stopX, c.x + wk * g.w * .09 * dt);
        const overLand = c.x > g.seaEnd + g.w * .06;
        if (!c.raining && c.water >= (overLand ? 10 : 60)) { c.raining = true; c.spent = true; }
        if (c.raining && c.water < 1.5) c.raining = false;
        if (c.raining) {
          c.acc += dt * (overLand ? 20 : 14);
          while (c.acc >= 1 && c.water >= 1) {
            c.acc--; c.water--;
            const r = cloudR(c);
            drops.push({ x: c.x + rand(-r * .8, r * .8), y: c.y + r * .4, vy: g.h * rand(.5, .65) });
          }
        }
      }
      for (let i = 0; i < clouds.length; i++) for (let j = i + 1; j < clouds.length; j++) {
        const a = clouds[i], b = clouds[j];
        if (a.dead || b.dead) continue;
        if (Math.abs(a.x - b.x) < (cloudR(a) + cloudR(b)) * .6) {
          const tot = a.water + b.water;
          a.x = tot > 0 ? (a.x * a.water + b.x * b.water) / tot : (a.x + b.x) / 2;
          a.water = tot; a.raining = a.raining || b.raining; a.spent = a.spent || b.spent;
          if (tracker.cloud === b) tracker.cloud = a;
          b.dead = true;
        }
      }
      clouds = clouds.filter((c) => !c.dead && !(c.spent && !c.raining && c.water < 1));

      const keepDrops = [];
      for (const d of drops) {
        d.y += d.vy * dt; d.x += wk * g.w * .02 * dt;
        if (d.x > g.w) continue;
        const gy = groundY(g, d.x);
        if (d.y >= gy) {
          if (d.x < g.seaEnd) splashes.push({ x: d.x, y: g.sea, t: 0 });
          else if (Math.random() < .25) grounds.push({ x: d.x, d: rand(10, 26) });
          else flows.push({ x: d.x });
        } else keepDrops.push(d);
      }
      drops = keepDrops;
      for (const f of flows) f.x += (f.x < g.peakX ? -1 : 1) * g.w * .1 * dt;
      flows = flows.filter((f) => f.x > g.seaEnd && f.x < g.w);
      for (const q of grounds) q.x -= g.w * .018 * dt;
      grounds = grounds.filter((q) => q.x > g.seaEnd - 4);
      for (const s of splashes) s.t += dt;
      splashes = splashes.filter((s) => s.t < .45);

      // giọt nước được theo dõi
      const tr = tracker;
      tr.t += dt;
      if (tr.state === 'sea') {
        tr.y = g.sea + g.h * .07 + Math.sin(clock * 1.5) * 3;
        tr.x = clamp(tr.x + Math.sin(clock * .7) * 10 * dt, g.w * .08, g.seaEnd - 22);
        if (tr.t > 2.4 / sk) { tr.y = g.sea - 4; setTr('vapor'); }
      } else if (tr.state === 'vapor') {
        tr.y -= g.h * .12 * dt; tr.x += wk * .05 * g.w * dt;
        if (tr.y <= g.cloudY) { tr.cloud = joinCloud(g, tr.x, 0); tr.ox = rand(-.35, .35); tr.oy = rand(-.15, .2); setTr('cloud'); }
      } else if (tr.state === 'cloud') {
        const c = tr.cloud;
        if (!c || !clouds.includes(c)) setTr('rain');
        else {
          const r = cloudR(c);
          tr.x = c.x + tr.ox * r; tr.y = c.y + tr.oy * r;
          if (c.raining && tr.t > 1 && Math.random() < dt * 1.1) { tr.y = c.y + r * .45; setTr('rain'); }
        }
      } else if (tr.state === 'rain') {
        tr.y += g.h * .5 * dt; tr.x += wk * g.w * .02 * dt;
        if (tr.x > g.peakX) tr.x = g.peakX - 6;
        if (tr.y >= groundY(g, tr.x)) { if (tr.x < g.seaEnd) { tr.laps++; setTr('sea'); } else setTr('flow'); }
      } else if (tr.state === 'flow') {
        tr.x -= g.w * .1 * dt; tr.y = groundY(g, tr.x) - 4;
        if (tr.x < g.seaEnd) { tr.laps++; setTr('sea'); }
      }
    }

    function drawCycle() {
      const g = cyGeom(), { w, h } = g, ctx = cyC.ctx;
      if (!cyC.w) return;
      const sv = +$('cySun').value / 100;
      const sky = ctx.createLinearGradient(0, 0, 0, g.sea);
      sky.addColorStop(0, mix('#94a3b8', '#38bdf8', sv)); sky.addColorStop(1, mix('#e2e8f0', '#e0f2fe', sv));
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      drawSun(ctx, w * .09, h * .12, h * (.045 + .035 * sv), .25 + .45 * sv);
      // hơi nước bay lên
      for (const v of vapors) {
        const k = clamp((g.sea - v.y) / (g.sea - g.cloudY), 0, 1);
        ctx.fillStyle = `rgba(255,255,255,${.65 - .3 * k})`;
        ctx.beginPath(); ctx.arc(v.x, v.y, 1.6 + k * 2.2, 0, TAU); ctx.fill();
      }
      // biển
      const sg = ctx.createLinearGradient(0, g.sea, 0, h); sg.addColorStop(0, '#38bdf8'); sg.addColorStop(1, '#075985');
      ctx.fillStyle = sg; ctx.fillRect(0, g.sea, g.seaEnd + h * .2, h - g.sea);
      ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 1.5; ctx.beginPath();
      for (let x = 0; x <= g.seaEnd + 4; x += 6) { const y = g.sea + Math.sin(x / 14 + (reduceMotion ? 0 : clock * 2)) * 1.6; if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke();
      for (const s of splashes) { ctx.strokeStyle = `rgba(255,255,255,${.8 - s.t * 1.7})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(s.x, s.y, 2 + s.t * 14, 1 + s.t * 4, 0, 0, TAU); ctx.stroke(); }
      // đất liền + núi
      const landPath = () => {
        ctx.beginPath(); ctx.moveTo(g.seaEnd - h * .1, h); ctx.lineTo(g.seaEnd, g.sea + 1);
        for (let x = g.seaEnd; x <= w + 4; x += 4) ctx.lineTo(x, groundY(g, x));
        ctx.lineTo(w, h); ctx.closePath();
      };
      landPath();
      const lg = ctx.createLinearGradient(0, g.sea - g.peakH, 0, h); lg.addColorStop(0, '#b98a57'); lg.addColorStop(1, '#7c5230');
      ctx.fillStyle = lg; ctx.fill();
      ctx.save(); landPath(); ctx.clip();
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, g.sea - g.peakH + h * .07);
      ctx.restore();
      ctx.strokeStyle = '#5fb245'; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.beginPath();
      for (let x = g.seaEnd + 2; x <= w + 4; x += 4) { const y = groundY(g, x) + 2; if (y < g.sea - g.peakH + h * .075) { ctx.moveTo(x, y); continue; } ctx.lineTo(x, y); }
      ctx.stroke();
      // cây
      for (const tx of [.47, .53, .58, .9, .95]) {
        const x = w * tx, y = groundY(g, x);
        ctx.fillStyle = '#6b4423'; ctx.fillRect(x - 1.5, y - 8, 3, 8);
        ctx.fillStyle = '#2f8f3a'; ctx.beginPath(); ctx.moveTo(x, y - 24); ctx.lineTo(x + 8, y - 6); ctx.lineTo(x - 8, y - 6); ctx.closePath(); ctx.fill();
      }
      // sông
      const rx0 = g.peakX - g.w * .07;
      for (let x = rx0; x > g.seaEnd - 2; x -= 6) {
        const t = (rx0 - x) / (rx0 - g.seaEnd);
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2 + t * 5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x, groundY(g, x) - .5); ctx.lineTo(x - 6, groundY(g, x - 6) - .5); ctx.stroke();
      }
      ctx.fillStyle = '#e0f2fe';
      for (const f of flows) { ctx.beginPath(); ctx.arc(f.x, groundY(g, f.x) - 1.5, 2, 0, TAU); ctx.fill(); }
      ctx.fillStyle = 'rgba(37,99,235,.85)';
      for (const q of grounds) { ctx.beginPath(); ctx.arc(q.x, groundY(g, q.x) + q.d, 2.2, 0, TAU); ctx.fill(); }
      // mưa
      ctx.strokeStyle = 'rgba(30,64,175,.75)'; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
      for (const d of drops) { ctx.beginPath(); ctx.moveTo(d.x, d.y - 6); ctx.lineTo(d.x, d.y); ctx.stroke(); }
      // mây
      for (const c of clouds) drawCloud(ctx, c.x, c.y, cloudR(c), mix('#ffffff', '#64748b', clamp(c.water / 36, 0, 1)));
      // nhãn các bước
      const lab = L(STAGES[0]).name, on = (i) => i === cyStageSel;
      pill(ctx, `① ${lab} ↑`, g.seaEnd * .55, g.sea - (g.sea - g.cloudY) * .45, on(0));
      pill(ctx, `② ${L(STAGES[1]).name}`, Math.min(w * .5, g.seaEnd + 30), g.cloudY - h * .1, on(1));
      pill(ctx, `③ ${L(STAGES[2]).name} ↓`, g.peakX - g.w * .07, g.cloudY + h * .19, on(2));
      pill(ctx, `④ ← ${L(STAGES[3]).name}`, (g.seaEnd + g.peakX) / 2 - w * .02, g.sea + h * .07, on(3));
      label(ctx, T('Biển', 'Sea'), g.seaEnd * .45, h - 14, '#e0f2fe', 12);
      if (grounds.length) label(ctx, T('Nước ngầm', 'Groundwater'), w * .62, g.sea + h * .17, '#bfdbfe', 11);
      // giọt nước được theo dõi
      if (cyTracking) drawDropFace(ctx, tracker.x, tracker.y, Math.max(5, h * .016), tracker.state);
    }

    /* ---------- nồi nước trong bếp ---------- */
    let potSteam = [], potHang = [0, 0, 0, 0, 0], potFall = [], potRipple = [], potAcc = 0;
    function potGeom() {
      const { w, h } = potC, pw = Math.min(w * .34, h * .8), px = w / 2 - pw / 2, ph = h * .5, py = h * .2;
      return { w, h, pw, px, ph, py, lidY: py, waterY: py + ph * .52, bottom: py + ph };
    }
    function potStep(dt) {
      if (!potC.w) return;
      const g = potGeom();
      potAcc += dt * 9;
      while (potAcc >= 1) { potAcc--; potSteam.push({ x: rand(g.px + 8, g.px + g.pw - 8), y: g.waterY - 2, vy: -rand(.18, .3) * g.h }); }
      for (const s of potSteam) { s.y += s.vy * dt; s.x += Math.sin(clock * 3 + s.y) * 6 * dt; }
      potSteam = potSteam.filter((s) => {
        if (s.y > g.lidY + 6) return true;
        const i = clamp(Math.floor((s.x - g.px) / g.pw * potHang.length), 0, potHang.length - 1);
        potHang[i] += .14;
        if (potHang[i] > 1) { potHang[i] = .25; potFall.push({ x: g.px + (i + .5) * g.pw / potHang.length, y: g.lidY + 9, vy: 0 }); }
        return false;
      });
      for (const f of potFall) { f.vy += g.h * 2.2 * dt; f.y += f.vy * dt; }
      potFall = potFall.filter((f) => { if (f.y >= g.waterY) { potRipple.push({ x: f.x, t: 0 }); return false; } return true; });
      for (const r of potRipple) r.t += dt;
      potRipple = potRipple.filter((r) => r.t < .5);
    }
    function drawPot() {
      const { w, h, ctx } = potC;
      if (!w) return;
      const g = potGeom();
      ctx.fillStyle = '#fff7ed'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#fde7c7'; for (let x = 0; x < w; x += 28) for (let y = 0; y < h * .85; y += 28) ctx.fillRect(x + 1, y + 1, 26, 26);
      // bếp
      ctx.fillStyle = '#334155'; ctx.fillRect(w * .18, g.bottom + 10, w * .64, h - g.bottom - 10);
      for (let i = 0; i < 7; i++) {
        const fx = g.px + g.pw * (.12 + i * .127), fl = 8 + Math.sin(clock * 9 + i * 1.7) * 3;
        ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.moveTo(fx - 4, g.bottom + 10); ctx.quadraticCurveTo(fx, g.bottom + 10 - fl * 2, fx + 4, g.bottom + 10); ctx.fill();
        ctx.fillStyle = '#93c5fd'; ctx.beginPath(); ctx.moveTo(fx - 2, g.bottom + 10); ctx.quadraticCurveTo(fx, g.bottom + 10 - fl, fx + 2, g.bottom + 10); ctx.fill();
      }
      // nồi thủy tinh
      ctx.fillStyle = 'rgba(56,189,248,.55)'; ctx.fillRect(g.px, g.waterY, g.pw, g.bottom - g.waterY);
      ctx.fillStyle = 'rgba(255,255,255,.7)';
      for (let i = 0; i < 6; i++) { const bx = g.px + g.pw * ((i * .17 + .08) % 1), by = g.bottom - ((clock * 40 + i * 23) % (g.bottom - g.waterY)); ctx.beginPath(); ctx.arc(bx, by, 2, 0, TAU); ctx.fill(); }
      for (const r of potRipple) { ctx.strokeStyle = `rgba(255,255,255,${.9 - r.t * 1.6})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(r.x, g.waterY, 3 + r.t * 14, 1 + r.t * 3, 0, 0, TAU); ctx.stroke(); }
      ctx.fillStyle = 'rgba(255,255,255,.75)';
      for (const s of potSteam) { ctx.beginPath(); ctx.arc(s.x, s.y, 2.2, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5; ctx.strokeRect(g.px, g.py, g.pw, g.ph);
      ctx.fillStyle = 'rgba(148,163,184,.35)'; ctx.fillRect(g.px - 2, g.py - 2, g.pw + 4, 5);
      // nắp
      ctx.fillStyle = 'rgba(203,213,225,.85)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(g.px - 8, g.lidY); ctx.quadraticCurveTo(g.px + g.pw / 2, g.lidY - g.h * .1, g.px + g.pw + 8, g.lidY); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#475569'; ctx.fillRect(g.px + g.pw / 2 - 8, g.lidY - g.h * .1, 16, 6);
      ctx.fillStyle = '#38bdf8';
      potHang.forEach((v, i) => { if (v > .05) { ctx.beginPath(); ctx.arc(g.px + (i + .5) * g.pw / potHang.length, g.lidY + 3 + v * 3, 1.5 + v * 3, 0, TAU); ctx.fill(); } });
      for (const f of potFall) { ctx.beginPath(); ctx.arc(f.x, f.y, 3, 0, TAU); ctx.fill(); }
      const tx = g.px + g.pw + 14, size = w < 420 ? 10.5 : 11.5;
      textLight(ctx, T('② đọng thành giọt', '② drops form'), tx, g.lidY + 4, '#be185d', size, 'left');
      textLight(ctx, T('③ nhỏ giọt xuống', '③ drips down'), tx, (g.lidY + g.waterY) / 2 + 6, '#1d4ed8', size, 'left');
      textLight(ctx, T('① hơi nước bốc lên', '① steam rises'), g.px - 14, (g.lidY + g.waterY) / 2, '#0f766e', size, 'right');
      textLight(ctx, T('🔥 đun nóng', '🔥 heat'), g.px - 14, g.bottom + 16, '#c2410c', size, 'right');
    }

    let cyInfoKey = '', cyHudText = '';
    function cyInfo() {
      const s = STAGES[cyStageSel], S = L(s), key = cyStageSel + lang;
      root.querySelectorAll('#cyStages button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === cyStageSel)));
      if (key === cyInfoKey) return;
      cyInfoKey = key;
      $('cyInfo').innerHTML = `
        <div class="info-title"><span class="emo" aria-hidden="true">${s.emo}</span>
          <div><h3></h3><p class="sub">${T('Bước', 'Step')} ${cyStageSel + 1} / 4</p></div>
          <button id="cyListen" class="btn" type="button">🔊 ${T('Nghe', 'Listen')}</button></div>
        <p class="tip" id="cyDesc"></p>
        <p class="fun" id="cyLife"></p>`;
      $('cyInfo').querySelector('h3').textContent = S.name;
      $('cyDesc').textContent = S.desc;
      $('cyLife').textContent = `🏠 ${S.life}`;
      $('cyListen').onclick = () => { const S2 = L(STAGES[cyStageSel]); speak(`${S2.name}. ${S2.desc} ${S2.life}`); };
    }
    function cyHud() {
      let t;
      if (cyTracking) {
        const P = { sea: T('đang ở dưới biển, chờ nắng làm nóng', 'is in the sea, waiting for the sun'), vapor: T('đang bay hơi lên trời', 'is evaporating into the sky'),
          cloud: T('đang nằm trong đám mây', 'is inside a cloud'), rain: T('đang rơi xuống thành mưa', 'is falling as rain'), flow: T('đang chảy theo dòng sông về biển', 'is flowing down the river to the sea') };
        t = `💧 ${T('Giọt nước', 'The drop')} ${P[tracker.state]} – ${T('đã đi', 'trips:')} ${tracker.laps} ${T('vòng', '')}`.trim();
      } else {
        const water = clouds.reduce((a, c) => a + c.water, 0);
        t = `☁️ ${T('Mây đang chứa khoảng', 'Clouds hold about')} ${Math.round(water)} ${T('phần nước', 'units of water')}`;
      }
      if (t !== cyHudText) { cyHudText = t; $('cyHud').textContent = t; }
    }
    const sunWord = (v) => (v < 30 ? T('Nắng yếu', 'Weak') : v < 70 ? T('Nắng vừa', 'Medium') : T('Nắng gắt', 'Strong'));
    const windWord = (v) => (v < 8 ? T('Lặng gió', 'Calm') : v < 55 ? T('Gió nhẹ', 'Light') : T('Gió mạnh', 'Strong'));
    function updCySliders() { $('cySunTxt').textContent = sunWord(+$('cySun').value); $('cyWindTxt').textContent = windWord(+$('cyWind').value); }
    function setCyPlaying(on) { cyPlaying = on; $('cyPlay').textContent = playText(on); }
    function buildStages() {
      $('cyStages').innerHTML = STAGES.map((s, i) => `<button type="button" data-s="${i}" aria-pressed="${i === cyStageSel}"><b>${i + 1}</b><span></span></button>`).join('');
      root.querySelectorAll('#cyStages button').forEach((b, i) => { b.querySelector('span').textContent = `${STAGES[i].emo} ${L(STAGES[i]).name}`; });
    }
    $('cyStages').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-s]'); if (!b) return;
      cancelSpeech(); cyTracking = false; $('cyTrack').setAttribute('aria-pressed', 'false');
      cyStageSel = +b.dataset.s; cyInfo(); dirty = true;
    });
    $('cyTrack').onclick = () => {
      cyTracking = !cyTracking; $('cyTrack').setAttribute('aria-pressed', String(cyTracking));
      if (cyTracking) { cyStageSel = TR_STAGE[tracker.state]; cyInfo(); }
      dirty = true;
    };
    $('cyPlay').onclick = () => { cancelSpeech(); setCyPlaying(!cyPlaying); };
    $('cySun').addEventListener('input', () => { updCySliders(); dirty = true; });
    $('cyWind').addEventListener('input', () => { updCySliders(); dirty = true; });
    function cyWarmUp() {
      if (cyWarm || !cyC.w) return;
      cyWarm = true; cyRescale();
      tracker.x = cyC.w * .22; tracker.y = cyGeom().sea + 20;
      const keep = cyTracking; cyTracking = false;
      const saved = { ...tracker };
      for (let i = 0; i < 160; i++) { clock += .05; cyStep(.05); }
      Object.assign(tracker, saved, { state: 'sea', t: 0, laps: 0 });
      cyTracking = keep;
    }

    const qCycle = makeQuiz($('qCycle'), {
      vi: [
        { q: 'Cái gì cung cấp năng lượng làm nước bay hơi?', a: ['Mặt Trời', 'Mặt Trăng', 'Cây xanh', 'Cá dưới biển'], why: 'Ánh nắng Mặt Trời làm nóng nước, nước bay hơi lên. Trời càng nắng, nước bay hơi càng nhanh.' },
        { q: 'Mây được tạo thành từ gì?', a: ['Rất nhiều giọt nước li ti', 'Khói bếp', 'Bông gòn', 'Bụi đất'], why: 'Hơi nước gặp lạnh trên cao ngưng tụ thành vô số giọt nước (hoặc hạt băng) li ti, tụ lại thành mây.' },
        { q: 'Hơi nước bay lên cao gặp lạnh sẽ thế nào?', a: ['Ngưng tụ thành giọt nước nhỏ', 'Nóng lên', 'Biến mất mãi mãi', 'Thành sỏi đá'], why: 'Gặp lạnh, hơi nước ngưng tụ lại thành những giọt nước nhỏ xíu.' },
        { q: 'Nước mưa rơi xuống núi sẽ đi đâu?', a: ['Chảy thành suối, sông về biển, một phần thấm xuống đất', 'Bay ngay lên trời', 'Biến mất', 'Nằm yên trên núi mãi'], why: 'Nước chảy theo chỗ thấp thành suối, sông rồi ra biển. Một phần thấm vào đất thành nước ngầm.' },
        { q: 'Vì sao quần áo phơi nắng mau khô?', a: ['Nước trong quần áo bay hơi nhanh khi trời nắng', 'Nước chảy hết xuống đất', 'Vải hút hết nước vào trong', 'Nắng làm vải mỏng đi'], why: 'Nắng làm nước nóng lên và bay hơi nhanh hơn. Có gió thì quần áo còn khô nhanh hơn nữa.' },
        { q: 'Hơi nước đọng thành giọt dưới nắp nồi là hiện tượng gì?', a: ['Ngưng tụ', 'Bay hơi', 'Đông đặc', 'Nóng chảy'], why: 'Hơi nước gặp nắp nồi mát hơn thì ngưng tụ thành giọt, giống như cách mây hình thành.' }
      ],
      en: [
        { q: 'What gives water the energy to evaporate?', a: ['The Sun', 'The Moon', 'Green plants', 'Fish in the sea'], why: 'Sunlight warms the water and it evaporates. The sunnier it is, the faster it goes.' },
        { q: 'What are clouds made of?', a: ['Lots of tiny water droplets', 'Kitchen smoke', 'Cotton wool', 'Dust'], why: 'Vapour cools high up and condenses into countless tiny droplets (or ice bits) that gather as clouds.' },
        { q: 'What happens when rising vapour gets cold?', a: ['It condenses into tiny drops', 'It gets hotter', 'It is gone forever', 'It turns into pebbles'], why: 'When it cools, vapour condenses into tiny droplets.' },
        { q: 'Where does rain on a mountain go?', a: ['Into streams and rivers to the sea, some into the ground', 'Straight back to the sky', 'It disappears', 'It stays on the mountain forever'], why: 'Water runs downhill into streams and rivers and on to the sea. Some soaks in as groundwater.' },
        { q: 'Why do clothes dry fast in the sun?', a: ['The water in them evaporates faster when it is sunny', 'The water all drips to the ground', 'The cloth soaks it all up', 'Sunlight makes cloth thinner'], why: 'Sun warms the water so it evaporates faster. Wind speeds it up even more.' },
        { q: 'Drops forming under a pot lid is called…', a: ['Condensation', 'Evaporation', 'Freezing', 'Melting'], why: 'Vapour touching the cooler lid condenses into drops, just like a cloud forming.' }
      ]
    });

    /* =====================================================================
       2. BA THỂ CỦA NƯỚC
       Cùng một loại hạt nước, chỉ khác cách sắp xếp và chuyển động.
       Khi đá đang tan (0°C) hoặc nước đang sôi (100°C), nhiệt độ đứng yên.
       ===================================================================== */
    const stC = makeCanvas('cStates', (w) => clamp(w * .62, 280, 500));
    const NMOL = 42;
    let temp = -10, stEff = -10, stAuto = 0, stHold = 0, stHoldKind = '', stHoldFrom = 0, stHoldTo = 0, stLastDir = 0;
    const mols = Array.from({ length: NMOL }, (_, i) => ({ i, x: 0, y: 0, vx: 0, vy: 0, st: '', eps: rand(-.9, .9), ev: Math.random(), rot: rand(0, TAU), init: false }));
    let stCount = { solid: NMOL, liquid: 0, gas: 0 };
    function stGeom() {
      const w = stC.w || 640, h = stC.h || 400;
      const bx = w * .05, by = h * .08, bw = w * .5, bh = h * .84;
      const r = Math.max(5, Math.min(bw, bh) * .032);
      return { w, h, bx, by, bw, bh, r, s: r * 2.35 };
    }
    function homeOf(g, i, lift) {
      const cols = 7, c = i % cols, rr = Math.floor(i / cols);
      const x0 = g.bx + g.bw / 2 - ((cols - 1) * g.s + g.s * .5) / 2;
      return { x: x0 + c * g.s + (rr % 2 ? g.s * .5 : 0), y: g.by + g.bh - g.r * 1.6 - rr * g.s * .87 - lift };
    }
    function molState(m) {
      if (stEff < m.eps) return 'solid';
      if (stEff >= 100 + m.eps) return 'gas';
      const f = Math.pow(clamp((stEff - 15) / 85, 0, 1), 3) * .22;   // nước bay hơi cả khi chưa sôi
      return m.ev < f ? 'gas' : 'liquid';
    }
    function liquidTop(g, nL) { return g.by + g.bh - Math.max(g.r * 3, nL * g.s * g.s * .95 / g.bw); }
    function stStep(dt) {
      // đun nóng / làm lạnh tự động, có "khoảng đứng yên" khi đổi thể
      if (stHold > 0) {
        stHold -= dt;
        const k = clamp(1 - stHold / 2.4, 0, 1);
        stEff = stHoldFrom + (stHoldTo - stHoldFrom) * k;
        if (stHold <= 0) { stHold = 0; stHoldKind = ''; stEff = temp + stAuto * .01; }
      } else if (stAuto) {
        const prev = temp;
        let nt = clamp(temp + stAuto * 16 * dt, -20, 120);
        const crossing = (lim) => (stAuto > 0 ? prev < lim && nt >= lim : prev > lim && nt <= lim);
        if (crossing(0) && (stAuto > 0 ? stCount.solid > 0 : stCount.liquid > 0)) {
          nt = 0; stHold = 2.4; stHoldKind = stAuto > 0 ? 'melt' : 'freeze'; stHoldFrom = stAuto > 0 ? -1 : 1; stHoldTo = -stHoldFrom;
        } else if (crossing(100) && (stAuto > 0 ? stCount.liquid > 0 : stCount.gas > 0)) {
          nt = 100; stHold = 2.4; stHoldKind = stAuto > 0 ? 'boil' : 'condense'; stHoldFrom = stAuto > 0 ? 99 : 101; stHoldTo = stAuto > 0 ? 101 : 99;
        }
        temp = nt; if (!stHold) stEff = temp;
        if ((stAuto > 0 && temp >= 120) || (stAuto < 0 && temp <= -20)) setStAuto(0);
        $('stTemp').value = String(Math.round(temp));
      }
      const g = stGeom();
      const cnt = { solid: 0, liquid: 0, gas: 0 };
      for (const m of mols) cnt[molState(m)]++;
      stCount = cnt;
      const yL = liquidTop(g, cnt.liquid), lift = cnt.liquid > 0 ? (g.by + g.bh - yL) * .85 : 0;
      const vL = g.r * (2.5 + clamp(stEff, 0, 100) / 100 * 4), vG = g.r * (14 + clamp(stEff - 100, 0, 20) * .2);
      for (const m of mols) {
        const s = molState(m);
        if (!m.init) { const hp = homeOf(g, m.i, 0); m.x = hp.x; m.y = hp.y; m.init = true; }
        if (s !== m.st) {
          m.st = s;
          if (s !== 'solid') { const a = rand(0, TAU), sp = s === 'gas' ? vG : vL; m.vx = Math.cos(a) * sp; m.vy = Math.sin(a) * sp; }
        }
        if (s === 'solid') {
          const hp = homeOf(g, m.i, lift), k = Math.min(1, dt * 4);
          m.x += (hp.x - m.x) * k; m.y += (hp.y - m.y) * k;
          continue;
        }
        const sp = s === 'gas' ? vG : vL;
        const cur = Math.hypot(m.vx, m.vy) || 1;
        const turn = (s === 'liquid' ? 3 : .6) * rand(-1, 1) * dt;
        const ca = Math.cos(turn), sa = Math.sin(turn);
        const nvx = (m.vx * ca - m.vy * sa) * sp / cur, nvy = (m.vx * sa + m.vy * ca) * sp / cur;
        m.vx = nvx; m.vy = nvy;
        m.x += m.vx * dt; m.y += m.vy * dt; m.rot += dt * (s === 'gas' ? 4 : 1.5);
        const left = g.bx + g.r, right = g.bx + g.bw - g.r, bottom = g.by + g.bh - g.r;
        const top = s === 'liquid' ? yL + g.r : g.by + g.r;
        if (m.x < left) { m.x = left; m.vx = Math.abs(m.vx); }
        if (m.x > right) { m.x = right; m.vx = -Math.abs(m.vx); }
        if (m.y > bottom) { m.y = bottom; m.vy = -Math.abs(m.vy); }
        if (m.y < top) { if (s === 'liquid') m.vy = Math.max(Math.abs(m.vy), g.r * 12); else { m.y = top; m.vy = Math.abs(m.vy); } }
      }
    }

    function drawMolecule(ctx, x, y, r, rot) {
      ctx.fillStyle = '#ffffff';
      for (const d of [-.91, .91]) { ctx.beginPath(); ctx.arc(x + Math.cos(rot + d) * r * .95, y + Math.sin(rot + d) * r * .95, r * .45, 0, TAU); ctx.fill(); }
      const g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r);
      g.addColorStop(0, '#93c5fd'); g.addColorStop(1, '#2563eb');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    }
    function stKind() {
      if (stHoldKind) return stHoldKind;
      const c = stCount;
      if (c.solid && c.liquid) return stLastDir < 0 ? 'freeze' : 'melt';
      if (temp >= 100 && c.liquid) return stLastDir < 0 ? 'condense' : 'boil';
      if (c.solid >= c.liquid && c.solid >= c.gas) return 'solid';
      if (temp >= 100) return 'gas';
      return 'liquid';
    }
    function drawStates() {
      const g = stGeom(), { w, h } = g, ctx = stC.ctx;
      if (!stC.w) return;
      ctx.fillStyle = '#f8fbff'; ctx.fillRect(0, 0, w, h);
      // bình chứa
      const yL = liquidTop(g, stCount.liquid);
      if (stCount.liquid > 2) { ctx.fillStyle = 'rgba(56,189,248,.18)'; ctx.fillRect(g.bx, yL - g.r * .3, g.bw, g.by + g.bh - yL + g.r * .3); }
      if (stCount.solid > 3) {
        let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
        for (const m of mols) if (m.st === 'solid') { x0 = Math.min(x0, m.x); x1 = Math.max(x1, m.x); y0 = Math.min(y0, m.y); y1 = Math.max(y1, m.y); }
        ctx.fillStyle = 'rgba(186,230,253,.55)'; ctx.strokeStyle = 'rgba(125,211,252,.9)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); const pad = g.r * 1.5;
        if (ctx.roundRect) ctx.roundRect(x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2, 8); else ctx.rect(x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2);
        ctx.fill(); ctx.stroke();
      }
      const amp = g.r * (.06 + clamp(stEff + 20, 0, 22) / 22 * .14);
      for (const m of mols) {
        let x = m.x, y = m.y;
        if (m.st === 'solid' && !reduceMotion) { x += Math.sin(clock * 22 + m.i * 1.7) * amp; y += Math.cos(clock * 19 + m.i * 2.3) * amp; }
        drawMolecule(ctx, x, y, g.r, m.st === 'solid' ? -Math.PI / 2 : m.rot);
      }
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(g.bx, g.by); ctx.lineTo(g.bx, g.by + g.bh); ctx.lineTo(g.bx + g.bw, g.by + g.bh); ctx.lineTo(g.bx + g.bw, g.by); ctx.stroke();
      ctx.strokeStyle = 'rgba(100,116,139,.5)'; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(g.bx, g.by); ctx.lineTo(g.bx + g.bw, g.by); ctx.stroke(); ctx.setLineDash([]);
      textLight(ctx, T('Phóng to các hạt nước', 'Water particles, zoomed in'), g.bx + g.bw / 2, g.by - 12, '#64748b', 11.5);

      // nhiệt kế
      const tx = w * .67, ty0 = h * .1, ty1 = h * .8, tw = Math.max(10, w * .018);
      const Y = (t) => ty1 - (t + 20) / 140 * (ty1 - ty0);
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(tx - tw / 2, ty0 - 6, tw, ty1 - ty0 + 12, tw / 2); else ctx.rect(tx - tw / 2, ty0 - 6, tw, ty1 - ty0 + 12); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(tx, ty1 + tw * 1.1, tw * 1.15, 0, TAU); ctx.fillStyle = '#ef4444'; ctx.fill();
      ctx.fillStyle = '#ef4444'; ctx.fillRect(tx - tw / 2 + 3, Y(temp), tw - 6, ty1 + tw - Y(temp));
      ctx.font = '800 10.5px system-ui, sans-serif'; ctx.textBaseline = 'middle';
      for (let t = -20; t <= 120; t += 20) { ctx.fillStyle = '#94a3b8'; ctx.fillRect(tx + tw / 2, Y(t), 6, 1.5); ctx.textAlign = 'left'; ctx.fillText(`${t}`, tx + tw / 2 + 9, Y(t)); }
      for (const [t, txt, col] of [[0, T('0°C: đá tan', '0°C: ice melts'), '#0284c7'], [100, T('100°C: nước sôi', '100°C: water boils'), '#dc2626']]) {
        ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(g.bx + g.bw + 6, Y(t)); ctx.lineTo(tx - tw / 2 - 4, Y(t)); ctx.stroke(); ctx.setLineDash([]);
        textLight(ctx, txt, tx - tw / 2 - 6, Y(t) - 9, col, 10.5, 'right', 900);
      }
      textLight(ctx, `${Math.round(temp)}°C`, tx, ty1 + tw * 2.9, '#dc2626', 17, 'center', 900);

      // vật thật tương ứng
      const kind = stKind(), cx = w * .88, cy = h * .45, s = Math.min(w * .09, h * .15);
      if (kind === 'solid' || kind === 'melt' || kind === 'freeze') {
        for (const [dx, dy] of [[-.55, .25], [.45, .05]]) {
          const x = cx + dx * s, y = cy + dy * s;
          ctx.fillStyle = 'rgba(186,230,253,.9)'; ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.5;
          ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x - s * .45, y - s * .45, s * .9, s * .9, s * .15); else ctx.rect(x - s * .45, y - s * .45, s * .9, s * .9); ctx.fill(); ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x - s * .3, y - s * .32, s * .18, s * .08);
        }
        if (kind !== 'solid') { ctx.fillStyle = 'rgba(56,189,248,.45)'; ctx.beginPath(); ctx.ellipse(cx, cy + s * .8, s * 1.1, s * .18, 0, 0, TAU); ctx.fill(); }
      } else if (kind === 'liquid') {
        ctx.fillStyle = 'rgba(56,189,248,.55)';
        ctx.beginPath(); ctx.moveTo(cx - s * .55, cy - s * .1); ctx.lineTo(cx + s * .55, cy - s * .1); ctx.lineTo(cx + s * .45, cy + s * .9); ctx.lineTo(cx - s * .45, cy + s * .9); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx - s * .65, cy - s * .8); ctx.lineTo(cx - s * .45, cy + s * .9); ctx.lineTo(cx + s * .45, cy + s * .9); ctx.lineTo(cx + s * .65, cy - s * .8); ctx.stroke();
      } else {
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath(); ctx.ellipse(cx, cy + s * .45, s * .7, s * .5, 0, 0, TAU); ctx.fill();
        ctx.fillRect(cx - s * .3, cy - s * .15, s * .6, s * .2);
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = s * .14; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(cx + s * .55, cy + s * .35); ctx.lineTo(cx + s * 1.0, cy); ctx.stroke();
        ctx.strokeStyle = 'rgba(148,163,184,.7)'; ctx.lineWidth = 2.5;
        for (let k = 0; k < 3; k++) {
          ctx.beginPath();
          for (let j = 0; j <= 10; j++) { const yy = cy - s * .1 - j * s * .12, xx = cx + s * (1.05 + k * .12) + Math.sin(j * .9 + clock * 3 + k) * 4; if (j) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy); }
          ctx.stroke();
        }
      }
      const NAME = { solid: T('Nước đá', 'Ice'), melt: T('Đá đang tan', 'Ice melting'), freeze: T('Nước đang đông', 'Water freezing'), liquid: T('Nước', 'Water'), boil: T('Nước đang sôi', 'Water boiling'), condense: T('Hơi nước ngưng tụ', 'Steam condensing'), gas: T('Hơi nước', 'Steam') };
      textLight(ctx, NAME[kind], cx, cy + s * 1.35, '#334155', 13, 'center', 900);
    }

    const ST_INFO = {
      solid: { emo: '🧊', vi: { name: 'Thể rắn: nước đá', shape: 'Có hình dạng riêng, cứng, cầm được.', parts: 'Xếp sát nhau thành hàng lối, chỉ rung nhẹ tại chỗ.', ex: 'Đá trong tủ lạnh, băng ở hai cực Trái Đất.', fun: 'Nước đá nhẹ hơn nước lỏng cùng thể tích nên đá nổi trên mặt nước.' },
               en: { name: 'Solid: ice', shape: 'Has its own shape; hard; you can hold it.', parts: 'Packed in neat rows, only jiggling in place.', ex: 'Ice cubes in the freezer, ice at the poles.', fun: 'Ice is lighter than the same amount of liquid water, so it floats.' } },
      liquid: { emo: '💧', vi: { name: 'Thể lỏng: nước', shape: 'Không có hình dạng riêng, chảy được và có hình dạng của vật chứa nó.', parts: 'Ở gần nhau nhưng trượt qua nhau, di chuyển tự do.', ex: 'Nước uống, nước sông, nước biển.', fun: 'Nước bay hơi cả khi chưa sôi: một vài hạt chạy nhanh thoát ra khỏi mặt nước. Vì vậy quần áo vẫn khô dù không phơi nắng gắt.' },
                en: { name: 'Liquid: water', shape: 'No shape of its own; it flows and takes the shape of its container.', parts: 'Close together but sliding past each other.', ex: 'Drinking water, rivers, the sea.', fun: 'Water evaporates even before boiling: a few fast particles escape from the surface. That is why clothes dry even on cloudy days.' } },
      gas: { emo: '♨️', vi: { name: 'Thể khí: hơi nước', shape: 'Không có hình dạng, lan ra khắp nơi, mắt không nhìn thấy.', parts: 'Cách xa nhau, bay rất nhanh theo mọi hướng.', ex: 'Hơi nước trong không khí, hơi nước bốc lên từ nồi.', fun: 'Làn "khói trắng" trên nồi nước sôi thật ra là những giọt nước li ti đã ngưng tụ. Hơi nước thật thì không nhìn thấy được.' },
             en: { name: 'Gas: water vapour', shape: 'No shape; it spreads everywhere and is invisible.', parts: 'Far apart, zooming in all directions.', ex: 'Vapour in the air, steam from a pot.', fun: 'The white “smoke” over a boiling pot is really tiny condensed droplets. True water vapour is invisible.' } },
      melt: { emo: '💦', vi: { name: 'Đang nóng chảy (tan)', shape: 'Một phần vẫn là đá, một phần đã thành nước.', parts: 'Các hạt bắt đầu rời khỏi hàng, trượt ra ngoài.', ex: 'Đá trong cốc trà đá tan dần.', fun: 'Trong lúc đá đang tan, nhiệt độ đứng yên ở 0°C cho đến khi đá tan hết.' },
              en: { name: 'Melting', shape: 'Part is still ice, part is already water.', parts: 'Particles start leaving their rows and slide away.', ex: 'Ice slowly melting in a glass of iced tea.', fun: 'While ice is melting, the temperature stays at 0°C until it has all melted.' } },
      freeze: { emo: '❄️', vi: { name: 'Đang đông đặc', shape: 'Nước lỏng dần biến thành đá cứng.', parts: 'Các hạt chậm lại và xếp vào hàng lối.', ex: 'Khay nước trong ngăn đá thành đá viên.', fun: 'Trong lúc nước đang đông, nhiệt độ đứng yên ở 0°C.' },
                en: { name: 'Freezing', shape: 'Liquid water slowly turns into hard ice.', parts: 'Particles slow down and line up in rows.', ex: 'A tray of water in the freezer becomes ice cubes.', fun: 'While water is freezing, the temperature stays at 0°C.' } },
      boil: { emo: '🔥', vi: { name: 'Đang sôi', shape: 'Nước sủi bọt và hóa hơi rất nhanh.', parts: 'Các hạt chạy thật nhanh, bay vọt ra khỏi nước.', ex: 'Nồi nước sôi khi luộc rau.', fun: 'Khi nước đang sôi, nhiệt độ đứng yên ở 100°C. Đun thêm chỉ làm nước cạn nhanh hơn.' },
              en: { name: 'Boiling', shape: 'Water bubbles and turns to vapour very fast.', parts: 'Particles race and shoot out of the water.', ex: 'A pot boiling vegetables.', fun: 'While water boils, the temperature stays at 100°C. More heat just boils it away faster.' } },
      condense: { emo: '🌫️', vi: { name: 'Đang ngưng tụ', shape: 'Hơi nước gặp lạnh hóa thành giọt nước.', parts: 'Các hạt chậm lại, tụ vào gần nhau.', ex: 'Giọt nước đọng trên nắp nồi, trên gương phòng tắm.', fun: 'Mây và sương mù được tạo thành nhờ ngưng tụ.' },
                  en: { name: 'Condensing', shape: 'Cooling vapour turns into water drops.', parts: 'Particles slow down and huddle together.', ex: 'Drops on a pot lid or a bathroom mirror.', fun: 'Clouds and fog form by condensation.' } }
    };
    let stInfoKey = '', stHudText = '', stTempShown = null;
    function stInfo() {
      const kind = stKind(), I = ST_INFO[kind], P = L(I);
      const solidOn = kind === 'solid', liquidOn = kind === 'liquid', gasOn = kind === 'gas';
      const a1 = kind === 'melt' || kind === 'freeze', a2 = kind === 'boil' || kind === 'condense';
      const key = kind + lang;
      if (key !== stInfoKey) {
        stInfoKey = key;
        const hot = kind === 'boil' || kind === 'gas';
        $('stInfo').innerHTML = `
          <div class="info-title"><span class="emo" aria-hidden="true">${I.emo}</span>
            <div><h3></h3><p class="sub" id="stSub"></p></div>
            <button id="stListen" class="btn" type="button">🔊 ${T('Nghe', 'Listen')}</button></div>
          <div class="facts">
            <div><b>${T('Hình dạng', 'Shape')}</b><span id="stShape"></span></div>
            <div><b>${T('Các hạt', 'Particles')}</b><span id="stParts"></span></div>
            <div><b>${T('Ví dụ', 'Examples')}</b><span id="stEx"></span></div>
          </div>
          <div class="process">
            <span class="${solidOn ? 'on' : ''}">🧊<br>${T('Rắn', 'Solid')}</span>
            <i class="${a1 ? 'on' : ''}">${kind === 'freeze' ? T('← đông đặc', '← freezing') : T('nóng chảy →', 'melting →')}<br>0°C</i>
            <span class="${liquidOn ? 'on' : ''}">💧<br>${T('Lỏng', 'Liquid')}</span>
            <i class="${a2 ? 'on' : ''}">${kind === 'condense' ? T('← ngưng tụ', '← condensing') : T('sôi →', 'boiling →')}<br>100°C</i>
            <span class="${gasOn ? 'on' : ''}">♨️<br>${T('Khí', 'Gas')}</span>
          </div>
          <p class="fun" id="stFun"></p>
          ${hot ? `<p class="warn">${T('⚠️ Hơi nước nóng có thể gây bỏng. Không lại gần nồi nước đang sôi.', '⚠️ Steam can burn. Keep away from boiling pots.')}</p>` : ''}`;
        $('stInfo').querySelector('h3').textContent = P.name;
        $('stShape').textContent = P.shape; $('stParts').textContent = P.parts; $('stEx').textContent = P.ex;
        $('stFun').textContent = '✨ ' + P.fun;
        $('stListen').onclick = () => { const Q = L(ST_INFO[stKind()]); speak(`${Q.name}. ${Q.shape} ${Q.parts} ${T('Ví dụ', 'For example')}: ${Q.ex} ${Q.fun}`); };
      }
      const tr = Math.round(temp);
      if (tr !== stTempShown) {
        stTempShown = tr;
        $('stSub').textContent = `${T('Nhiệt độ', 'Temperature')}: ${tr}°C`;
        $('stTempTxt').textContent = `${tr}°C`;
      }
      const hold = stHoldKind ? ` – ${T('nhiệt độ đang đứng yên', 'temperature is holding steady')}` : '';
      const t = `🌡️ ${tr}°C – ${P.name}${hold}`;
      if (t !== stHudText) { stHudText = t; $('stHud').textContent = t; }
    }
    function setStAuto(dir) {
      stAuto = dir; if (dir) stLastDir = dir;
      $('stHeat').setAttribute('aria-pressed', String(dir > 0)); $('stCool').setAttribute('aria-pressed', String(dir < 0));
    }
    function setTemp(t) {
      setStAuto(0); stHold = 0; stHoldKind = '';
      stLastDir = t > temp ? 1 : t < temp ? -1 : stLastDir;
      temp = clamp(t, -20, 120); stEff = temp; $('stTemp').value = String(Math.round(temp));
      dirty = true;
    }
    $('stHeat').onclick = () => { cancelSpeech(); setStAuto(stAuto > 0 ? 0 : 1); };
    $('stCool').onclick = () => { cancelSpeech(); setStAuto(stAuto < 0 ? 0 : -1); };
    $('stTemp').addEventListener('input', () => setTemp(+$('stTemp').value));
    root.querySelectorAll('[data-temp]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); setTemp(+b.dataset.temp); }));

    const qStates = makeQuiz($('qStates'), {
      vi: [
        { q: 'Nước đá bắt đầu tan ở nhiệt độ bao nhiêu?', a: ['0°C', '100°C', '50°C', '37°C'], why: 'Nước đá tan (nóng chảy) ở 0°C, và nước cũng đông thành đá ở 0°C.' },
        { q: 'Ở điều kiện thường, nước sôi ở bao nhiêu độ?', a: ['100°C', '0°C', '60°C', '200°C'], why: 'Nước sôi ở 100°C. Trên núi cao, nước sôi ở nhiệt độ thấp hơn một chút.' },
        { q: 'Ở thể nào các hạt nước cách xa nhau và bay nhanh nhất?', a: ['Thể khí', 'Thể rắn', 'Thể lỏng', 'Cả ba như nhau'], why: 'Ở thể khí (hơi nước), các hạt cách xa nhau và bay rất nhanh.' },
        { q: 'Cho khay nước vào ngăn đá tủ lạnh thì nước sẽ…', a: ['Đông đặc thành nước đá', 'Bay hơi hết', 'Sôi lên', 'Biến thành mây'], why: 'Ngăn đá lạnh dưới 0°C nên nước đông đặc thành đá.' },
        { q: 'Vì sao cục đá nổi trong cốc nước?', a: ['Vì nước đá nhẹ hơn nước lỏng cùng thể tích', 'Vì đá rỗng ruột', 'Vì nước trong cốc nóng', 'Vì đá có phép thuật'], why: 'Khi đông lại, các hạt nước xếp thưa hơn một chút, nên đá nhẹ hơn nước và nổi lên.' },
        { q: '"Khói trắng" bốc lên từ nồi nước sôi thật ra là gì?', a: ['Những giọt nước li ti đã ngưng tụ', 'Khói do lửa cháy', 'Bụi trong bếp', 'Hơi nước nhìn thấy được'], why: 'Hơi nước không nhìn thấy được. Khi ra ngoài gặp không khí mát, nó ngưng tụ thành giọt li ti nên ta thấy màu trắng.' }
      ],
      en: [
        { q: 'At what temperature does ice start to melt?', a: ['0°C', '100°C', '50°C', '37°C'], why: 'Ice melts at 0°C, and water freezes at 0°C too.' },
        { q: 'Normally, at what temperature does water boil?', a: ['100°C', '0°C', '60°C', '200°C'], why: 'Water boils at 100°C. High on a mountain it boils at a bit less.' },
        { q: 'In which state are water particles far apart and fastest?', a: ['Gas', 'Solid', 'Liquid', 'All the same'], why: 'As a gas (vapour), particles are far apart and move very fast.' },
        { q: 'Put a tray of water in the freezer and it will…', a: ['Freeze into ice', 'Evaporate away', 'Boil', 'Turn into a cloud'], why: 'The freezer is below 0°C, so the water freezes.' },
        { q: 'Why does an ice cube float in a glass of water?', a: ['Ice is lighter than the same amount of water', 'Ice is hollow', 'The water is hot', 'Magic'], why: 'When water freezes its particles spread out a little, so ice is lighter and floats.' },
        { q: 'What is the white “smoke” above a boiling pot?', a: ['Tiny condensed water droplets', 'Smoke from the fire', 'Kitchen dust', 'Visible water vapour'], why: 'Vapour is invisible. When it meets cooler air it condenses into tiny drops, which look white.' }
      ]
    });

    /* =====================================================================
       3. LÀM SẠCH NƯỚC: BÌNH LỌC TỪ CHAI NHỰA
       Mỗi lớp giữ lại một loại chất bẩn. Vi khuẩn quá nhỏ nên lọt qua hết:
       nước lọc xong vẫn phải đun sôi mới uống được.
       ===================================================================== */
    const flC = makeCanvas('cFilter', (w) => clamp(w * .72, 330, 560), () => flTexture());
    const LAYERS = [
      { key: 'gravel', traps: { debris: .93, mud: .15 }, color: '#9ca3af',
        vi: { name: 'Sỏi', what: 'giữ lại rác to: lá, que, cành cây' }, en: { name: 'Gravel', what: 'catches big bits: leaves, sticks, twigs' } },
      { key: 'sand', traps: { debris: 1, mud: .95 }, color: '#e7c98f',
        vi: { name: 'Cát', what: 'giữ lại bùn đất và các hạt nhỏ' }, en: { name: 'Sand', what: 'catches mud and small grains' } },
      { key: 'carbon', traps: { color: .95, mud: .3 }, color: '#1f2937',
        vi: { name: 'Than hoạt tính', what: 'khử màu và mùi hôi' }, en: { name: 'Activated charcoal', what: 'removes colour and bad smells' } },
      { key: 'cotton', traps: { debris: 1, mud: .6, color: .1 }, color: '#f8fafc',
        vi: { name: 'Bông', what: 'giữ cặn còn sót, chặn cát và than rơi xuống' }, en: { name: 'Cotton', what: 'catches leftover bits and keeps sand and charcoal in' } }
    ];
    const layerOn = [true, true, true, true];
    const BATCH = { water: 150, debris: 10, mud: 40, color: 36, germ: 14 };
    let flParts = [], flQueue = [], flPourT = -1, flBoilT = -1, flStage = 'idle';
    let cup = { water: 0, debris: 0, mud: 0, color: 0, germ: 0, boiled: false };
    let flTex = [];
    const germSpots = Array.from({ length: 30 }, () => ({ x: Math.random(), y: Math.random() }));
    function flGeom() {
      const w = flC.w || 640, h = flC.h || 460;
      const cx = w * .37, bw = Math.min(w * .3, h * .42), top = h * .11, lTop = h * .25, L = h * .09;
      const lEnd = lTop + L * 4, neck = lEnd + h * .07, cupTop = neck + h * .07, cupBot = h * .965, cupW = bw * .8;
      return { w, h, cx, bw, top, lTop, L, lEnd, neck, cupTop, cupBot, cupW, left: cx - bw / 2, right: cx + bw / 2 };
    }
    function flTexture() {
      flTex = LAYERS.map((ly) => Array.from({ length: ly.key === 'sand' ? 90 : 26 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() })));
    }
    flTexture();
    function flReset(allLayers) {
      flParts = []; flQueue = []; flPourT = -1; flBoilT = -1; flStage = 'idle';
      cup = { water: 0, debris: 0, mud: 0, color: 0, germ: 0, boiled: false };
      if (allLayers) { layerOn.fill(true); flLayerButtons(); }
      dirty = true;
    }
    function flPour() {
      flReset(false);
      for (const [type, n] of Object.entries(BATCH)) for (let i = 0; i < n; i++) flQueue.push({ type, at: rand(0, 2.6) });
      flQueue.sort((a, b) => a.at - b.at);
      flPourT = 0; flStage = 'pour';
    }
    function flStep(dt) {
      const g = flGeom(), k = g.h / 460;
      if (flPourT >= 0) {
        flPourT += dt;
        while (flQueue.length && flQueue[0].at <= flPourT) {
          const q = flQueue.shift();
          flParts.push({ type: q.type, x: g.cx + rand(-3, 3), y: g.top - 6, vy: 80 * k, tx: rand(g.left + 8, g.right - 8), next: 0, stuck: false, rot: rand(0, TAU) });
        }
        if (!flQueue.length) flPourT = -1;
      }
      for (const p of flParts) {
        if (p.stuck) continue;
        const inLayer = p.y >= g.lTop && p.y < g.lEnd;
        if (p.y < g.lEnd) {
          p.x += (p.tx - p.x) * Math.min(1, dt * 3) + rand(-1, 1) * 10 * dt;
          p.vy = (inLayer ? 60 : 120) * k * (p.type === 'water' ? 1 : .9);
        } else if (p.y < g.neck) {
          p.x += (g.cx - p.x) * Math.min(1, dt * 5); p.vy = 100 * k;
        } else {
          p.x += (g.cx - p.x) * Math.min(1, dt * 10); p.vy = Math.min(p.vy + 600 * k * dt, 260 * k);
        }
        p.y += p.vy * dt;
        while (p.next < 4 && p.y >= g.lTop + p.next * g.L) {
          const i = p.next++;
          const chance = (LAYERS[i].traps[p.type] || 0) * (layerOn[i] ? 1 : 0);
          if (p.type !== 'water' && Math.random() < chance) {
            p.stuck = true;
            p.y = g.lTop + i * g.L + rand(.08, i === 0 ? .45 : .7) * g.L;
            p.x = clamp(p.x, g.left + 5, g.right - 5);
            break;
          }
        }
        const level = cupLevel(g);
        if (!p.stuck && p.y >= level) { p.done = true; cup[p.type]++; }
      }
      flParts = flParts.filter((p) => !p.done);
      const moving = flParts.some((p) => !p.stuck);
      if (flStage === 'pour' && flPourT < 0 && !moving) flStage = 'done';
      if (flBoilT >= 0) {
        flBoilT += dt;
        if (flBoilT > 2.2) { flBoilT = -1; cup.germ = 0; cup.boiled = true; }
      }
    }
    const cupLevel = (g) => g.cupBot - 4 - Math.min(1, cup.water / BATCH.water) * (g.cupBot - g.cupTop) * .72;
    function cupColor() {
      const d = clamp((cup.mud + cup.debris * 3) / (cup.water * .12 + 1), 0, 1);
      const c = clamp(cup.color / (cup.water * .1 + 1), 0, 1);
      const A = hex2rgb('#7dd3fc'), M = hex2rgb('#8b5a2b'), C = hex2rgb('#ca8a04');
      const col = A.map((v, i) => v + (M[i] - v) * d * .85).map((v, i) => v + (C[i] - v) * c * .55);
      return `rgb(${col.map(Math.round).join(',')})`;
    }
    function drawParticle(ctx, p) {
      if (p.type === 'water') { ctx.fillStyle = 'rgba(37,99,235,.55)'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, TAU); ctx.fill(); }
      else if (p.type === 'debris') { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = (p.rot > Math.PI ? '#65a30d' : '#7c4a1e'); ctx.beginPath(); ctx.ellipse(0, 0, 6, 2.6, 0, 0, TAU); ctx.fill(); ctx.restore(); }
      else if (p.type === 'mud') { ctx.fillStyle = '#7c4a1e'; ctx.beginPath(); ctx.arc(p.x, p.y, 2.3, 0, TAU); ctx.fill(); }
      else if (p.type === 'color') { ctx.fillStyle = '#ca8a04'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.9, 0, TAU); ctx.fill(); }
      else { ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.7, 0, TAU); ctx.fill(); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(p.x + 1.7, p.y); ctx.lineTo(p.x + 3.6, p.y + 1); ctx.stroke(); }
    }
    function drawFilter() {
      const g = flGeom(), { w, h } = g, ctx = flC.ctx;
      if (!flC.w) return;
      ctx.fillStyle = '#f8fbff'; ctx.fillRect(0, 0, w, h);
      // bình nước bẩn đang đổ
      const jx = g.cx + g.bw * .62, jy = g.top - h * .04, pouring = flPourT >= 0;
      ctx.save(); ctx.translate(jx, jy); ctx.rotate(pouring ? -.75 : -.15);
      ctx.fillStyle = 'rgba(139,90,43,.75)'; ctx.fillRect(-14, -4, 28, 22);
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.strokeRect(-14, -14, 28, 32);
      ctx.beginPath(); ctx.moveTo(-14, -14); ctx.lineTo(-22, -20); ctx.stroke();
      ctx.restore();
      textLight(ctx, T('Nước bẩn', 'Dirty water'), jx + 26, jy - 6, '#7c4a1e', 11.5, 'left');
      if (pouring) { ctx.strokeStyle = 'rgba(139,90,43,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(jx - 22, jy - 12); ctx.quadraticCurveTo(g.cx + 4, jy - 14, g.cx, g.top + 4); ctx.stroke(); }
      // nước đọng phía trên các lớp
      const pool = flParts.filter((p) => !p.stuck && p.y < g.lTop).length;
      if (pool > 4) { const ph = Math.min(g.lTop - g.top - 4, pool * .35); ctx.fillStyle = 'rgba(139,90,43,.22)'; ctx.fillRect(g.left + 2, g.lTop - ph, g.bw - 4, ph); }
      // các lớp lọc
      LAYERS.forEach((ly, i) => {
        const y0 = g.lTop + i * g.L;
        if (!layerOn[i]) {
          ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = '#cbd5e1'; ctx.strokeRect(g.left + 3, y0 + 2, g.bw - 6, g.L - 4); ctx.restore();
          textLight(ctx, T('(đã bỏ lớp này)', '(layer removed)'), g.cx, y0 + g.L / 2, '#94a3b8', 10.5);
          return;
        }
        ctx.fillStyle = ly.color; ctx.globalAlpha = ly.key === 'cotton' ? .9 : .85; ctx.fillRect(g.left + 2, y0, g.bw - 4, g.L); ctx.globalAlpha = 1;
        for (const t of flTex[i]) {
          const x = g.left + 4 + t.x * (g.bw - 8), y = y0 + 3 + t.y * (g.L - 6);
          if (ly.key === 'gravel') { ctx.fillStyle = t.r > .5 ? '#6b7280' : '#d1d5db'; ctx.beginPath(); ctx.ellipse(x, y, 4 + t.r * 4, 3 + t.r * 2.5, t.r * 3, 0, TAU); ctx.fill(); }
          else if (ly.key === 'sand') { ctx.fillStyle = t.r > .5 ? '#c8a165' : '#f5deb3'; ctx.fillRect(x, y, 1.6, 1.6); }
          else if (ly.key === 'carbon') { ctx.fillStyle = t.r > .5 ? '#000' : '#4b5563'; ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x, y - 3 - t.r * 2); ctx.lineTo(x + 4, y + 1); ctx.lineTo(x, y + 3); ctx.closePath(); ctx.fill(); }
          else { ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x, y, 3 + t.r * 3, 0, TAU); ctx.fill(); }
        }
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.left - 18, y0 + g.L / 2); ctx.lineTo(g.left - 4, y0 + g.L / 2); ctx.stroke();
        textLight(ctx, L(ly).name, g.left - 22, y0 + g.L / 2, '#334155', w < 420 ? 10.5 : 12, 'right', 900);
      });
      // các hạt
      for (const p of flParts) drawParticle(ctx, p);
      // vỏ chai (cắt ngược)
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(g.left, g.top); ctx.lineTo(g.left, g.lEnd); ctx.quadraticCurveTo(g.left, g.neck - h * .02, g.cx - g.bw * .09, g.neck); ctx.lineTo(g.cx - g.bw * .09, g.neck + h * .02);
      ctx.moveTo(g.right, g.top); ctx.lineTo(g.right, g.lEnd); ctx.quadraticCurveTo(g.right, g.neck - h * .02, g.cx + g.bw * .09, g.neck); ctx.lineTo(g.cx + g.bw * .09, g.neck + h * .02);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(100,116,139,.45)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(g.left, g.top); ctx.lineTo(g.right, g.top); ctx.stroke(); ctx.setLineDash([]);
      // cốc hứng nước
      const cl = g.cx - g.cupW / 2, cr = g.cx + g.cupW / 2, lv = cupLevel(g);
      if (cup.water > 0) {
        ctx.fillStyle = cupColor(); ctx.globalAlpha = .85;
        ctx.beginPath(); ctx.moveTo(cl + 3 + (lv - g.cupTop) * .06, lv); ctx.lineTo(cr - 3 - (lv - g.cupTop) * .06, lv); ctx.lineTo(cr - 3 - (g.cupBot - g.cupTop) * .06, g.cupBot - 2); ctx.lineTo(cl + 3 + (g.cupBot - g.cupTop) * .06, g.cupBot - 2); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
        const showGerm = Math.min(cup.germ, germSpots.length);
        for (let i = 0; i < showGerm; i++) { const s = germSpots[i]; drawParticle(ctx, { type: 'germ', x: cl + 10 + s.x * (g.cupW - 20), y: lv + 5 + s.y * (g.cupBot - lv - 10) }); }
        for (let i = 0; i < Math.min(cup.debris, 6); i++) drawParticle(ctx, { type: 'debris', x: cl + 14 + i * 9, y: lv + 2, rot: i * 1.3 });
        if (flBoilT >= 0) {
          ctx.fillStyle = 'rgba(255,255,255,.85)';
          for (let i = 0; i < 10; i++) { const bx = cl + 10 + ((i * 37) % 100) / 100 * (g.cupW - 20), by = g.cupBot - ((clock * 60 + i * 17) % Math.max(4, g.cupBot - lv)); ctx.beginPath(); ctx.arc(bx, by, 2.4, 0, TAU); ctx.fill(); }
        }
      }
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cl, g.cupTop); ctx.lineTo(cl + (g.cupBot - g.cupTop) * .06, g.cupBot); ctx.lineTo(cr - (g.cupBot - g.cupTop) * .06, g.cupBot); ctx.lineTo(cr, g.cupTop); ctx.stroke();
      if (flBoilT >= 0) {
        for (let i = 0; i < 5; i++) { const fx = cl + g.cupW * (.2 + i * .15), fl = 6 + Math.sin(clock * 10 + i) * 2; ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(fx - 3, g.cupBot + 9); ctx.quadraticCurveTo(fx, g.cupBot + 9 - fl * 2, fx + 3, g.cupBot + 9); ctx.fill(); }
      }
      // chú giải
      const lx = w * .7, items = [['debris', T('Rác to (lá, que)', 'Big bits (leaves, sticks)')], ['mud', T('Bùn đất', 'Mud')], ['color', T('Chất gây màu, mùi', 'Colour and smell')], ['germ', T('Vi khuẩn (rất nhỏ)', 'Germs (tiny)')], ['water', T('Nước', 'Water')]];
      textLight(ctx, T('Trong nước bẩn có:', 'Dirty water has:'), lx, h * .3, '#475569', 12, 'left', 900);
      const maxW = w - lx - 26;
      items.forEach(([type, txt], i) => {
        const y = h * .3 + 24 + i * 24;
        drawParticle(ctx, { type, x: lx + 6, y, rot: 1 });
        ctx.font = '800 11.5px system-ui, sans-serif';
        let t2 = txt; while (ctx.measureText(t2).width > maxW && t2.length > 4) t2 = t2.slice(0, -2);
        if (t2 !== txt) t2 = t2.trimEnd() + '…';
        textLight(ctx, t2, lx + 18, y, '#334155', 11.5, 'left');
      });
    }

    let flInfoKey = '', flHudText = '';
    function flInfo() {
      const moving = flParts.some((p) => !p.stuck) || flPourT >= 0;
      const any = cup.water > 0 || moving;
      const st = {
        debris: cup.debris > 0, mud: cup.mud > 1, color: cup.color > 1,
        germ: cup.germ > 0 && !cup.boiled
      };
      const key = [lang, any, moving, flBoilT >= 0, st.debris, st.mud, st.color, st.germ, cup.boiled, layerOn.join('')].join('|');
      if (key !== flInfoKey) {
        flInfoKey = key;
        const roles = LAYERS.map((ly, i) => `<div><b>${L(ly).name}</b><span>${layerOn[i] ? '' : T('(đang bỏ) ', '(removed) ')}${L(ly).what}</span></div>`).join('');
        let body;
        if (!any) {
          body = `<p class="tip">${T('Bấm "Đổ nước bẩn" để bắt đầu. Thử bỏ bớt một lớp lọc để xem nước chảy ra khác thế nào.', 'Press “Pour dirty water” to start. Try removing a layer to see how the water changes.')}</p>`;
        } else {
          const row = (name, bad) => `<div><span>${name}</span><span class="${moving ? 'wait' : bad ? 'no' : 'ok'}">${moving ? T('⏳ đang lọc', '⏳ filtering') : bad ? T('❌ còn', '❌ still there') : T('✅ sạch', '✅ clean')}</span></div>`;
          const germRow = `<div><span>${T('Vi khuẩn', 'Germs')}</span><span class="${moving ? 'wait' : st.germ ? 'no' : 'ok'}">${moving ? T('⏳ đang lọc', '⏳ filtering') : cup.boiled ? T('✅ đã diệt nhờ đun sôi', '✅ killed by boiling') : st.germ ? T('❌ còn (không nhìn thấy)', '❌ still there (invisible)') : T('✅ sạch', '✅ clean')}</span></div>`;
          let verdict = '';
          if (!moving) {
            if (st.debris || st.mud || st.color) {
              const hint = st.debris ? T('Bật lại lớp sỏi hoặc bông để giữ rác.', 'Turn the gravel or cotton back on to catch big bits.')
                : st.mud ? T('Bật lại lớp cát để giữ bùn đất.', 'Turn the sand back on to catch mud.')
                : T('Bật lại lớp than để khử màu và mùi.', 'Turn the charcoal back on to remove colour and smell.');
              verdict = `<p class="warn">⚠️ ${T('Nước vẫn còn bẩn.', 'The water is still dirty.')} ${hint}</p>`;
            } else if (st.germ) {
              verdict = `<p class="warn">${T('⚠️ Nước trông đã trong nhưng vẫn còn vi khuẩn. Phải đun sôi rồi mới uống được!', '⚠️ The water looks clear but still has germs. Boil it before drinking!')}</p>`;
            } else {
              verdict = `<p class="fun">${T('🎉 Nước đã trong và được đun sôi, an toàn để uống.', '🎉 The water is clear and boiled: safe to drink.')}</p>`;
            }
          }
          body = `<div class="checklist">${row(T('Rác to', 'Big bits'), st.debris)}${row(T('Bùn đất', 'Mud'), st.mud)}${row(T('Màu và mùi', 'Colour and smell'), st.color)}${germRow}</div>${verdict}`;
        }
        $('flInfo').innerHTML = `
          <div class="info-title"><span class="emo" aria-hidden="true">🥛</span>
            <div><h3>${T('Kết quả lọc', 'Filter result')}</h3><p class="sub">${T('Mỗi lớp giữ lại một thứ', 'Each layer catches something')}</p></div>
            <button id="flListen" class="btn" type="button">🔊 ${T('Nghe', 'Listen')}</button></div>
          ${body}
          <div class="facts">${roles}</div>`;
        $('flListen').onclick = () => {
          const parts = [...$('flInfo').querySelectorAll('.checklist div, .warn, .fun, .tip, .facts div')].map((n) => n.textContent.replace(/[✅❌⏳⚠️🎉]/gu, '').replace(/\s+/g, ' ').trim());
          speak(parts.join('. '));
        };
      }
      const inCup = cup.water;
      const t = flBoilT >= 0 ? T('🔥 Đang đun sôi nước trong cốc…', '🔥 Boiling the water in the cup…')
        : flPourT >= 0 ? T('🌧️ Đang đổ nước bẩn vào bình…', '🌧️ Pouring dirty water in…')
        : moving ? T(`⏳ Đang lọc: ${inCup} giọt nước đã xuống cốc`, `⏳ Filtering: ${inCup} drops in the cup`)
        : any ? T('✅ Lọc xong. Xem kết quả bên cạnh nhé!', '✅ Done. Check the result!')
        : T('🧪 Bình lọc đã sẵn sàng', '🧪 The filter is ready');
      if (t !== flHudText) { flHudText = t; $('flHud').textContent = t; }
    }
    function flLayerButtons() {
      $('flLayers').innerHTML = LAYERS.map((ly, i) => `<button type="button" class="soft-btn" data-l="${i}" aria-pressed="${layerOn[i]}"></button>`).join('');
      root.querySelectorAll('#flLayers button').forEach((b, i) => { b.textContent = L(LAYERS[i]).name; });
    }
    $('flLayers').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-l]'); if (!b) return;
      const i = +b.dataset.l; layerOn[i] = !layerOn[i]; b.setAttribute('aria-pressed', String(layerOn[i])); dirty = true;
    });
    $('flPour').onclick = () => { cancelSpeech(); flPour(); };
    $('flReset').onclick = () => { cancelSpeech(); flReset(true); };
    $('flBoil').onclick = () => {
      cancelSpeech();
      if (cup.water <= 0) { flHudText = ''; $('flHud').textContent = T('Cốc chưa có nước. Hãy đổ nước bẩn vào bình lọc trước nhé!', 'The cup is empty. Pour some dirty water first!'); return; }
      if (flBoilT < 0 && !cup.boiled) flBoilT = 0;
    };

    const qFilter = makeQuiz($('qFilter'), {
      vi: [
        { q: 'Lớp sỏi trong bình lọc giữ lại thứ gì?', a: ['Rác to như lá, que', 'Vi khuẩn', 'Màu và mùi', 'Muối'], why: 'Khe giữa các viên sỏi khá to nên chỉ giữ được rác to.' },
        { q: 'Lớp than hoạt tính dùng để làm gì?', a: ['Khử màu và mùi', 'Làm nước nóng lên', 'Giữ lại sỏi', 'Thêm vi khuẩn'], why: 'Than hoạt tính có rất nhiều lỗ nhỏ, hút giữ các chất gây màu và mùi.' },
        { q: 'Nước vừa lọc qua bình đã uống ngay được chưa?', a: ['Chưa, phải đun sôi để diệt vi khuẩn', 'Rồi, vì nước đã trong', 'Rồi, nếu để qua đêm', 'Chưa, phải cho thêm cát'], why: 'Bình lọc làm nước trong nhưng không diệt được vi khuẩn. Đun sôi mới diệt được chúng.' },
        { q: 'Vì sao bình lọc không giữ được vi khuẩn?', a: ['Vi khuẩn quá nhỏ, lọt qua các khe', 'Vi khuẩn bơi rất nhanh', 'Vi khuẩn rất nặng', 'Vì thiếu lớp sỏi'], why: 'Vi khuẩn nhỏ đến mức phải dùng kính hiển vi mới thấy, nên lọt qua cả cát và bông.' },
        { q: 'Nếu bỏ lớp cát, nước chảy ra sẽ thế nào?', a: ['Còn đục vì còn bùn đất', 'Sạch hơn', 'Có màu xanh lá', 'Không chảy được nữa'], why: 'Lớp cát giữ bùn đất. Bỏ cát đi thì bùn lọt xuống cốc làm nước đục.' },
        { q: 'Việc nào giúp tiết kiệm nước?', a: ['Khóa vòi khi đang đánh răng', 'Để vòi chảy khi không dùng', 'Tắm thật lâu', 'Xả nước rửa sân mỗi ngày'], why: 'Nước sạch rất quý. Khóa vòi khi không dùng giúp tiết kiệm rất nhiều nước.' }
      ],
      en: [
        { q: 'What does the gravel layer catch?', a: ['Big bits like leaves and sticks', 'Germs', 'Colour and smell', 'Salt'], why: 'The gaps between pebbles are big, so only big bits get caught.' },
        { q: 'What is activated charcoal for?', a: ['Removing colour and smell', 'Heating the water', 'Holding the gravel', 'Adding germs'], why: 'Charcoal is full of tiny holes that trap the stuff causing colour and smell.' },
        { q: 'Can you drink the water right after the filter?', a: ['No, boil it first to kill germs', 'Yes, it is clear', 'Yes, after a night', 'No, add more sand'], why: 'The filter makes water clear but cannot kill germs. Boiling does.' },
        { q: 'Why can’t the filter catch germs?', a: ['Germs are so tiny they slip through', 'Germs swim fast', 'Germs are heavy', 'There is no gravel'], why: 'Germs are so small you need a microscope, so they pass through sand and cotton.' },
        { q: 'If you remove the sand, the water will…', a: ['Stay cloudy with mud', 'Be cleaner', 'Turn green', 'Stop flowing'], why: 'Sand catches mud. Without it, mud reaches the cup.' },
        { q: 'Which saves water?', a: ['Turning off the tap while brushing teeth', 'Leaving the tap running', 'Very long showers', 'Hosing the yard every day'], why: 'Clean water is precious. Turning off taps saves a lot.' }
      ]
    });

    /* ---------- tabs & vòng lặp ---------- */
    const ALL_CANVAS = [cyC, potC, stC, flC];
    let tab = 'cycle';
    root.querySelectorAll('.water-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.water-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('w-' + x.dataset.p).classList.toggle('hidden', x !== b); });
      ALL_CANVAS.forEach((o) => o.fit()); dirty = true;
    }));
    let last = performance.now();
    function loop(now) {
      const dt = Math.max(0, Math.min(.1, (now - last) / 1000)); last = now; clock += dt;
      if (tab === 'cycle') {
        cyWarmUp();
        if (cyPlaying) { cyStep(dt); potStep(dt); }
        cyHud(); drawCycle(); drawPot();
      } else if (tab === 'states') {
        stStep(dt); stInfo(); drawStates();
      } else {
        flStep(dt); flInfo(); drawFilter();
      }
      dirty = false;
      if (!destroyed) rafId = window.requestAnimationFrame(loop);
    }

    /* ---------- ngôn ngữ ---------- */
    function refreshTexts() {
      applyStatic(); buildStages(); flLayerButtons();
      setCyPlaying(cyPlaying); updCySliders();
      cyInfoKey = ''; stInfoKey = ''; stTempShown = null; stHudText = ''; flInfoKey = ''; flHudText = ''; cyHudText = '';
      cyInfo(); stInfo(); flInfo();
      [qCycle, qStates, qFilter].forEach((q) => q.refresh());
      dirty = true;
    }
    function setLang(l) {
      lang = l === 'en' ? 'en' : 'vi';
      root.querySelectorAll('.water-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.water-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.water-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    ALL_CANVAS.forEach((o) => o.fit());
    refreshTexts();

    // Tab/cửa sổ bị ẩn thì dừng giọng đọc cũ.
    const onHidden = () => { if (document.hidden) cancelSpeech(); };
    document.addEventListener('visibilitychange', onHidden);
    cleanupFns.push(() => document.removeEventListener('visibilitychange', onHidden));
    rafId = window.requestAnimationFrame(loop);

    return () => {
      destroyed = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      cleanupFns.splice(0).forEach((fn) => { try { fn(); } catch (_) {} });
      cancelSpeech();
    };
  }
})();
