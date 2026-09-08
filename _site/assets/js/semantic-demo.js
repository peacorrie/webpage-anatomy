(function () {
  var toggle = document.getElementById("toggleSemanticOutline");
  if (!toggle) return;

  var tags = document.querySelectorAll(".semantic-outline-tag");
  var outlines = document.querySelectorAll(".semantic-mock__outline");

  toggle.addEventListener("click", function () {
    var showing = toggle.getAttribute("aria-pressed") === "true";
    var next = !showing;
    toggle.setAttribute("aria-pressed", String(next));
    toggle.textContent = next ? "Hide the outline" : "Show the outline";
    tags.forEach(function (el) { el.hidden = !next; });
    outlines.forEach(function (el) { el.hidden = !next; });
  });
})();
