// ==========================================
// GAME 12: TEACHER SAYS
// Data source: 7.3 Classroom Commands Builder.
// Gameplay: Simon-Says style reflex game using the real command sentences.
// ==========================================
let tsAllPool = [];
let tsPool = [];
let tsDifficulty = 'easy';
let tsRound = 0;
let tsScore = 0;
let tsWrong = 0;
let tsStreak = 0;
let tsBestStreak = 0;
let tsStartTime = 0;
let tsTimerInterval = null;
let tsCurrent = null;
let tsLocked = false;
let tsObey = true;
let tsChoices = [];
let tsWrongChoices = new Set();
let tsAutoSpeakTimer = null;

const TS_LEVELS = {
    easy:   { label: 'Dễ', rounds: 8,  options: 3, obeyChance: 0.78, note: '3 hành động · nhiều lượt Teacher says' },
    medium: { label: 'Vừa', rounds: 10, options: 4, obeyChance: 0.68, note: '4 hành động · phản xạ nhanh hơn' },
    hard:   { label: 'Khó', rounds: 12, options: 4, obeyChance: 0.58, note: '12 lượt · dễ bị đánh lừa hơn' }
};

async function startTeacherSaysGame() {
    showLoadingOverlay('Đang chuẩn bị lớp học Teacher Says...');
    try {
        tsAllPool = await ensureMiniGameLearningReady(['7.3']);
        tsAllPool = tsAllPool.filter(q => String(q.answer || '').trim() && Array.isArray(q.options) && q.options.length >= 2);
        if (!tsAllPool.length) throw new Error('Không tìm thấy câu mệnh lệnh trong mục 7.3.');
        hideLoadingOverlay();
        tsEnsureStyles();
        tsRenderStart();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được Teacher Says: ' + e.message);
    }
}

function tsEnsureStyles() {
    if (document.getElementById('teacher-says-style')) return;
    const style = document.createElement('style');
    style.id = 'teacher-says-style';
    style.textContent = `
        @keyframes tsTeacherBob { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-5px) rotate(1deg)} }
        @keyframes tsStudentHop { 0%{transform:translateY(0) scale(1)} 40%{transform:translateY(-26px) scale(1.06)} 100%{transform:translateY(0) scale(1)} }
        @keyframes tsShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-7px)} 50%{transform:translateX(7px)} 75%{transform:translateX(-4px)} }
        @keyframes tsPulse { 0%,100%{box-shadow:0 0 0 rgba(99,102,241,0)} 50%{box-shadow:0 0 25px rgba(99,102,241,.25)} }
        @keyframes tsStar { 0%{transform:translateY(8px) scale(.5);opacity:0} 50%{opacity:1} 100%{transform:translateY(-35px) scale(1.25);opacity:0} }
        .ts-teacher { animation:tsTeacherBob 2s ease-in-out infinite; }
        .ts-hop { animation:tsStudentHop .65s ease-out; }
        .ts-shake { animation:tsShake .38s ease-in-out; }
        .ts-pulse { animation:tsPulse 1.4s ease-in-out infinite; }
        .ts-choice { transition:all .18s ease; }
        .ts-choice:hover { transform:translateY(-2px); }
    `;
    document.head.appendChild(style);
}

