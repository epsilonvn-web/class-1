/* Word Search: reload-safe classic script for the Class 1 lazy-loaded English module. */
(() => {
'use strict';
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
let wsRoundNonce = 0;
let wsHintedWords = new Set();
let wsHintVisualCells = [];
let wsLastHintClick = 0;
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
    wsClearHintHighlight_();
    wsRoundNonce++; // invalidate stale hint callbacks when leaving a round
    wsSelecting = false;
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
    wsClearHintHighlight_();
    wsRoundNonce++;
    wsSelecting = false;
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
    wsClearHintHighlight_();
    wsHintedWords = new Set();
    wsLastHintClick = 0;
    wsRoundNonce++;
    wsSelecting = false;
    wsCurrentPath = [];
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

    wsHintsLeft = chosen.length;
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
            <p id="ws-hint-message" role="status" aria-live="polite" class="hidden w-full max-w-[760px] mb-2 px-3 py-2 text-center text-sm font-extrabold text-amber-900 bg-amber-50 border border-amber-300 rounded-xl"></p>
            <!-- Word Search only: force one single right-aligned word column on tablet/desktop. -->
            <style>
                #ws-main-layout { display: flex; flex-direction: column; align-items: center; gap: 10px; }
                #ws-main-layout .ws-board-wrap { width: 100%; min-width: 0; display: flex; justify-content: center; }
                #ws-main-layout #ws-wordlist { display: flex; flex-wrap: wrap; flex-direction: row; align-items: flex-start; align-content: flex-start; justify-content: center; gap: 8px; width: 100%; min-width: 0; }
                #ws-wordlist > .ws-word-pill { display: inline-flex; flex: 0 0 auto; align-items: center; max-width: 100%; min-height: 36px; padding: 7px 12px; border-radius: 999px; line-height: 1.35; font-size: 15px; }
                @media (min-width: 768px) {
                    #ws-main-layout { display: grid !important; grid-template-columns: minmax(0, 400px) minmax(0, 200px); column-gap: 24px; align-items: start; justify-content: center; max-width: 100%; }
                    #ws-main-layout .ws-board-wrap { width: 100%; min-width: 0; }
                    #ws-main-layout #ws-wordlist { display: flex !important; flex-direction: column !important; flex-wrap: nowrap !important; align-items: stretch !important; align-content: flex-start !important; justify-content: flex-start !important; gap: 8px !important; width: 100% !important; min-width: 0 !important; margin: 0 !important; }
                    #ws-wordlist > .ws-word-pill { display: flex !important; flex: 0 0 auto !important; width: 100% !important; height: auto !important; min-height: 38px; max-width: 100%; justify-content: flex-end !important; align-items: center !important; text-align: right !important; padding: 8px 12px; border-radius: 12px; overflow-wrap: anywhere; font-size: 17px; }
                }
            </style>
            <div id="ws-main-layout" class="w-full max-w-[760px] mb-2">
                <div class="ws-board-wrap">
                    <div id="ws-grid" class="grid gap-1 mb-2 md:mb-0" style="grid-template-columns: repeat(${wsSize}, 1fr); max-width: 400px; width: 100%; touch-action: none; user-select: none;"></div>
                </div>
                <div id="ws-wordlist" class="mb-2 md:mb-0"></div>
            </div>
            <p id="ws-status" class="w-full max-w-[760px] text-sm font-bold text-pink-500 text-center min-h-[18px]"></p>
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
        <span id="ws-pill-${item.w}" class="ws-word-pill text-sm md:text-base font-bold bg-white border border-pink-200 text-gray-600 transition-all duration-300">${escapeHtml(item.vi)}</span>
    `).join('');

    wsBindEvents(gridEl);
}

// Tra lai giao dien o chu truoc khi choi lai/chuyen man/hint tiep theo.
// Khong thay doi mau xanh cua nhung tu da tim duoc.
function wsClearHintHighlight_() {
    wsHintVisualCells.forEach(({ el, saved }) => {
        if (!el) return;
        Object.keys(saved).forEach(prop => { el.style[prop] = saved[prop]; });
    });
    wsHintVisualCells = [];
    const message = document.getElementById('ws-hint-message');
    if (message) { message.textContent = ''; message.classList.add('hidden'); }
}

function wsUseHint() {
    if (wsHintsLeft <= 0) return;
    // Chan thao tac bam lien tuc (double click) lam ton nhieu luot goi y.
    const now = Date.now();
    if (now - wsLastHintClick < 650) return;

    const gridEl = document.getElementById('ws-grid');
    const hintBtn = document.getElementById('ws-hint-btn');
    const message = document.getElementById('ws-hint-message');
    if (!gridEl || !hintBtn || !message) return;
    const remaining = Object.keys(wsSolutions).filter(w => !wsFoundWords.has(w));
    if (!remaining.length) return;
    const notYetHinted = remaining.filter(w => !wsHintedWords.has(w));
    const candidates = notYetHinted.length ? notYetHinted : remaining;
    const word = candidates[Math.floor(Math.random() * candidates.length)];
    const cells = wsSolutions[word];
    if (!Array.isArray(cells) || cells.length < 2) return;
    const hints = cells.slice(0, 2).map(([r, c]) => ({
        r, c, el: gridEl.children[r * wsSize + c]
    }));
    if (hints.some(({ el }) => !el)) return;

    wsClearHintHighlight_();
    wsLastHintClick = now;
    wsHintedWords.add(word);
    wsHintsLeft--;
    wsHintsUsed++;
    hintBtn.textContent = `💡 Gợi ý (${wsHintsLeft})`;
    if (wsHintsLeft === 0) {
        hintBtn.disabled = true;
        hintBtn.classList.add('opacity-40', 'pointer-events-none');
    }

    // Khong dung them class bg-amber-300 tren o dang co bg-white:
    // Tailwind co the uu tien bg-white, lam goi y khong thay doi mau.
    // Inline style cho mau dam, luu lai gia tri cu de phuc hoi chinh xac.
    hints.forEach(({ el }, i) => {
        const props = ['backgroundColor', 'borderColor', 'outline', 'outlineOffset', 'boxShadow', 'transform', 'position', 'zIndex'];
        const saved = Object.fromEntries(props.map(k => [k, el.style[k]]));
        el.style.backgroundColor = i === 0 ? '#fbbf24' : '#fef08a';
        el.style.borderColor = '#d97706';
        el.style.outline = i === 0 ? '3px solid #d97706' : '2px solid #f59e0b';
        el.style.outlineOffset = '1px';
        el.style.boxShadow = i === 0 ? '0 0 0 5px rgba(245,158,11,.25)' : '0 0 0 3px rgba(245,158,11,.15)';
        el.style.transform = i === 0 ? 'scale(1.1)' : 'scale(1.045)';
        el.style.position = 'relative';
        el.style.zIndex = i === 0 ? '2' : '1';
        wsHintVisualCells.push({ el, saved });
    });

    const [r, c] = cells[0];
    const meaning = document.getElementById('ws-pill-' + word)?.textContent?.trim();
    message.textContent = `💡 Ô vàng đậm là chữ đầu tiên (hàng ${r + 1}, cột ${c + 1}); ô vàng nhạt là chữ tiếp theo.${meaning ? ' Con hãy tìm từ có nghĩa: ' + meaning + '.' : ''} Kéo tiếp để tìm cả từ nhé!`;
    message.classList.remove('hidden');
    // Giu goi y tren man hinh cho den khi be bat dau keo, bam goi y moi hoac choi lai.
}

function wsCellKey(r, c) { return r + '_' + c; }

function wsGetCellFromPoint(x, y) {
    const el = document.elementFromPoint(x, y);
    const gridEl = document.getElementById('ws-grid');
    return (gridEl && el && gridEl.contains(el) && el.classList.contains('ws-cell')
        && el.dataset.r !== undefined && el.dataset.c !== undefined) ? el : null;
}

function wsClearTempHighlight() {
    const gridEl = document.getElementById('ws-grid');
    if (!gridEl) { wsCurrentPath = []; return; }
    wsCurrentPath.forEach(key => {
        const [r, c] = key.split('_').map(Number);
        if (wsPlacedCells[key]) return;
        const el = gridEl.children[r * wsSize + c];
        if (!el) return;
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
    wsClearHintHighlight_();
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
    wsClearHintHighlight_();
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
    // Pointer events unify mouse, touch and pen. Capturing on the grid ensures
    // releasing outside still ends a drag without adding listeners to window.
    const start = (r, c) => {
        wsClearHintHighlight_();
        wsSelecting = true;
        wsStartCell = [r, c];
        wsHighlightPath([[r, c]]);
    };
    const move = (x, y) => {
        if (!wsSelecting || document.getElementById('ws-grid') !== gridEl) return;
        const el = wsGetCellFromPoint(x, y);
        if (!el) return;
        const path = wsPathBetween(wsStartCell[0], wsStartCell[1], Number(el.dataset.r), Number(el.dataset.c));
        if (path) wsHighlightPath(path);
    };
    const end = (cancelled = false) => {
        if (!wsSelecting) return;
        wsSelecting = false;
        if (document.getElementById('ws-grid') !== gridEl) { wsCurrentPath = []; return; }
        const cells = wsCurrentPath.map(key => key.split('_').map(Number));
        const match = cancelled ? null : wsCheckMatch(cells);
        if (match) wsMarkFound(match, cells);
        else wsClearTempHighlight();
    };

    gridEl.addEventListener('pointerdown', event => {
        const el = event.target;
        if (!el?.classList?.contains('ws-cell') || wsSelecting) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        event.preventDefault();
        start(Number(el.dataset.r), Number(el.dataset.c));
        try { gridEl.setPointerCapture(event.pointerId); } catch (_) { /* no capture support */ }
    });
    gridEl.addEventListener('pointermove', event => move(event.clientX, event.clientY));
    gridEl.addEventListener('pointerup', event => {
        move(event.clientX, event.clientY);
        end(false);
        try { if (gridEl.hasPointerCapture(event.pointerId)) gridEl.releasePointerCapture(event.pointerId); } catch (_) {}
    });
    gridEl.addEventListener('pointercancel', () => end(true));
    gridEl.addEventListener('lostpointercapture', () => end(true));
}

// Classic-script functions must be accessible to the Class 1 shell and inline button handlers.
Object.assign(window, {
    startWordSearchGame,
    wsRenderTopicScreen,
    wsChooseTopic,
    renderWordSearchDifficultyScreen,
    wsToggleRules,
    wsStartWithDifficulty,
    wsGenerateAndRender,
    wsTryPlaceWord,
    wsUpdateTimerDisplay,
    renderWordSearchUI,
    wsUseHint,
    wsCellKey,
    wsGetCellFromPoint,
    wsClearTempHighlight,
    wsHighlightPath,
    wsPathBetween,
    wsCheckMatch,
    wsMarkFound,
    wsFinishGame,
    wsBindEvents,
});
})();
