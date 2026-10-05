// ==========================================
// GAME 10: FEELING DETECTIVE
// Nguon du lieu: 10.4 Adjectives Grammar Point.
// Gameplay: quan sat emoji + cau ngu canh, truy tim tinh tu/trang thai dung.
// ==========================================
let fdAllPool = [];
let fdPool = [];
let fdDifficulty = 'easy';
let fdRound = 0;
let fdScore = 0;
let fdWrong = 0;
let fdStreak = 0;
let fdBestStreak = 0;
let fdHintsLeft = 0;
let fdStartTime = 0;
let fdTimerInterval = null;
let fdCurrent = null;
let fdLocked = false;
let fdWrongChoices = new Set();
let fdSolvedCases = [];

const FD_LEVELS = {
    easy:   { label: 'Dễ', rounds: 8,  options: 3, hints: 4, note: '3 lựa chọn · nhiều gợi ý' },
    medium: { label: 'Vừa', rounds: 10, options: 4, hints: 3, note: '4 lựa chọn · nhiều trạng thái hơn' },
    hard:   { label: 'Khó', rounds: 12, options: 4, hints: 2, note: '12 hồ sơ · ít gợi ý' }
};

async function startFeelingDetectiveGame() {
    showLoadingOverlay('Đang mở hồ sơ thám tử...');
    try {
        fdAllPool = await ensureMiniGameLearningReady(['10.4']);
        fdAllPool = fdAllPool.filter(q => {
            const sentence = fdExtractSentence(q.question_text);
            return sentence && sentence.includes('______') && String(q.answer || '').trim() && Array.isArray(q.options) && q.options.length >= 3;
        });
        hideLoadingOverlay();
        fdEnsureStyles();
        fdRenderStart();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được Feeling Detective: ' + e.message);
    }
}

function fdEnsureStyles() {
    if (document.getElementById('feeling-detective-style')) return;
    const style = document.createElement('style');
    style.id = 'feeling-detective-style';
    style.textContent = `
        @keyframes fdScan { 0%{transform:translate(-20px,4px) rotate(-12deg)} 50%{transform:translate(20px,-5px) rotate(10deg)} 100%{transform:translate(-20px,4px) rotate(-12deg)} }
        @keyframes fdPop { 0%{transform:scale(.55);opacity:0} 65%{transform:scale(1.12);opacity:1} 100%{transform:scale(1);opacity:1} }
        @keyframes fdShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 50%{transform:translateX(6px)} 75%{transform:translateX(-3px)} }
        @keyframes fdGlow { 0%,100%{box-shadow:0 0 0 rgba(168,85,247,0)} 50%{box-shadow:0 0 22px rgba(168,85,247,.28)} }
        @keyframes fdFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .fd-scan { animation:fdScan 1.25s ease-in-out infinite; display:inline-block; transform-origin:center; }
        .fd-pop { animation:fdPop .45s cubic-bezier(.2,.8,.2,1) both; }
        .fd-shake { animation:fdShake .38s ease-in-out; }
        .fd-glow { animation:fdGlow 1.5s ease-in-out infinite; }
        .fd-float { animation:fdFloat 2.2s ease-in-out infinite; }
        .fd-answer { transition:all .18s ease; }
        .fd-answer:hover { transform:translateY(-2px); }
    `;
    document.head.appendChild(style);
}

