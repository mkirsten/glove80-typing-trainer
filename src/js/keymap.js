/* ---------------- keymap loading ---------------- */

function entryToCode(e) {
  if (typeof e === "string") {
    const parts = e.replace(/^&/, "").trim().split(/[\s()]+/).filter(Boolean);
    return parts[0] === "kp" ? (parts[1] || "NONE") : parts[0].toUpperCase();
  }
  if (e && typeof e === "object") {
    const beh = String(e.value || e.behavior || "").replace(/^&/, "");
    let p = (e.params || [])[0];
    if (p && typeof p === "object") p = p.value !== undefined ? p.value : p.keycode;
    return beh === "kp" ? String(p || "NONE") : (beh || "NONE").toUpperCase();
  }
  return "NONE";
}

function parseKeymap(text) {
  try {
    const j = JSON.parse(text);
    const layers = j.layers || (j.keymap && j.keymap.layers);
    if (Array.isArray(layers) && Array.isArray(layers[0])) {
      const n = layers[0].length;
      if (n === 60) return layers[0].slice(0, 60).map(entryToCode);
      if (n >= 80) return layers[0].slice(0, 80).map(entryToCode);
    }
    throw new Error("JSON has no 60- or 80-key layer");
  } catch (err) {
    if (err instanceof SyntaxError) {
      const m = text.match(/bindings\s*=\s*<([\s\S]*?)>/);
      if (!m) throw new Error("no bindings block found");
      const toks = m[1].trim().split(/\s+/);
      const out = [];
      let cur = null;
      for (const t of toks) {
        if (t.startsWith("&")) { if (cur) out.push(cur); cur = [t]; }
        else if (cur) cur.push(t);
      }
      if (cur) out.push(cur);
      if (out.length !== 60 && out.length < 80) throw new Error("expected 60 or 80 bindings, found " + out.length);
      const n = out.length === 60 ? 60 : 80;
      return out.slice(0, n).map(b => entryToCode(b.join(" ")));
    }
    throw err;
  }
}

const keymapSel = document.getElementById("keymapSel");
function refreshKeymapSelect() {
  keymapSel.replaceChildren();
  for (const [id, k] of Object.entries(KEYMAPS)) {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = k.name;
    keymapSel.appendChild(opt);
  }
  if (customCodes) {
    const opt = document.createElement("option");
    opt.value = "custom";
    opt.textContent = "Custom (imported)";
    keymapSel.appendChild(opt);
  }
  const imp = document.createElement("option");
  imp.value = "__import";
  imp.textContent = "Import from file…";
  keymapSel.appendChild(imp);
  keymapSel.value = keymapChoice;
}
keymapSel.addEventListener("change", () => {
  if (keymapSel.value === "__import") {
    keymapSel.value = keymapChoice; // revert until a file actually loads
    // show a real file input (programmatic click is blocked in some browsers),
    // and try to open the dialog directly where allowed
    filePick.hidden = false;
    importMsg.textContent = "…or drop the file on the keyboard below";
    filePick.click();
    return;
  }
  applyKeymap(keymapSel.value);
});

function applyKeymap(choice) {
  keymapChoice = choice;
  store.setItem("tangent-keymap-choice", choice);
  boardCodes = (choice === "custom" && customCodes) ? customCodes : KEYMAPS[choice].codes;
  currentBoard = boardOf(choice);
  renderBoard(boardCodes);
  renderSheet();
  buildTabs(mode.id);
  render(els.ghost.value);
  els.ghost.focus();
}

const layoutSel = document.getElementById("layoutSel");
for (const [id, l] of Object.entries(LAYOUTS)) {
  const opt = document.createElement("option");
  opt.value = id;
  opt.textContent = l.name;
  layoutSel.appendChild(opt);
}
layoutSel.value = osLayout;
layoutSel.addEventListener("change", () => applyLayout(layoutSel.value));

const textSel = document.getElementById("textSel");
{
  const auto = document.createElement("option");
  auto.value = "auto";
  auto.textContent = "Auto";
  textSel.appendChild(auto);
  for (const [id, name] of Object.entries(LANG_NAMES)) {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = name;
    textSel.appendChild(opt);
  }
  textSel.value = (textLang === "auto" || PACKS[textLang]) ? textLang : "auto";
}
textSel.addEventListener("change", () => {
  textLang = textSel.value;
  store.setItem("tangent-textlang", textLang);
  buildTabs(mode.id); // the letters-mode fallback label follows the text language
  courseOrder = null; // frequency tie-breaks follow the text language
  renderCoursePanel();
  newLine();
  els.ghost.focus();
});

function applyLayout(id) {
  osLayout = id;
  store.setItem("tangent-oslayout", id);
  customPool = null; // which lines are typeable depends on the layout
  renderBoard(boardCodes);
  renderSheet();
  buildTabs(mode.id);
  linesDone = 0;
  els.lines.textContent = "0";
  els.result.textContent = "";
  lineHistory = [];
  renderSpark();
  loadBest();
  newLine();
  els.ghost.focus();
}

/* ---------------- cheat sheet (generated from the active layout) ---------------- */

function sheetChip(ch, mods, base, note) {
  const chip = document.createElement("div");
  chip.className = "chip";
  const c = document.createElement("span");
  c.className = "ch";
  c.textContent = ch;
  const how = document.createElement("span");
  how.className = "how";
  if (mods) {
    const b = document.createElement("b");
    b.textContent = mods;
    how.append(b, " ");
  }
  how.append(base);
  if (note) how.append(" · " + note);
  chip.append(c, how);
  return chip;
}

