/* ---------------- line lifecycle ---------------- */

function typeable(t) { return [...t].every(c => c === " " || charKeyMap[c]); }

function newLine() {
  // re-roll lines containing characters this layout can't type on this board
  let t = mode.gen();
  for (let i = 0; i < 8; i++) {
    if (typeable(t)) break;
    t = mode.gen();
  }
  target = t + " ";
  startTime = null;
  keystrokes = 0;
  wrongStrokes = 0;
  prevLen = 0;
  lastStroke = null;
  lineTimes = [];
  els.ghost.value = "";
  render("");
}

function finishLine(typed) {
  const secs = (performance.now() - startTime) / 1000;
  let correct = 0;
  for (let i = 0; i < target.length; i++) if (typed[i] === target[i]) correct++;
  const wpm = Math.round((correct / 5) / (secs / 60));
  const acc = keystrokes ? Math.round(100 * (keystrokes - wrongStrokes) / keystrokes) : 100;
  linesDone++;
  els.lines.textContent = linesDone;
  els.wpm.innerHTML = wpm + "<small> wpm</small>";
  els.acc.innerHTML = acc + "<small> %</small>";
  lineHistory.push(wpm);
  if (lineHistory.length > 40) lineHistory.shift();
  renderSpark();

  const prev = Number(store.getItem(bestKey(mode)) || 0);
  let pb = "";
  if (acc >= 90 && wpm > prev) {
    store.setItem(bestKey(mode), wpm);
    loadBest();
    pb = ' <span class="pb">new personal best!</span>';
  }
  els.result.innerHTML =
    "Line done: <strong>" + wpm + " wpm</strong> at <strong>" + acc + " %</strong> accuracy." + pb;

  collectSlowWords();
  if (wrongStrokes === 0) {
    // a clean line eases off any drilled words it contained
    const words = new Set(target.trim().split(" "));
    missBag = missBag.filter(e => { if (words.has(e.w)) e.n -= 1; return e.n > 0; });
  }
  store.setItem("tangent-missbag", JSON.stringify(missBag));
  store.setItem("tangent-course", JSON.stringify(courseStats));
  if (mode.id === "course") {
    const { order, n } = getCourse();
    if (n < order.length && order.slice(0, n).every(o => keyConf(o.ch) >= 1)) {
      store.setItem(courseUnlockKey(), n + 1);
      els.result.innerHTML = "All keys green — new key unlocked: <strong>"
        + dispChar(order[n].ch) + "</strong>. It joins the next lines.";
    }
    renderCoursePanel();
  }
  store.setItem("tangent-confusions", JSON.stringify(confusions));
  store.setItem("tangent-attempts", JSON.stringify(attempts));
  renderInsights();
  newLine();
}

// words this line crawled through at well under its own pace
function collectSlowWords() {
  const dts = lineTimes.filter(Boolean);
  if (dts.length < 10) return;
  const lineAvg = dts.reduce((a, b) => a + b, 0) / dts.length;
  let a = 0;
  while (a < target.length) {
    if (target[a] === " ") { a++; continue; }
    let b = a;
    while (b < target.length && target[b] !== " ") b++;
    const w = target.slice(a, b);
    const wt = [];
    for (let j = a; j < b; j++) if (lineTimes[j]) wt.push(lineTimes[j]);
    if (w.length > 2 && wt.length >= w.length - 1) {
      const avg = wt.reduce((x, y) => x + y, 0) / wt.length;
      if (avg > lineAvg * 1.5) addMiss(w, 1);
    }
    a = b;
  }
}

/* ---------------- rendering ---------------- */

function render(typed) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < target.length; i++) {
    const s = document.createElement("span");
    s.textContent = target[i];
    if (i < typed.length) {
      if (typed[i] === target[i]) s.className = "done";
      else if (composing && i === typed.length - 1) s.className = "pending";
      else s.className = "err";
    } else if (i === typed.length) {
      s.className = "cur";
    } else {
      s.className = "todo";
    }
    frag.appendChild(s);
  }
  els.prompt.replaceChildren(frag);
  updateHint(target[typed.length]);
}

