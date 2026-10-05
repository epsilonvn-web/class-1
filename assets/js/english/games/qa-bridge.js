// ==========================================
// GAME 7: Q&A BRIDGE
// Nguon du lieu: 8.3 Conversation Finish + 9.1/9.2/9.3 Q&A Dialogues.
// Gameplay: chon dap an hoi-thoai dung de lap tung tam cau va dua Tho Ngoc qua song.
// ==========================================
let qbrAllPool = [];
let qbrPool = [];
let qbrDifficulty = 'easy';
let qbrRound = 0;
let qbrScore = 0;
let qbrWrong = 0;
let qbrStreak = 0;
let qbrBestStreak = 0;
let qbrHintsLeft = 0;
let qbrStartTime = 0;
let qbrTimerInterval = null;
let qbrCurrent = null;
let qbrCurrentOptions = [];
let qbrLocked = false;

const QBR_LEVELS = {
    easy: {
        label: 'Dễ', rounds: 8, options: 3, hints: 3,
        sections: ['8.3', '9.1'],
        note: 'Hội thoại cơ bản · 3 lựa chọn'
    },
    medium: {
        label: 'Vừa', rounds: 10, options: 4, hints: 2,
        sections: ['8.3', '9.1', '9.2'],
        note: 'Giao tiếp + trang phục/ăn uống'
    },
    hard: {
        label: 'Khó', rounds: 12, options: 4, hints: 1,
        sections: ['8.3', '9.1', '9.2', '9.3'],
        note: 'Trộn toàn bộ hội thoại'
    }
};

async function startQABridgeGame() {
    showLoadingOverlay('Đang dựng cây cầu hội thoại...');
    try {
        qbrAllPool = await ensureMiniGameLearningReady(['8.3', '9.1', '9.2', '9.3']);
        qbrAllPool = qbrAllPool.filter(q =>
            String(q.answer || '').trim() &&
            Array.isArray(q.options) && q.options.length >= 2 &&
            qbrExtractDialogue(q.question_text)
        );
        hideLoadingOverlay();
        qbrEnsureStyles();
        qbrRenderStart();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được Q&A Bridge: ' + e.message);
    }
}

function qbrEnsureStyles() {
    if (document.getElementById('qa-bridge-style')) return;
    const style = document.createElement('style');
    style.id = 'qa-bridge-style';
    style.textContent = `
        @keyframes qbrWaterMove {
            from { background-position: 0 0, 0 0; }
            to   { background-position: 80px 0, -110px 0; }
        }
        @keyframes qbrPlankPop {
            0% { transform: translateY(-18px) scale(.72) rotate(-5deg); opacity: 0; }
            72% { transform: translateY(3px) scale(1.05) rotate(2deg); opacity: 1; }
            100% { transform: translateY(0) scale(1) rotate(0); opacity: 1; }
        }
        @keyframes qbrBunnyHop {
            0%   { transform: translate(-50%, 0) rotate(0); }
            35%  { transform: translate(-50%, -28px) rotate(-7deg); }
            70%  { transform: translate(-50%, -8px) rotate(5deg); }
            100% { transform: translate(-50%, 0) rotate(0); }
        }
        @keyframes qbrWrongShake {
            0%,100% { transform: translateX(0); }
            25% { transform: translateX(-7px); }
            50% { transform: translateX(7px); }
            75% { transform: translateX(-4px); }
        }
        @keyframes qbrSplash {
            0% { transform: translate(-50%, 8px) scale(.55); opacity: 0; }
            35% { opacity: 1; }
            100% { transform: translate(-50%, -24px) scale(1.35); opacity: 0; }
        }
        .qbr-water {
            background:
                radial-gradient(ellipse at 25px 11px, rgba(255,255,255,.75) 0 7px, transparent 8px) 0 0/78px 34px,
                radial-gradient(ellipse at 38px 18px, rgba(255,255,255,.42) 0 6px, transparent 7px) 0 0/105px 42px,
                linear-gradient(180deg,#dff7ff 0%,#bfeafa 48%,#a7e3f7 100%);
            animation: qbrWaterMove 5.5s linear infinite;
        }
        .qbr-plank { transform-origin:center; transition:all .25s ease; }
        .qbr-plank-built { animation:qbrPlankPop .5s ease-out both; }
        .qbr-bunny { transition:left .8s cubic-bezier(.25,.85,.3,1); }
        .qbr-bunny-hop { animation:qbrBunnyHop .78s ease-in-out; }
        .qbr-wrong { animation:qbrWrongShake .38s ease-in-out; }
        .qbr-splash { animation:qbrSplash .62s ease-out forwards; }
    `;
    document.head.appendChild(style);
}

