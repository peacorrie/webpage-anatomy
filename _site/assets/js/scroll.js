(function () {
  var gridOverlay = document.getElementById("gridOverlay");
  var gridToggle = document.getElementById("gridToggle");
  var gridToggleInline = document.getElementById("gridToggleInline");
  var gridVisible = false;

  function toggleGrid() {
    gridVisible = !gridVisible;
    if (gridOverlay) gridOverlay.classList.toggle("visible", gridVisible);
    if (gridToggle) gridToggle.setAttribute("aria-pressed", String(gridVisible));
    if (gridToggleInline) gridToggleInline.setAttribute("aria-pressed", String(gridVisible));
  }

  if (gridToggle) {
    gridToggle.addEventListener("click", toggleGrid);
  }
  if (gridToggleInline) {
    gridToggleInline.addEventListener("click", toggleGrid);
  }

  document.addEventListener("keydown", function (e) {
    var target = e.target;
    var isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable;
    if (!isTyping && (e.key === "g" || e.key === "G")) {
      toggleGrid();
    }
  });

  var progress = document.getElementById("scrollProgress");
  if (progress) {
    var ticking = false;
    function updateProgress() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      progress.style.width = pct + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
    updateProgress();
  }
})();