// quiet trend line in the sidebar: wpm per finished line, dashed session average
function renderSpark() {
  const wrap = document.getElementById("sparkWrap");
  if (lineHistory.length < 2) { wrap.hidden = true; return; }
  wrap.hidden = false;
  const svg = document.getElementById("sparkSvg");
  const NS = "http://www.w3.org/2000/svg";
  const W = 260, H = 44, P = 5;
  const lo = Math.min(...lineHistory), hi = Math.max(...lineHistory);
  const span = Math.max(hi - lo, 4); // a flat session still draws mid-box
  const pad = (span - (hi - lo)) / 2;
  const x = i => P + i * (W - 2 * P) / (lineHistory.length - 1);
  const y = v => H - P - (v - lo + pad) * (H - 2 * P) / span;
  svg.replaceChildren();

  const avg = lineHistory.reduce((a, b) => a + b, 0) / lineHistory.length;
  const al = document.createElementNS(NS, "line");
  al.setAttribute("x1", P); al.setAttribute("x2", W - P);
  al.setAttribute("y1", y(avg)); al.setAttribute("y2", y(avg));
  al.setAttribute("class", "spark-avg");
  svg.appendChild(al);

  const pl = document.createElementNS(NS, "polyline");
  pl.setAttribute("points", lineHistory.map((v, i) => x(i) + "," + y(v)).join(" "));
  pl.setAttribute("class", "spark-line");
  svg.appendChild(pl);

  const dot = document.createElementNS(NS, "circle");
  dot.setAttribute("cx", x(lineHistory.length - 1));
  dot.setAttribute("cy", y(lineHistory[lineHistory.length - 1]));
  dot.setAttribute("r", 3);
  dot.setAttribute("class", "spark-dot");
  svg.appendChild(dot);

  // native tooltips on hover, with hit areas wider than the marks
  const slot = (W - 2 * P) / (lineHistory.length - 1);
  lineHistory.forEach((v, i) => {
    const r = document.createElementNS(NS, "rect");
    r.setAttribute("x", x(i) - slot / 2); r.setAttribute("y", 0);
    r.setAttribute("width", slot); r.setAttribute("height", H);
    r.setAttribute("class", "spark-hit");
    const t = document.createElementNS(NS, "title");
    t.textContent = v + " wpm (line " + (i + 1 + Math.max(0, linesDone - lineHistory.length)) + ")";
    r.appendChild(t);
    svg.appendChild(r);
  });
}

function updateHint(ch) {
  highlightFor(ch);
  const out = els.coordText;
  out.replaceChildren();
  if (ch === undefined) {
    out.appendChild(coordNote("fix the end with ⌫, or press enter to move on"));
    return;
  }
  const m = charKeyMap[ch];
  if (!m) {
    out.appendChild(coordNote("not on this keymap"));
    return;
  }
  if (m.shift) out.appendChild(coordChip("⇧", "hold", true));
  if (m.alt) out.appendChild(coordChip("⌥", "hold", true));
  const c = KEYCOORD[m.idx];
  if (c) {
    out.appendChild(coordChip(c.hand, "hand"));
    const f = fingerOf(m.idx);
    if (f) out.appendChild(coordChip(f, "finger", false, "f-" + f));
    if (c.t !== undefined) {
      out.appendChild(coordChip("T" + c.t, "thumb"));
    } else {
      out.appendChild(coordChip("C" + c.c, "col"));
      out.appendChild(coordChip("R" + c.r, "row"));
    }
  }
  const g = keyGlyphs[m.idx] || {};
  if (m.then) out.appendChild(coordChip(m.then.toUpperCase(), "then"));
  else if (g.dead) out.appendChild(coordNote("then space"));
}

function coordChip(value, label, mod, cls) {
  const chip = document.createElement("span");
  chip.className = "cchip" + (mod ? " mod" : "") + (cls ? " " + cls : "");
  const v = document.createElement("span");
  v.className = "cv"; v.textContent = value;
  const l = document.createElement("span");
  l.className = "cl"; l.textContent = label;
  chip.append(v, l);
  return chip;
}

function coordNote(text) {
  const n = document.createElement("span");
  n.className = "note"; n.textContent = text;
  return n;
}

