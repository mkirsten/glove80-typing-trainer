/* ---------------- headlines mode (Hacker News or any RSS/Atom feed) ---------------- */

let feedCfg = { type: "hn", url: "" };
try { feedCfg = Object.assign(feedCfg, JSON.parse(store.getItem("tangent-feed")) || {}); } catch (e) { /* fresh */ }

let hnQueue = [];
let hnLoading = false;
let hnError = false;
let feedGen = 0; // bumped on source change to void in-flight fetches
let currentStory = null;
let prevStory = null;
let readList = [];
try { readList = JSON.parse(store.getItem("tangent-readlist")) || []; } catch (e) { /* fresh */ }

// fold typography no keyboard has (curly quotes, long dashes) onto real keys
function foldTypography(t) {
  return t
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/×/g, "x")
    .replace(/…/g, "...")
    .replace(/\u00A0/g, " ");
}

function sanitizeHeadline(t) {
  return foldTypography(t)
    .replace(/[^\x20-\x7EåäöÅÄÖæÆøØüÜßéÉèÈêÊëËçÇàÀâÂùÙûÛîÎïÏôÔñÑíÍóÓúÚ¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// parse an RSS 2.0 or Atom document into {title, url} stories
function parseFeedText(text) {
  const doc = new DOMParser().parseFromString(text, "text/xml");
  if (doc.querySelector("parsererror")) throw new Error("not valid XML");
  return [...doc.querySelectorAll("item, entry")].map(it => {
    const linkEl = it.querySelector("link");
    const url = linkEl ? (linkEl.getAttribute("href") || linkEl.textContent || "").trim() : "";
    const titleEl = it.querySelector("title");
    return { title: sanitizeHeadline(titleEl ? titleEl.textContent : ""), url };
  }).filter(s => s.title.length >= 8 && s.title.length <= 100);
}

// direct fetch first (works for feeds that send CORS headers),
// then rss2json.com, a CORS-enabled feed-to-JSON service, for the rest
function fetchRss(url) {
  return fetch(url)
    .then(r => { if (!r.ok) throw new Error("http " + r.status); return r.text(); })
    .then(parseFeedText)
    .catch(() =>
      fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(url))
        .then(r => r.json())
        .then(j => {
          if (j.status !== "ok") throw new Error("feed service failed");
          return (j.items || [])
            .map(it => ({ title: sanitizeHeadline(it.title || ""), url: it.link || "" }))
            .filter(s => s.title.length >= 8 && s.title.length <= 100);
        }));
}

function loadFeed() {
  if (hnLoading) return;
  if (feedCfg.type === "rss" && !feedCfg.url) return;
  hnLoading = true;
  const gen = feedGen;
  const done = list => {
    if (gen !== feedGen) return; // source changed while fetching
    hnQueue = list;
    // shuffle
    for (let i = hnQueue.length - 1; i > 0; i--) {
      const j2 = Math.floor(Math.random() * (i + 1));
      [hnQueue[i], hnQueue[j2]] = [hnQueue[j2], hnQueue[i]];
    }
    hnLoading = false;
    hnError = hnQueue.length === 0;
    if (mode.id === "hn" && els.ghost.value === "") newLine();
  };
  const fail = () => {
    if (gen !== feedGen) return;
    hnLoading = false;
    hnError = true;
    if (mode.id === "hn" && els.ghost.value === "") newLine();
  };
  if (feedCfg.type === "rss") {
    fetchRss(feedCfg.url).then(done).catch(fail);
  } else {
    fetch("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30")
      .then(r => r.json())
      .then(j => done((j.hits || []).map(h => ({
        title: sanitizeHeadline(h.title || ""),
        url: h.url || ("https://news.ycombinator.com/item?id=" + h.objectID)
      })).filter(s => s.title.length >= 8 && s.title.length <= 100)))
      .catch(fail);
  }
}

function genHN() {
  if (feedCfg.type === "rss" && !feedCfg.url) {
    prevStory = currentStory;
    currentStory = null;
    return "paste an rss feed url in the panel above, then press load";
  }
  if (hnError && !hnQueue.length) {
    prevStory = currentStory;
    currentStory = null;
    return feedCfg.type === "rss"
      ? "Could not load that feed - check the url and press load to retry"
      : "Could not load Hacker News - press esc to retry, or pick another mode above";
  }
  if (!hnQueue.length) {
    loadFeed();
    prevStory = currentStory;
    currentStory = null;
    return "Fetching headlines from " + (feedCfg.type === "rss" ? "the feed" : "Hacker News") + " ...";
  }
  prevStory = currentStory;
  currentStory = hnQueue.shift();
  if (!hnQueue.length) hnError = false; // queue drained — allow a refetch next time
  return currentStory.title;
}

function saveHeadline() {
  const story = (els.ghost.value.length === 0 && prevStory) ? prevStory : currentStory;
  if (!story) return;
  if (!readList.some(s => s.url === story.url)) {
    readList.push(story);
    store.setItem("tangent-readlist", JSON.stringify(readList));
    renderReadList();
  }
  els.result.replaceChildren("Saved to reading list: ", makeBold(story.title));
}

function renderReadList() {
  const body = document.getElementById("rlBody");
  body.replaceChildren();
  if (!readList.length) {
    const p = document.createElement("div");
    p.className = "ins-empty";
    p.textContent = "In Hacker News / RSS mode: press ⏎ during or right after a headline to save its link here — read them once your session is done.";
    body.appendChild(p);
    return;
  }
  for (const s of readList) {
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = s.title;
    a.title = s.title;
    body.appendChild(a);
  }
}

document.getElementById("rlClear").addEventListener("click", () => {
  readList = [];
  store.removeItem("tangent-readlist");
  renderReadList();
});

