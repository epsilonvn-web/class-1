/* Epsilon Edu - Tool: An uong lanh manh (Healthy eating): dia an can bang, thap dinh duong, do uong va duong
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.nutrition = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "nutrition";
  let activeCleanup = null;

  const CSS = `
.food-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.food-tool *{box-sizing:border-box}.food-tool button,.food-tool input{font:inherit}.food-tool button{cursor:pointer}.food-tool .hidden{display:none!important}
.food-tool button:focus-visible,.food-tool canvas:focus-visible,.food-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.food-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.food-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.food-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.food-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.food-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.food-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.food-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.food-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.food-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.food-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.food-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.food-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.food-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.food-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.food-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.food-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.food-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.food-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.food-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.food-panel{width:100%}.food-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.food-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.food-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.food-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.food-tool .card-head.compact{margin-bottom:9px}
.food-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.food-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.food-tool .btn,.food-tool .soft-btn,.food-tool .segmented button,.food-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.food-tool .btn:hover,.food-tool .soft-btn:hover,.food-tool .segmented button:hover,.food-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.food-tool .btn{padding:0 12px}.food-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.food-tool .segmented{display:flex;gap:7px;margin:0}.food-tool .segmented button{padding:0 13px}
.food-tool .segmented button[aria-pressed="true"],.food-tool .soft-btn[aria-pressed="true"],.food-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.food-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.food-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.food-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.food-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.food-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.food-tool .range-control input{width:100%;accent-color:#8b5cf6}.food-tool .range-control b{color:#7c3aed;font-size:13px}
.food-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.food-tool .soft-btn{padding:0 12px}
.food-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.food-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.food-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.food-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.food-tool .info-title{display:flex;align-items:center;gap:10px}.food-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.food-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.food-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.food-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.food-tool .facts{display:grid;gap:6px;margin-top:10px}.food-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.food-tool .facts b{color:#7c3aed;font-size:13.5px}.food-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.food-tool .fun,.food-tool .warn,.food-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.food-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.food-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.food-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.food-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.food-tool .state-big.up{color:#0f766e}.food-tool .state-big.down{color:#b45309}
.food-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.food-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.food-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.food-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.food-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.food-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.food-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.food-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.food-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.food-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.food-tool .qopt:hover{filter:brightness(.985)}.food-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.food-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.food-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.food-tool .qfb,.food-tool .score{font-size:13px;font-weight:900}.food-tool .qfb.ok{color:#15803d}.food-tool .qfb.no{color:#be123c}.food-tool .score{color:#7c3aed}
.food-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.food-grid{grid-template-columns:1fr;align-items:start}.food-side{grid-template-rows:auto auto;height:auto}.food-tool .control-grid{grid-template-columns:1fr}.food-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.food-hero{flex-wrap:wrap;padding:12px}.food-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.food-tabs{grid-template-columns:1fr}.food-tabs .tab{min-height:40px}.food-card{padding:11px;border-radius:18px}.food-tool .card-head{align-items:flex-start;flex-direction:column}.food-tool .head-actions{width:100%;justify-content:space-between}.food-tool .head-actions .segmented{flex:1;min-width:0}.food-tool .head-actions .segmented button{flex:1;padding:0 8px}.food-tool .qopts{grid-template-columns:1fr}.food-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.food-tool *{transition:none!important}}

.food-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.food-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.food-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.food-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.food-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.food-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.food-tool .checklist{display:grid;gap:6px;margin-top:10px}
.food-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.food-tool .checklist .ok{color:#15803d}.food-tool .checklist .no{color:#be123c}.food-tool .checklist .wait{color:#94a3b8}
.food-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.food-tool .process span{flex:1}.food-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.food-tool .process .on{color:#0284c7}.food-tool .process i.on{color:#ec4899}
@media(max-width:640px){.food-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.food-tool .slider-pair{grid-template-columns:1fr}}

.food-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.food-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.food-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.food-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.food-tool .chip-grid{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.food-tool .food-btn{min-height:38px;padding:0 10px;border:1.5px solid #e2e8f0;border-radius:12px;background:#fff;color:#334155;font-weight:900;font-size:13.5px;transition:.15s}
.food-tool .food-btn:hover{transform:translateY(-1px);background:#faf5ff}
.food-tool .food-btn[aria-pressed="true"]{color:#fff;border-color:#8b5cf6!important;background:linear-gradient(90deg,#8b5cf6,#3b82f6)}
.food-tool .pulse-box{display:grid;gap:10px;margin-bottom:4px}
.food-tool .glass-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.food-tool .glass{height:56px;border:2px solid #7dd3fc;border-top:0;border-radius:4px 4px 14px 14px;background:#f0f9ff;font-size:22px;cursor:pointer}
.food-tool .glass.full{background:linear-gradient(180deg,#e0f2fe 20%,#7dd3fc)}
.food-tool .label-hint{margin:8px 2px 0;color:#64748b;font-size:13px;font-weight:800}

.food-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.food-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="food-tool" data-tool-root>
  <div class="food-hero">
    <div class="food-hero-icon" aria-hidden="true">🥗</div>
    <div>
      <p class="food-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="food-lead" data-t="lead"></p>
    </div>
    <div class="food-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="fAudioNotice" class="food-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="food-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="plate" data-t="tab_plate"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="grp" data-t="tab_grp"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="drink" data-t="tab_drink"></button>
  </div>
  <section id="f-plate" class="food-panel" role="tabpanel">
    <div class="food-grid">
      <article class="food-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_plate"></h2></div>
          <div class="head-actions"><button id="plClear" class="btn" type="button" data-t="clear"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_plate" role="img" data-ta="cv_plate"></canvas></div>
        <p id="hud_plate" class="hud" aria-live="polite"></p>
        <p class="label-hint" data-t="pickL"></p>
        <div id="plFoods" class="chip-grid"></div>
      </article>
      <div class="food-side">
        <aside class="food-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_plate"></span><h2 data-t="sh_plate"></h2></div></div>
          
          <div id="info_plate" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_plate" class="food-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="f-grp" class="food-panel hidden" role="tabpanel">
    <div class="food-grid">
      <article class="food-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_grp"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_grp" role="img" data-ta="cv_grp"></canvas></div>
        <p id="hud_grp" class="hud" aria-live="polite"></p>
      </article>
      <div class="food-side">
        <aside class="food-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_grp"></span><h2 data-t="sh_grp"></h2></div></div>
          <div id="grpGame" class="pulse-box"></div>
          <div id="info_grp" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_grp" class="food-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="f-drink" class="food-panel hidden" role="tabpanel">
    <div class="food-grid">
      <article class="food-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_drink"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_drink" role="img" data-ta="cv_drink"></canvas></div>
        <p id="hud_drink" class="hud" aria-live="polite"></p>
        <div id="dkDrinks" class="chip-grid" role="group" data-ta="drinkL"></div>
      </article>
      <div class="food-side">
        <aside class="food-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_drink"></span><h2 data-t="sh_drink"></h2></div></div>
          <div id="glasses" class="pulse-box"></div>
          <div id="info_drink" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_drink" class="food-card quiz-card"></article>
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
    const audioNotice = $('fAudioNotice');
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
      kicker: ['Epsilon Edu · Cơ thể và dinh dưỡng', 'Epsilon Edu · Body and nutrition'],
      title: ['Ăn uống lành mạnh', 'Healthy Eating'],
      lead: ['Tự bày một đĩa ăn cân bằng, tìm hiểu tháp dinh dưỡng và xem trong mỗi loại đồ uống có bao nhiêu viên đường.', 'Build a balanced plate, explore the food pyramid and see how many sugar cubes hide in each drink.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Thử ngay', 'Try it'],
      tab_plate: ['🍽️ Đĩa ăn cân bằng', '🍽️ Balanced plate'], h_plate: ['Bày một bữa ăn đủ chất', 'Make a well-balanced meal'],
      cv_plate: ['Đĩa ăn với các phần rau củ, tinh bột, chất đạm, trái cây và đồ uống', 'A plate with vegetables, starch, protein, fruit and a drink'],
      se_plate: ['Chấm điểm', 'Score'], sh_plate: ['Bữa ăn của em', 'Your meal'],
      tab_grp: ['🔺 Tháp dinh dưỡng', '🔺 Food pyramid'], h_grp: ['Ăn bao nhiêu là vừa?', 'How much of each?'],
      cv_grp: ['Tháp dinh dưỡng 5 tầng. Bấm vào từng tầng để tìm hiểu', 'A five-level food pyramid. Tap a level to learn more'],
      se_grp: ['Thử thách', 'Challenge'], sh_grp: ['Món này thuộc nhóm nào?', 'Which group is it?'],
      tab_drink: ['🥤 Đồ uống và đường', '🥤 Drinks and sugar'], h_drink: ['Trong cốc có bao nhiêu đường?', 'How much sugar is in the cup?'],
      cv_drink: ['Đồ uống và số viên đường có trong đó', 'A drink and the sugar cubes inside it'],
      se_drink: ['Uống đủ nước', 'Drink enough water'], sh_drink: ['Hôm nay em uống mấy cốc?', 'How many glasses today?'],
      pickL: ['Bấm món ăn để cho vào đĩa (bấm món trên đĩa để bỏ ra)', 'Tap a food to add it (tap it on the plate to remove)'], clear: ['🧽 Dọn đĩa', '🧽 Clear plate'],
      drinkL: ['Chọn đồ uống', 'Pick a drink']
    };

    /* =====================================================================
       1. ĐĨA ĂN CÂN BẰNG
       ===================================================================== */
    const FOODS = [
      { id: 'com', emo: '🍚', g: 'starch', vi: 'Cơm', en: 'Rice' }, { id: 'banhmi', emo: '🍞', g: 'starch', vi: 'Bánh mì', en: 'Bread' }, { id: 'bun', emo: '🍜', g: 'starch', vi: 'Bún, phở', en: 'Noodles' }, { id: 'khoai', emo: '🍠', g: 'starch', vi: 'Khoai lang', en: 'Sweet potato' }, { id: 'ngo', emo: '🌽', g: 'starch', vi: 'Ngô', en: 'Corn' },
      { id: 'thit', emo: '🍖', g: 'protein', vi: 'Thịt', en: 'Meat' }, { id: 'ca', emo: '🐟', g: 'protein', vi: 'Cá', en: 'Fish' }, { id: 'trung', emo: '🥚', g: 'protein', vi: 'Trứng', en: 'Egg' }, { id: 'tom', emo: '🦐', g: 'protein', vi: 'Tôm', en: 'Shrimp' }, { id: 'dauphu', emo: '🧊', g: 'protein', vi: 'Đậu phụ', en: 'Tofu' },
      { id: 'rau', emo: '🥬', g: 'veg', vi: 'Rau cải', en: 'Greens' }, { id: 'carot', emo: '🥕', g: 'veg', vi: 'Cà rốt', en: 'Carrot' }, { id: 'sulo', emo: '🥦', g: 'veg', vi: 'Súp lơ xanh', en: 'Broccoli' }, { id: 'dua', emo: '🥒', g: 'veg', vi: 'Dưa chuột', en: 'Cucumber' },
      { id: 'chuoi', emo: '🍌', g: 'fruit', vi: 'Chuối', en: 'Banana' }, { id: 'cam', emo: '🍊', g: 'fruit', vi: 'Cam', en: 'Orange' }, { id: 'duahau', emo: '🍉', g: 'fruit', vi: 'Dưa hấu', en: 'Watermelon' }, { id: 'xoai', emo: '🥭', g: 'fruit', vi: 'Xoài', en: 'Mango' },
      { id: 'nuoc', emo: '💧', g: 'drink', ok: true, vi: 'Nước lọc', en: 'Water' }, { id: 'sua', emo: '🥛', g: 'drink', ok: true, vi: 'Sữa', en: 'Milk' }, { id: 'ngot', emo: '🥤', g: 'drink', ok: false, vi: 'Nước ngọt', en: 'Soda' },
      { id: 'garan', emo: '🍗', g: 'treat', vi: 'Gà rán', en: 'Fried chicken' }, { id: 'chien', emo: '🍟', g: 'treat', vi: 'Khoai tây chiên', en: 'Fries' }, { id: 'keo', emo: '🍬', g: 'treat', vi: 'Kẹo', en: 'Sweets' }, { id: 'banh', emo: '🍰', g: 'treat', vi: 'Bánh ngọt', en: 'Cake' }
    ];
    FOODS.find((f) => f.id === 'dauphu').emo = '⬜';
    const GROUPS = {
      veg: { col: '#22c55e', vi: 'Rau củ', en: 'Vegetables', max: 3 }, starch: { col: '#f59e0b', vi: 'Tinh bột', en: 'Starch', max: 2 },
      protein: { col: '#ef4444', vi: 'Chất đạm', en: 'Protein', max: 2 }, fruit: { col: '#ec4899', vi: 'Trái cây', en: 'Fruit', max: 2 },
      drink: { col: '#38bdf8', vi: 'Đồ uống', en: 'Drink', max: 1 }, treat: { col: '#a855f7', vi: 'Món ăn vặt', en: 'Treats', max: 3 }
    };
    let plate = [], plInfoKey = '', plHits = [];
    const plC = mk('c_plate', (w) => clamp(w * .62, 300, 520));
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    function plScore() {
      const has = (g) => plate.filter((id) => FOODS.find((f) => f.id === id).g === g);
      const veg = has('veg').length, st = has('starch').length, pr = has('protein').length, fr = has('fruit').length, dr = has('drink'), tr = has('treat').length;
      const drinkOk = dr.length && FOODS.find((f) => f.id === dr[0]).ok;
      let stars = (st ? 1 : 0) + (pr ? 1 : 0) + (veg ? 1 : 0) + (fr ? 1 : 0) + (drinkOk ? 1 : 0);
      stars = Math.max(0, stars - Math.floor(tr / 2) - (tr === 1 ? 0 : 0) - (dr.length && !drinkOk ? 0 : 0));
      const miss = [];
      if (!veg) miss.push(T('rau củ', 'vegetables')); if (!st) miss.push(T('tinh bột', 'starch')); if (!pr) miss.push(T('chất đạm', 'protein')); if (!fr) miss.push(T('trái cây', 'fruit')); if (!drinkOk) miss.push(T('nước lọc hoặc sữa', 'water or milk'));
      return { stars, miss, veg, tr, soda: dr.length && !drinkOk, empty: !plate.length };
    }
    function drawPlate() {
      const { w, h, ctx } = plC;
      if (!w) return;
      ctx.fillStyle = '#fef3c7'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(217,119,6,.08)'; for (let x = 0; x < w; x += 24) ctx.fillRect(x, 0, 12, h);
      const cx = w * .4, cy = h * .52, R = Math.min(w * .32, h * .44);
      ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.beginPath(); ctx.arc(cx + 4, cy + 6, R * 1.06, 0, TAU); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy, R * 1.06, 0, TAU); ctx.fill();
      const sect = { veg: [Math.PI / 2, Math.PI * 1.5], starch: [-Math.PI / 2, 0], protein: [0, Math.PI / 2] };
      for (const [g, [a0, a1]] of Object.entries(sect)) { ctx.fillStyle = GROUPS[g].col + '22'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0, a1); ctx.closePath(); ctx.fill(); }
      ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.moveTo(cx, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
      const fs = w < 420 ? 10.5 : 12;
      textLight(ctx, `${L(GROUPS.veg)} (½)`, cx - R * .5, cy - R * .78, '#15803d', fs, 'center', 900);
      textLight(ctx, `${L(GROUPS.starch)} (¼)`, cx + R * .5, cy - R * .78, '#b45309', fs, 'center', 900);
      textLight(ctx, `${L(GROUPS.protein)} (¼)`, cx + R * .5, cy + R * .82, '#b91c1c', fs, 'center', 900);
      const bowl = { x: w * .84, y: h * .28, r: Math.min(w * .1, h * .15) }, cup = { x: w * .84, y: h * .7, r: Math.min(w * .08, h * .12) };
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(bowl.x, bowl.y, bowl.r, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fbcfe8'; ctx.lineWidth = 3; ctx.stroke();
      textLight(ctx, L(GROUPS.fruit), bowl.x, bowl.y + bowl.r + 12, '#be185d', fs, 'center', 900);
      ctx.fillStyle = 'rgba(186,230,253,.6)'; ctx.strokeStyle = '#7dd3fc'; ctx.beginPath(); ctx.moveTo(cup.x - cup.r * .7, cup.y - cup.r); ctx.lineTo(cup.x + cup.r * .7, cup.y - cup.r); ctx.lineTo(cup.x + cup.r * .55, cup.y + cup.r); ctx.lineTo(cup.x - cup.r * .55, cup.y + cup.r); ctx.closePath(); ctx.fill(); ctx.stroke();
      textLight(ctx, L(GROUPS.drink), cup.x, cup.y + cup.r + 12, '#0369a1', fs, 'center', 900);
      // vị trí các món
      const slots = {
        veg: [[-.55, -.2], [-.55, .25], [-.25, .5]], starch: [[.35, -.4], [.6, -.18]], protein: [[.35, .35], [.62, .2]],
        fruit: [[-.35, 0], [.35, 0]], drink: [[0, 0]], treat: [[-.6, .9], [-.2, .95], [.2, .95]]
      };
      const counters = {};
      plHits = [];
      const es = Math.round(Math.min(w, h) * .085);
      for (const id of plate) {
        const f = FOODS.find((x) => x.id === id), k = counters[f.g] = (counters[f.g] || 0) + 1, sl = slots[f.g][k - 1];
        let x, y;
        if (f.g === 'fruit') { x = bowl.x + sl[0] * bowl.r * 1.1; y = bowl.y + sl[1] * bowl.r; }
        else if (f.g === 'drink') { x = cup.x; y = cup.y; }
        else if (f.g === 'treat') { x = cx + sl[0] * R; y = Math.min(h - 18, cy + sl[1] * R * 1.08); }
        else { x = cx + sl[0] * R; y = cy + sl[1] * R; }
        ctx.font = emojiFont(f.g === 'drink' ? es * .8 : es); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(f.emo, x, y);
        plHits.push({ id, x, y, r: es * .6 });
      }
      if (!plate.length) textLight(ctx, T('Đĩa đang trống, bấm các món ở dưới nhé!', 'The plate is empty: tap foods below!'), cx, cy, '#94a3b8', 13, 'center', 900);
      const sc = plScore();
      for (let i = 0; i < 5; i++) { ctx.font = emojiFont(18); ctx.globalAlpha = i < sc.stars ? 1 : .2; ctx.fillText('⭐', 16 + i * 22, 18); }
      ctx.globalAlpha = 1;
    }
    plC.c.addEventListener('pointerdown', (e) => {
      const p = localPoint(plC.c, e), hit = plHits.find((q) => Math.hypot(q.x - p.x, q.y - p.y) < q.r);
      if (hit) { cancelSpeech(); plate.splice(plate.indexOf(hit.id), 1); plInfo(true); }
    });
    function addFood(id) {
      const f = FOODS.find((x) => x.id === id), n = plate.filter((x) => FOODS.find((y) => y.id === x).g === f.g).length;
      if (f.g === 'drink' && n) plate = plate.filter((x) => FOODS.find((y) => y.id === x).g !== 'drink');
      else if (n >= GROUPS[f.g].max) { const first = plate.find((x) => FOODS.find((y) => y.id === x).g === f.g); plate.splice(plate.indexOf(first), 1); }
      plate.push(id); plInfo(true);
    }
    function plInfo(force) {
      const sc = plScore(), key = lang + plate.join(',');
      if (key === plInfoKey && !force) return; plInfoKey = key;
      const notes = [];
      if (sc.empty) notes.push(['tip', T('💡 Một đĩa ăn cân bằng: một nửa là rau củ, một phần tư tinh bột, một phần tư chất đạm, thêm trái cây và nước lọc hoặc sữa.', '💡 A balanced plate: half vegetables, a quarter starch, a quarter protein, plus fruit and water or milk.')]);
      else if (sc.stars >= 5 && !sc.tr) notes.push(['fun', T('🎉 Tuyệt vời! Bữa ăn đủ chất và cân bằng.', '🎉 Brilliant! A complete, balanced meal.')]);
      if (sc.tr >= 2) notes.push(['warn', T('⚠️ Nhiều món chiên và đồ ngọt quá. Chỉ nên ăn thỉnh thoảng thôi.', '⚠️ Too many fried foods and sweets. Have them only now and then.')]);
      if (sc.soda) notes.push(['warn', T('⚠️ Nước ngọt có rất nhiều đường. Hãy chọn nước lọc hoặc sữa.', '⚠️ Soda is full of sugar. Choose water or milk instead.')]);
      if (sc.veg === 1) notes.push(['tip', T('🥬 Thêm một món rau nữa thì càng tốt.', '🥬 One more vegetable would be even better.')]);
      infoBox($('info_plate'), {
        emo: '🍽️', title: T(`Bữa ăn được ${sc.stars}/5 sao`, `Your meal: ${sc.stars}/5 stars`),
        sub: plate.length ? plate.map((id) => L(FOODS.find((f) => f.id === id))).join(', ') : T('Chưa có món nào', 'No food yet'),
        rows: [[T('Còn thiếu', 'Missing'), sc.miss.length ? sc.miss.join(', ') : T('Không thiếu gì!', 'Nothing!')], [T('Vì sao cần đủ?', 'Why all groups?'), T('Mỗi nhóm thức ăn giúp cơ thể một việc khác nhau, không món nào thay được tất cả.', 'Each food group does a different job; no single food can do them all.')]],
        notes
      });
      setText('hud_plate', `${'⭐'.repeat(sc.stars) || '☆'} ${T(`${sc.stars}/5 sao`, `${sc.stars}/5 stars`)}${sc.miss.length && !sc.empty ? T(` – còn thiếu: ${sc.miss.join(', ')}`, ` – missing: ${sc.miss.join(', ')}`) : ''}`);
    }
    function plButtons() {
      $('plFoods').innerHTML = FOODS.map((f) => `<button type="button" class="food-btn" data-food="${f.id}" style="border-color:${GROUPS[f.g].col}55"><span aria-hidden="true">${f.emo}</span> ${L(f)}</button>`).join('');
    }
    $('plFoods').addEventListener('click', (e) => { const b = e.target.closest('[data-food]'); if (!b) return; cancelSpeech(); addFood(b.dataset.food); });
    $('plClear').onclick = () => { cancelSpeech(); plate = []; plInfo(true); };
    TABS.plate = { frame() { drawPlate(); }, refresh() { plButtons(); plInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_plate'), {
      vi: [
        { q: 'Trong đĩa ăn cân bằng, rau củ nên chiếm bao nhiêu?', a: ['Khoảng một nửa đĩa', 'Một miếng nhỏ', 'Không cần rau', 'Cả đĩa'], why: 'Rau củ nên chiếm khoảng một nửa đĩa.' },
        { q: 'Món nào thuộc nhóm chất đạm?', a: ['Cá', 'Cơm', 'Cà rốt', 'Chuối'], why: 'Cá, thịt, trứng, tôm, đậu phụ giàu chất đạm.' },
        { q: 'Đồ uống nào tốt nhất trong bữa ăn?', a: ['Nước lọc', 'Nước ngọt có ga', 'Nước tăng lực', 'Trà sữa'], why: 'Nước lọc không có đường, tốt cho cơ thể.' },
        { q: 'Vì sao cần ăn đủ các nhóm thức ăn?', a: ['Mỗi nhóm giúp cơ thể một việc khác nhau', 'Cho đĩa đẹp', 'Để no lâu hơn thôi', 'Không cần thiết'], why: 'Không món nào cung cấp đủ mọi chất cơ thể cần.' },
        { q: 'Gà rán, khoai tây chiên nên ăn thế nào?', a: ['Thỉnh thoảng, ăn ít', 'Ăn mỗi ngày', 'Ăn thay cơm', 'Ăn càng nhiều càng tốt'], why: 'Đồ chiên nhiều dầu mỡ, ăn nhiều không tốt cho sức khỏe.' },
        { q: 'Cơm, bánh mì, bún thuộc nhóm nào?', a: ['Tinh bột (bột đường)', 'Chất đạm', 'Rau củ', 'Chất béo'], why: 'Nhóm tinh bột cho cơ thể năng lượng để học và chơi.' }
      ],
      en: [
        { q: 'On a balanced plate, how much should be vegetables?', a: ['About half', 'A tiny bite', 'None', 'All of it'], why: 'Vegetables should fill about half the plate.' },
        { q: 'Which food is rich in protein?', a: ['Fish', 'Rice', 'Carrot', 'Banana'], why: 'Fish, meat, eggs, shrimp and tofu are rich in protein.' },
        { q: 'What is the best drink with a meal?', a: ['Water', 'Fizzy soda', 'Energy drink', 'Bubble tea'], why: 'Water has no sugar and is good for you.' },
        { q: 'Why eat from every food group?', a: ['Each group does a different job', 'To make the plate pretty', 'Just to feel full', 'No reason'], why: 'No single food gives everything your body needs.' },
        { q: 'How often should you eat fried chicken and fries?', a: ['Only now and then', 'Every day', 'Instead of rice', 'As much as possible'], why: 'Fried foods are oily; too much isn’t healthy.' },
        { q: 'Rice, bread and noodles belong to…', a: ['Starch', 'Protein', 'Vegetables', 'Fats'], why: 'Starchy foods give you energy to learn and play.' }
      ]
    }));

    /* =====================================================================
       2. THÁP DINH DƯỠNG + trò chơi phân nhóm
       ===================================================================== */
    const LEVELS = [
      { col: '#fbbf24', emo: '🍚', vi: ['Ngũ cốc, khoai củ', 'Ăn đủ', 'Cơm, bánh mì, bún, khoai, ngô cho năng lượng để học và chơi.'], en: ['Grains and tubers', 'Eat enough', 'Rice, bread, noodles, potatoes and corn give energy to learn and play.'] },
      { col: '#4ade80', emo: '🥦', vi: ['Rau, trái cây', 'Ăn nhiều', 'Giàu vitamin, chất khoáng và chất xơ, giúp cơ thể khỏe mạnh, chống bệnh, tiêu hóa tốt.'], en: ['Vegetables and fruit', 'Eat plenty', 'Full of vitamins, minerals and fibre to keep you healthy and help digestion.'] },
      { col: '#f87171', emo: '🐟', vi: ['Thịt, cá, trứng, đậu, sữa', 'Ăn vừa phải', 'Giàu chất đạm, giúp cơ thể lớn lên, xương và răng chắc khỏe.'], en: ['Meat, fish, eggs, beans, milk', 'Eat a moderate amount', 'Rich in protein to help you grow; milk helps bones and teeth.'] },
      { col: '#fde68a', emo: '🫒', vi: ['Dầu, mỡ, lạc, vừng', 'Ăn ít', 'Chất béo cho năng lượng và giúp hấp thu một số vitamin, nhưng chỉ cần một ít.'], en: ['Oils, fats, nuts, seeds', 'Eat a little', 'Fats give energy and help absorb some vitamins, but you only need a little.'] },
      { col: '#e9d5ff', emo: '🧂', vi: ['Đường, muối', 'Hạn chế', 'Ăn nhiều đường dễ sâu răng, béo phì; ăn mặn nhiều không tốt cho tim và thận.'], en: ['Sugar and salt', 'Limit', 'Too much sugar harms teeth and weight; too much salt is bad for the heart and kidneys.'] }
    ];
    LEVELS[3].emo = '🥜';
    const SORT = [
      { emo: '🍚', g: 'carb', vi: 'Cơm', en: 'Rice' }, { emo: '🍞', g: 'carb', vi: 'Bánh mì', en: 'Bread' }, { emo: '🍠', g: 'carb', vi: 'Khoai lang', en: 'Sweet potato' },
      { emo: '🍖', g: 'prot', vi: 'Thịt', en: 'Meat' }, { emo: '🐟', g: 'prot', vi: 'Cá', en: 'Fish' }, { emo: '🥚', g: 'prot', vi: 'Trứng', en: 'Egg' }, { emo: '🦐', g: 'prot', vi: 'Tôm', en: 'Shrimp' },
      { emo: '🧈', g: 'fat', vi: 'Bơ', en: 'Butter' }, { emo: '🥜', g: 'fat', vi: 'Lạc (đậu phộng)', en: 'Peanuts' }, { emo: '🫗', g: 'fat', vi: 'Dầu ăn', en: 'Cooking oil' },
      { emo: '🥬', g: 'vit', vi: 'Rau cải', en: 'Greens' }, { emo: '🍊', g: 'vit', vi: 'Cam', en: 'Orange' }, { emo: '🥕', g: 'vit', vi: 'Cà rốt', en: 'Carrot' }, { emo: '🍅', g: 'vit', vi: 'Cà chua', en: 'Tomato' }
    ];
    SORT[9].emo = '🛢️';
    const SG = { carb: { vi: 'Bột đường', en: 'Carbohydrates' }, prot: { vi: 'Chất đạm', en: 'Protein' }, fat: { vi: 'Chất béo', en: 'Fats' }, vit: { vi: 'Vitamin, khoáng chất', en: 'Vitamins, minerals' } };
    let grp = { sel: 1, item: 0, score: 0, total: 0, msg: null, infoKey: '' };
    const grpC = mk('c_grp', (w) => clamp(w * .62, 300, 520));
    function pyrGeom() { const { w, h } = grpC, top = h * .06, bot = h * .94, cx = w * .42, half = Math.min(w * .36, h * .6); return { w, h, top, bot, cx, half }; }
    function drawGrp() {
      const { w, h, ctx } = grpC;
      if (!w) return;
      ctx.fillStyle = '#fffbeb'; ctx.fillRect(0, 0, w, h);
      const g = pyrGeom(), n = LEVELS.length, lh = (g.bot - g.top) / n;
      const xAt = (y) => g.half * (y - g.top) / (g.bot - g.top);
      for (let i = 0; i < n; i++) {
        const lvl = LEVELS[i], yb = g.bot - i * lh, yt = yb - lh, on = i === grp.sel;
        ctx.fillStyle = lvl.col; ctx.globalAlpha = on ? 1 : .75;
        ctx.beginPath(); ctx.moveTo(g.cx - xAt(yb), yb); ctx.lineTo(g.cx + xAt(yb), yb); ctx.lineTo(g.cx + xAt(yt), yt); ctx.lineTo(g.cx - xAt(yt), yt); ctx.closePath(); ctx.fill();
        ctx.globalAlpha = 1; ctx.strokeStyle = on ? '#be185d' : '#fff'; ctx.lineWidth = on ? 4 : 2; ctx.stroke();
        const ym = yb - lh / 2, fs = w < 420 ? 10 : 12;
        if (i < 4) { ctx.font = emojiFont(Math.min(22, lh * .45)); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(lvl.emo, g.cx, ym - (i < 3 ? lh * .14 : 0)); }
        if (i < 3) textLight(ctx, L({ vi: lvl.vi[0], en: lvl.en[0] }), g.cx, ym + lh * .22, '#1f2937', fs, 'center', 900);
        const lx = g.cx + xAt(yb) + 10;
        ctx.strokeStyle = '#d6d3d1'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.cx + xAt(ym) + 4, ym); ctx.lineTo(Math.max(lx, g.cx + g.half * .6 + 12), ym); ctx.stroke();
        textLight(ctx, L({ vi: lvl.vi[1], en: lvl.en[1] }), Math.max(lx, g.cx + g.half * .6 + 16), ym, on ? '#be185d' : '#57534e', fs + 1, 'left', 900);
      }
      textLight(ctx, T('👆 Bấm vào từng tầng', '👆 Tap a level'), 10, h - 10, '#a8a29e', 10.5, 'left', 800);
    }
    grpC.c.addEventListener('pointerdown', (e) => {
      const p = localPoint(grpC.c, e), g = pyrGeom(); if (p.y < g.top || p.y > g.bot) return;
      cancelSpeech(); grp.sel = clamp(Math.floor((g.bot - p.y) / ((g.bot - g.top) / LEVELS.length)), 0, LEVELS.length - 1); grpInfo(true);
    });
    function grpInfo(force) {
      const key = lang + grp.sel; if (key === grp.infoKey && !force) return; grp.infoKey = key;
      const lv = LEVELS[grp.sel], d = L({ vi: lv.vi, en: lv.en });
      infoBox($('info_grp'), { emo: lv.emo, title: d[0], sub: d[1], rows: [[T('Vì sao?', 'Why?'), d[2]]], notes: [['tip', T('💡 Tầng càng to ở dưới thì càng cần ăn nhiều; tầng nhỏ trên đỉnh thì chỉ nên ăn ít.', '💡 The wide bottom levels are what you need most; the small top is what to eat least.')]] });
      setText('hud_grp', `${lv.emo} ${d[0]} – ${d[1]}`);
    }
    function sortRender() {
      const f = SORT[grp.item];
      $('grpGame').innerHTML = `
        <div style="display:flex;align-items:center;gap:10px"><span style="font-size:40px;line-height:1" aria-hidden="true">${f.emo}</span><div><b style="font-size:17px;color:#6d28d9"></b><p class="muted" style="margin:2px 0 0">${T('Món này giàu chất gì nhất?', 'What is it richest in?')}</p></div></div>
        <div class="toggle-row" style="justify-content:flex-start">${Object.keys(SG).map((k) => `<button type="button" class="soft-btn" data-sg="${k}"></button>`).join('')}</div>
        <p class="score" style="margin:0">${T(`Đúng ${grp.score} / ${grp.total}`, `Correct ${grp.score} / ${grp.total}`)}</p>
        ${grp.msg ? `<p class="${grp.msg[0]}" style="margin:0"></p>` : ''}`;
      $('grpGame').querySelector('b').textContent = L(f);
      $('grpGame').querySelectorAll('[data-sg]').forEach((b) => { b.textContent = L(SG[b.dataset.sg]); });
      if (grp.msg) $('grpGame').querySelector('p:last-child').textContent = grp.msg[1];
    }
    $('grpGame').addEventListener('click', (e) => {
      const b = e.target.closest('[data-sg]'); if (!b) return; cancelSpeech();
      const f = SORT[grp.item], ok = b.dataset.sg === f.g; grp.total++; if (ok) grp.score++;
      grp.msg = ok ? ['fun', T(`🎉 Đúng! ${f.vi} giàu ${SG[f.g].vi.toLowerCase()}.`, `🎉 Yes! ${f.en} is rich in ${SG[f.g].en.toLowerCase()}.`)] : ['warn', T(`Chưa đúng. ${f.vi} giàu ${SG[f.g].vi.toLowerCase()}.`, `Not quite. ${f.en} is rich in ${SG[f.g].en.toLowerCase()}.`)];
      let n; do { n = Math.floor(rand(0, SORT.length)); } while (n === grp.item); grp.item = n; sortRender();
    });
    TABS.grp = { frame() { drawGrp(); }, refresh() { grp.infoKey = ''; grpInfo(); grp.msg = null; sortRender(); } };
    QUIZZES.push(makeQuiz($('quiz_grp'), {
      vi: [
        { q: 'Nhóm nào ở đáy tháp, cần ăn đủ mỗi ngày?', a: ['Ngũ cốc, khoai củ', 'Đường, muối', 'Dầu mỡ', 'Kẹo bánh'], why: 'Đáy tháp là nhóm cho năng lượng chính.' },
        { q: 'Nhóm nào ở đỉnh tháp, cần hạn chế?', a: ['Đường, muối', 'Rau xanh', 'Cơm', 'Cá'], why: 'Ăn nhiều đường, muối không tốt cho sức khỏe.' },
        { q: 'Chất đạm giúp cơ thể điều gì?', a: ['Lớn lên, xây dựng cơ thể', 'Làm răng sâu', 'Làm buồn ngủ', 'Không giúp gì'], why: 'Chất đạm giúp cơ thể lớn lên và phục hồi.' },
        { q: 'Rau và trái cây giàu chất gì?', a: ['Vitamin, chất khoáng, chất xơ', 'Đường cát', 'Muối', 'Dầu mỡ'], why: 'Giúp cơ thể khỏe mạnh, tiêu hóa tốt.' },
        { q: 'Ăn quá nhiều đồ ngọt có thể gây ra điều gì?', a: ['Sâu răng, thừa cân', 'Cao nhanh hơn', 'Mắt sáng hơn', 'Không sao cả'], why: 'Đường nuôi vi khuẩn gây sâu răng và làm thừa năng lượng.' },
        { q: 'Dầu ăn, bơ, lạc thuộc nhóm nào?', a: ['Chất béo', 'Chất đạm', 'Vitamin', 'Bột đường'], why: 'Chất béo cần cho cơ thể nhưng chỉ một lượng nhỏ.' }
      ],
      en: [
        { q: 'Which group sits at the bottom of the pyramid?', a: ['Grains and tubers', 'Sugar and salt', 'Oils and fats', 'Sweets and cakes'], why: 'The base is the main energy group.' },
        { q: 'Which group is at the top, to limit?', a: ['Sugar and salt', 'Green vegetables', 'Rice', 'Fish'], why: 'Too much sugar and salt isn’t healthy.' },
        { q: 'What does protein do?', a: ['Helps you grow and build your body', 'Rots your teeth', 'Makes you sleepy', 'Nothing'], why: 'Protein helps the body grow and repair.' },
        { q: 'Vegetables and fruit are rich in…', a: ['Vitamins, minerals, fibre', 'Table sugar', 'Salt', 'Oil'], why: 'They keep you healthy and help digestion.' },
        { q: 'Too many sweets can cause…', a: ['Tooth decay and weight gain', 'Faster growth', 'Better eyesight', 'Nothing'], why: 'Sugar feeds tooth-decay germs and adds extra energy.' },
        { q: 'Oil, butter and peanuts are…', a: ['Fats', 'Protein', 'Vitamins', 'Carbohydrates'], why: 'The body needs fats, but only a small amount.' }
      ]
    }));

    /* =====================================================================
       3. ĐỒ UỐNG VÀ ĐƯỜNG + đếm cốc nước
       ===================================================================== */
    const DRINKS = [
      { id: 'water', emo: '💧', ml: 250, cubes: 0, col: '#bae6fd', vi: 'Nước lọc', en: 'Water' },
      { id: 'milk', emo: '🥛', ml: 180, cubes: 2, natural: true, col: '#f8fafc', vi: 'Sữa tươi không đường', en: 'Plain milk' },
      { id: 'smilk', emo: '🧃', ml: 180, cubes: 3, col: '#fef3c7', vi: 'Sữa có đường', en: 'Sweetened milk' },
      { id: 'juice', emo: '🧃', ml: 250, cubes: 6, col: '#fdba74', vi: 'Nước cam đóng hộp', en: 'Boxed orange juice' },
      { id: 'soda', emo: '🥤', ml: 330, cubes: 9, col: '#7c2d12', vi: 'Nước ngọt có ga (1 lon)', en: 'Fizzy soda (1 can)' },
      { id: 'tea', emo: '🧋', ml: 500, cubes: 10, col: '#d6b48a', vi: 'Trà sữa (1 cốc lớn)', en: 'Bubble tea (large)' }
    ];
    let dk = { sel: 4, shown: 0, glasses: 0, infoKey: '' };
    const dkC = mk('c_drink', (w) => clamp(w * .56, 280, 470));
    function drawDrink(dt) {
      const { w, h, ctx } = dkC;
      if (!w) return;
      const d = DRINKS[dk.sel];
      dk.shown = Math.min(d.cubes, dk.shown + dt * 6);
      ctx.fillStyle = '#f0f9ff'; ctx.fillRect(0, 0, w, h);
      const gx = w * .22, gy = h * .82, gw = Math.min(w * .18, h * .3), gh = h * .62;
      ctx.fillStyle = d.col; ctx.globalAlpha = .9;
      ctx.beginPath(); ctx.moveTo(gx - gw * .48, gy - gh * .85); ctx.lineTo(gx + gw * .48, gy - gh * .85); ctx.lineTo(gx + gw * .4, gy); ctx.lineTo(gx - gw * .4, gy); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx - gw * .5, gy - gh); ctx.lineTo(gx - gw * .4, gy); ctx.lineTo(gx + gw * .4, gy); ctx.lineTo(gx + gw * .5, gy - gh); ctx.stroke();
      if (d.id === 'soda') { ctx.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.arc(gx - gw * .3 + (k * 23) % (gw * .6), gy - ((clock * 40 + k * 30) % (gh * .8)), 2.5, 0, TAU); ctx.fill(); } }
      if (d.id === 'tea') { ctx.fillStyle = '#292524'; for (let k = 0; k < 10; k++) { ctx.beginPath(); ctx.arc(gx - gw * .3 + (k % 5) * gw * .15, gy - 8 - Math.floor(k / 5) * 12, 5, 0, TAU); ctx.fill(); } }
      textLight(ctx, `${L(d)} – ${d.ml} ml`, gx, gy + 16, '#334155', w < 420 ? 10.5 : 12, 'center', 900);
      // viên đường
      const ax = w * .44, aw = w - ax - 16, cs = Math.min(aw / 6 - 6, h * .12), n = Math.floor(dk.shown);
      textLight(ctx, T('Số viên đường (mỗi viên khoảng 4 g):', 'Sugar cubes (about 4 g each):'), ax, h * .1, '#475569', w < 420 ? 10.5 : 12, 'left', 900);
      for (let i = 0; i < d.cubes; i++) {
        const col = i % 5, row = Math.floor(i / 5), x = ax + col * (cs + 6), y = h * .2 + row * (cs + 6);
        if (i < n) { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; rr(ctx, x, y, cs, cs, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#e2e8f0'; ctx.fillRect(x + cs * .15, y + cs * .15, cs * .25, cs * .25); }
      }
      if (!d.cubes) textLight(ctx, T('0 viên – không có đường! 👍', '0 cubes – no sugar! 👍'), ax, h * .3, '#15803d', 15, 'left', 900);
      // vạch giới hạn mỗi ngày
      const by = h * .78, bw = aw, lim = 6, frac = Math.min(1.6, d.cubes / lim);
      ctx.fillStyle = '#e5e7eb'; ctx.fillRect(ax, by, bw, 14);
      ctx.fillStyle = frac > 1 ? '#ef4444' : frac > .6 ? '#f59e0b' : '#22c55e'; ctx.fillRect(ax, by, bw * Math.min(1, frac / 1.6), 14);
      const lx = ax + bw / 1.6; ctx.strokeStyle = '#111827'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, by - 6); ctx.lineTo(lx, by + 20); ctx.stroke();
      textLight(ctx, T('mức nên có cả ngày (~6 viên)', 'daily limit (~6 cubes)'), lx, by + 30, '#111827', 10.5, 'center', 800);
      if (d.natural) textLight(ctx, T('(đường tự nhiên có sẵn trong sữa)', '(natural milk sugar)'), ax, h * .52, '#64748b', 11, 'left', 800);
    }
    function dkInfo(force) {
      const key = lang + dk.sel; if (key === dk.infoKey && !force) return; dk.infoKey = key;
      const d = DRINKS[dk.sel];
      const verdict = d.cubes === 0 ? ['fun', T('🎉 Nước lọc là đồ uống tốt nhất, không có đường.', '🎉 Water is the best drink: no sugar at all.')] : d.cubes >= 6 ? ['warn', T(`⚠️ Chỉ một ${d.id === 'soda' ? 'lon' : 'cốc'} này đã bằng hoặc vượt mức đường nên ăn cả ngày!`, '⚠️ This one drink already reaches or passes the whole day’s sugar limit!')] : ['tip', T('💡 Uống vừa phải, nên chọn loại ít đường.', '💡 Fine in moderation; pick low-sugar options.')];
      infoBox($('info_drink'), {
        emo: d.emo, title: L(d), sub: T(`Khoảng ${d.cubes} viên đường (≈ ${d.cubes * 4} g)`, `About ${d.cubes} sugar cubes (≈ ${d.cubes * 4} g)`),
        rows: [[T('Nên ăn bao nhiêu đường?', 'How much sugar?'), T('Các chuyên gia khuyên trẻ em ăn không quá khoảng 25 g đường thêm vào mỗi ngày, tức khoảng 6 viên.', 'Experts advise children to have no more than about 25 g of added sugar a day: about 6 cubes.')], [T('Đường nhiều thì sao?', 'Too much sugar?'), T('Dễ sâu răng, thừa cân và hay mệt mỏi.', 'It can cause tooth decay, weight gain and tiredness.')]],
        notes: [verdict, ['tip', T('📏 Số viên đường ở đây là ước tính trung bình, mỗi nhãn hàng có thể khác nhau. Xem bảng thành phần trên vỏ hộp nhé!', '📏 Cube counts are rough averages; brands differ. Check the label!')]]
      });
      setText('hud_drink', `${d.emo} ${L(d)}: ${T(`khoảng ${d.cubes} viên đường`, `about ${d.cubes} sugar cubes`)}`);
    }
    function dkButtons() { $('dkDrinks').innerHTML = DRINKS.map((d, i) => `<button type="button" class="food-btn" data-dk="${i}" aria-pressed="${i === dk.sel}">${d.emo} ${L(d)}</button>`).join(''); }
    $('dkDrinks').addEventListener('click', (e) => { const b = e.target.closest('[data-dk]'); if (!b) return; cancelSpeech(); dk.sel = +b.dataset.dk; dk.shown = 0; pressGroup('[data-dk]', 'dk', dk.sel); dkInfo(); });
    function glassRender() {
      const box = $('glasses');
      box.innerHTML = `<div class="glass-grid">${Array.from({ length: 8 }, (_, i) => `<button type="button" class="glass${i < dk.glasses ? ' full' : ''}" data-g="${i}" aria-label="${T('Cốc', 'Glass')} ${i + 1}">${i < dk.glasses ? '💧' : ''}</button>`).join('')}</div>
        <p class="score" style="margin:0">${T(`Đã uống ${dk.glasses} / 8 cốc`, `Drunk ${dk.glasses} / 8 glasses`)}</p>
        <p class="muted" style="margin:0">${dk.glasses >= 6 ? T('🎉 Giỏi lắm! Em đã uống đủ nước.', '🎉 Great! You have drunk enough water.') : T('Trẻ em cần khoảng 6 – 8 cốc nước mỗi ngày, nhiều hơn khi trời nóng hoặc chạy nhảy.', 'Children need about 6 – 8 glasses a day, more when it’s hot or after running around.')}</p>`;
    }
    $('glasses').addEventListener('click', (e) => { const b = e.target.closest('[data-g]'); if (!b) return; const i = +b.dataset.g; dk.glasses = i < dk.glasses ? i : i + 1; glassRender(); });
    TABS.drink = { frame(dt) { drawDrink(dt); dkInfo(); }, refresh() { dkButtons(); dkInfo(true); glassRender(); } };
    QUIZZES.push(makeQuiz($('quiz_drink'), {
      vi: [
        { q: 'Đồ uống nào tốt nhất cho cơ thể hằng ngày?', a: ['Nước lọc', 'Nước ngọt có ga', 'Trà sữa', 'Nước tăng lực'], why: 'Nước lọc không có đường và giúp cơ thể hoạt động tốt.' },
        { q: 'Một lon nước ngọt có khoảng bao nhiêu viên đường?', a: ['Khoảng 9 viên', 'Không viên nào', '1 viên', '50 viên'], why: 'Khoảng 35 g đường, tức gần 9 viên.' },
        { q: 'Trẻ em nên ăn không quá khoảng bao nhiêu đường thêm vào mỗi ngày?', a: ['Khoảng 6 viên (25 g)', '20 viên', '50 viên', 'Càng nhiều càng tốt'], why: 'Các chuyên gia khuyên khoảng 25 g mỗi ngày.' },
        { q: 'Mỗi ngày trẻ em nên uống khoảng bao nhiêu cốc nước?', a: ['6 – 8 cốc', '1 cốc', '20 cốc', 'Không cần uống'], why: 'Uống nhiều hơn khi trời nóng hoặc vận động.' },
        { q: 'Uống nhiều đồ ngọt dễ gây ra điều gì?', a: ['Sâu răng', 'Răng trắng hơn', 'Mắt tinh hơn', 'Không sao cả'], why: 'Vi khuẩn trong miệng dùng đường tạo ra chất làm hỏng răng.' },
        { q: 'Làm sao biết đồ uống có bao nhiêu đường?', a: ['Đọc bảng thành phần trên vỏ', 'Nhìn màu sắc', 'Ngửi mùi', 'Lắc mạnh'], why: 'Bảng thành phần ghi lượng đường trong sản phẩm.' }
      ],
      en: [
        { q: 'What is the best everyday drink?', a: ['Water', 'Fizzy soda', 'Bubble tea', 'Energy drink'], why: 'Water has no sugar and keeps your body working well.' },
        { q: 'About how many sugar cubes are in a can of soda?', a: ['About 9', 'None', '1', '50'], why: 'About 35 g of sugar: almost 9 cubes.' },
        { q: 'Children should have no more than about how much added sugar a day?', a: ['About 6 cubes (25 g)', '20 cubes', '50 cubes', 'As much as possible'], why: 'Experts suggest about 25 g a day.' },
        { q: 'About how many glasses of water should children drink a day?', a: ['6 – 8', '1', '20', 'None'], why: 'More when it’s hot or you’re active.' },
        { q: 'Lots of sugary drinks can cause…', a: ['Tooth decay', 'Whiter teeth', 'Sharper eyes', 'Nothing'], why: 'Mouth germs turn sugar into acid that harms teeth.' },
        { q: 'How can you tell how much sugar a drink has?', a: ['Read the nutrition label', 'Look at the colour', 'Smell it', 'Shake it'], why: 'The label lists the sugar content.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'plate';
    root.querySelectorAll('.food-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.food-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('f-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.food-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.food-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.food-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
