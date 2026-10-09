/* Epsilon Edu - Tool: Co the em (Our body)
 * Tich hop vao Class 1 Home Tools theo co che lazy-load (cung khung voi he-mat-troi.js, mat-trang.js).
 * Gom 3 phan: He tieu hoa, He ho hap, Tim va mach mau.
 * Dang ky: window.CLASS1_TOOL_MODULES.humanBody = { render(context), destroy() }
 */
(() => {
  "use strict";

  const TOOL_ID = "humanBody";
  let activeCleanup = null;

  const CSS = `
.body-tool{width:100%;color:#334155;font:inherit;box-sizing:border-box}
.body-tool *{box-sizing:border-box}.body-tool button,.body-tool input{font:inherit}.body-tool button{cursor:pointer}.body-tool .hidden{display:none!important}
.body-tool button:focus-visible,.body-tool canvas:focus-visible,.body-tool input:focus-visible{outline:2px solid #8b5cf6;outline-offset:2px}
.body-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.body-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.body-kicker{margin:0;color:#1877f2;font-size:14px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.body-tool .eyebrow{margin:0;color:#7c3aed;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.02em}
.body-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}
.body-lead{margin:0;color:#64748b;font-size:15px;line-height:1.5;font-weight:700}
.body-lang{margin-left:auto;align-self:flex-start;display:inline-flex;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08);flex:none}
.body-lang button{border:0;border-radius:10px;min-height:38px;padding:0 13px;background:transparent;color:#475569;font-weight:900;font-size:14px;white-space:nowrap;transition:.15s}
.body-lang button[aria-pressed="true"]{color:#fff;background:linear-gradient(90deg,#3b82f6,#10b981);box-shadow:0 3px 9px rgba(16,185,129,.16)}
.body-audio-notice{margin:0 0 12px;padding:9px 12px;border:1px solid #bfdbfe;border-radius:13px;background:#eff6ff;color:#1e40af;font-size:14px;font-weight:800}
.body-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.body-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:15px;font-weight:900;transition:.16s ease}.body-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.body-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.body-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.body-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.body-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.body-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.body-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.body-panel{width:100%}.body-grid{display:grid;gap:12px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}
.body-side{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}
.body-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}
.body-tool .card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.body-tool .card-head.compact{margin-bottom:9px}
.body-tool .card-head h2{margin:2px 0 0;color:#475569;font-size:18px;line-height:1.25;font-weight:900}
.body-tool .head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.body-tool .btn,.body-tool .soft-btn,.body-tool .segmented button,.body-tool .preset-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:14px;transition:.15s ease}
.body-tool .btn:hover,.body-tool .soft-btn:hover,.body-tool .segmented button:hover,.body-tool .preset-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}
.body-tool .btn{padding:0 12px}.body-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.body-tool .segmented{display:flex;gap:7px;margin:0}.body-tool .segmented button{padding:0 13px}
.body-tool .segmented button[aria-pressed="true"],.body-tool .soft-btn[aria-pressed="true"],.body-tool .preset-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.body-tool .canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}
.body-tool .canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}
.body-tool .hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:13.5px;line-height:1.45;font-weight:800}
.body-tool .control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin-top:8px}
.body-tool .range-control{display:grid;gap:6px;color:#475569;font-size:13.5px;font-weight:900}.body-tool .range-control input{width:100%;accent-color:#8b5cf6}.body-tool .range-control b{color:#7c3aed;font-size:13px}
.body-tool .toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.body-tool .soft-btn{padding:0 12px}
.body-tool .preset-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.body-tool .preset-row button{padding:0 10px;background:#f8fafc;border-color:#e2e8f0;color:#475569}
.body-tool .preset-row.phases button{min-width:44px;padding:0 8px;font-size:20px;line-height:1}
.body-tool .info-box{margin-top:10px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}
.body-tool .info-title{display:flex;align-items:center;gap:10px}.body-tool .info-title .emo{font-size:30px;line-height:1;flex:none}
.body-tool .info-title h3{margin:0;color:#6d28d9;font-size:19px;line-height:1.25;font-weight:900}
.body-tool .info-title .sub{margin:2px 0 0;color:#64748b;font-size:14px;font-weight:800}
.body-tool .info-title .btn{margin-left:auto;flex:none;min-height:36px;padding:0 11px}
.body-tool .facts{display:grid;gap:6px;margin-top:10px}.body-tool .facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}
.body-tool .facts b{color:#7c3aed;font-size:13.5px}.body-tool .facts span{color:#475569;font-size:14.5px;line-height:1.45;font-weight:700}
.body-tool .fun,.body-tool .warn,.body-tool .tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:14px;line-height:1.5;font-weight:750}
.body-tool .fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.body-tool .warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.body-tool .tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}
.body-tool .state-big{margin:0;font-size:21px;line-height:1.2;font-weight:900;color:#0369a1}.body-tool .state-big.up{color:#0f766e}.body-tool .state-big.down{color:#b45309}
.body-tool .meter{position:relative;height:12px;margin-top:8px;border-radius:99px;background:#eef2ff;overflow:hidden}.body-tool .meter i{position:absolute;left:0;top:0;bottom:0;border-radius:99px;background:linear-gradient(90deg,#fde68a,#f59e0b)}
.body-tool .quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:18px;font-weight:900}
.body-tool .qtext{margin:0 0 9px;color:#334155;font-size:16px;line-height:1.45;font-weight:900}
.body-tool .qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.body-tool .qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;text-align:left;font-size:14px;font-weight:900;line-height:1.35}
.body-tool .qopt.opt-1{background:#fdf2f8;border-color:#f9c7de;color:#9d174d}.body-tool .qopt.opt-2{background:#eff6ff;border-color:#bfdbfe;color:#1d4ed8}.body-tool .qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}.body-tool .qopt.opt-4{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
.body-tool .qopt:hover{filter:brightness(.985)}.body-tool .qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d!important}.body-tool .qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c!important}
.body-tool .qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.body-tool .qfb,.body-tool .score{font-size:13px;font-weight:900}.body-tool .qfb.ok{color:#15803d}.body-tool .qfb.no{color:#be123c}.body-tool .score{color:#7c3aed}
.body-tool .muted{color:#64748b;font-size:13.5px;line-height:1.5;font-weight:700}
@media(max-width:960px){.body-grid{grid-template-columns:1fr;align-items:start}.body-side{grid-template-rows:auto auto;height:auto}.body-tool .control-grid{grid-template-columns:1fr}.body-tool .toggle-row{justify-content:flex-start}}
@media(max-width:640px){.body-hero{flex-wrap:wrap;padding:12px}.body-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.body-tabs{grid-template-columns:1fr}.body-tabs .tab{min-height:40px}.body-card{padding:11px;border-radius:18px}.body-tool .card-head{align-items:flex-start;flex-direction:column}.body-tool .head-actions{width:100%;justify-content:space-between}.body-tool .head-actions .segmented{flex:1;min-width:0}.body-tool .head-actions .segmented button{flex:1;padding:0 8px}.body-tool .qopts{grid-template-columns:1fr}.body-tool .facts>div{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.body-tool *{transition:none!important}}

.body-tool .stage-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:6px}
.body-tool .stage-row button{display:flex;align-items:center;gap:6px;min-height:40px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;color:#475569;font-size:13.5px;font-weight:900;text-align:left;line-height:1.2;transition:.15s ease}
.body-tool .stage-row button b{display:grid;place-items:center;flex:0 0 22px;width:22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:12px}
.body-tool .stage-row button[aria-pressed="true"]{color:#fff;border-color:#0ea5e9;background:linear-gradient(90deg,#38bdf8,#6366f1);box-shadow:0 4px 12px rgba(14,165,233,.22)}
.body-tool .stage-row button[aria-pressed="true"] b{background:#fff;color:#0284c7}
.body-tool .slider-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:8px}
.body-tool .checklist{display:grid;gap:6px;margin-top:10px}
.body-tool .checklist div{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:11px;background:#f8fafc;font-size:14px;font-weight:800;color:#475569}
.body-tool .checklist .ok{color:#15803d}.body-tool .checklist .no{color:#be123c}.body-tool .checklist .wait{color:#94a3b8}
.body-tool .process{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff;font-size:13px;font-weight:900;color:#475569;text-align:center}
.body-tool .process span{flex:1}.body-tool .process i{font-style:normal;color:#94a3b8;font-size:11.5px;line-height:1.25}
.body-tool .process .on{color:#0284c7}.body-tool .process i.on{color:#ec4899}
@media(max-width:640px){.body-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}.body-tool .slider-pair{grid-template-columns:1fr}}

.body-tool .stage-row{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
.body-tool .cond-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}
.body-tool .cond-row>span{color:#475569;font-size:13.5px;font-weight:900}
@media(max-width:640px){.body-tool .stage-row{grid-template-columns:repeat(2,minmax(0,1fr))}}

.body-tool .pulse-box{display:grid;gap:10px}
.body-tool .pulse-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.body-tool .pulse-row div{display:grid;place-items:center;padding:10px;border-radius:14px;background:#fdf2f8;border:1px solid #fbcfe8}
.body-tool .pulse-row b{font-size:34px;line-height:1;color:#be185d;font-weight:900}
.body-tool .pulse-row span{font-size:13px;color:#64748b;font-weight:800}
.body-tool .pulse-btns{display:grid;grid-template-columns:auto 1fr;gap:8px}
.body-tool .pulse-btns .main{min-height:54px;font-size:18px}
.body-tool .pulse-btns .main:disabled{opacity:.45;cursor:not-allowed;transform:none}
.body-tool .act-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}
`;

  const HTML = `
<section class="body-tool" data-body-tool>
  <div class="body-hero">
    <div class="body-hero-icon" aria-hidden="true">🧒</div>
    <div>
      <p class="body-kicker" data-t="kicker"></p>
      <h1 data-t="title"></h1>
      <p class="body-lead" data-t="lead"></p>
    </div>
    <div class="body-lang" role="group" aria-label="Ngôn ngữ / Language">
      <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
      <button type="button" data-lang="en" aria-pressed="false">English</button>
    </div>
  </div>
  <div id="bAudioNotice" class="body-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="body-tabs" role="tablist" data-ta="tabsLabel">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="dg" data-t="tabDg"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="br" data-t="tabBr"></button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="ht" data-t="tabHt"></button>
  </div>
  <section id="b-dg" class="body-panel" role="tabpanel">
    <div class="body-grid">
      <article class="body-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="dgH"></h2></div>
          <div class="head-actions"><button id="dgPlay" class="btn main" type="button"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="cDg" role="img" data-ta="dgCanvas"></canvas></div>
        <p id="dgHud" class="hud" aria-live="polite"></p>
        <label class="range-control"><span data-t="dgPosL"></span><input id="dgPos" type="range" min="0" max="5" value="0" step="0.01"><b id="dgPosTxt"></b></label>
        <div id="dgStages" class="stage-row" role="group" data-ta="stagesLabel"></div>
      </article>
      <div class="body-side">
        <aside class="body-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeNow"></span><h2 data-t="dgSideH"></h2></div></div>
          <div id="dgInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qDg" class="body-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="b-br" class="body-panel hidden" role="tabpanel">
    <div class="body-grid">
      <article class="body-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="brH"></h2></div>
          <div class="head-actions"><button id="brDust" class="soft-btn" type="button" aria-pressed="false" data-t="dust"></button></div>
        </div>
        <div class="canvas-wrap"><canvas id="cBr" role="img" data-ta="brCanvas"></canvas></div>
        <p id="brHud" class="hud" aria-live="polite"></p>
        <div id="brAct" class="act-row segmented" role="group" data-ta="actLabel">
          <button type="button" data-act="sleep" aria-pressed="false" data-t="aSleep"></button>
          <button type="button" data-act="sit" aria-pressed="true" data-t="aSit"></button>
          <button type="button" data-act="walk" aria-pressed="false" data-t="aWalk"></button>
          <button type="button" data-act="run" aria-pressed="false" data-t="aRun"></button>
        </div>
      </article>
      <div class="body-side">
        <aside class="body-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeZoom"></span><h2 data-t="alvH"></h2></div></div>
          <div class="canvas-wrap"><canvas id="cAlv" role="img" data-ta="alvCanvas"></canvas></div>
          <div id="brInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qBr" class="body-card quiz-card"></article>
      </div>
    </div>
  </section>
  <section id="b-ht" class="body-panel hidden" role="tabpanel">
    <div class="body-grid">
      <article class="body-card">
        <div class="card-head">
          <div><span class="eyebrow" data-t="eyeSim"></span><h2 data-t="htH"></h2></div>
          <div class="head-actions"></div>
        </div>
        <div class="canvas-wrap"><canvas id="cHt" role="img" data-ta="htCanvas"></canvas></div>
        <p id="htHud" class="hud" aria-live="polite"></p>
        <div id="htAct" class="act-row segmented" role="group" data-ta="actLabel">
          <button type="button" data-act="sleep" aria-pressed="false" data-t="aSleep"></button>
          <button type="button" data-act="sit" aria-pressed="true" data-t="aSit"></button>
          <button type="button" data-act="walk" aria-pressed="false" data-t="aWalk"></button>
          <button type="button" data-act="run" aria-pressed="false" data-t="aRun"></button>
        </div>
      </article>
      <div class="body-side">
        <aside class="body-card">
          <div class="card-head compact"><div><span class="eyebrow" data-t="eyeTry"></span><h2 data-t="pulseH"></h2></div></div>
          <div class="info-box pulse-box">
            <p class="muted" data-t="pulseHow"></p>
            <div class="pulse-row"><div><b id="pulseTime">15</b><span data-t="seconds"></span></div><div><b id="pulseCount">0</b><span data-t="beats"></span></div></div>
            <div class="pulse-btns"><button id="pulseStart" class="btn" type="button" data-t="pStart"></button><button id="pulseTap" class="btn main" type="button" disabled data-t="pTap"></button></div>
            <p id="pulseResult" class="fun hidden" aria-live="polite"></p>
            <p class="muted" data-t="pulseNote"></p>
          </div>
          <div id="htInfo" class="info-box" aria-live="polite"></div>
        </aside>
        <article id="qHt" class="body-card quiz-card"></article>
      </div>
    </div>
  </section>
</section>`;
  function render(context = {}) {
    if (activeCleanup) { try { activeCleanup(); } catch (_) {} activeCleanup = null; }
    const host = context.host;
    if (!(host instanceof Element)) return;
    host.innerHTML = `<style>${CSS}</style>${HTML}`;
    const root = host.querySelector("[data-body-tool]");
    if (!root) return;
    activeCleanup = initBodyTool(root, context);
  }

  function destroy() {
    if (!activeCleanup) return;
    try { activeCleanup(); } catch (_) {}
    activeCleanup = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[TOOL_ID] = Object.freeze({ render, destroy });

  function initBodyTool(root, context) {
    const TAU = Math.PI * 2;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const ease = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
    const rand = (a, b) => a + Math.random() * (b - a);
    const $ = (id) => root.querySelector(`#${id}`);
    const reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const cleanupFns = [];
    let destroyed = false;
    let rafId = 0;
    let lang = (context && context.lang === "en") ? "en" : "vi";
    const T = (vi, en) => (lang === "en" ? en : vi);
    const L = (o) => o[lang] || o.vi;

    const STR = {
      kicker: ['Epsilon Edu · Khoa học trực quan', 'Epsilon Edu · Visual Science'],
      title: ['Cơ thể em', 'Our Body'],
      lead: ['Theo chân miếng ăn đi qua bụng, xem phổi phồng lên khi hít thở và nghe tim bơm máu đi khắp cơ thể.',
             'Follow a bite of food through your tummy, watch your lungs fill as you breathe, and see your heart pump blood around your body.'],
      tabsLabel: ['Các hệ cơ quan', 'Body systems'],
      tabDg: ['🍚 Tiêu hóa', '🍚 Digestion'],
      tabBr: ['🌬️ Hô hấp', '🌬️ Breathing'],
      tabHt: ['❤️ Tim và máu', '❤️ Heart and blood'],
      eyeSim: ['Mô phỏng', 'Simulation'],
      dgH: ['Hành trình của miếng cơm', 'The journey of a bite of rice'],
      dgCanvas: ['Miếng ăn đi qua miệng, thực quản, dạ dày, ruột non và ruột già', 'Food travelling through the mouth, food pipe, stomach and intestines'],
      dgPosL: ['Kéo để đưa miếng ăn đi', 'Drag to move the food along'],
      stagesLabel: ['Các cơ quan tiêu hóa', 'Digestive organs'],
      eyeNow: ['Miếng ăn đang ở', 'The food is in'],
      dgSideH: ['Cơ quan tiêu hóa', 'Digestive organ'],
      brH: ['Hít vào, thở ra', 'Breathe in, breathe out'],
      brCanvas: ['Không khí đi qua mũi, khí quản vào phổi; phổi phồng lên và xẹp xuống', 'Air flows through the nose and windpipe into the lungs, which fill and empty'],
      dust: ['😷 Không khí có bụi', '😷 Dusty air'],
      actLabel: ['Bé đang làm gì?', 'What are you doing?'],
      aSleep: ['😴 Ngủ', '😴 Sleeping'],
      aSit: ['🧘 Ngồi yên', '🧘 Sitting'],
      aWalk: ['🚶 Đi bộ', '🚶 Walking'],
      aRun: ['🏃 Chạy', '🏃 Running'],
      eyeZoom: ['Phóng to', 'Zoom in'],
      alvH: ['Bên trong phổi: phế nang', 'Inside the lungs: air sacs'],
      alvCanvas: ['Ô-xi đi từ túi khí vào máu, khí các-bô-níc đi ra', 'Oxygen moves from air sacs into the blood; carbon dioxide moves out'],
      htH: ['Tim bơm máu đi khắp cơ thể', 'The heart pumps blood around the body'],
      htCanvas: ['Máu đi từ tim lên phổi, về tim rồi đi khắp cơ thể', 'Blood goes from the heart to the lungs, back to the heart, then around the body'],
      eyeTry: ['Thử ngay', 'Try it'],
      pulseH: ['Đếm nhịp tim của bé', 'Count your heartbeat'],
      pulseHow: ['Đặt 2 ngón tay lên cổ tay, phía dưới ngón cái, cho đến khi thấy mạch đập. Bấm "Bắt đầu", rồi mỗi lần thấy mạch đập thì bấm nút trái tim.',
                 'Put two fingers on your wrist below your thumb until you feel a beat. Press “Start”, then tap the heart button each time you feel a beat.'],
      seconds: ['giây', 'seconds'],
      beats: ['nhịp', 'beats'],
      pStart: ['▶ Bắt đầu', '▶ Start'],
      pTap: ['❤️ Thình thịch', '❤️ Beat'],
      pulseNote: ['Đây là trò chơi đếm để làm quen, không phải đo sức khỏe.', 'This is a counting game, not a medical test.']
    };
    function applyStatic() {
      const k = lang === 'en' ? 1 : 0;
      root.querySelectorAll('[data-t]').forEach((el) => { const s = STR[el.dataset.t]; if (s) el.textContent = s[k]; });
      root.querySelectorAll('[data-ta]').forEach((el) => { const s = STR[el.dataset.ta]; if (s) el.setAttribute('aria-label', s[k]); });
      root.setAttribute('lang', lang);
    }

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
      if (!c) throw new Error(`BODY_CANVAS_MISSING:${id}`);
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

    let dirty = true, clock = 0;
    function textLight(ctx, text, x, y, color = '#334155', size = 12, align = 'center', weight = 800) {
      ctx.font = `${weight} ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(text, x, y);
    }
    function bubble(ctx, text, x, y, size = 12, bg = '#fff', fg = '#be185d') {
      ctx.font = `900 ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      const tw = ctx.measureText(text).width + 16, th = size + 10;
      const cw = ctx.canvas.width / ((ctx.getTransform && ctx.getTransform().a) || 1); x = clamp(x, tw / 2 + 2, cw - tw / 2 - 2);
      ctx.fillStyle = bg; ctx.strokeStyle = 'rgba(236,72,153,.5)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x - tw / 2, y - th / 2, tw, th, th / 2); else ctx.rect(x - tw / 2, y - th / 2, tw, th);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y + .5);
    }
    function strokePath(ctx, pts, width, color) {
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.stroke();
    }
    // điểm trên đường gấp khúc theo tỉ lệ độ dài t (0..1)
    function along(pts, t) {
      let total = 0; const seg = [];
      for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); seg.push(d); total += d; }
      let need = clamp(t, 0, 1) * total;
      for (let i = 0; i < seg.length; i++) {
        if (need <= seg[i] || i === seg.length - 1) { const k = seg[i] ? need / seg[i] : 0; return { x: lerp(pts[i].x, pts[i + 1].x, k), y: lerp(pts[i].y, pts[i + 1].y, k), ang: Math.atan2(pts[i + 1].y - pts[i].y, pts[i + 1].x - pts[i].x) }; }
        need -= seg[i];
      }
      return { x: pts[0].x, y: pts[0].y, ang: 0 };
    }
    // hình người (nhìn thẳng), trả về hàm đổi toạ độ 0..1 sang pixel
    function bodyBox(w, h, scaleH = .96, top = null) {
      const bh = h * scaleH, bw = bh * .6, x0 = w / 2 - bw / 2, y0 = top == null ? (h - bh) / 2 : h * top;
      return { bw, bh, x0, y0, P: (x, y) => ({ x: x0 + x * bw, y: y0 + y * bh }) };
    }
    function drawBody(ctx, B, showHead = true) {
      const P = B.P;
      ctx.fillStyle = '#fde7d4'; ctx.strokeStyle = '#e8b796'; ctx.lineWidth = 2;
      // tay
      for (const sd of [-1, 1]) {
        ctx.beginPath(); const a = P(.5 + sd * .27, .2), b = P(.5 + sd * .36, .55), c = P(.5 + sd * .33, .72);
        ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(b.x + sd * B.bw * .04, b.y - B.bh * .1, b.x, b.y); ctx.lineTo(c.x, c.y);
        ctx.lineWidth = B.bw * .1; ctx.strokeStyle = '#f6d1b5'; ctx.lineCap = 'round'; ctx.stroke();
      }
      ctx.lineWidth = 2; ctx.strokeStyle = '#e8b796';
      // thân
      const tl = P(.22, .19), tr = P(.78, .19), br = P(.72, .92), bl = P(.28, .92);
      ctx.beginPath(); ctx.moveTo(tl.x + B.bw * .06, tl.y); ctx.lineTo(tr.x - B.bw * .06, tr.y); ctx.quadraticCurveTo(tr.x, tr.y, tr.x, tr.y + B.bh * .04);
      ctx.lineTo(br.x, br.y - B.bh * .03); ctx.quadraticCurveTo(br.x, br.y, br.x - B.bw * .05, br.y); ctx.lineTo(bl.x + B.bw * .05, bl.y); ctx.quadraticCurveTo(bl.x, bl.y, bl.x, bl.y - B.bh * .03);
      ctx.lineTo(tl.x, tl.y + B.bh * .04); ctx.quadraticCurveTo(tl.x, tl.y, tl.x + B.bw * .06, tl.y); ctx.closePath(); ctx.fill(); ctx.stroke();
      // cổ + đầu
      const n0 = P(.44, .14), n1 = P(.56, .2);
      ctx.fillRect(n0.x, n0.y, n1.x - n0.x, n1.y - n0.y);
      if (showHead) {
        const hc = P(.5, .085);
        ctx.beginPath(); ctx.arc(hc.x, hc.y, B.bw * .14, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#3f2a14'; ctx.beginPath(); ctx.arc(hc.x, hc.y - B.bw * .03, B.bw * .145, Math.PI * 1.02, Math.PI * 1.98); ctx.fill();
        ctx.fillStyle = '#1f2937'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(hc.x + sd * B.bw * .05, hc.y, B.bw * .015, 0, TAU); ctx.fill(); }
      }
    }

    /* =====================================================================
       1. HỆ TIÊU HÓA: miệng → thực quản → dạ dày → ruột non → ruột già
       ===================================================================== */
    const DG = [
      { emo: '👄', hours: 1 / 60,
        pts: [[.5, .108], [.5, .125]],
        vi: { name: 'Miệng', what: 'Răng cắn và nghiền nhỏ thức ăn. Lưỡi đảo đều. Nước bọt làm mềm thức ăn và bắt đầu tiêu hóa tinh bột.', time: 'Khoảng 1 phút nhai', fun: 'Nhai cơm thật lâu sẽ thấy hơi ngọt: nước bọt đã biến một ít tinh bột thành đường.', hud: 'Răng nghiền nhỏ, nước bọt làm mềm thức ăn' },
        en: { name: 'Mouth', what: 'Teeth bite and grind the food. The tongue mixes it. Saliva softens it and starts breaking down starch.', time: 'About 1 minute of chewing', fun: 'Chew rice for a long time and it tastes a little sweet: saliva has turned some starch into sugar.', hud: 'Teeth grind the food; saliva softens it' } },
      { emo: '⬇️', hours: 8 / 3600,
        pts: [[.5, .125], [.5, .2], [.51, .28], [.55, .335]],
        vi: { name: 'Thực quản', what: 'Ống dẫn thức ăn từ miệng xuống dạ dày. Thành ống co bóp từng đợt để đẩy thức ăn đi.', time: 'Khoảng 5 – 10 giây', fun: 'Nhờ thực quản co bóp, các nhà du hành vũ trụ vẫn nuốt được thức ăn khi đang lơ lửng ngoài không gian.', hud: 'Thực quản co bóp đẩy thức ăn xuống' },
        en: { name: 'Food pipe', what: 'A tube from the mouth to the stomach. Its walls squeeze in waves to push the food down.', time: 'About 5 – 10 seconds', fun: 'Because the food pipe squeezes, astronauts can still swallow while floating in space.', hud: 'The food pipe squeezes the food down' } },
      { emo: '🥣', hours: 3,
        pts: [[.55, .335], [.62, .34], [.66, .38], [.64, .43], [.58, .45], [.53, .44]],
        vi: { name: 'Dạ dày', what: 'Co bóp nhào trộn thức ăn với dịch vị chua, biến thức ăn thành hỗn hợp nhão như cháo.', time: 'Khoảng 2 – 4 giờ', fun: 'Thành dạ dày có lớp chất nhầy bảo vệ, nên dịch vị rất chua cũng không làm hại dạ dày.', hud: 'Dạ dày nhào trộn thức ăn với dịch vị' },
        en: { name: 'Stomach', what: 'Squeezes and mixes the food with sour stomach juice until it is a thick mush.', time: 'About 2 – 4 hours', fun: 'A layer of mucus protects the stomach wall, so the very sour juice does not hurt it.', hud: 'The stomach churns food with its juices' } },
      { emo: '🌀', hours: 8,
        pts: [[.53, .44], [.45, .5], [.6, .53], [.42, .57], [.6, .6], [.42, .64], [.6, .67], [.42, .71], [.36, .74]],
        vi: { name: 'Ruột non', what: 'Tiêu hóa tiếp nhờ dịch mật từ gan và các dịch tiêu hóa khác. Chất dinh dưỡng thấm qua thành ruột vào máu để nuôi cơ thể.', time: 'Khoảng 3 – 5 giờ', fun: 'Ruột non của người lớn dài khoảng 6 – 7 mét, gấp khoảng 4 lần chiều cao của bố mẹ!', hud: 'Chất dinh dưỡng thấm vào máu để nuôi cơ thể' },
        en: { name: 'Small intestine', what: 'Keeps digesting with bile from the liver and other juices. Nutrients pass through its wall into the blood to feed the body.', time: 'About 3 – 5 hours', fun: 'An adult’s small intestine is about 6 – 7 metres long, about 4 times as tall as a grown-up!', hud: 'Nutrients pass into the blood to feed the body' } },
      { emo: '🚽', hours: 32,
        pts: [[.36, .74], [.33, .6], [.33, .48], [.67, .48], [.68, .62], [.67, .74], [.58, .79], [.52, .82], [.5, .86]],
        vi: { name: 'Ruột già', what: 'Hút lại nước từ phần còn thừa. Phần bã còn lại thành phân và được thải ra ngoài.', time: 'Khoảng 1 – 2 ngày', fun: 'Ăn nhiều rau xanh và uống đủ nước giúp ruột già làm việc tốt, đi vệ sinh dễ dàng hơn.', hud: 'Ruột già hút lại nước, phần bã được thải ra ngoài' },
        en: { name: 'Large intestine', what: 'Soaks back water from what is left. The rest becomes poo and leaves the body.', time: 'About 1 – 2 days', fun: 'Eating vegetables and drinking enough water helps the large intestine and makes going to the toilet easier.', hud: 'Water is soaked back; the waste leaves the body' } }
    ];
    const DG_H = [0, ...DG.map((s) => s.hours)];
    const dgC = makeCanvas('cDg', (w) => clamp(w * .78, 340, 620));
    let dgU = 0, dgPlaying = !reduceMotion, dgParts = [], dgInfoKey = '', dgHud = '';
    const dgStage = () => Math.min(4, Math.floor(dgU));
    function dgHoursText(u) {
      const s = Math.min(4, Math.floor(u)), t = u - s, hrs = lerp(DG_H[s], DG_H[s + 1], s === 4 && u >= 5 ? 1 : t);
      const sec = Math.round(hrs * 3600);
      if (sec < 60) return T(`${sec} giây`, `${sec} s`);
      if (hrs < 1) return T(`${Math.round(hrs * 60)} phút`, `${Math.round(hrs * 60)} min`);
      if (hrs < 24) { const H = Math.floor(hrs), M = Math.round((hrs - H) * 6) * 10; return T(`${H} giờ${M ? ' ' + M + ' phút' : ''}`, `${H} h${M ? ' ' + M + ' min' : ''}`); }
      const D = Math.floor(hrs / 24), H = Math.round(hrs - D * 24);
      return T(`${D} ngày${H ? ' ' + H + ' giờ' : ''}`, `${D} day${H ? ' ' + H + ' h' : ''}`);
    }
    function drawDg() {
      const { w, h, ctx } = dgC;
      if (!w) return;
      ctx.fillStyle = '#fffaf5'; ctx.fillRect(0, 0, w, h);
      const B = bodyBox(w, h), P = B.P, s = dgStage(), t = dgU - s;
      drawBody(ctx, B);
      const pts = DG.map((st) => st.pts.map(([x, y]) => P(x, y)));
      const bw = B.bw, glow = (i, width) => { if (i === s) strokePath(ctx, pts[i], width + bw * .05, 'rgba(236,72,153,.28)'); };
      // gan
      const lv = P(.4, .37); ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.ellipse(lv.x, lv.y, bw * .14, bw * .075, -.2, 0, TAU); ctx.fill();
      // ruột già, ruột non, dạ dày, thực quản
      glow(4, bw * .075); strokePath(ctx, pts[4], bw * .075, '#c2410c'); strokePath(ctx, pts[4], bw * .06, '#fcd5b5');
      glow(3, bw * .045); strokePath(ctx, pts[3], bw * .045, '#db2777'); strokePath(ctx, pts[3], bw * .032, '#fbcfe8');
      const pulse = s === 2 && !reduceMotion ? 1 + Math.sin(clock * 5) * .07 : 1;
      glow(2, bw * .12); strokePath(ctx, pts[2], bw * .12 * pulse, '#db2777'); strokePath(ctx, pts[2], bw * .1 * pulse, '#f9a8d4');
      glow(1, bw * .035); strokePath(ctx, pts[1], bw * .035, '#e11d48'); strokePath(ctx, pts[1], bw * .022, '#fda4af');
      if (s === 0) { const m = P(.5, .112); ctx.fillStyle = '#e11d48'; ctx.beginPath(); ctx.ellipse(m.x, m.y, bw * .05, bw * (.02 + (reduceMotion ? 0 : Math.abs(Math.sin(clock * 8)) * .015)), 0, 0, TAU); ctx.fill(); }
      // axit trong dạ dày
      if (s === 2) for (let k = 0; k < 6; k++) { const p = along(pts[2], ((clock * .15 + k / 6) % 1)); ctx.strokeStyle = 'rgba(234,179,8,.8)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x + Math.sin(k * 3) * bw * .02, p.y + Math.cos(k * 2) * bw * .02, 2.5, 0, TAU); ctx.stroke(); }
      // miếng ăn
      const done = dgU >= 5;
      const p = done ? P(.5, .9) : along(pts[s], s === 0 ? t : t);
      const color = ['#fefce8', '#fde68a', '#facc15', '#eab308', '#92400e'][s];
      const r = bw * [.045 * (1 - .45 * t), .022, .032, .022 * (1 - .4 * t), .024][s];
      if (!done) {
        if (s === 1) { ctx.strokeStyle = '#be123c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(p.x, p.y, r * 1.6, r * .7, p.ang + Math.PI / 2, 0, TAU); ctx.stroke(); }
        ctx.fillStyle = color; ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1;
        if (s === 0) {
          const n = 1 + Math.floor(t * 5);
          for (let k = 0; k < n; k++) { const a = k * 2.4, rr = n === 1 ? 0 : r * .7; ctx.beginPath(); ctx.arc(p.x + Math.cos(a) * rr, p.y + Math.sin(a) * rr * .5, r / Math.sqrt(n) * 1.1, 0, TAU); ctx.fill(); ctx.stroke(); }
        } else if (s === 2) {
          ctx.beginPath(); for (let k = 0; k <= 12; k++) { const a = k / 12 * TAU, rr = r * (1 + Math.sin(a * 3 + clock * 4) * .18); const x = p.x + Math.cos(a) * rr, y = p.y + Math.sin(a) * rr; if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.closePath(); ctx.fill(); ctx.stroke();
        } else { ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fill(); ctx.stroke(); }
      }
      // chất dinh dưỡng (ruột non) và nước (ruột già) đi ra
      if (dgPlaying || dirty) {
        if (s === 3 && Math.random() < .4) dgParts.push({ x: p.x, y: p.y, vx: rand(-1, 1) * bw * .25, vy: rand(-1, 1) * bw * .25, life: 1, kind: 'food', c: ['#ef4444', '#22c55e', '#f59e0b', '#a855f7'][Math.floor(Math.random() * 4)] });
        if (s === 4 && !done && Math.random() < .35) dgParts.push({ x: p.x, y: p.y, vx: rand(-1, 1) * bw * .2, vy: rand(-1, 1) * bw * .2, life: 1, kind: 'water', c: '#38bdf8' });
      }
      ctx.save();
      for (const q of dgParts) { ctx.globalAlpha = clamp(q.life, 0, 1); ctx.fillStyle = q.c; ctx.beginPath(); ctx.arc(q.x, q.y, q.kind === 'water' ? 2.6 : 2.2, 0, TAU); ctx.fill(); }
      ctx.restore();
      if (s === 0 && !done) bubble(ctx, T('Nhai kỹ nhé!', 'Chew well!'), P(.5, .02).x + bw * .32, P(.5, .05).y, 12);
      if (s === 3) bubble(ctx, T('Chất dinh dưỡng vào máu', 'Nutrients into the blood'), P(.5, .5).x, P(.5, .97).y - 4, 11.5, '#fff', '#15803d');
      if (s === 4 && !done) bubble(ctx, T('Hút lại nước', 'Soaking back water'), P(.5, .5).x, P(.5, .97).y - 4, 11.5, '#fff', '#0369a1');
      if (done) bubble(ctx, T('Phần bã được thải ra ngoài', 'Waste leaves the body'), P(.5, .5).x, P(.5, .97).y - 4, 11.5);
      // nhãn các cơ quan
      const lab = (txt, ax, ay, side, on) => {
        const a = P(ax, ay), tx = side < 0 ? B.x0 - 8 : B.x0 + B.bw + 8;
        ctx.strokeStyle = on ? '#ec4899' : '#cbd5e1'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(tx + (side < 0 ? 4 : -4), a.y); ctx.stroke();
        const fs = w < 420 ? 10.5 : 12;
        ctx.font = `900 ${fs}px system-ui, sans-serif`;
        const tw = ctx.measureText(txt).width, maxW = side < 0 ? tx - 4 : w - tx - 4;
        textLight(ctx, tw > maxW ? txt.split(' ')[0] + '…' : txt, tx, a.y, on ? '#be185d' : '#475569', fs, side < 0 ? 'right' : 'left', 900);
      };
      lab(L(DG[0]).name, .5, .112, -1, s === 0);
      lab(L(DG[1]).name, .5, .2, -1, s === 1);
      lab(T('Gan', 'Liver'), .33, .37, -1, false);
      lab(L(DG[2]).name, .64, .4, 1, s === 2);
      lab(L(DG[3]).name, .42, .62, -1, s === 3);
      lab(L(DG[4]).name, .67, .6, 1, s === 4);
    }
    function dgStep(dt) {
      if (dgPlaying) {
        dgU += dt / 6;
        if (dgU >= 5.6) dgU = 0;
        $('dgPos').value = String(Math.min(5, dgU)); dgUpdate();
      }
      for (const q of dgParts) { q.x += q.vx * dt; q.y += q.vy * dt; q.life -= dt * .8; }
      dgParts = dgParts.filter((q) => q.life > 0);
    }
    function dgUpdate() {
      const s = dgStage(), S = L(DG[s]);
      root.querySelectorAll('#dgStages button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === s)));
      if (s + lang !== dgInfoKey) {
        dgInfoKey = s + lang;
        $('dgInfo').innerHTML = `
          <div class="info-title"><span class="emo" aria-hidden="true">${DG[s].emo}</span>
            <div><h3></h3><p class="sub">${T('Chặng', 'Stop')} ${s + 1} / 5</p></div>
            <button id="dgListen" class="btn" type="button">🔊 ${T('Nghe', 'Listen')}</button></div>
          <div class="facts">
            <div><b>${T('Làm gì?', 'What happens?')}</b><span id="dgWhat"></span></div>
            <div><b>${T('Bao lâu?', 'How long?')}</b><span id="dgTime"></span></div>
          </div>
          <p class="fun" id="dgFun"></p>`;
        $('dgInfo').querySelector('h3').textContent = S.name;
        $('dgWhat').textContent = S.what; $('dgTime').textContent = S.time; $('dgFun').textContent = '✨ ' + S.fun;
        $('dgListen').onclick = () => { const S2 = L(DG[dgStage()]); speak(`${S2.name}. ${S2.what} ${T('Thời gian', 'Time')}: ${S2.time}. ${S2.fun}`); };
      }
      const tt = dgHoursText(Math.min(5, dgU));
      $('dgPosTxt').textContent = `${T('Đã qua khoảng', 'Time so far: about')} ${tt}`;
      const hud = `${DG[s].emo} ${S.name} – ${dgU >= 5 ? T('Xong hành trình!', 'Journey complete!') : S.hud}`;
      if (hud !== dgHud) { dgHud = hud; $('dgHud').textContent = hud; }
    }
    function setDgPlaying(on) { dgPlaying = on; $('dgPlay').textContent = playText(on); }
    $('dgPlay').onclick = () => { cancelSpeech(); if (!dgPlaying && dgU >= 5) dgU = 0; setDgPlaying(!dgPlaying); };
    $('dgPos').addEventListener('input', () => { cancelSpeech(); setDgPlaying(false); dgU = +$('dgPos').value; dgUpdate(); dirty = true; });
    function dgBuildStages() {
      $('dgStages').innerHTML = DG.map((st, i) => `<button type="button" data-s="${i}" aria-pressed="false"><b>${i + 1}</b><span></span></button>`).join('');
      root.querySelectorAll('#dgStages button').forEach((b, i) => { b.querySelector('span').textContent = L(DG[i]).name; });
    }
    $('dgStages').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-s]'); if (!b) return;
      cancelSpeech(); setDgPlaying(false); dgU = +b.dataset.s + .35; $('dgPos').value = String(dgU); dgUpdate(); dirty = true;
    });

    const qDg = makeQuiz($('qDg'), {
      vi: [
        { q: 'Thức ăn bắt đầu được tiêu hóa ở đâu?', a: ['Miệng', 'Dạ dày', 'Ruột non', 'Ruột già'], why: 'Ngay từ miệng, răng nghiền nhỏ và nước bọt bắt đầu tiêu hóa tinh bột.' },
        { q: 'Ống dẫn thức ăn từ miệng xuống dạ dày gọi là gì?', a: ['Thực quản', 'Khí quản', 'Ruột non', 'Mạch máu'], why: 'Thực quản dẫn thức ăn. Khí quản thì dẫn không khí vào phổi.' },
        { q: 'Chất dinh dưỡng được hấp thụ vào máu chủ yếu ở đâu?', a: ['Ruột non', 'Thực quản', 'Miệng', 'Dạ dày'], why: 'Ruột non rất dài, thành ruột có rất nhiều nếp nhỏ để hút chất dinh dưỡng vào máu.' },
        { q: 'Ruột già hút lại thứ gì?', a: ['Nước', 'Ô-xi', 'Răng', 'Dịch mật'], why: 'Ruột già hút lại nước, phần bã còn lại thành phân.' },
        { q: 'Vì sao nên nhai kỹ khi ăn?', a: ['Thức ăn nhỏ và mềm, dạ dày đỡ vất vả', 'Để răng mỏi', 'Để ăn được nhiều hơn', 'Không có tác dụng gì'], why: 'Nhai kỹ giúp thức ăn nhỏ, trộn đều nước bọt, các cơ quan sau tiêu hóa dễ hơn.' },
        { q: 'Ruột non của người lớn dài khoảng bao nhiêu?', a: ['Khoảng 6 – 7 mét', 'Khoảng 10 xăng-ti-mét', 'Khoảng 1 mét', 'Khoảng 100 mét'], why: 'Ruột non cuộn gọn trong bụng nhưng dài khoảng 6 – 7 mét.' }
      ],
      en: [
        { q: 'Where does digestion begin?', a: ['The mouth', 'The stomach', 'The small intestine', 'The large intestine'], why: 'Right in the mouth, teeth grind food and saliva starts breaking down starch.' },
        { q: 'What is the tube from the mouth to the stomach?', a: ['The food pipe (oesophagus)', 'The windpipe', 'The small intestine', 'A blood vessel'], why: 'The food pipe carries food. The windpipe carries air to the lungs.' },
        { q: 'Where are most nutrients taken into the blood?', a: ['The small intestine', 'The food pipe', 'The mouth', 'The stomach'], why: 'The small intestine is very long and its wall has tiny folds that absorb nutrients.' },
        { q: 'What does the large intestine soak back?', a: ['Water', 'Oxygen', 'Teeth', 'Bile'], why: 'It soaks back water; what is left becomes poo.' },
        { q: 'Why should you chew well?', a: ['Small, soft food is easier to digest', 'To tire your teeth', 'To eat more', 'No reason'], why: 'Chewing well makes food small and mixed with saliva, so it is easier to digest.' },
        { q: 'How long is an adult’s small intestine?', a: ['About 6 – 7 metres', 'About 10 centimetres', 'About 1 metre', 'About 100 metres'], why: 'It is coiled up in the tummy but is about 6 – 7 metres long.' }
      ]
    });

    /* =====================================================================
       2. HỆ HÔ HẤP: hít vào lấy ô-xi, thở ra khí các-bô-níc
       Nhịp thở trẻ em (khoảng): ngủ 16, ngồi yên 20, đi bộ 28, chạy 40 lần/phút.
       ===================================================================== */
    const ACTS = {
      sleep: { br: 16, ht: 75, vi: 'đang ngủ', en: 'sleeping' },
      sit: { br: 20, ht: 85, vi: 'ngồi yên', en: 'sitting still' },
      walk: { br: 28, ht: 110, vi: 'đi bộ', en: 'walking' },
      run: { br: 40, ht: 150, vi: 'chạy', en: 'running' }
    };
    let brAct = 'sit', brDust = false, brPhase = 0, brParts = [], brTrapped = [], brCount = 0, brLastIn = false, brInfoKey = '', brHud = '';
    const brC = makeCanvas('cBr', (w) => clamp(w * .8, 320, 600));
    const alvC = makeCanvas('cAlv', (w) => clamp(w * .55, 170, 240));
    const breath = () => { const ph = brPhase; return ph < .42 ? { inhale: true, b: ease(ph / .42) } : { inhale: false, b: 1 - ease((ph - .42) / .58) }; };
    function lungShape(ctx, cx, cy, wl, hl, side) {
      // side = -1: phổi bên trái màn hình; +1: bên phải. Mép trong lõm vào nhường chỗ cho tim.
      ctx.beginPath();
      ctx.moveTo(cx + side * wl * .1, cy - hl * .5);
      ctx.bezierCurveTo(cx + side * wl * .7, cy - hl * .45, cx + side * wl * .62, cy + hl * .4, cx + side * wl * .5, cy + hl * .5);
      ctx.lineTo(cx - side * wl * .45, cy + hl * .5);
      ctx.bezierCurveTo(cx - side * wl * .5, cy + hl * .2, cx - side * wl * .2, cy + hl * .05, cx - side * wl * .32, cy - hl * .1);
      ctx.bezierCurveTo(cx - side * wl * .4, cy - hl * .3, cx - side * wl * .2, cy - hl * .52, cx + side * wl * .1, cy - hl * .5);
      ctx.closePath();
    }
    function brPaths(B, side, tgt) {
      const P = B.P;
      return [P(.5, .1), P(.5, .16), P(.5, .3), P(.5 + side * .06, .36), P(.5 + side * tgt.x, tgt.y)];
    }
    function brStep(dt) {
      const A = ACTS[brAct], period = 60 / A.br;
      brPhase = (brPhase + dt / period) % 1;
      const { inhale } = breath();
      if (inhale && !brLastIn) brCount++;
      brLastIn = inhale;
      const spawn = (kind) => {
        const side = Math.random() < .5 ? -1 : 1;
        const tgt = { x: rand(.08, .17), y: rand(.33, .52) };
        brParts.push({ kind, side, tgt, t: kind === 'co2' ? 1 : 0, dir: kind === 'co2' ? -1 : 1, trapAt: kind === 'dust' && Math.random() < .85 ? rand(.05, .14) : 2, speed: 1 / (period * (kind === 'co2' ? .5 : .38)) });
      };
      if (inhale) { if (Math.random() < dt * 22) spawn('o2'); if (brDust && Math.random() < dt * 9) spawn('dust'); }
      else if (Math.random() < dt * 18) spawn('co2');
      for (const p of brParts) {
        p.t += p.dir * p.speed * dt;
        if (p.kind === 'dust' && p.t >= p.trapAt) { p.done = true; if (brTrapped.length < 40) brTrapped.push({ x: rand(-.02, .02), y: rand(.105, .13) }); }
        if (p.t > 1.05 || p.t < -.15) p.done = true;
      }
      brParts = brParts.filter((p) => !p.done);
      if (!brDust && brTrapped.length) brTrapped = [];
    }
    function drawBr() {
      const { w, h, ctx } = brC;
      if (!w) return;
      ctx.fillStyle = '#f5fbff'; ctx.fillRect(0, 0, w, h);
      if (brDust) { ctx.fillStyle = 'rgba(146,64,14,.05)'; ctx.fillRect(0, 0, w, h); }
      const B = bodyBox(w, h, 1.22, .03), P = B.P, { inhale, b } = breath();
      ctx.save();
      drawBody(ctx, B);
      // xương sườn
      ctx.strokeStyle = 'rgba(203,213,225,.9)'; ctx.lineWidth = 3;
      for (let k = 0; k < 6; k++) { const y = .27 + k * .05, spread = 1 + b * .04; for (const sd of [-1, 1]) { const a = P(.5, y), c = P(.5 + sd * .27 * spread, y + .03); ctx.beginPath(); ctx.moveTo(a.x + sd * B.bw * .04, a.y); ctx.quadraticCurveTo(c.x, a.y - B.bh * .01, c.x, c.y); ctx.stroke(); } }
      // phổi
      for (const sd of [-1, 1]) {
        const c = P(.5 + sd * .13, .43), wl = B.bw * .26 * (1 + b * .07), hl = B.bh * .26 * (1 + b * .1);
        ctx.save(); ctx.translate(0, -(hl - B.bh * .26) * .5);
        lungShape(ctx, c.x, c.y, wl, hl, sd);
        const lg = ctx.createRadialGradient(c.x, c.y - hl * .2, 4, c.x, c.y, hl * .6);
        lg.addColorStop(0, '#fecdd3'); lg.addColorStop(1, '#fb7185');
        ctx.fillStyle = lg; ctx.fill(); ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.restore();
      }
      // khí quản, phế quản
      const tr = [P(.5, .135), P(.5, .3)];
      strokePath(ctx, tr, B.bw * .045, '#94a3b8'); strokePath(ctx, tr, B.bw * .028, '#e2e8f0');
      for (const sd of [-1, 1]) { const br = [P(.5, .3), P(.5 + sd * .06, .36), P(.5 + sd * .12, .42)]; strokePath(ctx, br, B.bw * .032, '#94a3b8'); strokePath(ctx, br, B.bw * .018, '#e2e8f0'); }
      // cơ hoành
      const dy = .58 + b * .035, dome = .055 * (1 - .55 * b);
      const d0 = P(.25, dy), d1 = P(.75, dy), dc = P(.5, dy - dome * 2);
      ctx.strokeStyle = '#be185d'; ctx.lineWidth = B.bw * .025; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(d0.x, d0.y); ctx.quadraticCurveTo(dc.x, dc.y, d1.x, d1.y); ctx.stroke();
      // hạt khí
      for (const p of brParts) {
        const pts = brPaths(B, p.side, p.tgt), q = along(pts, clamp(p.t, 0, 1));
        ctx.fillStyle = p.kind === 'o2' ? '#0ea5e9' : p.kind === 'co2' ? '#64748b' : '#92400e';
        ctx.beginPath(); ctx.arc(q.x, q.y, p.kind === 'dust' ? 2.4 : 3, 0, TAU); ctx.fill();
      }
      ctx.fillStyle = '#92400e';
      for (const d of brTrapped) { const q = P(.5 + d.x, d.y); ctx.beginPath(); ctx.arc(q.x, q.y, 1.8, 0, TAU); ctx.fill(); }
      // nhãn
      const fs = w < 420 ? 10.5 : 12;
      const lab = (txt, ax, ay, side, col = '#475569') => {
        const a = P(ax, ay), tx = side < 0 ? B.x0 - 6 : B.x0 + B.bw + 6;
        ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(tx, a.y); ctx.stroke();
        textLight(ctx, txt, tx + (side < 0 ? -3 : 3), a.y, col, fs, side < 0 ? 'right' : 'left', 900);
      };
      lab(T('Mũi', 'Nose'), .5, .095, -1);
      lab(T('Khí quản', 'Windpipe'), .5, .22, 1);
      lab(T('Phổi', 'Lungs'), .3, .42, -1, '#e11d48');
      lab(T('Cơ hoành', 'Diaphragm'), .7, dy - .01, 1, '#be185d');
      if (brDust && brTrapped.length > 3) lab(T('Lông mũi giữ bụi', 'Nose hairs trap dust'), .5, .12, 1, '#92400e');
      ctx.restore();
      // chữ hướng dẫn thở
      const big = inhale ? T('Hít vào… 🌬️', 'Breathe in… 🌬️') : T('Thở ra… 💨', 'Breathe out… 💨');
      textLight(ctx, big, 14, 22, inhale ? '#0284c7' : '#64748b', w < 420 ? 16 : 20, 'left', 900);
      textLight(ctx, T('Bé thử thở theo nhé!', 'Try breathing along!'), 14, 46, '#94a3b8', 12, 'left', 800);
      ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(w - 120, 20, 4, 0, TAU); ctx.fill(); textLight(ctx, T('Ô-xi', 'Oxygen'), w - 110, 20, '#0369a1', 11.5, 'left', 900);
      ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.arc(w - 120, 40, 4, 0, TAU); ctx.fill(); textLight(ctx, T('Các-bô-níc', 'Carbon dioxide'), w - 110, 40, '#475569', 11.5, 'left', 900);
    }
    // phóng to phế nang
    let alvCells = Array.from({ length: 9 }, (_, i) => ({ t: i / 9 })), alvDots = [];
    function drawAlv(dt) {
      const { w, h, ctx } = alvC;
      if (!w) return;
      ctx.fillStyle = '#fff7f8'; ctx.fillRect(0, 0, w, h);
      const { b } = breath(), cx = w * .5, cy = h * .45, R = Math.min(w, h) * .2 * (1 + b * .08);
      const capY = (x) => cy + R * 1.35 + Math.sin(x / w * Math.PI * 2) * h * .02;
      // mao mạch
      const cg = ctx.createLinearGradient(0, 0, w, 0); cg.addColorStop(0, '#7c3aed'); cg.addColorStop(.5, '#be123c'); cg.addColorStop(1, '#ef4444');
      ctx.strokeStyle = cg; ctx.lineWidth = h * .12; ctx.lineCap = 'round';
      ctx.beginPath(); for (let x = 8; x <= w - 8; x += 6) { const y = capY(x); if (x === 8) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke();
      // túi khí
      for (const [dx, dy, s] of [[-.85, .1, .7], [.85, .1, .7], [0, -.15, 1], [-.45, -.75, .6], [.45, -.75, .6]]) {
        ctx.fillStyle = 'rgba(254,205,211,.95)'; ctx.strokeStyle = '#fb7185'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx + dx * R, cy + dy * R, R * s, 0, TAU); ctx.fill(); ctx.stroke();
      }
      // hồng cầu chạy trong mao mạch
      const speed = ACTS[brAct].ht / 85 * .12;
      for (const c of alvCells) {
        c.t = (c.t + dt * speed) % 1;
        const x = 8 + c.t * (w - 16), y = capY(x);
        ctx.fillStyle = mix('#7c3aed', '#ef4444', ease((c.t - .3) / .4));
        ctx.beginPath(); ctx.ellipse(x, y, h * .045, h * .028, 0, 0, TAU); ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(x, y, h * .02, h * .01, 0, 0, TAU); ctx.fill();
      }
      if (Math.random() < dt * 6) alvDots.push({ kind: 'o2', x: cx + rand(-R, R), y: cy, t: 0 });
      if (Math.random() < dt * 5) alvDots.push({ kind: 'co2', x: cx + rand(-R, R), y: capY(cx), t: 0 });
      for (const d of alvDots) d.t += dt * .8;
      alvDots = alvDots.filter((d) => d.t < 1);
      for (const d of alvDots) {
        const y = d.kind === 'o2' ? lerp(cy, capY(d.x), d.t) : lerp(capY(d.x), cy - R * .2, d.t);
        ctx.fillStyle = d.kind === 'o2' ? '#0ea5e9' : '#64748b'; ctx.beginPath(); ctx.arc(d.x, y, 3, 0, TAU); ctx.fill();
      }
      const fs = w < 300 ? 10.5 : 11.5;
      textLight(ctx, T('Túi khí (phế nang)', 'Air sacs'), cx, Math.max(12, cy - R * 1.8), '#be123c', fs, 'center', 900);
      textLight(ctx, T('↓ Ô-xi vào máu', '↓ Oxygen into blood'), 8, h - 10, '#0369a1', fs, 'left', 900);
      textLight(ctx, T('Các-bô-níc ra ↑', 'CO₂ out ↑'), w - 8, h - 10, '#475569', fs, 'right', 900);
    }
    function brUpdate() {
      const A = ACTS[brAct];
      root.querySelectorAll('#brAct [data-act]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.act === brAct)));
      const key = brAct + lang + brDust;
      if (key !== brInfoKey) {
        brInfoKey = key;
        $('brInfo').innerHTML = `
          <div class="info-title"><span class="emo" aria-hidden="true">🌬️</span>
            <div><h3>${T('Thở như thế nào?', 'How do we breathe?')}</h3><p class="sub">${T(`Khi ${A.vi}: khoảng ${A.br} lần mỗi phút`, `When ${A.en}: about ${A.br} breaths a minute`)}</p></div>
            <button id="brListen" class="btn" type="button">🔊 ${T('Nghe', 'Listen')}</button></div>
          <div class="facts">
            <div><b>${T('Hít vào', 'Breathe in')}</b><span>${T('Cơ hoành co lại và hạ xuống, phổi phồng to. Không khí đi qua mũi, khí quản vào phổi.', 'The diaphragm tightens and moves down; the lungs fill. Air goes through the nose and windpipe into the lungs.')}</span></div>
            <div><b>${T('Thở ra', 'Breathe out')}</b><span>${T('Cơ hoành thả lỏng, đi lên, đẩy khí các-bô-níc ra ngoài.', 'The diaphragm relaxes and moves up, pushing carbon dioxide out.')}</span></div>
            <div><b>${T('Ở phổi', 'In the lungs')}</b><span>${T('Ô-xi đi qua các túi khí tí hon vào máu, máu mang ô-xi đi nuôi cơ thể.', 'Oxygen passes through tiny air sacs into the blood, which carries it around the body.')}</span></div>
          </div>
          ${brDust ? `<p class="tip">${T('😷 Lông mũi và chất nhầy trong mũi giữ bụi lại. Vì vậy nên thở bằng mũi, và đeo khẩu trang khi trời nhiều khói bụi.', '😷 Nose hairs and mucus trap dust. That is why we breathe through our nose and wear a mask on smoky, dusty days.')}</p>` : ''}
          <p class="fun">${T('✨ Khi chạy, cơ thể cần nhiều ô-xi hơn nên bé thở nhanh và sâu hơn.', '✨ When you run, your body needs more oxygen, so you breathe faster and deeper.')}</p>`;
        $('brListen').onclick = () => speak([...$('brInfo').querySelectorAll('h3, .sub, .facts b, .facts span, .tip, .fun')].map((n) => n.textContent.replace(/[✨😷]/gu, '')).join('. '));
      }
      const hud = `🌬️ ${T(`Đã thở ${brCount} lần`, `Breaths so far: ${brCount}`)} – ${T(`khoảng ${A.br} lần/phút khi ${A.vi}`, `about ${A.br}/min when ${A.en}`)}`;
      if (hud !== brHud) { brHud = hud; $('brHud').textContent = hud; }
    }
    root.querySelectorAll('#brAct [data-act]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); brAct = b.dataset.act; brUpdate(); }));
    $('brDust').onclick = () => { brDust = !brDust; $('brDust').setAttribute('aria-pressed', String(brDust)); brUpdate(); };

    const qBr = makeQuiz($('qBr'), {
      vi: [
        { q: 'Khi hít vào, cơ thể lấy khí gì?', a: ['Khí ô-xi', 'Khí các-bô-níc', 'Khói', 'Hơi nước'], why: 'Cơ thể cần ô-xi để sống và hoạt động. Ô-xi có trong không khí.' },
        { q: 'Khi thở ra, cơ thể thải ra khí gì?', a: ['Khí các-bô-níc', 'Khí ô-xi', 'Khí ga', 'Không khí sạch'], why: 'Các-bô-níc là khí thải của cơ thể, được đẩy ra ngoài khi thở ra.' },
        { q: 'Vì sao nên thở bằng mũi?', a: ['Lông mũi và chất nhầy cản bụi, làm ấm không khí', 'Mũi to hơn miệng', 'Thở bằng miệng bị cấm', 'Mũi tạo ra ô-xi'], why: 'Mũi lọc bụi và làm ấm, làm ẩm không khí trước khi vào phổi.' },
        { q: 'Khi chạy nhanh, nhịp thở thế nào?', a: ['Nhanh hơn', 'Chậm hơn', 'Ngừng lại', 'Không đổi'], why: 'Cơ bắp làm việc nhiều cần nhiều ô-xi, nên ta thở nhanh và sâu hơn.' },
        { q: 'Ô-xi đi từ phổi vào máu ở đâu?', a: ['Ở các túi khí tí hon (phế nang)', 'Ở dạ dày', 'Ở mũi', 'Ở tim'], why: 'Phổi có hàng triệu túi khí tí hon, quấn quanh là các mạch máu nhỏ.' },
        { q: 'Việc nào tốt cho phổi?', a: ['Tránh khói thuốc lá, đeo khẩu trang khi nhiều bụi', 'Ngửi khói xe', 'Ngồi trong phòng kín đầy khói', 'Đốt rác cạnh nhà'], why: 'Khói và bụi làm hại phổi. Không khí sạch giúp phổi khỏe.' }
      ],
      en: [
        { q: 'What gas do we take in when we breathe in?', a: ['Oxygen', 'Carbon dioxide', 'Smoke', 'Water vapour'], why: 'Our body needs oxygen to live and move. Oxygen is in the air.' },
        { q: 'What gas do we breathe out?', a: ['Carbon dioxide', 'Oxygen', 'Cooking gas', 'Clean air'], why: 'Carbon dioxide is the body’s waste gas, pushed out as we breathe out.' },
        { q: 'Why breathe through your nose?', a: ['Nose hairs and mucus trap dust and warm the air', 'The nose is bigger', 'Mouth breathing is banned', 'The nose makes oxygen'], why: 'The nose filters, warms and moistens air before it reaches the lungs.' },
        { q: 'When you run fast, your breathing…', a: ['Gets faster', 'Gets slower', 'Stops', 'Stays the same'], why: 'Working muscles need more oxygen, so you breathe faster and deeper.' },
        { q: 'Where does oxygen pass into the blood?', a: ['Tiny air sacs in the lungs', 'The stomach', 'The nose', 'The heart'], why: 'The lungs have millions of tiny air sacs wrapped in small blood vessels.' },
        { q: 'Which is good for your lungs?', a: ['Avoid cigarette smoke; wear a mask in dust', 'Sniff car exhaust', 'Sit in a smoky closed room', 'Burn rubbish by the house'], why: 'Smoke and dust harm the lungs. Clean air keeps them healthy.' }
      ]
    });

    /* =====================================================================
       3. TIM VÀ MẠCH MÁU
       Tim → phổi (nhận ô-xi) → tim → cơ thể (đưa ô-xi) → tim.
       Nhịp tim trẻ em (khoảng): ngủ 75, ngồi yên 85, đi bộ 110, chạy 150.
       ===================================================================== */
    const LOOP = [[.45, .47], [.3, .42], [.3, .2], [.42, .15], [.58, .15], [.7, .2], [.7, .42], [.55, .47], [.55, .55], [.72, .6], [.76, .8], [.62, .84], [.38, .84], [.24, .8], [.28, .6], [.45, .55], [.45, .47]];
    const RED = '#ef4444', BLUE = '#3b82f6';
    let htAct = 'sit', htPhase = 0, htInfoKey = '', htHud = '', htBeats = 0;
    const htC = makeCanvas('cHt', (w) => clamp(w * .8, 320, 600));
    const htCells = Array.from({ length: 44 }, (_, i) => ({ s: i / 44 }));
    function loopGeom() {
      const w = htC.w || 600, h = htC.h || 430, S = Math.min(w, h * 1.25);
      const ox = (w - S) / 2, pts = LOOP.map(([x, y]) => ({ x: ox + x * S, y: y * h }));
      const lens = []; let total = 0;
      for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); lens.push(d); total += d; }
      return { w, h, S, ox, pts, lens, total, X: (x) => ox + x * S };
    }
    function segColor(i, t) { if (i < 3) return BLUE; if (i === 3) return mix(BLUE, RED, ease(t)); if (i < 11) return RED; if (i === 11) return mix(RED, BLUE, ease(t)); return BLUE; }
    function locate(g, s) {
      let need = (((s % 1) + 1) % 1) * g.total;
      for (let i = 0; i < g.lens.length; i++) {
        if (need <= g.lens[i]) { const k = need / g.lens[i]; return { i, k, x: lerp(g.pts[i].x, g.pts[i + 1].x, k), y: lerp(g.pts[i].y, g.pts[i + 1].y, k) }; }
        need -= g.lens[i];
      }
      return { i: 0, k: 0, x: g.pts[0].x, y: g.pts[0].y };
    }
    const beatPulse = () => (htPhase < .18 ? Math.sin(Math.PI * htPhase / .18) : 0);
    function htStep(dt) {
      const bpm = ACTS[htAct].ht;
      const before = htPhase;
      htPhase = (htPhase + dt * bpm / 60) % 1;
      if (htPhase < before) htBeats++;
      const sp = bpm / 85 / 12 * (.55 + 1.3 * beatPulse());
      for (const c of htCells) c.s = (c.s + dt * sp) % 1;
    }
    function heartPath(ctx, x, y, s) {
      ctx.beginPath();
      ctx.moveTo(x, y + s * .9);
      ctx.bezierCurveTo(x - s * 1.25, y + s * .1, x - s * .95, y - s * .85, x, y - s * .35);
      ctx.bezierCurveTo(x + s * .95, y - s * .85, x + s * 1.25, y + s * .1, x, y + s * .9);
      ctx.closePath();
    }
    function drawHt() {
      const g = loopGeom(), { w, h } = g, ctx = htC.ctx;
      if (!htC.w) return;
      ctx.fillStyle = '#fff8f8'; ctx.fillRect(0, 0, w, h);
      // phổi
      for (const sd of [-1, 1]) { ctx.fillStyle = '#fecdd3'; ctx.strokeStyle = '#fb7185'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(g.X(.5 + sd * .09), h * .155, g.S * .085, h * .085, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
      textLight(ctx, T('Phổi: máu nhận ô-xi', 'Lungs: blood picks up oxygen'), g.X(.5), h * .035, '#be123c', w < 420 ? 10.5 : 12, 'center', 900);
      // cơ thể
      ctx.fillStyle = '#fde7d4'; ctx.strokeStyle = '#e8b796'; ctx.lineWidth = 1.5;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(g.X(.31), h * .78, g.S * .38, h * .2, 14); else ctx.rect(g.X(.31), h * .78, g.S * .38, h * .2); ctx.fill(); ctx.stroke();
      textLight(ctx, T('Cơ thể: não, cơ bắp…', 'Body: brain, muscles…'), g.X(.5), h * .905, '#92400e', w < 420 ? 10.5 : 12, 'center', 900);
      textLight(ctx, T('nhận ô-xi, trả các-bô-níc', 'take oxygen, give CO₂'), g.X(.5), h * .945, '#a16207', w < 420 ? 10 : 11, 'center', 800);
      // mạch máu
      for (let i = 0; i < g.pts.length - 1; i++) {
        const a = g.pts[i], b = g.pts[i + 1];
        let col = segColor(i, .5);
        if (i === 3 || i === 11) { const gr = ctx.createLinearGradient(a.x, a.y, b.x, b.y); gr.addColorStop(0, i === 3 ? BLUE : RED); gr.addColorStop(1, i === 3 ? RED : BLUE); col = gr; }
        ctx.strokeStyle = col; ctx.lineWidth = Math.max(8, g.S * .028); ctx.lineCap = 'round';
        ctx.globalAlpha = .35; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.globalAlpha = 1;
      }
      // hồng cầu
      for (const c of htCells) {
        const p = locate(g, c.s);
        ctx.fillStyle = segColor(p.i, p.k);
        ctx.beginPath(); ctx.ellipse(p.x, p.y, Math.max(3.5, g.S * .011), Math.max(2.5, g.S * .008), 0, 0, TAU); ctx.fill();
      }
      // mũi tên chỉ chiều
      for (const [i, k] of [[1, .5], [5, .5], [9, .5], [13, .5]]) {
        const a = g.pts[i], b = g.pts[i + 1], m = { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) }, ang = Math.atan2(b.y - a.y, b.x - a.x);
        arrow(ctx, m.x - Math.cos(ang) * 8, m.y - Math.sin(ang) * 8, m.x + Math.cos(ang) * 8, m.y + Math.sin(ang) * 8, '#334155', 2, 8);
      }
      // tim
      const pulse = reduceMotion ? 0 : beatPulse(), hs = Math.min(g.S * .085, h * .1) * (1 + pulse * .12);
      const hx = g.X(.5), hy = h * .5;
      ctx.save(); heartPath(ctx, hx, hy, hs); ctx.clip();
      ctx.fillStyle = '#93c5fd'; ctx.fillRect(hx - hs * 1.4, hy - hs, hs * 1.4, hs * 2);
      ctx.fillStyle = '#fca5a5'; ctx.fillRect(hx, hy - hs, hs * 1.4, hs * 2);
      ctx.restore();
      heartPath(ctx, hx, hy, hs); ctx.strokeStyle = '#be123c'; ctx.lineWidth = 3; ctx.stroke();
      ctx.strokeStyle = 'rgba(190,18,60,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx, hy - hs * .3); ctx.lineTo(hx, hy + hs * .8); ctx.stroke();
      textLight(ctx, T('Tim', 'Heart'), hx, hy + hs * .2, '#7f1d1d', 13, 'center', 900);
      if (pulse > .4) bubble(ctx, T('thình thịch!', 'thump-thump!'), hx + hs * 2.2, hy - hs * .9, 11.5);
      // chú giải màu
      const lx = 10, ly = h * .5 - 14, fs = w < 420 ? 10.5 : 11.5;
      ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(lx + 5, ly, 5, 0, TAU); ctx.fill();
      textLight(ctx, T('Máu nhiều ô-xi', 'Oxygen-rich blood'), lx + 14, ly, '#991b1b', fs, 'left', 900);
      ctx.fillStyle = BLUE; ctx.beginPath(); ctx.arc(lx + 5, ly + 20, 5, 0, TAU); ctx.fill();
      textLight(ctx, T('Máu ít ô-xi', 'Oxygen-poor blood'), lx + 14, ly + 20, '#1e40af', fs, 'left', 900);
      textLight(ctx, T('(thật ra màu đỏ sẫm)', '(really dark red)'), lx + 14, ly + 36, '#64748b', fs - 1, 'left', 700);
    }
    function htUpdate() {
      const A = ACTS[htAct];
      root.querySelectorAll('#htAct [data-act]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.act === htAct)));
      const key = htAct + lang;
      if (key !== htInfoKey) {
        htInfoKey = key;
        $('htInfo').innerHTML = `
          <div class="info-title"><span class="emo" aria-hidden="true">❤️</span>
            <div><h3>${T('Trái tim chăm chỉ', 'A hard-working heart')}</h3><p class="sub">${T(`Khi ${A.vi}: khoảng ${A.ht} nhịp mỗi phút`, `When ${A.en}: about ${A.ht} beats a minute`)}</p></div>
            <button id="htListen" class="btn" type="button">🔊 ${T('Nghe', 'Listen')}</button></div>
          <div class="facts">
            <div><b>${T('Tim làm gì?', 'What it does')}</b><span>${T('Tim là một cái bơm bằng cơ, co bóp để đẩy máu đi khắp cơ thể suốt ngày đêm.', 'The heart is a muscle pump that squeezes blood around the body day and night.')}</span></div>
            <div><b>${T('Đường đi', 'The route')}</b><span>${T('Tim đẩy máu lên phổi nhận ô-xi, máu quay về tim rồi được đẩy đi khắp cơ thể, sau đó lại về tim.', 'The heart sends blood to the lungs for oxygen, back to the heart, then around the body and back again.')}</span></div>
            <div><b>${T('To cỡ nào?', 'How big?')}</b><span>${T('Tim của mỗi người to khoảng bằng nắm tay của chính người đó.', 'Your heart is about the size of your own fist.')}</span></div>
          </div>
          <p class="fun">${T('✨ Mạch máu ở cổ tay trông xanh xanh là do ánh sáng đi qua da. Máu thật luôn có màu đỏ.', '✨ Veins at your wrist look bluish because of how light passes through skin. Blood is always red.')}</p>`;
        $('htListen').onclick = () => speak([...$('htInfo').querySelectorAll('h3, .sub, .facts b, .facts span, .fun')].map((n) => n.textContent.replace(/[✨]/gu, '')).join('. '));
      }
      const hud = `❤️ ${T(`Tim đập khoảng ${A.ht} nhịp/phút khi ${A.vi}`, `About ${A.ht} beats/min when ${A.en}`)}`;
      if (hud !== htHud) { htHud = hud; $('htHud').textContent = hud; }
    }
    root.querySelectorAll('#htAct [data-act]').forEach((b) => b.addEventListener('click', () => { cancelSpeech(); htAct = b.dataset.act; htUpdate(); }));

    /* ---------- trò chơi đếm mạch 15 giây ---------- */
    let pulseEnd = 0, pulseCount = 0, pulseShown = -1;
    function pulseTick() {
      if (!pulseEnd) return;
      const left = Math.max(0, Math.ceil((pulseEnd - performance.now()) / 1000));
      if (left !== pulseShown) { pulseShown = left; $('pulseTime').textContent = String(left); }
      if (left <= 0) pulseFinish();
    }
    function pulseFinish() {
      pulseEnd = 0; $('pulseTap').disabled = true; $('pulseStart').disabled = false;
      const bpm = pulseCount * 4, r = $('pulseResult');
      let msg;
      if (!pulseCount) msg = T('Bé chưa bấm nhịp nào. Thử lại nhé!', 'You didn’t tap any beats. Try again!');
      else if (bpm < 50) msg = T(`Được ${bpm} nhịp mỗi phút. Hơi ít, có thể bé chưa bắt được mạch. Thử lại nhé!`, `${bpm} beats a minute. That’s low; maybe you missed some beats. Try again!`);
      else if (bpm <= 120) msg = T(`Tim bé đập khoảng ${bpm} nhịp mỗi phút (${pulseCount} × 4). Trẻ em ngồi yên thường khoảng 70 – 110 nhịp mỗi phút.`, `Your heart beats about ${bpm} times a minute (${pulseCount} × 4). Children sitting still usually have about 70 – 110.`);
      else msg = T(`Khoảng ${bpm} nhịp mỗi phút: nhanh hơn lúc ngồi yên, có thể bé vừa chạy nhảy. Ngồi nghỉ một lúc rồi đếm lại xem nhé!`, `About ${bpm} beats a minute: faster than resting, maybe you just ran around. Rest a bit and count again!`);
      r.textContent = '🎉 ' + msg; r.classList.remove('hidden');
    }
    $('pulseStart').onclick = () => {
      cancelSpeech(); pulseCount = 0; $('pulseCount').textContent = '0'; $('pulseResult').classList.add('hidden');
      pulseEnd = performance.now() + 15000; pulseShown = -1; $('pulseTap').disabled = false; $('pulseStart').disabled = true; pulseTick();
    };
    $('pulseTap').onclick = () => { if (!pulseEnd) return; pulseCount++; $('pulseCount').textContent = String(pulseCount); };

    const qHt = makeQuiz($('qHt'), {
      vi: [
        { q: 'Tim có nhiệm vụ gì?', a: ['Bơm máu đi khắp cơ thể', 'Tiêu hóa thức ăn', 'Lọc không khí', 'Suy nghĩ'], why: 'Tim co bóp liên tục để đẩy máu mang ô-xi và chất dinh dưỡng đi nuôi cơ thể.' },
        { q: 'Tim của bé to khoảng bằng gì?', a: ['Nắm tay của chính bé', 'Quả dưa hấu', 'Hạt đậu', 'Cái bàn'], why: 'Tim mỗi người to khoảng bằng nắm tay của chính người đó.' },
        { q: 'Máu nhận ô-xi ở đâu?', a: ['Ở phổi', 'Ở dạ dày', 'Ở chân', 'Ở tóc'], why: 'Tim đẩy máu lên phổi, máu nhận ô-xi rồi quay về tim.' },
        { q: 'Khi chạy, tim đập thế nào?', a: ['Nhanh hơn', 'Chậm hơn', 'Ngừng lại', 'Không đổi'], why: 'Cơ bắp cần nhiều ô-xi hơn, nên tim đập nhanh hơn để đưa máu tới nhanh hơn.' },
        { q: 'Vì sao mạch máu ở cổ tay trông xanh?', a: ['Do ánh sáng đi qua da; máu thật màu đỏ', 'Vì máu trong đó màu xanh', 'Vì dính mực', 'Vì trời lạnh'], why: 'Máu luôn có màu đỏ: đỏ tươi khi nhiều ô-xi, đỏ sẫm khi ít ô-xi.' },
        { q: 'Cách đếm nhịp tim đơn giản là gì?', a: ['Đếm mạch cổ tay trong 15 giây rồi nhân 4', 'Đếm trong 1 giây', 'Nhìn vào gương', 'Nín thở thật lâu'], why: '15 giây nhân 4 là 60 giây, tức là số nhịp trong một phút.' }
      ],
      en: [
        { q: 'What does the heart do?', a: ['Pumps blood around the body', 'Digests food', 'Cleans the air', 'Thinks'], why: 'The heart keeps squeezing to push blood carrying oxygen and nutrients around the body.' },
        { q: 'How big is your heart?', a: ['About the size of your fist', 'A watermelon', 'A bean', 'A table'], why: 'Each person’s heart is about the size of their own fist.' },
        { q: 'Where does blood pick up oxygen?', a: ['In the lungs', 'In the stomach', 'In the legs', 'In the hair'], why: 'The heart sends blood to the lungs to pick up oxygen, then it returns to the heart.' },
        { q: 'When you run, your heart…', a: ['Beats faster', 'Beats slower', 'Stops', 'Stays the same'], why: 'Muscles need more oxygen, so the heart beats faster to deliver blood quicker.' },
        { q: 'Why do wrist veins look blue?', a: ['Because of light through skin; blood is red', 'The blood inside is blue', 'Ink', 'Cold weather'], why: 'Blood is always red: bright red with lots of oxygen, darker red with less.' },
        { q: 'A simple way to count your heartbeat?', a: ['Count your wrist pulse for 15 seconds, times 4', 'Count for 1 second', 'Look in a mirror', 'Hold your breath'], why: '15 seconds × 4 = 60 seconds, so you get beats per minute.' }
      ]
    });

    /* ---------- tabs & vòng lặp ---------- */
    const ALL_CANVAS = [dgC, brC, alvC, htC];
    let tab = 'dg';
    root.querySelectorAll('.body-tabs .tab').forEach((b) => b.addEventListener('click', () => {
      cancelSpeech(); tab = b.dataset.p;
      root.querySelectorAll('.body-tabs .tab').forEach((x) => { x.setAttribute('aria-selected', String(x === b)); $('b-' + x.dataset.p).classList.toggle('hidden', x !== b); });
      ALL_CANVAS.forEach((o) => o.fit()); dirty = true;
    }));
    let last = performance.now();
    function loop(now) {
      const dt = Math.max(0, Math.min(.1, (now - last) / 1000)); last = now; clock += dt;
      if (tab === 'dg') { dgStep(dt); drawDg(); }
      else if (tab === 'br') { brStep(dt); drawBr(); drawAlv(dt); brUpdate(); }
      else { htStep(dt); drawHt(); }
      pulseTick();
      dirty = false;
      if (!destroyed) rafId = window.requestAnimationFrame(loop);
    }

    function refreshTexts() {
      applyStatic(); dgBuildStages();
      setDgPlaying(dgPlaying);
      dgInfoKey = ''; dgHud = ''; brInfoKey = ''; brHud = ''; htInfoKey = ''; htHud = '';
      dgUpdate(); brUpdate(); htUpdate();
      [qDg, qBr, qHt].forEach((q) => q.refresh());
      if (!$('pulseResult').classList.contains('hidden') && !pulseEnd) pulseFinish();
      dirty = true;
    }
    function setLang(l) {
      lang = l === 'en' ? 'en' : 'vi';
      root.querySelectorAll('.body-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cancelSpeech(); refreshTexts();
    }
    root.querySelectorAll('.body-lang [data-lang]').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== lang) setLang(b.dataset.lang); }; });
    root.querySelectorAll('.body-lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    ALL_CANVAS.forEach((o) => o.fit());
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
