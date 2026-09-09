(function () {
  var playBtn = document.getElementById("pageLoadPlay");
  if (!playBtn) return;

  var steps = Array.from(document.querySelectorAll("#pageLoadSteps .page-load-step"));
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var playing = false;

  function reset() {
    steps.forEach(function (step) {
      step.classList.remove("is-active", "is-done");
    });
  }

  function play() {
    if (playing) return;
    playing = true;
    playBtn.disabled = true;
    reset();

    var delay = reduceMotion ? 0 : 550;
    var i = 0;

    function next() {
      if (i > 0) steps[i - 1].classList.replace("is-active", "is-done");
      if (i >= steps.length) {
        playing = false;
        playBtn.disabled = false;
        return;
      }
      steps[i].classList.add("is-active");
      i += 1;
      setTimeout(next, delay);
    }
    next();
  }

  playBtn.addEventListener("click", play);
})();
