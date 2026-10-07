/* Epsilon Edu - Tool: He Mat Troi
 * Tich hop vao Class 1 Home Tools theo co che lazy-load.
 * Nguon nghiep vu/mo phong: tu file he-mat-troi.js anh cung cap.
 */
(() => {
  "use strict";

  const TOOL_ID = "solarSystem";
  let activeCleanup = null;

  function render(context = {}) {
    if (activeCleanup) { try { activeCleanup(); } catch (_) {} activeCleanup = null; }
    const host = context.host;
    if (!(host instanceof Element)) return;
    host.innerHTML = `<style>
.solar-tool{--pink:#ec4899;--purple:#7c3aed;--blue:#0284c7;--teal:#0f9f8f;--green:#16a34a;--ink:#334155;--muted:#64748b;--line:#e8ddfb;--soft:#faf7ff;width:100%;color:var(--ink);font:inherit;box-sizing:border-box}
.solar-tool *{box-sizing:border-box}.solar-tool button,.solar-tool input{font:inherit}.solar-tool button{cursor:pointer}.solar-tool .hidden{display:none!important}
.solar-hero{display:flex;align-items:center;gap:14px;padding:15px 18px;margin-bottom:12px;border:1px solid #eadcff;border-radius:22px;background:linear-gradient(90deg,#fff7fb 0%,#faf5ff 55%,#f1fbff 100%);box-shadow:0 8px 22px rgba(124,58,237,.07)}
.solar-hero-icon{width:58px;height:58px;flex:0 0 58px;border-radius:18px;display:grid;place-items:center;font-size:32px;background:#fff;border:1px solid #ddd6fe;box-shadow:0 6px 16px rgba(124,58,237,.1)}
.solar-kicker,.solar-tool .eyebrow{margin:0;color:#7c3aed;font-size:12px;line-height:1.2;font-weight:900;letter-spacing:.02em}.solar-hero h1{margin:3px 0 2px;color:#6d28d9;font-size:clamp(22px,2.2vw,31px);line-height:1.1;font-weight:900}.solar-hero p:last-child{margin:0;color:#64748b;font-size:14px;line-height:1.5;font-weight:700}
.solar-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:12px;padding:5px;border:1px solid #eee5fb;border-radius:18px;background:#fff;box-shadow:0 5px 16px rgba(15,23,42,.05)}
.solar-tabs .tab{min-height:44px;border:1px solid transparent;border-radius:14px;background:#f8fafc;color:#64748b;font-size:14px;font-weight:900;transition:.16s ease}.solar-tabs .tab:hover{filter:brightness(1.02);transform:translateY(-1px)}
.solar-tabs .tab:nth-child(1){background:#fdf2f8;border-color:#f9a8d4;color:#be185d}.solar-tabs .tab:nth-child(1)[aria-selected="true"]{color:#fff;border-color:#c026d3;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 6px 14px rgba(168,85,247,.2)}
.solar-tabs .tab:nth-child(2){background:#eff6ff;border-color:#93c5fd;color:#1d4ed8}.solar-tabs .tab:nth-child(2)[aria-selected="true"]{color:#fff;border-color:#2563eb;background:linear-gradient(90deg,#38bdf8,#2563eb);box-shadow:0 6px 14px rgba(37,99,235,.22)}
.solar-tabs .tab:nth-child(3){background:#f0fdf4;border-color:#86efac;color:#15803d}.solar-tabs .tab:nth-child(3)[aria-selected="true"]{color:#fff;border-color:#16a34a;background:linear-gradient(90deg,#4ade80,#16a34a);box-shadow:0 6px 14px rgba(22,163,74,.22)}
.solar-panel{width:100%}.solar-grid{display:grid;gap:12px}.solar-grid-main{grid-template-columns:minmax(0,1.4fr) minmax(320px,.8fr);align-items:stretch}.solar-side-col{display:grid;grid-template-rows:auto minmax(0,1fr);gap:12px;align-content:stretch;height:100%}.solar-card{min-width:0;border:1px solid #e7ddf8;border-radius:22px;background:#fff;box-shadow:0 8px 22px rgba(76,29,149,.07);padding:14px}.card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.card-head.compact{margin-bottom:9px}.card-head h2{margin:2px 0 0;color:#475569;font-size:17px;line-height:1.25;font-weight:900}.solar-head-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}.solar-head-actions .segmented{margin:0}
.solar-tool .btn,.solar-tool .soft-btn,.solar-tool .segmented button,.solar-tool .preset-row button,.solar-tool .city-row button{min-height:38px;border-radius:12px;border:1px solid #e9d5ff;background:#faf5ff;color:#6d28d9;font-weight:900;font-size:13px;transition:.15s ease}.solar-tool .btn:hover,.solar-tool .soft-btn:hover,.solar-tool .segmented button:hover,.solar-tool .preset-row button:hover,.solar-tool .city-row button:hover{transform:translateY(-1px);filter:brightness(1.02)}.solar-tool .btn.main{padding:0 15px;border:0;color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);box-shadow:0 5px 13px rgba(168,85,247,.22)}
.segmented{display:flex;gap:7px;margin:0 0 8px}.segmented button{padding:0 13px}.segmented button[aria-pressed="true"],.soft-btn[aria-pressed="true"],.city-row button[aria-pressed="true"]{color:#fff;border-color:#8b5cf6;background:linear-gradient(90deg,#8b5cf6,#3b82f6);box-shadow:0 4px 12px rgba(59,130,246,.16)}
.canvas-wrap{width:100%;overflow:hidden;border:1px solid #dcd8f5;border-radius:18px;background:#0b0f2e}.canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none}.sky-wrap,.rays-wrap{background:#f8fbff}.hud{min-height:21px;margin:7px 2px 3px;color:#6d28d9;font-size:12.5px;line-height:1.45;font-weight:800}
.control-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end}.range-control{display:grid;gap:6px;color:#475569;font-size:12.5px;font-weight:900}.range-control input{width:100%;accent-color:#8b5cf6}.range-control b{color:#7c3aed;font-size:12px}.toggle-row{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.soft-btn{padding:0 12px}
.planet-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:9px}.pchip{display:inline-flex;align-items:center;gap:6px;min-height:32px;padding:0 9px;border:1px solid #e8e2f4;border-radius:999px;background:#fff;color:#475569;font-size:11.5px;font-weight:900}.pchip i{width:11px;height:11px;border-radius:50%;box-shadow:0 0 0 2px rgba(15,23,42,.06)}.pchip[aria-pressed="true"]{border-color:#c4b5fd;background:#f5f3ff;color:#6d28d9;box-shadow:0 3px 10px rgba(124,58,237,.11)}
.planet-info{min-height:230px;padding:12px;border:1px solid #f0e7fb;border-radius:17px;background:linear-gradient(180deg,#fff,#fcfaff)}.planet-info .title{display:flex;align-items:center;justify-content:space-between;gap:10px}.planet-title-main{display:flex;align-items:center;gap:9px;min-width:0}.planet-info .title h2{margin:0;color:#6d28d9;font-size:21px;font-weight:900}.planet-info .title .btn{flex:0 0 auto;margin:0;min-height:36px;padding:0 11px}.planet-info .dot{width:28px;height:28px;border-radius:50%;flex:0 0 28px}.planet-info .sub{margin:3px 0 10px;color:#64748b;font-size:13.5px;font-weight:800}.facts{display:grid;gap:6px}.facts>div{display:grid;grid-template-columns:112px 1fr;gap:9px;padding:8px 9px;border-radius:11px;background:#f8fafc}.facts b{color:#7c3aed;font-size:12.5px}.facts span{color:#475569;font-size:13.5px;line-height:1.45;font-weight:700}.fun,.warn,.tip{margin:9px 0 0;padding:9px 10px;border-radius:12px;font-size:13px;line-height:1.5;font-weight:750}.fun{background:#effcf8;color:#0f766e;border:1px solid #ccfbf1}.warn{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}.tip{background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe}.tip.hot{background:#fff7ed;color:#9a3412;border-color:#fed7aa}.planet-info .btn{margin-top:9px}
.preset-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:9px}.preset-row button{padding:0 11px;background:#f8fafc;border-color:#e2e8f0;color:#475569}.day-info{margin-top:10px}.solar-tool .muted{color:#64748b;font-size:12.5px;line-height:1.5;font-weight:700}.solar-tool .big{margin:2px 0;color:#7c3aed;font-size:25px;line-height:1.15;font-weight:900}.solar-tool .lead{margin:6px 0;color:#334155;font-size:14px;line-height:1.5;font-weight:900}
.season-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin-top:10px}.season-summary>div{min-width:0;padding:8px;border:1px solid #e7e5ff;border-radius:12px;background:#fafaff;text-align:center}.season-summary span{display:block;color:#64748b;font-size:10.5px;font-weight:900}.season-summary b{display:block;margin-top:3px;color:#7c3aed;font-size:12px;line-height:1.25}.city-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:9px}.city-row button{padding:0 10px}.day-bar{display:flex;width:100%;min-height:34px;overflow:hidden;margin-top:9px;border:1px solid #dbeafe;border-radius:12px;background:#eff6ff}.day-bar>div{display:flex;align-items:center;justify-content:center;min-width:0;padding:0 4px;white-space:nowrap;overflow:hidden;font-size:10.5px;font-weight:900}.day-bar .dd{background:linear-gradient(90deg,#fde68a,#fbbf24);color:#854d0e}.day-bar .nn{background:linear-gradient(90deg,#c7d2fe,#818cf8);color:#312e81}.distance-box{margin-top:10px;padding:9px;border:1px solid #e0f2fe;border-radius:13px;background:#f7fcff}.distance-head{display:flex;justify-content:space-between;gap:10px;color:#0369a1;font-size:11.5px;font-weight:900}.distance-track{position:relative;display:flex;justify-content:space-between;align-items:flex-end;height:28px;margin-top:4px;color:#64748b;font-size:9.5px}.distance-track:before{content:"";position:absolute;left:0;right:0;top:7px;height:5px;border-radius:99px;background:linear-gradient(90deg,#38bdf8,#a78bfa,#f472b6)}.distance-track i{position:absolute;top:2px;width:14px;height:14px;border:3px solid #fff;border-radius:50%;background:#ec4899;box-shadow:0 2px 6px rgba(190,24,93,.25);transform:translateX(-50%)}
.quiz-card{margin-top:0}.quiz-card h2{margin:0 0 7px;color:#6d28d9;font-size:17px;font-weight:900}.qtext{margin:0 0 9px;color:#334155;font-size:15px;line-height:1.45;font-weight:900}.qopts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.qopt{min-height:42px;padding:7px 10px;border:1px solid #dbe7ff;border-radius:13px;color:#475569;text-align:left;font-size:12.5px;font-weight:800}.qopt.opt-1{background:#fdf2f8;border-color:#f9c7de}.qopt.opt-2{background:#eff6ff;border-color:#bfdbfe}.qopt.opt-3{background:#f0fdf4;border-color:#bbf7d0}.qopt.opt-4{background:#fff7ed;border-color:#fed7aa}.qopt:hover{filter:brightness(.985)}.qopt.ok{border-color:#86efac!important;background:#f0fdf4!important;color:#15803d}.qopt.no{border-color:#fda4af!important;background:#fff1f2!important;color:#be123c}.qfoot{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:8px}.qfb,.score{font-size:12px;font-weight:900}.qfb.ok{color:#15803d}.qfb.no{color:#be123c}.score{color:#7c3aed}
@media(max-width:960px){.solar-grid-main{grid-template-columns:1fr;align-items:start}.solar-side-col{grid-template-columns:1fr;grid-template-rows:auto auto;height:auto}.control-grid{grid-template-columns:1fr}.toggle-row{justify-content:flex-start}}
@media(max-width:620px){.solar-hero{padding:12px}.solar-hero-icon{width:48px;height:48px;flex-basis:48px;font-size:27px}.solar-tabs{grid-template-columns:1fr}.solar-tabs .tab{min-height:40px}.solar-card{padding:11px;border-radius:18px}.card-head{align-items:flex-start;flex-direction:column}.card-head .btn{width:100%}.solar-head-actions{width:100%;justify-content:space-between;flex-wrap:nowrap}.solar-head-actions .segmented{flex:1;min-width:0}.solar-head-actions .segmented button{flex:1;padding:0 8px}.card-head .solar-head-actions .btn{width:auto!important;flex:0 0 auto;padding:0 10px}.qopts{grid-template-columns:1fr}.facts>div{grid-template-columns:1fr}.season-summary{grid-template-columns:1fr}.preset-row button,.city-row button{flex:1 1 auto}}
@media(prefers-reduced-motion:reduce){.solar-tool *{scroll-behavior:auto!important;transition:none!important}}
</style><section class="solar-tool" data-solar-tool>
  <div class="solar-hero">
    <div class="solar-hero-icon" aria-hidden="true">🪐</div>
    <div>
      <p class="solar-kicker">Epsilon Edu · Khoa học trực quan</p>
      <h1>Hệ Mặt Trời</h1>
      <p>Quan sát chuyển động, tự tay kéo – chỉnh – so sánh để hiểu Hệ Mặt Trời, ngày đêm và các mùa.</p>
    </div>
  </div>

  <div class="solar-tabs" role="tablist" aria-label="Các nội dung Hệ Mặt Trời">
    <button class="tab" type="button" role="tab" aria-selected="true" data-p="solar">🪐 Hệ Mặt Trời</button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="day">🌍 Ngày &amp; đêm</button>
    <button class="tab" type="button" role="tab" aria-selected="false" data-p="season">☀️ Các mùa</button>
  </div>

  <section id="p-solar" class="solar-panel" role="tabpanel">
    <div class="solar-grid solar-grid-main">
      <article class="solar-card canvas-card">
        <div class="card-head">
          <div><span class="eyebrow">Mô phỏng</span><h2>8 hành tinh quanh Mặt Trời</h2></div>
          <div class="solar-head-actions">
            <div class="segmented" aria-label="Chế độ hiển thị">
              <button id="vOrbit" type="button" aria-pressed="true">Quỹ đạo</button>
              <button id="vSize" type="button" aria-pressed="false">Kích thước</button>
            </div>
            <button id="sPlay" class="btn main" type="button">⏸ Tạm dừng</button>
          </div>
        </div>
        <div class="canvas-wrap"><canvas id="cSolar" aria-label="Mô phỏng Hệ Mặt Trời"></canvas></div>
        <p id="sHud" class="hud" aria-live="polite"></p>
        <div class="control-grid">
          <label class="range-control"><span>Tốc độ mô phỏng</span><input id="sSpeed" type="range" min="0" max="100" value="45" step="1"><b id="sSpeedTxt"></b></label>
          <div class="toggle-row">
            <button id="sReal" class="soft-btn" type="button" aria-pressed="false">Khoảng cách thật</button>
            <button id="sLabels" class="soft-btn" type="button" aria-pressed="true">Tên hành tinh</button>
          </div>
        </div>
      </article>

      <div class="solar-side-col">
        <aside class="solar-card info-card">
          <div class="card-head compact"><div><span class="eyebrow">Chạm để khám phá</span><h2>Thông tin thiên thể</h2></div></div>
          <div id="pChips" class="planet-chips" aria-label="Chọn thiên thể"></div>
          <div id="pInfo" class="planet-info" aria-live="polite"></div>
        </aside>
        <article id="qSolar" class="solar-card quiz-card"></article>
      </div>
    </div>
  </section>

  <section id="p-day" class="solar-panel hidden" role="tabpanel">
    <div class="solar-grid solar-grid-main">
      <article class="solar-card canvas-card">
        <div class="card-head">
          <div><span class="eyebrow">Tự tay xoay Trái Đất</span><h2>Vì sao có ngày và đêm?</h2></div>
          <button id="dPlay" class="btn main" type="button">▶ Cho quay</button>
        </div>
        <div class="canvas-wrap"><canvas id="cEarth" aria-label="Trái Đất và tia sáng Mặt Trời"></canvas></div>
        <label class="range-control"><span>Giờ ở Việt Nam</span><input id="dHour" type="range" min="0" max="23.75" value="9" step="0.25"></label>
        <div class="preset-row" aria-label="Chọn nhanh thời điểm">
          <button type="button" data-h="6">6 giờ</button><button type="button" data-h="9">9 giờ</button><button type="button" data-h="12">12 giờ</button><button type="button" data-h="18">18 giờ</button><button type="button" data-h="21">21 giờ</button>
        </div>
      </article>
      <div class="solar-side-col">
        <aside class="solar-card info-card">
          <div class="card-head compact"><div><span class="eyebrow">Bầu trời trong ngày</span><h2>Mặt Trời mọc – lặn</h2></div></div>
          <div class="canvas-wrap sky-wrap"><canvas id="cSky" aria-label="Bầu trời theo giờ trong ngày"></canvas></div>
          <div id="dInfo" class="day-info" aria-live="polite"></div>
        </aside>
        <article id="qDay" class="solar-card quiz-card"></article>
      </div>
    </div>
  </section>

  <section id="p-season" class="solar-panel hidden" role="tabpanel">
    <div class="solar-grid solar-grid-main">
      <article class="solar-card canvas-card">
        <div class="card-head">
          <div><span class="eyebrow">Một vòng quanh Mặt Trời</span><h2>Vì sao có các mùa?</h2></div>
          <button id="yPlay" class="btn main" type="button">▶ Chạy cả năm</button>
        </div>
        <div class="canvas-wrap"><canvas id="cSeason" aria-label="Mô phỏng Trái Đất chuyển động quanh Mặt Trời"></canvas></div>
        <label class="range-control"><span id="yDate">Ngày 21 tháng 6</span><input id="yDay" type="range" min="1" max="365" value="172" step="1"></label>
        <div class="preset-row season-presets" aria-label="Các mốc mùa">
          <button type="button" data-d="80">21/3</button><button type="button" data-d="172">21/6</button><button type="button" data-d="266">23/9</button><button type="button" data-d="356">22/12</button><button id="yToday" type="button">Hôm nay</button>
        </div>
        <div class="season-summary">
          <div><span>Miền Bắc</span><b id="ySN"></b></div>
          <div><span>Miền Nam</span><b id="ySS"></b></div>
          <div><span>Nam bán cầu</span><b id="ySA"></b></div>
        </div>
      </article>

      <div class="solar-side-col">
        <aside class="solar-card info-card season-info-card">
          <div class="card-head compact"><div><span class="eyebrow">Nắng và độ dài ngày</span><h2>Quan sát tại Việt Nam</h2></div></div>
          <div id="yCities" class="city-row" aria-label="Chọn địa điểm">
            <button type="button" data-lat="21.03" data-n="Hà Nội" aria-pressed="true">Hà Nội</button>
            <button type="button" data-lat="16.05" data-n="Đà Nẵng" aria-pressed="false">Đà Nẵng</button>
            <button type="button" data-lat="10.82" data-n="TP. Hồ Chí Minh" aria-pressed="false">TP.HCM</button>
          </div>
          <div class="canvas-wrap rays-wrap"><canvas id="cRays" aria-label="Góc chiếu của tia nắng"></canvas></div>
          <p id="yRayTxt" class="lead"></p>
          <div id="yDayBar" class="day-bar" aria-label="Độ dài ban ngày và ban đêm"></div>
          <p id="yDayTxt" class="muted"></p>
          <div class="distance-box">
            <div class="distance-head"><span>Khoảng cách đến Mặt Trời</span><b id="yDist"></b></div>
            <div class="distance-track"><span>147,1</span><i id="yMeter"></i><span>152,1 triệu km</span></div>
          </div>
          <div id="yCallout" class="tip"></div>
        </aside>
        <article id="qSeason" class="solar-card quiz-card"></article>
      </div>
    </div>
  </section>
</section>`;
    const root = host.querySelector("[data-solar-tool]");
    if (!root) return;
    activeCleanup = initSolarTool(root, context);
  }

  function destroy() {
    if (!activeCleanup) return;
    try { activeCleanup(); } catch (_) {}
    activeCleanup = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[TOOL_ID] = Object.freeze({ render, destroy });

  function initSolarTool(root, context) {
    const TAU = Math.PI * 2, RAD = Math.PI / 180;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const $ = (id) => root.querySelector(`#${id}`);
    const reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const cleanupFns = [];
    let destroyed = false;
    let rafId = 0;

    const DG = ["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"];
    function readNum(n) { const t=Math.floor(n/10),u=n%10;if(n<10)return DG[n];let s=t===1?'mười':DG[t]+' mươi';if(u===0)return s;if(u===5)return s+' lăm';if(u===1&&t>1)return s+' mốt';if(u===4&&t>1)return s+' tư';return s+' '+DG[u]; }

    let viVoice = null;
    const speech = window.speechSynthesis || null;
    function loadVoice() {
      if (!speech) return;
      try {
        const voices = speech.getVoices();
        viVoice = voices.find((v) => /^vi/i.test(v.lang) && /ban mai/i.test(v.name || ""))
          || voices.find((v) => /^vi/i.test(v.lang))
          || null;
      } catch (_) { viVoice = null; }
    }
    if (speech) {
      loadVoice();
      if (typeof speech.addEventListener === "function") {
        speech.addEventListener("voiceschanged", loadVoice);
        cleanupFns.push(() => speech.removeEventListener("voiceschanged", loadVoice));
      }
    }
    let ttsNoticeShown = false;
    function speak(text) {
      if (!speech) {
        if (context.hooks && typeof context.hooks.showToast === "function") context.hooks.showToast("Thiết bị chưa hỗ trợ giọng đọc tiếng Việt.");
        return;
      }
      try {
        speech.cancel();
        const u = new SpeechSynthesisUtterance(String(text || ""));
        u.lang = "vi-VN";
        if (viVoice) u.voice = viVoice;
        u.rate = .92;
        speech.speak(u);
        if (!ttsNoticeShown && (!viVoice || !/ban mai/i.test(viVoice.name || ""))) {
          ttsNoticeShown = true;
          if (context.hooks && typeof context.hooks.showToast === "function") context.hooks.showToast("Tool đang dùng giọng Việt có sẵn trên thiết bị; chưa xác nhận được Google TTS Ban Mai.");
        }
      } catch (_) {}
    }

    function makeCanvas(id, ratio, onResize) {
      const c = $(id);
      if (!c) throw new Error(`SOLAR_CANVAS_MISSING:${id}`);
      const ctx = c.getContext("2d");
      const o = { c, ctx, w: 0, h: 0 };
      const fit = () => {
        if (destroyed || !c.isConnected) return;
        const pe = c.parentElement;
        if (!pe) return;
        const cs = getComputedStyle(pe);
        const w = Math.floor(pe.clientWidth - parseFloat(cs.paddingLeft || 0) - parseFloat(cs.paddingRight || 0));
        if (w <= 0 || Math.abs(w - o.w) < 1) return;
        const h = Math.round(ratio(w)), dpr = Math.min(window.devicePixelRatio || 1, 2);
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); c.style.height = h + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); o.w = w; o.h = h; if (onResize) onResize();
      };
      o.fit = fit;
      if (typeof ResizeObserver === "function") {
        const ro = new ResizeObserver(fit); ro.observe(c.parentElement); cleanupFns.push(() => ro.disconnect());
      } else {
        window.addEventListener("resize", fit); cleanupFns.push(() => window.removeEventListener("resize", fit));
      }
      fit();
      return o;
    }

function hex2rgb(h){const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255]}
function mix(a,b,t){const A=hex2rgb(a),B=hex2rgb(b);return`rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(',')})`}
function mixRgb(a,b,t){return a.map((v,i)=>v+(b[i]-v)*t)}
const rgb=a=>`rgb(${a.map(Math.round).join(',')})`;
function shadeBall(ctx,x,y,r,color,lx,ly){ // lx,ly: hướng tới nguồn sáng (đã chuẩn hóa)
  ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=color;ctx.fill();
  const g=ctx.createRadialGradient(x+lx*r*.55,y+ly*r*.55,r*.15,x+lx*r*.3,y+ly*r*.3,r*1.6);
  g.addColorStop(0,'rgba(255,255,255,.28)');g.addColorStop(.45,'rgba(0,0,20,0)');g.addColorStop(1,'rgba(5,6,25,.82)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}
function drawSun(ctx,x,y,r,face,glow=true){
  if(glow){const g=ctx.createRadialGradient(x,y,r*.6,x,y,r*2.4);g.addColorStop(0,'rgba(255,200,60,.55)');g.addColorStop(1,'rgba(255,170,40,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r*2.4,0,TAU);ctx.fill();}
  const b=ctx.createRadialGradient(x-r*.3,y-r*.3,r*.1,x,y,r);b.addColorStop(0,'#fff6b0');b.addColorStop(.6,'#ffd23f');b.addColorStop(1,'#ff9f1c');
  ctx.fillStyle=b;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();
  if(face&&r>14){ctx.fillStyle='#7a3b00';ctx.beginPath();ctx.arc(x-r*.32,y-r*.12,r*.09,0,TAU);ctx.arc(x+r*.32,y-r*.12,r*.09,0,TAU);ctx.fill();
    ctx.strokeStyle='#7a3b00';ctx.lineWidth=Math.max(1.5,r*.07);ctx.lineCap='round';ctx.beginPath();ctx.arc(x,y+r*.08,r*.32,.2*Math.PI,.8*Math.PI);ctx.stroke();
    ctx.fillStyle='rgba(255,110,110,.45)';ctx.beginPath();ctx.arc(x-r*.52,y+r*.2,r*.12,0,TAU);ctx.arc(x+r*.52,y+r*.2,r*.12,0,TAU);ctx.fill();}}
function makeStars(n){return Array.from({length:n},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.3+.3,a:Math.random()*.6+.3}))}
function drawStars(ctx,w,h,stars,alpha=1){for(const s of stars){ctx.globalAlpha=s.a*alpha;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s.x*w,s.y*h,s.r,0,TAU);ctx.fill();}ctx.globalAlpha=1;}
function arrowHead(ctx,x,y,ang,size){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-size*Math.cos(ang-.45),y-size*Math.sin(ang-.45));ctx.lineTo(x-size*Math.cos(ang+.45),y-size*Math.sin(ang+.45));ctx.closePath();ctx.fill();}

/* ---------- đố vui ---------- */
function makeQuiz(el,list){let order=[],i=0,ok=0,total=0,done=false;
  const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  function render(){if(i>=order.length){order=shuffle(list.map((_,k)=>k));i=0;}
    const q=list[order[i]];done=false;
    el.innerHTML=`<h2>🎯 Đố vui</h2><p class="qtext">${q.q}</p><div class="qopts"></div>
      <div class="qfoot"><span class="qfb" aria-live="assertive"></span><span class="score">Đúng ${ok} / ${total}</span></div>`;
    const box=el.querySelector('.qopts'),fb=el.querySelector('.qfb');
    shuffle(q.a.map((t,k)=>({t,k}))).forEach((o,idx)=>{const b=document.createElement('button');b.className='qopt opt-'+(idx+1);b.textContent=o.t;
      b.onclick=()=>{if(done)return;done=true;total++;const right=o.k===0;if(right)ok++;b.classList.add(right?'ok':'no');
        if(!right)[...box.children].find(x=>x.textContent===q.a[0]).classList.add('ok');
        fb.textContent=right?'Đúng rồi! 🎉':'Chưa đúng rồi.';fb.className='qfb '+(right?'ok':'no');
        el.querySelector('.score').textContent=`Đúng ${ok} / ${total}`;
        const p=document.createElement('p');p.className='muted';p.style.margin='8px 0 0';p.textContent='💡 '+q.why;el.appendChild(p);
        const nx=document.createElement('button');nx.className='btn main';nx.style.marginTop='10px';nx.textContent='Câu tiếp theo';nx.onclick=()=>{i++;render()};el.appendChild(nx);};
      box.appendChild(b);});}
  render();}

/* ---------- tabs & vòng lặp ---------- */
let tab='solar';
root.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{tab=b.dataset.p;
  root.querySelectorAll('.tab').forEach(x=>{x.setAttribute('aria-selected',x===b);$('p-'+x.dataset.p).classList.toggle('hidden',x!==b)});
  [solarC,earthC,skyC,seasonC,raysC].forEach(o=>o.fit());dirty=true;});
