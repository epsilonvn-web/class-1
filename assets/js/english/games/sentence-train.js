// ==========================================
// GAME 5: SENTENCE TRAIN
// Nguon du lieu: Chuyen muc 7.1 - Simple Sentence Builder.
// Gameplay: chon cac toa tu theo dung thu tu de lap thanh cau; dung thi doan tau chay.
// ==========================================
let stnAllPool = [];
let stnPool = [];
let stnDifficulty = 'easy';
let stnRound = 0;
let stnScore = 0;
let stnWrong = 0;
let stnHintsLeft = 0;
let stnStartTime = 0;
let stnTimerInterval = null;
let stnCurrent = null;
let stnTiles = [];
let stnChosen = [];
let stnLocked = false;

const STN_LEVELS = {
    easy:   { label: 'Dễ', rounds: 8,  minWords: 3, maxWords: 4, hints: 3, note: 'Câu 3-4 từ' },
    medium: { label: 'Vừa', rounds: 10, minWords: 5, maxWords: 5, hints: 2, note: 'Câu 5 từ' },
    hard:   { label: 'Khó', rounds: 12, minWords: 5, maxWords: 7, hints: 1, note: 'Câu 5-7 từ' }
};

async function startSentenceTrainGame() {
    showLoadingOverlay('Đang chuẩn bị các toa tàu từ Chuyên mục 7.1...');
    try {
        stnAllPool = await ensureMiniGameLearningReady(['7.1']);
        stnAllPool = stnAllPool.filter(q => stnWords(q.answer).length >= 3);
        hideLoadingOverlay();
        stnEnsureStyles();
        stnRenderStart();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được Sentence Train: ' + e.message);
    }
}

function stnEnsureStyles() {
    if (document.getElementById('sentence-train-style')) return;
    const style = document.createElement('style');
    style.id = 'sentence-train-style';
    style.textContent = `
        @keyframes stnTrainRun {
            0%   { transform: translateX(0); }
            12%  { transform: translateX(8px); }
            100% { transform: translateX(calc(100% + 150px)); }
        }
        @keyframes stnTrainShake {
            0%,100% { transform: translateY(0); }
            50%     { transform: translateY(-2px); }
        }
        @keyframes stnSmoke {
            0%   { transform: translate(0,0) scale(.45); opacity:0; }
            15%  { opacity:.85; }
            100% { transform: translate(18px,-38px) scale(1.55); opacity:0; }
        }
        @keyframes stnWheelSpin { to { transform: rotate(360deg); } }
        .stn-train-viewport { overflow:hidden; position:relative; }
        .stn-consist { width:max-content; will-change:transform; }
        .stn-run { animation: stnTrainRun 2.20s cubic-bezier(.2,.75,.35,1) forwards; }
        .stn-running .stn-engine { animation: stnTrainShake .18s linear infinite; }
        .stn-smoke { opacity:0; pointer-events:none; }
        .stn-running .stn-smoke { animation: stnSmoke .72s ease-out infinite; }
        .stn-running .stn-smoke-2 { animation-delay:.24s; }
        .stn-running .stn-smoke-3 { animation-delay:.48s; }
        .stn-wheel { transform-origin:center; }
        .stn-running .stn-wheel { animation: stnWheelSpin .32s linear infinite; }
        .stn-track { background: repeating-linear-gradient(90deg,#d1d5db 0 26px,transparent 26px 38px); height:5px; border-radius:999px; }
    `;
    document.head.appendChild(style);
}

