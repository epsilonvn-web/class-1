// ==========================================
// MINI GAME TV1: NHIN HINH BAT CHU
// Emoji o phia tren; cac tu chay tu trai sang phai.
// Be bam dung tu khop voi emoji truoc khi tu dung cham tuong ben phai.
// ==========================================


// Class 1 lifecycle: mọi timeout của game gắn với lượt mount hiện tại; rời game sẽ hủy sạch.
let pwclifeLifecycleToken_=0; const pwclifeLifecycleTimers_=new Set();
function pwclifeLater_(fn,ms){const token=pwclifeLifecycleToken_;const id=setTimeout(()=>{pwclifeLifecycleTimers_.delete(id);if(token!==pwclifeLifecycleToken_)return;fn();},ms);pwclifeLifecycleTimers_.add(id);return id;}
function pwclifeCancelTimers_(){pwclifeLifecycleToken_++;for(const id of pwclifeLifecycleTimers_)clearTimeout(id);pwclifeLifecycleTimers_.clear();}
let pwcRound = 0;
let pwcScore = 0;
let pwcStreak = 0;
let pwcBestStreak = 0;
let pwcState = 'idle';
let pwcTarget = null;
let pwcWords = [];
let pwcRaf = null;
let pwcLastTs = 0;
let pwcSpawnAccumulator = 0;
let pwcNextWordId = 1;
let pwcAudioCtx = null;
let pwcRoundStartedAt = 0;
let pwcRoundToken = 0;
let pwcLastWarningBeepAt = 0;

const PWC_POOL = [
    { word: 'bánh chưng', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('banh_chung') : ''), emoji: '🍙' },
    { word: 'bông hoa', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('bong_hoa') : ''), emoji: '🌸' },
    { word: 'cái cặp', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cai_cap') : ''), emoji: '🎒' },
    { word: 'cái quạt', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cai_quat') : ''), emoji: '🪭' },
    { word: 'cây thước', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('cay_thuoc') : ''), emoji: '📏' },
    { word: 'chiếc thuyền', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('chiec_thuyen') : ''), emoji: '⛵' },
    { word: 'chiếc xe đạp', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('chiec_xe_dap') : ''), emoji: '🚲' },
    { word: 'con bướm', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_buom') : ''), emoji: '🦋' },
    { word: 'con cá', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_ca') : ''), emoji: '🐟' },
    { word: 'con chó', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_cho') : ''), emoji: '🐶' },
    { word: 'con cua', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_cua') : ''), emoji: '🦀' },
    { word: 'con gà', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_ga') : ''), emoji: '🐔' },
    { word: 'con mèo', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_meo') : ''), emoji: '🐱' },
    { word: 'con ong', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_ong') : ''), emoji: '🐝' },
    { word: 'con trâu', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_trau') : ''), emoji: '🐃' },
    { word: 'con vịt', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('con_vit') : ''), emoji: '🦆' },
    { word: 'mặt trời', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('mat_troi') : ''), emoji: '☀️' },
    { word: 'ngôi nhà', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('ngoi_nha') : ''), emoji: '🏠' },
    { word: 'quả cam', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('qua_cam') : ''), emoji: '🍊' },
    { word: 'quả dứa', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('qua_dua') : ''), emoji: '🍍' },
    { word: 'quả dưa hấu', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('qua_dua_hau') : ''), emoji: '🍉' },
    { word: 'quả táo', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('qua_tao') : ''), emoji: '🍎' },
    { word: 'quả xoài', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('qua_xoai') : ''), emoji: '🥭' },
    { word: 'quyển sách', image: (typeof window.resolveClass1VietnameseImageSrc==='function' ? window.resolveClass1VietnameseImageSrc('quyen_sach') : ''), emoji: '📚' },
    { word: 'chuồn chuồn', image: '', emoji: '🪰' },
    { word: 'khóm khoai', image: '', emoji: '🌿' },
    { word: 'lũy tre', image: '', emoji: '🎋' },
    { word: 'hoa phượng', image: '', emoji: '🌺' },
    { word: 'bắp ngô', image: '', emoji: '🌽' },
    { word: 'cục tẩy', image: '', emoji: '🧽' },
    { word: 'viên phấn', image: '', emoji: '🖍️' },
    { word: 'cái kéo', image: '', emoji: '✂️' },
    { word: 'cái ghế', image: '', emoji: '🪑' },
    { word: 'cái nón', image: '', emoji: '👒' },
    { word: 'đôi dép', image: '', emoji: '🩴' },
    { word: 'đèn giao thông', image: '', emoji: '🚦' },
    { word: 'máy bay', image: '', emoji: '✈️' },
    { word: 'xe ô tô', image: '', emoji: '🚗' },
    { word: 'cái gương', image: '', emoji: '🪞' }
];

