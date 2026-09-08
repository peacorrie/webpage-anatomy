(function () {
  var fgPicker = document.getElementById("ccFgPicker");
  var fgHex = document.getElementById("ccFgHex");
  var bgPicker = document.getElementById("ccBgPicker");
  var bgHex = document.getElementById("ccBgHex");
  if (!fgPicker || !window.WA || !window.WA.contrast) return;

  var preview = document.getElementById("ccPreview");
  var ratioEl = document.getElementById("ccRatio");
  var badges = document.querySelectorAll("#ccBadges .contrast-badge");
  var HEX_RE = /^#?[0-9a-fA-F]{3}$|^#?[0-9a-fA-F]{6}$/;

  function normalize(hex) {
    return hex.charAt(0) === "#" ? hex : "#" + hex;
  }

  function update() {
    var fg = fgHex.value.trim();
    var bg = bgHex.value.trim();
    if (!HEX_RE.test(fg) || !HEX_RE.test(bg)) return;
    fg = normalize(fg);
    bg = normalize(bg);

    preview.style.color = fg;
    preview.style.background = bg;

    var ratio = window.WA.contrast.ratio(fg, bg);
    if (ratio === null) return;
    ratioEl.textContent = ratio.toFixed(2) + " : 1";

    var grades = window.WA.contrast.grade(ratio);
    badges.forEach(function (badge) {
      var key = badge.dataset.key;
      badge.classList.toggle("is-pass", !!grades[key]);
    });
  }

  fgPicker.addEventListener("input", function () {
    fgHex.value = fgPicker.value.toUpperCase();
    update();
  });
  bgPicker.addEventListener("input", function () {
    bgHex.value = bgPicker.value.toUpperCase();
    update();
  });
  fgHex.addEventListener("input", function () {
    if (HEX_RE.test(fgHex.value.trim())) fgPicker.value = normalize(fgHex.value.trim());
    update();
  });
  bgHex.addEventListener("input", function () {
    if (HEX_RE.test(bgHex.value.trim())) bgPicker.value = normalize(bgHex.value.trim());
    update();
  });

  update();
})();
