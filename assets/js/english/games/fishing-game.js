// ==========================================
// GAME: FISHING GAME — tách riêng file để lazy-load (chỉ tải khi bé thật sự bấm vào game này)
// ==========================================
// Cách chơi: màn hiện sẵn 1 NGHĨA TIẾNG VIỆT, ao có vài con cá mỗi con mang 1 từ tiếng Anh —
// bé chạm/click đúng con cá mang từ khớp với nghĩa đó để "câu" được cá. Cá sai chạm vào sẽ
// lặn xuống rồi nổi lại, bé được thử lại tới khi câu đúng (không bị mất lượt/qua vòng khi sai).
let fgPool = [];
let fgTopicId = 'all';
let fgCurrentDifficulty = 'medium';
let fgRoundIndex = 0, fgScore = 0, fgWrongCount = 0;
let fgUsedWords = new Set();
let fgCurrentRound = null; // { correctW, correctVi, fish: [{w, vi, isCorrect}], locked }
let fgStartTime = 0, fgTimerInterval = null;

const FG_DIFFICULTIES = {
    easy:   { label: 'Dễ',   rounds: 5,  fishCount: 4, color: 'emerald' },
    medium: { label: 'Vừa',  rounds: 8,  fishCount: 5, color: 'amber' },
    hard:   { label: 'Khó',  rounds: 10, fishCount: 6, color: 'rose' }
};

// Màu thân cá xoay vòng cho vui mắt, không mang ý nghĩa đúng/sai (đúng/sai chỉ lộ ra SAU khi bấm)
const FG_FISH_COLORS = ['bg-sky-100 border-sky-300 text-sky-800', 'bg-orange-100 border-orange-300 text-orange-800',
    'bg-violet-100 border-violet-300 text-violet-800', 'bg-lime-100 border-lime-300 text-lime-800',
    'bg-cyan-100 border-cyan-300 text-cyan-800', 'bg-fuchsia-100 border-fuchsia-300 text-fuchsia-800'];

async function startFishingGame() {
    showLoadingOverlay("Đang thả lưới chuẩn bị ao cá...");
    try {
        await fetchAllQuestionsFlat();
        hideLoadingOverlay();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được từ vựng cho Fishing Game: ' + e.message);
        return;
    }
    fgRenderTopicScreen();
}

/** Lấy nguồn từ vựng thật của chương trình (kho tra nghĩa xây từ Flashcards Library, mục 2
 * Vocabulary) — giống hệt nguồn Word Search đang dùng, chỉ khác là KHÔNG giới hạn độ dài từ
 * (Word Search giới hạn 3-7 ký tự để vừa lưới ô chữ, Fishing Game không cần vừa lưới nào cả). */
function getFishingVocabPool(topicId = fgTopicId) {
    return getMiniGameVocabPool({ topicId }).map(item => ({ w: item.word.toUpperCase(), vi: item.vietnamese }));
}

