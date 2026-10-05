// ==========================================
// GAME 8: SENTENCE DOCTOR
// Nguon du lieu: 8.2 Grammar Choice.
// Gameplay 2 buoc: (1) chan doan tu/cum tu sai, (2) chon "thuoc" ngu phap dung de sua cau.
// ==========================================
let sdocAllPool = [];
let sdocPool = [];
let sdocDifficulty = 'easy';
let sdocRound = 0;
let sdocScore = 0;
let sdocWrong = 0;
let sdocStreak = 0;
let sdocBestStreak = 0;
let sdocHintsLeft = 0;
let sdocStartTime = 0;
let sdocTimerInterval = null;
let sdocCurrent = null;
let sdocWrongOption = '';
let sdocPatientSentence = '';
let sdocTokens = [];
let sdocStage = 'diagnose';
let sdocLocked = false;

const SDOC_LEVELS = {
    easy:   { label: 'Dễ', rounds: 8,  options: 3, hints: 3, note: 'Câu ngắn · 3 thuốc chữa' },
    medium: { label: 'Vừa', rounds: 10, options: 4, hints: 2, note: 'Đủ 4 lựa chọn ngữ pháp' },
    hard:   { label: 'Khó', rounds: 12, options: 4, hints: 1, note: 'Nhiều cấu trúc · ít gợi ý' }
};

async function startSentenceDoctorGame() {
    showLoadingOverlay('Đang mở phòng khám ngữ pháp...');
    try {
        sdocAllPool = await ensureMiniGameLearningReady(['8.2']);
        sdocAllPool = sdocAllPool.filter(q => {
            const sentence = sdocExtractSentence(q.question_text);
            return sentence && sentence.includes('______') && String(q.answer || '').trim() && Array.isArray(q.options) && q.options.length >= 3;
        });
        hideLoadingOverlay();
        sdocEnsureStyles();
        sdocRenderStart();
    } catch (e) {
        hideLoadingOverlay();
        alert('Không tải được Sentence Doctor: ' + e.message);
    }
}

function sdocEnsureStyles() {
    if (document.getElementById('sentence-doctor-style')) return;
    const style = document.createElement('style');
    style.id = 'sentence-doctor-style';
    style.textContent = `
        @keyframes sdocPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.035)} }
        @keyframes sdocShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-7px)} 50%{transform:translateX(7px)} 75%{transform:translateX(-4px)} }
        @keyframes sdocHeal { 0%{transform:scale(.6) rotate(-8deg);opacity:0} 65%{transform:scale(1.18) rotate(4deg);opacity:1} 100%{transform:scale(1);opacity:1} }
        @keyframes sdocSpark { 0%{transform:translateY(10px) scale(.6);opacity:0} 35%{opacity:1} 100%{transform:translateY(-26px) scale(1.25);opacity:0} }
        .sdoc-pulse { animation:sdocPulse 1.7s ease-in-out infinite; }
        .sdoc-shake { animation:sdocShake .38s ease-in-out; }
        .sdoc-heal { animation:sdocHeal .55s ease-out both; }
        .sdoc-token { transition:all .18s ease; }
        .sdoc-token:hover { transform:translateY(-2px); }
        .sdoc-spark { animation:sdocSpark .75s ease-out forwards; }
    `;
    document.head.appendChild(style);
}

