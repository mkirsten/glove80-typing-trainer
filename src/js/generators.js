/* ---------------- international-keys mode ----------------
   The drill targets the layout's dedicated non-ASCII letter keys
   (åäö on Swedish, üöäß on German, éèçàù on French, …), read straight
   off the keys of the active board rather than hardcoded per language. */

function layoutIntlChars() {
  const out = [];
  const seen = new Set();
  keyGlyphs.forEach(g => {
    if (!g || seen.has(g.b)) return;
    seen.add(g.b);
    if (/^[à-öø-ÿß]$/.test(g.b)) out.push(g.b); // non-ASCII Latin-1 letters (not º ª ÷)
  });
  return out;
}

function intlLabel() {
  const chars = layoutIntlChars()
    .sort((a, b) => a.localeCompare(b, LAYOUTS[osLayout].lang));
  return chars.length ? chars.join("") + " focus" : pack().lettersLabel;
}

function genIntl() {
  const chars = layoutIntlChars();
  const p = pack();
  if (!chars.length) return pickWords(p.lettersWords, 7);
  const pool = [...new Set([
    ...p.lettersWords, ...p.commonWords,
    ...p.quotes.flatMap(s => s.toLowerCase().split(/[^\p{L}]+/u)),
    ...p.sentences.flatMap(s => s.toLowerCase().split(/[^\p{L}]+/u))
  ])].filter(w => w.length > 1 && chars.some(c => w.includes(c)));
  return pool.length ? pickWords(pool, 7) : pickWords(p.lettersWords, 7);
}

const MODES = [
  { id: "course",  label: () => "Learn the board",    gen: () => genCourse() },
  { id: "hn",      label: () => feedCfg.type === "rss" ? "RSS feed" : "Hacker News", gen: () => genHN() },
  { id: "text",    label: () => "Normal text",       gen: () => genText() },
  { id: "symbols", label: () => "Symbols & code",    gen: () => deal(SYMBOL_LINES) },
  { id: "letters", label: () => intlLabel(),         gen: () => genIntl() },
  { id: "focus",   label: () => "Weak keys",         gen: () => genFocus() },
  { id: "custom",  label: () => "Your text",          gen: () => genCustom() }
];

// mostly stoic wisdom, with pangrams and plain common-word lines sprinkled in
function genText() {
  const r = Math.random();
  if (r < 0.7) return deal(pack().quotes);
  if (r < 0.85) return deal(pack().sentences);
  return pickWords(pack().commonWords, 9);
}

function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

// deal from a shuffled bag per list, so every entry comes up once before any repeats
const dealState = new WeakMap();
function deal(list) {
  let st = dealState.get(list);
  if (!st) { st = { bag: [], last: null }; dealState.set(list, st); }
  if (!st.bag.length) {
    st.bag = list.slice();
    for (let i = st.bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [st.bag[i], st.bag[j]] = [st.bag[j], st.bag[i]];
    }
    // the seam between two bags is the one place an entry could still repeat
    if (st.bag.length > 1 && st.bag[0] === st.last) {
      const j = 1 + Math.floor(Math.random() * (st.bag.length - 1));
      [st.bag[0], st.bag[j]] = [st.bag[j], st.bag[0]];
    }
  }
  st.last = st.bag.shift();
  return st.last;
}
function pickWords(pool, n) {
  const out = [];
  let guard = n * 20; // bail out if the pool is too small to avoid repeats
  while (out.length < n && guard-- > 0) {
    const w = pick(pool);
    if (out[out.length - 1] !== w) out.push(w);
  }
  return out.join(" ");
}

