// ==========================================
// GAME 9: ACTION RACE
// Nguon du lieu: 10.3 Action Verbs Grammar Point.
// Gameplay: chon dung dong tu de tang toc xe, vuot doi thu va ve dich.
// ==========================================
let arAllPool = [];
let arPool = [];
let arDifficulty = 'easy';
let arRound = 0;
let arScore = 0;
let arWrong = 0;
let arStreak = 0;
let arBestStreak = 0;
let arHintsLeft = 0;
let arStartTime = 0;
let arTimerInterval = null;
let arCurrent = null;
let arLocked = false;
let arWrongChoices = new Set();
let arPlayerProgress = 0;
let arRivalProgress = 0;

const AR_LEVELS = {
    easy:   { label: 'Dễ', rounds: 8,  options: 3, hints: 3, rivalStep: 3.5, wrongStep: 7, note: '3 lựa chọn · nhiều gợi ý' },
    medium: { label: 'Vừa', rounds: 10, options: 4, hints: 2, rivalStep: 4.2, wrongStep: 8, note: '4 lựa chọn · đường đua dài hơn' },
    hard:   { label: 'Khó', rounds: 12, options: 4, hints: 1, rivalStep: 5.0, wrongStep: 9, note: '12 chặng · đối thủ bám sát' }
};

async function startActionRaceGame() {
    showLoadingOverlay('Đang đưa xe ra vạch xuất phát...');
    try {
        arAllPool = await ensureMiniGameLearningReady(['10.3']);
        arAllPool = arAllPool.filter(q => {
            const sentence = arExtractSentence(q.question_text);
            return sentence && sentence.includes('______') && String(q.answer || '').trim() && Array.isArray(q.options) && q.options.length >= 3;
        });
        hideLoadingOverlay();
        arEnsureStyles();
        arRenderStart();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được Action Race: ' + e.message);
    }
}

function arEnsureStyles() {
    if (document.getElementById('action-race-style')) return;
    const style = document.createElement('style');
    style.id = 'action-race-style';
    style.textContent = `
        @keyframes arRoadMove { from{background-position:0 0} to{background-position:-96px 0} }
        @keyframes arTurbo { 0%{transform:translateX(0) scale(1)} 35%{transform:translateX(8px) scale(1.09)} 70%{transform:translateX(-2px) scale(1.03)} 100%{transform:translateX(0) scale(1)} }
        @keyframes arShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 50%{transform:translateX(6px)} 75%{transform:translateX(-3px)} }
        @keyframes arFlame { 0%{transform:translateX(4px) scale(.65);opacity:0} 35%{opacity:1} 100%{transform:translateX(-18px) scale(1.25);opacity:0} }
        @keyframes arFlag { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }
        .ar-road { background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.0) 0 38px,rgba(255,255,255,.78) 38px 58px,rgba(255,255,255,.0) 58px 96px); animation:arRoadMove 1.2s linear infinite; }
        .ar-turbo { animation:arTurbo .55s ease-out; }
        .ar-shake { animation:arShake .38s ease-in-out; }
        .ar-flame { animation:arFlame .55s ease-out forwards; }
        .ar-flag { display:inline-block; transform-origin:bottom center; animation:arFlag 1s ease-in-out infinite; }
        .ar-car { transition:left .72s cubic-bezier(.22,.72,.25,1), transform .2s ease; }
        .ar-answer { transition:all .18s ease; }
        .ar-answer:hover { transform:translateY(-2px); }
    `;
    document.head.appendChild(style);
}

