// ==========================================
// GAME 11: A OR AN FACTORY
// Data source: 10.1 Articles Grammar Point.
// Gameplay: send each phrase through the A or AN factory gate.
// ==========================================
let aafAllPool = [];
let aafPool = [];
let aafDifficulty = 'easy';
let aafRound = 0;
let aafScore = 0;
let aafWrong = 0;
let aafStreak = 0;
let aafBestStreak = 0;
let aafHintsLeft = 0;
let aafStartTime = 0;
let aafTimerInterval = null;
let aafCurrent = null;
let aafLocked = false;
let aafWrongChoices = new Set();

const AAF_LEVELS = {
    easy:   { label: 'Dễ', rounds: 10, hints: 5, belt: 7.0, note: '10 kiện hàng · 5 gợi ý' },
    medium: { label: 'Vừa', rounds: 14, hints: 3, belt: 5.2, note: '14 kiện hàng · băng chuyền nhanh hơn' },
    hard:   { label: 'Khó', rounds: 18, hints: 2, belt: 3.8, note: '18 kiện hàng · ít gợi ý' }
};

async function startAOrAnFactoryGame() {
    showLoadingOverlay('Đang khởi động nhà máy A / AN...');
    try {
        aafAllPool = await ensureMiniGameLearningReady(['10.1']);
        aafAllPool = aafAllPool.filter(q => {
            const ans = String(q.answer || '').trim().toLowerCase();
            return (ans === 'a' || ans === 'an') && aafExtractPhrase(q.question_text);
        });
        if (!aafAllPool.length) throw new Error('Không tìm thấy câu a/an trong mục 10.1.');
        hideLoadingOverlay();
        aafEnsureStyles();
        aafRenderStart();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được A or An Factory: ' + e.message);
    }
}

function aafEnsureStyles() {
    if (document.getElementById('aaf-style')) return;
    const style = document.createElement('style');
    style.id = 'aaf-style';
    style.textContent = `
        @keyframes aafBelt { 0%{background-position:0 0} 100%{background-position:64px 0} }
        @keyframes aafBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes aafShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-7px)} 50%{transform:translateX(7px)} 75%{transform:translateX(-4px)} }
        @keyframes aafGateGlow { 0%,100%{box-shadow:0 0 0 rgba(16,185,129,0)} 50%{box-shadow:0 0 24px rgba(16,185,129,.35)} }
        @keyframes aafSpark { 0%{transform:translateY(6px) scale(.6);opacity:0} 60%{opacity:1} 100%{transform:translateY(-32px) scale(1.2);opacity:0} }
        .aaf-belt { background-image:repeating-linear-gradient(90deg,#cbd5e1 0,#cbd5e1 24px,#94a3b8 24px,#94a3b8 32px); animation:aafBelt var(--aaf-belt-speed,6s) linear infinite; }
        .aaf-bob { animation:aafBob 1.6s ease-in-out infinite; }
        .aaf-shake { animation:aafShake .38s ease-in-out; }
        .aaf-glow { animation:aafGateGlow .9s ease-in-out 2; }
        .aaf-choice { transition:all .18s ease; }
        .aaf-choice:hover { transform:translateY(-2px) scale(1.01); }
    `;
    document.head.appendChild(style);
}

