/* ---------------- learn-the-board course ---------------- */

// keybr's adaptive loop, ordered by Glove80 ergonomics instead of letter
// frequency: home positions first, easy curls next, inner/outer reaches last.
// Per-key speed over a sliding window maps to a 0–1 mastery score; when every
// unlocked key is mastered, the next key in the order joins the drills.
let courseStats = {};
try { courseStats = JSON.parse(store.getItem("tangent-course")) || {}; } catch (e) { /* fresh */ }

const COURSE_START = 8;        // the home-position keys come pre-unlocked
const COURSE_TARGET_WPM = 30;  // per-key speed that counts as mastered
const COURSE_FLOOR_WPM = 12;   // at or below this a key scores zero
const COURSE_SAMPLES = 20;     // sliding window per key

let courseOrder = null; // rebuilt lazily after any layout/keymap/text change

function keyCost(k) {
  // ergonomic distance from the home position, per MoErgo's finger model:
  // C2–C5 are owned columns (pure curl), C1/C6 are index/pinky reaches
  if (k.t !== undefined) return 6 + k.t; // thumbs come late
  const B = BOARDS[currentBoard] || BOARDS.glove80;
  const colPenalty = k.c >= 2 && k.c <= 5 ? 0 : k.c === 1 ? 2 : 3;
  return Math.abs(k.r - B.homeRow) * 2 + colPenalty;
}

function courseLetters() {
  // letters reachable without modifiers on this keymap, cheapest motion first,
  // language frequency breaking ties
  const freq = {};
  for (const ch of pack().commonWords.join("") + pack().lettersWords.join("")) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  const seen = new Set();
  const out = [];
  keyGlyphs.forEach((g, idx) => {
    const k = KEYCOORD[idx];
    if (!g || !k || g.dead) return;
    const ch = g.b;
    if (!ch || ch.length !== 1 || !/\p{L}/u.test(ch) || seen.has(ch)) return;
    seen.add(ch);
    out.push({ ch, cost: keyCost(k), freq: freq[ch] || 0 });
  });
  out.sort((a, b) => a.cost - b.cost || b.freq - a.freq);
  return out;
}

function courseUnlockKey() { return "tangent-course-n-" + osLayout; }

function getCourse() {
  if (!courseOrder) courseOrder = courseLetters();
  let n = Number(store.getItem(courseUnlockKey()) || 0);
  n = Math.max(COURSE_START, Math.min(n || 0, courseOrder.length));
  return { order: courseOrder, n };
}

function recordKeySample(ch, ok, dt) {
  const s = courseStats[ch] = courseStats[ch] || { t: [], h: [] };
  s.h.push(ok ? 1 : 0);
  if (s.h.length > COURSE_SAMPLES) s.h.shift();
  if (ok && dt !== null && dt > 30 && dt < 2500) {
    s.t.push(Math.round(dt));
    if (s.t.length > COURSE_SAMPLES) s.t.shift();
  }
}

function keyWpm(ch) {
  const s = courseStats[ch];
  if (!s || !s.t.length) return 0;
  const avg = s.t.reduce((a, b) => a + b, 0) / s.t.length;
  return 12000 / avg; // ms per char → wpm at 5 chars per word
}

function keyConf(ch) {
  const s = courseStats[ch];
  if (!s || !s.t.length) return 0;
  let conf = (keyWpm(ch) - COURSE_FLOOR_WPM) / (COURSE_TARGET_WPM - COURSE_FLOOR_WPM);
  conf = Math.max(0, Math.min(1, conf));
  const acc = s.h.reduce((a, b) => a + b, 0) / s.h.length;
  if (acc < 0.95) conf *= acc;         // sloppy speed is not mastery
  if (s.t.length < 5) conf *= s.t.length / 5; // young keys start red
  return conf;
}

function courseFocusChar(unlocked) {
  let focus = unlocked[0], low = 2;
  for (const ch of unlocked) {
    const c = keyConf(ch);
    if (c < low) { low = c; focus = ch; }
  }
  return focus;
}