function fdRenderStart() {
    clearInterval(fdTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-5">
            <div class="bg-gradient-to-r from-purple-50 via-white to-cyan-50 border-2 border-purple-100 rounded-2xl p-4 text-center mb-4">
                <div class="text-6xl mb-1 fd-float">🕵️‍♀️🔎</div>
                <h3 class="text-xl md:text-2xl font-black text-purple-600">Feeling Detective</h3>
                <p class="text-sm md:text-base text-gray-600 font-bold mt-1">Quan sát biểu cảm, đọc câu và tìm đúng tính từ chỉ trạng thái để phá án nhé!</p>
                <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-purple-200 rounded-full text-sm font-black text-purple-700">📚 Dữ liệu: 10.4 Adjectives · ${fdAllPool.length} câu</div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                ${Object.entries(FD_LEVELS).map(([key, lv], i) => {
                    const cls = [
                        'bg-emerald-50 border-emerald-200 text-emerald-700',
                        'bg-indigo-50 border-indigo-200 text-indigo-700',
                        'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700'
                    ][i];
                    return `<button onclick="fdStartLevel('${key}')" class="pastel-btn rounded-2xl border-2 ${cls} p-4 text-center">
                        <div class="text-lg font-black">${lv.label}</div>
                        <div class="text-sm font-bold mt-1">${lv.rounds} hồ sơ</div>
                        <div class="text-xs font-bold opacity-75 mt-1">${fdEsc(lv.note)}</div>
                    </button>`;
                }).join('')}
            </div>

            <div class="mt-4 max-w-2xl mx-auto rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-center text-sm md:text-base font-bold text-amber-800">
                🔎 Mỗi câu đúng sẽ mở thêm một "hồ sơ bằng chứng". Hoàn thành tất cả để phá án!
            </div>
        </div>`;
}

function fdStartLevel(level) {
    const lv = FD_LEVELS[level];
    fdDifficulty = level;
    fdPool = fdBuildBalancedPool(fdAllPool, Math.min(lv.rounds, fdAllPool.length));
    fdRound = 0;
    fdScore = 0;
    fdWrong = 0;
    fdStreak = 0;
    fdBestStreak = 0;
    fdHintsLeft = lv.hints;
    fdStartTime = Date.now();
    fdLocked = false;
    fdWrongChoices = new Set();
    fdSolvedCases = [];
    clearInterval(fdTimerInterval);
    fdTimerInterval = setInterval(fdUpdateTimer, 1000);
    headerLevel3ClickHandler = fdRenderStart;
    fdNextCase();
}

function fdBuildBalancedPool(candidates, rounds) {
    const groups = new Map();
    candidates.forEach(q => {
        const key = String(q.answer || '').trim().toLowerCase();
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(q);
    });
    const buckets = [...groups.values()].map(arr => shuffleArray(arr.slice()));
    const out = [];
    let guard = 0;
    while (out.length < rounds && guard < 1000) {
        guard++;
        let added = false;
        for (const bucket of shuffleArray(buckets.slice())) {
            if (bucket.length && out.length < rounds) {
                out.push(bucket.pop());
                added = true;
            }
        }
        if (!added) break;
    }
    if (out.length < rounds) {
        const used = new Set(out.map(q => q.question_id));
        out.push(...shuffleArray(candidates.filter(q => !used.has(q.question_id))).slice(0, rounds - out.length));
    }
    return shuffleArray(out).slice(0, rounds);
}

function fdNextCase() {
    if (fdRound >= fdPool.length) return fdFinish();
    fdCurrent = fdPool[fdRound];
    fdLocked = false;
    fdWrongChoices = new Set();
    fdRenderCase();
}

function fdRenderCase() {
    const lv = FD_LEVELS[fdDifficulty];
    const total = fdPool.length;
    const sentence = fdExtractSentence(fdCurrent.question_text);
    const options = fdGetOptions(fdCurrent, lv.options);
    window.__fdOptions = options;

    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5 overflow-hidden">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
                <span id="fd-timer" class="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-sm font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-sm font-black text-purple-700">🗂️ Hồ sơ ${fdRound + 1}/${total}</span>
                <span id="fd-score" class="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-sm font-black text-amber-700">⭐ ${fdScore}</span>
            </div>

            ${fdRenderEvidenceBoard()}

            <div id="fd-case-card" class="rounded-2xl border-2 border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-purple-50 p-4 md:p-5 mt-3">
                <div class="flex flex-col md:flex-row items-center gap-4 md:gap-5">
                    <div class="relative shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-[28px] bg-white border-2 border-purple-100 shadow-sm flex items-center justify-center fd-glow">
                        <div class="text-7xl md:text-8xl select-none">${fdEsc(fdCurrent.emoji || '🙂')}</div>
                        <div class="absolute -right-2 -bottom-1 text-4xl fd-scan">🔎</div>
                    </div>
                    <div class="flex-1 w-full text-center md:text-left">
                        <div class="text-xs md:text-sm font-black text-purple-500 uppercase tracking-wide mb-1">Manh mối hiện trường</div>
                        <div class="text-lg md:text-2xl font-black text-slate-800 leading-relaxed">${fdEsc(sentence)}</div>
                        <div class="mt-3 flex justify-center md:justify-start gap-2 flex-wrap">
                            <button onclick="fdSpeakSentence(false)" class="pastel-btn px-4 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm">🔊 Nghe câu</button>
                            <button onclick="fdShowHint()" class="pastel-btn px-4 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-sm">💡 Soi manh mối (${fdHintsLeft})</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-3 text-center text-sm md:text-base font-black text-slate-600">Tính từ nào khớp với biểu cảm và câu trên?</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-3xl mx-auto mt-2.5">
                ${options.map((opt, i) => {
                    const cls = [
                        'bg-pink-50 border-pink-200 text-pink-700',
                        'bg-cyan-50 border-cyan-200 text-cyan-700',
                        'bg-amber-50 border-amber-200 text-amber-700',
                        'bg-emerald-50 border-emerald-200 text-emerald-700'
                    ][i % 4];
                    return `<button id="fd-answer-${i}" onclick="fdChoose(${i})" class="fd-answer pastel-btn min-h-[58px] rounded-2xl border-2 ${cls} px-4 py-3 text-lg md:text-xl font-black">${fdEsc(opt)}</button>`;
                }).join('')}
            </div>

            <div class="flex items-center justify-center gap-2 flex-wrap mt-3">
                <span class="px-3 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 font-black text-sm">🔥 Chuỗi đúng: ${fdStreak}</span>
                <span class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-sm">❌ Nhầm: ${fdWrong}</span>
            </div>
            <p id="fd-status" class="min-h-[30px] text-center text-sm md:text-base font-black mt-2"></p>
        </div>`;
    fdUpdateTimer();
}

