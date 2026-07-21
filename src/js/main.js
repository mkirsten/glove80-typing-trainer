/* ---------------- go ---------------- */

buildTabs(mode.id);
loadBest();
renderInsights();
renderReadList();
updateCustomPanel();
if (osLayoutGuessed) {
  importMsg.textContent = "OS input guessed from your browser: " + LAYOUTS[osLayout].name + " — change it if wrong";
  setTimeout(() => { if (importMsg.textContent.startsWith("OS input guessed")) importMsg.textContent = ""; }, 15000);
}
renderFocusNote(false);
newLine();
// On a phone, focusing the input scrolls the page past the header and throws
// up the soft keyboard — so the visitor lands below the one thing that is
// useful to them there (the demo). Let them tap in themselves.
if (!matchMedia("(pointer: coarse)").matches) els.ghost.focus();

/* ---------------- demo video ---------------- */

// opening the panel is the click, so start playing right there; closing it
// rewinds, and typing keeps working because the video never takes focus
const demo = document.getElementById("demo");
const demoVideo = document.getElementById("demoVideo");
demo.addEventListener("toggle", () => {
  if (demo.open) {
    demoVideo.play().catch(() => { /* let the controls handle it */ });
  } else {
    demoVideo.pause();
    demoVideo.currentTime = 0;
    els.ghost.focus();
  }
});