function pseudoWord(chars, focus) {
  // pronounceable filler for when few real words fit the unlocked set
  const vowels = chars.filter(c => "aeiouyåäöæøüéèêàâîïôû".includes(c));
  const cons = chars.filter(c => !vowels.includes(c));
  const len = 3 + Math.floor(Math.random() * 4);
  let w = "";
  for (let i = 0; i < len; i++) {
    const src = i % 2 === 0 ? cons : vowels;
    w += Math.random() < 0.3 ? focus : pick(src.length ? src : chars);
  }
  return w;
}

function genCourse() {
  const { order, n } = getCourse();
  const unlocked = order.slice(0, n).map(o => o.ch);
  if (!unlocked.length) return pickWords(pack().commonWords, 7);
  const set = new Set(unlocked);
  const focus = courseFocusChar(unlocked);
  const pool = [...new Set([...pack().commonWords, ...pack().lettersWords,
    ...pack().quotes.flatMap(q => q.toLowerCase().split(/[^\p{L}]+/u))])]
    .filter(w => w.length > 1 && [...w].every(c => set.has(c)));
  const focusPool = pool.filter(w => w.includes(focus));
  const out = [];
  for (let i = 0; i < 7; i++) {
    // small pools early on make repeats likely — re-draw rather than stutter
    let w = null;
    for (let tries = 0; tries < 8 && (w === null || w === out[out.length - 1]); tries++) {
      const useFocus = focusPool.length && Math.random() < 0.5;
      w = useFocus ? pick(focusPool) : pool.length ? pick(pool) : null;
      if (!w || (!useFocus && Math.random() < 0.2)) w = pseudoWord(unlocked, focus);
    }
    out.push(w);
  }
  return out.join(" ");
}

/* ---- course display: chips above the card, mastery paint on the board ---- */

const coursePanel = document.getElementById("coursePanel");
const courseKeys = document.getElementById("courseKeys");
const courseStatus = document.getElementById("courseStatus");

function mastColor(conf) {
  return "hsl(" + Math.round(conf * 120) + " 55% 44%)";
}

function renderCoursePanel() {
  coursePanel.hidden = mode.id !== "course";
  paintCourseBoard();
  if (coursePanel.hidden) return;
  const { order, n } = getCourse();
  const unlocked = order.slice(0, n).map(o => o.ch);
  const focus = courseFocusChar(unlocked);
  courseKeys.replaceChildren();
  order.forEach((o, i) => {
    const chip = document.createElement("span");
    chip.className = "kchip";
    chip.textContent = o.ch;
    if (i >= n) {
      chip.classList.add("locked");
      chip.title = "unlocks later";
    } else {
      const c = keyConf(o.ch);
      const w = keyWpm(o.ch);
      if (!w) chip.classList.add("fresh");
      else chip.style.setProperty("--mastc", mastColor(c));
      chip.title = w ? Math.round(w) + " wpm" : "no data yet";
      if (o.ch === focus) chip.classList.add("focus");
    }
    courseKeys.appendChild(chip);
  });
  const fw = Math.round(keyWpm(focus));
  courseStatus.innerHTML =
    "<b>" + n + "</b> of " + order.length + " keys in play · working on <b>"
    + focus + "</b>" + (fw ? " (" + fw + " wpm)" : "")
    + " · a key turns green at " + COURSE_TARGET_WPM
    + " wpm — all green unlocks the next key";
}

function paintCourseBoard() {
  const board = document.getElementById("board");
  const on = mode.id === "course";
  board.classList.toggle("course", on);
  for (const el of keyEls) {
    if (!el) continue;
    el.classList.remove("mastkey", "lockedkey", "focuskey");
    el.style.removeProperty("--mastc");
  }
  if (!on) return;
  const { order, n } = getCourse();
  const state = new Map(order.map((o, i) => [o.ch, i < n ? keyConf(o.ch) : null]));
  const unlocked = order.slice(0, n).map(o => o.ch);
  const focus = courseFocusChar(unlocked);
  keyGlyphs.forEach((g, idx) => {
    const el = keyEls[idx];
    if (!el || !g || !state.has(g.b)) return;
    const c = state.get(g.b);
    if (c === null) {
      el.classList.add("lockedkey");
    } else {
      el.classList.add("mastkey");
      el.style.setProperty("--mastc", mastColor(c));
      if (g.b === focus) el.classList.add("focuskey");
    }
  });
}

