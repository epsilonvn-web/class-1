/* Epsilon Edu - Tool: Vong doi sinh vat (Life cycles)
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Gom 3 phan: Vong doi cua buom, Vong doi cua ech, Cay dau xanh lon len.
 * Dang ky: window.CLASS1_TOOL_MODULES.lifeCycle = { render(context), destroy() }
 */
(() => {
  "use strict";

  const TOOL_ID = "lifeCycle";
  let activeCleanup = null;

  const CSS = `
.life-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.life-tool *{box-sizing:border-box}.life-tool button,.life-tool input{font:inherit}.life-tool button{cursor:pointer}.life-tool .hidden{display:none!important}
.life-tool button:focus-visible,.life-tool canvas:focus-visible,.life-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.life-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.life-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.life-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.life-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.life-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.life-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.life-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.life-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.life-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.life-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.life-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.life-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.life-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.life-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.life-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.life-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.life-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.life-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.life-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.life-panel{width:100%}.life-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.life-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.life-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.life-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.life-tool .card-head.compact{margin-bottom:9px}
.life-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.life-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.life-tool .btn,.life-tool .soft-btn,.life-tool .segmented button,.life-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.life-tool .btn:hover,.life-tool .soft-btn:hover,.life-tool .segmented button:hover,.life-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.life-tool .btn{padding:0 12px}.life-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.life-tool .segmented{display:flex;gap:7px;margin:0}.life-tool .segmented button{padding:0 13px}
.life-tool .segmented button[aria-pressed="true"],.life-tool .soft-btn[aria-pressed="true"],.life-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.life-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.life-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.life-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.life-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.life-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.life-tool .range-control input{width:100%;accent-color:#8b5cf6}.life-tool .range-control b{color:#7c3aed;font-size:13px}
.life-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.life-tool .soft-btn{padding:0 12px}
.life-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.life-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.life-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.life-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.life-tool .info-title{display:flex;align-items:center;gap:10px}.life-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.life-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.life-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.life-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.life-tool .facts{display:grid;gap:6px;margin-top:10px}.life-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.life-tool .facts b{color:#7c3aed;font-size:13.5px}.life-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.life-tool .fun,.life-tool .warn,.life-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.life-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.life-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.life-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.life-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.life-tool .state-big.up{color:#0f766e}.life-tool .state-big.down{color:#b45309}
.life-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.life-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.life-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.life-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.life-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.life-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.life-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.life-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.life-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.life-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.life-tool .qopt:hover{filter:brightness(.985)}.life-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.life-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.life-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.life-tool .qfb,.life-tool .score{font-size:13px;font-weight:900}.life-tool .qfb.ok{color:#15803d}.life-tool .qfb.no{color:#be123c}.life-tool .score{color:#7c3aed}
.life-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.life-grid{grid-template-columns:1fr;align-items:start}.life-side{grid-template-rows:auto auto;height:auto}.life-tool .control-grid{grid-template-columns:1fr}.life-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.life-hero{flex-wrap:wrap;padding:12px}.life-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.life-tabs{grid-template-columns:1fr}.life-tabs .tab{min-height:40px}.life-card{padding:11px;border-radius:18px}.life-tool .card-head{align-items:flex-start;flex-direction:column}.life-tool .head-actions{width:100%;justify-content:space-between}.life-tool .head-actions .segmented{flex:1;min-width:0}.life-tool .head-actions .segmented button{flex:1;padding:0 8px}.life-tool .qopts{grid-template-columns:1fr}.life-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.life-tool *{transition:none!important}}

.life-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.life-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.life-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.life-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.life-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.life-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.life-tool .checklist{display:grid;gap:6px;margin-top:10px}
.life-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.life-tool .checklist .ok{color:#15803d}.life-tool .checklist .no{color:#be123c}.life-tool .checklist .wait{color:#94a3b8}
.life-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.life-tool .process span{flex:1}.life-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.life-tool .process .on{color:#0284c7}.life-tool .process i.on{color:#ec4899}
@media(max-width:640px){.life-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.life-tool .slider-pair{grid-template-columns:1fr}}

.life-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.life-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.life-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.life-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}
`;

  const HTML = `
<section class="life-tool" data-life-tool>
  <div class="life-hero">
    <div class="life-hero-icon" aria-hidden="true">🦋</div>
    <div>
      <p class="life-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="life-lead" data-t="lead"></p>
    </div>
    <div class="life-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="lAudioNotice" class="life-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="life-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="bf" data-t="tabBf"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="fr" data-t="tabFr"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="pl" data-t="tabPl"></button>
  </div>
  <section id="l-bf" class="life-panel" role="tabpanel">
    <div class="life-grid">
      <article class="life-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="bfH"></h2></div>
          <div class="head-actions"><button id="bfPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="cBf" role="img" data-ta="bfCanvas"></canvas></div>
        <p id="bfHud" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="timeL"></span><input id="bfDay" type="range" min="0" max="100" value="0" step="0.1"><b id="bfDayTxt"></b></label>
        <div id="bfStages" class="stage-row" role="group" data-ta="stagesLabel"></div>
      </article>
      <div class="life-side">
        <aside class="life-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeRing"></span><h2 data-t="ringH"></h2></div></div>
          <div class="canvas-wrap"><canvas id="cBfRing" role="img" data-ta="ringCanvas"></canvas></div>
          <div id="bfInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qBf" class="life-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="l-fr" class="life-panel hidden" role="tabpanel">
    <div class="life-grid">
      <article class="life-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="frH"></h2></div>
          <div class="head-actions"><button id="frPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="cFr" role="img" data-ta="frCanvas"></canvas></div>
        <p id="frHud" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="timeL"></span><input id="frDay" type="range" min="0" max="100" value="0" step="0.1"><b id="frDayTxt"></b></label>
        <div id="frStages" class="stage-row" role="group" data-ta="stagesLabel"></div>
      </article>
      <div class="life-side">
        <aside class="life-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeRing"></span><h2 data-t="ringH"></h2></div></div>
          <div class="canvas-wrap"><canvas id="cFrRing" role="img" data-ta="ringCanvas"></canvas></div>
          <div id="frInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qFr" class="life-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="l-pl" class="life-panel hidden" role="tabpanel">
    <div class="life-grid">
      <article class="life-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="plH"></h2></div>
          <div class="head-actions"><button id="plPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="cPl" role="img" data-ta="plCanvas"></canvas></div>
        <p id="plHud" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="timeL"></span><input id="plDay" type="range" min="0" max="100" value="0" step="0.1"><b id="plDayTxt"></b></label>
        <div id="plStages" class="stage-row" role="group" data-ta="stagesLabel"></div>
        <div class="cond-row">
          <span data-t="waterL"></span>
          <div class="segmented" role="group" data-ta="waterL">
            <button type="button" data-water="dry" aria-pressed="false" data-t="wDry"></button>
            <button type="button" data-water="ok" aria-pressed="true" data-t="wOk"></button>
            <button type="button" data-water="flood" aria-pressed="false" data-t="wFlood"></button>
          </div>
          <button id="plLight" class="soft-btn" type="button" aria-pressed="true" data-t="lightL"></button>
        </div>
      </article>
      <div class="life-side">
        <aside class="life-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeRing"></span><h2 data-t="ringH"></h2></div></div>
          <div class="canvas-wrap"><canvas id="cPlRing" role="img" data-ta="ringCanvas"></canvas></div>
          <div id="plInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qPl" class="life-card quiz-card"></article>
      </div>
    </div>
  </section>
</section>`;
  function render(context = {}) {
    if (activeCleanup) { try { activeCleanup(); } catch (_) {} activeCleanup = null; }
    const host = context.host;
    if (!(host instanceof Element)) return;
    host.innerHTML = `<style>${CSS}</style>${HTML}`;
    const root = host.querySelector("[data-life-tool]");
    if (!root) return;
    activeCleanup = initLifeTool(root, context);
  }

  function destroy() {
    if (!activeCleanup) return;
    try { activeCleanup(); } catch (_) {}
    activeCleanup = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[TOOL_ID] = Object.freeze({ render, destroy });

  function initLifeTool(root, context) {
    const TAU = Math.PI * 2;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const ease = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
    const span = (d, a, b) => clamp((d - a) / (b - a), 0, 1);
    const rand = (a, b) => a + Math.random() * (b - a);
    const $ = (id) => root.querySelector(`#${id}`);
    const reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const cleanupFns = [];
    let destroyed = false;
    let rafId = 0;
    let lang = (context && context.lang === "en") ? "en" : "vi";
    const T = (vi, en) => (lang === "en" ? en : vi);
    const L = (o) => o[lang] || o.vi;

    const STR = {
      kicker: ['Epsilon Edu · Khoa học trực quan', 'Epsilon Edu · Visual Science'],
      title: ['Vòng đời sinh vật', 'Life Cycles'],
      lead: ['Kéo thanh thời gian để xem con bướm, con ếch và cây đậu xanh lớn lên từng ngày, từ lúc còn là quả trứng hay hạt giống.',
             'Drag the timeline to watch a butterfly, a frog and a mung bean plant grow day by day, from egg or seed.'],
      tabsLabel: ['Các vòng đời', 'Life cycles'],
      tabBf: ['🦋 Con bướm', '🦋 Butterfly'],
      tabFr: ['🐸 Con ếch', '🐸 Frog'],
      tabPl: ['🌱 Cây đậu xanh', '🌱 Mung bean'],
      eyeSim: ['Mô phỏng', 'Simulation'],
      bfH: ['Từ quả trứng nhỏ đến con bướm', 'From a tiny egg to a butterfly'],
      frH: ['Từ trứng ếch đến chú ếch xanh', 'From frogspawn to a green frog'],
      plH: ['Hạt đậu xanh lớn lên thành cây', 'A mung bean grows into a plant'],
      bfCanvas: ['Vòng đời con bướm trên cành lá', 'A butterfly’s life cycle on a leafy branch'],
      frCanvas: ['Vòng đời con ếch trong ao', 'A frog’s life cycle in a pond'],
      plCanvas: ['Cây đậu xanh lớn lên trong đất', 'A mung bean plant growing in soil'],
      timeL: ['Kéo thanh thời gian', 'Drag the timeline'],
      stagesLabel: ['Các giai đoạn', 'Stages'],
      eyeRing: ['Sơ đồ vòng đời', 'Life cycle diagram'],
      ringH: ['Một vòng tròn khép kín', 'A circle with no end'],
      ringCanvas: ['Sơ đồ các giai đoạn nối thành vòng tròn', 'The stages joined in a circle'],
      waterL: ['Tưới nước:', 'Watering:'],
      wDry: ['Không tưới', 'None'],
      wOk: ['Vừa đủ', 'Just right'],
      wFlood: ['Ngập nước', 'Flooded'],
      lightL: ['☀️ Có ánh sáng', '☀️ Light on']
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
    const audioNotice = $('lAudioNotice');
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
      if (!c) throw new Error(`LIFE_CANVAS_MISSING:${id}`);
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

    function textLight(ctx, text, x, y, color = '#334155', size = 12, align = 'center', weight = 800) {
      ctx.font = `${weight} ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(text, x, y);
    }
    function bubble(ctx, text, x, y, size = 12, bg = '#fff', fg = '#be185d') {
      ctx.font = `900 ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      const tw = ctx.measureText(text).width + 16, th = size + 10;
      ctx.fillStyle = bg; ctx.strokeStyle = 'rgba(236,72,153,.5)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x - tw / 2, y - th / 2, tw, th, th / 2); else ctx.rect(x - tw / 2, y - th / 2, tw, th);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y + .5);
    }

    /* Sơ đồ vòng tròn: mỗi giai đoạn là một ô tròn, giai đoạn hiện tại được tô nổi. */
    function drawRing(rc, stages, idx, centerText) {
      const { w, h, ctx } = rc;
      if (!w) return;
      ctx.fillStyle = '#fbf9ff'; ctx.fillRect(0, 0, w, h);
      const n = stages.length, cx = w / 2, cy = h / 2, R = Math.min(w * .3, h * .31), s = Math.min(24, R * .34);
      const pos = (i) => { const a = -Math.PI / 2 + i / n * TAU; return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), a }; };
      ctx.strokeStyle = 'rgba(167,139,250,.55)'; ctx.lineWidth = 2;
      for (let i = 0; i < n; i++) {
        const a0 = -Math.PI / 2 + i / n * TAU + (s * 1.3) / R, a1 = -Math.PI / 2 + (i + 1) / n * TAU - (s * 1.3) / R;
        ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke();
        const tip = { x: cx + R * Math.cos(a1), y: cy + R * Math.sin(a1) }, back = { x: cx + R * Math.cos(a1 - .08), y: cy + R * Math.sin(a1 - .08) };
        arrow(ctx, back.x, back.y, tip.x, tip.y, 'rgba(167,139,250,.9)', 2, 8);
      }
      stages.forEach((st, i) => {
        const p = pos(i), on = i === idx, r = on ? s * 1.18 : s;
        ctx.fillStyle = on ? '#fdf2f8' : '#ffffff'; ctx.strokeStyle = on ? '#ec4899' : '#ddd6fe'; ctx.lineWidth = on ? 3 : 1.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.save(); ctx.beginPath(); ctx.arc(p.x, p.y, r - 2, 0, TAU); ctx.clip();
        st.icon(ctx, p.x, p.y, r * .82);
        ctx.restore();
        const txt = L(st).short || L(st).name, vertical = Math.abs(Math.cos(p.a)) < .3;
        ctx.font = '900 11.5px system-ui, -apple-system, "Segoe UI", sans-serif';
        const tw = ctx.measureText(txt).width;
        let tx, ty, align = 'center';
        if (vertical) { tx = clamp(p.x, tw / 2 + 4, w - tw / 2 - 4); ty = p.y + Math.sign(Math.sin(p.a)) * (r + 10); }
        else if (Math.cos(p.a) > 0) { align = 'left'; tx = Math.min(p.x + r + 6, w - tw - 4); ty = p.y + Math.sin(p.a) * (r + 6) + (tx < p.x + r ? r + 8 : 0); }
        else { align = 'right'; tx = Math.max(p.x - r - 6, tw + 4); ty = p.y + Math.sin(p.a) * (r + 6) + (tx > p.x - r ? r + 8 : 0); }
        textLight(ctx, txt, tx, ty, on ? '#be185d' : '#64748b', 11.5, align, 900);
      });
      textLight(ctx, centerText, cx, cy, '#6d28d9', 14, 'center', 900);
    }

    /* Bộ điều khiển chung cho một tab vòng đời: thanh thời gian, nút chạy, các giai đoạn, thông tin. */
    function lifeTab(cfg) {
      const p = cfg.prefix;
      const tab = { day: 0, playing: !reduceMotion, infoKey: '', hud: '', cfg };
      const slider = $(`${p}Day`);
      slider.max = String(cfg.max);
      const stageAt = (d) => { let k = 0; cfg.stages.forEach((s, i) => { if (d >= s.from) k = i; }); return k; };
      tab.stageIndex = () => (cfg.cap ? Math.min(stageAt(tab.day), cfg.cap()) : stageAt(tab.day));
      tab.setPlaying = (on) => { tab.playing = on; $(`${p}Play`).textContent = playText(on); };
      tab.setDay = (d, fromUser) => {
        tab.day = clamp(d, 0, cfg.max);
        if (fromUser) tab.setPlaying(false);
        slider.value = String(tab.day);
        tab.update(); dirty = true;
      };
      tab.buildStages = () => {
        $(`${p}Stages`).innerHTML = cfg.stages.map((s, i) => `<button type="button" data-s="${i}" aria-pressed="false"><b>${i + 1}</b><span></span></button>`).join('');
        root.querySelectorAll(`#${p}Stages button`).forEach((b, i) => { b.querySelector('span').textContent = L(cfg.stages[i]).name; });
        tab.infoKey = '';
      };
      $(`${p}Stages`).addEventListener('click', (e) => {
        const b = e.target.closest('button[data-s]'); if (!b) return;
        cancelSpeech(); tab.setDay(cfg.stages[+b.dataset.s].from + (cfg.stages[+b.dataset.s].jump || .3), true);
      });
      slider.addEventListener('input', () => { cancelSpeech(); tab.setDay(+slider.value, true); });
      $(`${p}Play`).onclick = () => { cancelSpeech(); if (!tab.playing && tab.day >= cfg.max - .05) tab.day = 0; tab.setPlaying(!tab.playing); };
      tab.update = () => {
        const idx = tab.stageIndex(), st = cfg.stages[idx], S = L(st);
        const extra = cfg.note ? cfg.note() : null;
        const key = idx + lang + (extra ? extra.key : '');
        root.querySelectorAll(`#${p}Stages button`).forEach((b, i) => b.setAttribute('aria-pressed', String(i === idx)));
        if (key !== tab.infoKey) {
          tab.infoKey = key;
          $(`${p}Info`).innerHTML = `
            <div class="info-title"><span class="emo" aria-hidden="true">${st.emo}</span>
              <div><h3></h3><p class="sub"></p></div>
              <button class="btn" type="button" data-listen>🔊 ${T('Nghe', 'Listen')}</button></div>
            ${extra ? `<p class="warn"></p>` : ''}
            <div class="facts">
              <div><b>${cfg.lookLabel ? cfg.lookLabel() : T('Trông thế nào?', 'What it looks like')}</b><span data-f="look"></span></div>
              <div><b>${cfg.needLabel()}</b><span data-f="need"></span></div>
            </div>
            <p class="fun"></p>`;
          const box = $(`${p}Info`);
          box.querySelector('h3').textContent = S.name;
          box.querySelector('.sub').textContent = S.time;
          if (extra) box.querySelector('.warn').textContent = extra.text;
          box.querySelector('[data-f="look"]').textContent = S.look;
          box.querySelector('[data-f="need"]').textContent = S.need;
          box.querySelector('.fun').textContent = '✨ ' + S.fun;
          box.querySelector('[data-listen]').onclick = () => {
            const S2 = L(cfg.stages[tab.stageIndex()]), ex = cfg.note ? cfg.note() : null;
            speak([S2.name, S2.time, ex ? ex.text : '', S2.look, S2.need, S2.fun].filter(Boolean).join('. '));
          };
        }
        $(`${p}DayTxt`).textContent = cfg.dayText(tab.day);
        const hud = `${st.emo} ${cfg.dayText(tab.day)} – ${extra ? extra.short : (cfg.hudFor && cfg.hudFor(tab.day)) || S.hud}`;
        if (hud !== tab.hud) { tab.hud = hud; $(`${p}Hud`).textContent = hud; }
      };
      tab.step = (dt) => {
        if (!tab.playing) return;
        let d = tab.day + dt * cfg.rate(tab.day);
        if (d >= cfg.max) d = cfg.loop ? 0 : cfg.max;
        if (!cfg.loop && d >= cfg.max) tab.setPlaying(false);
        tab.day = d; slider.value = String(d); tab.update();
      };
      tab.refresh = () => { tab.buildStages(); tab.setPlaying(tab.playing); tab.hud = ''; tab.update(); };
      return tab;
    }

    /* =====================================================================
       1. VÒNG ĐỜI CON BƯỚM: trứng → sâu → nhộng → bướm → trứng
       ===================================================================== */
    function drawEgg(ctx, x, y, r, prog = 0, empty = false) {
      if (empty) {
        ctx.strokeStyle = 'rgba(180,140,60,.7)'; ctx.lineWidth = 1; ctx.fillStyle = 'rgba(254,243,199,.45)';
        ctx.beginPath(); ctx.ellipse(x, y + r * .25, r * .75, r * .75, 0, Math.PI * 1.05, Math.PI * 1.95, true); ctx.fill(); ctx.stroke();
        return;
      }
      ctx.fillStyle = mix('#fef3c7', '#78716c', ease(span(prog, .65, 1)) * .55);
      ctx.beginPath(); ctx.ellipse(x, y, r * .75, r, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(180,140,60,.55)'; ctx.lineWidth = .8;
      for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(x + k * r * .3, y - r * .85); ctx.lineTo(x + k * r * .32, y + r * .85); ctx.stroke(); }
    }
    function drawCaterpillar(ctx, x, y, len, ang, phase) {
      const n = 9, seg = len / n, r = seg * .78;
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
      for (let i = n - 1; i >= 1; i--) {
        const sx = -i * seg * .95, sy = -Math.max(0, Math.sin(phase - i * .6)) * r * .55;
        ctx.fillStyle = '#365314'; ctx.fillRect(sx - r * .2, sy + r * .55, r * .4, r * .45);
        ctx.fillStyle = i % 2 ? '#84cc16' : '#65a30d'; ctx.beginPath(); ctx.arc(sx, sy, r, 0, TAU); ctx.fill();
        ctx.fillStyle = i % 3 === 1 ? '#facc15' : '#1f2937'; ctx.beginPath(); ctx.ellipse(sx, sy - r * .25, r * .2, r * .62, 0, 0, TAU); ctx.fill();
      }
      const hy = -Math.max(0, Math.sin(phase)) * r * .4;
      ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(seg * .15, hy, r * 1.05, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(seg * .45, hy - r * .3, r * .22, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#1f2937'; ctx.lineWidth = Math.max(1, r * .15);
      ctx.beginPath(); ctx.moveTo(seg * .2, hy - r * .9); ctx.lineTo(seg * .5, hy - r * 1.6); ctx.stroke();
      ctx.restore();
    }
    function drawChrysalis(ctx, x, y, len, prog) {
      ctx.save(); ctx.translate(x, y);
      ctx.fillStyle = '#e5e7eb'; ctx.fillRect(-3, -3, 6, 4);
      const late = ease(span(prog, .72, 1));
      ctx.fillStyle = mix('#65a30d', '#3f2a14', late * .75);
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.bezierCurveTo(len * .45, len * .15, len * .4, len * .85, 0, len);
      ctx.bezierCurveTo(-len * .4, len * .85, -len * .45, len * .15, 0, 0); ctx.fill();
      if (late > 0) {
        ctx.globalAlpha = late * .8; ctx.fillStyle = '#f97316';
        ctx.beginPath(); ctx.ellipse(0, len * .45, len * .24, len * .3, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-len * .2, len * .3); ctx.lineTo(len * .2, len * .62); ctx.moveTo(len * .2, len * .3); ctx.lineTo(-len * .2, len * .62); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = '#fbbf24';
      for (const [dx, dy] of [[-.16, .22], [.16, .22], [-.1, .32], [0, .33], [.1, .32]]) { ctx.beginPath(); ctx.arc(dx * len, dy * len, Math.max(1, len * .035), 0, TAU); ctx.fill(); }
      ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 1;
      for (let k = 0; k < 4; k++) { const yy = len * (.6 + k * .09); ctx.beginPath(); ctx.moveTo(-len * .25 * (1 - k * .2), yy); ctx.lineTo(len * .25 * (1 - k * .2), yy); ctx.stroke(); }
      ctx.restore();
    }
    function drawButterfly(ctx, x, y, s, flap, expand = 1, proboscis = 0) {
      ctx.save(); ctx.translate(x, y);
      const open = reduceMotion ? 1 : .25 + .75 * Math.abs(Math.cos(flap));
      for (const side of [-1, 1]) {
        ctx.save(); ctx.scale(side * open * expand, expand);
        ctx.fillStyle = expand < .95 ? '#c2410c' : '#f97316'; ctx.strokeStyle = '#1f2937'; ctx.lineWidth = Math.max(1, s * .06);
        ctx.beginPath(); ctx.moveTo(0, -s * .05); ctx.bezierCurveTo(s * .5, -s * .9, s * 1.2, -s * .75, s * 1.0, -s * .05); ctx.bezierCurveTo(s * .7, s * .05, s * .3, s * .05, 0, 0); ctx.fill(); ctx.stroke();
        ctx.fillStyle = expand < .95 ? '#ea580c' : '#fb923c';
        ctx.beginPath(); ctx.moveTo(0, s * .02); ctx.bezierCurveTo(s * .7, s * .05, s * .82, s * .7, s * .36, s * .76); ctx.bezierCurveTo(s * .15, s * .72, 0, s * .4, 0, s * .02); ctx.fill(); ctx.stroke();
        ctx.lineWidth = Math.max(.6, s * .03);
        ctx.beginPath(); ctx.moveTo(0, -s * .02); ctx.lineTo(s * .85, -s * .4); ctx.moveTo(0, 0); ctx.lineTo(s * .6, -s * .1); ctx.moveTo(0, s * .05); ctx.lineTo(s * .45, s * .55); ctx.stroke();
        ctx.fillStyle = '#fff';
        for (const [dx, dy] of [[.9, -.42], [.76, -.62], [.5, .62], [.62, .45]]) { ctx.beginPath(); ctx.arc(s * dx, s * dy, Math.max(.8, s * .05), 0, TAU); ctx.fill(); }
        ctx.restore();
      }
      ctx.fillStyle = '#1f2937';
      ctx.beginPath(); ctx.ellipse(0, s * .12, s * .09, s * .45, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -s * .38, s * .12, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#1f2937'; ctx.lineWidth = Math.max(1, s * .04);
      for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0, -s * .45); ctx.quadraticCurveTo(sd * s * .15, -s * .75, sd * s * .3, -s * .9); ctx.stroke(); ctx.beginPath(); ctx.arc(sd * s * .3, -s * .9, s * .05, 0, TAU); ctx.fill(); }
      if (proboscis > 0) { ctx.beginPath(); ctx.moveTo(0, -s * .3); ctx.lineTo(0, -s * .3 + s * .55 * proboscis); ctx.stroke(); }
      ctx.restore();
    }

    const BF_STAGES = [
      { from: 0, emo: '🥚', icon: (c, x, y, r) => { drawEgg(c, x - r * .3, y + r * .1, r * .42); drawEgg(c, x + r * .3, y - r * .05, r * .42); },
        vi: { name: 'Trứng', time: 'Khoảng 3 – 5 ngày', look: 'Rất nhỏ, chỉ bằng đầu kim, được bướm mẹ đẻ trên lá cây.', need: 'Chưa cần ăn. Sâu con đang lớn dần bên trong vỏ trứng.', fun: 'Bướm mẹ chọn đúng loại lá mà sâu con thích ăn để đẻ trứng lên đó.', hud: 'Trứng nằm trên lá, sâu con đang lớn bên trong' },
        en: { name: 'Egg', time: 'About 3 – 5 days', look: 'As tiny as a pinhead, laid on a leaf by the mother butterfly.', need: 'No food yet. The baby caterpillar grows inside the shell.', fun: 'The mother picks exactly the kind of leaf her caterpillars like to eat.', hud: 'Eggs on a leaf, a caterpillar growing inside' } },
      { from: 4, emo: '🐛', icon: (c, x, y, r) => drawCaterpillar(c, x + r * .55, y + r * .1, r * 1.5, 0, 1.2),
        vi: { name: 'Sâu bướm', time: 'Khoảng 2 tuần', look: 'Thân dài nhiều đốt, có nhiều chân, lớn lên rất nhanh.', need: 'Ăn lá cây suốt ngày. Bữa ăn đầu tiên thường là chính vỏ trứng của nó.', fun: 'Sâu lớn nhanh đến mức phải lột xác 4 – 5 lần, mỗi lần thay một bộ da mới rộng hơn.', hud: 'Sâu ăn lá và lớn lên rất nhanh' },
        en: { name: 'Caterpillar', time: 'About 2 weeks', look: 'A long body with many segments and legs. It grows very fast.', need: 'Eats leaves all day. Its first meal is often its own eggshell.', fun: 'It grows so fast it must shed its skin 4 – 5 times, each time for a roomier one.', hud: 'The caterpillar munches leaves and grows fast' } },
      { from: 18, emo: '🫛', icon: (c, x, y, r) => drawChrysalis(c, x, y - r * .85, r * 1.6, .3),
        vi: { name: 'Nhộng', time: 'Khoảng 1 – 2 tuần', look: 'Treo mình trên cành, gần như nằm yên một chỗ.', need: 'Không ăn gì. Bên trong, cơ thể sâu đang biến đổi để thành bướm.', fun: 'Nhộng bướm không có lớp tơ bọc ngoài. Cái kén bằng tơ là của ngài và con tằm.', hud: 'Nhộng treo trên cành, bên trong đang biến đổi' },
        en: { name: 'Chrysalis', time: 'About 1 – 2 weeks', look: 'Hangs from a twig and barely moves.', need: 'Eats nothing. Inside, the caterpillar’s body is turning into a butterfly.', fun: 'A butterfly chrysalis has no silk wrapping. Silk cocoons belong to moths and silkworms.', hud: 'The chrysalis hangs still while it changes inside' } },
      { from: 28, emo: '🦋', jump: .7, icon: (c, x, y, r) => drawButterfly(c, x, y + r * .1, r * .62, 0),
        vi: { name: 'Bướm', time: 'Vài tuần, tùy loài', look: 'Có 4 cánh nhiều màu, 6 chân và 2 cái râu.', need: 'Hút mật hoa bằng chiếc vòi dài. Khi không dùng, vòi cuộn tròn lại.', fun: 'Bướm nếm vị bằng chân! Bướm mẹ đậu lên lá để "nếm thử" rồi mới đẻ trứng.', hud: 'Bướm bay đi hút mật hoa' },
        en: { name: 'Butterfly', time: 'A few weeks, depending on the kind', look: 'Four colourful wings, six legs and two antennae.', need: 'Sips nectar through a long tube that curls up when not in use.', fun: 'Butterflies taste with their feet! A mother lands on a leaf to “taste” it before laying eggs.', hud: 'The butterfly flies off to sip nectar' } }
    ];
    // Một số máy chưa có emoji 🫛, dùng hình vẽ thay thế trong bảng thông tin.
    BF_STAGES[2].emo = '🌿';
    const BF_MOLTS = [6.5, 9.5, 12.5, 15.5];
    const bfC = makeCanvas('cBf', (w) => clamp(w * .64, 290, 540));
    const bfR = makeCanvas('cBfRing', (w) => clamp(w * .7, 210, 290));
    const bfOff = document.createElement('canvas');
    const bf = lifeTab({
      prefix: 'bf', stages: BF_STAGES, max: 35, loop: true,
      rate: (d) => (d >= 28 && d < 28.7 ? .45 : 1),
      dayText: (d) => T(`Ngày ${Math.floor(d) + 1}`, `Day ${Math.floor(d) + 1}`),
      needLabel: () => T('Ăn gì?', 'What does it eat?'),
      hudFor: (d) => {
        if (BF_MOLTS.some((m) => Math.abs(d - m) < .45)) return T('Sâu đang lột xác để lớn hơn!', 'The caterpillar is shedding its skin to grow!');
        if (d >= 28 && d < 28.7) return T('Bướm vừa chui ra, chờ cánh khô và căng rộng', 'The butterfly just came out; its wings are drying and spreading');
        if (d >= 31 && d < 33) return T('Bướm đậu trên hoa, dùng vòi hút mật', 'Resting on a flower, sipping nectar');
        if (d >= 33.6) return T('Bướm mẹ đẻ trứng lên lá: vòng đời bắt đầu lại!', 'The mother lays eggs on a leaf: the cycle starts again!');
        return '';
      }
    });
    const BF_BITES = Array.from({ length: 14 }, (_, i) => ({ t: .22 + (i >> 1) * .11, side: i % 2 ? 1 : -1 }));
    function bfGeom() {
      const w = bfC.w || 640, h = bfC.h || 400;
      const leaf = { x: w * .2, y: h * .44, L: w * .38, ang: .32 };
      return { w, h, leaf, twig: { x: w * .66, y: h * .14 }, flower: { x: w * .86, y: h * .6 } };
    }
    const leafHalf = (t, Lh) => Lh * .3 * Math.sin(Math.PI * Math.pow(clamp(t, 0, 1), .85));
    const leafPt = (g, lx, ly) => ({ x: g.leaf.x + lx * Math.cos(g.leaf.ang) - ly * Math.sin(g.leaf.ang), y: g.leaf.y + lx * Math.sin(g.leaf.ang) + ly * Math.cos(g.leaf.ang) });
    function drawLeaf(g, eaten) {
      const { w, h } = g, dpr = bfC.c.width / w;
      if (bfOff.width !== bfC.c.width || bfOff.height !== bfC.c.height) { bfOff.width = bfC.c.width; bfOff.height = bfC.c.height; }
      const o = bfOff.getContext('2d');
      o.setTransform(1, 0, 0, 1, 0, 0); o.clearRect(0, 0, bfOff.width, bfOff.height);
      o.setTransform(dpr, 0, 0, dpr, 0, 0);
      o.save(); o.translate(g.leaf.x, g.leaf.y); o.rotate(g.leaf.ang);
      const Lh = g.leaf.L;
      o.fillStyle = '#4ade80'; o.strokeStyle = '#15803d'; o.lineWidth = 2;
      o.beginPath(); o.moveTo(0, 0);
      o.bezierCurveTo(Lh * .3, -Lh * .36, Lh * .75, -Lh * .28, Lh, 0);
      o.bezierCurveTo(Lh * .75, Lh * .28, Lh * .3, Lh * .36, 0, 0); o.fill(); o.stroke();
      o.strokeStyle = 'rgba(21,128,61,.6)'; o.lineWidth = 1.5;
      o.beginPath(); o.moveTo(0, 0); o.lineTo(Lh * .98, 0); o.stroke();
      for (let k = 1; k <= 5; k++) { const t = k / 6; o.beginPath(); o.moveTo(Lh * t, 0); o.lineTo(Lh * (t + .1), -leafHalf(t + .1, Lh) * .85); o.moveTo(Lh * t, 0); o.lineTo(Lh * (t + .1), leafHalf(t + .1, Lh) * .85); o.stroke(); }
      o.globalCompositeOperation = 'destination-out';
      for (let i = 0; i < eaten; i++) { const b = BF_BITES[i]; o.beginPath(); o.arc(Lh * b.t, b.side * leafHalf(b.t, Lh) * 1.02, Lh * .065, 0, TAU); o.fill(); }
      o.restore();
      bfC.ctx.drawImage(bfOff, 0, 0, w, h);
    }
    function drawBf() {
      const g = bfGeom(), { w, h } = g, ctx = bfC.ctx, d = bf.day;
      if (!bfC.w) return;
      const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#bae6fd'); sky.addColorStop(1, '#f0fdf4');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#86efac'; ctx.fillRect(0, h * .88, w, h * .12);
      ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2;
      for (let x = 6; x < w; x += 14) { ctx.beginPath(); ctx.moveTo(x, h * .9); ctx.lineTo(x + 3, h * .86); ctx.stroke(); }
      // hoa
      const fl = g.flower;
      ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(fl.x, h * .89); ctx.quadraticCurveTo(fl.x - 10, h * .75, fl.x, fl.y); ctx.stroke();
      for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.ellipse(fl.x + Math.cos(a) * h * .035, fl.y + Math.sin(a) * h * .035, h * .03, h * .018, a, 0, TAU); ctx.fill(); }
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(fl.x, fl.y, h * .02, 0, TAU); ctx.fill();
      // cành
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-5, h * .4); ctx.quadraticCurveTo(w * .3, h * .36, g.twig.x + w * .12, g.twig.y - h * .02); ctx.stroke();
      ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.leaf.x - 6, h * .385); ctx.lineTo(g.leaf.x, g.leaf.y); ctx.stroke();
      // lá + vết ăn
      const tC = span(d, 4, 18);
      const eaten = d >= 18 ? BF_BITES.length : Math.floor(tC * BF_BITES.length);
      drawLeaf(g, d >= 34.9 ? BF_BITES.length : eaten);
      const Lh = g.leaf.L, eggR = Math.max(3, Lh * .028);
      const EGGS = [[.36, -.05], [.43, .04], [.31, .07]];
      // trứng
      if (d < 4) EGGS.forEach(([a, b]) => { const p = leafPt(g, a * Lh, b * Lh); drawEgg(ctx, p.x, p.y, eggR, d / 4); });
      else if (d < 5) EGGS.forEach(([a, b]) => { const p = leafPt(g, a * Lh, b * Lh); drawEgg(ctx, p.x, p.y, eggR, 0, true); });
      if (d >= 33.6) { const n = Math.ceil(span(d, 33.6, 34.6) * 3); EGGS.slice(0, n).forEach(([a, b]) => { const p = leafPt(g, a * Lh, b * Lh); drawEgg(ctx, p.x, p.y, eggR, 0); }); }
      // da lột
      if (d >= 4 && d < 18) BF_MOLTS.forEach((m, k) => { if (d > m) { const p = leafPt(g, (.18 + k * .06) * Lh, .14 * Lh); ctx.fillStyle = 'rgba(214,211,209,.9)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, Lh * .025 + k, Lh * .012, .4, 0, TAU); ctx.fill(); } });
      const phase = reduceMotion ? 1 : clock * 5;
      // sâu
      if (d >= 4 && d < 18) {
        const len = lerp(Lh * .07, Lh * .42, ease(tC));
        const hx = lerp(Lh * .42, Lh * .9, ease(tC)), p = leafPt(g, hx, Math.sin(clock * .8) * Lh * .03);
        drawCaterpillar(ctx, p.x, p.y, len, g.leaf.ang, phase);
        if (BF_MOLTS.some((m) => Math.abs(d - m) < .45)) bubble(ctx, T('Lột xác!', 'Shedding skin!'), p.x - len * .3, p.y - len * .45 - 14, 12);
      }
      // nhộng
      const cl = Math.min(h * .2, Lh * .32);
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.twig.x - w * .08, g.twig.y + h * .02); ctx.lineTo(g.twig.x + w * .12, g.twig.y - h * .02); ctx.stroke();
      if (d >= 18 && d < 28) {
        const pr = span(d, 18, 28);
        if (pr < .06) drawCaterpillar(ctx, g.twig.x, g.twig.y + cl * .1, cl, Math.PI / 2 + .3, 0);
        else drawChrysalis(ctx, g.twig.x, g.twig.y, cl, pr);
      }
      // bướm
      if (d >= 28 && d < 35) {
        const s = Math.min(h * .07, w * .05);
        if (d < 28.7) {
          ctx.globalAlpha = .45; ctx.fillStyle = 'rgba(226,232,240,.8)';
          ctx.beginPath(); ctx.moveTo(g.twig.x, g.twig.y); ctx.bezierCurveTo(cl * .45 + g.twig.x, g.twig.y + cl * .15, cl * .4 + g.twig.x, g.twig.y + cl * .85, g.twig.x, g.twig.y + cl); ctx.bezierCurveTo(g.twig.x - cl * .4, g.twig.y + cl * .85, g.twig.x - cl * .45, g.twig.y + cl * .15, g.twig.x, g.twig.y); ctx.fill();
          ctx.globalAlpha = 1;
          drawButterfly(ctx, g.twig.x, g.twig.y + cl + s * .6, s, 0, lerp(.35, 1, ease(span(d, 28, 28.7))));
        } else {
          const loop = { x: w * .58 + Math.cos(clock * .8) * w * .2, y: h * .3 + Math.sin(clock * 1.6) * h * .1 };
          const onFl = { x: g.flower.x, y: g.flower.y - s * .55 };
          const eggP = leafPt(g, .42 * Lh, -.02 * Lh), onLeaf = { x: eggP.x, y: eggP.y - s * .5 };
          let p = loop, flap = clock * 9, prob = 0;
          if (d >= 30.4 && d < 33) { const k = ease(span(d, 30.4, 31)); p = { x: lerp(loop.x, onFl.x, k), y: lerp(loop.y, onFl.y, k) }; if (k >= 1) { flap = clock * 2; prob = 1; } }
          else if (d >= 33) { const k = ease(span(d, 33, 33.6)); p = { x: lerp(onFl.x, onLeaf.x, k), y: lerp(onFl.y, onLeaf.y, k) - Math.sin(k * Math.PI) * h * .12 }; if (k >= 1) flap = clock * 2; }
          drawButterfly(ctx, p.x, p.y, s, flap, 1, prob);
        }
      }
      textLight(ctx, T('Lá cây', 'Leaf'), leafPt(g, Lh * .2, -Lh * .28).x, leafPt(g, Lh * .2, -Lh * .28).y, '#166534', 11.5);
    }

    const qBf = makeQuiz($('qBf'), {
      vi: [
        { q: 'Vòng đời của bướm có mấy giai đoạn?', a: ['4: trứng, sâu, nhộng, bướm', '2: trứng và bướm', '3: trứng, sâu, bướm', '5 giai đoạn'], why: 'Bướm trải qua 4 giai đoạn: trứng, sâu, nhộng rồi mới thành bướm.' },
        { q: 'Sâu bướm ăn gì nhiều nhất?', a: ['Lá cây', 'Mật hoa', 'Côn trùng nhỏ', 'Đất'], why: 'Sâu ăn lá suốt ngày để tích thức ăn cho giai đoạn nhộng.' },
        { q: 'Ở giai đoạn nhộng, bên trong đang diễn ra điều gì?', a: ['Cơ thể sâu biến đổi thành bướm', 'Sâu ngủ đông', 'Sâu ăn thật nhiều', 'Sâu đẻ trứng'], why: 'Nhộng không ăn, nhưng bên trong cơ thể đang biến đổi rất nhiều để mọc cánh.' },
        { q: 'Bướm hút mật hoa bằng gì?', a: ['Một cái vòi dài cuộn tròn', 'Răng', 'Râu', 'Cánh'], why: 'Bướm có vòi hút dài, khi không dùng thì cuộn tròn như lò xo.' },
        { q: 'Vì sao sâu bướm phải lột xác nhiều lần?', a: ['Vì lớn nhanh, da cũ chật', 'Vì bị lạnh', 'Vì muốn đổi màu', 'Vì da bị bẩn'], why: 'Da sâu không giãn ra mãi được, nên sâu lột da cũ để có lớp da mới rộng hơn.' },
        { q: 'Bướm có bao nhiêu chân?', a: ['6 chân', '4 chân', '8 chân', '10 chân'], why: 'Như mọi loài côn trùng, bướm có 6 chân. Một vài loài có 2 chân trước rất nhỏ nên trông như 4 chân.' }
      ],
      en: [
        { q: 'How many stages are in a butterfly’s life cycle?', a: ['4: egg, caterpillar, chrysalis, butterfly', '2: egg and butterfly', '3: egg, caterpillar, butterfly', '5 stages'], why: 'A butterfly goes through 4 stages: egg, caterpillar, chrysalis, then butterfly.' },
        { q: 'What does a caterpillar eat most?', a: ['Leaves', 'Nectar', 'Small insects', 'Soil'], why: 'Caterpillars eat leaves all day to store food for the chrysalis stage.' },
        { q: 'What happens inside a chrysalis?', a: ['The body changes into a butterfly', 'It hibernates', 'It eats a lot', 'It lays eggs'], why: 'It eats nothing, but inside its body is changing a lot and growing wings.' },
        { q: 'How does a butterfly drink nectar?', a: ['Through a long curly tube', 'With teeth', 'With antennae', 'With its wings'], why: 'It has a long feeding tube that curls up like a spring when not in use.' },
        { q: 'Why does a caterpillar shed its skin many times?', a: ['It grows fast and the old skin gets tight', 'It feels cold', 'It wants a new colour', 'Its skin is dirty'], why: 'Its skin cannot stretch forever, so it sheds the old one for a roomier one.' },
        { q: 'How many legs does a butterfly have?', a: ['6', '4', '8', '10'], why: 'Like all insects, butterflies have 6 legs. Some keep two front legs tiny, so they look like they have 4.' }
      ]
    });

    /* =====================================================================
       2. VÒNG ĐỜI CON ẾCH: trứng → nòng nọc → nòng nọc có chân → ếch con → ếch
       ===================================================================== */
    function drawTadpole(ctx, x, y, s, ang, phase, hind = 0, front = 0, tail = 1, gills = 0) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
      if (tail > .02) {
        const tl = s * 2 * tail;
        ctx.fillStyle = 'rgba(68,64,60,.85)'; ctx.beginPath();
        const N = 12;
        for (let i = 0; i <= N; i++) { const t = i / N, xx = -s * .45 - tl * t, yy = Math.sin(phase - t * 4) * s * .35 * t - s * .28 * (1 - t); if (i) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy); }
        for (let i = N; i >= 0; i--) { const t = i / N, xx = -s * .45 - tl * t, yy = Math.sin(phase - t * 4) * s * .35 * t + s * .28 * (1 - t); ctx.lineTo(xx, yy); }
        ctx.closePath(); ctx.fill();
      }
      ctx.strokeStyle = '#4d7c0f'; ctx.lineWidth = Math.max(1.5, s * .14); ctx.lineCap = 'round';
      if (hind > 0) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(-s * .4, sd * s * .25); ctx.lineTo(-s * (.4 + .35 * hind), sd * s * (.25 + .4 * hind)); ctx.lineTo(-s * (.4 + .7 * hind), sd * s * (.3 + .35 * hind)); ctx.stroke(); }
      if (front > 0) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(s * .2, sd * s * .3); ctx.lineTo(s * (.2 + .3 * front), sd * s * (.3 + .3 * front)); ctx.stroke(); }
      if (gills > 0) { ctx.strokeStyle = 'rgba(244,114,182,.8)'; ctx.lineWidth = 1; for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(s * .05, sd * s * .38); ctx.lineTo(s * (-.05 + k * .08), sd * s * (.38 + .25 * gills)); ctx.stroke(); } }
      const bg = ctx.createRadialGradient(s * .1, -s * .1, s * .05, 0, 0, s * .6);
      bg.addColorStop(0, '#78716c'); bg.addColorStop(1, '#3f3f2e');
      ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(0, 0, s * .6, s * .42, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(s * .32, -s * .14, s * .1, 0, TAU); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(s * .35, -s * .14, s * .05, 0, TAU); ctx.fill();
      ctx.restore();
    }
    // ếch nhìn ngang, quay mặt sang trái; (x, y) là điểm chạm đất
    function drawFrog(ctx, x, y, s, tail = 0, tongueTo = null, sac = 0) {
      ctx.save();
      if (tail > .02) { ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.moveTo(x + s * .5, y - s * .5); ctx.lineTo(x + s * (.55 + .6 * tail), y - s * .4); ctx.lineTo(x + s * .5, y - s * .3); ctx.fill(); }
      ctx.fillStyle = '#15803d';
      ctx.beginPath(); ctx.ellipse(x + s * .38, y - s * .22, s * .42, s * .22, -.2, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x + s * .05, y - s * .04, s * .4, s * .07, 0, 0, TAU); ctx.fill();
      const bg = ctx.createLinearGradient(x, y - s * .9, x, y);
      bg.addColorStop(0, '#4ade80'); bg.addColorStop(1, '#16a34a');
      ctx.fillStyle = bg;
      ctx.beginPath(); ctx.ellipse(x, y - s * .42, s * .6, s * .38, -.15, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x - s * .45, y - s * .6, s * .36, s * .27, .15, 0, TAU); ctx.fill();
      ctx.fillStyle = '#166534';
      for (const [dx, dy, r] of [[.1, -.62, .08], [.3, -.45, .06], [-.05, -.4, .05]]) { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, TAU); ctx.fill(); }
      if (sac > 0) { ctx.fillStyle = 'rgba(254,249,195,.95)'; ctx.beginPath(); ctx.arc(x - s * .62, y - s * .42, s * .22 * sac, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = Math.max(2, s * .1); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x - s * .35, y - s * .3); ctx.lineTo(x - s * .5, y); ctx.stroke();
      ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(x - s * .45, y - s * .86, s * .17, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.arc(x - s * .47, y - s * .88, s * .11, 0, TAU); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(x - s * .48, y - s * .88, s * .07, s * .04, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#14532d'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - s * .8, y - s * .58); ctx.quadraticCurveTo(x - s * .55, y - s * .48, x - s * .3, y - s * .58); ctx.stroke();
      if (tongueTo) { ctx.strokeStyle = '#f472b6'; ctx.lineWidth = Math.max(2, s * .07); ctx.beginPath(); ctx.moveTo(x - s * .78, y - s * .57); ctx.lineTo(tongueTo.x, tongueTo.y); ctx.stroke(); ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(tongueTo.x, tongueTo.y, Math.max(2, s * .06), 0, TAU); ctx.fill(); }
      ctx.restore();
    }
    function drawFly(ctx, x, y, s) {
      ctx.fillStyle = 'rgba(203,213,225,.85)';
      const f = reduceMotion ? 1 : Math.abs(Math.sin(clock * 40));
      ctx.beginPath(); ctx.ellipse(x - s * .4, y - s * .5, s * .5, s * .3 * f + .5, -.6, 0, TAU); ctx.ellipse(x + s * .4, y - s * .5, s * .5, s * .3 * f + .5, .6, 0, TAU); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(x, y, s * .4, s * .3, 0, 0, TAU); ctx.fill();
    }
    const SPAWN = Array.from({ length: 38 }, (_, i) => { const a = i * 2.399, r = Math.sqrt(i / 38); return { x: Math.cos(a) * r, y: Math.sin(a) * r * .7 }; });

    const FR_STAGES = [
      { from: 0, emo: '🫧', icon: (c, x, y, r) => { for (const p of SPAWN.slice(0, 9)) { c.fillStyle = 'rgba(186,230,253,.8)'; c.beginPath(); c.arc(x + p.x * r * .7, y + p.y * r * .9, r * .2, 0, TAU); c.fill(); c.fillStyle = '#111'; c.beginPath(); c.arc(x + p.x * r * .7, y + p.y * r * .9, r * .07, 0, TAU); c.fill(); } },
        vi: { short: 'Trứng', name: 'Trứng ếch', time: 'Khoảng 1 tuần', look: 'Rất nhiều trứng dính thành đám. Mỗi trứng là một chấm đen nằm trong lớp thạch trong suốt.', need: 'Chưa ăn. Lớp thạch giữ cho trứng an toàn và đủ ấm.', fun: 'Ếch mẹ đẻ rất nhiều trứng một lúc, có khi hàng trăm, hàng nghìn quả.', hud: 'Đám trứng ếch nổi gần mặt nước' },
        en: { short: 'Spawn', name: 'Frogspawn', time: 'About 1 week', look: 'Many eggs stuck together. Each is a black dot inside clear jelly.', need: 'No food yet. The jelly keeps the eggs safe and warm.', fun: 'A mother frog lays lots of eggs at once, sometimes hundreds or thousands.', hud: 'A clump of frog eggs floats near the surface' } },
      { from: 7, emo: '🐟', icon: (c, x, y, r) => drawTadpole(c, x + r * .3, y, r * .75, 0, 1),
        vi: { name: 'Nòng nọc', time: 'Khoảng tuần 2 – 6', look: 'Đầu to, đuôi dài, chưa có chân. Bơi dưới nước như con cá nhỏ.', need: 'Ăn tảo và rong rêu. Thở bằng mang giống cá.', fun: 'Nòng nọc mới nở bám vào cây cỏ dưới nước vài ngày rồi mới bơi đi.', hud: 'Nòng nọc vẫy đuôi bơi dưới nước' },
        en: { name: 'Tadpole', time: 'About weeks 2 – 6', look: 'Big head, long tail, no legs yet. Swims like a tiny fish.', need: 'Eats algae and pond plants. Breathes with gills like a fish.', fun: 'Newly hatched tadpoles cling to water plants for a few days before swimming off.', hud: 'Tadpoles wiggle their tails and swim' } },
      { from: 42, emo: '🦵', icon: (c, x, y, r) => drawTadpole(c, x + r * .2, y, r * .75, 0, 1, 1, .6, .6),
        vi: { short: 'Mọc chân', name: 'Nòng nọc mọc chân', time: 'Khoảng tuần 7 – 10', look: 'Chân sau mọc trước, sau đó đến chân trước. Đuôi ngắn dần.', need: 'Bắt đầu có phổi, hay ngoi lên mặt nước để thở.', fun: 'Đuôi không rụng đi mà được cơ thể hấp thụ dần làm chất dinh dưỡng.', hud: 'Nòng nọc mọc chân, đuôi ngắn dần' },
        en: { short: 'Legs', name: 'Tadpole with legs', time: 'About weeks 7 – 10', look: 'Back legs grow first, then front legs. The tail gets shorter.', need: 'It grows lungs and swims up to the surface to breathe.', fun: 'The tail doesn’t fall off. The body slowly absorbs it as food.', hud: 'Legs are growing; the tail is shrinking' } },
      { from: 70, emo: '🐸', icon: (c, x, y, r) => drawFrog(c, x + r * .15, y + r * .4, r * .9, .5),
        vi: { name: 'Ếch con', time: 'Khoảng tuần 11 – 12', look: 'Trông như ếch nhỏ nhưng còn một mẩu đuôi.', need: 'Bắt đầu lên bờ và tập bắt côn trùng nhỏ.', fun: 'Từ đây ếch sống được cả dưới nước lẫn trên cạn. Ếch thuộc nhóm động vật lưỡng cư.', hud: 'Ếch con leo lên lá sen' },
        en: { name: 'Froglet', time: 'About weeks 11 – 12', look: 'Looks like a little frog with a stub of tail.', need: 'Starts going on land and catching tiny insects.', fun: 'Now it can live in water and on land. Frogs are amphibians.', hud: 'The froglet climbs onto a lily pad' } },
      { from: 84, emo: '🐸', icon: (c, x, y, r) => drawFrog(c, x + r * .15, y + r * .45, r * 1.05, 0, null, .8),
        vi: { short: 'Ếch', name: 'Ếch trưởng thành', time: 'Từ tuần 13 trở đi', look: 'Chân sau dài và khỏe để nhảy xa. Da ẩm và trơn.', need: 'Bắt ruồi, muỗi bằng chiếc lưỡi dài và dính. Thở bằng phổi và cả qua da.', fun: 'Mùa mưa, ếch đực phồng túi kêu "ộp ộp" gọi ếch cái. Rồi ếch cái đẻ trứng, vòng đời bắt đầu lại.', hud: 'Ếch bắt ruồi bằng lưỡi dài' },
        en: { short: 'Frog', name: 'Adult frog', time: 'From week 13 on', look: 'Long, strong back legs for jumping. Moist, smooth skin.', need: 'Catches flies and mosquitoes with a long sticky tongue. Breathes with lungs and through its skin.', fun: 'In the rainy season, male frogs puff up their throats and call to females. Then eggs are laid and the cycle begins again.', hud: 'The frog catches flies with its long tongue' } }
    ];
    FR_STAGES[0].emo = '🥚';
    const frC = makeCanvas('cFr', (w) => clamp(w * .64, 290, 540));
    const frR = makeCanvas('cFrRing', (w) => clamp(w * .7, 210, 290));
    const fr = lifeTab({
      prefix: 'fr', stages: FR_STAGES, max: 100, loop: true,
      rate: () => 3,
      dayText: (d) => T(`Tuần ${Math.floor(d / 7) + 1} (ngày ${Math.floor(d) + 1})`, `Week ${Math.floor(d / 7) + 1} (day ${Math.floor(d) + 1})`),
      needLabel: () => T('Ăn gì, thở thế nào?', 'Food and breathing'),
      hudFor: (d) => {
        if (d >= 7 && d < 10) return T('Nòng nọc vừa nở, bám vào cây cỏ dưới nước', 'Just hatched, clinging to water plants');
        if (d >= 58 && d < 70) return T('Chân trước đã mọc, đuôi ngắn dần', 'Front legs are out; the tail is shrinking');
        if (d >= 96) return T('Ếch mẹ đẻ trứng xuống nước: vòng đời bắt đầu lại!', 'The mother lays eggs in the water: the cycle starts again!');
        return '';
      }
    });
    function frGeom() {
      const w = frC.w || 640, h = frC.h || 400, wl = h * .3;
      return { w, h, wl, padA: { x: w * .27, y: wl }, padB: { x: w * .62, y: wl }, eggs: { x: w * .27, y: wl + h * .1 }, bottom: h * .9 };
    }
    function drawPad(ctx, x, y, r) {
      ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(x, y, r, r * .28, 0, .25, TAU - .05); ctx.lineTo(x, y); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    function drawFr() {
      const g = frGeom(), { w, h, wl } = g, ctx = frC.ctx, d = fr.day;
      if (!frC.w) return;
      const sky = ctx.createLinearGradient(0, 0, 0, wl); sky.addColorStop(0, '#bae6fd'); sky.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, wl);
      drawSun(ctx, w * .08, h * .09, h * .045, .4);
      const wg = ctx.createLinearGradient(0, wl, 0, h); wg.addColorStop(0, '#67e8f9'); wg.addColorStop(1, '#0e7490');
      ctx.fillStyle = wg; ctx.fillRect(0, wl, w, h - wl);
      ctx.fillStyle = 'rgba(255,255,255,.08)';
      for (let k = 0; k < 4; k++) { const x = w * (.15 + k * .22); ctx.beginPath(); ctx.moveTo(x, wl); ctx.lineTo(x + w * .05, wl); ctx.lineTo(x - w * .05, h); ctx.lineTo(x - w * .1, h); ctx.closePath(); ctx.fill(); }
      ctx.fillStyle = '#78716c'; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, g.bottom); for (let x = 0; x <= w; x += 20) ctx.lineTo(x, g.bottom + Math.sin(x * .05) * 4); ctx.lineTo(w, h); ctx.fill();
      // bờ đất
      ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.moveTo(w * .84, h); ctx.lineTo(w * .86, wl - h * .02); ctx.quadraticCurveTo(w * .92, wl - h * .07, w, wl - h * .08); ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.moveTo(w * .84, h); ctx.lineTo(w * .855, wl + h * .04); ctx.lineTo(w, wl + h * .02); ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
      // lau sậy
      ctx.strokeStyle = '#4d7c0f'; ctx.lineWidth = 2.5;
      for (let k = 0; k < 6; k++) { const x = w * (.03 + k * .018); ctx.beginPath(); ctx.moveTo(x, g.bottom); ctx.quadraticCurveTo(x + 6, wl, x + 3 + Math.sin(clock + k) * 2, wl - h * (.12 + (k % 3) * .04)); ctx.stroke(); }
      ctx.fillStyle = '#78350f'; for (let k = 0; k < 6; k += 2) { const x = w * (.03 + k * .018) + 3; ctx.beginPath(); ctx.ellipse(x, wl - h * (.12 + (k % 3) * .04), 3, 9, 0, 0, TAU); ctx.fill(); }
      // rong dưới nước
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = 2;
      for (let k = 0; k < 7; k++) { const x = w * (.12 + k * .1); ctx.beginPath(); ctx.moveTo(x, g.bottom); for (let j = 1; j <= 6; j++) ctx.lineTo(x + Math.sin(clock * 1.2 + j + k) * 5, g.bottom - j * h * .03); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(0, wl); ctx.lineTo(w * .85, wl); ctx.stroke();
      drawPad(ctx, g.padA.x, g.padA.y, w * .07);
      drawPad(ctx, g.padB.x, g.padB.y, w * .08);

      const eggR = Math.max(4, h * .014);
      const drawSpawn = (n, prog) => {
        for (const p of SPAWN.slice(0, n)) {
          const x = g.eggs.x + p.x * h * .08, y = g.eggs.y + p.y * h * .08;
          ctx.fillStyle = 'rgba(224,242,254,.55)'; ctx.beginPath(); ctx.arc(x, y, eggR, 0, TAU); ctx.fill();
          ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(x, y, eggR * .35 * (1 + prog * .4), eggR * .35, prog * 1.2, 0, TAU); ctx.fill();
          if (prog > .5) { ctx.strokeStyle = '#111'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - eggR * .3, y); ctx.lineTo(x - eggR * .3 - eggR * .5 * prog, y + eggR * .3); ctx.stroke(); }
        }
      };
      if (d < 7) drawSpawn(SPAWN.length, d / 7);
      if (d >= 96) drawSpawn(Math.ceil(span(d, 96.5, 99) * SPAWN.length), 0);

      const ph = reduceMotion ? 1 : clock * 8;
      if (d >= 7 && d < 72) {
        const s = lerp(h * .022, h * .055, ease(span(d, 7, 42)));
        const hind = ease(span(d, 42, 54)), front = ease(span(d, 56, 66)), tail = 1 - .8 * ease(span(d, 58, 72));
        const gills = d < 14 ? 1 - span(d, 10, 14) : 0;
        const attach = d < 10;
        const sib = [[0, 1, 1], [1.7, .82, .6], [3.4, .78, .55], [5.1, .7, .5]];
        for (const [off, sc, alpha] of sib.slice().reverse()) {
          let x, y, ang;
          if (attach) { x = g.eggs.x + Math.cos(off * 2) * h * .07; y = g.eggs.y + h * .06 + Math.sin(off) * h * .03; ang = -1.2 + Math.sin(clock * 3 + off) * .2; }
          else {
            const t = clock * .45 + off;
            x = w * .45 + Math.sin(t) * w * .28; y = wl + h * .33 + Math.sin(t * 1.7 + off) * h * .14;
            const dx = Math.cos(t) * w * .28, dy = Math.cos(t * 1.7 + off) * h * .14 * 1.7;
            ang = Math.atan2(dy, dx);
            if (d > 50 && off === 0) y = lerp(y, wl + h * .08, ease(span(d, 62, 70)) * .6);
          }
          ctx.globalAlpha = alpha; drawTadpole(ctx, x, y, s * sc, ang, ph + off, hind, front, tail, gills); ctx.globalAlpha = 1;
        }
      }
      // ếch con → ếch trưởng thành
      if (d >= 70 && d < 100) {
        const grow = lerp(h * .06, h * .11, ease(span(d, 70, 92)));
        const tail = 1 - ease(span(d, 72, 84));
        const k = ease(span(d, 70, 73));
        let fx = lerp(w * .5, g.padB.x + grow * .2, k), fy = lerp(wl + h * .1, g.padB.y, k);
        if (d >= 95) { const j = ease(span(d, 95, 96.5)); fx = lerp(g.padB.x + grow * .2, g.eggs.x + h * .14, j); fy = lerp(g.padB.y, g.eggs.y + h * .06, j) - Math.sin(j * Math.PI) * h * .14; }
        let tongue = null, sac = 0;
        const fly = { x: g.padB.x - w * .16 + Math.sin(clock * 2.3) * w * .04, y: wl - h * .14 + Math.cos(clock * 3.1) * h * .04 };
        if (d >= 84 && d < 95) {
          const cyc = (clock % 4) / 4;
          if (cyc < .5) drawFly(ctx, fly.x, fly.y, Math.max(4, h * .012));
          if (cyc > .38 && cyc < .5) tongue = { x: lerp(fx - grow * .8, fly.x, span(cyc, .38, .44) - span(cyc, .44, .5)), y: lerp(fy - grow * .6, fly.y, span(cyc, .38, .44) - span(cyc, .44, .5)) };
          if (cyc > .65 && cyc < .95) { sac = .6 + .4 * Math.abs(Math.sin(clock * 10)); bubble(ctx, T('ộp ộp!', 'ribbit!'), fx - grow * .4, fy - grow * 1.45, 12, '#fff', '#15803d'); }
        } else if (d >= 70 && d < 84) drawFly(ctx, fly.x, fly.y, Math.max(3, h * .009));
        drawFrog(ctx, fx, fy, grow, tail, tongue, sac);
      }
      label(ctx, T('Ao', 'Pond'), w * .5, h - 14, '#e0f2fe', 12);
    }

    const qFr = makeQuiz($('qFr'), {
      vi: [
        { q: 'Ếch thường đẻ trứng ở đâu?', a: ['Dưới nước', 'Trên cây cao', 'Trong hang khô', 'Trong tổ chim'], why: 'Hầu hết các loài ếch đẻ trứng ở ao, hồ, ruộng nước vì nòng nọc phải sống dưới nước.' },
        { q: 'Nòng nọc thở bằng gì?', a: ['Mang', 'Phổi', 'Mũi như người', 'Đuôi'], why: 'Nòng nọc thở bằng mang giống cá. Khi lớn thành ếch mới thở bằng phổi.' },
        { q: 'Chân nào của nòng nọc mọc ra trước?', a: ['Chân sau', 'Chân trước', 'Cả bốn chân cùng lúc', 'Không mọc chân'], why: 'Chân sau mọc trước, vài tuần sau chân trước mới mọc.' },
        { q: 'Đuôi nòng nọc đi đâu khi thành ếch?', a: ['Ngắn dần và tiêu vào cơ thể', 'Bị rụng mất', 'Bị cá ăn', 'Biến thành chân'], why: 'Cơ thể hấp thụ đuôi dần dần, dùng làm chất dinh dưỡng.' },
        { q: 'Ếch trưởng thành ăn gì?', a: ['Côn trùng như ruồi, muỗi', 'Cỏ', 'Tảo', 'Hạt lúa'], why: 'Ếch dùng chiếc lưỡi dài và dính để bắt côn trùng.' },
        { q: 'Vì sao ếch có ích cho nhà nông?', a: ['Ếch ăn sâu bọ hại lúa', 'Ếch cày ruộng', 'Ếch tưới nước', 'Ếch ăn cỏ dại'], why: 'Ếch ăn rất nhiều sâu bọ, giúp bảo vệ ruộng lúa.' }
      ],
      en: [
        { q: 'Where do frogs usually lay eggs?', a: ['In water', 'High in trees', 'In dry burrows', 'In bird nests'], why: 'Most frogs lay eggs in ponds, lakes or rice fields because tadpoles must live in water.' },
        { q: 'How does a tadpole breathe?', a: ['With gills', 'With lungs', 'Through its nose like us', 'With its tail'], why: 'Tadpoles breathe with gills like fish. Grown frogs use lungs.' },
        { q: 'Which legs grow first?', a: ['Back legs', 'Front legs', 'All four at once', 'No legs'], why: 'The back legs come first; the front legs appear a few weeks later.' },
        { q: 'What happens to the tadpole’s tail?', a: ['It shrinks and is absorbed', 'It falls off', 'A fish eats it', 'It becomes legs'], why: 'The body slowly absorbs the tail and uses it as food.' },
        { q: 'What do adult frogs eat?', a: ['Insects like flies and mosquitoes', 'Grass', 'Algae', 'Rice grains'], why: 'Frogs catch insects with a long sticky tongue.' },
        { q: 'Why are frogs good for farmers?', a: ['They eat pests that harm rice', 'They plough fields', 'They water crops', 'They eat weeds'], why: 'Frogs eat lots of insect pests and help protect rice fields.' }
      ]
    });

    /* =====================================================================
       3. CÂY ĐẬU XANH LỚN LÊN
       Thí nghiệm: không tưới / vừa đủ / ngập nước, có hoặc không có ánh sáng.
       ===================================================================== */
    let plWater = 'ok', plLight = true;
    function iconSeed(c, x, y, r) { c.fillStyle = '#65a30d'; c.beginPath(); c.ellipse(x, y, r * .5, r * .34, -.3, 0, TAU); c.fill(); c.fillStyle = '#fef9c3'; c.beginPath(); c.ellipse(x - r * .05, y - r * .05, r * .12, r * .05, -.3, 0, TAU); c.fill(); }
    const PL_STAGES = [
      { from: 0, emo: '🫘', icon: iconSeed,
        vi: { name: 'Hạt', time: 'Ngày 0 – 1', look: 'Hạt đậu hút nước nên trương to lên.', need: 'Cần nước, không khí và hơi ấm để nảy mầm.', fun: 'Trong mỗi hạt có sẵn một cây con tí hon và thức ăn dự trữ cho nó.', hud: 'Hạt hút nước, trương to lên' },
        en: { name: 'Seed', time: 'Days 0 – 1', look: 'The bean soaks up water and swells.', need: 'Water, air and warmth to sprout.', fun: 'Every seed holds a tiny baby plant plus a packed lunch for it.', hud: 'The seed soaks up water and swells' } },
      { from: 1, emo: '🌰', icon: (c, x, y, r) => { iconSeed(c, x, y - r * .3, r * .9); c.strokeStyle = '#fef3c7'; c.lineWidth = r * .14; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y - r * .1); c.quadraticCurveTo(x + r * .1, y + r * .3, x, y + r * .7); c.stroke(); },
        vi: { name: 'Nảy mầm', short: 'Nảy mầm', time: 'Ngày 1 – 3', look: 'Vỏ hạt nứt ra. Rễ mầm mọc ra đầu tiên và đâm xuống đất.', need: 'Rễ giữ cây đứng vững và hút nước.', fun: 'Dù hạt nằm theo hướng nào, rễ cũng luôn tìm đường mọc xuống dưới.', hud: 'Rễ mầm mọc ra và đâm xuống đất' },
        en: { name: 'Sprouting', time: 'Days 1 – 3', look: 'The seed coat splits. The first root comes out and grows down.', need: 'The root anchors the plant and drinks water.', fun: 'Whichever way the seed lies, the root always finds its way down.', hud: 'The first root pushes down into the soil' } },
      { from: 3, emo: '🌱', icon: (c, x, y, r) => { c.strokeStyle = '#65a30d'; c.lineWidth = r * .14; c.beginPath(); c.moveTo(x, y + r * .7); c.lineTo(x, y - r * .1); c.stroke(); c.fillStyle = '#84cc16'; c.beginPath(); c.ellipse(x - r * .3, y - r * .2, r * .32, r * .17, .3, 0, TAU); c.ellipse(x + r * .3, y - r * .2, r * .32, r * .17, -.3, 0, TAU); c.fill(); },
        vi: { name: 'Cây mầm', time: 'Ngày 3 – 7', look: 'Thân mầm cong cong vươn lên khỏi mặt đất rồi mở ra 2 lá mầm.', need: 'Lá mầm nuôi cây bằng thức ăn dự trữ có sẵn trong hạt.', fun: 'Giá đỗ chính là cây mầm đậu xanh được ủ trong tối!', hud: 'Cây mầm nhô lên, mở 2 lá mầm' },
        en: { name: 'Seedling', time: 'Days 3 – 7', look: 'A curved stem pushes out of the soil and opens two seed leaves.', need: 'Seed leaves feed the plant with food stored in the seed.', fun: 'Bean sprouts are mung bean seedlings grown in the dark!', hud: 'The seedling pops up and opens two seed leaves' } },
      { from: 7, emo: '🌿', icon: (c, x, y, r) => { c.strokeStyle = '#4d7c0f'; c.lineWidth = r * .12; c.beginPath(); c.moveTo(x, y + r * .8); c.lineTo(x, y - r * .6); c.stroke(); c.fillStyle = '#22c55e'; for (const [dy, sd] of [[.3, -1], [0, 1], [-.35, -1], [-.55, 1]]) { c.beginPath(); c.ellipse(x + sd * r * .3, y + dy * r, r * .3, r * .13, sd * .4, 0, TAU); c.fill(); } },
        vi: { name: 'Cây non', time: 'Ngày 7 – 30', look: 'Mọc thêm nhiều lá thật, thân cao lên, rễ lan rộng trong đất.', need: 'Cần ánh sáng: lá dùng ánh sáng Mặt Trời để làm thức ăn cho cây. Rễ hút nước và chất khoáng.', fun: 'Lá có màu xanh nhờ chất diệp lục, giúp lá "bắt" ánh sáng.', hud: 'Cây mọc lá thật và cao dần' },
        en: { short: 'Young', name: 'Young plant', time: 'Days 7 – 30', look: 'More true leaves grow, the stem gets taller and roots spread out.', need: 'Needs light: leaves use sunlight to make food. Roots drink water and minerals.', fun: 'Leaves are green because of chlorophyll, which helps them catch light.', hud: 'True leaves grow and the plant gets taller' } },
      { from: 30, emo: '🌼', icon: (c, x, y, r) => { for (let k = 0; k < 5; k++) { const a = k / 5 * TAU; c.fillStyle = '#facc15'; c.beginPath(); c.ellipse(x + Math.cos(a) * r * .32, y + Math.sin(a) * r * .32, r * .26, r * .16, a, 0, TAU); c.fill(); } c.fillStyle = '#a16207'; c.beginPath(); c.arc(x, y, r * .15, 0, TAU); c.fill(); },
        vi: { name: 'Ra hoa', time: 'Khoảng ngày 30 – 45', look: 'Những bông hoa nhỏ màu vàng mọc thành chùm.', need: 'Hoa là bộ phận tạo ra quả và hạt.', fun: 'Hoa đậu xanh tự thụ phấn được, không cần ong bướm giúp vẫn kết quả.', hud: 'Cây ra những chùm hoa vàng' },
        en: { name: 'Flowering', time: 'About days 30 – 45', look: 'Small yellow flowers grow in bunches.', need: 'Flowers are where fruit and seeds are made.', fun: 'Mung bean flowers can pollinate themselves, no bees needed.', hud: 'Bunches of yellow flowers appear' } },
      { from: 45, emo: '🫛', icon: (c, x, y, r) => { c.strokeStyle = '#1f2937'; c.lineWidth = r * .22; c.lineCap = 'round'; c.beginPath(); c.moveTo(x - r * .5, y - r * .4); c.quadraticCurveTo(x, y + r * .4, x + r * .55, y + r * .3); c.stroke(); },
        vi: { short: 'Quả', name: 'Quả và hạt', time: 'Khoảng ngày 45 – 65', look: 'Quả đậu dài ra, chuyển từ xanh sang đen khi chín.', need: 'Mỗi quả có khoảng 10 – 15 hạt đậu mới.', fun: 'Hạt rơi xuống đất, gặp nước lại nảy mầm: vòng đời bắt đầu lại!', hud: 'Quả đậu lớn dần rồi chín đen' },
        en: { short: 'Pods', name: 'Pods and seeds', time: 'About days 45 – 65', look: 'Pods grow long and turn from green to black when ripe.', need: 'Each pod holds about 10 – 15 new beans.', fun: 'Seeds drop to the ground, get wet and sprout: the cycle starts again!', hud: 'Pods grow and ripen to black' } }
    ];
    PL_STAGES[0].emo = '🟢'; PL_STAGES[1].emo = '💧'; PL_STAGES[5].emo = '🌰';
    const plC = makeCanvas('cPl', (w) => clamp(w * .7, 320, 560));
    const plR = makeCanvas('cPlRing', (w) => clamp(w * .7, 210, 290));
    const plNote = () => {
      const d = pl ? pl.day : 0;
      if (plWater === 'dry' && d > 1.5) return { key: 'dry', text: T('Không tưới nước: hạt không nảy mầm vì thiếu nước.', 'No water: the seed cannot sprout.'), short: T('Hạt không nảy mầm vì thiếu nước', 'No water, no sprouting') };
      if (plWater === 'flood' && d > 1.5) return { key: 'flood', text: T('Ngập nước: hạt thiếu không khí nên không nảy mầm, lâu ngày còn bị thối.', 'Flooded: the seed gets no air, so it cannot sprout and may rot.'), short: T('Hạt thiếu không khí nên không nảy mầm', 'No air, no sprouting') };
      if (!plLight && plWater === 'ok' && d > 4) return { key: 'dark', text: T('Không có ánh sáng: cây mầm mọc dài, trắng vàng, không có lá xanh. Cây không tự làm được thức ăn nên yếu dần.', 'No light: the seedling grows tall and pale with no green leaves. It cannot make food, so it weakens.'), short: T('Cây trong tối mọc dài, trắng vàng rồi yếu dần', 'In the dark it grows tall, pale and weak') };
      return null;
    };
    var pl = lifeTab({
      prefix: 'pl', stages: PL_STAGES, max: 65, loop: true,
      rate: (d) => (d < 8 ? 1.1 : 2.6),
      dayText: (d) => T(`Ngày ${Math.floor(d) + 1}`, `Day ${Math.floor(d) + 1}`),
      needLabel: () => T('Cần gì?', 'What it needs'),
      cap: () => (plWater !== 'ok' ? 0 : !plLight ? 2 : 99),
      note: plNote
    });
    function plGeom() { const w = plC.w || 640, h = plC.h || 450; return { w, h, gy: h * .56, cx: w * .5, sy: h * .56 + h * .07 }; }
    function leafShape(ctx, x, y, len, ang, color) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * .5, -len * .38, len, 0); ctx.quadraticCurveTo(len * .5, len * .38, 0, 0); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,.15)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len * .9, 0); ctx.stroke();
      ctx.restore();
    }
    function drawPl() {
      const g = plGeom(), { w, h, gy, cx, sy } = g, ctx = plC.ctx, d = pl.day;
      if (!plC.w) return;
      const ok = plWater === 'ok', dark = !plLight;
      // nền trời / hộp tối
      if (dark) { ctx.fillStyle = '#1e1b3a'; ctx.fillRect(0, 0, w, gy); textLight(ctx, T('🌑 Trong hộp tối', '🌑 Inside a dark box'), 12, 18, '#c4b5fd', 12.5, 'left', 900); }
      else { const sk = ctx.createLinearGradient(0, 0, 0, gy); sk.addColorStop(0, '#7dd3fc'); sk.addColorStop(1, '#e0f2fe'); ctx.fillStyle = sk; ctx.fillRect(0, 0, w, gy); drawSun(ctx, w * .1, h * .1, h * .05, .45); }
      // đất
      const soil = ctx.createLinearGradient(0, gy, 0, h);
      soil.addColorStop(0, plWater === 'dry' ? '#d6b48a' : plWater === 'flood' ? '#5b3a1e' : '#8b5a2b'); soil.addColorStop(1, plWater === 'dry' ? '#b8915f' : '#4a2e17');
      ctx.fillStyle = soil; ctx.fillRect(0, gy, w, h - gy);
      ctx.fillStyle = 'rgba(0,0,0,.15)'; for (let k = 0; k < 40; k++) { const x = (k * 97) % w, y = gy + 8 + ((k * 53) % (h - gy - 12)); ctx.beginPath(); ctx.arc(x, y, 1.5 + (k % 3), 0, TAU); ctx.fill(); }
      if (plWater === 'dry') { ctx.strokeStyle = 'rgba(90,60,30,.6)'; ctx.lineWidth = 1.5; for (let k = 0; k < 6; k++) { const x = w * (.1 + k * .16); ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + 6, gy + 12); ctx.lineTo(x - 2, gy + 24); ctx.stroke(); } }
      if (plWater === 'flood') { ctx.fillStyle = 'rgba(56,189,248,.45)'; ctx.fillRect(0, gy - h * .05, w, h * .05 + (h - gy)); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.moveTo(0, gy - h * .05); ctx.lineTo(w, gy - h * .05); ctx.stroke(); }
      textLight(ctx, T('Đất (nhìn cắt ngang)', 'Soil (cut-away view)'), w - 10, h - 12, 'rgba(255,255,255,.75)', 11, 'right', 800);

      // hạt
      const sprouted = ok && d >= 1;
      const swell = plWater === 'dry' ? 1 : 1 + .2 * ease(span(d, 0, 1));
      const rot = plWater === 'flood' ? ease(span(d, 4, 10)) : 0;
      const sr = h * .03 * swell;
      const seedFade = ok && !dark ? 1 - ease(span(d, 12, 20)) : 1;
      // rễ
      if (sprouted) {
        const rootLen = ease(span(d, 1, 3)) * h * .1 + ease(span(d, 3, 30)) * h * (dark ? .08 : .25);
        ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = 3; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(cx, sy + sr * .5);
        for (let k = 1; k <= 10; k++) ctx.lineTo(cx + Math.sin(k * 1.3) * 3, sy + sr * .5 + rootLen * k / 10);
        ctx.stroke();
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 6; i++) {
          const ll = ease(span(d, 8 + i * 2, 22 + i * 2)) * h * .07 * (dark ? .3 : 1);
          if (ll <= 0) continue;
          const yy = sy + sr + rootLen * (.25 + i * .11), sd = i % 2 ? 1 : -1;
          ctx.beginPath(); ctx.moveTo(cx, yy); ctx.quadraticCurveTo(cx + sd * ll * .6, yy + ll * .2, cx + sd * ll, yy + ll * .55); ctx.stroke();
        }
        if (rootLen > h * .05) textLight(ctx, T('Rễ', 'Root'), cx + 14, sy + rootLen * .8, '#fef3c7', 11.5, 'left', 900);
      }
      // thân + lá
      let top = null;
      if (sprouted && d >= 2.5) {
        let up, hook, wilt = 0;
        if (dark) { up = ease(span(d, 2.5, 12)) * h * .44; hook = 1 - ease(span(d, 4, 7)); wilt = ease(span(d, 16, 28)); }
        else { up = ease(span(d, 2.5, 5)) * h * .08 + ease(span(d, 5, 30)) * h * .3; hook = 1 - ease(span(d, 4.5, 6)); }
        const stemCol = dark ? mix('#fef3c7', '#a16207', wilt * .7) : '#65a30d';
        const tx = cx + hook * h * .03 + wilt * h * .16, ty = gy - up + hook * h * .03 + wilt * h * .12;
        ctx.strokeStyle = stemCol; ctx.lineWidth = dark ? 2.5 : 3 + ease(span(d, 7, 40)) * 2.5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(cx, sy - sr * .3); ctx.quadraticCurveTo(cx - wilt * h * .02, ty + (sy - ty) * .4, tx, ty); ctx.stroke();
        top = { x: tx, y: ty };
        // lá mầm
        const open = dark ? ease(span(d, 6, 9)) * .6 : ease(span(d, 4.5, 6.5));
        const cotFade = dark ? 1 : 1 - ease(span(d, 20, 26));
        if (cotFade > .02 && up > h * .02) {
          const cl = h * .045 * (dark ? .6 : 1) * (0.6 + .4 * cotFade);
          const col = dark ? '#fde047' : mix('#84cc16', '#facc15', 1 - cotFade);
          ctx.globalAlpha = Math.min(1, cotFade + .2);
          leafShape(ctx, tx, ty, cl, -Math.PI / 2 - (.15 + open * 1.25) + wilt, col);
          leafShape(ctx, tx, ty, cl, -Math.PI / 2 + (.15 + open * 1.25) + wilt, col);
          ctx.globalAlpha = 1;
          if (!dark && d > 5 && d < 18) textLight(ctx, T('Lá mầm', 'Seed leaves'), tx + cl + 8, ty - 4, '#14532d', 11.5, 'left', 900);
        }
        if (!dark) {
          // lá thật
          const NODES = [[.45, 8], [.62, 12], [.78, 16], [.92, 21]];
          NODES.forEach(([f, day0], i) => {
            const k = ease(span(d, day0, day0 + 4)); if (k <= 0) return;
            const ny = gy - (gy - ty) * f, nx = cx + (tx - cx) * f;
            const ll = h * (.06 + i * .008) * k;
            leafShape(ctx, nx, ny, ll, -Math.PI / 2 - .9, '#22c55e');
            leafShape(ctx, nx, ny, ll, -Math.PI / 2 + .9, '#16a34a');
            if (i === 1 && d > 14 && d < 30) textLight(ctx, T('Lá thật', 'True leaves'), nx - ll - 6, ny - ll * .5, '#14532d', 11.5, 'right', 900);
          });
          // hoa & quả
          [[.62, 31, -1], [.78, 34, 1], [.92, 37, -1]].forEach(([f, day0, sd], i) => {
            const ny = gy - (gy - ty) * f, nx = cx + (tx - cx) * f, bx = nx + sd * h * .05, by = ny - h * .015;
            const fk = ease(span(d, day0, day0 + 2)) * (1 - ease(span(d, day0 + 12, day0 + 14)));
            if (fk > .02) {
              for (let p = 0; p < 5; p++) { const a = p / 5 * TAU; ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.ellipse(bx + Math.cos(a) * h * .014 * fk, by + Math.sin(a) * h * .014 * fk, h * .012 * fk, h * .007 * fk, a, 0, TAU); ctx.fill(); }
              ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.arc(bx, by, h * .005 * fk + .5, 0, TAU); ctx.fill();
              if (i === 0 && d > 32 && d < 44) textLight(ctx, T('Hoa', 'Flower'), bx + sd * h * .04, by, '#a16207', 11.5, sd > 0 ? 'left' : 'right', 900);
            }
            const pk = ease(span(d, 45 + i * 2, 51 + i * 2));
            if (pk > 0 && !(i === 0 && d > 62)) {
              const ripe = ease(span(d, 55, 61));
              ctx.strokeStyle = mix('#65a30d', '#1f2937', ripe); ctx.lineWidth = h * .014; ctx.lineCap = 'round';
              ctx.beginPath(); ctx.moveTo(nx, ny); ctx.quadraticCurveTo(nx + sd * h * .04, ny + h * .02, nx + sd * h * (.03 + .06 * pk), ny + h * .08 * pk); ctx.stroke();
              ctx.fillStyle = mix('#84cc16', '#111827', ripe);
              for (let b = 1; b <= 5; b++) { const t = b / 6, it = 1 - t; const bx2 = it * it * nx + 2 * it * t * (nx + sd * h * .04) + t * t * (nx + sd * h * (.03 + .06 * pk)), by2 = it * it * ny + 2 * it * t * (ny + h * .02) + t * t * (ny + h * .08 * pk); ctx.beginPath(); ctx.arc(bx2, by2, h * .009 * pk + .5, 0, TAU); ctx.fill(); }
              if (i === 0 && d > 50 && d < 62) textLight(ctx, T('Quả đậu', 'Pod'), nx + sd * h * .1, ny + h * .07, '#1f2937', 11.5, sd > 0 ? 'left' : 'right', 900);
            }
          });
          if (d > 62) {
            const k = ease(span(d, 62, 64));
            for (let s = 0; s < 3; s++) { const x0 = cx + (tx - cx) * .62 - h * .06, y0 = gy - (gy - ty) * .62 + h * .06; iconSeed(ctx, lerp(x0, cx - h * (.12 + s * .05), k), lerp(y0, gy + 4, k), h * .03); }
          }
          // ánh sáng & nước
          if (d >= 7) {
            ctx.save(); ctx.setLineDash([5, 6]); ctx.strokeStyle = 'rgba(250,204,21,.7)'; ctx.lineWidth = 2;
            for (const f of [.62, .92]) { const nx = cx + (tx - cx) * f - h * .05, ny = gy - (gy - ty) * f; ctx.beginPath(); ctx.moveTo(w * .14, h * .14); ctx.lineTo(nx, ny); ctx.stroke(); }
            ctx.restore();
          }
        }
        if (ok && d >= 4) {
          ctx.fillStyle = '#38bdf8';
          for (let k = 0; k < 5; k++) {
            const t = ((clock * .35 + k / 5) % 1);
            const rootBottom = sy + h * .2;
            const y = lerp(rootBottom, ty, t), x = y > sy ? cx + Math.sin(k) * 2 : lerp(cx, tx, (sy - y) / Math.max(1, sy - ty));
            ctx.beginPath(); ctx.arc(x, y, 2.4, 0, TAU); ctx.fill();
          }
        }
      }
      // vẽ hạt (che gốc thân)
      if (seedFade > .02) {
        ctx.globalAlpha = seedFade;
        ctx.fillStyle = mix(plWater === 'dry' ? '#4d7c0f' : '#65a30d', '#3f2a14', rot);
        ctx.beginPath(); ctx.ellipse(cx, sy, sr * 1.4, sr, -.25, 0, TAU); ctx.fill();
        if (sprouted) { ctx.strokeStyle = '#3f6212'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx - sr, sy - sr * .2); ctx.lineTo(cx + sr * .2, sy + sr * .4); ctx.stroke(); }
        ctx.fillStyle = '#fef9c3'; ctx.beginPath(); ctx.ellipse(cx - sr * .2, sy - sr * .2, sr * .35, sr * .12, -.25, 0, TAU); ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (plWater === 'flood') for (let k = 0; k < 3; k++) { const y = sy - ((clock * 30 + k * 20) % (h * .12)); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(cx + 10 + k * 6, y, 2.5, 0, TAU); ctx.stroke(); }
      if (seedFade > .1) textLight(ctx, T('Hạt đậu xanh', 'Mung bean'), cx - sr * 1.6 - 6, sy, '#fef3c7', 11.5, 'right', 900);
      if (!dark) textLight(ctx, T('Mặt đất', 'Ground'), 10, gy - 10, '#14532d', 11, 'left', 900);
    }
    root.querySelectorAll('[data-water]').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); plWater = b.dataset.water;
      root.querySelectorAll('[data-water]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      pl.infoKey = ''; pl.update(); dirty = true;
    }));
    $('plLight').onclick = () => {
      cancelSpeech(); plLight = !plLight; $('plLight').setAttribute('aria-pressed', String(plLight));
      pl.infoKey = ''; pl.update(); dirty = true;
    };

    const qPl = makeQuiz($('qPl'), {
      vi: [
        { q: 'Khi hạt nảy mầm, bộ phận nào mọc ra đầu tiên?', a: ['Rễ', 'Lá', 'Hoa', 'Quả'], why: 'Rễ mầm mọc ra trước để giữ cây và hút nước, sau đó thân mầm mới vươn lên.' },
        { q: 'Hạt cần gì để nảy mầm?', a: ['Nước, không khí và hơi ấm', 'Chỉ cần ánh sáng', 'Chỉ cần phân bón', 'Không cần gì cả'], why: 'Hạt nảy mầm được trong tối, nhưng phải có nước, không khí và nhiệt độ thích hợp.' },
        { q: 'Vì sao để hạt ngập trong nước lâu thì hạt không nảy mầm?', a: ['Vì hạt thiếu không khí', 'Vì thừa ánh sáng', 'Vì nước quá ngọt', 'Vì hạt quá no'], why: 'Hạt cũng cần "thở". Ngập nước lâu, hạt thiếu không khí và có thể bị thối.' },
        { q: 'Vì sao giá đỗ có màu trắng?', a: ['Vì được ủ trong tối, không có ánh sáng', 'Vì được tưới sữa', 'Vì là giống đậu trắng', 'Vì bị bệnh'], why: 'Không có ánh sáng, cây mầm không tạo được màu xanh nên trắng vàng và mọc dài.' },
        { q: 'Cây cần ánh sáng để làm gì?', a: ['Lá dùng ánh sáng để làm thức ăn cho cây', 'Để cây đi ngủ', 'Để rễ dài ra', 'Để đuổi sâu'], why: 'Lá xanh dùng ánh sáng Mặt Trời, nước và không khí để tạo thức ăn nuôi cây.' },
        { q: 'Bộ phận nào của cây đậu tạo ra quả và hạt mới?', a: ['Hoa', 'Rễ', 'Thân', 'Lá mầm'], why: 'Hoa tàn đi thì quả đậu lớn lên, bên trong có hạt mới.' }
      ],
      en: [
        { q: 'When a seed sprouts, what comes out first?', a: ['The root', 'A leaf', 'A flower', 'A pod'], why: 'The root comes first to anchor the plant and drink water; then the stem rises.' },
        { q: 'What does a seed need to sprout?', a: ['Water, air and warmth', 'Only light', 'Only fertiliser', 'Nothing'], why: 'Seeds can sprout in the dark, but they need water, air and the right temperature.' },
        { q: 'Why won’t a seed sprout if it stays under water?', a: ['It gets no air', 'Too much light', 'The water is too sweet', 'It is too full'], why: 'Seeds need to “breathe” too. Under water too long they get no air and may rot.' },
        { q: 'Why are bean sprouts white?', a: ['They grow in the dark', 'They are watered with milk', 'They are a white bean', 'They are sick'], why: 'Without light the seedling can’t turn green, so it grows long and pale.' },
        { q: 'What do plants need light for?', a: ['Leaves use it to make food', 'To fall asleep', 'To grow longer roots', 'To scare bugs'], why: 'Green leaves use sunlight, water and air to make food for the plant.' },
        { q: 'Which part makes new pods and seeds?', a: ['The flower', 'The root', 'The stem', 'The seed leaves'], why: 'After a flower fades, a pod grows in its place with new seeds inside.' }
      ]
    });

    /* ---------- tabs & vòng lặp ---------- */
    const TABS = {
      bf: { t: bf, draw: drawBf, ring: bfR, stages: BF_STAGES },
      fr: { t: fr, draw: drawFr, ring: frR, stages: FR_STAGES },
      pl: { t: pl, draw: drawPl, ring: plR, stages: PL_STAGES }
    };
    const ALL_CANVAS = [bfC, bfR, frC, frR, plC, plR];
    let tab = 'bf';
    root.querySelectorAll('.life-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.life-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('l-' + x.dataset.p).classList.toggle('hidden', x !== b); });
      ALL_CANVAS.forEach((o) => o.fit()); dirty = true;
    }));
    let last = performance.now();
    function loop(now) {
      const dt = Math.max(0, Math.min(.1, (now - last) / 1000)); last = now; clock += dt;
      const cur = TABS[tab];
      cur.t.step(dt);
      cur.draw();
      drawRing(cur.ring, cur.stages, cur.t.stageIndex(), cur.t.cfg.dayText(cur.t.day).split(' (')[0]);
      dirty = false;
      if (!destroyed) rafId = window.requestAnimationFrame(loop);
    }

    function refreshTexts() {
      applyStatic();
      Object.values(TABS).forEach((x) => x.t.refresh());
      [qBf, qFr, qPl].forEach((q) => q.refresh());
      dirty = true;
    }
    function setLang(l) {
      lang = l === 'en' ? 'en' : 'vi';
      root.querySelectorAll('.life-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.life-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.life-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    ALL_CANVAS.forEach((o) => o.fit());
    refreshTexts();

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