function qbrRenderStart() {
    clearInterval(qbrTimerInterval);
    headerLevel3ClickHandler = null;
    const sourceCounts = qbrCountBySection();
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-5">
            <div class="bg-gradient-to-r from-violet-50 via-fuchsia-50 to-cyan-50 border-2 border-violet-100 rounded-2xl p-4 text-center mb-4">
                <div class="text-6xl mb-1">🌉🐰</div>
                <h3 class="text-xl md:text-2xl font-black text-violet-700">Q&A Bridge</h3>
                <p class="text-sm md:text-base text-gray-600 font-bold mt-1">Ghép đúng câu hỏi - trả lời để đặt từng tấm cầu và đưa Thỏ Ngọc sang bờ bên kia.</p>
                <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/85 border border-violet-200 rounded-full text-sm font-black text-violet-700">💬 Dữ liệu hội thoại: 8.3 + 9.1 + 9.2 + 9.3</div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                ${Object.entries(QBR_LEVELS).map(([key, lv], i) => {
                    const cls = [
                        'bg-emerald-50 border-emerald-200 text-emerald-700',
                        'bg-indigo-50 border-indigo-200 text-indigo-700',
                        'bg-rose-50 border-rose-200 text-rose-700'
                    ][i];
                    const n = qbrAllPool.filter(q => lv.sections.includes(String(q.sub_topic))).length;
                    return `<button onclick="qbrStartLevel('${key}')" class="pastel-btn rounded-2xl border-2 ${cls} p-4 text-center">
                        <div class="text-lg font-black">${lv.label}</div>
                        <div class="text-sm font-bold mt-1">${lv.rounds} nhịp cầu</div>
                        <div class="text-xs font-bold opacity-75 mt-1">${qbrEsc(lv.note)}</div>
                        <div class="text-xs font-black opacity-60 mt-1">${n} câu trong kho</div>
                    </button>`;
                }).join('')}
            </div>

            <div class="mt-4 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div class="rounded-xl bg-pink-50 border border-pink-100 px-2 py-2 text-xs font-bold text-pink-700">👋 9.1<br>${sourceCounts['9.1'] || 0} câu</div>
                <div class="rounded-xl bg-amber-50 border border-amber-100 px-2 py-2 text-xs font-bold text-amber-700">👗 9.2<br>${sourceCounts['9.2'] || 0} câu</div>
                <div class="rounded-xl bg-cyan-50 border border-cyan-100 px-2 py-2 text-xs font-bold text-cyan-700">📍 9.3<br>${sourceCounts['9.3'] || 0} câu</div>
                <div class="rounded-xl bg-purple-50 border border-purple-100 px-2 py-2 text-xs font-bold text-purple-700">💬 8.3<br>${sourceCounts['8.3'] || 0} câu</div>
            </div>
        </div>`;
}

function qbrCountBySection() {
    return qbrAllPool.reduce((acc, q) => {
        const k = String(q.sub_topic || '');
        acc[k] = (acc[k] || 0) + 1;
        return acc;
    }, {});
}

function qbrStartLevel(level) {
    const lv = QBR_LEVELS[level];
    qbrDifficulty = level;
    qbrPool = shuffleArray(qbrAllPool.filter(q => lv.sections.includes(String(q.sub_topic))));
    if (qbrPool.length < 4) {
        alert('Chưa đủ câu hội thoại phù hợp cho mức này.');
        return;
    }
    qbrRound = 0;
    qbrScore = 0;
    qbrWrong = 0;
    qbrStreak = 0;
    qbrBestStreak = 0;
    qbrHintsLeft = lv.hints;
    qbrStartTime = Date.now();
    qbrLocked = false;
    clearInterval(qbrTimerInterval);
    qbrTimerInterval = setInterval(qbrUpdateTimer, 1000);
    headerLevel3ClickHandler = qbrRenderStart;
    qbrNextRound();
}

function qbrNextRound() {
    const lv = QBR_LEVELS[qbrDifficulty];
    const total = Math.min(lv.rounds, qbrPool.length);
    if (qbrRound >= total) return qbrFinish();
    qbrCurrent = qbrPool[qbrRound];
    qbrCurrentOptions = qbrBuildOptions(qbrCurrent, lv.options);
    qbrLocked = false;
    qbrRenderRound();
}

function qbrRenderRound() {
    const lv = QBR_LEVELS[qbrDifficulty];
    const total = Math.min(lv.rounds, qbrPool.length);
    const dialogue = qbrExtractDialogue(qbrCurrent.question_text);
    const parts = qbrSplitDialogue(dialogue);
    const progress = qbrRound / total;
    const bunnyLeft = 6 + progress * 87;

    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5 overflow-hidden">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
                <span id="qbr-timer" class="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-sm font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-3 py-1 bg-violet-50 border border-violet-200 rounded-full text-sm font-black text-violet-700">🌉 Nhịp ${qbrRound + 1}/${total}</span>
                <span id="qbr-score" class="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-black text-emerald-700">⭐ ${qbrScore}</span>
            </div>

            <div class="rounded-2xl border-2 border-fuchsia-100 bg-gradient-to-r from-pink-50 via-white to-violet-50 p-3 md:p-4 mb-3">
                <div class="flex items-center justify-center gap-3">
                    <span class="text-5xl md:text-6xl">${qbrEsc(qbrCurrent.emoji || '💬')}</span>
                    <div class="min-w-0 flex-1 max-w-2xl">
                        <div class="text-xs uppercase tracking-wide text-gray-400 font-black">Mascot hỏi</div>
                        <div class="text-lg md:text-xl text-slate-700 font-black leading-snug mt-0.5">${qbrEsc(parts.question)}</div>
                        <div class="mt-2 rounded-xl bg-white/90 border border-pink-100 px-3 py-2 text-base md:text-lg font-bold text-pink-700">
                            🐰 ${qbrEsc(parts.answerStem || dialogue)}
                        </div>
                    </div>
                </div>
                <div class="mt-3 flex justify-center gap-2 flex-wrap">
                    <button onclick="qbrSpeakQuestion()" class="px-4 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm pastel-btn">🔊 Nghe câu hỏi</button>
                    <button onclick="qbrShowHint()" class="px-4 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-sm pastel-btn">💡 Gợi ý (${qbrHintsLeft})</button>
                </div>
            </div>

            <div class="qbr-water rounded-3xl border-2 border-cyan-200 p-3 md:p-4 mb-3 overflow-hidden">
                <div class="relative h-[152px] md:h-[168px]">
                    <div class="absolute left-0 bottom-2 w-[10%] h-11 rounded-xl bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center text-2xl">🌿</div>
                    <div class="absolute right-0 bottom-2 w-[10%] h-11 rounded-xl bg-amber-100 border-2 border-amber-200 flex items-center justify-center text-2xl">🏁</div>

                    <div class="absolute left-[10%] right-[10%] bottom-7 flex items-end justify-between gap-1">
                        ${Array.from({length: total}, (_, i) => {
                            const built = i < qbrRound;
                            const current = i === qbrRound;
                            return `<div id="qbr-plank-${i}" class="qbr-plank flex-1 h-4 md:h-5 rounded-md border-2 ${built ? 'qbr-plank-built bg-amber-300 border-amber-500 shadow-sm' : current ? 'bg-white/75 border-dashed border-violet-300' : 'bg-white/45 border-dashed border-white/80'}"></div>`;
                        }).join('')}
                    </div>

                    <div id="qbr-bunny" class="qbr-bunny absolute bottom-[50px] text-4xl md:text-5xl leading-none z-20" style="left:${bunnyLeft}%">🐰</div>
                    <div id="qbr-splash" class="hidden absolute bottom-[42px] text-4xl z-10" style="left:${bunnyLeft}%">💦</div>
                    <div class="absolute left-1/2 -translate-x-1/2 top-1 text-xs md:text-sm font-black text-cyan-700 bg-white/75 border border-cyan-100 rounded-full px-3 py-1">Mỗi đáp án đúng = thêm 1 tấm cầu</div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-3xl mx-auto">
                ${qbrCurrentOptions.map((opt, i) => {
                    const colors = [
                        'bg-pink-50 border-pink-200 text-pink-700',
                        'bg-indigo-50 border-indigo-200 text-indigo-700',
                        'bg-amber-50 border-amber-200 text-amber-700',
                        'bg-emerald-50 border-emerald-200 text-emerald-700'
                    ];
                    return `<button id="qbr-option-${i}" onclick="qbrChoose(${i})" class="pastel-btn min-h-[58px] rounded-2xl border-2 ${colors[i % colors.length]} px-4 py-3 text-base md:text-lg font-black leading-snug">${qbrEsc(opt)}</button>`;
                }).join('')}
            </div>

            <div class="mt-3 flex items-center justify-center gap-2 flex-wrap">
                <span class="px-3 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 font-black text-sm">🔥 Chuỗi đúng: ${qbrStreak}</span>
                <span class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-sm">💦 Trượt: ${qbrWrong}</span>
            </div>
            <p id="qbr-status" class="min-h-[30px] text-center text-sm md:text-base font-black mt-2"></p>
        </div>`;
    qbrUpdateTimer();
}