function fgRenderTopicScreen() {
    clearInterval(fgTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = renderMiniGameTopicMenu({
        gameKey: 'fishing-game',
        onChoose: 'fgChooseTopic',
        subtitle: 'Chọn 1 trong 6 Nhóm từ vựng để thả câu nhé!',
        countFilter: item => item.word && item.vietnamese
    });
}

function fgChooseTopic(topicId) {
    fgTopicId = topicId;
    renderFishingDifficultyScreen();
}

function renderFishingDifficultyScreen() {
    clearInterval(fgTimerInterval);
    headerLevel3ClickHandler = null;
    const level3El = document.getElementById('header-level3-btn');
    if (level3El) { level3El.classList.remove('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.add('cursor-default'); }
    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-5 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🎣</div>
            <h3 class="font-extrabold text-sky-700 text-lg mb-1">Fishing Game</h3>
            <p class="text-sm text-gray-500 font-bold mb-3">Chọn độ khó để bắt đầu nhé!</p>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-3">
                ${Object.entries(FG_DIFFICULTIES).map(([key, d]) => `
                    <button onclick="fgStartWithDifficulty('${key}')" class="pastel-btn flex flex-col items-center gap-1 p-3 rounded-2xl border-2 border-${d.color}-200 bg-${d.color}-50 hover:bg-${d.color}-100 text-${d.color}-700 shadow-sm">
                        <span class="font-black text-base">${d.label}</span>
                        <span class="text-xs font-bold opacity-80">${d.rounds} vòng</span>
                        <span class="text-xs font-bold opacity-70">${d.fishCount} cá/vòng</span>
                    </button>
                `).join('')}
            </div>
            <button onclick="fgToggleRules()" class="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200 pastel-btn">📖 Xem luật chơi</button>
            <div id="fg-rules-panel" class="hidden mt-3 w-full max-w-sm text-left bg-indigo-50/60 border border-indigo-200 rounded-2xl p-3.5 text-sm text-gray-600 font-bold leading-relaxed">
                <p class="mb-1.5">🐟 Mỗi vòng, ao hiện ra vài con cá — mỗi con mang <b>1 từ tiếng Anh</b>. Phía trên có sẵn <b>1 nghĩa tiếng Việt</b>.</p>
                <p class="mb-1.5">🎯 Con chạm/click đúng con cá mang từ tiếng Anh <b>khớp với nghĩa đó</b> để câu được cá!</p>
                <p>❌ Câu nhầm cá khác thì con cá đó lặn xuống một chút rồi nổi lại — con cứ thử tiếp tới khi câu trúng cá đúng nhé!</p>
            </div>
            <button onclick="fgRenderTopicScreen()" class="mt-3 text-sm font-black text-pink-600 bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl pastel-btn">← Chọn lại nhóm từ</button>
        </div>`;
}

function fgToggleRules() {
    const panel = document.getElementById('fg-rules-panel');
    if (panel) panel.classList.toggle('hidden');
}

function fgStartWithDifficulty(diffKey) {
    const diff = FG_DIFFICULTIES[diffKey];
    fgCurrentDifficulty = diffKey;
    fgRoundIndex = 0;
    fgScore = 0;
    fgWrongCount = 0;
    fgUsedWords = new Set();
    fgPool = shuffleArray(getFishingVocabPool(fgTopicId));

    if (fgPool.length < diff.rounds + diff.fishCount) {
        document.getElementById('game-play-container').innerHTML = `<p class="text-center text-gray-500 font-bold py-8">Chưa đủ từ vựng phù hợp để chơi Fishing Game, bé quay lại sau nhé!</p>`;
        return;
    }

    renderFishingPlayShell();
    fgStartTime = Date.now();
    clearInterval(fgTimerInterval);
    fgTimerInterval = setInterval(fgUpdateTimerDisplay, 1000);
    fgNextRound();
}

function fgUpdateTimerDisplay() {
    const el = document.getElementById('fg-timer');
    if (!el) { clearInterval(fgTimerInterval); return; }
    const secs = Math.floor((Date.now() - fgStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    el.textContent = `⏱️ ${mm}:${ss}`;
}

function renderFishingPlayShell() {
    // Trong lúc đang chơi, bấm vào tên game trên breadcrumb -> quay lại màn chọn độ khó.
    headerLevel3ClickHandler = renderFishingDifficultyScreen;
    const level3El = document.getElementById('header-level3-btn');
    if (level3El) { level3El.classList.add('cursor-pointer', 'hover:bg-purple-100'); level3El.classList.remove('cursor-default'); }

    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-3 md:p-4 flex flex-col items-center">
            <div class="flex items-center justify-between w-full max-w-[500px] mb-2 gap-1.5">
                <span id="fg-timer" class="text-xs md:text-sm font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">⏱️ 00:00</span>
                <span id="fg-progress" class="text-xs md:text-sm font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">Vòng 1/1</span>
                <span id="fg-score" class="text-xs md:text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">✅ 0</span>
                <button onclick="fgStartWithDifficulty(fgCurrentDifficulty)" class="text-xs md:text-sm font-black text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 px-2.5 py-1 rounded-full shadow-sm pastel-btn">🔄 Chơi lại</button>
            </div>
            <div class="w-full max-w-[500px] bg-gradient-to-r from-pink-50 to-indigo-50 border-2 border-pink-200 rounded-2xl p-3 mb-3 text-center">
                <p class="text-[11px] font-bold text-gray-400 mb-0.5">Nghĩa của từ là:</p>
                <p id="fg-meaning" class="text-lg md:text-xl font-black text-pink-600"></p>
            </div>
            <div id="fg-pond" class="relative overflow-hidden w-full max-w-[500px] min-h-[300px] border-2 border-sky-300 rounded-2xl mb-2" style="background: linear-gradient(to bottom, #bae6fd 0%, #7dd3fc 60%, #fde68a 100%);">
                <div id="fg-pond-deco" class="absolute inset-0 pointer-events-none overflow-hidden"></div>
                <div id="fg-fish-layer" class="relative z-10 h-full min-h-[300px] px-6 py-5 flex flex-wrap gap-4 md:gap-5 items-center justify-center content-center"></div>
            </div>
            <p id="fg-status" class="text-sm font-bold text-sky-500 text-center min-h-[18px]"></p>
        </div>`;

    fgRenderPondDecorations();
}

/** Trang trí đáy biển cho bể cá: rong rêu/san hô/sao biển đung đưa nhẹ + nhiều bạn động vật
 * biển (cua, bạch tuộc, rùa, cá heo, sứa, tôm, ốc sên...) + vài chú cá nhỏ bơi lượn ngang qua
 * lại phía sau + bong bóng nước nổi lên liên tục — CHỈ để nhìn cho sinh động
 * (pointer-events-none), không liên quan gì tới logic chơi/chấm điểm (khác với cá để BẤM CHỌN
 * đáp án ở lớp #fg-fish-layer phía trên). Render 1 LẦN duy nhất khi vào màn chơi, không vẽ lại
 * mỗi vòng để đỡ giật hình. */
function fgRenderPondDecorations() {
    fgInjectSwimStyleOnce();
    const deco = document.getElementById('fg-pond-deco');
    if (!deco) return;

    // Nhóm 1: cây cỏ/sinh vật bám đáy - chỉ đung đưa tại chỗ
    const sway = [
        { icon: '🌿', style: 'left:2%; bottom:2px; font-size:26px;' },
        { icon: '🌱', style: 'left:12%; bottom:0px; font-size:20px; animation-delay:.4s' },
        { icon: '🪸', style: 'left:22%; bottom:2px; font-size:26px; animation-delay:.9s' },
        { icon: '🐚', style: 'left:34%; bottom:0px; font-size:20px; animation-delay:.2s' },
        { icon: '🦀', style: 'left:44%; bottom:2px; font-size:24px; animation-delay:.6s' },
        { icon: '🐌', style: 'left:54%; bottom:0px; font-size:20px; animation-delay:1.3s' },
        { icon: '⭐', style: 'left:64%; bottom:0px; font-size:20px; animation-delay:1.1s' },
        { icon: '🪸', style: 'right:16%; bottom:2px; font-size:22px; animation-delay:.5s' },
        { icon: '🌿', style: 'right:5%; bottom:2px; font-size:26px; animation-delay:.7s' },
        { icon: '🦐', style: 'right:26%; bottom:4px; font-size:20px; animation-delay:1.5s' }
    ];

    // Nhóm 2: bong bóng nước nổi từ đáy lên
    const bubbles = [
        { style: 'left:6%; animation-delay:0s' },     { style: 'left:16%; animation-delay:1.9s' },
        { style: 'left:26%; animation-delay:.6s' },    { style: 'left:37%; animation-delay:2.7s' },
        { style: 'left:48%; animation-delay:1.2s' },   { style: 'left:59%; animation-delay:3.4s' },
        { style: 'left:68%; animation-delay:.3s' },    { style: 'left:77%; animation-delay:2.1s' },
        { style: 'left:86%; animation-delay:1.5s' },   { style: 'left:94%; animation-delay:3.9s' }
    ];

    // Nhóm 3: các bạn động vật biển to bơi ngang qua ao (mỗi bạn 1 vận tốc/độ cao khác nhau,
    // 1 số bơi từ trái sang phải, 1 số bơi ngược lại cho tự nhiên) - THUẦN TRANG TRÍ, không phải
    // cá để bấm chọn đáp án.
    const roamers = [
        { icon: '🐠', top: '10%', dir: 'right', dur: '9s',  delay: '0s'   },
        { icon: '🐟', top: '22%', dir: 'left',  dur: '11s', delay: '1.5s' },
        { icon: '🐡', top: '70%', dir: 'right', dur: '13s', delay: '2.5s' },
        { icon: '🐬', top: '38%', dir: 'left',  dur: '8s',  delay: '.8s'  },
        { icon: '🐢', top: '82%', dir: 'right', dur: '16s', delay: '3.2s' },
        { icon: '🐙', top: '55%', dir: 'right', dur: '14s', delay: '1.2s' },
        { icon: '🪼', top: '16%', dir: 'left',  dur: '10s', delay: '4s'   },
        { icon: '🦈', top: '48%', dir: 'left',  dur: '12s', delay: '2s'   },
        { icon: '🐳', top: '30%', dir: 'right', dur: '18s', delay: '5s'   },
        { icon: '🐊', top: '76%', dir: 'left',  dur: '15s', delay: '.5s'  },
        { icon: '🦞', top: '88%', dir: 'right', dur: '17s', delay: '3.8s' },
        { icon: '🦭', top: '62%', dir: 'left',  dur: '13.5s', delay: '2.8s' },
        { icon: '🦑', top: '42%', dir: 'right', dur: '11.5s', delay: '4.5s' },
        { icon: '🐋', top: '8%',  dir: 'left',  dur: '19s', delay: '1.8s' },
        { icon: '🦦', top: '68%', dir: 'right', dur: '10.5s', delay: '3.4s' },
        { icon: '🧜‍♀️', top: '52%', dir: 'left', dur: '20s', delay: '6s' }
    ];

    deco.innerHTML =
        sway.map(s => `<span class="fg-deco" style="${s.style}">${s.icon}</span>`).join('') +
        bubbles.map(b => `<span class="fg-bubble" style="${b.style}">🫧</span>`).join('') +
        roamers.map(r => `<span class="fg-roam fg-roam-${r.dir}" style="top:${r.top}; font-size:22px; animation-duration:${r.dur}; animation-delay:${r.delay};">${r.icon}</span>`).join('');
}

/** Chọn ngẫu nhiên 1 từ đúng (chưa dùng ở vòng trước) + đủ số cá mồi sai (từ/nghĩa khác từ đúng),
 * rồi trộn thứ tự hiển thị các con cá trong ao. */
function fgBuildRound() {
    const diff = FG_DIFFICULTIES[fgCurrentDifficulty];
    const correctItem = fgPool.find(item => !fgUsedWords.has(item.w));
    fgUsedWords.add(correctItem.w);

    const distractorPool = shuffleArray(fgPool.filter(item => item.w !== correctItem.w && item.vi !== correctItem.vi));
    const distractors = distractorPool.slice(0, diff.fishCount - 1);

    const fish = shuffleArray([
        { w: correctItem.w, vi: correctItem.vi, isCorrect: true },
        ...distractors.map(d => ({ w: d.w, vi: d.vi, isCorrect: false }))
    ]);

    return { correctW: correctItem.w, correctVi: correctItem.vi, fish, locked: false };
}

function fgNextRound() {
    const diff = FG_DIFFICULTIES[fgCurrentDifficulty];
    if (fgRoundIndex >= diff.rounds) {
        fgFinishGame();
        return;
    }
    fgCurrentRound = fgBuildRound();
    fgRenderRound();
}

function fgRenderRound() {
    const diff = FG_DIFFICULTIES[fgCurrentDifficulty];
    document.getElementById('fg-progress').textContent = `Vòng ${fgRoundIndex + 1}/${diff.rounds}`;
    document.getElementById('fg-score').textContent = `✅ ${fgScore}`;
    document.getElementById('fg-meaning').textContent = fgCurrentRound.correctVi;
    document.getElementById('fg-status').textContent = '';

    fgInjectSwimStyleOnce();

    const fishLayerEl = document.getElementById('fg-fish-layer');
    fishLayerEl.innerHTML = fgCurrentRound.fish.map((f, i) => `
        <button id="fg-fish-${i}" onclick="fgHandleFishClick(${i})"
            style="animation-delay: ${(i * 0.45).toFixed(2)}s"
            class="fg-fish-btn fg-answer-swim-${i % 3} pastel-btn flex items-center gap-1 px-2 py-1.5 rounded-2xl border-2 font-black text-xs md:text-sm shadow-sm transition-colors duration-150 whitespace-nowrap ${FG_FISH_COLORS[i % FG_FISH_COLORS.length]}">
            <span class="text-sm">🐟</span><span>${escapeHtml(f.w)}</span>
        </button>
    `).join('');
}

/** Thêm 1 lần duy nhất khối CSS @keyframes cho cá "bơi" (nhấp nhô lên xuống + lắc nhẹ 2 bên) —
 * mỗi con cá có animation-delay riêng (gán qua style inline ở trên) để bơi lệch nhịp nhau,
 * trông sống động hơn thay vì đứng im hàng loạt. Dùng transform nên không ảnh hưởng vùng bấm. */
function fgInjectSwimStyleOnce() {
    if (document.getElementById('fg-swim-style')) return;
    const style = document.createElement('style');
    style.id = 'fg-swim-style';
    style.textContent = `
        @keyframes fgAnswerSwim0 {
            0%   { transform: translate(0, 0) rotate(0deg); }
            20%  { transform: translate(26px, -22px) rotate(-7deg); }
            45%  { transform: translate(-20px, -30px) rotate(6deg); }
            70%  { transform: translate(-28px, 12px) rotate(-6deg); }
            90%  { transform: translate(15px, 24px) rotate(5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes fgAnswerSwim1 {
            0%   { transform: translate(0, 0) rotate(0deg); }
            25%  { transform: translate(-28px, 14px) rotate(6deg); }
            50%  { transform: translate(-8px, -28px) rotate(-5deg); }
            75%  { transform: translate(22px, -8px) rotate(7deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes fgAnswerSwim2 {
            0%   { transform: translate(0, 0) rotate(0deg); }
            30%  { transform: translate(20px, 22px) rotate(-6deg); }
            60%  { transform: translate(28px, -16px) rotate(6deg); }
            85%  { transform: translate(-20px, -10px) rotate(-5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
        .fg-fish-btn { will-change: transform; }
        .fg-answer-swim-0 { animation: fgAnswerSwim0 3.4s ease-in-out infinite; }
        .fg-answer-swim-1 { animation: fgAnswerSwim1 3.9s ease-in-out infinite; }
        .fg-answer-swim-2 { animation: fgAnswerSwim2 3.6s ease-in-out infinite; }
        .fg-fish-btn:active { animation-play-state: paused; }

        @keyframes fgSway {
            0%, 100% { transform: rotate(-7deg); }
            50%      { transform: rotate(7deg); }
        }
        .fg-deco { position: absolute; transform-origin: bottom center; animation: fgSway 2.6s ease-in-out infinite; }

        @keyframes fgBubbleRise {
            0%   { transform: translateY(0) scale(0.8); opacity: 0; }
            15%  { opacity: 0.85; }
            100% { transform: translateY(-190px) scale(1.1); opacity: 0; }
        }
        .fg-bubble { position: absolute; bottom: 4px; font-size: 13px; opacity: 0; animation: fgBubbleRise 4.5s linear infinite; }

        @keyframes fgRoamRight { 0% { left: -12%; transform: scaleX(-1); } 100% { left: 108%; transform: scaleX(-1); } }
        @keyframes fgRoamLeft  { 0% { left: 108%;  transform: scaleX(1);  } 100% { left: -12%; transform: scaleX(1); } }
        .fg-roam { position: absolute; animation-timing-function: linear; animation-iteration-count: infinite; opacity: 0.9; }
        .fg-roam-right { animation-name: fgRoamRight; }
        .fg-roam-left  { animation-name: fgRoamLeft; }
    `;
    document.head.appendChild(style);
}

function fgHandleFishClick(fishIndex) {
    if (!fgCurrentRound || fgCurrentRound.locked) return;
    const fish = fgCurrentRound.fish[fishIndex];
    const btn = document.getElementById('fg-fish-' + fishIndex);
    const statusEl = document.getElementById('fg-status');

    if (fish.isCorrect) {
        fgCurrentRound.locked = true;
        fgScore++;
        btn.style.animation = 'none'; // dừng bơi hẳn khi đã bắt được, để hiệu ứng phóng to (scale-110) hiện rõ
        btn.classList.add('bg-emerald-300', 'border-emerald-500', 'text-emerald-900', 'scale-110');
        document.getElementById('fg-score').textContent = `✅ ${fgScore}`;
        statusEl.className = 'text-sm font-black text-emerald-600 text-center min-h-[18px]';
        statusEl.textContent = `🎉 Câu đúng rồi! "${fish.w}" nghĩa là "${fish.vi}"`;
        speakEnglish(fish.w);
        playAudio('correct');
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.7 } });
        fgRoundIndex++;
        setTimeout(fgNextRound, 1100);
    } else {
        fgWrongCount++;
        btn.style.animation = 'none'; // tạm dừng bơi trong lúc chớp đỏ/chìm xuống, để hiệu ứng hiện rõ
        btn.classList.add('bg-rose-300', 'border-rose-500', 'opacity-50', 'translate-y-2');
        statusEl.className = 'text-sm font-bold text-rose-500 text-center min-h-[18px]';
        statusEl.textContent = `Chưa đúng, con cá đó lặn mất rồi, thử con khác nhé!`;
        playAudio('wrong');
        setTimeout(() => {
            if (btn) {
                btn.classList.remove('bg-rose-300', 'border-rose-500', 'opacity-50', 'translate-y-2');
                btn.style.animation = ''; // bỏ khoá -> quay lại bơi bình thường theo class .fg-fish-btn
            }
        }, 700);
    }
}