function sdocRenderStart() {
    clearInterval(sdocTimerInterval);
    headerLevel3ClickHandler = null;
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-4 md:p-5">
            <div class="bg-gradient-to-r from-rose-50 via-white to-cyan-50 border-2 border-rose-100 rounded-2xl p-4 text-center mb-4">
                <div class="text-6xl mb-1">🩺🐰</div>
                <h3 class="text-xl md:text-2xl font-black text-rose-600">Sentence Doctor</h3>
                <p class="text-sm md:text-base text-gray-600 font-bold mt-1">Câu đang bị “ốm” vì một lỗi ngữ pháp. Tìm chỗ sai rồi chọn thuốc đúng để chữa câu nhé!</p>
                <div class="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-rose-200 rounded-full text-sm font-black text-rose-600">📚 Dữ liệu: 8.2 Grammar Choice · ${sdocAllPool.length} câu</div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
                ${Object.entries(SDOC_LEVELS).map(([key, lv], i) => {
                    const cls = [
                        'bg-emerald-50 border-emerald-200 text-emerald-700',
                        'bg-indigo-50 border-indigo-200 text-indigo-700',
                        'bg-rose-50 border-rose-200 text-rose-700'
                    ][i];
                    return `<button onclick="sdocStartLevel('${key}')" class="pastel-btn rounded-2xl border-2 ${cls} p-4 text-center">
                        <div class="text-lg font-black">${lv.label}</div>
                        <div class="text-sm font-bold mt-1">${lv.rounds} bệnh án</div>
                        <div class="text-xs font-bold opacity-75 mt-1">${sdocEsc(lv.note)}</div>
                    </button>`;
                }).join('')}
            </div>
            <div class="mt-4 max-w-2xl mx-auto grid grid-cols-2 gap-2 text-center">
                <div class="rounded-xl bg-amber-50 border border-amber-100 px-3 py-2 text-sm font-bold text-amber-700">🔍 Bước 1<br><span class="font-black">Chẩn đoán lỗi</span></div>
                <div class="rounded-xl bg-cyan-50 border border-cyan-100 px-3 py-2 text-sm font-bold text-cyan-700">💊 Bước 2<br><span class="font-black">Chọn thuốc chữa</span></div>
            </div>
        </div>`;
}

function sdocStartLevel(level) {
    const lv = SDOC_LEVELS[level];
    sdocDifficulty = level;
    let candidates = sdocAllPool.slice();
    if (level === 'easy') candidates = candidates.filter(q => sdocWordCount(sdocExtractSentence(q.question_text)) <= 8);
    if (level === 'medium') candidates = candidates.filter(q => sdocWordCount(sdocExtractSentence(q.question_text)) <= 11);
    if (candidates.length < lv.rounds) candidates = sdocAllPool.slice();
    sdocPool = shuffleArray(candidates).slice(0, Math.min(lv.rounds, candidates.length));
    sdocRound = 0;
    sdocScore = 0;
    sdocWrong = 0;
    sdocStreak = 0;
    sdocBestStreak = 0;
    sdocHintsLeft = lv.hints;
    sdocStartTime = Date.now();
    sdocLocked = false;
    clearInterval(sdocTimerInterval);
    sdocTimerInterval = setInterval(sdocUpdateTimer, 1000);
    headerLevel3ClickHandler = sdocRenderStart;
    sdocNextCase();
}

function sdocNextCase() {
    if (sdocRound >= sdocPool.length) return sdocFinish();
    sdocCurrent = sdocPool[sdocRound];
    const answer = String(sdocCurrent.answer || '').trim();
    const wrongs = [...new Set((sdocCurrent.options || []).map(x => String(x).trim()).filter(x => x && x.toLowerCase() !== answer.toLowerCase()))];
    sdocWrongOption = wrongs[Math.floor(Math.random() * wrongs.length)] || wrongs[0] || '???';
    const template = sdocExtractSentence(sdocCurrent.question_text);
    sdocPatientSentence = template.replace('______', sdocWrongOption);
    sdocTokens = sdocBuildTokens(template, sdocWrongOption);
    sdocStage = 'diagnose';
    sdocLocked = false;
    sdocRenderCase();
}

function sdocRenderCase() {
    const total = sdocPool.length;
    const health = Math.round((sdocRound / total) * 100);
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-3.5 md:p-5 overflow-hidden">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
                <span id="sdoc-timer" class="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-sm font-black text-slate-600">⏱️ 00:00</span>
                <span class="px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-sm font-black text-rose-700">📋 Bệnh án ${sdocRound + 1}/${total}</span>
                <span id="sdoc-score" class="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-black text-emerald-700">⭐ ${sdocScore}</span>
            </div>

            <div class="rounded-2xl border-2 border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-rose-50 p-3 md:p-4 mb-3">
                <div class="flex items-center gap-3">
                    <div class="relative shrink-0">
                        <div id="sdoc-patient" class="text-6xl md:text-7xl ${sdocStage === 'diagnose' ? 'sdoc-pulse' : ''}">${sdocStage === 'diagnose' ? '🤒' : '🙂'}</div>
                        <div id="sdoc-spark-holder" class="absolute inset-0 pointer-events-none"></div>
                    </div>
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center justify-between gap-2">
                            <div class="text-xs uppercase tracking-wide text-gray-400 font-black">Sức khỏe câu</div>
                            <div class="text-sm font-black ${sdocStage === 'cure' ? 'text-cyan-600' : 'text-rose-500'}">${sdocStage === 'cure' ? 'Đã chẩn đoán ✓' : 'Đang cần bác sĩ!'}</div>
                        </div>
                        <div class="h-3 bg-white rounded-full border border-slate-200 overflow-hidden mt-1.5">
                            <div class="h-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400 transition-all duration-500" style="width:${Math.max(8, health)}%"></div>
                        </div>
                        <div class="text-sm font-bold text-gray-500 mt-1">${health}% hồ sơ đã chữa xong</div>
                    </div>
                </div>
            </div>

            <div id="sdoc-case-card" class="rounded-2xl border-2 ${sdocStage === 'diagnose' ? 'border-rose-100 bg-rose-50/35' : 'border-cyan-100 bg-cyan-50/35'} p-4 md:p-5 mb-3">
                <div class="text-center text-sm font-black ${sdocStage === 'diagnose' ? 'text-rose-600' : 'text-cyan-700'} mb-3">
                    ${sdocStage === 'diagnose' ? '🔍 BƯỚC 1: Chạm vào từ/cụm từ làm câu bị sai' : '💊 BƯỚC 2: Chọn từ đúng để chữa câu'}
                </div>
                ${sdocStage === 'diagnose' ? sdocRenderTokenSentence() : sdocRenderCureStage()}
                <div class="mt-3 flex justify-center gap-2 flex-wrap">
                    <button onclick="sdocShowHint()" class="px-4 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-sm pastel-btn">💡 Gợi ý (${sdocHintsLeft})</button>
                    ${sdocStage === 'cure' ? `<button onclick="sdocSpeakPatient()" class="px-4 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-black text-sm pastel-btn">🔊 Nghe câu đang sai</button>` : ''}
                </div>
            </div>

            <div class="flex items-center justify-center gap-2 flex-wrap">
                <span class="px-3 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 font-black text-sm">🔥 Chuỗi đúng: ${sdocStreak}</span>
                <span class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-black text-sm">🩹 Nhầm: ${sdocWrong}</span>
            </div>
            <p id="sdoc-status" class="min-h-[30px] text-center text-sm md:text-base font-black mt-2"></p>
        </div>`;
    sdocUpdateTimer();
}

