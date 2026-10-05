// ==========================================
// GAME 6: GRAMMAR RIVER
// Nguon du lieu: Chuyen muc 10.2 - Prepositions Grammar Point.
// Gameplay: chon hon da mang gioi tu dung de chu ech nhay qua song.
// ==========================================
let grvAllPool = [];
let grvPool = [];
let grvDifficulty = 'easy';
let grvRound = 0;
let grvScore = 0;
let grvWrong = 0;
let grvStreak = 0;
let grvBestStreak = 0;
let grvStartTime = 0;
let grvTimerInterval = null;
let grvCurrent = null;
let grvLocked = false;

const GRV_LEVELS = {
    easy:   { label: 'Dễ', rounds: 8,  options: 3, note: '3 hòn đá lựa chọn' },
    medium: { label: 'Vừa', rounds: 10, options: 4, note: '4 hòn đá lựa chọn' },
    hard:   { label: 'Khó', rounds: 12, options: 4, note: '4 lựa chọn · ít gợi ý hơn' }
};

async function startGrammarRiverGame() {
    showLoadingOverlay('Đang chuẩn bị dòng sông ngữ pháp từ Chuyên mục 10.2...');
    try {
        grvAllPool = await ensureMiniGameLearningReady(['10.2']);
        grvAllPool = grvAllPool.filter(q => q && q.answer && Array.isArray(q.options) && q.options.length >= 3);
        hideLoadingOverlay();
        grvEnsureStyles();
        grvRenderStart();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được Grammar River: ' + e.message);
    }
}

function grvEnsureStyles() {
    if (document.getElementById('grammar-river-style')) return;
    const style = document.createElement('style');
    style.id = 'grammar-river-style';
    style.textContent = `
        @keyframes grvWaterMove {
            from { background-position: 0 0, 0 0; }
            to   { background-position: 70px 0, -90px 0; }
        }
        @keyframes grvFrogHop {
            0%   { transform: translate(-50%, 0) scale(1); }
            45%  { transform: translate(-50%, -58px) scale(1.18) rotate(-7deg); }
            100% { transform: translate(-50%, 0) scale(1); }
        }
        @keyframes grvSplash {
            0%   { transform: scale(.4); opacity: 0; }
            35%  { opacity: 1; }
            100% { transform: scale(1.5) translateY(-8px); opacity: 0; }
        }
        @keyframes grvStoneGood {
            0%,100% { transform: translateY(0) scale(1); }
            45%     { transform: translateY(-7px) scale(1.07); }
        }
        @keyframes grvStoneBad {
            0%,100% { transform: translateX(0); }
            25% { transform: translateX(-7px) rotate(-2deg); }
            75% { transform: translateX(7px) rotate(2deg); }
        }
        .grv-river {
            position: relative;
            overflow: hidden;
            background:
                repeating-radial-gradient(ellipse at 20% 30%, rgba(255,255,255,.55) 0 8px, transparent 9px 35px),
                linear-gradient(180deg,#dff7ff 0%,#c4efff 45%,#d7f7ff 100%);
            animation: grvWaterMove 8s linear infinite;
        }
        .grv-river::before,
        .grv-river::after {
            content:'';
            position:absolute;
            left:-5%; right:-5%;
            height:22px;
            border-radius:50%;
            background:rgba(255,255,255,.45);
            filter:blur(1px);
        }
        .grv-river::before { top:20%; }
        .grv-river::after { bottom:18%; }
        .grv-answer-stone {
            position:relative;
            min-width:120px;
            min-height:72px;
            border-radius:48% 52% 45% 55% / 58% 45% 55% 42%;
            box-shadow:0 8px 0 rgba(71,85,105,.12), 0 12px 24px rgba(14,116,144,.12);
        }
        .grv-answer-stone::after {
            content:'';
            position:absolute;
            left:18%; right:18%; bottom:-8px;
            height:8px; border-radius:50%;
            background:rgba(14,116,144,.14);
            filter:blur(2px);
        }
        .grv-good { animation:grvStoneGood .55s ease; }
        .grv-bad { animation:grvStoneBad .38s ease; }
        .grv-frog-hop { animation:grvFrogHop .72s ease-in-out; }
        .grv-splash { animation:grvSplash .65s ease-out forwards; }
        .grv-progress-stone { transition:all .25s ease; }
    `;
    document.head.appendChild(style);
}