function tsRenderStart() {
    clearInterval(tsTimerInterval);
    clearTimeout(tsAutoSpeakTimer);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-5">
            <div class="bg-gradient-to-r from-pink-50 via-white to-indigo-50 border-2 border-pink-100 rounded-2xl p-4 text-center mb-4">
                <div class="text-6xl mb-1 ts-teacher">👩‍🏫🤖</div>
                <h3 class="text-xl md:text-2xl font-black text-indigo-600">Teacher Says</h3>
                <p class="text-sm md:text-base text-gray-600 font-bold mt-1">Nghe lệnh thật nhanh. Chỉ làm theo khi cô nói <b>“Teacher says...”</b> nhé!</p>
                <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-indigo-200 rounded-full text-sm font-black text-indigo-700">📚 Dữ liệu: 7.3 Classroom Commands · ${tsAllPool.length} câu</div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                ${Object.entries(TS_LEVELS).map(([key, lv], i) => {
                    const cls = [
                        'bg-emerald-50 border-emerald-200 text-emerald-700',
                        'bg-indigo-50 border-indigo-200 text-indigo-700',
                        'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700'
                    ][i];
                    return `<button onclick="tsStartLevel('${key}')" class="pastel-btn rounded-2xl border-2 ${cls} p-4 text-center">
                        <div class="text-lg font-black">${lv.label}</div>
                        <div class="text-sm font-bold mt-1">${lv.rounds} lượt</div>
                        <div class="text-xs font-bold opacity-75 mt-1">${lv.note}</div>
                    </button>`;
                }).join('')}
            </div>

            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5 max-w-3xl mx-auto text-sm md:text-base font-bold">
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-800">✅ Có “Teacher says” → chọn đúng hành động.</div>
                <div class="rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-rose-800">✋ Không có “Teacher says” → bấm <b>Đứng yên</b>.</div>
            </div>
        </div>`;
}

function tsStartLevel(level) {
    const lv = TS_LEVELS[level];
    tsDifficulty = level;
    tsPool = shuffleArray(tsAllPool).slice(0, Math.min(lv.rounds, tsAllPool.length));
    tsRound = 0;
    tsScore = 0;
    tsWrong = 0;
    tsStreak = 0;
    tsBestStreak = 0;
    tsStartTime = Date.now();
    tsLocked = false;
    tsWrongChoices = new Set();
    clearInterval(tsTimerInterval);
    clearTimeout(tsAutoSpeakTimer);
    tsTimerInterval = setInterval(tsUpdateTimer, 1000);
    headerLevel3ClickHandler = tsRenderStart;
    tsNextRound();
}

function tsNextRound() {
    if (tsRound >= tsPool.length) return tsFinish();
    tsCurrent = tsPool[tsRound];
    tsLocked = false;
    tsWrongChoices = new Set();
    const lv = TS_LEVELS[tsDifficulty];
    tsObey = Math.random() < lv.obeyChance;
    tsChoices = tsBuildChoices(tsCurrent, lv.options);
    tsRenderRound();
    clearTimeout(tsAutoSpeakTimer);
    tsAutoSpeakTimer = setTimeout(() => tsSpeakPrompt(), 350);
}

function tsBuildChoices(current, count) {
    const currentAnswer = String(current.answer || '').trim();
    const usedAnswers = new Set([currentAnswer.toLowerCase()]);
    const usedEmoji = new Set([String(current.emoji || '')]);
    const picks = [current];
    const shuffled = shuffleArray(tsAllPool);

    for (const q of shuffled) {
        if (picks.length >= count) break;
        const ans = String(q.answer || '').trim();
        const em = String(q.emoji || '');
        if (!ans || usedAnswers.has(ans.toLowerCase())) continue;
        if (em && usedEmoji.has(em)) continue;
        picks.push(q);
        usedAnswers.add(ans.toLowerCase());
        if (em) usedEmoji.add(em);
    }

    if (picks.length < count) {
        for (const q of shuffled) {
            if (picks.length >= count) break;
            const ans = String(q.answer || '').trim();
            if (!ans || usedAnswers.has(ans.toLowerCase())) continue;
            picks.push(q);
            usedAnswers.add(ans.toLowerCase());
        }
    }
    return shuffleArray(picks);
}

function tsRenderRound() {
    const prompt = tsObey ? `Teacher says: ${String(tsCurrent.answer || '').trim()}` : String(tsCurrent.answer || '').trim();
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5 overflow-hidden">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
                <span id="ts-timer" class="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-sm font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-sm font-black text-indigo-700">🎯 Lượt ${tsRound + 1}/${tsPool.length}</span>
                <span id="ts-score" class="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-sm font-black text-amber-700">⭐ ${tsScore}</span>
            </div>

            <div class="rounded-3xl bg-gradient-to-b from-sky-50 via-white to-pink-50 border-2 border-indigo-100 p-4 md:p-5 relative overflow-hidden">
                <div class="absolute left-4 top-3 text-2xl opacity-50">ABC</div>
                <div class="absolute right-4 top-3 text-2xl opacity-50">123</div>
                <div class="flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto">
                    <div class="shrink-0 text-center">
                        <div class="text-7xl ts-teacher">👩‍🏫</div>
                        <div class="text-xs md:text-sm font-black text-pink-600 mt-1">Cô giáo Thỏ Ngọc</div>
                    </div>
                    <div class="flex-1 w-full">
                        <div id="ts-bubble" class="ts-pulse relative rounded-3xl bg-white border-2 border-indigo-200 shadow-sm px-4 py-4 text-center">
                            <div class="text-xs md:text-sm font-black text-indigo-500 uppercase tracking-wider mb-1">Nghe thật kỹ</div>
                            <div class="text-xl md:text-2xl font-black ${tsObey ? 'text-emerald-700' : 'text-slate-800'}">${tsEsc(prompt)}</div>
                            <button onclick="tsSpeakPrompt()" class="pastel-btn mt-3 px-4 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm">🔊 Nghe lại</button>
                        </div>
                    </div>
                </div>

                <div class="mt-4 text-center text-sm md:text-base font-black text-slate-600">Bé sẽ làm gì?</div>
                <div class="grid grid-cols-2 md:grid-cols-${Math.min(4, tsChoices.length)} gap-2.5 mt-2.5 max-w-4xl mx-auto">
                    ${tsChoices.map((q, i) => {
                        const colors = [
                            'bg-cyan-50 border-cyan-200 text-cyan-700',
                            'bg-amber-50 border-amber-200 text-amber-700',
                            'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700',
                            'bg-emerald-50 border-emerald-200 text-emerald-700'
                        ];
                        return `<button id="ts-choice-${i}" onclick="tsChooseAction(${i})" class="ts-choice pastel-btn rounded-2xl border-2 ${colors[i % colors.length]} px-3 py-3 min-h-[112px] flex flex-col items-center justify-center text-center">
                            <div class="text-4xl md:text-5xl mb-1">${tsEsc(q.emoji || '🎒')}</div>
                            <div class="text-sm md:text-base font-black leading-snug">${tsEsc(String(q.answer || '').trim())}</div>
                        </button>`;
                    }).join('')}
                </div>

                <button id="ts-freeze-btn" onclick="tsChooseFreeze()" class="ts-choice pastel-btn mt-3 mx-auto w-full max-w-sm rounded-2xl border-2 border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 flex items-center justify-center gap-2 text-base md:text-lg font-black">
                    <span class="text-3xl">✋</span><span>Đứng yên — không làm theo</span>
                </button>

                <div class="mt-4 flex items-center justify-center gap-3">
                    <div id="ts-student" class="text-6xl">🐰</div>
                    <div class="rounded-2xl bg-white/90 border border-pink-200 px-3 py-2 text-sm font-black text-pink-700">Bé đang chờ lệnh...</div>
                </div>
            </div>

            <div class="flex items-center justify-center gap-2 flex-wrap mt-3">
                <span class="px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-black text-sm">🔥 Chuỗi: ${tsStreak}</span>
                <span class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-sm">❌ Nhầm: ${tsWrong}</span>
            </div>
            <p id="ts-status" class="min-h-[32px] text-center text-sm md:text-base font-black mt-2"></p>
        </div>`;
    tsUpdateTimer();
}