function sdocRenderTokenSentence() {
    return `<div id="sdoc-token-row" class="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto py-2">
        ${sdocTokens.map((t, i) => `<button onclick="sdocDiagnose(${i})" id="sdoc-token-${i}" class="sdoc-token rounded-xl border-2 border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50 px-3 py-2 text-lg md:text-xl font-black text-slate-700 shadow-sm">${sdocEsc(t.text)}</button>`).join('')}
    </div>`;
}

function sdocRenderCureStage() {
    const lv = SDOC_LEVELS[sdocDifficulty];
    const answer = String(sdocCurrent.answer || '').trim();
    let options = [...new Set((sdocCurrent.options || []).map(x => String(x).trim()).filter(Boolean))];
    if (!options.includes(answer)) options.unshift(answer);
    if (lv.options < options.length) {
        const others = shuffleArray(options.filter(x => x !== answer)).slice(0, lv.options - 1);
        options = shuffleArray([answer, ...others]);
    } else {
        options = shuffleArray(options);
    }
    window.__sdocCureOptions = options;
    return `
        <div class="text-center mb-3">
            <div class="inline-flex items-center gap-2 rounded-xl bg-white border border-rose-100 px-4 py-2 text-base md:text-lg font-black text-slate-700">
                <span class="line-through decoration-rose-500 decoration-2 text-rose-500">${sdocEsc(sdocWrongOption)}</span>
                <span>→</span><span class="text-cyan-600">?</span>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-3xl mx-auto">
            ${options.map((opt, i) => {
                const cls = [
                    'bg-pink-50 border-pink-200 text-pink-700',
                    'bg-indigo-50 border-indigo-200 text-indigo-700',
                    'bg-amber-50 border-amber-200 text-amber-700',
                    'bg-emerald-50 border-emerald-200 text-emerald-700'
                ][i % 4];
                return `<button id="sdoc-cure-${i}" onclick="sdocCure(${i})" class="pastel-btn min-h-[56px] rounded-2xl border-2 ${cls} px-4 py-3 text-base md:text-lg font-black">💊 ${sdocEsc(opt)}</button>`;
            }).join('')}
        </div>`;
}