function qbrBuildOptions(q, count) {
    const answer = String(q.answer || '').trim();
    let opts = Array.isArray(q.options) ? q.options.map(v => String(v).trim()).filter(Boolean) : [];
    opts = [...new Set(opts)];
    if (!opts.some(v => v.toLowerCase() === answer.toLowerCase())) opts.push(answer);
    const wrong = shuffleArray(opts.filter(v => v.toLowerCase() !== answer.toLowerCase())).slice(0, Math.max(1, count - 1));
    return shuffleArray([answer, ...wrong]).slice(0, count);
}

function qbrChoose(index) {
    if (qbrLocked) return;
    const choice = qbrCurrentOptions[index];
    const ok = String(choice).trim().toLowerCase() === String(qbrCurrent.answer).trim().toLowerCase();
    const btn = document.getElementById(`qbr-option-${index}`);
    const status = document.getElementById('qbr-status');

    if (ok) {
        qbrLocked = true;
        const bonus = Math.min(qbrStreak, 3) * 2;
        qbrScore += 10 + bonus;
        qbrStreak++;
        qbrBestStreak = Math.max(qbrBestStreak, qbrStreak);
        const score = document.getElementById('qbr-score');
        if (score) score.textContent = `⭐ ${qbrScore}`;

        if (btn) btn.classList.add('ring-4','ring-emerald-200','bg-emerald-100','border-emerald-400','text-emerald-800');
        const plank = document.getElementById(`qbr-plank-${qbrRound}`);
        if (plank) {
            plank.className = 'qbr-plank qbr-plank-built flex-1 h-4 md:h-5 rounded-md border-2 bg-amber-300 border-amber-500 shadow-sm';
        }
        const bunny = document.getElementById('qbr-bunny');
        if (bunny) {
            bunny.classList.remove('qbr-bunny-hop');
            void bunny.offsetWidth;
            bunny.classList.add('qbr-bunny-hop');
            const total = Math.min(QBR_LEVELS[qbrDifficulty].rounds, qbrPool.length);
            bunny.style.left = `${6 + ((qbrRound + 1) / total) * 87}%`;
        }
        if (status) {
            status.textContent = bonus ? `✅ Chính xác! +${10 + bonus} điểm · Cầu dài thêm một nhịp!` : '✅ Chính xác! Cầu dài thêm một nhịp!';
            status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-emerald-600';
        }
        playAudio('correct');
        qbrSpeakCompletedDialogue();
        setTimeout(() => {
            qbrRound++;
            qbrNextRound();
        }, 1250);
    } else {
        qbrWrong++;
        qbrStreak = 0;
        qbrScore = Math.max(0, qbrScore - 1);
        const score = document.getElementById('qbr-score');
        if (score) score.textContent = `⭐ ${qbrScore}`;
        if (btn) {
            btn.classList.add('qbr-wrong','bg-rose-100','border-rose-400','text-rose-700');
            setTimeout(() => btn.classList.remove('qbr-wrong'), 450);
        }
        const splash = document.getElementById('qbr-splash');
        if (splash) {
            splash.classList.remove('hidden','qbr-splash');
            void splash.offsetWidth;
            splash.classList.add('qbr-splash');
            setTimeout(() => splash.classList.add('hidden'), 650);
        }
        if (status) {
            status.textContent = '💦 Chưa khớp câu trả lời rồi. Thử lại nhé!';
            status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-rose-500';
        }
        playAudio('wrong');
    }
}

