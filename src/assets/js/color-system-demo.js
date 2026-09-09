(function () {
  var toggleBtn = document.getElementById("colorSystemToggle");
  if (!toggleBtn) return;

  var root = document.documentElement;
  var tokens = [
    { prop: "--paper", swatch: "csPaperSwatch", value: "csPaperValue" },
    { prop: "--ink", swatch: "csInkSwatch", value: "csInkValue" },
    { prop: "--surface", swatch: "csSurfaceSwatch", value: "csSurfaceValue" },
    { prop: "--accent-pink", swatch: "csAccentSwatch", value: "csAccentValue" }
  ];

  function update() {
    var styles = getComputedStyle(root);
    tokens.forEach(function (t) {
      var val = styles.getPropertyValue(t.prop).trim();
      var swatchEl = document.getElementById(t.swatch);
      var valueEl = document.getElementById(t.value);
      if (swatchEl) swatchEl.style.background = val;
      if (valueEl) valueEl.textContent = val.toUpperCase();
    });
  }

  toggleBtn.addEventListener("click", function () {
    var themeToggle = document.getElementById("themeToggle");
    if (themeToggle) themeToggle.click();
  });

  new MutationObserver(update).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  update();
})();
