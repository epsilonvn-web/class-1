/* Epsilon Edu - Tool: Khi bi lac va gap nguoi la (Lost and strangers): nho nguoi an toan, nho so dien thoai, tinh huong nguoi la
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.lostAndStrangers = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "lostAndStrangers";
  let activeCleanup = null;

  const CSS = `
.lost-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.lost-tool *{box-sizing:border-box}.lost-tool button,.lost-tool input{font:inherit}.lost-tool button{cursor:pointer}.lost-tool .hidden{display:none!important}
.lost-tool button:focus-visible,.lost-tool canvas:focus-visible,.lost-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.lost-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.lost-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.lost-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.lost-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.lost-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.lost-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.lost-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.lost-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.lost-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.lost-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.lost-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.lost-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.lost-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.lost-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.lost-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.lost-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.lost-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.lost-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.lost-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.lost-panel{width:100%}.lost-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.lost-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.lost-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.lost-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.lost-tool .card-head.compact{margin-bottom:9px}
.lost-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.lost-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.lost-tool .btn,.lost-tool .soft-btn,.lost-tool .segmented button,.lost-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.lost-tool .btn:hover,.lost-tool .soft-btn:hover,.lost-tool .segmented button:hover,.lost-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.lost-tool .btn{padding:0 12px}.lost-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.lost-tool .segmented{display:flex;gap:7px;margin:0}.lost-tool .segmented button{padding:0 13px}
.lost-tool .segmented button[aria-pressed="true"],.lost-tool .soft-btn[aria-pressed="true"],.lost-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.lost-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.lost-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.lost-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.lost-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.lost-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.lost-tool .range-control input{width:100%;accent-color:#8b5cf6}.lost-tool .range-control b{color:#7c3aed;font-size:13px}
.lost-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.lost-tool .soft-btn{padding:0 12px}
.lost-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.lost-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.lost-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.lost-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.lost-tool .info-title{display:flex;align-items:center;gap:10px}.lost-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.lost-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.lost-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.lost-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.lost-tool .facts{display:grid;gap:6px;margin-top:10px}.lost-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.lost-tool .facts b{color:#7c3aed;font-size:13.5px}.lost-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.lost-tool .fun,.lost-tool .warn,.lost-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.lost-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.lost-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.lost-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.lost-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.lost-tool .state-big.up{color:#0f766e}.lost-tool .state-big.down{color:#b45309}
.lost-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.lost-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.lost-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.lost-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.lost-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.lost-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.lost-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.lost-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.lost-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.lost-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.lost-tool .qopt:hover{filter:brightness(.985)}.lost-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.lost-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.lost-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.lost-tool .qfb,.lost-tool .score{font-size:13px;font-weight:900}.lost-tool .qfb.ok{color:#15803d}.lost-tool .qfb.no{color:#be123c}.lost-tool .score{color:#7c3aed}
.lost-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.lost-grid{grid-template-columns:1fr;align-items:start}.lost-side{grid-template-rows:auto auto;height:auto}.lost-tool .control-grid{grid-template-columns:1fr}.lost-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.lost-hero{flex-wrap:wrap;padding:12px}.lost-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.lost-tabs{grid-template-columns:1fr}.lost-tabs .tab{min-height:40px}.lost-card{padding:11px;border-radius:18px}.lost-tool .card-head{align-items:flex-start;flex-direction:column}.lost-tool .head-actions{width:100%;justify-content:space-between}.lost-tool .head-actions .segmented{flex:1;min-width:0}.lost-tool .head-actions .segmented button{flex:1;padding:0 8px}.lost-tool .qopts{grid-template-columns:1fr}.lost-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.lost-tool *{transition:none!important}}

.lost-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.lost-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.lost-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.lost-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.lost-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.lost-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.lost-tool .checklist{display:grid;gap:6px;margin-top:10px}
.lost-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.lost-tool .checklist .ok{color:#15803d}.lost-tool .checklist .no{color:#be123c}.lost-tool .checklist .wait{color:#94a3b8}
.lost-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.lost-tool .process span{flex:1}.lost-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.lost-tool .process .on{color:#0284c7}.lost-tool .process i.on{color:#ec4899}
@media(max-width:640px){.lost-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.lost-tool .slider-pair{grid-template-columns:1fr}}

.lost-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.lost-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.lost-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.lost-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.lost-tool .pulse-box{display:grid;gap:8px;margin-bottom:4px}
.lost-tool .opt-col{display:grid;gap:6px}
.lost-tool .opt-col .soft-btn{min-height:44px;padding:8px 12px;text-align:left;line-height:1.35;white-space:normal}
.lost-tool .soft-btn:disabled{opacity:.6;cursor:default;transform:none}.lost-tool .soft-btn[aria-pressed="true"]:disabled{opacity:1}
.lost-tool .dial-pad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.lost-tool .dial-pad .btn{min-height:44px;font-size:18px}
.lost-tool .own-in{min-height:44px;border:1px solid #ddd6fe;border-radius:12px;padding:0 12px;font:inherit;font-size:18px;letter-spacing:.15em}

.lost-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.lost-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="lost-tool" data-tool-root>
  <div class="lost-hero">
    <div class="lost-hero-icon" aria-hidden="true">🧭</div>
    <div>
      <p class="lost-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="lost-lead" data-t="lead"></p>
    </div>
    <div class="lost-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="lAudioNotice" class="lost-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="lost-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="lost" data-t="tab_lost"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="phone" data-t="tab_phone"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="str" data-t="tab_str"></button>
  </div>
  <section id="l-lost" class="lost-panel" role="tabpanel">
    <div class="lost-grid">
      <article class="lost-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_lost"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_lost" role="img" data-ta="cv_lost"></canvas></div>
        <p id="hud_lost" class="hud" aria-live="polite"></p>
        <div id="lsSteps" class="stage-row" role="group" data-ta="stepsL"></div>
      </article>
      <div class="lost-side">
        <aside class="lost-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_lost"></span><h2 data-t="sh_lost"></h2></div></div>
          
          <div id="info_lost" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_lost" class="lost-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="l-phone" class="lost-panel hidden" role="tabpanel">
    <div class="lost-grid">
      <article class="lost-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_phone"></h2></div>
          <div class="head-actions"><div class="segmented" role="group" data-ta="modeL"><button type="button" data-pmode="game" aria-pressed="true" data-t="mGame"></button><button type="button" data-pmode="own" aria-pressed="false" data-t="mOwn"></button></div></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_phone" role="img" data-ta="cv_phone"></canvas></div>
        <p id="hud_phone" class="hud" aria-live="polite"></p>
      </article>
      <div class="lost-side">
        <aside class="lost-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_phone"></span><h2 data-t="sh_phone"></h2></div></div>
          <div id="phoneBox" class="pulse-box"></div>
          <div id="info_phone" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_phone" class="lost-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="l-str" class="lost-panel hidden" role="tabpanel">
    <div class="lost-grid">
      <article class="lost-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_str"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_str" role="img" data-ta="cv_str"></canvas></div>
        <p id="hud_str" class="hud" aria-live="polite"></p>
      </article>
      <div class="lost-side">
        <aside class="lost-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_str"></span><h2 data-t="sh_str"></h2></div></div>
          <div id="strBox" class="pulse-box"></div>
          <div id="info_str" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_str" class="lost-card quiz-card"></article>
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
    const audioNotice = $('lAudioNotice');
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
      title: ['Khi bị lạc và gặp người lạ', 'If You Get Lost or Meet a Stranger'],
      lead: ['Biết nhờ đúng người khi bị lạc, nhớ số điện thoại của bố mẹ và tự tin nói "Không" với người lạ.', 'Know who to ask when you’re lost, remember your parents’ phone number and confidently say “No” to strangers.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Thử ngay', 'Try it'],
      tab_lost: ['🧭 Khi bị lạc', '🧭 If you get lost'], h_lost: ['Lạc ở chợ phiên, em nhờ ai?', 'Lost at the market: who do you ask?'],
      cv_lost: ['Khu chợ đông người. Bấm vào từng người để xem có nên nhờ giúp không', 'A busy market. Tap each person to see if they are safe to ask'],
      se_lost: ['Ghi nhớ', 'Remember'], sh_lost: ['4 bước khi bị lạc', '4 steps when lost'],
      tab_phone: ['📱 Nhớ số điện thoại', '📱 Remember the number'], h_phone: ['Tập nhớ số điện thoại', 'Practise remembering a number'],
      cv_phone: ['Chiếc điện thoại hiện số trong vài giây rồi ẩn đi', 'A phone shows a number for a few seconds, then hides it'],
      se_phone: ['Bàn phím', 'Keypad'], sh_phone: ['Gõ lại số em nhớ', 'Type the number you remember'],
      tab_str: ['🙅 Gặp người lạ', '🙅 Meeting strangers'], h_str: ['Em sẽ trả lời thế nào?', 'How would you answer?'],
      cv_str: ['Một người lạ nói chuyện với em', 'A stranger talks to you'],
      se_str: ['Tình huống', 'Situation'], sh_str: ['Chọn cách ứng xử', 'Choose what to do'],
      stepsL: ['Các bước', 'Steps'], modeL: ['Chế độ', 'Mode'], mGame: ['🎯 Luyện trí nhớ', '🎯 Memory game'], mOwn: ['👨‍👩‍👧 Số của bố mẹ', '👨‍👩‍👧 Parents’ number'], showAgain: ['👀 Xem lại', '👀 Show again']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    const emo = (ctx, e, x, y, px) => { ctx.font = emojiFont(px); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e, x, y); };
    // người: (x, y) là chân; s là chiều cao
    function person(ctx, x, y, s, o = {}) {
      const hy = y - s * .86, hr = s * .11;
      ctx.save();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = Math.max(2, s * .05); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x - s * .06, y - s * .38); ctx.lineTo(x - s * .08, y); ctx.moveTo(x + s * .06, y - s * .38); ctx.lineTo(x + s * .08, y); ctx.stroke();
      ctx.fillStyle = o.body || '#60a5fa'; rr(ctx, x - s * .16, hy + hr * .9, s * .32, s * .42, s * .07); ctx.fill();
      if (o.badge) { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x - s * .07, hy + hr * 1.6, s * .03, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = o.body || '#60a5fa'; ctx.lineWidth = Math.max(2, s * .06);
      ctx.beginPath(); ctx.moveTo(x - s * .15, hy + hr * 1.3); ctx.lineTo(x - s * .24 + (o.wave ? -s * .05 : 0), hy + hr * (o.wave ? -.2 : 4)); ctx.moveTo(x + s * .15, hy + hr * 1.3); ctx.lineTo(x + s * .24, hy + hr * (o.reach ? 1.5 : 4)); ctx.stroke();
      ctx.fillStyle = '#fde7c7'; ctx.beginPath(); ctx.arc(x, hy, hr, 0, TAU); ctx.fill();
      ctx.fillStyle = o.hair || '#3f2a14'; ctx.beginPath(); ctx.arc(x, hy - hr * .1, hr * 1.02, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
      if (o.cap) { ctx.fillStyle = o.cap; ctx.fillRect(x - hr * 1.1, hy - hr * 1.15, hr * 2.2, hr * .5); ctx.fillRect(x - hr * .2, hy - hr * .7, hr * 1.5, hr * .2); }
      if (o.hat) { ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.moveTo(x - hr * 1.8, hy - hr * .4); ctx.lineTo(x, hy - hr * 1.8); ctx.lineTo(x + hr * 1.8, hy - hr * .4); ctx.closePath(); ctx.fill(); }
      if (o.helmet) { ctx.fillStyle = o.helmet; ctx.beginPath(); ctx.arc(x, hy - hr * .1, hr * 1.25, Math.PI, TAU); ctx.fill(); }
      ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(x - hr * .35, hy, hr * .12, 0, TAU); ctx.arc(x + hr * .35, hy, hr * .12, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = Math.max(1, s * .015); ctx.beginPath(); if (o.sad) ctx.arc(x, hy + hr * .65, hr * .3, 1.2 * Math.PI, 1.8 * Math.PI); else ctx.arc(x, hy + hr * .25, hr * .35, .2 * Math.PI, .8 * Math.PI); ctx.stroke();
      if (o.tear) { ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(x - hr * .45, hy + hr * .45 + (clock * 10 % 6), hr * .12, 0, TAU); ctx.fill(); }
      ctx.restore();
    }

    /* =====================================================================
       1. KHI BỊ LẠC
       ===================================================================== */
    const PEOPLE = [
      { x: .12, y: .9, safe: true, o: { body: '#4d7c0f', cap: '#365314', badge: 1 }, vi: ['Chú công an', 'Công an mặc đồng phục là người an toàn để nhờ giúp. Hãy nói tên em và nhờ chú gọi cho bố mẹ.'], en: ['A police officer', 'A uniformed police officer is safe to ask. Tell them your name and ask them to call your parents.'] },
      { x: .3, y: .52, safe: true, o: { body: '#ec4899', hair: '#1f2937' }, stall: 1, vi: ['Cô bán hàng ở sạp', 'Người bán hàng đứng tại sạp của mình, ở chỗ đông người, có thể giúp em gọi điện hoặc báo ban quản lý chợ.'], en: ['A stallholder at her stall', 'A seller at her own stall, in a busy spot, can help you call or tell the market office.'] },
      { x: .55, y: .5, safe: true, o: { body: '#0ea5e9' }, desk: 1, vi: ['Cô ở quầy thông tin', 'Quầy thông tin, quầy thu ngân là nơi tốt nhất để báo bị lạc. Họ có thể đọc loa tìm bố mẹ em.'], en: ['The information desk', 'An information or checkout desk is the best place to report being lost. They can make an announcement.'] },
      { x: .9, y: .88, safe: true, o: { body: '#1e3a8a', cap: '#1e293b', badge: 1 }, vi: ['Chú bảo vệ ở cổng', 'Bảo vệ mặc đồng phục, đứng ở cổng, là người có nhiệm vụ giúp đỡ mọi người.'], en: ['The security guard at the gate', 'A uniformed guard at the gate is there to help people.'] },
      { x: .74, y: .9, safe: true, o: { body: '#a855f7' }, child: 1, vi: ['Cô đang dắt em bé', 'Một người mẹ đang đi cùng con nhỏ thường sẵn lòng giúp em. Nhờ cô đưa em đến quầy thông tin hoặc gọi cho bố mẹ.'], en: ['A mum with a small child', 'A parent with young children is usually happy to help. Ask her to take you to the info desk or call your parents.'] },
      { x: .95, y: .58, safe: false, o: { body: '#475569', helmet: '#111827' }, bike: 1, vi: ['Người đi xe máy gọi "Lên xe chú chở đi tìm mẹ!"', 'Không lên xe của người lạ, dù họ nói gì. Ở yên chỗ đông người và nhờ người mặc đồng phục.'], en: ['A motorbike rider: “Hop on, I’ll take you to your mum!”', 'Never get on a stranger’s bike, whatever they say. Stay where it’s busy and ask someone in uniform.'] },
      { x: .06, y: .58, safe: false, o: { body: '#78716c', reach: 1 }, alley: 1, vi: ['Người lạ ở góc vắng: "Đi theo chú ra ngoài kia"', 'Không đi theo ai ra khỏi khu vực, nhất là tới chỗ vắng. Người tốt sẽ giúp em ngay tại chỗ đông người.'], en: ['A stranger in a quiet corner: “Come outside with me”', 'Never leave the area with anyone, especially to quiet places. A helpful person helps you right where people are.'] }
    ];
    const LSTEPS = [
      { vi: ['Đứng yên tại chỗ', 'Không chạy lung tung đi tìm. Bố mẹ sẽ quay lại chỗ vừa lạc để tìm em.'], en: ['Stay where you are', 'Don’t wander off searching. Your parents will come back to where they last saw you.'] },
      { vi: ['Tìm người an toàn để nhờ', 'Người mặc đồng phục (công an, bảo vệ), quầy thông tin, người bán hàng tại sạp, cô đang dắt con nhỏ.'], en: ['Find a safe person', 'Someone in uniform, an information desk, a seller at their stall, or a parent with children.'] },
      { vi: ['Nói rõ thông tin', 'Nói tên em, tên bố mẹ và số điện thoại của bố mẹ.'], en: ['Give your details', 'Say your name, your parents’ names and their phone number.'] },
      { vi: ['Không đi theo ai ra khỏi khu vực', 'Dù ai rủ, em cũng chỉ chờ ở chỗ đông người hoặc tại quầy thông tin.'], en: ['Don’t leave with anyone', 'Whoever asks, wait in a busy place or at the information desk.'] }
    ];
    let ls = { step: 0, picked: [], last: -1, infoKey: '' };
    const lsC = mk('c_lost', (w) => clamp(w * .6, 290, 490));
    function lsGeom() { const { w, h } = lsC; return { w, h, s: Math.min(h * .26, w * .12) }; }
    function drawLost() {
      const g = lsGeom(), { w, h } = g, ctx = lsC.ctx;
      if (!w) return;
      ctx.fillStyle = '#fef3c7'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#e7e5e4'; ctx.fillRect(0, h * .55, w, h * .45);
      ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, h * .15, w * .12, h * .45); textLight(ctx, T('góc vắng', 'quiet corner'), w * .06, h * .2, '#57534e', 10.5, 'center', 800);
      for (const [x, c] of [[.22, '#fb7185'], [.4, '#34d399'], [.72, '#fbbf24']]) { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(w * (x - .08), h * .3); ctx.lineTo(w * (x + .08), h * .3); ctx.lineTo(w * (x + .07), h * .2); ctx.lineTo(w * (x - .07), h * .2); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#a16207'; ctx.fillRect(w * (x - .07), h * .38, w * .14, h * .06); }
      ctx.fillStyle = '#0ea5e9'; rr(ctx, w * .5, h * .36, w * .1, h * .1, 6); ctx.fill(); textLight(ctx, 'i', w * .55, h * .41, '#fff', 18, 'center', 900);
      ctx.fillStyle = '#78350f'; ctx.fillRect(w * .86, h * .55, w * .02, h * .4); ctx.fillRect(w * .98, h * .55, w * .02, h * .4); textLight(ctx, T('Cổng', 'Gate'), w * .93, h * .58, '#78350f', 11, 'center', 900);
      if (PEOPLE[5]) { ctx.fillStyle = '#334155'; rr(ctx, w * .88, h * .5, w * .1, h * .04, 6); ctx.fill(); ctx.beginPath(); ctx.arc(w * .9, h * .55, 6, 0, TAU); ctx.arc(w * .96, h * .55, 6, 0, TAU); ctx.fill(); }
      PEOPLE.forEach((p, i) => {
        const x = p.x * w, y = p.y * h, s = p.child ? g.s * .95 : g.s;
        person(ctx, x, y, s * (p.desk || p.stall ? .7 : 1), p.o);
        if (p.child) person(ctx, x + s * .3, y, s * .55, { body: '#facc15' });
        const pk = ls.picked.includes(i);
        if (pk) emo(ctx, p.safe ? '✅' : '❌', x, y - s * (p.desk || p.stall ? .78 : 1.12), 20);
        else emo(ctx, '❓', x, y - s * (p.desk || p.stall ? .78 : 1.12), 16);
      });
      person(ctx, w * .45, h * .92, g.s * .6, { body: '#f472b6', sad: 1, tear: 1 });
      bubble(ctx, T('Bố mẹ ơi, con ở đây!', 'Mum? Dad? I’m here!'), w * .45, h * .62, 12, '#fff', '#be185d');
      const safeN = PEOPLE.filter((p) => p.safe).length, got = ls.picked.filter((i) => PEOPLE[i].safe).length;
      ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, 8, 8, 200, 26, 10); ctx.fill();
      textLight(ctx, T(`Người an toàn đã tìm: ${got}/${safeN}`, `Safe people found: ${got}/${safeN}`), 16, 21, '#6d28d9', 12, 'left', 900);
    }
    lsC.c.addEventListener('pointerdown', (e) => {
      const g = lsGeom(), p = localPoint(lsC.c, e);
      let best = -1, bd = 1e9;
      PEOPLE.forEach((q, i) => { const x = q.x * g.w, y = q.y * g.h - g.s * .5, d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = i; } });
      if (best >= 0 && bd < g.s * .7) { cancelSpeech(); if (!ls.picked.includes(best)) ls.picked.push(best); ls.last = best; lsInfo(true); }
    });
    function lsInfo(force) {
      const key = [lang, ls.step, ls.last].join('|'); if (key === ls.infoKey && !force) return; ls.infoKey = key;
      root.querySelectorAll('#lsSteps button').forEach((b, i) => { b.setAttribute('aria-pressed', String(i === ls.step)); b.querySelector('span').textContent = L(LSTEPS[i])[0]; });
      const st = L(LSTEPS[ls.step]), rows = [[T(`Bước ${ls.step + 1}`, `Step ${ls.step + 1}`), `${st[0]}: ${st[1]}`]];
      let title = T('Khi bị lạc, em làm gì?', 'What to do if you’re lost'), emoji = '🧭', notes = [['tip', T('💡 Bấm vào từng người trong chợ để xem có nên nhờ giúp không.', '💡 Tap each person in the market to see if they’re safe to ask.')]];
      if (ls.last >= 0) { const p = PEOPLE[ls.last], d = L({ vi: p.vi, en: p.en }); title = d[0]; emoji = p.safe ? '✅' : '❌'; rows.unshift([p.safe ? T('Nên nhờ', 'Safe to ask') : T('Không nên', 'Not safe'), d[1]]); }
      infoBox($('info_lost'), { emo: emoji, title, rows, notes });
      setText('hud_lost', ls.last >= 0 ? `${PEOPLE[ls.last].safe ? '✅' : '❌'} ${L({ vi: PEOPLE[ls.last].vi, en: PEOPLE[ls.last].en })[0]}` : T('🧭 Bấm vào từng người để chọn người nên nhờ giúp', '🧭 Tap people to choose who to ask'));
    }
    $('lsSteps').innerHTML = LSTEPS.map((_, i) => `<button type="button" data-s="${i}" aria-pressed="false"><b>${i + 1}</b><span></span></button>`).join('');
    $('lsSteps').addEventListener('click', (e) => { const b = e.target.closest('[data-s]'); if (!b) return; cancelSpeech(); ls.step = +b.dataset.s; lsInfo(true); });
    TABS.lost = { frame() { drawLost(); }, refresh() { ls.infoKey = ''; lsInfo(true); } };
    QUIZZES.push(makeQuiz($('quiz_lost'), {
      vi: [
        { q: 'Khi bị lạc bố mẹ, việc đầu tiên nên làm là gì?', a: ['Đứng yên tại chỗ', 'Chạy khắp nơi tìm', 'Về nhà một mình', 'Trốn vào góc'], why: 'Bố mẹ sẽ quay lại chỗ vừa lạc để tìm em.' },
        { q: 'Ai là người an toàn để nhờ khi bị lạc?', a: ['Chú công an, bảo vệ mặc đồng phục', 'Người lạ rủ ra chỗ vắng', 'Người đi xe máy rủ lên xe', 'Bất kỳ ai gọi tên em'], why: 'Người mặc đồng phục và quầy thông tin có nhiệm vụ giúp đỡ.' },
        { q: 'Người lạ nói "Lên xe chú chở đi tìm mẹ", em làm gì?', a: ['Không lên xe, ở lại chỗ đông người', 'Lên xe ngay', 'Đi theo một đoạn', 'Hỏi tên rồi lên xe'], why: 'Không bao giờ đi theo hay lên xe người lạ.' },
        { q: 'Em cần nhớ những thông tin gì để nói khi bị lạc?', a: ['Tên mình, tên và số điện thoại bố mẹ', 'Mật khẩu điện thoại', 'Tên bài hát yêu thích', 'Không cần nhớ gì'], why: 'Để người giúp đỡ liên lạc được với bố mẹ.' },
        { q: 'Ở siêu thị bị lạc, nơi tốt nhất để đến là đâu?', a: ['Quầy thông tin hoặc quầy thu ngân', 'Bãi đỗ xe', 'Nhà vệ sinh', 'Lối thoát hiểm vắng'], why: 'Nhân viên có thể đọc loa tìm bố mẹ em.' }
      ],
      en: [
        { q: 'If you lose your parents, first you…', a: ['Stay where you are', 'Run around looking', 'Go home alone', 'Hide in a corner'], why: 'Your parents will come back to where they last saw you.' },
        { q: 'Who is safe to ask when lost?', a: ['A uniformed police officer or guard', 'A stranger in a quiet corner', 'A rider offering a lift', 'Anyone who knows your name'], why: 'Uniformed staff and information desks are there to help.' },
        { q: 'A stranger says “Get on, I’ll take you to your mum”. You…', a: ['Don’t get on; stay where it’s busy', 'Get on', 'Go a little way', 'Ask their name, then go'], why: 'Never go with or ride with a stranger.' },
        { q: 'What should you be able to tell a helper?', a: ['Your name, your parents’ names and number', 'Your phone password', 'Your favourite song', 'Nothing'], why: 'So they can reach your parents.' },
        { q: 'Lost in a supermarket, the best place to go is…', a: ['The information or checkout desk', 'The car park', 'The toilets', 'A quiet fire exit'], why: 'Staff can announce for your parents.' }
      ]
    }));

    /* =====================================================================
       2. NHỚ SỐ ĐIỆN THOẠI (không lưu lại số nào)
       ===================================================================== */
    let ph = { mode: 'game', target: '', typed: '', show: 0, level: 1, score: 0, msg: null, own: '', ownSet: false, infoKey: '' };
    const phC = mk('c_phone', (w) => clamp(w * .55, 270, 440));
    const fmt = (s) => s.replace(/^(\d{4})(\d{0,3})(\d{0,3}).*/, (m, a, b, c) => [a, b, c].filter(Boolean).join(' '));
    function phNew() { const pre = ['09', '03', '07', '08'][Math.floor(rand(0, 4))]; let s = pre; while (s.length < 10) s += Math.floor(rand(0, 10)); ph.target = s; ph.typed = ''; ph.show = Math.max(3, 9 - ph.level * 1.5); ph.msg = null; phRender(); }
    function drawPhone(dt) {
      const { w, h, ctx } = phC;
      if (!w) return;
      if (ph.show > 0) ph.show -= dt;
      ctx.fillStyle = '#f5f3ff'; ctx.fillRect(0, 0, w, h);
      const pw = Math.min(w * .42, h * .5), phh = pw * 1.9 > h * .92 ? h * .92 : pw * 1.9, px = w / 2 - pw / 2, py = (h - phh) / 2;
      ctx.fillStyle = '#1e293b'; rr(ctx, px, py, pw, phh, pw * .12); ctx.fill();
      ctx.fillStyle = '#e0f2fe'; rr(ctx, px + pw * .06, py + phh * .06, pw * .88, phh * .86, pw * .06); ctx.fill();
      ctx.fillStyle = '#334155'; rr(ctx, w / 2 - pw * .12, py + phh * .025, pw * .24, phh * .015, 4); ctx.fill();
      const target = ph.mode === 'own' ? ph.own : ph.target;
      let fs = Math.min(pw * .14, 28); ctx.font = `900 ${fs}px system-ui, sans-serif`; while (ctx.measureText('0000 000 000').width > pw * .8 && fs > 10) { fs -= 1; ctx.font = `900 ${fs}px system-ui, sans-serif`; }
      if (!target) textLight(ctx, T('Nhờ bố mẹ nhập số ở bên cạnh', 'Ask a parent to enter it alongside'), w / 2, h * .45, '#475569', 12, 'center', 900);
      else if (ph.show > 0) {
        textLight(ctx, T('Nhớ số này nhé!', 'Remember this!'), w / 2, py + phh * .2, '#6d28d9', 13, 'center', 900);
        textLight(ctx, fmt(target), w / 2, py + phh * .4, '#0f172a', fs, 'center', 900);
        const frac = ph.show / Math.max(3, 9 - ph.level * 1.5);
        ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(w / 2, py + phh * .65, pw * .14, -Math.PI / 2, -Math.PI / 2 + frac * TAU); ctx.stroke();
        textLight(ctx, String(Math.ceil(ph.show)), w / 2, py + phh * .65, '#be185d', 18, 'center', 900);
      } else {
        textLight(ctx, T('Gõ lại số em nhớ', 'Type what you remember'), w / 2, py + phh * .2, '#6d28d9', 13, 'center', 900);
        textLight(ctx, fmt(ph.typed.padEnd(10, '_')).replace(/_/g, '•'), w / 2, py + phh * .4, '#0f172a', fs * .95, 'center', 900);
        if (ph.msg) textLight(ctx, ph.msg[0] === 'fun' ? '🎉' : '🤔', w / 2, py + phh * .62, '#000', 34, 'center', 400);
      }
      textLight(ctx, T('Mẹo: chia thành 3 nhóm 4 – 3 – 3', 'Tip: split it into 4 – 3 – 3'), w / 2, h - 10, '#7c3aed', 11, 'center', 900);
    }
    function phRender() {
      const box = $('phoneBox');
      let html = '';
      if (ph.mode === 'own' && !ph.ownSet) {
        html = `<p class="muted" style="margin:0">${T('Bố mẹ nhập số điện thoại của mình (10 số). Số này không được lưu lại, sẽ mất khi tải lại trang.', 'A parent types their 10-digit number. It isn’t saved and disappears when you reload.')}</p>
          <input id="phOwnIn" type="password" inputmode="numeric" maxlength="11" autocomplete="off" class="own-in" placeholder="09xx xxx xxx">
          <button id="phOwnOk" class="btn main" type="button">${T('Xong, cho bé tập', 'Done, let the child practise')}</button>`;
      } else {
        html = `<div class="dial-pad">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✔'].map((k) => `<button type="button" class="btn${k === '✔' ? ' main' : ''}" data-k="${k}">${k}</button>`).join('')}</div>
          <p class="score" style="margin:0">${ph.mode === 'game' ? T(`Cấp ${ph.level} – Đúng ${ph.score}`, `Level ${ph.level} – ${ph.score} correct`) : T('Tập gõ số của bố mẹ', 'Practising your parent’s number')}</p>
          ${ph.msg ? `<p class="${ph.msg[0]}" style="margin:0">${ph.msg[1]}</p>` : ''}
          <button id="phAgain" class="btn" type="button">${STR.showAgain[lang === 'en' ? 1 : 0]}</button>`;
      }
      box.innerHTML = html;
      const okBtn = $('phOwnOk');
      if (okBtn) okBtn.onclick = () => { const v = String($('phOwnIn').value || '').replace(/\D/g, ''); if (v.length < 9) { $('phOwnIn').focus(); return; } ph.own = v; ph.ownSet = true; ph.typed = ''; ph.show = 6; ph.msg = null; phRender(); };
      const ag = $('phAgain'); if (ag) ag.onclick = () => { ph.show = ph.mode === 'own' ? 6 : Math.max(3, 9 - ph.level * 1.5); ph.typed = ''; ph.msg = null; phRender(); };
    }
    $('phoneBox').addEventListener('click', (e) => {
      const b = e.target.closest('[data-k]'); if (!b || ph.show > 0) return; const k = b.dataset.k, target = ph.mode === 'own' ? ph.own : ph.target;
      if (k === '⌫') ph.typed = ph.typed.slice(0, -1);
      else if (k === '✔') {
        if (ph.typed === target) { ph.msg = ['fun', T('🎉 Chính xác! Em nhớ giỏi lắm.', '🎉 Exactly right! Great memory.')]; if (ph.mode === 'game') { ph.score++; ph.level = Math.min(5, ph.level + 1); setTimeout(() => { if (!destroyed && ph.mode === 'game') phNew(); }, 1400); } }
        else { let same = 0; for (let i = 0; i < target.length; i++) if (ph.typed[i] === target[i]) same++; ph.msg = ['warn', T(`Đúng ${same}/${target.length} số. Bấm "Xem lại" để thử lần nữa nhé!`, `${same}/${target.length} digits right. Press “Show again” to try once more!`)]; }
      } else if (ph.typed.length < 10) ph.typed += k;
      phRender();
    });
    root.querySelectorAll('[data-pmode]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); ph.mode = b.dataset.pmode; pressGroup('[data-pmode]', 'pmode', ph.mode); ph.typed = ''; ph.msg = null; if (ph.mode === 'game') phNew(); else { ph.show = ph.ownSet ? 6 : 0; phRender(); } phInfo(true); }));
    function phInfo(force) {
      if (ph.infoKey === lang && !force) return; ph.infoKey = lang;
      infoBox($('info_phone'), {
        emo: '📱', title: T('Vì sao phải nhớ số của bố mẹ?', 'Why remember your parents’ number?'),
        rows: [[T('Khi bị lạc', 'When lost'), T('Người giúp đỡ có thể gọi ngay cho bố mẹ em.', 'A helper can call your parents right away.')], [T('Cách nhớ', 'How to remember'), T('Chia số thành nhóm 4 – 3 – 3, đọc to nhiều lần, hát thành bài, tập mỗi ngày.', 'Split it 4 – 3 – 3, say it aloud, turn it into a song, practise daily.')], [T('Mẹo thêm', 'Extra tip'), T('Nhờ bố mẹ viết số vào một tấm thẻ nhỏ để trong cặp sách.', 'Ask a parent to write the number on a small card in your school bag.')]],
        notes: [['tip', T('🔒 Chỉ nói số điện thoại cho người giúp đỡ an toàn như công an, bảo vệ, thầy cô. Không đăng lên mạng.', '🔒 Only give the number to safe helpers like police, guards or teachers. Never post it online.')]]
      });
    }
    TABS.phone = { frame(dt) { drawPhone(dt); setText('hud_phone', ph.show > 0 ? T(`👀 Nhớ kỹ trong ${Math.ceil(ph.show)} giây…`, `👀 Memorise it: ${Math.ceil(ph.show)} s…`) : T('⌨️ Gõ lại số rồi bấm ✔', '⌨️ Type the number and press ✔')); }, refresh() { phInfo(true); if (!ph.target) phNew(); else phRender(); } };
    QUIZZES.push(makeQuiz($('quiz_phone'), {
      vi: [
        { q: 'Số điện thoại di động ở Việt Nam thường có mấy chữ số?', a: ['10 chữ số', '3 chữ số', '5 chữ số', '20 chữ số'], why: 'Số di động có 10 chữ số, thường bắt đầu bằng 0.' },
        { q: 'Cách nào giúp nhớ số điện thoại dễ hơn?', a: ['Chia thành nhóm nhỏ 4 – 3 – 3', 'Đọc một lần duy nhất', 'Nhớ ngược từ cuối', 'Không cần nhớ'], why: 'Nhóm nhỏ giúp bộ não nhớ dễ hơn.' },
        { q: 'Em nên nói số điện thoại của bố mẹ cho ai?', a: ['Người giúp đỡ an toàn như công an, thầy cô', 'Bất kỳ ai hỏi', 'Người lạ trên mạng', 'Đăng lên mạng xã hội'], why: 'Giữ thông tin riêng tư, chỉ chia sẻ khi cần giúp đỡ.' },
        { q: 'Ngoài việc nhớ số, em có thể làm gì thêm?', a: ['Để một tấm thẻ ghi số trong cặp', 'Xăm số lên tay', 'Viết số lên áo', 'Không làm gì'], why: 'Tấm thẻ trong cặp giúp khi em quên.' },
        { q: 'Số điện thoại cấp cứu y tế là gì?', a: ['115', '113', '114', '111'], why: '113 công an, 114 cứu hỏa, 115 cấp cứu, 111 bảo vệ trẻ em.' }
      ],
      en: [
        { q: 'How many digits does a Vietnamese mobile number have?', a: ['10', '3', '5', '20'], why: 'Mobile numbers have 10 digits, usually starting with 0.' },
        { q: 'What makes a phone number easier to remember?', a: ['Splitting it into 4 – 3 – 3 chunks', 'Reading it only once', 'Learning it backwards', 'No need'], why: 'Small chunks are easier for your brain.' },
        { q: 'Who should you give your parents’ number to?', a: ['Safe helpers like police or teachers', 'Anyone who asks', 'Strangers online', 'Social media'], why: 'Keep it private; share it only when you need help.' },
        { q: 'Besides memorising, what else helps?', a: ['A card with the number in your bag', 'A tattoo', 'Writing it on your shirt', 'Nothing'], why: 'A card in your bag helps if you forget.' },
        { q: 'What is Vietnam’s ambulance number?', a: ['115', '113', '114', '111'], why: '113 police, 114 fire, 115 ambulance, 111 child protection.' }
      ]
    }));

    /* =====================================================================
       3. GẶP NGƯỜI LẠ
       ===================================================================== */
    const SIT = [
      { place: '🏫', say: { vi: 'Cháu ăn kẹo không? Chú cho cả túi này.', en: 'Want some sweets? You can have the whole bag.' },
        ans: { vi: [['Cháu cảm ơn, nhưng cháu không nhận ạ. Rồi đi về phía cô giáo.', 1, 'Lễ phép từ chối và đi về chỗ có người lớn quen. Không nhận quà, đồ ăn của người lạ.'], ['Nhận kẹo và cảm ơn', 0, 'Không nhận đồ ăn, quà của người lạ, dù trông họ rất tốt bụng.'], ['Đi theo chú để lấy thêm kẹo', 0, 'Tuyệt đối không đi theo người lạ.']], en: [['“No thank you.” Then walk towards the teacher.', 1, 'Politely refuse and go to an adult you know. Never take gifts or food from strangers.'], ['Take the sweets and say thanks', 0, 'Don’t take food or gifts from strangers, however kind they seem.'], ['Follow him for more sweets', 0, 'Never go with a stranger.']] } },
      { place: '🏫', say: { vi: 'Mẹ cháu bận, nhờ chú đến đón cháu. Đi với chú nhé!', en: 'Your mum’s busy. She asked me to pick you up. Come with me!' },
        ans: { vi: [['Hỏi "mật khẩu gia đình". Không đúng thì không đi, báo cô giáo gọi cho mẹ', 1, 'Bố mẹ sẽ báo trước nếu nhờ người khác đón. Cả nhà nên đặt một "mật khẩu" bí mật chỉ người được nhờ mới biết.'], ['Đi theo vì chú biết tên mẹ', 0, 'Người lạ có thể biết tên mẹ em. Hãy kiểm tra với cô giáo và bố mẹ trước.'], ['Đi một mình về nhà', 0, 'Hãy ở lại trường và nhờ cô giáo gọi cho bố mẹ.']], en: [['Ask for the family password. If it’s wrong, don’t go; ask the teacher to call Mum', 1, 'Parents tell you ahead if someone else is collecting you. Families can agree a secret password.'], ['Go, because he knows Mum’s name', 0, 'Strangers can learn names. Check with your teacher and parents first.'], ['Walk home alone', 0, 'Stay at school and ask your teacher to call your parents.']] } },
      { place: '🗺️', say: { vi: 'Cháu dẫn chú đến nhà văn hóa với, chú không biết đường.', en: 'Can you show me the way to the community hall? I’m lost.' },
        ans: { vi: [['"Chú hỏi người lớn khác nhé." Không dẫn đường', 1, 'Người lớn cần giúp đỡ sẽ hỏi người lớn khác, không nhờ trẻ em dẫn đi.'], ['Dẫn chú đi vì muốn giúp đỡ', 0, 'Giúp đỡ là tốt, nhưng không đi cùng người lạ đến bất cứ đâu.'], ['Lên xe chú để chỉ đường cho nhanh', 0, 'Không bao giờ lên xe người lạ.']], en: [['“Please ask a grown-up.” Don’t show the way', 1, 'Adults who need help should ask other adults, not children.'], ['Walk him there to be helpful', 0, 'Helping is good, but never go anywhere with a stranger.'], ['Ride in his car to show the way', 0, 'Never get into a stranger’s car.']] } },
      { place: '🏠', say: { vi: '(Gõ cửa) Chú là thợ sửa điện, cháu mở cửa cho chú vào nhé.', en: '(Knock knock) I’m the electrician. Open the door and let me in.' },
        ans: { vi: [['Không mở cửa. Nói vọng ra "Bố mẹ cháu đang bận, chú quay lại sau ạ" rồi gọi cho bố mẹ', 1, 'Khi ở nhà, không mở cửa cho người lạ và không nói là em đang ở nhà một mình.'], ['Mở cửa vì chú nói là thợ', 0, 'Bất kỳ ai cũng có thể nói mình là thợ. Hãy để bố mẹ quyết định.'], ['Nói "Nhà cháu không có ai, chỉ có mình cháu"', 0, 'Không bao giờ cho người lạ biết em ở nhà một mình.']], en: [['Don’t open. Call out “My parents are busy, please come back later”, then phone them', 1, 'Never open the door to strangers or say you’re home alone.'], ['Open because he says he’s an electrician', 0, 'Anyone can say that. Let your parents decide.'], ['Say “Nobody’s home but me”', 0, 'Never tell a stranger you’re alone.']] } },
      { place: '💻', say: { vi: '(Tin nhắn) Gửi anh ảnh và địa chỉ nhà em đi, anh tặng quà cho!', en: '(Message) Send me your photo and home address and I’ll send you a gift!' },
        ans: { vi: [['Không trả lời, không gửi, kể ngay với bố mẹ', 1, 'Không chia sẻ ảnh, địa chỉ, trường học với người lạ trên mạng. Có thể gọi 111 nếu thấy sợ.'], ['Gửi vì muốn có quà', 0, 'Người lạ trên mạng có thể không phải người tốt như họ nói.'], ['Giữ bí mật vì người đó dặn', 0, 'Không giữ bí mật kiểu này với bố mẹ.']], en: [['Don’t reply or send anything; tell a parent at once', 1, 'Never share photos, address or school with strangers online. In Vietnam you can call 111 if scared.'], ['Send them to get the gift', 0, 'Online strangers may not be who they say.'], ['Keep it secret as they asked', 0, 'Never keep secrets like this from your parents.']] } },
      { place: '🛝', say: { vi: '(Kéo tay em) Đi với chú, nhanh lên!', en: '(Grabs your arm) Come with me, hurry!' },
        ans: { vi: [['Hét to "Cứu với! Cháu không quen người này!", vùng chạy về chỗ đông người', 1, 'Hét – Chạy – Kể: hét thật to để mọi người chú ý, chạy về chỗ đông người, kể ngay với người lớn.'], ['Đi theo vì sợ', 0, 'Em có quyền hét và chạy để bảo vệ mình.'], ['Đứng im không nói gì', 0, 'Hãy hét thật to để mọi người xung quanh biết.']], en: [['Shout “Help! I don’t know this person!” and run to where people are', 1, 'Yell – Run – Tell: shout loudly, run to a busy place, tell an adult straight away.'], ['Go because you’re scared', 0, 'You have the right to shout and run to protect yourself.'], ['Freeze and stay silent', 0, 'Shout loudly so people nearby notice.']] } },
      { place: '🏫', say: { vi: 'Cháu xinh quá! Cháu học trường nào, mấy giờ tan học?', en: 'Aren’t you lovely! Which school do you go to, and when do you finish?' },
        ans: { vi: [['Không trả lời các câu hỏi riêng, đi về phía người lớn quen', 1, 'Tên trường, giờ tan học, địa chỉ là thông tin riêng, không nói với người lạ.'], ['Kể hết cho chú nghe', 0, 'Thông tin này có thể giúp người xấu tìm đến em.'], ['Hẹn chú hôm sau gặp lại', 0, 'Không hẹn gặp người lạ.']], en: [['Don’t answer personal questions; go to an adult you know', 1, 'School, finishing time and address are private; don’t tell strangers.'], ['Tell him everything', 0, 'This could help a bad person find you.'], ['Arrange to meet him tomorrow', 0, 'Never arrange to meet strangers.']] } },
      { place: '🎡', say: { vi: 'Cô là bạn của mẹ cháu đây. Đi công viên với cô không? Không cần xin phép đâu.', en: 'I’m your mum’s friend. Fancy the park? No need to ask her.' },
        ans: { vi: [['"Cháu phải hỏi bố mẹ trước ạ." Không đi khi bố mẹ chưa biết', 1, 'Dù là người quen, em cũng không đi đâu khi bố mẹ chưa đồng ý.'], ['Đi ngay vì cô quen mẹ', 0, 'Người lớn tốt sẽ luôn để em xin phép bố mẹ.'], ['Đi một lát rồi về', 0, 'Bố mẹ cần biết em ở đâu mọi lúc.']], en: [['“I have to ask my parents first.” Don’t go until they agree', 1, 'Even with people you know, don’t go anywhere without your parents’ OK.'], ['Go, she knows Mum', 0, 'A good adult always lets you check with your parents.'], ['Go for a little while', 0, 'Your parents need to know where you are.']] } }
    ];
    let sr = { i: 0, pick: -1, order: [0, 1, 2], score: 0, total: 0, infoKey: '' };
    const srC = mk('c_str', (w) => clamp(w * .5, 260, 420));
    function srNew(i) { sr.i = i; sr.pick = -1; sr.order = [0, 1, 2].sort(() => Math.random() - .5); srRender(); srInfo(true); }
    function drawStr() {
      const { w, h, ctx } = srC;
      if (!w) return;
      const s = SIT[sr.i];
      ctx.fillStyle = '#ecfeff'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#d1fae5'; ctx.fillRect(0, h * .78, w, h * .22);
      emo(ctx, s.place, w * .5, h * .14, 30);
      const S = Math.min(h * .5, w * .25);
      person(ctx, w * .7, h * .9, S, { body: '#64748b', reach: sr.i === 5 });
      person(ctx, w * .3, h * .9, S * .62, { body: '#f472b6', sad: sr.pick >= 0 && !L(s.ans)[sr.pick][1] });
      bubble(ctx, `"${L(s.say).slice(0, 46)}${L(s.say).length > 46 ? '…' : ''}"`, w * .6, h * .3, w < 420 ? 10.5 : 12, '#fff', '#334155');
      if (sr.pick >= 0) { const a = L(s.ans)[sr.pick]; bubble(ctx, a[1] ? T('✅ Em đã làm đúng!', '✅ Well done!') : T('❌ Chưa an toàn', '❌ Not safe'), w * .3, h * .5, 13, '#fff', a[1] ? '#15803d' : '#be123c'); }
      textLight(ctx, `${sr.i + 1}/${SIT.length}`, w - 10, h - 10, '#94a3b8', 11, 'right', 900);
    }
    function srRender() {
      const s = SIT[sr.i], A = L(s.ans);
      $('strBox').innerHTML = `<p class="qtext" style="margin:0"></p><div class="opt-col">${sr.order.map((j) => `<button type="button" class="soft-btn" data-sa="${j}"></button>`).join('')}</div>
        ${sr.pick >= 0 ? `<p class="${A[sr.pick][1] ? 'fun' : 'warn'}" style="margin:0"></p><button id="srNext" class="btn main" type="button">${T('Tình huống tiếp ▶', 'Next ▶')}</button>` : ''}
        <p class="score" style="margin:0">${T(`Đúng ${sr.score}/${sr.total}`, `${sr.score}/${sr.total} correct`)}</p>`;
      $('strBox').querySelector('.qtext').textContent = `${T('Người lạ nói:', 'The stranger says:')} "${L(s.say)}"`;
      $('strBox').querySelectorAll('[data-sa]').forEach((b) => { const j = +b.dataset.sa; b.textContent = A[j][0]; if (sr.pick >= 0) { b.disabled = true; if (A[j][1]) b.setAttribute('aria-pressed', 'true'); } });
      if (sr.pick >= 0) { $('strBox').querySelectorAll('p')[1].textContent = (A[sr.pick][1] ? '🎉 ' : '🤔 ') + (A[sr.pick][1] ? A[sr.pick][2] : `${A[sr.pick][2]} ${T('Cách đúng:', 'Better:')} ${A.find((x) => x[1])[0]}.`); $('srNext').onclick = () => { cancelSpeech(); srNew((sr.i + 1) % SIT.length); }; }
    }
    $('strBox').addEventListener('click', (e) => { const b = e.target.closest('[data-sa]'); if (!b || sr.pick >= 0) return; cancelSpeech(); sr.pick = +b.dataset.sa; sr.total++; if (L(SIT[sr.i].ans)[sr.pick][1]) sr.score++; srRender(); });
    function srInfo(force) {
      if (sr.infoKey === lang && !force) return; sr.infoKey = lang;
      infoBox($('info_str'), {
        emo: '🙅', title: T('Nhớ các quy tắc an toàn', 'Remember the safety rules'),
        rows: [[T('3 KHÔNG', '3 NOs'), T('Không nhận quà, không đi theo, không mở cửa cho người lạ.', 'No gifts, no going along, no opening the door to strangers.')], [T('Hét – Chạy – Kể', 'Yell – Run – Tell'), T('Bị kéo đi: hét thật to, chạy về chỗ đông người, kể ngay với người lớn.', 'If grabbed: shout loudly, run to a busy place, tell an adult at once.')], [T('Mật khẩu gia đình', 'Family password'), T('Cả nhà đặt một từ bí mật. Ai đến đón em mà không biết từ đó thì em không đi.', 'Agree a secret word. If someone collecting you doesn’t know it, don’t go.')]],
        notes: [['tip', T('💗 Phần lớn mọi người đều tốt. Các quy tắc này giúp em an toàn trong những lúc hiếm hoi gặp người không tốt.', '💗 Most people are kind. These rules keep you safe on the rare occasions someone isn’t.')], ['tip', T('📞 Gặp chuyện làm em sợ, hãy kể với bố mẹ, thầy cô hoặc gọi 111 – Tổng đài bảo vệ trẻ em.', '📞 If something scares you, tell a parent or teacher. In Vietnam you can call 111, the child protection line.')]]
      });
    }
    TABS.str = { frame() { drawStr(); setText('hud_str', `🙅 ${T('Tình huống', 'Situation')} ${sr.i + 1}/${SIT.length} – ${T('đúng', 'correct')} ${sr.score}/${sr.total}`); }, refresh() { sr.infoKey = ''; srInfo(true); srRender(); } };
    QUIZZES.push(makeQuiz($('quiz_str'), {
      vi: [
        { q: '"3 KHÔNG" với người lạ là gì?', a: ['Không nhận quà, không đi theo, không mở cửa', 'Không chào, không cười, không nói', 'Không ăn, không ngủ, không học', 'Không có quy tắc nào'], why: 'Ba điều giúp em an toàn khi gặp người lạ.' },
        { q: 'Có người lạ kéo tay em đi, em làm gì?', a: ['Hét to, chạy về chỗ đông người, kể với người lớn', 'Đi theo', 'Đứng im', 'Khóc một mình'], why: 'Hét – Chạy – Kể.' },
        { q: '"Mật khẩu gia đình" dùng để làm gì?', a: ['Kiểm tra người đến đón có đúng là được bố mẹ nhờ không', 'Mở điện thoại', 'Vào trò chơi', 'Mở cửa nhà'], why: 'Người không biết mật khẩu thì em không đi theo.' },
        { q: 'Ở nhà một mình, có người lạ gõ cửa, em làm gì?', a: ['Không mở cửa, gọi cho bố mẹ', 'Mở cửa ngay', 'Nói "Cháu ở nhà một mình"', 'Ra ngoài nói chuyện'], why: 'Không mở cửa và không cho biết em ở nhà một mình.' },
        { q: 'Người lạ hỏi tên trường và giờ tan học, em làm gì?', a: ['Không trả lời, đi về phía người lớn quen', 'Kể hết', 'Viết ra giấy cho họ', 'Hẹn gặp họ'], why: 'Đó là thông tin riêng tư.' }
      ],
      en: [
        { q: 'What are the “3 NOs” with strangers?', a: ['No gifts, no going along, no opening the door', 'No hello, no smile, no talking', 'No food, sleep or study', 'There are none'], why: 'Three rules that keep you safe.' },
        { q: 'A stranger grabs your arm. You…', a: ['Shout, run to people, tell an adult', 'Go along', 'Freeze', 'Cry alone'], why: 'Yell – Run – Tell.' },
        { q: 'What is a family password for?', a: ['Checking that whoever collects you was really sent by your parents', 'Unlocking phones', 'Logging into games', 'Opening the house'], why: 'If they don’t know it, don’t go.' },
        { q: 'Home alone, a stranger knocks. You…', a: ['Don’t open; call your parents', 'Open at once', 'Say “I’m home alone”', 'Go out to chat'], why: 'Don’t open, and don’t reveal you’re alone.' },
        { q: 'A stranger asks your school and finishing time. You…', a: ['Don’t answer; go to an adult you know', 'Tell them', 'Write it down for them', 'Arrange to meet'], why: 'That information is private.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'lost';
    root.querySelectorAll('.lost-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.lost-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('l-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.lost-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.lost-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.lost-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