function stnRenderStart() {
    clearInterval(stnTimerInterval);
    headerLevel3ClickHandler = null;
    const counts = Object.entries(STN_LEVELS).map(([key, lv]) => {
        const n = stnAllPool.filter(q => {
            const c = stnWords(q.answer).length;
            return c >= lv.minWords && c <= lv.maxWords;
        }).length;
        return [key, n];
    });
    const countMap = Object.fromEntries(counts);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-5">
            <div class="bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border-2 border-amber-100 rounded-2xl p-4 text-center mb-4">
                <div class="text-6xl mb-1">🚂</div>
                <h3 class="text-xl md:text-2xl font-black text-orange-600">Sentence Train</h3>
                <p class="text-sm md:text-base text-gray-600 font-bold mt-1">Xếp các toa từ đúng thứ tự để đoàn tàu tạo thành một câu hoàn chỉnh.</p>
                <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-amber-200 rounded-full text-sm font-black text-amber-700">📚 Dữ liệu: 7.1 Simple Sentence Builder</div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                ${Object.entries(STN_LEVELS).map(([key, lv], i) => {
                    const cls = [
                        'bg-emerald-50 border-emerald-200 text-emerald-700',
                        'bg-indigo-50 border-indigo-200 text-indigo-700',
                        'bg-rose-50 border-rose-200 text-rose-700'
                    ][i];
                    return `<button onclick="stnStartLevel('${key}')" class="pastel-btn rounded-2xl border-2 ${cls} p-4 text-center">
                        <div class="text-lg font-black">${lv.label}</div>
                        <div class="text-sm font-bold mt-1">${lv.rounds} câu · ${lv.note}</div>
                        <div class="text-xs font-bold opacity-70 mt-1">${countMap[key]} câu phù hợp trong kho</div>
                    </button>`;
                }).join('')}
            </div>
            <p class="text-center text-xs md:text-sm text-gray-400 font-bold mt-4">Chạm từng toa để nối vào tàu. Chạm toa đã chọn để đưa nó trở lại kho.</p>
        </div>`;
}

function stnStartLevel(level) {
    const lv = STN_LEVELS[level];
    stnDifficulty = level;
    stnPool = stnAllPool.filter(q => {
        const c = stnWords(q.answer).length;
        return c >= lv.minWords && c <= lv.maxWords;
    });
    if (stnPool.length < 3) {
        alert('Chưa đủ câu phù hợp cho độ khó này.');
        return;
    }
    stnPool = shuffleArray(stnPool.slice());
    stnRound = 0;
    stnScore = 0;
    stnWrong = 0;
    stnHintsLeft = lv.hints;
    stnStartTime = Date.now();
    clearInterval(stnTimerInterval);
    stnTimerInterval = setInterval(stnUpdateTimer, 1000);
    headerLevel3ClickHandler = stnRenderStart;
    stnNextRound();
}

function stnNextRound() {
    const lv = STN_LEVELS[stnDifficulty];
    if (stnRound >= Math.min(lv.rounds, stnPool.length)) return stnFinish();
    stnCurrent = stnPool[stnRound];
    const words = stnWords(stnCurrent.answer);
    let mixed = words.map((word, index) => ({ word, index }));
    for (let i = 0; i < 12; i++) {
        mixed = shuffleArray(words.map((word, index) => ({ word, index })));
        if (mixed.map(x => x.word.toLowerCase()).join('|') !== words.map(x => x.toLowerCase()).join('|')) break;
    }
    stnTiles = mixed.map((x, tileIndex) => ({ ...x, tileIndex }));
    stnChosen = [];
    stnLocked = false;
    stnRenderRound();
}

function stnRenderRound() {
    const lv = STN_LEVELS[stnDifficulty];
    const total = Math.min(lv.rounds, stnPool.length);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5 overflow-hidden">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
                <span id="stn-timer" class="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-sm font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-sm font-black text-orange-700">🚉 Câu ${stnRound + 1}/${total}</span>
                <span id="stn-score" class="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-black text-emerald-700">⭐ ${stnScore}</span>
            </div>

            <div class="rounded-2xl border-2 border-sky-100 bg-gradient-to-b from-sky-50 to-emerald-50/40 p-3 md:p-4 mb-4">
                <div class="flex items-center justify-center gap-2 mb-2">
                    <span class="text-4xl md:text-5xl">${stnCurrent.emoji || '✨'}</span>
                    <div class="text-left">
                        <div class="text-xs uppercase tracking-wide text-gray-400 font-black">Nhiệm vụ</div>
                        <div class="text-base md:text-lg text-gray-700 font-black">Xếp các toa thành câu đúng</div>
                    </div>
                </div>
                <div id="stn-train" class="stn-train-viewport py-3 px-1 min-h-[90px]">
                    <div id="stn-train-consist" class="stn-consist flex items-end gap-1.5">
                        <div class="stn-engine relative shrink-0 flex flex-col items-center">
                            <span class="absolute -top-2 left-7 text-xl stn-smoke stn-smoke-1">💨</span>
                            <span class="absolute -top-2 left-7 text-lg stn-smoke stn-smoke-2">💨</span>
                            <span class="absolute -top-2 left-7 text-base stn-smoke stn-smoke-3">💨</span>
                            <span class="text-5xl md:text-6xl leading-none">🚂</span>
                        </div>
                        <div id="stn-built-cars" class="flex items-end gap-1.5"></div>
                    </div>
                </div>
                <div class="stn-track w-full"></div>
            </div>

            <div class="text-center mb-2 text-sm font-black text-purple-600">Kho toa từ</div>
            <div id="stn-tile-bank" class="flex flex-wrap justify-center gap-2 min-h-[58px] mb-4"></div>

            <div class="flex flex-wrap justify-center gap-2">
                <button onclick="stnUndo()" class="px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 font-black text-sm pastel-btn">↶ Lùi 1 toa</button>
                <button onclick="stnReset()" class="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-sm pastel-btn">↺ Làm lại</button>
                <button id="stn-hint-btn" onclick="stnHint()" class="px-4 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 font-black text-sm pastel-btn">💡 Gợi ý (${stnHintsLeft})</button>
                <button onclick="stnCheck()" class="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-sm shadow-md pastel-btn">🚦 Cho tàu chạy</button>
            </div>
            <p id="stn-status" class="min-h-[25px] text-center text-sm md:text-base font-black mt-3"></p>
        </div>`;
    stnRenderTiles();
    stnUpdateTimer();
}