function tsChooseAction(index) {
    if (tsLocked || tsWrongChoices.has(index)) return;
    const choice = tsChoices[index];
    if (!choice) return;
    const btn = document.getElementById(`ts-choice-${index}`);
    const status = document.getElementById('ts-status');

    if (!tsObey) {
        tsWrong++;
        tsStreak = 0;
        tsWrongChoices.add(index);
        if (btn) {
            btn.disabled = true;
            btn.classList.add('ts-shake', 'opacity-50');
        }
        if (status) {
            status.className = 'min-h-[32px] text-center text-sm md:text-base font-black mt-2 text-rose-500';
            status.textContent = 'Ôi, cô chưa nói “Teacher says”! Bé phải đứng yên nhé.';
        }
        tsShakeStudent();
        return;
    }

    const answer = String(tsCurrent.answer || '').trim().toLowerCase();
    const chosen = String(choice.answer || '').trim().toLowerCase();
    if (chosen === answer) {
        tsCorrectRound(btn, 'Làm đúng hành động rồi!');
    } else {
        tsWrong++;
        tsStreak = 0;
        tsWrongChoices.add(index);
        if (btn) {
            btn.disabled = true;
            btn.classList.add('ts-shake', 'opacity-50');
        }
        if (status) {
            status.className = 'min-h-[32px] text-center text-sm md:text-base font-black mt-2 text-rose-500';
            status.textContent = 'Chưa đúng hành động. Nghe lại lệnh và thử tiếp nhé!';
        }
        tsShakeStudent();
    }
}

function tsChooseFreeze() {
    if (tsLocked) return;
    const btn = document.getElementById('ts-freeze-btn');
    const status = document.getElementById('ts-status');
    if (!tsObey) {
        tsCorrectRound(btn, 'Quá tỉnh táo! Không có “Teacher says” nên bé đứng yên.');
    } else {
        tsWrong++;
        tsStreak = 0;
        if (btn) {
            btn.classList.add('ts-shake', 'opacity-60');
            btn.disabled = true;
        }
        if (status) {
            status.className = 'min-h-[32px] text-center text-sm md:text-base font-black mt-2 text-rose-500';
            status.textContent = 'Có “Teacher says” mà! Bé cần làm đúng hành động nhé.';
        }
        tsShakeStudent();
    }
}