function pwcEnsureStyles() {
    if (document.getElementById('pwc-game-styles')) return;
    const style = document.createElement('style');
    style.id = 'pwc-game-styles';
    style.textContent = `
      @keyframes pwcFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.03)}}
      @keyframes pwcPop{0%{transform:scale(.6);opacity:0}65%{transform:scale(1.12);opacity:1}100%{transform:scale(1);opacity:1}}
      @keyframes pwcFlyUp{0%{transform:translate(0,0) scale(1);opacity:1}70%{transform:translate(var(--fly-x),var(--fly-y)) scale(1.16);opacity:1}100%{transform:translate(var(--fly-x),var(--fly-y)) scale(.7);opacity:0}}
      @keyframes pwcShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
      @keyframes pwcWallFlash{0%,100%{box-shadow:inset 0 0 0 rgba(244,63,94,0)}50%{box-shadow:inset -42px 0 60px rgba(244,63,94,.34)}}
      @keyframes pwcCloudDriftA{0%{transform:translateX(-18px)}50%{transform:translateX(26px) translateY(-5px)}100%{transform:translateX(-18px)}}
      @keyframes pwcCloudDriftB{0%{transform:translateX(22px)}50%{transform:translateX(-28px) translateY(6px)}100%{transform:translateX(22px)}}
      @keyframes pwcSparkle{0%,100%{transform:scale(.65) rotate(0);opacity:.18}50%{transform:scale(1.2) rotate(16deg);opacity:.75}}
      @keyframes pwcTargetCheer{0%{transform:scale(1)}30%{transform:scale(1.22) rotate(-7deg)}60%{transform:scale(1.12) rotate(7deg)}100%{transform:scale(1)}}
      @keyframes pwcComboBurst{0%{transform:translate(-50%,-20%) scale(.45);opacity:0}35%{transform:translate(-50%,-50%) scale(1.18);opacity:1}78%{transform:translate(-50%,-68%) scale(1);opacity:1}100%{transform:translate(-50%,-92%) scale(.9);opacity:0}}
      @keyframes pwcDanger{0%,100%{border-color:#fbcfe8;box-shadow:0 0 0 rgba(244,63,94,0)}50%{border-color:#fb7185;box-shadow:0 0 0 5px rgba(251,113,133,.14),inset -42px 0 44px rgba(251,113,133,.16)}}
      @keyframes pwcStageShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-7px)}30%{transform:translateX(7px)}45%{transform:translateX(-5px)}60%{transform:translateX(5px)}75%{transform:translateX(-2px)}}
      @keyframes pwcCrash{0%{transform:translateY(-50%) rotate(0);opacity:1}35%{transform:translateY(-50%) rotate(8deg) scale(1.08);opacity:1}100%{transform:translateY(95px) rotate(24deg) scale(.82);opacity:.15}}
      .pwc-stage{position:relative;overflow:hidden;background:linear-gradient(180deg,#eff6ff 0%,#fdf2f8 52%,#ecfdf5 100%)}
      .pwc-emoji{animation:pwcFloat 1.9s ease-in-out infinite;filter:drop-shadow(0 10px 8px rgba(15,23,42,.12));display:flex;align-items:center;justify-content:center;min-height:132px}
      .pwc-target-image{width:132px;height:132px;object-fit:contain;border-radius:24px;background:rgba(255,255,255,.92);border:3px solid rgba(251,207,232,.95);box-shadow:0 12px 28px rgba(236,72,153,.16);padding:6px;user-select:none;pointer-events:none}
      .pwc-target-fallback{font-size:92px;line-height:1}
      .pwc-track{position:relative;overflow:hidden;background:linear-gradient(90deg,#fff 0%,#fdf2f8 55%,#fff7ed 100%);border:3px solid #fbcfe8}
      .pwc-track::after{content:'';position:absolute;right:0;top:0;bottom:0;width:10px;background:repeating-linear-gradient(180deg,#fb7185 0 10px,#fff 10px 18px);z-index:3}
      .pwc-word{position:absolute;top:50%;transform:translateY(-50%);white-space:nowrap;z-index:5;touch-action:manipulation;user-select:none}
      .pwc-word button{box-shadow:0 7px 16px rgba(15,23,42,.12);transition:transform .12s,filter .12s}
      .pwc-word button:hover{transform:scale(1.06);filter:saturate(1.15)}
      .pwc-word.pwc-wrong{animation:pwcShake .28s linear 1}
      .pwc-word.pwc-caught{z-index:30;pointer-events:none;animation:pwcFlyUp .72s cubic-bezier(.18,.78,.25,1) forwards}
      .pwc-wall-hit{animation:pwcWallFlash .55s ease-out 1}
      .pwc-target-pop{animation:pwcPop .36s ease-out}
      .pwc-target-cheer{animation:pwcTargetCheer .52s ease-out 1}
      .pwc-cloud{position:absolute;opacity:.52;pointer-events:none;filter:drop-shadow(0 6px 10px rgba(148,163,184,.12))}
      .pwc-cloud-a{animation:pwcCloudDriftA 7s ease-in-out infinite}
      .pwc-cloud-b{animation:pwcCloudDriftB 8.5s ease-in-out infinite}
      .pwc-sparkle{position:absolute;pointer-events:none;animation:pwcSparkle 2.4s ease-in-out infinite}
      .pwc-combo-burst{position:absolute;left:50%;top:44%;z-index:60;pointer-events:none;font-weight:1000;text-shadow:0 3px 0 rgba(255,255,255,.85),0 8px 20px rgba(244,63,94,.26);animation:pwcComboBurst 1s ease-out forwards}
      .pwc-track.pwc-danger{animation:pwcDanger .62s ease-in-out infinite}
      .pwc-stage-shake{animation:pwcStageShake .48s linear 1}
      .pwc-word.pwc-crash{z-index:40;pointer-events:none;animation:pwcCrash .65s ease-in forwards}
      @media(max-width:640px){.pwc-emoji{min-height:108px}.pwc-target-image{width:108px;height:108px;border-radius:20px}.pwc-target-fallback{font-size:76px}.pwc-track{height:132px!important}.pwc-word button{font-size:14px!important;padding:.55rem .8rem!important}}
    `;
    document.head.appendChild(style);
}

