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

  const COLORS = {
    red:    { hex: '#fb5f75', soft: '#ffe8ed', name: 'đỏ' },
    blue:   { hex: '#38a9f3', soft: '#e7f5ff', name: 'xanh dương' },
    yellow: { hex: '#f7c948', soft: '#fff7d6', name: 'vàng' },
    green:  { hex: '#45c979', soft: '#e8faef', name: 'xanh lá' },
    purple: { hex: '#9b7cf7', soft: '#f0ebff', name: 'tím' },
    orange: { hex: '#ff934d', soft: '#fff0e6', name: 'cam' },
    pink:   { hex: '#f472b6', soft: '#fdeaf5', name: 'hồng' },
    teal:   { hex: '#31c7bb', soft: '#e6fbf8', name: 'xanh ngọc' }
  };

  const SHAPES = {
    circle: 'hình tròn',
    square: 'hình vuông',
    rect: 'hình chữ nhật',
    triangle: 'hình tam giác'
  };

  const LEVELS = {
    1: {
      title: 'Cấp 1 · Đúng hình',
      skill: 'Hình dạng',
      mission: 'Chọn đúng hình và đặt vào khung tương ứng.',
      checks: { shape: true, color: false, orientation: false, number: false },
      scene: 'sorting'
    },
    2: {
      title: 'Cấp 2 · Đúng hình, đúng màu',
      skill: 'Hình + màu',
      mission: 'Khung nào cần hình gì, màu gì thì con chọn đúng mảnh đó.',
      checks: { shape: true, color: true, orientation: false, number: false },
      scene: 'sorting'
    },
    3: {
      title: 'Cấp 3 · Đúng cả hướng',
      skill: 'Hình + màu + hướng',
      mission: 'Quan sát cả hướng của hình rồi xoay hoặc chọn mảnh phù hợp.',
      checks: { shape: true, color: true, orientation: true, number: false },
      scene: 'sorting'
    },
    4: {
      title: 'Cấp 4 · Hình có số',
      skill: 'Hình + màu + số',
      mission: 'Chọn đúng hình, đúng màu và đúng số trên mảnh.',
      checks: { shape: true, color: true, orientation: false, number: true },
      scene: 'sorting'
    },
    5: {
      title: 'Cấp 5 · Lắp đoàn tàu',
      skill: 'Ghép hình thành đồ vật',
      mission: 'Lắp đúng từng mảnh để đoàn tàu hoàn chỉnh và chạy được.',
      checks: { shape: true, color: true, orientation: true, number: true },
      scene: 'train'
    },
    6: {
      title: 'Cấp 6 · Xưởng thử thách',
      skill: 'Nhiều thuộc tính cùng lúc',
      mission: 'Lắp mô hình lớn bằng đúng hình, màu, hướng và số.',
      checks: { shape: true, color: true, orientation: true, number: true },
      scene: 'challenge'
    }
  };

  const st = {
    level: 1,
    round: 0,
    wins: 0,
    selectedId: null,
    placed: {},
    pieces: [],
    slots: [],
    solved: false,
    hintSlot: null,
    message: '',
    lastVariant: -1,
    wrongAttempts: 0
  };

  function rand_(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function shuffle_(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function color_(key) { return COLORS[key] || COLORS.blue; }
  function shapeName_(key) { return SHAPES[key] || 'hình'; }
  function cfg_() { return LEVELS[st.level]; }
  function pieceById_(id) { return st.pieces.find(p => p.id === id) || null; }
  function slotById_(id) { return st.slots.find(s => s.id === id) || null; }
  function placedPiece_(slotId) {
    const pid = st.placed[slotId];
    return pid ? pieceById_(pid) : null;
  }
  function isUsed_(pieceId) { return Object.values(st.placed).includes(pieceId); }

  function normalizeOrientation_(shape, ori) {
    if (shape === 'circle' || shape === 'square') return 'none';
    if (shape === 'rect') return ori === 'v' ? 'v' : 'h';
    if (shape === 'triangle') return ['up','right','down','left'].includes(ori) ? ori : 'up';
    return 'none';
  }

  function makePiece_(shape, color, number, orientation, id) {
    return {
      id: id || ('p' + Math.random().toString(36).slice(2, 8)),
      shape,
      color,
      number: number == null ? null : Number(number),
      orientation: normalizeOrientation_(shape, orientation)
    };
  }

  function slot_(id, x, y, w, h, piece, role) {
    return {
      id, x, y, w, h,
      shape: piece.shape,
      color: piece.color,
      number: piece.number,
      orientation: piece.orientation,
      role: role || ''
    };
  }

  function baseSortingLayouts_() {
    return [
      [
        slot_('s1', 13, 22, 20, 30, makePiece_('circle','red',1), 'Vị trí 1'),
        slot_('s2', 39, 20, 20, 32, makePiece_('triangle','yellow',2,'up'), 'Vị trí 2'),
        slot_('s3', 65, 22, 20, 30, makePiece_('square','blue',3), 'Vị trí 3')
      ],
      [
        slot_('s1', 12, 21, 22, 31, makePiece_('rect','green',4,'h'), 'Vị trí 1'),
        slot_('s2', 40, 20, 19, 32, makePiece_('circle','purple',5), 'Vị trí 2'),
        slot_('s3', 66, 20, 19, 32, makePiece_('triangle','orange',6,'up'), 'Vị trí 3')
      ],
      [
        slot_('s1', 11, 22, 20, 30, makePiece_('square','pink',7), 'Vị trí 1'),
        slot_('s2', 39, 18, 19, 36, makePiece_('rect','blue',8,'v'), 'Vị trí 2'),
        slot_('s3', 67, 21, 20, 31, makePiece_('circle','green',9), 'Vị trí 3')
      ]
    ];
  }

  function makeSortingRound_() {
    const layouts = baseSortingLayouts_();
    let idx = rand_(0, layouts.length - 1);
    if (idx === st.lastVariant) idx = (idx + 1) % layouts.length;
    st.lastVariant = idx;
    let slots = JSON.parse(JSON.stringify(layouts[idx]));

    // Level 1 only tests shape. Keep the board neutral and remove numbers.
    if (st.level === 1) {
      slots = slots.map((s, i) => ({ ...s, color: ['red','yellow','blue'][i % 3], number: null, orientation: normalizeOrientation_(s.shape, s.orientation) }));
    }
    // Level 2 tests shape + colour, no numbers.
    if (st.level === 2) slots = slots.map(s => ({ ...s, number: null }));
    // Level 3 tests orientation too. Guarantee a rectangle and a triangle with distinct directions.
    if (st.level === 3) {
      slots = [
        slot_('s1', 10, 23, 23, 28, makePiece_('rect','blue',null,'h'), 'Khung ngang'),
        slot_('s2', 40, 17, 18, 38, makePiece_('rect','green',null,'v'), 'Khung dọc'),
        slot_('s3', 67, 20, 20, 34, makePiece_('triangle','orange',null, ['up','right','left'][rand_(0,2)]), 'Khung tam giác')
      ];
    }
    // Level 4: exact shape + color + number.
    if (st.level === 4) {
      const nums = shuffle_([2,3,4,5,6,7]);
      slots = slots.map((s, i) => ({ ...s, number: nums[i], orientation: normalizeOrientation_(s.shape, s.orientation) }));
    }

    const correctPieces = slots.map((s, i) => makePiece_(s.shape, s.color, s.number, s.orientation, 'c' + i));
    const decoys = [];

    if (st.level === 1) {
      // One decoy of a repeated shape is avoided so the first level stays very easy.
      decoys.push(makePiece_('triangle','green',null,'up','d1'));
    } else if (st.level === 2) {
      const s = slots[0];
      decoys.push(makePiece_(s.shape, s.color === 'red' ? 'blue' : 'red', null, s.orientation, 'd1'));
      decoys.push(makePiece_(slots[1].shape, slots[1].color === 'yellow' ? 'green' : 'yellow', null, slots[1].orientation, 'd2'));
    } else if (st.level === 3) {
      decoys.push(makePiece_('rect','blue',null,'v','d1'));
      decoys.push(makePiece_('rect','green',null,'h','d2'));
      const tri = slots[2];
      const wrongOri = tri.orientation === 'up' ? 'right' : 'up';
      decoys.push(makePiece_('triangle','orange',null,wrongOri,'d3'));
    } else if (st.level === 4) {
      const a = slots[0], b = slots[1];
      decoys.push(makePiece_(a.shape, a.color, a.number === 9 ? 8 : a.number + 1, a.orientation, 'd1'));
      decoys.push(makePiece_(a.shape, a.color === 'red' ? 'blue' : 'red', a.number, a.orientation, 'd2'));
      decoys.push(makePiece_(b.shape === 'circle' ? 'square' : 'circle', b.color, b.number, 'none', 'd3'));
    }

    st.slots = slots;
    st.pieces = shuffle_(correctPieces.concat(decoys));
  }

  function trainRound_() {
    const slots = [
      slot_('body', 25, 34, 35, 24, makePiece_('rect','blue',5,'h'), 'Thân tàu'),
      slot_('cab', 59, 27, 18, 31, makePiece_('square','yellow',2), 'Buồng lái'),
      slot_('chimney', 18, 20, 9, 19, makePiece_('rect','red',4,'v'), 'Ống khói'),
      slot_('roof', 58, 12, 21, 17, makePiece_('triangle','green',3,'up'), 'Mái'),
      slot_('wheel1', 30, 61, 13, 21, makePiece_('circle','red',1), 'Bánh xe'),
      slot_('wheel2', 60, 61, 13, 21, makePiece_('circle','red',1), 'Bánh xe')
    ];
    const correct = slots.map((s, i) => makePiece_(s.shape, s.color, s.number, s.orientation, 't' + i));
    const decoys = [
      makePiece_('rect','blue',4,'h','td1'),
      makePiece_('square','orange',2,'none','td2'),
      makePiece_('circle','red',3,'none','td3'),
      makePiece_('triangle','green',3,'right','td4')
    ];
    st.slots = slots;
    st.pieces = shuffle_(correct.concat(decoys));
  }

  function challengeRound_() {
    const variants = [
      {
        name: 'Tên lửa hình học',
        scene: 'rocket',
        slots: [
          slot_('body', 42, 28, 18, 40, makePiece_('rect','blue',6,'v'), 'Thân tên lửa'),
          slot_('nose', 42, 9, 18, 22, makePiece_('triangle','red',3,'up'), 'Mũi tên lửa'),
          slot_('window', 46, 37, 10, 16, makePiece_('circle','green',1), 'Cửa sổ'),
          slot_('finL', 30, 52, 15, 22, makePiece_('triangle','yellow',2,'left'), 'Cánh trái'),
          slot_('finR', 57, 52, 15, 22, makePiece_('triangle','yellow',2,'right'), 'Cánh phải'),
          slot_('flame', 45, 66, 12, 21, makePiece_('triangle','orange',5,'down'), 'Lửa đẩy')
        ]
      },
      {
        name: 'Robot hình học',
        scene: 'robot',
        slots: [
          slot_('head', 41, 12, 20, 25, makePiece_('square','yellow',4), 'Đầu robot'),
          slot_('body', 38, 38, 26, 30, makePiece_('rect','blue',7,'v'), 'Thân robot'),
          slot_('eye', 47, 19, 8, 12, makePiece_('circle','green',1), 'Mắt robot'),
          slot_('armL', 24, 42, 15, 13, makePiece_('rect','red',3,'h'), 'Tay trái'),
          slot_('armR', 63, 42, 15, 13, makePiece_('rect','red',3,'h'), 'Tay phải'),
          slot_('footL', 38, 69, 11, 14, makePiece_('square','purple',2), 'Chân trái'),
          slot_('footR', 53, 69, 11, 14, makePiece_('square','purple',2), 'Chân phải')
        ]
      }
    ];
    let idx = rand_(0, variants.length - 1);
    if (idx === st.lastVariant) idx = (idx + 1) % variants.length;
    st.lastVariant = idx;
    const v = variants[idx];
    st.challengeName = v.name;
    st.challengeScene = v.scene;
    st.slots = v.slots;
    const correct = st.slots.map((s, i) => makePiece_(s.shape, s.color, s.number, s.orientation, 'x' + i));
    const decoys = [
      makePiece_(st.slots[0].shape, st.slots[0].color, (st.slots[0].number || 1) + 1, st.slots[0].orientation, 'xd1'),
      makePiece_(st.slots[1].shape, 'purple', st.slots[1].number, st.slots[1].orientation, 'xd2'),
      makePiece_('circle','blue',4,'none','xd3'),
      makePiece_('rect','green',2,'h','xd4')
    ];
    st.pieces = shuffle_(correct.concat(decoys));
  }

  function newRound_() {
    st.round++;
    st.selectedId = null;
    st.placed = {};
    st.solved = false;
    st.hintSlot = null;
    st.wrongAttempts = 0;
    st.message = st.level === 1
      ? 'Con chọn một mảnh ở kho rồi chạm vào khung có cùng hình nhé.'
      : 'Con nhìn kỹ yêu cầu trên khung rồi chọn mảnh phù hợp.';

    if (st.level <= 4) makeSortingRound_();
    else if (st.level === 5) trainRound_();
    else challengeRound_();
    render_();
  }

  function shapeSvg_(piece, opts) {
    const o = Object.assign({ ghost: false, showNumber: true, size: 84 }, opts || {});
    const c = color_(piece.color);
    const fill = o.ghost ? c.soft : c.hex;
    const stroke = o.ghost ? c.hex : '#ffffff';
    const dash = o.ghost ? '7 5' : '0';
    const num = o.showNumber && piece.number != null ? String(piece.number) : '';
    const ori = normalizeOrientation_(piece.shape, piece.orientation);
    let shape = '';
    let rot = 0;
    if (piece.shape === 'circle') {
      shape = `<circle cx="50" cy="50" r="32" fill="${fill}" stroke="${stroke}" stroke-width="5" stroke-dasharray="${dash}"/>`;
    } else if (piece.shape === 'square') {
      shape = `<rect x="18" y="18" width="64" height="64" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="5" stroke-dasharray="${dash}"/>`;
    } else if (piece.shape === 'rect') {
      if (ori === 'v') shape = `<rect x="29" y="12" width="42" height="76" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="5" stroke-dasharray="${dash}"/>`;
      else shape = `<rect x="12" y="29" width="76" height="42" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="5" stroke-dasharray="${dash}"/>`;
    } else if (piece.shape === 'triangle') {
      if (ori === 'right') rot = 90;
      else if (ori === 'down') rot = 180;
      else if (ori === 'left') rot = -90;
      shape = `<polygon points="50,12 88,82 12,82" fill="${fill}" stroke="${stroke}" stroke-width="5" stroke-linejoin="round" stroke-dasharray="${dash}" transform="rotate(${rot} 50 50)"/>`;
    }
    return `<svg class="gm6-shape-svg" viewBox="0 0 100 100" aria-hidden="true">${shape}${num ? `<text x="50" y="58" text-anchor="middle" font-size="31" font-weight="900" font-family="Nunito,Arial,sans-serif" fill="#17345c" stroke="#fff" stroke-width="2.4" paint-order="stroke">${num}</text>` : ''}</svg>`;
  }

  function slotCue_(slot) {
    const checks = cfg_().checks;
    const cuePiece = {
      shape: slot.shape,
      color: checks.color ? slot.color : 'blue',
      number: checks.number ? slot.number : null,
      orientation: checks.orientation ? slot.orientation : normalizeOrientation_(slot.shape, slot.orientation)
    };
    return shapeSvg_(cuePiece, { ghost: true, showNumber: checks.number });
  }

  function slotStyle_(slot) {
    return `left:${slot.x}%;top:${slot.y}%;width:${slot.w}%;height:${slot.h}%;`;
  }

  function renderSceneDecor_() {
    const mode = st.level === 5 ? 'train' : (st.level === 6 ? (st.challengeScene || 'rocket') : 'sorting');
    if (mode === 'train') {
      return `<div class="gm6-scene-sun"></div><div class="gm6-hill h1"></div><div class="gm6-hill h2"></div><div class="gm6-track"><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="gm6-station">EPSILON<br><b>STATION</b></div><div class="gm6-rabbit">🐰</div>`;
    }
    if (mode === 'rocket') {
      return `<div class="gm6-night-sky"><i></i><i></i><i></i><i></i><i></i></div><div class="gm6-moon">🌙</div><div class="gm6-launch-pad"></div><div class="gm6-rabbit gm6-space-rabbit">🐰</div>`;
    }
    if (mode === 'robot') {
      return `<div class="gm6-workshop-window"></div><div class="gm6-gear g1">⚙️</div><div class="gm6-gear g2">⚙️</div><div class="gm6-table-line"></div><div class="gm6-rabbit">🐰</div>`;
    }
    return `<div class="gm6-workshop-window"></div><div class="gm6-shelf"><span>○</span><span>△</span><span>□</span><span>▭</span></div><div class="gm6-gear g1">⚙️</div><div class="gm6-gear g2">⚙️</div><div class="gm6-rabbit">🐰</div><div class="gm6-table-line"></div>`;
  }

  function renderSlots_() {
    return st.slots.map(slot => {
      const piece = placedPiece_(slot.id);
      const hot = st.hintSlot === slot.id;
      const label = slot.role ? `<span class="gm6-slot-role">${slot.role}</span>` : '';
      return `<button type="button" class="gm6-slot ${piece ? 'is-filled' : ''} ${hot ? 'is-hint' : ''}" style="${slotStyle_(slot)}" data-slot="${slot.id}" onclick="geometryWorkshopSlot('${slot.id}')" ondragover="geometryWorkshopDragOver(event)" ondrop="geometryWorkshopDrop(event,'${slot.id}')" aria-label="${slot.role || 'Vị trí ghép hình'}">${piece ? shapeSvg_(piece, { showNumber: piece.number != null }) : slotCue_(slot)}${label}</button>`;
    }).join('');
  }

  function renderDock_() {
    const available = st.pieces.filter(p => !isUsed_(p.id));
    const box = document.getElementById('gm6-dock');
    if (!box) return;
    box.innerHTML = available.map(p => {
      const selected = st.selectedId === p.id;
      const c = color_(p.color);
      const numberLabel = p.number != null ? `<span class="gm6-mini-chip">Số ${p.number}</span>` : '';
      const oriLabel = cfg_().checks.orientation && (p.shape === 'rect' || p.shape === 'triangle') ? `<span class="gm6-mini-chip">${orientationLabel_(p)}</span>` : '';
      return `<button type="button" class="gm6-piece-card ${selected ? 'is-selected' : ''}" style="--pc:${c.hex};--ps:${c.soft}" onclick="geometryWorkshopSelect('${p.id}')" draggable="true" ondragstart="geometryWorkshopDragStart(event,'${p.id}')" aria-label="${shapeName_(p.shape)} ${c.name}${p.number != null ? ' số '+p.number : ''}">
        <div class="gm6-piece-visual">${shapeSvg_(p, { showNumber: p.number != null })}</div>
        <div class="gm6-piece-name">${shapeName_(p.shape).replace('hình ','')}</div>
        <div class="gm6-piece-meta"><span class="gm6-mini-chip">${c.name}</span>${numberLabel}${oriLabel}</div>
      </button>`;
    }).join('');
  }

  function orientationLabel_(p) {
    if (p.shape === 'rect') return p.orientation === 'v' ? 'dọc' : 'ngang';
    if (p.shape === 'triangle') return ({up:'hướng lên',down:'hướng xuống',left:'hướng trái',right:'hướng phải'})[p.orientation] || 'hướng lên';
    return '';
  }

  function renderPanel_() {
    const cfg = cfg_();
    const count = Object.keys(st.placed).length;
    const total = st.slots.length;
    const panel = document.getElementById('gm6-panel');
    if (!panel) return;
    panel.innerHTML = `
      <div class="gm6-panel-top">
        <div class="gm6-level-title">${cfg.title}</div>
        <div class="gm6-skill-pill">🎯 ${cfg.skill}</div>
      </div>
      <div class="gm6-mission-card"><span>🐰</span><div><b>Cô Thỏ Hồng:</b><br>${cfg.mission}</div></div>
      <div class="gm6-progress"><div><span>Đã lắp</span><b>${count}/${total}</b></div><div class="gm6-progress-bar"><i style="width:${total ? (count/total*100) : 0}%"></i></div></div>
      <div id="gm6-feedback" class="gm6-feedback ${st.solved ? 'is-success' : ''}">${st.message || 'Con chọn một mảnh rồi đặt vào đúng khung nhé.'}</div>
      <div class="gm6-panel-actions">
        <button onclick="geometryWorkshopHint()" class="gm6-btn secondary">💡 Gợi ý</button>
        <button onclick="geometryWorkshopUndo()" class="gm6-btn secondary" ${count ? '' : 'disabled'}>↩️ Hoàn tác</button>
        <button onclick="geometryWorkshopReset()" class="gm6-btn secondary">🔄 Làm lại</button>
      </div>
      <button onclick="geometryWorkshopPrimary()" class="gm6-btn primary">${st.solved ? '✨ Mẫu mới' : '✅ Kiểm tra'}</button>
    `;
  }

  function renderLevelTabs_() {
    const tabs = document.getElementById('gm6-levels');
    if (!tabs) return;
    tabs.innerHTML = Object.keys(LEVELS).map(k => `<button onclick="geometryWorkshopLevel(${k})" class="gm6-level-btn ${Number(k) === st.level ? 'is-active' : ''}"><span>${k}</span><b>${LEVELS[k].skill}</b></button>`).join('');
  }

  function renderRecap_() {
    const recap = document.getElementById('gm6-recap');
    if (!recap) return;
    if (!st.solved) { recap.classList.add('hidden'); recap.innerHTML = ''; return; }
    const counts = {};
    st.slots.forEach(s => { counts[s.shape] = (counts[s.shape] || 0) + 1; });
    const summary = Object.keys(counts).map(shape => `${counts[shape]} ${shapeName_(shape)}`).join(' · ');
    recap.classList.remove('hidden');
    recap.innerHTML = `<div class="gm6-recap-card"><span class="gm6-recap-icon">✨</span><div><b>Con vừa ghép được một mô hình từ các hình học!</b><br><span>${summary}</span></div></div>`;
  }

  function render_() {
    const scene = document.getElementById('gm6-scene');
    if (scene) {
      scene.className = `gm6-scene level-${st.level} ${st.solved ? 'is-solved' : ''}`;
      scene.innerHTML = renderSceneDecor_() + `<div class="gm6-blueprint-label">${st.level <= 4 ? 'BẢNG LẮP HÌNH' : (st.level === 5 ? 'ĐOÀN TÀU HÌNH HỌC' : (st.challengeName || 'XƯỞNG THỬ THÁCH'))}</div><div class="gm6-slots">${renderSlots_()}</div>${st.solved ? '<div class="gm6-celebrate">⭐ HOÀN THÀNH! ⭐</div>' : ''}`;
    }
    renderDock_();
    renderPanel_();
    renderLevelTabs_();
    renderRecap_();
  }

  function mismatchReason_(piece, slot) {
    const checks = cfg_().checks;
    if (checks.shape && piece.shape !== slot.shape) return { kind: 'shape', text: `Chỗ này cần ${shapeName_(slot.shape)}. Con đang cầm ${shapeName_(piece.shape)}.` };
    if (checks.color && piece.color !== slot.color) return { kind: 'color', text: `Đúng hình rồi! Nhưng chỗ này cần màu ${color_(slot.color).name}.` };
    if (checks.orientation && normalizeOrientation_(piece.shape, piece.orientation) !== normalizeOrientation_(slot.shape, slot.orientation)) return { kind: 'orientation', text: `Đúng hình và màu rồi! Con xem lại hướng của mảnh nhé.` };
    if (checks.number && Number(piece.number) !== Number(slot.number)) return { kind: 'number', text: `Gần đúng rồi! Chỗ này cần số ${slot.number}, còn mảnh con chọn là số ${piece.number}.` };
    return null;
  }

  function place_(slotId, pieceId) {
    if (st.solved) return;
    const slot = slotById_(slotId);
    const piece = pieceById_(pieceId);
    if (!slot || !piece || isUsed_(piece.id)) return;
    const reason = mismatchReason_(piece, slot);
    if (reason) {
      st.wrongAttempts++;
      st.hintSlot = slot.id;
      st.message = reason.text + ' Con thử lại nhé.';
      render_();
      flashWrong_(slot.id);
      return;
    }

    // Return previous piece in this slot, if any.
    if (st.placed[slot.id]) delete st.placed[slot.id];
    st.placed[slot.id] = piece.id;
    st.selectedId = null;
    st.hintSlot = null;
    st.message = praiseFor_(piece, slot);
    render_();
    popSlot_(slot.id);
    if (Object.keys(st.placed).length === st.slots.length) later_(check_, 220);
  }

  function praiseFor_(piece, slot) {
    const checks = cfg_().checks;
    if (checks.number) return `Chuẩn rồi: ${shapeName_(piece.shape)} màu ${color_(piece.color).name}, số ${piece.number}!`;
    if (checks.color) return `Đúng rồi: ${shapeName_(piece.shape)} màu ${color_(piece.color).name}!`;
    return `Đúng ${shapeName_(piece.shape)} rồi! Con làm tiếp nhé.`;
  }

  function check_() {
    if (st.solved) return;
    if (Object.keys(st.placed).length < st.slots.length) {
      const empty = st.slots.find(s => !st.placed[s.id]);
      st.hintSlot = empty ? empty.id : null;
      st.message = `Còn ${st.slots.length - Object.keys(st.placed).length} chỗ chưa lắp. Cô đã làm sáng một chỗ cho con.`;
      render_();
      return;
    }
    const bad = st.slots.find(s => {
      const p = placedPiece_(s.id);
      return !p || mismatchReason_(p, s);
    });
    if (bad) {
      st.hintSlot = bad.id;
      st.message = 'Có một mảnh chưa đúng. Con xem chỗ đang sáng nhé.';
      render_();
      return;
    }
    success_();
  }

  function success_() {
    st.solved = true;
    st.wins++;
    st.hintSlot = null;
    st.selectedId = null;
    if (st.level === 5) st.message = 'Tuyệt lắm! Đoàn tàu đã đủ các mảnh. Tàu chuẩn bị chạy!';
    else if (st.level === 6) st.message = 'Xuất sắc! Mô hình nhiều điều kiện đã hoàn thành.';
    else st.message = 'Giỏi lắm! Tất cả các hình đã về đúng vị trí.';
    render_();
    celebrate_();
    if (typeof speakVietnamese === 'function') {
      const say = st.level <= 2 ? 'Giỏi lắm! Con đã ghép đúng các hình rồi.' : 'Giỏi lắm! Con đã quan sát rất kỹ hình, màu và các dấu hiệu.';
      later_(() => speakVietnamese(say, 0.9), 120);
    }
    if (st.wins > 0 && st.wins % 10 === 0 && typeof rewardMiniGameStar_ === 'function') rewardMiniGameStar_('Bé đã hoàn thành 10 mô hình hình học!');
  }

  function celebrate_() {
    if (typeof confetti === 'function') {
      try { confetti({ particleCount: 90, spread: 75, origin: { y: 0.64 } }); } catch (_) {}
    }
  }

  function flashWrong_(slotId) {
    later_(() => {
      const el = document.querySelector(`[data-slot="${slotId}"]`);
      if (!el) return;
      el.classList.add('is-wrong');
      later_(() => el.classList.remove('is-wrong'), 440);
    }, 20);
  }

  function popSlot_(slotId) {
    later_(() => {
      const el = document.querySelector(`[data-slot="${slotId}"]`);
      if (!el) return;
      el.classList.add('is-pop');
      later_(() => el.classList.remove('is-pop'), 420);
    }, 20);
  }

  function hint_() {
    if (st.solved) return;
    const empty = st.slots.find(s => !st.placed[s.id]);
    const target = empty || st.slots[0];
    st.hintSlot = target.id;
    const checks = cfg_().checks;
    const parts = [shapeName_(target.shape)];
    if (checks.color) parts.push('màu ' + color_(target.color).name);
    if (checks.orientation && (target.shape === 'rect' || target.shape === 'triangle')) parts.push(orientationLabel_(target));
    if (checks.number) parts.push('số ' + target.number);
    st.message = `Gợi ý: chỗ đang sáng cần ${parts.join(', ')}.`;
    render_();
  }

  function undo_() {
    if (st.solved) return;
    const keys = Object.keys(st.placed);
    if (!keys.length) return;
    const last = keys[keys.length - 1];
    delete st.placed[last];
    st.selectedId = null;
    st.hintSlot = null;
    st.message = 'Cô đã đưa mảnh cuối về kho. Con thử cách khác nhé.';
    render_();
  }

  function shell_() {
    const root = document.getElementById('game-play-container');
    if (!root) return;
    injectCss_();
    root.innerHTML = `
      <div class="gm6-app">
        <div class="gm6-topbar">
          <div>
            <div class="gm6-kicker">🧩 GAME 6 · HÌNH HỌC</div>
            <h3>Xưởng ghép hình kỳ diệu</h3>
            <p>Chọn mảnh → đặt vào đúng chỗ → mô hình hoạt động.</p>
          </div>
          <button class="gm6-listen" onclick="geometryWorkshopSpeak()">🔊 Nghe cách chơi</button>
        </div>
        <div id="gm6-levels" class="gm6-levels"></div>
        <div class="gm6-main">
          <div class="gm6-left">
            <div id="gm6-scene" class="gm6-scene"></div>
            <div class="gm6-dock-wrap">
              <div class="gm6-dock-head"><span>🧰 Kho mảnh ghép</span><small>Chạm mảnh rồi chạm vị trí đặt · hoặc kéo thả</small></div>
              <div id="gm6-dock" class="gm6-dock"></div>
            </div>
          </div>
          <aside id="gm6-panel" class="gm6-panel"></aside>
        </div>
        <div id="gm6-recap" class="gm6-recap hidden"></div>
      </div>`;
    render_();
  }

  function injectCss_() {
    if (document.getElementById('gm6-style')) return;
    const style = document.createElement('style');
    style.id = 'gm6-style';
    style.textContent = `
      .gm6-app{--ink:#17345c;--muted:#61738d;font-family:'Quicksand','Nunito',sans-serif;color:var(--ink);width:100%;}
      .gm6-topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:10px;padding:2px 2px 0}.gm6-kicker{font-size:14px;font-weight:1000;color:#7c3aed;letter-spacing:.06em}.gm6-topbar h3{font-size:22px;line-height:1.1;margin:3px 0 2px;font-weight:1000;color:#264d8d}.gm6-topbar p{font-size:16px;font-weight:800;color:#6b7890;margin:0}.gm6-listen{border:1.5px solid #c4b5fd;background:#f5f3ff;color:#6d28d9;border-radius:14px;padding:10px 14px;font-size:16px;font-weight:1000;white-space:nowrap}
      .gm6-levels{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;margin-bottom:10px}.gm6-level-btn{min-height:66px;border:1px solid #dbe4f2;background:#fff;border-radius:15px;padding:8px 6px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:#52647e;box-shadow:0 2px 8px rgba(30,64,175,.05);transition:.16s}.gm6-level-btn span{width:26px;height:26px;border-radius:999px;background:#edf2f7;display:flex;align-items:center;justify-content:center;font-weight:1000;font-size:14px}.gm6-level-btn b{font-size:16px;line-height:1.14}.gm6-level-btn:hover{transform:translateY(-1px);border-color:#a78bfa}.gm6-level-btn.is-active{background:linear-gradient(135deg,#6d8cff,#8b5cf6);border-color:#6d5ce7;color:#fff;box-shadow:0 6px 15px rgba(99,102,241,.22)}.gm6-level-btn.is-active span{background:#fff;color:#6d28d9}
      .gm6-main{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:12px;align-items:start}.gm6-left{min-width:0}.gm6-scene{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:24px;border:1px solid #cae3ff;background:linear-gradient(#bcecff 0 47%,#a7dc8b 47% 70%,#d8b27b 70% 100%);box-shadow:0 10px 25px rgba(53,91,135,.10)}
      .gm6-workshop-window{position:absolute;inset:0;background:linear-gradient(180deg,#d8f4ff 0 43%,#c8efac 43% 68%,#ddb983 68%);}.gm6-workshop-window:after{content:'';position:absolute;left:5%;right:5%;top:7%;height:58%;border-radius:18px;background:linear-gradient(#8ed5ff 0 54%,#91ce74 54%);border:8px solid rgba(255,255,255,.75);box-shadow:inset 0 0 0 3px rgba(59,130,246,.12)}.gm6-workshop-window:before{content:'';position:absolute;left:50%;top:9%;bottom:36%;width:8px;background:rgba(255,255,255,.72);z-index:1}
      .gm6-table-line{position:absolute;left:0;right:0;bottom:0;height:28%;background:linear-gradient(#d4a266,#bd8450);border-top:8px solid #8a5a33;box-shadow:inset 0 9px rgba(255,255,255,.15)}.gm6-shelf{position:absolute;left:7%;top:17%;z-index:3;display:flex;gap:8px;padding:7px 12px;border-radius:10px;background:#8a5a33;border-bottom:5px solid #714522;color:white;font-size:22px;box-shadow:0 4px 8px rgba(75,50,25,.2)}.gm6-gear{position:absolute;z-index:2;font-size:34px;opacity:.68;animation:gm6spin 9s linear infinite}.gm6-gear.g1{right:10%;top:15%}.gm6-gear.g2{right:16%;top:30%;font-size:25px;animation-direction:reverse}.gm6-rabbit{position:absolute;right:3%;bottom:9%;z-index:7;font-size:50px;filter:drop-shadow(0 4px 4px rgba(0,0,0,.18));transition:1s}.gm6-space-rabbit{bottom:8%;font-size:44px}.gm6-scene.is-solved .gm6-rabbit{transform:translateX(-18px) translateY(-8px) rotate(-8deg)}
      .gm6-blueprint-label{position:absolute;left:50%;top:5%;transform:translateX(-50%);z-index:8;background:rgba(255,255,255,.92);border:1px solid #bfdbfe;border-radius:999px;padding:7px 16px;font-size:12px;font-weight:1000;color:#285491;box-shadow:0 4px 12px rgba(30,64,175,.10);white-space:nowrap}.gm6-slots{position:absolute;inset:0;z-index:6}.gm6-slot{position:absolute;border:0;background:transparent;padding:0;display:flex;align-items:center;justify-content:center;transition:.15s;cursor:pointer}.gm6-slot .gm6-shape-svg{width:100%;height:100%;filter:drop-shadow(0 4px 5px rgba(23,52,92,.12))}.gm6-slot:hover{transform:scale(1.03)}.gm6-slot.is-hint{filter:drop-shadow(0 0 10px rgba(250,204,21,.95));animation:gm6hint 1.1s ease-in-out infinite}.gm6-slot.is-wrong{animation:gm6shake .36s}.gm6-slot.is-pop{animation:gm6pop .38s}.gm6-slot-role{position:absolute;left:50%;bottom:-14px;transform:translateX(-50%);background:rgba(255,255,255,.9);border-radius:999px;padding:2px 7px;font-size:10px;font-weight:1000;color:#60748f;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.08)}
      .gm6-scene.level-5{background:linear-gradient(#99ddff 0 50%,#80c96f 50% 68%,#8c735c 68%)}.gm6-scene.level-6{background:linear-gradient(#bde9ff 0 48%,#bddf9c 48% 70%,#cfaa78 70%)}.gm6-scene.level-6:has(.gm6-night-sky){background:#172554}.gm6-scene-sun{position:absolute;width:70px;height:70px;border-radius:50%;background:#ffe36d;left:7%;top:9%;box-shadow:0 0 30px #ffe36d}.gm6-hill{position:absolute;border-radius:50% 50% 0 0;background:#68b95f;bottom:29%;height:31%;width:55%}.gm6-hill.h1{left:-10%}.gm6-hill.h2{right:-14%;background:#7dc56b;height:25%}.gm6-track{position:absolute;left:0;right:0;bottom:10%;height:13%;border-top:6px solid #57433b;border-bottom:6px solid #57433b;background:#8d8179;display:flex;justify-content:space-around;align-items:center}.gm6-track span{width:7px;height:100%;background:#5a463d;transform:rotate(10deg)}.gm6-station{position:absolute;right:5%;top:18%;padding:10px 13px;background:#fff6dc;border:5px solid #d88d4d;border-radius:8px;text-align:center;font-size:9px;font-weight:900;color:#934c20;transform:rotate(2deg)}.gm6-station b{font-size:11px}.gm6-scene.level-5.is-solved .gm6-slots{animation:gm6train 1.7s ease-in-out .2s 1 forwards}
      .gm6-night-sky{position:absolute;inset:0;background:linear-gradient(#172554,#312e81 66%,#4c1d95)}.gm6-night-sky i{position:absolute;width:5px;height:5px;background:#fff;border-radius:50%;box-shadow:0 0 9px #fff}.gm6-night-sky i:nth-child(1){left:15%;top:19%}.gm6-night-sky i:nth-child(2){left:28%;top:8%}.gm6-night-sky i:nth-child(3){right:22%;top:16%}.gm6-night-sky i:nth-child(4){right:8%;top:33%}.gm6-night-sky i:nth-child(5){left:10%;top:50%}.gm6-moon{position:absolute;right:8%;top:8%;font-size:48px}.gm6-launch-pad{position:absolute;left:25%;right:25%;bottom:7%;height:8%;border-radius:50%;background:#59627c;box-shadow:0 8px 0 #343b52}.gm6-scene.level-6.is-solved:has(.gm6-night-sky) .gm6-slots{animation:gm6rocket 1.6s ease-in 0s 1 forwards}
      .gm6-celebrate{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:30;background:rgba(255,255,255,.96);border:2px solid #facc15;border-radius:20px;padding:12px 22px;font-size:20px;font-weight:1000;color:#7c3aed;box-shadow:0 12px 30px rgba(76,29,149,.22);animation:gm6pop .5s}
      .gm6-dock-wrap{margin-top:9px;background:linear-gradient(180deg,#f8fbff,#fff);border:1px solid #dbeafe;border-radius:20px;padding:10px 12px 12px}.gm6-dock-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px;color:#31527f}.gm6-dock-head span{font-size:16px;font-weight:1000}.gm6-dock-head small{font-size:14px;font-weight:800;color:#7a8ba3}.gm6-dock{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 6px;min-height:124px;align-items:stretch}.gm6-piece-card{flex:0 0 108px;min-height:116px;border:1px solid #dbe6f4;background:linear-gradient(180deg,#fff,var(--ps));border-radius:16px;padding:7px 6px 8px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 3px 9px rgba(24,61,105,.07);transition:.14s;cursor:grab}.gm6-piece-card:hover{transform:translateY(-2px);border-color:var(--pc)}.gm6-piece-card.is-selected{border-color:var(--pc);box-shadow:0 0 0 4px color-mix(in srgb,var(--pc) 22%,transparent),0 5px 14px rgba(24,61,105,.12);transform:translateY(-2px)}.gm6-piece-visual{width:66px;height:66px}.gm6-piece-visual .gm6-shape-svg{width:100%;height:100%;filter:drop-shadow(0 3px 3px rgba(23,52,92,.12))}.gm6-piece-name{font-size:14px;line-height:1.1;font-weight:1000;text-transform:capitalize;color:#2e4c75;margin-top:2px}.gm6-piece-meta{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;margin-top:4px}.gm6-mini-chip{font-size:11px;font-weight:1000;background:rgba(255,255,255,.85);border:1px solid rgba(100,116,139,.18);border-radius:999px;padding:2px 6px;color:#60738c}
      .gm6-panel{background:linear-gradient(180deg,#fff,#f9fbff);border:1px solid #dbeafe;border-radius:22px;padding:15px;box-shadow:0 8px 20px rgba(30,64,175,.07);min-height:360px}.gm6-panel-top{display:flex;flex-direction:column;gap:8px}.gm6-level-title{font-size:16px;font-weight:1000;color:#284d88}.gm6-skill-pill{align-self:flex-start;background:#eef2ff;border:1px solid #c7d2fe;color:#5b4fc4;border-radius:999px;padding:6px 10px;font-size:16px;font-weight:1000}.gm6-mission-card{margin-top:10px;border:1px solid #fbcfe8;background:linear-gradient(135deg,#fff1f7,#fff);border-radius:16px;padding:12px;display:flex;gap:10px;font-size:16px;line-height:1.45;font-weight:800;color:#4d5970}.gm6-mission-card>span{font-size:28px}.gm6-mission-card b{color:#be185d}.gm6-progress{margin-top:12px}.gm6-progress>div:first-child{display:flex;justify-content:space-between;align-items:center;font-size:16px;font-weight:1000;color:#60728b}.gm6-progress>div:first-child b{font-size:18px;color:#2563eb}.gm6-progress-bar{height:10px;border-radius:999px;background:#e8eef8;overflow:hidden;margin-top:6px}.gm6-progress-bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#38bdf8,#8b5cf6);transition:.3s}.gm6-feedback{margin-top:12px;min-height:76px;border-radius:16px;border:1px solid #dbeafe;background:#f4f9ff;padding:12px 13px;font-size:16px;line-height:1.5;font-weight:900;color:#395779}.gm6-feedback.is-success{border-color:#86efac;background:#ecfdf5;color:#166534}.gm6-panel-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.gm6-panel-actions .gm6-btn:last-child{grid-column:1/3}.gm6-btn{border:0;border-radius:13px;padding:11px 10px;font-size:16px;font-weight:1000;transition:.14s}.gm6-btn:disabled{opacity:.38;cursor:not-allowed}.gm6-btn.secondary{background:#f4f6fa;color:#52637d;border:1px solid #dbe2ec}.gm6-btn.secondary:hover:not(:disabled){background:#ebf1f8}.gm6-btn.primary{width:100%;margin-top:10px;background:linear-gradient(135deg,#ec4899,#8b5cf6);color:#fff;font-size:18px;padding:13px;box-shadow:0 6px 14px rgba(168,85,247,.21)}
      .gm6-recap{margin-top:12px}.gm6-recap.hidden{display:none}.gm6-recap-card{border:1.5px solid #c4b5fd;background:linear-gradient(135deg,#faf5ff,#eff6ff);border-radius:18px;padding:12px 14px;display:flex;align-items:center;gap:10px;font-size:16px;color:#4f4a78;font-weight:800}.gm6-recap-card b{font-size:18px;color:#6d28d9}.gm6-recap-icon{font-size:30px}
      @keyframes gm6spin{to{transform:rotate(360deg)}}@keyframes gm6hint{50%{transform:scale(1.06)}}@keyframes gm6shake{20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}@keyframes gm6pop{0%{transform:scale(.8)}70%{transform:scale(1.08)}100%{transform:scale(1)}}@keyframes gm6train{0%{transform:translateX(0)}40%{transform:translateX(5%)}100%{transform:translateX(120%)}}@keyframes gm6rocket{0%{transform:translateY(0)}25%{transform:translateY(-5%)}100%{transform:translateY(-130%)}}
      @media(max-width:900px){.gm6-main{grid-template-columns:1fr}.gm6-panel{min-height:0}.gm6-panel-actions{grid-template-columns:repeat(3,1fr)}.gm6-panel-actions .gm6-btn:last-child{grid-column:auto}.gm6-levels{grid-template-columns:repeat(3,1fr)}.gm6-level-btn{min-height:47px}.gm6-panel{padding:11px}.gm6-feedback{min-height:52px}}
      @media(max-width:600px){.gm6-topbar h3{font-size:20px}.gm6-topbar p{font-size:14px}.gm6-listen{padding:8px 10px;font-size:13px}.gm6-level-btn b{font-size:12px}.gm6-scene{border-radius:18px}.gm6-blueprint-label{font-size:11px;padding:5px 10px}.gm6-rabbit{font-size:37px}.gm6-dock{min-height:104px}.gm6-piece-card{flex-basis:88px;min-height:96px}.gm6-piece-visual{width:56px;height:56px}.gm6-piece-name{font-size:12px}.gm6-mini-chip{font-size:10px}.gm6-dock-head small{display:none}.gm6-slot-role{display:none}.gm6-skill-pill,.gm6-mission-card,.gm6-progress>div:first-child,.gm6-feedback,.gm6-btn,.gm6-recap-card{font-size:14px}.gm6-btn.primary{font-size:16px}}
    `;
    document.head.appendChild(style);
  }

  window.geometryWorkshopSelect = function (id) {
    if (st.solved || isUsed_(id)) return;
    st.selectedId = st.selectedId === id ? null : id;
    st.hintSlot = null;
    const p = pieceById_(id);
    st.message = st.selectedId && p ? `Đã chọn ${shapeName_(p.shape)}${cfg_().checks.color ? ' màu '+color_(p.color).name : ''}${cfg_().checks.number && p.number != null ? ', số '+p.number : ''}. Bây giờ con chạm vào chỗ muốn đặt.` : 'Con chọn một mảnh khác nhé.';
    render_();
  };

  window.geometryWorkshopSlot = function (slotId) {
    if (st.solved) return;
    if (st.placed[slotId]) {
      const pid = st.placed[slotId];
      delete st.placed[slotId];
      st.selectedId = pid;
      st.message = 'Mảnh này đã quay về tay con. Con có thể đặt sang chỗ khác.';
      render_();
      return;
    }
    if (!st.selectedId) {
      st.hintSlot = slotId;
      st.message = 'Con chọn một mảnh ở kho phía dưới trước nhé.';
      render_();
      return;
    }
    place_(slotId, st.selectedId);
  };

  window.geometryWorkshopDragStart = function (ev, id) {
    st.selectedId = id;
    try { ev.dataTransfer.setData('text/plain', id); ev.dataTransfer.effectAllowed = 'move'; } catch (_) {}
  };
  window.geometryWorkshopDragOver = function (ev) { ev.preventDefault(); };
  window.geometryWorkshopDrop = function (ev, slotId) {
    ev.preventDefault();
    let id = st.selectedId;
    try { id = ev.dataTransfer.getData('text/plain') || id; } catch (_) {}
    if (id) place_(slotId, id);
  };
  window.geometryWorkshopHint = hint_;
  window.geometryWorkshopUndo = undo_;
  window.geometryWorkshopReset = function () { st.round--; newRound_(); };
  window.geometryWorkshopPrimary = function () { if (st.solved) newRound_(); else check_(); };
  window.geometryWorkshopLevel = function (level) {
    level = Number(level);
    if (!LEVELS[level]) return;
    st.level = level;
    st.round = 0;
    st.lastVariant = -1;
    newRound_();
  };
  window.geometryWorkshopSpeak = function () {
    if (typeof speakVietnamese !== 'function') return;
    speakVietnamese('Con chọn một mảnh ở kho phía dưới, rồi chạm vào vị trí muốn đặt. Cấp đầu chỉ cần đúng hình. Cấp sau con sẽ nhìn thêm màu, hướng và số. Nếu chưa biết, con bấm Gợi ý nhé.', 0.88);
  };

  // Keep the old public start/stop names so app.js only needs a title/version update.
  window.stopConstructionMemoryGame = function () {
    gameActive_ = false;
    clearGameTimers_();
    stopGameAudio_();
    st.selectedId = null;
  };
  window.startConstructionMemoryGame = function () {
    clearGameTimers_();
    gameActive_ = true;
    shell_();
    if (!st.round) newRound_();
    else render_();
  };
})();
