/* Epsilon Edu - Tool: Nhung phat minh thay doi the gioi (Inventions): banh xe, giay, la ban, bong den, dien thoai
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.inventions = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "inventions";
  let activeCleanup = null;

  const CSS = `
.inv-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.inv-tool *{box-sizing:border-box}.inv-tool button,.inv-tool input{font:inherit}.inv-tool button{cursor:pointer}.inv-tool .hidden{display:none!important}
.inv-tool button:focus-visible,.inv-tool canvas:focus-visible,.inv-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.inv-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.inv-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.inv-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.inv-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.inv-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.inv-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.inv-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.inv-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.inv-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.inv-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.inv-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.inv-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.inv-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.inv-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.inv-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.inv-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.inv-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.inv-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.inv-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.inv-panel{width:100%}.inv-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.inv-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.inv-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.inv-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.inv-tool .card-head.compact{margin-bottom:9px}
.inv-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.inv-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.inv-tool .btn,.inv-tool .soft-btn,.inv-tool .segmented button,.inv-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.inv-tool .btn:hover,.inv-tool .soft-btn:hover,.inv-tool .segmented button:hover,.inv-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.inv-tool .btn{padding:0 12px}.inv-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.inv-tool .segmented{display:flex;gap:7px;margin:0}.inv-tool .segmented button{padding:0 13px}
.inv-tool .segmented button[aria-pressed="true"],.inv-tool .soft-btn[aria-pressed="true"],.inv-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.inv-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.inv-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.inv-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.inv-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.inv-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.inv-tool .range-control input{width:100%;accent-color:#8b5cf6}.inv-tool .range-control b{color:#7c3aed;font-size:13px}
.inv-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.inv-tool .soft-btn{padding:0 12px}
.inv-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.inv-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.inv-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.inv-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.inv-tool .info-title{display:flex;align-items:center;gap:10px}.inv-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.inv-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.inv-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.inv-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.inv-tool .facts{display:grid;gap:6px;margin-top:10px}.inv-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.inv-tool .facts b{color:#7c3aed;font-size:13.5px}.inv-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.inv-tool .fun,.inv-tool .warn,.inv-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.inv-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.inv-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.inv-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.inv-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.inv-tool .state-big.up{color:#0f766e}.inv-tool .state-big.down{color:#b45309}
.inv-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.inv-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.inv-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.inv-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.inv-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.inv-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.inv-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.inv-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.inv-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.inv-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.inv-tool .qopt:hover{filter:brightness(.985)}.inv-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.inv-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.inv-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.inv-tool .qfb,.inv-tool .score{font-size:13px;font-weight:900}.inv-tool .qfb.ok{color:#15803d}.inv-tool .qfb.no{color:#be123c}.inv-tool .score{color:#7c3aed}
.inv-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.inv-grid{grid-template-columns:1fr;align-items:start}.inv-side{grid-template-rows:auto auto;height:auto}.inv-tool .control-grid{grid-template-columns:1fr}.inv-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.inv-hero{flex-wrap:wrap;padding:12px}.inv-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.inv-tabs{grid-template-columns:1fr}.inv-tabs .tab{min-height:40px}.inv-card{padding:11px;border-radius:18px}.inv-tool .card-head{align-items:flex-start;flex-direction:column}.inv-tool .head-actions{width:100%;justify-content:space-between}.inv-tool .head-actions .segmented{flex:1;min-width:0}.inv-tool .head-actions .segmented button{flex:1;padding:0 8px}.inv-tool .qopts{grid-template-columns:1fr}.inv-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.inv-tool *{transition:none!important}}

.inv-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.inv-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.inv-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.inv-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.inv-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.inv-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.inv-tool .checklist{display:grid;gap:6px;margin-top:10px}
.inv-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.inv-tool .checklist .ok{color:#15803d}.inv-tool .checklist .no{color:#be123c}.inv-tool .checklist .wait{color:#94a3b8}
.inv-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.inv-tool .process span{flex:1}.inv-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.inv-tool .process .on{color:#0284c7}.inv-tool .process i.on{color:#ec4899}
@media(max-width:640px){.inv-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.inv-tool .slider-pair{grid-template-columns:1fr}}

.inv-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.inv-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.inv-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.inv-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.inv-tabs{grid-template-columns:repeat(5,minmax(0,1fr))}
@media(max-width:640px){.inv-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="inv-tool" data-tool-root>
  <div class="inv-hero">
    <div class="inv-hero-icon" aria-hidden="true">💡</div>
    <div>
      <p class="inv-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="inv-lead" data-t="lead"></p>
    </div>
    <div class="inv-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="iAudioNotice" class="inv-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="inv-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="wh" data-t="tab_wh"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="pa" data-t="tab_pa"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="cp" data-t="tab_cp"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="lb" data-t="tab_lb"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="ph" data-t="tab_ph"></button>
  </div>
  <section id="i-wh" class="inv-panel" role="tabpanel">
    <div class="inv-grid">
      <article class="inv-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_wh"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="modeL"><button type="button" data-wmode="drag" aria-pressed="true" data-t="mDrag"></button><button type="button" data-wmode="roll" aria-pressed="false" data-t="mRoll"></button><button type="button" data-wmode="wheel" aria-pressed="false" data-t="mWheel"></button></div><button id="whPull" class="btn main" type="button" data-t="pull"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_wh" role="img" data-ta="cv_wh"></canvas></div>
        <p id="hud_wh" class="hud" aria-live="polite"></p>
      </article>
      <div class="inv-side">
        <aside class="inv-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_wh"></span><h2 data-t="sh_wh"></h2></div></div>
          
          <div id="info_wh" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_wh" class="inv-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="i-pa" class="inv-panel hidden" role="tabpanel">
    <div class="inv-grid">
      <article class="inv-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_pa"></h2></div>
          <div class="head-actions"><button id="paPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_pa" role="img" data-ta="cv_pa"></canvas></div>
        <p id="hud_pa" class="hud" aria-live="polite"></p>
        <div id="paSteps" class="stage-row" role="group" data-ta="stepsL"></div>
      </article>
      <div class="inv-side">
        <aside class="inv-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_pa"></span><h2 data-t="sh_pa"></h2></div></div>
          
          <div id="info_pa" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_pa" class="inv-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="i-cp" class="inv-panel hidden" role="tabpanel">
    <div class="inv-grid">
      <article class="inv-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_cp"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_cp" role="img" data-ta="cv_cp"></canvas></div>
        <p id="hud_cp" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="headL"></span><input id="cpHead" type="range" min="0" max="359" value="40" step="1"></label>
        <div class="toggle-row" style="justify-content:flex-start;margin-top:8px"><button id="cpMag" class="soft-btn" type="button" aria-pressed="false" data-t="magnet"></button></div>
      </article>
      <div class="inv-side">
        <aside class="inv-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_cp"></span><h2 data-t="sh_cp"></h2></div></div>
          <div class="canvas-wrap"><canvas id="c_earth" role="img" aria-hidden="true"></canvas></div>
          <div id="info_cp" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_cp" class="inv-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="i-lb" class="inv-panel hidden" role="tabpanel">
    <div class="inv-grid">
      <article class="inv-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_lb"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="bulbL"><button type="button" data-bulb="inc" aria-pressed="true" data-t="bInc"></button><button type="button" data-bulb="led" aria-pressed="false" data-t="bLed"></button></div><button id="lbSw" class="btn main" type="button" data-t="sw"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_lb" role="img" data-ta="cv_lb"></canvas></div>
        <p id="hud_lb" class="hud" aria-live="polite"></p>
      </article>
      <div class="inv-side">
        <aside class="inv-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_lb"></span><h2 data-t="sh_lb"></h2></div></div>
          
          <div id="info_lb" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_lb" class="inv-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="i-ph" class="inv-panel hidden" role="tabpanel">
    <div class="inv-grid">
      <article class="inv-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_ph"></h2></div>
          <div class="head-actions"><button id="phTaut" class="soft-btn" type="button" aria-pressed="true" data-t="taut"></button><button id="phTalk" class="btn main" type="button" data-t="talk"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_ph" role="img" data-ta="cv_ph"></canvas></div>
        <p id="hud_ph" class="hud" aria-live="polite"></p>
      </article>
      <div class="inv-side">
        <aside class="inv-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_ph"></span><h2 data-t="sh_ph"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_evo" role="img" aria-hidden="true"></canvas></div>
          <div id="info_ph" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_ph" class="inv-card quiz-card"></article>
      </div>
    </div>
  </section>
</section>`;

  function render(context = {}) {
    if (activeCleanup) { try { activeCleanup(); } catch (_) {} activeCleanup = null; }
    const host = context.host;
    if (!(host instanceof Element)) return;
    host.innerHTML = `<style>${CSS}</style>${HTML}`;
    const root = host.querySelector("[data-tool-root]");
    if (!root) return;
    activeCleanup = initTool(root, context);
  }

  function destroy() {
    if (!activeCleanup) return;
    try { activeCleanup(); } catch (_) {}
    activeCleanup = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[TOOL_ID] = Object.freeze({ render, destroy });

  function initTool(root, context) {
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
    let dirty = true, clock = 0;
    const CANVASES = [], QUIZZES = [], TABS = {};

    /* ---------- giọng đọc: luôn dùng Google TTS cho cả tiếng Việt và tiếng Anh (giống các tool Class 1) ---------- */
    // Google Translate TTS, matching the approved Class 1 tools in both languages.
    // It does not expose a verified fixed female/US voice ID.
    const googleTtsUrl = (text, language) =>
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=${language === 'en' ? 'en' : 'vi'}&client=tw-ob&q=${encodeURIComponent(text)}`;
    let audio = null, speechVersion = 0, lastSpeech = null;
    const audioNotice = $('iAudioNotice');
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
      if (!c) throw new Error(`TOOL_CANVAS_MISSING:${id}`);
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

    const mk = (id, ratio, cb) => { const o = makeCanvas(id, ratio, cb); CANVASES.push(o); return o; };
    function applyStatic() {
      const k = lang === 'en' ? 1 : 0;
      root.querySelectorAll('[data-t]').forEach((el) => { const s = STR[el.dataset.t]; if (s) el.textContent = s[k]; });
      root.querySelectorAll('[data-ta]').forEach((el) => { const s = STR[el.dataset.ta]; if (s) el.setAttribute('aria-label', s[k]); });
      root.setAttribute('lang', lang);
    }
    function textLight(ctx, text, x, y, color = '#334155', size = 12, align = 'center', weight = 800) {
      ctx.font = `${weight} ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(text, x, y);
    }
    function bubble(ctx, text, x, y, size = 12, bg = '#fff', fg = '#be185d') {
      ctx.font = `900 ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      const tw = ctx.measureText(text).width + 16, th = size + 10;
      const cw = ctx.canvas.width / ((ctx.getTransform && ctx.getTransform().a) || 1);
      x = clamp(x, tw / 2 + 2, cw - tw / 2 - 2);
      ctx.fillStyle = bg; ctx.strokeStyle = 'rgba(236,72,153,.5)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x - tw / 2, y - th / 2, tw, th, th / 2); else ctx.rect(x - tw / 2, y - th / 2, tw, th);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y + .5);
    }
    function rr(ctx, x, y, w, h, r) { ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h); }
    // khung thông tin chuẩn: tiêu đề, các dòng, ghi chú; nút Nghe đọc toàn bộ
    function infoBox(el, o) {
      el.innerHTML = `
        <div class="info-title">${o.emo ? `<span class="emo" aria-hidden="true">${o.emo}</span>` : ''}
          <div><h3></h3>${o.sub != null ? '<p class="sub"></p>' : ''}</div>
          <button class="btn" type="button" data-listen>🔊 ${T('Nghe', 'Listen')}</button></div>
        ${o.rows && o.rows.length ? `<div class="facts">${o.rows.map(() => '<div><b></b><span></span></div>').join('')}</div>` : ''}
        ${(o.notes || []).map((n) => `<p class="${n[0]}"></p>`).join('')}`;
      el.querySelector('h3').textContent = o.title;
      if (o.sub != null) el.querySelector('.sub').textContent = o.sub;
      const rows = el.querySelectorAll('.facts > div');
      (o.rows || []).forEach((r, i) => { rows[i].querySelector('b').textContent = r[0]; rows[i].querySelector('span').textContent = r[1]; });
      const ps = el.querySelectorAll(':scope > p');
      (o.notes || []).forEach((n, i) => { ps[i].textContent = n[1]; });
      el.querySelector('[data-listen]').onclick = () => {
        speak([o.title, o.sub || '', ...(o.rows || []).map((r) => `${r[0]}: ${r[1]}`), ...(o.notes || []).map((n) => n[1])].filter(Boolean).join('. ').replace(/[✨⚠️💡🎉📍🔥❄️☀️🌧️🌬️]/gu, ''));
      };
    }
    const setText = (id, t) => { const el = $(id); if (el && el.textContent !== t) el.textContent = t; };
    const pressGroup = (sel, attr, val) => root.querySelectorAll(sel).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[attr] === String(val))));

    const STR = {
      kicker: ['Epsilon Edu · Khoa học và lịch sử', 'Epsilon Edu · Science and history'],
      title: ['Những phát minh thay đổi thế giới', 'Inventions That Changed the World'],
      lead: ['Tự tay thử bánh xe, làm giấy, dùng la bàn, bật bóng đèn và gọi điện thoại cốc giấy để hiểu vì sao chúng quan trọng đến vậy.', 'Try a wheel, make paper, steer by compass, switch on a bulb and call on a cup phone to see why these inventions matter so much.'],
      tabsLabel: ['Các phát minh', 'Inventions'], eyeSim: ['Thử nghiệm', 'Try it'],
      tab_wh: ['🚲 Bánh xe', '🚲 Wheel'], h_wh: ['Kéo tảng đá nặng', 'Moving a heavy stone'], cv_wh: ['So sánh kéo lê, lăn trên khúc gỗ và dùng xe có bánh', 'Comparing dragging, rolling on logs and using a wheeled cart'],
      se_wh: ['Tìm hiểu', 'Learn'], sh_wh: ['Bánh xe ra đời', 'The first wheels'],
      tab_pa: ['📜 Giấy', '📜 Paper'], h_pa: ['Làm giấy dó thủ công', 'Making paper by hand'], cv_pa: ['Các bước làm giấy từ vỏ cây', 'The steps of making paper from tree bark'],
      se_pa: ['Tìm hiểu', 'Learn'], sh_pa: ['Từ vỏ cây thành trang giấy', 'From bark to page'],
      tab_cp: ['🧭 La bàn', '🧭 Compass'], h_cp: ['Kim la bàn luôn chỉ hướng Bắc', 'The needle always points north'], cv_cp: ['Con thuyền đổi hướng, kim la bàn vẫn chỉ Bắc', 'The ship turns but the compass needle keeps pointing north'],
      se_cp: ['Trái Đất là nam châm', 'Earth is a magnet'], sh_cp: ['Vì sao kim chỉ Bắc?', 'Why does it point north?'],
      tab_lb: ['💡 Bóng đèn', '💡 Light bulb'], h_lb: ['Bật đèn: điện thành ánh sáng', 'Switch on: electricity becomes light'], cv_lb: ['Mạch điện có pin, công tắc và bóng đèn', 'A circuit with a battery, a switch and a bulb'],
      se_lb: ['Tìm hiểu', 'Learn'], sh_lb: ['Ánh sáng ban đêm', 'Light at night'],
      tab_ph: ['☎️ Điện thoại', '☎️ Telephone'], h_ph: ['Điện thoại cốc giấy', 'The cup-and-string phone'], cv_ph: ['Hai bạn nói chuyện qua sợi dây căng giữa hai cốc giấy', 'Two children talk through a string stretched between two cups'],
      se_ph: ['Ngày ấy, bây giờ', 'Then and now'], sh_ph: ['Điện thoại thay đổi thế nào?', 'How phones changed'],
      modeL: ['Cách di chuyển', 'How to move it'], mDrag: ['🪨 Kéo lê', '🪨 Drag'], mRoll: ['🪵 Khúc gỗ lăn', '🪵 Log rollers'], mWheel: ['🛒 Xe có bánh', '🛒 Wheeled cart'], pull: ['💪 Kéo!', '💪 Pull!'],
      stepsL: ['Các bước làm giấy', 'Paper-making steps'], headL: ['Kéo để đổi hướng con thuyền', 'Drag to turn the ship'], magnet: ['🧲 Đưa nam châm lại gần', '🧲 Bring a magnet close'],
      sw: ['🔌 Bật / tắt công tắc', '🔌 Switch on / off'], bulbL: ['Loại bóng', 'Bulb type'], bInc: ['Sợi đốt', 'Filament'], bLed: ['LED', 'LED'],
      talk: ['📢 Nói "A lô!"', '📢 Say “Hello!”'], taut: ['🧵 Căng dây', '🧵 Pull string tight']
    };
    const playLbl = (on) => (on ? T('⏸ Tạm dừng', '⏸ Pause') : T('▶ Chạy', '▶ Play'));
    function stick(ctx, x, y, s, phase, lean = .25) {
      ctx.strokeStyle = '#334155'; ctx.lineWidth = Math.max(2, s * .08); ctx.lineCap = 'round';
      const hip = { x, y: y - s * .45 }, neck = { x: x + s * lean * .5, y: y - s * .85 };
      ctx.beginPath(); ctx.arc(neck.x + s * .05, neck.y - s * .13, s * .12, 0, TAU); ctx.fillStyle = '#fde7d4'; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hip.x, hip.y); ctx.lineTo(neck.x, neck.y);
      const a = Math.sin(phase) * .5;
      ctx.moveTo(hip.x, hip.y); ctx.lineTo(x + Math.sin(a) * s * .3, y); ctx.moveTo(hip.x, hip.y); ctx.lineTo(x - Math.sin(a) * s * .3, y);
      ctx.moveTo(neck.x, neck.y + s * .08); ctx.lineTo(neck.x + s * .35, neck.y + s * .2); ctx.stroke();
    }

    /* =====================================================================
       1. BÁNH XE
       ===================================================================== */
    const WMODE = { drag: { force: 100, people: 5, speed: .05 }, roll: { force: 30, people: 2, speed: .1 }, wheel: { force: 12, people: 1, speed: .16 } };
    let wh = { mode: 'drag', x: 0, pulling: false, infoKey: '' };
    const whC = mk('c_wh', (w) => clamp(w * .5, 250, 420));
    function drawWh(dt) {
      const { w, h, ctx } = whC;
      if (!w) return;
      const M = WMODE[wh.mode];
      if (wh.pulling) { wh.x += dt * M.speed; if (wh.x > .55) { wh.x = .55; wh.pulling = false; } }
      ctx.fillStyle = '#fef9c3'; ctx.fillRect(0, 0, w, h);
      const gy = h * .78; ctx.fillStyle = '#d6b48a'; ctx.fillRect(0, gy, w, h - gy);
      ctx.fillStyle = 'rgba(120,53,15,.2)'; for (let k = 0; k < 30; k++) ctx.fillRect((k * 53) % w, gy + 6 + (k * 17) % (h - gy - 10), 3, 2);
      const bw = w * .16, bh = h * .2, bx = w * .1 + wh.x * w, phase = wh.pulling ? clock * 8 : 0;
      let by = gy - bh;
      if (wh.mode === 'roll') {
        by -= h * .06; ctx.fillStyle = '#92400e';
        for (let k = 0; k < 3; k++) { const lx = bx + bw * (.15 + k * .35) - (wh.x * w) % (bw * .35); ctx.beginPath(); ctx.arc(lx, gy - h * .03, h * .03, 0, TAU); ctx.fill(); ctx.strokeStyle = '#78350f'; ctx.beginPath(); ctx.moveTo(lx, gy - h * .03); ctx.lineTo(lx + Math.cos(wh.x * 60) * h * .03, gy - h * .03 + Math.sin(wh.x * 60) * h * .03); ctx.stroke(); }
      } else if (wh.mode === 'wheel') {
        by -= h * .1; ctx.fillStyle = '#a16207'; ctx.fillRect(bx - 6, by + bh, bw + 12, h * .03);
        for (const k of [.18, .82]) { const cx = bx + bw * k, cy = gy - h * .05; ctx.fillStyle = '#57534e'; ctx.beginPath(); ctx.arc(cx, cy, h * .05, 0, TAU); ctx.fill(); ctx.strokeStyle = '#d6d3d1'; ctx.lineWidth = 2; for (let s = 0; s < 4; s++) { const a = s * Math.PI / 2 + wh.x * 30; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * h * .045, cy + Math.sin(a) * h * .045); ctx.stroke(); } }
      } else if (wh.pulling) { ctx.fillStyle = 'rgba(214,180,138,.8)'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(bx - k * 8 - Math.random() * 4, gy - 4 - Math.random() * 8, 4, 0, TAU); ctx.fill(); } }
      ctx.fillStyle = '#78716c'; rr(ctx, bx, by, bw, bh, 8); ctx.fill(); ctx.fillStyle = '#a8a29e'; ctx.fillRect(bx + bw * .15, by + bh * .2, bw * .3, bh * .15);
      textLight(ctx, T('Tảng đá nặng', 'Heavy stone'), bx + bw / 2, by - 10, '#44403c', 11.5, 'center', 900);
      const ropeEnd = { x: bx + bw, y: by + bh * .5 };
      const ppl = M.people, s = h * .24;
      ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ropeEnd.x, ropeEnd.y); ctx.lineTo(ropeEnd.x + w * (.08 + ppl * .065), gy - s * .7); ctx.stroke();
      for (let i = 0; i < ppl; i++) stick(ctx, ropeEnd.x + w * (.09 + i * .065), gy, s, phase + i, wh.pulling ? .45 : .2);
      // thước sức kéo
      ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, w - 150, 10, 140, 44, 10); ctx.fill();
      textLight(ctx, T('Sức kéo cần', 'Pulling force'), w - 142, 22, '#334155', 11, 'left', 900);
      ctx.fillStyle = '#e5e7eb'; ctx.fillRect(w - 142, 34, 124, 10); ctx.fillStyle = mix('#22c55e', '#ef4444', M.force / 100); ctx.fillRect(w - 142, 34, 124 * M.force / 100, 10);
      textLight(ctx, T(`Cần ${ppl} người kéo`, `Needs ${ppl} ${ppl > 1 ? 'people' : 'person'}`), 12, 18, '#334155', 12, 'left', 900);
    }
    function whInfo() {
      const key = lang + wh.mode; if (key === wh.infoKey) return; wh.infoKey = key;
      const msg = { drag: T('Kéo lê: đá cọ xát mạnh với mặt đất nên rất nặng, cần nhiều người.', 'Dragging: the stone rubs hard on the ground, so it’s very heavy work.'), roll: T('Khúc gỗ lăn: đỡ cọ xát hơn nhiều, nhưng phải liên tục chuyển khúc gỗ lên phía trước.', 'Log rollers: far less rubbing, but logs must keep being moved to the front.'), wheel: T('Xe có bánh: bánh xe lăn quanh trục nên rất nhẹ, một người kéo được.', 'Wheeled cart: wheels roll around an axle, so one person can pull it.') }[wh.mode];
      infoBox($('info_wh'), {
        emo: '🚲', title: T('Bánh xe', 'The wheel'), sub: T('Khoảng 5.500 năm trước', 'About 5,500 years ago'),
        rows: [[T('Thử nghiệm', 'Experiment'), msg], [T('Ai, ở đâu?', 'Who, where?'), T('Người xưa ở vùng Lưỡng Hà (nay thuộc I-rắc). Lúc đầu là bàn xoay để nặn gốm, sau mới lắp vào xe.', 'People in ancient Mesopotamia (today’s Iraq). It began as a potter’s wheel, then went on carts.')], [T('Thay đổi thế giới', 'Changed the world'), T('Chở hàng nặng, đi xa nhanh hơn. Ngày nay có xe đạp, ô tô, tàu hỏa, cả bánh răng trong đồng hồ.', 'Moving heavy loads and travelling faster. Today: bikes, cars, trains, even gears in clocks.')]],
        notes: [['fun', T('✨ Bánh xe lăn thay vì trượt, nên lực cản (ma sát) nhỏ hơn rất nhiều so với kéo lê.', '✨ Wheels roll instead of slide, so friction is much smaller than when dragging.')]]
      });
    }
    root.querySelectorAll('[data-wmode]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); wh.mode = b.dataset.wmode; wh.x = 0; wh.pulling = false; pressGroup('[data-wmode]', 'wmode', wh.mode); whInfo(); }));
    $('whPull').onclick = () => { cancelSpeech(); if (wh.x >= .55) wh.x = 0; wh.pulling = true; };
    TABS.wh = { frame(dt) { drawWh(dt); whInfo(); const M = WMODE[wh.mode]; setText('hud_wh', T(`💪 Sức kéo cần: ${M.force}% – ${M.people} người`, `💪 Force needed: ${M.force}% – ${M.people} ${M.people > 1 ? 'people' : 'person'}`)); }, refresh() { wh.infoKey = ''; whInfo(); } };

    /* =====================================================================
       2. GIẤY
       ===================================================================== */
    const PSTEPS = [
      { vi: ['Lấy vỏ cây dó', 'Bóc lớp vỏ của cây dó, ngâm nước cho mềm.'], en: ['Collect do bark', 'Peel the bark of the do tree and soak it soft.'] },
      { vi: ['Giã nhuyễn', 'Giã vỏ thật nhuyễn để các sợi tách nhỏ ra.'], en: ['Pound it', 'Pound the bark until the fibres come apart.'] },
      { vi: ['Khuấy thành bột giấy', 'Cho sợi vào bể nước, khuấy đều thành bột giấy lỏng.'], en: ['Make pulp', 'Stir the fibres into a vat of water to make runny pulp.'] },
      { vi: ['Vớt bằng khuôn lưới', 'Nhúng khuôn có lưới mịn vào bể, nhấc lên, một lớp sợi mỏng đọng lại.'], en: ['Scoop with a screen', 'Dip a fine mesh frame in the vat and lift; a thin layer of fibres stays on it.'] },
      { vi: ['Ép và phơi khô', 'Ép bớt nước rồi phơi nắng. Lớp sợi khô thành tờ giấy.'], en: ['Press and dry', 'Press out the water and dry it in the sun. The fibres become a sheet of paper.'] }
    ];
    let pa = { u: 0, playing: !reduceMotion, infoKey: '' };
    const paC = mk('c_pa', (w) => clamp(w * .5, 250, 420));
    function drawPa() {
      const { w, h, ctx } = paC;
      if (!w) return;
      const s = Math.min(4, Math.floor(pa.u)), t = pa.u - s;
      ctx.fillStyle = '#fefce8'; ctx.fillRect(0, 0, w, h);
      const gy = h * .85, cx = w * .5;
      ctx.fillStyle = '#e7e5e4'; ctx.fillRect(0, gy, w, h - gy);
      if (s === 0) {
        ctx.fillStyle = '#78350f'; ctx.fillRect(cx - w * .3, h * .25, w * .05, gy - h * .25);
        ctx.fillStyle = '#4d7c0f'; ctx.beginPath(); ctx.arc(cx - w * .275, h * .2, h * .14, 0, TAU); ctx.fill();
        for (let k = 0; k < 5; k++) { const y = h * (.4 + k * .07) + (t * h * .3 * (k % 2)); ctx.fillStyle = '#a16207'; rr(ctx, cx - w * .05 + k * w * .06, Math.min(gy - 10, y + t * h * .2), w * .12, 8, 4); ctx.fill(); }
        ctx.fillStyle = 'rgba(56,189,248,.5)'; rr(ctx, cx + w * .05, gy - h * .18, w * .3, h * .18, 8); ctx.fill();
      } else if (s === 1) {
        const up = Math.abs(Math.sin(clock * 6)) * h * .2;
        ctx.fillStyle = '#78350f'; rr(ctx, cx - w * .12, gy - h * .15, w * .24, h * .15, 10); ctx.fill();
        ctx.fillStyle = '#d6b48a'; ctx.beginPath(); ctx.ellipse(cx, gy - h * .15, w * .1, h * .03, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = '#a16207'; ctx.fillRect(cx - 6, h * .15 - up, 12, h * .55); ctx.beginPath(); ctx.ellipse(cx, h * .7 - up, 14, 8, 0, 0, TAU); ctx.fill();
        stick(ctx, cx + w * .16, gy, h * .45, 0, -.2);
      } else if (s === 2 || s === 3) {
        const vx = cx - w * .28, vw = w * .56, vy = gy - h * .32;
        ctx.fillStyle = '#78716c'; rr(ctx, vx, vy, vw, h * .32, 10); ctx.fill();
        ctx.fillStyle = '#e0f2fe'; rr(ctx, vx + 8, vy + 10, vw - 16, h * .32 - 18, 8); ctx.fill();
        ctx.fillStyle = 'rgba(214,180,138,.8)'; for (let k = 0; k < 60; k++) { const x = vx + 14 + ((k * 37 + (s === 2 ? clock * 40 : 0)) % (vw - 28)), y = vy + 16 + (k * 13) % (h * .32 - 30); ctx.fillRect(x, y, 6, 2); }
        if (s === 2) { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx + Math.sin(clock * 3) * w * .15, vy + h * .2); ctx.lineTo(cx + w * .1, h * .1); ctx.stroke(); }
        else { const lift = ease(t * 1.4); const fy = lerp(vy + h * .2, vy - h * .25, lift); ctx.strokeStyle = '#78350f'; ctx.lineWidth = 4; ctx.strokeRect(cx - w * .16, fy, w * .32, h * .06); ctx.strokeStyle = 'rgba(120,53,15,.4)'; ctx.lineWidth = 1; for (let k = 1; k < 10; k++) { ctx.beginPath(); ctx.moveTo(cx - w * .16 + k * w * .032, fy); ctx.lineTo(cx - w * .16 + k * w * .032, fy + h * .06); ctx.stroke(); } if (lift > .5) { ctx.fillStyle = 'rgba(254,243,199,.9)'; ctx.fillRect(cx - w * .155, fy + 3, w * .31, h * .05); } }
      } else {
        drawSun(ctx, w * .1, h * .15, h * .06, .4);
        ctx.fillStyle = '#d6d3d1'; ctx.fillRect(w * .25, h * .1, w * .6, gy - h * .1);
        for (let k = 0; k < 3; k++) { const dry = clamp(t * 1.5 - k * .2, 0, 1); ctx.fillStyle = mix('#e2d3b0', '#fffbeb', dry); ctx.fillRect(w * (.3 + k * .18), h * .2, w * .14, h * .45); ctx.strokeStyle = '#a8a29e'; ctx.strokeRect(w * (.3 + k * .18), h * .2, w * .14, h * .45); }
        if (t > .7) bubble(ctx, T('Xong! Một tờ giấy dó', 'Done! A sheet of paper'), w * .55, h * .8, 12);
      }
      PSTEPS.forEach((st, i) => { const x = w * (.1 + i * .2); ctx.fillStyle = i === s ? '#ec4899' : i < s ? '#a78bfa' : '#e5e7eb'; ctx.beginPath(); ctx.arc(x, 16, 9, 0, TAU); ctx.fill(); textLight(ctx, String(i + 1), x, 16.5, i <= s ? '#fff' : '#64748b', 11, 'center', 900); });
      textLight(ctx, `${s + 1}. ${L(PSTEPS[s])[0]}`, w / 2, 40, '#6d28d9', 14, 'center', 900);
    }
    function paInfo() {
      const s = Math.min(4, Math.floor(pa.u)), key = lang + s;
      root.querySelectorAll('#paSteps button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === s)));
      if (key === pa.infoKey) return; pa.infoKey = key;
      infoBox($('info_pa'), {
        emo: '📜', title: T('Giấy', 'Paper'), sub: T(`Bước ${s + 1}: ${L(PSTEPS[s])[0]}`, `Step ${s + 1}: ${L(PSTEPS[s])[0]}`),
        rows: [[T('Bước này', 'This step'), L(PSTEPS[s])[1]], [T('Ai, khi nào?', 'Who, when?'), T('Ông Thái Luân ở Trung Quốc đã cải tiến cách làm giấy vào khoảng năm 105.', 'Cai Lun in China improved paper-making around the year 105.')], [T('Trước khi có giấy', 'Before paper'), T('Người ta viết lên thẻ tre, lụa, lá cây, đất sét hoặc khắc lên đá.', 'People wrote on bamboo strips, silk, leaves, clay or carved stone.')]],
        notes: [['fun', T('✨ Ở Việt Nam có giấy dó làm từ vỏ cây dó, nổi tiếng ở làng Bưởi (Hà Nội). Tranh Đông Hồ được in trên giấy dó.', '✨ Vietnam has do paper made from do-tree bark, famous in Buoi village (Hanoi). Dong Ho folk prints are made on it.')], ['tip', T('♻️ Tiết kiệm và tái chế giấy giúp bớt chặt cây, bảo vệ rừng.', '♻️ Saving and recycling paper means fewer trees are cut down.')]]
      });
    }
    $('paSteps').innerHTML = PSTEPS.map((_, i) => `<button type="button" data-s="${i}" aria-pressed="false"><b>${i + 1}</b><span></span></button>`).join('');
    $('paSteps').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (!b) return; cancelSpeech(); pa.playing = false; $('paPlay').textContent = playLbl(false); pa.u = +b.dataset.s + .05; });
    $('paPlay').onclick = () => { cancelSpeech(); pa.playing = !pa.playing; $('paPlay').textContent = playLbl(pa.playing); };
    TABS.pa = {
      frame(dt) { if (pa.playing) { pa.u += dt / 4; if (pa.u >= 5) pa.u = 0; } drawPa(); paInfo(); setText('hud_pa', `📜 ${T('Bước', 'Step')} ${Math.min(5, Math.floor(pa.u) + 1)}/5 – ${L(PSTEPS[Math.min(4, Math.floor(pa.u))])[0]}`); },
      refresh() { $('paPlay').textContent = playLbl(pa.playing); root.querySelectorAll('#paSteps button').forEach((b, i) => { b.querySelector('span').textContent = L(PSTEPS[i])[0]; }); pa.infoKey = ''; paInfo(); }
    };

    /* =====================================================================
       3. LA BÀN
       ===================================================================== */
    let cp = { head: 40, magnet: false, needle: 0, infoKey: '' };
    const cpC = mk('c_cp', (w) => clamp(w * .58, 280, 470));
    const earthC = mk('c_earth', (w) => clamp(w * .62, 180, 260));
    function drawCp(dt) {
      const { w, h, ctx } = cpC;
      if (!w) return;
      ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1.5;
      for (let k = 0; k < 14; k++) { const y = (k * 37 + clock * 20) % h; ctx.beginPath(); ctx.moveTo((k * 71) % w, y); ctx.lineTo((k * 71) % w + 20, y); ctx.stroke(); }
      textLight(ctx, T('⬆ Bắc thật', '⬆ True north'), w / 2, 14, '#fff', 12, 'center', 900);
      const cx = w * .5, cy = h * .55, hd = cp.head * Math.PI / 180;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(hd);
      const L1 = Math.min(w, h) * .42;
      ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.moveTo(0, -L1); ctx.quadraticCurveTo(L1 * .35, -L1 * .2, L1 * .25, L1 * .6); ctx.lineTo(-L1 * .25, L1 * .6); ctx.quadraticCurveTo(-L1 * .35, -L1 * .2, 0, -L1); ctx.fill();
      ctx.fillStyle = '#b45309'; ctx.fillRect(-L1 * .18, -L1 * .2, L1 * .36, L1 * .6);
      ctx.restore();
      // la bàn (mặt chia độ quay theo thuyền, kim luôn chỉ Bắc)
      const R = Math.min(w, h) * .17;
      ctx.fillStyle = '#fff7ed'; ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(hd);
      const dirs = [[T('Đ', 'E'), Math.PI / 2], [T('N', 'S'), Math.PI], [T('T', 'W'), -Math.PI / 2], [T('B', 'N'), 0]];
      for (let k = 0; k < 36; k++) { const a = k / 36 * TAU; ctx.strokeStyle = '#a16207'; ctx.lineWidth = k % 9 ? 1 : 2; ctx.beginPath(); ctx.moveTo(Math.sin(a) * R * .85, -Math.cos(a) * R * .85); ctx.lineTo(Math.sin(a) * R * .95, -Math.cos(a) * R * .95); ctx.stroke(); }
      ctx.restore();
      for (const [t, a] of dirs) textLight(ctx, t, cx + Math.sin(a + hd) * R * .7, cy - Math.cos(a + hd) * R * .7, '#78350f', 12, 'center', 900);
      const mag = { x: cx + R * 1.8, y: cy - R * .2 };
      let target = 0;
      if (cp.magnet) { const am = Math.atan2(mag.x - cx, -(mag.y - cy)); target = am * .8; }
      cp.needle += (target - cp.needle) * Math.min(1, dt * 4);
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(cp.needle + (reduceMotion ? 0 : Math.sin(clock * 3) * .02));
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(0, -R * .8); ctx.lineTo(R * .1, 0); ctx.lineTo(-R * .1, 0); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.moveTo(0, R * .8); ctx.lineTo(R * .1, 0); ctx.lineTo(-R * .1, 0); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(0, 0, 4, 0, TAU); ctx.fill(); ctx.restore();
      if (cp.magnet) {
        ctx.save(); ctx.translate(mag.x, mag.y); ctx.rotate(-.3);
        ctx.fillStyle = '#dc2626'; ctx.fillRect(-R * .5, -R * .18, R * .5, R * .36); ctx.fillStyle = '#2563eb'; ctx.fillRect(0, -R * .18, R * .5, R * .36);
        textLight(ctx, 'N', -R * .25, 0, '#fff', 12, 'center', 900); textLight(ctx, 'S', R * .25, 0, '#fff', 12, 'center', 900); ctx.restore();
        bubble(ctx, T('Nam châm làm kim chỉ sai!', 'The magnet fools the needle!'), w / 2, h - 18, 12);
      }
    }
    function drawEarthMag() {
      const { w, h, ctx } = earthC;
      if (!w) return;
      ctx.fillStyle = '#0b1030'; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .22;
      ctx.strokeStyle = 'rgba(167,139,250,.6)'; ctx.lineWidth = 1.5;
      for (let k = 1; k <= 4; k++) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + sd * R * .55 * k, cy, R * .55 * k, R * (.7 + k * .35), 0, 0, TAU); ctx.stroke(); }
      ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
      ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.ellipse(cx - R * .3, cy - R * .2, R * .35, R * .25, .4, 0, TAU); ctx.ellipse(cx + R * .3, cy + R * .3, R * .25, R * .3, -.3, 0, TAU); ctx.fill();
      textLight(ctx, T('Bắc', 'N'), cx, cy - R - 12, '#fecaca', 12, 'center', 900); textLight(ctx, T('Nam', 'S'), cx, cy + R + 12, '#bfdbfe', 12, 'center', 900);
      for (const [x, y] of [[.12, .3], [.88, .3], [.12, .7], [.88, .7]]) { const px = w * x, py = h * y; ctx.save(); ctx.translate(px, py); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(3, 0); ctx.lineTo(-3, 0); ctx.fill(); ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(3, 0); ctx.lineTo(-3, 0); ctx.fill(); ctx.restore(); }
    }
    function cpInfo() {
      const key = lang + cp.magnet; if (key === cp.infoKey) return; cp.infoKey = key;
      const notes = [['fun', T('✨ Trái Đất giống như một thỏi nam châm khổng lồ, nên kim la bàn (cũng là nam châm nhỏ) luôn quay về hướng Bắc – Nam.', '✨ Earth acts like a giant magnet, so a compass needle (a tiny magnet) always swings to point north–south.')]];
      if (cp.magnet) notes.unshift(['warn', T('⚠️ Để la bàn xa nam châm và đồ sắt, nếu không kim sẽ chỉ sai hướng.', '⚠️ Keep a compass away from magnets and iron, or it will point the wrong way.')]);
      infoBox($('info_cp'), {
        emo: '🧭', title: T('La bàn', 'The compass'), sub: T(`Thuyền đang đi hướng ${Math.round(cp.head)}°`, `Ship heading ${Math.round(cp.head)}°`),
        rows: [[T('Ai, khi nào?', 'Who, when?'), T('Người Trung Quốc xưa đã biết đá nam châm chỉ hướng. Khoảng thế kỷ 11 (thời Tống), la bàn kim nam châm được dùng để đi biển.', 'Ancient Chinese knew lodestones point one way. Around the 11th century (Song dynasty), needle compasses were used at sea.')], [T('Thay đổi thế giới', 'Changed the world'), T('Thủy thủ đi xa giữa biển mênh mông mà không lạc, mở ra những chuyến đi khám phá thế giới.', 'Sailors could cross open oceans without getting lost, opening the age of exploration.')], [T('Cách đọc', 'How to read'), T('Đầu kim màu đỏ chỉ hướng Bắc. Xoay la bàn cho chữ B trùng đầu kim là biết các hướng còn lại.', 'The red tip points north. Turn the dial so N lines up with it to find the other directions.')]],
        notes
      });
    }
    $('cpHead').addEventListener('input', () => { cp.head = +$('cpHead').value; cp.infoKey = ''; cpInfo(); });
    $('cpMag').onclick = () => { cp.magnet = !cp.magnet; $('cpMag').setAttribute('aria-pressed', String(cp.magnet)); cpInfo(); };
    TABS.cp = { frame(dt) { drawCp(dt); drawEarthMag(); cpInfo(); setText('hud_cp', cp.magnet ? T('🧲 Có nam châm: kim la bàn bị kéo lệch', '🧲 Magnet nearby: the needle is pulled off') : T(`🧭 Thuyền quay ${Math.round(cp.head)}° nhưng kim vẫn chỉ hướng Bắc`, `🧭 The ship turned ${Math.round(cp.head)}° but the needle still points north`)); }, refresh() { cp.infoKey = ''; cpInfo(); } };

    /* =====================================================================
       4. BÓNG ĐÈN
       ===================================================================== */
    let lb = { on: false, type: 'inc', glow: 0, infoKey: '' };
    const lbC = mk('c_lb', (w) => clamp(w * .55, 270, 450));
    function drawLb(dt) {
      const { w, h, ctx } = lbC;
      if (!w) return;
      lb.glow += ((lb.on ? 1 : 0) - lb.glow) * Math.min(1, dt * (lb.type === 'inc' ? 3 : 10));
      ctx.fillStyle = mix('#1e1b4b', '#fef9c3', lb.glow * (lb.type === 'led' ? .9 : .75)); ctx.fillRect(0, 0, w, h);
      const bx = w * .5, by = h * .3, br = Math.min(w, h) * .13;
      const gx0 = w * .15, gx1 = w * .85, gy0 = by + br * 1.4, gy1 = h * .82;
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx - br * .3, gy0); ctx.lineTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.lineTo(gx1, gy0); ctx.lineTo(bx + br * .3, gy0); ctx.stroke();
      // pin
      ctx.fillStyle = '#111827'; rr(ctx, w * .38, gy1 - 16, w * .2, 32, 6); ctx.fill(); ctx.fillStyle = '#f59e0b'; ctx.fillRect(w * .58, gy1 - 8, 8, 16);
      textLight(ctx, T('Pin', 'Battery'), w * .48, gy1, '#fef3c7', 12, 'center', 900);
      // công tắc
      const sx = gx0, sy = (gy0 + gy1) / 2; ctx.fillStyle = mix('#1e1b4b', '#fef9c3', lb.glow * .75); ctx.fillRect(sx - 6, sy - 20, 12, 40);
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx, sy + 20); ctx.lineTo(lb.on ? sx : sx - 18, sy - 18); ctx.stroke();
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(sx, sy + 20, 4, 0, TAU); ctx.arc(sx, sy - 20, 4, 0, TAU); ctx.fill();
      textLight(ctx, T('Công tắc', 'Switch'), sx + 12, sy, lb.glow > .5 ? '#334155' : '#e2e8f0', 11.5, 'left', 900);
      // dòng điện
      if (lb.on) { const path = [{ x: gx1, y: gy1 }, { x: gx1, y: gy0 }, { x: bx + br * .3, y: gy0 }, { x: bx - br * .3, y: gy0 }, { x: gx0, y: gy0 }, { x: gx0, y: gy1 }, { x: w * .38, y: gy1 }]; let tot = 0; const seg = []; for (let i = 1; i < path.length; i++) { const d = Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y); seg.push(d); tot += d; } ctx.fillStyle = '#fde047'; for (let k = 0; k < 18; k++) { let need = ((k / 18 + clock * .15) % 1) * tot; for (let i = 0; i < seg.length; i++) { if (need <= seg[i]) { const q = need / seg[i]; ctx.beginPath(); ctx.arc(lerp(path[i].x, path[i + 1].x, q), lerp(path[i].y, path[i + 1].y, q), 3, 0, TAU); ctx.fill(); break; } need -= seg[i]; } } }
      // bóng
      if (lb.glow > .05) { const gg = ctx.createRadialGradient(bx, by, br * .3, bx, by, br * 3.5); gg.addColorStop(0, `rgba(254,240,138,${lb.glow * .8})`); gg.addColorStop(1, 'rgba(254,240,138,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(bx, by, br * 3.5, 0, TAU); ctx.fill(); }
      ctx.fillStyle = `rgba(255,255,255,${.35 + lb.glow * .5})`; ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#9ca3af'; ctx.fillRect(bx - br * .45, by + br * .85, br * .9, br * .55);
      if (lb.type === 'inc') { ctx.strokeStyle = mix('#57534e', '#fff7ed', lb.glow); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - br * .3, by + br * .8); ctx.lineTo(bx - br * .3, by); for (let k = 0; k <= 8; k++) ctx.lineTo(bx - br * .3 + k * br * .075, by + (k % 2 ? -6 : 6)); ctx.lineTo(bx + br * .3, by + br * .8); ctx.stroke(); }
      else { ctx.fillStyle = mix('#e5e7eb', '#fffbeb', lb.glow); for (let k = 0; k < 3; k++) { ctx.fillRect(bx - br * .45 + k * br * .35, by - 4, br * .2, 8); } }
      if (lb.type === 'inc' && lb.glow > .4) { ctx.strokeStyle = 'rgba(239,68,68,.6)'; ctx.lineWidth = 2; for (let k = -1; k <= 1; k++) { ctx.beginPath(); for (let j = 0; j < 10; j++) { const x = bx + k * br * .5 + Math.sin(j + clock * 5 + k) * 4, y = by - br * 1.2 - j * 5; if (j) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke(); } }
      // thanh năng lượng
      const light = lb.type === 'inc' ? .1 : .4, watt = lb.type === 'inc' ? 60 : 9;
      ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, w - 172, 10, 162, 62, 10); ctx.fill();
      textLight(ctx, T(`Điện dùng: ${watt} W`, `Power used: ${watt} W`), w - 164, 22, '#334155', 11.5, 'left', 900);
      ctx.fillStyle = '#fde047'; ctx.fillRect(w - 164, 36, 146 * light, 12); ctx.fillStyle = '#f87171'; ctx.fillRect(w - 164 + 146 * light, 36, 146 * (1 - light), 12);
      textLight(ctx, T('■ ánh sáng  ■ nhiệt', '■ light  ■ heat'), w - 164, 60, '#475569', 10.5, 'left', 800);
    }
    function lbInfo() {
      const key = lang + lb.type; if (key === lb.infoKey) return; lb.infoKey = key;
      infoBox($('info_lb'), {
        emo: '💡', title: T('Bóng đèn điện', 'The electric light bulb'), sub: T('Năm 1879', 'In 1879'),
        rows: [[T('Ai?', 'Who?'), T('Thomas Edison (Mỹ) cùng nhiều nhà phát minh khác như Joseph Swan (Anh) đã làm ra bóng đèn sợi đốt sáng được lâu.', 'Thomas Edison (USA), along with others such as Joseph Swan (UK), made filament bulbs that lasted a long time.')],
          [T('Hoạt động', 'How it works'), lb.type === 'inc' ? T('Dòng điện chạy qua sợi đốt mảnh làm nó nóng đỏ rồi phát sáng. Phần lớn điện biến thành nhiệt.', 'Current heats a thin filament until it glows. Most of the energy becomes heat.') : T('Đèn LED phát sáng nhờ các chất bán dẫn, ít nóng, dùng ít điện hơn khoảng 80% so với bóng sợi đốt cùng độ sáng.', 'LEDs glow using semiconductors, stay cool and use about 80% less power than a filament bulb of the same brightness.')],
          [T('Thay đổi thế giới', 'Changed the world'), T('Con người học tập, làm việc cả ban đêm an toàn hơn so với đèn dầu, nến.', 'People could study and work at night more safely than with oil lamps and candles.')]],
        notes: [['fun', T('✨ Edison thử hàng nghìn vật liệu để làm sợi đốt, có lúc dùng sợi tre đốt thành than!', '✨ Edison tried thousands of materials for the filament, including carbonised bamboo!')], ['tip', T('💡 Tắt đèn khi ra khỏi phòng và dùng bóng LED để tiết kiệm điện.', '💡 Switch off lights when you leave a room and use LED bulbs to save power.')]]
      });
    }
    $('lbSw').onclick = () => { lb.on = !lb.on; };
    root.querySelectorAll('[data-bulb]').forEach((b) => b.addEventListener('click', () => { lb.type = b.dataset.bulb; pressGroup('[data-bulb]', 'bulb', lb.type); lbInfo(); }));
    TABS.lb = { frame(dt) { drawLb(dt); lbInfo(); setText('hud_lb', lb.on ? (lb.type === 'inc' ? T('💡 Đèn sợi đốt sáng, nhưng rất nóng', '💡 The filament bulb glows, but gets hot') : T('💡 Đèn LED sáng, mát và tiết kiệm điện', '💡 The LED glows, cool and efficient')) : T('🔌 Mạch hở: công tắc tắt nên đèn không sáng', '🔌 Open circuit: switch off, no light')); }, refresh() { lb.infoKey = ''; lbInfo(); } };

    /* =====================================================================
       5. ĐIỆN THOẠI
       ===================================================================== */
    let ph = { taut: true, pulses: [], heard: 0, infoKey: '' };
    const phC = mk('c_ph', (w) => clamp(w * .5, 250, 420));
    const evoC = mk('c_evo', (w) => clamp(w * .55, 160, 230));
    function drawPh(dt) {
      const { w, h, ctx } = phC;
      if (!w) return;
      ctx.fillStyle = '#f0fdf4'; ctx.fillRect(0, 0, w, h);
      const gy = h * .85, s = h * .55, ax = w * .12, bx = w * .88, cy = gy - s * .78;
      ctx.fillStyle = '#bbf7d0'; ctx.fillRect(0, gy, w, h - gy);
      stick(ctx, ax, gy, s, 0, .1); ctx.save(); ctx.translate(bx * 2, 0); ctx.scale(-1, 1); stick(ctx, bx, gy, s, 0, .1); ctx.restore();
      const c1 = { x: ax + s * .38, y: cy }, c2 = { x: bx - s * .38, y: cy };
      ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(c1.x, c1.y);
      if (ph.taut) ctx.lineTo(c2.x, c2.y); else ctx.quadraticCurveTo(w / 2, cy + h * .35, c2.x, c2.y);
      ctx.stroke();
      for (const [c, sd] of [[c1, 1], [c2, -1]]) { ctx.fillStyle = '#f9a8d4'; ctx.beginPath(); ctx.moveTo(c.x - sd * 6, c.y - 14); ctx.lineTo(c.x + sd * 12, c.y - 9); ctx.lineTo(c.x + sd * 12, c.y + 9); ctx.lineTo(c.x - sd * 6, c.y + 14); ctx.closePath(); ctx.fill(); }
      for (const p of ph.pulses) {
        p.t += dt * .7;
        const x = lerp(c1.x, c2.x, p.t), y = ph.taut ? cy : cy + Math.sin(p.t * Math.PI) * h * .17;
        const fade = ph.taut ? 1 : Math.max(0, 1 - p.t * 2.5);
        ctx.strokeStyle = `rgba(99,102,241,${fade})`; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x - k * 6, y, 5 + k * 3, -.8, .8); ctx.stroke(); }
        if (p.t >= 1 && ph.taut && !p.done) { p.done = true; ph.heard = 1.6; }
      }
      ph.pulses = ph.pulses.filter((p) => p.t < 1.05);
      if (ph.pulses.length && ph.pulses[0].t < .3) bubble(ctx, T('A lô!', 'Hello!'), c1.x + 10, cy - h * .2, 13);
      if (ph.heard > 0) { ph.heard -= dt; bubble(ctx, T('Tớ nghe rõ lắm!', 'I hear you clearly!'), c2.x - 20, cy - h * .2, 13, '#fff', '#15803d'); }
      if (!ph.taut && ph.pulses.length && ph.pulses[0].t > .5) bubble(ctx, T('Dây chùng, không nghe thấy gì…', 'Slack string: nothing heard…'), w / 2, h * .12, 12, '#fff', '#b45309');
    }
    const EVO = [
      { y: '1876', vi: 'Điện thoại đầu tiên', en: 'First telephone' }, { y: T0('khoảng 1900 – 1980', 'c. 1900 – 1980'), vi: 'Điện thoại bàn quay số', en: 'Rotary desk phone' },
      { y: '1973', vi: 'Điện thoại di động đầu tiên', en: 'First mobile phone' }, { y: T0('khoảng 2007', 'c. 2007'), vi: 'Điện thoại thông minh', en: 'Smartphone' }
    ];
    function T0(vi, en) { return { vi, en }; }
    function drawEvo() {
      const { w, h, ctx } = evoC;
      if (!w) return;
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
      const n = EVO.length, gap = w / n, iy = h * .42, s = Math.min(gap * .32, h * .22);
      ctx.strokeStyle = '#ddd6fe'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gap * .5, iy); ctx.lineTo(w - gap * .5, iy); ctx.stroke();
      EVO.forEach((e, i) => {
        const x = gap * (i + .5); ctx.fillStyle = '#334155'; ctx.strokeStyle = '#334155'; ctx.lineWidth = 2;
        if (i === 0) { ctx.fillRect(x - s * .1, iy - s * .2, s * .2, s * .9); ctx.beginPath(); ctx.ellipse(x, iy - s * .3, s * .3, s * .14, 0, 0, TAU); ctx.fill(); ctx.fillRect(x - s * .4, iy + s * .65, s * .8, s * .12); }
        else if (i === 1) { rr(ctx, x - s * .6, iy - s * .1, s * 1.2, s * .7, 8); ctx.fill(); ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(x, iy + s * .25, s * .25, 0, TAU); ctx.fill(); ctx.fillStyle = '#334155'; rr(ctx, x - s * .7, iy - s * .4, s * 1.4, s * .22, 8); ctx.fill(); }
        else if (i === 2) { rr(ctx, x - s * .22, iy - s * .7, s * .44, s * 1.4, 6); ctx.fill(); ctx.fillRect(x + s * .05, iy - s * 1.0, s * .08, s * .3); ctx.fillStyle = '#86efac'; ctx.fillRect(x - s * .15, iy - s * .55, s * .3, s * .3); }
        else { rr(ctx, x - s * .35, iy - s * .7, s * .7, s * 1.4, 8); ctx.fill(); ctx.fillStyle = '#7dd3fc'; rr(ctx, x - s * .28, iy - s * .6, s * .56, s * 1.15, 5); ctx.fill(); }
        textLight(ctx, typeof e.y === 'string' ? e.y : L(e.y), x, h * .78, '#6d28d9', w < 320 ? 10 : 11.5, 'center', 900);
        ctx.font = `800 ${w < 320 ? 9.5 : 10.5}px system-ui, sans-serif`;
        const name = L(e), words = name.split(' '), mid = Math.ceil(words.length / 2);
        textLight(ctx, words.slice(0, mid).join(' '), x, h * .88, '#475569', w < 320 ? 9.5 : 10.5, 'center', 800);
        textLight(ctx, words.slice(mid).join(' '), x, h * .96, '#475569', w < 320 ? 9.5 : 10.5, 'center', 800);
      });
    }
    function phInfo() {
      const key = lang + ph.taut; if (key === ph.infoKey) return; ph.infoKey = key;
      infoBox($('info_ph'), {
        emo: '☎️', title: T('Điện thoại', 'The telephone'), sub: T('Năm 1876', 'In 1876'),
        rows: [[T('Thử nghiệm', 'Experiment'), ph.taut ? T('Dây căng: tiếng nói làm đáy cốc rung, rung động chạy theo sợi dây sang cốc bên kia.', 'Tight string: your voice shakes the cup, and the vibration runs along the string to the other cup.') : T('Dây chùng: rung động bị mất dần trên đường đi nên bạn kia không nghe thấy.', 'Slack string: the vibration fades away, so your friend hears nothing.')],
          [T('Ai?', 'Who?'), T('Alexander Graham Bell được cấp bằng sáng chế điện thoại năm 1876.', 'Alexander Graham Bell patented the telephone in 1876.')],
          [T('Hoạt động', 'How it works'), T('Điện thoại biến giọng nói thành tín hiệu điện (nay là sóng vô tuyến), gửi đi rất xa rồi biến lại thành âm thanh.', 'A phone turns your voice into electrical signals (now radio waves), sends them far away, and turns them back into sound.')]],
        notes: [['fun', T('✨ Câu đầu tiên Bell nói qua điện thoại là: "Ông Watson, lại đây, tôi cần gặp ông!"', '✨ Bell’s first words on the phone were: “Mr Watson, come here, I want to see you!”')], ['tip', T('📞 Nhớ số khẩn cấp: 113 công an, 114 cứu hỏa, 115 cấp cứu. Không dùng điện thoại khi đang qua đường.', '📞 Vietnam emergency numbers: 113 police, 114 fire, 115 ambulance. Don’t use your phone while crossing the road.')]]
      });
    }
    $('phTalk').onclick = () => { cancelSpeech(); ph.pulses.push({ t: 0 }); };
    $('phTaut').onclick = () => { ph.taut = !ph.taut; $('phTaut').setAttribute('aria-pressed', String(ph.taut)); phInfo(); };
    TABS.ph = { frame(dt) { drawPh(dt); drawEvo(); phInfo(); setText('hud_ph', ph.taut ? T('🧵 Dây căng: âm thanh truyền được', '🧵 Tight string: sound travels') : T('🧵 Dây chùng: âm thanh không truyền được', '🧵 Slack string: sound doesn’t travel')); }, refresh() { ph.infoKey = ''; phInfo(); } };

    /* ---------- đố vui cho từng phát minh ---------- */
    const Q = (vi, en) => ({ vi, en });
    QUIZZES.push(makeQuiz($('quiz_wh'), Q([
      { q: 'Vì sao kéo xe có bánh nhẹ hơn kéo lê?', a: ['Bánh xe lăn nên ma sát nhỏ hơn', 'Vì xe nhẹ hơn đá', 'Vì có gió đẩy', 'Vì mặt đất nghiêng'], why: 'Lăn thì lực cản nhỏ hơn trượt rất nhiều.' },
      { q: 'Bánh xe xuất hiện khoảng bao lâu trước đây?', a: ['Khoảng 5.500 năm', 'Khoảng 50 năm', 'Khoảng 500 năm', 'Mới năm ngoái'], why: 'Ở vùng Lưỡng Hà cổ đại, khoảng 5.500 năm trước.' },
      { q: 'Lúc đầu bánh xe được dùng làm gì?', a: ['Bàn xoay để nặn gốm', 'Bánh ô tô', 'Bánh lái tàu', 'Đồ chơi'], why: 'Bàn xoay gốm có trước, sau mới lắp bánh vào xe.' },
      { q: 'Vật nào sau đây có dùng bánh xe?', a: ['Xe đạp', 'Cái thìa', 'Quyển sách', 'Cái áo'], why: 'Xe đạp có hai bánh xe.' },
      { q: 'Lăn đá trên các khúc gỗ có gì bất tiện?', a: ['Phải liên tục chuyển khúc gỗ ra trước', 'Đá bị vỡ', 'Gỗ bị cháy', 'Không bất tiện gì'], why: 'Gỗ lăn ra phía sau nên phải mang lên phía trước liên tục.' },
      { q: 'Trục và bánh xe giúp điều gì?', a: ['Bánh quay quanh trục, xe chạy êm và nhẹ', 'Làm xe nặng hơn', 'Làm xe đứng yên', 'Phát ra âm nhạc'], why: 'Bánh xe quay quanh trục giúp di chuyển dễ dàng.' }
    ], [
      { q: 'Why is a wheeled cart easier than dragging?', a: ['Wheels roll, so there’s less friction', 'Carts are lighter than stones', 'The wind pushes it', 'The ground slopes'], why: 'Rolling has far less resistance than sliding.' },
      { q: 'About how long ago did the wheel appear?', a: ['About 5,500 years ago', 'About 50 years ago', 'About 500 years ago', 'Last year'], why: 'In ancient Mesopotamia, about 5,500 years ago.' },
      { q: 'What was the first wheel used for?', a: ['A potter’s wheel', 'Car tyres', 'Ship steering', 'Toys'], why: 'The potter’s wheel came first; carts came later.' },
      { q: 'Which of these uses wheels?', a: ['A bicycle', 'A spoon', 'A book', 'A shirt'], why: 'A bicycle has two wheels.' },
      { q: 'What’s awkward about log rollers?', a: ['You keep moving logs to the front', 'The stone breaks', 'The logs burn', 'Nothing'], why: 'Logs roll out the back and must be carried forward again.' },
      { q: 'What do the axle and wheel do?', a: ['The wheel turns on the axle so it moves smoothly', 'Make the cart heavier', 'Keep it still', 'Play music'], why: 'Wheels turning on an axle make moving easy.' }
    ])));
    QUIZZES.push(makeQuiz($('quiz_pa'), Q([
      { q: 'Ai đã cải tiến cách làm giấy vào khoảng năm 105?', a: ['Thái Luân', 'Edison', 'Bell', 'Lê Lợi'], why: 'Ông Thái Luân ở Trung Quốc.' },
      { q: 'Giấy dó của Việt Nam làm từ gì?', a: ['Vỏ cây dó', 'Nhựa', 'Kim loại', 'Đá'], why: 'Giấy dó làm từ vỏ cây dó, nổi tiếng ở làng Bưởi.' },
      { q: 'Trước khi có giấy, người xưa viết lên đâu?', a: ['Thẻ tre, lụa, lá cây', 'Máy tính', 'Bảng trắng', 'Giấy in'], why: 'Họ viết lên thẻ tre, lụa, lá cây hoặc khắc lên đá.' },
      { q: 'Tranh dân gian nào in trên giấy dó?', a: ['Tranh Đông Hồ', 'Tranh sơn dầu', 'Ảnh chụp', 'Tranh kính'], why: 'Tranh Đông Hồ được in trên giấy dó.' },
      { q: 'Vì sao cần tiết kiệm giấy?', a: ['Để bớt chặt cây, bảo vệ rừng', 'Vì giấy độc', 'Vì giấy nặng', 'Vì giấy không cháy'], why: 'Giấy làm từ sợi cây, dùng ít giấy là bảo vệ rừng.' },
      { q: 'Khuôn lưới dùng để làm gì?', a: ['Vớt lớp sợi mỏng tạo thành tờ giấy', 'Giã vỏ cây', 'Đun nước', 'Cắt giấy'], why: 'Lớp sợi đọng trên lưới rồi khô thành tờ giấy.' }
    ], [
      { q: 'Who improved paper-making around the year 105?', a: ['Cai Lun', 'Edison', 'Bell', 'Le Loi'], why: 'Cai Lun in China.' },
      { q: 'What is Vietnamese do paper made from?', a: ['Do-tree bark', 'Plastic', 'Metal', 'Stone'], why: 'From do bark, famous in Buoi village.' },
      { q: 'Before paper, what did people write on?', a: ['Bamboo strips, silk, leaves', 'Computers', 'Whiteboards', 'Printer paper'], why: 'Bamboo, silk, leaves, or carved stone.' },
      { q: 'Which folk prints are made on do paper?', a: ['Dong Ho prints', 'Oil paintings', 'Photos', 'Glass paintings'], why: 'Dong Ho prints use do paper.' },
      { q: 'Why save paper?', a: ['Fewer trees are cut down', 'Paper is poisonous', 'Paper is heavy', 'Paper won’t burn'], why: 'Paper is made from plant fibres; using less protects forests.' },
      { q: 'What is the mesh frame for?', a: ['Scooping a thin layer of fibres into a sheet', 'Pounding bark', 'Boiling water', 'Cutting paper'], why: 'The fibres settle on the mesh and dry into a sheet.' }
    ])));
    QUIZZES.push(makeQuiz($('quiz_cp'), Q([
      { q: 'Đầu kim màu đỏ của la bàn chỉ hướng nào?', a: ['Hướng Bắc', 'Hướng Nam', 'Hướng Đông', 'Lung tung'], why: 'Kim nam châm luôn quay về hướng Bắc – Nam.' },
      { q: 'Vì sao kim la bàn chỉ hướng Bắc?', a: ['Trái Đất giống một nam châm khổng lồ', 'Vì gió thổi', 'Vì Mặt Trời kéo', 'Vì kim nặng'], why: 'Kim là nam châm nhỏ, bị từ trường Trái Đất định hướng.' },
      { q: 'La bàn quan trọng nhất với ai ngày xưa?', a: ['Thủy thủ đi biển', 'Thợ làm bánh', 'Người trồng lúa', 'Học sinh'], why: 'Giữa biển không có mốc, la bàn giúp không lạc đường.' },
      { q: 'Điều gì làm la bàn chỉ sai?', a: ['Để gần nam châm hoặc đồ sắt', 'Để dưới nắng', 'Cầm bằng tay trái', 'Đi bộ chậm'], why: 'Nam châm khác kéo lệch kim la bàn.' },
      { q: 'La bàn kim nam châm dùng đi biển từ khoảng khi nào?', a: ['Thế kỷ 11', 'Năm 2000', 'Thế kỷ 20', 'Hôm qua'], why: 'Khoảng thế kỷ 11, thời nhà Tống ở Trung Quốc.' },
      { q: 'Thuyền quay đầu thì kim la bàn thế nào?', a: ['Vẫn chỉ hướng Bắc', 'Quay theo thuyền', 'Ngừng hoạt động', 'Chỉ xuống đất'], why: 'Mặt la bàn quay theo thuyền nhưng kim vẫn chỉ Bắc.' }
    ], [
      { q: 'Which way does the red tip point?', a: ['North', 'South', 'East', 'Randomly'], why: 'A magnetic needle always lines up north–south.' },
      { q: 'Why does the needle point north?', a: ['Earth is like a giant magnet', 'The wind', 'The Sun pulls it', 'It is heavy'], why: 'The needle is a tiny magnet guided by Earth’s magnetism.' },
      { q: 'Who needed the compass most long ago?', a: ['Sailors at sea', 'Bakers', 'Rice farmers', 'Students'], why: 'At sea there are no landmarks; the compass kept ships on course.' },
      { q: 'What makes a compass point wrongly?', a: ['A nearby magnet or iron', 'Sunshine', 'Holding it left-handed', 'Walking slowly'], why: 'Another magnet pulls the needle off.' },
      { q: 'When were needle compasses used at sea?', a: ['Around the 11th century', 'In 2000', 'In the 20th century', 'Yesterday'], why: 'Around the 11th century, in Song-dynasty China.' },
      { q: 'If the ship turns, the needle…', a: ['Still points north', 'Turns with the ship', 'Stops working', 'Points down'], why: 'The dial turns with the ship, but the needle keeps pointing north.' }
    ])));
    QUIZZES.push(makeQuiz($('quiz_lb'), Q([
      { q: 'Ai nổi tiếng với bóng đèn sợi đốt năm 1879?', a: ['Thomas Edison', 'Graham Bell', 'Thái Luân', 'Ngô Quyền'], why: 'Edison, cùng những nhà phát minh khác như Joseph Swan.' },
      { q: 'Khi công tắc tắt, vì sao đèn không sáng?', a: ['Mạch hở, dòng điện không chạy', 'Pin bị lạnh', 'Bóng đèn ngủ', 'Dây bị ướt'], why: 'Dòng điện chỉ chạy khi mạch kín.' },
      { q: 'Bóng sợi đốt biến phần lớn điện thành gì?', a: ['Nhiệt', 'Âm thanh', 'Nước', 'Gió'], why: 'Phần lớn thành nhiệt, chỉ một ít thành ánh sáng.' },
      { q: 'Loại đèn nào tiết kiệm điện hơn?', a: ['Đèn LED', 'Đèn sợi đốt', 'Như nhau', 'Nến'], why: 'LED dùng ít điện hơn nhiều cho cùng độ sáng.' },
      { q: 'Việc nào giúp tiết kiệm điện?', a: ['Tắt đèn khi ra khỏi phòng', 'Bật đèn cả ngày', 'Mở tủ lạnh liên tục', 'Bật quạt khi không ai ngồi'], why: 'Tắt thiết bị khi không dùng giúp tiết kiệm điện.' },
      { q: 'Trước khi có đèn điện, người ta thắp sáng bằng gì?', a: ['Đèn dầu, nến', 'Đèn LED', 'Điện thoại', 'Máy tính'], why: 'Đèn dầu và nến vừa tối vừa dễ gây cháy.' }
    ], [
      { q: 'Who is famous for the filament bulb in 1879?', a: ['Thomas Edison', 'Graham Bell', 'Cai Lun', 'Ngo Quyen'], why: 'Edison, along with other inventors like Joseph Swan.' },
      { q: 'With the switch off, why is the bulb dark?', a: ['The circuit is open, so no current flows', 'The battery is cold', 'The bulb sleeps', 'The wire is wet'], why: 'Current only flows in a closed circuit.' },
      { q: 'A filament bulb turns most energy into…', a: ['Heat', 'Sound', 'Water', 'Wind'], why: 'Mostly heat, only a little light.' },
      { q: 'Which bulb saves more power?', a: ['LED', 'Filament', 'The same', 'A candle'], why: 'LEDs use far less power for the same light.' },
      { q: 'Which saves electricity?', a: ['Switching off lights when leaving', 'Lights on all day', 'Opening the fridge a lot', 'Fans on in empty rooms'], why: 'Turning things off when unused saves power.' },
      { q: 'Before electric light, people used…', a: ['Oil lamps and candles', 'LEDs', 'Phones', 'Computers'], why: 'Oil lamps and candles were dim and a fire risk.' }
    ])));
    QUIZZES.push(makeQuiz($('quiz_ph'), Q([
      { q: 'Ai được cấp bằng sáng chế điện thoại năm 1876?', a: ['Alexander Graham Bell', 'Thomas Edison', 'Thái Luân', 'Quang Trung'], why: 'Bell nhận bằng sáng chế điện thoại năm 1876.' },
      { q: 'Vì sao điện thoại cốc giấy cần dây căng?', a: ['Để rung động truyền được theo dây', 'Cho đẹp', 'Để dây không bẩn', 'Không cần căng'], why: 'Dây chùng làm rung động mất dần.' },
      { q: 'Điện thoại biến giọng nói thành gì để gửi đi?', a: ['Tín hiệu điện hoặc sóng vô tuyến', 'Nước', 'Ánh nắng', 'Giấy'], why: 'Rồi đầu bên kia biến tín hiệu lại thành âm thanh.' },
      { q: 'Số điện thoại gọi cứu hỏa ở Việt Nam là gì?', a: ['114', '113', '115', '119'], why: '113 công an, 114 cứu hỏa, 115 cấp cứu.' },
      { q: 'Khi nào không nên dùng điện thoại?', a: ['Khi đang qua đường', 'Khi ngồi ở nhà', 'Khi gọi cho bà', 'Khi đã làm xong bài'], why: 'Mải nhìn điện thoại khi qua đường rất nguy hiểm.' },
      { q: 'Điện thoại di động đầu tiên xuất hiện khoảng năm nào?', a: ['1973', '1876', '1500', '2020'], why: 'Cuộc gọi bằng điện thoại di động cầm tay đầu tiên là năm 1973.' }
    ], [
      { q: 'Who patented the telephone in 1876?', a: ['Alexander Graham Bell', 'Thomas Edison', 'Cai Lun', 'Quang Trung'], why: 'Bell received the telephone patent in 1876.' },
      { q: 'Why must a cup phone’s string be tight?', a: ['So the vibration can travel along it', 'To look nice', 'To keep it clean', 'It doesn’t matter'], why: 'A slack string lets the vibration die away.' },
      { q: 'What does a phone turn your voice into?', a: ['Electrical signals or radio waves', 'Water', 'Sunlight', 'Paper'], why: 'The other end turns the signal back into sound.' },
      { q: 'What number calls the fire brigade in Vietnam?', a: ['114', '113', '115', '119'], why: '113 police, 114 fire, 115 ambulance.' },
      { q: 'When shouldn’t you use a phone?', a: ['While crossing the road', 'At home', 'Calling grandma', 'After homework'], why: 'Looking at a phone while crossing is dangerous.' },
      { q: 'When was the first mobile phone call?', a: ['1973', '1876', '1500', '2020'], why: 'The first handheld mobile call was made in 1973.' }
    ])));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'wh';
    root.querySelectorAll('.inv-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.inv-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('i-' + x.dataset.p).classList.toggle('hidden', x !== b); });
      CANVASES.forEach((o) => o.fit());
      if (TABS[tab] && TABS[tab].show) TABS[tab].show();
      dirty = true;
    }));
    let last = performance.now();
    function loop(now) {
      const dt = Math.max(0, Math.min(.1, (now - last) / 1000)); last = now; clock += dt;
      try { if (TABS[tab]) TABS[tab].frame(dt); } catch (err) { if (window.console) console.error(err); }
      dirty = false;
      if (!destroyed) rafId = window.requestAnimationFrame(loop);
    }
    function refreshTexts() {
      applyStatic();
      Object.values(TABS).forEach((t) => t.refresh && t.refresh());
      QUIZZES.forEach((q) => q.refresh());
      dirty = true;
    }
    function setLang(l) {
      lang = l === 'en' ? 'en' : 'vi';
      root.querySelectorAll('.inv-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.inv-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.inv-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    CANVASES.forEach((o) => o.fit());
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
