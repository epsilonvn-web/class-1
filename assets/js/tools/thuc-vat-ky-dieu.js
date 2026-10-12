/* Epsilon Edu - Tool: Thuc vat ky dieu (Wonderful plants): quang hop, thu phan, phat tan hat
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.plantWonders = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "plantWonders";
  let activeCleanup = null;

  const CSS = `
.plant-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.plant-tool *{box-sizing:border-box}.plant-tool button,.plant-tool input{font:inherit}.plant-tool button{cursor:pointer}.plant-tool .hidden{display:none!important}
.plant-tool button:focus-visible,.plant-tool canvas:focus-visible,.plant-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.plant-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.plant-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.plant-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.plant-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.plant-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.plant-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.plant-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.plant-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.plant-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.plant-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.plant-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.plant-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.plant-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.plant-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.plant-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.plant-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.plant-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.plant-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.plant-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.plant-panel{width:100%}.plant-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.plant-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.plant-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.plant-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.plant-tool .card-head.compact{margin-bottom:9px}
.plant-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.plant-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.plant-tool .btn,.plant-tool .soft-btn,.plant-tool .segmented button,.plant-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.plant-tool .btn:hover,.plant-tool .soft-btn:hover,.plant-tool .segmented button:hover,.plant-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.plant-tool .btn{padding:0 12px}.plant-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.plant-tool .segmented{display:flex;gap:7px;margin:0}.plant-tool .segmented button{padding:0 13px}
.plant-tool .segmented button[aria-pressed="true"],.plant-tool .soft-btn[aria-pressed="true"],.plant-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.plant-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.plant-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.plant-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.plant-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.plant-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.plant-tool .range-control input{width:100%;accent-color:#8b5cf6}.plant-tool .range-control b{color:#7c3aed;font-size:13px}
.plant-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.plant-tool .soft-btn{padding:0 12px}
.plant-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.plant-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.plant-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.plant-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.plant-tool .info-title{display:flex;align-items:center;gap:10px}.plant-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.plant-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.plant-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.plant-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.plant-tool .facts{display:grid;gap:6px;margin-top:10px}.plant-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.plant-tool .facts b{color:#7c3aed;font-size:13.5px}.plant-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.plant-tool .fun,.plant-tool .warn,.plant-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.plant-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.plant-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.plant-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.plant-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.plant-tool .state-big.up{color:#0f766e}.plant-tool .state-big.down{color:#b45309}
.plant-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.plant-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.plant-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.plant-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.plant-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.plant-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.plant-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.plant-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.plant-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.plant-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.plant-tool .qopt:hover{filter:brightness(.985)}.plant-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.plant-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.plant-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.plant-tool .qfb,.plant-tool .score{font-size:13px;font-weight:900}.plant-tool .qfb.ok{color:#15803d}.plant-tool .qfb.no{color:#be123c}.plant-tool .score{color:#7c3aed}
.plant-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.plant-grid{grid-template-columns:1fr;align-items:start}.plant-side{grid-template-rows:auto auto;height:auto}.plant-tool .control-grid{grid-template-columns:1fr}.plant-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.plant-hero{flex-wrap:wrap;padding:12px}.plant-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.plant-tabs{grid-template-columns:1fr}.plant-tabs .tab{min-height:40px}.plant-card{padding:11px;border-radius:18px}.plant-tool .card-head{align-items:flex-start;flex-direction:column}.plant-tool .head-actions{width:100%;justify-content:space-between}.plant-tool .head-actions .segmented{flex:1;min-width:0}.plant-tool .head-actions .segmented button{flex:1;padding:0 8px}.plant-tool .qopts{grid-template-columns:1fr}.plant-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.plant-tool *{transition:none!important}}

.plant-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.plant-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.plant-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.plant-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.plant-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.plant-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.plant-tool .checklist{display:grid;gap:6px;margin-top:10px}
.plant-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.plant-tool .checklist .ok{color:#15803d}.plant-tool .checklist .no{color:#be123c}.plant-tool .checklist .wait{color:#94a3b8}
.plant-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.plant-tool .process span{flex:1}.plant-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.plant-tool .process .on{color:#0284c7}.plant-tool .process i.on{color:#ec4899}
@media(max-width:640px){.plant-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.plant-tool .slider-pair{grid-template-columns:1fr}}

.plant-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.plant-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.plant-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.plant-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.plant-tool .pulse-box{display:grid;gap:9px;margin-bottom:4px}
.plant-tool .pick-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}.plant-tool .pick-grid .soft-btn{min-height:42px}
.plant-tool #c_pol{cursor:none;touch-action:none}

.plant-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.plant-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="plant-tool" data-tool-root>
  <div class="plant-hero">
    <div class="plant-hero-icon" aria-hidden="true">🌱</div>
    <div>
      <p class="plant-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="plant-lead" data-t="lead"></p>
    </div>
    <div class="plant-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="pAudioNotice" class="plant-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="plant-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="photo" data-t="tab_photo"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="pol" data-t="tab_pol"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="seed" data-t="tab_seed"></button>
  </div>
  <section id="p-photo" class="plant-panel" role="tabpanel">
    <div class="plant-grid">
      <article class="plant-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_photo"></h2></div>
          <div class="head-actions"><button id="phDark" class="btn" type="button" data-t="dark"></button><button id="phCo2" class="soft-btn" type="button" aria-pressed="false" data-t="co2"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_photo" role="img" data-ta="cv_photo"></canvas></div>
        <p id="hud_photo" class="hud" aria-live="polite"></p>
        <div class="slider-pair">
          <label class="range-control"><span data-t="lightL"></span><input id="phLight" type="range" min="0" max="100" value="70" step="1"><b id="phLightTxt"></b></label>
          <label class="range-control"><span data-t="tempL"></span><input id="phTemp" type="range" min="5" max="45" value="26" step="1"><b id="phTempTxt"></b></label>
        </div>
      </article>
      <div class="plant-side">
        <aside class="plant-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_photo"></span><h2 data-t="sh_photo"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_leaf" role="img" aria-hidden="true"></canvas></div>
          <div id="info_photo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_photo" class="plant-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="p-pol" class="plant-panel hidden" role="tabpanel">
    <div class="plant-grid">
      <article class="plant-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_pol"></h2></div>
          <div class="head-actions"><button id="plReset" class="btn" type="button" data-t="reset"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_pol" role="img" data-ta="cv_pol"></canvas></div>
        <p id="hud_pol" class="hud" aria-live="polite"></p>
      </article>
      <div class="plant-side">
        <aside class="plant-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_pol"></span><h2 data-t="sh_pol"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_flower" role="img" aria-hidden="true"></canvas></div>
          <div id="info_pol" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_pol" class="plant-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="p-seed" class="plant-panel hidden" role="tabpanel">
    <div class="plant-grid">
      <article class="plant-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_seed"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="methodL"><button type="button" data-sm="wind" aria-pressed="true" data-t="mWind"></button><button type="button" data-sm="water" aria-pressed="false" data-t="mWater"></button><button type="button" data-sm="animal" aria-pressed="false" data-t="mAnimal"></button><button type="button" data-sm="burst" aria-pressed="false" data-t="mBurst"></button></div><button id="sdGo" class="btn main" type="button" data-t="go"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_seed" role="img" data-ta="cv_seed"></canvas></div>
        <p id="hud_seed" class="hud" aria-live="polite"></p>
        <div id="sdWindRow"><label class="range-control"><span data-t="windL"></span><input id="sdWind" type="range" min="0" max="100" value="50" step="1"></label></div>
      </article>
      <div class="plant-side">
        <aside class="plant-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_seed"></span><h2 data-t="sh_seed"></h2></div></div>
          <div id="seedGame" class="pulse-box"></div>
          <div id="info_seed" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_seed" class="plant-card quiz-card"></article>
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
    const audioNotice = $('pAudioNotice');
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
      kicker: ['Epsilon Edu · Khoa học tự nhiên', 'Epsilon Edu · Science'],
      title: ['Thực vật kỳ diệu', 'Wonderful Plants'],
      lead: ['Xem chiếc lá "làm bánh" từ ánh sáng, điều khiển chú ong giúp hoa bí đậu quả và theo chân những hạt giống đi du lịch.', 'See a leaf “bake” food from light, fly a bee to help squash flowers make fruit, and follow seeds on their travels.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Thí nghiệm', 'Experiment'],
      tab_photo: ['☀️ Quang hợp', '☀️ Photosynthesis'], h_photo: ['Cây rong thở ra bọt khí', 'Pondweed gives off bubbles'],
      cv_photo: ['Cây rong trong cốc nước dưới đèn, bọt khí ô-xi nổi lên', 'Pondweed in water under a lamp, oxygen bubbles rising'],
      se_photo: ['Chiếc lá – nhà máy xanh', 'The leaf factory'], sh_photo: ['Lá làm thức ăn thế nào?', 'How a leaf makes food'],
      tab_pol: ['🐝 Hoa và thụ phấn', '🐝 Flowers and pollination'], h_pol: ['Giúp hoa bí đậu quả', 'Help squash flowers make fruit'],
      cv_pol: ['Vườn bí có hoa đực và hoa cái, chú ong bay theo ngón tay của em', 'A squash patch with male and female flowers; the bee follows your finger'],
      se_pol: ['Cấu tạo hoa', 'Parts of a flower'], sh_pol: ['Bên trong bông hoa', 'Inside a flower'],
      tab_seed: ['🌬️ Hạt đi du lịch', '🌬️ Travelling seeds'], h_seed: ['Hạt rời cây mẹ bằng cách nào?', 'How seeds leave the parent plant'],
      cv_seed: ['Các cách phát tán hạt: gió, nước, động vật, tự bung', 'Ways seeds spread: wind, water, animals, bursting pods'],
      se_seed: ['Thử thách', 'Challenge'], sh_seed: ['Hạt này đi bằng cách nào?', 'How does this seed travel?'],
      lightL: ['Độ sáng của đèn', 'Lamp brightness'], tempL: ['Nhiệt độ nước', 'Water temperature'], co2: ['🫧 Thêm muối nở (thêm CO₂)', '🫧 Add baking soda (more CO₂)'], dark: ['🌙 Tắt đèn', '🌙 Lights off'],
      methodL: ['Cách phát tán', 'Method'], mWind: ['🌬️ Gió', '🌬️ Wind'], mWater: ['🌊 Nước', '🌊 Water'], mAnimal: ['🐕 Động vật', '🐕 Animals'], mBurst: ['💥 Tự bung', '💥 Bursting'],
      windL: ['Sức gió', 'Wind strength'], go: ['▶ Bắt đầu', '▶ Go'], reset: ['↺ Làm lại', '↺ Reset']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    const emo = (ctx, e, x, y, px) => { ctx.font = emojiFont(px); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e, x, y); };

    /* =====================================================================
       1. QUANG HỢP: thí nghiệm cây rong
       ===================================================================== */
    let ph = { light: 70, temp: 26, co2: false, bubbles: [], acc: 0, count: 0, hist: [], histT: 0, rate: 0, infoKey: '' };
    const phC = mk('c_photo', (w) => clamp(w * .62, 300, 500));
    const leafC = mk('c_leaf', (w) => clamp(w * .78, 210, 300));
    function phRate() { const L1 = ph.light / 100, tf = Math.max(0, 1 - Math.pow((ph.temp - 30) / 15, 2)), c = ph.co2 ? 1 : .55; return Math.min(L1 * 1.1, c) * tf * 40; }
    function drawPhoto(dt) {
      const { w, h, ctx } = phC; if (!w) return;
      ph.rate = phRate();
      ctx.fillStyle = mix('#0f172a', '#fefce8', .2 + ph.light / 125); ctx.fillRect(0, 0, w, h);
      const lx = w * .5, ly = h * .1, glow = ph.light / 100;
      if (glow > 0) { const g = ctx.createRadialGradient(lx, ly + 20, 4, lx, ly + 20, h * .9); g.addColorStop(0, `rgba(253,224,71,${.55 * glow})`); g.addColorStop(1, 'rgba(253,224,71,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(lx - 30, ly + 16); ctx.lineTo(lx + 30, ly + 16); ctx.lineTo(lx + w * .3, h * .9); ctx.lineTo(lx - w * .3, h * .9); ctx.fill(); }
      ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.moveTo(lx - 40, ly + 18); ctx.lineTo(lx + 40, ly + 18); ctx.lineTo(lx + 22, ly - 8); ctx.lineTo(lx - 22, ly - 8); ctx.fill(); ctx.fillRect(lx - 3, 0, 6, ly - 8);
      ctx.fillStyle = mix('#64748b', '#fef08a', glow); ctx.beginPath(); ctx.ellipse(lx, ly + 18, 22, 7, 0, 0, TAU); ctx.fill();
      // cốc nước
      const bx = w * .5, bw = Math.min(w * .32, h * .5), btop = h * .38, bbot = h * .92;
      ctx.fillStyle = 'rgba(125,211,252,.35)'; ctx.fillRect(bx - bw / 2, btop + 10, bw, bbot - btop - 10);
      ctx.strokeStyle = 'rgba(148,163,184,.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx - bw / 2, btop); ctx.lineTo(bx - bw / 2, bbot); ctx.lineTo(bx + bw / 2, bbot); ctx.lineTo(bx + bw / 2, btop); ctx.stroke();
      // phễu ngược + ống nghiệm thu khí
      ctx.strokeStyle = 'rgba(203,213,225,.95)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - bw * .35, bbot - 6); ctx.lineTo(bx - 10, btop + (bbot - btop) * .45); ctx.lineTo(bx - 10, btop - 4); ctx.moveTo(bx + bw * .35, bbot - 6); ctx.lineTo(bx + 10, btop + (bbot - btop) * .45); ctx.lineTo(bx + 10, btop - 4); ctx.stroke();
      const gas = Math.min(.9, ph.count / 300); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(bx - 9, btop - 4, 18, (btop + (bbot - btop) * .45 - btop) * gas);
      // cây rong
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = 3;
      for (const sx of [-.2, 0, .2]) { const x0 = bx + sx * bw * .7; ctx.beginPath(); ctx.moveTo(x0, bbot - 4); ctx.quadraticCurveTo(x0 + Math.sin(clock + sx) * 6, (bbot + btop) / 2 + 20, x0 * .2 + bx * .8, btop + (bbot - btop) * .5); ctx.stroke();
        for (let k = 0; k < 9; k++) { const t = k / 9, y = lerp(bbot - 8, btop + (bbot - btop) * .52, t), x = lerp(x0, x0 * .2 + bx * .8, t * t); ctx.fillStyle = '#22c55e'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + s * 7, y, 7, 2.5, s * .5, 0, TAU); ctx.fill(); } } }
      // bọt khí
      ph.acc += dt * ph.rate / 10;
      while (ph.acc > 1) { ph.acc -= 1; ph.bubbles.push({ x: bx + rand(-6, 6), y: btop + (bbot - btop) * .48, r: rand(2, 4.5), t: 0 }); ph.count++; }
      for (const b of ph.bubbles) { b.t += dt; b.y -= dt * (40 + b.r * 10); b.x += Math.sin(b.t * 8) * .3; ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.stroke(); }
      ph.bubbles = ph.bubbles.filter((b) => b.y > btop + 4);
      // đồng hồ đo + biểu đồ nhỏ
      ph.histT += dt; if (ph.histT > .5) { ph.histT = 0; ph.hist.push(ph.rate); if (ph.hist.length > 60) ph.hist.shift(); }
      const gx = w * .74, gw = w * .23, gy0 = h * .45, gh = h * .3;
      ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, gx, gy0 - 30, gw, gh + 46, 10); ctx.fill();
      textLight(ctx, T('Bọt khí / phút', 'Bubbles / min'), gx + gw / 2, gy0 - 16, '#334155', 11.5, 'center', 900);
      ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.beginPath(); ph.hist.forEach((v, i) => { const x = gx + 8 + i / 59 * (gw - 16), y = gy0 + gh - v / 45 * gh; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.stroke();
      textLight(ctx, String(Math.round(ph.rate * 6)), gx + gw / 2, gy0 + gh + 4, '#15803d', 18, 'center', 900);
      textLight(ctx, T(`Đã thu: ${ph.count} bọt`, `Collected: ${ph.count}`), w * .04, h * .06, '#0f172a', 12, 'left', 900);
      textLight(ctx, T('Khí ô-xi', 'Oxygen'), bx + 16, btop + 6, '#334155', 11, 'left', 900);
      phInfo();
    }
    function drawLeaf() {
      const { w, h, ctx } = leafC; if (!w) return;
      ctx.fillStyle = '#f0fdf4'; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h * .5, lw = w * .34, lh = h * .3;
      ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.moveTo(cx - lw, cy); ctx.quadraticCurveTo(cx, cy - lh * 1.6, cx + lw, cy); ctx.quadraticCurveTo(cx, cy + lh * 1.6, cx - lw, cy); ctx.fill();
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - lw, cy); ctx.lineTo(cx + lw, cy); for (let k = 1; k < 5; k++) { const x = cx - lw + k * lw * .4; ctx.moveTo(x, cy); ctx.lineTo(x + lw * .2, cy - lh * .5); ctx.moveTo(x, cy); ctx.lineTo(x + lw * .2, cy + lh * .5); } ctx.stroke();
      const t = clock % 3 / 3, on = ph.light > 5;
      const flow = (x0, y0, x1, y1, e, lab, col) => { const k = (t + (x0 * .001)) % 1, x = lerp(x0, x1, k), y = lerp(y0, y1, k); arrow(ctx, x0, y0, x1, y1, col, 2, 8); ctx.font = emojiFont(16); ctx.globalAlpha = on ? 1 : .3; ctx.fillText(e, x, y); ctx.globalAlpha = 1; textLight(ctx, lab, x0, y0 - 12, col, 11, 'center', 900); };
      flow(w * .14, h * .12, cx - lw * .4, cy - lh * .5, '☀️', T('Ánh sáng', 'Light'), '#ca8a04');
      flow(w * .86, h * .14, cx + lw * .4, cy - lh * .5, '💨', 'CO₂', '#475569');
      flow(w * .14, h * .9, cx - lw * .3, cy + lh * .4, '💧', T('Nước (từ rễ)', 'Water (roots)'), '#0284c7');
      flow(cx + lw * .4, cy + lh * .4, w * .86, h * .88, '🫧', T('Ô-xi', 'Oxygen'), '#16a34a');
      textLight(ctx, T('→ đường, tinh bột 🍬', '→ sugar, starch 🍬'), cx, cy + lh * .95, '#14532d', 12, 'center', 900);
      textLight(ctx, T('Diệp lục', 'Chlorophyll'), cx, cy - 6, '#f0fdf4', 11.5, 'center', 900);
    }
    function phInfo() {
      const r = Math.round(ph.rate * 6), key = [lang, Math.round(ph.light / 10), Math.round(ph.temp / 3), ph.co2].join('|'); if (key === ph.infoKey) return; ph.infoKey = key;
      const notes = [];
      if (ph.light < 5) notes.push(['tip', T('🌙 Không có ánh sáng thì cây không quang hợp, gần như không có bọt khí.', '🌙 No light, no photosynthesis: almost no bubbles.')]);
      if (ph.temp > 38 || ph.temp < 15) notes.push(['warn', T('🌡️ Nước quá nóng hoặc quá lạnh làm cây hoạt động chậm lại.', '🌡️ Too hot or too cold slows the plant down.')]);
      notes.push(['fun', T('✨ Gần như toàn bộ ô-xi chúng ta thở đều do cây xanh và tảo tạo ra. Một nửa trong số đó đến từ tảo nhỏ xíu ngoài biển!', '✨ Almost all the oxygen we breathe comes from plants and algae. About half comes from tiny ocean algae!')]);
      infoBox($('info_photo'), { emo: '🌿', title: T('Quang hợp', 'Photosynthesis'), sub: T(`Khoảng ${r} bọt khí mỗi phút`, `About ${r} bubbles a minute`), rows: [[T('Là gì?', 'What is it?'), T('Lá dùng ánh sáng Mặt Trời, nước và khí CO₂ để làm ra đường (thức ăn của cây) và thải ra khí ô-xi.', 'Leaves use sunlight, water and carbon dioxide to make sugar (plant food) and give off oxygen.')], [T('Thí nghiệm', 'Experiment'), T('Bọt khí nổi lên chính là ô-xi. Đèn càng sáng, có đủ CO₂ và nhiệt độ vừa phải thì càng nhiều bọt.', 'The bubbles are oxygen. Brighter light, enough CO₂ and a comfortable temperature mean more bubbles.')], [T('Màu xanh', 'Green colour'), T('Chất diệp lục làm lá có màu xanh và giúp lá hứng ánh sáng.', 'Chlorophyll makes leaves green and catches the light.')]], notes });
      setText('hud_photo', T(`🫧 ${r} bọt khí/phút – ánh sáng ${ph.light}%, ${ph.temp}°C`, `🫧 ${r} bubbles/min – light ${ph.light}%, ${ph.temp}°C`));
      setText('phLightTxt', `${ph.light}%`); setText('phTempTxt', `${ph.temp}°C`);
    }
    $('phLight').addEventListener('input', () => { ph.light = +$('phLight').value; });
    $('phTemp').addEventListener('input', () => { ph.temp = +$('phTemp').value; });
    $('phCo2').onclick = () => { ph.co2 = !ph.co2; $('phCo2').setAttribute('aria-pressed', String(ph.co2)); };
    $('phDark').onclick = () => { ph.light = ph.light > 0 ? 0 : 70; $('phLight').value = String(ph.light); };
    TABS.photo = { frame(dt) { drawPhoto(dt); drawLeaf(); }, refresh() { ph.infoKey = ''; } };
    QUIZZES.push(makeQuiz($('quiz_photo'), {
      vi: [
        { q: 'Cây cần những gì để quang hợp?', a: ['Ánh sáng, nước, khí CO₂', 'Đất và đá', 'Chỉ cần nước', 'Bóng tối'], why: 'Ba thứ này giúp lá làm ra đường.' },
        { q: 'Khi quang hợp, cây thải ra khí gì?', a: ['Ô-xi', 'CO₂', 'Khói', 'Hơi nước muối'], why: 'Những bọt khí trong thí nghiệm chính là ô-xi.' },
        { q: 'Chất gì làm lá cây có màu xanh?', a: ['Diệp lục', 'Muối', 'Đường', 'Sắt'], why: 'Diệp lục hứng ánh sáng để quang hợp.' },
        { q: 'Tắt đèn thì số bọt khí thế nào?', a: ['Gần như không còn', 'Nhiều hơn', 'Không đổi', 'Tăng gấp đôi'], why: 'Không có ánh sáng thì không quang hợp.' },
        { q: 'Cây làm ra thức ăn gì nhờ quang hợp?', a: ['Đường, tinh bột', 'Thịt', 'Sữa', 'Muối'], why: 'Đường được lưu thành tinh bột trong củ, hạt, quả.' },
        { q: 'Vì sao nên trồng nhiều cây xanh?', a: ['Cây tạo ô-xi và hút bớt CO₂', 'Cây làm nóng không khí', 'Cây tạo khói', 'Cây hút hết ô-xi'], why: 'Cây xanh giúp không khí trong lành.' }
      ],
      en: [
        { q: 'What do plants need for photosynthesis?', a: ['Light, water, carbon dioxide', 'Soil and rocks', 'Only water', 'Darkness'], why: 'These three let leaves make sugar.' },
        { q: 'Which gas do plants give off?', a: ['Oxygen', 'Carbon dioxide', 'Smoke', 'Salty steam'], why: 'The bubbles in the experiment are oxygen.' },
        { q: 'What makes leaves green?', a: ['Chlorophyll', 'Salt', 'Sugar', 'Iron'], why: 'Chlorophyll catches light for photosynthesis.' },
        { q: 'Lights off: the bubbles…', a: ['Almost stop', 'Increase', 'Stay the same', 'Double'], why: 'No light, no photosynthesis.' },
        { q: 'What food do plants make?', a: ['Sugar and starch', 'Meat', 'Milk', 'Salt'], why: 'Sugar is stored as starch in roots, seeds and fruit.' },
        { q: 'Why plant more trees?', a: ['They make oxygen and take in CO₂', 'They heat the air', 'They make smoke', 'They use up oxygen'], why: 'Trees keep the air fresh.' }
      ]
    }));

    /* =====================================================================
       2. HOA VÀ THỤ PHẤN: hoa bí đực, hoa bí cái
       ===================================================================== */
    let pl = { bee: { x: .5, y: .3, tx: .5, ty: .3, pollen: 0 }, fl: [], fruits: 0, infoKey: '', msg: null, msgT: 0 };
    function plReset() { pl.fl = [[.12, .62, 'm'], [.3, .78, 'f'], [.48, .6, 'm'], [.64, .8, 'f'], [.82, .62, 'm'], [.9, .84, 'f']].map(([x, y, k]) => ({ x, y, k, grow: 0, pol: false, sway: rand(0, 6) })); pl.bee.pollen = 0; pl.fruits = 0; }
    plReset();
    const plC = mk('c_pol', (w) => clamp(w * .6, 290, 480));
    const flC = mk('c_flower', (w) => clamp(w * .8, 220, 300));
    function drawPol(dt) {
      const { w, h, ctx } = plC; if (!w) return;
      const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#e0f2fe'); sky.addColorStop(1, '#bbf7d0'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#86efac'; ctx.fillRect(0, h * .55, w, h * .45);
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, h * .7); for (let x = 0; x <= w; x += 20) ctx.lineTo(x, h * .7 + Math.sin(x * .03) * 10); ctx.stroke();
      for (let k = 0; k < 8; k++) { const x = w * (k + .5) / 8, y = h * .7 + Math.sin(x * .03) * 10; ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.ellipse(x, y + 10, 22, 14, .3, 0, TAU); ctx.fill(); }
      const b = pl.bee; b.x += (b.tx - b.x) * Math.min(1, dt * 4); b.y += (b.ty - b.y) * Math.min(1, dt * 4);
      for (const f of pl.fl) {
        const x = f.x * w, y = f.y * h + Math.sin(clock + f.sway) * 2, s = Math.min(w, h) * .07;
        ctx.strokeStyle = '#15803d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + s * .6); ctx.lineTo(x, h * .72); ctx.stroke();
        if (f.k === 'f') { const g2 = f.grow; ctx.fillStyle = mix('#84cc16', '#f59e0b', g2); ctx.beginPath(); ctx.ellipse(x, y + s * .9, s * (.25 + g2 * .9), s * (.18 + g2 * .7), 0, 0, TAU); ctx.fill(); if (g2 > .1) { ctx.strokeStyle = 'rgba(120,53,15,.35)'; ctx.lineWidth = 1.5; for (const k of [-.4, 0, .4]) { ctx.beginPath(); ctx.ellipse(x + k * s * g2 * .6, y + s * .9, s * .1, s * (.18 + g2 * .7), 0, 0, TAU); ctx.stroke(); } } }
        const petal = f.k === 'f' && f.grow > .6 ? 1 - (f.grow - .6) / .4 : 1;
        if (petal > 0) { ctx.globalAlpha = petal; for (let i = 0; i < 5; i++) { const a = i / 5 * TAU - Math.PI / 2; ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * s * .5, y + Math.sin(a) * s * .5, s * .45, s * .3, a, 0, TAU); ctx.fill(); } ctx.fillStyle = f.k === 'm' ? '#f59e0b' : '#a3e635'; ctx.beginPath(); ctx.arc(x, y, s * .25, 0, TAU); ctx.fill(); if (f.pol && f.k === 'f') { ctx.fillStyle = '#f59e0b'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(x + Math.cos(i) * s * .14, y + Math.sin(i) * s * .14, 2, 0, TAU); ctx.fill(); } } ctx.globalAlpha = 1; }
        textLight(ctx, f.k === 'm' ? T('♂ hoa đực', '♂ male') : T('♀ hoa cái', '♀ female'), x, y - s * 1.1, f.k === 'm' ? '#1d4ed8' : '#be185d', 11, 'center', 900);
        if (f.pol && f.grow < 1) f.grow = Math.min(1, f.grow + dt * .25);
        // ong chạm hoa
        if (Math.hypot(b.x * w - x, b.y * h - y) < s * .6) {
          if (f.k === 'm' && b.pollen < 10) { b.pollen = 10; pl.msg = T('🌼 Ong dính đầy phấn hoa đực!', '🌼 The bee is covered in pollen!'); pl.msgT = 1.6; }
          else if (f.k === 'f' && !f.pol) { if (b.pollen > 0) { f.pol = true; b.pollen -= 4; pl.fruits++; pl.msg = T('✨ Đã thụ phấn! Bầu nhụy lớn dần thành quả bí.', '✨ Pollinated! The ovary swells into a squash.'); pl.msgT = 2; plInfo(true); } else { pl.msg = T('Ong chưa có phấn. Hãy bay tới hoa đực trước!', 'No pollen yet. Visit a male flower first!'); pl.msgT = 1.2; } }
        }
      }
      // ong
      const bx = b.x * w, by = b.y * h + Math.sin(clock * 9) * 3;
      ctx.fillStyle = 'rgba(255,255,255,.75)'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(bx + s * 6, by - 10, 8, 12 + Math.sin(clock * 40) * 3, s * .5, 0, TAU); ctx.fill(); }
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.ellipse(bx, by, 14, 10, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#1f2937'; for (const k of [-4, 3]) ctx.fillRect(bx + k, by - 9, 3.5, 18); ctx.beginPath(); ctx.arc(bx + 14, by - 2, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(bx + 16, by - 4, 2, 0, TAU); ctx.fill();
      for (let i = 0; i < b.pollen; i++) { ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(bx - 10 + (i * 7) % 20, by + 6 + (i % 3) * 2, 1.8, 0, TAU); ctx.fill(); }
      if (pl.msgT > 0) { pl.msgT -= dt; bubble(ctx, pl.msg, w / 2, h * .08, 12); }
      ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, 8, h - 34, 180, 26, 10); ctx.fill();
      textLight(ctx, T(`🎃 Quả bí: ${pl.fruits}/3`, `🎃 Squash: ${pl.fruits}/3`), 16, h - 21, '#9a3412', 12.5, 'left', 900);
      if (pl.fruits >= 3) bubble(ctx, T('🎉 Cả 3 hoa cái đều đậu quả! Em là chú ong chăm chỉ!', '🎉 All 3 female flowers set fruit! Busy bee!'), w / 2, h * .2, 13, '#fff', '#15803d');
    }
    const plMove = (e) => { const p = localPoint(plC.c, e); pl.bee.tx = clamp(p.x / plC.w, .03, .97); pl.bee.ty = clamp(p.y / plC.h, .05, .95); };
    plC.c.addEventListener('pointerdown', (e) => { plMove(e); try { plC.c.setPointerCapture(e.pointerId); } catch (_) {} });
    plC.c.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || e.buttons) plMove(e); });
    function drawFlower() {
      const { w, h, ctx } = flC; if (!w) return;
      ctx.fillStyle = '#fefce8'; ctx.fillRect(0, 0, w, h);
      const cx = w * .34, cy = h * .58, s = Math.min(w, h) * .28;
      ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.moveTo(cx - s, cy - s * .9); ctx.quadraticCurveTo(cx - s * .6, cy + s * .2, cx, cy + s * .25); ctx.quadraticCurveTo(cx + s * .6, cy + s * .2, cx + s, cy - s * .9); ctx.quadraticCurveTo(cx, cy - s * .2, cx - s, cy - s * .9); ctx.fill();
      ctx.fillStyle = '#84cc16'; ctx.beginPath(); ctx.ellipse(cx, cy + s * .45, s * .28, s * .22, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#f8fafc'; for (const k of [-.12, 0, .12]) { ctx.beginPath(); ctx.arc(cx + k * s, cy + s * .45, s * .05, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = '#65a30d'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx, cy + s * .25); ctx.lineTo(cx, cy - s * .35); ctx.stroke(); ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.arc(cx, cy - s * .38, s * .07, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2; for (const k of [-.25, .25]) { ctx.beginPath(); ctx.moveTo(cx + k * s * .4, cy + s * .2); ctx.lineTo(cx + k * s, cy - s * .25); ctx.stroke(); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.ellipse(cx + k * s, cy - s * .28, s * .07, s * .04, 0, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = '#15803d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy + s * .67); ctx.lineTo(cx, h); ctx.stroke();
      const lab = (t, x0, y0, x1, y1) => { ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); textLight(ctx, t, x1 + 4, y1, '#334155', 10.5, 'left', 900); };
      lab(T('Cánh hoa', 'Petal'), cx + s * .7, cy - s * .55, w * .66, h * .12);
      lab(T('Nhị (phấn hoa)', 'Stamen (pollen)'), cx + s * .25, cy - s * .28, w * .66, h * .3);
      lab(T('Nhụy', 'Pistil'), cx + s * .02, cy - s * .38, w * .66, h * .46);
      lab(T('Bầu nhụy → quả', 'Ovary → fruit'), cx + s * .28, cy + s * .45, w * .66, h * .66);
      lab(T('Noãn → hạt', 'Ovule → seed'), cx + s * .12, cy + s * .45, w * .66, h * .82);
    }
    function plInfo(force) {
      const key = lang + pl.fruits; if (key === pl.infoKey && !force) return; pl.infoKey = key;
      infoBox($('info_pol'), { emo: '🐝', title: T('Thụ phấn', 'Pollination'), sub: T(`Đã giúp ${pl.fruits}/3 hoa cái đậu quả`, `Helped ${pl.fruits}/3 female flowers set fruit`), rows: [[T('Là gì?', 'What is it?'), T('Phấn hoa từ nhị được đưa tới đầu nhụy. Sau đó bầu nhụy lớn lên thành quả, noãn thành hạt.', 'Pollen travels from the stamen to the pistil. Then the ovary grows into fruit and ovules become seeds.')], [T('Hoa bí', 'Squash flowers'), T('Cây bí có hoa đực và hoa cái riêng. Hoa cái có quả bí non nhỏ xíu ở dưới. Khi ít ong, bà con nông dân phải tự thụ phấn bằng tay.', 'Squash has separate male and female flowers; the female has a tiny squash below. When bees are scarce, farmers pollinate by hand.')], [T('Ai giúp?', 'Who helps?'), T('Ong, bướm, chim, gió. Lúa, ngô thụ phấn nhờ gió.', 'Bees, butterflies, birds and wind. Rice and maize rely on wind.')]], notes: [['tip', T('👆 Kéo ngón tay trên khung để ong bay: tới hoa đực lấy phấn, rồi tới hoa cái.', '👆 Drag to fly the bee: male flower for pollen first, then a female flower.')], ['fun', T('✨ Khoảng 3/4 các loại cây lương thực trên thế giới cần động vật thụ phấn. Không có ong, chúng ta sẽ thiếu rất nhiều trái cây!', '✨ About three-quarters of the world’s food crops need animal pollinators. Without bees, we’d lose lots of fruit!')]] });
      setText('hud_pol', T(`🐝 Ong đang mang ${pl.bee.pollen > 0 ? 'phấn hoa' : 'không có phấn'} – ${pl.fruits}/3 quả`, `🐝 Bee ${pl.bee.pollen > 0 ? 'has pollen' : 'has no pollen'} – ${pl.fruits}/3 fruit`));
    }
    $('plReset').onclick = () => { plReset(); plInfo(true); };
    TABS.pol = { frame(dt) { drawPol(dt); drawFlower(); plInfo(); }, refresh() { pl.infoKey = ''; plInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_pol'), {
      vi: [
        { q: 'Bộ phận nào của hoa tạo ra phấn hoa?', a: ['Nhị', 'Nhụy', 'Cánh hoa', 'Lá'], why: 'Nhị là bộ phận đực, chứa phấn hoa.' },
        { q: 'Sau khi thụ phấn, bầu nhụy biến thành gì?', a: ['Quả', 'Lá', 'Rễ', 'Cánh hoa'], why: 'Bầu nhụy lớn lên thành quả, noãn thành hạt.' },
        { q: 'Vì sao ong bay từ hoa này sang hoa khác?', a: ['Để hút mật, nhờ đó mang phấn đi', 'Để ngủ', 'Để trốn mưa', 'Để làm tổ'], why: 'Phấn dính vào lông ong và được đưa sang hoa khác.' },
        { q: 'Cây lúa, cây ngô thụ phấn nhờ đâu?', a: ['Gió', 'Ong', 'Cá', 'Mưa đá'], why: 'Hoa lúa, ngô nhỏ, nhiều phấn nhẹ, bay theo gió.' },
        { q: 'Cây bí có đặc điểm gì?', a: ['Có hoa đực và hoa cái riêng', 'Không có hoa', 'Chỉ có hoa đực', 'Hoa mọc dưới đất'], why: 'Hoa cái có quả bí non nhỏ ở dưới cánh hoa.' }
      ],
      en: [
        { q: 'Which part of a flower makes pollen?', a: ['Stamen', 'Pistil', 'Petal', 'Leaf'], why: 'The stamen is the male part.' },
        { q: 'After pollination the ovary becomes…', a: ['A fruit', 'A leaf', 'A root', 'A petal'], why: 'The ovary grows into fruit; ovules become seeds.' },
        { q: 'Why do bees visit flower after flower?', a: ['To drink nectar, carrying pollen along', 'To sleep', 'To hide from rain', 'To build nests'], why: 'Pollen sticks to their hairs and travels with them.' },
        { q: 'Rice and maize are pollinated by…', a: ['Wind', 'Bees', 'Fish', 'Hail'], why: 'Their light pollen blows on the wind.' },
        { q: 'What is special about squash plants?', a: ['Separate male and female flowers', 'No flowers', 'Only male flowers', 'Underground flowers'], why: 'Female flowers have a tiny squash under the petals.' }
      ]
    }));

    /* =====================================================================
       3. HẠT ĐI DU LỊCH
       ===================================================================== */
    let sd = { m: 'wind', wind: 50, parts: [], t: 0, run: false, sprouts: [], dog: null, infoKey: '' };
    const sdC = mk('c_seed', (w) => clamp(w * .55, 270, 440));
    function sdStart() {
      const { w, h } = sdC; sd.parts = []; sd.t = 0; sd.run = true; sd.dog = null;
      if (sd.m === 'wind') for (let i = 0; i < 26; i++) sd.parts.push({ x: w * .14 + rand(-8, 8), y: h * .42 + rand(-8, 8), vx: 0, vy: 0, k: 'fluff', land: false, d: rand(.2, 1.4) });
      if (sd.m === 'water') sd.parts.push({ x: w * .14, y: h * .5, k: 'coco', land: false });
      if (sd.m === 'animal') { sd.dog = { x: -40, stuck: 0 }; sd.parts.push({ x: w * .75, y: h * .25, k: 'bird', land: false, drop: false }); }
      if (sd.m === 'burst') for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + rand(-1.2, 1.2), v = rand(140, 260); sd.parts.push({ x: w * .5, y: h * .62, vx: Math.cos(a) * v, vy: Math.sin(a) * v, k: 'pea', land: false }); }
      sdInfo(true);
    }
    function drawSeed(dt) {
      const { w, h, ctx } = sdC; if (!w) return;
      const gy = h * .8;
      const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#bae6fd'); sky.addColorStop(1, '#f0f9ff'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      if (sd.m === 'water') { ctx.fillStyle = '#38bdf8'; ctx.fillRect(0, h * .55, w, h); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.ellipse(w * .05, h * .6, w * .14, h * .08, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(w * .95, h * .6, w * .14, h * .08, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; for (let k = 0; k < 6; k++) { const y = h * (.62 + k * .06); ctx.beginPath(); ctx.moveTo(((clock * 30 + k * 50) % w), y); ctx.lineTo(((clock * 30 + k * 50) % w) + 30, y); ctx.stroke(); } emo(ctx, '🌴', w * .06, h * .42, h * .2); emo(ctx, '🏝️', w * .94, h * .5, h * .14); }
      else { ctx.fillStyle = '#86efac'; ctx.fillRect(0, gy, w, h - gy); }
      // cây mẹ
      if (sd.m === 'wind') { ctx.strokeStyle = '#15803d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(w * .14, gy); ctx.lineTo(w * .14, h * .45); ctx.stroke(); if (!sd.run) { ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.beginPath(); ctx.arc(w * .14, h * .42, 16, 0, TAU); ctx.fill(); } for (let k = 0; k < 6; k++) { const x = (clock * (20 + sd.wind) + k * 90) % w; ctx.strokeStyle = 'rgba(148,163,184,.5)'; ctx.beginPath(); ctx.moveTo(x, h * (.15 + k * .1)); ctx.lineTo(x + 30, h * (.15 + k * .1)); ctx.stroke(); } }
      if (sd.m === 'animal') { emo(ctx, '🌳', w * .75, gy - h * .25, h * .45); ctx.fillStyle = '#65a30d'; for (let k = 0; k < 12; k++) { ctx.beginPath(); ctx.arc(w * (.15 + k * .03), gy - 6 - (k % 3) * 4, 5, 0, TAU); ctx.fill(); } textLight(ctx, T('bụi ké', 'burr plants'), w * .3, gy - 30, '#14532d', 11, 'center', 900); }
      if (sd.m === 'burst') { ctx.strokeStyle = '#15803d'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(w * .5, gy); ctx.lineTo(w * .5, h * .64); ctx.stroke(); if (!sd.run || sd.t < .1) { ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.ellipse(w * .5, h * .62, 10, 22, 0, 0, TAU); ctx.fill(); } else { ctx.strokeStyle = '#65a30d'; ctx.lineWidth = 4; for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * .5; ctx.beginPath(); ctx.moveTo(w * .5, h * .64); ctx.quadraticCurveTo(w * .5 + Math.cos(a) * 20, h * .64 + Math.sin(a) * 20, w * .5 + Math.cos(a + .8) * 16, h * .64 + Math.sin(a + .8) * 26); ctx.stroke(); } } textLight(ctx, T('Cây bóng nước', 'Balsam plant'), w * .5, h * .9, '#14532d', 11.5, 'center', 900); }
      if (sd.run) {
        sd.t += dt;
        for (const p of sd.parts) {
          if (p.land) continue;
          if (p.k === 'fluff') { p.vx += (sd.wind / 100 * 60 * p.d - p.vx) * dt; p.vy = Math.sin(clock * 3 + p.d * 9) * 12 + 18 * (1.1 - sd.wind / 100); p.x += p.vx * dt * 2.2; p.y += p.vy * dt; if (p.y > gy - 2 || p.x > w - 4) { p.land = true; p.y = Math.min(gy - 2, p.y); sd.sprouts.push({ x: Math.min(w - 6, p.x), t: 0 }); } ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1; for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * .35; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + Math.cos(a) * 9, p.y + Math.sin(a) * 9); ctx.stroke(); } ctx.fillStyle = '#78350f'; ctx.beginPath(); ctx.arc(p.x, p.y + 2, 1.6, 0, TAU); ctx.fill(); }
          if (p.k === 'coco') { const k = Math.min(1, sd.t / 9); p.x = lerp(w * .14, w * .88, k); p.y = h * .58 + Math.sin(clock * 2) * 4; emo(ctx, '🥥', p.x, p.y, h * .07); if (k >= 1) { p.land = true; sd.sprouts.push({ x: w * .9, t: 0, palm: true }); } }
          if (p.k === 'pea') { p.vy += 500 * dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.y > gy - 2) { p.land = true; p.y = gy - 2; sd.sprouts.push({ x: p.x, t: 0 }); } ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, TAU); ctx.fill(); }
          if (p.k === 'bird') { const k = Math.min(1, sd.t / 4); p.x = lerp(w * .75, w * .1, k); p.y = h * .2 + Math.sin(k * Math.PI) * -20; emo(ctx, '🐦', p.x, p.y, 22); if (k > .5 && !p.drop) { p.drop = true; sd.parts.push({ x: p.x, y: p.y + 10, k: 'pea', vx: -20, vy: 0, land: false }); } if (k >= 1) p.land = true; }
        }
        if (sd.dog) { const d = sd.dog; d.x += dt * w * .12; emo(ctx, '🐕', d.x, gy - 14, 30); if (d.x > w * .15 && d.x < w * .5) d.stuck = Math.min(8, d.stuck + dt * 6); for (let i = 0; i < Math.floor(d.stuck); i++) { ctx.fillStyle = '#4d7c0f'; ctx.beginPath(); ctx.arc(d.x - 10 + (i % 4) * 5, gy - 22 + Math.floor(i / 4) * 5, 2.4, 0, TAU); ctx.fill(); } if (d.x > w * .7 && d.stuck >= 1) { d.stuck -= dt * 4; if (Math.random() < dt * 4) sd.sprouts.push({ x: d.x, t: 0 }); } if (d.x > w + 40) sd.dog = null; }
      } else textLight(ctx, T('Bấm "Bắt đầu" để xem hạt đi du lịch', 'Press “Go” to watch the seeds travel'), w / 2, h * .1, '#334155', 13, 'center', 900);
      for (const s of sd.sprouts) { s.t = Math.min(1, s.t + dt * .5); const by = sd.m === 'water' ? h * .55 : gy; if (s.palm) { emo(ctx, '🌱', s.x, by - 10 - s.t * 10, 14 + s.t * 16); continue; } ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s.x, by); ctx.lineTo(s.x, by - s.t * 12); ctx.stroke(); ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.ellipse(s.x - 4, by - s.t * 12, 4 * s.t, 2 * s.t, -.5, 0, TAU); ctx.ellipse(s.x + 4, by - s.t * 12, 4 * s.t, 2 * s.t, .5, 0, TAU); ctx.fill(); }
      if (sd.m === 'wind' && sd.sprouts.length) { const far = Math.max(...sd.sprouts.map((s) => s.x)); textLight(ctx, T(`Hạt bay xa nhất: ${Math.round((far - w * .14) / w * 50)} m`, `Farthest seed: ${Math.round((far - w * .14) / w * 50)} m`), w - 10, 18, '#0f172a', 12, 'right', 900); }
    }
    const SDINFO = {
      wind: { vi: ['Nhờ gió', 'Hạt nhẹ, có lông tơ như bồ công anh, hoặc có cánh như quả cây sao, cây dầu, bay theo gió đi rất xa.', 'Gió càng mạnh, hạt bay càng xa.'], en: ['By wind', 'Light seeds with fluffy parachutes like dandelions, or wings like dipterocarp fruits, ride the wind far away.', 'Stronger wind, further flight.'] },
      water: { vi: ['Nhờ nước', 'Quả dừa có vỏ xơ chứa không khí nên nổi được, trôi trên biển hàng nghìn ki-lô-mét tới đảo khác rồi nảy mầm.', 'Cây đước, cây bần ở rừng ngập mặn cũng thả hạt trôi theo nước.'], en: ['By water', 'A coconut’s air-filled husk floats, drifting thousands of kilometres to another island before sprouting.', 'Mangrove trees also let their seeds drift on the water.'] },
      animal: { vi: ['Nhờ động vật', 'Quả ké, cỏ may có gai móc bám vào lông thú, quần áo. Chim ăn quả ổi, quả ớt rồi thải hạt ở nơi khác.', 'Em có bao giờ về nhà với đầy cỏ may trên ống quần chưa?'], en: ['By animals', 'Burrs and grass seeds hook onto fur and clothes. Birds eat guavas and chillies and drop the seeds elsewhere.', 'Ever come home with grass seeds stuck to your trousers?'] },
      burst: { vi: ['Tự bung', 'Quả bóng nước, quả đậu khi chín khô sẽ tách vỏ thật mạnh, bắn hạt văng ra xa.', 'Chạm nhẹ vào quả bóng nước chín, nó nổ "tách" ngay!'], en: ['Bursting pods', 'Ripe balsam pods and bean pods split open hard, flinging seeds away.', 'Touch a ripe balsam pod and it pops!'] }
    };
    function sdInfo(force) { const key = lang + sd.m; if (key === sd.infoKey && !force) return; sd.infoKey = key; const d = L(SDINFO[sd.m]); infoBox($('info_seed'), { emo: { wind: '🌬️', water: '🥥', animal: '🐕', burst: '💥' }[sd.m], title: d[0], rows: [[T('Như thế nào?', 'How?'), d[1]], [T('Vì sao hạt phải đi xa?', 'Why travel?'), T('Để cây con không phải tranh nhau ánh sáng, nước và chất dinh dưỡng với cây mẹ, và để loài cây mọc ở nhiều nơi mới.', 'So young plants don’t compete with the parent for light, water and food, and the species spreads to new places.')]], notes: [['fun', '✨ ' + d[2]]] }); setText('hud_seed', `${{ wind: '🌬️', water: '🥥', animal: '🐕', burst: '💥' }[sd.m]} ${d[0]}`); }
    root.querySelectorAll('[data-sm]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); sd.m = b.dataset.sm; sd.run = false; sd.parts = []; sd.sprouts = []; sd.dog = null; pressGroup('[data-sm]', 'sm', sd.m); $('sdWindRow').classList.toggle('hidden', sd.m !== 'wind'); sdInfo(true); }));
    $('sdWind').addEventListener('input', () => { sd.wind = +$('sdWind').value; });
    $('sdGo').onclick = () => { cancelSpeech(); sd.sprouts = []; sdStart(); };
    const GAME = [
      { e: '🌼', a: 'wind', vi: 'Bồ công anh', en: 'Dandelion' }, { e: '🍂', a: 'wind', vi: 'Quả cây sao (có cánh)', en: 'Winged dipterocarp fruit' }, { e: '🥥', a: 'water', vi: 'Quả dừa', en: 'Coconut' }, { e: '🌿', a: 'water', vi: 'Trụ mầm cây đước', en: 'Mangrove seedling' },
      { e: '🟢', a: 'animal', vi: 'Quả ké (có gai móc)', en: 'Burr (hooked)' }, { e: '🌾', a: 'animal', vi: 'Hạt cỏ may', en: 'Grass seeds that cling' }, { e: '🌶️', a: 'animal', vi: 'Quả ớt (chim ăn)', en: 'Chilli (birds eat it)' }, { e: '🫛', a: 'burst', vi: 'Quả đậu chín khô', en: 'Dry bean pod' }, { e: '🌸', a: 'burst', vi: 'Quả bóng nước', en: 'Balsam pod' }
    ];
    let sg = { i: 0, order: [], score: 0, total: 0, msg: null };
    sg.order = GAME.map((_, i) => i).sort(() => Math.random() - .5);
    function sgRender() {
      const done = sg.i >= sg.order.length, g = done ? null : GAME[sg.order[sg.i]];
      $('seedGame').innerHTML = done ? `<p class="fun" style="margin:0">${T(`🎉 Xong! Đúng ${sg.score}/${sg.total}.`, `🎉 Done! ${sg.score}/${sg.total} correct.`)}</p><button id="sgAgain" class="btn main" type="button">${T('Chơi lại', 'Play again')}</button>`
        : `<div style="display:flex;align-items:center;gap:10px"><span style="font-size:40px" aria-hidden="true">${g.e}</span><b style="color:#6d28d9;font-size:16px"></b></div>
          <div class="pick-grid">${['wind', 'water', 'animal', 'burst'].map((k) => `<button type="button" class="soft-btn" data-sa="${k}">${{ wind: '🌬️', water: '🌊', animal: '🐕', burst: '💥' }[k]} ${L(SDINFO[k])[0]}</button>`).join('')}</div>
          <p class="score" style="margin:0">${T(`Đúng ${sg.score}/${sg.total}`, `${sg.score}/${sg.total} correct`)}</p>${sg.msg ? `<p class="${sg.msg[0]}" style="margin:0"></p>` : ''}`;
      if (!done) { $('seedGame').querySelector('b').textContent = L(g); if (sg.msg) $('seedGame').querySelectorAll('p')[1].textContent = sg.msg[1]; }
      const ag = $('sgAgain'); if (ag) ag.onclick = () => { sg = { i: 0, order: GAME.map((_, i) => i).sort(() => Math.random() - .5), score: 0, total: 0, msg: null }; sgRender(); };
    }
    $('seedGame').addEventListener('click', (e) => { const b = e.target.closest('[data-sa]'); if (!b) return; const g = GAME[sg.order[sg.i]], ok = b.dataset.sa === g.a; sg.total++; if (ok) sg.score++; sg.msg = [ok ? 'fun' : 'warn', `${ok ? '🎉' : '🤔'} ${L(g)}: ${L(SDINFO[g.a])[0].toLowerCase()}.`]; sg.i++; sgRender(); });
    TABS.seed = { frame(dt) { drawSeed(dt); sdInfo(); }, refresh() { sd.infoKey = ''; sdInfo(true); sgRender(); } };
    QUIZZES.push(makeQuiz($('quiz_seed'), {
      vi: [
        { q: 'Hạt bồ công anh phát tán nhờ đâu?', a: ['Gió', 'Nước', 'Chim ăn', 'Tự nổ'], why: 'Hạt có túm lông nhẹ như chiếc dù.' },
        { q: 'Vì sao quả dừa có thể trôi qua biển?', a: ['Vỏ xơ chứa không khí nên nổi', 'Vì dừa biết bơi', 'Vì dừa rất nặng', 'Vì có cá đẩy'], why: 'Lớp xơ nhẹ giúp quả dừa nổi trên nước.' },
        { q: 'Cỏ may bám vào quần áo giúp gì cho cây?', a: ['Mang hạt đi xa', 'Làm quần đẹp', 'Giữ ấm', 'Không giúp gì'], why: 'Hạt được mang tới nơi khác rồi rơi xuống.' },
        { q: 'Vì sao hạt cần đi xa cây mẹ?', a: ['Để không tranh ánh sáng, nước với cây mẹ', 'Để đi chơi', 'Vì cây mẹ không thích', 'Không cần'], why: 'Cây con có chỗ mọc tốt hơn.' },
        { q: 'Quả bóng nước phát tán hạt bằng cách nào?', a: ['Tự bung, bắn hạt ra xa', 'Nhờ gió', 'Nhờ nước', 'Nhờ cá'], why: 'Vỏ quả chín tách ra rất mạnh.' }
      ],
      en: [
        { q: 'How do dandelion seeds travel?', a: ['Wind', 'Water', 'Birds', 'Bursting'], why: 'Each seed has a fluffy parachute.' },
        { q: 'Why can coconuts cross the sea?', a: ['Their air-filled husk floats', 'They swim', 'They are heavy', 'Fish push them'], why: 'The light husk keeps them afloat.' },
        { q: 'How do clinging grass seeds help the plant?', a: ['They get carried far', 'They decorate trousers', 'They keep you warm', 'They don’t'], why: 'The seeds drop off somewhere new.' },
        { q: 'Why should seeds move away from the parent?', a: ['To avoid competing for light and water', 'For fun', 'The parent dislikes them', 'No need'], why: 'Young plants get a better spot.' },
        { q: 'How does a balsam spread its seeds?', a: ['Its pod bursts and flings them', 'Wind', 'Water', 'Fish'], why: 'The ripe pod splits open forcefully.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'photo';
    root.querySelectorAll('.plant-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.plant-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('p-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.plant-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.plant-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.plant-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
