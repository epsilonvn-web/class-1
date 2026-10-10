/* Epsilon Edu - Tool: Hieu cam xuc (Understanding feelings): banh xe cam xuc Plutchik, doc net mat, goc binh tinh, tinh huong, nhat ky
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.emotions = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "emotions";
  let activeCleanup = null;

  const CSS = `
.feel-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.feel-tool *{box-sizing:border-box}.feel-tool button,.feel-tool input{font:inherit}.feel-tool button{cursor:pointer}.feel-tool .hidden{display:none!important}
.feel-tool button:focus-visible,.feel-tool canvas:focus-visible,.feel-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.feel-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.feel-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.feel-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.feel-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.feel-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.feel-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.feel-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.feel-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.feel-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.feel-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.feel-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.feel-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.feel-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.feel-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.feel-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.feel-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.feel-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.feel-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.feel-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.feel-panel{width:100%}.feel-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.feel-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.feel-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.feel-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.feel-tool .card-head.compact{margin-bottom:9px}
.feel-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.feel-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.feel-tool .btn,.feel-tool .soft-btn,.feel-tool .segmented button,.feel-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.feel-tool .btn:hover,.feel-tool .soft-btn:hover,.feel-tool .segmented button:hover,.feel-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.feel-tool .btn{padding:0 12px}.feel-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.feel-tool .segmented{display:flex;gap:7px;margin:0}.feel-tool .segmented button{padding:0 13px}
.feel-tool .segmented button[aria-pressed="true"],.feel-tool .soft-btn[aria-pressed="true"],.feel-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.feel-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.feel-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.feel-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.feel-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.feel-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.feel-tool .range-control input{width:100%;accent-color:#8b5cf6}.feel-tool .range-control b{color:#7c3aed;font-size:13px}
.feel-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.feel-tool .soft-btn{padding:0 12px}
.feel-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.feel-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.feel-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.feel-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.feel-tool .info-title{display:flex;align-items:center;gap:10px}.feel-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.feel-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.feel-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.feel-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.feel-tool .facts{display:grid;gap:6px;margin-top:10px}.feel-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.feel-tool .facts b{color:#7c3aed;font-size:13.5px}.feel-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.feel-tool .fun,.feel-tool .warn,.feel-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.feel-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.feel-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.feel-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.feel-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.feel-tool .state-big.up{color:#0f766e}.feel-tool .state-big.down{color:#b45309}
.feel-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.feel-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.feel-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.feel-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.feel-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.feel-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.feel-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.feel-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.feel-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.feel-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.feel-tool .qopt:hover{filter:brightness(.985)}.feel-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.feel-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.feel-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.feel-tool .qfb,.feel-tool .score{font-size:13px;font-weight:900}.feel-tool .qfb.ok{color:#15803d}.feel-tool .qfb.no{color:#be123c}.feel-tool .score{color:#7c3aed}
.feel-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.feel-grid{grid-template-columns:1fr;align-items:start}.feel-side{grid-template-rows:auto auto;height:auto}.feel-tool .control-grid{grid-template-columns:1fr}.feel-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.feel-hero{flex-wrap:wrap;padding:12px}.feel-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.feel-tabs{grid-template-columns:1fr}.feel-tabs .tab{min-height:40px}.feel-card{padding:11px;border-radius:18px}.feel-tool .card-head{align-items:flex-start;flex-direction:column}.feel-tool .head-actions{width:100%;justify-content:space-between}.feel-tool .head-actions .segmented{flex:1;min-width:0}.feel-tool .head-actions .segmented button{flex:1;padding:0 8px}.feel-tool .qopts{grid-template-columns:1fr}.feel-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.feel-tool *{transition:none!important}}

.feel-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.feel-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.feel-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.feel-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.feel-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.feel-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.feel-tool .checklist{display:grid;gap:6px;margin-top:10px}
.feel-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.feel-tool .checklist .ok{color:#15803d}.feel-tool .checklist .no{color:#be123c}.feel-tool .checklist .wait{color:#94a3b8}
.feel-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.feel-tool .process span{flex:1}.feel-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.feel-tool .process .on{color:#0284c7}.feel-tool .process i.on{color:#ec4899}
@media(max-width:640px){.feel-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.feel-tool .slider-pair{grid-template-columns:1fr}}

.feel-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.feel-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.feel-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.feel-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.feel-tool .pulse-box{display:grid;gap:9px;margin-bottom:4px}
.feel-tool .opt-col{display:grid;gap:6px}
.feel-tool .opt-col .soft-btn{min-height:42px;padding:8px 12px;text-align:left;line-height:1.35;white-space:normal}
.feel-tool .soft-btn:disabled{opacity:.6;cursor:default;transform:none}
.feel-tool .soft-btn[aria-pressed="true"]:disabled{opacity:1}
.feel-tool .g54{display:flex;justify-content:space-between;align-items:center;gap:8px;min-height:40px;padding:6px 10px;border:1px solid #e0f2fe;border-radius:12px;background:#f7fcff;color:#334155;font-weight:800;font-size:13.5px;text-align:left;cursor:pointer}
.feel-tool .g54 b{color:#0ea5e9;letter-spacing:2px}
.feel-tool .slider-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 14px;margin-top:8px}
.feel-tool .diary-form{display:grid;gap:8px;margin-top:8px}
.feel-tool .diary-form input[type=text]{min-height:40px;border:1px solid #ddd6fe;border-radius:12px;padding:0 12px;font:inherit;font-size:14px;color:#334155}
.feel-tool .diary-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
@media(max-width:640px){.feel-tool .slider-grid{grid-template-columns:1fr}}

.feel-tabs{grid-template-columns:repeat(5,minmax(0,1fr))}
@media(max-width:640px){.feel-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="feel-tool" data-tool-root>
  <div class="feel-hero">
    <div class="feel-hero-icon" aria-hidden="true">💖</div>
    <div>
      <p class="feel-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="feel-lead" data-t="lead"></p>
    </div>
    <div class="feel-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="eAudioNotice" class="feel-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="feel-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="wheel" data-t="tab_wheel"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="face" data-t="tab_face"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="calm" data-t="tab_calm"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="story" data-t="tab_story"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="diary" data-t="tab_diary"></button>
  </div>
  <section id="e-wheel" class="feel-panel" role="tabpanel">
    <div class="feel-grid">
      <article class="feel-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_wheel"></h2></div>
          <div class="head-actions"><button id="whMix" class="soft-btn" type="button" aria-pressed="false" data-t="mix"></button><button id="whSpin" class="btn main" type="button" data-t="spin"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_wheel" role="img" data-ta="cv_wheel"></canvas></div>
        <p id="hud_wheel" class="hud" aria-live="polite"></p>
      </article>
      <div class="feel-side">
        <aside class="feel-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_wheel"></span><h2 data-t="sh_wheel"></h2></div></div>
          
          <div id="info_wheel" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_wheel" class="feel-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="e-face" class="feel-panel hidden" role="tabpanel">
    <div class="feel-grid">
      <article class="feel-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_face"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="modeL"><button type="button" data-fmode="guess" aria-pressed="true" data-t="mGuess"></button><button type="button" data-fmode="build" aria-pressed="false" data-t="mBuild"></button></div></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_face" role="img" data-ta="cv_face"></canvas></div>
        <p id="hud_face" class="hud" aria-live="polite"></p>
        <div id="faceSliders" class="slider-grid hidden">
            <label class="range-control"><span data-t="sBrow"></span><input id="fs_brow" type="range" min="-1" max="1" value="0" step="0.01"></label>
            <label class="range-control"><span data-t="sBrowY"></span><input id="fs_browY" type="range" min="0" max="1" value="0.35" step="0.01"></label>
            <label class="range-control"><span data-t="sEye"></span><input id="fs_eye" type="range" min="0.3" max="1.45" value="0.8" step="0.01"></label>
            <label class="range-control"><span data-t="sMouth"></span><input id="fs_mouth" type="range" min="-1" max="1" value="0" step="0.01"></label>
            <label class="range-control"><span data-t="sOpen"></span><input id="fs_open" type="range" min="0" max="1" value="0" step="0.01"></label>
        </div>
      </article>
      <div class="feel-side">
        <aside class="feel-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_face"></span><h2 data-t="sh_face"></h2></div></div>
          <div id="faceGame" class="pulse-box"></div>
          <div id="info_face" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_face" class="feel-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="e-calm" class="feel-panel hidden" role="tabpanel">
    <div class="feel-grid">
      <article class="feel-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_calm"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="techL"><button type="button" data-tech="box" aria-pressed="true" data-t="tBox"></button><button type="button" data-tech="hand" aria-pressed="false" data-t="tHand"></button></div><button id="cmRun" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_calm" role="img" data-ta="cv_calm"></canvas></div>
        <p id="hud_calm" class="hud" aria-live="polite"></p>
      </article>
      <div class="feel-side">
        <aside class="feel-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_calm"></span><h2 data-t="sh_calm"></h2></div></div>
          <div id="calmTools" class="pulse-box"></div>
          <div id="info_calm" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_calm" class="feel-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="e-story" class="feel-panel hidden" role="tabpanel">
    <div class="feel-grid">
      <article class="feel-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_story"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_story" role="img" data-ta="cv_story"></canvas></div>
        <p id="hud_story" class="hud" aria-live="polite"></p>
      </article>
      <div class="feel-side">
        <aside class="feel-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_story"></span><h2 data-t="sh_story"></h2></div></div>
          <div id="storyBox" class="pulse-box"></div>
          <div id="info_story" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_story" class="feel-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="e-diary" class="feel-panel hidden" role="tabpanel">
    <div class="feel-grid">
      <article class="feel-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_diary"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_diary" role="img" data-ta="cv_diary"></canvas></div>
        <p id="hud_diary" class="hud" aria-live="polite"></p>
        <div class="diary-form">
          <b id="dyDay" style="color:#6d28d9"></b>
          <div id="dyEmo" class="toggle-row" style="justify-content:flex-start"></div>
          <div class="diary-row"><span class="muted" data-t="intL"></span><div class="segmented"><button type="button" data-dl="0" data-t="i1"></button><button type="button" data-dl="1" data-t="i2"></button><button type="button" data-dl="2" data-t="i3"></button></div></div>
          <label class="range-control"><span data-t="noteL"></span><input id="dyNote" type="text" maxlength="120" autocomplete="off"></label>
          <div><button id="dySave" class="btn main" type="button" data-t="save"></button></div>
        </div>
      </article>
      <div class="feel-side">
        <aside class="feel-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_diary"></span><h2 data-t="sh_diary"></h2></div></div>
          
          <div id="info_diary" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_diary" class="feel-card quiz-card"></article>
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
    const audioNotice = $('eAudioNotice');
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
        speak([o.title, o.sub || '', ...(o.speechRows || o.rows || []).map((r) => `${r[0]}: ${r[1]}`), ...(o.notes || []).map((n) => n[1])].filter(Boolean).join('. ').replace(/[✨⚠️💡🎉📍🔥❄️☀️🌧️🌬️]/gu, ''));
      };
    }
    const setText = (id, t) => { const el = $(id); if (el && el.textContent !== t) el.textContent = t; };
    const pressGroup = (sel, attr, val) => root.querySelectorAll(sel).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[attr] === String(val))));

    const STR = {
      kicker: ['Epsilon Edu · Kỹ năng sống', 'Epsilon Edu · Life skills'],
      title: ['Hiểu cảm xúc', 'Understanding Feelings'],
      lead: ['Quay bánh xe cảm xúc, đọc nét mặt, tập thở cho bình tĩnh, xử lý tình huống và ghi nhật ký cảm xúc. Cảm xúc nào cũng có ích, quan trọng là mình hiểu và xử lý nó thế nào.', 'Spin the feelings wheel, read faces, breathe to calm down, handle real situations and keep a feelings diary. Every feeling is useful; what matters is understanding it and handling it well.'],
      tabsLabel: ['Các hoạt động', 'Activities'], eyeSim: ['Khám phá', 'Explore'],
      tab_wheel: ['🎡 Bánh xe cảm xúc', '🎡 Feelings wheel'], h_wheel: ['Gọi đúng tên cảm xúc', 'Name your feeling'],
      cv_wheel: ['Bánh xe 8 cảm xúc, mỗi cảm xúc có 3 mức. Bấm Quay hoặc bấm vào một ô', 'A wheel of 8 feelings, each at 3 strengths. Press Spin or tap a section'],
      se_wheel: ['Cảm xúc', 'Feeling'], sh_wheel: ['Em hiểu gì về cảm xúc này?', 'About this feeling'],
      tab_face: ['🙂 Đọc nét mặt', '🙂 Reading faces'], h_face: ['Khuôn mặt nói gì?', 'What does the face say?'],
      cv_face: ['Một khuôn mặt thể hiện cảm xúc qua lông mày, mắt và miệng', 'A face showing a feeling through eyebrows, eyes and mouth'],
      se_face: ['Thử thách', 'Challenge'], sh_face: ['Bạn ấy đang cảm thấy gì?', 'How is this person feeling?'],
      tab_calm: ['🌬️ Góc bình tĩnh', '🌬️ Calm corner'], h_calm: ['Thở chậm, lòng dịu lại', 'Slow breaths, calmer mind'],
      cv_calm: ['Bài tập thở và nhiệt kế cảm xúc', 'A breathing exercise and a feelings thermometer'],
      se_calm: ['Hộp công cụ', 'Toolbox'], sh_calm: ['Em đang ở mức nào?', 'Where are you on the thermometer?'],
      tab_story: ['📖 Tình huống', '📖 Situations'], h_story: ['Nếu là em, em sẽ làm gì?', 'What would you do?'],
      cv_story: ['Nhân vật trong tình huống và cảm xúc của bạn ấy', 'The character in the story and their feelings'],
      se_story: ['Câu chuyện', 'The story'], sh_story: ['Đọc và chọn', 'Read and choose'],
      tab_diary: ['📔 Nhật ký cảm xúc', '📔 Feelings diary'], h_diary: ['Cảm xúc 7 ngày của em', 'Your feelings over 7 days'],
      cv_diary: ['Biểu đồ cảm xúc trong 7 ngày gần nhất', 'A chart of your feelings over the last 7 days'],
      se_diary: ['Ghi lại', 'Write it down'], sh_diary: ['Hôm nay em thấy thế nào?', 'How do you feel today?'],
      spin: ['🎡 Quay!', '🎡 Spin!'], mix: ['🎨 Pha trộn cảm xúc', '🎨 Mix feelings'],
      mGuess: ['🔎 Đoán cảm xúc', '🔎 Guess'], mBuild: ['✏️ Tự vẽ khuôn mặt', '✏️ Draw a face'], modeL: ['Chế độ', 'Mode'],
      sBrow: ['Lông mày: chùng xuống ↔ cau lại', 'Eyebrows: drooping ↔ frowning'], sBrowY: ['Nâng lông mày', 'Raise eyebrows'], sEye: ['Mắt: nheo ↔ mở to', 'Eyes: narrow ↔ wide'], sMouth: ['Miệng: mếu ↔ cười', 'Mouth: frown ↔ smile'], sOpen: ['Há miệng', 'Open mouth'],
      tBox: ['⬜ Thở hộp', '⬜ Box breathing'], tHand: ['✋ Thở bàn tay', '✋ Hand breathing'], techL: ['Cách thở', 'Technique'], start: ['▶ Bắt đầu', '▶ Start'], stop: ['⏸ Dừng', '⏸ Stop'],
      intL: ['Mức độ', 'Strength'], i1: ['Nhẹ', 'Mild'], i2: ['Vừa', 'Medium'], i3: ['Mạnh', 'Strong'], save: ['💾 Lưu', '💾 Save'], noteL: ['Vì sao em thấy vậy? (không bắt buộc)', 'Why do you feel this way? (optional)']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;

    /* ---------- dữ liệu 8 cảm xúc gốc (theo mô hình Plutchik, giản lược cho học sinh) ---------- */
    const EMO = [
      { k: 'joy', col: '#facc15', face: { brow: 0, browY: .45, eye: .5, mouth: 1, open: .45, blush: .6 },
        lv: { vi: ['Thư thái', 'Vui', 'Sung sướng'], en: ['Content', 'Happy', 'Overjoyed'] },
        vi: { name: 'Vui', body: 'Mặt tươi tắn, cơ thể nhẹ nhõm, muốn cười, muốn nhảy nhót.', when: 'Được khen, chơi cùng bạn bè, đạt kết quả tốt, cả nhà quây quần.', helps: 'Giúp em gắn bó với mọi người và muốn cố gắng hơn.', todo: 'Chia sẻ niềm vui, cảm ơn những người đã giúp mình.', ask: 'Điều gì làm em vui nhất trong tuần này?' },
        en: { name: 'Joy', body: 'A bright face, a light body, wanting to laugh and jump.', when: 'Being praised, playing with friends, doing well, family time.', helps: 'Helps you bond with others and want to try harder.', todo: 'Share it, and thank the people who helped you.', ask: 'What made you happiest this week?' } },
      { k: 'trust', col: '#84cc16', face: { brow: -.15, browY: .4, eye: .55, mouth: .6, open: 0, blush: .8 },
        lv: { vi: ['Dễ chịu', 'Tin tưởng', 'Yêu quý'], en: ['Accepting', 'Trusting', 'Admiring'] },
        vi: { name: 'Tin tưởng', body: 'Thấy ấm áp, an toàn, muốn ở gần, muốn ôm.', when: 'Ở cạnh gia đình, bạn thân, thầy cô quan tâm mình.', helps: 'Giúp em kết bạn, hợp tác và nhờ giúp đỡ khi cần.', todo: 'Nói lời yêu thương, giữ lời hứa để người khác cũng tin mình.', ask: 'Em tin tưởng ai nhất? Vì sao?' },
        en: { name: 'Trust', body: 'Warm and safe, wanting to be close or give a hug.', when: 'With family, close friends, a caring teacher.', helps: 'Helps you make friends, work together and ask for help.', todo: 'Say kind words and keep promises so others can trust you too.', ask: 'Who do you trust most? Why?' } },
      { k: 'fear', col: '#16a34a', face: { brow: -.8, browY: .95, eye: 1.3, mouth: -.45, open: .55, blush: 0 },
        lv: { vi: ['Lo lắng', 'Sợ', 'Hoảng sợ'], en: ['Worried', 'Scared', 'Terrified'] },
        vi: { name: 'Sợ', body: 'Tim đập nhanh, tay chân run, mồ hôi, muốn chạy trốn.', when: 'Gặp nguy hiểm, bóng tối, sắp kiểm tra, đến nơi lạ.', helps: 'Giúp em cẩn thận, tránh xa nguy hiểm.', todo: 'Hít thở sâu, kể với người lớn, chuẩn bị kỹ trước việc mình lo.', ask: 'Điều gì làm em lo lắng? Ai có thể giúp em?' },
        en: { name: 'Fear', body: 'A racing heart, shaky hands, sweating, wanting to run.', when: 'Danger, the dark, a coming test, a new place.', helps: 'Keeps you careful and away from danger.', todo: 'Breathe deeply, tell an adult, prepare for what worries you.', ask: 'What worries you? Who could help?' } },
      { k: 'surprise', col: '#06b6d4', face: { brow: 0, browY: 1, eye: 1.45, mouth: 0, open: 1, blush: 0 },
        lv: { vi: ['Bối rối', 'Ngạc nhiên', 'Sửng sốt'], en: ['Puzzled', 'Surprised', 'Amazed'] },
        vi: { name: 'Ngạc nhiên', body: 'Mắt mở to, há miệng, giật mình.', when: 'Có chuyện bất ngờ xảy ra, tốt hoặc không tốt.', helps: 'Giúp em chú ý đến điều mới và học hỏi.', todo: 'Dừng lại một chút để hiểu chuyện gì đang xảy ra.', ask: 'Điều bất ngờ nhất em từng gặp là gì?' },
        en: { name: 'Surprise', body: 'Wide eyes, open mouth, a jump.', when: 'Something unexpected happens, good or bad.', helps: 'Makes you notice new things and learn.', todo: 'Pause to understand what is happening.', ask: 'What is the biggest surprise you’ve had?' } },
      { k: 'sad', col: '#3b82f6', face: { brow: -.95, browY: .55, eye: .55, mouth: -.85, open: 0, blush: 0, tear: 1 },
        lv: { vi: ['Buồn buồn', 'Buồn', 'Đau khổ'], en: ['Down', 'Sad', 'Heartbroken'] },
        vi: { name: 'Buồn', body: 'Muốn khóc, thấy mệt, không muốn chơi.', when: 'Mất đồ yêu thích, xa người thân, bị bạn giận, thú cưng bị ốm.', helps: 'Cho em biết điều gì quan trọng với mình, và giúp người khác biết em cần được an ủi.', todo: 'Khóc cũng không sao. Kể với người em tin tưởng, ôm gấu bông, làm việc em thích.', ask: 'Khi buồn, điều gì giúp em thấy khá hơn?' },
        en: { name: 'Sadness', body: 'Wanting to cry, feeling tired, not wanting to play.', when: 'Losing something you love, missing someone, a friend upset with you, a sick pet.', helps: 'Shows you what matters, and lets others know you need comfort.', todo: 'It’s okay to cry. Talk to someone you trust, hug a teddy, do something you enjoy.', ask: 'What helps you feel better when you’re sad?' } },
      { k: 'disgust', col: '#a855f7', face: { brow: .35, browY: .2, eye: .45, mouth: -.5, open: .2, blush: 0, wrinkle: 1 },
        lv: { vi: ['Chán', 'Khó chịu', 'Ghê sợ'], en: ['Bored', 'Disgusted', 'Revolted'] },
        vi: { name: 'Khó chịu', body: 'Nhăn mũi, quay mặt đi, có khi buồn nôn.', when: 'Ngửi mùi hôi, thấy đồ ăn hỏng, chứng kiến việc làm xấu.', helps: 'Giúp em tránh xa đồ bẩn, đồ hỏng và những việc không đúng.', todo: 'Lịch sự tránh đi. Nói nhẹ nhàng thay vì chê bai làm người khác buồn.', ask: 'Có việc làm nào khiến em thấy khó chịu không?' },
        en: { name: 'Disgust', body: 'A wrinkled nose, turning away, sometimes feeling sick.', when: 'Bad smells, spoiled food, seeing someone do something wrong.', helps: 'Keeps you away from dirty or spoiled things and wrong actions.', todo: 'Step away politely. Speak gently instead of mocking.', ask: 'Has anything made you feel disgusted?' } },
      { k: 'anger', col: '#ef4444', face: { brow: 1, browY: .1, eye: .7, mouth: -.6, open: .35, blush: 0, red: 1 },
        lv: { vi: ['Bực bội', 'Giận', 'Giận dữ'], en: ['Annoyed', 'Angry', 'Furious'] },
        vi: { name: 'Giận', body: 'Mặt nóng bừng, nắm chặt tay, tim đập mạnh, muốn hét.', when: 'Bị đối xử không công bằng, bị trêu chọc, bị lấy đồ.', helps: 'Báo cho em biết có điều không công bằng cần được thay đổi.', todo: 'Dừng lại, hít thở, đếm đến 10. Nói bằng lời "Mình không thích…" thay vì đánh hay la hét.', ask: 'Lần gần nhất em giận, em đã làm gì?' },
        en: { name: 'Anger', body: 'A hot face, clenched fists, a pounding heart, wanting to shout.', when: 'Being treated unfairly, teased, or having things taken.', helps: 'Tells you something unfair needs to change.', todo: 'Stop, breathe, count to 10. Say “I don’t like…” instead of hitting or shouting.', ask: 'The last time you were angry, what did you do?' } },
      { k: 'antic', col: '#f97316', face: { brow: .15, browY: .65, eye: 1.05, mouth: .45, open: .2, blush: .3, sparkle: 1 },
        lv: { vi: ['Tò mò', 'Háo hức', 'Rất háo hức'], en: ['Curious', 'Eager', 'Thrilled'] },
        vi: { name: 'Háo hức', body: 'Bồn chồn, mong ngóng, có khi khó ngủ.', when: 'Sắp đến sinh nhật, chuyến đi chơi, ngày Tết.', helps: 'Giúp em lên kế hoạch và chuẩn bị chu đáo.', todo: 'Chuẩn bị kỹ và kiên nhẫn chờ đợi.', ask: 'Em đang mong chờ điều gì?' },
        en: { name: 'Anticipation', body: 'Restless and looking forward, sometimes hard to sleep.', when: 'A birthday, a trip or Tet is coming.', helps: 'Helps you plan and prepare well.', todo: 'Get ready and wait patiently.', ask: 'What are you looking forward to?' } }
    ];
    const NEUTRAL = { brow: 0, browY: .35, eye: .8, mouth: 0, open: 0, blush: 0 };
    const EMO_BY = Object.fromEntries(EMO.map((e) => [e.k, e]));
    // Pha trộn hai cảm xúc cạnh nhau (theo Plutchik)
    const BLENDS = {
      'joy+trust': { vi: ['Yêu thương', 'Vui + tin tưởng: cảm giác gắn bó, muốn quan tâm ai đó.'], en: ['Love', 'Joy + trust: feeling close and wanting to care for someone.'] },
      'trust+fear': { vi: ['Rụt rè, nghe theo', 'Tin tưởng + sợ: muốn làm theo người khác vì chưa tự tin.'], en: ['Submission', 'Trust + fear: going along with others because you feel unsure.'] },
      'fear+surprise': { vi: ['Choáng ngợp', 'Sợ + ngạc nhiên: như khi đứng trước một thứ quá to lớn, kỳ vĩ.'], en: ['Awe', 'Fear + surprise: like standing before something huge and amazing.'] },
      'surprise+sad': { vi: ['Thất vọng', 'Ngạc nhiên + buồn: điều mình mong đã không xảy ra.'], en: ['Disappointment', 'Surprise + sadness: what you hoped for didn’t happen.'] },
      'sad+disgust': { vi: ['Hối hận', 'Buồn + khó chịu với chính mình: tiếc vì đã làm sai.'], en: ['Remorse', 'Sadness + disgust with yourself: sorry you did wrong.'] },
      'disgust+anger': { vi: ['Coi thường', 'Khó chịu + giận: nhìn ai đó với ánh mắt chê bai. Nên tránh vì làm người khác tổn thương.'], en: ['Contempt', 'Disgust + anger: looking down on someone. Best avoided, it hurts people.'] },
      'anger+antic': { vi: ['Hung hăng', 'Giận + háo hức: muốn lao vào tranh cãi, đánh nhau. Cần dừng lại và hít thở.'], en: ['Aggression', 'Anger + anticipation: wanting to jump into a fight. Time to stop and breathe.'] },
      'antic+joy': { vi: ['Lạc quan', 'Háo hức + vui: tin rằng điều tốt đẹp sẽ đến.'], en: ['Optimism', 'Anticipation + joy: believing good things are coming.'] }
    };

    /* ---------- vẽ khuôn mặt (dùng chung cho nhiều tab) ---------- */
    function drawFace(ctx, x, y, r, p, opt = {}) {
      const skin = opt.skin || '#fde7c7';
      const red = clamp(p.red || 0, 0, 1);
      const fg = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .2, x, y, r);
      fg.addColorStop(0, mix(skin, '#fecaca', red * .7)); fg.addColorStop(1, mix('#f6c99a', '#f87171', red * .6));
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(146,64,14,.35)'; ctx.lineWidth = Math.max(1.5, r * .03); ctx.stroke();
      if (opt.hair !== false) { ctx.fillStyle = opt.hairCol || '#3f2a14'; ctx.beginPath(); ctx.arc(x, y - r * .05, r * 1.02, Math.PI * 1.08, Math.PI * 1.92); ctx.quadraticCurveTo(x, y - r * .55, x - r * .9, y - r * .45); ctx.fill(); }
      const ex = r * .36, ey = y - r * .08, er = r * .13;
      // má hồng
      if (p.blush > .02) { ctx.fillStyle = `rgba(244,114,182,${.35 * p.blush})`; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + s * r * .55, y + r * .22, r * .16, r * .09, 0, 0, TAU); ctx.fill(); } }
      // mắt
      for (const s of [-1, 1]) {
        const cx = x + s * ex, open = clamp(p.eye, .15, 1.5);
        if (open < .62 && p.mouth > .3) { ctx.strokeStyle = '#1f2937'; ctx.lineWidth = Math.max(2, r * .05); ctx.beginPath(); ctx.arc(cx, ey + er * .4, er * .9, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); continue; }
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(cx, ey, er * 1.05, er * open, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(31,41,55,.5)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.arc(cx, ey + er * .05, er * .55 * Math.min(1, open + .2), 0, TAU); ctx.fill();
        ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(cx, ey + er * .05, er * .28, 0, TAU); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx - er * .2, ey - er * .2, er * .14, 0, TAU); ctx.fill();
        if (p.sparkle) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx + er * .18, ey + er * .2, er * .08, 0, TAU); ctx.fill(); }
      }
      // lông mày: brow > 0 cau lại (đầu trong hạ xuống), brow < 0 chùng (đầu trong nâng lên)
      ctx.strokeStyle = opt.hairCol || '#3f2a14'; ctx.lineWidth = Math.max(2.5, r * .07); ctx.lineCap = 'round';
      for (const s of [-1, 1]) {
        const by = ey - er * 1.5 - p.browY * r * .14, inner = { x: x + s * r * .12, y: by + p.brow * r * .12 }, outer = { x: x + s * r * .52, y: by - p.brow * r * .05 };
        ctx.beginPath(); ctx.moveTo(inner.x, inner.y); ctx.quadraticCurveTo((inner.x + outer.x) / 2, Math.min(inner.y, outer.y) - r * .05, outer.x, outer.y); ctx.stroke();
      }
      // mũi
      ctx.strokeStyle = 'rgba(146,64,14,.5)'; ctx.lineWidth = Math.max(1.5, r * .035);
      ctx.beginPath(); ctx.moveTo(x - r * .04, y + r * .02); ctx.quadraticCurveTo(x - r * .08, y + r * .17, x + r * .03, y + r * .18); ctx.stroke();
      if (p.wrinkle) { ctx.beginPath(); ctx.moveTo(x - r * .1, y - r * .02); ctx.lineTo(x - r * .04, y + r * .03); ctx.moveTo(x + r * .1, y - r * .02); ctx.lineTo(x + r * .04, y + r * .03); ctx.stroke(); }
      // miệng
      const my = y + r * .45, mw = r * .32, curve = clamp(p.mouth, -1, 1), op = clamp(p.open, 0, 1);
      ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = Math.max(2.5, r * .055);
      if (op > .75 && Math.abs(curve) < .2) { ctx.fillStyle = '#7f1d1d'; ctx.beginPath(); ctx.ellipse(x, my, mw * .4, r * .16 * op, 0, 0, TAU); ctx.fill(); }
      else {
        const dip = curve * r * .2, skew = p.wrinkle ? r * .06 : 0;
        ctx.beginPath(); ctx.moveTo(x - mw, my - dip * .3 + skew); ctx.quadraticCurveTo(x, my + dip, x + mw, my - dip * .3 - skew);
        if (op > .05) { ctx.quadraticCurveTo(x, my + dip + r * .25 * op * (curve >= 0 ? 1 : -.2) + (curve < 0 ? r * .12 * op : 0), x - mw, my - dip * .3 + skew); ctx.fillStyle = '#7f1d1d'; ctx.fill(); if (curve > .3) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.rect(x - mw * .7, my + dip * .55, mw * 1.4, r * .06); ctx.fill(); } }
        else ctx.stroke();
      }
      if (p.tear) { ctx.fillStyle = 'rgba(56,189,248,.9)'; const t = (clock * .6) % 1; ctx.beginPath(); ctx.ellipse(x - ex - er * .3, ey + er + t * r * .45, r * .045, r * .07, 0, 0, TAU); ctx.fill(); }
    }
    const blendFace = (a, b, t) => { const o = {}; for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) o[k] = lerp(a[k] || 0, b[k] || 0, t); return o; };

    /* =====================================================================
       1. BÁNH XE CẢM XÚC
       ===================================================================== */
    let wh = { ang: 0, vel: 0, sel: { i: 0, lvl: 1 }, mix: false, picks: [], spinning: false, infoKey: '', face: { ...NEUTRAL } };
    const whC = mk('c_wheel', (w) => clamp(w * .78, 330, 620));
    const RING = [.22, .5, .76, 1.0];
    function whGeom() { const { w, h } = whC, R = Math.min(w * .46, h * .44); return { w, h, cx: w / 2, cy: h * .52, R }; }
    function petalAt(g, px, py) {
      const dx = px - g.cx, dy = py - g.cy, d = Math.hypot(dx, dy) / g.R;
      if (d < RING[0] || d > 1) return null;
      let a = Math.atan2(dy, dx) - wh.ang + Math.PI / 2; a = ((a % TAU) + TAU) % TAU;
      const i = Math.floor((a + Math.PI / 8) / (TAU / 8)) % 8, lvl = d < RING[1] ? 2 : d < RING[2] ? 1 : 0;
      return { i, lvl };
    }
    function drawWheel(dt) {
      const g = whGeom(), { w, h } = g, ctx = whC.ctx;
      if (!w) return;
      if (wh.spinning) {
        wh.ang += wh.vel * dt; wh.vel *= Math.pow(.45, dt);
        if (wh.vel < .15) { wh.spinning = false; const a = ((-wh.ang) % TAU + TAU) % TAU; wh.sel = { i: Math.round(a / (TAU / 8)) % 8, lvl: Math.floor(rand(0, 3)) }; whInfo(true); }
      }
      ctx.fillStyle = '#fffbf5'; ctx.fillRect(0, 0, w, h);
      const sp = TAU / 8;
      EMO.forEach((e, i) => {
        const a0 = wh.ang - Math.PI / 2 + i * sp - sp / 2, a1 = a0 + sp;
        for (let lvl = 0; lvl < 3; lvl++) {
          const r0 = RING[2 - lvl] * g.R, r1 = RING[3 - lvl] * g.R;
          const shade = [.55, .25, 0][lvl];
          let col = mix(e.col, '#ffffff', shade);
          const isSel = wh.sel && wh.sel.i === i && wh.sel.lvl === lvl && !wh.mix, picked = wh.mix && wh.picks.includes(i);
          ctx.fillStyle = col; ctx.beginPath(); ctx.arc(g.cx, g.cy, r1, a0, a1); ctx.arc(g.cx, g.cy, r0, a1, a0, true); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
          if (isSel || picked) { ctx.strokeStyle = '#1e1b4b'; ctx.lineWidth = 4; ctx.stroke(); }
          const am = (a0 + a1) / 2, rm = (r0 + r1) / 2, word = L(e.lv)[lvl];
          ctx.save(); ctx.translate(g.cx + Math.cos(am) * rm, g.cy + Math.sin(am) * rm);
          let rot = am + Math.PI / 2; if (Math.sin(am) > .15) rot += Math.PI; ctx.rotate(rot);
          const fs = Math.max(8.5, Math.min(13, g.R * .055)) * (lvl === 1 ? 1.08 : 1);
          ctx.font = `900 ${fs}px system-ui, sans-serif`;
          let t2 = word; while (ctx.measureText(t2).width > (r1 - r0 > 0 ? 2 * rm * Math.sin(sp / 2) * .92 : 60) && t2.length > 3) t2 = t2.slice(0, -1);
          textLight(ctx, t2 === word ? word : t2 + '.', 0, 0, lvl === 2 ? '#fff' : '#1f2937', fs, 'center', 900);
          ctx.restore();
        }
      });
      // tâm: khuôn mặt
      const target = wh.mix && wh.picks.length === 2 ? blendFace(EMO[wh.picks[0]].face, EMO[wh.picks[1]].face, .5) : wh.sel ? EMO[wh.sel.i].face : NEUTRAL;
      const strength = wh.sel ? [.5, .8, 1.1][wh.sel.lvl] : 1, tgt = blendFace(NEUTRAL, target, wh.mix ? 1 : strength);
      wh.face = blendFace(wh.face, tgt, Math.min(1, dt * 6));
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(g.cx, g.cy, RING[0] * g.R, 0, TAU); ctx.fill();
      drawFace(ctx, g.cx, g.cy, RING[0] * g.R * .82, wh.face);
      // kim chỉ
      ctx.fillStyle = '#1e1b4b'; ctx.beginPath(); ctx.moveTo(g.cx - 12, g.cy - g.R - 16); ctx.lineTo(g.cx + 12, g.cy - g.R - 16); ctx.lineTo(g.cx, g.cy - g.R + 6); ctx.closePath(); ctx.fill();
      textLight(ctx, T('ngoài: nhẹ · giữa: vừa · trong: mạnh', 'outer: mild · middle · inner: strong'), 10, h - 10, '#a8a29e', 10.5, 'left', 800);
    }
    whC.c.addEventListener('pointerdown', (e) => {
      if (wh.spinning) return;
      const g = whGeom(), p = localPoint(whC.c, e), hit = petalAt(g, p.x, p.y);
      if (!hit) return;
      cancelSpeech();
      if (wh.mix) { if (wh.picks.includes(hit.i)) wh.picks = wh.picks.filter((x) => x !== hit.i); else { wh.picks.push(hit.i); if (wh.picks.length > 2) wh.picks.shift(); } }
      else wh.sel = hit;
      whInfo(true);
    });
    $('whSpin').onclick = () => { if (wh.spinning) return; cancelSpeech(); wh.mix = false; $('whMix').setAttribute('aria-pressed', 'false'); wh.picks = []; wh.vel = rand(9, 14); wh.spinning = true; whInfo(true); };
    $('whMix').onclick = () => { cancelSpeech(); wh.mix = !wh.mix; $('whMix').setAttribute('aria-pressed', String(wh.mix)); wh.picks = []; whInfo(true); };
    function whInfo(force) {
      const key = [lang, wh.mix, wh.picks.join(), wh.sel && wh.sel.i, wh.sel && wh.sel.lvl, wh.spinning].join('|');
      if (key === wh.infoKey && !force) return; wh.infoKey = key;
      if (wh.spinning) { infoBox($('info_wheel'), { emo: '🎡', title: T('Bánh xe đang quay…', 'Spinning…'), rows: [], notes: [] }); setText('hud_wheel', T('🎡 Đang quay…', '🎡 Spinning…')); return; }
      if (wh.mix) {
        if (wh.picks.length < 2) { infoBox($('info_wheel'), { emo: '🎨', title: T('Pha trộn cảm xúc', 'Mixing feelings'), sub: T('Chọn 2 cảm xúc nằm cạnh nhau', 'Pick 2 neighbouring feelings'), rows: [[T('Vì sao?', 'Why?'), T('Nhiều khi ta có hai cảm xúc cùng lúc. Chúng trộn lại thành một cảm xúc mới, giống như pha màu vậy.', 'We often feel two things at once. They mix into a new feeling, like mixing paints.')]], notes: [] }); setText('hud_wheel', T('🎨 Chọn 2 ô cạnh nhau để pha trộn', '🎨 Pick two neighbouring sections')); return; }
        const [a, b] = wh.picks.slice().sort((x, y) => x - y), adj = b - a === 1 || (a === 0 && b === 7);
        const k = adj ? (a === 0 && b === 7 ? 'antic+joy' : `${EMO[a].k}+${EMO[b].k}`) : null, bl = k && BLENDS[k];
        if (bl) { const d = L(bl); infoBox($('info_wheel'), { emo: '🎨', title: d[0], sub: `${L(EMO[a]).name} + ${L(EMO[b]).name}`, rows: [[T('Hiểu thế nào?', 'Meaning'), d[1]]], notes: [['tip', T('💡 Biết mình đang có cảm xúc pha trộn giúp em hiểu bản thân rõ hơn.', '💡 Knowing you have mixed feelings helps you understand yourself better.')]] }); setText('hud_wheel', `🎨 ${L(EMO[a]).name} + ${L(EMO[b]).name} = ${d[0]}`); }
        else { infoBox($('info_wheel'), { emo: '🎨', title: T('Hãy chọn hai ô nằm cạnh nhau', 'Pick two neighbours'), rows: [[T('Mẹo', 'Tip'), T('Hai cảm xúc đối diện nhau như Vui và Buồn là hai cảm xúc ngược nhau, ít khi trộn lẫn.', 'Opposite feelings like joy and sadness rarely mix.')]], notes: [] }); setText('hud_wheel', T('🎨 Hai ô này không nằm cạnh nhau', '🎨 Those two aren’t neighbours')); }
        return;
      }
      const e = EMO[wh.sel.i], d = L(e), word = L(e.lv)[wh.sel.lvl], opp = L(EMO[(wh.sel.i + 4) % 8]).name;
      infoBox($('info_wheel'), {
        emo: '💭', title: word, sub: T(`${d.name} ở mức ${['nhẹ', 'vừa', 'mạnh'][wh.sel.lvl]} – ngược với ${opp.toLowerCase()}`, `${d.name}, ${['mild', 'medium', 'strong'][wh.sel.lvl]} – opposite of ${opp.toLowerCase()}`),
        rows: [[T('Cơ thể', 'In the body'), d.body], [T('Khi nào?', 'When?'), d.when], [T('Có ích gì?', 'How it helps'), d.helps], [T('Em có thể', 'You can'), d.todo]],
        notes: [['tip', `💬 ${d.ask}`], ['fun', T('✨ Không có cảm xúc "xấu". Cảm xúc nào cũng có ích, điều quan trọng là mình xử lý nó thế nào.', '✨ There are no “bad” feelings. Every feeling is useful; what matters is how you handle it.')]]
      });
      setText('hud_wheel', `💭 ${word} (${d.name})`);
    }
    TABS.wheel = { frame(dt) { drawWheel(dt); }, refresh() { wh.infoKey = ''; whInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_wheel'), {
      vi: [
        { q: 'Theo bánh xe cảm xúc, cảm xúc nào ngược với "Vui"?', a: ['Buồn', 'Giận', 'Sợ', 'Háo hức'], why: 'Trên bánh xe, Vui và Buồn nằm đối diện nhau.' },
        { q: '"Bực bội" là mức nhẹ của cảm xúc nào?', a: ['Giận', 'Buồn', 'Sợ', 'Vui'], why: 'Giận có ba mức: bực bội, giận, giận dữ.' },
        { q: 'Cảm xúc sợ có ích gì?', a: ['Giúp em cẩn thận, tránh nguy hiểm', 'Không có ích gì', 'Làm em mạnh hơn người khác', 'Giúp em ngủ ngon'], why: 'Nỗi sợ là "chuông báo động" giúp ta an toàn.' },
        { q: 'Vui + Tin tưởng trộn lại thành cảm xúc gì?', a: ['Yêu thương', 'Thất vọng', 'Hối hận', 'Hung hăng'], why: 'Theo Plutchik, vui cộng tin tưởng là yêu thương.' },
        { q: 'Câu nào đúng về cảm xúc?', a: ['Cảm xúc nào cũng có ích, quan trọng là cách xử lý', 'Chỉ cảm xúc vui là tốt', 'Phải giấu hết cảm xúc buồn', 'Giận thì được đánh bạn'], why: 'Hiểu và gọi đúng tên cảm xúc giúp ta xử lý nó tốt hơn.' },
        { q: 'Vì sao nên gọi đúng tên cảm xúc của mình?', a: ['Để hiểu mình và nói cho người khác biết', 'Để khoe với bạn', 'Để không phải học bài', 'Không cần thiết'], why: 'Nói được "Mình đang thấy lo lắng" giúp người khác biết cách giúp em.' }
      ],
      en: [
        { q: 'On the wheel, which feeling is opposite joy?', a: ['Sadness', 'Anger', 'Fear', 'Anticipation'], why: 'Joy and sadness sit opposite each other.' },
        { q: '“Annoyed” is the mild form of…', a: ['Anger', 'Sadness', 'Fear', 'Joy'], why: 'Anger goes annoyed, angry, furious.' },
        { q: 'How is fear useful?', a: ['It keeps you careful and safe', 'It isn’t', 'It makes you stronger than others', 'It helps you sleep'], why: 'Fear is an alarm that keeps us safe.' },
        { q: 'Joy + trust mix into…', a: ['Love', 'Disappointment', 'Remorse', 'Aggression'], why: 'In Plutchik’s wheel, joy plus trust is love.' },
        { q: 'Which is true about feelings?', a: ['Every feeling is useful; how you handle it matters', 'Only happy feelings are good', 'Hide all sad feelings', 'Anger means you can hit'], why: 'Understanding and naming feelings helps you handle them.' },
        { q: 'Why name your feelings?', a: ['To understand yourself and tell others', 'To show off', 'To skip homework', 'No reason'], why: 'Saying “I feel worried” helps others know how to help.' }
      ]
    }));

    /* =====================================================================
       2. ĐỌC NÉT MẶT: đoán cảm xúc + tự vẽ khuôn mặt
       ===================================================================== */
    let fc = { mode: 'guess', idx: 0, opts: [], ans: -1, score: 0, total: 0, face: { ...NEUTRAL }, jit: {}, infoKey: '' };
    const fcC = mk('c_face', (w) => clamp(w * .58, 280, 460));
    const SL = ['brow', 'browY', 'eye', 'mouth', 'open'];
    function fcNew() {
      let i; do { i = Math.floor(rand(0, 8)); } while (i === fc.idx && fc.total > 0);
      fc.idx = i; fc.ans = -1;
      const others = [0, 1, 2, 3, 4, 5, 6, 7].filter((x) => x !== i).sort(() => Math.random() - .5).slice(0, 3);
      fc.opts = [i, ...others].sort(() => Math.random() - .5);
      fc.jit = { brow: rand(-.08, .08), browY: rand(-.05, .05), mouth: rand(-.08, .08) };
      fcGameRender();
    }
    function fcBuildFace() { const o = {}; SL.forEach((k) => { o[k] = +$(`fs_${k}`).value; }); o.blush = Math.max(0, o.mouth) * .6; o.tear = o.mouth < -.7 && o.brow < -.6 ? 1 : 0; o.red = o.brow > .7 && o.mouth < -.3 ? .6 : 0; return o; }
    function fcNearest(f) {
      let best = -1, bd = 1e9;
      EMO.forEach((e, i) => { const p = e.face; const d = (p.brow - f.brow) ** 2 * 1.2 + (p.browY - f.browY) ** 2 + (p.eye - f.eye) ** 2 * .8 + (p.mouth - f.mouth) ** 2 * 1.5 + (p.open - f.open) ** 2; if (d < bd) { bd = d; best = i; } });
      const dn = (NEUTRAL.brow - f.brow) ** 2 * 1.2 + (NEUTRAL.browY - f.browY) ** 2 + (NEUTRAL.eye - f.eye) ** 2 * .8 + (NEUTRAL.mouth - f.mouth) ** 2 * 1.5 + (NEUTRAL.open - f.open) ** 2;
      return dn < bd ? -1 : best;
    }
    function drawFc(dt) {
      const { w, h, ctx } = fcC;
      if (!w) return;
      let target, col = '#f1f5f9';
      if (fc.mode === 'guess') { target = { ...EMO[fc.idx].face }; for (const k in fc.jit) target[k] = (target[k] || 0) + fc.jit[k]; if (fc.ans >= 0) col = mix(EMO[fc.idx].col, '#ffffff', .75); }
      else { target = fcBuildFace(); const n = fcNearest(target); col = n >= 0 ? mix(EMO[n].col, '#ffffff', .78) : '#f1f5f9'; }
      fc.face = blendFace(fc.face, target, Math.min(1, dt * 7));
      ctx.fillStyle = col; ctx.fillRect(0, 0, w, h);
      drawFace(ctx, w / 2, h * .5, Math.min(w, h) * .36, fc.face);
      if (fc.mode === 'build') { const n = fcNearest(fc.face); bubble(ctx, n >= 0 ? T(`Trông như đang: ${L(EMO[n]).name}`, `Looks like: ${L(EMO[n]).name}`) : T('Trông bình thường', 'Looks neutral'), w / 2, h * .08, 14); }
      else if (fc.ans < 0) bubble(ctx, T('Bạn ấy đang cảm thấy gì?', 'How is this person feeling?'), w / 2, h * .08, 14);
    }
    function fcGameRender() {
      const box = $('faceGame');
      if (fc.mode === 'build') { box.innerHTML = `<p class="muted" style="margin:0">${T('Kéo các thanh trượt bên dưới để vẽ khuôn mặt theo cảm xúc em chọn. Tool sẽ đoán cảm xúc từ khuôn mặt em vẽ!', 'Drag the sliders below to draw a face. The tool will guess the feeling!')}</p>`; return; }
      box.innerHTML = `<div class="toggle-row" style="justify-content:flex-start">${fc.opts.map((i) => `<button type="button" class="soft-btn" data-fo="${i}"></button>`).join('')}</div>
        <p class="score" style="margin:0">${T(`Đúng ${fc.score} / ${fc.total}`, `Correct ${fc.score} / ${fc.total}`)}</p>
        ${fc.ans >= 0 ? `<p class="${fc.ans === fc.idx ? 'fun' : 'warn'}" style="margin:0"></p><button id="fcNext" class="btn main" type="button">${T('Khuôn mặt khác ▶', 'Next face ▶')}</button>` : ''}`;
      box.querySelectorAll('[data-fo]').forEach((b) => { const i = +b.dataset.fo; b.textContent = L(EMO[i]).name; if (fc.ans >= 0) { if (i === fc.idx) b.setAttribute('aria-pressed', 'true'); b.disabled = true; } });
      if (fc.ans >= 0) {
        const e = EMO[fc.idx];
        box.querySelectorAll('p')[1].textContent = (fc.ans === fc.idx ? T('🎉 Đúng rồi! ', '🎉 Right! ') : T(`Chưa đúng, đây là ${L(e).name.toLowerCase()}. `, `Not quite, this is ${L(e).name.toLowerCase()}. `)) + T(`Dấu hiệu: ${L(e).body}`, `Clues: ${L(e).body}`);
        $('fcNext').onclick = () => { cancelSpeech(); fcNew(); };
      }
    }
    $('faceGame').addEventListener('click', (e) => { const b = e.target.closest('[data-fo]'); if (!b || fc.ans >= 0) return; cancelSpeech(); fc.ans = +b.dataset.fo; fc.total++; if (fc.ans === fc.idx) fc.score++; fcGameRender(); });
    root.querySelectorAll('[data-fmode]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); fc.mode = b.dataset.fmode; pressGroup('[data-fmode]', 'fmode', fc.mode); $('faceSliders').classList.toggle('hidden', fc.mode !== 'build'); fcGameRender(); }));
    function fcInfo() {
      if (fc.infoKey === lang) return; fc.infoKey = lang;
      infoBox($('info_face'), {
        emo: '🙂', title: T('Mẹo đọc nét mặt', 'Face-reading tips'),
        rows: [[T('Lông mày', 'Eyebrows'), T('Cau lại, hạ xuống: giận. Đầu trong nhướn lên: buồn, sợ. Nhướn cao cả hai: ngạc nhiên.', 'Pulled down together: anger. Inner ends raised: sadness or fear. Both raised high: surprise.')],
          [T('Mắt', 'Eyes'), T('Mở to: sợ, ngạc nhiên. Híp lại khi cười: vui.', 'Wide: fear or surprise. Crinkled in a smile: joy.')],
          [T('Miệng', 'Mouth'), T('Cong lên: vui. Trễ xuống: buồn. Há tròn: ngạc nhiên. Méo, nhăn mũi: khó chịu.', 'Turned up: happy. Turned down: sad. Round and open: surprised. Twisted with a wrinkled nose: disgusted.')]],
        notes: [['tip', T('💬 Nét mặt chỉ là gợi ý. Cách tốt nhất để biết bạn cảm thấy thế nào là hỏi nhẹ nhàng: "Bạn ổn chứ?"', '💬 Faces are only clues. The best way to know how someone feels is to ask kindly: “Are you okay?”')]]
      });
    }
    TABS.face = { frame(dt) { drawFc(dt); fcInfo(); setText('hud_face', fc.mode === 'guess' ? T(`🔎 Đoán đúng ${fc.score}/${fc.total} khuôn mặt`, `🔎 ${fc.score}/${fc.total} faces correct`) : T('✏️ Kéo thanh trượt để thay đổi khuôn mặt', '✏️ Drag the sliders to change the face')); }, refresh() { fc.infoKey = ''; fcInfo(); if (!fc.opts.length) fcNew(); else fcGameRender(); } };
    QUIZZES.push(makeQuiz($('quiz_face'), {
      vi: [
        { q: 'Lông mày cau lại, miệng mím chặt thường là cảm xúc gì?', a: ['Giận', 'Vui', 'Ngạc nhiên', 'Tin tưởng'], why: 'Khi giận, lông mày kéo xuống và chụm lại.' },
        { q: 'Mắt mở to, miệng há tròn thường là cảm xúc gì?', a: ['Ngạc nhiên', 'Buồn', 'Khó chịu', 'Giận'], why: 'Ngạc nhiên làm ta tròn mắt, há miệng.' },
        { q: 'Khi thấy bạn có vẻ buồn, cách tốt nhất là gì?', a: ['Nhẹ nhàng hỏi "Bạn ổn chứ?"', 'Trêu bạn cho vui', 'Lờ đi', 'Kể với cả lớp'], why: 'Hỏi han nhẹ nhàng giúp bạn thấy được quan tâm.' },
        { q: 'Nhăn mũi, méo miệng thường thể hiện điều gì?', a: ['Khó chịu', 'Háo hức', 'Tin tưởng', 'Vui'], why: 'Như khi ngửi thấy mùi khó chịu.' },
        { q: 'Vì sao không nên chỉ dựa vào nét mặt để đoán cảm xúc?', a: ['Vì có người giấu cảm xúc, nên cần hỏi thêm', 'Vì nét mặt luôn sai', 'Vì không ai có cảm xúc', 'Vì mặt ai cũng giống nhau'], why: 'Nét mặt là gợi ý, nhưng hỏi han mới biết chắc.' }
      ],
      en: [
        { q: 'Eyebrows pulled down, lips pressed tight usually mean…', a: ['Anger', 'Joy', 'Surprise', 'Trust'], why: 'In anger the brows pull down and together.' },
        { q: 'Wide eyes and a round open mouth usually mean…', a: ['Surprise', 'Sadness', 'Disgust', 'Anger'], why: 'Surprise widens the eyes and drops the jaw.' },
        { q: 'A friend looks sad. The best thing to do is…', a: ['Gently ask “Are you okay?”', 'Tease them', 'Ignore them', 'Tell the class'], why: 'Asking kindly shows you care.' },
        { q: 'A wrinkled nose and twisted mouth show…', a: ['Disgust', 'Anticipation', 'Trust', 'Joy'], why: 'Like smelling something nasty.' },
        { q: 'Why not judge feelings by faces alone?', a: ['People can hide feelings, so ask', 'Faces are always wrong', 'Nobody has feelings', 'All faces look alike'], why: 'Faces give clues; asking makes sure.' }
      ]
    }));

    /* =====================================================================
       3. GÓC BÌNH TĨNH: thở hộp, thở bàn tay, nhiệt kế cảm xúc
       ===================================================================== */
    const LEVELS = [
      { col: '#22c55e', vi: ['Bình tĩnh', 'Em đang ổn, sẵn sàng học và chơi.', 'Tiếp tục làm việc mình thích. Giúp đỡ bạn bè.'], en: ['Calm', 'You’re okay and ready to learn and play.', 'Carry on, and help your friends.'] },
      { col: '#facc15', vi: ['Hơi khó chịu', 'Có chút gì đó làm em không vui.', 'Uống một ngụm nước, vươn vai, hít thở chậm vài lần.'], en: ['A bit upset', 'Something is bothering you a little.', 'Sip some water, stretch, take a few slow breaths.'] },
      { col: '#f97316', vi: ['Bực bội', 'Em thấy nóng người, khó tập trung.', 'Tạm dừng. Thở hộp hoặc thở bàn tay. Nói "Mình cần một phút".'], en: ['Frustrated', 'You feel hot and can’t focus.', 'Pause. Do box or hand breathing. Say “I need a minute”.'] },
      { col: '#ef4444', vi: ['Rất giận', 'Em muốn hét, muốn đập phá.', 'Rời xa chỗ làm em giận, đến góc yên tĩnh, bóp quả bóng mềm, thở thật chậm.'], en: ['Very angry', 'You want to shout or smash things.', 'Move away, find a quiet spot, squeeze a soft ball, breathe very slowly.'] },
      { col: '#991b1b', vi: ['Bùng nổ', 'Cảm xúc quá mạnh, khó kiểm soát.', 'Dừng mọi việc. Tìm người lớn ngay. Không làm đau mình và người khác.'], en: ['Exploding', 'The feeling is too strong to control.', 'Stop everything. Find an adult now. Don’t hurt yourself or anyone.'] }
    ];
    let cm = { tech: 'box', run: false, t: 0, cycles: 0, lvl: 0, infoKey: '', g54: [0, 0, 0, 0, 0] };
    const cmC = mk('c_calm', (w) => clamp(w * .6, 290, 480));
    function boxPhase() { const p = (cm.t % 16) / 4, i = Math.floor(p); return { i, f: p - i, left: 4 - Math.floor((p - i) * 4) }; }
    function drawCalm(dt) {
      const { w, h, ctx } = cmC;
      if (!w) return;
      if (cm.run) { const before = Math.floor(cm.t / (cm.tech === 'box' ? 16 : 30)); cm.t += dt; if (Math.floor(cm.t / (cm.tech === 'box' ? 16 : 30)) > before) cm.cycles++; }
      ctx.fillStyle = '#f0f9ff'; ctx.fillRect(0, 0, w, h);
      const cx = w * .38, cy = h * .52, S = Math.min(w * .5, h * .7);
      let phaseTxt = T('Bấm "Bắt đầu" để thở cùng nhau', 'Press “Start” to breathe together');
      if (cm.tech === 'box') {
        const ph = boxPhase(), x0 = cx - S / 2, y0 = cy - S / 2;
        ctx.strokeStyle = '#bae6fd'; ctx.lineWidth = 10; ctx.lineJoin = 'round'; ctx.strokeRect(x0, y0, S, S);
        const words = [T('Hít vào', 'Breathe in'), T('Giữ hơi', 'Hold'), T('Thở ra', 'Breathe out'), T('Nghỉ', 'Hold')];
        const sides = [[x0, y0 + S, x0, y0], [x0, y0, x0 + S, y0], [x0 + S, y0, x0 + S, y0 + S], [x0 + S, y0 + S, x0, y0 + S]];
        sides.forEach(([a, b, c, d], i) => { ctx.strokeStyle = cm.run && i === ph.i ? '#0ea5e9' : '#bae6fd'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); const mx = (a + c) / 2, my = (b + d) / 2; textLight(ctx, words[i], mx + (i === 0 ? -14 : i === 2 ? 14 : 0), my + (i === 1 ? -16 : i === 3 ? 18 : 0), '#0369a1', 12, i === 0 ? 'right' : i === 2 ? 'left' : 'center', 900); });
        const [a, b, c, d] = sides[ph.i], f = cm.run ? ph.f : 0;
        ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(lerp(a, c, f), lerp(b, d, f), 11, 0, TAU); ctx.fill();
        const big = ph.i === 0 ? ph.f : ph.i === 1 ? 1 : ph.i === 2 ? 1 - ph.f : 0, br = S * (.14 + .2 * (cm.run ? ease(big) : 0));
        const bg = ctx.createRadialGradient(cx - br * .3, cy - br * .3, 2, cx, cy, br); bg.addColorStop(0, '#e0f2fe'); bg.addColorStop(1, '#7dd3fc');
        ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, cy, br, 0, TAU); ctx.fill();
        if (cm.run) { phaseTxt = `${words[ph.i]}… ${ph.left}`; textLight(ctx, String(ph.left), cx, cy, '#0369a1', 28, 'center', 900); }
      } else {
        // bàn tay: lần theo ngón tay, lên là hít vào, xuống là thở ra
        const hx = cx, hy = cy + S * .32, fw = S * .13;
        const fingers = [{ dx: -2.1, len: .32, ang: -.9 }, { dx: -1.05, len: .5, ang: -.12 }, { dx: 0, len: .56, ang: 0 }, { dx: 1.05, len: .5, ang: .1 }, { dx: 2, len: .4, ang: .22 }];
        ctx.fillStyle = '#fde7c7'; ctx.strokeStyle = '#e8b796'; ctx.lineWidth = 2;
        rr(ctx, hx - fw * 2.6, hy - S * .2, fw * 5.2, S * .3, fw); ctx.fill(); ctx.stroke();
        const tips = fingers.map((fg) => { const bx = hx + fg.dx * fw, by = hy - S * .18, tx = bx + Math.sin(fg.ang) * S * fg.len, ty = by - Math.cos(fg.ang) * S * fg.len; ctx.save(); ctx.translate(bx, by); ctx.rotate(fg.ang); rr(ctx, -fw * .45, -S * fg.len, fw * .9, S * fg.len + fw * .3, fw * .45); ctx.fill(); ctx.stroke(); ctx.restore(); return { bx, by, tx, ty, fg }; });
        const T6 = 6, k = Math.floor((cm.t % 30) / T6), f = ((cm.t % 30) % T6) / T6, up = f < .5, q = up ? f * 2 : (f - .5) * 2;
        const tp = tips[k], sideOff = fw * .55;
        const p0 = { x: tp.bx - sideOff * Math.cos(tp.fg.ang), y: tp.by - sideOff * Math.sin(tp.fg.ang) }, p1 = { x: tp.tx, y: tp.ty }, p2 = { x: tp.bx + sideOff * Math.cos(tp.fg.ang), y: tp.by + sideOff * Math.sin(tp.fg.ang) };
        const pos = up ? { x: lerp(p0.x, p1.x, q), y: lerp(p0.y, p1.y, q) } : { x: lerp(p1.x, p2.x, q), y: lerp(p1.y, p2.y, q) };
        if (cm.run) { ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(pos.x, pos.y, 9, 0, TAU); ctx.fill(); phaseTxt = up ? T('Lần lên: hít vào…', 'Trace up: breathe in…') : T('Lần xuống: thở ra…', 'Trace down: breathe out…'); }
        textLight(ctx, T('ngón', 'finger') + ` ${k + 1}/5`, hx, hy + S * .2, '#92400e', 12, 'center', 900);
      }
      textLight(ctx, phaseTxt, cx, h * .07, '#0369a1', w < 420 ? 13 : 16, 'center', 900);
      // nhiệt kế
      const tx = w * .84, t0 = h * .12, t1 = h * .86, seg = (t1 - t0) / 5;
      LEVELS.forEach((l, i) => { const y = t1 - (i + 1) * seg; ctx.fillStyle = l.col; ctx.globalAlpha = i === cm.lvl ? 1 : .45; rr(ctx, tx - 18, y + 2, 36, seg - 4, 8); ctx.fill(); ctx.globalAlpha = 1; if (i === cm.lvl) { ctx.strokeStyle = '#1e1b4b'; ctx.lineWidth = 3; rr(ctx, tx - 20, y, 40, seg, 9); ctx.stroke(); } textLight(ctx, String(i + 1), tx, y + seg / 2, '#fff', 13, 'center', 900); });
      textLight(ctx, T('Nhiệt kế', 'Feelings'), tx, t0 - 14, '#334155', 11, 'center', 900); textLight(ctx, T('cảm xúc', 'thermometer'), tx, t1 + 14, '#334155', 11, 'center', 900);
      if (cm.cycles) textLight(ctx, T(`Đã thở ${cm.cycles} vòng 🌟`, `${cm.cycles} rounds done 🌟`), 10, h - 12, '#15803d', 12, 'left', 900);
    }
    cmC.c.addEventListener('pointerdown', (e) => {
      const { w, h } = cmC, p = localPoint(cmC.c, e), tx = w * .84, t0 = h * .12, t1 = h * .86, seg = (t1 - t0) / 5;
      if (Math.abs(p.x - tx) < 26 && p.y > t0 && p.y < t1) { cancelSpeech(); cm.lvl = clamp(Math.floor((t1 - p.y) / seg), 0, 4); cmInfo(true); }
    });
    root.querySelectorAll('[data-tech]').forEach((b) => b.addEventListener('click', () => { cm.tech = b.dataset.tech; cm.t = 0; pressGroup('[data-tech]', 'tech', cm.tech); }));
    $('cmRun').onclick = () => { cancelSpeech(); cm.run = !cm.run; if (cm.run) cm.t = 0; $('cmRun').textContent = cm.run ? STR.stop[lang === 'en' ? 1 : 0] : STR.start[lang === 'en' ? 1 : 0]; };
    function cmTools() {
      const G = [[5, T('thứ em nhìn thấy', 'things you can see')], [4, T('âm thanh em nghe thấy', 'sounds you can hear')], [3, T('thứ em chạm vào được', 'things you can touch')], [2, T('mùi em ngửi thấy', 'things you can smell')], [1, T('vị em nếm thấy', 'thing you can taste')]];
      $('calmTools').innerHTML = `<b style="color:#6d28d9">${T('Trò chơi 5 – 4 – 3 – 2 – 1', 'The 5-4-3-2-1 game')}</b>
        <p class="muted" style="margin:0">${T('Khi lo lắng, hãy chú ý xung quanh. Bấm vào từng dòng mỗi khi em tìm được một thứ.', 'When worried, notice what’s around you. Tap a line each time you find something.')}</p>
        ${G.map(([n, t], i) => `<button type="button" class="g54" data-g="${i}"><span>${n} ${t}</span><b>${'●'.repeat(cm.g54[i])}${'○'.repeat(n - cm.g54[i])}</b></button>`).join('')}
        ${cm.g54.every((v, i) => v >= G[i][0]) ? `<p class="fun" style="margin:0">${T('🎉 Giỏi lắm! Em đã đưa tâm trí về hiện tại.', '🎉 Well done! You’ve brought your mind back to the present.')}</p>` : ''}`;
    }
    $('calmTools').addEventListener('click', (e) => { const b = e.target.closest('[data-g]'); if (!b) return; const i = +b.dataset.g, max = 5 - i; cm.g54[i] = cm.g54[i] >= max ? 0 : cm.g54[i] + 1; cmTools(); });
    function cmInfo(force) {
      const key = lang + cm.lvl; if (key === cm.infoKey && !force) return; cm.infoKey = key;
      const d = L({ vi: LEVELS[cm.lvl].vi, en: LEVELS[cm.lvl].en });
      infoBox($('info_calm'), { emo: ['😊', '😐', '😠', '😡', '🌋'][cm.lvl], title: T(`Mức ${cm.lvl + 1}: ${d[0]}`, `Level ${cm.lvl + 1}: ${d[0]}`), sub: d[1], rows: [[T('Em có thể', 'You can'), d[2]]], notes: [['tip', T('💡 Bấm vào nhiệt kế để chọn mức em đang cảm thấy. Thở chậm giúp tim đập chậm lại và đầu óc bình tĩnh hơn.', '💡 Tap the thermometer to choose your level. Slow breathing slows your heart and calms your mind.')]] });
    }
    TABS.calm = { frame(dt) { drawCalm(dt); cmInfo(); setText('hud_calm', cm.run ? (cm.tech === 'box' ? T('⬜ Thở hộp: 4 giây mỗi cạnh', '⬜ Box breathing: 4 seconds a side') : T('✋ Thở bàn tay: lần lên hít vào, lần xuống thở ra', '✋ Hand breathing: up to breathe in, down to breathe out')) : T('🌬️ Chọn cách thở rồi bấm Bắt đầu', '🌬️ Pick a technique and press Start')); }, refresh() { $('cmRun').textContent = cm.run ? STR.stop[lang === 'en' ? 1 : 0] : STR.start[lang === 'en' ? 1 : 0]; cm.infoKey = ''; cmInfo(); cmTools(); } };
    QUIZZES.push(makeQuiz($('quiz_calm'), {
      vi: [
        { q: 'Khi đang rất giận, việc đầu tiên nên làm là gì?', a: ['Dừng lại và hít thở thật chậm', 'Đánh vào bạn', 'Ném đồ đạc', 'Hét thật to'], why: 'Dừng lại và thở chậm giúp cơn giận dịu xuống.' },
        { q: 'Thở hộp gồm mấy bước, mỗi bước bao lâu?', a: ['4 bước, mỗi bước 4 giây', '2 bước, mỗi bước 1 giây', '10 bước, mỗi bước 10 giây', 'Không có quy tắc'], why: 'Hít vào 4 – giữ 4 – thở ra 4 – nghỉ 4.' },
        { q: 'Trò 5 – 4 – 3 – 2 – 1 giúp gì?', a: ['Đưa tâm trí về hiện tại khi lo lắng', 'Học bảng cửu chương', 'Đếm tiền', 'Chạy nhanh hơn'], why: 'Chú ý vào những gì đang thấy, nghe, chạm giúp bớt lo.' },
        { q: 'Khi cảm xúc ở mức "bùng nổ", em nên làm gì?', a: ['Dừng lại, tìm người lớn giúp ngay', 'Tiếp tục cãi nhau', 'Giấu đi một mình', 'Làm đau người khác'], why: 'Người lớn sẽ giúp em an toàn và bình tĩnh lại.' },
        { q: 'Vì sao thở chậm giúp bình tĩnh?', a: ['Làm tim đập chậm lại, cơ thể thả lỏng', 'Làm em buồn ngủ ngay', 'Làm em quên hết mọi chuyện', 'Không có tác dụng'], why: 'Hơi thở chậm báo cho cơ thể biết "mình an toàn rồi".' }
      ],
      en: [
        { q: 'When you’re very angry, what should you do first?', a: ['Stop and breathe slowly', 'Hit someone', 'Throw things', 'Scream'], why: 'Stopping and slow breathing help anger settle.' },
        { q: 'Box breathing has how many steps, how long each?', a: ['4 steps, 4 seconds each', '2 steps, 1 second each', '10 steps, 10 seconds each', 'No rule'], why: 'In 4 – hold 4 – out 4 – hold 4.' },
        { q: 'What does the 5-4-3-2-1 game do?', a: ['Brings your mind to the present when worried', 'Teaches times tables', 'Counts money', 'Makes you run faster'], why: 'Noticing what you see, hear and touch eases worry.' },
        { q: 'At the “exploding” level you should…', a: ['Stop and get an adult right away', 'Keep arguing', 'Hide alone', 'Hurt someone'], why: 'An adult can help you stay safe and calm down.' },
        { q: 'Why does slow breathing calm you?', a: ['It slows your heart and relaxes your body', 'It makes you fall asleep', 'It erases memories', 'It doesn’t'], why: 'Slow breaths tell your body “I’m safe”.' }
      ]
    }));

    /* =====================================================================
       4. TÌNH HUỐNG
       ===================================================================== */
    const SC = [
      { emo: '📝', who: { vi: 'Minh', en: 'Minh' }, k: 'joy',
        vi: ['Minh ôn bài suốt một tuần và được 10 điểm bài kiểm tra Toán.', [['joy', 'Tự hào, vui sướng'], ['anger', 'Giận'], ['fear', 'Sợ'], ['disgust', 'Khó chịu']], [['Kể cho bố mẹ nghe và cảm ơn cô giáo đã giảng bài', 1, 'Chia sẻ niềm vui và biết ơn là cách thể hiện niềm vui rất đẹp.'], ['Khoe khắp lớp và chê bạn được điểm thấp', 0, 'Chê bạn làm bạn buồn. Niềm vui không cần làm người khác tổn thương.'], ['Không học nữa vì đã giỏi rồi', 0, 'Cố gắng tiếp tục mới giữ được kết quả tốt.']]],
        en: ['Minh studied all week and got full marks on the maths test.', [['joy', 'Proud and happy'], ['anger', 'Angry'], ['fear', 'Scared'], ['disgust', 'Disgusted']], [['Tell his parents and thank his teacher', 1, 'Sharing joy and thanking others is a lovely way to show it.'], ['Brag to everyone and mock low scores', 0, 'Mocking hurts others. Joy doesn’t need to hurt anyone.'], ['Stop studying because he’s good now', 0, 'Keeping up the effort keeps the good results.']]] },
      { emo: '✏️', who: { vi: 'Lan', en: 'Lan' }, k: 'anger',
        vi: ['Một bạn giật bút của Lan rồi cười trêu.', [['anger', 'Giận, bực bội'], ['joy', 'Vui'], ['antic', 'Háo hức'], ['trust', 'Tin tưởng']], [['Nói rõ: "Mình không thích bạn làm vậy. Trả bút cho mình." Nếu bạn vẫn trêu thì báo cô giáo', 1, 'Nói bằng lời, bình tĩnh và nhờ người lớn khi cần là cách xử lý tốt nhất.'], ['Giật lại rồi đánh bạn', 0, 'Đánh nhau làm mọi chuyện tệ hơn và có người bị đau.'], ['Im lặng ngồi khóc, không nói với ai', 0, 'Giữ trong lòng làm em buồn hơn. Hãy nói ra hoặc nhờ giúp đỡ.']]],
        en: ['Someone grabs Lan’s pen and laughs at her.', [['anger', 'Angry, annoyed'], ['joy', 'Happy'], ['antic', 'Eager'], ['trust', 'Trusting']], [['Say clearly: “I don’t like that. Give my pen back.” If it continues, tell the teacher', 1, 'Calm words, and asking an adult when needed, is best.'], ['Grab it back and hit them', 0, 'Fighting makes things worse and someone gets hurt.'], ['Cry quietly and tell no one', 0, 'Keeping it inside feels worse. Speak up or ask for help.']]] },
      { emo: '🏫', who: { vi: 'Hùng', en: 'Hung' }, k: 'fear',
        vi: ['Hùng chuyển đến trường mới, ngày đầu chưa quen ai.', [['fear', 'Lo lắng, hồi hộp'], ['anger', 'Giận'], ['disgust', 'Khó chịu'], ['joy', 'Sung sướng']], [['Mỉm cười, chủ động chào và hỏi tên một bạn', 1, 'Một lời chào nhỏ có thể mở đầu cho một tình bạn mới.'], ['Ngồi một mình cả ngày, không nói với ai', 0, 'Thử làm quen một chút sẽ giúp nỗi lo nhỏ dần.'], ['Đòi bố mẹ cho về trường cũ ngay', 0, 'Lo lắng lúc đầu là bình thường, dần dần em sẽ quen.']]],
        en: ['Hung moves to a new school and knows nobody on day one.', [['fear', 'Nervous, worried'], ['anger', 'Angry'], ['disgust', 'Disgusted'], ['joy', 'Overjoyed']], [['Smile, say hello and ask someone’s name', 1, 'A small hello can start a new friendship.'], ['Sit alone all day and speak to no one', 0, 'Trying to make friends makes the worry shrink.'], ['Demand to go back to the old school', 0, 'Feeling nervous at first is normal; you’ll settle in.']]] },
      { emo: '🐶', who: { vi: 'Mai', en: 'Mai' }, k: 'sad',
        vi: ['Chú chó của Mai bị ốm nặng phải đưa đi bác sĩ thú y.', [['sad', 'Buồn, lo'], ['joy', 'Vui'], ['antic', 'Háo hức'], ['disgust', 'Khó chịu']], [['Kể với bố mẹ cảm xúc của mình, khóc cũng không sao', 1, 'Nói ra nỗi buồn giúp em được an ủi và thấy nhẹ lòng hơn.'], ['Giả vờ như không có chuyện gì', 0, 'Giấu nỗi buồn có thể khiến em mệt mỏi hơn.'], ['Cáu gắt với em nhỏ', 0, 'Trút giận lên người khác không làm em đỡ buồn.']]],
        en: ['Mai’s dog is very sick and has to go to the vet.', [['sad', 'Sad, worried'], ['joy', 'Happy'], ['antic', 'Eager'], ['disgust', 'Disgusted']], [['Tell her parents how she feels; crying is okay', 1, 'Sharing sadness brings comfort and relief.'], ['Pretend nothing is wrong', 0, 'Hiding sadness can wear you out.'], ['Snap at her little brother', 0, 'Taking it out on others doesn’t help.']]] },
      { emo: '🏺', who: { vi: 'Nam', en: 'Nam' }, k: 'fear',
        vi: ['Nam chơi bóng trong nhà và làm vỡ lọ hoa của mẹ.', [['fear', 'Sợ bị mắng, áy náy'], ['joy', 'Vui'], ['trust', 'Tin tưởng'], ['antic', 'Háo hức']], [['Nói thật với mẹ, xin lỗi và giúp dọn dẹp', 1, 'Trung thực và nhận lỗi là việc dũng cảm. Người lớn sẽ tin em hơn.'], ['Giấu mảnh vỡ đi và đổ cho con mèo', 0, 'Nói dối làm mất lòng tin và em sẽ càng lo lắng.'], ['Chạy ra ngoài chơi như không biết gì', 0, 'Trốn tránh không giải quyết được chuyện gì.']]],
        en: ['Nam plays ball indoors and breaks Mum’s vase.', [['fear', 'Scared of being told off, guilty'], ['joy', 'Happy'], ['trust', 'Trusting'], ['antic', 'Eager']], [['Tell Mum the truth, apologise and help clean up', 1, 'Honesty and owning up are brave. Adults will trust you more.'], ['Hide the pieces and blame the cat', 0, 'Lying breaks trust and makes you more anxious.'], ['Run outside as if nothing happened', 0, 'Running away solves nothing.']]] },
      { emo: '🧑‍🤝‍🧑', who: { vi: 'Bạn cùng bàn', en: 'Your deskmate' }, k: 'sad',
        vi: ['Một nhóm bạn trêu chọc ngoại hình của bạn cùng bàn với em.', [['sad', 'Buồn, tủi thân'], ['joy', 'Vui'], ['surprise', 'Sửng sốt thích thú'], ['antic', 'Háo hức']], [['Không cười theo, rủ bạn đi chỗ khác và báo thầy cô', 1, 'Đứng về phía bạn bị trêu và nhờ người lớn giúp là việc làm tốt.'], ['Cười theo cho nhóm bạn vui', 0, 'Cười theo khiến bạn bị trêu càng buồn hơn.'], ['Coi như không thấy', 0, 'Im lặng làm việc trêu chọc tiếp diễn.']]],
        en: ['A group teases your deskmate about how they look.', [['sad', 'Sad and hurt'], ['joy', 'Happy'], ['surprise', 'Amused'], ['antic', 'Eager']], [['Don’t laugh, take your friend away and tell a teacher', 1, 'Standing by the person being teased and getting help is the right thing.'], ['Laugh along with the group', 0, 'Laughing along makes them feel worse.'], ['Pretend not to see', 0, 'Silence lets the teasing carry on.']]] },
      { emo: '📱', who: { vi: 'Em', en: 'You' }, k: 'fear',
        vi: ['Một người lạ trên mạng nhắn tin cho em, nói những điều làm em sợ và dặn em phải giữ bí mật.', [['fear', 'Sợ, bất an'], ['joy', 'Vui'], ['trust', 'Tin tưởng'], ['antic', 'Háo hức']], [['Không trả lời, không giữ bí mật, kể ngay với bố mẹ hoặc thầy cô', 1, 'Không có bí mật nào mà người lớn tin cậy không được biết. Nếu cần, gọi 111 – Tổng đài bảo vệ trẻ em.'], ['Làm theo lời người đó để họ không giận', 0, 'Người lạ bắt em giữ bí mật là dấu hiệu nguy hiểm. Hãy nói với người lớn ngay.'], ['Tự giải quyết một mình', 0, 'Chuyện này cần người lớn giúp, em không phải tự lo một mình.']]],
        en: ['A stranger online sends you messages that scare you and tells you to keep it secret.', [['fear', 'Scared, unsafe'], ['joy', 'Happy'], ['trust', 'Trusting'], ['antic', 'Eager']], [['Don’t reply, don’t keep it secret, tell a parent or teacher right away', 1, 'No secret should be kept from a trusted adult. In Vietnam you can also call 111, the child protection line.'], ['Do what they say so they don’t get angry', 0, 'A stranger asking for secrets is a warning sign. Tell an adult now.'], ['Deal with it alone', 0, 'This needs an adult’s help; you don’t have to handle it alone.']]] },
      { emo: '🎁', who: { vi: 'An', en: 'An' }, k: 'surprise',
        vi: ['Cả lớp bí mật chuẩn bị bánh và hát mừng sinh nhật An.', [['surprise', 'Ngạc nhiên, xúc động'], ['anger', 'Giận'], ['fear', 'Sợ'], ['disgust', 'Khó chịu']], [['Cảm ơn các bạn và cùng chia bánh', 1, 'Lời cảm ơn làm niềm vui được nhân đôi.'], ['Chê bánh không ngon', 0, 'Lời chê làm các bạn mất vui dù đã cố gắng.'], ['Đòi thêm quà', 0, 'Biết trân trọng điều mình nhận được mới đáng quý.']]],
        en: ['The whole class secretly prepares a cake and sings for An’s birthday.', [['surprise', 'Surprised and touched'], ['anger', 'Angry'], ['fear', 'Scared'], ['disgust', 'Disgusted']], [['Thank everyone and share the cake', 1, 'Thanks doubles the joy.'], ['Say the cake isn’t nice', 0, 'Criticism spoils the fun after everyone’s effort.'], ['Ask for more presents', 0, 'Appreciating what you get is what matters.']]] },
      { emo: '⚽', who: { vi: 'Đội của Tú', en: 'Tu’s team' }, k: 'sad',
        vi: ['Đội bóng của Tú thua trận chung kết của trường.', [['sad', 'Thất vọng, buồn'], ['joy', 'Sung sướng'], ['trust', 'Tin tưởng'], ['antic', 'Háo hức']], [['Bắt tay đội bạn, cùng nhau rút kinh nghiệm để tập tiếp', 1, 'Thua là bình thường. Biết chúc mừng người khác và cố gắng tiếp là tinh thần thể thao.'], ['Đổ lỗi cho thủ môn', 0, 'Đổ lỗi làm bạn buồn và cả đội mất đoàn kết.'], ['Bỏ đá bóng luôn', 0, 'Một trận thua không có nghĩa là em không giỏi.']]],
        en: ['Tu’s team loses the school football final.', [['sad', 'Disappointed, sad'], ['joy', 'Overjoyed'], ['trust', 'Trusting'], ['antic', 'Eager']], [['Shake hands with the winners and learn from it together', 1, 'Losing is normal. Congratulating others and trying again is good sportsmanship.'], ['Blame the goalkeeper', 0, 'Blame hurts a teammate and splits the team.'], ['Quit football', 0, 'One loss doesn’t mean you aren’t good.']]] },
      { emo: '🎒', who: { vi: 'Linh', en: 'Linh' }, k: 'antic',
        vi: ['Ngày mai lớp Linh được đi tham quan bảo tàng.', [['antic', 'Háo hức, mong chờ'], ['sad', 'Buồn'], ['disgust', 'Khó chịu'], ['anger', 'Giận']], [['Chuẩn bị đồ dùng từ tối và đi ngủ sớm', 1, 'Chuẩn bị chu đáo giúp chuyến đi trọn vẹn.'], ['Thức khuya chơi điện thoại vì không ngủ được', 0, 'Thiếu ngủ sẽ làm em mệt trong chuyến đi.'], ['Hỏi bố mẹ liên tục "Bao giờ đến mai?"', 0, 'Háo hức là tốt, nhưng cũng cần kiên nhẫn.']]],
        en: ['Tomorrow Linh’s class visits a museum.', [['antic', 'Excited, looking forward'], ['sad', 'Sad'], ['disgust', 'Disgusted'], ['anger', 'Angry']], [['Pack the night before and sleep early', 1, 'Getting ready makes the trip go well.'], ['Stay up late on the phone because she can’t sleep', 0, 'Too little sleep will make her tired on the trip.'], ['Keep asking “Is it tomorrow yet?”', 0, 'Excitement is great, but patience helps too.']]] }
    ];
    let st = { i: 0, step: 'feel', feel: -1, act: -1, order: [], score: 0, face: { ...NEUTRAL }, infoKey: '' };
    const stC = mk('c_story', (w) => clamp(w * .55, 270, 450));
    function stShuffle(n) { return [...Array(n).keys()].sort(() => Math.random() - .5); }
    function stNew(i) { st.i = i; st.step = 'feel'; st.feel = -1; st.act = -1; st.fOrder = stShuffle(4); st.aOrder = stShuffle(3); stRender(); }
    function drawStory(dt) {
      const { w, h, ctx } = stC;
      if (!w) return;
      const s = SC[st.i], known = st.feel >= 0;
      const target = known ? EMO_BY[s.k].face : NEUTRAL;
      st.face = blendFace(st.face, target, Math.min(1, dt * 5));
      ctx.fillStyle = known ? mix(EMO_BY[s.k].col, '#ffffff', .78) : '#f8fafc'; ctx.fillRect(0, 0, w, h);
      const r = Math.min(w, h) * .27;
      drawFace(ctx, w * .5, h * .5, r, st.face, { hairCol: ['#3f2a14', '#1f2937', '#78350f'][st.i % 3] });
      ctx.font = emojiFont(Math.round(r * .55)); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(s.emo, w * .5 + r * 1.35, h * .5 - r * .6);
      textLight(ctx, L(s.who), w * .5, h * .5 + r + 18, '#334155', 14, 'center', 900);
      if (!known) bubble(ctx, '?', w * .5 - r * 1.25, h * .5 - r * .7, 20);
      else bubble(ctx, L(s)[1].find((o) => o[0] === s.k)[1], w * .5, h * .1, 13);
      textLight(ctx, `${st.i + 1}/${SC.length}`, w - 10, h - 10, '#94a3b8', 11, 'right', 900);
    }
    function stRender() {
      const s = SC[st.i], d = L(s), box = $('storyBox');
      let html = `<p class="qtext" style="margin:0"></p>`;
      if (st.step === 'feel') {
        html += `<p class="muted" style="margin:0">${T(`${d.length ? '' : ''}Câu 1: ${L(s.who)} có thể đang cảm thấy gì?`, `Q1: How might ${L(s.who)} feel?`)}</p><div class="opt-col">${st.fOrder.map((j) => `<button type="button" class="soft-btn" data-sf="${j}"></button>`).join('')}</div>`;
      } else {
        const right = d[1][st.feel][0] === s.k;
        html += `<p class="${right ? 'fun' : 'tip'}" style="margin:0" data-fb1></p>`;
        html += `<p class="muted" style="margin:0">${T('Câu 2: Nên làm gì là tốt nhất?', 'Q2: What is the best thing to do?')}</p><div class="opt-col">${st.aOrder.map((j) => `<button type="button" class="soft-btn" data-sa="${j}"></button>`).join('')}</div>`;
        if (st.act >= 0) html += `<p class="${d[2][st.act][1] ? 'fun' : 'warn'}" style="margin:0" data-fb2></p><button id="stNext" class="btn main" type="button">${T('Tình huống tiếp ▶', 'Next situation ▶')}</button>`;
      }
      html += `<p class="score" style="margin:0">${T(`Điểm: ${st.score}`, `Score: ${st.score}`)}</p>`;
      box.innerHTML = html;
      box.querySelector('.qtext').textContent = d[0];
      box.querySelectorAll('[data-sf]').forEach((b) => { b.textContent = d[1][+b.dataset.sf][1]; });
      box.querySelectorAll('[data-sa]').forEach((b) => { const j = +b.dataset.sa; b.textContent = d[2][j][0]; if (st.act >= 0) { b.disabled = true; if (d[2][j][1]) b.setAttribute('aria-pressed', 'true'); } });
      const fb1 = box.querySelector('[data-fb1]');
      if (fb1) { const right = d[1][st.feel][0] === s.k, correct = d[1].find((o) => o[0] === s.k)[1]; fb1.textContent = right ? T(`🎉 Đúng rồi: ${correct.toLowerCase()}.`, `🎉 Yes: ${correct.toLowerCase()}.`) : T(`💡 Có thể lắm, nhưng nhiều khả năng bạn ấy thấy ${correct.toLowerCase()}.`, `💡 Possibly, but most likely they feel ${correct.toLowerCase()}.`); }
      const fb2 = box.querySelector('[data-fb2]'); if (fb2) fb2.textContent = (d[2][st.act][1] ? '🎉 ' : '🤔 ') + d[2][st.act][2];
      const nx = $('stNext'); if (nx) nx.onclick = () => { cancelSpeech(); stNew((st.i + 1) % SC.length); };
    }
    $('storyBox').addEventListener('click', (e) => {
      const f = e.target.closest('[data-sf]'), a = e.target.closest('[data-sa]');
      if (f && st.step === 'feel') { cancelSpeech(); st.feel = +f.dataset.sf; if (L(SC[st.i])[1][st.feel][0] === SC[st.i].k) st.score++; st.step = 'act'; stRender(); }
      if (a && st.act < 0) { cancelSpeech(); st.act = +a.dataset.sa; if (L(SC[st.i])[2][st.act][1]) st.score++; stRender(); }
    });
    function stInfo() {
      if (st.infoKey === lang) return; st.infoKey = lang;
      infoBox($('info_story'), {
        emo: '📖', title: T('Đặt mình vào vị trí của bạn', 'Put yourself in their shoes'),
        rows: [[T('Thấu cảm', 'Empathy'), T('Là hiểu và cảm nhận được bạn khác đang thấy thế nào. Thấu cảm giúp em cư xử tử tế hơn.', 'Understanding and feeling what someone else feels. Empathy helps you act kindly.')],
          [T('3 bước', '3 steps'), T('Dừng lại – Gọi tên cảm xúc – Chọn cách làm không làm đau mình và người khác.', 'Stop – Name the feeling – Choose an action that hurts no one.')]],
        notes: [['tip', T('📞 Nếu em hoặc bạn bị bắt nạt, bị làm đau hay bị đe dọa, hãy kể ngay với người lớn tin cậy hoặc gọi 111 – Tổng đài quốc gia bảo vệ trẻ em (miễn phí).', '📞 If you or a friend is bullied, hurt or threatened, tell a trusted adult straight away. In Vietnam you can call 111, the free national child protection line.')]]
      });
    }
    TABS.story = { frame(dt) { drawStory(dt); stInfo(); setText('hud_story', `📖 ${T('Tình huống', 'Situation')} ${st.i + 1}/${SC.length} – ${T('điểm', 'score')} ${st.score}`); }, refresh() { st.infoKey = ''; stInfo(); if (!st.fOrder) stNew(0); else stRender(); } };
    QUIZZES.push(makeQuiz($('quiz_story'), {
      vi: [
        { q: 'Thấu cảm là gì?', a: ['Hiểu và cảm nhận được bạn khác đang thấy thế nào', 'Luôn đồng ý với mọi người', 'Không bao giờ buồn', 'Chỉ nghĩ đến mình'], why: 'Thấu cảm giúp ta đối xử tử tế với nhau.' },
        { q: 'Thấy bạn bị trêu chọc, em nên làm gì?', a: ['Không cười theo, giúp bạn và báo thầy cô', 'Cười theo', 'Quay video', 'Trêu thêm'], why: 'Đứng về phía bạn và nhờ người lớn giúp là việc làm đúng.' },
        { q: 'Lỡ làm vỡ đồ, cách xử lý tốt nhất là gì?', a: ['Nói thật và xin lỗi', 'Giấu đi', 'Đổ lỗi cho người khác', 'Bỏ chạy'], why: 'Trung thực giúp người khác tin tưởng em.' },
        { q: 'Người lạ trên mạng bảo em giữ bí mật, em làm gì?', a: ['Kể ngay với bố mẹ, thầy cô', 'Giữ bí mật', 'Gửi thông tin cho họ', 'Hẹn gặp họ'], why: 'Không có bí mật nào phải giấu người lớn tin cậy. Có thể gọi 111.' },
        { q: 'Số điện thoại Tổng đài quốc gia bảo vệ trẻ em là gì?', a: ['111', '114', '115', '113'], why: 'Gọi 111 miễn phí khi trẻ em bị bạo lực, xâm hại hoặc cần giúp đỡ.' }
      ],
      en: [
        { q: 'What is empathy?', a: ['Understanding how someone else feels', 'Agreeing with everyone', 'Never being sad', 'Thinking only of yourself'], why: 'Empathy helps us treat each other kindly.' },
        { q: 'You see someone being teased. You…', a: ['Don’t laugh; help them and tell a teacher', 'Laugh along', 'Film it', 'Join in'], why: 'Standing by them and getting help is right.' },
        { q: 'You break something by accident. Best move?', a: ['Tell the truth and apologise', 'Hide it', 'Blame someone', 'Run away'], why: 'Honesty helps people trust you.' },
        { q: 'A stranger online asks you to keep a secret. You…', a: ['Tell a parent or teacher right away', 'Keep it secret', 'Send them your details', 'Arrange to meet'], why: 'No secret should be kept from a trusted adult. In Vietnam, call 111 if needed.' },
        { q: 'What is Vietnam’s national child protection hotline?', a: ['111', '114', '115', '113'], why: '111 is free to call when a child is hurt, abused or needs help.' }
      ]
    }));

    /* =====================================================================
       5. NHẬT KÝ CẢM XÚC (lưu trên máy này)
       ===================================================================== */
    // Diary notes belong to one signed-in child on this device. Guest notes are temporary.
    // Deliberately do not load the legacy shared key: it could expose another child's entries.
    const diaryUserId = String(context && context.diaryUserId || '').trim();
    const DKEY = diaryUserId ? 'epsilonEdu.feelingsDiary.v2.' + encodeURIComponent(diaryUserId) : '';
    const DI_EMO = [...EMO.map((e) => e.k), 'ok'];
    let dy = { data: {}, sel: '', emo: 'joy', lvl: 1, infoKey: '', saved: false, storageFailed: false };
    if (DKEY) {
      try { dy.data = JSON.parse(window.localStorage.getItem(DKEY) || '{}') || {}; } catch (_) { dy.data = {}; }
    }
    const dKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const last7 = () => { const out = [], now = new Date(); for (let i = 6; i >= 0; i--) { const d = new Date(now); d.setDate(now.getDate() - i); out.push(d); } return out; };
    dy.sel = dKey(new Date());
    const emoName = (k) => (k === 'ok' ? T('Bình thường', 'Okay') : L(EMO_BY[k]).name);
    const emoCol = (k) => (k === 'ok' ? '#94a3b8' : EMO_BY[k].col);
    const emoFace = (k, lvl) => (k === 'ok' ? NEUTRAL : blendFace(NEUTRAL, EMO_BY[k].face, [.55, .85, 1.1][lvl]));
    function drawDiary() {
      const { w, h, ctx } = dyC;
      if (!w) return;
      ctx.fillStyle = '#fffbf5'; ctx.fillRect(0, 0, w, h);
      const days = last7(), cw = w / 7, base = h * .78;
      const WD = lang === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      ctx.strokeStyle = '#f1f5f9'; ctx.lineWidth = 1; for (let k = 1; k <= 3; k++) { const y = base - k * h * .17; ctx.beginPath(); ctx.moveTo(6, y); ctx.lineTo(w - 6, y); ctx.stroke(); }
      days.forEach((d, i) => {
        const key = dKey(d), e = dy.data[key], x = cw * (i + .5), sel = key === dy.sel;
        if (sel) { ctx.fillStyle = 'rgba(236,72,153,.08)'; rr(ctx, x - cw / 2 + 3, 6, cw - 6, h - 12, 10); ctx.fill(); }
        if (e) {
          const bh = (e.lvl + 1) * h * .17; ctx.fillStyle = emoCol(e.k); ctx.globalAlpha = .55; rr(ctx, x - cw * .28, base - bh, cw * .56, bh, 8); ctx.fill(); ctx.globalAlpha = 1;
          drawFace(ctx, x, base - bh - Math.min(cw * .3, h * .09) - 4, Math.min(cw * .3, h * .09), emoFace(e.k, e.lvl), { hair: false });
        } else { ctx.strokeStyle = '#cbd5e1'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(x, base - h * .1, Math.min(cw * .25, h * .07), 0, TAU); ctx.stroke(); ctx.setLineDash([]); textLight(ctx, '+', x, base - h * .1, '#94a3b8', 18, 'center', 900); }
        textLight(ctx, WD[d.getDay()], x, base + 16, sel ? '#be185d' : '#475569', 12, 'center', 900);
        textLight(ctx, `${d.getDate()}/${d.getMonth() + 1}`, x, base + 32, '#94a3b8', 10.5, 'center', 800);
      });
    }
    const dyC = mk('c_diary', (w) => clamp(w * .5, 250, 400));
    dyC.c.addEventListener('pointerdown', (e) => { const p = localPoint(dyC.c, e), i = clamp(Math.floor(p.x / (dyC.w / 7)), 0, 6); dy.sel = dKey(last7()[i]); const ex = dy.data[dy.sel]; if (ex) { dy.emo = ex.k; dy.lvl = ex.lvl; $('dyNote').value = ex.note || ''; } else $('dyNote').value = ''; dy.saved = false; dyForm(); dyInfo(true); });
    function dyForm() {
      $('dyEmo').innerHTML = DI_EMO.map((k) => `<button type="button" class="soft-btn" data-de="${k}" aria-pressed="${k === dy.emo}" style="border-color:${emoCol(k)}"></button>`).join('');
      $('dyEmo').querySelectorAll('[data-de]').forEach((b) => { b.textContent = emoName(b.dataset.de); });
      pressGroup('[data-dl]', 'dl', dy.lvl);
      const d = new Date(dy.sel + 'T00:00:00');
      setText('dyDay', T(`Đang ghi cho ngày ${d.getDate()}/${d.getMonth() + 1}`, `Writing for ${d.getDate()}/${d.getMonth() + 1}`));
    }
    $('dyEmo').addEventListener('click', (e) => { const b = e.target.closest('[data-de]'); if (!b) return; dy.emo = b.dataset.de; dy.saved = false; dyForm(); });
    root.querySelectorAll('[data-dl]').forEach((b) => b.addEventListener('click', () => { dy.lvl = +b.dataset.dl; dy.saved = false; dyForm(); }));
    $('dySave').onclick = () => {
      cancelSpeech();
      dy.data[dy.sel] = { k: dy.emo, lvl: dy.lvl, note: String($('dyNote').value || '').slice(0, 120) };
      const keep = new Set(last7().map(dKey).concat(Object.keys(dy.data).sort().slice(-60)));
      for (const k of Object.keys(dy.data)) if (!keep.has(k)) delete dy.data[k];
      dy.storageFailed = false;
      if (DKEY) {
        try { window.localStorage.setItem(DKEY, JSON.stringify(dy.data)); dy.saved = true; }
        catch (_) { dy.saved = false; dy.storageFailed = true; }
      } else { dy.saved = true; } // Guest: kept in memory only until leaving the tool.
      dyInfo(true);
    };
    function dyInfo(force) {
      const days = last7().map(dKey), rec = days.map((k) => dy.data[k]).filter(Boolean);
      const key = lang + JSON.stringify(rec) + dy.sel + dy.saved; if (key === dy.infoKey && !force) return; dy.infoKey = key;
      const cnt = {}; rec.forEach((e) => { cnt[e.k] = (cnt[e.k] || 0) + 1; });
      const top = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0];
      const hard = rec.filter((e) => ['sad', 'fear', 'anger'].includes(e.k) && e.lvl >= 1).length;
      const cur = dy.data[dy.sel];
      const notes = [];
      if (dy.saved) notes.push(['fun', DKEY
        ? T('💾 Đã lưu trên thiết bị cho tài khoản của bé.', '💾 Saved on this device for your account.')
        : T('📝 Đã ghi tạm. Rời công cụ sẽ mất nhật ký này.', '📝 Saved temporarily. Leaving this tool will erase these notes.')]);
      if (dy.storageFailed) notes.push(['warn', T('Chưa lưu được trên thiết bị. Bé hãy nhờ người lớn kiểm tra nhé.', 'Could not save on this device. Please ask an adult for help.')]);
      if (hard >= 3) notes.push(['warn', T('💗 Mấy ngày nay em hay thấy buồn, lo hoặc giận. Hãy kể với bố mẹ hoặc thầy cô em tin tưởng nhé. Nếu có ai làm em sợ hay làm đau em, hãy nói ngay hoặc gọi 111.', '💗 You’ve felt sad, worried or angry on several days. Please talk to a parent or teacher you trust. If someone is scaring or hurting you, tell an adult now; in Vietnam you can call 111.')]);
      notes.push(['tip', DKEY
        ? T('Nhật ký chỉ lưu trên máy này theo tài khoản. Máy dùng chung nên tránh ghi thông tin quá riêng tư.', 'The diary stays on this device under your account. Avoid private details on a shared device.')
        : T('Chưa đăng nhập: nhật ký chỉ tồn tại khi mở công cụ này.', 'Not signed in: this diary only lasts while the tool is open.')]);
      infoBox($('info_diary'), {
        emo: '📔', title: T('Tuần này của em', 'Your week'), sub: T(`Đã ghi ${rec.length}/7 ngày`, `${rec.length}/7 days recorded`),
        // Show the diary note visually, but never read it aloud via third-party TTS.
        speechRows: [],
        rows: [[T('Nhiều nhất', 'Most often'), top ? `${emoName(top[0])} (${top[1]} ${T('ngày', top[1] > 1 ? 'days' : 'day')})` : T('Chưa có', 'Nothing yet')],
          [T('Ngày đang chọn', 'Selected day'), cur ? `${emoName(cur.k)} – ${T(['nhẹ', 'vừa', 'mạnh'][cur.lvl], ['mild', 'medium', 'strong'][cur.lvl])}${cur.note ? `: "${cur.note}"` : ''}` : T('Chưa ghi', 'Not recorded')]],
        notes
      });
      setText('hud_diary', T(`📔 Đã ghi ${rec.length}/7 ngày gần nhất`, `📔 ${rec.length}/7 recent days recorded`));
    }
    TABS.diary = { frame() { drawDiary(); dyInfo(); }, refresh() { dyForm(); dy.infoKey = ''; dyInfo(true); $('dyNote').placeholder = T('Ví dụ: Hôm nay được đi chơi với ông bà', 'E.g. Today I visited my grandparents'); } };
    QUIZZES.push(makeQuiz($('quiz_diary'), {
      vi: [
        { q: 'Ghi nhật ký cảm xúc giúp em điều gì?', a: ['Hiểu mình hơn, nhận ra điều gì làm mình vui, buồn', 'Được điểm cao ngay', 'Không phải đi học', 'Không có ích gì'], why: 'Nhìn lại cảm xúc mỗi ngày giúp em hiểu bản thân.' },
        { q: 'Nếu nhiều ngày liền em thấy buồn hoặc lo, em nên làm gì?', a: ['Kể với bố mẹ hoặc thầy cô tin cậy', 'Giấu kín một mình', 'Giả vờ vui', 'Không làm gì'], why: 'Chia sẻ giúp em được quan tâm và hỗ trợ.' },
        { q: 'Có cảm xúc buồn, giận có phải là xấu không?', a: ['Không, cảm xúc nào cũng bình thường', 'Có, rất xấu', 'Chỉ người lớn mới được buồn', 'Phải bị phạt'], why: 'Ai cũng có lúc buồn, giận. Quan trọng là xử lý nó ra sao.' },
        { q: 'Ngoài cảm xúc, ghi thêm "vì sao" giúp gì?', a: ['Biết điều gì gây ra cảm xúc để xử lý tốt hơn', 'Làm nhật ký dài hơn', 'Để khoe với bạn', 'Không giúp gì'], why: 'Hiểu nguyên nhân giúp em tìm cách giải quyết.' }
      ],
      en: [
        { q: 'How does a feelings diary help you?', a: ['You understand yourself and what makes you happy or sad', 'Instant top marks', 'No more school', 'It doesn’t'], why: 'Looking back at your feelings helps you know yourself.' },
        { q: 'If you feel sad or worried for many days, you should…', a: ['Talk to a parent or teacher you trust', 'Hide it alone', 'Pretend to be happy', 'Do nothing'], why: 'Sharing gets you care and support.' },
        { q: 'Is it bad to feel sad or angry?', a: ['No, every feeling is normal', 'Yes, very bad', 'Only adults may feel sad', 'You should be punished'], why: 'Everyone feels sad or angry sometimes. What matters is handling it.' },
        { q: 'Why also write down “why”?', a: ['You learn what causes the feeling and can handle it better', 'To make it longer', 'To show friends', 'No reason'], why: 'Knowing the cause helps you find a solution.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'wheel';
    root.querySelectorAll('.feel-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.feel-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('e-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.feel-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.feel-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.feel-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
