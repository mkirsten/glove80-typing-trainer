/* ---------------- Glove80 board ---------------- */

// What each ZMK keycode produces under a given OS input source.
// `dead` marks dead keys (press, then space for the bare symbol).
function lettersAtoZ() {
  const k = {};
  for (let i = 65; i <= 90; i++) {
    const L = String.fromCharCode(i);
    k[L] = { b: L.toLowerCase(), cap: L };
  }
  return k;
}

const LAYOUTS = {
  "sv-mac": {
    name: "Swedish (macOS)", lang: "sv",
    keys: Object.assign(lettersAtoZ(), {
      EQUAL: { b: "´", s: "`", dead: true },
      MINUS: { b: "+", s: "?" },
      BSLH:  { b: "'", s: "*" },
      SEMI:  { b: "ö", cap: "Ö" },
      SQT:   { b: "ä", cap: "Ä" },
      LBKT:  { b: "å", cap: "Å" },
      RBKT:  { b: "¨", s: "^", o: "~", dead: true },
      GRAVE: { b: "<", s: ">" },
      NON_US_BSLH: { b: "<", s: ">" },
      COMMA: { b: ",", s: ";" },
      DOT:   { b: ".", s: ":" },
      FSLH:  { b: "-", s: "_" },
      N1: { b: "1", s: "!" },
      N2: { b: "2", s: "\"", o: "@" },
      N3: { b: "3", s: "#" },
      N4: { b: "4", s: "€", o: "$" },
      N5: { b: "5", s: "%" },
      N6: { b: "6", s: "&" },
      N7: { b: "7", s: "/", o: "|", so: "\\" },
      N8: { b: "8", s: "(", o: "[", so: "{" },
      N9: { b: "9", s: ")", o: "]", so: "}" },
      N0: { b: "0", s: "=" },
      SPACE: { b: " ", label: "␣" }
    })
  },
  "us": {
    name: "English (US)", lang: "en",
    keys: Object.assign(lettersAtoZ(), {
      EQUAL: { b: "=", s: "+" },
      MINUS: { b: "-", s: "_" },
      BSLH:  { b: "\\", s: "|" },
      SEMI:  { b: ";", s: ":" },
      SQT:   { b: "'", s: "\"" },
      LBKT:  { b: "[", s: "{" },
      RBKT:  { b: "]", s: "}" },
      GRAVE: { b: "`", s: "~" },
      COMMA: { b: ",", s: "<" },
      DOT:   { b: ".", s: ">" },
      FSLH:  { b: "/", s: "?" },
      N1: { b: "1", s: "!" },
      N2: { b: "2", s: "@" },
      N3: { b: "3", s: "#" },
      N4: { b: "4", s: "$" },
      N5: { b: "5", s: "%" },
      N6: { b: "6", s: "^" },
      N7: { b: "7", s: "&" },
      N8: { b: "8", s: "*" },
      N9: { b: "9", s: "(" },
      N0: { b: "0", s: ")" },
      SPACE: { b: " ", label: "␣" }
    })
  },
  "uk-mac": {
    name: "English (UK, macOS)", lang: "en",
    keys: Object.assign(lettersAtoZ(), {
      EQUAL: { b: "=", s: "+" },
      MINUS: { b: "-", s: "_" },
      BSLH:  { b: "\\", s: "|" },
      SEMI:  { b: ";", s: ":" },
      SQT:   { b: "'", s: "\"" },
      LBKT:  { b: "[", s: "{" },
      RBKT:  { b: "]", s: "}" },
      GRAVE: { b: "§", s: "±" },
      NON_US_BSLH: { b: "`", s: "~" },
      COMMA: { b: ",", s: "<" },
      DOT:   { b: ".", s: ">" },
      FSLH:  { b: "/", s: "?" },
      N1: { b: "1", s: "!" },
      N2: { b: "2", s: "@", o: "€" },
      N3: { b: "3", s: "£", o: "#" },
      N4: { b: "4", s: "$" },
      N5: { b: "5", s: "%" },
      N6: { b: "6", s: "^" },
      N7: { b: "7", s: "&" },
      N8: { b: "8", s: "*" },
      N9: { b: "9", s: "(" },
      N0: { b: "0", s: ")" },
      SPACE: { b: " ", label: "␣" }
    })
  },
  "de-mac": {
    name: "German (macOS)", lang: "de",
    keys: Object.assign(lettersAtoZ(), {
      Y: { b: "z", cap: "Z" },
      Z: { b: "y", cap: "Y" },
      E: { b: "e", cap: "E", o: "€" },
      L: { b: "l", cap: "L", o: "@" },
      N: { b: "n", cap: "N", o: "~" },
      EQUAL: { b: "´", s: "`", dead: true },
      MINUS: { b: "ß", s: "?" },
      BSLH:  { b: "#", s: "'" },
      SEMI:  { b: "ö", cap: "Ö" },
      SQT:   { b: "ä", cap: "Ä" },
      LBKT:  { b: "ü", cap: "Ü" },
      RBKT:  { b: "+", s: "*" },
      GRAVE: { b: "^", s: "°", dead: true },
      NON_US_BSLH: { b: "<", s: ">" },
      COMMA: { b: ",", s: ";" },
      DOT:   { b: ".", s: ":" },
      FSLH:  { b: "-", s: "_" },
      N1: { b: "1", s: "!" },
      N2: { b: "2", s: "\"" },
      N3: { b: "3", s: "§" },
      N4: { b: "4", s: "$" },
      N5: { b: "5", s: "%", o: "[" },
      N6: { b: "6", s: "&", o: "]" },
      N7: { b: "7", s: "/", o: "|", so: "\\" },
      N8: { b: "8", s: "(", o: "{" },
      N9: { b: "9", s: ")", o: "}" },
      N0: { b: "0", s: "=" },
      SPACE: { b: " ", label: "␣" }
    })
  }
};