function arRenderStart() {
    clearInterval(arTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-5">
            <div class="bg-gradient-to-r from-sky-50 via-white to-orange-50 border-2 border-sky-100 rounded-2xl p-4 text-center mb-4">
                <div class="text-6xl mb-1">🏎️💨</div>
                <h3 class="text-xl md:text-2xl font-black text-sky-600">Action Race</h3>
                <p class="text-sm md:text-base text-gray-600 font-bold mt-1">Chọn đúng động từ hành động để xe tăng tốc và về đích trước đối thủ!</p>
                <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-sky-200 rounded-full text-sm font-black text-sky-700">📚 Dữ liệu: 10.3 Action Verbs · ${arAllPool.length} câu</div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                ${Object.entries(AR_LEVELS).map(([key, lv], i) => {
                    const cls = [
                        'bg-emerald-50 border-emerald-200 text-emerald-700',
                        'bg-indigo-50 border-indigo-200 text-indigo-700',
                        'bg-orange-50 border-orange-200 text-orange-700'
                    ][i];
                    return `<button onclick="arStartLevel('${key}')" class="pastel-btn rounded-2xl border-2 ${cls} p-4 text-center">
                        <div class="text-lg font-black">${lv.label}</div>
                        <div class="text-sm font-bold mt-1">${lv.rounds} chặng đua</div>
                        <div class="text-xs font-bold opacity-75 mt-1">${arEsc(lv.note)}</div>
                    </button>`;
                }).join('')}
            </div>
            <div class="mt-4 max-w-2xl mx-auto rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-center text-sm md:text-base font-bold text-amber-800">
                💡 Trả lời sai không mất câu: đối thủ sẽ tăng tốc, còn bé vẫn được chọn lại.
            </div>
        </div>`;
}

function arStartLevel(level) {
    const lv = AR_LEVELS[level];
    arDifficulty = level;
    let candidates = arAllPool.slice();
    if (level === 'easy') candidates = candidates.filter(q => arWordCount(arExtractSentence(q.question_text)) <= 10);
    if (level === 'medium') candidates = candidates.filter(q => arWordCount(arExtractSentence(q.question_text)) <= 13);
    if (candidates.length < lv.rounds) candidates = arAllPool.slice();

    // Co gang phan bo deu 5 nhom dong tu thay vi random trung qua nhieu mot dong tu.
    arPool = arBuildBalancedPool(candidates, lv.rounds);
    arRound = 0;
    arScore = 0;
    arWrong = 0;
    arStreak = 0;
    arBestStreak = 0;
    arHintsLeft = lv.hints;
    arStartTime = Date.now();
    arLocked = false;
    arWrongChoices = new Set();
    arPlayerProgress = 2;
    arRivalProgress = 2;
    clearInterval(arTimerInterval);
    arTimerInterval = setInterval(arUpdateTimer, 1000);
    headerLevel3ClickHandler = arRenderStart;
    arNextRound();
}

function arBuildBalancedPool(candidates, rounds) {
    const groups = new Map();
    candidates.forEach(q => {
        const key = String(q.answer || '').trim().toLowerCase();
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(q);
    });
    const buckets = [...groups.values()].map(arr => shuffleArray(arr));
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

function arNextRound() {
    if (arRound >= arPool.length) return arFinish();
    arCurrent = arPool[arRound];
    arLocked = false;
    arWrongChoices = new Set();
    arRenderRound();
}

function arRenderRound() {
    const lv = AR_LEVELS[arDifficulty];
    const total = arPool.length;
    const sentence = arExtractSentence(arCurrent.question_text);
    const options = arGetOptions(arCurrent, lv.options);
    window.__arOptions = options;

    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5 overflow-hidden">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
                <span id="ar-timer" class="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-sm font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-3 py-1 bg-sky-50 border border-sky-200 rounded-full text-sm font-black text-sky-700">🏁 Chặng ${arRound + 1}/${total}</span>
                <span id="ar-score" class="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-sm font-black text-amber-700">⭐ ${arScore}</span>
            </div>

            ${arRenderTrack()}

            <div class="rounded-2xl border-2 border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-fuchsia-50 p-4 md:p-5 mt-3">
                <div class="text-center text-xs md:text-sm font-black text-indigo-500 uppercase tracking-wide mb-2">Chọn động từ để hoàn thành câu</div>
                <div class="text-center text-lg md:text-2xl font-black text-slate-800 leading-relaxed">${arEsc(sentence)}</div>
                <div class="flex justify-center gap-2 flex-wrap mt-3">
                    <button onclick="arSpeakSentence(false)" class="pastel-btn px-4 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm">🔊 Nghe câu</button>
                    <button onclick="arShowHint()" class="pastel-btn px-4 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-sm">💡 Gợi ý (${arHintsLeft})</button>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-3xl mx-auto mt-3">
                ${options.map((opt, i) => {
                    const cls = [
                        'bg-pink-50 border-pink-200 text-pink-700',
                        'bg-cyan-50 border-cyan-200 text-cyan-700',
                        'bg-amber-50 border-amber-200 text-amber-700',
                        'bg-emerald-50 border-emerald-200 text-emerald-700'
                    ][i % 4];
                    return `<button id="ar-answer-${i}" onclick="arChoose(${i})" class="ar-answer pastel-btn min-h-[58px] rounded-2xl border-2 ${cls} px-4 py-3 text-base md:text-lg font-black">${arVerbIcon(opt)} ${arEsc(opt)}</button>`;
                }).join('')}
            </div>

            <div class="flex items-center justify-center gap-2 flex-wrap mt-3">
                <span class="px-3 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 font-black text-sm">🔥 Chuỗi đúng: ${arStreak}</span>
                <span class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-sm">💥 Lỗi: ${arWrong}</span>
            </div>
            <p id="ar-status" class="min-h-[30px] text-center text-sm md:text-base font-black mt-2"></p>
        </div>`;
    arUpdateTimer();
}