function stnRenderTiles() {
    const built = document.getElementById('stn-built-cars');
    const bank = document.getElementById('stn-tile-bank');
    if (!built || !bank) return;
    built.innerHTML = stnChosen.map((tileIndex, pos) => {
        const t = stnTiles[tileIndex];
        const colors = ['bg-pink-100 border-pink-300 text-pink-800','bg-amber-100 border-amber-300 text-amber-800','bg-indigo-100 border-indigo-300 text-indigo-800','bg-emerald-100 border-emerald-300 text-emerald-800','bg-cyan-100 border-cyan-300 text-cyan-800','bg-purple-100 border-purple-300 text-purple-800'];
        return `<button onclick="stnRemoveChosen(${pos})" class="shrink-0 min-w-[76px] h-12 px-3 rounded-xl border-2 ${colors[pos % colors.length]} font-black text-sm md:text-base shadow-sm pastel-btn relative">
            ${stnEsc(t.word)}<span class="absolute -bottom-2 left-3 w-3 h-3 bg-slate-500 rounded-full border-2 border-white"></span><span class="absolute -bottom-2 right-3 w-3 h-3 bg-slate-500 rounded-full border-2 border-white"></span>
        </button>`;
    }).join('');

    bank.innerHTML = stnTiles.map((t, i) => {
        const used = stnChosen.includes(i);
        return `<button onclick="stnChoose(${i})" ${used || stnLocked ? 'disabled' : ''} class="px-4 py-2.5 rounded-xl border-2 border-purple-200 bg-purple-50 text-purple-700 font-black text-sm md:text-base shadow-sm pastel-btn ${used ? 'opacity-20 scale-95' : ''}">${stnEsc(t.word)}</button>`;
    }).join('');
}

function stnChoose(tileIndex) {
    if (stnLocked || stnChosen.includes(tileIndex)) return;
    stnChosen.push(tileIndex);
    stnRenderTiles();
}

function stnRemoveChosen(pos) {
    if (stnLocked) return;
    stnChosen.splice(pos, 1);
    stnRenderTiles();
}

function stnUndo() {
    if (stnLocked) return;
    stnChosen.pop();
    stnRenderTiles();
}

function stnReset() {
    if (stnLocked) return;
    stnChosen = [];
    stnRenderTiles();
}

function stnHint() {
    if (stnLocked || stnHintsLeft <= 0) return;
    const answerWords = stnWords(stnCurrent.answer);
    const pos = stnChosen.length;
    if (pos >= answerWords.length) return;

    // Neu phan da xep sai, dua cac toa sai ve kho tu vi tri sai dau tien.
    let firstWrong = -1;
    for (let i = 0; i < stnChosen.length; i++) {
        if (stnTiles[stnChosen[i]].word.toLowerCase() !== answerWords[i].toLowerCase()) { firstWrong = i; break; }
    }
    if (firstWrong >= 0) stnChosen = stnChosen.slice(0, firstWrong);

    const nextPos = stnChosen.length;
    const target = answerWords[nextPos].toLowerCase();
    const idx = stnTiles.findIndex((t, i) => !stnChosen.includes(i) && t.word.toLowerCase() === target);
    if (idx >= 0) {
        stnChosen.push(idx);
        stnHintsLeft--;
        const btn = document.getElementById('stn-hint-btn');
        if (btn) btn.textContent = `💡 Gợi ý (${stnHintsLeft})`;
        stnRenderTiles();
        const status = document.getElementById('stn-status');
        if (status) { status.textContent = '💡 Cô đã nối đúng 1 toa cho con.'; status.className = 'min-h-[25px] text-center text-sm md:text-base font-black mt-3 text-cyan-600'; }
    }
}