function pwcGetAudioCtx() {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        if (!pwcAudioCtx) pwcAudioCtx = new Ctx();
        if (pwcAudioCtx.state === 'suspended') pwcAudioCtx.resume();
        return pwcAudioCtx;
    } catch (e) { return null; }
}

function pwcBeepWrong() {
    const ctx = pwcGetAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.14].forEach((delay) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'square';
        o.frequency.setValueAtTime(260, now + delay);
        g.gain.setValueAtTime(0.001, now + delay);
        g.gain.linearRampToValueAtTime(0.18, now + delay + 0.01);
        g.gain.linearRampToValueAtTime(0.001, now + delay + 0.10);
        o.connect(g); g.connect(ctx.destination);
        o.start(now + delay); o.stop(now + delay + 0.11);
    });
}

function pwcPlayWarningTick() {
    const ctx = pwcGetAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(760, now);
    o.frequency.exponentialRampToValueAtTime(980, now + 0.055);
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.07, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
    o.connect(g); g.connect(ctx.destination);
    o.start(now); o.stop(now + 0.08);
}

function pwcPlayCorrect() {
    if (typeof playAudio === 'function') {
        playAudio('correct');
        return;
    }
    const ctx = pwcGetAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle'; o.frequency.value = f;
        o.connect(g); g.connect(ctx.destination);
        g.gain.setValueAtTime(0.14, now + i * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.23);
        o.start(now + i * 0.07); o.stop(now + i * 0.07 + 0.24);
    });
}