function fdRenderEvidenceBoard() {
    const total = fdPool.length;
    return `
        <div class="rounded-2xl bg-slate-50/80 border border-slate-200 p-3">
            <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-sm font-black text-slate-600">🧾 Bảng bằng chứng</span>
                <span class="text-xs md:text-sm font-black text-emerald-600">${fdSolvedCases.length}/${total} đã xác minh</span>
            </div>
            <div class="grid gap-1.5" style="grid-template-columns:repeat(${Math.min(total, 12)},minmax(0,1fr))">
                ${Array.from({ length: total }, (_, i) => {
                    const solved = fdSolvedCases[i];
                    return `<div class="aspect-square min-h-[34px] rounded-lg border ${solved ? 'bg-white border-emerald-200 fd-pop' : i === fdRound ? 'bg-purple-50 border-purple-300' : 'bg-white/70 border-slate-200'} flex items-center justify-center text-lg md:text-xl" title="${solved ? fdEsc(solved.answer) : `Hồ sơ ${i + 1}`}">${solved ? fdEsc(solved.emoji || '✅') : (i === fdRound ? '🔎' : '❔')}</div>`;
                }).join('')}
            </div>
        </div>`;
}

function fdGetOptions(q, count) {
    const answer = String(q.answer || '').trim();
    let options = [...new Set((q.options || []).map(x => String(x).trim()).filter(Boolean))];
    if (!options.some(x => x.toLowerCase() === answer.toLowerCase())) options.unshift(answer);
    const actualAnswer = options.find(x => x.toLowerCase() === answer.toLowerCase()) || answer;
    const others = shuffleArray(options.filter(x => x.toLowerCase() !== answer.toLowerCase())).slice(0, Math.max(0, count - 1));
    return shuffleArray([actualAnswer, ...others]);
}