function qbrShowHint() {
    if (qbrLocked) return;
    const status = document.getElementById('qbr-status');
    if (!status) return;
    if (qbrHintsLeft <= 0) {
        status.textContent = '💡 Hết lượt gợi ý rồi, con thử suy nghĩ thêm nhé!';
        status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-amber-600';
        return;
    }
    qbrHintsLeft--;
    const raw = String(qbrCurrent.hint || '').replace(/^Gợi ý:\s*/i, '').trim();
    status.textContent = `💡 ${raw || `Đáp án bắt đầu bằng “${String(qbrCurrent.answer).charAt(0)}”`}`;
    status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-amber-600';
    qbrScore = Math.max(0, qbrScore - 2);
    const score = document.getElementById('qbr-score');
    if (score) score.textContent = `⭐ ${qbrScore}`;
    const buttons = [...document.querySelectorAll('[id^="qbr-option-"]')];
    const wrongIndexes = buttons
        .map((b, i) => ({ b, i }))
        .filter(x => String(qbrCurrentOptions[x.i]).toLowerCase() !== String(qbrCurrent.answer).toLowerCase());
    if (wrongIndexes.length) {
        const one = wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];
        one.b.disabled = true;
        one.b.classList.add('opacity-35');
    }
    qbrRenderHintCountOnly();
}