function pwcStopLoop() {
    if (pwcRaf) cancelAnimationFrame(pwcRaf);
    pwcRaf = null;
    pwcLastTs = 0;
}

function pwcShuffle(arr) {
    if (typeof shuffleArray === 'function') return shuffleArray(arr);
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function startPictureWordCatchGame() {pwclifeCancelTimers_();
    pwcEnsureStyles();
    pwcStopLoop();
    pwcRound = 0; pwcScore = 0; pwcStreak = 0; pwcBestStreak = 0; pwcWords = [];
    pwcState = 'menu';
    const box = document.getElementById('game-play-container');
    if (!box) return;
    box.innerHTML = `
      <div class="rounded-[28px] border-2 border-pink-200 bg-gradient-to-b from-sky-50 via-white to-rose-50 p-4 md:p-6 shadow-sm relative overflow-hidden text-center">
        <div class="absolute -left-5 -bottom-3 text-8xl opacity-10">🌈</div>
        <div class="absolute -right-5 top-0 text-8xl opacity-10">🎈</div>
        <div class="relative z-10">
          <div class="text-6xl md:text-7xl mb-2">👀 🖼️ 🔤</div>
          <h3 class="text-xl md:text-2xl font-black text-pink-600">Nhìn hình bắt chữ</h3>
          <p class="text-sm md:text-base font-bold text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">Nhìn hình thật nhanh, rồi chạm đúng từ đang chạy bên dưới trước khi từ đó chạm bức tường bên phải.</p>
          <div class="grid grid-cols-3 gap-2 mt-4 text-xs md:text-sm font-black">
            <div class="bg-white border border-emerald-200 rounded-2xl p-3">✅ Đúng<br><span class="font-bold text-slate-500">+ điểm & pháo hoa</span></div>
            <div class="bg-white border border-amber-200 rounded-2xl p-3">⚡ Sai<br><span class="font-bold text-slate-500">Bíp bíp, chơi tiếp</span></div>
            <div class="bg-white border border-rose-200 rounded-2xl p-3">🧱 Chạm tường<br><span class="font-bold text-slate-500">Thua lượt chơi</span></div>
          </div>
          <button id="pwc-start-btn" class="mt-5 px-7 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-base shadow-md pastel-btn">🚀 Bắt đầu chơi</button>
        </div>
      </div>`;
    document.getElementById('pwc-start-btn')?.addEventListener('click', pwcStartSession);
}

function pwcStartSession() {
    pwcRound = 0; pwcScore = 0; pwcStreak = 0; pwcBestStreak = 0; pwcWords = [];
    pwcState = 'playing';
    pwcRenderStage();
    pwcNextRound();
}

function pwcRenderStage() {
    const box = document.getElementById('game-play-container');
    if (!box) return;
    box.innerHTML = `
      <div id="pwc-stage" class="pwc-stage rounded-[28px] border-2 border-pink-200 shadow-sm min-h-[500px] md:min-h-[535px] p-3 md:p-5">
        <div class="pwc-cloud pwc-cloud-a top-10 left-[8%] text-5xl">☁️</div><div class="pwc-cloud pwc-cloud-b top-20 right-[10%] text-4xl">☁️</div>
        <div class="pwc-sparkle top-[30%] left-[18%] text-xl">✨</div><div class="pwc-sparkle top-[34%] right-[19%] text-lg" style="animation-delay:.8s">⭐</div><div class="pwc-sparkle top-[16%] right-[32%] text-base" style="animation-delay:1.4s">✨</div>
        <div class="relative z-10 flex items-center justify-between gap-2 flex-wrap text-xs md:text-sm font-black">
          <div class="flex gap-1.5"><span class="px-3 py-1 rounded-full bg-white/90 border border-pink-200 text-pink-700">👀 Lượt <span id="pwc-round">1</span></span><span class="px-3 py-1 rounded-full bg-white/90 border border-amber-200 text-amber-700">🔥 <span id="pwc-streak">0</span></span></div>
          <div class="flex gap-1.5"><span class="px-3 py-1 rounded-full bg-white/90 border border-emerald-200 text-emerald-700">⭐ <span id="pwc-score">0</span></span><span class="px-3 py-1 rounded-full bg-white/90 border border-purple-200 text-purple-700">🏆 <span id="pwc-best">0</span></span></div>
        </div>

        <div class="relative z-10 mt-4 text-center">
          <div class="text-[11px] md:text-xs font-black text-slate-500 uppercase tracking-wider">Bé hãy tìm từ của hình này</div>
          <div id="pwc-target-emoji" class="pwc-emoji mt-1"><span class="pwc-target-fallback">🐰</span></div>
          <div id="pwc-feedback" class="h-8 mt-1 flex items-center justify-center text-sm md:text-base font-black text-pink-600">Nhìn hình rồi chạm đúng từ nhé!</div>
        </div>

        <div class="relative z-10 mt-3">
          <div class="flex items-center justify-between text-[10px] md:text-xs font-black text-slate-500 mb-1.5"><span>🏁 XUẤT PHÁT</span><span class="text-rose-500">BỨC TƯỜNG 🧱</span></div>
          <div id="pwc-track" class="pwc-track rounded-2xl h-[150px] md:h-[166px]"></div>
        </div>

        <div class="relative z-10 mt-3 text-center text-xs md:text-sm font-bold text-slate-500">💡 Từ đúng xuất hiện xen giữa các từ gây nhiễu. Càng chơi lâu, chữ chạy càng nhanh.</div>
      </div>`;
}

function pwcPickTarget() {
    let choices = PWC_POOL;
    if (pwcTarget) choices = PWC_POOL.filter(x => x.word !== pwcTarget.word);
    return choices[Math.floor(Math.random() * choices.length)];
}

function pwcNextRound() {
    if (pwcState !== 'playing') return;
    pwcStopLoop();
    pwcWords = [];
    pwcRound += 1;
    pwcTarget = pwcPickTarget();
    pwcSpawnAccumulator = 0;
    pwcRoundStartedAt = performance.now();
    pwcRoundToken += 1;
    const roundToken = pwcRoundToken;
    pwcLastWarningBeepAt = 0;

    const emoji = document.getElementById('pwc-target-emoji');
    if (emoji) {
        const fallback = typeof escapeHtml === 'function' ? escapeHtml(pwcTarget.emoji || '🖼️') : (pwcTarget.emoji || '🖼️');
        if (pwcTarget.image) {
            const safeSrc = typeof escapeHtml === 'function' ? escapeHtml(pwcTarget.image) : pwcTarget.image;
            emoji.innerHTML = `<img class="pwc-target-image" src="${safeSrc}" alt="Hình minh họa" draggable="false" onerror="this.outerHTML='<span class=&quot;pwc-target-fallback&quot;>${fallback}</span>'">`;
        } else {
            emoji.innerHTML = `<span class="pwc-target-fallback">${fallback}</span>`;
        }
        emoji.classList.remove('pwc-target-pop');
        void emoji.offsetWidth;
        emoji.classList.add('pwc-target-pop');
    }
    const roundEl = document.getElementById('pwc-round'); if (roundEl) roundEl.textContent = pwcRound;
    const feedback = document.getElementById('pwc-feedback'); if (feedback) feedback.textContent = 'Từ nào đúng với hình này?';
    const track = document.getElementById('pwc-track'); if (track) { track.innerHTML = ''; track.classList.remove('pwc-danger'); }

    const distractors = pwcShuffle(PWC_POOL.filter(x => x.word !== pwcTarget.word)).slice(0, 4).map(x => x.word);
    const queue = pwcShuffle([pwcTarget.word, ...distractors]);
    pwcSpawnWordQueue(queue, roundToken);

    pwcLastTs = performance.now();
    pwcRaf = requestAnimationFrame(pwcFrame);
}

function pwcSpawnWordQueue(queue, roundToken) {
    // Giu khoang cach deu nhau: moi tu bat dau cach nhau ve thoi gian thay vi chen cung luc.
    queue.forEach((word, i) => {
        pwclifeLater_(() => {
            if (pwcState !== 'playing' || !pwcTarget || roundToken !== pwcRoundToken) return;
            pwcSpawnWord(word, roundToken);
        }, i * Math.max(650, 1040 - Math.min(pwcRound, 12) * 28));
    });
}

function pwcSpawnWord(word, roundToken) {
    const track = document.getElementById('pwc-track');
    if (!track || pwcState !== 'playing' || roundToken !== pwcRoundToken) return;
    const id = pwcNextWordId++;
    const item = document.createElement('div');
    item.className = 'pwc-word';
    item.dataset.id = String(id);
    item.dataset.word = word;
    item.style.left = '-180px';
    const colorClasses = [
        'bg-pink-50 border-pink-300 text-pink-700',
        'bg-purple-50 border-purple-300 text-purple-700',
        'bg-emerald-50 border-emerald-300 text-emerald-700',
        'bg-amber-50 border-amber-300 text-amber-700',
        'bg-sky-50 border-sky-300 text-sky-700'
    ];
    const cls = colorClasses[id % colorClasses.length];
    item.innerHTML = `<button class="px-5 py-3 rounded-full border-2 ${cls} font-black text-base md:text-lg bg-white">${typeof escapeHtml === 'function' ? escapeHtml(word) : word}</button>`;
    track.appendChild(item);
    const width = Math.max(90, item.getBoundingClientRect().width || 120);
    const speed = Math.min(150, 72 + pwcRound * 4.8); // px/s
    pwcWords.push({ id, word, el: item, x: -width - 10, width, speed, alive: true });
    item.addEventListener('click', () => pwcChooseWord(id));
}

function pwcFrame(ts) {
    if (pwcState !== 'playing') return;
    const track = document.getElementById('pwc-track');
    if (!track) return;
    const dt = Math.min(40, ts - pwcLastTs) / 1000;
    pwcLastTs = ts;
    const wallX = track.clientWidth - 12;

    for (const w of pwcWords) {
        if (!w.alive || !w.el?.isConnected) continue;
        w.x += w.speed * dt;
        w.el.style.left = `${w.x}px`;

        const distanceToWall = wallX - (w.x + w.width);
        if (w.word === pwcTarget.word && distanceToWall < 145 && distanceToWall > 0) {
            track.classList.add('pwc-danger');
            const feedback = document.getElementById('pwc-feedback');
            if (feedback && distanceToWall < 95) feedback.textContent = '⚠️ Nhanh lên bé ơi! Từ đúng sắp chạm tường!';
            if (ts - pwcLastWarningBeepAt > (distanceToWall < 70 ? 260 : 430)) {
                pwcPlayWarningTick();
                pwcLastWarningBeepAt = ts;
            }
        }

        if (w.x + w.width >= wallX) {
            if (w.word === pwcTarget.word) {
                return pwcLoseByWall(w);
            }
            w.alive = false;
            w.el.remove();
        }
    }

    pwcWords = pwcWords.filter(w => w.alive && w.el?.isConnected);
    pwcRaf = requestAnimationFrame(pwcFrame);
}

function pwcChooseWord(id) {
    if (pwcState !== 'playing') return;
    const w = pwcWords.find(x => x.id === id && x.alive);
    if (!w) return;
    if (w.word === pwcTarget.word) {
        pwcCatchCorrect(w);
    } else {
        pwcBeepWrong();
        pwcStreak = 0;
        const streak = document.getElementById('pwc-streak'); if (streak) streak.textContent = pwcStreak;
        const feedback = document.getElementById('pwc-feedback'); if (feedback) feedback.textContent = 'Bíp bíp! Chưa đúng, thử lại nhé!';
        w.el.classList.remove('pwc-wrong'); void w.el.offsetWidth; w.el.classList.add('pwc-wrong');
    }
}

function pwcCatchCorrect(w) {
    if (pwcState !== 'playing') return;
    pwcState = 'celebrating';
    pwcStopLoop();
    pwcStreak += 1;
    pwcBestStreak = Math.max(pwcBestStreak, pwcStreak);
    const elapsed = Math.max(0, performance.now() - pwcRoundStartedAt);
    const speedBonus = Math.max(0, Math.round(20 - elapsed / 700));
    pwcScore += 10 + pwcStreak * 2 + speedBonus;

    const score = document.getElementById('pwc-score'); if (score) score.textContent = pwcScore;
    const streak = document.getElementById('pwc-streak'); if (streak) streak.textContent = pwcStreak;
    const best = document.getElementById('pwc-best'); if (best) best.textContent = pwcBestStreak;
    const feedback = document.getElementById('pwc-feedback'); if (feedback) feedback.textContent = `🎉 Chính xác! ${pwcTarget.word}`;
    const trackNow = document.getElementById('pwc-track'); if (trackNow) trackNow.classList.remove('pwc-danger');

    pwcPlayCorrect();
    try {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 74 + Math.min(46, pwcStreak * 4), spread: 72, origin: { y: 0.55 } });
            if (pwcStreak >= 5) pwclifeLater_(() => confetti({ particleCount: 44, spread: 105, origin: { y: 0.45 } }), 120);
        }
    } catch (e) {}

    // Hieu ung "keo tu len" dung nhu y tuong game: tu bay tu duong chay len emoji.
    const emoji = document.getElementById('pwc-target-emoji');
    if (emoji) { emoji.classList.remove('pwc-target-cheer'); void emoji.offsetWidth; emoji.classList.add('pwc-target-cheer'); }
    pwcShowComboBurst();
    const track = document.getElementById('pwc-track');
    if (w.el && emoji && track) {
        const wr = w.el.getBoundingClientRect();
        const er = emoji.getBoundingClientRect();
        const flyX = (er.left + er.width / 2) - (wr.left + wr.width / 2);
        const flyY = (er.top + er.height / 2) - (wr.top + wr.height / 2);
        w.el.style.setProperty('--fly-x', `${flyX}px`);
        w.el.style.setProperty('--fly-y', `${flyY}px`);
        w.el.classList.add('pwc-caught');
    }

    pwclifeLater_(() => {
        if (pwcState !== 'celebrating') return;
        pwcState = 'playing';
        pwcNextRound();
    }, 980);
}