// Nordic siblings: same symbol map as Swedish, ö/ä swapped for ø/æ
LAYOUTS["no-mac"] = {
  name: "Norwegian (macOS)", lang: "no",
  keys: Object.assign({}, LAYOUTS["sv-mac"].keys, {
    SEMI: { b: "ø", cap: "Ø" },
    SQT:  { b: "æ", cap: "Æ" }
  })
};
LAYOUTS["da-mac"] = {
  name: "Danish (macOS)", lang: "da",
  keys: Object.assign({}, LAYOUTS["sv-mac"].keys, {
    SEMI: { b: "æ", cap: "Æ" },
    SQT:  { b: "ø", cap: "Ø" }
  })
};
LAYOUTS["fr-mac"] = {
  name: "French (macOS)", lang: "fr",
  keys: Object.assign(lettersAtoZ(), {
    Q: { b: "a", cap: "A" }, A: { b: "q", cap: "Q" },
    W: { b: "z", cap: "Z" }, Z: { b: "w", cap: "W" },
    SEMI: { b: "m", cap: "M" },
    M:     { b: ",", s: "?" },
    COMMA: { b: ";", s: "." },
    DOT:   { b: ":", s: "/" },
    FSLH:  { b: "=", s: "+" },
    N1: { b: "&", s: "1" },
    N2: { b: "é", s: "2" },
    N3: { b: "\"", s: "3" },
    N4: { b: "'", s: "4" },
    N5: { b: "(", s: "5" },
    N6: { b: "§", s: "6" },
    N7: { b: "è", s: "7" },
    N8: { b: "!", s: "8" },
    N9: { b: "ç", s: "9" },
    N0: { b: "à", s: "0" },
    MINUS: { b: ")", s: "°" },
    EQUAL: { b: "-", s: "_" },
    LBKT:  { b: "^", s: "¨", dead: true },
    RBKT:  { b: "$", s: "*" },
    SQT:   { b: "ù", s: "%" },
    BSLH:  { b: "`", s: "£" },
    GRAVE: { b: "@", s: "#" },
    NON_US_BSLH: { b: "<", s: ">" },
    SPACE: { b: " ", label: "␣" }
  })
};
LAYOUTS["es-mac"] = {
  name: "Spanish (macOS)", lang: "es",
  keys: Object.assign(lettersAtoZ(), {
    SEMI:  { b: "ñ", cap: "Ñ" },
    SQT:   { b: "´", s: "¨", dead: true },
    BSLH:  { b: "ç", cap: "Ç" },
    LBKT:  { b: "`", s: "^", dead: true },
    RBKT:  { b: "+", s: "*" },
    GRAVE: { b: "º", s: "ª" },
    NON_US_BSLH: { b: "<", s: ">" },
    COMMA: { b: ",", s: ";" },
    DOT:   { b: ".", s: ":" },
    FSLH:  { b: "-", s: "_" },
    MINUS: { b: "'", s: "?" },
    EQUAL: { b: "¡", s: "¿" },
    N1: { b: "1", s: "!" },
    N2: { b: "2", s: "\"", o: "@" },
    N3: { b: "3", s: "·", o: "#" },
    N4: { b: "4", s: "$" },
    N5: { b: "5", s: "%" },
    N6: { b: "6", s: "&" },
    N7: { b: "7", s: "/", o: "|" },
    N8: { b: "8", s: "(", o: "{" },
    N9: { b: "9", s: ")", o: "}" },
    N0: { b: "0", s: "=" },
    SPACE: { b: " ", label: "␣" }
  })
};

