/* Epsilon Edu - Tool: Tieu tien thong minh (Smart with money): can hay muon, ba chiec hu, di cho
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.smartMoney = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "smartMoney";
  let activeCleanup = null;

  const CSS = `
.money-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.money-tool *{box-sizing:border-box}.money-tool button,.money-tool input{font:inherit}.money-tool button{cursor:pointer}.money-tool .hidden{display:none!important}
.money-tool button:focus-visible,.money-tool canvas:focus-visible,.money-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.money-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.money-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.money-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.money-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.money-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.money-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.money-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.money-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.money-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.money-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.money-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.money-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.money-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.money-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.money-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.money-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.money-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.money-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.money-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.money-panel{width:100%}.money-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.money-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.money-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.money-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.money-tool .card-head.compact{margin-bottom:9px}
.money-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.money-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.money-tool .btn,.money-tool .soft-btn,.money-tool .segmented button,.money-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.money-tool .btn:hover,.money-tool .soft-btn:hover,.money-tool .segmented button:hover,.money-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.money-tool .btn{padding:0 12px}.money-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.money-tool .segmented{display:flex;gap:7px;margin:0}.money-tool .segmented button{padding:0 13px}
.money-tool .segmented button[aria-pressed="true"],.money-tool .soft-btn[aria-pressed="true"],.money-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.money-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.money-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.money-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.money-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.money-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.money-tool .range-control input{width:100%;accent-color:#8b5cf6}.money-tool .range-control b{color:#7c3aed;font-size:13px}
.money-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.money-tool .soft-btn{padding:0 12px}
.money-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.money-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.money-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.money-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.money-tool .info-title{display:flex;align-items:center;gap:10px}.money-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.money-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.money-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.money-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.money-tool .facts{display:grid;gap:6px;margin-top:10px}.money-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.money-tool .facts b{color:#7c3aed;font-size:13.5px}.money-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.money-tool .fun,.money-tool .warn,.money-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.money-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.money-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.money-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.money-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.money-tool .state-big.up{color:#0f766e}.money-tool .state-big.down{color:#b45309}
.money-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.money-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.money-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.money-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.money-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.money-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.money-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.money-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.money-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.money-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.money-tool .qopt:hover{filter:brightness(.985)}.money-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.money-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.money-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.money-tool .qfb,.money-tool .score{font-size:13px;font-weight:900}.money-tool .qfb.ok{color:#15803d}.money-tool .qfb.no{color:#be123c}.money-tool .score{color:#7c3aed}
.money-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.money-grid{grid-template-columns:1fr;align-items:start}.money-side{grid-template-rows:auto auto;height:auto}.money-tool .control-grid{grid-template-columns:1fr}.money-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.money-hero{flex-wrap:wrap;padding:12px}.money-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.money-tabs{grid-template-columns:1fr}.money-tabs .tab{min-height:40px}.money-card{padding:11px;border-radius:18px}.money-tool .card-head{align-items:flex-start;flex-direction:column}.money-tool .head-actions{width:100%;justify-content:space-between}.money-tool .head-actions .segmented{flex:1;min-width:0}.money-tool .head-actions .segmented button{flex:1;padding:0 8px}.money-tool .qopts{grid-template-columns:1fr}.money-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.money-tool *{transition:none!important}}

.money-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.money-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.money-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.money-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.money-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.money-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.money-tool .checklist{display:grid;gap:6px;margin-top:10px}
.money-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.money-tool .checklist .ok{color:#15803d}.money-tool .checklist .no{color:#be123c}.money-tool .checklist .wait{color:#94a3b8}
.money-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.money-tool .process span{flex:1}.money-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.money-tool .process .on{color:#0284c7}.money-tool .process i.on{color:#ec4899}
@media(max-width:640px){.money-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.money-tool .slider-pair{grid-template-columns:1fr}}

.money-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.money-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.money-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.money-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.money-tool .pulse-box{display:grid;gap:8px;margin-bottom:4px}
.money-tool .chip-grid{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.money-tool .food-btn{min-height:38px;padding:0 10px;border:1.5px solid #e2e8f0;border-radius:12px;background:#fff;color:#334155;font-weight:900;font-size:13px}
.money-tool .food-btn[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6)}
.money-tool .food-btn:disabled{opacity:.55;cursor:default}
.money-tool .pick-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.money-tool .need-btn,.money-tool .want-btn{min-height:56px;font-size:18px;color:#fff;border:0}
.money-tool .need-btn{background:linear-gradient(90deg,#22c55e,#16a34a)}.money-tool .want-btn{background:linear-gradient(90deg,#f472b6,#db2777)}
.money-tool .note-btn{min-height:42px;padding:0 14px;border:0;border-radius:8px;color:#fff;font-weight:900;font-size:14px;box-shadow:inset 0 0 0 3px rgba(255,255,255,.4)}
.money-tool .opt-col{display:grid;gap:6px}.money-tool .opt-col .soft-btn{min-height:42px}
.money-tool .label-hint{margin:8px 2px 0;color:#64748b;font-size:13px;font-weight:800}
.money-tool .btn:disabled{opacity:.5;cursor:not-allowed;transform:none}

.money-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.money-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="money-tool" data-tool-root>
  <div class="money-hero">
    <div class="money-hero-icon" aria-hidden="true">💰</div>
    <div>
      <p class="money-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="money-lead" data-t="lead"></p>
    </div>
    <div class="money-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="mAudioNotice" class="money-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="money-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="need" data-t="tab_need"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="pig" data-t="tab_pig"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="mkt" data-t="tab_mkt"></button>
  </div>
  <section id="m-need" class="money-panel" role="tabpanel">
    <div class="money-grid">
      <article class="money-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_need"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_need" role="img" data-ta="cv_need"></canvas></div>
        <p id="hud_need" class="hud" aria-live="polite"></p>
      </article>
      <div class="money-side">
        <aside class="money-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_need"></span><h2 data-t="sh_need"></h2></div></div>
          <div id="needBox" class="pulse-box"></div>
          <div id="info_need" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_need" class="money-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="m-pig" class="money-panel hidden" role="tabpanel">
    <div class="money-grid">
      <article class="money-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_pig"></h2></div>
          <div class="head-actions"><button id="pgReset" class="btn" type="button" data-t="reset"></button><button id="pgAuto" class="soft-btn" type="button" aria-pressed="false" data-t="auto"></button><button id="pgWeek" class="btn main" type="button" data-t="week"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_pig" role="img" data-ta="cv_pig"></canvas></div>
        <p id="hud_pig" class="hud" aria-live="polite"></p>
        <div id="pgGoals" class="chip-grid" role="group" data-ta="goalL"></div>
        <div class="slider-pair">
          <label class="range-control"><span data-t="pocketL"></span><input id="pgPocket" type="range" min="10000" max="50000" value="20000" step="5000"><b id="pgPocketTxt"></b></label>
          <label class="range-control"><span data-t="saveL"></span><input id="pgSave" type="range" min="0" max="100" value="50" step="10"><b id="pgSaveTxt"></b></label>
          <label class="range-control"><span data-t="shareL"></span><input id="pgShare" type="range" min="0" max="50" value="10" step="10"><b id="pgShareTxt"></b></label>
        </div>
      </article>
      <div class="money-side">
        <aside class="money-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_pig"></span><h2 data-t="sh_pig"></h2></div></div>
          
          <div id="info_pig" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_pig" class="money-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="m-mkt" class="money-panel hidden" role="tabpanel">
    <div class="money-grid">
      <article class="money-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_mkt"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_mkt" role="img" data-ta="cv_mkt"></canvas></div>
        <p id="hud_mkt" class="hud" aria-live="polite"></p>
        <p class="label-hint" data-t="pickL"></p>
        <div id="mkGoods" class="chip-grid"></div>
      </article>
      <div class="money-side">
        <aside class="money-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_mkt"></span><h2 data-t="sh_mkt"></h2></div></div>
          <div id="mktBox" class="pulse-box"></div>
          <div id="info_mkt" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_mkt" class="money-card quiz-card"></article>
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
      kicker: ['Epsilon Edu · Kỹ năng sống', 'Epsilon Edu · Life skills'],
      title: ['Tiêu tiền thông minh', 'Smart With Money'],
      lead: ['Phân biệt thứ mình cần và thứ mình muốn, chia tiền vào 3 chiếc hũ để tiết kiệm, rồi tự đi chợ với số tiền có hạn.', 'Tell needs from wants, split your money into three jars to save, then go shopping on a budget.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Thử ngay', 'Try it'],
      tab_need: ['🤔 Cần hay muốn?', '🤔 Need or want?'], h_need: ['Xếp vào giỏ CẦN hay MUỐN', 'Sort into NEED or WANT'],
      cv_need: ['Hai chiếc giỏ Cần và Muốn, từng món đồ xuất hiện để em phân loại', 'Two baskets, Need and Want; items appear for you to sort'],
      se_need: ['Thử thách', 'Challenge'], sh_need: ['Món này em cần hay muốn?', 'Do you need it or want it?'],
      tab_pig: ['🐷 Ba chiếc hũ', '🐷 Three jars'], h_pig: ['Tiết kiệm để mua món đồ mơ ước', 'Saving for something special'],
      cv_pig: ['Ba hũ tiền: tiết kiệm, chi tiêu, chia sẻ, và thanh tiến độ tới mục tiêu', 'Three money jars: save, spend, share, with progress to your goal'],
      se_pig: ['Kế hoạch', 'Plan'], sh_pig: ['Bao lâu thì đủ tiền?', 'How long until you can afford it?'],
      tab_mkt: ['🛒 Đi chợ', '🛒 Shopping'], h_mkt: ['Nấu bữa tối với 100.000 đồng', 'Dinner on 100,000 dong'],
      cv_mkt: ['Giỏ đi chợ, hóa đơn và số tiền còn lại', 'A shopping basket, the bill and money left'],
      se_mkt: ['Thanh toán', 'Paying'], sh_mkt: ['Trả tiền và nhận tiền thừa', 'Pay and get your change'],
      pocketL: ['Tiền tiêu vặt mỗi tuần', 'Pocket money each week'], saveL: ['Phần trăm bỏ vào hũ Tiết kiệm', 'Percent into the Save jar'], shareL: ['Phần trăm bỏ vào hũ Chia sẻ', 'Percent into the Share jar'], goalL: ['Món đồ mơ ước', 'Your goal'],
      week: ['➕ Qua 1 tuần', '➕ Next week'], auto: ['▶ Tự động', '▶ Auto'], reset: ['↺ Làm lại', '↺ Start over'], pickL: ['Bấm để cho vào giỏ (bấm lần nữa để bỏ ra)', 'Tap to add to the basket (tap again to remove)']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    const emo = (ctx, e, x, y, px) => { ctx.font = emojiFont(px); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e, x, y); };
    const vnd = (n) => `${Math.round(n).toLocaleString(lang === 'en' ? 'en-US' : 'vi-VN')} ${lang === 'en' ? 'VND' : 'đ'}`;
    const NOTE_COL = { 10000: '#c8a24a', 20000: '#3b82f6', 50000: '#db2777', 100000: '#16a34a', 200000: '#c2410c', 500000: '#0891b2' };
    function note(ctx, x, y, w, val, rot = 0) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.fillStyle = NOTE_COL[val] || '#94a3b8'; rr(ctx, -w / 2, -w * .24, w, w * .48, 4); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1; rr(ctx, -w / 2 + 3, -w * .24 + 3, w - 6, w * .48 - 6, 3); ctx.stroke();
      textLight(ctx, `${val / 1000}K`, 0, 0, '#fff', Math.max(8, w * .2), 'center', 900);
      ctx.restore();
    }

    /* =====================================================================
       1. CẦN HAY MUỐN?
       ===================================================================== */
    const ITEMS = [
      { e: '📚', k: 'need', vi: ['Sách vở đi học', 'Cần để học tập mỗi ngày.'], en: ['School books', 'You need them to learn every day.'] },
      { e: '🍚', k: 'need', vi: ['Cơm, rau cho bữa ăn', 'Ai cũng cần ăn uống đủ chất để sống khỏe.'], en: ['Rice and vegetables for meals', 'Everyone needs healthy food.'] },
      { e: '💊', k: 'need', vi: ['Thuốc khi bị ốm', 'Cần để chữa bệnh, theo hướng dẫn của bác sĩ.'], en: ['Medicine when sick', 'Needed to get better, as a doctor advises.'] },
      { e: '🧥', k: 'need', vi: ['Áo ấm khi trời rét', 'Giữ ấm cơ thể là nhu cầu thiết yếu.'], en: ['A warm coat in cold weather', 'Keeping warm is a basic need.'] },
      { e: '👟', k: 'need', vi: ['Dép đi học khi dép cũ đã hỏng', 'Dép hỏng thì cần mua đôi mới để đi học an toàn.'], en: ['School shoes when the old ones broke', 'Broken shoes need replacing so you can walk safely.'] },
      { e: '💧', k: 'need', vi: ['Nước uống sạch', 'Cơ thể cần nước mỗi ngày.'], en: ['Clean drinking water', 'Your body needs water daily.'] },
      { e: '✏️', k: 'need', vi: ['Bút chì khi bút cũ đã hết', 'Đồ dùng học tập cần thiết.'], en: ['A pencil when yours is used up', 'A school essential.'] },
      { e: '🤖', k: 'want', vi: ['Đồ chơi siêu nhân mới', 'Có thì vui, nhưng không có em vẫn sống và học tốt.'], en: ['A new robot toy', 'Fun to have, but you’re fine without it.'] },
      { e: '🍭', k: 'want', vi: ['Kẹo, bánh ngọt', 'Ăn ngon nhưng không cần thiết, ăn nhiều còn hại răng.'], en: ['Sweets and cakes', 'Tasty, not necessary, and too much harms teeth.'] },
      { e: '🧋', k: 'want', vi: ['Cốc trà sữa', 'Là món thích ăn, không phải thứ cần.'], en: ['A bubble tea', 'A treat, not a need.'] },
      { e: '🎮', k: 'want', vi: ['Thẻ nạp game', 'Giải trí là muốn, không phải cần.'], en: ['A game top-up card', 'Entertainment is a want.'] },
      { e: '🎒', k: 'want', vi: ['Ba lô mới khi ba lô cũ còn tốt', 'Ba lô cũ còn dùng được thì cái mới chỉ là muốn.'], en: ['A new backpack when the old one is fine', 'If the old one works, a new one is a want.'] },
      { e: '📱', k: 'want', vi: ['Điện thoại đời mới nhất', 'Rất hấp dẫn nhưng không cần thiết với học sinh tiểu học.'], en: ['The newest phone', 'Tempting, but not a need for a primary pupil.'] },
      { e: '🌟', k: 'want', vi: ['Bộ sticker dễ thương', 'Đồ trang trí vui mắt, là muốn.'], en: ['Cute stickers', 'Fun decoration: a want.'] }
    ];
    let nd = { order: [], pos: 0, need: [], want: [], fly: null, score: 0, total: 0, msg: null, infoKey: '' };
    nd.order = ITEMS.map((_, i) => i).sort(() => Math.random() - .5);
    const ndC = mk('c_need', (w) => clamp(w * .55, 270, 450));
    function drawNeed(dt) {
      const { w, h, ctx } = ndC;
      if (!w) return;
      ctx.fillStyle = '#fefce8'; ctx.fillRect(0, 0, w, h);
      const bw = w * .36, bh = h * .38, by = h * .56;
      for (const [k, x, col, lbl] of [['need', w * .25, '#16a34a', T('CẦN', 'NEED')], ['want', w * .75, '#db2777', T('MUỐN', 'WANT')]]) {
        ctx.fillStyle = col + '22'; ctx.strokeStyle = col; ctx.lineWidth = 3; rr(ctx, x - bw / 2, by, bw, bh, 16); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, by, bw * .3, Math.PI, TAU); ctx.stroke();
        textLight(ctx, lbl, x, by + bh + 14 > h ? by - 10 : by + 22, col, 16, 'center', 900);
        (nd[k]).forEach((idx, j) => emo(ctx, ITEMS[idx].e, x - bw * .36 + (j % 5) * bw * .18, by + bh * .48 + Math.floor(j / 5) * bh * .26, Math.min(26, bw * .14)));
      }
      if (nd.fly) {
        nd.fly.t += dt * 2.5; const k = ease(Math.min(1, nd.fly.t)), tx = nd.fly.to === 'need' ? w * .25 : w * .75;
        emo(ctx, ITEMS[nd.fly.idx].e, lerp(w / 2, tx, k), lerp(h * .25, by + bh * .4, k) - Math.sin(k * Math.PI) * h * .1, 44 - k * 18);
        if (nd.fly.t >= 1) { nd[nd.fly.to].push(nd.fly.idx); nd.fly = null; }
      } else if (nd.pos < nd.order.length) {
        const it = ITEMS[nd.order[nd.pos]];
        ctx.fillStyle = '#fff'; ctx.strokeStyle = '#e9d5ff'; ctx.lineWidth = 2; rr(ctx, w / 2 - w * .2, h * .06, w * .4, h * .38, 16); ctx.fill(); ctx.stroke();
        emo(ctx, it.e, w / 2, h * .2, Math.min(56, h * .14));
        ctx.font = '900 13px system-ui'; const name = L({ vi: it.vi, en: it.en })[0];
        const words = name.split(' '); let line = '', lines = []; for (const wd of words) { const t = line ? line + ' ' + wd : wd; if (ctx.measureText(t).width > w * .36 && line) { lines.push(line); line = wd; } else line = t; } lines.push(line);
        lines.slice(0, 2).forEach((ln, i) => textLight(ctx, ln, w / 2, h * .34 + i * 16, '#334155', w < 420 ? 11.5 : 13, 'center', 900));
      } else textLight(ctx, T('🎉 Xếp xong tất cả!', '🎉 All sorted!'), w / 2, h * .25, '#15803d', 18, 'center', 900);
    }
    function ndRender() {
      const done = nd.pos >= nd.order.length;
      $('needBox').innerHTML = done ? `<p class="fun" style="margin:0">${T(`🎉 Em đã xếp đúng ${nd.score}/${nd.total} món!`, `🎉 You sorted ${nd.score}/${nd.total} correctly!`)}</p><button id="ndAgain" class="btn main" type="button">${T('Chơi lại', 'Play again')}</button>`
        : `<div class="pick-row"><button type="button" class="btn need-btn" data-nk="need">✅ ${T('CẦN', 'NEED')}</button><button type="button" class="btn want-btn" data-nk="want">💗 ${T('MUỐN', 'WANT')}</button></div>
          <p class="score" style="margin:0">${T(`Đúng ${nd.score}/${nd.total} – còn ${nd.order.length - nd.pos} món`, `${nd.score}/${nd.total} right – ${nd.order.length - nd.pos} left`)}</p>
          ${nd.msg ? `<p class="${nd.msg[0]}" style="margin:0"></p>` : ''}`;
      if (nd.msg && !done) $('needBox').querySelectorAll('p')[1].textContent = nd.msg[1];
      const ag = $('ndAgain'); if (ag) ag.onclick = () => { nd.order = ITEMS.map((_, i) => i).sort(() => Math.random() - .5); nd.pos = 0; nd.need = []; nd.want = []; nd.score = 0; nd.total = 0; nd.msg = null; ndRender(); };
    }
    $('needBox').addEventListener('click', (e) => {
      const b = e.target.closest('[data-nk]'); if (!b || nd.fly || nd.pos >= nd.order.length) return; cancelSpeech();
      const idx = nd.order[nd.pos], it = ITEMS[idx], ok = it.k === b.dataset.nk, d = L({ vi: it.vi, en: it.en });
      nd.total++; if (ok) nd.score++;
      nd.msg = [ok ? 'fun' : 'warn', `${ok ? '🎉' : '🤔'} ${d[0]}: ${it.k === 'need' ? T('CẦN', 'NEED') : T('MUỐN', 'WANT')}. ${d[1]}`];
      nd.fly = { idx, to: it.k, t: 0 }; nd.pos++; ndRender();
    });
    function ndInfo() {
      if (nd.infoKey === lang) return; nd.infoKey = lang;
      infoBox($('info_need'), {
        emo: '🤔', title: T('Cần và muốn khác nhau thế nào?', 'Needs vs wants'),
        rows: [[T('CẦN', 'NEED'), T('Thứ không có thì không thể sống khỏe, an toàn, học tập được: ăn uống, quần áo, chỗ ở, sách vở, thuốc men.', 'Things you can’t live healthily, safely or learn without: food, clothes, a home, books, medicine.')], [T('MUỐN', 'WANT'), T('Thứ có thì vui, nhưng không có vẫn ổn: đồ chơi mới, quà vặt, trò chơi.', 'Things that are nice to have but you’re fine without: new toys, treats, games.')]],
        notes: [['tip', T('💡 Trước khi mua, hãy tự hỏi: "Mình cần hay chỉ muốn? Mình có thể đợi một tuần không?" Nếu sau một tuần vẫn thích thì mới nghĩ tiếp.', '💡 Before buying, ask: “Do I need it or just want it? Can I wait a week?” If you still want it after a week, think again.')], ['fun', T('✨ Muốn một thứ không có gì sai, chỉ cần lo cho cái cần trước.', '✨ Wanting things is fine; just take care of needs first.')]]
      });
    }
    TABS.need = { frame(dt) { drawNeed(dt); ndInfo(); setText('hud_need', T(`🧺 Cần: ${nd.need.length} món – Muốn: ${nd.want.length} món`, `🧺 Need: ${nd.need.length} – Want: ${nd.want.length}`)); }, refresh() { nd.infoKey = ''; ndInfo(); nd.msg = null; ndRender(); } };
    QUIZZES.push(makeQuiz($('quiz_need'), {
      vi: [
        { q: 'Thứ nào sau đây là "cần"?', a: ['Sách vở đi học', 'Đồ chơi mới', 'Trà sữa', 'Thẻ nạp game'], why: 'Sách vở cần cho việc học mỗi ngày.' },
        { q: 'Thứ nào sau đây là "muốn"?', a: ['Kẹo, bánh ngọt', 'Nước uống sạch', 'Thuốc khi ốm', 'Áo ấm mùa đông'], why: 'Kẹo ngon nhưng không cần thiết.' },
        { q: 'Trước khi mua một món đồ, em nên tự hỏi gì?', a: ['Mình cần hay chỉ muốn?', 'Bạn có món này chưa?', 'Món nào đắt nhất?', 'Không cần hỏi gì'], why: 'Câu hỏi này giúp em không tiêu tiền vội vàng.' },
        { q: 'Ba lô cũ còn tốt, mua ba lô mới là gì?', a: ['Muốn', 'Cần', 'Bắt buộc', 'Không biết được'], why: 'Còn dùng được thì cái mới chỉ là muốn.' },
        { q: '"Quy tắc đợi một tuần" giúp gì?', a: ['Tránh mua vì thích nhất thời', 'Mua được rẻ hơn', 'Làm món đồ tốt hơn', 'Không giúp gì'], why: 'Sau một tuần, nhiều khi em không còn muốn món đó nữa.' }
      ],
      en: [
        { q: 'Which is a need?', a: ['School books', 'A new toy', 'Bubble tea', 'A game card'], why: 'Books are needed for learning every day.' },
        { q: 'Which is a want?', a: ['Sweets and cakes', 'Clean water', 'Medicine when sick', 'A winter coat'], why: 'Sweets are tasty but not necessary.' },
        { q: 'Before buying something, ask yourself…', a: ['Do I need it or just want it?', 'Does my friend have one?', 'Which is most expensive?', 'Nothing'], why: 'It stops you spending in a rush.' },
        { q: 'A new backpack when the old one is fine is a…', a: ['Want', 'Need', 'Must', 'Can’t tell'], why: 'If it still works, the new one is a want.' },
        { q: 'How does the “wait a week” rule help?', a: ['It avoids buying on a whim', 'Things get cheaper', 'Things get better', 'It doesn’t'], why: 'After a week you often don’t want it anymore.' }
      ]
    }));

    /* =====================================================================
       2. BA CHIẾC HŨ: tiết kiệm – chi tiêu – chia sẻ
       ===================================================================== */
    const GOALS = [
      { e: '🖍️', price: 60000, vi: 'Hộp bút màu', en: 'Coloured pencils' }, { e: '📖', price: 80000, vi: 'Sách truyện', en: 'Story book' },
      { e: '⚽', price: 150000, vi: 'Quả bóng đá', en: 'Football' }, { e: '🧱', price: 300000, vi: 'Bộ xếp hình', en: 'Building set' }
    ];
    let pg = { week: 0, save: 0, spend: 0, share: 0, goal: 2, auto: false, acc: 0, coins: [], infoKey: '', reached: false };
    const pgC = mk('c_pig', (w) => clamp(w * .55, 270, 450));
    const pgPocket = () => +$('pgPocket').value, pgSave = () => +$('pgSave').value / 100, pgShare = () => +$('pgShare').value / 100;
    function pgWeek() {
      const m = pgPocket(), s = Math.round(m * pgSave()), sh = Math.round(m * Math.min(pgShare(), 1 - pgSave()));
      pg.week++; pg.save += s; pg.share += sh; pg.spend += m - s - sh;
      pg.coins.push({ t: 0, to: 0, v: s }, { t: -.15, to: 1, v: m - s - sh }, { t: -.3, to: 2, v: sh });
      if (!pg.reached && pg.save >= GOALS[pg.goal].price) pg.reached = true;
      pgInfo(true);
    }
    function drawPig(dt) {
      const { w, h, ctx } = pgC;
      if (!w) return;
      if (pg.auto) { pg.acc += dt; if (pg.acc > .8) { pg.acc = 0; pgWeek(); if (pg.reached || pg.week >= 60) { pg.auto = false; $('pgAuto').setAttribute('aria-pressed', 'false'); } } }
      ctx.fillStyle = '#fff7ed'; ctx.fillRect(0, 0, w, h);
      const G = GOALS[pg.goal], jw = Math.min(w * .22, h * .32), jh = jw * 1.3, jy = h * .9;
      const jars = [{ k: 'save', col: '#16a34a', v: pg.save, vi: 'Tiết kiệm', en: 'Save', e: '🐷' }, { k: 'spend', col: '#f59e0b', v: pg.spend, vi: 'Chi tiêu', en: 'Spend', e: '🛍️' }, { k: 'share', col: '#ec4899', v: pg.share, vi: 'Chia sẻ', en: 'Share', e: '💝' }];
      const maxV = Math.max(G.price, pg.save, pg.spend, pg.share, 1);
      jars.forEach((j, i) => {
        const x = w * (.2 + i * .3), fill = Math.min(1, j.v / maxV);
        ctx.fillStyle = j.col + '33'; rr(ctx, x - jw / 2, jy - jh * fill, jw, jh * fill, 8); ctx.fill();
        for (let k = 0; k < Math.min(12, Math.floor(fill * 12)); k++) note(ctx, x + Math.sin(k * 2.1) * jw * .2, jy - 10 - k * jh / 13, jw * .5, [10000, 20000, 50000][k % 3], Math.sin(k) * .3);
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - jw / 2, jy - jh); ctx.lineTo(x - jw / 2, jy); ctx.lineTo(x + jw / 2, jy); ctx.lineTo(x + jw / 2, jy - jh); ctx.stroke();
        ctx.fillStyle = j.col; rr(ctx, x - jw * .55, jy - jh - 8, jw * 1.1, 10, 4); ctx.fill();
        emo(ctx, j.e, x, jy - jh - 26, 20);
        textLight(ctx, L(j), x, jy - jh - 46, j.col, 12, 'center', 900);
        textLight(ctx, vnd(j.v), x, jy - jh * .5, '#1f2937', w < 420 ? 10.5 : 12, 'center', 900);
      });
      for (const c of pg.coins) { c.t += dt * 1.6; if (c.t < 0) continue; const x = w * (.2 + c.to * .3), k = Math.min(1, c.t); note(ctx, lerp(w / 2, x, k), lerp(h * .1, jy - jh * .6, k), Math.min(40, jw * .45), c.v >= 20000 ? 20000 : 10000, k * 3); }
      pg.coins = pg.coins.filter((c) => c.t < 1);
      // tiến độ mục tiêu
      const prog = Math.min(1, pg.save / G.price), bx = 14, bw = w - 28, byy = 18;
      ctx.fillStyle = '#e5e7eb'; rr(ctx, bx, byy, bw, 14, 7); ctx.fill(); ctx.fillStyle = prog >= 1 ? '#16a34a' : '#22c55e'; rr(ctx, bx, byy, Math.max(14, bw * prog), 14, 7); ctx.fill();
      textLight(ctx, `${G.e} ${L(G)}: ${vnd(Math.min(pg.save, G.price))} / ${vnd(G.price)}`, w / 2, byy + 30, '#334155', 12, 'center', 900);
      if (pg.reached) bubble(ctx, T(`🎉 Đủ tiền mua ${L(G).toLowerCase()} sau ${pg.week} tuần!`, `🎉 Enough for the ${L(G).toLowerCase()} after ${pg.week} weeks!`), w / 2, h * .2, 13, '#fff', '#15803d');
    }
    function pgInfo(force) {
      const m = pgPocket(), s = Math.round(m * pgSave()), sh = Math.round(m * Math.min(pgShare(), 1 - pgSave())), G = GOALS[pg.goal];
      const weeks = s > 0 ? Math.ceil(G.price / s) : Infinity;
      const key = [lang, m, s, sh, pg.goal, pg.week, pg.reached].join('|'); if (key === pg.infoKey && !force) return; pg.infoKey = key;
      setText('pgPocketTxt', vnd(m)); setText('pgSaveTxt', `${Math.round(pgSave() * 100)}% = ${vnd(s)}`); setText('pgShareTxt', `${Math.round(Math.min(pgShare(), 1 - pgSave()) * 100)}% = ${vnd(sh)}`);
      infoBox($('info_pig'), {
        emo: '🐷', title: T(`Mục tiêu: ${L(G)}`, `Goal: ${L(G)}`), sub: T(`Mỗi tuần: tiết kiệm ${vnd(s)}, chi tiêu ${vnd(m - s - sh)}, chia sẻ ${vnd(sh)}`, `Each week: save ${vnd(s)}, spend ${vnd(m - s - sh)}, share ${vnd(sh)}`),
        rows: [[T('Cần bao lâu?', 'How long?'), weeks === Infinity ? T('Chưa tiết kiệm đồng nào thì không bao giờ đủ!', 'If you save nothing, you’ll never get there!') : T(`Khoảng ${weeks} tuần (${G.price.toLocaleString('vi-VN')} ÷ ${s.toLocaleString('vi-VN')})`, `About ${weeks} weeks (${G.price.toLocaleString('en-US')} ÷ ${s.toLocaleString('en-US')})`)], [T('Đã qua', 'So far'), T(`${pg.week} tuần`, `${pg.week} weeks`)], [T('3 chiếc hũ', '3 jars'), T('Tiết kiệm: cho mục tiêu lớn. Chi tiêu: cho những thứ nhỏ hằng ngày. Chia sẻ: để tặng quà, giúp đỡ người khác.', 'Save: for big goals. Spend: for small everyday things. Share: for gifts and helping others.')]],
        notes: [['tip', T('💡 Thử tăng phần trăm tiết kiệm để thấy mục tiêu đến gần nhanh hơn thế nào!', '💡 Try saving a bigger percentage and see how much sooner you reach your goal!')]]
      });
    }
    ['pgPocket', 'pgSave', 'pgShare'].forEach((id) => $(id).addEventListener('input', () => pgInfo()));
    $('pgGoals').innerHTML = GOALS.map((g, i) => `<button type="button" class="food-btn" data-goal="${i}" aria-pressed="${i === pg.goal}">${g.e} <span></span></button>`).join('');
    $('pgGoals').addEventListener('click', (e) => { const b = e.target.closest('[data-goal]'); if (!b) return; pg.goal = +b.dataset.goal; pg.reached = pg.save >= GOALS[pg.goal].price; pressGroup('[data-goal]', 'goal', pg.goal); pgInfo(true); });
    $('pgWeek').onclick = () => { cancelSpeech(); pgWeek(); };
    $('pgAuto').onclick = () => { pg.auto = !pg.auto; $('pgAuto').setAttribute('aria-pressed', String(pg.auto)); };
    $('pgReset').onclick = () => { Object.assign(pg, { week: 0, save: 0, spend: 0, share: 0, coins: [], reached: false, auto: false }); $('pgAuto').setAttribute('aria-pressed', 'false'); pgInfo(true); };
    TABS.pig = { frame(dt) { drawPig(dt); setText('hud_pig', T(`🐷 Tuần ${pg.week} – hũ tiết kiệm có ${vnd(pg.save)}`, `🐷 Week ${pg.week} – Save jar: ${vnd(pg.save)}`)); }, refresh() { root.querySelectorAll('[data-goal]').forEach((b) => { const g = GOALS[+b.dataset.goal]; b.querySelector('span').textContent = `${L(g)} – ${vnd(g.price)}`; }); pg.infoKey = ''; pgInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_pig'), {
      vi: [
        { q: 'Hũ "Tiết kiệm" dùng để làm gì?', a: ['Để dành mua món đồ lớn sau này', 'Mua kẹo mỗi ngày', 'Cho bạn mượn', 'Không dùng'], why: 'Tiết kiệm giúp em đạt được mục tiêu lớn.' },
        { q: 'Mỗi tuần tiết kiệm 20.000 đ, bao lâu đủ 100.000 đ?', a: ['5 tuần', '2 tuần', '10 tuần', '20 tuần'], why: '100.000 ÷ 20.000 = 5.' },
        { q: 'Hũ "Chia sẻ" dùng để làm gì?', a: ['Tặng quà, giúp đỡ người khác', 'Mua đồ chơi', 'Mua trà sữa', 'Giấu đi'], why: 'Biết chia sẻ là một thói quen đẹp.' },
        { q: 'Muốn đạt mục tiêu nhanh hơn, em có thể làm gì?', a: ['Tiết kiệm nhiều hơn mỗi tuần', 'Tiêu hết tiền', 'Không tiết kiệm', 'Chọn món đắt hơn'], why: 'Mỗi tuần để dành nhiều hơn thì nhanh đủ tiền hơn.' },
        { q: 'Nhận được tiền mừng tuổi, cách dùng thông minh là gì?', a: ['Chia một phần tiết kiệm, một phần chi tiêu, một phần chia sẻ', 'Tiêu hết ngay hôm đó', 'Mua thật nhiều kẹo', 'Làm mất'], why: 'Chia vào 3 hũ giúp dùng tiền hợp lý.' }
      ],
      en: [
        { q: 'What is the Save jar for?', a: ['Saving up for something bigger', 'Sweets every day', 'Lending to friends', 'Nothing'], why: 'Saving helps you reach big goals.' },
        { q: 'Saving 20,000 a week, how long until 100,000?', a: ['5 weeks', '2 weeks', '10 weeks', '20 weeks'], why: '100,000 ÷ 20,000 = 5.' },
        { q: 'What is the Share jar for?', a: ['Gifts and helping others', 'Toys', 'Bubble tea', 'Hiding'], why: 'Sharing is a lovely habit.' },
        { q: 'How can you reach your goal sooner?', a: ['Save more each week', 'Spend it all', 'Save nothing', 'Pick something pricier'], why: 'Saving more each week gets you there faster.' },
        { q: 'A smart way to use Tet lucky money?', a: ['Split it: some to save, some to spend, some to share', 'Spend it all that day', 'Buy loads of sweets', 'Lose it'], why: 'Three jars help you use money wisely.' }
      ]
    }));

    /* =====================================================================
       3. ĐI CHỢ: ngân sách 100.000 đ, trả tiền và nhận tiền thừa
       ===================================================================== */
    const GOODS = [
      { id: 'rau', e: '🥬', g: 'veg', p: 8000, vi: 'Rau muống (1 bó)', en: 'Water spinach (bunch)' }, { id: 'cai', e: '🥦', g: 'veg', p: 10000, vi: 'Cải ngọt (1 bó)', en: 'Choy sum (bunch)' }, { id: 'cachua', e: '🍅', g: 'veg', p: 15000, vi: 'Cà chua (nửa cân)', en: 'Tomatoes (half kilo)' },
      { id: 'trung', e: '🥚', g: 'pro', p: 20000, vi: 'Trứng gà (6 quả)', en: 'Eggs (6)' }, { id: 'dauphu', e: '⬜', g: 'pro', p: 10000, vi: 'Đậu phụ (2 bìa)', en: 'Tofu (2 blocks)' }, { id: 'thit', e: '🥩', g: 'pro', p: 30000, vi: 'Thịt lợn (2 lạng)', en: 'Pork (200 g)' }, { id: 'ca', e: '🐟', g: 'pro', p: 35000, vi: 'Cá rô phi (1 con)', en: 'Tilapia (1 fish)' }, { id: 'tom', e: '🦐', g: 'pro', p: 50000, vi: 'Tôm (2 lạng)', en: 'Shrimp (200 g)' },
      { id: 'chuoi', e: '🍌', g: 'fruit', p: 25000, vi: 'Chuối (1 nải)', en: 'Bananas (bunch)' },
      { id: 'keo', e: '🍭', g: 'treat', p: 15000, vi: 'Kẹo mút (1 gói)', en: 'Lollipops (pack)' }, { id: 'ngot', e: '🥤', g: 'treat', p: 12000, vi: 'Nước ngọt (1 chai)', en: 'Soda (bottle)' }, { id: 'snack', e: '🍿', g: 'treat', p: 10000, vi: 'Bim bim (1 gói)', en: 'Crisps (bag)' }
    ];
    const BUDGET = 100000, NOTES = [10000, 20000, 50000, 100000];
    let mk2 = { cart: [], stage: 'shop', paid: [], changeOpts: [], changeAns: -1, infoKey: '' };
    const mkC = mk('c_mkt', (w) => clamp(w * .55, 270, 440));
    const total = () => mk2.cart.reduce((s, id) => s + GOODS.find((g) => g.id === id).p, 0);
    const paidSum = () => mk2.paid.reduce((s, v) => s + v, 0);
    function drawMkt() {
      const { w, h, ctx } = mkC;
      if (!w) return;
      ctx.fillStyle = '#fffbeb'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f97316'; for (let k = 0; k < 8; k++) { ctx.fillStyle = k % 2 ? '#fb923c' : '#fff7ed'; ctx.beginPath(); ctx.moveTo(k * w / 8, 0); ctx.lineTo((k + 1) * w / 8, 0); ctx.lineTo((k + 1) * w / 8, h * .08); ctx.quadraticCurveTo((k + .5) * w / 8, h * .14, k * w / 8, h * .08); ctx.fill(); }
      // giỏ
      const bx = w * .26, by = h * .6, bw = w * .4, bh = h * .3;
      ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.moveTo(bx - bw / 2, by); ctx.lineTo(bx + bw / 2, by); ctx.lineTo(bx + bw * .4, by + bh); ctx.lineTo(bx - bw * .4, by + bh); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#92400e'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(bx, by, bw * .35, Math.PI, TAU); ctx.stroke();
      ctx.strokeStyle = 'rgba(146,64,14,.5)'; ctx.lineWidth = 2; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(bx - bw / 2 + k * bw / 5, by); ctx.lineTo(bx - bw * .4 + k * bw * .16, by + bh); ctx.stroke(); }
      mk2.cart.forEach((id, i) => emo(ctx, GOODS.find((g) => g.id === id).e, bx - bw * .32 + (i % 5) * bw * .16, by - 8 - Math.floor(i / 5) * 24, 24));
      // hóa đơn
      const rx = w * .56, ry = h * .16, rw = w * .4, rh = h * .78;
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1.5; rr(ctx, rx, ry, rw, rh, 8); ctx.fill(); ctx.stroke();
      textLight(ctx, T('HÓA ĐƠN', 'RECEIPT'), rx + rw / 2, ry + 16, '#334155', 12, 'center', 900);
      const fs = w < 420 ? 9.5 : 11;
      mk2.cart.slice(0, 9).forEach((id, i) => { const g = GOODS.find((x) => x.id === id), y = ry + 36 + i * (fs + 6); let nm = L(g); ctx.font = `800 ${fs}px system-ui`; while (ctx.measureText(nm).width > rw * .58 && nm.length > 4) nm = nm.slice(0, -1); textLight(ctx, nm === L(g) ? nm : nm + '…', rx + 8, y, '#475569', fs, 'left', 800); textLight(ctx, (g.p / 1000) + 'K', rx + rw - 8, y, '#475569', fs, 'right', 900); });
      const t = total(), over = t > BUDGET;
      ctx.strokeStyle = '#cbd5e1'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(rx + 6, ry + rh - 52); ctx.lineTo(rx + rw - 6, ry + rh - 52); ctx.stroke(); ctx.setLineDash([]);
      textLight(ctx, T('Tổng', 'Total'), rx + 8, ry + rh - 38, '#1f2937', 12, 'left', 900); textLight(ctx, vnd(t), rx + rw - 8, ry + rh - 38, over ? '#dc2626' : '#1f2937', 12, 'right', 900);
      textLight(ctx, T('Còn lại', 'Left'), rx + 8, ry + rh - 18, '#16a34a', 12, 'left', 900); textLight(ctx, vnd(BUDGET - t), rx + rw - 8, ry + rh - 18, over ? '#dc2626' : '#16a34a', 12, 'right', 900);
      // ví tiền
      textLight(ctx, T('Ví của em:', 'Your wallet:'), 12, h * .2, '#334155', 12, 'left', 900);
      note(ctx, w * .14, h * .32, Math.min(70, w * .16), 100000, -.05);
      if (over) bubble(ctx, T('⚠️ Vượt quá số tiền rồi!', '⚠️ Over budget!'), bx, h * .45, 12, '#fff', '#be123c');
    }
    function mkCheck() {
      const gs = mk2.cart.map((id) => GOODS.find((g) => g.id === id).g), t = total();
      return { veg: gs.includes('veg'), pro: gs.includes('pro'), treats: gs.filter((g) => g === 'treat').length, ok: t <= BUDGET && gs.includes('veg') && gs.includes('pro') };
    }
    function mkRender() {
      const box = $('mktBox'), c = mkCheck(), t = total();
      let html = '';
      if (mk2.stage === 'shop') {
        html = `<p class="muted" style="margin:0">${T('Nhiệm vụ: mua đồ nấu bữa tối, cần ít nhất 1 món rau và 1 món đạm, tổng không quá 100.000 đ.', 'Mission: buy dinner with at least 1 vegetable and 1 protein, spending no more than 100,000 dong.')}</p>
          <div class="checklist"><div><span>🥬 ${T('Có món rau', 'A vegetable')}</span><span class="${c.veg ? 'ok' : 'wait'}">${c.veg ? '✅' : '⏳'}</span></div><div><span>🥚 ${T('Có món đạm', 'A protein')}</span><span class="${c.pro ? 'ok' : 'wait'}">${c.pro ? '✅' : '⏳'}</span></div><div><span>💰 ${T('Không vượt 100.000 đ', 'Within 100,000')}</span><span class="${t <= BUDGET ? 'ok' : 'no'}">${t <= BUDGET ? '✅' : '❌'}</span></div></div>
          <button id="mkPay" class="btn main" type="button" ${c.ok ? '' : 'disabled'}>💳 ${T('Đi thanh toán', 'Go and pay')}</button>`;
      } else if (mk2.stage === 'pay') {
        html = `<p class="qtext" style="margin:0">${T(`Cần trả ${vnd(t)}. Chọn tờ tiền để đưa cho cô bán hàng:`, `You need to pay ${vnd(t)}. Choose notes to hand over:`)}</p>
          <div class="toggle-row" style="justify-content:flex-start">${NOTES.map((v) => `<button type="button" class="note-btn" data-note="${v}" style="background:${NOTE_COL[v]}">${(v / 1000)}.000</button>`).join('')}</div>
          <p class="score" style="margin:0">${T(`Em đã đưa: ${vnd(paidSum())}`, `You’ve handed over: ${vnd(paidSum())}`)}</p>
          <button id="mkUndo" class="btn" type="button">↺ ${T('Lấy lại tiền', 'Take money back')}</button>`;
      } else if (mk2.stage === 'change') {
        html = `<p class="qtext" style="margin:0">${T(`Em đưa ${vnd(paidSum())}, hàng hết ${vnd(t)}. Cô phải trả lại em bao nhiêu?`, `You gave ${vnd(paidSum())} for ${vnd(t)}. How much change?`)}</p>
          <div class="opt-col">${mk2.changeOpts.map((v, i) => `<button type="button" class="soft-btn" data-ch="${i}">${vnd(v)}</button>`).join('')}</div>`;
        if (mk2.changeAns >= 0) { const right = mk2.changeOpts[mk2.changeAns] === paidSum() - t; html += `<p class="${right ? 'fun' : 'warn'}" style="margin:0">${right ? T('🎉 Chính xác! Nhớ đếm lại tiền thừa trước khi đi nhé.', '🎉 Correct! Always count your change before you leave.') : T(`Chưa đúng. ${vnd(paidSum())} − ${vnd(t)} = ${vnd(paidSum() - t)}.`, `Not quite. ${vnd(paidSum())} − ${vnd(t)} = ${vnd(paidSum() - t)}.`)}</p><button id="mkAgain" class="btn main" type="button">${T('🛒 Đi chợ lần nữa', '🛒 Shop again')}</button>`; }
      }
      box.innerHTML = html;
      const pay = $('mkPay'); if (pay) pay.onclick = () => { cancelSpeech(); mk2.stage = 'pay'; mk2.paid = []; mkRender(); mkInfo(true); };
      const undo = $('mkUndo'); if (undo) undo.onclick = () => { mk2.paid = []; mkRender(); };
      const again = $('mkAgain'); if (again) again.onclick = () => { mk2.cart = []; mk2.stage = 'shop'; mk2.paid = []; mk2.changeAns = -1; mkRender(); mkInfo(true); };
      root.querySelectorAll('[data-good]').forEach((b) => { b.setAttribute('aria-pressed', String(mk2.cart.includes(b.dataset.good))); b.disabled = mk2.stage !== 'shop'; });
    }
    $('mktBox').addEventListener('click', (e) => {
      const n = e.target.closest('[data-note]'), ch = e.target.closest('[data-ch]');
      if (n && mk2.stage === 'pay') {
        mk2.paid.push(+n.dataset.note);
        if (paidSum() >= total()) { const right = paidSum() - total(), opts = new Set([right]); while (opts.size < 3) { const d = [5000, 10000, 2000, 20000][Math.floor(rand(0, 4))] * (Math.random() < .5 ? -1 : 1); if (right + d >= 0) opts.add(right + d); } mk2.changeOpts = [...opts].sort(() => Math.random() - .5); mk2.changeAns = -1; mk2.stage = 'change'; }
        mkRender(); mkInfo(true);
      }
      if (ch && mk2.changeAns < 0) { mk2.changeAns = +ch.dataset.ch; mkRender(); mkInfo(true); }
    });
    function mkGoodsBtns() { $('mkGoods').innerHTML = GOODS.map((g) => `<button type="button" class="food-btn" data-good="${g.id}" aria-pressed="false">${g.e} <span></span> · ${(g.p / 1000)}K</button>`).join(''); root.querySelectorAll('[data-good]').forEach((b) => { b.querySelector('span').textContent = L(GOODS.find((g) => g.id === b.dataset.good)); }); }
    $('mkGoods').addEventListener('click', (e) => { const b = e.target.closest('[data-good]'); if (!b || mk2.stage !== 'shop') return; const id = b.dataset.good; if (mk2.cart.includes(id)) mk2.cart.splice(mk2.cart.indexOf(id), 1); else mk2.cart.push(id); mkRender(); mkInfo(true); });
    function mkInfo(force) {
      const c = mkCheck(), t = total(), key = [lang, mk2.cart.join(), mk2.stage, mk2.changeAns].join('|'); if (key === mk2.infoKey && !force) return; mk2.infoKey = key;
      const notes = [];
      if (c.treats >= 2) notes.push(['warn', T('⚠️ Giỏ có khá nhiều quà vặt. Hãy ưu tiên những thứ cần cho bữa ăn trước nhé.', '⚠️ Lots of treats in the basket. Put meal essentials first.')]);
      if (t > BUDGET) notes.push(['warn', T('⚠️ Tổng tiền vượt quá 100.000 đ. Hãy bỏ bớt món ít cần thiết.', '⚠️ Over 100,000 dong. Remove something less important.')]);
      notes.push(['tip', T('📏 Giá trong trò chơi chỉ để luyện tập, giá thật ở chợ có thể khác.', '📏 Prices are for practice; real market prices may differ.')]);
      infoBox($('info_mkt'), {
        emo: '🛒', title: T('Đi chợ thông minh', 'Smart shopping'), sub: T(`Giỏ: ${mk2.cart.length} món – ${vnd(t)}`, `Basket: ${mk2.cart.length} items – ${vnd(t)}`),
        rows: [[T('Bước 1', 'Step 1'), T('Lên danh sách những thứ cần mua trước khi đi.', 'Make a list before you go.')], [T('Bước 2', 'Step 2'), T('Chọn thứ cần trước, quà vặt sau nếu còn tiền.', 'Get needs first; treats only if money’s left.')], [T('Bước 3', 'Step 3'), T('Cộng tổng tiền, trả tiền và đếm lại tiền thừa.', 'Add up the total, pay and count your change.')]],
        notes
      });
      setText('hud_mkt', mk2.stage === 'shop' ? T(`🛒 Đã chọn ${mk2.cart.length} món – ${vnd(t)} / ${vnd(BUDGET)}`, `🛒 ${mk2.cart.length} items – ${vnd(t)} / ${vnd(BUDGET)}`) : mk2.stage === 'pay' ? T('💳 Đang trả tiền…', '💳 Paying…') : T('🪙 Tính tiền thừa', '🪙 Working out the change'));
    }
    TABS.mkt = { frame() { drawMkt(); }, refresh() { mkGoodsBtns(); mk2.infoKey = ''; mkRender(); mkInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_mkt'), {
      vi: [
        { q: 'Mua hàng hết 65.000 đ, em đưa 100.000 đ. Tiền thừa là bao nhiêu?', a: ['35.000 đ', '45.000 đ', '25.000 đ', '165.000 đ'], why: '100.000 − 65.000 = 35.000.' },
        { q: 'Trước khi đi chợ, việc nên làm là gì?', a: ['Lên danh sách món cần mua', 'Mang thật nhiều tiền', 'Mua bất cứ thứ gì thấy đẹp', 'Không cần chuẩn bị'], why: 'Danh sách giúp mua đủ và không mua thừa.' },
        { q: 'Khi tiền không đủ, nên bỏ bớt món nào trước?', a: ['Quà vặt không cần thiết', 'Rau cho bữa tối', 'Trứng cho bữa tối', 'Bỏ hết'], why: 'Ưu tiên giữ thứ cần cho bữa ăn.' },
        { q: 'Nhận tiền thừa xong, em nên làm gì?', a: ['Đếm lại cho đúng', 'Nhét vội vào túi', 'Cho người bên cạnh', 'Không cần nhìn'], why: 'Đếm lại để chắc chắn không bị thiếu.' },
        { q: 'Tờ tiền nào có giá trị lớn nhất?', a: ['500.000 đồng', '100.000 đồng', '50.000 đồng', '20.000 đồng'], why: 'Tờ 500.000 đồng là mệnh giá lớn nhất đang lưu hành.' }
      ],
      en: [
        { q: 'Shopping costs 65,000 and you pay 100,000. Your change?', a: ['35,000', '45,000', '25,000', '165,000'], why: '100,000 − 65,000 = 35,000.' },
        { q: 'Before going shopping, you should…', a: ['Write a list', 'Bring lots of money', 'Buy anything pretty', 'Do nothing'], why: 'A list helps you buy what you need, nothing extra.' },
        { q: 'Short of money, what goes first?', a: ['Unneeded treats', 'Vegetables for dinner', 'Eggs for dinner', 'Everything'], why: 'Keep the meal essentials.' },
        { q: 'After getting change, you…', a: ['Count it', 'Stuff it in a pocket', 'Give it away', 'Don’t look'], why: 'Counting makes sure it’s right.' },
        { q: 'Which Vietnamese note is worth the most?', a: ['500,000 dong', '100,000 dong', '50,000 dong', '20,000 dong'], why: 'The 500,000 note is the largest in circulation.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'need';
    root.querySelectorAll('.money-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.money-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('m-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.money-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.money-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.money-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
