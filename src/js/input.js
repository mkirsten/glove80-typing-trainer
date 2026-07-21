/* ---------------- input handling ---------------- */

els.ghost.addEventListener("compositionstart", () => { composing = true; });
els.ghost.addEventListener("compositionend", () => {
  composing = false;
  handleInput();
});

els.ghost.addEventListener("input", handleInput);

function handleInput() {
  const typed = els.ghost.value;
  // keep the caret pinned to the end so edits are always appends
  if (!composing && els.ghost.selectionStart !== typed.length) {
    els.ghost.setSelectionRange(typed.length, typed.length);
  }
  if (typed.length > 0 && startTime === null) startTime = performance.now();

  if (typed.length > prevLen && !composing) {
    const i = typed.length - 1;
    const now = performance.now();
    const dt = lastStroke === null ? null : now - lastStroke;
    lastStroke = now;
    keystrokes++;
    const exp = target[i];
    if (exp !== undefined) {
      attempts[exp] = (attempts[exp] || 0) + 1;
      const ok = typed[i] === exp;
      recordKeySample(exp, ok, dt);
      if (ok) {
        if (dt !== null) lineTimes[i] = dt;
      } else {
        wrongStrokes++;
        addMiss(wordAt(target, i), 2);
        const gots = confusions[exp] = confusions[exp] || {};
        gots[typed[i]] = (gots[typed[i]] || 0) + 1;
        flashMiss(typed[i], exp);
      }
    } else {
      wrongStrokes++;
    }
  }
  prevLen = typed.length;

  // line ends on the trailing space — but only once it's typed correctly,
  // so backspace corrections at the end still work
  const last = target.length - 1;
  if (!composing && typed.length >= target.length && typed[last] === target[last] && startTime !== null) {
    finishLine(typed);
    return;
  }
  render(typed);
}

const NAV_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"];
els.ghost.addEventListener("keydown", (e) => {
  if (NAV_KEYS.includes(e.key) || (e.metaKey && e.key.toLowerCase() === "a")) {
    e.preventDefault();
    return;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    if (mode.id === "hn") {
      saveHeadline();
    } else if (els.ghost.value.length > 0 && startTime !== null) {
      finishLine(els.ghost.value);
    }
  } else if (e.key === "Escape") {
    e.preventDefault();
    newLine();
  }
});
els.ghost.addEventListener("paste", (e) => e.preventDefault());

els.card.addEventListener("click", () => els.ghost.focus());
function renderFocusNote(focused) {
  const enter = mode.id === "hn"
    ? '<kbd>⏎</kbd> saves the headline for later'
    : '<kbd>⏎</kbd> skips';
  els.focusNote.innerHTML =
    (focused ? '' : 'Click here and start typing · ')
    + 'end each line with <kbd>␣</kbd> · <kbd>⌫</kbd> corrects · ' + enter + ' · <kbd>esc</kbd> restarts';
}
els.ghost.addEventListener("focus", () => {
  els.card.classList.remove("unfocused");
  renderFocusNote(true);
});
els.ghost.addEventListener("blur", () => {
  els.card.classList.add("unfocused");
  renderFocusNote(false);
});