// map a locale id ("sv-SE-mac", "en-GB", …) onto one of our OS layouts
function layoutForLocale(locale) {
  if (!locale) return null;
  const parts = String(locale).toLowerCase().split("-");
  const lang = parts[0], region = parts[1] || "";
  const map = {
    sv: "sv-mac", no: "no-mac", nb: "no-mac", nn: "no-mac", da: "da-mac",
    de: "de-mac", fr: "fr-mac", es: "es-mac",
    en: (region === "gb" || region === "uk") ? "uk-mac" : "us"
  };
  return LAYOUTS[map[lang]] ? map[lang] : null;
}

// first visit: infer the OS input source from the browser's languages
function defaultLayout() {
  for (const loc of (navigator.languages || [navigator.language])) {
    const id = layoutForLocale(loc);
    if (id) return id;
  }
  return "us";
}

const savedOsLayout = store.getItem("tangent-oslayout");
let osLayout = savedOsLayout || defaultLayout();
if (!LAYOUTS[osLayout]) osLayout = defaultLayout();
// first visit with a guessed non-US layout: say so next to the selector
const osLayoutGuessed = !savedOsLayout && osLayout !== "us";

const MUTED_LABELS = {
  TAB: "⇥", ESC: "⎋", BSPC: "⌫", DEL: "⌦", RET: "⏎", ENTER: "⏎",
  LSHFT: "⇧", RSHFT: "⇧", LSHIFT: "⇧", RSHIFT: "⇧",
  LCTRL: "⌃", RCTRL: "⌃", LALT: "⌥", RALT: "⌥", LGUI: "⌘", RGUI: "⌘",
  CAPS: "⇪", HOME: "↖", END: "↘", PG_UP: "⇞", PG_DN: "⇟",
  LEFT: "◀", RIGHT: "▶", UP: "▲", DOWN: "▼",
  MAGIC: "✦", LOWER: "◆", MO: "◆", LAYER: "◆", NONE: "·", TRANS: "·",
  KEYPAD: "⬠", SYMNAV: "△"
};
for (let i = 1; i <= 12; i++) MUTED_LABELS["F" + i] = "F" + i;