function fdChoose(index) {
    if (fdLocked) return;
    const options = window.__fdOptions || [];
    const choice = options[index];
    if (!choice || fdWrongChoices.has(index)) return;
    const answer = String(fdCurrent.answer || '').trim();
    const btn = document.getElementById(`fd-answer-${index}`);
    const status = document.getElementById('fd-status');

    if (choice.toLowerCase() === answer.toLowerCase()) {
        fdLocked = true;
        fdStreak++;
        fdBestStreak = Math.max(fdBestStreak, fdStreak);
        const bonus = Math.min(5, Math.max(0, fdStreak - 1));
        const points = 10 + bonus;
        fdScore += points;
        if (btn) {
            btn.className = 'fd-answer min-h-[58px] rounded-2xl border-2 bg-emerald-100 border-emerald-400 text-emerald-800 px-4 py-3 text-lg md:text-xl font-black shadow-md';
            btn.innerHTML = `✅ ${fdEsc(choice)}`;
        }
        if (status) {
            status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-emerald-600';
            status.textContent = `Phá án chính xác! +${points} điểm`;
        }
        fdSolvedCases[fdRound] = { emoji: fdCurrent.emoji || '✅', answer };
        const card = document.getElementById('fd-case-card');
        if (card) card.classList.add('fd-pop');
        fdSpeakSentence(true);
        fdBurstClues();
        setTimeout(() => {
            fdRound++;
            fdNextCase();
        }, 1250);
    } else {
        fdWrong++;
        fdStreak = 0;
        fdWrongChoices.add(index);
        if (btn) {
            btn.classList.add('fd-shake', 'opacity-50');
            btn.disabled = true;
            btn.innerHTML = `❌ ${fdEsc(choice)}`;
        }
        if (status) {
            status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-rose-500';
            status.textContent = 'Chưa đúng manh mối rồi. Soi lại biểu cảm nhé!';
        }
    }
    const score = document.getElementById('fd-score');
    if (score) score.textContent = `⭐ ${fdScore}`;
}

function fdShowHint() {
    if (fdLocked) return;
    const status = document.getElementById('fd-status');
    if (fdHintsLeft <= 0) {
        if (status) {
            status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-gray-500';
            status.textContent = 'Bé đã dùng hết kính lúp gợi ý rồi nhé!';
        }
        return;
    }
    fdHintsLeft--;
    const meaning = fdExtractVietnameseState(fdCurrent.question_text);
    if (status) {
        status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-amber-600';
        status.textContent = meaning ? `🔎 Manh mối: trạng thái này có nghĩa là “${meaning}”.` : fdCurrent.hint || 'Quan sát kỹ emoji và câu nhé!';
    }
    fdRenderHintButtonOnly();
}

function fdRenderHintButtonOnly() {
    const buttons = [...document.querySelectorAll('#game-play-container button')];
    const hintBtn = buttons.find(b => b.textContent.includes('Soi manh mối'));
    if (hintBtn) hintBtn.innerHTML = `💡 Soi manh mối (${fdHintsLeft})`;
}

function fdSpeakSentence(withAnswer) {
    if (!fdCurrent) return;
    let sentence = fdExtractSentence(fdCurrent.question_text);
    if (withAnswer) sentence = sentence.replace('______', String(fdCurrent.answer || '').trim());
    else sentence = sentence.replace('______', 'blank');
    speakEnglish(sentence, 0.9);
}

function fdBurstClues() {
    const card = document.getElementById('fd-case-card');
    if (!card) return;
    const holder = document.createElement('div');
    holder.className = 'pointer-events-none absolute inset-0 overflow-hidden';
    card.style.position = 'relative';
    ['✨','🔎','⭐','✅','💡'].forEach((x, i) => {
        const s = document.createElement('span');
        s.textContent = x;
        s.style.position = 'absolute';
        s.style.left = `${15 + i * 17}%`;
        s.style.top = `${18 + (i % 2) * 30}%`;
        s.style.fontSize = `${22 + (i % 3) * 4}px`;
        s.style.animation = `fdPop .45s ease-out ${i * 0.05}s both`;
        holder.appendChild(s);
    });
    card.appendChild(holder);
    setTimeout(() => holder.remove(), 850);
}

