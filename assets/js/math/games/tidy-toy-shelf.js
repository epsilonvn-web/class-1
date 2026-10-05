(() => {
  'use strict';

  const GAME_ID = 'tidy-toy-shelf';
  const rootId = 'game-play-container';

  function imageSrc_(imageId) {
    return typeof window.resolveClass1MathImageSrc === 'function' ? window.resolveClass1MathImageSrc(imageId) : '';
  }

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

  const BG_TOYS = imageSrc_('ke_do_choi_nhieu_ngan');
  const BG_BOOKS = imageSrc_('ke_sach_10_ngan');

  const TYPES = {
    ball:   { name: 'bóng',   label: 'Bóng',   color: '#38bdf8' },
    car:    { name: 'ô tô',   label: 'Ô tô',   color: '#fb7185' },
    bear:   { name: 'gấu',    label: 'Gấu',    color: '#f59e0b' },
    blocks: { name: 'khối',   label: 'Khối',   color: '#a78bfa' },
    book:   { name: 'sách',   label: 'Sách',   color: '#34d399' },
    doll:   { name: 'búp bê', label: 'Búp bê', color: '#f472b6' }
  };
  const COLORS = ['#38bdf8', '#fb7185', '#f59e0b', '#a78bfa', '#34d399', '#f472b6', '#22c55e', '#f97316'];

  const LEVELS = [
    { title: 'Cấp 1 · Đúng loại', short: 'Đúng loại', skill: 'Phân loại', mode: 'sort' },
    { title: 'Cấp 2 · Đúng ngăn', short: 'Đúng ngăn', skill: 'Vị trí', mode: 'position' },
    { title: 'Cấp 3 · Đúng số lượng', short: 'Đúng số lượng', skill: 'Đếm', mode: 'count' },
    { title: 'Cấp 4 · Thêm hoặc bớt', short: 'Thêm / bớt', skill: 'Điều chỉnh số lượng', mode: 'adjust' },
    { title: 'Cấp 5 · Làm cho bằng nhau', short: 'Bằng nhau', skill: 'So sánh', mode: 'equalize' },
    { title: 'Cấp 6 · Hai điều kiện', short: 'Hai điều kiện', skill: 'Phân loại + số lượng', mode: 'multi' }
  ];

  const state = {
    level: 1,
    round: 0,
    wins: 0,
    selectedBankId: null,
    bins: [],
    bank: [],
    message: '',
    solved: false,
    hintBinId: null,
    wiggleBinId: null
  };

  function uid(prefix = 'i') {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function makeItem(type, colorIndex = 0) {
    return { id: uid(type), type, color: COLORS[colorIndex % COLORS.length] };
  }

  function toySvg(type, color = '#60a5fa') {
    const dark = '#17345c';
    if (type === 'ball') {
      return `<svg viewBox="0 0 100 100" class="gm7-toy-svg" aria-hidden="true">
        <circle cx="50" cy="50" r="37" fill="${color}" stroke="${dark}" stroke-width="4"/>
        <path d="M21 41c17 1 34 10 49 28M36 17c5 22 3 44-8 62M78 25c-16 10-27 28-31 53" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".88"/>
      </svg>`;
    }
    if (type === 'car') {
      return `<svg viewBox="0 0 120 90" class="gm7-toy-svg" aria-hidden="true">
        <rect x="18" y="39" width="84" height="30" rx="10" fill="${color}" stroke="${dark}" stroke-width="4"/>
        <path d="M36 39l12-18h31l15 18" fill="${color}" stroke="${dark}" stroke-width="4" stroke-linejoin="round"/>
        <rect x="51" y="25" width="23" height="14" rx="3" fill="#dbeafe" stroke="${dark}" stroke-width="3"/>
        <circle cx="37" cy="70" r="10" fill="#334155"/><circle cx="85" cy="70" r="10" fill="#334155"/>
        <circle cx="37" cy="70" r="4" fill="#cbd5e1"/><circle cx="85" cy="70" r="4" fill="#cbd5e1"/>
      </svg>`;
    }
    if (type === 'bear') {
      return `<svg viewBox="0 0 100 110" class="gm7-toy-svg" aria-hidden="true">
        <circle cx="25" cy="28" r="14" fill="${color}" stroke="${dark}" stroke-width="4"/><circle cx="75" cy="28" r="14" fill="${color}" stroke="${dark}" stroke-width="4"/>
        <circle cx="50" cy="48" r="30" fill="${color}" stroke="${dark}" stroke-width="4"/>
        <ellipse cx="50" cy="86" rx="29" ry="20" fill="${color}" stroke="${dark}" stroke-width="4"/>
        <circle cx="40" cy="45" r="3.5" fill="${dark}"/><circle cx="60" cy="45" r="3.5" fill="${dark}"/>
        <ellipse cx="50" cy="56" rx="9" ry="7" fill="#fff4df"/><circle cx="50" cy="55" r="3" fill="${dark}"/>
      </svg>`;
    }
    if (type === 'blocks') {
      return `<svg viewBox="0 0 110 100" class="gm7-toy-svg" aria-hidden="true">
        <rect x="10" y="50" width="38" height="38" rx="6" fill="${color}" stroke="${dark}" stroke-width="4"/>
        <rect x="58" y="50" width="38" height="38" rx="6" fill="#facc15" stroke="${dark}" stroke-width="4"/>
        <rect x="34" y="10" width="38" height="38" rx="6" fill="#34d399" stroke="${dark}" stroke-width="4"/>
      </svg>`;
    }
    if (type === 'book') {
      return `<svg viewBox="0 0 110 100" class="gm7-toy-svg" aria-hidden="true">
        <path d="M15 18h34c8 0 12 5 12 12v55c-4-5-9-7-16-7H15z" fill="${color}" stroke="${dark}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M95 18H61v67c4-5 9-7 16-7h18z" fill="#fef3c7" stroke="${dark}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M61 30v55" stroke="${dark}" stroke-width="4"/>
      </svg>`;
    }
    return `<svg viewBox="0 0 100 110" class="gm7-toy-svg" aria-hidden="true">
      <circle cx="50" cy="28" r="18" fill="#fde68a" stroke="${dark}" stroke-width="4"/>
      <path d="M31 25c4-18 34-20 39 1-13-6-27-7-39-1z" fill="${color}" stroke="${dark}" stroke-width="4"/>
      <path d="M31 55h38l10 40H21z" fill="${color}" stroke="${dark}" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="44" cy="27" r="2.5" fill="${dark}"/><circle cx="56" cy="27" r="2.5" fill="${dark}"/>
      <path d="M45 36q5 5 10 0" fill="none" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  }

  function binTemplate(id, pos, targetType, goalCount = null, items = [], extra = {}) {
    return { id, pos, targetType, goalCount, items, ...extra };
  }

  function nextVariant(offset = 0) {
    return (state.round + offset) % 4;
  }

  function buildLevel(level) {
    state.level = level;
    state.selectedBankId = null;
    state.solved = false;
    state.hintBinId = null;
    state.wiggleBinId = null;
    state.bank = [];
    state.bins = [];
    const v = nextVariant(level);

    if (level === 1) {
      const types = ['ball', 'car', 'bear', 'blocks'];
      state.bins = types.map((t, i) => binTemplate(`b${i}`, i, t, null));
      types.forEach((t, i) => {
        state.bank.push(makeItem(t, i), makeItem(t, i + 4));
      });
      state.bank.sort((a, b) => a.id.localeCompare(b.id));
      state.message = 'Con xếp từng món đồ chơi về đúng ngăn có biểu tượng giống nó nhé.';
    } else if (level === 2) {
      const layouts = [
        ['ball', 'car', 'bear', 'blocks'],
        ['bear', 'ball', 'blocks', 'car'],
        ['blocks', 'bear', 'car', 'ball'],
        ['car', 'blocks', 'ball', 'bear']
      ];
      const types = layouts[v];
      state.bins = types.map((t, i) => binTemplate(`b${i}`, i, t, 1));
      types.forEach((t, i) => state.bank.push(makeItem(t, i + v)));
      state.bank.push(makeItem(types[0], 6), makeItem(types[2], 7));
      state.message = 'Con nhìn vị trí từng ngăn rồi đặt đúng món đồ chơi vào đúng chỗ nhé.';
    } else if (level === 3) {
      const types = ['ball', 'car', 'bear', 'blocks'];
      const goalsList = [[2, 3, 1, 2], [3, 1, 2, 3], [1, 2, 3, 2], [2, 1, 3, 1]];
      const goals = goalsList[v];
      state.bins = types.map((t, i) => binTemplate(`b${i}`, i, t, goals[i]));
      types.forEach((t, i) => {
        for (let k = 0; k < goals[i] + 1; k++) state.bank.push(makeItem(t, i + k));
      });
      state.message = 'Mỗi ngăn có một số mục tiêu. Con xếp đúng loại và đúng số lượng nhé.';
    } else if (level === 4) {
      const targets = [3, 2, 4, 2];
      const startsByVariant = [
        [1, 4, 3, 3],
        [4, 1, 2, 3],
        [2, 4, 5, 1],
        [5, 1, 3, 4]
      ];
      const types = ['ball', 'car', 'bear', 'blocks'];
      const starts = startsByVariant[v];
      state.bins = types.map((t, i) => {
        const items = [];
        for (let k = 0; k < starts[i]; k++) items.push(makeItem(t, i + k));
        return binTemplate(`b${i}`, i, t, targets[i], items);
      });
      types.forEach((t, i) => {
        const shortage = Math.max(0, targets[i] - starts[i]);
        for (let k = 0; k < shortage + 1; k++) state.bank.push(makeItem(t, i + k + 3));
      });
      state.message = 'Có ngăn đang thiếu, có ngăn đang thừa. Con thêm hoặc chạm vào đồ trong ngăn để lấy bớt ra.';
    } else if (level === 5) {
      const typeChoices = ['ball', 'bear', 'car', 'blocks'];
      const t = typeChoices[v];
      const starts = [[5, 3], [2, 6], [6, 4], [3, 5]][v];
      state.bins = [
        binTemplate('a', 0, t, null, Array.from({ length: starts[0] }, (_, k) => makeItem(t, k))),
        binTemplate('b', 1, t, null, Array.from({ length: starts[1] }, (_, k) => makeItem(t, k + 4)))
      ];
      state.message = 'Hai ngăn chưa bằng nhau. Con chuyển đồ chơi để hai ngăn có số lượng bằng nhau nhé.';
    } else {
      const types = ['ball', 'car', 'bear', 'blocks', 'book', 'doll'];
      const goalSets = [
        [2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2],
        [2, 2, 1, 1, 2, 1],
        [1, 2, 2, 1, 1, 2]
      ];
      const goals = goalSets[v];
      state.bins = types.map((t, i) => binTemplate(`b${i}`, i, t, goals[i]));
      types.forEach((t, i) => {
        for (let k = 0; k < goals[i]; k++) state.bank.push(makeItem(t, i + k));
      });
      state.bank.push(makeItem(types[(v + 1) % types.length], 7), makeItem(types[(v + 4) % types.length], 6));
      state.message = 'Mỗi ngăn có hai điều kiện: đúng loại đồ chơi và đúng số lượng. Con hoàn thành cả hai nhé.';
    }
    render();
  }

  function positionName(index, total = 4) {
    if (total === 2) return index === 0 ? 'Ngăn bên trái' : 'Ngăn bên phải';
    const names4 = ['Trên trái', 'Trên phải', 'Dưới trái', 'Dưới phải'];
    const names6 = ['Trên trái', 'Trên giữa', 'Trên phải', 'Dưới trái', 'Dưới giữa', 'Dưới phải'];
    return total >= 6 ? names6[index] : names4[index] || `Ngăn ${index + 1}`;
  }

  function renderLevels() {
    return LEVELS.map((l, i) => `<button class="gm7-level-btn ${state.level === i + 1 ? 'is-active' : ''}" onclick="tidyToyShelfSetLevel(${i + 1})">
      <span>${i + 1}</span><b>${l.short}</b>
    </button>`).join('');
  }

  function renderBin(bin, index) {
    const level = LEVELS[state.level - 1];
    const t = TYPES[bin.targetType];
    const showGoal = bin.goalCount !== null && state.level !== 2;
    const showPosition = state.level === 2;
    const count = bin.items.length;
    const done = level.mode === 'equalize' ? false : (bin.goalCount === null ? true : count === bin.goalCount);
    const classes = [
      'gm7-bin',
      state.hintBinId === bin.id ? 'is-hint' : '',
      state.wiggleBinId === bin.id ? 'is-wrong' : '',
      done && state.solved ? 'is-done' : ''
    ].filter(Boolean).join(' ');
    const total = state.bins.length;
    return `<button class="${classes}" data-bin-id="${bin.id}" onclick="tidyToyShelfPlace('${bin.id}')" ondragover="event.preventDefault()" ondrop="tidyToyShelfDrop(event,'${bin.id}')" aria-label="${positionName(index, total)} ${t.label}">
      <div class="gm7-bin-head">
        <div class="gm7-bin-title">${toySvg(bin.targetType, t.color)}<span>${t.label}</span></div>
        ${showGoal ? `<div class="gm7-goal"><small>Mục tiêu</small><b>${bin.goalCount}</b></div>` : ''}
      </div>
      ${showPosition ? `<div class="gm7-position-tag">📍 ${positionName(index, total)}</div>` : ''}
      <div class="gm7-bin-items">
        ${bin.items.length ? bin.items.map(item => `<span class="gm7-placed-toy" onclick="event.stopPropagation(); tidyToyShelfRemove('${bin.id}','${item.id}')" title="Chạm để lấy ra">${toySvg(item.type, item.color)}</span>`).join('') : '<span class="gm7-empty">Đặt đồ chơi vào đây</span>'}
      </div>
      <div class="gm7-count-pill">Có <b>${count}</b>${showGoal ? ` / ${bin.goalCount}` : ''}</div>
    </button>`;
  }

  function renderShelf() {
    const level = LEVELS[state.level - 1];
    const bg = state.level >= 5 ? BG_BOOKS : BG_TOYS;
    const cols = state.bins.length === 2 ? 2 : (state.bins.length >= 6 ? 3 : 2);
    return `<div class="gm7-scene ${state.solved ? 'is-solved' : ''}" style="--gm7-bg:url('${bg}')">
      <div class="gm7-scene-overlay"></div>
      <div class="gm7-workbench-label">KỆ ĐỒ CHƠI EPSILON</div>
      <div class="gm7-shelf" style="--cols:${cols}">
        ${state.bins.map((b, i) => renderBin(b, i)).join('')}
      </div>
      <div class="gm7-rabbit">🐰</div>
      ${state.solved ? '<div class="gm7-success-world"><span>✨</span><b>Ngăn nắp rồi!</b><span>✨</span></div>' : ''}
      <div class="gm7-floor"></div>
    </div>`;
  }

  function renderBank() {
    if (state.level === 5 && state.bank.length === 0) {
      return `<div class="gm7-bank-wrap"><div class="gm7-bank-head"><span>🧺 Khay chuyển đồ</span><small>Chạm một món trong ngăn để lấy ra, rồi đặt sang ngăn còn lại.</small></div><div class="gm7-bank gm7-bank-empty">Khay đang trống</div></div>`;
    }
    return `<div class="gm7-bank-wrap">
      <div class="gm7-bank-head"><span>🧸 Kho đồ chơi</span><small>Chạm món → chạm ngăn · hoặc kéo thả</small></div>
      <div class="gm7-bank">
        ${state.bank.length ? state.bank.map(item => {
          const sel = state.selectedBankId === item.id ? 'is-selected' : '';
          return `<button class="gm7-toy-card ${sel}" draggable="true" ondragstart="tidyToyShelfDrag(event,'${item.id}')" onclick="tidyToyShelfSelect('${item.id}')">
            <div class="gm7-toy-visual">${toySvg(item.type, item.color)}</div>
            <b>${TYPES[item.type].label}</b>
          </button>`;
        }).join('') : '<div class="gm7-bank-empty">Không còn đồ chơi trong kho.</div>'}
      </div>
    </div>`;
  }

  function progressInfo() {
    if (state.level === 5) {
      const a = state.bins[0]?.items.length || 0;
      const b = state.bins[1]?.items.length || 0;
      return { text: `${a} và ${b}`, pct: a === b && state.bank.length === 0 ? 100 : Math.max(18, 100 - Math.min(80, Math.abs(a - b) * 18)) };
    }
    let done = 0;
    let total = 0;
    for (const bin of state.bins) {
      if (bin.goalCount === null) {
        total += 1;
        if (bin.items.every(i => i.type === bin.targetType) && bin.items.length > 0) done += 1;
      } else {
        total += 1;
        if (bin.items.length === bin.goalCount && bin.items.every(i => i.type === bin.targetType)) done += 1;
      }
    }
    if (state.level === 1) {
      const placed = state.bins.reduce((s, b) => s + b.items.length, 0);
      const all = placed + state.bank.length;
      return { text: `${placed} / ${all}`, pct: all ? (placed / all) * 100 : 100 };
    }
    return { text: `${done} / ${total}`, pct: total ? (done / total) * 100 : 0 };
  }

  function renderPanel() {
    const cfg = LEVELS[state.level - 1];
    const p = progressInfo();
    let mission = state.message;
    if (state.level === 5) mission = 'Chuyển đồ chơi để hai ngăn có số lượng bằng nhau.';
    return `<aside class="gm7-panel">
      <div class="gm7-panel-top">
        <div class="gm7-level-title">${cfg.title}</div>
        <div class="gm7-skill-pill">🎯 ${cfg.skill}</div>
      </div>
      <div class="gm7-teacher"><span>🐰</span><div><b>Cô Thỏ Hồng:</b><br>${mission}</div></div>
      <div class="gm7-progress">
        <div><span>${state.level === 5 ? 'Hai ngăn' : 'Tiến độ'}</span><b>${p.text}</b></div>
        <div class="gm7-progress-bar"><i style="width:${Math.max(0, Math.min(100, p.pct))}%"></i></div>
      </div>
      <div class="gm7-feedback ${state.solved ? 'is-success' : ''}" id="gm7-feedback">${state.solved ? 'Tuyệt lắm! Con đã sắp xếp chính xác và rất ngăn nắp.' : panelHelpText()}</div>
      <div class="gm7-actions">
        <button class="gm7-btn secondary" onclick="tidyToyShelfHint()">💡 Gợi ý</button>
        <button class="gm7-btn secondary" onclick="tidyToyShelfReset()">🔄 Làm lại</button>
      </div>
      <button class="gm7-btn primary" onclick="tidyToyShelfCheck()">✅ Kiểm tra</button>
      ${state.solved ? '<button class="gm7-btn next" onclick="tidyToyShelfNextRound()">🌟 Lượt mới</button>' : ''}
    </aside>`;
  }

  function panelHelpText() {
    if (state.level === 1) return 'Con chọn một món ở kho rồi chạm vào ngăn có cùng loại đồ chơi.';
    if (state.level === 2) return 'Con nhìn cả loại đồ chơi và vị trí của ngăn trước khi đặt.';
    if (state.level === 3) return 'Dừng lại khi số đồ chơi trong ngăn bằng đúng số mục tiêu.';
    if (state.level === 4) return 'Ngăn thừa thì chạm món đồ để lấy ra; ngăn thiếu thì lấy thêm từ kho.';
    if (state.level === 5) return 'Con so sánh hai bên rồi chuyển từng món cho tới khi hai số bằng nhau.';
    return 'Mỗi ngăn phải đúng loại và đúng số lượng cùng lúc.';
  }

  function styles() {
    return `<style id="gm7-styles">
      .gm7-app{font-family:'Quicksand','Nunito',sans-serif;color:#334155}.gm7-app *{box-sizing:border-box}
      .gm7-topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:10px}.gm7-kicker{font-size:14px;font-weight:1000;color:#0f766e;letter-spacing:.05em}.gm7-topbar h3{margin:3px 0 2px;font-size:23px;line-height:1.08;font-weight:1000;color:#155e75}.gm7-topbar p{margin:0;font-size:16px;line-height:1.35;font-weight:800;color:#64748b}.gm7-listen{border:1px solid #99f6e4;background:#f0fdfa;color:#0f766e;border-radius:14px;padding:10px 14px;font-size:16px;font-weight:1000;white-space:nowrap}
      .gm7-levels{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;margin-bottom:10px}.gm7-level-btn{min-height:66px;border:1px solid #dbeafe;background:#fff;border-radius:15px;padding:8px 6px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#52647e;box-shadow:0 2px 8px rgba(30,64,175,.05);transition:.16s}.gm7-level-btn span{width:26px;height:26px;border-radius:999px;background:#ecfeff;display:flex;align-items:center;justify-content:center;font-weight:1000;font-size:14px;color:#0f766e}.gm7-level-btn b{font-size:15px;line-height:1.14}.gm7-level-btn:hover{transform:translateY(-1px);border-color:#5eead4}.gm7-level-btn.is-active{background:linear-gradient(135deg,#14b8a6,#0ea5e9);border-color:#0ea5e9;color:#fff;box-shadow:0 6px 15px rgba(14,165,233,.22)}.gm7-level-btn.is-active span{background:#fff;color:#0f766e}
      .gm7-main{display:grid;grid-template-columns:minmax(0,2.15fr) minmax(285px,.9fr);gap:12px;align-items:start}.gm7-left{min-width:0}
      .gm7-scene{position:relative;width:100%;aspect-ratio:16/9;min-height:390px;overflow:hidden;border:1px solid #bae6fd;border-radius:26px;background-image:linear-gradient(rgba(239,246,255,.13),rgba(240,253,250,.2)),var(--gm7-bg);background-size:cover;background-position:center;box-shadow:0 10px 28px rgba(14,116,144,.10)}.gm7-scene-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.18),rgba(255,255,255,.10));backdrop-filter:blur(1.3px)}.gm7-floor{position:absolute;left:0;right:0;bottom:0;height:15%;background:linear-gradient(rgba(255,255,255,.2),rgba(148,88,45,.25));border-top:4px solid rgba(120,72,35,.28)}.gm7-workbench-label{position:absolute;z-index:7;left:50%;top:4%;transform:translateX(-50%);background:rgba(255,255,255,.95);border:1px solid #99f6e4;color:#0f766e;border-radius:999px;padding:7px 16px;font-size:16px;font-weight:1000;box-shadow:0 5px 14px rgba(15,118,110,.13);white-space:nowrap}
      .gm7-shelf{position:absolute;z-index:5;left:7%;right:7%;top:14%;bottom:16%;display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));grid-auto-rows:1fr;gap:10px;padding:12px;background:linear-gradient(135deg,#d6a36a,#b87942);border:8px solid #8f5c32;border-radius:24px;box-shadow:0 18px 35px rgba(73,42,23,.23),inset 0 0 0 4px rgba(255,255,255,.18)}
      .gm7-bin{position:relative;min-width:0;min-height:0;border:2px solid #a86e3d;border-radius:18px;background:linear-gradient(180deg,rgba(255,248,232,.95),rgba(250,235,209,.94));padding:9px;overflow:hidden;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;box-shadow:inset 0 4px 15px rgba(87,54,31,.12);transition:.18s}.gm7-bin:hover{transform:translateY(-2px);border-color:#0ea5e9}.gm7-bin.is-hint{box-shadow:0 0 0 5px rgba(250,204,21,.55),0 0 22px rgba(250,204,21,.68),inset 0 4px 15px rgba(87,54,31,.12);animation:gm7hint 1s ease-in-out infinite}.gm7-bin.is-wrong{animation:gm7shake .32s}.gm7-bin.is-done{border-color:#22c55e}.gm7-bin-head{display:flex;align-items:center;justify-content:space-between;gap:6px}.gm7-bin-title{display:flex;align-items:center;gap:6px;min-width:0;color:#6b4425;font-size:16px;font-weight:1000}.gm7-bin-title .gm7-toy-svg{width:30px;height:30px;flex:0 0 30px}.gm7-bin-title span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gm7-goal{display:flex;align-items:center;gap:5px;border-radius:999px;background:#fff7ed;border:1px solid #fdba74;padding:3px 7px;color:#9a3412}.gm7-goal small{font-size:13px;font-weight:900}.gm7-goal b{font-size:20px}.gm7-position-tag{margin-top:4px;align-self:flex-start;border-radius:999px;background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;padding:3px 7px;font-size:14px;font-weight:1000}.gm7-bin-items{flex:1;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:4px;padding:4px 0;min-height:56px}.gm7-placed-toy{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.72);border:1px solid rgba(148,163,184,.3);display:inline-flex;align-items:center;justify-content:center;padding:2px;cursor:pointer;transition:.12s}.gm7-placed-toy:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 4px 10px rgba(51,65,85,.13)}.gm7-placed-toy .gm7-toy-svg{width:100%;height:100%}.gm7-empty{align-self:center;margin:auto;color:#a16207;font-size:14px;font-weight:900;opacity:.72}.gm7-count-pill{align-self:center;border-radius:999px;background:#fff;border:1px solid #e2e8f0;padding:3px 8px;font-size:14px;font-weight:900;color:#475569}.gm7-count-pill b{font-size:17px;color:#0f766e}.gm7-rabbit{position:absolute;z-index:8;right:2.5%;bottom:7%;font-size:48px;filter:drop-shadow(0 4px 5px rgba(0,0,0,.18));transition:.8s}.gm7-scene.is-solved .gm7-rabbit{transform:translateY(-10px) rotate(-10deg)}.gm7-success-world{position:absolute;z-index:20;left:50%;top:49%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:10px;border:2px solid #facc15;background:rgba(255,255,255,.96);border-radius:22px;padding:14px 22px;font-size:21px;font-weight:1000;color:#0f766e;box-shadow:0 12px 30px rgba(15,118,110,.20);animation:gm7pop .45s ease-out}.gm7-success-world span{animation:gm7spark 1s ease-in-out infinite alternate}
      .gm7-bank-wrap{margin-top:9px;background:linear-gradient(180deg,#f8fbff,#fff);border:1px solid #bae6fd;border-radius:20px;padding:10px 12px 12px}.gm7-bank-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px;color:#155e75}.gm7-bank-head span{font-size:17px;font-weight:1000}.gm7-bank-head small{font-size:14px;font-weight:800;color:#64748b}.gm7-bank{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 6px;min-height:116px;align-items:stretch}.gm7-bank-empty{display:flex;align-items:center;justify-content:center;width:100%;min-height:86px;border:2px dashed #cbd5e1;border-radius:16px;color:#94a3b8;font-size:16px;font-weight:900}.gm7-toy-card{flex:0 0 104px;min-height:104px;border:1px solid #dbeafe;background:linear-gradient(180deg,#fff,#f8fafc);border-radius:17px;padding:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;box-shadow:0 3px 9px rgba(24,61,105,.07);transition:.14s;cursor:grab}.gm7-toy-card:hover{transform:translateY(-2px);border-color:#38bdf8}.gm7-toy-card.is-selected{border-color:#0ea5e9;box-shadow:0 0 0 4px rgba(14,165,233,.17),0 5px 14px rgba(24,61,105,.12);transform:translateY(-2px)}.gm7-toy-visual{width:62px;height:62px}.gm7-toy-visual .gm7-toy-svg{width:100%;height:100%}.gm7-toy-card b{font-size:15px;color:#31527f}
      .gm7-panel{background:linear-gradient(180deg,#fff,#f8fdff);border:1px solid #bae6fd;border-radius:22px;padding:15px;box-shadow:0 8px 20px rgba(14,116,144,.08);min-height:370px}.gm7-panel-top{display:flex;flex-direction:column;gap:8px}.gm7-level-title{font-size:18px;font-weight:1000;color:#155e75}.gm7-skill-pill{align-self:flex-start;background:#ecfeff;border:1px solid #99f6e4;color:#0f766e;border-radius:999px;padding:6px 10px;font-size:16px;font-weight:1000}.gm7-teacher{margin-top:10px;border:1px solid #fbcfe8;background:linear-gradient(135deg,#fff1f7,#fff);border-radius:16px;padding:12px;display:flex;gap:10px;font-size:16px;line-height:1.48;font-weight:800;color:#475569}.gm7-teacher>span{font-size:28px}.gm7-teacher b{color:#be185d}.gm7-progress{margin-top:12px}.gm7-progress>div:first-child{display:flex;justify-content:space-between;align-items:center;font-size:16px;font-weight:1000;color:#60728b}.gm7-progress>div:first-child b{font-size:19px;color:#0284c7}.gm7-progress-bar{height:10px;border-radius:999px;background:#e8eef8;overflow:hidden;margin-top:6px}.gm7-progress-bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#2dd4bf,#38bdf8);transition:.3s}.gm7-feedback{margin-top:12px;min-height:82px;border-radius:16px;border:1px solid #bae6fd;background:#f0f9ff;padding:12px 13px;font-size:16px;line-height:1.5;font-weight:900;color:#31527f}.gm7-feedback.is-success{border-color:#86efac;background:#ecfdf5;color:#166534}.gm7-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.gm7-btn{border:0;border-radius:13px;padding:11px 10px;font-size:16px;font-weight:1000;transition:.14s}.gm7-btn.secondary{background:#f4f6fa;color:#52637d;border:1px solid #dbe2ec}.gm7-btn.secondary:hover{background:#ebf1f8}.gm7-btn.primary{width:100%;margin-top:9px;background:linear-gradient(135deg,#14b8a6,#0ea5e9);color:#fff;font-size:18px;padding:13px;box-shadow:0 6px 14px rgba(14,165,233,.20)}.gm7-btn.next{width:100%;margin-top:8px;background:linear-gradient(135deg,#f59e0b,#f97316);color:#fff;font-size:17px;padding:11px;box-shadow:0 5px 12px rgba(249,115,22,.19)}
      @keyframes gm7hint{50%{transform:scale(1.02)}}@keyframes gm7shake{20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}@keyframes gm7pop{0%{transform:translate(-50%,-50%) scale(.72);opacity:.1}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}@keyframes gm7spark{to{transform:scale(1.25) rotate(8deg)}}
      @media(max-width:900px){.gm7-main{grid-template-columns:1fr}.gm7-panel{min-height:0}.gm7-scene{min-height:360px}}
      @media(max-width:700px){.gm7-levels{grid-template-columns:repeat(3,1fr)}.gm7-level-btn{min-height:58px}.gm7-level-btn b{font-size:13px}.gm7-topbar{align-items:flex-start}.gm7-topbar h3{font-size:20px}.gm7-topbar p{font-size:14px}.gm7-listen{font-size:14px;padding:8px 10px}.gm7-scene{min-height:330px;border-radius:18px}.gm7-shelf{left:4%;right:4%;top:15%;bottom:14%;gap:6px;padding:7px;border-width:6px}.gm7-bin{padding:5px;border-width:3px}.gm7-bin-title{font-size:13px}.gm7-bin-title .gm7-toy-svg{width:24px;height:24px;flex-basis:24px}.gm7-goal small{display:none}.gm7-goal b{font-size:17px}.gm7-position-tag{font-size:11px}.gm7-placed-toy{width:34px;height:34px}.gm7-count-pill{font-size:12px}.gm7-workbench-label{font-size:12px;padding:5px 10px}.gm7-rabbit{font-size:38px}.gm7-bank-head small{display:none}.gm7-toy-card{flex-basis:88px;min-height:94px}.gm7-toy-visual{width:54px;height:54px}.gm7-toy-card b{font-size:13px}.gm7-teacher,.gm7-feedback,.gm7-btn,.gm7-skill-pill,.gm7-progress>div:first-child{font-size:14px}.gm7-btn.primary{font-size:16px}}
    </style>`;
  }

  function render() {
    const root = document.getElementById(rootId);
    if (!root) return;
    if (!document.getElementById('gm7-styles')) root.insertAdjacentHTML('beforebegin', styles());
    root.innerHTML = `<section class="gm7-app">
      <div class="gm7-topbar">
        <div><div class="gm7-kicker">🧸 GAME 7 · ĐẾM & PHÂN LOẠI</div><h3>Kệ đồ chơi ngăn nắp</h3><p>Chọn món → đặt đúng ngăn → đếm cho đủ → so sánh số lượng.</p></div>
        <button class="gm7-listen" onclick="tidyToyShelfSpeak()">🔊 Nghe cách chơi</button>
      </div>
      <div class="gm7-levels">${renderLevels()}</div>
      <div class="gm7-main">
        <div class="gm7-left">${renderShelf()}${renderBank()}</div>
        ${renderPanel()}
      </div>
    </section>`;
  }

  function findBankItem(id) {
    return state.bank.find(i => i.id === id) || null;
  }

  function findBin(id) {
    return state.bins.find(b => b.id === id) || null;
  }

  function setFeedback(text, success = false) {
    const el = document.getElementById('gm7-feedback');
    if (el) {
      el.textContent = text;
      el.classList.toggle('is-success', !!success);
    }
  }

  function flashBin(binId) {
    state.wiggleBinId = binId;
    render();
    later_(() => { state.wiggleBinId = null; render(); }, 360);
  }

  function tryPlace(itemId, binId) {
    if (state.solved) return;
    const item = findBankItem(itemId);
    const bin = findBin(binId);
    if (!item || !bin) return;

    if (item.type !== bin.targetType) {
      const want = TYPES[bin.targetType].label.toLowerCase();
      state.selectedBankId = itemId;
      state.message = `Món này chưa đúng ngăn. Ngăn đang chọn dành cho ${want}.`;
      flashBin(binId);
      return;
    }

    if (bin.goalCount !== null && bin.items.length >= bin.goalCount) {
      state.message = `Ngăn ${TYPES[bin.targetType].label.toLowerCase()} đã đủ ${bin.goalCount} món rồi. Con thử ngăn khác nhé.`;
      state.selectedBankId = itemId;
      flashBin(binId);
      return;
    }

    state.bank = state.bank.filter(i => i.id !== itemId);
    bin.items.push(item);
    state.selectedBankId = null;
    state.hintBinId = null;
    state.message = state.level === 5 ? 'Tốt rồi. Con tiếp tục so sánh hai ngăn nhé.' : 'Đúng ngăn rồi! Con tiếp tục nhé.';
    render();
  }

  function removePlaced(binId, itemId) {
    if (state.solved) return;
    const bin = findBin(binId);
    if (!bin) return;
    const idx = bin.items.findIndex(i => i.id === itemId);
    if (idx < 0) return;
    const [item] = bin.items.splice(idx, 1);
    state.bank.push(item);
    state.selectedBankId = item.id;
    state.hintBinId = null;
    state.message = state.level === 5 ? 'Món đồ đã ở khay chuyển. Bây giờ con đặt nó sang ngăn còn lại nhé.' : 'Con đã lấy một món ra. Nếu cần, hãy đặt nó vào ngăn khác.';
    render();
  }

  function evaluate() {
    if (state.level === 5) {
      const a = state.bins[0].items.length;
      const b = state.bins[1].items.length;
      if (state.bank.length > 0) return { ok: false, text: 'Trong khay vẫn còn đồ chơi. Con đặt hết đồ vào hai ngăn trước nhé.', bin: null };
      if (a === b) return { ok: true, text: `Hai ngăn đều có ${a} món. Bằng nhau rồi!`, bin: null };
      return { ok: false, text: `Một ngăn có ${a} món, ngăn kia có ${b} món. Con chuyển thêm để hai bên bằng nhau nhé.`, bin: a > b ? state.bins[0].id : state.bins[1].id };
    }

    for (const bin of state.bins) {
      if (bin.items.some(i => i.type !== bin.targetType)) return { ok: false, text: 'Có món đồ chưa đúng loại. Con nhìn biểu tượng trên từng ngăn nhé.', bin: bin.id };
      if (bin.goalCount !== null && bin.items.length !== bin.goalCount) {
        const diff = bin.goalCount - bin.items.length;
        if (diff > 0) return { ok: false, text: `Ngăn ${TYPES[bin.targetType].label.toLowerCase()} còn thiếu ${diff} món.`, bin: bin.id };
        return { ok: false, text: `Ngăn ${TYPES[bin.targetType].label.toLowerCase()} đang thừa ${Math.abs(diff)} món.`, bin: bin.id };
      }
    }
    if (state.level === 1 && state.bank.length > 0) return { ok: false, text: `Trong kho vẫn còn ${state.bank.length} món. Con xếp hết vào kệ nhé.`, bin: null };
    return { ok: true, text: 'Tất cả đồ chơi đã đúng ngăn và đúng số lượng!', bin: null };
  }

  window.tidyToyShelfSetLevel = function(level) {
    buildLevel(Math.max(1, Math.min(6, Number(level) || 1)));
  };

  window.tidyToyShelfSelect = function(itemId) {
    if (state.solved) return;
    state.selectedBankId = state.selectedBankId === itemId ? null : itemId;
    state.message = state.selectedBankId ? 'Đã chọn món đồ. Con chạm vào ngăn muốn đặt nhé.' : panelHelpText();
    render();
  };

  window.tidyToyShelfPlace = function(binId) {
    if (!state.selectedBankId) {
      state.hintBinId = binId;
      state.message = 'Con chọn một món đồ ở kho trước, rồi mới chạm vào ngăn nhé.';
      render();
      return;
    }
    tryPlace(state.selectedBankId, binId);
  };

  window.tidyToyShelfRemove = function(binId, itemId) {
    removePlaced(binId, itemId);
  };

  window.tidyToyShelfDrag = function(event, itemId) {
    if (!event?.dataTransfer) return;
    event.dataTransfer.setData('text/plain', itemId);
    event.dataTransfer.effectAllowed = 'move';
  };

  window.tidyToyShelfDrop = function(event, binId) {
    event.preventDefault();
    const itemId = event.dataTransfer?.getData('text/plain');
    if (itemId) tryPlace(itemId, binId);
  };

  window.tidyToyShelfHint = function() {
    if (state.solved) return;
    let target = null;
    if (state.level === 5) {
      const a = state.bins[0].items.length;
      const b = state.bins[1].items.length;
      if (a !== b) target = a > b ? state.bins[0] : state.bins[1];
      state.message = a === b ? 'Hai ngăn đã bằng nhau rồi. Con bấm Kiểm tra nhé.' : 'Ngăn đang sáng có nhiều đồ chơi hơn. Con chuyển bớt sang bên kia.';
    } else {
      target = state.bins.find(b => b.goalCount !== null && b.items.length !== b.goalCount) || state.bins.find(b => state.bank.some(i => i.type === b.targetType));
      if (target) {
        const need = target.goalCount === null ? 1 : Math.max(0, target.goalCount - target.items.length);
        state.message = target.goalCount === null ? `Con tìm món ${TYPES[target.targetType].label.toLowerCase()} và đặt vào ngăn đang sáng.` : (need > 0 ? `Ngăn đang sáng cần thêm ${need} ${TYPES[target.targetType].name}.` : `Ngăn đang sáng đang thừa đồ. Con chạm một món để lấy ra.`);
      }
    }
    state.hintBinId = target?.id || null;
    render();
  };

  window.tidyToyShelfCheck = function() {
    if (state.solved) return;
    const result = evaluate();
    if (!result.ok) {
      state.message = result.text;
      state.hintBinId = result.bin;
      if (result.bin) state.wiggleBinId = result.bin;
      render();
      if (result.bin) later_(() => { state.wiggleBinId = null; render(); }, 360);
      return;
    }
    state.solved = true;
    state.message = result.text;
    state.wins += 1;
    render();
    if (typeof speakVietnamese === 'function') later_(() => speakVietnamese(result.text, 0.9), 120);
    if (state.wins > 0 && state.wins % 10 === 0 && typeof rewardMiniGameStar_ === 'function') rewardMiniGameStar_('Bé đã hoàn thành 10 lượt Kệ đồ chơi ngăn nắp!');
  };

  window.tidyToyShelfReset = function() {
    buildLevel(state.level);
  };

  window.tidyToyShelfNextRound = function() {
    state.round += 1;
    buildLevel(state.level);
  };

  window.tidyToyShelfSpeak = function() {
    if (typeof speakVietnamese !== 'function') return;
    const cfg = LEVELS[state.level - 1];
    const text = `Game Kệ đồ chơi ngăn nắp. ${cfg.title}. ${panelHelpText()} Khi con thấy đã xong, hãy bấm Kiểm tra.`;
    speakVietnamese(text, 0.88);
  };

  window.stopTidyToyShelfGame = function() {
    gameActive_ = false;
    clearGameTimers_();
    stopGameAudio_();
    state.selectedBankId = null;
  };

  window.startTidyToyShelfGame = function() {
    clearGameTimers_();
    gameActive_ = true;
    state.round = 0;
    state.wins = 0;
    buildLevel(1);
  };
})();
