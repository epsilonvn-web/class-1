/* Epsilon Edu - Tool: Kinh thien van ao (Virtual telescope): ngam qua kinh, cau tao kinh, do vui
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.virtualTelescope = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "virtualTelescope";
  let activeCleanup = null;

  const CSS = `
.scope-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.scope-tool *{box-sizing:border-box}.scope-tool button,.scope-tool input{font:inherit}.scope-tool button{cursor:pointer}.scope-tool .hidden{display:none!important}
.scope-tool button:focus-visible,.scope-tool canvas:focus-visible,.scope-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.scope-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.scope-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.scope-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.scope-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.scope-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.scope-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.scope-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.scope-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.scope-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.scope-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.scope-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.scope-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.scope-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.scope-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.scope-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.scope-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.scope-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.scope-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.scope-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.scope-panel{width:100%}.scope-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.scope-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.scope-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.scope-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.scope-tool .card-head.compact{margin-bottom:9px}
.scope-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.scope-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.scope-tool .btn,.scope-tool .soft-btn,.scope-tool .segmented button,.scope-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.scope-tool .btn:hover,.scope-tool .soft-btn:hover,.scope-tool .segmented button:hover,.scope-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.scope-tool .btn{padding:0 12px}.scope-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.scope-tool .segmented{display:flex;gap:7px;margin:0}.scope-tool .segmented button{padding:0 13px}
.scope-tool .segmented button[aria-pressed="true"],.scope-tool .soft-btn[aria-pressed="true"],.scope-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.scope-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.scope-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.scope-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.scope-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.scope-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.scope-tool .range-control input{width:100%;accent-color:#8b5cf6}.scope-tool .range-control b{color:#7c3aed;font-size:13px}
.scope-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.scope-tool .soft-btn{padding:0 12px}
.scope-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.scope-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.scope-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.scope-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.scope-tool .info-title{display:flex;align-items:center;gap:10px}.scope-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.scope-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.scope-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.scope-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.scope-tool .facts{display:grid;gap:6px;margin-top:10px}.scope-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.scope-tool .facts b{color:#7c3aed;font-size:13.5px}.scope-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.scope-tool .fun,.scope-tool .warn,.scope-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.scope-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.scope-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.scope-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.scope-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.scope-tool .state-big.up{color:#0f766e}.scope-tool .state-big.down{color:#b45309}
.scope-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.scope-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.scope-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.scope-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.scope-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.scope-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.scope-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.scope-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.scope-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.scope-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.scope-tool .qopt:hover{filter:brightness(.985)}.scope-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.scope-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.scope-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.scope-tool .qfb,.scope-tool .score{font-size:13px;font-weight:900}.scope-tool .qfb.ok{color:#15803d}.scope-tool .qfb.no{color:#be123c}.scope-tool .score{color:#7c3aed}
.scope-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.scope-grid{grid-template-columns:1fr;align-items:start}.scope-side{grid-template-rows:auto auto;height:auto}.scope-tool .control-grid{grid-template-columns:1fr}.scope-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.scope-hero{flex-wrap:wrap;padding:12px}.scope-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.scope-tabs{grid-template-columns:1fr}.scope-tabs .tab{min-height:40px}.scope-card{padding:11px;border-radius:18px}.scope-tool .card-head{align-items:flex-start;flex-direction:column}.scope-tool .head-actions{width:100%;justify-content:space-between}.scope-tool .head-actions .segmented{flex:1;min-width:0}.scope-tool .head-actions .segmented button{flex:1;padding:0 8px}.scope-tool .qopts{grid-template-columns:1fr}.scope-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.scope-tool *{transition:none!important}}

.scope-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.scope-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.scope-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.scope-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.scope-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.scope-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.scope-tool .checklist{display:grid;gap:6px;margin-top:10px}
.scope-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.scope-tool .checklist .ok{color:#15803d}.scope-tool .checklist .no{color:#be123c}.scope-tool .checklist .wait{color:#94a3b8}
.scope-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.scope-tool .process span{flex:1}.scope-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.scope-tool .process .on{color:#0284c7}.scope-tool .process i.on{color:#ec4899}
@media(max-width:640px){.scope-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.scope-tool .slider-pair{grid-template-columns:1fr}}

.scope-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.scope-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.scope-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.scope-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.scope-tool .pulse-box{display:grid;gap:9px;margin-bottom:4px}
.scope-tool .chip-grid{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.scope-tool .food-btn{min-height:38px;padding:0 10px;border:1.5px solid #e2e8f0;border-radius:12px;background:#fff;color:#334155;font-weight:900;font-size:13px}
.scope-tool .food-btn[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6)}
.scope-tool .badge-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.scope-tool .badge{position:relative;display:grid;place-items:center;gap:2px;padding:8px 4px;border-radius:16px;background:#f1f5f9;border:2px dashed #cbd5e1;text-align:center}
.scope-tool .badge.got{background:radial-gradient(circle at 30% 25%,#fef9c3,#fde68a 55%,#f59e0b);border:2px solid #f59e0b;box-shadow:0 4px 12px rgba(245,158,11,.3)}
.scope-tool .badge .bi{font-size:24px;line-height:1}.scope-tool .badge .bn{font-size:10.5px;font-weight:900;color:#475569;line-height:1.2}
.scope-tool .badge .bs{position:absolute;top:-6px;right:-4px;font-size:14px}
.scope-tool .opt-col{display:grid;gap:6px}.scope-tool .opt-col .soft-btn{min-height:42px;text-align:left;padding:6px 12px}
.scope-tool .soft-btn:disabled{opacity:.6;cursor:default;transform:none}.scope-tool .soft-btn[aria-pressed="true"]:disabled{opacity:1}
.scope-tool .canvas-wrap{background:#05060c}.scope-tool #c_view{cursor:grab}
.scope-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}

.scope-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.scope-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="scope-tool" data-tool-root>
  <div class="scope-hero">
    <div class="scope-hero-icon" aria-hidden="true">🔭</div>
    <div>
      <p class="scope-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="scope-lead" data-t="lead"></p>
    </div>
    <div class="scope-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="oAudioNotice" class="scope-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="scope-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="view" data-t="tab_view"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="how" data-t="tab_how"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="guess" data-t="tab_guess"></button>
  </div>
  <section id="o-view" class="scope-panel" role="tabpanel">
    <div class="scope-grid">
      <article class="scope-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_view"></h2></div>
          <div class="head-actions"><button id="vwLabels" class="soft-btn" type="button" aria-pressed="true" data-t="labels"></button><button id="vwTrack" class="soft-btn" type="button" aria-pressed="true" data-t="track"></button><button id="vwCenter" class="btn" type="button" data-t="center"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_view" role="img" data-ta="cv_view"></canvas></div>
        <p id="hud_view" class="hud" aria-live="polite"></p>
        <div id="vwTargets" class="chip-grid"></div>
        <div class="slider-pair">
          <label class="range-control"><span data-t="zoomL"></span><input id="vwZoom" type="range" min="0" max="100" value="25" step="0.5"><b id="zoomTxt"></b></label>
          <label class="range-control"><span data-t="focusL"></span><input id="vwFocus" type="range" min="0" max="100" value="20" step="0.5"></label>
        </div>
      </article>
      <div class="scope-side">
        <aside class="scope-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_view"></span><h2 data-t="sh_view"></h2></div></div>
          <div id="vwBook" class="pulse-box"></div>
          <div id="info_view" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_view" class="scope-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="o-how" class="scope-panel hidden" role="tabpanel">
    <div class="scope-grid">
      <article class="scope-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_how"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="typeL"><button type="button" data-type="ref" aria-pressed="true" data-t="tRef"></button><button type="button" data-type="new" aria-pressed="false" data-t="tNew"></button></div></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_how" role="img" data-ta="cv_how"></canvas></div>
        <p id="hud_how" class="hud" aria-live="polite"></p>
        <div class="cond-row"><span class="muted" data-t="eL"></span><div class="segmented"><button type="button" data-ep="25" aria-pressed="false">25 mm</button><button type="button" data-ep="20" aria-pressed="false">20 mm</button><button type="button" data-ep="10" aria-pressed="true">10 mm</button><button type="button" data-ep="6" aria-pressed="false">6 mm</button><button type="button" data-ep="4" aria-pressed="false">4 mm</button></div></div>
        <div class="slider-pair">
          <label class="range-control"><span data-t="fL"></span><input id="hwF" type="range" min="400" max="1200" value="900" step="50"><b id="hwFTxt"></b></label>
          <label class="range-control"><span data-t="dL"></span><input id="hwD" type="range" min="60" max="200" value="90" step="10"><b id="hwDTxt"></b></label>
        </div>
      </article>
      <div class="scope-side">
        <aside class="scope-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_how"></span><h2 data-t="sh_how"></h2></div></div>
          
          <div id="info_how" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_how" class="scope-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="o-guess" class="scope-panel hidden" role="tabpanel">
    <div class="scope-grid">
      <article class="scope-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_guess"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_guess" role="img" data-ta="cv_guess"></canvas></div>
        <p id="hud_guess" class="hud" aria-live="polite"></p>
      </article>
      <div class="scope-side">
        <aside class="scope-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_guess"></span><h2 data-t="sh_guess"></h2></div></div>
          <div id="guessBox" class="pulse-box"></div>
          <div id="info_guess" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_guess" class="scope-card quiz-card"></article>
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
    const audioNotice = $('oAudioNotice');
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
      kicker: ['Epsilon Edu · Thiên văn', 'Epsilon Edu · Astronomy'],
      title: ['Kính thiên văn ảo', 'Virtual Telescope'],
      lead: ['Hướng kính lên bầu trời, phóng to, vặn núm chỉnh nét để ngắm miệng hố Mặt Trăng, vành đai Sao Thổ, các mặt trăng Sao Mộc và những tinh vân xa xôi. Ngắm rõ mỗi thiên thể sẽ được một huy hiệu!', 'Point the telescope, zoom in and turn the focus knob to see Moon craters, Saturn’s rings, Jupiter’s moons and distant nebulae. Every sharp view earns a badge!'],
      tabsLabel: ['Các hoạt động', 'Activities'], eyeSim: ['Thị kính', 'Eyepiece'],
      tab_view: ['🔭 Ngắm qua kính', '🔭 Look through'], h_view: ['Chỉnh kính để nhìn rõ', 'Adjust for a sharp view'],
      cv_view: ['Hình ảnh qua thị kính kính thiên văn. Kéo để dịch kính', 'The view through the telescope eyepiece. Drag to move the telescope'],
      se_view: ['Sổ tay thiên văn', 'Sky logbook'], sh_view: ['Huy hiệu của em', 'Your badges'],
      tab_how: ['⚙️ Kính hoạt động thế nào?', '⚙️ How it works'], h_how: ['Thấu kính, gương và độ phóng đại', 'Lenses, mirrors and magnification'],
      cv_how: ['Sơ đồ đường đi của ánh sáng trong kính thiên văn', 'How light travels through a telescope'],
      se_how: ['Tìm hiểu', 'Learn'], sh_how: ['Kính của em phóng đại bao nhiêu?', 'How much does your telescope magnify?'],
      tab_guess: ['🎯 Đố em thấy gì?', '🎯 What do you see?'], h_guess: ['Nhận ra thiên thể qua thị kính', 'Spot the object in the eyepiece'],
      cv_guess: ['Một thiên thể bí ẩn trong thị kính', 'A mystery object in the eyepiece'],
      se_guess: ['Thử thách', 'Challenge'], sh_guess: ['Đây là gì?', 'What is it?'],
      zoomL: ['Độ phóng đại', 'Magnification'], focusL: ['🎛️ Núm chỉnh nét', '🎛️ Focus knob'], track: ['🛰️ Bám theo thiên thể', '🛰️ Tracking'], labels: ['🏷️ Tên', '🏷️ Labels'], center: ['🎯 Căn giữa', '🎯 Re-centre'],
      typeL: ['Loại kính', 'Telescope type'], tRef: ['🔍 Khúc xạ (thấu kính)', '🔍 Refractor (lens)'], tNew: ['🪞 Phản xạ (gương)', '🪞 Reflector (mirror)'],
      fL: ['Tiêu cự vật kính (mm)', 'Objective focal length (mm)'], eL: ['Thị kính', 'Eyepiece'], dL: ['Đường kính vật kính (mm)', 'Aperture (mm)']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    let seed = 11; const srand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const reseed = (n) => { seed = n; };

    /* ---------- các mục tiêu ---------- */
    const TGT = [
      { id: 'moon', icon: '🌔', deg: .52, best: [30, 120], vi: { name: 'Mặt Trăng', dist: 'khoảng 384.000 km', see: 'Rất nhiều miệng hố do thiên thạch va vào, các vùng tối gọi là "biển" (thật ra là đá bazan khô), núi và bóng đổ dài ở đường ranh sáng tối.', fun: 'Biển Yên Tĩnh là nơi tàu Apollo 11 hạ cánh năm 1969. Dấu chân phi hành gia vẫn còn đó vì Mặt Trăng không có gió.', tip: 'Ngắm gần đường ranh sáng tối sẽ thấy hố rõ nhất nhờ bóng đổ.' }, en: { name: 'The Moon', dist: 'about 384,000 km', see: 'Countless craters from meteorite impacts, dark plains called “seas” (really dry basalt), mountains and long shadows along the day–night line.', fun: 'Apollo 11 landed in the Sea of Tranquillity in 1969. The footprints are still there because the Moon has no wind.', tip: 'Look along the day–night line, where shadows make craters pop.' } },
      { id: 'saturn', icon: '🪐', deg: .037, best: [150, 400], vi: { name: 'Sao Thổ', dist: 'khoảng 1,4 tỉ km', see: 'Một quả cầu vàng nhạt với vành đai sáng bao quanh. Phóng to sẽ thấy khe tối Cassini chia đôi vành đai, và mặt trăng Titan như một chấm sáng nhỏ.', fun: 'Vành đai Sao Thổ rộng gấp hơn 20 lần Trái Đất nhưng chỉ dày khoảng vài chục mét, làm từ băng đá.', tip: 'Cần phóng đại từ 150 lần trở lên để thấy rõ vành đai.' }, en: { name: 'Saturn', dist: 'about 1.4 billion km', see: 'A pale gold ball with bright rings. Zoom in to see the dark Cassini Division and Titan as a tiny dot.', fun: 'The rings are over 20 Earths wide but only tens of metres thick, made of ice and rock.', tip: 'Use at least 150× to see the rings well.' } },
      { id: 'jupiter', icon: '🟠', deg: .0375, best: [120, 400], vi: { name: 'Sao Mộc', dist: 'khoảng 630 triệu km', see: 'Hành tinh lớn nhất với các dải mây nâu, Vết Đỏ Lớn, và 4 mặt trăng Io, Europa, Ganymede, Callisto xếp thành hàng, thay đổi vị trí mỗi đêm.', fun: 'Năm 1610, Galileo phát hiện 4 mặt trăng này bằng chiếc kính tự làm. Vết Đỏ Lớn là một cơn bão to hơn cả Trái Đất.', tip: 'Ngắm vài phút sẽ thấy các mặt trăng nhích dần.' }, en: { name: 'Jupiter', dist: 'about 630 million km', see: 'The largest planet with brown cloud belts, the Great Red Spot and four moons, Io, Europa, Ganymede and Callisto, lined up and moving night to night.', fun: 'Galileo found these four moons in 1610 with a home-made telescope. The Great Red Spot is a storm bigger than Earth.', tip: 'Watch a while and the moons shift.' } },
      { id: 'mars', icon: '🔴', deg: .0125, best: [200, 400], vi: { name: 'Sao Hỏa', dist: 'khoảng 78 – 400 triệu km', see: 'Một đĩa nhỏ màu cam đỏ, có vùng tối và chỏm băng trắng ở cực.', fun: 'Sao Hỏa đỏ vì đất của nó chứa nhiều gỉ sắt. Núi Olympus ở đó cao gấp gần 3 lần đỉnh Everest.', tip: 'Sao Hỏa rất nhỏ, cần độ phóng đại cao và trời lặng gió.' }, en: { name: 'Mars', dist: 'about 78 – 400 million km', see: 'A small orange-red disc with dark markings and a white polar cap.', fun: 'Mars is red because its soil is full of rust. Olympus Mons is nearly three times taller than Everest.', tip: 'Mars is tiny; use high power on a steady night.' } },
      { id: 'venus', icon: '🌙', deg: .042, best: [60, 300], vi: { name: 'Sao Kim', dist: 'khoảng 40 – 260 triệu km', see: 'Rất sáng, có hình lưỡi liềm giống Mặt Trăng vì Sao Kim cũng có pha.', fun: 'Sao Kim là hành tinh nóng nhất, nóng đủ để làm chảy chì. Người Việt gọi là sao Mai khi mọc buổi sáng, sao Hôm khi thấy buổi tối.', tip: 'Ngắm lúc chạng vạng để Sao Kim bớt chói.' }, en: { name: 'Venus', dist: 'about 40 – 260 million km', see: 'Dazzling, with a crescent shape like the Moon because Venus has phases too.', fun: 'Venus is the hottest planet, hot enough to melt lead. Vietnamese call it the Morning Star or Evening Star.', tip: 'View it at twilight so it’s less glaring.' } },
      { id: 'm42', icon: '🌸', deg: 1.5, best: [20, 80], vi: { name: 'Tinh vân Lạp Hộ (M42)', dist: 'khoảng 1.300 năm ánh sáng', see: 'Một đám mây khí phát sáng như cánh chim, giữa có 4 ngôi sao trẻ xếp hình thang gọi là "Hình Thang".', fun: 'Đây là "nhà trẻ" của các ngôi sao: những ngôi sao mới đang được sinh ra trong đám mây này.', tip: 'Dùng độ phóng đại thấp để thấy cả đám mây.' }, en: { name: 'Orion Nebula (M42)', dist: 'about 1,300 light-years', see: 'A glowing cloud of gas like a bird’s wings, with four young stars in the middle called the Trapezium.', fun: 'It’s a star nursery: new stars are being born inside it.', tip: 'Use low power to see the whole cloud.' } },
      { id: 'pleiades', icon: '✨', deg: 1.6, best: [15, 40], vi: { name: 'Cụm sao Tua Rua (M45)', dist: 'khoảng 440 năm ánh sáng', see: 'Hàng chục ngôi sao xanh lấp lánh, quanh đó có màn bụi mờ phản chiếu ánh sao.', fun: 'Mắt thường chỉ thấy 6 – 7 sao, nhưng qua kính có thể thấy hàng chục, thậm chí hàng trăm.', tip: 'Cụm này rất rộng, hãy dùng độ phóng đại thấp nhất.' }, en: { name: 'The Pleiades (M45)', dist: 'about 440 light-years', see: 'Dozens of sparkling blue stars wrapped in faint dust that reflects their light.', fun: 'Eyes see 6 – 7 stars, but a telescope shows dozens or even hundreds.', tip: 'It’s wide; use the lowest power.' } },
      { id: 'm31', icon: '🌀', deg: 3.0, best: [15, 30], vi: { name: 'Thiên hà Tiên Nữ (M31)', dist: 'khoảng 2,5 triệu năm ánh sáng', see: 'Một vệt sáng hình bầu dục, sáng ở giữa, gồm hàng trăm tỉ ngôi sao ở rất xa.', fun: 'Ánh sáng em đang thấy đã rời thiên hà này từ 2,5 triệu năm trước, khi loài người còn chưa xuất hiện!', tip: 'Ở nơi trời tối, xa đèn thành phố sẽ thấy rõ hơn.' }, en: { name: 'Andromeda Galaxy (M31)', dist: 'about 2.5 million light-years', see: 'An oval smudge, bright in the middle, made of hundreds of billions of distant stars.', fun: 'The light you see left it 2.5 million years ago, before humans existed!', tip: 'A dark site away from city lights helps a lot.' } }
    ];
    const TG = Object.fromEntries(TGT.map((t) => [t.id, t]));

    /* ---------- vẽ thiên thể vào canvas phụ (D = đường kính chính, pixel) ---------- */
    const off = document.createElement('canvas'), offCtx = off.getContext('2d');
    const off2 = document.createElement('canvas'), off2Ctx = off2.getContext('2d');
    const MARIA = [[.62, -.28, .13, .11], [.28, -.05, .2, .17], [.18, -.38, .16, .15], [-.28, -.45, .3, .25], [-.62, -.05, .3, .42], [-.15, .35, .2, .14], [.55, .15, .14, .17], [.38, .32, .1, .09], [-.05, -.72, .42, .07]];
    reseed(5); const CRATERS = Array.from({ length: 260 }, () => { const a = srand() * TAU, r = Math.sqrt(srand()) * .96; return [Math.cos(a) * r, Math.sin(a) * r, .006 + Math.pow(srand(), 3.2) * .06]; });
    function renderMoon(c, D, opt) {
      const R = D / 2, cx = c.canvas.width / 2, cy = c.canvas.height / 2;
      const g = c.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R); g.addColorStop(0, '#f1efe8'); g.addColorStop(1, '#bdb8ac');
      c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.fill();
      c.save(); c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.clip();
      c.fillStyle = 'rgba(95,92,88,.42)'; for (const [x, y, rx, ry] of MARIA) { c.beginPath(); c.ellipse(cx + x * R, cy + y * R, rx * R, ry * R, x * 1.3, 0, TAU); c.fill(); }
      for (const [x, y, r] of CRATERS) {
        const rp = r * R; if (rp < .9) continue;
        const px = cx + x * R, py = cy + y * R;
        c.fillStyle = 'rgba(70,66,60,.28)'; c.beginPath(); c.arc(px + rp * .18, py + rp * .1, rp, 0, TAU); c.fill();
        c.fillStyle = 'rgba(255,255,250,.35)'; c.beginPath(); c.arc(px - rp * .15, py - rp * .08, rp * .85, 0, TAU); c.fill();
        c.fillStyle = 'rgba(120,115,105,.35)'; c.beginPath(); c.arc(px + rp * .05, py + rp * .03, rp * .7, 0, TAU); c.fill();
      }
      // Tycho với tia sáng, Copernicus, Plato
      const ty = { x: cx - .12 * R, y: cy + .72 * R };
      c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = Math.max(1, R * .012); for (let k = 0; k < 14; k++) { const a = k / 14 * TAU + .2; c.beginPath(); c.moveTo(ty.x, ty.y); c.lineTo(ty.x + Math.cos(a) * R * (.5 + (k % 3) * .25), ty.y + Math.sin(a) * R * (.5 + (k % 3) * .25)); c.stroke(); }
      for (const [x, y, r, col] of [[-.12, .72, .035, 'rgba(255,255,255,.75)'], [-.32, -.12, .045, 'rgba(240,238,230,.7)'], [-.1, -.75, .04, 'rgba(70,66,60,.75)']]) { c.fillStyle = col; c.beginPath(); c.arc(cx + x * R, cy + y * R, r * R, 0, TAU); c.fill(); c.strokeStyle = 'rgba(60,55,50,.5)'; c.lineWidth = 1; c.stroke(); }
      // pha: trăng gần tròn đầu tháng, bóng tối ở rìa trái
      const lit = .82, k2 = Math.cos(lit * Math.PI);
      c.fillStyle = 'rgba(8,10,20,.93)'; c.beginPath();
      for (let i = 0; i <= 40; i++) { const t = -Math.PI / 2 + Math.PI * i / 40; const x = cx - Math.cos(t) * R, y = cy + Math.sin(t) * R; if (i) c.lineTo(x, y); else c.moveTo(x, y); }
      for (let i = 40; i >= 0; i--) { const t = -Math.PI / 2 + Math.PI * i / 40; c.lineTo(cx + k2 * Math.cos(t) * R, cy + Math.sin(t) * R); }
      c.closePath(); c.fill();
      c.restore();
      if (opt.labels && D > 260) {
        const lab = (t, x, y) => { c.font = `900 ${Math.max(11, Math.min(16, D * .025))}px system-ui`; c.textAlign = 'center'; c.lineWidth = 3; c.strokeStyle = 'rgba(0,0,0,.7)'; c.strokeText(t, cx + x * R, cy + y * R); c.fillStyle = '#fde68a'; c.fillText(t, cx + x * R, cy + y * R); };
        lab(T('Biển Yên Tĩnh', 'Sea of Tranquillity'), .28, -.05); lab(T('🚀 Apollo 11', '🚀 Apollo 11'), .38, .07); lab(T('Biển Mưa', 'Sea of Rains'), -.28, -.42); lab(T('Hố Tycho', 'Tycho'), -.12, .82); lab(T('Hố Copernicus', 'Copernicus'), -.32, -.02); lab(T('Biển Khủng Hoảng', 'Sea of Crises'), .62, -.18);
      }
    }
    function renderSaturn(c, D, opt) {
      const R = D / 2.3 / 2, cx = c.canvas.width / 2, cy = c.canvas.height / 2, tilt = .36, rot = -.12;
      const ring = (back) => {
        c.save(); c.translate(cx, cy); c.rotate(rot);
        const bands = [[2.27, 2.02, 'rgba(214,196,150,.85)'], [1.98, 1.93, 'rgba(15,15,20,.9)'], [1.93, 1.52, 'rgba(236,222,180,.95)'], [1.52, 1.24, 'rgba(160,140,110,.45)']];
        for (const [o, i, col] of bands) { c.fillStyle = col; c.beginPath(); c.ellipse(0, 0, o * R, o * R * tilt, 0, back ? Math.PI : 0, back ? TAU : Math.PI); c.ellipse(0, 0, i * R, i * R * tilt, 0, back ? TAU : Math.PI, back ? Math.PI : 0, true); c.closePath(); c.fill(); }
        c.restore();
      };
      ring(true);
      c.save(); c.translate(cx, cy); c.rotate(rot);
      const g = c.createRadialGradient(-R * .3, -R * .35, R * .1, 0, 0, R); g.addColorStop(0, '#f8e7b5'); g.addColorStop(1, '#b8945a');
      c.fillStyle = g; c.beginPath(); c.ellipse(0, 0, R, R * .9, 0, 0, TAU); c.fill();
      c.save(); c.clip(); for (let k = -4; k <= 4; k++) { c.fillStyle = k % 2 ? 'rgba(150,110,60,.18)' : 'rgba(255,240,200,.12)'; c.fillRect(-R, k * R * .17 - R * .05, 2 * R, R * .1); } c.fillStyle = 'rgba(20,20,30,.35)'; c.beginPath(); c.ellipse(0, R * .05, R * 1.25, R * .12, 0, 0, Math.PI); c.fill(); c.restore();
      c.restore();
      ring(false);
      const tx = cx + R * 7 * Math.cos(rot), tyy = cy + R * 7 * Math.sin(rot) + R * .4;
      c.fillStyle = '#fde68a'; c.beginPath(); c.arc(tx, tyy, Math.max(1.2, R * .07), 0, TAU); c.fill();
      if (opt.labels && D > 50) { c.font = `900 ${Math.max(11, D * .045)}px system-ui`; c.fillStyle = '#fde68a'; c.textAlign = 'center'; c.fillText('Titan', tx, tyy - 10); if (D > 120) { c.fillText(T('Khe Cassini', 'Cassini Division'), cx, cy - R * 1.95 * tilt - 10); } }
    }
    function renderJupiter(c, D, opt, t, pxPerDeg) {
      const R = D / 2, cx = c.canvas.width / 2, cy = c.canvas.height / 2;
      const MOONS = [['Io', .038, 1.77], ['Europa', .061, 3.55], ['Ganymede', .098, 7.15], ['Callisto', .17, 16.7]];
      const behind = [], front = [];
      MOONS.forEach(([n, el, per], i) => { const a = t / per * TAU * .15 + i * 1.7, x = cx + Math.sin(a) * el * pxPerDeg, z = Math.cos(a); (z > 0 ? front : behind).push({ n, x, z }); });
      const drawMoon = (m) => { if (Math.abs(m.x - cx) < R && m.z < 0) return; c.fillStyle = '#f8fafc'; c.beginPath(); c.arc(m.x, cy, Math.max(1.3, R * .045), 0, TAU); c.fill(); if (opt.labels) { c.font = `900 ${Math.max(10, Math.min(14, R * .14))}px system-ui`; c.fillStyle = '#c7d2fe'; c.textAlign = 'center'; c.fillText(m.n, m.x, cy + Math.max(14, R * .2)); } };
      behind.forEach(drawMoon);
      const g = c.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R); g.addColorStop(0, '#fbe7c6'); g.addColorStop(1, '#c49a6c');
      c.fillStyle = g; c.beginPath(); c.ellipse(cx, cy, R, R * .93, 0, 0, TAU); c.fill();
      c.save(); c.beginPath(); c.ellipse(cx, cy, R, R * .93, 0, 0, TAU); c.clip();
      for (const [y, hh, col] of [[-.55, .1, 'rgba(150,100,60,.45)'], [-.25, .16, 'rgba(160,95,55,.6)'], [.12, .18, 'rgba(160,95,55,.6)'], [.45, .1, 'rgba(150,100,60,.4)'], [.7, .08, 'rgba(140,110,80,.3)']]) { c.fillStyle = col; c.beginPath(); for (let x = -R; x <= R; x += R / 20) c.lineTo(cx + x, cy + y * R + Math.sin(x / R * 9 + y * 5) * R * .015); for (let x = R; x >= -R; x -= R / 20) c.lineTo(cx + x, cy + (y + hh) * R + Math.sin(x / R * 7 + y * 3) * R * .015); c.closePath(); c.fill(); }
      c.fillStyle = 'rgba(200,80,50,.85)'; c.beginPath(); c.ellipse(cx + R * .35, cy + R * .28, R * .16, R * .09, 0, 0, TAU); c.fill();
      const lg = c.createRadialGradient(cx, cy, R * .6, cx, cy, R); lg.addColorStop(0, 'rgba(0,0,0,0)'); lg.addColorStop(1, 'rgba(0,0,0,.35)'); c.fillStyle = lg; c.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      c.restore();
      front.forEach(drawMoon);
      if (opt.labels && D > 80) { c.font = `900 ${Math.max(11, D * .045)}px system-ui`; c.fillStyle = '#fecaca'; c.textAlign = 'left'; c.fillText(T('Vết Đỏ Lớn', 'Great Red Spot'), cx + R * .55, cy + R * .55); }
    }
    function renderMars(c, D, opt) {
      const R = D / 2, cx = c.canvas.width / 2, cy = c.canvas.height / 2;
      const g = c.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R); g.addColorStop(0, '#ffb072'); g.addColorStop(1, '#b4532a');
      c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.fill();
      c.save(); c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.clip();
      c.fillStyle = 'rgba(90,40,25,.4)'; for (const [x, y, rx, ry] of [[-.2, .05, .4, .14], [.3, -.1, .25, .18], [.05, .35, .3, .1]]) { c.beginPath(); c.ellipse(cx + x * R, cy + y * R, rx * R, ry * R, .3, 0, TAU); c.fill(); }
      c.fillStyle = 'rgba(255,255,255,.92)'; c.beginPath(); c.ellipse(cx, cy - R * .88, R * .38, R * .16, 0, 0, TAU); c.fill();
      c.restore();
      if (opt.labels && D > 60) { c.font = `900 ${Math.max(11, D * .07)}px system-ui`; c.fillStyle = '#e0f2fe'; c.textAlign = 'center'; c.fillText(T('Chỏm băng cực', 'Polar cap'), cx, cy - R * 1.15); }
    }
    function renderVenus(c, D) {
      const R = D / 2, cx = c.canvas.width / 2, cy = c.canvas.height / 2, k = Math.cos(.32 * Math.PI);
      const gg = c.createRadialGradient(cx, cy, R * .5, cx, cy, R * 1.8); gg.addColorStop(0, 'rgba(255,250,220,.35)'); gg.addColorStop(1, 'rgba(255,250,220,0)'); c.fillStyle = gg; c.beginPath(); c.arc(cx, cy, R * 1.8, 0, TAU); c.fill();
      c.fillStyle = '#fffbea'; c.beginPath();
      for (let i = 0; i <= 40; i++) { const t = -Math.PI / 2 + Math.PI * i / 40; const x = cx + Math.cos(t) * R, y = cy + Math.sin(t) * R; if (i) c.lineTo(x, y); else c.moveTo(x, y); }
      for (let i = 40; i >= 0; i--) { const t = -Math.PI / 2 + Math.PI * i / 40; c.lineTo(cx + k * Math.cos(t) * R, cy + Math.sin(t) * R); }
      c.closePath(); c.fill();
    }
    function renderM42(c, D, opt) {
      const R = D / 2, cx = c.canvas.width / 2, cy = c.canvas.height / 2;
      for (const [x, y, r, col] of [[0, 0, .7, 'rgba(244,114,182,.55)'], [-.25, -.15, .55, 'rgba(45,212,191,.38)'], [.25, .2, .6, 'rgba(244,63,94,.45)'], [.05, -.05, .3, 'rgba(255,240,245,.8)'], [-.4, .3, .45, 'rgba(192,132,252,.35)']]) { const g = c.createRadialGradient(cx + x * R, cy + y * R, 0, cx + x * R, cy + y * R, r * R); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.beginPath(); c.arc(cx + x * R, cy + y * R, r * R, 0, TAU); c.fill(); }
      c.strokeStyle = 'rgba(253,164,175,.4)'; c.lineWidth = R * .07; for (const sd of [-1, 1]) { c.beginPath(); c.moveTo(cx, cy); c.quadraticCurveTo(cx + sd * R * .5, cy - R * .5, cx + sd * R * .9, cy - R * .1); c.stroke(); }
      for (const [x, y] of [[-.03, -.02], [.03, -.03], [.0, .03], [.04, .02]]) { c.fillStyle = '#fff'; c.beginPath(); c.arc(cx + x * R, cy + y * R, Math.max(1.2, R * .012), 0, TAU); c.fill(); }
      if (opt.labels && D > 200) { c.font = `900 ${Math.max(11, D * .025)}px system-ui`; c.fillStyle = '#fbcfe8'; c.textAlign = 'center'; c.fillText(T('Hình Thang (4 sao trẻ)', 'The Trapezium'), cx, cy + R * .12); }
    }
    const PLEI = [[3.79, 24.11, 2.9, 'Alcyone'], [3.82, 24.05, 3.6, 'Atlas'], [3.75, 24.11, 3.7, 'Electra'], [3.76, 24.37, 3.9, 'Maia'], [3.77, 23.95, 4.1, 'Merope'], [3.75, 24.47, 4.3, 'Taygeta'], [3.82, 24.14, 5.0, 'Pleione'], [3.74, 24.29, 5.4, 'Celaeno'], [3.75, 24.55, 5.8, 'Asterope']];
    function renderPleiades(c, D, opt) {
      const cx = c.canvas.width / 2, cy = c.canvas.height / 2, k = D / 1.6;
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, D * .5); g.addColorStop(0, 'rgba(147,197,253,.14)'); g.addColorStop(1, 'rgba(147,197,253,0)'); c.fillStyle = g; c.beginPath(); c.arc(cx, cy, D * .5, 0, TAU); c.fill();
      reseed(77); for (let i = 0; i < 40; i++) { const x = cx + (srand() - .5) * D * .9, y = cy + (srand() - .5) * D * .9; c.fillStyle = 'rgba(191,219,254,.7)'; c.beginPath(); c.arc(x, y, .8 + srand() * .8, 0, TAU); c.fill(); }
      for (const [ra, dec, mag, n] of PLEI) {
        const x = cx - (ra - 3.78) * 15 * Math.cos(24.1 * Math.PI / 180) * k, y = cy - (dec - 24.2) * k, r = Math.max(1.4, (6.5 - mag) * D * .004);
        const gg = c.createRadialGradient(x, y, 0, x, y, r * 6); gg.addColorStop(0, 'rgba(191,219,254,.55)'); gg.addColorStop(1, 'rgba(191,219,254,0)'); c.fillStyle = gg; c.beginPath(); c.arc(x, y, r * 6, 0, TAU); c.fill();
        c.fillStyle = '#eef4ff'; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
        c.strokeStyle = 'rgba(219,234,254,.5)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x - r * 4, y); c.lineTo(x + r * 4, y); c.moveTo(x, y - r * 4); c.lineTo(x, y + r * 4); c.stroke();
        if (opt.labels && D > 180 && mag < 4.5) { c.font = `900 ${Math.max(10, Math.min(13, D * .02))}px system-ui`; c.fillStyle = '#bfdbfe'; c.textAlign = 'left'; c.fillText(n, x + r * 3, y - r * 2); }
      }
    }
    function renderM31(c, D, opt) {
      const cx = c.canvas.width / 2, cy = c.canvas.height / 2;
      c.save(); c.translate(cx, cy); c.rotate(-.6);
      for (const [rx, ry, a] of [[.5, .15, .22], [.35, .1, .3], [.2, .06, .45], [.08, .035, .75], [.03, .02, 1]]) { const g = c.createRadialGradient(0, 0, 0, 0, 0, rx * D); g.addColorStop(0, `rgba(255,244,214,${a})`); g.addColorStop(1, 'rgba(255,244,214,0)'); c.save(); c.scale(1, ry / rx); c.fillStyle = g; c.beginPath(); c.arc(0, 0, rx * D, 0, TAU); c.fill(); c.restore(); }
      c.strokeStyle = 'rgba(30,20,10,.25)'; c.lineWidth = D * .008; for (const s of [.18, .28]) { c.beginPath(); c.ellipse(0, D * .01, s * D, s * D * .28, 0, Math.PI * 1.05, Math.PI * 1.95); c.stroke(); }
      c.restore();
      for (const [x, y, r] of [[.04, .07, .015], [-.12, -.16, .025]]) { const g = c.createRadialGradient(cx + x * D, cy + y * D, 0, cx + x * D, cy + y * D, r * D); g.addColorStop(0, 'rgba(255,244,214,.45)'); g.addColorStop(1, 'rgba(255,244,214,0)'); c.fillStyle = g; c.beginPath(); c.arc(cx + x * D, cy + y * D, r * D, 0, TAU); c.fill(); }
      if (opt.labels && D > 150) { c.font = `900 ${Math.max(11, D * .03)}px system-ui`; c.fillStyle = '#fde68a'; c.textAlign = 'center'; c.fillText(T('Lõi thiên hà', 'Galaxy core'), cx, cy - D * .06); }
    }
    let eyeCacheKey = '';
    // vẽ 1 khung thị kính đầy đủ (dùng chung cho tab 1 và 3)
    function eyepiece(ctx, w, h, st, opt) {
      const t = TG[st.target], Re = Math.min(w * .44, h * .44), ecx = w / 2, ecy = h / 2;
      const fov = 52 / st.mag, ppd = (2 * Re) / fov;
      ctx.fillStyle = '#05060c'; ctx.fillRect(0, 0, w, h);
      ctx.save(); ctx.beginPath(); ctx.arc(ecx, ecy, Re, 0, TAU); ctx.clip();
      const sky = ctx.createRadialGradient(ecx, ecy, 0, ecx, ecy, Re); sky.addColorStop(0, t.id === 'venus' ? '#1e2a4a' : '#0a0f22'); sky.addColorStop(1, '#03040a'); ctx.fillStyle = sky; ctx.fillRect(ecx - Re, ecy - Re, 2 * Re, 2 * Re);
      // sao nền (di chuyển theo độ lệch)
      reseed(t.id.length * 131 + 9);
      for (let i = 0; i < 90; i++) { const dx = (srand() - .5) * 3.2 * Math.max(fov, .4), dy = (srand() - .5) * 3.2 * Math.max(fov, .4), m = srand(); const x = ecx + (dx + st.ox) * ppd, y = ecy + (dy + st.oy) * ppd; if (Math.hypot(x - ecx, y - ecy) > Re) continue; ctx.fillStyle = `rgba(255,255,255,${.35 + m * .55})`; ctx.beginPath(); ctx.arc(x, y, .6 + m * 1.1, 0, TAU); ctx.fill(); }
      const D = t.deg * ppd;
      const tx = ecx + st.ox * ppd + (opt.seeing && st.mag > 180 && !reduceMotion ? Math.sin(clock * 9) * st.mag * .004 : 0), ty = ecy + st.oy * ppd + (opt.seeing && st.mag > 180 && !reduceMotion ? Math.cos(clock * 7) * st.mag * .004 : 0);
      const span = t.id === 'jupiter' ? Math.max(D * 1.4, .4 * ppd) : t.id === 'saturn' ? D * 8 : t.id === 'pleiades' ? D * 1.1 : t.id === 'm42' ? D * 1.2 : D * 1.3;
      const size = Math.ceil(Math.min(Math.max(span, 8), 2600));
      if (D > 1.2 && size > 2 && Math.abs(st.ox * ppd) < Re + size && Math.abs(st.oy * ppd) < Re + size) {
        const ckey = [t.id, size, Math.round(D * 2), opt.labels, lang, t.id === 'jupiter' ? Math.floor(clock * 6) : 0].join('|');
        if (ckey !== eyeCacheKey) {
          eyeCacheKey = ckey;
          if (off.width !== size || off.height !== size) { off.width = size; off.height = size; } else offCtx.clearRect(0, 0, size, size);
          const fn = { moon: renderMoon, saturn: renderSaturn, jupiter: renderJupiter, mars: renderMars, venus: renderVenus, m42: renderM42, pleiades: renderPleiades, m31: renderM31 }[t.id];
          fn(offCtx, D, { labels: opt.labels }, clock, ppd);
        }
        const blur = Math.abs(st.focus - st.bestF) / 100 * Math.min(18, 4 + D * .08);
        if (blur > .4 && 'filter' in ctx) {
          ctx.save(); ctx.filter = `blur(${blur.toFixed(1)}px)`; ctx.drawImage(off, tx - size / 2, ty - size / 2); ctx.restore();
        } else if (blur > .4) {
          const f = 1 + blur * .6, sw = Math.max(2, Math.round(size / f));
          if (off2.width !== sw) { off2.width = sw; off2.height = sw; } else off2Ctx.clearRect(0, 0, sw, sw);
          off2Ctx.imageSmoothingEnabled = true; off2Ctx.drawImage(off, 0, 0, sw, sw);
          ctx.imageSmoothingEnabled = true; ctx.globalAlpha = .55; ctx.drawImage(off2, tx - size / 2 - blur * .5, ty - size / 2, size, size); ctx.drawImage(off2, tx - size / 2 + blur * .5, ty - size / 2, size, size); ctx.globalAlpha = 1;
        } else ctx.drawImage(off, tx - size / 2, ty - size / 2);
      }
      ctx.restore();
      // vành thị kính
      const vg = ctx.createRadialGradient(ecx, ecy, Re * .82, ecx, ecy, Re * 1.02); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.92)'); ctx.fillStyle = vg; ctx.beginPath(); ctx.arc(ecx, ecy, Re * 1.02, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(ecx, ecy, Re + 5, 0, TAU); ctx.stroke();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ecx, ecy, Re + 10, 0, TAU); ctx.stroke();
      return { Re, ecx, ecy, fov, ppd, D };
    }

    /* =====================================================================
       1. NGẮM QUA KÍNH
       ===================================================================== */
    // Keep telescope achievements separate for each signed-in learner.
    // Guests may explore and earn badges during this visit, but don't persist them.
    const badgeUserId = String(context && context.badgeUserId || '').trim();
    const BKEY = badgeUserId ? `epsilonEdu.scopeBadges.v1.${badgeUserId}` : '';
    let badges = {}; try { if (BKEY) badges = JSON.parse(window.localStorage.getItem(BKEY) || '{}') || {}; } catch (_) { badges = {}; }
    const RANGE = { moon: [.18, 1.9], saturn: [.12, 1.6], jupiter: [.1, 1.6], mars: [.06, 1.6], venus: [.08, 1.6], m42: [.3, 2.2], pleiades: [.35, 2.2], m31: [.3, 2.6] };
    let vw = { target: 'moon', zoom: 25, mag: 40, focus: 20, bestF: 58, ox: 0, oy: 0, track: true, labels: true, hold: 0, banner: null, drag: null, geo: null, infoKey: '', confetti: [] };
    const vwC = mk('c_view', (w) => clamp(w * .7, 320, 560));
    const magOf = (v) => Math.round(15 * Math.pow(400 / 15, v / 100));
    function chime() {
      try { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; if (!vw.ac) { vw.ac = new AC(); cleanupFns.push(() => { try { vw.ac.close(); } catch (_) {} }); } const a = vw.ac, t = a.currentTime;
        [784, 988, 1319].forEach((f, i) => { const o = a.createOscillator(), g = a.createGain(); o.frequency.value = f; g.gain.setValueAtTime(.0001, t + i * .1); g.gain.exponentialRampToValueAtTime(.18, t + i * .1 + .02); g.gain.exponentialRampToValueAtTime(.0001, t + i * .1 + .5); o.connect(g); g.connect(a.destination); o.start(t + i * .1); o.stop(t + i * .1 + .55); });
      } catch (_) {}
    }
    function vwFrame(dt) {
      const { w, h, ctx } = vwC; if (!w) return;
      vw.mag = magOf(vw.zoom);
      const fov = 52 / vw.mag;
      if (!vw.track && !vw.drag) vw.ox -= .0042 * dt;
      const g = vw.geo = eyepiece(ctx, w, h, vw, { labels: vw.labels, seeing: true });
      // ống tìm (finder) nhỏ
      const fr = Math.min(52, w * .09), fx = fr + 14, fy = fr + 14, ffov = 6;
      ctx.fillStyle = 'rgba(15,23,42,.85)'; ctx.beginPath(); ctx.arc(fx, fy, fr, 0, TAU); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeStyle = 'rgba(248,113,113,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(fx - fr, fy); ctx.lineTo(fx + fr, fy); ctx.moveTo(fx, fy - fr); ctx.lineTo(fx, fy + fr); ctx.stroke();
      ctx.strokeStyle = 'rgba(253,224,71,.8)'; ctx.beginPath(); ctx.arc(fx, fy, Math.max(2, fov / ffov * fr), 0, TAU); ctx.stroke();
      const tdx = clamp(vw.ox / ffov * 2 * fr, -fr + 4, fr - 4), tdy = clamp(vw.oy / ffov * 2 * fr, -fr + 4, fr - 4);
      ctx.font = emojiFont(12); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(TG[vw.target].icon, fx + tdx, fy + tdy);
      textLight(ctx, T('Ống tìm', 'Finder'), fx, fy + fr + 10, '#94a3b8', 10, 'center', 800);
      // độ lệch quá xa
      const offPx = Math.hypot(vw.ox, vw.oy) * g.ppd;
      if (offPx > g.Re) { const a = Math.atan2(vw.oy, vw.ox); arrow(ctx, g.ecx + Math.cos(a) * g.Re * .6, g.ecy + Math.sin(a) * g.Re * .6, g.ecx + Math.cos(a) * g.Re * .85, g.ecy + Math.sin(a) * g.Re * .85, '#fde047', 4, 14); bubble(ctx, T('Thiên thể trôi ra ngoài rồi! Kéo kính lại hoặc bấm Căn giữa', 'It drifted out! Drag back or press Re-centre'), g.ecx, g.ecy, 12, '#fff', '#b45309'); }
      // điều kiện huy hiệu
      const ratio = g.D / (2 * g.Re), rg = RANGE[vw.target], fErr = Math.abs(vw.focus - vw.bestF), centred = Math.hypot(vw.ox, vw.oy) < fov * .18;
      const good = fErr < 7 && centred && ratio >= rg[0] && ratio <= rg[1];
      if (good) vw.hold += dt; else vw.hold = 0;
      if (good && vw.hold > .9 && !badges[vw.target]) { badges[vw.target] = Date.now(); try { if (BKEY) window.localStorage.setItem(BKEY, JSON.stringify(badges)); } catch (_) {} vw.banner = { t: 0, id: vw.target }; for (let i = 0; i < 40; i++) vw.confetti.push({ x: g.ecx, y: g.ecy, vx: rand(-1, 1) * 260, vy: rand(-1.3, .2) * 260, t: 0, c: ['#f472b6', '#fde047', '#60a5fa', '#34d399'][i % 4] }); chime(); vwBook(); vw.infoKey = ''; }
      for (const p of vw.confetti) { p.t += dt; p.vy += 420 * dt; p.x += p.vx * dt; p.y += p.vy * dt; ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - p.t / 1.6); ctx.fillRect(p.x, p.y, 5, 8); } ctx.globalAlpha = 1;
      vw.confetti = vw.confetti.filter((p) => p.t < 1.6);
      if (vw.banner) { vw.banner.t += dt; bubble(ctx, T(`🏅 Huy hiệu mới: ${L(TG[vw.banner.id]).name}!`, `🏅 New badge: ${L(TG[vw.banner.id]).name}!`), w / 2, h - 26, 15, '#fff', '#6d28d9'); if (vw.banner.t > 3) vw.banner = null; }
      // đồng hồ nét
      const q = fErr < 7 ? T('Nét căng ✨', 'Sharp ✨') : fErr < 20 ? T('Hơi mờ', 'A bit blurry') : T('Mờ, hãy vặn núm chỉnh nét', 'Blurry: turn the focus knob');
      ctx.fillStyle = 'rgba(15,23,42,.8)'; rr(ctx, w - 168, 10, 158, 46, 10); ctx.fill();
      textLight(ctx, `🔭 ${vw.mag}×`, w - 160, 24, '#fde68a', 14, 'left', 900);
      textLight(ctx, q, w - 160, 44, fErr < 7 ? '#86efac' : fErr < 20 ? '#fde68a' : '#fca5a5', 11.5, 'left', 900);
      if (good && !badges[vw.target]) textLight(ctx, T('Giữ yên nhé…', 'Hold steady…'), w / 2, 22, '#fde68a', 13, 'center', 900);
      setText('zoomTxt', `${vw.mag}× · ${T('trường nhìn', 'field')} ${fov < 1 ? fov.toFixed(2) : fov.toFixed(1)}°`);
      setText('hud_view', `${TG[vw.target].icon} ${L(TG[vw.target]).name} – ${q}${ratio < rg[0] ? T(' – hãy phóng to thêm', ' – zoom in more') : ratio > rg[1] ? T(' – hãy giảm phóng đại', ' – zoom out a little') : ''}`);
      vwInfo();
    }
    vwC.c.addEventListener('pointerdown', (e) => { const p = localPoint(vwC.c, e); vw.drag = { x: p.x, y: p.y, ox: vw.ox, oy: vw.oy }; try { vwC.c.setPointerCapture(e.pointerId); } catch (_) {} });
    vwC.c.addEventListener('pointermove', (e) => { if (!vw.drag || !vw.geo) return; const p = localPoint(vwC.c, e); vw.ox = vw.drag.ox + (p.x - vw.drag.x) / vw.geo.ppd; vw.oy = vw.drag.oy + (p.y - vw.drag.y) / vw.geo.ppd; });
    const vwUp = () => { vw.drag = null; }; vwC.c.addEventListener('pointerup', vwUp); vwC.c.addEventListener('pointercancel', vwUp);
    function vwPick(id) { vw.target = id; vw.ox = rand(-.3, .3) * 52 / vw.mag; vw.oy = rand(-.2, .2) * 52 / vw.mag; vw.bestF = Math.round(rand(30, 80)); vw.focus = clamp(vw.bestF + (Math.random() < .5 ? -1 : 1) * rand(25, 40), 0, 100); $('vwFocus').value = String(vw.focus); pressGroup('[data-tg]', 'tg', id); vw.infoKey = ''; }
    function vwChips() { $('vwTargets').innerHTML = TGT.map((t) => `<button type="button" class="food-btn" data-tg="${t.id}" aria-pressed="${t.id === vw.target}">${t.icon} <span></span></button>`).join(''); root.querySelectorAll('[data-tg]').forEach((b) => { b.querySelector('span').textContent = L(TG[b.dataset.tg]).name.split(' (')[0]; }); }
    $('vwTargets').addEventListener('click', (e) => { const b = e.target.closest('[data-tg]'); if (!b) return; cancelSpeech(); vwPick(b.dataset.tg); });
    $('vwZoom').addEventListener('input', () => { vw.zoom = +$('vwZoom').value; });
    $('vwFocus').addEventListener('input', () => { vw.focus = +$('vwFocus').value; });
    $('vwTrack').onclick = () => { vw.track = !vw.track; $('vwTrack').setAttribute('aria-pressed', String(vw.track)); vw.infoKey = ''; };
    $('vwLabels').onclick = () => { vw.labels = !vw.labels; $('vwLabels').setAttribute('aria-pressed', String(vw.labels)); };
    $('vwCenter').onclick = () => { vw.ox = 0; vw.oy = 0; };
    function vwBook() {
      const n = Object.keys(badges).length;
      $('vwBook').innerHTML = `<div class="badge-grid">${TGT.map((t) => `<div class="badge${badges[t.id] ? ' got' : ''}" title=""><span class="bi">${badges[t.id] ? t.icon : '❔'}</span><span class="bn"></span>${badges[t.id] ? '<span class="bs">⭐</span>' : ''}</div>`).join('')}</div>
        <p class="score" style="margin:0">${T(`Đã sưu tầm ${n}/${TGT.length} huy hiệu`, `Collected ${n}/${TGT.length} badges`)}${n === TGT.length ? T(' 🏆 Nhà thiên văn nhí!', ' 🏆 Junior astronomer!') : ''}</p>
        <p class="muted" style="margin:0">${T('Chỉnh cho nét, căn giữa và phóng đại vừa phải để nhận huy hiệu.', 'Get it sharp, centred and at the right zoom to earn a badge.')}</p>`;
      $('vwBook').querySelectorAll('.badge').forEach((el, i) => { el.querySelector('.bn').textContent = badges[TGT[i].id] ? L(TGT[i]).name.split(' (')[0] : '???'; });
    }
    function vwInfo() {
      const key = lang + vw.target + vw.track + !!badges[vw.target]; if (key === vw.infoKey) return; vw.infoKey = key;
      const t = TG[vw.target], d = L(t);
      const notes = [['fun', '✨ ' + d.fun], ['tip', `💡 ${d.tip} ${T(`(Nên dùng khoảng ${t.best[0]}× – ${t.best[1]}×.)`, `(Try about ${t.best[0]}× – ${t.best[1]}×.)`)}`]];
      if (!vw.track) notes.push(['warn', T('🌍 Vì Trái Đất tự quay, thiên thể trôi dần ra khỏi thị kính. Kính có động cơ "bám theo" sẽ tự quay theo.', '🌍 Earth spins, so objects drift out of view. A tracking motor turns the telescope to follow.')]);
      if (['saturn', 'jupiter', 'mars', 'venus'].includes(t.id)) notes.push(['tip', T('🔎 Hình hành tinh trong tool được vẽ to hơn thật khoảng 3 lần cho dễ quan sát.', '🔎 Planets here are drawn about 3× larger than real for easier viewing.')]);
      infoBox($('info_view'), { emo: t.icon, title: d.name, sub: `${T('Khoảng cách', 'Distance')}: ${d.dist}${badges[t.id] ? T(' · 🏅 đã có huy hiệu', ' · 🏅 badge earned') : ''}`, rows: [[T('Em sẽ thấy', 'You’ll see'), d.see]], notes });
    }
    TABS.view = { frame: vwFrame, refresh() { vwChips(); vwBook(); vw.infoKey = ''; }, show() { eyeCacheKey = ''; } };
    vwPick('moon');
    QUIZZES.push(makeQuiz($('quiz_view'), {
      vi: [
        { q: 'Các vùng tối trên Mặt Trăng được gọi là gì?', a: ['Biển (thật ra là đá bazan khô)', 'Hồ nước thật', 'Rừng cây', 'Bóng mây'], why: 'Người xưa tưởng là biển nên gọi tên như vậy.' },
        { q: 'Galileo đã phát hiện điều gì quanh Sao Mộc năm 1610?', a: ['4 mặt trăng lớn', 'Vành đai', 'Nước', 'Sự sống'], why: 'Io, Europa, Ganymede, Callisto gọi là các mặt trăng Galileo.' },
        { q: 'Vì sao khi tắt "bám theo", thiên thể trôi ra khỏi kính?', a: ['Vì Trái Đất tự quay', 'Vì thiên thể bỏ chạy', 'Vì kính bị hỏng', 'Vì có gió'], why: 'Trái Đất quay nên bầu trời như trôi qua kính.' },
        { q: 'Khe tối chia vành đai Sao Thổ tên là gì?', a: ['Khe Cassini', 'Khe Galileo', 'Vết Đỏ Lớn', 'Biển Yên Tĩnh'], why: 'Nhà thiên văn Cassini phát hiện khe này năm 1675.' },
        { q: 'Không bao giờ được dùng kính thiên văn để nhìn vào đâu?', a: ['Mặt Trời', 'Mặt Trăng', 'Sao Thổ', 'Tinh vân'], why: 'Nhìn Mặt Trời qua kính có thể làm hỏng mắt ngay lập tức.' }
      ],
      en: [
        { q: 'What are the dark patches on the Moon called?', a: ['Seas (really dry basalt)', 'Real lakes', 'Forests', 'Cloud shadows'], why: 'People once thought they were seas.' },
        { q: 'What did Galileo find around Jupiter in 1610?', a: ['Four big moons', 'Rings', 'Water', 'Life'], why: 'Io, Europa, Ganymede and Callisto are the Galilean moons.' },
        { q: 'Why does an object drift away when tracking is off?', a: ['Earth spins', 'The object runs off', 'The telescope breaks', 'Wind'], why: 'Earth’s spin makes the sky slide past.' },
        { q: 'What is the dark gap in Saturn’s rings called?', a: ['The Cassini Division', 'The Galileo Gap', 'The Great Red Spot', 'The Sea of Tranquillity'], why: 'Cassini found it in 1675.' },
        { q: 'What must you never look at through a telescope?', a: ['The Sun', 'The Moon', 'Saturn', 'A nebula'], why: 'The Sun through a telescope can damage eyes instantly.' }
      ]
    }));

    /* =====================================================================
       2. KÍNH HOẠT ĐỘNG THẾ NÀO?
       ===================================================================== */
    let hw = { type: 'ref', F: 900, f: 10, D: 90, infoKey: '' };
    const hwC = mk('c_how', (w) => clamp(w * .5, 260, 420));
    function hwFrame() {
      const { w, h, ctx } = hwC; if (!w) return;
      ctx.fillStyle = '#0b1030'; ctx.fillRect(0, 0, w, h);
      const mag = Math.round(hw.F / hw.f), maxU = hw.D * 2, cy = h * .5, ap = clamp(hw.D / 200, .3, 1) * h * .3;
      const dash = -(clock * 40) % 20;
      ctx.save(); ctx.setLineDash([10, 10]); ctx.lineDashOffset = dash; ctx.strokeStyle = 'rgba(253,224,71,.85)'; ctx.lineWidth = 2;
      if (hw.type === 'ref') {
        const x0 = w * .14, scale = (w * .62) / 1200, xf = x0 + hw.F * scale, xe = xf + hw.f * scale * 6;
        ctx.restore(); ctx.fillStyle = '#334155'; rr(ctx, x0 - 6, cy - ap - 8, xe - x0 + 20, ap * 2 + 16, 10); ctx.globalAlpha = .45; ctx.fill(); ctx.globalAlpha = 1;
        ctx.save(); ctx.setLineDash([10, 10]); ctx.lineDashOffset = dash; ctx.strokeStyle = 'rgba(253,224,71,.85)'; ctx.lineWidth = 2;
        for (const k of [-.85, 0, .85]) { const y = cy + k * ap; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(x0, y); ctx.lineTo(xf, cy); ctx.lineTo(xe, cy - k * ap * hw.f * 6 / hw.F * 1.2); ctx.lineTo(w, cy - k * ap * .35); ctx.stroke(); }
        ctx.restore();
        ctx.fillStyle = 'rgba(147,197,253,.75)'; ctx.beginPath(); ctx.ellipse(x0, cy, 9, ap + 6, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(147,197,253,.75)'; ctx.beginPath(); ctx.ellipse(xe, cy, 5, ap * .35 + 4, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.arc(xf, cy, 4, 0, TAU); ctx.fill();
        label(ctx, T('Vật kính (thấu kính lớn)', 'Objective lens'), x0, cy + ap + 26, '#bfdbfe', 11.5); label(ctx, T('Tiêu điểm', 'Focus'), xf, cy - 16, '#fbcfe8', 11.5); label(ctx, T('Thị kính', 'Eyepiece'), xe, cy + ap * .35 + 24, '#bfdbfe', 11.5);
        ctx.font = emojiFont(24); ctx.textAlign = 'center'; ctx.fillText('👁️', Math.min(w - 20, xe + 30), cy);
      } else {
        const xm = w * .82, xs = w * .3, scale = (xm - xs) / 1200;
        ctx.restore(); ctx.fillStyle = '#334155'; ctx.globalAlpha = .45; rr(ctx, w * .1, cy - ap - 8, xm - w * .1 + 14, ap * 2 + 16, 10); ctx.fill(); ctx.globalAlpha = 1;
        const xf = xm - hw.F * scale;
        ctx.save(); ctx.setLineDash([10, 10]); ctx.lineDashOffset = dash; ctx.strokeStyle = 'rgba(253,224,71,.85)'; ctx.lineWidth = 2;
        const sx = Math.max(w * .14, xf + 20);
        for (const k of [-.85, 0, .85]) { const y = cy + k * ap; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(xm, y); ctx.lineTo(sx, cy + k * ap * (sx - xf) / (xm - xf)); ctx.lineTo(sx, cy - ap - 30); ctx.stroke(); }
        ctx.restore();
        ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(xm, cy - ap - 4); ctx.quadraticCurveTo(xm - 14, cy, xm, cy + ap + 4); ctx.stroke();
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(sx - 12, cy + 12); ctx.lineTo(sx + 12, cy - 12); ctx.stroke();
        ctx.fillStyle = 'rgba(147,197,253,.75)'; ctx.beginPath(); ctx.ellipse(sx, cy - ap - 34, 18, 5, 0, 0, TAU); ctx.fill();
        label(ctx, T('Gương chính (gương lõm)', 'Main mirror (concave)'), xm - 10, cy + ap + 26, '#bfdbfe', 11.5); label(ctx, T('Gương phụ', 'Small mirror'), sx + 40, cy + 22, '#e2e8f0', 11.5); label(ctx, T('Thị kính', 'Eyepiece'), sx + 46, cy - ap - 34, '#bfdbfe', 11.5);
        ctx.font = emojiFont(22); ctx.textAlign = 'center'; ctx.fillText('👁️', sx, Math.max(14, cy - ap - 56));
      }
      label(ctx, T('Ánh sáng từ ngôi sao →', 'Starlight →'), 12, cy - ap - 22, '#fde68a', 11.5, 'left');
      ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, w - 190, h - 62, 180, 52, 10); ctx.fill();
      textLight(ctx, `${hw.F} ÷ ${hw.f} = ${mag}×`, w - 100, h - 46, '#6d28d9', 16, 'center', 900);
      textLight(ctx, mag > maxU ? T(`⚠️ Quá mức hữu ích (~${maxU}×)`, `⚠️ Beyond useful (~${maxU}×)`) : T(`✅ Trong mức hữu ích (~${maxU}×)`, `✅ Within useful (~${maxU}×)`), w - 100, h - 24, mag > maxU ? '#dc2626' : '#15803d', 11, 'center', 900);
      hwInfo();
    }
    function hwInfo() {
      const mag = Math.round(hw.F / hw.f), key = [lang, hw.type, mag, hw.D].join('|'); if (key === hw.infoKey) return; hw.infoKey = key;
      setText('hwFTxt', `${hw.F} mm`); setText('hwDTxt', `${hw.D} mm`);
      infoBox($('info_how'), {
        emo: hw.type === 'ref' ? '🔍' : '🪞', title: hw.type === 'ref' ? T('Kính khúc xạ (dùng thấu kính)', 'Refractor (uses lenses)') : T('Kính phản xạ (dùng gương)', 'Reflector (uses mirrors)'),
        sub: T(`Độ phóng đại: ${mag} lần`, `Magnification: ${mag}×`),
        rows: [[T('Độ phóng đại', 'Magnification'), T(`= tiêu cự vật kính ÷ tiêu cự thị kính = ${hw.F} ÷ ${hw.f} = ${mag} lần. Thị kính càng ngắn, phóng đại càng lớn.`, `= objective focal length ÷ eyepiece = ${hw.F} ÷ ${hw.f} = ${mag}×. Shorter eyepieces magnify more.`)],
          [T('Đường kính', 'Aperture'), T(`Vật kính ${hw.D} mm. Càng to càng thu nhiều ánh sáng, thấy được vật mờ hơn. Phóng đại hữu ích tối đa khoảng ${hw.D * 2} lần.`, `${hw.D} mm. Bigger collects more light to see fainter things. Useful maximum is about ${hw.D * 2}×.`)],
          [T('Lịch sử', 'History'), hw.type === 'ref' ? T('Năm 1609, Galileo chế tạo kính thấu kính và lần đầu chĩa lên bầu trời.', 'In 1609 Galileo built a lens telescope and pointed it at the sky.') : T('Năm 1668, Isaac Newton làm kính dùng gương lõm, tránh được viền màu của thấu kính.', 'In 1668 Isaac Newton built a mirror telescope, avoiding lens colour fringes.')]],
        notes: [['warn', T('⚠️ Không bao giờ nhìn Mặt Trời qua kính thiên văn, ống nhòm hay mắt thường. Có thể bị mù ngay lập tức.', '⚠️ Never look at the Sun through a telescope, binoculars or with bare eyes. It can blind you instantly.')]]
      });
      setText('hud_how', T(`🔭 Phóng đại ${mag}×`, `🔭 Magnification ${mag}×`));
    }
    root.querySelectorAll('[data-type]').forEach((b) => b.addEventListener('click', () => { hw.type = b.dataset.type; pressGroup('[data-type]', 'type', hw.type); }));
    root.querySelectorAll('[data-ep]').forEach((b) => b.addEventListener('click', () => { hw.f = +b.dataset.ep; pressGroup('[data-ep]', 'ep', hw.f); }));
    $('hwF').addEventListener('input', () => { hw.F = +$('hwF').value; });
    $('hwD').addEventListener('input', () => { hw.D = +$('hwD').value; });
    TABS.how = { frame: hwFrame, refresh() { hw.infoKey = ''; } };
    QUIZZES.push(makeQuiz($('quiz_how'), {
      vi: [
        { q: 'Độ phóng đại của kính được tính thế nào?', a: ['Tiêu cự vật kính ÷ tiêu cự thị kính', 'Cộng hai tiêu cự', 'Nhân đường kính với 10', 'Không tính được'], why: 'Ví dụ 900 mm ÷ 10 mm = 90 lần.' },
        { q: 'Vật kính càng to thì sao?', a: ['Thu nhiều ánh sáng, thấy vật mờ hơn', 'Kính nhẹ hơn', 'Phóng đại nhỏ đi', 'Không khác gì'], why: 'Như cái phễu hứng được nhiều ánh sáng hơn.' },
        { q: 'Kính phản xạ dùng gì để hội tụ ánh sáng?', a: ['Gương lõm', 'Thấu kính lõm', 'Bóng đèn', 'Nam châm'], why: 'Newton dùng gương lõm năm 1668.' },
        { q: 'Ai lần đầu chĩa kính thiên văn lên bầu trời năm 1609?', a: ['Galileo', 'Newton', 'Edison', 'Bell'], why: 'Galileo thấy miệng hố Mặt Trăng và các mặt trăng Sao Mộc.' },
        { q: 'Thay thị kính 20 mm bằng 10 mm, độ phóng đại thế nào?', a: ['Tăng gấp đôi', 'Giảm một nửa', 'Không đổi', 'Bằng 0'], why: 'Tiêu cự thị kính nhỏ đi một nửa nên phóng đại gấp đôi.' }
      ],
      en: [
        { q: 'How is magnification worked out?', a: ['Objective focal length ÷ eyepiece focal length', 'Add the two', 'Aperture × 10', 'It can’t be'], why: 'For example 900 mm ÷ 10 mm = 90×.' },
        { q: 'A bigger objective…', a: ['Collects more light to see fainter things', 'Is lighter', 'Magnifies less', 'Makes no difference'], why: 'Like a bigger funnel for light.' },
        { q: 'What does a reflector use to focus light?', a: ['A concave mirror', 'A concave lens', 'A light bulb', 'A magnet'], why: 'Newton used a concave mirror in 1668.' },
        { q: 'Who first pointed a telescope at the sky in 1609?', a: ['Galileo', 'Newton', 'Edison', 'Bell'], why: 'Galileo saw Moon craters and Jupiter’s moons.' },
        { q: 'Swap a 20 mm eyepiece for 10 mm and magnification…', a: ['Doubles', 'Halves', 'Stays the same', 'Becomes zero'], why: 'Half the eyepiece focal length, twice the power.' }
      ]
    }));

    /* =====================================================================
       3. ĐỐ EM THẤY GÌ?
       ===================================================================== */
    let gs = { target: 'saturn', mag: 200, opts: [], ans: -1, score: 0, total: 0, ox: 0, oy: 0, focus: 50, bestF: 50, infoKey: '' };
    const gsC = mk('c_guess', (w) => clamp(w * .62, 300, 500));
    function gsNew() {
      let t; do { t = TGT[Math.floor(rand(0, TGT.length))].id; } while (t === gs.target && gs.total > 0);
      const tt = TG[t]; gs.target = t; gs.mag = Math.round(t === 'moon' ? rand(30, 70) : rand(tt.best[0], tt.best[1])); gs.ox = rand(-.06, .06) * 52 / gs.mag; gs.oy = rand(-.06, .06) * 52 / gs.mag; gs.focus = gs.bestF = 50; gs.ans = -1;
      gs.opts = [t, ...TGT.map((x) => x.id).filter((x) => x !== t).sort(() => Math.random() - .5).slice(0, 3)].sort(() => Math.random() - .5);
      eyeCacheKey = ''; gsRender(); gsInfo(true);
    }
    function gsFrame() { const { w, h, ctx } = gsC; if (!w) return; eyepiece(ctx, w, h, gs, { labels: gs.ans >= 0, seeing: false }); if (gs.ans < 0) bubble(ctx, '❓', w / 2, 26, 18); setText('hud_guess', T(`🎯 Đúng ${gs.score}/${gs.total}`, `🎯 ${gs.score}/${gs.total} correct`)); }
    function gsRender() {
      $('guessBox').innerHTML = `<div class="opt-col">${gs.opts.map((id) => `<button type="button" class="soft-btn" data-go="${id}">${TG[id].icon} <span></span></button>`).join('')}</div>
        ${gs.ans >= 0 ? `<p class="${gs.opts[gs.ans] === gs.target ? 'fun' : 'warn'}" style="margin:0"></p><button id="gsNext" class="btn main" type="button">${T('Thiên thể khác ▶', 'Next object ▶')}</button>` : ''}
        <p class="score" style="margin:0">${T(`Đúng ${gs.score}/${gs.total}`, `${gs.score}/${gs.total} correct`)}</p>`;
      $('guessBox').querySelectorAll('[data-go]').forEach((b) => { b.querySelector('span').textContent = L(TG[b.dataset.go]).name; if (gs.ans >= 0) { b.disabled = true; if (b.dataset.go === gs.target) b.setAttribute('aria-pressed', 'true'); } });
      if (gs.ans >= 0) { $('guessBox').querySelectorAll('p')[0].textContent = (gs.opts[gs.ans] === gs.target ? T('🎉 Đúng rồi! ', '🎉 Correct! ') : T(`Chưa đúng, đây là ${L(TG[gs.target]).name}. `, `Not quite, it’s ${L(TG[gs.target]).name}. `)) + L(TG[gs.target]).see; $('gsNext').onclick = () => { cancelSpeech(); gsNew(); }; }
    }
    $('guessBox').addEventListener('click', (e) => { const b = e.target.closest('[data-go]'); if (!b || gs.ans >= 0) return; cancelSpeech(); gs.ans = gs.opts.indexOf(b.dataset.go); gs.total++; if (b.dataset.go === gs.target) gs.score++; eyeCacheKey = ''; gsRender(); gsInfo(true); });
    function gsInfo(force) {
      const key = lang + gs.target + gs.ans; if (key === gs.infoKey && !force) return; gs.infoKey = key;
      if (gs.ans < 0) infoBox($('info_guess'), { emo: '🎯', title: T('Quan sát kỹ rồi đoán nhé!', 'Look closely, then guess!'), sub: T(`Độ phóng đại: ${gs.mag}×`, `Magnification: ${gs.mag}×`), rows: [[T('Gợi ý', 'Clues'), T('Có vành đai không? Có các chấm nhỏ thẳng hàng không? Là đám mây mờ hay nhiều ngôi sao?', 'Rings? Tiny dots in a line? A fuzzy cloud or many stars?')]], notes: [] });
      else { const d = L(TG[gs.target]); infoBox($('info_guess'), { emo: TG[gs.target].icon, title: d.name, sub: `${T('Khoảng cách', 'Distance')}: ${d.dist}`, rows: [[T('Em thấy', 'You saw'), d.see]], notes: [['fun', '✨ ' + d.fun]] }); }
    }
    TABS.guess = { frame: gsFrame, refresh() { if (!gs.opts.length) gsNew(); else { gsRender(); gs.infoKey = ''; gsInfo(true); } }, show() { eyeCacheKey = ''; } };
    QUIZZES.push(makeQuiz($('quiz_guess'), {
      vi: [
        { q: 'Thiên thể nào có vành đai rất đẹp?', a: ['Sao Thổ', 'Sao Hỏa', 'Mặt Trăng', 'Sao Kim'], why: 'Vành đai Sao Thổ làm từ băng và đá.' },
        { q: 'Thiên thể nào có hình lưỡi liềm như Mặt Trăng?', a: ['Sao Kim', 'Sao Mộc', 'Tua Rua', 'Sao Thổ'], why: 'Sao Kim nằm giữa Trái Đất và Mặt Trời nên có pha.' },
        { q: '"Nhà trẻ của các ngôi sao" là gì?', a: ['Tinh vân Lạp Hộ', 'Sao Hỏa', 'Mặt Trăng', 'Sao Thổ'], why: 'Các ngôi sao mới đang hình thành trong tinh vân này.' },
        { q: 'Thiên hà gần chúng ta có thể thấy bằng mắt thường ở nơi trời tối là gì?', a: ['Thiên hà Tiên Nữ', 'Tinh vân Lạp Hộ', 'Sao Thổ', 'Mặt Trăng'], why: 'Tiên Nữ cách 2,5 triệu năm ánh sáng.' },
        { q: 'Sao Hỏa có màu gì?', a: ['Đỏ cam', 'Xanh lá', 'Tím', 'Trắng tinh'], why: 'Đất Sao Hỏa nhiều gỉ sắt.' }
      ],
      en: [
        { q: 'Which object has beautiful rings?', a: ['Saturn', 'Mars', 'The Moon', 'Venus'], why: 'Saturn’s rings are ice and rock.' },
        { q: 'Which object shows a crescent like the Moon?', a: ['Venus', 'Jupiter', 'The Pleiades', 'Saturn'], why: 'Venus sits between Earth and the Sun, so it has phases.' },
        { q: 'Which is a “star nursery”?', a: ['The Orion Nebula', 'Mars', 'The Moon', 'Saturn'], why: 'New stars are forming inside it.' },
        { q: 'Which galaxy can be seen by eye from a dark site?', a: ['Andromeda', 'The Orion Nebula', 'Saturn', 'The Moon'], why: 'Andromeda is 2.5 million light-years away.' },
        { q: 'What colour is Mars?', a: ['Orange-red', 'Green', 'Purple', 'Pure white'], why: 'Mars’s soil is full of rust.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'view';
    root.querySelectorAll('.scope-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.scope-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('o-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.scope-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.scope-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.scope-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
