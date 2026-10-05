// ==========================================
// GAME: VOCABULARY BINGO
// Nguồn dữ liệu duy nhất: Chuyên mục 2.1 - Flashcards Library.
// Nghe từ tiếng Anh rồi chọn đúng ô trên bảng.
// ==========================================
let bgoTopicId = 'all';
let bgoDifficulty = 'easy';
let bgoBoard = [];
let bgoMarked = new Set();
let bgoCalled = new Set();
let bgoCurrentIndex = null;
let bgoWrongCount = 0;
let bgoStartTime = 0;
let bgoTimerInterval = null;
let bgoLocked = false;

const BGO_DIFFICULTIES = {
    easy:   { label: 'Dễ', size: 3, lines: 1, note: '3×3 · 1 hàng Bingo' },
    medium: { label: 'Vừa', size: 4, lines: 2, note: '4×4 · 2 hàng Bingo' },
    hard:   { label: 'Khó', size: 5, lines: 3, note: '5×5 · 3 hàng Bingo' }
};

async function startBingoGame() {
    showLoadingOverlay('Đang chuẩn bị bảng Bingo từ Chuyên mục 2.1...');
    try {
        await ensureMiniGameVocabReady();
        hideLoadingOverlay();
        bgoRenderTopicScreen();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được dữ liệu Bingo: ' + e.message);
    }
}

function bgoRenderTopicScreen() {
    clearInterval(bgoTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'bingo',
        onChoose: 'bgoChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để bắt đầu chơi Bingo nhé!',
        countFilter: item => item.word && item.vietnamese && item.word.length <= 18
    });
}

function bgoChooseTopic(topicId) {
    bgoTopicId = topicId;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-5 text-center">
            <div class="text-5xl mb-2">🔊</div>
            <h3 class="font-black text-violet-600 text-lg mb-3">Chọn bảng Bingo</h3>
            <div class="grid grid-cols-3 gap-2.5 max-w-lg mx-auto">
                ${Object.entries(BGO_DIFFICULTIES).map(([key,d]) => `<button onclick="bgoStartWithDifficulty('${key}')" class="pastel-btn p-3 rounded-2xl border-2 border-violet-200 bg-violet-50 hover:bg-violet-100">
                    <div class="font-black text-violet-700">${d.label}</div>
                    <div class="text-[11px] font-bold text-gray-500 mt-1">${d.note}</div>
                </button>`).join('')}
            </div>
            <button onclick="bgoRenderTopicScreen()" class="mt-4 text-xs font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function bgoStartWithDifficulty(key) {
    bgoDifficulty = key;
    const diff = BGO_DIFFICULTIES[key];
    let pool = getMiniGameVocabPool({ topicId: bgoTopicId }).filter(x => x.word && x.vietnamese && x.word.length <= 18);
    const unique = new Map();
    pool.forEach(x => { const k = x.word.toLowerCase(); if (!unique.has(k)) unique.set(k, x); });
    pool = shuffleArray([...unique.values()]);
    const need = diff.size * diff.size;
    if (pool.length < need) {
        alert(`Nhóm này cần ít nhất ${need} từ để tạo bảng ${diff.size}×${diff.size}.`);
        return;
    }
    bgoBoard = pool.slice(0, need);
    bgoMarked = new Set();
    bgoCalled = new Set();
    bgoCurrentIndex = null;
    bgoWrongCount = 0;
    bgoLocked = false;
    bgoStartTime = Date.now();
    clearInterval(bgoTimerInterval);
    bgoTimerInterval = setInterval(bgoUpdateTimer, 1000);
    headerLevel3ClickHandler = () => bgoChooseTopic(bgoTopicId);
    bgoRenderBoard();
    setTimeout(bgoNextCall, 550);
}