function fgFinishGame() {
    clearInterval(fgTimerInterval);
    const diff = FG_DIFFICULTIES[fgCurrentDifficulty];
    const secs = Math.floor((Date.now() - fgStartTime) / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.6 } });

    const container = document.getElementById('game-play-container');
    container.innerHTML = `
        <div class="pastel-card bg-white p-6 flex flex-col items-center text-center">
            <div class="text-5xl mb-2">🎉</div>
            <h3 class="font-extrabold text-emerald-600 text-lg mb-3">Xuất sắc! Bé đã câu xong ${diff.rounds} vòng!</h3>
            <div class="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-4">
                <div class="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200">
                    <div class="text-[10px] font-bold text-emerald-500">Câu đúng</div>
                    <div class="text-base font-black text-emerald-700">${fgScore}/${diff.rounds}</div>
                </div>
                <div class="bg-indigo-50 rounded-xl p-2.5 border border-indigo-200">
                    <div class="text-[10px] font-bold text-indigo-500">Thời gian</div>
                    <div class="text-base font-black text-indigo-700">${mm}:${ss}</div>
                </div>
                <div class="bg-${diff.color}-50 rounded-xl p-2.5 border border-${diff.color}-200">
                    <div class="text-[10px] font-bold text-${diff.color}-500">Độ khó</div>
                    <div class="text-base font-black text-${diff.color}-700">${diff.label}</div>
                </div>
            </div>
            <div class="flex gap-2.5 w-full max-w-sm">
                <button onclick="fgStartWithDifficulty('${fgCurrentDifficulty}')" class="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-black rounded-2xl text-sm pastel-btn shadow-md">🔄 Chơi lại (${diff.label})</button>
                <button onclick="renderFishingDifficultyScreen()" class="flex-1 py-2.5 bg-gray-100 text-gray-600 font-black rounded-2xl text-sm pastel-btn">Đổi độ khó</button>
            </div>
        </div>`;
}