function grvRenderStart() {
    clearInterval(grvTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-5">
            <div class="bg-gradient-to-r from-cyan-50 via-sky-50 to-emerald-50 border-2 border-cyan-100 rounded-2xl p-4 text-center mb-4">
                <div class="text-6xl mb-1">🐸🌊</div>
                <h3 class="text-xl md:text-2xl font-black text-cyan-700">Grammar River</h3>
                <p class="text-sm md:text-base text-gray-600 font-bold mt-1">Chọn đúng giới từ để chú ếch nhảy qua những hòn đá và sang bờ bên kia.</p>
                <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-cyan-200 rounded-full text-sm font-black text-cyan-700">📚 Dữ liệu: 10.2 Prepositions Grammar Point</div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                ${Object.entries(GRV_LEVELS).map(([key, lv], i) => {
                    const cls = [
                        'bg-emerald-50 border-emerald-200 text-emerald-700',
                        'bg-indigo-50 border-indigo-200 text-indigo-700',
                        'bg-rose-50 border-rose-200 text-rose-700'
                    ][i];
                    return `<button onclick="grvStartLevel('${key}')" class="pastel-btn rounded-2xl border-2 ${cls} p-4 text-center">
                        <div class="text-lg font-black">${lv.label}</div>
                        <div class="text-sm font-bold mt-1">${lv.rounds} câu</div>
                        <div class="text-xs font-bold opacity-70 mt-1">${lv.note}</div>
                    </button>`;
                }).join('')}
            </div>
            <p class="text-center text-xs md:text-sm text-gray-400 font-bold mt-4">Đọc câu, nhìn hình gợi ý rồi chạm hòn đá mang giới từ đúng.</p>
        </div>`;
}

function grvStartLevel(level) {
    grvDifficulty = level;
    grvPool = shuffleArray(grvAllPool.slice());
    grvRound = 0;
    grvScore = 0;
    grvWrong = 0;
    grvStreak = 0;
    grvBestStreak = 0;
    grvStartTime = Date.now();
    grvLocked = false;
    clearInterval(grvTimerInterval);
    grvTimerInterval = setInterval(grvUpdateTimer, 1000);
    headerLevel3ClickHandler = grvRenderStart;
    grvNextRound();
}

function grvNextRound() {
    const lv = GRV_LEVELS[grvDifficulty];
    if (grvRound >= Math.min(lv.rounds, grvPool.length)) return grvFinish();
    grvCurrent = grvPool[grvRound];
    grvLocked = false;
    grvRenderRound();
}

function grvRenderRound() {
    const lv = GRV_LEVELS[grvDifficulty];
    const total = Math.min(lv.rounds, grvPool.length);
    const options = grvBuildOptions(grvCurrent, lv.options);
    const sentence = grvExtractSentence(grvCurrent.question_text);
    const progress = Math.round((grvRound / total) * 100);

    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5 overflow-hidden">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
                <span id="grv-timer" class="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-sm font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-full text-sm font-black text-cyan-700">🌊 Câu ${grvRound + 1}/${total}</span>
                <span id="grv-score" class="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-black text-emerald-700">⭐ ${grvScore}</span>
            </div>

            <div class="flex items-center gap-1.5 mb-3 px-1" aria-label="Tiến độ qua sông">
                ${Array.from({length: total}, (_, i) => `<div class="grv-progress-stone h-2.5 flex-1 rounded-full ${i < grvRound ? 'bg-emerald-400' : i === grvRound ? 'bg-cyan-400' : 'bg-slate-100'}"></div>`).join('')}
            </div>

            <div class="rounded-2xl border-2 border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-emerald-50 p-3 md:p-4 text-center mb-3">
                <div class="flex items-center justify-center gap-3">
                    <span class="text-5xl md:text-6xl">${grvEsc(grvCurrent.emoji || '🐸')}</span>
                    <div class="text-left max-w-2xl">
                        <div class="text-xs uppercase tracking-wide text-gray-400 font-black">Chọn giới từ đúng</div>
                        <div class="text-lg md:text-xl text-slate-700 font-black leading-snug mt-0.5">${grvHighlightBlank(sentence)}</div>
                    </div>
                </div>
                <button onclick="grvSpeakSentence()" class="mt-3 px-4 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm pastel-btn">🔊 Nghe câu</button>
            </div>

            <div class="grv-river rounded-3xl border-2 border-sky-200 min-h-[245px] p-4 md:p-5 mb-3">
                <div class="relative z-10 flex items-center justify-between text-sm font-black text-emerald-700 mb-2">
                    <span class="px-3 py-1 bg-emerald-50/90 border border-emerald-200 rounded-full">🌿 Bờ xuất phát</span>
                    <span class="px-3 py-1 bg-amber-50/90 border border-amber-200 rounded-full">🏁 Bờ bên kia ${progress}%</span>
                </div>
                <div class="relative z-10 flex flex-wrap justify-center items-center gap-3 md:gap-4 py-8">
                    ${options.map((opt, i) => {
                        const colors = [
                            'bg-amber-50 border-amber-300 text-amber-800',
                            'bg-violet-50 border-violet-300 text-violet-800',
                            'bg-rose-50 border-rose-300 text-rose-800',
                            'bg-emerald-50 border-emerald-300 text-emerald-800'
                        ];
                        return `<button id="grv-stone-${i}" onclick="grvChoose(${i}, '${grvJs(opt)}')" class="grv-answer-stone pastel-btn border-2 ${colors[i % colors.length]} px-5 py-3 font-black text-lg md:text-xl flex items-center justify-center">${grvEsc(opt)}</button>`;
                    }).join('')}
                </div>
                <div class="relative z-20 h-12">
                    <span id="grv-frog" class="absolute left-1/2 -translate-x-1/2 text-5xl md:text-6xl leading-none">🐸</span>
                    <span id="grv-splash" class="hidden absolute left-1/2 -translate-x-1/2 text-4xl">💦</span>
                </div>
            </div>

            <div class="flex items-center justify-center gap-2 flex-wrap">
                <button onclick="grvShowHint()" class="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-sm pastel-btn">💡 Gợi ý</button>
                <span class="px-3 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 font-black text-sm">🔥 Chuỗi đúng: ${grvStreak}</span>
            </div>
            <p id="grv-status" class="min-h-[28px] text-center text-sm md:text-base font-black mt-3"></p>
        </div>`;
    grvUpdateTimer();
}