function bgoRenderBoard() {
    const diff = BGO_DIFFICULTIES[bgoDifficulty];
    const gridClass = diff.size === 3 ? 'grid-cols-3' : diff.size === 4 ? 'grid-cols-4' : 'grid-cols-5';
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4">
            <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span id="bgo-timer" class="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-black text-slate-600">⏱️ 00:00</span>
                <span id="bgo-lines" class="px-2.5 py-1 bg-violet-50 border border-violet-200 rounded-full text-xs font-black text-violet-700">🎉 0/${diff.lines} Bingo</span>
                <span id="bgo-wrong" class="px-2.5 py-1 bg-rose-50 border border-rose-200 rounded-full text-xs font-black text-rose-600">❌ 0</span>
            </div>
            <div class="text-center rounded-2xl border-2 border-violet-100 bg-gradient-to-r from-violet-50 to-pink-50 p-3 mb-3">
                <div class="text-xs font-black text-gray-400 uppercase tracking-wide">Từ đang gọi</div>
                <div class="text-3xl mt-1">🔊</div>
                <button onclick="bgoReplayCall()" class="mt-1 px-4 py-2 rounded-full bg-white border border-violet-200 text-violet-700 font-black text-sm pastel-btn">Nghe lại</button>
                <div class="text-[11px] font-bold text-gray-400 mt-1">Nghe kỹ rồi chọn đúng từ trên bảng</div>
            </div>
            <div id="bgo-board" class="grid ${gridClass} gap-2 max-w-2xl mx-auto">
                ${bgoBoard.map((item,i) => bgoCellHtml(item,i)).join('')}
            </div>
            <p id="bgo-status" class="min-h-[24px] text-center text-sm font-black mt-3"></p>
        </div>`;
    bgoUpdateTimer();
}

function bgoCellHtml(item, index) {
    const marked = bgoMarked.has(index);
    const palette = getMiniGamePaletteOrder('bingo-board')[index % MINIGAME_TOPIC_PALETTES.length];
    const normalClass = `${palette.card}`;
    return `<button id="bgo-cell-${index}" onclick="bgoChooseCell(${index})" class="min-h-[78px] sm:min-h-[88px] rounded-2xl border-2 p-2.5 shadow-sm pastel-btn flex flex-col items-center justify-center ${marked ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : normalClass}" ${marked ? 'disabled' : ''}>
        <span class="text-xl">${marked ? '✅' : (item.emoji || '✨')}</span>
        <span class="text-sm sm:text-base font-black leading-tight break-words w-full mt-1">${bgoEscapeHtml(item.word)}</span>
    </button>`;
}

function bgoNextCall() {
    if (bgoCountLines() >= BGO_DIFFICULTIES[bgoDifficulty].lines) return bgoFinish();
    const available = bgoBoard.map((_,i) => i).filter(i => !bgoMarked.has(i) && !bgoCalled.has(i));
    if (!available.length) {
        bgoCalled.clear();
        return bgoNextCall();
    }
    bgoCurrentIndex = available[Math.floor(Math.random() * available.length)];
    bgoCalled.add(bgoCurrentIndex);
    bgoLocked = false;
    bgoReplayCall();
}

function bgoReplayCall() {
    if (bgoCurrentIndex === null || !bgoBoard[bgoCurrentIndex]) return;
    speakEnglish(bgoBoard[bgoCurrentIndex].word);
}

function bgoChooseCell(index) {
    if (bgoLocked || bgoCurrentIndex === null || bgoMarked.has(index)) return;
    const status = document.getElementById('bgo-status');
    if (index === bgoCurrentIndex) {
        bgoLocked = true;
        bgoMarked.add(index);
        playAudio('correct');
        speakEnglish(bgoBoard[index].word);
        if (status) { status.textContent = `✅ Chính xác! ${bgoBoard[index].word} = ${bgoBoard[index].vietnamese}`; status.className = 'min-h-[24px] text-center text-sm font-black mt-3 text-emerald-600'; }
        const old = document.getElementById(`bgo-cell-${index}`);
        if (old) { const wrap = document.createElement('div'); wrap.innerHTML = bgoCellHtml(bgoBoard[index], index).trim(); old.replaceWith(wrap.firstChild); }
        const lines = bgoCountLines();
        const lineEl = document.getElementById('bgo-lines');
        if (lineEl) lineEl.textContent = `🎉 ${lines}/${BGO_DIFFICULTIES[bgoDifficulty].lines} Bingo`;
        if (lines >= BGO_DIFFICULTIES[bgoDifficulty].lines) setTimeout(bgoFinish, 700);
        else setTimeout(bgoNextCall, 750);
    } else {
        bgoWrongCount++;
        playAudio('wrong');
        const wrongEl = document.getElementById('bgo-wrong'); if (wrongEl) wrongEl.textContent = `❌ ${bgoWrongCount}`;
        const cell = document.getElementById(`bgo-cell-${index}`);
        if (cell) { cell.classList.add('ring-2','ring-rose-300','bg-rose-50'); setTimeout(() => cell.classList.remove('ring-2','ring-rose-300','bg-rose-50'), 450); }
        if (status) { status.textContent = 'Chưa đúng ô đang được gọi, con nghe lại nhé!'; status.className = 'min-h-[24px] text-center text-sm font-black mt-3 text-rose-500'; }
    }
}

function bgoCountLines() {
    const n = BGO_DIFFICULTIES[bgoDifficulty].size;
    let lines = 0;
    for (let r = 0; r < n; r++) if ([...Array(n)].every((_,c) => bgoMarked.has(r*n+c))) lines++;
    for (let c = 0; c < n; c++) if ([...Array(n)].every((_,r) => bgoMarked.has(r*n+c))) lines++;
    if ([...Array(n)].every((_,i) => bgoMarked.has(i*n+i))) lines++;
    if ([...Array(n)].every((_,i) => bgoMarked.has(i*n+(n-1-i)))) lines++;
    return lines;
}

function bgoUpdateTimer() {
    const el = document.getElementById('bgo-timer');
    if (!el || !bgoStartTime) return;
    const secs = Math.floor((Date.now() - bgoStartTime) / 1000);
    el.textContent = `⏱️ ${String(Math.floor(secs/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`;
}

function bgoFinish() {
    clearInterval(bgoTimerInterval);
    bgoLocked = true;
    playAudio('win');
    if (typeof confetti === 'function') confetti({ particleCount: 90, spread: 75, origin: { y: 0.65 } });
    const diff = BGO_DIFFICULTIES[bgoDifficulty];
    const secs = Math.floor((Date.now() - bgoStartTime) / 1000);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-6 text-center">
            <div class="text-6xl mb-2">🎲🏆</div>
            <h3 class="text-xl font-black text-violet-600">BINGO!</h3>
            <p class="text-sm font-bold text-gray-500 mt-1">Con đã hoàn thành ${diff.lines} hàng Bingo.</p>
            <div class="grid grid-cols-3 gap-2 max-w-md mx-auto my-4">
                <div class="rounded-2xl bg-violet-50 border border-violet-200 p-3"><div class="text-xl font-black text-violet-700">${bgoCountLines()}</div><div class="text-[10px] font-bold text-gray-500">Hàng Bingo</div></div>
                <div class="rounded-2xl bg-rose-50 border border-rose-200 p-3"><div class="text-xl font-black text-rose-600">${bgoWrongCount}</div><div class="text-[10px] font-bold text-gray-500">Lần chọn sai</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-xl font-black text-cyan-700">${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</div><div class="text-[10px] font-bold text-gray-500">Thời gian</div></div>
            </div>
            <div class="flex justify-center gap-2 flex-wrap">
                <button onclick="bgoStartWithDifficulty('${bgoDifficulty}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-black text-sm pastel-btn">🔄 Chơi lại ${diff.label}</button>
                <button onclick="bgoRenderTopicScreen()" class="px-5 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-black text-sm pastel-btn">📚 Đổi nhóm từ</button>
            </div>
        </div>`;
}

function bgoEscapeHtml(v) { return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
