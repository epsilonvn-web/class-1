(() => {
  "use strict";

  const MODULE_KEY = "calculator";
  const STYLE_ID = "class1-tools-calculator-style";

  let activeContext = null;
  let expression = "";
  let lastAnswer = 0;
  let memory = 0;
  let angleMode = "DEG";
  let justEvaluated = false;
  let currentResultDisplay = "";
  let historyItems = [];

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ee-calc-page{max-width:860px;margin:0 auto}
      .ee-calc-page .section-heading{margin-bottom:.7rem}
      .ee-calc-stage{display:flex;justify-content:center;align-items:flex-start;padding:.15rem 0 1rem}
      .ee-calculator{
        width:min(100%,468px);
        border-radius:24px;
        padding:14px 14px 16px;
        background:linear-gradient(180deg,#312E81 0%,#6D28D9 20%,#F5EFFF 20.1%,#F7F2FF 100%);
        border:1px solid #C4B5FD;
        box-shadow:0 16px 34px rgba(124,58,237,.18), inset 0 1px 0 rgba(255,255,255,.7);
        user-select:none;
      }
      .ee-calc-brand{display:flex;align-items:flex-end;justify-content:space-between;gap:.8rem;padding:2px 6px 10px;color:#fff}
      .ee-calc-brand strong{font-size:18px;font-weight:1000;line-height:1;letter-spacing:.02em}
      .ee-calc-brand span{font-size:10px;line-height:1.2;font-weight:900;letter-spacing:.08em;text-transform:uppercase;opacity:.95}

      .ee-calc-screen{
        border-radius:17px;
        background:linear-gradient(180deg,#FEFCF1 0%,#FFFDF5 100%);
        border:3px solid #3B2F63;
        box-shadow:inset 0 2px 8px rgba(59,47,99,.12),0 3px 10px rgba(49,46,129,.12);
        padding:11px 12px 10px;
        margin-bottom:12px;
      }
      .ee-calc-status{display:flex;align-items:center;justify-content:space-between;gap:.5rem;margin-bottom:5px;color:#4C1D95;font-family:"Courier New",monospace;font-size:12px;font-weight:900;line-height:1.2}
      .ee-calc-memory-flag{min-width:18px;text-align:right;color:#7C3AED}
      .ee-calc-history-panel{
        min-height:120px;
        border-radius:12px;
        background:rgba(124,58,237,.06);
        border:1px solid rgba(124,58,237,.14);
        padding:8px 10px;
        display:grid;
        grid-template-rows:repeat(5,minmax(18px,1fr));
        gap:3px;
      }
      .ee-calc-history-line{
        font-family:"Courier New",monospace;
        font-size:24px;
        font-weight:1000;
        line-height:1.18;
        color:#7C3AED;
        text-align:right;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .ee-calc-history-line.is-empty{opacity:.18}
      .ee-calc-divider{height:1px;background:rgba(76,29,149,.18);margin:8px 1px 8px}
      .ee-calc-result{
        min-height:25px;
        color:#7C3AED;
        font-family:"Courier New",monospace;
        font-size:24px;
        font-weight:1000;
        line-height:1.2;
        text-align:right;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .ee-calc-expression{
        min-height:30px;
        color:#111827;
        font-family:"Courier New",monospace;
        font-size:28px;
        font-weight:1000;
        line-height:1.1;
        text-align:right;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }

      .ee-calc-mode-row{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin-bottom:7px}
      .ee-calc-sci-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px;margin-bottom:8px}
      .ee-calc-main-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}

      .ee-calc-key{
        min-height:42px;
        border:none;
        border-radius:12px;
        background:linear-gradient(180deg,#FFFFFF 0%,#E7ECF4 100%);
        box-shadow:0 3px 0 #C9D2DE,0 5px 10px rgba(44,62,80,.10), inset 0 1px 0 rgba(255,255,255,.92);
        color:#0F172A;
        font-family:"Nunito","Segoe UI",Arial,sans-serif;
        font-size:18px;
        font-weight:1000;
        line-height:1;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:0 4px;
        transition:transform .07s ease, filter .08s ease, box-shadow .08s ease;
      }
      .ee-calc-key:hover{filter:brightness(1.03)}
      .ee-calc-key:active{transform:translateY(2px);box-shadow:0 1px 0 #C9D2DE,0 2px 5px rgba(44,62,80,.10), inset 0 1px 0 rgba(255,255,255,.92)}
      .ee-calc-key.mode{min-height:34px;font-size:12px;background:linear-gradient(180deg,#4C1D95 0%,#6D28D9 100%);box-shadow:0 3px 0 #4B1FB1,0 5px 10px rgba(76,29,149,.18), inset 0 1px 0 rgba(255,255,255,.14);color:#fff;letter-spacing:.02em}
      .ee-calc-key.mode.soft{background:linear-gradient(180deg,#7C3AED 0%,#8B5CF6 100%)}
      .ee-calc-key.mode.muted{background:linear-gradient(180deg,#64748B 0%,#475569 100%);box-shadow:0 3px 0 #334155,0 5px 10px rgba(51,65,85,.16), inset 0 1px 0 rgba(255,255,255,.15)}
      .ee-calc-key.mode.is-active{outline:2px solid #FDE68A;outline-offset:-2px}
      .ee-calc-key.sci{min-height:39px;font-size:16px}
      .ee-calc-key.num{font-size:19px}
      .ee-calc-key.op{font-size:24px;background:linear-gradient(180deg,#EEF2FF 0%,#DDE6FF 100%);box-shadow:0 3px 0 #C5D2F5,0 5px 10px rgba(88,116,182,.12), inset 0 1px 0 rgba(255,255,255,.9)}
      .ee-calc-key.control{background:linear-gradient(180deg,#F59E0B 0%,#F97316 100%);box-shadow:0 3px 0 #C2410C,0 5px 10px rgba(194,65,12,.14), inset 0 1px 0 rgba(255,255,255,.18);color:#231204;font-size:15px}
      .ee-calc-key.equal{background:linear-gradient(180deg,#C4B5FD 0%,#8B5CF6 100%);box-shadow:0 3px 0 #6D28D9,0 5px 10px rgba(109,40,217,.16), inset 0 1px 0 rgba(255,255,255,.3);color:#25124F;font-size:26px}
      .ee-calc-key.wide-label{font-size:14px}
      .ee-calc-note{margin:.75rem 0 0;text-align:center;color:#6B7280;font-size:12px;font-weight:800;line-height:1.4}

      @media(max-width:560px){
        .ee-calculator{width:min(100%,440px);padding:12px 12px 14px;border-radius:20px}
        .ee-calc-screen{padding:10px 10px 9px;border-radius:15px}
        .ee-calc-history-panel{min-height:108px;padding:7px 8px}
        .ee-calc-history-line{font-size:22px}
        .ee-calc-result{font-size:22px}
        .ee-calc-expression{font-size:25px}
        .ee-calc-key{min-height:40px;font-size:17px}
        .ee-calc-key.sci{min-height:38px;font-size:15px}
        .ee-calc-key.mode{min-height:32px;font-size:11px}
        .ee-calc-main-grid{gap:7px}
      }
    `;
    document.head.appendChild(style);
  }

  function showToast(message) {
    if (activeContext && activeContext.hooks && typeof activeContext.hooks.showToast === "function") {
      activeContext.hooks.showToast(String(message || ""));
    }
  }

  function calculatorHtml() {
    const sciButtons = [
      ["sin", "func", "sin"], ["cos", "func", "cos"], ["tan", "func", "tan"],
      ["log", "func", "log"], ["ln", "func", "ln"], ["√", "func", "sqrt"],
      ["x²", "square", ""], ["x³", "cube", ""], ["xʸ", "value", "^"],
      ["1/x", "reciprocal", ""], ["π", "value", "pi"], ["e", "value", "e"],
      ["(", "value", "("], [")", "value", ")"], ["%", "percent", ""],
      ["Ans", "ans", ""], ["M+", "memory-add", ""], ["MR", "memory-recall", ""]
    ].map(([label, action, value]) => `<button class="ee-calc-key sci${label.length > 3 ? " wide-label" : ""}" type="button" data-action="${action}"${value ? ` data-value="${value}"` : ""}>${label}</button>`).join("");

    const mainButtons = [
      ["7","value","7","num"],["8","value","8","num"],["9","value","9","num"],["DEL","delete","","control"],["AC","clear","","control"],
      ["4","value","4","num"],["5","value","5","num"],["6","value","6","num"],["×","value","*","op"],["÷","value","/","op"],
      ["1","value","1","num"],["2","value","2","num"],["3","value","3","num"],["+","value","+","op"],["−","value","-","op"],
      ["0","value","0","num"],[".","value",".","num"],["(+/−)","negate","","wide-label"],["Ans","ans","","wide-label"],["=","evaluate","","equal"]
    ].map(([label, action, value, cls]) => `<button class="ee-calc-key ${cls}" type="button" data-action="${action}"${value ? ` data-value="${value}"` : ""}>${label}</button>`).join("");

    return `
      <div class="ee-calc-page">
        <div class="section-heading">
          <div><h1>🧮 Calculator</h1><p>Máy tính khoa học Epsilon Edu cho bé.</p></div>
          <button id="ee-calculator-back" class="back-btn" type="button">← Tools</button>
        </div>
        <div class="ee-calc-stage">
          <section class="ee-calculator" id="ee-calculator" aria-label="Máy tính khoa học Epsilon Edu" tabindex="0">
            <div class="ee-calc-brand"><strong>Epsilon Edu</strong><span>Scientific Calculator</span></div>
            <div class="ee-calc-screen" aria-live="polite">
              <div class="ee-calc-status"><span id="ee-calc-angle">DEG</span><span id="ee-calc-memory" class="ee-calc-memory-flag"></span></div>
              <div id="ee-calc-history" class="ee-calc-history-panel"></div>
              <div class="ee-calc-divider"></div>
              <div id="ee-calc-result" class="ee-calc-result">0</div>
              <div id="ee-calc-expression" class="ee-calc-expression">0</div>
            </div>
            <div class="ee-calc-mode-row">
              <button class="ee-calc-key mode soft is-active" type="button" data-action="angle" data-value="DEG">DEG</button>
              <button class="ee-calc-key mode muted" type="button" data-action="angle" data-value="RAD">RAD</button>
              <button class="ee-calc-key mode muted" type="button" data-action="memory-clear">MC</button>
              <button class="ee-calc-key mode muted" type="button" data-action="clear">CLR</button>
              <button class="ee-calc-key mode muted" type="button" data-action="delete">⌫</button>
              <button class="ee-calc-key mode" type="button" data-action="evaluate">CALC</button>
            </div>
            <div class="ee-calc-sci-grid">${sciButtons}</div>
            <div class="ee-calc-main-grid">${mainButtons}</div>
          </section>
        </div>
        <p class="ee-calc-note">Hiển thị theo chuẩn 123,456,789.123 cho cả phép nhập và kết quả.</p>
      </div>`;
  }

  function renderCalculator() {
    const host = activeContext && activeContext.host;
    if (!host) return;
    host.innerHTML = calculatorHtml();
    host.querySelector("#ee-calculator-back")?.addEventListener("click", () => {
      if (activeContext && typeof activeContext.back === "function") activeContext.back();
    });
    const calc = host.querySelector("#ee-calculator");
    calc?.addEventListener("click", handleButtonClick);
    calc?.addEventListener("keydown", handleKeyboard);
    updateDisplay();
    calc?.focus({ preventScroll: true });
  }

  function currentEls() {
    const host = activeContext && activeContext.host;
    if (!host) return {};
    return {
      history: host.querySelector("#ee-calc-history"),
      expression: host.querySelector("#ee-calc-expression"),
      result: host.querySelector("#ee-calc-result"),
      angle: host.querySelector("#ee-calc-angle"),
      memory: host.querySelector("#ee-calc-memory")
    };
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDisplayNumberString(raw) {
    const value = String(raw || "");
    if (!value) return "";
    if (/e/i.test(value)) {
      const parts = value.split(/e/i);
      const mantissa = formatDisplayNumberString(parts[0]);
      return `${mantissa}e${parts[1] || ""}`;
    }
    let sign = "";
    let core = value;
    if (core.startsWith("-")) {
      sign = "−";
      core = core.slice(1);
    } else if (core.startsWith("+")) {
      sign = "+";
      core = core.slice(1);
    }
    const [intPartRaw, decimalPart] = core.split(".");
    const intPart = (intPartRaw || "0").replace(/^0+(?=\d)/, "") || "0";
    const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return sign + grouped + (decimalPart !== undefined ? `.${decimalPart}` : "");
  }

  function prettyExpression(raw) {
    const source = String(raw || "");
    let out = "";
    for (let i = 0; i < source.length;) {
      const ch = source[i];
      if (/\d/.test(ch) || (ch === "." && /\d/.test(source[i + 1] || ""))) {
        const match = source.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?/i);
        if (match) {
          out += formatDisplayNumberString(match[0]);
          i += match[0].length;
          continue;
        }
      }
      if (/[A-Za-z]/.test(ch)) {
        const match = source.slice(i).match(/^[A-Za-z]+/);
        const token = match ? match[0] : ch;
        const lower = token.toLowerCase();
        if (lower === "sqrt") out += "√";
        else if (lower === "pi") out += "π";
        else out += token;
        i += token.length;
        continue;
      }
      if (ch === "*") out += "×";
      else if (ch === "/") out += "÷";
      else if (ch === "-") out += "−";
      else out += ch;
      i += 1;
    }
    return out || "0";
  }

  function updateDisplay() {
    const els = currentEls();
    if (els.angle) els.angle.textContent = angleMode;
    if (els.memory) els.memory.textContent = Math.abs(memory) > 1e-15 ? "M" : "";
    if (els.result) els.result.textContent = currentResultDisplay || "0";
    if (els.expression) els.expression.textContent = prettyExpression(expression || "0");
    if (els.history) els.history.innerHTML = renderHistoryMarkup();

    const host = activeContext && activeContext.host;
    host?.querySelectorAll('[data-action="angle"]').forEach((button) => {
      const isActive = button.dataset.value === angleMode;
      button.classList.toggle("is-active", isActive);
      button.classList.toggle("soft", isActive);
      button.classList.toggle("muted", !isActive);
    });
  }

  function renderHistoryMarkup() {
    const visible = historyItems.slice(-5);
    const blanks = Math.max(0, 5 - visible.length);
    const rows = [];
    for (let i = 0; i < blanks; i += 1) rows.push('<div class="ee-calc-history-line is-empty">&nbsp;</div>');
    visible.forEach((item) => {
      rows.push(`<div class="ee-calc-history-line">${escapeHtml(item.expression)} = ${escapeHtml(item.result)}</div>`);
    });
    return rows.join("");
  }

  function beginsNewExpression(value) {
    return /^[0-9.(]$/.test(value) || value === "pi" || value === "e";
  }

  function appendValue(value) {
    const token = String(value || "");
    if (!token) return;
    if (justEvaluated) {
      if (beginsNewExpression(token)) {
        expression = "";
        currentResultDisplay = "";
      } else if (/^[+\-*/^]$/.test(token)) {
        expression = formatNumberRaw(lastAnswer);
        currentResultDisplay = "";
      }
      justEvaluated = false;
    }
    expression += token;
    updateDisplay();
  }

  function appendFunction(name) {
    if (justEvaluated) {
      expression = "";
      currentResultDisplay = "";
      justEvaluated = false;
    }
    expression += `${name}(`;
    updateDisplay();
  }

  function currentValueOrAnswer() {
    if (expression.trim()) return evaluateExpression(expression);
    return Number(lastAnswer || 0);
  }

  function pushHistory(rawExpression, numericResult) {
    historyItems.push({
      expression: prettyExpression(rawExpression),
      result: formatNumberDisplay(numericResult)
    });
    if (historyItems.length > 5) historyItems = historyItems.slice(-5);
  }

  function calculate() {
    if (!expression.trim()) return;
    try {
      const result = evaluateExpression(expression);
      lastAnswer = result;
      currentResultDisplay = formatNumberDisplay(result);
      pushHistory(expression, result);
      justEvaluated = true;
      updateDisplay();
    } catch (_) {
      showToast("Phép tính chưa hợp lệ. Bé kiểm tra lại nhé.");
    }
  }

  function handleButtonClick(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const value = button.dataset.value || "";

    if (action === "value") appendValue(value);
    else if (action === "func") appendFunction(value);
    else if (action === "clear") { expression = ""; currentResultDisplay = ""; justEvaluated = false; updateDisplay(); }
    else if (action === "delete") { expression = expression.slice(0, -1); currentResultDisplay = ""; justEvaluated = false; updateDisplay(); }
    else if (action === "evaluate") calculate();
    else if (action === "square") {
      const source = expression.trim() ? expression : (justEvaluated || lastAnswer ? formatNumberRaw(lastAnswer) : "");
      if (!source) return;
      expression = `(${source})^2`; currentResultDisplay = ""; justEvaluated = false; updateDisplay();
    }
    else if (action === "cube") {
      const source = expression.trim() ? expression : (justEvaluated || lastAnswer ? formatNumberRaw(lastAnswer) : "");
      if (!source) return;
      expression = `(${source})^3`; currentResultDisplay = ""; justEvaluated = false; updateDisplay();
    }
    else if (action === "reciprocal") {
      const source = expression.trim() ? expression : formatNumberRaw(lastAnswer || 0);
      expression = `1/(${source})`; currentResultDisplay = ""; justEvaluated = false; updateDisplay();
    }
    else if (action === "percent") {
      if (expression.trim()) expression = `(${expression})/100`;
      else if (justEvaluated || lastAnswer) expression = `(${formatNumberRaw(lastAnswer)})/100`;
      else return;
      currentResultDisplay = ""; justEvaluated = false; updateDisplay();
    }
    else if (action === "negate") {
      if (expression.trim()) expression = `-(${expression})`;
      else if (justEvaluated || lastAnswer) expression = `-(${formatNumberRaw(lastAnswer)})`;
      else expression = "-";
      currentResultDisplay = ""; justEvaluated = false; updateDisplay();
    }
    else if (action === "ans") { appendValue(formatNumberRaw(lastAnswer)); }
    else if (action === "memory-add") {
      try {
        memory += currentValueOrAnswer();
        updateDisplay();
        showToast("Đã cộng vào bộ nhớ M.");
      } catch (_) {
        showToast("Chưa có giá trị hợp lệ để lưu vào M.");
      }
    }
    else if (action === "memory-recall") { appendValue(formatNumberRaw(memory)); }
    else if (action === "memory-clear") { memory = 0; updateDisplay(); showToast("Đã xóa bộ nhớ M."); }
    else if (action === "angle") { angleMode = value === "RAD" ? "RAD" : "DEG"; updateDisplay(); }
  }

  function handleKeyboard(event) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key;
    if (/^[0-9.]$/.test(key)) { event.preventDefault(); appendValue(key); return; }
    if (["+", "-", "*", "/", "^", "(", ")"].includes(key)) { event.preventDefault(); appendValue(key); return; }
    if (key === "Enter" || key === "=") { event.preventDefault(); calculate(); return; }
    if (key === "Backspace") { event.preventDefault(); expression = expression.slice(0, -1); currentResultDisplay = ""; justEvaluated = false; updateDisplay(); return; }
    if (key === "Escape" || key === "Delete") { event.preventDefault(); expression = ""; currentResultDisplay = ""; justEvaluated = false; updateDisplay(); return; }
  }

  function formatNumberRaw(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) throw new Error("NON_FINITE");
    if (Math.abs(n) < 1e-14) return "0";
    if (Number.isInteger(n) && Math.abs(n) < 1e15) return String(n);
    const abs = Math.abs(n);
    if (abs >= 1e12 || (abs > 0 && abs < 1e-9)) {
      return n.toExponential(9)
        .replace(/\.0+e/, "e")
        .replace(/(\.\d*?[1-9])0+e/, "$1e");
    }
    return Number.parseFloat(n.toPrecision(12)).toString();
  }

  function formatNumberDisplay(value) {
    return formatDisplayNumberString(formatNumberRaw(value));
  }

  function evaluateExpression(source) {
    const parser = new Parser(String(source || ""), angleMode);
    const value = parser.parse();
    if (!Number.isFinite(value)) throw new Error("NON_FINITE");
    return value;
  }

  class Parser {
    constructor(source, mode) {
      this.source = source;
      this.mode = mode;
      this.index = 0;
    }

    parse() {
      const value = this.parseExpression();
      this.skipSpaces();
      if (this.index !== this.source.length) throw new Error("UNEXPECTED_TOKEN");
      return value;
    }

    skipSpaces() { while (/\s/.test(this.source[this.index] || "")) this.index += 1; }
    peek() { this.skipSpaces(); return this.source[this.index] || ""; }
    consume(char) { this.skipSpaces(); if (this.source[this.index] === char) { this.index += 1; return true; } return false; }

    parseExpression() {
      let value = this.parseTerm();
      while (true) {
        if (this.consume("+")) value += this.parseTerm();
        else if (this.consume("-")) value -= this.parseTerm();
        else break;
      }
      return value;
    }

    parseTerm() {
      let value = this.parsePower();
      while (true) {
        if (this.consume("*")) value *= this.parsePower();
        else if (this.consume("/")) {
          const divisor = this.parsePower();
          if (Math.abs(divisor) < 1e-15) throw new Error("DIV_ZERO");
          value /= divisor;
        } else break;
      }
      return value;
    }

    parsePower() {
      let value = this.parseUnary();
      if (this.consume("^")) value = Math.pow(value, this.parsePower());
      return value;
    }

    parseUnary() {
      if (this.consume("+")) return this.parseUnary();
      if (this.consume("-")) return -this.parseUnary();
      return this.parsePrimary();
    }

    parsePrimary() {
      if (this.consume("(")) {
        const value = this.parseExpression();
        if (!this.consume(")")) throw new Error("MISSING_PAREN");
        return value;
      }

      const ch = this.peek();
      if (/[0-9.]/.test(ch)) return this.parseNumber();
      if (/[A-Za-z]/.test(ch)) return this.parseIdentifier();
      throw new Error("EXPECTED_VALUE");
    }

    parseNumber() {
      this.skipSpaces();
      const rest = this.source.slice(this.index);
      const match = rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?/i);
      if (!match) throw new Error("BAD_NUMBER");
      this.index += match[0].length;
      const value = Number(match[0]);
      if (!Number.isFinite(value)) throw new Error("BAD_NUMBER");
      return value;
    }

    parseIdentifier() {
      this.skipSpaces();
      const rest = this.source.slice(this.index);
      const match = rest.match(/^[A-Za-z]+/);
      if (!match) throw new Error("BAD_IDENTIFIER");
      const id = match[0].toLowerCase();
      this.index += match[0].length;
      if (id === "pi") return Math.PI;
      if (id === "e") return Math.E;
      if (!["sin", "cos", "tan", "log", "ln", "sqrt"].includes(id)) throw new Error("UNKNOWN_FUNCTION");
      if (!this.consume("(")) throw new Error("FUNCTION_PAREN");
      const arg = this.parseExpression();
      if (!this.consume(")")) throw new Error("MISSING_PAREN");
      return this.applyFunction(id, arg);
    }

    applyFunction(name, value) {
      const angle = this.mode === "DEG" ? value * Math.PI / 180 : value;
      if (name === "sin") return Math.sin(angle);
      if (name === "cos") return Math.cos(angle);
      if (name === "tan") return Math.tan(angle);
      if (name === "log") {
        if (value <= 0) throw new Error("DOMAIN");
        return Math.log10(value);
      }
      if (name === "ln") {
        if (value <= 0) throw new Error("DOMAIN");
        return Math.log(value);
      }
      if (name === "sqrt") {
        if (value < 0) throw new Error("DOMAIN");
        return Math.sqrt(value);
      }
      throw new Error("UNKNOWN_FUNCTION");
    }
  }

  function render(context) {
    activeContext = context || null;
    ensureStyles();
    if (!activeContext || !activeContext.host) return;
    renderCalculator();
  }

  function destroy() {
    expression = "";
    lastAnswer = 0;
    memory = 0;
    angleMode = "DEG";
    justEvaluated = false;
    currentResultDisplay = "";
    historyItems = [];
    activeContext = null;
  }

  window.CLASS1_TOOL_MODULES = window.CLASS1_TOOL_MODULES || {};
  window.CLASS1_TOOL_MODULES[MODULE_KEY] = Object.freeze({ render, destroy });
})();
