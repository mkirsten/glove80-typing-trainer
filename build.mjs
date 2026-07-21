// Assembles src/ into the single index.html the site ships.
// No dependencies:  node build.mjs
import { readFileSync, writeFileSync } from "node:fs";

// concatenation order matters: later modules use what earlier ones define
const JS_MODULES = [
  "store.js",      // localStorage probe with in-memory fallback
  "content.js",    // drill text: word lists, quotes, language packs
  "generators.js", // line generators: modes, pick/deal, pseudo-words
  "feed.js",       // Hacker News / RSS headlines and the reading list
  "state.js",      // shared typing state, stat elements, mode tabs
  "typing.js",     // line lifecycle, prompt rendering, session sparkline
  "input.js",      // keystroke handling and per-stroke bookkeeping
  "board.js",      // Glove80/Go60 geometry, key rendering, miss flashes
  "insights.js",   // problem-key analysis and advice
  "review.js",     // miss bag and the Weak keys drill
  "course.js",     // guided learn-the-board course
  "keymap.js",     // keymap/layout import, selects, cheat sheet
  "custom.js",     // custom text panel and headline source panel
  "main.js",       // init and the demo video
];

const read = p => readFileSync(new URL(p, import.meta.url), "utf8");

const css = read("src/style.css");
const js = JS_MODULES.map(f => read("src/js/" + f)).join("");

const banner = "<!-- Generated from src/ — edit there, then run: node build.mjs -->\n";
const page = read("src/page.html")
  .replace("<!doctype html>\n", m => m + banner)
  .replace("<!-- @style -->\n", () => "<style>\n" + css + "</style>\n")
  .replace("<!-- @script -->\n", () => "<script>\n" + js + "<\/script>\n");

writeFileSync(new URL("index.html", import.meta.url), page);
console.log("built index.html (" + (page.length / 1024).toFixed(0) + " kB)");