let dirty=true,last=performance.now();
function loop(now){const dt=Math.min(.1,(now-last)/1000);last=now;
  if(tab==='solar'){if(sPlaying){simDays+=dt*daysPerSec();dirty=true}if(dirty)drawSolar();}
  else if(tab==='day'){if(dPlaying){setHour((hour+dt*2)%24);}if(dirty){drawEarth();drawSky();}}
  else{if(yPlaying){setDay(yDay+dt*20,true);}if(dirty)drawSeason();}
  dirty=false;if(!destroyed)rafId=window.requestAnimationFrame(loop);}

/* =====================================================================
   1. HỆ MẶT TRỜI
   ===================================================================== */
const PLANETS=[
 {id:'mercury',name:'Sao Thủy',color:'#b9ab9c',r:4,au:.39,period:88,dia:.38,order:1,km:'khoảng 58 triệu km',year:'88 ngày',type:'Hành tinh đá',size:'Nhỏ nhất, chỉ bằng khoảng 1/3 Trái Đất',fact:'Sao Thủy ở gần Mặt Trời nhất nên chạy nhanh nhất: chỉ 88 ngày là đi hết một vòng.'},
 {id:'venus',name:'Sao Kim',color:'#e8c27a',r:6.5,au:.72,period:225,dia:.95,order:2,km:'khoảng 108 triệu km',year:'225 ngày',type:'Hành tinh đá',size:'Gần bằng Trái Đất',fact:'Sao Kim là hành tinh nóng nhất vì được bao bọc bởi lớp khí dày giữ nhiệt. Người ta gọi nó là sao Mai (lúc sáng sớm) và sao Hôm (lúc chiều tối).'},
 {id:'earth',name:'Trái Đất',color:'#3b8ef0',r:7,au:1,period:365.25,dia:1,order:3,km:'khoảng 150 triệu km',year:'365 ngày',type:'Hành tinh đá',size:'Lớn thứ 5 trong 8 hành tinh',fact:'Trái Đất là hành tinh duy nhất có sự sống mà con người biết đến. Khoảng 3/4 bề mặt Trái Đất là nước.'},
 {id:'mars',name:'Sao Hỏa',color:'#e0673f',r:5,au:1.52,period:687,dia:.53,order:4,km:'khoảng 228 triệu km',year:'687 ngày (gần 2 năm)',type:'Hành tinh đá',size:'Bằng khoảng một nửa Trái Đất',fact:'Sao Hỏa có màu đỏ vì đất đá ở đó chứa nhiều gỉ sắt. Nó được gọi là "hành tinh đỏ".'},
 {id:'jupiter',name:'Sao Mộc',color:'#d9a877',r:15,au:5.2,period:4333,dia:11.2,order:5,km:'khoảng 778 triệu km',year:'gần 12 năm',type:'Hành tinh khí khổng lồ',size:'Lớn nhất, to gấp khoảng 11 lần Trái Đất',fact:'Sao Mộc có một cơn bão khổng lồ tên là Vết Đỏ Lớn, rộng hơn cả Trái Đất và đã kéo dài hàng trăm năm.'},
 {id:'saturn',name:'Sao Thổ',color:'#e6cf8f',r:12.5,au:9.54,period:10759,dia:9.45,order:6,km:'khoảng 1,4 tỉ km',year:'gần 30 năm',type:'Hành tinh khí khổng lồ',size:'To gấp khoảng 9 lần Trái Đất',fact:'Sao Thổ có vành đai rất đẹp, được tạo từ vô số mảnh băng và đá nhỏ quay quanh nó.'},
 {id:'uranus',name:'Sao Thiên Vương',color:'#8fd9e3',r:9.5,au:19.2,period:30687,dia:4.0,order:7,km:'khoảng 2,9 tỉ km',year:'khoảng 84 năm',type:'Hành tinh băng khổng lồ',size:'To gấp khoảng 4 lần Trái Đất',fact:'Sao Thiên Vương nằm nghiêng hẳn sang một bên, giống như vừa lăn vừa đi quanh Mặt Trời.'},
 {id:'neptune',name:'Sao Hải Vương',color:'#4f72e8',r:9.3,au:30.07,period:60190,dia:3.88,order:8,km:'khoảng 4,5 tỉ km',year:'khoảng 165 năm',type:'Hành tinh băng khổng lồ',size:'To gấp khoảng 4 lần Trái Đất',fact:'Sao Hải Vương ở xa Mặt Trời nhất, rất lạnh và có những cơn gió mạnh nhất trong hệ Mặt Trời.'}];
