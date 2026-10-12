/* Epsilon Edu - Tool: Bo xuong va co bap (Bones and muscles): lap bo xuong, khop va co, tu the va xuong chac khoe
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.bonesMuscles = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "bonesMuscles";
  let activeCleanup = null;

  const CSS = `
.bone-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.bone-tool *{box-sizing:border-box}.bone-tool button,.bone-tool input{font:inherit}.bone-tool button{cursor:pointer}.bone-tool .hidden{display:none!important}
.bone-tool button:focus-visible,.bone-tool canvas:focus-visible,.bone-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.bone-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.bone-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.bone-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.bone-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.bone-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.bone-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.bone-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.bone-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.bone-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.bone-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.bone-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.bone-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.bone-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.bone-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.bone-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.bone-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.bone-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.bone-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.bone-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.bone-panel{width:100%}.bone-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.bone-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.bone-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.bone-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.bone-tool .card-head.compact{margin-bottom:9px}
.bone-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.bone-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.bone-tool .btn,.bone-tool .soft-btn,.bone-tool .segmented button,.bone-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.bone-tool .btn:hover,.bone-tool .soft-btn:hover,.bone-tool .segmented button:hover,.bone-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.bone-tool .btn{padding:0 12px}.bone-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.bone-tool .segmented{display:flex;gap:7px;margin:0}.bone-tool .segmented button{padding:0 13px}
.bone-tool .segmented button[aria-pressed="true"],.bone-tool .soft-btn[aria-pressed="true"],.bone-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.bone-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.bone-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.bone-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.bone-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.bone-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.bone-tool .range-control input{width:100%;accent-color:#8b5cf6}.bone-tool .range-control b{color:#7c3aed;font-size:13px}
.bone-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.bone-tool .soft-btn{padding:0 12px}
.bone-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.bone-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.bone-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.bone-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.bone-tool .info-title{display:flex;align-items:center;gap:10px}.bone-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.bone-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.bone-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.bone-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.bone-tool .facts{display:grid;gap:6px;margin-top:10px}.bone-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.bone-tool .facts b{color:#7c3aed;font-size:13.5px}.bone-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.bone-tool .fun,.bone-tool .warn,.bone-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.bone-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.bone-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.bone-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.bone-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.bone-tool .state-big.up{color:#0f766e}.bone-tool .state-big.down{color:#b45309}
.bone-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.bone-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.bone-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.bone-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.bone-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.bone-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.bone-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.bone-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.bone-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.bone-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.bone-tool .qopt:hover{filter:brightness(.985)}.bone-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.bone-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.bone-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.bone-tool .qfb,.bone-tool .score{font-size:13px;font-weight:900}.bone-tool .qfb.ok{color:#15803d}.bone-tool .qfb.no{color:#be123c}.bone-tool .score{color:#7c3aed}
.bone-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.bone-grid{grid-template-columns:1fr;align-items:start}.bone-side{grid-template-rows:auto auto;height:auto}.bone-tool .control-grid{grid-template-columns:1fr}.bone-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.bone-hero{flex-wrap:wrap;padding:12px}.bone-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.bone-tabs{grid-template-columns:1fr}.bone-tabs .tab{min-height:40px}.bone-card{padding:11px;border-radius:18px}.bone-tool .card-head{align-items:flex-start;flex-direction:column}.bone-tool .head-actions{width:100%;justify-content:space-between}.bone-tool .head-actions .segmented{flex:1;min-width:0}.bone-tool .head-actions .segmented button{flex:1;padding:0 8px}.bone-tool .qopts{grid-template-columns:1fr}.bone-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.bone-tool *{transition:none!important}}

.bone-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.bone-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.bone-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.bone-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.bone-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.bone-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.bone-tool .checklist{display:grid;gap:6px;margin-top:10px}
.bone-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.bone-tool .checklist .ok{color:#15803d}.bone-tool .checklist .no{color:#be123c}.bone-tool .checklist .wait{color:#94a3b8}
.bone-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.bone-tool .process span{flex:1}.bone-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.bone-tool .process .on{color:#0284c7}.bone-tool .process i.on{color:#ec4899}
@media(max-width:640px){.bone-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.bone-tool .slider-pair{grid-template-columns:1fr}}

.bone-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.bone-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.bone-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.bone-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.bone-tool .pulse-box{display:grid;gap:7px;margin-bottom:4px}
.bone-tool .habit{display:flex;gap:8px;align-items:center;width:100%;padding:7px 10px;border:1px solid #e9d5ff;border-radius:12px;background:#fff;text-align:left;cursor:pointer;color:#334155;font-size:13px;line-height:1.3}
.bone-tool .habit span{font-size:18px}.bone-tool .habit.on{background:#f0fdf4;border-color:#86efac}.bone-tool .habit b{font-weight:800}
.bone-tool .bone-meter{display:flex;align-items:center;gap:8px}.bone-tool .bone-meter div{flex:1;height:12px;border-radius:6px;background:#e5e7eb;overflow:hidden}.bone-tool .bone-meter i{display:block;height:100%;background:linear-gradient(90deg,#fde68a,#22c55e);transition:width .3s}
.bone-tool #c_skel{touch-action:none;cursor:grab}
.bone-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}

.bone-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.bone-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="bone-tool" data-tool-root>
  <div class="bone-hero">
    <div class="bone-hero-icon" aria-hidden="true">🦴</div>
    <div>
      <p class="bone-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="bone-lead" data-t="lead"></p>
    </div>
    <div class="bone-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="bAudioNotice" class="bone-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="bone-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="skel" data-t="tab_skel"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="move" data-t="tab_move"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="care" data-t="tab_care"></button>
  </div>
  <section id="b-skel" class="bone-panel" role="tabpanel">
    <div class="bone-grid">
      <article class="bone-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_skel"></h2></div>
          <div class="head-actions"><button id="skShuffle" class="btn" type="button" data-t="shuffle"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_skel" role="img" data-ta="cv_skel"></canvas></div>
        <p id="hud_skel" class="hud" aria-live="polite"></p>
      </article>
      <div class="bone-side">
        <aside class="bone-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_skel"></span><h2 data-t="sh_skel"></h2></div></div>
          
          <div id="info_skel" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_skel" class="bone-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="b-move" class="bone-panel hidden" role="tabpanel">
    <div class="bone-grid">
      <article class="bone-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_move"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="jointL"><button type="button" data-jt="elbow" aria-pressed="true" data-t="jElbow"></button><button type="button" data-jt="knee" aria-pressed="false" data-t="jKnee"></button><button type="button" data-jt="shoulder" aria-pressed="false" data-t="jShoulder"></button></div></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_move" role="img" data-ta="cv_move"></canvas></div>
        <p id="hud_move" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="bendL"></span><input id="mvBend" type="range" min="0" max="1" value="0.3" step="0.01"></label>
        <div class="toggle-row" style="justify-content:flex-start;margin-top:8px"><button id="mvAuto" class="soft-btn" type="button" aria-pressed="true" data-t="auto"></button><button id="mvWt" class="soft-btn" type="button" aria-pressed="false" data-t="weight"></button></div>
      </article>
      <div class="bone-side">
        <aside class="bone-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_move"></span><h2 data-t="sh_move"></h2></div></div>
          
          <div id="info_move" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_move" class="bone-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="b-care" class="bone-panel hidden" role="tabpanel">
    <div class="bone-grid">
      <article class="bone-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_care"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_care" role="img" data-ta="cv_care"></canvas></div>
        <p id="hud_care" class="hud" aria-live="polite"></p>
        <div class="cond-row"><div class="segmented" role="group" data-ta="postureL"><button type="button" data-pos="good" aria-pressed="true" data-t="pGood"></button><button type="button" data-pos="slouch" aria-pressed="false" data-t="pSlouch"></button><button type="button" data-pos="phone" aria-pressed="false" data-t="pPhone"></button></div><button id="crOne" class="soft-btn" type="button" aria-pressed="false" data-t="oneStrap"></button></div>
        <label class="range-control"><span data-t="bagL"></span><input id="crBag" type="range" min="0" max="8" value="3" step="0.5"><b id="crBagTxt"></b></label>
      </article>
      <div class="bone-side">
        <aside class="bone-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_care"></span><h2 data-t="sh_care"></h2></div></div>
          <div id="habitBox" class="pulse-box"></div>
          <div id="info_care" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_care" class="bone-card quiz-card"></article>
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
    const audioNotice = $('bAudioNotice');
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
      kicker: ['Epsilon Edu · Cơ thể người', 'Epsilon Edu · Human body'],
      title: ['Bộ xương và cơ bắp', 'Bones and Muscles'],
      lead: ['Tự lắp ráp bộ xương người, xem cơ bắp co duỗi để cử động khớp, và học cách giữ cho xương chắc khỏe, lưng thẳng.', 'Build a human skeleton, watch muscles pull to move your joints, and learn to keep bones strong and your back straight.'],
      tabsLabel: ['Các hoạt động', 'Activities'], eyeSim: ['Thử ngay', 'Try it'],
      tab_skel: ['🦴 Lắp bộ xương', '🦴 Build a skeleton'], h_skel: ['Kéo từng xương vào đúng chỗ', 'Drag each bone into place'],
      cv_skel: ['Hình bóng cơ thể và các mảnh xương. Kéo xương vào đúng vị trí', 'A body outline and loose bones. Drag them into place'],
      se_skel: ['Xương vừa lắp', 'Bone placed'], sh_skel: ['Em có biết?', 'Did you know?'],
      tab_move: ['💪 Khớp và cơ', '💪 Joints and muscles'], h_move: ['Cơ kéo, xương cử động', 'Muscles pull, bones move'],
      cv_move: ['Xương, khớp và cặp cơ co duỗi', 'Bones, a joint and a pair of muscles'],
      se_move: ['Tìm hiểu', 'Learn'], sh_move: ['Cơ làm việc theo cặp', 'Muscles work in pairs'],
      tab_care: ['🎒 Xương chắc, lưng thẳng', '🎒 Strong bones, straight back'], h_care: ['Tư thế và cặp sách', 'Posture and school bags'],
      cv_care: ['Bạn nhỏ ngồi học và đeo cặp, cột sống thay đổi theo tư thế', 'A child sitting and carrying a bag; the spine changes with posture'],
      se_care: ['Thói quen tốt', 'Good habits'], sh_care: ['Hôm nay em đã…', 'Today I…'],
      shuffle: ['🔀 Xáo lại', '🔀 Shuffle'], jointL: ['Khớp', 'Joint'], jElbow: ['💪 Khuỷu tay', '💪 Elbow'], jKnee: ['🦵 Đầu gối', '🦵 Knee'], jShoulder: ['🔄 Vai', '🔄 Shoulder'],
      bendL: ['Gập – duỗi', 'Bend – straighten'], auto: ['▶ Tự động', '▶ Auto'], weight: ['🏋️ Cầm tạ', '🏋️ Hold a weight'],
      postureL: ['Tư thế ngồi', 'Sitting posture'], pGood: ['✅ Ngồi thẳng', '✅ Upright'], pSlouch: ['😣 Cúi gập', '😣 Slouching'], pPhone: ['📱 Cúi xem điện thoại', '📱 Looking down at a phone'],
      bagL: ['Cân nặng cặp sách (kg)', 'School bag weight (kg)'], oneStrap: ['🎒 Đeo một quai', '🎒 One strap only']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    const emo = (ctx, e, x, y, px) => { ctx.font = emojiFont(px); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e, x, y); };
    const BONE = '#f5f0e1', BONE_D = '#c9bfa4';
    function longBone(ctx, ax, ay, bx, by, r) {
      const a = Math.atan2(by - ay, bx - ax), L2 = Math.hypot(bx - ax, by - ay);
      ctx.save(); ctx.translate(ax, ay); ctx.rotate(a);
      ctx.fillStyle = BONE; ctx.strokeStyle = BONE_D; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(r * .6, -r * .45); ctx.lineTo(L2 - r * .6, -r * .45); ctx.lineTo(L2 - r * .6, r * .45); ctx.lineTo(r * .6, r * .45); ctx.closePath(); ctx.fill(); ctx.stroke();
      for (const x of [r * .3, L2 - r * .3]) for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(x, s * r * .45, r * .55, 0, TAU); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = BONE; ctx.fillRect(r * .3, -r * .5, L2 - r * .6, r); ctx.restore();
    }

    /* =====================================================================
       1. LẮP RÁP BỘ XƯƠNG
       ===================================================================== */
    const PIECES = [
      { id: 'skull', k: 'skull', a: [0, .075], vi: ['Hộp sọ', 'Như chiếc mũ bảo hiểm bảo vệ bộ não. Em bé mới sinh có chỗ mềm trên đầu gọi là "thóp", sau này xương sẽ liền lại.'], en: ['Skull', 'A helmet protecting the brain. Newborns have soft spots called fontanelles that close as they grow.'] },
      { id: 'ribs', k: 'ribs', a: [0, .27], vi: ['Lồng ngực (xương sườn)', '12 đôi xương sườn tạo thành chiếc lồng bảo vệ tim và phổi. Lồng ngực nở ra khi em hít vào.'], en: ['Ribcage', '12 pairs of ribs form a cage protecting the heart and lungs. It expands when you breathe in.'] },
      { id: 'spine', k: 'spine', a: [0, .34], vi: ['Cột sống', 'Khoảng 33 đốt sống xếp chồng lên nhau, giúp em đứng thẳng, cúi, xoay người. Bên trong là tủy sống.'], en: ['Spine', 'About 33 stacked vertebrae let you stand tall, bend and twist. The spinal cord runs inside.'] },
      { id: 'pelvis', k: 'pelvis', a: [0, .53], vi: ['Xương chậu', 'Như chiếc chậu nâng đỡ phần thân trên, nối thân mình với hai chân.'], en: ['Pelvis', 'A bowl that supports your upper body and joins it to your legs.'] },
      { id: 'humL', k: 'long', a: [-.115, .2], b: [-.14, .375], vi: ['Xương cánh tay (trái)', 'Nối vai với khuỷu tay.'], en: ['Upper arm bone (left)', 'Joins the shoulder to the elbow.'] },
      { id: 'humR', k: 'long', a: [.115, .2], b: [.14, .375], vi: ['Xương cánh tay (phải)', 'Cơ hai đầu và cơ ba đầu bám vào đây để gập, duỗi tay.'], en: ['Upper arm bone (right)', 'The biceps and triceps attach here to bend and straighten the arm.'] },
      { id: 'foreL', k: 'long', a: [-.14, .385], b: [-.16, .54], two: 1, vi: ['Xương cẳng tay (trái)', 'Gồm 2 xương: xương quay và xương trụ, giúp em xoay cổ tay.'], en: ['Forearm bones (left)', 'Two bones, the radius and ulna, let you twist your wrist.'] },
      { id: 'foreR', k: 'long', a: [.14, .385], b: [.16, .54], two: 1, vi: ['Xương cẳng tay (phải)', 'Hai xương bắt chéo nhau khi em lật úp bàn tay.'], en: ['Forearm bones (right)', 'The two bones cross when you turn your palm down.'] },
      { id: 'femL', k: 'long', a: [-.055, .56], b: [-.065, .755], vi: ['Xương đùi (trái)', 'Xương dài nhất và chắc nhất cơ thể, dài khoảng 1/4 chiều cao của em!'], en: ['Thigh bone (left)', 'The longest, strongest bone: about a quarter of your height!'] },
      { id: 'femR', k: 'long', a: [.055, .56], b: [.065, .755], vi: ['Xương đùi (phải)', 'Xương đùi chịu được sức nặng lớn hơn nhiều lần cân nặng cơ thể.'], en: ['Thigh bone (right)', 'It can bear many times your body weight.'] },
      { id: 'tibL', k: 'long', a: [-.065, .775], b: [-.07, .95], two: 1, vi: ['Xương cẳng chân (trái)', 'Gồm 2 xương: xương chày to ở trước và xương mác nhỏ ở bên.'], en: ['Shin bones (left)', 'Two bones: the thick tibia in front and the thin fibula beside it.'] },
      { id: 'tibR', k: 'long', a: [.065, .775], b: [.07, .95], two: 1, vi: ['Xương cẳng chân (phải)', 'Xương ống chân nằm ngay dưới da, va vào rất đau!'], en: ['Shin bones (right)', 'The shin is just under the skin; bumping it really hurts!'] }
    ];
    let sk = { pos: {}, placed: {}, drag: null, last: null, dance: 0, infoKey: '' };
    const skC = mk('c_skel', (w) => clamp(w * .78, 360, 580));
    function skGeom() { const { w, h } = skC, H = h * .9, ox = w / 2, oy = h * .05; return { w, h, H, ox, oy, P: ([x, y]) => ({ x: ox + x * H, y: oy + y * H }) }; }
    function skCenter(p, g) { if (p.k === 'long') { const A = g.P(p.a), B = g.P(p.b); return { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }; } return g.P(p.a); }
    function skShuffle() {
      const g = skGeom(); sk.placed = {}; sk.last = null; sk.dance = 0;
      const ord = PIECES.map((_, i) => i).sort(() => Math.random() - .5);
      ord.forEach((pi, k) => { const left = k % 2 === 0, row = Math.floor(k / 2); sk.pos[PIECES[pi].id] = { x: left ? g.w * rand(.1, .2) : g.w * rand(.8, .9), y: g.h * (.12 + row * .14) }; });
      skInfo(true);
    }
    function drawPiece(ctx, p, cx, cy, g, glow) {
      const H = g.H, c0 = skCenter(p, g), dx = cx - c0.x, dy = cy - c0.y;
      if (glow) { ctx.save(); ctx.shadowColor = '#fde047'; ctx.shadowBlur = 16; }
      if (p.k === 'long') { const A = g.P(p.a), B = g.P(p.b), r = H * (p.id.startsWith('fem') ? .022 : .017); if (p.two) { const nx = (B.y - A.y), ny = -(B.x - A.x), nl = Math.hypot(nx, ny), o = r * .55; longBone(ctx, A.x + dx + nx / nl * o, A.y + dy + ny / nl * o, B.x + dx + nx / nl * o, B.y + dy + ny / nl * o, r * .75); longBone(ctx, A.x + dx - nx / nl * o, A.y + dy - ny / nl * o, B.x + dx - nx / nl * o, B.y + dy - ny / nl * o, r * .6); } else longBone(ctx, A.x + dx, A.y + dy, B.x + dx, B.y + dy, r); }
      else if (p.k === 'skull') { ctx.fillStyle = BONE; ctx.strokeStyle = BONE_D; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx, cy - H * .01, H * .055, H * .065, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#3f3a2e'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + s * H * .022, cy, H * .014, H * .016, 0, 0, TAU); ctx.fill(); } ctx.beginPath(); ctx.moveTo(cx, cy + H * .015); ctx.lineTo(cx - H * .007, cy + H * .028); ctx.lineTo(cx + H * .007, cy + H * .028); ctx.fill(); ctx.fillStyle = BONE; rr(ctx, cx - H * .03, cy + H * .04, H * .06, H * .025, 4); ctx.fill(); ctx.stroke(); ctx.strokeStyle = BONE_D; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(cx + k * H * .011, cy + H * .04); ctx.lineTo(cx + k * H * .011, cy + H * .065); ctx.stroke(); } }
      else if (p.k === 'ribs') { ctx.strokeStyle = BONE; ctx.lineWidth = H * .011; ctx.lineCap = 'round'; for (let k = 0; k < 7; k++) { const y = cy - H * .075 + k * H * .023, ww = H * (.06 + Math.sin((k + 1) / 8 * Math.PI) * .045); ctx.beginPath(); ctx.moveTo(cx, y); ctx.quadraticCurveTo(cx - ww * 1.2, y - H * .005, cx - ww, y + H * .03); ctx.moveTo(cx, y); ctx.quadraticCurveTo(cx + ww * 1.2, y - H * .005, cx + ww, y + H * .03); ctx.stroke(); } ctx.fillStyle = BONE; rr(ctx, cx - H * .01, cy - H * .085, H * .02, H * .12, 4); ctx.fill(); }
      else if (p.k === 'spine') { for (let k = 0; k < 17; k++) { const y = cy - H * .19 + k * H * .022; ctx.fillStyle = BONE; ctx.strokeStyle = BONE_D; ctx.lineWidth = 1; rr(ctx, cx - H * .014, y, H * .028, H * .017, 3); ctx.fill(); ctx.stroke(); } }
      else if (p.k === 'pelvis') { ctx.fillStyle = BONE; ctx.strokeStyle = BONE_D; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - H * .1, cy - H * .035); ctx.quadraticCurveTo(cx - H * .11, cy + H * .03, cx - H * .03, cy + H * .045); ctx.lineTo(cx + H * .03, cy + H * .045); ctx.quadraticCurveTo(cx + H * .11, cy + H * .03, cx + H * .1, cy - H * .035); ctx.quadraticCurveTo(cx, cy - H * .005, cx - H * .1, cy - H * .035); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff7ed'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(cx + s * H * .045, cy + H * .02, H * .014, 0, TAU); ctx.fill(); } }
      if (glow) ctx.restore();
    }
    function drawSkel(dt) {
      const g = skGeom(), { w, h } = g, ctx = skC.ctx; if (!w) return;
      const bg = ctx.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#1e1b4b'); bg.addColorStop(1, '#312e81'); ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
      const done = Object.keys(sk.placed).length === PIECES.length;
      if (done) sk.dance += dt;
      ctx.save();
      if (done && !reduceMotion) { ctx.translate(g.ox, g.oy + g.H * .5); ctx.rotate(Math.sin(sk.dance * 4) * .06); ctx.translate(-g.ox, -(g.oy + g.H * .5)); }
      // hình bóng cơ thể
      ctx.fillStyle = 'rgba(167,139,250,.18)'; ctx.strokeStyle = 'rgba(196,181,253,.5)'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
      const P = g.P; ctx.beginPath(); ctx.ellipse(P([0, .075]).x, P([0, .075]).y, g.H * .07, g.H * .08, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.beginPath(); const sh = P([-.12, .18]), sh2 = P([.12, .18]), hp = P([-.1, .58]), hp2 = P([.1, .58]); ctx.moveTo(sh.x, sh.y); ctx.lineTo(sh2.x, sh2.y); ctx.lineTo(hp2.x, hp2.y); ctx.lineTo(hp.x, hp.y); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.lineCap = 'round'; ctx.lineWidth = g.H * .06; ctx.strokeStyle = 'rgba(167,139,250,.18)';
      for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(P([s * .115, .2]).x, P([s * .115, .2]).y); ctx.lineTo(P([s * .14, .38]).x, P([s * .14, .38]).y); ctx.lineTo(P([s * .16, .56]).x, P([s * .16, .56]).y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(P([s * .06, .56]).x, P([s * .06, .56]).y); ctx.lineTo(P([s * .068, .76]).x, P([s * .068, .76]).y); ctx.lineTo(P([s * .07, .96]).x, P([s * .07, .96]).y); ctx.stroke(); }
      ctx.setLineDash([]);
      // bàn tay, bàn chân (vẽ sẵn)
      for (const s of [-1, 1]) { ctx.fillStyle = 'rgba(245,240,225,.55)'; ctx.beginPath(); ctx.ellipse(P([s * .165, .575]).x, P([s * .165, .575]).y, g.H * .018, g.H * .03, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(P([s * .085, .965]).x, P([s * .085, .965]).y, g.H * .035, g.H * .013, 0, 0, TAU); ctx.fill(); }
      for (const p of PIECES) if (sk.placed[p.id]) { const c = skCenter(p, g); drawPiece(ctx, p, c.x, c.y, g, p.id === sk.last && !done); }
      ctx.restore();
      for (const p of PIECES) if (!sk.placed[p.id]) { const q = sk.pos[p.id]; if (q) drawPiece(ctx, p, q.x, q.y, g, sk.drag && sk.drag.id === p.id); }
      ctx.fillStyle = 'rgba(15,23,42,.7)'; rr(ctx, 10, 10, 170, 28, 10); ctx.fill();
      textLight(ctx, T(`🦴 Đã lắp ${Object.keys(sk.placed).length}/${PIECES.length}`, `🦴 Placed ${Object.keys(sk.placed).length}/${PIECES.length}`), 20, 24, '#fde68a', 12.5, 'left', 900);
      if (done) { bubble(ctx, T('🎉 Bộ xương hoàn chỉnh! Nhảy múa nào!', '🎉 Skeleton complete! Let’s dance!'), w / 2, h - 22, 14, '#fff', '#6d28d9'); emo(ctx, '🎵', w * .25 + Math.sin(sk.dance * 3) * 10, h * .3, 26); emo(ctx, '🎶', w * .75 + Math.cos(sk.dance * 3) * 10, h * .4, 26); }
    }
    skC.c.addEventListener('pointerdown', (e) => {
      const g = skGeom(), p = localPoint(skC.c, e); let best = null, bd = g.H * .09;
      for (const pc of PIECES) { if (sk.placed[pc.id]) continue; const q = sk.pos[pc.id], d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; best = pc; } }
      if (best) { cancelSpeech(); sk.drag = { id: best.id, dx: sk.pos[best.id].x - p.x, dy: sk.pos[best.id].y - p.y }; try { skC.c.setPointerCapture(e.pointerId); } catch (_) {} }
    });
    skC.c.addEventListener('pointermove', (e) => { if (!sk.drag) return; const p = localPoint(skC.c, e); sk.pos[sk.drag.id] = { x: p.x + sk.drag.dx, y: p.y + sk.drag.dy }; });
    const skUp = () => { if (!sk.drag) return; const g = skGeom(), pc = PIECES.find((x) => x.id === sk.drag.id), c = skCenter(pc, g), q = sk.pos[pc.id]; if (Math.hypot(c.x - q.x, c.y - q.y) < g.H * .06) { sk.placed[pc.id] = 1; sk.last = pc.id; skInfo(true); } sk.drag = null; };
    skC.c.addEventListener('pointerup', skUp); skC.c.addEventListener('pointercancel', skUp);
    $('skShuffle').onclick = () => { cancelSpeech(); skShuffle(); };
    function skInfo(force) {
      const key = lang + sk.last + Object.keys(sk.placed).length; if (key === sk.infoKey && !force) return; sk.infoKey = key;
      const done = Object.keys(sk.placed).length === PIECES.length, notes = [['fun', T('✨ Người lớn có 206 xương, còn em bé mới sinh có khoảng 300 xương. Lớn lên, nhiều xương nhỏ dính lại với nhau.', '✨ Adults have 206 bones, but newborns have about 300. Many small bones fuse as we grow.')]];
      if (done) notes.unshift(['fun', T('🎉 Giỏi lắm! Hơn một nửa số xương của chúng ta nằm ở bàn tay và bàn chân. Xương nhỏ nhất (xương bàn đạp) ở trong tai, chỉ bằng hạt gạo.', '🎉 Great job! Over half our bones are in our hands and feet. The smallest (the stirrup) is in the ear, the size of a grain of rice.')]);
      if (!sk.last) infoBox($('info_skel'), { emo: '🦴', title: T('Bộ xương của em', 'Your skeleton'), rows: [[T('Cách chơi', 'How to play'), T('Kéo từng mảnh xương ở hai bên vào đúng vị trí trên hình bóng cơ thể.', 'Drag each bone from the sides onto the matching spot on the body outline.')], [T('Xương để làm gì?', 'What are bones for?'), T('Nâng đỡ cơ thể, bảo vệ các bộ phận bên trong (não, tim, phổi) và cùng cơ bắp giúp em cử động.', 'They hold you up, protect organs like the brain, heart and lungs, and work with muscles so you can move.')]], notes });
      else { const p = PIECES.find((x) => x.id === sk.last), d = L({ vi: p.vi, en: p.en }); infoBox($('info_skel'), { emo: '🦴', title: d[0], sub: T(`Đã lắp ${Object.keys(sk.placed).length}/${PIECES.length}`, `Placed ${Object.keys(sk.placed).length}/${PIECES.length}`), rows: [[T('Em có biết?', 'Did you know?'), d[1]]], notes }); }
      setText('hud_skel', done ? T('🎉 Bộ xương đã hoàn chỉnh!', '🎉 Skeleton complete!') : T(`🦴 Còn ${PIECES.length - Object.keys(sk.placed).length} xương chưa lắp`, `🦴 ${PIECES.length - Object.keys(sk.placed).length} bones left`));
    }
    TABS.skel = { frame(dt) { if (!Object.keys(sk.pos).length && skC.w) skShuffle(); drawSkel(dt); }, refresh() { sk.infoKey = ''; skInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_skel'), {
      vi: [
        { q: 'Cơ thể người lớn có bao nhiêu xương?', a: ['206', '50', '1.000', '12'], why: 'Em bé mới sinh có khoảng 300 xương, nhiều xương sẽ dính lại.' },
        { q: 'Xương nào dài nhất cơ thể?', a: ['Xương đùi', 'Xương sườn', 'Xương sọ', 'Xương ngón tay'], why: 'Xương đùi dài khoảng 1/4 chiều cao.' },
        { q: 'Hộp sọ bảo vệ bộ phận nào?', a: ['Bộ não', 'Dạ dày', 'Bàn chân', 'Gan'], why: 'Hộp sọ như chiếc mũ bảo hiểm cho não.' },
        { q: 'Lồng ngực bảo vệ những gì?', a: ['Tim và phổi', 'Não', 'Ruột', 'Thận'], why: '12 đôi xương sườn tạo thành chiếc lồng che chắn.' },
        { q: 'Xương nhỏ nhất cơ thể nằm ở đâu?', a: ['Trong tai', 'Ở ngón chân', 'Ở mũi', 'Ở đầu gối'], why: 'Xương bàn đạp trong tai chỉ to bằng hạt gạo.' },
        { q: 'Cẳng tay gồm mấy xương?', a: ['2 xương', '1 xương', '5 xương', '10 xương'], why: 'Xương quay và xương trụ giúp em xoay cổ tay.' }
      ],
      en: [
        { q: 'How many bones does an adult have?', a: ['206', '50', '1,000', '12'], why: 'Newborns have about 300; many fuse together.' },
        { q: 'What is the longest bone?', a: ['The thigh bone', 'A rib', 'The skull', 'A finger bone'], why: 'It’s about a quarter of your height.' },
        { q: 'What does the skull protect?', a: ['The brain', 'The stomach', 'The feet', 'The liver'], why: 'It’s a helmet for the brain.' },
        { q: 'What does the ribcage protect?', a: ['Heart and lungs', 'Brain', 'Intestines', 'Kidneys'], why: '12 pairs of ribs form a protective cage.' },
        { q: 'Where is the smallest bone?', a: ['In the ear', 'In a toe', 'In the nose', 'In the knee'], why: 'The stirrup bone is the size of a rice grain.' },
        { q: 'How many bones are in the forearm?', a: ['2', '1', '5', '10'], why: 'The radius and ulna let you twist your wrist.' }
      ]
    }));

    /* =====================================================================
       2. KHỚP VÀ CƠ
       ===================================================================== */
    let mv = { j: 'elbow', bend: .3, auto: !reduceMotion, wt: false, t: 0, infoKey: '' };
    const mvC = mk('c_move', (w) => clamp(w * .6, 300, 480));
    function muscle(ctx, ax, ay, bx, by, len0, col, label, contracting, want) {
      const L2 = Math.hypot(bx - ax, by - ay), thick = clamp(len0 / L2, .5, 2.2) * len0 * .13 * (mv.wt && contracting ? 1.25 : 1);
      const mx = (ax + bx) / 2, my = (ay + by) / 2; let nx = -(by - ay) / L2, ny = (bx - ax) / L2; if (nx * want < 0) { nx = -nx; ny = -ny; }
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(mx + nx * thick, my + ny * thick, bx, by); ctx.quadraticCurveTo(mx - nx * thick * .5, my - ny * thick * .5, ax, ay); ctx.fill();
      ctx.strokeStyle = 'rgba(127,29,29,.35)'; ctx.lineWidth = 1; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(mx + nx * thick * k / 4, my + ny * thick * k / 4, bx, by); ctx.stroke(); }
      textLight(ctx, label, mx + nx * (thick + 12), my + ny * (thick + 12), contracting ? '#b91c1c' : '#64748b', 11.5, want > 0 ? 'left' : 'right', 900);
    }
    function drawMove(dt) {
      const { w, h, ctx } = mvC; if (!w) return;
      mv.t += dt; if (mv.auto) { mv.bend = .5 - .5 * Math.cos(mv.t * 1.3); $('mvBend').value = String(mv.bend); }
      ctx.fillStyle = '#fff7ed'; ctx.fillRect(0, 0, w, h);
      const S = Math.min(w, h);
      if (mv.j === 'shoulder') {
        const cx = w * .45, cy = h * .45, R = S * .05, a = mv.t * 1.6;
        ctx.fillStyle = BONE; ctx.strokeStyle = BONE_D; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, Math.PI * .6, Math.PI * 1.4, true); ctx.lineTo(cx - R * 2.5, cy - R * 1.2); ctx.lineTo(cx - R * 2.5, cy + R * 1.2); ctx.closePath(); ctx.fill(); ctx.stroke();
        const ex = cx + Math.cos(a) * S * .3, ey = cy + Math.sin(a) * S * .3; longBone(ctx, cx, cy, ex, ey, S * .03); ctx.fillStyle = BONE; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = 'rgba(236,72,153,.5)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, S * .32, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
        textLight(ctx, T('Khớp cầu: quay được mọi hướng', 'Ball-and-socket: moves every way'), w / 2, h * .9, '#be185d', 13, 'center', 900);
        mvInfo(); return;
      }
      if (mv.j === 'elbow') {
        const sx = w * .35, sy = h * .1, ex = w * .35, ey = h * .55, ang = mv.bend * 2.4, fl = S * .38, hx = ex + Math.sin(ang) * fl, hy = ey + Math.cos(ang) * fl;
        ctx.fillStyle = 'rgba(253,186,116,.25)'; ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(253,186,116,.3)'; ctx.lineWidth = S * .14; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
        longBone(ctx, sx, sy, ex, ey, S * .03); longBone(ctx, ex, ey, hx, hy, S * .026);
        const bA = { x: sx + S * .02, y: sy + S * .03 }, bB = { x: ex + Math.sin(ang) * S * .07 + S * .015, y: ey + Math.cos(ang) * S * .07 };
        const tA = { x: sx - S * .025, y: sy + S * .03 }, tB = { x: ex - S * .03, y: ey + S * .01 };
        muscle(ctx, tA.x, tA.y, tB.x - S * .01, tB.y, Math.hypot(ex - sx, ey - sy) * .95, mv.bend < .5 ? '#ef4444' : '#fca5a5', T(`Cơ ba đầu: ${mv.bend < .5 ? 'CO' : 'duỗi'}`, `Triceps: ${mv.bend < .5 ? 'PULLS' : 'relaxes'}`), mv.bend < .5, -1);
        muscle(ctx, bA.x + S * .01, bA.y, bB.x, bB.y, Math.hypot(ex - sx, ey - sy) * .95, mv.bend >= .5 ? '#ef4444' : '#fca5a5', T(`Cơ hai đầu: ${mv.bend >= .5 ? 'CO' : 'duỗi'}`, `Biceps: ${mv.bend >= .5 ? 'PULLS' : 'relaxes'}`), mv.bend >= .5, 1);
        ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(ex, ey, S * .025, 0, TAU); ctx.fill();
        if (mv.wt) emo(ctx, '🏋️', hx, hy + 10, S * .1); else emo(ctx, '✊', hx, hy, S * .07);
        textLight(ctx, T('Khớp khuỷu (bản lề)', 'Elbow (hinge)'), ex - S * .05, ey + S * .04, '#a16207', 12, 'right', 900);
      } else {
        const hx0 = w * .45, hy0 = h * .08, kx = w * .45, ky = h * .5, ang = mv.bend * 2.0, ll = S * .38, ax = kx - Math.sin(ang) * ll, ay = ky + Math.cos(ang) * ll;
        ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(253,186,116,.3)'; ctx.lineWidth = S * .16; ctx.beginPath(); ctx.moveTo(hx0, hy0); ctx.lineTo(kx, ky); ctx.lineTo(ax, ay); ctx.stroke();
        longBone(ctx, hx0, hy0, kx, ky, S * .035); longBone(ctx, kx, ky, ax, ay, S * .03);
        muscle(ctx, hx0 + S * .03, hy0 + S * .04, kx + S * .03, ky + S * .03, (ky - hy0) * .95, mv.bend < .5 ? '#ef4444' : '#fca5a5', T(`Cơ đùi trước: ${mv.bend < .5 ? 'CO' : 'duỗi'}`, `Quadriceps: ${mv.bend < .5 ? 'PULLS' : 'relaxes'}`), mv.bend < .5, 1);
        muscle(ctx, hx0 - S * .03, hy0 + S * .04, kx - S * .03 - Math.sin(ang) * S * .05, ky + Math.cos(ang) * S * .05, (ky - hy0) * .95, mv.bend >= .5 ? '#ef4444' : '#fca5a5', T(`Cơ đùi sau: ${mv.bend >= .5 ? 'CO' : 'duỗi'}`, `Hamstrings: ${mv.bend >= .5 ? 'PULLS' : 'relaxes'}`), mv.bend >= .5, -1);
        ctx.fillStyle = BONE; ctx.strokeStyle = BONE_D; ctx.beginPath(); ctx.ellipse(kx + S * .035, ky, S * .02, S * .028, 0, 0, TAU); ctx.fill(); ctx.stroke();
        emo(ctx, mv.bend > .4 ? '⚽' : '👟', ax - S * .03, ay + S * .02, S * .07);
        textLight(ctx, T('Khớp gối (bản lề)', 'Knee (hinge)'), kx + S * .08, ky, '#a16207', 12, 'left', 900);
      }
      mvInfo();
    }
    function mvInfo() {
      const key = [lang, mv.j, mv.wt].join('|'); if (key === mv.infoKey) return; mv.infoKey = key;
      const rows = mv.j === 'shoulder' ? [[T('Khớp cầu', 'Ball-and-socket'), T('Đầu xương tròn như quả bóng nằm trong hốc lõm, nên tay xoay được vòng tròn. Khớp háng cũng là khớp cầu.', 'A round bone end sits in a cup, so the arm can swing in circles. The hip is one too.')], [T('Khớp bản lề', 'Hinge joints'), T('Khuỷu tay, đầu gối chỉ gập – duỗi theo một hướng, giống bản lề cửa.', 'Elbows and knees only bend one way, like a door hinge.')]]
        : [[T('Cơ chỉ biết kéo', 'Muscles only pull'), T('Cơ co lại (ngắn và phồng lên) để kéo xương. Cơ không đẩy được, nên chúng luôn làm việc theo cặp: một cơ co thì cơ kia duỗi.', 'A muscle contracts (gets short and fat) to pull a bone. It can’t push, so muscles work in pairs: one pulls while the other relaxes.')], [mv.j === 'elbow' ? T('Gập tay', 'Bending the arm') : T('Gập gối', 'Bending the knee'), mv.j === 'elbow' ? T('Cơ hai đầu (bắp tay trước) co để gập tay; cơ ba đầu (bắp tay sau) co để duỗi tay.', 'The biceps pulls to bend the arm; the triceps pulls to straighten it.') : T('Cơ đùi sau co để gập gối; cơ đùi trước co để duỗi chân, như khi sút bóng.', 'Hamstrings pull to bend the knee; quadriceps pull to straighten it, as in a kick.')]];
      infoBox($('info_move'), { emo: '💪', title: { elbow: T('Khuỷu tay', 'The elbow'), knee: T('Đầu gối', 'The knee'), shoulder: T('Khớp vai', 'The shoulder') }[mv.j], rows, notes: [['fun', T('✨ Cơ thể có hơn 600 cơ. Cơ lớn nhất là cơ mông, cơ nhỏ nhất nằm trong tai. Cơ tim đập suốt đời mà không bao giờ nghỉ!', '✨ You have over 600 muscles. The biggest is in your bottom, the smallest is in your ear. The heart muscle beats your whole life without resting!')]].concat(mv.wt ? [['tip', T('🏋️ Khi cầm tạ, cơ phải co mạnh hơn. Tập luyện đều đặn giúp cơ khỏe và to hơn.', '🏋️ Holding a weight makes the muscle work harder. Regular exercise makes muscles stronger.')]] : []) });
      setText('hud_move', mv.j === 'shoulder' ? T('🔄 Khớp vai xoay tròn', '🔄 The shoulder turns in circles') : T('💪 Một cơ co thì cơ kia duỗi', '💪 One muscle pulls while the other relaxes'));
    }
    root.querySelectorAll('[data-jt]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); mv.j = b.dataset.jt; pressGroup('[data-jt]', 'jt', mv.j); mvInfo(); }));
    $('mvBend').addEventListener('input', () => { mv.auto = false; $('mvAuto').setAttribute('aria-pressed', 'false'); mv.bend = +$('mvBend').value; });
    $('mvAuto').onclick = () => { mv.auto = !mv.auto; $('mvAuto').setAttribute('aria-pressed', String(mv.auto)); };
    $('mvWt').onclick = () => { mv.wt = !mv.wt; $('mvWt').setAttribute('aria-pressed', String(mv.wt)); };
    TABS.move = { frame(dt) { drawMove(dt); }, refresh() { mv.infoKey = ''; } };
    QUIZZES.push(makeQuiz($('quiz_move'), {
      vi: [
        { q: 'Vì sao cơ phải làm việc theo cặp?', a: ['Vì cơ chỉ kéo được, không đẩy được', 'Vì cơ thích đi đôi', 'Vì có hai tay', 'Không cần cặp'], why: 'Một cơ kéo để gập, cơ kia kéo để duỗi.' },
        { q: 'Khi em gập tay, cơ nào co lại?', a: ['Cơ hai đầu (bắp tay trước)', 'Cơ ba đầu', 'Cơ bụng', 'Cơ bắp chân'], why: 'Cơ hai đầu co lại, ngắn và phồng lên.' },
        { q: 'Khớp khuỷu tay thuộc loại nào?', a: ['Khớp bản lề', 'Khớp cầu', 'Khớp bất động', 'Không phải khớp'], why: 'Chỉ gập duỗi theo một hướng như bản lề cửa.' },
        { q: 'Khớp nào xoay được theo vòng tròn?', a: ['Khớp vai', 'Khớp gối', 'Khớp khuỷu', 'Khớp ngón tay'], why: 'Vai là khớp cầu.' },
        { q: 'Cơ nào hoạt động suốt đời không nghỉ?', a: ['Cơ tim', 'Cơ tay', 'Cơ chân', 'Cơ mặt'], why: 'Tim đập liên tục từ trước khi em sinh ra.' }
      ],
      en: [
        { q: 'Why do muscles work in pairs?', a: ['They can only pull, not push', 'They like company', 'We have two arms', 'They don’t'], why: 'One pulls to bend, the other pulls to straighten.' },
        { q: 'Which muscle contracts when you bend your arm?', a: ['Biceps', 'Triceps', 'Stomach muscles', 'Calf'], why: 'The biceps gets short and fat.' },
        { q: 'What kind of joint is the elbow?', a: ['Hinge', 'Ball-and-socket', 'Fixed', 'Not a joint'], why: 'It bends one way like a door hinge.' },
        { q: 'Which joint can swing in a circle?', a: ['Shoulder', 'Knee', 'Elbow', 'Finger'], why: 'The shoulder is ball-and-socket.' },
        { q: 'Which muscle never rests?', a: ['The heart', 'An arm muscle', 'A leg muscle', 'A face muscle'], why: 'It beats from before you’re born.' }
      ]
    }));

    /* =====================================================================
       3. XƯƠNG CHẮC, LƯNG THẲNG
       ===================================================================== */
    let cr = { posture: 'good', bag: 3, one: false, habits: [false, false, false, false, false, false], infoKey: '' };
    const crC = mk('c_care', (w) => clamp(w * .58, 290, 470));
    const BODY = 25;
    function drawCare() {
      const { w, h, ctx } = crC; if (!w) return;
      ctx.fillStyle = '#f0f9ff'; ctx.fillRect(0, 0, w, h);
      const S = Math.min(w, h), fx = w * .38, fy = h * .9, pct = cr.bag / BODY * 100;
      const lean = (cr.posture === 'slouch' ? .45 : cr.posture === 'phone' ? .3 : 0) + Math.max(0, pct - 10) * .02, neck = cr.posture === 'phone' ? .9 : cr.posture === 'slouch' ? .5 : 0, tilt = cr.one ? .12 : 0;
      // bàn ghế
      ctx.fillStyle = '#a16207'; ctx.fillRect(fx - S * .2, fy - S * .3, S * .2, S * .03); ctx.fillRect(fx - S * .18, fy - S * .27, S * .03, S * .27); ctx.fillRect(fx - S * .02, fy - S * .55, S * .025, S * .55);
      ctx.fillStyle = '#92400e'; ctx.fillRect(fx + S * .15, fy - S * .42, S * .35, S * .03); ctx.fillRect(fx + S * .45, fy - S * .39, S * .03, S * .39);
      emo(ctx, cr.posture === 'phone' ? '📱' : '📖', fx + S * (cr.posture === 'phone' ? .12 : .28), fy - S * (cr.posture === 'phone' ? .36 : .45), S * .07);
      // cột sống & thân
      const hip = { x: fx - S * .08, y: fy - S * .33 }, segs = 10, spine = [];
      for (let i = 0; i <= segs; i++) { const t = i / segs, a = -Math.PI / 2 + lean * t * 1.4 + Math.sin(t * Math.PI * 2) * .06 * (1 - lean) + tilt * Math.sin(t * Math.PI); const prev = spine[i - 1] || hip; spine.push(i === 0 ? hip : { x: prev.x + Math.cos(a) * S * .038, y: prev.y + Math.sin(a) * S * .038 }); }
      const top = spine[segs], head = { x: top.x + Math.sin(neck + lean) * S * .08, y: top.y - Math.cos(neck + lean) * S * .08 };
      ctx.strokeStyle = '#fbcfe8'; ctx.lineWidth = S * .12; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); spine.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke();
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = S * .05; ctx.beginPath(); ctx.moveTo(hip.x, hip.y); ctx.lineTo(fx + S * .1, hip.y); ctx.lineTo(fx + S * .1, fy); ctx.stroke();
      const stress = clamp(lean * 1.1 + neck * .5 + (cr.one ? .25 : 0), 0, 1);
      spine.forEach((p, i) => { if (!i) return; ctx.fillStyle = mix('#f5f0e1', '#ef4444', stress * (i / segs)); ctx.beginPath(); ctx.arc(p.x, p.y, S * .012, 0, TAU); ctx.fill(); });
      ctx.fillStyle = '#fde7c7'; ctx.beginPath(); ctx.arc(head.x, head.y, S * .055, 0, TAU); ctx.fill(); ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.arc(head.x, head.y - S * .01, S * .056, Math.PI, TAU); ctx.fill();
      emo(ctx, stress > .6 ? '😣' : stress > .3 ? '😐' : '😊', head.x + S * .02, head.y + S * .01, S * .05);
      // cặp
      if (cr.bag > 0) { const bs = S * (.06 + cr.bag * .012); ctx.fillStyle = '#8b5cf6'; rr(ctx, spine[5].x - bs * 1.2, spine[5].y - bs * .6, bs, bs * 1.3, 8); ctx.fill(); textLight(ctx, `${cr.bag} kg`, spine[5].x - bs * .7, spine[5].y, '#fff', 11, 'center', 900); }
      // đồng hồ
      ctx.fillStyle = 'rgba(255,255,255,.95)'; rr(ctx, w - 190, 10, 180, 64, 12); ctx.fill();
      textLight(ctx, T('Áp lực lên cột sống', 'Strain on your spine'), w - 100, 24, '#334155', 11.5, 'center', 900);
      ctx.fillStyle = '#e5e7eb'; rr(ctx, w - 180, 34, 160, 10, 5); ctx.fill(); ctx.fillStyle = mix('#22c55e', '#ef4444', stress); rr(ctx, w - 180, 34, 160 * Math.max(.05, stress), 10, 5); ctx.fill();
      textLight(ctx, T(`Cặp = ${pct.toFixed(0)}% cân nặng (em 25 kg)`, `Bag = ${pct.toFixed(0)}% of body weight (25 kg)`), w - 100, 60, pct > 15 ? '#dc2626' : pct > 10 ? '#d97706' : '#15803d', 11, 'center', 900);
      crInfo(stress, pct);
    }
    function crInfo(stress, pct) {
      const key = [lang, cr.posture, Math.round(pct / 5), cr.one].join('|'); if (key === cr.infoKey) return; cr.infoKey = key;
      const notes = [];
      if (pct > 15) notes.push(['warn', T('⚠️ Cặp quá nặng! Hãy chỉ mang sách vở cần cho ngày hôm đó, nhờ bố mẹ kiểm tra cặp mỗi tối.', '⚠️ Too heavy! Pack only what you need for the day and check your bag each evening.')]);
      if (cr.one) notes.push(['warn', T('⚠️ Đeo một quai làm vai lệch, cột sống bị kéo cong. Hãy đeo cả hai quai.', '⚠️ One strap pulls your spine sideways. Use both straps.')]);
      if (cr.posture !== 'good') notes.push(['tip', cr.posture === 'phone' ? T('📱 Cúi đầu xem điện thoại làm cổ phải gánh nặng gấp nhiều lần. Hãy đưa màn hình lên ngang tầm mắt và nghỉ sau mỗi 20 phút.', '📱 Bending over a phone loads your neck many times more. Raise the screen to eye level and rest every 20 minutes.') : T('😣 Ngồi cúi gập lâu ngày có thể gây cong vẹo cột sống, cận thị. Hãy ngồi thẳng lưng, mắt cách vở khoảng 25 – 30 cm.', '😣 Slouching for long can bend your spine and harm your eyes. Sit up straight, eyes about 25 – 30 cm from the page.')]);
      infoBox($('info_care'), { emo: stress > .5 ? '😣' : '😊', title: stress > .5 ? T('Cột sống đang chịu áp lực!', 'Your spine is under strain!') : T('Tư thế tốt!', 'Good posture!'), sub: T(`Cặp nặng ${cr.bag} kg = ${pct.toFixed(0)}% cân nặng`, `Bag ${cr.bag} kg = ${pct.toFixed(0)}% of body weight`), rows: [[T('Cặp sách', 'School bag'), T('Cặp không nên nặng quá khoảng 10% cân nặng cơ thể. Em nặng 25 kg thì cặp nên dưới khoảng 2,5 – 3 kg.', 'A bag should weigh no more than about 10% of your body weight: under about 2.5 – 3 kg for a 25 kg child.')], [T('Ngồi đúng', 'Sit right'), T('Lưng thẳng, hai chân chạm sàn, bàn ghế vừa tầm, đủ ánh sáng.', 'Straight back, feet on the floor, a desk and chair that fit, good light.')]], notes });
    }
    root.querySelectorAll('[data-pos]').forEach((b) => b.addEventListener('click', () => { cr.posture = b.dataset.pos; pressGroup('[data-pos]', 'pos', cr.posture); }));
    $('crBag').addEventListener('input', () => { cr.bag = +$('crBag').value; setText('crBagTxt', `${cr.bag} kg`); });
    $('crOne').onclick = () => { cr.one = !cr.one; $('crOne').setAttribute('aria-pressed', String(cr.one)); };
    const HAB = [{ e: '🥛', vi: 'Uống sữa, ăn tôm cua, cá nhỏ, đậu phụ (giàu canxi)', en: 'Had milk, shrimp, small fish or tofu (rich in calcium)' }, { e: '🌞', vi: 'Tắm nắng sáng sớm vài phút (có vitamin D)', en: 'Got a few minutes of early sunshine (vitamin D)' }, { e: '🏃', vi: 'Vận động, chạy nhảy ít nhất 60 phút', en: 'Was active for at least 60 minutes' }, { e: '🪑', vi: 'Ngồi học đúng tư thế', en: 'Sat with good posture' }, { e: '😴', vi: 'Ngủ đủ khoảng 9 – 11 tiếng', en: 'Slept about 9 – 11 hours' }, { e: '🎒', vi: 'Đeo cặp bằng cả hai quai', en: 'Wore my bag on both shoulders' }];
    function crHabits() {
      const n = cr.habits.filter(Boolean).length;
      $('habitBox').innerHTML = HAB.map((hb, i) => `<button type="button" class="habit${cr.habits[i] ? ' on' : ''}" data-hb="${i}"><span>${cr.habits[i] ? '✅' : hb.e}</span><b></b></button>`).join('') + `<div class="bone-meter"><span>🦴</span><div><i style="width:${n / HAB.length * 100}%"></i></div><b>${n}/${HAB.length}</b></div>${n === HAB.length ? `<p class="fun" style="margin:0">${T('💪 Tuyệt vời! Xương của em đang lớn lên thật chắc khỏe.', '💪 Brilliant! Your bones are growing strong.')}</p>` : ''}`;
      $('habitBox').querySelectorAll('[data-hb]').forEach((b) => { b.querySelector('b').textContent = L(HAB[+b.dataset.hb]); });
    }
    $('habitBox').addEventListener('click', (e) => { const b = e.target.closest('[data-hb]'); if (!b) return; cr.habits[+b.dataset.hb] = !cr.habits[+b.dataset.hb]; crHabits(); });
    TABS.care = { frame() { drawCare(); setText('hud_care', T(`🎒 Cặp ${cr.bag} kg – tư thế: ${{ good: 'ngồi thẳng', slouch: 'cúi gập', phone: 'cúi xem điện thoại' }[cr.posture]}`, `🎒 Bag ${cr.bag} kg – posture: ${{ good: 'upright', slouch: 'slouching', phone: 'looking at phone' }[cr.posture]}`)); }, refresh() { cr.infoKey = ''; setText('crBagTxt', `${cr.bag} kg`); crHabits(); } };
    QUIZZES.push(makeQuiz($('quiz_care'), {
      vi: [
        { q: 'Chất nào giúp xương chắc khỏe?', a: ['Canxi', 'Đường', 'Muối', 'Dầu mỡ'], why: 'Canxi có nhiều trong sữa, tôm cua, cá nhỏ, đậu phụ.' },
        { q: 'Vitamin D giúp gì cho xương?', a: ['Giúp cơ thể hấp thu canxi', 'Làm xương mềm', 'Làm xương ngắn lại', 'Không giúp gì'], why: 'Da tạo vitamin D khi được tắm nắng sáng sớm.' },
        { q: 'Em nặng 25 kg, cặp sách nên nặng khoảng bao nhiêu?', a: ['Dưới khoảng 2,5 – 3 kg', '10 kg', '20 kg', 'Càng nặng càng tốt'], why: 'Khoảng 10% cân nặng cơ thể.' },
        { q: 'Ngồi cúi gập lâu ngày có thể gây ra điều gì?', a: ['Cong vẹo cột sống', 'Cao nhanh hơn', 'Mắt sáng hơn', 'Không sao'], why: 'Hãy ngồi thẳng lưng, hai chân chạm sàn.' },
        { q: 'Vì sao nên đeo cặp bằng cả hai quai?', a: ['Để chia đều sức nặng, lưng không bị lệch', 'Cho đẹp', 'Để chạy nhanh', 'Không cần'], why: 'Đeo một quai kéo cột sống cong sang một bên.' },
        { q: 'Mỗi ngày trẻ em nên vận động bao lâu?', a: ['Ít nhất 60 phút', '5 phút', 'Không cần', '10 giờ liền'], why: 'Vận động giúp xương và cơ phát triển.' }
      ],
      en: [
        { q: 'Which mineral builds strong bones?', a: ['Calcium', 'Sugar', 'Salt', 'Oil'], why: 'Calcium is in milk, shrimp, small fish and tofu.' },
        { q: 'How does vitamin D help bones?', a: ['It helps the body absorb calcium', 'Makes bones soft', 'Shortens bones', 'It doesn’t'], why: 'Skin makes vitamin D in early sunshine.' },
        { q: 'You weigh 25 kg. Your bag should weigh about…', a: ['Under about 2.5 – 3 kg', '10 kg', '20 kg', 'The heavier the better'], why: 'About 10% of body weight.' },
        { q: 'Slouching for long can cause…', a: ['A curved spine', 'Faster growth', 'Better eyesight', 'Nothing'], why: 'Sit up straight with feet on the floor.' },
        { q: 'Why wear your bag on both shoulders?', a: ['It spreads the weight evenly', 'It looks nicer', 'To run faster', 'No need'], why: 'One strap pulls the spine sideways.' },
        { q: 'How long should children be active each day?', a: ['At least 60 minutes', '5 minutes', 'No need', '10 hours straight'], why: 'Activity helps bones and muscles grow.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'skel';
    root.querySelectorAll('.bone-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.bone-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('b-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.bone-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.bone-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.bone-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