// Standard Glove80 keymaps, extracted from MoErgo's Layout Editor (my.glove80.com)
const KEYMAPS = {
  "factory-mac": { name: "Factory default (macOS)", codes: [
    "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","EQUAL","N1",
    "N2","N3","N4","N5","N6","N7","N8","N9","N0","MINUS","TAB","Q",
    "W","E","R","T","Y","U","I","O","P","BSLH","ESC","A",
    "S","D","F","G","H","J","K","L","SEMI","SQT","GRAVE","Z",
    "X","C","V","B","LSHFT","LGUI","LOWER","LCTRL","RGUI","RSHFT","N","M",
    "COMMA","DOT","FSLH","PG_UP","MAGIC","HOME","END","LEFT","RIGHT","BSPC","DEL","LALT",
    "RALT","RET","SPACE","UP","DOWN","LBKT","RBKT","PG_DN"] },
  "factory": { name: "Factory default (Win/Linux)", codes: [
    "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","EQUAL","N1",
    "N2","N3","N4","N5","N6","N7","N8","N9","N0","MINUS","TAB","Q",
    "W","E","R","T","Y","U","I","O","P","BSLH","ESC","A",
    "S","D","F","G","H","J","K","L","SEMI","SQT","GRAVE","Z",
    "X","C","V","B","LSHFT","LCTRL","LOWER","LGUI","RCTRL","RSHFT","N","M",
    "COMMA","DOT","FSLH","PG_UP","MAGIC","HOME","END","LEFT","RIGHT","BSPC","DEL","LALT",
    "RALT","RET","SPACE","UP","DOWN","LBKT","RBKT","PG_DN"] },
  "colemak": { name: "Colemak", codes: [
    "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","EQUAL","N1",
    "N2","N3","N4","N5","N6","N7","N8","N9","N0","MINUS","TAB","Q",
    "W","F","P","G","J","L","U","Y","SEMI","BSLH","ESC","A",
    "R","S","T","D","H","N","E","I","O","SQT","GRAVE","Z",
    "X","C","V","B","LSHFT","LCTRL","LOWER","LGUI","RCTRL","RSHFT","K","M",
    "COMMA","DOT","FSLH","PG_UP","MAGIC","HOME","END","LEFT","RIGHT","BSPC","DEL","LALT",
    "RALT","RET","SPACE","UP","DOWN","LBKT","RBKT","PG_DN"] },
  "colemak-dh": { name: "Colemak-DH", codes: [
    "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","EQUAL","N1",
    "N2","N3","N4","N5","N6","N7","N8","N9","N0","MINUS","TAB","Q",
    "W","F","P","B","J","L","U","Y","SEMI","BSLH","ESC","A",
    "R","S","T","G","M","N","E","I","O","SQT","GRAVE","Z",
    "X","C","D","V","LSHFT","LCTRL","LOWER","LGUI","RCTRL","RSHFT","K","H",
    "COMMA","DOT","FSLH","PG_UP","MAGIC","HOME","END","LEFT","RIGHT","BSPC","DEL","LALT",
    "RALT","RET","SPACE","UP","DOWN","LBKT","RBKT","PG_DN"] },
  "dvorak": { name: "Dvorak", codes: [
    "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","EQUAL","N1",
    "N2","N3","N4","N5","N6","N7","N8","N9","N0","MINUS","TAB","SQT",
    "COMMA","DOT","P","Y","F","G","C","R","L","SLASH","ESC","A",
    "O","E","U","I","D","H","T","N","S","BSLH","GRAVE","SEMI",
    "Q","J","K","X","LSHFT","LCTRL","LOWER","LGUI","RCTRL","RSHFT","B","M",
    "W","V","Z","PG_UP","MAGIC","HOME","END","LEFT","RIGHT","BSPC","DEL","LALT",
    "RALT","RET","SPACE","UP","DOWN","LBKT","RBKT","PG_DN"] },
  "workman": { name: "Workman", codes: [
    "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","EQUAL","N1",
    "N2","N3","N4","N5","N6","N7","N8","N9","N0","MINUS","TAB","Q",
    "D","R","W","B","J","F","U","P","SEMI","BSLH","ESC","A",
    "S","H","T","G","Y","N","E","O","I","SQT","GRAVE","Z",
    "X","M","C","V","LSHFT","LCTRL","LOWER","LGUI","RCTRL","RSHFT","K","L",
    "COMMA","DOT","FSLH","PG_UP","MAGIC","HOME","END","LEFT","RIGHT","BSPC","DEL","LALT",
    "RALT","RET","SPACE","UP","DOWN","LBKT","RBKT","PG_DN"] },
};
for (const k of Object.values(KEYMAPS)) k.board = "glove80";
const KEY_ALIASES = { SLASH: "FSLH", LSHIFT: "LSHFT", RSHIFT: "RSHFT", ENTER: "RET" };


// Column slots (top→bottom) per half; null = no key in that row slot
// Function row sits on the OUTER columns (matches the physical Glove80):
// left F1 over =, right F10 over the outer pinky (- / +).
const LEFT_COLS = [
  [0, 10, 22, 34, 46, 64],
  [1, 11, 23, 35, 47, 65],
  [2, 12, 24, 36, 48, 66],
  [3, 13, 25, 37, 49, 67],
  [4, 14, 26, 38, 50, 68],
  [null, 15, 27, 39, 51, null]
];
const RIGHT_COLS = [
  [null, 16, 28, 40, 58, null],
  [5, 17, 29, 41, 59, 75],
  [6, 18, 30, 42, 60, 76],
  [7, 19, 31, 43, 61, 77],
  [8, 20, 32, 44, 62, 78],
  [9, 21, 33, 45, 63, 79]
];
const THUMBS = {
  leftTop: [52, 53, 54], leftBot: [69, 70, 71],
  rightTop: [55, 56, 57], rightBot: [72, 73, 74]
};

