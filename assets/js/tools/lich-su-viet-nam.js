/* Epsilon Edu - Tool: Lich su Viet Nam (Vietnamese history): dong thoi gian, tran Bach Dang, trong dong Dong Son
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.vnHistory = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "vnHistory";
  let activeCleanup = null;

  const CSS = `
.hist-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.hist-tool *{box-sizing:border-box}.hist-tool button,.hist-tool input{font:inherit}.hist-tool button{cursor:pointer}.hist-tool .hidden{display:none!important}
.hist-tool button:focus-visible,.hist-tool canvas:focus-visible,.hist-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.hist-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.hist-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.hist-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.hist-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.hist-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.hist-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.hist-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.hist-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.hist-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.hist-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.hist-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.hist-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.hist-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.hist-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.hist-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.hist-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.hist-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.hist-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.hist-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.hist-panel{width:100%}.hist-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.hist-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.hist-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.hist-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.hist-tool .card-head.compact{margin-bottom:9px}
.hist-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.hist-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.hist-tool .btn,.hist-tool .soft-btn,.hist-tool .segmented button,.hist-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.hist-tool .btn:hover,.hist-tool .soft-btn:hover,.hist-tool .segmented button:hover,.hist-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.hist-tool .btn{padding:0 12px}.hist-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.hist-tool .segmented{display:flex;gap:7px;margin:0}.hist-tool .segmented button{padding:0 13px}
.hist-tool .segmented button[aria-pressed="true"],.hist-tool .soft-btn[aria-pressed="true"],.hist-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.hist-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.hist-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.hist-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.hist-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.hist-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.hist-tool .range-control input{width:100%;accent-color:#8b5cf6}.hist-tool .range-control b{color:#7c3aed;font-size:13px}
.hist-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.hist-tool .soft-btn{padding:0 12px}
.hist-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.hist-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.hist-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.hist-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.hist-tool .info-title{display:flex;align-items:center;gap:10px}.hist-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.hist-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.hist-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.hist-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.hist-tool .facts{display:grid;gap:6px;margin-top:10px}.hist-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.hist-tool .facts b{color:#7c3aed;font-size:13.5px}.hist-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.hist-tool .fun,.hist-tool .warn,.hist-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.hist-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.hist-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.hist-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.hist-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.hist-tool .state-big.up{color:#0f766e}.hist-tool .state-big.down{color:#b45309}
.hist-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.hist-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.hist-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.hist-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.hist-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.hist-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.hist-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.hist-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.hist-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.hist-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.hist-tool .qopt:hover{filter:brightness(.985)}.hist-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.hist-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.hist-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.hist-tool .qfb,.hist-tool .score{font-size:13px;font-weight:900}.hist-tool .qfb.ok{color:#15803d}.hist-tool .qfb.no{color:#be123c}.hist-tool .score{color:#7c3aed}
.hist-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.hist-grid{grid-template-columns:1fr;align-items:start}.hist-side{grid-template-rows:auto auto;height:auto}.hist-tool .control-grid{grid-template-columns:1fr}.hist-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.hist-hero{flex-wrap:wrap;padding:12px}.hist-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.hist-tabs{grid-template-columns:1fr}.hist-tabs .tab{min-height:40px}.hist-card{padding:11px;border-radius:18px}.hist-tool .card-head{align-items:flex-start;flex-direction:column}.hist-tool .head-actions{width:100%;justify-content:space-between}.hist-tool .head-actions .segmented{flex:1;min-width:0}.hist-tool .head-actions .segmented button{flex:1;padding:0 8px}.hist-tool .qopts{grid-template-columns:1fr}.hist-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.hist-tool *{transition:none!important}}

.hist-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.hist-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.hist-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.hist-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.hist-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.hist-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.hist-tool .checklist{display:grid;gap:6px;margin-top:10px}
.hist-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.hist-tool .checklist .ok{color:#15803d}.hist-tool .checklist .no{color:#be123c}.hist-tool .checklist .wait{color:#94a3b8}
.hist-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.hist-tool .process span{flex:1}.hist-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.hist-tool .process .on{color:#0284c7}.hist-tool .process i.on{color:#ec4899}
@media(max-width:640px){.hist-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.hist-tool .slider-pair{grid-template-columns:1fr}}

.hist-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.hist-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.hist-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.hist-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.hist-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.hist-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="hist-tool" data-tool-root>
  <div class="hist-hero">
    <div class="hist-hero-icon" aria-hidden="true">📜</div>
    <div>
      <p class="hist-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="hist-lead" data-t="lead"></p>
    </div>
    <div class="hist-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="hAudioNotice" class="hist-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="hist-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="tl" data-t="tab_tl"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="bd" data-t="tab_bd"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="dr" data-t="tab_dr"></button>
  </div>
  <section id="h-tl" class="hist-panel" role="tabpanel">
    <div class="hist-grid">
      <article class="hist-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_tl"></h2></div>
          <div class="head-actions"><button id="tlPrev" class="btn" type="button" data-t="prev"></button><button id="tlNext" class="btn main" type="button" data-t="next"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_tl" role="img" data-ta="cv_tl"></canvas></div>
        <p id="hud_tl" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="tlL"></span><input id="tlPos" type="range" min="0" max="20" value="0" step="0.01"></label>
      </article>
      <div class="hist-side">
        <aside class="hist-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_tl"></span><h2 data-t="sh_tl"></h2></div></div>
          
          <div id="info_tl" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_tl" class="hist-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="h-bd" class="hist-panel hidden" role="tabpanel">
    <div class="hist-grid">
      <article class="hist-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_bd"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="battleL"><button type="button" data-battle="938" aria-pressed="true" data-t="b938"></button><button type="button" data-battle="1288" aria-pressed="false" data-t="b1288"></button></div><button id="bdPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_bd" role="img" data-ta="cv_bd"></canvas></div>
        <p id="hud_bd" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="progL"></span><input id="bdProg" type="range" min="0" max="1" value="0" step="0.005"></label>
        <div class="toggle-row" style="justify-content:flex-start;margin-top:8px"><button id="bdSee" class="soft-btn" type="button" aria-pressed="true" data-t="seeStakes"></button></div>
      </article>
      <div class="hist-side">
        <aside class="hist-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_bd"></span><h2 data-t="sh_bd"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_tide" role="img" aria-hidden="true"></canvas></div>
          <div id="info_bd" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_bd" class="hist-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="h-dr" class="hist-panel hidden" role="tabpanel">
    <div class="hist-grid">
      <article class="hist-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_dr"></h2></div>
          <div class="head-actions"><button id="drFly" class="soft-btn" type="button" aria-pressed="true" data-t="fly"></button><button id="drBeat" class="btn main" type="button" data-t="beat"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_dr" role="img" data-ta="cv_dr"></canvas></div>
        <p id="hud_dr" class="hud" aria-live="polite"></p>
      </article>
      <div class="hist-side">
        <aside class="hist-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_dr"></span><h2 data-t="sh_dr"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_drSide" role="img" aria-hidden="true"></canvas></div>
          <div id="info_dr" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_dr" class="hist-card quiz-card"></article>
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
    const audioNotice = $('hAudioNotice');
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
      kicker: ['Epsilon Edu · Lịch sử trực quan', 'Epsilon Edu · Visual History'],
      title: ['Lịch sử Việt Nam', 'Vietnamese History'],
      lead: ['Kéo dòng thời gian đi qua hàng nghìn năm, xem mưu kế cọc gỗ trên sông Bạch Đằng và khám phá hoa văn trên mặt trống đồng Đông Sơn.', 'Drag through thousands of years, see the wooden-stake plan on the Bach Dang River, and explore the patterns on a Dong Son bronze drum.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Khám phá', 'Explore'],
      tab_tl: ['📜 Dòng thời gian', '📜 Timeline'], h_tl: ['Kéo để đi qua các thời kỳ', 'Drag through the ages'],
      cv_tl: ['Dòng thời gian lịch sử Việt Nam, kéo sang trái phải để xem các sự kiện', 'A timeline of Vietnamese history; drag left and right to see events'],
      se_tl: ['Sự kiện', 'Event'], sh_tl: ['Chuyện gì đã xảy ra?', 'What happened?'],
      tab_bd: ['⚓ Trận Bạch Đằng', '⚓ Bach Dang battle'], h_bd: ['Mưu kế cọc gỗ và nước triều', 'Wooden stakes and the tide'],
      cv_bd: ['Lát cắt dòng sông: nước triều lên che cọc, triều rút làm thuyền địch mắc cọc', 'A river cross-section: high tide hides the stakes, low tide traps the enemy ships'],
      se_bd: ['Mực nước', 'Water level'], sh_bd: ['Nước triều lên, xuống', 'The tide rises and falls'],
      tab_dr: ['🥁 Trống đồng Đông Sơn', '🥁 Dong Son drum'], h_dr: ['Mặt trống đồng Ngọc Lũ', 'The face of the Ngoc Lu drum'],
      cv_dr: ['Mặt trống đồng với ngôi sao ở giữa và các vành hoa văn. Bấm vào từng vành để tìm hiểu', 'A bronze drum face with a star in the middle and rings of patterns. Tap a ring to learn about it'],
      se_dr: ['Nhìn ngang', 'Side view'], sh_dr: ['Các phần của trống', 'Parts of the drum'],
      tlL: ['Kéo để đi theo dòng thời gian', 'Drag along the timeline'], prev: ['◀ Trước', '◀ Back'], next: ['Sau ▶', 'Next ▶'],
      progL: ['Kéo để xem diễn biến trận đánh', 'Drag to follow the battle'], seeStakes: ['👁️ Nhìn xuyên mặt nước', '👁️ See under water'],
      b938: ['Năm 938', 'Year 938'], b1288: ['Năm 1288', 'Year 1288'], battleL: ['Chọn trận', 'Pick a battle'],
      beat: ['🥁 Đánh trống', '🥁 Beat the drum'], fly: ['🕊️ Cho chim bay', '🕊️ Birds fly']
    };
    const playLbl = (on) => (on ? T('⏸ Tạm dừng', '⏸ Pause') : T('▶ Chạy', '▶ Play'));
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;

    /* =====================================================================
       1. DÒNG THỜI GIAN (giản lược cho học sinh tiểu học)
       ===================================================================== */
    const ERAS = [
      { from: 0, to: 1, col: '#fde68a', vi: 'Văn Lang – Âu Lạc', en: 'Van Lang – Au Lac' },
      { from: 2, to: 5, col: '#e7e5e4', vi: 'Hơn 1000 năm Bắc thuộc', en: 'Over 1,000 years of Chinese rule' },
      { from: 6, to: 15, col: '#bbf7d0', vi: 'Các triều đại độc lập', en: 'Independent dynasties' },
      { from: 16, to: 20, col: '#bfdbfe', vi: 'Thời cận đại và hiện đại', en: 'Modern times' }
    ];
    const EV = [
      { y: T0('khoảng TK VII TCN', 'c. 7th century BC'), emo: '👑', vi: ['Nhà nước Văn Lang', 'Các vua Hùng dựng nước Văn Lang, kinh đô ở Phong Châu (Phú Thọ ngày nay). Đây là nhà nước đầu tiên của người Việt.', 'Ngày 10 tháng 3 âm lịch hằng năm là ngày Giỗ Tổ Hùng Vương.'], en: ['The Van Lang state', 'The Hung Kings founded Van Lang, with its capital at Phong Chau (today’s Phu Tho). It was the first Vietnamese state.', 'Every year, the 10th day of the 3rd lunar month honours the Hung Kings.'] },
      { y: T0('khoảng năm 208 TCN', 'c. 208 BC'), emo: '🏯', vi: ['Nhà nước Âu Lạc', 'An Dương Vương lập nước Âu Lạc, xây thành Cổ Loa hình xoáy trôn ốc (Đông Anh, Hà Nội).', 'Thành Cổ Loa có nhiều vòng thành, gắn với truyền thuyết nỏ thần.'], en: ['The Au Lac state', 'King An Duong Vuong founded Au Lac and built the spiral citadel of Co Loa (Dong Anh, Hanoi).', 'Co Loa had several rings of walls and is linked to the legend of the magic crossbow.'] },
      { y: T0('năm 179 TCN', '179 BC'), emo: '⛓️', vi: ['Bắt đầu thời Bắc thuộc', 'Âu Lạc bị Triệu Đà chiếm. Nước ta bị các triều đại phong kiến phương Bắc cai trị hơn 1000 năm.', 'Dù bị đô hộ rất lâu, người Việt vẫn giữ tiếng nói và phong tục của mình.'], en: ['Chinese rule begins', 'Au Lac was conquered by Zhao Tuo. For over 1,000 years the land was ruled by northern Chinese dynasties.', 'Despite the long rule, the Vietnamese kept their language and customs.'] },
      { y: T0('năm 40', 'AD 40'), emo: '🐘', vi: ['Khởi nghĩa Hai Bà Trưng', 'Trưng Trắc và Trưng Nhị cưỡi voi đánh đuổi quân Hán, giành lại độc lập trong ba năm.', 'Hai Bà Trưng là những nữ anh hùng đầu tiên được ghi trong sử sách nước ta.'], en: ['The Trung Sisters’ uprising', 'Trung Trac and Trung Nhi rode elephants to drive out the Han army and won three years of independence.', 'They are the first heroines recorded in Vietnamese history.'] },
      { y: T0('năm 248', 'AD 248'), emo: '⚔️', vi: ['Khởi nghĩa Bà Triệu', 'Bà Triệu (Triệu Thị Trinh) ở Thanh Hóa lãnh đạo nhân dân chống quân Ngô.', 'Câu nói nổi tiếng của bà thể hiện ý chí không chịu làm nô lệ.'], en: ['Lady Trieu’s uprising', 'Lady Trieu (Trieu Thi Trinh) of Thanh Hoa led people against the Wu army.', 'Her famous words show her refusal to live as a servant.'] },
      { y: T0('năm 544', 'AD 544'), emo: '🏳️', vi: ['Nước Vạn Xuân', 'Lý Bí đánh đuổi quân Lương, lên ngôi vua, đặt tên nước là Vạn Xuân.', 'Vạn Xuân nghĩa là "muôn mùa xuân", mong nước nhà bền vững lâu dài.'], en: ['The Van Xuan state', 'Ly Bi drove out the Liang army, became king and named the country Van Xuan.', 'Van Xuan means “ten thousand springs”, a wish for a long-lasting nation.'] },
      { y: T0('năm 938', 'AD 938'), emo: '⚓', vi: ['Chiến thắng Bạch Đằng', 'Ngô Quyền dùng cọc gỗ và nước triều đánh tan quân Nam Hán trên sông Bạch Đằng, chấm dứt hơn 1000 năm Bắc thuộc.', 'Xem tab "Trận Bạch Đằng" để thấy mưu kế cọc gỗ!'], en: ['Victory at Bach Dang', 'Ngo Quyen used wooden stakes and the tide to defeat the Southern Han fleet, ending over 1,000 years of Chinese rule.', 'See the “Bach Dang battle” tab for the stake plan!'] },
      { y: T0('năm 968', 'AD 968'), emo: '🐃', vi: ['Nước Đại Cồ Việt', 'Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước, đặt tên nước là Đại Cồ Việt, đóng đô ở Hoa Lư (Ninh Bình).', 'Theo truyền thuyết, thuở nhỏ ông cùng các bạn chăn trâu lấy bông lau làm cờ tập trận.'], en: ['Dai Co Viet', 'Dinh Bo Linh ended the turmoil of the 12 warlords, united the land, named it Dai Co Viet, with its capital at Hoa Lu (Ninh Binh).', 'Legend says as a boy herding buffalo he played battles using reed flowers as flags.'] },
      { y: T0('năm 981', 'AD 981'), emo: '🛡️', vi: ['Lê Hoàn đánh thắng quân Tống', 'Vua Lê Hoàn lãnh đạo quân dân đánh bại cuộc tấn công của quân Tống.', 'Trận này cũng diễn ra trên vùng sông Bạch Đằng.'], en: ['Le Hoan defeats the Song', 'King Le Hoan led the people in defeating a Song invasion.', 'This fight also took place around the Bach Dang River.'] },
      { y: T0('năm 1010', 'AD 1010'), emo: '🐉', vi: ['Dời đô ra Thăng Long', 'Vua Lý Công Uẩn dời đô từ Hoa Lư ra Đại La, đổi tên là Thăng Long, nay là Hà Nội.', 'Thăng Long nghĩa là "rồng bay lên". Năm 2010, Hà Nội kỷ niệm 1000 năm Thăng Long.'], en: ['Moving the capital to Thang Long', 'King Ly Cong Uan moved the capital from Hoa Lu to Dai La and renamed it Thang Long, today’s Hanoi.', 'Thang Long means “rising dragon”. Hanoi celebrated 1,000 years in 2010.'] },
      { y: T0('năm 1075 – 1077', '1075 – 1077'), emo: '📜', vi: ['Lý Thường Kiệt chống quân Tống', 'Lý Thường Kiệt chủ động đánh trước rồi chặn giặc bên sông Như Nguyệt (sông Cầu).', 'Bài thơ "Nam quốc sơn hà" gắn với cuộc kháng chiến này, được xem là bản tuyên ngôn độc lập đầu tiên.'], en: ['Ly Thuong Kiet resists the Song', 'Ly Thuong Kiet struck first, then held the enemy at the Nhu Nguyet River (Cau River).', 'The poem “Nam quoc son ha” is linked to this war and is called the first declaration of independence.'] },
      { y: T0('1258 – 1288', '1258 – 1288'), emo: '🏹', vi: ['Ba lần thắng quân Mông – Nguyên', 'Nhà Trần ba lần đánh thắng quân Mông – Nguyên. Năm 1288, Trần Hưng Đạo lại dùng cọc gỗ trên sông Bạch Đằng.', 'Hội nghị Diên Hồng: các bô lão đồng thanh hô "Đánh!".'], en: ['Three victories over the Mongols', 'The Tran dynasty beat the Mongol – Yuan armies three times. In 1288 Tran Hung Dao again used stakes on the Bach Dang.', 'At the Dien Hong meeting, the elders all shouted “Fight!”.'] },
      { y: T0('năm 1428', 'AD 1428'), emo: '🗡️', vi: ['Lê Lợi đánh thắng quân Minh', 'Sau 10 năm khởi nghĩa Lam Sơn, Lê Lợi giành lại độc lập, lập nhà Hậu Lê. Nguyễn Trãi viết "Bình Ngô đại cáo".', 'Truyền thuyết Hồ Gươm kể chuyện vua trả gươm thần cho Rùa Vàng.'], en: ['Le Loi defeats the Ming', 'After 10 years of the Lam Son uprising, Le Loi won independence and founded the Later Le dynasty. Nguyen Trai wrote the “Great Proclamation”.', 'The legend of Hoan Kiem Lake tells of the king returning a magic sword to the Golden Turtle.'] },
      { y: T0('năm 1789', 'AD 1789'), emo: '🌸', vi: ['Quang Trung đại phá quân Thanh', 'Dịp Tết Kỷ Dậu, vua Quang Trung hành quân thần tốc ra Bắc, đánh tan quân Thanh ở Ngọc Hồi – Đống Đa.', 'Lễ hội gò Đống Đa ở Hà Nội tổ chức vào mùng 5 Tết để tưởng nhớ chiến thắng này.'], en: ['Quang Trung routs the Qing', 'At Lunar New Year 1789, Emperor Quang Trung marched north at lightning speed and routed the Qing army at Ngoc Hoi – Dong Da.', 'Hanoi’s Dong Da festival on the 5th day of Tet remembers this victory.'] },
      { y: T0('năm 1802', 'AD 1802'), emo: '🏛️', vi: ['Nhà Nguyễn', 'Nhà Nguyễn được thành lập, kinh đô đặt ở Phú Xuân (Huế).', 'Quần thể di tích Cố đô Huế là Di sản văn hóa thế giới.'], en: ['The Nguyen dynasty', 'The Nguyen dynasty was founded, with its capital at Phu Xuan (Hue).', 'The Hue Monuments are a World Heritage Site.'] },
      { y: T0('năm 1858', 'AD 1858'), emo: '⚓', vi: ['Thực dân Pháp xâm lược', 'Pháp nổ súng tấn công Đà Nẵng, mở đầu thời kỳ đô hộ của thực dân Pháp.', 'Nhân dân ta đã đứng lên chống Pháp ở khắp nơi.'], en: ['French invasion', 'France attacked Da Nang, beginning the period of French colonial rule.', 'People rose up against French rule all over the country.'] },
      { y: T0('năm 1945', '1945'), emo: '⭐', vi: ['Cách mạng tháng Tám', 'Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.', 'Ngày 2 tháng 9 là ngày Quốc khánh của Việt Nam.'], en: ['The August Revolution', 'On 2 September 1945, at Ba Dinh Square, President Ho Chi Minh read the Declaration of Independence, founding the Democratic Republic of Vietnam.', '2 September is Vietnam’s National Day.'] },
      { y: T0('năm 1954', '1954'), emo: '🏔️', vi: ['Chiến thắng Điện Biên Phủ', 'Ngày 7 tháng 5 năm 1954, quân ta chiến thắng ở Điện Biên Phủ, kết thúc cuộc kháng chiến chống thực dân Pháp.', 'Chiến thắng này "lừng lẫy năm châu, chấn động địa cầu".'], en: ['Victory at Dien Bien Phu', 'On 7 May 1954, Vietnamese forces won at Dien Bien Phu, ending the war against French rule.', 'It became famous around the world.'] },
      { y: T0('năm 1975', '1975'), emo: '🕊️', vi: ['Thống nhất đất nước', 'Ngày 30 tháng 4 năm 1975, miền Nam được giải phóng, đất nước thống nhất.', 'Năm 1976, nước ta lấy tên là Cộng hòa xã hội chủ nghĩa Việt Nam.'], en: ['Reunification', 'On 30 April 1975 the war ended and the country was reunified.', 'In 1976 the country was named the Socialist Republic of Vietnam.'] },
      { y: T0('năm 1986', '1986'), emo: '🌱', vi: ['Đổi mới', 'Việt Nam bắt đầu công cuộc Đổi mới, phát triển kinh tế và mở cửa với thế giới.', 'Từ đó đời sống của người dân được cải thiện rất nhiều.'], en: ['Doi Moi (Renewal)', 'Vietnam began the Doi Moi reforms, growing the economy and opening up to the world.', 'Since then, people’s lives have improved a great deal.'] },
      { y: T0('hôm nay', 'today'), emo: '🧒', vi: ['Và em hôm nay', 'Lịch sử vẫn đang được viết tiếp. Học tập tốt hôm nay là góp phần xây dựng đất nước ngày mai.', '"Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam." (Hồ Chí Minh)'], en: ['And you, today', 'History is still being written. Learning well today helps build the country of tomorrow.', '“Our people must know our history.” (Ho Chi Minh)'] }
    ];
    function T0(vi, en) { return { vi, en }; }
    let tlPos = 0, tlTarget = 0, tlDrag = null, tlInfoIdx = -1, tlInfoLang = '';
    const tlC = mk('c_tl', (w) => clamp(w * .5, 260, 400));
    $('tlPos').max = String(EV.length - 1);
    function drawTl(dt) {
      const { w, h, ctx } = tlC;
      if (!w) return;
      if (!tlDrag) tlPos += (tlTarget - tlPos) * Math.min(1, dt * 8);
      ctx.fillStyle = '#fffbeb'; ctx.fillRect(0, 0, w, h);
      const gap = Math.max(110, w * .2), X = (i) => w / 2 + (i - tlPos) * gap, ly = h * .58;
      for (const e of ERAS) {
        const x0 = X(e.from - .5), x1 = X(e.to + .5);
        ctx.fillStyle = e.col; ctx.fillRect(x0, h * .1, x1 - x0, h * .12);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, h * .1); ctx.lineTo(x0, h * .22); ctx.stroke();
        const cx = clamp(w / 2, x0 + 80, x1 - 80);
        if (x1 - x0 > 60) textLight(ctx, L(e), clamp(cx, x0 + 6, x1 - 6), h * .16, '#44403c', w < 420 ? 10.5 : 12, 'center', 900);
      }
      ctx.strokeStyle = '#a16207'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(w, ly); ctx.stroke();
      const cur = Math.round(clamp(tlPos, 0, EV.length - 1));
      EV.forEach((e, i) => {
        const x = X(i); if (x < -80 || x > w + 80) return;
        const d = Math.abs(i - tlPos), on = i === cur, r = on ? 26 : 19;
        ctx.fillStyle = on ? '#fef3c7' : '#fff'; ctx.strokeStyle = on ? '#d97706' : '#e7d7b5'; ctx.lineWidth = on ? 3 : 2;
        ctx.beginPath(); ctx.arc(x, ly, r, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.font = emojiFont(on ? 24 : 18); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e.emo, x, ly + 1);
        ctx.globalAlpha = clamp(1.6 - d * .5, .25, 1);
        textLight(ctx, L(e.y), x, ly + r + 14, on ? '#b45309' : '#78716c', on ? 13 : 11, 'center', 900);
        const title = L({ vi: e.vi[0], en: e.en[0] });
        if (d < 1.6) {
          ctx.font = `900 ${on ? 13 : 11}px system-ui, sans-serif`;
          const words = title.split(' '); let line = '', lines = [];
          for (const wd of words) { const t = line ? line + ' ' + wd : wd; if (ctx.measureText(t).width > gap * .9 && line) { lines.push(line); line = wd; } else line = t; }
          lines.push(line);
          lines.slice(0, 2).forEach((ln, k) => textLight(ctx, ln, x, ly - r - 14 - (Math.min(2, lines.length) - 1 - k) * 15, on ? '#78350f' : '#57534e', on ? 13 : 11, 'center', 900));
        }
        ctx.globalAlpha = 1;
      });
      ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.moveTo(w / 2 - 8, h - 4); ctx.lineTo(w / 2 + 8, h - 4); ctx.lineTo(w / 2, h - 16); ctx.closePath(); ctx.fill();
      textLight(ctx, T('◀ kéo sang trái, phải ▶', '◀ drag left or right ▶'), w / 2, h - 26, '#a8a29e', 10.5, 'center', 800);
    }
    function tlSet(i) { tlTarget = clamp(Math.round(i), 0, EV.length - 1); $('tlPos').value = String(tlTarget); }
    tlC.c.addEventListener('pointerdown', (e) => { cancelSpeech(); tlDrag = { x: localPoint(tlC.c, e).x, pos: tlPos }; try { tlC.c.setPointerCapture(e.pointerId); } catch (_) {} });
    tlC.c.addEventListener('pointermove', (e) => { if (!tlDrag) return; const gap = Math.max(110, tlC.w * .2); tlPos = clamp(tlDrag.pos - (localPoint(tlC.c, e).x - tlDrag.x) / gap, -.4, EV.length - .6); $('tlPos').value = String(clamp(tlPos, 0, EV.length - 1)); });
    const tlEnd = () => { if (!tlDrag) return; tlDrag = null; tlSet(tlPos); };
    tlC.c.addEventListener('pointerup', tlEnd); tlC.c.addEventListener('pointercancel', tlEnd);
    $('tlPos').addEventListener('input', () => { cancelSpeech(); tlPos = +$('tlPos').value; tlTarget = Math.round(tlPos); });
    $('tlPos').addEventListener('change', () => tlSet(+$('tlPos').value));
    $('tlPrev').onclick = () => { cancelSpeech(); tlSet(tlTarget - 1); };
    $('tlNext').onclick = () => { cancelSpeech(); tlSet(tlTarget + 1); };
    function tlInfo() {
      const i = Math.round(clamp(tlPos, 0, EV.length - 1));
      if (i === tlInfoIdx && lang === tlInfoLang) return;
      tlInfoIdx = i; tlInfoLang = lang;
      const e = EV[i], d = L({ vi: e.vi, en: e.en }), era = ERAS.find((x) => i >= x.from && i <= x.to);
      infoBox($('info_tl'), { emo: e.emo, title: d[0], sub: `${L(e.y)}${era ? ' – ' + L(era) : ''}`, rows: [[T('Chuyện gì?', 'What happened?'), d[1]]], notes: [['fun', '✨ ' + d[2]]] });
      setText('hud_tl', `${e.emo} ${L(e.y)} – ${d[0]} (${i + 1}/${EV.length})`);
    }
    TABS.tl = { frame(dt) { drawTl(dt); tlInfo(); }, refresh() { tlInfoIdx = -1; tlInfo(); } };
    QUIZZES.push(makeQuiz($('quiz_tl'), {
      vi: [
        { q: 'Nhà nước đầu tiên của người Việt là gì?', a: ['Văn Lang', 'Đại Việt', 'Vạn Xuân', 'Âu Lạc'], why: 'Các vua Hùng dựng nước Văn Lang, kinh đô Phong Châu.' },
        { q: 'Ai đã xây thành Cổ Loa?', a: ['An Dương Vương', 'Lý Công Uẩn', 'Ngô Quyền', 'Quang Trung'], why: 'An Dương Vương lập nước Âu Lạc và xây thành Cổ Loa.' },
        { q: 'Ai cưỡi voi đánh đuổi quân Hán năm 40?', a: ['Hai Bà Trưng', 'Bà Triệu', 'Lý Bí', 'Lê Lợi'], why: 'Trưng Trắc và Trưng Nhị khởi nghĩa năm 40.' },
        { q: 'Năm 1010, vua Lý Công Uẩn dời đô về đâu?', a: ['Thăng Long (Hà Nội)', 'Huế', 'Hoa Lư', 'Cổ Loa'], why: 'Ông dời đô ra Đại La, đổi tên là Thăng Long.' },
        { q: 'Ai đọc bản Tuyên ngôn Độc lập ngày 2/9/1945?', a: ['Chủ tịch Hồ Chí Minh', 'Vua Quang Trung', 'Trần Hưng Đạo', 'Lý Thường Kiệt'], why: 'Tại Quảng trường Ba Đình, Hà Nội.' },
        { q: 'Vua nào hành quân thần tốc đánh tan quân Thanh dịp Tết năm 1789?', a: ['Quang Trung', 'Lê Lợi', 'Đinh Bộ Lĩnh', 'Lê Hoàn'], why: 'Chiến thắng Ngọc Hồi – Đống Đa dịp Tết Kỷ Dậu.' }
      ],
      en: [
        { q: 'What was the first Vietnamese state?', a: ['Van Lang', 'Dai Viet', 'Van Xuan', 'Au Lac'], why: 'The Hung Kings founded Van Lang with its capital at Phong Chau.' },
        { q: 'Who built the Co Loa citadel?', a: ['An Duong Vuong', 'Ly Cong Uan', 'Ngo Quyen', 'Quang Trung'], why: 'An Duong Vuong founded Au Lac and built Co Loa.' },
        { q: 'Who rode elephants against the Han army in AD 40?', a: ['The Trung Sisters', 'Lady Trieu', 'Ly Bi', 'Le Loi'], why: 'Trung Trac and Trung Nhi rose up in AD 40.' },
        { q: 'Where did King Ly Cong Uan move the capital in 1010?', a: ['Thang Long (Hanoi)', 'Hue', 'Hoa Lu', 'Co Loa'], why: 'He moved it to Dai La and named it Thang Long.' },
        { q: 'Who read the Declaration of Independence on 2/9/1945?', a: ['President Ho Chi Minh', 'Emperor Quang Trung', 'Tran Hung Dao', 'Ly Thuong Kiet'], why: 'At Ba Dinh Square in Hanoi.' },
        { q: 'Which emperor routed the Qing army at Tet in 1789?', a: ['Quang Trung', 'Le Loi', 'Dinh Bo Linh', 'Le Hoan'], why: 'The victory at Ngoc Hoi – Dong Da during Lunar New Year.' }
      ]
    }));

    /* =====================================================================
       2. TRẬN BẠCH ĐẰNG: cọc gỗ + nước triều
       ===================================================================== */
    const BATTLE = {
      938: { vi: { who: 'Ngô Quyền', foe: 'quân Nam Hán', after: 'Chấm dứt hơn 1000 năm Bắc thuộc, mở ra thời kỳ độc lập lâu dài.' }, en: { who: 'Ngo Quyen', foe: 'the Southern Han fleet', after: 'Ended over 1,000 years of Chinese rule and began a long era of independence.' } },
      1288: { vi: { who: 'Trần Hưng Đạo', foe: 'quân Nguyên Mông', after: 'Đánh tan đoàn thuyền lương và chiến thuyền, kết thúc cuộc kháng chiến lần thứ ba chống quân Nguyên Mông.' }, en: { who: 'Tran Hung Dao', foe: 'the Mongol – Yuan fleet', after: 'Destroyed the enemy fleet and ended the third war against the Mongol – Yuan armies.' } }
    };
    let bd = { p: 0, playing: !reduceMotion, see: true, battle: 938, infoKey: '' };
    const bdC = mk('c_bd', (w) => clamp(w * .58, 280, 470));
    const tideC = mk('c_tide', (w) => clamp(w * .42, 130, 180));
    const PHASES = [
      { to: .22, vi: ['Nước triều lên', 'Nước dâng cao che kín bãi cọc. Thuyền nhẹ của ta ra cửa sông khiêu chiến.'], en: ['High tide', 'High water hides the stakes. Light Vietnamese boats row out to provoke the enemy.'] },
      { to: .45, vi: ['Giả vờ thua chạy', 'Thuyền ta giả thua, rút vào sông. Thuyền địch to nặng đuổi theo, vượt qua bãi cọc mà không biết.'], en: ['A pretend retreat', 'The Vietnamese boats pretend to flee upriver. The big, heavy enemy ships chase them right over the hidden stakes.'] },
      { to: .75, vi: ['Nước triều rút', 'Nước rút nhanh, cọc nhô lên. Thuyền địch mắc cọc, bị đâm thủng, không chạy được.'], en: ['The tide goes out', 'The water drops fast and the stakes rise up. Enemy ships get stuck and holed, unable to escape.'] },
      { to: 1.01, vi: ['Phản công', 'Quân ta từ hai bên bờ và thuyền nhỏ đổ ra đánh. Thuyền địch tan vỡ, ta toàn thắng.'], en: ['The counter-attack', 'Troops from both banks and small boats attack. The enemy fleet breaks apart: a complete victory.'] }
    ];
    const bdPhase = () => PHASES.findIndex((f) => bd.p < f.to);
    const water = (p) => 1 - ease((p - .42) / .3);
    const STAKES = Array.from({ length: 11 }, (_, i) => ({ x: .3 + i * .045 + (i % 2) * .012, hgt: .8 + (i % 3) * .08 }));
    function drawBd() {
      const { w, h, ctx } = bdC;
      if (!w) return;
      const bed = h * .9, hi = h * .44, lo = h * .74, wl = lerp(lo, hi, water(bd.p));
      const sky = ctx.createLinearGradient(0, 0, 0, hi); sky.addColorStop(0, '#bae6fd'); sky.addColorStop(1, '#f0f9ff');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      // bờ sông hai bên (nhìn ngang dọc dòng sông: trái là thượng nguồn, phải là biển)
      ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.moveTo(0, hi - h * .1); ctx.quadraticCurveTo(w * .12, hi - h * .14, w * .2, hi - h * .02); ctx.lineTo(w * .2, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#4d7c0f'; for (let k = 0; k < 4; k++) { const x = w * (.02 + k * .045), y = hi - h * .12; ctx.beginPath(); ctx.moveTo(x, y + 12); ctx.lineTo(x + 10, y - 14); ctx.lineTo(x + 20, y + 12); ctx.fill(); }
      // lòng sông
      ctx.fillStyle = '#a16207'; ctx.fillRect(0, bed, w, h - bed);
      // cọc
      const stakeTop = (s) => bed - (bed - lo) * s.hgt * 1.08 - h * .02;
      for (const s of STAKES) {
        const x = s.x * w, top = stakeTop(s);
        ctx.fillStyle = '#5b3a1a'; ctx.fillRect(x - 4, top + 8, 8, bed - top - 6);
        ctx.fillStyle = '#9ca3af'; ctx.beginPath(); ctx.moveTo(x - 4, top + 9); ctx.lineTo(x + 4, top + 9); ctx.lineTo(x, top - 4); ctx.closePath(); ctx.fill();
      }
      // nước (che cọc nếu không "nhìn xuyên")
      ctx.fillStyle = bd.see ? 'rgba(14,116,144,.45)' : 'rgba(14,116,144,.94)';
      ctx.beginPath(); ctx.moveTo(w * .19, wl); for (let x = w * .19; x <= w; x += 8) ctx.lineTo(x, wl + Math.sin(x * .05 + clock * 2) * 2); ctx.lineTo(w, bed); ctx.lineTo(w * .19, bed); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let x = w * .19; x <= w; x += 8) { const y = wl + Math.sin(x * .05 + clock * 2) * 2; if (x <= w * .19) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke();
      // thuyền
      const p = bd.p, ph = bdPhase();
      const foeCol = bd.battle === 938 ? '#991b1b' : '#1e3a8a';
      const foe = [0, 1, 2].map((i) => {
        const startX = w * (1.12 + i * .16), chaseX = w * (.42 + i * .17);
        const x = p < .22 ? startX - (startX - w * (.88 + i * .1)) * (p / .22) : p < .45 ? lerp(w * (.88 + i * .1), chaseX, ease((p - .22) / .23)) : chaseX;
        const stuck = p > .52, tilt = stuck ? ease((p - .52) / .2) * (i % 2 ? .18 : -.14) : 0, broken = p > .85;
        return { x, tilt, broken, stuck };
      });
      for (const f of foe) {
        const s = Math.min(w, h) * .085, hullBottom = f.stuck ? Math.min(wl + s * .35, stakeTop({ hgt: .9 }) - 2) : wl + s * .35, y = hullBottom - s * .35;
        ctx.save(); ctx.translate(f.x, y); ctx.rotate(f.tilt);
        ctx.fillStyle = f.broken ? '#57534e' : '#78350f'; ctx.beginPath(); ctx.moveTo(-s * 1.3, -s * .2); ctx.lineTo(s * 1.3, -s * .2); ctx.lineTo(s * .9, s * .35); ctx.lineTo(-s * .9, s * .35); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#3f2a14'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -s * .2); ctx.lineTo(0, -s * 1.6); ctx.stroke();
        if (!f.broken) { ctx.fillStyle = foeCol; ctx.beginPath(); ctx.moveTo(2, -s * 1.5); ctx.lineTo(s * .9, -s * .5); ctx.lineTo(2, -s * .45); ctx.closePath(); ctx.fill(); }
        else { ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-s * .3 + k * s * .3, -s * .3); ctx.lineTo(-s * .2 + k * s * .3 + Math.sin(clock * 9 + k) * 3, -s * .9); ctx.stroke(); } }
        ctx.restore();
      }
      const our = [0, 1, 2, 3].map((i) => {
        const base = w * (.24 + i * .035);
        const x = p < .22 ? lerp(base, w * (.62 + i * .05), ease(p / .22)) : p < .45 ? lerp(w * (.62 + i * .05), base, ease((p - .22) / .23)) : p < .75 ? base : lerp(base, w * (.36 + i * .14), ease((p - .75) / .2));
        return x;
      });
      for (const x of our) {
        const s = Math.min(w, h) * .04, y = wl - s * .1;
        ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.moveTo(x - s * 1.4, y - s * .1); ctx.lineTo(x + s * 1.4, y - s * .1); ctx.lineTo(x + s, y + s * .35); ctx.lineTo(x - s, y + s * .35); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.moveTo(x, y - s * 1.4); ctx.lineTo(x + s * .8, y - s * .9); ctx.lineTo(x, y - s * .5); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#3f2a14'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - s * .1); ctx.lineTo(x, y - s * 1.4); ctx.stroke();
      }
      if (ph === 3) for (let k = 0; k < 6; k++) { const x = w * .05 + k * 10; ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(x, hi - h * .16 - (k % 2) * 4, 3.5, 0, TAU); ctx.fill(); }
      const fs = w < 420 ? 10 : 11.5;
      textLight(ctx, T('← Thượng nguồn', '← Upriver'), w * .22, h * .06, '#334155', fs, 'left', 900);
      textLight(ctx, T('Ra biển →', 'To the sea →'), w - 8, h * .06, '#334155', fs, 'right', 900);
      textLight(ctx, T('Bãi cọc gỗ đầu bịt sắt', 'Iron-tipped wooden stakes'), w * .53, bed + (h - bed) / 2, '#fef3c7', fs, 'center', 900);
      bubble(ctx, L(PHASES[ph])[0], w * .55, h * .17, w < 420 ? 11 : 13);
    }
    function drawTide() {
      const { w, h, ctx } = tideC;
      if (!w) return;
      ctx.fillStyle = '#f0f9ff'; ctx.fillRect(0, 0, w, h);
      const x0 = 34, x1 = w - 10, y0 = 12, y1 = h - 22, Y = (v) => lerp(y1, y0, v);
      ctx.strokeStyle = '#bae6fd'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.fillStyle = 'rgba(14,116,144,.25)'; ctx.beginPath(); ctx.moveTo(x0, y1);
      for (let i = 0; i <= 60; i++) { const t = i / 60; ctx.lineTo(lerp(x0, x1, t), Y(.15 + .75 * water(t))); } ctx.lineTo(x1, y1); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#0e7490'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const t = i / 60, x = lerp(x0, x1, t), y = Y(.15 + .75 * water(t)); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke();
      ctx.strokeStyle = '#78350f'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x0, Y(.55)); ctx.lineTo(x1, Y(.55)); ctx.stroke(); ctx.setLineDash([]);
      textLight(ctx, T('đỉnh cọc', 'stake tops'), x1, Y(.55) - 8, '#78350f', 10, 'right', 900);
      const mx = lerp(x0, x1, bd.p); ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(mx, Y(.15 + .75 * water(bd.p)), 5, 0, TAU); ctx.fill();
      textLight(ctx, T('cao', 'high'), x0 - 4, y0 + 4, '#64748b', 10, 'right', 800); textLight(ctx, T('thấp', 'low'), x0 - 4, y1 - 4, '#64748b', 10, 'right', 800);
      textLight(ctx, T('diễn biến trận đánh →', 'battle progress →'), (x0 + x1) / 2, h - 8, '#64748b', 10, 'center', 800);
    }
    function bdInfo() {
      const ph = bdPhase(), key = [lang, bd.battle, ph].join('|');
      if (key === bd.infoKey) return; bd.infoKey = key;
      const B = L(BATTLE[bd.battle]), P = L(PHASES[ph]);
      infoBox($('info_bd'), {
        emo: '⚓', title: T(`Trận Bạch Đằng năm ${bd.battle}`, `The Battle of Bach Dang, ${bd.battle}`), sub: `${T('Bước', 'Step')} ${ph + 1}/4: ${P[0]}`,
        rows: [[T('Diễn biến', 'What’s happening'), P[1]], [T('Chỉ huy', 'Leader'), B.who], [T('Đánh thắng', 'Defeated'), B.foe], [T('Ý nghĩa', 'Why it matters'), B.after]],
        notes: [['fun', T('✨ Vùng cửa sông Bạch Đằng mỗi ngày thường chỉ có một lần nước lên, một lần nước xuống, nên ông cha ta tính được giờ triều rất chính xác. Ngày nay ở Quảng Ninh, Hải Phòng vẫn còn tìm thấy những bãi cọc gỗ xưa.', '✨ At the Bach Dang mouth the tide usually rises and falls just once a day, so the timing could be worked out precisely. Old stake fields are still found today in Quang Ninh and Hai Phong.')]]
      });
    }
    const setBdPlaying = (on) => { bd.playing = on; $('bdPlay').textContent = playLbl(on); };
    $('bdPlay').onclick = () => { cancelSpeech(); if (!bd.playing && bd.p >= 1) bd.p = 0; setBdPlaying(!bd.playing); };
    $('bdProg').addEventListener('input', () => { cancelSpeech(); setBdPlaying(false); bd.p = +$('bdProg').value; });
    $('bdSee').onclick = () => { bd.see = !bd.see; $('bdSee').setAttribute('aria-pressed', String(bd.see)); };
    root.querySelectorAll('[data-battle]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); bd.battle = +b.dataset.battle; pressGroup('[data-battle]', 'battle', bd.battle); bd.p = 0; $('bdProg').value = '0'; }));
    TABS.bd = {
      frame(dt) {
        if (bd.playing) { bd.p = Math.min(1, bd.p + dt / 22); $('bdProg').value = String(bd.p); if (bd.p >= 1) setBdPlaying(false); }
        drawBd(); drawTide(); bdInfo();
        setText('hud_bd', `⚓ ${L(PHASES[bdPhase()])[0]} – ${T('mực nước', 'water level')} ${water(bd.p) > .5 ? T('cao, cọc bị che khuất', 'high: stakes hidden') : T('thấp, cọc nhô lên', 'low: stakes exposed')}`);
      },
      refresh() { setBdPlaying(bd.playing); bd.infoKey = ''; bdInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_bd'), {
      vi: [
        { q: 'Năm 938, ai chỉ huy trận Bạch Đằng?', a: ['Ngô Quyền', 'Trần Hưng Đạo', 'Lê Lợi', 'Quang Trung'], why: 'Ngô Quyền đánh tan quân Nam Hán năm 938.' },
        { q: 'Cọc gỗ được cắm ở đâu?', a: ['Dưới lòng sông, gần cửa biển', 'Trên đỉnh núi', 'Giữa cánh đồng', 'Trong thành Cổ Loa'], why: 'Cọc cắm ở lòng sông Bạch Đằng, đầu cọc bịt sắt nhọn.' },
        { q: 'Vì sao lúc đầu quân địch không thấy bãi cọc?', a: ['Nước triều lên che kín cọc', 'Vì trời tối', 'Vì cọc tàng hình', 'Vì có sương mù'], why: 'Khi triều lên, nước dâng cao phủ kín đầu cọc.' },
        { q: 'Khi nào thuyền địch bị mắc cọc?', a: ['Khi nước triều rút xuống', 'Khi nước triều lên', 'Khi có gió to', 'Khi trời mưa'], why: 'Nước rút, cọc nhô lên đâm thủng thuyền địch.' },
        { q: 'Năm 1288, ai lại dùng mưu cọc gỗ trên sông Bạch Đằng?', a: ['Trần Hưng Đạo', 'Lý Thường Kiệt', 'Đinh Bộ Lĩnh', 'Hai Bà Trưng'], why: 'Trần Hưng Đạo đánh tan quân Nguyên Mông năm 1288.' },
        { q: 'Chiến thắng năm 938 có ý nghĩa gì?', a: ['Chấm dứt hơn 1000 năm Bắc thuộc', 'Dời đô ra Thăng Long', 'Thống nhất đất nước năm 1975', 'Xây thành Cổ Loa'], why: 'Mở ra thời kỳ độc lập lâu dài cho đất nước.' }
      ],
      en: [
        { q: 'Who led the Battle of Bach Dang in 938?', a: ['Ngo Quyen', 'Tran Hung Dao', 'Le Loi', 'Quang Trung'], why: 'Ngo Quyen defeated the Southern Han fleet in 938.' },
        { q: 'Where were the stakes placed?', a: ['In the riverbed near the sea', 'On a mountain top', 'In a rice field', 'Inside Co Loa'], why: 'In the Bach Dang riverbed, with iron-tipped points.' },
        { q: 'Why couldn’t the enemy see the stakes at first?', a: ['High tide covered them', 'It was dark', 'They were invisible', 'It was foggy'], why: 'At high tide the water covered the stake tops.' },
        { q: 'When did the enemy ships get stuck?', a: ['When the tide went out', 'When the tide came in', 'In a strong wind', 'In the rain'], why: 'As the water fell, the stakes rose up and holed the ships.' },
        { q: 'Who used the stake plan again in 1288?', a: ['Tran Hung Dao', 'Ly Thuong Kiet', 'Dinh Bo Linh', 'The Trung Sisters'], why: 'Tran Hung Dao defeated the Mongol – Yuan fleet in 1288.' },
        { q: 'Why was the 938 victory important?', a: ['It ended over 1,000 years of Chinese rule', 'It moved the capital to Thang Long', 'It reunified the country in 1975', 'It built Co Loa'], why: 'It began a long era of independence.' }
      ]
    }));

    /* =====================================================================
       3. TRỐNG ĐỒNG ĐÔNG SƠN (mô phỏng giản lược mặt trống Ngọc Lũ)
       ===================================================================== */
    const RINGS = [
      { r0: 0, r1: .17, vi: ['Ngôi sao ở giữa', 'Ngôi sao nhiều cánh nổi lên ở chính giữa, tượng trưng cho Mặt Trời. Trống Ngọc Lũ có ngôi sao 14 cánh.', 'Người Việt cổ trồng lúa nước nên rất coi trọng Mặt Trời và mưa.'], en: ['The star in the centre', 'A many-pointed star stands out in the centre, a symbol of the Sun. The Ngoc Lu drum’s star has 14 points.', 'Ancient Vietnamese grew wet rice, so the Sun and rain mattered greatly.'] },
      { r0: .17, r1: .3, vi: ['Vành hoa văn hình học', 'Những vòng tròn có chấm giữa nối với nhau bằng đường tiếp tuyến, cùng các vạch ngắn song song.', 'Hoa văn được khắc sẵn trên khuôn rồi đúc bằng đồng nung chảy.'], en: ['Geometric ring', 'Dotted circles joined by tangent lines, and rows of short parallel strokes.', 'The patterns were carved into a mould, then filled with molten bronze.'] },
      { r0: .3, r1: .52, vi: ['Cảnh sinh hoạt', 'Người hóa trang đội mũ lông chim nhảy múa, thổi khèn, giã gạo, đánh trống; có cả nhà sàn mái cong.', 'Đây như một "bức ảnh" ghi lại cuộc sống của người Việt cổ hơn 2.000 năm trước.'], en: ['Daily life scenes', 'People in feathered headdresses dance, play pipes, pound rice and beat drums; there are stilt houses with curved roofs.', 'It is like a “photo” of ancient Vietnamese life over 2,000 years ago.'] },
      { r0: .52, r1: .68, vi: ['Vành muông thú', 'Hươu và chim nối đuôi nhau quanh mặt trống.', 'Cho thấy người xưa sống gần gũi với thiên nhiên, rừng núi, sông nước.'], en: ['Animal ring', 'Deer and birds follow one another around the drum.', 'It shows how close ancient people lived to forests, hills and rivers.'] },
      { r0: .68, r1: .9, vi: ['Chim Lạc bay', 'Vành ngoài có những con chim Lạc mỏ dài, đuôi dài, bay ngược chiều kim đồng hồ. Trống Ngọc Lũ có 18 con.', 'Chim Lạc gắn với người Lạc Việt, tổ tiên của người Việt.'], en: ['Flying Lac birds', 'The outer ring has long-beaked, long-tailed Lac birds flying anticlockwise. The Ngoc Lu drum has 18 of them.', 'Lac birds are linked to the Lac Viet, ancestors of the Vietnamese.'] },
      { r0: .9, r1: 1.01, vi: ['Viền ngoài', 'Các vành hoa văn nhỏ bao quanh mép mặt trống.', 'Trống Ngọc Lũ rộng khoảng 79 cm, cao khoảng 63 cm.'], en: ['Outer edge', 'Small patterned bands run round the rim.', 'The Ngoc Lu drum is about 79 cm wide and 63 cm tall.'] }
    ];
    let dr = { sel: 0, fly: !reduceMotion, ang: 0, ripples: [], infoKey: '' };
    const drC = mk('c_dr', (w) => clamp(w * .78, 300, 600));
    const drSide = mk('c_drSide', (w) => clamp(w * .6, 170, 240));
    const BRONZE = '#b08d57', DARK = '#5c4425';
    function bird(ctx, s) {
      ctx.beginPath(); ctx.moveTo(s * .9, 0); ctx.lineTo(s * .35, -s * .08); ctx.quadraticCurveTo(0, -s * .45, -s * .3, -s * .1); ctx.lineTo(-s * 1.1, -s * .05); ctx.lineTo(-s * .3, s * .08); ctx.quadraticCurveTo(0, s * .3, s * .35, s * .06); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.arc(s * .25, -s * .02, s * .05, 0, TAU); ctx.fillStyle = BRONZE; ctx.fill(); ctx.fillStyle = DARK;
    }
    function person(ctx, s) {
      ctx.beginPath(); ctx.arc(0, -s * .55, s * .14, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-s * .1, -s * .62); ctx.quadraticCurveTo(-s * .5, -s * 1.2, -s * .7, -s * .7); ctx.quadraticCurveTo(-s * .4, -s * .9, -s * .05, -s * .68); ctx.fill();
      ctx.fillRect(-s * .08, -s * .42, s * .16, s * .5);
      ctx.beginPath(); ctx.moveTo(-s * .06, s * .05); ctx.lineTo(-s * .25, s * .4); ctx.moveTo(s * .06, s * .05); ctx.lineTo(s * .22, s * .4); ctx.moveTo(-s * .05, -s * .3); ctx.lineTo(s * .35, -s * .45); ctx.lineWidth = s * .08; ctx.strokeStyle = DARK; ctx.stroke();
    }
    function house(ctx, s) {
      ctx.beginPath(); ctx.moveTo(-s * .8, -s * .55); ctx.quadraticCurveTo(0, -s * .2, s * .8, -s * .55); ctx.lineTo(s * .55, -s * .2); ctx.lineTo(-s * .55, -s * .2); ctx.closePath(); ctx.fill();
      ctx.fillRect(-s * .45, -s * .2, s * .9, s * .25); for (const x of [-.4, -.1, .2, .4]) ctx.fillRect(s * x - 1, s * .05, 2.5, s * .35);
    }
    function deer(ctx, s) {
      ctx.beginPath(); ctx.ellipse(0, 0, s * .45, s * .16, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.moveTo(s * .35, -s * .05); ctx.lineTo(s * .55, -s * .4); ctx.lineTo(s * .7, -s * .35); ctx.lineTo(s * .45, 0); ctx.fill();
      ctx.lineWidth = s * .06; ctx.strokeStyle = DARK; ctx.beginPath(); ctx.moveTo(s * .6, -s * .4); ctx.lineTo(s * .55, -s * .65); ctx.lineTo(s * .45, -s * .7); ctx.moveTo(s * .55, -s * .6); ctx.lineTo(s * .7, -s * .7);
      for (const x of [-.3, -.15, .2, .32]) { ctx.moveTo(s * x, s * .1); ctx.lineTo(s * x, s * .45); } ctx.stroke();
    }
    function drawDrum(dt) {
      const { w, h, ctx } = drC;
      if (!w) return;
      if (dr.fly) dr.ang -= dt * .12;
      ctx.fillStyle = '#fdf8ef'; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .46;
      const g = ctx.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R); g.addColorStop(0, '#d4b07a'); g.addColorStop(1, '#8a6a3c');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
      const sel = RINGS[dr.sel];
      ctx.fillStyle = 'rgba(253,224,71,.35)'; ctx.beginPath(); ctx.arc(cx, cy, sel.r1 * R, 0, TAU); if (sel.r0 > 0) ctx.arc(cx, cy, sel.r0 * R, 0, TAU, true); ctx.fill('evenodd');
      ctx.strokeStyle = DARK; ctx.lineWidth = 1.5;
      for (const r of [.17, .3, .52, .68, .9]) { ctx.beginPath(); ctx.arc(cx, cy, r * R, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, r * R + 3, 0, TAU); ctx.stroke(); }
      // ngôi sao 14 cánh
      ctx.fillStyle = '#e9cf98'; ctx.beginPath();
      for (let i = 0; i < 28; i++) { const a = i / 28 * TAU - Math.PI / 2, r = i % 2 ? R * .045 : R * .16; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.closePath(); ctx.fill(); ctx.stroke();
      // hoa văn hình học
      ctx.fillStyle = DARK;
      for (let i = 0; i < 26; i++) { const a = i / 26 * TAU, r = R * .235; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, R * .022, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1.6, 0, TAU); ctx.fill(); }
      for (let i = 0; i < 90; i++) { const a = i / 90 * TAU; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R * .91, cy + Math.sin(a) * R * .91); ctx.lineTo(cx + Math.cos(a) * R * .97, cy + Math.sin(a) * R * .97); ctx.stroke(); }
      // cảnh sinh hoạt
      const s1 = R * .09;
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * TAU, r = R * .41; ctx.save(); ctx.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.rotate(a + Math.PI / 2); ctx.fillStyle = DARK;
        if (i % 4 === 0) house(ctx, s1); else person(ctx, s1);
        ctx.restore();
      }
      // muông thú
      for (let i = 0; i < 14; i++) { const a = i / 14 * TAU, r = R * .6; ctx.save(); ctx.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.rotate(a - Math.PI / 2); ctx.scale(-1, 1); ctx.fillStyle = DARK; if (i % 2) deer(ctx, R * .07); else bird(ctx, R * .055); ctx.restore(); }
      // 18 chim Lạc bay ngược chiều kim đồng hồ
      for (let i = 0; i < 18; i++) { const a = i / 18 * TAU + dr.ang, r = R * .79; ctx.save(); ctx.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.rotate(a - Math.PI / 2); ctx.fillStyle = DARK; bird(ctx, R * .085); ctx.restore(); }
      for (const rp of dr.ripples) { ctx.strokeStyle = `rgba(253,224,71,${1 - rp.t})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R * (.15 + rp.t * .9), 0, TAU); ctx.stroke(); rp.t += dt * 1.2; }
      dr.ripples = dr.ripples.filter((r) => r.t < 1);
      textLight(ctx, T('👆 Bấm vào từng vành để tìm hiểu', '👆 Tap a ring to learn more'), w / 2, h - 10, '#78716c', 11, 'center', 800);
    }
    function drawDrumSide() {
      const { w, h, ctx } = drSide;
      if (!w) return;
      ctx.fillStyle = '#fdf8ef'; ctx.fillRect(0, 0, w, h);
      const cx = w * .36, top = h * .14, bw = Math.min(w * .26, h * .55);
      ctx.fillStyle = '#9a7646'; ctx.strokeStyle = DARK; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - bw, top); ctx.lineTo(cx + bw, top); ctx.bezierCurveTo(cx + bw * 1.25, top + h * .12, cx + bw * 1.15, top + h * .28, cx + bw * .85, top + h * .36);
      ctx.lineTo(cx + bw * .85, top + h * .55); ctx.lineTo(cx + bw * 1.0, top + h * .75); ctx.lineTo(cx - bw * 1.0, top + h * .75); ctx.lineTo(cx - bw * .85, top + h * .55); ctx.lineTo(cx - bw * .85, top + h * .36);
      ctx.bezierCurveTo(cx - bw * 1.15, top + h * .28, cx - bw * 1.25, top + h * .12, cx - bw, top); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#c9a56d'; ctx.beginPath(); ctx.ellipse(cx, top, bw, h * .04, 0, 0, TAU); ctx.fill(); ctx.stroke();
      for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(cx + sd * bw * 1.08, top + h * .3, h * .06, sd > 0 ? -Math.PI / 2 : Math.PI / 2, sd > 0 ? Math.PI / 2 : Math.PI * 1.5); ctx.stroke(); }
      const lx = cx + bw * 1.32; const lab = (t, y) => { ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx + bw * .9, y); ctx.lineTo(lx, y); ctx.stroke(); textLight(ctx, t, lx + 4, y, '#57534e', w < 300 ? 10 : 11, 'left', 900); };
      lab(T('Mặt trống', 'Face'), top); lab(T('Tang (phình)', 'Bulge'), top + h * .18); lab(T('Thân', 'Body'), top + h * .46); lab(T('Chân', 'Foot'), top + h * .68);
    }
    drC.c.addEventListener('pointerdown', (e) => {
      const p = localPoint(drC.c, e), { w, h } = drC, R = Math.min(w, h) * .46, d = Math.hypot(p.x - w / 2, p.y - h / 2) / R;
      if (d > 1.02) return;
      cancelSpeech(); dr.sel = RINGS.findIndex((r) => d >= r.r0 && d < r.r1); if (dr.sel < 0) dr.sel = RINGS.length - 1; drInfo(true);
    });
    let drAudio = null;
    function drumSound() {
      try {
        if (!drAudio) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; drAudio = new AC(); cleanupFns.push(() => { try { drAudio.close(); } catch (_) {} }); }
        if (drAudio.state === 'suspended') drAudio.resume();
        const t = drAudio.currentTime, o = drAudio.createOscillator(), g = drAudio.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(55, t + .6);
        g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.35, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + 1.2);
        o.connect(g); g.connect(drAudio.destination); o.start(t); o.stop(t + 1.25);
      } catch (_) {}
    }
    $('drBeat').onclick = () => { cancelSpeech(); drumSound(); dr.ripples.push({ t: 0 }); };
    $('drFly').onclick = () => { dr.fly = !dr.fly; $('drFly').setAttribute('aria-pressed', String(dr.fly)); };
    function drInfo(force) {
      const key = lang + dr.sel; if (key === dr.infoKey && !force) return; dr.infoKey = key;
      const r = L({ vi: RINGS[dr.sel].vi, en: RINGS[dr.sel].en });
      infoBox($('info_dr'), {
        emo: '🥁', title: r[0], sub: T('Trống đồng Ngọc Lũ, văn hóa Đông Sơn', 'Ngoc Lu drum, Dong Son culture'),
        rows: [[T('Hoa văn', 'Pattern'), r[1]], [T('Thời gian', 'When'), T('Văn hóa Đông Sơn, cách đây khoảng 2.000 – 2.700 năm, thời Văn Lang – Âu Lạc.', 'Dong Son culture, about 2,000 – 2,700 years ago, in the Van Lang – Au Lac era.')], [T('Dùng để làm gì?', 'What for?'), T('Đánh trong lễ hội, cầu mưa, tập hợp mọi người; còn là biểu tượng của quyền lực.', 'Played at festivals and rain ceremonies, to gather people, and as a symbol of power.')]],
        notes: [['fun', '✨ ' + r[2]], ['tip', T('🏛️ Trống đồng Ngọc Lũ (tìm thấy ở Hà Nam) là Bảo vật quốc gia, đang trưng bày ở Bảo tàng Lịch sử Quốc gia tại Hà Nội.', '🏛️ The Ngoc Lu drum (found in Ha Nam) is a National Treasure on display at the National Museum of History in Hanoi.')]]
      });
    }
    TABS.dr = {
      frame(dt) { drawDrum(dt); drawDrumSide(); drInfo(); setText('hud_dr', `🥁 ${L({ vi: RINGS[dr.sel].vi, en: RINGS[dr.sel].en })[0]}`); },
      refresh() { dr.infoKey = ''; drInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_dr'), {
      vi: [
        { q: 'Trống đồng Đông Sơn được làm bằng gì?', a: ['Đồng (đúc từ đồng nung chảy)', 'Gỗ', 'Da trâu', 'Đá'], why: 'Người xưa đúc trống từ hợp kim đồng nung chảy.' },
        { q: 'Ở giữa mặt trống có hình gì?', a: ['Ngôi sao nhiều cánh (Mặt Trời)', 'Con rồng', 'Bông sen', 'Mặt Trăng khuyết'], why: 'Ngôi sao tượng trưng cho Mặt Trời.' },
        { q: 'Chim Lạc trên trống đồng bay theo chiều nào?', a: ['Ngược chiều kim đồng hồ', 'Cùng chiều kim đồng hồ', 'Bay lên trời', 'Đứng yên'], why: 'Các chim Lạc nối đuôi nhau bay ngược chiều kim đồng hồ.' },
        { q: 'Trên trống có cảnh sinh hoạt nào?', a: ['Giã gạo, nhảy múa, nhà sàn', 'Lái ô tô', 'Xem ti vi', 'Đi máy bay'], why: 'Trống ghi lại cuộc sống của người Việt cổ.' },
        { q: 'Trống đồng Ngọc Lũ được tìm thấy ở tỉnh nào?', a: ['Hà Nam', 'Cà Mau', 'Lâm Đồng', 'Kiên Giang'], why: 'Trống Ngọc Lũ tìm thấy ở Hà Nam, nay là Bảo vật quốc gia.' },
        { q: 'Trống đồng thuộc nền văn hóa nào?', a: ['Văn hóa Đông Sơn', 'Văn hóa Óc Eo', 'Văn hóa Sa Huỳnh', 'Văn hóa Chăm'], why: 'Trống đồng là biểu tượng tiêu biểu của văn hóa Đông Sơn.' }
      ],
      en: [
        { q: 'What are Dong Son drums made of?', a: ['Bronze (cast from molten metal)', 'Wood', 'Buffalo hide', 'Stone'], why: 'They were cast from molten bronze.' },
        { q: 'What is in the centre of the drum face?', a: ['A many-pointed star (the Sun)', 'A dragon', 'A lotus', 'A crescent Moon'], why: 'The star stands for the Sun.' },
        { q: 'Which way do the Lac birds fly?', a: ['Anticlockwise', 'Clockwise', 'Straight up', 'They don’t move'], why: 'They follow one another anticlockwise.' },
        { q: 'Which scenes appear on the drum?', a: ['Pounding rice, dancing, stilt houses', 'Driving cars', 'Watching TV', 'Flying planes'], why: 'The drum records ancient Vietnamese life.' },
        { q: 'Where was the Ngoc Lu drum found?', a: ['Ha Nam', 'Ca Mau', 'Lam Dong', 'Kien Giang'], why: 'It was found in Ha Nam and is now a National Treasure.' },
        { q: 'Which culture do these drums belong to?', a: ['Dong Son culture', 'Oc Eo culture', 'Sa Huynh culture', 'Cham culture'], why: 'Bronze drums are the best-known symbol of Dong Son culture.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'tl';
    root.querySelectorAll('.hist-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.hist-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('h-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.hist-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.hist-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.hist-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
