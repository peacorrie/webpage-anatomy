(function () {
  var STORAGE_KEY = "wa-theme";
  var toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  var current = document.documentElement.getAttribute("data-theme") || "light";
  apply(current);

  toggle.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* localStorage unavailable — theme just won't persist across reloads */
    }
  });
})();