/* Exact physical key geometry, transcribed from MoErgo's ZMK firmware
   (app/boards/arm/glove80/glove80-layouts.dtsi) — the same data the
   Layout Editor renders from. Units: 100 = one key pitch; every key is
   100×100. Entry: [x, y, rot(centideg), rx, ry] with (rx,ry) the pivot
   the thumb keys rotate around. Only the two outer (pinky-side) columns
   are staggered, half a key lower; the rest of the matrix is flat. */
const G80_GEOM = [];
{
  const LX = [0, 100, 200, 300, 400, 500], RX = [1200, 1300, 1400, 1500, 1600, 1700];
  const stagL = [50, 50, 0, 0, 0, 0], stagR = [0, 0, 0, 0, 50, 50];
  // function row: the outer five columns of each half
  [0, 1, 2, 3, 4].forEach(c => { G80_GEOM[c] = [LX[c], stagL[c]]; });
  [1, 2, 3, 4, 5].forEach((c, i) => { G80_GEOM[5 + i] = [RX[c], stagR[c]]; });
  // four full six-key rows
  const rowL = [10, 22, 34, 46], rowR = [16, 28, 40, 58];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
    G80_GEOM[rowL[r] + c] = [LX[c], 100 + r * 100 + stagL[c]];
    G80_GEOM[rowR[r] + c] = [RX[c], 100 + r * 100 + stagR[c]];
  }
  // bottom row: the outer five columns of each half
  [0, 1, 2, 3, 4].forEach(c => { G80_GEOM[64 + c] = [LX[c], 500 + stagL[c]]; });
  [1, 2, 3, 4, 5].forEach((c, i) => { G80_GEOM[75 + i] = [RX[c], 500 + stagR[c]]; });
  // thumb fans, each key rotated around a pivot under the palm
  [[52, 3000], [53, 4500], [54, 6000]].forEach(([i, rot]) => { G80_GEOM[i] = [400, 450, rot, 450, 925]; });
  [[55, -6000], [56, -4500], [57, -3000]].forEach(([i, rot]) => { G80_GEOM[i] = [1300, 450, rot, 1350, 925]; });
  [[69, 2000], [70, 4000], [71, 6000]].forEach(([i, rot]) => { G80_GEOM[i] = [400, 550, rot, 450, 925]; });
  [[72, -6000], [73, -4000], [74, -2000]].forEach(([i, rot]) => { G80_GEOM[i] = [1300, 550, rot, 1350, 925]; });
}

/* ---------------- Go60 board (MoErgo's 60-key split) ----------------
   ZMK positions 0–59, in firmware order. Columns C2/C3/C4 have a 5th
   (lower) row; C1/C5/C6 have four. One curved 3-key thumb cluster per hand. */
const GO60_FACTORY_CODES = [
  "EQUAL","N1","N2","N3","N4","N5","N6","N7","N8","N9","N0","MINUS",
  "TAB","Q","W","E","R","T","Y","U","I","O","P","BSLH",
  "ESC","A","S","D","F","G","H","J","K","L","SEMI","SQT",
  "MAGIC","Z","X","C","V","B","N","M","COMMA","DOT","FSLH","KEYPAD",
  "GRAVE","DEL","BSPC","LGUI","LBKT","RBKT",
  "SYMNAV","LSHFT","LCTRL","LALT","SPACE","RET"
];
// column slots top→bottom (null = no key); function-free number row on top
const GO60_LEFT_COLS = [
  [0, 12, 24, 36, null],
  [1, 13, 25, 37, null],
  [2, 14, 26, 38, 48],
  [3, 15, 27, 39, 49],
  [4, 16, 28, 40, 50],
  [5, 17, 29, 41, null]
];
const GO60_RIGHT_COLS = [
  [6, 18, 30, 42, null],
  [7, 19, 31, 43, 51],
  [8, 20, 32, 44, 52],
  [9, 21, 33, 45, 53],
  [10, 22, 34, 46, null],
  [11, 23, 35, 47, null]
];
const GO60_THUMBS = { leftTop: [54, 55, 56], leftBot: null, rightTop: [57, 58, 59], rightBot: null };

