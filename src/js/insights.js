/* ---------------- insights ---------------- */

// POS: physical grid for direction arrows — x runs 0..11 left→right across
// both halves, row 0..5 top→bottom.
// KEYCOORD: MoErgo's official naming, matching the Glove80 user guide
// (docs.moergo.com) and Layout Editor:
//   columns C1–C6 counted from the inner column outward on each half,
//   rows R1 (function row) to R6 (bottom row),
//   thumbs T1–T6: upper arc T1→T3 toward the centre, lower arc T4→T6.
// Rebuilt whenever the board geometry changes (Glove80 ↔ Go60).
const POS = {};
const KEYCOORD = {};
function buildCoords(B) {
  for (const k in POS) delete POS[k];
  for (const k in KEYCOORD) delete KEYCOORD[k];
  const nL = B.leftCols.length;
  B.leftCols.forEach((slots, c) => slots.forEach((idx, r) => {
    if (idx === null) return;
    POS[idx] = { x: c, row: r, half: "LEFT" };
    KEYCOORD[idx] = { hand: "L", c: nL - c, r: r + 1 };
  }));
  B.rightCols.forEach((slots, c) => slots.forEach((idx, r) => {
    if (idx === null) return;
    POS[idx] = { x: 6 + c, row: r, half: "RIGHT" };
    KEYCOORD[idx] = { hand: "R", c: c + 1, r: r + 1 };
  }));
  const th = B.thumbs;
  (th.leftTop  || []).forEach((idx, i) => { POS[idx] = { x: 3.5 + i, row: 6, half: "LEFT" };  KEYCOORD[idx] = { hand: "L", t: i + 1 }; });
  (th.leftBot  || []).forEach((idx, i) => { POS[idx] = { x: 3.8 + i, row: 7, half: "LEFT" };  KEYCOORD[idx] = { hand: "L", t: i + 4 }; });
  (th.rightTop || []).forEach((idx, i) => { POS[idx] = { x: 5.5 + i, row: 6, half: "RIGHT" }; KEYCOORD[idx] = { hand: "R", t: 3 - i }; });
  (th.rightBot || []).forEach((idx, i) => { POS[idx] = { x: 5.8 + i, row: 7, half: "RIGHT" }; KEYCOORD[idx] = { hand: "R", t: 6 - i }; });
}
buildCoords(BOARDS[currentBoard]);

function dispChar(ch) { return ch === " " ? "␣" : ch; }
function numWord(n) { return ["zero", "one", "two", "three", "four", "five"][n] || String(n); }

function keyRef(ch) {
  if (!ch) return null;
  return charKeyMap[ch] || charKeyMap[ch.toLowerCase()] || null;
}

function adviceFor(exp, got) {
  if (exp === " ") return "space is on the right thumb cluster";
  if (got === " ") return "you hit space too early — finish the word first";
  const a = keyRef(exp), b = keyRef(got);
  if (!a || !b) return "watch the yellow highlight on the board";
  if (a.idx === b.idx) {
    if (a.alt && !b.alt) return "right key — but hold ⌥";
    if (!a.alt && b.alt) return "right key — without ⌥";
    if (a.shift && !b.shift) return "right key — but hold ⇧";
    if (!a.shift && b.shift) return "right key — without ⇧";
    return "same key — check your modifiers";
  }
  const pa = POS[a.idx], pb = POS[b.idx];
  if (!pa || !pb) return "watch the yellow highlight on the board";
  if (pa.half !== pb.half) return "wrong hand — " + dispChar(exp) + " is on the " + pa.half + " half";
  const parts = [];
  const dx = pa.x - pb.x, dy = pa.row - pb.row;
  if (dx) parts.push(numWord(Math.abs(dx)) + " key" + (Math.abs(dx) > 1 ? "s" : "") + " more to the " + (dx > 0 ? "RIGHT" : "LEFT"));
  if (dy) parts.push(numWord(Math.abs(dy)) + " row" + (Math.abs(dy) > 1 ? "s" : "") + " " + (dy > 0 ? "DOWN" : "UP"));
  let s = "go " + parts.join(" and ");
  if (a.shift && !b.shift) s += ", holding ⇧";
  if (a.alt && !b.alt) s += ", holding ⌥";
  return s;
}

function makeBold(text) {
  const b = document.createElement("b");
  b.textContent = text;
  return b;
}

function renderInsights() {
  const body = document.getElementById("insBody");
  const items = Object.entries(confusions).map(([exp, gots]) => {
    let errs = 0, worstGot = null, worstN = 0;
    for (const [g, n] of Object.entries(gots)) {
      errs += n;
      if (n > worstN) { worstN = n; worstGot = g; }
    }
    return { exp, errs, worstGot, worstN };
  }).filter(x => x.errs >= 2).sort((a, b) => b.errs - a.errs).slice(0, 5);

  body.replaceChildren();
  if (!items.length) {
    const p = document.createElement("div");
    p.className = "ins-empty";
    p.textContent = "Type a few lines and your most-missed keys will show up here, with directions for fixing the motion. The Weak keys mode then practises exactly those keys.";
    body.appendChild(p);
    return;
  }
  for (const it of items) {
    const row = document.createElement("div");
    row.className = "ins";
    const pair = document.createElement("span");
    pair.className = "pairkeys";
    const want = document.createElement("span");
    want.className = "k want"; want.textContent = dispChar(it.exp);
    const arr = document.createElement("span");
    arr.className = "arr"; arr.textContent = "←";
    const got = document.createElement("span");
    got.className = "k got"; got.textContent = dispChar(it.worstGot);
    pair.append(want, arr, got);

    const txt = document.createElement("span");
    txt.className = "txt";
    txt.append("You hit ", makeBold(dispChar(it.worstGot)), " instead of ",
      makeBold(dispChar(it.exp)), " " + it.worstN + "× — ");
    const em = document.createElement("em");
    em.textContent = adviceFor(it.exp, it.worstGot);
    txt.append(em, ".");
    row.append(pair, txt);
    body.appendChild(row);
  }
}

document.getElementById("insReset").addEventListener("click", () => {
  confusions = {};
  attempts = {};
  missBag = [];
  courseStats = {};
  store.removeItem("tangent-confusions");
  store.removeItem("tangent-attempts");
  store.removeItem("tangent-missbag");
  store.removeItem("tangent-course");
  store.removeItem(courseUnlockKey());
  renderInsights();
  renderCoursePanel();
});

function topTroubleChars(n) {
  return Object.entries(confusions)
    .map(([exp, gots]) => [exp, Object.values(gots).reduce((a, b) => a + b, 0)])
    .filter(([c, errs]) => errs >= 2 && c !== " ")
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([c]) => c);
}

