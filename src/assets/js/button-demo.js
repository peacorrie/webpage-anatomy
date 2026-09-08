(function () {
  function runOnce(btn, steps) {
    if (btn.disabled) return;
    var label = btn.querySelector(".state-demo__async-label");
    var original = btn.dataset.defaultLabel;
    btn.disabled = true;

    var i = 0;
    function next() {
      if (i >= steps.length) {
        label.textContent = original;
        btn.disabled = false;
        return;
      }
      var step = steps[i];
      i += 1;
      label.innerHTML = step.html;
      setTimeout(next, step.delay);
    }
    next();
  }

  var loadingBtn = document.getElementById("loadingDemoBtn");
  if (loadingBtn) {
    loadingBtn.addEventListener("click", function () {
      runOnce(loadingBtn, [
        { html: '<span class="state-demo__spinner" aria-hidden="true"></span> Loading…', delay: 1400 },
      ]);
    });
  }

  var successBtn = document.getElementById("successDemoBtn");
  if (successBtn) {
    successBtn.addEventListener("click", function () {
      runOnce(successBtn, [
        { html: '<span class="state-demo__spinner" aria-hidden="true"></span> Saving…', delay: 700 },
        { html: '✓ Saved!', delay: 1200 },
      ]);
    });
  }
})();