function arRenderTrack() {
    const p = Math.max(2, Math.min(92, arPlayerProgress));
    const r = Math.max(2, Math.min(92, arRivalProgress));
    return `
        <div class="rounded-2xl border-2 border-sky-100 bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 p-3 overflow-hidden relative">
            <div class="absolute right-3 top-1 text-3xl ar-flag">🏁</div>
            <div class="text-xs font-black text-slate-500 mb-1">BÉ</div>
            <div class="relative h-14 rounded-xl bg-slate-600 overflow-hidden border-2 border-slate-500">
                <div class="ar-road absolute inset-0 opacity-80"></div>
                <div class="absolute right-[7%] top-0 bottom-0 w-2 bg-white/80"></div>
                <div id="ar-player-car" class="ar-car absolute top-1/2 -translate-y-1/2 text-4xl z-10" style="left:${p}%">🏎️<span id="ar-flame-holder" class="absolute right-full top-1/2 -translate-y-1/2 text-xl pointer-events-none"></span></div>
            </div>
            <div class="text-xs font-black text-slate-500 mt-2 mb-1">ĐỐI THỦ</div>
            <div class="relative h-12 rounded-xl bg-slate-500 overflow-hidden border-2 border-slate-400">
                <div class="ar-road absolute inset-0 opacity-70"></div>
                <div class="absolute right-[7%] top-0 bottom-0 w-2 bg-white/80"></div>
                <div id="ar-rival-car" class="ar-car absolute top-1/2 -translate-y-1/2 text-3xl z-10" style="left:${r}%">🚙</div>
            </div>
        </div>`;
}

function arGetOptions(q, count) {
    const answer = String(q.answer || '').trim();
    let options = [...new Set((q.options || []).map(x => String(x).trim()).filter(Boolean))];
    if (!options.some(x => x.toLowerCase() === answer.toLowerCase())) options.unshift(answer);
    if (options.length > count) {
        const others = shuffleArray(options.filter(x => x.toLowerCase() !== answer.toLowerCase())).slice(0, count - 1);
        options = [answer, ...others];
    }
    return shuffleArray(options);
}

