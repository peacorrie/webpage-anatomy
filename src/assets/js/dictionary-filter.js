(function () {
  var input = document.getElementById("dictionaryFilter");
  if (!input) return;

  var entries = Array.from(document.querySelectorAll(".dictionary-entry"));
  var countEl = document.getElementById("dictionaryFilterCount");
  var emptyEl = document.getElementById("dictionaryEmpty");

  function filter() {
    var query = input.value.trim().toLowerCase();
    var visibleCount = 0;

    entries.forEach(function (entry) {
      var matches = !query ||
        entry.dataset.term.indexOf(query) !== -1 ||
        entry.dataset.definition.indexOf(query) !== -1;
      entry.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    countEl.textContent = visibleCount + (visibleCount === 1 ? " term" : " terms");
    emptyEl.hidden = visibleCount !== 0;
  }

  input.addEventListener("input", filter);
})();