function aafRenderStart() {
    clearInterval(aafTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-5">
            <div class="bg-gradient-to-r from-amber-50 via-white to-cyan-50 border-2 border-amber-100 rounded-2xl p-4 text-center mb-4">
                <div class="text-6xl mb-1 aaf-bob">🏭📦</div>
                <h3 class="text-xl md:text-2xl font-black text-amber-600">A or An Factory</h3>
                <p class="text-sm md:text-base text-gray-600 font-bold mt-1">Đưa từng cụm từ vào đúng cổng <b>A</b> hoặc <b>AN</b> để nhà máy chạy trơn tru nhé!</p>
                <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-amber-200 rounded-full text-sm font-black text-amber-700">📚 Dữ liệu: 10.1 Articles · ${aafAllPool.length} câu</div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                ${Object.entries(AAF_LEVELS).map(([key, lv], i) => {
                    const cls = [
                        'bg-emerald-50 border-emerald-200 text-emerald-700',
                        'bg-indigo-50 border-indigo-200 text-indigo-700',
                        'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700'
                    ][i];
                    return `<button onclick="aafStartLevel('${key}')" class="pastel-btn rounded-2xl border-2 ${cls} p-4 text-center">
                        <div class="text-lg font-black">${lv.label}</div>
                        <div class="text-sm font-bold mt-1">${lv.rounds} kiện hàng</div>
                        <div class="text-xs font-bold opacity-75 mt-1">${lv.note}</div>
                    </button>`;
                }).join('')}
            </div>

            <div class="mt-4 max-w-2xl mx-auto rounded-2xl bg-cyan-50 border border-cyan-200 px-4 py-3 text-center text-sm md:text-base font-bold text-cyan-800">
                🔊 Mẹo: chọn theo <b>âm đầu</b> của từ đứng ngay sau chỗ trống, không chỉ nhìn chữ cái.
            </div>
        </div>`;
}

function aafStartLevel(level) {
    const lv = AAF_LEVELS[level];
    aafDifficulty = level;
    aafPool = aafBuildBalancedPool(aafAllPool, Math.min(lv.rounds, aafAllPool.length));
    aafRound = 0;
    aafScore = 0;
    aafWrong = 0;
    aafStreak = 0;
    aafBestStreak = 0;
    aafHintsLeft = lv.hints;
    aafStartTime = Date.now();
    aafLocked = false;
    aafWrongChoices = new Set();
    clearInterval(aafTimerInterval);
    aafTimerInterval = setInterval(aafUpdateTimer, 1000);
    headerLevel3ClickHandler = aafRenderStart;
    aafNextItem();
}

function aafBuildBalancedPool(candidates, rounds) {
    const a = shuffleArray(candidates.filter(q => String(q.answer).trim().toLowerCase() === 'a'));
    const an = shuffleArray(candidates.filter(q => String(q.answer).trim().toLowerCase() === 'an'));
    const out = [];
    let turn = Math.random() < 0.5 ? 'a' : 'an';
    while (out.length < rounds && (a.length || an.length)) {
        let bucket = turn === 'a' ? a : an;
        if (!bucket.length) bucket = turn === 'a' ? an : a;
        if (bucket.length) out.push(bucket.pop());
        turn = turn === 'a' ? 'an' : 'a';
    }
    return shuffleArray(out).slice(0, rounds);
}

function aafNextItem() {
    if (aafRound >= aafPool.length) return aafFinish();
    aafCurrent = aafPool[aafRound];
    aafLocked = false;
    aafWrongChoices = new Set();
    aafRenderRound();
}

function aafRenderRound() {
    const lv = AAF_LEVELS[aafDifficulty];
    const phrase = aafExtractPhrase(aafCurrent.question_text);
    const packageText = phrase.replace(/^_+\s*/, '').trim();
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5 overflow-hidden">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
                <span id="aaf-timer" class="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-sm font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-sm font-black text-amber-700">📦 Kiện ${aafRound + 1}/${aafPool.length}</span>
                <span id="aaf-score" class="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-black text-emerald-700">⭐ ${aafScore}</span>
            </div>

            <div class="rounded-3xl border-2 border-slate-200 bg-gradient-to-b from-sky-50 to-slate-50 p-3 md:p-4 relative overflow-hidden">
                <div class="absolute top-3 left-4 text-3xl opacity-70">⚙️</div>
                <div class="absolute top-3 right-4 text-3xl opacity-70">⚙️</div>
                <div class="text-center mb-3">
                    <div class="text-xs md:text-sm font-black text-slate-500 uppercase tracking-wider">Băng chuyền phân loại mạo từ</div>
                    <div class="text-lg md:text-xl font-black text-slate-800 mt-1">Chọn cổng đúng cho cụm từ này:</div>
                </div>

                <div id="aaf-package" class="mx-auto w-fit min-w-[210px] max-w-full rounded-2xl bg-white border-2 border-amber-200 shadow-md px-5 py-4 text-center relative z-10 aaf-bob">
                    <div class="text-4xl mb-1">${aafEsc(aafCurrent.emoji || '📦')}</div>
                    <div class="text-xl md:text-2xl font-black text-slate-800"><span class="text-amber-500">_____</span> ${aafEsc(packageText)}</div>
                </div>

                <div class="aaf-belt h-10 rounded-xl border-2 border-slate-300 mt-3 shadow-inner" style="--aaf-belt-speed:${lv.belt}s"></div>

                <div class="grid grid-cols-2 gap-3 md:gap-5 max-w-2xl mx-auto mt-4">
                    <button id="aaf-gate-a" onclick="aafChoose('a')" class="aaf-choice pastel-btn rounded-3xl border-2 border-cyan-300 bg-gradient-to-b from-cyan-50 to-white p-4 md:p-5 text-center">
                        <div class="text-4xl mb-1">🚪</div>
                        <div class="text-4xl md:text-5xl font-black text-cyan-600">A</div>
                        <div class="text-xs md:text-sm font-bold text-cyan-700 mt-1">Cổng phụ âm</div>
                    </button>
                    <button id="aaf-gate-an" onclick="aafChoose('an')" class="aaf-choice pastel-btn rounded-3xl border-2 border-fuchsia-300 bg-gradient-to-b from-fuchsia-50 to-white p-4 md:p-5 text-center">
                        <div class="text-4xl mb-1">🚪</div>
                        <div class="text-4xl md:text-5xl font-black text-fuchsia-600">AN</div>
                        <div class="text-xs md:text-sm font-bold text-fuchsia-700 mt-1">Cổng nguyên âm</div>
                    </button>
                </div>
            </div>

            <div class="flex items-center justify-center gap-2 flex-wrap mt-3">
                <button onclick="aafSpeak(false)" class="pastel-btn px-4 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm">🔊 Nghe cụm từ</button>
                <button id="aaf-hint-btn" onclick="aafShowHint()" class="pastel-btn px-4 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-sm">💡 Gợi ý (${aafHintsLeft})</button>
                <span class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-sm">❌ Nhầm: ${aafWrong}</span>
                <span class="px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-black text-sm">🔥 Chuỗi: ${aafStreak}</span>
            </div>
            <p id="aaf-status" class="min-h-[32px] text-center text-sm md:text-base font-black mt-2"></p>
        </div>`;
    aafUpdateTimer();
}

