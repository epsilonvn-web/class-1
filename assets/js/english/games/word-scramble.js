// ==========================================
// GAME: WORD SCRAMBLE
// Nguồn dữ liệu: duy nhất Chuyên mục 2.1 - Flashcards Library qua getMiniGameVocabPool().
// ==========================================
let wscTopicId = 'all';
let wscDifficulty = 'easy';
let wscPool = [];
let wscUsedIds = new Set();
let wscRoundIndex = 0;
let wscScore = 0;
let wscWrongCount = 0;
let wscHintsLeft = 0;
let wscStartTime = 0;
let wscTimerInterval = null;
let wscCurrent = null;
let wscLetterTiles = [];
let wscChosenTileIndexes = [];

const WSC_DIFFICULTIES = {
    easy:   { label: 'Dễ',   rounds: 8,  minLen: 3, maxLen: 6,  hints: 3, note: 'Từ 3-6 chữ cái' },
    medium: { label: 'Vừa',  rounds: 10, minLen: 4, maxLen: 9,  hints: 2, note: 'Từ 4-9 chữ cái' },
    hard:   { label: 'Khó',  rounds: 12, minLen: 5, maxLen: 14, hints: 1, note: 'Từ 5-14 chữ cái' }
};

async function startWordScrambleGame() {
    showLoadingOverlay('Đang lấy từ vựng từ Chuyên mục 2.1...');
    try {
        await ensureMiniGameVocabReady();
        hideLoadingOverlay();
        wscRenderTopicScreen();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được dữ liệu Word Scramble: ' + e.message);
    }
}

function wscRenderTopicScreen() {
    clearInterval(wscTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'word-scramble',
        onChoose: 'wscChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để bắt đầu luyện Word Scramble nhé!',
        countFilter: item => /^[A-Za-z]+$/.test(item.word || '')
    });
}

function wscChooseTopic(topicId) {
    wscTopicId = topicId;
    const groups = getMiniGameTopicGroups();
    const group = groups.find(g => Number(g.id) === Number(topicId));
    const topicName = topicId === 'all' ? 'Trộn tất cả chủ đề' : (group?.name || `Nhóm ${topicId}`);
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-5 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🧩</div>
            <h3 class="font-black text-indigo-700 text-lg mb-1">Chọn độ khó</h3>
            <p class="text-xs text-gray-500 font-bold mb-4 max-w-md">${topicName}</p>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-md">
                ${Object.entries(WSC_DIFFICULTIES).map(([key, d]) => `
                    <button onclick="wscStartWithDifficulty('${key}')" class="pastel-btn p-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100">
                        <div class="font-black text-indigo-700">${d.label}</div>
                        <div class="text-[11px] text-gray-500 font-bold mt-1">${d.rounds} từ</div>
                        <div class="text-[10px] text-gray-400 font-bold">${d.note}</div>
                    </button>`).join('')}
            </div>
            <button onclick="wscRenderTopicScreen()" class="mt-4 text-xs font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function wscStartWithDifficulty(diffKey) {
    const diff = WSC_DIFFICULTIES[diffKey];
    wscDifficulty = diffKey;
    wscPool = getMiniGameVocabPool({
        topicId: wscTopicId,
        singleWordOnly: true,
        minLength: diff.minLen,
        maxLength: diff.maxLen
    }).filter(item => item.vietnamese && new Set(item.word.toLowerCase()).size > 1);

    const unique = new Map();
    wscPool.forEach(item => {
        const key = item.word.toLowerCase();
        if (!unique.has(key)) unique.set(key, item);
    });
    wscPool = shuffleArray([...unique.values()]);

    if (wscPool.length < Math.min(5, diff.rounds)) {
        alert('Nhóm này chưa đủ từ phù hợp với độ khó đã chọn. Anh/chị hãy chọn độ khó khác hoặc trộn tất cả chủ đề.');
        return;
    }

    wscUsedIds = new Set();
    wscRoundIndex = 0;
    wscScore = 0;
    wscWrongCount = 0;
    wscHintsLeft = diff.hints;
    wscStartTime = Date.now();
    clearInterval(wscTimerInterval);
    wscTimerInterval = setInterval(wscUpdateTimer, 1000);

    headerLevel3ClickHandler = () => wscChooseTopic(wscTopicId);
    wscNextRound();
}

function wscPickNextItem() {
    let candidates = wscPool.filter(x => !wscUsedIds.has(x.id || x.word.toLowerCase()));
    if (!candidates.length) {
        wscUsedIds.clear();
        candidates = wscPool.slice();
    }
    const item = candidates[Math.floor(Math.random() * candidates.length)];
    wscUsedIds.add(item.id || item.word.toLowerCase());
    return item;
}

