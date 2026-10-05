// ==========================================
// GAME: WORD SEARCH — tách riêng file để lazy-load (chỉ tải khi bé thật sự bấm vào game này)
// ==========================================
// ---------- WORD SEARCH (đã nâng cấp: chọn độ khó, đồng hồ, gợi ý, chơi lại) ----------
let wsGrid = [], wsSolutions = {}, wsFoundWords = new Set(), wsPlacedCells = {};
let wsTopicId = 'all';
let wsSelecting = false, wsStartCell = null, wsCurrentPath = [];
let wsSize = 9, wsWordCount = 6;
let wsCurrentDirs = null;
let wsCurrentDifficulty = 'medium';
let wsStartTime = 0, wsTimerInterval = null, wsHintsLeft = 3, wsHintsUsed = 0;
const WS_DIRS_STRAIGHT = [[0,1],[1,0]];                                        // Dễ: chỉ ngang + dọc
const WS_DIRS_FULL = [[0,1],[1,0],[1,1],[0,-1],[-1,0],[-1,-1],[1,-1],[-1,1]];   // Vừa/Khó: đủ 8 hướng kể cả chéo
const WS_DIFFICULTIES = {
    easy:   { label: 'Dễ',   words: 5, size: 8,  color: 'emerald', dirs: WS_DIRS_STRAIGHT, dirsLabel: 'ngang, dọc' },
    medium: { label: 'Vừa',  words: 6, size: 9,  color: 'amber',   dirs: WS_DIRS_FULL,     dirsLabel: 'ngang, dọc, chéo' },
    hard:   { label: 'Khó',  words: 8, size: 11, color: 'rose',    dirs: WS_DIRS_FULL,     dirsLabel: 'ngang, dọc, chéo' }
};

async function startWordSearchGame() {
    showLoadingOverlay("Đang chuẩn bị ô chữ...");
    try {
        await fetchAllQuestionsFlat();
        hideLoadingOverlay();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được từ vựng cho Word Search: ' + e.message);
        return;
    }
    wsRenderTopicScreen();
}

function wsRenderTopicScreen() {
    clearInterval(wsTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'word-search',
        onChoose: 'wsChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để bắt đầu tìm từ nhé!',
        countFilter: item => /^[A-Za-z]+$/.test(item.word || '') && item.word.length >= 3 && item.word.length <= 7
    });
}

function wsChooseTopic(topicId) {
    wsTopicId = topicId;
    renderWordSearchDifficultyScreen();
}