function sdocDiagnose(index) {
    if (sdocLocked || sdocStage !== 'diagnose') return;
    const token = sdocTokens[index];
    const btn = document.getElementById(`sdoc-token-${index}`);
    if (token && token.wrong) {
        sdocStage = 'cure';
        sdocScore += 10;
        playAudio('correct');
        sdocRenderCase();
        const status = document.getElementById('sdoc-status');
        if (status) { status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-cyan-700'; status.textContent = `✅ Chẩn đoán đúng: “${sdocWrongOption}” đang làm câu bị sai.`; }
    } else {
        sdocWrong++;
        sdocStreak = 0;
        playAudio('wrong');
        if (btn) {
            btn.classList.add('sdoc-shake', 'border-rose-400', 'bg-rose-50');
            setTimeout(() => btn.classList.remove('sdoc-shake', 'border-rose-400', 'bg-rose-50'), 450);
        }
        const status = document.getElementById('sdoc-status');
        if (status) { status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-rose-600'; status.textContent = '🩹 Chỗ này chưa phải lỗi ngữ pháp, bác sĩ thử lại nhé!'; }
    }
}

function sdocCure(index) {
    if (sdocLocked || sdocStage !== 'cure') return;
    const options = window.__sdocCureOptions || [];
    const chosen = String(options[index] || '').trim();
    const answer = String(sdocCurrent.answer || '').trim();
    const btn = document.getElementById(`sdoc-cure-${index}`);
    if (chosen.toLowerCase() === answer.toLowerCase()) {
        sdocLocked = true;
        sdocScore += 20 + Math.min(sdocStreak, 5) * 2;
        sdocStreak++;
        sdocBestStreak = Math.max(sdocBestStreak, sdocStreak);
        playAudio('correct');
        if (btn) btn.className = 'sdoc-heal min-h-[56px] rounded-2xl border-2 bg-emerald-100 border-emerald-400 text-emerald-700 px-4 py-3 text-base md:text-lg font-black shadow-sm';
        sdocShowHealEffect();
        const correctSentence = sdocExtractSentence(sdocCurrent.question_text).replace('______', answer);
        const status = document.getElementById('sdoc-status');
        if (status) { status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-emerald-700'; status.innerHTML = `✅ Khỏi bệnh! <span class="text-slate-700">${sdocEsc(correctSentence)}</span>`; }
        setTimeout(() => { try { speakEnglish(correctSentence); } catch (_) {} }, 250);
        setTimeout(() => { sdocRound++; sdocNextCase(); }, 1750);
    } else {
        sdocWrong++;
        sdocStreak = 0;
        playAudio('wrong');
        if (btn) {
            btn.classList.add('sdoc-shake');
            btn.classList.remove('bg-pink-50','bg-indigo-50','bg-amber-50','bg-emerald-50');
            btn.classList.add('bg-rose-100','border-rose-400','text-rose-700');
            setTimeout(() => btn.classList.remove('sdoc-shake'), 420);
        }
        const status = document.getElementById('sdoc-status');
        if (status) { status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-rose-600'; status.textContent = '💊 Thuốc này chưa đúng. Thử loại khác nhé!'; }
    }
}

function sdocShowHint() {
    if (sdocHintsLeft <= 0 || sdocLocked) {
        const status = document.getElementById('sdoc-status');
        if (status) { status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-amber-600'; status.textContent = '💡 Bé đã dùng hết gợi ý ở mức này rồi.'; }
        return;
    }
    sdocHintsLeft--;
    if (sdocStage === 'diagnose') {
        const bad = sdocTokens.map((t,i) => t.wrong ? i : -1).filter(i => i >= 0);
        bad.forEach(i => {
            const el = document.getElementById(`sdoc-token-${i}`);
            if (el) { el.classList.add('ring-2','ring-amber-300','bg-amber-50'); setTimeout(() => el.classList.remove('ring-2','ring-amber-300','bg-amber-50'), 1600); }
        });
        const status = document.getElementById('sdoc-status');
        if (status) { status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-amber-700'; status.textContent = '💡 Cô vừa soi đèn vào vùng đang có lỗi.'; }
    } else {
        const ans = String(sdocCurrent.answer || '').trim().toLowerCase();
        const opts = window.__sdocCureOptions || [];
        const wrongIdx = opts.map((o,i) => String(o).trim().toLowerCase() !== ans ? i : -1).filter(i => i >= 0);
        if (wrongIdx.length) {
            const i = wrongIdx[Math.floor(Math.random()*wrongIdx.length)];
            const el = document.getElementById(`sdoc-cure-${i}`);
            if (el) { el.disabled = true; el.classList.add('opacity-30','line-through'); }
        }
        const status = document.getElementById('sdoc-status');
        if (status) { status.className = 'min-h-[30px] text-center text-sm md:text-base font-black mt-2 text-amber-700'; status.textContent = '💡 Cô đã loại giúp 1 loại thuốc sai.'; }
    }
    // update hint count without resetting stage state
    document.querySelectorAll('button').forEach(() => {});
}

function sdocShowHealEffect() {
    const patient = document.getElementById('sdoc-patient');
    if (patient) { patient.textContent = '🥳'; patient.classList.remove('sdoc-pulse'); patient.classList.add('sdoc-heal'); }
    const holder = document.getElementById('sdoc-spark-holder');
    if (holder) {
        holder.innerHTML = '<span class="sdoc-spark absolute left-1/2 top-1/2 text-4xl">✨</span><span class="sdoc-spark absolute left-1/3 top-1/2 text-2xl" style="animation-delay:.12s">💚</span><span class="sdoc-spark absolute left-2/3 top-1/2 text-2xl" style="animation-delay:.2s">✨</span>';
    }
}

function sdocSpeakPatient() {
    try { speakEnglish(sdocPatientSentence); } catch (_) {}
}

function sdocExtractSentence(text) {
    const s = String(text || '');
    const first = s.indexOf("'");
    const last = s.lastIndexOf("'");
    let core = (first >= 0 && last > first) ? s.slice(first + 1, last) : s;
    core = core.replace(/^.*?:\s*/, '').trim();
    // Parenthetical Vietnamese note in 8.2 is a clue, not part of the English sentence.
    core = core.replace(/\s*\([^()]*[À-ỹA-Za-z\s]+\)\s*$/u, '').trim();
    return core;
}

function sdocBuildTokens(template, wrongOption) {
    const marker = 'SDOCWRONGMARKER';
    const built = String(template).replace('______', `${marker}${wrongOption}${marker}`);
    const rough = built.match(/SDOCWRONGMARKER.*?SDOCWRONGMARKER|[A-Za-zÀ-ỹ0-9]+(?:['’][A-Za-z]+)?|[^\s]/gu) || [];
    const out = [];
    rough.forEach(part => {
        if (part.startsWith(marker) && part.endsWith(marker)) {
            const inner = part.slice(marker.length, -marker.length).trim();
            const pieces = inner.match(/[A-Za-zÀ-ỹ0-9]+(?:['’][A-Za-z]+)?|[^\s]/gu) || [inner];
            pieces.forEach(x => out.push({ text:x, wrong:true }));
        } else {
            // attach punctuation to previous token for cleaner UI
            if (/^[.,!?;:]$/.test(part) && out.length) out[out.length-1].text += part;
            else out.push({ text:part, wrong:false });
        }
    });
    return out;
}

function sdocWordCount(sentence) {
    return (String(sentence || '').match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []).length;
}

function sdocUpdateTimer() {
    const el = document.getElementById('sdoc-timer');
    if (!el || !sdocStartTime) return;
    const sec = Math.floor((Date.now() - sdocStartTime) / 1000);
    el.textContent = `⏱️ ${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
}

function sdocFinish() {
    clearInterval(sdocTimerInterval);
    sdocLocked = true;
    const elapsed = Math.floor((Date.now() - sdocStartTime) / 1000);
    const maxBase = sdocPool.length * 30;
    const accuracy = Math.max(0, Math.round((maxBase / Math.max(maxBase, maxBase + sdocWrong * 10)) * 100));
    document.getElementById('game-play-container').innerHTML = `
        <div class="pastel-card bg-white p-5 md:p-7 text-center">
            <div class="text-7xl mb-2">🏥✨</div>
            <h3 class="text-2xl md:text-3xl font-black text-emerald-600">Phòng khám hoàn thành!</h3>
            <p class="text-base text-gray-600 font-bold mt-2">Bác sĩ đã chữa xong ${sdocPool.length} câu ngữ pháp.</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto mt-5">
                <div class="rounded-2xl bg-amber-50 border-2 border-amber-100 p-3"><div class="text-2xl">⭐</div><div class="text-xl font-black text-amber-700">${sdocScore}</div><div class="text-xs font-bold text-gray-500">Điểm</div></div>
                <div class="rounded-2xl bg-rose-50 border-2 border-rose-100 p-3"><div class="text-2xl">🩹</div><div class="text-xl font-black text-rose-600">${sdocWrong}</div><div class="text-xs font-bold text-gray-500">Lượt nhầm</div></div>
                <div class="rounded-2xl bg-fuchsia-50 border-2 border-fuchsia-100 p-3"><div class="text-2xl">🔥</div><div class="text-xl font-black text-fuchsia-700">${sdocBestStreak}</div><div class="text-xs font-bold text-gray-500">Chuỗi tốt nhất</div></div>
                <div class="rounded-2xl bg-cyan-50 border-2 border-cyan-100 p-3"><div class="text-2xl">⏱️</div><div class="text-xl font-black text-cyan-700">${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,'0')}</div><div class="text-xs font-bold text-gray-500">Thời gian</div></div>
            </div>
            <div class="mt-5 flex justify-center gap-3 flex-wrap">
                <button onclick="sdocStartLevel('${sdocDifficulty}')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black pastel-btn">🔁 Chơi lại</button>
                <button onclick="sdocRenderStart()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black pastel-btn">🎚️ Đổi mức</button>
            </div>
        </div>`;
}

function sdocEsc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
