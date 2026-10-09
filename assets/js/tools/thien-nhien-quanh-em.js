/* Epsilon Edu - Tool: Thien nhien quanh em (Nature around us): chuoi thuc an, bong nang, cau vong
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.natureAround = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "natureAround";
  let activeCleanup = null;

  const CSS = `
.nature-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.nature-tool *{box-sizing:border-box}.nature-tool button,.nature-tool input{font:inherit}.nature-tool button{cursor:pointer}.nature-tool .hidden{display:none!important}
.nature-tool button:focus-visible,.nature-tool canvas:focus-visible,.nature-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.nature-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.nature-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.nature-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.nature-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.nature-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.nature-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.nature-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.nature-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.nature-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.nature-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.nature-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.nature-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.nature-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.nature-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.nature-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.nature-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.nature-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.nature-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.nature-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.nature-panel{width:100%}.nature-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.nature-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.nature-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.nature-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.nature-tool .card-head.compact{margin-bottom:9px}
.nature-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.nature-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.nature-tool .btn,.nature-tool .soft-btn,.nature-tool .segmented button,.nature-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.nature-tool .btn:hover,.nature-tool .soft-btn:hover,.nature-tool .segmented button:hover,.nature-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.nature-tool .btn{padding:0 12px}.nature-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.nature-tool .segmented{display:flex;gap:7px;margin:0}.nature-tool .segmented button{padding:0 13px}
.nature-tool .segmented button[aria-pressed="true"],.nature-tool .soft-btn[aria-pressed="true"],.nature-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.nature-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.nature-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.nature-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.nature-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.nature-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.nature-tool .range-control input{width:100%;accent-color:#8b5cf6}.nature-tool .range-control b{color:#7c3aed;font-size:13px}
.nature-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.nature-tool .soft-btn{padding:0 12px}
.nature-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.nature-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.nature-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.nature-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.nature-tool .info-title{display:flex;align-items:center;gap:10px}.nature-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.nature-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.nature-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.nature-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.nature-tool .facts{display:grid;gap:6px;margin-top:10px}.nature-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.nature-tool .facts b{color:#7c3aed;font-size:13.5px}.nature-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.nature-tool .fun,.nature-tool .warn,.nature-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.nature-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.nature-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.nature-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.nature-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.nature-tool .state-big.up{color:#0f766e}.nature-tool .state-big.down{color:#b45309}
.nature-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.nature-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.nature-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.nature-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.nature-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.nature-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.nature-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.nature-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.nature-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.nature-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.nature-tool .qopt:hover{filter:brightness(.985)}.nature-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.nature-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.nature-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.nature-tool .qfb,.nature-tool .score{font-size:13px;font-weight:900}.nature-tool .qfb.ok{color:#15803d}.nature-tool .qfb.no{color:#be123c}.nature-tool .score{color:#7c3aed}
.nature-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.nature-grid{grid-template-columns:1fr;align-items:start}.nature-side{grid-template-rows:auto auto;height:auto}.nature-tool .control-grid{grid-template-columns:1fr}.nature-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.nature-hero{flex-wrap:wrap;padding:12px}.nature-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.nature-tabs{grid-template-columns:1fr}.nature-tabs .tab{min-height:40px}.nature-card{padding:11px;border-radius:18px}.nature-tool .card-head{align-items:flex-start;flex-direction:column}.nature-tool .head-actions{width:100%;justify-content:space-between}.nature-tool .head-actions .segmented{flex:1;min-width:0}.nature-tool .head-actions .segmented button{flex:1;padding:0 8px}.nature-tool .qopts{grid-template-columns:1fr}.nature-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.nature-tool *{transition:none!important}}

.nature-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.nature-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.nature-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.nature-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.nature-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.nature-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.nature-tool .checklist{display:grid;gap:6px;margin-top:10px}
.nature-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.nature-tool .checklist .ok{color:#15803d}.nature-tool .checklist .no{color:#be123c}.nature-tool .checklist .wait{color:#94a3b8}
.nature-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.nature-tool .process span{flex:1}.nature-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.nature-tool .process .on{color:#0284c7}.nature-tool .process i.on{color:#ec4899}
@media(max-width:640px){.nature-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.nature-tool .slider-pair{grid-template-columns:1fr}}

.nature-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.nature-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.nature-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.nature-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.nature-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.nature-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}

.nature-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.nature-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="nature-tool" data-tool-root>
  <div class="nature-hero">
    <div class="nature-hero-icon" aria-hidden="true">🌿</div>
    <div>
      <p class="nature-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="nature-lead" data-t="lead"></p>
    </div>
    <div class="nature-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="nAudioNotice" class="nature-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="nature-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="fc" data-t="tab_fc"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="sh" data-t="tab_sh"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="rb" data-t="tab_rb"></button>
  </div>
  <section id="n-fc" class="nature-panel" role="tabpanel">
    <div class="nature-grid">
      <article class="nature-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_fc"></h2></div>
          <div class="head-actions"><button id="fcReset" class="btn" type="button" data-t="reset"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_fc" role="img" data-ta="cv_fc"></canvas></div>
        <p id="hud_fc" class="hud" aria-live="polite"></p>
        <div id="fcSpecies" class="toggle-row" style="justify-content:flex-start;margin-top:6px" role="group" data-ta="speciesLabel">
          <button type="button" class="soft-btn" data-sp="G" aria-pressed="true"></button>
          <button type="button" class="soft-btn" data-sp="H" aria-pressed="true"></button>
          <button type="button" class="soft-btn" data-sp="F" aria-pressed="true"></button>
          <button type="button" class="soft-btn" data-sp="S" aria-pressed="true"></button>
        </div>
      </article>
      <div class="nature-side">
        <aside class="nature-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_fc"></span><h2 data-t="sh_fc"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_fcChart" role="img" aria-hidden="true"></canvas></div>
          <div id="info_fc" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_fc" class="nature-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="n-sh" class="nature-panel hidden" role="tabpanel">
    <div class="nature-grid">
      <article class="nature-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_sh"></h2></div>
          <div class="head-actions"><button id="shPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_sh" role="img" data-ta="cv_sh"></canvas></div>
        <p id="hud_sh" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="hourL"></span><input id="shHour" type="range" min="5" max="19" value="7.5" step="0.05"><b id="shHourTxt"></b></label>
        <div class="cond-row">
          <div class="segmented" role="group" data-ta="seasonL">
            <button type="button" data-season="summer" aria-pressed="true" data-t="sSummer"></button>
            <button type="button" data-season="eq" aria-pressed="false" data-t="sEq"></button>
            <button type="button" data-season="winter" aria-pressed="false" data-t="sWinter"></button>
          </div>
          <div class="segmented" role="group" data-ta="cityL">
            <button type="button" data-city="hn" aria-pressed="true" data-t="cHN"></button>
            <button type="button" data-city="hcm" aria-pressed="false" data-t="cHCM"></button>
          </div>
        </div>
      </article>
      <div class="nature-side">
        <aside class="nature-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_sh"></span><h2 data-t="sh_sh"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_shTop" role="img" aria-hidden="true"></canvas></div>
          <div id="info_sh" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_sh" class="nature-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="n-rb" class="nature-panel hidden" role="tabpanel">
    <div class="nature-grid">
      <article class="nature-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_rb"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_rb" role="img" data-ta="cv_rb"></canvas></div>
        <p id="hud_rb" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="altL"></span><input id="rbAlt" type="range" min="0" max="60" value="20" step="1"><b id="rbAltTxt"></b></label>
        <div class="toggle-row" style="justify-content:flex-start;margin-top:8px">
          <button id="rbRain" class="soft-btn" type="button" aria-pressed="true" data-t="rain"></button>
          <button id="rbSecond" class="soft-btn" type="button" aria-pressed="true" data-t="second"></button>
        </div>
      </article>
      <div class="nature-side">
        <aside class="nature-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_rb"></span><h2 data-t="sh_rb"></h2></div></div>
          <div class="canvas-wrap"><canvas id="c_rbDrop" role="img" aria-hidden="true"></canvas></div>
          <div id="info_rb" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_rb" class="nature-card quiz-card"></article>
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
    const audioNotice = $('nAudioNotice');
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
      title: ['Thiên nhiên quanh em', 'Nature Around Us'],
      lead: ['Xem các loài ăn nhau trên đồng cỏ, theo dõi bóng nắng đổi theo giờ và khám phá vì sao có cầu vồng.', 'See who eats whom in a meadow, watch shadows change through the day and find out how rainbows form.'],
      tabsLabel: ['Các chủ đề', 'Topics'],
      eyeSim: ['Mô phỏng', 'Simulation'],
      tab_fc: ['🦗 Chuỗi thức ăn', '🦗 Food chain'], h_fc: ['Ai ăn ai trên đồng cỏ?', 'Who eats whom in the meadow?'],
      cv_fc: ['Đồng cỏ với cỏ, châu chấu, ếch và rắn', 'A meadow with grass, grasshoppers, frogs and snakes'],
      se_fc: ['Theo dõi', 'Tracking'], sh_fc: ['Số lượng mỗi loài', 'How many of each'],
      tab_sh: ['🌤️ Bóng nắng', '🌤️ Shadows'], h_sh: ['Bóng nắng thay đổi trong ngày', 'Shadows change through the day'],
      cv_sh: ['Mặt Trời đi qua bầu trời, bóng cây cột dài ngắn khác nhau', 'The Sun crosses the sky; a pole’s shadow grows and shrinks'],
      se_sh: ['Nhìn từ trên xuống', 'Seen from above'], sh_sh: ['Hướng của bóng', 'Which way the shadow points'],
      tab_rb: ['🌈 Cầu vồng', '🌈 Rainbows'], h_rb: ['Vì sao có cầu vồng?', 'How does a rainbow form?'],
      cv_rb: ['Bé quay lưng về phía Mặt Trời, nhìn cầu vồng trên màn mưa', 'A child with the Sun behind, looking at a rainbow in the rain'],
      se_rb: ['Phóng to', 'Zoom in'], sh_rb: ['Ánh sáng đi qua giọt mưa', 'Light inside a raindrop'],
      reset: ['↺ Làm lại', '↺ Reset'], speciesLabel: ['Bấm để bỏ hoặc thêm một loài', 'Tap to remove or add a species'],
      hourL: ['Kéo để đổi giờ trong ngày', 'Drag to change the time of day'], seasonL: ['Mùa', 'Season'], cityL: ['Nơi', 'Place'],
      sSummer: ['☀️ Mùa hè', '☀️ Summer'], sEq: ['🍂 Xuân, thu', '🍂 Spring, autumn'], sWinter: ['❄️ Mùa đông', '❄️ Winter'],
      cHN: ['Hà Nội', 'Hanoi'], cHCM: ['TP. Hồ Chí Minh', 'Ho Chi Minh City'],
      altL: ['Kéo để đổi độ cao Mặt Trời', 'Drag to change how high the Sun is'], rain: ['🌧️ Có mưa', '🌧️ Rain'], second: ['🌈 Cầu vồng phụ', '🌈 Second rainbow']
    };

    /* =====================================================================
       1. CHUỖI THỨC ĂN: cỏ → châu chấu → ếch → rắn
       Mô hình số lượng đơn giản (mỗi loài phụ thuộc loài nó ăn và loài ăn nó).
       ===================================================================== */
    const FC_P = { rG: .81, K: 100, a: .0082, b: .713, c: .0196, d: .785, mH: .138, mF: .299, mS: .116, e: .0666, f: .594, kH: .00033, kF: .00183, kS: .0506 };
    const FC_START = { G: 57, H: 42, F: 9.4, S: 5 };
    const SPECIES = [
      { k: 'G', emo: '🌿', col: '#16a34a', scale: 100, vi: 'Cỏ', en: 'Grass' },
      { k: 'H', emo: '🦗', col: '#ca8a04', scale: 90, vi: 'Châu chấu', en: 'Grasshoppers' },
      { k: 'F', emo: '🐸', col: '#0d9488', scale: 20, vi: 'Ếch', en: 'Frogs' },
      { k: 'S', emo: '🐍', col: '#7c2d12', scale: 9, vi: 'Rắn', en: 'Snakes' }
    ];
    let fc = { ...FC_START }, fcOn = { G: true, H: true, F: true, S: true }, fcT = 0, fcHist = [], fcInfoKey = '', fcHudT = '';
    const fcC = mk('c_fc', (w) => clamp(w * .66, 300, 540));
    const fcChart = mk('c_fcChart', (w) => clamp(w * .5, 150, 210));
    const fcSpots = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), p: Math.random() * TAU }));
    function fcStep(dt) {
      const P = FC_P, sub = 8, h = dt * 4 / sub;
      for (let i = 0; i < sub; i++) {
        let { G, H, F, S } = fc;
        const dG = P.rG * G * (1 - G / P.K) - P.a * G * H;
        const dH = H * (P.b * P.a * G - P.c * F - P.mH - P.kH * H);
        const dF = F * (P.d * P.c * H - P.e * S - P.mF - P.kF * F);
        const dS = S * (P.f * P.e * F - P.mS - P.kS * S);
        G += dG * h; H += dH * h; F += dF * h; S += dS * h;
        fc = { G: fcOn.G ? Math.max(0, G) : 0, H: fcOn.H ? Math.max(0, H) : 0, F: fcOn.F ? Math.max(0, F) : 0, S: fcOn.S ? Math.max(0, S) : 0 };
        for (const k of 'GHFS') if (fc[k] < .05) fc[k] = 0;
      }
      fcT += dt * 4;
      if (!fcHist.length || fcT - fcHist[fcHist.length - 1].t > .5) { fcHist.push({ t: fcT, ...fc }); if (fcHist.length > 160) fcHist.shift(); }
    }
    const fcCount = (k) => { const v = fc[k]; if (k === 'G') return Math.round(v / 4); if (k === 'H') return Math.round(v / 3); return Math.round(v); };
    function drawGrass(ctx, x, y, s) { ctx.strokeStyle = '#15803d'; ctx.lineWidth = Math.max(1.5, s * .12); ctx.lineCap = 'round'; for (const a of [-.5, -.2, .1, .4]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + a * s * .6, y - s * .6, x + a * s * 1.2, y - s * (1 - Math.abs(a) * .4)); ctx.stroke(); } }
    function drawHopper(ctx, x, y, s, flip = 1) {
      ctx.save(); ctx.translate(x, y); ctx.scale(flip, 1);
      ctx.strokeStyle = '#65a30d'; ctx.lineWidth = Math.max(1.2, s * .1); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-s * .1, 0); ctx.lineTo(-s * .45, -s * .45); ctx.lineTo(-s * .6, s * .15); ctx.stroke();
      ctx.fillStyle = '#84cc16'; ctx.beginPath(); ctx.ellipse(0, -s * .1, s * .55, s * .18, -.1, 0, TAU); ctx.fill();
      ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.arc(s * .5, -s * .15, s * .16, 0, TAU); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(s * .55, -s * .2, s * .05, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.moveTo(s * .55, -s * .28); ctx.quadraticCurveTo(s * .8, -s * .7, s * 1.0, -s * .6); ctx.stroke();
      ctx.restore();
    }
    function drawFrogMini(ctx, x, y, s) {
      ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(x + s * .3, y - s * .15, s * .35, s * .18, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.ellipse(x, y - s * .35, s * .5, s * .32, -.1, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x - s * .4, y - s * .5, s * .28, s * .22, .1, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.arc(x - s * .42, y - s * .72, s * .12, 0, TAU); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(x - s * .44, y - s * .72, s * .055, 0, TAU); ctx.fill();
    }
    function drawSnake(ctx, x, y, s, ph) {
      ctx.strokeStyle = '#92400e'; ctx.lineWidth = s * .22; ctx.lineCap = 'round'; ctx.beginPath();
      for (let i = 0; i <= 16; i++) { const t = i / 16, xx = x - s * 1.6 * t, yy = y + Math.sin(ph + t * 7) * s * .22; if (i) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy); }
      ctx.stroke();
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = s * .06; ctx.setLineDash([s * .12, s * .18]); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#78350f'; ctx.beginPath(); ctx.ellipse(x + s * .08, y + Math.sin(ph) * s * .22, s * .2, s * .14, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + s * .14, y - s * .04 + Math.sin(ph) * s * .22, s * .045, 0, TAU); ctx.fill();
    }
    function speciesIcon(ctx, k, x, y, s) {
      if (k === 'G') drawGrass(ctx, x, y + s * .45, s);
      else if (k === 'H') drawHopper(ctx, x - s * .1, y + s * .1, s * .9);
      else if (k === 'F') drawFrogMini(ctx, x + s * .05, y + s * .45, s);
      else drawSnake(ctx, x + s * .75, y, s * .9, 1.2);
    }
    function drawFc() {
      const { w, h, ctx } = fcC;
      if (!w) return;
      const top = h * .28;
      ctx.fillStyle = '#f0f9ff'; ctx.fillRect(0, 0, w, top);
      const fg = ctx.createLinearGradient(0, top, 0, h); fg.addColorStop(0, '#bbf7d0'); fg.addColorStop(1, '#86efac');
      ctx.fillStyle = fg; ctx.fillRect(0, top, w, h - top);
      // sơ đồ chuỗi
      const n = 5, gap = w / n, cy = top * .48, s = Math.min(gap * .28, top * .3);
      for (let i = 0; i < n; i++) {
        const x = gap * (i + .5);
        if (i < n - 1) arrow(ctx, x + s * 1.2, cy, x + gap - s * 1.2, cy, '#64748b', 2, 8);
        ctx.fillStyle = '#fff'; ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, cy, s * 1.05, 0, TAU); ctx.fill(); ctx.stroke();
        if (i === 0) drawSun(ctx, x, cy, s * .6, .35);
        else {
          const sp = SPECIES[i - 1];
          ctx.save(); ctx.beginPath(); ctx.arc(x, cy, s, 0, TAU); ctx.clip(); speciesIcon(ctx, sp.k, x, cy, s * .9); ctx.restore();
          if (!fcOn[sp.k] || fc[sp.k] <= 0) { ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - s * .7, cy - s * .7); ctx.lineTo(x + s * .7, cy + s * .7); ctx.moveTo(x + s * .7, cy - s * .7); ctx.lineTo(x - s * .7, cy + s * .7); ctx.stroke(); }
        }
        textLight(ctx, i === 0 ? T('Mặt Trời', 'Sun') : L({ vi: SPECIES[i - 1].vi, en: SPECIES[i - 1].en }), x, cy + s * 1.05 + 11, '#334155', w < 420 ? 10 : 11.5, 'center', 900);
      }
      textLight(ctx, T('Mũi tên chỉ đường đi của thức ăn (năng lượng)', 'Arrows show where the food (energy) goes'), w / 2, top - 8, '#64748b', w < 420 ? 9.5 : 11, 'center', 700);
      // đồng cỏ
      const area = (sp) => ({ x: 14 + sp.x * (w - 28), y: top + 22 + sp.y * (h - top - 34) });
      const gN = Math.min(40, fcCount('G'));
      for (let i = 0; i < gN; i++) { const p = area(fcSpots[i]); drawGrass(ctx, p.x, p.y, h * .045); }
      const hN = Math.min(30, fcCount('H'));
      for (let i = 0; i < hN; i++) { const sp = fcSpots[(i * 7 + 3) % 40], p = area(sp), hop = Math.max(0, Math.sin(clock * 3 + sp.p * 3)) * h * .03; drawHopper(ctx, p.x + Math.sin(clock * .5 + i) * 10, p.y - hop, h * .028, i % 2 ? 1 : -1); }
      const fN = Math.min(22, fcCount('F'));
      for (let i = 0; i < fN; i++) { const p = area(fcSpots[(i * 11 + 5) % 40]); drawFrogMini(ctx, p.x, p.y, h * .045); }
      const sN = Math.min(10, fcCount('S'));
      for (let i = 0; i < sN; i++) { const p = area(fcSpots[(i * 13 + 9) % 40]); drawSnake(ctx, p.x + Math.sin(clock * .4 + i) * 20, p.y, h * .05, clock * 3 + i); }
    }
    function drawFcChart() {
      const { w, h, ctx } = fcChart;
      if (!w) return;
      ctx.fillStyle = '#fbfdff'; ctx.fillRect(0, 0, w, h);
      const x0 = 8, x1 = w - 8, y0 = 10, y1 = h - 20;
      ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; for (let k = 0; k <= 4; k++) { const y = y0 + (y1 - y0) * k / 4; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); }
      const n = fcHist.length;
      SPECIES.forEach((sp) => {
        ctx.strokeStyle = sp.col; ctx.lineWidth = 2.5; ctx.beginPath();
        fcHist.forEach((pt, i) => { const x = x0 + (x1 - x0) * (n > 1 ? i / (n - 1) : 1), y = y1 - clamp(pt[sp.k] / sp.scale, 0, 1) * (y1 - y0); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
        ctx.stroke();
      });
      let lx = 8;
      SPECIES.forEach((sp) => { ctx.fillStyle = sp.col; ctx.fillRect(lx, h - 12, 10, 4); ctx.font = '800 10.5px system-ui, sans-serif'; const t = L({ vi: sp.vi, en: sp.en }); textLight(ctx, t, lx + 13, h - 10, '#475569', 10.5, 'left'); lx += 22 + ctx.measureText(t).width; });
    }
    function fcInfo() {
      const off = SPECIES.filter((s) => !fcOn[s.k]).map((s) => s.k).join('');
      const key = off + lang;
      if (key !== fcInfoKey) {
        fcInfoKey = key;
        const MSG = {
          '': [T('Chuỗi thức ăn cân bằng', 'A balanced food chain'), T('Mỗi loài là thức ăn của loài kế tiếp. Số lượng các loài tự điều chỉnh, giữ cho đồng cỏ cân bằng.', 'Each species is food for the next. Their numbers keep each other in balance.')],
          F: [T('Không còn ếch', 'No more frogs'), T('Châu chấu không bị ăn nên sinh sôi rất nhiều và ăn trụi cỏ. Rắn thiếu thức ăn nên dần biến mất.', 'Grasshoppers are no longer eaten, so they multiply and strip the grass. Snakes go hungry and die out.')],
          S: [T('Không còn rắn', 'No more snakes'), T('Ếch tăng lên, ăn nhiều châu chấu hơn, nhờ vậy cỏ mọc tốt hơn.', 'Frogs increase and eat more grasshoppers, so the grass grows better.')],
          H: [T('Không còn châu chấu', 'No more grasshoppers'), T('Ếch thiếu thức ăn, rồi đến rắn cũng không còn. Cỏ mọc um tùm.', 'Frogs have nothing to eat, then snakes disappear too. The grass grows thick.')],
          G: [T('Không còn cỏ', 'No more grass'), T('Châu chấu không có gì ăn, kéo theo ếch và rắn cũng chết dần. Cây xanh là nền móng của mọi chuỗi thức ăn.', 'Grasshoppers have nothing to eat, so frogs and snakes die out too. Plants are the base of every food chain.')]
        };
        const m = MSG[off] || [T('Chuỗi thức ăn bị đứt nhiều chỗ', 'The chain is broken in several places'), T('Bỏ nhiều loài cùng lúc làm cả đồng cỏ mất cân bằng. Bấm "Làm lại" để đưa mọi loài trở lại.', 'Removing several species throws the whole meadow off balance. Press “Reset” to bring everyone back.')];
        infoBox($('info_fc'), {
          emo: off ? '⚠️' : '🌿', title: m[0], sub: T('Bấm vào tên loài để bỏ hoặc thêm', 'Tap a species to remove or add it'),
          rows: [[T('Chuyện gì xảy ra?', 'What happens?'), m[1]], [T('Sinh vật sản xuất', 'Producers'), T('Cỏ tự làm thức ăn nhờ ánh sáng Mặt Trời.', 'Grass makes its own food using sunlight.')], [T('Sinh vật tiêu thụ', 'Consumers'), T('Châu chấu, ếch, rắn phải ăn sinh vật khác.', 'Grasshoppers, frogs and snakes must eat other living things.')]],
          notes: [['fun', T('✨ Bắt ếch hay dùng thuốc trừ sâu bừa bãi cũng có thể làm đứt chuỗi thức ăn ngoài đồng ruộng.', '✨ Over-catching frogs or overusing pesticides can break the food chain in rice fields.')]]
        });
      }
      const hud = `📅 ${T('Tháng', 'Month')} ${Math.floor(fcT) + 1} – ${SPECIES.map((s) => `${s.emo} ${fcCount(s.k)}`).join('  ')}`;
      if (hud !== fcHudT) { fcHudT = hud; setText('hud_fc', hud); }
    }
    $('fcSpecies').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-sp]'); if (!b) return;
      cancelSpeech(); const k = b.dataset.sp; fcOn[k] = !fcOn[k];
      if (fcOn[k] && fc[k] <= 0) fc[k] = { G: 30, H: 8, F: 3, S: 1.5 }[k];
      b.setAttribute('aria-pressed', String(fcOn[k])); fcInfo();
    });
    $('fcReset').onclick = () => { cancelSpeech(); fc = { ...FC_START }; fcOn = { G: true, H: true, F: true, S: true }; fcT = 0; fcHist = []; root.querySelectorAll('#fcSpecies button').forEach((b) => b.setAttribute('aria-pressed', 'true')); fcInfo(); };
    TABS.fc = {
      frame(dt) { fcStep(dt); drawFc(); drawFcChart(); fcInfo(); },
      refresh() { root.querySelectorAll('#fcSpecies button').forEach((b) => { const sp = SPECIES.find((s) => s.k === b.dataset.sp); b.textContent = `${sp.emo} ${L({ vi: sp.vi, en: sp.en })}`; }); fcInfoKey = ''; fcHudT = ''; fcInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_fc'), {
      vi: [
        { q: 'Trong chuỗi "cỏ → châu chấu → ếch → rắn", loài nào là sinh vật sản xuất?', a: ['Cỏ', 'Châu chấu', 'Ếch', 'Rắn'], why: 'Cỏ tự làm ra thức ăn nhờ ánh sáng Mặt Trời, nên là sinh vật sản xuất.' },
        { q: 'Nếu ếch biến mất, châu chấu sẽ thế nào?', a: ['Tăng lên rất nhiều', 'Giảm đi', 'Không thay đổi', 'Biến thành ếch'], why: 'Không còn ếch ăn châu chấu nên châu chấu sinh sôi rất nhiều.' },
        { q: 'Mũi tên trong chuỗi thức ăn chỉ điều gì?', a: ['Thức ăn đi từ loài bị ăn sang loài ăn nó', 'Con nào chạy nhanh hơn', 'Con nào to hơn', 'Đường đi về nhà'], why: 'Mũi tên chỉ hướng thức ăn (năng lượng) truyền đi.' },
        { q: 'Chuỗi thức ăn nào sau đây đúng?', a: ['Lúa → chuột → rắn', 'Rắn → chuột → lúa', 'Chuột → lúa → rắn', 'Rắn → lúa → chuột'], why: 'Chuột ăn lúa, rắn ăn chuột.' },
        { q: 'Mọi chuỗi thức ăn bắt đầu từ đâu?', a: ['Cây xanh (nhờ ánh sáng Mặt Trời)', 'Con hổ', 'Con người', 'Đất đá'], why: 'Cây xanh dùng ánh sáng Mặt Trời làm ra thức ăn, nuôi các loài khác.' },
        { q: 'Vì sao không nên bắt hết ếch ngoài đồng?', a: ['Sâu bọ sẽ tăng nhiều, hại lúa', 'Vì ếch kêu hay', 'Vì ếch ăn lúa', 'Không ảnh hưởng gì'], why: 'Ếch ăn sâu bọ. Mất ếch, sâu bọ sinh sôi và phá hoại mùa màng.' }
      ],
      en: [
        { q: 'In “grass → grasshopper → frog → snake”, which is the producer?', a: ['Grass', 'Grasshopper', 'Frog', 'Snake'], why: 'Grass makes its own food from sunlight, so it is the producer.' },
        { q: 'If frogs disappear, grasshoppers will…', a: ['Increase a lot', 'Decrease', 'Stay the same', 'Turn into frogs'], why: 'No frogs eat them, so grasshoppers multiply.' },
        { q: 'What do the arrows in a food chain show?', a: ['Food moves from the eaten to the eater', 'Who runs faster', 'Who is bigger', 'The way home'], why: 'Arrows show the direction food (energy) flows.' },
        { q: 'Which food chain is correct?', a: ['Rice → rat → snake', 'Snake → rat → rice', 'Rat → rice → snake', 'Snake → rice → rat'], why: 'Rats eat rice; snakes eat rats.' },
        { q: 'Where does every food chain start?', a: ['Green plants (using sunlight)', 'Tigers', 'People', 'Rocks'], why: 'Plants use sunlight to make food that feeds everything else.' },
        { q: 'Why not catch all the frogs in the fields?', a: ['Pests would boom and damage rice', 'Frogs sing nicely', 'Frogs eat rice', 'It makes no difference'], why: 'Frogs eat pests. Without frogs, pests multiply and harm crops.' }
      ]
    }));

    /* =====================================================================
       2. BÓNG NẮNG TRONG NGÀY (tính theo vị trí thật của Mặt Trời)
       ===================================================================== */
    const SEASON = { summer: 23.44, eq: 0, winter: -23.44 };
    const CITY = { hn: 21.03, hcm: 10.78 };
    let shHour = 7.5, shSeason = 'summer', shCity = 'hn', shPlaying = !reduceMotion, shInfoKey = '', shHudT = '';
    const shC = mk('c_sh', (w) => clamp(w * .6, 280, 500));
    const shTop = mk('c_shTop', (w) => clamp(w * .62, 180, 260));
    const DEG = Math.PI / 180;
    function sunAt(hour) {
      const phi = CITY[shCity] * DEG, dec = SEASON[shSeason] * DEG, H = (hour - 12) * 15 * DEG;
      const sinAlt = Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H);
      const alt = Math.asin(clamp(sinAlt, -1, 1));
      let cosA = (Math.sin(dec) - Math.sin(alt) * Math.sin(phi)) / (Math.cos(alt) * Math.cos(phi) || 1e-6);
      let A = Math.acos(clamp(cosA, -1, 1)); if (H > 0) A = TAU - A;
      return { alt, A, E: Math.cos(alt) * Math.sin(A), N: Math.cos(alt) * Math.cos(A), U: Math.sin(alt) };
    }
    const dirWord = (az) => {
      const vi = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'], en = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
      const i = Math.round((((az / DEG) % 360) + 360) % 360 / 45) % 8; return T(vi[i], en[i]);
    };
    function drawSh() {
      const { w, h, ctx } = shC;
      if (!w) return;
      const s = sunAt(shHour), gy = h * .78, cx = w * .5, day = clamp(s.alt / (8 * DEG) + .5, 0, 1);
      const sky = ctx.createLinearGradient(0, 0, 0, gy);
      sky.addColorStop(0, mix('#0f172a', '#38bdf8', day)); sky.addColorStop(1, mix('#312e81', s.alt < 12 * DEG ? '#fed7aa' : '#e0f2fe', day));
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, gy);
      const R = Math.min(w * .44, gy * .9);
      ctx.save(); ctx.setLineDash([4, 6]); ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.beginPath();
      for (let hh = 4; hh <= 20; hh += .1) { const q = sunAt(hh); if (q.alt < -2 * DEG) continue; const x = cx + R * q.E, y = gy - R * q.U; ctx.lineTo(x, y); } ctx.stroke(); ctx.restore();
      if (s.alt > -3 * DEG) drawSun(ctx, cx + R * s.E, gy - R * s.U, h * .045, .5);
      ctx.fillStyle = '#86efac'; ctx.fillRect(0, gy, w, h - gy);
      ctx.fillStyle = '#4ade80'; ctx.fillRect(0, gy, w, 4);
      // cây cột 1 m
      const pole = h * .26;
      if (s.alt > 0.5 * DEG) {
        const len = clamp(-Math.sin(s.A) / Math.tan(s.alt), -6, 6) * pole;
        ctx.fillStyle = 'rgba(30,41,59,.45)'; ctx.beginPath(); ctx.moveTo(cx - 3, gy + 2); ctx.lineTo(cx + len, gy + 2); ctx.lineTo(cx + len, gy + 7); ctx.lineTo(cx + 3, gy + 7); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(253,224,71,.6)'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(cx + R * s.E, gy - R * s.U); ctx.lineTo(cx + len, gy + 4); ctx.stroke(); ctx.setLineDash([]);
      }
      ctx.fillStyle = '#92400e'; ctx.fillRect(cx - 4, gy - pole, 8, pole);
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(cx, gy - pole, 6, 0, TAU); ctx.fill();
      textLight(ctx, T('Cột cao 1 m', '1 m pole'), cx + 10, gy - pole - 4, s.alt > 0 ? '#1e293b' : '#e2e8f0', 11, 'left', 900);
      textLight(ctx, T('Tây', 'West'), 12, gy + 18, '#14532d', 12, 'left', 900);
      textLight(ctx, T('Đông', 'East'), w - 12, gy + 18, '#14532d', 12, 'right', 900);
      textLight(ctx, T('(nhìn về phía Bắc)', '(facing north)'), w / 2, h - 10, '#166534', 10.5, 'center', 700);
      if (s.alt <= 0) textLight(ctx, T('🌙 Trời tối, không có bóng nắng', '🌙 Dark: no sun shadows'), w / 2, gy * .45, '#e2e8f0', 14, 'center', 900);
    }
    function drawShTop() {
      const { w, h, ctx } = shTop;
      if (!w) return;
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .4, unit = R / 3.2;
      ctx.fillStyle = '#ecfdf5'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#bbf7d0'; ctx.lineWidth = 1; for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.arc(cx, cy, unit * k, 0, TAU); ctx.stroke(); }
      const lab = [[T('B', 'N'), 0, -1], [T('N', 'S'), 0, 1], [T('Đ', 'E'), 1, 0], [T('T', 'W'), -1, 0]];
      for (const [t, dx, dy] of lab) textLight(ctx, t, cx + dx * (R + 12), cy + dy * (R + 10), '#166534', 12, 'center', 900);
      // vết đầu bóng trong cả ngày
      ctx.strokeStyle = 'rgba(100,116,139,.6)'; ctx.setLineDash([3, 4]); ctx.beginPath(); let first = true;
      for (let hh = 5; hh <= 19; hh += .1) { const q = sunAt(hh); if (q.alt < 10 * DEG) { first = true; continue; } const L2 = 1 / Math.tan(q.alt), x = cx - q.E / Math.cos(q.alt) * L2 * unit * Math.cos(q.alt), y = cy + q.N / Math.cos(q.alt) * L2 * unit * Math.cos(q.alt); if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y); }
      ctx.stroke(); ctx.setLineDash([]);
      const s = sunAt(shHour);
      if (s.alt > .5 * DEG) {
        const L2 = Math.min(3.2, 1 / Math.tan(s.alt)), ux = -Math.sin(s.A), uy = Math.cos(s.A);
        ctx.strokeStyle = 'rgba(30,41,59,.55)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + ux * L2 * unit, cy + uy * L2 * unit); ctx.stroke();
        drawSun(ctx, cx + Math.sin(s.A) * (R + 2), cy - Math.cos(s.A) * (R + 2), 8, .4);
      }
      ctx.fillStyle = '#92400e'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, TAU); ctx.fill();
      textLight(ctx, T('vòng = 1 m', 'ring = 1 m'), 8, h - 9, '#64748b', 10, 'left', 700);
    }
    const hourText = (hr) => { const H = Math.floor(hr), M = Math.floor((hr - H) * 60); return `${String(H).padStart(2, '0')}:${String(M).padStart(2, '0')}`; };
    function shInfo() {
      const s = sunAt(shHour), up = s.alt > 0;
      const len = up ? 1 / Math.tan(s.alt) : 0;
      const key = [lang, shSeason, shCity, up, Math.round(shHour * 4)].join('|');
      if (key !== shInfoKey) {
        shInfoKey = key;
        let noon = 12, best = -1; for (let hh = 9; hh <= 15; hh += .05) { const q = sunAt(hh); if (q.alt > best) { best = q.alt; noon = hh; } }
        const nLen = 1 / Math.tan(best);
        infoBox($('info_sh'), {
          emo: up ? '🌤️' : '🌙', title: up ? T('Bóng của cây cột', 'The pole’s shadow') : T('Ban đêm', 'Night time'),
          sub: `${hourText(shHour)} – ${L({ vi: { hn: 'Hà Nội', hcm: 'TP. Hồ Chí Minh' }[shCity], en: { hn: 'Hanoi', hcm: 'Ho Chi Minh City' }[shCity] })}`,
          rows: up ? [
            [T('Mặt Trời cao', 'Sun height'), `${Math.round(s.alt / DEG)}°`],
            [T('Bóng dài', 'Shadow length'), len > 9 ? T('rất dài (hơn 9 m)', 'very long (over 9 m)') : `${len.toFixed(1).replace('.', T(',', '.'))} m`],
            [T('Bóng chỉ về', 'Shadow points'), T(`hướng ${dirWord(s.A + Math.PI)}`, dirWord(s.A + Math.PI))],
            [T('Trưa hôm nay', 'Today at noon'), T(`bóng ngắn nhất, chỉ ${nLen.toFixed(2).replace('.', ',')} m`, `shortest, only ${nLen.toFixed(2)} m`)]
          ] : [[T('Vì sao?', 'Why?'), T('Mặt Trời đã lặn xuống dưới đường chân trời.', 'The Sun is below the horizon.')]],
          notes: [['fun', T('✨ Buổi sáng Mặt Trời ở phía Đông nên bóng ngả về phía Tây, buổi chiều thì ngược lại. Trưa là lúc bóng ngắn nhất.', '✨ In the morning the Sun is in the east, so shadows point west; in the afternoon it’s the opposite. Shadows are shortest at noon.')],
            ['tip', T('💡 Ở Việt Nam, trưa mùa hè Mặt Trời gần như ở ngay trên đỉnh đầu, nên bóng gần như nằm gọn dưới chân. Người xưa dùng bóng nắng để làm đồng hồ mặt trời.', '💡 In Vietnam, at noon in summer the Sun is almost straight overhead, so your shadow is almost under your feet. People once used shadows as sundials.')]]
        });
      }
      const hud = up ? `🕒 ${hourText(shHour)} – ${T('bóng dài', 'shadow')} ${len > 9 ? '> 9' : len.toFixed(1)} m ${T('về hướng', 'pointing')} ${dirWord(s.A + Math.PI)}` : `🌙 ${hourText(shHour)} – ${T('trời tối', 'dark')}`;
      if (hud !== shHudT) { shHudT = hud; setText('hud_sh', hud); }
      setText('shHourTxt', hourText(shHour));
    }
    const setShPlaying = (on) => { shPlaying = on; $('shPlay').textContent = on ? T('⏸ Tạm dừng', '⏸ Pause') : T('▶ Chạy', '▶ Play'); };
    $('shPlay').onclick = () => { cancelSpeech(); setShPlaying(!shPlaying); };
    $('shHour').addEventListener('input', () => { cancelSpeech(); setShPlaying(false); shHour = +$('shHour').value; shInfo(); });
    root.querySelectorAll('[data-season]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); shSeason = b.dataset.season; pressGroup('[data-season]', 'season', shSeason); shInfo(); }));
    root.querySelectorAll('[data-city]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); shCity = b.dataset.city; pressGroup('[data-city]', 'city', shCity); shInfo(); }));
    TABS.sh = {
      frame(dt) { if (shPlaying) { shHour += dt * .8; if (shHour > 19) shHour = 5; $('shHour').value = String(shHour); } drawSh(); drawShTop(); shInfo(); },
      refresh() { setShPlaying(shPlaying); shInfoKey = ''; shHudT = ''; shInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_sh'), {
      vi: [
        { q: 'Lúc nào trong ngày bóng của em ngắn nhất?', a: ['Buổi trưa', 'Sáng sớm', 'Chiều muộn', 'Lúc nào cũng như nhau'], why: 'Buổi trưa Mặt Trời lên cao nhất nên bóng ngắn nhất.' },
        { q: 'Buổi sáng, bóng cây ngả về hướng nào?', a: ['Hướng Tây', 'Hướng Đông', 'Hướng lên trời', 'Không có bóng'], why: 'Buổi sáng Mặt Trời ở phía Đông, bóng luôn ngả về phía ngược lại.' },
        { q: 'Vì sao có bóng?', a: ['Vật cản không cho ánh sáng đi qua', 'Vật tự tạo ra màu đen', 'Mặt đất bị ướt', 'Do gió thổi'], why: 'Ánh sáng đi thẳng, gặp vật cản thì phía sau vật không được chiếu sáng, tạo ra bóng.' },
        { q: 'Mặt Trời càng thấp thì bóng thế nào?', a: ['Càng dài', 'Càng ngắn', 'Biến mất', 'Đổi màu'], why: 'Mặt Trời thấp, tia nắng chiếu xiên nên bóng kéo dài.' },
        { q: 'Người xưa dùng bóng nắng để làm gì?', a: ['Xem giờ (đồng hồ mặt trời)', 'Nấu ăn', 'Đo nhiệt độ', 'Đoán thời tiết ngày mai'], why: 'Bóng đổi hướng theo giờ, nên có thể dùng làm đồng hồ mặt trời.' },
        { q: 'Mùa nào ở Hà Nội bóng buổi trưa dài nhất?', a: ['Mùa đông', 'Mùa hè', 'Mùa xuân', 'Như nhau'], why: 'Mùa đông Mặt Trời buổi trưa thấp hơn nên bóng dài hơn.' }
      ],
      en: [
        { q: 'When is your shadow shortest?', a: ['Around noon', 'Early morning', 'Late afternoon', 'Always the same'], why: 'At noon the Sun is highest, so shadows are shortest.' },
        { q: 'In the morning, which way do shadows point?', a: ['West', 'East', 'Up', 'There are none'], why: 'The morning Sun is in the east, so shadows point the other way.' },
        { q: 'Why do shadows form?', a: ['An object blocks the light', 'Objects make black colour', 'The ground is wet', 'The wind'], why: 'Light travels in straight lines; behind an object it can’t reach, so there is a shadow.' },
        { q: 'The lower the Sun, the shadow gets…', a: ['Longer', 'Shorter', 'Gone', 'A new colour'], why: 'A low Sun shines at a slant, stretching shadows out.' },
        { q: 'What did people use shadows for long ago?', a: ['Telling time (sundials)', 'Cooking', 'Measuring heat', 'Forecasting weather'], why: 'Shadows move with the hours, so they work as sundials.' },
        { q: 'In Hanoi, in which season is the noon shadow longest?', a: ['Winter', 'Summer', 'Spring', 'All the same'], why: 'In winter the noon Sun is lower, so shadows are longer.' }
      ]
    }));

    /* =====================================================================
       3. CẦU VỒNG: Mặt Trời sau lưng, mưa phía trước, góc khoảng 42°
       ===================================================================== */
    let rbAlt = 20, rbRain = true, rbSecond = true, rbInfoKey = '';
    const rbC = mk('c_rb', (w) => clamp(w * .62, 290, 520));
    const rbDrop = mk('c_rbDrop', (w) => clamp(w * .62, 180, 260));
    const RB = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#4f46e5', '#8b5cf6'];
    function drawRb() {
      const { w, h, ctx } = rbC;
      if (!w) return;
      const gy = h * .74, p = Math.min(h * .0115, w * .011), cx = w / 2;
      const sky = ctx.createLinearGradient(0, 0, 0, gy); sky.addColorStop(0, rbRain ? '#94a3b8' : '#7dd3fc'); sky.addColorStop(1, rbRain ? '#e2e8f0' : '#e0f2fe');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, gy);
      if (rbRain) {
        ctx.fillStyle = 'rgba(71,85,105,.75)';
        for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.ellipse(w * (.08 + k * .15), h * .06, w * .11, h * .07, 0, 0, TAU); ctx.fill(); }
        ctx.strokeStyle = 'rgba(148,163,184,.55)'; ctx.lineWidth = 1;
        for (let k = 0; k < 90; k++) { const x = (k * 37.3 + clock * 60) % w, y = (k * 53.1 + clock * 260) % gy; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 3, y + 10); ctx.stroke(); }
      }
      const cy = gy + rbAlt * p;
      if (rbRain) {
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, gy); ctx.clip();
        ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.arc(cx, cy, 40.4 * p, 0, TAU); ctx.fill();
        if (rbSecond) { ctx.fillStyle = 'rgba(30,41,59,.08)'; ctx.beginPath(); ctx.arc(cx, cy, 50 * p, 0, TAU); ctx.arc(cx, cy, 42.6 * p, 0, TAU, true); ctx.fill(); }
        const band = p * .55;
        RB.forEach((c, i) => { ctx.strokeStyle = c; ctx.globalAlpha = .85; ctx.lineWidth = band + .5; ctx.beginPath(); ctx.arc(cx, cy, (42.3 - i * .3) * p - i * band * .55, Math.PI, TAU); ctx.stroke(); });
        if (rbSecond) RB.slice().reverse().forEach((c, i) => { ctx.strokeStyle = c; ctx.globalAlpha = .35; ctx.lineWidth = band + .5; ctx.beginPath(); ctx.arc(cx, cy, (50.4 + i * .3) * p + i * band * .55, Math.PI, TAU); ctx.stroke(); });
        ctx.globalAlpha = 1; ctx.restore();
      }
      ctx.fillStyle = '#86efac'; ctx.fillRect(0, gy, w, h - gy);
      // bé và cái bóng chỉ về tâm cầu vồng
      const kx = cx, ky = h * .97;
      ctx.fillStyle = 'rgba(30,41,59,.35)'; ctx.beginPath(); ctx.moveTo(kx - 9, ky - 4); ctx.lineTo(kx + 9, ky - 4); ctx.lineTo(cx + 3, gy + 6 + (h - gy) * clamp(rbAlt / 60, 0, 1) * .5); ctx.lineTo(cx - 3, gy + 6 + (h - gy) * clamp(rbAlt / 60, 0, 1) * .5); ctx.fill();
      ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(kx, ky - h * .14, h * .035, 0, TAU); ctx.fill();
      rr(ctx, kx - h * .04, ky - h * .11, h * .08, h * .1, 8); ctx.fill();
      // Mặt Trời sau lưng
      ctx.fillStyle = 'rgba(255,255,255,.85)'; rr(ctx, 8, 8, 160, 62, 12); ctx.fill();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(18, 58); ctx.lineTo(158, 58); ctx.stroke();
      const sa = rbAlt * DEG; drawSun(ctx, 88 - Math.cos(sa) * 40, 58 - Math.sin(sa) * 36, 7, .4);
      textLight(ctx, T(`Mặt Trời sau lưng: ${rbAlt}°`, `Sun behind you: ${rbAlt}°`), 88, 18, '#334155', 10.5, 'center', 900);
      if (!rbRain) bubble(ctx, T('Không có giọt mưa thì không có cầu vồng', 'No raindrops, no rainbow'), w / 2, gy * .45, 12);
      else if (rbAlt >= 42) bubble(ctx, T('Mặt Trời quá cao: cầu vồng chìm dưới chân trời', 'Sun too high: the rainbow is below the horizon'), w / 2, gy * .45, 12);
    }
    function drawRbDrop() {
      const { w, h, ctx } = rbDrop;
      if (!w) return;
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, w, h);
      const cx = w * .55, cy = h * .48, R = Math.min(w, h) * .32;
      const g = ctx.createRadialGradient(cx - R * .3, cy - R * .3, 4, cx, cy, R); g.addColorStop(0, 'rgba(186,230,253,.5)'); g.addColorStop(1, 'rgba(56,189,248,.25)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(186,230,253,.8)'; ctx.lineWidth = 1.5; ctx.stroke();
      const inP = { x: cx - R * .72, y: cy - R * .69 }, back = { x: cx + R * .95, y: cy + R * .3 };
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, inP.y); ctx.lineTo(inP.x, inP.y); ctx.stroke();
      RB.forEach((c, i) => {
        const k = (i - 3) * .035;
        const b2 = { x: back.x - k * R * .4, y: back.y + k * R * 1.4 };
        const out = { x: cx - R * (.35 + k * .6), y: cy + R * (.93 - Math.abs(k) * .3) };
        ctx.strokeStyle = c; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(inP.x, inP.y); ctx.lineTo(b2.x, b2.y); ctx.lineTo(out.x, out.y);
        const ang = Math.PI * (.78 + i * .012); ctx.lineTo(out.x + Math.cos(ang) * w, out.y + Math.sin(ang) * w); ctx.stroke();
      });
      const t = (clock * .4) % 1, pulse = t < .3 ? { x: lerp(0, inP.x, t / .3), y: inP.y } : t < .65 ? { x: lerp(inP.x, back.x, (t - .3) / .35), y: lerp(inP.y, back.y, (t - .3) / .35) } : { x: lerp(back.x, cx - R * .35, (t - .65) / .35), y: lerp(back.y, cy + R * .93, (t - .65) / .35) };
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(pulse.x, pulse.y, 3.5, 0, TAU); ctx.fill();
      const fs = w < 300 ? 10 : 11;
      textLight(ctx, T('① ánh sáng trắng', '① white light'), 6, inP.y - 12, '#f8fafc', fs, 'left', 900);
      textLight(ctx, T('② bẻ cong', '② bends'), inP.x + 6, inP.y + 18, '#bae6fd', fs, 'left', 900);
      textLight(ctx, T('③ phản xạ', '③ bounces'), back.x - 4, back.y - 16, '#bae6fd', fs, 'right', 900);
      textLight(ctx, T('④ tách thành 7 màu', '④ splits into 7 colours'), 6, h - 10, '#fde68a', fs, 'left', 900);
    }
    function rbInfo() {
      const key = [lang, rbRain, rbAlt >= 42].join('|');
      if (key === rbInfoKey) return;
      rbInfoKey = key;
      const notes = [];
      if (!rbRain) notes.push(['warn', T('⚠️ Không có giọt nước thì không có cầu vồng. Bật "Có mưa" để thử lại.', '⚠️ Without water drops there is no rainbow. Turn on “Rain”.')]);
      else if (rbAlt >= 42) notes.push(['warn', T('⚠️ Mặt Trời cao hơn 42° nên cầu vồng nằm dưới đường chân trời. Vì vậy cầu vồng hay xuất hiện vào sáng sớm hoặc chiều muộn.', '⚠️ With the Sun above 42°, the rainbow sits below the horizon. That’s why rainbows appear in the early morning or late afternoon.')]);
      notes.push(['fun', T('✨ Bóng đầu của em luôn chỉ đúng vào tâm cầu vồng! Em có thể tự tạo cầu vồng: buổi sáng hoặc chiều, quay lưng về phía Mặt Trời rồi phun nước thành tia sương.', '✨ The shadow of your head always points to the rainbow’s centre! Make your own: in the morning or afternoon, stand with the Sun behind you and spray a fine mist of water.')]);
      infoBox($('info_rb'), {
        emo: '🌈', title: T('Cầu vồng hình thành thế nào?', 'How a rainbow forms'),
        rows: [[T('Cần gì?', 'You need'), T('Mặt Trời ở sau lưng, phía trước có mưa hoặc giọt nước.', 'The Sun behind you and rain or water drops in front.')],
          [T('Vì sao có màu?', 'Why colours?'), T('Ánh sáng trắng gồm nhiều màu. Đi qua giọt nước, mỗi màu bị bẻ cong một chút khác nhau nên tách ra.', 'White light is a mix of colours. In a raindrop each colour bends a little differently, so they spread apart.')],
          [T('Thứ tự màu', 'Colour order'), T('Đỏ, cam, vàng, lục, lam, chàm, tím. Màu đỏ ở ngoài cùng.', 'Red, orange, yellow, green, blue, indigo, violet. Red is on the outside.')],
          [T('Cầu vồng phụ', 'Second rainbow'), T('Mờ hơn, nằm bên ngoài, thứ tự màu ngược lại.', 'Fainter, outside the first, with colours reversed.')]],
        notes
      });
    }
    $('rbAlt').addEventListener('input', () => { rbAlt = +$('rbAlt').value; setText('rbAltTxt', `${rbAlt}°`); rbInfo(); });
    $('rbRain').onclick = () => { rbRain = !rbRain; $('rbRain').setAttribute('aria-pressed', String(rbRain)); rbInfo(); };
    $('rbSecond').onclick = () => { rbSecond = !rbSecond; $('rbSecond').setAttribute('aria-pressed', String(rbSecond)); };
    TABS.rb = {
      frame() { drawRb(); drawRbDrop(); const t = !rbRain ? T('🌥️ Trời không mưa: không có cầu vồng', '🌥️ No rain: no rainbow') : rbAlt >= 42 ? T('☀️ Mặt Trời quá cao: không thấy cầu vồng', '☀️ Sun too high: no rainbow') : T(`🌈 Thấy cầu vồng! Mặt Trời cao ${rbAlt}°`, `🌈 A rainbow! Sun at ${rbAlt}°`); setText('hud_rb', t); },
      refresh() { rbInfoKey = ''; setText('rbAltTxt', `${rbAlt}°`); rbInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_rb'), {
      vi: [
        { q: 'Muốn thấy cầu vồng, Mặt Trời phải ở đâu?', a: ['Ở sau lưng em', 'Ở ngay trước mặt em', 'Trên đỉnh đầu', 'Không cần Mặt Trời'], why: 'Cầu vồng luôn ở phía đối diện với Mặt Trời.' },
        { q: 'Cầu vồng có bao nhiêu màu chính?', a: ['7 màu', '3 màu', '5 màu', '10 màu'], why: 'Đỏ, cam, vàng, lục, lam, chàm, tím.' },
        { q: 'Màu nào nằm ngoài cùng của cầu vồng chính?', a: ['Màu đỏ', 'Màu tím', 'Màu xanh lục', 'Màu vàng'], why: 'Đỏ ở ngoài cùng, tím ở trong cùng.' },
        { q: 'Vì sao ánh sáng tách thành nhiều màu trong giọt mưa?', a: ['Mỗi màu bị bẻ cong khác nhau một chút', 'Giọt mưa có sơn màu', 'Mây nhuộm màu', 'Gió thổi tách màu'], why: 'Ánh sáng trắng gồm nhiều màu, mỗi màu bị nước bẻ cong một chút khác nhau.' },
        { q: 'Vì sao buổi trưa hè hiếm thấy cầu vồng?', a: ['Mặt Trời quá cao nên cầu vồng nằm dưới chân trời', 'Buổi trưa không có ánh sáng', 'Buổi trưa không bao giờ mưa', 'Cầu vồng đi ngủ trưa'], why: 'Khi Mặt Trời cao hơn khoảng 42°, cầu vồng chìm xuống dưới đường chân trời.' },
        { q: 'Em có thể tự tạo cầu vồng bằng cách nào?', a: ['Quay lưng về Mặt Trời, phun nước thành tia sương', 'Nhìn thẳng vào Mặt Trời', 'Tắt hết đèn', 'Thổi bong bóng trong phòng tối'], why: 'Tia nước nhỏ li ti đóng vai trò như giọt mưa.' }
      ],
      en: [
        { q: 'To see a rainbow, where must the Sun be?', a: ['Behind you', 'Right in front of you', 'Straight overhead', 'No Sun needed'], why: 'A rainbow is always opposite the Sun.' },
        { q: 'How many main colours does a rainbow have?', a: ['7', '3', '5', '10'], why: 'Red, orange, yellow, green, blue, indigo, violet.' },
        { q: 'Which colour is on the outside of the main rainbow?', a: ['Red', 'Violet', 'Green', 'Yellow'], why: 'Red is outermost; violet is innermost.' },
        { q: 'Why does light split into colours in a raindrop?', a: ['Each colour bends a slightly different amount', 'Raindrops are painted', 'Clouds dye it', 'The wind splits it'], why: 'White light is a mix; water bends each colour slightly differently.' },
        { q: 'Why are rainbows rare at summer noon?', a: ['The Sun is so high the rainbow is below the horizon', 'There’s no light at noon', 'It never rains at noon', 'Rainbows nap at noon'], why: 'With the Sun above about 42°, the rainbow sinks below the horizon.' },
        { q: 'How can you make your own rainbow?', a: ['Stand with the Sun behind you and spray a fine mist', 'Stare at the Sun', 'Turn off all lights', 'Blow bubbles in the dark'], why: 'The tiny water drops act like raindrops.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'fc';
    root.querySelectorAll('.nature-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.nature-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('n-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.nature-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.nature-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.nature-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
