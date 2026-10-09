/* Epsilon Edu - Tool: Nhac cu dan toc Viet Nam: dan bau, dan tranh, sao truc, dan t'rung, trong va phach
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.vnInstruments = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "vnInstruments";
  let activeCleanup = null;

  const CSS = `
.music-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.music-tool *{box-sizing:border-box}.music-tool button,.music-tool input{font:inherit}.music-tool button{cursor:pointer}.music-tool .hidden{display:none!important}
.music-tool button:focus-visible,.music-tool canvas:focus-visible,.music-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.music-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.music-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.music-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.music-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.music-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.music-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.music-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.music-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.music-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.music-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.music-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.music-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.music-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.music-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.music-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.music-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.music-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.music-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.music-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.music-panel{width:100%}.music-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.music-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.music-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.music-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.music-tool .card-head.compact{margin-bottom:9px}
.music-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.music-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.music-tool .btn,.music-tool .soft-btn,.music-tool .segmented button,.music-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.music-tool .btn:hover,.music-tool .soft-btn:hover,.music-tool .segmented button:hover,.music-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.music-tool .btn{padding:0 12px}.music-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.music-tool .segmented{display:flex;gap:7px;margin:0}.music-tool .segmented button{padding:0 13px}
.music-tool .segmented button[aria-pressed="true"],.music-tool .soft-btn[aria-pressed="true"],.music-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.music-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.music-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.music-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.music-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.music-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.music-tool .range-control input{width:100%;accent-color:#8b5cf6}.music-tool .range-control b{color:#7c3aed;font-size:13px}
.music-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.music-tool .soft-btn{padding:0 12px}
.music-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.music-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.music-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.music-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.music-tool .info-title{display:flex;align-items:center;gap:10px}.music-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.music-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.music-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.music-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.music-tool .facts{display:grid;gap:6px;margin-top:10px}.music-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.music-tool .facts b{color:#7c3aed;font-size:13.5px}.music-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.music-tool .fun,.music-tool .warn,.music-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.music-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.music-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.music-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.music-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.music-tool .state-big.up{color:#0f766e}.music-tool .state-big.down{color:#b45309}
.music-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.music-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.music-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.music-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.music-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.music-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.music-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.music-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.music-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.music-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.music-tool .qopt:hover{filter:brightness(.985)}.music-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.music-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.music-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.music-tool .qfb,.music-tool .score{font-size:13px;font-weight:900}.music-tool .qfb.ok{color:#15803d}.music-tool .qfb.no{color:#be123c}.music-tool .score{color:#7c3aed}
.music-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.music-grid{grid-template-columns:1fr;align-items:start}.music-side{grid-template-rows:auto auto;height:auto}.music-tool .control-grid{grid-template-columns:1fr}.music-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.music-hero{flex-wrap:wrap;padding:12px}.music-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.music-tabs{grid-template-columns:1fr}.music-tabs .tab{min-height:40px}.music-card{padding:11px;border-radius:18px}.music-tool .card-head{align-items:flex-start;flex-direction:column}.music-tool .head-actions{width:100%;justify-content:space-between}.music-tool .head-actions .segmented{flex:1;min-width:0}.music-tool .head-actions .segmented button{flex:1;padding:0 8px}.music-tool .qopts{grid-template-columns:1fr}.music-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.music-tool *{transition:none!important}}

.music-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.music-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.music-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.music-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.music-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.music-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.music-tool .checklist{display:grid;gap:6px;margin-top:10px}
.music-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.music-tool .checklist .ok{color:#15803d}.music-tool .checklist .no{color:#be123c}.music-tool .checklist .wait{color:#94a3b8}
.music-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.music-tool .process span{flex:1}.music-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.music-tool .process .on{color:#0284c7}.music-tool .process i.on{color:#ec4899}
@media(max-width:640px){.music-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.music-tool .slider-pair{grid-template-columns:1fr}}

.music-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.music-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.music-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.music-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.music-tool .pulse-box{display:grid;gap:10px;margin-bottom:4px}
.music-tool #saoBlow{min-height:46px;padding:0 18px;user-select:none;-webkit-user-select:none;touch-action:none}
.music-tool #saoBlow[aria-pressed="true"]{filter:brightness(1.15);transform:scale(.98)}

.music-tabs{grid-template-columns:repeat(5,minmax(0,1fr))}
@media(max-width:640px){.music-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="music-tool" data-tool-root>
  <div class="music-hero">
    <div class="music-hero-icon" aria-hidden="true">🎶</div>
    <div>
      <p class="music-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="music-lead" data-t="lead"></p>
    </div>
    <div class="music-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="uAudioNotice" class="music-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="music-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="bau" data-t="tab_bau"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="tranh" data-t="tab_tranh"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="sao" data-t="tab_sao"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="trung" data-t="tab_trung"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="trong" data-t="tab_trong"></button>
  </div>
  <section id="u-bau" class="music-panel" role="tabpanel">
    <div class="music-grid">
      <article class="music-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_bau"></h2></div>
          <div class="head-actions"><button id="bauDemo" class="btn main" type="button" data-t="demo"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_bau" role="img" data-ta="cv_bau"></canvas></div>
        <p id="hud_bau" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="bendL"></span><input id="bauBend" type="range" min="-1" max="1" value="0" step="0.01"></label>
      </article>
      <div class="music-side">
        <aside class="music-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_bau"></span><h2 data-t="sh_bau"></h2></div></div>
          
          <div id="info_bau" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_bau" class="music-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="u-tranh" class="music-panel hidden" role="tabpanel">
    <div class="music-grid">
      <article class="music-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_tranh"></h2></div>
          <div class="head-actions"><button id="trGliss" class="btn main" type="button">🌊 Glissando</button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_tranh" role="img" data-ta="cv_tranh"></canvas></div>
        <p id="hud_tranh" class="hud" aria-live="polite"></p>
      </article>
      <div class="music-side">
        <aside class="music-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_tranh"></span><h2 data-t="sh_tranh"></h2></div></div>
          
          <div id="info_tranh" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_tranh" class="music-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="u-sao" class="music-panel hidden" role="tabpanel">
    <div class="music-grid">
      <article class="music-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_sao"></h2></div>
          <div class="head-actions"><button id="saoSong" class="btn" type="button" data-t="song"></button><button id="saoBlow" class="btn main" type="button" aria-pressed="false" data-t="blow"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_sao" role="img" data-ta="cv_sao"></canvas></div>
        <p id="hud_sao" class="hud" aria-live="polite"></p>
      </article>
      <div class="music-side">
        <aside class="music-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_sao"></span><h2 data-t="sh_sao"></h2></div></div>
          
          <div id="info_sao" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_sao" class="music-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="u-trung" class="music-panel hidden" role="tabpanel">
    <div class="music-grid">
      <article class="music-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_trung"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_trung" role="img" data-ta="cv_trung"></canvas></div>
        <p id="hud_trung" class="hud" aria-live="polite"></p>
      </article>
      <div class="music-side">
        <aside class="music-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_trung"></span><h2 data-t="sh_trung"></h2></div></div>
          <div id="simonBox" class="pulse-box"></div>
          <div id="info_trung" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_trung" class="music-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="u-trong" class="music-panel hidden" role="tabpanel">
    <div class="music-grid">
      <article class="music-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_trong"></h2></div>
          <div class="head-actions"><div class="segmented"><button type="button" data-preset="fest" data-t="preset1"></button><button type="button" data-preset="march" data-t="preset2"></button></div><button id="drClear" class="btn" type="button" data-t="clearB"></button><button id="drPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_trong" role="img" data-ta="cv_trong"></canvas></div>
        <p id="hud_trong" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="tempoL"></span><input id="drTempo" type="range" min="60" max="160" value="96" step="1"></label>
      </article>
      <div class="music-side">
        <aside class="music-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_trong"></span><h2 data-t="sh_trong"></h2></div></div>
          
          <div id="info_trong" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_trong" class="music-card quiz-card"></article>
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
    const audioNotice = $('uAudioNotice');
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
      kicker: ['Epsilon Edu · Âm nhạc', 'Epsilon Edu · Music'],
      title: ['Nhạc cụ dân tộc Việt Nam', 'Traditional Vietnamese Instruments'],
      lead: ['Gảy đàn bầu, lướt đàn tranh, thổi sáo trúc, gõ đàn t\'rưng và tự soạn nhịp trống. Xem vì sao mỗi nhạc cụ phát ra âm thanh riêng.', 'Pluck the dan bau, sweep the dan tranh, blow the bamboo flute, tap the t\'rung and make your own drum beat. See how each one makes its sound.'],
      tabsLabel: ['Các nhạc cụ', 'Instruments'], eyeSim: ['Chơi thử', 'Play it'],
      tab_bau: ['🎻 Đàn bầu', '🎻 Dan bau'], h_bau: ['Một dây mà nhiều tiếng', 'One string, many notes'], cv_bau: ['Đàn bầu: bấm các điểm sáng trên dây để gảy, kéo cần đàn để luyến', 'Dan bau: tap the glowing points to pluck, drag the rod to bend'],
      se_bau: ['Tìm hiểu', 'Learn'], sh_bau: ['Đàn bầu', 'The dan bau'],
      tab_tranh: ['🎼 Đàn tranh', '🎼 Dan tranh'], h_tranh: ['Lướt tay trên 16 dây', 'Sweep across 16 strings'], cv_tranh: ['Đàn tranh 16 dây. Bấm hoặc kéo ngang qua các dây để gảy', 'A 16-string dan tranh. Tap or drag across the strings'],
      se_tranh: ['Tìm hiểu', 'Learn'], sh_tranh: ['Đàn tranh', 'The dan tranh'],
      tab_sao: ['🎋 Sáo trúc', '🎋 Bamboo flute'], h_sao: ['Bịt lỗ, đổi nốt', 'Cover holes, change notes'], cv_sao: ['Sáo trúc 6 lỗ. Bấm lỗ để bịt hoặc mở, giữ nút Thổi để nghe', 'A six-hole bamboo flute. Tap holes to cover them, hold Blow to play'],
      se_sao: ['Tìm hiểu', 'Learn'], sh_sao: ['Sáo trúc', 'The bamboo flute'],
      tab_trung: ['🎍 Đàn t\'rưng', '🎍 T\'rung'], h_trung: ['Ống dài trầm, ống ngắn cao', 'Long tubes low, short tubes high'], cv_trung: ['Đàn t\'rưng với các ống tre dài ngắn. Bấm vào ống để gõ', 'A t\'rung with bamboo tubes of different lengths. Tap a tube to strike it'],
      se_trung: ['Thử thách', 'Challenge'], sh_trung: ['Nghe và gõ lại', 'Listen and play it back'],
      tab_trong: ['🥁 Trống và phách', '🥁 Drums and clappers'], h_trong: ['Tự soạn nhịp điệu', 'Make your own rhythm'], cv_trong: ['Bảng nhịp 8 ô cho trống cái, trống con, phách, song loan. Bấm ô để bật tắt', 'An 8-step rhythm grid for big drum, small drum, clappers and song loan. Tap cells to toggle'],
      se_trong: ['Tìm hiểu', 'Learn'], sh_trong: ['Giữ nhịp cho cả dàn nhạc', 'Keeping the beat'],
      bendL: ['Kéo để uốn cần đàn (luyến láy)', 'Drag to bend the rod'], demo: ['▶ Nghe giai điệu mẫu', '▶ Hear a sample tune'],
      blow: ['🌬️ Giữ để thổi', '🌬️ Hold to blow'], song: ['▶ Bài "Kìa con bướm vàng"', '▶ “Kia con buom vang” tune'],
      simon: ['▶ Bắt đầu', '▶ Start'], tempoL: ['Nhịp độ', 'Tempo'], preset1: ['Nhịp lễ hội', 'Festival beat'], preset2: ['Nhịp hành khúc', 'March beat'], clearB: ['🧽 Xóa', '🧽 Clear']
    };
    const playLbl = (on) => (on ? T('⏸ Dừng', '⏸ Stop') : T('▶ Phát', '▶ Play'));
    const NOTE_VI = ['Đô', 'Đô#', 'Rê', 'Rê#', 'Mi', 'Fa', 'Fa#', 'Son', 'Son#', 'La', 'La#', 'Si'];
    const NOTE_EN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const midiF = (m) => 440 * Math.pow(2, (m - 69) / 12);
    const noteName = (m) => (lang === 'en' ? NOTE_EN : NOTE_VI)[((m % 12) + 12) % 12];

    /* ---------- âm thanh (Web Audio) ---------- */
    let AC = null, master = null;
    function ac() {
      if (!AC) {
        const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
        AC = new C(); const comp = AC.createDynamicsCompressor(); master = AC.createGain(); master.gain.value = .55; master.connect(comp); comp.connect(AC.destination);
        cleanupFns.push(() => { try { AC.close(); } catch (_) {} });
      }
      if (AC.state === 'suspended') AC.resume();
      return AC;
    }
    const ksCache = new Map();
    function ksBuffer(freq, dur, damp, bright) {
      const a = ac(), key = `${Math.round(freq * 10)}|${dur}|${damp}|${bright}`;
      if (ksCache.has(key)) return ksCache.get(key);
      const sr = a.sampleRate, len = Math.floor(sr * dur), N = Math.max(2, Math.round(sr / freq)), buf = a.createBuffer(1, len, sr), y = buf.getChannelData(0);
      let prev = 0; for (let i = 0; i < N; i++) { const r = Math.random() * 2 - 1; prev = prev + (r - prev) * bright; y[i] = prev; }
      for (let i = N; i < len; i++) y[i] = damp * .5 * (y[i - N] + y[i - N + 1 < i ? i - N + 1 : i - N]);
      if (ksCache.size > 80) ksCache.clear();
      ksCache.set(key, buf); return buf;
    }
    function pluck(freq, o = {}) {
      const a = ac(); if (!a) return null;
      cancelSpeech();
      const src = a.createBufferSource(), g = a.createGain();
      src.buffer = ksBuffer(freq, o.dur || 2.4, o.damp || .996, o.bright == null ? .5 : o.bright);
      src.playbackRate.value = o.rate || 1;
      g.gain.value = o.vol || .7; src.connect(g);
      if (o.lp) { const f = a.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = o.lp; g.connect(f); f.connect(master); } else g.connect(master);
      src.start(); return src;
    }
    function tone(freq, o = {}) {
      const a = ac(); if (!a) return;
      cancelSpeech();
      const t = a.currentTime, osc = a.createOscillator(), g = a.createGain();
      osc.type = o.type || 'sine'; osc.frequency.setValueAtTime(freq, t);
      if (o.toFreq) osc.frequency.exponentialRampToValueAtTime(o.toFreq, t + (o.sweep || .15));
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(o.vol || .5, t + (o.attack || .005)); g.gain.exponentialRampToValueAtTime(.0001, t + (o.dur || .5));
      osc.connect(g); g.connect(master); osc.start(t); osc.stop(t + (o.dur || .5) + .05);
      if (o.partial) { const o2 = a.createOscillator(), g2 = a.createGain(); o2.frequency.value = freq * o.partial; g2.gain.setValueAtTime(.0001, t); g2.gain.exponentialRampToValueAtTime((o.vol || .5) * .3, t + .005); g2.gain.exponentialRampToValueAtTime(.0001, t + (o.dur || .5) * .4); o2.connect(g2); g2.connect(master); o2.start(t); o2.stop(t + (o.dur || .5)); }
    }
    function noise(o = {}) {
      const a = ac(); if (!a) return;
      const t = a.currentTime, len = Math.floor(a.sampleRate * (o.dur || .1)), buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, o.curve || 3);
      const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
      src.buffer = buf; f.type = o.ftype || 'bandpass'; f.frequency.value = o.freq || 2000; f.Q.value = o.q || 1; g.gain.value = o.vol || .5;
      src.connect(f); f.connect(g); g.connect(master); src.start(t);
    }
    const strum = []; // dây đang rung để vẽ

    /* =====================================================================
       1. ĐÀN BẦU: bồi âm + uốn cần
       ===================================================================== */
    const BAU_F0 = midiF(48);
    let bau = { bend: 0, src: null, n: 0, amp: 0, drag: false, demoT: -1, infoKey: '' };
    const bauC = mk('c_bau', (w) => clamp(w * .46, 230, 380));
    const bauRate = () => Math.pow(2, bau.bend * 4 / 12);
    function bauGeom() { const { w, h } = bauC; return { w, h, x0: w * .18, x1: w * .92, sy: h * .42, rodX: w * .1 }; }
    function bauPluck(n) { if (bau.src) { try { bau.src.stop(); } catch (_) {} } bau.n = n; bau.amp = 1; bau.src = pluck(BAU_F0 * n, { dur: 3.2, damp: .9985, bright: .22, vol: .9, rate: bauRate(), lp: 2500 }); bauInfo(true); }
    function drawBau(dt) {
      const g = bauGeom(), { w, h } = g, ctx = bauC.ctx;
      if (!w) return;
      if (bau.src) bau.src.playbackRate.setTargetAtTime(bauRate(), AC.currentTime, .02);
      bau.amp *= Math.pow(.35, dt);
      ctx.fillStyle = '#fff7ed'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#92400e'; rr(ctx, g.x0 - w * .12, g.sy + h * .08, g.x1 - g.x0 + w * .16, h * .18, 12); ctx.fill();
      ctx.fillStyle = '#b45309'; rr(ctx, g.x0 - w * .12, g.sy + h * .08, g.x1 - g.x0 + w * .16, h * .06, 12); ctx.fill();
      // bầu cộng hưởng + cần đàn
      ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.ellipse(g.rodX, g.sy + h * .05, w * .04, h * .1, 0, 0, TAU); ctx.fill();
      const tipX = g.rodX + bau.bend * w * .06, tipY = h * .12;
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(g.rodX, g.sy + h * .1); ctx.quadraticCurveTo(g.rodX + bau.bend * w * .015, h * .3, tipX, tipY); ctx.stroke();
      ctx.fillStyle = bau.drag ? '#ec4899' : '#fbbf24'; ctx.beginPath(); ctx.arc(tipX, tipY, 9, 0, TAU); ctx.fill();
      // dây với sóng dừng n bụng
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.rodX, g.sy); ctx.lineTo(g.x0, g.sy); ctx.stroke();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i <= 120; i++) { const t = i / 120, x = lerp(g.x0, g.x1, t), y = g.sy + Math.sin(t * Math.PI * Math.max(1, bau.n)) * bau.amp * h * .07 * Math.sin(clock * 60); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke();
      ctx.fillStyle = '#57534e'; ctx.fillRect(g.x1, g.sy - 10, 6, 20);
      // các điểm bồi âm (nút)
      const fs = w < 420 ? 10 : 11.5;
      for (let n = 2; n <= 6; n++) {
        const x = lerp(g.x1, g.x0, 1 / n), on = bau.n === n && bau.amp > .1;
        ctx.fillStyle = on ? '#ec4899' : 'rgba(250,204,21,.9)'; ctx.beginPath(); ctx.arc(x, g.sy, on ? 10 : 8, 0, TAU); ctx.fill();
        textLight(ctx, `1/${n}`, x, g.sy + h * .17, '#fef3c7', fs, 'center', 900);
        textLight(ctx, noteName(Math.round(48 + 12 * Math.log2(n))), x, g.sy - (n % 2 ? 36 : 20), on ? '#be185d' : '#6d28d9', fs, 'center', 900);
      }
      textLight(ctx, T('Cần đàn', 'Rod'), tipX + 14, tipY, '#78350f', fs, 'left', 900);
      textLight(ctx, T('Bầu', 'Gourd'), g.rodX, g.sy + h * .2, '#78350f', fs, 'center', 900);
      // giai điệu mẫu
      if (bau.demoT >= 0) {
        const SEQ = [[3, 0, .9], [4, 0, .9], [5, 0, .6], [5, .5, .6], [4, 0, .9], [3, 0, .6], [3, -.4, .6], [2, 0, 1.4]];
        let t = 0; for (const [n, b, d] of SEQ) { if (bau.demoT >= t && bau.demoT - dt < t) { bau.bend = 0; bauPluck(n); bau.target = b; } t += d; }
        if (bau.target != null) bau.bend += (bau.target - bau.bend) * Math.min(1, dt * 4);
        bau.demoT += dt; if (bau.demoT > t + 1) { bau.demoT = -1; bau.target = null; bau.bend = 0; }
      }
    }
    bauC.c.addEventListener('pointerdown', (e) => {
      const g = bauGeom(), p = localPoint(bauC.c, e);
      if (Math.hypot(p.x - (g.rodX + bau.bend * g.w * .06), p.y - g.h * .12) < 30) { bau.drag = true; try { bauC.c.setPointerCapture(e.pointerId); } catch (_) {} return; }
      for (let n = 2; n <= 6; n++) { const x = lerp(g.x1, g.x0, 1 / n); if (Math.hypot(p.x - x, p.y - g.sy) < 20) { bauPluck(n); return; } }
      if (Math.abs(p.y - g.sy) < 18 && p.x > g.x0 && p.x < g.x1) bauPluck(1);
    });
    bauC.c.addEventListener('pointermove', (e) => { if (!bau.drag) return; const g = bauGeom(), p = localPoint(bauC.c, e); bau.bend = clamp((p.x - g.rodX) / (g.w * .06), -1, 1); $('bauBend').value = String(bau.bend); });
    const bauEnd = () => { bau.drag = false; };
    bauC.c.addEventListener('pointerup', bauEnd); bauC.c.addEventListener('pointercancel', bauEnd);
    $('bauBend').addEventListener('input', () => { bau.bend = +$('bauBend').value; });
    $('bauBend').addEventListener('change', () => { bau.bend = 0; $('bauBend').value = '0'; });
    $('bauDemo').onclick = () => { bau.demoT = 0; };
    function bauInfo(force) {
      const key = lang + bau.n; if (key === bau.infoKey && !force) return; bau.infoKey = key;
      infoBox($('info_bau'), {
        emo: '🎻', title: T('Đàn bầu', 'Dan bau'), sub: bau.n > 1 ? T(`Bồi âm 1/${bau.n}: dây chia thành ${bau.n} đoạn rung`, `Harmonic 1/${bau.n}: the string vibrates in ${bau.n} parts`) : T('Nhạc cụ độc đáo chỉ có một dây', 'A unique one-string instrument'),
        rows: [[T('Cách chơi', 'How to play'), T('Người chơi chạm nhẹ cạnh bàn tay vào một điểm trên dây rồi gảy, tạo ra "bồi âm" trong và ngân. Tay kia uốn cần đàn để luyến láy, nghe như giọng hát.', 'The player lightly touches the string with the side of the hand and plucks, making a clear, ringing harmonic. The other hand bends the rod so notes slide like a singing voice.')],
          [T('Vì sao nhiều nốt?', 'Why many notes?'), T('Chạm ở 1/2 dây thì dây rung thành 2 đoạn, âm cao gấp đôi; ở 1/3 thì 3 đoạn, cao hơn nữa.', 'Touching at 1/2 makes the string vibrate in 2 parts, twice as high; at 1/3 it’s 3 parts, higher still.')],
          [T('Quả bầu', 'The gourd'), T('Ngày xưa người ta dùng quả bầu khô để khuếch đại tiếng đàn, nên gọi là đàn bầu.', 'Long ago a dried gourd amplified the sound, giving the instrument its name.')]],
        notes: [['fun', T('✨ "Đàn bầu" có câu: "Con gái nghe đàn bầu thì đừng". Tiếng đàn ngọt ngào, sâu lắng đến mức ai nghe cũng xao xuyến.', '✨ An old saying warns that girls shouldn’t listen to the dan bau, because its sweet sound melts every heart.')]]
      });
      setText('hud_bau', bau.n ? T(`🎵 Bồi âm 1/${bau.n} – nốt ${noteName(Math.round(48 + 12 * Math.log2(Math.max(1, bau.n))))}`, `🎵 Harmonic 1/${bau.n} – note ${noteName(Math.round(48 + 12 * Math.log2(Math.max(1, bau.n))))}`) : T('🎵 Bấm vào các chấm vàng trên dây để gảy', '🎵 Tap the yellow dots on the string to pluck'));
    }
    TABS.bau = { frame(dt) { drawBau(dt); }, refresh() { bau.infoKey = ''; bauInfo(true); } };

    /* =====================================================================
       2. ĐÀN TRANH: 16 dây, ngũ cung
       ===================================================================== */
    const TRANH = [55, 57, 60, 62, 65, 67, 69, 72, 74, 77, 79, 81, 84, 86, 89, 91];
    let tr = { amp: new Array(16).fill(0), last: -1, drag: false, lastPluck: -1, infoKey: '' };
    const trC = mk('c_tranh', (w) => clamp(w * .5, 250, 420));
    function trGeom() { const { w, h } = trC; return { w, h, x0: w * .06, x1: w * .94, y0: h * .14, y1: h * .86 }; }
    function trY(g, i) { return lerp(g.y1, g.y0, i / 15); }
    function trPluck(i) { tr.amp[i] = 1; tr.last = i; pluck(midiF(TRANH[i]), { dur: 2.2, damp: .995, bright: .55, vol: .5 }); trInfo(); }
    function drawTr(dt) {
      const g = trGeom(), { w, h } = g, ctx = trC.ctx;
      if (!w) return;
      ctx.fillStyle = '#fdf8ef'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.moveTo(g.x0 - 10, g.y0 - h * .06); ctx.lineTo(g.x1 + 10, g.y0 + h * .02); ctx.lineTo(g.x1 + 10, g.y1 - h * .02); ctx.lineTo(g.x0 - 10, g.y1 + h * .06); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#ca8a04'; ctx.beginPath(); ctx.moveTo(g.x0 - 4, g.y0 - h * .04); ctx.lineTo(g.x1 + 4, g.y0 + h * .03); ctx.lineTo(g.x1 + 4, g.y1 - h * .03); ctx.lineTo(g.x0 - 4, g.y1 + h * .04); ctx.closePath(); ctx.fill();
      const fs = w < 420 ? 9 : 10.5;
      for (let i = 0; i < 16; i++) {
        tr.amp[i] *= Math.pow(.25, dt);
        const y = trY(g, i), a = tr.amp[i], bx = lerp(g.x0, g.x1, .55 + (i % 2 ? .04 : -.04));
        ctx.strokeStyle = a > .05 ? '#f8fafc' : '#e7e5e4'; ctx.lineWidth = 1 + (15 - i) * .08;
        ctx.beginPath();
        for (let k = 0; k <= 40; k++) { const t = k / 40, x = lerp(g.x0, g.x1, t), yy = y + Math.sin(t * Math.PI) * a * 5 * Math.sin(clock * 70 + i); if (k) ctx.lineTo(x, yy); else ctx.moveTo(x, yy); }
        ctx.stroke();
        ctx.fillStyle = '#fef3c7'; ctx.beginPath(); ctx.moveTo(bx - 6, y + 4); ctx.lineTo(bx + 6, y + 4); ctx.lineTo(bx, y - 5); ctx.closePath(); ctx.fill();
        textLight(ctx, noteName(TRANH[i]), g.x0 + 12, y - 1, a > .1 ? '#be185d' : '#fef3c7', fs, 'left', 900);
      }
      textLight(ctx, T('Nhạn đàn (cầu dây)', 'Bridges'), lerp(g.x0, g.x1, .55), g.y0 - h * .08 + 4, '#78350f', 11, 'center', 900);
    }
    const trIndexAt = (p) => { const g = trGeom(); let best = -1, bd = 1e9; for (let i = 0; i < 16; i++) { const d = Math.abs(p.y - trY(g, i)); if (d < bd) { bd = d; best = i; } } return bd < (g.y1 - g.y0) / 30 + 6 ? best : -1; };
    trC.c.addEventListener('pointerdown', (e) => { tr.drag = true; try { trC.c.setPointerCapture(e.pointerId); } catch (_) {} const i = trIndexAt(localPoint(trC.c, e)); if (i >= 0) { trPluck(i); tr.lastPluck = i; } });
    trC.c.addEventListener('pointermove', (e) => { if (!tr.drag) return; const i = trIndexAt(localPoint(trC.c, e)); if (i >= 0 && i !== tr.lastPluck) { trPluck(i); tr.lastPluck = i; } });
    const trEnd = () => { tr.drag = false; tr.lastPluck = -1; };
    trC.c.addEventListener('pointerup', trEnd); trC.c.addEventListener('pointercancel', trEnd);
    $('trGliss').onclick = () => { for (let i = 0; i < 16; i++) setTimeout(() => { if (!destroyed) trPluck(i); }, i * 70); };
    function trInfo() {
      const key = lang; if (key === tr.infoKey) { setText('hud_tranh', tr.last >= 0 ? T(`🎵 Dây ${tr.last + 1} – nốt ${noteName(TRANH[tr.last])}`, `🎵 String ${tr.last + 1} – note ${noteName(TRANH[tr.last])}`) : T('🎵 Bấm hoặc kéo ngang qua các dây', '🎵 Tap or drag across the strings')); return; }
      tr.infoKey = key;
      infoBox($('info_tranh'), {
        emo: '🎼', title: T('Đàn tranh', 'Dan tranh'), sub: T('Còn gọi là đàn thập lục (16 dây)', 'Also called the 16-string zither'),
        rows: [[T('Cách chơi', 'How to play'), T('Tay phải đeo móng gảy để gảy dây. Tay trái nhấn dây phía sau nhạn đàn để luyến láy, rung ngân.', 'The right hand plucks with finger picks. The left hand presses the strings behind the bridges to bend and vibrate the notes.')],
          [T('Ngũ cung', 'Pentatonic'), T('Các dây thường lên theo 5 âm, như Son – La – Đô – Rê – Fa, lặp lại ở nhiều quãng tám. Đó là "ngũ cung" của nhạc dân tộc.', 'Strings are often tuned to 5 notes, like G – A – C – D – F, repeated over several octaves. This “pentatonic” scale is typical of traditional music.')],
          [T('Dây dài, dây ngắn', 'Long and short'), T('Dây càng ngắn, càng căng thì tiếng càng cao.', 'Shorter, tighter strings sound higher.')]],
        notes: [['fun', T('✨ Ngày nay còn có đàn tranh 17, 19, 21 hay 22 dây để chơi được nhiều bài hơn.', '✨ Today there are also 17, 19, 21 and 22-string versions for a wider range.')]]
      });
      trInfo();
    }
    TABS.tranh = { frame(dt) { drawTr(dt); }, refresh() { tr.infoKey = ''; trInfo(); } };

    /* =====================================================================
       3. SÁO TRÚC: 6 lỗ, giữ để thổi
       ===================================================================== */
    const SAO_SCALE = [72, 74, 76, 77, 79, 81, 83];
    let sao = { holes: [true, true, true, true, true, true], blowing: false, osc: null, gain: null, song: -1, songT: 0, infoKey: '', parts: [] };
    const saoC = mk('c_sao', (w) => clamp(w * .4, 210, 330));
    const saoNote = () => { let n = 0; while (n < 6 && sao.holes[n]) n++; return SAO_SCALE[6 - n]; };
    function saoGeom() { const { w, h } = saoC; return { w, h, x0: w * .05, x1: w * .95, cy: h * .45, r: Math.min(h * .09, 18), holeX: (i) => lerp(w * .38, w * .86, i / 5) }; }
    function saoStart() {
      const a = ac(); if (!a || sao.osc) return;
      cancelSpeech();
      const t = a.currentTime, o = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain(), lfo = a.createOscillator(), lg = a.createGain();
      o.type = 'sine'; o2.type = 'triangle'; const f = midiF(saoNote()); o.frequency.value = f; o2.frequency.value = f * 2;
      const g2 = a.createGain(); g2.gain.value = .12; o2.connect(g2); g2.connect(g);
      lfo.frequency.value = 5; lg.gain.value = f * .006; lfo.connect(lg); lg.connect(o.frequency);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.35, t + .06);
      o.connect(g); g.connect(master); o.start(); o2.start(); lfo.start();
      sao.osc = { o, o2, lfo, lg }; sao.gain = g; sao.blowing = true;
    }
    function saoStop() {
      if (!sao.osc || !AC) { sao.blowing = false; return; }
      const t = AC.currentTime, { o, o2, lfo } = sao.osc;
      sao.gain.gain.cancelScheduledValues(t); sao.gain.gain.setValueAtTime(Math.max(.0001, sao.gain.gain.value), t); sao.gain.gain.exponentialRampToValueAtTime(.0001, t + .12);
      [o, o2, lfo].forEach((x) => { try { x.stop(t + .15); } catch (_) {} });
      sao.osc = null; sao.blowing = false;
    }
    function saoRetune() { if (!sao.osc || !AC) return; const f = midiF(saoNote()), t = AC.currentTime; sao.osc.o.frequency.setTargetAtTime(f, t, .02); sao.osc.o2.frequency.setTargetAtTime(f * 2, t, .02); sao.osc.lg.gain.setTargetAtTime(f * .006, t, .05); }
    function saoSet(n) { sao.holes = sao.holes.map((_, i) => i < 6 - SAO_SCALE.indexOf(n)); saoRetune(); }
    const SONG = [72, 74, 76, 72, 72, 74, 76, 72, 76, 77, 79, 0, 76, 77, 79, 0, 79, 81, 79, 77, 76, 72, 79, 81, 79, 77, 76, 72];
    function drawSao(dt) {
      const g = saoGeom(), { w, h } = g, ctx = saoC.ctx;
      if (!w) return;
      if (sao.playingSong) {
        sao.songT += dt; const beat = .42, i = Math.floor(sao.songT / beat);
        if (i >= SONG.length) { sao.playingSong = false; sao.song = -1; saoStop(); }
        else if (i !== sao.song) { sao.song = i; const n = SONG[i]; if (n) { saoSet(n); if (!sao.osc) saoStart(); } else saoStop(); }
      }
      ctx.fillStyle = '#f0fdf4'; ctx.fillRect(0, 0, w, h);
      const tg = ctx.createLinearGradient(0, g.cy - g.r, 0, g.cy + g.r); tg.addColorStop(0, '#e9d5a1'); tg.addColorStop(.5, '#d6b46a'); tg.addColorStop(1, '#a8823e');
      ctx.fillStyle = tg; rr(ctx, g.x0, g.cy - g.r, g.x1 - g.x0, g.r * 2, g.r); ctx.fill();
      ctx.strokeStyle = 'rgba(120,53,15,.5)'; ctx.lineWidth = 2; for (const t of [.2, .55]) { ctx.beginPath(); ctx.moveTo(lerp(g.x0, g.x1, t), g.cy - g.r); ctx.lineTo(lerp(g.x0, g.x1, t), g.cy + g.r); ctx.stroke(); }
      ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.ellipse(w * .14, g.cy, g.r * .55, g.r * .4, 0, 0, TAU); ctx.fill();
      textLight(ctx, T('Lỗ thổi', 'Mouth hole'), w * .14, g.cy - g.r - 12, '#166534', 11, 'center', 900);
      for (let i = 0; i < 6; i++) {
        const x = g.holeX(i);
        ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.arc(x, g.cy, g.r * .45, 0, TAU); ctx.fill();
        if (sao.holes[i]) { ctx.fillStyle = '#f6c9a7'; ctx.beginPath(); ctx.ellipse(x, g.cy - g.r * .2, g.r * .75, g.r * 1.1, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#e8b796'; ctx.lineWidth = 1.5; ctx.stroke(); }
        textLight(ctx, String(i + 1), x, g.cy + g.r + 13, '#166534', 11, 'center', 900);
      }
      // cột hơi rung (từ lỗ thổi tới lỗ mở đầu tiên)
      let open = 0; while (open < 6 && sao.holes[open]) open++;
      const endX = open < 6 ? g.holeX(open) : g.x1;
      if (sao.blowing) {
        ctx.strokeStyle = 'rgba(56,189,248,.8)'; ctx.lineWidth = 3; ctx.beginPath();
        for (let x = w * .14; x <= endX; x += 3) { const t = (x - w * .14) / (endX - w * .14), y = g.cy + Math.sin(t * Math.PI) * g.r * .55 * Math.sin(clock * 40); if (x === w * .14) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
        ctx.stroke();
        for (let k = 0; k < 3; k++) { ctx.strokeStyle = `rgba(56,189,248,${.6 - k * .18})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(endX, g.cy - g.r, 10 + k * 10 + (clock * 30 % 10), Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); }
      }
      ctx.fillStyle = 'rgba(56,189,248,.15)'; ctx.fillRect(w * .14, g.cy + g.r + 26, endX - w * .14, 8);
      textLight(ctx, T(`Cột hơi rung dài: ${open === 6 ? 'cả ống' : `tới lỗ ${open + 1}`}`, `Vibrating air column: ${open === 6 ? 'whole tube' : `to hole ${open + 1}`}`), w * .14, g.cy + g.r + 46, '#0369a1', 11, 'left', 900);
      textLight(ctx, `${T('Nốt', 'Note')}: ${noteName(saoNote())}`, w - 12, 18, '#6d28d9', 16, 'right', 900);
    }
    saoC.c.addEventListener('pointerdown', (e) => {
      const g = saoGeom(), p = localPoint(saoC.c, e);
      for (let i = 0; i < 6; i++) if (Math.hypot(p.x - g.holeX(i), p.y - g.cy) < g.r * 1.3) { sao.holes[i] = !sao.holes[i]; saoRetune(); saoInfo(); return; }
    });
    const blowBtn = $('saoBlow');
    const startB = (e) => { e.preventDefault(); sao.playingSong = false; sao.song = -1; saoStart(); blowBtn.setAttribute('aria-pressed', 'true'); };
    const stopB = () => { saoStop(); blowBtn.setAttribute('aria-pressed', 'false'); };
    blowBtn.addEventListener('pointerdown', startB); blowBtn.addEventListener('pointerup', stopB); blowBtn.addEventListener('pointerleave', stopB); blowBtn.addEventListener('pointercancel', stopB);
    blowBtn.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !sao.osc) startB(e); });
    blowBtn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stopB(); });
    $('saoSong').onclick = () => { saoStop(); sao.songT = 0; sao.song = -1; sao.playingSong = true; };
    function saoInfo() {
      const key = lang + sao.holes.join(); if (key === sao.infoKey) return; sao.infoKey = key;
      infoBox($('info_sao'), {
        emo: '🎋', title: T('Sáo trúc', 'Bamboo flute'), sub: T(`Đang bịt ${sao.holes.filter(Boolean).length}/6 lỗ – nốt ${noteName(saoNote())}`, `${sao.holes.filter(Boolean).length}/6 holes covered – note ${noteName(saoNote())}`),
        rows: [[T('Phát ra tiếng thế nào?', 'How it sounds'), T('Thổi ngang qua lỗ thổi làm cột không khí trong ống rung lên.', 'Blowing across the mouth hole makes the column of air inside vibrate.')],
          [T('Bịt và mở lỗ', 'Covering holes'), T('Bịt hết lỗ thì cột hơi dài nhất, tiếng trầm nhất. Mở dần từ dưới lên, cột hơi ngắn lại, tiếng cao dần.', 'With all holes covered the air column is longest and the note lowest. Opening holes from the bottom shortens it and raises the note.')],
          [T('Làm từ gì?', 'Made of'), T('Một ống trúc hoặc nứa, khoét lỗ thổi và các lỗ bấm.', 'A tube of bamboo with a mouth hole and finger holes.')]],
        notes: [['fun', T('✨ Tiếng sáo diều vi vu và chú bé chăn trâu thổi sáo trên lưng trâu là hình ảnh rất quen thuộc của làng quê Việt Nam.', '✨ A kite flute humming in the wind and a buffalo boy playing his flute are classic images of the Vietnamese countryside.')], ['tip', T('🎵 Trên cây sáo mô phỏng này, bịt hết 6 lỗ là nốt Đô.', '🎵 On this simulated flute, all six holes covered gives C.')]]
      });
    }
    TABS.sao = { frame(dt) { drawSao(dt); saoInfo(); setText('hud_sao', sao.blowing ? T(`🎶 Đang thổi nốt ${noteName(saoNote())}`, `🎶 Playing ${noteName(saoNote())}`) : T('🌬️ Giữ nút "Thổi" để nghe, bấm vào lỗ để bịt hoặc mở', '🌬️ Hold “Blow” to play; tap holes to cover or open them')); }, refresh() { sao.infoKey = ''; saoInfo(); } };

    /* =====================================================================
       4. ĐÀN T'RƯNG + trò chơi nghe và gõ lại
       ===================================================================== */
    const TRUNG = [60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84, 86];
    let tg = { glow: new Array(12).fill(0), seq: [], pos: 0, mode: 'idle', playT: 0, best: 0, infoKey: '' };
    const tgC = mk('c_trung', (w) => clamp(w * .55, 270, 450));
    function tgGeom() { const { w, h } = tgC, n = 12, gap = w * .8 / n; return { w, h, n, gap, x: (i) => w * .12 + gap * (i + .5), top: (i) => h * .12 + i * h * .015, len: (i) => h * .7 * Math.pow(midiF(TRUNG[0]) / midiF(TRUNG[i]), .6) }; }
    function tgHit(i, fromUser) {
      tg.glow[i] = 1; const f = midiF(TRUNG[i]);
      tone(f, { dur: .9, vol: .45, partial: 2.76, attack: .002 }); noise({ dur: .03, freq: 3000, vol: .25 });
      if (fromUser && tg.mode === 'input') {
        if (i === tg.seq[tg.pos]) { tg.pos++; if (tg.pos >= tg.seq.length) { tg.best = Math.max(tg.best, tg.seq.length); tg.mode = 'wait'; setTimeout(() => { if (!destroyed && tg.mode === 'wait') simonNext(); }, 900); } }
        else { tg.mode = 'fail'; }
        simonRender();
      }
    }
    function simonNext() { tg.seq.push(Math.floor(rand(0, 8))); tg.pos = 0; tg.mode = 'play'; tg.playT = -.4; tg.lastK = -1; simonRender(); }
    function simonRender() {
      const msg = { idle: T('Bấm "Bắt đầu", nghe các ống được gõ rồi gõ lại đúng thứ tự.', 'Press “Start”, listen to the tubes, then tap them back in order.'), play: T('👂 Nghe kỹ nhé…', '👂 Listen carefully…'), input: T(`👉 Đến lượt em: gõ lại ${tg.seq.length} ống`, `👉 Your turn: tap ${tg.seq.length} tubes`), wait: T('🎉 Đúng rồi! Thêm một nốt nữa…', '🎉 Correct! One more note…'), fail: T(`😅 Chưa đúng. Em nhớ được ${Math.max(0, tg.seq.length - 1)} nốt. Bấm "Bắt đầu" để chơi lại.`, `😅 Oops. You remembered ${Math.max(0, tg.seq.length - 1)} notes. Press “Start” to try again.`) }[tg.mode];
      $('simonBox').innerHTML = `<p class="${tg.mode === 'fail' ? 'warn' : tg.mode === 'wait' ? 'fun' : 'muted'}" style="margin:0"></p><p class="score" style="margin:0">${T(`Kỷ lục: ${tg.best} nốt`, `Best: ${tg.best} notes`)}</p><button id="simonStart" class="btn main" type="button">${STR.simon[lang === 'en' ? 1 : 0]}</button>`;
      $('simonBox').querySelector('p').textContent = msg;
      $('simonStart').onclick = () => { ac(); tg.seq = []; simonNext(); };
    }
    function drawTg(dt) {
      const g = tgGeom(), { w, h } = g, ctx = tgC.ctx;
      if (!w) return;
      if (tg.mode === 'play') {
        tg.playT += dt; const k = Math.floor(tg.playT / .6);
        if (tg.playT >= 0 && k < tg.seq.length && k !== tg.lastK) { tg.lastK = k; tgHit(tg.seq[k], false); }
        if (k >= tg.seq.length) { tg.mode = 'input'; tg.pos = 0; simonRender(); }
      }
      ctx.fillStyle = '#fefce8'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(w * .08, h * .1); ctx.lineTo(w * .94, h * .27); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w * .08, h * .9); ctx.lineTo(w * .94, h * .62); ctx.stroke();
      for (let i = 0; i < g.n; i++) {
        tg.glow[i] *= Math.pow(.05, dt);
        const x = g.x(i), t = g.top(i), L2 = g.len(i), tw = g.gap * .62;
        ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, t - h * .03); ctx.lineTo(x, t); ctx.stroke();
        const gr = ctx.createLinearGradient(x - tw / 2, 0, x + tw / 2, 0); gr.addColorStop(0, '#a8823e'); gr.addColorStop(.5, mix('#e9d5a1', '#fde047', tg.glow[i])); gr.addColorStop(1, '#a8823e');
        ctx.fillStyle = gr; rr(ctx, x - tw / 2, t, tw, L2, tw / 2); ctx.fill();
        ctx.strokeStyle = 'rgba(120,53,15,.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - tw / 2, t + L2 * .35); ctx.lineTo(x + tw / 2, t + L2 * .35); ctx.stroke();
        if (tg.glow[i] > .05) { ctx.strokeStyle = `rgba(236,72,153,${tg.glow[i]})`; ctx.lineWidth = 3; rr(ctx, x - tw / 2 - 3, t - 3, tw + 6, L2 + 6, tw / 2 + 3); ctx.stroke(); }
        textLight(ctx, noteName(TRUNG[i]), x, t + L2 + 12, '#78350f', w < 420 ? 9 : 10.5, 'center', 900);
      }
      textLight(ctx, T('Ống dài: trầm', 'Long: low'), w * .1, h * .97, '#78350f', 11, 'left', 900);
      textLight(ctx, T('Ống ngắn: cao', 'Short: high'), w * .92, h * .97, '#78350f', 11, 'right', 900);
    }
    tgC.c.addEventListener('pointerdown', (e) => {
      const g = tgGeom(), p = localPoint(tgC.c, e);
      for (let i = 0; i < g.n; i++) { const x = g.x(i), t = g.top(i); if (Math.abs(p.x - x) < g.gap * .45 && p.y > t - 6 && p.y < t + g.len(i) + 6) { if (tg.mode === 'play') return; tgHit(i, true); return; } }
    });
    function tgInfo() {
      if (tg.infoKey === lang) return; tg.infoKey = lang;
      infoBox($('info_trung'), {
        emo: '🎍', title: T("Đàn t'rưng", "T'rung"), sub: T('Nhạc cụ của đồng bào Tây Nguyên', 'An instrument of the Central Highlands peoples'),
        rows: [[T('Làm từ gì?', 'Made of'), T('Nhiều ống tre, nứa dài ngắn khác nhau, treo trên một khung.', 'Bamboo tubes of different lengths hung on a frame.')],
          [T('Âm thanh', 'The sound'), T('Gõ vào ống tre làm ống rung lên. Ống dài kêu trầm, ống ngắn kêu cao.', 'Striking a tube makes it vibrate. Long tubes sound low; short tubes sound high.')],
          [T('Ở đâu?', 'Where?'), T("Người Ba Na, Gia Rai, Ê Đê… ở Tây Nguyên chơi t'rưng trong ngày hội, bên bếp lửa nhà rông.", "Ba Na, Gia Rai, E De and other Highlands peoples play it at festivals around the communal-house fire.")]],
        notes: [['fun', T('✨ Tây Nguyên còn nổi tiếng với cồng chiêng, được UNESCO công nhận là Di sản văn hóa phi vật thể của nhân loại.', '✨ The Central Highlands are also famous for gong music, recognised by UNESCO as Intangible Cultural Heritage of Humanity.')]]
      });
    }
    TABS.trung = { frame(dt) { drawTg(dt); tgInfo(); setText('hud_trung', T("🎍 Bấm vào các ống tre để gõ đàn t'rưng", "🎍 Tap the bamboo tubes to play")); }, refresh() { tg.infoKey = ''; tgInfo(); simonRender(); } };

    /* =====================================================================
       5. TRỐNG VÀ PHÁCH: bảng nhịp 8 ô
       ===================================================================== */
    const ROWS = [
      { k: 'big', col: '#dc2626', vi: 'Trống cái', en: 'Big drum', play: () => tone(110, { toFreq: 45, sweep: .25, dur: .55, vol: .9 }) },
      { k: 'small', col: '#f59e0b', vi: 'Trống con', en: 'Small drum', play: () => { tone(230, { toFreq: 160, sweep: .08, dur: .18, vol: .45 }); noise({ dur: .12, freq: 1800, q: .7, vol: .35 }); } },
      { k: 'phach', col: '#16a34a', vi: 'Phách', en: 'Clappers', play: () => noise({ dur: .05, freq: 3200, q: 4, vol: .9, curve: 6 }) },
      { k: 'loan', col: '#2563eb', vi: 'Song loan', en: 'Song loan', play: () => tone(820, { dur: .12, vol: .55, attack: .001, partial: 1.5 }) }
    ];
    const PRESETS = {
      fest: [[1, 0, 0, 0, 1, 0, 1, 0], [0, 0, 1, 0, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 0, 0, 0, 1]],
      march: [[1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0], [1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1]]
    };
    let dr = { grid: PRESETS.fest.map((r) => r.slice()), playing: false, step: -1, acc: 0, flash: [[], [], [], []], infoKey: '' };
    const drC = mk('c_trong', (w) => clamp(w * .45, 230, 380));
    function drGeom() { const { w, h } = drC, lw = Math.min(110, w * .24); return { w, h, lw, cw: (w - lw - 16) / 8, ch: (h - 30) / 4, top: 22 }; }
    function drawDr(dt) {
      const g = drGeom(), { w, h } = g, ctx = drC.ctx;
      if (!w) return;
      if (dr.playing) {
        const bpm = +$('drTempo').value, stepT = 60 / bpm / 2;
        dr.acc += dt;
        while (dr.acc >= stepT) { dr.acc -= stepT; dr.step = (dr.step + 1) % 8; ROWS.forEach((r, i) => { if (dr.grid[i][dr.step]) { r.play(); dr.flash[i][dr.step] = 1; } }); }
      }
      ctx.fillStyle = '#fff7ed'; ctx.fillRect(0, 0, w, h);
      for (let c = 0; c < 8; c++) textLight(ctx, String(c + 1), g.lw + 8 + g.cw * (c + .5), 11, c === dr.step && dr.playing ? '#be185d' : '#a8a29e', 11, 'center', 900);
      ROWS.forEach((r, i) => {
        const y = g.top + i * g.ch;
        textLight(ctx, L(r), 8, y + g.ch / 2, r.col, w < 420 ? 11 : 13, 'left', 900);
        for (let c = 0; c < 8; c++) {
          const x = g.lw + 8 + c * g.cw, on = dr.grid[i][c], f = dr.flash[i][c] || 0;
          dr.flash[i][c] = f * Math.pow(.02, dt);
          ctx.fillStyle = on ? r.col : (c % 2 ? '#f5f5f4' : '#fafaf9');
          if (on) ctx.globalAlpha = .55 + .45 * f;
          rr(ctx, x + 3, y + 3, g.cw - 6, g.ch - 6, 8); ctx.fill(); ctx.globalAlpha = 1;
          if (c === dr.step && dr.playing) { ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 2.5; rr(ctx, x + 2, y + 2, g.cw - 4, g.ch - 4, 9); ctx.stroke(); }
        }
      });
    }
    drC.c.addEventListener('pointerdown', (e) => {
      const g = drGeom(), p = localPoint(drC.c, e), c = Math.floor((p.x - g.lw - 8) / g.cw), r = Math.floor((p.y - g.top) / g.ch);
      if (r >= 0 && r < 4 && c >= 0 && c < 8) { ac(); dr.grid[r][c] = dr.grid[r][c] ? 0 : 1; if (dr.grid[r][c]) { ROWS[r].play(); dr.flash[r][c] = 1; } }
      else if (r >= 0 && r < 4 && p.x < g.lw) { ac(); ROWS[r].play(); }
    });
    $('drPlay').onclick = () => { ac(); cancelSpeech(); dr.playing = !dr.playing; dr.step = -1; dr.acc = 1; $('drPlay').textContent = playLbl(dr.playing); };
    root.querySelectorAll('[data-preset]').forEach((b) => b.addEventListener('click', () => { dr.grid = PRESETS[b.dataset.preset].map((r) => r.slice()); }));
    $('drClear').onclick = () => { dr.grid = dr.grid.map((r) => r.map(() => 0)); };
    function drInfo() {
      if (dr.infoKey === lang) return; dr.infoKey = lang;
      infoBox($('info_trong'), {
        emo: '🥁', title: T('Trống và nhạc cụ gõ', 'Drums and percussion'), sub: T('Giữ nhịp cho cả dàn nhạc', 'Keeping the beat'),
        rows: [[T('Trống', 'Drums'), T('Mặt trống bằng da căng, gõ vào thì rung lên. Trống to kêu trầm, trống nhỏ kêu cao. Trống có mặt ở lễ hội, đình làng, trường học.', 'A stretched skin vibrates when struck. Big drums sound low, small ones higher. Drums are at festivals, village halls and schools.')],
          [T('Phách', 'Clappers'), T('Thanh tre hoặc gỗ gõ vào nhau để giữ nhịp, quan trọng trong ca trù.', 'Bamboo or wooden sticks struck together to keep time, important in ca tru singing.')],
          [T('Song loan', 'Song loan'), T('Nhạc cụ gỗ nhỏ, đạp chân hoặc gõ tay cho kêu "cắc", giữ nhịp trong đờn ca tài tử, cải lương Nam Bộ.', 'A small wooden clapper tapped by foot or hand, keeping time in southern don ca tai tu and cai luong music.')]],
        notes: [['tip', T('🎶 Bấm các ô để bật hoặc tắt, rồi bấm "Phát" để nghe nhịp em vừa soạn. Bấm tên nhạc cụ để nghe thử.', '🎶 Tap cells on or off, then press “Play” to hear your rhythm. Tap an instrument’s name to hear it.')]]
      });
    }
    TABS.trong = { frame(dt) { drawDr(dt); drInfo(); setText('hud_trong', dr.playing ? T(`🥁 Đang phát – ô ${dr.step + 1}/8 – ${$('drTempo').value} nhịp/phút`, `🥁 Playing – step ${dr.step + 1}/8 – ${$('drTempo').value} bpm`) : T('🥁 Bấm ô để soạn nhịp, rồi bấm Phát', '🥁 Tap cells to build a beat, then press Play')); }, refresh() { $('drPlay').textContent = playLbl(dr.playing); dr.infoKey = ''; drInfo(); } };

    /* ---------- đố vui ---------- */
    const Q = (vi, en) => ({ vi, en });
    QUIZZES.push(makeQuiz($('quiz_bau'), Q([
      { q: 'Đàn bầu có mấy dây?', a: ['1 dây', '2 dây', '6 dây', '16 dây'], why: 'Đàn bầu là nhạc cụ độc đáo chỉ có một dây.' },
      { q: 'Uốn cần đàn bầu để làm gì?', a: ['Luyến láy, thay đổi cao độ', 'Lên dây mới', 'Làm đàn to hơn', 'Tắt tiếng đàn'], why: 'Uốn cần làm dây căng hoặc chùng, tiếng đàn trượt lên xuống.' },
      { q: 'Chạm vào điểm giữa dây (1/2) rồi gảy, âm thanh thế nào?', a: ['Cao gấp đôi', 'Trầm hơn', 'Không có tiếng', 'Như cũ'], why: 'Dây rung thành 2 đoạn nên tần số tăng gấp đôi.' },
      { q: 'Vì sao gọi là đàn bầu?', a: ['Ngày xưa dùng quả bầu khô làm bầu cộng hưởng', 'Vì đàn hình quả bầu', 'Vì đàn màu xanh', 'Vì ra đời ở làng Bầu'], why: 'Quả bầu khô giúp khuếch đại tiếng đàn.' },
      { q: 'Tiếng đàn bầu tạo ra nhờ đâu?', a: ['Dây đàn rung', 'Mặt da rung', 'Cột hơi rung', 'Ống tre rung'], why: 'Đàn bầu là nhạc cụ dây.' }
    ], [
      { q: 'How many strings does a dan bau have?', a: ['1', '2', '6', '16'], why: 'The dan bau is a unique one-string instrument.' },
      { q: 'Why bend the dan bau’s rod?', a: ['To slide the pitch up and down', 'To restring it', 'To make it bigger', 'To mute it'], why: 'Bending changes the string’s tension so the note slides.' },
      { q: 'Touch the middle (1/2) and pluck: the note is…', a: ['Twice as high', 'Lower', 'Silent', 'The same'], why: 'The string vibrates in 2 parts, doubling the frequency.' },
      { q: 'Why is it called “dan bau” (gourd instrument)?', a: ['A dried gourd once amplified it', 'It’s gourd-shaped', 'It’s green', 'It came from Bau village'], why: 'A dried gourd made the sound louder.' },
      { q: 'What makes the dan bau’s sound?', a: ['A vibrating string', 'A vibrating skin', 'A vibrating air column', 'A vibrating bamboo tube'], why: 'It is a string instrument.' }
    ])));
    QUIZZES.push(makeQuiz($('quiz_tranh'), Q([
      { q: 'Đàn tranh truyền thống thường có bao nhiêu dây?', a: ['16 dây', '1 dây', '4 dây', '100 dây'], why: 'Còn gọi là đàn thập lục, nghĩa là 16.' },
      { q: 'Người chơi đàn tranh gảy dây bằng gì?', a: ['Móng gảy đeo ở ngón tay', 'Cái búa', 'Cây vĩ kéo', 'Hơi thổi'], why: 'Tay phải đeo móng gảy để gảy dây.' },
      { q: '"Ngũ cung" nghĩa là gì?', a: ['Hệ thống 5 âm', '5 cây đàn', '5 người chơi', '5 bài hát'], why: 'Nhạc dân tộc thường dùng thang 5 âm.' },
      { q: 'Dây đàn ngắn và căng hơn thì tiếng thế nào?', a: ['Cao hơn', 'Trầm hơn', 'Không đổi', 'Mất tiếng'], why: 'Dây ngắn, căng rung nhanh hơn nên âm cao hơn.' },
      { q: 'Những miếng nhỏ đỡ dây trên mặt đàn tranh gọi là gì?', a: ['Nhạn đàn', 'Phím đàn', 'Lỗ thoát âm', 'Cần đàn'], why: 'Nhạn đàn có thể dịch chuyển để lên dây.' }
    ], [
      { q: 'How many strings does a traditional dan tranh have?', a: ['16', '1', '4', '100'], why: 'It is also called the “sixteen” zither.' },
      { q: 'What do players pluck with?', a: ['Finger picks', 'A hammer', 'A bow', 'Their breath'], why: 'The right hand wears picks.' },
      { q: 'What does “pentatonic” mean?', a: ['A 5-note scale', '5 instruments', '5 players', '5 songs'], why: 'Traditional music often uses a 5-note scale.' },
      { q: 'A shorter, tighter string sounds…', a: ['Higher', 'Lower', 'The same', 'Silent'], why: 'It vibrates faster, so the pitch is higher.' },
      { q: 'What are the small supports under the strings called?', a: ['Bridges', 'Frets', 'Sound holes', 'Rods'], why: 'Bridges can be moved to tune the strings.' }
    ])));
    QUIZZES.push(makeQuiz($('quiz_sao'), Q([
      { q: 'Sáo trúc phát ra tiếng nhờ đâu?', a: ['Cột không khí trong ống rung', 'Dây đàn rung', 'Mặt da rung', 'Pin điện'], why: 'Thổi qua lỗ thổi làm cột hơi trong ống rung.' },
      { q: 'Bịt hết các lỗ thì tiếng sáo thế nào?', a: ['Trầm nhất', 'Cao nhất', 'Không kêu', 'Kêu hai tiếng'], why: 'Cột hơi dài nhất nên âm trầm nhất.' },
      { q: 'Mở dần các lỗ từ dưới lên, tiếng sáo thế nào?', a: ['Cao dần', 'Trầm dần', 'Nhỏ dần', 'Không đổi'], why: 'Cột hơi ngắn lại nên âm cao lên.' },
      { q: 'Sáo trúc làm từ gì?', a: ['Ống trúc, nứa', 'Kim loại', 'Nhựa', 'Đá'], why: 'Sáo được khoét từ ống trúc hoặc nứa.' },
      { q: 'Người thổi sáo trúc cầm sáo thế nào?', a: ['Cầm ngang', 'Cầm dọc thẳng đứng', 'Đặt trên bàn', 'Treo lên tường'], why: 'Sáo trúc Việt Nam thường là sáo ngang.' }
    ], [
      { q: 'What makes the bamboo flute sound?', a: ['A vibrating column of air', 'A vibrating string', 'A vibrating skin', 'A battery'], why: 'Blowing across the mouth hole sets the air inside vibrating.' },
      { q: 'With all holes covered, the note is…', a: ['The lowest', 'The highest', 'Silent', 'Two notes'], why: 'The air column is longest, so the pitch is lowest.' },
      { q: 'Opening holes from the bottom makes the note…', a: ['Higher', 'Lower', 'Quieter', 'Unchanged'], why: 'The air column gets shorter, so the pitch rises.' },
      { q: 'What is a sao truc made of?', a: ['Bamboo', 'Metal', 'Plastic', 'Stone'], why: 'It is cut from a bamboo tube.' },
      { q: 'How is the sao truc held?', a: ['Sideways', 'Straight down', 'On a table', 'Hung on a wall'], why: 'The Vietnamese sao is usually a transverse (sideways) flute.' }
    ])));
    QUIZZES.push(makeQuiz($('quiz_trung'), Q([
      { q: "Đàn t'rưng là nhạc cụ của vùng nào?", a: ['Tây Nguyên', 'Đồng bằng sông Hồng', 'Nam Bộ', 'Hải đảo'], why: 'Của đồng bào Ba Na, Gia Rai, Ê Đê… ở Tây Nguyên.' },
      { q: "Ống t'rưng dài thì tiếng thế nào?", a: ['Trầm', 'Cao', 'Không kêu', 'Chói tai'], why: 'Ống dài rung chậm hơn nên tiếng trầm.' },
      { q: "Đàn t'rưng làm từ gì?", a: ['Ống tre, nứa', 'Đồng', 'Da trâu', 'Kim loại'], why: 'Các ống tre nứa dài ngắn khác nhau.' },
      { q: 'Nhạc cụ nào của Tây Nguyên được UNESCO công nhận là di sản?', a: ['Cồng chiêng', 'Đàn bầu', 'Đàn tranh', 'Sáo trúc'], why: 'Không gian văn hóa Cồng chiêng Tây Nguyên.' },
      { q: "Chơi đàn t'rưng bằng cách nào?", a: ['Gõ vào ống', 'Thổi vào ống', 'Kéo vĩ', 'Gảy dây'], why: "T'rưng là nhạc cụ gõ." }
    ], [
      { q: 'Where does the t’rung come from?', a: ['The Central Highlands', 'The Red River Delta', 'The far south', 'The islands'], why: 'It belongs to Ba Na, Gia Rai, E De and other Highlands peoples.' },
      { q: 'A long t’rung tube sounds…', a: ['Low', 'High', 'Silent', 'Shrill'], why: 'Longer tubes vibrate more slowly, so they sound lower.' },
      { q: 'What is the t’rung made of?', a: ['Bamboo tubes', 'Bronze', 'Buffalo hide', 'Metal'], why: 'Bamboo tubes of different lengths.' },
      { q: 'Which Highlands music is UNESCO heritage?', a: ['Gong music', 'Dan bau', 'Dan tranh', 'Bamboo flute'], why: 'The Space of Gong Culture in the Central Highlands.' },
      { q: 'How do you play the t’rung?', a: ['Strike the tubes', 'Blow into them', 'Use a bow', 'Pluck strings'], why: 'It is a percussion instrument.' }
    ])));
    QUIZZES.push(makeQuiz($('quiz_trong'), Q([
      { q: 'Trống phát ra tiếng nhờ đâu?', a: ['Mặt da căng rung lên', 'Dây đàn rung', 'Cột hơi rung', 'Pin điện'], why: 'Gõ vào mặt trống làm mặt da rung.' },
      { q: 'Trống to thường kêu thế nào so với trống nhỏ?', a: ['Trầm hơn', 'Cao hơn', 'Giống hệt', 'Không kêu'], why: 'Mặt trống to rung chậm hơn nên tiếng trầm.' },
      { q: 'Song loan dùng để giữ nhịp trong loại nhạc nào?', a: ['Đờn ca tài tử, cải lương', 'Nhạc rock', 'Nhạc giao hưởng', 'Nhạc điện tử'], why: 'Song loan là nhạc cụ giữ nhịp của âm nhạc Nam Bộ.' },
      { q: 'Phách là nhạc cụ quan trọng trong loại hình nào?', a: ['Ca trù', 'Múa rối nước', 'Hát quan họ không đệm', 'Kịch nói'], why: 'Đào nương ca trù vừa hát vừa gõ phách.' },
      { q: 'Nhạc cụ gõ có vai trò gì trong dàn nhạc?', a: ['Giữ nhịp', 'Hát lời', 'Lên dây đàn', 'Bán vé'], why: 'Nhịp giúp cả dàn nhạc chơi đều với nhau.' }
    ], [
      { q: 'What makes a drum sound?', a: ['A stretched skin vibrating', 'A vibrating string', 'A vibrating air column', 'A battery'], why: 'Striking the head makes the skin vibrate.' },
      { q: 'A big drum usually sounds…', a: ['Lower than a small one', 'Higher', 'Exactly the same', 'Silent'], why: 'A big head vibrates more slowly.' },
      { q: 'The song loan keeps time in…', a: ['Don ca tai tu and cai luong', 'Rock', 'Symphonies', 'Electronic music'], why: 'It is the time-keeper of southern Vietnamese music.' },
      { q: 'Clappers (phach) are key in…', a: ['Ca tru', 'Water puppetry', 'Unaccompanied quan ho', 'Spoken drama'], why: 'Ca tru singers sing while tapping the clappers.' },
      { q: 'What do percussion instruments do in a band?', a: ['Keep the beat', 'Sing the words', 'Tune the strings', 'Sell tickets'], why: 'The beat keeps everyone playing together.' }
    ])));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'bau';
    root.querySelectorAll('.music-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.music-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('u-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.music-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.music-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.music-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
