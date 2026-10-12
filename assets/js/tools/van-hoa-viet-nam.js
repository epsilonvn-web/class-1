/* Epsilon Edu - Tool: Van hoa Viet Nam (Vietnamese culture): ban do di san, le hoi 12 thang, lang gom Bat Trang
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.vnCulture = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "vnCulture";
  let activeCleanup = null;

  const CSS = `
.culture-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.culture-tool *{box-sizing:border-box}.culture-tool button,.culture-tool input{font:inherit}.culture-tool button{cursor:pointer}.culture-tool .hidden{display:none!important}
.culture-tool button:focus-visible,.culture-tool canvas:focus-visible,.culture-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.culture-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.culture-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.culture-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.culture-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.culture-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.culture-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.culture-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.culture-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.culture-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.culture-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.culture-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.culture-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.culture-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.culture-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.culture-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.culture-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.culture-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.culture-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.culture-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.culture-panel{width:100%}.culture-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.culture-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.culture-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.culture-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.culture-tool .card-head.compact{margin-bottom:9px}
.culture-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.culture-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.culture-tool .btn,.culture-tool .soft-btn,.culture-tool .segmented button,.culture-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.culture-tool .btn:hover,.culture-tool .soft-btn:hover,.culture-tool .segmented button:hover,.culture-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.culture-tool .btn{padding:0 12px}.culture-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.culture-tool .segmented{display:flex;gap:7px;margin:0}.culture-tool .segmented button{padding:0 13px}
.culture-tool .segmented button[aria-pressed="true"],.culture-tool .soft-btn[aria-pressed="true"],.culture-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.culture-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.culture-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.culture-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.culture-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.culture-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.culture-tool .range-control input{width:100%;accent-color:#8b5cf6}.culture-tool .range-control b{color:#7c3aed;font-size:13px}
.culture-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.culture-tool .soft-btn{padding:0 12px}
.culture-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.culture-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.culture-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.culture-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.culture-tool .info-title{display:flex;align-items:center;gap:10px}.culture-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.culture-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.culture-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.culture-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.culture-tool .facts{display:grid;gap:6px;margin-top:10px}.culture-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.culture-tool .facts b{color:#7c3aed;font-size:13.5px}.culture-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.culture-tool .fun,.culture-tool .warn,.culture-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.culture-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.culture-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.culture-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.culture-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.culture-tool .state-big.up{color:#0f766e}.culture-tool .state-big.down{color:#b45309}
.culture-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.culture-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.culture-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.culture-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.culture-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.culture-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.culture-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.culture-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.culture-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.culture-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.culture-tool .qopt:hover{filter:brightness(.985)}.culture-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.culture-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.culture-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.culture-tool .qfb,.culture-tool .score{font-size:13px;font-weight:900}.culture-tool .qfb.ok{color:#15803d}.culture-tool .qfb.no{color:#be123c}.culture-tool .score{color:#7c3aed}
.culture-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.culture-grid{grid-template-columns:1fr;align-items:start}.culture-side{grid-template-rows:auto auto;height:auto}.culture-tool .control-grid{grid-template-columns:1fr}.culture-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.culture-hero{flex-wrap:wrap;padding:12px}.culture-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.culture-tabs{grid-template-columns:1fr}.culture-tabs .tab{min-height:40px}.culture-card{padding:11px;border-radius:18px}.culture-tool .card-head{align-items:flex-start;flex-direction:column}.culture-tool .head-actions{width:100%;justify-content:space-between}.culture-tool .head-actions .segmented{flex:1;min-width:0}.culture-tool .head-actions .segmented button{flex:1;padding:0 8px}.culture-tool .qopts{grid-template-columns:1fr}.culture-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.culture-tool *{transition:none!important}}

.culture-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.culture-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.culture-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.culture-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.culture-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.culture-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.culture-tool .checklist{display:grid;gap:6px;margin-top:10px}
.culture-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.culture-tool .checklist .ok{color:#15803d}.culture-tool .checklist .no{color:#be123c}.culture-tool .checklist .wait{color:#94a3b8}
.culture-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.culture-tool .process span{flex:1}.culture-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.culture-tool .process .on{color:#0284c7}.culture-tool .process i.on{color:#ec4899}
@media(max-width:640px){.culture-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.culture-tool .slider-pair{grid-template-columns:1fr}}

.culture-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.culture-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.culture-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.culture-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.culture-tool .pulse-box{display:grid;gap:8px;margin-bottom:4px}
.culture-tool .stamp-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
.culture-tool .stamp{display:grid;place-items:center;gap:2px;min-height:62px;padding:6px 4px;border-radius:12px;border:2px dashed #cbd5e1;background:#f8fafc;text-align:center}
.culture-tool .stamp span{font-size:20px;line-height:1}.culture-tool .stamp b{font-size:10px;color:#64748b;line-height:1.2}
.culture-tool .stamp.got{border:2px solid #dc2626;background:#fef2f2;transform:rotate(-2deg)}.culture-tool .stamp.got b{color:#991b1b}
.culture-tool .opt-col{display:grid;gap:5px}.culture-tool .opt-col .soft-btn{min-height:36px;text-align:left;padding:5px 10px;font-size:13px;white-space:normal;line-height:1.3}
.culture-tool .soft-btn.done{background:#f0fdf4;border-color:#86efac;color:#15803d;opacity:1}.culture-tool .soft-btn.bad{background:#fff1f2;border-color:#fda4af;animation:cshake .35s}
@keyframes cshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
.culture-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
@media (prefers-reduced-motion:reduce){.culture-tool .soft-btn.bad{animation:none}}

.culture-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.culture-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="culture-tool" data-tool-root>
  <div class="culture-hero">
    <div class="culture-hero-icon" aria-hidden="true">🏮</div>
    <div>
      <p class="culture-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="culture-lead" data-t="lead"></p>
    </div>
    <div class="culture-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="vAudioNotice" class="culture-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="culture-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="her" data-t="tab_her"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="fest" data-t="tab_fest"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="craft" data-t="tab_craft"></button>
  </div>
  <section id="v-her" class="culture-panel" role="tabpanel">
    <div class="culture-grid">
      <article class="culture-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_her"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="kindL"><button type="button" data-hk="tan" aria-pressed="true" data-t="kTan"></button><button type="button" data-hk="int" aria-pressed="false" data-t="kInt"></button></div></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_her" role="img" data-ta="cv_her"></canvas></div>
        <p id="hud_her" class="hud" aria-live="polite"></p>
      </article>
      <div class="culture-side">
        <aside class="culture-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_her"></span><h2 data-t="sh_her"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_art" role="img" aria-hidden="true"></canvas></div><div id="passport" class="pulse-box" style="margin-top:10px"></div>
          <div id="info_her" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_her" class="culture-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="v-fest" class="culture-panel hidden" role="tabpanel">
    <div class="culture-grid">
      <article class="culture-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_fest"></h2></div>
          <div class="head-actions"><button id="fsPrev" class="btn" type="button">◀</button><button id="fsNext" class="btn main" type="button">▶</button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_fest" role="img" data-ta="cv_fest"></canvas></div>
        <p id="hud_fest" class="hud" aria-live="polite"></p>
      </article>
      <div class="culture-side">
        <aside class="culture-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_fest"></span><h2 data-t="sh_fest"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_banh" role="img" aria-hidden="true"></canvas></div><div id="banhBox" class="pulse-box" style="margin-top:10px"></div>
          <div id="info_fest" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_fest" class="culture-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="v-craft" class="culture-panel hidden" role="tabpanel">
    <div class="culture-grid">
      <article class="culture-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_craft"></h2></div>
          <div class="head-actions"><button id="ptNew" class="btn hidden" type="button" data-t="newPot"></button><button id="ptFire" class="btn main hidden" type="button" data-t="fire"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_craft" role="img" data-ta="cv_craft"></canvas></div>
        <p id="hud_craft" class="hud" aria-live="polite"></p>
        <div id="ptSteps" class="stage-row" role="group" data-ta="stepsL"></div>
        <div id="ptDeco" class="hidden">
          <div class="cond-row"><span class="muted" data-t="patL"></span><div class="segmented"><button type="button" data-pat="lotus" aria-pressed="true" data-t="pLotus"></button><button type="button" data-pat="wave" aria-pressed="false" data-t="pWave"></button><button type="button" data-pat="dragon" aria-pressed="false" data-t="pDragon"></button><button type="button" data-pat="none" aria-pressed="false" data-t="pNone"></button></div></div>
          <div class="cond-row"><span class="muted" data-t="glazeL"></span><div class="segmented"><button type="button" data-glaze="blue" aria-pressed="true" data-t="gBlue"></button><button type="button" data-glaze="crack" aria-pressed="false" data-t="gCrack"></button><button type="button" data-glaze="brown" aria-pressed="false" data-t="gBrown"></button></div></div>
        </div>
      </article>
      <div class="culture-side">
        <aside class="culture-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_craft"></span><h2 data-t="sh_craft"></h2></div></div>
          
          <div id="info_craft" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_craft" class="culture-card quiz-card"></article>
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
    const audioNotice = $('vAudioNotice');
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

    const VN_N = [[102.14, 22.4], [102.5, 22.7], [103.2, 22.6], [103.95, 22.5], [104.8, 22.8], [105.3, 23.38], [106.0, 22.95], [106.7, 22.85], [106.8, 22.3], [106.72, 21.97], [107.4, 21.6], [108.0, 21.52]];
    const VN_COAST = [[107.7, 21.3], [107.3, 21.0], [107.05, 20.95], [106.8, 20.7], [106.6, 20.4], [106.3, 20.0], [106.0, 19.95], [105.85, 19.5], [105.75, 19.0], [105.78, 18.7], [106.1, 18.3], [106.45, 17.95], [106.65, 17.45], [107.1, 17.0], [107.65, 16.5], [108.25, 16.05], [108.35, 15.85], [108.85, 15.15], [109.0, 14.65], [109.25, 13.75], [109.35, 13.05], [109.45, 12.85], [109.22, 12.25], [109.2, 11.9], [109.0, 11.55], [108.3, 10.95], [108.1, 10.9], [107.8, 10.65], [107.08, 10.35], [106.75, 10.3], [106.6, 10.0], [106.5, 9.6], [106.2, 9.45], [105.75, 9.2], [105.3, 8.75], [104.75, 8.6], [104.8, 9.0], [104.85, 9.6], [105.05, 10.0], [104.48, 10.38]];
    const VN_W = [[104.75, 10.5], [105.1, 10.95], [105.8, 11.0], [106.0, 11.4], [106.15, 11.75], [106.45, 11.95], [106.95, 12.0], [107.4, 12.25], [107.6, 12.65], [107.5, 13.4], [107.6, 14.0], [107.55, 14.7], [107.4, 15.2], [107.2, 15.9], [106.7, 16.4], [106.55, 16.9], [106.1, 17.4], [105.6, 18.0], [105.15, 18.6], [104.4, 19.1], [103.95, 19.3], [104.0, 19.6], [104.6, 19.8], [104.95, 20.25], [104.4, 20.5], [103.8, 20.75], [103.2, 20.85], [102.8, 21.3], [102.85, 21.7], [102.65, 22.05]];
    const CN_COAST = [[118.5, 24.6], [117.5, 23.8], [116.5, 23.0], [114.2, 22.3], [113.0, 22.0], [111.5, 21.5], [110.5, 21.3], [110.2, 20.3], [109.9, 20.4], [109.6, 21.0], [108.6, 21.65]];
    const KH_COAST = [[104.0, 10.6], [103.5, 10.65], [103.1, 11.3], [102.9, 11.8], [102.3, 12.2], [101.5, 12.65], [100.9, 12.7], [100.95, 13.5], [99.5, 13.4]];
    const HAINAN = [[108.6, 19.2], [108.7, 18.5], [109.5, 18.2], [110.2, 18.5], [111.0, 19.6], [110.6, 20.1], [109.6, 20.0], [108.9, 19.6]];
    const PHUQUOC = [[103.85, 10.4], [104.05, 10.42], [104.08, 10.05], [103.95, 10.0]];
    const VN = [...VN_N, ...VN_COAST, ...VN_W];
    const NEIGHBOR = [[99.5, 25.5], [118.6, 25.5], ...CN_COAST, ...VN_N.slice().reverse(), ...VN_W.slice().reverse(), ...KH_COAST, [99.5, 13.4]];
    const STR = {
      kicker: ['Epsilon Edu · Khoa học xã hội', 'Epsilon Edu · Social studies'],
      title: ['Văn hóa Việt Nam', 'Vietnamese Culture'],
      lead: ['Du lịch khắp đất nước qua bản đồ di sản, đi qua 12 tháng lễ hội cổ truyền và tự tay làm một chiếc bình gốm Bát Tràng.', 'Tour the country’s heritage map, travel through a year of traditional festivals, and make your own Bat Trang pottery vase.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Khám phá', 'Explore'],
      tab_her: ['🏛️ Di sản', '🏛️ Heritage'], h_her: ['Bản đồ di sản UNESCO', 'UNESCO heritage map'],
      cv_her: ['Bản đồ Việt Nam với các di sản được UNESCO công nhận. Bấm vào từng điểm', 'Map of Vietnam with UNESCO-listed heritage. Tap each pin'],
      se_her: ['Hộ chiếu di sản', 'Heritage passport'], sh_her: ['Nơi em đã ghé thăm', 'Places you’ve visited'],
      tab_fest: ['🏮 Lễ hội 12 tháng', '🏮 A year of festivals'], h_fest: ['Vòng lịch âm và các ngày lễ', 'The lunar calendar and its festivals'],
      cv_fest: ['Vòng 12 tháng âm lịch với các ngày lễ, Tết. Bấm vào từng lễ', 'The 12 lunar months with festivals. Tap one'],
      se_fest: ['Trò chơi', 'Mini-game'], sh_fest: ['Gói bánh chưng', 'Wrap a banh chung'],
      tab_craft: ['🏺 Làng gốm', '🏺 Pottery village'], h_craft: ['Làm bình gốm Bát Tràng', 'Make a Bat Trang vase'],
      cv_craft: ['Bàn xoay gốm. Kéo các nút tròn để tạo dáng bình', 'A potter’s wheel. Drag the round handles to shape the vase'],
      se_craft: ['Các bước', 'Steps'], sh_craft: ['Từ đất sét thành bình gốm', 'From clay to vase'],
      kindL: ['Loại di sản', 'Heritage type'], kTan: ['🏯 Di sản thế giới', '🏯 World Heritage'], kInt: ['🎭 Phi vật thể', '🎭 Intangible'],
      stepsL: ['Các bước', 'Steps'], glazeL: ['Men gốm', 'Glaze'], gBlue: ['Men lam (xanh trắng)', 'Blue and white'], gCrack: ['Men rạn', 'Crackle'], gBrown: ['Men nâu', 'Brown'],
      patL: ['Hoa văn', 'Pattern'], pLotus: ['🪷 Hoa sen', '🪷 Lotus'], pWave: ['🌊 Sóng nước', '🌊 Waves'], pDragon: ['🐉 Mây rồng', '🐉 Cloud dragon'], pNone: ['Trơn', 'Plain'],
      fire: ['🔥 Cho vào lò nung', '🔥 Fire in the kiln'], newPot: ['🏺 Làm bình mới', '🏺 New vase'], spin: ['🔄 Quay bàn xoay', '🔄 Spin the wheel']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    const emo = (ctx, e, x, y, px) => { ctx.font = emojiFont(px); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e, x, y); };

    /* =====================================================================
       1. BẢN ĐỒ DI SẢN
       ===================================================================== */
    const HER = [
      { id: 'halong', lon: 107.1, lat: 20.9, y: 1994, k: 'nat', art: 'karst', vi: ['Vịnh Hạ Long – Quần đảo Cát Bà', 'Quảng Ninh, Hải Phòng', 'Gần 2.000 hòn đảo đá vôi nhô lên giữa biển xanh, có nhiều hang động đẹp.', 'Tên "Hạ Long" nghĩa là "rồng đáp xuống". Truyền thuyết kể rồng nhả ngọc tạo thành các đảo để chặn giặc.'], en: ['Ha Long Bay – Cat Ba Archipelago', 'Quang Ninh, Hai Phong', 'Nearly 2,000 limestone islands rising from emerald water, full of caves.', '“Ha Long” means “descending dragon”. Legend says dragons spat jewels that became islands to stop invaders.'] },
      { id: 'thanglong', lon: 105.84, lat: 21.03, y: 2010, k: 'cul', art: 'gate', vi: ['Hoàng thành Thăng Long', 'Hà Nội', 'Trung tâm quyền lực của nước ta hơn 13 thế kỷ, có Đoan Môn, điện Kính Thiên và khu khảo cổ 18 Hoàng Diệu.', 'Được công nhận đúng dịp Đại lễ 1000 năm Thăng Long – Hà Nội năm 2010.'], en: ['Thang Long Imperial Citadel', 'Hanoi', 'The seat of power for over 13 centuries, with Doan Mon Gate, Kinh Thien Palace and an archaeological site.', 'It was listed in 2010, the year Hanoi turned 1,000.'] },
      { id: 'yentu', lon: 106.72, lat: 21.15, y: 2025, k: 'cul', art: 'pagoda', vi: ['Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc', 'Quảng Ninh, Bắc Ninh, Hải Phòng (trước là Bắc Giang, Hải Dương)', 'Quần thể chùa, đền gắn với Thiền phái Trúc Lâm do vua Trần Nhân Tông sáng lập trên núi Yên Tử.', 'Là di sản thế giới mới nhất của Việt Nam, được công nhận năm 2025.'], en: ['Yen Tu – Vinh Nghiem – Con Son, Kiep Bac', 'Quang Ninh and neighbouring provinces', 'Pagodas and temples linked to the Truc Lam Zen school founded by King Tran Nhan Tong on Mount Yen Tu.', 'Vietnam’s newest World Heritage Site, listed in 2025.'] },
      { id: 'trangan', lon: 105.9, lat: 20.25, y: 2014, k: 'mix', art: 'boat', vi: ['Quần thể danh thắng Tràng An', 'Ninh Bình', 'Núi đá vôi, hang động và sông nước tuyệt đẹp, cùng cố đô Hoa Lư. Là di sản "hỗn hợp" đầu tiên của Đông Nam Á, vừa thiên nhiên vừa văn hóa.', 'Du khách ngồi thuyền nan luồn qua những hang động xuyên núi.'], en: ['Trang An Landscape Complex', 'Ninh Binh', 'Limestone peaks, caves and rivers, plus the ancient capital Hoa Lu. Southeast Asia’s first “mixed” site, both natural and cultural.', 'Visitors glide by rowing boat through caves under the mountains.'] },
      { id: 'thanhho', lon: 105.6, lat: 20.08, y: 2011, k: 'cul', art: 'stone', vi: ['Thành nhà Hồ', 'Thanh Hóa', 'Tòa thành bằng những khối đá rất lớn xây năm 1397, đến nay vẫn đứng vững.', 'Có khối đá nặng tới hơn 20 tấn, xếp khít nhau mà không cần vữa.'], en: ['Citadel of the Ho Dynasty', 'Thanh Hoa', 'A citadel of giant stone blocks built in 1397, still standing today.', 'Some blocks weigh over 20 tonnes and fit together without mortar.'] },
      { id: 'phongnha', lon: 106.15, lat: 17.55, y: 2003, k: 'nat', art: 'cave', vi: ['Vườn quốc gia Phong Nha – Kẻ Bàng', 'Quảng Trị (trước là Quảng Bình)', 'Vùng núi đá vôi cổ với hàng trăm hang động, trong đó có Sơn Đoòng, hang động lớn nhất thế giới.', 'Trong hang Sơn Đoòng có cả rừng cây và mây riêng!'], en: ['Phong Nha – Ke Bang National Park', 'Central Vietnam', 'Ancient limestone hills with hundreds of caves, including Son Doong, the world’s largest cave.', 'Son Doong even has its own jungle and clouds inside!'] },
      { id: 'hue', lon: 107.58, lat: 16.47, y: 1993, k: 'cul', art: 'citadel', vi: ['Quần thể di tích Cố đô Huế', 'TP. Huế', 'Kinh thành của triều Nguyễn với Ngọ Môn, Đại Nội, các lăng tẩm bên dòng sông Hương.', 'Là di sản thế giới đầu tiên của Việt Nam, được công nhận năm 1993.'], en: ['Complex of Hue Monuments', 'Hue', 'The Nguyen dynasty capital with Ngo Mon Gate, the Imperial City and royal tombs along the Perfume River.', 'Vietnam’s first World Heritage Site, listed in 1993.'] },
      { id: 'hoian', lon: 108.33, lat: 15.88, y: 1999, k: 'cul', art: 'lantern', vi: ['Phố cổ Hội An', 'TP. Đà Nẵng (trước là Quảng Nam)', 'Thương cảng sầm uất xưa với nhà cổ mái ngói, Chùa Cầu và những chiếc đèn lồng rực rỡ.', 'Mỗi tối rằm, phố cổ tắt đèn điện, chỉ thắp đèn lồng và thả hoa đăng trên sông Hoài.'], en: ['Hoi An Ancient Town', 'Da Nang area', 'An old trading port with tiled houses, the Japanese Covered Bridge and colourful lanterns.', 'On full-moon nights the town turns off electric lights and glows with lanterns.'] },
      { id: 'myson', lon: 108.12, lat: 15.77, y: 1999, k: 'cul', art: 'tower', vi: ['Khu đền tháp Mỹ Sơn', 'TP. Đà Nẵng (trước là Quảng Nam)', 'Hơn 70 đền tháp bằng gạch của người Chăm, xây từ thế kỷ 4 đến thế kỷ 13.', 'Đến nay người ta vẫn chưa biết chắc người Chăm xưa đã kết dính gạch bằng cách nào.'], en: ['My Son Sanctuary', 'Da Nang area', 'More than 70 brick temple towers built by the Cham people from the 4th to 13th centuries.', 'Experts still aren’t sure how the Cham bonded the bricks together.'] }
    ];
    const INT = [
      { lon: 107.6, lat: 16.6, y: 2003, vi: ['Nhã nhạc cung đình Huế', 'Âm nhạc trang trọng trong cung đình triều Nguyễn.'], en: ['Hue royal court music', 'Formal music of the Nguyen royal court.'] },
      { lon: 108.0, lat: 13.6, y: 2005, vi: ['Không gian văn hóa Cồng chiêng Tây Nguyên', 'Tiếng cồng chiêng vang lên trong lễ hội của đồng bào Tây Nguyên.'], en: ['Gong culture of the Central Highlands', 'Gongs ring out at Highlands festivals.'] },
      { lon: 106.07, lat: 21.22, y: 2009, vi: ['Dân ca Quan họ Bắc Ninh', 'Liền anh, liền chị hát đối đáp, mời trầu bên sông Cầu.'], en: ['Quan ho folk songs', 'Men and women sing back and forth in Bac Ninh.'] },
      { lon: 105.62, lat: 20.95, y: 2009, vi: ['Ca trù', 'Đào nương vừa hát vừa gõ phách, có đàn đáy và trống chầu.'], en: ['Ca tru singing', 'A singer taps clappers, with a lute and drum.'] },
      { lon: 105.86, lat: 21.3, y: 2010, vi: ['Hội Gióng ở đền Phù Đổng và đền Sóc', 'Lễ hội tưởng nhớ Thánh Gióng đánh giặc Ân.'], en: ['Giong Festival', 'Honours the hero Saint Giong.'] },
      { lon: 105.2, lat: 21.32, y: 2011, vi: ['Hát Xoan Phú Thọ', 'Lối hát mừng xuân cổ xưa ở vùng đất Tổ.'], en: ['Xoan singing', 'Ancient spring songs from Phu Tho.'] },
      { lon: 105.32, lat: 21.45, y: 2012, vi: ['Tín ngưỡng thờ cúng Hùng Vương', 'Người Việt hướng về Giỗ Tổ ngày 10 tháng 3 âm lịch.'], en: ['Worship of the Hung Kings', 'Celebrated on the 10th day of the 3rd lunar month.'] },
      { lon: 105.8, lat: 10.15, y: 2013, vi: ['Đờn ca tài tử Nam Bộ', 'Đàn và hát giao lưu thân mật của người miền Nam.'], en: ['Don ca tai tu music', 'Friendly southern music and song.'] },
      { lon: 105.6, lat: 18.65, y: 2014, vi: ['Dân ca Ví, Giặm Nghệ Tĩnh', 'Câu hát mộc mạc khi làm đồng, dệt vải, chèo thuyền.'], en: ['Vi and Giam folk songs', 'Simple work songs of Nghe An and Ha Tinh.'] },
      { lon: 106.35, lat: 21.0, y: 2015, vi: ['Nghi lễ và trò chơi Kéo co', 'Trò chơi cầu mong mùa màng bội thu (cùng một số nước châu Á).'], en: ['Tug of war rituals', 'A game praying for good harvests (shared with other Asian countries).'] },
      { lon: 106.18, lat: 20.42, y: 2016, vi: ['Thực hành Tín ngưỡng thờ Mẫu Tam phủ', 'Tín ngưỡng dân gian thờ Mẹ, có hát văn và hầu đồng.'], en: ['Mother Goddess worship', 'Folk worship of the Mother Goddesses, with chau van singing.'] },
      { lon: 109.1, lat: 14.0, y: 2017, vi: ['Bài chòi Trung Bộ', 'Vừa hát vừa chơi bốc thẻ trong dịp Tết ở miền Trung.'], en: ['Bai choi', 'A singing card game played at Tet in central Vietnam.'] },
      { lon: 106.25, lat: 22.65, y: 2019, vi: ['Thực hành Then của người Tày, Nùng, Thái', 'Lời hát Then cùng tiếng đàn tính.'], en: ['Then practices', 'Then singing with the tinh lute of the Tay, Nung and Thai peoples.'] },
      { lon: 103.95, lat: 21.35, y: 2021, vi: ['Nghệ thuật Xòe Thái', 'Vòng xòe nắm tay nhau, thể hiện tình đoàn kết.'], en: ['Xoe Thai dance', 'A circle dance holding hands, showing unity.'] },
      { lon: 108.9, lat: 11.6, y: 2022, vi: ['Nghệ thuật làm gốm của người Chăm', 'Nặn gốm bằng tay, không dùng bàn xoay, ở làng Bàu Trúc.'], en: ['Cham pottery', 'Hand-built pots made without a wheel at Bau Truc village.'] },
      { lon: 105.05, lat: 10.68, y: 2024, vi: ['Lễ hội Vía Bà Chúa Xứ núi Sam', 'Lễ hội lớn ở An Giang vào tháng 4 âm lịch.'], en: ['Ba Chua Xu Festival', 'A big festival in An Giang in the 4th lunar month.'] }
    ];
    const KIND = { nat: ['🌿', '#16a34a', { vi: 'Thiên nhiên', en: 'Natural' }], cul: ['🏯', '#dc2626', { vi: 'Văn hóa', en: 'Cultural' }], mix: ['🌄', '#9333ea', { vi: 'Hỗn hợp', en: 'Mixed' }] };
    const PKEY = 'epsilonEdu.heritagePassport.v1';
    let hr = { mode: 'tan', sel: 0, stamps: {}, pins: [], infoKey: '', pop: 0 };
    try { hr.stamps = JSON.parse(window.localStorage.getItem(PKEY) || '{}') || {}; } catch (_) { hr.stamps = {}; }
    const hrC = mk('c_her', (w) => clamp(w * .95, 360, 640));
    const artC = mk('c_art', (w) => clamp(w * .62, 170, 240));
    function hrProj() {
      const { w, h } = hrC, lon0 = 101.5, lon1 = 116.5, lat0 = 8, lat1 = 23.8, s = Math.min(w / (lon1 - lon0), h / (lat1 - lat0)), ox = (w - (lon1 - lon0) * s) / 2, oy = (h - (lat1 - lat0) * s) / 2;
      return { P: (lon, lat) => ({ x: ox + (lon - lon0) * s, y: h - oy - (lat - lat0) * s }), s };
    }
    function drawHer(dt) {
      const { w, h, ctx } = hrC; if (!w) return;
      const { P, s } = hrProj();
      ctx.fillStyle = '#bae6fd'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; for (let k = 0; k < 10; k++) { const y = (k * 61 + clock * 6) % h; ctx.beginPath(); ctx.moveTo(w * .62, y); ctx.quadraticCurveTo(w * .75, y - 6, w * .9, y); ctx.stroke(); }
      const poly = (pts, fill, stroke) => { ctx.beginPath(); pts.forEach(([lo, la], i) => { const p = P(lo, la); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); }); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.2; ctx.stroke(); } };
      poly(NEIGHBOR, '#f5f5f4', '#d6d3d1'); poly(HAINAN, '#f5f5f4', '#d6d3d1');
      poly(VN, '#fde68a', '#d97706'); poly(PHUQUOC, '#fde68a', '#d97706');
      const dot = (lo, la) => { const p = P(lo, la); ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, TAU); ctx.fill(); };
      [[111.8, 16.4], [112.3, 16.7], [111.6, 16.9], [112.0, 16.1]].forEach(([a, b]) => dot(a, b)); [[114.2, 10.4], [114.5, 9.9], [113.9, 9.6], [114.9, 10.2], [115.2, 9.4]].forEach(([a, b]) => dot(a, b));
      const fs = w < 420 ? 9.5 : 11;
      let p = P(112.0, 15.7); textLight(ctx, T('QĐ Hoàng Sa', 'Hoang Sa Is.'), p.x, p.y, '#92400e', fs, 'center', 900);
      p = P(114.4, 8.9); textLight(ctx, T('QĐ Trường Sa', 'Truong Sa Is.'), p.x, p.y, '#92400e', fs, 'center', 900);
      p = P(112.6, 13.2); textLight(ctx, T('Biển Đông', 'East Sea'), p.x, p.y, '#075985', fs + 3, 'center', 900);
      // ghim
      hr.pins = [];
      const list = hr.mode === 'tan' ? HER : INT;
      list.forEach((it, i) => {
        const q = P(it.lon, it.lat), on = i === hr.sel, bob = on && !reduceMotion ? Math.sin(clock * 5) * 3 : 0;
        if (hr.mode === 'tan') {
          const col = KIND[it.k][1], got = hr.stamps[it.id];
          ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.arc(q.x, q.y - 16 + bob, on ? 12 : 10, Math.PI * .75, Math.PI * 2.25); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
          emo(ctx, got ? '⭐' : KIND[it.k][0], q.x, q.y - 16 + bob, on ? 13 : 11);
          if (on) { const nm = L({ vi: it.vi, en: it.en })[0]; bubble(ctx, nm.length > 26 ? nm.slice(0, 25) + '…' : nm, clamp(q.x + 90, 90, w - 90), q.y - 40, 11.5, '#fff', '#7c2d12'); }
        } else {
          ctx.fillStyle = on ? '#db2777' : '#a855f7'; ctx.beginPath(); ctx.arc(q.x, q.y + bob, on ? 8 : 6, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
          if (on) { const nm = L({ vi: it.vi, en: it.en })[0]; bubble(ctx, nm.length > 28 ? nm.slice(0, 27) + '…' : nm, clamp(q.x + 95, 95, w - 95), q.y - 22, 11, '#fff', '#831843'); }
        }
        hr.pins.push({ i, x: q.x, y: hr.mode === 'tan' ? q.y - 14 : q.y });
      });
      const n = Object.keys(hr.stamps).length;
      ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, 8, h - 34, 210, 26, 10); ctx.fill();
      textLight(ctx, hr.mode === 'tan' ? T(`🛂 Đã đóng dấu ${n}/${HER.length} di sản`, `🛂 Stamped ${n}/${HER.length} sites`) : T(`🎭 ${INT.length} di sản phi vật thể`, `🎭 ${INT.length} intangible heritage items`), 16, h - 21, '#6d28d9', 12, 'left', 900);
      void s; void dt;
    }
    hrC.c.addEventListener('pointerdown', (e) => {
      const p = localPoint(hrC.c, e); let best = -1, bd = 22;
      for (const q of hr.pins) { const d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; best = q.i; } }
      if (best < 0) return; cancelSpeech(); hr.sel = best;
      if (hr.mode === 'tan' && !hr.stamps[HER[best].id]) { hr.stamps[HER[best].id] = 1; hr.pop = 1; try { window.localStorage.setItem(PKEY, JSON.stringify(hr.stamps)); } catch (_) {} hrPassport(); }
      hrInfo(true);
    });
    function drawArt(dt) {
      const { w, h, ctx } = artC; if (!w) return;
      if (hr.mode !== 'tan') { const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#fdf2f8'); g.addColorStop(1, '#fce7f3'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); emo(ctx, ['🎼', '🔔', '🎤', '🎶', '🐎', '🌸', '🏯', '🎻', '🌾', '🪢', '🙏', '🃏', '🎸', '💃', '🏺', '🎉'][hr.sel] || '🎭', w / 2, h * .45, Math.min(70, h * .4)); textLight(ctx, T(`Công nhận năm ${INT[hr.sel].y}`, `Listed in ${INT[hr.sel].y}`), w / 2, h * .85, '#9d174d', 13, 'center', 900); return; }
      const it = HER[hr.sel], art = it.art;
      const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, art === 'lantern' ? '#1e1b4b' : '#7dd3fc'); sky.addColorStop(1, art === 'lantern' ? '#4c1d95' : '#e0f2fe'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      const gy = h * .78;
      if (art === 'karst' || art === 'boat') {
        ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0, gy - h * .05, w, h); 
        for (const [x, hh, ww] of [[.15, .45, .14], [.38, .6, .16], [.62, .5, .13], [.85, .42, .15]]) { ctx.fillStyle = '#4d7c0f'; ctx.beginPath(); ctx.moveTo(w * (x - ww), gy - h * .03); ctx.quadraticCurveTo(w * (x - ww * .9), gy - h * hh, w * x, gy - h * hh); ctx.quadraticCurveTo(w * (x + ww * .9), gy - h * hh, w * (x + ww), gy - h * .03); ctx.fill(); ctx.fillStyle = 'rgba(21,128,61,.6)'; ctx.fillRect(w * (x - ww * .6), gy - h * hh * .7, w * ww * .3, h * .04); }
        const bx = (w * .2 + clock * 14) % (w + 60) - 30;
        if (art === 'karst') { ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.moveTo(bx - 22, gy); ctx.lineTo(bx + 22, gy); ctx.lineTo(bx + 16, gy + 8); ctx.lineTo(bx - 16, gy + 8); ctx.fill(); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(bx - 2, gy - 2); ctx.quadraticCurveTo(bx + 14, gy - 16, bx - 2, gy - 32); ctx.lineTo(bx - 2, gy - 2); ctx.fill(); }
        else { ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.ellipse(w * .5, gy - h * .25, w * .07, h * .1, 0, Math.PI, TAU); ctx.fill(); ctx.fillStyle = '#a16207'; ctx.beginPath(); ctx.ellipse(bx, gy + 2, 20, 5, 0, 0, Math.PI); ctx.fill(); ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.moveTo(bx - 8, gy - 4); ctx.lineTo(bx, gy - 12); ctx.lineTo(bx + 8, gy - 4); ctx.fill(); }
      } else if (art === 'cave') {
        ctx.fillStyle = '#1f2937'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.ellipse(w * .62, h * .25, w * .16, h * .14, 0, 0, TAU); ctx.fill();
        const lg = ctx.createLinearGradient(w * .62, h * .25, w * .45, gy); lg.addColorStop(0, 'rgba(254,249,195,.55)'); lg.addColorStop(1, 'rgba(254,249,195,0)'); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(w * .5, h * .3); ctx.lineTo(w * .75, h * .3); ctx.lineTo(w * .65, gy); ctx.lineTo(w * .3, gy); ctx.fill();
        ctx.fillStyle = '#15803d'; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.arc(w * (.35 + k * .06), gy - 8 - (k % 3) * 6, 10, 0, TAU); ctx.fill(); }
        ctx.fillStyle = '#4b5563'; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.moveTo(w * k / 9, 0); ctx.lineTo(w * (k + .5) / 9, h * (.08 + (k % 3) * .05)); ctx.lineTo(w * (k + 1) / 9, 0); ctx.fill(); }
        emo(ctx, '🧗', w * .25, gy - 14, 20);
      } else if (art === 'lantern') {
        ctx.fillStyle = '#facc15'; ctx.fillRect(0, gy, w, h);
        ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.moveTo(w * .25, gy - h * .25); ctx.quadraticCurveTo(w * .5, gy - h * .42, w * .75, gy - h * .25); ctx.lineTo(w * .72, gy - h * .2); ctx.lineTo(w * .28, gy - h * .2); ctx.fill();
        ctx.fillStyle = '#fef3c7'; ctx.fillRect(w * .3, gy - h * .2, w * .4, h * .2); ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.arc(w * .5, gy, w * .08, Math.PI, TAU); ctx.fill();
        for (let k = 0; k < 6; k++) { const x = w * (.1 + k * .16), y = h * (.2 + (k % 2) * .08) + Math.sin(clock * 2 + k) * 3, col = ['#ef4444', '#f59e0b', '#ec4899', '#a855f7', '#22c55e', '#3b82f6'][k]; ctx.strokeStyle = '#78350f'; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, y - 12); ctx.stroke(); const g = ctx.createRadialGradient(x, y, 2, x, y, 22); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 22, 0, TAU); ctx.fill(); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x, y, 9, 12, 0, 0, TAU); ctx.fill(); }
      } else if (art === 'tower') {
        ctx.fillStyle = '#65a30d'; ctx.fillRect(0, gy, w, h);
        for (const [x, sc] of [[.3, .8], [.55, 1], [.78, .7]]) { const tw = w * .14 * sc, th = h * .55 * sc; ctx.fillStyle = '#b45309'; ctx.fillRect(w * x - tw / 2, gy - th * .55, tw, th * .55); ctx.beginPath(); ctx.moveTo(w * x - tw / 2, gy - th * .55); ctx.lineTo(w * x - tw * .35, gy - th * .75); ctx.lineTo(w * x + tw * .35, gy - th * .75); ctx.lineTo(w * x + tw / 2, gy - th * .55); ctx.fill(); ctx.beginPath(); ctx.moveTo(w * x - tw * .3, gy - th * .75); ctx.lineTo(w * x, gy - th); ctx.lineTo(w * x + tw * .3, gy - th * .75); ctx.fill(); ctx.fillStyle = '#78350f'; ctx.fillRect(w * x - tw * .15, gy - th * .3, tw * .3, th * .3); }
      } else if (art === 'stone') {
        ctx.fillStyle = '#a3e635'; ctx.fillRect(0, gy, w, h);
        ctx.fillStyle = '#a8a29e'; ctx.fillRect(w * .12, gy - h * .45, w * .76, h * .45); ctx.strokeStyle = '#78716c'; ctx.lineWidth = 1.5; for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) ctx.strokeRect(w * .12 + c * w * .095 + (r % 2) * w * .047, gy - h * .45 + r * h * .075, w * .095, h * .075);
        ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.moveTo(w * .4, gy); ctx.lineTo(w * .4, gy - h * .22); ctx.arc(w * .5, gy - h * .22, w * .1, Math.PI, TAU); ctx.lineTo(w * .6, gy); ctx.fill();
      } else {
        // gate / citadel / pagoda: cổng và mái cong
        ctx.fillStyle = art === 'pagoda' ? '#4d7c0f' : '#a3e635'; if (art === 'pagoda') { ctx.beginPath(); ctx.moveTo(0, gy); ctx.quadraticCurveTo(w * .5, h * .05, w, gy); ctx.fill(); } ctx.fillStyle = '#86efac'; ctx.fillRect(0, gy, w, h);
        const x = w / 2, bw = w * (art === 'pagoda' ? .3 : .55), by = art === 'pagoda' ? h * .42 : gy;
        ctx.fillStyle = art === 'citadel' ? '#7c2d12' : art === 'pagoda' ? '#a16207' : '#b91c1c'; ctx.fillRect(x - bw / 2, by - h * .26, bw, h * .26);
        ctx.fillStyle = '#1f2937'; for (const k of art === 'pagoda' ? [0] : [-.3, 0, .3]) { ctx.beginPath(); ctx.moveTo(x + k * bw - bw * .07, by); ctx.lineTo(x + k * bw - bw * .07, by - h * .12); ctx.arc(x + k * bw, by - h * .12, bw * .07, Math.PI, TAU); ctx.lineTo(x + k * bw + bw * .07, by); ctx.fill(); }
        for (const [yy, ww] of art === 'pagoda' ? [[.26, .7], [.36, .5], [.44, .35]] : [[.26, .95], [.38, .6]]) { ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.moveTo(x - bw * ww * .65, by - h * yy + 4); ctx.quadraticCurveTo(x - bw * ww * .55, by - h * yy - 6, x - bw * ww * .4, by - h * yy - 8); ctx.lineTo(x + bw * ww * .4, by - h * yy - 8); ctx.quadraticCurveTo(x + bw * ww * .55, by - h * yy - 6, x + bw * ww * .65, by - h * yy + 4); ctx.lineTo(x + bw * ww * .45, by - h * yy); ctx.lineTo(x - bw * ww * .45, by - h * yy); ctx.fill(); if (yy < .3 || art === 'pagoda') { ctx.fillStyle = '#fef3c7'; ctx.fillRect(x - bw * ww * .4, by - h * yy, bw * ww * .8, h * .06); } }
        if (art === 'citadel') { ctx.fillStyle = '#facc15'; ctx.fillRect(x - 2, by - h * .52, 3, h * .14); ctx.fillStyle = '#dc2626'; ctx.fillRect(x + 1, by - h * .52, 16, 10); }
      }
      textLight(ctx, `${KIND[it.k][0]} ${L(KIND[it.k][2])} · ${it.y}`, w / 2, h - 12, '#0f172a', 12, 'center', 900);
      if (hr.pop > 0) { hr.pop -= dt * .7; ctx.save(); ctx.translate(w * .8, h * .22); ctx.rotate(-.25); ctx.globalAlpha = Math.min(1, hr.pop * 2); ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 26 + (1 - hr.pop) * 4, 0, TAU); ctx.stroke(); textLight(ctx, T('ĐÃ ĐẾN', 'VISITED'), 0, 0, '#dc2626', 11, 'center', 900); ctx.restore(); ctx.globalAlpha = 1; }
    }
    function hrPassport() {
      const n = Object.keys(hr.stamps).length;
      $('passport').innerHTML = `<div class="stamp-grid">${HER.map((it) => `<div class="stamp${hr.stamps[it.id] ? ' got' : ''}"><span>${hr.stamps[it.id] ? KIND[it.k][0] : '❔'}</span><b></b></div>`).join('')}</div><p class="score" style="margin:0">${T(`Đã đóng dấu ${n}/${HER.length}${n === HER.length ? ' 🏆 Nhà thám hiểm di sản!' : ''}`, `Stamped ${n}/${HER.length}${n === HER.length ? ' 🏆 Heritage explorer!' : ''}`)}</p>`;
      $('passport').querySelectorAll('.stamp').forEach((el, i) => { el.querySelector('b').textContent = hr.stamps[HER[i].id] ? L({ vi: HER[i].vi, en: HER[i].en })[0].split(' – ')[0].replace('Quần thể ', '').replace('Khu đền tháp ', '') : '???'; });
    }
    function hrInfo(force) {
      const key = [lang, hr.mode, hr.sel].join('|'); if (key === hr.infoKey && !force) return; hr.infoKey = key;
      if (hr.mode === 'tan') {
        const it = HER[hr.sel], d = L({ vi: it.vi, en: it.en });
        infoBox($('info_her'), { emo: KIND[it.k][0], title: d[0], sub: `📍 ${d[1]} · ${T('UNESCO công nhận', 'Listed')} ${it.y}`, rows: [[T('Có gì đặc biệt?', 'What’s special?'), d[2]], [T('Loại di sản', 'Type'), L(KIND[it.k][2])]], notes: [['fun', '✨ ' + d[3]], ['tip', T(`🗺️ Việt Nam có ${HER.length} di sản thế giới (tính đến năm 2025). Bấm vào các ghim để đóng dấu hộ chiếu!`, `🗺️ Vietnam has ${HER.length} World Heritage Sites (as of 2025). Tap the pins to stamp your passport!`)]] });
        setText('hud_her', `${KIND[it.k][0]} ${d[0]} (${it.y})`);
      } else {
        const it = INT[hr.sel], d = L({ vi: it.vi, en: it.en });
        infoBox($('info_her'), { emo: '🎭', title: d[0], sub: T(`UNESCO ghi danh năm ${it.y}`, `Inscribed ${it.y}`), rows: [[T('Là gì?', 'What is it?'), d[1]]], notes: [['tip', T('💡 Di sản phi vật thể là những thứ không cầm nắm được: lời ca, điệu múa, lễ hội, nghề thủ công, tín ngưỡng… được truyền từ đời này sang đời khác.', '💡 Intangible heritage is what you can’t hold: songs, dances, festivals, crafts and beliefs passed down the generations.')]] });
        setText('hud_her', `🎭 ${d[0]} (${it.y})`);
      }
    }
    root.querySelectorAll('[data-hk]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); hr.mode = b.dataset.hk; hr.sel = 0; pressGroup('[data-hk]', 'hk', hr.mode); hrInfo(true); }));
    TABS.her = { frame(dt) { drawHer(dt); drawArt(dt); }, refresh() { hrPassport(); hr.infoKey = ''; hrInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_her'), {
      vi: [
        { q: 'Di sản thế giới đầu tiên của Việt Nam (năm 1993) là gì?', a: ['Quần thể di tích Cố đô Huế', 'Vịnh Hạ Long', 'Phố cổ Hội An', 'Thành nhà Hồ'], why: 'Cố đô Huế được UNESCO công nhận năm 1993.' },
        { q: 'Hang động lớn nhất thế giới nằm ở di sản nào?', a: ['Phong Nha – Kẻ Bàng', 'Tràng An', 'Vịnh Hạ Long', 'Mỹ Sơn'], why: 'Hang Sơn Đoòng thuộc Vườn quốc gia Phong Nha – Kẻ Bàng.' },
        { q: 'Khu đền tháp Mỹ Sơn do ai xây dựng?', a: ['Người Chăm', 'Người Pháp', 'Nhà Nguyễn', 'Người Nhật'], why: 'Người Chăm xây các đền tháp gạch từ thế kỷ 4 đến 13.' },
        { q: 'Di sản nào vừa là thiên nhiên vừa là văn hóa (hỗn hợp)?', a: ['Tràng An', 'Hoàng thành Thăng Long', 'Phố cổ Hội An', 'Cố đô Huế'], why: 'Tràng An là di sản hỗn hợp đầu tiên ở Đông Nam Á.' },
        { q: 'Dân ca Quan họ gắn với vùng nào?', a: ['Bắc Ninh', 'Cà Mau', 'Đà Lạt', 'Lào Cai'], why: 'Quan họ Bắc Ninh được UNESCO ghi danh năm 2009.' },
        { q: '"Di sản phi vật thể" là gì?', a: ['Lời ca, điệu múa, lễ hội, nghề truyền thống…', 'Những tòa nhà cao tầng', 'Núi và sông', 'Đồ chơi điện tử'], why: 'Là những giá trị văn hóa truyền từ đời này sang đời khác.' }
      ],
      en: [
        { q: 'What was Vietnam’s first World Heritage Site (1993)?', a: ['Complex of Hue Monuments', 'Ha Long Bay', 'Hoi An', 'Ho Citadel'], why: 'Hue was listed in 1993.' },
        { q: 'Where is the world’s largest cave?', a: ['Phong Nha – Ke Bang', 'Trang An', 'Ha Long Bay', 'My Son'], why: 'Son Doong is in Phong Nha – Ke Bang National Park.' },
        { q: 'Who built the My Son towers?', a: ['The Cham people', 'The French', 'The Nguyen dynasty', 'The Japanese'], why: 'The Cham built brick towers from the 4th to 13th centuries.' },
        { q: 'Which site is both natural and cultural (mixed)?', a: ['Trang An', 'Thang Long Citadel', 'Hoi An', 'Hue'], why: 'Trang An is Southeast Asia’s first mixed site.' },
        { q: 'Quan ho folk songs come from…', a: ['Bac Ninh', 'Ca Mau', 'Da Lat', 'Lao Cai'], why: 'Listed by UNESCO in 2009.' },
        { q: 'What is intangible heritage?', a: ['Songs, dances, festivals, crafts…', 'Tall buildings', 'Mountains and rivers', 'Video games'], why: 'Cultural traditions passed down the generations.' }
      ]
    }));

    /* =====================================================================
       2. LỄ HỘI 12 THÁNG (âm lịch)
       ===================================================================== */
    const FEST = [
      { m: 1, d: 1, e: ['🧧', '🌸', '🎆'], vi: ['Tết Nguyên Đán', 'Ngày đầu năm mới âm lịch, lễ lớn nhất của người Việt.', 'Gói bánh chưng, trang trí hoa đào hoa mai, chúc Tết ông bà, mừng tuổi, đi lễ chùa.', 'Bánh chưng vuông tượng trưng cho đất, gắn với truyền thuyết Lang Liêu thời vua Hùng.'], en: ['Lunar New Year (Tet)', 'The first day of the lunar year, the biggest Vietnamese celebration.', 'Wrapping banh chung, decorating with peach and apricot blossoms, wishing grandparents well, lucky money, visiting pagodas.', 'The square banh chung stands for the Earth, from the legend of Prince Lang Lieu.'] },
      { m: 1, d: 6, e: ['⛰️', '🛶', '🙏'], vi: ['Khai hội Chùa Hương', 'Lễ hội ở Hà Nội, kéo dài đến tháng 3 âm lịch.', 'Ngồi thuyền theo suối Yến, leo núi vào động Hương Tích.', 'Đây là một trong những lễ hội dài nhất cả nước.'], en: ['Perfume Pagoda Festival opens', 'A festival near Hanoi lasting until the 3rd lunar month.', 'Rowing along Yen Stream and climbing to Huong Tich Cave.', 'One of the longest festivals in the country.'] },
      { m: 1, d: 13, e: ['👒', '🎶', '🍃'], vi: ['Hội Lim', 'Lễ hội ở Bắc Ninh, quê hương Quan họ.', 'Liền anh, liền chị hát Quan họ trên thuyền, dưới đồi, mời trầu khách.', 'Liền chị đội nón quai thao, mặc áo mớ ba mớ bảy.'], en: ['Lim Festival', 'A festival in Bac Ninh, home of Quan ho singing.', 'Singers perform Quan ho on boats and hills and offer betel to guests.', 'Women singers wear wide quai thao hats and layered dresses.'] },
      { m: 1, d: 15, e: ['🌕', '🏮', '🙏'], vi: ['Rằm tháng Giêng', 'Đêm trăng tròn đầu tiên của năm mới.', 'Đi lễ chùa cầu bình an, ngắm trăng. Ở Hội An thả hoa đăng.', 'Dân gian có câu: "Lễ Phật quanh năm không bằng rằm tháng Giêng".'], en: ['First Full Moon Festival', 'The first full moon of the new year.', 'Visiting pagodas to pray for peace and enjoying the moon. Hoi An floats lanterns.', 'A saying goes that this full moon matters more than all year’s prayers.'] },
      { m: 3, d: 3, e: ['⚪', '🍡', '🍃'], vi: ['Tết Hàn thực', 'Ngày "ăn đồ nguội".', 'Làm bánh trôi, bánh chay dâng lên tổ tiên.', 'Bánh trôi tròn, nhân đường phèn, luộc chín thì nổi lên mặt nước.'], en: ['Cold Food Festival', 'The day of “cold food”.', 'Making banh troi and banh chay rice balls for the ancestors.', 'Banh troi have sugar inside and float up when cooked.'] },
      { m: 3, d: 10, e: ['🥁', '⛩️', '🇻🇳'], vi: ['Giỗ Tổ Hùng Vương', 'Ngày tưởng nhớ các vua Hùng dựng nước, là ngày nghỉ lễ của cả nước.', 'Dâng hương ở Đền Hùng, Phú Thọ. Bánh chưng, bánh giầy được dâng lên các vua Hùng.', '"Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mùng mười tháng ba."'], en: ['Hung Kings’ Commemoration', 'A national holiday honouring the founding Hung Kings.', 'Offering incense at the Hung Temple in Phu Tho, with banh chung and banh giay.', '“Wherever you go, remember the 10th day of the 3rd month.”'] },
      { m: 5, d: 5, e: ['🍑', '🍚', '🐛'], vi: ['Tết Đoan Ngọ', 'Còn gọi là Tết "giết sâu bọ".', 'Sáng sớm ăn rượu nếp, hoa quả chua như mận, vải.', 'Người xưa tin ăn rượu nếp và quả chua giúp diệt "sâu bọ" trong người.'], en: ['Doan Ngo Festival', 'Also called “killing insects” day.', 'Eating fermented sticky rice and sour fruits like plums early in the morning.', 'People believed this killed the “bugs” inside the body.'] },
      { m: 7, d: 15, e: ['🌹', '👨‍👩‍👧', '🙏'], vi: ['Lễ Vu Lan', 'Mùa báo hiếu cha mẹ.', 'Cài bông hồng lên áo: hồng đỏ khi còn mẹ, hồng trắng khi mẹ đã mất.', 'Gắn với câu chuyện Mục Kiền Liên cứu mẹ.'], en: ['Vu Lan Festival', 'A time to honour parents.', 'Pinning a rose on your shirt: red if your mother is alive, white if she has passed away.', 'Linked to the story of Maudgalyayana saving his mother.'] },
      { m: 8, d: 15, e: ['🏮', '🥮', '🌕'], vi: ['Tết Trung thu', 'Tết của thiếu nhi, đêm trăng tròn sáng nhất năm.', 'Rước đèn ông sao, phá cỗ, ăn bánh nướng bánh dẻo, xem múa lân.', 'Chuyện chú Cuội ngồi gốc cây đa trên cung trăng gắn với Tết Trung thu.'], en: ['Mid-Autumn Festival', 'The children’s festival, under the year’s brightest full moon.', 'Star lantern parades, a moon feast, mooncakes and lion dances.', 'The tale of Cuoi sitting under a banyan tree on the Moon belongs to this night.'] },
      { m: 12, d: 23, e: ['🐟', '🍲', '🧑‍🍳'], vi: ['Ông Công Ông Táo', 'Ngày tiễn Táo Quân về trời.', 'Thả cá chép ra sông hồ để Táo Quân cưỡi về trời báo cáo việc nhà trong năm.', 'Sau ngày này, nhà nào cũng tất bật dọn dẹp đón Tết.'], en: ['Kitchen Gods’ Day', 'Seeing the Kitchen Gods off to heaven.', 'Releasing carp into rivers for the Kitchen Gods to ride up and report on the year.', 'After this day, families get busy cleaning for Tet.'] }
    ];
    FEST[5].e = ['🥁', '⛩️', '🌾'];
    const MONTH_COL = ['#fca5a5', '#fdba74', '#fde68a', '#bef264', '#86efac', '#6ee7b7', '#67e8f9', '#93c5fd', '#c4b5fd', '#f0abfc', '#f9a8d4', '#fda4af'];
    let fs2 = { sel: 0, rot: 0, pins: [], infoKey: '' };
    const fsC = mk('c_fest', (w) => clamp(w * .78, 330, 560));
    const fAng = (f) => ((f.m - 1) + (f.d - 1) / 30) / 12 * TAU - Math.PI / 2;
    function drawFest(dt) {
      const { w, h, ctx } = fsC; if (!w) return;
      const target = -fAng(FEST[fs2.sel]) - Math.PI / 2;
      let diff = target - fs2.rot; diff = ((diff + Math.PI) % TAU + TAU) % TAU - Math.PI; fs2.rot += diff * Math.min(1, dt * 4);
      ctx.fillStyle = '#fff7ed'; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2 + 6, R = Math.min(w, h) * .45, r0 = R * .55;
      for (let m = 0; m < 12; m++) {
        const a0 = m / 12 * TAU - Math.PI / 2 + fs2.rot, a1 = a0 + TAU / 12;
        ctx.fillStyle = MONTH_COL[m]; ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.arc(cx, cy, r0, a1, a0, true); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke();
        const am = (a0 + a1) / 2; textLight(ctx, T(`Tháng ${m + 1}`, `Month ${m + 1}`), cx + Math.cos(am) * (R * .88), cy + Math.sin(am) * (R * .88), '#7c2d12', w < 420 ? 9.5 : 11, 'center', 900);
      }
      fs2.pins = [];
      FEST.forEach((f, i) => {
        const a = fAng(f) + fs2.rot, rr2 = R * (.66 + (i % 2) * .1), x = cx + Math.cos(a) * rr2, y = cy + Math.sin(a) * rr2, on = i === fs2.sel;
        ctx.fillStyle = on ? '#be185d' : '#fff'; ctx.beginPath(); ctx.arc(x, y, on ? 17 : 14, 0, TAU); ctx.fill(); ctx.strokeStyle = on ? '#fff' : '#fb923c'; ctx.lineWidth = 2; ctx.stroke();
        emo(ctx, f.e[0], x, y + 1, on ? 18 : 15);
        fs2.pins.push({ i, x, y });
      });
      // tâm: minh họa lễ hội đang chọn
      const f = FEST[fs2.sel];
      const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, r0 * .95); g.addColorStop(0, f.d === 15 ? '#1e1b4b' : '#fffbeb'); g.addColorStop(1, f.d === 15 ? '#312e81' : '#fde68a');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r0 * .95, 0, TAU); ctx.fill();
      if (f.d === 15) { ctx.fillStyle = 'rgba(254,249,195,.95)'; ctx.beginPath(); ctx.arc(cx + r0 * .35, cy - r0 * .4, r0 * .18, 0, TAU); ctx.fill(); }
      const bob = reduceMotion ? 0 : Math.sin(clock * 2.5) * 4;
      emo(ctx, f.e[0], cx - r0 * .38, cy - r0 * .05 + bob, r0 * .42); emo(ctx, f.e[1], cx + r0 * .35, cy + r0 * .08 - bob, r0 * .38); emo(ctx, f.e[2], cx, cy - r0 * .45 + bob * .5, r0 * .3);
      textLight(ctx, L({ vi: f.vi, en: f.en })[0], cx, cy + r0 * .55, f.d === 15 ? '#fef3c7' : '#7c2d12', w < 420 ? 12 : 14, 'center', 900);
      textLight(ctx, T(`${f.d}/${f.m} âm lịch`, `Lunar ${f.d}/${f.m}`), cx, cy + r0 * .74, f.d === 15 ? '#fde68a' : '#b45309', 11, 'center', 900);
      ctx.fillStyle = '#be185d'; ctx.beginPath(); ctx.moveTo(cx - 10, cy - R - 10); ctx.lineTo(cx + 10, cy - R - 10); ctx.lineTo(cx, cy - R + 4); ctx.closePath(); ctx.fill();
    }
    fsC.c.addEventListener('pointerdown', (e) => { const p = localPoint(fsC.c, e); let best = -1, bd = 24; for (const q of fs2.pins) { const d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; best = q.i; } } if (best >= 0) { cancelSpeech(); fs2.sel = best; fsInfo(true); } });
    function fsInfo(force) {
      const key = lang + fs2.sel; if (key === fs2.infoKey && !force) return; fs2.infoKey = key;
      const f = FEST[fs2.sel], d = L({ vi: f.vi, en: f.en });
      infoBox($('info_fest'), { emo: f.e[0], title: d[0], sub: T(`Ngày ${f.d} tháng ${f.m} âm lịch`, `Lunar day ${f.d}, month ${f.m}`), rows: [[T('Là ngày gì?', 'What is it?'), d[1]], [T('Mọi người làm gì?', 'What people do'), d[2]]], notes: [['fun', '✨ ' + d[3]], ['tip', T('📅 Lịch âm tính theo Mặt Trăng: ngày rằm (15) trăng tròn, mùng 1 không thấy trăng. Mỗi năm, ngày âm lịch rơi vào ngày dương lịch khác nhau.', '📅 The lunar calendar follows the Moon: full moon on the 15th, no moon on the 1st. Each year lunar dates fall on different solar dates.')]] });
      setText('hud_fest', `${f.e[0]} ${d[0]} – ${T(`${f.d}/${f.m} âm lịch`, `lunar ${f.d}/${f.m}`)}`);
    }
    $('fsPrev').onclick = () => { cancelSpeech(); fs2.sel = (fs2.sel + FEST.length - 1) % FEST.length; fsInfo(true); };
    $('fsNext').onclick = () => { cancelSpeech(); fs2.sel = (fs2.sel + 1) % FEST.length; fsInfo(true); };
    // trò chơi gói bánh chưng
    const BANH = [
      { e: '🍃', vi: 'Rửa sạch lá dong, lau khô', en: 'Wash and dry the dong leaves' },
      { e: '🟩', vi: 'Lót lá dong vào khuôn vuông', en: 'Line the square mould with leaves' },
      { e: '⚪', vi: 'Rải một lớp gạo nếp', en: 'Add a layer of sticky rice' },
      { e: '🟡', vi: 'Rải một lớp đỗ xanh', en: 'Add a layer of mung beans' },
      { e: '🥓', vi: 'Đặt thịt lợn vào giữa', en: 'Put pork in the middle' },
      { e: '🟨', vi: 'Phủ đỗ xanh rồi gạo nếp lên trên', en: 'Cover with beans, then rice' },
      { e: '🎀', vi: 'Gói kín lá, buộc lạt thật chặt', en: 'Fold the leaves and tie with bamboo strings' },
      { e: '🔥', vi: 'Luộc bánh khoảng 8 – 12 tiếng', en: 'Boil for about 8 – 12 hours' }
    ];
    let bc = { order: [], done: 0, wrong: -1, wrongT: 0 };
    const bcC = mk('c_banh', (w) => clamp(w * .5, 140, 190));
    function bcShuffle() { bc.order = BANH.map((_, i) => i).sort(() => Math.random() - .5); bc.done = 0; bc.wrong = -1; bcRender(); }
    function drawBanh(dt) {
      const { w, h, ctx } = bcC; if (!w) return;
      ctx.fillStyle = '#fffbeb'; ctx.fillRect(0, 0, w, h);
      const s = Math.min(w * .5, h * .78), x0 = w / 2 - s / 2, y0 = h / 2 - s / 2 + 4;
      if (bc.done >= 8) { const g = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, s); g.addColorStop(0, 'rgba(250,204,21,.4)'); g.addColorStop(1, 'rgba(250,204,21,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }
      if (bc.done >= 2) { ctx.fillStyle = bc.done >= 8 ? '#4d7c0f' : '#65a30d'; rr(ctx, x0, y0, s, s, 6); ctx.fill(); }
      else { ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3; ctx.setLineDash([5, 4]); ctx.strokeRect(x0, y0, s, s); ctx.setLineDash([]); }
      if (bc.done >= 1 && bc.done < 2) emo(ctx, '🍃', w / 2, h / 2, s * .5);
      if (bc.done < 7) {
        const ins = s * .86, ix = w / 2 - ins / 2, iy = y0 + s * .07;
        const lay = (from, to, col) => { ctx.fillStyle = col; ctx.fillRect(ix, iy + ins * (1 - to), ins, ins * (to - from)); };
        if (bc.done >= 3) lay(0, .25, '#f8fafc'); if (bc.done >= 4) lay(.25, .4, '#facc15');
        if (bc.done >= 5) { ctx.fillStyle = '#fca5a5'; rr(ctx, w / 2 - ins * .22, iy + ins * .45, ins * .44, ins * .14, 4); ctx.fill(); ctx.fillStyle = '#fef2f2'; ctx.fillRect(w / 2 - ins * .22, iy + ins * .5, ins * .44, ins * .03); }
        if (bc.done >= 6) { lay(.6, .75, '#facc15'); lay(.75, 1, '#f8fafc'); }
      }
      if (bc.done >= 7) { ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = 3; for (const k of [.33, .67]) { ctx.beginPath(); ctx.moveTo(x0 + s * k, y0); ctx.lineTo(x0 + s * k, y0 + s); ctx.moveTo(x0, y0 + s * k); ctx.lineTo(x0 + s, y0 + s * k); ctx.stroke(); } }
      if (bc.done === 8 && !reduceMotion) for (let k = 0; k < 3; k++) { const t = (clock * .5 + k / 3) % 1; ctx.fillStyle = `rgba(203,213,225,${.6 * (1 - t)})`; ctx.beginPath(); ctx.arc(w / 2 + (k - 1) * s * .3, y0 - t * h * .3, 6 + t * 8, 0, TAU); ctx.fill(); }
      if (bc.wrongT > 0) { bc.wrongT -= dt; }
    }
    function bcRender() {
      $('banhBox').innerHTML = `<p class="muted" style="margin:0">${bc.done >= 8 ? T('🎉 Chiếc bánh chưng vuông vức đã chín thơm! Em giỏi lắm.', '🎉 Your square banh chung is cooked! Well done.') : T(`Bấm các bước theo đúng thứ tự (${bc.done}/8):`, `Tap the steps in the right order (${bc.done}/8):`)}</p>
        <div class="opt-col">${bc.order.map((i) => `<button type="button" class="soft-btn${i < bc.done ? ' done' : ''}${i === bc.wrong ? ' bad' : ''}" data-bc="${i}" ${i < bc.done ? 'disabled' : ''}>${i < bc.done ? `✅ ${i + 1}.` : BANH[i].e} <span></span></button>`).join('')}</div>
        ${bc.done >= 8 ? `<button id="bcAgain" class="btn main" type="button">${T('Gói chiếc nữa', 'Wrap another')}</button>` : ''}`;
      $('banhBox').querySelectorAll('[data-bc]').forEach((b) => { b.querySelector('span').textContent = L(BANH[+b.dataset.bc]); });
      const ag = $('bcAgain'); if (ag) ag.onclick = bcShuffle;
    }
    $('banhBox').addEventListener('click', (e) => { const b = e.target.closest('[data-bc]'); if (!b) return; const i = +b.dataset.bc; if (i === bc.done) { bc.done++; bc.wrong = -1; } else { bc.wrong = i; bc.wrongT = 1; } bcRender(); });
    TABS.fest = { frame(dt) { drawFest(dt); drawBanh(dt); }, refresh() { fs2.infoKey = ''; fsInfo(true); if (!bc.order.length) bcShuffle(); else bcRender(); } };
    QUIZZES.push(makeQuiz($('quiz_fest'), {
      vi: [
        { q: 'Giỗ Tổ Hùng Vương vào ngày nào âm lịch?', a: ['10 tháng 3', '15 tháng 8', '1 tháng 1', '23 tháng 12'], why: '"Nhớ ngày Giỗ Tổ mùng mười tháng ba."' },
        { q: 'Tết Trung thu, thiếu nhi thường làm gì?', a: ['Rước đèn ông sao, phá cỗ', 'Thả cá chép', 'Ăn rượu nếp', 'Gói bánh chưng'], why: 'Trung thu là Tết của thiếu nhi.' },
        { q: 'Ngày 23 tháng Chạp, người ta thả con gì?', a: ['Cá chép', 'Chim bồ câu', 'Rùa', 'Bướm'], why: 'Để tiễn Táo Quân về trời.' },
        { q: 'Bánh chưng hình vuông tượng trưng cho gì?', a: ['Đất', 'Trời', 'Mặt Trăng', 'Ngôi sao'], why: 'Theo truyền thuyết Lang Liêu, bánh chưng vuông tượng trưng cho đất.' },
        { q: 'Tết Đoan Ngọ (5/5) còn gọi là gì?', a: ['Tết giết sâu bọ', 'Tết thiếu nhi', 'Tết trồng cây', 'Tết Hàn thực'], why: 'Người ta ăn rượu nếp, quả chua để "giết sâu bọ".' },
        { q: 'Vì sao ngày rằm (15 âm lịch) trăng thường tròn?', a: ['Vì lịch âm tính theo Mặt Trăng', 'Vì trời trong', 'Vì có lễ hội', 'Ngẫu nhiên'], why: 'Mỗi tháng âm lịch là một vòng tuần trăng.' }
      ],
      en: [
        { q: 'When is the Hung Kings’ Commemoration?', a: ['Lunar 10/3', 'Lunar 15/8', 'Lunar 1/1', 'Lunar 23/12'], why: '“Remember the 10th day of the 3rd month.”' },
        { q: 'At Mid-Autumn, children…', a: ['Parade star lanterns and share a feast', 'Release carp', 'Eat sticky-rice wine', 'Wrap banh chung'], why: 'Mid-Autumn is the children’s festival.' },
        { q: 'On the 23rd of the 12th month people release…', a: ['Carp', 'Doves', 'Turtles', 'Butterflies'], why: 'To carry the Kitchen Gods to heaven.' },
        { q: 'What does square banh chung represent?', a: ['The Earth', 'The sky', 'The Moon', 'A star'], why: 'From the legend of Lang Lieu.' },
        { q: 'Doan Ngo (5/5) is also called…', a: ['Killing-insects day', 'Children’s Day', 'Tree-planting Day', 'Cold Food Day'], why: 'People eat sour fruit and sticky-rice wine to “kill the bugs”.' },
        { q: 'Why is the moon full on the 15th lunar day?', a: ['The lunar calendar follows the Moon', 'Clear skies', 'Festivals', 'Chance'], why: 'Each lunar month is one cycle of the Moon.' }
      ]
    }));

    /* =====================================================================
       3. LÀNG GỐM BÁT TRÀNG: chuốt, vẽ, tráng men, nung
       ===================================================================== */
    const CSTEPS = [
      { vi: ['Nhào đất', 'Đất sét được lọc kỹ, nhào thật nhuyễn cho hết bọt khí, để khi nung không bị nứt vỡ.'], en: ['Knead the clay', 'Clay is filtered and kneaded well to push out air bubbles, so it won’t crack in the kiln.'] },
      { vi: ['Chuốt gốm trên bàn xoay', 'Đặt đất lên bàn xoay, dùng tay vuốt cho đất vươn lên thành dáng bình. Kéo các nút tròn để tạo dáng!'], en: ['Throw on the wheel', 'The clay spins on the wheel while hands pull it up into a vase. Drag the round handles to shape it!'] },
      { vi: ['Phơi khô', 'Bình mộc được phơi ở chỗ thoáng mát vài ngày cho khô đều.'], en: ['Dry it', 'The raw vase dries for a few days in a shady, airy place.'] },
      { vi: ['Vẽ hoa văn, tráng men', 'Nghệ nhân vẽ hoa văn bằng bút lông rồi nhúng bình vào men. Chọn hoa văn và men bên dưới!'], en: ['Paint and glaze', 'Artisans paint patterns with a brush, then dip the vase in glaze. Choose a pattern and glaze below!'] },
      { vi: ['Nung trong lò', 'Bình được nung ở khoảng 1.200 – 1.300°C. Lửa biến đất mềm thành gốm cứng, men chảy ra bóng loáng.'], en: ['Fire in the kiln', 'The vase is fired at about 1,200 – 1,300°C. The heat turns soft clay into hard ceramic and melts the glaze to a shine.'] }
    ];
    let pt = { step: 1, prof: [.55, .62, .7, .52, .3, .26, .34], spin: 0, spinning: true, glaze: 'blue', pat: 'lotus', temp: 20, firing: false, fired: false, drag: -1, knead: 0, made: 0, infoKey: '' };
    const ptC = mk('c_craft', (w) => clamp(w * .62, 300, 500));
    function ptGeom() { const { w, h } = ptC, base = h * .78, H = h * .58, W = Math.min(w * .26, h * .33), cx = w * .42; return { w, h, base, H, W, cx, ys: pt.prof.map((_, i) => base - H * i / (pt.prof.length - 1)) }; }
    function vasePath(ctx, g, sx = 1) {
      const n = pt.prof.length, P = pt.prof.map((r, i) => ({ x: g.cx + r * g.W * sx, y: g.ys[i] }));
      ctx.moveTo(g.cx, g.base); ctx.lineTo(P[0].x, P[0].y);
      for (let i = 1; i < n - 1; i++) { const mx = (P[i].x + P[i + 1].x) / 2, my = (P[i].y + P[i + 1].y) / 2; ctx.quadraticCurveTo(P[i].x, P[i].y, mx, my); }
      ctx.lineTo(P[n - 1].x, P[n - 1].y);
    }
    const radAt = (g, y) => { const n = pt.prof.length, t = clamp((g.base - y) / g.H * (n - 1), 0, n - 1), i = Math.min(n - 2, Math.floor(t)); return lerp(pt.prof[i], pt.prof[i + 1], t - i) * g.W; };
    function bodyColor() { if (pt.fired) return pt.glaze === 'blue' ? ['#f8fafc', '#cbd5e1'] : pt.glaze === 'crack' ? ['#fef3c7', '#d6c39a'] : ['#92400e', '#451a03']; if (pt.step >= 3) return pt.step >= 4 ? ['#e7e5e4', '#a8a29e'] : ['#d6c7a8', '#a8916a']; return ['#b07d4f', '#7c4a24']; }
    function drawCraft(dt) {
      const g = ptGeom(), { w, h } = g, ctx = ptC.ctx; if (!w) return;
      if (pt.spinning && !pt.fired && pt.step <= 2) pt.spin += dt * 6;
      if (pt.firing) { pt.temp = Math.min(1250, pt.temp + dt * 260); if (pt.temp >= 1250) { pt.firing = false; pt.fired = true; pt.made++; ptInfo(true); ptRender(); } }
      const bg = ctx.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#fff7ed'); bg.addColorStop(1, '#fed7aa'); ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
      // lò nung phía sau khi ở bước 5
      if (pt.step === 4) {
        const kx = g.cx, ky = g.base; ctx.fillStyle = '#9a3412'; ctx.beginPath(); ctx.moveTo(kx - g.W * 2.1, ky + 10); ctx.lineTo(kx - g.W * 2.1, ky - g.H * .9); ctx.quadraticCurveTo(kx, ky - g.H * 1.55, kx + g.W * 2.1, ky - g.H * .9); ctx.lineTo(kx + g.W * 2.1, ky + 10); ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 1; for (let r = 0; r < 10; r++) { ctx.beginPath(); ctx.moveTo(kx - g.W * 2.1, ky - r * g.H * .1); ctx.lineTo(kx + g.W * 2.1, ky - r * g.H * .1); ctx.stroke(); }
        const heat = clamp((pt.temp - 20) / 1230, 0, 1);
        ctx.fillStyle = mix('#1c1917', '#fb923c', pt.fired ? .2 : heat); ctx.beginPath(); ctx.moveTo(kx - g.W * 1.5, ky + 10); ctx.lineTo(kx - g.W * 1.5, ky - g.H * .85); ctx.quadraticCurveTo(kx, ky - g.H * 1.3, kx + g.W * 1.5, ky - g.H * .85); ctx.lineTo(kx + g.W * 1.5, ky + 10); ctx.fill();
        if (pt.firing && !reduceMotion) for (let k = 0; k < 14; k++) { const fx = kx + (k - 7) * g.W * .2, fh = (20 + Math.sin(clock * 12 + k) * 10) * (.5 + heat); ctx.fillStyle = k % 2 ? 'rgba(250,204,21,.85)' : 'rgba(239,68,68,.8)'; ctx.beginPath(); ctx.moveTo(fx - 8, ky + 8); ctx.quadraticCurveTo(fx, ky - fh * 2, fx + 8, ky + 8); ctx.fill(); }
      }
      // bàn xoay
      ctx.fillStyle = '#57534e'; ctx.beginPath(); ctx.ellipse(g.cx, g.base + 8, g.W * 1.3, 14, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#78716c'; ctx.beginPath(); ctx.ellipse(g.cx, g.base + 4, g.W * 1.3, 12, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; for (let k = 0; k < 6; k++) { const a = k / 6 * TAU + pt.spin; ctx.beginPath(); ctx.moveTo(g.cx, g.base + 4); ctx.lineTo(g.cx + Math.cos(a) * g.W * 1.25, g.base + 4 + Math.sin(a) * 10); ctx.stroke(); }
      if (pt.step === 0) {
        const sq = 1 + Math.sin(pt.knead * 6) * .12; ctx.fillStyle = '#b07d4f'; ctx.beginPath(); ctx.ellipse(g.cx, g.base - g.W * .45 * sq, g.W * .8 / sq, g.W * .5 * sq, 0, 0, TAU); ctx.fill();
        emo(ctx, '👐', g.cx, g.base - g.W * 1.2 - Math.abs(Math.sin(pt.knead * 6)) * 12, 34);
        if (!reduceMotion) pt.knead += dt;
      } else {
        // thân bình
        const [c1, c2] = bodyColor();
        const grd = ctx.createLinearGradient(g.cx - g.W, 0, g.cx + g.W, 0); grd.addColorStop(0, c2); grd.addColorStop(.35, c1); grd.addColorStop(.55, c1); grd.addColorStop(1, c2);
        ctx.save(); ctx.beginPath(); vasePath(ctx, g, 1); const n = pt.prof.length; ctx.lineTo(g.cx - pt.prof[n - 1] * g.W, g.ys[n - 1]);
        const Pm = pt.prof.map((r, i) => ({ x: g.cx - r * g.W, y: g.ys[i] }));
        for (let i = n - 2; i >= 1; i--) { const mx = (Pm[i].x + Pm[i - 1].x) / 2, my = (Pm[i].y + Pm[i - 1].y) / 2; ctx.quadraticCurveTo(Pm[i].x, Pm[i].y, mx, my); }
        ctx.lineTo(Pm[0].x, Pm[0].y); ctx.lineTo(g.cx, g.base); ctx.closePath();
        ctx.fillStyle = grd; ctx.fill(); ctx.clip();
        // vạch xoay khi chuốt
        if (pt.step <= 2 && !pt.fired) { ctx.strokeStyle = 'rgba(80,40,10,.18)'; ctx.lineWidth = 1.5; for (let y = g.base - 6; y > g.base - g.H; y -= 7) { ctx.beginPath(); ctx.moveTo(g.cx - g.W * 1.2, y + Math.sin(pt.spin + y) * 1.5); ctx.lineTo(g.cx + g.W * 1.2, y + Math.sin(pt.spin + y) * 1.5); ctx.stroke(); } }
        // hoa văn
        if (pt.step >= 3 && pt.pat !== 'none') {
          const col = pt.glaze === 'brown' && pt.fired ? '#fde68a' : pt.fired ? '#1e3a8a' : '#334155';
          const bands = pt.pat === 'wave' ? [.22, .32] : [.35];
          for (const bf of bands) {
            const yb = g.base - g.H * bf, rb = radAt(g, yb), N = 8;
            for (let k = 0; k < N; k++) { const a = k / N * TAU + pt.spin * .4; if (Math.cos(a) <= 0) continue; const x = g.cx + rb * Math.sin(a), sx = Math.cos(a), s = rb * .28; ctx.save(); ctx.translate(x, yb); ctx.scale(sx, 1); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2;
              if (pt.pat === 'lotus') { for (const r of [-.5, 0, .5]) { ctx.beginPath(); ctx.ellipse(r * s * .55, -s * .2 - (r === 0 ? s * .1 : 0), s * .22, s * .45, r * .6, 0, TAU); ctx.globalAlpha = .75; ctx.fill(); ctx.globalAlpha = 1; } ctx.beginPath(); ctx.moveTo(-s * .5, s * .25); ctx.quadraticCurveTo(0, s * .5, s * .5, s * .25); ctx.stroke(); }
              else if (pt.pat === 'wave') { ctx.beginPath(); ctx.arc(-s * .3, 0, s * .3, Math.PI, TAU); ctx.arc(s * .3, 0, s * .3, Math.PI, TAU); ctx.stroke(); }
              else { ctx.beginPath(); for (let t = 0; t < 5; t += .2) { const rr3 = s * (.5 - t * .09); ctx.lineTo(Math.cos(t * 2) * rr3, Math.sin(t * 2) * rr3); } ctx.stroke(); }
              ctx.restore(); }
          }
          ctx.strokeStyle = col; ctx.lineWidth = 2; for (const bf of [.12, .7]) { const yb = g.base - g.H * bf, rb = radAt(g, yb); ctx.beginPath(); ctx.ellipse(g.cx, yb, rb, rb * .08, 0, 0, Math.PI); ctx.stroke(); }
        }
        if (pt.fired && pt.glaze === 'crack') { ctx.strokeStyle = 'rgba(120,90,40,.45)'; ctx.lineWidth = 1; for (let k = 0; k < 40; k++) { const x = g.cx + (Math.sin(k * 12.9) * .9) * g.W, y = g.base - Math.abs(Math.sin(k * 7.7)) * g.H; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(k) * 12, y + Math.cos(k * 3) * 10); ctx.lineTo(x + Math.sin(k) * 20, y - 6); ctx.stroke(); } }
        if (pt.fired) { const sh = ctx.createLinearGradient(g.cx - g.W, 0, g.cx + g.W, 0); sh.addColorStop(.25, 'rgba(255,255,255,0)'); sh.addColorStop(.32, 'rgba(255,255,255,.55)'); sh.addColorStop(.4, 'rgba(255,255,255,0)'); ctx.fillStyle = sh; ctx.fillRect(g.cx - g.W * 1.2, g.base - g.H, g.W * 2.4, g.H); }
        ctx.restore();
        // miệng bình
        const top = pt.prof[pt.prof.length - 1] * g.W, ty = g.ys[pt.prof.length - 1];
        ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(g.cx, ty, top, top * .18, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = bodyColor()[1]; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(g.cx, ty, top, top * .18, 0, 0, TAU); ctx.stroke();
        // nút kéo tạo dáng
        if (pt.step === 1) pt.prof.forEach((r, i) => { const x = g.cx + r * g.W, y = g.ys[i]; ctx.fillStyle = i === pt.drag ? '#ec4899' : '#fff'; ctx.strokeStyle = '#be185d'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x + 14, y, 9, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#be185d'; textLight(ctx, '↔', x + 14, y, '#be185d', 11, 'center', 900); });
      }
      // nhiệt kế lò
      if (pt.step === 4) { const tx = w - 40, t0 = h * .15, t1 = h * .8, k = clamp(pt.temp / 1300, 0, 1); ctx.fillStyle = '#e5e7eb'; rr(ctx, tx - 9, t0, 18, t1 - t0, 9); ctx.fill(); ctx.fillStyle = mix('#facc15', '#dc2626', k); rr(ctx, tx - 9, t1 - (t1 - t0) * k, 18, (t1 - t0) * k, 9); ctx.fill(); textLight(ctx, `${Math.round(pt.temp)}°C`, tx, t1 + 16, '#7c2d12', 12, 'center', 900); }
      if (pt.fired) bubble(ctx, T('🎉 Bình gốm của em đã hoàn thành!', '🎉 Your vase is finished!'), g.cx, h * .08, 14, '#fff', '#15803d');
      textLight(ctx, T(`Đã làm: ${pt.made} bình`, `Vases made: ${pt.made}`), w - 10, h - 10, '#9a3412', 11, 'right', 900);
    }
    ptC.c.addEventListener('pointerdown', (e) => { if (pt.step !== 1) return; const g = ptGeom(), p = localPoint(ptC.c, e); let best = -1, bd = 26; pt.prof.forEach((r, i) => { const d = Math.hypot(g.cx + r * g.W + 14 - p.x, g.ys[i] - p.y); if (d < bd) { bd = d; best = i; } }); if (best >= 0) { pt.drag = best; try { ptC.c.setPointerCapture(e.pointerId); } catch (_) {} } });
    ptC.c.addEventListener('pointermove', (e) => { if (pt.drag < 0) return; const g = ptGeom(), p = localPoint(ptC.c, e); pt.prof[pt.drag] = clamp((p.x - 14 - g.cx) / g.W, .14, 1); });
    const ptUp = () => { pt.drag = -1; }; ptC.c.addEventListener('pointerup', ptUp); ptC.c.addEventListener('pointercancel', ptUp);
    function ptSet(s) { cancelSpeech(); pt.step = s; if (s < 4) { pt.fired = false; pt.firing = false; pt.temp = 20; } ptRender(); ptInfo(true); }
    function ptRender() {
      root.querySelectorAll('#ptSteps button').forEach((b, i) => { b.setAttribute('aria-pressed', String(i === pt.step)); b.querySelector('span').textContent = L(CSTEPS[i])[0]; });
      $('ptDeco').classList.toggle('hidden', pt.step !== 3);
      $('ptFire').classList.toggle('hidden', pt.step !== 4 || pt.fired || pt.firing);
      $('ptNew').classList.toggle('hidden', !pt.fired);
    }
    $('ptSteps').innerHTML = CSTEPS.map((_, i) => `<button type="button" data-s="${i}" aria-pressed="false"><b>${i + 1}</b><span></span></button>`).join('');
    $('ptSteps').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (b) ptSet(+b.dataset.s); });
    root.querySelectorAll('[data-glaze]').forEach((b) => b.addEventListener('click', () => { pt.glaze = b.dataset.glaze; pressGroup('[data-glaze]', 'glaze', pt.glaze); }));
    root.querySelectorAll('[data-pat]').forEach((b) => b.addEventListener('click', () => { pt.pat = b.dataset.pat; pressGroup('[data-pat]', 'pat', pt.pat); }));
    $('ptFire').onclick = () => { cancelSpeech(); pt.firing = true; pt.temp = 20; ptRender(); };
    $('ptNew').onclick = () => { pt.prof = [.5 + rand(-.1, .1), .6, .66, .5, .3, .24, .32].map((v) => clamp(v + rand(-.06, .06), .15, .95)); ptSet(0); };
    function ptInfo(force) {
      const key = lang + pt.step + pt.fired; if (key === pt.infoKey && !force) return; pt.infoKey = key;
      const d = L(CSTEPS[pt.step]);
      infoBox($('info_craft'), {
        emo: '🏺', title: pt.fired ? T('Hoàn thành!', 'Finished!') : d[0], sub: T(`Bước ${pt.step + 1}/5`, `Step ${pt.step + 1}/5`),
        rows: [[T('Làm thế nào?', 'How?'), d[1]], [T('Làng gốm Bát Tràng', 'Bat Trang village'), T('Làng gốm nổi tiếng bên sông Hồng, gần Hà Nội, đã có lịch sử hàng trăm năm, hình thành từ khoảng thế kỷ 14 – 15.', 'A famous pottery village by the Red River near Hanoi, hundreds of years old, dating from around the 14th – 15th centuries.')]],
        notes: [['fun', T('✨ Người Chăm ở làng Bàu Trúc (Ninh Thuận cũ) làm gốm không dùng bàn xoay: người thợ tự đi vòng quanh khối đất để nặn. Nghệ thuật này được UNESCO ghi danh năm 2022.', '✨ Cham potters at Bau Truc village make pots without a wheel: the potter walks around the clay instead. UNESCO listed this craft in 2022.')]]
      });
      setText('hud_craft', `🏺 ${T('Bước', 'Step')} ${pt.step + 1}: ${pt.fired ? T('Hoàn thành!', 'Finished!') : d[0]}`);
    }
    TABS.craft = { frame(dt) { drawCraft(dt); }, refresh() { ptRender(); pt.infoKey = ''; ptInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_craft'), {
      vi: [
        { q: 'Làng gốm Bát Tràng ở gần thành phố nào?', a: ['Hà Nội', 'Đà Lạt', 'Cần Thơ', 'Huế'], why: 'Bát Tràng nằm bên sông Hồng, thuộc Hà Nội.' },
        { q: 'Vì sao phải nhào đất thật kỹ?', a: ['Để hết bọt khí, khi nung không nứt', 'Cho đất thơm', 'Cho đất đổi màu', 'Không cần nhào'], why: 'Bọt khí nở ra khi nung làm bình nứt vỡ.' },
        { q: 'Gốm được nung ở khoảng bao nhiêu độ?', a: ['1.200 – 1.300°C', '100°C', '37°C', '10.000°C'], why: 'Nhiệt độ cao biến đất sét thành gốm cứng.' },
        { q: 'Men gốm có tác dụng gì?', a: ['Làm bình bóng đẹp, không thấm nước', 'Làm bình nặng hơn', 'Làm bình mềm', 'Không có tác dụng'], why: 'Men nóng chảy phủ lên bình một lớp như thủy tinh.' },
        { q: 'Người Chăm ở Bàu Trúc làm gốm có gì đặc biệt?', a: ['Nặn bằng tay, không dùng bàn xoay', 'Dùng máy in 3D', 'Làm bằng nhựa', 'Không nung'], why: 'Người thợ đi vòng quanh khối đất để nặn.' }
      ],
      en: [
        { q: 'Bat Trang pottery village is near…', a: ['Hanoi', 'Da Lat', 'Can Tho', 'Hue'], why: 'Bat Trang is on the Red River in Hanoi.' },
        { q: 'Why knead the clay well?', a: ['To remove air bubbles so it won’t crack', 'To make it smell nice', 'To change its colour', 'No need'], why: 'Air bubbles expand in the kiln and crack the pot.' },
        { q: 'About how hot is the kiln?', a: ['1,200 – 1,300°C', '100°C', '37°C', '10,000°C'], why: 'High heat turns clay into hard ceramic.' },
        { q: 'What does glaze do?', a: ['Makes it shiny and waterproof', 'Makes it heavier', 'Makes it soft', 'Nothing'], why: 'Melted glaze coats the pot like glass.' },
        { q: 'What’s special about Cham pottery at Bau Truc?', a: ['Shaped by hand without a wheel', '3D printed', 'Made of plastic', 'Never fired'], why: 'The potter walks around the clay to shape it.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'her';
    root.querySelectorAll('.culture-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.culture-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('v-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.culture-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.culture-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.culture-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