function fdFinish() {
    clearInterval(fdTimerInterval);
    fdTimerInterval = null;
    stopSpeaking();
    const secs = Math.max(1, Math.floor((Date.now() - fdStartTime) / 1000));
    const mins = String(Math.floor(secs / 60)).padStart(2, '0');
    const rem = String(secs % 60).padStart(2, '0');
    const totalAttempts = fdPool.length + fdWrong;
    const accuracy = totalAttempts ? Math.round((fdPool.length / totalAttempts) * 100) : 100;
    const solvedSummary = fdSolvedCases.filter(Boolean).slice(0, 8);

    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-6 text-center">
            <div class="text-7xl mb-2">🏆🕵️‍♀️</div>
            <h3 class="text-2xl md:text-3xl font-black text-purple-600">Phá án thành công!</h3>
            <p class="text-sm md:text-base font-bold text-gray-600 mt-1">Bé đã nhận diện xong các tính từ chỉ trạng thái.</p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl mx-auto mt-4">
                <div class="rounded-2xl bg-amber-50 border border-amber-200 p-3"><div class="text-2xl font-black text-amber-600">${fdScore}</div><div class="text-xs md:text-sm font-bold text-amber-700">Điểm</div></div>
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-2xl font-black text-emerald-600">${accuracy}%</div><div class="text-xs md:text-sm font-bold text-emerald-700">Chính xác</div></div>
                <div class="rounded-2xl bg-fuchsia-50 border border-fuchsia-200 p-3"><div class="text-2xl font-black text-fuchsia-600">${fdBestStreak}</div><div class="text-xs md:text-sm font-bold text-fuchsia-700">Chuỗi tốt nhất</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-2xl font-black text-cyan-600">${mins}:${rem}</div><div class="text-xs md:text-sm font-bold text-cyan-700">Thời gian</div></div>
            </div>

            <div class="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-3 max-w-3xl mx-auto">
                <div class="text-sm font-black text-slate-600 mb-2">🧾 Một số bằng chứng đã xác minh</div>
                <div class="flex items-center justify-center gap-2 flex-wrap">
                    ${solvedSummary.map(x => `<span class="px-3 py-1.5 rounded-full bg-white border border-purple-100 text-purple-700 font-black text-sm">${fdEsc(x.emoji)} ${fdEsc(x.answer)}</span>`).join('')}
                </div>
            </div>

            <div class="mt-5 flex items-center justify-center gap-2 flex-wrap">
                <button onclick="fdStartLevel('${fdDifficulty}')" class="pastel-btn px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-black">🔁 Chơi lại</button>
                <button onclick="fdRenderStart()" class="pastel-btn px-5 py-2.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-700 font-black">🎚️ Đổi độ khó</button>
                <button onclick="openMiniGameHub()" class="pastel-btn px-5 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-black">🎮 Chọn game khác</button>
            </div>
        </div>`;

    if (typeof confetti === 'function') {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
    }
}

function fdUpdateTimer() {
    const el = document.getElementById('fd-timer');
    if (!el || !fdStartTime) return;
    const secs = Math.max(0, Math.floor((Date.now() - fdStartTime) / 1000));
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    el.textContent = `⏱️ ${mm}:${ss}`;
}

function fdExtractSentence(text) {
    const raw = String(text || '');
    const m = raw.match(/:\s*'(.+)'\s*$/);
    if (m) return m[1].trim();
    const idx = raw.lastIndexOf(':');
    return idx >= 0 ? raw.slice(idx + 1).replace(/^\s*['\"]|['\"]\s*$/g, '').trim() : raw.trim();
}

function fdExtractVietnameseState(text) {
    const raw = String(text || '');
    const m = raw.match(/trạng thái\s*'([^']+)'/i);
    return m ? m[1].trim() : '';
}

function fdEsc(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
