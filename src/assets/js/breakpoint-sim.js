(function () {
  var slider = document.getElementById("bkSlider");
  if (!slider) return;

  var frame = document.getElementById("bkFrame");
  var label = document.getElementById("bkWidthLabel");

  function categoryFor(width) {
    if (width < 480) return "Mobile";
    if (width < 768) return "Tablet";
    return "Desktop";
  }

  function update() {
    var width = slider.value;
    frame.style.width = width + "px";
    label.textContent = width + "px · " + categoryFor(width);
  }

  slider.addEventListener("input", update);
  update();
})();