function wscScrambleWord(word) {
    const letters = word.toUpperCase().split('');
    let mixed = letters.slice();
    for (let i = 0; i < 12; i++) {
        mixed = shuffleArray(letters);
        if (mixed.join('') !== letters.join('')) break;
    }
    return mixed;
}

function wscNextRound() {
    const diff = WSC_DIFFICULTIES[wscDifficulty];
    if (wscRoundIndex >= diff.rounds) return wscFinish();

    wscCurrent = wscPickNextItem();
    wscLetterTiles = wscScrambleWord(wscCurrent.word).map((letter, index) => ({ letter, index }));
    wscChosenTileIndexes = [];
    wscRenderRound();
}

function wscRenderRound() {
    const diff = WSC_DIFFICULTIES[wscDifficulty];
    const container = document.getElementById('game-play-container');
    const answerSlots = wscCurrent.word.split('').map(() => `<span class="w-8 h-10 md:w-10 md:h-11 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 flex items-center justify-center font-black text-indigo-700"></span>`).join('');
    container.innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5">
            <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span id="wsc-timer" class="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-2.5 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-black text-indigo-700">Từ ${wscRoundIndex + 1}/${diff.rounds}</span>
                <span id="wsc-score" class="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-black text-emerald-700">⭐ ${wscScore}</span>
            </div>

            <div class="text-center bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-100 rounded-2xl p-4 mb-4">
                <div class="text-5xl mb-1">${wscCurrent.emoji || '✨'}</div>
                <div class="text-[11px] uppercase tracking-wide font-black text-gray-400">Nghĩa tiếng Việt</div>
                <div class="text-xl md:text-2xl font-black text-pink-600 mt-1">${wscEscapeHtml(wscCurrent.vietnamese)}</div>
                ${wscCurrent.sentence ? `<div class="text-xs text-gray-400 font-bold mt-1">Gợi ý ngữ cảnh: ${wscEscapeHtml(wscCurrent.sentence.replace(new RegExp(wscEscapeRegExp(wscCurrent.word), 'ig'), '_____'))}</div>` : ''}
            </div>

            <div id="wsc-answer" class="flex flex-wrap items-center justify-center gap-1.5 min-h-[48px] mb-3">${answerSlots}</div>
            <div id="wsc-tiles" class="flex flex-wrap items-center justify-center gap-2 mb-4">
                ${wscLetterTiles.map((t, i) => `<button id="wsc-tile-${i}" onclick="wscPickLetter(${i})" class="w-10 h-11 md:w-11 md:h-12 rounded-xl bg-gradient-to-b from-indigo-500 to-purple-500 text-white font-black text-lg shadow-md pastel-btn border border-indigo-300">${t.letter}</button>`).join('')}
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2">
                <button onclick="wscBackspace()" class="px-3 py-2 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 text-xs font-black pastel-btn">⌫ Xoá</button>
                <button onclick="wscResetAnswer()" class="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black pastel-btn">↺ Làm lại</button>
                <button id="wsc-hint-btn" onclick="wscUseHint()" class="px-3 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-black pastel-btn">💡 Gợi ý (${wscHintsLeft})</button>
                <button onclick="wscCheckAnswer()" class="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black shadow-md pastel-btn">✓ Kiểm tra</button>
            </div>
            <p id="wsc-status" class="min-h-[22px] text-center text-sm font-black mt-3"></p>
        </div>`;
    wscUpdateAnswerUI();
    wscUpdateTimer();
}

function wscPickLetter(tileIndex) {
    if (wscChosenTileIndexes.includes(tileIndex)) return;
    wscChosenTileIndexes.push(tileIndex);
    wscUpdateAnswerUI();
}

function wscBackspace() {
    wscChosenTileIndexes.pop();
    wscUpdateAnswerUI();
}

function wscResetAnswer() {
    wscChosenTileIndexes = [];
    wscUpdateAnswerUI();
}

function wscCurrentAnswer() {
    return wscChosenTileIndexes.map(i => wscLetterTiles[i].letter).join('');
}

function wscUpdateAnswerUI() {
    const answer = document.getElementById('wsc-answer');
    if (!answer || !wscCurrent) return;
    const chosenLetters = wscChosenTileIndexes.map(i => wscLetterTiles[i].letter);
    answer.innerHTML = wscCurrent.word.split('').map((_, idx) => `
        <span class="w-8 h-10 md:w-10 md:h-11 rounded-xl border-2 ${idx < chosenLetters.length ? 'border-indigo-300 bg-indigo-50' : 'border-dashed border-indigo-200 bg-white'} flex items-center justify-center font-black text-lg text-indigo-700">${chosenLetters[idx] || ''}</span>`).join('');

    wscLetterTiles.forEach((_, i) => {
        const btn = document.getElementById(`wsc-tile-${i}`);
        if (!btn) return;
        const used = wscChosenTileIndexes.includes(i);
        btn.disabled = used;
        btn.classList.toggle('opacity-25', used);
        btn.classList.toggle('scale-90', used);
    });
}

function wscUseHint() {
    if (wscHintsLeft <= 0 || !wscCurrent) return;
    const target = wscCurrent.word.toUpperCase();
    let current = wscCurrentAnswer();
    if (!target.startsWith(current)) {
        wscResetAnswer();
        current = '';
    }
    if (current.length >= target.length) return;

    const needed = target[current.length];
    const tileIndex = wscLetterTiles.findIndex((t, i) => t.letter === needed && !wscChosenTileIndexes.includes(i));
    if (tileIndex >= 0) {
        wscHintsLeft--;
        wscChosenTileIndexes.push(tileIndex);
        wscUpdateAnswerUI();
        const btn = document.getElementById('wsc-hint-btn');
        if (btn) btn.textContent = `💡 Gợi ý (${wscHintsLeft})`;
    }
}

function wscCheckAnswer() {
    if (!wscCurrent) return;
    const answer = wscCurrentAnswer();
    const target = wscCurrent.word.toUpperCase();
    const status = document.getElementById('wsc-status');
    if (answer.length !== target.length) {
        if (status) { status.textContent = 'Con hãy dùng đủ các chữ cái trước nhé!'; status.className = 'min-h-[22px] text-center text-sm font-black mt-3 text-amber-600'; }
        return;
    }

    if (answer === target) {
        playAudio('correct');
        wscScore += 10;
        if (status) { status.textContent = `🎉 Chính xác! ${wscCurrent.word} = ${wscCurrent.vietnamese}`; status.className = 'min-h-[22px] text-center text-sm font-black mt-3 text-emerald-600'; }
        const scoreEl = document.getElementById('wsc-score');
        if (scoreEl) scoreEl.textContent = `⭐ ${wscScore}`;
        speakEnglish(wscCurrent.word);
        wscRoundIndex++;
        wscDisableRoundButtons();
        setTimeout(wscNextRound, 900);
    } else {
        playAudio('wrong');
        wscWrongCount++;
        if (status) { status.textContent = 'Chưa đúng rồi, con thử sắp xếp lại nhé!'; status.className = 'min-h-[22px] text-center text-sm font-black mt-3 text-rose-500'; }
    }
}

function wscDisableRoundButtons() {
    document.querySelectorAll('#wsc-tiles button, #game-play-container button').forEach(btn => {
        if (!String(btn.getAttribute('onclick') || '').includes('wscNextRound')) btn.disabled = true;
    });
}

function wscUpdateTimer() {
    const el = document.getElementById('wsc-timer');
    if (!el || !wscStartTime) return;
    const secs = Math.floor((Date.now() - wscStartTime) / 1000);
    el.textContent = `⏱️ ${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
}

function wscFinish() {
    clearInterval(wscTimerInterval);
    playAudio('win');
    const diff = WSC_DIFFICULTIES[wscDifficulty];
    const secs = Math.floor((Date.now() - wscStartTime) / 1000);
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-6 text-center">
            <div class="text-6xl mb-2">🏆</div>
            <h3 class="text-xl font-black text-indigo-700">Hoàn thành Word Scramble!</h3>
            <div class="grid grid-cols-3 gap-2 max-w-md mx-auto my-4">
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-xl font-black text-emerald-700">${wscScore}</div><div class="text-[10px] font-bold text-gray-500">Điểm</div></div>
                <div class="rounded-2xl bg-rose-50 border border-rose-200 p-3"><div class="text-xl font-black text-rose-600">${wscWrongCount}</div><div class="text-[10px] font-bold text-gray-500">Lần sai</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-xl font-black text-cyan-700">${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}</div><div class="text-[10px] font-bold text-gray-500">Thời gian</div></div>
            </div>
            <div class="flex justify-center gap-2 flex-wrap">
                <button onclick="wscStartWithDifficulty('${wscDifficulty}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-sm pastel-btn">🔄 Chơi lại ${diff.label}</button>
                <button onclick="wscRenderTopicScreen()" class="px-5 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 font-black text-sm pastel-btn">📚 Đổi nhóm từ</button>
            </div>
        </div>`;
}

function wscEscapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c]));
}
function wscEscapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
