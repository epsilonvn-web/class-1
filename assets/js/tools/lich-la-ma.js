(() => {
  "use strict";

  const MODULE_KEY = 'calendarRoman';
  const STYLE_ID = 'class1-tool-calendar-roman-style-v1';
  const ROOT_ID = 'class1-tool-calendar-roman';

  const timers = new Set();
  let active = false;
  let ctx = null;
  let disposeSpeech = null;
  // Cung nguon Google TTS voi loi chao cua app Lop 1, cho ca vi va en.
  // Mot audio duy nhat, duoc dung/huy khi chuyen tab, doi ngon ngu hoac roi tool.
  let googleAudio = null;

  function scopedDocument(host) {
    const real = window.document;
    return {
      getElementById(id) { return host.querySelector(`[id="${String(id).replace(/"/g, '\"')}"]`); },
      querySelector(sel) { return host.querySelector(sel); },
      querySelectorAll(sel) { return host.querySelectorAll(sel); },
      createElement(tag) { return real.createElement(tag); },
      createElementNS(ns, tag) { return real.createElementNS(ns, tag); },
      addEventListener(type, fn, opts) { host.addEventListener(type, fn, opts); },
      removeEventListener(type, fn, opts) { host.removeEventListener(type, fn, opts); }
    };
  }

  function schedule(fn, ms) {
    const id = window.setTimeout(() => {
      timers.delete(id);
      if (active) fn();
    }, ms);
    timers.add(id);
    return id;
  }

  function clearTimers() {
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
  }

  function stopSpeech() {
    // Dung Google Audio, huy phat/tai khi chuyen ngu canh.
    if (googleAudio) {
      try {
        googleAudio.onerror = null;
        googleAudio.onplaying = null;
        googleAudio.onended = null;
        googleAudio.pause();
        googleAudio.currentTime = 0;
        googleAudio.removeAttribute('src');
        googleAudio.load();
      } catch (_) {}
    }
  }

  function ensureStyle() {
    if (window.document.getElementById(STYLE_ID)) return;
    const style = window.document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
    #class1-tool-calendar-roman{--tool-ink:#344054;--tool-muted:#667085;--tool-pink:#ec4899;--tool-purple:#8b5cf6;--tool-blue:#3b82f6;--tool-green:#10b981;--tool-amber:#f59e0b;color:var(--tool-ink);font-size:16px;line-height:1.45;width:100%;display:grid;gap:14px}
    #class1-tool-calendar-roman *{box-sizing:border-box}
    #class1-tool-calendar-roman button,#class1-tool-calendar-roman input{font:inherit}
    #class1-tool-calendar-roman button{cursor:pointer}
    #class1-tool-calendar-roman .tool-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:13px 14px;border:1px solid #ddd6fe;border-radius:18px;background:linear-gradient(90deg,#fff1f7,#f5f3ff,#eff8ff);box-shadow:0 4px 14px rgba(139,92,246,.06)}
    #class1-tool-calendar-roman .tool-head-copy{flex:1 1 290px;min-width:0}
    #class1-tool-calendar-roman .tool-head-actions{display:flex;align-items:center;justify-content:flex-end;gap:9px;flex-wrap:wrap;margin-left:auto}
    #class1-tool-calendar-roman .lang-switch{display:inline-flex;align-items:center;gap:4px;padding:3px;border:1px solid #bfdbfe;border-radius:14px;background:#fff;box-shadow:0 3px 9px rgba(59,130,246,.08)}
    #class1-tool-calendar-roman .lang-switch button{min-height:38px;padding:0 13px;border:0;border-radius:10px;background:transparent;color:#475569;font-weight:900;white-space:nowrap}
    #class1-tool-calendar-roman .lang-switch button[aria-pressed="true"]{background:linear-gradient(90deg,#3b82f6,#10b981);color:#fff;box-shadow:0 3px 9px rgba(16,185,129,.16)}
    #class1-tool-calendar-roman .tool-audio-notice{border:1px solid #bfdbfe;border-radius:13px;padding:9px 12px;color:#1e40af;background:#eff6ff;font-size:14px;font-weight:750}
    #class1-tool-calendar-roman .tool-head h2{margin:0;color:#5b217a;font-size:21px;line-height:1.2;font-weight:950}
    #class1-tool-calendar-roman .tool-head p{margin:3px 0 0;color:var(--tool-muted);font-size:15px}
    #class1-tool-calendar-roman .back-btn,#class1-tool-calendar-roman .btn,#class1-tool-calendar-roman .chip,#class1-tool-calendar-roman .tab,#class1-tool-calendar-roman .qopt,#class1-tool-calendar-roman .opt{border:1px solid #e9d5ff;border-radius:14px;background:#fff;color:#475467;font-weight:850;transition:transform .15s ease,filter .15s ease,box-shadow .15s ease}
    #class1-tool-calendar-roman button:hover{filter:brightness(1.055);transform:translateY(-1px);box-shadow:0 6px 14px rgba(76,29,149,.12)}
    #class1-tool-calendar-roman button:active{transform:translateY(0)}
    #class1-tool-calendar-roman button:disabled{cursor:not-allowed;opacity:.55;transform:none;box-shadow:none}
    #class1-tool-calendar-roman .back-btn{padding:9px 13px;color:#fff;border:0;background:linear-gradient(90deg,#ec4899,#8b5cf6)}
    #class1-tool-calendar-roman .main{color:#fff!important;border-color:transparent!important;background:linear-gradient(90deg,#ec4899,#8b5cf6)!important;box-shadow:0 6px 14px rgba(139,92,246,.16)}
    #class1-tool-calendar-roman .tabs{display:flex;gap:8px;flex-wrap:wrap}
    #class1-tool-calendar-roman .tab{padding:9px 14px}
    #class1-tool-calendar-roman .tab[aria-selected="true"],#class1-tool-calendar-roman .chip[aria-pressed="true"]{color:#fff;border-color:transparent;background:linear-gradient(90deg,#ec4899,#8b5cf6)}
    #class1-tool-calendar-roman .panel,#class1-tool-calendar-roman .card{border:1px solid #e9d5ff;border-radius:20px;background:linear-gradient(145deg,#fff,#faf5ff);padding:14px;box-shadow:0 6px 16px rgba(76,29,149,.06)}
    #class1-tool-calendar-roman .muted{color:var(--tool-muted)}
    #class1-tool-calendar-roman .big{font-size:19px;font-weight:950;color:#6d28d9}
    #class1-tool-calendar-roman .hidden{display:none!important}
    #class1-tool-calendar-roman input{min-height:42px;border:1px solid #d8b4fe;border-radius:12px;padding:8px 10px;background:#fff;color:#344054}
    #class1-tool-calendar-roman .chip{padding:8px 11px}
    #class1-tool-calendar-roman .row{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
    #class1-tool-calendar-roman .grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    #class1-tool-calendar-roman .grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    #class1-tool-calendar-roman .feedback,#class1-tool-calendar-roman .fb{min-height:28px;font-weight:900}
    #class1-tool-calendar-roman .ok{color:#047857!important;border-color:#86efac!important;background:#ecfdf5!important}
    #class1-tool-calendar-roman .no{color:#be123c!important;border-color:#fecdd3!important;background:#fff1f2!important}
    @media(max-width:760px){#class1-tool-calendar-roman{font-size:15px}#class1-tool-calendar-roman .tool-head{align-items:flex-start}#class1-tool-calendar-roman .tool-head h2{font-size:19px}#class1-tool-calendar-roman .tool-head-actions{width:100%;justify-content:flex-end}#class1-tool-calendar-roman .grid2,#class1-tool-calendar-roman .grid3{grid-template-columns:1fr}}
    @media(max-width:390px){#class1-tool-calendar-roman .tool-head-actions{justify-content:space-between}#class1-tool-calendar-roman .lang-switch button{padding:0 9px;min-height:38px}}
    @media(prefers-reduced-motion:reduce){#class1-tool-calendar-roman *{transition:none!important;scroll-behavior:auto!important}}

    #class1-tool-calendar-roman .cal-nav{display:grid;grid-template-columns:auto 1fr auto auto;gap:8px;align-items:center}
    #class1-tool-calendar-roman .cal-nav h3{margin:0;text-align:center;color:#6d28d9;font-size:19px}
    #class1-tool-calendar-roman .cal{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;margin-top:10px}
    #class1-tool-calendar-roman .dow{text-align:center;font-size:12px;font-weight:950;color:#64748b;padding:5px}
    #class1-tool-calendar-roman .sun{color:#e11d48}
    #class1-tool-calendar-roman .day{min-height:42px;border:1px solid #e9d5ff;border-radius:11px;background:#fff;font-weight:900;color:#344054}
    #class1-tool-calendar-roman .day.empty{visibility:hidden}
    #class1-tool-calendar-roman .day.today{border-color:#38bdf8;box-shadow:inset 0 0 0 1px #38bdf8}
    #class1-tool-calendar-roman .day.sel{color:#fff;background:linear-gradient(90deg,#ec4899,#8b5cf6);border-color:transparent}
    #class1-tool-calendar-roman .months{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;margin-top:10px}
    #class1-tool-calendar-roman .m{display:flex;justify-content:space-between;gap:6px;padding:7px 8px;border-radius:11px;background:#fff;border:1px solid #e2e8f0;font-size:13px}
    #class1-tool-calendar-roman .m31{border-color:#bfdbfe}#class1-tool-calendar-roman .m30{border-color:#bbf7d0}#class1-tool-calendar-roman .m28{border-color:#fecdd3}
    #class1-tool-calendar-roman .info p{margin:5px 0}
    #class1-tool-calendar-roman .main{color:#fff;border:0;background:linear-gradient(90deg,#3b82f6,#10b981);padding:9px 13px}
    #class1-tool-calendar-roman .form-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    #class1-tool-calendar-roman label{display:grid;gap:5px;font-weight:850;color:#475467}
    #class1-tool-calendar-roman .presets{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}
    #class1-tool-calendar-roman .strip{display:flex;gap:5px;overflow:auto;padding:6px 0}
    #class1-tool-calendar-roman .cell{min-width:58px;text-align:center;border:1px solid #e2e8f0;border-radius:10px;padding:5px;background:#fff;font-size:11px}
    #class1-tool-calendar-roman .cell b{display:block;font-size:18px}#class1-tool-calendar-roman .cell i{display:block;color:#64748b;font-style:normal}
    #class1-tool-calendar-roman .roman-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    #class1-tool-calendar-roman .roman-fields label,#class1-tool-calendar-roman .form-row label,#class1-tool-calendar-roman .grid2 > *{min-width:0}
    #class1-tool-calendar-roman .roman-fields input,#class1-tool-calendar-roman .form-row input{display:block;width:100%;min-width:0;max-width:100%}
    #class1-tool-calendar-roman .parts{display:flex;gap:7px;flex-wrap:wrap;align-items:center;margin:10px 0}
    #class1-tool-calendar-roman .part{min-width:75px;padding:7px 9px;border-radius:12px;background:#fff;border:1px solid #ddd6fe;text-align:center}
    #class1-tool-calendar-roman .part b{display:block;font-size:20px;color:#7c3aed}#class1-tool-calendar-roman .part span{font-size:12px;color:#64748b}
    #class1-tool-calendar-roman .plus{font-weight:950;color:#94a3b8}
    #class1-tool-calendar-roman .rgrid{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:5px}
    #class1-tool-calendar-roman .rbtn{border:1px solid #dbeafe;border-radius:10px;background:#fff;padding:7px 3px}#class1-tool-calendar-roman .rbtn b{display:block;color:#2563eb}#class1-tool-calendar-roman .rbtn span{font-size:11px;color:#64748b}
    #class1-tool-calendar-roman .qopts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
    #class1-tool-calendar-roman .qopt{min-height:44px;padding:8px}
    @media(max-width:760px){#class1-tool-calendar-roman .cal-nav{grid-template-columns:auto 1fr auto}#class1-tool-calendar-roman .cal-nav #today{grid-column:1/-1}#class1-tool-calendar-roman .months{grid-template-columns:repeat(3,minmax(0,1fr))}#class1-tool-calendar-roman .rgrid{grid-template-columns:repeat(5,minmax(0,1fr))}#class1-tool-calendar-roman .qopts{grid-template-columns:repeat(2,minmax(0,1fr))}#class1-tool-calendar-roman .roman-fields,#class1-tool-calendar-roman .form-row{grid-template-columns:1fr}}
`;
    window.document.head.appendChild(style);
  }

  function toolHtml() { return `<div id="class1-tool-calendar-roman" class="tool-shell">
  <div class="tool-head">
    <div class="tool-head-copy"><h2 data-i18n="title">📅 Lịch, khoảng ngày và số La Mã</h2><p data-i18n="subtitle">Học xem lịch, tính khoảng ngày và làm quen số La Mã.</p></div>
    <div class="tool-head-actions">
      <button class="back-btn" data-tool-back type="button">← Tools</button>
      <div class="lang-switch" role="group" aria-label="Language / Ngôn ngữ">
        <button type="button" data-lang="vi" aria-pressed="true">Tiếng Việt</button>
        <button type="button" data-lang="en" aria-pressed="false">English</button>
      </div>
    </div>
  </div>
  <div id="toolAudioNotice" class="tool-audio-notice hidden" role="status" aria-live="polite"></div>
  <div class="tabs" role="tablist"><button class="tab" data-p="calPanel" data-i18n="calTab" aria-selected="true" type="button">📅 Lịch</button><button class="tab" data-p="gapPanel" data-i18n="gapTab" aria-selected="false" type="button">🗓️ Khoảng ngày</button><button class="tab" data-p="romanPanel" data-i18n="romanTab" aria-selected="false" type="button">🏛️ Số La Mã</button></div>
  <section id="calPanel" class="panel"><div class="cal-nav"><button id="prev" class="btn" data-i18n="prevMonth" type="button">← Tháng trước</button><h3 id="calTitle"></h3><button id="next" class="btn" data-i18n="nextMonth" type="button">Tháng sau →</button><button id="today" class="btn main" data-i18n="today" type="button">Hôm nay</button></div><div id="cal" class="cal"></div><div class="grid2" style="margin-top:12px"><div id="info" class="card info"></div><div class="card"><strong data-i18n="monthsTitle">12 tháng trong năm</strong><div id="months" class="months"></div></div></div></section>
  <section id="gapPanel" class="panel hidden"><div class="grid2"><div class="card"><h3 data-i18n="dateGapTitle">Khoảng cách giữa hai ngày</h3><div class="form-row"><label><span data-i18n="fromDate">Từ ngày</span><input id="gFrom" type="date"></label><label><span data-i18n="toDate">Đến ngày</span><input id="gTo" type="date"></label></div><div id="presets" class="presets"></div><div id="gAns"></div><div id="gStrip" class="strip"></div></div><div class="card"><h3 data-i18n="addTitle">Cộng hoặc trừ số ngày</h3><label><span data-i18n="startDate">Ngày bắt đầu</span><input id="aFrom" type="date"></label><label style="margin-top:8px"><span data-i18n="numDays">Số ngày</span><input id="aN" type="number" min="0" max="100000" value="7"></label><div id="aDir" class="row" style="margin-top:9px"><button class="chip" data-d="1" data-i18n="after" aria-pressed="true" type="button">Sau</button><button class="chip" data-d="-1" data-i18n="before" aria-pressed="false" type="button">Trước</button></div><div id="aAns" style="margin-top:10px"></div></div></div></section>
  <section id="romanPanel" class="panel hidden"><div class="grid2"><div class="card"><h3 data-i18n="romanConvertTitle">Đổi số ↔ số La Mã</h3><div class="roman-fields"><label><span data-i18n="naturalNumber">Số tự nhiên</span><input id="rNum" inputmode="numeric" value="14"></label><label><span data-i18n="romanNumber">Số La Mã</span><input id="rRom" autocomplete="off" value="XIV"></label></div><div id="rErr" class="fb no" style="background:transparent!important;border:0!important" aria-live="polite"></div><div id="rParts" class="parts"></div><strong data-i18n="tableTitle">Bảng 1–20</strong><div id="rGrid" class="rgrid" style="margin-top:8px"></div></div><div class="card"><h3 data-i18n="quizTitle">Đố vui số La Mã</h3><p id="qText" class="big"></p><div id="qOpts" class="qopts"></div><div class="row" style="justify-content:space-between;margin-top:9px"><div id="qFb" class="fb" aria-live="polite"></div><strong id="qScore">Đúng 0 / 0</strong></div></div></div></section>
</div>`; }

  function initTool(host) {
    const document = scopedDocument(host);
    const setTimeoutLocal = schedule;
    let lang = 'vi';
    const UI = {
      vi: {
        title:'📅 Lịch, khoảng ngày và số La Mã', subtitle:'Học xem lịch, tính khoảng ngày và làm quen số La Mã.',
        calTab:'📅 Lịch',gapTab:'🗓️ Khoảng ngày',romanTab:'🏛️ Số La Mã',
        prevMonth:'← Tháng trước',nextMonth:'Tháng sau →',today:'Hôm nay',monthsTitle:'12 tháng trong năm',
        dateGapTitle:'Khoảng cách giữa hai ngày',fromDate:'Từ ngày',toDate:'Đến ngày',
        addTitle:'Cộng hoặc trừ số ngày',startDate:'Ngày bắt đầu',numDays:'Số ngày',after:'Sau',before:'Trước',
        romanConvertTitle:'Đổi số ↔ số La Mã',naturalNumber:'Số tự nhiên',romanNumber:'Số La Mã',
        tableTitle:'Bảng 1–20',quizTitle:'Đố vui số La Mã'
      },
      en: {
        title:'📅 Calendar, Date Calculations & Roman Numerals',subtitle:'Read calendars, count days between dates, and explore Roman numerals.',
        calTab:'📅 Calendar',gapTab:'🗓️ Date calculations',romanTab:'🏛️ Roman numerals',
        prevMonth:'← Previous month',nextMonth:'Next month →',today:'Today',monthsTitle:'12 months of the year',
        dateGapTitle:'Days between two dates',fromDate:'From',toDate:'To',
        addTitle:'Add or subtract days',startDate:'Start date',numDays:'Number of days',after:'After',before:'Before',
        romanConvertTitle:'Numbers ↔ Roman numerals',naturalNumber:'Whole number',romanNumber:'Roman numeral',
        tableTitle:'Numbers 1–20',quizTitle:'Roman numeral quiz'
      }
    };
    const tr = key => UI[lang][key];
    const enDays = n => `${n} day${n === 1 ? '' : 's'}`;
    const enWeeks = n => `${n} week${n === 1 ? '' : 's'}`;
    function renderStaticText() {
      document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = tr(el.dataset.i18n); });
      document.querySelectorAll('[data-lang]').forEach(btn => btn.setAttribute('aria-pressed',String(btn.dataset.lang === lang)));
    }
    /* ---------- speech & numbers ---------- */
    const DG=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
    function two(n){const t=Math.floor(n/10),u=n%10;if(n<10)return DG[n];let s=t===1?'mười':DG[t]+' mươi';if(u===0)return s;
      if(u===5)return s+' lăm';if(u===1&&t>1)return s+' mốt';if(u===4&&t>1)return s+' tư';return s+' '+DG[u];}
    function three(n){const h=Math.floor(n/100),r=n%100;let s=DG[h]+' trăm';if(r===0)return s;if(r<10)return s+' linh '+DG[r];return s+' '+two(r);}
    function readNum(n){if(n<100)return two(n);if(n<1000)return three(n);const k=Math.floor(n/1000),r=n%1000;let s=(k<100?two(k):three(k))+' nghìn';
      if(r===0)return s;if(r<100)return s+' không trăm '+(r<10?'linh '+DG[r]:two(r));return s+' '+three(r);}
    // Both languages use Google Translate TTS audio (no browser voice fallback).
    // "en" requests English; this service does not expose a fixed female US voice ID.
    const googleTtsUrl = (text, language) =>
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=${language==='en'?'en':'vi'}&client=tw-ob&q=${encodeURIComponent(text)}`;
    let soundVersion = 0, lastSpeech = { text:'',lang:'',time:0 };
    const audioNotice=document.getElementById('toolAudioNotice');
    function notice(message='') {
      audioNotice.textContent=message;
      audioNotice.classList.toggle('hidden',!message);
    }
    function cancelSpeech() { soundVersion++; stopSpeech(); lastSpeech={text:'',lang:'',time:0}; notice(); }
    disposeSpeech=cancelSpeech;
    function speak(t){
      const text=String(t||'').replace(/\s+/g,' ').trim();
      if(!text||!active)return;
      const time=Date.now();
      if(lastSpeech.text===text&&lastSpeech.lang===lang&&time-lastSpeech.time<250)return;
      const version=++soundVersion,language=lang;
      stopSpeech();notice();
      lastSpeech={text,lang:language,time};
      if(typeof window.Audio!=='function'){
        notice(language==='en'?'Audio is unavailable in this browser.':'Trình duyệt này chưa hỗ trợ phát âm thanh.');
        lastSpeech={text:'',lang:'',time:0};
        return;
      }
      const current=()=>version===soundVersion&&active&&lang===language;
      const failed=()=>{
        if(!current())return;
        lastSpeech={text:'',lang:'',time:0};
        notice(language==='en'
          ?'Google English audio is unavailable. Please try listening again.'
          :'Chưa phát được Google TTS tiếng Việt. Bé hãy bấm nghe lại nhé!');
      };
      try{
        const audio=googleAudio||(googleAudio=new window.Audio());
        audio.referrerPolicy='no-referrer';
        audio.preload='none';
        audio.onerror=failed;
        audio.onplaying=()=>{if(current())notice();};
        audio.onended=()=>{if(current())notice();};
        audio.src=googleTtsUrl(text,language);
        audio.playbackRate=language==='en'?1:.96;
        notice(language==='en'?'Loading Google voice…':'Đang tải giọng đọc…');
        const playing=audio.play();
        if(playing&&typeof playing.catch==='function')playing.catch(failed);
      }catch(_){failed();}
    }

    /* ---------- tabs ---------- */
    document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{cancelSpeech();document.querySelectorAll('.tab').forEach(x=>{x.setAttribute('aria-selected',x===b);document.getElementById(x.dataset.p).classList.toggle('hidden',x!==b)})});

    /* ---------- date helpers (UTC day numbers, không lệch múi giờ) ---------- */
    const DOWVI=['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
    const DOWEN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const DOWS_VI=['CN','T2','T3','T4','T5','T6','T7'];
    const DOWS_EN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const MONTHS_EN=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const DOW = () => lang==='en'?DOWEN:DOWVI;
    const DOWS = () => lang==='en'?DOWS_EN:DOWS_VI;
    const DAY=864e5;
    const dnum=(y,m,d)=>Date.UTC(y,m,d)/DAY;
    const fromNum=n=>{const d=new Date(n*DAY);return{y:d.getUTCFullYear(),m:d.getUTCMonth(),d:d.getUTCDate(),w:d.getUTCDay()}};
    const now=new Date();const TODAY=dnum(now.getFullYear(),now.getMonth(),now.getDate());
    const dim=(y,m)=>new Date(Date.UTC(y,m+1,0)).getUTCDate();
    const iso=n=>{const o=fromNum(n);return `${o.y}-${String(o.m+1).padStart(2,'0')}-${String(o.d).padStart(2,'0')}`};
    const parseIso=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');return m?dnum(+m[1],+m[2]-1,+m[3]):null};
    const full=n=>{const o=fromNum(n);return lang==='en'?`${DOW()[o.w]}, ${MONTHS_EN[o.m]} ${o.d}, ${o.y}`:`${DOW()[o.w]}, ngày ${o.d} tháng ${o.m+1} năm ${o.y}`};
    const short=n=>{const o=fromNum(n);return lang==='en'?`${DOWS()[o.w]}, ${MONTHS_EN[o.m].slice(0,3)} ${o.d}, ${o.y}`:`${DOW()[o.w]} ${o.d}/${o.m+1}/${o.y}`};
    const spoken=n=>{const o=fromNum(n);return lang==='en'?full(n):`${DOW()[o.w]}, ngày ${readNum(o.d)} tháng ${readNum(o.m+1)} năm ${readNum(o.y)}`};
    function englishNumber(n){
      if(n===0)return 'zero';
      const u=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      const tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      const below100=k=>k<20?u[k]:tens[Math.floor(k/10)]+(k%10?'-'+u[k%10]:'');
      const below1000=k=>k<100?below100(k):u[Math.floor(k/100)]+' hundred'+(k%100?' '+below100(k%100):'');
      return n<1000?below1000(n):below1000(Math.floor(n/1000))+' thousand'+(n%1000?' '+below1000(n%1000):'');
    }
    const readNumber=n=>lang==='en'?englishNumber(n):readNum(n);

    /* ---------- LỊCH / CALENDAR ---------- */
    let vy=fromNum(TODAY).y,vm=fromNum(TODAY).m,sel=TODAY;
    function renderCal(){
      document.getElementById('calTitle').textContent=lang==='en'?`${MONTHS_EN[vm]} ${vy}`:`Tháng ${vm+1} năm ${vy}`;
      const cal=document.getElementById('cal');cal.innerHTML='';
      const shortDays=lang==='en'?['Mon','Tue','Wed','Thu','Fri','Sat','Sun']:['T2','T3','T4','T5','T6','T7','CN'];
      shortDays.forEach((d,i)=>{const e=document.createElement('div');e.className='dow'+(i===6?' sun':'');e.textContent=d;cal.appendChild(e)});
      const first=dnum(vy,vm,1),lead=(fromNum(first).w+6)%7;
      for(let i=0;i<lead;i++){const e=document.createElement('div');e.className='day empty';cal.appendChild(e)}
      for(let d=1;d<=dim(vy,vm);d++){const n=first+d-1,b=document.createElement('button');b.textContent=d;
        b.className='day'+(fromNum(n).w===0?' sun':'')+(n===TODAY?' today':'')+(n===sel?' sel':'');
        b.setAttribute('aria-label',full(n));b.onclick=()=>{sel=n;renderCal();speak(spoken(n))};cal.appendChild(b);}
      renderInfo();renderMonths();}
    function renderInfo(){const o=fromNum(sel),doy=sel-dnum(o.y,0,1)+1,leap=dim(o.y,1)===29;
      const rel=lang==='en'
        ?sel===TODAY?'Today':sel===TODAY+1?'Tomorrow':sel===TODAY-1?'Yesterday':sel>TODAY?`${enDays(sel-TODAY)} from now`:`${enDays(TODAY-sel)} ago`
        :sel===TODAY?'Hôm nay':sel===TODAY+1?'Ngày mai':sel===TODAY-1?'Hôm qua':sel>TODAY?`Còn ${sel-TODAY} ngày nữa`:`Đã qua ${TODAY-sel} ngày`;
      const prev=DOW()[(o.w+6)%7],next=DOW()[(o.w+1)%7];
      document.getElementById('info').innerHTML=lang==='en'?`
        <p class="muted">${rel}</p><p class="big">${full(sel)}</p>
        <p>The previous day was ${prev}; the next day is ${next}.</p>
        <p>This is day ${doy} of ${o.y}. The year ${o.y} has ${leap?366:365} days${leap?' (a leap year: February has 29 days)':''}.</p>
        <p>${MONTHS_EN[o.m]} has ${dim(o.y,o.m)} days.</p><button class="btn main" id="sayDate" type="button">🔊 Read aloud</button>`:`
        <p class="muted">${rel}</p><p class="big">${full(sel)}</p>
        <p>Hôm trước là ${prev}, hôm sau là ${next}.</p>
        <p>Đây là ngày thứ ${doy} của năm ${o.y}. Năm ${o.y} có ${leap?366:365} ngày${leap?' (năm nhuận, tháng 2 có 29 ngày)':''}.</p>
        <p>Tháng ${o.m+1} có ${dim(o.y,o.m)} ngày.</p><button class="btn main" id="sayDate" type="button">🔊 Đọc to</button>`;
      document.getElementById('sayDate').onclick=()=>speak(spoken(sel));}
    function renderMonths(){const box=document.getElementById('months');box.innerHTML='';
      for(let m=0;m<12;m++){const n=dim(vy,m),e=document.createElement('div');e.className='m '+(n===31?'m31':n===30?'m30':'m28');
        e.innerHTML=`${lang==='en'?MONTHS_EN[m].slice(0,3):'Tháng '+(m+1)}<b>${n}</b>`;box.appendChild(e);}}
    document.getElementById('prev').onclick=()=>{cancelSpeech();vm--;if(vm<0){vm=11;vy--}renderCal()};
    document.getElementById('next').onclick=()=>{cancelSpeech();vm++;if(vm>11){vm=0;vy++}renderCal()};
    document.getElementById('today').onclick=()=>{cancelSpeech();const o=fromNum(TODAY);vy=o.y;vm=o.m;sel=TODAY;renderCal()};
    renderCal();

    /* ---------- KHOẢNG NGÀY / DATE CALCULATIONS ---------- */
    const gFrom=document.getElementById('gFrom'),gTo=document.getElementById('gTo');
    gFrom.value=iso(TODAY);gTo.value=iso(TODAY+7);
    function nextOcc(m,d){const y=fromNum(TODAY).y;let n=dnum(y,m,d);if(n<TODAY)n=dnum(y+1,m,d);return n;}
    const PRESETS=[
      {vi:'🎄 Năm mới',en:'🎄 New Year’s Day',m:0,d:1},
      {vi:'🎈 Quốc tế Thiếu nhi',en:'🎈 Children’s Day',m:5,d:1},
      {vi:'🇻🇳 Quốc khánh',en:'🇻🇳 Vietnam National Day',m:8,d:2},
      {vi:'💐 Ngày Nhà giáo',en:'💐 Vietnamese Teachers’ Day',m:10,d:20}
    ].map(p=>({...p,n:nextOcc(p.m,p.d)})).sort((a,b)=>a.n-b.n);
    const presetButtons=[];
    PRESETS.forEach(p=>{const b=document.createElement('button');b.className='chip';b.type='button';
      b.onclick=()=>{cancelSpeech();gFrom.value=iso(TODAY);gTo.value=iso(p.n);gap();};
      document.getElementById('presets').appendChild(b);presetButtons.push([p,b]);});
    function renderPresetLabels(){presetButtons.forEach(([p,b])=>{const o=fromNum(p.n);b.textContent=`${p[lang]} (${lang==='en'?`${o.m+1}/${o.d}`:`${o.d}/${o.m+1}`})`;});}
    function gap(){const a=parseIso(gFrom.value),b=parseIso(gTo.value),ans=document.getElementById('gAns'),strip=document.getElementById('gStrip');strip.innerHTML='';
      if(a===null||b===null){ans.innerHTML=lang==='en'?'<p>Please choose both dates.</p>':'<p>Hãy chọn đủ hai ngày.</p>';return;}
      const s=Math.min(a,b),e=Math.max(a,b),N=e-s;
      if(N===0){ans.innerHTML=`<p class="big">${lang==='en'?'The same day':'Cùng một ngày'}</p><p>${full(s)}</p>`;return;}
      const w=Math.floor(N/7),r=N%7;
      ans.innerHTML=lang==='en'?`<p class="big">${enDays(N)} apart</p>
        <p>From ${short(s)} to ${short(e)}.</p>
        ${w?`<p>That is ${enWeeks(w)}${r?' and '+enDays(r):''} (1 week = 7 days).</p>`:''}
        <p>Counting both the first and last dates gives ${enDays(N+1)}.</p>`:`<p class="big">Cách nhau ${N} ngày</p>
        <p>Từ ${short(s)} đến ${short(e)}.</p>
        ${w?`<p>Tức là ${w} tuần${r?' và '+r+' ngày':''} (1 tuần có 7 ngày).</p>`:''}
        <p>Nếu đếm cả ngày đầu và ngày cuối thì có ${N+1} ngày.</p>`;
      if(N<=40){for(let n=s;n<=e;n++){const o=fromNum(n),c=document.createElement('div');c.className='cell'+(n===s?' s':n===e?' e':'');
        c.innerHTML=`${DOWS()[o.w]}<b>${o.d}</b><i>${n===s?(lang==='en'?'start':'bắt đầu'):'+'+(n-s)}</i>`;strip.appendChild(c);}}}
    gFrom.oninput=gTo.oninput=()=>{cancelSpeech();gap()};renderPresetLabels();gap();

    const aFrom=document.getElementById('aFrom'),aN=document.getElementById('aN');let dir=1;aFrom.value=iso(TODAY);
    document.getElementById('aDir').addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(!b)return;cancelSpeech();dir=+b.dataset.d;
      document.querySelectorAll('#aDir [data-d]').forEach(x=>x.setAttribute('aria-pressed',x===b));addDays();});
    function addDays(){const a=parseIso(aFrom.value),k=Math.floor(+aN.value),ans=document.getElementById('aAns');
      if(a===null||!(k>=0)||k>100000){ans.innerHTML=lang==='en'?'<p>Select a start date and enter the number of days.</p>':'<p>Hãy chọn ngày bắt đầu và nhập số ngày.</p>';return;}
      const r=a+dir*k;
      ans.innerHTML=lang==='en'?`<p class="big">${full(r)}</p><p>${enDays(k)} ${dir>0?'after':'before'} ${short(a)}.</p>
        ${k&&k%7===0?`<p>💡 ${enDays(k)} is exactly ${enWeeks(k/7)}, so the weekday remains ${DOW()[fromNum(a).w]}.</p>`:''}`:`<p class="big">${full(r)}</p><p>${dir>0?'Sau':'Trước'} ${k} ngày kể từ ${short(a)}.</p>
        ${k&&k%7===0?`<p>💡 ${k} ngày là đúng ${k/7} tuần nên vẫn là ${DOW()[fromNum(a).w]}.</p>`:''}`;}
    aFrom.oninput=aN.oninput=()=>{cancelSpeech();addDays()};addDays();

    /* ---------- SỐ LA MÃ ---------- */
    const RV=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    const EXPL={CM:'1000 − 100',CD:'500 − 100',XC:'100 − 10',XL:'50 − 10',IX:'10 − 1',IV:'5 − 1'};
    function toRoman(n){let s='';for(const[v,r]of RV)while(n>=v){s+=r;n-=v}return s;}
    function parts(n){const out=[];for(const[v,r]of RV)while(n>=v){out.push([r,v]);n-=v}return out;}
    const VALID=/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    function fromRoman(s){s=s.toUpperCase().trim();if(!s||!VALID.test(s))return null;const val={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
      let t=0;for(let i=0;i<s.length;i++){const v=val[s[i]],nx=val[s[i+1]]||0;t+=v<nx?-v:v}return t||null;}
    const rNum=document.getElementById('rNum'),rRom=document.getElementById('rRom'),rErr=document.getElementById('rErr'),rParts=document.getElementById('rParts');
    let romanPartValue=0,romanError='';
    function renderRomanError(){const s=rRom.value; rErr.textContent=romanError==='range'
      ?(lang==='en'?'Enter a number from 1 to 3999.':'Hãy nhập số từ 1 đến 3999.')
      :romanError==='invalid'?(lang==='en'?`"${s}" is not a valid Roman numeral.${/IIII|XXXX|CCCC/.test(s)?' Do not repeat a symbol more than three times in a row.':''}`:`"${s}" chưa đúng cách viết.${/IIII|XXXX|CCCC/.test(s)?' Một chữ không viết liền nhau quá 3 lần.':''}`):'';}
    const setRomanError=(key)=>{romanError=key;renderRomanError();};
    function showParts(n){romanPartValue=n;if(!n){rParts.innerHTML='';return;}const p=parts(n);
      rParts.innerHTML=p.map(([r,v])=>`<div class="part"><b>${r}</b><span>${EXPL[r]?EXPL[r]+' = ':''}${v}</span></div>`).join('<span class="plus">+</span>')
       +(p.length>1?`<span class="plus">=</span><div class="part"><b>${n}</b><span>${readNumber(n)}</span></div>`:`<span class="plus">→</span><div class="part"><b>${n}</b><span>${readNumber(n)}</span></div>`);}
    rNum.oninput=()=>{const v=rNum.value.replace(/\D/g,'');rNum.value=v;const n=+v;
      if(!v){rRom.value='';setRomanError('');showParts(0);return;}
      if(n<1||n>3999){setRomanError('range');showParts(0);return;}
      setRomanError('');rRom.value=toRoman(n);showParts(n);};
    rRom.oninput=()=>{const s=rRom.value.toUpperCase().replace(/[^IVXLCDM]/g,'');rRom.value=s;
      if(!s){rNum.value='';setRomanError('');showParts(0);return;}
      const n=fromRoman(s);
      if(n===null){setRomanError('invalid');showParts(0);return;}
      setRomanError('');rNum.value=n;showParts(n);};
    showParts(14);
    const grid=document.getElementById('rGrid');
    for(let i=1;i<=20;i++){const b=document.createElement('button');b.className='rbtn';b.type='button';b.innerHTML=`<b>${toRoman(i)}</b><span>${i}</span>`;
      b.onclick=()=>{rNum.value=i;rNum.oninput();speak(readNumber(i));document.getElementById('rNum').scrollIntoView({behavior:'smooth',block:'center'});};grid.appendChild(b);}

    /* Roman numeral quiz */
    const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
    let qc=0,qt=0,qn=null,qDone=false,qType=0,qFeedback='';
    function translateQuiz(){
      document.getElementById('qText').textContent=lang==='en'
        ?(qType?`How do you write ${qn} in Roman numerals?`:`What number is ${toRoman(qn)}?`)
        :(qType?`Số ${qn} viết bằng số La Mã là?`:`${toRoman(qn)} là số mấy?`);
      document.getElementById('qScore').textContent=lang==='en'?`Correct ${qc} / ${qt}`:`Đúng ${qc} / ${qt}`;
      const feedback=document.getElementById('qFb');
      feedback.textContent=qFeedback==='ok'?(lang==='en'?'Correct! 🎉':'Đúng rồi! 🎉')
        :qFeedback==='no'?(lang==='en'?`Not quite: ${toRoman(qn)} = ${qn}`:`Chưa đúng: ${toRoman(qn)} = ${qn}`):'';
    }
    function newQuiz(){qDone=false;qFeedback='';let n;do{n=rnd(1,20)}while(n===qn);qn=n;qType=rnd(0,1);
      const set=new Set([n]);const mirror=fromRoman(toRoman(n).split('').reverse().join(''));
      [mirror,n+1,n-1,n+2,n-2,n+5,n-5,n+10,n-10].forEach(c=>{if(set.size<4&&c&&c>=1&&c<=30)set.add(c)});
      const opts=[...set].sort(()=>Math.random()-.5);
      const box=document.getElementById('qOpts');box.innerHTML='';
      opts.forEach(v=>{const b=document.createElement('button');b.className='qopt';b.type='button';b.textContent=qType?toRoman(v):v;
        b.onclick=()=>{if(qDone)return;qDone=true;qt++;const ok=v===n,fb=document.getElementById('qFb');
          b.classList.add(ok?'ok':'no');qFeedback=ok?'ok':'no';
          if(ok){qc++;fb.className='fb ok'}
          else{fb.className='fb no';[...box.children].forEach(x=>{if(x.textContent===String(qType?toRoman(n):n))x.classList.add('ok')})}
          translateQuiz();setTimeoutLocal(()=>{document.getElementById('qFb').textContent='';newQuiz()},ok?1200:2400);};
        box.appendChild(b);});
      document.getElementById('qFb').className='fb';translateQuiz();}
    newQuiz();

    /* Language changes update only labels and computed explanations, never input/state. */
    function changeLanguage(nextLang){
      if(!['vi','en'].includes(nextLang)||nextLang===lang)return;
      cancelSpeech();lang=nextLang;
      renderStaticText();renderCal();renderPresetLabels();gap();addDays();
      showParts(romanPartValue);renderRomanError();translateQuiz();
    }
    document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>changeLanguage(b.dataset.lang)));
    renderStaticText();
  }

  function render(context) {
    destroy();
    ctx = context || null;
    const host = ctx && ctx.host;
    if (!host) return;
    active = true;
    ensureStyle();
    host.innerHTML = toolHtml();
    host.setAttribute("tabindex", "0");
    host.querySelector("[data-tool-back]")?.addEventListener("click", () => ctx && typeof ctx.back === "function" && ctx.back());
    initTool(host);
    try { host.focus({preventScroll:true}); } catch (_) {}
  }

  function destroy() {
    active = false;
    clearTimers();
    if (disposeSpeech) { try { disposeSpeech(); } catch (_) {} disposeSpeech = null; }
    else stopSpeech();
    ctx = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
