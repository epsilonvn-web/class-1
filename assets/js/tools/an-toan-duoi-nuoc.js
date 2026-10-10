/* Epsilon Edu - Tool: An toan duoi nuoc (Water safety): nhan biet noi nguy hiem, ao phao, cuu ban an toan
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.waterSafety = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "waterSafety";
  let activeCleanup = null;

  const CSS = `
.swim-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.swim-tool *{box-sizing:border-box}.swim-tool button,.swim-tool input{font:inherit}.swim-tool button{cursor:pointer}.swim-tool .hidden{display:none!important}
.swim-tool button:focus-visible,.swim-tool canvas:focus-visible,.swim-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.swim-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.swim-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.swim-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.swim-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.swim-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.swim-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.swim-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.swim-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.swim-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.swim-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.swim-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.swim-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.swim-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.swim-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.swim-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.swim-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.swim-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.swim-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.swim-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.swim-panel{width:100%}.swim-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.swim-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.swim-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.swim-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.swim-tool .card-head.compact{margin-bottom:9px}
.swim-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.swim-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.swim-tool .btn,.swim-tool .soft-btn,.swim-tool .segmented button,.swim-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.swim-tool .btn:hover,.swim-tool .soft-btn:hover,.swim-tool .segmented button:hover,.swim-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.swim-tool .btn{padding:0 12px}.swim-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.swim-tool .segmented{display:flex;gap:7px;margin:0}.swim-tool .segmented button{padding:0 13px}
.swim-tool .segmented button[aria-pressed="true"],.swim-tool .soft-btn[aria-pressed="true"],.swim-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.swim-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.swim-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.swim-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.swim-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.swim-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.swim-tool .range-control input{width:100%;accent-color:#8b5cf6}.swim-tool .range-control b{color:#7c3aed;font-size:13px}
.swim-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.swim-tool .soft-btn{padding:0 12px}
.swim-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.swim-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.swim-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.swim-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.swim-tool .info-title{display:flex;align-items:center;gap:10px}.swim-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.swim-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.swim-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.swim-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.swim-tool .facts{display:grid;gap:6px;margin-top:10px}.swim-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.swim-tool .facts b{color:#7c3aed;font-size:13.5px}.swim-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.swim-tool .fun,.swim-tool .warn,.swim-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.swim-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.swim-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.swim-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.swim-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.swim-tool .state-big.up{color:#0f766e}.swim-tool .state-big.down{color:#b45309}
.swim-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.swim-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.swim-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.swim-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.swim-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.swim-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.swim-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.swim-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.swim-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.swim-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.swim-tool .qopt:hover{filter:brightness(.985)}.swim-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.swim-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.swim-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.swim-tool .qfb,.swim-tool .score{font-size:13px;font-weight:900}.swim-tool .qfb.ok{color:#15803d}.swim-tool .qfb.no{color:#be123c}.swim-tool .score{color:#7c3aed}
.swim-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.swim-grid{grid-template-columns:1fr;align-items:start}.swim-side{grid-template-rows:auto auto;height:auto}.swim-tool .control-grid{grid-template-columns:1fr}.swim-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.swim-hero{flex-wrap:wrap;padding:12px}.swim-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.swim-tabs{grid-template-columns:1fr}.swim-tabs .tab{min-height:40px}.swim-card{padding:11px;border-radius:18px}.swim-tool .card-head{align-items:flex-start;flex-direction:column}.swim-tool .head-actions{width:100%;justify-content:space-between}.swim-tool .head-actions .segmented{flex:1;min-width:0}.swim-tool .head-actions .segmented button{flex:1;padding:0 8px}.swim-tool .qopts{grid-template-columns:1fr}.swim-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.swim-tool *{transition:none!important}}

.swim-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.swim-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.swim-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.swim-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.swim-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.swim-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.swim-tool .checklist{display:grid;gap:6px;margin-top:10px}
.swim-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.swim-tool .checklist .ok{color:#15803d}.swim-tool .checklist .no{color:#be123c}.swim-tool .checklist .wait{color:#94a3b8}
.swim-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.swim-tool .process span{flex:1}.swim-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.swim-tool .process .on{color:#0284c7}.swim-tool .process i.on{color:#ec4899}
@media(max-width:640px){.swim-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.swim-tool .slider-pair{grid-template-columns:1fr}}

.swim-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.swim-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.swim-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.swim-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.swim-tool .pulse-box{display:grid;gap:7px;margin-bottom:4px}
.swim-tool .act-btn{min-height:44px;text-align:left;padding:6px 12px;white-space:normal;line-height:1.3}
.swim-tool .act-btn.good{background:#f0fdf4;border-color:#86efac;color:#15803d}
.swim-tool .act-btn.bad{background:#fff1f2;border-color:#fda4af;color:#be123c}

.swim-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.swim-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="swim-tool" data-tool-root>
  <div class="swim-hero">
    <div class="swim-hero-icon" aria-hidden="true">🛟</div>
    <div>
      <p class="swim-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="swim-lead" data-t="lead"></p>
    </div>
    <div class="swim-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="wAudioNotice" class="swim-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="swim-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="spot" data-t="tab_spot"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="vest" data-t="tab_vest"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="rescue" data-t="tab_rescue"></button>
  </div>
  <section id="w-spot" class="swim-panel" role="tabpanel">
    <div class="swim-grid">
      <article class="swim-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_spot"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="sceneL"><button type="button" data-scene="pond" aria-pressed="true" data-t="sPond"></button><button type="button" data-scene="beach" aria-pressed="false" data-t="sBeach"></button></div><button id="spHint" class="btn" type="button" data-t="hint"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_spot" role="img" data-ta="cv_spot"></canvas></div>
        <p id="hud_spot" class="hud" aria-live="polite"></p>
      </article>
      <div class="swim-side">
        <aside class="swim-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_spot"></span><h2 data-t="sh_spot"></h2></div></div>
          
          <div id="info_spot" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_spot" class="swim-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="w-vest" class="swim-panel hidden" role="tabpanel">
    <div class="swim-grid">
      <article class="swim-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_vest"></h2></div>
          <div class="head-actions"><button id="vsReset" class="btn" type="button" data-t="reset"></button><button id="vsTest" class="btn main" type="button" data-t="test"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_vest" role="img" data-ta="cv_vest"></canvas></div>
        <p id="hud_vest" class="hud" aria-live="polite"></p>
        <div id="vsSteps" class="stage-row" role="group" data-ta="stepsL"></div>
      </article>
      <div class="swim-side">
        <aside class="swim-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_vest"></span><h2 data-t="sh_vest"></h2></div></div>
          
          <div id="info_vest" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_vest" class="swim-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="w-rescue" class="swim-panel hidden" role="tabpanel">
    <div class="swim-grid">
      <article class="swim-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_rescue"></h2></div>
          <div class="head-actions"><button id="rsReset" class="btn" type="button" data-t="reset"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_rescue" role="img" data-ta="cv_rescue"></canvas></div>
        <p id="hud_rescue" class="hud" aria-live="polite"></p>
      </article>
      <div class="swim-side">
        <aside class="swim-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_rescue"></span><h2 data-t="sh_rescue"></h2></div></div>
          <div id="rsActs" class="pulse-box"></div>
          <div id="info_rescue" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_rescue" class="swim-card quiz-card"></article>
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
    const audioNotice = $('wAudioNotice');
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
      title: ['An toàn dưới nước', 'Water Safety'],
      lead: ['Nhận biết chỗ nước nguy hiểm, mặc áo phao đúng cách, biết thả nổi và cách giúp bạn an toàn khi thấy người đuối nước.', 'Spot dangerous water, wear a life jacket properly, learn to float, and help a friend safely if they are drowning.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Thử ngay', 'Try it'],
      tab_spot: ['🔍 Chỗ nào nguy hiểm?', '🔍 Spot the danger'], h_spot: ['Thám tử sông nước', 'Water detective'],
      cv_spot: ['Cảnh ao sông hoặc bãi biển có những mối nguy hiểm. Bấm vào chỗ em thấy nguy hiểm', 'A pond, river or beach with hidden dangers. Tap where you see one'],
      se_spot: ['Kết quả', 'Result'], sh_spot: ['Vì sao nguy hiểm?', 'Why is it dangerous?'],
      tab_vest: ['🦺 Áo phao và thả nổi', '🦺 Life jacket and floating'], h_vest: ['Mặc áo phao đúng cách', 'Wearing a life jacket properly'],
      cv_vest: ['Bạn nhỏ mặc áo phao từng bước và thử nổi trên mặt nước', 'A child puts on a life jacket step by step and tries floating'],
      se_vest: ['Ghi nhớ', 'Remember'], sh_vest: ['Từng bước', 'Step by step'],
      tab_rescue: ['🆘 Cứu bạn an toàn', '🆘 Helping safely'], h_rescue: ['Thấy bạn đuối nước, em làm gì?', 'A friend is drowning. What do you do?'],
      cv_rescue: ['Một bạn đang chới với dưới nước, em đứng trên bờ', 'A friend struggles in the water while you stand on the bank'],
      se_rescue: ['Chọn cách giúp', 'Choose how to help'], sh_rescue: ['Ném, đưa, đừng nhảy!', 'Throw, reach, don’t jump!'],
      sceneL: ['Chọn nơi', 'Pick a place'], sPond: ['🏞️ Ao, sông', '🏞️ Pond and river'], sBeach: ['🏖️ Bãi biển', '🏖️ Beach'], hint: ['💡 Gợi ý', '💡 Hint'],
      stepsL: ['Các bước', 'Steps'], test: ['🌊 Thử xuống nước', '🌊 Try the water'], reset: ['↺ Làm lại', '↺ Reset']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    const emo = (ctx, e, x, y, px) => { ctx.font = emojiFont(px); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e, x, y); };
    function kid(ctx, x, y, s, o = {}) {
      // người nhỏ đơn giản: (x, y) là vị trí đầu
      ctx.save(); ctx.translate(x, y);
      if (o.vest) { ctx.fillStyle = '#f97316'; rr(ctx, -s * .42, s * .3, s * .84, s * .8, s * .2); ctx.fill(); }
      else { ctx.fillStyle = o.shirt || '#38bdf8'; rr(ctx, -s * .35, s * .32, s * .7, s * .75, s * .18); ctx.fill(); }
      if (o.vest && o.straps) { ctx.fillStyle = '#1f2937'; for (let k = 0; k < o.straps; k++) ctx.fillRect(-s * .42, s * (.55 + k * .2), s * .84, s * .06); }
      if (o.vest && o.zip) { ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, s * .32); ctx.lineTo(0, s * 1.08); ctx.stroke(); }
      ctx.fillStyle = '#fde7c7'; ctx.beginPath(); ctx.arc(0, 0, s * .32, 0, TAU); ctx.fill();
      ctx.fillStyle = o.hair || '#3f2a14'; ctx.beginPath(); ctx.arc(0, -s * .04, s * .33, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
      ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(-s * .11, -s * .02, s * .04, 0, TAU); ctx.arc(s * .11, -s * .02, s * .04, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = Math.max(1.5, s * .04); ctx.beginPath();
      if (o.scared) ctx.arc(0, s * .16, s * .07, 0, TAU); else ctx.arc(0, s * .08, s * .1, .2 * Math.PI, .8 * Math.PI);
      ctx.stroke();
      if (o.arms) { ctx.strokeStyle = '#fde7c7'; ctx.lineWidth = s * .12; ctx.lineCap = 'round'; const a = o.arms; ctx.beginPath(); ctx.moveTo(-s * .3, s * .4); ctx.lineTo(-s * .65, s * (.4 - a)); ctx.moveTo(s * .3, s * .4); ctx.lineTo(s * .65, s * (.4 - a)); ctx.stroke(); }
      ctx.restore();
    }

    /* =====================================================================
       1. CHỖ NÀO NGUY HIỂM?
       ===================================================================== */
    const SCN = {
      pond: [
        { x: .2, y: .62, r: .08, vi: ['Ao sâu có biển cảnh báo', 'Nước ao có thể sâu hơn em tưởng rất nhiều, đáy có bùn lún.', 'Không lại gần, không tắm ở ao hồ, nhất là chỗ có biển "Nước sâu – nguy hiểm".'], en: ['Deep pond with a warning sign', 'Ponds can be much deeper than they look, with sinking mud.', 'Keep away and never swim there, especially where a sign warns of deep water.'] },
        { x: .44, y: .5, r: .07, vi: ['Bờ dốc, rêu trơn', 'Bờ đất dốc phủ rêu rất trơn, dễ trượt chân ngã xuống nước.', 'Không đứng sát mép bờ, không chạy nhảy ở bờ sông, bờ ao.'], en: ['Steep, slippery bank', 'Mossy slopes are slippery; it’s easy to slide into the water.', 'Stay back from the edge; don’t run on riverbanks.'] },
        { x: .74, y: .66, r: .08, vi: ['Dòng nước xiết, xoáy nước', 'Dòng chảy mạnh có thể cuốn trôi cả người lớn biết bơi.', 'Không bơi ở sông suối, nhất là sau mưa lớn.'], en: ['Fast current and whirlpool', 'A strong current can sweep away even adults who can swim.', 'Never swim in rivers or streams, especially after heavy rain.'] },
        { x: .88, y: .34, r: .07, vi: ['Hố nước công trình không có rào', 'Hố đào chứa nước mưa thường rất sâu, thành dốc đứng, khó trèo lên.', 'Tránh xa công trường, hố móng, giếng không có nắp.'], en: ['Unfenced building-site pit', 'Rain-filled pits are often deep with steep sides that are hard to climb.', 'Stay away from building sites, pits and uncovered wells.'] },
        { x: .58, y: .82, r: .07, vi: ['Đi bè chuối không mặc áo phao, không có người lớn', 'Bè dễ lật, trẻ em không có người lớn trông rất nguy hiểm.', 'Chỉ xuống nước khi có người lớn trông và luôn mặc áo phao.'], en: ['A raft with no life jacket and no adult', 'Rafts tip easily; children alone in water are in danger.', 'Only go in water with an adult watching and always wear a life jacket.'] }
      ],
      beach: [
        { x: .14, y: .3, r: .07, vi: ['Cờ đỏ: cấm tắm', 'Cờ đỏ nghĩa là biển đang nguy hiểm: sóng to, dòng chảy mạnh.', 'Thấy cờ đỏ thì tuyệt đối không xuống nước. Nghe theo nhân viên cứu hộ.'], en: ['Red flag: no swimming', 'A red flag means the sea is dangerous: big waves, strong currents.', 'Never go in when the red flag is up. Listen to lifeguards.'] },
        { x: .55, y: .55, r: .09, vi: ['Dòng rút (dòng chảy xa bờ)', 'Chỗ nước lặng, sẫm màu, ít sóng giữa hai vùng sóng có thể là dòng rút, kéo người ra xa bờ rất nhanh.', 'Nếu bị cuốn: giữ bình tĩnh, đừng bơi ngược dòng. Bơi song song với bờ rồi mới bơi vào, giơ tay gọi cứu hộ.'], en: ['Rip current', 'A calm, darker gap between breaking waves can be a rip that pulls swimmers out fast.', 'If caught: stay calm, don’t swim against it. Swim parallel to the shore, then in, and wave for help.'] },
        { x: .83, y: .42, r: .07, vi: ['Bơi ra ngoài phao giới hạn', 'Ngoài phao giới hạn nước sâu, có thuyền, cứu hộ khó tới kịp.', 'Chỉ tắm trong khu vực có phao giới hạn và có cứu hộ.'], en: ['Swimming past the buoys', 'Beyond the buoys it’s deep, there are boats, and lifeguards can’t reach you fast.', 'Stay inside the buoyed area where lifeguards watch.'] },
        { x: .7, y: .12, r: .08, vi: ['Trời có giông sét', 'Sét có thể đánh xuống mặt biển. Gió giật làm sóng to bất ngờ.', 'Có mây đen, sấm chớp thì lên bờ ngay, vào chỗ trú an toàn.'], en: ['Thunderstorm coming', 'Lightning can strike the sea, and gusts whip up sudden big waves.', 'With dark clouds or thunder, get out at once and find shelter.'] },
        { x: .32, y: .72, r: .07, vi: ['Bạn nhỏ xuống nước một mình', 'Trẻ em có thể đuối nước chỉ trong vài phút, ngay cả ở chỗ nước nông.', 'Luôn có người lớn trông chừng, không đi tắm biển một mình.'], en: ['A child in the water alone', 'Children can drown in minutes, even in shallow water.', 'Always have an adult watching; never swim alone.'] }
      ]
    };
    let sp = { scene: 'pond', found: { pond: [], beach: [] }, last: null, hint: -1, hintT: 0, miss: null, infoKey: '' };
    const spC = mk('c_spot', (w) => clamp(w * .6, 290, 500));
    function drawScene(ctx, w, h) {
      if (sp.scene === 'pond') {
        ctx.fillStyle = '#bae6fd'; ctx.fillRect(0, 0, w, h * .4);
        ctx.fillStyle = '#86efac'; ctx.fillRect(0, h * .3, w, h * .7);
        ctx.fillStyle = '#0e7490'; ctx.beginPath(); ctx.ellipse(w * .22, h * .72, w * .18, h * .14, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = '#92400e'; ctx.fillRect(w * .3, h * .5, 4, h * .1); ctx.fillStyle = '#fef3c7'; rr(ctx, w * .26, h * .44, w * .1, h * .07, 4); ctx.fill(); ctx.fillStyle = '#dc2626'; ctx.font = `900 ${Math.max(8, w * .012)}px system-ui`; ctx.textAlign = 'center'; ctx.fillText('NƯỚC SÂU', w * .31, h * .475);
        ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.moveTo(w * .5, h * .4); ctx.bezierCurveTo(w * .6, h * .55, w * .55, h * .7, w * .62, h); ctx.lineTo(w * .95, h); ctx.bezierCurveTo(w * .85, h * .7, w * .8, h * .55, w * .62, h * .4); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; for (let k = 0; k < 6; k++) { const y = h * (.45 + k * .09), off = (clock * 60 + k * 30) % 40; ctx.beginPath(); ctx.moveTo(w * (.6 + k * .02) + off * .2, y); ctx.lineTo(w * (.66 + k * .02) + off * .2, y + 6); ctx.stroke(); }
        ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); for (let a = 0; a < 12; a += .2) { const r = 3 + a * 2.4, x = w * .74 + Math.cos(a + clock * 3) * r, y = h * .66 + Math.sin(a + clock * 3) * r * .5; if (a) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke();
        ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.moveTo(w * .4, h * .42); ctx.lineTo(w * .5, h * .4); ctx.lineTo(w * .52, h * .6); ctx.lineTo(w * .43, h * .58); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(21,128,61,.8)'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(w * (.43 + k * .015), h * (.46 + k * .02), 4, 0, TAU); ctx.fill(); }
        ctx.fillStyle = '#a16207'; ctx.fillRect(w * .8, h * .26, w * .16, h * .16); ctx.fillStyle = '#0c4a6e'; ctx.fillRect(w * .82, h * .3, w * .12, h * .1); ctx.fillStyle = '#facc15'; ctx.fillRect(w * .78, h * .2, w * .04, h * .06); emo(ctx, '🚧', w * .92, h * .22, 16);
        ctx.fillStyle = '#facc15'; for (let k = 0; k < 4; k++) rr(ctx, w * .52 + k * w * .025, h * .8, w * .02, h * .06, 3), ctx.fill();
        kid(ctx, w * .58, h * .74, h * .07, { shirt: '#f472b6' });
      } else {
        const sky = ctx.createLinearGradient(0, 0, 0, h * .35); sky.addColorStop(0, '#64748b'); sky.addColorStop(1, '#cbd5e1'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .35);
        ctx.fillStyle = '#334155'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(w * (.55 + k * .1), h * .1, w * .08, h * .06, 0, 0, TAU); ctx.fill(); }
        if (Math.sin(clock * 2.3) > .92) { ctx.strokeStyle = '#fde047'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(w * .72, h * .14); ctx.lineTo(w * .69, h * .22); ctx.lineTo(w * .73, h * .22); ctx.lineTo(w * .7, h * .32); ctx.stroke(); }
        ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0, h * .35, w, h * .35);
        ctx.fillStyle = '#0369a1'; ctx.beginPath(); ctx.moveTo(w * .5, h * .35); ctx.lineTo(w * .6, h * .35); ctx.lineTo(w * .58, h * .7); ctx.lineTo(w * .52, h * .7); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 3; for (const [x0, x1] of [[0, .48], [.62, 1]]) for (let k = 0; k < 3; k++) { const y = h * (.5 + k * .06) + Math.sin(clock * 2 + k) * 3; ctx.beginPath(); ctx.moveTo(w * x0, y); ctx.lineTo(w * x1, y); ctx.stroke(); }
        ctx.fillStyle = '#f87171'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(w * (.2 + k * .1), h * .44, 5, 0, TAU); ctx.fill(); }
        ctx.fillStyle = '#fde68a'; ctx.fillRect(0, h * .7, w, h * .3);
        ctx.fillStyle = '#78350f'; ctx.fillRect(w * .13, h * .2, 3, h * .5); ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(w * .13 + 3, h * .2); ctx.lineTo(w * .2, h * .24); ctx.lineTo(w * .13 + 3, h * .28); ctx.fill();
        kid(ctx, w * .85, h * .4, h * .06, { shirt: '#fbbf24', arms: .3 });
        kid(ctx, w * .32, h * .64, h * .06, { shirt: '#a78bfa' });
      }
    }
    function drawSpot(dt) {
      const { w, h, ctx } = spC;
      if (!w) return;
      drawScene(ctx, w, h);
      const list = SCN[sp.scene], found = sp.found[sp.scene];
      list.forEach((z, i) => { const x = z.x * w, y = z.y * h, r = z.r * Math.min(w, h) * 1.4; if (found.includes(i)) { ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); emo(ctx, '✅', x + r * .75, y - r * .75, 18); } else if (sp.hint === i && sp.hintT > 0) { ctx.strokeStyle = `rgba(236,72,153,${.5 + .4 * Math.sin(clock * 10)})`; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.arc(x, y, r * 1.6, 0, TAU); ctx.stroke(); ctx.setLineDash([]); } });
      if (sp.hintT > 0) sp.hintT -= dt;
      if (sp.miss && sp.miss.t > 0) { sp.miss.t -= dt; emo(ctx, '❔', sp.miss.x, sp.miss.y, 20); }
      ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, 8, h - 36, 170, 28, 10); ctx.fill();
      textLight(ctx, T(`🔍 Đã tìm: ${found.length}/${list.length}`, `🔍 Found: ${found.length}/${list.length}`), 18, h - 22, '#6d28d9', 13, 'left', 900);
    }
    spC.c.addEventListener('pointerdown', (e) => {
      const p = localPoint(spC.c, e), { w, h } = spC, list = SCN[sp.scene];
      const i = list.findIndex((z) => Math.hypot(z.x * w - p.x, z.y * h - p.y) < z.r * Math.min(w, h) * 1.6);
      cancelSpeech();
      if (i >= 0) { if (!sp.found[sp.scene].includes(i)) sp.found[sp.scene].push(i); sp.last = i; sp.hintT = 0; spInfo(true); } else sp.miss = { x: p.x, y: p.y, t: .8 };
    });
    function spInfo(force) {
      const list = SCN[sp.scene], found = sp.found[sp.scene], key = [lang, sp.scene, found.length, sp.last].join('|');
      if (key === sp.infoKey && !force) return; sp.infoKey = key;
      const done = found.length === list.length;
      if (sp.last == null) infoBox($('info_spot'), { emo: '🔍', title: T('Tìm các mối nguy hiểm!', 'Find the dangers!'), sub: T(`Có ${list.length} chỗ nguy hiểm`, `${list.length} dangers to find`), rows: [[T('Cách chơi', 'How to play'), T('Quan sát kỹ rồi bấm vào chỗ em thấy có thể gây đuối nước.', 'Look carefully and tap anything that could lead to drowning.')]], notes: [['warn', T('⚠️ Đuối nước là một trong những tai nạn nguy hiểm nhất với trẻ em, nhất là vào mùa hè.', '⚠️ Drowning is one of the most dangerous accidents for children, especially in summer.')]] });
      else { const z = L({ vi: list[sp.last].vi, en: list[sp.last].en }); infoBox($('info_spot'), { emo: done ? '🏆' : '⚠️', title: z[0], sub: T(`Đã tìm ${found.length}/${list.length}`, `Found ${found.length}/${list.length}`), rows: [[T('Vì sao nguy hiểm?', 'Why dangerous?'), z[1]], [T('Nên làm gì?', 'What to do?'), z[2]]], notes: done ? [['fun', T('🏆 Giỏi quá! Em đã tìm ra hết. Thử nơi khác nhé!', '🏆 Brilliant! All found. Try the other place!')]] : [] }); }
      setText('hud_spot', done ? T('🏆 Đã tìm đủ!', '🏆 All found!') : T(`🔍 Còn ${list.length - found.length} chỗ nguy hiểm`, `🔍 ${list.length - found.length} dangers left`));
    }
    root.querySelectorAll('[data-scene]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); sp.scene = b.dataset.scene; sp.last = null; sp.hint = -1; sp.hintT = 0; pressGroup('[data-scene]', 'scene', sp.scene); spInfo(true); }));
    $('spHint').onclick = () => { const left = SCN[sp.scene].map((_, i) => i).filter((i) => !sp.found[sp.scene].includes(i)); if (left.length) { sp.hint = left[0]; sp.hintT = 3; } };
    TABS.spot = { frame(dt) { drawSpot(dt); }, refresh() { sp.infoKey = ''; spInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_spot'), {
      vi: [
        { q: 'Thấy cờ đỏ cắm trên bãi biển, em làm gì?', a: ['Không xuống tắm', 'Bơi thật nhanh', 'Chỉ tắm một chút', 'Ra xa bờ cho mát'], why: 'Cờ đỏ báo biển đang nguy hiểm, cấm tắm.' },
        { q: 'Vì sao không nên bơi ở sông suối sau mưa lớn?', a: ['Nước dâng cao, chảy xiết', 'Vì nước lạnh', 'Vì nước bẩn một chút', 'Không sao cả'], why: 'Dòng chảy mạnh có thể cuốn trôi cả người lớn.' },
        { q: 'Bị dòng rút kéo ra xa bờ, em nên làm gì?', a: ['Bình tĩnh, bơi song song với bờ, giơ tay gọi cứu hộ', 'Bơi ngược dòng thật mạnh', 'Lặn xuống đáy', 'Thả trôi ra biển'], why: 'Bơi song song để thoát khỏi dòng rút rồi mới bơi vào bờ.' },
        { q: 'Trẻ em chỉ nên xuống nước khi nào?', a: ['Có người lớn trông và mặc áo phao', 'Khi trời tối', 'Khi đi một mình', 'Khi bạn rủ'], why: 'Luôn cần người lớn trông chừng.' },
        { q: 'Hố nước ở công trường nguy hiểm vì sao?', a: ['Sâu, thành dốc, khó trèo lên', 'Vì có cá', 'Vì nước ấm', 'Không nguy hiểm'], why: 'Rơi xuống rất khó tự leo lên được.' },
        { q: 'Có sấm sét khi đang tắm biển, em làm gì?', a: ['Lên bờ ngay, vào chỗ trú an toàn', 'Tắm tiếp', 'Bơi ra xa hơn', 'Đứng dưới cây cao'], why: 'Sét có thể đánh xuống mặt nước và chỗ cao.' }
      ],
      en: [
        { q: 'You see a red flag on the beach. You…', a: ['Don’t go in', 'Swim fast', 'Swim just a little', 'Go out further'], why: 'A red flag means dangerous sea: no swimming.' },
        { q: 'Why not swim in rivers after heavy rain?', a: ['The water is high and fast', 'It’s cold', 'It’s a bit dirty', 'It’s fine'], why: 'A strong current can sweep away even adults.' },
        { q: 'A rip current pulls you out. You…', a: ['Stay calm, swim parallel to shore, wave for help', 'Swim hard against it', 'Dive to the bottom', 'Drift out to sea'], why: 'Swim sideways out of the rip, then head in.' },
        { q: 'Children should only go in water when…', a: ['An adult is watching and they wear a life jacket', 'It’s dark', 'They are alone', 'A friend dares them'], why: 'Always with an adult watching.' },
        { q: 'Why are building-site pits dangerous?', a: ['Deep with steep sides, hard to climb out', 'There are fish', 'The water is warm', 'They aren’t'], why: 'If you fall in, it’s very hard to get out.' },
        { q: 'Thunder while at the beach. You…', a: ['Get out and find shelter', 'Keep swimming', 'Swim further out', 'Stand under a tall tree'], why: 'Lightning can strike water and tall things.' }
      ]
    }));

    /* =====================================================================
       2. ÁO PHAO VÀ THẢ NỔI
       ===================================================================== */
    const VSTEPS = [
      { vi: ['Chọn áo vừa cỡ', 'Chọn áo phao đúng cỡ trẻ em, phù hợp với cân nặng ghi trên áo.'], en: ['Pick the right size', 'Choose a child’s life jacket that matches your weight on the label.'] },
      { vi: ['Mặc vào và kéo khóa', 'Xỏ hai tay vào áo, kéo khóa hoặc cài nút phía trước.'], en: ['Put it on and zip up', 'Put both arms through and zip or buckle the front.'] },
      { vi: ['Cài hết các dây đai', 'Cài và kéo chặt tất cả các dây đai, kể cả dây luồn qua háng nếu có.'], en: ['Fasten every strap', 'Buckle and tighten every strap, including the leg strap if there is one.'] },
      { vi: ['Kéo thử ở vai', 'Nhờ người lớn kéo áo lên ở hai vai. Áo không được tuột qua cằm và tai.'], en: ['Do the shoulder test', 'Ask an adult to lift the jacket by the shoulders. It must not slide up past your chin and ears.'] }
    ];
    let vs = { step: 0, inWater: false, t: 0, infoKey: '' };
    const vsC = mk('c_vest', (w) => clamp(w * .55, 270, 450));
    function drawVest(dt) {
      const { w, h, ctx } = vsC;
      if (!w) return;
      vs.t += dt;
      const ok = vs.step >= 4;
      ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, w, h);
      if (vs.inWater) {
        const wl = h * .45; ctx.fillStyle = '#0ea5e9'; ctx.fillRect(0, wl, w, h - wl);
        ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= w; x += 8) { const y = wl + Math.sin(x * .05 + vs.t * 2) * 3; if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke();
        const s = h * .16, x = w * .5;
        if (ok) { const y = wl - s * .2 + Math.sin(vs.t * 2) * 4; kid(ctx, x, y, s, { vest: true, straps: 2, zip: true, arms: -.1 }); bubble(ctx, T('Mình nổi rồi, đầu luôn trên mặt nước!', 'I’m floating, head above water!'), x, h * .12, 13, '#fff', '#15803d'); }
        else { const sink = Math.min(1, vs.t / 3), y = wl + sink * s * .9 + Math.sin(vs.t * 8) * 3; kid(ctx, x, y, s, { vest: vs.step > 1, straps: Math.max(0, vs.step - 2), scared: true, arms: .6 + Math.sin(vs.t * 10) * .3 }); ctx.fillStyle = 'rgba(14,165,233,.75)'; ctx.fillRect(0, wl + 6, w, h); bubble(ctx, vs.step === 0 ? T('Không có áo phao: rất nguy hiểm!', 'No life jacket: very dangerous!') : T('Áo chưa cài đủ, có thể tuột ra!', 'Not fastened: it could slip off!'), x, h * .12, 13, '#fff', '#be123c'); }
      } else {
        const s = h * .3, x = w * .45, y = h * .3;
        ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, h * .88, w, h * .12);
        kid(ctx, x, y, s, { vest: vs.step >= 2, straps: vs.step >= 3 ? 2 : 0, zip: vs.step >= 2 });
        if (vs.step === 4 && !vs.inWater) { ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 3; for (const sd of [-1, 1]) arrow(ctx, x + sd * s * .3, y + s * .3, x + sd * s * .3, y - s * .1 - Math.abs(Math.sin(vs.t * 3)) * 10, '#ec4899', 3, 9); textLight(ctx, T('Kéo thử: áo không tuột qua cằm ✓', 'Lift test: stays below the chin ✓'), w / 2, h * .82, '#15803d', 13, 'center', 900); }
        if (vs.step >= 1) { ctx.fillStyle = '#fff'; rr(ctx, w * .7, h * .2, w * .22, h * .16, 8); ctx.fill(); ctx.strokeStyle = '#94a3b8'; ctx.stroke(); textLight(ctx, T('Cỡ: 15–30 kg', 'Size: 15–30 kg'), w * .81, h * .28, '#334155', 12, 'center', 900); }
        VSTEPS.forEach((_, i) => { const xx = w * (.2 + i * .2); ctx.fillStyle = i < vs.step ? '#22c55e' : '#e5e7eb'; ctx.beginPath(); ctx.arc(xx, h * .93, 11, 0, TAU); ctx.fill(); textLight(ctx, i < vs.step ? '✓' : String(i + 1), xx, h * .93 + .5, i < vs.step ? '#fff' : '#64748b', 12, 'center', 900); });
      }
    }
    function vsInfo(force) {
      const key = lang + vs.step + vs.inWater; if (key === vs.infoKey && !force) return; vs.infoKey = key;
      root.querySelectorAll('#vsSteps button').forEach((b, i) => { b.setAttribute('aria-pressed', String(i < vs.step)); b.querySelector('span').textContent = L(VSTEPS[i])[0]; });
      const cur = VSTEPS[Math.min(3, vs.step)], d = L(cur);
      infoBox($('info_vest'), {
        emo: '🦺', title: vs.step >= 4 ? T('Đã mặc áo phao đúng cách!', 'Life jacket on properly!') : d[0], sub: T(`Đã xong ${vs.step}/4 bước`, `${vs.step}/4 steps done`),
        rows: [[T(vs.step >= 4 ? 'Ghi nhớ' : 'Làm thế nào?', vs.step >= 4 ? 'Remember' : 'How?'), vs.step >= 4 ? T('Mặc áo phao mỗi khi đi thuyền, đi bè, chơi gần nước sâu, kể cả khi em biết bơi.', 'Wear one whenever you’re on a boat or raft or near deep water, even if you can swim.') : d[1]], [T('Nếu bị rơi xuống nước', 'If you fall in'), T('Giữ bình tĩnh, nằm ngửa thả nổi, dang rộng tay chân, ngẩng mặt lên để thở, rồi gọi to "Cứu với!".', 'Stay calm, float on your back with arms and legs spread, face up to breathe, then shout “Help!”.')]],
        notes: [['tip', T('💡 Học bơi ở bể bơi có huấn luyện viên là cách tốt nhất để an toàn dưới nước.', '💡 Learning to swim at a pool with an instructor is the best way to stay safe in water.')]]
      });
    }
    $('vsSteps').innerHTML = VSTEPS.map((_, i) => `<button type="button" data-s="${i}" aria-pressed="false"><b>${i + 1}</b><span></span></button>`).join('');
    $('vsSteps').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (!b) return; cancelSpeech(); vs.step = +b.dataset.s + 1; vs.inWater = false; vs.t = 0; vsInfo(); });
    $('vsTest').onclick = () => { cancelSpeech(); vs.inWater = !vs.inWater; vs.t = 0; vsInfo(); };
    $('vsReset').onclick = () => { vs.step = 0; vs.inWater = false; vs.t = 0; vsInfo(); };
    TABS.vest = { frame(dt) { drawVest(dt); setText('hud_vest', vs.inWater ? (vs.step >= 4 ? T('🌊 Áo phao giữ em nổi an toàn', '🌊 The life jacket keeps you afloat') : T('⚠️ Chưa mặc đúng: hãy làm đủ 4 bước', '⚠️ Not on properly: do all 4 steps')) : T(`🦺 Bấm từng bước để mặc áo phao (${vs.step}/4)`, `🦺 Tap each step to put it on (${vs.step}/4)`)); }, refresh() { vs.infoKey = ''; vsInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_vest'), {
      vi: [
        { q: 'Áo phao mặc đúng phải thế nào khi kéo ở vai?', a: ['Không tuột qua cằm và tai', 'Tuột ra dễ dàng', 'Rơi xuống chân', 'Sao cũng được'], why: 'Áo vừa và cài chặt mới giữ đầu em trên mặt nước.' },
        { q: 'Khi nào cần mặc áo phao?', a: ['Khi đi thuyền, đi bè, chơi gần nước sâu', 'Chỉ khi không biết bơi', 'Khi ngủ', 'Không bao giờ'], why: 'Kể cả người biết bơi cũng cần áo phao khi đi thuyền.' },
        { q: 'Nếu bị rơi xuống nước, em nên làm gì?', a: ['Bình tĩnh, nằm ngửa thả nổi, gọi cứu', 'Vùng vẫy thật mạnh', 'Lặn xuống', 'Im lặng'], why: 'Nằm ngửa giúp mặt ở trên mặt nước để thở.' },
        { q: 'Cách tốt nhất để học bơi là gì?', a: ['Học ở bể bơi có huấn luyện viên', 'Tự học ở sông', 'Học ở ao một mình', 'Xem video rồi ra biển'], why: 'Có người hướng dẫn và nơi an toàn.' },
        { q: 'Áo phao cài thiếu dây đai thì sao?', a: ['Có thể tuột ra khi xuống nước', 'Nổi tốt hơn', 'Không sao cả', 'Đẹp hơn'], why: 'Phải cài đủ và kéo chặt tất cả dây đai.' }
      ],
      en: [
        { q: 'Lifted by the shoulders, a well-fitted life jacket…', a: ['Stays below your chin and ears', 'Slips off easily', 'Falls to your feet', 'Doesn’t matter'], why: 'A snug, fastened jacket keeps your head above water.' },
        { q: 'When do you need a life jacket?', a: ['On boats, rafts and near deep water', 'Only if you can’t swim', 'When sleeping', 'Never'], why: 'Even swimmers wear one on boats.' },
        { q: 'If you fall into water, you should…', a: ['Stay calm, float on your back, call for help', 'Thrash hard', 'Dive down', 'Stay silent'], why: 'Floating on your back keeps your face up to breathe.' },
        { q: 'The best way to learn to swim?', a: ['At a pool with an instructor', 'Alone in a river', 'Alone in a pond', 'Watch a video, then try the sea'], why: 'A safe place with a teacher.' },
        { q: 'A life jacket with straps undone…', a: ['Can slip off in the water', 'Floats better', 'Is fine', 'Looks nicer'], why: 'Fasten and tighten every strap.' }
      ]
    }));

    /* =====================================================================
       3. CỨU BẠN AN TOÀN: hô – ném – đưa, không nhảy xuống
       ===================================================================== */
    const ACTS = [
      { k: 'shout', emo: '📢', good: true, vi: ['Hô to gọi người lớn', 'Đúng! Việc đầu tiên là hô thật to "Cứu với! Có người đuối nước!" để người lớn đến giúp, và nhờ gọi 115.'], en: ['Shout for an adult', 'Yes! First, shout “Help! Someone’s drowning!” so adults come, and ask someone to call for an ambulance (115).'] },
      { k: 'ring', emo: '🛟', good: true, vi: ['Ném phao', 'Đúng! Ném phao hoặc vật nổi tới gần bạn để bạn bám vào.'], en: ['Throw a ring buoy', 'Yes! Throw a buoy or floating object near your friend to hold on to.'] },
      { k: 'bottle', emo: '🧴', good: true, vi: ['Ném can, chai nhựa rỗng có nắp', 'Đúng! Can nhựa, chai rỗng đậy nắp nổi rất tốt, có thể dùng thay phao.'], en: ['Throw an empty capped bottle', 'Yes! Empty capped bottles and jerry cans float well and work like a buoy.'] },
      { k: 'pole', emo: '🎋', good: true, vi: ['Nằm thấp, đưa sào hoặc cành cây dài', 'Đúng! Nằm hoặc ngồi thấp trên bờ cho vững rồi đưa sào để bạn nắm, kéo vào.'], en: ['Lie low and reach with a long pole', 'Yes! Lie or crouch low on the bank so you’re steady, then reach out a pole for them to grab.'] },
      { k: 'jump', emo: '🏊', good: false, vi: ['Nhảy xuống kéo bạn lên', 'Không nên! Người đang đuối nước rất hoảng loạn, có thể ghì cả em xuống. Trẻ em tuyệt đối không nhảy xuống cứu.'], en: ['Jump in to pull them out', 'No! A drowning person panics and can drag you under too. Children must never jump in to rescue.'] },
      { k: 'hand', emo: '🤝', good: false, vi: ['Đứng sát mép, đưa tay kéo', 'Nguy hiểm! Em dễ bị kéo ngã xuống nước. Hãy dùng sào, cành cây dài và nằm thấp.'], en: ['Stand at the edge and grab their hand', 'Risky! You could be pulled in. Use a long pole and stay low.'] }
    ];
    let rs = { act: null, t: 0, saved: false, done: [], infoKey: '' };
    const rsC = mk('c_rescue', (w) => clamp(w * .55, 270, 450));
    function drawRescue(dt) {
      const { w, h, ctx } = rsC;
      if (!w) return;
      rs.t += dt;
      const bankX = w * .3, wl = h * .5;
      ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#86efac'; ctx.beginPath(); ctx.moveTo(0, wl - h * .08); ctx.lineTo(bankX, wl - h * .08); ctx.lineTo(bankX + w * .04, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.moveTo(bankX, wl); for (let x = bankX; x <= w; x += 8) ctx.lineTo(x, wl + Math.sin(x * .05 + rs.t * 2) * 3); ctx.lineTo(w, h); ctx.lineTo(bankX + w * .04, h); ctx.closePath(); ctx.fill();
      const a = rs.act && ACTS.find((x) => x.k === rs.act), k = Math.min(1, rs.t / 1.6);
      const fx = lerp(w * .72, bankX + w * .1, a && a.good && a.k !== 'shout' ? ease((rs.t - 1.6) / 2) : 0), fy = wl + Math.sin(rs.t * 6) * 4;
      const meX = a && a.k === 'pole' ? bankX - w * .05 : bankX - w * .08, meY = a && a.k === 'pole' ? wl - h * .14 : wl - h * .25;
      // bạn dưới nước
      if (!(a && a.k === 'jump' && rs.t > 1.2)) kid(ctx, fx, fy - h * .06, h * .1, { shirt: '#fbbf24', scared: !(a && a.good && a.k !== 'shout' && rs.t > 1.6), arms: (a && a.good && a.k !== 'shout' && rs.t > 1.6) ? .2 : .8 + Math.sin(rs.t * 10) * .3 });
      ctx.fillStyle = 'rgba(14,165,233,.7)'; ctx.fillRect(bankX + w * .03, wl + 4, w, h);
      // em trên bờ
      if (!(a && a.k === 'jump' && rs.t > .8)) kid(ctx, meX, meY, h * .11, { shirt: '#ec4899', arms: a ? .5 : .1 });
      if (a) {
        if (a.k === 'shout') { bubble(ctx, T('Cứu với! Có người đuối nước!', 'Help! Someone’s drowning!'), meX + w * .12, meY - h * .14, 13, '#fff', '#c2410c'); if (rs.t > 1) { kid(ctx, w * .1, wl - h * .25, h * .13, { shirt: '#334155' }); bubble(ctx, T('Chú tới đây!', 'I’m coming!'), w * .1, wl - h * .45, 12, '#fff', '#15803d'); } }
        else if (a.k === 'ring' || a.k === 'bottle') { const px = lerp(meX, w * .68, k), py = lerp(meY, wl - 4, k) - Math.sin(k * Math.PI) * h * .2; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(meX, meY + h * .05); ctx.lineTo(rs.t > 1.6 ? fx : px, rs.t > 1.6 ? fy : py); ctx.stroke(); emo(ctx, a.emo, rs.t > 1.6 ? fx + 12 : px, rs.t > 1.6 ? fy : py, h * .07); }
        else if (a.k === 'pole') { const tip = { x: lerp(meX, w * .68, k), y: lerp(meY, wl - 4, k) }; ctx.strokeStyle = '#a16207'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(meX + 6, meY + h * .06); ctx.lineTo(rs.t > 1.6 ? fx : tip.x, rs.t > 1.6 ? fy - h * .02 : tip.y); ctx.stroke(); }
        else if (a.k === 'jump') { if (rs.t > .8) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(w * .6, wl, 20 + rs.t * 10 % 20, 0, TAU); ctx.fill(); } bubble(ctx, T('⚠️ Nguy hiểm: cả hai có thể bị đuối nước!', '⚠️ Danger: both of you could drown!'), w * .55, h * .15, 13, '#fff', '#be123c'); }
        else if (a.k === 'hand') { ctx.save(); ctx.translate(meX, meY); ctx.rotate(Math.min(.6, rs.t * .4)); ctx.restore(); bubble(ctx, T('⚠️ Dễ bị kéo ngã xuống nước!', '⚠️ You could be pulled in!'), w * .5, h * .15, 13, '#fff', '#be123c'); }
        if (a.good && a.k !== 'shout' && rs.t > 3.6) bubble(ctx, T('🎉 Bạn đã vào bờ an toàn!', '🎉 Your friend is safe on the bank!'), w * .5, h * .9, 13, '#fff', '#15803d');
      } else bubble(ctx, T('Cứu… cứu…', 'Help… help…'), w * .72, wl - h * .25, 13, '#fff', '#be123c');
    }
    function rsRender() {
      $('rsActs').innerHTML = ACTS.map((a) => `<button type="button" class="soft-btn act-btn${rs.done.includes(a.k) ? (a.good ? ' good' : ' bad') : ''}" data-act="${a.k}"><span aria-hidden="true">${a.emo}</span> ${L({ vi: a.vi, en: a.en })[0]}</button>`).join('') +
        `<p class="score" style="margin:0">${T(`Đã tìm ra ${rs.done.filter((k) => ACTS.find((a) => a.k === k).good).length}/4 cách đúng`, `Found ${rs.done.filter((k) => ACTS.find((a) => a.k === k).good).length}/4 good ways`)}</p>`;
    }
    $('rsActs').addEventListener('click', (e) => { const b = e.target.closest('[data-act]'); if (!b) return; cancelSpeech(); rs.act = b.dataset.act; rs.t = 0; if (!rs.done.includes(rs.act)) rs.done.push(rs.act); rsRender(); rsInfo(true); });
    $('rsReset').onclick = () => { rs.act = null; rs.t = 0; rsInfo(true); };
    function rsInfo(force) {
      const key = lang + rs.act; if (key === rs.infoKey && !force) return; rs.infoKey = key;
      if (!rs.act) { infoBox($('info_rescue'), { emo: '🆘', title: T('Ghi nhớ: Hô – Ném – Đưa', 'Remember: Shout – Throw – Reach'), rows: [[T('Hô', 'Shout'), T('Gọi to người lớn đến giúp.', 'Call loudly for adults.')], [T('Ném', 'Throw'), T('Ném phao, can, chai nhựa có nắp.', 'Throw a buoy, can or capped bottle.')], [T('Đưa', 'Reach'), T('Nằm thấp, đưa sào hoặc cành cây dài.', 'Lie low and reach with a long pole.')]], notes: [['warn', T('🚫 Trẻ em tuyệt đối không nhảy xuống nước để cứu bạn.', '🚫 Children must never jump in to rescue someone.')], ['fun', T('✨ Người đuối nước thật thường không la hét hay vẫy tay được, chỉ ngoi lên ngụp xuống. Vì vậy hãy luôn để mắt tới bạn khi chơi gần nước.', '✨ Someone really drowning often can’t shout or wave; they just bob up and down. Keep an eye on friends near water.')]] }); setText('hud_rescue', T('🆘 Chọn một cách giúp bạn', '🆘 Choose a way to help')); return; }
      const a = ACTS.find((x) => x.k === rs.act), d = L({ vi: a.vi, en: a.en });
      infoBox($('info_rescue'), { emo: a.good ? '✅' : '🚫', title: d[0], rows: [[a.good ? T('Đúng', 'Good') : T('Không nên', 'Don’t'), d[1]]], notes: [['tip', T('📞 Gọi 115 (cấp cứu) hoặc 114 (cứu nạn). Khi bạn đã lên bờ, giữ ấm và chờ người lớn, nhân viên y tế.', '📞 In Vietnam call 115 (ambulance) or 114 (rescue). Once out, keep them warm and wait for adults and medics.')]] });
      setText('hud_rescue', `${a.good ? '✅' : '🚫'} ${d[0]}`);
    }
    TABS.rescue = { frame(dt) { drawRescue(dt); }, refresh() { rsRender(); rs.infoKey = ''; rsInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_rescue'), {
      vi: [
        { q: 'Thấy bạn đuối nước, việc đầu tiên em làm là gì?', a: ['Hô to gọi người lớn', 'Nhảy xuống ngay', 'Chạy về nhà', 'Quay video'], why: 'Người lớn sẽ đến giúp và gọi cấp cứu.' },
        { q: 'Vì sao trẻ em không được nhảy xuống cứu bạn?', a: ['Người đuối nước hoảng loạn có thể ghì cả em xuống', 'Vì nước lạnh', 'Vì sợ ướt quần áo', 'Vì không được phép bơi'], why: 'Cả hai có thể cùng bị đuối nước.' },
        { q: 'Vật nào có thể ném cho bạn bám?', a: ['Can, chai nhựa rỗng có nắp', 'Hòn đá', 'Viên gạch', 'Điện thoại'], why: 'Vật rỗng kín nắp sẽ nổi trên mặt nước.' },
        { q: 'Khi đưa sào cho bạn, em nên đứng thế nào?', a: ['Nằm hoặc ngồi thấp cho vững', 'Đứng sát mép, nhón chân', 'Nhảy lên cao', 'Đứng trên đá trơn'], why: 'Thấp người giúp em không bị kéo ngã xuống.' },
        { q: 'Số điện thoại cấp cứu y tế là gì?', a: ['115', '113', '111', '1080'], why: '115 là cấp cứu, 114 là cứu nạn cứu hộ.' },
        { q: 'Người đang đuối nước thật thường thế nào?', a: ['Ngoi lên ngụp xuống, khó la hét', 'La hét rất to', 'Vẫy tay chào', 'Bơi rất nhanh'], why: 'Vì vậy phải luôn để mắt tới bạn khi ở gần nước.' }
      ],
      en: [
        { q: 'A friend is drowning. First you…', a: ['Shout for an adult', 'Jump in', 'Run home', 'Film it'], why: 'Adults can help and call an ambulance.' },
        { q: 'Why mustn’t children jump in to rescue?', a: ['A panicking person can pull you under', 'The water is cold', 'Wet clothes', 'Swimming isn’t allowed'], why: 'You could both drown.' },
        { q: 'What can you throw for them to hold?', a: ['An empty capped can or bottle', 'A stone', 'A brick', 'A phone'], why: 'Sealed hollow things float.' },
        { q: 'Reaching out a pole, you should…', a: ['Lie or crouch low', 'Stand at the edge on tiptoe', 'Jump up', 'Stand on slippery rocks'], why: 'Staying low stops you being pulled in.' },
        { q: 'What is Vietnam’s ambulance number?', a: ['115', '113', '111', '1080'], why: '115 is the ambulance; 114 is rescue.' },
        { q: 'What does real drowning usually look like?', a: ['Bobbing up and down, hard to shout', 'Loud screaming', 'Waving hello', 'Fast swimming'], why: 'So always keep an eye on friends near water.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'spot';
    root.querySelectorAll('.swim-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.swim-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('w-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.swim-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.swim-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.swim-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