function renderSheet() {
  const body = document.getElementById("sheetBody");
  body.replaceChildren();
  const shift = [], opt = [], dead = [], special = [];
  const seen = new Set();
  keyGlyphs.forEach(g => {
    if (!g || seen.has(g.b)) return;
    seen.add(g.b);
    const base = g.b === " " ? "space" : (/^[a-zà-ÿ]$/i.test(g.b) ? g.b.toUpperCase() : g.b);
    if (/[^\x00-\x7F]/.test(g.b) && /[a-zà-ÿ]/i.test(g.b)) special.push(g.b);
    if (g.dead) {
      dead.push([g.b, "", base]);
      if (g.s) dead.push([g.s, "⇧", base]);
      if (g.o) dead.push([g.o, "⌥", base]);
    } else {
      if (g.s) shift.push([g.s, "⇧", base]);
      if (g.o) opt.push([g.o, "⌥", base]);
    }
    if (g.so) opt.push([g.so, "⇧⌥", base]);
  });

  const addGroup = (title, items, note) => {
    if (!items.length) return;
    const h = document.createElement("h3");
    h.textContent = title;
    body.appendChild(h);
    const grid = document.createElement("div");
    grid.className = "sheet-grid";
    for (const [ch, mods, base] of items) grid.appendChild(sheetChip(ch, mods, base, note));
    body.appendChild(grid);
  };

  if (special.length) {
    const h = document.createElement("h3");
    h.textContent = "Special letters";
    body.appendChild(h);
    const p = document.createElement("p");
    p.className = "tip";
    p.textContent = special.join("  ") + " — dedicated keys; watch the yellow highlight on the board to learn their spots.";
    body.appendChild(p);
  }
  addGroup("Shift combos", shift);
  addGroup("⌥ combos", opt);
  addGroup("Dead keys — press, then space", dead, "then space");
  if (dead.length) {
    const p = document.createElement("p");
    p.className = "tip";
    p.textContent = "Dead keys show nothing until the next keystroke — press the dead key, then space for the bare symbol, or a vowel to compose (´ + e = é).";
    body.appendChild(p);
  }
}

const filePick = document.getElementById("filePick");
const importMsg = document.getElementById("importMsg");

// Layout Editor exports carry the OS input source as `locale`
// (e.g. "sv-SE-mac") — map it onto one of our OS layouts.
function inferLayout(text) {
  try { return layoutForLocale(JSON.parse(text).locale); } catch (e) { return null; }
}

function importKeymapFile(f) {
  f.text().then(text => {
    try {
      const codes = parseKeymap(text);
      store.setItem("tangent-keymap", JSON.stringify(codes));
      customCodes = codes;
      keymapChoice = "custom";
      store.setItem("tangent-keymap-choice", "custom");
      boardCodes = codes;
      currentBoard = codes.length === 60 ? "go60" : "glove80";
      let note = "";
      const inferred = inferLayout(text);
      if (inferred && inferred !== osLayout) {
        osLayout = inferred;
        store.setItem("tangent-oslayout", inferred);
        layoutSel.value = inferred;
        note = " · OS input: " + LAYOUTS[inferred].name;
      }
      refreshKeymapSelect();
      renderBoard(codes);
      renderSheet();
      buildTabs(mode.id);
      if (note) newLine(); // the language may have changed — reroll the line
      else render(els.ghost.value);
      filePick.hidden = true;
      importMsg.textContent = "Imported: " + f.name + " ✓" + note;
      setTimeout(() => { importMsg.textContent = ""; }, 6000);
    } catch (err) {
      importMsg.textContent = "Could not read " + f.name + " (" + err.message + ")";
    }
  });
}

filePick.addEventListener("change", () => {
  const f = filePick.files[0];
  if (f) importKeymapFile(f);
  filePick.value = "";
});

// drag & drop a keymap file anywhere onto the keyboard panel
const boardWrap = document.querySelector(".board-wrap");
boardWrap.addEventListener("dragover", e => e.preventDefault());
boardWrap.addEventListener("drop", e => {
  e.preventDefault();
  const f = e.dataTransfer.files && e.dataTransfer.files[0];
  if (f) importKeymapFile(f);
});

let customCodes = null;
try {
  const saved = JSON.parse(store.getItem("tangent-keymap"));
  if (Array.isArray(saved) && (saved.length === 80 || saved.length === 60)) customCodes = saved;
} catch (e) { /* none */ }
// first visit: pick the factory keymap matching the visitor's OS
function defaultKeymap() {
  const mac = /Mac|iPhone|iPad/.test(navigator.platform || "") || /Macintosh/.test(navigator.userAgent);
  return mac ? "factory-mac" : "factory";
}
let keymapChoice = store.getItem("tangent-keymap-choice") || defaultKeymap();
if (!KEYMAPS[keymapChoice] && !(keymapChoice === "custom" && customCodes)) keymapChoice = defaultKeymap();
let boardCodes = (keymapChoice === "custom") ? customCodes : KEYMAPS[keymapChoice].codes;
currentBoard = boardOf(keymapChoice);
refreshKeymapSelect();
renderBoard(boardCodes);
renderSheet();

