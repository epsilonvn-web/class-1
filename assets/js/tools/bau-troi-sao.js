/* Epsilon Edu - Tool: Bau troi sao va cac chom sao (Stars and constellations): bau troi dem, noi chom sao, tim Sao Bac Cuc
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.starrySky = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "starrySky";
  let activeCleanup = null;

  const CSS = `
.sky-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.sky-tool *{box-sizing:border-box}.sky-tool button,.sky-tool input{font:inherit}.sky-tool button{cursor:pointer}.sky-tool .hidden{display:none!important}
.sky-tool button:focus-visible,.sky-tool canvas:focus-visible,.sky-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.sky-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.sky-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.sky-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.sky-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.sky-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.sky-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.sky-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.sky-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.sky-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.sky-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.sky-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.sky-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.sky-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.sky-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.sky-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.sky-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.sky-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.sky-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.sky-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.sky-panel{width:100%}.sky-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.sky-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.sky-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.sky-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.sky-tool .card-head.compact{margin-bottom:9px}
.sky-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.sky-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.sky-tool .btn,.sky-tool .soft-btn,.sky-tool .segmented button,.sky-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.sky-tool .btn:hover,.sky-tool .soft-btn:hover,.sky-tool .segmented button:hover,.sky-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.sky-tool .btn{padding:0 12px}.sky-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.sky-tool .segmented{display:flex;gap:7px;margin:0}.sky-tool .segmented button{padding:0 13px}
.sky-tool .segmented button[aria-pressed="true"],.sky-tool .soft-btn[aria-pressed="true"],.sky-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.sky-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.sky-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.sky-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.sky-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.sky-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.sky-tool .range-control input{width:100%;accent-color:#8b5cf6}.sky-tool .range-control b{color:#7c3aed;font-size:13px}
.sky-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.sky-tool .soft-btn{padding:0 12px}
.sky-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.sky-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.sky-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.sky-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.sky-tool .info-title{display:flex;align-items:center;gap:10px}.sky-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.sky-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.sky-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.sky-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.sky-tool .facts{display:grid;gap:6px;margin-top:10px}.sky-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.sky-tool .facts b{color:#7c3aed;font-size:13.5px}.sky-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.sky-tool .fun,.sky-tool .warn,.sky-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.sky-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.sky-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.sky-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.sky-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.sky-tool .state-big.up{color:#0f766e}.sky-tool .state-big.down{color:#b45309}
.sky-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.sky-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.sky-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.sky-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.sky-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.sky-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.sky-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.sky-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.sky-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.sky-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.sky-tool .qopt:hover{filter:brightness(.985)}.sky-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.sky-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.sky-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.sky-tool .qfb,.sky-tool .score{font-size:13px;font-weight:900}.sky-tool .qfb.ok{color:#15803d}.sky-tool .qfb.no{color:#be123c}.sky-tool .score{color:#7c3aed}
.sky-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.sky-grid{grid-template-columns:1fr;align-items:start}.sky-side{grid-template-rows:auto auto;height:auto}.sky-tool .control-grid{grid-template-columns:1fr}.sky-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.sky-hero{flex-wrap:wrap;padding:12px}.sky-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.sky-tabs{grid-template-columns:1fr}.sky-tabs .tab{min-height:40px}.sky-card{padding:11px;border-radius:18px}.sky-tool .card-head{align-items:flex-start;flex-direction:column}.sky-tool .head-actions{width:100%;justify-content:space-between}.sky-tool .head-actions .segmented{flex:1;min-width:0}.sky-tool .head-actions .segmented button{flex:1;padding:0 8px}.sky-tool .qopts{grid-template-columns:1fr}.sky-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.sky-tool *{transition:none!important}}

.sky-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.sky-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.sky-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.sky-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.sky-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.sky-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.sky-tool .checklist{display:grid;gap:6px;margin-top:10px}
.sky-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.sky-tool .checklist .ok{color:#15803d}.sky-tool .checklist .no{color:#be123c}.sky-tool .checklist .wait{color:#94a3b8}
.sky-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.sky-tool .process span{flex:1}.sky-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.sky-tool .process .on{color:#0284c7}.sky-tool .process i.on{color:#ec4899}
@media(max-width:640px){.sky-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.sky-tool .slider-pair{grid-template-columns:1fr}}

.sky-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.sky-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.sky-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.sky-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.sky-tool .pulse-box{display:grid;gap:9px;margin-bottom:4px}
.sky-tool .con-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
.sky-tool .con-chip{min-height:44px;font-size:20px;padding:0}
.sky-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.sky-tool .canvas-wrap{background:#050816}
.sky-tool canvas{cursor:grab}

.sky-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.sky-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="sky-tool" data-tool-root>
  <div class="sky-hero">
    <div class="sky-hero-icon" aria-hidden="true">🌌</div>
    <div>
      <p class="sky-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="sky-lead" data-t="lead"></p>
    </div>
    <div class="sky-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="kAudioNotice" class="sky-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="sky-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="sky" data-t="tab_sky"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="conn" data-t="tab_conn"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="polar" data-t="tab_polar"></button>
  </div>
  <section id="k-sky" class="sky-panel" role="tabpanel">
    <div class="sky-grid">
      <article class="sky-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_sky"></h2></div>
          <div class="head-actions"><button id="skPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_sky" role="img" data-ta="cv_sky"></canvas></div>
        <p id="hud_sky" class="hud" aria-live="polite"></p>
        <div class="cond-row"><div class="segmented" role="group" data-ta="dirL"><button type="button" data-dir="0" aria-pressed="false" data-t="dN"></button><button type="button" data-dir="90" aria-pressed="false" data-t="dE"></button><button type="button" data-dir="180" aria-pressed="true" data-t="dS"></button><button type="button" data-dir="270" aria-pressed="false" data-t="dW"></button></div><div class="segmented" role="group" data-ta="placeL"><button type="button" data-place="hn" aria-pressed="true" data-t="pHN"></button><button type="button" data-place="hue" aria-pressed="false" data-t="pHue"></button><button type="button" data-place="hcm" aria-pressed="false" data-t="pHCM"></button></div></div>
        <div class="slider-pair">
          <label class="range-control"><span data-t="hourL"></span><input id="skHour" type="range" min="18" max="30" value="20.5" step="0.05"><b id="skHourTxt"></b></label>
          <label class="range-control"><span data-t="monthL"></span><input id="skMonth" type="range" min="1" max="12" value="10" step="1"><b id="skMonthTxt"></b></label>
        </div>
        <div class="toggle-row" style="justify-content:flex-start;margin-top:8px"><button id="skLines" class="soft-btn" type="button" aria-pressed="true" data-t="tLines"></button><button id="skNames" class="soft-btn" type="button" aria-pressed="true" data-t="tNames"></button><button id="skTrails" class="soft-btn" type="button" aria-pressed="false" data-t="tTrails"></button></div>
      </article>
      <div class="sky-side">
        <aside class="sky-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_sky"></span><h2 data-t="sh_sky"></h2></div></div>
          
          <div id="info_sky" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_sky" class="sky-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="k-conn" class="sky-panel hidden" role="tabpanel">
    <div class="sky-grid">
      <article class="sky-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_conn"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_conn" role="img" data-ta="cv_conn"></canvas></div>
        <p id="hud_conn" class="hud" aria-live="polite"></p>
      </article>
      <div class="sky-side">
        <aside class="sky-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_conn"></span><h2 data-t="sh_conn"></h2></div></div>
          <div id="connBox" class="pulse-box"></div>
          <div id="info_conn" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_conn" class="sky-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="k-polar" class="sky-panel hidden" role="tabpanel">
    <div class="sky-grid">
      <article class="sky-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_polar"></h2></div>
          <div class="head-actions"><button id="plTrails" class="soft-btn" type="button" aria-pressed="false" data-t="tTrails"></button><button id="plPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_polar" role="img" data-ta="cv_polar"></canvas></div>
        <p id="hud_polar" class="hud" aria-live="polite"></p>
        <div id="plSteps" class="stage-row" role="group" data-ta="stepsL"></div>
        <div class="cond-row"><div class="segmented" role="group" data-ta="placeL"><button type="button" data-pplace="hn" aria-pressed="true" data-t="pHN"></button><button type="button" data-pplace="hue" aria-pressed="false" data-t="pHue"></button><button type="button" data-pplace="hcm" aria-pressed="false" data-t="pHCM"></button></div></div>
        <label class="range-control"><span data-t="monthL"></span><input id="plMonth" type="range" min="1" max="12" value="4" step="1"><b id="plMonthTxt"></b></label>
      </article>
      <div class="sky-side">
        <aside class="sky-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_polar"></span><h2 data-t="sh_polar"></h2></div></div>
          
          <div id="info_polar" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_polar" class="sky-card quiz-card"></article>
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
    const audioNotice = $('kAudioNotice');
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
      title: ['Bầu trời sao và các chòm sao', 'Stars and Constellations'],
      lead: ['Xoay bầu trời đêm Việt Nam, nối các ngôi sao thành chòm sao, đi tìm Sao Bắc Cực và xem bầu trời quay theo từng giờ, từng tháng.', 'Turn Vietnam’s night sky, join stars into constellations, hunt for the North Star and watch the sky turn hour by hour, month by month.'],
      tabsLabel: ['Các hoạt động', 'Activities'], eyeSim: ['Bầu trời đêm', 'Night sky'],
      tab_sky: ['🌌 Bầu trời đêm', '🌌 Night sky'], h_sky: ['Kéo để xoay bầu trời', 'Drag to look around'],
      cv_sky: ['Bầu trời đêm nhìn từ Việt Nam với các ngôi sao và chòm sao. Kéo để xoay, bấm vào sao để tìm hiểu', 'The night sky from Vietnam with stars and constellations. Drag to look around, tap a star to learn about it'],
      se_sky: ['Em vừa chọn', 'You picked'], sh_sky: ['Ngôi sao, chòm sao', 'Star or constellation'],
      tab_conn: ['✨ Nối chòm sao', '✨ Join the stars'], h_conn: ['Nối các ngôi sao thành hình', 'Connect the stars into a shape'],
      cv_conn: ['Các ngôi sao của một chòm sao. Bấm lần lượt hai ngôi sao để nối chúng lại', 'The stars of a constellation. Tap two stars in turn to join them'],
      se_conn: ['Thử thách', 'Challenge'], sh_conn: ['Chòm sao này là gì?', 'Which constellation is this?'],
      tab_polar: ['🧭 Tìm Sao Bắc Cực', '🧭 Find the North Star'], h_polar: ['Ngôi sao chỉ đường', 'The guiding star'],
      cv_polar: ['Bầu trời phía Bắc, hướng dẫn từng bước tìm Sao Bắc Cực', 'The northern sky with step-by-step help to find the North Star'],
      se_polar: ['Từng bước', 'Step by step'], sh_polar: ['Làm sao tìm Sao Bắc Cực?', 'How to find it'],
      dirL: ['Hướng nhìn', 'Looking'], dN: ['⬆ Bắc', '⬆ North'], dE: ['➡ Đông', '➡ East'], dS: ['⬇ Nam', '⬇ South'], dW: ['⬅ Tây', '⬅ West'],
      hourL: ['Giờ trong đêm', 'Time of night'], monthL: ['Tháng', 'Month'], placeL: ['Nơi ngắm sao', 'Where you are'],
      pHN: ['Hà Nội', 'Hanoi'], pHue: ['Huế', 'Hue'], pHCM: ['TP. Hồ Chí Minh', 'Ho Chi Minh City'],
      tLines: ['✏️ Nét chòm sao', '✏️ Lines'], tNames: ['🏷️ Tên', '🏷️ Names'], tTrails: ['🌀 Vệt sao', '🌀 Star trails'],
      play: ['▶ Cho trời quay', '▶ Run time'], pause: ['⏸ Dừng', '⏸ Pause'], hint: ['💡 Gợi ý', '💡 Hint'], next: ['Chòm khác ▶', 'Next ▶'], stepsL: ['Các bước', 'Steps']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    const DEG = Math.PI / 180;

    /* ---------- danh mục sao thật (xích kinh: giờ, xích vĩ: độ, cấp sao) ---------- */
    const S = {
      dubhe: [11.06, 61.75, 1.8], merak: [11.03, 56.38, 2.4], phecda: [11.90, 53.69, 2.4], megrez: [12.26, 57.03, 3.3], alioth: [12.90, 55.96, 1.8], mizar: [13.40, 54.93, 2.2], alkaid: [13.79, 49.31, 1.9],
      polaris: [2.53, 89.26, 2.0], yildun: [17.54, 86.59, 4.4], epsumi: [16.77, 82.04, 4.2], zetumi: [15.73, 77.79, 4.3], kochab: [14.85, 74.16, 2.1], pherkad: [15.35, 71.83, 3.0], etaumi: [16.29, 75.76, 5.0],
      caph: [0.15, 59.15, 2.3], schedar: [0.68, 56.54, 2.2], gamcas: [0.95, 60.72, 2.2], ruchbah: [1.43, 60.24, 2.7], segin: [1.91, 63.67, 3.4],
      betelgeuse: [5.92, 7.41, .5, '#ffb070'], rigel: [5.24, -8.20, .1, '#cfe3ff'], bellatrix: [5.42, 6.35, 1.6, '#dbe8ff'], saiph: [5.80, -9.67, 2.1], alnitak: [5.68, -1.94, 1.8], alnilam: [5.60, -1.20, 1.7], mintaka: [5.53, -.30, 2.2], meissa: [5.59, 9.93, 3.4],
      sirius: [6.75, -16.72, -1.46, '#e8f0ff'], mirzam: [6.38, -17.96, 2.0], adhara: [6.98, -28.97, 1.5], wezen: [7.14, -26.39, 1.8], aludra: [7.40, -29.30, 2.4],
      aldebaran: [4.60, 16.51, .9, '#ffc080'], elnath: [5.44, 28.61, 1.7], zettau: [5.63, 21.14, 3.0], ain: [4.48, 19.18, 3.5], hyadum: [4.33, 15.63, 3.6],
      alcyone: [3.79, 24.11, 2.9, '#cfe0ff'], atlas: [3.82, 24.05, 3.6, '#cfe0ff'], electra: [3.75, 24.11, 3.7, '#cfe0ff'], maia: [3.76, 24.37, 3.9, '#cfe0ff'], merope: [3.77, 23.95, 4.1, '#cfe0ff'], taygeta: [3.75, 24.47, 4.3, '#cfe0ff'],
      castor: [7.58, 31.89, 1.6], pollux: [7.76, 28.03, 1.1, '#ffd9a0'], alhena: [6.63, 16.40, 1.9], mebsuta: [6.73, 25.13, 3.0], tejat: [6.38, 22.51, 2.9], wasat: [7.34, 21.98, 3.5],
      regulus: [10.14, 11.97, 1.4, '#dbe8ff'], denebola: [11.82, 14.57, 2.1], algieba: [10.33, 19.84, 2.0], zosma: [11.24, 20.52, 2.6], chertan: [11.24, 15.43, 3.3], adhafera: [10.28, 23.42, 3.4], rasalas: [9.76, 23.77, 3.0], etaleo: [10.12, 16.76, 3.5],
      vega: [18.62, 38.78, 0.0, '#e0ecff'], sheliak: [18.83, 33.36, 3.5], sulafat: [18.98, 32.69, 3.2], zetlyr: [18.75, 37.60, 4.3], dellyr: [18.91, 36.90, 4.3],
      deneb: [20.69, 45.28, 1.25], sadr: [20.37, 40.26, 2.2], gienah: [20.77, 33.97, 2.5], delcyg: [19.75, 45.13, 2.9], albireo: [19.51, 27.96, 3.1, '#ffd29a'],
      altair: [19.85, 8.87, .8], tarazed: [19.77, 10.61, 2.7, '#ffc890'], alshain: [19.92, 6.41, 3.7], delaql: [19.42, 3.11, 3.4], zetaql: [19.09, 13.86, 3.0], lamaql: [19.10, -4.88, 3.4],
      antares: [16.49, -26.43, 1.0, '#ff8a6a'], acrab: [16.09, -19.81, 2.6], dschubba: [16.01, -22.62, 2.3], pisco: [15.98, -26.11, 2.9], tausco: [16.60, -28.22, 2.8], epssco: [16.84, -34.29, 2.3], musco: [16.86, -38.05, 3.0], zetsco: [16.91, -42.36, 3.6], etasco: [17.20, -43.24, 3.3], sargas: [17.62, -43.0, 1.9], iotsco: [17.79, -40.13, 3.0], kapsco: [17.71, -39.03, 2.4], shaula: [17.56, -37.10, 1.6], lesath: [17.51, -37.30, 2.7],
      acrux: [12.44, -63.10, .8, '#d6e4ff'], mimosa: [12.80, -59.69, 1.3, '#d6e4ff'], gacrux: [12.52, -57.11, 1.6, '#ffb48a'], delcru: [12.25, -58.75, 2.8],
      arcturus: [14.26, 19.18, -.05, '#ffc27a'], capella: [5.28, 45.99, .08, '#fff1b0'], spica: [13.42, -11.16, 1.0, '#cfe0ff'], canopus: [6.40, -52.70, -.74], procyon: [7.66, 5.22, .34, '#fff7d6']
    };
    const STAR_INFO = {
      polaris: { vi: ['Sao Bắc Cực', 'Nằm gần như đúng phía trên cực Bắc của Trái Đất nên gần như đứng yên, cả bầu trời quay quanh nó. Ngày xưa người đi biển dùng nó để tìm hướng Bắc.'], en: ['Polaris, the North Star', 'It sits almost above Earth’s North Pole, so it barely moves while the whole sky turns around it. Sailors used it to find north.'] },
      sirius: { vi: ['Sao Thiên Lang (Sirius)', 'Ngôi sao sáng nhất bầu trời đêm, cách chúng ta khoảng 8,6 năm ánh sáng.'], en: ['Sirius', 'The brightest star in the night sky, about 8.6 light-years away.'] },
      vega: { vi: ['Sao Chức Nữ (Vega)', 'Trong chuyện Ngưu Lang – Chức Nữ, nàng Chức Nữ ở bên này dải Ngân Hà, chỉ gặp chàng Ngưu Lang vào ngày 7 tháng 7 âm lịch.'], en: ['Vega (the Weaver Girl)', 'In the tale of the Cowherd and the Weaver Girl, she lives across the Milky Way and meets him only on the 7th day of the 7th lunar month.'] },
      altair: { vi: ['Sao Ngưu Lang (Altair)', 'Chàng Ngưu Lang ở bờ bên kia Ngân Hà. Dân gian kể mưa ngâu tháng Bảy là nước mắt của hai người khi gặp nhau.'], en: ['Altair (the Cowherd)', 'He waits across the Milky Way. Folk tales say the 7th-month drizzle is their tears when they meet.'] },
      betelgeuse: { vi: ['Sao Betelgeuse', 'Một ngôi sao siêu khổng lồ màu đỏ cam ở vai chòm Lạp Hộ. Nếu đặt vào chỗ Mặt Trời, nó to tới tận quỹ đạo Sao Mộc!'], en: ['Betelgeuse', 'A red-orange supergiant on Orion’s shoulder. In the Sun’s place it would reach about as far as Jupiter’s orbit!'] },
      rigel: { vi: ['Sao Rigel', 'Ngôi sao xanh trắng rất nóng ở chân chòm Lạp Hộ, sáng hơn Mặt Trời hàng chục nghìn lần.'], en: ['Rigel', 'A hot blue-white star at Orion’s foot, tens of thousands of times brighter than the Sun.'] },
      antares: { vi: ['Sao Antares (sao Tâm)', 'Trái tim đỏ rực của chòm Bọ Cạp. Tên của nó có nghĩa là "đối thủ của Sao Hỏa" vì cũng có màu đỏ.'], en: ['Antares', 'The red heart of the Scorpion. Its name means “rival of Mars” because it is red too.'] },
      aldebaran: { vi: ['Sao Aldebaran', 'Con mắt đỏ của chòm Kim Ngưu (con bò tót).'], en: ['Aldebaran', 'The red eye of Taurus the Bull.'] },
      alcyone: { vi: ['Cụm sao Tua Rua', 'Một chùm sao nhỏ lấp lánh. Người Việt gọi là sao Tua Rua, có câu "Tua Rua bằng mặt ruộng, mạ chiêm ra cấy". Mắt thường thấy khoảng 6 – 7 sao.'], en: ['The Pleiades', 'A small sparkling cluster. Vietnamese call it Tua Rua, and farmers used it to time rice planting. You can see about 6 – 7 stars by eye.'] },
      arcturus: { vi: ['Sao Arcturus', 'Ngôi sao màu cam rất sáng. Kéo dài cán gáo của chòm Bắc Đẩu theo đường cong là tới nó.'], en: ['Arcturus', 'A bright orange star. Follow the curve of the Big Dipper’s handle to “arc to Arcturus”.'] },
      capella: { vi: ['Sao Capella', 'Ngôi sao vàng sáng rực ở phía Bắc vào các tối mùa đông.'], en: ['Capella', 'A bright yellow star high in the north on winter evenings.'] },
      spica: { vi: ['Sao Spica', 'Ngôi sao xanh trắng sáng nhất chòm Xử Nữ, thấy rõ vào mùa xuân.'], en: ['Spica', 'The bright blue-white star of Virgo, seen in spring.'] },
      canopus: { vi: ['Sao Canopus', 'Ngôi sao sáng thứ hai bầu trời. Ở Việt Nam nó chỉ lên thấp ở chân trời phía Nam, thấy rõ hơn ở miền Nam.'], en: ['Canopus', 'The second brightest star. From Vietnam it stays low in the south, easier to see in the south of the country.'] },
      procyon: { vi: ['Sao Procyon', 'Cùng Sirius và Betelgeuse tạo thành "Tam giác mùa đông".'], en: ['Procyon', 'With Sirius and Betelgeuse it forms the “Winter Triangle”.'] },
      deneb: { vi: ['Sao Deneb', 'Đuôi của chòm Thiên Nga. Deneb, Vega và Altair tạo thành "Tam giác mùa hè".'], en: ['Deneb', 'The Swan’s tail. Deneb, Vega and Altair make the “Summer Triangle”.'] },
      regulus: { vi: ['Sao Regulus', 'Trái tim của chòm Sư Tử, rất gần đường đi của Mặt Trời trên bầu trời.'], en: ['Regulus', 'The heart of Leo, very close to the Sun’s path across the sky.'] },
      pollux: { vi: ['Sao Pollux', 'Một trong hai anh em sinh đôi của chòm Song Tử, có màu vàng cam.'], en: ['Pollux', 'One of the Gemini twins, golden orange.'] },
      castor: { vi: ['Sao Castor', 'Người anh em sinh đôi còn lại của chòm Song Tử.'], en: ['Castor', 'The other Gemini twin.'] },
      dubhe: { vi: ['Sao Thiên Xu (Dubhe)', 'Một trong hai "sao chỉ cực" ở đầu gáo Bắc Đẩu, chỉ đường tới Sao Bắc Cực.'], en: ['Dubhe', 'One of the two “pointer stars” at the Big Dipper’s bowl that lead to Polaris.'] },
      merak: { vi: ['Sao Thiên Tuyền (Merak)', 'Sao chỉ cực thứ hai. Kéo dài đường Thiên Tuyền → Thiên Xu khoảng 5 lần là tới Sao Bắc Cực.'], en: ['Merak', 'The second pointer star. Extend Merak → Dubhe about five times to reach Polaris.'] },
      acrux: { vi: ['Sao Acrux', 'Sao sáng nhất chòm Nam Thập Tự, chỉ lên thấp ở chân trời phía Nam khi ngắm từ Việt Nam.'], en: ['Acrux', 'The brightest star of the Southern Cross, low in the south from Vietnam.'] }
    };
    const CONS = [
      { id: 'dipper', icon: '🥄', vi: ['Bắc Đẩu (cái Gáo)', 'Bảy ngôi sao như cái gáo múc nước, là một phần của chòm Đại Hùng (Gấu Lớn).', 'Tối mùa xuân, phía Bắc', 'Hai sao ở đầu gáo chỉ đường tới Sao Bắc Cực.'], en: ['The Big Dipper', 'Seven stars shaped like a ladle, part of Ursa Major, the Great Bear.', 'Spring evenings, north', 'Two stars at the bowl point the way to Polaris.'],
        stars: ['dubhe', 'merak', 'phecda', 'megrez', 'alioth', 'mizar', 'alkaid'], edges: [['alkaid', 'mizar'], ['mizar', 'alioth'], ['alioth', 'megrez'], ['megrez', 'dubhe'], ['dubhe', 'merak'], ['merak', 'phecda'], ['phecda', 'megrez']] },
      { id: 'umi', icon: '🐻', vi: ['Tiểu Hùng (Gấu Nhỏ)', 'Một chiếc gáo nhỏ, đầu cán chính là Sao Bắc Cực.', 'Quanh năm, thấp ở phía Bắc', 'Ở Việt Nam, Sao Bắc Cực chỉ cao bằng vĩ độ nơi em đứng.'], en: ['Little Dipper (Ursa Minor)', 'A small ladle whose handle ends at Polaris.', 'All year, low in the north', 'From Vietnam, Polaris is only as high as your latitude.'],
        stars: ['polaris', 'yildun', 'epsumi', 'zetumi', 'kochab', 'pherkad', 'etaumi'], edges: [['polaris', 'yildun'], ['yildun', 'epsumi'], ['epsumi', 'zetumi'], ['zetumi', 'kochab'], ['kochab', 'pherkad'], ['pherkad', 'etaumi'], ['etaumi', 'zetumi']] },
      { id: 'cas', icon: '👑', vi: ['Tiên Hậu (Cassiopeia)', 'Năm ngôi sao xếp thành chữ W hoặc chữ M, như ngai vàng của hoàng hậu.', 'Tối mùa thu, phía Bắc', 'Khi Bắc Đẩu xuống thấp, có thể dùng chữ W này để tìm Sao Bắc Cực.'], en: ['Cassiopeia', 'Five stars in a W or M shape, like a queen’s throne.', 'Autumn evenings, north', 'When the Dipper is low, the W helps you find Polaris.'],
        stars: ['caph', 'schedar', 'gamcas', 'ruchbah', 'segin'], edges: [['caph', 'schedar'], ['schedar', 'gamcas'], ['gamcas', 'ruchbah'], ['ruchbah', 'segin']] },
      { id: 'ori', icon: '🏹', vi: ['Lạp Hộ (Thợ Săn)', 'Chòm sao dễ nhận ra nhất bầu trời mùa đông với 3 sao thẳng hàng làm thắt lưng. Dân gian Việt gọi là sao Cày.', 'Tối mùa đông, phía Nam và Đông', 'Ba sao thắng lưng chỉ xuống Sirius, ngôi sao sáng nhất.'], en: ['Orion the Hunter', 'The easiest winter constellation, with three stars in a row for his belt. Vietnamese folk call it “the Plough”.', 'Winter evenings, south and east', 'The belt points down to Sirius, the brightest star.'],
        stars: ['betelgeuse', 'bellatrix', 'meissa', 'mintaka', 'alnilam', 'alnitak', 'saiph', 'rigel'], edges: [['betelgeuse', 'bellatrix'], ['betelgeuse', 'meissa'], ['meissa', 'bellatrix'], ['bellatrix', 'mintaka'], ['betelgeuse', 'alnitak'], ['mintaka', 'alnilam'], ['alnilam', 'alnitak'], ['alnitak', 'saiph'], ['mintaka', 'rigel']] },
      { id: 'cma', icon: '🐕', vi: ['Đại Khuyển (Chó Lớn)', 'Chú chó của người thợ săn, có Sirius sáng chói ở cổ.', 'Tối mùa đông, phía Nam', 'Sirius là ngôi sao sáng nhất bầu trời đêm.'], en: ['Canis Major', 'The hunter’s big dog, with dazzling Sirius at its neck.', 'Winter evenings, south', 'Sirius is the brightest star at night.'],
        stars: ['sirius', 'mirzam', 'wezen', 'adhara', 'aludra'], edges: [['mirzam', 'sirius'], ['sirius', 'wezen'], ['wezen', 'adhara'], ['wezen', 'aludra']] },
      { id: 'tau', icon: '🐂', vi: ['Kim Ngưu (Bò Tót)', 'Con bò tót với con mắt đỏ Aldebaran, gần đó là chùm sao Tua Rua lấp lánh.', 'Tối mùa đông, trên cao', 'Tua Rua là một cụm sao trẻ, khoảng 100 triệu năm tuổi.'], en: ['Taurus the Bull', 'The bull with red-eyed Aldebaran, next to the sparkling Pleiades.', 'Winter evenings, high up', 'The Pleiades is a young cluster, about 100 million years old.'],
        stars: ['aldebaran', 'hyadum', 'ain', 'elnath', 'zettau'], edges: [['hyadum', 'aldebaran'], ['aldebaran', 'zettau'], ['hyadum', 'ain'], ['ain', 'elnath']] },
      { id: 'gem', icon: '👬', vi: ['Song Tử (Anh em sinh đôi)', 'Hai anh em Castor và Pollux đứng cạnh nhau.', 'Tối mùa đông và đầu xuân', 'Castor thật ra là một hệ gồm 6 ngôi sao!'], en: ['Gemini the Twins', 'Brothers Castor and Pollux side by side.', 'Winter and early spring evenings', 'Castor is really a system of six stars!'],
        stars: ['castor', 'pollux', 'mebsuta', 'tejat', 'wasat', 'alhena'], edges: [['castor', 'pollux'], ['castor', 'mebsuta'], ['mebsuta', 'tejat'], ['pollux', 'wasat'], ['wasat', 'alhena']] },
      { id: 'leo', icon: '🦁', vi: ['Sư Tử', 'Phần đầu sư tử giống một dấu hỏi ngược, trái tim là sao Regulus.', 'Tối mùa xuân, trên cao', 'Mưa sao băng Sư Tử xuất hiện khoảng giữa tháng 11 hằng năm.'], en: ['Leo the Lion', 'The head looks like a backwards question mark, with Regulus as its heart.', 'Spring evenings, high up', 'The Leonid meteor shower comes each mid-November.'],
        stars: ['regulus', 'etaleo', 'algieba', 'adhafera', 'rasalas', 'zosma', 'denebola', 'chertan'], edges: [['regulus', 'etaleo'], ['etaleo', 'algieba'], ['algieba', 'adhafera'], ['adhafera', 'rasalas'], ['algieba', 'zosma'], ['zosma', 'denebola'], ['denebola', 'chertan'], ['chertan', 'regulus'], ['zosma', 'chertan']] },
      { id: 'lyr', icon: '🎻', vi: ['Thiên Cầm (Cây đàn)', 'Cây đàn nhỏ với sao Chức Nữ (Vega) sáng rực.', 'Tối mùa hè, trên cao', 'Vega là một góc của "Tam giác mùa hè".'], en: ['Lyra the Lyre', 'A small harp with bright Vega.', 'Summer evenings, high up', 'Vega is one corner of the “Summer Triangle”.'],
        stars: ['vega', 'zetlyr', 'sheliak', 'sulafat', 'dellyr'], edges: [['vega', 'zetlyr'], ['zetlyr', 'sheliak'], ['sheliak', 'sulafat'], ['sulafat', 'dellyr'], ['dellyr', 'zetlyr']] },
      { id: 'cyg', icon: '🦢', vi: ['Thiên Nga', 'Con thiên nga dang cánh bay dọc dải Ngân Hà, còn gọi là "Thập tự phương Bắc".', 'Tối mùa hè và mùa thu', 'Sao Albireo ở mỏ thiên nga, qua kính thiên văn là hai sao vàng và xanh.'], en: ['Cygnus the Swan', 'A swan flying along the Milky Way, also called the Northern Cross.', 'Summer and autumn evenings', 'Albireo at its beak is a gold-and-blue double star in a telescope.'],
        stars: ['deneb', 'sadr', 'albireo', 'gienah', 'delcyg'], edges: [['deneb', 'sadr'], ['sadr', 'albireo'], ['gienah', 'sadr'], ['sadr', 'delcyg']] },
      { id: 'aql', icon: '🦅', vi: ['Thiên Ưng (Đại bàng)', 'Con đại bàng có sao Ngưu Lang (Altair) ở giữa.', 'Tối mùa hè và mùa thu', 'Altair tự quay rất nhanh, một vòng chỉ mất khoảng 9 giờ.'], en: ['Aquila the Eagle', 'An eagle with Altair in the middle.', 'Summer and autumn evenings', 'Altair spins very fast: once every 9 hours or so.'],
        stars: ['altair', 'tarazed', 'alshain', 'delaql', 'zetaql', 'lamaql'], edges: [['tarazed', 'altair'], ['altair', 'alshain'], ['altair', 'delaql'], ['delaql', 'lamaql'], ['delaql', 'zetaql']] },
      { id: 'sco', icon: '🦂', vi: ['Bọ Cạp (Thiên Yết)', 'Con bọ cạp cong đuôi với trái tim đỏ Antares.', 'Tối mùa hè, phía Nam', 'Ở Việt Nam thấy trọn vẹn chòm này, đẹp hơn nhiều so với các nước ở xa về phía Bắc.'], en: ['Scorpius the Scorpion', 'A scorpion with a curled tail and red-hearted Antares.', 'Summer evenings, south', 'From Vietnam you see all of it, much better than from far-northern countries.'],
        stars: ['acrab', 'dschubba', 'pisco', 'antares', 'tausco', 'epssco', 'musco', 'zetsco', 'etasco', 'sargas', 'iotsco', 'kapsco', 'shaula', 'lesath'], edges: [['acrab', 'dschubba'], ['dschubba', 'pisco'], ['dschubba', 'antares'], ['antares', 'tausco'], ['tausco', 'epssco'], ['epssco', 'musco'], ['musco', 'zetsco'], ['zetsco', 'etasco'], ['etasco', 'sargas'], ['sargas', 'iotsco'], ['iotsco', 'kapsco'], ['kapsco', 'shaula'], ['shaula', 'lesath']] },
      { id: 'cru', icon: '✝️', vi: ['Nam Thập Tự', 'Chòm sao nhỏ nhất, hình chữ thập, chỉ về phía Nam.', 'Tối mùa xuân, sát chân trời phía Nam', 'Ở Việt Nam chỉ thấy thấp sát chân trời, ở miền Nam rõ hơn.'], en: ['Southern Cross (Crux)', 'The smallest constellation, a cross that points south.', 'Spring evenings, low in the south', 'From Vietnam it’s just above the horizon, clearer in the south.'],
        stars: ['acrux', 'gacrux', 'mimosa', 'delcru'], edges: [['acrux', 'gacrux'], ['mimosa', 'delcru']] }
    ];
    CONS.find((c) => c.id === 'cru').icon = '✚';
    const STAR_CON = {}; CONS.forEach((c) => c.stars.forEach((s) => { STAR_CON[s] = c.id; }));
    STAR_CON.alcyone = STAR_CON.atlas = STAR_CON.electra = STAR_CON.maia = STAR_CON.merope = STAR_CON.taygeta = 'tau';

    // sao nền: ngẫu nhiên nhưng cố định
    let seed = 7; const srand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const BG = Array.from({ length: 1100 }, () => { const u = srand() * 2 - 1, ra = srand() * 24; return [ra, Math.asin(u) / DEG, 3.6 + Math.pow(srand(), .55) * 2.6, srand() * TAU]; });
    // dải Ngân Hà: đường tròn lớn vuông góc với cực thiên hà (RA 12.86h, Dec +27.13)
    const MW = (() => { const pr = 12.86 * 15 * DEG, pd = 27.13 * DEG, P = [Math.cos(pd) * Math.cos(pr), Math.cos(pd) * Math.sin(pr), Math.sin(pd)];
      const A = [-Math.sin(pr), Math.cos(pr), 0], B = [P[1] * A[2] - P[2] * A[1], P[2] * A[0] - P[0] * A[2], P[0] * A[1] - P[1] * A[0]], out = [];
      for (let i = 0; i <= 180; i++) { const t = i / 180 * TAU, v = A.map((a, k) => a * Math.cos(t) + B[k] * Math.sin(t)); out.push([((Math.atan2(v[1], v[0]) / DEG / 15) + 24) % 24, Math.asin(v[2]) / DEG, i]); } return out; })();
    const PLACES = { hn: 21.03, hue: 16.46, hcm: 10.78 };

    /* ---------- toán học bầu trời ---------- */
    function lst(month, hour) { const doy = (month - 1) * 30.44 + 15, raSun = (((doy - 80) / 365.25) * 24 + 24) % 24; return ((hour - 12 + raSun) % 24 + 24) % 24; }
    function enu(raH, decD, lat, LST) {
      const H = (LST - raH) * 15 * DEG, d = decD * DEG, p = lat * DEG;
      return [-Math.cos(d) * Math.sin(H), Math.sin(d) * Math.cos(p) - Math.cos(d) * Math.cos(H) * Math.sin(p), Math.sin(d) * Math.sin(p) + Math.cos(d) * Math.cos(H) * Math.cos(p)];
    }
    const vAz = (az, alt) => [Math.sin(az) * Math.cos(alt), Math.cos(az) * Math.cos(alt), Math.sin(alt)];
    function camera(az0, alt0) {
      const v = vAz(az0 * DEG, alt0 * DEG), r = [Math.cos(az0 * DEG), -Math.sin(az0 * DEG), 0];
      const u = [r[1] * v[2] - r[2] * v[1], r[2] * v[0] - r[0] * v[2], r[0] * v[1] - r[1] * v[0]];
      return { v, r, u };
    }
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    function proj(cam, d, cx, cy, sc) { const c = dot(d, cam.v); if (c < -.3) return null; const k = 2 / (1 + c); return { x: cx + k * dot(d, cam.r) * sc, y: cy - k * dot(d, cam.u) * sc, c }; }
    function starStyle(mag) { return { r: Math.max(.75, (4.9 - mag) * .8), a: clamp(1.35 - mag * .16, .38, 1) }; }

    /* ---------- vẽ bầu trời (dùng cho tab 1 và tab 3) ---------- */
    let meteors = [];
    function drawSkyView(o, ctx, w, h, opt) {
      const LST = lst(o.month, o.hour), lat = PLACES[o.place], cam = camera(o.az0, o.alt0);
      const sc = (w / 2) / (2 * Math.tan((o.fov / 2) * DEG / 2)), cx = w / 2, cy = h / 2;
      const nightK = clamp((Math.min(Math.abs(o.hour - 18), Math.abs(30 - o.hour)) - .4) / 1.4, 0, 1);
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, mix('#3b4a8c', '#050816', nightK)); sky.addColorStop(.7, mix('#e98a5a', '#141a3f', nightK)); sky.addColorStop(1, mix('#f8c27a', '#1f2a5a', nightK));
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      const out = [], P = (ra, dec) => proj(cam, enu(ra, dec, lat, LST), cx, cy, sc);
      const visA = nightK * .9 + .1;
      // Ngân Hà
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (const [lw, al] of [[sc * .55, .035], [sc * .3, .05], [sc * .12, .06]]) {
        ctx.strokeStyle = `rgba(200,210,255,${al * visA})`; ctx.lineWidth = lw; ctx.beginPath(); let pen = false;
        for (const [ra, dec] of MW) { const p = P(ra, dec); if (!p || p.c < -.05) { pen = false; continue; } if (pen) ctx.lineTo(p.x, p.y); else { ctx.moveTo(p.x, p.y); pen = true; } }
        ctx.stroke();
      }
      ctx.restore();
      // vệt sao (quá khứ 2 giờ)
      if (opt.trails) {
        ctx.lineWidth = 1.4;
        for (const [id, st] of Object.entries(S)) {
          if (st[2] > 3.2) continue; ctx.strokeStyle = `rgba(190,210,255,${.35 * visA})`; ctx.beginPath(); let pen = false;
          for (let k = 0; k <= 30; k++) { const L2 = LST - k * .1, d = enu(st[0], st[1], lat, L2); if (d[2] < 0) { pen = false; continue; } const p = proj(cam, d, cx, cy, sc); if (!p) { pen = false; continue; } if (pen) ctx.lineTo(p.x, p.y); else { ctx.moveTo(p.x, p.y); pen = true; } }
          ctx.stroke(); void id;
        }
      }
      // sao nền
      for (const [ra, dec, mag, ph] of BG) {
        const d = enu(ra, dec, lat, LST); if (d[2] < -.02) continue; const p = proj(cam, d, cx, cy, sc); if (!p || p.x < -5 || p.x > w + 5 || p.y < -5 || p.y > h + 5) continue;
        const st = starStyle(mag), tw = reduceMotion ? 1 : .7 + .3 * Math.sin(clock * 2.2 + ph * 5);
        ctx.fillStyle = `rgba(255,255,255,${st.a * tw * visA * clamp(d[2] * 6, .2, 1)})`; ctx.beginPath(); ctx.arc(p.x, p.y, st.r, 0, TAU); ctx.fill();
      }
      // nét chòm sao
      const hl = opt.highlight || null;
      if (opt.lines || hl) for (const c of CONS) {
        const on = hl && hl.includes(c.id); if (!opt.lines && !on) continue;
        ctx.strokeStyle = on ? `rgba(250,204,21,${.65 + .25 * Math.sin(clock * 3)})` : `rgba(147,197,253,${.42 * visA})`; ctx.lineWidth = on ? 2.6 : 1.3;
        for (const [a, b] of c.edges) { const da = enu(S[a][0], S[a][1], lat, LST), db = enu(S[b][0], S[b][1], lat, LST); if (da[2] < -.05 && db[2] < -.05) continue; const pa = proj(cam, da, cx, cy, sc), pb = proj(cam, db, cx, cy, sc); if (!pa || !pb) continue; ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); }
      }
      // sao sáng
      for (const [id, st] of Object.entries(S)) {
        const d = enu(st[0], st[1], lat, LST); if (d[2] < -.01) continue; const p = proj(cam, d, cx, cy, sc); if (!p || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) continue;
        const sty = starStyle(st[2]), col = st[3] || '#ffffff', ext = clamp(d[2] * 8, .25, 1), tw = reduceMotion ? 1 : .85 + .15 * Math.sin(clock * 3 + st[0] * 7);
        if (st[2] < 1.6) { const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sty.r * 5); g.addColorStop(0, hexA(col, .5 * ext * visA)); g.addColorStop(1, hexA(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, sty.r * 5, 0, TAU); ctx.fill(); }
        ctx.fillStyle = hexA(col, sty.a * ext * tw * visA); ctx.beginPath(); ctx.arc(p.x, p.y, sty.r * 1.15, 0, TAU); ctx.fill();
        if (st[2] < .6 && !reduceMotion) { ctx.strokeStyle = hexA(col, .35 * ext * visA); ctx.lineWidth = 1; const L3 = sty.r * 4 * tw; ctx.beginPath(); ctx.moveTo(p.x - L3, p.y); ctx.lineTo(p.x + L3, p.y); ctx.moveTo(p.x, p.y - L3); ctx.lineTo(p.x, p.y + L3); ctx.stroke(); }
        out.push({ id, x: p.x, y: p.y, alt: d[2] });
      }
      // tên chòm sao
      if (opt.names) for (const c of CONS) {
        let sx = 0, sy = 0, n = 0; for (const s of c.stars) { const d = enu(S[s][0], S[s][1], lat, LST); if (d[2] < 0) continue; const p = proj(cam, d, cx, cy, sc); if (!p) continue; sx += p.x; sy += p.y; n++; }
        if (n >= Math.ceil(c.stars.length / 2)) { ctx.font = emojiFont(16); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.globalAlpha = .85 * visA; ctx.fillText(c.icon, sx / n, sy / n - 12); ctx.globalAlpha = 1; label(ctx, L(c)[0].split(' (')[0], sx / n, sy / n + 8, '#c7d2fe', w < 420 ? 10 : 11.5); }
      }
      // sao băng
      if (!reduceMotion && nightK > .5 && Math.random() < .004) meteors.push({ x: rand(w * .1, w * .9), y: rand(0, h * .4), vx: rand(-1, 1) * w * .9, vy: rand(.3, .6) * h, t: 0 });
      for (const m of meteors) { m.t += 1 / 60; const x = m.x + m.vx * m.t, y = m.y + m.vy * m.t; const g = ctx.createLinearGradient(x, y, x - m.vx * .08, y - m.vy * .08); g.addColorStop(0, `rgba(255,255,255,${1 - m.t * 1.8})`); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - m.vx * .08, y - m.vy * .08); ctx.stroke(); }
      meteors = meteors.filter((m) => m.t < .55);
      // mặt đất: làng quê, mái đình, hàng cau
      const hz = []; for (let k = -70; k <= 70; k += 2) { const p = proj(cam, vAz((o.az0 + k) * DEG, 0), cx, cy, sc); if (p) hz.push(p); }
      if (hz.length > 1) {
        ctx.fillStyle = '#0b1220'; ctx.beginPath(); ctx.moveTo(-10, h + 10); hz.forEach((p) => ctx.lineTo(p.x, p.y)); ctx.lineTo(w + 10, h + 10); ctx.closePath(); ctx.fill();
        const base = (x) => { let best = hz[0]; for (const p of hz) if (Math.abs(p.x - x) < Math.abs(best.x - x)) best = p; return best.y; };
        ctx.fillStyle = '#060a14';
        const s0 = Math.min(w, h) * .09;
        for (let k = 0; k < 9; k++) { const x = ((k * 173 + o.az0 * 9) % (w + 200)) - 100, y = base(x); if (k % 3 === 0) { ctx.fillRect(x - 1.5, y - s0 * 1.6, 3, s0 * 1.6); for (let f = 0; f < 6; f++) { const a = -Math.PI / 2 + (f - 2.5) * .5; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * s0 * .3, y - s0 * 1.6 + Math.sin(a) * s0 * .12, s0 * .32, s0 * .06, a, 0, TAU); ctx.fill(); } } else if (k % 3 === 1) { ctx.beginPath(); ctx.moveTo(x - s0 * .9, y); ctx.lineTo(x - s0 * .9, y - s0 * .45); ctx.quadraticCurveTo(x - s0 * 1.1, y - s0 * .55, x - s0 * 1.2, y - s0 * .75); ctx.quadraticCurveTo(x, y - s0 * .95, x + s0 * 1.2, y - s0 * .75); ctx.quadraticCurveTo(x + s0 * 1.1, y - s0 * .55, x + s0 * .9, y - s0 * .45); ctx.lineTo(x + s0 * .9, y); ctx.fill(); ctx.fillStyle = 'rgba(253,224,71,.55)'; ctx.fillRect(x - s0 * .2, y - s0 * .32, s0 * .4, s0 * .2); ctx.fillStyle = '#060a14'; } else { ctx.beginPath(); ctx.arc(x, y - s0 * .4, s0 * .55, Math.PI, TAU); ctx.fill(); } }
        for (const [nm, az] of [[T('Bắc', 'N'), 0], [T('Đông Bắc', 'NE'), 45], [T('Đông', 'E'), 90], [T('Đông Nam', 'SE'), 135], [T('Nam', 'S'), 180], [T('Tây Nam', 'SW'), 225], [T('Tây', 'W'), 270], [T('Tây Bắc', 'NW'), 315]]) {
          const p = proj(cam, vAz(az * DEG, -.02), cx, cy, sc); if (!p || p.y > h - 4 || p.x < 0 || p.x > w) continue; label(ctx, nm, p.x, Math.min(h - 12, p.y + 16), az % 90 ? '#94a3b8' : '#fde68a', az % 90 ? 11 : 13.5);
        }
      }
      return { out, P, cam, sc, cx, cy, LST, lat };
    }
    function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${clamp(a, 0, 1)})`; }
    const hourTxt = (h) => { const H = Math.floor(h) % 24, M = Math.round((h - Math.floor(h)) * 60) % 60; return `${String(H).padStart(2, '0')}:${String(M).padStart(2, '0')}`; };

    /* =====================================================================
       1. BẦU TRỜI ĐÊM
       ===================================================================== */
    const now = new Date();
    let sk = { az0: 215, alt0: 42, fov: 120, month: now.getMonth() + 1, hour: 20.5, place: 'hn', lines: true, names: true, trails: false, playing: false, sel: null, drag: null, res: null, infoKey: '' };
    const skC = mk('c_sky', (w) => clamp(w * .66, 320, 560));
    function skFrame(dt) {
      const { w, h, ctx } = skC; if (!w) return;
      if (sk.playing) { sk.hour += dt * .45; if (sk.hour > 30) sk.hour = 18; $('skHour').value = String(sk.hour); }
      sk.res = drawSkyView(sk, ctx, w, h, { lines: sk.lines, names: sk.names, trails: sk.trails, highlight: sk.sel ? [STAR_CON[sk.sel]] : null });
      if (sk.sel) { const s = sk.res.out.find((o) => o.id === sk.sel); if (s) { ctx.strokeStyle = `rgba(244,114,182,${.6 + .3 * Math.sin(clock * 5)})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(s.x, s.y, 14 + Math.sin(clock * 5) * 2, 0, TAU); ctx.stroke(); } }
      textLight(ctx, `🕗 ${hourTxt(sk.hour)} · ${T('tháng', 'month')} ${sk.month}`, 12, 18, '#e0e7ff', 12.5, 'left', 900);
      skInfo();
    }
    function skStarAt(px, py) { if (!sk.res) return null; let best = null, bd = 18; for (const o of sk.res.out) { const d = Math.hypot(o.x - px, o.y - py); if (d < bd) { bd = d; best = o; } } return best; }
    skC.c.addEventListener('pointerdown', (e) => { const p = localPoint(skC.c, e); sk.drag = { x: p.x, y: p.y, az: sk.az0, alt: sk.alt0, moved: false }; try { skC.c.setPointerCapture(e.pointerId); } catch (_) {} });
    skC.c.addEventListener('pointermove', (e) => { if (!sk.drag) return; const p = localPoint(skC.c, e), k = sk.fov / skC.w, dx = p.x - sk.drag.x, dy = p.y - sk.drag.y; if (Math.abs(dx) + Math.abs(dy) > 4) sk.drag.moved = true; sk.az0 = ((sk.drag.az - dx * k) % 360 + 360) % 360; sk.alt0 = clamp(sk.drag.alt + dy * k, 8, 82); });
    const skUp = (e) => { if (!sk.drag) return; if (!sk.drag.moved) { const p = localPoint(skC.c, e), s = skStarAt(p.x, p.y); cancelSpeech(); sk.sel = s ? s.id : null; sk.infoKey = ''; } sk.drag = null; };
    skC.c.addEventListener('pointerup', skUp); skC.c.addEventListener('pointercancel', () => { sk.drag = null; });
    skC.c.addEventListener('wheel', (e) => { e.preventDefault(); sk.fov = clamp(sk.fov * (e.deltaY > 0 ? 1.08 : .92), 45, 150); }, { passive: false });
    root.querySelectorAll('[data-dir]').forEach((b) => b.addEventListener('click', () => { sk.az0 = +b.dataset.dir; sk.alt0 = 35; pressGroup('[data-dir]', 'dir', b.dataset.dir); }));
    $('skHour').addEventListener('input', () => { sk.hour = +$('skHour').value; });
    $('skMonth').addEventListener('input', () => { sk.month = +$('skMonth').value; sk.infoKey = ''; });
    root.querySelectorAll('[data-place]').forEach((b) => b.addEventListener('click', () => { sk.place = b.dataset.place; pressGroup('[data-place]', 'place', sk.place); sk.infoKey = ''; }));
    for (const [id, k] of [['skLines', 'lines'], ['skNames', 'names'], ['skTrails', 'trails']]) $(id).onclick = () => { sk[k] = !sk[k]; $(id).setAttribute('aria-pressed', String(sk[k])); };
    $('skPlay').onclick = () => { sk.playing = !sk.playing; $('skPlay').textContent = sk.playing ? STR.pause[lang === 'en' ? 1 : 0] : STR.play[lang === 'en' ? 1 : 0]; };
    const dirWord = (az) => T(['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'][Math.round(az / 45) % 8], ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'][Math.round(az / 45) % 8]);
    function skInfo() {
      const key = [lang, sk.sel, sk.month, Math.round(sk.hour * 2), sk.place].join('|'); if (key === sk.infoKey) return; sk.infoKey = key;
      const LST = lst(sk.month, sk.hour), lat = PLACES[sk.place];
      setText('skHourTxt', hourTxt(sk.hour)); setText('skMonthTxt', T(`Tháng ${sk.month}`, `Month ${sk.month}`));
      if (!sk.sel) {
        const up = CONS.filter((c) => { const s0 = S[c.stars[0]], d = enu(s0[0], s0[1], lat, LST); return d[2] > .15; });
        infoBox($('info_sky'), {
          emo: '🌌', title: T('Bầu trời lúc này', 'The sky right now'), sub: T(`${hourTxt(sk.hour)}, tháng ${sk.month}`, `${hourTxt(sk.hour)}, month ${sk.month}`),
          rows: [[T('Đang thấy', 'Visible now'), up.length ? up.map((c) => `${c.icon} ${L(c)[0].split(' (')[0]}`).join(', ') : T('Chưa có chòm nào lên cao', 'None high yet')], [T('Cách chơi', 'How to play'), T('Kéo để xoay bầu trời, cuộn chuột để phóng to. Bấm vào một ngôi sao sáng để tìm hiểu.', 'Drag to look around, scroll to zoom. Tap a bright star to learn about it.')]],
          notes: [['fun', T('✨ Bầu trời không đứng yên: vì Trái Đất tự quay, các ngôi sao mọc ở phía Đông và lặn ở phía Tây giống như Mặt Trời. Bấm "Cho trời quay" để xem!', '✨ The sky isn’t still: because Earth spins, stars rise in the east and set in the west like the Sun. Press “Run time” to watch!')]]
        });
        setText('hud_sky', T(`🌌 Đang nhìn về hướng ${dirWord(sk.az0)}`, `🌌 Looking ${dirWord(sk.az0)}`));
        return;
      }
      const st = S[sk.sel], d = enu(st[0], st[1], lat, LST), alt = Math.asin(d[2]) / DEG, az = ((Math.atan2(d[0], d[1]) / DEG) + 360) % 360;
      const info = STAR_INFO[sk.sel], con = CONS.find((c) => c.id === STAR_CON[sk.sel]), cd = con ? L(con) : null;
      const rows = [];
      if (info) rows.push([T('Ngôi sao', 'The star'), L(info)[1]]);
      if (cd) rows.push([T('Chòm sao', 'Constellation'), `${con.icon} ${cd[0]}: ${cd[1]}`], [T('Thấy rõ khi', 'Best seen'), cd[2]]);
      rows.push([T('Vị trí', 'Position'), alt > 0 ? T(`Cao ${Math.round(alt)}° so với chân trời, hướng ${dirWord(az)}`, `${Math.round(alt)}° above the horizon, ${dirWord(az)}`) : T('Đang ở dưới chân trời', 'Below the horizon')]);
      infoBox($('info_sky'), { emo: con ? con.icon : '⭐', title: info ? L(info)[0] : (cd ? cd[0] : '⭐'), sub: T(`Cấp sao ${st[2]} (số càng nhỏ, sao càng sáng)`, `Magnitude ${st[2]} (smaller = brighter)`), rows, notes: cd ? [['fun', '✨ ' + cd[3]]] : [] });
      setText('hud_sky', `⭐ ${info ? L(info)[0] : cd[0]}`);
    }
    TABS.sky = { frame: skFrame, refresh() { $('skPlay').textContent = sk.playing ? STR.pause[lang === 'en' ? 1 : 0] : STR.play[lang === 'en' ? 1 : 0]; $('skMonth').value = String(sk.month); sk.infoKey = ''; } };
    QUIZZES.push(makeQuiz($('quiz_sky'), {
      vi: [
        { q: 'Vì sao các ngôi sao mọc ở phía Đông, lặn ở phía Tây?', a: ['Vì Trái Đất tự quay', 'Vì các ngôi sao chạy rất nhanh', 'Vì gió thổi', 'Vì Mặt Trăng kéo'], why: 'Trái Đất quay từ Tây sang Đông nên ta thấy cả bầu trời quay ngược lại.' },
        { q: 'Ngôi sao sáng nhất bầu trời đêm là sao nào?', a: ['Sirius (Thiên Lang)', 'Sao Bắc Cực', 'Vega', 'Antares'], why: 'Sirius trong chòm Đại Khuyển là sao sáng nhất ban đêm.' },
        { q: 'Dải sáng mờ vắt ngang bầu trời là gì?', a: ['Dải Ngân Hà', 'Mây', 'Khói', 'Cầu vồng'], why: 'Ngân Hà là thiên hà của chúng ta, gồm hàng trăm tỉ ngôi sao.' },
        { q: 'Chuyện Ngưu Lang – Chức Nữ gắn với hai sao nào?', a: ['Altair và Vega', 'Sirius và Rigel', 'Castor và Pollux', 'Antares và Spica'], why: 'Hai sao ở hai bên dải Ngân Hà.' },
        { q: '"Cấp sao" càng nhỏ thì ngôi sao thế nào?', a: ['Càng sáng', 'Càng mờ', 'Càng nhỏ', 'Càng xa'], why: 'Sirius có cấp sao −1,46 nên rất sáng.' },
        { q: 'Chòm Lạp Hộ (sao Cày) thấy rõ nhất vào mùa nào?', a: ['Mùa đông', 'Mùa hè', 'Không bao giờ', 'Chỉ ban ngày'], why: 'Lạp Hộ là chòm sao nổi bật của bầu trời mùa đông.' }
      ],
      en: [
        { q: 'Why do stars rise in the east and set in the west?', a: ['Earth spins', 'Stars move very fast', 'The wind', 'The Moon pulls them'], why: 'Earth turns west to east, so the sky appears to turn the other way.' },
        { q: 'What is the brightest star at night?', a: ['Sirius', 'Polaris', 'Vega', 'Antares'], why: 'Sirius in Canis Major outshines every other night star.' },
        { q: 'What is the faint glowing band across the sky?', a: ['The Milky Way', 'Clouds', 'Smoke', 'A rainbow'], why: 'It’s our galaxy, with hundreds of billions of stars.' },
        { q: 'Which stars are the Cowherd and the Weaver Girl?', a: ['Altair and Vega', 'Sirius and Rigel', 'Castor and Pollux', 'Antares and Spica'], why: 'They sit on opposite sides of the Milky Way.' },
        { q: 'The smaller a star’s magnitude, the…', a: ['Brighter it is', 'Fainter it is', 'Smaller it is', 'Further it is'], why: 'Sirius has magnitude −1.46, very bright.' },
        { q: 'When is Orion easiest to see?', a: ['Winter', 'Summer', 'Never', 'Only in daytime'], why: 'Orion rules the winter evening sky.' }
      ]
    }));

    /* =====================================================================
       2. NỐI CHÒM SAO
       ===================================================================== */
    let cn = { idx: 3, done: [], sel: null, wrong: null, burst: [], solved: {}, reveal: 0, pts: {}, infoKey: '' };
    const cnC = mk('c_conn', (w) => clamp(w * .62, 300, 520));
    const ekey = (a, b) => [a, b].sort().join('|');
    function cnLayout() {
      const c = CONS[cn.idx], { w, h } = cnC;
      let ra0 = 0, de0 = 0, sx = 0, sy = 0; c.stars.forEach((s) => { const r = S[s][0] * 15 * DEG; sx += Math.cos(r); sy += Math.sin(r); de0 += S[s][1]; });
      ra0 = Math.atan2(sy, sx); de0 = de0 / c.stars.length * DEG;
      const tp = (raH, decD) => { const r = raH * 15 * DEG, d = decD * DEG, cosc = Math.sin(de0) * Math.sin(d) + Math.cos(de0) * Math.cos(d) * Math.cos(r - ra0); if (cosc < .2) return null; return { x: -(Math.cos(d) * Math.sin(r - ra0)) / cosc, y: (Math.cos(de0) * Math.sin(d) - Math.sin(de0) * Math.cos(d) * Math.cos(r - ra0)) / cosc }; };
      const raw = c.stars.map((s) => tp(S[s][0], S[s][1]));
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; raw.forEach((p) => { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); });
      const k = Math.min((w * .78) / Math.max(1e-3, x1 - x0), (h * .72) / Math.max(1e-3, y1 - y0)), mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
      const map = (p) => ({ x: w / 2 + (p.x - mx) * k, y: h / 2 + 10 - (p.y - my) * k });
      const pts = {}; c.stars.forEach((s, i) => { pts[s] = map(raw[i]); });
      const bg = []; for (const b of BG) { const p = tp(b[0], b[1]); if (!p) continue; const q = map(p); if (q.x > 0 && q.x < w && q.y > 0 && q.y < h) bg.push([q.x, q.y, b[2], b[3]]); }
      return { pts, bg };
    }
    let cnCache = null;
    function cnFrame(dt) {
      const { w, h, ctx } = cnC; if (!w) return;
      if (!cnCache || cnCache.w !== w || cnCache.idx !== cn.idx) cnCache = { w, idx: cn.idx, ...cnLayout() };
      const c = CONS[cn.idx], solved = cn.done.length === c.edges.length;
      const g = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h) * .7); g.addColorStop(0, '#1e1b4b'); g.addColorStop(1, '#050816');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      for (const [x, y, mag, ph] of cnCache.bg) { const st = starStyle(mag); ctx.fillStyle = `rgba(255,255,255,${st.a * (.7 + .3 * Math.sin(clock * 2 + ph * 5))})`; ctx.beginPath(); ctx.arc(x, y, st.r, 0, TAU); ctx.fill(); }
      if (solved) { cn.reveal = Math.min(1, cn.reveal + dt * .8); ctx.globalAlpha = .18 * cn.reveal; ctx.font = emojiFont(Math.min(w, h) * .55); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(c.icon, w / 2, h / 2 + 10); ctx.globalAlpha = 1; }
      // nét đã nối
      for (const [a, b] of c.edges) { if (!cn.done.includes(ekey(a, b))) continue; const pa = cnCache.pts[a], pb = cnCache.pts[b]; ctx.save(); ctx.shadowColor = '#fde047'; ctx.shadowBlur = 12; ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); ctx.restore(); }
      if (cn.wrong && cn.wrong.t > 0) { cn.wrong.t -= dt; const pa = cnCache.pts[cn.wrong.a], pb = cnCache.pts[cn.wrong.b]; ctx.strokeStyle = `rgba(248,113,113,${cn.wrong.t * 1.5})`; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); ctx.setLineDash([]); }
      if (cn.hint) { const [a, b] = cn.hint, pa = cnCache.pts[a], pb = cnCache.pts[b]; ctx.strokeStyle = `rgba(167,139,250,${.5 + .4 * Math.sin(clock * 6)})`; ctx.lineWidth = 2; ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); ctx.setLineDash([]); }
      // các sao của chòm
      for (const s of c.stars) {
        const p = cnCache.pts[s], st = starStyle(Math.min(S[s][2], 3.2)), col = S[s][3] || '#ffffff', on = cn.sel === s;
        const gg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, st.r * 7); gg.addColorStop(0, hexA(col, .55)); gg.addColorStop(1, hexA(col, 0)); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(p.x, p.y, st.r * 7, 0, TAU); ctx.fill();
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p.x, p.y, st.r * 1.6 + 1.5, 0, TAU); ctx.fill();
        if (on) { ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(p.x, p.y, 16 + Math.sin(clock * 8) * 2, 0, TAU); ctx.stroke(); }
        if (STAR_INFO[s] && solved) label(ctx, L(STAR_INFO[s])[0].split(' (')[0], p.x, p.y + 20, '#c7d2fe', 11);
      }
      for (const b of cn.burst) { b.t += dt; for (let k = 0; k < 10; k++) { const a = k / 10 * TAU + b.t, r = b.t * 120; ctx.font = emojiFont(14); ctx.globalAlpha = Math.max(0, 1 - b.t); ctx.fillText('✨', b.x + Math.cos(a) * r, b.y + Math.sin(a) * r); } ctx.globalAlpha = 1; }
      cn.burst = cn.burst.filter((b) => b.t < 1);
      ctx.fillStyle = 'rgba(15,23,42,.7)'; rr(ctx, 10, 10, 200, 28, 10); ctx.fill();
      textLight(ctx, T(`✨ Đã nối ${cn.done.length}/${c.edges.length} nét`, `✨ ${cn.done.length}/${c.edges.length} lines joined`), 20, 24, '#fde68a', 12.5, 'left', 900);
      if (solved) bubble(ctx, `${c.icon} ${L(c)[0]}`, w / 2, h - 22, 15, '#fff', '#6d28d9');
    }
    cnC.c.addEventListener('pointerdown', (e) => {
      if (!cnCache) return; const p = localPoint(cnC.c, e), c = CONS[cn.idx];
      let hit = null, bd = 26; for (const s of c.stars) { const q = cnCache.pts[s], d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; hit = s; } }
      if (!hit) { cn.sel = null; return; }
      cancelSpeech();
      if (!cn.sel || cn.sel === hit) { cn.sel = cn.sel === hit ? null : hit; return; }
      const k = ekey(cn.sel, hit), ok = c.edges.some(([a, b]) => ekey(a, b) === k);
      if (ok && !cn.done.includes(k)) { cn.done.push(k); cn.hint = null; if (cn.done.length === c.edges.length) { cn.solved[c.id] = true; cn.reveal = 0; cn.burst.push({ x: cnC.w / 2, y: cnC.h / 2, t: 0 }); cnRender(); cnInfo(true); } }
      else if (!ok) cn.wrong = { a: cn.sel, b: hit, t: .8 };
      cn.sel = hit;
    });
    function cnPick(i) { cn.idx = i; cn.done = []; cn.sel = null; cn.hint = null; cn.reveal = 0; cnRender(); cnInfo(true); }
    function cnRender() {
      $('connBox').innerHTML = `<p class="muted" style="margin:0">${T('Bấm vào một ngôi sao rồi bấm ngôi sao bên cạnh để nối. Nối đủ là hiện ra chòm sao!', 'Tap one star, then a neighbour, to join them. Join them all to reveal the constellation!')}</p>
        <div class="con-grid">${CONS.map((c, i) => `<button type="button" class="soft-btn con-chip" data-ci="${i}" aria-pressed="${i === cn.idx}">${cn.solved[c.id] ? '⭐' : c.icon}</button>`).join('')}</div>
        <p class="score" style="margin:0">${T(`Đã hoàn thành ${Object.keys(cn.solved).length}/${CONS.length} chòm sao`, `Completed ${Object.keys(cn.solved).length}/${CONS.length}`)}</p>
        <div class="toggle-row" style="justify-content:flex-start"><button id="cnHint" class="btn" type="button">${STR.hint[lang === 'en' ? 1 : 0]}</button><button id="cnNext" class="btn main" type="button">${STR.next[lang === 'en' ? 1 : 0]}</button></div>`;
      root.querySelectorAll('.con-chip').forEach((b) => { const c = CONS[+b.dataset.ci]; b.title = cn.solved[c.id] ? L(c)[0] : '?'; });
      $('cnHint').onclick = () => { const c = CONS[cn.idx], left = c.edges.filter(([a, b]) => !cn.done.includes(ekey(a, b))); if (left.length) cn.hint = left[0]; };
      $('cnNext').onclick = () => { cancelSpeech(); const left = CONS.map((_, i) => i).filter((i) => !cn.solved[CONS[i].id] && i !== cn.idx); cnPick(left.length ? left[Math.floor(rand(0, left.length))] : (cn.idx + 1) % CONS.length); };
    }
    $('connBox').addEventListener('click', (e) => { const b = e.target.closest('[data-ci]'); if (!b) return; cancelSpeech(); cnPick(+b.dataset.ci); });
    function cnInfo(force) {
      const c = CONS[cn.idx], solved = cn.done.length === c.edges.length, key = lang + cn.idx + solved; if (key === cn.infoKey && !force) return; cn.infoKey = key;
      const d = L(c);
      if (!solved) infoBox($('info_conn'), { emo: '❓', title: T('Đố em: đây là chòm sao gì?', 'Guess: which constellation is this?'), sub: T(`${c.stars.length} ngôi sao, ${c.edges.length} nét nối`, `${c.stars.length} stars, ${c.edges.length} lines`), rows: [[T('Gợi ý', 'Clue'), d[2]]], notes: [['tip', T('💡 Chòm sao là những ngôi sao mà người xưa tưởng tượng nối lại thành hình con vật, đồ vật hay nhân vật.', '💡 Constellations are star patterns people long ago imagined as animals, objects or heroes.')]] });
      else infoBox($('info_conn'), { emo: c.icon, title: d[0], sub: T('🎉 Em đã nối xong!', '🎉 You did it!'), rows: [[T('Hình dạng', 'Shape'), d[1]], [T('Thấy rõ khi', 'Best seen'), d[2]]], notes: [['fun', '✨ ' + d[3]]] });
      setText('hud_conn', solved ? `🎉 ${d[0]}` : T('✨ Nối các ngôi sao để hiện ra chòm sao', '✨ Join the stars to reveal the constellation'));
    }
    TABS.conn = { frame: cnFrame, refresh() { cnRender(); cn.infoKey = ''; cnInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_conn'), {
      vi: [
        { q: 'Chòm sao nào có hình chữ W?', a: ['Tiên Hậu (Cassiopeia)', 'Bắc Đẩu', 'Lạp Hộ', 'Bọ Cạp'], why: 'Năm sao của Tiên Hậu xếp thành chữ W hoặc M.' },
        { q: 'Ba ngôi sao thẳng hàng là "thắt lưng" của chòm nào?', a: ['Lạp Hộ', 'Thiên Nga', 'Sư Tử', 'Song Tử'], why: 'Đai Lạp Hộ gồm Alnitak, Alnilam, Mintaka.' },
        { q: 'Chòm Bắc Đẩu có hình gì?', a: ['Cái gáo múc nước', 'Con cá', 'Cây đàn', 'Ngôi nhà'], why: 'Bảy ngôi sao tạo thành cái gáo có cán dài.' },
        { q: 'Trái tim đỏ của chòm Bọ Cạp là sao nào?', a: ['Antares', 'Vega', 'Sirius', 'Polaris'], why: 'Antares là siêu sao khổng lồ màu đỏ.' },
        { q: '"Tam giác mùa hè" gồm những sao nào?', a: ['Vega, Deneb, Altair', 'Sirius, Rigel, Betelgeuse', 'Castor, Pollux, Regulus', 'Polaris, Dubhe, Merak'], why: 'Ba sao sáng của Thiên Cầm, Thiên Nga và Thiên Ưng.' }
      ],
      en: [
        { q: 'Which constellation is shaped like a W?', a: ['Cassiopeia', 'The Big Dipper', 'Orion', 'Scorpius'], why: 'Cassiopeia’s five stars make a W or M.' },
        { q: 'Three stars in a row form whose belt?', a: ['Orion', 'Cygnus', 'Leo', 'Gemini'], why: 'Alnitak, Alnilam and Mintaka are Orion’s Belt.' },
        { q: 'What does the Big Dipper look like?', a: ['A ladle', 'A fish', 'A harp', 'A house'], why: 'Seven stars make a long-handled ladle.' },
        { q: 'What is the red heart of Scorpius?', a: ['Antares', 'Vega', 'Sirius', 'Polaris'], why: 'Antares is a red supergiant.' },
        { q: 'Which stars make the Summer Triangle?', a: ['Vega, Deneb, Altair', 'Sirius, Rigel, Betelgeuse', 'Castor, Pollux, Regulus', 'Polaris, Dubhe, Merak'], why: 'The brightest stars of Lyra, Cygnus and Aquila.' }
      ]
    }));

    /* =====================================================================
       3. TÌM SAO BẮC CỰC
       ===================================================================== */
    const PSTEPS = [
      { vi: ['Nhìn về hướng Bắc, tìm cái Gáo', 'Tìm 7 ngôi sao sáng xếp hình cái gáo múc nước: chòm Bắc Đẩu.'], en: ['Face north and find the Dipper', 'Look for seven bright stars shaped like a ladle: the Big Dipper.'] },
      { vi: ['Tìm hai sao chỉ cực', 'Hai sao ở thành ngoài miệng gáo là Thiên Tuyền (Merak) và Thiên Xu (Dubhe).'], en: ['Find the pointer stars', 'The two stars on the outer edge of the bowl are Merak and Dubhe.'] },
      { vi: ['Kéo dài khoảng 5 lần', 'Kẻ một đường từ Thiên Tuyền qua Thiên Xu rồi kéo dài thêm khoảng 5 lần khoảng cách đó.'], en: ['Extend about five times', 'Draw a line from Merak through Dubhe and carry on about five times that gap.'] },
      { vi: ['Gặp Sao Bắc Cực', 'Ngôi sao sáng vừa phải ở đó là Sao Bắc Cực, nằm ở đầu cán của chòm Tiểu Hùng.'], en: ['Meet Polaris', 'The moderately bright star there is Polaris, at the end of the Little Dipper’s handle.'] },
      { vi: ['Cách khác: dùng chữ W', 'Khi Bắc Đẩu ở thấp (mùa thu), tìm chòm Tiên Hậu hình chữ W ở phía đối diện. Sao Bắc Cực nằm giữa hai chòm.'], en: ['Another way: the W', 'When the Dipper is low (autumn), find Cassiopeia’s W on the other side. Polaris lies between them.'] }
    ];
    let pl = { step: 0, place: 'hn', month: 4, hour: 21, t: 0, trails: false, playing: false, infoKey: '' };
    const plC = mk('c_polar', (w) => clamp(w * .62, 300, 520));
    function plFrame(dt) {
      const { w, h, ctx } = plC; if (!w) return;
      pl.t += dt;
      if (pl.playing) { pl.hour += dt * .9; if (pl.hour > 30) pl.hour = 18; }
      const lat = PLACES[pl.place], o = { az0: 0, alt0: lat + 15, fov: 104, month: pl.month, hour: pl.hour, place: pl.place };
      const hl = pl.step === 4 ? ['cas', 'dipper'] : pl.step >= 3 ? ['dipper', 'umi'] : ['dipper'];
      const R = drawSkyView(o, ctx, w, h, { lines: false, names: false, trails: pl.trails, highlight: hl });
      const P = (id) => R.P(S[id][0], S[id][1]);
      const pol = P('polaris'), du = P('dubhe'), me = P('merak');
      if (pl.step >= 1 && du && me) { for (const p of [du, me]) { ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(p.x, p.y, 12 + Math.sin(clock * 6) * 2, 0, TAU); ctx.stroke(); } label(ctx, T('Thiên Xu', 'Dubhe'), du.x + 16, du.y - 12, '#fbcfe8', 11, 'left'); label(ctx, T('Thiên Tuyền', 'Merak'), me.x + 16, me.y + 12, '#fbcfe8', 11, 'left'); }
      if (pl.step >= 2 && du && me && pol) {
        const k = pl.step === 2 ? clamp(pl.t / 2, 0, 1) : 1, tx = lerp(du.x, pol.x, k), ty = lerp(du.y, pol.y, k);
        ctx.save(); ctx.setLineDash([8, 7]); ctx.lineDashOffset = -clock * 30; ctx.strokeStyle = '#fde047'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(me.x, me.y); ctx.lineTo(tx, ty); ctx.stroke(); ctx.restore();
        const gap = Math.hypot(du.x - me.x, du.y - me.y), ux = (pol.x - du.x) / Math.hypot(pol.x - du.x, pol.y - du.y), uy = (pol.y - du.y) / Math.hypot(pol.x - du.x, pol.y - du.y);
        for (let i = 1; i <= 5; i++) { const px = du.x + ux * gap * i * Math.hypot(pol.x - du.x, pol.y - du.y) / (gap * 5), py = du.y + uy * gap * i * Math.hypot(pol.x - du.x, pol.y - du.y) / (gap * 5); if ((i / 5) <= k + .01) { ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(px, py, 3, 0, TAU); ctx.fill(); label(ctx, `×${i}`, px + 10, py - 8, '#fde68a', 10.5); } }
      }
      if (pl.step >= 3 && pol) {
        const gg = ctx.createRadialGradient(pol.x, pol.y, 0, pol.x, pol.y, 34); gg.addColorStop(0, 'rgba(253,224,71,.6)'); gg.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(pol.x, pol.y, 34, 0, TAU); ctx.fill();
        ctx.font = emojiFont(18); ctx.textAlign = 'center'; ctx.fillText('⭐', pol.x, pol.y - 26);
        label(ctx, T('Sao Bắc Cực', 'North Star'), pol.x, pol.y + 24, '#fef08a', 13);
        const hz = R.P ? proj(R.cam, vAz(0, 0), R.cx, R.cy, R.sc) : null;
        if (hz) { ctx.strokeStyle = 'rgba(134,239,172,.8)'; ctx.lineWidth = 2; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(pol.x, pol.y); ctx.lineTo(hz.x, hz.y); ctx.stroke(); ctx.setLineDash([]); label(ctx, T(`cao ≈ ${Math.round(lat)}°`, `≈ ${Math.round(lat)}° high`), (pol.x + hz.x) / 2 + 12, (pol.y + hz.y) / 2, '#bbf7d0', 12, 'left'); }
      }
      if (pl.step === 4) { const c = P('gamcas'); if (c) label(ctx, T('chữ W', 'the W'), c.x, c.y - 20, '#fef08a', 12); }
      textLight(ctx, `🕗 ${hourTxt(pl.hour)} · ${T('tháng', 'month')} ${pl.month}`, 12, 18, '#e0e7ff', 12.5, 'left', 900);
      plInfo();
    }
    function plInfo(force) {
      const key = [lang, pl.step, pl.place].join('|'); if (key === pl.infoKey && !force) return; pl.infoKey = key;
      root.querySelectorAll('#plSteps button').forEach((b, i) => { b.setAttribute('aria-pressed', String(i === pl.step)); b.querySelector('span').textContent = L(PSTEPS[i])[0]; });
      const d = L(PSTEPS[pl.step]), lat = PLACES[pl.place];
      infoBox($('info_polar'), {
        emo: '🧭', title: d[0], sub: T(`Bước ${pl.step + 1}/5`, `Step ${pl.step + 1}/5`),
        rows: [[T('Làm thế nào?', 'How?'), d[1]], [T('Độ cao', 'Height'), T(`Ở ${L({ vi: { hn: 'Hà Nội', hue: 'Huế', hcm: 'TP. Hồ Chí Minh' }[pl.place], en: { hn: 'Hanoi', hue: 'Hue', hcm: 'Ho Chi Minh City' }[pl.place] })}, Sao Bắc Cực cao khoảng ${Math.round(lat)}° so với chân trời, đúng bằng vĩ độ nơi đó.`, `From ${{ hn: 'Hanoi', hue: 'Hue', hcm: 'Ho Chi Minh City' }[pl.place]}, Polaris is about ${Math.round(lat)}° above the horizon, equal to the latitude.`)]],
        notes: [['fun', T('✨ Cả bầu trời quay quanh Sao Bắc Cực. Bật "Vệt sao" rồi "Cho trời quay" để thấy các vòng tròn quanh nó!', '✨ The whole sky turns around Polaris. Turn on “Star trails” and “Run time” to see circles around it!')], ['tip', T('💡 Ở Việt Nam, Bắc Đẩu rõ nhất vào tối mùa xuân. Mùa thu nó xuống thấp, hãy dùng chữ W của Tiên Hậu.', '💡 From Vietnam the Dipper is best on spring evenings. In autumn it’s low, so use Cassiopeia’s W.')]]
      });
      setText('hud_polar', `🧭 ${T('Bước', 'Step')} ${pl.step + 1}: ${d[0]}`);
    }
    $('plSteps').innerHTML = PSTEPS.map((_, i) => `<button type="button" data-s="${i}" aria-pressed="false"><b>${i + 1}</b><span></span></button>`).join('');
    $('plSteps').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (!b) return; cancelSpeech(); pl.step = +b.dataset.s; pl.t = 0; if (pl.step === 4) { pl.month = 10; $('plMonth').value = '10'; } else if (pl.month === 10 && pl.step < 4) { pl.month = 4; $('plMonth').value = '4'; } plInfo(true); });
    $('plMonth').addEventListener('input', () => { pl.month = +$('plMonth').value; setText('plMonthTxt', T(`Tháng ${pl.month}`, `Month ${pl.month}`)); });
    root.querySelectorAll('[data-pplace]').forEach((b) => b.addEventListener('click', () => { pl.place = b.dataset.pplace; pressGroup('[data-pplace]', 'pplace', pl.place); plInfo(true); }));
    $('plTrails').onclick = () => { pl.trails = !pl.trails; $('plTrails').setAttribute('aria-pressed', String(pl.trails)); };
    $('plPlay').onclick = () => { pl.playing = !pl.playing; $('plPlay').textContent = pl.playing ? STR.pause[lang === 'en' ? 1 : 0] : STR.play[lang === 'en' ? 1 : 0]; };
    TABS.polar = { frame: plFrame, refresh() { $('plPlay').textContent = pl.playing ? STR.pause[lang === 'en' ? 1 : 0] : STR.play[lang === 'en' ? 1 : 0]; setText('plMonthTxt', T(`Tháng ${pl.month}`, `Month ${pl.month}`)); pl.infoKey = ''; plInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_polar'), {
      vi: [
        { q: 'Sao Bắc Cực giúp ta tìm hướng nào?', a: ['Hướng Bắc', 'Hướng Nam', 'Hướng Đông', 'Hướng Tây'], why: 'Nó nằm gần như ngay phía trên cực Bắc của Trái Đất.' },
        { q: 'Hai "sao chỉ cực" thuộc chòm sao nào?', a: ['Bắc Đẩu', 'Lạp Hộ', 'Bọ Cạp', 'Thiên Nga'], why: 'Thiên Tuyền và Thiên Xu ở miệng gáo Bắc Đẩu.' },
        { q: 'Từ hai sao chỉ cực, kéo dài khoảng mấy lần thì tới Sao Bắc Cực?', a: ['Khoảng 5 lần', '1 lần', '20 lần', '100 lần'], why: 'Khoảng 5 lần khoảng cách giữa hai sao.' },
        { q: 'Ở Hà Nội, Sao Bắc Cực cao khoảng bao nhiêu độ?', a: ['Khoảng 21°', 'Khoảng 90°', 'Khoảng 0°', 'Khoảng 60°'], why: 'Độ cao của Sao Bắc Cực bằng vĩ độ nơi quan sát.' },
        { q: 'Vì sao Sao Bắc Cực gần như đứng yên trên trời?', a: ['Vì nó nằm gần trục quay của Trái Đất', 'Vì nó rất to', 'Vì nó ở gần ta nhất', 'Vì nó không có ánh sáng'], why: 'Cả bầu trời quay quanh trục đi qua gần Sao Bắc Cực.' },
        { q: 'Mùa thu khi Bắc Đẩu xuống thấp, có thể dùng chòm nào để tìm Sao Bắc Cực?', a: ['Tiên Hậu (chữ W)', 'Bọ Cạp', 'Đại Khuyển', 'Nam Thập Tự'], why: 'Tiên Hậu nằm ở phía đối diện Bắc Đẩu qua Sao Bắc Cực.' }
      ],
      en: [
        { q: 'Which direction does Polaris show?', a: ['North', 'South', 'East', 'West'], why: 'It sits almost directly above Earth’s North Pole.' },
        { q: 'The two pointer stars belong to…', a: ['The Big Dipper', 'Orion', 'Scorpius', 'Cygnus'], why: 'Merak and Dubhe form the Dipper’s bowl edge.' },
        { q: 'Extend the pointer line about how many times?', a: ['About 5', '1', '20', '100'], why: 'About five times the gap between them.' },
        { q: 'How high is Polaris from Hanoi?', a: ['About 21°', 'About 90°', 'About 0°', 'About 60°'], why: 'Polaris’s height equals your latitude.' },
        { q: 'Why does Polaris barely move?', a: ['It’s near Earth’s spin axis', 'It’s huge', 'It’s the closest star', 'It has no light'], why: 'The sky turns around an axis passing near Polaris.' },
        { q: 'In autumn, when the Dipper is low, use…', a: ['Cassiopeia (the W)', 'Scorpius', 'Canis Major', 'The Southern Cross'], why: 'Cassiopeia is opposite the Dipper across Polaris.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'sky';
    root.querySelectorAll('.sky-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.sky-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('k-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.sky-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.sky-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.sky-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