function renderWordSearchDifficultyScreen() {
    clearInterval(wsTimerInterval);
    headerLevel3ClickHandler = null;
    const level3El = document.getElementById('header-level3-btn');
    if (level3El) { level3El.classList.remove('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.add('cursor-default'); }
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-5 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🔍</div>
            <h3 class="font-extrabold text-teal-700 text-lg mb-1">Word Search</h3>
            <p class="text-sm text-gray-500 font-bold mb-3">Chọn độ khó để bắt đầu nhé!</p>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-3">
                ${Object.entries(WS_DIFFICULTIES).map(([key, d]) => `
                    <button onclick="wsStartWithDifficulty('${key}')" class="pastel-btn flex flex-col items-center gap-1 p-3 rounded-2xl border-2 border-${d.color}-200 bg-${d.color}-50 hover:bg-${d.color}-100 text-${d.color}-700 shadow-sm">
                        <span class="font-black text-base">${d.label}</span>
                        <span class="text-xs font-bold opacity-80">${d.words} từ</span>
                        <span class="text-xs font-bold opacity-70">lưới ${d.size}x${d.size}</span>
                        <span class="text-[10px] font-bold opacity-60">(${d.dirsLabel})</span>
                    </button>
                `).join('')}
            </div>
            <button onclick="wsToggleRules()" class="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200 pastel-btn">📖 Xem luật chơi</button>
            <div id="ws-rules-panel" class="hidden mt-3 w-full max-w-sm text-left bg-indigo-50/60 border border-indigo-200 rounded-2xl p-3.5 text-sm text-gray-600 font-bold leading-relaxed">
                <p class="mb-1.5">🔤 Từ tiếng Anh được giấu trong lưới theo <b>hàng ngang</b> hoặc <b>hàng dọc</b> — riêng độ <b>Vừa/Khó</b> còn giấu thêm theo <b>đường chéo</b> nữa nhé!</p>
                <p class="mb-1.5">↔️ Mỗi từ có thể đọc <b>xuôi</b> (trái→phải, trên→dưới) hoặc <b>ngược</b> (phải→trái, dưới→trên) — cứ thử cả 2 chiều nếu chưa thấy.</p>
                <p>👆 Chạm vào chữ cái đầu tiên, rồi <b>kéo thẳng một đường</b> tới chữ cái cuối cùng của từ đó để chọn.</p>
            </div>
            <button onclick="wsRenderTopicScreen()" class="mt-3 text-sm font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function wsToggleRules() {
    const panel = document.getElementById('ws-rules-panel');
    if (panel) panel.classList.toggle('hidden');
}

function wsStartWithDifficulty(diffKey) {
    const diff = WS_DIFFICULTIES[diffKey];
    wsSize = diff.size;
    wsWordCount = diff.words;
    wsCurrentDifficulty = diffKey;
    wsCurrentDirs = diff.dirs;
    wsGenerateAndRender();
}

function wsGenerateAndRender() {
    const pool = shuffleArray(getWordSearchVocabPool(wsTopicId)).filter(item => item.w.length <= wsSize);
    let poolIdx = 0;
    const usedWords = new Set();
    const chosen = [];

    wsFoundWords = new Set();
    wsPlacedCells = {};
    wsHintsLeft = wsWordCount;
    wsHintsUsed = 0;
    wsGrid = Array.from({ length: wsSize }, () => Array(wsSize).fill(null));
    wsSolutions = {};

    // Thử đặt từng từ vào lưới THẬT SỰ trước khi cho vào danh sách hiển thị — nếu 1 từ đặt thất bại
    // (thường do từ quá dài, hết chỗ trống phù hợp), TỰ ĐỘNG thay bằng từ khác trong kho, không bao giờ
    // để lọt 1 từ vào danh sách "cần tìm" mà thực chất không tồn tại trong ô chữ (lỗi đã xảy ra trước đây).
    while (chosen.length < wsWordCount && poolIdx < pool.length) {
        const item = pool[poolIdx++];
        if (usedWords.has(item.w)) continue;
        const cells = wsTryPlaceWord(item.w);
        if (!cells) continue; // đặt thất bại -> bỏ qua, thử từ tiếp theo trong kho, KHÔNG thêm vào danh sách
        usedWords.add(item.w);
        wsSolutions[item.w] = cells;
        chosen.push(item);
    }

    if (chosen.length < 4) {
        document.getElementById('game-play-container').innerHTML = `<p class="text-center text-gray-500 font-bold py-8">Chưa đủ từ vựng phù hợp để chơi Word Search, bé quay lại sau nhé!</p>`;
        return;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < wsSize; r++) {
        for (let c = 0; c < wsSize; c++) {
            if (wsGrid[r][c] === null) wsGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
    }

    renderWordSearchUI(chosen);
    wsStartTime = Date.now();
    clearInterval(wsTimerInterval);
    wsTimerInterval = setInterval(wsUpdateTimerDisplay, 1000);
}

function wsTryPlaceWord(word) {
    for (let attempt = 0; attempt < 100; attempt++) {
        const dirs = wsCurrentDirs || WS_DIRS_FULL;
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const row = Math.floor(Math.random() * wsSize);
        const col = Math.floor(Math.random() * wsSize);
        const endRow = row + dir[0] * (word.length - 1);
        const endCol = col + dir[1] * (word.length - 1);
        if (endRow < 0 || endRow >= wsSize || endCol < 0 || endCol >= wsSize) continue;
        let ok = true;
        const cells = [];
        for (let i = 0; i < word.length; i++) {
            const r = row + dir[0] * i, c = col + dir[1] * i;
            const existing = wsGrid[r][c];
            if (existing !== null && existing !== word[i]) { ok = false; break; }
            cells.push([r, c]);
        }
        if (!ok) continue;
        cells.forEach((rc, i) => { wsGrid[rc[0]][rc[1]] = word[i]; });
        return cells;
    }
    return null;
}

function wsUpdateTimerDisplay() {
    const el = document.getElementById('ws-timer');
    if (!el) { clearInterval(wsTimerInterval); return; }
    const secs = Math.floor((Date.now() - wsStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    el.textContent = `⏱️ ${mm}:${ss}`;
}

function renderWordSearchUI(chosen) {
    // Trong lúc đang chơi (đã có lưới), bấm vào tên game trên breadcrumb -> quay lại màn chọn độ khó.
    headerLevel3ClickHandler = renderWordSearchDifficultyScreen;
    if (typeof updateNavTabs === 'function') {
        const level3El = document.getElementById('header-level3-btn');
        if (level3El) { level3El.classList.add('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.remove('cursor-default'); }
    }
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4 flex flex-col items-center">
            <div class="flex items-center justify-between w-full max-w-[380px] mb-2 gap-1.5">
                <span id="ws-timer" class="text-xs md:text-sm font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">⏱️ 00:00</span>
                <button id="ws-hint-btn" onclick="wsUseHint()" class="text-xs md:text-sm font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 pastel-btn">💡 Gợi ý (${wsHintsLeft})</button>
                <button onclick="wsGenerateAndRender()" class="text-xs md:text-sm font-black text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 px-2.5 py-1 rounded-full shadow-sm pastel-btn">🔄 Chơi lại</button>
            </div>
            <p class="text-sm md:text-base font-bold text-gray-500 mb-1">Kéo qua các ô để nối thành 1 từ tiếng Anh nhé!</p>
            <p class="text-xs text-indigo-400 font-bold mb-2">💡 Từ giấu theo ${(WS_DIFFICULTIES[wsCurrentDifficulty] || {}).dirsLabel || 'ngang, dọc'}, có thể đọc xuôi hoặc ngược</p>
            <div id="ws-grid" class="grid gap-1 mb-3" style="grid-template-columns: repeat(${wsSize}, 1fr); max-width: 400px; width: 100%; touch-action: none; user-select: none;"></div>
            <div id="ws-wordlist" class="flex flex-wrap gap-2 justify-center mb-2"></div>
            <p id="ws-status" class="text-sm font-bold text-pink-500 text-center min-h-[18px]"></p>
        </div>`;

    const gridEl = document.getElementById('ws-grid');
    for (let r = 0; r < wsSize; r++) {
        for (let c = 0; c < wsSize; c++) {
            const cell = document.createElement('div');
            cell.textContent = wsGrid[r][c];
            cell.dataset.r = r; cell.dataset.c = c;
            cell.className = 'ws-cell aspect-square flex items-center justify-center text-sm md:text-lg font-black rounded-lg bg-white text-gray-700 cursor-pointer border-2 border-pink-100 transition-transform duration-150';
            gridEl.appendChild(cell);
        }
    }

    const wordlistEl = document.getElementById('ws-wordlist');
    wordlistEl.innerHTML = chosen.map(item => `
        <span id="ws-pill-${item.w}" class="text-sm md:text-base font-bold px-3 py-1 rounded-full bg-white border-2 border-pink-200 text-gray-600 transition-all duration-300">${escapeHtml(item.vi)}</span>
    `).join('');

    wsBindEvents(gridEl);
}

function wsUseHint() {
    if (wsHintsLeft <= 0) return;
    const remaining = Object.keys(wsSolutions).filter(w => !wsFoundWords.has(w));
    if (!remaining.length) return;
    const word = remaining[Math.floor(Math.random() * remaining.length)];
    const cells = wsSolutions[word];
    if (!cells) return;
    wsHintsLeft--;
    wsHintsUsed++;
    document.getElementById('ws-hint-btn').textContent = `💡 Gợi ý (${wsHintsLeft})`;
    if (wsHintsLeft <= 0) document.getElementById('ws-hint-btn').classList.add('opacity-40', 'pointer-events-none');

    const gridEl = document.getElementById('ws-grid');
    const [r, c] = cells[0];
    const el = gridEl.children[r * wsSize + c];
    el.classList.add('bg-amber-300', 'scale-110');
    setTimeout(() => { if (!wsPlacedCells[wsCellKey(r, c)]) el.classList.remove('bg-amber-300', 'scale-110'); }, 1500);
}

function wsCellKey(r, c) { return r + '_' + c; }

function wsGetCellFromPoint(x, y) {
    const el = document.elementFromPoint(x, y);
    return (el && el.dataset && el.dataset.r !== undefined) ? el : null;
}

function wsClearTempHighlight() {
    const gridEl = document.getElementById('ws-grid');
    wsCurrentPath.forEach(key => {
        const [r, c] = key.split('_').map(Number);
        if (wsPlacedCells[key]) return;
        const el = gridEl.children[r * wsSize + c];
        el.classList.remove('bg-pink-200', 'scale-105');
        el.classList.add('bg-white');
    });
    wsCurrentPath = [];
}

function wsHighlightPath(cells) {
    wsClearTempHighlight();
    const gridEl = document.getElementById('ws-grid');
    cells.forEach(([r, c]) => {
        const key = wsCellKey(r, c);
        wsCurrentPath.push(key);
        if (wsPlacedCells[key]) return;
        const el = gridEl.children[r * wsSize + c];
        el.classList.remove('bg-white');
        el.classList.add('bg-pink-200', 'scale-105');
    });
}

function wsPathBetween(r0, c0, r1, c1) {
    const dr = Math.sign(r1 - r0), dc = Math.sign(c1 - c0);
    if (dr !== 0 && dc !== 0 && Math.abs(r1 - r0) !== Math.abs(c1 - c0)) return null;
    if (dr === 0 && dc === 0) return [[r0, c0]];
    const len = Math.max(Math.abs(r1 - r0), Math.abs(c1 - c0));
    const cells = [];
    for (let i = 0; i <= len; i++) cells.push([r0 + dr * i, c0 + dc * i]);
    return cells;
}

function wsCheckMatch(cells) {
    const letters = cells.map(([r, c]) => wsGrid[r][c]).join('');
    const reversed = letters.split('').reverse().join('');
    return Object.keys(wsSolutions).find(w => (w === letters || w === reversed) && !wsFoundWords.has(w));
}

function wsMarkFound(word, cells) {
    wsFoundWords.add(word);
    const gridEl = document.getElementById('ws-grid');
    cells.forEach(([r, c]) => {
        const key = wsCellKey(r, c);
        wsPlacedCells[key] = true;
        const el = gridEl.children[r * wsSize + c];
        el.classList.remove('bg-white', 'bg-pink-200', 'scale-105', 'border-pink-100');
        el.classList.add('bg-emerald-300', 'text-emerald-900', 'border-emerald-400', 'scale-105');
    });
    const pill = document.getElementById('ws-pill-' + word);
    if (pill) {
        pill.classList.remove('bg-white', 'border-pink-200', 'text-gray-600');
        pill.classList.add('bg-emerald-100', 'border-emerald-300', 'text-emerald-700', 'line-through', 'scale-105');
        pill.textContent = word + ' · ' + pill.textContent;
    }
    speakEnglish(word);
    playAudio('correct');
    const statusEl = document.getElementById('ws-status');
    const total = Object.keys(wsSolutions).length;
    if (wsFoundWords.size >= total) {
        wsFinishGame(total, gridEl, statusEl);
    } else {
        statusEl.textContent = `Đúng rồi! Tìm được "${word}" (${wsFoundWords.size}/${total})`;
    }
}

// Bé đã tìm đủ hết từ: CHỦ Ý GIỮ NGUYÊN màn hình (lưới đã tô xanh + danh sách từ đã gạch) để
// bé nhìn lại thành quả của mình, KHÔNG tự động chuyển sang màn hình khác. Chỉ dừng đồng hồ,
// bắn confetti ăn mừng và báo kết quả ngay trên dòng trạng thái. Bé chỉ rời màn này khi tự
// bấm nút "Chơi lại" (ra ván mới cùng độ khó) hoặc "Chọn game khác" / chạm vào tên game trên
// breadcrumb (quay về màn chọn độ khó).
function wsFinishGame(total, gridEl, statusEl) {
    clearInterval(wsTimerInterval);
    const secs = Math.floor((Date.now() - wsStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.6 } });
    gridEl.classList.add('pointer-events-none'); // đã xong hết -> khoá không cho kéo chọn thêm nữa
    const hintBtn = document.getElementById('ws-hint-btn');
    if (hintBtn) hintBtn.classList.add('opacity-40', 'pointer-events-none');
    statusEl.className = 'text-sm md:text-base font-black text-emerald-600 text-center mt-1';
    statusEl.textContent = `🎉 Xuất sắc! Bé đã tìm hết ${total} từ trong ${mm}:${ss} (dùng ${wsHintsUsed} gợi ý)! Bấm "Chơi lại" để thử ván mới nhé.`;
}

function wsBindEvents(gridEl) {
    const start = (r, c) => { wsSelecting = true; wsStartCell = [r, c]; wsHighlightPath([[r, c]]); };
    const move = (x, y) => {
        if (!wsSelecting) return;
        const el = wsGetCellFromPoint(x, y);
        if (!el) return;
        const path = wsPathBetween(wsStartCell[0], wsStartCell[1], Number(el.dataset.r), Number(el.dataset.c));
        if (path) wsHighlightPath(path);
    };
    const end = () => {
        if (!wsSelecting) return;
        wsSelecting = false;
        const cells = wsCurrentPath.map(key => key.split('_').map(Number));
        const match = wsCheckMatch(cells);
        if (match) {
            wsMarkFound(match, cells);
        } else {
            wsClearTempHighlight();
        }
    };

    gridEl.addEventListener('mousedown', e => {
        if (e.target.dataset.r === undefined) return;
        start(Number(e.target.dataset.r), Number(e.target.dataset.c));
    });
    gridEl.addEventListener('mousemove', e => move(e.clientX, e.clientY));
    window.addEventListener('mouseup', end);

    gridEl.addEventListener('touchstart', e => {
        e.preventDefault();
        const t = e.touches[0];
        const el = wsGetCellFromPoint(t.clientX, t.clientY);
        if (el) start(Number(el.dataset.r), Number(el.dataset.c));
    }, { passive: false });
    gridEl.addEventListener('touchmove', e => {
        e.preventDefault();
        const t = e.touches[0];
        move(t.clientX, t.clientY);
    }, { passive: false });
    window.addEventListener('touchend', end);
}


