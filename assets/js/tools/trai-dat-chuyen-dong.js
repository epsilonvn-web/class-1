/* Epsilon Edu - Tool: Trai Dat chuyen dong (Our moving Earth): mui gio, gio mua Viet Nam
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.earthMotion = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "earthMotion";
  let activeCleanup = null;

  const CSS = `
.motion-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.motion-tool *{box-sizing:border-box}.motion-tool button,.motion-tool input{font:inherit}.motion-tool button{cursor:pointer}.motion-tool .hidden{display:none!important}
.motion-tool button:focus-visible,.motion-tool canvas:focus-visible,.motion-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.motion-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.motion-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.motion-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.motion-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.motion-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.motion-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.motion-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.motion-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.motion-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.motion-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.motion-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.motion-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.motion-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.motion-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.motion-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.motion-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.motion-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.motion-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.motion-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.motion-panel{width:100%}.motion-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.motion-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.motion-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.motion-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.motion-tool .card-head.compact{margin-bottom:9px}
.motion-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.motion-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.motion-tool .btn,.motion-tool .soft-btn,.motion-tool .segmented button,.motion-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.motion-tool .btn:hover,.motion-tool .soft-btn:hover,.motion-tool .segmented button:hover,.motion-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.motion-tool .btn{padding:0 12px}.motion-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.motion-tool .segmented{display:flex;gap:7px;margin:0}.motion-tool .segmented button{padding:0 13px}
.motion-tool .segmented button[aria-pressed="true"],.motion-tool .soft-btn[aria-pressed="true"],.motion-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.motion-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.motion-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.motion-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.motion-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.motion-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.motion-tool .range-control input{width:100%;accent-color:#8b5cf6}.motion-tool .range-control b{color:#7c3aed;font-size:13px}
.motion-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.motion-tool .soft-btn{padding:0 12px}
.motion-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.motion-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.motion-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.motion-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.motion-tool .info-title{display:flex;align-items:center;gap:10px}.motion-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.motion-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.motion-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.motion-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.motion-tool .facts{display:grid;gap:6px;margin-top:10px}.motion-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.motion-tool .facts b{color:#7c3aed;font-size:13.5px}.motion-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.motion-tool .fun,.motion-tool .warn,.motion-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.motion-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.motion-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.motion-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.motion-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.motion-tool .state-big.up{color:#0f766e}.motion-tool .state-big.down{color:#b45309}
.motion-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.motion-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.motion-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.motion-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.motion-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.motion-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.motion-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.motion-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.motion-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.motion-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.motion-tool .qopt:hover{filter:brightness(.985)}.motion-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.motion-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.motion-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.motion-tool .qfb,.motion-tool .score{font-size:13px;font-weight:900}.motion-tool .qfb.ok{color:#15803d}.motion-tool .qfb.no{color:#be123c}.motion-tool .score{color:#7c3aed}
.motion-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.motion-grid{grid-template-columns:1fr;align-items:start}.motion-side{grid-template-rows:auto auto;height:auto}.motion-tool .control-grid{grid-template-columns:1fr}.motion-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.motion-hero{flex-wrap:wrap;padding:12px}.motion-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.motion-tabs{grid-template-columns:1fr}.motion-tabs .tab{min-height:40px}.motion-card{padding:11px;border-radius:18px}.motion-tool .card-head{align-items:flex-start;flex-direction:column}.motion-tool .head-actions{width:100%;justify-content:space-between}.motion-tool .head-actions .segmented{flex:1;min-width:0}.motion-tool .head-actions .segmented button{flex:1;padding:0 8px}.motion-tool .qopts{grid-template-columns:1fr}.motion-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.motion-tool *{transition:none!important}}

.motion-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.motion-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.motion-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.motion-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.motion-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.motion-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.motion-tool .checklist{display:grid;gap:6px;margin-top:10px}
.motion-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.motion-tool .checklist .ok{color:#15803d}.motion-tool .checklist .no{color:#be123c}.motion-tool .checklist .wait{color:#94a3b8}
.motion-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.motion-tool .process span{flex:1}.motion-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.motion-tool .process .on{color:#0284c7}.motion-tool .process i.on{color:#ec4899}
@media(max-width:640px){.motion-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.motion-tool .slider-pair{grid-template-columns:1fr}}

.motion-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.motion-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.motion-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.motion-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.motion-tool .clock-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-bottom:4px}
.motion-tool .clock-grid>div{display:grid;gap:2px;padding:7px 9px;border-radius:11px;background:#f8fafc;border:1px solid #eef2ff}
.motion-tool .clock-grid b{font-size:13px;color:#475569;font-weight:900}.motion-tool .clock-grid span{font-size:15px;color:#6d28d9;font-weight:900;font-variant-numeric:tabular-nums}
.motion-tool .clock-grid.one{grid-template-columns:1fr}

.motion-tabs{grid-template-columns:repeat(2,minmax(0,1fr))}
@media(max-width:640px){.motion-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="motion-tool" data-tool-root>
  <div class="motion-hero">
    <div class="motion-hero-icon" aria-hidden="true">🌏</div>
    <div>
      <p class="motion-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="motion-lead" data-t="lead"></p>
    </div>
    <div class="motion-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="mAudioNotice" class="motion-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="motion-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="tz" data-t="tab_tz"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="mon" data-t="tab_mon"></button>
  </div>
  <section id="m-tz" class="motion-panel" role="tabpanel">
    <div class="motion-grid">
      <article class="motion-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_tz"></h2></div>
          <div class="head-actions"><button id="tzPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_tz" role="img" data-ta="cv_tz"></canvas></div>
        <p id="hud_tz" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="hnL"></span><input id="tzHour" type="range" min="0" max="23.99" value="12" step="0.05"><b id="tzHourTxt"></b></label>
      </article>
      <div class="motion-side">
        <aside class="motion-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_tz"></span><h2 data-t="sh_tz"></h2></div></div>
          <div id="tzClocks" class="clock-grid" aria-live="off"></div>
          <div id="info_tz" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_tz" class="motion-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="m-mon" class="motion-panel hidden" role="tabpanel">
    <div class="motion-grid">
      <article class="motion-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_mon"></h2></div>
          <div class="head-actions"><button id="monPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_mon" role="img" data-ta="cv_mon"></canvas></div>
        <p id="hud_mon" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="monthL"></span><input id="monMonth" type="range" min="1" max="12.99" value="1" step="0.01"><b id="monMonthTxt"></b></label>
      </article>
      <div class="motion-side">
        <aside class="motion-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_mon"></span><h2 data-t="sh_mon"></h2></div></div>
          <div id="monCities" class="clock-grid one"></div>
          <div id="info_mon" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_mon" class="motion-card quiz-card"></article>
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
      kicker: ['Epsilon Edu · Khoa học trực quan', 'Epsilon Edu · Visual Science'],
      title: ['Trái Đất chuyển động', 'Our Moving Earth'],
      lead: ['Trái Đất quay khiến mỗi nơi một giờ khác nhau, và luồng gió đổi hướng theo mùa mang mưa nắng đến Việt Nam.', 'Earth’s spin gives every place its own time, and winds that switch with the seasons bring rain and sun to Vietnam.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Mô phỏng', 'Simulation'],
      tab_tz: ['🕒 Múi giờ', '🕒 Time zones'], h_tz: ['Trái Đất quay, mỗi nơi một giờ', 'Earth spins: every place has its own time'],
      cv_tz: ['Trái Đất nhìn từ trên cực Bắc, nửa sáng nửa tối, các thành phố quay theo', 'Earth seen from above the North Pole, half lit and half dark, with cities turning'],
      se_tz: ['Đồng hồ thế giới', 'World clocks'], sh_tz: ['Bây giờ là mấy giờ?', 'What time is it there?'],
      tab_mon: ['🌬️ Gió mùa Việt Nam', '🌬️ Vietnam’s monsoons'], h_mon: ['Gió đổi hướng theo tháng', 'Winds change with the months'],
      cv_mon: ['Bản đồ Việt Nam với các luồng gió theo tháng', 'Map of Vietnam with the winds for each month'],
      se_mon: ['Thời tiết', 'Weather'], sh_mon: ['Ba miền trong tháng này', 'The three regions this month'],
      hnL: ['Kéo để đổi giờ ở Hà Nội', 'Drag to change the time in Hanoi'], monthL: ['Kéo để đổi tháng', 'Drag to change the month']
    };

    /* =====================================================================
       1. MÚI GIỜ: nhìn từ trên cực Bắc, Mặt Trời ở phía trên
       ===================================================================== */
    const CITIES = [
      { vi: 'Hà Nội', en: 'Hanoi', lat: 21.0, lon: 105.8, tz: 7, home: true },
      { vi: 'Bắc Kinh', en: 'Beijing', lat: 39.9, lon: 116.4, tz: 8 },
      { vi: 'Tokyo', en: 'Tokyo', lat: 35.7, lon: 139.7, tz: 9 },
      { vi: 'Sydney', en: 'Sydney', lat: -33.9, lon: 151.2, tz: 10 },
      { vi: 'New Delhi', en: 'New Delhi', lat: 28.6, lon: 77.2, tz: 5.5 },
      { vi: 'Mát-xcơ-va', en: 'Moscow', lat: 55.8, lon: 37.6, tz: 3 },
      { vi: 'Pa-ri', en: 'Paris', lat: 48.9, lon: 2.35, tz: 1 },
      { vi: 'Luân Đôn', en: 'London', lat: 51.5, lon: -.13, tz: 0 },
      { vi: 'Niu Oóc', en: 'New York', lat: 40.7, lon: -74, tz: -5 },
      { vi: 'Lốt An-giơ-lét', en: 'Los Angeles', lat: 34.0, lon: -118.2, tz: -8 }
    ];
    let hnHour = 12, tzPlaying = !reduceMotion, tzInfoKey = '';
    const tzC = mk('c_tz', (w) => clamp(w * .78, 320, 600));
    const hhmm = (x) => { x = ((x % 24) + 24) % 24; const H = Math.floor(x), M = Math.floor((x - H) * 60); return `${String(H).padStart(2, '0')}:${String(M).padStart(2, '0')}`; };
    const cityLocal = (c) => hnHour - 7 + c.tz;
    const dayOff = (c) => Math.floor(cityLocal(c) / 24) - Math.floor(hnHour / 24);
    const isDay = (c) => { const lst = ((hnHour - 7 + c.lon / 15) % 24 + 24) % 24; return lst >= 6 && lst < 18; };
    function drawTz() {
      const { w, h, ctx } = tzC;
      if (!w) return;
      ctx.fillStyle = '#0b1030'; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h * .56, R = Math.min(w * .42, h * .42);
      // Mặt Trời phía trên
      const sg = ctx.createLinearGradient(0, 0, 0, cy); sg.addColorStop(0, 'rgba(253,224,71,.28)'); sg.addColorStop(1, 'rgba(253,224,71,0)');
      ctx.fillStyle = sg; ctx.fillRect(0, 0, w, cy);
      drawSun(ctx, cx, h * .04 - 10, h * .07, .5);
      textLight(ctx, T('☀️ Ánh nắng từ Mặt Trời', '☀️ Sunlight'), cx, h * .1, '#fde68a', 12, 'center', 900);
      // Trái Đất
      const utc = hnHour - 7;
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
      const og = ctx.createRadialGradient(cx, cy, R * .1, cx, cy, R); og.addColorStop(0, '#60a5fa'); og.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = og; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      const rOf = (lat) => (90 - lat) / 130 * R;
      ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1;
      for (let k = 0; k < 24; k++) { const lon = k * 15, a = ((utc + lon / 15) - 12) * 15 * Math.PI / 180; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - Math.sin(a) * R, cy - Math.cos(a) * R); ctx.stroke(); }
      for (const lat of [60, 30, -30]) { ctx.beginPath(); ctx.arc(cx, cy, rOf(lat), 0, TAU); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(253,224,71,.6)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, rOf(0), 0, TAU); ctx.stroke();
      // nửa đêm (phía xa Mặt Trời)
      const ng = ctx.createLinearGradient(0, cy - R * .08, 0, cy + R * .1); ng.addColorStop(0, 'rgba(2,6,23,0)'); ng.addColorStop(1, 'rgba(2,6,23,.62)');
      ctx.fillStyle = ng; ctx.fillRect(cx - R, cy - R * .08, 2 * R, R * 1.1);
      ctx.restore();
      ctx.strokeStyle = 'rgba(147,197,253,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
      // mũi tên chiều quay
      ctx.strokeStyle = 'rgba(196,181,253,.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R + 12, Math.PI * .15, Math.PI * .45); ctx.stroke();
      arrow(ctx, cx + (R + 12) * Math.cos(Math.PI * .17), cy + (R + 12) * Math.sin(Math.PI * .17), cx + (R + 12) * Math.cos(Math.PI * .12), cy + (R + 12) * Math.sin(Math.PI * .12), 'rgba(196,181,253,.9)', 2, 8);
      textLight(ctx, T('Ngày', 'Day'), cx + R * .7, cy - R * .78, '#fef3c7', 13, 'center', 900);
      textLight(ctx, T('Đêm', 'Night'), cx + R * .72, cy + R * .8, '#c7d2fe', 13, 'center', 900);
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, TAU); ctx.fill();
      textLight(ctx, T('Cực Bắc', 'North Pole'), cx, cy + 12, '#e0f2fe', 10.5, 'center', 800);
      // thành phố
      const fs = w < 420 ? 10 : 11.5;
      for (const c of CITIES) {
        const lst = utc + c.lon / 15, a = (lst - 12) * 15 * Math.PI / 180, r = rOf(c.lat);
        const x = cx - Math.sin(a) * r, y = cy - Math.cos(a) * r;
        ctx.fillStyle = c.home ? '#f43f5e' : isDay(c) ? '#fde047' : '#e2e8f0';
        ctx.beginPath(); ctx.arc(x, y, c.home ? 6 : 4, 0, TAU); ctx.fill();
        if (c.home) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); }
        const lx = x - Math.sin(a) * 12, ly = y - Math.cos(a) * 12;
        textLight(ctx, L(c), lx, ly, c.home ? '#fecdd3' : '#f1f5f9', c.home ? fs + 1 : fs, Math.sin(a) > .3 ? 'right' : Math.sin(a) < -.3 ? 'left' : 'center', 900);
      }
    }
    function tzCards() {
      const box = $('tzClocks');
      if (!box.children.length) box.innerHTML = CITIES.map((c, i) => `<div data-c="${i}"><b></b><span></span></div>`).join('');
      [...box.children].forEach((el, i) => {
        const c = CITIES[i], d = dayOff(c);
        const name = `${isDay(c) ? '☀️' : '🌙'} ${L(c)}`;
        const t = `${hhmm(cityLocal(c))}${d < 0 ? T(' (hôm qua)', ' (yesterday)') : d > 0 ? T(' (ngày mai)', ' (tomorrow)') : ''}`;
        const b = el.querySelector('b'), s = el.querySelector('span');
        if (b.textContent !== name) b.textContent = name;
        if (s.textContent !== t) s.textContent = t;
        el.style.background = c.home ? '#fdf2f8' : '';
      });
    }
    function tzInfo() {
      if (tzInfoKey === lang) return; tzInfoKey = lang;
      infoBox($('info_tz'), {
        emo: '🌍', title: T('Vì sao có múi giờ?', 'Why time zones?'),
        rows: [[T('Trái Đất quay', 'Earth spins'), T('Mỗi vòng mất khoảng 24 giờ. Nơi quay về phía Mặt Trời là ban ngày, phía kia là ban đêm.', 'One turn takes about 24 hours. The side facing the Sun has day; the other side has night.')],
          [T('24 múi giờ', '24 zones'), T('Người ta chia Trái Đất thành 24 múi, mỗi múi rộng 15 độ và chênh nhau khoảng 1 giờ.', 'Earth is divided into 24 zones, each 15 degrees wide and about 1 hour apart.')],
          [T('Việt Nam', 'Vietnam'), T('Dùng múi giờ UTC+7, sớm hơn Luân Đôn 7 giờ.', 'Uses UTC+7, 7 hours ahead of London.')]],
        notes: [['fun', T('✨ Khi em ăn trưa lúc 12 giờ ở Hà Nội, ở Niu Oóc mới 0 giờ đêm của ngày hôm trước!', '✨ When you have lunch at 12:00 in Hanoi, it’s only midnight of the day before in New York!')],
          ['tip', T('💡 Đồng hồ ở đây là giờ chuẩn, chưa tính "giờ mùa hè" mà một số nước dùng.', '💡 Clocks here show standard time, without the summer time some countries use.')]]
      });
    }
    const setTzPlaying = (on) => { tzPlaying = on; $('tzPlay').textContent = on ? T('⏸ Tạm dừng', '⏸ Pause') : T('▶ Chạy', '▶ Play'); };
    $('tzPlay').onclick = () => { cancelSpeech(); setTzPlaying(!tzPlaying); };
    $('tzHour').addEventListener('input', () => { cancelSpeech(); setTzPlaying(false); hnHour = +$('tzHour').value; });
    TABS.tz = {
      frame(dt) {
        if (tzPlaying) { hnHour = (hnHour + dt * 1.2) % 24; $('tzHour').value = String(hnHour); }
        drawTz(); tzCards(); tzInfo();
        setText('tzHourTxt', `${T('Hà Nội', 'Hanoi')} ${hhmm(hnHour)}`);
        setText('hud_tz', `🕒 ${T('Hà Nội', 'Hanoi')} ${hhmm(hnHour)} – ${T('Tokyo', 'Tokyo')} ${hhmm(cityLocal(CITIES[2]))} – ${T('Niu Oóc', 'New York')} ${hhmm(cityLocal(CITIES[8]))}${dayOff(CITIES[8]) < 0 ? T(' (hôm qua)', ' (yesterday)') : ''}`);
      },
      refresh() { setTzPlaying(tzPlaying); tzInfoKey = ''; tzInfo(); $('tzClocks').innerHTML = ''; }
    };
    QUIZZES.push(makeQuiz($('quiz_tz'), {
      vi: [
        { q: 'Vì sao có ngày và đêm?', a: ['Vì Trái Đất tự quay', 'Vì Mặt Trời tắt đi', 'Vì Mặt Trăng che', 'Vì mây che'], why: 'Trái Đất quay nên lần lượt từng nơi quay về phía Mặt Trời.' },
        { q: 'Trái Đất tự quay một vòng mất khoảng bao lâu?', a: ['24 giờ', '1 giờ', '1 tuần', '1 năm'], why: 'Khoảng 24 giờ, tức là một ngày đêm.' },
        { q: 'Có bao nhiêu múi giờ chính?', a: ['24', '12', '7', '100'], why: '24 múi, ứng với 24 giờ trong ngày.' },
        { q: 'Việt Nam dùng múi giờ nào?', a: ['UTC+7', 'UTC+0', 'UTC−5', 'UTC+12'], why: 'Việt Nam sớm hơn giờ quốc tế (UTC) 7 giờ.' },
        { q: 'Ở Hà Nội đang 12 giờ trưa. Ở Tokyo (UTC+9) là mấy giờ?', a: ['14 giờ', '10 giờ', '12 giờ', '0 giờ'], why: 'Tokyo sớm hơn Hà Nội 2 giờ.' },
        { q: 'Trái Đất quay theo chiều nào khi nhìn từ trên cực Bắc?', a: ['Ngược chiều kim đồng hồ', 'Cùng chiều kim đồng hồ', 'Không quay', 'Lúc xuôi lúc ngược'], why: 'Vì vậy Mặt Trời mọc ở phía Đông, lặn ở phía Tây.' }
      ],
      en: [
        { q: 'Why do we have day and night?', a: ['Because Earth spins', 'The Sun switches off', 'The Moon blocks it', 'Clouds'], why: 'As Earth spins, each place turns toward the Sun in turn.' },
        { q: 'How long does one spin take?', a: ['About 24 hours', '1 hour', '1 week', '1 year'], why: 'About 24 hours: one day and night.' },
        { q: 'How many main time zones are there?', a: ['24', '12', '7', '100'], why: '24 zones, one for each hour of the day.' },
        { q: 'Which time zone does Vietnam use?', a: ['UTC+7', 'UTC+0', 'UTC−5', 'UTC+12'], why: 'Vietnam is 7 hours ahead of UTC.' },
        { q: 'It’s noon in Hanoi. What time is it in Tokyo (UTC+9)?', a: ['2 pm', '10 am', 'Noon', 'Midnight'], why: 'Tokyo is 2 hours ahead of Hanoi.' },
        { q: 'Seen from above the North Pole, Earth spins…', a: ['Anticlockwise', 'Clockwise', 'Not at all', 'Back and forth'], why: 'That’s why the Sun rises in the east and sets in the west.' }
      ]
    }));

    /* =====================================================================
       2. GIÓ MÙA VIỆT NAM (bản đồ đơn giản hóa)
       ===================================================================== */
    const VN_N = [[102.14, 22.4], [102.5, 22.7], [103.2, 22.6], [103.95, 22.5], [104.8, 22.8], [105.3, 23.38], [106.0, 22.95], [106.7, 22.85], [106.8, 22.3], [106.72, 21.97], [107.4, 21.6], [108.0, 21.52]];
    const VN_COAST = [[107.7, 21.3], [107.3, 21.0], [107.05, 20.95], [106.8, 20.7], [106.6, 20.4], [106.3, 20.0], [106.0, 19.95], [105.85, 19.5], [105.75, 19.0], [105.78, 18.7], [106.1, 18.3], [106.45, 17.95], [106.65, 17.45], [107.1, 17.0], [107.65, 16.5], [108.25, 16.05], [108.35, 15.85], [108.85, 15.15], [109.0, 14.65], [109.25, 13.75], [109.35, 13.05], [109.45, 12.85], [109.22, 12.25], [109.2, 11.9], [109.0, 11.55], [108.3, 10.95], [108.1, 10.9], [107.8, 10.65], [107.08, 10.35], [106.75, 10.3], [106.6, 10.0], [106.5, 9.6], [106.2, 9.45], [105.75, 9.2], [105.3, 8.75], [104.75, 8.6], [104.8, 9.0], [104.85, 9.6], [105.05, 10.0], [104.48, 10.38]];
    const VN_W = [[104.75, 10.5], [105.1, 10.95], [105.8, 11.0], [106.0, 11.4], [106.15, 11.75], [106.45, 11.95], [106.95, 12.0], [107.4, 12.25], [107.6, 12.65], [107.5, 13.4], [107.6, 14.0], [107.55, 14.7], [107.4, 15.2], [107.2, 15.9], [106.7, 16.4], [106.55, 16.9], [106.1, 17.4], [105.6, 18.0], [105.15, 18.6], [104.4, 19.1], [103.95, 19.3], [104.0, 19.6], [104.6, 19.8], [104.95, 20.25], [104.4, 20.5], [103.8, 20.75], [103.2, 20.85], [102.8, 21.3], [102.85, 21.7], [102.65, 22.05]];
    const CN_COAST = [[118.5, 24.6], [117.5, 23.8], [116.5, 23.0], [114.2, 22.3], [113.0, 22.0], [111.5, 21.5], [110.5, 21.3], [110.2, 20.3], [109.9, 20.4], [109.6, 21.0], [108.6, 21.65]];
    const KH_COAST = [[104.0, 10.6], [103.5, 10.65], [103.1, 11.3], [102.9, 11.8], [102.3, 12.2], [101.5, 12.65], [100.9, 12.7], [100.95, 13.5], [99.5, 13.4]];
    const HAINAN = [[108.6, 19.2], [108.7, 18.5], [109.5, 18.2], [110.2, 18.5], [111.0, 19.6], [110.6, 20.1], [109.6, 20.0], [108.9, 19.6]];
    const PHUQUOC = [[103.85, 10.4], [104.05, 10.42], [104.08, 10.05], [103.95, 10.0]];
    const VN = [...VN_N, ...VN_COAST, ...VN_W];
    const NEIGHBOR = [[99.5, 25.5], [118.6, 25.5], ...CN_COAST, ...VN_N.slice().reverse(), ...VN_W.slice().reverse(), ...KH_COAST, [99.5, 13.4]];
    const MON_CITY = [
      { vi: 'Hà Nội', en: 'Hanoi', lon: 105.85, lat: 21.03, t: [16.4, 17.2, 20.0, 23.9, 27.4, 29.2, 29.6, 29.0, 27.9, 25.1, 21.8, 18.0] },
      { vi: 'Huế', en: 'Hue', lon: 107.6, lat: 16.46, t: [20.0, 21.0, 23.1, 26.0, 28.3, 29.3, 29.4, 28.9, 27.1, 25.1, 23.1, 20.8] },
      { vi: 'TP. Hồ Chí Minh', en: 'Ho Chi Minh City', lon: 106.7, lat: 10.78, t: [26.0, 26.8, 28.0, 29.2, 28.8, 27.8, 27.5, 27.4, 27.2, 27.0, 26.7, 26.0] }
    ];
    let month = 1, monPlaying = !reduceMotion, monParts = [], monInfoKey = '';
    const monC = mk('c_mon', (w) => clamp(w * .9, 340, 640), () => { monParts = []; });
    function monProj() {
      const { w, h } = monC, lon0 = 99.5, lon1 = 118.6, lat0 = 7, lat1 = 25.5;
      const sx = w / (lon1 - lon0), sy = h / (lat1 - lat0), s = Math.min(sx, sy * 1.03);
      const ox = (w - (lon1 - lon0) * s) / 2;
      return { P: (lon, lat) => ({ x: ox + (lon - lon0) * s, y: h - (lat - lat0) * s * .97 - (h - (lat1 - lat0) * s * .97) / 2 }), inv: (x, y) => ({ lon: lon0 + (x - ox) / s, lat: lat0 + ((h - (h - (lat1 - lat0) * s * .97) / 2) - y) / (s * .97) }), s };
    }
    const mInt = () => Math.min(12, Math.max(1, Math.floor(month)));
    function wind(lon, lat) {
      const m = mInt(), winter = m >= 11 || m <= 4, strong = [12, 1, 2, 6, 7, 8].includes(m) ? 1 : [4, 10, 5].includes(m) ? .5 : .8;
      if (winter) {
        if (m <= 4 && m >= 2 && lat > 18 && lon > 105 && lon < 109) return { vx: -.5, vy: -.75, s: strong, c: '#93c5fd', k: 'drizzle' };
        return { vx: -.75, vy: -.6, s: strong, c: lat > 16 ? '#60a5fa' : '#fcd34d', k: lat > 16 ? 'cold' : 'trade' };
      }
      if (m >= 5 && m <= 7 && lat > 16.5 && lat < 20.2 && lon > 103.5 && lon < 107) return { vx: 1, vy: .15, s: 1, c: '#f97316', k: 'lao' };
      if (lat > 19) return { vx: -.55, vy: .85, s: strong * .8, c: '#2dd4bf', k: 'se' };
      return { vx: .8, vy: .6, s: strong, c: '#34d399', k: 'sw' };
    }
    function drawMon(dt) {
      const { w, h, ctx } = monC;
      if (!w) return;
      const { P, inv, s } = monProj();
      ctx.fillStyle = '#7dd3fc'; ctx.fillRect(0, 0, w, h);
      const poly = (pts, fill, stroke) => { ctx.beginPath(); pts.forEach(([lo, la], i) => { const p = P(lo, la); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); }); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.2; ctx.stroke(); } };
      poly(NEIGHBOR, '#e7e5e4', '#a8a29e'); poly(HAINAN, '#e7e5e4', '#a8a29e');
      poly(VN, '#86efac', '#15803d'); poly(PHUQUOC, '#86efac', '#15803d');
      const dot = (lo, la, r) => { const p = P(lo, la); ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fill(); return p; };
      const fs = w < 420 ? 9.5 : 11;
      for (const [lo, la] of [[111.8, 16.4], [112.3, 16.7], [111.6, 16.9], [112.0, 16.1]]) dot(lo, la, 1.8);
      for (const [lo, la] of [[114.2, 10.4], [114.5, 9.9], [113.9, 9.6], [114.9, 10.2], [115.2, 9.4]]) dot(lo, la, 1.8);
      dot(106.6, 8.7, 2);
      let p = P(112.0, 15.7); textLight(ctx, T('QĐ Hoàng Sa', 'Hoang Sa Is.'), p.x, p.y, '#14532d', fs, 'center', 900);
      p = P(114.4, 8.9); textLight(ctx, T('QĐ Trường Sa', 'Truong Sa Is.'), p.x, p.y, '#14532d', fs, 'center', 900);
      p = P(113, 13.3); textLight(ctx, T('Biển Đông', 'East Sea'), p.x, p.y, '#075985', fs + 3, 'center', 900);
      for (const [vi, en, lo, la] of [['Trung Quốc', 'China', 109.5, 24.0], ['Lào', 'Laos', 102.6, 19.3], ['Thái Lan', 'Thailand', 101.2, 15.6], ['Campuchia', 'Cambodia', 104.9, 12.7]]) { p = P(lo, la); textLight(ctx, T(vi, en), p.x, p.y, '#78716c', fs, 'center', 800); }
      // hạt gió
      if (!monParts.length) monParts = Array.from({ length: 420 }, () => ({ x: rand(0, w), y: rand(0, h), age: rand(0, 3) }));
      const sp = s * 1.6;
      for (const q of monParts) {
        const g = inv(q.x, q.y), f = wind(g.lon, g.lat);
        const vx = f.vx * f.s * sp, vy = -f.vy * f.s * sp;
        const nx = q.x + vx * dt, ny = q.y + vy * dt;
        ctx.strokeStyle = f.c; ctx.globalAlpha = Math.min(1, q.age) * .9; ctx.lineWidth = 2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(q.x - vx * .12, q.y - vy * .12); ctx.lineTo(q.x, q.y); ctx.stroke();
        q.x = nx; q.y = ny; q.age += dt;
        if (q.x < -5 || q.x > w + 5 || q.y < -5 || q.y > h + 5 || q.age > 4) { q.x = rand(0, w); q.y = rand(0, h); q.age = 0; }
      }
      ctx.globalAlpha = 1;
      // bão
      const m = mInt();
      if (m >= 6 && m <= 11) {
        const bl = [0, 0, 0, 0, 0, 0, 19, 18.5, 17.5, 16, 14, 12.5][m - 1];
        const c = P(113.5 - (m - 6) * .3, bl), r = s * 1.1;
        ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 3;
        for (let k = 0; k < 2; k++) { ctx.beginPath(); for (let t = 0; t < 2.2 * Math.PI; t += .1) { const rr2 = r * (1 - t / (2.6 * Math.PI)), a = t + k * Math.PI - clock * 2; const x = c.x + Math.cos(a) * rr2, y = c.y + Math.sin(a) * rr2; if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke(); }
        textLight(ctx, T('🌀 mùa bão', '🌀 storm season'), c.x, c.y + r + 10, '#fff', fs, 'center', 900);
      }
      // thành phố
      for (const c of MON_CITY) { const q = P(c.lon, c.lat); ctx.fillStyle = '#e11d48'; ctx.beginPath(); ctx.arc(q.x, q.y, 4.5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); textLight(ctx, L(c), q.x + 8, q.y, '#7f1d1d', fs + .5, 'left', 900); }
      // chú giải
      const keys = m >= 11 || m <= 4 ? [['#60a5fa', T('Gió mùa đông bắc (lạnh)', 'NE monsoon (cold)')], ['#fcd34d', T('Gió đông bắc ở phía nam (khô)', 'NE wind in the south (dry)')]].concat(m >= 2 && m <= 4 ? [['#93c5fd', T('Gió ẩm, mưa phùn', 'Damp wind, drizzle')]] : [])
        : [['#34d399', T('Gió mùa tây nam (mang mưa)', 'SW monsoon (brings rain)')], ['#2dd4bf', T('Gió đông nam ở miền Bắc', 'SE wind in the north')]].concat(m <= 7 ? [['#f97316', T('Gió Lào (khô nóng)', 'Lao wind (hot, dry)')]] : []);
      ctx.fillStyle = 'rgba(255,255,255,.88)'; rr(ctx, 8, h - 14 - keys.length * 18, Math.min(w * .52, 250), keys.length * 18 + 8, 10); ctx.fill();
      keys.forEach(([c, t], i) => { const y = h - 4 - (keys.length - i) * 18 + 6; ctx.fillStyle = c; ctx.fillRect(16, y - 3, 16, 6); textLight(ctx, t, 38, y, '#334155', fs, 'left', 800); });
    }
    function cityWeather(c, m) {
      const t = c.t[m - 1];
      let icon = '☀️', note = '';
      if (c.en === 'Hanoi') { if (m >= 5 && m <= 9) { icon = '🌧️'; note = T('nóng, mưa rào', 'hot, showers'); } else if (m === 2 || m === 3) { icon = '🌦️'; note = T('mưa phùn, nồm ẩm', 'drizzle, damp'); } else if (m === 12 || m === 1) { icon = '🥶'; note = T('rét, hanh khô', 'cold, dry'); } else { note = T('mát mẻ', 'mild'); } }
      else if (c.en === 'Hue') { if (m >= 9 && m <= 12) { icon = '🌧️'; note = T('mưa nhiều, có lũ', 'heavy rain, floods'); } else if (m >= 5 && m <= 7) { icon = '🥵'; note = T('nắng nóng, gió Lào', 'hot, Lao wind'); } else { icon = m <= 2 ? '🌦️' : '☀️'; note = m <= 2 ? T('mưa nhẹ, se lạnh', 'light rain, cool') : T('nắng', 'sunny'); } }
      else { if (m >= 5 && m <= 11) { icon = '🌧️'; note = T('mùa mưa', 'rainy season'); } else { note = T('mùa khô, nắng', 'dry season, sunny'); } }
      return { icon, note, t };
    }
    function monInfo() {
      const m = mInt(), key = lang + m;
      const box = $('monCities');
      box.innerHTML = MON_CITY.map((c) => { const wx = cityWeather(c, m); return `<div><b>${wx.icon} ${L(c)}</b><span>${Math.round(wx.t)}°C – ${wx.note}</span></div>`; }).join('');
      if (key === monInfoKey) return; monInfoKey = key;
      const winter = m >= 11 || m <= 4;
      const notes = [];
      if (m >= 5 && m <= 7) notes.push(['warn', T('🔥 Ở Bắc Trung Bộ có gió Lào khô nóng: gió tây nam vượt dãy Trường Sơn, để lại hơi nước bên kia núi nên khi xuống tới nơi thì rất khô và nóng.', '🔥 North-central Vietnam gets the hot, dry “Lao wind”: south-west air crosses the Truong Son range, drops its moisture, and arrives hot and dry.')]);
      if (m >= 9 && m <= 12) notes.push(['tip', T('🌧️ Miền Trung mưa nhiều nhất vào tháng 9 – 12, khi gió đông bắc từ biển gặp dãy Trường Sơn và có thêm bão.', '🌧️ Central Vietnam’s heaviest rain is September – December, when north-east winds off the sea hit the Truong Son range, plus storms.')]);
      if (m === 4 || m === 10) notes.push(['tip', T('💡 Đây là tháng chuyển mùa: gió yếu và hay đổi hướng.', '💡 A change-over month: winds are weaker and shift direction.')]);
      notes.push(['fun', T('✨ Việt Nam nằm trong vùng nhiệt đới gió mùa: nóng ẩm, mưa nhiều, và gió đổi hướng theo mùa.', '✨ Vietnam has a tropical monsoon climate: hot, humid, rainy, with winds that switch with the seasons.')]);
      infoBox($('info_mon'), {
        emo: winter ? '❄️' : '🌧️', title: winter ? T('Gió mùa đông bắc', 'North-east monsoon') : T('Gió mùa tây nam', 'South-west monsoon'),
        sub: T(`Tháng ${m}`, `Month ${m}`),
        rows: winter ? [[T('Thổi từ đâu?', 'From where?'), T('Từ vùng lạnh phía bắc (Xi-bia, Trung Quốc) thổi xuống.', 'From the cold north (Siberia, China).')],
          [T('Thời tiết', 'Weather'), T('Miền Bắc lạnh, đầu mùa hanh khô, cuối mùa có mưa phùn. Miền Nam nắng, ít mưa: mùa khô.', 'The north is cold, dry at first, drizzly later. The south is sunny with little rain: the dry season.')],
          [T('Chú ý', 'Watch out'), T('Có những đợt rét đậm, vùng núi cao phía Bắc có thể có băng giá.', 'Cold snaps come; the northern mountains can even get frost.')]]
          : [[T('Thổi từ đâu?', 'From where?'), T('Từ Ấn Độ Dương thổi tới, mang theo nhiều hơi nước.', 'From the Indian Ocean, carrying lots of moisture.')],
          [T('Thời tiết', 'Weather'), T('Nóng và mưa nhiều. Miền Nam và Tây Nguyên vào mùa mưa. Miền Bắc nóng ẩm, mưa rào, có gió đông nam từ biển.', 'Hot and rainy. The south and Central Highlands have their rainy season. The north is hot and humid with showers and south-east sea winds.')],
          [T('Chú ý', 'Watch out'), T('Đây cũng là mùa bão, nhiều nhất từ tháng 7 đến tháng 10.', 'This is also storm season, especially July to October.')]],
        notes
      });
    }
    const setMonPlaying = (on) => { monPlaying = on; $('monPlay').textContent = on ? T('⏸ Tạm dừng', '⏸ Pause') : T('▶ Chạy', '▶ Play'); };
    $('monPlay').onclick = () => { cancelSpeech(); setMonPlaying(!monPlaying); };
    $('monMonth').addEventListener('input', () => { cancelSpeech(); setMonPlaying(false); month = +$('monMonth').value; monInfo(); });
    TABS.mon = {
      frame(dt) {
        if (monPlaying) { const before = mInt(); month += dt * .45; if (month >= 13) month = 1; $('monMonth').value = String(Math.min(12.99, month)); if (mInt() !== before) monInfo(); }
        drawMon(dt);
        const m = mInt();
        setText('monMonthTxt', T(`Tháng ${m}`, `Month ${m}`));
        setText('hud_mon', `📅 ${T(`Tháng ${m}`, `Month ${m}`)} – ${m >= 11 || m <= 4 ? T('gió mùa đông bắc', 'north-east monsoon') : T('gió mùa tây nam', 'south-west monsoon')}`);
      },
      refresh() { setMonPlaying(monPlaying); monInfoKey = ''; monInfo(); },
      show() { monInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_mon'), {
      vi: [
        { q: 'Mùa đông, miền Bắc nước ta chịu ảnh hưởng của gió gì?', a: ['Gió mùa đông bắc', 'Gió mùa tây nam', 'Gió Lào', 'Không có gió'], why: 'Gió mùa đông bắc lạnh từ phía bắc thổi xuống, làm miền Bắc có mùa đông lạnh.' },
        { q: 'Gió mùa tây nam mang đến điều gì cho miền Nam?', a: ['Mùa mưa', 'Băng giá', 'Tuyết rơi', 'Mùa khô'], why: 'Gió tây nam từ biển mang nhiều hơi nước, gây mưa.' },
        { q: 'Gió Lào thường thổi ở đâu và có đặc điểm gì?', a: ['Bắc Trung Bộ, khô và nóng', 'Miền Nam, mát và ẩm', 'Hà Nội, lạnh buốt', 'Ngoài biển, mang tuyết'], why: 'Gió vượt dãy Trường Sơn, mất hơi nước và nóng lên.' },
        { q: 'Miền Trung (như Huế) mưa nhiều nhất vào khoảng tháng nào?', a: ['Tháng 9 – 12', 'Tháng 1 – 3', 'Tháng 4 – 5', 'Tháng 6 – 7'], why: 'Lúc này gió đông bắc từ biển gặp núi Trường Sơn, lại thêm bão.' },
        { q: 'Mưa phùn thường có ở miền Bắc vào lúc nào?', a: ['Cuối đông, đầu xuân', 'Giữa mùa hè', 'Mùa thu', 'Quanh năm'], why: 'Cuối mùa đông, gió đông bắc đi qua biển nên ẩm, gây mưa phùn và nồm.' },
        { q: 'Mùa bão ở Việt Nam thường vào khoảng nào?', a: ['Từ tháng 6 đến tháng 11', 'Từ tháng 12 đến tháng 2', 'Chỉ tháng 4', 'Không có bão'], why: 'Bão nhiều nhất vào khoảng tháng 7 đến tháng 10.' }
      ],
      en: [
        { q: 'In winter, which wind affects northern Vietnam?', a: ['The north-east monsoon', 'The south-west monsoon', 'The Lao wind', 'No wind'], why: 'The cold north-east monsoon blows down from the north, giving the north a cold winter.' },
        { q: 'What does the south-west monsoon bring to the south?', a: ['The rainy season', 'Frost', 'Snow', 'The dry season'], why: 'South-west winds from the ocean carry moisture and bring rain.' },
        { q: 'Where does the Lao wind blow, and what is it like?', a: ['North-central Vietnam; hot and dry', 'The south; cool and damp', 'Hanoi; freezing', 'At sea; snowy'], why: 'It crosses the Truong Son range, loses moisture and heats up.' },
        { q: 'When does central Vietnam (like Hue) get the most rain?', a: ['September – December', 'January – March', 'April – May', 'June – July'], why: 'North-east winds off the sea hit the mountains, plus storms.' },
        { q: 'When does northern Vietnam get drizzle?', a: ['Late winter, early spring', 'Midsummer', 'Autumn', 'All year'], why: 'In late winter the north-east wind crosses the sea, turns damp and brings drizzle.' },
        { q: 'When is Vietnam’s storm season?', a: ['About June to November', 'December to February', 'Only April', 'There are no storms'], why: 'Storms are most common around July to October.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'tz';
    root.querySelectorAll('.motion-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.motion-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('m-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.motion-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.motion-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.motion-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
