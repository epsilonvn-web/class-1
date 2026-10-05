(function () {
  'use strict';

  let gameActive_ = false;
  const gameTimers_ = new Set();
  function later_(fn, ms) {
    const id = setTimeout(() => {
      gameTimers_.delete(id);
      if (gameActive_) fn();
    }, ms);
    gameTimers_.add(id);
    return id;
  }
  function clearGameTimers_() {
    gameTimers_.forEach(id => clearTimeout(id));
    gameTimers_.clear();
  }
  function stopGameAudio_() {
    if (typeof stopSpeaking === 'function') {
      try { stopSpeaking(); } catch (_) {}
    }
  }

  const SUDOKU_LEVELS = {
    l1: { label: 'Cấp 1 · Làm quen',  size: 4, boxRows: 2, boxCols: 2, remove: 5,  color: 'emerald' },
    l2: { label: 'Cấp 2 · Dễ',       size: 4, boxRows: 2, boxCols: 2, remove: 7,  color: 'sky' },
    l3: { label: 'Cấp 3 · Thử thách',size: 4, boxRows: 2, boxCols: 2, remove: 9,  color: 'violet' },
    l4: { label: 'Cấp 4 · Làm quen', size: 6, boxRows: 2, boxCols: 3, remove: 14, color: 'emerald' },
    l5: { label: 'Cấp 5 · Vừa',      size: 6, boxRows: 2, boxCols: 3, remove: 18, color: 'sky' },
    l6: { label: 'Cấp 6 · Khó',      size: 6, boxRows: 2, boxCols: 3, remove: 22, color: 'violet' },
    l7: { label: 'Cấp 7 · 9×9 Dễ',   size: 9, boxRows: 3, boxCols: 3, remove: 34, color: 'emerald' },
    l8: { label: 'Cấp 8 · 9×9 Vừa',  size: 9, boxRows: 3, boxCols: 3, remove: 42, color: 'sky' },
    l9: { label: 'Cấp 9 · Chuyên gia',size: 9, boxRows: 3, boxCols: 3, remove: 48, color: 'violet' }
  };

  const sudokuState = {
    level: 'l1',
    config: SUDOKU_LEVELS.l1,
    solution: [],
    puzzle: [],
    board: [],
    fixed: [],
    selected: null,
    errors: 0,
    hints: 0,
    seconds: 0,
    timer: null,
    finished: false,
    startedAt: 0,
    completedBoards: 0
  };

  function shuffle_(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pattern_(r, c, boxRows, boxCols, size) {
    return (boxCols * (r % boxRows) + Math.floor(r / boxRows) + c) % size;
  }

  function buildSolvedGrid_(cfg) {
    const n = cfg.size;
    const rowBands = shuffle_(Array.from({ length: n / cfg.boxRows }, (_, i) => i));
    const colStacks = shuffle_(Array.from({ length: n / cfg.boxCols }, (_, i) => i));
    const rows = rowBands.flatMap(b => shuffle_(Array.from({ length: cfg.boxRows }, (_, i) => b * cfg.boxRows + i)));
    const cols = colStacks.flatMap(s => shuffle_(Array.from({ length: cfg.boxCols }, (_, i) => s * cfg.boxCols + i)));
    const nums = shuffle_(Array.from({ length: n }, (_, i) => i + 1));
    return rows.map(r => cols.map(c => nums[pattern_(r, c, cfg.boxRows, cfg.boxCols, n)]));
  }

  function getCandidates_(grid, row, col, cfg) {
    if (grid[row][col] !== 0) return [];
    const used = new Set();
    for (let i = 0; i < cfg.size; i++) {
      if (grid[row][i]) used.add(grid[row][i]);
      if (grid[i][col]) used.add(grid[i][col]);
    }
    const r0 = Math.floor(row / cfg.boxRows) * cfg.boxRows;
    const c0 = Math.floor(col / cfg.boxCols) * cfg.boxCols;
    for (let r = r0; r < r0 + cfg.boxRows; r++) {
      for (let c = c0; c < c0 + cfg.boxCols; c++) if (grid[r][c]) used.add(grid[r][c]);
    }
    return Array.from({ length: cfg.size }, (_, i) => i + 1).filter(v => !used.has(v));
  }

  function countSolutions_(grid, cfg, limit) {
    let best = null;
    let bestCandidates = null;
    for (let r = 0; r < cfg.size; r++) {
      for (let c = 0; c < cfg.size; c++) {
        if (grid[r][c] !== 0) continue;
        const candidates = getCandidates_(grid, r, c, cfg);
        if (candidates.length === 0) return 0;
        if (!best || candidates.length < bestCandidates.length) {
          best = [r, c];
          bestCandidates = candidates;
          if (candidates.length === 1) break;
        }
      }
      if (bestCandidates && bestCandidates.length === 1) break;
    }
    if (!best) return 1;

    let count = 0;
    const [row, col] = best;
    for (const val of bestCandidates) {
      grid[row][col] = val;
      count += countSolutions_(grid, cfg, limit - count);
      grid[row][col] = 0;
      if (count >= limit) return count;
    }
    return count;
  }

  function makePuzzle_(solution, cfg) {
    const grid = solution.map(row => row.slice());
    const cells = shuffle_(Array.from({ length: cfg.size * cfg.size }, (_, i) => i));
    let removed = 0;
    for (const index of cells) {
      if (removed >= cfg.remove) break;
      const r = Math.floor(index / cfg.size);
      const c = index % cfg.size;
      const keep = grid[r][c];
      grid[r][c] = 0;
      const test = grid.map(row => row.slice());
      if (countSolutions_(test, cfg, 2) === 1) removed++;
      else grid[r][c] = keep;
    }
    return grid;
  }

  function formatTime_(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function stopTimer_() {
    if (sudokuState.timer) clearInterval(sudokuState.timer);
    sudokuState.timer = null;
  }

  function startTimer_() {
    stopTimer_();
    sudokuState.timer = setInterval(() => {
      if (sudokuState.finished) return;
      sudokuState.seconds++;
      const el = document.getElementById('sudoku-time');
      if (el) el.textContent = formatTime_(sudokuState.seconds);
    }, 1000);
  }

  function injectStyle_() {
    if (document.getElementById('sudoku-game-style')) return;
    const style = document.createElement('style');
    style.id = 'sudoku-game-style';
    style.textContent = `
      .sdk-shell{width:100%;max-width:none;margin:0 auto;font-family:inherit;font-size:16px}
      .sdk-toolbar{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
      .sdk-level{border:1px solid #e9d5ff;background:#fff;border-radius:16px;padding:10px 11px;font-weight:900;font-size:16px;line-height:1.25;color:#6d28d9;transition:.18s}
      .sdk-level:hover{transform:translateY(-1px);box-shadow:0 5px 14px rgba(109,40,217,.10)}
      .sdk-level.is-active{background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;border-color:#a855f7;box-shadow:0 6px 16px rgba(168,85,247,.22)}
      .sdk-play-grid{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:14px;align-items:start}.sdk-board-card{min-width:0}.sdk-side{position:sticky;top:8px}.sdk-board{--n:4;--box-rows:2;--box-cols:2;display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));width:min(100%,720px);aspect-ratio:1/1;margin:0 auto;border:3px solid #7c3aed;border-radius:16px;overflow:hidden;background:#7c3aed;box-shadow:0 10px 28px rgba(124,58,237,.16)}
      .sdk-cell{position:relative;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #e9d5ff;font-weight:900;font-size:clamp(26px,5.4vw,44px);color:#6d28d9;cursor:pointer;transition:background .12s,transform .12s,box-shadow .12s;user-select:none}
      .sdk-board[data-size="6"] .sdk-cell{font-size:clamp(23px,4.6vw,38px)}
      .sdk-board[data-size="9"] .sdk-cell{font-size:clamp(19px,3.5vw,31px)}
      .sdk-cell:hover{background:#faf5ff}
      .sdk-cell.is-fixed{background:#f8fafc;color:#334155;cursor:default}
      .sdk-cell.is-selected{background:#fdf2f8;box-shadow:inset 0 0 0 3px #ec4899;z-index:2}
      .sdk-cell.is-peer{background:#faf5ff}
      .sdk-cell.is-same{background:#fff7ed}
      .sdk-cell.is-wrong{animation:sdk-shake .28s ease;background:#fff1f2!important;color:#e11d48!important;box-shadow:inset 0 0 0 3px #fb7185!important}
      .sdk-cell.is-hint{animation:sdk-pop .35s ease;background:#ecfdf5!important;color:#047857!important}
      .sdk-cell.box-right{border-right:3px solid #7c3aed}
      .sdk-cell.box-bottom{border-bottom:3px solid #7c3aed}
      .sdk-numpad-wrap{margin-top:2px;padding-top:10px;border-top:1px solid #dbeafe}.sdk-numpad-title{text-align:center;font-size:15px;font-weight:900;color:#475569;margin-bottom:8px}.sdk-numpad{display:grid;gap:9px;width:100%;margin:0}.sdk-numpad .sdk-clear{grid-column:1/-1;min-height:46px;font-size:16px;color:#64748b}
      .sdk-num{min-height:62px;border-radius:15px;border:1px solid #ddd6fe;background:#fff;color:#6d28d9;font-weight:900;font-size:28px;box-shadow:0 3px 9px rgba(76,29,149,.07);transition:.15s}
      .sdk-num:hover{background:#f5f3ff;transform:translateY(-1px)}
      .sdk-action{min-height:44px;border-radius:14px;padding:9px 13px;font-weight:900;font-size:15px;transition:.15s}
      .sdk-progress{height:8px;border-radius:999px;background:#f1f5f9;overflow:hidden}
      .sdk-progress>i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#ec4899,#8b5cf6);transition:width .25s ease}
      @keyframes sdk-shake{0%,100%{transform:translateX(0)}30%{transform:translateX(-4px)}70%{transform:translateX(4px)}}
      @keyframes sdk-pop{0%{transform:scale(.88)}70%{transform:scale(1.08)}100%{transform:scale(1)}}
      @media(max-width:900px){.sdk-play-grid{grid-template-columns:1fr}.sdk-side{position:static}.sdk-board{width:min(92vw,620px)}.sdk-numpad{max-width:520px;margin:0 auto}.sdk-numpad-wrap{border-top:0;border-bottom:1px solid #dbeafe;padding-top:0;padding-bottom:12px}.sdk-side .sdk-numpad-wrap{order:-1}}@media(max-width:640px){.sdk-board{width:min(92vw,440px);border-radius:14px}.sdk-toolbar{grid-template-columns:1fr 1fr}.sdk-level{padding:9px 7px;font-size:14px}.sdk-cell{font-size:clamp(22px,7.2vw,34px)}.sdk-num{min-height:54px;font-size:23px}}
    `;
    document.head.appendChild(style);
  }

  function renderShell_() {
    const container = document.getElementById('game-play-container');
    if (!container) return;
    injectStyle_();
    container.innerHTML = `
      <div class="sdk-shell space-y-3">
        <section class="rounded-3xl border-2 border-purple-100 bg-gradient-to-br from-white via-purple-50/45 to-pink-50/55 p-3 md:p-4 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-3xl">🐰</span>
                <div>
                  <h3 class="font-black text-purple-800 text-lg md:text-xl">Sudoku cùng Cô Thỏ Hồng</h3>
                  <p class="text-sm md:text-base font-bold text-slate-600">Mỗi hàng, mỗi cột và mỗi ô nhỏ không được lặp số.</p>
                </div>
              </div>
            </div>
            <button onclick="sudokuSpeakRules()" class="sdk-action bg-pink-50 border-2 border-pink-200 text-pink-700 hover:bg-pink-100 shrink-0"><i class="fa-solid fa-volume-high mr-1"></i> Nghe luật chơi</button>
          </div>

          <div class="sdk-toolbar mt-3">
            ${Object.entries(SUDOKU_LEVELS).map(([key, cfg]) => `<button id="sdk-level-${key}" onclick="sudokuChooseLevel('${key}')" class="sdk-level">${cfg.label}<div class="text-sm font-black opacity-85 mt-1">${cfg.size} × ${cfg.size}</div></button>`).join('')}
          </div>
        </section>

        <section class="sdk-play-grid">
          <div class="sdk-board-card rounded-3xl border-2 border-pink-100 bg-white p-3 md:p-4 shadow-sm">
            <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
              <div class="flex items-center gap-2 text-sm font-black">
                <span class="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">⏱ <span id="sudoku-time">00:00</span></span>
                <span class="px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">💡 Gợi ý: <span id="sudoku-hints">0</span></span>
                <span class="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">✏️ Sai: <span id="sudoku-errors">0</span></span>
              </div>
              <span id="sudoku-level-label" class="text-sm font-black text-slate-500"></span>
            </div>

            <div id="sudoku-board" class="sdk-board" aria-label="Bàn Sudoku"></div>

            <div class="mt-3">
              <div class="flex justify-between text-sm font-black text-slate-500 mb-1"><span>Tiến độ</span><span id="sudoku-progress-text">0%</span></div>
              <div class="sdk-progress"><i id="sudoku-progress-bar" style="width:0%"></i></div>
            </div>
          </div>

          <aside class="sdk-side rounded-3xl border-2 border-sky-100 bg-gradient-to-b from-sky-50/60 to-white p-3 md:p-4 shadow-sm space-y-3 flex flex-col">
            <div>
              <div class="font-black text-sky-800 text-base mb-1">🎯 Cách chơi</div>
              <div id="sudoku-rule-text" class="text-sm font-bold text-slate-600 leading-relaxed"></div>
            </div>
            <div class="rounded-2xl border border-purple-100 bg-white p-3">
              <div class="font-black text-purple-700 text-base">Mẹo nhỏ</div>
              <p class="text-sm font-bold text-slate-600 mt-1 leading-relaxed">Hãy nhìn hàng, cột và ô nhỏ. Số nào đã có rồi thì mình loại ra nhé!</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button onclick="sudokuNewGame()" class="sdk-action bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm"><i class="fa-solid fa-rotate mr-1"></i> Ván mới</button>
              <button onclick="sudokuHint()" class="sdk-action bg-amber-50 border-2 border-amber-200 text-amber-700 hover:bg-amber-100"><i class="fa-solid fa-lightbulb mr-1"></i> Gợi ý</button>
            </div>
            <button onclick="sudokuResetCurrent()" class="sdk-action w-full bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50"><i class="fa-solid fa-eraser mr-1"></i> Làm lại ván này</button>
            <div class="sdk-numpad-wrap">
              <div class="sdk-numpad-title">🔢 Chọn số để điền</div>
              <div id="sudoku-numpad" class="sdk-numpad"></div>
            </div>
          </aside>
        </section>
      </div>`;
  }

  function cellId_(r, c) { return `sdk-cell-${r}-${c}`; }

  function renderBoard_() {
    const board = document.getElementById('sudoku-board');
    if (!board) return;
    const cfg = sudokuState.config;
    board.dataset.size = String(cfg.size);
    board.style.setProperty('--n', cfg.size);
    board.style.setProperty('--box-rows', cfg.boxRows);
    board.style.setProperty('--box-cols', cfg.boxCols);
    board.innerHTML = '';

    for (let r = 0; r < cfg.size; r++) {
      for (let c = 0; c < cfg.size; c++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = cellId_(r, c);
        btn.className = 'sdk-cell';
        if (sudokuState.fixed[r][c]) btn.classList.add('is-fixed');
        if ((c + 1) % cfg.boxCols === 0 && c !== cfg.size - 1) btn.classList.add('box-right');
        if ((r + 1) % cfg.boxRows === 0 && r !== cfg.size - 1) btn.classList.add('box-bottom');
        btn.textContent = sudokuState.board[r][c] || '';
        btn.setAttribute('aria-label', `Hàng ${r + 1}, cột ${c + 1}${sudokuState.board[r][c] ? ', số ' + sudokuState.board[r][c] : ', ô trống'}`);
        btn.onclick = () => sudokuSelectCell(r, c);
        board.appendChild(btn);
      }
    }
    refreshHighlights_();
    updateProgress_();
  }

  function renderNumpad_() {
    const pad = document.getElementById('sudoku-numpad');
    if (!pad) return;
    const nums = Array.from({ length: sudokuState.config.size }, (_, i) => i + 1);
    pad.dataset.size = String(sudokuState.config.size);
    pad.style.gridTemplateColumns = sudokuState.config.size === 4 ? 'repeat(2,minmax(0,1fr))' : 'repeat(3,minmax(0,1fr))';
    pad.innerHTML = nums.map(n => `<button class="sdk-num" onclick="sudokuPutNumber(${n})">${n}</button>`).join('') +
      `<button class="sdk-num sdk-clear" onclick="sudokuClearCell()" title="Xóa số"><i class="fa-solid fa-delete-left mr-1"></i> Xóa số</button>`;
  }

  function updateInfo_() {
    const cfg = sudokuState.config;
    const levelLabel = document.getElementById('sudoku-level-label');
    const ruleText = document.getElementById('sudoku-rule-text');
    const errors = document.getElementById('sudoku-errors');
    const hints = document.getElementById('sudoku-hints');
    const time = document.getElementById('sudoku-time');
    if (levelLabel) levelLabel.textContent = cfg.label;
    if (ruleText) ruleText.innerHTML = cfg.size === 4
      ? 'Điền các số <strong>1–4</strong>. Mỗi hàng, cột và mỗi ô <strong>2×2</strong> phải có đủ 1–4, không lặp.'
      : (cfg.size === 6
          ? 'Điền các số <strong>1–6</strong>. Mỗi hàng, cột và mỗi ô <strong>2×3</strong> phải có đủ 1–6, không lặp.'
          : 'Điền các số <strong>1–9</strong>. Mỗi hàng, cột và mỗi ô <strong>3×3</strong> phải có đủ 1–9, không lặp.');
    if (errors) errors.textContent = sudokuState.errors;
    if (hints) hints.textContent = sudokuState.hints;
    if (time) time.textContent = formatTime_(sudokuState.seconds);
    Object.keys(SUDOKU_LEVELS).forEach(k => document.getElementById(`sdk-level-${k}`)?.classList.toggle('is-active', k === sudokuState.level));
  }

  function refreshHighlights_() {
    const cfg = sudokuState.config;
    const selected = sudokuState.selected;
    const selectedValue = selected ? sudokuState.board[selected.r][selected.c] : 0;
    for (let r = 0; r < cfg.size; r++) {
      for (let c = 0; c < cfg.size; c++) {
        const el = document.getElementById(cellId_(r, c));
        if (!el) continue;
        el.classList.remove('is-selected', 'is-peer', 'is-same');
        if (!selected) continue;
        if (selected.r === r && selected.c === c) el.classList.add('is-selected');
        else {
          const sameBox = Math.floor(r / cfg.boxRows) === Math.floor(selected.r / cfg.boxRows) && Math.floor(c / cfg.boxCols) === Math.floor(selected.c / cfg.boxCols);
          if (r === selected.r || c === selected.c || sameBox) el.classList.add('is-peer');
          if (selectedValue && sudokuState.board[r][c] === selectedValue) el.classList.add('is-same');
        }
      }
    }
  }

  function updateProgress_() {
    const cfg = sudokuState.config;
    let filled = 0;
    let totalEmpty = 0;
    let correctFilled = 0;
    for (let r = 0; r < cfg.size; r++) {
      for (let c = 0; c < cfg.size; c++) {
        if (!sudokuState.fixed[r][c]) {
          totalEmpty++;
          if (sudokuState.board[r][c]) {
            filled++;
            if (sudokuState.board[r][c] === sudokuState.solution[r][c]) correctFilled++;
          }
        }
      }
    }
    const pct = totalEmpty ? Math.round((correctFilled / totalEmpty) * 100) : 100;
    const bar = document.getElementById('sudoku-progress-bar');
    const txt = document.getElementById('sudoku-progress-text');
    if (bar) bar.style.width = `${pct}%`;
    if (txt) txt.textContent = `${pct}%`;
    return { filled, totalEmpty, correctFilled, pct };
  }

  function flashWrong_(r, c) {
    const el = document.getElementById(cellId_(r, c));
    if (!el) return;
    el.classList.add('is-wrong');
    later_(() => el.classList.remove('is-wrong'), 500);
  }

  function finishIfNeeded_() {
    const cfg = sudokuState.config;
    for (let r = 0; r < cfg.size; r++) {
      for (let c = 0; c < cfg.size; c++) {
        if (sudokuState.board[r][c] !== sudokuState.solution[r][c]) return false;
      }
    }
    sudokuState.finished = true;
    stopTimer_();
    sudokuState.completedBoards++;
    if (sudokuState.completedBoards > 0 && sudokuState.completedBoards % 10 === 0 && typeof rewardMiniGameStar_ === 'function') {
      rewardMiniGameStar_('Bé đã hoàn thành 10 bảng Sudoku!');
    }
    const msg = `🎉 Tuyệt vời! Bé đã hoàn thành Sudoku ${sudokuState.config.size}×${sudokuState.config.size} trong ${formatTime_(sudokuState.seconds)} với ${sudokuState.errors} lần thử chưa đúng.`;
    if (typeof showAppNotice === 'function') showAppNotice(msg, { title: 'Cô Thỏ Hồng khen bé!', icon: '🏆', okText: 'Chơi ván mới', onClose: () => { if (gameActive_) sudokuNewGame(); } });
    else later_(() => sudokuNewGame(), 600);
    if (typeof speakVietnamese === 'function') speakVietnamese('Giỏi lắm! Con đã hoàn thành bảng Sudoku rồi!', 0.92);
    return true;
  }

  function newGame_(level) {
    sudokuState.level = level || sudokuState.level || 'l1';
    sudokuState.config = SUDOKU_LEVELS[sudokuState.level] || SUDOKU_LEVELS.l1;
    sudokuState.solution = buildSolvedGrid_(sudokuState.config);
    sudokuState.puzzle = makePuzzle_(sudokuState.solution, sudokuState.config);
    sudokuState.board = sudokuState.puzzle.map(row => row.slice());
    sudokuState.fixed = sudokuState.puzzle.map(row => row.map(v => v !== 0));
    sudokuState.selected = null;
    sudokuState.errors = 0;
    sudokuState.hints = 0;
    sudokuState.seconds = 0;
    sudokuState.finished = false;
    sudokuState.startedAt = Date.now();
    renderBoard_();
    renderNumpad_();
    updateInfo_();
    startTimer_();
  }

  window.stopSudokuGame = function () {
    gameActive_ = false;
    clearGameTimers_();
    stopTimer_();
    stopGameAudio_();
  };

  window.startSudokuGame = function () {
    clearGameTimers_();
    gameActive_ = true;
    stopTimer_();
    renderShell_();
    newGame_(sudokuState.level || 'l1');
  };

  window.sudokuChooseLevel = function (level) {
    if (!SUDOKU_LEVELS[level]) return;
    newGame_(level);
  };

  window.sudokuNewGame = function () {
    newGame_(sudokuState.level);
  };

  window.sudokuResetCurrent = function () {
    sudokuState.board = sudokuState.puzzle.map(row => row.slice());
    sudokuState.selected = null;
    sudokuState.errors = 0;
    sudokuState.hints = 0;
    sudokuState.seconds = 0;
    sudokuState.finished = false;
    renderBoard_();
    updateInfo_();
    startTimer_();
  };

  window.sudokuSelectCell = function (r, c) {
    if (sudokuState.finished) return;
    sudokuState.selected = { r, c };
    refreshHighlights_();
  };

  window.sudokuPutNumber = function (n) {
    if (sudokuState.finished || !sudokuState.selected) return;
    const { r, c } = sudokuState.selected;
    if (sudokuState.fixed[r][c]) return;

    if (Number(n) !== sudokuState.solution[r][c]) {
      sudokuState.errors++;
      updateInfo_();
      flashWrong_(r, c);
      if (typeof speakVietnamese === 'function' && sudokuState.errors <= 2) speakVietnamese('Số này chưa phù hợp. Con thử nhìn lại hàng, cột và ô nhỏ nhé!', 0.9);
      return;
    }

    sudokuState.board[r][c] = Number(n);
    const el = document.getElementById(cellId_(r, c));
    if (el) {
      el.textContent = String(n);
      el.setAttribute('aria-label', `Hàng ${r + 1}, cột ${c + 1}, số ${n}`);
    }
    refreshHighlights_();
    updateProgress_();
    finishIfNeeded_();
  };

  window.sudokuClearCell = function () {
    if (sudokuState.finished || !sudokuState.selected) return;
    const { r, c } = sudokuState.selected;
    if (sudokuState.fixed[r][c]) return;
    sudokuState.board[r][c] = 0;
    const el = document.getElementById(cellId_(r, c));
    if (el) el.textContent = '';
    refreshHighlights_();
    updateProgress_();
  };

  window.sudokuHint = function () {
    if (sudokuState.finished) return;
    const cfg = sudokuState.config;
    let candidates = [];
    for (let r = 0; r < cfg.size; r++) {
      for (let c = 0; c < cfg.size; c++) {
        if (!sudokuState.fixed[r][c] && sudokuState.board[r][c] !== sudokuState.solution[r][c]) candidates.push({ r, c });
      }
    }
    if (!candidates.length) return;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    sudokuState.board[pick.r][pick.c] = sudokuState.solution[pick.r][pick.c];
    sudokuState.hints++;
    sudokuState.selected = pick;
    const el = document.getElementById(cellId_(pick.r, pick.c));
    if (el) {
      el.textContent = String(sudokuState.board[pick.r][pick.c]);
      el.classList.add('is-hint');
      later_(() => el.classList.remove('is-hint'), 600);
    }
    updateInfo_();
    refreshHighlights_();
    updateProgress_();
    if (typeof speakVietnamese === 'function') speakVietnamese(`Cô gợi ý số ${sudokuState.board[pick.r][pick.c]} ở ô này nhé!`, 0.9);
    finishIfNeeded_();
  };

  window.sudokuSpeakRules = function () {
    if (typeof speakVietnamese !== 'function') return;
    const cfg = sudokuState.config;
    const text = cfg.size === 4
      ? 'Luật chơi Sudoku. Con điền các số từ 1 đến 4. Mỗi hàng, mỗi cột và mỗi ô vuông 2 nhân 2 phải có đủ các số từ 1 đến 4 và không được lặp số.'
      : (cfg.size === 6
          ? 'Luật chơi Sudoku. Con điền các số từ 1 đến 6. Mỗi hàng, mỗi cột và mỗi ô 2 nhân 3 phải có đủ các số từ 1 đến 6 và không được lặp số.'
          : 'Luật chơi Sudoku. Con điền các số từ 1 đến 9. Mỗi hàng, mỗi cột và mỗi ô vuông 3 nhân 3 phải có đủ các số từ 1 đến 9 và không được lặp số.');
    speakVietnamese(text, 0.9);
  };
})();