function tsCorrectRound(btn, message) {
    tsLocked = true;
    tsStreak++;
    tsBestStreak = Math.max(tsBestStreak, tsStreak);
    const bonus = Math.min(5, Math.max(0, tsStreak - 1));
    const points = 10 + bonus;
    tsScore += points;
    if (btn) {
        btn.classList.add('border-emerald-400', 'bg-emerald-100');
    }
    const status = document.getElementById('ts-status');
    if (status) {
        status.className = 'min-h-[32px] text-center text-sm md:text-base font-black mt-2 text-emerald-600';
        status.textContent = `${message} +${points} điểm`;
    }
    const score = document.getElementById('ts-score');
    if (score) score.textContent = `⭐ ${tsScore}`;
    tsHopStudent();
    tsStars();
    setTimeout(() => {
        tsRound++;
        tsNextRound();
    }, 1250);
}

function tsSpeakPrompt() {
    if (!tsCurrent) return;
    const command = String(tsCurrent.answer || '').trim();
    const text = tsObey ? `Teacher says, ${command}` : command;
    speakEnglish(text, 0.88);
}

function tsHopStudent() {
    const el = document.getElementById('ts-student');
    if (!el) return;
    el.classList.remove('ts-hop');
    void el.offsetWidth;
    el.classList.add('ts-hop');
}

function tsShakeStudent() {
    const el = document.getElementById('ts-student');
    if (!el) return;
    el.classList.remove('ts-shake');
    void el.offsetWidth;
    el.classList.add('ts-shake');
}

function tsStars() {
    const el = document.getElementById('ts-student');
    if (!el || !el.parentElement) return;
    const parent = el.parentElement;
    parent.style.position = 'relative';
    ['⭐','✨','✅'].forEach((x, i) => {
        const s = document.createElement('span');
        s.textContent = x;
        s.style.position = 'absolute';
        s.style.left = `${42 + i * 8}%`;
        s.style.top = '20%';
        s.style.fontSize = `${20 + i * 3}px`;
        s.style.pointerEvents = 'none';
        s.style.animation = `tsStar .7s ease-out ${i * 0.05}s both`;
        parent.appendChild(s);
        setTimeout(() => s.remove(), 900);
    });
}

function tsFinish() {
    clearInterval(tsTimerInterval);
    clearTimeout(tsAutoSpeakTimer);
    tsTimerInterval = null;
    stopSpeaking();
    const secs = Math.max(1, Math.floor((Date.now() - tsStartTime) / 1000));
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    const attempts = tsPool.length + tsWrong;
    const accuracy = attempts ? Math.round((tsPool.length / attempts) * 100) : 100;

    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-6 text-center">
            <div class="text-7xl mb-2">👩‍🏫🏆🐰</div>
            <h3 class="text-2xl md:text-3xl font-black text-indigo-600">Teacher Says hoàn thành!</h3>
            <p class="text-sm md:text-base font-bold text-gray-600 mt-1">Bé đã phản xạ rất tốt với các câu mệnh lệnh trong lớp học.</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl mx-auto mt-4">
                <div class="rounded-2xl bg-amber-50 border border-amber-200 p-3"><div class="text-2xl font-black text-amber-600">${tsScore}</div><div class="text-xs md:text-sm font-bold text-amber-700">Điểm</div></div>
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-2xl font-black text-emerald-600">${accuracy}%</div><div class="text-xs md:text-sm font-bold text-emerald-700">Chính xác</div></div>
                <div class="rounded-2xl bg-orange-50 border border-orange-200 p-3"><div class="text-2xl font-black text-orange-600">${tsBestStreak}</div><div class="text-xs md:text-sm font-bold text-orange-700">Chuỗi tốt nhất</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-2xl font-black text-cyan-600">${mm}:${ss}</div><div class="text-xs md:text-sm font-bold text-cyan-700">Thời gian</div></div>
            </div>
            <div class="mt-4 max-w-2xl mx-auto rounded-2xl bg-pink-50 border border-pink-200 p-3 text-sm md:text-base font-bold text-pink-700">
                🎓 Luật vàng: chỉ làm theo khi nghe thấy “Teacher says...” ở đầu câu.
            </div>
            <div class="mt-5 flex items-center justify-center gap-2 flex-wrap">
                <button onclick="tsStartLevel('${tsDifficulty}')" class="pastel-btn px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black">🔁 Chơi lại</button>
                <button onclick="tsRenderStart()" class="pastel-btn px-5 py-2.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-700 font-black">🎚️ Đổi độ khó</button>
                <button onclick="openMiniGameHub()" class="pastel-btn px-5 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-black">🎮 Chọn game khác</button>
            </div>
        </div>`;
    if (typeof confetti === 'function') confetti({ particleCount: 110, spread: 80, origin: { y: 0.7 } });
}

function tsUpdateTimer() {
    const el = document.getElementById('ts-timer');
    if (!el || !tsStartTime) return;
    const secs = Math.max(0, Math.floor((Date.now() - tsStartTime) / 1000));
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    el.textContent = `⏱️ ${mm}:${ss}`;
}

function tsEsc(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
