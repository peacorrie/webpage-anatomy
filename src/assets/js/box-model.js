(function () {
  var marginSlider = document.getElementById("bpMarginSlider");
  if (!marginSlider) return;

  var borderSlider = document.getElementById("bpBorderSlider");
  var paddingSlider = document.getElementById("bpPaddingSlider");
  var marginEl = document.getElementById("bpMargin");
  var borderEl = document.getElementById("bpBorder");
  var paddingEl = document.getElementById("bpPadding");
  var marginVal = document.getElementById("bpMarginVal");
  var borderVal = document.getElementById("bpBorderVal");
  var paddingVal = document.getElementById("bpPaddingVal");
  var code = document.getElementById("bpCode");

  function update() {
    var m = marginSlider.value;
    var b = borderSlider.value;
    var p = paddingSlider.value;

    marginEl.style.padding = m + "px";
    borderEl.style.borderWidth = b + "px";
    paddingEl.style.padding = p + "px";

    marginVal.textContent = m + "px";
    borderVal.textContent = b + "px";
    paddingVal.textContent = p + "px";

    code.textContent = "margin: " + m + "px; border: " + b + "px; padding: " + p + "px;";
  }

  [marginSlider, borderSlider, paddingSlider].forEach(function (slider) {
    slider.addEventListener("input", update);
  });

  update();
})();