// Go60 geometry: same conventions as the Glove80 (outer two columns
// staggered half a key, one fanned thumb arc per hand)
const GO60_GEOM = [];
{
  const stagL = [50, 50, 0, 0, 0, 0], stagR = [0, 0, 0, 0, 50, 50];
  GO60_LEFT_COLS.forEach((slots, c) => slots.forEach((idx, r) => {
    if (idx !== null) GO60_GEOM[idx] = [c * 100, r * 100 + stagL[c]];
  }));
  GO60_RIGHT_COLS.forEach((slots, c) => slots.forEach((idx, r) => {
    if (idx !== null) GO60_GEOM[idx] = [1200 + c * 100, r * 100 + stagR[c]];
  }));
  [[54, 3000], [55, 4500], [56, 6000]].forEach(([i, rot]) => { GO60_GEOM[i] = [400, 450, rot, 450, 925]; });
  [[57, -6000], [58, -4500], [59, -3000]].forEach(([i, rot]) => { GO60_GEOM[i] = [1300, 450, rot, 1350, 925]; });
}

// Build a Go60 code array from a Glove80 keymap by copying its alpha block
// (3 rows × 10 keys) into the Go60 positions; everything else stays factory.
const G80_ALPHA = [23,24,25,26,27,28,29,30,31,32, 35,36,37,38,39,40,41,42,43,44, 47,48,49,50,51,58,59,60,61,62];
const GO60_ALPHA = [13,14,15,16,17,18,19,20,21,22, 25,26,27,28,29,30,31,32,33,34, 37,38,39,40,41,42,43,44,45,46];
function buildGo60(src) {
  const out = GO60_FACTORY_CODES.slice();
  G80_ALPHA.forEach((g, i) => { out[GO60_ALPHA[i]] = src[g]; });
  return out;
}
Object.assign(KEYMAPS, {
  "go60-factory":    { name: "Go60 · Factory (QWERTY)", board: "go60", codes: GO60_FACTORY_CODES.slice() },
  "go60-colemak":    { name: "Go60 · Colemak",          board: "go60", codes: buildGo60(KEYMAPS.colemak.codes) },
  "go60-colemak-dh": { name: "Go60 · Colemak-DH",       board: "go60", codes: buildGo60(KEYMAPS["colemak-dh"].codes) },
  "go60-dvorak":     { name: "Go60 · Dvorak",           board: "go60", codes: buildGo60(KEYMAPS.dvorak.codes) },
  "go60-workman":    { name: "Go60 · Workman",          board: "go60", codes: buildGo60(KEYMAPS.workman.codes) }
});

// board geometry registry; the visible board follows the selected layout
const BOARDS = {
  glove80: { leftCols: LEFT_COLS,      rightCols: RIGHT_COLS,      thumbs: THUMBS,      geom: G80_GEOM,  homeRow: 4 },
  go60:    { leftCols: GO60_LEFT_COLS, rightCols: GO60_RIGHT_COLS, thumbs: GO60_THUMBS, geom: GO60_GEOM, homeRow: 3 }
};
let currentBoard = "glove80";
function boardOf(choice) {
  if (choice === "custom") return (customCodes && customCodes.length === 60) ? "go60" : "glove80";
  return (KEYMAPS[choice] && KEYMAPS[choice].board) || "glove80";
}

let keyEls = [];
let keyGlyphs = [];
let charKeyMap = {};
let shiftKeyEls = [];
let altKeyEls = [];

function makeKey(code, idx) {
  const el = document.createElement("div");
  el.className = "key";
  const g = LAYOUTS[osLayout].keys[code] || LAYOUTS[osLayout].keys[KEY_ALIASES[code]];
  keyGlyphs[idx] = g || null;
  if (g) {
    el.textContent = g.label || g.b;
    if (g.s) {
      const s = document.createElement("span");
      s.className = "s"; s.textContent = g.s;
      el.appendChild(s);
    }
    const optText = [g.o, g.so].filter(Boolean).join(" ");
    if (optText) {
      const o = document.createElement("span");
      o.className = "o"; o.textContent = optText;
      el.appendChild(o);
    }
    charKeyMap[g.b] = charKeyMap[g.b] || { idx, shift: false, alt: false };
    if (g.cap) charKeyMap[g.cap] = { idx, shift: true, alt: false };
    if (g.s)   charKeyMap[g.s]   = charKeyMap[g.s]   || { idx, shift: true, alt: false };
    if (g.o)   charKeyMap[g.o]   = charKeyMap[g.o]   || { idx, shift: false, alt: true };
    if (g.so)  charKeyMap[g.so]  = charKeyMap[g.so]  || { idx, shift: true, alt: true };
  } else {
    el.classList.add("mutedkey");
    const base = code.split("_")[0];
    el.textContent = MUTED_LABELS[code] || MUTED_LABELS[base] || code.slice(0, 4).toLowerCase();
    if (code === "LSHFT" || code === "RSHFT" || code === "LSHIFT" || code === "RSHIFT") shiftKeyEls.push(el);
    if (code === "LALT" || code === "RALT") altKeyEls.push(el);
  }
  keyEls[idx] = el;
  return el;
}

