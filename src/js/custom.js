/* ---------------- custom text ---------------- */

let customRaw = store.getItem("tangent-custom") || "";
function splitCustom(t) {
  return [...new Set(
    t.split(/\n+/).map(s => foldTypography(s).replace(/\s+/g, " ").trim()).filter(Boolean)
  )];
}
let customLines = splitCustom(customRaw);

// deal only lines this layout can type — a line skipped by newLine's re-roll
// would silently eat the bag and put the dealing order back to random
let customPool = null;
function genCustom() {
  if (!customLines.length) return "paste your own text in the box above, then start typing";
  if (!customPool) {
    const usable = customLines.filter(typeable);
    customPool = usable.length ? usable : customLines;
  }
  return deal(customPool);
}

function buildPrompt() {
  const lang = LANG_NAMES[effLang()] || "English";
  const weak = topTroubleChars(6).filter(c => c !== " ");
  let p = "Write 12 short lines of " + lang + " text for typing practice. "
        + "Put one sentence per line, with no numbering, bullets, or surrounding quotes. "
        + "Keep each line under 60 characters and use everyday vocabulary.";
  if (weak.length) {
    p += " Work in extra words containing these characters I want to practise: "
       + weak.join(" ") + ".";
  }
  return p;
}

const customPanel = document.getElementById("customPanel");
const customText = document.getElementById("customText");
const customMsg = document.getElementById("customMsg");
customText.value = customRaw;

customText.addEventListener("input", () => {
  customRaw = customText.value;
  store.setItem("tangent-custom", customRaw);
  customLines = splitCustom(customRaw);
  customPool = null; // the old pool may hold lines that were just edited away
  if (mode.id === "custom" && els.ghost.value === "") newLine();
});

function copyPrompt() {
  const text = buildPrompt();
  const ok = () => {
    customMsg.textContent = "Prompt copied — paste it into your LLM, then paste the reply back here.";
    customMsg.classList.add("ok");
    setTimeout(() => { customMsg.textContent = ""; customMsg.classList.remove("ok"); }, 6000);
  };
  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let done = false;
    try { done = document.execCommand("copy"); } catch (e) { done = false; }
    document.body.removeChild(ta);
    if (done) ok();
    else {
      customMsg.classList.remove("ok");
      customMsg.textContent = "Couldn't reach the clipboard — prompt: " + text;
    }
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(ok).catch(fallback);
  } else {
    fallback();
  }
}
document.getElementById("copyPromptBtn").addEventListener("click", copyPrompt);

function updateCustomPanel() {
  customPanel.hidden = mode.id !== "custom";
  updateFeedPanel();
  renderCoursePanel();
}

/* ---------------- headline source panel ---------------- */

const feedPanel = document.getElementById("feedPanel");
const feedSel = document.getElementById("feedSel");
const feedUrl = document.getElementById("feedUrl");
const feedLoad = document.getElementById("feedLoad");
const feedMsg = document.getElementById("feedMsg");
feedSel.value = feedCfg.type;
feedUrl.value = feedCfg.url;

function updateFeedPanel() {
  feedPanel.hidden = mode.id !== "hn";
  const rss = feedSel.value === "rss";
  feedUrl.hidden = !rss;
  feedLoad.hidden = !rss;
}

function applyFeed() {
  store.setItem("tangent-feed", JSON.stringify(feedCfg));
  feedGen++;
  hnQueue = [];
  hnError = false;
  hnLoading = false;
  currentStory = null;
  prevStory = null;
  buildTabs(mode.id);
  feedMsg.classList.remove("ok");
  if (feedCfg.type === "rss" && !feedCfg.url) {
    feedMsg.textContent = "Paste a feed URL and press Load.";
  } else {
    feedMsg.textContent = "";
    loadFeed();
  }
  if (mode.id === "hn") {
    newLine();
    els.ghost.focus();
  }
}

feedSel.addEventListener("change", () => {
  feedCfg.type = feedSel.value;
  updateFeedPanel();
  applyFeed();
  if (feedCfg.type === "rss" && !feedCfg.url) feedUrl.focus();
});
function loadFeedUrl() {
  feedCfg.url = feedUrl.value.trim();
  applyFeed();
}
feedLoad.addEventListener("click", loadFeedUrl);
feedUrl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); loadFeedUrl(); }
});

