/* Epsilon Edu - Tool: Mat Trang (The Moon)
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js).
 * Gom 3 phan: Cac pha Mat Trang, Nhat thuc & Nguyet thuc, Thuy trieu.
 * Dang ky: window.CLASS1_TOOL_MODULES.moon = { render(context), destroy() }
 */
(() => {
  "use strict";

  const TOOL_ID = "moon";
  let activeCleanup = null;

  const CSS = `
.moon-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.moon-tool *{box-sizing:border-box}.moon-tool button,.moon-tool input{font:inherit}.moon-tool button{cursor:pointer}.moon-tool .hidden{display:none!important}
.moon-tool button:focus-visible,.moon-tool canvas:focus-visible,.moon-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.moon-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.moon-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.moon-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.moon-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.moon-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.moon-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.moon-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.moon-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.moon-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.moon-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.moon-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.moon-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.moon-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.moon-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.moon-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.moon-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.moon-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.moon-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.moon-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.moon-panel{width:100%}.moon-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.moon-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.moon-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.moon-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.moon-tool .card-head.compact{margin-bottom:9px}
.moon-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.moon-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.moon-tool .btn,.moon-tool .soft-btn,.moon-tool .segmented button,.moon-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.moon-tool .btn:hover,.moon-tool .soft-btn:hover,.moon-tool .segmented button:hover,.moon-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.moon-tool .btn{padding:0 12px}.moon-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.moon-tool .segmented{display:flex;gap:7px;margin:0}.moon-tool .segmented button{padding:0 13px}
.moon-tool .segmented button[aria-pressed="true"],.moon-tool .soft-btn[aria-pressed="true"],.moon-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.moon-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.moon-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.moon-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.moon-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.moon-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.moon-tool .range-control input{width:100%;accent-color:#8b5cf6}.moon-tool .range-control b{color:#7c3aed;font-size:13px}
.moon-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.moon-tool .soft-btn{padding:0 12px}
.moon-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.moon-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.moon-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.moon-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.moon-tool .info-title{display:flex;align-items:center;gap:10px}.moon-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.moon-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.moon-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.moon-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.moon-tool .facts{display:grid;gap:6px;margin-top:10px}.moon-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.moon-tool .facts b{color:#7c3aed;font-size:13.5px}.moon-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.moon-tool .fun,.moon-tool .warn,.moon-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.moon-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.moon-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.moon-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.moon-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.moon-tool .state-big.up{color:#0f766e}.moon-tool .state-big.down{color:#b45309}
.moon-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.moon-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.moon-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.moon-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.moon-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.moon-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.moon-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.moon-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.moon-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.moon-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.moon-tool .qopt:hover{filter:brightness(.985)}.moon-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.moon-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.moon-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.moon-tool .qfb,.moon-tool .score{font-size:13px;font-weight:900}.moon-tool .qfb.ok{color:#15803d}.moon-tool .qfb.no{color:#be123c}.moon-tool .score{color:#7c3aed}
.moon-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.moon-grid{grid-template-columns:1fr;align-items:start}.moon-side{grid-template-rows:auto auto;height:auto}.moon-tool .control-grid{grid-template-columns:1fr}.moon-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.moon-hero{flex-wrap:wrap;padding:12px}.moon-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.moon-tabs{grid-template-columns:1fr}.moon-tabs .tab{min-height:40px}.moon-card{padding:11px;border-radius:18px}.moon-tool .card-head{align-items:flex-start;flex-direction:column}.moon-tool .head-actions{width:100%;justify-content:space-between}.moon-tool .head-actions .segmented{flex:1;min-width:0}.moon-tool .head-actions .segmented button{flex:1;padding:0 8px}.moon-tool .qopts{grid-template-columns:1fr}.moon-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.moon-tool *{transition:none!important}}
`;

  const HTML = `
<section class="moon-tool" data-moon-tool>
  <div class="moon-hero">
    <div class="moon-hero-icon" aria-hidden="true">🌙</div>
    <div>
      <p class="moon-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="moon-lead" data-t="lead"></p>
    </div>
    <div class="moon-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="mAudioNotice" class="moon-audio-notice hidden" role="status" aria-live="polite"></div>

  <div class="moon-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="phase" data-t="tabPhase"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="eclipse" data-t="tabEclipse"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="tide" data-t="tabTide"></button>
  </div>

  <!-- ===== 1. CÁC PHA MẶT TRĂNG ===== -->
  <section id="m-phase" class="moon-panel" role="tabpanel">
    <div class="moon-grid">
      <article class="moon-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="phaseH"></h2></div>
          <div class="head-actions"><button id="phPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="cPhase" role="img" tabindex="0" data-ta="phaseCanvas"></canvas></div>
        <p id="phHud" class="hud" aria-live="polite"></p>
        <div id="phPresets" class="preset-row phases" role="group" data-ta="phasePick"></div>
        <div class="control-grid">
          <label class="range-control"><span data-t="speed"></span><input id="phSpeed" type="range" min="0" max="100" value="35" step="1"><b id="phSpeedTxt"></b></label>
          <div class="toggle-row">
            <button id="phRays" class="soft-btn" type="button" aria-pressed="true" data-t="rays"></button>
            <button id="phGhost" class="soft-btn" type="button" aria-pressed="false" data-t="ghost"></button>
          </div>
        </div>
      </article>
      <div class="moon-side">
        <aside class="moon-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeView"></span><h2 data-t="viewVN"></h2></div></div>
          <div class="canvas-wrap"><canvas id="cPhaseView" role="img" data-ta="viewCanvas"></canvas></div>
          <div id="phInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qPhase" class="moon-card quiz-card"></article>
      </div>
    </div>
  </section>

  <!-- ===== 2. NHẬT THỰC & NGUYỆT THỰC ===== -->
  <section id="m-eclipse" class="moon-panel hidden" role="tabpanel">
    <div class="moon-grid">
      <article class="moon-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="ecH"></h2></div>
          <div class="head-actions">
            <div class="segmented" role="group" data-ta="ecModeLabel">
              <button id="ecSolar" type="button" aria-pressed="true" data-t="ecSolar"></button>
              <button id="ecLunar" type="button" aria-pressed="false" data-t="ecLunar"></button>
            </div>
            <button id="ecPlay" class="btn main" type="button"></button>
          </div>
        </div>
        <div class="canvas-wrap"><canvas id="cEclipse" role="img" data-ta="ecCanvas"></canvas></div>
        <p id="ecHud" class="hud" aria-live="polite"></p>
        <div class="control-grid">
          <label class="range-control"><span data-t="ecPosL"></span><input id="ecPos" type="range" min="-100" max="100" value="-90" step="1"></label>
          <div class="toggle-row" role="group" data-ta="ecPathLabel">
            <button id="ecAligned" class="soft-btn" type="button" aria-pressed="true" data-t="ecAligned"></button>
            <button id="ecTilted" class="soft-btn" type="button" aria-pressed="false" data-t="ecTilted"></button>
          </div>
        </div>
        <div class="preset-row" role="group" data-ta="ecPresetLabel">
          <button type="button" data-ec="start" data-t="ecStart"></button>
          <button type="button" data-ec="partial" data-t="ecPartial"></button>
          <button type="button" data-ec="total" data-t="ecTotal"></button>
        </div>
      </article>
      <div class="moon-side">
        <aside class="moon-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeView"></span><h2 data-t="ecView"></h2></div></div>
          <div class="canvas-wrap"><canvas id="cEclView" role="img" data-ta="ecViewCanvas"></canvas></div>
          <div id="ecInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qEclipse" class="moon-card quiz-card"></article>
      </div>
    </div>
  </section>

  <!-- ===== 3. THỦY TRIỀU ===== -->
  <section id="m-tide" class="moon-panel hidden" role="tabpanel">
    <div class="moon-grid">
      <article class="moon-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="tdH"></h2></div>
          <div class="head-actions"><button id="tdPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="cTide" role="img" data-ta="tdCanvas"></canvas></div>
        <p id="tdHud" class="hud" aria-live="polite"></p>
        <div class="control-grid">
          <label class="range-control"><span data-t="speed"></span><input id="tdSpeed" type="range" min="0" max="100" value="35" step="1"><b id="tdSpeedTxt"></b></label>
          <div class="toggle-row"><button id="tdSun" class="soft-btn" type="button" aria-pressed="true" data-t="tdSun"></button></div>
        </div>
        <div class="preset-row" role="group" data-ta="tdPhaseLabel">
          <button type="button" data-td="0" data-t="tdNew"></button>
          <button type="button" data-td="0.5" data-t="tdQuarter"></button>
          <button type="button" data-td="1" data-t="tdFull"></button>
        </div>
      </article>
      <div class="moon-side">
        <aside class="moon-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeBeach"></span><h2 data-t="beachH"></h2></div></div>
          <div class="canvas-wrap"><canvas id="cBeach" role="img" data-ta="beachCanvas"></canvas></div>
          <div id="tdInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qTide" class="moon-card quiz-card"></article>
      </div>
    </div>
  </section>
</section>`;

  function render(context = {}) {
    if (activeCleanup) { try { activeCleanup(); } catch (_) {} activeCleanup = null; }
    const host = context.host;
    if (!(host instanceof Element)) return;
    host.innerHTML = `<style>${CSS}</style>${HTML}`;
    const root = host.querySelector("[data-moon-tool]");
    if (!root) return;
    activeCleanup = initMoonTool(root, context);
  }

  function destroy() {
    if (!activeCleanup) return;
    try { activeCleanup(); } catch (_) {}
    activeCleanup = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[TOOL_ID] = Object.freeze({ render, destroy });

  function initMoonTool(root, context) {
    const TAU = Math.PI * 2;
    const LUNAR = 29.53;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const wrap = (a) => ((a % TAU) + TAU) % TAU;
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
      title: ['Mặt Trăng', 'The Moon'],
      lead: ['Kéo Mặt Trăng quanh Trái Đất để hiểu vì sao trăng tròn, trăng khuyết, khi nào có nhật thực, nguyệt thực và vì sao biển có thủy triều.',
             'Drag the Moon around the Earth to see why it waxes and wanes, when eclipses happen, and why the sea has tides.'],
      tabsLabel: ['Các nội dung về Mặt Trăng', 'Moon sections'],
      tabPhase: ['🌙 Các pha Mặt Trăng', '🌙 Moon phases'],
      tabEclipse: ['🌑 Nhật thực & Nguyệt thực', '🌑 Eclipses'],
      tabTide: ['🌊 Thủy triều', '🌊 Tides'],
      eyeSim: ['Mô phỏng', 'Simulation'],
      eyeView: ['Nhìn lên bầu trời', 'Look up at the sky'],
      speed: ['Tốc độ mô phỏng', 'Simulation speed'],
      phaseH: ['Mặt Trăng quay quanh Trái Đất', 'The Moon orbits the Earth'],
      phaseCanvas: ['Mặt Trăng quay quanh Trái Đất, nhìn từ trên xuống. Kéo Mặt Trăng hoặc dùng phím mũi tên.', 'The Moon orbiting the Earth, seen from above. Drag the Moon or use the arrow keys.'],
      phasePick: ['Chọn nhanh pha trăng', 'Quick phase picks'],
      rays: ['Tia nắng', 'Sunlight'],
      ghost: ['Hiện 8 vị trí', 'Show 8 positions'],
      viewVN: ['Trăng nhìn từ Việt Nam', 'The Moon seen from Vietnam'],
      viewCanvas: ['Hình dạng Mặt Trăng nhìn từ Việt Nam', 'The Moon’s shape as seen from Vietnam'],
      ecH: ['Bóng của Mặt Trăng và Trái Đất', 'Shadows of the Moon and the Earth'],
      ecModeLabel: ['Loại hiện tượng', 'Eclipse type'],
      ecSolar: ['☀️ Nhật thực', '☀️ Solar'],
      ecLunar: ['🌕 Nguyệt thực', '🌕 Lunar'],
      ecCanvas: ['Mô phỏng bóng tối khi Mặt Trời, Mặt Trăng và Trái Đất thẳng hàng', 'Shadows when the Sun, Moon and Earth line up'],
      ecPosL: ['Kéo để di chuyển Mặt Trăng', 'Drag to move the Moon'],
      ecPathLabel: ['Đường đi của Mặt Trăng', 'The Moon’s path'],
      ecAligned: ['Thẳng hàng', 'Lined up'],
      ecTilted: ['Đi lệch (quỹ đạo nghiêng)', 'Off the line (tilted orbit)'],
      ecPresetLabel: ['Chọn nhanh thời điểm', 'Quick moments'],
      ecStart: ['Chưa bắt đầu', 'Not started'],
      ecPartial: ['Một phần', 'Partial'],
      ecTotal: ['Toàn phần', 'Total'],
      ecView: ['Nhìn từ Trái Đất', 'Seen from Earth'],
      ecViewCanvas: ['Hiện tượng nhìn từ Trái Đất', 'The eclipse as seen from Earth'],
      tdH: ['Mặt Trăng kéo nước biển', 'The Moon pulls on the ocean'],
      tdCanvas: ['Lớp nước biển phồng lên về phía Mặt Trăng và phía đối diện', 'The ocean bulges toward the Moon and on the opposite side'],
      tdSun: ['Lực hút Mặt Trời', 'Sun’s pull'],
      tdPhaseLabel: ['Chọn pha trăng', 'Pick a moon phase'],
      tdNew: ['🌑 Trăng non', '🌑 New moon'],
      tdQuarter: ['🌓 Bán nguyệt', '🌓 Quarter moon'],
      tdFull: ['🌕 Trăng tròn', '🌕 Full moon'],
      eyeBeach: ['Quan sát bờ biển', 'At the seaside'],
      beachH: ['Bãi biển Vũng Tàu', 'Vung Tau beach'],
      beachCanvas: ['Mực nước ở bãi biển và biểu đồ nước lên xuống trong 24 giờ', 'Water level at the beach and a 24-hour tide chart']
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
    const audioNotice = $('mAudioNotice');
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
      if (!c) throw new Error(`MOON_CANVAS_MISSING:${id}`);
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
    const LAND = [[.35, .5, .36], [2.1, .48, .3], [3.5, .55, .3], [4.8, .42, .34], [1.25, .12, .22], [5.7, .62, .18]];
    // Trái Đất: lightAng = hướng tới Mặt Trời (radian, toạ độ màn hình), rot = góc quay của các lục địa
    function drawEarth(ctx, x, y, r, lightAng = Math.PI, rot = 0, ocean = '#2f7fe0') {
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip();
      ctx.fillStyle = ocean; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
      ctx.fillStyle = '#4caf50';
      for (const [ang, dist, s] of LAND) {
        const a = ang + rot;
        ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * dist * r, y - Math.sin(a) * dist * r, s * r, s * r * .7, -a, 0, TAU); ctx.fill();
      }
      const lx = Math.cos(lightAng), ly = Math.sin(lightAng);
      const g = ctx.createLinearGradient(x + lx * r, y + ly * r, x - lx * r, y - ly * r);
      g.addColorStop(0, 'rgba(255,255,255,.14)'); g.addColorStop(.47, 'rgba(0,0,0,0)'); g.addColorStop(.55, 'rgba(5,8,30,.62)'); g.addColorStop(1, 'rgba(5,8,30,.75)');
      ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
      ctx.restore();
      ctx.strokeStyle = 'rgba(160,210,255,.55)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
    }
    const CRATERS = [[-.3, -.25, .18], [.25, .1, .22], [-.1, .38, .13], [.36, -.36, .1], [-.45, .15, .1], [.05, -.05, .08]];
    function drawCraters(ctx, x, y, r, alpha = .32) {
      ctx.fillStyle = `rgba(120,112,92,${alpha})`;
      for (const [cx, cy, cr] of CRATERS) { ctx.beginPath(); ctx.arc(x + cx * r, y + cy * r, cr * r, 0, TAU); ctx.fill(); }
    }
    // Mặt Trăng nhìn từ trên xuống: nửa hướng về Mặt Trời luôn sáng
    function drawMoonBall(ctx, x, y, r, lightAng = Math.PI) {
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#3a3f58'; ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, lightAng - Math.PI / 2, lightAng + Math.PI / 2); ctx.closePath(); ctx.clip();
      ctx.fillStyle = '#f3edd6'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); drawCraters(ctx, x, y, r, .28);
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
    }
    // Hình trăng nhìn từ Bắc bán cầu. a: 0 = trăng non, PI = trăng tròn
    function phasePath(ctx, cx, cy, r, a) {
      a = wrap(a);
      const waxing = a < Math.PI, c = Math.cos(a), N = 56;
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const t = -Math.PI / 2 + Math.PI * i / N, yy = cy + r * Math.sin(t), s = r * Math.cos(t);
        const x = waxing ? cx + s : cx - s;
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      for (let i = N; i >= 0; i--) {
        const t = -Math.PI / 2 + Math.PI * i / N, yy = cy + r * Math.sin(t), s = r * Math.cos(t);
        ctx.lineTo(waxing ? cx + c * s : cx - c * s, yy);
      }
      ctx.closePath();
    }
    function drawPhaseDisk(ctx, cx, cy, r, a, earthshine = .16, glow = true) {
      const lit = (1 - Math.cos(a)) / 2;
      if (glow && lit > .02) {
        const g = ctx.createRadialGradient(cx, cy, r * .8, cx, cy, r * 1.9);
        g.addColorStop(0, `rgba(255,248,220,${.22 * lit + .05})`); g.addColorStop(1, 'rgba(255,248,220,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r * 1.9, 0, TAU); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fillStyle = `rgba(90,100,135,${earthshine})`; ctx.fill();
      ctx.save(); phasePath(ctx, cx, cy, r, a); ctx.clip();
      const g2 = ctx.createRadialGradient(cx - r * .25, cy - r * .25, r * .1, cx, cy, r);
      g2.addColorStop(0, '#fffdf2'); g2.addColorStop(1, '#e6dfc4');
      ctx.fillStyle = g2; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
      drawCraters(ctx, cx, cy, r);
      ctx.restore();
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
    // phần giao nhau của hai hình tròn (để tính % bị che)
    function circOverlap(r1, r2, d) {
      if (d >= r1 + r2) return 0;
      if (d <= Math.abs(r1 - r2)) return Math.PI * Math.min(r1, r2) ** 2;
      const a1 = r1 * r1 * Math.acos(clamp((d * d + r1 * r1 - r2 * r2) / (2 * d * r1), -1, 1));
      const a2 = r2 * r2 * Math.acos(clamp((d * d + r2 * r2 - r1 * r1) / (2 * d * r2), -1, 1));
      const k = .5 * Math.sqrt(Math.max(0, (-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2)));
      return a1 + a2 - k;
    }
    const lineAtX = (p, q, X) => ({ x: X, y: p.y + (q.y - p.y) * (X - p.x) / (q.x - p.x) });
    function intersect(p1, p2, p3, p4) {
      const d = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
      const a = p1.x * p2.y - p1.y * p2.x, b = p3.x * p4.y - p3.y * p4.x;
      return { x: (a * (p3.x - p4.x) - (p1.x - p2.x) * b) / d, y: (a * (p3.y - p4.y) - (p1.y - p2.y) * b) / d };
    }
    function polygon(ctx, pts) { ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.closePath(); }

    // Ngày âm lịch & giờ
    function lunarDay(a) { return clamp(Math.floor(wrap(a) / TAU * LUNAR) + 1, 1, 30); }
    function lunarDayText(n) {
      if (lang === 'en') return `lunar day ${n}`;
      if (n === 15) return 'ngày rằm (15)';
      return n <= 10 ? `mùng ${n}` : `ngày ${n}`;
    }
    function clockText(hours) {
      const hh = ((hours % 24) + 24) % 24, H = Math.floor(hh), m = Math.floor((hh - H) * 60);
      return `${String(H).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }
    function hourWords(H) {
      H = ((Math.round(H) % 24) + 24) % 24;
      if (lang === 'en') { const h12 = H % 12 === 0 ? 12 : H % 12; return `around ${h12} ${H < 12 ? 'AM' : 'PM'}`; }
      if (H === 0) return 'khoảng 12 giờ đêm';
      if (H === 12) return 'khoảng 12 giờ trưa';
      const part = H < 5 ? 'đêm' : H < 11 ? 'sáng' : H < 13 ? 'trưa' : H < 18 ? 'chiều' : H < 23 ? 'tối' : 'đêm';
      return `khoảng ${H > 12 ? H - 12 : H} giờ ${part}`;
    }
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
    const stars = makeStars(110), viewStars = makeStars(45);

    /* =====================================================================
       1. CÁC PHA MẶT TRĂNG
       Quy ước: Mặt Trời ở bên trái. Góc a = 0 là trăng non (Mặt Trăng ở giữa
       Mặt Trời và Trái Đất), a = PI là trăng tròn. Nhìn từ cực Bắc, Mặt Trăng
       quay ngược chiều kim đồng hồ.
       ===================================================================== */
    const PHASES = [
      { emo: '🌑', a: 0, from: -1.0, to: 1.0,
        vi: { name: 'Trăng non', day: 'mùng 1 âm lịch', see: 'Không nhìn thấy. Mặt Trăng ở cùng phía với Mặt Trời, nửa được chiếu sáng quay ra phía sau.',
              fact: 'Mùng 1 âm lịch là ngày trăng non. Đêm đó trời rất tối nên rất hợp để ngắm sao.' },
        en: { name: 'New moon', day: 'lunar day 1', see: 'Not visible. The Moon is on the same side as the Sun, and its lit half faces away from us.',
              fact: 'The first day of the lunar month is the new moon. The night sky is very dark, which is great for stargazing.' } },
      { emo: '🌒', a: Math.PI / 4, from: 1.0, to: 6.4,
        vi: { name: 'Trăng lưỡi liềm đầu tháng', day: 'khoảng mùng 3 – mùng 5', see: 'Chiều tối, ở phía Tây, ngay sau khi Mặt Trời lặn.',
              fact: 'Khi trăng còn mảnh, đôi khi ta thấy cả phần tối mờ mờ của Mặt Trăng. Đó là ánh sáng từ Trái Đất hắt lên Mặt Trăng.' },
        en: { name: 'Waxing crescent', day: 'about lunar days 3 – 5', see: 'In the early evening, low in the west, just after sunset.',
              fact: 'With a thin crescent you can sometimes see the dark part glowing faintly. That is sunlight bounced off the Earth, called earthshine.' } },
      { emo: '🌓', a: Math.PI / 2, from: 6.4, to: 8.4,
        vi: { name: 'Trăng bán nguyệt đầu tháng', day: 'khoảng mùng 7 – mùng 8', see: 'Buổi chiều và nửa đầu đêm.',
              fact: 'Ta thấy nửa hình tròn sáng nên gọi là "bán nguyệt" (nửa vầng trăng). Lúc này Mặt Trăng đã đi được 1/4 vòng quanh Trái Đất.' },
        en: { name: 'First quarter', day: 'about lunar days 7 – 8', see: 'In the afternoon and the first half of the night.',
              fact: 'We see half of the disk lit. It is called a "quarter" because the Moon has gone a quarter of the way around the Earth.' } },
      { emo: '🌔', a: 3 * Math.PI / 4, from: 8.4, to: 13.8,
        vi: { name: 'Trăng gần tròn đầu tháng', day: 'khoảng mùng 10 – 13', see: 'Từ chiều đến quá nửa đêm.',
              fact: 'Mỗi đêm phần sáng to thêm một chút. Ta nói trăng đang "tròn dần".' },
        en: { name: 'Waxing gibbous', day: 'about lunar days 10 – 13', see: 'From the afternoon until after midnight.',
              fact: 'The lit part grows a little each night. We say the Moon is "waxing".' } },
      { emo: '🌕', a: Math.PI, from: 13.8, to: 15.8,
        vi: { name: 'Trăng tròn (trăng rằm)', day: 'ngày rằm, 15 âm lịch', see: 'Cả đêm: trăng mọc khi Mặt Trời lặn và lặn khi Mặt Trời mọc.',
              fact: 'Tết Trung thu là rằm tháng Tám âm lịch. Đêm đó trăng tròn, cả nhà cùng phá cỗ trông trăng.' },
        en: { name: 'Full moon', day: 'lunar day 15', see: 'All night: it rises at sunset and sets at sunrise.',
              fact: 'Vietnam’s Mid-Autumn Festival is on the 15th day of the 8th lunar month, a full-moon night for mooncakes and lanterns.' } },
      { emo: '🌖', a: 5 * Math.PI / 4, from: 15.8, to: 21.1,
        vi: { name: 'Trăng gần tròn cuối tháng', day: 'khoảng ngày 17 – 20', see: 'Mọc vào buổi tối, nhìn thấy đến sáng sớm.',
              fact: 'Sau ngày rằm, phần sáng nhỏ dần. Ta nói trăng đang "khuyết dần".' },
        en: { name: 'Waning gibbous', day: 'about lunar days 17 – 20', see: 'Rises in the evening and stays until early morning.',
              fact: 'After the full moon the lit part shrinks. We say the Moon is "waning".' } },
      { emo: '🌗', a: 3 * Math.PI / 2, from: 21.1, to: 23.1,
        vi: { name: 'Trăng bán nguyệt cuối tháng', day: 'khoảng ngày 22 – 23', see: 'Nửa sau đêm và buổi sáng. Có khi thấy trăng giữa trời xanh!',
              fact: 'Buổi sáng trên đường đi học, bé có thể thấy nửa vầng trăng trên bầu trời xanh.' },
        en: { name: 'Last quarter', day: 'about lunar days 22 – 23', see: 'After midnight and in the morning, sometimes in a blue daytime sky!',
              fact: 'On the way to school in the morning you may spot a half moon in the blue sky.' } },
      { emo: '🌘', a: 7 * Math.PI / 4, from: 23.1, to: 28.5,
        vi: { name: 'Trăng lưỡi liềm cuối tháng', day: 'khoảng ngày 25 – 28', see: 'Rạng sáng, ở phía Đông, trước khi Mặt Trời mọc.',
              fact: 'Lưỡi liềm cuối tháng cong ngược với lưỡi liềm đầu tháng: phần sáng nằm bên trái.' },
        en: { name: 'Waning crescent', day: 'about lunar days 25 – 28', see: 'Before dawn, low in the east.',
              fact: 'This crescent faces the opposite way from the evening crescent: its lit part is on the left.' } }
    ];
    function phaseIndexOf(a) {
      const d = wrap(a) / TAU * LUNAR;
      if (d < 1 || d >= 28.5) return 0;
      return PHASES.findIndex((p, i) => i > 0 && d >= p.from && d < p.to);
    }

    let phA = Math.PI * 0.42;
    let phPlaying = !reduceMotion, phRays = true, phGhost = false, phDrag = false, phTouched = false;
    const phC = makeCanvas('cPhase', (w) => clamp(w * .76, 300, 600));
    const phV = makeCanvas('cPhaseView', (w) => clamp(w * .56, 170, 260));
    const phDaysPerSec = () => .25 + Math.pow(+$('phSpeed').value / 100, 1.6) * 6;
    function phGeom() {
      const { w, h } = phC;
      const ex = w * .58, ey = h / 2, R = Math.min(h * .33, w * .3);
      return { w, h, ex, ey, R, re: Math.max(12, h * .075), rm: Math.max(7, h * .04), sunX: -h * .14, sunR: h * .3 };
    }
    const moonPos = (g, a) => ({ x: g.ex - g.R * Math.cos(a), y: g.ey + g.R * Math.sin(a) });

    function drawPhase() {
      const g = phGeom(), ctx = phC.ctx, { w, h } = g;
      if (!w) return;
      const bg = ctx.createLinearGradient(0, 0, w, 0); bg.addColorStop(0, '#1a1840'); bg.addColorStop(1, '#0b0f2e');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
      drawStars(ctx, w, h, stars, .8, clock);
      drawSun(ctx, g.sunX, g.ey, g.sunR);
      label(ctx, T('Mặt Trời', 'Sun'), Math.max(36, g.sunX + g.sunR * .55), g.ey + g.sunR + 16, '#fde68a', 13);
      // tia nắng chạy từ trái sang phải
      if (phRays) {
        const off = reduceMotion ? 0 : (clock * 40) % 26;
        ctx.save(); ctx.strokeStyle = 'rgba(253,224,71,.28)'; ctx.lineWidth = 1.4; ctx.setLineDash([12, 14]); ctx.lineDashOffset = -off;
        for (let i = 0; i < 9; i++) { const y = h * (.1 + i * .1); ctx.beginPath(); ctx.moveTo(g.sunX + g.sunR + 8, y); ctx.lineTo(w - 10, y); ctx.stroke(); }
        ctx.restore();
        ctx.fillStyle = 'rgba(253,224,71,.4)';
        for (let i = 0; i < 9; i += 2) { const y = h * (.1 + i * .1); ctx.beginPath(); ctx.moveTo(w - 8, y); ctx.lineTo(w - 16, y - 4); ctx.lineTo(w - 16, y + 4); ctx.fill(); }
      }
      // quỹ đạo + chiều quay
      ctx.save(); ctx.strokeStyle = 'rgba(196,181,253,.5)'; ctx.lineWidth = 1.3; ctx.setLineDash([5, 6]);
      ctx.beginPath(); ctx.arc(g.ex, g.ey, g.R, 0, TAU); ctx.stroke(); ctx.restore();
      { // mũi tên cong cho biết chiều quay (ngược chiều kim đồng hồ)
        const rr = g.R + g.rm * 2.6, a0 = Math.PI * .62, a1 = Math.PI * .8;
        ctx.strokeStyle = 'rgba(196,181,253,.85)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(g.ex, g.ey, rr, -a0, -a1, true); ctx.stroke();
        const tip = { x: g.ex + rr * Math.cos(a1), y: g.ey - rr * Math.sin(a1) }, back = { x: g.ex + rr * Math.cos(a1 - .06), y: g.ey - rr * Math.sin(a1 - .06) };
        arrow(ctx, back.x, back.y, tip.x, tip.y, 'rgba(196,181,253,.85)', 2, 9);
      }
      // 8 vị trí: vòng trong là Mặt Trăng thật (luôn sáng nửa bên trái), vòng ngoài là hình ta nhìn thấy
      if (phGhost) {
        PHASES.forEach((p) => {
          const m = moonPos(g, p.a);
          ctx.globalAlpha = .55; drawMoonBall(ctx, m.x, m.y, g.rm * .8); ctx.globalAlpha = 1;
          const k = 1 + (g.rm * 3.1) / g.R;
          const vx = g.ex + (m.x - g.ex) * k, vy = g.ey + (m.y - g.ey) * k;
          ctx.fillStyle = 'rgba(15,23,60,.85)'; ctx.beginPath(); ctx.arc(vx, vy, g.rm * 1.05, 0, TAU); ctx.fill();
          drawPhaseDisk(ctx, vx, vy, g.rm * .9, p.a, .3, false);
        });
      }
      // Trái Đất
      drawEarth(ctx, g.ex, g.ey, g.re, Math.PI, clock * .15);
      label(ctx, T('Trái Đất', 'Earth'), g.ex, g.ey + g.re + 13, '#bfdbfe', 12);
      // Mặt Trăng + tầm nhìn từ Trái Đất
      const m = moonPos(g, phA);
      ctx.save(); ctx.strokeStyle = 'rgba(244,114,182,.75)'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(g.ex, g.ey); ctx.lineTo(m.x, m.y); ctx.stroke(); ctx.restore();
      if (phDrag) { ctx.fillStyle = 'rgba(244,114,182,.25)'; ctx.beginPath(); ctx.arc(m.x, m.y, g.rm * 2, 0, TAU); ctx.fill(); }
      drawMoonBall(ctx, m.x, m.y, g.rm * 1.25);
      const ly = m.y < g.ey ? m.y - g.rm * 1.25 - 11 : m.y + g.rm * 1.25 + 12;
      label(ctx, T('Mặt Trăng', 'Moon'), m.x, ly, '#fbcfe8', 12);
      if (!phTouched) label(ctx, T('👆 Kéo Mặt Trăng để đổi vị trí', '👆 Drag the Moon to move it'), w / 2 + w * .08, h - 14, '#e9d5ff', 12.5, 'center', 800);
    }

    function drawPhaseView() {
      const { w, h, ctx } = phV;
      if (!w) return;
      const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#0b1340'); sky.addColorStop(1, '#2b2a6b');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      drawStars(ctx, w, h * .8, viewStars, .9, clock);
      const r = Math.min(w, h) * .3, cx = w / 2, cy = h * .44;
      const idx = phaseIndexOf(phA);
      if (idx === 0) {
        ctx.save(); ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(203,213,225,.45)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke(); ctx.restore();
        drawPhaseDisk(ctx, cx, cy, r, phA, .1, false);
        label(ctx, T('Không thấy trăng', 'No moon to see'), cx, cy, '#cbd5e1', 13);
      } else {
        drawPhaseDisk(ctx, cx, cy, r, phA, .14);
      }
      // đồi, cây dừa và mái nhà
      ctx.fillStyle = '#141a3a';
      ctx.beginPath(); ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 8) ctx.lineTo(x, h * .86 - Math.sin(x / w * 5.2) * h * .045 - Math.sin(x / w * 13) * h * .015);
      ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
      const tx = w * .18, ty = h * .84;
      ctx.strokeStyle = '#141a3a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.quadraticCurveTo(tx + 6, ty - h * .18, tx + 2, ty - h * .3); ctx.stroke();
      ctx.fillStyle = '#141a3a';
      for (let k = 0; k < 6; k++) { const an = -Math.PI / 2 + (k - 2.5) * .55; ctx.beginPath(); ctx.ellipse(tx + 2 + Math.cos(an) * 14, ty - h * .3 + Math.sin(an) * 7 + 4, 16, 4, an, 0, TAU); ctx.fill(); }
      const hx = w * .74, hy = h * .86;
      ctx.beginPath(); ctx.moveTo(hx - 26, hy); ctx.lineTo(hx - 26, hy - 18); ctx.lineTo(hx, hy - 34); ctx.lineTo(hx + 26, hy - 18); ctx.lineTo(hx + 26, hy); ctx.fill();
      ctx.fillStyle = '#fcd34d'; ctx.fillRect(hx - 8, hy - 14, 8, 8);
    }

    let phInfoKey = '';
    function phInfo() {
      const idx = phaseIndexOf(phA), p = PHASES[idx], P = L(p);
      const key = idx + lang;
      const day = lunarDay(phA), litPct = Math.round((1 - Math.cos(phA)) / 2 * 100);
      const rise = 6 + wrap(phA) / TAU * 24;
      if (key !== phInfoKey) {
        phInfoKey = key;
        $('phInfo').innerHTML = `
          <div class="info-title"><span class="emo" aria-hidden="true">${p.emo}</span>
            <div><h3></h3><p class="sub"></p></div>
            <button id="phListen" class="btn" type="button">🔊 ${T('Nghe', 'Listen')}</button></div>
          <div class="facts">
            <div><b>${T('Phần sáng', 'Lit part')}</b><span id="phLit"></span></div>
            <div><b>${T('Trăng mọc', 'Moonrise')}</b><span id="phRise"></span></div>
            <div><b>${T('Nhìn thấy', 'When to look')}</b><span id="phSee"></span></div>
          </div>
          <p class="fun"></p>
          <p class="tip">${T('💡 Mặt Trăng không tự phát sáng. Nửa quay về phía Mặt Trời luôn sáng, ta chỉ thấy một phần của nửa sáng đó.',
                             '💡 The Moon makes no light of its own. The half facing the Sun is always lit; we only see part of that lit half.')}</p>
          <div class="meter" aria-hidden="true"><i id="phMeter"></i></div>`;
        $('phInfo').querySelector('h3').textContent = P.name;
        $('phInfo').querySelector('.sub').textContent = P.day;
        $('phSee').textContent = P.see;
        $('phInfo').querySelector('.fun').textContent = '✨ ' + P.fact;
        $('phListen').onclick = () => {
          const P2 = L(PHASES[phaseIndexOf(phA)]);
          speak(`${P2.name}. ${P2.day}. ${T('Nhìn thấy', 'When to look')}: ${P2.see} ${P2.fact}`);
        };
        root.querySelectorAll('#phPresets button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === idx)));
      }
      $('phLit').textContent = `${litPct}%`;
      $('phMeter').style.width = `${litPct}%`;
      $('phRise').textContent = idx === 0 ? T('cùng lúc với Mặt Trời (khoảng 6 giờ sáng)', 'together with the Sun (around 6 AM)') : hourWords(rise);
      $('phHud').textContent = `${p.emo} ${T('Hôm nay là', 'Today is')} ${lunarDayText(day)} – ${T('nhìn thấy', 'we see')} ${litPct}% ${T('mặt trăng sáng', 'of the disk lit')}`;
    }
    function setPhase(a) { phA = wrap(a); phInfo(); dirty = true; }
    function setPhPlaying(on) { phPlaying = on; $('phPlay').textContent = playText(on); }

    $('phPresets').innerHTML = PHASES.map((p, i) => `<button type="button" data-i="${i}" aria-pressed="false">${p.emo}</button>`).join('');
    function phPresetLabels() { root.querySelectorAll('#phPresets button').forEach((b, i) => { b.title = L(PHASES[i]).name; b.setAttribute('aria-label', L(PHASES[i]).name); }); }
    $('phPresets').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-i]'); if (!b) return;
      cancelSpeech(); setPhPlaying(false); phTouched = true; setPhase(PHASES[+b.dataset.i].a);
    });
    $('phPlay').onclick = () => { cancelSpeech(); setPhPlaying(!phPlaying); };
    const updPhSpeed = () => { const d = phDaysPerSec(); $('phSpeedTxt').textContent = T(`1 giây ≈ ${d.toFixed(1).replace('.', ',')} ngày`, `1 second ≈ ${d.toFixed(1)} days`); };
    $('phSpeed').addEventListener('input', updPhSpeed);
    $('phRays').onclick = () => { phRays = !phRays; $('phRays').setAttribute('aria-pressed', String(phRays)); dirty = true; };
    $('phGhost').onclick = () => { phGhost = !phGhost; $('phGhost').setAttribute('aria-pressed', String(phGhost)); dirty = true; };
    {
      const c = phC.c;
      const angleFrom = (e) => { const g = phGeom(), p = localPoint(c, e); return Math.atan2(p.y - g.ey, -(p.x - g.ex)); };
      c.addEventListener('pointerdown', (e) => {
        const g = phGeom(), p = localPoint(c, e), d = Math.hypot(p.x - g.ex, p.y - g.ey);
        if (d < g.re * 1.3) return;
        cancelSpeech(); phDrag = true; phTouched = true; setPhPlaying(false);
        try { c.setPointerCapture(e.pointerId); } catch (_) {}
        setPhase(angleFrom(e));
      });
      c.addEventListener('pointermove', (e) => { if (phDrag) setPhase(angleFrom(e)); });
      const end = () => { if (phDrag) { phDrag = false; dirty = true; } };
      c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
      c.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setPhPlaying(false); phTouched = true; setPhase(phA + TAU / 30); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setPhPlaying(false); phTouched = true; setPhase(phA - TAU / 30); }
      });
    }

    const qPhase = makeQuiz($('qPhase'), {
      vi: [
        { q: 'Mặt Trăng sáng được là nhờ đâu?', a: ['Hắt lại ánh sáng Mặt Trời', 'Tự phát ra ánh sáng', 'Ánh đèn từ Trái Đất', 'Có lửa cháy bên trong'], why: 'Mặt Trăng không tự phát sáng. Nó giống một tấm gương khổng lồ hắt lại ánh sáng Mặt Trời.' },
        { q: 'Trăng tròn thường vào ngày nào âm lịch?', a: ['Ngày rằm (15)', 'Mùng 1', 'Mùng 8', 'Ngày 23'], why: 'Ngày rằm, Mặt Trăng ở phía đối diện Mặt Trời nên ta thấy trọn nửa được chiếu sáng.' },
        { q: 'Từ trăng non đến trăng non lần sau mất khoảng bao lâu?', a: ['Khoảng 29 – 30 ngày', '1 ngày', '7 ngày', '365 ngày'], why: 'Một vòng pha trăng dài khoảng 29,5 ngày, đúng bằng một tháng âm lịch.' },
        { q: 'Vào ngày trăng non, Mặt Trăng ở đâu?', a: ['Ở giữa Mặt Trời và Trái Đất', 'Phía sau Trái Đất', 'Biến mất khỏi bầu trời', 'Ở ngoài Hệ Mặt Trời'], why: 'Mặt Trăng vẫn ở đó, nhưng nửa sáng của nó quay về phía Mặt Trời nên ta không thấy.' },
        { q: 'Tết Trung thu rơi vào đêm trăng nào?', a: ['Trăng tròn rằm tháng Tám', 'Trăng non mùng 1 Tết', 'Trăng lưỡi liềm', 'Trăng bán nguyệt cuối tháng'], why: 'Trung thu là rằm tháng Tám âm lịch, đêm trăng tròn.' },
        { q: 'Vì sao từ Trái Đất ta luôn thấy cùng một mặt của Mặt Trăng?', a: ['Mặt Trăng tự quay một vòng đúng bằng thời gian quay quanh Trái Đất', 'Mặt Trăng không hề tự quay', 'Mặt sau bị mây che', 'Trái Đất quay quá nhanh'], why: 'Mặt Trăng tự quay và quay quanh Trái Đất cùng mất khoảng 27 ngày, nên luôn hướng một mặt về phía ta.' }
      ],
      en: [
        { q: 'Why does the Moon shine?', a: ['It reflects sunlight', 'It makes its own light', 'Lights from Earth', 'It has fire inside'], why: 'The Moon makes no light. It works like a giant mirror reflecting sunlight.' },
        { q: 'On which lunar day is the Moon usually full?', a: ['Day 15', 'Day 1', 'Day 8', 'Day 23'], why: 'On day 15 the Moon is opposite the Sun, so we see its whole lit half.' },
        { q: 'How long from one new moon to the next?', a: ['About 29 – 30 days', '1 day', '7 days', '365 days'], why: 'One cycle of phases takes about 29.5 days, which is one lunar month.' },
        { q: 'Where is the Moon at new moon?', a: ['Between the Sun and the Earth', 'Behind the Earth', 'It disappears', 'Outside the Solar System'], why: 'The Moon is still there, but its lit half faces the Sun, away from us.' },
        { q: 'Which moon shines on the Mid-Autumn Festival?', a: ['The full moon of the 8th lunar month', 'The new moon of Tet', 'A crescent', 'A last-quarter moon'], why: 'The festival is on day 15 of the 8th lunar month, a full-moon night.' },
        { q: 'Why do we always see the same side of the Moon?', a: ['It spins once in the same time it takes to orbit Earth', 'It does not spin at all', 'Clouds hide the far side', 'The Earth spins too fast'], why: 'The Moon spins once and orbits once in about 27 days, so the same face always points at us.' }
      ]
    });

    /* =====================================================================
       2. NHẬT THỰC & NGUYỆT THỰC
       Hình chính nhìn từ trên xuống: Mặt Trăng đi ngang qua đường thẳng
       Mặt Trời – Trái Đất. Ô nhỏ "nhìn ngang" cho thấy quỹ đạo nghiêng.
       ===================================================================== */
    let ecMode = 'solar', ecTilted = false, ecT = -.9, ecPlaying = !reduceMotion, ecDrag = false;
    const ecC = makeCanvas('cEclipse', (w) => clamp(w * .68, 280, 540));
    const ecV = makeCanvas('cEclView', (w) => clamp(w * .62, 180, 280));
    function ecGeom() {
      const w = ecC.w || 640, h = ecC.h || 340, cy = h * .46, Rs = h * .34, sx = -Rs * .45;
      if (ecMode === 'solar') {
        const mx = w * .6, rm = h * .034, re = h * .1, ex = mx + h * .17;
        const Pw = rm + (Rs + rm) * (ex - mx) / (mx - sx);
        return { w, h, cy, Rs, sx, mx, rm, ex, re, Pw, travel: (Pw + re) * 1.35, dz: (Pw + re) * 1.15 };
      }
      const ex = w * .5, re = h * .11, rm = h * .03, mx = ex + h * .2, d = ex - sx;
      const Lu = d * re / (Rs - re), Ru = re * (1 - (mx - ex) / Lu), Rp = re + (Rs + re) * (mx - ex) / d;
      return { w, h, cy, Rs, sx, mx, rm, ex, re, Ru, Rp, travel: (Rp + rm) * 1.3, dz: (Rp + rm) * 1.15 };
    }
    // Trạng thái nhìn từ Trái Đất. Trả về độ che (0..1) và vị trí hiển thị.
    function ecState() {
      const g = ecGeom(), my = g.cy + ecT * g.travel;
      if (ecMode === 'solar') {
        const u = (my - g.cy) * (g.ex - g.sx) / (g.mx - g.sx) / g.Pw;   // 1 = mép bóng mờ chạm tâm Trái Đất
        const v = ecTilted ? 1.07 : 0;
        const off = { x: u * 2.06, y: v * 2.06 };
        const cover = circOverlap(1, 1.06, Math.hypot(off.x, off.y)) / Math.PI;
        return { g, my, off, cover: clamp(cover, 0, 1), kind: cover > .985 ? 'total' : cover > .002 ? 'partial' : 'none' };
      }
      const d3 = Math.hypot(my - g.cy, ecTilted ? g.dz : 0);
      const umb = circOverlap(g.rm, g.Ru, d3) / (Math.PI * g.rm * g.rm);
      const pen = circOverlap(g.rm, g.Rp, d3) / (Math.PI * g.rm * g.rm);
      const kind = umb > .999 ? 'total' : umb > .002 ? 'partial' : pen > .002 ? 'penumbral' : 'none';
      return { g, my, cover: clamp(umb, 0, 1), pen: clamp(pen, 0, 1), kind };
    }
    // bóng tối (umbra) và bóng mờ (penumbra) đổ từ vật che (ox, oy, or)
    function shadowPolys(g, ox, oy, orad) {
      const A = { x: g.sx, y: g.cy - g.Rs }, C = { x: g.sx, y: g.cy + g.Rs };
      const B = { x: ox, y: oy - orad }, D = { x: ox, y: oy + orad };
      const tip = intersect(A, B, C, D), X = g.w + 20;
      return { umbra: [B, tip, D], pen: [B, lineAtX(C, B, X), lineAtX(A, D, X), D] };
    }

    function drawEclipse() {
      const S = ecState(), g = S.g, ctx = ecC.ctx, { w, h, cy } = g;
      if (!w) return;
      ctx.fillStyle = '#0b1030'; ctx.fillRect(0, 0, w, h);
      drawStars(ctx, w, h, stars, .55, clock);
      const lg = ctx.createLinearGradient(0, 0, w, 0); lg.addColorStop(0, 'rgba(255,214,120,.24)'); lg.addColorStop(1, 'rgba(255,214,120,.07)');
      ctx.fillStyle = lg; ctx.fillRect(0, 0, w, h);
      drawSun(ctx, g.sx, cy, g.Rs, .45);
      label(ctx, T('Mặt Trời', 'Sun'), Math.max(34, g.sx + g.Rs * .6), cy + g.Rs + 15, '#fde68a', 13);
      const my = S.my, solar = ecMode === 'solar';
      const caster = solar ? { x: g.mx, y: my, r: g.rm } : { x: g.ex, y: cy, r: g.re };
      const sh = shadowPolys(g, caster.x, caster.y, caster.r);
      const shAlpha = ecTilted ? .35 : 1;
      ctx.globalAlpha = shAlpha;
      ctx.fillStyle = 'rgba(11,16,48,.62)'; polygon(ctx, sh.pen); ctx.fill();
      ctx.fillStyle = 'rgba(4,6,22,.96)'; polygon(ctx, sh.umbra); ctx.fill();
      ctx.globalAlpha = 1;
      if (ecTilted) {
        ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = 'rgba(203,213,225,.55)'; ctx.lineWidth = 1.2;
        polygon(ctx, sh.pen); ctx.stroke(); ctx.restore();
      }
      // đường thẳng Mặt Trời – Trái Đất
      ctx.save(); ctx.setLineDash([2, 6]); ctx.strokeStyle = 'rgba(253,224,71,.35)'; ctx.beginPath(); ctx.moveTo(g.sx + g.Rs, cy); ctx.lineTo(w, cy); ctx.stroke(); ctx.restore();
      // đường đi của Mặt Trăng
      ctx.save(); ctx.setLineDash([4, 6]); ctx.strokeStyle = 'rgba(196,181,253,.5)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(g.mx, cy - g.travel - g.rm); ctx.lineTo(g.mx, cy + g.travel + g.rm); ctx.stroke(); ctx.restore();
      arrow(ctx, g.mx + g.rm * 2.4, cy - g.travel * .9, g.mx + g.rm * 2.4, cy - g.travel * .6, 'rgba(196,181,253,.8)', 1.6, 7);

      drawEarth(ctx, g.ex, cy, g.re, Math.PI, clock * .12);
      if (solar && !ecTilted) {
        ctx.save(); ctx.beginPath(); ctx.arc(g.ex, cy, g.re, 0, TAU); ctx.clip();
        ctx.fillStyle = 'rgba(0,0,0,.42)'; polygon(ctx, sh.pen); ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,.88)'; polygon(ctx, sh.umbra); ctx.fill();
        ctx.restore();
      }
      label(ctx, T('Trái Đất', 'Earth'), g.ex, cy + g.re + 13, '#bfdbfe', 12);

      // Mặt Trăng
      drawMoonBall(ctx, g.mx, my, g.rm, Math.PI);
      if (!solar && !ecTilted) {
        ctx.save(); ctx.beginPath(); ctx.arc(g.mx, my, g.rm, 0, TAU); ctx.clip();
        ctx.fillStyle = 'rgba(20,20,45,.45)'; polygon(ctx, sh.pen); ctx.fill();
        ctx.fillStyle = 'rgba(150,52,18,.82)'; polygon(ctx, sh.umbra); ctx.fill();
        ctx.restore();
      }
      if (ecDrag) { ctx.strokeStyle = 'rgba(244,114,182,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.mx, my, g.rm + 6, 0, TAU); ctx.stroke(); }
      if (solar) label(ctx, T('Mặt Trăng', 'Moon'), g.mx - g.rm - 8, my, '#fbcfe8', 12, 'right');
      else label(ctx, T('Mặt Trăng', 'Moon'), g.mx + g.rm + 8, my - g.rm - 8, '#fbcfe8', 12, 'left');
      // chú thích vùng bóng
      const tipX = solar ? (g.mx + g.ex) / 2 : g.mx + g.rm * 3;
      if (!ecTilted) {
        if (!solar) label(ctx, T('Bóng tối', 'Dark shadow'), Math.min(w - 50, g.mx + g.Ru * 2.2), cy, '#fecaca', 11.5);
        label(ctx, T('Bóng mờ', 'Soft shadow'), Math.min(w - 46, tipX + g.re * 1.6), cy - (solar ? g.Pw + g.re : g.Rp) * .9, '#cbd5e1', 11.5);
      } else {
        label(ctx, T('Bóng đi lệch, không chạm tới', 'The shadow misses'), w * .66, h * .08, '#e2e8f0', 12);
      }

      // ô nhỏ: nhìn ngang để thấy quỹ đạo nghiêng
      const bw = Math.min(w * .32, 210), bh = Math.min(h * .27, 104), bx = w - bw - 10, by = h - bh - 10;
      ctx.fillStyle = 'rgba(15,23,60,.86)'; ctx.strokeStyle = 'rgba(196,181,253,.55)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(bx, by, bw, bh, 10) : ctx.rect(bx, by, bw, bh); ctx.fill(); ctx.stroke();
      label(ctx, T('Nhìn ngang', 'Side view'), bx + 10, by + 12, '#e9d5ff', 11, 'left');
      const ecx = bx + bw * .55, ecy = by + bh * .58, half = bw * .38;
      ctx.strokeStyle = 'rgba(253,224,71,.6)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(bx + 8, ecy); ctx.lineTo(bx + bw - 8, ecy); ctx.stroke();
      const tilt = .22;
      ctx.strokeStyle = 'rgba(196,181,253,.8)'; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(ecx - half, ecy - half * tilt * (ecTilted ? 1 : 0)); ctx.lineTo(ecx + half, ecy + half * tilt * (ecTilted ? 1 : 0)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(ecx, ecy, 6, 0, TAU); ctx.fill();
      const side = solar ? -1 : 1, mmx = ecx + side * half * .78, mmy = ecy - (ecTilted ? side * half * .78 * tilt : 0);
      ctx.fillStyle = '#f3edd6'; ctx.beginPath(); ctx.arc(mmx, mmy, 3.6, 0, TAU); ctx.fill();
      label(ctx, ecTilted ? T('lệch', 'off') : T('trúng', 'on line'), mmx, mmy - 10, ecTilted ? '#fca5a5' : '#86efac', 10.5);
      label(ctx, '☀', bx + 12, ecy, '#fde68a', 12, 'left');
      label(ctx, T('Hình minh họa, không đúng tỉ lệ', 'Not to scale'), 10, h - 10, 'rgba(203,213,225,.75)', 10.5, 'left', 700);
    }

    function drawEclView() {
      const S = ecState(), { w, h, ctx } = ecV;
      if (!w) return;
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .2;
      if (ecMode === 'solar') {
        const dark = Math.pow(S.cover, 6);
        ctx.fillStyle = mix('#7cc4ff', '#0b1030', dark); ctx.fillRect(0, 0, w, h);
        if (dark > .3) drawStars(ctx, w, h, viewStars, (dark - .3) / .7, clock);
        if (S.kind === 'total') {
          const cg = ctx.createRadialGradient(cx, cy, R, cx, cy, R * 2.4);
          cg.addColorStop(0, 'rgba(255,255,255,.85)'); cg.addColorStop(.35, 'rgba(220,235,255,.3)'); cg.addColorStop(1, 'rgba(220,235,255,0)');
          ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, R * 2.4, 0, TAU); ctx.fill();
        } else drawSun(ctx, cx, cy, R, .5 * (1 - S.cover * .8));
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fillStyle = S.kind === 'total' ? '#0b1030' : '#ffd23f';
        if (S.kind !== 'total') { const b = ctx.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R); b.addColorStop(0, '#fff6b0'); b.addColorStop(.6, '#ffd23f'); b.addColorStop(1, '#ff9f1c'); ctx.fillStyle = b; }
        ctx.fill();
        const mxp = cx + S.off.x * R, myp = cy - S.off.y * R;
        ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R * (S.kind === 'total' ? 1.08 : 1), 0, TAU); ctx.clip();
        ctx.fillStyle = '#1b1d2e'; ctx.beginPath(); ctx.arc(mxp, myp, R * 1.06, 0, TAU); ctx.fill(); ctx.restore();
        ctx.save(); ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(30,41,59,.55)'; ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.arc(mxp, myp, R * 1.06, 0, TAU); ctx.stroke(); ctx.restore();
        if (mxp > 28 && mxp < w - 28) label(ctx, T('Mặt Trăng', 'Moon'), mxp, myp + R * 1.06 + 12, '#e2e8f0', 11);
        if (S.kind === 'none' || S.kind === 'partial') {
          label(ctx, T('⚠️ Không nhìn thẳng vào Mặt Trời!', '⚠️ Never look straight at the Sun!'), cx, h - 13, '#fff7ed', 12);
        }
      } else {
        const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#0b1340'); sky.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
        drawStars(ctx, w, h, viewStars, .9, clock);
        const g = S.g, s = R / g.rm * .62, rm = g.rm * s;
        const mxp = cx + (S.my - g.cy) * s, myp = cy - (ecTilted ? Math.min(g.Ru * s + rm * 1.5, h / 2 - rm - 6) : 0);
        ctx.save(); ctx.setLineDash([5, 5]); ctx.lineWidth = 1.3;
        ctx.strokeStyle = 'rgba(248,113,113,.6)'; ctx.beginPath(); ctx.arc(cx, cy, g.Ru * s, 0, TAU); ctx.stroke();
        ctx.strokeStyle = 'rgba(148,163,184,.4)'; ctx.beginPath(); ctx.arc(cx, cy, g.Rp * s, 0, TAU); ctx.stroke();
        ctx.strokeStyle = 'rgba(196,181,253,.45)'; ctx.beginPath(); ctx.moveTo(0, myp); ctx.lineTo(w, myp); ctx.stroke();
        ctx.restore();
        label(ctx, T('Bóng Trái Đất', 'Earth’s shadow'), cx, cy + g.Ru * s - 10, '#fecaca', 11);
        drawPhaseDisk(ctx, mxp, myp, rm, Math.PI, .1, S.kind === 'none');
        if (!ecTilted) {
        ctx.save(); ctx.beginPath(); ctx.arc(mxp, myp, rm, 0, TAU); ctx.clip();
        ctx.fillStyle = 'rgba(15,15,40,.38)'; ctx.beginPath(); ctx.arc(cx, cy, g.Rp * s, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(160,55,20,.82)'; ctx.beginPath(); ctx.arc(cx, cy, g.Ru * s, 0, TAU); ctx.fill();
        ctx.restore();
        }
        if (S.kind === 'total') {
          const rg = ctx.createRadialGradient(mxp, myp, rm * .9, mxp, myp, rm * 1.8);
          rg.addColorStop(0, 'rgba(234,88,12,.35)'); rg.addColorStop(1, 'rgba(234,88,12,0)');
          ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(mxp, myp, rm * 1.8, 0, TAU); ctx.fill();
        }
      }
    }

    let ecInfoKey = '';
    function ecInfo() {
      const S = ecState(), solar = ecMode === 'solar';
      const KIND = solar
        ? { none: T('Chưa có nhật thực', 'No eclipse yet'), partial: T('Nhật thực một phần', 'Partial solar eclipse'), total: T('Nhật thực toàn phần!', 'Total solar eclipse!') }
        : { none: T('Chưa có nguyệt thực', 'No eclipse yet'), penumbral: T('Nguyệt thực nửa tối (rất khó thấy)', 'Penumbral eclipse (hard to notice)'), partial: T('Nguyệt thực một phần', 'Partial lunar eclipse'), total: T('Nguyệt thực toàn phần: trăng đỏ!', 'Total lunar eclipse: a red Moon!') };
      const key = ecMode + ecTilted + lang;
      if (key !== ecInfoKey) {
        ecInfoKey = key;
        const order = solar ? T('Mặt Trời → Mặt Trăng → Trái Đất', 'Sun → Moon → Earth') : T('Mặt Trời → Trái Đất → Mặt Trăng', 'Sun → Earth → Moon');
        const when = solar ? T('Chỉ vào ngày trăng non (mùng 1 âm lịch)', 'Only at new moon') : T('Chỉ vào đêm trăng tròn (ngày rằm)', 'Only at full moon');
        const what = solar
          ? T('Mặt Trăng đi vào giữa, che khuất Mặt Trời. Bóng của Mặt Trăng rơi xuống một vùng nhỏ trên Trái Đất.', 'The Moon passes in between and hides the Sun. Its shadow falls on a small patch of Earth.')
          : T('Trái Đất ở giữa, chắn ánh nắng. Bóng của Trái Đất phủ lên Mặt Trăng.', 'The Earth is in the middle and blocks the sunlight. Earth’s shadow covers the Moon.');
        const extra = ecTilted
          ? `<p class="tip">${T('🧭 Quỹ đạo Mặt Trăng nghiêng khoảng 5°. Phần lớn các tháng, Mặt Trăng đi lệch lên trên hoặc xuống dưới bóng nên không có nhật thực hay nguyệt thực.', '🧭 The Moon’s orbit is tilted by about 5°. Most months it passes just above or below the shadow, so there is no eclipse.')}</p>`
          : solar
            ? `<p class="warn">${T('⚠️ Không bao giờ nhìn thẳng vào Mặt Trời, kể cả khi có nhật thực. Phải dùng kính ngắm nhật thực chuyên dụng.', '⚠️ Never look straight at the Sun, even during an eclipse. Use proper eclipse glasses.')}</p>`
            : `<p class="fun">${T('✨ Khi nguyệt thực toàn phần, Mặt Trăng có màu đỏ cam vì một ít ánh sáng đỏ đi vòng qua lớp không khí của Trái Đất rồi chiếu tới. Nguyệt thực an toàn, có thể ngắm bằng mắt thường.', '✨ In a total lunar eclipse the Moon turns orange-red because a little red light bends through Earth’s air onto it. It is safe to watch with bare eyes.')}</p>`;
        $('ecInfo').innerHTML = `
          <div class="info-title"><span class="emo" aria-hidden="true">${solar ? '☀️' : '🌕'}</span>
            <div><h3 id="ecKind"></h3><p class="sub">${order}</p></div>
            <button id="ecListen" class="btn" type="button">🔊 ${T('Nghe', 'Listen')}</button></div>
          <div class="facts">
            <div><b>${T('Bị che', 'Covered')}</b><span id="ecCover"></span></div>
            <div><b>${T('Khi nào?', 'When?')}</b><span>${when}</span></div>
            <div><b>${T('Vì sao?', 'Why?')}</b><span>${what}</span></div>
          </div>${extra}`;
        $('ecListen').onclick = () => {
          const el = $('ecInfo');
          speak([...el.querySelectorAll('h3, .sub, .facts span, .tip, .warn, .fun')].map((n) => n.textContent.replace(/[→]/g, ',')).join('. '));
        };
      }
      $('ecKind').textContent = KIND[S.kind] || KIND.none;
      $('ecCover').textContent = solar ? `${Math.round(S.cover * 100)}% ${T('Mặt Trời', 'of the Sun')}` : `${Math.round(S.cover * 100)}% ${T('Mặt Trăng (bóng tối)', 'of the Moon (dark shadow)')}`;
      $('ecHud').textContent = `${solar ? '☀️' : '🌕'} ${KIND[S.kind] || KIND.none}`;
    }
    function setEcT(v) { ecT = clamp(v, -1.08, 1.08); $('ecPos').value = String(Math.round(clamp(ecT, -1, 1) * 100)); ecInfo(); dirty = true; }
    function setEcPlaying(on) { ecPlaying = on; $('ecPlay').textContent = playText(on); }
    function setEcMode(m) {
      ecMode = m; $('ecSolar').setAttribute('aria-pressed', String(m === 'solar')); $('ecLunar').setAttribute('aria-pressed', String(m === 'lunar'));
      cancelSpeech(); setEcT(-.95); setEcPlaying(!reduceMotion);
    }
    function setEcTilted(on) {
      ecTilted = on; $('ecAligned').setAttribute('aria-pressed', String(!on)); $('ecTilted').setAttribute('aria-pressed', String(on));
      cancelSpeech(); ecInfo(); dirty = true;
    }
    $('ecSolar').onclick = () => setEcMode('solar');
    $('ecLunar').onclick = () => setEcMode('lunar');
    $('ecAligned').onclick = () => setEcTilted(false);
    $('ecTilted').onclick = () => setEcTilted(true);
    $('ecPlay').onclick = () => { cancelSpeech(); setEcPlaying(!ecPlaying); };
    $('ecPos').addEventListener('input', () => { setEcPlaying(false); setEcT(+$('ecPos').value / 100); });
    root.querySelectorAll('[data-ec]').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); setEcPlaying(false);
      const g = ecGeom(), k = b.dataset.ec;
      if (k === 'start') setEcT(-.95);
      else if (k === 'total') setEcT(0);
      else if (ecMode === 'solar') setEcT(-.45 * g.Pw * (g.mx - g.sx) / (g.ex - g.sx) / g.travel);
      else setEcT(-(g.Ru) / g.travel);
    }));
    {
      const c = ecC.c;
      const tFrom = (e) => { const g = ecGeom(), p = localPoint(c, e); return (p.y - g.cy) / g.travel; };
      c.addEventListener('pointerdown', (e) => {
        const g = ecGeom(), p = localPoint(c, e);
        if (Math.abs(p.x - g.mx) > Math.max(34, g.rm * 3)) return;
        cancelSpeech(); ecDrag = true; setEcPlaying(false);
        try { c.setPointerCapture(e.pointerId); } catch (_) {}
        setEcT(tFrom(e));
      });
      c.addEventListener('pointermove', (e) => { if (ecDrag) setEcT(tFrom(e)); });
      const end = () => { if (ecDrag) { ecDrag = false; dirty = true; } };
      c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
    }

    const qEclipse = makeQuiz($('qEclipse'), {
      vi: [
        { q: 'Nhật thực xảy ra khi nào?', a: ['Mặt Trăng ở giữa Mặt Trời và Trái Đất', 'Trái Đất ở giữa Mặt Trời và Mặt Trăng', 'Mặt Trời ở giữa', 'Mặt Trăng ở sau Mặt Trời'], why: 'Mặt Trăng chắn ánh sáng Mặt Trời, bóng của nó rơi xuống Trái Đất.' },
        { q: 'Nguyệt thực chỉ có thể xảy ra vào đêm nào?', a: ['Đêm trăng tròn', 'Đêm trăng non', 'Đêm trăng bán nguyệt', 'Bất kỳ đêm nào'], why: 'Chỉ khi trăng tròn, Mặt Trăng mới ở phía sau Trái Đất để đi vào bóng của Trái Đất.' },
        { q: 'Muốn ngắm nhật thực, bé cần làm gì?', a: ['Dùng kính ngắm nhật thực chuyên dụng', 'Nhìn thẳng bằng mắt thường', 'Đeo kính râm bình thường', 'Nhìn qua ống nhòm'], why: 'Ánh sáng Mặt Trời có thể làm hỏng mắt rất nhanh. Kính râm thường không đủ bảo vệ.' },
        { q: 'Khi nguyệt thực toàn phần, Mặt Trăng có màu gì?', a: ['Đỏ cam', 'Xanh lá', 'Trắng sáng hơn bình thường', 'Biến mất hoàn toàn'], why: 'Một ít ánh sáng đỏ đi vòng qua không khí của Trái Đất rồi chiếu lên Mặt Trăng.' },
        { q: 'Vì sao không phải tháng nào cũng có nhật thực?', a: ['Quỹ đạo Mặt Trăng hơi nghiêng nên thường đi lệch', 'Mặt Trăng nghỉ một số tháng', 'Vì Mặt Trời quá to', 'Vì mây che mất'], why: 'Quỹ đạo nghiêng khoảng 5°, nên đa số các tháng Mặt Trăng đi lệch trên hoặc dưới bóng.' },
        { q: 'Mặt Trời to hơn Mặt Trăng rất nhiều, sao Mặt Trăng che vừa khít được?', a: ['Vì Mặt Trăng ở gần ta hơn rất nhiều', 'Vì Mặt Trăng to hơn Mặt Trời', 'Vì Mặt Trời co nhỏ lại', 'Vì Trái Đất che giúp'], why: 'Mặt Trời to gấp khoảng 400 lần Mặt Trăng nhưng cũng ở xa hơn khoảng 400 lần, nên trông to gần bằng nhau.' }
      ],
      en: [
        { q: 'When does a solar eclipse happen?', a: ['The Moon is between the Sun and the Earth', 'The Earth is between the Sun and the Moon', 'The Sun is in the middle', 'The Moon is behind the Sun'], why: 'The Moon blocks the sunlight and its shadow falls on Earth.' },
        { q: 'On which night can a lunar eclipse happen?', a: ['A full-moon night', 'A new-moon night', 'A quarter-moon night', 'Any night'], why: 'Only at full moon is the Moon behind the Earth, where Earth’s shadow is.' },
        { q: 'How should you watch a solar eclipse?', a: ['With proper eclipse glasses', 'Look straight with bare eyes', 'With ordinary sunglasses', 'Through binoculars'], why: 'Sunlight can hurt your eyes quickly. Ordinary sunglasses are not enough.' },
        { q: 'What colour is the Moon in a total lunar eclipse?', a: ['Orange-red', 'Green', 'Brighter white', 'It vanishes completely'], why: 'A little red light bends through Earth’s air and reaches the Moon.' },
        { q: 'Why is there not an eclipse every month?', a: ['The Moon’s orbit is tilted, so it usually misses', 'The Moon takes months off', 'The Sun is too big', 'Clouds block it'], why: 'The orbit is tilted about 5°, so most months the Moon passes above or below the shadow.' },
        { q: 'The Sun is much bigger. How can the Moon cover it?', a: ['The Moon is much closer to us', 'The Moon is bigger than the Sun', 'The Sun shrinks', 'The Earth helps block it'], why: 'The Sun is about 400 times wider but also about 400 times farther away, so they look nearly the same size.' }
      ]
    });

    /* =====================================================================
       3. THỦY TRIỀU
       Mô hình đơn giản: hai chỗ nước phồng (hướng về Mặt Trăng và phía đối
       diện). Lực tạo triều của Mặt Trời bằng khoảng 46% của Mặt Trăng.
       ===================================================================== */
    const SUN_K = .46;
    let tdHours = 6, tdA0 = Math.PI * .1, tdSunOn = true, tdPlaying = !reduceMotion;
    const tdC = makeCanvas('cTide', (w) => clamp(w * .74, 300, 580));
    const tdB = makeCanvas('cBeach', (w) => clamp(w * .78, 230, 330));
    const tdHoursPerSec = () => .5 + Math.pow(+$('tdSpeed').value / 100, 1.4) * 7.5;
    const tdPhaseAt = (hrs) => tdA0 + hrs / 24 / LUNAR * TAU;            // góc pha trăng
    const tdMoonAng = (hrs) => Math.PI + tdPhaseAt(hrs);                  // hướng Mặt Trăng (ngược chiều kim đồng hồ)
    const tdCityAng = (hrs) => Math.PI + (hrs - 12) / 24 * TAU;           // 12 giờ trưa: thành phố hướng về Mặt Trời
    const tideField = (phi, hrs) => Math.cos(2 * (phi - tdMoonAng(hrs))) + (tdSunOn ? SUN_K * Math.cos(2 * (phi - Math.PI)) : 0);
    const tideAt = (hrs) => tideField(tdCityAng(hrs), hrs);
    const TMAX = 1 + SUN_K;
    const polar = (x, y, r, ang) => ({ x: x + r * Math.cos(ang), y: y - r * Math.sin(ang) });

    function drawTide() {
      const { w, h, ctx } = tdC;
      if (!w) return;
      ctx.fillStyle = '#0b1030'; ctx.fillRect(0, 0, w, h);
      drawStars(ctx, w, h, stars, .6, clock);
      const ex = w * .56, ey = h / 2, re = h * .16, R = Math.min(h * .42, w * .36);
      const sunX = -h * .16, sunR = h * .3;
      ctx.globalAlpha = tdSunOn ? 1 : .35; drawSun(ctx, sunX, ey, sunR, .45); ctx.globalAlpha = 1;
      label(ctx, T('Mặt Trời', 'Sun'), Math.max(34, sunX + sunR * .55), ey + sunR + 15, tdSunOn ? '#fde68a' : '#94a3b8', 13);
      // quỹ đạo Mặt Trăng
      ctx.save(); ctx.strokeStyle = 'rgba(196,181,253,.35)'; ctx.setLineDash([5, 6]); ctx.beginPath(); ctx.arc(ex, ey, R, 0, TAU); ctx.stroke(); ctx.restore();
      // lớp nước phồng (phóng đại)
      const waterPath = () => {
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const phi = i / 120 * TAU, r = re * (1.13 + .085 * tideField(phi, tdHours));
          const p = polar(ex, ey, r, phi); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
        }
        ctx.closePath();
      };
      waterPath();
      const wg = ctx.createRadialGradient(ex, ey, re, ex, ey, re * 1.3); wg.addColorStop(0, '#38bdf8'); wg.addColorStop(1, '#0ea5e9');
      ctx.fillStyle = wg; ctx.fill();
      ctx.strokeStyle = 'rgba(186,230,253,.8)'; ctx.lineWidth = 1.4; ctx.stroke();
      // lõi Trái Đất (đất liền)
      const cityAng = tdCityAng(tdHours);
      ctx.save(); ctx.beginPath(); ctx.arc(ex, ey, re, 0, TAU); ctx.clip();
      ctx.fillStyle = '#8b6b3e'; ctx.fillRect(ex - re, ey - re, 2 * re, 2 * re);
      ctx.fillStyle = '#4caf50';
      for (const [ang, dist, s] of LAND) { const a = ang + cityAng; ctx.beginPath(); ctx.ellipse(ex + Math.cos(a) * dist * re, ey - Math.sin(a) * dist * re, s * re, s * re * .7, -a, 0, TAU); ctx.fill(); }
      ctx.restore();
      // bóng đêm phủ nửa bên phải
      ctx.save(); waterPath(); ctx.clip(); ctx.fillStyle = 'rgba(5,8,30,.45)'; ctx.fillRect(ex, ey - re * 2, re * 2, re * 4); ctx.restore();
      // thành phố
      const rc = re * (1.13 + .085 * tideAt(tdHours));
      const cp = polar(ex, ey, re * .96, cityAng), cpo = polar(ex, ey, rc + 16, cityAng);
      ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cp.x, cp.y); ctx.lineTo(cpo.x, cpo.y); ctx.stroke();
      ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(cp.x, cp.y, 5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      const cl = polar(ex, ey, rc + 32, cityAng);
      label(ctx, T('Vũng Tàu', 'Vung Tau'), cl.x, cl.y, '#fecdd3', 12);
      // Mặt Trăng
      const mAng = tdMoonAng(tdHours), mp = polar(ex, ey, R, mAng);
      drawMoonBall(ctx, mp.x, mp.y, h * .05, Math.PI);
      label(ctx, T('Mặt Trăng', 'Moon'), mp.x, mp.y + (mp.y < ey ? -h * .05 - 12 : h * .05 + 13), '#fbcfe8', 12);
      // mũi tên lực hút
      const a1 = polar(ex, ey, re * 1.45, mAng), a2 = polar(ex, ey, re * 2.15, mAng);
      arrow(ctx, a1.x, a1.y, a2.x, a2.y, '#f472b6', 3, 11);
      if (tdSunOn) { const s1 = { x: ex - re * 1.45, y: ey }, s2 = { x: ex - re * 1.85, y: ey }; arrow(ctx, s1.x, s1.y, s2.x, s2.y, '#fbbf24', 2.5, 9); }
      label(ctx, T('Lớp nước bị kéo phồng (vẽ phóng to)', 'Ocean bulges (exaggerated)'), 10, h - 12, 'rgba(203,213,225,.8)', 11, 'left', 700);
    }

    function drawBeach() {
      const { w, h, ctx } = tdB;
      if (!w) return;
      const H1 = Math.round(h * .6);
      const hod = ((tdHours % 24) + 24) % 24, sunAlt = -Math.cos(hod / 24 * TAU);
      const day = clamp((sunAlt + .15) / .4, 0, 1);
      const sky = ctx.createLinearGradient(0, 0, 0, H1);
      sky.addColorStop(0, mix('#0b1340', '#60b8f5', day)); sky.addColorStop(1, mix('#2b2a6b', '#cdeeff', day));
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, H1);
      if (day < .6) drawStars(ctx, w, H1 * .7, viewStars, 1 - day / .6, clock);
      // Mặt Trời / Mặt Trăng trên trời
      if (sunAlt > -.1) drawSun(ctx, w * (.15 + .7 * (hod - 6) / 12), H1 * (.62 - .48 * Math.max(0, sunAlt)), 11, .5);
      const moonAlt = -Math.cos((hod - wrap(tdPhaseAt(tdHours)) / TAU * 24) / 24 * TAU);
      if (moonAlt > -.05 && phaseIndexOf(tdPhaseAt(tdHours)) !== 0) {
        const mh = (hod - wrap(tdPhaseAt(tdHours)) / TAU * 24 + 48) % 24;
        drawPhaseDisk(ctx, w * (.15 + .7 * (mh - 6) / 12), H1 * (.62 - .48 * Math.max(0, moonAlt)), 9, tdPhaseAt(tdHours), .12, day < .5);
      }
      // bãi cát
      ctx.fillStyle = '#f2d39b';
      ctx.beginPath(); ctx.moveTo(0, H1 * .5); ctx.quadraticCurveTo(w * .35, H1 * .55, w * .6, H1 * .82); ctx.lineTo(w, H1 * .95); ctx.lineTo(w, H1); ctx.lineTo(0, H1); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#e0bb7a'; ctx.beginPath(); ctx.ellipse(w * .22, H1 * .62, 18, 4, 0, 0, TAU); ctx.fill();
      // mực nước
      const lv = tideAt(tdHours) / TMAX, wy = H1 * .74 - lv * H1 * .17;
      const wave = reduceMotion ? 0 : clock * 2.2;
      ctx.beginPath(); ctx.moveTo(0, H1);
      for (let x = 0; x <= w; x += 6) ctx.lineTo(x, wy + Math.sin(x / 18 + wave) * 2);
      ctx.lineTo(w, H1); ctx.closePath();
      const sg = ctx.createLinearGradient(0, wy, 0, H1); sg.addColorStop(0, mix('#1e3a8a', '#38bdf8', day)); sg.addColorStop(1, mix('#172554', '#0369a1', day));
      ctx.globalAlpha = .88; ctx.fillStyle = sg; ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.5; ctx.beginPath();
      for (let x = 0; x <= w; x += 6) { const y = wy + Math.sin(x / 18 + wave) * 2; if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke();
      // cột đo nước
      const px = w * .66;
      ctx.fillStyle = '#7c2d12'; ctx.fillRect(px - 3, H1 * .28, 6, H1 * .72);
      for (let k = 0; k <= 6; k++) { const y = H1 * .36 + k * H1 * .085; ctx.fillStyle = k % 2 ? '#fff' : '#ef4444'; ctx.fillRect(px - 3, y, 6, H1 * .085); }
      ctx.font = '800 10.5px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = day > .5 ? '#1e293b' : '#e2e8f0'; ctx.fillText(T('Cột đo nước', 'Tide pole'), px, H1 * .22);
      // thuyền
      const bx = w * .85, by = wy + Math.sin(bx / 18 + wave) * 2;
      ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.moveTo(bx - 22, by - 6); ctx.lineTo(bx + 22, by - 6); ctx.lineTo(bx + 14, by + 5); ctx.lineTo(bx - 14, by + 5); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, by - 6); ctx.lineTo(bx, by - 34); ctx.stroke();
      ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(bx + 1, by - 33); ctx.lineTo(bx + 16, by - 12); ctx.lineTo(bx + 1, by - 12); ctx.closePath(); ctx.fill();

      // biểu đồ 24 giờ
      const gx0 = 34, gx1 = w - 12, gy0 = H1 + 16, gy1 = h - 22, gm = (gy0 + gy1) / 2;
      ctx.fillStyle = '#f8fbff'; ctx.fillRect(0, H1, w, h - H1);
      ctx.strokeStyle = '#dbeafe'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx0, gm); ctx.lineTo(gx1, gm); ctx.stroke();
      ctx.font = '800 10.5px system-ui, sans-serif'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#64748b'; ctx.textAlign = 'right';
      ctx.fillText(T('cao', 'high'), gx0 - 4, gy0 + 3); ctx.fillText(T('thấp', 'low'), gx0 - 4, gy1 - 3);
      const X = (dh) => gx0 + (dh + 12) / 24 * (gx1 - gx0), Y = (v) => gm - v / TMAX * (gm - gy0) * .92;
      ctx.beginPath();
      for (let i = 0; i <= 96; i++) { const dh = -12 + i / 4, v = tideAt(tdHours + dh); if (i) ctx.lineTo(X(dh), Y(v)); else ctx.moveTo(X(dh), Y(v)); }
      ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 2.4; ctx.stroke();
      ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(X(0), gy0 - 4); ctx.lineTo(X(0), gy1 + 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(X(0), Y(tideAt(tdHours)), 4.5, 0, TAU); ctx.fill();
      ctx.textAlign = 'center'; ctx.fillStyle = '#64748b';
      ctx.fillText(T('12 giờ trước', '12 h ago'), X(-9), h - 9); ctx.fillText(T('bây giờ', 'now'), X(0), h - 9); ctx.fillText(T('12 giờ sau', 'in 12 h'), X(9), h - 9);
    }

    function nextHigh(fromHrs) {
      let prev = tideAt(fromHrs), rising = tideAt(fromHrs + .05) > prev;
      for (let dh = .05; dh < 26; dh += .05) {
        const v = tideAt(fromHrs + dh), up = v > prev;
        if (rising && !up && dh > .1) return dh - .05;
        rising = up; prev = v;
      }
      return null;
    }
    let tdInfoKey = '';
    function tdInfo() {
      const v = tideAt(tdHours), dv = tideAt(tdHours + .1) - v;
      const a = tdPhaseAt(tdHours), strength = Math.abs(1 + (tdSunOn ? SUN_K * Math.cos(2 * a) : 0));
      const state = Math.abs(dv) < .006 * TMAX ? (v > 0 ? 'high' : 'low') : (dv > 0 ? 'up' : 'down');
      const STATE = { high: T('Nước lớn (đỉnh triều) 🌊', 'High tide 🌊'), low: T('Nước ròng (chân triều) 🏖️', 'Low tide 🏖️'), up: T('Nước đang lên ⬆️', 'Water rising ⬆️'), down: T('Nước đang rút ⬇️', 'Water falling ⬇️') };
      const kind = !tdSunOn ? T('Chỉ có Mặt Trăng kéo', 'Moon only') : strength > 1.3 ? T('Triều cường (lên rất cao, rút rất thấp)', 'Spring tide (very high and very low)') : strength < .7 ? T('Triều kém (lên xuống ít)', 'Neap tide (small change)') : T('Triều trung bình', 'Medium tide');
      const key = lang;
      if (key !== tdInfoKey) {
        tdInfoKey = key;
        $('tdInfo').innerHTML = `
          <div class="info-title"><div><p id="tdState" class="state-big"></p><p class="sub" id="tdClock"></p></div>
            <button id="tdListen" class="btn" type="button">🔊 ${T('Nghe', 'Listen')}</button></div>
          <div class="facts">
            <div><b>${T('Hôm nay', 'Today')}</b><span id="tdKind"></span></div>
            <div><b>${T('Nước lớn tới', 'Next high tide')}</b><span id="tdNext"></span></div>
          </div>
          <p class="fun">${T('✨ Mỗi ngày nước lên 2 lần vì nước phồng ở 2 phía: phía gần Mặt Trăng và phía đối diện. Trái Đất tự quay nên Vũng Tàu lần lượt đi qua cả hai chỗ phồng.',
                            '✨ The water rises twice a day because there are two bulges: one facing the Moon and one on the far side. As the Earth spins, Vung Tau passes through both.')}</p>
          <p class="tip">${T('📍 Vùng biển Hải Phòng – Quảng Ninh thì khác: mỗi ngày thường chỉ có 1 lần nước lớn (nhật triều) do hình dạng vịnh Bắc Bộ.',
                            '📍 Hai Phong and Quang Ninh are different: they usually get just one high tide a day, because of the shape of the Gulf of Tonkin.')}</p>`;
        $('tdListen').onclick = () => speak([$('tdState').textContent.replace(/[^\p{L}\p{N}\s(),.]/gu, ''), $('tdKind').textContent, `${T('Nước lớn tới', 'Next high tide')}: ${$('tdNext').textContent}`, $('tdInfo').querySelector('.fun').textContent.replace('✨', '')].join('. '));
      }
      const st = $('tdState'); st.textContent = STATE[state]; st.className = 'state-big ' + (state === 'up' || state === 'high' ? 'up' : 'down');
      $('tdClock').textContent = `${clockText(tdHours)} – ${lunarDayText(lunarDay(a))}`;
      $('tdKind').textContent = kind;
      const nh = nextHigh(tdHours);
      const nm = nh == null ? 0 : Math.round(nh * 60 / 5) * 5, nH = Math.floor(nm / 60), nM = nm % 60;
      $('tdNext').textContent = nh == null ? '—' : nh < .15 ? T('ngay bây giờ', 'right now') : T(`sau khoảng ${nH ? nH + ' giờ' : ''}${nM ? ' ' + nM + ' phút' : ''}`, `in about ${nH ? nH + ' h' : ''}${nM ? ' ' + nM + ' min' : ''}`);
      $('tdHud').textContent = `🕒 ${clockText(tdHours)} – ${lunarDayText(lunarDay(a))} – ${STATE[state]}`;
    }
    function setTdPlaying(on) { tdPlaying = on; $('tdPlay').textContent = playText(on); }
    $('tdPlay').onclick = () => { cancelSpeech(); setTdPlaying(!tdPlaying); };
    const updTdSpeed = () => { const v = tdHoursPerSec(); $('tdSpeedTxt').textContent = T(`1 giây ≈ ${v.toFixed(1).replace('.', ',')} giờ`, `1 second ≈ ${v.toFixed(1)} hours`); };
    $('tdSpeed').addEventListener('input', updTdSpeed);
    $('tdSun').onclick = () => { tdSunOn = !tdSunOn; $('tdSun').setAttribute('aria-pressed', String(tdSunOn)); tdInfo(); dirty = true; };
    root.querySelectorAll('[data-td]').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech();
      tdA0 = +b.dataset.td * Math.PI - tdHours / 24 / LUNAR * TAU;
      root.querySelectorAll('[data-td]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      tdInfo(); dirty = true;
    }));

    const qTide = makeQuiz($('qTide'), {
      vi: [
        { q: 'Thủy triều chủ yếu do đâu gây ra?', a: ['Lực hút của Mặt Trăng', 'Gió thổi', 'Cá bơi', 'Mưa lớn'], why: 'Mặt Trăng hút nước biển, làm nước phồng lên ở phía gần nó và cả phía đối diện.' },
        { q: 'Ở Vũng Tàu, mỗi ngày nước biển lên cao mấy lần?', a: ['2 lần', '1 lần mỗi tuần', '10 lần', 'Không lần nào'], why: 'Trái Đất có 2 chỗ nước phồng, mỗi ngày Vũng Tàu đi qua cả hai chỗ.' },
        { q: 'Triều cường (nước lên rất cao) thường vào lúc nào?', a: ['Trăng non và trăng tròn', 'Trăng bán nguyệt', 'Chỉ buổi trưa', 'Chỉ mùa đông'], why: 'Khi Mặt Trời, Mặt Trăng và Trái Đất thẳng hàng, lực kéo của Mặt Trời cộng thêm vào lực kéo của Mặt Trăng.' },
        { q: 'Mặt Trời có làm nước biển lên xuống không?', a: ['Có, nhưng yếu hơn Mặt Trăng', 'Không hề', 'Mạnh hơn Mặt Trăng nhiều', 'Chỉ vào ban đêm'], why: 'Mặt Trời ở quá xa, nên tác động lên thủy triều chỉ bằng khoảng một nửa của Mặt Trăng.' },
        { q: 'Mỗi ngày, giờ nước lớn đến muộn hơn hôm trước khoảng bao lâu?', a: ['Khoảng 50 phút', 'Đúng 1 tuần', 'Không thay đổi', 'Khoảng 5 giờ'], why: 'Mặt Trăng cũng đi dần trên quỹ đạo, nên Trái Đất phải quay thêm khoảng 50 phút mới gặp lại chỗ nước phồng.' },
        { q: 'Ở phía Trái Đất đối diện Mặt Trăng, nước biển thế nào?', a: ['Cũng phồng lên', 'Bị hút cạn hết', 'Đóng băng', 'Không thay đổi'], why: 'Phía xa Mặt Trăng bị kéo yếu hơn phần còn lại của Trái Đất, nên nước ở đó cũng "tụt lại" và phồng lên.' }
      ],
      en: [
        { q: 'What mainly causes tides?', a: ['The Moon’s pull', 'The wind', 'Swimming fish', 'Heavy rain'], why: 'The Moon pulls on the ocean, making it bulge on the near side and on the far side.' },
        { q: 'How many high tides does Vung Tau get each day?', a: ['2', '1 a week', '10', 'None'], why: 'There are two bulges, and Vung Tau passes through both each day.' },
        { q: 'When are spring tides (very high tides)?', a: ['At new moon and full moon', 'At quarter moon', 'Only at noon', 'Only in winter'], why: 'When the Sun, Moon and Earth line up, the Sun’s pull adds to the Moon’s.' },
        { q: 'Does the Sun affect tides?', a: ['Yes, but less than the Moon', 'Not at all', 'Much more than the Moon', 'Only at night'], why: 'The Sun is so far away that its tidal effect is only about half of the Moon’s.' },
        { q: 'Each day, high tide comes about how much later?', a: ['About 50 minutes', 'Exactly a week', 'No change', 'About 5 hours'], why: 'The Moon moves along its orbit, so the Earth must turn about 50 minutes more to catch up with the bulge.' },
        { q: 'What happens to the ocean on the side facing away from the Moon?', a: ['It bulges too', 'It is pulled dry', 'It freezes', 'Nothing'], why: 'The far side is pulled less than the rest of the Earth, so the water there lags behind and bulges.' }
      ]
    });

    /* ---------- tabs & vòng lặp ---------- */
    const ALL_CANVAS = [phC, phV, ecC, ecV, tdC, tdB];
    let tab = 'phase';
    root.querySelectorAll('.moon-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.moon-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('m-' + x.dataset.p).classList.toggle('hidden', x !== b); });
      ALL_CANVAS.forEach((o) => o.fit()); ecInfo(); tdInfo(); dirty = true;
    }));
    let last = performance.now();
    function loop(now) {
      const dt = Math.max(0, Math.min(.1, (now - last) / 1000)); last = now; clock += dt;
      if (tab === 'phase') {
        if (phPlaying && !phDrag) { phA = wrap(phA + dt * phDaysPerSec() / LUNAR * TAU); phInfo(); dirty = true; }
        if (dirty || (!reduceMotion && phRays)) { drawPhase(); drawPhaseView(); }
      } else if (tab === 'eclipse') {
        if (ecPlaying && !ecDrag) {
          const ease = .3 + .7 * Math.min(1, Math.abs(ecT) / .3);
          let t = ecT + dt * .2 * ease; if (t > 1.05) t = -1.05;
          setEcT(t);
        }
        if (dirty || !reduceMotion) { drawEclipse(); drawEclView(); }
      } else {
        if (tdPlaying) { tdHours += dt * tdHoursPerSec(); tdInfo(); dirty = true; }
        if (dirty || !reduceMotion) { drawTide(); drawBeach(); }
      }
      dirty = false;
      if (!destroyed) rafId = window.requestAnimationFrame(loop);
    }

    /* ---------- ngôn ngữ ---------- */
    function refreshTexts() {
      applyStatic(); phPresetLabels();
      setPhPlaying(phPlaying); setEcPlaying(ecPlaying); setTdPlaying(tdPlaying);
      updPhSpeed(); updTdSpeed();
      phInfoKey = ''; ecInfoKey = ''; tdInfoKey = '';
      phInfo(); ecInfo(); tdInfo();
      [qPhase, qEclipse, qTide].forEach((q) => q.refresh());
      dirty = true;
    }
    function setLang(l) {
      lang = l === 'en' ? 'en' : 'vi';
      root.querySelectorAll('.moon-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.moon-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.moon-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    root.querySelectorAll('[data-td]').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    $('ecPos').value = String(Math.round(ecT * 100));
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