// px per geometry unit: 100 units (one key pitch) → 64px, keys 58px + 6px gap
const KEY_SCALE = 0.64;

// resolve a geometry entry to an axis-aligned position + rotation about the
// key's own centre (so the hit/miss scale animations stay in place)
function keyPlace(gm) {
  let [x, y, rot = 0, rx = 0, ry = 0] = gm;
  if (rot) {
    const th = (rot / 100) * Math.PI / 180;
    const vx = x + 50 - rx, vy = y + 50 - ry;
    x = rx + vx * Math.cos(th) - vy * Math.sin(th) - 50;
    y = ry + vx * Math.sin(th) + vy * Math.cos(th) - 50;
  }
  return { x, y, deg: rot / 100 };
}

const boardFit = document.getElementById("boardFit");
function fitBoard() {
  const board = document.getElementById("board");
  const w = parseFloat(board.style.width);
  const h = parseFloat(board.style.height);
  if (!w) return;
  const avail = boardFit.parentElement.clientWidth - 32; // panel padding
  const s = Math.min(1, avail / w);
  board.style.transform = s < 1 ? "scale(" + s + ")" : "";
  boardFit.style.width = (w * s) + "px";
  boardFit.style.height = (h * s) + "px";
}
window.addEventListener("resize", fitBoard);

// characters produced by a dead key followed by a vowel
const DEAD_COMPOSE = {
  "´": { a: "á", e: "é", i: "í", o: "ó", u: "ú" },
  "`": { a: "à", e: "è", i: "ì", o: "ò", u: "ù" },
  "^": { a: "â", e: "ê", i: "î", o: "ô", u: "û" },
  "¨": { a: "ä", e: "ë", i: "ï", o: "ö", u: "ü" },
  "~": { a: "ã", n: "ñ", o: "õ" }
};

function registerCompositions() {
  keyGlyphs.forEach((g, idx) => {
    if (!g || !g.dead) return;
    const variants = [[g.b, false, false], [g.s, true, false], [g.o, false, true]];
    for (const [d, sh, al] of variants) {
      const table = d && DEAD_COMPOSE[d];
      if (!table) continue;
      for (const [vowel, accented] of Object.entries(table)) {
        if (!charKeyMap[accented] && charKeyMap[vowel]) {
          charKeyMap[accented] = { idx, shift: sh, alt: al, then: vowel };
          const up = accented.toUpperCase();
          if (!charKeyMap[up]) charKeyMap[up] = { idx, shift: sh, alt: al, then: vowel.toUpperCase() };
        }
      }
    }
  });
}

function renderBoard(codes) {
  keyEls = []; keyGlyphs = []; charKeyMap = {}; shiftKeyEls = []; altKeyEls = [];
  const B = BOARDS[currentBoard] || BOARDS.glove80;
  const board = document.getElementById("board");
  board.replaceChildren();
  let maxY = 0;
  B.geom.forEach((gm, idx) => {
    if (!gm) return;
    const el = makeKey(codes[idx], idx);
    const p = keyPlace(gm);
    el.style.left = (p.x * KEY_SCALE + 3) + "px";
    el.style.top = (p.y * KEY_SCALE + 3) + "px";
    if (p.deg) el.style.setProperty("--kt", "rotate(" + p.deg + "deg)");
    board.appendChild(el);
    maxY = Math.max(maxY, p.y + 100 + (p.deg ? 30 : 0)); // rotated corners stick out
  });
  board.style.width = (1800 * KEY_SCALE) + "px";
  board.style.height = ((maxY + 10) * KEY_SCALE) + "px";
  fitBoard();
  buildCoords(B);
  keyEls.forEach((el, idx) => {
    const f = fingerOf(idx);
    if (f) el.classList.add("f-" + f);
    // ring the home position: the four finger columns of the home row
    const k = KEYCOORD[idx];
    if (k && k.r === B.homeRow && k.c >= 2 && k.c <= 5) el.classList.add("home");
  });
  registerCompositions();
  courseOrder = null; // key positions changed, so the unlock order may too
  renderCoursePanel();
}

