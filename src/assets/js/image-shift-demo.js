(function () {
  var playBtn = document.getElementById("imageShiftPlay");
  if (!playBtn) return;

  var badSlot = document.getElementById("imageShiftBadSlot");
  var goodSlot = document.getElementById("imageShiftGoodSlot");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function run() {
    playBtn.disabled = true;
    badSlot.classList.remove("is-loaded");
    goodSlot.classList.remove("is-loaded");

    setTimeout(function () {
      badSlot.classList.add("is-loaded");
      goodSlot.classList.add("is-loaded");
      playBtn.disabled = false;
    }, reduceMotion ? 300 : 1200);
  }

  playBtn.addEventListener("click", run);
})();
