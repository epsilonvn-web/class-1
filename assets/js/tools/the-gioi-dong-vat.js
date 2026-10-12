/* Epsilon Edu - Tool: The gioi dong vat (Animal world): phan loai, nguy trang, dong vat quy hiem Viet Nam
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.animalWorld = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "animalWorld";
  let activeCleanup = null;

  const CSS = `
.animal-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.animal-tool *{box-sizing:border-box}.animal-tool button,.animal-tool input{font:inherit}.animal-tool button{cursor:pointer}.animal-tool .hidden{display:none!important}
.animal-tool button:focus-visible,.animal-tool canvas:focus-visible,.animal-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.animal-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.animal-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.animal-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.animal-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.animal-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.animal-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.animal-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.animal-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.animal-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.animal-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.animal-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.animal-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.animal-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.animal-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.animal-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.animal-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.animal-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.animal-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.animal-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.animal-panel{width:100%}.animal-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.animal-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.animal-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.animal-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.animal-tool .card-head.compact{margin-bottom:9px}
.animal-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.animal-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.animal-tool .btn,.animal-tool .soft-btn,.animal-tool .segmented button,.animal-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.animal-tool .btn:hover,.animal-tool .soft-btn:hover,.animal-tool .segmented button:hover,.animal-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.animal-tool .btn{padding:0 12px}.animal-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.animal-tool .segmented{display:flex;gap:7px;margin:0}.animal-tool .segmented button{padding:0 13px}
.animal-tool .segmented button[aria-pressed="true"],.animal-tool .soft-btn[aria-pressed="true"],.animal-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.animal-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.animal-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.animal-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.animal-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.animal-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.animal-tool .range-control input{width:100%;accent-color:#8b5cf6}.animal-tool .range-control b{color:#7c3aed;font-size:13px}
.animal-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.animal-tool .soft-btn{padding:0 12px}
.animal-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.animal-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.animal-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.animal-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.animal-tool .info-title{display:flex;align-items:center;gap:10px}.animal-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.animal-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.animal-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.animal-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.animal-tool .facts{display:grid;gap:6px;margin-top:10px}.animal-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.animal-tool .facts b{color:#7c3aed;font-size:13.5px}.animal-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.animal-tool .fun,.animal-tool .warn,.animal-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.animal-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.animal-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.animal-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.animal-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.animal-tool .state-big.up{color:#0f766e}.animal-tool .state-big.down{color:#b45309}
.animal-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.animal-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.animal-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.animal-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.animal-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.animal-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.animal-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.animal-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.animal-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.animal-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.animal-tool .qopt:hover{filter:brightness(.985)}.animal-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.animal-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.animal-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.animal-tool .qfb,.animal-tool .score{font-size:13px;font-weight:900}.animal-tool .qfb.ok{color:#15803d}.animal-tool .qfb.no{color:#be123c}.animal-tool .score{color:#7c3aed}
.animal-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.animal-grid{grid-template-columns:1fr;align-items:start}.animal-side{grid-template-rows:auto auto;height:auto}.animal-tool .control-grid{grid-template-columns:1fr}.animal-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.animal-hero{flex-wrap:wrap;padding:12px}.animal-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.animal-tabs{grid-template-columns:1fr}.animal-tabs .tab{min-height:40px}.animal-card{padding:11px;border-radius:18px}.animal-tool .card-head{align-items:flex-start;flex-direction:column}.animal-tool .head-actions{width:100%;justify-content:space-between}.animal-tool .head-actions .segmented{flex:1;min-width:0}.animal-tool .head-actions .segmented button{flex:1;padding:0 8px}.animal-tool .qopts{grid-template-columns:1fr}.animal-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.animal-tool *{transition:none!important}}

.animal-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.animal-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.animal-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.animal-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.animal-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.animal-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.animal-tool .checklist{display:grid;gap:6px;margin-top:10px}
.animal-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.animal-tool .checklist .ok{color:#15803d}.animal-tool .checklist .no{color:#be123c}.animal-tool .checklist .wait{color:#94a3b8}
.animal-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.animal-tool .process span{flex:1}.animal-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.animal-tool .process .on{color:#0284c7}.animal-tool .process i.on{color:#ec4899}
@media(max-width:640px){.animal-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.animal-tool .slider-pair{grid-template-columns:1fr}}

.animal-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.animal-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.animal-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.animal-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.animal-tool .pulse-box{display:grid;gap:8px;margin-bottom:4px}
.animal-tool .opt-col{display:grid;gap:6px}.animal-tool .opt-col .soft-btn{min-height:42px;text-align:left;padding:6px 12px;border-width:2px}
.animal-tool .pledge{display:flex;gap:8px;align-items:flex-start;width:100%;padding:8px 10px;border:1px solid #e9d5ff;border-radius:12px;background:#fff;text-align:left;cursor:pointer;color:#334155;font-size:13px;line-height:1.35}
.animal-tool .pledge.on{background:#f0fdf4;border-color:#86efac}.animal-tool .pledge b{font-weight:800}
.animal-tool .cert{padding:12px;border-radius:16px;background:radial-gradient(circle at 20% 20%,#fef9c3,#fde68a);border:2px solid #f59e0b;text-align:center;color:#78350f;font-size:15px}.animal-tool .cert span{font-size:12.5px}
.animal-tool #c_hide{cursor:crosshair}

.animal-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.animal-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="animal-tool" data-tool-root>
  <div class="animal-hero">
    <div class="animal-hero-icon" aria-hidden="true">🐾</div>
    <div>
      <p class="animal-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="animal-lead" data-t="lead"></p>
    </div>
    <div class="animal-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="zAudioNotice" class="animal-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="animal-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="cls" data-t="tab_cls"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="hide" data-t="tab_hide"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="rare" data-t="tab_rare"></button>
  </div>
  <section id="z-cls" class="animal-panel" role="tabpanel">
    <div class="animal-grid">
      <article class="animal-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_cls"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_cls" role="img" data-ta="cv_cls"></canvas></div>
        <p id="hud_cls" class="hud" aria-live="polite"></p>
      </article>
      <div class="animal-side">
        <aside class="animal-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_cls"></span><h2 data-t="sh_cls"></h2></div></div>
          <div id="clsBox" class="pulse-box"></div>
          <div id="info_cls" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_cls" class="animal-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="z-hide" class="animal-panel hidden" role="tabpanel">
    <div class="animal-grid">
      <article class="animal-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_hide"></h2></div>
          <div class="head-actions"><button id="hdHint" class="btn" type="button" data-t="hint"></button><button id="hdNext" class="btn main" type="button" data-t="next"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_hide" role="img" data-ta="cv_hide"></canvas></div>
        <p id="hud_hide" class="hud" aria-live="polite"></p>
      </article>
      <div class="animal-side">
        <aside class="animal-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_hide"></span><h2 data-t="sh_hide"></h2></div></div>
          
          <div id="info_hide" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_hide" class="animal-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="z-rare" class="animal-panel hidden" role="tabpanel">
    <div class="animal-grid">
      <article class="animal-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_rare"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_rare" role="img" data-ta="cv_rare"></canvas></div>
        <p id="hud_rare" class="hud" aria-live="polite"></p>
      </article>
      <div class="animal-side">
        <aside class="animal-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_rare"></span><h2 data-t="sh_rare"></h2></div></div>
          <div id="pledgeBox" class="pulse-box"></div>
          <div id="info_rare" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_rare" class="animal-card quiz-card"></article>
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
    const audioNotice = $('zAudioNotice');
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

    const VN_N = [[102.14, 22.4], [102.5, 22.7], [103.2, 22.6], [103.95, 22.5], [104.8, 22.8], [105.3, 23.38], [106.0, 22.95], [106.7, 22.85], [106.8, 22.3], [106.72, 21.97], [107.4, 21.6], [108.0, 21.52]];
    const VN_COAST = [[107.7, 21.3], [107.3, 21.0], [107.05, 20.95], [106.8, 20.7], [106.6, 20.4], [106.3, 20.0], [106.0, 19.95], [105.85, 19.5], [105.75, 19.0], [105.78, 18.7], [106.1, 18.3], [106.45, 17.95], [106.65, 17.45], [107.1, 17.0], [107.65, 16.5], [108.25, 16.05], [108.35, 15.85], [108.85, 15.15], [109.0, 14.65], [109.25, 13.75], [109.35, 13.05], [109.45, 12.85], [109.22, 12.25], [109.2, 11.9], [109.0, 11.55], [108.3, 10.95], [108.1, 10.9], [107.8, 10.65], [107.08, 10.35], [106.75, 10.3], [106.6, 10.0], [106.5, 9.6], [106.2, 9.45], [105.75, 9.2], [105.3, 8.75], [104.75, 8.6], [104.8, 9.0], [104.85, 9.6], [105.05, 10.0], [104.48, 10.38]];
    const VN_W = [[104.75, 10.5], [105.1, 10.95], [105.8, 11.0], [106.0, 11.4], [106.15, 11.75], [106.45, 11.95], [106.95, 12.0], [107.4, 12.25], [107.6, 12.65], [107.5, 13.4], [107.6, 14.0], [107.55, 14.7], [107.4, 15.2], [107.2, 15.9], [106.7, 16.4], [106.55, 16.9], [106.1, 17.4], [105.6, 18.0], [105.15, 18.6], [104.4, 19.1], [103.95, 19.3], [104.0, 19.6], [104.6, 19.8], [104.95, 20.25], [104.4, 20.5], [103.8, 20.75], [103.2, 20.85], [102.8, 21.3], [102.85, 21.7], [102.65, 22.05]];
    const CN_COAST = [[118.5, 24.6], [117.5, 23.8], [116.5, 23.0], [114.2, 22.3], [113.0, 22.0], [111.5, 21.5], [110.5, 21.3], [110.2, 20.3], [109.9, 20.4], [109.6, 21.0], [108.6, 21.65]];
    const KH_COAST = [[104.0, 10.6], [103.5, 10.65], [103.1, 11.3], [102.9, 11.8], [102.3, 12.2], [101.5, 12.65], [100.9, 12.7], [100.95, 13.5], [99.5, 13.4]];
    const HAINAN = [[108.6, 19.2], [108.7, 18.5], [109.5, 18.2], [110.2, 18.5], [111.0, 19.6], [110.6, 20.1], [109.6, 20.0], [108.9, 19.6]];
    const PHUQUOC = [[103.85, 10.4], [104.05, 10.42], [104.08, 10.05], [103.95, 10.0]];
    const VN = [...VN_N, ...VN_COAST, ...VN_W];
    const NEIGHBOR = [[99.5, 25.5], [118.6, 25.5], ...CN_COAST, ...VN_N.slice().reverse(), ...VN_W.slice().reverse(), ...KH_COAST, [99.5, 13.4]];
    const STR = {
      kicker: ['Epsilon Edu · Khoa học tự nhiên', 'Epsilon Edu · Science'],
      title: ['Thế giới động vật', 'The Animal World'],
      lead: ['Xếp các con vật vào đúng "ngôi nhà" của chúng, thử tài tìm những con vật ngụy trang giỏi nhất và gặp các loài quý hiếm của Việt Nam.', 'Sort animals into their groups, hunt for masters of disguise, and meet Vietnam’s rarest animals.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Trò chơi', 'Game'],
      tab_cls: ['🏠 Phân loại', '🏠 Classify'], h_cls: ['Con vật này thuộc nhóm nào?', 'Which group is it?'],
      cv_cls: ['Năm ngôi nhà: cá, lưỡng cư, bò sát, chim, thú', 'Five houses: fish, amphibians, reptiles, birds, mammals'],
      se_cls: ['Chọn nhà', 'Pick a house'], sh_cls: ['Dựa vào đặc điểm', 'Use the clues'],
      tab_hide: ['🔍 Ngụy trang', '🔍 Camouflage'], h_hide: ['Con vật trốn ở đâu?', 'Where is it hiding?'],
      cv_hide: ['Một con vật đang ngụy trang trong cảnh này. Bấm vào chỗ em thấy nó', 'An animal is camouflaged in this scene. Tap where you see it'],
      se_hide: ['Thích nghi', 'Adaptation'], sh_hide: ['Vì sao khó tìm?', 'Why is it hard to see?'],
      tab_rare: ['🛡️ Quý hiếm Việt Nam', '🛡️ Vietnam’s rare animals'], h_rare: ['Những loài cần bảo vệ', 'Animals that need protecting'],
      cv_rare: ['Bản đồ Việt Nam với các loài động vật quý hiếm', 'Map of Vietnam with endangered animals'],
      se_rare: ['Lời hứa của em', 'Your promise'], sh_rare: ['Em có thể làm gì?', 'What can you do?'],
      next: ['Con vật khác ▶', 'Next animal ▶'], hint: ['💡 Gợi ý', '💡 Hint'], newScene: ['🔄 Cảnh khác', '🔄 New scene']
    };
    const emojiFont = (px) => `${px}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    const emo = (ctx, e, x, y, px) => { ctx.font = emojiFont(px); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e, x, y); };
    let seed = 3; const srand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

    /* =====================================================================
       1. PHÂN LOẠI ĐỘNG VẬT CÓ XƯƠNG SỐNG
       ===================================================================== */
    const CLS = {
      fish: { e: '🐟', col: '#0ea5e9', vi: ['Cá', 'Sống dưới nước, thở bằng mang, có vây để bơi, thân thường phủ vảy.'], en: ['Fish', 'Live in water, breathe with gills, swim with fins, usually have scales.'] },
      amph: { e: '🐸', col: '#22c55e', vi: ['Lưỡng cư', 'Da trần ẩm ướt, đẻ trứng trong nước. Lúc nhỏ thở bằng mang, lớn lên thở bằng phổi và da.', ''], en: ['Amphibians', 'Moist bare skin, eggs laid in water. Young breathe with gills, adults with lungs and skin.'] },
      rept: { e: '🦎', col: '#a16207', vi: ['Bò sát', 'Da khô có vảy sừng, thở bằng phổi, đẻ trứng có vỏ dai trên cạn.'], en: ['Reptiles', 'Dry scaly skin, breathe with lungs, lay leathery-shelled eggs on land.'] },
      bird: { e: '🐦', col: '#f59e0b', vi: ['Chim', 'Có lông vũ, mỏ, hai chân và hai cánh, đẻ trứng có vỏ cứng.'], en: ['Birds', 'Feathers, a beak, two legs and two wings; lay hard-shelled eggs.'] },
      mamm: { e: '🐘', col: '#db2777', vi: ['Thú (động vật có vú)', 'Có lông mao, phần lớn đẻ con và nuôi con bằng sữa mẹ, thở bằng phổi.'], en: ['Mammals', 'Have hair or fur, most give birth to live young and feed them milk, breathe with lungs.'] }
    };
    const CK = ['fish', 'amph', 'rept', 'bird', 'mamm'];
    const ANI = [
      { e: '🐟', c: 'fish', vi: ['Cá chép', 'Thở bằng mang, có vảy và vây.'], en: ['Carp', 'Gills, scales and fins.'] },
      { e: '🦈', c: 'fish', vi: ['Cá mập', 'Dù to lớn, cá mập vẫn thở bằng mang nên là cá.'], en: ['Shark', 'Huge, but breathes with gills, so it’s a fish.'] },
      { e: '🐡', c: 'fish', vi: ['Cá nóc', 'Phồng mình như quả bóng để dọa kẻ thù.'], en: ['Pufferfish', 'Puffs up like a ball to scare predators.'] },
      { e: '🐸', c: 'amph', vi: ['Ếch', 'Nòng nọc thở bằng mang, ếch trưởng thành thở bằng phổi và da.'], en: ['Frog', 'Tadpoles use gills; adults use lungs and skin.'] },
      { e: '🐍', c: 'rept', vi: ['Rắn', 'Không có chân nhưng có vảy khô, thở bằng phổi.'], en: ['Snake', 'No legs, but dry scales and lungs.'] },
      { e: '🐢', c: 'rept', vi: ['Rùa', 'Có mai cứng, đẻ trứng trên cát.'], en: ['Turtle', 'A hard shell; lays eggs in sand.'] },
      { e: '🐊', c: 'rept', vi: ['Cá sấu', 'Tên có chữ "cá" nhưng là bò sát: da vảy sừng, thở bằng phổi.'], en: ['Crocodile', 'Lives in water but is a reptile: scaly skin and lungs.'] },
      { e: '🦎', c: 'rept', vi: ['Thằn lằn', 'Da vảy khô, phơi nắng để giữ ấm.'], en: ['Lizard', 'Dry scales; basks to stay warm.'] },
      { e: '🐧', c: 'bird', vi: ['Chim cánh cụt', 'Không bay được nhưng có lông vũ, mỏ và đẻ trứng nên vẫn là chim.'], en: ['Penguin', 'Can’t fly, but has feathers and a beak and lays eggs, so it’s a bird.'] },
      { e: '🦉', c: 'bird', vi: ['Cú mèo', 'Săn mồi ban đêm nhờ mắt tinh và tai thính.'], en: ['Owl', 'Hunts at night with sharp eyes and ears.'] },
      { e: '🦆', c: 'bird', vi: ['Vịt', 'Bơi giỏi nhờ chân có màng, lông không thấm nước.'], en: ['Duck', 'Webbed feet and waterproof feathers.'] },
      { e: '🐔', c: 'bird', vi: ['Gà', 'Có lông vũ, mỏ, đẻ trứng.'], en: ['Chicken', 'Feathers, a beak, lays eggs.'] },
      { e: '🐋', c: 'mamm', vi: ['Cá voi', 'Sống dưới biển nhưng thở bằng phổi, đẻ con và nuôi con bằng sữa nên là thú!'], en: ['Whale', 'Lives in the sea but breathes air and feeds its calf milk: a mammal!'] },
      { e: '🐬', c: 'mamm', vi: ['Cá heo', 'Phải ngoi lên mặt nước để thở, nuôi con bằng sữa: là thú.'], en: ['Dolphin', 'Surfaces to breathe and feeds its young milk: a mammal.'] },
      { e: '🦇', c: 'mamm', vi: ['Dơi', 'Biết bay nhưng có lông mao và nuôi con bằng sữa: là thú, không phải chim.'], en: ['Bat', 'Flies, but has fur and feeds milk: a mammal, not a bird.'] },
      { e: '🐘', c: 'mamm', vi: ['Voi', 'Loài thú trên cạn lớn nhất.'], en: ['Elephant', 'The largest land mammal.'] },
      { e: '🐄', c: 'mamm', vi: ['Bò', 'Nuôi con bằng sữa.'], en: ['Cow', 'Feeds its calf milk.'] },
      { e: '🐒', c: 'mamm', vi: ['Khỉ', 'Có lông mao, đẻ con.'], en: ['Monkey', 'Has fur; gives birth to live young.'] }
    ];
    let cl = { order: [], pos: 0, houses: { fish: [], amph: [], rept: [], bird: [], mamm: [] }, fly: null, score: 0, total: 0, msg: null, infoKey: '', lastC: null };
    cl.order = ANI.map((_, i) => i).sort(() => Math.random() - .5);
    const clC = mk('c_cls', (w) => clamp(w * .58, 290, 470));
    function drawCls(dt) {
      const { w, h, ctx } = clC; if (!w) return;
      const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#e0f2fe'); g.addColorStop(1, '#dcfce7'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      const hw2 = w / 5, hy = h * .62, hh = h * .34;
      CK.forEach((k, i) => {
        const x = hw2 * (i + .5), c = CLS[k];
        ctx.fillStyle = c.col; ctx.beginPath(); ctx.moveTo(x - hw2 * .44, hy); ctx.lineTo(x, hy - hh * .32); ctx.lineTo(x + hw2 * .44, hy); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.strokeStyle = c.col; ctx.lineWidth = 3; rr(ctx, x - hw2 * .4, hy, hw2 * .8, hh, 8); ctx.fill(); ctx.stroke();
        emo(ctx, c.e, x, hy - hh * .12, Math.min(22, hw2 * .25));
        textLight(ctx, L(c)[0].split(' (')[0], x, hy + 14, c.col, w < 420 ? 9.5 : 12, 'center', 900);
        cl.houses[k].forEach((ai, j) => emo(ctx, ANI[ai].e, x - hw2 * .22 + (j % 3) * hw2 * .22, hy + 36 + Math.floor(j / 3) * 22, Math.min(20, hw2 * .2)));
      });
      if (cl.fly) { cl.fly.t += dt * 2.4; const k = ease(Math.min(1, cl.fly.t)), tx = hw2 * (CK.indexOf(cl.fly.to) + .5); emo(ctx, ANI[cl.fly.i].e, lerp(w / 2, tx, k), lerp(h * .22, hy + 30, k) - Math.sin(k * Math.PI) * 40, 60 - k * 40); if (cl.fly.t >= 1) { cl.houses[cl.fly.to].push(cl.fly.i); cl.fly = null; } }
      else if (cl.pos < cl.order.length) { const a = ANI[cl.order[cl.pos]]; const bob = reduceMotion ? 0 : Math.sin(clock * 3) * 5; ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(w / 2, h * .22, Math.min(h * .17, 70), 0, TAU); ctx.fill(); emo(ctx, a.e, w / 2, h * .2 + bob, Math.min(h * .2, 76)); textLight(ctx, L({ vi: a.vi, en: a.en })[0], w / 2, h * .38, '#334155', 15, 'center', 900); }
      else bubble(ctx, T('🎉 Đã xếp hết các con vật!', '🎉 All animals sorted!'), w / 2, h * .2, 15, '#fff', '#15803d');
    }
    function clRender() {
      const done = cl.pos >= cl.order.length;
      $('clsBox').innerHTML = done ? `<p class="fun" style="margin:0">${T(`🎉 Đúng ${cl.score}/${cl.total} con vật!`, `🎉 ${cl.score}/${cl.total} correct!`)}</p><button id="clAgain" class="btn main" type="button">${T('Chơi lại', 'Play again')}</button>`
        : `<div class="opt-col">${CK.map((k) => `<button type="button" class="soft-btn" data-ck="${k}" style="border-color:${CLS[k].col}">${CLS[k].e} <span></span></button>`).join('')}</div><p class="score" style="margin:0">${T(`Đúng ${cl.score}/${cl.total} – còn ${cl.order.length - cl.pos}`, `${cl.score}/${cl.total} correct – ${cl.order.length - cl.pos} left`)}</p>${cl.msg ? `<p class="${cl.msg[0]}" style="margin:0"></p>` : ''}`;
      $('clsBox').querySelectorAll('[data-ck]').forEach((b) => { b.querySelector('span').textContent = L(CLS[b.dataset.ck])[0]; });
      if (cl.msg && !done) $('clsBox').querySelectorAll('p')[1].textContent = cl.msg[1];
      const ag = $('clAgain'); if (ag) ag.onclick = () => { cl.order = ANI.map((_, i) => i).sort(() => Math.random() - .5); cl.pos = 0; cl.houses = { fish: [], amph: [], rept: [], bird: [], mamm: [] }; cl.score = 0; cl.total = 0; cl.msg = null; clRender(); };
    }
    $('clsBox').addEventListener('click', (e) => { const b = e.target.closest('[data-ck]'); if (!b || cl.fly || cl.pos >= cl.order.length) return; cancelSpeech(); const i = cl.order[cl.pos], a = ANI[i], ok = b.dataset.ck === a.c, d = L({ vi: a.vi, en: a.en }); cl.total++; if (ok) cl.score++; cl.msg = [ok ? 'fun' : 'warn', `${ok ? '🎉' : '🤔'} ${d[0]} → ${L(CLS[a.c])[0]}. ${d[1]}`]; cl.fly = { i, to: a.c, t: 0 }; cl.pos++; cl.lastC = a.c; clRender(); clInfo(true); });
    function clInfo(force) {
      const key = lang + cl.lastC; if (key === cl.infoKey && !force) return; cl.infoKey = key;
      infoBox($('info_cls'), { emo: '🦴', title: T('Động vật có xương sống', 'Vertebrates'), sub: T('5 nhóm chính', '5 main groups'), rows: CK.map((k) => [`${CLS[k].e} ${L(CLS[k])[0].split(' (')[0]}`, L(CLS[k])[1]]), notes: [['tip', T('💡 Đừng để tên gọi đánh lừa: cá voi, cá heo là thú; cá sấu là bò sát; dơi biết bay nhưng là thú.', '💡 Don’t be fooled: whales and dolphins are mammals, crocodiles are reptiles, and bats fly but are mammals.')]] });
      setText('hud_cls', T(`🏠 Đúng ${cl.score}/${cl.total}`, `🏠 ${cl.score}/${cl.total} correct`));
    }
    TABS.cls = { frame(dt) { drawCls(dt); }, refresh() { cl.infoKey = ''; clInfo(true); cl.msg = null; clRender(); } };
    QUIZZES.push(makeQuiz($('quiz_cls'), {
      vi: [
        { q: 'Cá voi thuộc nhóm nào?', a: ['Thú', 'Cá', 'Bò sát', 'Lưỡng cư'], why: 'Cá voi thở bằng phổi, đẻ con và nuôi con bằng sữa.' },
        { q: 'Con vật nào là bò sát?', a: ['Cá sấu', 'Cá heo', 'Ếch', 'Dơi'], why: 'Cá sấu có da vảy sừng, thở bằng phổi, đẻ trứng.' },
        { q: 'Đặc điểm chỉ chim mới có là gì?', a: ['Lông vũ', 'Đẻ trứng', 'Biết bay', 'Có xương sống'], why: 'Chỉ chim có lông vũ. Dơi, côn trùng cũng biết bay.' },
        { q: 'Vì sao ếch là lưỡng cư?', a: ['Lúc nhỏ sống dưới nước thở mang, lớn lên sống cả trên cạn', 'Vì ếch có lông', 'Vì ếch đẻ con', 'Vì ếch biết bay'], why: '"Lưỡng cư" nghĩa là sống được ở hai môi trường.' },
        { q: 'Chim cánh cụt không bay được, vậy là nhóm nào?', a: ['Chim', 'Cá', 'Thú', 'Bò sát'], why: 'Nó có lông vũ, mỏ và đẻ trứng.' },
        { q: 'Thú nuôi con bằng gì?', a: ['Sữa mẹ', 'Sâu bọ', 'Hạt', 'Không nuôi'], why: 'Vì vậy thú còn gọi là động vật có vú.' }
      ],
      en: [
        { q: 'Which group are whales in?', a: ['Mammals', 'Fish', 'Reptiles', 'Amphibians'], why: 'Whales breathe air, give birth and feed milk.' },
        { q: 'Which is a reptile?', a: ['Crocodile', 'Dolphin', 'Frog', 'Bat'], why: 'Scaly skin, lungs, eggs.' },
        { q: 'What do only birds have?', a: ['Feathers', 'Eggs', 'Flight', 'A backbone'], why: 'Only birds have feathers; bats and insects fly too.' },
        { q: 'Why is a frog an amphibian?', a: ['It starts in water with gills, then lives on land too', 'It has fur', 'It gives birth', 'It flies'], why: '“Amphibian” means living two lives.' },
        { q: 'Penguins can’t fly. Their group?', a: ['Birds', 'Fish', 'Mammals', 'Reptiles'], why: 'Feathers, beak, eggs.' },
        { q: 'Mammals feed their babies…', a: ['Milk', 'Insects', 'Seeds', 'Nothing'], why: 'That’s why they’re called mammals.' }
      ]
    }));

    /* =====================================================================
       2. NGỤY TRANG
       ===================================================================== */
    const HIDE = [
      { k: 'leaf', vi: ['Tắc kè hoa', 'Màu xanh lốm đốm giống hệt lá cây.', 'Tắc kè hoa có thể đổi màu da khi nhiệt độ, cảm xúc thay đổi, giúp nó hòa vào môi trường. Mắt nó xoay được hai hướng khác nhau cùng lúc!'], en: ['Chameleon', 'Speckled green, just like the leaves.', 'Chameleons change skin colour with temperature and mood, helping them blend in. Each eye can look a different way!'] },
      { k: 'bark', vi: ['Cú mèo', 'Bộ lông vằn nâu xám giống vỏ cây.', 'Ban ngày cú ngủ trên cây, nhờ bộ lông giống vỏ cây mà chim khác khó phát hiện.'], en: ['Owl', 'Brown-grey streaky feathers like tree bark.', 'Owls sleep in trees by day, hidden by bark-like feathers.'] },
      { k: 'twig', vi: ['Bọ que', 'Thân dài, mảnh, màu nâu như cành cây khô.', 'Bọ que còn đung đưa theo gió giống cành cây thật. Có loài dài tới hơn 50 cm!'], en: ['Stick insect', 'Long, thin and brown like a twig.', 'It even sways like a twig in the wind. Some are over 50 cm long!'] },
      { k: 'sand', vi: ['Cá bơn', 'Thân dẹt, màu lốm đốm giống cát đáy biển.', 'Cá bơn có cả hai mắt nằm cùng một bên thân. Lúc nhỏ mắt ở hai bên, lớn lên một mắt dần "di chuyển" sang bên kia!'], en: ['Flounder', 'Flat and speckled like the sandy seabed.', 'Both eyes are on one side of its body. When young they’re on both sides, then one eye moves over!'] },
      { k: 'dry', vi: ['Bướm lá khô', 'Mặt dưới cánh giống hệt chiếc lá khô, có cả gân lá.', 'Khi xòe cánh, mặt trên lại có màu cam xanh rực rỡ. Loài bướm này có ở rừng Việt Nam.'], en: ['Dead-leaf butterfly', 'The underside of its wings looks exactly like a dry leaf, veins and all.', 'Open its wings and the top is bright orange and blue. It lives in Vietnam’s forests.'] }
    ];
    let hd = { i: 0, pos: { x: .5, y: .5, a: 0 }, found: false, t: 0, seedN: 1, foundN: 0, miss: null, hint: false, infoKey: '' };
    const hdC = mk('c_hide', (w) => clamp(w * .6, 300, 480));
    function hdNew(i) { hd.i = i; hd.found = false; hd.t = 0; hd.hint = false; hd.seedN = Math.floor(rand(1, 99999)); hd.pos = { x: rand(.18, .82), y: rand(.2, .8), a: rand(-.5, .5) }; hdInfo(true); }
    function drawCham(ctx, s, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, s, s * .5, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(s * .9, -s * .1); ctx.quadraticCurveTo(s * 1.5, -s * .5, s * 1.3, s * .2); ctx.quadraticCurveTo(s * 1.2, s * .1, s * .9, s * .25); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = s * .18; ctx.beginPath(); ctx.moveTo(-s * .9, 0); ctx.quadraticCurveTo(-s * 1.6, s * .2, -s * 1.5, s * .6); ctx.arc(-s * 1.3, s * .6, s * .2, 0, Math.PI * 1.6); ctx.stroke(); for (const lx of [-.5, .5]) { ctx.beginPath(); ctx.moveTo(lx * s, s * .35); ctx.lineTo(lx * s - s * .1, s * .8); ctx.stroke(); } ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.arc((srand() - .5) * s * 1.4, (srand() - .5) * s * .6, s * .08, 0, TAU); ctx.fill(); } ctx.fillStyle = '#d9f99d'; ctx.beginPath(); ctx.arc(s * 1.05, -s * .1, s * .14, 0, TAU); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(s * 1.08, -s * .1, s * .05, 0, TAU); ctx.fill(); }
    function drawHide(dt) {
      const { w, h, ctx } = hdC; if (!w) return;
      hd.t += dt; if (hd.t > 15 && !hd.found) hd.hint = true;
      const H = HIDE[hd.i], S = Math.min(w, h), ax = hd.pos.x * w, ay = hd.pos.y * h, as = S * .07;
      seed = hd.seedN;
      if (H.k === 'leaf') {
        ctx.fillStyle = '#14532d'; ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 420; i++) { const x = srand() * w, y = srand() * h, a = srand() * TAU, g = srand(); ctx.fillStyle = mix('#166534', '#65a30d', g); ctx.beginPath(); ctx.ellipse(x, y, S * .05, S * .022, a, 0, TAU); ctx.fill(); }
        ctx.save(); ctx.translate(ax, ay); ctx.rotate(hd.pos.a); drawCham(ctx, as, '#4d9a3a'); ctx.restore();
        for (let i = 0; i < 18; i++) { const x = ax + (srand() - .5) * as * 4, y = ay + (srand() - .5) * as * 2; ctx.fillStyle = mix('#166534', '#65a30d', srand()); ctx.beginPath(); ctx.ellipse(x, y, S * .045, S * .02, srand() * TAU, 0, TAU); ctx.fill(); }
      } else if (H.k === 'bark') {
        ctx.fillStyle = '#6b5440'; ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 260; i++) { const x = srand() * w, y = srand() * h, l = S * (.05 + srand() * .1); ctx.strokeStyle = mix('#3f3024', '#a8957f', srand()); ctx.lineWidth = 1 + srand() * 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + (srand() - .5) * 8, y + l / 2, x + (srand() - .5) * 6, y + l); ctx.stroke(); }
        ctx.save(); ctx.translate(ax, ay); ctx.fillStyle = '#7d6852'; ctx.beginPath(); ctx.ellipse(0, 0, as * .7, as, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(-as * .6, -as * .7); ctx.lineTo(-as * .45, -as * 1.15); ctx.lineTo(-as * .2, -as * .8); ctx.moveTo(as * .6, -as * .7); ctx.lineTo(as * .45, -as * 1.15); ctx.lineTo(as * .2, -as * .8); ctx.fill();
        for (let i = 0; i < 26; i++) { ctx.strokeStyle = mix('#3f3024', '#a8957f', srand()); ctx.lineWidth = 1.5; const x = (srand() - .5) * as, y = (srand() - .5) * as * 1.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 1, y + as * .25); ctx.stroke(); }
        ctx.strokeStyle = '#2a1f17'; ctx.lineWidth = 2; for (const s2 of [-1, 1]) { ctx.beginPath(); ctx.arc(s2 * as * .28, -as * .4, as * .14, .2, Math.PI - .2); ctx.stroke(); } ctx.fillStyle = '#4a3a2c'; ctx.beginPath(); ctx.moveTo(-as * .07, -as * .3); ctx.lineTo(as * .07, -as * .3); ctx.lineTo(0, -as * .15); ctx.fill(); ctx.restore();
      } else if (H.k === 'twig') {
        ctx.fillStyle = '#e7dcc8'; ctx.fillRect(0, 0, w, h);
        const twig = (x, y, a, l, wd) => { ctx.strokeStyle = mix('#7c5a3a', '#a07b55', srand()); ctx.lineWidth = wd; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke(); };
        for (let i = 0; i < 120; i++) { const x = srand() * w, y = srand() * h, a = srand() * TAU, l = S * (.08 + srand() * .2); twig(x, y, a, l, 2 + srand() * 3); if (srand() < .5) twig(x + Math.cos(a) * l * .5, y + Math.sin(a) * l * .5, a + (srand() - .5) * 1.6, l * .4, 1.5); }
        ctx.save(); ctx.translate(ax, ay); ctx.rotate(hd.pos.a); ctx.strokeStyle = '#8a6644'; ctx.lineCap = 'round'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-as * 1.4, 0); ctx.lineTo(as * 1.4, 0); ctx.stroke(); ctx.lineWidth = 1.5; for (const lx of [-.6, 0, .6]) for (const s2 of [-1, 1]) { ctx.beginPath(); ctx.moveTo(lx * as, 0); ctx.lineTo(lx * as + as * .35, s2 * as * .5); ctx.lineTo(lx * as + as * .55, s2 * as * .6); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(as * 1.4, 0); ctx.lineTo(as * 2, -as * .3); ctx.moveTo(as * 1.4, 0); ctx.lineTo(as * 2, as * .2); ctx.stroke(); ctx.restore();
      } else if (H.k === 'sand') {
        ctx.fillStyle = '#d6c29a'; ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 1600; i++) { ctx.fillStyle = mix('#a8916a', '#f1e6c8', srand()); ctx.beginPath(); ctx.arc(srand() * w, srand() * h, 1 + srand() * 2.4, 0, TAU); ctx.fill(); }
        ctx.save(); ctx.translate(ax, ay); ctx.rotate(hd.pos.a); ctx.fillStyle = '#c6b087'; ctx.beginPath(); ctx.ellipse(0, 0, as * 1.3, as * .75, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(-as * 1.2, 0); ctx.lineTo(-as * 1.8, -as * .4); ctx.lineTo(-as * 1.8, as * .4); ctx.fill();
        for (let i = 0; i < 90; i++) { ctx.fillStyle = mix('#a8916a', '#f1e6c8', srand()); ctx.beginPath(); ctx.arc((srand() - .5) * as * 2.4, (srand() - .5) * as * 1.3, 1 + srand() * 2, 0, TAU); ctx.fill(); }
        for (const ex of [.55, .85]) { ctx.fillStyle = '#f1e6c8'; ctx.beginPath(); ctx.arc(ex * as, -as * .25, as * .1, 0, TAU); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(ex * as, -as * .25, as * .05, 0, TAU); ctx.fill(); }
        ctx.restore();
      } else {
        ctx.fillStyle = '#a16207'; ctx.fillRect(0, 0, w, h);
        const leaf = (x, y, a, s2, col) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-s2, 0); ctx.quadraticCurveTo(0, -s2 * .55, s2, 0); ctx.quadraticCurveTo(0, s2 * .55, -s2, 0); ctx.fill(); ctx.strokeStyle = 'rgba(60,30,10,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-s2, 0); ctx.lineTo(s2, 0); for (let k = -2; k <= 2; k++) { ctx.moveTo(k * s2 * .3, 0); ctx.lineTo(k * s2 * .3 + s2 * .2, -s2 * .25); ctx.moveTo(k * s2 * .3, 0); ctx.lineTo(k * s2 * .3 + s2 * .2, s2 * .25); } ctx.stroke(); ctx.restore(); };
        for (let i = 0; i < 200; i++) leaf(srand() * w, srand() * h, srand() * TAU, S * (.04 + srand() * .03), mix('#78350f', '#d97706', srand()));
        ctx.save(); ctx.translate(ax, ay); ctx.rotate(hd.pos.a); leaf(0, 0, 0, as * 1.1, '#9a5b1d'); ctx.strokeStyle = '#5b3a17'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-as * .9, -as * .1); ctx.lineTo(-as * 1.3, -as * .6); ctx.moveTo(-as * .9, -as * .1); ctx.lineTo(-as * 1.25, -as * .7); ctx.stroke(); ctx.fillStyle = '#6b3d12'; ctx.fillRect(as * 1.05, -1.5, as * .35, 3); ctx.restore();
        for (let i = 0; i < 6; i++) leaf(ax + (srand() - .5) * as * 4, ay + (srand() - .5) * as * 3, srand() * TAU, S * .05, mix('#78350f', '#d97706', srand()));
      }
      if (hd.found) { ctx.strokeStyle = '#fde047'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(ax, ay, as * 1.9 + Math.sin(clock * 5) * 3, 0, TAU); ctx.stroke(); bubble(ctx, T(`🎉 Tìm thấy ${L({ vi: H.vi, en: H.en })[0].toLowerCase()} sau ${Math.round(hd.foundT)} giây!`, `🎉 Found the ${L({ vi: H.vi, en: H.en })[0].toLowerCase()} in ${Math.round(hd.foundT)} s!`), w / 2, 24, 13, '#fff', '#15803d'); }
      else { if (hd.hint) { ctx.strokeStyle = `rgba(253,224,71,${.4 + .3 * Math.sin(clock * 5)})`; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.arc(ax + S * .05, ay - S * .04, S * .2, 0, TAU); ctx.stroke(); ctx.setLineDash([]); } ctx.fillStyle = 'rgba(15,23,42,.7)'; rr(ctx, 8, 8, 230, 28, 10); ctx.fill(); textLight(ctx, T(`🔍 Tìm: ${L({ vi: H.vi, en: H.en })[0]} · ${Math.floor(hd.t)} giây`, `🔍 Find: ${L({ vi: H.vi, en: H.en })[0]} · ${Math.floor(hd.t)} s`), 18, 22, '#fde68a', 12.5, 'left', 900); }
      if (hd.miss && hd.miss.t > 0) { hd.miss.t -= dt; emo(ctx, '❌', hd.miss.x, hd.miss.y, 18); }
    }
    hdC.c.addEventListener('pointerdown', (e) => { if (hd.found) return; const p = localPoint(hdC.c, e), S = Math.min(hdC.w, hdC.h); if (Math.hypot(p.x - hd.pos.x * hdC.w, p.y - hd.pos.y * hdC.h) < S * .1) { cancelSpeech(); hd.found = true; hd.foundT = hd.t; hd.foundN++; hdInfo(true); } else hd.miss = { x: p.x, y: p.y, t: .7 }; });
    $('hdHint').onclick = () => { hd.hint = true; };
    $('hdNext').onclick = () => { cancelSpeech(); hdNew((hd.i + 1) % HIDE.length); };
    function hdInfo(force) {
      const key = lang + hd.i + hd.found; if (key === hd.infoKey && !force) return; hd.infoKey = key;
      const d = L({ vi: HIDE[hd.i].vi, en: HIDE[hd.i].en });
      infoBox($('info_hide'), { emo: hd.found ? '🎉' : '🔍', title: hd.found ? d[0] : T(`Có một con ${d[0].toLowerCase()} đang trốn!`, `A ${d[0].toLowerCase()} is hiding!`), sub: T(`Đã tìm được ${hd.foundN} con vật`, `${hd.foundN} animals found`), rows: hd.found ? [[T('Bí quyết', 'Its trick'), d[1]], [T('Thú vị', 'Amazing'), d[2]]] : [[T('Gợi ý', 'Clue'), d[1]]], notes: [['tip', T('🦎 Ngụy trang là một kiểu thích nghi: màu sắc, hình dạng giống môi trường giúp con vật trốn kẻ thù hoặc rình bắt mồi.', '🦎 Camouflage is an adaptation: colours and shapes that match the surroundings help animals hide from predators or sneak up on prey.')]] });
      setText('hud_hide', hd.found ? `🎉 ${d[0]}` : T('🔍 Bấm vào chỗ em nghĩ con vật đang trốn', '🔍 Tap where you think the animal is hiding'));
    }
    TABS.hide = { frame(dt) { drawHide(dt); }, refresh() { hd.infoKey = ''; hdInfo(true); } };
    hdNew(0);
    QUIZZES.push(makeQuiz($('quiz_hide'), {
      vi: [
        { q: 'Ngụy trang giúp con vật điều gì?', a: ['Trốn kẻ thù hoặc rình mồi', 'Chạy nhanh hơn', 'Bay cao hơn', 'Ngủ ngon hơn'], why: 'Màu sắc giống môi trường làm con vật khó bị phát hiện.' },
        { q: 'Bọ que ngụy trang giống cái gì?', a: ['Cành cây khô', 'Hòn đá', 'Bông hoa', 'Đám mây'], why: 'Thân dài mảnh và còn đung đưa như cành cây.' },
        { q: 'Cá bơn có đặc điểm lạ gì?', a: ['Hai mắt nằm cùng một bên thân', 'Không có mắt', 'Có ba mắt', 'Mắt ở đuôi'], why: 'Lớn lên một mắt di chuyển sang bên kia.' },
        { q: 'Vì sao gấu Bắc Cực có bộ lông trắng?', a: ['Để lẫn vào băng tuyết', 'Vì gấu già', 'Vì bẩn', 'Để phát sáng'], why: 'Màu trắng giúp gấu rình bắt hải cẩu trên băng.' },
        { q: 'Tắc kè hoa đổi màu khi nào?', a: ['Khi nhiệt độ, cảm xúc thay đổi', 'Chỉ khi ngủ', 'Không bao giờ', 'Khi ăn kẹo'], why: 'Đổi màu cũng giúp nó hòa vào môi trường.' }
      ],
      en: [
        { q: 'How does camouflage help animals?', a: ['Hide from predators or sneak up on prey', 'Run faster', 'Fly higher', 'Sleep better'], why: 'Matching colours make them hard to spot.' },
        { q: 'A stick insect looks like…', a: ['A dry twig', 'A stone', 'A flower', 'A cloud'], why: 'Long and thin, it even sways like a twig.' },
        { q: 'What is strange about a flounder?', a: ['Both eyes are on one side', 'No eyes', 'Three eyes', 'Eyes on its tail'], why: 'One eye moves across as it grows.' },
        { q: 'Why are polar bears white?', a: ['To blend into snow and ice', 'They are old', 'They are dirty', 'To glow'], why: 'White fur helps them sneak up on seals.' },
        { q: 'When do chameleons change colour?', a: ['With temperature and mood', 'Only asleep', 'Never', 'After sweets'], why: 'Changing colour also helps them blend in.' }
      ]
    }));

    /* =====================================================================
       3. ĐỘNG VẬT QUÝ HIẾM VIỆT NAM
       ===================================================================== */
    const RARE = [
      { e: '🦌', lon: 105.5, lat: 18.3, st: 'cr', vi: ['Sao la', 'Vùng núi Trường Sơn (phát hiện ở Vũ Quang, Hà Tĩnh)', 'Được phát hiện năm 1992, là một trong những phát hiện động vật lớn nhất thế kỷ 20. Sao la rất hiếm, được gọi là "kỳ lân châu Á".', 'Đến nay các nhà khoa học vẫn chưa nuôi được sao la lâu dài trong điều kiện nuôi nhốt.'], en: ['Saola', 'Truong Son mountains (first found at Vu Quang, Ha Tinh)', 'Discovered in 1992, one of the 20th century’s great animal finds. So rare it’s called the “Asian unicorn”.', 'Scientists have never kept a saola alive long in captivity.'] },
      { e: '🐒', lon: 106.98, lat: 20.8, st: 'cr', vi: ['Voọc Cát Bà', 'Đảo Cát Bà, Hải Phòng', 'Voọc đầu vàng chỉ có ở đảo Cát Bà, cả thế giới chỉ còn khoảng vài chục cá thể.', 'Nhờ được bảo vệ, số lượng voọc Cát Bà đã tăng dần trong những năm gần đây.'], en: ['Cat Ba langur', 'Cat Ba Island, Hai Phong', 'A golden-headed langur found only on Cat Ba; only a few dozen are left in the world.', 'Thanks to protection, their numbers have been slowly rising.'] },
      { e: '🐵', lon: 108.27, lat: 16.12, st: 'en', vi: ['Voọc chà vá chân nâu', 'Bán đảo Sơn Trà, Đà Nẵng', 'Bộ lông có 5 màu nên được gọi là "nữ hoàng linh trưởng".', 'Chúng sống ngay cạnh thành phố Đà Nẵng, du khách có thể may mắn thấy chúng.'], en: ['Red-shanked douc', 'Son Tra Peninsula, Da Nang', 'Its five-coloured coat earned it the name “queen of primates”.', 'They live right beside Da Nang city.'] },
      { e: '🙈', lon: 105.85, lat: 20.38, st: 'cr', vi: ['Voọc mông trắng', 'Khu bảo tồn Vân Long, Ninh Bình', 'Loài voọc đặc hữu của Việt Nam, có bộ lông đen với vùng lông trắng ở mông.', 'Vân Long là nơi có quần thể voọc mông trắng lớn nhất.'], en: ['Delacour’s langur', 'Van Long Reserve, Ninh Binh', 'Found only in Vietnam: black fur with white “shorts”.', 'Van Long has the largest population.'] },
      { e: '🐢', lon: 105.6, lat: 21.0, st: 'cr', vi: ['Rùa Hoàn Kiếm (giải Thượng Hải)', 'Hồ Đồng Mô, Hà Nội', 'Một trong những loài rùa hiếm nhất thế giới, chỉ còn rất ít cá thể.', 'Cụ rùa ở hồ Hoàn Kiếm gắn với truyền thuyết vua Lê Lợi trả gươm.'], en: ['Swinhoe’s softshell turtle', 'Dong Mo Lake, Hanoi', 'One of the rarest turtles on Earth, with only a handful left.', 'The Hoan Kiem Lake turtle is linked to the legend of King Le Loi’s sword.'] },
      { e: '🐻', lon: 105.65, lat: 21.45, st: 'vu', vi: ['Gấu ngựa', 'Trung tâm cứu hộ gấu Tam Đảo, Phú Thọ (trước là Vĩnh Phúc)', 'Gấu có vệt lông trắng hình chữ V ở ngực. Nhiều gấu từng bị nuôi nhốt lấy mật nay được cứu hộ.', 'Ở trung tâm cứu hộ, gấu được sống trong rừng bán hoang dã, leo trèo và chơi đùa.'], en: ['Asian black bear', 'Tam Dao Bear Rescue Centre', 'It has a white V on its chest. Many bears once farmed for bile have been rescued.', 'At the rescue centre bears roam semi-wild forest enclosures.'] },
      { e: '🦔', lon: 105.6, lat: 20.3, st: 'cr', vi: ['Tê tê', 'Trung tâm cứu hộ ở Vườn quốc gia Cúc Phương, Ninh Bình', 'Loài thú có vảy, cuộn tròn như quả bóng khi gặp nguy hiểm. Bị săn bắt, buôn bán nhiều nhất thế giới.', 'Vảy tê tê làm từ chất sừng giống móng tay người, không có tác dụng chữa bệnh.'], en: ['Pangolin', 'Rescue centre at Cuc Phuong National Park', 'A scaly mammal that rolls into a ball. The most trafficked mammal in the world.', 'Its scales are keratin, like our fingernails, with no medicinal power.'] },
      { e: '🕊️', lon: 105.55, lat: 10.7, st: 'en', vi: ['Sếu đầu đỏ', 'Vườn quốc gia Tràm Chim, Đồng Tháp', 'Loài chim lớn nhất Việt Nam, đứng cao gần bằng người lớn, đầu có mảng da đỏ.', 'Sếu từng về Tràm Chim hàng trăm con mỗi mùa khô, nay chỉ còn rất ít.'], en: ['Sarus crane', 'Tram Chim National Park, Dong Thap', 'Vietnam’s tallest bird, almost as tall as an adult, with a red head.', 'Hundreds once visited each dry season; now very few come.'] },
      { e: '🐅', lon: 107.8, lat: 14.5, st: 'en', vi: ['Hổ Đông Dương', 'Rừng Tây Nguyên và biên giới', 'Ở Việt Nam gần như không còn hổ sống ngoài tự nhiên.', 'Bảo vệ rừng chính là bảo vệ nhà của hổ và các con mồi của chúng.'], en: ['Indochinese tiger', 'Highland and border forests', 'Almost no wild tigers remain in Vietnam.', 'Protecting forests protects tigers’ homes and prey.'] },
      { e: '🐢', lon: 106.6, lat: 8.7, st: 'en', vi: ['Rùa biển', 'Vườn quốc gia Côn Đảo', 'Rùa mẹ bò lên bãi cát Côn Đảo đẻ trứng. Rác nhựa ngoài biển rất nguy hiểm vì rùa tưởng túi nilon là sứa.', 'Nhiệt độ cát quyết định rùa con sinh ra là đực hay cái!'], en: ['Sea turtles', 'Con Dao National Park', 'Mothers lay eggs on Con Dao’s beaches. Plastic is deadly because turtles mistake bags for jellyfish.', 'Sand temperature decides whether hatchlings are male or female!'] },
      { e: '🦏', lon: 107.4, lat: 11.4, st: 'ex', vi: ['Tê giác Java', 'Vườn quốc gia Cát Tiên', 'Con tê giác Java cuối cùng ở Việt Nam bị săn trộm năm 2010. Loài này đã tuyệt chủng ở Việt Nam.', 'Đây là bài học đau lòng: một khi đã mất thì không thể lấy lại.'], en: ['Javan rhino', 'Cat Tien National Park', 'Vietnam’s last Javan rhino was poached in 2010. The species is now extinct in Vietnam.', 'A sad lesson: once gone, it can’t come back.'] }
    ];
    const ST = { cr: ['#dc2626', { vi: 'Cực kỳ nguy cấp', en: 'Critically endangered' }], en: ['#f97316', { vi: 'Nguy cấp', en: 'Endangered' }], vu: ['#eab308', { vi: 'Sắp nguy cấp', en: 'Vulnerable' }], ex: ['#334155', { vi: 'Đã tuyệt chủng ở Việt Nam', en: 'Extinct in Vietnam' }] };
    let ra = { sel: 0, pins: [], infoKey: '', pledge: [false, false, false, false, false] };
    const raC = mk('c_rare', (w) => clamp(w * .95, 360, 640));
    function drawRare() {
      const { w, h, ctx } = raC; if (!w) return;
      const lon0 = 101.5, lon1 = 116.5, lat0 = 8, lat1 = 23.8, s = Math.min(w / (lon1 - lon0), h / (lat1 - lat0)), ox = (w - (lon1 - lon0) * s) / 2, oy = (h - (lat1 - lat0) * s) / 2;
      const P = (lon, lat) => ({ x: ox + (lon - lon0) * s, y: h - oy - (lat - lat0) * s });
      ctx.fillStyle = '#bae6fd'; ctx.fillRect(0, 0, w, h);
      const poly = (pts, fill, stroke) => { ctx.beginPath(); pts.forEach(([lo, la], i) => { const p = P(lo, la); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); }); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = stroke; ctx.lineWidth = 1.2; ctx.stroke(); };
      poly(NEIGHBOR, '#f5f5f4', '#d6d3d1'); poly(HAINAN, '#f5f5f4', '#d6d3d1'); poly(VN, '#bbf7d0', '#15803d'); poly(PHUQUOC, '#bbf7d0', '#15803d');
      const dot = (lo, la) => { const p = P(lo, la); ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, TAU); ctx.fill(); };
      [[111.8, 16.4], [112.3, 16.7], [111.6, 16.9], [112.0, 16.1]].forEach(([a, b]) => dot(a, b)); [[114.2, 10.4], [114.5, 9.9], [113.9, 9.6], [114.9, 10.2], [115.2, 9.4]].forEach(([a, b]) => dot(a, b));
      const fs = w < 420 ? 9.5 : 11; let p = P(112.0, 15.7); textLight(ctx, T('QĐ Hoàng Sa', 'Hoang Sa Is.'), p.x, p.y, '#14532d', fs, 'center', 900); p = P(114.4, 8.9); textLight(ctx, T('QĐ Trường Sa', 'Truong Sa Is.'), p.x, p.y, '#14532d', fs, 'center', 900); p = P(112.6, 13.2); textLight(ctx, T('Biển Đông', 'East Sea'), p.x, p.y, '#075985', fs + 3, 'center', 900);
      ra.pins = [];
      RARE.forEach((r, i) => { const q = P(r.lon, r.lat), on = i === ra.sel, bob = on && !reduceMotion ? Math.sin(clock * 5) * 3 : 0, R = on ? 17 : 13; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(q.x, q.y + bob, R, 0, TAU); ctx.fill(); ctx.strokeStyle = ST[r.st][0]; ctx.lineWidth = on ? 4 : 3; ctx.stroke(); ctx.globalAlpha = r.st === 'ex' ? .45 : 1; emo(ctx, r.e, q.x, q.y + bob + 1, R * 1.1); ctx.globalAlpha = 1; ra.pins.push({ i, x: q.x, y: q.y }); });
      const lx = 10, ly = h - 10 - 4 * 18; ctx.fillStyle = 'rgba(255,255,255,.92)'; rr(ctx, lx - 4, ly - 14, 200, 4 * 18 + 10, 10); ctx.fill();
      Object.values(ST).forEach(([c, n], k) => { ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(lx + 8, ly + k * 18, 6, 0, TAU); ctx.stroke(); textLight(ctx, L(n), lx + 20, ly + k * 18, '#334155', 11, 'left', 800); });
    }
    raC.c.addEventListener('pointerdown', (e) => { const p = localPoint(raC.c, e); let best = -1, bd = 24; for (const q of ra.pins) { const d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; best = q.i; } } if (best >= 0) { cancelSpeech(); ra.sel = best; raInfo(true); } });
    function raInfo(force) {
      const key = lang + ra.sel; if (key === ra.infoKey && !force) return; ra.infoKey = key;
      const r = RARE[ra.sel], d = L({ vi: r.vi, en: r.en });
      infoBox($('info_rare'), { emo: r.e, title: d[0], sub: `📍 ${d[1]}`, rows: [[T('Tình trạng', 'Status'), L(ST[r.st][1])], [T('Giới thiệu', 'About'), d[2]]], notes: [[r.st === 'ex' ? 'warn' : 'fun', (r.st === 'ex' ? '💔 ' : '✨ ') + d[3]]] });
      setText('hud_rare', `${r.e} ${d[0]} – ${L(ST[r.st][1])}`);
    }
    const PLEDGE = [{ vi: 'Không mua đồ làm từ động vật hoang dã (sừng, vảy, ngà, mật gấu…)', en: 'Never buy wildlife products (horn, scales, ivory, bear bile…)' }, { vi: 'Không bắt, không nuôi nhốt chim thú hoang dã', en: 'Never catch or cage wild animals' }, { vi: 'Thấy buôn bán động vật hoang dã thì báo người lớn hoặc gọi 1800 1522', en: 'Report wildlife trading to an adult or the 1800 1522 hotline' }, { vi: 'Giảm rác nhựa để bảo vệ rùa biển', en: 'Cut plastic waste to protect sea turtles' }, { vi: 'Trồng cây, giữ rừng, ngôi nhà của muông thú', en: 'Plant trees and protect forests, the animals’ home' }];
    function raPledge() {
      const all = ra.pledge.every(Boolean);
      $('pledgeBox').innerHTML = PLEDGE.map((p, i) => `<button type="button" class="pledge${ra.pledge[i] ? ' on' : ''}" data-pl="${i}"><span>${ra.pledge[i] ? '✅' : '⬜'}</span><b></b></button>`).join('') + (all ? `<div class="cert">🏅 <b>${T('Đại sứ bảo vệ động vật hoang dã', 'Wildlife Protection Ambassador')}</b><br><span>${T('Cảm ơn em đã hứa bảo vệ muông thú Việt Nam!', 'Thank you for promising to protect Vietnam’s wildlife!')}</span></div>` : '');
      $('pledgeBox').querySelectorAll('[data-pl]').forEach((b) => { b.querySelector('b').textContent = L(PLEDGE[+b.dataset.pl]); });
    }
    $('pledgeBox').addEventListener('click', (e) => { const b = e.target.closest('[data-pl]'); if (!b) return; ra.pledge[+b.dataset.pl] = !ra.pledge[+b.dataset.pl]; raPledge(); });
    TABS.rare = { frame() { drawRare(); }, refresh() { ra.infoKey = ''; raInfo(true); raPledge(); } };
    QUIZZES.push(makeQuiz($('quiz_rare'), {
      vi: [
        { q: 'Loài thú nào được gọi là "kỳ lân châu Á", phát hiện năm 1992?', a: ['Sao la', 'Voi', 'Hổ', 'Gấu ngựa'], why: 'Sao la được phát hiện ở Vũ Quang, Hà Tĩnh.' },
        { q: 'Voọc Cát Bà chỉ sống ở đâu trên thế giới?', a: ['Đảo Cát Bà', 'Đà Lạt', 'Cà Mau', 'Châu Phi'], why: 'Đây là loài đặc hữu của đảo Cát Bà, Hải Phòng.' },
        { q: 'Vì sao rác nhựa nguy hiểm với rùa biển?', a: ['Rùa tưởng túi nilon là sứa và ăn phải', 'Rùa thích chơi nhựa', 'Nhựa làm nước ấm', 'Không nguy hiểm'], why: 'Ăn nhựa có thể làm rùa chết.' },
        { q: 'Tê giác Java ở Việt Nam hiện nay ra sao?', a: ['Đã tuyệt chủng ở Việt Nam', 'Rất đông', 'Sống ở Hà Nội', 'Mới phát hiện thêm'], why: 'Con cuối cùng bị săn trộm năm 2010.' },
        { q: 'Em có thể làm gì để bảo vệ động vật hoang dã?', a: ['Không mua đồ làm từ động vật hoang dã', 'Bắt chim về nuôi', 'Mua vảy tê tê', 'Vứt rác xuống biển'], why: 'Không mua thì không có người săn bắt.' },
        { q: 'Loài linh trưởng nào được gọi là "nữ hoàng linh trưởng"?', a: ['Voọc chà vá chân nâu', 'Khỉ đột', 'Tinh tinh', 'Đười ươi'], why: 'Bộ lông 5 màu rất đẹp, sống ở Sơn Trà, Đà Nẵng.' }
      ],
      en: [
        { q: 'Which “Asian unicorn” was discovered in 1992?', a: ['Saola', 'Elephant', 'Tiger', 'Black bear'], why: 'It was found at Vu Quang, Ha Tinh.' },
        { q: 'Where do Cat Ba langurs live?', a: ['Only on Cat Ba Island', 'Da Lat', 'Ca Mau', 'Africa'], why: 'They are found nowhere else.' },
        { q: 'Why is plastic dangerous for sea turtles?', a: ['They mistake bags for jellyfish', 'They like toys', 'It warms the water', 'It isn’t'], why: 'Swallowing plastic can kill them.' },
        { q: 'What happened to Vietnam’s Javan rhinos?', a: ['Extinct in Vietnam', 'Very common', 'Live in Hanoi', 'More were found'], why: 'The last one was poached in 2010.' },
        { q: 'How can you protect wildlife?', a: ['Never buy wildlife products', 'Catch birds as pets', 'Buy pangolin scales', 'Throw rubbish in the sea'], why: 'No buyers means no poaching.' },
        { q: 'Which primate is the “queen of primates”?', a: ['Red-shanked douc', 'Gorilla', 'Chimpanzee', 'Orangutan'], why: 'Its five-coloured coat is stunning; it lives at Son Tra.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'cls';
    root.querySelectorAll('.animal-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.animal-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('z-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.animal-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.animal-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.animal-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