function arChoose(index) {
    if (arLocked) return;
    const options = window.__arOptions || [];
    const picked = String(options[index] || '').trim();
    const answer = String(arCurrent.answer || '').trim();
    const btn = document.getElementById(`ar-answer-${index}`);
    const status = document.getElementById('ar-status');
    if (!picked) return;

    if (picked.toLowerCase() === answer.toLowerCase()) {
        arLocked = true;
        arStreak++;
        arBestStreak = Math.max(arBestStreak, arStreak);
        const bonus = Math.min(40, (arStreak - 1) * 5);
        arScore += 100 + bonus;
        const target = 5 + ((arRound + 1) / arPool.length) * 87;
        arPlayerProgress = Math.min(92, target);
        arRivalProgress = Math.min(90, arRivalProgress + AR_LEVELS[arDifficulty].rivalStep);

        if (btn) {
            btn.classList.remove('bg-pink-50','bg-cyan-50','bg-amber-50','bg-emerald-50','border-pink-200','border-cyan-200','border-amber-200','border-emerald-200','text-pink-700','text-cyan-700','text-amber-700','text-emerald-700');
            btn.classList.add('bg-emerald-100','border-emerald-400','text-emerald-800');
        }
        if (status) {
            status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-emerald-600';
            status.textContent = bonus ? `✅ Chuẩn! +${100 + bonus} điểm · TURBO!` : '✅ Chuẩn! +100 điểm · TURBO!';
        }
        arAnimateCars(true);
        arSpeakSentence(true);
        setTimeout(() => {
            arRound++;
            arNextRound();
        }, 1250);
    } else {
        if (arWrongChoices.has(index)) return;
        arWrongChoices.add(index);
        arWrong++;
        arStreak = 0;
        arScore = Math.max(0, arScore - 15);
        arRivalProgress = Math.min(92, arRivalProgress + AR_LEVELS[arDifficulty].wrongStep);
        if (btn) {
            btn.classList.add('ar-shake','opacity-45');
            btn.disabled = true;
        }
        if (status) {
            status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-rose-500';
            status.textContent = '💥 Chưa đúng! Đối thủ tăng tốc rồi, chọn lại nhé!';
        }
        arAnimateCars(false);
        setTimeout(() => btn && btn.classList.remove('ar-shake'), 450);
    }
}

function arAnimateCars(correct) {
    const player = document.getElementById('ar-player-car');
    const rival = document.getElementById('ar-rival-car');
    if (player) {
        player.style.left = `${Math.max(2, Math.min(92, arPlayerProgress))}%`;
        if (correct) {
            player.classList.remove('ar-turbo');
            void player.offsetWidth;
            player.classList.add('ar-turbo');
            const holder = document.getElementById('ar-flame-holder');
            if (holder) {
                holder.innerHTML = '<span class="ar-flame inline-block">🔥</span>';
                setTimeout(() => { if (holder) holder.innerHTML = ''; }, 600);
            }
        }
    }
    if (rival) rival.style.left = `${Math.max(2, Math.min(92, arRivalProgress))}%`;
    const score = document.getElementById('ar-score');
    if (score) score.textContent = `⭐ ${arScore}`;
}

function arShowHint() {
    const status = document.getElementById('ar-status');
    if (arHintsLeft <= 0) {
        if (status) {
            status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-gray-400';
            status.textContent = '💡 Bé đã dùng hết gợi ý của chặng đua này rồi.';
        }
        return;
    }
    arHintsLeft--;
    const hint = String(arCurrent.hint || '').trim();
    if (status) {
        status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-amber-600';
        status.textContent = hint || `💡 Động từ đúng là hành động phù hợp nhất với câu này.`;
    }
    const buttons = [...document.querySelectorAll('button')];
    const hintBtn = buttons.find(b => b.getAttribute('onclick') === 'arShowHint()');
    if (hintBtn) hintBtn.textContent = `💡 Gợi ý (${arHintsLeft})`;
}

