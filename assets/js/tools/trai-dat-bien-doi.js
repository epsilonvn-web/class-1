/* Epsilon Edu - Tool: Trai Dat bien doi (Our changing Earth): nui lua, dong dat, dong bang phu sa
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Dang ky: window.CLASS1_TOOL_MODULES.earthChanges = { render(context), destroy() }
 * Giong doc: Google TTS cho ca tieng Viet va tieng Anh.
 */
(() => {
  "use strict";

  const TOOL_ID = "earthChanges";
  let activeCleanup = null;

  const CSS = `
.change-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.change-tool *{box-sizing:border-box}.change-tool button,.change-tool input{font:inherit}.change-tool button{cursor:pointer}.change-tool .hidden{display:none!important}
.change-tool button:focus-visible,.change-tool canvas:focus-visible,.change-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.change-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.change-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.change-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.change-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.change-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.change-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.change-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.change-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.change-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.change-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.change-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.change-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.change-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.change-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.change-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.change-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.change-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.change-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.change-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.change-panel{width:100%}.change-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.change-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.change-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.change-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.change-tool .card-head.compact{margin-bottom:9px}
.change-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.change-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.change-tool .btn,.change-tool .soft-btn,.change-tool .segmented button,.change-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.change-tool .btn:hover,.change-tool .soft-btn:hover,.change-tool .segmented button:hover,.change-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.change-tool .btn{padding:0 12px}.change-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.change-tool .segmented{display:flex;gap:7px;margin:0}.change-tool .segmented button{padding:0 13px}
.change-tool .segmented button[aria-pressed="true"],.change-tool .soft-btn[aria-pressed="true"],.change-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.change-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.change-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.change-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.change-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.change-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.change-tool .range-control input{width:100%;accent-color:#8b5cf6}.change-tool .range-control b{color:#7c3aed;font-size:13px}
.change-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.change-tool .soft-btn{padding:0 12px}
.change-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.change-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.change-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.change-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.change-tool .info-title{display:flex;align-items:center;gap:10px}.change-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.change-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.change-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.change-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.change-tool .facts{display:grid;gap:6px;margin-top:10px}.change-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.change-tool .facts b{color:#7c3aed;font-size:13.5px}.change-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.change-tool .fun,.change-tool .warn,.change-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.change-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.change-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.change-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.change-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.change-tool .state-big.up{color:#0f766e}.change-tool .state-big.down{color:#b45309}
.change-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.change-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.change-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.change-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.change-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.change-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.change-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.change-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.change-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.change-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.change-tool .qopt:hover{filter:brightness(.985)}.change-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.change-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.change-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.change-tool .qfb,.change-tool .score{font-size:13px;font-weight:900}.change-tool .qfb.ok{color:#15803d}.change-tool .qfb.no{color:#be123c}.change-tool .score{color:#7c3aed}
.change-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.change-grid{grid-template-columns:1fr;align-items:start}.change-side{grid-template-rows:auto auto;height:auto}.change-tool .control-grid{grid-template-columns:1fr}.change-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.change-hero{flex-wrap:wrap;padding:12px}.change-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.change-tabs{grid-template-columns:1fr}.change-tabs .tab{min-height:40px}.change-card{padding:11px;border-radius:18px}.change-tool .card-head{align-items:flex-start;flex-direction:column}.change-tool .head-actions{width:100%;justify-content:space-between}.change-tool .head-actions .segmented{flex:1;min-width:0}.change-tool .head-actions .segmented button{flex:1;padding:0 8px}.change-tool .qopts{grid-template-columns:1fr}.change-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.change-tool *{transition:none!important}}

.change-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.change-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.change-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.change-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.change-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.change-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.change-tool .checklist{display:grid;gap:6px;margin-top:10px}
.change-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.change-tool .checklist .ok{color:#15803d}.change-tool .checklist .no{color:#be123c}.change-tool .checklist .wait{color:#94a3b8}
.change-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.change-tool .process span{flex:1}.change-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.change-tool .process .on{color:#0284c7}.change-tool .process i.on{color:#ec4899}
@media(max-width:640px){.change-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.change-tool .slider-pair{grid-template-columns:1fr}}

.change-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.change-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.change-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.change-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.change-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:640px){.change-tabs{grid-template-columns:1fr 1fr}}
`;

  const HTML = `
<section class="change-tool" data-tool-root>
  <div class="change-hero">
    <div class="change-hero-icon" aria-hidden="true">⛰️</div>
    <div>
      <p class="change-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="change-lead" data-t="lead"></p>
    </div>
    <div class="change-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="cAudioNotice" class="change-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="change-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="vol" data-t="tab_vol"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="eq" data-t="tab_eq"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="dl" data-t="tab_dl"></button>
  </div>
  <section id="c-vol" class="change-panel" role="tabpanel">
    <div class="change-grid">
      <article class="change-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_vol"></h2></div>
          <div class="head-actions"><button id="volErupt" class="btn" type="button" data-t="erupt"></button><button id="volPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_vol" role="img" data-ta="cv_vol"></canvas></div>
        <p id="hud_vol" class="hud" aria-live="polite"></p>
      </article>
      <div class="change-side">
        <aside class="change-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_vol"></span><h2 data-t="sh_vol"></h2></div></div>
          
          <div id="info_vol" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_vol" class="change-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="c-eq" class="change-panel hidden" role="tabpanel">
    <div class="change-grid">
      <article class="change-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_eq"></h2></div>
          <div class="head-actions"><button id="eqSlip" class="btn" type="button" data-t="slip"></button><button id="eqPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_eq" role="img" data-ta="cv_eq"></canvas></div>
        <p id="hud_eq" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="rateL"></span><input id="eqRate" type="range" min="0" max="100" value="40" step="1"></label>
      </article>
      <div class="change-side">
        <aside class="change-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_eq"></span><h2 data-t="sh_eq"></h2></div></div>
          <div class="canvas-wrap" style="background:#fff"><canvas id="c_seis" role="img" aria-hidden="true"></canvas></div>
          <div id="info_eq" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_eq" class="change-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="c-dl" class="change-panel hidden" role="tabpanel">
    <div class="change-grid">
      <article class="change-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="h_dl"></h2></div>
          <div class="head-actions"><button id="dlPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="c_dl" role="img" data-ta="cv_dl"></canvas></div>
        <p id="hud_dl" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="yearsL"></span><input id="dlYears" type="range" min="0" max="5000" value="0" step="10"><b id="dlYearsTxt"></b></label>
        <div class="toggle-row" style="justify-content:flex-start;margin-top:8px">
          <button id="dlFlood" class="soft-btn" type="button" aria-pressed="false" data-t="flood"></button>
          <button id="dlDyke" class="soft-btn" type="button" aria-pressed="false" data-t="dyke"></button>
        </div>
      </article>
      <div class="change-side">
        <aside class="change-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="se_dl"></span><h2 data-t="sh_dl"></h2></div></div>
          
          <div id="info_dl" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="quiz_dl" class="change-card quiz-card"></article>
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
    const audioNotice = $('cAudioNotice');
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
      title: ['Trái Đất biến đổi', 'Our Changing Earth'],
      lead: ['Xem núi lửa phun trào, các mảng đất trượt gây động đất và dòng sông chở phù sa bồi đắp nên đồng bằng.', 'Watch a volcano erupt, rock plates slip and cause earthquakes, and a river carry mud to build a delta.'],
      tabsLabel: ['Các chủ đề', 'Topics'], eyeSim: ['Mô phỏng', 'Simulation'],
      tab_vol: ['🌋 Núi lửa', '🌋 Volcanoes'], h_vol: ['Bên trong một ngọn núi lửa', 'Inside a volcano'],
      cv_vol: ['Lát cắt núi lửa với lò mắc-ma, ống phun và dung nham', 'A cut-away volcano with a magma chamber, vent and lava'],
      se_vol: ['Tìm hiểu', 'Learn'], sh_vol: ['Núi lửa phun thế nào?', 'How a volcano erupts'],
      tab_eq: ['🏚️ Động đất', '🏚️ Earthquakes'], h_eq: ['Các mảng đất mắc kẹt rồi trượt', 'Rock plates stick, then slip'],
      cv_eq: ['Hai mảng đá dưới thị trấn, khi trượt tạo sóng địa chấn', 'Two rock plates under a town send out shaking waves when they slip'],
      se_eq: ['Máy đo địa chấn', 'Seismograph'], sh_eq: ['Đường rung ghi lại', 'The shaking, recorded'],
      tab_dl: ['🏞️ Đồng bằng', '🏞️ Deltas'], h_dl: ['Sông bồi đắp phù sa', 'A river builds land from mud'],
      cv_dl: ['Dòng sông chở phù sa ra biển, bồi đắp đồng bằng qua hàng nghìn năm', 'A river carries mud to the sea and builds a delta over thousands of years'],
      se_dl: ['Tìm hiểu', 'Learn'], sh_dl: ['Đồng bằng được tạo ra thế nào?', 'How a delta grows'],
      erupt: ['🌋 Phun trào!', '🌋 Erupt!'], slip: ['💥 Trượt ngay', '💥 Slip now'], rateL: ['Tốc độ mảng đẩy nhau', 'How fast the plates push'],
      yearsL: ['Kéo để đổi thời gian', 'Drag to change the time'], flood: ['🌊 Mùa lũ', '🌊 Flood season'], dyke: ['🧱 Đắp đê', '🧱 Build dykes']
    };
    const playLbl = (on) => (on ? T('⏸ Tạm dừng', '⏸ Pause') : T('▶ Chạy', '▶ Play'));

    /* =====================================================================
       1. NÚI LỬA
       ===================================================================== */
    let vol = { p: 30, erupt: 0, flow: 0, cool: 1, playing: !reduceMotion, parts: [], infoKey: '' };
    const volC = mk('c_vol', (w) => clamp(w * .66, 300, 540));
    function volGeom() {
      const w = volC.w || 640, h = volC.h || 420, gy = h * .62, cx = w * .5, top = h * .22, base = w * .34, crater = w * .045;
      return { w, h, gy, cx, top, base, crater, ch: { x: cx, y: h * .86, rx: w * .16, ry: h * .07 } };
    }
    function volStep(dt) {
      if (vol.playing && !vol.erupt) vol.p = Math.min(100, vol.p + dt * 9);
      if (vol.p >= 100 && !vol.erupt) startErupt();
      const g = volGeom();
      if (vol.erupt > 0) {
        vol.erupt -= dt; vol.flow = Math.min(1, vol.flow + dt * .28); vol.cool = 0;
        for (let i = 0; i < 6; i++) vol.parts.push({ k: 'lava', x: g.cx + rand(-g.crater * .5, g.crater * .5), y: g.top, vx: rand(-1, 1) * g.w * .12, vy: -rand(.4, .9) * g.h, life: 1 });
        for (let i = 0; i < 3; i++) vol.parts.push({ k: 'ash', x: g.cx + rand(-g.crater, g.crater), y: g.top - 6, vx: rand(.2, 1) * g.w * .04, vy: -rand(.12, .25) * g.h, life: 1, r: rand(6, 14) });
        if (vol.erupt <= 0) { vol.erupt = 0; vol.p = 0; }
      } else if (vol.flow > 0) vol.cool = Math.min(1, vol.cool + dt * .12);
      for (const q of vol.parts) {
        q.x += q.vx * dt; q.y += q.vy * dt;
        if (q.k === 'lava') { q.vy += g.h * 1.4 * dt; q.life -= dt * .7; if (q.y > g.gy) q.life = 0; }
        else { q.r += dt * 10; q.life -= dt * .22; }
      }
      vol.parts = vol.parts.filter((q) => q.life > 0).slice(-500);
    }
    function startErupt() { if (vol.erupt) return; vol.erupt = 5; vol.flow = Math.max(vol.flow, .05); vol.cool = 0; volInfo(true); }
    function drawVol() {
      const g = volGeom(), { w, h } = g, ctx = volC.ctx;
      if (!volC.w) return;
      const sky = ctx.createLinearGradient(0, 0, 0, g.gy); sky.addColorStop(0, vol.erupt ? '#475569' : '#7dd3fc'); sky.addColorStop(1, vol.erupt ? '#94a3b8' : '#e0f2fe');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, g.gy);
      // các lớp đất đá
      const layers = ['#a16207', '#92400e', '#78350f', '#57290e'];
      layers.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(0, g.gy + (h - g.gy) * i / 4, w, (h - g.gy) / 4 + 1); });
      // lò mắc-ma
      const pulse = 1 + vol.p / 100 * .12;
      const mg = ctx.createRadialGradient(g.ch.x, g.ch.y, 4, g.ch.x, g.ch.y, g.ch.rx * pulse);
      mg.addColorStop(0, '#fde047'); mg.addColorStop(.5, '#f97316'); mg.addColorStop(1, '#b91c1c');
      ctx.fillStyle = mg; ctx.beginPath(); ctx.ellipse(g.ch.x, g.ch.y, g.ch.rx * pulse, g.ch.ry * pulse, 0, 0, TAU); ctx.fill();
      // ngọn núi
      const bulge = vol.p / 100 * h * .015;
      const coneL = { x: g.cx - g.base, y: g.gy }, coneR = { x: g.cx + g.base, y: g.gy };
      ctx.fillStyle = '#78716c';
      ctx.beginPath(); ctx.moveTo(coneL.x, coneL.y); ctx.quadraticCurveTo(g.cx - g.base * .35, g.top + h * .1, g.cx - g.crater, g.top - bulge); ctx.lineTo(g.cx + g.crater, g.top - bulge); ctx.quadraticCurveTo(g.cx + g.base * .35, g.top + h * .1, coneR.x, coneR.y); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#57534e'; ctx.beginPath(); ctx.moveTo(g.cx - g.base * .7, g.gy); ctx.quadraticCurveTo(g.cx - g.base * .2, g.top + h * .2, g.cx, g.top + h * .05); ctx.quadraticCurveTo(g.cx + g.base * .2, g.top + h * .2, g.cx + g.base * .7, g.gy); ctx.closePath(); ctx.globalAlpha = .4; ctx.fill(); ctx.globalAlpha = 1;
      // ống phun
      const fill = vol.erupt ? 1 : vol.p / 100;
      ctx.strokeStyle = '#3f3f46'; ctx.lineWidth = g.crater * .9; ctx.beginPath(); ctx.moveTo(g.cx, g.ch.y - g.ch.ry * .5); ctx.lineTo(g.cx, g.top - bulge); ctx.stroke();
      ctx.strokeStyle = '#f97316'; ctx.lineWidth = g.crater * .6; ctx.beginPath(); ctx.moveTo(g.cx, g.ch.y - g.ch.ry * .5); ctx.lineTo(g.cx, lerp(g.ch.y - g.ch.ry * .5, g.top - bulge, fill)); ctx.stroke();
      // dung nham chảy xuống sườn
      if (vol.flow > 0) {
        const col = mix('#f97316', '#3f3f46', vol.cool);
        ctx.strokeStyle = col; ctx.lineWidth = Math.max(4, w * .012); ctx.lineCap = 'round';
        for (const sd of [-1, 1]) {
          ctx.beginPath(); const n = 20;
          for (let i = 0; i <= n * vol.flow; i++) { const t = i / n, x = g.cx + sd * (g.crater + (g.base * .95 - g.crater) * t), y = lerp(g.top - bulge, g.gy - 2, Math.pow(t, .8)) + Math.sin(t * 9 + sd) * 3; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
          ctx.stroke();
        }
      }
      // khói nhẹ khi nghỉ
      if (!vol.erupt) { ctx.fillStyle = 'rgba(226,232,240,.6)'; for (let k = 0; k < 3; k++) { const t = (clock * .25 + k / 3) % 1; ctx.beginPath(); ctx.arc(g.cx + t * w * .05, g.top - t * h * .15, 5 + t * 10, 0, TAU); ctx.fill(); } }
      for (const q of vol.parts) {
        if (q.k === 'ash') { ctx.fillStyle = `rgba(71,85,105,${q.life * .55})`; ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, TAU); ctx.fill(); }
      }
      for (const q of vol.parts) if (q.k === 'lava') { ctx.fillStyle = `rgba(249,115,22,${q.life})`; ctx.beginPath(); ctx.arc(q.x, q.y, 3, 0, TAU); ctx.fill(); }
      // đồng hồ áp suất
      const bx = w - 34, by = h * .12, bh = h * .5;
      ctx.fillStyle = 'rgba(255,255,255,.85)'; rr(ctx, bx - 4, by - 4, 22, bh + 8, 8); ctx.fill();
      ctx.fillStyle = mix('#facc15', '#dc2626', vol.p / 100); ctx.fillRect(bx, by + bh * (1 - vol.p / 100), 14, bh * vol.p / 100);
      textLight(ctx, T('Áp lực', 'Pressure'), bx + 7, by + bh + 16, '#fff', 10.5, 'center', 900);
      const fs = w < 420 ? 10 : 11.5;
      textLight(ctx, T('Lò mắc-ma (đá nóng chảy)', 'Magma chamber (melted rock)'), g.ch.x, g.ch.y + g.ch.ry + 14, '#fef3c7', fs, 'center', 900);
      textLight(ctx, T('Miệng núi lửa', 'Crater'), g.cx + g.crater + 8, g.top - bulge - 6, vol.erupt ? '#fff' : '#1e293b', fs, 'left', 900);
      if (vol.flow > 0) textLight(ctx, vol.cool > .8 ? T('Dung nham nguội thành đá bazan', 'Lava cooled into basalt') : T('Dung nham', 'Lava'), g.cx - g.base * .62, g.gy - h * .12, vol.cool > .8 ? '#1e293b' : '#9a3412', fs, 'right', 900);
    }
    function volInfo(force) {
      const st = vol.erupt ? 'erupt' : vol.flow > 0 && vol.cool > .8 ? 'cooled' : 'rest';
      const key = lang + st;
      if (key === vol.infoKey && !force) return; vol.infoKey = key;
      infoBox($('info_vol'), {
        emo: '🌋', title: st === 'erupt' ? T('Núi lửa đang phun trào!', 'The volcano is erupting!') : st === 'cooled' ? T('Dung nham đã nguội', 'The lava has cooled') : T('Núi lửa đang tích áp lực', 'Pressure is building'),
        rows: [[T('Mắc-ma', 'Magma'), T('Sâu dưới lòng đất rất nóng, đá bị nóng chảy thành mắc-ma.', 'Deep underground it is so hot that rock melts into magma.')],
          [T('Vì sao phun?', 'Why erupt?'), T('Mắc-ma và khí bị nén, áp lực tăng dần đến khi phá vỡ lớp đá, phun lên thành dung nham, tro bụi.', 'Magma and gas get squeezed until the pressure breaks through, bursting out as lava and ash.')],
          [T('Sau đó', 'Afterwards'), T('Dung nham nguội thành đá bazan. Lâu ngày đá vỡ vụn thành đất đỏ bazan rất màu mỡ.', 'Lava cools into basalt rock. Over a long time it breaks down into rich red basalt soil.')]],
        notes: [['fun', T('✨ Ở Việt Nam có nhiều núi lửa đã tắt từ rất lâu, như núi lửa Chư Đăng Ya (Gia Lai) và đảo Lý Sơn (Quảng Ngãi). Đất đỏ bazan ở Tây Nguyên rất hợp trồng cà phê, hồ tiêu.', '✨ Vietnam has volcanoes that went quiet long ago, like Chu Dang Ya (Gia Lai) and Ly Son island (Quang Ngai). The Central Highlands’ red basalt soil is great for coffee and pepper.')]]
      });
    }
    $('volPlay').onclick = () => { cancelSpeech(); vol.playing = !vol.playing; $('volPlay').textContent = playLbl(vol.playing); };
    $('volErupt').onclick = () => { cancelSpeech(); startErupt(); };
    TABS.vol = {
      frame(dt) { volStep(dt); drawVol(); volInfo(); setText('hud_vol', vol.erupt ? T('🌋 Phun trào! Dung nham và tro bụi bắn lên', '🌋 Erupting! Lava and ash shoot out') : T(`🌡️ Áp lực bên dưới: ${Math.round(vol.p)}%`, `🌡️ Pressure below: ${Math.round(vol.p)}%`)); },
      refresh() { $('volPlay').textContent = playLbl(vol.playing); vol.infoKey = ''; volInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_vol'), {
      vi: [
        { q: 'Mắc-ma là gì?', a: ['Đá nóng chảy sâu dưới lòng đất', 'Nước ngầm', 'Cát biển', 'Mây đen'], why: 'Sâu bên dưới rất nóng nên đá bị nóng chảy thành mắc-ma.' },
        { q: 'Khi mắc-ma phun lên mặt đất thì gọi là gì?', a: ['Dung nham', 'Phù sa', 'Băng tuyết', 'Nước khoáng'], why: 'Mắc-ma lên tới mặt đất gọi là dung nham.' },
        { q: 'Dung nham nguội đi thành gì?', a: ['Đá (như đá bazan)', 'Nước', 'Cát trắng', 'Gỗ'], why: 'Dung nham nguội đông cứng thành đá.' },
        { q: 'Đất đỏ bazan ở Tây Nguyên có từ đâu?', a: ['Từ đá núi lửa vỡ vụn qua rất lâu', 'Do sơn màu đỏ', 'Do mưa đỏ', 'Do gạch vỡ'], why: 'Đá bazan từ núi lửa cổ vỡ vụn thành đất đỏ màu mỡ.' },
        { q: 'Đảo nào ở Việt Nam được tạo ra từ núi lửa cổ?', a: ['Đảo Lý Sơn', 'Đảo Cát Bà', 'Hòn Gai', 'Đảo Phú Quý'], why: 'Lý Sơn (Quảng Ngãi) hình thành từ hoạt động núi lửa rất xa xưa.' },
        { q: 'Vì sao núi lửa phun trào?', a: ['Áp lực của mắc-ma và khí tăng quá lớn', 'Vì trời mưa to', 'Vì có gió mạnh', 'Vì Mặt Trăng kéo'], why: 'Mắc-ma và khí bị nén, đến lúc áp lực phá vỡ lớp đá phía trên.' }
      ],
      en: [
        { q: 'What is magma?', a: ['Melted rock deep underground', 'Groundwater', 'Beach sand', 'Dark clouds'], why: 'It is so hot deep down that rock melts into magma.' },
        { q: 'What is magma called when it reaches the surface?', a: ['Lava', 'Silt', 'Ice', 'Mineral water'], why: 'Magma that comes out is called lava.' },
        { q: 'What does lava turn into when it cools?', a: ['Rock (like basalt)', 'Water', 'White sand', 'Wood'], why: 'Cooling lava hardens into rock.' },
        { q: 'Where does the Central Highlands’ red soil come from?', a: ['Volcanic rock broken down over ages', 'Red paint', 'Red rain', 'Broken bricks'], why: 'Basalt from ancient volcanoes broke down into rich red soil.' },
        { q: 'Which Vietnamese island formed from ancient volcanoes?', a: ['Ly Son', 'Cat Ba', 'Hon Gai', 'Phu Quy'], why: 'Ly Son (Quang Ngai) formed from volcanic activity long, long ago.' },
        { q: 'Why does a volcano erupt?', a: ['Magma and gas pressure gets too high', 'Heavy rain', 'Strong wind', 'The Moon pulls it'], why: 'Squeezed magma and gas eventually break through the rock above.' }
      ]
    }));

    /* =====================================================================
       2. ĐỘNG ĐẤT
       ===================================================================== */
    let eq = { stress: 20, playing: !reduceMotion, shake: 0, mag: 0, slip: 0, waves: [], trace: [], infoKey: '', last: 0 };
    const eqC = mk('c_eq', (w) => clamp(w * .62, 290, 500));
    const seis = mk('c_seis', (w) => clamp(w * .45, 140, 190));
    const eqRate = () => .25 + (+$('eqRate').value / 100) * 1.5;
    function eqQuake() {
      if (eq.shake > .3 || eq.stress < 8) return;
      eq.mag = 3 + eq.stress / 100 * 4; eq.shake = eq.stress / 100 * 3 + .6; eq.slip += eq.stress / 100;
      eq.waves.push({ r: 0 }); eq.last = eq.mag; eq.stress = 0; eqInfo(true);
    }
    function eqStep(dt) {
      if (eq.playing && eq.shake <= 0) eq.stress = Math.min(100, eq.stress + dt * 8 * eqRate());
      if (eq.stress >= 100) eqQuake();
      eq.shake = Math.max(0, eq.shake - dt * .8);
      for (const wv of eq.waves) wv.r += dt * 260;
      eq.waves = eq.waves.filter((wv) => wv.r < 900);
      const amp = eq.shake > 0 ? eq.shake * (Math.sin(clock * 47) + Math.sin(clock * 31) * .6) : 0;
      eq.trace.push(amp + (Math.random() - .5) * .08 * (1 + eq.stress / 100));
      if (eq.trace.length > 300) eq.trace.shift();
    }
    function drawEq() {
      const { w, h, ctx } = eqC;
      if (!w) return;
      const gy = h * .32, shk = eq.shake > 0 ? Math.sin(clock * 50) * eq.shake * 4 : 0;
      ctx.fillStyle = '#e0f2fe'; ctx.fillRect(0, 0, w, gy);
      // hai mảng đá: ranh giới nghiêng (đứt gãy)
      const fx0 = w * .42, fx1 = w * .62, off = ((eq.slip * 18) % 36) + eq.stress / 100 * 0;
      ctx.fillStyle = '#a8a29e'; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(fx0, gy); ctx.lineTo(fx1, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#d6d3d1'; ctx.beginPath(); ctx.moveTo(fx0, gy); ctx.lineTo(w, gy); ctx.lineTo(w, h); ctx.lineTo(fx1, h); ctx.closePath(); ctx.fill();
      // các vạch lớp đá bị uốn cong khi tích ứng suất
      const bend = eq.stress / 100;
      ctx.lineWidth = 2;
      for (let k = 1; k <= 4; k++) {
        const y = gy + (h - gy) * k / 5;
        const fx = lerp(fx0, fx1, (y - gy) / (h - gy));
        ctx.strokeStyle = '#78716c'; ctx.beginPath(); ctx.moveTo(0, y + off * .3); ctx.quadraticCurveTo(fx * .7, y + off * .3, fx - 2, y + off * .3 + bend * 16); ctx.stroke();
        ctx.strokeStyle = '#a8a29e'; ctx.beginPath(); ctx.moveTo(fx + 2, y - off * .3 - bend * 16); ctx.quadraticCurveTo(fx + (w - fx) * .3, y - off * .3, w, y - off * .3); ctx.stroke();
      }
      ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 3; ctx.setLineDash([8, 5]); ctx.beginPath(); ctx.moveTo(fx0, gy); ctx.lineTo(fx1, h); ctx.stroke(); ctx.setLineDash([]);
      arrow(ctx, w * .12, h * .75, w * .28, h * .75, '#1e293b', 3, 10);
      arrow(ctx, w * .88, h * .62, w * .72, h * .62, '#1e293b', 3, 10);
      const hypo = { x: lerp(fx0, fx1, .55), y: lerp(gy, h, .55) };
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(hypo.x, hypo.y, 6, 0, TAU); ctx.fill();
      for (const wv of eq.waves) { ctx.strokeStyle = `rgba(220,38,38,${Math.max(0, 1 - wv.r / 900)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hypo.x, hypo.y, wv.r, 0, TAU); ctx.stroke(); }
      // thị trấn
      ctx.save(); ctx.translate(shk, 0);
      ctx.fillStyle = '#86efac'; ctx.fillRect(-10, gy - 6, w + 20, 8);
      for (let i = 0; i < 6; i++) {
        const x = w * (.08 + i * .16), hh = h * (.1 + (i % 3) * .04), tilt = eq.shake > 0 ? Math.sin(clock * 40 + i) * eq.shake * .02 : 0;
        ctx.save(); ctx.translate(x, gy - 6); ctx.rotate(tilt);
        ctx.fillStyle = ['#fca5a5', '#fde68a', '#bfdbfe', '#c4b5fd', '#fdba74', '#a7f3d0'][i]; ctx.fillRect(-w * .045, -hh, w * .09, hh);
        ctx.fillStyle = '#7c2d12'; ctx.beginPath(); ctx.moveTo(-w * .055, -hh); ctx.lineTo(0, -hh - h * .05); ctx.lineTo(w * .055, -hh); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.fillRect(-w * .02, -hh * .6, w * .015, hh * .2); ctx.fillRect(w * .008, -hh * .6, w * .015, hh * .2);
        ctx.restore();
      }
      ctx.restore();
      const fs = w < 420 ? 10 : 11.5;
      textLight(ctx, T('Mảng đá 1', 'Plate 1'), w * .15, h * .9, '#292524', fs, 'center', 900);
      textLight(ctx, T('Mảng đá 2', 'Plate 2'), w * .85, h * .9, '#292524', fs, 'center', 900);
      textLight(ctx, T('Đứt gãy', 'Fault'), fx1 - 8, h * .94, '#7f1d1d', fs, 'right', 900);
      textLight(ctx, T('Chấn tiêu', 'Focus'), hypo.x + 10, hypo.y, '#7f1d1d', fs, 'left', 900);
      // thanh ứng suất
      ctx.fillStyle = 'rgba(255,255,255,.9)'; rr(ctx, 8, 8, 132, 30, 8); ctx.fill();
      ctx.fillStyle = '#e5e7eb'; ctx.fillRect(14, 24, 120, 8); ctx.fillStyle = mix('#facc15', '#dc2626', eq.stress / 100); ctx.fillRect(14, 24, 120 * eq.stress / 100, 8);
      textLight(ctx, T('Lực bị dồn nén', 'Built-up strain'), 14, 16, '#334155', 10.5, 'left', 900);
      if (eq.shake > .3) bubble(ctx, T(`Động đất! Độ lớn khoảng ${eq.mag.toFixed(1).replace('.', ',')}`, `Earthquake! About magnitude ${eq.mag.toFixed(1)}`), w * .5, gy * .4, 12);
    }
    function drawSeis() {
      const { w, h, ctx } = seis;
      if (!w) return;
      ctx.fillStyle = '#fffdf5'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1; for (let y = 10; y < h; y += 14) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.5; ctx.beginPath();
      const n = eq.trace.length;
      eq.trace.forEach((v, i) => { const x = w - (n - 1 - i) * (w / 300), y = h / 2 - clamp(v, -3.5, 3.5) * h * .12; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.stroke();
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(w - 3, h / 2 - clamp(eq.trace[n - 1] || 0, -3.5, 3.5) * h * .12, 3, 0, TAU); ctx.fill();
    }
    function eqInfo(force) {
      const key = lang + (eq.last ? 1 : 0);
      if (key === eq.infoKey && !force) return; eq.infoKey = key;
      infoBox($('info_eq'), {
        emo: '🏚️', title: T('Vì sao có động đất?', 'Why earthquakes happen'),
        sub: eq.last ? T(`Trận vừa rồi: độ lớn khoảng ${eq.last.toFixed(1).replace('.', ',')}`, `Last quake: about magnitude ${eq.last.toFixed(1)}`) : T('Lực đang dồn nén…', 'Strain is building…'),
        rows: [[T('Mảng kiến tạo', 'Tectonic plates'), T('Vỏ Trái Đất gồm nhiều mảng lớn, chuyển động rất chậm, chỉ vài xăng-ti-mét mỗi năm, chậm như móng tay mọc.', 'Earth’s crust is made of big plates that move very slowly, a few centimetres a year, about as fast as fingernails grow.')],
          [T('Động đất', 'Earthquake'), T('Khi hai mảng mắc kẹt, lực dồn nén dần. Đến lúc đá chịu không nổi thì trượt mạnh, tạo sóng rung lan ra mọi phía.', 'When plates get stuck, strain builds up. When the rock can’t hold, it slips suddenly, sending shaking waves out in every direction.')],
          [T('Việt Nam', 'Vietnam'), T('Ít có động đất mạnh, nhưng vùng Tây Bắc như Điện Biên, Sơn La đôi khi có động đất.', 'Strong quakes are rare, but the north-west, such as Dien Bien and Son La, sometimes has earthquakes.')]],
        notes: [['warn', T('⚠️ Khi có động đất: cúi xuống, chui dưới gầm bàn chắc chắn, che đầu và bám chặt. Tránh xa cửa kính. Hết rung mới ra chỗ trống.', '⚠️ In an earthquake: drop down, get under a sturdy table, cover your head and hold on. Stay away from windows. Go to open space once the shaking stops.')]]
      });
    }
    $('eqPlay').onclick = () => { cancelSpeech(); eq.playing = !eq.playing; $('eqPlay').textContent = playLbl(eq.playing); };
    $('eqSlip').onclick = () => { cancelSpeech(); eqQuake(); };
    TABS.eq = {
      frame(dt) { eqStep(dt); drawEq(); drawSeis(); eqInfo(); setText('hud_eq', eq.shake > .3 ? T('💥 Đá trượt! Sóng rung lan ra, nhà cửa rung lắc', '💥 The rock slipped! Waves spread and buildings shake') : T(`⏳ Hai mảng đang mắc kẹt, lực dồn nén ${Math.round(eq.stress)}%`, `⏳ The plates are stuck: strain at ${Math.round(eq.stress)}%`)); },
      refresh() { $('eqPlay').textContent = playLbl(eq.playing); eq.infoKey = ''; eqInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_eq'), {
      vi: [
        { q: 'Động đất xảy ra khi nào?', a: ['Khi các mảng đá mắc kẹt rồi trượt mạnh', 'Khi trời có sấm sét', 'Khi gió thổi mạnh', 'Khi có nhiều xe chạy'], why: 'Lực dồn nén lâu ngày được giải phóng đột ngột khi đá trượt.' },
        { q: 'Các mảng kiến tạo di chuyển nhanh cỡ nào?', a: ['Vài xăng-ti-mét mỗi năm', 'Vài mét mỗi giây', 'Vài ki-lô-mét mỗi ngày', 'Không bao giờ di chuyển'], why: 'Rất chậm, chậm như móng tay mọc.' },
        { q: 'Khi có động đất trong lớp học, em nên làm gì?', a: ['Chui xuống gầm bàn, che đầu, bám chặt', 'Chạy ra cửa sổ', 'Đứng giữa phòng hét to', 'Đi thang máy xuống'], why: '"Cúi xuống, che đầu, bám chặt" giúp tránh đồ vật rơi trúng.' },
        { q: 'Máy đo địa chấn dùng để làm gì?', a: ['Ghi lại độ rung của mặt đất', 'Đo nhiệt độ', 'Đo lượng mưa', 'Đo gió'], why: 'Nó vẽ đường rung, rung càng mạnh đường càng cao.' },
        { q: 'Điểm sâu dưới đất nơi đá bắt đầu trượt gọi là gì?', a: ['Chấn tiêu', 'Miệng núi lửa', 'Cửa sông', 'Đỉnh núi'], why: 'Từ chấn tiêu, sóng địa chấn lan ra mọi hướng.' },
        { q: 'Vùng nào ở Việt Nam đôi khi có động đất?', a: ['Tây Bắc (Điện Biên, Sơn La)', 'Đồng bằng sông Cửu Long', 'Không nơi nào', 'Ngoài Bắc Cực'], why: 'Tây Bắc có nhiều đứt gãy nên đôi khi có động đất.' }
      ],
      en: [
        { q: 'When does an earthquake happen?', a: ['When stuck rock plates suddenly slip', 'During thunder', 'In strong wind', 'When lots of cars drive by'], why: 'Built-up strain is released all at once when the rock slips.' },
        { q: 'How fast do tectonic plates move?', a: ['A few centimetres a year', 'A few metres a second', 'Kilometres a day', 'They never move'], why: 'Very slowly, about as fast as fingernails grow.' },
        { q: 'If an earthquake hits in class, you should…', a: ['Get under a desk, cover your head, hold on', 'Run to the window', 'Stand in the middle and shout', 'Take the lift'], why: '“Drop, cover, hold on” protects you from falling objects.' },
        { q: 'What does a seismograph do?', a: ['Records how the ground shakes', 'Measures temperature', 'Measures rain', 'Measures wind'], why: 'It draws the shaking: the stronger it shakes, the bigger the line.' },
        { q: 'What is the underground spot where the rock first slips?', a: ['The focus', 'The crater', 'The river mouth', 'The summit'], why: 'Waves spread out in every direction from the focus.' },
        { q: 'Which part of Vietnam sometimes has earthquakes?', a: ['The north-west (Dien Bien, Son La)', 'The Mekong Delta', 'Nowhere', 'The North Pole'], why: 'The north-west has many faults, so it sometimes shakes.' }
      ]
    }));

    /* =====================================================================
       3. ĐỒNG BẰNG PHÙ SA
       ===================================================================== */
    let dl = { years: 0, playing: !reduceMotion, flood: false, dyke: false, parts: [], fert: 0, infoKey: '' };
    const dlC = mk('c_dl', (w) => clamp(w * .7, 320, 560));
    const RIVER = [[.08, 0], [.18, .14], [.12, .28], [.26, .38], [.42, .42], [.5, .52], [.52, .62]];
    const COAST = .62;
    function dlGeom() { const w = dlC.w || 640, h = dlC.h || 450; return { w, h, P: (x, y) => ({ x: x * w, y: y * h }), mouth: { x: .52 * w, y: COAST * h } }; }
    function deltaR(g) { return Math.sqrt(dl.years / 5000) * Math.min(g.w * .33, g.h * .3) * (dl.dyke ? 1.12 : 1); }
    function dlStep(dt) {
      if (dl.playing) { dl.years = Math.min(5000, dl.years + dt * 180); $('dlYears').value = String(dl.years); if (dl.years >= 5000) { dl.playing = false; $('dlPlay').textContent = playLbl(false); } }
      if (dl.flood && !dl.dyke) dl.fert = Math.min(1, dl.fert + dt * .15);
      const g = dlGeom();
      if (Math.random() < dt * (dl.flood ? 40 : 18)) dl.parts.push({ t: 0, off: rand(-1, 1), branch: Math.floor(rand(0, 3)), sp: rand(.12, .2) });
      for (const p of dl.parts) p.t += dt * p.sp * (dl.flood ? 1.6 : 1);
      dl.parts = dl.parts.filter((p) => p.t < 1.25);
      void g;
    }
    function riverPt(g, t) {
      const pts = RIVER.map(([x, y]) => g.P(x, y)); return along(pts, t);
    }
    function along(pts, t) {
      let total = 0; const seg = [];
      for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); seg.push(d); total += d; }
      let need = clamp(t, 0, 1) * total;
      for (let i = 0; i < seg.length; i++) { if (need <= seg[i] || i === seg.length - 1) { const k = seg[i] ? need / seg[i] : 0; return { x: lerp(pts[i].x, pts[i + 1].x, k), y: lerp(pts[i].y, pts[i + 1].y, k) }; } need -= seg[i]; }
      return pts[0];
    }
    function drawDl() {
      const g = dlGeom(), { w, h } = g, ctx = dlC.ctx;
      if (!dlC.w) return;
      const cy = COAST * h;
      // biển và đất liền
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#86c06c'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, 0); ctx.lineTo(w, cy - h * .04); for (let x = w; x >= 0; x -= 10) ctx.lineTo(x, cy + Math.sin(x * .03) * 4 - (x > w * .8 ? h * .04 * (x - w * .8) / (w * .2) : 0)); ctx.closePath(); ctx.fill();
      // đồi núi phía trên
      ctx.fillStyle = '#4d7c0f'; for (let k = 0; k < 6; k++) { const x = w * (.02 + k * .19); ctx.beginPath(); ctx.moveTo(x, h * .14); ctx.lineTo(x + w * .07, h * .02); ctx.lineTo(x + w * .14, h * .14); ctx.closePath(); ctx.fill(); }
      // ruộng ven sông
      for (let i = 0; i < 9; i++) { const p = riverPt(g, .3 + i * .07), sd = i % 2 ? 1 : -1; ctx.fillStyle = mix('#d9f99d', '#4ade80', dl.fert); rr(ctx, p.x + sd * w * .05 - w * .035, p.y - h * .025, w * .07, h * .05, 3); ctx.fill(); ctx.strokeStyle = 'rgba(101,163,13,.6)'; ctx.lineWidth = 1; ctx.stroke(); }
      // đồng bằng mới bồi
      const R = deltaR(g);
      if (R > 2) {
        ctx.fillStyle = '#d9c38a';
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) { const a = Math.PI * i / 40, rr2 = R * (.78 + .22 * Math.cos(a * 3 + .5)); const x = g.mouth.x + Math.cos(a) * rr2 * 1.3, y = cy - 2 + Math.sin(a) * rr2; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = 'rgba(134,192,108,.75)';
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) { const a = Math.PI * i / 40, rr2 = R * .7 * (.78 + .22 * Math.cos(a * 3 + .5)); const x = g.mouth.x + Math.cos(a) * rr2 * 1.3, y = cy - 2 + Math.sin(a) * rr2; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#166534'; for (let i = 0; i < 18; i++) { const a = Math.PI * (i + .5) / 18, rr2 = R * (.78 + .22 * Math.cos(a * 3 + .5)) * .96; ctx.beginPath(); ctx.arc(g.mouth.x + Math.cos(a) * rr2 * 1.3, cy + Math.sin(a) * rr2, 2.5, 0, TAU); ctx.fill(); }
      }
      // lũ tràn
      const pts = RIVER.map(([x, y]) => g.P(x, y));
      if (dl.flood && !dl.dyke) { ctx.strokeStyle = 'rgba(161,98,7,.35)'; ctx.lineWidth = w * .12 + Math.sin(clock * 2) * 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke(); }
      // sông chính + nhánh
      const riverCol = dl.flood ? '#a16207' : '#b7925a';
      ctx.strokeStyle = riverCol; ctx.lineWidth = w * .025; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke();
      const branches = [-.9, 0, .9].map((b) => [g.mouth, { x: g.mouth.x + b * R * .8, y: cy + R * .55 }, { x: g.mouth.x + b * R * 1.15, y: cy + R * .95 + 4 }]);
      if (R > 6) { ctx.lineWidth = w * .012; for (const br of branches) { ctx.beginPath(); br.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke(); } }
      if (dl.dyke) { ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3; for (const sd of [-1, 1]) { ctx.beginPath(); pts.forEach((p, i) => { const q = pts[Math.min(i + 1, pts.length - 1)], r = pts[Math.max(i - 1, 0)], ang = Math.atan2(q.y - r.y, q.x - r.x) + sd * Math.PI / 2, x = p.x + Math.cos(ang) * w * .03, y = p.y + Math.sin(ang) * w * .03; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.stroke(); } }
      // phù sa trôi
      ctx.fillStyle = '#7c4a1e';
      for (const p of dl.parts) {
        let q;
        if (p.t <= 1) { q = riverPt(g, p.t); q = { x: q.x + p.off * w * .006, y: q.y }; }
        else { const br = branches[p.branch], k = (p.t - 1) / .25; q = R > 6 ? along(br, k) : { x: g.mouth.x + p.off * 10, y: cy + k * 20 }; }
        ctx.globalAlpha = p.t > 1.15 ? (1.25 - p.t) * 10 : 1; ctx.beginPath(); ctx.arc(q.x, q.y, 2.2, 0, TAU); ctx.fill();
      }
      ctx.globalAlpha = 1;
      const fs = w < 420 ? 10 : 11.5;
      textLight(ctx, T('Đồi núi', 'Hills'), w * .9, h * .2, '#14532d', fs, 'center', 900);
      textLight(ctx, T('Biển', 'Sea'), w * .88, h * .92, '#0c4a6e', fs + 2, 'center', 900);
      if (R > 20) textLight(ctx, T('Đất mới bồi', 'New land'), g.mouth.x + R * 1.2, cy + R * .3, '#713f12', fs, 'left', 900);
      textLight(ctx, T('Ruộng lúa', 'Rice fields'), riverPt(g, .58).x - w * .12, riverPt(g, .58).y, '#14532d', fs, 'right', 900);
    }
    function dlInfo() {
      const key = [lang, dl.flood, dl.dyke].join('|');
      if (key === dl.infoKey) return; dl.infoKey = key;
      const notes = [];
      if (dl.flood && !dl.dyke) notes.push(['fun', T('🌾 Lũ tràn bờ mang phù sa phủ lên ruộng, làm đất thêm màu mỡ. Đây là cái lợi của mùa lũ ở đồng bằng sông Cửu Long.', '🌾 Floodwater spreads silt over the fields and makes them richer. That is the gift of the flood season in the Mekong Delta.')]);
      if (dl.dyke) notes.push(['tip', T('🧱 Đê ngăn lũ, bảo vệ nhà cửa. Nhưng phù sa không vào được ruộng trong đê mà theo sông ra biển. Đồng bằng sông Hồng có hệ thống đê rất lớn.', '🧱 Dykes hold back floods and protect homes, but the silt can’t reach fields inside them and flows out to sea. The Red River Delta has a huge dyke system.')]);
      notes.push(['fun', T('✨ Mũi Cà Mau mỗi năm lấn ra biển vài chục mét nhờ phù sa bồi đắp.', '✨ Ca Mau Cape grows tens of metres into the sea each year thanks to silt.')]);
      infoBox($('info_dl'), {
        emo: '🏞️', title: T('Đồng bằng phù sa', 'Delta land'),
        rows: [[T('Phù sa', 'Silt'), T('Đất, cát mịn mà nước sông cuốn theo từ vùng đồi núi.', 'Fine mud and sand that rivers wash down from the hills.')],
          [T('Bồi đắp', 'Building up'), T('Ra tới biển, nước chảy chậm lại, phù sa lắng xuống. Qua hàng nghìn năm, lớp nọ chồng lớp kia thành đồng bằng.', 'At the sea the water slows and the silt settles. Over thousands of years, layer upon layer builds a delta.')],
          [T('Việt Nam', 'Vietnam'), T('Hai đồng bằng lớn nhất là đồng bằng sông Hồng và đồng bằng sông Cửu Long, nơi trồng nhiều lúa gạo.', 'The two biggest are the Red River Delta and the Mekong Delta, where lots of rice is grown.')]],
        notes
      });
    }
    $('dlPlay').onclick = () => { cancelSpeech(); if (!dl.playing && dl.years >= 5000) dl.years = 0; dl.playing = !dl.playing; $('dlPlay').textContent = playLbl(dl.playing); };
    $('dlYears').addEventListener('input', () => { cancelSpeech(); dl.playing = false; $('dlPlay').textContent = playLbl(false); dl.years = +$('dlYears').value; });
    $('dlFlood').onclick = () => { dl.flood = !dl.flood; $('dlFlood').setAttribute('aria-pressed', String(dl.flood)); dlInfo(); };
    $('dlDyke').onclick = () => { dl.dyke = !dl.dyke; $('dlDyke').setAttribute('aria-pressed', String(dl.dyke)); if (dl.dyke) dl.fert = Math.max(0, dl.fert - .3); dlInfo(); };
    TABS.dl = {
      frame(dt) {
        dlStep(dt); drawDl(); dlInfo();
        const y = Math.round(dl.years / 50) * 50;
        setText('dlYearsTxt', T(`${y.toLocaleString('vi-VN')} năm`, `${y.toLocaleString('en-US')} years`));
        setText('hud_dl', `⏳ ${T(`Sau ${y.toLocaleString('vi-VN')} năm`, `After ${y.toLocaleString('en-US')} years`)} – ${dl.flood ? (dl.dyke ? T('lũ bị đê chặn, phù sa ra biển', 'dykes hold the flood; silt goes to sea') : T('lũ tràn, phù sa phủ lên ruộng', 'floods spread silt on the fields')) : T('sông chở phù sa ra biển', 'the river carries silt to the sea')}`);
      },
      refresh() { $('dlPlay').textContent = playLbl(dl.playing); dl.infoKey = ''; dlInfo(); }
    };
    QUIZZES.push(makeQuiz($('quiz_dl'), {
      vi: [
        { q: 'Phù sa là gì?', a: ['Đất, cát mịn do nước sông cuốn theo', 'Nước mưa', 'Đá núi lửa', 'Muối biển'], why: 'Nước sông chảy từ đồi núi cuốn theo đất cát mịn gọi là phù sa.' },
        { q: 'Đồng bằng được tạo thành chủ yếu nhờ đâu?', a: ['Phù sa sông bồi đắp qua rất lâu', 'Con người đổ đất', 'Núi lửa phun', 'Gió thổi cát'], why: 'Phù sa lắng đọng ở cửa sông qua hàng nghìn năm tạo nên đồng bằng.' },
        { q: 'Vì sao phù sa lắng xuống ở cửa sông?', a: ['Vì ra tới biển nước chảy chậm lại', 'Vì nước biển nóng', 'Vì cá ăn phù sa', 'Vì trời tối'], why: 'Nước chậm lại thì không cuốn được đất cát nữa nên chúng lắng xuống.' },
        { q: 'Hai đồng bằng lớn nhất Việt Nam là gì?', a: ['Đồng bằng sông Hồng và sông Cửu Long', 'Đồng bằng Tây Nguyên', 'Đồng bằng Hạ Long', 'Đồng bằng Sa Pa'], why: 'Đây là hai vựa lúa lớn của cả nước.' },
        { q: 'Mùa lũ mang lại điều gì tốt cho ruộng đồng?', a: ['Phù sa làm đất màu mỡ', 'Làm đất khô cằn', 'Mang tuyết tới', 'Không có gì tốt'], why: 'Nước lũ tràn bờ phủ phù sa lên ruộng.' },
        { q: 'Đắp đê dọc sông có tác dụng gì?', a: ['Ngăn lũ tràn vào làng, ruộng', 'Làm sông chảy ngược', 'Tạo ra núi lửa', 'Làm biển cạn'], why: 'Đê bảo vệ nhà cửa nhưng cũng làm phù sa không vào được ruộng trong đê.' }
      ],
      en: [
        { q: 'What is silt?', a: ['Fine mud and sand carried by rivers', 'Rainwater', 'Volcanic rock', 'Sea salt'], why: 'Rivers flowing from the hills carry fine mud and sand called silt.' },
        { q: 'What mainly builds a delta?', a: ['River silt piling up over ages', 'People dumping soil', 'Volcanoes', 'Wind-blown sand'], why: 'Silt settling at the river mouth for thousands of years builds a delta.' },
        { q: 'Why does silt settle at a river mouth?', a: ['The water slows down at the sea', 'The sea is hot', 'Fish eat it', 'It gets dark'], why: 'Slow water can’t carry the mud anymore, so it drops.' },
        { q: 'What are Vietnam’s two biggest deltas?', a: ['The Red River and Mekong deltas', 'The Central Highlands delta', 'The Ha Long delta', 'The Sa Pa delta'], why: 'They are the country’s two great rice bowls.' },
        { q: 'What good thing does the flood season bring?', a: ['Silt that makes fields rich', 'Dry, cracked soil', 'Snow', 'Nothing good'], why: 'Floodwater spreads silt over the fields.' },
        { q: 'What do river dykes do?', a: ['Keep floods out of villages and fields', 'Make rivers flow backwards', 'Create volcanoes', 'Dry the sea'], why: 'Dykes protect homes, but also keep silt out of the fields inside them.' }
      ]
    }));

    /* ---------- tabs & vòng lặp ---------- */
    let tab = 'vol';
    root.querySelectorAll('.change-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.change-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('c-' + x.dataset.p).classList.toggle('hidden', x !== b); });
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
      root.querySelectorAll('.change-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.change-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.change-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
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