function aafChoose(choice) {
    if (aafLocked || aafWrongChoices.has(choice)) return;
    const answer = String(aafCurrent.answer || '').trim().toLowerCase();
    const btn = document.getElementById(`aaf-gate-${choice}`);
    const pkg = document.getElementById('aaf-package');
    const status = document.getElementById('aaf-status');

    if (choice === answer) {
        aafLocked = true;
        aafStreak++;
        aafBestStreak = Math.max(aafBestStreak, aafStreak);
        const bonus = Math.min(5, Math.max(0, aafStreak - 1));
        const points = 10 + bonus;
        aafScore += points;
        if (btn) {
            btn.classList.add('aaf-glow', 'border-emerald-400', 'bg-emerald-50');
        }
        if (pkg) {
            const phrase = aafExtractPhrase(aafCurrent.question_text).replace(/^_+\s*/, '').trim();
            pkg.classList.remove('aaf-bob');
            pkg.innerHTML = `<div class="text-4xl mb-1">✅</div><div class="text-xl md:text-2xl font-black text-emerald-700">${aafEsc(answer)} ${aafEsc(phrase)}</div>`;
            pkg.style.transition = 'transform .75s ease, opacity .75s ease';
            pkg.style.transform = choice === 'a' ? 'translate(-110px,80px) scale(.82)' : 'translate(110px,80px) scale(.82)';
            pkg.style.opacity = '.25';
        }
        if (status) {
            status.className = 'min-h-[32px] text-center text-sm md:text-base font-black mt-2 text-emerald-600';
            status.textContent = `Đúng cổng rồi! +${points} điểm`;
        }
        aafSpeak(true);
        aafSparks(choice);
        setTimeout(() => {
            aafRound++;
            aafNextItem();
        }, 1250);
    } else {
        aafWrong++;
        aafStreak = 0;
        aafWrongChoices.add(choice);
        if (btn) {
            btn.classList.add('aaf-shake', 'opacity-60');
            btn.disabled = true;
        }
        if (pkg) {
            pkg.classList.remove('aaf-shake');
            void pkg.offsetWidth;
            pkg.classList.add('aaf-shake');
        }
        if (status) {
            status.className = 'min-h-[32px] text-center text-sm md:text-base font-black mt-2 text-rose-500';
            status.textContent = 'Sai cổng rồi. Nghe âm đầu và thử cổng còn lại nhé!';
        }
    }
    const scoreEl = document.getElementById('aaf-score');
    if (scoreEl) scoreEl.textContent = `⭐ ${aafScore}`;
}