PLANETS.forEach((p,i)=>p.phase=[.6,2.1,3.6,5.0,1.2,4.2,2.8,0.2][i]);
const SUN={id:'sun',name:'Mặt Trời',color:'#ffc93c'};
const MOON={id:'moon',name:'Mặt Trăng',color:'#d8d8de'};
let simDays=0,sPlaying=!reduceMotion,sView='orbit',sReal=false,sLabels=true,sSel='earth',hits=[];
const solarStars=makeStars(160);
const solarC=makeCanvas('cSolar',w=>clamp(w*.72,320,640),()=>dirty=true);
const daysPerSec=()=>Math.round(Math.pow(10,+$('sSpeed').value/100*2.7));
function updSpeedTxt(){$('sSpeedTxt').textContent=`1 giây = ${daysPerSec()} ngày`}
function drawSolar(){const{ctx,w,h}=solarC;if(!w)return;ctx.clearRect(0,0,w,h);
  ctx.fillStyle='#0b0f2e';ctx.fillRect(0,0,w,h);drawStars(ctx,w,h,solarStars);hits=[];
  const k=clamp(w/720,.62,1.25);
  if(sView==='orbit'){
    const cx=w/2,cy=h/2,sq=.6,sunR=22*k,Rmax=Math.min(w/2-22*k,(h/2-20*k)/sq);
    const orbitR=(p,i)=>sReal?sunR+12+(p.au/30.07)*(Rmax-sunR-12):sunR+20*k+i*(Rmax-sunR-20*k)/7;
    ctx.lineWidth=1;
    PLANETS.forEach((p,i)=>{const R=orbitR(p,i);ctx.strokeStyle=p.id===sSel?'rgba(255,211,77,.7)':'rgba(170,180,255,.22)';
      ctx.beginPath();ctx.ellipse(cx,cy,R,R*sq,0,0,TAU);ctx.stroke();});
    const pos=PLANETS.map((p,i)=>{const R=orbitR(p,i),a=p.phase+TAU*simDays/p.period;return{p,x:cx+R*Math.cos(a),y:cy-R*sq*Math.sin(a),r:p.r*k}});
    const drawP=o=>{const{p,x,y,r}=o,dx=cx-x,dy=cy-y,d=Math.hypot(dx,dy)||1;
      if(p.id==='saturn'){ctx.strokeStyle='rgba(240,220,160,.85)';ctx.lineWidth=2.2*k;ctx.beginPath();ctx.ellipse(x,y,r*2.1,r*.7,-.3,Math.PI,TAU);ctx.stroke();}
      shadeBall(ctx,x,y,r,p.color,dx/d,dy/d);
      if(p.id==='saturn'){ctx.beginPath();ctx.ellipse(x,y,r*2.1,r*.7,-.3,0,Math.PI);ctx.stroke();}
      if(p.id==='jupiter'){ctx.strokeStyle='rgba(140,90,50,.45)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-r*.9,y-r*.25);ctx.lineTo(x+r*.9,y-r*.25);ctx.moveTo(x-r*.9,y+r*.2);ctx.lineTo(x+r*.9,y+r*.2);ctx.stroke();}
      if(p.id==='earth'){const ma=TAU*simDays/27.3,mr=r+9*k,mx=x+mr*Math.cos(ma),my=y-mr*.6*Math.sin(ma);
        ctx.strokeStyle='rgba(220,220,240,.25)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(x,y,mr,mr*.6,0,0,TAU);ctx.stroke();
        shadeBall(ctx,mx,my,2.4*k,'#d8d8de',dx/d,dy/d);hits.push({id:'moon',x:mx,y:my,r:2.4*k});
        if(sSel==='moon'){ctx.strokeStyle='#ffd34d';ctx.setLineDash([3,3]);ctx.beginPath();ctx.arc(mx,my,2.4*k+5,0,TAU);ctx.stroke();ctx.setLineDash([]);}}
      if(p.id===sSel){ctx.strokeStyle='#ffd34d';ctx.lineWidth=2;ctx.setLineDash([4,4]);ctx.beginPath();ctx.arc(x,y,r+6,0,TAU);ctx.stroke();ctx.setLineDash([]);}
      if(sLabels){ctx.fillStyle='rgba(235,238,255,.92)';ctx.font=`700 ${Math.round(11.5*k+1)}px Nunito, sans-serif`;ctx.textAlign='center';const tw=ctx.measureText(p.name).width/2+4;ctx.fillText(p.name,clamp(x,tw,w-tw),y+r+14*k);}
      hits.push({id:p.id,x,y,r});};
    pos.filter(o=>o.y<cy).forEach(drawP);
    drawSun(ctx,cx,cy,sunR,true);hits.push({id:'sun',x:cx,y:cy,r:sunR});
    if(sSel==='sun'){ctx.strokeStyle='#ffd34d';ctx.lineWidth=2;ctx.setLineDash([4,4]);ctx.beginPath();ctx.arc(cx,cy,sunR+7,0,TAU);ctx.stroke();ctx.setLineDash([]);}
    pos.filter(o=>o.y>=cy).forEach(drawP);
    if(sReal){ctx.fillStyle='rgba(255,211,77,.95)';ctx.font=`800 ${Math.round(13*k)}px Nunito, sans-serif`;ctx.textAlign='left';
      ctx.fillText('Bốn hành tinh đầu ở rất gần nhau, còn các hành tinh sau ở rất xa!',12,22);}
  }else{
    const sum=PLANETS.reduce((s,p)=>s+p.dia,0),gap=12*k,left=w*.13;
    const u=Math.min((w-left-40-7*gap)/(2*sum),h*.32/11.2),cy=h*.48;
    const sunR=109*u;drawSun(ctx,left-sunR,cy,sunR,false,false);hits.push({id:'sun',x:left-20,y:cy,r:40});
    ctx.fillStyle='#7a3b00';ctx.font=`800 ${Math.round(13*k)}px Nunito, sans-serif`;ctx.textAlign='left';
    ctx.save();ctx.translate(left*.42,cy);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.fillText('Một phần nhỏ của Mặt Trời',0,0);ctx.restore();
    let x=left+8;
    PLANETS.forEach((p,i)=>{const r=Math.max(1.2,p.dia*u);x+=r;
      if(p.id==='saturn'){ctx.strokeStyle='rgba(240,220,160,.85)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,cy,r*1.9,r*.55,-.3,0,TAU);ctx.stroke();}
      shadeBall(ctx,x,cy,r,p.color,-1,0);
      if(p.id===sSel){ctx.strokeStyle='#ffd34d';ctx.lineWidth=2;ctx.setLineDash([4,4]);ctx.beginPath();ctx.arc(x,cy,r+6,0,TAU);ctx.stroke();ctx.setLineDash([]);}
      ctx.fillStyle='rgba(235,238,255,.95)';ctx.font=`700 ${Math.round(11*k+1)}px Nunito, sans-serif`;ctx.textAlign='center';
      const ly=cy+11.2*u+(i<4?14+i*16:14+(i%2)*16)*k;const tw=ctx.measureText(p.name).width/2+4;ctx.fillText(p.name,clamp(x,tw,w-tw),ly);
      ctx.strokeStyle='rgba(235,238,255,.25)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,cy+r+3);ctx.lineTo(x,ly-11*k);ctx.stroke();
      hits.push({id:p.id,x,y:cy,r:Math.max(r,10)});x+=r+gap;});
    ctx.fillStyle='rgba(255,211,77,.95)';ctx.font=`800 ${Math.round(13*k)}px Nunito, sans-serif`;ctx.textAlign='left';
    ctx.fillText('Kích thước đúng tỉ lệ: Mặt Trời to gấp 109 lần Trái Đất!',left+8,22);}
  const yrs=Math.floor(simDays/365.25),dd=Math.floor(simDays-yrs*365.25);
  $('sHud').textContent=sView==='orbit'?`Trái Đất đã đi được ${yrs} vòng quanh Mặt Trời, tức là ${yrs} năm ${dd} ngày.`:'Bấm vào hành tinh để xem thông tin. Đây là kích thước, không phải khoảng cách.';}
function solarInfo(id){sSel=id;dirty=true;root.querySelectorAll('#pChips .pchip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.id===id));
  const el=$('pInfo');let html,say;
  if(id==='sun'){html=`<div class="title"><div class="planet-title-main"><span class="dot" style="background:radial-gradient(circle at 35% 35%,#fff6b0,#ffd23f 60%,#ff9f1c)"></span><h2>Mặt Trời</h2></div><button class="btn main" id="pSay" type="button">🔊 Đọc to</button></div>
    <p class="sub">Ngôi sao ở giữa hệ Mặt Trời</p>
    <div class="facts"><div><b>Là gì?</b><span>Một ngôi sao, tự phát ra ánh sáng và nhiệt</span></div>
    <div><b>Kích thước</b><span>To gấp khoảng 109 lần Trái Đất</span></div>
    <div><b>Ánh sáng</b><span>Đi từ Mặt Trời đến Trái Đất mất khoảng 8 phút</span></div></div>
    <p class="fun">Mặt Trời giữ cho 8 hành tinh quay quanh nó, và cho Trái Đất ánh sáng, hơi ấm để cây cối, con người sống được.</p>
    <p class="warn">⚠️ Không bao giờ nhìn thẳng vào Mặt Trời, kể cả khi đeo kính râm, vì có thể làm hỏng mắt.</p>`;
    say='Mặt Trời là một ngôi sao, tự phát ra ánh sáng và nhiệt. Mặt Trời to gấp khoảng một trăm lẻ chín lần Trái Đất. Không bao giờ nhìn thẳng vào Mặt Trời.';}
  else if(id==='moon'){html=`<div class="title"><div class="planet-title-main"><span class="dot" style="background:radial-gradient(circle at 35% 35%,#fff,#c9c9d2 60%,#8d8d99)"></span><h2>Mặt Trăng</h2></div><button class="btn main" id="pSay" type="button">🔊 Đọc to</button></div>
    <p class="sub">Vệ tinh tự nhiên của Trái Đất</p>
    <div class="facts"><div><b>Quay quanh</b><span>Trái Đất, mỗi vòng khoảng 27 ngày (gần 1 tháng)</span></div>
    <div><b>Kích thước</b><span>Bằng khoảng 1/4 Trái Đất</span></div>
    <div><b>Ánh sáng</b><span>Không tự phát sáng, mà phản chiếu ánh sáng Mặt Trời</span></div></div>
    <p class="fun">Vì Mặt Trăng chỉ phản chiếu ánh sáng nên ta thấy nó lúc tròn, lúc khuyết tùy vị trí của nó so với Mặt Trời và Trái Đất.</p>`;
    say='Mặt Trăng là vệ tinh tự nhiên của Trái Đất. Mặt Trăng không tự phát sáng mà phản chiếu ánh sáng của Mặt Trời.';}
  else{const p=PLANETS.find(x=>x.id===id);
    html=`<div class="title"><div class="planet-title-main"><span class="dot" style="background:radial-gradient(circle at 35% 35%,#fff8,${p.color} 45%,#0006)"></span><h2>${p.name}</h2></div><button class="btn main" id="pSay" type="button">🔊 Đọc to</button></div>
    <p class="sub">Hành tinh thứ ${p.order} tính từ Mặt Trời</p>
    <div class="facts"><div><b>Kích thước</b><span>${p.size}</span></div>
    <div><b>Cách Mặt Trời</b><span>${p.km}</span></div>
    <div><b>Một năm dài</b><span>${p.year}</span></div>
    <div><b>Loại</b><span>${p.type}</span></div></div>
    <p class="fun">${p.fact}</p>`;
    say=`${p.name}, hành tinh thứ ${readNum(p.order)} tính từ Mặt Trời. ${p.fact}`;}
  el.innerHTML=html;$('pSay').onclick=()=>speak(say);}
[SUN,...PLANETS,MOON].forEach(p=>{const b=document.createElement('button');b.className='pchip';b.dataset.id=p.id;
  b.innerHTML=`<i style="background:${p.color}"></i>${p.name}`;b.onclick=()=>solarInfo(p.id);$('pChips').appendChild(b);});
$('cSolar').addEventListener('pointerdown',e=>{const r=$('cSolar').getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  let best=null,bd=1e9;for(const h of hits){const d=Math.hypot(h.x-x,h.y-y)-h.r;if(d<bd){bd=d;best=h}}if(best&&bd<16)solarInfo(best.id);});
$('sPlay').onclick=()=>{sPlaying=!sPlaying;$('sPlay').textContent=sPlaying?'⏸ Tạm dừng':'▶ Chạy tiếp';};
$('sSpeed').oninput=updSpeedTxt;
function setView(v){sView=v;$('vOrbit').setAttribute('aria-pressed',v==='orbit');$('vSize').setAttribute('aria-pressed',v==='size');
  $('sReal').classList.toggle('hidden',v!=='orbit');$('sLabels').classList.toggle('hidden',v!=='orbit');dirty=true;}
$('vOrbit').onclick=()=>setView('orbit');$('vSize').onclick=()=>setView('size');
$('sReal').onclick=()=>{sReal=!sReal;$('sReal').setAttribute('aria-pressed',sReal);dirty=true;};
$('sLabels').onclick=()=>{sLabels=!sLabels;$('sLabels').setAttribute('aria-pressed',sLabels);dirty=true;};
if(!sPlaying)$('sPlay').textContent='▶ Chạy tiếp';
updSpeedTxt();solarInfo('earth');

/* =====================================================================
   2. NGÀY VÀ ĐÊM
   ===================================================================== */
let hour=9,dPlaying=false;
const earthC=makeCanvas('cEarth',w=>clamp(w*.68,300,560),()=>dirty=true);
const skyC=makeCanvas('cSky',w=>clamp(w*.56,170,280),()=>dirty=true);
const daySpaceStars=makeStars(90),skyStars=makeStars(45);
const LAND=[{a:.05,rf:.66,sx:.3,sy:.17,t:.3},{a:-.75,rf:.6,sx:.25,sy:.13,t:-.2},{a:-1.25,rf:.42,sx:.2,sy:.14,t:.6},
  {a:.85,rf:.48,sx:.2,sy:.12,t:-.5},{a:Math.PI-.15,rf:.62,sx:.28,sy:.16,t:.2},{a:Math.PI+.55,rf:.5,sx:.16,sy:.1,t:-.4},{a:2.2,rf:.3,sx:.12,sy:.1,t:0}];
const vnAngle=h=>Math.PI+(h-12)/12*Math.PI; // góc toán học, ngược chiều kim đồng hồ
function setHour(h){hour=((h%24)+24)%24;$('dHour').value=hour;dirty=true;dayInfo();}
function drawEarth(){const{ctx,w,h}=earthC;if(!w)return;ctx.clearRect(0,0,w,h);ctx.fillStyle='#0b0f2e';ctx.fillRect(0,0,w,h);drawStars(ctx,w,h,daySpaceStars,.8);
  const sr=h*.36;drawSun(ctx,-sr*.35,h/2,sr,false);
  const ex=w*.62,ey=h/2,R=Math.min(h*.38,w*.3);
  ctx.strokeStyle='rgba(255,215,90,.35)';ctx.fillStyle='rgba(255,215,90,.55)';ctx.lineWidth=2;
  for(let i=-2;i<=2;i++){const y=ey+i*R*.42;ctx.beginPath();ctx.moveTo(sr*.75,y);ctx.lineTo(ex-R-14,y);ctx.stroke();arrowHead(ctx,ex-R-10,y,0,9);}
  ctx.save();ctx.beginPath();ctx.arc(ex,ey,R,0,TAU);ctx.clip();
  const og=ctx.createRadialGradient(ex-R*.3,ey-R*.3,R*.1,ex,ey,R);og.addColorStop(0,'#5fb0ff');og.addColorStop(1,'#1e5fbf');ctx.fillStyle=og;ctx.fillRect(ex-R,ey-R,2*R,2*R);
  const base=vnAngle(hour);
  ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1;for(let i=0;i<12;i++){const a=base+i*TAU/12;ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex+R*Math.cos(a),ey-R*Math.sin(a));ctx.stroke();}
  for(const L of LAND){const a=base+L.a,x=ex+R*L.rf*Math.cos(a),y=ey-R*L.rf*Math.sin(a);ctx.fillStyle='#5cbf6a';ctx.beginPath();ctx.ellipse(x,y,R*L.sx,R*L.sy,-a+L.t+Math.PI/2,0,TAU);ctx.fill();}
  ctx.fillStyle='#f2f6ff';ctx.beginPath();ctx.arc(ex,ey,R*.16,0,TAU);ctx.fill();
  const ng=ctx.createLinearGradient(ex-R*.08,0,ex+R*.1,0);ng.addColorStop(0,'rgba(6,8,32,0)');ng.addColorStop(1,'rgba(6,8,32,.68)');ctx.fillStyle=ng;ctx.fillRect(ex-R*.08,ey-R,R*1.1,2*R);
  ctx.restore();
  ctx.strokeStyle='rgba(150,200,255,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(ex,ey,R,0,TAU);ctx.stroke();
  // chiều quay
  ctx.strokeStyle='rgba(255,255,255,.55)';ctx.fillStyle='rgba(255,255,255,.75)';ctx.lineWidth=2.5;const ar=R+16;
  ctx.beginPath();ctx.arc(ex,ey,ar,-.3*Math.PI,-.72*Math.PI,true);ctx.stroke();
  const ea=-.72*Math.PI;arrowHead(ctx,ex+ar*Math.cos(ea),ey+ar*Math.sin(ea),Math.atan2(-Math.cos(ea),Math.sin(ea)),11);
  const fs=Math.round(clamp(w/48,11,15));ctx.font=`800 ${fs}px Nunito, sans-serif`;ctx.textAlign='center';
  ctx.fillText('Chiều quay',ex+ar*Math.cos(-.5*Math.PI),ey+ar*Math.sin(-.5*Math.PI)-8);
  ctx.fillStyle='#ffe58a';ctx.fillText('Ban ngày',ex-R*.55,ey+R+fs+6);ctx.fillStyle='#a9b4ff';ctx.fillText('Ban đêm',ex+R*.55,ey+R+fs+6);
  ctx.fillStyle='#1e2a5a';ctx.font=`800 ${Math.max(9,fs-3)}px Nunito, sans-serif`;ctx.fillText('Bắc Cực',ex,ey+3);
  const marker=(ang,rf,col,label)=>{const x=ex+R*rf*Math.cos(ang),y=ey-R*rf*Math.sin(ang);
    ctx.fillStyle=col;ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,8,0,TAU);ctx.fill();ctx.stroke();
    ctx.font=`800 ${fs}px Nunito, sans-serif`;const tw=ctx.measureText(label).width+14;const lx=x+(Math.cos(ang)>0?14:-14-tw),ly=y-12;
    ctx.fillStyle='rgba(255,255,255,.92)';ctx.beginPath();ctx.roundRect?ctx.roundRect(lx,ly,tw,fs+10,8):ctx.rect(lx,ly,tw,fs+10);ctx.fill();
    ctx.fillStyle=col;ctx.textAlign='left';ctx.fillText(label,lx+7,ly+fs+2);ctx.textAlign='center';};
  marker(base,.8,'#f0508e','Việt Nam');marker(base+Math.PI,.62,'#7c4dff','Mỹ');}
function skyFactor(h){return h>=6&&h<=18?Math.sin((h-6)/12*Math.PI):-Math.sin((((h-18)+24)%24)/12*Math.PI);}
function drawSky(){const{ctx,w,h}=skyC;if(!w)return;ctx.clearRect(0,0,w,h);
  const s=skyFactor(hour);const DAY=[[74,168,255],[191,230,255]],TW=[[96,98,190],[255,177,130]],NI=[[11,16,48],[38,48,107]];
  let top,bot;if(s>=0){const t=clamp(s/.35,0,1);top=mixRgb(TW[0],DAY[0],t);bot=mixRgb(TW[1],DAY[1],t);}else{const t=clamp(-s/.25,0,1);top=mixRgb(TW[0],NI[0],t);bot=mixRgb(TW[1],NI[1],t);}
  const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,rgb(top));g.addColorStop(1,rgb(bot));ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  const night=clamp(-s/.25,0,1),gy=h*.76;
  drawStars(ctx,w,gy,skyStars,night);
  const body=(hh,isSun)=>{const f=skyFactor(hh);const p=((hh-6+24)%24)/12;if(p>1.05)return;const x=w*(.9-.8*p),y=gy-f*(gy-28);
    if(isSun)drawSun(ctx,x,y,clamp(w/22,12,20),true);else{ctx.fillStyle='#f4f1dc';ctx.beginPath();ctx.arc(x,y,12,0,TAU);ctx.fill();ctx.fillStyle=rgb(top);ctx.beginPath();ctx.arc(x+5,y-3,10,0,TAU);ctx.fill();}};
  body(hour,true);if(night>.2)body((hour+12)%24,false);
  ctx.fillStyle=mix('#79c96f','#1f3a35',night*.8);ctx.beginPath();ctx.moveTo(0,gy);ctx.quadraticCurveTo(w*.3,gy-18,w*.55,gy-4);ctx.quadraticCurveTo(w*.8,gy+8,w,gy-10);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
  const hx=w*.2,hy=gy-6,hs=clamp(w/12,22,38);ctx.fillStyle=mix('#ffe0b3','#5a4d6d',night*.7);ctx.fillRect(hx-hs/2,hy-hs*.8,hs,hs*.8);
  ctx.fillStyle=mix('#f0508e','#5b2a48',night*.7);ctx.beginPath();ctx.moveTo(hx-hs*.65,hy-hs*.8);ctx.lineTo(hx,hy-hs*1.35);ctx.lineTo(hx+hs*.65,hy-hs*.8);ctx.fill();
  ctx.fillStyle=night>.5?'#ffd34d':mix('#7fb7e6','#ffd34d',night);ctx.fillRect(hx-hs*.2,hy-hs*.55,hs*.3,hs*.25);
  ctx.font=`${Math.round(hs)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;ctx.textAlign='center';ctx.fillText('🧍',w*.55,gy+4);
  const fs=Math.round(clamp(w/30,11,14));ctx.font=`800 ${fs}px Nunito, sans-serif`;
  ctx.fillStyle='#ffffff';ctx.textAlign='left';ctx.fillText('← Tây',8,h-10);ctx.textAlign='right';ctx.fillText('Đông →',w-8,h-10);ctx.textAlign='center';ctx.fillText('Bắc (trước mặt)',w*.55,h-10);}
function buoi(H){return H<4?'đêm':H<11?'sáng':H<13?'trưa':H<18?'chiều':H<22?'tối':'đêm';}
function fmt(h){const H=Math.floor(h),m=Math.round((h-H)*60);const hh=H%12||12;return{H,m,txt:`${hh} giờ${m?' '+m+' phút':''} ${buoi(H)}`,say:`${readNum(hh)} giờ${m?' '+readNum(m)+' phút':''} ${buoi(H)}`}}
function dayInfo(){const s=skyFactor(hour),vn=fmt(hour),us=fmt((hour+12)%24);
  const state=s>.08?'ban ngày ☀️':s<-.08?'ban đêm 🌙':(hour<12?'lúc bình minh 🌅':'lúc hoàng hôn 🌇');
  const usState=-s>.08?'ban ngày ☀️':-s<-.08?'ban đêm 🌙':'lúc trời chạng vạng';
  $('dInfo').innerHTML=`<p class="muted" style="margin:0">Ở Việt Nam bây giờ là</p><p class="big">${vn.txt}</p>
    <p class="lead">Việt Nam đang ${state}</p>
    <p class="muted" style="margin:0 0 10px">Ở miền Đông nước Mỹ (phía bên kia Trái Đất) khoảng ${us.txt}, đang ${usState}.</p>
    <div class="tip"><b>Vì sao có ngày và đêm?</b> Trái Đất hình cầu và luôn tự quay quanh mình nó. Nửa quay về phía Mặt Trời được chiếu sáng là ban ngày, nửa kia là ban đêm. Trái Đất quay một vòng hết 24 giờ, tức là một ngày đêm.</div>
    <button class="btn main" style="margin-top:10px" id="dSay">🔊 Đọc to</button>`;
  $('dSay').onclick=()=>speak(`Ở Việt Nam bây giờ là ${vn.say}. Việt Nam đang ${state.replace(/[^\p{L}\s]/gu,'')}.`);}
$('dHour').oninput=e=>{setHour(+e.target.value)};
$('dPlay').onclick=()=>{dPlaying=!dPlaying;$('dPlay').textContent=dPlaying?'⏸ Tạm dừng':'▶ Cho quay';};
root.querySelectorAll('#p-day [data-h]').forEach(b=>b.onclick=()=>{setHour(+b.dataset.h);const f=fmt(hour);speak(f.say);});
(function(){const c=$('cEarth');let drag=null;
  const ang=e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left-earthC.w*.62,y=e.clientY-r.top-earthC.h/2;return Math.atan2(-y,x)};
  c.addEventListener('pointerdown',e=>{drag={a:ang(e),h:hour};c.setPointerCapture(e.pointerId);if(dPlaying)$('dPlay').click();});
  c.addEventListener('pointermove',e=>{if(!drag)return;let d=ang(e)-drag.a;setHour(drag.h+d/TAU*24);});
  const end=()=>{drag=null};c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end);})();
dayInfo();

/* =====================================================================
   3. CÁC MÙA
   ===================================================================== */
let yDay=172,yPlaying=false,cityLat=21.03,cityName='Hà Nội';
const seasonC=makeCanvas('cSeason',w=>clamp(w*.64,300,560),()=>dirty=true);
const raysC=makeCanvas('cRays',w=>clamp(w*.5,150,230),()=>dirty=true);
const seasonStars=makeStars(130);
const TILT=23.44;
const decl=d=>TILT*Math.sin(TAU*(284+d)/365);
const noonElev=(lat,d)=>90-Math.abs(lat-decl(d));
function dayLength(lat,d){const p=lat*RAD,dl=decl(d)*RAD,c=(Math.sin(-.833*RAD)-Math.sin(p)*Math.sin(dl))/(Math.cos(p)*Math.cos(dl));return 2*Math.acos(clamp(c,-1,1))/RAD/15;}
const distMkm=d=>149.6*(1-.0167*Math.cos(TAU*(d-4)/365.25));
const dateOf=d=>{const t=new Date(Date.UTC(2026,0,Math.round(d)));return{day:t.getUTCDate(),m:t.getUTCMonth()+1}};
function setDay(d,fromPlay){yDay=((d-1)%365+365)%365+1;$('yDay').value=Math.round(yDay);dirty=true;seasonInfo();}
function seasonOf(m){const n=m>=2&&m<=4?'Mùa xuân 🌸':m>=5&&m<=7?'Mùa hạ ☀️':m>=8&&m<=10?'Mùa thu 🍂':'Mùa đông ❄️';
  const s=m>=5&&m<=11?'Mùa mưa 🌧️':'Mùa khô 🌤️';
  const a=m===12||m<=2?'Mùa hè ☀️':m<=5?'Mùa thu 🍂':m<=8?'Mùa đông ❄️':'Mùa xuân 🌸';return{n,s,a};}
let lastSeasonKey='';
function seasonInfo(){const{day,m}=dateOf(yDay),se=seasonOf(m);
  $('yDate').textContent=`Ngày ${day} tháng ${m}`;$('ySN').textContent=se.n;$('ySS').textContent=se.s;$('ySA').textContent=se.a;
  const d=Math.round(yDay),dist=distMkm(d),el=noonElev(cityLat,d),dl=dayLength(cityLat,d);
  const co=$('yCallout');let key,html;
  if(d>=335||d<=45){key='near';html='💡 <b>Bất ngờ chưa!</b> Lúc này Trái Đất ở <b>gần</b> Mặt Trời nhất trong năm, vậy mà miền Bắc lại đang mùa đông. Vậy mùa <b>không</b> phải do Trái Đất ở gần hay xa Mặt Trời.';}
  else if(d>=160&&d<=215){key='far';html='💡 <b>Bất ngờ chưa!</b> Lúc này Trái Đất ở <b>xa</b> Mặt Trời nhất trong năm, vậy mà miền Bắc lại đang mùa hạ nóng nực.';}
  else{key='tilt';html='💡 <b>Vì sao có các mùa?</b> Trục Trái Đất luôn nghiêng về một phía. Nửa nào của Trái Đất ngả về phía Mặt Trời thì được nắng chiếu thẳng hơn, ngày dài hơn, nên là mùa hè. Nửa kia là mùa đông.';}
  if(key!==lastSeasonKey){co.innerHTML=html;co.classList.toggle('hot',key!=='tilt');lastSeasonKey=key;}
  const word=el>=80?'gần như thẳng đứng':el>=65?'hơi xiên':'xiên nhiều';
  $('yRayTxt').textContent=`${cityName}: nắng trưa chiếu ${word} (góc ${Math.round(el)}°).`;
  const dh=Math.floor(dl),dm=Math.round((dl-dh)*60),nl=24-dl,nh=Math.floor(nl),nm=Math.round((nl-nh)*60);
  $('yDayBar').innerHTML=`<div class="dd" style="width:${dl/24*100}%">☀️ ${dh} giờ ${dm} phút</div><div class="nn" style="width:${nl/24*100}%">🌙 ${nh} giờ ${nm} phút</div>`;
  $('yDayTxt').textContent=`Ở ${cityName}, ban ngày ${dl>12.15?'dài hơn':dl<11.85?'ngắn hơn':'gần bằng'} ban đêm.`;
  $('yDist').textContent=`${dist.toFixed(1).replace('.',',')} triệu km`;
  $('yMeter').style.left=clamp((dist-147.1)/5*100,0,100)+'%';}
function drawSeason(){const{ctx,w,h}=seasonC;if(!w)return;ctx.clearRect(0,0,w,h);ctx.fillStyle='#0b0f2e';ctx.fillRect(0,0,w,h);drawStars(ctx,w,h,seasonStars,.9);
  const cx=w/2,cy=h*.5,a=w*.37,b=Math.min(h*.3,a*.42),k=clamp(w/720,.65,1.2),fs=Math.round(12*k+1);
  ctx.strokeStyle='rgba(170,180,255,.35)';ctx.lineWidth=1.5;ctx.setLineDash([5,6]);ctx.beginPath();ctx.ellipse(cx,cy,a,b,0,0,TAU);ctx.stroke();ctx.setLineDash([]);
  const thetaOf=d=>Math.PI+TAU*(d-172)/365.25;
  const posOf=d=>{const t=thetaOf(d);return{x:cx+a*Math.cos(t),y:cy-b*Math.sin(t)}};
  [[80,'21/3'],[172,'21/6'],[266,'23/9'],[356,'22/12']].forEach(([d,l])=>{const p=posOf(d);ctx.fillStyle='rgba(200,206,255,.75)';ctx.font=`700 ${fs}px Nunito, sans-serif`;ctx.textAlign='center';
    ctx.beginPath();ctx.arc(p.x,p.y,3,0,TAU);ctx.fill();const side=Math.abs(p.y-cy)<10,oy=side?4:p.y<cy?-16:26,ox=side?(p.x<cx?-1:1)*(34*k+12):0;ctx.fillText(l,p.x+ox,p.y+oy);});
  for(let mm=0;mm<12;mm++){const d=dnum(mm)+15,p=posOf(d),dx=p.x-cx,dy=p.y-cy,n=Math.hypot(dx,dy);ctx.fillStyle='rgba(255,211,77,.55)';ctx.font=`800 ${Math.round(fs*.85)}px Nunito, sans-serif`;
    ctx.fillText('T'+(mm+1),p.x-dx/n*20*k,p.y-dy/n*14*k+4);}
  const E=posOf(yDay),sunR=30*k,depth=(E.y-cy)/b,er=25*k*(1+.12*depth);
  const drawE=()=>{const dx=cx-E.x,dy=cy-E.y,n=Math.hypot(dx,dy)||1,lx=dx/n,ly=dy/n;
    shadeBall(ctx,E.x,E.y,er,'#3b8ef0',lx,ly);
    const ax=Math.sin(TILT*RAD),ay=-Math.cos(TILT*RAD),px=-ay,py=ax;
    ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(E.x-px*er,E.y-py*er);ctx.lineTo(E.x+px*er,E.y+py*er);ctx.stroke();
    ctx.strokeStyle='#ffffff';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(E.x-ax*er*1.5,E.y-ay*er*1.5);ctx.lineTo(E.x+ax*er*1.5,E.y+ay*er*1.5);ctx.stroke();
    ctx.fillStyle='#fff';ctx.font=`800 ${fs}px Nunito, sans-serif`;ctx.textAlign='center';ctx.fillText('B',E.x+ax*er*1.5+ax*9,E.y+ay*er*1.5+ay*9+4);
    const lat=16*RAD,side=Math.sign(px*lx+py*ly)||1,vx=E.x+ax*er*Math.sin(lat)+px*side*er*Math.cos(lat)*.75,vy=E.y+ay*er*Math.sin(lat)+py*side*er*Math.cos(lat)*.75;
    ctx.fillStyle='#f0508e';ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(vx,vy,4.5*k,0,TAU);ctx.fill();ctx.stroke();
    const lab='Trái Đất';ctx.fillStyle='rgba(235,238,255,.95)';ctx.fillText(lab,E.x,E.y+er+18*k);};
  if(E.y<cy)drawE();drawSun(ctx,cx,cy,sunR,true);if(E.y>=cy)drawE();
  ctx.fillStyle='rgba(235,238,255,.85)';ctx.font=`700 ${fs}px Nunito, sans-serif`;ctx.textAlign='left';
  ctx.fillText('B: Bắc Cực',12,h-30);ctx.fillStyle='#ff8fb6';ctx.fillText('● Việt Nam',12,h-12);
  drawRays();}
function dnum(m){return Math.round(Date.UTC(2026,m,1)/864e5-Date.UTC(2026,0,0)/864e5);}
function drawRays(){const{ctx,w,h}=raysC;if(!w)return;ctx.clearRect(0,0,w,h);
  const el=noonElev(cityLat,Math.round(yDay))*RAD,gy=h-30;
  const g=ctx.createLinearGradient(0,0,0,gy);g.addColorStop(0,'#8ccfff');g.addColorStop(1,'#d9f0ff');ctx.fillStyle=g;ctx.fillRect(0,0,w,gy);
  ctx.fillStyle='#86c97a';ctx.fillRect(0,gy,w,h-gy);
  const dx=Math.cos(el),dy=Math.sin(el),beam=34,hitX=w*.3,half=beam/Math.sin(el)/2;
  const L=Math.max(w,h)*2;
  ctx.fillStyle='rgba(255,205,60,.38)';ctx.beginPath();ctx.moveTo(hitX-half,gy);ctx.lineTo(hitX+half,gy);ctx.lineTo(hitX+half-dx*L,gy-dy*L);ctx.lineTo(hitX-half-dx*L,gy-dy*L);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(240,150,0,.8)';ctx.lineWidth=1.5;ctx.fillStyle='rgba(240,150,0,.9)';
  for(const o of[-.35,.35]){const sx=hitX+o*half*2*.9;ctx.beginPath();ctx.moveTo(sx-dx*70,gy-dy*70);ctx.lineTo(sx-dx*8,gy-dy*8);ctx.stroke();arrowHead(ctx,sx-dx*4,gy-dy*4,Math.atan2(dy,dx),8);}
  ctx.fillStyle='#ffb000';ctx.fillRect(hitX-half,gy-2,half*2,6);
  const K=Math.min((hitX-16)/Math.max(dx,.01),(gy-18)/dy);drawSun(ctx,hitX-dx*K,gy-dy*K,13,false);
  const px=w*.68,ph=clamp(h*.5,50,110),sl=Math.min(ph/Math.tan(el),w*.3);
  ctx.fillStyle='rgba(30,40,40,.35)';ctx.fillRect(px,gy-1,sl,5);
  ctx.strokeStyle='#5b4a3a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(px,gy);ctx.lineTo(px,gy-ph);ctx.stroke();
  ctx.fillStyle='#e5404f';ctx.beginPath();ctx.moveTo(px,gy-ph);ctx.lineTo(px+22,gy-ph+7);ctx.lineTo(px,gy-ph+14);ctx.fill();
  ctx.fillStyle='#ffd34d';ctx.beginPath();ctx.arc(px+8,gy-ph+7,2.2,0,TAU);ctx.fill();
  ctx.fillStyle='#24402a';ctx.font='800 12px Nunito, sans-serif';ctx.textAlign='center';ctx.fillText('Vệt nắng',hitX,h-9);ctx.fillText('Bóng cột cờ',px+Math.max(sl,30)/2,h-9);}
$('yDay').oninput=e=>{setDay(+e.target.value)};
$('yPlay').onclick=()=>{yPlaying=!yPlaying;$('yPlay').textContent=yPlaying?'⏸ Tạm dừng':'▶ Chạy cả năm';};
root.querySelectorAll('#p-season [data-d]').forEach(b=>b.onclick=()=>setDay(+b.dataset.d));
$('yToday').onclick=()=>{const n=new Date();setDay(Math.round((Date.UTC(2026,n.getMonth(),n.getDate())-Date.UTC(2026,0,0))/864e5));};
$('yCities').addEventListener('click',e=>{const b=e.target.closest('[data-lat]');if(!b)return;cityLat=+b.dataset.lat;cityName=b.dataset.n;
  root.querySelectorAll('#yCities [data-lat]').forEach(x=>x.setAttribute('aria-pressed',x===b));seasonInfo();dirty=true;});
seasonInfo();

/* ---------- câu hỏi ---------- */
makeQuiz($('qSolar'),[
 {q:'Hành tinh nào ở gần Mặt Trời nhất?',a:['Sao Thủy','Sao Kim','Trái Đất','Sao Hỏa'],why:'Thứ tự từ gần đến xa: Thủy, Kim, Trái Đất, Hỏa, Mộc, Thổ, Thiên Vương, Hải Vương.'},
 {q:'Hành tinh nào lớn nhất trong hệ Mặt Trời?',a:['Sao Mộc','Sao Thổ','Trái Đất','Sao Hải Vương'],why:'Sao Mộc to gấp khoảng 11 lần Trái Đất.'},
 {q:'Trái Đất là hành tinh thứ mấy tính từ Mặt Trời?',a:['Thứ ba','Thứ nhất','Thứ hai','Thứ tư'],why:'Trái Đất đứng sau Sao Thủy và Sao Kim.'},
 {q:'Mặt Trời là gì?',a:['Một ngôi sao','Một hành tinh','Một vệ tinh','Một sao chổi'],why:'Mặt Trời là ngôi sao tự phát ra ánh sáng và nhiệt.'},
 {q:'Mặt Trăng quay quanh thiên thể nào?',a:['Trái Đất','Mặt Trời','Sao Hỏa','Sao Mộc'],why:'Mặt Trăng là vệ tinh tự nhiên của Trái Đất, mỗi vòng khoảng 27 ngày.'},
 {q:'Hành tinh nào có vành đai đẹp, dễ nhận ra nhất?',a:['Sao Thổ','Sao Hỏa','Sao Kim','Sao Thủy'],why:'Vành đai Sao Thổ gồm vô số mảnh băng và đá nhỏ.'}]);
makeQuiz($('qDay'),[
 {q:'Vì sao có ngày và đêm?',a:['Vì Trái Đất tự quay quanh mình nó','Vì Mặt Trời quay quanh Trái Đất','Vì mây che Mặt Trời','Vì Mặt Trăng che Mặt Trời'],why:'Nửa Trái Đất quay về phía Mặt Trời là ban ngày, nửa kia là ban đêm.'},
 {q:'Trái Đất tự quay một vòng hết bao lâu?',a:['24 giờ','12 giờ','7 ngày','1 năm'],why:'Một vòng tự quay là một ngày đêm, dài 24 giờ.'},
 {q:'Mặt Trời mọc ở phía nào?',a:['Phía Đông','Phía Tây','Phía Nam','Phía Bắc'],why:'Mặt Trời mọc ở phía Đông và lặn ở phía Tây.'},
 {q:'Khi Việt Nam đang ban ngày thì nước Mỹ ở phía bên kia Trái Đất thường đang là gì?',a:['Ban đêm','Ban ngày','Giữa trưa','Không xác định được'],why:'Hai nơi ở hai phía đối diện của Trái Đất nên một nơi sáng thì nơi kia tối.'},
 {q:'Em đứng giang tay, tay phải chỉ phía Mặt Trời mọc. Trước mặt em là phía nào?',a:['Phía Bắc','Phía Nam','Phía Đông','Phía Tây'],why:'Tay phải chỉ Đông, tay trái chỉ Tây, trước mặt là Bắc, sau lưng là Nam.'}]);
makeQuiz($('qSeason'),[
 {q:'Trái Đất đi hết một vòng quanh Mặt Trời mất khoảng bao lâu?',a:['Một năm','Một ngày','Một tháng','Một tuần'],why:'Trái Đất đi một vòng quanh Mặt Trời mất khoảng 365 ngày, tức là một năm.'},
 {q:'Vì sao có các mùa trong năm?',a:['Vì trục Trái Đất nghiêng','Vì Trái Đất lúc gần lúc xa Mặt Trời','Vì Mặt Trời lúc to lúc nhỏ','Vì Mặt Trăng che bớt nắng'],why:'Trục nghiêng làm mỗi nửa Trái Đất lần lượt được nắng chiếu thẳng hơn hoặc xiên hơn.'},
 {q:'Miền Nam nước ta có mấy mùa rõ rệt?',a:['Hai mùa: mưa và khô','Bốn mùa','Một mùa','Ba mùa'],why:'Miền Nam có mùa mưa (khoảng tháng 5 đến 11) và mùa khô.'},
 {q:'Đầu tháng 1, Trái Đất ở gần Mặt Trời nhất. Khi đó miền Bắc nước ta đang mùa gì?',a:['Mùa đông','Mùa hạ','Mùa xuân','Mùa thu'],why:'Điều này cho thấy mùa không phải do Trái Đất gần hay xa Mặt Trời.'},
 {q:'Khi nắng buổi trưa chiếu càng thẳng thì sao?',a:['Trời nóng hơn, bóng ngắn hơn','Trời lạnh hơn, bóng dài hơn','Trời tối hơn','Không có gì thay đổi'],why:'Nắng chiếu thẳng dồn nhiệt vào vùng nhỏ hơn nên nóng hơn, bóng cũng ngắn lại.'}]);


    rafId = window.requestAnimationFrame(loop);

    return () => {
      destroyed = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      cleanupFns.splice(0).forEach((fn) => { try { fn(); } catch (_) {} });
      try { if (speech) speech.cancel(); } catch (_) {}
    };
  }
})();