function arSpeakSentence(completed) {
    if (!arCurrent) return;
    const template = arExtractSentence(arCurrent.question_text);
    const text = completed ? template.replace('______', String(arCurrent.answer || '').trim()) : template.replace('______', 'blank');
    speakEnglish(text, 0.9);
}

function arFinish() {
    clearInterval(arTimerInterval);
    arPlayerProgress = 94;
    const elapsed = Math.floor((Date.now() - arStartTime) / 1000);
    const playerWins = arPlayerProgress >= arRivalProgress;
    const accuracy = Math.max(0, Math.round((arPool.length / Math.max(arPool.length + arWrong, 1)) * 100));
    const medal = arWrong === 0 ? '🏆' : arWrong <= Math.ceil(arPool.length * .25) ? '🥇' : playerWins ? '🥈' : '🥉';
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-5 md:p-6 text-center overflow-hidden">
            <div class="text-7xl mb-2">${medal}</div>
            <h3 class="text-2xl md:text-3xl font-black ${playerWins ? 'text-emerald-600' : 'text-orange-600'}">${playerWins ? 'Về đích rồi!' : 'Suýt nữa bắt kịp!'}</h3>
            <p class="text-sm md:text-base font-bold text-gray-600 mt-1">${playerWins ? 'Chiếc xe động từ của bé đã hoàn thành đường đua.' : 'Luyện thêm một lượt để vượt đối thủ nhé!'}</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto mt-4">
                <div class="rounded-2xl bg-amber-50 border border-amber-200 p-3"><div class="text-xs font-bold text-amber-600">Điểm</div><div class="text-xl font-black text-amber-700">${arScore}</div></div>
                <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-3"><div class="text-xs font-bold text-emerald-600">Độ chính xác</div><div class="text-xl font-black text-emerald-700">${accuracy}%</div></div>
                <div class="rounded-2xl bg-fuchsia-50 border border-fuchsia-200 p-3"><div class="text-xs font-bold text-fuchsia-600">Chuỗi tốt nhất</div><div class="text-xl font-black text-fuchsia-700">${arBestStreak}</div></div>
                <div class="rounded-2xl bg-sky-50 border border-sky-200 p-3"><div class="text-xs font-bold text-sky-600">Thời gian</div><div class="text-xl font-black text-sky-700">${arFormatTime(elapsed)}</div></div>
            </div>
            <div class="mt-5 flex justify-center gap-2 flex-wrap">
                <button onclick="arStartLevel('${arDifficulty}')" class="pastel-btn px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-black text-sm md:text-base shadow-md">🏎️ Đua lại</button>
                <button onclick="arRenderStart()" class="pastel-btn px-5 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-black text-sm md:text-base">⚙️ Chọn mức khác</button>
            </div>
        </div>`;
}

function arExtractSentence(text) {
    const s = String(text || '');
    const first = s.indexOf("'");
    const last = s.lastIndexOf("'");
    if (first >= 0 && last > first) return s.slice(first + 1, last).trim();
    const colon = s.indexOf(':');
    return (colon >= 0 ? s.slice(colon + 1) : s).trim();
}

function arWordCount(text) {
    return String(text || '').trim().split(/\s+/).filter(Boolean).length;
}

function arVerbIcon(verb) {
    const v = String(verb || '').toLowerCase();
    if (v.includes('play')) return '⚽';
    if (v.includes('read')) return '📚';
    if (v.includes('ride')) return '🚲';
    if (v.includes('sing')) return '🎤';
    if (v.includes('draw')) return '🖍️';
    return '🏃';
}

function arUpdateTimer() {
    const el = document.getElementById('ar-timer');
    if (!el || !arStartTime) return;
    const sec = Math.floor((Date.now() - arStartTime) / 1000);
    el.textContent = `⏱️ ${arFormatTime(sec)}`;
}

function arFormatTime(sec) {
    sec = Math.max(0, Number(sec) || 0);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function arEsc(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
