/* ---------------- miss review: the words you actually fumbled ---------------- */

// every mistyped or crawled-through word lands here, and Weak keys mode
// drills it in doubles until you type it cleanly
let missBag = [];
try { missBag = JSON.parse(store.getItem("tangent-missbag")) || []; } catch (e) { /* fresh */ }

function wordAt(text, i) {
  if (text[i] === " " || text[i] === undefined) return null;
  let a = i, b = i;
  while (a > 0 && text[a - 1] !== " ") a--;
  while (b < text.length && text[b] !== " ") b++;
  const w = text.slice(a, b);
  return w.length > 1 ? w : null;
}

function addMiss(w, weight) {
  if (!w || w.length > 24) return;
  const e = missBag.find(x => x.w === w);
  if (e) e.n = Math.min(e.n + weight, 9);
  else missBag.unshift({ w, n: weight });
  if (missBag.length > 40) missBag.pop();
}

function genFocus() {
  // hardest fumbled words first, each typed twice in a row so the second
  // pass lands while the correction is still fresh
  const drill = missBag.filter(e => typeable(e.w))
    .sort((a, b) => b.n - a.n).slice(0, 8).map(e => e.w);
  const out = [];
  const take = Math.min(3, drill.length);
  for (let i = 0; i < take; i++) {
    const w = drill.splice(Math.floor(Math.random() * Math.min(drill.length, 5)), 1)[0];
    out.push(w, w);
  }
  const trouble = topTroubleChars(5);
  if (out.length < 6 && trouble.length) {
    const pool = [...pack().lettersWords, ...pack().commonWords,
      ...pack().quotes.flatMap(s => s.toLowerCase().split(/[^\p{L}]+/u))]
      .filter(w => w.length > 1 && trouble.some(c => w.includes(c)));
    while (out.length < 8) {
      if (!pool.length || Math.random() < 0.35) {
        const c = pick(trouble);
        out.push(c + c + c);
      } else {
        out.push(pick(pool));
      }
    }
  }
  if (!out.length) return pickWords(pack().lettersWords, 7);
  return out.join(" ");
}

