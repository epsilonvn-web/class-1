(() => {
  'use strict';

  const GAME_ID = 'compare-garden-pond';
  const ROOT_ID = 'game-play-container';

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

  const BG_POND = imageSrc_('ao_ca_hai_khu');
  const BG_GARDEN = imageSrc_('vuon_hoa_hai_luong');

  const LEVELS = [
    { title: 'Cấp 1 · Nhóm nhiều hơn', short: 'Nhiều hơn', skill: 'So sánh trực quan', mode: 'more' },
    { title: 'Cấp 2 · Nhóm ít hơn', short: 'Ít hơn', skill: 'So sánh trực quan', mode: 'less' },
    { title: 'Cấp 3 · Làm cho bằng nhau', short: 'Bằng nhau', skill: 'Ghép cặp · cân bằng', mode: 'equalize' },
    { title: 'Cấp 4 · Đặt dấu so sánh', short: 'Dấu > < =', skill: 'Ký hiệu so sánh', mode: 'symbol' },
    { title: 'Cấp 5 · Thêm hoặc bớt', short: 'Thêm / bớt', skill: 'Điều chỉnh số lượng', mode: 'adjust' },
    { title: 'Cấp 6 · Hơn kém bao nhiêu?', short: 'Hơn kém', skill: 'Hiệu hai nhóm', mode: 'difference' }
  ];

  const state = {
    level: 1,
    round: 0,
    wins: 0,
    scene: 'pond',
    left: [],
    right: [],
    selectedSide: null,
    selectedItem: null,
    selectedSymbol: null,
    selectedDifference: null,
    goalRelation: '=',
    goalDifference: 0,
    message: '',
    solved: false,
    paired: false,
    hintSide: null,
    wiggle: null
  };

  function uid(prefix = 'o') {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function item(kind, colorIndex = 0) {
    return { id: uid(kind), kind, colorIndex };
  }

  function sceneConfig() {
    return state.scene === 'pond'
      ? { bg: BG_POND, leftName: 'Ao bên trái', rightName: 'Ao bên phải', itemName: 'cá', emoji: '🐟' }
      : { bg: BG_GARDEN, leftName: 'Luống bên trái', rightName: 'Luống bên phải', itemName: 'hoa', emoji: '🌼' };
  }

  function makeItems(count, kind, offset = 0) {
    return Array.from({ length: count }, (_, i) => item(kind, i + offset));
  }

  function scenario(level, round) {
    const sets = {
      1: [[5, 3], [4, 7], [6, 2], [3, 5]],
      2: [[2, 5], [6, 3], [4, 7], [5, 2]],
      3: [[5, 3], [2, 6], [6, 4], [3, 7]],
      4: [[3, 6], [7, 4], [5, 5], [2, 6]],
      5: [[2, 5, '='], [6, 3, '='], [4, 6, '>'], [7, 5, '<']],
      6: [[7, 4], [3, 6], [8, 5], [4, 2]]
    };
    return sets[level][round % sets[level].length];
  }

  function buildLevel(level) {
    state.level = level;
    state.scene = ((state.round + level) % 2 === 0) ? 'pond' : 'garden';
    state.selectedSide = null;
    state.selectedItem = null;
    state.selectedSymbol = null;
    state.selectedDifference = null;
    state.solved = false;
    state.paired = false;
    state.hintSide = null;
    state.wiggle = null;

    const cfg = sceneConfig();
    const s = scenario(level, state.round);
    const kind = state.scene === 'pond' ? 'fish' : 'flower';
    state.left = makeItems(s[0], kind, 0);
    state.right = makeItems(s[1], kind, 4);

    if (level === 1) {
      state.message = `Con nhìn hai nhóm ${cfg.itemName}. Chạm vào ${cfg.leftName.toLowerCase()} hoặc ${cfg.rightName.toLowerCase()} có NHIỀU hơn nhé.`;
    } else if (level === 2) {
      state.message = `Con tìm nhóm có ÍT ${cfg.itemName} hơn rồi chạm vào nhóm đó.`;
    } else if (level === 3) {
      state.message = `Hai bên chưa bằng nhau. Con chuyển ${cfg.itemName} từ bên nhiều sang bên ít để hai bên BẰNG NHAU.`;
    } else if (level === 4) {
      state.message = 'Con nhìn số lượng hai bên trước. Sau đó đặt dấu >, < hoặc = vào giữa hai nhóm.';
    } else if (level === 5) {
      state.goalRelation = s[2];
      state.message = relationGoalText();
    } else {
      state.goalDifference = Math.abs(s[0] - s[1]);
      state.message = `Con ghép cặp để nhìn phần còn thừa, rồi chọn số cho biết hai nhóm hơn kém nhau bao nhiêu.`;
    }
    render();
  }

  function relationGoalText() {
    const cfg = sceneConfig();
    if (state.goalRelation === '=') return `Hãy thêm, bớt hoặc chuyển ${cfg.itemName} để hai bên BẰNG NHAU.`;
    if (state.goalRelation === '>') return `Hãy điều chỉnh để ${cfg.leftName.toLowerCase()} có NHIỀU ${cfg.itemName} hơn bên phải.`;
    return `Hãy điều chỉnh để ${cfg.leftName.toLowerCase()} có ÍT ${cfg.itemName} hơn bên phải.`;
  }

  function relation() {
    const l = state.left.length;
    const r = state.right.length;
    return l > r ? '>' : (l < r ? '<' : '=');
  }

  function fishSvg(colorIndex = 0) {
    const colors = ['#fb923c', '#facc15', '#38bdf8', '#f472b6', '#34d399', '#a78bfa'];
    const c = colors[colorIndex % colors.length];
    return `<svg viewBox="0 0 120 80" class="gm8-object-svg" aria-hidden="true">
      <ellipse cx="65" cy="40" rx="35" ry="24" fill="${c}" stroke="#17466b" stroke-width="4"/>
      <path d="M31 40L8 18v44z" fill="${c}" stroke="#17466b" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="82" cy="34" r="5" fill="#fff"/><circle cx="84" cy="34" r="2.5" fill="#17324d"/>
      <path d="M92 45q7 5 13 0" fill="none" stroke="#17324d" stroke-width="3" stroke-linecap="round"/>
      <path d="M61 19q7-12 15 0M59 61q8 10 16 0" fill="${c}" stroke="#17466b" stroke-width="3"/>
    </svg>`;
  }

  function flowerSvg(colorIndex = 0) {
    const colors = ['#ef4444', '#facc15', '#f472b6', '#60a5fa', '#fb923c', '#a78bfa'];
    const c = colors[colorIndex % colors.length];
    return `<svg viewBox="0 0 90 110" class="gm8-object-svg" aria-hidden="true">
      <path d="M45 50v45" stroke="#15803d" stroke-width="7" stroke-linecap="round"/>
      <path d="M45 75q-20-12-24 7 18 4 24-7M45 82q20-12 24 7-18 4-24-7" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
      <g transform="translate(45 39)">
        <circle cx="0" cy="-20" r="14" fill="${c}"/><circle cx="19" cy="-6" r="14" fill="${c}"/><circle cx="12" cy="17" r="14" fill="${c}"/><circle cx="-12" cy="17" r="14" fill="${c}"/><circle cx="-19" cy="-6" r="14" fill="${c}"/><circle cx="0" cy="0" r="13" fill="#7c4a16"/>
      </g>
    </svg>`;
  }

  function objectSvg(obj) {
    return obj.kind === 'fish' ? fishSvg(obj.colorIndex) : flowerSvg(obj.colorIndex);
  }

  function renderLevels() {
    return LEVELS.map((l, i) => `<button class="gm8-level-btn ${state.level === i + 1 ? 'is-active' : ''}" onclick="compareGardenPondSetLevel(${i + 1})"><span>${i + 1}</span><b>${l.short}</b></button>`).join('');
  }

  function sideTitle(side) {
    const cfg = sceneConfig();
    return side === 'left' ? cfg.leftName : cfg.rightName;
  }

  function renderObjects(side) {
    const arr = side === 'left' ? state.left : state.right;
    const pairCount = Math.min(state.left.length, state.right.length);
    return arr.map((obj, idx) => {
      const selected = state.selectedItem?.id === obj.id ? 'is-selected' : '';
      const paired = state.paired && idx < pairCount ? 'is-paired' : '';
      const leftover = state.paired && idx >= pairCount ? 'is-leftover' : '';
      const canMove = state.level === 3 || state.level === 5;
      return `<button class="gm8-object ${selected} ${paired} ${leftover}" onclick="compareGardenPondObject('${side}','${obj.id}')" ${canMove ? 'title="Chạm để chọn và chuyển"' : 'title="Vật trong nhóm"'}>${objectSvg(obj)}${paired ? '<i>✓</i>' : ''}</button>`;
    }).join('');
  }

  function renderSide(side) {
    const arr = side === 'left' ? state.left : state.right;
    const hint = state.hintSide === side ? 'is-hint' : '';
    const selected = state.selectedSide === side ? 'is-selected' : '';
    const wrong = state.wiggle === side ? 'is-wrong' : '';
    const actionLabel = state.level <= 2 ? `Chạm ${sideTitle(side)}` : 'Vùng nhóm';
    return `<button class="gm8-side ${side} ${hint} ${selected} ${wrong}" onclick="compareGardenPondSide('${side}')" aria-label="${actionLabel}">
      <div class="gm8-side-head"><b>${sideTitle(side)}</b><span>${arr.length}</span></div>
      <div class="gm8-objects">${renderObjects(side)}</div>
    </button>`;
  }

  function renderRelationCenter() {
    if (state.level === 4) {
      return `<div class="gm8-relation-slot ${state.selectedSymbol ? 'has-value' : ''}"><small>Dấu so sánh</small><b>${state.selectedSymbol || '?'}</b></div>`;
    }
    if (state.level === 6) {
      return `<div class="gm8-relation-slot difference ${state.selectedDifference !== null ? 'has-value' : ''}"><small>Hơn kém</small><b>${state.selectedDifference !== null ? state.selectedDifference : '?'}</b></div>`;
    }
    return `<div class="gm8-relation-orb"><span>${state.left.length}</span><i>${state.level >= 3 ? relation() : '↔'}</i><span>${state.right.length}</span></div>`;
  }

  function renderScene() {
    const cfg = sceneConfig();
    const bg = cfg.bg;
    return `<div class="gm8-scene ${state.scene} ${state.solved ? 'is-solved' : ''}" style="--gm8-bg:url('${bg}')">
      <div class="gm8-overlay"></div>
      <div class="gm8-scene-label">${state.scene === 'pond' ? 'AO CÁ SO SÁNH' : 'VƯỜN HOA SO SÁNH'}</div>
      <div class="gm8-groups">
        ${renderSide('left')}
        ${renderRelationCenter()}
        ${renderSide('right')}
      </div>
      <div class="gm8-rabbit">🐰</div>
      ${state.solved ? `<div class="gm8-world-success"><span>${state.scene === 'pond' ? '🐟✨🐟' : '🌷✨🌻'}</span><b>${successWorldText()}</b></div>` : ''}
    </div>`;
  }

  function successWorldText() {
    if (state.level === 3 || (state.level === 5 && relation() === '=')) return 'Hai bên cân bằng rồi!';
    if (state.level === 6) return `Hơn kém nhau ${state.goalDifference}!`;
    return 'So sánh chính xác!';
  }

  function renderTools() {
    if (state.level === 4) {
      return `<div class="gm8-toolbox"><div class="gm8-tool-head"><span>🔣 Chọn dấu</span><small>Chạm dấu rồi bấm Kiểm tra</small></div><div class="gm8-symbols">${['>','<','='].map(s => `<button class="gm8-symbol ${state.selectedSymbol === s ? 'is-selected' : ''}" onclick="compareGardenPondSymbol('${s}')">${s}</button>`).join('')}</div></div>`;
    }
    if (state.level === 5) {
      const cfg = sceneConfig();
      return `<div class="gm8-toolbox"><div class="gm8-tool-head"><span>🧺 Khay ${cfg.itemName}</span><small>Chạm “Thêm” rồi chạm bên cần thêm · chạm ${cfg.itemName} để bớt/chuyển</small></div><div class="gm8-adjust-tools"><button onclick="compareGardenPondAddMode()" class="gm8-add-btn ${state.selectedItem?.bank ? 'is-selected' : ''}">➕ Thêm 1 ${cfg.itemName}</button><button onclick="compareGardenPondPair()" class="gm8-pair-btn">🤝 Ghép cặp</button></div></div>`;
    }
    if (state.level === 6) {
      const max = Math.max(5, state.goalDifference + 2);
      return `<div class="gm8-toolbox"><div class="gm8-tool-head"><span>🔢 Chọn số hơn kém</span><small>Ghép cặp trước nếu con muốn nhìn phần còn thừa</small></div><div class="gm8-number-tools">${Array.from({ length: max }, (_, i) => i + 1).map(n => `<button class="gm8-number ${state.selectedDifference === n ? 'is-selected' : ''}" onclick="compareGardenPondDifference(${n})">${n}</button>`).join('')}</div></div>`;
    }
    if (state.level === 3) {
      return `<div class="gm8-toolbox"><div class="gm8-tool-head"><span>🤝 Ghép cặp để kiểm tra</span><small>Con có thể chạm một ${sceneConfig().itemName} rồi chạm sang bên kia để chuyển</small></div><button onclick="compareGardenPondPair()" class="gm8-pair-wide">${state.paired ? '👀 Bỏ ghép cặp' : '🤝 Ghép từng cặp'}</button></div>`;
    }
    return `<div class="gm8-toolbox"><div class="gm8-tool-head"><span>👀 Quan sát hai nhóm</span><small>Nếu khó nhìn, dùng ghép cặp để thấy phần còn thừa</small></div><button onclick="compareGardenPondPair()" class="gm8-pair-wide">${state.paired ? '👀 Bỏ ghép cặp' : '🤝 Ghép từng cặp'}</button></div>`;
  }

  function panelHelpText() {
    if (state.level === 1) return 'Nhóm còn nhiều vật chưa ghép cặp hơn chính là nhóm nhiều hơn.';
    if (state.level === 2) return 'Nhóm hết vật trước khi ghép cặp là nhóm ít hơn.';
    if (state.level === 3) return 'Chuyển từng vật từ bên nhiều sang bên ít. Dừng khi hai số bằng nhau.';
    if (state.level === 4) return 'Dấu mở về phía số lớn hơn: 7 > 4. Dấu nhọn hướng về số bé hơn.';
    if (state.level === 5) return relationGoalText();
    return 'Sau khi ghép cặp, đếm số vật còn thừa ở một bên. Đó là số hơn kém.';
  }

  function progressInfo() {
    if (state.level === 3) {
      const diff = Math.abs(state.left.length - state.right.length);
      return { text: `${state.left.length} và ${state.right.length}`, pct: diff === 0 ? 100 : Math.max(15, 100 - diff * 18) };
    }
    if (state.level === 5) {
      const ok = relation() === state.goalRelation;
      return { text: `${state.left.length} ${relation()} ${state.right.length}`, pct: ok ? 100 : 45 };
    }
    return { text: `${state.left.length} và ${state.right.length}`, pct: state.solved ? 100 : 35 };
  }

  function renderPanel() {
    const cfg = LEVELS[state.level - 1];
    const p = progressInfo();
    return `<aside class="gm8-panel">
      <div class="gm8-level-title">${cfg.title}</div>
      <div class="gm8-skill-pill">🎯 ${cfg.skill}</div>
      <div class="gm8-teacher"><span>🐰</span><div><b>Cô Thỏ Hồng:</b><br>${state.message}</div></div>
      <div class="gm8-progress"><div><span>Hai nhóm</span><b>${p.text}</b></div><div class="gm8-progress-bar"><i style="width:${Math.max(0, Math.min(100, p.pct))}%"></i></div></div>
      <div class="gm8-feedback ${state.solved ? 'is-success' : ''}">${state.solved ? solvedText() : panelHelpText()}</div>
      <div class="gm8-actions"><button class="gm8-btn secondary" onclick="compareGardenPondHint()">💡 Gợi ý</button><button class="gm8-btn secondary" onclick="compareGardenPondReset()">🔄 Làm lại</button></div>
      <button class="gm8-btn primary" onclick="compareGardenPondCheck()">✅ Kiểm tra</button>
      ${state.solved ? '<button class="gm8-btn next" onclick="compareGardenPondNextRound()">🌟 Lượt mới</button>' : ''}
    </aside>`;
  }

  function solvedText() {
    if (state.level === 1) return `Đúng rồi! ${state.left.length > state.right.length ? sideTitle('left') : sideTitle('right')} có nhiều hơn.`;
    if (state.level === 2) return `Chính xác! ${state.left.length < state.right.length ? sideTitle('left') : sideTitle('right')} có ít hơn.`;
    if (state.level === 3) return `Tuyệt lắm! Hai bên đều có ${state.left.length} ${sceneConfig().itemName}.`;
    if (state.level === 4) return `Đúng: ${state.left.length} ${relation()} ${state.right.length}.`;
    if (state.level === 5) return `Con đã điều chỉnh đúng: ${state.left.length} ${relation()} ${state.right.length}.`;
    return `Đúng rồi! Hai nhóm hơn kém nhau ${state.goalDifference}.`;
  }

  function styles() {
    return `<style id="gm8-styles">
      .gm8-app{font-family:'Quicksand','Nunito',sans-serif;color:#334155}.gm8-app *{box-sizing:border-box}
      .gm8-topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:10px}.gm8-kicker{font-size:14px;font-weight:1000;color:#0284c7;letter-spacing:.05em}.gm8-topbar h3{margin:3px 0 2px;font-size:23px;line-height:1.08;font-weight:1000;color:#0f5f8f}.gm8-topbar p{margin:0;font-size:16px;line-height:1.35;font-weight:800;color:#64748b}.gm8-listen{border:1px solid #bae6fd;background:#f0f9ff;color:#0369a1;border-radius:14px;padding:10px 14px;font-size:16px;font-weight:1000;white-space:nowrap}
      .gm8-levels{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;margin-bottom:10px}.gm8-level-btn{min-height:66px;border:1px solid #dbeafe;background:#fff;border-radius:15px;padding:8px 6px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#52647e;box-shadow:0 2px 8px rgba(30,64,175,.05);transition:.16s}.gm8-level-btn span{width:26px;height:26px;border-radius:999px;background:#e0f2fe;display:flex;align-items:center;justify-content:center;font-weight:1000;font-size:14px;color:#0369a1}.gm8-level-btn b{font-size:15px;line-height:1.14}.gm8-level-btn:hover{transform:translateY(-1px);border-color:#7dd3fc}.gm8-level-btn.is-active{background:linear-gradient(135deg,#38bdf8,#14b8a6);border-color:#0ea5e9;color:#fff;box-shadow:0 6px 15px rgba(14,165,233,.22)}.gm8-level-btn.is-active span{background:#fff;color:#0369a1}
      .gm8-main{display:grid;grid-template-columns:minmax(0,2.15fr) minmax(285px,.9fr);gap:12px;align-items:start}.gm8-left{min-width:0}
      .gm8-scene{position:relative;width:100%;aspect-ratio:16/9;min-height:390px;overflow:hidden;border:1px solid #bae6fd;border-radius:26px;background-image:linear-gradient(rgba(255,255,255,.08),rgba(255,255,255,.13)),var(--gm8-bg);background-size:cover;background-position:center;box-shadow:0 10px 28px rgba(2,132,199,.10)}.gm8-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.05),rgba(255,255,255,.03));backdrop-filter:blur(.35px)}.gm8-scene-label{position:absolute;z-index:8;left:50%;top:4%;transform:translateX(-50%);background:rgba(255,255,255,.94);border:1px solid #7dd3fc;color:#0369a1;border-radius:999px;padding:7px 16px;font-size:16px;font-weight:1000;box-shadow:0 5px 14px rgba(2,132,199,.14);white-space:nowrap}
      .gm8-groups{position:absolute;z-index:5;left:5%;right:5%;top:18%;bottom:14%;display:grid;grid-template-columns:minmax(0,1fr) 110px minmax(0,1fr);gap:12px;align-items:center}.gm8-side{height:100%;min-height:260px;border:2px solid rgba(255,255,255,.94);border-radius:24px;background:rgba(255,255,255,.60);box-shadow:0 10px 26px rgba(15,64,90,.13),inset 0 0 0 2px rgba(14,165,233,.16);padding:12px;display:flex;flex-direction:column;transition:.16s;overflow:hidden}.gm8-side:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(15,64,90,.18),inset 0 0 0 2px rgba(14,165,233,.28)}.gm8-side.is-selected{box-shadow:0 0 0 6px rgba(250,204,21,.45),0 12px 28px rgba(15,64,90,.18)}.gm8-side.is-hint{animation:gm8hint 1s ease-in-out infinite;box-shadow:0 0 0 6px rgba(250,204,21,.5),0 0 25px rgba(250,204,21,.55)}.gm8-side.is-wrong{animation:gm8shake .32s}.gm8-side-head{display:flex;align-items:center;justify-content:space-between;gap:8px;color:#155e75;font-size:16px;font-weight:1000}.gm8-side-head span{min-width:42px;height:42px;border-radius:999px;background:#fff;border:1px solid #bae6fd;display:flex;align-items:center;justify-content:center;color:#0369a1;font-size:23px}.gm8-objects{flex:1;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:7px;padding:10px 2px}.gm8-object{position:relative;width:62px;height:62px;border:1.5px solid rgba(255,255,255,.85);border-radius:16px;background:rgba(255,255,255,.60);padding:3px;display:flex;align-items:center;justify-content:center;transition:.13s}.gm8-object:hover{transform:translateY(-2px) scale(1.03)}.gm8-object.is-selected{box-shadow:0 0 0 5px rgba(99,102,241,.34);transform:translateY(-2px) scale(1.05)}.gm8-object.is-paired{opacity:.62;filter:saturate(.75)}.gm8-object.is-paired i{position:absolute;right:-4px;top:-5px;width:21px;height:21px;border-radius:50%;background:#22c55e;color:#fff;font-style:normal;font-size:12px;display:flex;align-items:center;justify-content:center;border:2px solid #fff}.gm8-object.is-leftover{box-shadow:0 0 0 4px rgba(250,204,21,.45),0 0 14px rgba(250,204,21,.5)}.gm8-object-svg{width:100%;height:100%}
      .gm8-relation-orb,.gm8-relation-slot{width:104px;min-height:104px;border-radius:26px;background:rgba(255,255,255,.94);border:2px solid #7dd3fc;box-shadow:0 8px 24px rgba(2,132,199,.16);display:flex;align-items:center;justify-content:center;gap:8px;flex-direction:column;color:#0369a1}.gm8-relation-orb{flex-direction:row;font-weight:1000}.gm8-relation-orb span{font-size:22px}.gm8-relation-orb i{font-style:normal;font-size:30px;color:#0f766e}.gm8-relation-slot small{font-size:12px;font-weight:900;color:#64748b}.gm8-relation-slot b{font-size:44px;line-height:1;color:#7c3aed}.gm8-relation-slot.has-value{border-color:#8b5cf6}.gm8-relation-slot.difference b{color:#ea580c}.gm8-rabbit{position:absolute;z-index:8;right:2.5%;bottom:5%;font-size:48px;filter:drop-shadow(0 4px 5px rgba(0,0,0,.18));transition:.8s}.gm8-scene.is-solved .gm8-rabbit{transform:translateY(-10px) rotate(-10deg)}.gm8-world-success{position:absolute;z-index:30;left:50%;bottom:5%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;border-radius:20px;background:rgba(255,255,255,.96);border:2px solid #86efac;padding:10px 18px;color:#166534;font-size:18px;font-weight:1000;box-shadow:0 10px 25px rgba(22,101,52,.15);animation:gm8pop .45s}
      .gm8-toolbox{margin-top:9px;border:1px solid #bae6fd;border-radius:20px;background:linear-gradient(180deg,#f8fcff,#fff);padding:10px 12px}.gm8-tool-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}.gm8-tool-head span{font-size:16px;font-weight:1000;color:#075985}.gm8-tool-head small{font-size:14px;font-weight:800;color:#718096}.gm8-symbols,.gm8-number-tools,.gm8-adjust-tools{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}.gm8-symbol,.gm8-number{min-width:76px;height:58px;border-radius:16px;border:1px solid #dbeafe;background:#fff;color:#475569;font-size:31px;font-weight:1000;box-shadow:0 3px 10px rgba(30,64,175,.07)}.gm8-number{min-width:58px;font-size:25px}.gm8-symbol.is-selected,.gm8-number.is-selected{border-color:#8b5cf6;background:#f5f3ff;color:#6d28d9;box-shadow:0 0 0 4px rgba(139,92,246,.15)}.gm8-pair-wide,.gm8-add-btn,.gm8-pair-btn{border:1px solid #bae6fd;background:#effaff;color:#0369a1;border-radius:15px;padding:11px 16px;font-size:16px;font-weight:1000}.gm8-add-btn.is-selected{background:#dcfce7;border-color:#86efac;color:#166534}
      .gm8-panel{background:linear-gradient(180deg,#fff,#f8fbff);border:1px solid #bae6fd;border-radius:22px;padding:15px;box-shadow:0 8px 20px rgba(2,132,199,.08);min-height:360px}.gm8-level-title{font-size:18px;font-weight:1000;color:#0c4a6e}.gm8-skill-pill{display:inline-flex;margin-top:7px;background:#ecfeff;border:1px solid #99f6e4;color:#0f766e;border-radius:999px;padding:6px 10px;font-size:16px;font-weight:1000}.gm8-teacher{margin-top:10px;border:1.5px solid #fbcfe8;background:linear-gradient(135deg,#fff1f7,#fff);border-radius:16px;padding:12px;display:flex;gap:10px;font-size:16px;line-height:1.5;font-weight:800;color:#4d5970}.gm8-teacher>span{font-size:28px}.gm8-teacher b{color:#be185d}.gm8-progress{margin-top:12px}.gm8-progress>div:first-child{display:flex;justify-content:space-between;align-items:center;font-size:16px;font-weight:1000;color:#60728b}.gm8-progress>div:first-child b{font-size:18px;color:#0284c7}.gm8-progress-bar{height:10px;border-radius:999px;background:#e8eef8;overflow:hidden;margin-top:6px}.gm8-progress-bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#38bdf8,#14b8a6);transition:.3s}.gm8-feedback{margin-top:12px;min-height:76px;border-radius:16px;border:1px solid #bae6fd;background:#f0f9ff;padding:12px 13px;font-size:16px;line-height:1.5;font-weight:900;color:#395779}.gm8-feedback.is-success{border-color:#86efac;background:#ecfdf5;color:#166534}.gm8-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.gm8-btn{border:0;border-radius:13px;padding:11px 10px;font-size:16px;font-weight:1000;transition:.14s}.gm8-btn.secondary{background:#f4f6fa;color:#52637d;border:1px solid #dbe2ec}.gm8-btn.primary{width:100%;margin-top:10px;background:linear-gradient(135deg,#14b8a6,#0ea5e9);color:#fff;font-size:18px;padding:13px;box-shadow:0 6px 14px rgba(14,165,233,.20)}.gm8-btn.next{width:100%;margin-top:8px;background:linear-gradient(135deg,#f59e0b,#f97316);color:#fff;font-size:16px}.gm8-btn:hover{filter:brightness(1.02);transform:translateY(-1px)}
      @keyframes gm8hint{0%,100%{transform:scale(1)}50%{transform:scale(1.018)}}@keyframes gm8shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}@keyframes gm8pop{0%{opacity:0;transform:translateX(-50%) scale(.72)}100%{opacity:1;transform:translateX(-50%) scale(1)}}
      @media(max-width:900px){.gm8-main{grid-template-columns:1fr}.gm8-panel{min-height:0}.gm8-scene{min-height:0}.gm8-tool-head{align-items:flex-start;flex-direction:column}}
      @media(max-width:700px){.gm8-levels{grid-template-columns:repeat(3,1fr)}.gm8-level-btn{min-height:58px}.gm8-level-btn b{font-size:13px}.gm8-topbar h3{font-size:20px}.gm8-topbar p{font-size:14px}.gm8-listen{font-size:13px;padding:8px 10px}.gm8-groups{left:3%;right:3%;grid-template-columns:minmax(0,1fr) 76px minmax(0,1fr);gap:6px}.gm8-relation-orb,.gm8-relation-slot{width:72px;min-height:82px}.gm8-relation-slot b{font-size:36px}.gm8-side{padding:7px;min-height:210px}.gm8-side-head{font-size:13px}.gm8-side-head span{min-width:34px;height:34px;font-size:18px}.gm8-object{width:47px;height:47px}.gm8-rabbit{font-size:37px}.gm8-scene-label{font-size:12px;padding:5px 10px}}
    </style>`;
  }

  function render() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;
    root.innerHTML = `${styles()}<div class="gm8-app">
      <div class="gm8-topbar"><div><div class="gm8-kicker">🐟 GAME 8 · SO SÁNH SỐ LƯỢNG</div><h3>Ao cá & Vườn hoa so sánh</h3><p>Nhìn hai nhóm → ghép cặp → so sánh → thêm, bớt hoặc chuyển để đúng.</p></div><button class="gm8-listen" onclick="compareGardenPondSpeak()">🔊 Nghe cách chơi</button></div>
      <div class="gm8-levels">${renderLevels()}</div>
      <div class="gm8-main"><div class="gm8-left">${renderScene()}${renderTools()}</div>${renderPanel()}</div>
    </div>`;
  }

  function chooseSideAnswer(side) {
    if (state.level !== 1 && state.level !== 2) return;
    state.selectedSide = side;
    state.hintSide = null;
    state.message = `Con đã chọn ${sideTitle(side).toLowerCase()}. Khi chắc chắn, bấm Kiểm tra nhé.`;
    render();
  }

  function moveObject(fromSide, id, toSide) {
    const from = fromSide === 'left' ? state.left : state.right;
    const to = toSide === 'left' ? state.left : state.right;
    const idx = from.findIndex(x => x.id === id);
    if (idx < 0) return false;
    const [obj] = from.splice(idx, 1);
    to.push(obj);
    state.selectedItem = null;
    state.paired = false;
    return true;
  }

  function addToSide(side) {
    const kind = state.scene === 'pond' ? 'fish' : 'flower';
    const arr = side === 'left' ? state.left : state.right;
    arr.push(item(kind, arr.length + state.round));
    state.selectedItem = null;
    state.paired = false;
    state.message = `Đã thêm 1 ${sceneConfig().itemName} vào ${sideTitle(side).toLowerCase()}.`;
    render();
  }

  function evaluate() {
    const rel = relation();
    if (state.level === 1) {
      const correct = state.left.length > state.right.length ? 'left' : 'right';
      return state.selectedSide === correct ? { ok: true } : { ok: false, side: correct, text: 'Chưa đúng. Con thử ghép từng cặp. Bên còn vật chưa ghép chính là bên nhiều hơn.' };
    }
    if (state.level === 2) {
      const correct = state.left.length < state.right.length ? 'left' : 'right';
      return state.selectedSide === correct ? { ok: true } : { ok: false, side: correct, text: 'Con ghép từng cặp nhé. Bên hết vật trước là bên ít hơn.' };
    }
    if (state.level === 3) {
      return rel === '=' ? { ok: true } : { ok: false, side: state.left.length > state.right.length ? 'left' : 'right', text: 'Hai bên chưa bằng nhau. Con chuyển một vật từ bên nhiều sang bên ít rồi kiểm tra lại.' };
    }
    if (state.level === 4) {
      return state.selectedSymbol === rel ? { ok: true } : { ok: false, text: `Con nhìn lại: bên trái có ${state.left.length}, bên phải có ${state.right.length}. Hãy chọn dấu phù hợp.` };
    }
    if (state.level === 5) {
      return rel === state.goalRelation ? { ok: true } : { ok: false, side: state.goalRelation === '=' ? (state.left.length > state.right.length ? 'left' : 'right') : null, text: relationGoalText() };
    }
    return state.selectedDifference === state.goalDifference ? { ok: true } : { ok: false, text: 'Con ghép cặp hai bên. Đếm số vật còn thừa ở một bên rồi chọn lại số nhé.' };
  }

  window.compareGardenPondSetLevel = function(level) {
    if (level < 1 || level > LEVELS.length) return;
    state.round = 0;
    buildLevel(level);
  };

  window.compareGardenPondSide = function(side) {
    if (state.solved) return;
    if (state.level <= 2) return chooseSideAnswer(side);
    if (state.level === 3) {
      if (!state.selectedItem) {
        state.hintSide = side;
        state.message = `Con chạm một ${sceneConfig().itemName} ở bên muốn chuyển trước nhé.`;
        render();
        return;
      }
      if (state.selectedItem.side === side) return;
      if (moveObject(state.selectedItem.side, state.selectedItem.id, side)) {
        state.message = `Đã chuyển 1 ${sceneConfig().itemName}. Bây giờ hai bên là ${state.left.length} và ${state.right.length}.`;
        render();
      }
      return;
    }
    if (state.level === 5) {
      if (state.selectedItem?.bank) return addToSide(side);
      if (state.selectedItem) {
        if (state.selectedItem.side === side) return;
        if (moveObject(state.selectedItem.side, state.selectedItem.id, side)) {
          state.message = `Đã chuyển 1 ${sceneConfig().itemName}. Hai bên hiện có ${state.left.length} và ${state.right.length}.`;
          render();
        }
      }
    }
  };

  window.compareGardenPondObject = function(side, id) {
    if (state.solved) return;
    if (state.level !== 3 && state.level !== 5) return;
    if (state.level === 5 && state.selectedItem?.bank) {
      const arr = side === 'left' ? state.left : state.right;
      const idx = arr.findIndex(o => o.id === id);
      if (idx >= 0) {
        arr.splice(idx, 1);
        state.selectedItem = null;
        state.paired = false;
        state.message = `Đã bớt 1 ${sceneConfig().itemName} khỏi ${sideTitle(side).toLowerCase()}.`;
        render();
      }
      return;
    }
    if (state.selectedItem?.id === id) state.selectedItem = null;
    else state.selectedItem = { id, side };
    state.message = state.selectedItem ? `Đã chọn 1 ${sceneConfig().itemName}. Con chạm sang nhóm bên kia để chuyển.` : panelHelpText();
    render();
  };

  window.compareGardenPondPair = function() {
    if (state.solved) return;
    state.paired = !state.paired;
    const diff = Math.abs(state.left.length - state.right.length);
    state.message = state.paired ? (diff ? `Đã ghép ${Math.min(state.left.length, state.right.length)} cặp. Còn ${diff} ${sceneConfig().itemName} chưa có bạn ghép.` : 'Mỗi vật đều đã có một bạn ghép. Hai nhóm đang bằng nhau.') : panelHelpText();
    render();
  };

  window.compareGardenPondSymbol = function(symbol) {
    if (state.solved || state.level !== 4) return;
    state.selectedSymbol = symbol;
    state.message = `Con đã đặt dấu ${symbol}. Hãy đọc: ${state.left.length} ${symbol} ${state.right.length}.`;
    render();
  };

  window.compareGardenPondDifference = function(n) {
    if (state.solved || state.level !== 6) return;
    state.selectedDifference = n;
    state.message = `Con chọn hơn kém nhau ${n}. Bấm Kiểm tra để xem nhé.`;
    render();
  };

  window.compareGardenPondAddMode = function() {
    if (state.solved || state.level !== 5) return;
    state.selectedItem = { bank: true };
    state.message = `Đã chọn “Thêm 1 ${sceneConfig().itemName}”. Con chạm vào bên muốn thêm. Nếu muốn bớt, chạm nút này rồi chạm trực tiếp một ${sceneConfig().itemName}.`;
    render();
  };

  window.compareGardenPondHint = function() {
    if (state.solved) return;
    state.paired = true;
    const rel = relation();
    if (state.level === 1) state.hintSide = state.left.length > state.right.length ? 'left' : 'right';
    else if (state.level === 2) state.hintSide = state.left.length < state.right.length ? 'left' : 'right';
    else if (state.level === 3) state.hintSide = state.left.length > state.right.length ? 'left' : (state.left.length < state.right.length ? 'right' : null);
    else if (state.level === 5 && state.goalRelation === '=') state.hintSide = state.left.length > state.right.length ? 'left' : (state.left.length < state.right.length ? 'right' : null);
    state.message = rel === '=' ? 'Hai bên đang có số lượng bằng nhau.' : `Cô đã ghép từng cặp. Bên còn ${Math.abs(state.left.length - state.right.length)} ${sceneConfig().itemName} chưa ghép đang được làm nổi bật.`;
    render();
  };

  window.compareGardenPondCheck = function() {
    if (state.solved) return;
    const result = evaluate();
    if (!result.ok) {
      state.message = result.text;
      state.hintSide = result.side || null;
      state.wiggle = result.side || 'center';
      state.paired = true;
      render();
      later_(() => { state.wiggle = null; render(); }, 380);
      return;
    }
    state.solved = true;
    state.hintSide = null;
    state.message = solvedText();
    state.wins += 1;
    render();
    if (typeof speakVietnamese === 'function') later_(() => speakVietnamese(solvedText(), 0.9), 120);
    if (state.wins > 0 && state.wins % 10 === 0 && typeof rewardMiniGameStar_ === 'function') rewardMiniGameStar_('Bé đã hoàn thành 10 lượt Ao cá & Vườn hoa so sánh!');
  };

  window.compareGardenPondReset = function() { buildLevel(state.level); };
  window.compareGardenPondNextRound = function() { state.round += 1; buildLevel(state.level); };
  window.compareGardenPondSpeak = function() {
    if (typeof speakVietnamese !== 'function') return;
    speakVietnamese(`Game Ao cá và Vườn hoa so sánh. ${LEVELS[state.level - 1].title}. ${panelHelpText()} Con có thể bấm Gợi ý để ghép từng cặp và nhìn phần còn thừa.`, 0.88);
  };
  window.stopCompareGardenPondGame = function() {
    gameActive_ = false;
    clearGameTimers_();
    stopGameAudio_();
    state.selectedItem = null;
  };
  window.startCompareGardenPondGame = function() {
    clearGameTimers_();
    gameActive_ = true;
    state.round = 0;
    state.wins = 0;
    buildLevel(1);
  };
})();