// which finger a key belongs to, from its MoErgo column number
// (C1 inner reach + C2 = index, C3 = middle, C4 = ring, C5 + C6 outer = pinky)
function fingerOf(idx) {
  const k = KEYCOORD[idx];
  if (!k) return null;
  if (k.t !== undefined) return "thumb";
  return ["index", "index", "middle", "ring"][k.c - 1] || "pinky";
}

// flash the wrongly pressed key in red, with an arrow toward the right key
// and +⇧/−⇧ (+⌥/−⌥) badges for missing or extra modifiers
function redFlash(el) {
  el.classList.add("miss");
  clearTimeout(el._missTimer);
  el._missTimer = setTimeout(() => {
    el.classList.remove("miss");
    const dd = el.querySelector(".dir");
    if (dd) dd.remove();
  }, 1200);
}

function flashMiss(got, exp) {
  const ref = keyRef(got);
  if (!ref) return;
  const el = keyEls[ref.idx];
  if (!el) return;
  const old = el.querySelector(".dir");
  if (old) old.remove();

  const eref = keyRef(exp);
  let arrow = null;
  const mods = [];
  if (eref) {
    if (eref.shift && !ref.shift) mods.push("+⇧");
    if (!eref.shift && ref.shift) mods.push("−⇧");
    if (eref.alt && !ref.alt) mods.push("+⌥");
    if (!eref.alt && ref.alt) mods.push("−⌥");
    if (eref.idx !== ref.idx && POS[eref.idx] && POS[ref.idx]) {
      const dx = Math.sign(POS[eref.idx].x - POS[ref.idx].x);
      const dy = Math.sign(POS[eref.idx].row - POS[ref.idx].row);
      const ARROWS = {
        "1,0": "→", "-1,0": "←", "0,1": "↓", "0,-1": "↑",
        "1,-1": "↗", "1,1": "↘", "-1,-1": "↖", "-1,1": "↙"
      };
      arrow = ARROWS[dx + "," + dy] || null;
    }
  }

  if (arrow || mods.length) {
    const d = document.createElement("span");
    d.className = "dir";
    if (arrow) {
      const a = document.createElement("span");
      a.className = "darrow";
      a.textContent = arrow;
      d.appendChild(a);
    }
    if (mods.length) {
      const m = document.createElement("span");
      m.className = "dmods" + (arrow ? "" : " solo");
      m.textContent = mods.join(" ");
      d.appendChild(m);
    }
    el.appendChild(d);
  }
  redFlash(el);
  showBigDir(arrow, mods);

  // an extra modifier was held — flash the modifier key itself red too
  if (mods.includes("−⇧")) for (const s of shiftKeyEls) redFlash(s);
  if (mods.includes("−⌥")) for (const a of altKeyEls) redFlash(a);
  // (a missing modifier already glows yellow via the next-key highlight)
}

// oversized arrow overlaying the whole board, so the correction is visible at a glance
let bigDirTimer = null;
function showBigDir(arrow, mods) {
  if (!arrow && !mods.length) return;
  const big = document.getElementById("bigDir");
  big.replaceChildren();
  if (arrow) {
    const a = document.createElement("span");
    a.className = "ba";
    a.textContent = arrow;
    big.appendChild(a);
  }
  if (mods.length) {
    const m = document.createElement("span");
    m.className = "bm";
    m.textContent = mods.join("  ");
    big.appendChild(m);
  }
  big.classList.add("show");
  clearTimeout(bigDirTimer);
  bigDirTimer = setTimeout(() => big.classList.remove("show"), 900);
}

function highlightFor(ch) {
  for (const el of document.querySelectorAll(".key.hit")) el.classList.remove("hit");
  if (ch === undefined) return;
  const lookup = charKeyMap[ch];
  if (!lookup) return;
  if (keyEls[lookup.idx]) keyEls[lookup.idx].classList.add("hit");
  if (lookup.shift) for (const el of shiftKeyEls) el.classList.add("hit");
  if (lookup.alt) for (const el of altKeyEls) el.classList.add("hit");
}

