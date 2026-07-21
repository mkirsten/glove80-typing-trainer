/* ---------------- state ---------------- */

const els = {
  tabs: document.getElementById("tabs"),
  card: document.getElementById("card"),
  prompt: document.getElementById("prompt"),
  ghost: document.getElementById("ghost"),
  wpm: document.getElementById("wpm"),
  acc: document.getElementById("acc"),
  lines: document.getElementById("lines"),
  best: document.getElementById("best"),
  coordText: document.getElementById("coordText"),
  result: document.getElementById("result"),
  focusNote: document.getElementById("focusNote")
};

let confusions = {};
let attempts = {};
try { confusions = JSON.parse(store.getItem("tangent-confusions")) || {}; } catch (e) { /* fresh */ }
try { attempts = JSON.parse(store.getItem("tangent-attempts")) || {}; } catch (e) { /* fresh */ }

// start in the guided course, or wherever the visitor left off
let mode = MODES.find(m => m.id === store.getItem("tangent-mode")) || MODES[0];
let target = "";
let startTime = null;
let keystrokes = 0;     // chars entered (incl. mistakes)
let wrongStrokes = 0;   // chars that were wrong when first entered
let prevLen = 0;
let linesDone = 0;
let composing = false;
let lastStroke = null;  // when the previous character landed — feeds per-key speed
let lineTimes = [];     // per-position inter-key times for this line, for slow words
let lineHistory = [];   // wpm per finished line this session, for the sparkline

const bestKey = m => "tangent-best-" + m.id;
function loadBest() {
  const v = store.getItem(bestKey(mode));
  els.best.innerHTML = (v ? v : "–") + "<small> wpm</small>";
}

/* ---------------- tabs ---------------- */

function buildTabs(selectedId) {
  els.tabs.replaceChildren();
  for (const m of MODES) {
    const b = document.createElement("button");
    b.className = "tab";
    b.setAttribute("role", "tab");
    b.textContent = m.label();
    b.setAttribute("aria-selected", m.id === selectedId ? "true" : "false");
    b.addEventListener("click", () => {
      mode = m;
      store.setItem("tangent-mode", m.id);
      for (const t of els.tabs.children) t.setAttribute("aria-selected", "false");
      b.setAttribute("aria-selected", "true");
      linesDone = 0;
      els.lines.textContent = "0";
      els.result.textContent = "";
      lineHistory = [];
      renderSpark();
      loadBest();
      updateCustomPanel();
      newLine();
      els.ghost.focus();
    });
    els.tabs.appendChild(b);
  }
}