function pwcShowComboBurst() {
    if (pwcStreak < 2) return;
    const stage = document.getElementById('pwc-stage');
    if (!stage) return;
    const old = stage.querySelector('.pwc-combo-burst');
    if (old) old.remove();
    const el = document.createElement('div');
    const milestone = [3,5,10].includes(pwcStreak);
    el.className = 'pwc-combo-burst ' + (milestone ? 'text-3xl md:text-4xl text-rose-500' : 'text-2xl md:text-3xl text-amber-500');
    el.textContent = milestone ? `🔥 COMBO x${pwcStreak}!` : `✨ Combo x${pwcStreak}`;
    stage.appendChild(el);
    pwclifeLater_(() => el.remove(), 1050);
}

function pwcLoseByWall(w) {
    if (pwcState !== 'playing') return;
    pwcState = 'lost';
    pwcStopLoop();
    const stage = document.getElementById('pwc-stage');
    if (stage) { stage.classList.remove('pwc-wall-hit','pwc-stage-shake'); void stage.offsetWidth; stage.classList.add('pwc-wall-hit','pwc-stage-shake'); }
    const track = document.getElementById('pwc-track'); if (track) track.classList.add('pwc-danger');
    if (w?.el) { w.el.classList.add('pwc-crash'); }
    pwcBeepWrong();
    pwclifeLater_(pwcBeepWrong, 260);
    const feedback = document.getElementById('pwc-feedback');
    if (feedback) feedback.textContent = `💥 Ôi! “${pwcTarget.word}” đã chạm tường!`;
    pwclifeLater_(pwcRenderGameOver, 650);
}