function grvBuildOptions(q, count) {
    const answer = String(q.answer || '').trim();
    let opts = Array.isArray(q.options) ? q.options.map(v => String(v).trim()).filter(Boolean) : [];
    opts = [...new Set(opts)];
    if (!opts.some(x => x.toLowerCase() === answer.toLowerCase())) opts.push(answer);
    const wrong = shuffleArray(opts.filter(x => x.toLowerCase() !== answer.toLowerCase())).slice(0, Math.max(0, count - 1));
    return shuffleArray([answer, ...wrong]);
}

function grvChoose(index, choice) {
    if (grvLocked) return;
    const stone = document.getElementById(`grv-stone-${index}`);
    const status = document.getElementById('grv-status');
    const ok = String(choice).toLowerCase() === String(grvCurrent.answer).toLowerCase();

    if (ok) {
        grvLocked = true;
        grvScore += 10 + Math.min(grvStreak, 3) * 2;
        grvStreak++;
        grvBestStreak = Math.max(grvBestStreak, grvStreak);
        const score = document.getElementById('grv-score');
        if (score) score.textContent = `⭐ ${grvScore}`;
        if (stone) stone.classList.add('grv-good','ring-4','ring-emerald-200','bg-emerald-100','border-emerald-400','text-emerald-800');
        const frog = document.getElementById('grv-frog');
        if (frog) { frog.classList.remove('grv-frog-hop'); void frog.offsetWidth; frog.classList.add('grv-frog-hop'); }
        if (status) {
            status.textContent = `✅ Chính xác! “${grvCurrent.answer}”`;
            status.className = 'min-h-[28px] text-center text-sm md:text-base font-black mt-3 text-emerald-600';
        }
        playAudio('correct');
        speakEnglish(grvFilledSentence(grvExtractSentence(grvCurrent.question_text), grvCurrent.answer));
        setTimeout(() => { grvRound++; grvNextRound(); }, 1050);
    } else {
        grvWrong++;
        grvStreak = 0;
        if (stone) {
            stone.classList.add('grv-bad','bg-rose-100','border-rose-400','text-rose-700');
            setTimeout(() => stone.classList.remove('grv-bad'), 420);
        }
        const splash = document.getElementById('grv-splash');
        if (splash) {
            splash.classList.remove('hidden','grv-splash'); void splash.offsetWidth; splash.classList.add('grv-splash');
            setTimeout(() => splash.classList.add('hidden'), 650);
        }
        if (status) {
            status.textContent = '💦 Chưa đúng rồi! Chú ếch bị trượt chân, thử hòn đá khác nhé.';
            status.className = 'min-h-[28px] text-center text-sm md:text-base font-black mt-3 text-rose-500';
        }
        playAudio('wrong');
    }
}

