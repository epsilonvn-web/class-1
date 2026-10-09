/* Epsilon Edu - Tool: An toan o nha (Safe at home): tim moi nguy, so cuu, khi co chay va so khan cap
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.homeSafety = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "homeSafety";
  let activeCleanup = null;

  const CSS = `
.safe-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.safe-tool *{box-sizing:border-box}.safe-tool button,.safe-tool input{font:inherit}.safe-tool button{cursor:pointer}.safe-tool .hidden{display:none!important}
.safe-tool button:focus-visible,.safe-tool canvas:focus-visible,.safe-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.safe-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.safe-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.safe-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.safe-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.safe-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.safe-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.safe-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.safe-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.safe-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.safe-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.safe-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.safe-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.safe-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.safe-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.safe-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.safe-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.safe-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.safe-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.safe-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.safe-panel{width:100%}.safe-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.safe-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.safe-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.safe-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.safe-tool .card-head.compact{margin-bottom:9px}
.safe-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.safe-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.safe-tool .btn,.safe-tool .soft-btn,.safe-tool .segmented button,.safe-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.safe-tool .btn:hover,.safe-tool .soft-btn:hover,.safe-tool .segmented button:hover,.safe-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.safe-tool .btn{padding:0 12px}.safe-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.safe-tool .segmented{display:flex;gap:7px;margin:0}.safe-tool .segmented button{padding:0 13px}
.safe-tool .segmented button[aria-pressed="true"],.safe-tool .soft-btn[aria-pressed="true"],.safe-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.safe-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.safe-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.safe-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.safe-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.safe-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.safe-tool .range-control input{width:100%;accent-color:#8b5cf6}.safe-tool .range-control b{color:#7c3aed;font-size:13px}
.safe-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.safe-tool .soft-btn{padding:0 12px}
.safe-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.safe-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.safe-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.safe-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.safe-tool .info-title{display:flex;align-items:center;gap:10px}.safe-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.safe-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.safe-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.safe-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.safe-tool .facts{display:grid;gap:6px;margin-top:10px}.safe-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.safe-tool .facts b{color:#7c3aed;font-size:13.5px}.safe-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.safe-tool .fun,.safe-tool .warn,.safe-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.safe-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.safe-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.safe-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.safe-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.safe-tool .state-big.up{color:#0f766e}.safe-tool .state-big.down{color:#b45309}
.safe-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.safe-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.safe-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.safe-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.safe-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.safe-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.safe-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.safe-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.safe-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.safe-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.safe-tool .qopt:hover{filter:brightness(.985)}.safe-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.safe-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.safe-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.safe-tool .qfb,.safe-tool .score{font-size:13px;font-weight:900}.safe-tool .qfb.ok{color:#15803d}.safe-tool .qfb.no{color:#be123c}.safe-tool .score{color:#7c3aed}
.safe-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.safe-grid{grid-template-columns:1fr;align-items:start}.safe-side{grid-template-rows:auto auto;height:auto}.safe-tool .control-grid{grid-template-columns:1fr}.safe-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.safe-hero{flex-wrap:wrap;padding:12px}.safe-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.safe-tabs{grid-template-columns:1fr}.safe-tabs .tab{min-height:40px}.safe-card{padding:11px;border-radius:18px}.safe-tool .card-head{align-items:flex-start;flex-direction:column}.safe-tool .head-actions{width:100%;justify-content:space-between}.safe-tool .head-actions .segmented{flex:1;min-width:0}.safe-tool .head-actions .segmented button{flex:1;padding:0 8px}.safe-tool .qopts{grid-template-columns:1fr}.safe-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.safe-tool *{transition:none!important}}

.safe-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.safe-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.safe-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.safe-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.safe-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.safe-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.safe-tool .checklist{display:grid;gap:6px;margin-top:10px}
.safe-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.safe-tool .checklist .ok{color:#15803d}.safe-tool .checklist .no{color:#be123c}.safe-tool .checklist .wait{color:#94a3b8}
.safe-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.safe-tool .process span{flex:1}.safe-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.safe-tool .process .on{color:#0284c7}.safe-tool .process i.on{color:#ec4899}
@media(max-width:640px){.safe-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.safe-tool .slider-pair{grid-template-columns:1fr}}

.safe-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.safe-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.safe-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.safe-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.safe-tool .pulse-box{display:grid;gap:8px;margin-bottom:4px}
.safe-tool .dial-screen{min-height:46px;display:grid;place-items:center;border-radius:12px;background:#0f172a;color:#86efac;font:900 26px ui-monospace,monospace;letter-spacing:.2em}
.safe-tool .dial-pad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.safe-tool .dial-pad .btn{min-height:44px;font-size:18px}

.safe-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.safe-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="safe-tool" data-tool-root>
  <div class="safe-hero">
    <div class="safe-hero-icon" aria-hidden="true">🏠</div>
    <div>
      <p class="safe-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="safe-lead" data-t="lead"></p>
    </div>
    <div class="safe-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="aAudioNotice" class="safe-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="safe-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="hunt" data-t="tab_hunt"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="aid" data-t="tab_aid"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="fire" data-t="tab_fire"></button>
  </div>
  <section id="a-hunt" class="safe-panel" role="tabpanel">
    <div class="safe-grid">
      <article class="safe-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_hunt"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="roomL"><button type="button" data-room="kitchen" aria-pressed="true" data-t="rKitchen"></button><button type="button" data-room="living" aria-pressed="false" data-t="rLiving"></button><button type="button" data-room="bath" aria-pressed="false" data-t="rBath"></button></div><button id="huntHint" class="btn" type="button" data-t="hint"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_hunt" role="img" data-ta="cv_hunt"></canvas></div>
        <p id="hud_hunt" class="hud" aria-live="polite"></p>
      </article>
      <div class="safe-side">
        <aside class="safe-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_hunt"></span><h2 data-t="sh_hunt"></h2></div></div>
          
          <div id="info_hunt" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_hunt" class="safe-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="a-aid" class="safe-panel hidden" role="tabpanel">
    <div class="safe-grid">
      <article class="safe-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_aid"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="caseL"><button type="button" data-case="burn" aria-pressed="true" data-t="cBurn"></button><button type="button" data-case="nose" aria-pressed="false" data-t="cNose"></button><button type="button" data-case="cut" aria-pressed="false" data-t="cCut"></button></div><button id="aidNext" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_aid" role="img" data-ta="cv_aid"></canvas></div>
        <p id="hud_aid" class="hud" aria-live="polite"></p>
        <div id="aidSteps" class="stage-row" role="group" data-ta="stepsL"></div>
      </article>
      <div class="safe-side">
        <aside class="safe-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_aid"></span><h2 data-t="sh_aid"></h2></div></div>
          
          <div id="info_aid" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_aid" class="safe-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="a-fire" class="safe-panel hidden" role="tabpanel">
    <div class="safe-grid">
      <article class="safe-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_fire"></h2></div>
          <div class="head-actions"><button id="fireStand" class="soft-btn" type="button" aria-pressed="false" data-t="stand"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_fire" role="img" data-ta="cv_fire"></canvas></div>
        <p id="hud_fire" class="hud" aria-live="polite"></p>
        <div id="fireSteps" class="stage-row" role="group" data-ta="stepsL"></div>
      </article>
      <div class="safe-side">
        <aside class="safe-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_fire"></span><h2 data-t="sh_fire"></h2></div></div>
          <div id="dialBox" class="pulse-box"></div>
          <div id="info_fire" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_fire" class="safe-card quiz-card"></article>
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
    const audioNotice = $('aAudioNotice');
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
      title: ['An toàn ở nhà', 'Safe at Home'],
      lead: ['Làm thám tử tìm mối nguy trong nhà, học sơ cứu những chuyện thường gặp và tập thoát hiểm, gọi số khẩn cấp.', 'Be a detective and spot dangers at home, learn simple first aid, and practise escaping a fire and calling for help.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Thử ngay', 'Try it'],
      tab_hunt: ['🔍 Tìm mối nguy', '🔍 Spot the danger'], h_hunt: ['Thám tử an toàn', 'Safety detective'],
      cv_hunt: ['Căn phòng có những mối nguy hiểm. Bấm vào chỗ em thấy nguy hiểm', 'A room with hidden dangers. Tap where you see one'],
      se_hunt: ['Kết quả', 'Result'], sh_hunt: ['Em đã tìm thấy gì?', 'What did you find?'],
      tab_aid: ['🩹 Sơ cứu', '🩹 First aid'], h_aid: ['Xử lý đúng cách', 'Doing it right'],
      cv_aid: ['Các bước sơ cứu đơn giản', 'Simple first-aid steps'],
      se_aid: ['Ghi nhớ', 'Remember'], sh_aid: ['Bước này làm gì?', 'What to do now'],
      tab_fire: ['🔥 Khi có cháy', '🔥 If there is a fire'], h_fire: ['Thoát hiểm an toàn', 'Getting out safely'],
      cv_fire: ['Hành lang có khói, bé bò thấp để thoát ra ngoài', 'A smoky hallway; the child crawls low to get out'],
      se_fire: ['Tập gọi khẩn cấp', 'Practise an emergency call'], sh_fire: ['Gọi số nào?', 'Which number?'],
      roomL: ['Chọn phòng', 'Pick a room'], rKitchen: ['🍳 Nhà bếp', '🍳 Kitchen'], rLiving: ['🛋️ Phòng khách', '🛋️ Living room'], rBath: ['🛁 Nhà tắm', '🛁 Bathroom'],
      hint: ['💡 Gợi ý', '💡 Hint'], caseL: ['Chọn tình huống', 'Pick a situation'], cBurn: ['🔥 Bị bỏng nhẹ', '🔥 Small burn'], cNose: ['👃 Chảy máu cam', '👃 Nosebleed'], cCut: ['✋ Đứt tay nhẹ', '✋ Small cut'],
      stepsL: ['Các bước', 'Steps'], stand: ['🧍 Thử đứng thẳng', '🧍 Try standing up']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    const emo = (ctx, e, x, y, px) => { ctx.font = emojiFont(px); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e, x, y); };

    /* =====================================================================
       1. TÌM MỐI NGUY
       ===================================================================== */
    const ROOMS = {
      kitchen: [
        { x: .3, y: .38, r: .07, k: 'pot', vi: ['Tay cầm nồi chĩa ra ngoài', 'Em có thể va vào làm đổ nồi nóng, bị bỏng nặng.', 'Xoay tay cầm vào trong bếp. Không đứng sát bếp đang nấu.'], en: ['Pot handle sticking out', 'You could knock it and spill hot food on yourself.', 'Turn handles inward. Keep away from a hot stove.'] },
        { x: .55, y: .44, r: .06, k: 'knife', vi: ['Dao để ở mép bàn', 'Dao có thể rơi xuống chân hoặc bé nhỏ với tới.', 'Cất dao vào ngăn kéo hoặc giá để dao.'], en: ['Knife on the edge of the counter', 'It could fall on someone’s foot or be grabbed by a little child.', 'Put knives away in a drawer or knife block.'] },
        { x: .72, y: .72, r: .08, k: 'chem', vi: ['Chai nước tẩy để ở tủ thấp, không khóa', 'Em nhỏ có thể tưởng là nước uống, uống phải rất nguy hiểm.', 'Để hóa chất trên cao hoặc tủ có khóa. Không đựng hóa chất trong chai nước uống.'], en: ['Bleach in a low, open cupboard', 'A little child might think it’s a drink. Swallowing it is very dangerous.', 'Keep chemicals high up or locked away, never in drink bottles.'] },
        { x: .14, y: .62, r: .06, k: 'match', vi: ['Bật lửa để trên ghế thấp', 'Nghịch lửa có thể gây cháy nhà.', 'Không nghịch diêm, bật lửa. Thấy thì đưa cho người lớn cất đi.'], en: ['Lighter on a low stool', 'Playing with fire can burn down a house.', 'Never play with matches or lighters. Give them to an adult.'] }
      ],
      living: [
        { x: .12, y: .66, r: .06, k: 'socket', vi: ['Ổ điện thấp, cạnh có cái kéo', 'Chọc vật kim loại vào ổ điện có thể bị điện giật.', 'Không chạm, chọc vào ổ điện. Nhà có em nhỏ nên dùng nắp che ổ điện.'], en: ['Low socket with scissors nearby', 'Poking metal into a socket can give a deadly shock.', 'Never touch or poke sockets. Use socket covers with little children.'] },
        { x: .45, y: .86, r: .08, k: 'cord', vi: ['Dây điện vắt ngang lối đi', 'Dễ vấp ngã, kéo đổ đồ điện.', 'Đi dây sát tường, không chạy nhảy qua dây điện.'], en: ['Cable across the floor', 'Easy to trip over and pull things down.', 'Run cables along walls. Don’t run across them.'] },
        { x: .82, y: .45, r: .08, k: 'window', vi: ['Ghế kê sát cửa sổ không có song chắn', 'Trẻ trèo lên ghế có thể ngã qua cửa sổ.', 'Không trèo lên ghế cạnh cửa sổ, ban công. Cửa sổ nhà cao tầng cần có song chắn.'], en: ['Chair under a window with no bars', 'A child could climb up and fall out.', 'Never climb near windows or balconies. High windows need guards.'] },
        { x: .55, y: .6, r: .06, k: 'pills', vi: ['Lọ thuốc trên bàn thấp', 'Thuốc trông giống kẹo, uống nhầm rất nguy hiểm.', 'Chỉ uống thuốc khi người lớn đưa. Thuốc cất trên cao.'], en: ['Medicine on a low table', 'Pills can look like sweets; swallowing them is dangerous.', 'Only take medicine from an adult. Keep it up high.'] },
        { x: .3, y: .3, r: .07, k: 'candle', vi: ['Nến cháy sát rèm cửa', 'Lửa bén vào rèm có thể gây cháy lớn.', 'Để nến xa đồ dễ cháy, không để nến cháy khi không có người.'], en: ['Candle next to the curtain', 'The curtain could catch fire.', 'Keep candles away from things that burn; never leave them alone.'] }
      ],
      bath: [
        { x: .4, y: .86, r: .09, k: 'wet', vi: ['Sàn ướt, trơn', 'Dễ trượt ngã, đập đầu.', 'Lau khô sàn, dùng thảm chống trượt, không chạy trong nhà tắm.'], en: ['Wet, slippery floor', 'Easy to slip and hit your head.', 'Dry the floor, use a non-slip mat and don’t run.'] },
        { x: .68, y: .42, r: .07, k: 'dryer', vi: ['Máy sấy tóc cắm điện cạnh chậu nước', 'Đồ điện rơi vào nước có thể gây điện giật.', 'Không dùng đồ điện gần nước. Rút điện sau khi dùng.'], en: ['Hair dryer plugged in by the sink', 'Electricity and water together can cause a shock.', 'Keep electric things away from water; unplug after use.'] },
        { x: .18, y: .7, r: .08, k: 'bucket', vi: ['Xô nước đầy không đậy', 'Em bé có thể ngã chúi vào, đuối nước chỉ trong ít phút.', 'Đổ hết nước hoặc đậy kín xô, chậu sau khi dùng.'], en: ['Full bucket of water, uncovered', 'A toddler can topple in and drown within minutes.', 'Empty or cover buckets and tubs after use.'] },
        { x: .86, y: .74, r: .06, k: 'razor', vi: ['Dao cạo để ở chỗ thấp', 'Lưỡi dao rất sắc, dễ đứt tay.', 'Cất dao cạo trên cao, trong hộp.'], en: ['Razor left down low', 'The blade is very sharp.', 'Store razors up high in a box.'] }
      ]
    };
    let hunt = { room: 'kitchen', found: { kitchen: [], living: [], bath: [] }, last: null, hint: -1, hintT: 0, miss: null, infoKey: '' };
    const huntC = mk('c_hunt', (w) => clamp(w * .62, 300, 520));
    function drawRoom(ctx, w, h, room) {
      const floorY = h * .7;
      ctx.fillStyle = room === 'bath' ? '#e0f2fe' : room === 'kitchen' ? '#fef3c7' : '#ede9fe'; ctx.fillRect(0, 0, w, floorY);
      ctx.fillStyle = room === 'bath' ? '#bae6fd' : '#d6b48a'; ctx.fillRect(0, floorY, w, h - floorY);
      if (room === 'bath') { ctx.strokeStyle = 'rgba(255,255,255,.7)'; for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, floorY); ctx.stroke(); } for (let y = 0; y < floorY; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); } }
      const P = (x, y) => ({ x: x * w, y: y * h });
      if (room === 'kitchen') {
        ctx.fillStyle = '#e2e8f0'; ctx.fillRect(w * .62, h * .08, w * .28, h * .25); ctx.strokeStyle = '#94a3b8'; ctx.strokeRect(w * .62, h * .08, w * .28, h * .25);
        ctx.fillStyle = '#a16207'; ctx.fillRect(w * .05, h * .45, w * .85, h * .05);
        ctx.fillStyle = '#d6b48a'; ctx.fillRect(w * .05, h * .5, w * .85, h * .3);
        ctx.strokeStyle = '#92400e'; for (let k = 0; k < 4; k++) ctx.strokeRect(w * (.07 + k * .21), h * .53, w * .19, h * .24);
        ctx.fillStyle = '#334155'; ctx.fillRect(w * .2, h * .43, w * .18, h * .03);
        ctx.fillStyle = '#64748b'; rr(ctx, w * .22, h * .33, w * .12, h * .1, 6); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(w * .34, h * .36, w * .1, h * .02);
        ctx.strokeStyle = 'rgba(148,163,184,.8)'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(w * (.25 + i * .03), h * .32); ctx.quadraticCurveTo(w * (.24 + i * .03), h * .25, w * (.26 + i * .03), h * .2); ctx.stroke(); }
        ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.moveTo(w * .5, h * .445); ctx.lineTo(w * .6, h * .44); ctx.lineTo(w * .6, h * .452); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#111'; ctx.fillRect(w * .48, h * .44, w * .03, h * .014);
        ctx.fillStyle = '#fff'; rr(ctx, w * .66, h * .58, w * .2, h * .2, 4); ctx.fill(); ctx.fillStyle = '#facc15'; rr(ctx, w * .69, h * .65, w * .035, h * .1, 3); ctx.fill(); ctx.fillStyle = '#38bdf8'; rr(ctx, w * .74, h * .63, w * .035, h * .12, 3); ctx.fill();
        ctx.fillStyle = '#92400e'; ctx.fillRect(w * .08, h * .66, w * .12, h * .03); ctx.fillRect(w * .09, h * .69, w * .02, h * .12); ctx.fillRect(w * .17, h * .69, w * .02, h * .12);
        ctx.fillStyle = '#ef4444'; rr(ctx, w * .13, h * .63, w * .02, h * .03, 2); ctx.fill();
      } else if (room === 'living') {
        ctx.fillStyle = '#bae6fd'; ctx.fillRect(w * .72, h * .15, w * .2, h * .32); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.strokeRect(w * .72, h * .15, w * .2, h * .32);
        ctx.fillStyle = '#92400e'; ctx.fillRect(w * .76, h * .5, w * .1, h * .03); ctx.fillRect(w * .77, h * .53, w * .015, h * .17); ctx.fillRect(w * .845, h * .53, w * .015, h * .17); ctx.fillRect(w * .76, h * .38, w * .015, h * .12);
        ctx.fillStyle = '#f472b6'; ctx.fillRect(w * .32, h * .1, w * .08, h * .55); ctx.fillStyle = '#fbcfe8'; ctx.fillRect(w * .2, h * .1, w * .12, h * .55);
        ctx.fillStyle = '#fef3c7'; ctx.fillRect(w * .285, h * .32, w * .012, h * .06); ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.ellipse(w * .291, h * .3, 4, 8 + Math.sin(clock * 9) * 2, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = '#7c3aed'; rr(ctx, w * .4, h * .5, w * .28, h * .18, 12); ctx.fill(); ctx.fillStyle = '#8b5cf6'; rr(ctx, w * .4, h * .44, w * .28, h * .08, 10); ctx.fill();
        ctx.fillStyle = '#a16207'; ctx.fillRect(w * .48, h * .64, w * .14, h * .03);
        ctx.fillStyle = '#f97316'; rr(ctx, w * .54, h * .58, w * .025, h * .055, 3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(w * .54, h * .58, w * .025, h * .015);
        ctx.fillStyle = '#f8fafc'; rr(ctx, w * .1, h * .62, w * .04, h * .07, 4); ctx.fill(); ctx.fillStyle = '#334155'; ctx.fillRect(w * .113, h * .64, 3, 8); ctx.fillRect(w * .125, h * .64, 3, 8);
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(w * .15, h * .7); ctx.lineTo(w * .2, h * .66); ctx.moveTo(w * .15, h * .66); ctx.lineTo(w * .2, h * .7); ctx.stroke();
        ctx.strokeStyle = '#111827'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(w * .05, h * .8); ctx.bezierCurveTo(w * .3, h * .95, w * .6, h * .78, w * .95, h * .9); ctx.stroke();
      } else {
        ctx.fillStyle = '#fff'; rr(ctx, w * .55, h * .44, w * .25, h * .1, 10); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.fillRect(w * .66, h * .54, w * .03, h * .17);
        ctx.fillStyle = '#bae6fd'; ctx.fillRect(w * .58, h * .1, w * .18, h * .28); ctx.strokeStyle = '#cbd5e1'; ctx.strokeRect(w * .58, h * .1, w * .18, h * .28);
        ctx.fillStyle = '#ec4899'; rr(ctx, w * .62, h * .4, w * .07, h * .04, 6); ctx.fill(); ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(w * .69, h * .42); ctx.quadraticCurveTo(w * .8, h * .4, w * .82, h * .3); ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; rr(ctx, w * .05, h * .35, w * .3, h * .2, 18); ctx.fill();
        ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.moveTo(w * .13, h * .62); ctx.lineTo(w * .23, h * .62); ctx.lineTo(w * .22, h * .8); ctx.lineTo(w * .14, h * .8); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#bfdbfe'; ctx.fillRect(w * .135, h * .63, w * .09, h * .02);
        ctx.fillStyle = 'rgba(59,130,246,.35)'; ctx.beginPath(); ctx.ellipse(w * .42, h * .86, w * .14, h * .04, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = '#334155'; rr(ctx, w * .84, h * .73, w * .05, h * .02, 2); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.fillRect(w * .855, h * .72, w * .03, h * .01);
      }
      void P;
    }
    function drawHunt(dt) {
      const { w, h, ctx } = huntC;
      if (!w) return;
      drawRoom(ctx, w, h, hunt.room);
      const list = ROOMS[hunt.room], found = hunt.found[hunt.room];
      list.forEach((z, i) => {
        const x = z.x * w, y = z.y * h, r = z.r * Math.min(w, h) * 1.4;
        if (found.includes(i)) { ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); emo(ctx, '✅', x + r * .75, y - r * .75, 18); }
        else if (hunt.hint === i && hunt.hintT > 0) { ctx.strokeStyle = `rgba(236,72,153,${.4 + .4 * Math.sin(clock * 10)})`; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.arc(x, y, r * 1.6, 0, TAU); ctx.stroke(); ctx.setLineDash([]); }
      });
      if (hunt.hintT > 0) hunt.hintT -= dt;
      if (hunt.miss && hunt.miss.t > 0) { hunt.miss.t -= dt; emo(ctx, '❔', hunt.miss.x, hunt.miss.y, 20); }
      ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, 8, 8, 170, 28, 10); ctx.fill();
      textLight(ctx, T(`🔍 Đã tìm: ${found.length}/${list.length}`, `🔍 Found: ${found.length}/${list.length}`), 18, 22, '#6d28d9', 13, 'left', 900);
    }
    huntC.c.addEventListener('pointerdown', (e) => {
      const p = localPoint(huntC.c, e), { w, h } = huntC, list = ROOMS[hunt.room];
      const i = list.findIndex((z) => Math.hypot(z.x * w - p.x, z.y * h - p.y) < z.r * Math.min(w, h) * 1.6);
      cancelSpeech();
      if (i >= 0) { if (!hunt.found[hunt.room].includes(i)) hunt.found[hunt.room].push(i); hunt.last = i; hunt.hintT = 0; huntInfo(true); }
      else hunt.miss = { x: p.x, y: p.y, t: .8 };
    });
    function huntInfo(force) {
      const list = ROOMS[hunt.room], found = hunt.found[hunt.room], key = [lang, hunt.room, found.length, hunt.last].join('|');
      if (key === hunt.infoKey && !force) return; hunt.infoKey = key;
      const done = found.length === list.length;
      if (hunt.last == null || !found.includes(hunt.last)) {
        infoBox($('info_hunt'), { emo: '🔍', title: T('Hãy tìm các mối nguy!', 'Find the dangers!'), sub: T(`Phòng này có ${list.length} mối nguy`, `This room has ${list.length} dangers`), rows: [[T('Cách chơi', 'How to play'), T('Quan sát kỹ căn phòng rồi bấm vào chỗ em thấy có thể gây nguy hiểm. Cần trợ giúp thì bấm "Gợi ý".', 'Look carefully and tap anything that could be dangerous. Stuck? Press “Hint”.')]], notes: [] });
      } else {
        const z = L({ vi: list[hunt.last].vi, en: list[hunt.last].en });
        infoBox($('info_hunt'), { emo: done ? '🏆' : '⚠️', title: z[0], sub: T(`Đã tìm ${found.length}/${list.length}`, `Found ${found.length}/${list.length}`), rows: [[T('Vì sao nguy hiểm?', 'Why dangerous?'), z[1]], [T('Nên làm gì?', 'What to do?'), z[2]]], notes: done ? [['fun', T('🏆 Giỏi quá! Em đã tìm ra hết mối nguy trong phòng này. Thử phòng khác nhé!', '🏆 Well done! You found every danger here. Try another room!')]] : [] });
      }
      setText('hud_hunt', done ? T('🏆 Đã tìm đủ! Chọn phòng khác để chơi tiếp', '🏆 All found! Pick another room') : T(`🔍 Còn ${list.length - found.length} mối nguy chưa tìm thấy`, `🔍 ${list.length - found.length} dangers left to find`));
    }
    root.querySelectorAll('[data-room]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); hunt.room = b.dataset.room; hunt.last = null; hunt.hintT = 0; hunt.hint = -1; pressGroup('[data-room]', 'room', hunt.room); huntInfo(true); }));
    $('huntHint').onclick = () => { const list = ROOMS[hunt.room], left = list.map((_, i) => i).filter((i) => !hunt.found[hunt.room].includes(i)); if (left.length) { hunt.hint = left[0]; hunt.hintT = 3; } };
    TABS.hunt = { frame(dt) { drawHunt(dt); }, refresh() { hunt.infoKey = ''; huntInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_hunt'), {
      vi: [
        { q: 'Tay cầm nồi khi nấu nên để thế nào?', a: ['Xoay vào phía trong bếp', 'Chĩa ra ngoài mép bếp', 'Treo lên tường', 'Sao cũng được'], why: 'Tay cầm chĩa ra ngoài dễ bị va làm đổ nồi nóng.' },
        { q: 'Thấy lọ thuốc trông như kẹo, em làm gì?', a: ['Không ăn, đưa cho người lớn', 'Ăn thử một viên', 'Chia cho bạn', 'Giấu đi để ăn sau'], why: 'Chỉ uống thuốc khi người lớn đưa.' },
        { q: 'Vì sao không dùng máy sấy tóc cạnh chậu nước?', a: ['Điện gặp nước có thể gây điện giật', 'Vì máy sấy bị ướt tóc', 'Vì nước bị nóng', 'Không sao cả'], why: 'Đồ điện rơi vào nước rất nguy hiểm.' },
        { q: 'Xô, chậu đầy nước nguy hiểm với ai nhất?', a: ['Em bé nhỏ', 'Con mèo', 'Cái cây', 'Không ai cả'], why: 'Em bé có thể ngã chúi vào và đuối nước rất nhanh.' },
        { q: 'Thấy bật lửa để chỗ thấp, em làm gì?', a: ['Đưa cho người lớn cất', 'Bật thử xem', 'Mang đi chơi', 'Đốt giấy'], why: 'Nghịch lửa có thể gây cháy nhà.' },
        { q: 'Chất tẩy rửa nên cất ở đâu?', a: ['Trên cao hoặc tủ có khóa', 'Trong chai nước uống', 'Cạnh đồ ăn', 'Dưới gầm giường'], why: 'Để trẻ nhỏ không với tới và không uống nhầm.' }
      ],
      en: [
        { q: 'How should pot handles face while cooking?', a: ['Turned inward', 'Sticking out over the edge', 'Hung on the wall', 'Doesn’t matter'], why: 'Handles sticking out get knocked, spilling hot food.' },
        { q: 'You find pills that look like sweets. You…', a: ['Don’t eat them; give them to an adult', 'Taste one', 'Share them', 'Hide them for later'], why: 'Only take medicine an adult gives you.' },
        { q: 'Why not use a hair dryer by the sink?', a: ['Electricity and water can shock you', 'The dryer gets hair wet', 'The water heats up', 'It’s fine'], why: 'Electric things falling in water are very dangerous.' },
        { q: 'Who is most at risk from a full bucket of water?', a: ['A toddler', 'A cat', 'A plant', 'Nobody'], why: 'A toddler can topple in and drown quickly.' },
        { q: 'You see a lighter left down low. You…', a: ['Give it to an adult', 'Try it', 'Play with it', 'Burn paper'], why: 'Playing with fire can burn a house down.' },
        { q: 'Where should cleaning chemicals go?', a: ['Up high or locked away', 'In drink bottles', 'Next to food', 'Under the bed'], why: 'So little children can’t reach or drink them.' }
      ]
    }));

    /* =====================================================================
       2. SƠ CỨU ĐƠN GIẢN
       ===================================================================== */
    const CASES = {
      burn: { emo: '🔥', steps: [
        { e: ['🔥', '➡️', '🧑'], vi: ['Tránh xa chỗ nóng, gọi người lớn', 'Ra khỏi chỗ nóng ngay và gọi bố mẹ, thầy cô.'], en: ['Move away and call an adult', 'Get away from the heat and call a parent or teacher.'] },
        { e: ['🚰', '✋'], timer: 20, vi: ['Xả nước mát khoảng 20 phút', 'Để chỗ bỏng dưới vòi nước mát (không dùng đá lạnh) khoảng 20 phút.'], en: ['Cool water for about 20 minutes', 'Hold the burn under cool (not icy) running water for about 20 minutes.'] },
        { e: ['🧴', '🦷', '🐟'], no: true, vi: ['Không bôi kem đánh răng, mỡ, nước mắm', 'Những thứ này không chữa bỏng mà còn làm vết bỏng bẩn, dễ nhiễm trùng.'], en: ['No toothpaste, grease or fish sauce', 'These don’t help a burn and can make it dirty and infected.'] },
        { e: ['🩹', '🏥'], vi: ['Che bằng gạc sạch, bỏng nặng thì đi viện', 'Che nhẹ bằng gạc sạch. Bỏng rộng, phồng rộp lớn hay ở mặt thì người lớn đưa đi khám ngay.'], en: ['Cover with a clean dressing; see a doctor if serious', 'Cover loosely with clean gauze. Big, blistered or face burns need a doctor right away.'] }
      ] },
      nose: { emo: '👃', steps: [
        { e: ['🪑', '🙇'], vi: ['Ngồi xuống, cúi đầu hơi về trước', 'Ngồi yên, cúi đầu hơi về phía trước để máu không chảy xuống họng.'], en: ['Sit down and lean forward', 'Sit still and lean slightly forward so blood doesn’t run down your throat.'] },
        { e: ['🤏', '👃'], timer: 10, vi: ['Bóp chặt phần mềm của mũi khoảng 10 phút', 'Dùng hai ngón tay bóp chặt phần mềm dưới sống mũi, thở bằng miệng khoảng 10 phút.'], en: ['Pinch the soft part of your nose for about 10 minutes', 'Pinch the soft part below the bony bridge and breathe through your mouth for about 10 minutes.'] },
        { e: ['🛌', '🙆'], no: true, vi: ['Không nằm ngửa, không ngửa cổ ra sau', 'Ngửa ra sau làm máu chảy xuống họng, dễ bị sặc, buồn nôn.'], en: ['Don’t lie down or tip your head back', 'Tipping back sends blood down your throat and can make you choke or feel sick.'] },
        { e: ['⏱️', '🏥'], vi: ['Chảy lâu quá 20 phút thì đi khám', 'Báo người lớn. Nếu máu chảy lâu, chảy nhiều hoặc sau khi bị đập mạnh vào mặt thì cần đi khám.'], en: ['Over 20 minutes? See a doctor', 'Tell an adult. If it lasts long, is heavy or follows a hard hit to the face, see a doctor.'] }
      ] },
      cut: { emo: '✋', steps: [
        { e: ['🧼', '👐'], vi: ['Rửa tay sạch', 'Người giúp sơ cứu rửa tay bằng xà phòng trước.'], en: ['Wash hands', 'Whoever helps should wash their hands with soap first.'] },
        { e: ['🚰', '☝️'], vi: ['Rửa vết đứt dưới vòi nước sạch', 'Rửa nhẹ vết thương dưới vòi nước sạch cho trôi bụi bẩn.'], en: ['Rinse the cut under clean water', 'Gently rinse the cut under clean running water to wash away dirt.'] },
        { e: ['🧻', '✋'], vi: ['Ấn nhẹ bằng gạc sạch cho cầm máu', 'Ấn nhẹ một miếng gạc hoặc khăn sạch lên vết đứt cho đến khi máu ngừng chảy.'], en: ['Press with clean gauze to stop bleeding', 'Press a clean gauze or cloth on the cut until it stops bleeding.'] },
        { e: ['🩹', '🏥'], vi: ['Dán băng cá nhân; vết sâu thì đi khám', 'Dán băng cá nhân sạch. Vết đứt sâu, rộng, chảy máu nhiều thì người lớn đưa đi khám.'], en: ['Put on a plaster; deep cuts need a doctor', 'Cover with a clean plaster. Deep, wide or heavily bleeding cuts need a doctor.'] }
      ] }
    };
    let aid = { c: 'burn', s: 0, t: 0, infoKey: '' };
    const aidC = mk('c_aid', (w) => clamp(w * .52, 260, 430));
    function drawAid(dt) {
      const { w, h, ctx } = aidC;
      if (!w) return;
      aid.t += dt;
      const C = CASES[aid.c], st = C.steps[aid.s];
      ctx.fillStyle = st.no ? '#fff1f2' : '#f0fdf4'; ctx.fillRect(0, 0, w, h);
      C.steps.forEach((_, i) => { const x = w * (.2 + i * .2); ctx.fillStyle = i === aid.s ? '#ec4899' : i < aid.s ? '#a78bfa' : '#e5e7eb'; ctx.beginPath(); ctx.arc(x, 20, 11, 0, TAU); ctx.fill(); textLight(ctx, String(i + 1), x, 20.5, i <= aid.s ? '#fff' : '#64748b', 12, 'center', 900); if (i < 3) { ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 14, 20); ctx.lineTo(x + w * .2 - 14, 20); ctx.stroke(); } });
      const n = st.e.length, px = Math.min(h * .26, w / (n + 1) * .8), cy = h * .45;
      st.e.forEach((e, i) => { const x = w / 2 + (i - (n - 1) / 2) * px * 1.25, bob = reduceMotion ? 0 : Math.sin(aid.t * 3 + i) * 4; emo(ctx, e, x, cy + bob, px); });
      if (st.no) { ctx.strokeStyle = 'rgba(225,29,72,.85)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(w / 2, cy, Math.min(h * .3, w * .3), 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(w / 2 - Math.min(h * .21, w * .21), cy + Math.min(h * .21, w * .21)); ctx.lineTo(w / 2 + Math.min(h * .21, w * .21), cy - Math.min(h * .21, w * .21)); ctx.stroke(); }
      if (st.timer) {
        const frac = (aid.t / 8) % 1, cx = w - 52, ty = h * .45, r = 32;
        ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(cx, ty, r, 0, TAU); ctx.stroke();
        ctx.strokeStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(cx, ty, r, -Math.PI / 2, -Math.PI / 2 + frac * TAU); ctx.stroke();
        textLight(ctx, `${Math.floor(frac * st.timer)}'`, cx, ty, '#0369a1', 15, 'center', 900);
        textLight(ctx, T(`${st.timer} phút`, `${st.timer} min`), cx, ty + r + 14, '#0369a1', 11, 'center', 900);
      }
      ctx.font = `900 ${w < 420 ? 14 : 17}px system-ui, sans-serif`;
      textLight(ctx, `${aid.s + 1}. ${L({ vi: st.vi, en: st.en })[0]}`, w / 2, h * .82, st.no ? '#be123c' : '#15803d', w < 420 ? 13 : 16, 'center', 900);
    }
    function aidInfo(force) {
      const key = [lang, aid.c, aid.s].join('|'); if (key === aid.infoKey && !force) return; aid.infoKey = key;
      const C = CASES[aid.c], st = C.steps[aid.s], d = L({ vi: st.vi, en: st.en });
      root.querySelectorAll('#aidSteps button').forEach((b, i) => { b.setAttribute('aria-pressed', String(i === aid.s)); b.querySelector('span').textContent = L({ vi: C.steps[i].vi, en: C.steps[i].en })[0]; });
      infoBox($('info_aid'), { emo: C.emo, title: d[0], sub: T(`Bước ${aid.s + 1}/4`, `Step ${aid.s + 1}/4`), rows: [[T('Làm thế nào?', 'How?'), d[1]]], notes: [['tip', T('🧑‍🏫 Luôn báo cho bố mẹ, thầy cô biết khi em hoặc bạn bị thương. Gặp chuyện nặng hãy gọi 115.', '🧑‍🏫 Always tell a parent or teacher when you or a friend gets hurt. For serious injuries, call 115.')]] });
      setText('hud_aid', `${C.emo} ${T('Bước', 'Step')} ${aid.s + 1}: ${d[0]}`);
    }
    $('aidSteps').innerHTML = [0, 1, 2, 3].map((i) => `<button type="button" data-s="${i}" aria-pressed="false"><b>${i + 1}</b><span></span></button>`).join('');
    $('aidSteps').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (!b) return; cancelSpeech(); aid.s = +b.dataset.s; aid.t = 0; aidInfo(); });
    $('aidNext').onclick = () => { cancelSpeech(); aid.s = (aid.s + 1) % 4; aid.t = 0; aidInfo(); };
    root.querySelectorAll('[data-case]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); aid.c = b.dataset.case; aid.s = 0; aid.t = 0; pressGroup('[data-case]', 'case', aid.c); aidInfo(); }));
    TABS.aid = { frame(dt) { drawAid(dt); }, refresh() { $('aidNext').textContent = T('Bước tiếp ▶', 'Next step ▶'); aid.infoKey = ''; aidInfo(); } };
    QUIZZES.push(makeQuiz($('quiz_aid'), {
      vi: [
        { q: 'Bị bỏng nhẹ, việc đầu tiên nên làm là gì?', a: ['Xả nước mát lên chỗ bỏng', 'Bôi kem đánh răng', 'Chườm đá lạnh thật lâu', 'Bôi nước mắm'], why: 'Nước mát làm dịu và hạ nhiệt chỗ bỏng. Đá lạnh có thể làm tổn thương da thêm.' },
        { q: 'Nên xả nước mát vết bỏng trong khoảng bao lâu?', a: ['Khoảng 20 phút', '5 giây', '1 phút', 'Không cần'], why: 'Khoảng 20 phút giúp hạ nhiệt sâu bên dưới da.' },
        { q: 'Khi chảy máu cam, nên làm gì?', a: ['Ngồi, cúi đầu về trước, bóp phần mềm của mũi', 'Nằm ngửa ra sau', 'Ngửa cổ lên trời', 'Chạy thật nhanh'], why: 'Cúi về trước để máu không chảy xuống họng.' },
        { q: 'Bị đứt tay nhẹ, sau khi rửa sạch nên làm gì?', a: ['Ấn nhẹ bằng gạc sạch rồi dán băng', 'Bôi đất', 'Để hở cho ruồi đậu', 'Thổi vào vết thương'], why: 'Ấn gạc sạch giúp cầm máu, băng giữ vết thương sạch.' },
        { q: 'Số điện thoại cấp cứu ở Việt Nam là gì?', a: ['115', '113', '114', '111'], why: '115 là cấp cứu y tế.' },
        { q: 'Khi bạn bị thương, em nên làm gì đầu tiên?', a: ['Báo ngay cho người lớn', 'Bỏ đi chỗ khác', 'Chụp ảnh', 'Cười bạn'], why: 'Người lớn sẽ giúp sơ cứu và đưa đi khám nếu cần.' }
      ],
      en: [
        { q: 'For a small burn, what comes first?', a: ['Cool running water', 'Toothpaste', 'Ice for a long time', 'Fish sauce'], why: 'Cool water soothes and cools the burn; ice can hurt the skin more.' },
        { q: 'How long should you cool a burn?', a: ['About 20 minutes', '5 seconds', '1 minute', 'Not at all'], why: 'About 20 minutes cools the deeper layers of skin.' },
        { q: 'For a nosebleed you should…', a: ['Sit, lean forward and pinch the soft part of your nose', 'Lie on your back', 'Tip your head back', 'Run fast'], why: 'Leaning forward stops blood running down your throat.' },
        { q: 'After rinsing a small cut, you…', a: ['Press with clean gauze, then add a plaster', 'Rub in soil', 'Leave it for flies', 'Blow on it'], why: 'Pressing stops bleeding; a plaster keeps it clean.' },
        { q: 'What is Vietnam’s ambulance number?', a: ['115', '113', '114', '111'], why: '115 is for medical emergencies.' },
        { q: 'When a friend gets hurt, first you…', a: ['Tell an adult right away', 'Walk off', 'Take a photo', 'Laugh'], why: 'An adult can give first aid and get help if needed.' }
      ]
    }));

    /* =====================================================================
       3. KHI CÓ CHÁY + tập gọi số khẩn cấp
       ===================================================================== */
    const FSTEPS = [
      { vi: ['Hô to báo mọi người', 'Hô thật to "Cháy! Cháy!" để mọi người trong nhà biết và cùng thoát ra.'], en: ['Shout to warn everyone', 'Shout “Fire! Fire!” loudly so everyone at home knows and gets out.'] },
      { vi: ['Bò thấp, che mũi miệng', 'Khói nóng bốc lên cao nên sát sàn còn ít khói. Bò thấp, che mũi miệng bằng khăn ướt.'], en: ['Crawl low, cover your nose', 'Hot smoke rises, so there is less near the floor. Crawl low and cover your nose and mouth with a wet cloth.'] },
      { vi: ['Sờ tay nắm cửa trước khi mở', 'Dùng mu bàn tay chạm vào cửa. Nếu nóng thì không mở, tìm lối khác.'], en: ['Feel the door before opening', 'Touch the door with the back of your hand. If it’s hot, don’t open it; find another way.'] },
      { vi: ['Đi cầu thang bộ, không đi thang máy', 'Thang máy có thể mất điện, kẹt lại giữa đám cháy. Luôn đi cầu thang bộ.'], en: ['Use the stairs, never the lift', 'A lift can lose power and get stuck in a fire. Always take the stairs.'] },
      { vi: ['Ra ngoài rồi gọi 114', 'Ra chỗ an toàn rồi gọi 114. Không quay lại lấy đồ đạc dù là thứ quý.'], en: ['Get out, then call 114', 'Once safe outside, call 114. Never go back in for belongings.'] }
    ];
    let fire = { s: 1, stand: false, t: 0, infoKey: '' };
    const fireC = mk('c_fire', (w) => clamp(w * .55, 270, 450));
    function drawFire(dt) {
      const { w, h, ctx } = fireC;
      if (!w) return;
      fire.t += dt;
      const s = fire.s, gy = h * .86;
      ctx.fillStyle = s === 4 ? '#bae6fd' : '#fef3c7'; ctx.fillRect(0, 0, w, h);
      if (s === 4) {
        ctx.fillStyle = '#86efac'; ctx.fillRect(0, gy, w, h - gy);
        ctx.fillStyle = '#e5e7eb'; ctx.fillRect(w * .55, h * .3, w * .35, gy - h * .3); ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.moveTo(w * .52, h * .3); ctx.lineTo(w * .725, h * .12); ctx.lineTo(w * .93, h * .3); ctx.fill();
        ctx.fillStyle = 'rgba(100,116,139,.6)'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(w * (.75 + k * .03), h * (.2 - k * .04) - (fire.t * 10 % 20), 14 + k * 4, 0, TAU); ctx.fill(); }
        emo(ctx, '🔥', w * .66, h * .55, 30);
        emo(ctx, '🧒', w * .2, gy - h * .14, h * .2); emo(ctx, '📱', w * .3, gy - h * .2, h * .1);
        bubble(ctx, T('A lô, 114! Nhà em bị cháy…', 'Hello, 114! My house is on fire…'), w * .27, h * .2, 12);
        emo(ctx, '🎒', w * .45, gy - h * .05, h * .08); ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(w * .41, gy - h * .1); ctx.lineTo(w * .49, gy); ctx.stroke();
        return;
      }
      // hành lang với khói
      ctx.fillStyle = '#d6b48a'; ctx.fillRect(0, gy, w, h - gy);
      const smokeY = h * (.28 + .1 * Math.sin(fire.t * .5));
      const sg = ctx.createLinearGradient(0, 0, 0, smokeY + h * .1); sg.addColorStop(0, 'rgba(51,65,85,.95)'); sg.addColorStop(.85, 'rgba(100,116,139,.7)'); sg.addColorStop(1, 'rgba(100,116,139,0)');
      ctx.fillStyle = sg; ctx.fillRect(0, 0, w, smokeY + h * .1);
      for (let k = 0; k < 8; k++) { ctx.fillStyle = 'rgba(71,85,105,.5)'; ctx.beginPath(); ctx.arc(((k * 97 + fire.t * 30) % (w + 60)) - 30, smokeY + Math.sin(k + fire.t) * 8, 24, 0, TAU); ctx.fill(); }
      textLight(ctx, T('Khói nóng bay lên cao', 'Hot smoke rises'), w * .5, h * .08, '#f1f5f9', 12, 'center', 900);
      if (s === 2) { ctx.fillStyle = '#92400e'; ctx.fillRect(w * .72, h * .3, w * .14, gy - h * .3); ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(w * .74, h * .6, 5, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(239,68,68,.7)'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let j = 0; j < 8; j++) { const x = w * (.76 + k * .03) + Math.sin(j + fire.t * 6) * 3, y = h * .55 - j * 8; if (j) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke(); } textLight(ctx, T('Cửa nóng: không mở!', 'Hot door: don’t open!'), w * .79, h * .25, '#fee2e2', 12, 'center', 900); }
      if (s === 3) { ctx.fillStyle = '#94a3b8'; ctx.fillRect(w * .7, h * .3, w * .14, gy - h * .3); ctx.fillStyle = '#64748b'; ctx.fillRect(w * .768, h * .3, 3, gy - h * .3); emo(ctx, '🛗', w * .77, h * .26, 22); ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(w * .7, h * .32); ctx.lineTo(w * .84, gy); ctx.stroke(); ctx.strokeStyle = '#a16207'; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k < 6; k++) { ctx.lineTo(w * (.45 + k * .035), gy - k * h * .06); ctx.lineTo(w * (.45 + (k + 1) * .035), gy - k * h * .06); } ctx.stroke(); textLight(ctx, T('Cầu thang bộ', 'Stairs'), w * .55, gy - h * .42, '#fef3c7', 12, 'center', 900); }
      // bé
      const x = s === 1 || s === 0 ? w * (.12 + ((fire.t * .06) % .45)) : w * .3;
      if (fire.stand || s === 0) { emo(ctx, '🧍', x, gy - h * .17, h * .3); if (fire.stand && s !== 0) bubble(ctx, T('Nguy hiểm! Đầu ở trong khói', 'Danger! Head in the smoke'), x, gy - h * .45, 12, '#fff', '#be123c'); }
      else { emo(ctx, '🧎', x, gy - h * .08, h * .17); textLight(ctx, T('khăn ướt che mũi', 'wet cloth over nose'), x, gy - h * .2, '#1e293b', 11, 'center', 900); }
      if (s === 0) bubble(ctx, T('Cháy! Cháy! Mọi người ra ngoài!', 'Fire! Fire! Everybody out!'), x + w * .15, gy - h * .45, 13, '#fff', '#c2410c');
      ctx.strokeStyle = 'rgba(34,197,94,.6)'; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(0, gy - h * .2); ctx.lineTo(w, gy - h * .2); ctx.stroke(); ctx.setLineDash([]);
      textLight(ctx, T('vùng ít khói, dễ thở', 'clearer air down low'), w - 8, gy - h * .23, '#15803d', 11, 'right', 900);
    }
    function fireInfo(force) {
      const key = [lang, fire.s, fire.stand].join('|'); if (key === fire.infoKey && !force) return; fire.infoKey = key;
      const d = L(FSTEPS[fire.s]);
      root.querySelectorAll('#fireSteps button').forEach((b, i) => { b.setAttribute('aria-pressed', String(i === fire.s)); b.querySelector('span').textContent = L(FSTEPS[i])[0]; });
      infoBox($('info_fire'), { emo: '🔥', title: d[0], sub: T(`Bước ${fire.s + 1}/5`, `Step ${fire.s + 1}/5`), rows: [[T('Làm thế nào?', 'How?'), d[1]]], notes: [['tip', T('🏠 Cả nhà nên cùng tập trước đường thoát hiểm và chọn một điểm hẹn an toàn bên ngoài.', '🏠 Practise your escape route as a family and choose a safe meeting point outside.')]] });
      setText('hud_fire', `🔥 ${T('Bước', 'Step')} ${fire.s + 1}: ${d[0]}`);
    }
    $('fireSteps').innerHTML = FSTEPS.map((_, i) => `<button type="button" data-s="${i}" aria-pressed="false"><b>${i + 1}</b><span></span></button>`).join('');
    $('fireSteps').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (!b) return; cancelSpeech(); fire.s = +b.dataset.s; fire.t = 0; fireInfo(); });
    $('fireStand').onclick = () => { fire.stand = !fire.stand; $('fireStand').setAttribute('aria-pressed', String(fire.stand)); fireInfo(); };
    // tập gọi khẩn cấp
    const CALLS = [
      { n: '114', vi: 'Thấy nhà hàng xóm bốc khói, có lửa', en: 'Smoke and flames at the neighbour’s house' },
      { n: '115', vi: 'Bà bị ngã, nằm bất tỉnh', en: 'Grandma fell and won’t wake up' },
      { n: '113', vi: 'Thấy người lạ cạy cửa nhà hàng xóm', en: 'A stranger is breaking into a neighbour’s house' },
      { n: '111', vi: 'Một bạn nhỏ bị bắt nạt, đánh đập', en: 'A child is being bullied or hurt' },
      { n: '114', vi: 'Có người bị kẹt trong thang máy', en: 'Someone is stuck in a lift' }
    ];
    let dial = { i: 0, num: '', msg: null, score: 0 };
    function dialRender() {
      const c = CALLS[dial.i];
      $('dialBox').innerHTML = `
        <p class="muted" style="margin:0">${T('Tình huống:', 'Situation:')}</p>
        <b style="color:#6d28d9;font-size:16px"></b>
        <div class="dial-screen">${dial.num || '&nbsp;'}</div>
        <div class="dial-pad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '📞'].map((k) => `<button type="button" class="btn${k === '📞' ? ' main' : ''}" data-k="${k}">${k}</button>`).join('')}</div>
        <p class="score" style="margin:0">${T(`Đúng ${dial.score} lần`, `${dial.score} correct`)}</p>
        ${dial.msg ? `<p class="${dial.msg[0]}" style="margin:0"></p>` : ''}
        <p class="muted" style="margin:0">${T('113 công an · 114 cứu hỏa, cứu nạn · 115 cấp cứu · 111 bảo vệ trẻ em', '113 police · 114 fire and rescue · 115 ambulance · 111 child protection')}</p>`;
      $('dialBox').querySelector('b').textContent = L(c);
      if (dial.msg) $('dialBox').querySelectorAll('p')[2].textContent = dial.msg[1];
    }
    $('dialBox').addEventListener('click', (e) => {
      const b = e.target.closest('[data-k]'); if (!b) return; const k = b.dataset.k;
      if (k === '⌫') dial.num = dial.num.slice(0, -1);
      else if (k === '📞') {
        const c = CALLS[dial.i];
        if (dial.num === c.n) { dial.score++; dial.msg = ['fun', T(`🎉 Đúng rồi, gọi ${c.n}! Nói rõ: chuyện gì xảy ra, ở đâu, tên em.`, `🎉 Right, call ${c.n}! Say clearly what happened, where, and your name.`)]; dial.i = (dial.i + 1) % CALLS.length; }
        else dial.msg = ['warn', T(`Chưa đúng. Tình huống này nên gọi ${c.n}.`, `Not quite. This one is ${c.n}.`)];
        dial.num = '';
      } else if (dial.num.length < 4) dial.num += k;
      dialRender();
    });
    TABS.fire = { frame(dt) { drawFire(dt); }, refresh() { fire.infoKey = ''; fireInfo(); dial.msg = null; dialRender(); } };
    QUIZZES.push(makeQuiz($('quiz_fire'), {
      vi: [
        { q: 'Khi có cháy, số điện thoại cần gọi là gì?', a: ['114', '113', '115', '1080'], why: '114 là số cứu hỏa, cứu nạn cứu hộ.' },
        { q: 'Vì sao nên bò thấp khi có khói?', a: ['Khói nóng bay lên cao, sát sàn ít khói hơn', 'Để đi nhanh hơn', 'Để trốn', 'Vì sàn mát'], why: 'Không khí gần sàn sạch hơn, dễ thở hơn.' },
        { q: 'Khi thoát khỏi đám cháy trong chung cư, nên đi bằng gì?', a: ['Cầu thang bộ', 'Thang máy', 'Nhảy qua cửa sổ', 'Trốn vào tủ'], why: 'Thang máy có thể mất điện và kẹt lại.' },
        { q: 'Sờ thấy cửa rất nóng, em làm gì?', a: ['Không mở, tìm lối thoát khác', 'Mở thật nhanh', 'Đạp cửa', 'Ngồi chờ ở đó'], why: 'Phía sau cửa nóng có thể là lửa.' },
        { q: 'Đã ra ngoài an toàn rồi, có nên quay lại lấy đồ chơi?', a: ['Không, tuyệt đối không quay lại', 'Có, chạy nhanh vào lấy', 'Có, nếu là đồ quý', 'Nhờ bạn vào lấy'], why: 'Tính mạng quan trọng hơn mọi đồ vật.' },
        { q: 'Số điện thoại tổng đài bảo vệ trẻ em là gì?', a: ['111', '114', '115', '113'], why: 'Gọi 111 khi trẻ em bị bạo lực, xâm hại hoặc cần giúp đỡ.' }
      ],
      en: [
        { q: 'Which number do you call for a fire in Vietnam?', a: ['114', '113', '115', '1080'], why: '114 is for fire and rescue.' },
        { q: 'Why crawl low in smoke?', a: ['Hot smoke rises, so there’s less near the floor', 'To go faster', 'To hide', 'The floor is cool'], why: 'The air near the floor is clearer and easier to breathe.' },
        { q: 'Escaping a fire in a flat, you take…', a: ['The stairs', 'The lift', 'A jump from the window', 'A hiding place in a cupboard'], why: 'Lifts can lose power and get stuck.' },
        { q: 'The door feels very hot. You…', a: ['Don’t open it; find another way', 'Open it fast', 'Kick it', 'Wait there'], why: 'There may be fire behind a hot door.' },
        { q: 'Once you’re safely outside, should you go back for a toy?', a: ['No, never go back in', 'Yes, quickly', 'Yes, if it’s precious', 'Ask a friend to go'], why: 'Your life matters more than any thing.' },
        { q: 'What is Vietnam’s child protection hotline?', a: ['111', '114', '115', '113'], why: 'Call 111 if a child is being hurt, abused or needs help.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'hunt';
    root.querySelectorAll('.safe-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.safe-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('a-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.safe-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.safe-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.safe-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