function pwcRenderGameOver() {
    const box = document.getElementById('game-play-container');
    if (!box) return;
    const roundsPassed = Math.max(0, pwcRound - 1);
    box.innerHTML = `
      <div class="rounded-[28px] border-2 border-rose-200 bg-gradient-to-b from-rose-50 via-white to-amber-50 p-5 md:p-7 shadow-sm text-center relative overflow-hidden">
        <div class="text-7xl mb-2">🧱💥😵</div>
        <h3 class="text-xl md:text-2xl font-black text-rose-600">Chữ đã chạm tường!</h3>
        <p class="text-sm font-bold text-slate-600 mt-2">Bé bắt đúng được <strong class="text-emerald-600">${roundsPassed}</strong> hình trước khi để từ đúng chạy mất.</p>
        <div class="grid grid-cols-3 gap-2 mt-4 max-w-xl mx-auto">
          <div class="bg-white border border-emerald-200 rounded-2xl p-3"><div class="text-2xl">⭐</div><div class="font-black text-emerald-700">${pwcScore}</div><div class="text-[11px] font-bold text-slate-400">Điểm</div></div>
          <div class="bg-white border border-amber-200 rounded-2xl p-3"><div class="text-2xl">🔥</div><div class="font-black text-amber-700">${pwcBestStreak}</div><div class="text-[11px] font-bold text-slate-400">Combo tốt nhất</div></div>
          <div class="bg-white border border-purple-200 rounded-2xl p-3"><div class="text-2xl">🖼️</div><div class="font-black text-purple-700">${roundsPassed}</div><div class="text-[11px] font-bold text-slate-400">Hình bắt được</div></div>
        </div>
        <div class="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
          <button id="pwc-retry" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black shadow-md pastel-btn">🔄 Chơi lại</button>
          <button id="pwc-back" class="px-6 py-3 rounded-2xl bg-white border-2 border-teal-200 text-teal-700 font-black shadow-sm pastel-btn">🎮 Chọn game khác</button>
        </div>
      </div>`;
    document.getElementById('pwc-retry')?.addEventListener('click', pwcStartSession);
    document.getElementById('pwc-back')?.addEventListener('click', () => { if (typeof openMiniGameHub === 'function') openMiniGameHub(); });
}

// Cho phep app.js goi cleanup neu sau nay can mo rong lifecycle.
function stopPictureWordCatchGame() {pwclifeCancelTimers_();
    pwcState = 'idle';
    pwcRoundToken += 1;
    pwcStopLoop();
    pwcWords = [];
}

if(typeof stopPictureWordCatchGame==='function') window.stopPictureWordCatchGame=stopPictureWordCatchGame;