function stnCheck() {
    if (stnLocked) return;
    const target = stnWords(stnCurrent.answer).map(x => x.toLowerCase());
    const current = stnChosen.map(i => stnTiles[i].word.toLowerCase());
    const status = document.getElementById('stn-status');

    if (current.length !== target.length) {
        if (status) { status.textContent = '🚃 Con cần nối đủ tất cả các toa trước nhé!'; status.className = 'min-h-[25px] text-center text-sm md:text-base font-black mt-3 text-amber-600'; }
        return;
    }

    const ok = current.every((w, i) => w === target[i]);
    if (ok) {
        stnLocked = true;
        stnScore += 10;
        const score = document.getElementById('stn-score'); if (score) score.textContent = `⭐ ${stnScore}`;
        playAudio('correct');
        if (status) { status.textContent = `✅ ${stnCurrent.answer}`; status.className = 'min-h-[25px] text-center text-sm md:text-base font-black mt-3 text-emerald-600'; }
        const trainViewport = document.getElementById('stn-train');
        const train = document.getElementById('stn-train-consist');
        if (trainViewport) trainViewport.classList.add('stn-running');
        if (train) {
            train.classList.remove('stn-run');
            void train.offsetWidth;
            train.classList.add('stn-run');
        }
        speakEnglish(stnCurrent.answer);
        setTimeout(() => { stnRound++; stnNextRound(); }, 2450);
    } else {
        stnWrong++;
        playAudio('wrong');
        if (status) { status.textContent = '❌ Thứ tự các toa chưa đúng. Con thử đổi lại nhé!'; status.className = 'min-h-[25px] text-center text-sm md:text-base font-black mt-3 text-rose-500'; }
        const train = document.getElementById('stn-train');
        if (train) { train.classList.add('animate-pulse'); setTimeout(() => train.classList.remove('animate-pulse'), 450); }
    }
}

function stnUpdateTimer() {
    const el = document.getElementById('stn-timer');
    if (!el || !stnStartTime) return;
    const sec = Math.floor((Date.now() - stnStartTime) / 1000);
    el.textContent = `⏱️ ${String(Math.floor(sec / 60)).padStart(2,'0')}:${String(sec % 60).padStart(2,'0')}`;
}

function stnFinish() {
    clearInterval(stnTimerInterval);
    stnLocked = true;
    playAudio('win');
    if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 78, origin: { y: 0.65 } });
    const lv = STN_LEVELS[stnDifficulty];
    const total = Math.min(lv.rounds, stnPool.length);
    const sec = Math.floor((Date.now() - stnStartTime) / 1000);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-6 text-center">
            <div class="text-7xl mb-2">🚂🏆</div>
            <h3 class="text-2xl font-black text-orange-600">Đoàn tàu đã về ga!</h3>
            <p class="text-sm md:text-base font-bold text-gray-500 mt-1">Con đã hoàn thành ${total} câu ở mức ${lv.label}.</p>
            <div class="grid grid-cols-3 gap-2 max-w-lg mx-auto my-4">
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-2xl font-black text-emerald-700">${stnScore}</div><div class="text-xs font-bold text-gray-500">Điểm</div></div>
                <div class="rounded-2xl bg-rose-50 border border-rose-200 p-3"><div class="text-2xl font-black text-rose-600">${stnWrong}</div><div class="text-xs font-bold text-gray-500">Lần xếp sai</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-2xl font-black text-cyan-700">${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}</div><div class="text-xs font-bold text-gray-500">Thời gian</div></div>
            </div>
            <div class="flex justify-center gap-2 flex-wrap">
                <button onclick="stnStartLevel('${stnDifficulty}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-black text-sm pastel-btn">🔄 Chơi lại</button>
                <button onclick="stnRenderStart()" class="px-5 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-black text-sm pastel-btn">🎚️ Đổi độ khó</button>
            </div>
        </div>`;
}

function stnWords(sentence) {
    return (String(sentence || '').match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || []);
}

function stnEsc(v) {
    return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