function qbrRenderHintCountOnly() {
    // Nut goi y nam trong block hoi thoai; cap nhat nhe ma khong render lai ca round.
    const buttons = document.querySelectorAll('button[onclick="qbrShowHint()"]');
    buttons.forEach(btn => { btn.textContent = `💡 Gợi ý (${qbrHintsLeft})`; });
}

function qbrSpeakQuestion() {
    const d = qbrExtractDialogue(qbrCurrent?.question_text || '');
    const p = qbrSplitDialogue(d);
    speakEnglish(p.question || d, 0.88);
}

function qbrSpeakCompletedDialogue() {
    const d = qbrExtractDialogue(qbrCurrent?.question_text || '');
    const completed = qbrFillBlank(d, qbrCurrent?.answer || '');
    speakEnglish(completed, 0.88);
}

function qbrFinish() {
    clearInterval(qbrTimerInterval);
    qbrTimerInterval = null;
    qbrLocked = true;
    const elapsed = Math.max(0, Date.now() - qbrStartTime);
    const lv = QBR_LEVELS[qbrDifficulty];
    const total = Math.min(lv.rounds, qbrPool.length);
    const maxBase = total * 10;
    const pct = maxBase ? Math.round((qbrScore / maxBase) * 100) : 0;
    const medal = pct >= 90 ? '🏆' : pct >= 75 ? '🥇' : pct >= 55 ? '🥈' : '🌟';

    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-5 md:p-7 text-center overflow-hidden">
            <div class="text-7xl md:text-8xl mb-2">${medal}</div>
            <h3 class="text-2xl md:text-3xl font-black text-violet-700">Qua cầu thành công!</h3>
            <p class="text-base md:text-lg text-gray-600 font-bold mt-1">Thỏ Ngọc đã sang bờ bên kia nhờ những câu trả lời chính xác của con.</p>

            <div class="max-w-2xl mx-auto mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-xs font-bold text-gray-500">Điểm</div><div class="text-xl font-black text-emerald-700">${qbrScore}</div></div>
                <div class="rounded-2xl bg-violet-50 border border-violet-200 p-3"><div class="text-xs font-bold text-gray-500">Nhịp cầu</div><div class="text-xl font-black text-violet-700">${total}/${total}</div></div>
                <div class="rounded-2xl bg-rose-50 border border-rose-200 p-3"><div class="text-xs font-bold text-gray-500">Trượt</div><div class="text-xl font-black text-rose-600">${qbrWrong}</div></div>
                <div class="rounded-2xl bg-amber-50 border border-amber-200 p-3"><div class="text-xs font-bold text-gray-500">Chuỗi tốt nhất</div><div class="text-xl font-black text-amber-700">${qbrBestStreak}</div></div>
            </div>
            <div class="mt-3 text-sm font-bold text-gray-500">⏱️ ${qbrFormatTime(elapsed)}</div>

            <div class="relative max-w-3xl h-28 mx-auto mt-5 qbr-water rounded-3xl border-2 border-cyan-200 overflow-hidden">
                <div class="absolute left-3 bottom-3 text-3xl">🌿</div>
                <div class="absolute right-3 bottom-3 text-3xl">🏁🐰</div>
                <div class="absolute left-[10%] right-[10%] bottom-8 flex gap-1">
                    ${Array.from({length: Math.min(total, 12)}, () => '<div class="flex-1 h-4 bg-amber-300 border-2 border-amber-500 rounded-md"></div>').join('')}
                </div>
            </div>

            <div class="mt-5 flex justify-center gap-2 flex-wrap">
                <button onclick="qbrStartLevel('${qbrDifficulty}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-black text-sm md:text-base pastel-btn shadow-md">🔁 Chơi lại</button>
                <button onclick="qbrRenderStart()" class="px-5 py-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 font-black text-sm md:text-base pastel-btn">🎚️ Đổi mức</button>
                <button onclick="openMiniGameHub()" class="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-black text-sm md:text-base pastel-btn">🎮 Chọn game khác</button>
            </div>
        </div>`;
    playAudio('correct');
}

function qbrUpdateTimer() {
    const el = document.getElementById('qbr-timer');
    if (!el || !qbrStartTime) return;
    el.textContent = `⏱️ ${qbrFormatClock(Date.now() - qbrStartTime)}`;
}

function qbrExtractDialogue(text) {
    const s = String(text || '').trim();
    const first = s.indexOf("'");
    const last = s.lastIndexOf("'");
    if (first >= 0 && last > first) return s.slice(first + 1, last).trim();
    // Fallback cho du lieu khong co dau nhay: bo cac tien to/mo ta thong dung.
    return s
        .replace(/^Mascot hỏi:\s*/i, '')
        .replace(/^Hoàn thành câu đối đáp hội thoại:\s*/i, '')
        .replace(/\s*-\s*Bé chọn câu trả lời đúng:\s*$/i, '')
        .trim();
}

function qbrSplitDialogue(dialogue) {
    const d = String(dialogue || '').trim();
    const idx = d.indexOf(' - ');
    if (idx < 0) return { question: d, answerStem: 'Chọn câu trả lời phù hợp' };
    return {
        question: d.slice(0, idx).trim(),
        answerStem: d.slice(idx + 3).trim()
    };
}

function qbrFillBlank(dialogue, answer) {
    const d = String(dialogue || '');
    const a = String(answer || '').trim();
    if (/_{2,}/.test(d)) return d.replace(/_{2,}/, a);
    return d;
}

function qbrFormatClock(ms) {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function qbrFormatTime(ms) {
    const total = Math.floor(ms / 1000);
    return `${Math.floor(total / 60)} phút ${total % 60} giây`;
}

function qbrEsc(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
        '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[ch]));
}
