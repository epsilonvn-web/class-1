/* Epsilon Edu - Tool: 5 giac quan (Five senses): mat, tai, luoi va mui, da
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.fiveSenses = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "fiveSenses";
  let activeCleanup = null;

  const CSS = `
.sense-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.sense-tool *{box-sizing:border-box}.sense-tool button,.sense-tool input{font:inherit}.sense-tool button{cursor:pointer}.sense-tool .hidden{display:none!important}
.sense-tool button:focus-visible,.sense-tool canvas:focus-visible,.sense-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.sense-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.sense-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.sense-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.sense-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.sense-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.sense-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.sense-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.sense-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.sense-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.sense-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.sense-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.sense-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.sense-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.sense-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.sense-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.sense-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.sense-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.sense-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.sense-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.sense-panel{width:100%}.sense-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.sense-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.sense-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.sense-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.sense-tool .card-head.compact{margin-bottom:9px}
.sense-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.sense-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.sense-tool .btn,.sense-tool .soft-btn,.sense-tool .segmented button,.sense-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.sense-tool .btn:hover,.sense-tool .soft-btn:hover,.sense-tool .segmented button:hover,.sense-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.sense-tool .btn{padding:0 12px}.sense-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.sense-tool .segmented{display:flex;gap:7px;margin:0}.sense-tool .segmented button{padding:0 13px}
.sense-tool .segmented button[aria-pressed="true"],.sense-tool .soft-btn[aria-pressed="true"],.sense-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.sense-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.sense-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.sense-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.sense-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.sense-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.sense-tool .range-control input{width:100%;accent-color:#8b5cf6}.sense-tool .range-control b{color:#7c3aed;font-size:13px}
.sense-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.sense-tool .soft-btn{padding:0 12px}
.sense-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.sense-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.sense-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.sense-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.sense-tool .info-title{display:flex;align-items:center;gap:10px}.sense-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.sense-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.sense-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.sense-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.sense-tool .facts{display:grid;gap:6px;margin-top:10px}.sense-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.sense-tool .facts b{color:#7c3aed;font-size:13.5px}.sense-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.sense-tool .fun,.sense-tool .warn,.sense-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.sense-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.sense-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.sense-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.sense-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.sense-tool .state-big.up{color:#0f766e}.sense-tool .state-big.down{color:#b45309}
.sense-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.sense-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.sense-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.sense-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.sense-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.sense-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.sense-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.sense-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.sense-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.sense-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.sense-tool .qopt:hover{filter:brightness(.985)}.sense-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.sense-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.sense-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.sense-tool .qfb,.sense-tool .score{font-size:13px;font-weight:900}.sense-tool .qfb.ok{color:#15803d}.sense-tool .qfb.no{color:#be123c}.sense-tool .score{color:#7c3aed}
.sense-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.sense-grid{grid-template-columns:1fr;align-items:start}.sense-side{grid-template-rows:auto auto;height:auto}.sense-tool .control-grid{grid-template-columns:1fr}.sense-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.sense-hero{flex-wrap:wrap;padding:12px}.sense-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.sense-tabs{grid-template-columns:1fr}.sense-tabs .tab{min-height:40px}.sense-card{padding:11px;border-radius:18px}.sense-tool .card-head{align-items:flex-start;flex-direction:column}.sense-tool .head-actions{width:100%;justify-content:space-between}.sense-tool .head-actions .segmented{flex:1;min-width:0}.sense-tool .head-actions .segmented button{flex:1;padding:0 8px}.sense-tool .qopts{grid-template-columns:1fr}.sense-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.sense-tool *{transition:none!important}}

.sense-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.sense-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.sense-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.sense-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.sense-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.sense-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.sense-tool .checklist{display:grid;gap:6px;margin-top:10px}
.sense-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.sense-tool .checklist .ok{color:#15803d}.sense-tool .checklist .no{color:#be123c}.sense-tool .checklist .wait{color:#94a3b8}
.sense-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.sense-tool .process span{flex:1}.sense-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.sense-tool .process .on{color:#0284c7}.sense-tool .process i.on{color:#ec4899}
@media(max-width:640px){.sense-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.sense-tool .slider-pair{grid-template-columns:1fr}}

.sense-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.sense-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.sense-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.sense-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.sense-tool .pulse-box{display:grid;gap:10px;margin-bottom:4px}
.sense-tool .pulse-btns{display:grid;gap:8px}
.sense-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.sense-tool .rx-box{display:grid;place-items:center;min-height:120px;border-radius:16px;font-size:18px;font-weight:900;text-align:center;cursor:pointer;user-select:none;-webkit-user-select:none;border:1px solid #e9d5ff;touch-action:manipulation}
@media(max-width:640px){.sense-tool .slider-pair{grid-template-columns:1fr}}

.sense-tabs{grid-template-columns:repeat(4,minmax(0,1fr))}
@media(max-width:640px){.sense-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="sense-tool" data-tool-root>
  <div class="sense-hero">
    <div class="sense-hero-icon" aria-hidden="true">🖐️</div>
    <div>
      <p class="sense-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="sense-lead" data-t="lead"></p>
    </div>
    <div class="sense-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="sAudioNotice" class="sense-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="sense-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="eye" data-t="tab_eye"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="ear" data-t="tab_ear"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="taste" data-t="tab_taste"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="skin" data-t="tab_skin"></button>
  </div>
  <section id="s-eye" class="sense-panel" role="tabpanel">
    <div class="sense-grid">
      <article class="sense-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_eye"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_eye" role="img" data-ta="cv_eye"></canvas></div>
        <p id="hud_eye" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="lightL"></span><input id="eyeLight" type="range" min="0" max="100" value="55" step="1"><b id="eyeLightTxt"></b></label>
      </article>
      <div class="sense-side">
        <aside class="sense-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_eye"></span><h2 data-t="sh_eye"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_eyeGame" role="img" aria-label="Tìm ô khác màu / Find the odd colour"></canvas></div>
          <div id="info_eye" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_eye" class="sense-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="s-ear" class="sense-panel hidden" role="tabpanel">
    <div class="sense-grid">
      <article class="sense-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_ear"></h2></div>
          <div class="head-actions"><button id="earPlay" class="btn main" type="button" data-t="playTone"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_ear" role="img" data-ta="cv_ear"></canvas></div>
        <p id="hud_ear" class="hud" aria-live="polite"></p>
        <div class="slider-pair">
          <label class="range-control"><span data-t="volL"></span><input id="earVol" type="range" min="0" max="100" value="50" step="1"></label>
          <label class="range-control"><span data-t="pitchL"></span><input id="earPitch" type="range" min="0" max="100" value="40" step="1"></label>
        </div>
      </article>
      <div class="sense-side">
        <aside class="sense-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_ear"></span><h2 data-t="sh_ear"></h2></div></div>
          <div id="earGame" class="pulse-box"></div>
          <div id="info_ear" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_ear" class="sense-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="s-taste" class="sense-panel hidden" role="tabpanel">
    <div class="sense-grid">
      <article class="sense-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_taste"></h2></div>
          <div class="head-actions"><button id="tsPinch" class="soft-btn" type="button" aria-pressed="false" data-t="pinch"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_taste" role="img" data-ta="cv_taste"></canvas></div>
        <p id="hud_taste" class="hud" aria-live="polite"></p>
      </article>
      <div class="sense-side">
        <aside class="sense-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_taste"></span><h2 data-t="sh_taste"></h2></div></div>
          <div id="tasteGame" class="pulse-box"></div>
          <div id="info_taste" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_taste" class="sense-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="s-skin" class="sense-panel hidden" role="tabpanel">
    <div class="sense-grid">
      <article class="sense-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_skin"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_skin" role="img" data-ta="cv_skin"></canvas></div>
        <p id="hud_skin" class="hud" aria-live="polite"></p>
        <div id="skObjs" class="toggle-row" style="justify-content:flex-start;margin-top:6px" role="group" data-ta="objLabel">
          <button type="button" class="soft-btn" data-obj="0" aria-pressed="true"></button>
          <button type="button" class="soft-btn" data-obj="1" aria-pressed="false"></button>
          <button type="button" class="soft-btn" data-obj="2" aria-pressed="false"></button>
          <button type="button" class="soft-btn" data-obj="3" aria-pressed="false"></button>
          <button type="button" class="soft-btn" data-obj="4" aria-pressed="false"></button>
        </div>
      </article>
      <div class="sense-side">
        <aside class="sense-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_skin"></span><h2 data-t="sh_skin"></h2></div></div>
          <div class="pulse-box"><div id="rxBox" class="rx-box" role="button" tabindex="0"></div><p id="rxBest" class="muted" style="margin:0"></p></div>
          <div id="info_skin" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_skin" class="sense-card quiz-card"></article>
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
    const audioNotice = $('sAudioNotice');
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
      kicker: ['Epsilon Edu · Khoa học trực quan', 'Epsilon Edu · Visual Science'],
      title: ['5 giác quan', 'The Five Senses'],
      lead: ['Mắt, tai, mũi, lưỡi và da giúp em biết thế giới quanh mình. Mỗi giác quan có một thử thách nhỏ đang chờ em!', 'Eyes, ears, nose, tongue and skin tell you about the world. Each sense has a little challenge waiting for you!'],
      tabsLabel: ['Các giác quan', 'The senses'], eyeSim: ['Khám phá', 'Explore'],
      tab_eye: ['👁️ Mắt', '👁️ Eyes'], h_eye: ['Con ngươi co giãn theo ánh sáng', 'The pupil changes with light'],
      cv_eye: ['Mắt và con ngươi thay đổi khi đèn sáng hoặc tối', 'An eye whose pupil changes as the light gets brighter or dimmer'],
      se_eye: ['Thử thách', 'Challenge'], sh_eye: ['Tìm ô khác màu', 'Find the odd colour'],
      tab_ear: ['👂 Tai', '👂 Ears'], h_ear: ['Âm thanh đi vào tai', 'How sound reaches your ear'],
      cv_ear: ['Sóng âm từ loa đi vào tai, làm màng nhĩ rung', 'Sound waves travel from a speaker into the ear and shake the eardrum'],
      se_ear: ['Thử thách', 'Challenge'], sh_ear: ['Âm nào cao hơn?', 'Which sound is higher?'],
      tab_taste: ['👅 Lưỡi và mũi', '👅 Tongue and nose'], h_taste: ['Nếm và ngửi', 'Tasting and smelling'],
      cv_taste: ['Lưỡi nếm vị, mũi ngửi mùi, cùng báo về não', 'The tongue tastes, the nose smells, both report to the brain'],
      se_taste: ['Thử thách', 'Challenge'], sh_taste: ['Món này vị gì?', 'What does it taste like?'],
      tab_skin: ['✋ Da', '✋ Skin'], h_skin: ['Da cảm nhận và phản xạ', 'Feeling and reflexes'],
      cv_skin: ['Bàn tay chạm vào đồ vật, tín hiệu chạy theo dây thần kinh về não', 'A hand touches things; signals travel along nerves to the brain'],
      se_skin: ['Thử thách', 'Challenge'], sh_skin: ['Phản xạ nhanh cỡ nào?', 'How fast are your reflexes?'],
      lightL: ['Kéo để bật đèn sáng hoặc tối', 'Drag to make the light brighter or dimmer'],
      volL: ['Độ to', 'Loudness'], pitchL: ['Độ cao: trầm → bổng', 'Pitch: low → high'], playTone: ['🔊 Nghe thử', '🔊 Listen'],
      pinch: ['🤏 Bịt mũi', '🤏 Pinch nose'], objLabel: ['Chọn đồ vật để chạm vào', 'Pick something to touch']
    };

    /* =====================================================================
       1. MẮT: con ngươi co giãn + thử thách tìm ô khác màu
       ===================================================================== */
    let eyeLight = 55, pupil = .45, eyeLevel = 1, eyeScore = 0, eyeGrid = null, eyeFlash = 0, eyeInfoKey = '';
    const eyeC = mk('c_eye', (w) => clamp(w * .6, 280, 480));
    const eyeG = mk('c_eyeGame', (w) => clamp(w * .9, 240, 340), () => { eyeGrid = null; });
    function drawEye(dt) {
      const { w, h, ctx } = eyeC;
      if (!w) return;
      const k = eyeLight / 100, target = lerp(.62, .2, k);
      pupil += (target - pupil) * Math.min(1, dt * 2.5);
      ctx.fillStyle = mix('#111827', '#fef9c3', k); ctx.fillRect(0, 0, w, h);
      // đèn
      const lx = w * .12, ly = h * .2;
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx, ly - 18); ctx.stroke();
      const lg = ctx.createRadialGradient(lx, ly, 2, lx, ly, 30 + 120 * k); lg.addColorStop(0, `rgba(253,224,71,${.2 + .7 * k})`); lg.addColorStop(1, 'rgba(253,224,71,0)');
      ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(lx, ly, 30 + 120 * k, 0, TAU); ctx.fill();
      ctx.fillStyle = mix('#475569', '#fde047', k); ctx.beginPath(); ctx.arc(lx, ly, 16, 0, TAU); ctx.fill();
      // mắt
      const cx = w * .58, cy = h * .5, ew = Math.min(w * .3, h * .5), eh = ew * .55;
      ctx.fillStyle = '#fde7d4'; ctx.beginPath(); ctx.ellipse(cx, cy, ew * 1.18, eh * 1.45, 0, 0, TAU); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.moveTo(cx - ew, cy); ctx.quadraticCurveTo(cx, cy - eh * 1.25, cx + ew, cy); ctx.quadraticCurveTo(cx, cy + eh * 1.25, cx - ew, cy); ctx.closePath();
      ctx.fillStyle = '#fff'; ctx.fill(); ctx.clip();
      const ir = eh * .95, ig = ctx.createRadialGradient(cx, cy, ir * .2, cx, cy, ir);
      ig.addColorStop(0, '#a16207'); ig.addColorStop(.7, '#78350f'); ig.addColorStop(1, '#451a03');
      ctx.fillStyle = ig; ctx.beginPath(); ctx.arc(cx, cy, ir, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(253,230,138,.35)'; ctx.lineWidth = 1;
      for (let a = 0; a < 24; a++) { const t = a / 24 * TAU; ctx.beginPath(); ctx.moveTo(cx + Math.cos(t) * ir * pupil * 1.05, cy + Math.sin(t) * ir * pupil * 1.05); ctx.lineTo(cx + Math.cos(t) * ir * .92, cy + Math.sin(t) * ir * .92); ctx.stroke(); }
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(cx, cy, ir * pupil, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(cx - ir * .3, cy - ir * .3, ir * .12, 0, TAU); ctx.fill();
      ctx.restore();
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - ew, cy); ctx.quadraticCurveTo(cx, cy - eh * 1.25, cx + ew, cy); ctx.stroke();
      for (let i = 0; i < 9; i++) { const t = .1 + i * .1, x = lerp(cx - ew, cx + ew, t), y = cy - eh * 1.25 * 2 * t * (1 - t) * 1.0; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (t - .5) * 10, y - 10); ctx.stroke(); }
      const fs = w < 420 ? 10.5 : 12, tc = k > .5 ? '#334155' : '#e2e8f0';
      ctx.strokeStyle = tc; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx + ir * pupil * .7, cy + ir * pupil * .7); ctx.lineTo(cx + ew * .9, cy + eh * 1.2); ctx.stroke();
      textLight(ctx, T('Con ngươi', 'Pupil'), cx + ew * .92, cy + eh * 1.3, tc, fs, 'left', 900);
      ctx.beginPath(); ctx.moveTo(cx - ir * .85, cy - ir * .2); ctx.lineTo(cx - ew * 1.05, cy - eh * 1.2); ctx.stroke();
      textLight(ctx, T('Lòng đen (mống mắt)', 'Iris'), cx - ew * 1.07, cy - eh * 1.3, tc, fs, 'right', 900);
    }
    function newEyeGrid() {
      const n = Math.min(7, 2 + eyeLevel), hue = Math.floor(rand(0, 360)), diff = Math.max(4, 24 - eyeLevel * 2.6);
      eyeGrid = { n, hue, diff, odd: Math.floor(rand(0, n * n)) };
    }
    function drawEyeGame() {
      const { w, h, ctx } = eyeG;
      if (!w) return;
      if (!eyeGrid) newEyeGrid();
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
      const top = 30, S = Math.min(w - 16, h - top - 8), cell = S / eyeGrid.n, x0 = (w - S) / 2;
      textLight(ctx, T(`Cấp ${eyeLevel} – Điểm ${eyeScore}`, `Level ${eyeLevel} – Score ${eyeScore}`), w / 2, 15, '#6d28d9', 13, 'center', 900);
      for (let i = 0; i < eyeGrid.n * eyeGrid.n; i++) {
        const r = Math.floor(i / eyeGrid.n), c = i % eyeGrid.n, l = i === eyeGrid.odd ? 55 + eyeGrid.diff : 55;
        ctx.fillStyle = `hsl(${eyeGrid.hue},70%,${l}%)`; rr(ctx, x0 + c * cell + 2, top + r * cell + 2, cell - 4, cell - 4, Math.min(10, cell * .2)); ctx.fill();
      }
      if (eyeFlash > 0) { eyeFlash -= .03; ctx.fillStyle = `rgba(239,68,68,${eyeFlash * .35})`; ctx.fillRect(0, 0, w, h); }
    }
    eyeG.c.addEventListener('pointerdown', (e) => {
      if (!eyeGrid) return;
      const { w, h } = eyeG, p = localPoint(eyeG.c, e), top = 30, S = Math.min(w - 16, h - top - 8), cell = S / eyeGrid.n, x0 = (w - S) / 2;
      const c = Math.floor((p.x - x0) / cell), r = Math.floor((p.y - top) / cell);
      if (c < 0 || r < 0 || c >= eyeGrid.n || r >= eyeGrid.n) return;
      if (r * eyeGrid.n + c === eyeGrid.odd) { eyeScore++; eyeLevel = Math.min(12, eyeLevel + 1); }
      else { eyeFlash = 1; eyeLevel = Math.max(1, eyeLevel - 1); }
      newEyeGrid();
    });
    function eyeInfo() {
      const key = lang;
      if (key === eyeInfoKey) return;
      eyeInfoKey = key;
      infoBox($('info_eye'), {
        emo: '👁️', title: T('Đôi mắt', 'Your eyes'), sub: T('Giác quan nhìn', 'The sense of sight'),
        rows: [[T('Giúp em', 'Helps you'), T('Nhìn hình dạng, màu sắc, xa gần, sáng tối.', 'See shapes, colours, near and far, light and dark.')],
          [T('Con ngươi', 'Pupil'), T('Tự co nhỏ khi sáng để không bị chói, mở to khi tối để nhận thêm ánh sáng.', 'Shrinks in bright light so you aren’t dazzled; opens wide in the dark to let in more light.')],
          [T('Giữ mắt khỏe', 'Healthy eyes'), T('Đọc sách đủ sáng, ngồi thẳng lưng. Cứ 20 phút nhìn màn hình thì nhìn ra xa khoảng 20 giây.', 'Read in good light and sit up straight. Every 20 minutes of screen time, look far away for about 20 seconds.')]],
        notes: [['tip', T('🎯 Thử thách: bấm vào ô có màu hơi khác. Càng lên cấp, màu càng giống nhau!', '🎯 Challenge: tap the square with a slightly different colour. The higher the level, the closer the colours!')]]
      });
    }
    $('eyeLight').addEventListener('input', () => { eyeLight = +$('eyeLight').value; });
    TABS.eye = {
      frame(dt) {
        drawEye(dt); drawEyeGame(); eyeInfo();
        const word = eyeLight < 30 ? T('tối', 'dim') : eyeLight < 70 ? T('vừa', 'medium') : T('rất sáng', 'very bright');
        setText('hud_eye', `💡 ${T('Ánh sáng', 'Light')}: ${word} – ${T('con ngươi', 'pupil')} ${pupil > .48 ? T('mở to', 'wide open') : pupil < .3 ? T('co nhỏ', 'small') : T('vừa phải', 'medium')}`);
        setText('eyeLightTxt', `${eyeLight}%`);
      },
      refresh() { eyeInfoKey = ''; eyeInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_eye'), {
      vi: [
        { q: 'Khi trời rất sáng, con ngươi sẽ thế nào?', a: ['Co nhỏ lại', 'Mở to ra', 'Không thay đổi', 'Đổi màu'], why: 'Con ngươi co nhỏ để bớt ánh sáng đi vào mắt, tránh chói.' },
        { q: 'Vì sao vào phòng tối một lúc ta mới nhìn rõ dần?', a: ['Con ngươi cần thời gian mở to', 'Đèn tự sáng lên', 'Mắt bị mỏi', 'Đồ vật tự di chuyển'], why: 'Con ngươi mở to dần để nhận thêm ánh sáng.' },
        { q: 'Việc nào tốt cho mắt?', a: ['Đọc sách nơi đủ ánh sáng', 'Đọc sách trong bóng tối', 'Nhìn thẳng vào Mặt Trời', 'Dụi mắt bằng tay bẩn'], why: 'Đủ ánh sáng giúp mắt không phải điều tiết quá sức.' },
        { q: 'Ta nhìn thấy đồ vật là nhờ đâu?', a: ['Ánh sáng từ đồ vật đi vào mắt', 'Mắt phát ra tia sáng', 'Đồ vật phát ra âm thanh', 'Nhờ mũi'], why: 'Ánh sáng chiếu vào đồ vật rồi hắt vào mắt em.' },
        { q: 'Khi xem màn hình lâu, em nên làm gì?', a: ['Thỉnh thoảng nhìn ra xa để mắt nghỉ', 'Dí sát mặt vào màn hình', 'Không chớp mắt', 'Tắt hết đèn phòng'], why: 'Nhìn ra xa giúp mắt được thư giãn.' },
        { q: 'Phần lòng đen có màu của mắt gọi là gì?', a: ['Mống mắt', 'Con ngươi', 'Lông mi', 'Lông mày'], why: 'Mống mắt có màu (nâu, đen…), con ngươi là lỗ tròn màu đen ở giữa.' }
      ],
      en: [
        { q: 'In very bright light, the pupil…', a: ['Gets smaller', 'Gets bigger', 'Stays the same', 'Changes colour'], why: 'It shrinks to let less light in and avoid glare.' },
        { q: 'Why do you see better after a while in a dark room?', a: ['The pupil needs time to open wide', 'The lights turn on', 'Your eyes get tired', 'Things move'], why: 'The pupil slowly opens to let in more light.' },
        { q: 'Which is good for your eyes?', a: ['Reading in good light', 'Reading in the dark', 'Staring at the Sun', 'Rubbing eyes with dirty hands'], why: 'Good light means your eyes don’t have to strain.' },
        { q: 'How do we see things?', a: ['Light from objects enters our eyes', 'Eyes shoot out rays', 'Objects make sounds', 'With our nose'], why: 'Light hits objects and bounces into your eyes.' },
        { q: 'After a long time on a screen, you should…', a: ['Look far away to rest your eyes', 'Put your face close to the screen', 'Stop blinking', 'Turn off all the lights'], why: 'Looking far away relaxes your eyes.' },
        { q: 'What is the coloured part of the eye?', a: ['The iris', 'The pupil', 'Eyelashes', 'Eyebrows'], why: 'The iris is coloured; the pupil is the black hole in the middle.' }
      ]
    }));

    /* =====================================================================
       2. TAI: sóng âm, màng nhĩ + thử thách âm nào cao hơn (Web Audio)
       ===================================================================== */
    let earVol = 50, earPitch = 40, earInfoKey = '', actx = null;
    let earGame = { f: [0, 0], ans: -1, level: 1, score: 0, heard: [false, false], msg: '' };
    const earC = mk('c_ear', (w) => clamp(w * .55, 260, 440));
    function getAudioCtx() {
      if (!actx) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; actx = new AC(); cleanupFns.push(() => { try { actx.close(); } catch (_) {} }); }
      if (actx.state === 'suspended') actx.resume();
      return actx;
    }
    function tone(freq, vol, dur = .7) {
      const a = getAudioCtx(); if (!a) return;
      cancelSpeech();
      const o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .05); g.gain.setValueAtTime(vol, t + dur - .12); g.gain.linearRampToValueAtTime(0, t + dur);
      o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + .02);
    }
    const earFreq = () => 180 * Math.pow(2, earPitch / 100 * 2.5);
    function drawEar() {
      const { w, h, ctx } = earC;
      if (!w) return;
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h);
      const cy = h * .5, sx = w * .1, ex = w * .62, A = h * (.03 + earVol / 100 * .16), lam = lerp(w * .16, w * .04, earPitch / 100);
      // loa
      ctx.fillStyle = '#334155'; rr(ctx, sx - 22, cy - 30, 26, 60, 6); ctx.fill();
      ctx.beginPath(); ctx.moveTo(sx + 4, cy - 18); ctx.lineTo(sx + 26, cy - 42); ctx.lineTo(sx + 26, cy + 42); ctx.lineTo(sx + 4, cy + 18); ctx.closePath(); ctx.fill();
      // sóng
      const ph = reduceMotion ? 0 : clock * 6;
      ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 3; ctx.beginPath();
      for (let x = sx + 30; x <= ex; x += 2) { const y = cy + Math.sin((x - sx) / lam * TAU - ph) * A * (1 - (x - sx) / (ex - sx) * .35); if (x === sx + 30) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke();
      // tai (lát cắt)
      ctx.fillStyle = '#fde7d4'; ctx.strokeStyle = '#e8b796'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ex, cy - h * .32); ctx.bezierCurveTo(ex - w * .08, cy - h * .3, ex - w * .07, cy - h * .05, ex + 2, cy - h * .06); ctx.lineTo(ex + 2, cy + h * .06); ctx.bezierCurveTo(ex - w * .06, cy + h * .1, ex - w * .04, cy + h * .3, ex + w * .02, cy + h * .3); ctx.lineTo(ex + w * .06, cy + h * .3); ctx.lineTo(ex + w * .06, cy - h * .32); ctx.closePath(); ctx.fill(); ctx.stroke();
      const canalEnd = ex + w * .14;
      ctx.fillStyle = '#fecaca'; ctx.fillRect(ex, cy - h * .05, canalEnd - ex, h * .1);
      const vib = reduceMotion ? 0 : Math.sin(clock * (20 + earPitch)) * (2 + earVol / 25);
      ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(canalEnd + vib, cy, 3, h * .07, 0, 0, TAU); ctx.stroke();
      ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(canalEnd + 4, cy); ctx.lineTo(canalEnd + w * .04, cy - h * .03); ctx.lineTo(canalEnd + w * .06, cy); ctx.stroke();
      const kx = canalEnd + w * .1, ky = cy + h * .02;
      ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 4; ctx.beginPath();
      for (let t = 0; t < 3.2 * TAU; t += .1) { const r = h * .07 * (1 - t / (3.6 * TAU)); const x = kx + Math.cos(t) * r, y = ky + Math.sin(t) * r; if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke();
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.lineDashOffset = -clock * 30;
      ctx.beginPath(); ctx.moveTo(kx + h * .07, ky); ctx.lineTo(w - 10, h * .12); ctx.stroke(); ctx.setLineDash([]);
      const fs = w < 420 ? 10 : 11.5;
      textLight(ctx, T('Vành tai', 'Outer ear'), ex - w * .03, cy - h * .37, '#92400e', fs, 'center', 900);
      textLight(ctx, T('Màng nhĩ rung', 'Eardrum shakes'), canalEnd, cy + h * .17, '#be123c', fs, 'center', 900);
      textLight(ctx, T('Ốc tai', 'Cochlea'), kx, ky + h * .14, '#6d28d9', fs, 'center', 900);
      textLight(ctx, T('→ về não', '→ to the brain'), w - 10, h * .07, '#a16207', fs, 'right', 900);
      textLight(ctx, T(`Sóng âm ${earVol > 65 ? 'to' : earVol < 30 ? 'nhỏ' : 'vừa'}, ${earPitch > 60 ? 'bổng (cao)' : earPitch < 30 ? 'trầm (thấp)' : 'vừa'}`, `${earVol > 65 ? 'Loud' : earVol < 30 ? 'Quiet' : 'Medium'}, ${earPitch > 60 ? 'high' : earPitch < 30 ? 'low' : 'medium'} sound`), sx + 30, h - 14, '#4f46e5', fs, 'left', 900);
    }
    function earNewRound() {
      const base = rand(300, 700), ratio = Math.max(1.04, 1.6 - earGame.level * .08), hi = Math.random() < .5 ? 0 : 1;
      earGame.f = hi === 0 ? [base * ratio, base] : [base, base * ratio]; earGame.ans = hi; earGame.heard = [false, false]; earGame.msg = '';
      earRenderGame();
    }
    function earRenderGame() {
      const box = $('earGame');
      box.innerHTML = `
        <p class="muted">${T('Bấm nghe 2 âm, rồi chọn âm nào cao (bổng) hơn.', 'Listen to both sounds, then pick the higher one.')}</p>
        <div class="pulse-btns" style="grid-template-columns:1fr 1fr"><button class="btn" type="button" data-play="0">▶ ${T('Âm 1', 'Sound 1')}</button><button class="btn" type="button" data-play="1">▶ ${T('Âm 2', 'Sound 2')}</button></div>
        <div class="pulse-btns" style="grid-template-columns:1fr 1fr"><button class="btn main" type="button" data-pick="0">${T('Âm 1 cao hơn', 'Sound 1 is higher')}</button><button class="btn main" type="button" data-pick="1">${T('Âm 2 cao hơn', 'Sound 2 is higher')}</button></div>
        <p class="score" style="margin:0">${T(`Cấp ${earGame.level} – Điểm ${earGame.score}`, `Level ${earGame.level} – Score ${earGame.score}`)}</p>
        ${earGame.msg ? `<p class="${earGame.msg[0]}" style="margin:0">${earGame.msg[1]}</p>` : ''}`;
    }
    $('earGame').addEventListener('click', (e) => {
      const p = e.target.closest('[data-play]'), k = e.target.closest('[data-pick]');
      if (p) { const i = +p.dataset.play; earGame.heard[i] = true; tone(earGame.f[i], .12, .6); }
      if (k) {
        if (!earGame.heard[0] || !earGame.heard[1]) { earGame.msg = ['warn', T('Em nghe cả 2 âm trước nhé!', 'Listen to both sounds first!')]; earRenderGame(); return; }
        const ok = +k.dataset.pick === earGame.ans;
        if (ok) { earGame.score++; earGame.level = Math.min(10, earGame.level + 1); } else earGame.level = Math.max(1, earGame.level - 1);
        const nextMsg = ok ? ['fun', T('🎉 Đúng rồi! Lên cấp, hai âm sẽ gần nhau hơn.', '🎉 Correct! Next level: the sounds get closer.')] : ['warn', T(`Chưa đúng. Âm ${earGame.ans + 1} mới cao hơn. Thử lại nhé!`, `Not quite. Sound ${earGame.ans + 1} was higher. Try again!`)];
        earNewRound(); earGame.msg = nextMsg; earRenderGame();
      }
    });
    function earInfo() {
      if (earInfoKey === lang) return; earInfoKey = lang;
      infoBox($('info_ear'), {
        emo: '👂', title: T('Đôi tai', 'Your ears'), sub: T('Giác quan nghe', 'The sense of hearing'),
        rows: [[T('Nghe thế nào?', 'How we hear'), T('Âm thanh là những rung động truyền qua không khí. Chúng làm màng nhĩ rung, ốc tai đổi thành tín hiệu gửi về não.', 'Sound is vibration travelling through air. It shakes the eardrum, and the cochlea turns it into signals for the brain.')],
          [T('To và nhỏ', 'Loud and quiet'), T('Rung càng mạnh, âm càng to.', 'Bigger vibrations make louder sounds.')],
          [T('Trầm và bổng', 'Low and high'), T('Rung càng nhanh, âm càng cao (bổng).', 'Faster vibrations make higher sounds.')]],
        notes: [['warn', T('⚠️ Nghe tai nghe quá to, quá lâu có thể làm hỏng tai. Không ngoáy tai bằng vật nhọn.', '⚠️ Loud headphones for a long time can damage hearing. Never poke sharp things in your ears.')]]
      });
    }
    $('earVol').addEventListener('input', () => { earVol = +$('earVol').value; });
    $('earPitch').addEventListener('input', () => { earPitch = +$('earPitch').value; });
    $('earPlay').onclick = () => tone(earFreq(), lerp(.02, .16, earVol / 100), .8);
    TABS.ear = {
      frame() { drawEar(); earInfo(); setText('hud_ear', `🔊 ${T('Tần số', 'Frequency')} ≈ ${Math.round(earFreq())} Hz – ${T('độ to', 'loudness')} ${earVol}%`); },
      refresh() { earInfoKey = ''; earInfo(); if (earGame.ans < 0) earNewRound(); else { earGame.msg = ''; earRenderGame(); } }
    };
    QUIZZES.push(makeQuiz($('quiz_ear'), {
      vi: [
        { q: 'Bộ phận nào trong tai rung lên khi có âm thanh?', a: ['Màng nhĩ', 'Vành tai', 'Lông mày', 'Răng'], why: 'Sóng âm đi vào ống tai làm màng nhĩ rung.' },
        { q: 'Âm thanh truyền tới tai qua đâu?', a: ['Qua không khí', 'Qua ánh sáng', 'Qua bóng tối', 'Không cần gì'], why: 'Âm thanh là rung động truyền qua không khí (cả nước và vật rắn nữa).' },
        { q: 'Rung càng nhanh thì âm thanh thế nào?', a: ['Càng cao (bổng)', 'Càng trầm', 'Càng nhỏ', 'Biến mất'], why: 'Tiếng chim hót cao vì rung nhanh, tiếng trống trầm vì rung chậm.' },
        { q: 'Việc nào giúp bảo vệ tai?', a: ['Nghe tai nghe vừa đủ to', 'Mở nhạc thật to cả ngày', 'Ngoáy tai bằng que nhọn', 'Hét vào tai bạn'], why: 'Âm quá to, quá lâu làm hại tai.' },
        { q: 'Vì sao ta có hai tai?', a: ['Để biết âm thanh đến từ hướng nào', 'Để đeo khẩu trang', 'Cho cân đối', 'Không để làm gì'], why: 'Âm tới hai tai chênh nhau một chút, não dựa vào đó đoán hướng.' },
        { q: 'Ốc tai làm nhiệm vụ gì?', a: ['Đổi rung động thành tín hiệu gửi về não', 'Giữ thăng bằng khi ăn', 'Làm tai to hơn', 'Lọc bụi'], why: 'Ốc tai biến rung động thành tín hiệu thần kinh.' }
      ],
      en: [
        { q: 'Which part of the ear shakes when sound arrives?', a: ['The eardrum', 'The outer ear', 'Eyebrows', 'Teeth'], why: 'Sound waves go down the ear canal and shake the eardrum.' },
        { q: 'How does sound reach your ear?', a: ['Through the air', 'Through light', 'Through darkness', 'It needs nothing'], why: 'Sound is vibration travelling through air (and water and solids too).' },
        { q: 'Faster vibrations make a sound…', a: ['Higher', 'Lower', 'Quieter', 'Disappear'], why: 'Birds sound high because of fast vibrations; drums sound low.' },
        { q: 'Which protects your ears?', a: ['Keeping headphones at a sensible volume', 'Loud music all day', 'Poking ears with sticks', 'Shouting into ears'], why: 'Very loud sounds for a long time harm hearing.' },
        { q: 'Why do we have two ears?', a: ['To tell where a sound comes from', 'To hold a mask', 'For balance in looks', 'No reason'], why: 'Sound reaches each ear slightly differently; the brain uses this to find direction.' },
        { q: 'What does the cochlea do?', a: ['Turns vibrations into signals for the brain', 'Keeps balance while eating', 'Makes ears bigger', 'Filters dust'], why: 'The cochlea changes vibrations into nerve signals.' }
      ]
    }));

    /* =====================================================================
       3. LƯỠI VÀ MŨI: 5 vị + mùi; thử thách đoán vị món ăn
       ===================================================================== */
    const TASTES = {
      sweet: { col: '#ec4899', vi: 'Ngọt', en: 'Sweet' }, salty: { col: '#64748b', vi: 'Mặn', en: 'Salty' }, sour: { col: '#eab308', vi: 'Chua', en: 'Sour' },
      bitter: { col: '#4d7c0f', vi: 'Đắng', en: 'Bitter' }, umami: { col: '#ea580c', vi: 'Ngọt thịt (umami)', en: 'Savoury (umami)' }
    };
    const FOODS = [
      { emo: '🍋', t: 'sour', vi: 'Chanh', en: 'Lime' }, { emo: '🍬', t: 'sweet', vi: 'Kẹo', en: 'Sweets' }, { emo: '🧂', t: 'salty', vi: 'Muối', en: 'Salt' },
      { emo: '🥒', t: 'bitter', vi: 'Mướp đắng (khổ qua)', en: 'Bitter melon' }, { emo: '🍜', t: 'umami', vi: 'Nước dùng phở', en: 'Pho broth' }, { emo: '🥭', t: 'sweet', vi: 'Xoài chín', en: 'Ripe mango' },
      { emo: '🍄', t: 'umami', vi: 'Nấm hương', en: 'Shiitake mushroom' }, { emo: '☕', t: 'bitter', vi: 'Cà phê đen', en: 'Black coffee' }, { emo: '🐟', t: 'salty', vi: 'Nước mắm', en: 'Fish sauce' },
      { emo: '🍯', t: 'sweet', vi: 'Mật ong', en: 'Honey' }, { emo: '🫐', t: 'sour', vi: 'Quả sấu', en: 'Dracontomelon fruit' }
    ];
    FOODS[10].emo = '🟢';
    let tsFood = 0, tsPinch = false, tsScore = 0, tsTotal = 0, tsMsg = null, tsParts = [], tsInfoKey = '';
    const tsC = mk('c_taste', (w) => clamp(w * .6, 280, 480));
    function drawTaste(dt) {
      const { w, h, ctx } = tsC;
      if (!w) return;
      const f = FOODS[tsFood], tc = TASTES[f.t].col;
      ctx.fillStyle = '#fff7ed'; ctx.fillRect(0, 0, w, h);
      // não
      const bx = w * .82, by = h * .2;
      ctx.fillStyle = '#fbcfe8'; ctx.strokeStyle = '#db2777'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(bx, by, w * .09, h * .11, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(219,39,119,.5)'; ctx.lineWidth = 1.5; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(bx - w * .03 + k * w * .02, by, h * .05, .5, 2.6); ctx.stroke(); }
      textLight(ctx, T('Não', 'Brain'), bx, by + h * .15, '#9d174d', 12, 'center', 900);
      // mũi
      const nx = w * .5, ny = h * .2;
      ctx.fillStyle = '#fde7d4'; ctx.strokeStyle = '#e8b796'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(nx, ny - h * .12); ctx.lineTo(nx + w * .05, ny + h * .06); ctx.quadraticCurveTo(nx, ny + h * .1, nx - w * .05, ny + h * .06); ctx.closePath(); ctx.fill(); ctx.stroke();
      if (tsPinch) { ctx.fillStyle = '#f6c9a7'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(nx + sd * w * .06, ny + h * .03, w * .025, h * .05, sd * .4, 0, TAU); ctx.fill(); } }
      textLight(ctx, T('Mũi', 'Nose'), nx - w * .08, ny - h * .06, '#92400e', 12, 'right', 900);
      // lưỡi
      const tx = w * .5, ty = h * .62, tw = Math.min(w * .17, h * .24), th = tw * 1.2;
      ctx.fillStyle = '#fda4af'; ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(tx - tw, ty - th * .5); ctx.lineTo(tx - tw, ty + th * .1); ctx.quadraticCurveTo(tx - tw, ty + th * .7, tx, ty + th * .7); ctx.quadraticCurveTo(tx + tw, ty + th * .7, tx + tw, ty + th * .1); ctx.lineTo(tx + tw, ty - th * .5); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(225,29,72,.4)'; ctx.beginPath(); ctx.moveTo(tx, ty - th * .45); ctx.lineTo(tx, ty + th * .45); ctx.stroke();
      const pulse = .5 + .5 * Math.sin(clock * 5);
      for (let i = 0; i < 40; i++) { const a = (i * 2.399) % TAU, r = Math.sqrt((i + .5) / 40); const x = tx + Math.cos(a) * r * tw * .85, y = ty + Math.sin(a) * r * th * .5 + th * .05; ctx.fillStyle = tc; ctx.globalAlpha = .45 + .45 * pulse; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, TAU); ctx.fill(); }
      ctx.globalAlpha = 1;
      textLight(ctx, T('Nụ vị giác ở khắp lưỡi', 'Taste buds all over'), tx, ty + th * .82, '#be123c', w < 420 ? 10 : 11.5, 'center', 900);
      // món ăn và mùi
      const fx = w * .14, fy = h * .58;
      ctx.font = `${Math.round(h * .14)}px system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(f.emo, fx, fy);
      textLight(ctx, L(f), fx, fy + h * .12, '#334155', w < 420 ? 10.5 : 12, 'center', 900);
      if (Math.random() < dt * 14) tsParts.push({ t: 0, off: rand(-1, 1) });
      for (const p of tsParts) p.t += dt * .5;
      tsParts = tsParts.filter((p) => p.t < 1);
      for (const p of tsParts) {
        const stop = tsPinch ? .78 : 1, t = Math.min(p.t, stop);
        const x = lerp(fx, nx, t) + Math.sin(t * 9 + p.off * 3) * 10, y = lerp(fy - h * .08, ny + h * .06, t) + p.off * 8;
        ctx.fillStyle = `rgba(168,85,247,${(1 - p.t) * .8})`; ctx.beginPath(); ctx.arc(x, y, 3, 0, TAU); ctx.fill();
      }
      // tín hiệu về não
      ctx.setLineDash([6, 5]); ctx.lineDashOffset = -clock * 40; ctx.lineWidth = 2.5;
      ctx.strokeStyle = tc; ctx.beginPath(); ctx.moveTo(tx + tw, ty - th * .2); ctx.quadraticCurveTo(w * .75, h * .55, bx - w * .02, by + h * .1); ctx.stroke();
      if (!tsPinch) { ctx.strokeStyle = '#a855f7'; ctx.beginPath(); ctx.moveTo(nx + w * .04, ny - h * .02); ctx.lineTo(bx - w * .09, by); ctx.stroke(); }
      ctx.setLineDash([]);
      bubble(ctx, tsPinch ? T(`Chỉ thấy vị ${TASTES[f.t].vi.toLowerCase()}…`, `Only ${TASTES[f.t].en.toLowerCase()}…`) : T(`${TASTES[f.t].vi} + mùi ${f.vi.toLowerCase()}!`, `${TASTES[f.t].en} + smells like ${f.en.toLowerCase()}!`), bx - w * .05, by + h * .27, w < 420 ? 10.5 : 12);
    }
    function tsRenderGame() {
      const f = FOODS[tsFood];
      $('tasteGame').innerHTML = `
        <div style="display:flex;align-items:center;gap:10px"><span style="font-size:40px;line-height:1" aria-hidden="true">${f.emo}</span><div><b style="font-size:17px;color:#6d28d9"></b><p class="muted" style="margin:2px 0 0">${T('Món này có vị chính là gì?', 'What is its main taste?')}</p></div></div>
        <div class="toggle-row" style="justify-content:flex-start">${Object.keys(TASTES).map((k) => `<button type="button" class="soft-btn" data-taste="${k}"></button>`).join('')}</div>
        <p class="score" style="margin:0">${T(`Đúng ${tsScore} / ${tsTotal}`, `Correct ${tsScore} / ${tsTotal}`)}</p>
        ${tsMsg ? `<p class="${tsMsg[0]}" style="margin:0"></p>` : ''}`;
      $('tasteGame').querySelector('b').textContent = L(f);
      $('tasteGame').querySelectorAll('[data-taste]').forEach((b) => { b.textContent = L(TASTES[b.dataset.taste]); });
      if (tsMsg) $('tasteGame').querySelector('p:last-child').textContent = tsMsg[1];
    }
    $('tasteGame').addEventListener('click', (e) => {
      const b = e.target.closest('[data-taste]'); if (!b) return;
      cancelSpeech();
      const f = FOODS[tsFood], ok = b.dataset.taste === f.t; tsTotal++; if (ok) tsScore++;
      tsMsg = ok ? ['fun', T(`🎉 Đúng! ${f.vi} có vị ${TASTES[f.t].vi.toLowerCase()}.`, `🎉 Yes! ${f.en} tastes ${TASTES[f.t].en.toLowerCase()}.`)] : ['warn', T(`Chưa đúng. ${f.vi} có vị ${TASTES[f.t].vi.toLowerCase()}.`, `Not quite. ${f.en} tastes ${TASTES[f.t].en.toLowerCase()}.`)];
      let n; do { n = Math.floor(rand(0, FOODS.length)); } while (n === tsFood);
      tsFood = n; tsRenderGame();
    });
    $('tsPinch').onclick = () => { tsPinch = !tsPinch; $('tsPinch').setAttribute('aria-pressed', String(tsPinch)); tsInfoKey = ''; tsInfo(); };
    function tsInfo() {
      const key = lang + tsPinch; if (key === tsInfoKey) return; tsInfoKey = key;
      const notes = [['fun', T('✨ "Bản đồ vị" (đầu lưỡi ngọt, cuống lưỡi đắng…) là hiểu lầm. Thật ra mọi vùng của lưỡi đều nếm được cả 5 vị.', '✨ The “tongue map” (sweet at the tip, bitter at the back) is a myth. Every part of the tongue can taste all five tastes.')]];
      if (tsPinch) notes.unshift(['tip', T('🤏 Khi bịt mũi, mùi không tới được mũi nên món ăn nhạt đi nhiều. Vì vậy khi bị cảm nghẹt mũi, ăn gì cũng thấy nhạt.', '🤏 With your nose pinched, smells can’t reach it, so food tastes much blander. That’s why food seems tasteless when you have a blocked nose.')]);
      infoBox($('info_taste'), {
        emo: '👅', title: T('Lưỡi và mũi làm việc cùng nhau', 'Tongue and nose work together'), sub: T('Giác quan nếm và ngửi', 'Taste and smell'),
        rows: [[T('5 vị', '5 tastes'), T('Ngọt, mặn, chua, đắng và ngọt thịt (umami, như nước dùng).', 'Sweet, salty, sour, bitter and savoury (umami, like broth).')],
          [T('Lưỡi', 'Tongue'), T('Có hàng nghìn nụ vị giác nhỏ xíu, báo cho não biết món ăn có vị gì.', 'Has thousands of tiny taste buds that tell the brain what a food tastes like.')],
          [T('Mũi', 'Nose'), T('Ngửi được rất nhiều mùi. Phần lớn "hương vị" món ăn thật ra là nhờ mũi.', 'Can smell a huge number of smells. Much of a food’s “flavour” really comes from the nose.')]],
        notes
      });
    }
    TABS.taste = {
      frame(dt) { drawTaste(dt); tsInfo(); const f = FOODS[tsFood]; setText('hud_taste', `${f.emo} ${L(f)} – ${T('vị', 'taste')}: ${L(TASTES[f.t]).toLowerCase()}${tsPinch ? T(' (đang bịt mũi)', ' (nose pinched)') : ''}`); },
      refresh() { tsInfoKey = ''; tsInfo(); tsMsg = null; tsRenderGame(); }
    };
    QUIZZES.push(makeQuiz($('quiz_taste'), {
      vi: [
        { q: 'Lưỡi nếm được mấy vị cơ bản?', a: ['5 vị', '2 vị', '3 vị', '10 vị'], why: 'Ngọt, mặn, chua, đắng và ngọt thịt (umami).' },
        { q: 'Quả chanh có vị gì?', a: ['Chua', 'Ngọt', 'Mặn', 'Đắng'], why: 'Chanh có nhiều chất chua.' },
        { q: 'Vì sao khi bị cảm nghẹt mũi, ăn thấy nhạt?', a: ['Mũi không ngửi được mùi món ăn', 'Lưỡi bị mất', 'Món ăn hết vị', 'Răng bị đau'], why: 'Mùi đóng góp rất nhiều vào hương vị món ăn.' },
        { q: 'Câu nào đúng về lưỡi?', a: ['Mọi vùng lưỡi đều nếm được cả 5 vị', 'Chỉ đầu lưỡi nếm được vị ngọt', 'Lưỡi không có nụ vị giác', 'Lưỡi chỉ để nói'], why: '"Bản đồ vị" là hiểu lầm, nụ vị giác ở khắp lưỡi.' },
        { q: 'Nước dùng phở thơm ngon có vị gì nổi bật?', a: ['Ngọt thịt (umami)', 'Đắng', 'Chua', 'Không có vị'], why: 'Nước hầm xương, thịt có vị ngọt thịt gọi là umami.' },
        { q: 'Mũi giúp ta điều gì quan trọng?', a: ['Ngửi thấy mùi khét, mùi ga để tránh nguy hiểm', 'Nghe nhạc', 'Nhìn trong tối', 'Nếm vị mặn'], why: 'Ngửi thấy mùi khói, mùi ga rò rỉ giúp em kịp báo người lớn.' }
      ],
      en: [
        { q: 'How many basic tastes can the tongue sense?', a: ['5', '2', '3', '10'], why: 'Sweet, salty, sour, bitter and savoury (umami).' },
        { q: 'What does a lime taste like?', a: ['Sour', 'Sweet', 'Salty', 'Bitter'], why: 'Limes are full of sour acid.' },
        { q: 'Why does food taste bland with a blocked nose?', a: ['You can’t smell the food', 'Your tongue is gone', 'The food lost its taste', 'Your teeth hurt'], why: 'Smell is a big part of a food’s flavour.' },
        { q: 'Which is true about the tongue?', a: ['Every part can taste all 5 tastes', 'Only the tip tastes sweet', 'It has no taste buds', 'It is only for talking'], why: 'The “tongue map” is a myth; taste buds are everywhere.' },
        { q: 'Which taste stands out in a rich pho broth?', a: ['Savoury (umami)', 'Bitter', 'Sour', 'No taste'], why: 'Long-simmered bones and meat give a savoury taste called umami.' },
        { q: 'What important job does your nose do?', a: ['Smells smoke or gas so you can stay safe', 'Hears music', 'Sees in the dark', 'Tastes salt'], why: 'Smelling smoke or a gas leak lets you warn an adult in time.' }
      ]
    }));

    /* =====================================================================
       4. DA: chạm đồ vật, tín hiệu thần kinh, phản xạ rụt tay + thử thách phản xạ
       ===================================================================== */
    const OBJS = [
      { k: 'hot', emo: '🍵', reflex: true, vi: 'Cốc trà nóng', en: 'Hot tea', feel: ['Nóng quá!', 'Too hot!'] },
      { k: 'ice', emo: '🧊', reflex: false, vi: 'Cục đá', en: 'Ice cube', feel: ['Lạnh buốt!', 'Freezing cold!'] },
      { k: 'soft', emo: '🧸', reflex: false, vi: 'Gấu bông', en: 'Teddy bear', feel: ['Mềm mại quá!', 'So soft!'] },
      { k: 'sharp', emo: '🌵', reflex: true, vi: 'Xương rồng', en: 'Cactus', feel: ['Đau! Gai nhọn!', 'Ouch! Spiky!'] },
      { k: 'rough', emo: '🟫', reflex: false, vi: 'Giấy nhám', en: 'Sandpaper', feel: ['Ráp ráp!', 'Rough!'] }
    ];
    let skObj = 0, skT = 0, skInfoKey = '';
    const skC = mk('c_skin', (w) => clamp(w * .58, 270, 460));
    function drawObj(ctx, k, x, y, s) {
      if (k === 'hot') { ctx.fillStyle = '#fef3c7'; rr(ctx, x - s * .5, y - s * .55, s, s * .9, 6); ctx.fill(); ctx.strokeStyle = '#92400e'; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.arc(x + s * .55, y - s * .1, s * .2, -1.4, 1.4); ctx.stroke(); ctx.fillStyle = '#a16207'; ctx.fillRect(x - s * .42, y - s * .45, s * .84, s * .12); ctx.strokeStyle = 'rgba(148,163,184,.8)'; ctx.lineWidth = 2; for (let i = -1; i <= 1; i++) { ctx.beginPath(); for (let j = 0; j < 8; j++) { const yy = y - s * .65 - j * s * .07, xx = x + i * s * .2 + Math.sin(j + clock * 4 + i) * 4; if (j) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy); } ctx.stroke(); } }
      else if (k === 'ice') { ctx.fillStyle = 'rgba(186,230,253,.95)'; rr(ctx, x - s * .45, y - s * .8, s * .9, s * .8, 8); ctx.fill(); ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(x - s * .3, y - s * .68, s * .2, s * .07); }
      else if (k === 'soft') { ctx.fillStyle = '#d6a36a'; for (const [dx, dy, r] of [[-.3, -.85, .16], [.3, -.85, .16], [0, -.65, .32], [0, -.2, .4]]) { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, TAU); ctx.fill(); } ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(x - s * .1, y - s * .7, 2.5, 0, TAU); ctx.arc(x + s * .1, y - s * .7, 2.5, 0, TAU); ctx.fill(); }
      else if (k === 'sharp') { ctx.fillStyle = '#16a34a'; rr(ctx, x - s * .18, y - s * 1.05, s * .36, s * 1.05, s * .18); ctx.fill(); rr(ctx, x - s * .5, y - s * .7, s * .2, s * .4, s * .1); ctx.fill(); rr(ctx, x + s * .3, y - s * .85, s * .2, s * .45, s * .1); ctx.fill(); ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = 1.5; for (let i = 0; i < 12; i++) { const yy = y - s * (.1 + i * .08), sd = i % 2 ? 1 : -1; ctx.beginPath(); ctx.moveTo(x + sd * s * .18, yy); ctx.lineTo(x + sd * s * .3, yy - 3); ctx.stroke(); } ctx.fillStyle = '#b45309'; ctx.fillRect(x - s * .35, y - s * .05, s * .7, s * .12); }
      else { ctx.fillStyle = '#c08a4d'; rr(ctx, x - s * .55, y - s * .5, s * 1.1, s * .5, 4); ctx.fill(); ctx.fillStyle = 'rgba(120,53,15,.5)'; for (let i = 0; i < 40; i++) ctx.fillRect(x - s * .5 + ((i * 37) % 100) / 100 * s, y - s * .45 + ((i * 53) % 100) / 100 * s * .4, 2, 2); }
    }
    function drawSkin(dt) {
      const { w, h, ctx } = skC;
      if (!w) return;
      skT += dt;
      const o = OBJS[skObj];
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h);
      // người (nhìn ngang): đầu, não, tủy sống, cánh tay
      const hx = w * .16, hy = h * .2, hr = Math.min(w, h) * .1;
      const spine = { x: hx + hr * .2, y0: hy + hr, y1: h * .9 }, shoulder = { x: spine.x + hr * .3, y: hy + hr * 1.6 };
      ctx.fillStyle = '#fde7d4'; ctx.strokeStyle = '#e8b796'; ctx.lineWidth = 2;
      rr(ctx, hx - hr * .6, hy + hr * 1.1, hr * 1.6, h * .9 - hy - hr * 1.1, hr * .4); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(hx, hy, hr, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fbcfe8'; ctx.beginPath(); ctx.ellipse(hx - hr * .05, hy - hr * .25, hr * .6, hr * .45, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(spine.x, hy - hr * .05); ctx.lineTo(spine.x, spine.y1); ctx.stroke();
      // tay vươn ra
      const objX = w * .8, objY = h * .78, s = Math.min(w, h) * .14;
      const reachEnd = 1.2, sigTime = 1.4, back = o.reflex ? span(skT, reachEnd + sigTime * .5, reachEnd + sigTime * .5 + .2) : 0;
      const reach = ease(span(skT, 0, reachEnd)) * (1 - back * .65);
      const hand = { x: lerp(shoulder.x + w * .1, objX - s * .6, reach), y: lerp(shoulder.y + h * .2, objY - s * .55, reach) };
      ctx.strokeStyle = '#f6c9a7'; ctx.lineWidth = hr * .45; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(shoulder.x, shoulder.y); ctx.quadraticCurveTo((shoulder.x + hand.x) / 2, Math.max(shoulder.y, hand.y) + h * .05, hand.x, hand.y); ctx.stroke();
      ctx.fillStyle = '#f6c9a7'; ctx.beginPath(); ctx.ellipse(hand.x + hr * .2, hand.y, hr * .35, hr * .25, 0, 0, TAU); ctx.fill();
      // dây thần kinh
      ctx.strokeStyle = 'rgba(234,179,8,.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(hand.x, hand.y); ctx.quadraticCurveTo((shoulder.x + hand.x) / 2, Math.max(shoulder.y, hand.y) + h * .05, shoulder.x, shoulder.y); ctx.lineTo(spine.x, shoulder.y); ctx.lineTo(spine.x, hy); ctx.stroke();
      drawObj(ctx, o.k, objX, objY, s);
      ctx.fillStyle = '#cbd5e1'; ctx.fillRect(objX - s * 1.1, objY + 2, s * 2.2, 6);
      // xung thần kinh
      const tSig = skT - reachEnd;
      if (tSig > 0 && tSig < sigTime) {
        const k = tSig / sigTime;
        let p;
        if (k < .5) { const q = k / .5; p = { x: lerp(hand.x, shoulder.x, q), y: lerp(hand.y, shoulder.y, q) - Math.sin(q * Math.PI) * h * .03 }; }
        else { const q = (k - .5) / .5; p = { x: spine.x, y: lerp(shoulder.y, hy, q) }; }
        ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, TAU); ctx.fill();
      }
      if (o.reflex && tSig > sigTime * .5 && tSig < sigTime * .5 + 1.4) bubble(ctx, T('Rụt tay! (tủy sống ra lệnh)', 'Pull back! (spinal cord reflex)'), w * .55, h * .22, w < 420 ? 10.5 : 12, '#fff', '#c2410c');
      if (tSig > sigTime) bubble(ctx, `🧠 ${T(o.feel[0], o.feel[1])}`, hx + hr * 2.4, hy - hr * .6, 12);
      const fs = w < 420 ? 10 : 11.5;
      textLight(ctx, T('Não', 'Brain'), hx, hy - hr * 1.25, '#9d174d', fs, 'center', 900);
      textLight(ctx, T('Tủy sống', 'Spinal cord'), spine.x + 8, h * .78, '#a16207', fs, 'left', 900);
      textLight(ctx, L(o), objX, objY + 20, '#334155', fs, 'center', 900);
    }
    function skInfo() {
      if (skInfoKey === lang) return; skInfoKey = lang;
      infoBox($('info_skin'), {
        emo: '✋', title: T('Làn da', 'Your skin'), sub: T('Giác quan xúc giác', 'The sense of touch'),
        rows: [[T('Cảm nhận', 'Feels'), T('Nóng, lạnh, đau, mềm, cứng, trơn, ráp và cả áp lực khi bị ấn.', 'Hot, cold, pain, soft, hard, smooth, rough and pressure.')],
          [T('Phản xạ', 'Reflex'), T('Chạm vào vật nóng hoặc nhọn, tủy sống ra lệnh rụt tay ngay, trước cả khi não kịp thấy đau.', 'Touch something hot or sharp and the spinal cord pulls your hand back before your brain even feels the pain.')],
          [T('Đầu ngón tay', 'Fingertips'), T('Rất nhạy. Người khiếm thị đọc chữ nổi Braille bằng ngón tay.', 'Very sensitive. Blind people read Braille with their fingertips.')]],
        notes: [['warn', T('⚠️ Không chạm vào ổ điện, bàn là, nồi đang nấu. Phản xạ nhanh nhưng vẫn có thể bị bỏng.', '⚠️ Never touch sockets, irons or cooking pots. Reflexes are fast, but you can still get burned.')]]
      });
    }
    $('skObjs').addEventListener('click', (e) => { const b = e.target.closest('[data-obj]'); if (!b) return; cancelSpeech(); skObj = +b.dataset.obj; skT = 0; pressGroup('[data-obj]', 'obj', skObj); });
    // thử thách phản xạ
    let rx = { state: 'idle', at: 0, timer: 0, best: 0, last: 0 };
    function rxRender() {
      const b = $('rxBox'), map = {
        idle: ['#ede9fe', '#6d28d9', T('Bấm vào đây để bắt đầu', 'Tap here to start')],
        wait: ['#fee2e2', '#be123c', T('Chờ màu xanh… đừng bấm vội!', 'Wait for green… not yet!')],
        go: ['#bbf7d0', '#15803d', T('BẤM NGAY!', 'TAP NOW!')],
        early: ['#fef3c7', '#b45309', T('Sớm quá! Bấm để thử lại', 'Too soon! Tap to try again')],
        done: ['#dbeafe', '#1d4ed8', T(`${rx.last} mili giây! Bấm để chơi lại`, `${rx.last} ms! Tap to play again`)]
      }[rx.state];
      b.style.background = map[0]; b.style.color = map[1]; b.textContent = map[2];
      $('rxBest').textContent = rx.best ? T(`Kỷ lục của em: ${rx.best} mili giây. Phản xạ nhìn thường mất khoảng 200 – 400 mili giây.`, `Your best: ${rx.best} ms. Seeing-and-reacting usually takes about 200 – 400 ms.`) : T('1 giây = 1000 mili giây.', '1 second = 1000 milliseconds.');
    }
    $('rxBox').addEventListener('pointerdown', () => {
      cancelSpeech();
      if (rx.state === 'wait') { clearTimeout(rx.timer); rx.state = 'early'; }
      else if (rx.state === 'go') { rx.last = Math.round(performance.now() - rx.at); rx.best = rx.best ? Math.min(rx.best, rx.last) : rx.last; rx.state = 'done'; }
      else { rx.state = 'wait'; rx.timer = setTimeout(() => { if (destroyed) return; rx.state = 'go'; rx.at = performance.now(); rxRender(); }, rand(1500, 4000)); }
      rxRender();
    });
    cleanupFns.push(() => clearTimeout(rx.timer));
    TABS.skin = {
      frame(dt) { drawSkin(dt); skInfo(); const o = OBJS[skObj]; setText('hud_skin', `${o.emo} ${L(o)} – ${o.reflex ? T('vật nguy hiểm: tay rụt lại theo phản xạ', 'dangerous: the hand pulls back by reflex') : T('da gửi cảm giác về não', 'the skin sends the feeling to the brain')}`); },
      refresh() { skInfoKey = ''; skInfo(); root.querySelectorAll('[data-obj]').forEach((b) => { const o = OBJS[+b.dataset.obj]; b.textContent = `${o.emo} ${L(o)}`; }); rxRender(); },
      show() { skT = 0; }
    };
    QUIZZES.push(makeQuiz($('quiz_skin'), {
      vi: [
        { q: 'Da giúp em cảm nhận điều gì?', a: ['Nóng, lạnh, đau, mềm, cứng', 'Màu sắc', 'Âm thanh', 'Mùi thơm'], why: 'Da có rất nhiều đầu dây thần kinh cảm nhận nóng, lạnh, đau, chạm.' },
        { q: 'Khi chạm vào vật nóng, vì sao tay rụt lại rất nhanh?', a: ['Tủy sống ra lệnh phản xạ ngay', 'Tay tự biết suy nghĩ', 'Vì gió thổi', 'Do vật nóng đẩy tay ra'], why: 'Phản xạ đi qua tủy sống nên nhanh hơn chờ não quyết định.' },
        { q: 'Bộ phận nào trên da rất nhạy, dùng để đọc chữ nổi?', a: ['Đầu ngón tay', 'Khuỷu tay', 'Gót chân', 'Lưng'], why: 'Đầu ngón tay có rất nhiều đầu dây thần kinh.' },
        { q: 'Tín hiệu từ da chạy về não theo đường nào?', a: ['Dây thần kinh', 'Mạch máu', 'Xương', 'Tóc'], why: 'Dây thần kinh truyền tín hiệu như dây điện.' },
        { q: 'Việc nào giúp bảo vệ da?', a: ['Tắm rửa sạch, che nắng khi trời gắt', 'Phơi nắng trưa thật lâu', 'Chạm vào ổ điện', 'Không bao giờ rửa tay'], why: 'Giữ da sạch và tránh nắng gắt giúp da khỏe.' },
        { q: 'Phản xạ của em khi nhìn thấy rồi bấm thường mất khoảng bao lâu?', a: ['Vài trăm mili giây', 'Vài phút', 'Một giờ', 'Không mất thời gian'], why: 'Thường khoảng 200 – 400 mili giây, tức là chưa tới nửa giây.' }
      ],
      en: [
        { q: 'What can your skin feel?', a: ['Hot, cold, pain, soft, hard', 'Colours', 'Sounds', 'Smells'], why: 'Skin has many nerve endings that sense heat, cold, pain and touch.' },
        { q: 'Why does your hand pull back so fast from something hot?', a: ['The spinal cord triggers a reflex', 'Hands think for themselves', 'The wind', 'The heat pushes it'], why: 'Reflexes go through the spinal cord, faster than waiting for the brain.' },
        { q: 'Which very sensitive part is used to read Braille?', a: ['Fingertips', 'Elbows', 'Heels', 'Back'], why: 'Fingertips are packed with nerve endings.' },
        { q: 'How do signals from your skin reach the brain?', a: ['Along nerves', 'In blood vessels', 'Through bones', 'Through hair'], why: 'Nerves carry signals like wires.' },
        { q: 'Which protects your skin?', a: ['Keep clean and cover up in strong sun', 'Sunbathe at noon for hours', 'Touch sockets', 'Never wash'], why: 'Clean skin and avoiding harsh sun keep it healthy.' },
        { q: 'How long does it usually take to see and react?', a: ['A few hundred milliseconds', 'A few minutes', 'An hour', 'No time at all'], why: 'Usually about 200 – 400 ms: less than half a second.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'eye';
    root.querySelectorAll('.sense-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.sense-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('s-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.sense-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.sense-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.sense-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
