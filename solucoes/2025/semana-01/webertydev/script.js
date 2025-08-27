(() => {
  const screen = document.getElementById("screen");
  const trail = document.getElementById("trail");
  const histList = document.getElementById("hist");
  const clearHistBtn = document.getElementById("clearHist");

  const MAX_DIGITS = 12;
  const state = {
    current: "0",
    previous: null,
    operator: null,
    overwrite: false,
    history: []
  };

  // ---------- Renderização ----------
  function render() {
    screen.textContent = format(state.current);
    animateScreen();
    trail.textContent = state.previous && state.operator
      ? `${format(state.previous)} ${state.operator}`
      : "";
  }

  function renderHistory() {
    histList.innerHTML = "";
    state.history.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      histList.appendChild(li);
    });
  }

  // ---------- Formatação ----------
  function format(n) {
    if (n === "Erro") return "Erro";
    const num = Number(n);
    if (!Number.isFinite(num)) return "Erro";

    const digits = String(num).replace(/[-.]/g, "").length;
    if (digits > MAX_DIGITS) {
      return num.toExponential(6).replace("+", "");
    }

    return Number.isInteger(num)
      ? String(num)
      : String(+num.toFixed(10))
          .replace(/\.0+$/, "")
          .replace(/(\.[0-9]*?)0+$/, "$1");
  }

  // ---------- Efeitos ----------
  function animateScreen() {
    screen.classList.add("bump");
    setTimeout(() => screen.classList.remove("bump"), 90);
  }

  function rippleEffect(btn, e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  }

  // ---------- Ações ----------
  function clearAll() {
    Object.assign(state, {
      current: "0",
      previous: null,
      operator: null,
      overwrite: false
    });
    render();
  }

  function backspace() {
    state.current = state.overwrite
      ? "0"
      : state.current.slice(0, -1) || "0";
    state.overwrite = false;
    render();
  }

  function insertDot() {
    if (state.overwrite) {
      state.current = "0.";
      state.overwrite = false;
    } else if (!state.current.includes(".")) {
      state.current += ".";
    }
    render();
  }

  function insertDigit(d) {
    state.current =
      state.overwrite || state.current === "0"
        ? String(d)
        : state.current + d;
    state.overwrite = false;
    render();
  }

  function setOperator(op) {
    if (state.operator && !state.overwrite) calculate();
    state.previous = state.current;
    state.operator = op;
    state.overwrite = true;
    render();
  }

  function percent() {
    const cur = +state.current;
    state.current = state.previous && state.operator
      ? (state.previous * cur / 100).toString()
      : (cur / 100).toString();
    render();
  }

  function calculate() {
    if (!state.operator || !state.previous) return;

    const result = compute(+state.previous, state.operator, +state.current);
    if (!Number.isFinite(result)) {
      state.current = "Erro";
      resetOp();
      render();
      return;
    }

    const formatted = format(result);
    addHistory(`${format(state.previous)} ${state.operator} ${format(state.current)} = ${formatted}`);
    state.current = result.toString();
    resetOp(true);
    render();
  }

  function resetOp(overwrite = true) {
    state.previous = null;
    state.operator = null;
    state.overwrite = overwrite;
  }

  function compute(a, op, b) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? Infinity : a / b;
      default: return b;
    }
  }

  function addHistory(item) {
    state.history.unshift(item);
    state.history = state.history.slice(0, 8);
    renderHistory();
  }

  function clearHistory() {
    state.history = [];
    renderHistory();
  }

  // ---------- Eventos ----------
  document.querySelector(".keys").addEventListener("click", e => {
    const btn = e.target.closest("button.key");
    if (!btn) return;

    rippleEffect(btn, e);

    if (btn.dataset.digit) insertDigit(btn.dataset.digit);
    if (btn.dataset.op) setOperator(btn.dataset.op);
    if (btn.dataset.action) {
      const actions = {
        clear: clearAll,
        backspace,
        percent,
        dot: insertDot,
        equal: calculate
      };
      actions[btn.dataset.action]?.();
    }
  });

  window.addEventListener("keydown", e => {
    const k = e.key;
    if (/^[0-9]$/.test(k)) return insertDigit(k);
    if (k === ".") return insertDot();
    if (["+", "-", "*", "/"].includes(k)) return setOperator(k);
    if (["Enter", "="].includes(k)) {
      e.preventDefault();
      return calculate();
    }
    if (k === "Backspace") return backspace();
    if (k === "Escape") return clearAll();
    if (k === "%") return percent();
  });

  clearHistBtn.addEventListener("click", clearHistory);

  render();
})();