function grvShowHint() {
    if (grvLocked) return;
    const status = document.getElementById('grv-status');
    if (!status) return;
    const hint = String(grvCurrent.hint || '').replace(/^Gợi ý:\s*/i, '');
    status.textContent = `💡 ${hint || 'Hãy nhìn vị trí của đồ vật và chọn giới từ phù hợp.'}`;
    status.className = 'min-h-[28px] text-center text-sm md:text-base font-black mt-3 text-amber-600';
}

function grvSpeakSentence() {
    const s = grvExtractSentence(grvCurrent?.question_text || '');
    if (!s) return;
    speakEnglish(s.replace(/_+/g, 'blank'));
}

function grvUpdateTimer() {
    const el = document.getElementById('grv-timer');
    if (!el || !grvStartTime) return;
    const sec = Math.floor((Date.now() - grvStartTime) / 1000);
    el.textContent = `⏱️ ${String(Math.floor(sec / 60)).padStart(2,'0')}:${String(sec % 60).padStart(2,'0')}`;
}

function grvFinish() {
    clearInterval(grvTimerInterval);
    grvLocked = true;
    playAudio('win');
    if (typeof confetti === 'function') confetti({ particleCount: 110, spread: 82, origin: { y: 0.62 } });
    const lv = GRV_LEVELS[grvDifficulty];
    const total = Math.min(lv.rounds, grvPool.length);
    const sec = Math.floor((Date.now() - grvStartTime) / 1000);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-6 text-center">
            <div class="text-7xl mb-2">🐸🏆🌈</div>
            <h3 class="text-2xl font-black text-cyan-700">Qua sông thành công!</h3>
            <p class="text-sm md:text-base font-bold text-gray-500 mt-1">Con đã vượt qua ${total} thử thách giới từ ở mức ${lv.label}.</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto my-4">
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-2xl font-black text-emerald-700">${grvScore}</div><div class="text-xs font-bold text-gray-500">Điểm</div></div>
                <div class="rounded-2xl bg-rose-50 border border-rose-200 p-3"><div class="text-2xl font-black text-rose-600">${grvWrong}</div><div class="text-xs font-bold text-gray-500">Lần trượt</div></div>
                <div class="rounded-2xl bg-fuchsia-50 border border-fuchsia-200 p-3"><div class="text-2xl font-black text-fuchsia-700">${grvBestStreak}</div><div class="text-xs font-bold text-gray-500">Chuỗi tốt nhất</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-2xl font-black text-cyan-700">${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}</div><div class="text-xs font-bold text-gray-500">Thời gian</div></div>
            </div>
            <div class="flex justify-center gap-2 flex-wrap">
                <button onclick="grvStartLevel('${grvDifficulty}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-black text-sm pastel-btn">🔄 Chơi lại</button>
                <button onclick="grvRenderStart()" class="px-5 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-sm pastel-btn">🎚️ Đổi độ khó</button>
            </div>
        </div>`;
}

function grvExtractSentence(text) {
    const s = String(text || '');
    const quoted = [...s.matchAll(/["']([^"']*_{2,}[^"']*)["']/g)].map(m => m[1]);
    if (quoted.length) return quoted[quoted.length - 1].trim();
    const idx = s.indexOf(':');
    return (idx >= 0 ? s.slice(idx + 1) : s).replace(/^\s*["']|["']\s*$/g, '').trim();
}

function grvFilledSentence(sentence, answer) {
    return String(sentence || '').replace(/_+/, String(answer || ''));
}

function grvHighlightBlank(sentence) {
    return grvEsc(String(sentence || '')).replace(/_+/g, '<span class="inline-block px-3 py-0.5 mx-1 rounded-lg bg-amber-100 border-b-4 border-amber-400 text-amber-700">_____</span>');
}

function grvEsc(v) {
    return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function grvJs(v) {
    return String(v ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ');
}