function aafShowHint() {
    if (aafLocked) return;
    const status = document.getElementById('aaf-status');
    if (aafHintsLeft <= 0) {
        if (status) {
            status.className = 'min-h-[32px] text-center text-sm md:text-base font-black mt-2 text-gray-500';
            status.textContent = 'Bé đã dùng hết gợi ý rồi nhé!';
        }
        return;
    }
    aafHintsLeft--;
    if (status) {
        status.className = 'min-h-[32px] text-center text-sm md:text-base font-black mt-2 text-amber-600';
        status.textContent = aafCurrent.hint || 'Hãy nghe âm đầu của từ ngay sau chỗ trống.';
    }
    const btn = document.getElementById('aaf-hint-btn');
    if (btn) btn.textContent = `💡 Gợi ý (${aafHintsLeft})`;
}

function aafSpeak(withAnswer) {
    if (!aafCurrent) return;
    const phrase = aafExtractPhrase(aafCurrent.question_text).replace(/^_+\s*/, '').trim();
    const text = withAnswer ? `${String(aafCurrent.answer || '').trim()} ${phrase}` : phrase;
    speakEnglish(text, 0.9);
}

function aafSparks(choice) {
    const btn = document.getElementById(`aaf-gate-${choice}`);
    if (!btn) return;
    btn.style.position = 'relative';
    ['✨','⭐','⚙️','✅'].forEach((x, i) => {
        const s = document.createElement('span');
        s.textContent = x;
        s.style.position = 'absolute';
        s.style.left = `${18 + i * 20}%`;
        s.style.top = '24%';
        s.style.fontSize = `${20 + (i % 2) * 5}px`;
        s.style.pointerEvents = 'none';
        s.style.animation = `aafSpark .7s ease-out ${i * 0.05}s both`;
        btn.appendChild(s);
        setTimeout(() => s.remove(), 900);
    });
}

function aafFinish() {
    clearInterval(aafTimerInterval);
    aafTimerInterval = null;
    stopSpeaking();
    const secs = Math.max(1, Math.floor((Date.now() - aafStartTime) / 1000));
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    const attempts = aafPool.length + aafWrong;
    const accuracy = attempts ? Math.round((aafPool.length / attempts) * 100) : 100;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-6 text-center">
            <div class="text-7xl mb-2">🏭🏆</div>
            <h3 class="text-2xl md:text-3xl font-black text-amber-600">Nhà máy hoàn thành đơn hàng!</h3>
            <p class="text-sm md:text-base font-bold text-gray-600 mt-1">Bé đã phân loại xong các cụm từ với <b>a / an</b>.</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl mx-auto mt-4">
                <div class="rounded-2xl bg-amber-50 border border-amber-200 p-3"><div class="text-2xl font-black text-amber-600">${aafScore}</div><div class="text-xs md:text-sm font-bold text-amber-700">Điểm</div></div>
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-2xl font-black text-emerald-600">${accuracy}%</div><div class="text-xs md:text-sm font-bold text-emerald-700">Chính xác</div></div>
                <div class="rounded-2xl bg-orange-50 border border-orange-200 p-3"><div class="text-2xl font-black text-orange-600">${aafBestStreak}</div><div class="text-xs md:text-sm font-bold text-orange-700">Chuỗi tốt nhất</div></div>
                <div class="rounded-2xl bg-cyan-50 border border-cyan-200 p-3"><div class="text-2xl font-black text-cyan-600">${mm}:${ss}</div><div class="text-xs md:text-sm font-bold text-cyan-700">Thời gian</div></div>
            </div>
            <div class="mt-5 flex items-center justify-center gap-2 flex-wrap">
                <button onclick="aafStartLevel('${aafDifficulty}')" class="pastel-btn px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black">🔁 Chơi lại</button>
                <button onclick="aafRenderStart()" class="pastel-btn px-5 py-2.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-700 font-black">🎚️ Đổi độ khó</button>
                <button onclick="openMiniGameHub()" class="pastel-btn px-5 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-black">🎮 Chọn game khác</button>
            </div>
        </div>`;
    if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 75, origin: { y: 0.7 } });
}

function aafUpdateTimer() {
    const el = document.getElementById('aaf-timer');
    if (!el || !aafStartTime) return;
    const secs = Math.max(0, Math.floor((Date.now() - aafStartTime) / 1000));
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    el.textContent = `⏱️ ${mm}:${ss}`;
}

function aafExtractPhrase(text) {
    const raw = String(text || '');
    const m = raw.match(/'([^']+)'/);
    return m ? m[1].trim() : '';
}

function aafEsc(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
