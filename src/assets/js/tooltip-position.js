(function () {
  var dots = document.querySelectorAll(".anatomy-marker__dot");
  if (!dots.length) return;

  var MARGIN = 12;

  // A tooltip centered on its dot overflows whichever edge it's closer
  // to, and which edge that is depends on where the marker actually
  // lands, not a fixed rule (a marker near the left needs the opposite
  // correction from one near the right). Reset to the default centered
  // position, measure the real overflow, then nudge only as far as
  // needed to bring it fully into view.
  function reposition(dot) {
    var tooltip = dot.nextElementSibling;
    if (!tooltip || !tooltip.classList.contains("anatomy-marker__tooltip")) return;

    tooltip.style.transform = "translateX(-50%)";
    var rect = tooltip.getBoundingClientRect();
    var overflowRight = rect.right - (window.innerWidth - MARGIN);
    var overflowLeft = MARGIN - rect.left;

    if (overflowRight > 0) {
      tooltip.style.transform = "translateX(calc(-50% - " + Math.ceil(overflowRight) + "px))";
    } else if (overflowLeft > 0) {
      tooltip.style.transform = "translateX(calc(-50% + " + Math.ceil(overflowLeft) + "px))";
    }
  }

  dots.forEach(function (dot) {
    dot.addEventListener("mouseenter", function () { reposition(dot); });
    dot.addEventListener("focus", function () { reposition(dot); });
  });
})();
